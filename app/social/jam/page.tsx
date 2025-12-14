import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JamSessionFinder } from "@/components/jam/jam-session-finder"

export const metadata = {
  title: "Jam Sessions - Séverino El",
  description: "Trouvez des musiciens pour jammer ensemble en temps réel sur Séverino El.",
}

export default function JamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <JamSessionFinder />
      </main>
      <Footer />
    </div>
  )
}
