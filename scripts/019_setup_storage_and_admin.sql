-- Create Supabase Storage buckets and set up admin user

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('course-materials', 'course-materials', true, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif']),
  ('course-videos', 'course-videos', false, 524288000, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('user-uploads', 'user-uploads', false, 10485760, ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'video/mp4', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for course materials (public read, auth upload)
CREATE POLICY "Public can view course materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-materials');

CREATE POLICY "Authenticated users can upload course materials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-materials' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-materials' 
  AND auth.uid() = owner
);

-- Storage policies for user uploads
CREATE POLICY "Users can view their own uploads"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'user-uploads' 
  AND auth.uid() = owner
);

CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-uploads' 
  AND auth.uid() = owner
);

-- Add wendpayangdeseverinbouda@gmail.com as super admin in all roles

-- Function to promote super admin across all administrative roles
CREATE OR REPLACE FUNCTION promote_super_admin()
RETURNS TRIGGER AS $$
DECLARE
  super_admin_email TEXT := 'wendpayangdeseverinbouda@gmail.com';
BEGIN
  -- Check if the new user is the super admin
  IF NEW.email = super_admin_email THEN
    -- Create admin_roles entries for all roles
    INSERT INTO admin_roles (user_id, role, hierarchy_level, department, permissions)
    VALUES 
      (NEW.id, 'Directeur Général', 1, 'Direction', 
       '["all"]'::jsonb),
      (NEW.id, 'Directeur Pédagogique', 2, 'Pédagogie', 
       '["manage_courses", "manage_teachers", "manage_students", "view_analytics", "approve_content"]'::jsonb),
      (NEW.id, 'Responsable Gestion Humaine', 2, 'RH', 
       '["manage_teachers", "manage_contracts", "manage_payroll", "view_teacher_performance"]'::jsonb),
      (NEW.id, 'Responsable Scolarité', 2, 'Scolarité', 
       '["manage_students", "manage_enrollments", "issue_certifications", "manage_schedules"]'::jsonb),
      (NEW.id, 'Coordinateur de Niveau', 3, 'Pédagogie', 
       '["view_students", "manage_level_courses", "provide_feedback"]'::jsonb)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Update profile with admin flag
    UPDATE profiles
    SET 
      is_verified = true,
      verification_tier = 'admin',
      account_type = 'admin'
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-promote super admin
DROP TRIGGER IF EXISTS on_auth_user_created_promote_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_promote_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION promote_super_admin();

-- If the admin user already exists, promote them now
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'wendpayangdeseverinbouda@gmail.com';
  
  IF admin_user_id IS NOT NULL THEN
    -- Add all admin roles
    INSERT INTO admin_roles (user_id, role, hierarchy_level, department, permissions)
    VALUES 
      (admin_user_id, 'Directeur Général', 1, 'Direction', 
       '["all"]'::jsonb),
      (admin_user_id, 'Directeur Pédagogique', 2, 'Pédagogie', 
       '["manage_courses", "manage_teachers", "manage_students", "view_analytics", "approve_content"]'::jsonb),
      (admin_user_id, 'Responsable Gestion Humaine', 2, 'RH', 
       '["manage_teachers", "manage_contracts", "manage_payroll", "view_teacher_performance"]'::jsonb),
      (admin_user_id, 'Responsable Scolarité', 2, 'Scolarité', 
       '["manage_students", "manage_enrollments", "issue_certifications", "manage_schedules"]'::jsonb),
      (admin_user_id, 'Coordinateur de Niveau', 3, 'Pédagogie', 
       '["view_students", "manage_level_courses", "provide_feedback"]'::jsonb)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    UPDATE profiles
    SET 
      is_verified = true,
      verification_tier = 'admin',
      account_type = 'admin'
    WHERE id = admin_user_id;
  END IF;
END $$;
