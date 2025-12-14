import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const level = searchParams.get("level")
  const instrument = searchParams.get("instrument")

  let query = supabase.from("modules").select(`
      *,
      instructor:profiles!instructor_id(id, username, display_name, avatar_url),
      lessons_count:lessons(count),
      enrollments_count:module_enrollments(count)
    `)

  if (level) {
    query = query.eq("level", level)
  }

  if (instrument) {
    query = query.contains("instruments", [instrument])
  }

  const { data, error } = await query.eq("is_published", true).order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Check if user is a teacher
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single()

  if (!profile || !["teacher", "admin"].includes(profile.role)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  const { title, description, level, instruments, objectives, prerequisites, price, is_free } = body

  const { data, error } = await supabase
    .from("modules")
    .insert({
      title,
      description,
      level,
      instruments,
      objectives,
      prerequisites,
      price,
      is_free,
      instructor_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
