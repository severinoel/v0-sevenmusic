"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Radio,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Gift,
  Share2,
  Settings,
  Video,
  Mic,
  Send,
  Crown,
  Star,
} from "lucide-react"

const liveStreams = [
  {
    id: 1,
    title: "Jam Session Jazz - Improvisations",
    host: "JazzMaster",
    avatar: "/jazz-musician-portrait.jpg",
    thumbnail: "/jazz-band-live-performance.jpg",
    viewers: 1250,
    category: "Jazz",
    isLive: true,
    isPremium: false,
  },
  {
    id: 2,
    title: "Masterclass Guitare Blues",
    host: "BluesKing",
    avatar: "/blues-guitarist-portrait.jpg",
    thumbnail: "/blues-guitar-lesson.jpg",
    viewers: 890,
    category: "Cours",
    isLive: true,
    isPremium: true,
  },
  {
    id: 3,
    title: "Production Live - Création d'un beat",
    host: "BeatMaker_Pro",
    avatar: "/music-producer-portrait.jpg",
    thumbnail: "/music-production-studio.png",
    viewers: 2100,
    category: "Production",
    isLive: true,
    isPremium: false,
  },
  {
    id: 4,
    title: "Concert Acoustique - Folk Songs",
    host: "FolkSinger",
    avatar: "/folk-singer-portrait.jpg",
    thumbnail: "/acoustic-guitar-concert.jpg",
    viewers: 567,
    category: "Concert",
    isLive: true,
    isPremium: false,
  },
]

const chatMessages = [
  { user: "GuitarHero", message: "Incroyable ce solo !", isVip: true },
  { user: "MusicLover", message: "Quelle technique !", isVip: false },
  { user: "JazzFan", message: "Magnifique improvisation", isVip: false },
  { user: "ProPlayer", message: "Quel ampli utilises-tu ?", isVip: true },
  { user: "Newbie123", message: "J'apprends tellement", isVip: false },
]

const virtualGifts = [
  { id: 1, name: "Applaudissements", icon: "👏", coins: 10 },
  { id: 2, name: "Guitare", icon: "🎸", coins: 50 },
  { id: 3, name: "Étoile", icon: "⭐", coins: 100 },
  { id: 4, name: "Trophée", icon: "🏆", coins: 500 },
  { id: 5, name: "Diamant", icon: "💎", coins: 1000 },
]

export function LiveStreamingSection() {
  const [selectedStream, setSelectedStream] = useState(liveStreams[0])
  const [message, setMessage] = useState("")
  const [showGifts, setShowGifts] = useState(false)

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Radio className="w-8 h-8 text-destructive animate-pulse" />
              Lives en cours
            </h1>
            <p className="text-muted-foreground">Regardez des concerts, cours et jam sessions en direct</p>
          </div>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Démarrer un live
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main video */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-secondary">
                <img
                  src={selectedStream.thumbnail || "/placeholder.svg"}
                  alt={selectedStream.title}
                  className="w-full h-full object-cover"
                />
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
                    LIVE
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {selectedStream.viewers.toLocaleString()}
                  </Badge>
                </div>
                {/* Premium badge */}
                {selectedStream.isPremium && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
                {/* Controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedStream.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedStream.host[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{selectedStream.host}</p>
                        <p className="text-sm text-muted-foreground">{selectedStream.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        Follow
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stream controls for host */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      Co-hosts: 3/8
                    </Badge>
                    <Button variant="destructive">Terminer le live</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other lives */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Autres lives en cours</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {liveStreams
                  .filter((s) => s.id !== selectedStream.id)
                  .map((stream) => (
                    <Card
                      key={stream.id}
                      className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedStream(stream)}
                    >
                      <div className="relative aspect-video bg-secondary">
                        <img
                          src={stream.thumbnail || "/placeholder.svg"}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                          LIVE
                        </Badge>
                        <Badge variant="secondary" className="absolute bottom-2 right-2 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          {stream.viewers}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={stream.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{stream.host[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{stream.title}</p>
                            <p className="text-xs text-muted-foreground">{stream.host}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Chat sidebar */}
          <div className="space-y-4">
            <Card className="h-[500px] flex flex-col">
              <div className="p-4 border-b border-border">
                <Tabs defaultValue="chat">
                  <TabsList className="w-full">
                    <TabsTrigger value="chat" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="gifts" className="flex-1">
                      <Gift className="w-4 h-4 mr-1" />
                      Cadeaux
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className={`text-sm font-medium ${msg.isVip ? "text-primary" : "text-foreground"}`}>
                          {msg.isVip && <Star className="w-3 h-3 inline mr-1" />}
                          {msg.user}
                        </span>
                        <p className="text-sm text-muted-foreground">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Envoyer un message..."
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowGifts(!showGifts)}>
                    <Gift className="w-4 h-4" />
                  </Button>
                </div>

                {/* Gifts panel */}
                {showGifts && (
                  <div className="mt-4 p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Envoyer un cadeau</p>
                    <div className="flex gap-2 flex-wrap">
                      {virtualGifts.map((gift) => (
                        <button
                          key={gift.id}
                          className="flex flex-col items-center p-2 rounded-lg hover:bg-background transition-colors"
                        >
                          <span className="text-2xl">{gift.icon}</span>
                          <span className="text-xs text-muted-foreground">{gift.coins}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Viewers list */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Top contributeurs
                </h4>
                <div className="space-y-2">
                  {[
                    { name: "GuitarHero", coins: 5000, rank: 1 },
                    { name: "MusicLover", coins: 2500, rank: 2 },
                    { name: "ProPlayer", coins: 1200, rank: 3 },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1
                            ? "bg-yellow-500 text-yellow-950"
                            : user.rank === 2
                              ? "bg-gray-400 text-gray-900"
                              : "bg-orange-600 text-orange-50"
                        }`}
                      >
                        {user.rank}
                      </span>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm flex-1">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.coins} coins</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
