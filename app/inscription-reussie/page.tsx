"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function InscriptionReussiePage() {
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendMessage(null)

    try {
      const supabase = createClient()
      const email = localStorage.getItem("severino_signup_email")

      if (!email) {
        setResendMessage("Veuillez vous réinscrire pour recevoir un nouveau lien.")
        return
      }

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })

      if (error) throw error

      setResendMessage("Email envoyé ! Vérifiez votre boîte de réception.")
    } catch (err) {
      setResendMessage("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Inscription réussie !</CardTitle>
            <CardDescription>Bienvenue dans la communauté Séverino El</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-muted/50">
              <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">
                Un email de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien pour activer votre
                compte.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Prochaines étapes :</h4>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  Vérifiez votre boîte mail (et les spams)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  Cliquez sur le lien de confirmation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  Complétez votre profil et commencez à apprendre !
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/connexion">
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Retour à l'accueil</Link>
              </Button>
            </div>

            {resendMessage && (
              <p className={`text-sm ${resendMessage.includes("Erreur") ? "text-destructive" : "text-green-600"}`}>
                {resendMessage}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Vous n'avez pas reçu d'email ?{" "}
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3" />
                    Renvoyer le lien
                  </>
                )}
              </button>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
