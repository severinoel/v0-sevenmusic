import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <ProfileHeader />
        <ProfileContent />
      </main>
      <Footer />
    </div>
  )
}
