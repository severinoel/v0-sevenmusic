import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

const quickFaqs = [
  {
    question: "Comment puis-je réinitialiser mon mot de passe ?",
    answer:
      "Rendez-vous sur la page de connexion et cliquez sur 'Mot de passe oublié'. Un email avec un lien de réinitialisation vous sera envoyé dans les minutes qui suivent.",
  },
  {
    question: "Comment annuler mon abonnement ?",
    answer:
      "Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte, section 'Abonnement'. Votre accès restera actif jusqu'à la fin de la période payée.",
  },
  {
    question: "Les cours sont-ils accessibles hors ligne ?",
    answer:
      "Oui, les abonnés Premium et supérieurs peuvent télécharger les cours vidéo pour un visionnage hors ligne via l'application mobile.",
  },
  {
    question: "Comment devenir professeur sur Séverino El ?",
    answer:
      "Remplissez notre formulaire de candidature professeur. Notre équipe pédagogique examinera votre profil et vous contactera pour un entretien dans un délai de 72h.",
  },
]

export function ContactFaq() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Questions fréquentes</h2>
        <p className="text-muted-foreground">Réponses rapides aux questions courantes</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {quickFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
        <Button asChild variant="outline">
          <Link href="/faq">
            <HelpCircle className="w-4 h-4 mr-2" />
            Voir toute la FAQ
          </Link>
        </Button>
      </div>
    </div>
  )
}
