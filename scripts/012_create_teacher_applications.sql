-- Table pour les candidatures de professeurs
CREATE TABLE IF NOT EXISTS teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  
  -- Étape 1: Informations personnelles
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  instruments TEXT[] NOT NULL,
  genres TEXT[] NOT NULL,
  years_experience VARCHAR(20) NOT NULL,
  education_level VARCHAR(100),
  certifications TEXT[],
  
  -- Étape 2: Portfolio
  cv_url TEXT,
  video_presentation_url TEXT,
  audio_recordings JSONB DEFAULT '[]',
  sheet_music JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  social_links JSONB DEFAULT '{}',
  
  -- Étape 3: Disponibilités
  timezone VARCHAR(50) NOT NULL,
  hours_per_week VARCHAR(20) NOT NULL,
  max_individual_classes INTEGER,
  max_group_classes INTEGER,
  age_preferences TEXT[],
  languages TEXT[] NOT NULL,
  
  -- Étape 4: Méthodologie
  teaching_philosophy TEXT NOT NULL,
  teaching_methods TEXT NOT NULL,
  pedagogical_materials TEXT,
  online_experience VARCHAR(50),
  
  -- Statut et workflow
  status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, pre_screening, technical_evaluation, hr_interview, final_validation, accepted, rejected, waiting_list
  current_step INTEGER DEFAULT 1,
  
  -- Évaluations
  ai_pre_screening_score INTEGER,
  ai_pre_screening_feedback JSONB,
  technical_evaluation_score INTEGER,
  technical_evaluation_feedback JSONB,
  technical_evaluators UUID[],
  hr_interview_score INTEGER,
  hr_interview_feedback TEXT,
  hr_interviewer UUID,
  final_decision TEXT,
  final_decision_by UUID,
  
  -- Grille d'évaluation complète
  evaluation_scores JSONB DEFAULT '{
    "technical_skills": {"score": 0, "details": {}},
    "pedagogical_skills": {"score": 0, "details": {}},
    "experience": {"score": 0, "details": {}},
    "soft_skills": {"score": 0, "details": {}}
  }',
  
  -- Timestamps
  submitted_at TIMESTAMPTZ,
  pre_screening_completed_at TIMESTAMPTZ,
  technical_evaluation_completed_at TIMESTAMPTZ,
  hr_interview_completed_at TIMESTAMPTZ,
  final_decision_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche et filtrage
CREATE INDEX idx_teacher_applications_status ON teacher_applications(status);
CREATE INDEX idx_teacher_applications_user_id ON teacher_applications(user_id);
CREATE INDEX idx_teacher_applications_created ON teacher_applications(created_at DESC);

-- RLS Policies
ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir et modifier leurs propres candidatures
CREATE POLICY "Users can view own applications"
  ON teacher_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON teacher_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft applications"
  ON teacher_applications FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');

-- Les admins peuvent tout voir et modifier
CREATE POLICY "Admins can view all applications"
  ON teacher_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('admin', 'director_pedagogical', 'rgh')
    )
  );

CREATE POLICY "Admins can update applications"
  ON teacher_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('admin', 'director_pedagogical', 'rgh')
    )
  );
