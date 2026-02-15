-- Migration: Add resume upload columns to resume_profiles
-- Run this AFTER supabase-resume-profiles.sql has been executed
-- Safe to run multiple times (uses IF NOT EXISTS)

-- Store the Supabase Storage URL for the original uploaded resume file
ALTER TABLE resume_profiles
  ADD COLUMN IF NOT EXISTS original_resume_url TEXT;

-- Store the extracted plain text from the uploaded resume
ALTER TABLE resume_profiles
  ADD COLUMN IF NOT EXISTS original_resume_text TEXT;

-- Storage bucket policy: allow anonymous uploads to the "resumes" bucket
-- NOTE: You must first create a "resumes" bucket in Supabase Dashboard → Storage
-- Set it to PRIVATE with a 5MB file size limit

-- Allow anonymous uploads to the resumes bucket
CREATE POLICY "Allow public uploads to resumes bucket"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'resumes');

-- Allow reading files from the resumes bucket (for signed URL access)
CREATE POLICY "Allow public reads from resumes bucket"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'resumes');
