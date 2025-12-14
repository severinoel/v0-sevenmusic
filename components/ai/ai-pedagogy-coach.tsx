"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  Sparkles,
  MessageSquare,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Music,
  Clock,
  Calendar,
  Zap,
  Eye,
  Hand,
  Ear,
  BarChart3,
  Send,
} from "lucide-react"

const learningStyles = [
  { type: "Visuel", icon: Eye, score: 35, color: "bg-blue-500", description: "Partitions, diagrammes, vidéos" },
  { type: "Auditif", icon: Ear, score: 40, color: "bg-green-500", description: "Écoute, explications orales" },
  { type: "Kinesthésique", icon: Hand, score: 20, color: "bg-amber-500", description: "Pratique immédiate, jeux" },
  { type: "Logique", icon: Brain, score: 5, color: "bg-purple-500", description: "Théorie, structure, analyse" },
]

const detectedDifficulties = [
  { area: "Changements d'accords", severity: "high", since: "2 semaines", suggestion: "Module remédiation accords" },
  { area: "Rythme syncopé", severity: "medium", since: "1 semaine", suggestion: "Exercices métronome progressifs" },
  { area: "Lecture de tablatures", severity: "low", since: "3 jours", suggestion: "Tutoriel vidéo lecture TAB" },
]

const generatedExercises = [
  {
    title: "Transition Am → C fluide",
    type: "Exercice technique",
    duration: "5 min",
    difficulty: "Adapté à votre niveau",
    basedOn: "Erreurs détectées sur 'Wonderwall'",
  },
  {
    title: "Rythme pop basique avec variations",
    type: "Exercice rythmique",
    duration: "8 min",
    difficulty: "Challenge progressif",
    basedOn: "Style musical préféré: Pop/Rock",
  },
  {
    title: "Gamme pentatonique sur backing track blues",
    type: "Improvisation guidée",
    duration: "10 min",
    difficulty: "Exploration créative",
    basedOn: "Objectif: Improvisation",
  },
]

const chatMessages = [
  {
    role: "assistant",
    content:
      "Bonjour ! J'ai analysé votre dernière session de pratique. Vous avez fait d'excellents progrès sur les accords ouverts ! Je remarque toutefois quelques difficultés sur les transitions rapides. Voulez-vous qu'on travaille dessus aujourd'hui ?",
  },
  { role: "user", content: "Oui, j'ai du mal avec le passage de Sol à Do" },
  {
    role: "assistant",
    content:
      "C'est une transition très courante ! Voici quelques conseils personnalisés basés sur votre style d'apprentissage auditif :\n\n1. **Gardez l'annulaire ancré** - Il reste sur la même case\n2. **Visualisez le mouvement** avant de jouer\n3. **Pratiquez lentement** avec un métronome à 60 BPM\n\nJ'ai généré un exercice spécifique pour vous. Voulez-vous l'essayer maintenant ?",
  },
]

export function AIPedagogyCoach() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [chatInput, setChatInput] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-violet-500/10 via-background to-fuchsia-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
                Coach IA Pédagogique
                <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  IA
                </Badge>
              </h1>
              <p className="text-muted-foreground">Apprentissage personnalisé et adaptatif</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-background">
              <BarChart3 className="w-4 h-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-background">
              <MessageSquare className="w-4 h-4" />
              Assistant
            </TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2 data-[state=active]:bg-background">
              <Zap className="w-4 h-4" />
              Exercices IA
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2 data-[state=active]:bg-background">
              <Lightbulb className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Learning Style Analysis */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-violet-500" />
                    Style d'apprentissage
                  </CardTitle>
                  <CardDescription>Analyse basée sur vos interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningStyles.map((style, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg ${style.color} text-white flex items-center justify-center`}
                          >
                            <style.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{style.type}</span>
                        </div>
                        <span className="text-sm font-bold">{style.score}%</span>
                      </div>
                      <Progress value={style.score} className={`h-2 [&>div]:${style.color}`} />
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Recommandation:</strong> Vous apprenez mieux avec des exemples
                      audio et des explications orales. Les contenus ont été adaptés en conséquence.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detected Difficulties */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Difficultés détectées
                  </CardTitle>
                  <CardDescription>Points nécessitant une attention particulière</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {detectedDifficulties.map((diff, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          diff.severity === "high"
                            ? "bg-red-500/10 border-red-500/30"
                            : diff.severity === "medium"
                              ? "bg-amber-500/10 border-amber-500/30"
                              : "bg-blue-500/10 border-blue-500/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{diff.area}</h4>
                              <Badge
                                variant={
                                  diff.severity === "high"
                                    ? "destructive"
                                    : diff.severity === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {diff.severity === "high"
                                  ? "Prioritaire"
                                  : diff.severity === "medium"
                                    ? "Modéré"
                                    : "Mineur"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Détecté depuis {diff.since}</p>
                          </div>
                          <Button size="sm" variant="secondary">
                            Travailler
                          </Button>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>{diff.suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Plan */}
            <Card className="border-border bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-500" />
                  Plan d'entraînement du jour
                </CardTitle>
                <CardDescription>Généré par l'IA selon vos objectifs et disponibilités</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { time: "10 min", activity: "Échauffement", type: "Technique", icon: Hand },
                    { time: "15 min", activity: "Transitions Sol-Do", type: "Exercice ciblé", icon: Target },
                    { time: "20 min", activity: "Morceau en cours", type: "Application", icon: Music },
                    { time: "5 min", activity: "Théorie: accords 7ème", type: "Théorie", icon: BookOpen },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-background border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-500 flex items-center justify-center">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{item.time}</span>
                      </div>
                      <h4 className="font-semibold">{item.activity}</h4>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Durée totale: <strong>50 minutes</strong> • Adapté à votre objectif:{" "}
                    <strong>Jouer des chansons</strong>
                  </p>
                  <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                    Commencer la session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="border-border h-[600px] flex flex-col">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <AvatarFallback className="bg-transparent text-white">
                      <Brain className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Assistant Séverino</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      En ligne
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Posez votre question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon" className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* AI Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  Exercices générés par l'IA
                </CardTitle>
                <CardDescription>Personnalisés selon vos besoins et progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {generatedExercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-border bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 hover:border-violet-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{exercise.type}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exercise.duration}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{exercise.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{exercise.difficulty}</p>
                      <div className="text-xs text-violet-500 mb-4">
                        <Lightbulb className="w-3 h-3 inline mr-1" />
                        {exercise.basedOn}
                      </div>
                      <Button className="w-full" variant="secondary">
                        Commencer
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Sparkles className="w-4 h-4" />
                    Générer de nouveaux exercices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Patterns détectés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { insight: "Vous pratiquez mieux le matin (9h-11h)", type: "positive" },
                    { insight: "Sessions >45min montrent une baisse d'attention", type: "warning" },
                    { insight: "Meilleure progression sur exercices gamifiés", type: "positive" },
                    { insight: "Difficultés récurrentes après 2 jours sans pratique", type: "warning" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        item.type === "positive" ? "bg-green-500/10" : "bg-amber-500/10"
                      }`}
                    >
                      {item.type === "positive" ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      )}
                      <span className="text-sm">{item.insight}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Prédictions de progression</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30">
                    <h4 className="font-semibold mb-2">À ce rythme, vous atteindrez:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Niveau Intermédiaire dans <strong>3 semaines</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        Maîtrise des barrés dans <strong>6 semaines</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-purple-500" />
                        Premier solo dans <strong>2 mois</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Pour accélérer votre progression:
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Ajoutez 10 min/jour de pratique</li>
                      <li>• Focalisez sur les transitions d'accords</li>
                      <li>• Utilisez le métronome systématiquement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
