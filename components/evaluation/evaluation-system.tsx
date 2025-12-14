"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  Pause,
  RotateCcw,
  Star,
  Target,
  Award,
  Music,
  Mic,
  BarChart3,
  FileText,
  Video,
} from "lucide-react"

const quizTypes = [
  { type: "Choix multiple", icon: HelpCircle, color: "bg-blue-500" },
  { type: "Vrai/Faux", icon: CheckCircle, color: "bg-green-500" },
  { type: "Texte à trous", icon: FileText, color: "bg-purple-500" },
  { type: "Association", icon: Target, color: "bg-amber-500" },
  { type: "Questions audio", icon: Music, color: "bg-red-500" },
]

const sampleQuiz = {
  title: "Quiz: Accords de base",
  questions: [
    {
      id: 1,
      type: "multiple",
      question: "Quelles notes composent l'accord de Do majeur (C) ?",
      options: ["Do - Mi - Sol", "Do - Fa - La", "Ré - Fa# - La", "Mi - Sol# - Si"],
      correct: 0,
      explanation:
        "L'accord de Do majeur est composé de la fondamentale (Do), la tierce majeure (Mi) et la quinte juste (Sol).",
    },
    {
      id: 2,
      type: "true_false",
      question: "Un accord mineur a une tierce mineure.",
      correct: true,
      explanation: "Exact ! La différence entre un accord majeur et mineur réside dans la tierce.",
    },
  ],
  timeLimit: 600,
  passingScore: 70,
}

const performanceMetrics = {
  rhythmAccuracy: 85,
  pitchAccuracy: 78,
  tempo: 120,
  dynamics: 72,
  articulation: 80,
}

const competencies = [
  { name: "Accords majeurs", level: 85, evolution: "+12%", status: "mastered" },
  { name: "Accords mineurs", level: 72, evolution: "+8%", status: "progressing" },
  { name: "Barrés", level: 45, evolution: "+5%", status: "learning" },
  { name: "Arpèges", level: 68, evolution: "+15%", status: "progressing" },
  { name: "Gammes pentatoniques", level: 55, evolution: "+10%", status: "learning" },
]

export function EvaluationSystem() {
  const [selectedTab, setSelectedTab] = useState("quiz")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const handleAnswer = () => {
    setShowResult(true)
  }

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-green-500/10 via-background to-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Système d'Évaluation</h1>
              <p className="text-muted-foreground">Quiz adaptatifs et analyse de performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="quiz" className="gap-2 data-[state=active]:bg-background">
              <HelpCircle className="w-4 h-4" />
              Quiz interactifs
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2 data-[state=active]:bg-background">
              <Mic className="w-4 h-4" />
              Analyse audio
            </TabsTrigger>
            <TabsTrigger value="competencies" className="gap-2 data-[state=active]:bg-background">
              <BarChart3 className="w-4 h-4" />
              Compétences
            </TabsTrigger>
            <TabsTrigger value="exams" className="gap-2 data-[state=active]:bg-background">
              <FileText className="w-4 h-4" />
              Examens
            </TabsTrigger>
          </TabsList>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quiz Types */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Types de quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quizTypes.map((quiz, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className={`w-8 h-8 rounded-lg ${quiz.color} text-white flex items-center justify-center`}>
                          <quiz.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{quiz.type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Quiz */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{sampleQuiz.title}</CardTitle>
                      <CardDescription>
                        Question {currentQuestion + 1} / {sampleQuiz.questions.length}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">09:45</span>
                    </div>
                  </div>
                  <Progress value={(currentQuestion / sampleQuiz.questions.length) * 100} className="h-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentQuestion < sampleQuiz.questions.length ? (
                    <>
                      <div className="p-4 rounded-lg bg-secondary/30">
                        <p className="text-lg font-medium">{sampleQuiz.questions[currentQuestion].question}</p>
                      </div>

                      {sampleQuiz.questions[currentQuestion].type === "multiple" && (
                        <RadioGroup
                          value={selectedAnswer?.toString()}
                          onValueChange={(v) => setSelectedAnswer(Number.parseInt(v))}
                        >
                          {sampleQuiz.questions[currentQuestion].options?.map((option, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                                showResult
                                  ? index === sampleQuiz.questions[currentQuestion].correct
                                    ? "bg-green-500/20 border-green-500"
                                    : selectedAnswer === index
                                      ? "bg-red-500/20 border-red-500"
                                      : "border-border"
                                  : selectedAnswer === index
                                    ? "bg-primary/10 border-primary"
                                    : "border-border hover:border-primary/50"
                              }`}
                            >
                              <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult} />
                              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                              {showResult && index === sampleQuiz.questions[currentQuestion].correct && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                              {showResult &&
                                selectedAnswer === index &&
                                index !== sampleQuiz.questions[currentQuestion].correct && (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {showResult && (
                        <div
                          className={`p-4 rounded-lg ${
                            selectedAnswer === sampleQuiz.questions[currentQuestion].correct
                              ? "bg-green-500/10 border border-green-500/30"
                              : "bg-amber-500/10 border border-amber-500/30"
                          }`}
                        >
                          <p className="text-sm">
                            <strong>Explication:</strong> {sampleQuiz.questions[currentQuestion].explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <RotateCcw className="w-4 h-4" />
                          Recommencer
                        </Button>
                        {!showResult ? (
                          <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
                            Valider
                          </Button>
                        ) : (
                          <Button onClick={nextQuestion}>Question suivante</Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                      <h3 className="text-xl font-bold mb-2">Quiz terminé !</h3>
                      <p className="text-muted-foreground mb-4">Score: 85% - Excellent !</p>
                      <Button
                        onClick={() => {
                          setCurrentQuestion(0)
                          setShowResult(false)
                        }}
                      >
                        Recommencer
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audio Analysis Tab */}
          <TabsContent value="audio" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recording Section */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mic className="w-5 h-5 text-red-500" />
                    Enregistrement audio
                  </CardTitle>
                  <CardDescription>Jouez l'exercice et recevez un feedback instantané</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Waveform placeholder */}
                  <div className="h-32 bg-secondary/30 rounded-lg flex items-center justify-center">
                    <div className="flex items-end gap-1 h-16">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 bg-primary rounded-full transition-all ${
                            isRecording ? "animate-pulse" : ""
                          }`}
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      className={`rounded-full w-16 h-16 ${isRecording ? "bg-red-500 hover:bg-red-600" : ""}`}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <Pause className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    {isRecording ? "Enregistrement en cours..." : "Cliquez pour commencer l'enregistrement"}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Analyse de performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(performanceMetrics).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span
                          className={`font-medium ${
                            value >= 80 ? "text-green-500" : value >= 60 ? "text-amber-500" : "text-red-500"
                          }`}
                        >
                          {key === "tempo" ? `${value} BPM` : `${value}%`}
                        </span>
                      </div>
                      {key !== "tempo" && (
                        <Progress
                          value={value}
                          className={`h-2 ${
                            value >= 80
                              ? "[&>div]:bg-green-500"
                              : value >= 60
                                ? "[&>div]:bg-amber-500"
                                : "[&>div]:bg-red-500"
                          }`}
                        />
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-3">Points à améliorer</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-amber-500 mt-0.5" />
                        La justesse sur les notes aiguës (mesures 5-8)
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-amber-500 mt-0.5" />
                        Dynamique plus marquée sur le refrain
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Competencies Tab */}
          <TabsContent value="competencies" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Tableau de bord des compétences</CardTitle>
                <CardDescription>Votre progression sur chaque compétence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {competencies.map((comp, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{comp.name}</span>
                          <Badge
                            variant={
                              comp.status === "mastered"
                                ? "default"
                                : comp.status === "progressing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {comp.status === "mastered"
                              ? "Maîtrisé"
                              : comp.status === "progressing"
                                ? "En progression"
                                : "En apprentissage"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm ${comp.evolution.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {comp.evolution}
                          </span>
                          <span className="font-bold">{comp.level}%</span>
                        </div>
                      </div>
                      <Progress
                        value={comp.level}
                        className={`h-3 ${
                          comp.level >= 80
                            ? "[&>div]:bg-green-500"
                            : comp.level >= 60
                              ? "[&>div]:bg-blue-500"
                              : "[&>div]:bg-amber-500"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Recommandations personnalisées
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      → Module suivant recommandé: <strong>Accords 7ème</strong>
                    </li>
                    <li>
                      → Exercices suggérés pour les barrés: <strong>#24, #25, #26</strong>
                    </li>
                    <li>
                      → Groupe de pratique disponible: <strong>Jazz débutant (niveau similaire)</strong>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Examens officiels</CardTitle>
                <CardDescription>Sessions d'évaluation surveillées pour certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      level: "Guitare Débutant",
                      date: "25 Jan 2024",
                      time: "14:00",
                      duration: "45 min",
                      status: "upcoming",
                    },
                    {
                      level: "Piano Intermédiaire",
                      date: "1 Fév 2024",
                      time: "10:00",
                      duration: "60 min",
                      status: "registered",
                    },
                  ].map((exam, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-secondary/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{exam.level}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exam.date} à {exam.time}
                          </p>
                        </div>
                        <Badge variant={exam.status === "upcoming" ? "default" : "secondary"}>
                          {exam.status === "upcoming" ? "À venir" : "Inscrit"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          Surveillance webcam
                        </span>
                      </div>
                      <Button className="w-full">{exam.status === "upcoming" ? "S'inscrire" : "Voir détails"}</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
