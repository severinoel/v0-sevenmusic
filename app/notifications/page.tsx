"use client"

import { NotificationsCenter } from "@/components/notifications/notifications-center"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <NotificationsCenter />
      </main>
      <Footer />
    </div>
  )
}
