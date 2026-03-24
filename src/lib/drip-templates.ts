/* ------------------------------------------------------------------ */
/*  Welcome Drip Email Templates — FQHC Talent Exchange               */
/*  3 tracks × 3 emails each, unified on [3, 7, 14] day schedule     */
/*  All templates use the shared design system from email-helpers.ts  */
/* ------------------------------------------------------------------ */

import {
  BRAND,
  emailHeader,
  emailFooter,
  sectionDivider,
  ctaButton,
  academyTeaser,
  dashboardLoginCta,
  missionBanner,
} from "@/lib/email-helpers";

const SITE = "https://www.fqhctalent.com";

/* ------------------------------------------------------------------ */
/*  Drip schedule (days after subscribed_at to send each step)        */
/*  All 3 tracks now share a unified cadence: Day 3 → 7 → 14         */
/* ------------------------------------------------------------------ */

export const CANDIDATE_DRIP_DAYS = [3, 7, 14] as const;
export const EMPLOYER_DRIP_DAYS  = [3, 7, 14] as const;
export const BOTH_DRIP_DAYS     = [3, 7, 14] as const;

export function getDripDays(audience: string): readonly number[] {
  switch (audience) {
    case "the-pulse":    return CANDIDATE_DRIP_DAYS;
    case "intel-brief":  return EMPLOYER_DRIP_DAYS;
    case "both":         return BOTH_DRIP_DAYS;
    default:             return EMPLOYER_DRIP_DAYS;
  }
}

/* ------------------------------------------------------------------ */
/*  Shared email shell — wraps every drip in the design system        */
/* ------------------------------------------------------------------ */

function dripShell(body: string, unsubscribeToken?: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:${BRAND.stone900};background:#ffffff;">
  ${emailHeader()}
  ${body}
  ${emailFooter(false, unsubscribeToken)}
</body>
</html>`;
}

/* ================================================================== */
/*  CANDIDATE TRACK — "The Pulse" subscribers                         */
/*  Day 3: What FQHCs look for  |  Day 7: Salary intel               */
/*  Day 14: Career assessment + dashboard + academy upsell            */
/* ================================================================== */

function candidateDrip1Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">3 things FQHC employers actually look for</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 3 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Most resumes miss what FQHC hiring managers care about most. After reviewing hundreds of job listings across California, here's what keeps showing up:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("What Sets Candidates Apart")}
    <tr><td style="padding:0 0 20px;">

      <div style="background:${BRAND.tealLight};border:1px solid ${BRAND.tealBorder};border-radius:8px;padding:20px;">
        <div style="margin-bottom:16px;">
          <p style="margin:0;font-weight:700;color:${BRAND.teal};font-size:15px;">1. ECM & CalAIM experience</p>
          <p style="margin:6px 0 0;color:${BRAND.stone700};font-size:14px;line-height:1.6;">
            Enhanced Care Management is California's highest-priority Medi-Cal program. Mentioning ECM or CCM puts you in the top 15% of applicants.
          </p>
        </div>
        <div style="margin-bottom:16px;">
          <p style="margin:0;font-weight:700;color:${BRAND.teal};font-size:15px;">2. OCHIN Epic proficiency</p>
          <p style="margin:6px 0 0;color:${BRAND.stone700};font-size:14px;line-height:1.6;">
            Over 60% of CA FQHCs run OCHIN Epic. If you've used any Epic product, call it out — "OCHIN Epic" is more powerful on a resume than just "Epic."
          </p>
        </div>
        <div>
          <p style="margin:0;font-weight:700;color:${BRAND.teal};font-size:15px;">3. Bilingual skills (any language)</p>
          <p style="margin:6px 0 0;color:${BRAND.stone700};font-size:14px;line-height:1.6;">
            Spanish is in highest demand, but Vietnamese, Tagalog, Korean, and Cantonese all open doors in the Bay Area and LA.
          </p>
        </div>
      </div>

    </td></tr>
  </table>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    Our free Resume Builder has templates pre-built for 8 FQHC roles — each highlights exactly these signals.
  </p>

  <div style="text-align:center;margin:20px 0;">
    ${ctaButton("Build Your FQHC Resume →", `${SITE}/resume-builder`)}
  </div>

  <div style="background:${BRAND.stone100};border-radius:8px;padding:14px;margin:20px 0;">
    <p style="margin:0;font-size:13px;color:${BRAND.stone700};line-height:1.6;">
      <strong style="color:${BRAND.stone900};">Also worth bookmarking:</strong>
      <a href="${SITE}/jobs" style="color:${BRAND.teal};font-weight:600;">1,674+ FQHC job listings</a> across 9 CA regions, updated weekly from live career pages.
    </p>
  </div>`;
}

function candidateDrip2Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">What does an FQHC job pay in your region?</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 7 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Salary ranges at FQHCs vary significantly by region, role, and org size. Here's a quick benchmark:
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px;margin:20px 0;border-radius:8px;overflow:hidden;">
    <thead>
      <tr style="background:${BRAND.teal};">
        <th style="text-align:left;padding:10px 12px;font-weight:600;color:white;">Role</th>
        <th style="text-align:right;padding:10px 12px;font-weight:600;color:white;">LA/SD P50</th>
        <th style="text-align:right;padding:10px 12px;font-weight:600;color:white;">Bay Area P50</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid ${BRAND.stone100};">
        <td style="padding:10px 12px;color:${BRAND.stone700};">Care Coordinator</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$55K</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$66K</td>
      </tr>
      <tr style="background:${BRAND.stone50};border-bottom:1px solid ${BRAND.stone100};">
        <td style="padding:10px 12px;color:${BRAND.stone700};">Community Health Worker</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$48K</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$58K</td>
      </tr>
      <tr style="border-bottom:1px solid ${BRAND.stone100};">
        <td style="padding:10px 12px;color:${BRAND.stone700};">Registered Nurse (RN)</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$88K</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$106K</td>
      </tr>
      <tr style="background:${BRAND.stone50};">
        <td style="padding:10px 12px;color:${BRAND.stone700};">Nurse Practitioner (NP)</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$138K</td>
        <td style="padding:10px 12px;text-align:right;color:${BRAND.teal};font-weight:700;">$166K</td>
      </tr>
    </tbody>
  </table>

  <div style="background:${BRAND.amberBg};border-left:4px solid ${BRAND.amber};padding:14px 16px;border-radius:0 8px 8px 0;margin:20px 0;">
    <p style="margin:0;font-size:14px;color:#92400E;line-height:1.6;">
      <strong>Don't forget total comp:</strong> NHSC loan repayment ($25–$50K/year), state-funded CHW certification, and SB 525 $25/hr minimum wage floor add significant value beyond base salary.
    </p>
  </div>

  <div style="text-align:center;margin:20px 0;">
    ${ctaButton("See Full Salary Data →", `${SITE}/salary-data`)}
  </div>

  <p style="color:${BRAND.stone500};font-size:13px;line-height:1.7;">
    See 30 roles × 9 regions with P25/P50/P75 breakdowns and regional comparison tool.
  </p>`;
}

function candidateDrip3Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">Your personalized FQHC career toolkit</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 14 — Final onboarding email</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Over the last two weeks, you've seen what FQHC employers want, how salaries stack up, and where the jobs are. Now let's get personal.
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("Know Your Readiness")}
    <tr><td style="padding:0 0 10px;">
      <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
        Our 15-question Career Assessment gives you a personalized role-readiness score, a 90-day plan tailored to your target role, and specific skills gaps to close.
      </p>
      <div style="text-align:center;margin:16px 0;">
        ${ctaButton("Take Career Assessment →", `${SITE}/career-insights`)}
      </div>
    </td></tr>
  </table>

  ${dashboardLoginCta(false)}

  ${academyTeaser(false)}

  ${missionBanner(false)}

  <p style="color:${BRAND.stone500};font-size:13px;line-height:1.7;margin-top:20px;">
    You're now fully onboarded as a <strong style="color:${BRAND.stone900};">Pulse</strong> subscriber. Each Tuesday you'll receive job highlights, market trends, salary updates, and career tips — all FQHC-specific, all with primary sources.
  </p>`;
}

/* ================================================================== */
/*  EMPLOYER TRACK — "Intel Brief" subscribers                        */
/*  Day 3: Platform tour  |  Day 7: Resilience scorecard              */
/*  Day 14: Case studies + OKRs + academy + dashboard upsell          */
/* ================================================================== */

function employerDrip1Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">Your FQHC intelligence platform — where to start</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 3 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    You're subscribed to the <strong>FQHC Intel Brief</strong> — California's only executive intelligence feed built specifically for FQHC leaders. Here's what's available to you:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("Your Intelligence Toolkit")}
    <tr><td style="padding:0 0 20px;">

      <div style="background:${BRAND.stone100};border-radius:8px;padding:20px;">
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid ${BRAND.stone300};">
          <p style="margin:0;"><a href="${SITE}" style="color:${BRAND.teal};font-weight:700;font-size:15px;text-decoration:none;">Intelligence Dashboard →</a></p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Breaking intel, funding cliffs, AI adoption tracking — updated daily.</p>
        </div>
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid ${BRAND.stone300};">
          <p style="margin:0;"><a href="${SITE}/ai-tracker" style="color:${BRAND.teal};font-weight:700;font-size:15px;text-decoration:none;">AI Adoption Tracker →</a></p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">17+ documented AI implementations. Ambient scribes, RCM tools, predictive analytics — what's real vs. hype.</p>
        </div>
        <div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid ${BRAND.stone300};">
          <p style="margin:0;"><a href="${SITE}/funding-impact" style="color:${BRAND.teal};font-weight:700;font-size:15px;text-decoration:none;">H.R. 1 Impact Tracker →</a></p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">$4.6B in threatened FQHC funding. Policy timeline, revenue scenarios — updated as legislation moves.</p>
        </div>
        <div>
          <p style="margin:0;"><a href="${SITE}/layoffs" style="color:${BRAND.teal};font-weight:700;font-size:15px;text-decoration:none;">Layoff & WARN Tracker →</a></p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">20 events, 3,477+ workers tracked from CA WARN Act filings.</p>
        </div>
      </div>

    </td></tr>
  </table>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    Your Intel Brief arrives every Tuesday. Each issue covers policy, funding, workforce, and AI — with primary source links for every claim.
  </p>`;
}

function employerDrip2Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">How does your FQHC score on resilience?</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 7 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    We've scored all 219 California FQHCs across 5 dimensions of organizational resilience:
  </p>

  <div style="background:${BRAND.tealLight};border:1px solid ${BRAND.tealBorder};border-radius:8px;padding:20px;margin:20px 0;">
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      <tr style="border-bottom:1px solid ${BRAND.tealBorder};">
        <td style="padding:8px 0;color:${BRAND.stone700};font-weight:600;">Program Diversity</td>
        <td style="padding:8px 0;color:${BRAND.stone500};text-align:right;">25%</td>
      </tr>
      <tr style="border-bottom:1px solid ${BRAND.tealBorder};">
        <td style="padding:8px 0;color:${BRAND.stone700};font-weight:600;">Workforce Stability</td>
        <td style="padding:8px 0;color:${BRAND.stone500};text-align:right;">20%</td>
      </tr>
      <tr style="border-bottom:1px solid ${BRAND.tealBorder};">
        <td style="padding:8px 0;color:${BRAND.stone700};font-weight:600;">Quality Indicators</td>
        <td style="padding:8px 0;color:${BRAND.stone500};text-align:right;">20%</td>
      </tr>
      <tr style="border-bottom:1px solid ${BRAND.tealBorder};">
        <td style="padding:8px 0;color:${BRAND.stone700};font-weight:600;">Financial Positioning</td>
        <td style="padding:8px 0;color:${BRAND.stone500};text-align:right;">20%</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:${BRAND.stone700};font-weight:600;">Data Maturity</td>
        <td style="padding:8px 0;color:${BRAND.stone500};text-align:right;">15%</td>
      </tr>
    </table>
  </div>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    Find your organization in the Resilience Scorecard to see your grade, factor-level breakdown, and peer comparison.
  </p>

  <div style="text-align:center;margin:20px 0;">
    ${ctaButton("Resilience Scorecard →", `${SITE}/strategy/resilience`)}
    ${ctaButton("Find Your FQHC →", `${SITE}/directory`, "secondary")}
  </div>`;
}

function employerDrip3Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">What top-performing FQHCs are doing right now</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 14 — Final onboarding email</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Six real case studies analyzed using Rumelt's Good Strategy framework — Diagnose, Guiding Policy, Coherent Actions, Outcomes:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("Case Studies")}
    <tr><td style="padding:0 0 20px;">

      <div style="background:${BRAND.stone100};border-radius:8px;padding:20px;">
        <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid ${BRAND.stone300};">
          <p style="margin:0;font-weight:700;color:${BRAND.stone900};font-size:14px;">PureView Health Network</p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Merged 3 struggling FQHCs → saved 47,000 patients from losing coverage.</p>
        </div>
        <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid ${BRAND.stone300};">
          <p style="margin:0;font-weight:700;color:${BRAND.stone900};font-size:14px;">Sun River Health</p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Deployed Sunoh.ai ambient AI at 500+ providers → 7,000 visits/month, 40% doc-time reduction.</p>
        </div>
        <div>
          <p style="margin:0;font-weight:700;color:${BRAND.stone900};font-size:14px;">MCR Health</p>
          <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">340B optimization + revenue diversification → 23% revenue increase, $2.4M in new grants.</p>
        </div>
      </div>

    </td></tr>
  </table>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    We also have 25 OKR templates built for the 2026 funding crisis — downloadable Excel workbooks with tracking columns.
  </p>

  <div style="text-align:center;margin:20px 0;">
    ${ctaButton("Read Case Studies →", `${SITE}/strategy/guides`)}
    ${ctaButton("Download OKR Templates →", `${SITE}/strategy/okrs`, "secondary")}
  </div>

  ${dashboardLoginCta(false)}

  ${academyTeaser(false)}

  <p style="color:${BRAND.stone500};font-size:13px;line-height:1.7;margin-top:20px;">
    You're now fully onboarded as an <strong style="color:${BRAND.stone900};">Intel Brief</strong> subscriber. Your weekly briefing arrives every Tuesday — policy, funding, workforce, and AI with primary sources.
  </p>`;
}

/* ================================================================== */
/*  BOTH TRACK — subscribers who want Intel Brief + The Pulse         */
/*  Unique content that bridges leadership intel & career growth      */
/*  Day 3: Full platform tour (both tracks)                           */
/*  Day 7: The complete workforce picture (exec + front-line)         */
/*  Day 14: Your personalized command center + academy + dashboard    */
/* ================================================================== */

function bothDrip1Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">You picked <em>both</em> briefings — here's why that's smart</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 3 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Whether you're an FQHC leader who wants to understand the candidate market, or a clinician who wants the executive view — you now get the full picture. Here's everything available to you:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("For the Strategist in You")}
    <tr><td style="padding:0 0 10px;">
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin-bottom:8px;">
        <p style="margin:0;"><a href="${SITE}" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">Intelligence Dashboard →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Breaking intel, funding cliffs, AI adoption — updated daily.</p>
      </div>
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin-bottom:8px;">
        <p style="margin:0;"><a href="${SITE}/ai-tracker" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">AI Adoption Tracker →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">17+ real AI deployments across FQHCs — what's working.</p>
      </div>
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;">
        <p style="margin:0;"><a href="${SITE}/funding-impact" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">H.R. 1 Impact Tracker →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">$4.6B in threatened FQHC funding. Policy timelines updated live.</p>
      </div>
    </td></tr>

    ${sectionDivider("For the Career Builder in You")}
    <tr><td style="padding:0 0 10px;">
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin-bottom:8px;">
        <p style="margin:0;"><a href="${SITE}/jobs" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">1,674+ FQHC Jobs →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Across 9 CA regions, updated weekly from live career pages.</p>
      </div>
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin-bottom:8px;">
        <p style="margin:0;"><a href="${SITE}/salary-data" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">Salary Explorer →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">30 roles × 9 regions with P25/P50/P75 breakdowns.</p>
      </div>
      <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;">
        <p style="margin:0;"><a href="${SITE}/resume-builder" style="color:${BRAND.teal};font-weight:700;font-size:14px;text-decoration:none;">FQHC Resume Builder →</a></p>
        <p style="margin:4px 0 0;color:${BRAND.stone500};font-size:13px;">Templates pre-built for 8 FQHC roles with the right keywords.</p>
      </div>
    </td></tr>
  </table>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
    Every Tuesday you'll receive <strong>two briefings</strong>: the Intel Brief (policy, funding, AI) and The Pulse (jobs, salaries, career intel).
  </p>`;
}

function bothDrip2Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">The complete FQHC workforce picture</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 7 of your onboarding series</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Because you follow both tracks, you see what most people miss — how executive strategy decisions ripple into front-line careers, and vice versa. Here's the view from both sides:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("The Executive View")}
    <tr><td style="padding:0 0 10px;">
      <div style="background:${BRAND.tealLight};border:1px solid ${BRAND.tealBorder};border-radius:8px;padding:16px;">
        <p style="margin:0;font-weight:700;color:${BRAND.teal};font-size:14px;">Resilience Scorecard</p>
        <p style="margin:6px 0 0;color:${BRAND.stone700};font-size:14px;line-height:1.6;">
          219 California FQHCs scored across Program Diversity (25%), Workforce Stability (20%), Quality (20%), Financial Positioning (20%), and Data Maturity (15%). Find your org and see how you compare.
        </p>
        <div style="margin-top:12px;">
          ${ctaButton("View Scorecard →", `${SITE}/strategy/resilience`)}
        </div>
      </div>
    </td></tr>

    ${sectionDivider("The Career View")}
    <tr><td style="padding:0 0 10px;">
      <div style="background:${BRAND.amberBg};border:1px solid ${BRAND.amberBorder};border-radius:8px;padding:16px;">
        <p style="margin:0;font-weight:700;color:#92400E;font-size:14px;">Salary Benchmarks by Region</p>
        <p style="margin:6px 0 0;color:${BRAND.stone700};font-size:14px;line-height:1.6;">
          Care Coordinator: $55K (LA) → $66K (Bay Area). NP: $138K → $166K. Plus NHSC loan repayment ($25–50K/year) and SB 525 $25/hr floor — total comp matters.
        </p>
        <div style="margin-top:12px;">
          ${ctaButton("Full Salary Data →", `${SITE}/salary-data`)}
        </div>
      </div>
    </td></tr>
  </table>

  <div style="background:${BRAND.stone100};border-radius:8px;padding:16px;margin:20px 0;">
    <p style="margin:0;font-size:14px;color:${BRAND.stone700};line-height:1.6;">
      <strong style="color:${BRAND.stone900};">Why this matters together:</strong> Leaders who understand salary realities retain staff. Clinicians who understand funding threats make smarter career moves. You're getting both.
    </p>
  </div>`;
}

function bothDrip3Body(): string {
  return `
  <h2 style="color:${BRAND.teal};font-size:20px;margin:0 0 8px;">Your personalized FQHC command center</h2>
  <p style="color:${BRAND.stone500};font-size:13px;margin:0 0 20px;">Day 14 — Final onboarding email</p>

  <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;margin:0 0 20px;">
    Two weeks in. You've explored the platform, seen the data, and understand why FQHC intelligence matters. Here's how to make it personal:
  </p>

  <table role="presentation" style="width:100%;border-collapse:collapse;">
    ${sectionDivider("Leadership Tools")}
    <tr><td style="padding:0 0 10px;">
      <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
        Six case studies from top-performing FQHCs — from multi-org mergers to 340B optimization — plus 25 downloadable OKR templates built for the 2026 funding crisis.
      </p>
      <div style="text-align:center;margin:12px 0;">
        ${ctaButton("Case Studies →", `${SITE}/strategy/guides`)}
        ${ctaButton("OKR Templates →", `${SITE}/strategy/okrs`, "secondary")}
      </div>
    </td></tr>

    ${sectionDivider("Career Tools")}
    <tr><td style="padding:0 0 10px;">
      <p style="color:${BRAND.stone700};line-height:1.7;font-size:15px;">
        Take the 15-question Career Assessment for a personalized role-readiness score and 90-day plan tailored to your target FQHC role.
      </p>
      <div style="text-align:center;margin:12px 0;">
        ${ctaButton("Career Assessment →", `${SITE}/career-insights`)}
        ${ctaButton("Interview Prep →", `${SITE}/interview-prep`, "secondary")}
      </div>
    </td></tr>
  </table>

  ${dashboardLoginCta(false)}

  ${academyTeaser(false)}

  ${missionBanner(false)}

  <p style="color:${BRAND.stone500};font-size:13px;line-height:1.7;margin-top:20px;">
    You're now fully onboarded. Every Tuesday you'll receive <strong style="color:${BRAND.stone900};">both</strong> the Intel Brief and The Pulse — the full FQHC picture, delivered to your inbox.
  </p>`;
}

/* ================================================================== */
/*  Dispatcher — returns the right template for audience + step       */
/* ================================================================== */

export function getDripEmail(
  audience: string,
  step: number,
  unsubscribeUrl: string,
): { subject: string; html: string } | null {
  // Extract token from full URL for emailFooter
  const tokenMatch = unsubscribeUrl.match(/token=([^&]+)/);
  const token = tokenMatch ? tokenMatch[1] : undefined;

  if (audience === "the-pulse") {
    switch (step) {
      case 0: return { subject: "3 things FQHC employers are looking for right now", html: dripShell(candidateDrip1Body(), token) };
      case 1: return { subject: "What does an FQHC job pay in your region?", html: dripShell(candidateDrip2Body(), token) };
      case 2: return { subject: "Your personalized FQHC career toolkit", html: dripShell(candidateDrip3Body(), token) };
      default: return null;
    }
  } else if (audience === "both") {
    switch (step) {
      case 0: return { subject: "You picked both briefings — here's why that's smart", html: dripShell(bothDrip1Body(), token) };
      case 1: return { subject: "The complete FQHC workforce picture", html: dripShell(bothDrip2Body(), token) };
      case 2: return { subject: "Your personalized FQHC command center", html: dripShell(bothDrip3Body(), token) };
      default: return null;
    }
  } else {
    // intel-brief (default)
    switch (step) {
      case 0: return { subject: "Your FQHC intelligence platform — where to start", html: dripShell(employerDrip1Body(), token) };
      case 1: return { subject: "How does your FQHC score on resilience?", html: dripShell(employerDrip2Body(), token) };
      case 2: return { subject: "What top-performing FQHCs are doing right now", html: dripShell(employerDrip3Body(), token) };
      default: return null;
    }
  }
}
