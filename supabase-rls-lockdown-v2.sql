-- ============================================================
-- RLS LOCKDOWN v2 — Remove overly permissive SELECT policies
-- ============================================================
-- PROBLEM: Several tables allow anonymous users to SELECT all rows,
-- exposing PII (names, emails, phone numbers, resume data).
--
-- FIX: Remove public SELECT policies. Keep INSERT policies (needed
-- for form submissions). API routes use the service_role key via
-- server-side Supabase client, so they can still read data.
--
-- RUN THIS IN: Supabase Dashboard → SQL Editor
-- WHEN: IMMEDIATELY — before any GTM outreach
-- ============================================================

-- 1. candidate_waitlist — Remove public SELECT
-- Keeps: anon INSERT (for form submissions)
-- Removes: anon SELECT (was exposing names, emails, phones)
DROP POLICY IF EXISTS "Allow public count on candidate_waitlist" ON candidate_waitlist;
DROP POLICY IF EXISTS "anon_select_candidate_waitlist" ON candidate_waitlist;
DROP POLICY IF EXISTS "Allow public select on candidate_waitlist" ON candidate_waitlist;

-- 2. employer_waitlist — Remove public SELECT
-- Keeps: anon INSERT (for form submissions)
-- Removes: anon SELECT (was exposing company names, contacts)
DROP POLICY IF EXISTS "Allow public count on employer_waitlist" ON employer_waitlist;
DROP POLICY IF EXISTS "anon_select_employer_waitlist" ON employer_waitlist;
DROP POLICY IF EXISTS "Allow public select on employer_waitlist" ON employer_waitlist;

-- 3. resume_profiles — Remove public SELECT and UPDATE
-- Keeps: anon INSERT (for resume builder form)
-- Removes: anon SELECT (was exposing full resume data!)
-- Removes: anon UPDATE (was allowing anyone to modify resumes!)
DROP POLICY IF EXISTS "Allow public select on resume_profiles" ON resume_profiles;
DROP POLICY IF EXISTS "Allow public updates on resume_profiles" ON resume_profiles;

-- Add service_role-only access for resume_profiles (server-side reads)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'service_role_all_access_resume_profiles'
  ) THEN
    EXECUTE 'CREATE POLICY "service_role_all_access_resume_profiles" ON resume_profiles FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

-- 4. Add service_role read access for waitlist tables (for admin/API use)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'candidate_waitlist' AND policyname = 'service_role_all_access_candidate_waitlist'
  ) THEN
    EXECUTE 'CREATE POLICY "service_role_all_access_candidate_waitlist" ON candidate_waitlist FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'employer_waitlist' AND policyname = 'service_role_all_access_employer_waitlist'
  ) THEN
    EXECUTE 'CREATE POLICY "service_role_all_access_employer_waitlist" ON employer_waitlist FOR ALL USING (auth.role() = ''service_role'') WITH CHECK (auth.role() = ''service_role'')';
  END IF;
END $$;

-- 5. Also lock down the legacy tables if they exist
DROP POLICY IF EXISTS "anon_select_candidates" ON candidates;
DROP POLICY IF EXISTS "anon_select_employers" ON employers;

-- ============================================================
-- VERIFICATION: Run these queries to confirm the lockdown worked
-- ============================================================
--
-- Check remaining policies on sensitive tables:
--   SELECT tablename, policyname, permissive, roles, cmd
--   FROM pg_policies
--   WHERE tablename IN ('candidate_waitlist', 'employer_waitlist', 'resume_profiles')
--   ORDER BY tablename, policyname;
--
-- Expected result for each table:
--   - One INSERT policy for anon (form submissions still work)
--   - One ALL policy for service_role (API routes still work)
--   - NO SELECT policy for anon (PII is protected)
--
-- Test that forms still work:
--   Visit /join and submit a test signup → should succeed
--   Visit /hire and submit a test signup → should succeed
--
-- Test that PII is hidden:
--   In browser console:
--     const { data } = await supabase.from('candidate_waitlist').select('*')
--     console.log(data) // Should return [] (empty array)
-- ============================================================
