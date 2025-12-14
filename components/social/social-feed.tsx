"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  Music,
  ImageIcon,
  Video,
  Mic,
  Send,
} from "lucide-react"

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Marie Dupont",
      username: "marie_guitar",
      avatar: "/woman-guitarist.jpg",
      verified: true,
      instrument: "Guitare",
    },
    content: "Nouvelle composition en Am ! 🎸 Qu'en pensez-vous ?",
    media: { type: "audio", url: "/audio/composition.mp3", duration: "3:24", bpm: 120, key: "Am" },
    tags: ["#guitare", "#composition", "#acoustique"],
    stats: { likes: 234, comments: 45, shares: 12 },
    timestamp: "Il y a 2h",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    author: {
      name: "Thomas Martin",
      username: "thomas_piano",
      avatar: "/man-pianist.jpg",
      verified: false,
      instrument: "Piano",
    },
    content:
      "Session de jam incroyable hier soir avec @marie_guitar et @alex_drums ! Live disponible dans mes archives.",
    media: { type: "video", url: "/video/jam.mp4", thumbnail: "/jam-session-musicians.jpg" },
    tags: ["#jam", "#live", "#collaboration"],
    stats: { likes: 567, comments: 89, shares: 34 },
    timestamp: "Il y a 5h",
    liked: true,
    saved: true,
  },
  {
    id: 3,
    author: {
      name: "Sophie Laurent",
      username: "sophie_vocal",
      avatar: "/woman-singer.jpg",
      verified: true,
      instrument: "Voix",
    },
    content: "Mon parcours de débutante à chanteuse professionnelle. Un an de progression grâce à Séverino El !",
    media: { type: "image", url: "/singer-on-stage-concert.jpg" },
    tags: ["#progression", "#motivation", "#vocal"],
    stats: { likes: 1234, comments: 156, shares: 78 },
    timestamp: "Il y a 1j",
    liked: false,
    saved: false,
  },
]

export function SocialFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("pour-vous")

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              stats: { ...post.stats, likes: post.liked ? post.stats.likes - 1 : post.stats.likes + 1 },
            }
          : post,
      ),
    )
  }

  const handleSave = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, saved: !post.saved } : post)))
  }

  return (
    <div className="space-y-6">
      {/* Create post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/user-avatar-musician.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Partagez votre musique, vos progrès, vos inspirations..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none border-none bg-secondary/50 focus-visible:ring-1"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Music className="w-4 h-4 mr-1" />
                    Audio
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Video className="w-4 h-4 mr-1" />
                    Vidéo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Mic className="w-4 h-4 mr-1" />
                    Live
                  </Button>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-1" />
                  Publier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0">
          <TabsTrigger
            value="pour-vous"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
          >
            Pour vous
          </TabsTrigger>
          <TabsTrigger
            value="abonnements"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
          >
            Abonnements
          </TabsTrigger>
          <TabsTrigger
            value="tendances"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
          >
            Tendances
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-foreground">{post.author.name}</span>
                      {post.author.verified && (
                        <Badge variant="secondary" className="h-4 w-4 p-0 flex items-center justify-center bg-primary">
                          <span className="text-[10px] text-primary-foreground">✓</span>
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>@{post.author.username}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 space-y-3">
              <p className="text-foreground">{post.content}</p>

              {/* Media */}
              {post.media.type === "audio" && (
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <Button size="icon" className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shrink-0">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </Button>
                    <div className="flex-1">
                      <div className="h-12 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 rounded-lg flex items-center">
                        <div className="flex items-end gap-0.5 h-8 px-2">
                          {Array.from({ length: 50 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-primary rounded-full"
                              style={{ height: `${Math.sin(i * 0.3) * 50 + 50}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-muted-foreground">{post.media.duration}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {post.media.bpm} BPM
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.media.key}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {post.media.type === "video" && (
                <div className="relative rounded-xl overflow-hidden aspect-video bg-secondary">
                  <img
                    src={post.media.thumbnail || "/placeholder.svg"}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button size="icon" className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {post.media.type === "image" && (
                <div className="rounded-xl overflow-hidden">
                  <img src={post.media.url || "/placeholder.svg"} alt="Post media" className="w-full object-cover" />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.liked ? "text-red-500" : "text-muted-foreground"}
                  >
                    <Heart className={`w-5 h-5 mr-1 ${post.liked ? "fill-current" : ""}`} />
                    {post.stats.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    {post.stats.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-5 h-5 mr-1" />
                    {post.stats.shares}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave(post.id)}
                  className={post.saved ? "text-primary" : "text-muted-foreground"}
                >
                  <Bookmark className={`w-5 h-5 ${post.saved ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
