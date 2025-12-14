import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart } from "lucide-react"

const hardwareProducts = [
  {
    name: "Séverino El Mini",
    description: "Pédale compacte pour guitaristes en déplacement",
    price: 149,
    features: ["8 effets embarqués", "USB-C", "Batterie 10h", "Bluetooth"],
    image: "/compact-guitar-effects-pedal-black.jpg",
    badge: null,
  },
  {
    name: "Séverino El Pro",
    description: "La pédale ultime pour professionnels",
    price: 399,
    features: ["32 effets", "FPGA basse latence", "Écran tactile", "MIDI", "Expression pedal"],
    image: "/professional-guitar-multi-effects-unit.jpg",
    badge: "Populaire",
  },
  {
    name: "Séverino El Interface",
    description: "Interface audio 2in/2out haute qualité",
    price: 199,
    features: ["24bit/192kHz", "Latence <1ms", "Préamps classe A", "USB-C"],
    image: "/professional-audio-interface-black-modern.jpg",
    badge: "Nouveau",
  },
]

export function HardwareSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4">Hardware</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">Matériel Séverino El</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme de hardware professionnel, conçu pour fonctionner parfaitement avec notre écosystème
            logiciel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {hardwareProducts.map((product) => (
            <Card key={product.name} className="relative overflow-hidden">
              {product.badge && <Badge className="absolute top-4 right-4 z-10">{product.badge}</Badge>}
              <CardContent className="p-6">
                <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{product.price}€</span>
                  <Button>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Précommander
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
