import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  Validation schemas                                                 */
/* ------------------------------------------------------------------ */

const candidateSchema = z.object({
  type: z.literal("candidate"),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  rolePreference: z.string().max(200).optional().default(""),
  region: z.string().max(100).optional().default(""),
  hasAssessment: z.boolean().optional().default(false),
  locale: z.string().max(5).optional().default("en"),
});

const employerSchema = z.object({
  type: z.literal("employer"),
  orgName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  rolesNeeded: z.string().max(500).optional().default(""),
  ehrSystem: z.string().max(100).optional().default(""),
  notes: z.string().max(500).optional().default(""),
  locale: z.string().max(5).optional().default("en"),
});

const dropWaitlistSchema = z.discriminatedUnion("type", [
  candidateSchema,
  employerSchema,
]);

/* ------------------------------------------------------------------ */
/*  POST — Join the Drop waitlist                                      */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  try {
    // Rate limit: 5 signups per minute per IP
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`drop-waitlist:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = dropWaitlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const data = result.data;
    const isCandidate = data.type === "candidate";

    // Build the row for Supabase
    const row = isCandidate
      ? {
          type: "candidate" as const,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          role_preference: data.rolePreference || null,
          region: data.region || null,
          has_assessment: data.hasAssessment,
          org_name: null,
          roles_needed: null,
          ehr_system: null,
          notes: null,
        }
      : {
          type: "employer" as const,
          name: data.contactName,
          email: data.email,
          role_preference: null,
          region: null,
          has_assessment: false,
          org_name: data.orgName,
          roles_needed: data.rolesNeeded
            ? data.rolesNeeded.split(",").map((s: string) => s.trim())
            : null,
          ehr_system: data.ehrSystem || null,
          notes: data.notes || null,
        };

    const { error } = await supabaseAdmin
      .from("drop_waitlist")
      .insert(row);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      console.error("Supabase drop-waitlist error:", error.code, error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send confirmation + admin notification emails (non-blocking)
    if (resend) {
      try {
        const locale = data.locale || "en";
        const isEs = locale === "es";

        if (isCandidate) {
          const firstName = data.firstName;
          await Promise.all([
            resend.emails.send({
              from: FROM_EMAIL,
              to: data.email,
              subject: isEs
                ? `¡Estás en la lista de The Drop, ${firstName}!`
                : `You're on The Drop waitlist, ${firstName}!`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #0F766E;">${isEs ? `¡Hola ${firstName}!` : `Hey ${firstName}!`}</h1>
                  <p>${isEs
                    ? "Estás en la lista de espera de The Drop — nuestro programa exclusivo de matching para profesionales de salud comunitaria pre-evaluados."
                    : "You're on the waitlist for The Drop — our exclusive matching program for pre-assessed community health professionals."
                  }</p>
                  <p>${isEs
                    ? "Te notificaremos cuando lancemos con las primeras oportunidades curadas."
                    : "We'll notify you when we launch with the first curated opportunities."
                  }</p>
                  ${!data.hasAssessment ? `
                    <div style="background: #F0FDFA; border: 1px solid #99F6E4; border-radius: 8px; padding: 16px; margin: 20px 0;">
                      <p style="margin: 0; font-weight: bold; color: #0F766E;">${isEs ? "⚡ Próximo paso: Toma la evaluación" : "⚡ Next step: Take the assessment"}</p>
                      <p style="margin: 8px 0 0;">${isEs
                        ? "Necesitas puntuar ≥60% para calificar para The Drop."
                        : "You need to score ≥60% to qualify for The Drop."
                      }</p>
                      <a href="https://www.fqhctalent.com/career-insights" style="display: inline-block; background: #0F766E; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 12px;">${isEs ? "Tomar la Evaluación" : "Take the Assessment"}</a>
                    </div>
                  ` : ""}
                  <p style="color: #78716c; font-size: 12px; margin-top: 30px;">FQHC Talent Exchange · <a href="https://www.fqhctalent.com" style="color: #0F766E;">fqhctalent.com</a></p>
                </div>
              `,
            }),
            resend.emails.send({
              from: FROM_EMAIL,
              to: ADMIN_EMAIL,
              subject: `New Drop Candidate: ${firstName} ${data.lastName}`,
              html: `
                <h2>New Drop Waitlist — Candidate</h2>
                <ul>
                  <li><strong>Name:</strong> ${firstName} ${data.lastName}</li>
                  <li><strong>Email:</strong> ${data.email}</li>
                  <li><strong>Role:</strong> ${data.rolePreference || "Not specified"}</li>
                  <li><strong>Region:</strong> ${data.region || "Not specified"}</li>
                  <li><strong>Has Assessment:</strong> ${data.hasAssessment ? "Yes" : "No"}</li>
                </ul>
              `,
            }),
          ]);
        } else {
          await Promise.all([
            resend.emails.send({
              from: FROM_EMAIL,
              to: data.email,
              subject: isEs
                ? `Solicitud de The Drop recibida — ${data.orgName}`
                : `The Drop request received — ${data.orgName}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #0F766E;">${isEs ? `¡Gracias, ${data.contactName}!` : `Thank you, ${data.contactName}!`}</h1>
                  <p>${isEs
                    ? `Hemos recibido la solicitud de ${data.orgName} para The Drop. Te contactaremos dentro de 48 horas con los próximos pasos.`
                    : `We've received ${data.orgName}'s request for The Drop. We'll be in touch within 48 hours with next steps.`
                  }</p>
                  <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 0; font-weight: bold; color: #92400E;">${isEs ? "¿Qué sigue?" : "What's next?"}</p>
                    <ul style="margin: 8px 0 0; padding-left: 20px; color: #78716c;">
                      <li>${isEs ? "Revisaremos tus necesidades de contratación" : "We'll review your hiring needs"}</li>
                      <li>${isEs ? "Curaremos un lote de candidatos pre-evaluados" : "We'll curate a batch of pre-assessed candidates"}</li>
                      <li>${isEs ? "Recibirás perfiles con datos conductuales" : "You'll receive profiles with behavioral data"}</li>
                    </ul>
                  </div>
                  <p style="color: #78716c; font-size: 12px; margin-top: 30px;">FQHC Talent Exchange · <a href="https://www.fqhctalent.com" style="color: #0F766E;">fqhctalent.com</a></p>
                </div>
              `,
            }),
            resend.emails.send({
              from: FROM_EMAIL,
              to: ADMIN_EMAIL,
              subject: `New Drop Employer: ${data.orgName}`,
              html: `
                <h2>New Drop Waitlist — Employer</h2>
                <ul>
                  <li><strong>Organization:</strong> ${data.orgName}</li>
                  <li><strong>Contact:</strong> ${data.contactName}</li>
                  <li><strong>Email:</strong> ${data.email}</li>
                  <li><strong>Roles Needed:</strong> ${data.rolesNeeded || "Not specified"}</li>
                  <li><strong>EHR:</strong> ${data.ehrSystem || "Not specified"}</li>
                  <li><strong>Notes:</strong> ${data.notes || "None"}</li>
                </ul>
              `,
            }),
          ]);
        }
      } catch (emailErr) {
        console.error("Drop waitlist email error:", emailErr);
      }
    }

    return NextResponse.json({
      message: isCandidate
        ? "You're on The Drop waitlist!"
        : "Your request has been received!",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
