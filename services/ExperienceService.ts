import axios, { AxiosInstance } from 'axios';

// --- Interfaces ---

export interface IExperience {
    _id: string;
    title: string;
    description: string;
    company: string;
    duration: string;
    place: string;
}

// Interface pour la création/mise à jour (sans _id)
export interface ExperiencePayload extends Omit<IExperience, '_id'> {}

class ExperienceService {
    private api: AxiosInstance;

    // Clé de stockage unique pour les expériences
    private STORAGE_KEYS = {
        EXPERIENCES_LIST: 'app_experiences_list'
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
                // Vérification pour éviter le crash côté serveur (Next.js)
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
            console.warn("[ExperienceService] Erreur sauvegarde cache", e);
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
     * Récupérer toutes les expériences
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<IExperience[]> {
        const CACHE_KEY = this.STORAGE_KEYS.EXPERIENCES_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<IExperience[]>('/experiences');

            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[ExperienceService] API HS, utilisation du cache...");

            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error;
        }
    }

    /**
     * Récupérer une expérience par ID
     * Stratégie : Network First -> List Cache Fallback
     */
    public async getById(experienceId: string): Promise<IExperience> {
        try {
            const response = await this.api.get<IExperience>(`/experiences/${experienceId}`);
            return response.data;
        } catch (error) {
            console.warn(`[ExperienceService] Erreur API pour experience ${experienceId}. Recherche dans la liste cache.`);

            // Si l'API échoue, on cherche dans la liste locale déjà chargée
            const cachedList = this.getFromCache(this.STORAGE_KEYS.EXPERIENCES_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundExp = cachedList.find((e: IExperience) => e._id === experienceId);
                if (foundExp) return foundExp;
            }

            throw error;
        }
    }

    /**
     * Créer une nouvelle expérience
     */
    public async create(data: ExperiencePayload): Promise<IExperience> {
        const response = await this.api.post<IExperience>('/experiences', data);

        // Ajout au cache local
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EXPERIENCES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.EXPERIENCES_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour une expérience
     * Utilisation de Partial car on peut ne modifier qu'un seul champ
     */
    public async update(experienceId: string, data: Partial<ExperiencePayload>): Promise<IExperience> {
        const response = await this.api.put<IExperience>(`/experiences/${experienceId}`, data);
        const updatedExp = response.data;

        // Mise à jour de l'élément spécifique dans le cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EXPERIENCES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((e: IExperience) =>
                e._id === experienceId ? updatedExp : e
            );
            this.saveToCache(this.STORAGE_KEYS.EXPERIENCES_LIST, newList);
        }

        return updatedExp;
    }

    /**
     * Supprimer une expérience
     */
    public async delete(experienceId: string): Promise<void> {
        await this.api.delete(`/experiences/${experienceId}`);

        // Suppression de l'élément du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.EXPERIENCES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((e: IExperience) => e._id !== experienceId);
            this.saveToCache(this.STORAGE_KEYS.EXPERIENCES_LIST, newList);
        }
    }
}

// --- Export Singleton ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const experienceService = new ExperienceService(API_URL);