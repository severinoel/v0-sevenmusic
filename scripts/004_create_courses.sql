-- Séverino El - École de musique
-- Script 004: Courses, Lessons, Enrollments

-- Table courses (cours)
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES profiles(id),
  
  -- Contenu
  thumbnail_url TEXT,
  trailer_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  difficulty VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
  
  -- Catégories
  instruments TEXT[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  topics TEXT[] DEFAULT '{}', -- ['accords', 'gammes', 'technique']
  
  -- Structure
  lessons_count INTEGER DEFAULT 0,
  resources JSONB DEFAULT '[]', -- [{type, url, title}]
  
  -- Tarification
  is_free BOOLEAN DEFAULT FALSE,
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'EUR',
  coins_price INTEGER DEFAULT 0, -- Prix en Séverino Coins
  
  -- Statistiques
  enrollments_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  ratings_count INTEGER DEFAULT 0,
  completion_rate DECIMAL(3,2) DEFAULT 0.00,
  
  -- Statut
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_difficulty ON courses(difficulty);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_select_published" ON courses 
  FOR SELECT USING (is_published = true OR instructor_id = auth.uid());

CREATE POLICY "courses_insert_instructor" ON courses 
  FOR INSERT WITH CHECK (
    auth.uid() = instructor_id 
    AND EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('teacher', 'admin')
    )
  );

CREATE POLICY "courses_update_instructor" ON courses 
  FOR UPDATE USING (auth.uid() = instructor_id);

CREATE POLICY "courses_delete_instructor" ON courses 
  FOR DELETE USING (auth.uid() = instructor_id);

-- Table lessons (leçons)
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- Contenu
  video_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  
  -- Ressources
  sheet_music_url TEXT,
  backing_track_url TEXT,
  resources JSONB DEFAULT '[]',
  
  -- Exercices
  exercises JSONB DEFAULT '[]', -- [{type, data, points}]
  
  -- Statut
  is_free_preview BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_select_enrolled" ON lessons 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses WHERE id = lessons.course_id AND is_published = true)
    OR EXISTS (SELECT 1 FROM enrollments WHERE course_id = lessons.course_id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM courses WHERE id = lessons.course_id AND instructor_id = auth.uid())
  );

-- Table enrollments (inscriptions)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Progression
  progress_percentage INTEGER DEFAULT 0,
  completed_lessons UUID[] DEFAULT '{}',
  current_lesson_id UUID REFERENCES lessons(id),
  
  -- Temps
  total_watch_time_minutes INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  
  -- Complétion
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  
  -- Note
  rating INTEGER, -- 1-5
  review TEXT,
  
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own" ON enrollments 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "enrollments_insert_own" ON enrollments 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "enrollments_update_own" ON enrollments 
  FOR UPDATE USING (auth.uid() = user_id);
