"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Download, Image, FileText, Mail, Music } from "lucide-react"

const pressReleases = [
  {
    date: "7 Décembre 2024",
    title: "Séverino El lance sa plateforme musicale révolutionnaire",
    summary: "La startup burkinabè dévoile un écosystème complet pour l'apprentissage et la création musicale.",
  },
  {
    date: "15 Novembre 2024",
    title: "Séverino El lève des fonds pour son expansion",
    summary: "La plateforme annonce une levée de fonds pour accélérer son développement international.",
  },
  {
    date: "1 Octobre 2024",
    title: "Partenariat avec les écoles de musique africaines",
    summary: "Séverino El s'associe à 50 écoles de musique pour démocratiser l'éducation musicale en Afrique.",
  },
]

const mediaAssets = [
  { name: "Logo Séverino El (PNG)", type: "Logo", size: "2.4 MB" },
  { name: "Logo Séverino El (SVG)", type: "Logo", size: "124 KB" },
  { name: "Screenshots Plateforme", type: "Images", size: "15 MB" },
  { name: "Photos fondateur", type: "Photos", size: "8 MB" },
  { name: "Vidéo présentation", type: "Vidéo", size: "120 MB" },
]

const stats = [
  { value: "10K+", label: "Utilisateurs" },
  { value: "50+", label: "Pays" },
  { value: "500+", label: "Cours" },
  { value: "100+", label: "Professeurs" },
]

export function PressContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-500/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Espace Presse</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Retrouvez tous les communiqués de presse, ressources média et informations pour les journalistes.
            </p>
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Télécharger le kit média
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About */}
        <Card className="mb-16 border-border">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Music className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">À propos de Séverino El</h2>
                <p className="text-muted-foreground mb-4">
                  Séverino El est un écosystème musical complet fondé par Wendpayangde Séverin BOUDA au Burkina Faso.
                  Notre mission est de démocratiser l'apprentissage et la création musicale grâce à la technologie.
                </p>
                <p className="text-muted-foreground">
                  La plateforme combine une école de musique en ligne avec coach IA, un réseau social musical, une
                  pédale d'effets virtuelle professionnelle, une marketplace et des outils de collaboration en temps
                  réel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Press Releases */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Communiqués de presse</h2>
            <div className="space-y-4">
              {pressReleases.map((release, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2">
                      {release.date}
                    </Badge>
                    <h3 className="font-bold mb-2">{release.title}</h3>
                    <p className="text-sm text-muted-foreground">{release.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Assets */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Ressources média</h2>
            <div className="space-y-3">
              {mediaAssets.map((asset, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {asset.type === "Logo" ? (
                        <Image className="w-5 h-5 text-muted-foreground" />
                      ) : asset.type === "Vidéo" ? (
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Image className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">{asset.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <Card className="mt-12 border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Contact Presse</h3>
            <p className="text-muted-foreground mb-6">
              Pour toute demande d'interview, information ou collaboration média
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild>
                <a href="mailto:wendpayangdeseverinbouda@gmail.com">wendpayangdeseverinbouda@gmail.com</a>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <a href="tel:+22666640077">+226 66 64 00 77</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
