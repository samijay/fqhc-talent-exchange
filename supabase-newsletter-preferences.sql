-- Newsletter Subscriber Preferences Migration
-- Run in Supabase SQL Editor after supabase-newsletter.sql
-- Adds personalization columns to capture questionnaire answers

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS role_type TEXT,
  ADD COLUMN IF NOT EXISTS primary_challenge TEXT,
  ADD COLUMN IF NOT EXISTS org_size TEXT;

-- Indexes for segment querying in /intel-brief
CREATE INDEX IF NOT EXISTS idx_newsletter_subs_challenge
  ON newsletter_subscribers(primary_challenge)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_newsletter_subs_role
  ON newsletter_subscribers(role_type)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_newsletter_subs_org_size
  ON newsletter_subscribers(org_size)
  WHERE status = 'active';

-- Helpful view: subscriber segment breakdown for intel-brief curation
CREATE OR REPLACE VIEW newsletter_segments AS
SELECT
  audience,
  role_type,
  primary_challenge,
  org_size,
  COUNT(*) AS subscriber_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY audience), 1) AS pct_of_audience
FROM newsletter_subscribers
WHERE status = 'active'
GROUP BY audience, role_type, primary_challenge, org_size
ORDER BY audience, subscriber_count DESC;

-- Helpful view: topic interest aggregation from preferences JSONB
CREATE OR REPLACE VIEW newsletter_topic_interests AS
SELECT
  topic,
  COUNT(*) AS interested_count
FROM newsletter_subscribers,
  jsonb_array_elements_text(COALESCE(preferences->'topics', '[]'::jsonb)) AS topic
WHERE status = 'active'
GROUP BY topic
ORDER BY interested_count DESC;
