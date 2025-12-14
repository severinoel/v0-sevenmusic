import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFaq } from "@/components/contact/contact-faq"

export const metadata = {
  title: "Contact - Séverino El",
  description: "Contactez l'équipe Séverino El pour toute question ou assistance.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question, suggestion ou
              demande de support.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactFaq />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
