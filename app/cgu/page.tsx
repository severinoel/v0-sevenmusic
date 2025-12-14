import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"

export default function CGUPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LegalPageLayout
          title="Conditions Générales d'Utilisation"
          lastUpdated="7 décembre 2025"
          sections={cguSections}
        />
      </main>
      <Footer />
    </div>
  )
}

const cguSections = [
  {
    id: "introduction",
    title: "1. Introduction et Acceptation",
    content: `
      <p>Bienvenue sur Séverino El, la plateforme musicale complète. Les présentes Conditions Générales d'Utilisation (« CGU ») régissent votre accès et votre utilisation de la plateforme Séverino El, incluant l'ensemble de ses services : école de musique en ligne, réseau social musical, pédale d'effets virtuelle, marketplace et outils collaboratifs.</p>
      
      <p>En accédant à Séverino El ou en utilisant nos services, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.</p>
      
      <h4>1.1 Définitions</h4>
      <ul>
        <li><strong>« Plateforme »</strong> : l'ensemble des services Séverino El accessibles via le site web, les applications mobiles et desktop.</li>
        <li><strong>« Utilisateur »</strong> : toute personne physique ou morale utilisant la Plateforme.</li>
        <li><strong>« Contenu »</strong> : tout élément publié sur la Plateforme (textes, images, audio, vidéos, partitions, presets).</li>
        <li><strong>« Services Premium »</strong> : services payants nécessitant un abonnement.</li>
      </ul>
    `,
  },
  {
    id: "inscription",
    title: "2. Inscription et Compte Utilisateur",
    content: `
      <h4>2.1 Conditions d'inscription</h4>
      <p>Pour utiliser Séverino El, vous devez :</p>
      <ul>
        <li>Avoir au moins 13 ans (ou l'âge minimum requis dans votre pays)</li>
        <li>Fournir des informations exactes et complètes lors de l'inscription</li>
        <li>Maintenir la confidentialité de vos identifiants de connexion</li>
        <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
      </ul>
      
      <h4>2.2 Comptes pour mineurs</h4>
      <p>Les utilisateurs de moins de 18 ans doivent obtenir le consentement d'un parent ou tuteur légal. Les parents peuvent créer des comptes familiaux avec contrôles parentaux avancés.</p>
      
      <h4>2.3 Types de comptes</h4>
      <ul>
        <li><strong>Compte Gratuit</strong> : accès limité aux fonctionnalités de base</li>
        <li><strong>Compte Premium</strong> : accès étendu avec coach IA et jam sessions</li>
        <li><strong>Compte Pro</strong> : accès complet incluant live streaming HD et stockage illimité</li>
        <li><strong>Compte Studio</strong> : solution multi-utilisateurs pour écoles et studios</li>
      </ul>
    `,
  },
  {
    id: "services",
    title: "3. Description des Services",
    content: `
      <h4>3.1 École de Musique en Ligne</h4>
      <p>Séverino El propose des cours vidéo interactifs, exercices pratiques, et coaching par intelligence artificielle. Les cours sont dispensés par des professeurs certifiés et validés par notre comité pédagogique.</p>
      
      <h4>3.2 Réseau Social Musical</h4>
      <p>Notre réseau social permet de :</p>
      <ul>
        <li>Publier et partager des créations musicales</li>
        <li>Organiser et participer à des jam sessions en temps réel</li>
        <li>Diffuser des live streams</li>
        <li>Collaborer avec d'autres musiciens</li>
      </ul>
      
      <h4>3.3 Pédale d'Effets Virtuelle</h4>
      <p>Notre pédale d'effets professionnelle offre plus de 100 effets avec modélisation IA, disponible en formats VST3, AAX et AU.</p>
      
      <h4>3.4 Marketplace</h4>
      <p>Le marketplace permet l'achat et la vente de presets, partitions, cours privés et services professionnels.</p>
      
      <h4>3.5 Cloud Collaboratif</h4>
      <p>Stockage sécurisé et synchronisation multi-appareils pour tous vos projets musicaux.</p>
    `,
  },
  {
    id: "regles-communaute",
    title: "4. Règles de la Communauté",
    content: `
      <h4>4.1 Comportements interdits</h4>
      <p>Sur Séverino El, il est strictement interdit de :</p>
      <ul>
        <li>Publier du contenu haineux, discriminatoire ou harcelant</li>
        <li>Diffuser du contenu pour adultes ou inapproprié pour les mineurs</li>
        <li>Violer les droits d'auteur ou la propriété intellectuelle</li>
        <li>Utiliser la plateforme pour des activités illégales</li>
        <li>Créer de faux profils ou usurper l'identité d'autrui</li>
        <li>Spammer ou promouvoir des contenus non sollicités</li>
        <li>Manipuler les algorithmes ou les systèmes de gamification</li>
        <li>Collecter des données personnelles d'autres utilisateurs</li>
      </ul>
      
      <h4>4.2 Modération</h4>
      <p>Notre équipe de modération (IA + humaine) surveille les contenus publiés. En cas de violation :</p>
      <ul>
        <li>Premier avertissement : notification et suppression du contenu</li>
        <li>Deuxième avertissement : suspension temporaire (7 jours)</li>
        <li>Troisième avertissement : suspension prolongée (30 jours)</li>
        <li>Violations graves : bannissement permanent</li>
      </ul>
    `,
  },
  {
    id: "propriete-intellectuelle",
    title: "5. Propriété Intellectuelle",
    content: `
      <h4>5.1 Contenus de Séverino El</h4>
      <p>Tous les éléments de la plateforme (logo, design, code, cours officiels) sont la propriété exclusive de Séverino El et protégés par les lois sur la propriété intellectuelle.</p>
      
      <h4>5.2 Contenus des utilisateurs</h4>
      <p>Vous conservez la propriété de vos créations originales. En publiant sur Séverino El, vous nous accordez une licence non exclusive, mondiale et gratuite pour diffuser, afficher et promouvoir vos contenus sur la plateforme.</p>
      
      <h4>5.3 Reprises et covers</h4>
      <p>Pour les reprises de morceaux protégés :</p>
      <ul>
        <li>Les utilisateurs sont responsables d'obtenir les licences nécessaires</li>
        <li>Séverino El peut faciliter l'obtention de licences via nos partenaires</li>
        <li>Les revenus générés respectent les accords de royalties en vigueur</li>
      </ul>
      
      <h4>5.4 Détection de copyright</h4>
      <p>Notre système détecte automatiquement les contenus protégés. Les contenus en infraction peuvent être supprimés sans préavis.</p>
    `,
  },
  {
    id: "abonnements",
    title: "6. Abonnements et Paiements",
    content: `
      <h4>6.1 Tarification</h4>
      <p>Les prix des abonnements sont affichés en euros (EUR) et incluent les taxes applicables. Séverino El se réserve le droit de modifier les tarifs avec un préavis de 30 jours.</p>
      
      <h4>6.2 Facturation</h4>
      <ul>
        <li>Les abonnements sont facturés mensuellement ou annuellement selon votre choix</li>
        <li>Le renouvellement est automatique sauf résiliation</li>
        <li>Les factures sont disponibles dans votre espace personnel</li>
      </ul>
      
      <h4>6.3 Remboursements</h4>
      <p>Conformément à notre garantie satisfait ou remboursé :</p>
      <ul>
        <li>Remboursement intégral dans les 30 jours suivant la souscription</li>
        <li>Les achats sur le marketplace sont remboursables selon les conditions du vendeur</li>
        <li>Les cours privés annulés plus de 24h à l'avance sont remboursés</li>
      </ul>
      
      <h4>6.4 Résiliation</h4>
      <p>Vous pouvez résilier votre abonnement à tout moment. L'accès aux services premium reste actif jusqu'à la fin de la période facturée.</p>
    `,
  },
  {
    id: "marketplace",
    title: "7. Règles du Marketplace",
    content: `
      <h4>7.1 Vendeurs</h4>
      <p>Pour vendre sur le marketplace, vous devez :</p>
      <ul>
        <li>Avoir un compte vérifié depuis au moins 30 jours</li>
        <li>Fournir des informations fiscales valides</li>
        <li>Garantir que vos produits sont originaux ou sous licence</li>
        <li>Respecter les standards de qualité Séverino El</li>
      </ul>
      
      <h4>7.2 Commissions</h4>
      <ul>
        <li>Presets et effets : 20% de commission</li>
        <li>Partitions et tablatures : 15% de commission</li>
        <li>Services professionnels : 30% de commission</li>
        <li>Cours privés : 25% de commission</li>
      </ul>
      
      <h4>7.3 Paiements vendeurs</h4>
      <p>Les revenus sont versés mensuellement, avec un minimum de 50€. Les paiements sont effectués par virement bancaire ou PayPal.</p>
    `,
  },
  {
    id: "limitation-responsabilite",
    title: "8. Limitation de Responsabilité",
    content: `
      <h4>8.1 Disponibilité des services</h4>
      <p>Séverino El s'engage à maintenir une disponibilité de 99,9%. Nous ne sommes pas responsables des interruptions dues à :</p>
      <ul>
        <li>Maintenance programmée (annoncée 48h à l'avance)</li>
        <li>Cas de force majeure</li>
        <li>Actes de tiers malveillants</li>
        <li>Problèmes de connexion de l'utilisateur</li>
      </ul>
      
      <h4>8.2 Contenus tiers</h4>
      <p>Séverino El n'est pas responsable des contenus publiés par les utilisateurs ou des produits vendus sur le marketplace par des vendeurs tiers.</p>
      
      <h4>8.3 Limitation des dommages</h4>
      <p>En aucun cas, notre responsabilité ne pourra excéder le montant des abonnements payés au cours des 12 derniers mois.</p>
    `,
  },
  {
    id: "modifications",
    title: "9. Modifications des CGU",
    content: `
      <p>Séverino El se réserve le droit de modifier ces CGU à tout moment. Les modifications seront communiquées par :</p>
      <ul>
        <li>Email aux utilisateurs inscrits</li>
        <li>Notification dans l'application</li>
        <li>Bandeau d'information sur le site</li>
      </ul>
      <p>La poursuite de l'utilisation de la plateforme après notification vaut acceptation des nouvelles conditions.</p>
    `,
  },
  {
    id: "juridiction",
    title: "10. Droit Applicable et Juridiction",
    content: `
      <p>Les présentes CGU sont régies par le droit burkinabè. En cas de litige :</p>
      <ul>
        <li>Les parties s'engagent à rechercher une solution amiable</li>
        <li>À défaut, les tribunaux de Ouagadougou seront seuls compétents</li>
      </ul>
      
      <h4>Contact</h4>
      <p>Pour toute question concernant ces CGU :</p>
      <ul>
        <li>Email : <a href="mailto:wendpayangdeseverinbouda@gmail.com" class="text-primary hover:underline">wendpayangdeseverinbouda@gmail.com</a></li>
        <li>Téléphone : <a href="tel:+22666640077" class="text-primary hover:underline">+226 66 64 00 77</a></li>
      </ul>
    `,
  },
]
