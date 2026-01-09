"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { userService } from "@/services/UserServices"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userService.isAuthenticated()) {
        setIsAuthenticated(true)
        setIsChecking(false)
      } else {
        router.replace("/login")
      }
    }
  }, [router])

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <FloatingChatbot
        title="Assistant Portfolio"
        welcomeMessage="Bonjour ! Je suis l'assistant virtuel de ce portfolio. Comment puis-je vous aider aujourd'hui ?"
        position="bottom-right"
      />
    </main>
  )
}
