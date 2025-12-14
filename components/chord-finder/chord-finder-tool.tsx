"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Link, Mic, Play, Pause, SkipBack, SkipForward, Download, Share2, Music, Zap } from "lucide-react"

const detectedChords = [
  { time: "0:00", chord: "Am", confidence: 98 },
  { time: "0:04", chord: "F", confidence: 96 },
  { time: "0:08", chord: "C", confidence: 99 },
  { time: "0:12", chord: "G", confidence: 97 },
  { time: "0:16", chord: "Am", confidence: 98 },
  { time: "0:20", chord: "F", confidence: 95 },
  { time: "0:24", chord: "C", confidence: 99 },
  { time: "0:28", chord: "G", confidence: 94 },
]

const chordDiagrams: Record<string, string[]> = {
  Am: ["x", "0", "2", "2", "1", "0"],
  F: ["1", "3", "3", "2", "1", "1"],
  C: ["x", "3", "2", "0", "1", "0"],
  G: ["3", "2", "0", "0", "0", "3"],
}

export function ChordFinderTool() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentChord, setCurrentChord] = useState("Am")

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return 100
        }
        return p + 10
      })
    }, 300)
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">IA Audio</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Chord Finder IA</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Détectez automatiquement les accords de n'importe quelle chanson avec une précision de plus de 95%.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyser une chanson</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Fichier
                    </TabsTrigger>
                    <TabsTrigger value="url">
                      <Link className="w-4 h-4 mr-2" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="record">
                      <Mic className="w-4 h-4 mr-2" />
                      Enregistrer
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="mt-4">
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium text-foreground mb-2">Glissez un fichier audio ici</p>
                      <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir (MP3, WAV, FLAC)</p>
                      <Button>Choisir un fichier</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="url" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Collez une URL YouTube, Spotify, SoundCloud..." />
                        <Button onClick={handleAnalyze}>Analyser</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Compatible YouTube, Spotify, SoundCloud, Apple Music
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="record" className="mt-4">
                    <div className="text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                        <Mic className="w-8 h-8 text-destructive" />
                      </div>
                      <Button variant="destructive" size="lg">
                        Commencer l'enregistrement
                      </Button>
                      <p className="text-sm text-muted-foreground mt-4">Jouez ou chantez la chanson pour la détecter</p>
                    </div>
                  </TabsContent>
                </Tabs>

                {isAnalyzing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Analyse en cours...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Hotel California</CardTitle>
                    <p className="text-sm text-muted-foreground">Eagles • 1977</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Player */}
                <div className="bg-secondary rounded-xl p-4 mb-6">
                  <div className="h-16 bg-secondary/50 rounded-lg mb-4 flex items-end gap-0.5 px-2 overflow-hidden">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/60 rounded-t min-w-[2px]"
                        style={{ height: `${20 + Math.random() * 80}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">0:00</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button size="icon" className="w-12 h-12 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">6:30</span>
                  </div>
                </div>

                {/* Chord timeline */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-3">Progression des accords</h4>
                  <div className="flex flex-wrap gap-2">
                    {detectedChords.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentChord(item.chord)}
                        className={`px-3 py-2 rounded-lg border transition-colors ${
                          currentChord === item.chord
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="text-xs text-muted-foreground mb-0.5">{item.time}</div>
                        <div className="font-bold">{item.chord}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current chord diagram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Accord: {currentChord}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Guitar diagram */}
                <div className="bg-secondary rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-6 gap-2">
                    {chordDiagrams[currentChord]?.map((fret, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {fret === "x" ? "x" : fret === "0" ? "o" : ""}
                        </div>
                        <div className="space-y-1">
                          {[1, 2, 3, 4].map((f) => (
                            <div
                              key={f}
                              className={`w-6 h-6 mx-auto rounded-full border ${
                                Number.parseInt(fret) === f && fret !== "x" && fret !== "0"
                                  ? "bg-primary border-primary"
                                  : "border-border"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>E</span>
                    <span>A</span>
                    <span>D</span>
                    <span>G</span>
                    <span>B</span>
                    <span>e</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir versions alternatives
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Suggérer un capodastre
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Song info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tonalité</span>
                  <Badge variant="secondary">Bm</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tempo</span>
                  <Badge variant="secondary">75 BPM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mesure</span>
                  <Badge variant="secondary">4/4</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Précision</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="font-medium">97%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exporter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Guitar Pro (.gp)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  PDF avec diagrammes
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  MusicXML
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  ChordPro (.cho)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
