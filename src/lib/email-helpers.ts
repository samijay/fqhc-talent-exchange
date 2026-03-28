/* ------------------------------------------------------------------ */
/*  Email Design System — FQHC Talent Exchange                        */
/*  Shared building blocks for all emails: newsletters, drips, etc.   */
/*  All emails use inline styles for maximum email client compat.     */
/* ------------------------------------------------------------------ */

const SITE = "https://www.fqhctalent.com";

/* ------------------------------------------------------------------ */
/*  Brand Tokens                                                       */
/* ------------------------------------------------------------------ */

export const BRAND = {
  teal:       "#0F766E",
  tealLight:  "#F0FDFA",
  tealBorder: "#99F6E4",
  tealDark:   "#115E59",
  amber:      "#F59E0B",
  amberBg:    "#FFFBEB",
  amberBorder:"#FDE68A",
  red:        "#B91C1C",
  redBg:      "#FEF2F2",
  green:      "#15803D",
  stone900:   "#1C1917",
  stone700:   "#44403C",
  stone500:   "#78716C",
  stone300:   "#D6D3D1",
  stone100:   "#F5F5F4",
  stone50:    "#FAFAF9",
} as const;

/* ------------------------------------------------------------------ */
/*  Email Header — Branded banner for ALL emails                       */
/* ------------------------------------------------------------------ */

export function emailHeader(): string {
  return `
  <div style="background: linear-gradient(135deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%); border-radius: 12px; padding: 24px; margin-bottom: 28px; text-align: center;">
    <h1 style="color: white; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.3px;">
      FQHC Talent <span style="color: ${BRAND.amber};">\u2665</span>
    </h1>
    <p style="color: ${BRAND.tealBorder}; font-size: 12px; margin: 6px 0 0 0; letter-spacing: 0.5px; text-transform: uppercase;">
      California's FQHC Strategic Monitor
    </p>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Email Footer — Unified footer for ALL emails                       */
/*  Consolidates the old emailFooter + unsubscribeLink + dripFooter   */
/* ------------------------------------------------------------------ */

export function emailFooter(
  isEs: boolean,
  unsubscribeToken?: string,
): string {
  const unsubUrl = unsubscribeToken
    ? `${SITE}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
    : null;

  return `
  <!-- Forward CTA -->
  <div style="background: ${BRAND.tealLight}; border: 1px solid ${BRAND.tealBorder}; border-radius: 8px; padding: 14px; margin: 32px 0 20px; text-align: center;">
    <p style="margin: 0; font-size: 14px; color: ${BRAND.teal};">
      ${isEs ? "\u00bfTe result\u00f3 \u00fatil?" : "Found this useful?"}
      <a href="${SITE}/newsletter" style="color: ${BRAND.teal}; text-decoration: underline; font-weight: 600; margin-left: 4px;">
        ${isEs ? "Reenv\u00eda a un colega \u2192" : "Forward to a colleague \u2192"}
      </a>
    </p>
  </div>

  <hr style="border: none; border-top: 1px solid #E7E5E4; margin: 20px 0;" />

  <!-- Links -->
  <p style="font-size: 11px; color: ${BRAND.stone500}; text-align: center; line-height: 1.8; margin: 0;">
    ${unsubUrl ? `<a href="${unsubUrl}" style="color: ${BRAND.stone500}; text-decoration: underline;">
      ${isEs ? "Cancelar suscripci\u00f3n" : "Unsubscribe"}
    </a> \u00b7 ` : ""}
    <a href="${SITE}/newsletter" style="color: ${BRAND.stone500}; text-decoration: underline;">
      ${isEs ? "Preferencias" : "Manage preferences"}
    </a> \u00b7
    <a href="${SITE}" style="color: ${BRAND.stone500}; text-decoration: underline;">fqhctalent.com</a>
  </p>

  <!-- Legal -->
  <p style="font-size: 10px; color: #A8A29E; text-align: center; margin: 12px 0 0 0; line-height: 1.6;">
    FQHC Talent \u00b7 Los Angeles, CA \u00b7
    <a href="${SITE}/privacy" style="color: #A8A29E; text-decoration: underline;">
      ${isEs ? "Pol\u00edtica de Privacidad" : "Privacy Policy"}
    </a><br />
    ${isEs
      ? "El contenido es solo para fines informativos y no constituye asesoramiento profesional."
      : "Content is for informational purposes only and does not constitute professional advice."}
  </p>`;
}

/* ------------------------------------------------------------------ */
/*  Section Divider — Replaces emoji-based section headers             */
/* ------------------------------------------------------------------ */

export function sectionDivider(title: string): string {
  return `
  <tr>
    <td style="padding: 28px 0 10px;">
      <div style="border-left: 3px solid ${BRAND.teal}; padding-left: 10px;">
        <p style="margin: 0; font-size: 12px; font-weight: 700; color: ${BRAND.teal}; text-transform: uppercase; letter-spacing: 0.8px;">
          ${title}
        </p>
      </div>
    </td>
  </tr>`;
}

/* ------------------------------------------------------------------ */
/*  Impact Badge — CRITICAL / HIGH / MEDIUM                            */
/* ------------------------------------------------------------------ */

export function impactBadge(level: "critical" | "high" | "medium"): string {
  const styles: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    critical: { bg: BRAND.redBg, color: BRAND.red, dot: BRAND.red, label: "CRITICAL" },
    high:     { bg: BRAND.amberBg, color: "#92400E", dot: BRAND.amber, label: "HIGH" },
    medium:   { bg: BRAND.stone100, color: BRAND.stone500, dot: BRAND.stone500, label: "MEDIUM" },
  };
  const s = styles[level];
  return `<span style="display: inline-block; background: ${s.bg}; color: ${s.color}; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 4px;">
    <span style="display: inline-block; width: 6px; height: 6px; background: ${s.dot}; border-radius: 50%; margin-right: 4px; vertical-align: middle;"></span>${s.label}
  </span>`;
}

/* ------------------------------------------------------------------ */
/*  Source Link                                                        */
/* ------------------------------------------------------------------ */

export function sourceLink(url: string, org: string): string {
  return `<a href="${url}" style="color: ${BRAND.teal}; font-size: 12px; text-decoration: none; font-weight: 500;">Source: ${org} \u2192</a>`;
}

/* ------------------------------------------------------------------ */
/*  Stat Card — Reusable stat block for job counts, impact numbers     */
/* ------------------------------------------------------------------ */

export function statCard(value: string, label: string, color?: string): string {
  return `
  <td style="padding: 12px; text-align: center;">
    <p style="font-size: 26px; font-weight: 800; color: ${color || BRAND.teal}; margin: 0; line-height: 1;">${value}</p>
    <p style="font-size: 11px; color: ${BRAND.stone500}; margin: 4px 0 0;">${label}</p>
  </td>`;
}

/* ------------------------------------------------------------------ */
/*  CTA Button                                                         */
/* ------------------------------------------------------------------ */

export function ctaButton(
  text: string,
  url: string,
  variant: "primary" | "secondary" = "primary",
): string {
  const styles = variant === "primary"
    ? `background: ${BRAND.teal}; color: white; border: none;`
    : `background: ${BRAND.stone100}; color: ${BRAND.teal}; border: 1px solid ${BRAND.teal};`;
  return `<a href="${url}" style="display: inline-block; ${styles} padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; margin: 4px;">${text}</a>`;
}

/* ------------------------------------------------------------------ */
/*  Market Snapshot (for newsletters / landing page emails)            */
/* ------------------------------------------------------------------ */

export function marketSnapshotHtml(isEs: boolean): string {
  const stats = [
    { value: "1,674+", label: isEs ? "Empleos FQHC" : "FQHC Jobs" },
    { value: "220", label: isEs ? "FQHCs en California" : "FQHCs in California" },
    { value: "$55K", label: isEs ? "Salario Promedio" : "Avg Salary" },
    { value: "9", label: isEs ? "Regiones" : "Regions" },
  ];

  return `
  <div style="background: ${BRAND.stone100}; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="font-weight: 700; color: ${BRAND.stone900}; font-size: 14px; margin: 0 0 12px; text-align: center;">
      ${isEs ? "Panorama del Mercado" : "Market Snapshot"}
    </p>
    <table style="width: 100%; text-align: center;">
      <tr>
        ${stats.map(s => statCard(s.value, s.label)).join("")}
      </tr>
    </table>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Mission Banner (used in confirmation / onboarding emails)          */
/* ------------------------------------------------------------------ */

export function missionBanner(isEs: boolean): string {
  return `
  <div style="background: ${BRAND.tealLight}; border: 1px solid ${BRAND.tealBorder}; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: ${BRAND.teal}; font-size: 14px;">
      ${isEs ? "Nuestra Misi\u00f3n" : "Our Mission"}
    </p>
    <p style="margin: 8px 0 0; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.6;">
      ${isEs
        ? "Fortalecer la fuerza laboral de salud comunitaria de California conectando profesionales comprometidos con la misi\u00f3n con FQHCs \u2014 m\u00e1s r\u00e1pido, m\u00e1s inteligente y con el ajuste cultural que importa."
        : "Strengthen California\u2019s safety-net workforce by connecting mission-driven health professionals with FQHCs \u2014 faster, smarter, and with the cultural fit that matters."
      }
    </p>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Academy Teaser Block (for drip emails)                             */
/* ------------------------------------------------------------------ */

export function academyTeaser(isEs: boolean): string {
  return `
  <div style="background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: #4338CA; font-size: 14px;">
      ${isEs ? "FQHC Academy \u2014 Curso Gratis por Email" : "FQHC Academy \u2014 Free Email Course"}
    </p>
    <p style="margin: 6px 0 10px; font-size: 13px; color: ${BRAND.stone700}; line-height: 1.5;">
      ${isEs
        ? "15 lecciones por email en 30 d\u00edas \u2014 PPS, facturaci\u00f3n, flujo de trabajo cl\u00ednico y m\u00e1s. Cada lecci\u00f3n incluye un mini quiz. Bil\u00fcnge."
        : "15 bite-size email lessons over 30 days \u2014 PPS billing, same-day rules, clinical workflows, and more. Each includes a mini quiz. Bilingual."}
    </p>
    <a href="${SITE}/academy" style="display: inline-block; background: #4338CA; color: white; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
      ${isEs ? "Comenzar Curso Gratis \u2192" : "Start Free Course \u2192"}
    </a>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Dashboard Login CTA (for tracking progress across tools)           */
/* ------------------------------------------------------------------ */

export function dashboardLoginCta(isEs: boolean): string {
  return `
  <div style="background: ${BRAND.stone100}; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: ${BRAND.stone900};">
      ${isEs ? "Tu panel personalizado" : "Your personalized dashboard"}
    </p>
    <p style="margin: 0 0 12px; font-size: 13px; color: ${BRAND.stone500};">
      ${isEs
        ? "Guardamos tu evaluaci\u00f3n profesional, cur\u00edculum, y progreso del curso en un solo lugar."
        : "We save your career assessment, resume progress, and course completion in one place."}
    </p>
    <a href="${SITE}/dashboard" style="display: inline-block; background: ${BRAND.stone900}; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
      ${isEs ? "Ir a Mi Panel \u2192" : "Go to My Dashboard \u2192"}
    </a>
  </div>`;
}
