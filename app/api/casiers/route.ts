import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || ""
  const moduleId = searchParams.get("moduleId")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  let query = supabase.from("files").select(`
    *,
    owner:profiles!owner_id(id, username, display_name, avatar_url)
  `)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  if (path) {
    query = query.eq("path", path)
  }

  const { data, error } = await query.order("type", { ascending: true }).order("name", { ascending: true })

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

  const { name, type, path, moduleId, size, mimeType, url } = body

  const { data, error } = await supabase
    .from("files")
    .insert({
      name,
      type,
      path,
      module_id: moduleId,
      size,
      mime_type: mimeType,
      url,
      owner_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const fileId = searchParams.get("id")

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  if (!fileId) {
    return NextResponse.json({ error: "ID du fichier requis" }, { status: 400 })
  }

  const { error } = await supabase.from("files").delete().eq("id", fileId).eq("owner_id", user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
