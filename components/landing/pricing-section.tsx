"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Gratuit",
    description: "Pour découvrir Séverino El",
    price: { monthly: 0, yearly: 0 },
    features: [
      "5 cours vidéo de base",
      "Profil musical",
      "Feed social limité",
      "3 effets de base",
      "1 Go de stockage cloud",
      "Support communautaire",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Premium",
    description: "Pour les musiciens passionnés",
    price: { monthly: 9.99, yearly: 99 },
    features: [
      "Tous les cours vidéo",
      "Coach IA personnel",
      "Jam sessions illimitées",
      "50 effets professionnels",
      "50 Go de stockage cloud",
      "Chord Finder AI",
      "Analyse de progression",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Pro",
    description: "Pour les professionnels",
    price: { monthly: 24.99, yearly: 249 },
    features: [
      "Tout Premium +",
      "100+ effets avec modélisation IA",
      "Stockage illimité",
      "Live streaming HD",
      "Cours privés marketplace",
      "API développeur",
      "Audio spatial Dolby Atmos",
      "Support dédié 24/7",
    ],
    cta: "Essai gratuit 14 jours",
    popular: false,
  },
  {
    name: "Studio",
    description: "Pour les écoles et studios",
    price: { monthly: 99, yearly: 990 },
    features: [
      "Tout Pro +",
      "Jusqu'à 50 comptes",
      "Gestion administrative",
      "Rapports analytics",
      "White label disponible",
      "Intégrations personnalisées",
      "Formation équipe",
      "Account manager dédié",
    ],
    cta: "Nous contacter",
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-20 lg:py-32" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            Tarifs transparents
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">Choisissez votre plan</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Commencez gratuitement et évoluez selon vos besoins. Annulez à tout moment.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Mensuel
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annuel
              <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent">
                -17%
              </Badge>
            </span>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {isYearly ? plan.price.yearly : plan.price.monthly}€
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? "an" : "mois"}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/inscription">{plan.cta}</Link>
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money back guarantee */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Garantie satisfait ou remboursé 30 jours. Aucune carte requise pour l'essai gratuit.
        </p>
      </div>
    </section>
  )
}
