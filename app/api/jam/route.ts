import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  const instrument = searchParams.get("instrument")

  let query = supabase.from("jam_sessions").select(`
    *,
    host:profiles!host_id(id, username, display_name, avatar_url, instruments, skill_level),
    participants:jam_session_participants(
      user:profiles(id, username, display_name, avatar_url, instruments)
    )
  `)

  if (genre) {
    query = query.contains("genres", [genre])
  }

  if (instrument) {
    query = query.contains("instruments_needed", [instrument])
  }

  const { data, error } = await query.in("status", ["open", "in_progress"]).order("scheduled_at", { ascending: true })

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

  const { title, description, genres, instrumentsNeeded, skillLevel, maxParticipants, scheduledAt } = body

  const { data, error } = await supabase
    .from("jam_sessions")
    .insert({
      host_id: user.id,
      title,
      description,
      genres,
      instruments_needed: instrumentsNeeded,
      skill_level: skillLevel,
      max_participants: maxParticipants || 8,
      scheduled_at: scheduledAt,
      status: "open",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
