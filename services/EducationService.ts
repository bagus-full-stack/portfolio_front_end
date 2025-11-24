import axios, { AxiosInstance } from 'axios';

// --- Interfaces ---

export interface IEducation {
    _id: string;
    title: string;
    description: string;
    company: string; // Souvent "school" ou "institution" pour une formation, mais je garde votre nommage
    duration: string;
    place: string;
}

// Interface pour la création/mise à jour (sans _id)
export interface EducationPayload extends Omit<IEducation, '_id'> {}

class EducationService {
    private api: AxiosInstance;

    // Clé de stockage unique pour les formations
    private STORAGE_KEYS = {
        EDUCATIONS_LIST: 'app_educations_list'
    };

    constructor(baseURL: string) {
        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeInterceptors();
    }

    /**
     * Injection automatique du token JWT (SSR Safe)
     */
    private initializeInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                // Vérification window pour éviter les erreurs Next.js au build
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    // --- Gestion du Cache (Helpers) ---

    private saveToCache(key: string, data: any) {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn("[EducationService] Erreur sauvegarde cache", e);
        }
    }

    private getFromCache(key: string): any {
        if (typeof window === 'undefined') return null;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    // --- Méthodes d'API ---

    /**
     * Récupérer toutes les formations
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<IEducation[]> {
        const CACHE_KEY = this.STORAGE_KEYS.EDUCATIONS_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<IEducation[]>('/educations');

            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[EducationService] API HS, utilisation du cache...");

            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error;
        }
    }

    /**
     * Récupérer une formation par ID
     * Stratégie : Network First -> List Cache Fallback
     */
    public async getById(educationId: string): Promise<IEducation> {
        try {
            const response = await this.api.get<IEducation>(`/educations/${educationId}`);
            return response.data;
        } catch (error) {
            console.warn(`[EducationService] Erreur API pour education ${educationId}. Recherche dans la liste cache.`);

            // Si l'API échoue, on cherche dans la liste locale déjà chargée
            const cachedList = this.getFromCache(this.STORAGE_KEYS.EDUCATIONS_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundEdu = cachedList.find((e: IEducation) => e._id === educationId);
                if (foundEdu) return foundEdu;
            }

            throw error;
        }
    }

    /**
     * Créer une nouvelle formation
     */
    public async create(data: EducationPayload): Promise<IEducation> {
        const response = await this.api.post<IEducation>('/educations', data);

        // Ajout au cache local
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EDUCATIONS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.EDUCATIONS_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour une formation
     */
    public async update(educationId: string, data: Partial<EducationPayload>): Promise<IEducation> {
        const response = await this.api.put<IEducation>(`/educations/${educationId}`, data);
        const updatedEdu = response.data;

        // Mise à jour de l'élément spécifique dans le cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EDUCATIONS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((e: IEducation) =>
                e._id === educationId ? updatedEdu : e
            );
            this.saveToCache(this.STORAGE_KEYS.EDUCATIONS_LIST, newList);
        }

        return updatedEdu;
    }

    /**
     * Supprimer une formation
     */
    public async delete(educationId: string): Promise<void> {
        await this.api.delete(`/educations/${educationId}`);

        // Suppression de l'élément du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EDUCATIONS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((e: IEducation) => e._id !== educationId);
            this.saveToCache(this.STORAGE_KEYS.EDUCATIONS_LIST, newList);
        }
    }
}

// --- Export Singleton ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const educationService = new EducationService(API_URL);