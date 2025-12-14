"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Music, Users, Sparkles, Zap } from "lucide-react"

const stats = [
  { label: "Musiciens actifs", value: "50K+" },
  { label: "Cours disponibles", value: "500+" },
  { label: "Effets audio", value: "100+" },
  { label: "Jam sessions/jour", value: "1K+" },
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Nouveau : Coach IA avancé
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              L'écosystème musical
              <span className="block text-primary">tout-en-un</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Apprenez, créez et partagez votre musique. École intelligente avec IA, réseau social musical, effets
              professionnels et marketplace — tout réuni dans une seule plateforme.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
              >
                <Link href="/inscription" className="flex items-center gap-2">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Voir la démo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`transition-all duration-500 delay-${index * 100}`}>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main visual card */}
              <div className="absolute inset-0 bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

                {/* Mock app interface */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Music className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Séverino El</p>
                      <p className="text-xs text-muted-foreground">Studio virtuel</p>
                    </div>
                  </div>

                  {/* Waveform visual */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-end gap-1 h-32">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 bg-primary/60 rounded-full animate-pulse"
                          style={{
                            height: `${Math.sin(i * 0.3) * 30 + 40 + Math.random() * 20}%`,
                            animationDelay: `${i * 50}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Ma composition</p>
                        <p className="text-xs text-muted-foreground">3:24</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      <Zap className="w-3 h-3 mr-1" />
                      IA Active
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 p-4 bg-card rounded-2xl border border-border shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Jam Live</p>
                    <p className="text-xs text-muted-foreground">8 musiciens</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 p-4 bg-card rounded-2xl border border-border shadow-lg animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Score IA</p>
                    <p className="text-xs text-accent">+15% progression</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
