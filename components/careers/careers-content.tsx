"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Users, Heart, Rocket, Globe, Coffee, Music } from "lucide-react"
import Link from "next/link"

const openPositions = [
  {
    title: "Développeur Full-Stack Senior",
    department: "Technique",
    location: "Remote",
    type: "CDI",
    description: "Rejoignez notre équipe technique pour développer les fonctionnalités innovantes de la plateforme.",
  },
  {
    title: "Product Designer UI/UX",
    department: "Design",
    location: "Remote",
    type: "CDI",
    description: "Créez des expériences utilisateur exceptionnelles pour nos musiciens du monde entier.",
  },
  {
    title: "Ingénieur Audio DSP",
    department: "Audio",
    location: "Remote",
    type: "CDI",
    description: "Développez nos algorithmes de traitement audio et effets virtuels de nouvelle génération.",
  },
  {
    title: "Content Manager Musical",
    department: "Contenu",
    location: "Remote",
    type: "CDD",
    description: "Gérez et développez notre catalogue de cours et contenus pédagogiques.",
  },
  {
    title: "Community Manager",
    department: "Marketing",
    location: "Remote",
    type: "CDI",
    description: "Animez notre communauté de musiciens sur les réseaux sociaux et la plateforme.",
  },
]

const benefits = [
  { icon: Globe, title: "100% Remote", description: "Travaillez de n'importe où dans le monde" },
  { icon: Clock, title: "Horaires flexibles", description: "Organisez votre temps comme vous le souhaitez" },
  { icon: Music, title: "Accès gratuit", description: "Abonnement Studio offert à tous les employés" },
  { icon: Rocket, title: "Formation continue", description: "Budget formation et conférences" },
  { icon: Coffee, title: "Équipement", description: "MacBook Pro + équipement audio offerts" },
  { icon: Heart, title: "Santé", description: "Mutuelle premium prise en charge" },
]

export function CareersContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4">Nous recrutons</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Construisez l'avenir de la musique avec nous
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Rejoignez une équipe passionnée qui révolutionne l'apprentissage et la création musicale pour des millions
              de musiciens dans le monde.
            </p>
            <Button size="lg" asChild>
              <a href="#positions">Voir les postes ouverts</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why Join Us */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chez Séverino El, nous offrons un environnement de travail unique où passion et innovation se rencontrent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div id="positions">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Postes ouverts</h2>
            <p className="text-muted-foreground">{openPositions.length} opportunités disponibles</p>
          </div>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{position.title}</h3>
                        <Badge variant="secondary">{position.department}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{position.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button>Postuler</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 border-primary/30 bg-primary/5">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas le poste idéal ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Envoyez-nous une candidature spontanée ! Nous sommes toujours à la recherche de talents passionnés par la
              musique et la technologie.
            </p>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="mailto:wendpayangdeseverinbouda@gmail.com">Candidature spontanée</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
