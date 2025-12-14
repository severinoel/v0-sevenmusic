export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveStreams } from "@/components/live/live-streams"

export default function LivePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">Chargement...</div>}>
          <LiveStreams />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
