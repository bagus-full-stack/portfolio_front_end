"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { userService } from "@/services/UserServices"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Vérifier si window est défini (côté client uniquement)
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }

      // Définir l'état initial
      setIsScrolled(window.scrollY > 10)
      
      // Vérifier l'authentification
      setIsAuthenticated(userService.isAuthenticated())

      // Ajouter l'écouteur d'événement
      window.addEventListener("scroll", handleScroll)

      // Nettoyer l'écouteur d'événement
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Accueil", href: "/#hero" },
    { name: "À propos", href: "/#about" },
    { name: "Projets", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
    ...(isAuthenticated ? [{ name: "Admin", href: "/admin", isButton: true }] : []),
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.isButton ? (
                <Button variant="outline" size="sm" className="ml-2" asChild>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ) : (
                <Link href={item.href} className="text-foreground hover:text-primary transition-colors">
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-foreground hover:text-primary transition-colors py-2 ${
                    item.isButton ? "inline-block mt-2 px-4 py-2 border border-border rounded-md" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

