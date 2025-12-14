-- Système de modules pédagogiques
CREATE TABLE IF NOT EXISTS learning_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_code VARCHAR(50) UNIQUE NOT NULL, -- MOD-001, MOD-002, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Classification
  level VARCHAR(50) NOT NULL, -- beginner, intermediate, advanced, expert
  type VARCHAR(50) NOT NULL, -- free, paid, premium
  price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  
  -- Durée et prérequis
  estimated_duration_weeks INTEGER,
  prerequisites VARCHAR(255)[],
  
  -- Objectifs pédagogiques
  learning_objectives TEXT[],
  skills_acquired TEXT[],
  instruments TEXT[],
  genres TEXT[],
  
  -- Contenu
  video_count INTEGER DEFAULT 0,
  exercise_count INTEGER DEFAULT 0,
  quiz_count INTEGER DEFAULT 0,
  project_count INTEGER DEFAULT 0,
  
  -- Structure des leçons
  lessons JSONB DEFAULT '[]', -- [{id, title, description, video_url, duration_seconds, order, resources: []}]
  
  -- Instructeur
  instructor_id UUID REFERENCES profiles(id),
  co_instructors UUID[],
  
  -- Statistiques
  enrollment_count INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  
  -- Publication
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Système de casiers (dépôt de fichiers)
CREATE TABLE IF NOT EXISTS module_lockers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
  locker_type VARCHAR(50) NOT NULL, -- course, exercises, corrections, resources, student_work, evaluations
  name VARCHAR(255) NOT NULL,
  path TEXT NOT NULL, -- Chemin virtuel: Module_{ID}/1_Cours/...
  
  -- Permissions
  accessible_by VARCHAR(50)[] NOT NULL, -- ['instructor', 'student', 'admin']
  
  -- Métadonnées
  parent_id UUID REFERENCES module_lockers(id),
  order_index INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fichiers dans les casiers
CREATE TABLE IF NOT EXISTS locker_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locker_id UUID REFERENCES module_lockers(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES profiles(id) NOT NULL,
  
  -- Informations fichier
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type VARCHAR(100),
  
  -- Métadonnées
  description TEXT,
  tags TEXT[],
  is_downloadable BOOLEAN DEFAULT TRUE,
  
  -- Versioning
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES locker_files(id),
  
  -- Collaboration
  comments_count INTEGER DEFAULT 0,
  
  -- Statistiques
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commentaires sur les fichiers
CREATE TABLE IF NOT EXISTS locker_file_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id UUID REFERENCES locker_files(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  parent_id UUID REFERENCES locker_file_comments(id),
  content TEXT NOT NULL,
  
  -- Pour annotations
  timestamp_seconds DECIMAL(10,2), -- Pour annotations sur vidéos/audio
  position_data JSONB, -- Pour annotations sur documents (x, y, page, etc.)
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_learning_modules_level ON learning_modules(level);
CREATE INDEX idx_learning_modules_type ON learning_modules(type);
CREATE INDEX idx_learning_modules_instructor ON learning_modules(instructor_id);
CREATE INDEX idx_module_lockers_module ON module_lockers(module_id);
CREATE INDEX idx_locker_files_locker ON locker_files(locker_id);
CREATE INDEX idx_locker_file_comments_file ON locker_file_comments(file_id);

-- RLS
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_lockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE locker_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE locker_file_comments ENABLE ROW LEVEL SECURITY;

-- Policies pour les modules
CREATE POLICY "Everyone can view published modules"
  ON learning_modules FOR SELECT
  USING (is_published = TRUE OR instructor_id = auth.uid());

CREATE POLICY "Instructors can manage their modules"
  ON learning_modules FOR ALL
  USING (instructor_id = auth.uid());
