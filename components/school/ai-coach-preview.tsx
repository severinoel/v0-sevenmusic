"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Mic, Eye, BarChart3, MessageCircle, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Mic,
    title: "Analyse Audio",
    description: "Détection de la justesse, du rythme et de la technique en temps réel",
  },
  {
    icon: Eye,
    title: "Analyse Posturale",
    description: "Vision par ordinateur pour corriger votre posture et vos positions",
  },
  {
    icon: BarChart3,
    title: "Suivi de Progression",
    description: "Statistiques détaillées et insights personnalisés sur vos progrès",
  },
  {
    icon: MessageCircle,
    title: "Feedback Contextuel",
    description: "Conseils adaptés à votre niveau, vos objectifs et votre état d'esprit",
  },
]

export function AICoachPreview() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Brain className="w-3 h-3 mr-1" />
              Coach IA Avancé
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Votre professeur
              <span className="text-primary"> disponible 24/7</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Notre assistant IA analyse votre jeu en temps réel et vous guide comme un vrai professeur. Il s'adapte à
              votre niveau, vos objectifs et votre style d'apprentissage.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link href="/ecole/coach-ia" className="flex items-center gap-2">
                Essayer le Coach IA
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Visual - AI Coach Interface Preview */}
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Coach IA Séverino</h3>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Analyse en cours
                    </Badge>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Justesse</span>
                      <span className="font-medium text-accent">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Rythme</span>
                      <span className="font-medium text-primary">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Technique</span>
                      <span className="font-medium text-yellow-500">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        Excellent travail ! Votre justesse s'améliore. Concentrez-vous sur le tempo pendant les
                        transitions d'accords. Essayez l'exercice "Métronome Progressif".
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary mt-2">
                        Voir l'exercice suggéré
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 p-3 bg-card rounded-xl border border-border shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Actif maintenant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
