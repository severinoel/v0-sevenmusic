"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Video,
  Music,
  FileText,
  Upload,
  Download,
  FolderOpen,
  Lock,
  CheckCircle,
  Users,
  Star,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  HelpCircle,
} from "lucide-react"

const modules = [
  {
    id: "MOD-001",
    title: "Bases de la guitare acoustique",
    level: "Débutant",
    type: "payant",
    price: 29.99,
    duration: "8 semaines",
    students: 1245,
    rating: 4.8,
    completion: 68,
    content: { videos: 12, exercises: 24, quizzes: 6, projects: 2 },
    status: "published",
  },
  {
    id: "MOD-002",
    title: "Accords Jazz et voicings",
    level: "Intermédiaire",
    type: "premium",
    price: 49.99,
    duration: "12 semaines",
    students: 856,
    rating: 4.9,
    completion: 72,
    content: { videos: 18, exercises: 36, quizzes: 9, projects: 4 },
    status: "published",
  },
  {
    id: "MOD-003",
    title: "Théorie musicale fondamentale",
    level: "Débutant",
    type: "gratuit",
    price: 0,
    duration: "4 semaines",
    students: 3421,
    rating: 4.7,
    completion: 82,
    content: { videos: 8, exercises: 16, quizzes: 4, projects: 1 },
    status: "published",
  },
  {
    id: "MOD-004",
    title: "Improvisation Blues",
    level: "Avancé",
    type: "payant",
    price: 39.99,
    duration: "10 semaines",
    students: 534,
    rating: 4.9,
    completion: 65,
    content: { videos: 15, exercises: 30, quizzes: 8, projects: 3 },
    status: "draft",
  },
]

const casierFolders = [
  { name: "1_Cours", files: 12, size: "1.2 GB", icon: Video },
  { name: "2_Exercices", files: 24, size: "450 MB", icon: Music },
  { name: "3_Corriges", files: 24, size: "180 MB", icon: CheckCircle },
  { name: "4_Ressources", files: 8, size: "320 MB", icon: FileText },
  { name: "5_Travaux_eleves", files: 156, size: "2.8 GB", icon: Upload },
  { name: "6_Evaluations", files: 6, size: "45 MB", icon: Star },
]

const recentFiles = [
  { name: "Cours_07_Accords_Barres.mp4", type: "video", size: "245 MB", date: "Il y a 2h", author: "Prof. Martin" },
  { name: "Exercice_15_Arpèges.pdf", type: "pdf", size: "2.4 MB", date: "Il y a 5h", author: "Prof. Martin" },
  { name: "Quiz_Theorie_03.json", type: "quiz", size: "45 KB", date: "Il y a 1j", author: "Système" },
  { name: "Projet_Final_Guidelines.docx", type: "doc", size: "1.2 MB", date: "Il y a 2j", author: "Prof. Martin" },
]

export function ModulesSystem() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("modules")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-indigo-500/10 via-background to-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Modules Pédagogiques</h1>
                <p className="text-muted-foreground">Gestion des cours et casiers de dépôt</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4" />
                Nouveau module
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="modules" className="gap-2 data-[state=active]:bg-background">
              <BookOpen className="w-4 h-4" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="casiers" className="gap-2 data-[state=active]:bg-background">
              <FolderOpen className="w-4 h-4" />
              Casiers
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2 data-[state=active]:bg-background">
              <Edit className="w-4 h-4" />
              Éditeur
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Rechercher un module..." className="pl-10" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </Button>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`border-border hover:border-primary/50 transition-colors cursor-pointer ${
                    selectedModule === module.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={
                              module.type === "gratuit"
                                ? "secondary"
                                : module.type === "premium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {module.type === "gratuit"
                              ? "Gratuit"
                              : module.type === "premium"
                                ? "Premium"
                                : `€${module.price}`}
                          </Badge>
                          <Badge variant="outline">{module.level}</Badge>
                          {module.status === "draft" && <Badge variant="secondary">Brouillon</Badge>}
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {module.id} • {module.duration}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-primary">{module.content.videos}</p>
                        <p className="text-xs text-muted-foreground">Vidéos</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-500">{module.content.exercises}</p>
                        <p className="text-xs text-muted-foreground">Exercices</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-amber-500">{module.content.quizzes}</p>
                        <p className="text-xs text-muted-foreground">Quiz</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-500">{module.content.projects}</p>
                        <p className="text-xs text-muted-foreground">Projets</p>
                      </div>
                    </div>

                    {/* Progress & Rating */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {module.students} élèves
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          {module.rating}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Taux de complétion</span>
                          <span>{module.completion}%</span>
                        </div>
                        <Progress value={module.completion} className="h-1.5" />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                        <Eye className="w-4 h-4" />
                        Aperçu
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                        <Edit className="w-4 h-4" />
                        Éditer
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <FolderOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Casiers Tab */}
          <TabsContent value="casiers" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Folder Structure */}
              <Card className="lg:col-span-1 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Casier: MOD-001</CardTitle>
                  <CardDescription>Bases de la guitare acoustique</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {casierFolders.map((folder, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                          <folder.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{folder.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {folder.files} fichiers • {folder.size}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Files */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Fichiers récents</CardTitle>
                    <CardDescription>Dernières modifications</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Upload className="w-4 h-4" />
                    Uploader
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            file.type === "video"
                              ? "bg-red-500/20 text-red-500"
                              : file.type === "pdf"
                                ? "bg-blue-500/20 text-blue-500"
                                : file.type === "quiz"
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-amber-500/20 text-amber-500"
                          }`}
                        >
                          {file.type === "video" ? (
                            <Video className="w-5 h-5" />
                          ) : file.type === "pdf" ? (
                            <FileText className="w-5 h-5" />
                          ) : file.type === "quiz" ? (
                            <HelpCircle className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.author} • {file.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Permissions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Permissions du casier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Badge className="bg-purple-500">Professeur</Badge>
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Upload tous formats
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Organiser arborescence
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Corriger travaux
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Supprimer fichiers
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Badge className="bg-blue-500">Élève</Badge>
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Upload exercices
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Voir ses dépôts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Télécharger ressources
                      </li>
                      <li className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-500" /> Supprimer fichiers
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Badge className="bg-amber-500">Admin</Badge>
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Accès tous casiers
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Audit contenu
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Export masse
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Archivage
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Éditeur de module (WYSIWYG)</CardTitle>
                <CardDescription>Glissez-déposez les composants pour construire votre cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Components palette */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm">Composants</h3>
                    <div className="space-y-2">
                      {[
                        { icon: FileText, label: "Texte enrichi", color: "bg-blue-500/20 text-blue-500" },
                        { icon: Video, label: "Vidéo", color: "bg-red-500/20 text-red-500" },
                        { icon: Music, label: "Audio", color: "bg-green-500/20 text-green-500" },
                        { icon: BookOpen, label: "Partition interactive", color: "bg-purple-500/20 text-purple-500" },
                        { icon: HelpCircle, label: "Quiz", color: "bg-amber-500/20 text-amber-500" },
                        { icon: Download, label: "Document", color: "bg-cyan-500/20 text-cyan-500" },
                      ].map((comp, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border hover:border-primary cursor-move"
                        >
                          <div className={`w-8 h-8 rounded-lg ${comp.color} flex items-center justify-center`}>
                            <comp.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm">{comp.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canvas */}
                  <div className="lg:col-span-3 min-h-96 border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Glissez des composants ici</p>
                      <p className="text-sm">pour construire votre module</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
