import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const candidateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  currentRole: z.string().max(200).optional().default(""),
  yearsExperience: z.string().max(50).optional().default(""),
  skills: z.array(z.string().max(100)).max(50).optional().default([]),
  preferredLocations: z.array(z.string().max(100)).max(20).optional().default([]),
  availability: z.string().max(50).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`candidates:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = candidateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, currentRole, yearsExperience, skills, preferredLocations, availability } = result.data;

    const { error } = await supabaseAdmin
      .from("candidates")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        job_role: currentRole || null,
        years_experience: yearsExperience || null,
        skills: skills,
        preferred_locations: preferredLocations,
        availability: availability || null,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A candidate with this email already exists." },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", error.code, error.message);
      return NextResponse.json(
        { error: "Failed to submit profile. Please try again." },
        { status: 500 }
      );
    }

    // Only return success message — no database row
    return NextResponse.json(
      { message: "Profile submitted successfully!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
