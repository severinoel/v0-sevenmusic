"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserPlus, Clock, Download, Award, DollarSign, CheckCircle, GraduationCap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { label: "Inscriptions ce mois", value: "347", change: "+23%", icon: UserPlus, color: "text-green-500" },
  { label: "Élèves actifs", value: "12,847", change: "+5%", icon: Users, color: "text-blue-500" },
  { label: "Taux assiduité", value: "89%", change: "+2%", icon: CheckCircle, color: "text-purple-500" },
  {
    label: "En attente paiement",
    value: "€12,450",
    change: "-8%",
    positive: true,
    icon: DollarSign,
    color: "text-amber-500",
  },
]

const levelDistribution = [
  { level: "Débutant", count: 4521, percentage: 35, color: "bg-green-500" },
  { level: "Intermédiaire", count: 5234, percentage: 41, color: "bg-blue-500" },
  { level: "Avancé", count: 2156, percentage: 17, color: "bg-purple-500" },
  { level: "Expert", count: 936, percentage: 7, color: "bg-amber-500" },
]

const recentEnrollments = [
  { name: "Lucas Martin", course: "Guitare Débutant", date: "Il y a 2h", payment: "completed" },
  { name: "Emma Dubois", course: "Piano Intermédiaire", date: "Il y a 5h", payment: "pending" },
  { name: "Thomas Bernard", course: "Batterie Avancé", date: "Il y a 8h", payment: "completed" },
  { name: "Julie Petit", course: "Chant Débutant", date: "Il y a 12h", payment: "completed" },
]

const waitingList = [
  { course: "Jazz Ensemble", count: 15, nextSlot: "Février 2024" },
  { course: "Production Musicale", count: 28, nextSlot: "Mars 2024" },
  { course: "Masterclass Guitare", count: 8, nextSlot: "Janvier 2024" },
]

const certifications = [
  { student: "Marie Lefebvre", level: "Guitare Avancé", score: 92, date: "2024-01-15" },
  { student: "Pierre Roux", level: "Piano Intermédiaire", score: 85, date: "2024-01-14" },
  { student: "Sophie Martin", level: "Chant Avancé", score: 88, date: "2024-01-13" },
]

export function ScolariteDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-green-500/10 via-background to-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Responsable Scolarité</h1>
                <p className="text-muted-foreground">Gestion des inscriptions et suivi des élèves</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Rapport
              </Button>
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4" />
                Nouvelle inscription
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p
                      className={`text-sm mt-1 ${stat.positive || stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Répartition par niveau */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Répartition par niveau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levelDistribution.map((level, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{level.level}</span>
                      <span className="text-muted-foreground">{level.count} élèves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${level.color}`} style={{ width: `${level.percentage}%` }} />
                      </div>
                      <span className="text-sm font-medium w-10 text-right">{level.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inscriptions récentes */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-green-500" />
                Inscriptions récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEnrollments.map((enrollment, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{enrollment.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{enrollment.name}</p>
                      <p className="text-xs text-muted-foreground">{enrollment.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={enrollment.payment === "completed" ? "default" : "secondary"} className="text-xs">
                        {enrollment.payment === "completed" ? "Payé" : "En attente"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{enrollment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Liste d'attente */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Liste d'attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {waitingList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div>
                      <p className="font-medium text-sm">{item.course}</p>
                      <p className="text-xs text-muted-foreground">Prochain: {item.nextSlot}</p>
                    </div>
                    <Badge variant="outline">{item.count} en attente</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications récentes */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Certifications à délivrer
            </CardTitle>
            <CardDescription>Élèves ayant validé leur niveau</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Niveau validé</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date examen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map((cert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{cert.student.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{cert.student}</span>
                      </div>
                    </TableCell>
                    <TableCell>{cert.level}</TableCell>
                    <TableCell>
                      <span className="text-green-500 font-medium">{cert.score}/100</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cert.date}</TableCell>
                    <TableCell>
                      <Button size="sm" className="gap-2">
                        <Award className="w-4 h-4" />
                        Délivrer
                      </Button>
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
