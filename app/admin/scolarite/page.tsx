import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScolariteDashboard } from "@/components/admin/scolarite-dashboard"

export const metadata = {
  title: "Responsable Scolarité - Séverino El",
  description: "Dashboard du Responsable Scolarité",
}

export default function ScolaritePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <ScolariteDashboard />
      </main>
      <Footer />
    </div>
  )
}
