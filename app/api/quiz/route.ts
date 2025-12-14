import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  const moduleId = searchParams.get("moduleId")
  const level = searchParams.get("level")

  let query = supabase.from("quizzes").select(`
    *,
    questions:quiz_questions(*)
  `)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  if (level) {
    query = query.eq("level", level)
  }

  const { data, error } = await query.eq("is_published", true)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { title, description, moduleId, level, timeLimit, questions } = body

  // Create quiz
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert({
      title,
      description,
      module_id: moduleId,
      level,
      time_limit: timeLimit,
      created_by: user.id,
    })
    .select()
    .single()

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 500 })
  }

  // Create questions
  if (questions && questions.length > 0) {
    const questionsWithQuizId = questions.map((q: any, index: number) => ({
      ...q,
      quiz_id: quiz.id,
      order: index + 1,
    }))

    const { error: questionsError } = await supabase.from("quiz_questions").insert(questionsWithQuizId)

    if (questionsError) {
      return NextResponse.json({ error: questionsError.message }, { status: 500 })
    }
  }

  return NextResponse.json(quiz)
}
