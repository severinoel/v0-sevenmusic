import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIStudio } from "@/components/studio/ai-studio"

export const metadata = {
  title: "AI Studio - Séverino El",
  description: "Studio de production musicale avec mixage et mastering automatiques par IA.",
}

export default function StudioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <AIStudio />
      </main>
      <Footer />
    </div>
  )
}
