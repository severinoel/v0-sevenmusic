"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  Wand2,
  Music,
  Mic,
  Guitar,
  Drum,
  Piano,
  Volume2,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Layers,
  Sparkles,
  Radio,
  Headphones,
  Zap,
  RefreshCw,
} from "lucide-react"

const stems = [
  { name: "Voix", icon: Mic, color: "bg-pink-500", volume: 80, muted: false },
  { name: "Guitare", icon: Guitar, color: "bg-amber-500", volume: 70, muted: false },
  { name: "Basse", icon: Music, color: "bg-purple-500", volume: 65, muted: false },
  { name: "Batterie", icon: Drum, color: "bg-blue-500", volume: 75, muted: false },
  { name: "Piano", icon: Piano, color: "bg-green-500", volume: 60, muted: true },
]

const presets = [
  { name: "Pop Radio", description: "Mix brillant et punchy", icon: Radio },
  { name: "Rock Live", description: "Son puissant et dynamique", icon: Zap },
  { name: "Acoustic Warm", description: "Chaleureux et naturel", icon: Guitar },
  { name: "Electronic Clean", description: "Moderne et précis", icon: Sparkles },
]

export function AIStudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [stemVolumes, setStemVolumes] = useState<Record<string, number>>({
    Voix: 80,
    Guitare: 70,
    Basse: 65,
    Batterie: 75,
    Piano: 60,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-purple-500/10 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">AI Studio</h1>
                  <p className="text-muted-foreground">Mixage et mastering automatiques par IA</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Upload className="w-4 h-4" />
                Importer audio
              </Button>
              <Button className="gap-2 bg-primary">
                <Sparkles className="w-4 h-4" />
                Mix automatique
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Workspace */}
          <div className="lg:col-span-3 space-y-6">
            {/* Waveform / Player */}
            <Card className="border-border">
              <CardContent className="p-6">
                {/* Waveform Visualization */}
                <div className="h-32 bg-secondary/50 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary/60 rounded-full"
                        style={{
                          height: `${20 + Math.random() * 60}%`,
                          opacity: i < 45 ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute left-[45%] top-0 bottom-0 w-0.5 bg-primary" />
                </div>

                {/* Transport Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    className="w-14 h-14 rounded-full bg-primary"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </CardContent>
            </Card>

            {/* Stems Mixer */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Séparation de pistes (Stems)</CardTitle>
                      <CardDescription>Isolez et mixez chaque instrument</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                    Re-séparer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stems.map((stem, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                      <div className={`w-10 h-10 rounded-lg ${stem.color}/20 flex items-center justify-center`}>
                        <stem.icon className={`w-5 h-5 ${stem.color.replace("bg-", "text-")}`} />
                      </div>
                      <span className="font-medium w-20">{stem.name}</span>
                      <div className="flex-1">
                        <Slider
                          value={[stemVolumes[stem.name] || stem.volume]}
                          onValueChange={(value) => setStemVolumes((prev) => ({ ...prev, [stem.name]: value[0] }))}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">
                        {stemVolumes[stem.name] || stem.volume}%
                      </span>
                      <Button variant="ghost" size="icon">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Switch defaultChecked={!stem.muted} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Tools */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" />
                  Outils IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span>Auto-Mix</span>
                    <span className="text-xs text-muted-foreground">Balance automatique</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
                    <Headphones className="w-6 h-6 text-purple-500" />
                    <span>Mastering</span>
                    <span className="text-xs text-muted-foreground">Finalisation pro</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
                    <RefreshCw className="w-6 h-6 text-green-500" />
                    <span>Restauration</span>
                    <span className="text-xs text-muted-foreground">Réduction bruit</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent">
                    <Music className="w-6 h-6 text-amber-500" />
                    <span>Voice to Guitar</span>
                    <span className="text-xs text-muted-foreground">Transformation</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Presets */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Presets de mixage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {presets.map((preset, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <preset.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{preset.name}</p>
                      <p className="text-xs text-muted-foreground">{preset.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Export */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <div className="flex gap-2">
                    <Badge variant="default" className="cursor-pointer">
                      WAV
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      MP3
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      FLAC
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Qualité</label>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      Standard
                    </Badge>
                    <Badge variant="default" className="cursor-pointer">
                      HD
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Master
                    </Badge>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Exporter
                </Button>
              </CardContent>
            </Card>

            {/* Spatial Audio */}
            <Card className="border-border bg-gradient-to-br from-purple-500/10 to-primary/10">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-7 h-7 text-purple-500" />
                </div>
                <h3 className="font-bold mb-2">Audio Spatial 3D</h3>
                <p className="text-sm text-muted-foreground mb-4">Mixez en Dolby Atmos et audio binaural</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Activer 3D Mix
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
