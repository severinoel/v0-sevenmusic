"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/hooks/use-admin"
import { Loader2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminGuardProps {
  children: React.ReactNode
  requiredPermission?: string
  fallbackUrl?: string
}

export function AdminGuard({ children, requiredPermission, fallbackUrl = "/" }: AdminGuardProps) {
  const { isAdmin, isLoading, hasPermission } = useAdmin()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        setAuthorized(false)
      } else if (requiredPermission && !hasPermission(requiredPermission)) {
        setAuthorized(false)
      } else {
        setAuthorized(true)
      }
    }
  }, [isAdmin, isLoading, requiredPermission, hasPermission])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Vérification des permissions...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Accès Refusé</h1>
          <p className="text-muted-foreground mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            {requiredPermission && (
              <span className="block mt-2 text-sm">
                Permission requise: <code className="bg-muted px-2 py-1 rounded">{requiredPermission}</code>
              </span>
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => router.back()}>
              Retour
            </Button>
            <Button onClick={() => router.push(fallbackUrl)}>Accueil</Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
