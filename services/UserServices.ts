import axios, { AxiosInstance } from 'axios';

// --- Interfaces ---

export interface IUser {
    _id: string;
    username: string;
    password?: string; // Optionnel car souvent masqué en retour d'API
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

// Pour la création (sans _id)
export interface UserPayload extends Omit<IUser, '_id'> {}

export interface ILoginDto {
    username: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
    user: IUser;
}

// --- Service ---

class UserService {
    private api: AxiosInstance;

    // Clés de stockage
    private STORAGE_KEYS = {
        USERS_LIST: 'app_users_list',
        // On garde la fonction au cas où, même si on utilise principalement la liste
        USER_DETAIL: (id: string) => `app_user_${id}`
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
     * Injecte le Token automatiquement
     */
    private initializeInterceptors() {
        this.api.interceptors.request.use(
            (config) => {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    // --- Gestion du Cache (localStorage) ---

    private saveToCache(key: string, data: any) {
        if (typeof window === 'undefined') return; // Sécurité pour Next.js (SSR)
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn("[UserService] Erreur sauvegarde cache", e);
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

    // --- Méthodes API ---

    /**
     * Login
     */
    public async login(credentials: ILoginDto): Promise<IAuthResponse> {
        const response = await this.api.post<IAuthResponse>('/users/authenticate', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }

    /**
     * Logout
     */
    public logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem(this.STORAGE_KEYS.USERS_LIST); // On vide aussi le cache user par sécurité
        }
    }

    /**
     * Récupérer tous les utilisateurs
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<IUser[]> {
        const CACHE_KEY = this.STORAGE_KEYS.USERS_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<IUser[]>('/users');
            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[UserService] API HS, tentative cache liste...");
            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error; // Si rien en cache, on renvoie l'erreur
        }
    }

    /**
     * Récupérer un utilisateur par ID
     * Stratégie : Network First -> List Cache Fallback (Optimisation)
     */
    public async getById(userId: string): Promise<IUser> {
        try {
            // 1. Réseau
            const response = await this.api.get<IUser>(`/users/${userId}`);
            return response.data;

        } catch (error) {
            console.warn(`[UserService] API HS pour user ${userId}, recherche dans la liste cache...`);

            // 2. Échec : On cherche dans le "grand sac" (la liste en cache)
            const cachedList = this.getFromCache(this.STORAGE_KEYS.USERS_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundUser = cachedList.find((u: IUser) => u._id === userId);
                if (foundUser) return foundUser;
            }

            throw error;
        }
    }

    /**
     * Créer un utilisateur
     */
    public async create(data: UserPayload): Promise<IUser> {
        const response = await this.api.post<IUser>('/users', data);

        // Optionnel : Ajouter le nouvel user au cache manuellement pour éviter de recharger toute la liste
        const cachedList = this.getFromCache(this.STORAGE_KEYS.USERS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.USERS_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour un utilisateur
     * Met à jour le serveur ET le cache local
     */
    public async update(userId: string, data: Partial<UserPayload>): Promise<IUser> {
        const response = await this.api.put<IUser>(`/users/${userId}`, data);
        const updatedUser = response.data;

        // Mise à jour du cache (Optimistic UI support)
        const cachedList = this.getFromCache(this.STORAGE_KEYS.USERS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((u: IUser) =>
                u._id === userId ? updatedUser : u
            );
            this.saveToCache(this.STORAGE_KEYS.USERS_LIST, newList);
        }

        return updatedUser;
    }

    /**
     * Supprimer un utilisateur
     * Supprime du serveur ET du cache local
     */
    public async delete(userId: string): Promise<void> {
        await this.api.delete(`/users/${userId}`);

        // Nettoyage du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.USERS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((u: IUser) => u._id !== userId);
            this.saveToCache(this.STORAGE_KEYS.USERS_LIST, newList);
        }
    }

    public isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('token');
    }
}

// --- Export Singleton ---
// Utilisation de process.env pour la prod, ou localhost en dev
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const userService = new UserService(API_URL);