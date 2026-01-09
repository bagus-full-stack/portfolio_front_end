"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Lock, User, Mail, UserPlus, Check, AlertTriangle, Loader2 } from "lucide-react"
import { userService } from "@/services/UserServices"
import axios from "axios"
import Link from "next/link"

// Social icons as SVG components
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.")
      setIsLoading(false)
      return
    }

    try {
      await userService.create({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: "user",
      })
      setSuccess("Compte créé avec succès ! Redirection vers la page de connexion...")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err)

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Une erreur est survenue lors de l'inscription.")
      } else {
        setError("Une erreur est survenue. Vérifiez votre connexion.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Validate provider against whitelist
    const allowedProviders = ["google", "github", "linkedin"]
    if (!allowedProviders.includes(provider)) {
      setError("Fournisseur d'authentification non supporté.")
      return
    }
    // Redirect to backend OAuth endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    window.location.href = `${API_URL}/auth/${provider}`
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/95">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="p-3 rounded-full bg-primary/10">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
        <CardDescription className="text-center">
          Inscrivez-vous pour accéder à toutes les fonctionnalités
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full hover:bg-accent hover:scale-105 transition-all duration-200"
            onClick={() => handleSocialLogin("google")}
          >
            <GoogleIcon />
            <span className="sr-only">Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full hover:bg-accent hover:scale-105 transition-all duration-200"
            onClick={() => handleSocialLogin("github")}
          >
            <GitHubIcon />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full hover:bg-accent hover:scale-105 transition-all duration-200"
            onClick={() => handleSocialLogin("linkedin")}
          >
            <LinkedInIcon />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou inscrivez-vous avec</span>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jean"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="username"
                name="username"
                placeholder="jeandupont"
                value={formData.username}
                onChange={handleChange}
                className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold hover:scale-[1.02] transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Inscription en cours...
              </span>
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-2">
        <div className="text-center text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium transition-colors">
            Se connecter
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
