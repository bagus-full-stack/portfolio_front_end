import axios, { AxiosInstance } from 'axios';
// Assurez-vous que le chemin est correct selon votre structure
import { ISkill } from "@/services/SkillService";

// --- Interfaces ---

export interface IProject {
    _id: string;
    title: string;
    name: string; // Parfois redondant avec title, vérifiez votre modèle backend
    description: string;
    // Correction: string[] au lieu de [string] (qui serait un tuple de longueur 1)
    role: string[];
    code: string; // Lien github
    demo: string; // Lien live
    image: string;
    // Correction: ISkill[] pour un tableau de skills
    tools: ISkill[];
    createdAt?: string;
}

// Pour la création/mise à jour (sans _id, et createdAt est géré par le back)
export interface ProjectPayload extends Omit<IProject, '_id' | 'createdAt'> {}


class ProjectService {
    private api: AxiosInstance;

    // Clé de stockage unique pour les projets
    private STORAGE_KEYS = {
        PROJECTS_LIST: 'app_projects_list'
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
            console.warn("[ProjectService] Erreur sauvegarde cache", e);
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
     * Récupérer tous les projets
     * Stratégie : Network First -> Cache Fallback
     */
    public async getAll(): Promise<IProject[]> {
        const CACHE_KEY = this.STORAGE_KEYS.PROJECTS_LIST;

        try {
            // 1. Réseau
            const response = await this.api.get<IProject[]>('/projects');

            // 2. Succès : Mise à jour du cache
            this.saveToCache(CACHE_KEY, response.data);
            return response.data;

        } catch (error) {
            console.warn("[ProjectService] API HS, utilisation du cache...");

            // 3. Échec : Récupération du cache
            const cachedData = this.getFromCache(CACHE_KEY);
            if (cachedData) {
                return cachedData;
            }
            throw error;
        }
    }

    /**
     * Récupérer un projet par ID
     * Stratégie : Network First -> List Cache Fallback
     */
    public async getById(projectId: string): Promise<IProject> {
        try {
            const response = await this.api.get<IProject>(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            console.warn(`[ProjectService] Erreur API pour projet ${projectId}. Recherche dans la liste cache.`);

            // Si l'API échoue, on cherche dans la liste locale déjà chargée
            const cachedList = this.getFromCache(this.STORAGE_KEYS.PROJECTS_LIST);
            if (cachedList && Array.isArray(cachedList)) {
                const foundProject = cachedList.find((p: IProject) => p._id === projectId);
                if (foundProject) return foundProject;
            }

            throw error;
        }
    }

    /**
     * Créer un nouveau projet
     */
    public async create(data: ProjectPayload): Promise<IProject> {
        const response = await this.api.post<IProject>('/projects', data);

        // Ajout au cache local
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROJECTS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            cachedList.push(response.data);
            this.saveToCache(this.STORAGE_KEYS.PROJECTS_LIST, cachedList);
        }

        return response.data;
    }

    /**
     * Mettre à jour un projet
     */
    public async update(projectId: string, data: Partial<ProjectPayload>): Promise<IProject> {
        const response = await this.api.put<IProject>(`/projects/${projectId}`, data);
        const updatedProject = response.data;

        // Mise à jour de l'élément spécifique dans le cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROJECTS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.map((p: IProject) =>
                p._id === projectId ? updatedProject : p
            );
            this.saveToCache(this.STORAGE_KEYS.PROJECTS_LIST, newList);
        }

        return updatedProject;
    }

    /**
     * Supprimer un projet
     */
    public async delete(projectId: string): Promise<void> {
        await this.api.delete(`/projects/${projectId}`);

        // Suppression de l'élément du cache
        const cachedList = this.getFromCache(this.STORAGE_KEYS.PROJECTS_LIST);
        if (cachedList && Array.isArray(cachedList)) {
            const newList = cachedList.filter((p: IProject) => p._id !== projectId);
            this.saveToCache(this.STORAGE_KEYS.PROJECTS_LIST, newList);
        }
    }
}

// --- Export Singleton ---
// Gestion des variables d'env Next.js vs React classique
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const projectService = new ProjectService(API_URL);