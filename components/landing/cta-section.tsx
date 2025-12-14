import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Music } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8">
          <Music className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white text-balance">
          Prêt à révolutionner votre pratique musicale ?
        </h2>

        <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Rejoignez plus de 50 000 musiciens qui utilisent Séverino El pour apprendre, créer et partager leur passion.
          Commencez gratuitement dès aujourd'hui.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-lg">
            <Link href="/inscription" className="flex items-center gap-2">
              Créer mon compte gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
          >
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-white/60">Aucune carte de crédit requise • Configuration en 2 minutes</p>
      </div>
    </section>
  )
}
