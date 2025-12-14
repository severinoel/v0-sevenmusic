import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/auth/login-form"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Connexion - Séverino El",
  description: "Connectez-vous à votre compte Séverino El.",
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md h-96 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default function ConnexionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
