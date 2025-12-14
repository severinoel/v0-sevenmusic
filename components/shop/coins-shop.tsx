"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Gift, Music, Palette, Crown, Sparkles, Star, Zap, Lock, Check } from "lucide-react"

const coinPackages = [
  { coins: 500, price: 4.99, bonus: 0, popular: false },
  { coins: 1200, price: 9.99, bonus: 200, popular: true },
  { coins: 2500, price: 19.99, bonus: 500, popular: false },
  { coins: 6500, price: 49.99, bonus: 1500, popular: false },
  { coins: 14000, price: 99.99, bonus: 4000, popular: false },
]

const shopItems = {
  presets: [
    { name: "Vintage Crunch Pack", price: 300, image: "/placeholder.svg", category: "Guitare", rating: 4.8 },
    { name: "Jazz Clean Collection", price: 250, image: "/placeholder.svg", category: "Guitare", rating: 4.9 },
    { name: "Metal Distortion Bundle", price: 400, image: "/placeholder.svg", category: "Guitare", rating: 4.7 },
    { name: "Acoustic Dreams", price: 200, image: "/placeholder.svg", category: "Guitare", rating: 4.6 },
  ],
  themes: [
    { name: "Neon Nights", price: 150, preview: "from-purple-600 to-pink-600", exclusive: false },
    { name: "Ocean Breeze", price: 150, preview: "from-cyan-500 to-blue-600", exclusive: false },
    { name: "Golden Hour", price: 200, preview: "from-amber-500 to-orange-600", exclusive: true },
    { name: "Midnight Galaxy", price: 300, preview: "from-indigo-900 to-purple-900", exclusive: true },
  ],
  avatars: [
    { name: "Rockstar Frame", price: 100, type: "Cadre", rarity: "rare" },
    { name: "Golden Crown", price: 500, type: "Accessoire", rarity: "legendary" },
    { name: "Neon Glow", price: 150, type: "Effet", rarity: "epic" },
    { name: "Music Notes BG", price: 80, type: "Fond", rarity: "common" },
  ],
  boosts: [
    { name: "Double XP (24h)", price: 100, duration: "24 heures", icon: Zap },
    { name: "Double XP (7j)", price: 500, duration: "7 jours", icon: Zap },
    { name: "Streak Shield", price: 200, duration: "3 utilisations", icon: Crown },
    { name: "Priority Matching", price: 150, duration: "10 jam sessions", icon: Sparkles },
  ],
}

const getRarityStyle = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "border-yellow-500 bg-yellow-500/10"
    case "epic":
      return "border-purple-500 bg-purple-500/10"
    case "rare":
      return "border-blue-500 bg-blue-500/10"
    default:
      return "border-border"
  }
}

export function CoinsShop() {
  const userCoins = 2450

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-amber-500/10 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Boutique Séverino Coins</h1>
                  <p className="text-muted-foreground">Échangez vos coins contre des récompenses exclusives</p>
                </div>
              </div>
            </div>
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Votre solde</p>
                  <p className="text-2xl font-bold text-amber-500">{userCoins.toLocaleString()} coins</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Buy Coins Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary" />
            Acheter des Coins
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coinPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${pkg.popular ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Populaire
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-3xl font-bold">{pkg.coins.toLocaleString()}</p>
                  {pkg.bonus > 0 && (
                    <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-500">
                      +{pkg.bonus} bonus
                    </Badge>
                  )}
                  <p className="text-2xl font-bold text-primary mt-4">{pkg.price}€</p>
                  <Button className="w-full mt-4">Acheter</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shop Items */}
        <Tabs defaultValue="presets" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="presets" className="gap-2 data-[state=active]:bg-background">
              <Music className="w-4 h-4" />
              Presets
            </TabsTrigger>
            <TabsTrigger value="themes" className="gap-2 data-[state=active]:bg-background">
              <Palette className="w-4 h-4" />
              Thèmes
            </TabsTrigger>
            <TabsTrigger value="avatars" className="gap-2 data-[state=active]:bg-background">
              <Crown className="w-4 h-4" />
              Avatars
            </TabsTrigger>
            <TabsTrigger value="boosts" className="gap-2 data-[state=active]:bg-background">
              <Zap className="w-4 h-4" />
              Boosts
            </TabsTrigger>
          </TabsList>

          {/* Presets */}
          <TabsContent value="presets">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shopItems.presets.map((item, index) => (
                <Card key={index} className="border-border overflow-hidden group">
                  <div className="aspect-video bg-secondary relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Music className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                    <Badge className="absolute top-2 left-2">{item.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {item.rating}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span className="font-bold">{item.price}</span>
                      </div>
                      <Button size="sm" disabled={userCoins < item.price}>
                        {userCoins >= item.price ? "Acheter" : <Lock className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Themes */}
          <TabsContent value="themes">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shopItems.themes.map((theme, index) => (
                <Card key={index} className="border-border overflow-hidden">
                  <div className={`h-32 bg-gradient-to-br ${theme.preview} relative`}>
                    {theme.exclusive && (
                      <Badge className="absolute top-2 right-2 bg-background/80">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Exclusif
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-3">{theme.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span className="font-bold">{theme.price}</span>
                      </div>
                      <Button size="sm" disabled={userCoins < theme.price}>
                        {userCoins >= theme.price ? "Appliquer" : <Lock className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Avatars */}
          <TabsContent value="avatars">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shopItems.avatars.map((avatar, index) => (
                <Card key={index} className={`border-2 ${getRarityStyle(avatar.rarity)}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                      <Crown className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold">{avatar.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{avatar.type}</p>
                    <Badge variant="outline" className="capitalize mb-4">
                      {avatar.rarity}
                    </Badge>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span className="font-bold">{avatar.price}</span>
                    </div>
                    <Button size="sm" className="w-full" disabled={userCoins < avatar.price}>
                      {userCoins >= avatar.price ? "Acheter" : <Lock className="w-4 h-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Boosts */}
          <TabsContent value="boosts">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shopItems.boosts.map((boost, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                      <boost.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold">{boost.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{boost.duration}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Coins className="w-4 h-4 text-amber-500" />
                      <span className="font-bold">{boost.price}</span>
                    </div>
                    <Button size="sm" className="w-full" disabled={userCoins < boost.price}>
                      {userCoins >= boost.price ? (
                        <>
                          <Check className="w-4 h-4 mr-1" /> Activer
                        </>
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
