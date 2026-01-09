"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"
import {userService} from "@/services/UserServices";
import axios from "axios";

export function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Vérifier si l'utilisateur est déjà connecté (via localStorage)
    useEffect(() => {
    // Vérifier si window est défini (côté client uniquement)
    if (typeof window !== "undefined" && userService.isAuthenticated()) {
        setIsLoggedIn(true)
    }
  }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            await userService.login({ username, password })
            setIsLoggedIn(true)
            router.replace("/")
        } catch (err) {
            console.error("Erreur de connexion:", err)

            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Identifiants incorrects.")
            } else {
                setError("Une erreur est survenue. Vérifiez votre connexion.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        userService.logout()
        setIsLoggedIn(false)
        setUsername("")
        setPassword("")
    }


    if (isLoggedIn) {
        return (
          <div className="mb-8 flex justify-between items-center">
            <p className="text-green-500 font-medium">Vous êtes connecté en tant qu'administrateur</p>
            <Button variant="outline" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        )
    }

  return (
    <Card className="w-full max-w-md mx-auto mb-12">
      <CardHeader>
        <CardTitle>Connexion Administrateur</CardTitle>
        <CardDescription>Connectez-vous pour accéder au tableau de bord d'administration</CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          {error && <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-md text-sm">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="username"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
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
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}