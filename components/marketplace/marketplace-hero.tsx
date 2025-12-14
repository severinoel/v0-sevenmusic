import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Store, TrendingUp, Shield } from "lucide-react"

export function MarketplaceHero() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Marketplace Séverino El</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Découvrez des milliers de presets, partitions, services professionnels et matériel audio créés par notre
            communauté de musiciens.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher des presets, partitions, services..."
              className="pl-12 pr-24 h-12 text-base"
            />
            <Button className="absolute right-1.5 top-1/2 -translate-y-1/2">Rechercher</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <Store className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">12,500+</p>
            <p className="text-sm text-muted-foreground">Produits</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">5,200+</p>
            <p className="text-sm text-muted-foreground">Vendeurs</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-card border border-border">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">100%</p>
            <p className="text-sm text-muted-foreground">Sécurisé</p>
          </div>
        </div>
      </div>
    </section>
  )
}
