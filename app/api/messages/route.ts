import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get("conversationId")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  if (conversationId) {
    // Get messages for a specific conversation
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:profiles!sender_id(id, username, display_name, avatar_url)
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  }

  // Get all conversations for the user
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .contains("participants", [user.id])
    .order("last_message_at", { ascending: false })

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

  const { conversation_id, content, media_url } = body

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id,
      sender_id: user.id,
      content,
      media_url,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update conversation last_message_at
  await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conversation_id)

  return NextResponse.json(data)
}
