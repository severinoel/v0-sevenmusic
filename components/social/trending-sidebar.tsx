"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Music, Radio } from "lucide-react"

const trendingTags = [
  { tag: "#guitaracoustic", posts: "12.5K" },
  { tag: "#jamsession", posts: "8.3K" },
  { tag: "#composition", posts: "6.7K" },
  { tag: "#pianocover", posts: "5.2K" },
  { tag: "#beatmaking", posts: "4.1K" },
]

const suggestedUsers = [
  {
    name: "Alex Drums",
    username: "alex_drums",
    avatar: "/drummer-musician.jpg",
    instrument: "Batterie",
    followers: "15K",
  },
  {
    name: "Lisa Bass",
    username: "lisa_bass",
    avatar: "/bassist-woman.jpg",
    instrument: "Basse",
    followers: "12K",
  },
  {
    name: "Marc Keys",
    username: "marc_keys",
    avatar: "/keyboard-player.jpg",
    instrument: "Clavier",
    followers: "9K",
  },
]

const liveSessions = [
  { title: "Jazz Improv Session", viewers: 234, host: "JazzMaster" },
  { title: "Guitar Lesson Live", viewers: 156, host: "GuitarPro" },
]

export function TrendingSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Trending */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Tendances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTags.map((item, index) => (
            <div key={item.tag} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary hover:underline cursor-pointer">{item.tag}</p>
                <p className="text-xs text-muted-foreground">{item.posts} publications</p>
              </div>
              <span className="text-sm text-muted-foreground">#{index + 1}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Sessions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500" />
            En direct
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveSessions.map((session) => (
            <div
              key={session.title}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{session.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{session.host}</span>
                  <Badge variant="secondary" className="bg-red-500/10 text-red-500 text-xs">
                    {session.viewers} viewers
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested users */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.username} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.instrument} • {user.followers} abonnés
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                Suivre
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
