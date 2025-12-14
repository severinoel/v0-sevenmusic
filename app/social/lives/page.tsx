import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveStreamingSection } from "@/components/live/live-streaming-section"

export const metadata = {
  title: "Lives Musicaux - Séverino El",
  description: "Regardez des concerts live, cours en direct et jam sessions de la communauté Séverino El.",
}

export default function LivesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LiveStreamingSection />
      </main>
      <Footer />
    </div>
  )
}
