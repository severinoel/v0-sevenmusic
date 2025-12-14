import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQContent } from "@/components/faq/faq-content"

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <FAQContent />
      </main>
      <Footer />
    </div>
  )
}
