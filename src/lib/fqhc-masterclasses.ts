// FQHC Executive Masterclass — Mini deep-dive modules for the 2026 crisis moment
// Sourced from 200+ resources in resources/fqhc-bibliography.md

export const MASTERCLASSES_LAST_UPDATED = "2026-03-01"

// ── Types ──────────────────────────────────────────────────────

export type MasterclassCategory =
  | "survival"
  | "revenue"
  | "undocumented-care"
  | "fundraising"
  | "economics"
  | "leadership"

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
      { label: "Community Link: Scenario Planning for FQHCs", url: "https://www.communitylinkconsulting.com/blog/scenario-planning-fqhc-federal-funding-uncertainty" },
      { label: "Maximized Revenue: Building a Resilient Financial Plan", url: "https://www.maximizedrevenue.com/preparing-for-the-next-funding-cycle-building-a-resilient-financial-plan-for-your-fqhc/" },
      { label: "NACHC 2024 UDS Early Takeaways", url: "https://www.nachc.org/2024-uds-early-takeaways-community-health-center-growth-under-pressure/" },
    ],
    siteLinks: [
      { label: "Funding Impact Tracker", href: "/funding-impact" },
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Policy Timeline", href: "/insights" },
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
      { label: "NACHC: 340B Funding Health Equity", url: "https://www.nachc.org/research-and-data/health-centers-and-340b-funding-health-equity/" },
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
      { label: "Intelligence Dashboard", href: "/insights" },
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
      { label: "Sun River Health: Sunoh.ai Deployment", url: "https://sunoh.ai/sun-river-health-case-study" },
      { label: "Abridge: Best in KLAS 2026", url: "https://www.abridge.com/blog/abridge-wins-best-in-klas-2026-for-ambient-ai" },
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
      { label: "NACHC CEO Competencies & Professional Development", url: "https://www.nachc.org/resource/chief-executive-officer-ceo-competencies-domains-and-skills-tasks/" },
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
