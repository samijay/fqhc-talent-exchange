-- ================================================================
-- FQHC Executive Dashboard — Auth + Favorites + Watchlist
-- Run in Supabase SQL Editor
-- Requires: Supabase Auth enabled (it is by default)
-- ================================================================

-- 1. USER PROFILES (extends auth.users — 1:1 relationship)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'job_seeker'
    CHECK (role IN ('executive', 'manager', 'clinician', 'job_seeker')),
  organization TEXT,
  organization_slug TEXT,
  region TEXT,
  locale TEXT DEFAULT 'en'
    CHECK (locale IN ('en', 'es')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read and update only their own profile
CREATE POLICY "users_read_own_profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own_profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_insert_own_profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
-- Service role bypass for admin access
CREATE POLICY "service_role_profiles" ON public.user_profiles
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 2. USER FAVORITES (polymorphic bookmarks for any content type)
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL
    CHECK (content_type IN (
      'intel', 'masterclass', 'case-study', 'okr-template',
      'guide', 'certification', 'resource', 'fqhc', 'job', 'blog'
    )),
  content_id TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Users can manage only their own favorites
CREATE POLICY "users_manage_own_favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "service_role_favorites" ON public.user_favorites
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_favorites_user ON public.user_favorites(user_id);
CREATE INDEX idx_favorites_type ON public.user_favorites(user_id, content_type);

-- 3. USER WATCHLIST (FQHC slugs, custom keywords, regions, categories)
CREATE TABLE IF NOT EXISTS public.user_watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  watch_type TEXT NOT NULL
    CHECK (watch_type IN ('fqhc', 'keyword', 'region', 'category')),
  watch_value TEXT NOT NULL,
  notify_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, watch_type, watch_value)
);

ALTER TABLE public.user_watchlist ENABLE ROW LEVEL SECURITY;

-- Users can manage only their own watchlist
CREATE POLICY "users_manage_own_watchlist" ON public.user_watchlist
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "service_role_watchlist" ON public.user_watchlist
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE INDEX idx_watchlist_user ON public.user_watchlist(user_id);

-- 4. AUTO-CREATE PROFILE ON SIGNUP
-- When a new user signs up via Supabase Auth, automatically create
-- a user_profiles row with their name extracted from metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it already exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. GRANT PERMISSIONS
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_favorites TO authenticated;
GRANT ALL ON public.user_watchlist TO authenticated;
GRANT ALL ON public.user_profiles TO service_role;
GRANT ALL ON public.user_favorites TO service_role;
GRANT ALL ON public.user_watchlist TO service_role;
