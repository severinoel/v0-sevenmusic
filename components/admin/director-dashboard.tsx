"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  BookOpen,
  Target,
  BarChart3,
  Bell,
  Settings,
  FileText,
  Award,
  UserCheck,
  DollarSign,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const kpis = [
  {
    label: "Élèves actifs",
    value: "12,847",
    change: "+12%",
    target: "15,000",
    progress: 86,
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Taux rétention",
    value: "87%",
    change: "+3%",
    target: "90%",
    progress: 97,
    icon: TrendingUp,
    color: "text-green-500",
  },
  { label: "NPS Score", value: "72", change: "+5", target: "75", progress: 96, icon: Target, color: "text-purple-500" },
  {
    label: "Revenus/mois",
    value: "€89,450",
    change: "+18%",
    target: "€100,000",
    progress: 89,
    icon: DollarSign,
    color: "text-amber-500",
  },
]

const alerts = [
  { type: "warning", message: "5 professeurs en sous-charge (<10h/semaine)", priority: "medium", action: "Réaffecter" },
  { type: "critical", message: "3 classes surchargées (>25 élèves)", priority: "high", action: "Diviser" },
  {
    type: "warning",
    message: "12 élèves en risque d'abandon (inactifs >2 sem)",
    priority: "medium",
    action: "Contacter",
  },
  { type: "info", message: "2 incidents pédagogiques en attente", priority: "low", action: "Examiner" },
]

const pendingValidations = [
  { type: "Nouveau cursus", name: "Jazz Avancé - Improvisation", author: "Prof. Martin", date: "Il y a 2h" },
  { type: "Nouveau professeur", name: "Marie Dupont - Piano", score: 92, date: "Il y a 5h" },
  { type: "Grille tarifaire", name: "Mise à jour tarifs Premium", impact: "+5%", date: "Il y a 1j" },
  { type: "Promotion", name: "Black Friday -30%", dates: "22-29 Nov", date: "Il y a 2j" },
]

const retentionByLevel = [
  { level: "Débutant", students: 4521, retention: 82, completion: 68 },
  { level: "Intermédiaire", students: 5234, retention: 89, completion: 75 },
  { level: "Avancé", students: 2156, retention: 94, completion: 82 },
  { level: "Expert", students: 936, retention: 97, completion: 88 },
]

export function DirectorDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-purple-500/10 via-background to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Directeur Pédagogique</h1>
                <p className="text-muted-foreground">Vue d'ensemble et gestion pédagogique</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  4
                </span>
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <FileText className="w-4 h-4" />
                Rapport hebdo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs avec objectifs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${kpi.color}`}>
                    <kpi.icon className="w-5 h-5" />
                  </div>
                  <Badge variant={kpi.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                    {kpi.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Objectif: {kpi.target}</span>
                    <span>{kpi.progress}%</span>
                  </div>
                  <Progress value={kpi.progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alertes prioritaires */}
        <div className="mb-8 space-y-2">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Alertes prioritaires
          </h2>
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                alert.priority === "high"
                  ? "bg-red-500/10 border-red-500/30"
                  : alert.priority === "medium"
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${
                  alert.priority === "high"
                    ? "text-red-500"
                    : alert.priority === "medium"
                      ? "text-amber-500"
                      : "text-blue-500"
                }`}
              />
              <span className="flex-1 text-foreground">{alert.message}</span>
              <Button size="sm" variant="secondary">
                {alert.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Validations en attente */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Actions rapides
                </CardTitle>
                <CardDescription>Validations en attente</CardDescription>
              </div>
              <Badge variant="secondary">{pendingValidations.length} en attente</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingValidations.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.type === "Nouveau cursus"
                            ? "bg-purple-500/20 text-purple-500"
                            : item.type === "Nouveau professeur"
                              ? "bg-blue-500/20 text-blue-500"
                              : item.type === "Grille tarifaire"
                                ? "bg-amber-500/20 text-amber-500"
                                : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {item.type === "Nouveau cursus" ? (
                          <BookOpen className="w-5 h-5" />
                        ) : item.type === "Nouveau professeur" ? (
                          <UserCheck className="w-5 h-5" />
                        ) : item.type === "Grille tarifaire" ? (
                          <DollarSign className="w-5 h-5" />
                        ) : (
                          <Award className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.type} • {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-500 hover:text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rétention par niveau */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Rétention par niveau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionByLevel.map((level, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{level.level}</span>
                      <span className="text-sm text-muted-foreground">{level.students} élèves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={level.retention} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{level.retention}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Taux de remplissage des classes */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Taux de remplissage des classes</CardTitle>
            <CardDescription>Par instrument et niveau</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classe</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Élèves</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Remplissage</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Guitare Débutant A", prof: "Prof. Martin", students: 18, capacity: 20, status: "optimal" },
                  {
                    name: "Piano Intermédiaire",
                    prof: "Prof. Dubois",
                    students: 26,
                    capacity: 20,
                    status: "surcharge",
                  },
                  { name: "Batterie Avancé", prof: "Prof. Lefebvre", students: 8, capacity: 15, status: "sous-charge" },
                  { name: "Chant Débutant", prof: "Prof. Moreau", students: 15, capacity: 20, status: "optimal" },
                  { name: "Jazz Ensemble", prof: "Prof. Martin", students: 12, capacity: 12, status: "complet" },
                ].map((classe, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{classe.name}</TableCell>
                    <TableCell>{classe.prof}</TableCell>
                    <TableCell>{classe.students}</TableCell>
                    <TableCell>{classe.capacity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={(classe.students / classe.capacity) * 100}
                          className={`h-2 w-20 ${
                            classe.status === "surcharge"
                              ? "[&>div]:bg-red-500"
                              : classe.status === "sous-charge"
                                ? "[&>div]:bg-amber-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                        <span className="text-sm">{Math.round((classe.students / classe.capacity) * 100)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          classe.status === "surcharge"
                            ? "destructive"
                            : classe.status === "sous-charge"
                              ? "secondary"
                              : classe.status === "complet"
                                ? "default"
                                : "outline"
                        }
                      >
                        {classe.status === "surcharge"
                          ? "Surcharge"
                          : classe.status === "sous-charge"
                            ? "Sous-charge"
                            : classe.status === "complet"
                              ? "Complet"
                              : "Optimal"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
