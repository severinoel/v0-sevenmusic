"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Clock, Users, Star, Play, BookOpen } from "lucide-react"
import Link from "next/link"

const categories = ["Tous", "Guitare", "Piano", "Batterie", "Basse", "Voix", "Théorie", "Production"]

export function CourseGrid() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      const { data, error } = await supabase
        .from("learning_modules")
        .select(`
          *,
          profiles!learning_modules_instructor_id_fkey (display_name, avatar_url)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      setCourses(data || [])
    } catch (error) {
      console.error("Error loading courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === "Tous" || course.instruments?.includes(activeCategory)
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Chargement des cours...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Nos cours</h2>
            <p className="text-muted-foreground">Découvrez notre catalogue de cours professionnels</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un cours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                Aucun cours trouvé. Utilisez le panneau d'administration pour en ajouter.
              </p>
              <Button asChild className="mt-4">
                <Link href="/admin/gestion">Gérer les cours</Link>
              </Button>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail_url || "/placeholder.svg?height=200&width=400&query=music+course"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="rounded-full bg-primary/90" asChild>
                      <Link href={`/ecole/cours/${course.id}`}>
                        <Play className="w-6 h-6 mr-2" />
                        Commencer
                      </Link>
                    </Button>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-black/70 text-white">{course.level}</Badge>
                  {course.price === 0 && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">Gratuit</Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-foreground">{course.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={course.profiles?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback>{course.profiles?.display_name?.charAt(0) || "P"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {course.profiles?.display_name || "Instructeur"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.estimated_duration_weeks} semaines
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lesson_count || 0} leçons
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{course.average_rating?.toFixed(1) || "N/A"}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({course.rating_count || 0} avis)</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1 ml-auto">
                      <Users className="w-4 h-4" />
                      {course.enrollment_count || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">
                      {course.price === 0 ? "Gratuit" : `${course.price}€`}
                    </span>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href={`/ecole/cours/${course.id}`}>Commencer</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
