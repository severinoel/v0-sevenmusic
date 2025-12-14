import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = Number.parseInt(searchParams.get("days") || "7")

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data: sessions, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Calculate stats
  const totalMinutes = sessions?.reduce((acc, s) => acc + s.duration_minutes, 0) || 0
  const totalXP = sessions?.reduce((acc, s) => acc + s.xp_earned, 0) || 0
  const avgRhythm = sessions?.length
    ? sessions.reduce((acc, s) => acc + (s.rhythm_accuracy || 0), 0) / sessions.length
    : 0

  return NextResponse.json({
    sessions,
    stats: {
      totalMinutes,
      totalXP,
      avgRhythm: Math.round(avgRhythm),
      sessionCount: sessions?.length || 0,
    },
  })
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { activity_type, duration_minutes, rhythm_accuracy, pitch_accuracy, tempo_bpm, started_at, ended_at } = body

    const { data: session, error } = await supabase
      .from("practice_sessions")
      .insert({
        user_id: user.id,
        activity_type,
        duration_minutes,
        rhythm_accuracy,
        pitch_accuracy,
        tempo_bpm,
        started_at,
        ended_at,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ session })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 })
  }
}
