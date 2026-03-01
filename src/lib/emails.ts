/* ------------------------------------------------------------------ */
/*  Email templates for FQHC Talent Exchange                           */
/*  Upgraded 2026-02-18: mission banner, resources, market snapshot    */
/* ------------------------------------------------------------------ */

import { escapeHtml } from "@/lib/security";
import {
  missionBanner,
  candidateResourceLinks,
  employerResourceLinks,
  marketSnapshotHtml,
  dropTeaser,
  emailHeader,
  emailFooter,
} from "@/lib/email-helpers";

/* ------------------------------------------------------------------ */
/*  Candidate Confirmation                                             */
/* ------------------------------------------------------------------ */

export function candidateConfirmationHtml(data: {
  firstName: string;
  position: number;
  locale?: string;
}) {
  const isEs = data.locale === "es";
  const name = escapeHtml(data.firstName);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  ${emailHeader()}

  <h2 style="font-size: 20px; color: #1c1917;">${isEs ? `¡Bienvenido/a, ${name}!` : `Welcome, ${name}!`}</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `¡Tu perfil ha sido creado! Nos comunicaremos con oportunidades relevantes.`
      : `Your profile has been created! We'll be in touch with relevant opportunities.`}
  </p>

  ${missionBanner(isEs)}

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs ? "Esto es lo que sigue:" : "Here's what happens next:"}
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>${isEs
      ? "Revisaremos tu perfil dentro de <strong>5 días hábiles</strong>"
      : "We'll review your profile within <strong>5 business days</strong>"}</li>
    <li>${isEs
      ? "Recibirás un correo para programar tu llamada de admisión"
      : "You'll receive an email to schedule your intake call"}</li>
    <li>${isEs
      ? "Comenzaremos a conectarte con oportunidades en FQHCs"
      : "We'll start matching you with FQHC opportunities"}</li>
  </ol>

  ${dropTeaser(isEs)}
  ${candidateResourceLinks(isEs)}
  ${marketSnapshotHtml(isEs)}
  ${emailFooter(isEs)}
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Employer Confirmation                                              */
/* ------------------------------------------------------------------ */

export function employerConfirmationHtml(data: {
  contactName: string;
  orgName: string;
  locale?: string;
}) {
  const isEs = data.locale === "es";
  const name = escapeHtml(data.contactName);
  const org = escapeHtml(data.orgName);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  ${emailHeader()}

  <h2 style="font-size: 20px; color: #1c1917;">${isEs ? `¡Gracias, ${name}!` : `Thank you, ${name}!`}</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `Hemos recibido la solicitud de acceso para <strong>${org}</strong>. Estamos emocionados de ayudarle a encontrar talento comprometido con la misión para su centro de salud.`
      : `We've received the access request for <strong>${org}</strong>. We're excited to help you find mission-driven talent for your health center.`}
  </p>

  ${missionBanner(isEs)}

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs ? "Esto es lo que sigue:" : "Here's what happens next:"}
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>${isEs
      ? "Nuestro equipo revisará su solicitud <strong>pronto</strong>"
      : "Our team will review your request <strong>shortly</strong>"}</li>
    <li>${isEs
      ? "Programaremos una breve llamada para entender sus necesidades de contratación"
      : "We'll schedule a brief call to understand your hiring needs"}</li>
    <li>${isEs
      ? "Tendrá acceso a nuestro grupo de candidatos preseleccionados"
      : "You'll get access to our pre-vetted candidate pool"}</li>
  </ol>

  ${employerResourceLinks(isEs)}
  ${marketSnapshotHtml(isEs)}

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `¿Preguntas? Responda a este correo o contáctenos en <a href="mailto:hello@fqhctalent.com" style="color: #0d9488;">hello@fqhctalent.com</a>.`
      : `Questions? Reply to this email or reach us at <a href="mailto:hello@fqhctalent.com" style="color: #0d9488;">hello@fqhctalent.com</a>.`}
  </p>

  ${emailFooter(isEs)}
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Displaced Candidate (Fast-Track) Confirmation                      */
/* ------------------------------------------------------------------ */

export function displacedCandidateConfirmationHtml(data: {
  firstName: string;
  locale?: string;
}) {
  const isEs = data.locale === "es";
  const name = escapeHtml(data.firstName);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #0d9488; font-size: 24px; margin: 0;">FQHC Talent Exchange</h1>
    <p style="color: #f59e0b; font-size: 14px; font-weight: 600; margin: 4px 0 0;">FAST-TRACK</p>
  </div>

  <h2 style="font-size: 20px; color: #1c1917;">${isEs
    ? `¡Tu perfil ha sido creado, ${name}!`
    : `Your profile has been created, ${name}!`}</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `Hemos recibido tu perfil y revisaremos tus calificaciones. Mientras tanto, aprovecha nuestras herramientas gratuitas para prepararte.`
      : `We've received your profile and will review your qualifications. In the meantime, use our free tools to get job-ready.`}
  </p>

  ${missionBanner(isEs)}

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs ? "Esto es lo que sigue:" : "Here's what happens next:"}
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>${isEs
      ? "Revisamos tu perfil e identificamos FQHCs que están contratando activamente"
      : "We review your profile and identify FQHCs that are actively hiring"}</li>
    <li>${isEs
      ? "Te emparejamos con FQHCs que necesitan tus habilidades"
      : "We match you with hiring FQHCs that need your skills"}</li>
    <li>${isEs
      ? "Recibirás presentaciones a FQHCs que se ajustan a tu experiencia"
      : "You'll receive introductions to FQHCs that fit your experience"}</li>
  </ol>

  <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: #0f766e; font-size: 14px;">
      🛠️ ${isEs ? "Herramientas gratis para prepararte" : "Free tools to get you ready"}
    </p>
    <p style="margin: 8px 0 0; font-size: 13px; color: #44403c; line-height: 1.5;">
      ${isEs
        ? `<a href="https://www.fqhctalent.com/es/resume-builder" style="color: #0d9488;">Creador de CV</a> · <a href="https://www.fqhctalent.com/es/career-insights" style="color: #0d9488;">Evaluación de Carrera</a> · <a href="https://www.fqhctalent.com/es/jobs" style="color: #0d9488;">Empleos</a> · <a href="https://www.fqhctalent.com/es/career-roadmap" style="color: #0d9488;">Ruta Profesional</a>`
        : `<a href="https://www.fqhctalent.com/resume-builder" style="color: #0d9488;">Resume Builder</a> · <a href="https://www.fqhctalent.com/career-insights" style="color: #0d9488;">Career Assessment</a> · <a href="https://www.fqhctalent.com/jobs" style="color: #0d9488;">Job Listings</a> · <a href="https://www.fqhctalent.com/career-roadmap" style="color: #0d9488;">Career Roadmap</a>`
      }
    </p>
  </div>

  <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: #92400E; font-size: 14px;">
      ⚡ ${isEs ? "Calificas automáticamente para The Drop" : "You auto-qualify for The Drop"}
    </p>
    <p style="margin: 8px 0 0; font-size: 13px; color: #44403c; line-height: 1.5;">
      ${isEs
        ? "Como candidato Fast-Track, calificas automáticamente para The Drop — nuestro programa exclusivo de matching que conecta candidatos pre-evaluados con FQHCs."
        : "As a Fast-Track candidate, you auto-qualify for The Drop — our exclusive matching program that connects pre-assessed candidates with FQHCs."
      }
    </p>
  </div>

  ${candidateResourceLinks(isEs)}
  ${marketSnapshotHtml(isEs)}
  ${emailFooter(isEs)}
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Admin Notifications (internal — English only)                      */
/* ------------------------------------------------------------------ */

export function adminCandidateNotificationHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  region?: string;
  currentRole?: string;
  yearsExperience?: string;
  ehrSystems?: string[];
  programs?: string[];
  bilingual?: string;
  notes?: string;
  position: number;
}) {
  const h = escapeHtml;
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${h(value)}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Candidate Profile (#${data.position})</h2>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Name", `${data.firstName} ${data.lastName}`)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Region", data.region)}
    ${row("Current Role", data.currentRole)}
    ${row("Experience", data.yearsExperience)}
    ${row("EHR Systems", data.ehrSystems?.length ? data.ehrSystems.join(", ") : undefined)}
    ${row("Programs", data.programs?.length ? data.programs.join(", ") : undefined)}
    ${row("Bilingual", data.bilingual)}
    ${row("Notes", data.notes)}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all signups in your Supabase dashboard.
  </p>
</body>
</html>`.trim();
}

export function adminDisplacedCandidateNotificationHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  previousEmployer?: string;
  previousRole?: string;
  layoffDate?: string;
  availableStart?: string;
  yearsExperience?: string;
  ehrSystems?: string[];
  programs?: string[];
  bilingual?: string;
  currentRegion?: string;
  openToRegions?: string[];
  willingToRelocate?: boolean;
  notes?: string;
}) {
  const h = escapeHtml;
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${h(value)}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #f59e0b; font-size: 20px;">&#9889; FAST-TRACK: ${h(data.firstName)} ${h(data.lastName)}</h2>
  <p style="color: #44403c; font-size: 14px; margin-top: -8px;">Displaced worker — needs immediate placement</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Name", `${data.firstName} ${data.lastName}`)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Previous Employer", data.previousEmployer)}
    ${row("Previous Role", data.previousRole)}
    ${row("Layoff Date", data.layoffDate)}
    ${row("Available", data.availableStart)}
    ${row("Experience", data.yearsExperience)}
    ${row("EHR Systems", data.ehrSystems?.length ? data.ehrSystems.join(", ") : undefined)}
    ${row("Programs", data.programs?.length ? data.programs.join(", ") : undefined)}
    ${row("Bilingual", data.bilingual)}
    ${row("Current Region", data.currentRegion)}
    ${row("Open To", data.openToRegions?.length ? data.openToRegions.join(", ") : undefined)}
    ${row("Will Relocate", data.willingToRelocate ? "Yes" : undefined)}
    ${row("Notes", data.notes)}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all signups in your Supabase dashboard.
  </p>
</body>
</html>`.trim();
}

export function adminEmployerNotificationHtml(data: {
  orgName: string;
  contactName: string;
  contactTitle?: string;
  email: string;
  phone?: string;
  positionsCount?: string;
  rolesNeeded?: string[];
  programsActive?: string[];
  ehrSystem?: string;
  timeline?: string;
  notes?: string;
}) {
  const h = escapeHtml;
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${h(value)}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Employer Access Request</h2>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Organization", data.orgName)}
    ${row("Contact", data.contactName)}
    ${row("Title", data.contactTitle)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Open Positions", data.positionsCount)}
    ${row("Roles Needed", data.rolesNeeded?.length ? data.rolesNeeded.join(", ") : undefined)}
    ${row("Active Programs", data.programsActive?.length ? data.programsActive.join(", ") : undefined)}
    ${row("EHR System", data.ehrSystem)}
    ${row("Timeline", data.timeline)}
    ${row("Notes", data.notes)}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all signups in your Supabase dashboard.
  </p>
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Offboarding Intake — Employer Confirmation                         */
/* ------------------------------------------------------------------ */

export function offboardingConfirmationHtml(data: {
  contactName: string;
  orgName: string;
  locale?: string;
}) {
  const isEs = data.locale === "es";
  const name = escapeHtml(data.contactName);
  const org = escapeHtml(data.orgName);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  ${emailHeader()}

  <h2 style="font-size: 20px; color: #1c1917;">${isEs ? `Solicitud recibida, ${name}` : `Request received, ${name}`}</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `Hemos recibido su solicitud de transición de fuerza laboral para <strong>${org}</strong>. Nuestro equipo revisará su envío y se comunicará dentro de <strong>1 día hábil</strong> para discutir los próximos pasos.`
      : `We've received your workforce transition request for <strong>${org}</strong>. Our team will review your submission and reach out within <strong>1 business day</strong> to discuss next steps.`}
  </p>

  ${missionBanner(isEs)}

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs ? "Mientras tanto, estos recursos pueden ayudar:" : "In the meantime, these resources may help:"}
  </p>

  <div style="margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f4;">
          <a href="https://www.fqhctalent.com/${isEs ? "es/" : ""}layoffs" style="color: #0d9488; font-weight: 600; text-decoration: none; font-size: 14px;">${isEs ? "Rastreador de Despidos" : "Layoff Tracker"}</a>
          <br /><span style="color: #78716c; font-size: 12px;">${isEs ? "Datos actuales de reducción de fuerza laboral en California" : "Current California workforce reduction data"}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f4;">
          <a href="https://www.fqhctalent.com/${isEs ? "es/" : ""}strategy/guides" style="color: #0d9488; font-weight: 600; text-decoration: none; font-size: 14px;">${isEs ? "Guías Ejecutivas" : "Executive Guides"}</a>
          <br /><span style="color: #78716c; font-size: 12px;">${isEs ? "Estudios de caso de FQHCs con el marco de Rumelt" : "FQHC case studies with Rumelt framework"}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f4;">
          <a href="https://www.fqhctalent.com/${isEs ? "es/" : ""}directory" style="color: #0d9488; font-weight: 600; text-decoration: none; font-size: 14px;">${isEs ? "Directorio FQHC" : "FQHC Directory"}</a>
          <br /><span style="color: #78716c; font-size: 12px;">${isEs ? "220 centros de salud comunitarios en California" : "220 community health centers across California"}</span>
        </td>
      </tr>
    </table>
  </div>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    ${isEs
      ? `¿Preguntas? Responda a este correo o contáctenos en <a href="mailto:hello@fqhctalent.com" style="color: #0d9488;">hello@fqhctalent.com</a>.`
      : `Questions? Reply to this email or reach us at <a href="mailto:hello@fqhctalent.com" style="color: #0d9488;">hello@fqhctalent.com</a>.`}
  </p>

  ${emailFooter(isEs)}
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Offboarding Intake — Admin Notification (internal, English only)   */
/* ------------------------------------------------------------------ */

export function adminOffboardingNotificationHtml(data: {
  orgName: string;
  contactName: string;
  contactTitle?: string;
  email: string;
  phone?: string;
  employeesAffected?: string;
  rolesAffected?: string[];
  reductionTimeline?: string;
  serviceTier?: string;
  needsNda?: boolean;
  notes?: string;
}) {
  const h = escapeHtml;
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${h(value)}</td></tr>`
      : "";

  const tierLabels: Record<string, string> = {
    "self-serve": "Self-Serve (Free)",
    "managed": "Managed Transition ($500-$1,500)",
    "placement": "Placement Partnership ($2K-$5K)",
  };

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #f59e0b; font-size: 20px;">&#128200; New Offboarding Intake Request</h2>
  <p style="color: #44403c; font-size: 14px; margin-top: -8px;">Employer needs workforce transition support</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Organization", data.orgName)}
    ${row("Contact", data.contactName)}
    ${row("Title", data.contactTitle)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Employees Affected", data.employeesAffected)}
    ${row("Roles Affected", data.rolesAffected?.length ? data.rolesAffected.join(", ") : undefined)}
    ${row("Reduction Timeline", data.reductionTimeline)}
    ${row("Service Tier", data.serviceTier ? (tierLabels[data.serviceTier] || data.serviceTier) : undefined)}
    ${row("NDA Required", data.needsNda ? "Yes" : undefined)}
    ${row("Notes", data.notes)}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all submissions in your Supabase dashboard.
  </p>
</body>
</html>`.trim();
}
