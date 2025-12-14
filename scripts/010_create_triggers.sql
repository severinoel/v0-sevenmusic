-- Séverino El - Triggers et fonctions
-- Script 010: Auto-creation profiles, XP updates, counters

-- Fonction pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    username,
    display_name,
    avatar_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', 'user_' || LEFT(NEW.id::text, 8)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.raw_user_meta_data ->> 'username'),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger pour créer le profil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour les compteurs de followers
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET followers_count = GREATEST(0, followers_count - 1) WHERE id = OLD.following_id;
    UPDATE profiles SET following_count = GREATEST(0, following_count - 1) WHERE id = OLD.follower_id;
    RETURN OLD;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS on_follow_change ON follows;
CREATE TRIGGER on_follow_change
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_follow_counts();

-- Fonction pour mettre à jour les compteurs de likes
CREATE OR REPLACE FUNCTION public.update_post_likes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS on_like_change ON likes;
CREATE TRIGGER on_like_change
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_post_likes();

-- Fonction pour ajouter XP après une session de pratique
CREATE OR REPLACE FUNCTION public.add_practice_xp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  base_xp INTEGER;
  bonus_xp INTEGER;
  total_xp INTEGER;
BEGIN
  -- XP de base selon la durée
  base_xp := NEW.duration_minutes * 2;
  
  -- Bonus selon la performance
  IF NEW.rhythm_accuracy IS NOT NULL AND NEW.rhythm_accuracy >= 90 THEN
    bonus_xp := 20;
  ELSIF NEW.rhythm_accuracy IS NOT NULL AND NEW.rhythm_accuracy >= 75 THEN
    bonus_xp := 10;
  ELSE
    bonus_xp := 0;
  END IF;
  
  total_xp := base_xp + bonus_xp;
  
  -- Mettre à jour l'XP du user
  UPDATE profiles 
  SET 
    xp_points = xp_points + total_xp,
    level = GREATEST(1, FLOOR(SQRT(xp_points / 100)) + 1)
  WHERE id = NEW.user_id;
  
  -- Sauvegarder l'XP gagné
  NEW.xp_earned := total_xp;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_practice_complete ON practice_sessions;
CREATE TRIGGER on_practice_complete
  BEFORE INSERT ON practice_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.add_practice_xp();

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
