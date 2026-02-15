-- Displaced Worker Fast-Track Funnel
-- Table for workers recently laid off from FQHCs who need immediate placement
-- Created: February 2026

CREATE TABLE IF NOT EXISTS displaced_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Personal info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,

  -- Displacement details
  previous_employer TEXT,
  previous_role TEXT,
  layoff_date TEXT,
  available_start TEXT DEFAULT 'immediately',

  -- FQHC-specific qualifications
  years_experience TEXT,
  programs TEXT[] DEFAULT '{}',
  ehr_systems TEXT[] DEFAULT '{}',
  bilingual TEXT DEFAULT 'no',

  -- Geographic flexibility
  current_region TEXT,
  open_to_regions TEXT[] DEFAULT '{}',
  willing_to_relocate BOOLEAN DEFAULT FALSE,

  -- Status tracking
  status TEXT DEFAULT 'new',
  notes TEXT
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_displaced_candidates_status ON displaced_candidates(status);
CREATE INDEX IF NOT EXISTS idx_displaced_candidates_email ON displaced_candidates(email);
