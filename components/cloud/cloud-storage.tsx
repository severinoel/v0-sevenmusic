"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  Upload,
  FolderOpen,
  File,
  Music,
  Video,
  ImageIcon,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Search,
  Grid,
  List,
  Star,
  Lock,
  Globe,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const files = [
  { name: "Session Jazz - 12 Dec.wav", type: "audio", size: "125 MB", modified: "Il y a 2h", shared: false },
  { name: "Cover Hotel California.mp4", type: "video", size: "450 MB", modified: "Hier", shared: true },
  { name: "Preset Blues Crunch.severino", type: "preset", size: "2.4 KB", modified: "Il y a 3j", shared: false },
  { name: "Partition - Autumn Leaves.pdf", type: "document", size: "1.2 MB", modified: "Il y a 1 sem", shared: true },
  { name: "Photo studio.jpg", type: "image", size: "8.5 MB", modified: "Il y a 2 sem", shared: false },
  { name: "Backing Track Am Blues.mp3", type: "audio", size: "12 MB", modified: "Il y a 1 mois", shared: true },
]

const folders = [
  { name: "Mes enregistrements", items: 24, icon: Music },
  { name: "Projets en cours", items: 8, icon: FolderOpen },
  { name: "Presets favoris", items: 156, icon: Star },
  { name: "Partitions", items: 42, icon: File },
]

export function CloudStorage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const usedStorage = 12.5 // GB
  const totalStorage = 50 // GB
  const storagePercent = (usedStorage / totalStorage) * 100

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Music className="w-5 h-5 text-primary" />
      case "video":
        return <Video className="w-5 h-5 text-accent" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      case "preset":
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <File className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Cloud className="w-8 h-8 text-primary" />
              Mon Cloud Musical
            </h1>
            <p className="text-muted-foreground">Stockez, synchronisez et partagez vos créations musicales</p>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Uploader des fichiers
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Storage card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Espace utilisé</span>
                  <span className="text-sm text-muted-foreground">
                    {usedStorage} / {totalStorage} GB
                  </span>
                </div>
                <Progress value={storagePercent} className="h-2 mb-3" />
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Augmenter l'espace
                </Button>
              </CardContent>
            </Card>

            {/* Quick folders */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Accès rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <folder.icon className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{folder.name}</p>
                      <p className="text-xs text-muted-foreground">{folder.items} éléments</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Storage breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Répartition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Audio", size: "8.2 GB", percent: 65, color: "bg-primary" },
                  { type: "Vidéo", size: "3.1 GB", percent: 25, color: "bg-accent" },
                  { type: "Documents", size: "0.8 GB", percent: 7, color: "bg-green-500" },
                  { type: "Autres", size: "0.4 GB", percent: 3, color: "bg-muted" },
                ].map((item) => (
                  <div key={item.type} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.type}</span>
                      <span className="text-muted-foreground">{item.size}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">Tout</TabsTrigger>
                      <TabsTrigger value="audio">Audio</TabsTrigger>
                      <TabsTrigger value="video">Vidéo</TabsTrigger>
                      <TabsTrigger value="shared">Partagés</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Rechercher..." className="pl-9" />
                    </div>
                    <div className="flex border border-border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file) => (
                      <div
                        key={file.name}
                        className="group p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            {getFileIcon(file.type)}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <h4 className="font-medium text-sm text-foreground truncate mb-1">{file.name}</h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{file.size}</span>
                          <div className="flex items-center gap-1">
                            {file.shared ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {files.map((file) => (
                      <div
                        key={file.name}
                        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground truncate">{file.name}</h4>
                          <p className="text-xs text-muted-foreground">{file.modified}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{file.size}</span>
                          {file.shared && <Badge variant="secondary">Partagé</Badge>}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
