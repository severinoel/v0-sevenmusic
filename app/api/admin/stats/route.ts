import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { SUPER_ADMIN_EMAILS } from "@/lib/constants/admin-config"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Check if admin
  const { data: profile } = await supabase.from("profiles").select("role, email").eq("user_id", user.id).single()

  const isAdmin = profile?.role === "admin" || SUPER_ADMIN_EMAILS.includes(user.email || "")

  if (!isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  // Get stats
  const [
    { count: totalUsers },
    { count: totalTeachers },
    { count: totalCourses },
    { count: totalEnrollments },
    { count: pendingApplications },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
    supabase.from("teacher_applications").select("*", { count: "exact", head: true }).eq("status", "submitted"),
    supabase
      .from("profiles")
      .select("id, username, avatar_url, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  return NextResponse.json({
    totalUsers: totalUsers || 0,
    totalTeachers: totalTeachers || 0,
    totalCourses: totalCourses || 0,
    totalEnrollments: totalEnrollments || 0,
    pendingApplications: pendingApplications || 0,
    recentUsers: recentUsers || [],
  })
}
