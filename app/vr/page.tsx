import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VRExperiences } from "@/components/vr/vr-experiences"

export const metadata = {
  title: "Expériences VR/AR - Séverino El",
  description: "Concerts immersifs, cours holographiques et studios virtuels en réalité virtuelle.",
}

export default function VRPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <VRExperiences />
      </main>
      <Footer />
    </div>
  )
}
