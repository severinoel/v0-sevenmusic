"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Music,
  GraduationCap,
  Users,
  Store,
  Cloud,
  Menu,
  ChevronDown,
  Headphones,
  BookOpen,
  Video,
  MessageCircle,
  Sliders,
  Moon,
  Sun,
  Wand2,
  Brain,
  Gem,
  Calendar,
  BarChart3,
  Baby,
  Glasses,
  UserPlus,
  Shield,
  Bell,
  FolderOpen,
  FileQuestion,
  ClipboardList,
  LayoutDashboard,
  Layers,
} from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { useUser } from "@/hooks/use-user"

const navigation = [
  {
    name: "École",
    href: "/ecole",
    icon: GraduationCap,
    submenu: [
      { name: "Cours vidéo", href: "/ecole", icon: Video },
      { name: "Modules pédagogiques", href: "/modules", icon: Layers },
      { name: "Quiz & Évaluations", href: "/quiz", icon: FileQuestion },
      { name: "Coach IA", href: "/ai-coach", icon: Brain },
      { name: "Casiers pédagogiques", href: "/casiers", icon: FolderOpen },
      { name: "Kids Academy", href: "/kids", icon: Baby },
      { name: "Devenir professeur", href: "/devenir-professeur", icon: UserPlus },
    ],
  },
  {
    name: "Social",
    href: "/social",
    icon: Users,
    submenu: [
      { name: "Feed musical", href: "/social", icon: Music },
      { name: "Jam Sessions", href: "/jam", icon: Users },
      { name: "Lives", href: "/live", icon: Video },
      { name: "Messages", href: "/messages", icon: MessageCircle },
    ],
  },
  {
    name: "Création",
    href: "/effets",
    icon: Sliders,
    submenu: [
      { name: "Pédale virtuelle", href: "/effets", icon: Sliders },
      { name: "Chord Finder", href: "/chord-finder", icon: Headphones },
      { name: "AI Studio", href: "/studio", icon: Wand2 },
      { name: "AI Composer", href: "/composer", icon: Music },
      { name: "Expériences VR", href: "/vr", icon: Glasses },
    ],
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: Store,
    submenu: [
      { name: "Presets & Partitions", href: "/marketplace", icon: Store },
      { name: "NFT Exclusifs", href: "/nft", icon: Gem },
      { name: "Réserver un cours", href: "/booking", icon: Calendar },
    ],
  },
  {
    name: "Cloud",
    href: "/casiers",
    icon: Cloud,
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { user, loading } = useUser()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:animate-pulse transition-all">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Séverino<span className="text-primary">El</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 text-foreground/80 hover:text-foreground hover:bg-secondary"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link href={subitem.href} className="flex items-center gap-2">
                          <subitem.icon className="w-4 h-4" />
                          {subitem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="text-foreground/80 hover:text-foreground hover:bg-secondary"
                >
                  <Link href={item.href} className="flex items-center gap-1">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </Button>
              ),
            )}

            {/* Plus dropdown with admin and other links */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-foreground/80 hover:text-foreground hover:bg-secondary"
                >
                  <Shield className="w-4 h-4" />
                  Plus
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Mon tableau de bord
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/practice" className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4" />
                        Mes sessions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/admin/gestion" className="flex items-center gap-2 text-primary font-medium">
                    <Shield className="w-4 h-4" />
                    Gestion Administration
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Tableau de bord Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gamification" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Gamification
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/faq" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    FAQ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden sm:flex">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {user && (
              <Button variant="ghost" size="icon" className="hidden sm:flex relative" asChild>
                <Link href="/notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
              </Button>
            )}

            <div className="hidden sm:flex">
              <UserNav />
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Music className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">
                      Séverino<span className="text-primary">El</span>
                    </span>
                  </Link>

                  {/* User dashboard link if logged in */}
                  {user && (
                    <div className="border-b border-border pb-4">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span className="font-medium">Mon tableau de bord</span>
                      </Link>
                    </div>
                  )}

                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                        {item.submenu && (
                          <div className="ml-8 mt-1 flex flex-col gap-1">
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.name}
                                href={subitem.href}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <subitem.icon className="w-4 h-4" />
                                {subitem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Mobile extra links */}
                    <div className="border-t border-border pt-4 mt-2">
                      <Link
                        href="/admin/gestion"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium">Gestion Administration</span>
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium">Tableau de bord Admin</span>
                      </Link>
                      <Link
                        href="/gamification"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <span className="font-medium">Gamification</span>
                      </Link>
                      <Link
                        href="/evaluations"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <ClipboardList className="w-5 h-5 text-primary" />
                        <span className="font-medium">Évaluations</span>
                      </Link>
                      <Link
                        href="/faq"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="font-medium">FAQ</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="font-medium">Contact</span>
                      </Link>
                    </div>
                  </nav>

                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                    {user ? (
                      <div className="px-3">
                        <UserNav />
                      </div>
                    ) : (
                      <>
                        <Button variant="outline" asChild className="w-full bg-transparent">
                          <Link href="/connexion">Connexion</Link>
                        </Button>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                          <Link href="/inscription">Commencer gratuitement</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
