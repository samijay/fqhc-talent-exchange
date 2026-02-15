/* ------------------------------------------------------------------ */
/*  Email templates for FQHC Talent Exchange                           */
/* ------------------------------------------------------------------ */

export function candidateConfirmationHtml(data: {
  firstName: string;
  position: number;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #0d9488; font-size: 24px; margin: 0;">FQHC Talent Exchange</h1>
  </div>

  <h2 style="font-size: 20px; color: #1c1917;">Welcome, ${data.firstName}!</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    You're officially on the waitlist! Your position is <strong style="color: #0d9488;">#${data.position}</strong>.
  </p>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    Here's what happens next:
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>We'll review your profile within <strong>5 business days</strong></li>
    <li>You'll receive an email to schedule your intake call</li>
    <li>We'll start matching you with FQHC opportunities</li>
  </ol>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    In the meantime, check out our <a href="https://fqhctalent.com/blog" style="color: #0d9488;">career resources</a> for FQHC professionals.
  </p>

  <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />

  <p style="font-size: 13px; color: #a8a29e; text-align: center;">
    FQHC Talent Exchange — The only talent platform built exclusively for community health centers.<br />
    <a href="https://fqhctalent.com" style="color: #0d9488;">fqhctalent.com</a>
  </p>
</body>
</html>`.trim();
}

export function employerConfirmationHtml(data: {
  contactName: string;
  orgName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #0d9488; font-size: 24px; margin: 0;">FQHC Talent Exchange</h1>
  </div>

  <h2 style="font-size: 20px; color: #1c1917;">Thank you, ${data.contactName}!</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    We've received the access request for <strong>${data.orgName}</strong>. We're excited to help you find mission-driven talent for your health center.
  </p>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    Here's what happens next:
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>Our team will review your request within <strong>3 business days</strong></li>
    <li>We'll schedule a brief call to understand your hiring needs</li>
    <li>You'll get access to our pre-vetted candidate pool</li>
  </ol>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    Questions? Reply to this email or reach us at <a href="mailto:fqhctalent@gmail.com" style="color: #0d9488;">fqhctalent@gmail.com</a>.
  </p>

  <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />

  <p style="font-size: 13px; color: #a8a29e; text-align: center;">
    FQHC Talent Exchange — The only talent platform built exclusively for community health centers.<br />
    <a href="https://fqhctalent.com" style="color: #0d9488;">fqhctalent.com</a>
  </p>
</body>
</html>`.trim();
}

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
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${value}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Candidate Waitlist Signup (#${data.position})</h2>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Name", `${data.firstName} ${data.lastName}`)}
    ${row("Email", `<a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a>`)}
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
    View all signups in your <a href="https://supabase.com/dashboard" style="color: #0d9488;">Supabase dashboard</a>.
  </p>
</body>
</html>`.trim();
}

/* ------------------------------------------------------------------ */
/*  Displaced candidate (fast-track) emails                           */
/* ------------------------------------------------------------------ */

export function displacedCandidateConfirmationHtml(data: {
  firstName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #0d9488; font-size: 24px; margin: 0;">FQHC Talent Exchange</h1>
    <p style="color: #f59e0b; font-size: 14px; font-weight: 600; margin: 4px 0 0;">FAST-TRACK</p>
  </div>

  <h2 style="font-size: 20px; color: #1c1917;">You're in the Fast-Track pool, ${data.firstName}!</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    We understand how stressful a layoff can be. That's why we've put you in our <strong style="color: #0d9488;">Fast-Track queue</strong> for priority matching.
  </p>

  <p style="font-size: 16px; line-height: 1.6; color: #44403c;">
    Here's what happens next:
  </p>

  <ol style="font-size: 16px; line-height: 1.8; color: #44403c; padding-left: 20px;">
    <li>A placement advocate reviews your profile <strong>within 24 hours</strong></li>
    <li>We match you with hiring FQHCs that need your skills</li>
    <li>You'll receive your first introduction <strong>within 48 hours</strong></li>
  </ol>

  <div style="background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="font-size: 14px; color: #0d9488; margin: 0; font-weight: 600;">While you wait:</p>
    <ul style="font-size: 14px; color: #44403c; line-height: 1.8; padding-left: 16px; margin: 8px 0 0;">
      <li><a href="https://fqhctalent.com/resume-builder" style="color: #0d9488;">Build a free FQHC-optimized resume</a></li>
      <li><a href="https://fqhctalent.com/jobs" style="color: #0d9488;">Browse open positions across California</a></li>
      <li><a href="https://fqhctalent.com/blog" style="color: #0d9488;">Read our career resources</a></li>
    </ul>
  </div>

  <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />

  <p style="font-size: 13px; color: #a8a29e; text-align: center;">
    FQHC Talent Exchange &mdash; The only talent platform built exclusively for community health centers.<br />
    <a href="https://fqhctalent.com" style="color: #0d9488;">fqhctalent.com</a>
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
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${value}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #f59e0b; font-size: 20px;">&#9889; FAST-TRACK: ${data.firstName} ${data.lastName}</h2>
  <p style="color: #44403c; font-size: 14px; margin-top: -8px;">Displaced worker &mdash; needs immediate placement</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4; border-radius: 8px;">
    ${row("Name", `${data.firstName} ${data.lastName}`)}
    ${row("Email", `<a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a>`)}
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
    View all signups in your <a href="https://supabase.com/dashboard" style="color: #0d9488;">Supabase dashboard</a>.
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
  const row = (label: string, value: string | undefined | null) =>
    value
      ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #44403c; white-space: nowrap; vertical-align: top;">${label}</td><td style="padding: 8px 12px; color: #1c1917;">${value}</td></tr>`
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
    ${row("Email", `<a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a>`)}
    ${row("Phone", data.phone)}
    ${row("Open Positions", data.positionsCount)}
    ${row("Roles Needed", data.rolesNeeded?.length ? data.rolesNeeded.join(", ") : undefined)}
    ${row("Active Programs", data.programsActive?.length ? data.programsActive.join(", ") : undefined)}
    ${row("EHR System", data.ehrSystem)}
    ${row("Timeline", data.timeline)}
    ${row("Notes", data.notes)}
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all signups in your <a href="https://supabase.com/dashboard" style="color: #0d9488;">Supabase dashboard</a>.
  </p>
</body>
</html>`.trim();
}
