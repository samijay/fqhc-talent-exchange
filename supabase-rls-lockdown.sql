-- ================================================================
-- RLS LOCKDOWN MIGRATION
-- ================================================================
-- Run this in your Supabase SQL Editor to lock down table access.
--
-- BEFORE running this:
-- 1. Add SUPABASE_SERVICE_ROLE_KEY to your Vercel env vars
-- 2. Deploy the code that uses supabaseAdmin (service role client)
-- 3. Then run this migration to remove public read access
--
-- WHAT THIS DOES:
-- - Removes public SELECT policies (anon can't read any rows)
-- - Removes public UPDATE policies (anon can't modify rows)
-- - Keeps INSERT policies (anon can submit forms)
-- - Your API routes use the service role key which bypasses RLS
-- ================================================================

-- ── candidate_waitlist ──
DROP POLICY IF EXISTS "Allow public reads on candidate_waitlist" ON candidate_waitlist;
DROP POLICY IF EXISTS "Allow anon select on candidate_waitlist" ON candidate_waitlist;

-- ── employer_waitlist ──
DROP POLICY IF EXISTS "Allow public reads on employer_waitlist" ON employer_waitlist;
DROP POLICY IF EXISTS "Allow anon select on employer_waitlist" ON employer_waitlist;

-- ── candidates ──
DROP POLICY IF EXISTS "Allow public reads on candidates" ON candidates;
DROP POLICY IF EXISTS "Allow anon select on candidates" ON candidates;

-- ── employers ──
DROP POLICY IF EXISTS "Allow public reads on employers" ON employers;
DROP POLICY IF EXISTS "Allow anon select on employers" ON employers;

-- ── resume_profiles ──
DROP POLICY IF EXISTS "Allow public reads on resume_profiles" ON resume_profiles;
DROP POLICY IF EXISTS "Allow anon select on resume_profiles" ON resume_profiles;
DROP POLICY IF EXISTS "Allow public updates on resume_profiles" ON resume_profiles;
DROP POLICY IF EXISTS "Allow anon update on resume_profiles" ON resume_profiles;

-- ── displaced_candidates (enable RLS if not already enabled) ──
ALTER TABLE IF EXISTS displaced_candidates ENABLE ROW LEVEL SECURITY;

-- Ensure INSERT policies remain for anon (forms still work)
-- These should already exist, but create them if not:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'displaced_candidates'
    AND policyname = 'Allow public inserts on displaced_candidates'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on displaced_candidates" ON displaced_candidates FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- ── Supabase Storage: Make resumes bucket private ──
-- Run this separately in the Supabase dashboard > Storage > Policies:
-- 1. Go to Storage > resumes bucket > Policies
-- 2. Delete any SELECT policy that allows anon/public reads
-- 3. Keep the INSERT policy for uploads
-- 4. The service role key will handle reads via signed URLs

-- ================================================================
-- VERIFICATION: After running, test these should FAIL:
-- ================================================================
-- Using anon key in browser console:
--   const { data } = await supabase.from('candidate_waitlist').select('*')
--   // Should return empty array or error
--
--   const { data } = await supabase.from('resume_profiles').select('*')
--   // Should return empty array or error
--
-- Your API routes should still work because they use the service role key.
-- ================================================================
