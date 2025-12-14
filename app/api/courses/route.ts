import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get("difficulty")
  const instrument = searchParams.get("instrument")
  const featured = searchParams.get("featured")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  const supabase = await createClient()

  let query = supabase
    .from("courses")
    .select(
      `
      *,
      instructor:profiles!instructor_id(id, username, display_name, avatar_url, is_verified)
    `,
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (difficulty) {
    query = query.eq("difficulty", difficulty)
  }

  if (instrument) {
    query = query.contains("instruments", [instrument])
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  const { data: courses, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ courses, page, limit })
}
