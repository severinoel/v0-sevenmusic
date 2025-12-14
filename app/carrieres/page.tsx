import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersContent } from "@/components/careers/careers-content"

export const metadata = {
  title: "Carrières - Séverino El",
  description: "Rejoignez l'équipe Séverino El et participez à la révolution de l'éducation musicale.",
}

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <CareersContent />
      </main>
      <Footer />
    </div>
  )
}
