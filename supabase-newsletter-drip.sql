-- ── Welcome Drip Email Sequences ──────────────────────────────────────
-- Adds drip_step tracking to newsletter_subscribers
-- Run this once in the Supabase SQL Editor
-- ──────────────────────────────────────────────────────────────────────

-- Add drip_step column to track which drip email to send next
-- 0 = no drip sent yet (just welcome)
-- 1 = Day 3 email sent
-- 2 = Day 7 email sent
-- 3 = Day 10/14 email sent
-- 4 = Day 14/21 email sent (fully onboarded)
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS drip_step INTEGER NOT NULL DEFAULT 0;

-- Index for efficient cron queries (find subscribers due for next drip step)
CREATE INDEX IF NOT EXISTS idx_newsletter_subs_drip
  ON newsletter_subscribers (audience, status, drip_step, subscribed_at);
