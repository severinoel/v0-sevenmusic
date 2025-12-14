"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Profile } from "@/lib/types/database"
import {
  LayoutDashboard,
  Music,
  GraduationCap,
  Users,
  Sliders,
  Store,
  Cloud,
  Settings,
  Trophy,
  Wallet,
  Bell,
  HelpCircle,
  BarChart3,
  Calendar,
  MessageSquare,
  Coins,
} from "lucide-react"

interface DashboardSidebarProps {
  profile: Profile | null
}

const menuItems = [
  { name: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ma pratique", href: "/practice", icon: Music },
  { name: "Mes cours", href: "/ecole", icon: GraduationCap },
  { name: "Social", href: "/social", icon: Users },
  { name: "Mes effets", href: "/effets", icon: Sliders },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Mon cloud", href: "/cloud", icon: Cloud },
  { name: "Statistiques", href: "/dashboard/stats", icon: BarChart3 },
  { name: "Calendrier", href: "/dashboard/calendrier", icon: Calendar },
  { name: "Messages", href: "/social/messages", icon: MessageSquare },
  { name: "Gamification", href: "/gamification", icon: Trophy },
  { name: "Portefeuille", href: "/boutique", icon: Wallet },
]

const bottomItems = [
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Paramètres", href: "/parametres", icon: Settings },
  { name: "Aide", href: "/faq", icon: HelpCircle },
]

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const pathname = usePathname()

  const displayName = profile?.display_name || "Utilisateur"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const xpForNextLevel = (profile?.level || 1) * 1000
  const currentXpInLevel = (profile?.xp_points || 0) % 1000
  const levelProgress = (currentXpInLevel / 1000) * 100

  return (
    <aside className="fixed left-0 top-16 lg:top-20 w-64 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-card border-r border-border hidden lg:block overflow-y-auto">
      <div className="p-4 space-y-6">
        {profile && (
          <div className="p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">@{profile.username}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Niveau {profile.level}</span>
                <span className="text-muted-foreground">{currentXpInLevel}/1000 XP</span>
              </div>
              <Progress value={levelProgress} className="h-1.5" />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="w-3 h-3 text-amber-500" />
                <span>{profile.severino_coins?.toLocaleString() || 0}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {profile.subscription_tier === "free"
                  ? "Gratuit"
                  : profile.subscription_tier === "premium"
                    ? "Premium"
                    : profile.subscription_tier === "pro"
                      ? "Pro"
                      : "Studio"}
              </Badge>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-border">
          <nav className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
