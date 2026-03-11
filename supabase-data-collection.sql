-- =============================================================================
-- FQHC Talent Exchange — Data Collection Tables
-- Run in: Supabase SQL Editor (https://supabase.com/dashboard)
-- Purpose: Server-side tracking of tool usage, course progress, and downloads
-- =============================================================================

-- 1. Tool Usage Events
-- Tracks meaningful interactions: OKR downloads, simulator runs, course enrollments
-- This is lightweight analytics — NOT page views, just high-value actions
CREATE TABLE IF NOT EXISTS tool_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,          -- 'okr_download', 'course_enroll', 'simulator_run', 'resume_create', 'pathway_start'
  tool_name TEXT NOT NULL,           -- 'okr-templates', 'okr-course', 'clinic-simulator', 'resume-builder', 'learning-pathway'
  item_id TEXT,                      -- specific template/course/module ID (e.g., 'financial-survival-2026')
  email TEXT,                        -- optional, only if user provides it
  metadata JSONB DEFAULT '{}'::JSONB, -- flexible: { size: 'mid-size', priority: 'maximize-revenue', locale: 'en' }
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by event type and tool
CREATE INDEX IF NOT EXISTS idx_tool_events_type ON tool_events(event_type);
CREATE INDEX IF NOT EXISTS idx_tool_events_tool ON tool_events(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_events_email ON tool_events(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tool_events_created ON tool_events(created_at DESC);

-- 2. Course Progress (server-side sync)
-- Mirrors localStorage progress for users who opt in to save their progress
CREATE TABLE IF NOT EXISTS course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  course_id TEXT NOT NULL,           -- 'okr-course', 'learning-pathway', 'academy-*'
  modules_completed TEXT[] DEFAULT '{}',
  exercise_scores JSONB DEFAULT '{}'::JSONB,
  total_xp INTEGER DEFAULT 0,
  current_module_id TEXT,
  capstone_data JSONB,              -- for OKR course capstone submission
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, course_id)
);

CREATE INDEX IF NOT EXISTS idx_course_progress_email ON course_progress(email);
CREATE INDEX IF NOT EXISTS idx_course_progress_course ON course_progress(course_id);

-- 3. OKR Submissions (when users complete/customize OKR templates)
-- Captures the actual OKR data users create, not just that they downloaded
CREATE TABLE IF NOT EXISTS okr_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  org_name TEXT,
  template_ids TEXT[] DEFAULT '{}',  -- which templates they based it on
  objectives JSONB NOT NULL,         -- their actual OKRs: [{objective, keyResults: [{kr, target, current}]}]
  metadata JSONB DEFAULT '{}'::JSONB, -- { role: 'ceo', orgSize: 'mid-size', region: 'bay-area' }
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_okr_submissions_email ON okr_submissions(email);

-- RLS Policies — service role only (no public access)
ALTER TABLE tool_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE okr_submissions ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (API routes use service key)
CREATE POLICY "Service role full access on tool_events"
  ON tool_events FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on course_progress"
  ON course_progress FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on okr_submissions"
  ON okr_submissions FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================================================
-- DONE! Three new tables:
--   1. tool_events       — lightweight event tracking for all tools
--   2. course_progress   — server-side course/pathway progress sync
--   3. okr_submissions   — actual OKR data users create
--
-- Next: Set up API routes in the Next.js app to write to these tables
-- =============================================================================
