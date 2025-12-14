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

  const { evaluation_id, answers, time_taken } = body

  // Get evaluation to calculate score
  const { data: evaluation } = await supabase.from("evaluations").select("*").eq("id", evaluation_id).single()

  if (!evaluation) {
    return NextResponse.json({ error: "Évaluation non trouvée" }, { status: 404 })
  }

  // Calculate score
  let correctAnswers = 0
  const questions = evaluation.questions as any[]

  answers.forEach((answer: any, index: number) => {
    if (questions[index] && questions[index].correct_answer === answer) {
      correctAnswers++
    }
  })

  const score = Math.round((correctAnswers / questions.length) * 100)
  const passed = score >= (evaluation.passing_score || 70)

  // Save result
  const { data, error } = await supabase
    .from("evaluation_results")
    .insert({
      evaluation_id,
      user_id: user.id,
      answers,
      score,
      passed,
      time_taken,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Award XP if passed
  if (passed) {
    const xpEarned = Math.round(score / 2) // 50 XP max per evaluation
    await supabase.rpc("add_user_xp", { user_id: user.id, xp_amount: xpEarned })
  }

  return NextResponse.json({
    ...data,
    correct_answers: correctAnswers,
    total_questions: questions.length,
  })
}
