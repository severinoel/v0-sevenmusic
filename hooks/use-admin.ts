"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { ADMIN_EMAILS, ROLE_PERMISSIONS, isAdmin } from "@/lib/constants/admin-config"

interface AdminRole {
  id: string
  user_id: string
  role: string
  hierarchy_level: number
  department: string | null
  permissions: string[]
}

interface Profile {
  id: string
  role: string
  account_type: string
  admin_permissions: string[]
}

export function useAdmin() {
  const [adminRole, setAdminRole] = useState<AdminRole | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchAdminStatus() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setIsLoading(false)
          return
        }

        // Vérifier si c'est l'email admin par défaut
        const isDefaultAdmin = user.email === ADMIN_EMAILS.DIRECTOR_GENERAL

        // Récupérer le profil
        const { data: profileData } = await supabase
          .from("profiles")
          .select("id, role, account_type, admin_permissions")
          .eq("id", user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
          setIsAdminUser(isAdmin(profileData.role) || isDefaultAdmin)
        }

        // Récupérer le rôle admin
        const { data: adminData } = await supabase.from("admin_roles").select("*").eq("user_id", user.id).single()

        if (adminData) {
          setAdminRole(adminData)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du statut admin:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminStatus()
  }, [supabase])

  const hasPermission = (permission: string): boolean => {
    if (!profile) return false
    const permissions = profile.admin_permissions || ROLE_PERMISSIONS[profile.role] || []
    return permissions.includes("all_access") || permissions.includes(permission)
  }

  const canAccessAdminPanel = (): boolean => {
    return isAdminUser
  }

  const canManageUsers = (): boolean => {
    return hasPermission("manage_users") || hasPermission("all_access")
  }

  const canManageTeachers = (): boolean => {
    return hasPermission("manage_teachers") || hasPermission("all_access")
  }

  const canManageCourses = (): boolean => {
    return hasPermission("manage_courses") || hasPermission("all_access")
  }

  const canViewAnalytics = (): boolean => {
    return hasPermission("view_analytics") || hasPermission("all_access")
  }

  return {
    adminRole,
    profile,
    isLoading,
    isAdmin: isAdminUser,
    hasPermission,
    canAccessAdminPanel,
    canManageUsers,
    canManageTeachers,
    canManageCourses,
    canViewAnalytics,
  }
}
