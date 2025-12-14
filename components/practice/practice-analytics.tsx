"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  TrendingUp,
  Target,
  Flame,
  Music,
  Mic,
  Award,
  Play,
  Zap,
  Brain,
  Eye,
  Hand,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

const weeklyData = [
  { day: "Lun", minutes: 45, goal: 60 },
  { day: "Mar", minutes: 65, goal: 60 },
  { day: "Mer", minutes: 30, goal: 60 },
  { day: "Jeu", minutes: 75, goal: 60 },
  { day: "Ven", minutes: 50, goal: 60 },
  { day: "Sam", minutes: 90, goal: 60 },
  { day: "Dim", minutes: 40, goal: 60 },
]

const skills = [
  { name: "Accords majeurs", level: 85, trend: "+5%" },
  { name: "Accords mineurs", level: 78, trend: "+8%" },
  { name: "Gamme pentatonique", level: 65, trend: "+12%" },
  { name: "Fingerpicking", level: 42, trend: "+3%" },
  { name: "Rythme & Tempo", level: 72, trend: "+6%" },
  { name: "Lecture de tablature", level: 90, trend: "+2%" },
]

const recentSessions = [
  {
    id: 1,
    date: "Aujourd'hui",
    duration: "45 min",
    type: "Technique",
    score: 87,
    focus: "Accords Jazz",
  },
  {
    id: 2,
    date: "Hier",
    duration: "60 min",
    type: "Chanson",
    score: 92,
    focus: "Hotel California",
  },
  {
    id: 3,
    date: "Il y a 2 jours",
    duration: "30 min",
    type: "Gammes",
    score: 78,
    focus: "Gamme mineure",
  },
]

const aiSuggestions = [
  {
    type: "improvement",
    title: "Travaillez vos transitions d'accords",
    description: "Vos changements entre Am et G sont légèrement lents. Exercice recommandé: 5 min de drill quotidien.",
    priority: "high",
  },
  {
    type: "posture",
    title: "Position du poignet gauche",
    description: "Angle détecté à 35°, recommandé <20° pour éviter les tensions. Ajustez votre posture.",
    priority: "medium",
  },
  {
    type: "practice",
    title: "Excellente régularité!",
    description: "Vous avez pratiqué 6 jours cette semaine. Continuez ainsi pour maximiser votre progression.",
    priority: "low",
  },
]

export function PracticeAnalytics() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Practice Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Suivez votre progression et recevez des conseils personnalisés de l'IA
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Série active</p>
                    <p className="text-2xl font-bold text-primary">12 jours</p>
                  </div>
                </CardContent>
              </Card>
              <Button size="lg" className="gap-2 bg-primary">
                <Play className="w-5 h-5" />
                Démarrer session
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cette semaine</p>
                  <p className="text-xl font-bold">6h 35min</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Objectif atteint</p>
                  <p className="text-xl font-bold">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progression</p>
                  <p className="text-xl font-bold">+15%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Score moyen</p>
                  <p className="text-xl font-bold">85/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Chart */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Temps de pratique</CardTitle>
                    <CardDescription>Objectif: 60 min/jour</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Cette semaine
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs text-muted-foreground mb-1">{day.minutes}m</span>
                        <div
                          className={`w-full rounded-t transition-all ${
                            day.minutes >= day.goal ? "bg-green-500" : "bg-primary/60"
                          }`}
                          style={{ height: `${(day.minutes / 100) * 150}px` }}
                        />
                        <div className="w-full h-1 bg-dashed border-t-2 border-dashed border-muted-foreground/30" />
                      </div>
                      <span className="text-sm font-medium">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
                <CardDescription>Progression par domaine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-500">{skill.trend}</span>
                        <span className="text-sm font-medium">{skill.level}%</span>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Coach Section */}
            <Card className="border-border border-primary/30">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Coach IA - Recommandations</CardTitle>
                    <CardDescription>Basé sur vos 50 dernières sessions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      suggestion.priority === "high"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : suggestion.priority === "medium"
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-green-500/10 border-green-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {suggestion.type === "improvement" ? (
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      ) : suggestion.type === "posture" ? (
                        <Hand className="w-5 h-5 text-blue-500 mt-0.5" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Sessions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Sessions récentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Music className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.focus}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.date} • {session.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={session.score >= 85 ? "default" : "secondary"}>{session.score}%</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Voir tout l'historique
                </Button>
              </CardContent>
            </Card>

            {/* Posture Analysis */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Analyse Posture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Activez la caméra pour</p>
                    <p className="text-sm text-muted-foreground">l'analyse en temps réel</p>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Eye className="w-4 h-4" />
                  Activer analyse posture
                </Button>
              </CardContent>
            </Card>

            {/* Quick Practice */}
            <Card className="border-border bg-gradient-to-br from-primary/10 to-purple-500/10">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Session rapide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  15 minutes d'exercices ciblés basés sur vos points faibles
                </p>
                <Button className="w-full bg-primary">Commencer</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
