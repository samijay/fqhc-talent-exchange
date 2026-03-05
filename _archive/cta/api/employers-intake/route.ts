import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/security";

const positionSchema = z.object({
  title: z.string().max(200),
  roleType: z.string().max(100),
  salaryMin: z.string().max(20).optional().default(""),
  salaryMax: z.string().max(20).optional().default(""),
  urgency: z.string().max(50).optional().default(""),
});

const employerSchema = z.object({
  organizationName: z.string().min(1).max(200),
  website: z.string().max(500).optional().default(""),
  contactName: z.string().min(1).max(100),
  contactEmail: z.string().email().max(255),
  contactPhone: z.string().max(30).optional().default(""),
  ehrSystem: z.string().max(100).optional().default(""),
  positions: z.array(positionSchema).max(20).optional().default([]),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`employers:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = employerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const { organizationName, website, contactName, contactEmail, contactPhone, ehrSystem, positions } = result.data;

    // Insert employer
    const { data: employer, error: employerError } = await supabaseAdmin
      .from("employers")
      .insert({
        organization_name: organizationName,
        website: website || null,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        ehr_system: ehrSystem || null,
      })
      .select("id")
      .single();

    if (employerError) {
      console.error("Supabase employer insert error:", employerError.code, employerError.message);
      return NextResponse.json(
        { error: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }

    // Insert job openings if provided
    if (positions.length > 0 && employer?.id) {
      const jobRows = positions.map((pos) => ({
        employer_id: employer.id,
        title: pos.title,
        role_type: pos.roleType,
        salary_min: pos.salaryMin ? Number(pos.salaryMin) : null,
        salary_max: pos.salaryMax ? Number(pos.salaryMax) : null,
        urgency: pos.urgency || null,
      }));

      const { error: jobsError } = await supabaseAdmin
        .from("job_openings")
        .insert(jobRows);

      if (jobsError) {
        console.error("Supabase job_openings insert error:", jobsError.code, jobsError.message);
        return NextResponse.json(
          { message: "Employer profile created but some positions failed to save. We'll follow up." },
          { status: 201 }
        );
      }
    }

    // Only return success message — no database row
    return NextResponse.json(
      { message: "Submitted successfully!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
