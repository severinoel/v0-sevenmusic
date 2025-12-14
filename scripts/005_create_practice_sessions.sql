-- Séverino El - Sessions de pratique et Analytics
-- Script 005: Practice Sessions, Achievements, XP

-- Table practice_sessions
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Session
  activity_type VARCHAR(50) NOT NULL, -- 'technique', 'song', 'theory', 'improv', 'chord_finder'
  duration_minutes INTEGER NOT NULL,
  
  -- Performance
  rhythm_accuracy DECIMAL(5,2), -- 0-100
  pitch_accuracy DECIMAL(5,2),
  tempo_bpm INTEGER,
  
  -- AI Feedback
  ai_feedback JSONB, -- {strengths: [], improvements: [], next_steps: []}
  
  -- Enregistrement
  recording_url TEXT,
  
  -- XP gagné
  xp_earned INTEGER DEFAULT 0,
  
  -- Contexte
  song_id UUID,
  exercise_id UUID,
  course_id UUID REFERENCES courses(id),
  
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practice_user ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_started ON practice_sessions(started_at DESC);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "practice_select_own" ON practice_sessions 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "practice_insert_own" ON practice_sessions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table achievements (badges)
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT,
  category VARCHAR(50), -- 'practice', 'social', 'learning', 'community', 'special'
  
  -- Conditions
  condition_type VARCHAR(50), -- 'practice_time', 'streak', 'level', 'course_complete', etc.
  condition_value INTEGER,
  
  -- Récompenses
  xp_reward INTEGER DEFAULT 0,
  coins_reward INTEGER DEFAULT 0,
  
  -- Rareté
  rarity VARCHAR(20) DEFAULT 'common', -- common, rare, epic, legendary
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table user_achievements (badges débloqués)
CREATE TABLE IF NOT EXISTS public.user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_achievements_select_all" ON user_achievements FOR SELECT USING (true);
CREATE POLICY "user_achievements_insert_own" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table daily_challenges (défis quotidiens)
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- Type
  challenge_type VARCHAR(50), -- 'practice', 'post', 'collaborate', 'learn'
  target_value INTEGER DEFAULT 1,
  
  -- Récompenses
  xp_reward INTEGER DEFAULT 50,
  coins_reward INTEGER DEFAULT 10,
  
  -- Validité
  valid_date DATE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table user_challenges (progression défis)
CREATE TABLE IF NOT EXISTS public.user_challenges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES daily_challenges(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, challenge_id)
);

ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_challenges_select_own" ON user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_challenges_insert_own" ON user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_challenges_update_own" ON user_challenges FOR UPDATE USING (auth.uid() = user_id);
