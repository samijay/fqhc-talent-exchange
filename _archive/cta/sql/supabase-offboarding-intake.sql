-- ================================================================
-- FQHC Talent Exchange — Offboarding Intake Table
-- Run this in Supabase SQL Editor
-- ================================================================

CREATE TABLE offboarding_intake (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  employees_affected TEXT,
  roles_affected TEXT[] DEFAULT '{}',
  reduction_timeline TEXT,
  service_tier TEXT DEFAULT 'managed',
  needs_nda BOOLEAN DEFAULT FALSE,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','in_progress','completed','archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint on email (one intake per org email)
CREATE UNIQUE INDEX offboarding_intake_email_unique ON offboarding_intake (email);

-- Enable RLS
ALTER TABLE offboarding_intake ENABLE ROW LEVEL SECURITY;

-- Service role can do everything, anon can only insert
CREATE POLICY "Service role full access" ON offboarding_intake FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon can insert" ON offboarding_intake FOR INSERT WITH CHECK (true);
