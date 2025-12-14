import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") || "live"

  let query = supabase.from("live_streams").select(`
    *,
    host:profiles!host_id(id, username, display_name, avatar_url)
  `)

  if (status === "live") {
    query = query.eq("status", "live")
  } else if (status === "scheduled") {
    query = query.eq("status", "scheduled")
  }

  const { data, error } = await query.order("started_at", { ascending: false })

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

  const { title, description, scheduledAt, type } = body

  // Generate stream key
  const streamKey = `sev_${Date.now()}_${Math.random().toString(36).substring(7)}`

  const { data, error } = await supabase
    .from("live_streams")
    .insert({
      host_id: user.id,
      title,
      description,
      scheduled_at: scheduledAt,
      type: type || "live",
      stream_key: streamKey,
      status: scheduledAt ? "scheduled" : "live",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
