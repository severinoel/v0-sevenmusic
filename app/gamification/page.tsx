import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GamificationHub } from "@/components/gamification/gamification-hub"

export const metadata = {
  title: "Gamification - Séverino El",
  description: "Gagnez des XP, débloquez des badges et grimpez dans les classements sur Séverino El.",
}

export default function GamificationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <GamificationHub />
      </main>
      <Footer />
    </div>
  )
}
