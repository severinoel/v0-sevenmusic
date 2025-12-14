import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingSystem } from "@/components/booking/booking-system"

export const metadata = {
  title: "Réservation de cours - Séverino El",
  description: "Réservez vos cours particuliers avec nos professeurs certifiés.",
}

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <BookingSystem />
      </main>
      <Footer />
    </div>
  )
}
