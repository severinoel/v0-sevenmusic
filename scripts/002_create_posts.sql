-- Séverino El - Table des publications
-- Script 002: Création de la table posts

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'post', -- post, reel, story, live
  
  -- Contenu
  caption TEXT,
  media_urls JSONB DEFAULT '[]', -- [{type: 'image|video|audio', url: '...'}]
  
  -- Métadonnées musicales
  audio_url TEXT,
  bpm INTEGER,
  music_key VARCHAR(10), -- 'Am', 'C', 'F#m'...
  chords JSONB, -- Accords détectés
  
  -- Visibilité
  audience VARCHAR(20) DEFAULT 'public', -- public, followers, private
  allow_comments BOOLEAN DEFAULT TRUE,
  allow_shares BOOLEAN DEFAULT TRUE,
  allow_downloads BOOLEAN DEFAULT FALSE,
  
  -- Engagement
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  -- Métadonnées
  tags TEXT[] DEFAULT '{}',
  location VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Index
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);

-- RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select_public" ON posts 
  FOR SELECT USING (
    audience = 'public' 
    OR author_id = auth.uid()
    OR (audience = 'followers' AND EXISTS (
      SELECT 1 FROM follows WHERE follower_id = auth.uid() AND following_id = posts.author_id
    ))
  );

CREATE POLICY "posts_insert_own" ON posts 
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "posts_update_own" ON posts 
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "posts_delete_own" ON posts 
  FOR DELETE USING (auth.uid() = author_id);
