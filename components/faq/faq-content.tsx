"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, HelpCircle, Mail, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", label: "Toutes" },
  { id: "compte", label: "Compte" },
  { id: "abonnement", label: "Abonnement" },
  { id: "cours", label: "Cours" },
  { id: "social", label: "Social" },
  { id: "effets", label: "Effets" },
  { id: "marketplace", label: "Marketplace" },
  { id: "technique", label: "Technique" },
]

const faqs = [
  // Compte
  {
    category: "compte",
    question: "Comment créer un compte Séverino El ?",
    answer:
      "Cliquez sur 'Commencer gratuitement' en haut de la page. Remplissez le formulaire avec votre email, créez un mot de passe sécurisé, et confirmez votre email via le lien reçu. Vous pouvez aussi vous inscrire avec Google, Facebook ou Apple.",
  },
  {
    category: "compte",
    question: "J'ai oublié mon mot de passe, que faire ?",
    answer:
      "Sur la page de connexion, cliquez sur 'Mot de passe oublié'. Entrez votre email et vous recevrez un lien de réinitialisation valable 24 heures. Si vous ne recevez pas l'email, vérifiez vos spams ou contactez le support.",
  },
  {
    category: "compte",
    question: "Comment supprimer mon compte ?",
    answer:
      "Rendez-vous dans Paramètres > Compte > Supprimer mon compte. Cette action est irréversible. Vos données seront supprimées sous 30 jours. Les données de facturation sont conservées 10 ans conformément à la loi.",
  },
  {
    category: "compte",
    question: "Puis-je créer un compte pour mon enfant ?",
    answer:
      "Oui, les enfants de 13 ans et plus peuvent utiliser Séverino El avec le consentement parental. Vous pouvez créer un compte familial avec contrôle parental avancé (filtres de contenu, limitations horaires, supervision).",
  },
  {
    category: "compte",
    question: "Comment modifier mes informations personnelles ?",
    answer:
      "Accédez à Paramètres > Profil pour modifier votre nom, photo, bio et informations musicales. Pour changer votre email, une vérification sera envoyée à l'ancienne et nouvelle adresse.",
  },
  // Abonnement
  {
    category: "abonnement",
    question: "Quels sont les différents abonnements disponibles ?",
    answer:
      "Nous proposons 4 formules : Gratuit (fonctionnalités de base), Premium (9,99€/mois - coach IA, jam illimitées), Pro (24,99€/mois - tout inclus + live HD), Studio (99€/mois - multi-utilisateurs pour écoles). Économisez 17% avec l'abonnement annuel.",
  },
  {
    category: "abonnement",
    question: "Comment annuler mon abonnement ?",
    answer:
      "Dans Paramètres > Abonnement > Gérer, cliquez sur 'Annuler'. Votre accès reste actif jusqu'à la fin de la période payée. Vous pouvez réactiver à tout moment. Garantie satisfait ou remboursé 30 jours.",
  },
  {
    category: "abonnement",
    question: "Puis-je changer de formule en cours d'abonnement ?",
    answer:
      "Oui, vous pouvez upgrader ou downgrader à tout moment. Pour un upgrade, la différence est calculée au prorata. Pour un downgrade, le changement prend effet au prochain cycle de facturation.",
  },
  {
    category: "abonnement",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les cartes Visa, Mastercard, American Express via Stripe (paiement sécurisé). PayPal est disponible dans certains pays. Les virements bancaires sont possibles pour les abonnements Studio.",
  },
  {
    category: "abonnement",
    question: "Comment obtenir une facture ?",
    answer:
      "Toutes vos factures sont disponibles dans Paramètres > Abonnement > Historique des factures. Vous pouvez les télécharger en PDF. Pour une facture avec TVA intracommunautaire, ajoutez votre numéro de TVA dans les paramètres de facturation.",
  },
  // Cours
  {
    category: "cours",
    question: "Comment accéder aux cours ?",
    answer:
      "Depuis le menu 'École', parcourez notre catalogue de plus de 500 cours. Les cours gratuits sont accessibles à tous. Les cours premium nécessitent un abonnement Premium ou supérieur. Cliquez sur un cours pour voir son contenu détaillé.",
  },
  {
    category: "cours",
    question: "Puis-je télécharger les cours pour les regarder hors ligne ?",
    answer:
      "Oui, avec un abonnement Premium ou supérieur, vous pouvez télécharger les cours sur l'application mobile pour un visionnage hors ligne. Les téléchargements expirent après 30 jours et doivent être renouvelés.",
  },
  {
    category: "cours",
    question: "Comment fonctionne le coach IA ?",
    answer:
      "Le coach IA analyse votre jeu en temps réel via le micro de votre appareil. Il évalue la justesse, le rythme et la technique, puis vous donne des feedbacks personnalisés. Disponible avec l'abonnement Premium et supérieur.",
  },
  {
    category: "cours",
    question: "Puis-je suivre plusieurs parcours en même temps ?",
    answer:
      "Oui, vous pouvez suivre autant de parcours que vous le souhaitez. Votre progression est sauvegardée individuellement pour chaque cours. L'IA peut vous recommander un parcours optimal basé sur vos objectifs.",
  },
  {
    category: "cours",
    question: "Comment obtenir une certification ?",
    answer:
      "Complétez tous les modules d'un niveau (débutant, intermédiaire, avancé, expert) avec un score minimum de 80%. Passez l'examen final supervisé. La certification Séverino El est reconnue par nos partenaires pédagogiques.",
  },
  // Social
  {
    category: "social",
    question: "Comment organiser une jam session ?",
    answer:
      "Cliquez sur 'Créer une jam' dans la section Social. Définissez le style musical, le niveau requis, la date/heure et le nombre de participants (jusqu'à 8). Partagez le lien ou laissez le matchmaking trouver des musiciens compatibles.",
  },
  {
    category: "social",
    question: "Quelle est la latence des jam sessions ?",
    answer:
      "Notre technologie WebRTC optimisée offre une latence inférieure à 10ms en conditions optimales. Pour de meilleurs résultats, utilisez une connexion filaire, fermez les applications gourmandes en bande passante.",
  },
  {
    category: "social",
    question: "Comment faire un live stream ?",
    answer:
      "Avec un compte Pro ou Studio, accédez à Social > Lives > Créer un live. Configurez le titre, la description, les paramètres de qualité. Vous pouvez streamer via le navigateur ou OBS (clé RTMP fournie).",
  },
  {
    category: "social",
    question: "Comment signaler un contenu inapproprié ?",
    answer:
      "Cliquez sur les trois points (...) sur n'importe quel contenu et sélectionnez 'Signaler'. Choisissez la raison (harcèlement, contenu adulte, spam, copyright...). Notre équipe examine chaque signalement sous 24h.",
  },
  {
    category: "social",
    question: "Comment bloquer un utilisateur ?",
    answer:
      "Sur le profil de l'utilisateur, cliquez sur les trois points > 'Bloquer'. L'utilisateur bloqué ne pourra plus voir votre profil, vous envoyer de messages ou interagir avec vos publications.",
  },
  // Effets
  {
    category: "effets",
    question: "Comment utiliser la pédale d'effets virtuelle ?",
    answer:
      "Téléchargez le plugin VST3/AU/AAX depuis la section Effets. Installez-le dans votre DAW (Logic, Ableton, Pro Tools...). Activez votre licence avec votre compte Séverino El. 100+ effets disponibles avec l'abonnement Pro.",
  },
  {
    category: "effets",
    question: "Quelle est la latence de la pédale virtuelle ?",
    answer:
      "La pédale Séverino El est optimisée pour une latence inférieure à 2ms avec une carte son professionnelle. Nous recommandons une interface audio avec buffer de 64 ou 128 samples.",
  },
  {
    category: "effets",
    question: "Puis-je utiliser mes propres presets ?",
    answer:
      "Oui, vous pouvez créer, sauvegarder et partager vos propres presets. Les presets sont synchronisés via le cloud entre tous vos appareils. Vous pouvez aussi vendre vos presets sur le marketplace.",
  },
  {
    category: "effets",
    question: "Les effets fonctionnent-ils sur mobile ?",
    answer:
      "Oui, l'application mobile inclut une version simplifiée de la pédale d'effets. Pour une utilisation professionnelle avec latence minimale, nous recommandons la version desktop ou le hardware dédié.",
  },
  // Marketplace
  {
    category: "marketplace",
    question: "Comment vendre sur le marketplace ?",
    answer:
      "Créez un compte vendeur dans Marketplace > Devenir vendeur. Fournissez vos informations fiscales, acceptez les conditions. Uploadez vos produits (presets, partitions, cours). Commission de 15-30% selon la catégorie.",
  },
  {
    category: "marketplace",
    question: "Quand suis-je payé pour mes ventes ?",
    answer:
      "Les paiements sont effectués mensuellement, le 15 de chaque mois, pour les ventes du mois précédent. Minimum de retrait : 50€. Méthodes : virement bancaire (gratuit) ou PayPal (frais 2%).",
  },
  {
    category: "marketplace",
    question: "Puis-je demander un remboursement ?",
    answer:
      "Pour les produits numériques, le remboursement est possible dans les 14 jours si le produit n'a pas été téléchargé/utilisé. Pour les cours privés, annulation gratuite 24h avant la session.",
  },
  {
    category: "marketplace",
    question: "Comment protéger mes créations du piratage ?",
    answer:
      "Nous utilisons un système de DRM léger et un watermarking audio invisible. Les téléchargements sont limités et tracés. En cas de piratage avéré, nous prenons des mesures légales.",
  },
  // Technique
  {
    category: "technique",
    question: "Quelles sont les configurations requises ?",
    answer:
      "Web : navigateur moderne (Chrome, Firefox, Safari, Edge). Desktop : Windows 10+, macOS 10.15+, 4GB RAM minimum. Mobile : iOS 14+ ou Android 10+. Pour les effets audio : interface audio recommandée.",
  },
  {
    category: "technique",
    question: "L'audio ne fonctionne pas, que faire ?",
    answer:
      "Vérifiez que votre navigateur a l'autorisation d'accéder au micro. Assurez-vous qu'aucune autre application n'utilise le micro. Testez avec différents navigateurs. Si le problème persiste, contactez le support avec les détails de votre configuration.",
  },
  {
    category: "technique",
    question: "Comment améliorer la qualité des jam sessions ?",
    answer:
      "Utilisez une connexion filaire Ethernet, fermez les autres applications, utilisez un casque audio (évite le retour), choisissez le serveur le plus proche de votre localisation dans les paramètres.",
  },
  {
    category: "technique",
    question: "Mes données sont-elles synchronisées entre appareils ?",
    answer:
      "Oui, votre progression, presets, favoris et paramètres sont automatiquement synchronisés via le cloud. Connectez-vous avec le même compte sur tous vos appareils.",
  },
  {
    category: "technique",
    question: "Comment exporter mes enregistrements ?",
    answer:
      "Dans la section Cloud > Mes enregistrements, sélectionnez les fichiers et cliquez sur 'Exporter'. Formats disponibles : WAV, MP3, FLAC. Les projets multipistes peuvent être exportés en stems séparés.",
  },
]

export function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
          <HelpCircle className="w-3 h-3 mr-1" />
          Centre d'aide
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Foire Aux Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions les plus fréquentes sur Séverino El.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Rechercher une question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 text-lg"
        />
      </div>

      {/* Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-center">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* FAQ List */}
      <Accordion type="single" collapsible className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline text-left">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 capitalize">
                  {faq.category}
                </Badge>
                <span>{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pl-20">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Aucun résultat trouvé pour votre recherche.</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Réinitialiser la recherche
          </Button>
        </div>
      )}

      {/* Contact Section */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-muted-foreground mb-6">Notre équipe de support est disponible pour vous aider 7j/7.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contacter le support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:wendpayangdeseverinbouda@gmail.com" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+22666640077" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +226 66 64 00 77
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
