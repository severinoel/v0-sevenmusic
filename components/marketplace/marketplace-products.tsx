"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Play, Star, Eye, Download } from "lucide-react"

const products = [
  {
    id: 1,
    title: "Clean Tube Crunch - Pack Complet",
    seller: "StudioMaster",
    category: "Presets",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 234,
    downloads: 1250,
    image: "/guitar-amplifier-preset-interface.jpg",
    tags: ["Rock", "Blues"],
    featured: true,
  },
  {
    id: 2,
    title: "Jazz Standards - 50 Partitions",
    seller: "JazzLibrary",
    category: "Partitions",
    price: 19.99,
    rating: 4.8,
    reviews: 89,
    downloads: 560,
    image: "/jazz-sheet-music-collection.jpg",
    tags: ["Jazz", "Standards"],
    featured: false,
  },
  {
    id: 3,
    title: "Drum Stems - Funk Collection",
    seller: "BeatMaker Pro",
    category: "Stems",
    price: 14.99,
    rating: 4.7,
    reviews: 156,
    downloads: 890,
    image: "/drum-kit-funk-music.jpg",
    tags: ["Funk", "Drums"],
    featured: false,
  },
  {
    id: 4,
    title: "Mixage & Mastering Pro",
    seller: "AudioEngineer",
    category: "Services",
    price: 79.99,
    rating: 5.0,
    reviews: 67,
    downloads: 0,
    image: "/professional-audio-mixing-studio.jpg",
    tags: ["Service", "Pro"],
    featured: true,
  },
  {
    id: 5,
    title: "Metal High Gain - IR Pack",
    seller: "MetalTones",
    category: "Presets",
    price: 29.99,
    rating: 4.9,
    reviews: 312,
    downloads: 2100,
    image: "/metal-guitar-amp-high-gain.jpg",
    tags: ["Metal", "High Gain"],
    featured: false,
  },
  {
    id: 6,
    title: "NFT Legendary Preset #001",
    seller: "CryptoSound",
    category: "NFT",
    price: 149.99,
    rating: 4.6,
    reviews: 12,
    downloads: 12,
    image: "/nft-digital-art-music-visualizer.jpg",
    tags: ["NFT", "Exclusive"],
    featured: true,
    nft: true,
  },
]

export function MarketplaceProducts() {
  const [sortBy, setSortBy] = useState("popular")

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">12,500</span> produits trouvés
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Plus populaires</SelectItem>
            <SelectItem value="recent">Plus récents</SelectItem>
            <SelectItem value="price-low">Prix croissant</SelectItem>
            <SelectItem value="price-high">Prix décroissant</SelectItem>
            <SelectItem value="rating">Mieux notés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.featured && <Badge className="absolute top-2 left-2 bg-primary">En vedette</Badge>}
              {product.nft && <Badge className="absolute top-2 right-2 bg-accent">NFT</Badge>}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Play className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">par {product.seller}</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} avis)</span>
                {product.downloads > 0 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-3 h-3" />
                      {product.downloads}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}€</span>
                )}
              </div>
              <Button size="sm">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Acheter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Charger plus de produits
        </Button>
      </div>
    </div>
  )
}
