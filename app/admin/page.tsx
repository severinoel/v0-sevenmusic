import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminHierarchyDashboard } from "@/components/admin/admin-hierarchy-dashboard"
import { SUPER_ADMIN_EMAILS } from "@/lib/constants/admin-config"

export const metadata = {
  title: "Administration - Séverino El",
  description: "Tableau de bord d'administration Séverino El pour les gestionnaires et professeurs.",
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/connexion")
  }

  // Vérifier si l'utilisateur est admin
  const { data: profile } = await supabase.from("profiles").select("*, admin_roles(*)").eq("id", user.id).single()

  const isAdmin =
    SUPER_ADMIN_EMAILS.includes(user.email || "") || profile?.role === "admin" || profile?.admin_roles?.length > 0

  // Récupérer les statistiques
  const [{ count: totalUsers }, { count: totalCourses }, { count: totalTeachers }, { count: pendingApplications }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
      supabase.from("teacher_applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    ])

  // Récupérer les candidatures professeurs récentes
  const { data: recentApplications } = await supabase
    .from("teacher_applications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Récupérer les utilisateurs récents
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <AdminHierarchyDashboard
          isAdmin={isAdmin}
          userEmail={user.email || ""}
          stats={{
            totalUsers: totalUsers || 0,
            totalCourses: totalCourses || 0,
            totalTeachers: totalTeachers || 0,
            pendingApplications: pendingApplications || 0,
          }}
          recentApplications={recentApplications || []}
          recentUsers={recentUsers || []}
        />
      </main>
      <Footer />
    </div>
  )
}
