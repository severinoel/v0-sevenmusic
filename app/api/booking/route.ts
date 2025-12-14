import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const teacherId = searchParams.get("teacherId")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  let query = supabase.from("bookings").select(`
    *,
    teacher:profiles!teacher_id(id, username, display_name, avatar_url),
    student:profiles!student_id(id, username, display_name, avatar_url)
  `)

  if (teacherId) {
    query = query.eq("teacher_id", teacherId)
  } else {
    // Get user's bookings
    query = query.or(`teacher_id.eq.${user.id},student_id.eq.${user.id}`)
  }

  const { data, error } = await query.order("scheduled_at", { ascending: true })

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

  const { teacherId, scheduledAt, duration, type, notes } = body

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      teacher_id: teacherId,
      student_id: user.id,
      scheduled_at: scheduledAt,
      duration,
      type,
      notes,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Create notification for teacher
  await supabase.from("notifications").insert({
    user_id: teacherId,
    type: "booking",
    title: "Nouvelle réservation",
    message: "Un élève a réservé un cours avec vous",
    link: "/booking",
  })

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

  const { bookingId, status } = body

  const { data, error } = await supabase.from("bookings").update({ status }).eq("id", bookingId).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
