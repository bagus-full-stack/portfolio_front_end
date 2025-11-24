"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { MapPin } from "lucide-react"
// Importer les classes spécifiques depuis notre utilitaire
import { CanvasTexture } from "@/lib/three-utils"
import type * as THREE from "three"

interface Map3DProps {
  address: string
  className?: string
}

// Fonction pour créer une texture procédurale de carte
function createMapTexture() {
  // Vérifier si window est défini (côté client uniquement)
  if (typeof window === "undefined") return null

  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")

  if (!ctx) return null

  // Fond
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, "#1a1a1a")
  gradient.addColorStop(1, "#2a2a2a")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Grille
  ctx.strokeStyle = "#333333"
  ctx.lineWidth = 1

  const gridSize = 64
  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, size)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(size, i)
    ctx.stroke()
  }

  // Cercles aléatoires pour simuler des quartiers
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = Math.random() * 50 + 20

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(100, 100, 100, ${Math.random() * 0.2 + 0.1})`
    ctx.fill()
  }

  // Lignes pour simuler des routes principales
  ctx.strokeStyle = "#444444"
  ctx.lineWidth = 3

  for (let i = 0; i < 5; i++) {
    const x1 = Math.random() * size
    const y1 = Math.random() * size
    const x2 = Math.random() * size
    const y2 = Math.random() * size

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  // Utiliser CanvasTexture importé depuis notre utilitaire
  return new CanvasTexture(canvas)
}

function MapModel({ address }: { address: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)
  const markerRef = useRef<THREE.Group>(null)
  const [mapTexture, setMapTexture] = useState<THREE.Texture | null>(null)

  // Créer la texture de la carte au chargement du composant
  useEffect(() => {
    // Vérifier si window est défini (côté client uniquement)
    if (typeof window !== "undefined") {
      const texture = createMapTexture()
      if (texture) {
        setMapTexture(texture)
      }
    }
  }, [])

  // Animation de la carte
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / -2 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }

    // Animation du marqueur
    if (markerRef.current) {
      markerRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <>
      {/* Carte */}
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={[10, 10, 0.2]} />
        <meshStandardMaterial
          map={mapTexture || undefined}
          color={mapTexture ? undefined : "#1a1a1a"}
          metalness={0.2}
          roughness={0.8}
        />

        {/* Bâtiments 3D stylisés */}
        <group position={[0, 0, 0.2]}>
          {Array.from({ length: 20 }).map((_, i) => {
            const x = (Math.random() - 0.5) * 8
            const y = (Math.random() - 0.5) * 8
            const height = Math.random() * 0.5 + 0.2
            const width = Math.random() * 0.4 + 0.2

            return (
              <mesh key={i} position={[x, y, height / 2]} castShadow>
                <boxGeometry args={[width, width, height]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#8a2be2" : i % 2 === 0 ? "#4a4a4a" : "#6a6a6a"}
                  metalness={0.5}
                  roughness={0.5}
                />
              </mesh>
            )
          })}
        </group>

        {/* Routes stylisées */}
        <group position={[0, 0, 0.21]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[12, 0.3]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[12, 0.3]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh>
            <planeGeometry args={[0.3, 12]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.3, 12]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      </mesh>

      {/* Marqueur de position */}
      <group ref={markerRef} position={[0, 0, 1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0, 0.3, 0.6, 4]} />
          <meshStandardMaterial color="#ff4500" />
        </mesh>
        <pointLight color="#ff4500" intensity={1} distance={2} />
      </group>

      {/* Texte de l'adresse */}
      <Text position={[0, -2, 0.5]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={8}>
        {address}
      </Text>
    </>
  )
}

export function Map3D({ address, className }: Map3DProps) {
  return (
    <div className={`relative w-full h-64 rounded-lg overflow-hidden ${className}`}>
      <Canvas shadows camera={{ position: [0, -6, 6], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <MapModel address={address} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>

      {/* Overlay avec icône et adresse pour mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-3 flex items-center md:hidden">
        <MapPin className="h-5 w-5 text-primary mr-2" />
        <p className="text-sm truncate">{address}</p>
      </div>
    </div>
  )
}

