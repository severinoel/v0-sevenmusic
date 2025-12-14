// Configuration des administrateurs par défaut
export const ADMIN_EMAILS = {
  DIRECTOR_GENERAL: "wendpayangdeseverinbouda@gmail.com",
} as const

export const SUPER_ADMIN_EMAILS = ["wendpayangdeseverinbouda@gmail.com"] as const

export const ADMIN_ROLES = {
  DIRECTOR_GENERAL: "director_general",
  DIRECTOR_PEDAGOGICAL: "director_pedagogical",
  DIRECTOR_TECHNICAL: "director_technical",
  DIRECTOR_MARKETING: "director_marketing",
  RGH: "rgh",
  RESPONSABLE_SCOLARITE: "responsable_scolarite",
  COORDINATOR: "coordinator",
  SECRETARY_PEDAGOGICAL: "secretary_pedagogical",
  COUNSELOR_PEDAGOGICAL: "counselor_pedagogical",
  TEACHER: "teacher",
  STUDENT: "student",
} as const

export const ROLE_HIERARCHY: Record<string, number> = {
  director_general: 1,
  director_pedagogical: 2,
  director_technical: 2,
  director_marketing: 2,
  rgh: 2,
  responsable_scolarite: 3,
  coordinator: 3,
  secretary_pedagogical: 4,
  counselor_pedagogical: 4,
  teacher: 5,
  student: 6,
}

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  director_general: [
    "all_access",
    "manage_users",
    "manage_teachers",
    "manage_courses",
    "manage_finances",
    "manage_content",
    "manage_settings",
    "view_analytics",
    "manage_admins",
  ],
  director_pedagogical: [
    "manage_teachers",
    "manage_courses",
    "manage_content",
    "view_analytics",
    "approve_applications",
  ],
  rgh: ["manage_teachers", "manage_contracts", "view_hr_analytics", "process_payments"],
  responsable_scolarite: ["manage_students", "manage_enrollments", "manage_schedules", "issue_certifications"],
  coordinator: ["supervise_teachers", "manage_level_content", "view_level_analytics"],
  teacher: ["manage_own_courses", "grade_students", "view_own_analytics"],
  student: ["view_courses", "submit_assignments", "view_own_progress"],
}

export const ROLE_LABELS: Record<string, string> = {
  director_general: "Directeur Général",
  director_pedagogical: "Directeur Pédagogique",
  director_technical: "Directeur Technique",
  director_marketing: "Directeur Marketing",
  rgh: "Responsable Gestion Humaine",
  responsable_scolarite: "Responsable Scolarité",
  coordinator: "Coordinateur de Niveau",
  secretary_pedagogical: "Secrétaire Pédagogique",
  counselor_pedagogical: "Conseiller Pédagogique",
  teacher: "Professeur",
  student: "Élève",
}

export function isAdmin(role: string): boolean {
  return ROLE_HIERARCHY[role] <= 4
}

export function canManageRole(userRole: string, targetRole: string): boolean {
  return ROLE_HIERARCHY[userRole] < ROLE_HIERARCHY[targetRole]
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes("all_access") || userPermissions.includes(requiredPermission)
}
