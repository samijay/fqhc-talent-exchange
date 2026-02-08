-- ============================================================
-- FQHC Talent Exchange — Complete Supabase Setup
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This is idempotent — safe to run multiple times.
-- ============================================================

-- ============================================================
-- 1. BASE TABLES
-- ============================================================

-- Candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  job_role TEXT,
  years_experience TEXT,
  skills TEXT[],
  preferred_locations TEXT[],
  availability TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employers table
CREATE TABLE IF NOT EXISTS employers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  ehr_system TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job openings table
CREATE TABLE IF NOT EXISTS job_openings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES employers(id),
  title TEXT NOT NULL,
  role_type TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  urgency TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Early access signups
CREATE TABLE IF NOT EXISTS early_access_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 2. WAITLIST TABLES
-- ============================================================

-- Candidate waitlist table
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

-- Employer waitlist table
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

-- ============================================================
-- 3. ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_waitlist ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS POLICIES — Public form inserts (anon key)
-- ============================================================

-- Drop existing policies first (safe if they don't exist)
DO $$ BEGIN
  -- candidates
  DROP POLICY IF EXISTS "Allow public inserts on candidates" ON candidates;
  -- employers
  DROP POLICY IF EXISTS "Allow public inserts on employers" ON employers;
  -- job_openings
  DROP POLICY IF EXISTS "Allow public inserts on job_openings" ON job_openings;
  DROP POLICY IF EXISTS "Allow public reads on job_openings" ON job_openings;
  -- early_access_signups
  DROP POLICY IF EXISTS "Allow public inserts on early_access_signups" ON early_access_signups;
  -- candidate_waitlist
  DROP POLICY IF EXISTS "Allow public inserts on candidate_waitlist" ON candidate_waitlist;
  DROP POLICY IF EXISTS "Allow public count on candidate_waitlist" ON candidate_waitlist;
  -- employer_waitlist
  DROP POLICY IF EXISTS "Allow public inserts on employer_waitlist" ON employer_waitlist;
  DROP POLICY IF EXISTS "Allow public count on employer_waitlist" ON employer_waitlist;
END $$;

-- candidates: allow public inserts (candidate intake form)
CREATE POLICY "Allow public inserts on candidates"
  ON candidates FOR INSERT
  TO anon
  WITH CHECK (true);

-- employers: allow public inserts (employer intake form)
CREATE POLICY "Allow public inserts on employers"
  ON employers FOR INSERT
  TO anon
  WITH CHECK (true);

-- employers: allow reading own data back after insert (.select().single())
CREATE POLICY "Allow public reads on employers"
  ON employers FOR SELECT
  TO anon
  USING (true);

-- job_openings: allow public inserts (employer adds positions)
CREATE POLICY "Allow public inserts on job_openings"
  ON job_openings FOR INSERT
  TO anon
  WITH CHECK (true);

-- job_openings: allow public reads (browse jobs page)
CREATE POLICY "Allow public reads on job_openings"
  ON job_openings FOR SELECT
  TO anon
  USING (true);

-- early_access_signups: allow public inserts (email signup)
CREATE POLICY "Allow public inserts on early_access_signups"
  ON early_access_signups FOR INSERT
  TO anon
  WITH CHECK (true);

-- candidate_waitlist: allow public inserts (waitlist form)
CREATE POLICY "Allow public inserts on candidate_waitlist"
  ON candidate_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- candidate_waitlist: allow public reads (live counter)
CREATE POLICY "Allow public count on candidate_waitlist"
  ON candidate_waitlist FOR SELECT
  TO anon
  USING (true);

-- employer_waitlist: allow public inserts (waitlist form)
CREATE POLICY "Allow public inserts on employer_waitlist"
  ON employer_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- employer_waitlist: allow public reads (live counter)
CREATE POLICY "Allow public count on employer_waitlist"
  ON employer_waitlist FOR SELECT
  TO anon
  USING (true);

-- ============================================================
-- 5. VERIFY — List all tables and policies
-- ============================================================
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
