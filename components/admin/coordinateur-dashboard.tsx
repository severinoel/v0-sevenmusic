"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Target,
  Clock,
  CheckCircle2,
  ArrowUp,
  FileText,
  Video,
  Share2,
} from "lucide-react"

export function CoordinateurDashboard() {
  const [selectedLevel, setSelectedLevel] = useState("intermediaire")

  const levels = [
    { id: "debutant", name: "Débutant", students: 245, teachers: 8 },
    { id: "intermediaire", name: "Intermédiaire", students: 189, teachers: 6 },
    { id: "avance", name: "Avancé", students: 98, teachers: 4 },
    { id: "expert", name: "Expert", students: 34, teachers: 2 },
  ]

  const currentLevel = levels.find((l) => l.id === selectedLevel)

  const classStats = [
    { name: "Guitare Acoustique", progress: 78, students: 24, teacher: "Marie D.", status: "on_track" },
    { name: "Piano Jazz", progress: 65, students: 18, teacher: "Jean P.", status: "behind" },
    { name: "Théorie Musicale", progress: 82, students: 32, teacher: "Sophie L.", status: "on_track" },
    { name: "Chant Moderne", progress: 71, students: 20, teacher: "Luc M.", status: "on_track" },
    { name: "Batterie Rock", progress: 45, students: 15, teacher: "Pierre R.", status: "at_risk" },
  ]

  const teacherPerformance = [
    { name: "Marie Dupont", avatar: "/woman-instructor.png", rating: 4.9, progressRate: 92, students: 45 },
    { name: "Jean Petit", avatar: "/man-piano-instructor.jpg", rating: 4.7, progressRate: 85, students: 38 },
    { name: "Sophie Laurent", avatar: "/woman-theory-instructor.jpg", rating: 4.8, progressRate: 88, students: 52 },
    { name: "Luc Martin", avatar: "/man-drummer.jpg", rating: 4.5, progressRate: 78, students: 28 },
  ]

  const weakPoints = [
    { topic: "Lecture de partitions", percentage: 45, affectedStudents: 89 },
    { topic: "Improvisation", percentage: 52, affectedStudents: 67 },
    { topic: "Oreille musicale", percentage: 58, affectedStudents: 54 },
    { topic: "Rythmes complexes", percentage: 61, affectedStudents: 43 },
  ]

  const upcomingMeetings = [
    { title: "Réunion équipe niveau", date: "Aujourd'hui 15:00", participants: 6, type: "team" },
    { title: "Point progression élèves", date: "Demain 10:00", participants: 4, type: "review" },
    { title: "Harmonisation évaluations", date: "Ven. 14:00", participants: 8, type: "evaluation" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Coordinateur</h1>
          <p className="text-muted-foreground">Supervision et harmonisation du niveau</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionner niveau" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name} ({level.students} élèves)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <FileText className="mr-2 h-4 w-4" />
            Rapport Niveau
          </Button>
        </div>
      </div>

      {/* KPIs du niveau */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Élèves du niveau</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentLevel?.students}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              +12 ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progression moyenne</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <Progress value={72} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux réussite examens</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Objectif: 80%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Élèves à risque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">Nécessitent attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="profs">Professeurs</TabsTrigger>
          <TabsTrigger value="points">Points faibles</TabsTrigger>
          <TabsTrigger value="ressources">Ressources</TabsTrigger>
          <TabsTrigger value="reunions">Réunions</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progression des classes</CardTitle>
              <CardDescription>Suivi de l'avancement par classe du niveau {currentLevel?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {classStats.map((cls, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{cls.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {cls.students} élèves
                        </Badge>
                        <span className="text-sm text-muted-foreground">Prof: {cls.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {cls.status === "on_track" && (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            En bonne voie
                          </Badge>
                        )}
                        {cls.status === "behind" && (
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            <Clock className="mr-1 h-3 w-3" />
                            En retard
                          </Badge>
                        )}
                        {cls.status === "at_risk" && (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                            <AlertTriangle className="mr-1 h-3 w-3" />À risque
                          </Badge>
                        )}
                        <span className="font-semibold">{cls.progress}%</span>
                      </div>
                    </div>
                    <Progress
                      value={cls.progress}
                      className={`h-2 ${
                        cls.status === "at_risk"
                          ? "[&>div]:bg-red-500"
                          : cls.status === "behind"
                            ? "[&>div]:bg-yellow-500"
                            : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des professeurs</CardTitle>
              <CardDescription>Efficacité et satisfaction par professeur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherPerformance.map((teacher, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                        <AvatarFallback>
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-muted-foreground">{teacher.students} élèves</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Note</div>
                        <div className="font-semibold text-yellow-500">{teacher.rating}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Progression élèves</div>
                        <div className="font-semibold text-green-500">{teacher.progressRate}%</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Feedback
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="points" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Points faibles identifiés</CardTitle>
              <CardDescription>Compétences à renforcer pour le niveau {currentLevel?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weakPoints.map((point, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{point.topic}</div>
                        <div className="text-sm text-muted-foreground">{point.affectedStudents} élèves concernés</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-red-500 font-semibold">{point.percentage}% maîtrise</span>
                        <Button size="sm" variant="outline">
                          <Target className="mr-2 h-4 w-4" />
                          Plan d'action
                        </Button>
                      </div>
                    </div>
                    <Progress value={point.percentage} className="h-2 [&>div]:bg-red-500" />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h4 className="font-semibold text-orange-500 mb-2">Suggestions IA</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500" />
                    Ajouter 3 exercices interactifs de lecture de partitions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500" />
                    Organiser un atelier d'improvisation guidée
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500" />
                    Proposer des exercices d'oreille musicale quotidiens
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ressources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ressources partagées</CardTitle>
              <CardDescription>Matériel pédagogique commun au niveau</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Documents</div>
                      <div className="text-sm text-muted-foreground">45 fichiers</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir tout
                  </Button>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Video className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-medium">Vidéos</div>
                      <div className="text-sm text-muted-foreground">28 vidéos</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir tout
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Derniers ajouts</h4>
                <div className="space-y-2">
                  {[
                    { name: "Grille d'évaluation Q4", type: "PDF", author: "Marie D.", date: "Aujourd'hui" },
                    { name: "Exercices gammes mineures", type: "Video", author: "Jean P.", date: "Hier" },
                    { name: "Backing tracks jazz", type: "Audio", author: "Sophie L.", date: "Il y a 2 jours" },
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{resource.name}</div>
                          <div className="text-xs text-muted-foreground">Par {resource.author}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{resource.date}</span>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reunions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Réunions programmées</CardTitle>
                <CardDescription>Coordination de l'équipe pédagogique</CardDescription>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Calendar className="mr-2 h-4 w-4" />
                Nouvelle réunion
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          meeting.type === "team"
                            ? "bg-blue-500/10"
                            : meeting.type === "review"
                              ? "bg-green-500/10"
                              : "bg-purple-500/10"
                        }`}
                      >
                        <Calendar
                          className={`h-5 w-5 ${
                            meeting.type === "team"
                              ? "text-blue-500"
                              : meeting.type === "review"
                                ? "text-green-500"
                                : "text-purple-500"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{meeting.title}</div>
                        <div className="text-sm text-muted-foreground">{meeting.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{meeting.participants} participants</Badge>
                      <Button variant="outline" size="sm">
                        Rejoindre
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
