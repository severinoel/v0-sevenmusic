"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const subjects = [
  { value: "general", label: "Question générale" },
  { value: "technical", label: "Support technique" },
  { value: "billing", label: "Facturation & Abonnement" },
  { value: "partnership", label: "Partenariat" },
  { value: "teacher", label: "Devenir professeur" },
  { value: "bug", label: "Signaler un bug" },
  { value: "suggestion", label: "Suggestion d'amélioration" },
  { value: "copyright", label: "Droits d'auteur" },
  { value: "other", label: "Autre" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: submitError } = await supabase.from("contact_messages").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        status: "pending",
      })

      if (submitError) throw submitError

      toast.success("Message envoyé avec succès !")
      setIsSubmitted(true)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      console.error("[v0] Error submitting contact form:", err)
      setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
      toast.error("Erreur lors de l'envoi du message")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Message envoyé !</h3>
          <p className="text-muted-foreground mb-6">
            Merci de nous avoir contactés. Notre équipe vous répondra dans les 24-48 heures.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Envoyer un autre message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envoyez-nous un message</CardTitle>
        <CardDescription>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone (optionnel)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+226 XX XX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet *</Label>
            <Select
              required
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un sujet" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Décrivez votre demande en détail..."
              rows={6}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Envoi en cours...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Envoyer le message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
