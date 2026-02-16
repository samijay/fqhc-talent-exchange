import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";
import {
  employerConfirmationHtml,
  adminEmployerNotificationHtml,
} from "@/lib/emails";

const employerSchema = z.object({
  orgName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(100),
  contactTitle: z.string().max(100).optional().default(""),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  positionsCount: z.string().max(20).optional().default(""),
  rolesNeeded: z.array(z.string().max(100)).max(20).optional().default([]),
  programsActive: z.array(z.string().max(100)).max(20).optional().default([]),
  ehrSystem: z.string().max(100).optional().default(""),
  timeline: z.string().max(100).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 5 signups per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`employer-waitlist:${ip}`, { limit: 5, windowMs: 60_000 });
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

    const { orgName, contactName, contactTitle, email, phone, positionsCount, rolesNeeded, programsActive, ehrSystem, timeline, notes, locale } = result.data;

    const { error } = await supabaseAdmin
      .from("employer_waitlist")
      .insert({
        org_name: orgName,
        contact_name: contactName,
        contact_title: contactTitle || null,
        email,
        phone: phone || null,
        positions_count: positionsCount || null,
        roles_needed: rolesNeeded,
        programs_active: programsActive,
        ehr_system: ehrSystem || null,
        timeline: timeline || null,
        notes: notes || null,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      console.error("Supabase employer-waitlist error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
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
              ? `¡Solicitud recibida, ${contactName}! — FQHC Talent Exchange`
              : `Request received, ${contactName}! — FQHC Talent Exchange`,
            html: employerConfirmationHtml({ contactName, orgName, locale }),
          }),
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Employer Request: ${orgName}`,
            html: adminEmployerNotificationHtml({
              orgName, contactName, contactTitle, email, phone,
              positionsCount, rolesNeeded, programsActive, ehrSystem, timeline, notes,
            }),
          }),
        ]);
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    // Only return success message — no database row
    return NextResponse.json({
      message: "Request received!",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  // Rate limit: 30 reads per minute per IP
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`employer-waitlist-get:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { count, error } = await supabaseAdmin
    .from("employer_waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
