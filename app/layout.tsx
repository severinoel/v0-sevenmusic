import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Séverino El - Écosystème Musical Complet",
  description:
    "Plateforme musicale complète : école de musique en ligne, réseau social musical, pédale d'effets virtuelle, marketplace et outils collaboratifs.",
  keywords: [
    "musique",
    "école de musique",
    "réseau social musical",
    "effets guitare",
    "cours de musique",
    "collaboration musicale",
  ],
  authors: [{ name: "Séverino El" }],
  creator: "Séverino El",
  openGraph: {
    title: "Séverino El - Écosystème Musical Complet",
    description:
      "La première plateforme au monde alliant école de musique intelligente, réseau social musical et outils professionnels.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
