import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SocialFeed } from "@/components/social/social-feed"
import { SocialSidebar } from "@/components/social/social-sidebar"
import { TrendingSidebar } from "@/components/social/trending-sidebar"

export default function SocialPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left sidebar */}
            <aside className="hidden lg:block">
              <SocialSidebar />
            </aside>

            {/* Main feed */}
            <div className="lg:col-span-2">
              <SocialFeed />
            </div>

            {/* Right sidebar */}
            <aside className="hidden lg:block">
              <TrendingSidebar />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
