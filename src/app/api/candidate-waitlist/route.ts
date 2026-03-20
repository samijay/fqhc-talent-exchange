import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp, escapeHtml, EMAIL_FOOTER_HTML } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  GET /api/candidate-waitlist — return live signup count             */
/* ------------------------------------------------------------------ */

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from("candidate_waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("candidate_waitlist count error:", error.code, error.message);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

/* ------------------------------------------------------------------ */
/*  POST /api/candidate-waitlist — candidate signup form              */
/* ------------------------------------------------------------------ */

const candidateSchema = z.object({
  firstName:       z.string().min(1).max(100),
  lastName:        z.string().min(1).max(100),
  email:           z.string().email().max(255),
  phone:           z.string().max(30).optional(),
  region:          z.string().max(100).optional(),
  currentRole:     z.string().max(200).optional(),
  yearsExperience: z.string().max(20).optional(),
  ehrSystems:      z.array(z.string().max(100)).max(20).optional(),
  programs:        z.array(z.string().max(100)).max(20).optional(),
  bilingual:       z.string().max(50).optional(),
  notes:           z.string().max(2000).optional(),
  locale:          z.enum(["en", "es"]).optional().default("en"),
});

export async function POST(request: Request) {
  try {
    // Rate limit: 3 submissions per hour per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`candidate-waitlist:${ip}`, {
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
    const result = candidateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 },
      );
    }

    const {
      firstName, lastName, email, phone, region, currentRole,
      yearsExperience, ehrSystems, programs, bilingual, notes, locale,
    } = result.data;

    // Insert — return error on duplicate email (409)
    const { error } = await supabaseAdmin.from("candidate_waitlist").insert({
      first_name:       firstName,
      last_name:        lastName,
      email:            email.toLowerCase(),
      phone:            phone || null,
      region:           region || null,
      current_role:     currentRole || null,
      years_experience: yearsExperience || null,
      ehr_systems:      ehrSystems?.length ? ehrSystems : null,
      programs:         programs?.length ? programs : null,
      bilingual:        bilingual || null,
      notes:            notes || null,
      locale,
    });

    if (error) {
      console.error("candidate_waitlist insert error:", error.code, error.message);

      // Duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 },
        );
      }
      // Table missing
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

    // Get position (total count after insert)
    const { count } = await supabaseAdmin
      .from("candidate_waitlist")
      .select("*", { count: "exact", head: true });

    const position = count ?? 1;

    const isEs = locale === "es";
    const fullName = `${firstName} ${lastName}`;

    // ── Confirmation email to the candidate
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email.toLowerCase(),
          subject: isEs
            ? "Estás en la lista — FQHC Talent Exchange"
            : "You're on the list — FQHC Talent Exchange",
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h1 style="color: white; font-size: 22px; margin: 0;">FQHC Talent Exchange</h1>
    <p style="color: #99f6e4; font-size: 14px; margin: 8px 0 0 0;">
      ${isEs ? "California's FQHC Strategic Monitor" : "California's FQHC Strategic Monitor"}
    </p>
  </div>

  <h2 style="color: #0d9488; font-size: 20px; margin: 0 0 12px 0;">
    ${isEs ? `¡Bienvenido/a, ${escapeHtml(firstName)}!` : `Welcome, ${escapeHtml(firstName)}!`}
  </h2>

  <p style="color: #44403c; line-height: 1.7; font-size: 15px;">
    ${isEs
      ? `Estás en el lugar #<strong>${position}</strong> de nuestra lista de candidatos prioritarios. Cuando estés listo/a para conectar con FQHCs en California, eres el primero en saber.`
      : `You're <strong>#${position}</strong> on our priority candidate list. When we're ready to match you with California FQHCs, you'll be first to know.`
    }
  </p>

  ${region ? `
  <div style="background: #f0fdfa; border-left: 3px solid #0d9488; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
    <p style="margin: 0; font-size: 14px; color: #0f766e;">
      <strong>${isEs ? "Región:" : "Region:"}</strong> ${escapeHtml(region)}
    </p>
  </div>` : ""}

  <p style="color: #44403c; line-height: 1.7; font-size: 15px; margin-top: 20px;">
    ${isEs
      ? "Mientras tanto, usa nuestras herramientas gratuitas:"
      : "In the meantime, use our free tools:"}
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e7e5e4;">
        <a href="https://www.fqhctalent.com/resume-builder" style="color: #0d9488; font-weight: 600; text-decoration: none;">
          ${isEs ? "→ Constructor de CV" : "→ Resume Builder"}
        </a>
        <span style="color: #78716c; font-size: 13px; margin-left: 8px;">
          ${isEs ? "Plantillas optimizadas para FQHCs" : "FQHC-optimized templates"}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e7e5e4;">
        <a href="https://www.fqhctalent.com/career-insights" style="color: #0d9488; font-weight: 600; text-decoration: none;">
          ${isEs ? "→ Evaluación de Carrera" : "→ Career Assessment"}
        </a>
        <span style="color: #78716c; font-size: 13px; margin-left: 8px;">
          ${isEs ? "Evaluación de 5 dominios + plan de 90 días" : "5-domain assessment + 90-day plan"}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e7e5e4;">
        <a href="https://www.fqhctalent.com/jobs" style="color: #0d9488; font-weight: 600; text-decoration: none;">
          ${isEs ? "→ Ver Empleos" : "→ Browse Jobs"}
        </a>
        <span style="color: #78716c; font-size: 13px; margin-left: 8px;">
          ${isEs ? "177+ empleos en 220 FQHCs de California" : "177+ jobs across 220 California FQHCs"}
        </span>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0;">
        <a href="https://www.fqhctalent.com/salary-data" style="color: #0d9488; font-weight: 600; text-decoration: none;">
          ${isEs ? "→ Datos Salariales" : "→ Salary Data"}
        </a>
        <span style="color: #78716c; font-size: 13px; margin-left: 8px;">
          ${isEs ? "30 roles × 9 regiones de CA" : "30 roles × 9 CA regions"}
        </span>
      </td>
    </tr>
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 32px; border-top: 1px solid #e7e5e4; padding-top: 20px;">
    ${isEs
      ? "Preguntas? Responde a este correo o escríbenos a hello@fqhctalent.com."
      : "Questions? Reply to this email or reach us at hello@fqhctalent.com."}
    <br />
    <a href="https://www.fqhctalent.com" style="color: #a8a29e;">fqhctalent.com</a>
  </p>
  ${EMAIL_FOOTER_HTML}
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Candidate waitlist confirmation email error:", emailErr);
      }
    }

    // ── Admin notification
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Candidate: ${fullName}${region ? ` — ${region}` : ""}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Candidate Waitlist Signup</h2>
  <p style="color: #44403c;">Candidate #${position} just joined.</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4;">
    <tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9; width: 140px;">Name</td><td style="padding: 8px 12px;">${escapeHtml(fullName)}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Email</td><td style="padding: 8px 12px;">${escapeHtml(email)}</td></tr>
    ${phone ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Phone</td><td style="padding: 8px 12px;">${escapeHtml(phone)}</td></tr>` : ""}
    ${region ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Region</td><td style="padding: 8px 12px;">${escapeHtml(region)}</td></tr>` : ""}
    ${currentRole ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Current Role</td><td style="padding: 8px 12px;">${escapeHtml(currentRole)}</td></tr>` : ""}
    ${yearsExperience ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Experience</td><td style="padding: 8px 12px;">${escapeHtml(yearsExperience)}</td></tr>` : ""}
    ${ehrSystems?.length ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">EHR Systems</td><td style="padding: 8px 12px;">${ehrSystems.map(escapeHtml).join(", ")}</td></tr>` : ""}
    ${programs?.length ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Programs</td><td style="padding: 8px 12px;">${programs.map(escapeHtml).join(", ")}</td></tr>` : ""}
    ${bilingual ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Bilingual</td><td style="padding: 8px 12px;">${escapeHtml(bilingual)}</td></tr>` : ""}
    ${notes ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Notes</td><td style="padding: 8px 12px;">${escapeHtml(notes)}</td></tr>` : ""}
    <tr><td style="padding: 8px 12px; font-weight: 600; background: #fafaf9;">Locale</td><td style="padding: 8px 12px;">${locale}</td></tr>
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all candidates in your <a href="https://supabase.com" style="color: #0d9488;">Supabase dashboard</a> → candidate_waitlist table.
  </p>
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Candidate waitlist admin email error:", emailErr);
      }
    }

    return NextResponse.json({ position }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
