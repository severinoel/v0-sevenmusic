"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, Mic, Power, RotateCcw, Save, Share2 } from "lucide-react"

const effectTypes = [
  { id: "distortion", name: "Distortion", color: "bg-red-500" },
  { id: "overdrive", name: "Overdrive", color: "bg-orange-500" },
  { id: "delay", name: "Delay", color: "bg-blue-500" },
  { id: "reverb", name: "Reverb", color: "bg-purple-500" },
  { id: "chorus", name: "Chorus", color: "bg-teal-500" },
  { id: "compressor", name: "Compressor", color: "bg-yellow-500" },
  { id: "equalizer", name: "EQ", color: "bg-green-500" },
  { id: "noise-gate", name: "Noise Gate", color: "bg-gray-500" },
]

const presets = [
  { id: "clean", name: "Clean Studio" },
  { id: "crunch", name: "Tube Crunch" },
  { id: "metal", name: "High Gain Metal" },
  { id: "blues", name: "Blues Overdrive" },
  { id: "ambient", name: "Ambient Space" },
]

export function VirtualPedal() {
  const [activeEffect, setActiveEffect] = useState("distortion")
  const [gain, setGain] = useState([50])
  const [tone, setTone] = useState([60])
  const [level, setLevel] = useState([70])
  const [mix, setMix] = useState([40])
  const [isActive, setIsActive] = useState(true)

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Essayez la pédale en direct</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Testez nos effets directement dans votre navigateur. Connectez votre interface audio pour une expérience
            complète.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Effect selector */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Effets disponibles</h3>
              <div className="grid grid-cols-2 gap-2">
                {effectTypes.map((effect) => (
                  <Button
                    key={effect.id}
                    variant={activeEffect === effect.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveEffect(effect.id)}
                  >
                    <div className={`w-3 h-3 rounded-full ${effect.color} mr-2`} />
                    {effect.name}
                  </Button>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Preset</h4>
                <Select defaultValue="clean">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.map((preset) => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Main pedal */}
          <Card className="bg-card border-2 border-border">
            <CardContent className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${isActive ? "bg-accent animate-pulse" : "bg-muted"}`} />
                  <span className="font-bold text-lg uppercase tracking-wider">
                    {effectTypes.find((e) => e.id === activeEffect)?.name}
                  </span>
                </div>
                <Badge variant="outline">AI Enhanced</Badge>
              </div>

              {/* Knobs */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary border-4 border-border flex items-center justify-center mb-2 relative">
                    <span className="text-lg font-bold">{gain[0]}</span>
                    <div
                      className="absolute inset-0 rounded-full border-4 border-primary"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + gain[0] * 0.5}% 0%, ${50 + gain[0] * 0.5}% 50%)`,
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium">GAIN</p>
                  <Slider value={gain} onValueChange={setGain} max={100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary border-4 border-border flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">{tone[0]}</span>
                  </div>
                  <p className="text-sm font-medium">TONE</p>
                  <Slider value={tone} onValueChange={setTone} max={100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary border-4 border-border flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">{level[0]}</span>
                  </div>
                  <p className="text-sm font-medium">LEVEL</p>
                  <Slider value={level} onValueChange={setLevel} max={100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-secondary border-4 border-border flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">{mix[0]}</span>
                  </div>
                  <p className="text-sm font-medium">MIX</p>
                  <Slider value={mix} onValueChange={setMix} max={100} className="mt-2" />
                </div>
              </div>

              {/* Footswitch */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`w-24 h-24 rounded-full border-4 ${
                    isActive ? "bg-primary border-primary/50" : "bg-secondary border-border"
                  } flex items-center justify-center transition-all hover:scale-105 active:scale-95`}
                >
                  <Power className={`w-8 h-8 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Audio I/O */}
              <div>
                <h3 className="font-semibold mb-4">Audio I/O</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Input</span>
                    </div>
                    <Select defaultValue="interface">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interface">Interface Audio</SelectItem>
                        <SelectItem value="mic">Microphone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Output</span>
                    </div>
                    <Select defaultValue="speakers">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speakers">Haut-parleurs</SelectItem>
                        <SelectItem value="headphones">Casque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Monitoring */}
              <div>
                <h3 className="font-semibold mb-4">Monitoring</h3>
                <div className="h-16 rounded-lg bg-secondary flex items-end gap-1 p-2 overflow-hidden">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary rounded-t"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Save className="w-4 h-4 mr-2" />
                  Sauver
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>

              {/* AI Mode */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Mode IA</span>
                  <Switch />
                </div>
                <p className="text-xs text-muted-foreground">
                  Active la modélisation neuronale NAM/DDSP pour un son plus réaliste.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
