-- Newsletter Engagement Tracking
-- Stores open/click/bounce/complaint events from Resend webhooks
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS newsletter_engagement (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('delivered', 'opened', 'clicked', 'bounced', 'complained')),
  resend_email_id TEXT,
  subject TEXT,
  click_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by email (subscriber engagement history)
CREATE INDEX IF NOT EXISTS idx_newsletter_engagement_email ON newsletter_engagement(email);

-- Index for analytics queries (event counts by type)
CREATE INDEX IF NOT EXISTS idx_newsletter_engagement_type ON newsletter_engagement(event_type);

-- Add last_engaged_at to newsletter_subscribers if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'last_engaged_at'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN last_engaged_at TIMESTAMPTZ;
  END IF;
END $$;

-- RLS: Only service role can write (webhooks use service key)
ALTER TABLE newsletter_engagement ENABLE ROW LEVEL SECURITY;

-- No public access — only service role
CREATE POLICY "Service role full access" ON newsletter_engagement
  FOR ALL USING (auth.role() = 'service_role');

-- View for quick engagement stats
CREATE OR REPLACE VIEW newsletter_engagement_stats AS
SELECT
  email,
  COUNT(*) FILTER (WHERE event_type = 'delivered') AS delivered_count,
  COUNT(*) FILTER (WHERE event_type = 'opened') AS opened_count,
  COUNT(*) FILTER (WHERE event_type = 'clicked') AS clicked_count,
  COUNT(*) FILTER (WHERE event_type = 'bounced') AS bounced_count,
  COUNT(*) FILTER (WHERE event_type = 'complained') AS complained_count,
  MAX(created_at) FILTER (WHERE event_type = 'opened') AS last_opened_at,
  MAX(created_at) FILTER (WHERE event_type = 'clicked') AS last_clicked_at
FROM newsletter_engagement
GROUP BY email;
