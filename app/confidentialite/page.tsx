import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LegalPageLayout
          title="Politique de Confidentialité"
          lastUpdated="7 décembre 2025"
          sections={privacySections}
        />
      </main>
      <Footer />
    </div>
  )
}

const privacySections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `
      <p>Chez Séverino El, la protection de vos données personnelles est une priorité absolue. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations.</p>
      
      <p>Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et les législations locales applicables en matière de protection des données.</p>
      
      <h4>Responsable du traitement</h4>
      <p>Séverino El<br>
      Email : wendpayangdeseverinbouda@gmail.com<br>
      Téléphone : +226 66 64 00 77<br>
      Burkina Faso</p>
    `,
  },
  {
    id: "donnees-collectees",
    title: "2. Données Collectées",
    content: `
      <h4>2.1 Données fournies directement</h4>
      <ul>
        <li><strong>Identité</strong> : nom, prénom, pseudonyme, photo de profil</li>
        <li><strong>Contact</strong> : adresse email, numéro de téléphone</li>
        <li><strong>Profil musical</strong> : instruments, niveau, genres préférés</li>
        <li><strong>Paiement</strong> : informations de carte bancaire (traitées par Stripe)</li>
        <li><strong>Contenu</strong> : enregistrements audio/vidéo, compositions, messages</li>
      </ul>
      
      <h4>2.2 Données collectées automatiquement</h4>
      <ul>
        <li><strong>Données techniques</strong> : adresse IP, type de navigateur, système d'exploitation</li>
        <li><strong>Données d'utilisation</strong> : pages visitées, temps passé, actions effectuées</li>
        <li><strong>Données de progression</strong> : scores, exercices complétés, temps de pratique</li>
        <li><strong>Données de géolocalisation</strong> : pays, ville (pour le matchmaking de jam)</li>
      </ul>
      
      <h4>2.3 Données sensibles</h4>
      <p>L'analyse audio/vidéo par notre IA peut traiter des données biométriques (voix, posture). Ces données sont :</p>
      <ul>
        <li>Traitées uniquement avec votre consentement explicite</li>
        <li>Utilisées exclusivement pour améliorer votre apprentissage</li>
        <li>Jamais partagées avec des tiers</li>
        <li>Supprimables à tout moment sur demande</li>
      </ul>
    `,
  },
  {
    id: "utilisation",
    title: "3. Utilisation des Données",
    content: `
      <h4>3.1 Finalités principales</h4>
      <ul>
        <li><strong>Fourniture des services</strong> : accès à la plateforme, cours, fonctionnalités</li>
        <li><strong>Personnalisation</strong> : recommandations de cours, exercices adaptés</li>
        <li><strong>Coach IA</strong> : analyse de votre jeu et feedback personnalisé</li>
        <li><strong>Social</strong> : matchmaking pour jam sessions, suggestions de connexions</li>
        <li><strong>Communication</strong> : notifications, newsletters (avec consentement)</li>
      </ul>
      
      <h4>3.2 Bases légales</h4>
      <ul>
        <li><strong>Exécution du contrat</strong> : fourniture des services souscrits</li>
        <li><strong>Consentement</strong> : marketing, analyse biométrique, cookies non essentiels</li>
        <li><strong>Intérêt légitime</strong> : amélioration des services, prévention des fraudes</li>
        <li><strong>Obligation légale</strong> : conservation des factures, déclarations fiscales</li>
      </ul>
      
      <h4>3.3 Profilage et décisions automatisées</h4>
      <p>Notre IA peut prendre des décisions automatisées concernant :</p>
      <ul>
        <li>Les recommandations de cours et exercices</li>
        <li>Le matchmaking pour les jam sessions</li>
        <li>La détection de contenus inappropriés</li>
      </ul>
      <p>Vous pouvez demander une intervention humaine pour toute décision automatisée vous affectant significativement.</p>
    `,
  },
  {
    id: "partage",
    title: "4. Partage des Données",
    content: `
      <h4>4.1 Sous-traitants</h4>
      <p>Nous partageons vos données avec des prestataires de confiance :</p>
      <ul>
        <li><strong>Hébergement</strong> : Supabase, Cloudflare, Vercel (certifiés ISO 27001)</li>
        <li><strong>Paiements</strong> : Stripe (certifié PCI DSS)</li>
        <li><strong>Analyse</strong> : services d'analytics respectueux de la vie privée</li>
        <li><strong>Support</strong> : outils de ticketing sécurisés</li>
      </ul>
      
      <h4>4.2 Contenus publics</h4>
      <p>Les informations que vous choisissez de rendre publiques (profil, publications, créations) sont visibles par les autres utilisateurs et potentiellement indexées par les moteurs de recherche.</p>
      
      <h4>4.3 Transferts internationaux</h4>
      <p>Certaines données peuvent être transférées hors de l'Union Européenne vers des prestataires situés aux États-Unis ou ailleurs. Ces transferts sont encadrés par :</p>
      <ul>
        <li>Le Data Privacy Framework UE-US</li>
        <li>Des clauses contractuelles types de la Commission Européenne</li>
        <li>Le consentement explicite de l'utilisateur le cas échéant</li>
      </ul>
      
      <h4>4.4 Cas exceptionnels</h4>
      <p>Nous pouvons divulguer vos données si requis par la loi ou pour protéger nos droits, la sécurité de nos utilisateurs, ou en cas de fusion/acquisition.</p>
    `,
  },
  {
    id: "securite",
    title: "5. Sécurité des Données",
    content: `
      <h4>5.1 Mesures techniques</h4>
      <ul>
        <li><strong>Chiffrement</strong> : TLS 1.3 pour les transmissions, AES-256 pour le stockage</li>
        <li><strong>Authentification</strong> : mots de passe hashés (bcrypt), 2FA disponible</li>
        <li><strong>Infrastructure</strong> : serveurs sécurisés, pare-feu, monitoring 24/7</li>
        <li><strong>Tests</strong> : audits de sécurité réguliers, tests de pénétration</li>
      </ul>
      
      <h4>5.2 Mesures organisationnelles</h4>
      <ul>
        <li>Accès aux données limité au personnel autorisé</li>
        <li>Formation continue des équipes à la protection des données</li>
        <li>Procédures de gestion des incidents</li>
        <li>Politique de confidentialité interne stricte</li>
      </ul>
      
      <h4>5.3 Notification des violations</h4>
      <p>En cas de violation de données présentant un risque pour vos droits, nous vous informerons dans les 72 heures et notifierons les autorités compétentes.</p>
    `,
  },
  {
    id: "conservation",
    title: "6. Conservation des Données",
    content: `
      <h4>6.1 Durées de conservation</h4>
      <ul>
        <li><strong>Compte actif</strong> : données conservées pendant toute la durée de votre inscription</li>
        <li><strong>Compte supprimé</strong> : données anonymisées ou supprimées sous 30 jours</li>
        <li><strong>Données de facturation</strong> : 10 ans (obligation légale)</li>
        <li><strong>Logs de connexion</strong> : 1 an</li>
        <li><strong>Messages</strong> : supprimés à la demande ou après inactivité de 3 ans</li>
      </ul>
      
      <h4>6.2 Archivage</h4>
      <p>Certaines données peuvent être archivées pour des besoins légaux ou de résolution de litiges, avec accès restreint.</p>
    `,
  },
  {
    id: "droits",
    title: "7. Vos Droits",
    content: `
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      
      <h4>7.1 Droit d'accès</h4>
      <p>Obtenir une copie de toutes vos données personnelles que nous détenons.</p>
      
      <h4>7.2 Droit de rectification</h4>
      <p>Corriger les données inexactes ou incomplètes vous concernant.</p>
      
      <h4>7.3 Droit à l'effacement</h4>
      <p>Demander la suppression de vos données dans certaines circonstances.</p>
      
      <h4>7.4 Droit à la portabilité</h4>
      <p>Recevoir vos données dans un format structuré et lisible par machine.</p>
      
      <h4>7.5 Droit d'opposition</h4>
      <p>Vous opposer au traitement de vos données pour des motifs légitimes.</p>
      
      <h4>7.6 Droit de limitation</h4>
      <p>Demander la limitation du traitement de vos données dans certains cas.</p>
      
      <h4>7.7 Exercice de vos droits</h4>
      <p>Pour exercer ces droits, contactez-nous à :</p>
      <ul>
        <li>Email : <a href="mailto:wendpayangdeseverinbouda@gmail.com" class="text-primary hover:underline">wendpayangdeseverinbouda@gmail.com</a></li>
        <li>Via votre espace personnel (Paramètres > Confidentialité)</li>
      </ul>
      <p>Nous répondrons dans un délai de 30 jours.</p>
      
      <h4>7.8 Réclamation</h4>
      <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de l'autorité de protection des données de votre pays.</p>
    `,
  },
  {
    id: "mineurs",
    title: "8. Protection des Mineurs",
    content: `
      <p>Séverino El accorde une importance particulière à la protection des mineurs :</p>
      
      <h4>8.1 Âge minimum</h4>
      <p>L'inscription requiert un âge minimum de 13 ans. Les utilisateurs de moins de 18 ans doivent avoir le consentement parental.</p>
      
      <h4>8.2 Comptes familiaux</h4>
      <p>Les parents peuvent :</p>
      <ul>
        <li>Créer des comptes supervisés pour leurs enfants</li>
        <li>Configurer des filtres de contenu</li>
        <li>Limiter les interactions sociales</li>
        <li>Accéder aux rapports de progression</li>
      </ul>
      
      <h4>8.3 Collecte limitée</h4>
      <p>Pour les comptes mineurs, nous limitons la collecte de données au strict nécessaire pour le fonctionnement du service.</p>
    `,
  },
  {
    id: "modifications",
    title: "9. Modifications de cette Politique",
    content: `
      <p>Cette politique peut être mise à jour pour refléter l'évolution de nos pratiques ou des exigences légales. En cas de modification substantielle :</p>
      <ul>
        <li>Nous vous informerons par email</li>
        <li>Un bandeau d'information apparaîtra sur la plateforme</li>
        <li>La date de mise à jour sera actualisée</li>
      </ul>
      <p>Nous vous encourageons à consulter régulièrement cette page.</p>
    `,
  },
  {
    id: "contact",
    title: "10. Contact",
    content: `
      <p>Pour toute question relative à cette politique de confidentialité ou à la protection de vos données :</p>
      
      <h4>Délégué à la Protection des Données</h4>
      <p>Séverino El - DPO<br>
      Email : <a href="mailto:wendpayangdeseverinbouda@gmail.com" class="text-primary hover:underline">wendpayangdeseverinbouda@gmail.com</a><br>
      Téléphone : <a href="tel:+22666640077" class="text-primary hover:underline">+226 66 64 00 77</a></p>
      
      <p>Nous nous engageons à répondre à toutes vos demandes dans les meilleurs délais.</p>
    `,
  },
]
