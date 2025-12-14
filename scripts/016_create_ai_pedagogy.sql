-- Système d'Intelligence Artificielle Pédagogique
CREATE TABLE IF NOT EXISTS learning_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  
  -- Styles d'apprentissage détectés
  visual_score INTEGER DEFAULT 0, -- 0-100
  auditory_score INTEGER DEFAULT 0,
  kinesthetic_score INTEGER DEFAULT 0,
  logical_score INTEGER DEFAULT 0,
  
  -- Style dominant
  dominant_style VARCHAR(50),
  
  -- Préférences détectées
  prefers_videos BOOLEAN DEFAULT TRUE,
  prefers_text BOOLEAN DEFAULT FALSE,
  prefers_audio BOOLEAN DEFAULT FALSE,
  prefers_interactive BOOLEAN DEFAULT TRUE,
  
  -- Patterns d'apprentissage
  best_time_of_day VARCHAR(50), -- morning, afternoon, evening, night
  average_session_duration INTEGER, -- minutes
  preferred_difficulty_progression VARCHAR(50), -- gradual, moderate, challenging
  
  -- Recommandations IA
  content_recommendations JSONB DEFAULT '[]',
  
  -- Métadonnées
  last_analyzed_at TIMESTAMPTZ,
  confidence_score DECIMAL(5,2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Détection des difficultés
CREATE TABLE IF NOT EXISTS learning_difficulties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  module_id UUID REFERENCES learning_modules(id),
  
  -- Type de difficulté
  difficulty_type VARCHAR(100) NOT NULL, -- plateau, recurring_errors, time_excessive, declining_frequency
  severity VARCHAR(20) NOT NULL, -- low, medium, high
  
  -- Détails
  description TEXT NOT NULL,
  patterns_detected JSONB, -- Patterns spécifiques détectés
  affected_skills TEXT[],
  
  -- Contexte
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  first_occurrence_at TIMESTAMPTZ,
  occurrence_count INTEGER DEFAULT 1,
  
  -- Interventions
  interventions_suggested JSONB DEFAULT '[]',
  interventions_applied JSONB DEFAULT '[]',
  teacher_notified BOOLEAN DEFAULT FALSE,
  teacher_notified_at TIMESTAMPTZ,
  
  -- Résolution
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolution_method TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exercices personnalisés générés par IA
CREATE TABLE IF NOT EXISTS ai_generated_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  
  -- Contexte de génération
  generated_for VARCHAR(100) NOT NULL, -- error_correction, skill_reinforcement, challenge, review
  based_on_errors JSONB,
  target_skills TEXT[],
  difficulty_level VARCHAR(50),
  
  -- Contenu de l'exercice
  exercise_type VARCHAR(50), -- scale_practice, chord_progression, rhythm_exercise, ear_training
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT NOT NULL,
  
  -- Média
  backing_track_url TEXT,
  reference_audio_url TEXT,
  sheet_music_url TEXT,
  
  -- Configuration
  tempo_bpm INTEGER,
  key_signature VARCHAR(10),
  time_signature VARCHAR(10),
  duration_seconds INTEGER,
  
  -- Paramètres personnalisés
  parameters JSONB, -- Paramètres spécifiques au type d'exercice
  
  -- Utilisation
  attempts_count INTEGER DEFAULT 0,
  average_score DECIMAL(5,2),
  is_favorite BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ -- Certains exercices peuvent expirer
);

-- Analyses de performance IA
CREATE TABLE IF NOT EXISTS ai_performance_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  analysis_type VARCHAR(100) NOT NULL, -- session_analysis, progress_report, skill_assessment
  
  -- Période analysée
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  
  -- Métriques calculées
  metrics JSONB NOT NULL, -- {practice_time, consistency_score, improvement_rate, etc.}
  
  -- Insights IA
  insights TEXT[] NOT NULL,
  strengths TEXT[] NOT NULL,
  weaknesses TEXT[] NOT NULL,
  recommendations TEXT[] NOT NULL,
  
  -- Prédictions
  predicted_completion_date DATE,
  predicted_success_rate DECIMAL(5,2),
  risk_factors TEXT[],
  
  -- Visualisations
  charts_data JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_learning_styles_user ON learning_styles(user_id);
CREATE INDEX idx_learning_difficulties_user ON learning_difficulties(user_id);
CREATE INDEX idx_learning_difficulties_severity ON learning_difficulties(severity);
CREATE INDEX idx_ai_generated_exercises_user ON ai_generated_exercises(user_id);
CREATE INDEX idx_ai_performance_analysis_user ON ai_performance_analysis(user_id);

-- RLS
ALTER TABLE learning_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_difficulties ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_performance_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning style"
  ON learning_styles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own difficulties"
  ON learning_difficulties FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view student difficulties"
  ON learning_difficulties FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN learning_modules lm ON e.course_id = lm.id
      WHERE lm.instructor_id = auth.uid()
      AND learning_difficulties.user_id = e.user_id
    )
  );

CREATE POLICY "Users can view own exercises"
  ON ai_generated_exercises FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own analysis"
  ON ai_performance_analysis FOR SELECT
  USING (auth.uid() = user_id);
