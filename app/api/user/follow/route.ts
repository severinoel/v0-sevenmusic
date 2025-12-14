import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const { targetUserId } = await request.json()

    if (!targetUserId) {
      return NextResponse.json({ error: "targetUserId requis" }, { status: 400 })
    }

    if (targetUserId === user.id) {
      return NextResponse.json({ error: "Vous ne pouvez pas vous suivre vous-même" }, { status: 400 })
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from("follows")
      .select()
      .eq("follower_id", user.id)
      .eq("following_id", targetUserId)
      .single()

    if (existingFollow) {
      // Unfollow
      await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", targetUserId)

      return NextResponse.json({ following: false })
    } else {
      // Follow
      await supabase.from("follows").insert({
        follower_id: user.id,
        following_id: targetUserId,
      })

      return NextResponse.json({ following: true })
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur" }, { status: 500 })
  }
}
