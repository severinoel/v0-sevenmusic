-- Table pour la hiérarchie administrative
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL, -- director_general, director_pedagogical, rgh, director_technical, director_marketing, responsable_scolarite, coordinator, secretary_pedagogical, counselor_pedagogical
  level INTEGER NOT NULL, -- 1, 2, 3, 4
  department VARCHAR(100),
  permissions JSONB DEFAULT '[]',
  reports_to UUID REFERENCES admin_roles(id),
  team_members UUID[],
  
  -- Contact
  office_email VARCHAR(255),
  office_phone VARCHAR(50),
  office_location VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_roles_user_id ON admin_roles(user_id);
CREATE INDEX idx_admin_roles_role ON admin_roles(role);
CREATE INDEX idx_admin_roles_level ON admin_roles(level);

-- Mise à jour de la table profiles pour inclure le rôle admin
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'student';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS admin_permissions JSONB DEFAULT '[]';

-- Table pour les dashboards administratifs
CREATE TABLE IF NOT EXISTS admin_dashboard_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_roles(id) NOT NULL,
  stat_type VARCHAR(100) NOT NULL,
  stat_value JSONB NOT NULL,
  period VARCHAR(20), -- daily, weekly, monthly
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_dashboard_stats_admin ON admin_dashboard_stats(admin_id);
CREATE INDEX idx_admin_dashboard_stats_date ON admin_dashboard_stats(date DESC);

-- Table pour les alertes administratives
CREATE TABLE IF NOT EXISTS admin_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  title VARCHAR(255) NOT NULL,
  description TEXT,
  data JSONB,
  target_roles VARCHAR(50)[],
  is_read BOOLEAN DEFAULT FALSE,
  read_by UUID[],
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_admin_alerts_severity ON admin_alerts(severity);
CREATE INDEX idx_admin_alerts_created ON admin_alerts(created_at DESC);

-- RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view roles"
  ON admin_roles FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role IN ('admin', 'director_general', 'director_pedagogical', 'rgh')
    )
  );
