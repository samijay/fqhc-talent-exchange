import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp, escapeHtml, EMAIL_FOOTER_HTML, validateOrigin } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  POST /api/offboarding-intake — Employer transition intake form      */
/* ------------------------------------------------------------------ */

const intakeSchema = z.object({
  orgName:       z.string().min(1).max(200),
  contactName:   z.string().min(1).max(100),
  contactEmail:  z.string().email().max(255),
  contactPhone:  z.string().max(30).optional(),
  orgSize:       z.string().max(50).optional(),
  region:        z.string().max(100).optional(),
  rolesAffected: z.array(z.string().max(100)).max(20).default([]),
  workersCount:  z.number().int().min(1).max(10000).optional(),
  effectiveDate: z.string().max(30).optional(),
  serviceTier:   z.enum(["self-serve", "managed", "placement"]).default("self-serve"),
  ndaRequested:  z.boolean().default(false),
  notes:         z.string().max(3000).optional(),
});

const SERVICE_TIER_LABELS: Record<string, string> = {
  "self-serve": "Self-Serve (Free Tools)",
  "managed":    "Managed Transition ($500–$1,500)",
  "placement":  "Placement Partnership ($2,000–$5,000)",
};

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`offboarding-intake:${ip}`, {
      limit: 3,
      windowMs: 3_600_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = intakeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const {
      orgName, contactName, contactEmail, contactPhone,
      orgSize, region, rolesAffected, workersCount,
      effectiveDate, serviceTier, ndaRequested, notes,
    } = result.data;

    const { error } = await supabaseAdmin.from("offboarding_intake").insert({
      org_name:      orgName,
      contact_name:  contactName,
      contact_email: contactEmail.toLowerCase(),
      contact_phone: contactPhone || null,
      org_size:      orgSize || null,
      region:        region || null,
      roles_affected: rolesAffected,
      workers_count:  workersCount || null,
      effective_date: effectiveDate || null,
      service_tier:   serviceTier,
      nda_requested:  ndaRequested,
      notes:          notes || null,
      status:         "new",
    });

    if (error) {
      console.error("Supabase offboarding_intake error:", error.code, error.message);
      if (error.code === "42P01") {
        return NextResponse.json(
          { error: "This feature is temporarily unavailable. Please try again later." },
          { status: 503 },
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    const tierLabel = SERVICE_TIER_LABELS[serviceTier] ?? serviceTier;

    // Confirmation email to submitter
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: contactEmail.toLowerCase(),
          subject: `Transition Request Received — ${orgName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#1c1917 0%,#292524 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#d6d3d1;font-size:14px;margin:8px 0 0 0;">Workforce Transition Services</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;">We received your request</h2>
  <p style="color:#44403c;line-height:1.6;">
    Hi ${escapeHtml(contactName)}, thank you for reaching out. We've received the transition request for
    <strong>${escapeHtml(orgName)}</strong> and will contact you within 24 hours to discuss next steps.
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e7e5e4;margin:16px 0;">
    <tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;width:40%;">Service Tier</td><td style="padding:8px 12px;">${escapeHtml(tierLabel)}</td></tr>
    ${workersCount ? `<tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">Workers Affected</td><td style="padding:8px 12px;">${workersCount.toLocaleString()}</td></tr>` : ""}
    ${rolesAffected.length > 0 ? `<tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">Roles</td><td style="padding:8px 12px;">${escapeHtml(rolesAffected.join(", "))}</td></tr>` : ""}
    ${effectiveDate ? `<tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">Effective Date</td><td style="padding:8px 12px;">${escapeHtml(effectiveDate)}</td></tr>` : ""}
    ${ndaRequested ? `<tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">NDA</td><td style="padding:8px 12px;">Requested — we'll send one before our first call</td></tr>` : ""}
  </table>

  <div style="background:#f0fdfa;border-left:4px solid #0d9488;padding:16px;border-radius:4px;margin:20px 0;">
    <p style="margin:0;color:#0f766e;font-size:14px;font-weight:600;">While you wait, explore free tools:</p>
    <ul style="color:#0f766e;font-size:14px;margin:8px 0 0 0;padding-left:20px;">
      <li><a href="https://www.fqhctalent.com/strategy/resilience" style="color:#0d9488;">Resilience Scorecard</a> — see how your org compares</li>
      <li><a href="https://www.fqhctalent.com/strategy/okrs" style="color:#0d9488;">OKR Templates</a> — crisis change management frameworks</li>
      <li><a href="https://www.fqhctalent.com/layoffs" style="color:#0d9488;">Layoff Tracker</a> — CA WARN Act data</li>
    </ul>
  </div>

  <p style="font-size:13px;color:#a8a29e;margin-top:24px;">
    Questions? Reply to this email or reach us at hello@fqhctalent.com
  </p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Offboarding intake confirmation email error:", emailErr);
      }
    }

    // Admin notification
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🚨 New Transition Request: ${orgName} (${workersCount ?? "?"} workers)`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <h2 style="color:#0d9488;">New Offboarding Intake Submission</h2>

  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e7e5e4;">
    <tr><td style="padding:8px 12px;font-weight:600;">Organization</td><td style="padding:8px 12px;">${escapeHtml(orgName)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Contact</td><td style="padding:8px 12px;">${escapeHtml(contactName)} &lt;${escapeHtml(contactEmail)}&gt;${contactPhone ? ` | ${escapeHtml(contactPhone)}` : ""}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Org Size</td><td style="padding:8px 12px;">${escapeHtml(orgSize || "N/A")}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Region</td><td style="padding:8px 12px;">${escapeHtml(region || "N/A")}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Workers Affected</td><td style="padding:8px 12px;">${workersCount?.toLocaleString() ?? "Not specified"}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Effective Date</td><td style="padding:8px 12px;">${escapeHtml(effectiveDate || "N/A")}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Roles Affected</td><td style="padding:8px 12px;">${escapeHtml(rolesAffected.join(", ") || "Not specified")}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Service Tier</td><td style="padding:8px 12px;font-weight:600;color:#0d9488;">${escapeHtml(tierLabel)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">NDA Requested</td><td style="padding:8px 12px;">${ndaRequested ? "YES — send NDA before first call" : "No"}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Notes</td><td style="padding:8px 12px;">${escapeHtml(notes || "None")}</td></tr>
  </table>

  <p style="margin-top:16px;"><a href="https://supabase.com/dashboard" style="color:#0d9488;">View in Supabase →</a></p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Offboarding intake admin email error:", emailErr);
      }
    }

    return NextResponse.json(
      { message: "Request received. We will contact you within 24 hours." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
