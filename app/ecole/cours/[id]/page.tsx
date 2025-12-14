import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InteractiveCoursePlayer } from "@/components/course/interactive-course-player"
import { notFound } from "next/navigation"

// Cours de démonstration pour commencer
const demoCourses = [
  {
    id: "1",
    title: "Guitare Acoustique - Bases",
    description:
      "Apprenez les fondamentaux de la guitare acoustique avec des exercices pratiques et des chansons populaires.",
    instructor: { name: "Marie Dupont", avatar: "/woman-instructor.png", bio: "Professeur de guitare depuis 15 ans" },
    level: "Débutant",
    duration: "8h 30min",
    thumbnail: "/acoustic-guitar-course.jpg",
    category: "Guitare",
    lessons: [
      { id: "1-1", title: "Introduction à la guitare", duration: "10:30", videoUrl: "", completed: false },
      { id: "1-2", title: "Posture et tenue de la guitare", duration: "15:20", videoUrl: "", completed: false },
      { id: "1-3", title: "Les premiers accords : Mi mineur", duration: "20:15", videoUrl: "", completed: false },
      { id: "1-4", title: "L'accord de La mineur", duration: "18:45", videoUrl: "", completed: false },
      { id: "1-5", title: "Enchaîner Em et Am", duration: "25:00", videoUrl: "", completed: false },
      { id: "1-6", title: "L'accord de Do majeur", duration: "22:30", videoUrl: "", completed: false },
      { id: "1-7", title: "L'accord de Sol majeur", duration: "20:00", videoUrl: "", completed: false },
      {
        id: "1-8",
        title: "Premier morceau : Knockin on Heavens Door",
        duration: "35:00",
        videoUrl: "",
        completed: false,
      },
    ],
    resources: [
      { name: "Diagrammes d'accords PDF", type: "pdf", url: "#" },
      { name: "Backing tracks", type: "audio", url: "#" },
      { name: "Tablatures", type: "pdf", url: "#" },
    ],
  },
  {
    id: "2",
    title: "Piano Jazz - Improvisation",
    description:
      "Maîtrisez l'art de l'improvisation jazz au piano avec des techniques avancées et l'étude des standards.",
    instructor: { name: "Thomas Martin", avatar: "/man-piano-instructor.jpg", bio: "Pianiste jazz professionnel" },
    level: "Avancé",
    duration: "12h 45min",
    thumbnail: "/jazz-piano-course.jpg",
    category: "Piano",
    lessons: [
      { id: "2-1", title: "Introduction au jazz", duration: "15:00", videoUrl: "", completed: false },
      { id: "2-2", title: "Les gammes jazz essentielles", duration: "25:00", videoUrl: "", completed: false },
      { id: "2-3", title: "Accords de 7ème", duration: "30:00", videoUrl: "", completed: false },
      { id: "2-4", title: "Le II-V-I majeur", duration: "35:00", videoUrl: "", completed: false },
      { id: "2-5", title: "Le II-V-I mineur", duration: "30:00", videoUrl: "", completed: false },
      { id: "2-6", title: "Improvisation sur Autumn Leaves", duration: "45:00", videoUrl: "", completed: false },
    ],
    resources: [
      { name: "Real Book PDF", type: "pdf", url: "#" },
      { name: "Backing tracks jazz", type: "audio", url: "#" },
    ],
  },
  {
    id: "3",
    title: "Théorie Musicale Complète",
    description: "Un cours complet de théorie musicale du débutant à l'avancé.",
    instructor: { name: "Sophie Laurent", avatar: "/woman-theory-instructor.jpg", bio: "Docteur en musicologie" },
    level: "Tous niveaux",
    duration: "15h 20min",
    thumbnail: "/music-theory-course.jpg",
    category: "Théorie",
    lessons: [
      { id: "3-1", title: "Les notes de musique", duration: "20:00", videoUrl: "", completed: false },
      { id: "3-2", title: "Les intervalles", duration: "25:00", videoUrl: "", completed: false },
      { id: "3-3", title: "Les gammes majeures", duration: "30:00", videoUrl: "", completed: false },
      { id: "3-4", title: "Les gammes mineures", duration: "30:00", videoUrl: "", completed: false },
      { id: "3-5", title: "Construction des accords", duration: "35:00", videoUrl: "", completed: false },
    ],
    resources: [
      { name: "Exercices de solfège", type: "pdf", url: "#" },
      { name: "Quiz interactifs", type: "link", url: "/quiz" },
    ],
  },
  {
    id: "4",
    title: "Batterie Rock",
    description: "Apprenez les techniques de batterie rock avec des grooves et des fills emblématiques.",
    instructor: { name: "Alex Drums", avatar: "/man-drummer.jpg", bio: "Batteur professionnel" },
    level: "Intermédiaire",
    duration: "10h 15min",
    thumbnail: "/rock-drums-course.jpg",
    category: "Batterie",
    lessons: [
      { id: "4-1", title: "Les bases du groove rock", duration: "20:00", videoUrl: "", completed: false },
      { id: "4-2", title: "Fills de base", duration: "25:00", videoUrl: "", completed: false },
      { id: "4-3", title: "Le groove en double croche", duration: "30:00", videoUrl: "", completed: false },
    ],
    resources: [],
  },
  {
    id: "5",
    title: "Technique Vocale",
    description: "Développez votre voix avec des exercices de respiration et de technique vocale.",
    instructor: { name: "Lisa Voice", avatar: "/woman-singer-instructor.jpg", bio: "Coach vocal certifiée" },
    level: "Débutant",
    duration: "6h 40min",
    thumbnail: "/vocal-technique-course.jpg",
    category: "Voix",
    lessons: [
      { id: "5-1", title: "La respiration diaphragmatique", duration: "15:00", videoUrl: "", completed: false },
      { id: "5-2", title: "Échauffement vocal", duration: "20:00", videoUrl: "", completed: false },
      { id: "5-3", title: "Travailler la justesse", duration: "25:00", videoUrl: "", completed: false },
    ],
    resources: [],
  },
  {
    id: "6",
    title: "Production Musicale",
    description: "Apprenez à produire de la musique professionnelle avec les DAW modernes.",
    instructor: { name: "Marc Producer", avatar: "/man-producer.jpg", bio: "Producteur multi-platine" },
    level: "Intermédiaire",
    duration: "20h 00min",
    thumbnail: "/music-production-course.jpg",
    category: "Production",
    lessons: [
      { id: "6-1", title: "Introduction aux DAW", duration: "30:00", videoUrl: "", completed: false },
      { id: "6-2", title: "Création de beats", duration: "45:00", videoUrl: "", completed: false },
      { id: "6-3", title: "Enregistrement audio", duration: "40:00", videoUrl: "", completed: false },
      { id: "6-4", title: "Mixage de base", duration: "50:00", videoUrl: "", completed: false },
    ],
    resources: [],
  },
]

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Essayer de récupérer depuis la base de données
  const { data: dbCourse } = await supabase.from("courses").select("*").eq("id", id).single()

  // Sinon utiliser les cours de démonstration
  const course = dbCourse || demoCourses.find((c) => c.id === id)

  if (!course) {
    notFound()
  }

  // Récupérer l'utilisateur pour la progression
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let enrollment = null
  if (user) {
    const { data } = await supabase.from("enrollments").select("*").eq("user_id", user.id).eq("course_id", id).single()
    enrollment = data
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <InteractiveCoursePlayer course={course} enrollment={enrollment} isLoggedIn={!!user} />
      </main>
      <Footer />
    </div>
  )
}
