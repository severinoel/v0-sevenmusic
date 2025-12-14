import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PressContent } from "@/components/press/press-content"

export const metadata = {
  title: "Presse - Séverino El",
  description: "Kit média et ressources presse pour Séverino El.",
}

export default function PressPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <PressContent />
      </main>
      <Footer />
    </div>
  )
}
