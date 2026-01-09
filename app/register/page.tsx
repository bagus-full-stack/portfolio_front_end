"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RegisterForm } from "@/components/register-form"
import { userService } from "@/services/UserServices"

export default function RegisterPage() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Redirect to home if already authenticated
    if (typeof window !== "undefined" && userService.isAuthenticated()) {
      router.replace("/")
    } else {
      setIsChecking(false)
    }
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Vérification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8">
      <RegisterForm />
    </div>
  )
}
