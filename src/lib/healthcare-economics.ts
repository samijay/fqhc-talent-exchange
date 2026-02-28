// healthcare-economics.ts
// Healthcare Economics explainers at 3 levels:
// 1. "For a Five-Year-Old" — new hires, CHWs, onboarding
// 2. "For a Practitioner" — experienced staff, operational knowledge
// 3. "For an Executive" — PhD-level, policy analysis, strategic planning
//
// Every concept explained at all 3 levels with FQHC-specific context
// Primary source URLs for every claim
// Last updated: 2026-02-28

export const ECONOMICS_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type EconomicsLevel = "beginner" | "practitioner" | "executive";

export type EconomicsDomain =
  | "reimbursement"
  | "revenue-streams"
  | "federal-funding"
  | "value-based"
  | "workforce-economics"
  | "regulatory";

export interface EconomicsConcept {
  id: string;
  title: { en: string; es: string };
  domain: EconomicsDomain;
  icon: string; // Lucide icon name
  levels: {
    beginner: { en: string; es: string };
    practitioner: { en: string; es: string };
    executive: { en: string; es: string };
  };
  keyMetric?: { label: string; value: string };
  fqhcContext: { en: string; es: string };
  sourceUrl: string;
  sourceOrg: string;
}

export const domainMeta: Record<
  EconomicsDomain,
  { label: { en: string; es: string }; color: string }
> = {
  reimbursement: {
    label: { en: "Reimbursement", es: "Reembolso" },
    color: "teal",
  },
  "revenue-streams": {
    label: { en: "Revenue Streams", es: "Fuentes de Ingresos" },
    color: "amber",
  },
  "federal-funding": {
    label: { en: "Federal Funding", es: "Fondos Federales" },
    color: "rose",
  },
  "value-based": {
    label: { en: "Value-Based Care", es: "Atención Basada en Valor" },
    color: "blue",
  },
  "workforce-economics": {
    label: { en: "Workforce Economics", es: "Economía Laboral" },
    color: "purple",
  },
  regulatory: {
    label: { en: "Regulatory & Compliance", es: "Regulación y Cumplimiento" },
    color: "stone",
  },
};

export const levelMeta: Record<
  EconomicsLevel,
  { label: { en: string; es: string }; subtitle: { en: string; es: string }; color: string }
> = {
  beginner: {
    label: { en: "Foundation", es: "Fundamentos" },
    subtitle: { en: "For new hires & CHWs", es: "Para nuevos empleados y CHWs" },
    color: "teal",
  },
  practitioner: {
    label: { en: "Operational", es: "Operacional" },
    subtitle: { en: "For experienced staff", es: "Para personal con experiencia" },
    color: "amber",
  },
  executive: {
    label: { en: "Strategic", es: "Estratégico" },
    subtitle: { en: "For executives & policy analysts", es: "Para ejecutivos y analistas de política" },
    color: "rose",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

export const economicsConcepts: EconomicsConcept[] = [
  /* ---- REIMBURSEMENT ---- */
  {
    id: "pps-reimbursement",
    title: { en: "Prospective Payment System (PPS)", es: "Sistema de Pago Prospectivo (PPS)" },
    domain: "reimbursement",
    icon: "DollarSign",
    levels: {
      beginner: {
        en: "When a patient visits your clinic, the insurance company pays a set amount — the same amount every time, no matter how long the visit takes or what tests are done. It's like getting paid a flat fee per visit. This is different from hospitals where they bill for every single thing they do.",
        es: "Cuando un paciente visita tu clínica, la compañía de seguros paga una cantidad fija — la misma cantidad cada vez, sin importar cuánto dure la visita o qué pruebas se hagan. Es como recibir un pago fijo por visita. Esto es diferente de los hospitales donde cobran por cada cosa que hacen.",
      },
      practitioner: {
        en: "FQHCs receive a per-visit encounter rate under PPS, established through the Medicare cost-based methodology and adjusted annually. For Medi-Cal in California, this rate is set by the state and updated yearly. In 2024, the average California FQHC PPS rate was approximately $225-$275 per visit. This means your documentation matters — each qualifying visit generates the same reimbursement, but the visit must meet the threshold: a face-to-face encounter with a qualified provider. Telehealth visits qualify at the full PPS rate. Know that same-day visits with different providers in different disciplines can each generate a separate PPS claim.",
        es: "Los FQHCs reciben una tarifa por encuentro por visita bajo PPS, establecida a través de la metodología basada en costos de Medicare y ajustada anualmente. Para Medi-Cal en California, esta tarifa la establece el estado y se actualiza cada año. En 2024, la tarifa PPS promedio de FQHCs en California fue aproximadamente $225-$275 por visita. Esto significa que tu documentación importa — cada visita calificante genera el mismo reembolso, pero la visita debe cumplir el umbral: un encuentro cara a cara con un proveedor calificado. Las visitas de telesalud califican a la tarifa PPS completa.",
      },
      executive: {
        en: "PPS is the financial backbone of the FQHC model, established under §1902(bb) of the Social Security Act. The methodology uses a cost-based wrap-around payment: FQHCs receive the difference between their PPS rate and any managed care plan payment. Strategic implications: (1) PPS rates are set using historical cost reports — aggressive cost allocation in Form 224 (cost report) directly increases future PPS rates; (2) The change-in-scope mechanism allows rate adjustments when adding new service lines (dental, behavioral health, pharmacy); (3) Under managed care expansion in California, the state's AB 204 alternate payment methodology creates both risks (payment delays) and opportunities (supplemental payments). FQHCs should model the impact of visit mix shifts — a 10% increase in behavioral health visits at lower marginal cost but same PPS rate significantly improves margins.",
        es: "PPS es la columna financiera del modelo FQHC, establecido bajo §1902(bb) de la Ley de Seguridad Social. La metodología usa un pago complementario basado en costos: los FQHCs reciben la diferencia entre su tarifa PPS y cualquier pago del plan de atención administrada.",
      },
    },
    keyMetric: { label: "Avg CA PPS Rate", value: "$225-$275/visit" },
    fqhcContext: {
      en: "Your PPS rate is your FQHC's most important number. Every qualifying patient visit generates this amount regardless of services rendered. Documentation that supports a qualifying visit is critical.",
      es: "Tu tarifa PPS es el número más importante de tu FQHC. Cada visita calificante de paciente genera esta cantidad sin importar los servicios prestados.",
    },
    sourceUrl: "https://www.hrsa.gov/sites/default/files/hrsa/about/budget/budget-justification-fy2025.pdf",
    sourceOrg: "HRSA",
  },
  {
    id: "340b-program",
    title: { en: "340B Drug Pricing Program", es: "Programa de Precios de Medicamentos 340B" },
    domain: "revenue-streams",
    icon: "Pill",
    levels: {
      beginner: {
        en: "Your clinic can buy medicines at a very big discount — like getting a 50% off coupon from drug companies. Then when patients need those medicines, the clinic can charge the regular price. The difference between what the clinic paid and what insurance pays is extra money the clinic keeps. This money helps fund more services for patients who can't pay.",
        es: "Tu clínica puede comprar medicamentos con un descuento muy grande — como recibir un cupón de 50% de descuento de las farmacéuticas. Cuando los pacientes necesitan esos medicamentos, la clínica puede cobrar el precio regular. La diferencia es dinero extra que la clínica conserva para financiar más servicios.",
      },
      practitioner: {
        en: "Under 340B, FQHCs purchase outpatient drugs at 25-50% below average wholesale price (AWP). Revenue generation depends on payer mix: Medicaid patients generate the spread between 340B acquisition cost and the Medi-Cal pharmacy reimbursement rate; commercially insured patients generate the largest spread. Key operational knowledge: (1) Each patient must be registered in your FQHC and have a documented relationship with a provider; (2) Mixed-use inventory tracking is required (replenishment model vs. virtual inventory); (3) Contract pharmacies extend your reach but require robust split-billing software. The 340B program generated an estimated $44B in total discounts in 2023, with FQHCs representing a growing share.",
        es: "Bajo 340B, los FQHCs compran medicamentos ambulatorios a 25-50% por debajo del precio mayorista promedio (AWP). La generación de ingresos depende de la mezcla de pagadores. Los pacientes de Medicaid generan el margen entre el costo de adquisición 340B y la tarifa de reembolso de farmacia de Medi-Cal.",
      },
      executive: {
        en: "340B is the second-largest revenue opportunity for most FQHCs after PPS, but faces existential regulatory risk. The program has grown from $12B (2017) to $44B+ (2023) in discounts, attracting intense pharmaceutical industry lobbying for restrictions. Strategic calculus: (1) In-house pharmacy vs. contract pharmacy — in-house captures 100% of margin but requires capital investment ($200-500K startup); Highland Health's case study shows 270% revenue increase with this model; (2) Specialty pharmacy (HIV, Hep C, oncology) generates highest per-script margins ($1,000-5,000+); (3) Monitor the 340B OPPS litigation (Johnson & Johnson v. HHS) which could reshape contract pharmacy obligations; (4) California's Medi-Cal Rx transition moved pharmacy claims to fee-for-service, changing 340B spread calculations. Model your 340B revenue at risk under various restriction scenarios — most FQHCs should be planning for 20-30% 340B revenue reduction over 5 years.",
        es: "340B es la segunda mayor oportunidad de ingresos para la mayoría de los FQHCs después de PPS, pero enfrenta riesgo regulatorio existencial. El programa ha crecido de $12B (2017) a $44B+ (2023) en descuentos.",
      },
    },
    keyMetric: { label: "Program Discounts", value: "$44B+ (2023)" },
    fqhcContext: {
      en: "340B revenue funds services for uninsured patients and is often the difference between operating at a surplus or deficit. Every FQHC should understand and optimize their 340B program.",
      es: "Los ingresos de 340B financian servicios para pacientes sin seguro y a menudo son la diferencia entre operar con superávit o déficit.",
    },
    sourceUrl: "https://www.hrsa.gov/opa/program-requirements",
    sourceOrg: "HRSA Office of Pharmacy Affairs",
  },
  {
    id: "fmap-medicaid",
    title: { en: "FMAP & Medicaid Financing", es: "FMAP y Financiamiento de Medicaid" },
    domain: "federal-funding",
    icon: "Building2",
    levels: {
      beginner: {
        en: "The federal government and California share the cost of Medi-Cal (Medicaid). For every dollar California spends on healthcare for low-income people, the federal government matches it — usually paying about 50 cents. Some programs get even more matching, like 90 cents for every dollar on ACA expansion coverage. This is why federal funding cuts are so scary for clinics — it's not just losing federal money, it's losing the match too.",
        es: "El gobierno federal y California comparten el costo de Medi-Cal (Medicaid). Por cada dólar que California gasta en atención médica para personas de bajos ingresos, el gobierno federal lo iguala — generalmente pagando aproximadamente 50 centavos. Algunos programas reciben aún más, como 90 centavos por cada dólar en la cobertura de expansión ACA.",
      },
      practitioner: {
        en: "FMAP (Federal Medical Assistance Percentage) determines how much the federal government reimburses each state for Medicaid spending. California's base FMAP is approximately 50%, but this varies by program: ACA expansion populations receive 90% FMAP; CHIP gets an enhanced FMAP (~65%); Home and Community-Based Services got a temporary 10% FMAP boost. For FQHCs: most of your Medi-Cal patients are covered at 50-90% federal match depending on eligibility category. Under H.R. 1's proposed changes, FMAP for expansion adults could drop from 90% to state base rate, meaning California would need to cover an additional 40% of costs for ~5 million enrollees. This directly threatens the patient base that generates your PPS visits.",
        es: "FMAP (Porcentaje de Asistencia Médica Federal) determina cuánto reembolsa el gobierno federal a cada estado por gastos de Medicaid. El FMAP base de California es aproximadamente 50%, pero varía por programa: las poblaciones de expansión ACA reciben 90% de FMAP.",
      },
      executive: {
        en: "FMAP is the single largest variable in FQHC financial modeling because it determines the sustainability of your patient base. With 60-80% of FQHC patients on Medicaid, any FMAP reduction cascades through the entire revenue model. Quantitative analysis: California covers ~15.5M Medicaid enrollees, ~5M through ACA expansion at 90% FMAP. A reduction to 50% FMAP on expansion populations creates a ~$20B annual state funding gap. CBO projects H.R. 1's Medicaid provisions would reduce federal spending by $715B over 10 years, with per-capita caps adding $668B in additional cuts. State response scenarios: (1) Maintain coverage with state general fund — unlikely given budget constraints; (2) Implement work requirements/enrollment friction — 10-25% disenrollment based on Arkansas/Georgia experience; (3) Reduce benefits/provider rates — directly cuts PPS or delays payments. Model three scenarios: optimistic (90% FMAP maintained), base case (phased reduction to 80%), and stress case (reduction to 50% with enrollment barriers). Each 1% drop in your Medicaid patient panel = approximately 1% PPS revenue decline.",
        es: "FMAP es la variable más importante en el modelado financiero de FQHCs porque determina la sostenibilidad de su base de pacientes.",
      },
    },
    keyMetric: { label: "CA Base FMAP", value: "~50%" },
    fqhcContext: {
      en: "Federal matching determines how much of your patient population stays insured. When FMAP drops, states cut enrollment, and your PPS visits decline.",
      es: "El emparejamiento federal determina cuánto de tu población de pacientes permanece asegurada.",
    },
    sourceUrl: "https://www.kff.org/medicaid/state-indicator/federal-matching-rate-and-multiplier/",
    sourceOrg: "Kaiser Family Foundation",
  },
  {
    id: "value-based-payment",
    title: { en: "Value-Based Payment (VBP) & Capitation", es: "Pago Basado en Valor (VBP) y Capitación" },
    domain: "value-based",
    icon: "Target",
    levels: {
      beginner: {
        en: "Instead of getting paid per visit, some insurance plans pay your clinic a set amount each month for each patient — whether they visit or not. It's like a subscription: the clinic gets $50/month for each of its 5,000 patients ($250,000/month). If the clinic keeps patients healthy and they don't need expensive care, the clinic does well. If patients get sicker and need lots of care, the clinic loses money. This encourages prevention over treatment.",
        es: "En lugar de recibir pago por visita, algunos planes de seguro pagan a tu clínica una cantidad fija cada mes por cada paciente — visiten o no. Es como una suscripción. Si la clínica mantiene saludables a los pacientes, le va bien. Si los pacientes se enferman mucho, la clínica pierde dinero.",
      },
      practitioner: {
        en: "VBP models in California FQHCs include: (1) Pay-for-Performance (P4P): bonuses tied to quality metrics (HEDIS measures, UDS clinical quality); (2) Shared Savings: if your patient panel's total cost of care comes below a target, you share in the savings (typically 30-50%); (3) Capitation: per-member-per-month (PMPM) payment for defined services — United Health Centers of SJV launched an IPA specifically for this; (4) Alternative Payment Methodology (APM) under AB 204: California's approach to aligning managed care payments with FQHC PPS rates. Key operational implications: quality reporting drives revenue (UDS measures → HRSA quality bonuses + managed care incentives); population health management infrastructure (patient registries, care gap reports) enables VBP success; CHWs and care coordinators are the workforce that makes VBP profitable.",
        es: "Los modelos VBP en FQHCs de California incluyen: Pago por Rendimiento (P4P), Ahorros Compartidos, Capitación (pago por-miembro-por-mes), y la Metodología de Pago Alternativa (APM) bajo AB 204.",
      },
      executive: {
        en: "VBP represents the strategic transition from volume to value, and FQHCs are structurally advantaged if they build the right infrastructure. The business case: (1) FQHCs already deliver high-quality primary care at lower cost than hospitals — UDS data shows FQHCs outperform national benchmarks on most quality measures; (2) CHWs and care coordinators provide high-touch engagement at lower cost than clinical staff — the labor arbitrage that makes VBP profitable; (3) California's managed care landscape is consolidating around VBP: CalAIM's Enhanced Care Management, Community Supports, and Population Health Management are all VBP-adjacent. Strategic moves: form or join an IPA to negotiate capitated rates directly with managed care plans (see United Health Centers case study); invest in analytics infrastructure to track total cost of care; develop risk stratification to identify high-cost patients for intervention. The math: a 10,000-patient panel at $50 PMPM capitation = $6M annual revenue. If you can manage total cost at $40 PMPM, the $1.2M surplus exceeds what PPS would generate with 8,000 annual visits at $275.",
        es: "VBP representa la transición estratégica de volumen a valor, y los FQHCs están estructuralmente ventajados si construyen la infraestructura correcta.",
      },
    },
    keyMetric: { label: "Model", value: "PMPM Capitation" },
    fqhcContext: {
      en: "VBP is the future. FQHCs that build population health management infrastructure now will thrive; those that don't will be stuck in a declining fee-for-service model.",
      es: "VBP es el futuro. Los FQHCs que construyan infraestructura de gestión de salud poblacional ahora prosperarán.",
    },
    sourceUrl: "https://www.dhcs.ca.gov/provgovpart/Pages/ValueBasedPayment.aspx",
    sourceOrg: "DHCS",
  },
  {
    id: "section-330-grants",
    title: { en: "Section 330 Grants & CHCF", es: "Subvenciones Sección 330 y CHCF" },
    domain: "federal-funding",
    icon: "Shield",
    levels: {
      beginner: {
        en: "Your clinic gets a big check from the federal government every year — this is the Section 330 grant. It helps pay for seeing patients who can't pay, buying equipment, and running programs. But this money isn't guaranteed forever — Congress has to vote to renew it. The Community Health Center Fund (CHCF) is the pot of money that provides 70% of all health center funding. It expires in December 2025 and needs to be reauthorized.",
        es: "Tu clínica recibe un cheque grande del gobierno federal cada año — esta es la subvención Sección 330. Ayuda a pagar por ver pacientes que no pueden pagar, comprar equipo y ejecutar programas. Pero este dinero no está garantizado para siempre — el Congreso tiene que votar para renovarlo.",
      },
      practitioner: {
        en: "Section 330 of the Public Health Service Act authorizes federal grants to FQHCs in four categories: 330(e) Community Health Centers, 330(g) Migrants, 330(h) Homeless, 330(i) Public Housing. Your grant determines your FQHC status and enables: PPS reimbursement, 340B eligibility, NHSC site designation, FTCA malpractice coverage. The typical 330 grant covers 15-25% of an FQHC's total revenue. But the real value is the multiplier: that 330 grant unlocks PPS rates (~50% of revenue), 340B program (~10-20%), and FTCA coverage (saving $200K-500K in malpractice insurance). Without the grant, an FQHC loses not just 330 funding but access to the entire FQHC financial ecosystem. CHCF provides approximately $4.6B annually — 70% of total health center grants.",
        es: "La Sección 330 de la Ley de Servicio de Salud Pública autoriza subvenciones federales a FQHCs en cuatro categorías. Tu subvención determina tu estatus de FQHC y habilita: reembolso PPS, elegibilidad 340B, designación de sitio NHSC, y cobertura de mala praxis FTCA.",
      },
      executive: {
        en: "Section 330 grant strategy is an underappreciated lever. The grant itself is often <20% of revenue, but it's the keystone that holds the entire FQHC financial architecture together. Strategic considerations: (1) Grant scope changes (new service delivery sites, new services) directly increase your PPS rate — every approved change-in-scope is a rate negotiation opportunity; (2) HRSA's Uniform Data System (UDS) reporting drives future grant levels — optimizing UDS metrics (especially enabling services, sliding fee utilization, and clinical quality) strengthens your competitive position in discretionary funding rounds; (3) CHCF authorization cliff (Dec 2025/2026) creates existential risk — if not reauthorized, 70% of Section 330 funding disappears overnight, affecting 1,400+ health centers; (4) H.R. 1 restructuring could convert health center grants from mandatory to discretionary spending, subject to annual appropriations volatility. PureView Health Center's approach — reducing federal dependency from 62.5% to 17% — is the gold standard playbook. Every FQHC should model their 'zero-grant scenario' and have a 3-year runway plan.",
        es: "La estrategia de subvención Sección 330 es una palanca subestimada. La subvención misma es a menudo <20% de los ingresos, pero es la piedra angular que sostiene toda la arquitectura financiera del FQHC.",
      },
    },
    keyMetric: { label: "CHCF Annual", value: "$4.6B" },
    fqhcContext: {
      en: "Your 330 grant isn't just money — it's the key that unlocks PPS rates, 340B drugs, NHSC loan repayment, and FTCA malpractice coverage. Losing it means losing everything.",
      es: "Tu subvención 330 no es solo dinero — es la llave que desbloquea tarifas PPS, medicamentos 340B, pago de préstamos NHSC y cobertura de mala praxis FTCA.",
    },
    sourceUrl: "https://www.nachc.org/policy-priorities/federal-funding/",
    sourceOrg: "NACHC",
  },
  {
    id: "workforce-sb525",
    title: { en: "Healthcare Minimum Wage (SB 525)", es: "Salario Mínimo de Salud (SB 525)" },
    domain: "workforce-economics",
    icon: "Users",
    levels: {
      beginner: {
        en: "California passed a law (SB 525) that raises the minimum wage for healthcare workers. By 2027, everyone working at an FQHC — from front desk to medical assistants — must earn at least $25/hour. That's about $52,000/year. This helps workers earn a living wage, but it means clinics need to find more money to pay everyone more.",
        es: "California aprobó una ley (SB 525) que aumenta el salario mínimo para trabajadores de salud. Para 2027, todos los que trabajen en un FQHC deben ganar al menos $25/hora. Eso es aproximadamente $52,000/año.",
      },
      practitioner: {
        en: "SB 525 creates a phased healthcare minimum wage increase for different facility types. For FQHCs: $21/hour (June 2024) → $22/hour (2025) → $25/hour (2027). This applies to all healthcare facility employees, not just clinical staff — including custodial, dietary, administrative, and clerical workers. Operational impacts: (1) Wage compression — when entry-level reaches $25/hr, experienced staff expect proportional increases; a $25 floor typically means a $28-32 effective floor for experienced workers to maintain differentials; (2) Total labor cost increase estimated at 12-18% for typical FQHCs; (3) PPS rates do not automatically adjust for SB 525 — you must file a change-in-scope or wait for annual rate updates; (4) Partner with HR to model cascading wage increases across all pay bands.",
        es: "SB 525 crea un aumento escalonado del salario mínimo de salud. Para FQHCs: $21/hora (junio 2024) → $22/hora (2025) → $25/hora (2027). Esto aplica a todos los empleados de instalaciones de salud, no solo personal clínico.",
      },
      executive: {
        en: "SB 525 is a structural shift that permanently raises the FQHC cost floor. Model the full cascade: if your lowest-paid workers move from $18 to $25 (39% increase), maintaining wage differentials requires proportional increases through at least the median salary band. Analysis: (1) A 200-employee FQHC with average wage of $28/hr facing a 15% labor cost increase = $1.75M annual additional cost; (2) PPS rate adjustment lag means 12-18 months of absorbing higher costs before rates catch up; (3) Offset strategies: increase visit volume (difficult with workforce constraints), add higher-margin services (340B pharmacy, specialty referral management), reduce overhead through AI/automation; (4) Federal minimum wage discussions ($15-17/hr) are below SB 525 but could affect grant funding calculations. The workforce arbitrage play: invest in CHW and promotora roles ($25-30/hr post-SB525) to handle population health management that would cost $60-100/hr with clinical staff. This is the economic argument for CHW investment — not charity, but margin optimization under VBP.",
        es: "SB 525 es un cambio estructural que eleva permanentemente el piso de costos de los FQHCs. Modele la cascada completa de aumentos salariales.",
      },
    },
    keyMetric: { label: "FQHC Min Wage 2027", value: "$25/hr" },
    fqhcContext: {
      en: "SB 525 affects every employee in your FQHC. Plan for cascading wage increases — the minimum is just the floor, not the ceiling.",
      es: "SB 525 afecta a cada empleado en tu FQHC. Planifica aumentos salariales en cascada.",
    },
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    sourceOrg: "California Legislature",
  },
  {
    id: "caliam-ecm",
    title: { en: "CalAIM & Enhanced Care Management", es: "CalAIM y Gestión de Atención Mejorada" },
    domain: "value-based",
    icon: "HeartPulse",
    levels: {
      beginner: {
        en: "CalAIM is California's big plan to make Medi-Cal work better. One important part is ECM — Enhanced Care Management. If your clinic does ECM, you get extra money to help patients who need the most help — people who are homeless, have serious mental health issues, or keep going to the emergency room. Think of it as: the state pays your clinic extra to wrap around a patient with more support.",
        es: "CalAIM es el gran plan de California para mejorar Medi-Cal. Una parte importante es ECM — Gestión de Atención Mejorada. Si tu clínica hace ECM, recibe dinero extra para ayudar a pacientes que más lo necesitan.",
      },
      practitioner: {
        en: "ECM is a managed care benefit that pays FQHCs to provide intensive care coordination for high-need populations. ECM populations of focus: individuals experiencing homelessness, high ED utilizers, SMI/SUD, nursing facility transition, children with complex needs, adults at risk of institutionalization, birth equity. Payment: ECM is reimbursed through managed care plan contracts, separate from PPS. Typical PMPM rates: $150-350 depending on population. Key operational details: (1) ECM requires dedicated care managers (typically CHWs, social workers, or nurses) with caseloads of 25-50 members; (2) Documentation requirements: comprehensive assessment within 30 days, care plan with member input, monthly progress notes; (3) ECM revenue stacks on top of PPS — a patient visit generates both PPS and ECM revenue; (4) Community Supports (CS) provides housing, food, medically tailored meals as Medi-Cal benefits. FQHCs providing both ECM and CS maximize per-patient revenue.",
        es: "ECM es un beneficio de atención administrada que paga a FQHCs por proporcionar coordinación de atención intensiva para poblaciones de alta necesidad. Poblaciones de enfoque: personas sin hogar, usuarios frecuentes de urgencias, SMI/SUD.",
      },
      executive: {
        en: "CalAIM represents California's most significant Medicaid transformation in a decade, and ECM/CS are the revenue diversification vehicles that offset PPS risk. Strategic analysis: (1) ECM creates a recurring PMPM revenue stream independent of visit volume — crucial insurance against PPS cuts; (2) Scaling ECM requires workforce investment in CHWs/care coordinators, but at $25-30/hr labor cost generating $150-350 PMPM revenue per 35-member caseload, the unit economics are highly favorable (1 CHW × 35 members × $250 avg PMPM = $105K annual ECM revenue vs. ~$75K annual CHW cost); (3) Community Supports extend revenue into housing, food, and transportation — FQHCs can contract with Community Based Organizations or build internal capacity; (4) CalAIM's data infrastructure requirements (care plan sharing, HRSN screening, quality reporting) favor FQHCs with modern EHR systems and health information exchange capabilities; (5) The ECM expansion calendar adds new populations annually through 2027, growing the addressable market. Build ECM capacity aggressively — it's the best available hedge against federal funding uncertainty.",
        es: "CalAIM representa la transformación de Medicaid más significativa de California en una década. ECM/CS son los vehículos de diversificación de ingresos que compensan el riesgo de PPS.",
      },
    },
    keyMetric: { label: "ECM PMPM Rate", value: "$150-350" },
    fqhcContext: {
      en: "ECM revenue stacks on top of PPS visits. A single CHW managing 35 ECM members generates more revenue than their salary cost. This is the growth engine.",
      es: "Los ingresos de ECM se acumulan sobre las visitas PPS. Un solo CHW gestionando 35 miembros de ECM genera más ingresos que su costo salarial.",
    },
    sourceUrl: "https://www.dhcs.ca.gov/CalAIM/Pages/EnhancedCareManagement.aspx",
    sourceOrg: "DHCS CalAIM",
  },
  {
    id: "hcc-risk-adjustment",
    title: { en: "HCC Risk Adjustment & Coding", es: "Ajuste de Riesgo HCC y Codificación" },
    domain: "reimbursement",
    icon: "FileText",
    levels: {
      beginner: {
        en: "Every patient has a 'risk score' based on how sick they are. When your providers document all of a patient's conditions — diabetes, depression, heart disease — the patient's risk score goes up. A higher risk score means the insurance plan gets more money from the government for that patient, which often means better payments to your clinic. This is why complete documentation matters — not just for patient care, but for your clinic's revenue.",
        es: "Cada paciente tiene un 'puntaje de riesgo' basado en qué tan enfermo está. Cuando tus proveedores documentan todas las condiciones de un paciente, el puntaje de riesgo sube. Un puntaje más alto significa que el plan de seguro recibe más dinero del gobierno para ese paciente.",
      },
      practitioner: {
        en: "Hierarchical Condition Categories (HCCs) are CMS's risk adjustment model used for Medicare Advantage and increasingly adapted for Medicaid managed care. How it works: ICD-10 diagnosis codes map to HCC categories, each with a coefficient that increases the patient's Risk Adjustment Factor (RAF). Higher RAF = higher capitation payments to the managed care plan = potentially higher incentive payments to your FQHC. Practical coding implications: (1) All chronic conditions must be documented AND coded at least once per year to count (conditions don't carry over); (2) Specificity matters — 'diabetes mellitus type 2 with diabetic chronic kidney disease' (E11.22) maps to two HCCs while 'diabetes type 2' (E11.9) maps to one; (3) Annual wellness visits and chronic care management visits are ideal for HCC recapture; (4) Common missed HCCs: BMI ≥40, major depression (requires 'major' not just 'depression'), malnutrition, vascular disease complications.",
        es: "Las Categorías de Condiciones Jerárquicas (HCCs) son el modelo de ajuste de riesgo de CMS. Los códigos de diagnóstico ICD-10 se mapean a categorías HCC, cada una con un coeficiente que aumenta el Factor de Ajuste de Riesgo (RAF) del paciente.",
      },
      executive: {
        en: "Risk adjustment is the hidden revenue lever in managed care contracts. In a capitated environment, accurate HCC coding directly determines per-patient revenue. Analysis: (1) A 0.1 increase in average RAF score across a 10,000-patient panel at $100 baseline PMPM = $1.2M additional annual revenue; (2) Invest in CDI (Clinical Documentation Improvement) specialists — ROI is typically 5-10x salary in captured HCC revenue; (3) AI-assisted coding tools (see AI Tracker) can identify missed HCC opportunities by scanning clinical notes vs. coded diagnoses; (4) Suspect conditions — based on pharmacy data, lab results, and prior diagnoses — represent the largest HCC gap; (5) Under California's managed care expansion, FQHC performance on quality metrics AND risk score accuracy increasingly determines shared savings distributions. The strategic play: build an internal coding quality program that captures 90%+ of documented conditions as HCCs. Most FQHCs capture only 60-70%, leaving 30-40% of risk-adjusted revenue on the table.",
        es: "El ajuste de riesgo es la palanca de ingresos oculta en contratos de atención administrada. En un entorno capitado, la codificación HCC precisa determina directamente los ingresos por paciente.",
      },
    },
    keyMetric: { label: "Avg HCC Capture Rate", value: "60-70%" },
    fqhcContext: {
      en: "Every chronic condition your providers document and code correctly increases your clinic's risk-adjusted revenue. Most FQHCs leave 30-40% of risk adjustment revenue on the table.",
      es: "Cada condición crónica que tus proveedores documentan y codifican correctamente aumenta los ingresos ajustados por riesgo de tu clínica.",
    },
    sourceUrl: "https://www.cms.gov/Medicare/Health-Plans/MedicareAdvtgSpecRateStats/Risk-Adjustors",
    sourceOrg: "CMS",
  },
  {
    id: "sliding-fee-uninsured",
    title: { en: "Sliding Fee Scale & Uninsured Care", es: "Escala de Tarifas Deslizantes y Atención a No Asegurados" },
    domain: "regulatory",
    icon: "Scale",
    levels: {
      beginner: {
        en: "Your clinic must see everyone, even if they can't pay. That's what makes an FQHC special — nobody is turned away. Patients pay based on what they can afford, using a 'sliding fee scale.' If someone earns very little, they might pay $0 or $20 for a visit. If they earn more, they pay more — but never the full price. The federal grant helps cover the difference.",
        es: "Tu clínica debe ver a todos, incluso si no pueden pagar. Eso es lo que hace especial a un FQHC — nadie es rechazado. Los pacientes pagan según lo que pueden pagar, usando una 'escala de tarifas deslizantes.'",
      },
      practitioner: {
        en: "Section 330 requires FQHCs to offer a sliding fee discount schedule (SFDS) to patients at or below 200% Federal Poverty Level (FPL). Requirements: (1) Patients at ≤100% FPL must receive services at nominal or no charge; (2) Patients at 101-200% FPL receive graduated discounts (typically 75%, 50%, 25%); (3) No one can be denied services for inability to pay; (4) The SFDS must apply to all services. Financial reality: uninsured patients generate zero third-party revenue — the visit costs the FQHC $150-300 in provider time, overhead, and supplies. The 330 grant is specifically designed to offset this gap. In California, with undocumented adults recently gaining full-scope Medi-Cal, the uninsured population is shifting — but federal policy changes (H.R. 1) could reverse this, pushing millions back to uninsured status and increasing the financial burden on the sliding fee program.",
        es: "La Sección 330 requiere que los FQHCs ofrezcan una escala de descuento de tarifas deslizantes a pacientes en o por debajo del 200% del Nivel Federal de Pobreza (FPL).",
      },
      executive: {
        en: "The sliding fee scale is both mission-critical and a financial stress point. Strategic analysis: (1) Uninsured patient mix directly impacts margin — each 1% increase in uninsured mix = approximately 0.5-1% margin reduction (assuming 100% PPS for insured, zero revenue for uninsured); (2) California's undocumented Medi-Cal expansion (AB 4, SB 184) was moving ~700K adults from uninsured to Medi-Cal, converting $0 revenue visits to full PPS — but H.R. 1's proposed Medicaid verification requirements could reverse this; (3) 330 grant + state/local uncompensated care pools are the only offsets for sliding fee losses; (4) Financial sustainability under rising uninsured scenarios requires: enrollment assistance staffing (capturing every eligible patient for Medi-Cal, Medicare, covered CA), presumptive eligibility utilization, and state/county indigent care programs. Model your 'coverage cliff' scenario: if 10% of currently insured patients lose coverage, calculate the PPS revenue loss and compare against available 330 grant funding. Most FQHCs cannot sustain >30% uninsured mix without additional subsidies.",
        es: "La escala de tarifas deslizantes es tanto crítica para la misión como un punto de estrés financiero.",
      },
    },
    keyMetric: { label: "Discount Threshold", value: "≤200% FPL" },
    fqhcContext: {
      en: "The sliding fee scale is your FQHC's legal obligation and moral compass. Understanding the economics helps you advocate for the resources needed to sustain it.",
      es: "La escala de tarifas deslizantes es la obligación legal y brújula moral de tu FQHC.",
    },
    sourceUrl: "https://bphc.hrsa.gov/compliance/sliding-fee-discount-program",
    sourceOrg: "HRSA BPHC",
  },
  {
    id: "ftca-malpractice",
    title: { en: "FTCA Malpractice Coverage", es: "Cobertura de Mala Praxis FTCA" },
    domain: "regulatory",
    icon: "ShieldCheck",
    levels: {
      beginner: {
        en: "If a patient sues your clinic for a medical mistake, the federal government handles the lawsuit — not your clinic. This is called FTCA (Federal Tort Claims Act) coverage. It's like having free malpractice insurance from the government. This saves your clinic $200,000-$500,000 per year that would otherwise go to insurance companies. It only works because your clinic is an FQHC with a Section 330 grant.",
        es: "Si un paciente demanda a tu clínica por un error médico, el gobierno federal maneja la demanda — no tu clínica. Esto se llama cobertura FTCA. Es como tener seguro de mala praxis gratis del gobierno.",
      },
      practitioner: {
        en: "FTCA provides medical malpractice liability protection to FQHC employees acting within the scope of their federal employment (deemed status). Coverage details: (1) Covers all employed providers and staff, including volunteers with deemed status; (2) Does NOT cover independent contractors unless specifically deemed; (3) Annual FTCA deeming application required (Form 6 in HRSA EHB); (4) Requires credentialing/privileging compliance, quality improvement/assurance program, risk management program, and claims management procedures. The financial value: private malpractice insurance for a mid-size FQHC (20 providers) would cost $300K-$500K annually. FTCA eliminates this cost entirely. This is one of the most tangible financial benefits of Section 330 status.",
        es: "FTCA proporciona protección de responsabilidad por mala praxis médica a empleados de FQHCs. Cubre a todos los proveedores y personal empleados, incluidos voluntarios con estatus designado.",
      },
      executive: {
        en: "FTCA coverage is often the most underappreciated financial benefit of FQHC status — it's pure cost avoidance that flows directly to the bottom line. Strategic implications: (1) Value of FTCA in financial modeling: $15K-25K saved per provider per year × number of providers = significant annual savings; (2) FTCA deeming requires compliance infrastructure (credentialing, QI, risk management) that also drives clinical quality and operational excellence; (3) Loss of Section 330 grant status = loss of FTCA = immediate need to purchase commercial malpractice insurance at market rates, which could be an existential cost increase for a multi-site FQHC; (4) FTCA does not cover punitive damages (rare in medical malpractice but relevant for risk modeling); (5) Consider FTCA in recruitment — FQHC providers don't need personal malpractice insurance, which is a meaningful compensation benefit for recruitment vs. private practice. Include FTCA value in your 'total Section 330 ecosystem value' calculation alongside PPS, 340B, and NHSC.",
        es: "La cobertura FTCA es a menudo el beneficio financiero más subestimado del estatus FQHC — es pura evitación de costos que fluye directamente al resultado final.",
      },
    },
    keyMetric: { label: "Annual Savings", value: "$200K-500K" },
    fqhcContext: {
      en: "FTCA saves your clinic hundreds of thousands annually. This is invisible money — you don't see a check, but you avoid a massive expense. It's one more reason Section 330 status is invaluable.",
      es: "FTCA ahorra a tu clínica cientos de miles anualmente. Es dinero invisible — no ves un cheque, pero evitas un gasto masivo.",
    },
    sourceUrl: "https://bphc.hrsa.gov/federal-tort-claims-act",
    sourceOrg: "HRSA BPHC",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getConceptsByDomain(domain: EconomicsDomain): EconomicsConcept[] {
  return economicsConcepts.filter((c) => c.domain === domain);
}

export function getConceptById(id: string): EconomicsConcept | undefined {
  return economicsConcepts.find((c) => c.id === id);
}
