import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  let query = supabase.from("products").select(`
    *,
    seller:profiles!seller_id(id, username, display_name, avatar_url, is_verified)
  `)

  if (category) {
    query = query.eq("category", category)
  }

  if (type) {
    query = query.eq("type", type)
  }

  if (minPrice) {
    query = query.gte("price", Number.parseFloat(minPrice))
  }

  if (maxPrice) {
    query = query.lte("price", Number.parseFloat(maxPrice))
  }

  const { data, error } = await query.eq("is_published", true).order("created_at", { ascending: false })

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

  const { title, description, category, type, price, currency, files, previewUrl } = body

  const { data, error } = await supabase
    .from("products")
    .insert({
      title,
      description,
      category,
      type,
      price,
      currency: currency || "EUR",
      files,
      preview_url: previewUrl,
      seller_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
