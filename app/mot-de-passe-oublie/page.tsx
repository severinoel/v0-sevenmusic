"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
            <CardDescription>
              {success ? "Vérifiez votre boîte mail" : "Entrez votre email pour recevoir un lien de réinitialisation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec un lien pour
                  réinitialiser votre mot de passe.
                </p>
                <Button asChild className="w-full">
                  <Link href="/connexion">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la connexion
                  </Link>
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le lien"
                  )}
                </Button>

                <Button variant="ghost" asChild className="w-full">
                  <Link href="/connexion">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à la connexion
                  </Link>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
