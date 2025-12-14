"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Settings, LogOut, Music, Trophy, Coins, BookOpen, LayoutDashboard } from "lucide-react"

export function UserNav() {
  const { user, profile, loading, signOut } = useUser()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return <Skeleton className="w-10 h-10 rounded-full" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/connexion">Connexion</Link>
        </Button>
        <Button asChild>
          <Link href="/inscription">S'inscrire</Link>
        </Button>
      </div>
    )
  }

  const initials = profile?.display_name
    ? profile.display_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.[0].toUpperCase() || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || ""} alt={profile?.display_name || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.display_name || "Utilisateur"}</p>
            <p className="text-xs leading-none text-muted-foreground">@{profile?.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Niveau {profile?.level || 1}</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Coins className="w-3 h-3" />
              {profile?.severino_coins || 0}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${(profile?.xp_points || 0) % 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{profile?.xp_points || 0} XP</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Tableau de bord
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profil" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/practice" className="cursor-pointer">
            <Music className="mr-2 h-4 w-4" />
            Mes pratiques
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/ecole" className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            Mes cours
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/gamification" className="cursor-pointer">
            <Trophy className="mr-2 h-4 w-4" />
            Badges & Défis
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/parametres" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
