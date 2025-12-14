"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  UserPlus,
  Download,
  Search,
  BarChart3,
  PieChart,
  Shield,
  Settings,
  Building,
  UserCog,
  School,
  Layers,
  Clock,
  Star,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { SUPER_ADMIN_EMAILS } from "@/lib/constants/admin-config"

interface AdminHierarchyDashboardProps {
  isAdmin: boolean
  userEmail: string
  stats: {
    totalUsers: number
    totalCourses: number
    totalTeachers: number
    pendingApplications: number
  }
  recentApplications: any[]
  recentUsers: any[]
}

export function AdminHierarchyDashboard({
  isAdmin,
  userEmail,
  stats,
  recentApplications,
  recentUsers,
}: AdminHierarchyDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview")
  const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(userEmail)

  // Déterminer le niveau d'accès
  const accessLevel = isSuperAdmin ? "directeur_general" : isAdmin ? "coordinateur" : "viewer"

  if (!isAdmin && !isSuperAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Accès restreint</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <Button asChild>
          <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Administration</h1>
                {isSuperAdmin && <Badge className="bg-amber-500 text-white">Directeur Général</Badge>}
              </div>
              <p className="text-muted-foreground">Bienvenue, {userEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="gap-2 bg-primary" asChild>
                <Link href="/admin/professeurs/candidatures">
                  <UserPlus className="w-4 h-4" />
                  Candidatures
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hiérarchie Admin - Visible seulement pour le super admin */}
        {isSuperAdmin && (
          <Card className="mb-8 border-amber-500/30 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Hiérarchie Administrative
              </CardTitle>
              <CardDescription>Structure organisationnelle de Séverino El</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/admin/directeur" className="block">
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                        <Building className="w-6 h-6 text-amber-500" />
                      </div>
                      <h3 className="font-medium">Directeur Pédagogique</h3>
                      <p className="text-xs text-muted-foreground mt-1">Supervision globale</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/admin/rgh" className="block">
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                        <UserCog className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="font-medium">RGH</h3>
                      <p className="text-xs text-muted-foreground mt-1">Ressources Humaines</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/admin/scolarite" className="block">
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                        <School className="w-6 h-6 text-green-500" />
                      </div>
                      <h3 className="font-medium">Scolarité</h3>
                      <p className="text-xs text-muted-foreground mt-1">Gestion élèves</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/admin/coordinateur" className="block">
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                        <Layers className="w-6 h-6 text-purple-500" />
                      </div>
                      <h3 className="font-medium">Coordinateurs</h3>
                      <p className="text-xs text-muted-foreground mt-1">Par niveau</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Utilisateurs</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-500 mt-1">+12% ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Professeurs</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalTeachers}</p>
                  <p className="text-sm text-green-500 mt-1">+3 ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cours</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalCourses}</p>
                  <p className="text-sm text-green-500 mt-1">+5 ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Candidatures</p>
                  <p className="text-2xl font-bold mt-1">{stats.pendingApplications}</p>
                  <p className="text-sm text-amber-500 mt-1">En attente</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertes */}
        {stats.pendingApplications > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span className="flex-1">{stats.pendingApplications} candidature(s) en attente de validation</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/professeurs/candidatures">Voir</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-background">
              <BarChart3 className="w-4 h-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="teachers" className="gap-2 data-[state=active]:bg-background">
              <GraduationCap className="w-4 h-4" />
              Professeurs
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2 data-[state=active]:bg-background">
              <Users className="w-4 h-4" />
              Élèves
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2 data-[state=active]:bg-background">
              <BookOpen className="w-4 h-4" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-background">
              <PieChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-background">
              <Settings className="w-4 h-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Candidatures récentes */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Candidatures Professeurs</CardTitle>
                    <CardDescription>En attente de validation</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/professeurs/candidatures">Voir tout</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {recentApplications.length > 0 ? (
                    <div className="space-y-4">
                      {recentApplications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback>{app.full_name?.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{app.full_name || "Sans nom"}</p>
                              <p className="text-sm text-muted-foreground">
                                {app.specialties?.join(", ") || "Non spécifié"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={app.status === "pending" ? "secondary" : "default"}>
                              {app.status === "pending" ? "En attente" : app.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                  <Eye className="w-4 h-4" /> Voir le profil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <CheckCircle className="w-4 h-4" /> Approuver
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-red-500">
                                  <XCircle className="w-4 h-4" /> Refuser
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune candidature en attente</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activité récente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Utilisateurs récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.display_name?.charAt(0) || user.username?.charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.display_name || user.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.role || "user"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inscriptions mensuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 78, 90, 85, 110, 125, 140, 135, 150, 168, 175, 190].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                          style={{ height: `${(value / 200) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Répartition par instrument</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { instrument: "Guitare", percentage: 35, color: "bg-blue-500" },
                      { instrument: "Piano", percentage: 28, color: "bg-green-500" },
                      { instrument: "Batterie", percentage: 15, color: "bg-amber-500" },
                      { instrument: "Basse", percentage: 12, color: "bg-purple-500" },
                      { instrument: "Chant", percentage: 10, color: "bg-pink-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.instrument}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher un professeur..." className="pl-10" />
              </div>
              <Button className="gap-2" asChild>
                <Link href="/devenir-professeur">
                  <UserPlus className="w-4 h-4" />
                  Recruter
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/30">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>P{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Professeur {i}</p>
                          <p className="text-sm text-muted-foreground">Guitare • 5 ans d'expérience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">24 élèves</p>
                          <p className="text-xs text-muted-foreground">4.8 ⭐</p>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          Actif
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher un élève..." className="pl-10" />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentUsers.slice(0, 10).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 hover:bg-secondary/30">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>{user.display_name?.charAt(0) || "?"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.display_name || user.username}</p>
                          <p className="text-sm text-muted-foreground">
                            Niveau {user.level || 1} • {user.xp || 0} XP
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.coins || 0} coins</p>
                          <p className="text-xs text-muted-foreground">
                            Inscrit le {new Date(user.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher un cours..." className="pl-10" />
              </div>
              <Button className="gap-2">
                <BookOpen className="w-4 h-4" />
                Créer un cours
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Guitare Débutant",
                "Piano Jazz",
                "Théorie Musicale",
                "Batterie Rock",
                "Technique Vocale",
                "Production",
              ].map((title, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-secondary rounded-lg mb-4" />
                    <h3 className="font-medium mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Par Professeur {i + 1}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{["Débutant", "Avancé", "Tous niveaux"][i % 3]}</Badge>
                      <span className="text-sm text-muted-foreground">{(i + 1) * 234} inscrits</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Taux d'engagement</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">+24%</p>
                  <p className="text-sm text-muted-foreground">Croissance mensuelle</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-2xl font-bold">45min</p>
                  <p className="text-sm text-muted-foreground">Temps moyen/session</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rapport détaillé</CardTitle>
                <CardDescription>Analytics avancées et KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Les analytics détaillées seront disponibles avec plus de données.</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter le rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de la plateforme</CardTitle>
                <CardDescription>Configurez les options générales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Général</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Inscriptions ouvertes</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Actif
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mode maintenance</span>
                        <Badge variant="outline">Inactif</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Emails automatiques</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Actif
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Alertes admin</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Actif
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
