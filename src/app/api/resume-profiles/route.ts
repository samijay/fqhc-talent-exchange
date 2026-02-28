import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const workHistorySchema = z.object({
  employer: z.string().max(200).optional().default(""),
  title: z.string().max(200).optional().default(""),
  startDate: z.string().max(20).optional().default(""),
  endDate: z.string().max(20).optional().default(""),
  current: z.boolean().optional().default(false),
});

const educationSchema = z.object({
  institution: z.string().max(200).optional().default(""),
  degree: z.string().max(200).optional().default(""),
  year: z.string().max(10).optional().default(""),
});

const resumeProfileSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  city: z.string().max(100).optional().default(""),
  region: z.string().max(100).optional().default(""),
  roleType: z.string().min(1).max(100),
  yearsExperience: z.string().max(50).optional().default(""),
  objective: z.string().max(5000).optional().default(""),
  ehrSystems: z.array(z.string().max(100)).max(20).optional().default([]),
  programs: z.array(z.string().max(100)).max(20).optional().default([]),
  certifications: z.array(z.string().max(200)).max(20).optional().default([]),
  languages: z.array(z.string().max(50)).max(10).optional().default([]),
  selectedBullets: z.array(z.string().max(100)).max(20).optional().default([]),
  workHistory: z.array(workHistorySchema).max(20).optional().default([]),
  education: z.array(educationSchema).max(10).optional().default([]),
  originalResumeUrl: z.string().max(2000).optional().default(""),
  originalResumeText: z.string().max(50000).optional().default(""),
  assessmentResults: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 10 per minute per IP (save is called during building)
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`resume-profiles:${ip}`, { limit: 10, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = resumeProfileSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const {
      firstName, lastName, email, phone, city, region, roleType,
      yearsExperience, objective, ehrSystems, programs, certifications,
      languages, selectedBullets, workHistory, education,
      originalResumeUrl, originalResumeText, assessmentResults,
    } = result.data;

    // Insert-only (no upsert) — prevents overwriting another user's profile.
    // If the email already exists, we return success silently to avoid
    // leaking whether an email is already in the system.
    const { error } = await supabaseAdmin
      .from("resume_profiles")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        phone: phone || null,
        city: city || null,
        region: region || null,
        role_type: roleType,
        years_experience: yearsExperience || null,
        objective: objective || null,
        ehr_systems: ehrSystems,
        programs: programs,
        certifications: certifications,
        languages: languages,
        selected_bullets: selectedBullets,
        work_history: workHistory,
        education: education,
        original_resume_url: originalResumeUrl || null,
        original_resume_text: originalResumeText || null,
        assessment_results: assessmentResults || null,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      // Unique constraint violation (email already exists) — return success
      // to avoid leaking whether an email is registered
      if (error.code === "23505") {
        return NextResponse.json({ message: "Profile saved!" });
      }
      console.error("Supabase resume-profiles error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Profile saved!" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
