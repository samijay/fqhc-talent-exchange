-- OKR Team Sprint Tables
-- Migration for the team OKR sprint feature
-- Run this after the existing Supabase schema is in place

-- ============================================================
-- Team Sprints
-- ============================================================

CREATE TABLE IF NOT EXISTS okr_team_sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('planning', 'active', 'reviewing', 'completed')),
  invite_code TEXT NOT NULL UNIQUE,
  start_date DATE,
  end_date DATE,
  current_session_index INT NOT NULL DEFAULT 0,
  team_members JSONB NOT NULL DEFAULT '[]'
    -- Array of: { userId, email, name, role, joinedAt, lastActiveAt }
);

-- Index for invite code lookups
CREATE INDEX IF NOT EXISTS idx_okr_sprints_invite_code
  ON okr_team_sprints(invite_code);

-- Index for admin's sprints
CREATE INDEX IF NOT EXISTS idx_okr_sprints_admin_id
  ON okr_team_sprints(admin_id);

-- ============================================================
-- Sprint Sessions
-- ============================================================

CREATE TABLE IF NOT EXISTS okr_sprint_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sprint_id UUID NOT NULL REFERENCES okr_team_sprints(id) ON DELETE CASCADE,
  session_number INT NOT NULL CHECK (session_number BETWEEN 1 AND 4),
  session_type TEXT NOT NULL
    CHECK (session_type IN ('alignment', 'drafting', 'workshop', 'readiness')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  data JSONB NOT NULL DEFAULT '{}',
  UNIQUE (sprint_id, session_number)
);

-- ============================================================
-- Draft Objectives
-- ============================================================

CREATE TABLE IF NOT EXISTS okr_draft_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sprint_id UUID NOT NULL REFERENCES okr_team_sprints(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner_name TEXT NOT NULL DEFAULT '',
  domain TEXT NOT NULL
    CHECK (domain IN (
      'revenue-resilience',
      'workforce-retention',
      'patient-access',
      'operational-efficiency',
      'cross-department'
    )),
  objective_text TEXT NOT NULL,
  objective_text_es TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'reviewed', 'finalized')),
  feedback JSONB NOT NULL DEFAULT '[]'
    -- Array of: { authorId, authorName, comment, createdAt }
);

-- Index for sprint objectives
CREATE INDEX IF NOT EXISTS idx_okr_objectives_sprint_id
  ON okr_draft_objectives(sprint_id);

-- ============================================================
-- Draft Key Results
-- ============================================================

CREATE TABLE IF NOT EXISTS okr_draft_key_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  objective_id UUID NOT NULL REFERENCES okr_draft_objectives(id) ON DELETE CASCADE,
  kr_text TEXT NOT NULL,
  kr_text_es TEXT,
  metric TEXT,
  baseline TEXT,
  target_value TEXT,
  measurability_score NUMERIC NOT NULL DEFAULT 0
    CHECK (measurability_score BETWEEN 0 AND 100),
  ambition_score NUMERIC NOT NULL DEFAULT 0
    CHECK (ambition_score BETWEEN 0 AND 100),
  comments JSONB NOT NULL DEFAULT '[]'
    -- Array of: { authorId, authorName, comment, createdAt }
);

-- Index for objective key results
CREATE INDEX IF NOT EXISTS idx_okr_key_results_objective_id
  ON okr_draft_key_results(objective_id);

-- ============================================================
-- Sprint Results (AI assessment output)
-- ============================================================

CREATE TABLE IF NOT EXISTS okr_sprint_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sprint_id UUID NOT NULL REFERENCES okr_team_sprints(id) ON DELETE CASCADE,
  alignment_score NUMERIC CHECK (alignment_score BETWEEN 0 AND 100),
  coverage_score NUMERIC CHECK (coverage_score BETWEEN 0 AND 100),
  quality_score NUMERIC CHECK (quality_score BETWEEN 0 AND 100),
  readiness_assessment JSONB DEFAULT '{}',
  exported_at TIMESTAMPTZ,
  export_format TEXT CHECK (export_format IN ('docx', 'xlsx', 'pdf'))
);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

ALTER TABLE okr_team_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_sprint_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_draft_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_draft_key_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_sprint_results ENABLE ROW LEVEL SECURITY;

-- Sprint admin can do everything
CREATE POLICY "Sprint admin full access" ON okr_team_sprints
  FOR ALL USING (admin_id = auth.uid());

-- Sprint members can read sprints they belong to
CREATE POLICY "Sprint members can read" ON okr_team_sprints
  FOR SELECT USING (
    admin_id = auth.uid()
    OR team_members @> format('[{"userId": "%s"}]', auth.uid())::jsonb
  );

-- Session access for sprint members
CREATE POLICY "Sprint members can access sessions" ON okr_sprint_sessions
  FOR ALL USING (
    sprint_id IN (
      SELECT id FROM okr_team_sprints
      WHERE admin_id = auth.uid()
        OR team_members @> format('[{"userId": "%s"}]', auth.uid())::jsonb
    )
  );

-- Objective owners can manage their own
CREATE POLICY "Objective owners can manage" ON okr_draft_objectives
  FOR ALL USING (owner_id = auth.uid());

-- Sprint members can read all objectives in their sprint
CREATE POLICY "Sprint members can read objectives" ON okr_draft_objectives
  FOR SELECT USING (
    sprint_id IN (
      SELECT id FROM okr_team_sprints
      WHERE admin_id = auth.uid()
        OR team_members @> format('[{"userId": "%s"}]', auth.uid())::jsonb
    )
  );

-- KR access follows objective access
CREATE POLICY "KR access follows objective" ON okr_draft_key_results
  FOR ALL USING (
    objective_id IN (
      SELECT id FROM okr_draft_objectives WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Sprint members can read KRs" ON okr_draft_key_results
  FOR SELECT USING (
    objective_id IN (
      SELECT o.id FROM okr_draft_objectives o
      JOIN okr_team_sprints s ON o.sprint_id = s.id
      WHERE s.admin_id = auth.uid()
        OR s.team_members @> format('[{"userId": "%s"}]', auth.uid())::jsonb
    )
  );

-- Results visible to sprint members
CREATE POLICY "Sprint members can view results" ON okr_sprint_results
  FOR SELECT USING (
    sprint_id IN (
      SELECT id FROM okr_team_sprints
      WHERE admin_id = auth.uid()
        OR team_members @> format('[{"userId": "%s"}]', auth.uid())::jsonb
    )
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_okr_sprints_modtime
  BEFORE UPDATE ON okr_team_sprints
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_okr_objectives_modtime
  BEFORE UPDATE ON okr_draft_objectives
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_okr_key_results_modtime
  BEFORE UPDATE ON okr_draft_key_results
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();
