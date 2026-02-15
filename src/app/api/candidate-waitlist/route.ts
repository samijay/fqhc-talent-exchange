import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";
import {
  candidateConfirmationHtml,
  adminCandidateNotificationHtml,
} from "@/lib/emails";

const candidateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  region: z.string().max(100).optional().default(""),
  currentRole: z.string().max(200).optional().default(""),
  yearsExperience: z.string().max(50).optional().default(""),
  ehrSystems: z.array(z.string().max(100)).max(20).optional().default([]),
  programs: z.array(z.string().max(100)).max(20).optional().default([]),
  bilingual: z.string().max(50).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 5 signups per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`candidate-waitlist:${ip}`, { limit: 5, windowMs: 60_000 });
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

    const { firstName, lastName, email, phone, region, currentRole, yearsExperience, ehrSystems, programs, bilingual, notes, locale } = result.data;

    const { error } = await supabaseAdmin
      .from("candidate_waitlist")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        region: region || null,
        role_title: currentRole || null,
        years_experience: yearsExperience || null,
        ehr_systems: ehrSystems,
        programs: programs,
        bilingual: bilingual || null,
        notes: notes || null,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      console.error("Supabase candidate-waitlist error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Get the count for position number
    const { count } = await supabaseAdmin
      .from("candidate_waitlist")
      .select("*", { count: "exact", head: true });

    const position = count ?? 1;

    // Send emails (non-blocking — don't let email failures break the form)
    if (resend) {
      try {
        await Promise.all([
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: locale === "es"
              ? `¡Estás en la lista, ${firstName}! — FQHC Talent Exchange`
              : `You're on the list, ${firstName}! — FQHC Talent Exchange`,
            html: candidateConfirmationHtml({ firstName, position, locale }),
          }),
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Candidate Signup: ${firstName} ${lastName} (#${position})`,
            html: adminCandidateNotificationHtml({
              firstName, lastName, email, phone, region, currentRole,
              yearsExperience, ehrSystems, programs, bilingual, notes, position,
            }),
          }),
        ]);
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    // Only return what the client needs — no database row
    return NextResponse.json({
      message: "You're on the list!",
      position,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from("candidate_waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
