import { AdminDashboard } from "@/components/admin-dashboard"
import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Tableau de bord d'administration du portfolio",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord d'Administration</h1>
        <LoginForm />
        <AdminDashboard />
      </div>
    </div>
  )
}

