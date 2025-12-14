"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { UserIcon, Bell, Shield, CreditCard, Palette, Globe, Loader2, Camera, Save, Trash2 } from "lucide-react"

interface SettingsContentProps {
  user: User
  profile: Profile | null
}

const instruments = [
  "Guitare",
  "Piano",
  "Batterie",
  "Basse",
  "Voix",
  "Violon",
  "Saxophone",
  "Trompette",
  "Flûte",
  "Ukulele",
]

const levels = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
  { value: "expert", label: "Expert" },
]

export function SettingsContent({ user, profile }: SettingsContentProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Profile form state
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [city, setCity] = useState(profile?.city || "")
  const [country, setCountry] = useState(profile?.country || "")
  const [skillLevel, setSkillLevel] = useState(profile?.skill_level || "beginner")
  const [isPrivate, setIsPrivate] = useState(profile?.is_private || false)
  const [showActivity, setShowActivity] = useState(profile?.show_activity_status ?? true)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          username,
          bio,
          city,
          country,
          skill_level: skillLevel,
          is_private: isPrivate,
          show_activity_status: showActivity,
        })
        .eq("id", user.id)

      if (error) throw error

      setMessage({ type: "success", text: "Profil mis à jour avec succès !" })
      router.refresh()
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Une erreur est survenue",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <div className="container max-w-4xl px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez vos préférences et votre compte</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
          <TabsTrigger value="profile" className="gap-2">
            <UserIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Confidentialité</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Abonnement</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Langue</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <form onSubmit={handleProfileUpdate}>
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles et musicales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.type === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Changer la photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nom affiché</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="@monpseudo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email || ""} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié pour le moment.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Parlez-nous de vous et de votre passion pour la musique..."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Paris" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="France"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Niveau musical</Label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications push</p>
                  <p className="text-sm text-muted-foreground">Recevez des notifications dans votre navigateur</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifications email</p>
                  <p className="text-sm text-muted-foreground">Recevez un résumé hebdomadaire par email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouveaux abonnés</p>
                  <p className="text-sm text-muted-foreground">Soyez notifié quand quelqu'un vous suit</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Commentaires et likes</p>
                  <p className="text-sm text-muted-foreground">
                    Notifications pour les interactions sur vos publications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rappels de pratique</p>
                  <p className="text-sm text-muted-foreground">Rappels quotidiens pour maintenir votre série</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité et sécurité</CardTitle>
              <CardDescription>Gérez la visibilité de votre compte et vos données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Compte privé</p>
                  <p className="text-sm text-muted-foreground">
                    Seuls vos abonnés approuvés peuvent voir vos publications
                  </p>
                </div>
                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Afficher mon statut d'activité</p>
                  <p className="text-sm text-muted-foreground">Les autres peuvent voir quand vous êtes en ligne</p>
                </div>
                <Switch checked={showActivity} onCheckedChange={setShowActivity} />
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Gestion des données</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline">Télécharger mes données</Button>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Abonnement</CardTitle>
              <CardDescription>Gérez votre abonnement et vos moyens de paiement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Plan actuel</span>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {profile?.subscription_tier === "free" ? "Gratuit" : profile?.subscription_tier}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile?.subscription_tier === "free"
                    ? "Passez à Premium pour débloquer toutes les fonctionnalités"
                    : `Votre abonnement se renouvelle le ${profile?.subscription_expires_at}`}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Premium</CardTitle>
                    <CardDescription>Pour les passionnés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">9,99€/mois</p>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Choisir
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pro</CardTitle>
                    <CardDescription>Pour les musiciens sérieux</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">19,99€/mois</p>
                    <Button className="w-full mt-4">Choisir</Button>
                  </CardContent>
                </Card>
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Studio</CardTitle>
                    <CardDescription>Pour les professionnels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">49,99€/mois</p>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Choisir
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select defaultValue="system">
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Langue et région</CardTitle>
              <CardDescription>Configurez vos préférences de langue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Langue de l'interface</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fuseau horaire</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
