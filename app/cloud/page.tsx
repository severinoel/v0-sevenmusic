import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CloudStorage } from "@/components/cloud/cloud-storage"

export const metadata = {
  title: "Cloud Musical - Séverino El",
  description: "Stockez, synchronisez et partagez vos projets musicaux dans le cloud Séverino El.",
}

export default function CloudPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <CloudStorage />
      </main>
      <Footer />
    </div>
  )
}
