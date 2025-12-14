import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KidsAcademy } from "@/components/kids/kids-academy"

export const metadata = {
  title: "Séverino Kids Academy - Séverino El",
  description: "Apprentissage musical gamifié pour les enfants avec contrôles parentaux.",
}

export default function KidsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <KidsAcademy />
      </main>
      <Footer />
    </div>
  )
}
