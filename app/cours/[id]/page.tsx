"use client"

import { InteractiveCoursePlayer } from "@/components/course/interactive-course-player"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InteractiveCoursePlayer courseId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
