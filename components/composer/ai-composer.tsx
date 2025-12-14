"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wand2,
  Music,
  Mic2,
  Piano,
  Play,
  Pause,
  Download,
  RefreshCw,
  Sparkles,
  FileText,
  Copy,
  Save,
  Share2,
  Lightbulb,
  Heart,
} from "lucide-react"

const genres = ["Pop", "Rock", "Jazz", "Blues", "Folk", "R&B", "Electronic", "Country", "Classical", "Hip-Hop"]
const moods = ["Joyeux", "Mélancolique", "Énergique", "Relaxant", "Romantique", "Épique", "Nostalgique", "Mystérieux"]
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const scales = ["Majeur", "Mineur", "Dorien", "Mixolydien", "Pentatonique", "Blues"]

const generatedChords = [
  { chord: "Am", duration: 4 },
  { chord: "F", duration: 4 },
  { chord: "C", duration: 4 },
  { chord: "G", duration: 4 },
  { chord: "Am", duration: 4 },
  { chord: "F", duration: 4 },
  { chord: "C", duration: 2 },
  { chord: "G", duration: 2 },
]

const sampleLyrics = `Verse 1:
Dans la lumière du matin
Je cherche encore mon chemin
Les étoiles s'effacent doucement
Laissant place à ce nouveau moment

Chorus:
Et je cours, je cours vers demain
Sans regarder derrière, sans retenir
Les rêves qui s'envolent dans le vent
Je les poursuis inlassablement

Verse 2:
Les ombres dansent sur les murs
Comme des souvenirs, comme des murmures
Le temps s'écoule sans faire de bruit
Emportant avec lui la nuit`

export function AIComposer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("chords")
  const [tempo, setTempo] = useState([120])
  const [creativity, setCreativity] = useState([70])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-amber-500/10 via-background to-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-pink-500 flex items-center justify-center">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">AI Songwriting</h1>
                <p className="text-muted-foreground">Composez des mélodies, accords et paroles avec l'IA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Save className="w-4 h-4" />
                Sauvegarder
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Paramètres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Genre</label>
                  <Select defaultValue="pop">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ambiance</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.slice(0, 4).map((mood) => (
                      <Badge key={mood} variant="outline" className="cursor-pointer hover:bg-primary/20">
                        {mood}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tonalité</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select defaultValue="Am">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {keys.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="mineur">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {scales.map((scale) => (
                          <SelectItem key={scale} value={scale.toLowerCase()}>
                            {scale}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Tempo</label>
                    <span className="text-sm text-muted-foreground">{tempo} BPM</span>
                  </div>
                  <Slider value={tempo} onValueChange={setTempo} min={60} max={180} step={1} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Créativité IA</label>
                    <span className="text-sm text-muted-foreground">{creativity}%</span>
                  </div>
                  <Slider value={creativity} onValueChange={setCreativity} min={0} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Ideas */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Idées rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Ballade acoustique", "Rock énergique", "Jazz smooth", "Pop été"].map((idea, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                    <Sparkles className="w-3 h-3 mr-2 text-primary" />
                    {idea}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Prompt Input */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Décrivez votre chanson... Ex: Une ballade romantique sur le thème de la nostalgie, avec une mélodie douce et mélancolique"
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Music className="w-3 h-3 mr-1" />
                        Accords
                      </Badge>
                      <Badge variant="secondary">
                        <Piano className="w-3 h-3 mr-1" />
                        Mélodie
                      </Badge>
                      <Badge variant="secondary">
                        <Mic2 className="w-3 h-3 mr-1" />
                        Paroles
                      </Badge>
                    </div>
                    <Button className="gap-2 bg-gradient-to-r from-amber-500 to-pink-500 border-0">
                      <Wand2 className="w-4 h-4" />
                      Générer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-secondary/50 p-1">
                <TabsTrigger value="chords" className="gap-2 data-[state=active]:bg-background">
                  <Music className="w-4 h-4" />
                  Accords
                </TabsTrigger>
                <TabsTrigger value="melody" className="gap-2 data-[state=active]:bg-background">
                  <Piano className="w-4 h-4" />
                  Mélodie
                </TabsTrigger>
                <TabsTrigger value="lyrics" className="gap-2 data-[state=active]:bg-background">
                  <FileText className="w-4 h-4" />
                  Paroles
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chords" className="mt-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Progression d'accords</CardTitle>
                        <CardDescription>Am - F - C - G (I - VI - IV - V)</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Chord Display */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
                      {generatedChords.map((item, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg bg-secondary/50 border-2 border-border hover:border-primary transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <span className="text-lg font-bold">{item.chord}</span>
                        </div>
                      ))}
                    </div>

                    {/* Player */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                      <Button size="icon" className="w-12 h-12 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </Button>
                      <div className="flex-1">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-primary rounded-full" />
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">0:08 / 0:24</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="melody" className="mt-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Mélodie générée</CardTitle>
                    <CardDescription>Basée sur la progression d'accords</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Piano Roll Visualization */}
                    <div className="h-48 bg-secondary/30 rounded-lg mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-16 gap-px">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="bg-secondary/50" />
                        ))}
                      </div>
                      {/* Sample notes */}
                      <div className="absolute top-[20%] left-[5%] w-8 h-4 bg-primary rounded" />
                      <div className="absolute top-[30%] left-[15%] w-6 h-4 bg-primary rounded" />
                      <div className="absolute top-[25%] left-[25%] w-10 h-4 bg-primary rounded" />
                      <div className="absolute top-[40%] left-[40%] w-8 h-4 bg-primary rounded" />
                      <div className="absolute top-[35%] left-[55%] w-6 h-4 bg-primary rounded" />
                      <div className="absolute top-[30%] left-[70%] w-12 h-4 bg-primary rounded" />
                    </div>

                    <div className="flex items-center gap-4">
                      <Button className="gap-2">
                        <Play className="w-4 h-4" />
                        Écouter
                      </Button>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Exporter MIDI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lyrics" className="mt-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Paroles générées</CardTitle>
                        <CardDescription>Thème: Nostalgie, espoir</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <RefreshCw className="w-4 h-4" />
                          Régénérer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary/30 rounded-lg p-6 font-mono text-sm whitespace-pre-line leading-relaxed">
                      {sampleLyrics}
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Copy className="w-4 h-4" />
                        Copier
                      </Button>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <FileText className="w-4 h-4" />
                        Exporter PDF
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
