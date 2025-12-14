"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Music, MapPin, Wifi, Mic, Search, Plus, Star } from "lucide-react"

const musicians = [
  {
    id: 1,
    name: "JazzMaster",
    avatar: "/jazz-musician-portrait.jpg",
    instrument: "Saxophone",
    level: "Expert",
    genres: ["Jazz", "Blues", "Funk"],
    location: "Paris, France",
    rating: 4.9,
    jams: 156,
    online: true,
    matchScore: 95,
  },
  {
    id: 2,
    name: "RockDrummer",
    avatar: "/placeholder.svg?height=60&width=60",
    instrument: "Batterie",
    level: "Avancé",
    genres: ["Rock", "Metal", "Punk"],
    location: "Lyon, France",
    rating: 4.7,
    jams: 89,
    online: true,
    matchScore: 88,
  },
  {
    id: 3,
    name: "BluesBass",
    avatar: "/placeholder.svg?height=60&width=60",
    instrument: "Basse",
    level: "Intermédiaire",
    genres: ["Blues", "Rock", "Soul"],
    location: "Ouagadougou, BF",
    rating: 4.5,
    jams: 42,
    online: false,
    matchScore: 82,
  },
  {
    id: 4,
    name: "KeysMaster",
    avatar: "/placeholder.svg?height=60&width=60",
    instrument: "Piano",
    level: "Expert",
    genres: ["Jazz", "Classical", "Pop"],
    location: "Bruxelles, BE",
    rating: 4.8,
    jams: 203,
    online: true,
    matchScore: 79,
  },
]

const activeJams = [
  {
    id: 1,
    title: "Jam Blues du dimanche",
    host: "BluesKing",
    participants: 4,
    maxParticipants: 6,
    genre: "Blues",
    level: "Tous niveaux",
    startedAt: "Il y a 15 min",
  },
  {
    id: 2,
    title: "Session Jazz improvisée",
    host: "JazzMaster",
    participants: 3,
    maxParticipants: 5,
    genre: "Jazz",
    level: "Avancé",
    startedAt: "Il y a 30 min",
  },
]

export function JamSessionFinder() {
  const [instrumentFilter, setInstrumentFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const [levelRange, setLevelRange] = useState([0, 100])

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Collaboration temps réel</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Jam Session Finder</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez des musiciens compatibles et jammez ensemble en temps réel avec une latence ultra-basse ({"<"}10ms).
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Instrument recherché</Label>
                  <Select value={instrumentFilter} onValueChange={setInstrumentFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les instruments</SelectItem>
                      <SelectItem value="guitar">Guitare</SelectItem>
                      <SelectItem value="bass">Basse</SelectItem>
                      <SelectItem value="drums">Batterie</SelectItem>
                      <SelectItem value="piano">Piano</SelectItem>
                      <SelectItem value="vocals">Voix</SelectItem>
                      <SelectItem value="saxophone">Saxophone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Genre musical</Label>
                  <Select value={genreFilter} onValueChange={setGenreFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les genres</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="blues">Blues</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                      <SelectItem value="funk">Funk</SelectItem>
                      <SelectItem value="classical">Classique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Niveau compatible</Label>
                  <Slider value={levelRange} onValueChange={setLevelRange} max={100} step={1} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Débutant</span>
                    <span>Expert</span>
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </CardContent>
            </Card>

            {/* Active jams */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-accent animate-pulse" />
                  Jams en cours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeJams.map((jam) => (
                  <div key={jam.id} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{jam.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {jam.participants}/{jam.maxParticipants}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{jam.genre}</span>
                      <span>•</span>
                      <span>{jam.level}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Rejoindre
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Musicians list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Musiciens compatibles</h2>
                <p className="text-sm text-muted-foreground">Triés par score de compatibilité</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer une session
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {musicians.map((musician) => (
                <Card key={musician.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={musician.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{musician.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                            musician.online ? "bg-accent" : "bg-muted"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{musician.name}</h3>
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {musician.matchScore}% match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>{musician.instrument}</span>
                          <span>•</span>
                          <span>{musician.level}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          {musician.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {musician.genres.map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span>{musician.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Music className="w-4 h-4" />
                              <span>{musician.jams} jams</span>
                            </div>
                          </div>
                          <Button size="sm">
                            <Mic className="w-4 h-4 mr-1" />
                            Inviter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
