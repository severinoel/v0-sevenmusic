"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music, User, Mail, Lock, Eye, EyeOff, Calendar, Loader2, AlertCircle, CheckCircle } from "lucide-react"

const instruments = [
  "Guitare",
  "Piano",
  "Batterie",
  "Basse",
  "Voix",
  "Violon",
  "Saxophone",
  "Trompette",
  "Flûte",
  "Ukulele",
  "Autre",
]

const levels = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
  { value: "expert", label: "Expert" },
]

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Step 1 data
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")

  // Step 2 data
  const [instrument, setInstrument] = useState("")
  const [level, setLevel] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)

  const validateStep1 = () => {
    if (!firstName || !lastName || !username || !email || !birthdate || !password) {
      setError("Veuillez remplir tous les champs")
      return false
    }

    // Check age (13+)
    const birth = new Date(birthdate)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    if (age < 13) {
      setError("Vous devez avoir au moins 13 ans pour vous inscrire")
      return false
    }

    // Check password strength
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return false
    }

    setError(null)
    return true
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!termsAccepted || !ageConfirmed) {
      setError("Veuillez accepter les conditions et confirmer votre âge")
      return
    }

    if (!instrument || !level) {
      setError("Veuillez sélectionner un instrument et un niveau")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      const redirectUrl =
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/api/auth/callback`

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
            display_name: `${firstName} ${lastName}`,
            first_name: firstName,
            last_name: lastName,
            instruments: [instrument],
            skill_level: level,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          throw new Error("Un compte existe déjà avec cet email")
        } else if (signUpError.message.includes("valid email")) {
          throw new Error("Veuillez entrer une adresse email valide")
        } else if (signUpError.message.includes("password")) {
          throw new Error("Le mot de passe doit contenir au moins 6 caractères")
        } else {
          throw signUpError
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("severino_signup_email", email.trim())
      }

      if (data.user && !data.session) {
        // Email confirmation required
        setSuccess("Compte créé ! Vérifiez votre email pour confirmer votre inscription.")
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push("/inscription-reussie")
      } else if (data.session) {
        // Auto-confirmed (for local dev or disabled email confirmation)
        setSuccess("Compte créé avec succès ! Redirection...")
        await new Promise((resolve) => setTimeout(resolve, 500))
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
          <Music className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          {step === 1 ? "Entrez vos informations de base" : "Personnalisez votre profil musical"}
        </CardDescription>
        <div className="flex justify-center gap-2 mt-4">
          <div className={`w-16 h-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-16 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-500/10 text-green-600 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            {success}
          </div>
        )}

        {step === 1 ? (
          <form className="space-y-4" onSubmit={handleStep1Submit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  placeholder="Jean"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Dupont"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="monpseudo"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

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
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Date de naissance</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="birthdate"
                  type="date"
                  className="pl-10"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Vous devez avoir au moins 13 ans pour vous inscrire.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Minimum 8 caractères.</p>
            </div>

            <Button type="submit" className="w-full">
              Continuer
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-2">
              <Label htmlFor="instrument">Instrument principal</Label>
              <Select value={instrument} onValueChange={setInstrument} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un instrument" />
                </SelectTrigger>
                <SelectContent>
                  {instruments.map((inst) => (
                    <SelectItem key={inst} value={inst.toLowerCase()}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Niveau</Label>
              <Select value={level} onValueChange={setLevel} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                  J'accepte les{" "}
                  <Link href="/cgu" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/confidentialite" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="age"
                  checked={ageConfirmed}
                  onCheckedChange={(checked) => setAgeConfirmed(checked as boolean)}
                  required
                />
                <Label htmlFor="age" className="text-sm font-normal">
                  Je confirme avoir au moins 13 ans (ou l'autorisation parentale)
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter" className="text-sm font-normal">
                  Je souhaite recevoir les actualités et offres de Séverino El
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
                disabled={isLoading}
              >
                Retour
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="text-primary hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
