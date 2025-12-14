import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { productId, paymentMethod } = body

  // Get product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single()

  if (productError || !product) {
    return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 })
  }

  // Create purchase record
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .insert({
      product_id: productId,
      buyer_id: user.id,
      seller_id: product.seller_id,
      amount: product.price,
      currency: product.currency,
      payment_method: paymentMethod,
      status: "completed",
    })
    .select()
    .single()

  if (purchaseError) {
    return NextResponse.json({ error: purchaseError.message }, { status: 500 })
  }

  // Increment product sales count
  await supabase.rpc("increment_product_sales", { product_id: productId })

  // Notify seller
  await supabase.from("notifications").insert({
    user_id: product.seller_id,
    type: "sale",
    title: "Nouvelle vente",
    message: `Vous avez vendu "${product.title}"`,
    link: "/marketplace",
  })

  return NextResponse.json({ purchase, downloadUrl: product.files })
}
