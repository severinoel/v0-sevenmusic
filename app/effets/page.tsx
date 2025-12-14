import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EffectsHero } from "@/components/effects/effects-hero"
import { VirtualPedal } from "@/components/effects/virtual-pedal"
import { EffectsFeatures } from "@/components/effects/effects-features"
import { HardwareSection } from "@/components/effects/hardware-section"

export const metadata = {
  title: "Pédale d'Effets Virtuelle - Séverino El",
  description: "Pédale d'effets virtuelle professionnelle avec IA, modélisation physique et formats VST3/AAX/AU.",
}

export default function EffetsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <EffectsHero />
        <VirtualPedal />
        <EffectsFeatures />
        <HardwareSection />
      </main>
      <Footer />
    </div>
  )
}
