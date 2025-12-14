"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Sliders, Music, FileText, Headphones, Package, Sparkles, Users } from "lucide-react"

const categories = [
  { id: "all", name: "Tout", icon: Sparkles, count: 12500 },
  { id: "presets", name: "Presets Pédale", icon: Sliders, count: 4200 },
  { id: "partitions", name: "Partitions", icon: FileText, count: 3100 },
  { id: "stems", name: "Stems & Samples", icon: Music, count: 2800 },
  { id: "services", name: "Services Pro", icon: Users, count: 1200 },
  { id: "cours", name: "Cours Privés", icon: Headphones, count: 850 },
  { id: "hardware", name: "Hardware", icon: Package, count: 250 },
  { id: "nft", name: "NFT Presets", icon: Sparkles, count: 100 },
]

export function MarketplaceCategories() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="flex-shrink-0"
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.name}
            <span className="ml-2 text-xs opacity-70">({category.count})</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
