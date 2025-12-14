import { createClient } from "@/lib/supabase/client"

export const STORAGE_BUCKETS = {
  COURSE_MATERIALS: "course-materials",
  COURSE_VIDEOS: "course-videos",
  USER_UPLOADS: "user-uploads",
} as const

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: {
    onProgress?: (progress: number) => void
  },
) {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw new Error(`Erreur lors de l'upload: ${error.message}`)
  }

  return data
}

export async function getPublicUrl(bucket: string, path: string) {
  const supabase = createClient()

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = createClient()

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    throw new Error(`Erreur lors de la suppression: ${error.message}`)
  }
}

export async function listFiles(bucket: string, folder = "") {
  const supabase = createClient()

  const { data, error } = await supabase.storage.from(bucket).list(folder)

  if (error) {
    throw new Error(`Erreur lors de la récupération des fichiers: ${error.message}`)
  }

  return data
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}
