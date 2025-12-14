import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SchoolHero } from "@/components/school/school-hero"
import { CourseGrid } from "@/components/school/course-grid"
import { LearningPath } from "@/components/school/learning-path"
import { AICoachPreview } from "@/components/school/ai-coach-preview"

export default function SchoolPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <SchoolHero />
        <LearningPath />
        <CourseGrid />
        <AICoachPreview />
      </main>
      <Footer />
    </div>
  )
}
