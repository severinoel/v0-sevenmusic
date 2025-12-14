"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Star, Video, Filter, Search, ChevronLeft, ChevronRight, Check } from "lucide-react"

const teachers = [
  {
    id: 1,
    name: "Prof. Marie Dupont",
    specialty: "Piano Classique & Jazz",
    rating: 4.9,
    reviews: 128,
    price: 45,
    avatar: "/woman-pianist.jpg",
    available: true,
    languages: ["Français", "English"],
    experience: "12 ans",
  },
  {
    id: 2,
    name: "Prof. Jean Martin",
    specialty: "Guitare Rock & Blues",
    rating: 4.8,
    reviews: 95,
    price: 40,
    avatar: "/man-guitarist.jpg",
    available: true,
    languages: ["Français"],
    experience: "8 ans",
  },
  {
    id: 3,
    name: "Prof. Sophie Bernard",
    specialty: "Chant & Technique vocale",
    rating: 4.9,
    reviews: 156,
    price: 50,
    avatar: "/woman-singer-instructor.jpg",
    available: false,
    languages: ["Français", "Español"],
    experience: "15 ans",
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

const weekDays = [
  { day: "Lun", date: 16, available: true },
  { day: "Mar", date: 17, available: true },
  { day: "Mer", date: 18, available: false },
  { day: "Jeu", date: 19, available: true },
  { day: "Ven", date: 20, available: true },
  { day: "Sam", date: 21, available: true },
  { day: "Dim", date: 22, available: false },
]

export function BookingSystem() {
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<number | null>(16)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-blue-500/10 via-background to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Réserver un cours particulier</h1>
          <p className="text-muted-foreground">
            Choisissez votre professeur et réservez votre créneau en quelques clics
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-20 h-1 mx-2 ${step > s ? "bg-primary" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Choose Teacher */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-xl font-bold">Choisissez votre professeur</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Rechercher..." className="pl-10 w-60" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className={`border-2 transition-all cursor-pointer ${
                    selectedTeacher === teacher.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!teacher.available && "opacity-60"}`}
                  onClick={() => teacher.available && setSelectedTeacher(teacher.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold">{teacher.name}</h3>
                            <p className="text-sm text-muted-foreground">{teacher.specialty}</p>
                          </div>
                          {selectedTeacher === teacher.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span className="font-medium">{teacher.rating}</span>
                          <span className="text-sm text-muted-foreground">({teacher.reviews} avis)</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {teacher.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground">{teacher.experience} exp.</span>
                          <span className="text-lg font-bold text-primary">{teacher.price}€/h</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button size="lg" disabled={!selectedTeacher} onClick={() => setStep(2)} className="gap-2">
                Continuer
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Retour
              </Button>
              <h2 className="text-xl font-bold">Choisissez votre créneau</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <Card className="lg:col-span-2 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Décembre 2024
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Week Days */}
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {weekDays.map((d) => (
                      <button
                        key={d.date}
                        disabled={!d.available}
                        onClick={() => setSelectedDate(d.date)}
                        className={`p-3 rounded-lg text-center transition-all ${
                          selectedDate === d.date
                            ? "bg-primary text-primary-foreground"
                            : d.available
                              ? "bg-secondary hover:bg-secondary/80"
                              : "bg-secondary/30 text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        <p className="text-xs">{d.day}</p>
                        <p className="text-lg font-bold">{d.date}</p>
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horaires disponibles
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Avatar>
                      <AvatarImage src={teachers.find((t) => t.id === selectedTeacher)?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teachers.find((t) => t.id === selectedTeacher)?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {teachers.find((t) => t.id === selectedTeacher)?.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedDate ? `${selectedDate} Décembre 2024` : "Sélectionnez une date"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedTime || "Sélectionnez un horaire"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-muted-foreground" />
                      <span>Cours en visio</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span>Prix du cours (1h)</span>
                      <span className="text-xl font-bold">
                        {teachers.find((t) => t.id === selectedTeacher)?.price}€
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep(3)}
                    >
                      Confirmer la réservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
              <p className="text-muted-foreground">
                Votre cours avec {teachers.find((t) => t.id === selectedTeacher)?.name} est confirmé pour le{" "}
                {selectedDate} Décembre à {selectedTime}.
              </p>
            </div>

            <Card className="border-border text-left">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Référence</span>
                  <span className="font-mono font-medium">#SEV-2024-4521</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Professeur</span>
                  <span className="font-medium">{teachers.find((t) => t.id === selectedTeacher)?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date & Heure</span>
                  <span className="font-medium">
                    {selectedDate} Déc. 2024 à {selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mode</span>
                  <Badge>Visioconférence</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Calendar className="w-4 h-4" />
                Ajouter au calendrier
              </Button>
              <Button className="gap-2">Voir mes réservations</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
