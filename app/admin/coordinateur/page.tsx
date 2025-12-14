"use client"

import { CoordinateurDashboard } from "@/components/admin/coordinateur-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CoordinateurPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CoordinateurDashboard />
      </main>
      <Footer />
    </div>
  )
}
