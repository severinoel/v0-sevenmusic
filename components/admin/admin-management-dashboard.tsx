"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, Users, GraduationCap, BookOpen, UserCog } from "lucide-react"

type Professor = {
  id: string
  display_name: string
  email: string
  avatar_url: string | null
  bio: string | null
  instruments: any
  genres: any
  years_experience: number
  skill_level: string
}

type Course = {
  id: string
  title: string
  description: string
  price: number
  estimated_duration_weeks: number
  level: string
  instructor_id: string
  is_published: boolean
}

type Student = {
  id: string
  display_name: string
  email: string
  avatar_url: string | null
  skill_level: string
  xp_points: number
  level: number
  severino_coins: number
}

type Coordinator = {
  id: string
  user_id: string
  role: string
  department: string
  hierarchy_level: number
  display_name?: string
  email?: string
}

export function AdminManagementDashboard() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [coordinators, setCoordinators] = useState<Coordinator[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("professors")
  const { toast } = useToast()
  const supabase = createBrowserClient()

  // Load all data
  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const { data: profsData } = await supabase
        .from("profiles")
        .select("*")
        .gte("years_experience", 1)
        .order("created_at", { ascending: false })

      const { data: coursesData } = await supabase
        .from("learning_modules")
        .select("*")
        .order("created_at", { ascending: false })

      const { data: studentsData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      const { data: coordsData } = await supabase
        .from("admin_roles")
        .select(`
          *,
          profiles!admin_roles_user_id_fkey (display_name, username)
        `)
        .order("hierarchy_level", { ascending: true })

      setProfessors(profsData || [])
      setCourses(coursesData || [])
      setStudents(studentsData || [])
      setCoordinators(coordsData || [])
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function addProfessor(data: any) {
    try {
      const { error } = await supabase.from("profiles").insert([
        {
          username: data.username,
          display_name: data.display_name,
          bio: data.bio,
          instruments: data.instruments ? JSON.parse(data.instruments) : [],
          genres: data.genres ? JSON.parse(data.genres) : [],
          years_experience: Number.parseInt(data.years_experience),
          skill_level: data.skill_level,
          avatar_url: data.avatar_url || null,
        },
      ])

      if (error) throw error

      toast({
        title: "Succès",
        description: "Professeur ajouté avec succès",
      })
      loadData()
      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function updateProfessor(id: string, data: any) {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: data.display_name,
          bio: data.bio,
          instruments: data.instruments ? JSON.parse(data.instruments) : [],
          genres: data.genres ? JSON.parse(data.genres) : [],
          years_experience: Number.parseInt(data.years_experience),
          skill_level: data.skill_level,
          avatar_url: data.avatar_url || null,
        })
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Professeur modifié avec succès",
      })
      loadData()
      setDialogOpen(false)
      setEditingItem(null)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function deleteProfessor(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) return

    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Professeur supprimé avec succès",
      })
      loadData()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function addCourse(data: any) {
    try {
      const { error } = await supabase.from("learning_modules").insert([
        {
          title: data.title,
          description: data.description,
          price: Number.parseFloat(data.price),
          estimated_duration_weeks: Number.parseInt(data.estimated_duration_weeks),
          level: data.level,
          instructor_id: data.instructor_id,
          is_published: data.is_published === "true",
          module_code: `MOD-${Date.now()}`,
        },
      ])

      if (error) throw error

      toast({
        title: "Succès",
        description: "Cours ajouté avec succès",
      })
      loadData()
      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function updateCourse(id: string, data: any) {
    try {
      const { error } = await supabase
        .from("learning_modules")
        .update({
          title: data.title,
          description: data.description,
          price: Number.parseFloat(data.price),
          estimated_duration_weeks: Number.parseInt(data.estimated_duration_weeks),
          level: data.level,
          instructor_id: data.instructor_id,
          is_published: data.is_published === "true",
        })
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Cours modifié avec succès",
      })
      loadData()
      setDialogOpen(false)
      setEditingItem(null)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function deleteCourse(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) return

    try {
      const { error } = await supabase.from("learning_modules").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Cours supprimé avec succès",
      })
      loadData()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function addCoordinator(data: any) {
    try {
      const { error } = await supabase.from("admin_roles").insert([
        {
          user_id: data.user_id,
          role: data.role,
          department: data.department,
          hierarchy_level: Number.parseInt(data.hierarchy_level),
          permissions: { canManage: true },
        },
      ])

      if (error) throw error

      toast({
        title: "Succès",
        description: "Coordinateur ajouté avec succès",
      })
      loadData()
      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement des données...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Panneau d'Administration</h1>
        <p className="text-muted-foreground">Gérez les professeurs, cours, élèves et coordinateurs</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professeurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{professors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cours</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coordinateurs</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coordinators.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="professors">Professeurs</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="students">Élèves</TabsTrigger>
          <TabsTrigger value="coordinators">Coordinateurs</TabsTrigger>
        </TabsList>

        {/* PROFESSORS TAB */}
        <TabsContent value="professors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des Professeurs</h2>
            <Dialog open={dialogOpen && activeTab === "professors"} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingItem(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un professeur
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Modifier" : "Ajouter"} un professeur</DialogTitle>
                  <DialogDescription>Remplissez les informations du professeur</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const data = Object.fromEntries(formData)
                    if (editingItem) {
                      updateProfessor(editingItem.id, data)
                    } else {
                      addProfessor(data)
                    }
                  }}
                >
                  <div className="grid gap-4 py-4">
                    {!editingItem && (
                      <div className="grid gap-2">
                        <Label htmlFor="username">Nom d'utilisateur *</Label>
                        <Input id="username" name="username" required />
                      </div>
                    )}
                    <div className="grid gap-2">
                      <Label htmlFor="display_name">Nom complet *</Label>
                      <Input id="display_name" name="display_name" defaultValue={editingItem?.display_name} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea id="bio" name="bio" defaultValue={editingItem?.bio} rows={3} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instruments">Instruments (JSON array)</Label>
                      <Input
                        id="instruments"
                        name="instruments"
                        defaultValue={
                          editingItem?.instruments ? JSON.stringify(editingItem.instruments) : '["Guitare"]'
                        }
                        placeholder='["Guitare", "Piano"]'
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="genres">Genres (JSON array)</Label>
                      <Input
                        id="genres"
                        name="genres"
                        defaultValue={editingItem?.genres ? JSON.stringify(editingItem.genres) : '["Rock"]'}
                        placeholder='["Rock", "Jazz"]'
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="years_experience">Années d'expérience *</Label>
                      <Input
                        id="years_experience"
                        name="years_experience"
                        type="number"
                        defaultValue={editingItem?.years_experience || 1}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="skill_level">Niveau</Label>
                      <Select name="skill_level" defaultValue={editingItem?.skill_level || "Expert"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Débutant">Débutant</SelectItem>
                          <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                          <SelectItem value="Avancé">Avancé</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="avatar_url">URL de la photo</Label>
                      <Input id="avatar_url" name="avatar_url" type="url" defaultValue={editingItem?.avatar_url} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDialogOpen(false)
                        setEditingItem(null)
                      }}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">{editingItem ? "Modifier" : "Ajouter"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {professors.map((prof) => (
              <Card key={prof.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {prof.avatar_url ? (
                        <img
                          src={prof.avatar_url || "/placeholder.svg"}
                          alt={prof.display_name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{prof.display_name}</CardTitle>
                      <CardDescription>
                        {prof.skill_level} - {prof.years_experience} ans d'exp.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{prof.bio || "Aucune bio"}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(prof)
                        setDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteProfessor(prof.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* COURSES TAB */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des Cours</h2>
            <Dialog open={dialogOpen && activeTab === "courses"} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingItem(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un cours
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Modifier" : "Ajouter"} un cours</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const data = Object.fromEntries(formData)
                    if (editingItem) {
                      updateCourse(editingItem.id, data)
                    } else {
                      addCourse(data)
                    }
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Titre du cours *</Label>
                      <Input id="title" name="title" defaultValue={editingItem?.title} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingItem?.description}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Prix (€) *</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={editingItem?.price || 29.99}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="estimated_duration_weeks">Durée (semaines) *</Label>
                        <Input
                          id="estimated_duration_weeks"
                          name="estimated_duration_weeks"
                          type="number"
                          defaultValue={editingItem?.estimated_duration_weeks || 8}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="level">Niveau *</Label>
                      <Select name="level" defaultValue={editingItem?.level || "Débutant"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Débutant">Débutant</SelectItem>
                          <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                          <SelectItem value="Avancé">Avancé</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instructor_id">ID Professeur *</Label>
                      <Select name="instructor_id" defaultValue={editingItem?.instructor_id}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un professeur" />
                        </SelectTrigger>
                        <SelectContent>
                          {professors.map((prof) => (
                            <SelectItem key={prof.id} value={prof.id}>
                              {prof.display_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="is_published">Statut</Label>
                      <Select name="is_published" defaultValue={editingItem?.is_published ? "true" : "false"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Publié</SelectItem>
                          <SelectItem value="false">Brouillon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setDialogOpen(false)
                        setEditingItem(null)
                      }}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">{editingItem ? "Modifier" : "Ajouter"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>
                    {course.level} - {course.estimated_duration_weeks} semaines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold">{course.price}€</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${course.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {course.is_published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(course)
                        setDialogOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteCourse(course.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* STUDENTS TAB */}
        <TabsContent value="students" className="space-y-4">
          <h2 className="text-2xl font-bold">Gestion des Élèves</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {student.avatar_url ? (
                        <img
                          src={student.avatar_url || "/placeholder.svg"}
                          alt={student.display_name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{student.display_name}</CardTitle>
                      <CardDescription>
                        Niveau {student.level} - {student.xp_points} XP
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Niveau:</span>
                      <span className="font-medium">{student.skill_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coins:</span>
                      <span className="font-medium">{student.severino_coins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* COORDINATORS TAB */}
        <TabsContent value="coordinators" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion des Coordinateurs</h2>
            <Dialog open={dialogOpen && activeTab === "coordinators"} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un coordinateur
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un coordinateur</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const data = Object.fromEntries(formData)
                    addCoordinator(data)
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="user_id">ID Utilisateur *</Label>
                      <Select name="user_id" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un utilisateur" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.display_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rôle *</Label>
                      <Input id="role" name="role" placeholder="Ex: Coordinateur de niveau" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Département *</Label>
                      <Input id="department" name="department" placeholder="Ex: Guitare" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="hierarchy_level">Niveau hiérarchique (1-4) *</Label>
                      <Input
                        id="hierarchy_level"
                        name="hierarchy_level"
                        type="number"
                        min="1"
                        max="4"
                        defaultValue="3"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Ajouter</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {coordinators.map((coord) => (
              <Card key={coord.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{coord.role}</CardTitle>
                      <CardDescription>
                        {coord.department} - Niveau {coord.hierarchy_level}
                      </CardDescription>
                    </div>
                    <UserCog className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
