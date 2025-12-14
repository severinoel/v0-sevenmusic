import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModulesSystem } from "@/components/modules/modules-system"

export const metadata = {
  title: "Modules Pédagogiques - Séverino El",
  description: "Système de modules et casiers pédagogiques",
}

export default function ModulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <ModulesSystem />
      </main>
      <Footer />
    </div>
  )
}
