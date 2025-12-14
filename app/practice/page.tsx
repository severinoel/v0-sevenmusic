import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PracticeAnalytics } from "@/components/practice/practice-analytics"

export const metadata = {
  title: "Practice Analytics - Séverino El",
  description: "Suivez votre progression musicale avec des analyses détaillées et un coach IA personnalisé.",
}

export default function PracticePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <PracticeAnalytics />
      </main>
      <Footer />
    </div>
  )
}
