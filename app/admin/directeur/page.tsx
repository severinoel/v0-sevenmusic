import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DirectorDashboard } from "@/components/admin/director-dashboard"

export const metadata = {
  title: "Directeur Pédagogique - Séverino El",
  description: "Dashboard du Directeur Pédagogique",
}

export default function DirectorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <DirectorDashboard />
      </main>
      <Footer />
    </div>
  )
}
