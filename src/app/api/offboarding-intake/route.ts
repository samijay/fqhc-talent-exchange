import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";
import {
  offboardingConfirmationHtml,
  adminOffboardingNotificationHtml,
} from "@/lib/emails";

const offboardingSchema = z.object({
  orgName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(100),
  contactTitle: z.string().max(100).optional().default(""),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional().default(""),
  employeesAffected: z.string().max(20).optional().default(""),
  rolesAffected: z.array(z.string().max(100)).max(20).optional().default([]),
  reductionTimeline: z.string().max(100).optional().default(""),
  serviceTier: z.enum(["self-serve", "managed", "placement"]).optional().default("managed"),
  needsNda: z.boolean().optional().default(false),
  notes: z.string().max(2000).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 5 submissions per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`offboarding-intake:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = offboardingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const {
      orgName, contactName, contactTitle, email, phone,
      employeesAffected, rolesAffected, reductionTimeline,
      serviceTier, needsNda, notes, locale,
    } = result.data;

    const { error } = await supabaseAdmin
      .from("offboarding_intake")
      .insert({
        org_name: orgName,
        contact_name: contactName,
        contact_title: contactTitle || null,
        email,
        phone: phone || null,
        employees_affected: employeesAffected || null,
        roles_affected: rolesAffected,
        reduction_timeline: reductionTimeline || null,
        service_tier: serviceTier,
        needs_nda: needsNda,
        notes: notes || null,
      });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A request from this email has already been submitted." },
          { status: 409 }
        );
      }
      console.error("Supabase offboarding-intake error:", error.code, error.message);
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
              ? `Solicitud recibida, ${contactName} — FQHC Talent Exchange`
              : `Request received, ${contactName} — FQHC Talent Exchange`,
            html: offboardingConfirmationHtml({ contactName, orgName, locale }),
          }),
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Offboarding Intake: ${orgName}`,
            html: adminOffboardingNotificationHtml({
              orgName, contactName, contactTitle, email, phone,
              employeesAffected, rolesAffected, reductionTimeline,
              serviceTier, needsNda, notes,
            }),
          }),
        ]);
      } catch (emailErr) {
        console.error("[OFFBOARDING-INTAKE] Email send failed for:", email, "org:", orgName, "Error:", emailErr);
      }
    }

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
