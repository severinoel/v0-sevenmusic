import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileLockerSystem } from "@/components/casiers/file-locker-system"

export const metadata = {
  title: "Casiers Pédagogiques - Séverino El",
  description: "Gérez vos fichiers de cours, exercices et ressources pédagogiques.",
}

export default async function CasiersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/connexion")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <FileLockerSystem />
      </main>
      <Footer />
    </div>
  )
}
