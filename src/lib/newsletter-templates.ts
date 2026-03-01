/* ------------------------------------------------------------------ */
/*  Newsletter Email Templates — Intel Brief + The Pulse               */
/*  HTML email templates for the two newsletter tracks                 */
/*  Uses inline styles for email client compatibility                  */
/* ------------------------------------------------------------------ */

import { emailHeader, emailFooter } from "@/lib/email-helpers";

const SITE = "https://www.fqhctalent.com";
const TEAL = "#0F766E";
const TEAL_LIGHT = "#F0FDFA";
const TEAL_BORDER = "#99F6E4";
const AMBER = "#F59E0B";
const AMBER_BG = "#FFFBEB";
const AMBER_BORDER = "#FDE68A";
const RED = "#B91C1C";
const RED_BG = "#FEF2F2";
const RED_BORDER = "#FECACA";
const GREEN = "#15803D";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface IntelBriefContent {
  /** Issue number */
  issueNumber: number;
  /** e.g. "2026-02-28" */
  date: string;
  /** Top-line executive summary (2-3 sentences) */
  executiveSummary: string;
  /** Policy and legislative updates */
  policyUpdates: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
    impactLevel: "critical" | "high" | "medium";
  }[];
  /** Funding and financial alerts */
  fundingAlerts: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
  }[];
  /** Workforce and layoff news */
  workforceUpdates: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
  }[];
  /** AI and technology adoption */
  aiUpdates: {
    headline: string;
    summary: string;
    sourceUrl: string;
  }[];
  /** Key dates coming up */
  keyDates: {
    date: string;
    event: string;
  }[];
  /** Featured strategy content from the site */
  featuredContent: {
    title: string;
    description: string;
    url: string;
  };
}

export interface PulseContent {
  /** Issue number */
  issueNumber: number;
  /** e.g. "2026-02-28" */
  date: string;
  /** Top-line summary for job seekers */
  summary: string;
  /** New job listings highlight */
  jobHighlights: {
    totalJobs: number;
    newThisWeek: number;
    topFQHCs: { name: string; count: number; url: string }[];
  };
  /** Salary and market trends */
  marketTrends: {
    headline: string;
    summary: string;
  }[];
  /** Free tool spotlight */
  toolSpotlight: {
    name: string;
    description: string;
    url: string;
  };
  /** Career tips */
  careerTips: {
    title: string;
    body: string;
  }[];
  /** Featured blog post */
  featuredPost: {
    title: string;
    excerpt: string;
    url: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Shared blocks                                                      */
/* ------------------------------------------------------------------ */

function impactBadge(level: "critical" | "high" | "medium"): string {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    critical: { bg: RED_BG, color: RED, label: "CRITICAL" },
    high: { bg: AMBER_BG, color: AMBER, label: "HIGH" },
    medium: { bg: "#F5F5F4", color: "#78716C", label: "MEDIUM" },
  };
  const s = styles[level];
  return `<span style="display: inline-block; background: ${s.bg}; color: ${s.color}; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; padding: 2px 6px; border-radius: 4px;">${s.label}</span>`;
}

function sourceLink(url: string, org: string): string {
  return `<a href="${url}" style="color: ${TEAL}; font-size: 12px; text-decoration: none;">Source: ${org} →</a>`;
}

function sectionHeader(title: string, emoji: string): string {
  return `
  <tr>
    <td style="padding: 24px 0 8px;">
      <p style="margin: 0; font-size: 14px; font-weight: 700; color: ${TEAL}; text-transform: uppercase; letter-spacing: 0.5px;">
        ${emoji} ${title}
      </p>
    </td>
  </tr>`;
}

function unsubscribeLink(token: string): string {
  return `
  <p style="font-size: 11px; color: #a8a29e; text-align: center; margin-top: 16px;">
    <a href="${SITE}/api/newsletter/unsubscribe?token=${token}" style="color: #a8a29e; text-decoration: underline;">Unsubscribe</a>
    · <a href="${SITE}/newsletter" style="color: #a8a29e; text-decoration: underline;">Manage preferences</a>
  </p>`;
}

/* ------------------------------------------------------------------ */
/*  Intel Brief Template                                               */
/* ------------------------------------------------------------------ */

export function intelBriefHtml(
  content: IntelBriefContent,
  unsubscribeToken: string,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FQHC Intel Brief #${content.issueNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917; background: #FAFAF9;">
  ${emailHeader()}

  <!-- Issue badge -->
  <div style="text-align: center; margin-bottom: 8px;">
    <span style="display: inline-block; background: #1C1917; color: white; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px;">
      INTEL BRIEF #${content.issueNumber} · ${content.date}
    </span>
  </div>

  <h2 style="text-align: center; font-size: 22px; color: #1c1917; margin: 16px 0;">
    Weekly Executive Briefing
  </h2>

  <!-- Executive Summary -->
  <div style="background: ${TEAL_LIGHT}; border-left: 4px solid ${TEAL}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
    <p style="margin: 0; font-weight: 700; color: ${TEAL}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
      Executive Summary
    </p>
    <p style="margin: 8px 0 0; font-size: 14px; color: #1c1917; line-height: 1.6;">
      ${content.executiveSummary}
    </p>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    ${content.policyUpdates.length > 0 ? `
    ${sectionHeader("Policy & Legislative", "📋")}
    ${content.policyUpdates.map(p => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <div style="margin-bottom: 4px;">
          ${impactBadge(p.impactLevel)}
          <span style="font-size: 14px; font-weight: 600; color: #1c1917; margin-left: 4px;">${p.headline}</span>
        </div>
        <p style="margin: 4px 0; font-size: 13px; color: #44403c; line-height: 1.5;">${p.summary}</p>
        ${sourceLink(p.sourceUrl, p.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.fundingAlerts.length > 0 ? `
    ${sectionHeader("Funding & Financial", "💰")}
    ${content.fundingAlerts.map(f => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1917;">${f.headline}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #44403c; line-height: 1.5;">${f.summary}</p>
        ${sourceLink(f.sourceUrl, f.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.workforceUpdates.length > 0 ? `
    ${sectionHeader("Workforce & Layoffs", "👥")}
    ${content.workforceUpdates.map(w => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1917;">${w.headline}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #44403c; line-height: 1.5;">${w.summary}</p>
        ${sourceLink(w.sourceUrl, w.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.aiUpdates.length > 0 ? `
    ${sectionHeader("AI & Technology", "🤖")}
    ${content.aiUpdates.map(a => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1917;">${a.headline}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #44403c; line-height: 1.5;">${a.summary}</p>
        ${sourceLink(a.sourceUrl, "Source")}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.keyDates.length > 0 ? `
    ${sectionHeader("Key Dates Ahead", "📅")}
    ${content.keyDates.map(d => `
    <tr>
      <td style="padding: 6px 0;">
        <span style="display: inline-block; background: ${AMBER_BG}; border: 1px solid ${AMBER_BORDER}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; color: #92400E; margin-right: 8px;">${d.date}</span>
        <span style="font-size: 13px; color: #44403c;">${d.event}</span>
      </td>
    </tr>`).join("")}
    ` : ""}
  </table>

  <!-- Featured Content -->
  ${content.featuredContent ? `
  <div style="background: #F5F5F4; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #78716C; text-transform: uppercase; letter-spacing: 0.5px;">Featured on FQHC Talent</p>
    <p style="margin: 8px 0 4px; font-size: 16px; font-weight: 700; color: #1c1917;">${content.featuredContent.title}</p>
    <p style="margin: 0 0 12px; font-size: 13px; color: #44403c;">${content.featuredContent.description}</p>
    <a href="${content.featuredContent.url}" style="display: inline-block; background: ${TEAL}; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
      Read More →
    </a>
  </div>
  ` : ""}

  <!-- CTA -->
  <div style="text-align: center; margin: 32px 0;">
    <a href="${SITE}/insights" style="display: inline-block; background: ${TEAL}; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
      View Full Dashboard →
    </a>
  </div>

  ${emailFooter(false)}
  ${unsubscribeLink(unsubscribeToken)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Intel Brief — Subject Line Generator                               */
/* ------------------------------------------------------------------ */

export function intelBriefSubject(content: IntelBriefContent): string {
  const hasCritical = content.policyUpdates.some((p) => p.impactLevel === "critical");
  const prefix = hasCritical ? "🔴 " : "";
  const topHeadline =
    content.policyUpdates[0]?.headline ||
    content.fundingAlerts[0]?.headline ||
    content.workforceUpdates[0]?.headline ||
    "This Week in FQHC Policy";
  return `${prefix}Intel Brief #${content.issueNumber}: ${topHeadline}`;
}

/* ------------------------------------------------------------------ */
/*  The Pulse Template                                                 */
/* ------------------------------------------------------------------ */

export function pulseHtml(
  content: PulseContent,
  unsubscribeToken: string,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Pulse #${content.issueNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917; background: #FAFAF9;">
  ${emailHeader()}

  <!-- Issue badge -->
  <div style="text-align: center; margin-bottom: 8px;">
    <span style="display: inline-block; background: ${TEAL}; color: white; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px;">
      THE PULSE #${content.issueNumber} · ${content.date}
    </span>
  </div>

  <h2 style="text-align: center; font-size: 22px; color: #1c1917; margin: 16px 0;">
    Your Weekly FQHC Career Update
  </h2>

  <!-- Summary -->
  <div style="background: ${TEAL_LIGHT}; border-left: 4px solid ${TEAL}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
    <p style="margin: 0; font-size: 14px; color: #1c1917; line-height: 1.6;">
      ${content.summary}
    </p>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    <!-- Job Highlights -->
    ${sectionHeader("Job Market This Week", "💼")}
    <tr>
      <td style="padding: 8px 0 16px;">
        <table style="width: 100%; text-align: center; background: #F5F5F4; border-radius: 8px;">
          <tr>
            <td style="padding: 12px;">
              <p style="font-size: 24px; font-weight: 800; color: ${TEAL}; margin: 0;">${content.jobHighlights.totalJobs}</p>
              <p style="font-size: 11px; color: #78716c; margin: 4px 0 0;">Total Jobs</p>
            </td>
            <td style="padding: 12px;">
              <p style="font-size: 24px; font-weight: 800; color: ${GREEN}; margin: 0;">+${content.jobHighlights.newThisWeek}</p>
              <p style="font-size: 11px; color: #78716c; margin: 4px 0 0;">New This Week</p>
            </td>
          </tr>
        </table>
        <p style="margin: 12px 0 4px; font-size: 13px; font-weight: 600; color: #44403c;">Top Hiring FQHCs:</p>
        ${content.jobHighlights.topFQHCs.map(f => `
        <p style="margin: 4px 0; font-size: 13px; color: #44403c;">
          <a href="${f.url}" style="color: ${TEAL}; text-decoration: none; font-weight: 600;">${f.name}</a>
          <span style="color: #78716c;"> — ${f.count} open positions</span>
        </p>`).join("")}
      </td>
    </tr>

    ${content.marketTrends.length > 0 ? `
    ${sectionHeader("Market Trends", "📈")}
    ${content.marketTrends.map(m => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1917;">${m.headline}</p>
        <p style="margin: 0; font-size: 13px; color: #44403c; line-height: 1.5;">${m.summary}</p>
      </td>
    </tr>`).join("")}
    ` : ""}

    <!-- Tool Spotlight -->
    ${sectionHeader("Free Tool Spotlight", "🛠️")}
    <tr>
      <td style="padding: 8px 0 16px;">
        <div style="background: ${TEAL_LIGHT}; border: 1px solid ${TEAL_BORDER}; border-radius: 8px; padding: 16px;">
          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 700; color: ${TEAL};">${content.toolSpotlight.name}</p>
          <p style="margin: 0 0 12px; font-size: 13px; color: #44403c; line-height: 1.5;">${content.toolSpotlight.description}</p>
          <a href="${content.toolSpotlight.url}" style="display: inline-block; background: ${TEAL}; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
            Try It Free →
          </a>
        </div>
      </td>
    </tr>

    ${content.careerTips.length > 0 ? `
    ${sectionHeader("Career Tips", "💡")}
    ${content.careerTips.map(tip => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #f5f5f4;">
        <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #1c1917;">${tip.title}</p>
        <p style="margin: 0; font-size: 13px; color: #44403c; line-height: 1.5;">${tip.body}</p>
      </td>
    </tr>`).join("")}
    ` : ""}
  </table>

  <!-- Featured Post -->
  ${content.featuredPost ? `
  <div style="background: #F5F5F4; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-size: 12px; color: #78716C; text-transform: uppercase; letter-spacing: 0.5px;">From the Blog</p>
    <p style="margin: 8px 0 4px; font-size: 16px; font-weight: 700; color: #1c1917;">${content.featuredPost.title}</p>
    <p style="margin: 0 0 12px; font-size: 13px; color: #44403c; line-height: 1.5;">${content.featuredPost.excerpt}</p>
    <a href="${content.featuredPost.url}" style="color: ${TEAL}; font-size: 13px; font-weight: 600; text-decoration: none;">
      Read More →
    </a>
  </div>
  ` : ""}

  <!-- CTA -->
  <div style="text-align: center; margin: 32px 0;">
    <a href="${SITE}/jobs" style="display: inline-block; background: ${TEAL}; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
      Browse All FQHC Jobs →
    </a>
  </div>

  ${emailFooter(false)}
  ${unsubscribeLink(unsubscribeToken)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  The Pulse — Subject Line Generator                                 */
/* ------------------------------------------------------------------ */

export function pulseSubject(content: PulseContent): string {
  return `The Pulse #${content.issueNumber}: ${content.jobHighlights.totalJobs} FQHC Jobs (+${content.jobHighlights.newThisWeek} new)`;
}
