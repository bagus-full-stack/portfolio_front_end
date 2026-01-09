"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Eye, Users, Clock, Globe, Download, RefreshCw } from "lucide-react"
import { userService } from "@/services/UserServices"

// Données simulées pour les statistiques
const visitData = [
  { name: "Lun", visits: 120 },
  { name: "Mar", visits: 150 },
  { name: "Mer", visits: 180 },
  { name: "Jeu", visits: 140 },
  { name: "Ven", visits: 200 },
  { name: "Sam", visits: 160 },
  { name: "Dim", visits: 130 },
]

const pageViewsData = [
  { name: "Accueil", views: 450 },
  { name: "À propos", views: 320 },
  { name: "Projets", views: 380 },
  { name: "Contact", views: 250 },
]

const deviceData = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 5 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalVisits: 1280,
    uniqueVisitors: 845,
    avgTimeOnSite: "2m 45s",
    bounceRate: "32%",
  })

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    // Vérifier si window est défini (côté client uniquement)
    if (typeof window !== "undefined") {
      if (userService.isAuthenticated()) {
        setIsLoggedIn(true)
      }
    }
  }, [])

  const refreshStats = () => {
    setIsLoading(true)
    // Simuler un chargement de données
    setTimeout(() => {
      // Générer de nouvelles statistiques aléatoires
      setStats({
        totalVisits: Math.floor(1000 + Math.random() * 500),
        uniqueVisitors: Math.floor(700 + Math.random() * 300),
        avgTimeOnSite: `${Math.floor(1 + Math.random() * 3)}m ${Math.floor(10 + Math.random() * 50)}s`,
        bounceRate: `${Math.floor(25 + Math.random() * 15)}%`,
      })
      setIsLoading(false)
    }, 1000)
  }

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accès restreint</CardTitle>
          <CardDescription>Veuillez vous connecter pour accéder au tableau de bord d'administration.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Statistiques du site</h2>
        <Button onClick={refreshStats} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {isLoading ? "Actualisation..." : "Actualiser les données"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visites totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisits}</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">+8% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temps moyen sur le site</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTimeOnSite}</div>
            <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bounceRate}</div>
            <p className="text-xs text-muted-foreground">-3% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visits" className="w-full overflow-hidden">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="visits">Visites</TabsTrigger>
          <TabsTrigger value="pages">Pages vues</TabsTrigger>
          <TabsTrigger value="devices">Appareils</TabsTrigger>
        </TabsList>
        <TabsContent value="visits" className="overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>Visites par jour</CardTitle>
              <CardDescription>Nombre de visites quotidiennes sur les 7 derniers jours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pages" className="overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>Pages les plus visitées</CardTitle>
              <CardDescription>Nombre de vues par page sur le site</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pageViewsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices" className="overflow-hidden">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par appareil</CardTitle>
              <CardDescription>Types d'appareils utilisés pour accéder au site</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Actions administratives</CardTitle>
          <CardDescription>Gérez votre site et exportez les données</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter les statistiques
          </Button>
          <Button variant="outline">Mettre à jour le contenu</Button>
          <Button variant="outline">Gérer les utilisateurs</Button>
          <Button variant="outline">Paramètres du site</Button>
        </CardContent>
      </Card>
    </div>
  )
}

