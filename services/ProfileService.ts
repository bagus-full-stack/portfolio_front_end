import axios, { AxiosInstance } from 'axios';

// --- Interfaces ---

export interface IProfile {
    _id: string;
    name: string;
    profile: string;
    designation: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    devUsername: string;
    resume: string;
    github?: string;
    facebook?: string;
    linkedIn?: string;
    twitter?: string;
    stackOverflow?: string;
    leetcode?: string;
    hardSkills: string[];
}

// Pour la création/mise à jour (sans _id)
export interface ProfilePayload extends Omit<IProfile, '_id'> {}


class ProfileService {
    private api: AxiosInstance;

    // Clé de stockage unique pour les profils
    private STORAGE_KEYS = {
        PROFILES_LIST: 'app_profiles_list'
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
     * Intercepteur pour le Token JWT
     */
    private initializeInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                // Vérification SSR pour Next.js
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
            console.warn("[ProfileService] Erreur sauvegarde cache", e);
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
     * Récupérer tous les profils
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<IProfile[]> {
        const CACHE_KEY = this.STORAGE_KEYS.PROFILES_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<IProfile[]>('/profiles');

            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[ProfileService] API HS, utilisation du cache...");

            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error;
        }
    }

    /**
     * Récupérer un profil par ID
     * Stratégie : Network First -> List Cache Fallback
     */
    public async getById(profileId: string): Promise<IProfile> {
        try {
            const response = await this.api.get<IProfile>(`/profiles/${profileId}`);
            return response.data;
        } catch (error) {
            console.warn(`[ProfileService] Erreur API pour profil ${profileId}. Recherche dans la liste cache.`);

            // Si l'API échoue, on cherche dans la liste locale déjà chargée
            const cachedList = this.getFromCache(this.STORAGE_KEYS.PROFILES_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundProfile = cachedList.find((p: IProfile) => p._id === profileId);
                if (foundProfile) return foundProfile;
            }

            throw error;
        }
    }

    /**
     * Créer un nouveau profil
     */
    public async create(data: ProfilePayload): Promise<IProfile> {
        const response = await this.api.post<IProfile>('/profiles', data);

        // Ajout au cache local
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROFILES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.PROFILES_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour un profil
     * Utilisation de Partial<> car on ne met pas forcément tout à jour d'un coup
     */
    public async update(profileId: string, data: Partial<ProfilePayload>): Promise<IProfile> {
        const response = await this.api.put<IProfile>(`/profiles/${profileId}`, data);
        const updatedProfile = response.data;

        // Mise à jour de l'élément spécifique dans le cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROFILES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((p: IProfile) =>
                p._id === profileId ? updatedProfile : p
            );
            this.saveToCache(this.STORAGE_KEYS.PROFILES_LIST, newList);
        }

        return updatedProfile;
    }

    /**
     * Supprimer un profil
     */
    public async delete(profileId: string): Promise<void> {
        await this.api.delete(`/profiles/${profileId}`);

        // Suppression de l'élément du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROFILES_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((p: IProfile) => p._id !== profileId);
            this.saveToCache(this.STORAGE_KEYS.PROFILES_LIST, newList);
        }
    }
}

// --- 3. Export de l'instance (Singleton) ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const profileService = new ProfileService(API_URL);