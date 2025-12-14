import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: postId } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Check if already liked
    const { data: existingLike } = await supabase
      .from("likes")
      .select()
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .single()

    if (existingLike) {
      // Unlike
      await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", postId)

      return NextResponse.json({ liked: false })
    } else {
      // Like
      await supabase.from("likes").insert({
        user_id: user.id,
        post_id: postId,
      })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 })
  }
}
