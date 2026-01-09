"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Time to display success message before redirecting to home
const REDIRECT_DELAY_MS = 1500

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const handleCallback = () => {
      try {
        // Extract token from URL parameters
        const token = searchParams.get("token")
        const error = searchParams.get("error")

        if (error) {
          setStatus("error")
          setErrorMessage(decodeURIComponent(error))
          return
        }

        if (!token) {
          setStatus("error")
          setErrorMessage("Aucun token reçu. Veuillez réessayer.")
          return
        }

        // Store the token in localStorage (same as regular login)
        localStorage.setItem("token", token)

        setStatus("success")

        // Redirect to home page after a short delay
        setTimeout(() => {
          router.replace("/")
        }, REDIRECT_DELAY_MS)
      } catch (err) {
        console.error("OAuth callback error:", err)
        setStatus("error")
        setErrorMessage("Une erreur est survenue lors de l'authentification.")
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <Card className="w-full max-w-md mx-auto border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/95">
        <CardContent className="p-8">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground text-center">
                Authentification en cours...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-green-600 dark:text-green-400 font-medium text-center">
                Connexion réussie !
              </p>
              <p className="text-muted-foreground text-sm text-center">
                Redirection en cours...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-destructive font-medium text-center">
                Erreur d&apos;authentification
              </p>
              <p className="text-muted-foreground text-sm text-center">
                {errorMessage}
              </p>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Retour à la connexion</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
