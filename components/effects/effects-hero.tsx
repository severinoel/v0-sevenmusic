import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Play, Zap, Cpu } from "lucide-react"

export function EffectsHero() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4">Nouveau: IA Audio</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Séverino El Pedal
              <span className="text-primary block">Effets virtuels pro</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              La pédale d'effets virtuelle la plus avancée du marché. Modélisation IA, effets DSP professionnels, et
              connexion hardware ultra-basse latence.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Latence {"<"}2ms</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">IA NAM/DDSP</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Download className="w-5 h-5 mr-2" />
                Télécharger (VST3/AU/AAX)
              </Button>
              <Button size="lg" variant="outline">
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span>Compatible:</span>
              <div className="flex gap-2">
                <Badge variant="secondary">Windows</Badge>
                <Badge variant="secondary">macOS</Badge>
                <Badge variant="secondary">Linux</Badge>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary/50 border border-border p-8 flex items-center justify-center">
              <img
                src="/professional-guitar-effects-pedal-interface-dark-m.jpg"
                alt="Séverino El Pedal"
                className="w-full h-full object-contain animate-float"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">v2.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
