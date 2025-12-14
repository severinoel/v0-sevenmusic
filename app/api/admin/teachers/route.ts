import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  let query = supabase.from("teacher_applications").select(`
    *,
    user:profiles!user_id(id, username, display_name, avatar_url, email)
  `)

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { applicationId, status, feedback, scores } = body

  const updateData: any = { status }
  if (feedback) updateData.feedback = feedback
  if (scores) updateData.evaluation_scores = scores

  const { data, error } = await supabase
    .from("teacher_applications")
    .update(updateData)
    .eq("id", applicationId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If approved, update user role to teacher
  if (status === "accepted" && data.user_id) {
    await supabase.from("profiles").update({ role: "teacher" }).eq("user_id", data.user_id)
  }

  return NextResponse.json(data)
}
