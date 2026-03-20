-- Content Reads — Track what users have read, are reading, or want to read
-- Run this in the Supabase SQL Editor
-- Created: 2026-03-19

-- ── Table ──
CREATE TABLE IF NOT EXISTS content_reads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reading' CHECK (status IN ('read', 'reading', 'want_to_read')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);

-- ── RLS ──
ALTER TABLE content_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own content_reads"
  ON content_reads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content_reads"
  ON content_reads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content_reads"
  ON content_reads FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content_reads"
  ON content_reads FOR DELETE
  USING (auth.uid() = user_id);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_content_reads_user
  ON content_reads(user_id);

CREATE INDEX IF NOT EXISTS idx_content_reads_user_type
  ON content_reads(user_id, content_type);

CREATE INDEX IF NOT EXISTS idx_content_reads_user_status
  ON content_reads(user_id, status);
