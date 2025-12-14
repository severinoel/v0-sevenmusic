import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero"
import { MarketplaceCategories } from "@/components/marketplace/marketplace-categories"
import { MarketplaceProducts } from "@/components/marketplace/marketplace-products"
import { MarketplaceSidebar } from "@/components/marketplace/marketplace-sidebar"

export const metadata = {
  title: "Marketplace - Séverino El",
  description:
    "Achetez et vendez des presets, partitions, services musicaux et hardware sur la marketplace Séverino El.",
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <MarketplaceHero />
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MarketplaceCategories />
            <div className="mt-8 grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <MarketplaceSidebar />
              </div>
              <div className="lg:col-span-3">
                <MarketplaceProducts />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
