"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Ajouter l'import pour l'icône Search et le composant Input
import { ExternalLink, Github, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  category: string
  details: string
}

export function ProjectsSection() {
  // Ajouter un nouvel état pour la recherche après les autres états
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const projects: Project[] = [
    {
      id: 1,
      title: "Application E-commerce",
      description: "Une application e-commerce moderne avec panier d'achat et paiement intégré.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "Next.js", "Stripe", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
      details:
        "Cette application e-commerce offre une expérience d'achat fluide avec une interface utilisateur intuitive. Elle intègre un système de panier, des paiements sécurisés via Stripe, et une gestion des produits dynamique. Le frontend est développé avec React et Next.js, tandis que le backend utilise Node.js et MongoDB pour stocker les données des produits et des utilisateurs.",
    },
    {
      id: 2,
      title: "Portfolio 3D",
      description: "Un portfolio interactif avec des éléments 3D et des animations avancées.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["Three.js", "React", "GSAP", "WebGL"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "3d",
      details:
        "Ce portfolio 3D repousse les limites de l'expérience web traditionnelle en intégrant des éléments 3D interactifs et des animations fluides. Développé avec Three.js et React, il offre une navigation immersive à travers différentes sections. Les transitions sont gérées avec GSAP pour une expérience utilisateur optimale. Le projet utilise également des shaders personnalisés pour créer des effets visuels uniques.",
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Un tableau de bord d'analyse de données avec visualisations interactives.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React", "D3.js", "TypeScript", "Firebase"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "web",
      details:
        "Ce tableau de bord d'analyse offre des visualisations de données complexes rendues accessibles grâce à une interface utilisateur intuitive. Développé avec React et TypeScript, il utilise D3.js pour créer des graphiques interactifs et informatifs. Les données sont stockées et synchronisées en temps réel via Firebase, permettant aux utilisateurs de collaborer et de partager des insights. Le projet inclut également des fonctionnalités d'exportation de rapports et d'alertes personnalisables.",
    },
    {
      id: 4,
      title: "Application Mobile Fitness",
      description: "Une application mobile de fitness avec suivi d'activité et plans d'entraînement.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["React Native", "Redux", "Node.js", "MongoDB"],
      category: "mobile",
      details:
        "Cette application mobile de fitness aide les utilisateurs à suivre leurs activités physiques et à respecter leurs plans d'entraînement. Développée avec React Native pour une expérience native sur iOS et Android, elle utilise Redux pour la gestion d'état et Node.js avec MongoDB pour le backend. L'application offre des fonctionnalités comme le suivi des calories, des exercices personnalisés, et des statistiques détaillées sur les progrès de l'utilisateur.",
    },
    {
      id: 5,
      title: "Jeu Web Interactif",
      description: "Un jeu web interactif avec des graphismes 2D et une physique réaliste.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["JavaScript", "Canvas API", "Matter.js", "Howler.js"],
      demoUrl: "https://example.com",
      category: "game",
      details:
        "Ce jeu web interactif combine des graphismes 2D attrayants avec une physique réaliste pour offrir une expérience de jeu immersive directement dans le navigateur. Développé avec JavaScript vanilla et l'API Canvas pour le rendu, il utilise Matter.js pour la simulation physique et Howler.js pour les effets sonores. Le jeu propose plusieurs niveaux avec une difficulté progressive et un système de score pour encourager la rejouabilité.",
    },
    {
      id: 6,
      title: "Expérience VR Architecturale",
      description: "Une expérience VR permettant d'explorer des modèles architecturaux en 3D.",
      image: "/placeholder.svg?height=600&width=800",
      tags: ["WebXR", "Three.js", "React", "Blender"],
      demoUrl: "https://example.com",
      category: "3d",
      details:
        "Cette expérience VR architecturale permet aux utilisateurs d'explorer des bâtiments et des espaces en réalité virtuelle directement depuis leur navigateur. Développée avec WebXR et Three.js, elle offre une immersion complète dans des modèles 3D créés avec Blender. L'interface utilisateur, construite avec React, permet de naviguer facilement entre différents modèles et de personnaliser l'expérience. Le projet inclut également des fonctionnalités comme la mesure des distances et l'annotation des espaces.",
    },
  ]

  // Modifier la logique de filtrage des projets pour inclure la recherche
  const filteredProjects = projects.filter((project) => {
    // Vérifier d'abord le filtre de catégorie
    const matchesCategory = filter === "all" || project.category === filter

    // Si la recherche est vide, retourner seulement le résultat du filtre de catégorie
    if (!searchQuery.trim()) return matchesCategory

    // Sinon, vérifier si le projet correspond à la recherche
    const query = searchQuery.toLowerCase().trim()

    // Vérifier le titre, la description, les détails et les tags
    const matchesTitle = project.title.toLowerCase().includes(query)
    const matchesDescription = project.description.toLowerCase().includes(query)
    const matchesDetails = project.details.toLowerCase().includes(query)
    const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(query))

    // Le projet doit correspondre à la catégorie ET à au moins un des critères de recherche
    return matchesCategory && (matchesTitle || matchesDescription || matchesDetails || matchesTags)
  })

  const categories = [
    { id: "all", name: "Tous" },
    { id: "web", name: "Web" },
    { id: "mobile", name: "Mobile" },
    { id: "3d", name: "3D" },
    { id: "game", name: "Jeux" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Projets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes projets récents, allant des applications web aux expériences 3D immersives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => setFilter(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher par titre, technologie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-16 bg-background border-border focus-visible:ring-primary"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 h-7 px-2 text-xs"
                onClick={() => {
                  setSearchQuery("")
                }}
              >
                Effacer
              </Button>
            )}
          </div>
          {searchQuery && (
            <div className="text-sm text-muted-foreground mt-2 text-center">
              {filteredProjects.length === 0
                ? "Aucun résultat trouvé"
                : `${filteredProjects.length} projet${filteredProjects.length > 1 ? "s" : ""} trouvé${filteredProjects.length > 1 ? "s" : ""}`}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="overflow-hidden border border-border h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                        <DialogDescription>
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="mr-2 mt-2">
                              {tag}
                            </Badge>
                          ))}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="relative h-64 rounded-lg overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Description</h4>
                          <p className="text-muted-foreground">{project.details}</p>
                          <div className="flex gap-4 mt-6">
                            {project.demoUrl && (
                              <Button size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink size={16} className="mr-2" />
                                  Démo
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github size={16} className="mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Voir la démo">
                          <ExternalLink size={18} />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Voir le code source"
                        >
                          <Github size={18} />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 bg-muted/30 rounded-lg border border-border"
            >
              <p className="text-muted-foreground mb-4">
                Aucun projet ne correspond à votre recherche
                {searchQuery ? ` "${searchQuery}"` : ""}
                {filter !== "all" ? ` dans la catégorie "${categories.find((c) => c.id === filter)?.name}"` : ""}.
              </p>
              <Button
                variant="default"
                onClick={() => {
                  setSearchQuery("")
                  setFilter("all")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

