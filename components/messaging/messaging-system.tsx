"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Users,
  Plus,
  Check,
  CheckCheck,
  Music,
  ImageIcon,
  Mic,
} from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "audio" | "image" | "music"
  read: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  online: boolean
  isGroup: boolean
  participants?: number
}

export function MessagingSystem() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Marie Dupont",
      avatar: "/woman-instructor.png",
      lastMessage: "Super progression sur le morceau !",
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unreadCount: 2,
      online: true,
      isGroup: false,
    },
    {
      id: "2",
      name: "Groupe Jazz Intermédiaire",
      avatar: "/jam-session-musicians.jpg",
      lastMessage: "Jean: La prochaine jam est confirmée",
      lastMessageTime: new Date(Date.now() - 30 * 60000),
      unreadCount: 5,
      online: false,
      isGroup: true,
      participants: 8,
    },
    {
      id: "3",
      name: "Jean Petit",
      avatar: "/man-piano-instructor.jpg",
      lastMessage: "Tu as essayé le nouveau preset ?",
      lastMessageTime: new Date(Date.now() - 2 * 3600000),
      unreadCount: 0,
      online: true,
      isGroup: false,
    },
    {
      id: "4",
      name: "Sophie Laurent",
      avatar: "/woman-theory-instructor.jpg",
      lastMessage: "Merci pour le cours !",
      lastMessageTime: new Date(Date.now() - 24 * 3600000),
      unreadCount: 0,
      online: false,
      isGroup: false,
    },
    {
      id: "5",
      name: "Collaboration Rock",
      avatar: "/man-guitarist.jpg",
      lastMessage: "Pierre: J'ai uploadé ma partie",
      lastMessageTime: new Date(Date.now() - 48 * 3600000),
      unreadCount: 3,
      online: false,
      isGroup: true,
      participants: 4,
    },
  ]

  const messages: Message[] = [
    {
      id: "1",
      senderId: "other",
      content: "Salut ! Tu as pu travailler sur le morceau qu'on a vu en cours ?",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
      read: true,
    },
    {
      id: "2",
      senderId: "me",
      content: "Oui j'ai bien avancé ! Le passage en Am7 est encore un peu difficile",
      timestamp: new Date(Date.now() - 3500000),
      type: "text",
      read: true,
    },
    {
      id: "3",
      senderId: "other",
      content: "C'est normal, c'est un accord complexe. Essaie de décomposer le mouvement",
      timestamp: new Date(Date.now() - 3400000),
      type: "text",
      read: true,
    },
    {
      id: "4",
      senderId: "me",
      content: "Voici mon enregistrement de la session d'aujourd'hui",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
      read: true,
    },
    {
      id: "5",
      senderId: "me",
      content: "practice_session_dec7.mp3",
      timestamp: new Date(Date.now() - 1795000),
      type: "audio",
      read: true,
    },
    {
      id: "6",
      senderId: "other",
      content: "Super progression sur le morceau ! 🎸",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
      read: false,
    },
    {
      id: "7",
      senderId: "other",
      content: "Tu as vraiment amélioré ta précision rythmique. Continue comme ça !",
      timestamp: new Date(Date.now() - 290000),
      type: "text",
      read: false,
    },
  ]

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return "À l'instant"
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min`
    if (diff < 86400000) return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    // Envoyer le message via Supabase Realtime
    console.log("Sending message:", message)
    setMessage("")
  }

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle conversation
        </Button>
      </div>

      <Card className="h-[calc(100vh-200px)] overflow-hidden">
        <div className="flex h-full">
          {/* Liste des conversations */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 mx-4 mt-2">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="groups">Groupes</TabsTrigger>
                <TabsTrigger value="unread">Non lus</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conv.id
                            ? "bg-orange-500/10 border border-orange-500/20"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={conv.name} />
                            <AvatarFallback>
                              {conv.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conv.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                          {conv.isGroup && (
                            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center">
                              <Users className="h-3 w-3 text-white" />
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{conv.name}</span>
                            <span className="text-xs text-muted-foreground">{formatTime(conv.lastMessageTime)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground truncate">{conv.lastMessage}</span>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-orange-500 text-white text-xs h-5 min-w-[20px] flex items-center justify-center">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="groups" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {conversations
                      .filter((c) => c.isGroup)
                      .map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedConversation === conv.id
                              ? "bg-orange-500/10 border border-orange-500/20"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={conv.name} />
                              <AvatarFallback>
                                {conv.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center">
                              <Users className="h-3 w-3 text-white" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">{conv.name}</span>
                              <span className="text-xs text-muted-foreground">{formatTime(conv.lastMessageTime)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground truncate">{conv.lastMessage}</span>
                              {conv.unreadCount > 0 && (
                                <Badge className="bg-orange-500 text-white text-xs">{conv.unreadCount}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="unread" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {conversations
                      .filter((c) => c.unreadCount > 0)
                      .map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedConversation === conv.id
                              ? "bg-orange-500/10 border border-orange-500/20"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <Avatar>
                            <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={conv.name} />
                            <AvatarFallback>
                              {conv.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">{conv.name}</span>
                              <Badge className="bg-orange-500 text-white text-xs">{conv.unreadCount}</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground truncate block">{conv.lastMessage}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Zone de chat */}
          {selectedConv ? (
            <div className="flex-1 flex flex-col">
              {/* Header du chat */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} alt={selectedConv.name} />
                      <AvatarFallback>
                        {selectedConv.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConv.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{selectedConv.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedConv.online ? "En ligne" : "Hors ligne"}
                      {selectedConv.isGroup && ` • ${selectedConv.participants} participants`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.senderId === "me" ? "bg-orange-500 text-white" : "bg-muted"
                        }`}
                      >
                        {msg.type === "audio" ? (
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={msg.senderId === "me" ? "text-white hover:bg-orange-600" : ""}
                            >
                              <Music className="h-4 w-4" />
                            </Button>
                            <div className="flex-1">
                              <div className="h-8 bg-white/20 rounded flex items-center px-2">
                                <div className="flex-1 h-1 bg-white/40 rounded">
                                  <div className="h-1 w-1/3 bg-white rounded" />
                                </div>
                              </div>
                              <div className="text-xs mt-1 opacity-80">0:45</div>
                            </div>
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                            msg.senderId === "me" ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          <span>{formatTime(msg.timestamp)}</span>
                          {msg.senderId === "me" &&
                            (msg.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input zone */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Music className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Écrivez votre message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Sélectionnez une conversation pour commencer
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
