/* ------------------------------------------------------------------ */
/*  Welcome Drip Email Templates                                       */
/*  Candidate track: 4 emails over 14 days                            */
/*  Employer track:  4 emails over 21 days                            */
/*  "Both" audience gets the employer sequence                        */
/* ------------------------------------------------------------------ */

const SITE = "https://www.fqhctalent.com";
const TEAL = "#0F766E";
const TEAL_LIGHT = "#F0FDFA";
const TEAL_BORDER = "#99F6E4";
const AMBER = "#F59E0B";
const AMBER_BG = "#FFFBEB";

/* ------------------------------------------------------------------ */
/*  Drip schedule (days after subscribe_at to send each step)         */
/* ------------------------------------------------------------------ */

export const CANDIDATE_DRIP_DAYS = [3, 7, 10, 14] as const;
export const EMPLOYER_DRIP_DAYS  = [3, 7, 14, 21] as const;

export function getDripDays(audience: string): readonly number[] {
  return audience === "the-pulse" ? CANDIDATE_DRIP_DAYS : EMPLOYER_DRIP_DAYS;
}

/* ------------------------------------------------------------------ */
/*  Shared footer block                                               */
/* ------------------------------------------------------------------ */

function dripFooter(unsubscribeUrl: string): string {
  return `
  <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
  <p style="font-size:12px;color:#a8a29e;text-align:center;line-height:1.6;">
    FQHC Talent Exchange — California's FQHC Strategic Monitor<br />
    <a href="${SITE}" style="color:#a8a29e;">fqhctalent.com</a> ·
    <a href="${unsubscribeUrl}" style="color:#a8a29e;">Unsubscribe</a>
  </p>`;
}

/* ------------------------------------------------------------------ */
/*  Candidate Drip Emails (The Pulse subscribers)                     */
/* ------------------------------------------------------------------ */

/** Day 3 — What FQHC employers want */
export function candidateDrip1(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">3 things FQHC employers actually look for</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    Most resumes miss what FQHC hiring managers care about most. After reviewing hundreds of FQHC job listings across California, here's what keeps showing up:
  </p>

  <div style="background:${TEAL_LIGHT};border:1px solid ${TEAL_BORDER};border-radius:8px;padding:20px;margin:20px 0;">
    <div style="margin-bottom:16px;">
      <p style="margin:0;font-weight:700;color:${TEAL};font-size:15px;">1. ECM & CalAIM experience</p>
      <p style="margin:6px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">
        Enhanced Care Management is California's highest-priority Medi-Cal program right now. Mentioning ECM or CCM (Complex Care Management) experience puts you in the top 15% of applicants.
      </p>
    </div>
    <div style="margin-bottom:16px;">
      <p style="margin:0;font-weight:700;color:${TEAL};font-size:15px;">2. OCHIN Epic proficiency</p>
      <p style="margin:6px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">
        Over 60% of CA FQHCs run OCHIN Epic. If you've used any Epic product, call it out specifically — "OCHIN Epic" is more powerful than just "Epic."
      </p>
    </div>
    <div>
      <p style="margin:0;font-weight:700;color:${TEAL};font-size:15px;">3. Bilingual skills (any language)</p>
      <p style="margin:6px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">
        Spanish is in highest demand, but Vietnamese, Tagalog, Korean, and Cantonese all open doors in the Bay Area and LA. List it prominently.
      </p>
    </div>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    Our free Resume Builder has templates pre-built for 8 FQHC roles — CHW, Care Coordinator, RN, NP, and more. Each template highlights exactly these signals.
  </p>

  <a href="${SITE}/resume-builder" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 0;">Build Your FQHC Resume →</a>

  <p style="color:#78716c;font-size:14px;line-height:1.7;margin-top:20px;">
    Also worth bookmarking: <a href="${SITE}/jobs" style="color:${TEAL};">617+ FQHC job listings</a> across 9 CA regions, updated weekly from live career pages.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 7 — Salary data for your region */
export function candidateDrip2(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">What does an FQHC job pay in your region?</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    Salary ranges at FQHCs vary significantly by region, role, and org size. Here's a quick benchmark to make sure you're not underselling yourself:
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px;margin:20px 0;">
    <thead>
      <tr style="background:#f5f5f4;">
        <th style="text-align:left;padding:8px 12px;font-weight:600;color:#1c1917;border-bottom:2px solid #e7e5e4;">Role</th>
        <th style="text-align:right;padding:8px 12px;font-weight:600;color:#1c1917;border-bottom:2px solid #e7e5e4;">LA/SD P50</th>
        <th style="text-align:right;padding:8px 12px;font-weight:600;color:#1c1917;border-bottom:2px solid #e7e5e4;">Bay Area P50</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #f5f5f4;">
        <td style="padding:8px 12px;color:#44403c;">Care Coordinator</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$55K</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$66K</td>
      </tr>
      <tr style="border-bottom:1px solid #f5f5f4;background:#fafaf9;">
        <td style="padding:8px 12px;color:#44403c;">Community Health Worker</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$48K</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$58K</td>
      </tr>
      <tr style="border-bottom:1px solid #f5f5f4;">
        <td style="padding:8px 12px;color:#44403c;">Registered Nurse (RN)</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$88K</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$106K</td>
      </tr>
      <tr style="background:#fafaf9;">
        <td style="padding:8px 12px;color:#44403c;">Nurse Practitioner (NP)</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$138K</td>
        <td style="padding:8px 12px;text-align:right;color:${TEAL};font-weight:600;">$166K</td>
      </tr>
    </tbody>
  </table>

  <div style="background:${AMBER_BG};border-left:4px solid ${AMBER};padding:14px 16px;border-radius:0 8px 8px 0;margin:20px 0;">
    <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
      <strong>Don't forget total comp:</strong> NHSC loan repayment ($25–$50K/year), state-funded CHW certification support, and SB 525 $25/hr healthcare minimum wage floor add up to significant value beyond base salary.
    </p>
  </div>

  <a href="${SITE}/salary-data" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 0;">See Full Salary Data →</a>

  <p style="color:#78716c;font-size:14px;line-height:1.7;margin-top:20px;">
    See 30 roles × 9 regions with P25/P50/P75 breakdowns, career track progression, and regional comparison tool.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 10 — Interview prep */
export function candidateDrip3(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">Are you ready for the FQHC interview?</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    FQHC interviews are different from hospital interviews. They focus heavily on mission alignment, underserved community experience, and cultural humility — not just clinical skills.
  </p>

  <div style="background:${TEAL_LIGHT};border:1px solid ${TEAL_BORDER};border-radius:8px;padding:20px;margin:20px 0;">
    <p style="margin:0 0 12px 0;font-weight:700;color:${TEAL};font-size:14px;text-transform:uppercase;letter-spacing:0.05em;">Questions you WILL be asked:</p>
    <ul style="margin:0;padding-left:20px;color:#44403c;font-size:14px;line-height:1.8;">
      <li>"Tell me about a time you worked with a patient who didn't trust the healthcare system."</li>
      <li>"How do you handle a patient who can't afford their medication?"</li>
      <li>"Why a community health center vs. a hospital or private practice?"</li>
      <li>"What do you know about CalAIM / ECM programs?"</li>
    </ul>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    Our Interview Prep tool walks you through 10 real FQHC interview questions with STAR framework examples, strong answer templates, red flags to avoid, and role-specific coaching for Care Coordinators, CHWs, RNs, NPs, BH clinicians, and more.
  </p>

  <a href="${SITE}/interview-prep" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 0;">Practice Interview Questions →</a>

  <p style="color:#78716c;font-size:14px;line-height:1.7;margin-top:20px;">
    Also: check our <a href="${SITE}/resources" style="color:${TEAL};">free career resources</a> for NHSC loan repayment programs, CHW certification support, and professional development funding.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 14 — First 90 days + career assessment CTA */
export function candidateDrip4(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#0f766e 0%,#115e59 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#99f6e4;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">Planning your first 90 days at an FQHC</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    The first 90 days at any new job define your trajectory. At FQHCs, where mission and culture run deep, starting right matters even more. Here's what successful hires do:
  </p>

  <div style="margin:20px 0;">
    <div style="display:flex;align-items:flex-start;margin-bottom:14px;">
      <span style="background:${TEAL};color:white;border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-right:12px;margin-top:2px;">1</span>
      <div>
        <p style="margin:0;font-weight:600;color:#1c1917;font-size:14px;">Days 1–30: Listen and learn</p>
        <p style="margin:4px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">Map the patient population, understand the EHR workflow, and identify your supervisor's top priorities before suggesting changes.</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;margin-bottom:14px;">
      <span style="background:${TEAL};color:white;border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-right:12px;margin-top:2px;">2</span>
      <div>
        <p style="margin:0;font-weight:600;color:#1c1917;font-size:14px;">Days 31–60: Build relationships</p>
        <p style="margin:4px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">Have the "Five Conversations" — with your manager, team, key patients, community partners, and yourself about what success looks like.</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;">
      <span style="background:${TEAL};color:white;border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-right:12px;margin-top:2px;">3</span>
      <div>
        <p style="margin:0;font-weight:600;color:#1c1917;font-size:14px;">Days 61–90: Deliver a quick win</p>
        <p style="margin:4px 0 0 0;color:#44403c;font-size:14px;line-height:1.6;">Identify one specific, measurable improvement you can own — a gap in care coordination, a documentation workflow, a patient outreach initiative.</p>
      </div>
    </div>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    Take our 15-question Career Assessment to get a personalized role-readiness score plus a full 90-day plan tailored to your target FQHC role.
  </p>

  <a href="${SITE}/career-insights" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 0;">Get Your Career Assessment →</a>

  <p style="color:#78716c;font-size:14px;line-height:1.7;margin-top:20px;">
    You're now fully onboarded as a <em>The Pulse</em> subscriber. Each Tuesday you'll receive job highlights, market trends, salary updates, and career tips — all FQHC-specific, all with primary sources.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Employer Drip Emails (Intel Brief + Both subscribers)             */
/* ------------------------------------------------------------------ */

/** Day 3 — Platform tour */
export function employerDrip1(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#1c1917 0%,#292524 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#d6d3d1;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">Where to start on the platform</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    You're subscribed to the <strong>FQHC Intel Brief</strong> — California's only executive intelligence feed built specifically for FQHC leaders. Here's what's available to you:
  </p>

  <div style="background:#f5f5f4;border-radius:8px;padding:20px;margin:20px 0;">
    <div style="margin-bottom:14px;">
      <p style="margin:0;"><a href="${SITE}" style="color:${TEAL};font-weight:600;font-size:15px;text-decoration:none;">→ Intelligence Dashboard</a></p>
      <p style="margin:4px 0 0 16px;color:#78716c;font-size:14px;">Breaking intel, funding cliffs, AI adoption tracking — updated daily. Your Monday morning brief.</p>
    </div>
    <div style="margin-bottom:14px;">
      <p style="margin:0;"><a href="${SITE}/ai-tracker" style="color:${TEAL};font-weight:600;font-size:15px;text-decoration:none;">→ AI Adoption Tracker</a></p>
      <p style="margin:4px 0 0 16px;color:#78716c;font-size:14px;">17 documented AI implementations across the FQHC sector. Ambient scribes, RCM tools, predictive analytics — what's real vs. hype.</p>
    </div>
    <div style="margin-bottom:14px;">
      <p style="margin:0;"><a href="${SITE}/funding-impact" style="color:${TEAL};font-weight:600;font-size:15px;text-decoration:none;">→ H.R. 1 Impact Tracker</a></p>
      <p style="margin:4px 0 0 16px;color:#78716c;font-size:14px;">$4.6B in threatened FQHC funding. Policy timeline, revenue strategies, enrollment scenarios — updated as legislation moves.</p>
    </div>
    <div>
      <p style="margin:0;"><a href="${SITE}/layoffs" style="color:${TEAL};font-weight:600;font-size:15px;text-decoration:none;">→ Layoff Tracker</a></p>
      <p style="margin:4px 0 0 16px;color:#78716c;font-size:14px;">20 events, 3,477+ workers tracked from CA WARN Act filings. Know what's happening at peer organizations before the news cycle does.</p>
    </div>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    Your Intel Brief arrives every Tuesday. Each issue covers policy, funding, workforce, and AI — with primary source links for every claim.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 7 — Resilience scorecard */
export function employerDrip2(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#1c1917 0%,#292524 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#d6d3d1;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">How does your FQHC score on resilience?</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    We've scored all 219 California FQHCs across 5 dimensions of organizational resilience:
  </p>

  <div style="background:${TEAL_LIGHT};border:1px solid ${TEAL_BORDER};border-radius:8px;padding:20px;margin:20px 0;">
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #99f6e4;">
        <td style="padding:8px 0;color:#44403c;font-weight:600;">Program Diversity</td>
        <td style="padding:8px 0;color:#78716c;text-align:right;">25% weight</td>
      </tr>
      <tr style="border-bottom:1px solid #99f6e4;">
        <td style="padding:8px 0;color:#44403c;font-weight:600;">Workforce Stability</td>
        <td style="padding:8px 0;color:#78716c;text-align:right;">20% weight</td>
      </tr>
      <tr style="border-bottom:1px solid #99f6e4;">
        <td style="padding:8px 0;color:#44403c;font-weight:600;">Quality Indicators</td>
        <td style="padding:8px 0;color:#78716c;text-align:right;">20% weight</td>
      </tr>
      <tr style="border-bottom:1px solid #99f6e4;">
        <td style="padding:8px 0;color:#44403c;font-weight:600;">Financial Positioning</td>
        <td style="padding:8px 0;color:#78716c;text-align:right;">20% weight</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#44403c;font-weight:600;">Data Maturity</td>
        <td style="padding:8px 0;color:#78716c;text-align:right;">15% weight</td>
      </tr>
    </table>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    Find your organization in the Resilience Scorecard to see your grade, factor-level breakdown, and how you compare to peer FQHCs in your region. Then look up your FQHC's strategic intelligence report for a full threat landscape analysis.
  </p>

  <a href="${SITE}/strategy/resilience" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 8px 16px 0;">Resilience Scorecard →</a>
  <a href="${SITE}/directory" style="display:inline-block;background:#f5f5f4;color:${TEAL};border:1px solid ${TEAL};padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Find Your FQHC →</a>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 14 — Case studies + OKR templates */
export function employerDrip3(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#1c1917 0%,#292524 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#d6d3d1;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">What top-performing FQHCs are doing right now</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    Six real FQHC case studies — analyzed using Rumelt's Good Strategy framework (Diagnose → Guiding Policy → Coherent Actions → Outcomes):
  </p>

  <div style="background:#f5f5f4;border-radius:8px;padding:20px;margin:20px 0;">
    <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #e7e5e4;">
      <p style="margin:0;font-weight:700;color:#1c1917;font-size:14px;">PureView Health Network</p>
      <p style="margin:4px 0 0 0;color:#78716c;font-size:13px;">Merged 3 struggling FQHCs → saved 47,000 patients from losing coverage. Multi-FQHC consolidation playbook.</p>
    </div>
    <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #e7e5e4;">
      <p style="margin:0;font-weight:700;color:#1c1917;font-size:14px;">Sun River Health</p>
      <p style="margin:4px 0 0 0;color:#78716c;font-size:13px;">Deployed Sunoh.ai ambient AI at 500+ providers → 7,000 visits/month, 40% documentation time reduction.</p>
    </div>
    <div>
      <p style="margin:0;font-weight:700;color:#1c1917;font-size:14px;">MCR Health</p>
      <p style="margin:4px 0 0 0;color:#78716c;font-size:13px;">340B optimization + revenue diversification → 23% revenue increase, $2.4M in new grant funding.</p>
    </div>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    We also have 25 OKR templates built specifically for the 2026 funding crisis — downloadable as Excel workbooks with tracking columns for Owner, Progress %, Status, and Due Date.
  </p>

  <a href="${SITE}/strategy/guides" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 8px 16px 0;">Read Case Studies →</a>
  <a href="${SITE}/strategy/okrs" style="display:inline-block;background:#f5f5f4;color:${TEAL};border:1px solid ${TEAL};padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Download OKR Templates →</a>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/** Day 21 — Workforce transition services CTA */
export function employerDrip4(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,#1c1917 0%,#292524 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:20px;margin:0;">FQHC Talent Exchange</h1>
    <p style="color:#d6d3d1;font-size:13px;margin:6px 0 0 0;">California's FQHC Strategic Monitor</p>
  </div>

  <h2 style="color:#0d9488;font-size:18px;margin:0 0 12px 0;">Workforce transitions don't have to wait for a crisis</h2>
  <p style="color:#44403c;line-height:1.7;font-size:15px;margin:0 0 20px 0;">
    With H.R. 1 threatening $4.6B in FQHC funding, many California health centers are preparing for workforce transitions now — before cuts hit. The organizations that prepare early have dramatically better outcomes for their staff and their mission.
  </p>

  <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:20px 0;">
    <p style="margin:0;font-size:14px;font-weight:600;color:#b91c1c;">The reality of unprepared transitions:</p>
    <ul style="margin:8px 0 0 0;padding-left:20px;color:#78716c;font-size:14px;line-height:1.8;">
      <li>60–90 days to full recruitment cycle for clinical staff</li>
      <li>30–45% higher turnover when transitions are unplanned</li>
      <li>WARN Act violations (60-day notice required for 50+ layoffs)</li>
      <li>Irreplaceable patient relationships and community trust at risk</li>
    </ul>
  </div>

  <p style="color:#44403c;line-height:1.7;font-size:15px;">
    We offer three levels of workforce transition support:
  </p>

  <div style="margin:20px 0;">
    <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:14px;margin-bottom:10px;">
      <p style="margin:0;font-weight:700;color:#1c1917;font-size:14px;">Free — Self-Serve Tools</p>
      <p style="margin:4px 0 0 0;color:#78716c;font-size:13px;">WARN Act checklist, career resources portal, salary benchmarks, 220+ FQHC directory for placement research.</p>
    </div>
    <div style="background:#fafaf9;border:1px solid #e7e5e4;border-radius:8px;padding:14px;margin-bottom:10px;">
      <p style="margin:0;font-weight:700;color:#1c1917;font-size:14px;">Managed Transition — $500–$1,500</p>
      <p style="margin:4px 0 0 0;color:#78716c;font-size:13px;">Dedicated transition coordinator, outplacement resume support, warm introductions to hiring FQHCs, WARN Act compliance review.</p>
    </div>
    <div style="background:${TEAL_LIGHT};border:1px solid ${TEAL_BORDER};border-radius:8px;padding:14px;">
      <p style="margin:0;font-weight:700;color:${TEAL};font-size:14px;">Placement Partnership — $2,000–$5,000</p>
      <p style="margin:4px 0 0 0;color:#0f766e;font-size:13px;">Full placement management — job matching, interview prep, offer negotiation, 90-day success check-in.</p>
    </div>
  </div>

  <a href="${SITE}/strategy/offboarding" style="display:inline-block;background:${TEAL};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 8px 16px 0;">Submit Transition Request →</a>

  <p style="color:#78716c;font-size:14px;line-height:1.7;margin-top:20px;">
    You're now fully onboarded as an <em>Intel Brief</em> subscriber. Your weekly briefing arrives every Tuesday.
  </p>

  ${dripFooter(unsubscribeUrl)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Dispatcher — returns the right template for a given step          */
/* ------------------------------------------------------------------ */

export function getDripEmail(
  audience: string,
  step: number,
  unsubscribeUrl: string
): { subject: string; html: string } | null {
  if (audience === "the-pulse") {
    switch (step) {
      case 0: return { subject: "3 things FQHC employers are looking for right now", html: candidateDrip1(unsubscribeUrl) };
      case 1: return { subject: "What does an FQHC job pay in your region?", html: candidateDrip2(unsubscribeUrl) };
      case 2: return { subject: "Are you ready for the FQHC interview?", html: candidateDrip3(unsubscribeUrl) };
      case 3: return { subject: "Planning your first 90 days at an FQHC", html: candidateDrip4(unsubscribeUrl) };
      default: return null;
    }
  } else {
    // intel-brief or both
    switch (step) {
      case 0: return { subject: "Your FQHC intelligence platform — where to start", html: employerDrip1(unsubscribeUrl) };
      case 1: return { subject: "How does your FQHC score on resilience?", html: employerDrip2(unsubscribeUrl) };
      case 2: return { subject: "What top-performing FQHCs are doing right now", html: employerDrip3(unsubscribeUrl) };
      case 3: return { subject: "Workforce transitions don't have to wait for a crisis", html: employerDrip4(unsubscribeUrl) };
      default: return null;
    }
  }
}
