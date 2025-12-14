import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { sessionId, instrument } = body

  // Check if session is full
  const { data: session } = await supabase
    .from("jam_sessions")
    .select(`
      *,
      participants:jam_session_participants(count)
    `)
    .eq("id", sessionId)
    .single()

  if (!session) {
    return NextResponse.json({ error: "Session non trouvée" }, { status: 404 })
  }

  if (session.participants[0].count >= session.max_participants) {
    return NextResponse.json({ error: "Session complète" }, { status: 400 })
  }

  // Join session
  const { data, error } = await supabase
    .from("jam_session_participants")
    .insert({
      session_id: sessionId,
      user_id: user.id,
      instrument,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Notify host
  await supabase.from("notifications").insert({
    user_id: session.host_id,
    type: "jam",
    title: "Nouveau participant",
    message: "Un musicien a rejoint votre jam session",
    link: `/social/jam?id=${sessionId}`,
  })

  return NextResponse.json(data)
}
