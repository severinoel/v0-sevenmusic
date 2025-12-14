import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Zap, Cloud, Layers, Headphones, Share2 } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Modélisation IA",
    description: "Algorithmes NAM et DDSP pour une modélisation ultra-réaliste des amplis et pédales vintage.",
  },
  {
    icon: Zap,
    title: "Latence ultra-basse",
    description: "Moins de 2ms de latence avec notre technologie FPGA/DSP optimisée pour le jeu en temps réel.",
  },
  {
    icon: Layers,
    title: "Multi-effets",
    description: "Chaînez jusqu'à 16 effets simultanément avec un routing flexible et un mixage parallèle.",
  },
  {
    icon: Cloud,
    title: "Sync Cloud",
    description: "Synchronisez vos presets sur tous vos appareils et partagez-les avec la communauté.",
  },
  {
    icon: Headphones,
    title: "Audio Spatial",
    description: "Positionnez vos effets dans un espace 3D pour un son immersif compatible Dolby Atmos.",
  },
  {
    icon: Share2,
    title: "Formats Pro",
    description: "Compatible VST3, AAX, AU et standalone. Intégration parfaite avec tous les DAWs majeurs.",
  },
]

export function EffectsFeatures() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Technologie de pointe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les fonctionnalités qui font de Séverino El Pedal la référence des effets virtuels professionnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
