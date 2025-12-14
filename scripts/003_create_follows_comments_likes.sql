-- Séverino El - Tables sociales
-- Script 003: Follows, Comments, Likes

-- Table follows (abonnements)
CREATE TABLE IF NOT EXISTS public.follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "follows_select_all" ON follows FOR SELECT USING (true);
CREATE POLICY "follows_insert_own" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete_own" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Table comments (commentaires)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- Pour les réponses
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_select_all" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_auth" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_update_own" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "comments_delete_own" ON comments FOR DELETE USING (auth.uid() = author_id);

-- Table likes
CREATE TABLE IF NOT EXISTS public.likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "likes_select_all" ON likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Table saves (sauvegardes)
CREATE TABLE IF NOT EXISTS public.saves (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

ALTER TABLE saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saves_select_own" ON saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saves_insert_own" ON saves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_delete_own" ON saves FOR DELETE USING (auth.uid() = user_id);
