import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";
import {
  displacedCandidateConfirmationHtml,
  adminDisplacedCandidateNotificationHtml,
} from "@/lib/emails";

const displacedSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  previousEmployer: z.string().max(200).optional().default(""),
  previousRole: z.string().max(200).optional().default(""),
  layoffDate: z.string().max(20).optional().default(""),
  availableStart: z.string().max(50).optional().default("immediately"),
  yearsExperience: z.string().max(50).optional().default(""),
  ehrSystems: z.array(z.string().max(100)).max(20).optional().default([]),
  programs: z.array(z.string().max(100)).max(20).optional().default([]),
  bilingual: z.string().max(50).optional().default(""),
  currentRegion: z.string().max(100).optional().default(""),
  openToRegions: z.array(z.string().max(100)).max(10).optional().default([]),
  willingToRelocate: z.boolean().optional().default(false),
  notes: z.string().max(2000).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 5 signups per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`displaced-candidates:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = displacedSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const {
      firstName, lastName, email, phone, previousEmployer, previousRole,
      layoffDate, availableStart, yearsExperience, ehrSystems, programs,
      bilingual, currentRegion, openToRegions, willingToRelocate, notes, locale,
    } = result.data;

    const { error } = await supabaseAdmin
      .from("displaced_candidates")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        previous_employer: previousEmployer || null,
        previous_role: previousRole || null,
        layoff_date: layoffDate || null,
        available_start: availableStart || "immediately",
        years_experience: yearsExperience || null,
        ehr_systems: ehrSystems,
        programs: programs,
        bilingual: bilingual || null,
        current_region: currentRegion || null,
        open_to_regions: openToRegions,
        willing_to_relocate: willingToRelocate,
        notes: notes || null,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already in the fast-track pool." },
          { status: 409 },
        );
      }
      console.error("Supabase displaced-candidates error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    // Send emails (non-blocking)
    if (resend) {
      try {
        await Promise.all([
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: locale === "es"
              ? `¡Estás en el grupo prioritario, ${firstName}! — FQHC Talent Exchange`
              : `You're in the priority pool, ${firstName}! — FQHC Talent Exchange`,
            html: displacedCandidateConfirmationHtml({ firstName, locale }),
          }),
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `⚡ FAST-TRACK: ${firstName} ${lastName} — ${previousRole || "Displaced Worker"}`,
            html: adminDisplacedCandidateNotificationHtml({
              firstName, lastName, email, phone, previousEmployer, previousRole,
              layoffDate, availableStart, yearsExperience, ehrSystems, programs,
              bilingual, currentRegion, openToRegions, willingToRelocate, notes,
            }),
          }),
        ]);
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    // Only return success message — no database row
    return NextResponse.json({
      message: "You're in the Fast-Track pool!",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}

export async function GET(request: Request) {
  // Rate limit: 30 reads per minute per IP
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`displaced-candidates-get:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { count, error } = await supabaseAdmin
    .from("displaced_candidates")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
