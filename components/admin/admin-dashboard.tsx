"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  GraduationCap,
  DollarSign,
  UserPlus,
  AlertTriangle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Mail,
  Star,
  BookOpen,
  Shield,
  BarChart3,
  PieChart,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { label: "Élèves actifs", value: "12,847", change: "+12%", icon: Users, color: "text-blue-500" },
  { label: "Professeurs", value: "234", change: "+8%", icon: GraduationCap, color: "text-green-500" },
  { label: "Cours complétés", value: "45,892", change: "+23%", icon: BookOpen, color: "text-purple-500" },
  { label: "Revenus (mois)", value: "€89,450", change: "+18%", icon: DollarSign, color: "text-amber-500" },
]

const pendingTeachers = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.dupont@email.com",
    instrument: "Piano",
    experience: "8 ans",
    status: "evaluation",
    score: 85,
    avatar: "/woman-pianist.jpg",
    submittedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@email.com",
    instrument: "Guitare",
    experience: "12 ans",
    status: "interview",
    score: 92,
    avatar: "/man-guitarist.jpg",
    submittedAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie.bernard@email.com",
    instrument: "Violon",
    experience: "15 ans",
    status: "pending",
    score: null,
    avatar: "/woman-violinist.jpg",
    submittedAt: "2024-01-16",
  },
]

const recentActivities = [
  { type: "enrollment", user: "Lucas P.", action: "s'est inscrit au cours Piano Débutant", time: "Il y a 5 min" },
  { type: "completion", user: "Emma R.", action: "a terminé le module Accords Jazz", time: "Il y a 12 min" },
  { type: "payment", user: "Thomas M.", action: "a souscrit à l'abonnement Premium", time: "Il y a 25 min" },
  { type: "teacher", user: "Prof. Martin", action: "a publié un nouveau cours", time: "Il y a 1h" },
  { type: "review", user: "Julie S.", action: "a laissé un avis 5 étoiles", time: "Il y a 2h" },
]

const alerts = [
  { type: "warning", message: "3 professeurs en sous-charge cette semaine", priority: "medium" },
  { type: "critical", message: "Serveur audio latence élevée (>50ms)", priority: "high" },
  { type: "info", message: "Mise à jour système prévue dimanche 02h00", priority: "low" },
]

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Tableau de bord Administration</h1>
              <p className="text-muted-foreground mt-1">Gérez votre plateforme musicale</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="gap-2 bg-primary">
                <UserPlus className="w-4 h-4" />
                Ajouter professeur
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-green-500 mt-1">{stat.change} ce mois</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  alert.priority === "high"
                    ? "bg-red-500/10 border-red-500/30 text-red-500"
                    : alert.priority === "medium"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-500"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="flex-1 text-foreground">{alert.message}</span>
                <Button variant="ghost" size="sm">
                  Voir
                </Button>
              </div>
            ))}
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
            <TabsTrigger value="moderation" className="gap-2 data-[state=active]:bg-background">
              <Shield className="w-4 h-4" />
              Modération
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-background">
              <PieChart className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Pending Teachers */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Candidatures Professeurs</CardTitle>
                    <CardDescription>En attente de validation</CardDescription>
                  </div>
                  <Badge variant="secondary">{pendingTeachers.length} en attente</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingTeachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {teacher.instrument} • {teacher.experience}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              teacher.status === "evaluation"
                                ? "default"
                                : teacher.status === "interview"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {teacher.status === "evaluation"
                              ? "Évaluation"
                              : teacher.status === "interview"
                                ? "Entretien"
                                : "En attente"}
                          </Badge>
                          {teacher.score && (
                            <span className="text-sm font-medium text-green-500">{teacher.score}/100</span>
                          )}
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
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "enrollment"
                              ? "bg-blue-500/20 text-blue-500"
                              : activity.type === "completion"
                                ? "bg-green-500/20 text-green-500"
                                : activity.type === "payment"
                                  ? "bg-amber-500/20 text-amber-500"
                                  : "bg-purple-500/20 text-purple-500"
                          }`}
                        >
                          {activity.type === "enrollment" ? (
                            <UserPlus className="w-4 h-4" />
                          ) : activity.type === "completion" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : activity.type === "payment" ? (
                            <DollarSign className="w-4 h-4" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Inscriptions mensuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 78, 90, 85, 110, 125, 140, 135, 150, 168, 175, 190].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-primary/80 rounded-t" style={{ height: `${(value / 200) * 100}%` }} />
                        <span className="text-xs text-muted-foreground">
                          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
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
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
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
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Rechercher un professeur..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="inactive">Inactifs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Professeur</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Élèves</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Prof. Martin", specialty: "Guitare Jazz", students: 45, rating: 4.9, status: "active" },
                    { name: "Prof. Dubois", specialty: "Piano Classique", students: 38, rating: 4.8, status: "active" },
                    { name: "Prof. Lefebvre", specialty: "Batterie", students: 32, rating: 4.7, status: "active" },
                    { name: "Prof. Moreau", specialty: "Chant", students: 28, rating: 4.9, status: "vacation" },
                    { name: "Prof. Simon", specialty: "Basse", students: 22, rating: 4.6, status: "active" },
                  ].map((teacher, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{teacher.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.specialty}</TableCell>
                      <TableCell>{teacher.students}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          {teacher.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                          {teacher.status === "active" ? "Actif" : "Vacances"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Gestion des Élèves</CardTitle>
                <CardDescription>12,847 élèves actifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Module de gestion des élèves en cours de développement...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Gestion des Cours</CardTitle>
                <CardDescription>324 cours publiés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Module de gestion des cours en cours de développement...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Centre de Modération</CardTitle>
                <CardDescription>Gérez le contenu et les signalements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Module de modération IA + humaine en cours de développement...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Analytics & Business Intelligence</CardTitle>
                <CardDescription>Métriques détaillées de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Dashboard Analytics avancé en cours de développement...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
