import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SettingsContent } from "@/components/settings/settings-content"

export const metadata = {
  title: "Paramètres - Séverino El",
  description: "Gérez vos paramètres de compte Séverino El.",
}

export default async function ParametresPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/connexion")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <SettingsContent user={user} profile={profile} />
      </main>
      <Footer />
    </div>
  )
}
