import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"

export default function CommunityRulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LegalPageLayout
          title="Règles de la Communauté Séverino El"
          lastUpdated="7 décembre 2025"
          sections={rulesSections}
        />
      </main>
      <Footer />
    </div>
  )
}

const rulesSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `
      <p>Bienvenue dans la communauté Séverino El ! Ces règles ont été créées pour garantir un environnement sûr, respectueux et inspirant pour tous les musiciens. En utilisant notre plateforme, vous acceptez de respecter ces règles.</p>
      
      <p>Notre communauté est fondée sur des valeurs de <strong>respect mutuel</strong>, de <strong>créativité</strong>, de <strong>collaboration</strong> et de <strong>bienveillance</strong>. Ensemble, créons un espace où chaque musicien peut s'épanouir.</p>
    `,
  },
  {
    id: "respect",
    title: "1. Respect et Bienveillance",
    content: `
      <h4>1.1 Tolérance zéro pour la haine</h4>
      <p>Sont strictement interdits :</p>
      <ul>
        <li>Les propos discriminatoires (racisme, sexisme, homophobie, etc.)</li>
        <li>Le harcèlement sous toutes ses formes</li>
        <li>Les menaces ou incitations à la violence</li>
        <li>Les insultes et attaques personnelles</li>
        <li>Le dénigrement du travail d'autrui</li>
      </ul>
      
      <h4>1.2 Feedback constructif</h4>
      <p>Lorsque vous commentez le travail d'un autre musicien :</p>
      <ul>
        <li>Restez constructif et bienveillant</li>
        <li>Commencez par les points positifs</li>
        <li>Formulez les suggestions avec respect</li>
        <li>Évitez les critiques non sollicitées</li>
      </ul>
      
      <h4>1.3 Communication respectueuse</h4>
      <ul>
        <li>Pas de majuscules excessives (CRIER)</li>
        <li>Pas de spam ou messages répétitifs</li>
        <li>Respectez la langue et la culture de chacun</li>
        <li>Acceptez les opinions différentes</li>
      </ul>
    `,
  },
  {
    id: "contenu",
    title: "2. Règles de Contenu",
    content: `
      <h4>2.1 Contenu autorisé</h4>
      <ul>
        <li>Compositions originales et performances</li>
        <li>Reprises avec mention des auteurs originaux</li>
        <li>Tutoriels et contenus éducatifs</li>
        <li>Discussions et partages musicaux</li>
        <li>Collaborations et projets créatifs</li>
      </ul>
      
      <h4>2.2 Contenu interdit</h4>
      <ul>
        <li>Contenu pour adultes ou à caractère sexuel</li>
        <li>Violence graphique ou choquante</li>
        <li>Contenu illégal ou promouvant des activités illégales</li>
        <li>Publicité non autorisée ou spam</li>
        <li>Désinformation ou fake news</li>
        <li>Contenu mettant en danger des mineurs</li>
      </ul>
      
      <h4>2.3 Propriété intellectuelle</h4>
      <ul>
        <li>Ne publiez que du contenu dont vous détenez les droits</li>
        <li>Pour les reprises, mentionnez toujours l'auteur original</li>
        <li>Respectez les licences des samples et loops utilisés</li>
        <li>Ne partagez pas de contenu piraté</li>
      </ul>
    `,
  },
  {
    id: "profil",
    title: "3. Règles de Profil",
    content: `
      <h4>3.1 Identité authentique</h4>
      <ul>
        <li>Utilisez votre vrai nom ou un pseudonyme artistique</li>
        <li>N'usurpez pas l'identité d'une autre personne</li>
        <li>Une seule compte par personne (sauf comptes professionnels)</li>
        <li>Les informations de profil doivent être exactes</li>
      </ul>
      
      <h4>3.2 Photo de profil</h4>
      <ul>
        <li>Pas de nudité ou contenu inapproprié</li>
        <li>Pas de symboles haineux ou offensants</li>
        <li>Pas d'images protégées par copyright d'autrui</li>
      </ul>
      
      <h4>3.3 Comptes vérifiés</h4>
      <p>Les badges de vérification sont réservés aux :</p>
      <ul>
        <li>Artistes professionnels reconnus</li>
        <li>Professeurs certifiés</li>
        <li>Partenaires officiels</li>
      </ul>
    `,
  },
  {
    id: "live",
    title: "4. Règles Live et Jam Sessions",
    content: `
      <h4>4.1 Comportement en live</h4>
      <ul>
        <li>Restez habillé de manière appropriée</li>
        <li>Pas de consommation visible de substances illicites</li>
        <li>Modérez les propos tenus en direct</li>
        <li>Respectez les participants et le chat</li>
      </ul>
      
      <h4>4.2 Jam sessions</h4>
      <ul>
        <li>Respectez les tours de parole/jeu</li>
        <li>Adaptez-vous au niveau du groupe</li>
        <li>Soyez ponctuel aux sessions planifiées</li>
        <li>Prévenez en cas d'annulation</li>
      </ul>
      
      <h4>4.3 Streaming externe</h4>
      <ul>
        <li>Demandez le consentement avant de diffuser ailleurs</li>
        <li>Respectez les droits des participants</li>
        <li>Mentionnez Séverino El si vous repartagez</li>
      </ul>
    `,
  },
  {
    id: "marketplace",
    title: "5. Règles Marketplace",
    content: `
      <h4>5.1 Vendeurs</h4>
      <ul>
        <li>Décrivez honnêtement vos produits</li>
        <li>Ne vendez que des créations originales ou sous licence</li>
        <li>Répondez aux questions des acheteurs</li>
        <li>Respectez les délais de livraison</li>
        <li>Honorez les demandes de remboursement légitimes</li>
      </ul>
      
      <h4>5.2 Acheteurs</h4>
      <ul>
        <li>Respectez les conditions d'utilisation des produits</li>
        <li>Ne redistribuez pas les produits achetés</li>
        <li>Laissez des avis honnêtes et constructifs</li>
      </ul>
      
      <h4>5.3 Produits interdits</h4>
      <ul>
        <li>Copies de produits existants</li>
        <li>Contenu volé ou piraté</li>
        <li>Produits trompeurs ou frauduleux</li>
      </ul>
    `,
  },
  {
    id: "mineurs",
    title: "6. Protection des Mineurs",
    content: `
      <h4>6.1 Interactions avec les mineurs</h4>
      <ul>
        <li>Tout comportement inapproprié envers un mineur est strictement interdit</li>
        <li>Ne sollicitez jamais d'informations personnelles à un mineur</li>
        <li>Les cours privés avec mineurs nécessitent l'accord parental</li>
        <li>Signalez tout comportement suspect à notre équipe</li>
      </ul>
      
      <h4>6.2 Responsabilité parentale</h4>
      <ul>
        <li>Les parents sont responsables de l'utilisation par leurs enfants</li>
        <li>Utilisez les contrôles parentaux disponibles</li>
        <li>Supervisez les interactions de vos enfants</li>
      </ul>
    `,
  },
  {
    id: "sanctions",
    title: "7. Sanctions",
    content: `
      <h4>7.1 Processus de modération</h4>
      <p>Notre équipe (IA + humaine) surveille les contenus et comportements. En cas de violation :</p>
      
      <h4>7.2 Échelle des sanctions</h4>
      <ul>
        <li><strong>Avertissement</strong> : notification et suppression du contenu</li>
        <li><strong>Suspension 7 jours</strong> : après récidive</li>
        <li><strong>Suspension 30 jours</strong> : violations répétées</li>
        <li><strong>Bannissement permanent</strong> : violations graves</li>
      </ul>
      
      <h4>7.3 Violations graves (ban immédiat)</h4>
      <ul>
        <li>Contenu pédophile ou mettant en danger des mineurs</li>
        <li>Menaces de mort ou violence réelle</li>
        <li>Harcèlement grave ou doxxing</li>
        <li>Activités illégales avérées</li>
        <li>Usurpation d'identité malveillante</li>
      </ul>
      
      <h4>7.4 Appel</h4>
      <p>Vous pouvez contester une sanction en contactant support@severinoel.com dans les 14 jours.</p>
    `,
  },
  {
    id: "signalement",
    title: "8. Comment Signaler",
    content: `
      <h4>8.1 Signaler un contenu</h4>
      <p>Cliquez sur les trois points (...) sur n'importe quel contenu > Signaler. Choisissez la raison appropriée.</p>
      
      <h4>8.2 Signaler un utilisateur</h4>
      <p>Sur le profil > trois points > Signaler ce profil.</p>
      
      <h4>8.3 Urgence</h4>
      <p>En cas de danger imminent ou de contenu illégal grave, contactez :</p>
      <ul>
        <li>Email urgent : wendpayangdeseverinbouda@gmail.com (objet : URGENT)</li>
        <li>Téléphone : +226 66 64 00 77</li>
      </ul>
      
      <h4>8.4 Confidentialité</h4>
      <p>Les signalements sont traités de manière confidentielle. L'identité du signalant n'est jamais révélée.</p>
    `,
  },
  {
    id: "remerciements",
    title: "9. Ensemble pour une communauté positive",
    content: `
      <p>Ces règles existent pour créer un espace où chaque musicien peut :</p>
      <ul>
        <li>Apprendre et progresser sereinement</li>
        <li>Partager sa passion sans crainte</li>
        <li>Collaborer dans le respect mutuel</li>
        <li>S'inspirer et inspirer les autres</li>
      </ul>
      
      <p>Merci de faire partie de la communauté Séverino El et de contribuer à la rendre meilleure chaque jour !</p>
      
      <p>Pour toute question : <a href="mailto:wendpayangdeseverinbouda@gmail.com">wendpayangdeseverinbouda@gmail.com</a> | <a href="tel:+22666640077">+226 66 64 00 77</a></p>
    `,
  },
]
