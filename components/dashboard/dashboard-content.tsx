"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Flame, Trophy, Target, Music, Play, TrendingUp, Calendar, Star, Zap } from "lucide-react"
import type { Profile, PracticeSession, Achievement } from "@/lib/types/database"

interface DashboardContentProps {
  profile: Profile | null
  recentPractice: PracticeSession[]
  enrollments: Array<{
    id: string
    progress_percentage: number
    courses: {
      id: string
      title: string
      lessons_count: number
      instructor_id: string
    } | null
  }>
  achievements: Array<{
    unlocked_at: string
    achievements: Achievement | null
  }>
}

export function DashboardContent({ profile, recentPractice, enrollments, achievements }: DashboardContentProps) {
  // Calculate stats from real data
  const totalPracticeMinutes = recentPractice.reduce((acc, s) => acc + s.duration_minutes, 0)
  const totalPracticeHours = Math.floor(totalPracticeMinutes / 60)
  const remainingMinutes = totalPracticeMinutes % 60

  const stats = [
    {
      label: "Temps de pratique",
      value: `${totalPracticeHours}h ${remainingMinutes}m`,
      change: "+2h30",
      icon: Clock,
      trend: "up",
    },
    { label: "Série actuelle", value: `${profile?.level || 1} jours`, change: "+1", icon: Flame, trend: "up" },
    {
      label: "XP total",
      value: profile?.xp_points?.toLocaleString() || "0",
      change: "+350",
      icon: Zap,
      trend: "up",
    },
    { label: "Badges", value: achievements.length.toString(), change: "+2", icon: Trophy, trend: "up" },
  ]

  // Map practice sessions to activity
  const recentActivity = recentPractice.slice(0, 4).map((session) => ({
    type: "practice" as const,
    title: "Session de pratique",
    description: session.activity_type,
    time: new Date(session.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
    xp: session.xp_earned,
  }))

  // Add achievements to activity
  achievements.slice(0, 2).forEach((a) => {
    if (a.achievements) {
      recentActivity.push({
        type: "badge" as const,
        title: "Badge débloqué",
        description: a.achievements.name,
        time: new Date(a.unlocked_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
        xp: a.achievements.xp_reward,
      })
    }
  })

  const dailyChallenges = [
    {
      title: "Pratiquer 30 minutes",
      progress: Math.min(100, (totalPracticeMinutes / 30) * 100),
      xp: 50,
      completed: totalPracticeMinutes >= 30,
    },
    {
      title: "Terminer un exercice",
      progress: recentPractice.length > 0 ? 100 : 0,
      xp: 25,
      completed: recentPractice.length > 0,
    },
    { title: "Poster une performance", progress: 0, xp: 75, completed: false },
    { title: "Commenter 3 posts", progress: 66, xp: 30, completed: false },
  ]

  const displayName = profile?.display_name || "Musicien"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const xpForNextLevel = (profile?.level || 1) * 1000
  const currentXpInLevel = (profile?.xp_points || 0) % 1000
  const levelProgress = (currentXpInLevel / 1000) * 100

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bonjour, {displayName} !</h1>
          <p className="text-muted-foreground">Continuez votre progression musicale aujourd'hui.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Planifier
          </Button>
          <Button asChild>
            <Link href="/practice">
              <Play className="w-4 h-4 mr-2" />
              Commencer une session
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats grid - using real data */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current courses - using real enrollments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mes cours en cours</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/ecole">Voir tout</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Music className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground truncate">{enrollment.courses?.title || "Cours"}</h4>
                        <span className="text-sm text-muted-foreground">{enrollment.progress_percentage}%</span>
                      </div>
                      <Progress value={enrollment.progress_percentage} className="h-2 mb-1" />
                    </div>
                    <Button size="sm">Continuer</Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Vous n'êtes inscrit à aucun cours</p>
                  <Button asChild>
                    <Link href="/ecole">Découvrir les cours</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          activity.type === "practice"
                            ? "bg-blue-500/10 text-blue-500"
                            : activity.type === "course"
                              ? "bg-green-500/10 text-green-500"
                              : activity.type === "badge"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-purple-500/10 text-purple-500"
                        }`}
                      >
                        {activity.type === "practice" && <Clock className="w-4 h-4" />}
                        {activity.type === "course" && <Target className="w-4 h-4" />}
                        {activity.type === "badge" && <Trophy className="w-4 h-4" />}
                        {activity.type === "social" && <Star className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-foreground">{activity.title}</p>
                          <Badge variant="secondary" className="text-xs">
                            +{activity.xp} XP
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune activité récente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile card - using real profile data */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-foreground mb-1">{displayName}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Niveau {profile?.level || 1} •{" "}
                {profile?.skill_level === "beginner"
                  ? "Débutant"
                  : profile?.skill_level === "intermediate"
                    ? "Intermédiaire"
                    : profile?.skill_level === "advanced"
                      ? "Avancé"
                      : "Expert"}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Niveau {profile?.level || 1}</span>
                  <span className="text-muted-foreground">{currentXpInLevel} / 1000 XP</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
              <Button className="w-full mt-4 bg-transparent" variant="outline" asChild>
                <Link href="/profil">Voir mon profil</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Daily challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Défis du jour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dailyChallenges.map((challenge, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {challenge.completed ? (
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-accent-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-border" />
                      )}
                      <span
                        className={`text-sm ${challenge.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {challenge.title}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{challenge.xp} XP
                    </Badge>
                  </div>
                  {!challenge.completed && challenge.progress > 0 && (
                    <Progress value={challenge.progress} className="h-1" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Séverino Coins - using real data */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Séverino Coins</span>
                <Badge className="bg-primary">{profile?.severino_coins?.toLocaleString() || 0}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Utilisez vos coins pour débloquer du contenu premium</p>
              <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/boutique">Acheter des coins</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
