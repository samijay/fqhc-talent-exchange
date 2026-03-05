-- Locum tenens tables for FQHC Talent Exchange
-- Run this migration in your Supabase SQL Editor

-- ================================================================
-- locum_providers — providers interested in locum coverage work
-- ================================================================

CREATE TABLE IF NOT EXISTS public.locum_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('md', 'np', 'pa', 'dentist')),
  license_number TEXT,
  available_days TEXT,
  region TEXT,
  ehr_experience TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.locum_providers ENABLE ROW LEVEL SECURITY;

-- Policy: service_role (backend) can do everything
CREATE POLICY "service_role_all_access" ON public.locum_providers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy: anon can INSERT only (for signup form)
CREATE POLICY "anon_can_insert" ON public.locum_providers
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Policy: authenticated can INSERT only
CREATE POLICY "authenticated_can_insert" ON public.locum_providers
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_locum_providers_email ON public.locum_providers(email);
CREATE INDEX idx_locum_providers_role ON public.locum_providers(role);
CREATE INDEX idx_locum_providers_region ON public.locum_providers(region);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locum_providers TO service_role;
GRANT INSERT ON public.locum_providers TO anon;
GRANT INSERT ON public.locum_providers TO authenticated;

-- ================================================================
-- locum_requests — FQHC coverage requests
-- ================================================================

CREATE TABLE IF NOT EXISTS public.locum_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('md', 'np', 'pa', 'dentist')),
  start_date TEXT,
  end_date TEXT,
  hours_per_day TEXT,
  ehr_system TEXT,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'matched', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.locum_requests ENABLE ROW LEVEL SECURITY;

-- Policy: service_role (backend) can do everything
CREATE POLICY "service_role_all_access" ON public.locum_requests
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy: anon can INSERT only (for request form)
CREATE POLICY "anon_can_insert" ON public.locum_requests
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- Policy: authenticated can INSERT only
CREATE POLICY "authenticated_can_insert" ON public.locum_requests
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_locum_requests_contact_email ON public.locum_requests(contact_email);
CREATE INDEX idx_locum_requests_provider_type ON public.locum_requests(provider_type);
CREATE INDEX idx_locum_requests_status ON public.locum_requests(status);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locum_requests TO service_role;
GRANT INSERT ON public.locum_requests TO anon;
GRANT INSERT ON public.locum_requests TO authenticated;
