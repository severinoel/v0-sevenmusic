-- Séverino El - Chord Finder & Songs
-- Script 007: Songs, Chord Detections

-- Table songs (chansons avec accords)
CREATE TABLE IF NOT EXISTS public.songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200),
  album VARCHAR(200),
  
  -- Audio
  audio_url TEXT,
  duration_seconds INTEGER,
  
  -- Métadonnées musicales
  music_key VARCHAR(10), -- 'Am', 'C', 'F#m'...
  tempo INTEGER, -- BPM
  time_signature VARCHAR(10) DEFAULT '4/4',
  capo_position INTEGER DEFAULT 0,
  
  -- Accords détectés
  chords JSONB, -- [{time: 12.5, chord: 'Am7', confidence: 0.97}]
  structure JSONB, -- {intro: '0:00-0:15', verse1: '0:15-0:45'...}
  
  -- Paroles
  lyrics TEXT,
  lyrics_synced JSONB, -- [{time: 0, text: '...'}]
  
  -- Communauté
  uploader_id UUID REFERENCES profiles(id),
  is_verified BOOLEAN DEFAULT FALSE,
  accuracy_score DECIMAL(3,2),
  contributors_count INTEGER DEFAULT 0,
  
  -- Stats
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  
  -- Genres/Tags
  genres TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_songs_title ON songs USING gin(to_tsvector('french', title));
CREATE INDEX IF NOT EXISTS idx_songs_artist ON songs USING gin(to_tsvector('french', artist));

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "songs_select_all" ON songs FOR SELECT USING (true);
CREATE POLICY "songs_insert_auth" ON songs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "songs_update_uploader" ON songs FOR UPDATE USING (auth.uid() = uploader_id);

-- Table chord_contributions (contributions accords)
CREATE TABLE IF NOT EXISTS public.chord_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Modification
  original_chord VARCHAR(20),
  suggested_chord VARCHAR(20),
  time_position DECIMAL(10,2),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  
  -- Votes
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chord_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contributions_select_all" ON chord_contributions FOR SELECT USING (true);
CREATE POLICY "contributions_insert_auth" ON chord_contributions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table user_song_favorites (favoris)
CREATE TABLE IF NOT EXISTS public.user_song_favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, song_id)
);

ALTER TABLE user_song_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "favorites_select_own" ON user_song_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_insert_own" ON user_song_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_delete_own" ON user_song_favorites FOR DELETE USING (auth.uid() = user_id);
