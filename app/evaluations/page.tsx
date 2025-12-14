import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EvaluationSystem } from "@/components/evaluation/evaluation-system"

export const metadata = {
  title: "Système d'Évaluation - Séverino El",
  description: "Quiz interactifs et évaluations pédagogiques",
}

export default function EvaluationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <EvaluationSystem />
      </main>
      <Footer />
    </div>
  )
}
