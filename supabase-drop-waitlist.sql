-- Drop Waitlist table for The Drop matching program
-- Stores both candidate and employer waitlist signups
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS drop_waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('candidate', 'employer')),
  name text NOT NULL,
  email text NOT NULL,
  role_preference text,
  region text,
  has_assessment boolean DEFAULT false,
  org_name text,
  roles_needed text[],
  ehr_system text,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(email, type)
);

-- Enable RLS
ALTER TABLE drop_waitlist ENABLE ROW LEVEL SECURITY;

-- No public access — admin only (via service role key)
-- The API route uses supabaseAdmin which bypasses RLS

-- Index for lookups
CREATE INDEX IF NOT EXISTS idx_drop_waitlist_type ON drop_waitlist(type);
CREATE INDEX IF NOT EXISTS idx_drop_waitlist_email ON drop_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_drop_waitlist_created_at ON drop_waitlist(created_at DESC);
