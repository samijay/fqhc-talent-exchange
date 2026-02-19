-- Feedback submissions table
-- Run this migration in your Supabase SQL editor

CREATE TABLE feedback_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('bug', 'suggestion', 'praise', 'other')),
  message text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the service role (API routes use supabaseAdmin)
-- No public read access needed — feedback is admin-only
