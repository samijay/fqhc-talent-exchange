import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp, escapeHtml, EMAIL_FOOTER_HTML, validateOrigin } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  POST /api/locum-providers — Provider interest form submission       */
/* ------------------------------------------------------------------ */

const locumProviderSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  role: z.enum(["md", "np", "pa", "dentist"]),
  licenseNumber: z.string().max(50).optional(),
  availableDays: z.string().max(20),
  region: z.string().max(50),
  ehrExperience: z.array(z.string().max(100)).max(10).optional(),
});

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limit: 3 submissions per hour per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`locum-providers:${ip}`, {
      limit: 3,
      windowMs: 3_600_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait and try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = locumProviderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const { name, email, role, licenseNumber, availableDays, region, ehrExperience } =
      result.data;

    const { error } = await supabaseAdmin.from("locum_providers").insert({
      name,
      email: email.toLowerCase(),
      role,
      license_number: licenseNumber || null,
      available_days: availableDays,
      region,
      ehr_experience: ehrExperience || [],
    });

    if (error) {
      console.error("Supabase locum_providers error:", error.code, error.message);

      // Table doesn't exist yet
      if (error.code === "42P01") {
        console.error(
          "[LOCUM_PROVIDERS] Table 'locum_providers' missing — run supabase-locum-tenens.sql migration.",
        );
        return NextResponse.json(
          { error: "This feature is temporarily unavailable. Please try again later." },
          { status: 503 },
        );
      }

      // Duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You have already submitted your information. We will be in touch." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    const roleLabel: Record<string, string> = {
      md: "MD/DO", np: "Nurse Practitioner", pa: "Physician Assistant", dentist: "Dentist",
    };

    // Confirmation email to the provider
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email.toLowerCase(),
          subject: "Locum Interest Received — FQHC Talent Exchange",
          html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:22px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:14px;margin:8px 0 0 0;">Locum Tenens Coverage</p>
  </div>

  <h2 style="color:#0d9488;font-size:20px;margin:0 0 12px 0;">We received your interest, ${escapeHtml(name)}.</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    We'll match you with California FQHCs that need ${escapeHtml(roleLabel[role] ?? role)} coverage in <strong>${escapeHtml(region)}</strong> when opportunities arise.
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e7e5e4;margin:20px 0;">
    <tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;width:130px;">Role</td><td style="padding:8px 12px;">${escapeHtml(roleLabel[role] ?? role)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">Region</td><td style="padding:8px 12px;">${escapeHtml(region)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">Availability</td><td style="padding:8px 12px;">${escapeHtml(availableDays)} days/week</td></tr>
    ${ehrExperience?.length ? `<tr><td style="padding:8px 12px;font-weight:600;background:#fafaf9;">EHR Experience</td><td style="padding:8px 12px;">${ehrExperience.map(escapeHtml).join(", ")}</td></tr>` : ""}
  </table>

  <p style="color:#44403c;line-height:1.7;font-size:14px;">
    California FQHCs pay <strong>FQHC PPS rates</strong> for locum coverage — typically $120–$180/hr for MDs and $85–$120/hr for NPs/PAs, depending on specialty and region.
  </p>

  <p style="font-size:12px;color:#a8a29e;margin-top:32px;border-top:1px solid #e7e5e4;padding-top:20px;">
    Questions? Reply to this email or reach us at hello@fqhctalent.com.<br />
    <a href="https://www.fqhctalent.com" style="color:#a8a29e;">fqhctalent.com</a>
  </p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`,
        });
      } catch (emailErr) {
        console.error("Locum provider confirmation email error:", emailErr);
      }
    }

    // Admin notification
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Locum Provider: ${roleLabel[role] ?? role} — ${region}`,
          html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <h2 style="color:#0d9488;">New Locum Provider Signup</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e7e5e4;">
    <tr><td style="padding:8px 12px;font-weight:600;width:130px;">Name</td><td style="padding:8px 12px;">${escapeHtml(name)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Email</td><td style="padding:8px 12px;">${escapeHtml(email)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Role</td><td style="padding:8px 12px;">${escapeHtml(roleLabel[role] ?? role)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Region</td><td style="padding:8px 12px;">${escapeHtml(region)}</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Availability</td><td style="padding:8px 12px;">${escapeHtml(availableDays)} days/week</td></tr>
    ${licenseNumber ? `<tr><td style="padding:8px 12px;font-weight:600;">License #</td><td style="padding:8px 12px;">${escapeHtml(licenseNumber)}</td></tr>` : ""}
    ${ehrExperience?.length ? `<tr><td style="padding:8px 12px;font-weight:600;">EHR</td><td style="padding:8px 12px;">${ehrExperience.map(escapeHtml).join(", ")}</td></tr>` : ""}
  </table>
  <p style="font-size:13px;color:#a8a29e;margin-top:20px;">View in Supabase → locum_providers table.</p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`,
        });
      } catch (emailErr) {
        console.error("Locum provider admin email error:", emailErr);
      }
    }

    return NextResponse.json(
      { message: "Thank you for your interest! We will reach out when coverage opportunities match your availability." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
