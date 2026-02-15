-- Migration: Add assessment results column to resume_profiles
-- Run this AFTER supabase-resume-profiles.sql has been executed
-- Safe to run multiple times (uses IF NOT EXISTS)

-- Store career assessment results as JSONB
ALTER TABLE resume_profiles
  ADD COLUMN IF NOT EXISTS assessment_results JSONB;
