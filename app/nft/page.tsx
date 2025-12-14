import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NFTMarketplace } from "@/components/nft/nft-marketplace"

export const metadata = {
  title: "NFT Presets - Séverino El",
  description: "Éditions limitées et collections numériques de presets exclusifs.",
}

export default function NFTPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <NFTMarketplace />
      </main>
      <Footer />
    </div>
  )
}
