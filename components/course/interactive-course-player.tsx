"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Repeat,
  FileText,
  MessageSquare,
  Download,
  Bookmark,
  Share2,
  ThumbsUp,
  CheckCircle2,
  Clock,
  Mic,
  StopCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react"
import Link from "next/link"

interface InteractiveCoursePlayerProps {
  course: any
  enrollment: any
  isLoggedIn: boolean
}

export function InteractiveCoursePlayer({ course, enrollment, isLoggedIn }: InteractiveCoursePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(845)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [loopStart, setLoopStart] = useState<number | null>(null)
  const [loopEnd, setLoopEnd] = useState<number | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Use course data from props
  const lessons = course.lessons || []
  const currentLesson = lessons[currentLessonIndex] || { title: "Leçon", duration: "10:00" }

  const chords = [
    { time: 0, chord: "F", diagram: "133211" },
    { time: 45, chord: "Bm", diagram: "x24432" },
    { time: 120, chord: "F#m", diagram: "244222" },
    { time: 180, chord: "B", diagram: "x24442" },
    { time: 240, chord: "C#m", diagram: "x46654" },
    { time: 320, chord: "G#m", diagram: "466444" },
  ]

  const notes = [
    { time: 65, text: "Bien appuyer avec l'index sur toutes les cordes" },
    { time: 145, text: "Garder le poignet droit pour plus de force" },
    { time: 230, text: "Pratiquer la transition lentement au début" },
  ]

  const currentChord = chords.reduce((prev, curr) => (curr.time <= currentTime ? curr : prev), chords[0])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSetLoop = () => {
    if (loopStart === null) {
      setLoopStart(currentTime)
    } else if (loopEnd === null) {
      setLoopEnd(currentTime)
    } else {
      setLoopStart(null)
      setLoopEnd(null)
    }
  }

  const speeds = [0.5, 0.75, 1, 1.25, 1.5]
  const progress = enrollment?.progress_percentage || 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/ecole" className="hover:text-foreground">
          École
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>{course.category || "Cours"}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player principal */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            {/* Video player */}
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={course.thumbnail || "/placeholder.svg?height=400&width=700&query=music lesson video"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {!isPlaying && (
                  <Button
                    onClick={() => setIsPlaying(true)}
                    className="absolute bg-primary hover:bg-primary/90 h-16 w-16 rounded-full"
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                )}
              </div>

              {/* Loop indicator */}
              {loopStart !== null && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500">
                    <Repeat className="mr-1 h-3 w-3" />
                    Loop: {formatTime(loopStart)} - {loopEnd ? formatTime(loopEnd) : "..."}
                  </Badge>
                </div>
              )}

              {/* Current chord overlay */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{currentChord.chord}</div>
                  <div className="text-xs text-white/70 mt-1">{currentChord.diagram}</div>
                </div>
              </div>

              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute bottom-20 left-4">
                  <Badge className="bg-red-500 animate-pulse">
                    <StopCircle className="mr-1 h-3 w-3" />
                    Enregistrement en cours...
                  </Badge>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-4 space-y-4">
              {/* Progress bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={([value]) => setCurrentTime(value)}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary hover:bg-primary/90 h-12 w-12 rounded-full"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={([value]) => {
                        setVolume(value)
                        setIsMuted(value === 0)
                      }}
                      className="w-24"
                    />
                  </div>

                  {/* Speed */}
                  <div className="flex items-center gap-1">
                    {speeds.map((speed) => (
                      <Button
                        key={speed}
                        variant={playbackSpeed === speed ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setPlaybackSpeed(speed)}
                        className={playbackSpeed === speed ? "bg-primary hover:bg-primary/90" : ""}
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>

                  {/* Loop */}
                  <Button
                    variant={loopStart !== null ? "default" : "ghost"}
                    size="icon"
                    onClick={handleSetLoop}
                    className={loopStart !== null ? "bg-purple-500 hover:bg-purple-600" : ""}
                  >
                    <Repeat className="h-5 w-5" />
                  </Button>

                  {/* Record */}
                  <Button
                    variant={isRecording ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                    className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon">
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Course info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <Badge variant="outline">{course.level || "Tous niveaux"}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={course.instructor?.avatar || "/placeholder.svg"}
                    alt={course.instructor?.name || "Instructeur"}
                  />
                  <AvatarFallback>
                    {(course.instructor?.name || "P")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{course.instructor?.name || "Professeur"}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.instructor?.bio || "Instructeur certifié"}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  J'aime
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Login prompt if not logged in */}
          {!isLoggedIn && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Connectez-vous pour progresser</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Créez un compte gratuit pour sauvegarder votre progression et débloquer toutes les fonctionnalités.
                </p>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/inscription">S'inscrire</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href="/connexion">Connexion</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Votre progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progress}% complété</span>
                  <span className="text-muted-foreground">
                    {enrollment?.completed_lessons?.length || 0}/{lessons.length || 0} leçons
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tabs for content */}
          <Tabs defaultValue="chapters" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="chapters">Leçons</TabsTrigger>
              <TabsTrigger value="chords">Accords</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="files">Fichiers</TabsTrigger>
            </TabsList>

            <TabsContent value="chapters">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-2">
                      {lessons.length > 0 ? (
                        lessons.map((lesson: any, index: number) => (
                          <div
                            key={lesson.id || index}
                            onClick={() => setCurrentLessonIndex(index)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                              currentLessonIndex === index
                                ? "bg-primary/10 border border-primary/20"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                lesson.completed || enrollment?.completed_lessons?.includes(lesson.id)
                                  ? "bg-green-500"
                                  : "bg-muted"
                              }`}
                            >
                              {lesson.completed || enrollment?.completed_lessons?.includes(lesson.id) ? (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              ) : (
                                <span className="text-xs">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{lesson.title}</div>
                              <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>Aucune leçon disponible</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chords">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {chords.map((chord, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentTime(chord.time)}
                          className={`p-4 rounded-lg border text-center cursor-pointer transition-colors ${
                            currentChord.chord === chord.chord ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="text-2xl font-bold text-primary">{chord.chord}</div>
                          <div className="text-xs text-muted-foreground mt-1">{chord.diagram}</div>
                          <div className="text-xs text-muted-foreground mt-2">{formatTime(chord.time)}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-3">
                      {notes.map((note, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentTime(note.time)}
                          className="p-3 rounded-lg border bg-card hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="text-xs text-primary mb-1">{formatTime(note.time)}</div>
                          <div className="text-sm">{note.text}</div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full bg-transparent">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ajouter une note
                      </Button>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4 space-y-3">
                      {course.resources && course.resources.length > 0 ? (
                        course.resources.map((file: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">{file.name}</div>
                                <div className="text-xs text-muted-foreground">{file.type}</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                              <a href={file.url} download>
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Aucun fichier disponible</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={currentLessonIndex === 0}
              onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Précédent
            </Button>
            <Button
              className="flex-1"
              disabled={currentLessonIndex >= lessons.length - 1}
              onClick={() => setCurrentLessonIndex(Math.min(lessons.length - 1, currentLessonIndex + 1))}
            >
              Suivant
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
