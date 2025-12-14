-- Séverino El - Live Streaming & Jam Sessions
-- Script 008: Live Streams, Jam Sessions, Messages

-- Table live_streams
CREATE TABLE IF NOT EXISTS public.live_streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Infos
  title VARCHAR(200) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  
  -- Config stream
  stream_key VARCHAR(100) UNIQUE,
  rtmp_url TEXT,
  hls_url TEXT,
  
  -- Settings
  quality VARCHAR(20) DEFAULT 'hd', -- sd, hd, fullhd, 4k
  latency_mode VARCHAR(20) DEFAULT 'low', -- ultra_low, low, normal
  allow_chat BOOLEAN DEFAULT TRUE,
  allow_gifts BOOLEAN DEFAULT TRUE,
  age_restriction INTEGER,
  
  -- Collaboration
  co_hosts UUID[] DEFAULT '{}',
  max_co_hosts INTEGER DEFAULT 8,
  
  -- Status
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, live, ended
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  
  -- Stats
  peak_viewers INTEGER DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  gifts_received INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,
  
  -- Recording
  recording_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_host ON live_streams(host_id);
CREATE INDEX IF NOT EXISTS idx_live_status ON live_streams(status);

ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "live_select_all" ON live_streams FOR SELECT USING (true);
CREATE POLICY "live_insert_own" ON live_streams FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "live_update_own" ON live_streams FOR UPDATE USING (auth.uid() = host_id);

-- Table jam_sessions
CREATE TABLE IF NOT EXISTS public.jam_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Infos
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- Musique
  genre VARCHAR(50),
  tempo_bpm INTEGER,
  music_key VARCHAR(10),
  
  -- Participants
  max_participants INTEGER DEFAULT 8,
  current_participants INTEGER DEFAULT 0,
  participants UUID[] DEFAULT '{}',
  
  -- Niveaux requis
  min_skill_level VARCHAR(20) DEFAULT 'beginner',
  instruments_needed TEXT[] DEFAULT '{}',
  
  -- Status
  status VARCHAR(20) DEFAULT 'open', -- open, in_progress, full, ended
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  
  -- WebRTC
  room_id VARCHAR(100),
  
  -- Enregistrement
  recording_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jam_host ON jam_sessions(host_id);
CREATE INDEX IF NOT EXISTS idx_jam_status ON jam_sessions(status);

ALTER TABLE jam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jam_select_all" ON jam_sessions FOR SELECT USING (true);
CREATE POLICY "jam_insert_auth" ON jam_sessions FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "jam_update_host" ON jam_sessions FOR UPDATE USING (auth.uid() = host_id);

-- Table messages (conversations privées)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participants UUID[] NOT NULL,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select_participant" ON conversations 
  FOR SELECT USING (auth.uid() = ANY(participants));

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT,
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_participant" ON messages 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM conversations WHERE id = messages.conversation_id AND auth.uid() = ANY(participants))
  );

CREATE POLICY "messages_insert_sender" ON messages 
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
