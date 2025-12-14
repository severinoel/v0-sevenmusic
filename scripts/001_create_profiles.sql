-- Séverino El - Table des profils utilisateurs
-- Script 001: Création de la table profiles

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table profiles (profils musicaux des utilisateurs)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  
  -- Informations musicales
  instruments JSONB DEFAULT '[]',
  genres JSONB DEFAULT '[]',
  skill_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
  years_experience INTEGER DEFAULT 0,
  
  -- Localisation
  city VARCHAR(100),
  country VARCHAR(100),
  timezone VARCHAR(50),
  
  -- Statistiques
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  severino_coins INTEGER DEFAULT 100, -- Bonus de bienvenue
  
  -- Vérification
  is_verified BOOLEAN DEFAULT FALSE,
  verification_tier VARCHAR(20), -- null, blue, gold, diamond
  
  -- Paramètres
  is_private BOOLEAN DEFAULT FALSE,
  show_activity_status BOOLEAN DEFAULT TRUE,
  
  -- Type de compte
  account_type VARCHAR(20) DEFAULT 'student', -- student, teacher, admin, moderator
  
  -- Abonnement
  subscription_tier VARCHAR(20) DEFAULT 'free', -- free, premium, pro, studio
  subscription_expires_at TIMESTAMPTZ,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour la recherche
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_skill_level ON profiles(skill_level);
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politiques RLS
CREATE POLICY "profiles_select_public" ON profiles 
  FOR SELECT USING (NOT is_private OR auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON profiles 
  FOR DELETE USING (auth.uid() = id);
