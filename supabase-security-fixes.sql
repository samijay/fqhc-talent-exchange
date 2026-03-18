-- FQHC Talent Exchange — Security Fixes
-- Run this in Supabase SQL Editor immediately
-- Fixes: offboarding_intake RLS, manager_assessments table, verify lockdown

-- ============================================================
-- 1. FIX: offboarding_intake — overly permissive RLS policy
--    The old policy "Service role full access" uses USING (true)
--    which lets the anon key read ALL rows (org names, emails, phones)
-- ============================================================

DROP POLICY IF EXISTS "Service role full access" ON offboarding_intake;

CREATE POLICY "service_role_full_access_offboarding"
  ON offboarding_intake FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Verify the anon INSERT-only policy still exists
-- (this is correct — allows the public form to submit)
-- If missing, uncomment:
-- CREATE POLICY "Allow anonymous inserts" ON offboarding_intake
--   FOR INSERT TO anon WITH CHECK (true);

-- ============================================================
-- 2. CREATE: manager_assessments table with proper RLS
--    This table is used by /api/team-readiness but had no migration
-- ============================================================

CREATE TABLE IF NOT EXISTS manager_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  role_id TEXT NOT NULL,
  overall_score INTEGER,
  domain_scores JSONB DEFAULT '{}',
  strengths TEXT[] DEFAULT '{}',
  growth_areas TEXT[] DEFAULT '{}',
  stars_type TEXT,
  locale TEXT DEFAULT 'en',
  session_id TEXT
);

ALTER TABLE manager_assessments ENABLE ROW LEVEL SECURITY;

-- Only service_role (server-side API routes) can access
CREATE POLICY "service_role_all_access_manager_assessments"
  ON manager_assessments FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- 3. VERIFY: lockdown policies on waitlist + resume tables
--    Drop overly permissive anon SELECT/UPDATE if they exist
--    (These were created in master-setup but should have been
--     dropped by rls-lockdown-v2. Running again is idempotent.)
-- ============================================================

-- candidate_waitlist: drop public SELECT
DROP POLICY IF EXISTS "Allow public count on candidate_waitlist" ON candidate_waitlist;

-- employer_waitlist: drop public SELECT
DROP POLICY IF EXISTS "Allow public count on employer_waitlist" ON employer_waitlist;

-- resume_profiles: drop public SELECT and UPDATE
DROP POLICY IF EXISTS "Allow public select on resume_profiles" ON resume_profiles;
DROP POLICY IF EXISTS "Allow public updates on resume_profiles" ON resume_profiles;

-- ============================================================
-- 4. VERIFY: all tables have RLS enabled
-- ============================================================

-- Run this SELECT to check (doesn't modify anything):
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
-- All tables should show rowsecurity = true

-- ============================================================
-- Done! After running, verify with:
-- SELECT tablename, policyname, cmd, roles
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
-- ============================================================
