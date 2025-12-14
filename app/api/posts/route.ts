import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const type = searchParams.get("type") // post, reel, all
  const userId = searchParams.get("userId")

  const supabase = await createClient()

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles!author_id(id, username, display_name, avatar_url, is_verified)
    `,
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (type && type !== "all") {
    query = query.eq("type", type)
  }

  if (userId) {
    query = query.eq("author_id", userId)
  }

  const { data: posts, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts, page, limit })
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
    const { caption, type, media_urls, audio_url, bpm, music_key, tags, audience } = body

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        author_id: user.id,
        caption,
        type: type || "post",
        media_urls: media_urls || [],
        audio_url,
        bpm,
        music_key,
        tags: tags || [],
        audience: audience || "public",
      })
      .select()
      .single()

    if (error) throw error

    // Update user posts count
    await supabase.rpc("increment_posts_count", { user_id: user.id })

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 })
  }
}
