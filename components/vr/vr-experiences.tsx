"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Glasses, Video, Users, Play, Star, Clock, Globe, Sparkles, Zap } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Concert Live VR",
    description: "Assistez à des concerts immersifs en réalité virtuelle",
    image: "/vr-concert-stage-lights.jpg",
    type: "Live",
    users: "1.2K en ligne",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Studio de répétition virtuel",
    description: "Répétez avec votre groupe dans un studio 3D",
    image: "/virtual-music-studio-3d.jpg",
    type: "Collaboration",
    users: "324 studios actifs",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Cours holographique",
    description: "Apprenez avec des professeurs en hologramme",
    image: "/holographic-music-teacher.jpg",
    type: "Éducation",
    users: "50+ profs",
    rating: 4.9,
  },
]

const features = [
  {
    icon: Globe,
    title: "Audio Spatial 360°",
    description: "Son immersif avec positionnement 3D des instruments",
  },
  {
    icon: Users,
    title: "Multi-joueurs",
    description: "Jusqu'à 50 personnes dans le même espace virtuel",
  },
  {
    icon: Zap,
    title: "Latence ultra-faible",
    description: "Synchronisation temps réel < 20ms",
  },
  {
    icon: Sparkles,
    title: "Avatars personnalisés",
    description: "Créez votre avatar musicien unique",
  },
]

export function VRExperiences() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-900/20 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-500 border-purple-500/30">Nouveau : VR/AR</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Expériences Immersives
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Plongez dans un univers musical en réalité virtuelle. Concerts live, cours holographiques et studios de
              répétition virtuels vous attendent.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                <Glasses className="w-5 h-5" />
                Entrer en VR
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Play className="w-5 h-5" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Experiences Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Expériences disponibles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <Card key={exp.id} className="border-border overflow-hidden group hover:border-primary/50 transition-all">
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <img
                    src={exp.image || "/placeholder.svg"}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">{exp.type}</Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {exp.users}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">{exp.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Technologies immersives</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <Card className="border-border bg-gradient-to-r from-purple-500/10 via-background to-cyan-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Prochains événements VR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Concert Jazz Live", date: "Ce soir 20h", viewers: "500+" },
                { title: "Masterclass Guitare", date: "Demain 14h", viewers: "200+" },
                { title: "Jam Session Mondiale", date: "Sam. 21h", viewers: "1000+" },
              ].map((event, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/50 border border-border">
                  <h4 className="font-medium mb-1">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.viewers}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
