import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File
  const path = (formData.get("path") as string) || ""
  const moduleId = formData.get("moduleId") as string

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
  }

  const fileExt = file.name.split(".").pop()
  const fileName = `${user.id}/${Date.now()}_${file.name}`

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage.from("casiers").upload(fileName, file)

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("casiers").getPublicUrl(fileName)

  // Determine file type
  let fileType = "document"
  const mimeType = file.type
  if (mimeType.startsWith("audio/")) fileType = "audio"
  else if (mimeType.startsWith("video/")) fileType = "video"
  else if (mimeType.startsWith("image/")) fileType = "image"
  else if (mimeType === "application/pdf") fileType = "pdf"

  // Save file metadata to database
  const { data: fileRecord, error: dbError } = await supabase
    .from("files")
    .insert({
      name: file.name,
      type: fileType,
      path,
      module_id: moduleId || null,
      size: file.size,
      mime_type: mimeType,
      url: publicUrl,
      owner_id: user.id,
    })
    .select()
    .single()

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json(fileRecord)
}
