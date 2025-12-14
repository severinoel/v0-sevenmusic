import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata = {
  title: "Tableau de bord - Séverino El",
  description: "Votre tableau de bord personnel Séverino El.",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/connexion")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch recent practice sessions
  const { data: recentPractice } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch enrolled courses
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", user.id)
    .limit(3)

  // Fetch user achievements
  const { data: achievements } = await supabase
    .from("user_achievements")
    .select("*, achievements(*)")
    .eq("user_id", user.id)
    .order("unlocked_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16 lg:pt-20">
        <DashboardSidebar profile={profile} />
        <main className="flex-1 p-6 lg:p-8 lg:ml-64">
          <DashboardContent
            profile={profile}
            recentPractice={recentPractice || []}
            enrollments={enrollments || []}
            achievements={achievements || []}
          />
        </main>
      </div>
    </div>
  )
}
