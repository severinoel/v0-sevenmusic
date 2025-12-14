export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { AdminManagementDashboard } from "@/components/admin/admin-management-dashboard"

export default function AdminManagementPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <AdminManagementDashboard />
    </Suspense>
  )
}
