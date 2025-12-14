import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Erreur - Séverino El",
  description: "Une erreur est survenue.",
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Une erreur est survenue</CardTitle>
            <CardDescription>Nous n'avons pas pu traiter votre demande</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {params?.error && (
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Code erreur : <code className="text-foreground">{params.error}</code>
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/connexion">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contacter le support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
