"use client"

import { MessagingSystem } from "@/components/messaging/messaging-system"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <MessagingSystem />
      </main>
      <Footer />
    </div>
  )
}
