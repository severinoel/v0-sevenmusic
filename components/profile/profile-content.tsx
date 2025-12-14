"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, Video, ImageIcon, BookOpen, Store, Trophy, Play, Heart, Eye } from "lucide-react"

const tabs = [
  { id: "tout", label: "Tout", icon: Music },
  { id: "reels", label: "Reels Musicaux", icon: Video },
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "lives", label: "Lives", icon: Video },
  { id: "projets", label: "Projets", icon: Music },
  { id: "partitions", label: "Partitions", icon: BookOpen },
  { id: "pedagogie", label: "Pédagogie", icon: BookOpen },
  { id: "marketplace", label: "Marketplace", icon: Store },
]

const mockContent = [
  {
    id: 1,
    type: "audio",
    title: "Fingerstyle Cover - River Flows",
    thumbnail: "/guitar-fingerstyle-music.jpg",
    stats: { views: 1234, likes: 567 },
  },
  {
    id: 2,
    type: "video",
    title: "Tutorial: Accords Jazz",
    thumbnail: "/jazz-guitar-lesson.jpg",
    stats: { views: 890, likes: 234 },
  },
  {
    id: 3,
    type: "image",
    title: "Studio Session",
    thumbnail: "/music-studio-session.png",
    stats: { views: 456, likes: 123 },
  },
  {
    id: 4,
    type: "audio",
    title: "Composition Originale #12",
    thumbnail: "/acoustic-guitar-composition.jpg",
    stats: { views: 2345, likes: 890 },
  },
  {
    id: 5,
    type: "partition",
    title: "Tablature - My Song",
    thumbnail: "/placeholder.svg?height=200&width=200",
    stats: { views: 678, likes: 234 },
  },
  {
    id: 6,
    type: "cours",
    title: "Cours Débutant Guitare",
    thumbnail: "/placeholder.svg?height=200&width=200",
    stats: { views: 3456, likes: 1234 },
  },
]

const badges = [
  { name: "Guitariste Expert", icon: "🎸", color: "bg-primary/10 text-primary" },
  { name: "100 Cours Complétés", icon: "📚", color: "bg-accent/10 text-accent" },
  { name: "Streak 30 Jours", icon: "🔥", color: "bg-orange-500/10 text-orange-500" },
  { name: "Collaborateur", icon: "🤝", color: "bg-blue-500/10 text-blue-500" },
  { name: "Top Créateur", icon: "⭐", color: "bg-yellow-500/10 text-yellow-500" },
]

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState("tout")

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Badges */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Badges obtenus
        </h3>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge.name} variant="secondary" className={`${badge.color} px-3 py-1.5`}>
              <span className="mr-1">{badge.icon}</span>
              {badge.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2"
            >
              <tab.icon className="w-4 h-4 mr-1" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockContent.map((item) => (
              <Card key={item.id} className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="w-12 h-12 rounded-full bg-primary/90">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                    </Button>
                  </div>
                  {item.type === "video" && (
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                      <Video className="w-3 h-3 mr-1" />
                      Vidéo
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-foreground truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {item.stats.likes}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
