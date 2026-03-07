-- Employer Offboarding Intake Submissions
CREATE TABLE IF NOT EXISTS offboarding_intake (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  -- Org info
  org_name      TEXT NOT NULL,
  contact_name  TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  org_size      TEXT,
  region        TEXT,
  -- Layoff details
  roles_affected TEXT[] DEFAULT '{}',
  workers_count  INTEGER,
  effective_date TEXT,
  -- Service tier
  service_tier   TEXT NOT NULL DEFAULT 'self-serve',
  nda_requested  BOOLEAN DEFAULT false,
  notes          TEXT,
  -- Workflow
  status         TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','in_progress','completed','archived'))
);

ALTER TABLE offboarding_intake ENABLE ROW LEVEL SECURITY;

-- Service role can do everything; anon can only insert
CREATE POLICY "service_role_all" ON offboarding_intake
  FOR ALL TO service_role USING (true);

CREATE POLICY "anon_insert" ON offboarding_intake
  FOR INSERT TO anon WITH CHECK (true);
