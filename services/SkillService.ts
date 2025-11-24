import axios, { AxiosInstance } from 'axios';

// --- Interfaces ---

export interface ISkill {
    _id: string;
    name: string;
    // Ajoute d'autres champs si nécessaire (ex: description, level, etc.)
}

// Pour la création/mise à jour (sans _id)
export interface SkillPayload extends Omit<ISkill, '_id'> {}


class SkillService {
    private api: AxiosInstance;

    // Clé unique pour stocker la liste des compétences
    private STORAGE_KEYS = {
        SKILLS_LIST: 'app_skills_list'
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

    private initializeInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                // Vérification SSR (Server Side Rendering) pour Next.js
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
            console.warn("[SkillService] Erreur sauvegarde cache", e);
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
     * Récupérer toutes les compétences
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<ISkill[]> {
        const CACHE_KEY = this.STORAGE_KEYS.SKILLS_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<ISkill[]>('/skills');

            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[SkillService] API HS, utilisation du cache...");

            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error;
        }
    }

    /**
     * Récupérer une compétence par ID
     * Stratégie : Network First -> List Cache Fallback
     */
    public async getById(skillId: string): Promise<ISkill> {
        try {
            const response = await this.api.get<ISkill>(`/skills/${skillId}`);
            return response.data;
        } catch (error) {
            console.warn(`[SkillService] Erreur API pour skill ${skillId}. Recherche dans la liste cache.`);

            // Si l'API échoue, on regarde si on a cette skill dans notre liste locale
            const cachedList = this.getFromCache(this.STORAGE_KEYS.SKILLS_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundSkill = cachedList.find((s: ISkill) => s._id === skillId);
                if (foundSkill) return foundSkill;
            }

            throw error;
        }
    }

    /**
     * Créer une nouvelle compétence
     */
    public async create(data: SkillPayload): Promise<ISkill> {
        const response = await this.api.post<ISkill>('/skills', data);

        // Ajout au cache local pour éviter de recharger toute la liste
        const cachedList = this.getFromCache(this.STORAGE_KEYS.SKILLS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.SKILLS_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour une compétence
     */
    public async update(skillId: string, data: Partial<SkillPayload>): Promise<ISkill> {
        const response = await this.api.put<ISkill>(`/skills/${skillId}`, data);
        const updatedSkill = response.data;

        // Mise à jour de l'élément spécifique dans le cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.SKILLS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((s: ISkill) =>
                s._id === skillId ? updatedSkill : s
            );
            this.saveToCache(this.STORAGE_KEYS.SKILLS_LIST, newList);
        }

        return updatedSkill;
    }

    /**
     * Supprimer une compétence
     */
    public async delete(skillId: string): Promise<void> {
        await this.api.delete(`/skills/${skillId}`);

        // Suppression de l'élément du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.SKILLS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((s: ISkill) => s._id !== skillId);
            this.saveToCache(this.STORAGE_KEYS.SKILLS_LIST, newList);
        }
    }
}

// --- Export Singleton ---
// J'ai mis à jour pour supporter REACT_APP_ (Create React App) OU NEXT_PUBLIC_ (Next.js)
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const skillService = new SkillService(API_URL);