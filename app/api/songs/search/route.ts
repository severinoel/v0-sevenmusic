import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  if (!query) {
    return NextResponse.json({ error: "Query parameter required" }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: songs, error } = await supabase
    .from("songs")
    .select("*")
    .or(`title.ilike.%${query}%,artist.ilike.%${query}%`)
    .order("views_count", { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ songs, page, limit, query })
}
