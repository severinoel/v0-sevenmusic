import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeacherApplicationForm } from "@/components/teacher/teacher-application-form"

export const metadata = {
  title: "Devenir Professeur - Séverino El",
  description: "Rejoignez l'équipe pédagogique Séverino El et partagez votre passion musicale.",
}

export default function TeacherApplicationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <TeacherApplicationForm />
      </main>
      <Footer />
    </div>
  )
}
