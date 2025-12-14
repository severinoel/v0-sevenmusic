-- Séverino El - Gestion des professeurs et administration
-- Script 009: Teacher Applications, Admin Hierarchy

-- Table teacher_applications (candidatures professeurs)
CREATE TABLE IF NOT EXISTS public.teacher_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Informations
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  
  -- Spécialités
  instruments TEXT[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  education_level VARCHAR(100),
  certifications TEXT[] DEFAULT '{}',
  
  -- Portfolio
  cv_url TEXT,
  video_presentation_url TEXT,
  audio_samples JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  social_links JSONB DEFAULT '{}',
  
  -- Disponibilités
  available_hours_per_week INTEGER,
  max_individual_lessons INTEGER,
  max_group_lessons INTEGER,
  preferred_student_ages TEXT[] DEFAULT '{}',
  teaching_languages TEXT[] DEFAULT '{}',
  
  -- Méthodologie
  teaching_philosophy TEXT,
  teaching_methods TEXT,
  materials_used TEXT,
  online_experience TEXT,
  
  -- Workflow
  status VARCHAR(30) DEFAULT 'submitted',
  -- submitted, pre_selection, technical_evaluation, hr_interview, final_validation, accepted, rejected, waitlist
  
  -- Évaluations
  pre_selection_score INTEGER,
  pre_selection_notes TEXT,
  pre_selection_by UUID REFERENCES profiles(id),
  pre_selection_at TIMESTAMPTZ,
  
  technical_score INTEGER,
  technical_notes TEXT,
  technical_evaluator UUID REFERENCES profiles(id),
  technical_at TIMESTAMPTZ,
  
  hr_score INTEGER,
  hr_notes TEXT,
  hr_evaluator UUID REFERENCES profiles(id),
  hr_at TIMESTAMPTZ,
  
  final_decision VARCHAR(20),
  final_notes TEXT,
  final_by UUID REFERENCES profiles(id),
  final_at TIMESTAMPTZ,
  
  -- Contrat proposé
  proposed_rate DECIMAL(10,2),
  contract_type VARCHAR(50),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_user ON teacher_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON teacher_applications(status);

ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "applications_select_own_or_admin" ON teacher_applications 
  FOR SELECT USING (
    auth.uid() = user_id 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('admin', 'moderator'))
  );

CREATE POLICY "applications_insert_own" ON teacher_applications 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "applications_update_admin" ON teacher_applications 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND account_type IN ('admin', 'moderator'))
  );

-- Table admin_roles (rôles administratifs)
CREATE TABLE IF NOT EXISTS public.admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  
  -- Rôle
  role VARCHAR(50) NOT NULL,
  -- director_general, pedagogical_director, hr_manager, school_manager, level_coordinator, secretary, advisor
  
  -- Niveau hiérarchique
  hierarchy_level INTEGER DEFAULT 4, -- 1 = top, 4 = base
  
  -- Permissions
  permissions JSONB DEFAULT '[]',
  
  -- Département
  department VARCHAR(100),
  
  -- Équipe supervisée
  supervised_users UUID[] DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_roles_select_auth" ON admin_roles 
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Table notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Contenu
  type VARCHAR(50) NOT NULL, -- 'like', 'comment', 'follow', 'achievement', 'course', 'system'
  title VARCHAR(200),
  message TEXT,
  
  -- Lien
  link_url TEXT,
  link_type VARCHAR(50),
  link_id UUID,
  
  -- Acteur
  actor_id UUID REFERENCES profiles(id),
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id) WHERE NOT is_read;

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own" ON notifications 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own" ON notifications 
  FOR UPDATE USING (auth.uid() = user_id);
