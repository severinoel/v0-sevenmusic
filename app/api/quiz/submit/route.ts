import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  const body = await request.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { quizId, answers, timeSpent } = body

  // Get quiz with questions
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select(`
      *,
      questions:quiz_questions(*)
    `)
    .eq("id", quizId)
    .single()

  if (quizError || !quiz) {
    return NextResponse.json({ error: "Quiz non trouvé" }, { status: 404 })
  }

  // Calculate score
  let correctAnswers = 0
  const results = quiz.questions.map((question: any) => {
    const userAnswer = answers[question.id]
    const isCorrect = userAnswer === question.correct_answer
    if (isCorrect) correctAnswers++
    return {
      questionId: question.id,
      userAnswer,
      correctAnswer: question.correct_answer,
      isCorrect,
      explanation: question.explanation,
    }
  })

  const score = Math.round((correctAnswers / quiz.questions.length) * 100)
  const passed = score >= (quiz.passing_score || 60)

  // Save attempt
  const { data: attempt, error: attemptError } = await supabase
    .from("quiz_attempts")
    .insert({
      quiz_id: quizId,
      user_id: user.id,
      score,
      passed,
      time_spent: timeSpent,
      answers: results,
    })
    .select()
    .single()

  if (attemptError) {
    return NextResponse.json({ error: attemptError.message }, { status: 500 })
  }

  // Award XP if passed
  if (passed) {
    const xpEarned = Math.round(score / 2)
    await supabase.rpc("add_xp", { user_id: user.id, amount: xpEarned })
  }

  return NextResponse.json({
    attempt,
    score,
    passed,
    correctAnswers,
    totalQuestions: quiz.questions.length,
    results,
    xpEarned: passed ? Math.round(score / 2) : 0,
  })
}
