import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIComposer } from "@/components/composer/ai-composer"

export const metadata = {
  title: "AI Songwriting - Séverino El",
  description: "Assistant IA pour la composition musicale : mélodies, accords et paroles.",
}

export default function ComposerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <AIComposer />
      </main>
      <Footer />
    </div>
  )
}
