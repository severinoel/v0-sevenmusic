"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, Lock, ArrowRight } from "lucide-react"

const levels = [
  {
    level: "Débutant",
    status: "completed",
    progress: 100,
    courses: 12,
    duration: "8 semaines",
    skills: ["Accords de base", "Rythme simple", "Lecture tablature"],
  },
  {
    level: "Intermédiaire",
    status: "in-progress",
    progress: 65,
    courses: 18,
    duration: "12 semaines",
    skills: ["Barrés", "Fingerpicking", "Gammes pentatoniques"],
  },
  {
    level: "Avancé",
    status: "locked",
    progress: 0,
    courses: 24,
    duration: "16 semaines",
    skills: ["Modes", "Jazz", "Improvisation"],
  },
  {
    level: "Expert",
    status: "locked",
    progress: 0,
    courses: 30,
    duration: "20 semaines",
    skills: ["Composition", "Production", "Performance"],
  },
]

export function LearningPath() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Votre parcours d'apprentissage</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un cursus complet adapté à votre niveau, de débutant à expert. L'IA personnalise votre parcours en fonction
            de vos progrès.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((item, index) => (
            <Card
              key={item.level}
              className={`relative overflow-hidden ${
                item.status === "locked" ? "opacity-60" : ""
              } ${item.status === "in-progress" ? "border-primary" : ""}`}
            >
              {item.status === "in-progress" && <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />}
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant={item.status === "completed" ? "default" : "secondary"}
                    className={item.status === "completed" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {item.status === "completed" && <Check className="w-3 h-3 mr-1" />}
                    {item.status === "locked" && <Lock className="w-3 h-3 mr-1" />}
                    {item.status === "completed"
                      ? "Complété"
                      : item.status === "in-progress"
                        ? "En cours"
                        : "Verrouillé"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Étape {index + 1}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{item.level}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.courses} cours • {item.duration}
                </p>

                {item.status !== "locked" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium">Compétences :</p>
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  variant={item.status === "in-progress" ? "default" : "outline"}
                  disabled={item.status === "locked"}
                >
                  {item.status === "completed" ? "Revoir" : item.status === "in-progress" ? "Continuer" : "Débloquer"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
