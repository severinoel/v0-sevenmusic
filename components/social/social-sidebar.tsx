"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Radio, MessageCircle, Bookmark, Settings, Music, GraduationCap, Trophy, Zap } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Feed", href: "/social", active: true },
  { icon: Users, label: "Jam Sessions", href: "/social/jam" },
  { icon: Radio, label: "Lives", href: "/social/lives" },
  { icon: MessageCircle, label: "Messages", href: "/social/messages", badge: 3 },
  { icon: Bookmark, label: "Sauvegardés", href: "/social/saved" },
  { icon: Music, label: "Ma Musique", href: "/social/music" },
  { icon: GraduationCap, label: "Mes Cours", href: "/ecole" },
  { icon: Settings, label: "Paramètres", href: "/settings" },
]

export function SocialSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Profile card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-16 h-16 mb-3">
              <AvatarImage src="/musician-profile-avatar.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground">Mon Profil</h3>
            <p className="text-sm text-muted-foreground">@mon_username</p>

            <div className="flex items-center gap-4 mt-4 text-sm">
              <div>
                <p className="font-semibold text-foreground">234</p>
                <p className="text-muted-foreground">Abonnés</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="font-semibold text-foreground">156</p>
                <p className="text-muted-foreground">Abonnements</p>
              </div>
            </div>

            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90">
              <Link href="/profil">Voir mon profil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Niveau 12</p>
              <p className="text-xs text-muted-foreground">2,450 / 3,000 XP</p>
            </div>
          </div>
          <Progress value={82} className="h-2" />
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Zap className="w-3 h-3 mr-1" />
              Streak 7 jours
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
