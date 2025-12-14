import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChordFinderTool } from "@/components/chord-finder/chord-finder-tool"

export const metadata = {
  title: "Chord Finder IA - Séverino El",
  description:
    "Détectez automatiquement les accords de n'importe quelle chanson avec notre IA de reconnaissance musicale.",
}

export default function ChordFinderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <ChordFinderTool />
      </main>
      <Footer />
    </div>
  )
}
