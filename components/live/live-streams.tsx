"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Video, Users, Calendar, Radio, Plus, Play } from "lucide-react"
import Link from "next/link"
import { InDevelopmentBadge } from "@/components/ui/in-development-badge"

export function LiveStreams() {
  const [lives, setLives] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { user } = useUser()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    loadLives()
  }, [])

  async function loadLives() {
    try {
      const { data, error } = await supabase
        .from("live_streams")
        .select(`
          *,
          profiles!live_streams_host_id_fkey (display_name, avatar_url, username)
        `)
        .in("status", ["live", "scheduled"])
        .order("created_at", { ascending: false })

      if (error) throw error
      setLives(data || [])
    } catch (error) {
      console.error("Error loading lives:", error)
    } finally {
      setLoading(false)
    }
  }

  async function createLive(formData: FormData) {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer un live",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await supabase.from("live_streams").insert([
        {
          host_id: user.id,
          title: formData.get("title"),
          description: formData.get("description"),
          scheduled_at: formData.get("scheduled_at") || new Date().toISOString(),
          status: "scheduled",
        },
      ])

      if (error) throw error

      toast({
        title: "Succès",
        description: "Votre live a été programmé avec succès !",
      })
      setDialogOpen(false)
      loadLives()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Lives Musicaux</h1>
          <p className="text-muted-foreground">Partagez votre musique en direct avec la communauté</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Lancer un Live
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un Live Stream</DialogTitle>
              <DialogDescription>Programmez votre session live et partagez votre passion musicale</DialogDescription>
            </DialogHeader>

            <InDevelopmentBadge feature="Le streaming vidéo en temps réel" />

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                createLive(formData)
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Titre du live *</Label>
                <Input id="title" name="title" placeholder="Ex: Session Jazz Improvisation" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez ce que vous allez jouer..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduled_at">Date et heure</Label>
                <Input id="scheduled_at" name="scheduled_at" type="datetime-local" />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Programmer le Live
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList>
          <TabsTrigger value="live">
            <Radio className="w-4 h-4 mr-2" />
            En direct
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            <Calendar className="w-4 h-4 mr-2" />
            Programmés
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {loading ? (
            <div className="text-center py-12">Chargement des lives...</div>
          ) : lives.filter((l) => l.status === "live").length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun live en cours</h3>
                <p className="text-muted-foreground">Lancez votre premier live ou revenez plus tard !</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lives
                .filter((l) => l.status === "live")
                .map((live) => (
                  <Card key={live.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-secondary">
                      <img
                        src={live.thumbnail_url || "/placeholder.svg?height=200&width=400&query=live+concert"}
                        alt={live.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full mr-1" />
                        EN DIRECT
                      </Badge>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {live.peak_viewers || 0}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{live.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={live.profiles?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>{live.profiles?.display_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{live.profiles?.display_name}</span>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/live/${live.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Regarder
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {loading ? (
            <div className="text-center py-12">Chargement...</div>
          ) : lives.filter((l) => l.status === "scheduled").length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun live programmé</h3>
                <p className="text-muted-foreground">Soyez le premier à programmer un live !</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lives
                .filter((l) => l.status === "scheduled")
                .map((live) => (
                  <Card key={live.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{live.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={live.profiles?.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>{live.profiles?.display_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{live.profiles?.display_name}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(live.scheduled_at).toLocaleString("fr-FR")}</span>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        Me rappeler
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
