"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Handshake, GraduationCap, Store, Music, Headphones, Building, Check } from "lucide-react"
import Link from "next/link"

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Écoles de musique",
    description: "Intégrez Séverino El dans votre cursus pédagogique avec des tarifs préférentiels pour vos élèves.",
    benefits: [
      "Tableau de bord administrateur",
      "Suivi de progression des élèves",
      "Contenu personnalisable",
      "Support dédié",
    ],
  },
  {
    icon: Store,
    title: "Magasins de musique",
    description: "Proposez nos solutions à vos clients et bénéficiez de commissions attractives.",
    benefits: ["Programme d'affiliation", "Matériel marketing", "Formation produit", "Commission 20%"],
  },
  {
    icon: Music,
    title: "Artistes & Créateurs",
    description: "Vendez vos presets, cours et contenus sur notre marketplace avec une visibilité mondiale.",
    benefits: ["Marketplace intégrée", "Outils de création", "Communauté active", "Royalties équitables"],
  },
  {
    icon: Headphones,
    title: "Marques audio",
    description: "Intégrez vos produits à notre écosystème et touchez une communauté passionnée.",
    benefits: ["Intégration technique", "Co-marketing", "Tests utilisateurs", "Événements exclusifs"],
  },
]

const currentPartners = [
  { name: "Music Academy Paris", type: "École" },
  { name: "Guitar Center Africa", type: "Magasin" },
  { name: "ProSound Studios", type: "Studio" },
  { name: "African Music Federation", type: "Association" },
]

export function PartnersContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-green-500/10 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Devenez partenaire</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez notre réseau de partenaires et participez à la révolution de l'éducation musicale mondiale.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Partner Types */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Types de partenariats</h2>
            <p className="text-muted-foreground">Trouvez le programme adapté à votre activité</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Building className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold">{partner.name}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {partner.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à collaborer ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contactez notre équipe partenariats pour discuter des opportunités de collaboration.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild>
                <Link href="/contact">Contacter l'équipe</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <a href="mailto:wendpayangdeseverinbouda@gmail.com">wendpayangdeseverinbouda@gmail.com</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
