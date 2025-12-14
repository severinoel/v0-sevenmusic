"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gem, Clock, TrendingUp, Play, Heart, Share2, Verified } from "lucide-react"

const featuredNFTs = [
  {
    id: 1,
    name: "Vintage Tube Warmth",
    creator: "SéverinoMaster",
    price: 0.5,
    currency: "ETH",
    edition: "1/50",
    image: "/nft-vintage-amp.jpg",
    likes: 234,
    timeLeft: "2j 14h",
    verified: true,
  },
  {
    id: 2,
    name: "Crystal Clean Chorus",
    creator: "EffectWizard",
    price: 0.3,
    currency: "ETH",
    edition: "5/100",
    image: "/nft-chorus-effect.jpg",
    likes: 189,
    timeLeft: "5j 8h",
    verified: true,
  },
  {
    id: 3,
    name: "Legendary Distortion",
    creator: "RockGod",
    price: 1.2,
    currency: "ETH",
    edition: "1/10",
    image: "/nft-distortion-pedal.jpg",
    likes: 456,
    timeLeft: "12h 30m",
    verified: true,
  },
]

const collections = [
  { name: "Vintage Amps", items: 24, floor: 0.2, volume: 12.5 },
  { name: "Signature Tones", items: 50, floor: 0.1, volume: 8.3 },
  { name: "Rare Effects", items: 15, floor: 0.8, volume: 24.1 },
]

export function NFTMarketplace() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-900/30 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Gem className="w-3 h-3 mr-1" />
              NFT Marketplace
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Presets Exclusifs NFT
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Possédez des presets uniques en édition limitée. Royalties automatiques pour les créateurs, authenticité
              garantie par la blockchain.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                Explorer les NFTs
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                Créer un NFT
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Volume total", value: "156.8 ETH" },
            { label: "NFTs créés", value: "1,247" },
            { label: "Créateurs", value: "328" },
            { label: "Propriétaires", value: "2,156" },
          ].map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6 text-center">
                <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured NFTs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">En vedette</h2>
            <Button variant="ghost">Voir tout</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredNFTs.map((nft) => (
              <Card
                key={nft.id}
                className="border-border overflow-hidden group hover:border-purple-500/50 transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <Badge className="bg-background/80 backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {nft.timeLeft}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Button size="sm" variant="secondary" className="gap-1 bg-background/80 backdrop-blur-sm">
                      <Play className="w-3 h-3" />
                      Écouter
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="w-8 h-8 bg-background/80 backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 bg-background/80 backdrop-blur-sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold">{nft.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>par</span>
                        <span className="text-foreground">{nft.creator}</span>
                        {nft.verified && <Verified className="w-3 h-3 text-blue-500" />}
                      </div>
                    </div>
                    <Badge variant="outline">{nft.edition}</Badge>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Prix actuel</p>
                      <p className="font-bold text-lg">
                        {nft.price} {nft.currency}
                      </p>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                      Acheter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Collections populaires</h2>
            <Button variant="ghost">Voir tout</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Card key={index} className="border-border hover:border-purple-500/50 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Gem className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.items} items</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Floor</p>
                      <p className="font-medium">{collection.floor} ETH</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Volume</p>
                      <p className="font-medium flex items-center gap-1">
                        {collection.volume} ETH
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
