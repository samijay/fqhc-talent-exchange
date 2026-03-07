-- ================================================================
-- FQHC TALENT EXCHANGE — MASTER DATABASE SETUP
-- ================================================================
-- Copy this ENTIRE file into:
--   Supabase Dashboard → SQL Editor → New Query → Paste → Run
--
-- ✅ Safe to run multiple times (IF NOT EXISTS everywhere)
-- ✅ Correct dependency order — run top to bottom
-- ✅ Includes all tables, RLS policies, indexes, and views
-- ✅ Last section: how to view your data
-- ================================================================


-- ============================================================
-- 1. CANDIDATE WAITLIST
-- ============================================================
CREATE TABLE IF NOT EXISTS candidate_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  region TEXT,
  role_title TEXT,
  years_experience TEXT,
  ehr_systems TEXT[],
  programs TEXT[],
  bilingual TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending'
);

ALTER TABLE candidate_waitlist ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'candidate_waitlist' AND policyname = 'Allow public inserts on candidate_waitlist') THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on candidate_waitlist" ON candidate_waitlist FOR INSERT TO anon WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'candidate_waitlist' AND policyname = 'Allow public count on candidate_waitlist') THEN
    EXECUTE 'CREATE POLICY "Allow public count on candidate_waitlist" ON candidate_waitlist FOR SELECT TO anon USING (true)';
  END IF;
END $$;


-- ============================================================
-- 2. EMPLOYER WAITLIST
-- ============================================================
CREATE TABLE IF NOT EXISTS employer_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  positions_count TEXT,
  roles_needed TEXT[],
  programs_active TEXT[],
  ehr_system TEXT,
  timeline TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending'
);

ALTER TABLE employer_waitlist ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'employer_waitlist' AND policyname = 'Allow public inserts on employer_waitlist') THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on employer_waitlist" ON employer_waitlist FOR INSERT TO anon WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'employer_waitlist' AND policyname = 'Allow public count on employer_waitlist') THEN
    EXECUTE 'CREATE POLICY "Allow public count on employer_waitlist" ON employer_waitlist FOR SELECT TO anon USING (true)';
  END IF;
END $$;


-- ============================================================
-- 3. RESUME PROFILES
--    Stores structured resume data from the Resume Builder
-- ============================================================
CREATE TABLE IF NOT EXISTS resume_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  region TEXT,
  role_type TEXT NOT NULL,
  years_experience TEXT,
  objective TEXT,
  ehr_systems TEXT[],
  programs TEXT[],
  certifications TEXT[],
  languages TEXT[],
  selected_bullets JSONB DEFAULT '[]',
  work_history JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  -- Assessment results (from career assessment tool)
  assessment_results JSONB,
  -- Uploaded resume storage (from parse-resume feature)
  original_resume_url TEXT,
  original_resume_text TEXT
);

ALTER TABLE resume_profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public inserts on resume_profiles') THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on resume_profiles" ON resume_profiles FOR INSERT TO anon WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public select on resume_profiles') THEN
    EXECUTE 'CREATE POLICY "Allow public select on resume_profiles" ON resume_profiles FOR SELECT TO anon USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public updates on resume_profiles') THEN
    EXECUTE 'CREATE POLICY "Allow public updates on resume_profiles" ON resume_profiles FOR UPDATE TO anon USING (true)';
  END IF;
END $$;


-- ============================================================
-- 4. DISPLACED CANDIDATES
--    Fast-track intake for laid-off FQHC workers
-- ============================================================
CREATE TABLE IF NOT EXISTS displaced_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  previous_employer TEXT,
  previous_role TEXT,
  layoff_date TEXT,
  available_start TEXT DEFAULT 'immediately',
  years_experience TEXT,
  programs TEXT[] DEFAULT '{}',
  ehr_systems TEXT[] DEFAULT '{}',
  bilingual TEXT DEFAULT 'no',
  current_region TEXT,
  open_to_regions TEXT[] DEFAULT '{}',
  willing_to_relocate BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'new',
  notes TEXT
);

ALTER TABLE displaced_candidates ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_displaced_candidates_status ON displaced_candidates(status);
CREATE INDEX IF NOT EXISTS idx_displaced_candidates_email ON displaced_candidates(email);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'displaced_candidates' AND policyname = 'Allow public inserts on displaced_candidates') THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on displaced_candidates" ON displaced_candidates FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;


-- ============================================================
-- 5. FEEDBACK SUBMISSIONS
--    From the floating feedback button on all pages
-- ============================================================
CREATE TABLE IF NOT EXISTS feedback_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  page_url TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('bug', 'suggestion', 'praise', 'other')),
  message TEXT NOT NULL,
  email TEXT
);

ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Only service_role (backend) can read feedback — no public read
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'feedback_submissions' AND policyname = 'service_role_all_access_feedback') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access_feedback" ON feedback_submissions FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON feedback_submissions TO service_role;


-- ============================================================
-- 6. NEWSLETTER SUBSCRIBERS
--    Two tracks: Intel Brief (executives) + The Pulse (candidates)
--    Includes personalization questionnaire preferences
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  audience TEXT NOT NULL CHECK (audience IN ('intel-brief', 'the-pulse', 'both')),
  region TEXT,
  role_interest TEXT,
  -- Personalization questionnaire answers
  preferences JSONB DEFAULT '{}',
  role_type TEXT,
  primary_challenge TEXT,
  org_size TEXT,
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  unsubscribe_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies (idempotent)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'service_role_all_access') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access" ON public.newsletter_subscribers FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'anon_can_insert') THEN
    EXECUTE 'CREATE POLICY "anon_can_insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (auth.role() = ''anon'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_audience ON public.newsletter_subscribers(audience);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);
CREATE INDEX IF NOT EXISTS idx_newsletter_subs_challenge ON newsletter_subscribers(primary_challenge) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_newsletter_subs_role ON newsletter_subscribers(role_type) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_newsletter_subs_org_size ON newsletter_subscribers(org_size) WHERE status = 'active';

GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO service_role;
GRANT INSERT ON public.newsletter_subscribers TO anon;

-- Segment breakdown view — used by /intel-brief command
CREATE OR REPLACE VIEW newsletter_segments AS
SELECT
  audience,
  role_type,
  primary_challenge,
  org_size,
  COUNT(*) AS subscriber_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY audience), 1) AS pct_of_audience
FROM newsletter_subscribers
WHERE status = 'active'
GROUP BY audience, role_type, primary_challenge, org_size
ORDER BY audience, subscriber_count DESC;

-- Topic interest view — for newsletter curation
CREATE OR REPLACE VIEW newsletter_topic_interests AS
SELECT
  topic,
  COUNT(*) AS interested_count
FROM newsletter_subscribers,
  jsonb_array_elements_text(COALESCE(preferences->'topics', '[]'::jsonb)) AS topic
WHERE status = 'active'
GROUP BY topic
ORDER BY interested_count DESC;


-- ============================================================
-- 7. NEWSLETTER SENDS
--    Tracks every newsletter issue sent (for analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track TEXT NOT NULL CHECK (track IN ('intel-brief', 'the-pulse')),
  issue_number INTEGER NOT NULL,
  subject TEXT NOT NULL,
  total_recipients INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_sends ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_sends' AND policyname = 'service_role_all_access') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access" ON public.newsletter_sends FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_newsletter_sends_track ON public.newsletter_sends(track);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_sent_at ON public.newsletter_sends(sent_at DESC);

GRANT SELECT, INSERT ON public.newsletter_sends TO service_role;


-- ============================================================
-- 8. LOCUM PROVIDERS
--    Clinicians interested in temporary FQHC coverage
-- ============================================================
CREATE TABLE IF NOT EXISTS public.locum_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('md', 'np', 'pa', 'dentist')),
  license_number TEXT,
  available_days TEXT,
  region TEXT,
  ehr_experience TEXT[]
);

ALTER TABLE public.locum_providers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locum_providers' AND policyname = 'service_role_all_access') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access" ON public.locum_providers FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locum_providers' AND policyname = 'anon_can_insert') THEN
    EXECUTE 'CREATE POLICY "anon_can_insert" ON public.locum_providers FOR INSERT WITH CHECK (auth.role() = ''anon'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_locum_providers_email ON public.locum_providers(email);
CREATE INDEX IF NOT EXISTS idx_locum_providers_role ON public.locum_providers(role);
CREATE INDEX IF NOT EXISTS idx_locum_providers_region ON public.locum_providers(region);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.locum_providers TO service_role;
GRANT INSERT ON public.locum_providers TO anon;


-- ============================================================
-- 9. LOCUM REQUESTS
--    FQHCs requesting temporary provider coverage
-- ============================================================
CREATE TABLE IF NOT EXISTS public.locum_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('md', 'np', 'pa', 'dentist')),
  start_date TEXT,
  end_date TEXT,
  hours_per_day TEXT,
  ehr_system TEXT,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'matched', 'completed', 'cancelled'))
);

ALTER TABLE public.locum_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locum_requests' AND policyname = 'service_role_all_access') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access" ON public.locum_requests FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'locum_requests' AND policyname = 'anon_can_insert') THEN
    EXECUTE 'CREATE POLICY "anon_can_insert" ON public.locum_requests FOR INSERT WITH CHECK (auth.role() = ''anon'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_locum_requests_contact_email ON public.locum_requests(contact_email);
CREATE INDEX IF NOT EXISTS idx_locum_requests_provider_type ON public.locum_requests(provider_type);
CREATE INDEX IF NOT EXISTS idx_locum_requests_status ON public.locum_requests(status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.locum_requests TO service_role;
GRANT INSERT ON public.locum_requests TO anon;


-- ============================================================
-- 10. JOB POSTINGS
--     From the Job Posting Builder tool (/job-posting-builder)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  role_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  employment_type TEXT,
  summary TEXT,
  responsibilities TEXT[],
  qualifications TEXT[],
  preferred_skills TEXT[],
  org_name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  region TEXT,
  city TEXT,
  ehr_system TEXT,
  active_programs TEXT[],
  org_notes TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  selected_benefits TEXT[],
  additional_benefits TEXT,
  screening_questions TEXT[],
  post_on_site BOOLEAN DEFAULT FALSE,
  locale TEXT DEFAULT 'en',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'posted', 'archived'))
);

ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'job_postings' AND policyname = 'service_role_all_access_job_postings') THEN
    EXECUTE 'CREATE POLICY "service_role_all_access_job_postings" ON public.job_postings FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_job_postings_contact_email ON public.job_postings(contact_email);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON public.job_postings(status);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON public.job_postings(created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_postings TO service_role;


-- ============================================================
-- 11. AUTH DASHBOARD TABLES (optional — requires Supabase Auth)
--     user_profiles, user_favorites, user_watchlist
--     Only needed when you enable user accounts/login
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'job_seeker'
    CHECK (role IN ('executive', 'manager', 'clinician', 'job_seeker')),
  organization TEXT,
  organization_slug TEXT,
  region TEXT,
  locale TEXT DEFAULT 'en' CHECK (locale IN ('en', 'es')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'users_read_own_profile') THEN
    EXECUTE 'CREATE POLICY "users_read_own_profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'users_update_own_profile') THEN
    EXECUTE 'CREATE POLICY "users_update_own_profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'users_insert_own_profile') THEN
    EXECUTE 'CREATE POLICY "users_insert_own_profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'service_role_profiles') THEN
    EXECUTE 'CREATE POLICY "service_role_profiles" ON public.user_profiles FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN (
    'intel', 'masterclass', 'case-study', 'okr-template',
    'guide', 'certification', 'resource', 'fqhc', 'job', 'blog'
  )),
  content_id TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_favorites' AND policyname = 'users_manage_own_favorites') THEN
    EXECUTE 'CREATE POLICY "users_manage_own_favorites" ON public.user_favorites FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_favorites' AND policyname = 'service_role_favorites') THEN
    EXECUTE 'CREATE POLICY "service_role_favorites" ON public.user_favorites FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_type ON public.user_favorites(user_id, content_type);

CREATE TABLE IF NOT EXISTS public.user_watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  watch_type TEXT NOT NULL CHECK (watch_type IN ('fqhc', 'keyword', 'region', 'category')),
  watch_value TEXT NOT NULL,
  notify_email BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, watch_type, watch_value)
);

ALTER TABLE public.user_watchlist ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_watchlist' AND policyname = 'users_manage_own_watchlist') THEN
    EXECUTE 'CREATE POLICY "users_manage_own_watchlist" ON public.user_watchlist FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_watchlist' AND policyname = 'service_role_watchlist') THEN
    EXECUTE 'CREATE POLICY "service_role_watchlist" ON public.user_watchlist FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_watchlist_user ON public.user_watchlist(user_id);

-- Auto-create user_profile when someone signs up
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
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_favorites TO authenticated;
GRANT ALL ON public.user_watchlist TO authenticated;
GRANT ALL ON public.user_profiles TO service_role;
GRANT ALL ON public.user_favorites TO service_role;
GRANT ALL ON public.user_watchlist TO service_role;


-- ============================================================
-- 12. STORAGE BUCKET — resume file uploads
--     NOTE: You must first create the bucket manually:
--     Supabase Dashboard → Storage → New Bucket
--     Name: "resumes" | Private | Max file size: 5MB
--     Then run these policies:
-- ============================================================
-- (Uncomment after creating the bucket)
-- CREATE POLICY "Allow public uploads to resumes bucket"
--   ON storage.objects FOR INSERT TO anon
--   WITH CHECK (bucket_id = 'resumes');
-- CREATE POLICY "Allow public reads from resumes bucket"
--   ON storage.objects FOR SELECT TO anon
--   USING (bucket_id = 'resumes');


-- ============================================================
-- ✅ VERIFY — Tables created
-- ============================================================
SELECT
  tablename,
  CASE WHEN rowsecurity THEN '🔒 RLS on' ELSE '⚠️ No RLS' END AS rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;


-- ================================================================
-- 👁 HOW TO VIEW YOUR DATA
-- ================================================================
-- Run any of these queries in SQL Editor → New Query:
--
-- -- Newsletter subscribers (all)
-- SELECT id, email, audience, role_type, primary_challenge, org_size,
--        status, subscribed_at, preferences
-- FROM newsletter_subscribers
-- ORDER BY subscribed_at DESC;
--
-- -- Newsletter subscriber counts by audience
-- SELECT audience, status, COUNT(*) as count
-- FROM newsletter_subscribers
-- GROUP BY audience, status
-- ORDER BY audience;
--
-- -- Newsletter segment breakdown (who to curate for)
-- SELECT * FROM newsletter_segments;
--
-- -- Newsletter topic interests (what to write about)
-- SELECT * FROM newsletter_topic_interests;
--
-- -- Feedback submissions
-- SELECT feedback_type, message, page_url, email, created_at
-- FROM feedback_submissions
-- ORDER BY created_at DESC;
--
-- -- Resume profiles
-- SELECT first_name, last_name, email, role_type, region, status, created_at
-- FROM resume_profiles
-- ORDER BY created_at DESC;
--
-- -- Displaced candidates (fast-track)
-- SELECT first_name, last_name, email, previous_employer, previous_role,
--        current_region, status, created_at
-- FROM displaced_candidates
-- ORDER BY created_at DESC;
--
-- -- Locum provider signups
-- SELECT name, email, role, region, available_days, created_at
-- FROM locum_providers
-- ORDER BY created_at DESC;
--
-- -- Locum coverage requests from FQHCs
-- SELECT org_name, contact_name, contact_email, provider_type,
--        start_date, end_date, status, created_at
-- FROM locum_requests
-- ORDER BY created_at DESC;
--
-- -- Job postings submitted
-- SELECT job_title, org_name, contact_email, region, salary_min, salary_max,
--        post_on_site, status, created_at
-- FROM job_postings
-- ORDER BY created_at DESC
-- LIMIT 50;
--
-- -- Newsletter sends history
-- SELECT track, issue_number, subject, sent_count, failed_count, sent_at
-- FROM newsletter_sends
-- ORDER BY sent_at DESC;
--
-- -- Candidate waitlist
-- SELECT first_name, last_name, email, role_title, region, status, created_at
-- FROM candidate_waitlist
-- ORDER BY created_at DESC;
--
-- -- Employer waitlist
-- SELECT org_name, contact_name, email, positions_count, status, created_at
-- FROM employer_waitlist
-- ORDER BY created_at DESC;
-- ================================================================
