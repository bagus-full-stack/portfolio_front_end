"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Float, Environment, MeshDistortMaterial } from "@react-three/drei"
// Importer les classes spécifiques depuis notre utilitaire
import { Vector3, BufferGeometry, Object3D } from "@/lib/three-utils"
import type * as THREE from "three"

// Composant pour les technologies flottantes
const TechSphere = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <MeshDistortMaterial
        color="#4c00b0"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
        metalness={0.8}
        opacity={0.8}
        transparent
      />
    </mesh>
  )
}

// Composant pour les logos de technologies
const TechLogo = ({ position, text, color = "#ffffff", scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} position={position}>
      <group ref={groupRef}>
        <Text font="/fonts/Inter_Bold.json" fontSize={0.3 * scale} color={color} anchorX="center" anchorY="middle">
          {text}
        </Text>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[text.length * 0.2 * scale, 0.4 * scale]} />
          <meshStandardMaterial color={color} opacity={0.1} transparent />
        </mesh>
      </group>
    </Float>
  )
}

// Composant pour les connexions entre technologies
const Connections = () => {
  const points = [
    [-2, 1, 0],
    [2, -1, 1],
    [-1, -1, 2],
    [1, 2, -1],
    [0, -2, -2],
    [2, 0, 2],
  ]

  return (
    <group>
      {points.map((start, i) =>
        points.map((end, j) => {
          if (i < j) {
            const lineGeometry = new BufferGeometry().setFromPoints([new Vector3(...start), new Vector3(...end)])

            return (
              <line key={`${i}-${j}`} geometry={lineGeometry}>
                <lineBasicMaterial attach="material" color="#8a2be2" opacity={0.2} transparent linewidth={1} />
              </line>
            )
          }
          return null
        }),
      )}
    </group>
  )
}

// Composant pour les particules 3D
const Particles = ({ count = 100 }) => {
  const mesh = useRef<THREE.Mesh>(null)
  const dummy = new Object3D()
  const particles = useRef<THREE.InstancedMesh>(null)

  useFrame(() => {
    if (particles.current) {
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 10
        const position = new Vector3(Math.sin(t) * 5, Math.cos(t) * 5, Math.sin(t) * Math.cos(t) * 5)
        position.normalize().multiplyScalar(5 + Math.random() * 5)

        dummy.position.copy(position)
        dummy.updateMatrix()
        particles.current.setMatrixAt(i, dummy.matrix)
      }
      particles.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={particles} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#00aaff" opacity={0.6} transparent />
    </instancedMesh>
  )
}

// Scène 3D principale
const TechScene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00aaff" />

      {/* Sphère centrale */}
      <TechSphere position={[0, 0, 0]} />

      {/* Logos de technologies */}
      <TechLogo position={[-2.5, 1.5, 0]} text="React" color="#61dafb" scale={1.2} />
      <TechLogo position={[2.5, -1, 1]} text="Next.js" color="#ffffff" scale={1.2} />
      <TechLogo position={[-1.5, -2, 0.5]} text="TypeScript" color="#3178c6" />
      <TechLogo position={[2, 2, -1]} text="Three.js" color="#049ef4" />
      <TechLogo position={[0, -2.5, -1]} text="Tailwind" color="#38bdf8" />
      <TechLogo position={[1.5, 0, 2.5]} text="Node.js" color="#8cc84b" />

      {/* Connexions entre technologies */}
      <Connections />

      {/* Particules d'arrière-plan */}
      <Particles count={150} />

      {/* Contrôles de caméra */}
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />

      {/* Environnement pour les reflets */}
      <Environment preset="night" />
    </>
  )
}

// Composant principal exporté
export default function TechVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className="w-full h-full" dpr={[1, 2]}>
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 5, 15]} />
      <TechScene />
    </Canvas>
  )
}

