-- Table pour stocker les messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to UUID REFERENCES auth.users(id),
  response TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy : tout le monde peut créer un message de contact
CREATE POLICY "Anyone can submit contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Policy : seuls les admins peuvent voir tous les messages
CREATE POLICY "Admins can view all contact messages"
ON contact_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = auth.uid()
  )
);

-- Policy : seuls les admins peuvent mettre à jour
CREATE POLICY "Admins can update contact messages"
ON contact_messages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = auth.uid()
  )
);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_messages_updated_at();
