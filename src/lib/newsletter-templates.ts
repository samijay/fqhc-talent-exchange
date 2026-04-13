/* ------------------------------------------------------------------ */
/*  Newsletter Email Templates — Intel Brief + The Pulse               */
/*  Uses the shared email design system from email-helpers.ts          */
/* ------------------------------------------------------------------ */

import {
  emailHeader,
  emailFooter,
  sectionDivider,
  impactBadge,
  sourceLink,
  statCard,
  ctaButton,
  BRAND,
} from "@/lib/email-helpers";

const SITE = "https://www.fqhctalent.com";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NewsItem {
  headline: string;
  summary: string;
  sourceUrl: string;
  sourceOrg: string;
  impactLevel?: "critical" | "high" | "medium";
}

export interface IntelBriefContent {
  issueNumber: number;
  date: string;
  executiveSummary: string;

  /* --- NEW: Good / Bad news split --- */
  badNews?: NewsItem[];
  goodNews?: NewsItem[];

  /* --- NEW: Success story + toolkit --- */
  successStory?: {
    org: string;
    title: string;
    summary: string;
    result: string;
    sourceUrl?: string;
  };
  toolkit?: {
    title: string;
    description: string;
    url: string;
  };

  /* --- Legacy section-based layout (Issues #1-2) --- */
  policyUpdates: NewsItem[];
  fundingAlerts: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
  }[];
  workforceUpdates: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
  }[];
  laborUpdates?: {
    headline: string;
    summary: string;
    sourceUrl: string;
    sourceOrg: string;
  }[];
  aiUpdates: {
    headline: string;
    summary: string;
    sourceUrl: string;
  }[];

  keyDates: {
    date: string;
    event: string;
  }[];
  featuredContent: {
    title: string;
    description: string;
    url: string;
  };
  watchingNextWeek?: {
    item: string;
    why: string;
  }[];
  movementTrivia?: {
    fact: string;
    source?: string;
  };
}

export interface PulseContent {
  issueNumber: number;
  date: string;
  summary: string;
  jobHighlights: {
    totalJobs: number;
    newThisWeek: number;
    topFQHCs: { name: string; count: number; url: string }[];
  };
  marketTrends: {
    headline: string;
    summary: string;
  }[];
  toolSpotlight: {
    name: string;
    description: string;
    url: string;
  };
  careerTips: {
    title: string;
    body: string;
  }[];
  featuredPost: {
    title: string;
    excerpt: string;
    url: string;
  };
  successStory?: {
    org: string;
    headline: string;
    summary: string;
    sourceUrl?: string;
  };
  watchingNextWeek?: {
    item: string;
    why: string;
  }[];
  movementTrivia?: {
    fact: string;
    source?: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Shared blocks                                                      */
/* ------------------------------------------------------------------ */

function watchingNextWeekHtml(items: { item: string; why: string }[]): string {
  if (!items || items.length === 0) return "";
  return `
  <div style="background: ${BRAND.tealLight}; border: 1px solid ${BRAND.tealBorder}; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0 0 10px; font-size: 12px; font-weight: 700; color: ${BRAND.teal}; text-transform: uppercase; letter-spacing: 0.5px;">
      What We're Watching Next Week
    </p>
    ${items.map(i => `
    <div style="margin-bottom: 8px;">
      <p style="margin: 0; font-size: 13px; font-weight: 600; color: ${BRAND.stone900};">${i.item}</p>
      <p style="margin: 2px 0 0; font-size: 12px; color: ${BRAND.stone500}; line-height: 1.5;">${i.why}</p>
    </div>`).join("")}
  </div>`;
}

function movementTriviaHtml(trivia?: { fact: string; source?: string }): string {
  if (!trivia) return "";
  return `
  <div style="background: ${BRAND.amberBg}; border: 1px solid ${BRAND.amberBorder}; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; color: #92400E; text-transform: uppercase; letter-spacing: 0.8px;">
      \u2764\ufe0f From the Movement
    </p>
    <p style="margin: 0; font-size: 14px; color: ${BRAND.stone900}; line-height: 1.6; font-style: italic;">
      ${trivia.fact}
    </p>
    ${trivia.source ? `<p style="margin: 6px 0 0; font-size: 11px; color: ${BRAND.stone500};">\u2014 ${trivia.source}</p>` : ""}
  </div>`;
}

function successStoryHtml(story: { org: string; title: string; summary: string; result: string; sourceUrl?: string }): string {
  return `
  <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 18px; margin: 24px 0;">
    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #065F46; text-transform: uppercase; letter-spacing: 0.8px;">
      \u2728 Success Story
    </p>
    <p style="margin: 6px 0 2px; font-size: 16px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${story.title}</p>
    <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #065F46;">${story.org}</p>
    <p style="margin: 0 0 10px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${story.summary}</p>
    <div style="background: white; border-radius: 6px; padding: 10px 14px; border-left: 3px solid #10B981;">
      <p style="margin: 0; font-size: 13px; font-weight: 600; color: #065F46;">\u2192 Result: ${story.result}</p>
    </div>
    ${story.sourceUrl ? `<p style="margin: 8px 0 0; font-size: 11px;"><a href="${story.sourceUrl}" style="color: #065F46;">Read full story \u2192</a></p>` : ""}
  </div>`;
}

function toolkitHtml(toolkit: { title: string; description: string; url: string }): string {
  return `
  <div style="background: ${BRAND.stone100}; border: 1px solid ${BRAND.stone300}; border-radius: 8px; padding: 18px; margin: 24px 0;">
    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: ${BRAND.teal}; text-transform: uppercase; letter-spacing: 0.8px;">
      \ud83d\udee0\ufe0f Toolkit
    </p>
    <p style="margin: 6px 0 4px; font-size: 16px; font-weight: 700; color: ${BRAND.stone900};">${toolkit.title}</p>
    <p style="margin: 0 0 12px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${toolkit.description}</p>
    ${ctaButton("Get the Toolkit \u2192", toolkit.url)}
  </div>`;
}

function newsItemHtml(item: NewsItem, color: string): string {
  return `
  <tr>
    <td style="padding: 8px 0 12px; border-bottom: 1px solid #F5F5F4;">
      <div style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color}; margin-right: 6px; vertical-align: middle;"></div>
      <span style="font-size: 14px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35; vertical-align: middle;">${item.headline}</span>
      <p style="margin: 4px 0 6px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${item.summary}</p>
      ${sourceLink(item.sourceUrl, item.sourceOrg)}
    </td>
  </tr>`;
}

/* ------------------------------------------------------------------ */
/*  Intel Brief Template                                               */
/* ------------------------------------------------------------------ */

export function intelBriefHtml(
  content: IntelBriefContent,
  unsubscribeToken: string,
  isEs: boolean = false,
): string {
  // Decide layout: new (good/bad split) vs. legacy (sections)
  const useNewLayout = (content.badNews && content.badNews.length > 0) ||
                       (content.goodNews && content.goodNews.length > 0);

  const newLayoutHtml = useNewLayout ? `
  <table style="width: 100%; border-collapse: collapse;">
    ${content.badNews && content.badNews.length > 0 ? `
    ${sectionDivider(isEs ? "Lo que Preocupa" : "The Hard Truth")}
    ${content.badNews.map(item => newsItemHtml(item, "#EF4444")).join("")}
    ` : ""}

    ${content.goodNews && content.goodNews.length > 0 ? `
    ${sectionDivider(isEs ? "Las Buenas Noticias" : "The Bright Spots")}
    ${content.goodNews.map(item => newsItemHtml(item, "#10B981")).join("")}
    ` : ""}
  </table>

  ${content.successStory ? successStoryHtml(content.successStory) : ""}
  ${content.toolkit ? toolkitHtml(content.toolkit) : ""}
  ` : "";

  const legacyLayoutHtml = !useNewLayout ? `
  <table style="width: 100%; border-collapse: collapse;">
    ${content.policyUpdates.length > 0 ? `
    ${sectionDivider(isEs ? "Pol\u00edtica y Legislaci\u00f3n" : "Policy & Legislative")}
    ${content.policyUpdates.map(p => `
    <tr>
      <td style="padding: 10px 0 14px; border-bottom: 1px solid #F5F5F4;">
        <div style="margin-bottom: 6px;">${impactBadge(p.impactLevel ?? "medium")}</div>
        <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${p.headline}</p>
        <p style="margin: 4px 0 8px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${p.summary}</p>
        ${sourceLink(p.sourceUrl, p.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.fundingAlerts.length > 0 ? `
    ${sectionDivider(isEs ? "Financiamiento" : "Funding & Financial")}
    ${content.fundingAlerts.map(f => `
    <tr>
      <td style="padding: 10px 0 14px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${f.headline}</p>
        <p style="margin: 4px 0 8px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${f.summary}</p>
        ${sourceLink(f.sourceUrl, f.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.workforceUpdates.length > 0 ? `
    ${sectionDivider(isEs ? "Fuerza Laboral" : "Workforce & Layoffs")}
    ${content.workforceUpdates.map(w => `
    <tr>
      <td style="padding: 10px 0 14px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${w.headline}</p>
        <p style="margin: 4px 0 8px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${w.summary}</p>
        ${sourceLink(w.sourceUrl, w.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${(content.laborUpdates ?? []).length > 0 ? `
    ${sectionDivider(isEs ? "Trabajo y Sindicatos" : "Labor & Union Watch")}
    ${(content.laborUpdates ?? []).map(l => `
    <tr>
      <td style="padding: 10px 0 14px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${l.headline}</p>
        <p style="margin: 4px 0 8px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${l.summary}</p>
        ${sourceLink(l.sourceUrl, l.sourceOrg)}
      </td>
    </tr>`).join("")}
    ` : ""}

    ${content.aiUpdates.length > 0 ? `
    ${sectionDivider(isEs ? "IA y Tecnolog\u00eda" : "AI & Technology")}
    ${content.aiUpdates.map(a => `
    <tr>
      <td style="padding: 10px 0 14px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${a.headline}</p>
        <p style="margin: 4px 0 8px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">${a.summary}</p>
        ${sourceLink(a.sourceUrl, "Source")}
      </td>
    </tr>`).join("")}
    ` : ""}
  </table>
  ` : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FQHC Intel Brief #${content.issueNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.stone900}; background: ${BRAND.stone50};">
  ${emailHeader()}

  <!-- Issue badge -->
  <div style="text-align: center; margin-bottom: 8px;">
    <span style="display: inline-block; background: ${BRAND.stone900}; color: white; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px;">
      INTEL BRIEF #${content.issueNumber} \u00b7 ${content.date}
    </span>
  </div>

  <h2 style="text-align: center; font-size: 22px; color: ${BRAND.stone900}; margin: 16px 0 24px; font-weight: 800;">
    ${isEs ? "Informe Ejecutivo Semanal" : "Weekly Executive Briefing"}
  </h2>

  <!-- TL;DR -->
  <div style="background: ${BRAND.tealLight}; border-left: 4px solid ${BRAND.teal}; padding: 14px 16px; margin: 0 0 24px; border-radius: 0 8px 8px 0;">
    <p style="margin: 0 0 4px; font-weight: 700; color: ${BRAND.teal}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">
      ${isEs ? "TL;DR" : "TL;DR"}
    </p>
    <p style="margin: 0; font-size: 14px; color: ${BRAND.stone900}; line-height: 1.6;">
      ${content.executiveSummary}
    </p>
  </div>

  ${newLayoutHtml}
  ${legacyLayoutHtml}

  <!-- Key Dates -->
  ${content.keyDates.length > 0 ? `
  <table style="width: 100%; border-collapse: collapse;">
    ${sectionDivider(isEs ? "Fechas Clave" : "Key Dates")}
    ${content.keyDates.map(d => `
    <tr>
      <td style="padding: 5px 0;">
        <span style="display: inline-block; background: ${BRAND.amberBg}; border: 1px solid ${BRAND.amberBorder}; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; color: #92400E; margin-right: 6px;">${d.date}</span>
        <span style="font-size: 12px; color: ${BRAND.stone700};">${d.event}</span>
      </td>
    </tr>`).join("")}
  </table>
  ` : ""}

  ${watchingNextWeekHtml(content.watchingNextWeek ?? [])}
  ${movementTriviaHtml(content.movementTrivia)}

  <!-- Featured Content -->
  ${content.featuredContent ? `
  <div style="background: ${BRAND.stone100}; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 6px; font-size: 16px; font-weight: 700; color: ${BRAND.stone900};">${content.featuredContent.title}</p>
    <p style="margin: 0 0 12px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.5;">${content.featuredContent.description}</p>
    ${ctaButton(isEs ? "Leer M\u00e1s \u2192" : "Read More \u2192", content.featuredContent.url)}
  </div>
  ` : ""}

  <div style="text-align: center; margin: 24px 0;">
    ${ctaButton(isEs ? "Ver Dashboard \u2192" : "Full Dashboard \u2192", SITE)}
  </div>

  ${emailFooter(isEs, unsubscribeToken)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Intel Brief — Subject Line                                         */
/* ------------------------------------------------------------------ */

export function intelBriefSubject(content: IntelBriefContent): string {
  const hasCritical = content.policyUpdates.some((p) => p.impactLevel === "critical") ||
                      content.badNews?.some((n) => n.impactLevel === "critical");
  const prefix = hasCritical ? "\ud83d\udd34 " : "";
  const topHeadline =
    content.badNews?.[0]?.headline ||
    content.policyUpdates[0]?.headline ||
    content.fundingAlerts[0]?.headline ||
    "This Week in FQHC";
  return `${prefix}Intel Brief #${content.issueNumber}: ${topHeadline}`;
}

/* ------------------------------------------------------------------ */
/*  The Pulse Template                                                 */
/* ------------------------------------------------------------------ */

export function pulseHtml(
  content: PulseContent,
  unsubscribeToken: string,
  isEs: boolean = false,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Pulse #${content.issueNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: ${BRAND.stone900}; background: ${BRAND.stone50};">
  ${emailHeader()}

  <div style="text-align: center; margin-bottom: 8px;">
    <span style="display: inline-block; background: ${BRAND.teal}; color: white; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px;">
      THE PULSE #${content.issueNumber} \u00b7 ${content.date}
    </span>
  </div>

  <h2 style="text-align: center; font-size: 22px; color: ${BRAND.stone900}; margin: 16px 0 24px; font-weight: 800;">
    ${isEs ? "Tu Actualizaci\u00f3n Semanal" : "Your Weekly FQHC Career Update"}
  </h2>

  <div style="background: ${BRAND.tealLight}; border-left: 4px solid ${BRAND.teal}; padding: 14px 16px; margin: 0 0 24px; border-radius: 0 8px 8px 0;">
    <p style="margin: 0; font-size: 14px; color: ${BRAND.stone900}; line-height: 1.6;">
      ${content.summary}
    </p>
  </div>

  <table style="width: 100%; border-collapse: collapse;">
    ${sectionDivider(isEs ? "Mercado Laboral" : "Job Market This Week")}
    <tr>
      <td style="padding: 10px 0 16px;">
        <table style="width: 100%; text-align: center; background: ${BRAND.stone100}; border-radius: 8px;">
          <tr>
            ${statCard(content.jobHighlights.totalJobs.toLocaleString(), isEs ? "Empleos" : "Total Jobs", BRAND.teal)}
            ${statCard(`+${content.jobHighlights.newThisWeek}`, isEs ? "Nuevos" : "New This Week", BRAND.green)}
          </tr>
        </table>
        <p style="margin: 14px 0 6px; font-size: 13px; font-weight: 700; color: ${BRAND.stone700};">
          ${isEs ? "FQHCs Contratando:" : "Top Hiring FQHCs:"}
        </p>
        ${content.jobHighlights.topFQHCs.map(f => `
        <p style="margin: 5px 0; font-size: 13px;">
          <a href="${f.url}" style="color: ${BRAND.teal}; text-decoration: none; font-weight: 600;">${f.name}</a>
          <span style="color: ${BRAND.stone500};"> \u2014 ${f.count} open</span>
        </p>`).join("")}
      </td>
    </tr>

    ${content.marketTrends.length > 0 ? `
    ${sectionDivider(isEs ? "Tendencias" : "What's Happening")}
    ${content.marketTrends.map(m => `
    <tr>
      <td style="padding: 8px 0 12px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 3px; font-size: 14px; font-weight: 700; color: ${BRAND.stone900}; line-height: 1.35;">${m.headline}</p>
        <p style="margin: 0; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${m.summary}</p>
      </td>
    </tr>`).join("")}
    ` : ""}
  </table>

  ${content.successStory ? `
  <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #065F46; text-transform: uppercase; letter-spacing: 0.8px;">
      \u2728 Success Story
    </p>
    <p style="margin: 4px 0 2px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900};">${content.successStory.headline}</p>
    <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #065F46;">${content.successStory.org}</p>
    <p style="margin: 0; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${content.successStory.summary}</p>
    ${content.successStory.sourceUrl ? `<p style="margin: 6px 0 0; font-size: 11px;"><a href="${content.successStory.sourceUrl}" style="color: #065F46;">Read more \u2192</a></p>` : ""}
  </div>
  ` : ""}

  <!-- Tool Spotlight -->
  <table style="width: 100%; border-collapse: collapse;">
    ${sectionDivider(isEs ? "Herramienta Gratuita" : "Free Tool")}
    <tr>
      <td style="padding: 10px 0 16px;">
        <div style="background: ${BRAND.tealLight}; border: 1px solid ${BRAND.tealBorder}; border-radius: 8px; padding: 14px;">
          <p style="margin: 0 0 3px; font-size: 15px; font-weight: 700; color: ${BRAND.teal};">${content.toolSpotlight.name}</p>
          <p style="margin: 0 0 10px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${content.toolSpotlight.description}</p>
          ${ctaButton(isEs ? "Probar Gratis \u2192" : "Try It Free \u2192", content.toolSpotlight.url)}
        </div>
      </td>
    </tr>

    ${content.careerTips.length > 0 ? `
    ${sectionDivider(isEs ? "Consejos" : "Quick Tips")}
    ${content.careerTips.map(tip => `
    <tr>
      <td style="padding: 6px 0 10px; border-bottom: 1px solid #F5F5F4;">
        <p style="margin: 0 0 2px; font-size: 14px; font-weight: 700; color: ${BRAND.stone900};">${tip.title}</p>
        <p style="margin: 0; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${tip.body}</p>
      </td>
    </tr>`).join("")}
    ` : ""}
  </table>

  ${watchingNextWeekHtml(content.watchingNextWeek ?? [])}
  ${movementTriviaHtml(content.movementTrivia)}

  ${content.featuredPost ? `
  <div style="background: ${BRAND.stone100}; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0 0 4px; font-size: 15px; font-weight: 700; color: ${BRAND.stone900};">${content.featuredPost.title}</p>
    <p style="margin: 0 0 10px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.55;">${content.featuredPost.excerpt}</p>
    <a href="${content.featuredPost.url}" style="color: ${BRAND.teal}; font-size: 13px; font-weight: 600; text-decoration: none;">
      ${isEs ? "Leer M\u00e1s \u2192" : "Read More \u2192"}
    </a>
  </div>
  ` : ""}

  <div style="text-align: center; margin: 24px 0;">
    ${ctaButton(isEs ? "Ver Empleos \u2192" : "Browse All FQHC Jobs \u2192", `${SITE}/jobs`)}
  </div>

  ${emailFooter(isEs, unsubscribeToken)}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  The Pulse — Subject Line                                           */
/* ------------------------------------------------------------------ */

export function pulseSubject(content: PulseContent): string {
  return `The Pulse #${content.issueNumber}: ${content.jobHighlights.totalJobs.toLocaleString()} FQHC Jobs (+${content.jobHighlights.newThisWeek} new)`;
}
