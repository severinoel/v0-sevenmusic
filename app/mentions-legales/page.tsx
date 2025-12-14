import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LegalPageLayout } from "@/components/legal/legal-page-layout"

export const metadata = {
  title: "Mentions Légales - Séverino El",
  description: "Mentions légales et informations juridiques de Séverino El.",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <LegalPageLayout title="Mentions Légales" lastUpdated="7 Décembre 2024">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Éditeur du site</h2>
            <div className="bg-secondary/30 p-6 rounded-lg space-y-2">
              <p>
                <strong>Raison sociale :</strong> Séverino El
              </p>
              <p>
                <strong>Forme juridique :</strong> Entreprise individuelle
              </p>
              <p>
                <strong>Responsable de la publication :</strong> Wendpayangde Séverin BOUDA
              </p>
              <p>
                <strong>Adresse :</strong> Burkina Faso
              </p>
              <p>
                <strong>Email :</strong> wendpayangdeseverinbouda@gmail.com
              </p>
              <p>
                <strong>Téléphone :</strong> +226 66 64 00 77
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Hébergement</h2>
            <div className="bg-secondary/30 p-6 rounded-lg space-y-2">
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
              <p>
                <strong>Site web :</strong> https://vercel.com
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu du site Séverino El (textes, images, vidéos, logos, icônes, sons, logiciels, etc.)
              est protégé par le droit d'auteur et le droit des marques. Toute reproduction, représentation,
              modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le
              procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
            <p>
              La marque "Séverino El" et le logo associé sont des marques déposées. Toute utilisation non autorisée
              constitue une contrefaçon passible de sanctions pénales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
              Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données
              personnelles vous concernant.
            </p>
            <p>Pour exercer ces droits, vous pouvez nous contacter à l'adresse : wendpayangdeseverinbouda@gmail.com</p>
            <p>
              Pour plus d'informations sur le traitement de vos données, consultez notre{" "}
              <a href="/confidentialite" className="text-primary hover:underline">
                Politique de confidentialité
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Cookies</h2>
            <p>
              Le site Séverino El utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.
              Pour plus d'informations, consultez notre{" "}
              <a href="/cookies" className="text-primary hover:underline">
                Politique des cookies
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Limitation de responsabilité</h2>
            <p>
              Séverino El s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site,
              dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, Séverino
              El ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur
              ce site.
            </p>
            <p>
              En conséquence, Séverino El décline toute responsabilité pour toute imprécision, inexactitude ou omission
              portant sur des informations disponibles sur ce site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers d'autres sites internet. Séverino El n'exerce aucun contrôle sur ces
              sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit applicable au Burkina Faso. En cas de litige, les
              tribunaux burkinabè seront seuls compétents.
            </p>
          </section>
        </LegalPageLayout>
      </main>
      <Footer />
    </div>
  )
}
