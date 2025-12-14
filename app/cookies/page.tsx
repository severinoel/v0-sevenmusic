import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LegalPageLayout title="Politique des Cookies" lastUpdated="7 décembre 2025" sections={cookiesSections} />
      </main>
      <Footer />
    </div>
  )
}

const cookiesSections = [
  {
    id: "introduction",
    title: "1. Qu'est-ce qu'un Cookie ?",
    content: `
      <p>Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos préférences et d'améliorer votre expérience de navigation.</p>
      
      <p>Séverino El utilise des cookies et technologies similaires pour :</p>
      <ul>
        <li>Assurer le bon fonctionnement de la plateforme</li>
        <li>Mémoriser vos préférences et paramètres</li>
        <li>Analyser l'utilisation de nos services</li>
        <li>Personnaliser votre expérience</li>
      </ul>
    `,
  },
  {
    id: "types",
    title: "2. Types de Cookies Utilisés",
    content: `
      <h4>2.1 Cookies strictement nécessaires</h4>
      <p>Ces cookies sont indispensables au fonctionnement de la plateforme. Ils ne peuvent pas être désactivés.</p>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Nom</th>
            <th class="text-left py-2">Fonction</th>
            <th class="text-left py-2">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">session_id</td>
            <td class="py-2">Authentification utilisateur</td>
            <td class="py-2">Session</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">csrf_token</td>
            <td class="py-2">Sécurité contre les attaques CSRF</td>
            <td class="py-2">Session</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">cookie_consent</td>
            <td class="py-2">Mémorisation de vos choix cookies</td>
            <td class="py-2">1 an</td>
          </tr>
        </tbody>
      </table>
      
      <h4>2.2 Cookies de préférences</h4>
      <p>Ces cookies permettent de mémoriser vos préférences et personnaliser votre expérience.</p>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Nom</th>
            <th class="text-left py-2">Fonction</th>
            <th class="text-left py-2">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">theme</td>
            <td class="py-2">Mode sombre/clair</td>
            <td class="py-2">1 an</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">language</td>
            <td class="py-2">Langue préférée</td>
            <td class="py-2">1 an</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">audio_quality</td>
            <td class="py-2">Qualité audio préférée</td>
            <td class="py-2">1 an</td>
          </tr>
        </tbody>
      </table>
      
      <h4>2.3 Cookies analytiques</h4>
      <p>Ces cookies nous aident à comprendre comment vous utilisez la plateforme pour l'améliorer.</p>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Nom</th>
            <th class="text-left py-2">Fonction</th>
            <th class="text-left py-2">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">_analytics_id</td>
            <td class="py-2">Identification anonyme pour analytics</td>
            <td class="py-2">2 ans</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">_page_views</td>
            <td class="py-2">Comptage des pages vues</td>
            <td class="py-2">Session</td>
          </tr>
        </tbody>
      </table>
      
      <h4>2.4 Cookies de performance</h4>
      <p>Ces cookies optimisent les performances de la plateforme.</p>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Nom</th>
            <th class="text-left py-2">Fonction</th>
            <th class="text-left py-2">Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">cdn_cache</td>
            <td class="py-2">Optimisation du chargement</td>
            <td class="py-2">1 jour</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">audio_buffer</td>
            <td class="py-2">Préchargement audio</td>
            <td class="py-2">Session</td>
          </tr>
        </tbody>
      </table>
    `,
  },
  {
    id: "gestion",
    title: "3. Gestion de vos Préférences",
    content: `
      <h4>3.1 Bannière de consentement</h4>
      <p>Lors de votre première visite, une bannière vous permet de choisir les cookies que vous acceptez. Vous pouvez modifier ces choix à tout moment.</p>
      
      <h4>3.2 Centre de préférences</h4>
      <p>Accédez à vos paramètres de cookies via :</p>
      <ul>
        <li>Le lien "Paramètres des cookies" en bas de chaque page</li>
        <li>Votre espace personnel (Paramètres > Confidentialité > Cookies)</li>
      </ul>
      
      <h4>3.3 Paramètres du navigateur</h4>
      <p>Vous pouvez également gérer les cookies via les paramètres de votre navigateur :</p>
      <ul>
        <li><strong>Chrome</strong> : Paramètres > Confidentialité et sécurité > Cookies</li>
        <li><strong>Firefox</strong> : Options > Vie privée et sécurité > Cookies</li>
        <li><strong>Safari</strong> : Préférences > Confidentialité > Cookies</li>
        <li><strong>Edge</strong> : Paramètres > Cookies et autorisations de site</li>
      </ul>
      
      <p class="text-muted-foreground text-sm mt-4">Note : La désactivation de certains cookies peut affecter le fonctionnement de la plateforme.</p>
    `,
  },
  {
    id: "tiers",
    title: "4. Cookies Tiers",
    content: `
      <p>Nous utilisons des services tiers qui peuvent déposer leurs propres cookies :</p>
      
      <h4>4.1 Paiements (Stripe)</h4>
      <p>Pour le traitement sécurisé des paiements. <a href="https://stripe.com/privacy" class="text-primary hover:underline">Politique Stripe</a></p>
      
      <h4>4.2 Analytics (Vercel Analytics)</h4>
      <p>Pour l'analyse anonyme de l'utilisation. <a href="https://vercel.com/legal/privacy-policy" class="text-primary hover:underline">Politique Vercel</a></p>
      
      <h4>4.3 Hébergement (Cloudflare)</h4>
      <p>Pour la sécurité et les performances. <a href="https://www.cloudflare.com/privacy-policy/" class="text-primary hover:underline">Politique Cloudflare</a></p>
    `,
  },
  {
    id: "contact",
    title: "5. Contact",
    content: `
      <p>Pour toute question concernant notre utilisation des cookies :</p>
      <ul>
        <li>Email : <a href="mailto:wendpayangdeseverinbouda@gmail.com" class="text-primary hover:underline">wendpayangdeseverinbouda@gmail.com</a></li>
        <li>Téléphone : <a href="tel:+22666640077" class="text-primary hover:underline">+226 66 64 00 77</a></li>
      </ul>
    `,
  },
]
