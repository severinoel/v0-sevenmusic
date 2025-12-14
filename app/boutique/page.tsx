import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoinsShop } from "@/components/shop/coins-shop"

export const metadata = {
  title: "Boutique Séverino Coins - Séverino El",
  description: "Échangez vos Séverino Coins contre du contenu premium, des presets exclusifs et plus encore.",
}

export default function BoutiquePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <CoinsShop />
      </main>
      <Footer />
    </div>
  )
}
