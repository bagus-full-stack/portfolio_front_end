// Fichier utilitaire pour centraliser les imports de Three.js
import * as THREE from "three"

// Exporter les classes et fonctions spécifiques de Three.js
export const {
  TextureLoader,
  CanvasTexture,
  Vector3,
  Object3D,
  BufferGeometry,
  LineBasicMaterial,
  // Ajouter d'autres classes au besoin
} = THREE

// Exporter THREE pour les cas où l'objet complet est nécessaire
export default THREE

