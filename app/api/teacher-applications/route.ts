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

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single()

  if (!profile || !["admin", "rgh", "director"].includes(profile.role)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  let query = supabase.from("teacher_applications").select(`
      *,
      applicant:profiles!applicant_id(id, username, display_name, avatar_url, email)
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

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const {
    full_name,
    email,
    phone,
    specialties,
    instruments,
    years_experience,
    education_level,
    certifications,
    cv_url,
    video_presentation_url,
    audio_samples,
    social_links,
    availability,
    teaching_philosophy,
    teaching_methods,
    online_experience,
  } = body

  const { data, error } = await supabase
    .from("teacher_applications")
    .insert({
      applicant_id: user.id,
      full_name,
      email,
      phone,
      specialties,
      instruments,
      years_experience,
      education_level,
      certifications,
      cv_url,
      video_presentation_url,
      audio_samples,
      social_links,
      availability,
      teaching_philosophy,
      teaching_methods,
      online_experience,
      status: "submitted",
    })
    .select()
    .single()

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

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single()

  if (!profile || !["admin", "rgh", "director"].includes(profile.role)) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  const { id, status, evaluation_scores, feedback, reviewer_notes } = body

  const updateData: any = { status }
  if (evaluation_scores) updateData.evaluation_scores = evaluation_scores
  if (feedback) updateData.feedback = feedback
  if (reviewer_notes) updateData.reviewer_notes = reviewer_notes
  updateData.reviewed_by = user.id
  updateData.reviewed_at = new Date().toISOString()

  const { data, error } = await supabase.from("teacher_applications").update(updateData).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If accepted, update user role to teacher
  if (status === "accepted") {
    const { data: application } = await supabase
      .from("teacher_applications")
      .select("applicant_id")
      .eq("id", id)
      .single()

    if (application) {
      await supabase.from("profiles").update({ role: "teacher" }).eq("user_id", application.applicant_id)
    }
  }

  return NextResponse.json(data)
}
