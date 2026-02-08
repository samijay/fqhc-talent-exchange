-- ============================================================
-- FQHC Talent Exchange — Clean up duplicate RLS policies
-- This removes ALL policies and creates exactly one set.
-- ============================================================

-- 1. Drop EVERY policy on all tables (nuclear clean slate)
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('candidates', 'employers', 'job_openings', 'early_access_signups', 'candidate_waitlist', 'employer_waitlist')
  LOOP
    EXECUTE format('DROP POLICY %I ON %I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- 2. Ensure RLS is enabled
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Create exactly one set of policies
CREATE POLICY "anon_insert_candidates" ON candidates FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_candidates" ON candidates FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_employers" ON employers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_employers" ON employers FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_job_openings" ON job_openings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_job_openings" ON job_openings FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_early_access" ON early_access_signups FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_candidate_waitlist" ON candidate_waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_candidate_waitlist" ON candidate_waitlist FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_employer_waitlist" ON employer_waitlist FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_employer_waitlist" ON employer_waitlist FOR SELECT TO anon USING (true);

-- 4. Verify — should show exactly 11 policies, no duplicates
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
