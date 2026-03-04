/* ------------------------------------------------------------------ */
/*  Shared email helpers for FQHC Talent                     */
/*  Reusable blocks: mission banner, market snapshot, header/footer   */
/* ------------------------------------------------------------------ */

const SITE = "https://www.fqhctalent.com";
const TEAL = "#0F766E";
const TEAL_LIGHT = "#F0FDFA";
const TEAL_BORDER = "#99F6E4";

/* ------------------------------------------------------------------ */
/*  Mission Banner                                                     */
/* ------------------------------------------------------------------ */

export function missionBanner(isEs: boolean): string {
  return `
  <div style="background: ${TEAL_LIGHT}; border: 1px solid ${TEAL_BORDER}; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; font-weight: 700; color: ${TEAL}; font-size: 14px;">
      ${isEs ? "Nuestra Misión" : "Our Mission"}
    </p>
    <p style="margin: 8px 0 0; font-size: 13px; color: #44403c; line-height: 1.6;">
      ${isEs
        ? "Fortalecer la fuerza laboral de salud comunitaria de California conectando profesionales comprometidos con la misión con FQHCs — más rápido, más inteligente y con el ajuste cultural que importa."
        : "Strengthen California's safety-net workforce by connecting mission-driven health professionals with FQHCs — faster, smarter, and with the cultural fit that matters."
      }
    </p>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Market Snapshot                                                     */
/* ------------------------------------------------------------------ */

export function marketSnapshotHtml(isEs: boolean): string {
  // Static snapshot — updated when data changes
  const stats = [
    { value: "177+", label: isEs ? "Empleos FQHC" : "FQHC Jobs" },
    { value: "220", label: isEs ? "FQHCs en California" : "FQHCs in California" },
    { value: "$55K", label: isEs ? "Salario Promedio" : "Avg Salary" },
    { value: "9", label: isEs ? "Regiones" : "Regions" },
  ];

  return `
  <div style="background: #f5f5f4; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <p style="font-weight: 700; color: #1c1917; font-size: 14px; margin: 0 0 12px; text-align: center;">
      ${isEs ? "📈 Panorama del Mercado" : "📈 Market Snapshot"}
    </p>
    <table style="width: 100%; text-align: center;">
      <tr>
        ${stats.map(s => `
          <td style="padding: 8px;">
            <p style="font-size: 20px; font-weight: 800; color: ${TEAL}; margin: 0;">${s.value}</p>
            <p style="font-size: 11px; color: #78716c; margin: 4px 0 0;">${s.label}</p>
          </td>
        `).join("")}
      </tr>
    </table>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Email Header                                                       */
/* ------------------------------------------------------------------ */

export function emailHeader(): string {
  return `
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: ${TEAL}; font-size: 24px; margin: 0;">FQHC Talent</h1>
  </div>`;
}

/* ------------------------------------------------------------------ */
/*  Email Footer                                                       */
/* ------------------------------------------------------------------ */

export function emailFooter(isEs: boolean): string {
  return `
  <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
  <p style="font-size: 13px; color: #a8a29e; text-align: center;">
    ${isEs
      ? "FQHC Talent — La única plataforma de talento creada exclusivamente para centros de salud comunitarios."
      : "FQHC Talent — The only talent platform built exclusively for community health centers."}<br />
    <a href="${SITE}" style="color: ${TEAL};">fqhctalent.com</a>
  </p>
  <p style="font-size: 11px; color: #a8a29e; text-align: center; margin-top: 16px;">
    ${isEs
      ? 'Si no deseas recibir más correos, responde con "cancelar suscripción" y te eliminaremos de nuestra lista.'
      : 'If you no longer wish to receive these emails, reply with "unsubscribe" and we will remove you from our list.'}<br />
    FQHC Talent · California, USA
  </p>`;
}
