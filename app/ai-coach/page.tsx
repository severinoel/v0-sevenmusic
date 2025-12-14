import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIPedagogyCoach } from "@/components/ai/ai-pedagogy-coach"

export const metadata = {
  title: "Coach IA Pédagogique - Séverino El",
  description: "Assistant IA personnalisé pour votre apprentissage musical",
}

export default function AICoachPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <AIPedagogyCoach />
      </main>
      <Footer />
    </div>
  )
}
