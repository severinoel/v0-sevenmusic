-- Script pour définir wendpayangdeseverinbouda@gmail.com comme Directeur Général
-- Ce script doit être exécuté après que l'utilisateur s'est inscrit

-- Fonction pour promouvoir un utilisateur en Directeur Général par email
CREATE OR REPLACE FUNCTION promote_to_director_general(target_email TEXT)
RETURNS VOID AS $$
DECLARE
  target_user_id UUID;
  target_profile_id UUID;
BEGIN
  -- Récupérer l'ID de l'utilisateur par email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = target_email;
  
  IF target_user_id IS NULL THEN
    RAISE NOTICE 'Utilisateur avec email % non trouvé. Il sera promu lors de son inscription.', target_email;
    RETURN;
  END IF;
  
  -- Récupérer l'ID du profil
  SELECT id INTO target_profile_id
  FROM profiles
  WHERE id = target_user_id;
  
  -- Mettre à jour le profil avec le rôle admin
  UPDATE profiles
  SET 
    role = 'director_general',
    account_type = 'admin',
    is_verified = TRUE,
    verification_tier = 'diamond',
    admin_permissions = '[
      "all_access",
      "manage_users",
      "manage_teachers",
      "manage_courses",
      "manage_finances",
      "manage_content",
      "manage_settings",
      "view_analytics",
      "manage_admins"
    ]'::jsonb,
    updated_at = NOW()
  WHERE id = target_user_id;
  
  -- Créer ou mettre à jour le rôle admin
  INSERT INTO admin_roles (
    user_id,
    role,
    hierarchy_level,
    department,
    permissions
  ) VALUES (
    target_user_id,
    'director_general',
    1,
    'Direction Générale',
    '[
      "Gestion_budget_totale",
      "Validation_strategie",
      "Nomination_directeurs",
      "Acces_toutes_donnees",
      "Decisions_finales",
      "Gestion_programmes_enseignement",
      "Supervision_professeurs",
      "Validation_cursus",
      "Recrutement_professeurs",
      "Gestion_contrats",
      "Paiements_professeurs"
    ]'::jsonb
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    role = 'director_general',
    hierarchy_level = 1,
    department = 'Direction Générale',
    permissions = '[
      "Gestion_budget_totale",
      "Validation_strategie",
      "Nomination_directeurs",
      "Acces_toutes_donnees",
      "Decisions_finales",
      "Gestion_programmes_enseignement",
      "Supervision_professeurs",
      "Validation_cursus",
      "Recrutement_professeurs",
      "Gestion_contrats",
      "Paiements_professeurs"
    ]'::jsonb,
    updated_at = NOW();
    
  RAISE NOTICE 'Utilisateur % promu en Directeur Général avec succès!', target_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Appeler la fonction pour l'email spécifié
SELECT promote_to_director_general('wendpayangdeseverinbouda@gmail.com');

-- Créer un trigger pour promouvoir automatiquement cet email lors de l'inscription
CREATE OR REPLACE FUNCTION auto_promote_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Liste des emails administrateurs
  IF NEW.email = 'wendpayangdeseverinbouda@gmail.com' THEN
    -- Mettre à jour le profil (créé par le trigger handle_new_user)
    UPDATE profiles
    SET 
      role = 'director_general',
      account_type = 'admin',
      is_verified = TRUE,
      verification_tier = 'diamond',
      admin_permissions = '[
        "all_access",
        "manage_users",
        "manage_teachers",
        "manage_courses",
        "manage_finances",
        "manage_content",
        "manage_settings",
        "view_analytics",
        "manage_admins"
      ]'::jsonb
    WHERE id = NEW.id;
    
    -- Créer le rôle admin
    INSERT INTO admin_roles (
      user_id,
      role,
      hierarchy_level,
      department,
      permissions
    ) VALUES (
      NEW.id,
      'director_general',
      1,
      'Direction Générale',
      '[
        "Gestion_budget_totale",
        "Validation_strategie",
        "Nomination_directeurs",
        "Acces_toutes_donnees",
        "Decisions_finales"
      ]'::jsonb
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_promote_admin_on_signup();

-- Table pour stocker les emails admin pré-configurés
CREATE TABLE IF NOT EXISTS admin_emails_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'director_general',
  permissions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer l'email admin principal
INSERT INTO admin_emails_config (email, role, permissions)
VALUES (
  'wendpayangdeseverinbouda@gmail.com',
  'director_general',
  '["all_access", "manage_users", "manage_teachers", "manage_courses", "manage_finances", "manage_content", "manage_settings", "view_analytics", "manage_admins"]'
)
ON CONFLICT (email) DO NOTHING;
