import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RGHDashboard } from "@/components/admin/rgh-dashboard"

export const metadata = {
  title: "RGH - Gestion Humaine - Séverino El",
  description: "Dashboard du Responsable Gestion Humaine",
}

export default function RGHPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <RGHDashboard />
      </main>
      <Footer />
    </div>
  )
}
