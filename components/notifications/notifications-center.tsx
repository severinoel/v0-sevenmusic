"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  BookOpen,
  Award,
  MessageSquare,
  Heart,
  AlertCircle,
  Trash2,
  Settings,
} from "lucide-react"

interface Notification {
  id: string
  type: "social" | "course" | "achievement" | "system" | "message"
  title: string
  description: string
  timestamp: Date
  read: boolean
  avatar?: string
  link?: string
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "social",
      title: "Marie Dupont a aimé votre publication",
      description: "Votre cover de 'Wonderwall' a reçu un like",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      avatar: "/woman-instructor.png",
    },
    {
      id: "2",
      type: "achievement",
      title: "Nouveau badge débloqué !",
      description: "Vous avez obtenu le badge '7 jours consécutifs'",
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
    },
    {
      id: "3",
      type: "course",
      title: "Nouveau cours disponible",
      description: "Le cours 'Maîtriser les arpèges' est maintenant disponible",
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: false,
    },
    {
      id: "4",
      type: "message",
      title: "Nouveau message de Jean Petit",
      description: "Tu as essayé le nouveau preset ?",
      timestamp: new Date(Date.now() - 4 * 3600000),
      read: true,
      avatar: "/man-piano-instructor.jpg",
    },
    {
      id: "5",
      type: "social",
      title: "Sophie Laurent vous suit",
      description: "Un nouveau follower vous a rejoint",
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: true,
      avatar: "/woman-theory-instructor.jpg",
    },
    {
      id: "6",
      type: "system",
      title: "Rappel: Session de pratique",
      description: "N'oubliez pas votre session quotidienne",
      timestamp: new Date(Date.now() - 48 * 3600000),
      read: true,
    },
  ])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return "À l'instant"
    if (diff < 3600000) return `Il y a ${Math.floor(diff / 60000)} min`
    if (diff < 86400000) return `Il y a ${Math.floor(diff / 3600000)} h`
    return `Il y a ${Math.floor(diff / 86400000)} j`
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "social":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "system":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Aucune notification non lue"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="all">
            Toutes
            {unreadCount > 0 && <Badge className="ml-2 bg-orange-500 text-white text-xs">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="course">Cours</TabsTrigger>
          <TabsTrigger value="achievement">Badges</TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        {["all", "social", "course", "achievement", "message", "system"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="divide-y">
                    {notifications
                      .filter((n) => tab === "all" || n.type === tab)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors ${
                            !notification.read ? "bg-orange-500/5" : ""
                          }`}
                        >
                          <div className="relative">
                            {notification.avatar ? (
                              <Avatar>
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                {getIcon(notification.type)}
                              </div>
                            )}
                            {!notification.read && (
                              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-orange-500" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={`text-sm ${!notification.read ? "font-semibold" : ""}`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatTime(notification.timestamp)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {notifications.filter((n) => tab === "all" || n.type === tab).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <BellOff className="h-12 w-12 mb-4" />
                        <p>Aucune notification</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
