export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          instruments: Json
          genres: Json
          skill_level: string
          years_experience: number
          city: string | null
          country: string | null
          timezone: string | null
          followers_count: number
          following_count: number
          posts_count: number
          xp_points: number
          level: number
          severino_coins: number
          is_verified: boolean
          verification_tier: string | null
          is_private: boolean
          show_activity_status: boolean
          account_type: string
          subscription_tier: string
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          instruments?: Json
          genres?: Json
          skill_level?: string
          years_experience?: number
          city?: string | null
          country?: string | null
          timezone?: string | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          xp_points?: number
          level?: number
          severino_coins?: number
          is_verified?: boolean
          verification_tier?: string | null
          is_private?: boolean
          show_activity_status?: boolean
          account_type?: string
          subscription_tier?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          instruments?: Json
          genres?: Json
          skill_level?: string
          years_experience?: number
          city?: string | null
          country?: string | null
          timezone?: string | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          xp_points?: number
          level?: number
          severino_coins?: number
          is_verified?: boolean
          verification_tier?: string | null
          is_private?: boolean
          show_activity_status?: boolean
          account_type?: string
          subscription_tier?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          type: string
          caption: string | null
          media_urls: Json
          audio_url: string | null
          bpm: number | null
          music_key: string | null
          chords: Json | null
          audience: string
          allow_comments: boolean
          allow_shares: boolean
          allow_downloads: boolean
          likes_count: number
          comments_count: number
          shares_count: number
          saves_count: number
          views_count: number
          tags: string[]
          location: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          author_id: string
          type?: string
          caption?: string | null
          media_urls?: Json
          audio_url?: string | null
          bpm?: number | null
          music_key?: string | null
          chords?: Json | null
          audience?: string
          allow_comments?: boolean
          allow_shares?: boolean
          allow_downloads?: boolean
          likes_count?: number
          comments_count?: number
          shares_count?: number
          saves_count?: number
          views_count?: number
          tags?: string[]
          location?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          author_id?: string
          type?: string
          caption?: string | null
          media_urls?: Json
          audio_url?: string | null
          bpm?: number | null
          music_key?: string | null
          chords?: Json | null
          audience?: string
          allow_comments?: boolean
          allow_shares?: boolean
          allow_downloads?: boolean
          likes_count?: number
          comments_count?: number
          shares_count?: number
          saves_count?: number
          views_count?: number
          tags?: string[]
          location?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          instructor_id: string | null
          thumbnail_url: string | null
          trailer_url: string | null
          duration_minutes: number
          difficulty: string
          instruments: string[]
          genres: string[]
          topics: string[]
          lessons_count: number
          resources: Json
          is_free: boolean
          price: number
          currency: string
          coins_price: number
          enrollments_count: number
          rating_average: number
          ratings_count: number
          completion_rate: number
          is_published: boolean
          is_featured: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          trailer_url?: string | null
          duration_minutes?: number
          difficulty?: string
          instruments?: string[]
          genres?: string[]
          topics?: string[]
          lessons_count?: number
          resources?: Json
          is_free?: boolean
          price?: number
          currency?: string
          coins_price?: number
          enrollments_count?: number
          rating_average?: number
          ratings_count?: number
          completion_rate?: number
          is_published?: boolean
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          instructor_id?: string | null
          thumbnail_url?: string | null
          trailer_url?: string | null
          duration_minutes?: number
          difficulty?: string
          instruments?: string[]
          genres?: string[]
          topics?: string[]
          lessons_count?: number
          resources?: Json
          is_free?: boolean
          price?: number
          currency?: string
          coins_price?: number
          enrollments_count?: number
          rating_average?: number
          ratings_count?: number
          completion_rate?: number
          is_published?: boolean
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      practice_sessions: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          duration_minutes: number
          rhythm_accuracy: number | null
          pitch_accuracy: number | null
          tempo_bpm: number | null
          ai_feedback: Json | null
          recording_url: string | null
          xp_earned: number
          song_id: string | null
          exercise_id: string | null
          course_id: string | null
          started_at: string
          ended_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          duration_minutes: number
          rhythm_accuracy?: number | null
          pitch_accuracy?: number | null
          tempo_bpm?: number | null
          ai_feedback?: Json | null
          recording_url?: string | null
          xp_earned?: number
          song_id?: string | null
          exercise_id?: string | null
          course_id?: string | null
          started_at: string
          ended_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          duration_minutes?: number
          rhythm_accuracy?: number | null
          pitch_accuracy?: number | null
          tempo_bpm?: number | null
          ai_feedback?: Json | null
          recording_url?: string | null
          xp_earned?: number
          song_id?: string | null
          exercise_id?: string | null
          course_id?: string | null
          started_at?: string
          ended_at?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_url: string | null
          category: string | null
          condition_type: string | null
          condition_value: number | null
          xp_reward: number
          coins_reward: number
          rarity: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_url?: string | null
          category?: string | null
          condition_type?: string | null
          condition_value?: number | null
          xp_reward?: number
          coins_reward?: number
          rarity?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_url?: string | null
          category?: string | null
          condition_type?: string | null
          condition_value?: number | null
          xp_reward?: number
          coins_reward?: number
          rarity?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string | null
          category: string
          thumbnail_url: string | null
          preview_url: string | null
          files: Json
          price: number
          currency: string
          coins_price: number | null
          commission_rate: number
          metadata: Json
          sales_count: number
          rating_average: number
          ratings_count: number
          views_count: number
          is_published: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description?: string | null
          category: string
          thumbnail_url?: string | null
          preview_url?: string | null
          files?: Json
          price: number
          currency?: string
          coins_price?: number | null
          commission_rate?: number
          metadata?: Json
          sales_count?: number
          rating_average?: number
          ratings_count?: number
          views_count?: number
          is_published?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          description?: string | null
          category?: string
          thumbnail_url?: string | null
          preview_url?: string | null
          files?: Json
          price?: number
          currency?: string
          coins_price?: number | null
          commission_rate?: number
          metadata?: Json
          sales_count?: number
          rating_average?: number
          ratings_count?: number
          views_count?: number
          is_published?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      songs: {
        Row: {
          id: string
          title: string
          artist: string | null
          album: string | null
          audio_url: string | null
          duration_seconds: number | null
          music_key: string | null
          tempo: number | null
          time_signature: string
          capo_position: number
          chords: Json | null
          structure: Json | null
          lyrics: string | null
          lyrics_synced: Json | null
          uploader_id: string | null
          is_verified: boolean
          accuracy_score: number | null
          contributors_count: number
          views_count: number
          favorites_count: number
          genres: string[]
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          artist?: string | null
          album?: string | null
          audio_url?: string | null
          duration_seconds?: number | null
          music_key?: string | null
          tempo?: number | null
          time_signature?: string
          capo_position?: number
          chords?: Json | null
          structure?: Json | null
          lyrics?: string | null
          lyrics_synced?: Json | null
          uploader_id?: string | null
          is_verified?: boolean
          accuracy_score?: number | null
          contributors_count?: number
          views_count?: number
          favorites_count?: number
          genres?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string | null
          album?: string | null
          audio_url?: string | null
          duration_seconds?: number | null
          music_key?: string | null
          tempo?: number | null
          time_signature?: string
          capo_position?: number
          chords?: Json | null
          structure?: Json | null
          lyrics?: string | null
          lyrics_synced?: Json | null
          uploader_id?: string | null
          is_verified?: boolean
          accuracy_score?: number | null
          contributors_count?: number
          views_count?: number
          favorites_count?: number
          genres?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type Course = Database["public"]["Tables"]["courses"]["Row"]
export type PracticeSession = Database["public"]["Tables"]["practice_sessions"]["Row"]
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type Song = Database["public"]["Tables"]["songs"]["Row"]
