"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { userService } from "@/services/UserServices"

export default function AdminPage() {
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
          <p className="text-muted-foreground">Vérification de l'accès...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord d'Administration</h1>
        <AdminDashboard />
      </div>
    </div>
  )
}

