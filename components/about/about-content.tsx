"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Heart, Users, Globe, Lightbulb, Target, Rocket, Award, GraduationCap, Headphones } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "La musique est notre passion et nous la partageons avec vous chaque jour.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Nous créons des connexions entre musiciens du monde entier.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous utilisons les dernières technologies pour révolutionner l'apprentissage musical.",
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description: "La musique doit être accessible à tous, partout, à tout moment.",
  },
]

const milestones = [
  { year: "2023", title: "Naissance de l'idée", description: "Conception du projet Séverino El" },
  { year: "2024", title: "Développement", description: "Création de la plateforme et des premiers outils" },
  { year: "2024", title: "Lancement Beta", description: "Ouverture aux premiers utilisateurs" },
  { year: "2025", title: "Expansion", description: "Déploiement mondial et nouvelles fonctionnalités" },
]

const stats = [
  { value: "50+", label: "Pays représentés" },
  { value: "10K+", label: "Musiciens actifs" },
  { value: "500+", label: "Cours disponibles" },
  { value: "100+", label: "Professeurs certifiés" },
]

export function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Notre mission : démocratiser la musique
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Séverino El est né d'une vision simple : rendre l'apprentissage et la création musicale accessibles à
              tous, grâce à la technologie et à la puissance de la communauté.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border text-center">
              <CardContent className="p-6">
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Séverino El est né de la passion d'un musicien burkinabè, Wendpayangde Séverin BOUDA, qui rêvait de
                créer une plateforme où chaque personne pourrait apprendre, créer et partager sa musique, peu importe
                son niveau ou sa localisation.
              </p>
              <p>
                Face aux défis d'accès à l'éducation musicale de qualité en Afrique et dans le monde, nous avons décidé
                de construire un écosystème complet qui combine école de musique en ligne, réseau social musical, outils
                de création professionnels et marketplace.
              </p>
              <p>
                Aujourd'hui, Séverino El est plus qu'une simple plateforme : c'est une communauté mondiale de musiciens
                qui s'entraident, collaborent et grandissent ensemble.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-primary" />
              </div>
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-amber-500/20 to-pink-500/20 flex items-center justify-center">
                <Headphones className="w-12 h-12 text-amber-500" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                <Users className="w-12 h-12 text-green-500" />
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Globe className="w-16 h-16 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ces valeurs guident chacune de nos décisions et façonnent l'expérience que nous créons pour vous.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Notre parcours</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card className="border-border inline-block">
                      <CardContent className="p-4">
                        <p className="text-primary font-bold">{milestone.year}</p>
                        <h3 className="font-bold">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary relative z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision */}
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 via-background to-purple-500/5 mb-16">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-4">Notre vision pour l'avenir</h2>
                <p className="text-muted-foreground mb-6">
                  D'ici 2030, nous visons à devenir la première plateforme musicale mondiale, avec plus d'un million de
                  musiciens actifs, des partenariats avec les plus grandes écoles de musique, et des technologies de
                  pointe comme la réalité virtuelle et l'intelligence artificielle au service de la créativité.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button asChild className="gap-2">
                    <Link href="/inscription">
                      <Rocket className="w-4 h-4" />
                      Rejoindre l'aventure
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="gap-2 bg-transparent">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team/Founder */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-10">Le fondateur</h2>
          <Card className="border-border max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">WS</span>
              </div>
              <h3 className="text-xl font-bold">Wendpayangde Séverin BOUDA</h3>
              <p className="text-muted-foreground mb-4">Fondateur & CEO</p>
              <p className="text-sm text-muted-foreground">
                Musicien passionné et entrepreneur, Séverin a créé Séverino El pour partager sa passion de la musique
                avec le monde entier et offrir à chacun les outils pour exprimer sa créativité.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-muted-foreground">Burkina Faso</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
