-- Manager / Team Readiness Assessment Results
CREATE TABLE IF NOT EXISTS manager_assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  role_id         TEXT NOT NULL,
  overall_score   INTEGER NOT NULL,
  domain_scores   JSONB NOT NULL DEFAULT '{}',
  strengths       TEXT[] DEFAULT '{}',
  growth_areas    TEXT[] DEFAULT '{}',
  stars_type      TEXT,
  locale          TEXT DEFAULT 'en',
  session_id      TEXT  -- anonymous browser fingerprint if available
);

ALTER TABLE manager_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON manager_assessments
  FOR ALL TO service_role USING (true);

CREATE POLICY "anon_insert" ON manager_assessments
  FOR INSERT TO anon WITH CHECK (true);
