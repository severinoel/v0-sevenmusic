"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  GraduationCap,
  Users,
  Sliders,
  Store,
  Cloud,
  Brain,
  Music,
  Video,
  Mic,
  Headphones,
  Zap,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "École de Musique IA",
    description:
      "Cours vidéo interactifs, exercices personnalisés, et un coach IA qui analyse votre jeu en temps réel.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Réseau Social Musical",
    description: "Partagez vos créations, découvrez des talents, et collaborez avec des musiciens du monde entier.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Sliders,
    title: "Pédale d'Effets Virtuelle",
    description: "Plus de 100 effets professionnels avec modélisation IA, latence < 1ms, et formats VST3/AAX/AU.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Store,
    title: "Marketplace Intégré",
    description: "Achetez et vendez presets, partitions, cours privés et services de mixage/mastering.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: Cloud,
    title: "Cloud Collaboratif",
    description: "Stockage illimité, jam sessions temps réel jusqu'à 8 musiciens, et synchronisation multi-appareils.",
    color: "bg-chart-5/10 text-chart-5",
  },
  {
    icon: Brain,
    title: "Intelligence Artificielle",
    description:
      "Détection d'accords, transcription automatique, analyse de posture et recommandations personnalisées.",
    color: "bg-primary/10 text-primary",
  },
]

const capabilities = [
  { icon: Music, label: "Chord Finder AI" },
  { icon: Video, label: "Live Streaming" },
  { icon: Mic, label: "Enregistrement" },
  { icon: Headphones, label: "Audio Spatial" },
  { icon: Zap, label: "Latence <10ms" },
  { icon: Shield, label: "Sécurisé" },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Tout ce dont vous avez besoin pour
            <span className="text-primary"> exceller en musique</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Une plateforme complète qui combine apprentissage intelligent, création professionnelle et partage social.
            Conçue par des musiciens, pour des musiciens.
          </p>
        </div>

        {/* Capabilities badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border"
            >
              <cap.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{cap.label}</span>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
