/* ------------------------------------------------------------------ */
/*  CTA-specific email helpers (archived)                              */
/*  Extracted from src/lib/email-helpers.ts                            */
/*  These were used by the CTA email templates in emails.ts            */
/* ------------------------------------------------------------------ */

const SITE = "https://www.fqhctalent.com";
const TEAL = "#0F766E";
const TEAL_LIGHT = "#F0FDFA";

/* ------------------------------------------------------------------ */
/*  Resource Links                                                     */
/* ------------------------------------------------------------------ */

export function candidateResourceLinks(isEs: boolean): string {
  const prefix = isEs ? "es/" : "";
  const links = [
    {
      url: `${SITE}/${prefix}career-insights`,
      label: isEs ? "Evaluación Profesional" : "Career Assessment",
      desc: isEs ? "Evalúa tu preparación para roles FQHC" : "Assess your readiness for FQHC roles",
    },
    {
      url: `${SITE}/${prefix}resume-builder`,
      label: isEs ? "Constructor de CV" : "Resume Builder",
      desc: isEs ? "Crea un CV optimizado para FQHCs gratis" : "Build a free FQHC-optimized resume",
    },
    {
      url: `${SITE}/${prefix}jobs`,
      label: isEs ? "Empleos FQHC" : "FQHC Jobs",
      desc: isEs ? "Explora 177+ posiciones en California" : "Browse 177+ positions across California",
    },
    {
      url: `${SITE}/${prefix}career-roadmap`,
      label: isEs ? "Trayectoria Profesional" : "Career Roadmap",
      desc: isEs ? "Explora 5 trayectorias profesionales con datos salariales" : "Explore 5 career tracks with salary data",
    },
  ];

  return `
  <div style="margin: 24px 0;">
    <p style="font-weight: 700; color: #1c1917; font-size: 14px; margin: 0 0 12px;">
      ${isEs ? "📚 Recursos Para Ti" : "📚 Resources For You"}
    </p>
    <table style="width: 100%; border-collapse: collapse;">
      ${links.map(link => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f4;">
            <a href="${link.url}" style="color: ${TEAL}; font-weight: 600; text-decoration: none; font-size: 14px;">${link.label}</a>
            <br /><span style="color: #78716c; font-size: 12px;">${link.desc}</span>
          </td>
        </tr>
      `).join("")}
    </table>
  </div>`;
}

export function employerResourceLinks(isEs: boolean): string {
  const prefix = isEs ? "es/" : "";
  const links = [
    {
      url: `${SITE}/${prefix}insights`,
      label: isEs ? "Inteligencia de Mercado" : "Market Insights",
      desc: isEs ? "Datos salariales, demanda por rol y regiones" : "Salary data, role demand, and regional snapshots",
    },
    {
      url: `${SITE}/${prefix}demo`,
      label: isEs ? "Demo Interactivo" : "Interactive Demo",
      desc: isEs ? "Recorrido del producto de 9 secciones" : "9-section product walkthrough",
    },
    {
      url: `${SITE}/${prefix}team-readiness`,
      label: isEs ? "Preparación del Equipo" : "Team Readiness",
      desc: isEs ? "Evalúa la preparación de tu equipo de liderazgo" : "Assess your leadership team's readiness",
    },
    {
      url: `${SITE}/${prefix}the-drop`,
      label: "The Drop",
      desc: isEs ? "Recibe lotes curados de candidatos pre-evaluados" : "Receive curated batches of pre-assessed candidates",
    },
  ];

  return `
  <div style="margin: 24px 0;">
    <p style="font-weight: 700; color: #1c1917; font-size: 14px; margin: 0 0 12px;">
      ${isEs ? "📊 Recursos Para Empleadores" : "📊 Employer Resources"}
    </p>
    <table style="width: 100%; border-collapse: collapse;">
      ${links.map(link => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f5f5f4;">
            <a href="${link.url}" style="color: ${TEAL}; font-weight: 600; text-decoration: none; font-size: 14px;">${link.label}</a>
            <br /><span style="color: #78716c; font-size: 12px;">${link.desc}</span>
          </td>
        </tr>
      `).join("")}
    </table>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Drop Teaser (for candidate emails)                                 */
/* ------------------------------------------------------------------ */

export function dropTeaser(isEs: boolean): string {
  const prefix = isEs ? "es/" : "";
  return `
  <div style="background: linear-gradient(135deg, ${TEAL_LIGHT}, #F5F3FF); border: 1px solid #DDD6FE; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: ${TEAL}; font-size: 14px;">
      ⚡ ${isEs ? "¿Conoces The Drop?" : "Have You Heard About The Drop?"}
    </p>
    <p style="margin: 8px 0; font-size: 13px; color: #44403c; line-height: 1.6;">
      ${isEs
        ? "Toma nuestra evaluación conductual y puntúa ≥60% para calificar para The Drop — nuestro programa exclusivo de matching que conecta candidatos pre-evaluados con FQHCs en lotes curados."
        : "Take our behavioral assessment and score ≥60% to qualify for The Drop — our exclusive matching program that connects pre-assessed candidates with FQHCs in curated batches."
      }
    </p>
    <a href="${SITE}/${prefix}career-insights" style="display: inline-block; background: ${TEAL}; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 4px;">
      ${isEs ? "Tomar la Evaluación" : "Take the Assessment"} →
    </a>
  </div>`;
}
