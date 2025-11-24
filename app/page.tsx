import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChatbot } from "@/components/floating-chatbot"

export default function Home() {
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

