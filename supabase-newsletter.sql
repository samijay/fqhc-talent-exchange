-- Run this in Supabase SQL Editor
-- Newsletter subscriber management table for FQHC Talent Exchange
-- Supports two tracks: Intel Brief (employer-facing) and The Pulse (candidate-facing)

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  audience TEXT NOT NULL CHECK (audience IN ('intel-brief', 'the-pulse', 'both')),
  region TEXT,
  role_interest TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  unsubscribe_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: service_role (backend) can do everything
CREATE POLICY "service_role_all_access" ON public.newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy: anon can INSERT only (for signup form)
CREATE POLICY "anon_can_insert" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Indexes for performance
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX idx_newsletter_subscribers_audience ON public.newsletter_subscribers(audience);
CREATE INDEX idx_newsletter_subscribers_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO service_role;
GRANT INSERT ON public.newsletter_subscribers TO anon;
