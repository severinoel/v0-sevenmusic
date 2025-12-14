"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Folder,
  File,
  FileText,
  FileAudio,
  FileVideo,
  ImageIcon,
  Upload,
  Download,
  Trash2,
  MoreVertical,
  Search,
  Grid,
  List,
  FolderPlus,
  Share2,
  Clock,
  User,
  Music,
  BookOpen,
  CheckCircle,
  Eye,
  Edit,
  Copy,
  Star,
  History,
  Filter,
  SortAsc,
  ChevronRight,
  Home,
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "pdf" | "audio" | "video" | "image" | "document" | "sheet"
  size?: string
  modifiedAt: string
  modifiedBy: string
  starred: boolean
  shared: boolean
  versions?: number
  path: string[]
}

const mockFolders = [
  { id: "1", name: "1_Cours", icon: BookOpen, color: "text-blue-500", count: 12 },
  { id: "2", name: "2_Exercices", icon: Music, color: "text-green-500", count: 24 },
  { id: "3", name: "3_Corrigés", icon: CheckCircle, color: "text-purple-500", count: 18 },
  { id: "4", name: "4_Ressources_complémentaires", icon: Folder, color: "text-orange-500", count: 8 },
  { id: "5", name: "5_Travaux_élèves", icon: User, color: "text-pink-500", count: 45 },
  { id: "6", name: "6_Évaluations", icon: FileText, color: "text-red-500", count: 6 },
]

const mockFiles: FileItem[] = [
  {
    id: "f1",
    name: "Cours_Accords_Majeurs.pdf",
    type: "pdf",
    size: "2.4 MB",
    modifiedAt: "Il y a 2 heures",
    modifiedBy: "Prof. Martin",
    starred: true,
    shared: true,
    versions: 3,
    path: ["Module_001", "1_Cours"],
  },
  {
    id: "f2",
    name: "Exercice_Gammes.mp3",
    type: "audio",
    size: "5.1 MB",
    modifiedAt: "Hier",
    modifiedBy: "Prof. Martin",
    starred: false,
    shared: true,
    versions: 1,
    path: ["Module_001", "2_Exercices"],
  },
  {
    id: "f3",
    name: "Tutoriel_Arpèges.mp4",
    type: "video",
    size: "45 MB",
    modifiedAt: "Il y a 3 jours",
    modifiedBy: "Prof. Martin",
    starred: true,
    shared: false,
    versions: 2,
    path: ["Module_001", "1_Cours"],
  },
  {
    id: "f4",
    name: "Partition_Canon_Pachelbel.pdf",
    type: "sheet",
    size: "1.2 MB",
    modifiedAt: "Il y a 1 semaine",
    modifiedBy: "Prof. Dubois",
    starred: false,
    shared: true,
    versions: 1,
    path: ["Module_001", "4_Ressources_complémentaires"],
  },
  {
    id: "f5",
    name: "Travail_Eleve_Sophie.mp3",
    type: "audio",
    size: "3.8 MB",
    modifiedAt: "Aujourd'hui",
    modifiedBy: "Sophie L.",
    starred: false,
    shared: false,
    versions: 1,
    path: ["Module_001", "5_Travaux_élèves"],
  },
]

const recentActivity = [
  { action: "upload", file: "Exercice_Rythme_3.pdf", user: "Prof. Martin", time: "Il y a 10 min" },
  { action: "comment", file: "Travail_Eleve_Sophie.mp3", user: "Prof. Martin", time: "Il y a 30 min" },
  { action: "download", file: "Cours_Accords_Majeurs.pdf", user: "Lucas D.", time: "Il y a 1h" },
  { action: "share", file: "Tutoriel_Arpèges.mp4", user: "Prof. Dubois", time: "Il y a 2h" },
  { action: "version", file: "Partition_Canon_Pachelbel.pdf", user: "Prof. Martin", time: "Il y a 3h" },
]

export function FileLockerSystem() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPath, setCurrentPath] = useState<string[]>(["Module_001"])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />
      case "audio":
        return <FileAudio className="w-8 h-8 text-green-500" />
      case "video":
        return <FileVideo className="w-8 h-8 text-blue-500" />
      case "image":
        return <ImageIcon className="w-8 h-8 text-purple-500" />
      case "sheet":
        return <Music className="w-8 h-8 text-orange-500" />
      case "folder":
        return <Folder className="w-8 h-8 text-yellow-500" />
      default:
        return <File className="w-8 h-8 text-muted-foreground" />
    }
  }

  const storageUsed = 2.4
  const storageTotal = 10
  const storagePercentage = (storageUsed / storageTotal) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Casiers Pédagogiques</h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos fichiers de cours, exercices et ressources pédagogiques
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <FolderPlus className="w-4 h-4" />
                    Nouveau dossier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau dossier</DialogTitle>
                    <DialogDescription>Entrez le nom du nouveau dossier</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="folderName">Nom du dossier</Label>
                      <Input id="folderName" placeholder="Mon nouveau dossier" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => setNewFolderDialogOpen(false)}>Créer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Upload className="w-4 h-4" />
                    Importer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Importer des fichiers</DialogTitle>
                    <DialogDescription>Glissez vos fichiers ou cliquez pour sélectionner</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Glissez vos fichiers ici ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-muted-foreground">PDF, MP3, MP4, WAV, PNG, JPG (max 100MB)</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label>Dossier de destination</Label>
                      <Input value={currentPath.join(" / ")} readOnly />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={() => setUploadDialogOpen(false)}>Importer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Storage */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Stockage</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={storagePercentage} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {storageUsed} GB utilisés sur {storageTotal} GB
                </p>
                <Button variant="link" className="px-0 text-xs mt-2">
                  Augmenter le stockage
                </Button>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Accès rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Favoris
                  <Badge variant="secondary" className="ml-auto">
                    4
                  </Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Récents
                  <Badge variant="secondary" className="ml-auto">
                    12
                  </Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                  <Share2 className="w-4 h-4 text-green-500" />
                  Partagés avec moi
                  <Badge variant="secondary" className="ml-auto">
                    8
                  </Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                  <Trash2 className="w-4 h-4 text-red-500" />
                  Corbeille
                </Button>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Activité récente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.slice(0, 4).map((activity, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {activity.action === "upload" && <Upload className="w-3 h-3" />}
                      {activity.action === "comment" && <Edit className="w-3 h-3" />}
                      {activity.action === "download" && <Download className="w-3 h-3" />}
                      {activity.action === "share" && <Share2 className="w-3 h-3" />}
                      {activity.action === "version" && <History className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">{activity.file}</p>
                      <p className="text-muted-foreground">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Breadcrumb & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Button variant="ghost" size="sm" className="gap-1 px-2">
                  <Home className="w-4 h-4" />
                </Button>
                {currentPath.map((path, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2"
                      onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                    >
                      {path}
                    </Button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-48"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SortAsc className="w-4 h-4" />
                </Button>
                <div className="border-l border-border pl-2 flex gap-1">
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

            {/* Folders */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Dossiers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mockFolders.map((folder) => (
                  <Card
                    key={folder.id}
                    className="border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setCurrentPath([...currentPath, folder.name])}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`${folder.color}`}>
                        <folder.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{folder.name}</p>
                        <p className="text-xs text-muted-foreground">{folder.count} fichiers</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Files */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Fichiers</h3>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockFiles.map((file) => (
                    <Card
                      key={file.id}
                      className={`border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-md ${
                        selectedFiles.includes(file.id) ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => {
                        setSelectedFiles((prev) =>
                          prev.includes(file.id) ? prev.filter((id) => id !== file.id) : [...prev, file.id],
                        )
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          {getFileIcon(file.type)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Aperçu
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Copier
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Renommer
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <History className="w-4 h-4 mr-2" />
                                Historique ({file.versions})
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="font-medium text-sm truncate mb-1">{file.name}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                          <div className="flex items-center gap-1">
                            {file.starred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                            {file.shared && <Share2 className="w-3 h-3 text-blue-500" />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border">
                  <div className="divide-y divide-border">
                    {mockFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center gap-4 p-4 hover:bg-secondary/50 cursor-pointer transition-colors ${
                          selectedFiles.includes(file.id) ? "bg-primary/10" : ""
                        }`}
                        onClick={() => {
                          setSelectedFiles((prev) =>
                            prev.includes(file.id) ? prev.filter((id) => id !== file.id) : [...prev, file.id],
                          )
                        }}
                      >
                        {getFileIcon(file.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.path.join(" / ")}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <span>{file.modifiedAt}</span>
                          <span>{file.modifiedBy}</span>
                          <div className="flex items-center gap-1">
                            {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                            {file.shared && <Share2 className="w-4 h-4 text-blue-500" />}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Aperçu
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Selected Actions Bar */}
            {selectedFiles.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background rounded-lg shadow-lg px-6 py-3 flex items-center gap-4">
                <span className="text-sm font-medium">{selectedFiles.length} fichier(s) sélectionné(s)</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-background hover:text-background/80">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button variant="ghost" size="sm" className="text-background hover:text-background/80">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="ghost" size="sm" className="text-background hover:text-background/80">
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-background hover:text-background/80"
                  onClick={() => setSelectedFiles([])}
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
