"use client"

import { motion, useAnimation } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"

export function AboutSection() {
  // États et refs pour la section compétences
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSkillIndex, setActiveSkillIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const skillsContainerRef = useRef<HTMLDivElement>(null)
  const scrollControls = useAnimation()

  // États et refs pour la section expériences
  const [expScrollProgress, setExpScrollProgress] = useState(0)
  const [canExpScrollLeft, setCanExpScrollLeft] = useState(false)
  const [canExpScrollRight, setCanExpScrollRight] = useState(true)
  const expContainerRef = useRef<HTMLDivElement>(null)

  // États et refs pour la section éducation
  const [eduScrollProgress, setEduScrollProgress] = useState(0)
  const [canEduScrollLeft, setCanEduScrollLeft] = useState(false)
  const [canEduScrollRight, setCanEduScrollRight] = useState(true)
  const eduContainerRef = useRef<HTMLDivElement>(null)

  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState("experience")

  const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "UI/UX Design", level: 85 },
    { name: "Three.js", level: 70 },
    { name: "TypeScript", level: 85 },
    { name: "Python", level: 75 },
    { name: "GraphQL", level: 80 },
    { name: "Docker", level: 70 },
    { name: "AWS", level: 75 },
  ]

  const experiences = [
    {
      title: "Développeur Frontend Senior",
      company: "Entreprise XYZ",
      period: "2020 - Présent",
      description:
        "Développement d'applications web modernes avec React et Next.js. Implémentation de designs responsifs et d'animations avancées.",
    },
    {
      title: "Développeur Web",
      company: "Agence ABC",
      period: "2018 - 2020",
      description:
        "Création de sites web et d'applications pour divers clients. Utilisation de technologies frontend et backend.",
    },
    {
      title: "Designer UI/UX",
      company: "Studio Design",
      period: "2016 - 2018",
      description: "Conception d'interfaces utilisateur et d'expériences utilisateur pour applications web et mobiles.",
    },
  ]

  const education = [
    {
      degree: "Master en Développement Web",
      institution: "Université Technologique",
      period: "2014 - 2016",
      description:
        "Formation avancée en développement web et conception d'applications. Spécialisation en technologies frontend et expérience utilisateur.",
    },
    {
      degree: "Licence en Informatique",
      institution: "Université des Sciences",
      period: "2011 - 2014",
      description:
        "Fondamentaux de l'informatique, algorithmes et structures de données. Introduction au développement web et à la programmation orientée objet.",
    },
    {
      degree: "Certification UX Design",
      institution: "Google",
      period: "2019",
      description:
        "Certification professionnelle en conception d'expérience utilisateur. Méthodologies de recherche utilisateur et principes de design d'interface.",
    },
    {
      degree: "Formation Three.js",
      institution: "Plateforme en ligne",
      period: "2021",
      description:
        "Apprentissage approfondi de la création d'expériences 3D interactives pour le web avec Three.js et WebGL.",
    },
  ]

  // Vérifier si le défilement est possible pour la section compétences
  const checkSkillsScroll = () => {
    if (typeof window === "undefined") return

    const container = skillsContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

    // Calculer la progression du défilement (0 à 100)
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setScrollProgress(progress)

    // Déterminer l'index de compétence actif basé sur la position de défilement
    const itemWidth = scrollWidth / skills.length
    const currentIndex = Math.min(Math.floor(scrollLeft / itemWidth), skills.length - 1)
    setActiveSkillIndex(currentIndex)
  }

  // Vérifier si le défilement est possible pour la section expériences
  const checkExpScroll = () => {
    if (typeof window === "undefined") return

    const container = expContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanExpScrollLeft(scrollLeft > 0)
    setCanExpScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

    // Calculer la progression du défilement
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setExpScrollProgress(progress)
  }

  // Vérifier si le défilement est possible pour la section éducation
  const checkEduScroll = () => {
    if (typeof window === "undefined") return

    const container = eduContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanEduScrollLeft(scrollLeft > 0)
    setCanEduScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

    // Calculer la progression du défilement
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setEduScrollProgress(progress)
  }

  // Effet pour initialiser et nettoyer les écouteurs d'événements pour la section compétences
  useEffect(() => {
    if (typeof window === "undefined") return

    const container = skillsContainerRef.current
    if (!container) return

    const handleScroll = () => checkSkillsScroll()
    container.addEventListener("scroll", handleScroll)

    // Vérification initiale
    checkSkillsScroll()

    // Observer les changements de taille
    let resizeObserver: ResizeObserver | null = null
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkSkillsScroll)
      resizeObserver.observe(container)
    } else {
      window.addEventListener("resize", checkSkillsScroll)
    }

    // Nettoyage
    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", checkSkillsScroll)
      }
    }
  }, [])

  // Effet pour initialiser et nettoyer les écouteurs d'événements pour la section expériences
  useEffect(() => {
    if (typeof window === "undefined") return
    if (activeTab !== "experience") return

    const container = expContainerRef.current
    if (!container) return

    const handleScroll = () => checkExpScroll()
    container.addEventListener("scroll", handleScroll)

    // Vérification initiale
    checkExpScroll()

    // Observer les changements de taille
    let resizeObserver: ResizeObserver | null = null
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkExpScroll)
      resizeObserver.observe(container)
    } else {
      window.addEventListener("resize", checkExpScroll)
    }

    // Nettoyage
    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", checkExpScroll)
      }
    }
  }, [activeTab])

  // Effet pour initialiser et nettoyer les écouteurs d'événements pour la section éducation
  useEffect(() => {
    if (typeof window === "undefined") return
    if (activeTab !== "education") return

    const container = eduContainerRef.current
    if (!container) return

    const handleScroll = () => checkEduScroll()
    container.addEventListener("scroll", handleScroll)

    // Vérification initiale
    checkEduScroll()

    // Observer les changements de taille
    let resizeObserver: ResizeObserver | null = null
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(checkEduScroll)
      resizeObserver.observe(container)
    } else {
      window.addEventListener("resize", checkEduScroll)
    }

    // Nettoyage
    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", checkEduScroll)
      }
    }
  }, [activeTab])

  // Fonctions de défilement pour la section compétences
  const scrollToIndex = (index: number) => {
    if (typeof window === "undefined") return

    const container = skillsContainerRef.current
    if (!container || index < 0 || index >= skills.length) return

    setIsScrolling(true)

    // Animer le conteneur de contrôle
    scrollControls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    })

    // Calculer la position de défilement
    const itemWidth = container.scrollWidth / skills.length
    const targetScroll = itemWidth * index

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })

    // Réinitialiser l'état de défilement après l'animation
    setTimeout(() => setIsScrolling(false), 500)

    setActiveSkillIndex(index)
  }

  const scrollSkillsByDistance = (distance: number) => {
    if (typeof window === "undefined") return

    const container = skillsContainerRef.current
    if (!container) return

    setIsScrolling(true)

    container.scrollBy({
      left: distance,
      behavior: "smooth",
    })

    setTimeout(() => setIsScrolling(false), 500)
  }

  // Fonctions de défilement pour la section expériences
  const scrollExpByDistance = (distance: number) => {
    if (typeof window === "undefined") return

    const container = expContainerRef.current
    if (!container) return

    container.scrollBy({
      left: distance,
      behavior: "smooth",
    })
  }

  // Fonctions de défilement pour la section éducation
  const scrollEduByDistance = (distance: number) => {
    if (typeof window === "undefined") return

    const container = eduContainerRef.current
    if (!container) return

    container.scrollBy({
      left: distance,
      behavior: "smooth",
    })
  }

  // Générer des particules pour l'effet futuriste
  const generateParticles = (count: number) => {
    if (typeof window === "undefined") return null

    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-1 h-1 bg-primary rounded-full opacity-70"
        initial={{
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          opacity: 0,
        }}
        animate={{
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          opacity: isScrolling ? 0.7 : 0,
          scale: isScrolling ? [0, 1.5, 0] : 0,
        }}
        transition={{
          duration: 1 + Math.random(),
          ease: "easeOut",
          repeat: isScrolling ? Number.POSITIVE_INFINITY : 0,
          repeatType: "loop",
        }}
      />
    ))
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">À Propos de Moi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mon parcours, mes compétences et mes expériences dans le domaine du développement web et du
            design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Qui suis-je?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Je suis un développeur web passionné par la création d'expériences numériques innovantes et intuitives.
                Avec plus de 5 ans d'expérience dans le domaine, je combine expertise technique et sensibilité design
                pour réaliser des projets web qui se démarquent.
              </p>
              <p>
                Ma spécialité est le développement frontend avec React et Next.js, mais je maîtrise également les
                technologies backend et le design UI/UX. J'aime particulièrement explorer les nouvelles technologies
                comme WebGL et Three.js pour créer des expériences web immersives.
              </p>
              <p>
                En dehors du code, je m'intéresse à l'art numérique, à la réalité virtuelle et à l'intelligence
                artificielle. Ces passions nourrissent ma créativité et m'aident à concevoir des solutions web toujours
                plus innovantes.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Node.js</Badge>
              <Badge variant="outline">Three.js</Badge>
              <Badge variant="outline">UI/UX Design</Badge>
              <Badge variant="outline">WebGL</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Mes Compétences</h3>

              {/* Barre de progression futuriste */}
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-purple-500"
                  style={{ width: `${scrollProgress}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {/* Contrôles de navigation futuristes */}
            <motion.div className="flex justify-between items-center mb-4" animate={scrollControls}>
              <motion.button
                className={`relative flex items-center justify-center w-12 h-12 rounded-full 
                  ${
                    canScrollLeft
                      ? "bg-primary/10 hover:bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                onClick={() => scrollSkillsByDistance(-300)}
                disabled={!canScrollLeft}
                whileHover={canScrollLeft ? { scale: 1.1 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="h-5 w-5" />
                {canScrollLeft && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.button>

              <div className="relative">
                <motion.div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="h-6 w-6" />
                </motion.div>
                {typeof window !== "undefined" && isScrolling && generateParticles(12)}
              </div>

              <motion.button
                className={`relative flex items-center justify-center w-12 h-12 rounded-full 
                  ${
                    canScrollRight
                      ? "bg-primary/10 hover:bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                onClick={() => scrollSkillsByDistance(300)}
                disabled={!canScrollRight}
                whileHover={canScrollRight ? { scale: 1.1 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="h-5 w-5" />
                {canScrollRight && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.button>
            </motion.div>

            {/* Conteneur de compétences avec effet de perspective - HORIZONTAL */}
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6">
              {/* Effet de lueur d'arrière-plan */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-primary/20 blur-3xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </div>

              {/* Indicateurs de défilement */}
              <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 z-10">
                {skills.map((_, index) => (
                  <motion.div
                    key={`indicator-${index}`}
                    className={`h-1 rounded-full ${index === activeSkillIndex ? "bg-primary w-6" : "bg-muted w-2"}`}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: index === activeSkillIndex ? 1 : 0.5,
                      width: index === activeSkillIndex ? 24 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => scrollToIndex(index)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>

              {/* Conteneur de défilement horizontal avec effet de perspective */}
              <div
                ref={skillsContainerRef}
                className="relative mt-4 overflow-x-auto hide-scrollbar perspective-effect"
                style={{
                  perspective: "1000px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex space-x-6 pb-4 pt-2 px-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className={`flex-shrink-0 w-[280px] space-y-4 p-6 rounded-lg border ${
                        index === activeSkillIndex ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      initial={{ opacity: 0, x: 50, rotateY: 15 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        scale: index === activeSkillIndex ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                      }}
                      onClick={() => scrollToIndex(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">{skill.name}</span>
                        <span
                          className={`text-xl font-bold ${
                            index === activeSkillIndex ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Barre de progression circulaire */}
                      <div className="relative h-40 w-40 mx-auto my-4">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Cercle de fond */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted"
                          />

                          {/* Cercle de progression animé */}
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#skillGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 45}`}
                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - skill.level / 100)}`}
                            initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                            animate={{
                              strokeDashoffset: `${2 * Math.PI * 45 * (1 - skill.level / 100)}`,
                            }}
                            transition={{
                              duration: index === activeSkillIndex ? 1.5 : 0.8,
                              ease: "easeOut",
                            }}
                          />

                          {/* Définition du dégradé */}
                          <defs>
                            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" />
                              <stop offset="100%" stopColor="#a855f7" /> {/* Couleur purple-500 explicite */}
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Texte au centre */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{skill.level}%</span>
                        </div>

                        {/* Effet de lueur animé */}
                        {index === activeSkillIndex && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            initial={{ opacity: 0.7, scale: 0.9 }}
                            animate={{
                              opacity: [0.7, 0.2, 0.7],
                              scale: [0.9, 1.1, 0.9],
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            }}
                          />
                        )}
                      </div>

                      {/* Barre de progression linéaire */}
                      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="absolute h-full"
                          style={{
                            background: "linear-gradient(to right, hsl(var(--primary)), #a855f7)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: index === activeSkillIndex ? 1.5 : 0.8,
                            ease: "easeOut",
                          }}
                        />
                        {index === activeSkillIndex && (
                          <motion.div
                            className="absolute top-0 h-full w-20 bg-white/20"
                            initial={{ left: "-20%" }}
                            animate={{ left: "120%" }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 0.5,
                            }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Indicateurs de défilement latéral */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-r from-card to-transparent opacity-80"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-l from-card to-transparent opacity-80"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <Tabs defaultValue="experience" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="experience">Expérience</TabsTrigger>
              <TabsTrigger value="education">Formation</TabsTrigger>
            </TabsList>

            {/* Section Expérience */}
            <TabsContent value="experience">
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Parcours professionnel</h3>

                  {/* Barre de progression */}
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${expScrollProgress}%`,
                        background: "linear-gradient(to right, hsl(var(--primary)), #a855f7)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${expScrollProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                {/* Boutons de navigation */}
                <div className="flex justify-end gap-2 mb-4">
                  <motion.button
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                      ${
                        canExpScrollLeft
                          ? "bg-primary/10 hover:bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    onClick={() => scrollExpByDistance(-300)}
                    disabled={!canExpScrollLeft}
                    whileHover={canExpScrollLeft ? { scale: 1.1 } : {}}
                    whileTap={canExpScrollLeft ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                      ${
                        canExpScrollRight
                          ? "bg-primary/10 hover:bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    onClick={() => scrollExpByDistance(300)}
                    disabled={!canExpScrollRight}
                    whileHover={canExpScrollRight ? { scale: 1.1 } : {}}
                    whileTap={canExpScrollRight ? { scale: 0.95 } : {}}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Conteneur de défilement horizontal */}
                <div
                  ref={expContainerRef}
                  className="overflow-x-auto hide-scrollbar perspective-effect pb-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <div className="flex space-x-6">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-[350px]"
                        initial={{ opacity: 0, x: 50, rotateY: 5 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border border-border h-full">
                          <CardHeader>
                            <CardTitle>{exp.title}</CardTitle>
                            <CardDescription>{exp.company}</CardDescription>
                            <Badge variant="outline" className="w-fit">
                              {exp.period}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{exp.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Indicateurs de défilement latéral */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-r from-background to-transparent opacity-80"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-l from-background to-transparent opacity-80"></div>
              </div>
            </TabsContent>

            {/* Section Éducation */}
            <TabsContent value="education">
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Parcours académique</h3>

                  {/* Barre de progression */}
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${eduScrollProgress}%`,
                        background: "linear-gradient(to right, hsl(var(--primary)), #a855f7)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${eduScrollProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                {/* Boutons de navigation */}
                <div className="flex justify-end gap-2 mb-4">
                  <motion.button
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                      ${
                        canEduScrollLeft
                          ? "bg-primary/10 hover:bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    onClick={() => scrollEduByDistance(-300)}
                    disabled={!canEduScrollLeft}
                    whileHover={canEduScrollLeft ? { scale: 1.1 } : {}}
                    whileTap={canEduScrollLeft ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                      ${
                        canEduScrollRight
                          ? "bg-primary/10 hover:bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    onClick={() => scrollEduByDistance(300)}
                    disabled={!canEduScrollRight}
                    whileHover={canEduScrollRight ? { scale: 1.1 } : {}}
                    whileTap={canEduScrollRight ? { scale: 0.95 } : {}}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Conteneur de défilement horizontal */}
                <div
                  ref={eduContainerRef}
                  className="overflow-x-auto hide-scrollbar perspective-effect pb-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <div className="flex space-x-6">
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-[350px]"
                        initial={{ opacity: 0, x: 50, rotateY: 5 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border border-border h-full">
                          <CardHeader>
                            <CardTitle>{edu.degree}</CardTitle>
                            <CardDescription>{edu.institution}</CardDescription>
                            <Badge variant="outline" className="w-fit">
                              {edu.period}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{edu.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Indicateurs de défilement latéral */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-r from-background to-transparent opacity-80"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-full pointer-events-none bg-gradient-to-l from-background to-transparent opacity-80"></div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

