// FQHC Executive Masterclass — Mini deep-dive modules for the 2026 crisis moment
// Sourced from 200+ resources in resources/fqhc-bibliography.md

export const MASTERCLASSES_LAST_UPDATED = "2026-03-04"

// ── Types ──────────────────────────────────────────────────────

export type MasterclassCategory =
  | "survival"
  | "revenue"
  | "undocumented-care"
  | "fundraising"
  | "economics"
  | "leadership"
  | "compliance"

export type MasterclassAudience =
  | "ceo-coo"
  | "cfo"
  | "clinical"
  | "hr-workforce"
  | "board"
  | "all-leaders"

export type Difficulty = "foundational" | "intermediate" | "advanced"

export interface MasterclassModule {
  id: string
  title: { en: string; es: string }
  subtitle: { en: string; es: string }
  category: MasterclassCategory
  audience: MasterclassAudience
  difficulty: Difficulty
  estimatedMinutes: number
  recommendedOrder: number
  urgencyStat: { en: string; es: string }
  whyNow: { en: string; es: string }
  learningObjectives: { en: string; es: string }[]
  keyTakeaways: { en: string; es: string }[]
  sourceMaterials: { label: string; url: string }[]
  siteLinks: { label: string; href: string }[]
  tags: string[]
}

// ── Category Metadata ──────────────────────────────────────────

export const MASTERCLASS_CATEGORIES: {
  id: MasterclassCategory
  en: string
  es: string
  color: string
  icon: string
}[] = [
  { id: "survival", en: "Financial Survival", es: "Supervivencia Financiera", color: "bg-red-50 text-red-700 border-red-200", icon: "ShieldAlert" },
  { id: "revenue", en: "Revenue Recovery", es: "Recuperación de Ingresos", color: "bg-amber-50 text-amber-700 border-amber-200", icon: "DollarSign" },
  { id: "undocumented-care", en: "Undocumented Patient Care", es: "Atención a Pacientes Indocumentados", color: "bg-purple-50 text-purple-700 border-purple-200", icon: "Heart" },
  { id: "fundraising", en: "First-Time Fundraising", es: "Recaudación por Primera Vez", color: "bg-blue-50 text-blue-700 border-blue-200", icon: "HandCoins" },
  { id: "economics", en: "Healthcare Economics", es: "Economía de la Salud", color: "bg-teal-50 text-teal-700 border-teal-200", icon: "TrendingUp" },
  { id: "leadership", en: "Executive Leadership", es: "Liderazgo Ejecutivo", color: "bg-stone-100 text-stone-700 border-stone-300", icon: "Users" },
  { id: "compliance", en: "Risk & Compliance", es: "Riesgo y Cumplimiento", color: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: "ShieldCheck" },
]

export const AUDIENCE_META: {
  id: MasterclassAudience
  en: string
  es: string
}[] = [
  { id: "ceo-coo", en: "CEO / COO", es: "CEO / COO" },
  { id: "cfo", en: "CFO / Finance", es: "CFO / Finanzas" },
  { id: "clinical", en: "CMO / Clinical", es: "CMO / Clínico" },
  { id: "hr-workforce", en: "HR / Workforce", es: "RR.HH. / Fuerza Laboral" },
  { id: "board", en: "Board Members", es: "Miembros de la Junta" },
  { id: "all-leaders", en: "All Leaders", es: "Todos los Líderes" },
]

export const DIFFICULTY_META: {
  id: Difficulty
  en: string
  es: string
  color: string
}[] = [
  { id: "foundational", en: "Foundational", es: "Fundamental", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "intermediate", en: "Intermediate", es: "Intermedio", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "advanced", en: "Advanced", es: "Avanzado", color: "bg-red-50 text-red-700 border-red-200" },
]

// ── Masterclass Modules ────────────────────────────────────────

export const MASTERCLASSES: MasterclassModule[] = [
  // ─── FINANCIAL SURVIVAL ────────────────────────────────────
  {
    id: "the-17-percent-fqhc",
    title: {
      en: "The 17% FQHC — Breaking the Grant Dependency Trap",
      es: "El FQHC del 17% — Rompiendo la Trampa de Dependencia de Subvenciones",
    },
    subtitle: {
      en: "How one health center reduced federal funding dependency from 62.5% to 17% while serving more uninsured patients",
      es: "Cómo un centro de salud redujo su dependencia de fondos federales del 62.5% al 17% mientras servía a más pacientes sin seguro",
    },
    category: "survival",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 28,
    recommendedOrder: 1,
    urgencyStat: {
      en: "50% of CHCs had negative margins in 2023",
      es: "El 50% de los CHC tuvieron márgenes negativos en 2023",
    },
    whyNow: {
      en: "With CHCF authorization expiring December 2026, Medicaid work requirements taking effect January 2027, and the provider tax phase-down starting 2028, FQHCs that remain 60%+ dependent on federal funding face existential risk. A DEA efficiency study of 1,375 FQHCs found that grant revenues were negatively associated with operational efficiency — meaning grants may enable the very slack that makes centers fragile. The path forward isn't more grants; it's less dependency.",
      es: "Con la autorización del CHCF expirando en diciembre de 2026, los requisitos de trabajo de Medicaid que entran en vigor en enero de 2027 y la reducción del impuesto a proveedores a partir de 2028, los FQHCs que mantienen más del 60% de dependencia de fondos federales enfrentan un riesgo existencial. Un estudio de eficiencia DEA de 1,375 FQHCs encontró que los ingresos por subvenciones estaban negativamente asociados con la eficiencia operativa, lo que significa que las subvenciones pueden generar la misma holgura que hace frágiles a los centros.",
    },
    learningObjectives: [
      { en: "Calculate your center's federal dependency ratio and benchmark against the sector", es: "Calcule el índice de dependencia federal de su centro y compárelo con el sector" },
      { en: "Identify 3-5 revenue diversification strategies aligned with your mission", es: "Identifique 3-5 estrategias de diversificación de ingresos alineadas con su misión" },
      { en: "Build a commercially insured patient acquisition strategy without compromising safety-net mission", es: "Construya una estrategia de adquisición de pacientes con seguro comercial sin comprometer la misión de red de seguridad" },
      { en: "Model the financial impact of a 30% federal funding reduction on your operations", es: "Modele el impacto financiero de una reducción del 30% en fondos federales en sus operaciones" },
    ],
    keyTakeaways: [
      { en: "Grant dependency is a symptom, not a cause — the business model itself must evolve", es: "La dependencia de subvenciones es un síntoma, no una causa — el modelo de negocio debe evolucionar" },
      { en: "Attracting commercially insured patients is mission-aligned: it cross-subsidizes care for the uninsured", es: "Atraer pacientes con seguro comercial está alineado con la misión: subsidia la atención de los no asegurados" },
      { en: "The 17% center serves MORE uninsured patients than when it was 62.5% dependent — financial resilience enables mission expansion", es: "El centro del 17% sirve a MÁS pacientes sin seguro que cuando dependía el 62.5% — la resiliencia financiera permite la expansión de la misión" },
    ],
    sourceMaterials: [
      { label: "FQHC Associates: Business Model Analysis", url: "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is" },
      { label: "PMC: Grant Revenue & FQHC Efficiency (DEA)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3976192/" },
      { label: "Commonwealth Fund: Financial Challenges Loom", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
      { label: "KFF: CHC Financing Explained", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
    ],
    siteLinks: [
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Funding Impact Tracker", href: "/funding-impact" },
    ],
    tags: ["revenue-diversification", "financial-resilience", "business-model", "grants"],
  },
  {
    id: "seven-cliffs",
    title: {
      en: "Seven Cliffs in Eighteen Months — Crisis Scenario Planning",
      es: "Siete Precipicios en Dieciocho Meses — Planificación de Escenarios de Crisis",
    },
    subtitle: {
      en: "Build if/then financial models for the unprecedented convergence of CHCF expiration, Medicaid cuts, and 340B erosion",
      es: "Construya modelos financieros si/entonces para la convergencia sin precedentes de la expiración del CHCF, recortes de Medicaid y erosión del 340B",
    },
    category: "survival",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 32,
    recommendedOrder: 2,
    urgencyStat: {
      en: "7 major policy deadlines between Jul 2026 – Jan 2028",
      es: "7 plazos de políticas importantes entre julio 2026 – enero 2028",
    },
    whyNow: {
      en: "No FQHC in the program's 60-year history has faced this many simultaneous funding threats. CHCF authorization expires December 2026. Dental coverage for undocumented adults ends July 2026. Medicaid work requirements begin January 2027. The provider tax phase-down starts 2028. PPS elimination for UIS services hits 2028. Planning for one financial scenario isn't enough anymore — you need three, and you need them by Q2 2026.",
      es: "Ningún FQHC en los 60 años de historia del programa ha enfrentado tantas amenazas de financiamiento simultáneas. La autorización del CHCF expira en diciembre de 2026. La cobertura dental para adultos indocumentados termina en julio de 2026. Los requisitos de trabajo de Medicaid comienzan en enero de 2027. La reducción del impuesto a proveedores comienza en 2028. Se necesitan tres escenarios financieros, y se necesitan para el segundo trimestre de 2026.",
    },
    learningObjectives: [
      { en: "Map all 7 funding cliffs on a single timeline with dollar-amount exposure per cliff", es: "Mapee los 7 precipicios de financiamiento en una sola línea de tiempo con exposición en dólares por precipicio" },
      { en: "Build 3 financial scenarios (optimistic, realistic, catastrophic) using if/then models", es: "Construya 3 escenarios financieros (optimista, realista, catastrófico) usando modelos si/entonces" },
      { en: "Identify which services to protect first and which can be restructured under each scenario", es: "Identifique qué servicios proteger primero y cuáles pueden reestructurarse bajo cada escenario" },
      { en: "Prepare the board conversation — present scenarios with decision points, not just problems", es: "Prepare la conversación con la junta — presente escenarios con puntos de decisión, no solo problemas" },
      { en: "Create a monitoring dashboard with trigger points for activating each scenario response", es: "Cree un panel de monitoreo con puntos de activación para cada respuesta de escenario" },
    ],
    keyTakeaways: [
      { en: "Scenario planning isn't pessimism — it's the only responsible approach when 7 variables are moving simultaneously", es: "La planificación de escenarios no es pesimismo — es el único enfoque responsable cuando 7 variables se mueven simultáneamente" },
      { en: "The board needs to see decision trees, not doomsday presentations — make it actionable", es: "La junta necesita ver árboles de decisión, no presentaciones apocalípticas — hágalo accionable" },
      { en: "FQHCs that plan now will absorb patients from centers that didn't — crisis creates opportunity for the prepared", es: "Los FQHCs que planifican ahora absorberán pacientes de los centros que no lo hicieron — la crisis crea oportunidades para los preparados" },
    ],
    sourceMaterials: [
      { label: "Community Link: Scenario Planning for FQHCs", url: "https://www.communitylinkconsulting.com/clc-articles-tips/scenario-planning-fqhc-federal-funding-uncertainty" },
      { label: "Maximized Revenue: Building a Resilient Financial Plan", url: "https://www.maximizedrevenue.com/preparing-for-the-next-funding-cycle-building-a-resilient-financial-plan-for-your-fqhc/" },
      { label: "NACHC 2024 UDS Early Takeaways", url: "https://www.nachc.org/2024-uds-early-takeaways-community-health-center-growth-under-pressure/" },
    ],
    siteLinks: [
      { label: "Funding Impact Tracker", href: "/funding-impact" },
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Policy Timeline", href: "/" },
    ],
    tags: ["scenario-planning", "funding-cliffs", "strategic-planning", "board-governance"],
  },
  {
    id: "340b-under-siege",
    title: {
      en: "Your 340B Is Under Siege — Protecting Your Pharmacy Lifeline",
      es: "Su 340B Está Bajo Asedio — Protegiendo su Línea de Vida Farmacéutica",
    },
    subtitle: {
      en: "18 manufacturers have restricted 340B pricing since 2020 — here's how to protect this existential revenue stream",
      es: "18 fabricantes han restringido los precios 340B desde 2020 — así es cómo proteger esta fuente de ingresos existencial",
    },
    category: "survival",
    audience: "cfo",
    difficulty: "intermediate",
    estimatedMinutes: 22,
    recommendedOrder: 3,
    urgencyStat: {
      en: "38% of CHCs expect 340B revenue to decline",
      es: "El 38% de los CHC espera que los ingresos del 340B disminuyan",
    },
    whyNow: {
      en: "The 340B program is under coordinated attack from pharmaceutical manufacturers, PBMs, and congressional critics. 18 manufacturers have unilaterally restricted 340B pricing since 2020. CHCs are legally required to reinvest every penny of 340B savings into patient care — these savings fund dental, behavioral health, translation services, food banks, and co-pay assistance. When 340B shrinks, uninsured patients lose access to the services that keep them healthy. 38% of CHCs expect further declines.",
      es: "El programa 340B está bajo ataque coordinado de fabricantes farmacéuticos, PBMs y críticos del Congreso. 18 fabricantes han restringido unilateralmente los precios del 340B desde 2020. Los CHC están legalmente obligados a reinvertir cada centavo de los ahorros del 340B en la atención al paciente — estos ahorros financian servicios dentales, salud conductual, traducción, bancos de alimentos y asistencia con copagos.",
    },
    learningObjectives: [
      { en: "Understand how 340B savings flow through your P&L and which services they subsidize", es: "Entienda cómo los ahorros del 340B fluyen a través de su P&L y qué servicios subsidian" },
      { en: "Map manufacturer restrictions affecting your formulary and quantify revenue exposure", es: "Mapee las restricciones de fabricantes que afectan su formulario y cuantifique la exposición de ingresos" },
      { en: "Audit contract pharmacy arrangements for compliance before external audit hits", es: "Audite los arreglos de farmacias contratistas para cumplimiento antes de que llegue una auditoría externa" },
      { en: "Evaluate in-house pharmacy optimization as a hedge against contract pharmacy erosion", es: "Evalúe la optimización de la farmacia interna como cobertura contra la erosión de farmacias contratistas" },
    ],
    keyTakeaways: [
      { en: "340B isn't a profit center — it's the financial plumbing that makes sliding-scale care possible", es: "El 340B no es un centro de ganancias — es la infraestructura financiera que hace posible la atención de escala deslizante" },
      { en: "CHCs account for only 5.4% of 340B purchases but serve the most vulnerable patients", es: "Los CHC representan solo el 5.4% de las compras del 340B pero sirven a los pacientes más vulnerables" },
      { en: "Proactive compliance audits are cheaper than reactive investigations — start now", es: "Las auditorías de cumplimiento proactivas son más baratas que las investigaciones reactivas — comience ahora" },
    ],
    sourceMaterials: [
      { label: "NACHC: 340B Critical Program", url: "https://www.nachc.org/resource/340-b-a-critical-program-for-health-centers/" },
      { label: "NACHC: 340B Funding Health Equity", url: "https://www.nachc.org/resource/health-centers-and-340b-funding-health-equity/" },
      { label: "CBO: Growth in the 340B Program", url: "https://www.cbo.gov/publication/61730" },
      { label: "340B Report (News)", url: "https://340breport.com/" },
    ],
    siteLinks: [
      { label: "Funding Impact Tracker", href: "/funding-impact" },
    ],
    tags: ["340b", "pharmacy", "compliance", "revenue-protection"],
  },

  // ─── REVENUE RECOVERY ──────────────────────────────────────
  {
    id: "pps-codes-not-billing",
    title: {
      en: "The PPS Codes You're Not Billing — Revenue Hiding in Plain Sight",
      es: "Los Códigos PPS que No Está Facturando — Ingresos Ocultos a la Vista",
    },
    subtitle: {
      en: "New billable services from 2024 that most FQHCs haven't adopted yet — immediate revenue impact",
      es: "Nuevos servicios facturables de 2024 que la mayoría de los FQHC aún no han adoptado — impacto inmediato en ingresos",
    },
    category: "revenue",
    audience: "cfo",
    difficulty: "foundational",
    estimatedMinutes: 15,
    recommendedOrder: 1,
    urgencyStat: {
      en: "$202.65 base PPS rate × missed encounters = millions left on the table",
      es: "$202.65 tarifa base PPS × encuentros perdidos = millones dejados sobre la mesa",
    },
    whyNow: {
      en: "CMS expanded billable FQHC services in 2024, but adoption is lagging. G0511 General Care Management can be billed multiple times per month — most FQHCs bill once. G0136 Social Determinants of Health risk assessments are now reimbursable, yet 67% of FQHCs screen but far fewer bill for it. Caregiver training for chronic illness patients is a new billable category most haven't activated. Each missed encounter at the $202.65 PPS rate compounds into significant annual revenue loss.",
      es: "CMS expandió los servicios facturables de FQHC en 2024, pero la adopción está rezagada. G0511 puede facturarse varias veces al mes — la mayoría de los FQHC facturan una vez. Las evaluaciones G0136 de determinantes sociales de salud ahora son reembolsables, pero el 67% de los FQHC evalúan y pocos facturan. La capacitación de cuidadores para pacientes con enfermedades crónicas es una nueva categoría facturable que la mayoría no ha activado.",
    },
    learningObjectives: [
      { en: "Audit your current PPS billing against the full menu of eligible encounter types", es: "Audite su facturación PPS actual contra el menú completo de tipos de encuentros elegibles" },
      { en: "Implement G0511 multi-billing workflows for care management encounters", es: "Implemente flujos de trabajo de facturación múltiple G0511 para encuentros de gestión de atención" },
      { en: "Convert existing SDoH screening into billable G0136 encounters", es: "Convierta las evaluaciones SDoH existentes en encuentros facturables G0136" },
      { en: "Calculate the revenue impact of adding 2 encounters per provider per day at PPS rate", es: "Calcule el impacto en ingresos de agregar 2 encuentros por proveedor por día a la tarifa PPS" },
    ],
    keyTakeaways: [
      { en: "You're already doing the work — the gap is in documentation and coding, not clinical practice", es: "Ya está haciendo el trabajo — la brecha está en documentación y codificación, no en práctica clínica" },
      { en: "2 additional encounters per provider per day at $202.65 = ~$100K+ per provider per year", es: "2 encuentros adicionales por proveedor por día a $202.65 = ~$100K+ por proveedor por año" },
      { en: "PPS rate rebasing is your right — if your cost structure has changed, request it", es: "El rebase de la tarifa PPS es su derecho — si su estructura de costos ha cambiado, solicítelo" },
    ],
    sourceMaterials: [
      { label: "NACHC FQHC Payment Guide (PDF)", url: "https://www.nachc.org/wp-content/uploads/2025/05/FQHC-Payment-Guide.pdf" },
      { label: "PYA: Medicare PPS Primer", url: "https://www.pyapc.com/insights/medicare-payment-primer-federally-qualified-health-centers-prospective-payment-system/" },
      { label: "CMS FQHC Center (PDF)", url: "https://www.cms.gov/files/document/mln006397-federally-qualified-health-center.pdf" },
    ],
    siteLinks: [
      { label: "Workplace Guides", href: "/guides" },
      { label: "Salary Intelligence", href: "/salary-data" },
    ],
    tags: ["pps", "billing", "revenue-cycle", "cms", "coding"],
  },
  {
    id: "ipa-formation",
    title: {
      en: "The IPA Nobody Told You About — Collective Bargaining for Small FQHCs",
      es: "La IPA que Nadie le Contó — Negociación Colectiva para FQHCs Pequeños",
    },
    subtitle: {
      en: "How FQHC-only independent practice associations give small centers the negotiating power of large systems",
      es: "Cómo las asociaciones de práctica independiente exclusivas para FQHC dan a los centros pequeños el poder de negociación de grandes sistemas",
    },
    category: "revenue",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 28,
    recommendedOrder: 2,
    urgencyStat: {
      en: "62% of CHCs are in ACOs — but most small FQHCs negotiate alone",
      es: "El 62% de los CHC están en ACO — pero la mayoría de los FQHCs pequeños negocian solos",
    },
    whyNow: {
      en: "Medicaid managed care organizations increasingly dictate terms to individual FQHCs. Small centers lack the patient volume and data infrastructure to negotiate value-based contracts alone. CHIPA in New York proved that an FQHC-only IPA can collectively bargain with MCOs, share risk, reduce administrative overhead, and build the infrastructure for value-based care. With 65% of FQHCs reporting insufficient financial resources, collective action isn't optional — it's survival math.",
      es: "Las organizaciones de atención administrada de Medicaid dictan cada vez más los términos a los FQHC individuales. Los centros pequeños carecen del volumen de pacientes y la infraestructura de datos para negociar contratos basados en valor solos. CHIPA en Nueva York demostró que una IPA exclusiva de FQHC puede negociar colectivamente con MCOs. Con el 65% de los FQHC reportando recursos financieros insuficientes, la acción colectiva no es opcional.",
    },
    learningObjectives: [
      { en: "Understand the structural differences between MSO, IPA, and ACO models for FQHCs", es: "Entienda las diferencias estructurales entre los modelos MSO, IPA y ACO para FQHCs" },
      { en: "Assess your center's readiness for collective contracting (data, EHR, quality reporting)", es: "Evalúe la preparación de su centro para contratación colectiva (datos, EHR, informes de calidad)" },
      { en: "Identify potential IPA partners using the 'financially, clinically, and culturally aligned' framework", es: "Identifique socios potenciales de IPA usando el marco 'alineados financiera, clínica y culturalmente'" },
      { en: "Model shared-risk contracts and understand downside exposure before signing", es: "Modele contratos de riesgo compartido y entienda la exposición negativa antes de firmar" },
    ],
    keyTakeaways: [
      { en: "Single-FQHC MCO negotiation is a losing game — collective bargaining changes the power dynamic", es: "La negociación individual FQHC-MCO es un juego perdido — la negociación colectiva cambia la dinámica de poder" },
      { en: "Value-based care readiness requires data infrastructure most small FQHCs don't have — an IPA pools that investment", es: "La preparación para el cuidado basado en valor requiere infraestructura de datos que la mayoría de los FQHCs pequeños no tienen — una IPA agrupa esa inversión" },
      { en: "Cultural alignment between partner FQHCs is the #1 predictor of IPA success", es: "La alineación cultural entre FQHCs socios es el predictor #1 del éxito de una IPA" },
    ],
    sourceMaterials: [
      { label: "CHIPA (NY FQHC IPA)", url: "https://www.communityhealthipa.com/" },
      { label: "NYHealth Foundation: CHC IPA Implementation", url: "https://nyhealthfoundation.org/grant-outcome/implementing-an-independent-provider-association-ipa-for-health-centers-in-central-new-york/" },
      { label: "Yuvo Health: MSO vs IPA vs ACO", url: "https://www.yuvohealth.com/post/demystifying-value-based-care-for-fqhcs-what-is-an-ipa-anyway" },
      { label: "Commonwealth Fund: Advancing Accountable Care in CHCs", url: "https://www.commonwealthfund.org/publications/issue-briefs/2025/aug/advancing-accountable-care-community-health-centers" },
    ],
    siteLinks: [
      { label: "FQHC Directory", href: "/directory" },
      { label: "Compare FQHCs", href: "/compare" },
    ],
    tags: ["ipa", "value-based-care", "managed-care", "collective-bargaining"],
  },
  {
    id: "grant-stacking",
    title: {
      en: "Grant Stacking 101 — The Section 330 Sub-Grants You Didn't Apply For",
      es: "Apilamiento de Subvenciones 101 — Las Sub-Subvenciones de la Sección 330 que No Solicitó",
    },
    subtitle: {
      en: "Most FQHCs have their base 330 grant — few stack all available sub-grants, NHSC slots, and FTCA coverage",
      es: "La mayoría de los FQHC tienen su subvención base 330 — pocos apilan todas las sub-subvenciones, plazas NHSC y cobertura FTCA disponibles",
    },
    category: "revenue",
    audience: "cfo",
    difficulty: "foundational",
    estimatedMinutes: 12,
    recommendedOrder: 3,
    urgencyStat: {
      en: "Section 330 funding doubled from $2.2B to $5.6B (2010-2019) — are you getting your share?",
      es: "El financiamiento de la Sección 330 se duplicó de $2.2B a $5.6B (2010-2019) — ¿está obteniendo su parte?",
    },
    whyNow: {
      en: "HRSA issued the first New Access Points NOFO since 2019 in May 2024 — $50 million for new FQHC sites. Maximum award is $650K/year regardless of number of new sites. But beyond NAP, many FQHCs are missing sub-grants they're already eligible for: Health Centers for the Homeless, Migrant Health Centers, Public Housing Primary Care. NHSC loan repayment slots are essentially free clinical labor. FTCA coverage eliminates malpractice insurance costs. These aren't new programs — they're money you're already entitled to.",
      es: "HRSA emitió el primer NOFO de Nuevos Puntos de Acceso desde 2019 en mayo de 2024 — $50 millones para nuevos sitios FQHC. Pero más allá del NAP, muchos FQHCs no aprovechan sub-subvenciones para las que ya son elegibles: Centros de Salud para Personas sin Hogar, Centros de Salud para Migrantes, Atención Primaria en Vivienda Pública. Las plazas NHSC son esencialmente mano de obra clínica gratuita.",
    },
    learningObjectives: [
      { en: "Inventory all Section 330 sub-grant categories and assess eligibility for each", es: "Inventaríe todas las categorías de sub-subvenciones de la Sección 330 y evalúe la elegibilidad para cada una" },
      { en: "Calculate the financial value of NHSC slots (salary offset) and FTCA coverage (malpractice savings)", es: "Calcule el valor financiero de las plazas NHSC (compensación salarial) y cobertura FTCA (ahorros en negligencia)" },
      { en: "Evaluate New Access Point eligibility for expansion into underserved communities", es: "Evalúe la elegibilidad de Nuevos Puntos de Acceso para expansión a comunidades desatendidas" },
      { en: "Build a multi-year grant calendar with application deadlines and renewal dates", es: "Construya un calendario de subvenciones multianual con fechas límite de solicitud y renovación" },
    ],
    keyTakeaways: [
      { en: "NHSC loan repayment is the most underutilized recruitment tool — it's essentially a federal salary subsidy", es: "El reembolso de préstamos NHSC es la herramienta de reclutamiento más subutilizada — es esencialmente un subsidio salarial federal" },
      { en: "FTCA malpractice coverage saves $50-150K/year per center — if you're buying commercial malpractice insurance, you're overpaying", es: "La cobertura FTCA ahorra $50-150K/año por centro — si compra seguro comercial, está pagando de más" },
      { en: "Grant stacking isn't about doing more — it's about getting paid for what you're already doing", es: "El apilamiento de subvenciones no se trata de hacer más — se trata de recibir pago por lo que ya está haciendo" },
    ],
    sourceMaterials: [
      { label: "KFF: CHC Financing — Section 330 & Medicaid", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
      { label: "COPE Health: New Access Points Guide", url: "https://copehealthsolutions.com/cblog/fqhc-new-access-points-what-to-know-if-your-organization-is-considering-applying/" },
      { label: "Advocates for Community Health: How CHCs Are Funded", url: "https://advocatesforcommunityhealth.org/how-are-community-health-centers-funded/" },
      { label: "CRS: Federal Health Centers Overview (R43937)", url: "https://www.congress.gov/crs-product/R43937" },
    ],
    siteLinks: [
      { label: "Funding Impact Tracker", href: "/funding-impact" },
      { label: "Career Resources", href: "/resources" },
    ],
    tags: ["grants", "section-330", "nhsc", "ftca", "new-access-points"],
  },

  // ─── UNDOCUMENTED PATIENT CARE ─────────────────────────────
  {
    id: "ice-playbook",
    title: {
      en: "The ICE Playbook — Operational Protocols for Post-Protected-Areas Healthcare",
      es: "El Manual de ICE — Protocolos Operativos para la Atención Médica Post-Áreas Protegidas",
    },
    subtitle: {
      en: "84% of healthcare workers report patient visit declines since January 2025 — your protocols can reverse this",
      es: "El 84% de los trabajadores de salud reportan disminución de visitas desde enero 2025 — sus protocolos pueden revertir esto",
    },
    category: "undocumented-care",
    audience: "all-leaders",
    difficulty: "intermediate",
    estimatedMinutes: 18,
    recommendedOrder: 1,
    urgencyStat: {
      en: "84% of healthcare workers report significant patient visit declines",
      es: "El 84% de los trabajadores de salud reportan disminuciones significativas de visitas",
    },
    whyNow: {
      en: "The January 2025 rescission of the Protected Areas policy removed the designation of healthcare facilities as off-limits to immigration enforcement. 84% of healthcare workers surveyed by Physicians for Human Rights report significant or moderate decreases in patient visits. 29% of immigrants report skipping or postponing healthcare. But FQHCs that have operationalized clear protocols — like Clinica Romero's waiting room Know Your Rights program — are maintaining patient trust and visit volumes. California's SB 81 'Care Over Fear Act' now makes immigration status protected medical information. The legal framework exists; the operational gap is in implementation.",
      es: "La rescisión de enero de 2025 de la política de Áreas Protegidas eliminó la designación de instalaciones de salud como fuera del alcance de la aplicación de inmigración. El 84% de los trabajadores de salud encuestados reportan disminuciones significativas en las visitas de pacientes. Pero los FQHCs que han implementado protocolos claros están manteniendo la confianza y el volumen de visitas.",
    },
    learningObjectives: [
      { en: "Distinguish judicial warrants from ICE administrative warrants — and train every front desk staff", es: "Distinga las órdenes judiciales de las órdenes administrativas de ICE — y capacite a todo el personal de recepción" },
      { en: "Map public vs. private areas in your facility and establish access protocols for each", es: "Mapee las áreas públicas vs. privadas en su instalación y establezca protocolos de acceso para cada una" },
      { en: "Implement a Clinica Romero-style waiting room 'Know Your Rights' program", es: "Implemente un programa de 'Conozca Sus Derechos' estilo Clínica Romero en la sala de espera" },
      { en: "Designate an institutional liaison for any immigration enforcement interaction", es: "Designe un enlace institucional para cualquier interacción de aplicación de inmigración" },
      { en: "Comply with California SB 81 requirements for protecting immigration status as medical information", es: "Cumpla con los requisitos de SB 81 de California para proteger el estatus migratorio como información médica" },
    ],
    keyTakeaways: [
      { en: "HIPAA protects patient information from compelled disclosure — this is your strongest shield", es: "HIPAA protege la información del paciente de divulgación forzada — este es su escudo más fuerte" },
      { en: "The chilling effect harms people who aren't even its targets — 16.9% visit decline among lawfully present Hispanics", es: "El efecto disuasorio daña a personas que ni siquiera son sus objetivos — 16.9% de disminución en visitas entre hispanos con residencia legal" },
      { en: "Proactive trust-building (signage, training, community outreach) is cheaper than reactive crisis management", es: "La construcción proactiva de confianza (señalización, capacitación, alcance comunitario) es más barata que la gestión reactiva de crisis" },
    ],
    sourceMaterials: [
      { label: "NILC/PHR: Healthcare & Immigration Enforcement Guide (PDF)", url: "https://www.nilc.org/wp-content/uploads/2025/03/Health-Care-and-U.S.-Immigration-Enforcement_What-Providers-Need-to-Know_Guide_PHR-and-NILC-2025.pdf" },
      { label: "PMC: Clinica Romero KYR Case Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8804239/" },
      { label: "PHR: ICE Tactics Survey", url: "https://phr.org/news/ice-tactics-and-deportation-fears-limit-access-to-health-care-for-children-of-immigrants-survey/" },
      { label: "Holland & Knight: Protected Areas Implications", url: "https://www.hklaw.com/en/insights/publications/2025/01/rescission-of-the-dhs-protected-areas-policy-implications" },
      { label: "NILC: Know Your Rights", url: "https://www.nilc.org/resources/healthcare-provider-and-patients-rights-imm-enf/" },
    ],
    siteLinks: [
      { label: "Intelligence Dashboard", href: "/" },
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
    ],
    tags: ["immigration", "ice", "patient-trust", "hipaa", "sb-81", "know-your-rights"],
  },
  {
    id: "maintaining-trust",
    title: {
      en: "Maintaining Trust When Patients Are Afraid — The Chilling Effect Response",
      es: "Manteniendo la Confianza Cuando los Pacientes Tienen Miedo — Respuesta al Efecto Disuasorio",
    },
    subtitle: {
      en: "29% of immigrants are skipping healthcare — community outreach strategies that actually rebuild patient volume",
      es: "El 29% de los inmigrantes está omitiendo atención médica — estrategias de alcance comunitario que realmente reconstruyen el volumen de pacientes",
    },
    category: "undocumented-care",
    audience: "clinical",
    difficulty: "foundational",
    estimatedMinutes: 14,
    recommendedOrder: 2,
    urgencyStat: {
      en: "29% of immigrants skipped or postponed healthcare in 2025",
      es: "El 29% de los inmigrantes omitió o pospuso atención médica en 2025",
    },
    whyNow: {
      en: "The KFF/New York Times 2025 survey found 29% of immigrants skipped or postponed healthcare and 30% limited activities outside the home. The Medi-Cal enrollment freeze (January 2026) and dental benefit cuts (July 2026) compound the fear factor for undocumented patients. But the chilling effect isn't permanent — FQHCs that invest in promotora networks, faith partnerships, and community event presence are rebuilding trust. The AMA Journal of Ethics has established 'sanctuary doctoring' as an ethical obligation, not just a policy preference.",
      es: "La encuesta KFF/NYT de 2025 encontró que el 29% de los inmigrantes omitió o pospuso atención médica y el 30% limitó actividades fuera del hogar. La congelación de inscripción en Medi-Cal (enero 2026) y los recortes de beneficios dentales (julio 2026) agravan el factor de miedo. Pero el efecto disuasorio no es permanente — los FQHCs que invierten en redes de promotoras y asociaciones de fe están reconstruyendo la confianza.",
    },
    learningObjectives: [
      { en: "Quantify the chilling effect at your center using no-show rates, new patient intake, and cancellations by zip code", es: "Cuantifique el efecto disuasorio en su centro usando tasas de inasistencia, ingreso de nuevos pacientes y cancelaciones por código postal" },
      { en: "Design a promotora/CHW outreach program targeting high-fear communities", es: "Diseñe un programa de alcance de promotoras/CHW dirigido a comunidades con alto nivel de miedo" },
      { en: "Build faith community and school partnerships as trusted referral channels", es: "Construya asociaciones con comunidades de fe y escuelas como canales de referencia confiables" },
      { en: "Implement the 'sanctuary doctoring' framework from the AMA Journal of Ethics", es: "Implemente el marco de 'doctrina de santuario' del AMA Journal of Ethics" },
    ],
    keyTakeaways: [
      { en: "The chilling effect is measurable — track it, and you can reverse it", es: "El efecto disuasorio es medible — rastréelo y podrá revertirlo" },
      { en: "Trust is rebuilt through consistent presence, not one-time campaigns — embed outreach in operations", es: "La confianza se reconstruye con presencia consistente, no campañas únicas — integre el alcance en las operaciones" },
      { en: "Your bilingual staff are your greatest trust asset — invest in their training and community role", es: "Su personal bilingüe es su mayor activo de confianza — invierta en su capacitación y rol comunitario" },
    ],
    sourceMaterials: [
      { label: "KFF/NYT 2025 Survey of Immigrants", url: "https://www.kff.org/immigrant-health/kff-new-york-times-2025-survey-of-immigrants-health-and-health-care-experiences-during-the-second-trump-administration/" },
      { label: "AMA Journal of Ethics: Sanctuary Doctoring", url: "https://journalofethics.ama-assn.org/article/good-sanctuary-doctoring-undocumented-patients/2019-01" },
      { label: "Friedman & Venkataramani: Chilling Effects (Health Affairs)", url: "https://www.healthaffairs.org/doi/abs/10.1377/hlthaff.2020.02356" },
      { label: "CPCA: Immigration Resources for Health Centers", url: "https://www.cpca.org/CPCA/Health_Center_Resources/IMMIGRANT_RESOURCES/CPCA/HEALTH_CENTER_RESOURCES/Immigrant_Resources_content/Immigration_Resources.aspx" },
    ],
    siteLinks: [
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
      { label: "The Movement", href: "/strategy/movement" },
    ],
    tags: ["chilling-effect", "patient-trust", "community-outreach", "promotora", "sanctuary-doctoring"],
  },

  // ─── FIRST-TIME FUNDRAISING ────────────────────────────────
  {
    id: "beyond-grants",
    title: {
      en: "Beyond Grants — Your First Non-Federal Dollar",
      es: "Más Allá de las Subvenciones — Su Primer Dólar No Federal",
    },
    subtitle: {
      en: "For FQHCs that have never fundraised from individuals, foundations, or corporations — start here",
      es: "Para FQHCs que nunca han recaudado de individuos, fundaciones o corporaciones — comience aquí",
    },
    category: "fundraising",
    audience: "ceo-coo",
    difficulty: "foundational",
    estimatedMinutes: 16,
    recommendedOrder: 1,
    urgencyStat: {
      en: "Most FQHCs have never had a development department",
      es: "La mayoría de los FQHC nunca han tenido un departamento de desarrollo",
    },
    whyNow: {
      en: "With operating margins at -2.1% nationally, FQHCs can no longer rely solely on grants and patient revenue. Yet most FQHC leaders came up through clinical or public health — not development. The fundraising muscle doesn't exist at most health centers. Your local community foundation already wants to fund health equity. Hospital systems and health plans are looking for community partners. Your board members' networks are untapped. The data case is compelling: FQHCs serve 14% of the US population for 1% of healthcare spending. That's a story donors want to be part of.",
      es: "Con márgenes operativos de -2.1% a nivel nacional, los FQHCs ya no pueden depender únicamente de subvenciones e ingresos de pacientes. Sin embargo, la mayoría de los líderes de FQHC vienen del ámbito clínico o de salud pública — no de desarrollo. Su fundación comunitaria local ya quiere financiar la equidad en salud. Los sistemas hospitalarios buscan socios comunitarios. Las redes de sus miembros de junta no están aprovechadas.",
    },
    learningObjectives: [
      { en: "Write a case statement for philanthropic giving that isn't a grant application", es: "Escriba una declaración de caso para donaciones filantrópicas que no sea una solicitud de subvención" },
      { en: "Identify 3 community foundations in your service area and their health equity funding priorities", es: "Identifique 3 fundaciones comunitarias en su área de servicio y sus prioridades de financiamiento de equidad en salud" },
      { en: "Build a corporate partnership pipeline targeting hospital systems, health plans, and pharmacy chains", es: "Construya un pipeline de asociaciones corporativas dirigido a sistemas hospitalarios, planes de salud y cadenas de farmacias" },
      { en: "Activate your board members' networks for individual donor cultivation", es: "Active las redes de sus miembros de junta para el cultivo de donantes individuales" },
    ],
    keyTakeaways: [
      { en: "Your case statement is not a grant narrative — it's a story about community impact that makes donors want to participate", es: "Su declaración de caso no es una narrativa de subvención — es una historia sobre impacto comunitario que hace que los donantes quieran participar" },
      { en: "The 51% patient board is an asset: these are real people whose lives your center changed — let them tell the story", es: "La junta de 51% de pacientes es un activo: son personas reales cuyas vidas cambió su centro — déjelos contar la historia" },
      { en: "Start with community foundations — they have local knowledge, smaller application processes, and existing health equity mandates", es: "Comience con fundaciones comunitarias — tienen conocimiento local, procesos de solicitud más pequeños y mandatos de equidad en salud existentes" },
    ],
    sourceMaterials: [
      { label: "Advocates for Community Health: How CHCs Are Funded", url: "https://advocatesforcommunityhealth.org/how-are-community-health-centers-funded/" },
      { label: "NACHC Board Roles & Responsibilities (PDF)", url: "https://www.nachc.org/wp-content/uploads/2023/10/Health-Center-Board-Roles-and-Responsibilities-10-23.pdf" },
      { label: "KFF: CHC Patients, Financing, and Services", url: "https://www.kff.org/medicaid/community-health-center-patients-financing-and-services/" },
    ],
    siteLinks: [
      { label: "FQHC Directory", href: "/directory" },
      { label: "Career Resources", href: "/resources" },
    ],
    tags: ["fundraising", "philanthropy", "community-foundations", "board-engagement"],
  },
  {
    id: "fundraising-math",
    title: {
      en: "The Fundraising Math for FQHCs — Building a Development Function from Zero",
      es: "Las Matemáticas de Recaudación para FQHCs — Construyendo una Función de Desarrollo desde Cero",
    },
    subtitle: {
      en: "The ROI of a $75K development hire, monthly giving programs, and planned giving from your patient community",
      es: "El ROI de contratar desarrollo por $75K, programas de donación mensual y legados planificados de su comunidad de pacientes",
    },
    category: "fundraising",
    audience: "cfo",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    recommendedOrder: 2,
    urgencyStat: {
      en: "500 donors × $25/month = $150K/year — achievable in year 1",
      es: "500 donantes × $25/mes = $150K/año — alcanzable en el año 1",
    },
    whyNow: {
      en: "With net margins at -2.1% and half of CHCs operating at a loss, even modest fundraising revenue can be transformational. A $75K development officer who raises $200K in year one delivers a 167% ROI. Monthly giving programs of 500 donors at $25/month generate $150K/year of unrestricted revenue — money that goes exactly where you need it, not where a grant funder dictates. And planned giving is the untapped frontier: elderly patients who've received decades of care may want to include your center in their estate planning.",
      es: "Con márgenes netos de -2.1% y la mitad de los CHC operando con pérdidas, incluso ingresos modestos de recaudación pueden ser transformacionales. Un oficial de desarrollo de $75K que recauda $200K en el primer año entrega un ROI del 167%. Programas de donación mensual de 500 donantes a $25/mes generan $150K/año de ingresos no restringidos.",
    },
    learningObjectives: [
      { en: "Calculate the breakeven point for your first development hire (salary vs. projected fundraising revenue)", es: "Calcule el punto de equilibrio para su primera contratación de desarrollo (salario vs. ingresos proyectados)" },
      { en: "Design a monthly giving program with realistic acquisition targets and retention metrics", es: "Diseñe un programa de donación mensual con objetivos de adquisición realistas y métricas de retención" },
      { en: "Evaluate donor management systems appropriate for FQHC budgets (free to $5K/year)", es: "Evalúe sistemas de gestión de donantes apropiados para presupuestos FQHC (gratis a $5K/año)" },
      { en: "Introduce planned giving conversations through patient-facing materials and community events", es: "Introduzca conversaciones de legados planificados a través de materiales para pacientes y eventos comunitarios" },
    ],
    keyTakeaways: [
      { en: "Unrestricted fundraising revenue is the most valuable dollar — it goes where YOU need it, not where a funder dictates", es: "Los ingresos de recaudación no restringidos son el dólar más valioso — va donde USTED lo necesita, no donde un financiador dicta" },
      { en: "Your patient community IS your donor community — they understand the mission because they live it", es: "Su comunidad de pacientes ES su comunidad de donantes — entienden la misión porque la viven" },
      { en: "Even a spreadsheet beats no system — start tracking donors today, upgrade tools later", es: "Incluso una hoja de cálculo es mejor que ningún sistema — comience a rastrear donantes hoy, mejore las herramientas después" },
    ],
    sourceMaterials: [
      { label: "Commonwealth Fund: CHC Financial Challenges", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
      { label: "PMC: When Patients Govern (Board & Uncompensated Care)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5590367/" },
      { label: "NACHC Board Roles & Responsibilities", url: "https://www.nachc.org/wp-content/uploads/2023/10/Health-Center-Board-Roles-and-Responsibilities-10-23.pdf" },
    ],
    siteLinks: [
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
    ],
    tags: ["fundraising", "development", "monthly-giving", "planned-giving", "roi"],
  },

  // ─── HEALTHCARE ECONOMICS ──────────────────────────────────
  {
    id: "blue-ocean",
    title: {
      en: "The Blue Ocean You're Already In — Why FQHCs Can't Be Replicated",
      es: "El Océano Azul en el que Ya Está — Por Qué los FQHCs No Pueden Ser Replicados",
    },
    subtitle: {
      en: "FQHCs serve 14% of the US population for 1% of healthcare spending — learn to articulate your unbeatable value proposition",
      es: "Los FQHCs sirven al 14% de la población de EE.UU. por el 1% del gasto en salud — aprenda a articular su propuesta de valor imbatible",
    },
    category: "economics",
    audience: "ceo-coo",
    difficulty: "foundational",
    estimatedMinutes: 12,
    recommendedOrder: 1,
    urgencyStat: {
      en: "14% of US population served for 1% of healthcare spending",
      es: "14% de la población de EE.UU. atendida por el 1% del gasto en salud",
    },
    whyNow: {
      en: "Retail clinics (CVS, Walgreens, Amazon) are entering safety-net-adjacent markets, cherry-picking commercially insured patients. Telehealth-only platforms are offering primary care without community connection. But no other entity combines primary care + behavioral health + dental + pharmacy + social services + cultural concordance + sliding fee + community governance at one location. FQHCs are inherently a blue ocean — but most can't articulate why. When your board, staff, funders, and community understand the value proposition, everything from recruitment to fundraising to payer negotiation gets easier.",
      es: "Las clínicas minoristas (CVS, Walgreens, Amazon) están entrando en mercados adyacentes a la red de seguridad. Pero ninguna otra entidad combina atención primaria + salud conductual + dental + farmacia + servicios sociales + concordancia cultural + escala deslizante + gobernanza comunitaria en un solo lugar. Los FQHCs son inherentemente un océano azul — pero la mayoría no puede articular por qué.",
    },
    learningObjectives: [
      { en: "Conduct a Porter's Five Forces analysis of your local healthcare market", es: "Realice un análisis de las Cinco Fuerzas de Porter de su mercado de salud local" },
      { en: "Articulate the FQHC value proposition in one sentence for each audience (funders, patients, providers, payers)", es: "Articule la propuesta de valor del FQHC en una oración para cada audiencia (financiadores, pacientes, proveedores, pagadores)" },
      { en: "Identify which services only your FQHC can provide in your service area — and which are under competitive threat", es: "Identifique qué servicios solo su FQHC puede proveer en su área de servicio — y cuáles están bajo amenaza competitiva" },
      { en: "Develop a competitive response strategy for retail clinic encroachment", es: "Desarrolle una estrategia de respuesta competitiva para la incursión de clínicas minoristas" },
    ],
    keyTakeaways: [
      { en: "Your competitive moat is integration — no retail clinic offers BH + dental + pharmacy + social services under one roof", es: "Su foso competitivo es la integración — ninguna clínica minorista ofrece SC + dental + farmacia + servicios sociales bajo un mismo techo" },
      { en: "Community governance (51% patient board) is a feature, not a constraint — it means your center reflects its community", es: "La gobernanza comunitaria (junta de 51% de pacientes) es una característica, no una restricción — significa que su centro refleja a su comunidad" },
      { en: "Lean into what only you can do — don't compete with Amazon on convenience; compete on whole-person, culturally concordant care", es: "Enfóquese en lo que solo usted puede hacer — no compita con Amazon en conveniencia; compita en atención integral y culturalmente concordante" },
    ],
    sourceMaterials: [
      { label: "Advocates for Community Health: How CHCs Are Funded", url: "https://advocatesforcommunityhealth.org/how-are-community-health-centers-funded/" },
      { label: "Health Affairs: FQHCs Reduce Health Disparity", url: "https://www.healthaffairs.org/sponsored-content/federally-qualified-health-centers-reduce-health-disparity" },
      { label: "Blue Ocean Strategy in Healthcare", url: "https://www.blueoceanstrategy.com/blog/blue-ocean-strategy-healthcare-industry/" },
    ],
    siteLinks: [
      { label: "FQHC Directory", href: "/directory" },
      { label: "Compare FQHCs", href: "/compare" },
      { label: "The Movement", href: "/strategy/movement" },
    ],
    tags: ["blue-ocean", "value-proposition", "competitive-strategy", "retail-clinics"],
  },
  {
    id: "ma-for-mission",
    title: {
      en: "M&A for Mission — When to Merge, Acquire, or Be Acquired",
      es: "F&A por la Misión — Cuándo Fusionarse, Adquirir o Ser Adquirido",
    },
    subtitle: {
      en: "43% of healthcare M&A is now distress-driven — cultural fit is the #1 predictor of success",
      es: "El 43% de las F&A en salud ahora son por dificultades financieras — la compatibilidad cultural es el predictor #1 de éxito",
    },
    category: "economics",
    audience: "board",
    difficulty: "advanced",
    estimatedMinutes: 30,
    recommendedOrder: 2,
    urgencyStat: {
      en: "70% of FQHC acquisitions succeed — 30% fail on cultural fit",
      es: "El 70% de las adquisiciones de FQHC tienen éxito — el 30% falla por compatibilidad cultural",
    },
    whyNow: {
      en: "A 2025 study found financially distressed FQHCs had 7.93x greater odds of altered operations (closures or consolidations). With 50% of CHCs operating at negative margins, the M&A wave is here. CHCF published the definitive M&A guide for community health centers. California is seeing 'mergers of equals' — similarly sized centers combining, not just large FQHCs absorbing distressed ones. The regulatory complexity (HRSA, CMS, state AG, DHCS, Board of Pharmacy, DEA, 340B OPA) makes expert guidance essential.",
      es: "Un estudio de 2025 encontró que los FQHCs en dificultades financieras tenían 7.93 veces más probabilidades de operaciones alteradas (cierres o consolidaciones). Con el 50% de los CHC operando con márgenes negativos, la ola de F&A ha llegado. California está viendo 'fusiones entre iguales' — centros de tamaño similar que se combinan.",
    },
    learningObjectives: [
      { en: "Assess whether your center is a merger candidate, an acquirer, or an acquisition target — and what triggers each", es: "Evalúe si su centro es candidato a fusión, adquirente o objetivo de adquisición — y qué desencadena cada uno" },
      { en: "Conduct cultural due diligence — the #1 predictor of M&A success in the FQHC sector", es: "Realice la debida diligencia cultural — el predictor #1 de éxito de F&A en el sector FQHC" },
      { en: "Navigate the regulatory gauntlet (HRSA scope change, 340B transfer, state AG approval, board restructuring)", es: "Navegue el desafío regulatorio (cambio de alcance HRSA, transferencia 340B, aprobación del AG estatal, reestructuración de junta)" },
      { en: "Evaluate 'merger of equals' vs. asset purchase vs. full merger — which structure fits your situation", es: "Evalúe 'fusión entre iguales' vs. compra de activos vs. fusión completa — qué estructura se ajusta a su situación" },
    ],
    keyTakeaways: [
      { en: "The distress signals are visible 18-24 months before closure — negative margins for 2+ years, board dysfunction, CEO vacancy", es: "Las señales de dificultad son visibles 18-24 meses antes del cierre — márgenes negativos por 2+ años, disfunción de junta, vacante de CEO" },
      { en: "Cultural due diligence isn't soft — it's the single most predictive factor in FQHC M&A outcomes", es: "La debida diligencia cultural no es blanda — es el factor más predictivo en los resultados de F&A de FQHC" },
      { en: "Mergers of equals preserve mission and community trust better than hostile acquisitions", es: "Las fusiones entre iguales preservan mejor la misión y la confianza comunitaria que las adquisiciones hostiles" },
    ],
    sourceMaterials: [
      { label: "CHCF: M&A Practical Guide for CHCs", url: "https://www.chcf.org/resource/mergers-acquisitions-guide-community-health-centers/" },
      { label: "CHCF: Partnership of Equals", url: "https://www.chcf.org/resource/partnership-equals-lessons-mergers-similarly-sized-positioned-centers/" },
      { label: "PMC: Factors Associated with FQHC Financial Performance", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9441282/" },
    ],
    siteLinks: [
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Layoff Tracker", href: "/layoffs" },
      { label: "Case Studies", href: "/strategy/case-studies" },
    ],
    tags: ["mergers-acquisitions", "financial-distress", "cultural-fit", "regulatory"],
  },
  {
    id: "ai-dividend",
    title: {
      en: "The AI Dividend — Ambient Documentation as Revenue Recovery",
      es: "El Dividendo de IA — Documentación Ambiental como Recuperación de Ingresos",
    },
    subtitle: {
      en: "If you recover 2 encounters per provider per day with AI scribes, that's ~$100K+ per provider per year",
      es: "Si recupera 2 encuentros por proveedor por día con escribas de IA, eso es ~$100K+ por proveedor por año",
    },
    category: "economics",
    audience: "clinical",
    difficulty: "intermediate",
    estimatedMinutes: 18,
    recommendedOrder: 3,
    urgencyStat: {
      en: "Abridge reduced provider burnout from 51.9% to 38.8%",
      es: "Abridge redujo el agotamiento de proveedores del 51.9% al 38.8%",
    },
    whyNow: {
      en: "Providers spend 2+ hours daily on documentation — time that could be billable patient encounters. Abridge won Best in KLAS 2026 for Ambient AI and reduced burnout from 51.9% to 38.8%. Sun River Health deployed Sunoh.ai across 500+ providers handling 7,000 visits/month. Sacramento Native American Health Center is piloting AI scribes for clinical documentation. The math is simple: 2 recovered encounters per provider per day at the $202.65 PPS rate = $405/day = $100K+ per provider per year. For a center with 10 providers, that's $1M+ in recovered revenue.",
      es: "Los proveedores pasan 2+ horas diarias en documentación — tiempo que podría ser encuentros facturables. Abridge ganó Best in KLAS 2026 para IA Ambiental y redujo el agotamiento del 51.9% al 38.8%. Sun River Health implementó Sunoh.ai con 500+ proveedores. Las matemáticas son simples: 2 encuentros recuperados por proveedor por día a la tarifa PPS de $202.65 = $405/día = $100K+ por proveedor por año.",
    },
    learningObjectives: [
      { en: "Calculate the 'documentation tax' at your center: hours spent on notes × provider hourly cost × opportunity cost", es: "Calcule el 'impuesto de documentación' en su centro: horas en notas × costo por hora del proveedor × costo de oportunidad" },
      { en: "Evaluate AI scribe options at FQHC scale and budget (Abridge, Sunoh.ai, Nabla, DAX Copilot)", es: "Evalúe opciones de escribas de IA a escala y presupuesto FQHC (Abridge, Sunoh.ai, Nabla, DAX Copilot)" },
      { en: "Design a pilot program with 3-5 providers and measurable outcomes (encounters/day, note time, burnout score)", es: "Diseñe un programa piloto con 3-5 proveedores y resultados medibles (encuentros/día, tiempo de notas, puntaje de agotamiento)" },
      { en: "Build the workforce retention case: burnt-out providers leave; AI scribes reduce burnout", es: "Construya el caso de retención de fuerza laboral: los proveedores agotados se van; los escribas de IA reducen el agotamiento" },
    ],
    keyTakeaways: [
      { en: "AI scribes aren't a tech investment — they're a revenue recovery and workforce retention investment", es: "Los escribas de IA no son una inversión tecnológica — son una inversión de recuperación de ingresos y retención de fuerza laboral" },
      { en: "Start with a 5-provider pilot and measure encounters/day before and after — the ROI will sell the board", es: "Comience con un piloto de 5 proveedores y mida encuentros/día antes y después — el ROI convencerá a la junta" },
      { en: "The burnout reduction alone justifies the cost — 70% of FQHCs report physician shortages, and burnt-out doctors leave", es: "La reducción del agotamiento por sí sola justifica el costo — el 70% de los FQHCs reportan escasez de médicos, y los doctores agotados se van" },
    ],
    sourceMaterials: [
      { label: "Sun River Health: Sunoh.ai Deployment", url: "https://sunoh.ai/press-releases/providers-at-sun-river-health-successfully-utilize-sunoh-ai-to-document-over-7000-visits-monthly/" },
      { label: "Abridge: Best in KLAS 2026", url: "https://www.abridge.com/press-release/best-in-klas-2026-press" },
      { label: "Commonwealth Fund 2024 FQHC Survey (Workforce)", url: "https://www.commonwealthfund.org/publications/issue-briefs/2024/aug/community-health-centers-meeting-primary-care-needs-2024-FQHC-survey" },
    ],
    siteLinks: [
      { label: "AI Tracker", href: "/ai-tracker" },
      { label: "Salary Intelligence", href: "/salary-data" },
    ],
    tags: ["ai", "ambient-documentation", "burnout", "revenue-recovery", "workforce-retention"],
  },

  // ─── EXECUTIVE LEADERSHIP ──────────────────────────────────
  {
    id: "ceo-succession",
    title: {
      en: "CEO Succession — The 36% Problem",
      es: "Sucesión del CEO — El Problema del 36%",
    },
    subtitle: {
      en: "Only 64% of boards are satisfied with succession planning — and only 6-7 of 30 positions are filled internally",
      es: "Solo el 64% de las juntas están satisfechas con la planificación de sucesión — y solo 6-7 de 30 posiciones se llenan internamente",
    },
    category: "leadership",
    audience: "board",
    difficulty: "advanced",
    estimatedMinutes: 26,
    recommendedOrder: 1,
    urgencyStat: {
      en: "36% of FQHC boards lack adequate succession plans",
      es: "El 36% de las juntas de FQHC carecen de planes de sucesión adecuados",
    },
    whyNow: {
      en: "The FQHC sector faces a leadership cliff: many founding CEOs are retiring, and the pipeline of prepared successors is thin. NACHC's research found only 64% of boards are satisfied with their succession planning, and out of ~30 CEO transitions studied, only 6-7 were filled by internal candidates. FQHC CEO succession is harder than hospital CEO succession because of the 51% patient board requirement, mission alignment complexity, and regulatory knowledge needed. The NACHC CEO Succession Planning Toolkit provides a multi-step process, but most boards haven't opened it.",
      es: "El sector FQHC enfrenta un precipicio de liderazgo: muchos CEOs fundadores se están jubilando y la reserva de sucesores preparados es escasa. La investigación de NACHC encontró que solo el 64% de las juntas están satisfechas con su planificación de sucesión. La sucesión de CEO de FQHC es más difícil que la de hospitales debido al requisito de junta de 51% de pacientes y la complejidad de alineación de misión.",
    },
    learningObjectives: [
      { en: "Assess your board's current succession readiness using NACHC's 12 CEO competency domains", es: "Evalúe la preparación actual de sucesión de su junta usando los 12 dominios de competencia de CEO de NACHC" },
      { en: "Identify and develop 2-3 internal candidates from clinical and operational ranks", es: "Identifique y desarrolle 2-3 candidatos internos de las filas clínicas y operacionales" },
      { en: "Build an interim CEO playbook for unplanned departures (the 'hit by a bus' scenario)", es: "Construya un manual de CEO interino para partidas no planificadas (el escenario del 'atropellado por un autobús')" },
      { en: "Design a board-led succession committee with clear timelines and decision criteria", es: "Diseñe un comité de sucesión dirigido por la junta con cronogramas claros y criterios de decisión" },
    ],
    keyTakeaways: [
      { en: "Succession planning is a BOARD responsibility, not the CEO's — waiting for the CEO to plan their own replacement is a governance failure", es: "La planificación de sucesión es responsabilidad de la JUNTA, no del CEO — esperar que el CEO planifique su propio reemplazo es una falla de gobernanza" },
      { en: "Internal candidates who understand the community and mission outperform external hires — but only if you invest in their development", es: "Los candidatos internos que entienden la comunidad y la misión superan a las contrataciones externas — pero solo si invierte en su desarrollo" },
      { en: "The 'interim CEO playbook' isn't pessimism — it's insurance that takes 2 days to create and can save 6 months of crisis", es: "El 'manual de CEO interino' no es pesimismo — es un seguro que toma 2 días crear y puede ahorrar 6 meses de crisis" },
    ],
    sourceMaterials: [
      { label: "NACHC CEO Competencies & Professional Development", url: "https://www.nachc.org/training-events/training-for-health-center-professionals/leadership-development/" },
      { label: "NACHC CEO Succession Planning Toolkit (PDF)", url: "https://www.nachc.org/wp-content/uploads/2023/03/Succession-Planning-Toolkit.pdf" },
      { label: "NACHC Board Roles & Responsibilities (PDF)", url: "https://www.nachc.org/wp-content/uploads/2023/10/Health-Center-Board-Roles-and-Responsibilities-10-23.pdf" },
    ],
    siteLinks: [
      { label: "Executive Guides", href: "/strategy/guides" },
      { label: "OKR Templates", href: "/strategy/okrs" },
    ],
    tags: ["succession-planning", "board-governance", "ceo", "leadership-development"],
  },
  {
    id: "board-effectiveness",
    title: {
      en: "The Board You Need vs The Board You Have",
      es: "La Junta que Necesita vs La Junta que Tiene",
    },
    subtitle: {
      en: "The 51% patient board majority is your competitive advantage, not a compliance burden — learn to leverage it",
      es: "La mayoría de 51% de pacientes en la junta es su ventaja competitiva, no una carga de cumplimiento — aprenda a aprovecharla",
    },
    category: "leadership",
    audience: "board",
    difficulty: "foundational",
    estimatedMinutes: 16,
    recommendedOrder: 2,
    urgencyStat: {
      en: "51% patient board majority is federal law — make it a strategic asset",
      es: "La mayoría de 51% de pacientes en la junta es ley federal — conviértala en un activo estratégico",
    },
    whyNow: {
      en: "Most FQHCs treat the Section 330 board composition requirement (51% patients) as a compliance checkbox. But patient board members ARE your market research — they live the experience your center serves. The remaining 49% should bring expertise in finance/banking, legal affairs, union leadership, commercial enterprise, and social services. With 7 funding cliffs approaching and M&A accelerating, board effectiveness isn't a nice-to-have — it's the difference between strategic navigation and crisis reaction.",
      es: "La mayoría de los FQHCs tratan el requisito de composición de la junta de la Sección 330 (51% pacientes) como una casilla de cumplimiento. Pero los miembros de la junta que son pacientes SON su investigación de mercado — viven la experiencia que su centro sirve. Los restantes 49% deben aportar experiencia en finanzas, asuntos legales, liderazgo sindical, empresa comercial y servicios sociales.",
    },
    learningObjectives: [
      { en: "Audit your current board composition against Section 330 requirements AND strategic needs", es: "Audite la composición actual de su junta contra los requisitos de la Sección 330 Y las necesidades estratégicas" },
      { en: "Recruit the other 49% strategically: identify gaps in finance, legal, technology, and community expertise", es: "Reclute el otro 49% estratégicamente: identifique brechas en finanzas, legal, tecnología y experiencia comunitaria" },
      { en: "Transform patient board members from passive participants into active mission ambassadors", es: "Transforme a los miembros pacientes de la junta de participantes pasivos a embajadores activos de la misión" },
      { en: "Redesign board meetings to be strategically focused — less reporting, more decision-making", es: "Rediseñe las reuniones de la junta para que se enfoquen estratégicamente — menos informes, más toma de decisiones" },
    ],
    keyTakeaways: [
      { en: "Patient board members aren't a compliance burden — they're live market intelligence about what your community actually needs", es: "Los miembros pacientes de la junta no son una carga de cumplimiento — son inteligencia de mercado en vivo sobre lo que su comunidad realmente necesita" },
      { en: "The best boards have clear committee structures (finance, quality, governance, strategy) that do work between meetings", es: "Las mejores juntas tienen estructuras de comité claras (finanzas, calidad, gobernanza, estrategia) que trabajan entre reuniones" },
      { en: "If your board meetings are mostly staff presentations, you have a reporting meeting — not a governing board", es: "Si sus reuniones de junta son principalmente presentaciones del personal, tiene una reunión de informes — no una junta directiva" },
    ],
    sourceMaterials: [
      { label: "HRSA Compliance Manual Ch. 19-20 (Board Authority & Composition)", url: "https://bphc.hrsa.gov/compliance/compliance-manual/chapter19" },
      { label: "NACHC Board Roles & Responsibilities (PDF)", url: "https://www.nachc.org/wp-content/uploads/2023/10/Health-Center-Board-Roles-and-Responsibilities-10-23.pdf" },
      { label: "National Law Review: FQHC Governance Requirements", url: "https://natlawreview.com/article/fqhcs-practical-impacts-governance-requirements" },
    ],
    siteLinks: [
      { label: "Executive Guides", href: "/strategy/guides" },
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
    ],
    tags: ["board-governance", "section-330", "patient-majority", "strategic-planning"],
  },

  // ─── REMOTE WORK & RETENTION ─────────────────────────────────
  {
    id: "remote-ready-workforce",
    title: {
      en: "Building a Remote-Ready FQHC Workforce",
      es: "Construyendo una Fuerza Laboral FQHC Lista para Trabajo Remoto",
    },
    subtitle: {
      en: "How to design hybrid and remote models for back-office, telehealth, and administrative roles while maintaining quality and compliance",
      es: "Cómo diseñar modelos híbridos y remotos para roles administrativos, de telesalud y back-office manteniendo calidad y cumplimiento",
    },
    category: "leadership",
    audience: "ceo-coo",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    recommendedOrder: 3,
    urgencyStat: {
      en: "70% of FQHCs report losing 5-25% of staff annually",
      es: "70% de los FQHCs reportan perder 5-25% del personal anualmente",
    },
    whyNow: {
      en: "The FQHC workforce crisis isn't just clinical — administrative staff turnover is the second-highest category. Meanwhile, 58% of U.S. workers can now do at least part of their job remotely. FQHCs that can't offer remote flexibility for billing, coding, case management, and referral coordination roles are losing talent to hospital systems and insurance companies that can. A Stanford/Nature study (2024) showed hybrid work reduces quit rates by 33%. The math is clear: remote-readiness is a retention strategy, not just a convenience.",
      es: "La crisis de fuerza laboral FQHC no es solo clínica — la rotación de personal administrativo es la segunda categoría más alta. Mientras tanto, el 58% de los trabajadores de EE.UU. ahora pueden hacer al menos parte de su trabajo remotamente. Los FQHCs que no pueden ofrecer flexibilidad remota están perdiendo talento. Un estudio Stanford/Nature (2024) mostró que el trabajo híbrido reduce las renuncias un 33%.",
    },
    learningObjectives: [
      { en: "Identify which FQHC roles can be fully remote, hybrid, or must remain on-site using a role classification framework", es: "Identifique qué roles FQHC pueden ser completamente remotos, híbridos o deben permanecer en sitio usando un marco de clasificación" },
      { en: "Design HIPAA-compliant remote work policies including device management, VPN requirements, and home workspace standards", es: "Diseñe políticas de trabajo remoto conformes a HIPAA incluyendo gestión de dispositivos, requisitos de VPN y estándares de espacio de trabajo en casa" },
      { en: "Build a telehealth operations infrastructure that supports virtual visits, remote triage, and asynchronous care", es: "Construya una infraestructura de operaciones de telesalud que soporte visitas virtuales, triaje remoto y atención asincrónica" },
      { en: "Calculate the ROI of remote work: reduced real estate costs, expanded recruiting pool, and improved retention rates", es: "Calcule el ROI del trabajo remoto: costos de espacio reducidos, reclutamiento ampliado y mejores tasas de retención" },
      { en: "Implement performance management for remote teams without resorting to surveillance — focus on outcomes, not hours", es: "Implemente gestión del desempeño para equipos remotos sin recurrir a vigilancia — enfoque en resultados, no en horas" },
    ],
    keyTakeaways: [
      { en: "Remote-readiness is a retention strategy disguised as an operations project — FQHCs that offer flexibility retain 33% more administrative staff", es: "La preparación para trabajo remoto es una estrategia de retención disfrazada de proyecto operacional — los FQHCs que ofrecen flexibilidad retienen 33% más personal administrativo" },
      { en: "Not every role needs to be on-site: billing, coding, case management, referral coordination, and population health analytics can all be done remotely with proper safeguards", es: "No todos los roles necesitan estar en sitio: facturación, codificación, gestión de casos y coordinación de referidos pueden hacerse remotamente con las debidas salvaguardas" },
      { en: "Invest in cloud infrastructure before you need it — Fenway Health transitioned 70-80% of staff in 48 hours because they'd already migrated off legacy systems", es: "Invierta en infraestructura en la nube antes de necesitarla — Fenway Health transicionó 70-80% de su personal en 48 horas porque ya habían migrado de sistemas legacy" },
      { en: "Digital equity applies to your workforce too — ensure remote workers have reliable internet, ergonomic setups, and technical support", es: "La equidad digital aplica también a su fuerza laboral — asegúrese de que los trabajadores remotos tengan internet confiable, configuraciones ergonómicas y soporte técnico" },
    ],
    sourceMaterials: [
      { label: "Nature: Hybrid Work Reduces Quit Rates 33% (Stanford, 2024)", url: "https://www.nature.com/articles/s41586-024-07500-2" },
      { label: "NACHC 2022 Workforce Survey: 70% Losing 5-25% Staff", url: "https://www.nachc.org/wp-content/uploads/2022/03/NACHC-2022-Workforce-Survey-Full-Report-1.pdf" },
      { label: "Dialpad: Fenway Health Remote Transition Case Study", url: "https://www.dialpad.com/customers/fenway-health/" },
      { label: "California Telehealth Resource Center", url: "https://caltrc.org/" },
    ],
    siteLinks: [
      { label: "Remote Care Operations Guide", href: "/guides" },
      { label: "Telehealth Facilitator Certificate", href: "/certifications" },
      { label: "Fenway Health Case Study", href: "/strategy/guides" },
    ],
    tags: ["remote-work", "hybrid", "telehealth", "workforce-retention", "hipaa", "cloud-infrastructure"],
  },
  {
    id: "retention-machine",
    title: {
      en: "The Retention Machine — Building an FQHC That People Don't Leave",
      es: "La Máquina de Retención — Construyendo un FQHC Que la Gente No Abandona",
    },
    subtitle: {
      en: "Evidence-based strategies for reducing FQHC turnover: career ladders, stay interviews, compensation redesign, burnout prevention, and mission reconnection",
      es: "Estrategias basadas en evidencia para reducir la rotación en FQHCs: escaleras profesionales, entrevistas de permanencia, rediseño de compensación, prevención del agotamiento y reconexión con la misión",
    },
    category: "leadership",
    audience: "hr-workforce",
    difficulty: "intermediate",
    estimatedMinutes: 24,
    recommendedOrder: 4,
    urgencyStat: {
      en: "32% average FQHC turnover — 2x the healthcare industry average",
      es: "32% rotación promedio en FQHCs — 2x el promedio de la industria de salud",
    },
    whyNow: {
      en: "FQHCs are spending $440,000+ to replace a single physician and $22,000+ to replace a Community Health Worker — in an environment where SB 525 wage increases are compressing margins and H.R. 1 threatens Medicaid funding. AltaMed proved that a dedicated retention structure (their Strategic Medical Director Unit) can take Medical Director retention from 30% to 100%, saving $1-1.5M per leader. Career ladder programs show 2.4x the odds of minimal retention difficulty. The most cost-effective dollar an FQHC can spend in 2026 is on keeping the people it already has.",
      es: "Los FQHCs gastan $440,000+ para reemplazar un solo médico y $22,000+ para reemplazar un Promotor de Salud — en un entorno donde los aumentos salariales SB 525 comprimen márgenes y H.R. 1 amenaza los fondos de Medicaid. AltaMed demostró que una estructura de retención dedicada puede llevar la retención de Directores Médicos del 30% al 100%, ahorrando $1-1.5M por líder.",
    },
    learningObjectives: [
      { en: "Calculate your center's true turnover cost by role using SHRM replacement cost multipliers (0.5x–2.0x salary)", es: "Calcule el verdadero costo de rotación de su centro por rol usando multiplicadores de costo de reemplazo SHRM (0.5x–2.0x salario)" },
      { en: "Design role-specific career ladders that give every employee a visible next step — from CHW to Care Coordinator to Program Manager", es: "Diseñe escaleras profesionales específicas por rol que den a cada empleado un siguiente paso visible — de CHW a Coordinador de Cuidado a Gerente de Programa" },
      { en: "Implement stay interviews: quarterly 15-minute conversations that surface retention risks before they become resignations", es: "Implemente entrevistas de permanencia: conversaciones trimestrales de 15 minutos que identifiquen riesgos de retención antes de que se conviertan en renuncias" },
      { en: "Benchmark your total compensation (salary + benefits + mission premium) against hospitals and managed care organizations", es: "Compare su compensación total (salario + beneficios + prima de misión) contra hospitales y organizaciones de atención administrada" },
    ],
    keyTakeaways: [
      { en: "Retention is cheaper than recruitment — one retained physician saves more than three new hires cost", es: "La retención es más barata que el reclutamiento — un médico retenido ahorra más que lo que cuestan tres nuevas contrataciones" },
      { en: "Career ladders aren't just aspirational — FQHCs with structured career progression programs have 2.4x the odds of minimal retention difficulty", es: "Las escaleras profesionales no son solo aspiracionales — los FQHCs con programas estructurados tienen 2.4x las probabilidades de dificultad mínima de retención" },
      { en: "Mission alignment is a retention tool: staff who connect their daily work to patient impact stay longer, even at lower salaries", es: "La alineación con la misión es una herramienta de retención: el personal que conecta su trabajo diario con el impacto en pacientes permanece más tiempo, incluso con salarios más bajos" },
      { en: "Burnout prevention is not self-care workshops — it's workload management, scope clarity, and adequate staffing ratios", es: "La prevención del agotamiento no son talleres de autocuidado — es gestión de carga de trabajo, claridad de alcance y ratios de personal adecuados" },
    ],
    sourceMaterials: [
      { label: "HCAI: AltaMed SMDU — 30% to 100% MD Retention", url: "https://hcai.ca.gov/wp-content/uploads/2024/12/AltaMed-Presentation-Revised.pdf" },
      { label: "PMC: Career Ladders & 2.4x Retention Odds", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5120588/" },
      { label: "NACHC 2022 Workforce Survey", url: "https://www.nachc.org/wp-content/uploads/2022/03/NACHC-2022-Workforce-Survey-Full-Report-1.pdf" },
      { label: "SHRM: Turnover Cost Estimation Guide", url: "https://www.shrm.org/topics-tools/tools/toolkits/managing-employee-turnover" },
    ],
    siteLinks: [
      { label: "Turnover Cost Calculator", href: "/strategy/workforce-resilience" },
      { label: "AltaMed Retention Case Study", href: "/strategy/guides" },
      { label: "Career Roadmap", href: "/career-roadmap" },
    ],
    tags: ["retention", "career-ladders", "stay-interviews", "compensation", "burnout", "turnover-cost"],
  },

  // ─── FINANCIAL RESILIENCE ────────────────────────────────────
  {
    id: "financial-resilience-medicaid",
    title: {
      en: "Financial Resilience Under Medicaid Cuts — A CFO's Survival Playbook",
      es: "Resiliencia Financiera Bajo Recortes de Medicaid — Manual de Supervivencia del CFO",
    },
    subtitle: {
      en: "How to model, prepare for, and survive major Medi-Cal reimbursement cuts while protecting patient access and workforce stability",
      es: "Cómo modelar, prepararse y sobrevivir a recortes importantes de reembolso de Medi-Cal mientras se protege el acceso de pacientes y la estabilidad de la fuerza laboral",
    },
    category: "survival",
    audience: "cfo",
    difficulty: "advanced",
    estimatedMinutes: 26,
    recommendedOrder: 4,
    urgencyStat: {
      en: "$4.6B in CHCF funding expires December 2026",
      es: "$4.6B en financiamiento CHCF expira en diciembre de 2026",
    },
    whyNow: {
      en: "The convergence of CHCF expiration ($4.6B, December 2026), H.R. 1 Medicaid cuts ($880B over 10 years), PPS elimination for undocumented patient services (October 2026), and the provider tax phase-down (2028) creates the most dangerous financial environment in FQHC history. A CPaMB case study showed how one FQHC went from 9 days cash on hand to 56 days through revenue cycle optimization alone. The CFOs who survive 2026-2028 will be the ones who've already built scenario models, diversified revenue, and optimized their revenue cycles.",
      es: "La convergencia de la expiración del CHCF ($4.6B, diciembre 2026), recortes de Medicaid H.R. 1 ($880B en 10 años), eliminación de PPS para servicios a pacientes indocumentados (octubre 2026) y la reducción del impuesto a proveedores (2028) crea el entorno financiero más peligroso en la historia de los FQHCs.",
    },
    learningObjectives: [
      { en: "Build 3 financial scenarios (optimistic, realistic, catastrophic) with specific trigger points for each", es: "Construya 3 escenarios financieros (optimista, realista, catastrófico) con puntos de activación específicos para cada uno" },
      { en: "Calculate your center's Medicaid dependency ratio and model the impact of a 10%, 20%, and 30% reimbursement reduction", es: "Calcule el ratio de dependencia de Medicaid de su centro y modele el impacto de reducciones de reembolso del 10%, 20% y 30%" },
      { en: "Optimize your revenue cycle to capture every dollar you're already earning — reduce days in AR below 40, achieve 95%+ clean claims rate", es: "Optimice su ciclo de ingresos para capturar cada dólar que ya está ganando — reduzca días en AR por debajo de 40, logre tasa de reclamos limpios de 95%+" },
      { en: "Identify and activate 3-5 non-Medicaid revenue streams: 340B optimization, direct-pay services, grant diversification, employer health contracts", es: "Identifique y active 3-5 fuentes de ingresos no-Medicaid: optimización 340B, servicios de pago directo, diversificación de subvenciones, contratos de salud con empleadores" },
      { en: "Prepare the board conversation: present financial scenarios with decision points, not just problems", es: "Prepare la conversación con la junta: presente escenarios financieros con puntos de decisión, no solo problemas" },
    ],
    keyTakeaways: [
      { en: "Revenue cycle optimization is the fastest path to financial resilience — one FQHC doubled cash receipts from $10.7M to $22.5M with the same encounter volume", es: "La optimización del ciclo de ingresos es el camino más rápido a la resiliencia financiera — un FQHC duplicó recibos de $10.7M a $22.5M con el mismo volumen de encuentros" },
      { en: "Scenario planning isn't optional in 2026 — CFOs who present only a single budget to the board are derelict in their duty", es: "La planificación de escenarios no es opcional en 2026 — los CFOs que presentan solo un presupuesto a la junta están incumpliendo su deber" },
      { en: "The most resilient FQHCs keep federal dependency below 30% — but getting there requires a multi-year revenue diversification strategy, not quick fixes", es: "Los FQHCs más resilientes mantienen la dependencia federal por debajo del 30% — pero llegar ahí requiere una estrategia de diversificación de ingresos multianual, no soluciones rápidas" },
    ],
    sourceMaterials: [
      { label: "CPaMB: FQHC Revenue Cycle Transformation (9 to 56 Days Cash)", url: "https://www.cpamedicalbilling.com/wp-content/uploads/2020/05/CPaMB-CaseStudy1.pdf" },
      { label: "KFF: CHC Financing — Medicaid & Section 330", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
      { label: "Commonwealth Fund: Financial Challenges Loom for CHCs", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
      { label: "FQHC Associates: Business Model Analysis", url: "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is" },
    ],
    siteLinks: [
      { label: "Funding Impact Tracker", href: "/funding-impact" },
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Revenue Cycle Case Study", href: "/strategy/guides" },
      { label: "Seven Cliffs Masterclass", href: "/strategy/masterclass" },
    ],
    tags: ["medicaid", "medi-cal", "revenue-cycle", "scenario-planning", "financial-resilience", "340b", "chcf"],
  },

  // ─── SALARY NEGOTIATION (DUAL PERSPECTIVE) ───────────────────
  {
    id: "salary-negotiation-dual-perspective",
    title: {
      en: "Salary Negotiation in FQHCs — The Guide Both Sides Need",
      es: "Negociación Salarial en FQHCs — La Guía que Ambos Lados Necesitan",
    },
    subtitle: {
      en: "HR directors and candidates share the same constraints — PPS caps, SB 525 compliance, grant-funded ceilings — but each side has more leverage than they realize",
      es: "Los directores de RR.HH. y los candidatos comparten las mismas limitaciones — topes PPS, cumplimiento de SB 525, límites financiados por subvenciones — pero cada lado tiene más apalancamiento del que cree",
    },
    category: "leadership",
    audience: "hr-workforce",
    estimatedMinutes: 19,
    recommendedOrder: 5,
    difficulty: "intermediate",
    urgencyStat: {
      en: "SB 525 requires $25/hr minimum for FQHC healthcare workers by Jan 2027 — most FQHCs are not on track",
      es: "SB 525 exige $25/hr de salario mínimo para trabajadores de salud de FQHCs antes de enero 2027 — la mayoría de los FQHCs no están en camino",
    },
    whyNow: {
      en: "Three forces are colliding in 2026: SB 525 is pushing California FQHC minimum wages to $25/hr by January 2027, Medicaid cuts are compressing every FQHC budget, and a workforce shortage means qualified candidates — especially bilingual CHWs, ECM care managers, and RNs — now have real leverage. The FQHCs that will retain staff through the crisis are the ones that stop treating compensation as a budget line item and start treating it as a retention strategy. Meanwhile, candidates who understand PPS reimbursement, grant-funded role constraints, and NHSC loan repayment can negotiate $15,000–$40,000 in total compensation above what HR initially offers — without asking for a dollar more in base salary.",
      es: "Tres fuerzas chocan en 2026: SB 525 está empujando los salarios mínimos de FQHCs en California a $25/hr para enero 2027, los recortes de Medicaid comprimen cada presupuesto FQHC, y la escasez de fuerza laboral significa que los candidatos calificados ahora tienen apalancamiento real. Los FQHCs que retendrán personal a través de la crisis son los que dejan de tratar la compensación como una partida presupuestaria y empiezan a tratarla como una estrategia de retención.",
    },
    learningObjectives: [
      {
        en: "Understand the real FQHC compensation constraints: PPS reimbursement rates, SB 525 compliance timelines, grant-funded salary caps, and union contract floors",
        es: "Comprender las restricciones reales de compensación FQHC: tasas de reembolso PPS, plazos de cumplimiento de SB 525, topes salariales financiados por subvenciones y pisos de contratos sindicales",
      },
      {
        en: "For HR/leaders: build a total compensation strategy that competes with hospital systems without matching their base salaries — loan repayment, bilingual premiums, hybrid schedules, ECM program revenue sharing",
        es: "Para RR.HH./líderes: construir una estrategia de compensación total que compita con los sistemas hospitalarios sin igualar sus salarios base — reembolso de préstamos, primas bilingües, horarios híbridos, participación en ingresos de programas ECM",
      },
      {
        en: "For candidates: identify the 6 FQHC-specific negotiation levers beyond base salary — NHSC/NURSE Corps loan repayment ($25K–$50K), bilingual premiums ($1–3/hr), CME budgets ($1,500–$3,000), CalAIM bonus potential, signing bonuses, and CEU/licensure support",
        es: "Para candidatos: identificar los 6 palancas de negociación específicas de FQHC más allá del salario base — reembolso de préstamos NHSC/NURSE Corps ($25K–$50K), primas bilingües ($1–3/hr), presupuestos CME ($1,500–$3,000), potencial de bonos CalAIM, bonos de firma y apoyo de CEU/licencias",
      },
      {
        en: "Navigate union vs. non-union dynamics: what's negotiable when SEIU/NUHW contracts define wages, and how to negotiate step increases, differentials, and non-wage benefits",
        es: "Navegar la dinámica sindical vs. no sindical: qué es negociable cuando los contratos SEIU/NUHW definen los salarios, y cómo negociar aumentos escalonados, diferenciales y beneficios no salariales",
      },
      {
        en: "Apply the FQHC Retention ROI formula: calculate the full cost of turnover for each role (1.5–2× annual salary) and use it to justify higher compensation to reluctant boards",
        es: "Aplicar la fórmula de ROI de retención FQHC: calcular el costo total de rotación para cada puesto (1.5–2× salario anual) y usarlo para justificar una compensación más alta ante juntas renuentes",
      },
    ],
    keyTakeaways: [
      {
        en: "The most powerful negotiation lever for FQHC candidates isn't salary — it's NHSC loan repayment. A CHW with $40K in student loans who joins an NHSC-approved site gets that debt erased in 2 years. That's $20K/year in value that never appears on the offer letter.",
        es: "El palanca de negociación más poderosa para los candidatos de FQHC no es el salario — es el reembolso de préstamos NHSC. Un CHW con $40K en préstamos estudiantiles que se une a un sitio aprobado por NHSC obtiene esa deuda eliminada en 2 años. Eso es un valor de $20K/año que nunca aparece en la carta de oferta.",
      },
      {
        en: "HR directors: stop quoting base salary first. Lead with total compensation — PTO, NHSC eligibility, CalPERS/403(b) match, bilingual premium, tuition reimbursement. A $62K base at an NHSC-approved FQHC with loan repayment and CalPERS beats a $72K hospital offer for any candidate with student debt.",
        es: "Directores de RR.HH.: dejen de cotizar el salario base primero. Lideren con compensación total — PTO, elegibilidad NHSC, aportación CalPERS/403(b), prima bilingüe, reembolso de matrícula. Un salario base de $62K en un FQHC aprobado por NHSC con reembolso de préstamos y CalPERS supera una oferta hospitalaria de $72K para cualquier candidato con deuda estudiantil.",
      },
      {
        en: "SB 525 isn't just a compliance burden — it's a forcing function to restructure your compensation bands correctly. FQHCs that get ahead of it now will recruit better; those that scramble in 2026 will lose their best staff during the compliance transition.",
        es: "SB 525 no es solo una carga de cumplimiento — es una función forzosa para reestructurar correctamente sus bandas salariales. Los FQHCs que se adelanten ahora reclutarán mejor; los que se apresuren en 2026 perderán a su mejor personal durante la transición de cumplimiento.",
      },
      {
        en: "Where the real tension lives: grant-funded roles (CHW, care coordinator, outreach worker) have salary caps tied to the grant budget. HR can't simply 'go up' — but can often reclassify the role, shift funding sources, or add a non-grant-funded stipend for specific skills (bilingual, specialty training).",
        es: "Donde vive la tensión real: los roles financiados por subvenciones (CHW, coordinador de atención, trabajador de divulgación) tienen topes salariales vinculados al presupuesto de la subvención. RR.HH. no puede simplemente 'subir' — pero a menudo puede reclasificar el puesto, cambiar fuentes de financiamiento o agregar un estipendio no financiado por subvenciones para habilidades específicas (bilingüe, capacitación especializada).",
      },
    ],
    sourceMaterials: [
      {
        label: "NHSC Loan Repayment Program — HRSA (2025 Award Amounts)",
        url: "https://nhsc.hrsa.gov/loan-repayment/nhsc-loan-repayment-program",
      },
      {
        label: "California SB 525 Healthcare Minimum Wage — HCAI Implementation",
        url: "https://hcai.ca.gov/workforce/sb-525/",
      },
      {
        label: "NACHC: CHC Workforce Compensation Survey",
        url: "https://www.nachc.org/topic/workforce/",
      },
      {
        label: "HRSA: Nurse Corps Loan Repayment Program",
        url: "https://bhw.hrsa.gov/funding/apply-scholarship-loan-repayment/nurse-corps",
      },
      {
        label: "CalHR: CalPERS Retirement Benefit Calculator",
        url: "https://www.calpers.ca.gov/page/members/retirement/retirement-estimate-calculator",
      },
      {
        label: "SEIU 2026 Contract Tracker — Healthcare Workers",
        url: "https://www.seiu-uhw.org/",
      },
    ],
    siteLinks: [
      { label: "Salary Intelligence", href: "/salary-data" },
      { label: "Career Roadmap", href: "/career-roadmap" },
      { label: "Certifications Catalog", href: "/certifications" },
      { label: "Career Resources (Loan Repayment)", href: "/resources" },
      { label: "Scope of Practice Guide", href: "/strategy/scope-of-practice" },
    ],
    tags: ["salary", "compensation", "negotiation", "sb-525", "nhsc", "loan-repayment", "bilingual-premium", "union", "retention", "hr"],
  },

  // ── Compliance Masterclasses (4 modules) ──────────────────────

  {
    id: "hipaa-at-scale",
    title: { en: "HIPAA at Scale: From 1 Breach to 1,000 Notifications", es: "HIPAA a Escala: De 1 Violación a 1,000 Notificaciones" },
    subtitle: { en: "The true cost of data breaches — and how to prevent them", es: "El verdadero costo de las violaciones de datos — y cómo prevenirlas" },
    category: "compliance",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 22,
    recommendedOrder: 1,
    urgencyStat: { en: "$890K: Average FQHC ransomware incident cost (2025)", es: "$890K: Costo promedio de incidente de ransomware en FQHC (2025)" },
    whyNow: { en: "Healthcare ransomware attacks increased 256% from 2022 to 2025. FQHCs are prime targets: underfunded IT, legacy systems, and rich patient data. The HIPAA Security Rule update (proposed 2026) will mandate encryption, MFA, and annual penetration testing — significantly raising compliance costs. FQHCs that prepare now will avoid scrambling when the final rule drops.", es: "Los ataques de ransomware en salud aumentaron 256% de 2022 a 2025. Los FQHC son objetivos principales: TI subfinanciada, sistemas legados y datos ricos de pacientes." },
    learningObjectives: [
      { en: "Conduct a HIPAA security risk assessment using the HHS SRA Tool", es: "Realizar una evaluación de riesgos de seguridad HIPAA usando la Herramienta SRA del HHS" },
      { en: "Build a breach response protocol that meets the 60-day notification deadline", es: "Construir un protocolo de respuesta a violaciones que cumpla con el plazo de notificación de 60 días" },
      { en: "Inventory all vendors handling PHI and ensure BAA coverage", es: "Inventariar todos los proveedores que manejan PHI y asegurar cobertura de BAA" },
      { en: "Calculate the true cost of a breach vs. the cost of prevention", es: "Calcular el verdadero costo de una violación vs. el costo de prevención" },
    ],
    keyTakeaways: [
      { en: "A 1,000-patient breach costs $100K+ in notifications alone — prevention costs $10-20K/year", es: "Una violación de 1,000 pacientes cuesta $100K+ solo en notificaciones — la prevención cuesta $10-20K/año" },
      { en: "Missing BAA = automatic HIPAA violation if that vendor has a breach", es: "BAA faltante = violación automática de HIPAA si ese proveedor tiene una violación" },
      { en: "Air-gapped backups are the single most important ransomware defense", es: "Los respaldos aislados son la defensa más importante contra ransomware" },
    ],
    sourceMaterials: [
      { label: "HHS HIPAA Security Rule", url: "https://www.hhs.gov/hipaa/for-professionals/security/index.html" },
      { label: "HHS Security Risk Assessment Tool", url: "https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool" },
      { label: "HHS Breach Portal", url: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf" },
    ],
    siteLinks: [
      { label: "HIPAA Compliance Guide", href: "/compliance/hipaa" },
      { label: "Risk Assessment Matrix", href: "/compliance" },
      { label: "Compliance Calendar", href: "/compliance/calendar" },
    ],
    tags: ["hipaa", "breach", "ransomware", "security", "risk-assessment", "baa", "encryption"],
  },
  {
    id: "osv-survival-guide",
    title: { en: "The OSV Survival Guide: 19 Requirements, 90 Days to Prepare", es: "Guía de Supervivencia OSV: 19 Requisitos, 90 Días para Prepararse" },
    subtitle: { en: "How to pass your HRSA Operational Site Visit — even on short notice", es: "Cómo pasar su Visita Operativa de HRSA — incluso con poco aviso" },
    category: "compliance",
    audience: "ceo-coo",
    difficulty: "intermediate",
    estimatedMinutes: 19,
    recommendedOrder: 2,
    urgencyStat: { en: "3-4 gaps are normal; corrective action is not a shutdown", es: "3-4 brechas son normales; la acción correctiva no es un cierre" },
    whyNow: { en: "HRSA has accelerated OSV schedules for crisis-impacted FQHCs. With H.R. 1 Medicaid cuts and California's PPS elimination for uninsured patients, HRSA is paying closer attention to financial viability and governance. FQHCs that haven't been visited in 4+ years should expect a visit soon. The OSV checklist is your blueprint.", es: "HRSA ha acelerado los calendarios de OSV para FQHCs impactados por la crisis. Con los recortes de Medicaid de H.R. 1, HRSA está prestando más atención a la viabilidad financiera y gobernanza." },
    learningObjectives: [
      { en: "Self-assess against all 19 HRSA program requirements", es: "Auto-evaluarse contra los 19 requisitos del programa HRSA" },
      { en: "Prioritize remediation: governance > clinical > financial > operational", es: "Priorizar remediación: gobernanza > clínico > financiero > operativo" },
      { en: "Build an evidence portfolio that passes audit on first review", es: "Construir un portafolio de evidencia que pase la auditoría en la primera revisión" },
      { en: "Develop a 90-day sprint plan for OSV preparation", es: "Desarrollar un plan de sprint de 90 días para preparación de OSV" },
    ],
    keyTakeaways: [
      { en: "Board composition (51% consumer) is the #1 finding — verify patient status annually", es: "La composición de la junta (51% consumidor) es el hallazgo #1 — verificar estado de paciente anualmente" },
      { en: "Documentation gaps in credentialing and QI are the most common clinical findings", es: "Las brechas de documentación en acreditación y QI son los hallazgos clínicos más comunes" },
      { en: "Self-disclosure before the OSV is always better than discovery during the visit", es: "La auto-divulgación antes de la OSV siempre es mejor que el descubrimiento durante la visita" },
    ],
    sourceMaterials: [
      { label: "HRSA Compliance Manual", url: "https://bphc.hrsa.gov/compliance/compliance-manual" },
      { label: "HRSA UDS Resources", url: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance" },
    ],
    siteLinks: [
      { label: "OSV Prep Checklist (19 Requirements)", href: "/compliance/hrsa-audits" },
      { label: "Download OSV Excel Checklist", href: "/compliance" },
      { label: "Executive Guides", href: "/strategy/guides" },
    ],
    tags: ["osv", "hrsa", "site-visit", "governance", "board", "credentialing", "quality", "audit"],
  },
  {
    id: "billing-compliance-revenue-assurance",
    title: { en: "Billing Compliance: From False Claims Risk to Revenue Assurance", es: "Cumplimiento de Facturación: Del Riesgo de Reclamos Falsos a la Seguridad de Ingresos" },
    subtitle: { en: "How to maximize FQHC revenue without crossing compliance lines", es: "Cómo maximizar los ingresos de FQHC sin cruzar líneas de cumplimiento" },
    category: "compliance",
    audience: "cfo",
    difficulty: "advanced",
    estimatedMinutes: 25,
    recommendedOrder: 3,
    urgencyStat: { en: "$27,894: Maximum penalty per false claim (2026 inflation adjustment)", es: "$27,894: Sanción máxima por reclamo falso (ajuste por inflación 2026)" },
    whyNow: { en: "CMS Recovery Audit Contractors are actively auditing FQHC claims. With revenue pressure from H.R. 1 and California's UIS PPS elimination, FQHCs face a dangerous temptation to optimize billing aggressively. One billing error can cascade: a single false claim triggers $27,894 in penalties plus treble damages. Self-disclosure to OIG can reduce exposure by 90%+.", es: "Los Auditores de Recuperación de CMS están auditando activamente los reclamos de FQHC. Con la presión de ingresos, los FQHC enfrentan una tentación peligrosa de optimizar facturación agresivamente." },
    learningObjectives: [
      { en: "Master FQHC-specific PPS billing rules (same-day, incident-to prohibition, modifiers)", es: "Dominar las reglas de facturación PPS específicas de FQHC" },
      { en: "Build a documentation audit process that catches errors before payers do", es: "Construir un proceso de auditoría de documentación que detecte errores antes que los pagadores" },
      { en: "Understand False Claims Act liability and whistleblower protections", es: "Entender la responsabilidad de la Ley de Reclamos Falsos y protecciones de denunciantes" },
      { en: "Implement a coding accuracy program with annual 10% sample audits", es: "Implementar un programa de precisión de codificación con auditorías anuales de muestra del 10%" },
    ],
    keyTakeaways: [
      { en: "FQHCs CANNOT bill incident-to — this is the #1 billing compliance failure", es: "Los FQHC NO PUEDEN facturar incident-to — esta es la falla #1 de cumplimiento de facturación" },
      { en: "Self-disclosure to OIG reduced one FQHC's exposure from $4.2M to $302K", es: "La auto-divulgación al OIG redujo la exposición de un FQHC de $4.2M a $302K" },
      { en: "A 5% denial rate on $20M revenue = $1M at risk annually", es: "Una tasa de denegación del 5% sobre $20M de ingresos = $1M en riesgo anualmente" },
    ],
    sourceMaterials: [
      { label: "CMS FQHC PPS Guide", url: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/FQHCPPS" },
      { label: "DOJ False Claims Act Statistics", url: "https://www.justice.gov/civil/fraud-statistics" },
      { label: "OIG Self-Disclosure Info", url: "https://oig.hhs.gov/compliance/self-disclosure-info/" },
    ],
    siteLinks: [
      { label: "Billing Compliance Guide", href: "/compliance/billing" },
      { label: "Compliance Calendar", href: "/compliance/calendar" },
      { label: "Clinic Simulator", href: "/strategy/clinic-simulator" },
    ],
    tags: ["billing", "false-claims", "pps", "coding", "documentation", "audit", "self-disclosure", "oig"],
  },
  {
    id: "340b-compliance-audit-prevention",
    title: { en: "340B Program Compliance & Audit Prevention", es: "Cumplimiento del Programa 340B y Prevención de Auditorías" },
    subtitle: { en: "Protect your most valuable drug pricing benefit", es: "Proteja su beneficio de precios de medicamentos más valioso" },
    category: "compliance",
    audience: "cfo",
    difficulty: "intermediate",
    estimatedMinutes: 17,
    recommendedOrder: 4,
    urgencyStat: { en: "25-50% drug cost savings at risk if 340B eligibility is lost", es: "25-50% de ahorro en costos de medicamentos en riesgo si se pierde la elegibilidad 340B" },
    whyNow: { en: "HRSA proposed new 340B integrity rules in 2026. Manufacturer audits are increasing — pharmaceutical companies are challenging 340B eligibility and contract pharmacy arrangements. A duplicate discount violation (receiving 340B price AND Medicaid rebate) can result in repayment, program removal, and False Claims Act liability. FQHCs generating $200K-$2M+ annually from 340B cannot afford to lose this revenue.", es: "HRSA propuso nuevas reglas de integridad 340B en 2026. Las auditorías de fabricantes están aumentando. Una violación de descuento duplicado puede resultar en reembolso, remoción del programa y responsabilidad FCA." },
    learningObjectives: [
      { en: "Define 340B eligible patients and implement verification processes", es: "Definir pacientes elegibles 340B e implementar procesos de verificación" },
      { en: "Prevent duplicate discounts through split billing or Medicaid exclusion files", es: "Prevenir descuentos duplicados a través de facturación dividida o archivos de exclusión de Medicaid" },
      { en: "Prepare for HRSA and manufacturer audits with monthly reconciliation", es: "Prepararse para auditorías de HRSA y fabricantes con reconciliación mensual" },
      { en: "Evaluate contract pharmacy arrangements against current HRSA guidance", es: "Evaluar arreglos de farmacia contratada contra la guía actual de HRSA" },
    ],
    keyTakeaways: [
      { en: "Monthly 340B/Medicaid reconciliation is non-negotiable — quarterly is too late", es: "La reconciliación mensual 340B/Medicaid es innegociable — trimestralmente es demasiado tarde" },
      { en: "Contract pharmacy arrangements are the #1 source of 340B audit findings", es: "Los arreglos de farmacia contratada son la fuente #1 de hallazgos de auditoría 340B" },
      { en: "One Bay Area FQHC repaid $156K in duplicate discounts — monthly audits now catch errors within 30 days", es: "Un FQHC del Área de la Bahía reembolsó $156K en descuentos duplicados — las auditorías mensuales ahora detectan errores dentro de 30 días" },
    ],
    sourceMaterials: [
      { label: "HRSA 340B Program", url: "https://www.hrsa.gov/opa/340b-drug-pricing-program" },
      { label: "340B Drug Pricing Program Statute", url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section256b" },
    ],
    siteLinks: [
      { label: "Billing Compliance Guide", href: "/compliance/billing" },
      { label: "Risk Assessment Matrix", href: "/compliance" },
      { label: "Knowledge Base", href: "/compliance/knowledge-base" },
    ],
    tags: ["340b", "pharmacy", "duplicate-discount", "contract-pharmacy", "audit", "compliance", "revenue"],
  },

  // ─── WORKER SAFETY & COMPLIANCE ────────────────────────────────
  {
    id: "reducing-workers-comp-costs",
    title: {
      en: "Reducing Workers Comp Costs: The FQHC Playbook",
      es: "Reduciendo Costos de Compensación de Trabajadores: El Cuaderno de Juego de FQHC",
    },
    subtitle: {
      en: "Back injuries, workplace violence, and needlestick injuries cost CA FQHCs $180K-$350K/year. SB 553 mandates violence prevention. Learn the 3 levers of cost control.",
      es: "Las lesiones de espalda, violencia laboral e injuries por pinchazo de aguja cuestan a los FQHCs de CA $180K-$350K/año. SB 553 ordena prevención de violencia. Aprenda los 3 mecanismos de control de costos.",
    },
    category: "compliance",
    audience: "cfo",
    difficulty: "intermediate",
    estimatedMinutes: 16,
    recommendedOrder: 5,
    urgencyStat: {
      en: "Healthcare workers comp claims cost CA FQHCs $180K-$350K/year on average",
      es: "Las reclamaciones de compensación de trabajadores en salud cuestan a los FQHCs de CA un promedio de $180K-$350K/año",
    },
    whyNow: {
      en: "Back injuries, workplace violence, and needlestick injuries are the top 3 claims. SB 553 mandates violence prevention plans. Cal/OSHA inspections are up 23% for healthcare. Your workers comp premium is a controllable cost — every prevented injury saves your FQHC $15K-$45K in claims and lost productivity.",
      es: "Las lesiones de espalda, violencia en el lugar de trabajo y heridas por pinchazo de aguja son las 3 principales reclamaciones. SB 553 ordena planes de prevención de violencia. Las inspecciones de Cal/OSHA aumentaron 23% en salud. Su prima de compensación es un costo controlable — cada lesión prevenida ahorra a su FQHC $15K-$45K en reclamaciones y productividad perdida.",
    },
    learningObjectives: [
      { en: "Identify the top 3 injury types at FQHCs and implement prevention protocols for each", es: "Identifique los 3 tipos principales de lesiones en FQHCs e implemente protocolos de prevención para cada una" },
      { en: "Build a cost calculator: injury type × frequency × average cost = savings opportunity", es: "Construya una calculadora de costos: tipo de lesión × frecuencia × costo promedio = oportunidad de ahorro" },
      { en: "Calculate the ROI of ergonomic upgrades, de-escalation training, and sharps safety systems", es: "Calcule el ROI de mejoras ergonómicas, capacitación en des-escalada y sistemas de seguridad de punzocortantes" },
      { en: "Develop an EMR flagging system to identify high-risk patients and trigger violence prevention protocols", es: "Desarrolle un sistema de banderas EMR para identificar pacientes de alto riesgo y activar protocolos de prevención de violencia" },
    ],
    keyTakeaways: [
      { en: "Three prevention levers move the needle: (1) Ergonomic engineering (lift assists, proper workstations), (2) De-escalation training (verbal tools, early interventions), (3) Technology (panic buttons, security glass, sharps safety)", es: "Tres mecanismos de prevención hacen la diferencia: (1) Ingeniería ergonómica, (2) Capacitación en des-escalada, (3) Tecnología" },
      { en: "SB 553 compliance isn't just legal risk — FQHCs with documented violence prevention plans pay 15-25% lower premiums", es: "El cumplimiento de SB 553 no es solo riesgo legal — los FQHCs con planes documentados de prevención de violencia pagan primas 15-25% más bajas" },
      { en: "One Central Coast FQHC prevented 8 back injuries in 2 years through seated exams + proper MAs + massage therapy benefit = $120K saved in claims", es: "Un FQHC de la Costa Central previno 8 lesiones de espalda en 2 años a través de exámenes sentados + MAs apropiados + beneficio de masaje = $120K ahorrados en reclamaciones" },
    ],
    sourceMaterials: [
      { label: "Cal/OSHA: Healthcare Worker Safety Resources", url: "https://www.dir.ca.gov/dosh/puborder.asp" },
      { label: "BLS: Nonfatal Occupational Injury & Illness Rates (Healthcare)", url: "https://www.bls.gov/iif/oshsum.htm#healthcare" },
      { label: "NCCI: Workers Comp Statistics for Healthcare", url: "https://www.ncci.com/documents/research-publications" },
      { label: "California Department of Industrial Relations: SB 553 Guidelines", url: "https://www.dir.ca.gov/dosh/workplace-violence-prevention-in-healthcare.html" },
    ],
    siteLinks: [
      { label: "Workers Comp Compliance Tool", href: "/compliance/workers-comp" },
      { label: "Risk Assessment Matrix", href: "/strategy/resilience" },
    ],
    tags: ["workers-comp", "workplace-violence", "ergonomics", "sb553", "safety-culture", "compliance", "cost-control"],
  },
  {
    id: "preventing-workplace-violence",
    title: {
      en: "Preventing Workplace Violence in Healthcare",
      es: "Previniendo Violencia en el Lugar de Trabajo en Salud",
    },
    subtitle: {
      en: "Healthcare workers are 5x more likely to experience workplace violence than workers in other industries. SB 553 requires a plan. Here's how to implement one that actually works.",
      es: "Los trabajadores de salud tienen 5 veces más probabilidad de experimentar violencia en el lugar de trabajo que trabajadores en otras industrias. SB 553 lo requiere. Así es cómo implementar uno que funciona realmente.",
    },
    category: "compliance",
    audience: "all-leaders",
    difficulty: "foundational",
    estimatedMinutes: 14,
    recommendedOrder: 6,
    urgencyStat: {
      en: "Healthcare workers are 5x more likely to experience workplace violence than workers in other industries",
      es: "Los trabajadores de salud tienen 5 veces más probabilidad de experimentar violencia en el lugar de trabajo que otros trabajadores",
    },
    whyNow: {
      en: "SB 553 (2023) mandates all healthcare employers in California implement comprehensive workplace violence prevention plans by 2024. FQHC patients — people in crisis, experiencing substance use disorder, mental health emergencies, homelessness — are more likely to escalate. Your staff needs practical de-escalation tools, clear reporting pathways, and management support. Violence isn't just a safety issue — it causes turnover and burnout.",
      es: "SB 553 (2023) ordena que todos los empleadores de salud en California implementen planes comprensivos de prevención de violencia laboral. Los pacientes FQHC — personas en crisis, con trastorno de uso de sustancias — tienen más probabilidad de escalar. Su personal necesita herramientas prácticas de des-escalada, rutas claras de reporte y apoyo gerencial.",
    },
    learningObjectives: [
      { en: "Understand the 3 types of workplace violence and how they differ by healthcare setting", es: "Comprenda los 3 tipos de violencia laboral y cómo difieren por entorno de salud" },
      { en: "Teach de-escalation techniques: verbal redirection, boundary-setting, environmental management", es: "Enseñe técnicas de des-escalada: redirección verbal, establecimiento de límites, gestión ambiental" },
      { en: "Build a SB 553-compliant violence prevention plan with risk assessment, policies, and staff training", es: "Construya un plan de prevención de violencia conforme a SB 553 con evaluación de riesgos, políticas y capacitación de personal" },
      { en: "Create clear reporting, investigation, and support pathways when incidents occur", es: "Cree rutas claras de reporte, investigación y apoyo cuando ocurren incidentes" },
    ],
    keyTakeaways: [
      { en: "De-escalation is a learned skill — 80% of violence can be prevented with early verbal intervention", es: "La des-escalada es una habilidad aprendida — el 80% de la violencia puede prevenirse con intervención verbal temprana" },
      { en: "SB 553 requires: (1) Written plan, (2) Hazard assessment, (3) Policies on reporting/investigation, (4) Staff training (min 2 hrs/yr), (5) Equipment/procedures for emergencies", es: "SB 553 requiere: (1) Plan escrito, (2) Evaluación de peligros, (3) Políticas de reporte, (4) Capacitación de personal, (5) Equipamiento para emergencias" },
      { en: "FQHCs that offer post-incident support (counseling, time off, peer support) see 40% fewer repeat incidents", es: "Los FQHCs que ofrecen apoyo post-incidente ven 40% menos incidentes repetidos" },
    ],
    sourceMaterials: [
      { label: "California SB 553: Workplace Violence Prevention for Healthcare", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB553" },
      { label: "Cal/OSHA Standards for Workplace Violence Prevention", url: "https://www.dir.ca.gov/dosh/workplace-violence.html" },
      { label: "NIOSH Workplace Violence Prevention Resources", url: "https://www.cdc.gov/niosh/topics/violence/default.html" },
      { label: "OSHA Best Practices for Healthcare Violence Prevention", url: "https://www.osha.gov/dsg/hospitals/documents/HealthCareGuidelines.pdf" },
    ],
    siteLinks: [
      { label: "Workers Comp Reduction Guide", href: "/guides" },
      { label: "Risk Assessment Tool", href: "/strategy/resilience" },
    ],
    tags: ["workplace-violence", "sb553", "de-escalation", "staff-safety", "compliance", "mental-health", "patient-safety"],
  },
  {
    id: "building-safety-culture",
    title: {
      en: "Building a Safety Culture: From Reactive to Proactive",
      es: "Construyendo una Cultura de Seguridad: De Reactivo a Proactivo",
    },
    subtitle: {
      en: "Most FQHCs respond to incidents. Great FQHCs prevent them. Learn how to build a culture where safety ownership is everyone's job.",
      es: "La mayoría de los FQHCs responden a incidentes. Los grandes FQHCs los previenen. Aprenda cómo construir una cultura donde la responsabilidad de seguridad es trabajo de todos.",
    },
    category: "leadership",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 21,
    recommendedOrder: 6,
    urgencyStat: {
      en: "FQHCs with safety committees report 35% fewer lost-time injuries than those without",
      es: "Los FQHCs con comités de seguridad reportan 35% menos lesiones con pérdida de tiempo que los que no los tienen",
    },
    whyNow: {
      en: "IIPP (Injury and Illness Prevention Program) requirements go beyond SB 553. Your safety culture — how leadership talks about safety, how near-misses are handled, how workers feel empowered to speak up — is the strongest predictor of actual injury reduction. Companies with mature safety cultures spend less on workers comp, have better retention, and see fewer OSHA citations.",
      es: "Los requisitos de IIPP van más allá de SB 553. Su cultura de seguridad — cómo el liderazgo habla sobre seguridad, cómo se manejan los incidentes cercanos — es el predictor más fuerte de reducción real de lesiones.",
    },
    learningObjectives: [
      { en: "Understand IIPP requirements: written plan, hazard assessment, training, worker participation, and continuous improvement", es: "Comprenda los requisitos de IIPP: plan escrito, evaluación de peligros, capacitación y mejora continua" },
      { en: "Build a safety committee with frontline representation and empower them to identify hazards", es: "Construya un comité de seguridad con representación de primera línea y empodérelos para identificar peligros" },
      { en: "Shift from lagging indicators (injuries per month) to leading indicators (near-miss reports, safety audits, training completion)", es: "Cambie de indicadores de retraso (lesiones por mes) a indicadores principales (reportes de incidentes cercanos)" },
      { en: "Create a non-punitive near-miss reporting system that generates continuous improvement insights", es: "Cree un sistema no punitivo de reporte de incidentes cercanos que genere perspectivas de mejora continua" },
    ],
    keyTakeaways: [
      { en: "Safety culture is built top-down: CEOs who visibly prioritize safety (attend safety meetings, enforce protocols, celebrate improvements) create 50% fewer incidents", es: "La cultura de seguridad se construye de arriba hacia abajo: los CEOs que priorizan visiblemente la seguridad crean 50% menos incidentes" },
      { en: "Near-miss reporting (incidents that could have caused harm) is more valuable than injury reporting — you learn without paying the price", es: "El reporte de incidentes cercanos es más valioso que el reporte de lesiones — aprende sin pagar el precio" },
      { en: "One Mid-Valley FQHC went from 12 injuries/year to 1 injury/year in 3 years by implementing a safety committee, monthly hazard walkthroughs, and peer recognition program", es: "Un FQHC de Mid-Valley fue de 12 lesiones/año a 1 lesión/año en 3 años mediante implementación de comité de seguridad" },
    ],
    sourceMaterials: [
      { label: "OSHA 1904: Recording and Reporting Occupational Injuries", url: "https://www.osha.gov/recordkeeping/1904" },
      { label: "OSHA IIPP Guidelines for Healthcare", url: "https://www.osha.gov/dsg/hospitals/documents/1.4_Guidelines_for_ADL.pdf" },
      { label: "National Safety Council: Culture of Safety Toolkit", url: "https://www.nsc.org/workplace/safety-culture" },
      { label: "California DIR: Injury and Illness Prevention Program (IIPP)", url: "https://www.dir.ca.gov/DOSH/etools/09-031/" },
    ],
    siteLinks: [
      { label: "Workers Comp Reduction Guide", href: "/guides" },
      { label: "Compliance Scorecard", href: "/strategy/resilience" },
    ],
    tags: ["safety-culture", "iipp", "near-miss", "incident-prevention", "leadership", "compliance", "continuous-improvement"],
  },
  {
    id: "sb525-wage-strategy",
    title: {
      en: "SB 525 Compliance & Wage Strategy for FQHCs",
      es: "Cumplimiento de SB 525 y Estrategia Salarial para FQHCs",
    },
    subtitle: {
      en: "SB 525 raises FQHC minimum wage to $25/hour by June 2026 — affecting 60% of support staff. Learn how to budget, phase implementation, and manage wage compression.",
      es: "SB 525 aumenta el salario mínimo FQHC a $25/hora para junio de 2026 — afectando a 60% del personal de apoyo. Aprenda cómo presupuestar, implementar en fases y gestionar la compresión salarial.",
    },
    category: "compliance",
    audience: "cfo",
    difficulty: "intermediate",
    estimatedMinutes: 20,
    recommendedOrder: 7,
    urgencyStat: {
      en: "SB 525 raises FQHC minimum wage to $25/hr by June 2026 — affecting 60% of support staff",
      es: "SB 525 aumenta el salario mínimo FQHC a $25/hora para junio de 2026 — afectando a 60% del personal de apoyo",
    },
    whyNow: {
      en: "SB 525 is THE defining cost pressure for CA FQHCs in 2026. A 200-person FQHC with 40% below-$25 staff sees a $2.1M annual increase. This hits hardest: MAs, CHWs, front desk, billing coders, housekeeping. But wage compression is the hidden cost — if your RN was at $32, you now have to increase her too or create resentment. FQHCs have 10 levers: efficiency gains, clinical redesign, revenue diversification, attrition management, and strategic raises. The question isn't whether you can afford SB 525 — it's how to fund it without destroying your margin.",
      es: "SB 525 es la presión de costo definitiva para los FQHCs de CA en 2026. Un FQHC de 200 personas con 40% por debajo de $25 ve un aumento anual de $2.1M. Esto golpea más fuerte: MAs, CHWs, recepción, coders de facturación. Pero la compresión salarial es el costo oculto — si su RN estaba en $32, ahora tiene que aumentarla también o crear resentimiento.",
    },
    learningObjectives: [
      { en: "Calculate your SB 525 cost impact: current wage distribution + headcount by role = total cost increase", es: "Calcule su impacto de costo de SB 525: distribución salarial actual + conteo de personal por rol = aumento de costo total" },
      { en: "Model a 3-phase implementation: Jan 2025 (initial), Jan 2026 (middle), June 2026 (final) to spread impact", es: "Modele una implementación de 3 fases: enero 2025 (inicial), enero 2026 (media), junio 2026 (final) para distribuir impacto" },
      { en: "Develop a wage compression mitigation strategy: identify at-risk roles, plan preventive raises, communicate transparently", es: "Desarrolle una estrategia de mitigación de compresión salarial: identifique roles en riesgo, planifique aumentos preventivos" },
      { en: "Explore revenue pathways to fund SB 525: billing efficiency, higher coding levels, program expansion, productivity gains", es: "Explore rutas de ingresos para financiar SB 525: eficiencia de facturación, niveles de codificación más altos, expansión de programas" },
    ],
    keyTakeaways: [
      { en: "SB 525 cost = (new $25 wage - current wage) × headcount of current sub-$25 employees. Budget contingency of 10-15% for wage compression ripple effects.", es: "Costo de SB 525 = (nuevo salario $25 - salario actual) × conteo de cabezas de empleados actuales menores de $25. Presupueste contingencia del 10-15% para efectos de compresión salarial." },
      { en: "Wage compression hits hardest at years 2-3 of MA/RN/NP ladder — be proactive or face retention crisis", es: "La compresión salarial golpea más fuerte en años 2-3 de la escalera MA/RN/NP — sea proactivo o enfrente crisis de retención" },
      { en: "One North State FQHC funded SB 525 through 8% visit productivity gain (EHR optimization) + 3% billing code shift (RN co-visits) + 2% PPS rate increase = no margin cut", es: "Un FQHC de North State financió SB 525 a través de ganancia de productividad del 8% + cambio de código de facturación del 3% + aumento de tasa de PPS del 2%" },
    ],
    sourceMaterials: [
      { label: "California SB 525: Healthcare Worker Minimum Wage", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB525" },
      { label: "State of California Department of Industrial Relations: SB 525 Implementation", url: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm" },
      { label: "California Hospital Association: SB 525 Economic Impact Analysis", url: "https://www.calhospital.org/" },
      { label: "NACHC: SB 525 Implications for FQHC Sustainability", url: "https://www.nachc.org/" },
    ],
    siteLinks: [
      { label: "Salary Intelligence Data", href: "/salary-data" },
      { label: "Wage Compression Tool", href: "/strategy/revenue-simulator" },
      { label: "Strategic Planning Guides", href: "/strategy/guides" },
    ],
    tags: ["sb525", "minimum-wage", "wage-compression", "budget-planning", "compliance", "fqhc-sustainability", "workforce-costs"],
  },
  {
    id: "nlrb-worker-rights",
    title: {
      en: "Worker Rights & the NLRB: What FQHC Leaders Must Know",
      es: "Derechos de los Trabajadores y el NLRB: Lo Que Los Líderes FQHC Deben Saber",
    },
    subtitle: {
      en: "NLRB healthcare cases in CA increased 34% since 2022. Understand protected concerted activity, union organizing, Weingarten rights, and common employer mistakes.",
      es: "Los casos de salud del NLRB en CA aumentaron 34% desde 2022. Comprenda actividad concertada protegida, organización sindical y errores comunes del empleador.",
    },
    category: "compliance",
    audience: "ceo-coo",
    difficulty: "advanced",
    estimatedMinutes: 24,
    recommendedOrder: 8,
    urgencyStat: {
      en: "NLRB healthcare cases in CA increased 34% since 2022",
      es: "Los casos de salud del NLRB en CA aumentaron 34% desde 2022",
    },
    whyNow: {
      en: "With 10 CA FQHCs now unionized (NUHW, SEIU locals) and healthcare workers increasingly organized, FQHC leadership needs to understand the rules of engagement. Protected concerted activity (Section 7 of NLRA) covers far more than formal union organizing — it includes informal conversations about wages, benefits, working conditions. Many FQHCs inadvertently violate NLRB rules by: (1) Prohibiting off-duty organizing, (2) Disciplining workers for union conversations, (3) Retaliating against union supporters. Understanding Weingarten rights (the right to union representation in investigatory interviews) is essential. This isn't about preventing unionization — it's about managing it legally.",
      es: "Con 10 FQHCs de CA ahora sindicalizados (NUHW, locales de SEIU) y trabajadores de salud cada vez más organizados, el liderazgo FQHC necesita entender las reglas de juego. Actividad concertada protegida cubre mucho más que la organización sindical formal — incluye conversaciones informales sobre salarios, beneficios. Muchos FQHCs violan inadvertidamente reglas del NLRB al: (1) Prohibir organización fuera de horario, (2) Disciplinar trabajadores por conversaciones sindicales, (3) Represaliar a simpatizantes sindicales.",
    },
    learningObjectives: [
      { en: "Define protected concerted activity under Section 7 of the NLRA — it's broader than union organizing", es: "Defina actividad concertada protegida bajo Sección 7 del NLRA — es más amplia que la organización sindical" },
      { en: "Understand Weingarten rights: employees can request union representation in investigatory interviews", es: "Entienda derechos de Weingarten: empleados pueden solicitar representación sindical en entrevistas investigativas" },
      { en: "Learn what NOT to do: prohibited employer conduct under NLRB rules (interrogation, surveillance, retaliation, threats)", es: "Aprenda qué NO hacer: conducta prohibida del empleador bajo reglas del NLRB (interrogatorio, vigilancia, represalia)" },
      { en: "Build a playbook for responding to union organizing campaigns without violating employee rights", es: "Construya un cuaderno de juego para responder a campañas de organización sindical sin violar derechos de empleados" },
    ],
    keyTakeaways: [
      { en: "Protected concerted activity = 2+ employees talking about working conditions with intent to improve them. Informal conversations at break time are protected. You cannot prohibit them.", es: "Actividad concertada protegida = 2+ empleados hablando sobre condiciones de trabajo. Conversaciones informales son protegidas. Usted no puede prohibirlas." },
      { en: "Retaliation against union supporters is the #1 NLRB violation. Avoid discipline within 30 days of union activity — the NLRB presumes retaliation.", es: "Represalia contra simpatizantes sindicales es la violación #1 del NLRB. Evite disciplina dentro de 30 días de actividad sindical." },
      { en: "10 CA FQHCs are now unionized — collaboration frameworks (joint labor-management committees) reduce conflict and improve retention", es: "10 FQHCs de CA están ahora sindicalizados — marcos de colaboración reducen conflicto y mejoran retención" },
    ],
    sourceMaterials: [
      { label: "NLRB: Employees' Rights Under the National Labor Relations Act", url: "https://www.nlrb.gov/news-publications/publications/employee-rights-notice-posting" },
      { label: "NLRB Section 7 Protection: Protected Concerted Activity", url: "https://www.nlrb.gov/guidance/key-reference-materials/national-labor-relations-act" },
      { label: "NLRB: Weingarten Rights (Union Representation in Interviews)", url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights/weingarten-rights" },
      { label: "California Labor Commissioner: Workers' Rights", url: "https://www.dir.ca.gov/DLSE/Know_Your_Rights.html" },
    ],
    siteLinks: [
      { label: "Union Directory", href: "/unions" },
      { label: "Worker Rights Guides", href: "/guides" },
      { label: "Labor History Timeline", href: "/strategy/movement" },
    ],
    tags: ["nlrb", "union-organizing", "labor-law", "weingarten-rights", "protected-activity", "compliance", "worker-rights"],
  },
  {
    id: "fighting-credential-inflation",
    title: {
      en: "Fighting Credential Inflation in FQHC Hiring",
      es: "Combatiendo la Inflación de Credenciales en la Contratación FQHC",
    },
    subtitle: {
      en: "42% of FQHC job postings require degrees beyond legal minimums — shrinking an already tight talent pool. Learn EEOC adverse impact analysis and skills-based hiring.",
      es: "42% de los anuncios de trabajo FQHC requieren títulos más allá de los mínimos legales — reduciendo un ya estrecho grupo de talentos. Aprenda análisis de impacto adverso y contratación basada en habilidades.",
    },
    category: "leadership",
    audience: "hr-workforce",
    difficulty: "intermediate",
    estimatedMinutes: 18,
    recommendedOrder: 8,
    urgencyStat: {
      en: "42% of FQHC job postings require degrees beyond legal minimums",
      es: "42% de los anuncios de trabajo FQHC requieren títulos más allá de los mínimos legales",
    },
    whyNow: {
      en: "FQHCs are trapped by credential inflation in hiring. A Medical Assistant position legally requires: a high school diploma or GED. Yet 68% of FQHC MA postings require an associate's degree or certification. This is discriminatory — it disproportionately excludes immigrants and people without college access. The EEOC enforces adverse impact standards: if a requirement screens out a protected class at higher rates, you need to justify it as a business necessity. With CHW shortages and FQHC mission to serve the community, educational barriers are both illegal and counterproductive. The fix: audit every job posting for credential inflation, validate requirements against BPC regulations, and implement skills-based hiring.",
      es: "Los FQHCs están atrapados por inflación de credenciales en la contratación. Una posición de Asistente Médico legalmente requiere: diploma de secundaria. Sin embargo, 68% de anuncios FQHC MA requieren título de asociado. Esto es discriminatorio — excluye desproporcionadamente a inmigrantes. El EEOC hace cumplir estándares de impacto adverso: si un requisito excluye una clase protegida, debe justificarlo. Con escasez de CHW, la solución es auditar cada anuncio de trabajo por inflación de credenciales.",
    },
    learningObjectives: [
      { en: "Audit your current job postings: compare listed requirements to California BPC legal minimums for each role", es: "Audite sus anuncios de trabajo actuales: compare requisitos listados a mínimos legales de BPC de California" },
      { en: "Perform EEOC adverse impact analysis: if your hiring requirements screen out 80%+ of a protected group, they need justification", es: "Realice análisis de impacto adverso del EEOC: si sus requisitos de contratación excluyen al 80%+ de un grupo protegido, necesitan justificación" },
      { en: "Redesign job postings to focus on demonstrated skills, certifications, and on-the-job training pathways rather than educational degrees", es: "Rediseñe anuncios de trabajo para enfocarse en habilidades demostrables, certificaciones y rutas de capacitación en el trabajo" },
      { en: "Build a peer mentor or apprenticeship model: hire for potential + provide training for specific credentials", es: "Construya un modelo de mentor de pares o aprendizaje: contrate por potencial + proporcione capacitación para credenciales específicas" },
    ],
    keyTakeaways: [
      { en: "Legal minimums ≠ posting minimums. MA: high school diploma (legal); CHW: high school diploma (legal); RN: BSN (legal); LCSW: MSW (legal). Everything else is your choice — choose for diversity, not gatekeeping.", es: "Mínimos legales ≠ mínimos de anuncio. MA: diploma de secundaria; CHW: diploma de secundaria. Todo lo demás es su elección — elija por diversidad, no por control de acceso." },
      { en: "Credential inflation causes 'adverse impact' when it disproportionately screens out protected classes (women, immigrants, people of color). You can be sued.", es: "La inflación de credenciales causa 'impacto adverso' cuando excluye desproporcionadamente clases protegidas. Puede ser demandado." },
      { en: "One Bay Area FQHC removed 'associate's degree' requirement from MA posting → 3x more applicants, 40% women of color hired (vs 18% before)", es: "Un FQHC del Área de la Bahía removió requisito de 'título de asociado' de anuncio MA → 3x más solicitantes, 40% mujeres de color contratadas" },
    ],
    sourceMaterials: [
      { label: "EEOC: Adverse Impact & Disparate Impact Guidelines", url: "https://www.eeoc.gov/eeoc/publications/fs-nondiscrimination.cfm" },
      { label: "California Board of Physicians: MA Licensure Requirements", url: "https://www.mbc.ca.gov/regulations/scope-of-practice.html" },
      { label: "California Department of Healthcare Services: CHW Requirements", url: "https://www.dhcs.ca.gov/" },
      { label: "Harvard Business Review: Skills-Based Hiring Best Practices", url: "https://hbr.org/2023/06/hire-for-skills-not-credentials" },
    ],
    siteLinks: [
      { label: "Salary Intelligence by Role", href: "/salary-data" },
      { label: "Education Barriers Guide", href: "/guides" },
      { label: "Certification Pathways", href: "/certifications" },
    ],
    tags: ["hiring", "credential-inflation", "eeoc", "adverse-impact", "diversity-equity", "skills-based-hiring", "recruitment"],
  },
  {
    id: "salary-negotiation-edge",
    title: {
      en: "Salary Negotiation & Total Comp: The FQHC Edge",
      es: "Negociación Salarial y Compensación Total: La Ventaja FQHC",
    },
    subtitle: {
      en: "FQHCs that communicate total comp value (NHSC loans, FTCA, mission) reduce turnover by 18%. Learn how to position FQHC compensation as premium.",
      es: "Los FQHCs que comunican valor de compensación total (préstamos NHSC, FTCA, misión) reducen rotación en 18%. Aprenda cómo posicionar la compensación FQHC como premium.",
    },
    category: "leadership",
    audience: "hr-workforce",
    difficulty: "foundational",
    estimatedMinutes: 13,
    recommendedOrder: 7,
    urgencyStat: {
      en: "FQHCs that communicate total comp value (NHSC loans, FTCA, mission) reduce turnover by 18%",
      es: "Los FQHCs que comunican valor de compensación total reducen rotación en 18%",
    },
    whyNow: {
      en: "Candidates see the base salary of $45K at your FQHC and compare it to $48K at a hospital. They pick the hospital. But they don't know about: National Health Service Corps loan repayment ($25K-$50K for eligible roles), Federal Tort Claims Act coverage (you're covered if sued, unlike private practice), mission premium (working with uninsured patients is actually valuable, not a sacrifice), SB 525 positioning (you're ahead of the wave), bilingual pay differentials, flexible schedules, smaller team dynamics, continuity of care. Total compensation at FQHCs often exceeds hospitals — but only if you explain it. This is both HR and GTM.",
      es: "Los candidatos ven el salario base de $45K en su FQHC y lo comparan con $48K en un hospital. Eligen el hospital. Pero no saben sobre: repago de préstamos NHSC ($25K-$50K), cobertura de Tort Reclamaciones Federales, misión premium. Compensación total en FQHCs a menudo excede hospitales — pero solo si la explica.",
    },
    learningObjectives: [
      { en: "Map out the 10 components of total compensation for each FQHC role: base salary, health insurance, retirement, NHSC eligibility, FTCA, PTO, mission/impact value, bilingual differential, loan repayment pathway", es: "Mapee los 10 componentes de compensación total para cada rol FQHC: salario base, seguro de salud, jubilación, elegibilidad NHSC" },
      { en: "Calculate actual total comp: for NP at $120K salary + $30K NHSC eligible + $15K health/retirement + $5K mission premium (self-reported) = $170K value proposition", es: "Calcule compensación total actual: para NP en $120K salario + $30K elegible NHSC + $15K salud/jubilación = $170K propuesta de valor" },
      { en: "Develop salary negotiation talking points: NHSC repayment timeline, mission impact data, SB 525 positioning, bilingual premium, continuity-of-care advantage", es: "Desarrolle puntos de negociación salarial: cronograma de repago NHSC, datos de impacto de misión, posicionamiento de SB 525" },
      { en: "Train HR/hiring managers to communicate total comp during offer stage and throughout onboarding", es: "Capacite a HR/gerentes de contratación para comunicar compensación total durante etapa de oferta y durante incorporación" },
    ],
    keyTakeaways: [
      { en: "NHSC loan repayment is the #1 underutilized FQHC recruiting tool. $30-50K forgiveness for eligible roles. Position it front-and-center in offers.", es: "El repago de préstamos NHSC es la herramienta de reclutamiento #1 subutilizada en FQHC. Posiciónela frente y centro en ofertas." },
      { en: "Bilingual differential ($2-5/hr) + mission premium (emotional/cultural value) + FTCA coverage (peace of mind) + small-team dynamics = total comp advantage over hospital 'wage matching'", es: "Diferencial bilingüe + prima de misión + cobertura FTCA + dinámicas de equipo pequeño = ventaja de compensación total sobre hospitales" },
      { en: "FQHCs that create a 'total comp calculator' and explain it to candidates during interviews report 22% higher offer acceptance rates", es: "Los FQHCs que crean una 'calculadora de compensación total' y la explican a candidatos durante entrevistas reportan 22% tasas de aceptación de ofertas más altas" },
    ],
    sourceMaterials: [
      { label: "NHSC Loan Repayment Program (HRSA)", url: "https://nhsc.hrsa.gov/loan-repayment" },
      { label: "Federal Tort Claims Act (28 USC 1346): FQHC Coverage", url: "https://www.justice.gov/civil/federal-tort-claims-act-ftca" },
      { label: "Bureau of Labor Statistics: Occupational Employment & Wages", url: "https://www.bls.gov/oes/" },
      { label: "NACHC: Total Compensation & Benefits Benchmarking Survey", url: "https://www.nachc.org/" },
    ],
    siteLinks: [
      { label: "Salary Intelligence Dashboard", href: "/salary-data" },
      { label: "Career Roadmap (Salary Progression)", href: "/career-roadmap" },
      { label: "Career Resources (NHSC & Loans)", href: "/resources" },
    ],
    tags: ["total-compensation", "salary-negotiation", "nhsc", "recruitment", "retention", "candidate-experience", "fqhc-advantage"],
  },
]

// ── Helper Functions ───────────────────────────────────────────

export function getMasterclassCounts(): Record<string, number> & { total: number } {
  const counts: Record<string, number> = {}
  for (const cat of MASTERCLASS_CATEGORIES) {
    counts[cat.id] = MASTERCLASSES.filter((m) => m.category === cat.id).length
  }
  return { ...counts, total: MASTERCLASSES.length }
}

export function getMasterclassesByCategory(
  category: MasterclassCategory
): MasterclassModule[] {
  return MASTERCLASSES.filter((m) => m.category === category)
}

export function getCategoryMeta(id: MasterclassCategory) {
  return MASTERCLASS_CATEGORIES.find((c) => c.id === id)
}

export function getAudienceMeta(id: MasterclassAudience) {
  return AUDIENCE_META.find((a) => a.id === id)
}

export function getDifficultyMeta(id: Difficulty) {
  return DIFFICULTY_META.find((d) => d.id === id)
}
