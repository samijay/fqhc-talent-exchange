-- ============================================================
-- FQHC Talent Exchange — Fix existing tables
-- Run this if tables already existed before the full setup.
-- This drops and recreates all RLS policies cleanly.
-- ============================================================

-- 1. Ensure RLS is enabled on ALL tables
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_waitlist ENABLE ROW LEVEL SECURITY;

-- 2. Drop ALL existing policies (clean slate)
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- 3. Recreate all required policies

-- candidates: public insert + read back after insert
CREATE POLICY "anon_insert_candidates" ON candidates FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_candidates" ON candidates FOR SELECT TO anon USING (true);

-- employers: public insert + read back after insert
CREATE POLICY "anon_insert_employers" ON employers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_employers" ON employers FOR SELECT TO anon USING (true);

-- job_openings: public insert + browse
CREATE POLICY "anon_insert_job_openings" ON job_openings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_job_openings" ON job_openings FOR SELECT TO anon USING (true);

-- early_access_signups: public insert
CREATE POLICY "anon_insert_early_access" ON early_access_signups FOR INSERT TO anon WITH CHECK (true);

-- candidate_waitlist: public insert + count
CREATE POLICY "anon_insert_candidate_waitlist" ON candidate_waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_candidate_waitlist" ON candidate_waitlist FOR SELECT TO anon USING (true);

-- employer_waitlist: public insert + count
CREATE POLICY "anon_insert_employer_waitlist" ON employer_waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_employer_waitlist" ON employer_waitlist FOR SELECT TO anon USING (true);

-- 4. Verify: show all policies
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
