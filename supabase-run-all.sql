-- ================================================================
-- FQHC TALENT EXCHANGE — ALL-IN-ONE DATABASE SETUP
-- ================================================================
-- Copy this entire file and paste it into:
-- Supabase Dashboard → SQL Editor → New Query → Paste → Run
--
-- Safe to run multiple times (uses IF NOT EXISTS / IF EXISTS)
-- ================================================================

-- ── 1. Resume Profiles Table ──
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
  status TEXT DEFAULT 'draft'
);

ALTER TABLE resume_profiles ENABLE ROW LEVEL SECURITY;

-- ── 2. Displaced Candidates Table ──
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

-- ── 3. Assessment Results Column (on resume_profiles) ──
ALTER TABLE resume_profiles ADD COLUMN IF NOT EXISTS assessment_results JSONB;

-- ── 4. INSERT Policies (so forms can submit) ──
DO $$
BEGIN
  -- resume_profiles INSERT
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public inserts on resume_profiles'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on resume_profiles" ON resume_profiles FOR INSERT TO anon WITH CHECK (true)';
  END IF;

  -- resume_profiles SELECT (needed for upsert duplicate checking)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public select on resume_profiles'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public select on resume_profiles" ON resume_profiles FOR SELECT TO anon USING (true)';
  END IF;

  -- resume_profiles UPDATE (for re-editing)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resume_profiles' AND policyname = 'Allow public updates on resume_profiles'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public updates on resume_profiles" ON resume_profiles FOR UPDATE TO anon USING (true)';
  END IF;

  -- displaced_candidates INSERT
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'displaced_candidates' AND policyname = 'Allow public inserts on displaced_candidates'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public inserts on displaced_candidates" ON displaced_candidates FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- ── Done! ──
-- Verify by running: SELECT tablename FROM pg_tables WHERE schemaname = 'public';
-- You should see: candidate_waitlist, employer_waitlist, resume_profiles, displaced_candidates
