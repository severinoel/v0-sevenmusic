-- Séverino El - Script d'initialisation COMPLET
-- Ce script crée toutes les tables dans le bon ordre avec les dépendances correctes
-- Exécuter ce script EN PREMIER avant les autres

-- ==========================================
-- 1. EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. TABLE PROFILES (base pour tout)
-- ==========================================
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT,
  
  -- Informations musicales
  instruments JSONB DEFAULT '[]',
  genres JSONB DEFAULT '[]',
  skill_level VARCHAR(20) DEFAULT 'beginner',
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
  severino_coins INTEGER DEFAULT 100,
  
  -- Vérification
  is_verified BOOLEAN DEFAULT FALSE,
  verification_tier VARCHAR(20),
  
  -- Paramètres
  is_private BOOLEAN DEFAULT FALSE,
  show_activity_status BOOLEAN DEFAULT TRUE,
  
  -- Type de compte
  account_type VARCHAR(20) DEFAULT 'student',
  
  -- Abonnement
  subscription_tier VARCHAR(20) DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_skill_level ON profiles(skill_level);
CREATE INDEX idx_profiles_account_type ON profiles(account_type);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_public" ON profiles 
  FOR SELECT USING (NOT is_private OR auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles 
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON profiles 
  FOR DELETE USING (auth.uid() = id);

-- ==========================================
-- 3. TABLE FOLLOWS (nécessaire pour les posts)
-- ==========================================
CREATE TABLE public.follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "follows_select_all" ON follows FOR SELECT USING (true);
CREATE POLICY "follows_insert_own" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete_own" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- ==========================================
-- 4. TABLE POSTS
-- ==========================================
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'post',
  
  caption TEXT,
  media_urls JSONB DEFAULT '[]',
  
  audio_url TEXT,
  bpm INTEGER,
  music_key VARCHAR(10),
  chords JSONB,
  
  audience VARCHAR(20) DEFAULT 'public',
  allow_comments BOOLEAN DEFAULT TRUE,
  allow_shares BOOLEAN DEFAULT TRUE,
  allow_downloads BOOLEAN DEFAULT FALSE,
  
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  
  tags TEXT[] DEFAULT '{}',
  location VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

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

-- ==========================================
-- 5. TABLES SOCIALES
-- ==========================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_id);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_select_all" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_auth" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_update_own" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "comments_delete_own" ON comments FOR DELETE USING (auth.uid() = author_id);

CREATE TABLE public.likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

CREATE INDEX idx_likes_post ON likes(post_id);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "likes_select_all" ON likes FOR SELECT USING (true);
CREATE POLICY "likes_insert_own" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete_own" ON likes FOR DELETE USING (auth.uid() = user_id);

CREATE TABLE public.saves (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

ALTER TABLE saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "saves_select_own" ON saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saves_insert_own" ON saves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_delete_own" ON saves FOR DELETE USING (auth.uid() = user_id);

-- ==========================================
-- 6. TABLES COURS
-- ==========================================
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES profiles(id),
  
  thumbnail_url TEXT,
  trailer_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  difficulty VARCHAR(20) DEFAULT 'beginner',
  
  instruments TEXT[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  topics TEXT[] DEFAULT '{}',
  
  lessons_count INTEGER DEFAULT 0,
  resources JSONB DEFAULT '[]',
  
  is_free BOOLEAN DEFAULT FALSE,
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_price INTEGER DEFAULT 0,
  
  enrollments_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  ratings_count INTEGER DEFAULT 0,
  completion_rate DECIMAL(3,2) DEFAULT 0.00,
  
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_difficulty ON courses(difficulty);
CREATE INDEX idx_courses_published ON courses(is_published);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_select_all" ON courses FOR SELECT USING (true);
CREATE POLICY "courses_insert_teacher" ON courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "courses_update_teacher" ON courses FOR UPDATE USING (auth.uid() = instructor_id);
CREATE POLICY "courses_delete_teacher" ON courses FOR DELETE USING (auth.uid() = instructor_id);

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  video_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  
  sheet_music_url TEXT,
  backing_track_url TEXT,
  resources JSONB DEFAULT '[]',
  exercises JSONB DEFAULT '[]',
  
  is_free_preview BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_course ON lessons(course_id);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_select_all" ON lessons FOR SELECT USING (true);

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  progress_percentage INTEGER DEFAULT 0,
  completed_lessons UUID[] DEFAULT '{}',
  current_lesson_id UUID,
  
  total_watch_time_minutes INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  
  rating INTEGER,
  review TEXT,
  
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "enrollments_insert_own" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "enrollments_update_own" ON enrollments FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- 7. TABLES PRATIQUE
-- ==========================================
CREATE TABLE public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  activity_type VARCHAR(50),
  
  rhythm_accuracy DECIMAL(5,2),
  pitch_accuracy DECIMAL(5,2),
  tempo_bpm INTEGER,
  
  ai_feedback JSONB,
  recording_url TEXT,
  
  xp_earned INTEGER DEFAULT 0,
  
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_practice_sessions_user ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_started ON practice_sessions(started_at DESC);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "practice_select_own" ON practice_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "practice_insert_own" ON practice_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "practice_update_own" ON practice_sessions FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- 8. TABLES ACHIEVEMENTS
-- ==========================================
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(50),
  xp_reward INTEGER DEFAULT 0,
  coins_reward INTEGER DEFAULT 0,
  condition_type VARCHAR(50),
  condition_value INTEGER,
  is_secret BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "achievements_select_all" ON achievements FOR SELECT USING (true);

CREATE TABLE public.user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_achievements_select_own" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_achievements_insert_own" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 9. TABLES MARKETPLACE
-- ==========================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES profiles(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  type VARCHAR(50) NOT NULL,
  category VARCHAR(50),
  
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_price INTEGER,
  
  thumbnail_url TEXT,
  preview_url TEXT,
  file_url TEXT,
  
  downloads_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  ratings_count INTEGER DEFAULT 0,
  
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  tags TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_type ON products(type);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_select_all" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_own" ON products FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "products_update_own" ON products FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "products_delete_own" ON products FOR DELETE USING (auth.uid() = seller_id);

CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_used INTEGER DEFAULT 0,
  
  status VARCHAR(20) DEFAULT 'completed',
  
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "purchases_select_own" ON purchases FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "purchases_insert_own" ON purchases FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- ==========================================
-- 10. TABLES CHANSONS & ACCORDS
-- ==========================================
CREATE TABLE public.songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(200),
  audio_url TEXT,
  duration_seconds INTEGER,
  
  music_key VARCHAR(10),
  tempo INTEGER,
  time_signature VARCHAR(10),
  
  chords JSONB,
  structure JSONB,
  
  uploader_id UUID REFERENCES profiles(id),
  verified BOOLEAN DEFAULT FALSE,
  accuracy_score DECIMAL(3,2),
  
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_songs_title ON songs USING gin(to_tsvector('french', title));
CREATE INDEX idx_songs_artist ON songs USING gin(to_tsvector('french', artist));

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "songs_select_all" ON songs FOR SELECT USING (true);
CREATE POLICY "songs_insert_auth" ON songs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "songs_update_own" ON songs FOR UPDATE USING (auth.uid() = uploader_id);

-- ==========================================
-- 11. TABLES LIVE & JAM
-- ==========================================
CREATE TABLE public.live_streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  stream_key VARCHAR(100) UNIQUE,
  
  status VARCHAR(20) DEFAULT 'scheduled',
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  
  peak_viewers INTEGER DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  
  recording_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_live_streams_host ON live_streams(host_id);
CREATE INDEX idx_live_streams_status ON live_streams(status);

ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "live_select_all" ON live_streams FOR SELECT USING (true);
CREATE POLICY "live_insert_own" ON live_streams FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "live_update_own" ON live_streams FOR UPDATE USING (auth.uid() = host_id);

CREATE TABLE public.jam_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  genre VARCHAR(50),
  skill_level VARCHAR(20),
  max_participants INTEGER DEFAULT 8,
  
  status VARCHAR(20) DEFAULT 'open',
  scheduled_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE jam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jam_select_all" ON jam_sessions FOR SELECT USING (true);
CREATE POLICY "jam_insert_auth" ON jam_sessions FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "jam_update_own" ON jam_sessions FOR UPDATE USING (auth.uid() = host_id);

CREATE TABLE public.jam_participants (
  jam_id UUID REFERENCES jam_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  instrument VARCHAR(50),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (jam_id, user_id)
);

ALTER TABLE jam_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jam_part_select_all" ON jam_participants FOR SELECT USING (true);
CREATE POLICY "jam_part_insert_own" ON jam_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "jam_part_delete_own" ON jam_participants FOR DELETE USING (auth.uid() = user_id);

-- ==========================================
-- 12. TABLES CANDIDATURES PROFESSEURS
-- ==========================================
CREATE TABLE public.teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Infos basiques
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Compétences
  specialties TEXT[] DEFAULT '{}',
  instruments TEXT[] DEFAULT '{}',
  years_experience INTEGER DEFAULT 0,
  education_level VARCHAR(100),
  certifications TEXT[] DEFAULT '{}',
  
  -- Portfolio
  cv_url TEXT,
  video_presentation_url TEXT,
  audio_samples JSONB DEFAULT '[]',
  social_links JSONB DEFAULT '{}',
  
  -- Disponibilités
  timezone VARCHAR(50),
  hours_per_week INTEGER,
  preferred_age_groups TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  
  -- Méthodologie
  teaching_philosophy TEXT,
  teaching_methods TEXT,
  online_experience TEXT,
  
  -- Workflow
  status VARCHAR(50) DEFAULT 'draft',
  current_step INTEGER DEFAULT 1,
  
  -- Évaluations
  ai_score DECIMAL(5,2),
  technical_score DECIMAL(5,2),
  pedagogical_score DECIMAL(5,2),
  hr_notes TEXT,
  final_decision TEXT,
  
  -- Assignations
  assigned_reviewer_id UUID REFERENCES profiles(id),
  
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_teacher_applications_user ON teacher_applications(user_id);
CREATE INDEX idx_teacher_applications_status ON teacher_applications(status);

ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher_app_select_own" ON teacher_applications 
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('admin', 'moderator')
  ));
CREATE POLICY "teacher_app_insert_own" ON teacher_applications 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "teacher_app_update_own" ON teacher_applications 
  FOR UPDATE USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('admin', 'moderator')
  ));

-- ==========================================
-- 13. TABLES ADMIN & HIÉRARCHIE
-- ==========================================
CREATE TABLE public.admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  role VARCHAR(50) NOT NULL,
  permissions JSONB DEFAULT '[]',
  department VARCHAR(100),
  reports_to UUID REFERENCES admin_roles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_roles_user ON admin_roles(user_id);
CREATE INDEX idx_admin_roles_role ON admin_roles(role);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_roles_select" ON admin_roles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('admin', 'moderator'))
);

-- ==========================================
-- 14. TABLES FICHIERS & CASIERS
-- ==========================================
CREATE TABLE public.folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  parent_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  module_id UUID,
  folder_type VARCHAR(50) DEFAULT 'general',
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_folders_owner ON folders(owner_id);
CREATE INDEX idx_folders_parent ON folders(parent_id);

ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "folders_select_own" ON folders FOR SELECT USING (
  owner_id = auth.uid() OR is_shared = true
);
CREATE POLICY "folders_insert_own" ON folders FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "folders_update_own" ON folders FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "folders_delete_own" ON folders FOR DELETE USING (auth.uid() = owner_id);

CREATE TABLE public.files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  mime_type VARCHAR(100),
  
  is_favorite BOOLEAN DEFAULT FALSE,
  is_shared BOOLEAN DEFAULT FALSE,
  
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES files(id),
  
  downloads_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_files_owner ON files(owner_id);
CREATE INDEX idx_files_folder ON files(folder_id);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "files_select_own" ON files FOR SELECT USING (
  owner_id = auth.uid() OR is_shared = true
);
CREATE POLICY "files_insert_own" ON files FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "files_update_own" ON files FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "files_delete_own" ON files FOR DELETE USING (auth.uid() = owner_id);

-- ==========================================
-- 15. TABLES QUIZ & ÉVALUATIONS
-- ==========================================
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES profiles(id),
  
  questions JSONB NOT NULL DEFAULT '[]',
  
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 60,
  max_attempts INTEGER,
  
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quizzes_select_all" ON quizzes FOR SELECT USING (true);
CREATE POLICY "quizzes_insert_teacher" ON quizzes FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "quizzes_update_teacher" ON quizzes FOR UPDATE USING (auth.uid() = creator_id);

CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  answers JSONB NOT NULL DEFAULT '[]',
  score INTEGER,
  passed BOOLEAN,
  time_spent_seconds INTEGER,
  xp_earned INTEGER DEFAULT 0,
  
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_attempts_select_own" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "quiz_attempts_insert_own" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "quiz_attempts_update_own" ON quiz_attempts FOR UPDATE USING (auth.uid() = user_id);

-- ==========================================
-- 16. TABLES MESSAGES & NOTIFICATIONS
-- ==========================================
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participants UUID[] NOT NULL,
  is_group BOOLEAN DEFAULT FALSE,
  group_name VARCHAR(100),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select_own" ON conversations 
  FOR SELECT USING (auth.uid() = ANY(participants));
CREATE POLICY "conversations_insert_own" ON conversations 
  FOR INSERT WITH CHECK (auth.uid() = ANY(participants));

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT,
  media_type VARCHAR(50),
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_own" ON messages 
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM conversations WHERE id = messages.conversation_id AND auth.uid() = ANY(participants)
  ));
CREATE POLICY "messages_insert_own" ON messages 
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- ==========================================
-- 17. TABLES RÉSERVATIONS
-- ==========================================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  lesson_type VARCHAR(50) NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  
  status VARCHAR(20) DEFAULT 'pending',
  
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  
  notes TEXT,
  meeting_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_teacher ON bookings(teacher_id);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings_select_own" ON bookings 
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = teacher_id);
CREATE POLICY "bookings_insert_student" ON bookings 
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "bookings_update_own" ON bookings 
  FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = teacher_id);

-- ==========================================
-- 18. FONCTION TRIGGER CRÉATION PROFIL
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 19. FONCTION PROMOTION ADMIN
-- ==========================================
CREATE OR REPLACE FUNCTION public.promote_admin_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Promouvoir wendpayangdeseverinbouda@gmail.com en admin
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = NEW.id 
    AND email = 'wendpayangdeseverinbouda@gmail.com'
  ) THEN
    UPDATE public.profiles 
    SET account_type = 'admin'
    WHERE id = NEW.id;
    
    INSERT INTO public.admin_roles (user_id, role, permissions, department)
    VALUES (
      NEW.id,
      'directeur_general',
      '["all"]',
      'Direction Générale'
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_check_admin ON profiles;
CREATE TRIGGER on_profile_created_check_admin
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.promote_admin_email();

-- ==========================================
-- 20. SEED ACHIEVEMENTS
-- ==========================================
INSERT INTO achievements (name, description, icon, category, xp_reward, coins_reward, condition_type, condition_value) VALUES
('Premier pas', 'Terminer votre première session de pratique', 'footprints', 'practice', 50, 10, 'practice_sessions', 1),
('Semaine productive', 'Pratiquer 7 jours consécutifs', 'calendar', 'streak', 200, 50, 'streak_days', 7),
('Maître des accords', 'Maîtriser 20 accords différents', 'music', 'skills', 300, 75, 'chords_mastered', 20),
('Social Butterfly', 'Obtenir 100 abonnés', 'users', 'social', 500, 100, 'followers', 100),
('Créateur de contenu', 'Publier 10 posts', 'video', 'content', 150, 30, 'posts', 10),
('Étudiant assidu', 'Terminer 5 cours', 'graduation-cap', 'learning', 400, 80, 'courses_completed', 5),
('Collaborateur', 'Participer à 3 jam sessions', 'users', 'collaboration', 250, 50, 'jam_sessions', 3),
('Perfectionniste', 'Obtenir 100% à un quiz', 'trophy', 'quiz', 100, 25, 'quiz_perfect', 1),
('Mélomane', 'Écouter 50 heures de musique', 'headphones', 'listening', 200, 40, 'listening_hours', 50),
('Généreux', 'Partager 20 ressources', 'share', 'sharing', 150, 30, 'shares', 20)
ON CONFLICT DO NOTHING;

-- ==========================================
-- FIN DU SCRIPT
-- ==========================================
