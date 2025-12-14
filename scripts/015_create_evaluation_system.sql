-- Système d'évaluation complet
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES learning_modules(id),
  lesson_id VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Configuration
  quiz_type VARCHAR(50) NOT NULL, -- formative, summative, placement
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 70,
  max_attempts INTEGER DEFAULT 3,
  show_correct_answers BOOLEAN DEFAULT TRUE,
  shuffle_questions BOOLEAN DEFAULT FALSE,
  
  -- Contenu
  questions JSONB NOT NULL, -- [{id, type, question, options, correct_answer, explanation, points}]
  
  -- Algorithme adaptatif
  is_adaptive BOOLEAN DEFAULT FALSE,
  difficulty_adjustment JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tentatives de quiz
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  
  -- Résultats
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  passed BOOLEAN NOT NULL,
  
  -- Détails
  answers JSONB NOT NULL, -- [{question_id, answer, is_correct, points_earned}]
  time_taken_seconds INTEGER,
  
  -- Feedback
  feedback_general TEXT,
  strengths TEXT[],
  areas_for_improvement TEXT[],
  recommended_resources JSONB,
  
  -- Status
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grilles d'évaluation pour les professeurs
CREATE TABLE IF NOT EXISTS evaluation_rubrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  rubric_type VARCHAR(50) NOT NULL, -- technical, creative, theory, performance
  
  -- Critères
  criteria JSONB NOT NULL, -- [{name, weight, max_points, description, levels: [{score, description}]}]
  
  -- Métadonnées
  created_by UUID REFERENCES profiles(id),
  is_template BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Évaluations par les professeurs
CREATE TABLE IF NOT EXISTS teacher_evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) NOT NULL,
  teacher_id UUID REFERENCES profiles(id) NOT NULL,
  module_id UUID REFERENCES learning_modules(id),
  rubric_id UUID REFERENCES evaluation_rubrics(id),
  
  -- Soumission évaluée
  submission_type VARCHAR(50), -- audio, video, written, live_performance
  submission_url TEXT,
  
  -- Scores
  scores JSONB NOT NULL, -- {criterion_id: {score, comment}}
  total_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  grade VARCHAR(10),
  
  -- Feedback
  general_feedback TEXT,
  strengths TEXT[],
  areas_for_improvement TEXT[],
  next_steps TEXT[],
  
  -- Feedback multimédia
  audio_feedback_url TEXT,
  video_feedback_url TEXT,
  annotated_file_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Examens officiels
CREATE TABLE IF NOT EXISTS official_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50) NOT NULL,
  
  -- Configuration
  duration_minutes INTEGER NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  -- Surveillance
  proctoring_enabled BOOLEAN DEFAULT FALSE,
  webcam_required BOOLEAN DEFAULT FALSE,
  screen_sharing_required BOOLEAN DEFAULT FALSE,
  
  -- Anti-triche
  browser_lockdown BOOLEAN DEFAULT FALSE,
  tab_switching_detection BOOLEAN DEFAULT TRUE,
  plagiarism_check BOOLEAN DEFAULT TRUE,
  
  -- Contenu
  sections JSONB NOT NULL, -- [{type, questions, time_allocation}]
  
  -- Correction
  auto_grading_enabled BOOLEAN DEFAULT TRUE,
  requires_manual_grading BOOLEAN DEFAULT TRUE,
  double_grading_threshold INTEGER, -- Score seuil pour double correction
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions d'examen
CREATE TABLE IF NOT EXISTS exam_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES official_exams(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) NOT NULL,
  
  -- Déroulement
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_remaining_seconds INTEGER,
  
  -- Réponses
  answers JSONB DEFAULT '{}',
  
  -- Surveillance
  proctoring_events JSONB DEFAULT '[]', -- [{timestamp, event_type, severity}]
  webcam_snapshots TEXT[],
  
  -- Flags anti-triche
  tab_switches INTEGER DEFAULT 0,
  suspicious_activities JSONB DEFAULT '[]',
  
  -- Résultats
  score INTEGER,
  percentage DECIMAL(5,2),
  grade VARCHAR(10),
  passed BOOLEAN,
  
  -- Correction
  graded_by UUID REFERENCES profiles(id),
  graded_at TIMESTAMPTZ,
  second_grader_id UUID REFERENCES profiles(id),
  second_graded_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_quizzes_module ON quizzes(module_id);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_teacher_evaluations_student ON teacher_evaluations(student_id);
CREATE INDEX idx_teacher_evaluations_teacher ON teacher_evaluations(teacher_id);
CREATE INDEX idx_exam_sessions_student ON exam_sessions(student_id);
CREATE INDEX idx_exam_sessions_exam ON exam_sessions(exam_id);

-- RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE official_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
