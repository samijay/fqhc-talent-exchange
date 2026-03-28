import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp, escapeHtml, EMAIL_FOOTER_HTML, validateOrigin } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  POST /api/locum-requests — FQHC coverage request form               */
/* ------------------------------------------------------------------ */

const locumRequestSchema = z.object({
  orgName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(100),
  contactEmail: z.string().email().max(255),
  providerType: z.enum(["md", "np", "pa", "dentist"]),
  startDate: z.string().max(20).optional(),
  endDate: z.string().max(20).optional(),
  hoursPerDay: z.string().max(5),
  ehrSystem: z.string().max(50).optional(),
  requirements: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limit: 5 submissions per hour per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`locum-requests:${ip}`, {
      limit: 5,
      windowMs: 3_600_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = locumRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const {
      orgName, contactName, contactEmail, providerType, startDate,
      endDate, hoursPerDay, ehrSystem, requirements,
    } = result.data;

    const { error } = await supabaseAdmin.from("locum_requests").insert({
      org_name: orgName,
      contact_name: contactName,
      contact_email: contactEmail.toLowerCase(),
      provider_type: providerType,
      start_date: startDate || null,
      end_date: endDate || null,
      hours_per_day: hoursPerDay,
      ehr_system: ehrSystem || null,
      requirements: requirements || null,
    });

    if (error) {
      console.error("Supabase locum_requests error:", error.code, error.message);

      // Table doesn't exist yet
      if (error.code === "42P01") {
        console.error(
          "[LOCUM_REQUESTS] Table 'locum_requests' missing — run supabase-locum-tenens.sql migration.",
        );
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

    // Send confirmation email to the requester
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: contactEmail.toLowerCase(),
          subject: `Coverage Request Received — ${orgName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h1 style="color: white; font-size: 20px; margin: 0;">FQHC Talent Exchange</h1>
    <p style="color: #99f6e4; font-size: 14px; margin: 8px 0 0 0;">Locum Tenens Coverage</p>
  </div>

  <h2 style="color: #0d9488; font-size: 18px;">Coverage Request Received</h2>
  <p style="color: #44403c; line-height: 1.6;">
    Hi ${escapeHtml(contactName)}, we received your coverage request for <strong>${escapeHtml(orgName)}</strong>.
    Our team will review your needs and reach out with matched providers.
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; margin: 16px 0;">
    <tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Provider Type</td><td style="padding: 8px 12px;">${escapeHtml(providerType.toUpperCase())}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Schedule</td><td style="padding: 8px 12px;">${escapeHtml(startDate || "Flexible")} — ${escapeHtml(endDate || "Flexible")} (${escapeHtml(hoursPerDay)} hrs/day)</td></tr>
    ${ehrSystem ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">EHR System</td><td style="padding: 8px 12px;">${escapeHtml(ehrSystem)}</td></tr>` : ""}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    Questions? Reply to this email or contact us at hello@fqhctalent.com.
  </p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Locum request confirmation email error:", emailErr);
      }
    }

    // Send admin notification email
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Locum Request: ${providerType.toUpperCase()} for ${orgName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Locum Tenens Request</h2>
  <p style="color: #44403c;">An FQHC submitted a coverage request.</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4;">
    <tr><td style="padding: 8px 12px; font-weight: 600;">Organization</td><td style="padding: 8px 12px;">${escapeHtml(orgName)}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Contact</td><td style="padding: 8px 12px;">${escapeHtml(contactName)} — ${escapeHtml(contactEmail)}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Provider Type</td><td style="padding: 8px 12px;">${escapeHtml(providerType.toUpperCase())}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Start Date</td><td style="padding: 8px 12px;">${escapeHtml(startDate || "Flexible")}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">End Date</td><td style="padding: 8px 12px;">${escapeHtml(endDate || "Flexible")}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Hours/Day</td><td style="padding: 8px 12px;">${escapeHtml(hoursPerDay)}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">EHR System</td><td style="padding: 8px 12px;">${escapeHtml(ehrSystem || "N/A")}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Requirements</td><td style="padding: 8px 12px;">${escapeHtml(requirements || "None specified")}</td></tr>
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all requests in your Supabase dashboard.
  </p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Locum request admin email error:", emailErr);
      }
    }

    return NextResponse.json(
      { message: "Coverage request submitted. We will contact you with matched providers." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
