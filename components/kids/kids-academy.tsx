"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Trophy,
  Music,
  Gamepad2,
  Heart,
  Sparkles,
  Play,
  Lock,
  Rocket,
  Smile,
  Crown,
  Zap,
  Target,
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Mes premiers accords",
    level: 1,
    progress: 75,
    stars: 2,
    maxStars: 3,
    color: "from-pink-400 to-rose-500",
    unlocked: true,
  },
  {
    id: 2,
    title: "Rythme et tempo",
    level: 1,
    progress: 40,
    stars: 1,
    maxStars: 3,
    color: "from-blue-400 to-cyan-500",
    unlocked: true,
  },
  {
    id: 3,
    title: "Chanter juste",
    level: 2,
    progress: 0,
    stars: 0,
    maxStars: 3,
    color: "from-amber-400 to-orange-500",
    unlocked: true,
  },
  {
    id: 4,
    title: "Piano magique",
    level: 3,
    progress: 0,
    stars: 0,
    maxStars: 3,
    color: "from-purple-400 to-violet-500",
    unlocked: false,
  },
]

const achievements = [
  { name: "Première note", icon: Music, earned: true, color: "text-green-500" },
  { name: "Super rythme", icon: Zap, earned: true, color: "text-amber-500" },
  { name: "Maestro", icon: Crown, earned: false, color: "text-purple-500" },
  { name: "Champion", icon: Trophy, earned: false, color: "text-blue-500" },
]

const dailyMissions = [
  { task: "Jouer 10 minutes", progress: 80, reward: 50 },
  { task: "Réussir un mini-jeu", progress: 100, reward: 30 },
  { task: "Apprendre un nouvel accord", progress: 0, reward: 100 },
]

export function KidsAcademy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-background to-pink-100 dark:from-sky-950/30 dark:via-background dark:to-pink-950/30">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Séverino Kids Academy
              </h1>
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground mb-8">Apprends la musique en t'amusant !</p>

            {/* Player Stats */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Card className="border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Étoiles</p>
                    <p className="text-2xl font-bold text-amber-600">127</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-purple-500" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Niveau</p>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-400 bg-pink-50 dark:bg-pink-950/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Série</p>
                    <p className="text-2xl font-bold text-pink-600">5 jours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300/30 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-300/30 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                Mes aventures musicales
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <Card
                    key={course.id}
                    className={`border-2 overflow-hidden transition-transform hover:scale-105 ${
                      course.unlocked ? "border-transparent" : "border-gray-300 opacity-75"
                    }`}
                  >
                    <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            Niveau {course.level}
                          </Badge>
                          <h3 className="font-bold text-lg">{course.title}</h3>
                        </div>
                        {!course.unlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                      </div>

                      {course.unlocked && (
                        <>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: course.maxStars }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < course.stars ? "text-amber-500 fill-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Progress value={course.progress} className="h-3 mb-3" />
                          <Button className={`w-full bg-gradient-to-r ${course.color} border-0`}>
                            <Play className="w-4 h-4 mr-2" />
                            {course.progress > 0 ? "Continuer" : "Commencer"}
                          </Button>
                        </>
                      )}

                      {!course.unlocked && (
                        <p className="text-sm text-muted-foreground">
                          Termine le niveau {course.level - 1} pour débloquer !
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mini Games */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-green-500" />
                Mini-jeux
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "Memory Musical", color: "from-green-400 to-emerald-500", icon: "🎵" },
                  { name: "Quiz Notes", color: "from-blue-400 to-indigo-500", icon: "❓" },
                  { name: "Rythme Tap", color: "from-orange-400 to-red-500", icon: "🥁" },
                ].map((game, index) => (
                  <Card
                    key={index}
                    className="border-2 border-transparent hover:border-primary transition-all cursor-pointer group"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform`}
                      >
                        {game.icon}
                      </div>
                      <h3 className="font-bold">{game.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Missions */}
            <Card className="border-2 border-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                  <Target className="w-5 h-5" />
                  Missions du jour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyMissions.map((mission, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={mission.progress === 100 ? "line-through text-muted-foreground" : ""}>
                        {mission.task}
                      </span>
                      <Badge variant={mission.progress === 100 ? "default" : "outline"}>
                        +{mission.reward} <Star className="w-3 h-3 ml-1" />
                      </Badge>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Trophy className="w-5 h-5" />
                  Mes badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        achievement.earned ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-900 opacity-50"
                      }`}
                    >
                      <achievement.icon
                        className={`w-8 h-8 mx-auto mb-2 ${achievement.earned ? achievement.color : "text-gray-400"}`}
                      />
                      <p className="text-xs font-medium">{achievement.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mascot */}
            <Card className="border-2 border-pink-400 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-4 text-5xl">
                  🎸
                </div>
                <h3 className="font-bold text-lg mb-2">Bravo champion !</h3>
                <p className="text-sm text-muted-foreground">Tu as super bien joué aujourd'hui ! Continue comme ça !</p>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <Smile className="w-6 h-6 text-amber-500" />
                  <Smile className="w-6 h-6 text-amber-500" />
                  <Smile className="w-6 h-6 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
