import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata = {
  title: "Inscription - Séverino El",
  description: "Créez votre compte Séverino El et rejoignez la communauté musicale.",
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}
