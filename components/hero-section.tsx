"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import dynamic from "next/dynamic"

// Importation dynamique des composants 3D pour éviter les erreurs SSR
const TechVisualization = dynamic(() => import("@/components/tech-visualization"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/90 rounded-lg">
      <div className="text-primary animate-pulse">Chargement de la visualisation 3D...</div>
    </div>
  ),
})

// Composant pour les particules qui sera rendu uniquement côté client
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      top: string
      left: string
      animation: string
      delay: string
      opacity: number
    }>
  >([])

  useEffect(() => {
    // Générer les particules uniquement côté client
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float ${3 + Math.random() * 7}s linear infinite`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.7,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            top: particle.top,
            left: particle.left,
            animation: particle.animation,
            animationDelay: particle.delay,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {


  return (
    <section id="hero" className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />

      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-sm md:text-base text-primary font-medium mb-2"
              >
                Bienvenue sur mon portfolio
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Je suis{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Votre Nom
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mt-4"
              >
                Développeur Web & Designer d'Expérience Utilisateur
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground max-w-lg"
            >
              Je crée des expériences web innovantes et futuristes qui combinent design intuitif et technologies de
              pointe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full">
                Voir mes projets
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Me contacter
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-4 pt-4"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block h-[600px] relative"
          >
            <div className="w-full h-full relative bg-black/90 rounded-lg overflow-hidden">
              {/* Utilisation du composant importé dynamiquement */}
              <TechVisualization />

              {/* Effet de lueur au sol */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32">
                <div className="w-full h-full bg-[#8a2be2] opacity-20 blur-3xl" />
              </div>

              {/* Particules flottantes rendues uniquement côté client */}
              <FloatingParticles />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-muted-foreground mb-2">Découvrir</span>
        <ArrowDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  )
}

