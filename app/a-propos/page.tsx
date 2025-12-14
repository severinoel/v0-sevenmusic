import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"

export const metadata = {
  title: "À Propos - Séverino El",
  description: "Découvrez l'histoire et la mission de Séverino El, votre écosystème musical complet.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <AboutContent />
      </main>
      <Footer />
    </div>
  )
}
