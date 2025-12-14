"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Flame, Star, Crown, Zap, Users, Music, TrendingUp, Gift } from "lucide-react"

const badges = [
  { name: "Premier pas", description: "Complétez votre premier cours", icon: Star, unlocked: true, rarity: "common" },
  {
    name: "Guitariste dévoué",
    description: "15 jours de pratique consécutifs",
    icon: Flame,
    unlocked: true,
    rarity: "rare",
  },
  {
    name: "Social Butterfly",
    description: "100 interactions sociales",
    icon: Users,
    unlocked: true,
    rarity: "uncommon",
  },
  { name: "Virtuose", description: "Atteignez le niveau 50", icon: Crown, unlocked: false, rarity: "legendary" },
  {
    name: "Maestro",
    description: "Complétez tous les cours d'un instrument",
    icon: Trophy,
    unlocked: false,
    rarity: "epic",
  },
  { name: "Jam Master", description: "Participez à 50 jam sessions", icon: Music, unlocked: false, rarity: "rare" },
]

const leaderboard = [
  { rank: 1, name: "GuitarHero", xp: 125000, avatar: "/placeholder.svg?height=40&width=40", level: 75 },
  { rank: 2, name: "JazzMaster", xp: 118500, avatar: "/placeholder.svg?height=40&width=40", level: 72 },
  { rank: 3, name: "RockStar", xp: 105200, avatar: "/placeholder.svg?height=40&width=40", level: 68 },
  { rank: 4, name: "BluesKing", xp: 98700, avatar: "/placeholder.svg?height=40&width=40", level: 64 },
  { rank: 5, name: "DrumBeast", xp: 87300, avatar: "/placeholder.svg?height=40&width=40", level: 58 },
]

const challenges = [
  { title: "#30DaysGuitar", participants: 2450, daysLeft: 12, prize: "500 coins + Badge exclusif", progress: 40 },
  { title: "Concours Cover Mensuel", participants: 890, daysLeft: 5, prize: "1000 coins + Feature", progress: 0 },
  { title: "Marathon Théorie", participants: 1200, daysLeft: 20, prize: "300 coins", progress: 65 },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "border-muted-foreground bg-muted/30"
    case "uncommon":
      return "border-green-500 bg-green-500/10"
    case "rare":
      return "border-blue-500 bg-blue-500/10"
    case "epic":
      return "border-purple-500 bg-purple-500/10"
    case "legendary":
      return "border-yellow-500 bg-yellow-500/10"
    default:
      return "border-border"
  }
}

export function GamificationHub() {
  const currentXP = 4250
  const nextLevelXP = 5000
  const currentLevel = 15
  const xpPercent = (currentXP / nextLevelXP) * 100

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Gamification</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Centre de progression</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gagnez des XP, débloquez des badges exclusifs et affrontez la communauté dans les classements.
          </p>
        </div>

        {/* Main stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-6 h-6 text-primary" />
                <Badge variant="secondary">Niveau {currentLevel}</Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{currentXP.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mb-2">XP Total</p>
              <Progress value={xpPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {nextLevelXP - currentXP} XP jusqu'au niveau {currentLevel + 1}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-3xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Jours de série</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Badges débloqués</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground">#127</p>
              <p className="text-sm text-muted-foreground">Classement global</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Classement</TabsTrigger>
            <TabsTrigger value="challenges">Défis</TabsTrigger>
          </TabsList>

          {/* Badges */}
          <TabsContent value="badges">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.name}
                  className={`relative overflow-hidden ${badge.unlocked ? getRarityColor(badge.rarity) : "opacity-50"}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        badge.unlocked ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <badge.icon className={`w-8 h-8 ${badge.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${
                        badge.rarity === "legendary"
                          ? "border-yellow-500 text-yellow-500"
                          : badge.rarity === "epic"
                            ? "border-purple-500 text-purple-500"
                            : badge.rarity === "rare"
                              ? "border-blue-500 text-blue-500"
                              : badge.rarity === "uncommon"
                                ? "border-green-500 text-green-500"
                                : "border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {badge.rarity}
                    </Badge>
                    {!badge.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <Badge variant="secondary">Verrouillé</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Classement mondial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${player.rank <= 3 ? "bg-secondary/50" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          player.rank === 1
                            ? "bg-yellow-500 text-yellow-950"
                            : player.rank === 2
                              ? "bg-gray-400 text-gray-900"
                              : player.rank === 3
                                ? "bg-orange-600 text-orange-50"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{player.name}</p>
                        <p className="text-sm text-muted-foreground">Niveau {player.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{player.xp.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Voir le classement complet
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((challenge) => (
                <Card key={challenge.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">{challenge.daysLeft} jours restants</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {challenge.participants.toLocaleString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Gift className="w-4 h-4 text-primary" />
                      {challenge.prize}
                    </div>
                    {challenge.progress > 0 ? (
                      <div className="space-y-2">
                        <Progress value={challenge.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{challenge.progress}% complété</p>
                      </div>
                    ) : (
                      <Button className="w-full">Participer</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Séverino Coins shop */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Séverino Coins</h3>
                  <p className="text-muted-foreground">
                    Utilisez vos coins pour débloquer du contenu premium, des presets exclusifs et plus encore.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Votre solde</p>
                  <p className="text-2xl font-bold text-primary">2,450</p>
                </div>
                <Button>Boutique</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
