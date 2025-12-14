"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Music,
  GraduationCap,
  Upload,
  Video,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
} from "lucide-react"

const steps = [
  { id: 1, name: "Informations personnelles", icon: User },
  { id: 2, name: "Portfolio", icon: FileText },
  { id: 3, name: "Disponibilités", icon: Clock },
  { id: 4, name: "Méthodologie", icon: GraduationCap },
]

const instruments = [
  "Guitare acoustique",
  "Guitare électrique",
  "Piano",
  "Batterie",
  "Basse",
  "Violon",
  "Chant",
  "Saxophone",
  "Trompette",
  "Ukulélé",
]

const genres = [
  "Pop/Rock",
  "Jazz",
  "Classique",
  "Blues",
  "Folk",
  "Metal",
  "R&B/Soul",
  "Electronic",
  "Country",
  "World Music",
]

export function TeacherApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Badge className="mb-4">Recrutement</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Devenez Professeur Séverino El</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rejoignez notre communauté de professeurs passionnés et partagez votre expertise musicale avec des élèves
              du monde entier.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-1 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-secondary"}`}
                    style={{ width: "80px" }}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Steps */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = steps[currentStep - 1].icon
                return <Icon className="w-5 h-5 text-primary" />
              })()}
              {steps[currentStep - 1].name}
            </CardTitle>
            <CardDescription>
              Étape {currentStep} sur {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input id="phone" type="tel" placeholder="+33 6 00 00 00 00" />
                </div>

                <div className="space-y-2">
                  <Label>Instruments maîtrisés *</Label>
                  <div className="flex flex-wrap gap-2">
                    {instruments.map((instrument) => (
                      <Badge
                        key={instrument}
                        variant={selectedInstruments.includes(instrument) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedInstruments((prev) =>
                            prev.includes(instrument) ? prev.filter((i) => i !== instrument) : [...prev, instrument],
                          )
                        }
                      >
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Genres musicaux *</Label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={selectedGenres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedGenres((prev) =>
                            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
                          )
                        }
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Années d'expérience *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 ans</SelectItem>
                      <SelectItem value="3-5">3-5 ans</SelectItem>
                      <SelectItem value="6-10">6-10 ans</SelectItem>
                      <SelectItem value="10+">Plus de 10 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Portfolio */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>CV (PDF) *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Glissez votre CV ici ou cliquez pour sélectionner</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, max 5MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vidéo de présentation (3 min max) *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Video className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Présentez-vous en vidéo (max 3 minutes)</p>
                    <p className="text-xs text-muted-foreground mt-1">MP4, MOV, max 100MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Enregistrements audio</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Music className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Ajoutez des exemples de votre jeu</p>
                    <p className="text-xs text-muted-foreground mt-1">MP3, WAV, max 20MB chacun</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Liens externes</Label>
                  <Input placeholder="Lien YouTube, SoundCloud, etc." className="mb-2" />
                  <Input placeholder="Autre lien (optionnel)" />
                </div>
              </div>
            )}

            {/* Step 3: Availability */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Fuseau horaire *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre fuseau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Heures disponibles par semaine *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10">5-10 heures</SelectItem>
                      <SelectItem value="10-20">10-20 heures</SelectItem>
                      <SelectItem value="20-30">20-30 heures</SelectItem>
                      <SelectItem value="30+">Plus de 30 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Préférences d'âge des élèves</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Enfants (6-12)", "Adolescents (13-17)", "Adultes (18-59)", "Seniors (60+)"].map((age) => (
                      <Badge key={age} variant="outline" className="cursor-pointer">
                        {age}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Langues d'enseignement *</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Français", "English", "Español", "Deutsch", "Português"].map((lang) => (
                      <Badge key={lang} variant="outline" className="cursor-pointer">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Methodology */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="philosophy">Philosophie d'enseignement *</Label>
                  <Textarea id="philosophy" placeholder="Décrivez votre approche pédagogique..." rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methods">Méthodes pédagogiques utilisées *</Label>
                  <Textarea id="methods" placeholder="Quelles méthodes utilisez-vous avec vos élèves ?" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>Expérience d'enseignement en ligne</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="beginner">Débutant (moins de 1 an)</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire (1-3 ans)</SelectItem>
                      <SelectItem value="expert">Expert (3 ans et plus)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    J'accepte les conditions générales d'utilisation et la politique de confidentialité de Séverino El.
                    Je certifie que les informations fournies sont exactes.
                  </Label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))} className="gap-2">
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Soumettre ma candidature
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-2">Processus de sélection</h3>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Pré-sélection automatique (24h)</li>
                  <li>2. Évaluation technique par notre comité (72h)</li>
                  <li>3. Entretien RH (48h)</li>
                  <li>4. Validation finale et intégration</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
