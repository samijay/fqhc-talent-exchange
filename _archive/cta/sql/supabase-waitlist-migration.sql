-- Candidate waitlist table
CREATE TABLE candidate_waitlist (
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
CREATE TABLE employer_waitlist (
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

-- Enable Row Level Security
ALTER TABLE candidate_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (public forms)
CREATE POLICY "Allow public inserts on candidate_waitlist"
  ON candidate_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on employer_waitlist"
  ON employer_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow count reads from anon key (for live counters)
CREATE POLICY "Allow public count on candidate_waitlist"
  ON candidate_waitlist FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public count on employer_waitlist"
  ON employer_waitlist FOR SELECT
  TO anon
  USING (true);
