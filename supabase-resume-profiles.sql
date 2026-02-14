-- Resume profiles table for the Resume Builder feature
-- Run this migration against your Supabase database

CREATE TABLE resume_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Personal info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  region TEXT,

  -- Professional info
  role_type TEXT NOT NULL,
  years_experience TEXT,
  objective TEXT,

  -- Skills & qualifications
  ehr_systems TEXT[],
  programs TEXT[],
  certifications TEXT[],
  languages TEXT[],

  -- Guided bullet selections (array of bullet IDs)
  selected_bullets JSONB DEFAULT '[]',

  -- Work history entries (array of objects: employer, title, startDate, endDate, current)
  work_history JSONB DEFAULT '[]',

  -- Education entries (array of objects: institution, degree, year)
  education JSONB DEFAULT '[]',

  status TEXT DEFAULT 'draft'
);

-- Enable RLS
ALTER TABLE resume_profiles ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (same pattern as candidate_waitlist)
CREATE POLICY "Allow public inserts on resume_profiles"
  ON resume_profiles FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public reads (so user can retrieve their profile by email)
CREATE POLICY "Allow public select on resume_profiles"
  ON resume_profiles FOR SELECT
  TO anon
  USING (true);

-- Allow updates (for re-editing)
CREATE POLICY "Allow public updates on resume_profiles"
  ON resume_profiles FOR UPDATE
  TO anon
  USING (true);
