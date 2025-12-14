"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, LinkIcon, Calendar, Music, Settings, Share2 } from "lucide-react"

export function ProfileHeader() {
  return (
    <div>
      {/* Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 relative">
        <div className="absolute inset-0 bg-[url('/music-studio-abstract.jpg')] bg-cover bg-center opacity-50" />
      </div>

      {/* Profile info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 pb-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-xl">
              <AvatarImage src="/musician-profile-photo-guitarist.jpg" />
              <AvatarFallback className="text-4xl">ME</AvatarFallback>
            </Avatar>

            <div className="flex-1 sm:pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Jean Musicien</h1>
                <Badge className="bg-primary text-primary-foreground">Pro</Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  <Music className="w-3 h-3 mr-1" />
                  Guitariste
                </Badge>
              </div>
              <p className="text-muted-foreground">@jean_music</p>
            </div>

            <div className="flex items-center gap-2 sm:pb-2">
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Modifier le profil</Button>
            </div>
          </div>

          <p className="mt-4 text-foreground max-w-2xl">
            Guitariste passionné depuis 10 ans. Spécialisé en fingerstyle et composition acoustique. Professeur certifié
            Séverino El. Disponible pour collaborations et cours privés !
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Paris, France
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href="#" className="text-primary hover:underline">
                jeanmusic.com
              </a>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Membre depuis Mars 2023
            </span>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">1,234</p>
              <p className="text-sm text-muted-foreground">Abonnés</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">567</p>
              <p className="text-sm text-muted-foreground">Abonnements</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">89</p>
              <p className="text-sm text-muted-foreground">Publications</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">Niveau 15</p>
              <p className="text-sm text-muted-foreground">5,230 XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
