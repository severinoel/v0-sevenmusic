import { Construction } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function InDevelopmentBadge({ feature }: { feature?: string }) {
  return (
    <Alert className="border-amber-500 bg-amber-50">
      <Construction className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900">Fonctionnalité en développement</AlertTitle>
      <AlertDescription className="text-amber-800">
        {feature || "Cette fonctionnalité"} est actuellement en cours de développement et sera bientôt disponible.
      </AlertDescription>
    </Alert>
  )
}
