import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Brain, Trophy, Users, ArrowRight, Play } from "lucide-react"

const stats = [
  { icon: GraduationCap, value: "500+", label: "Cours disponibles" },
  { icon: Brain, value: "IA", label: "Coach personnel" },
  { icon: Trophy, value: "50+", label: "Certifications" },
  { icon: Users, value: "50K+", label: "Étudiants actifs" },
]

export function SchoolHero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <GraduationCap className="w-3 h-3 mr-1" />
              École de Musique IA
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-balance">
              Apprenez la musique avec
              <span className="text-primary"> l'intelligence artificielle</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Des cours personnalisés, un coach IA qui analyse votre jeu en temps réel, et des parcours adaptés à votre
              niveau. Progressez plus vite que jamais.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/ecole/cours" className="flex items-center gap-2">
                  Explorer les cours
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ecole/demo" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Voir une démo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
              <img
                src="/music-school-classroom-modern.jpg"
                alt="École de musique"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm opacity-80">Cours populaire</p>
                  <p className="text-xl font-semibold">Guitare Acoustique - Niveau Débutant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
