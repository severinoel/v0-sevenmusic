"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const genres = ["Rock", "Jazz", "Blues", "Metal", "Pop", "Funk", "Classical", "Electronic"]
const instruments = ["Guitare", "Basse", "Piano", "Batterie", "Voix", "Synthé"]
const formats = [".severino", "Guitar Pro", "PDF", "MIDI", "WAV", "MP3"]

export function MarketplaceSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100])

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prix */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Prix: {priceRange[0]}€ - {priceRange[1]}€
          </Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="mt-2" />
        </div>

        <Accordion type="multiple" defaultValue={["genres", "instruments"]}>
          {/* Genres */}
          <AccordionItem value="genres">
            <AccordionTrigger className="text-sm font-medium">Genres</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox id={genre} />
                    <Label htmlFor={genre} className="text-sm font-normal cursor-pointer">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Instruments */}
          <AccordionItem value="instruments">
            <AccordionTrigger className="text-sm font-medium">Instruments</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {instruments.map((instrument) => (
                  <div key={instrument} className="flex items-center space-x-2">
                    <Checkbox id={instrument} />
                    <Label htmlFor={instrument} className="text-sm font-normal cursor-pointer">
                      {instrument}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Formats */}
          <AccordionItem value="formats">
            <AccordionTrigger className="text-sm font-medium">Formats</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {formats.map((format) => (
                  <div key={format} className="flex items-center space-x-2">
                    <Checkbox id={format} />
                    <Label htmlFor={format} className="text-sm font-normal cursor-pointer">
                      {format}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            Réinitialiser
          </Button>
          <Button className="flex-1">Appliquer</Button>
        </div>
      </CardContent>
    </Card>
  )
}
