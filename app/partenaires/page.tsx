import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PartnersContent } from "@/components/partners/partners-content"

export const metadata = {
  title: "Partenaires - Séverino El",
  description: "Découvrez nos partenaires et comment collaborer avec Séverino El.",
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <PartnersContent />
      </main>
      <Footer />
    </div>
  )
}
