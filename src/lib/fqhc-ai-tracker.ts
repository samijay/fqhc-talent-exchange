// fqhc-ai-tracker.ts
// Track AI adoption across the FQHC/CHC sector
// Every entry has a primary source URL — no unsourced claims
// Updated via daily-update pipeline (Step 3.6: AI & Innovation Scan)
// Last updated: 2026-02-28 (daily update #6)

/** Exported for display on pages — updated by /daily-update pipeline */
export const AI_TRACKER_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AICategory =
  | "clinical-documentation"
  | "revenue-cycle"
  | "scheduling"
  | "care-coordination"
  | "population-health"
  | "policy-framework";

export type AdoptionStage = "pilot" | "expanding" | "widely-adopted" | "framework";

export interface AIMetric {
  label: string;
  value: string;
}

export interface AIAdoptionItem {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  category: AICategory;
  vendor: string | null;
  partnership: string | null; // e.g., "CHAI-NACHC"
  metrics: AIMetric[];
  adoptionStage: AdoptionStage;
  sourceUrl: string;
  sourceOrg: string;
  date: string; // ISO
  tags: string[];
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const AI_CATEGORIES: {
  id: AICategory;
  en: string;
  es: string;
}[] = [
  {
    id: "clinical-documentation",
    en: "Clinical Documentation",
    es: "Documentacion Clinica",
  },
  { id: "revenue-cycle", en: "Revenue Cycle Management", es: "Gestion del Ciclo de Ingresos" },
  { id: "scheduling", en: "Scheduling & Access", es: "Programacion y Acceso" },
  {
    id: "care-coordination",
    en: "Care Coordination",
    es: "Coordinacion de Cuidado",
  },
  {
    id: "population-health",
    en: "Population Health",
    es: "Salud Poblacional",
  },
  {
    id: "policy-framework",
    en: "Policy & Framework",
    es: "Politica y Marco",
  },
];

export const ADOPTION_STAGES: {
  id: AdoptionStage;
  en: string;
  es: string;
  color: string;
}[] = [
  { id: "pilot", en: "Pilot", es: "Piloto", color: "bg-blue-100 text-blue-800" },
  { id: "expanding", en: "Expanding", es: "En Expansion", color: "bg-amber-100 text-amber-800" },
  {
    id: "widely-adopted",
    en: "Widely Adopted",
    es: "Ampliamente Adoptado",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "framework",
    en: "Framework / Policy",
    es: "Marco / Politica",
    color: "bg-purple-100 text-purple-800",
  },
];

/* ------------------------------------------------------------------ */
/*  AI Adoption Items                                                  */
/* ------------------------------------------------------------------ */

export const AI_ADOPTION_ITEMS: AIAdoptionItem[] = [
  {
    id: "chai-nachc-partnership",
    title: {
      en: "CHAI-NACHC Partnership: Prioritizing CHCs in AI Adoption",
      es: "Asociacion CHAI-NACHC: Priorizando CHCs en Adopcion de IA",
    },
    description: {
      en: "The Coalition for Health AI (CHAI) and NACHC joined forces in August 2025 to advance safe AI adoption at community health centers. The partnership includes an inaugural survey of CHCs assessing current AI use and gaps, development of an 'AI in Healthcare for the Safety Net' curriculum, and a vendor certification program for AI tools sold to CHCs. Uses NACHC's SEPP framework (Science, Education, Practice, Policy).",
      es: "La Coalicion para IA en Salud (CHAI) y NACHC se unieron en agosto 2025 para avanzar la adopcion segura de IA en centros de salud comunitarios. La asociacion incluye una encuesta inaugural de CHCs, desarrollo de un curriculo de 'IA en Salud para la Red de Seguridad', y un programa de certificacion de proveedores para herramientas de IA.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: "CHAI-NACHC",
    metrics: [
      { label: "CHCs Served", value: "1,400+" },
      { label: "Patients Reached", value: "30M+" },
      { label: "Focus", value: "Safety-net specific AI standards" },
    ],
    adoptionStage: "framework",
    sourceUrl:
      "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
    sourceOrg: "NACHC",
    date: "2025-08-15",
    tags: ["chai", "nachc", "ai-standards", "curriculum", "vendor-certification"],
  },

  {
    id: "nachc-eclinicalworks-ai",
    title: {
      en: "NACHC-eClinicalWorks Partnership: AI Tools for Community Health Centers",
      es: "Asociacion NACHC-eClinicalWorks: Herramientas de IA para Centros de Salud Comunitarios",
    },
    description: {
      en: "NACHC partnered with eClinicalWorks in November 2025 to advance health IT and AI innovations at CHCs. The partnership includes a national survey on health IT/AI adoption, AI tools bundled into NACHC Select for affordability. Key tools: healow AI (no-show prediction) and Sunoh.ai (ambient documentation). Named results: Urban Health Plan achieved record monthly visits; Sun River Health providers completed notes on 26 patients within 30 minutes.",
      es: "NACHC se asocio con eClinicalWorks en noviembre 2025 para avanzar innovaciones de IT y IA en CHCs. La asociacion incluye una encuesta nacional sobre adopcion de IT/IA, herramientas de IA agrupadas en NACHC Select. Herramientas clave: healow AI (prediccion de inasistencia) y Sunoh.ai (documentacion ambiental).",
    },
    category: "clinical-documentation",
    vendor: "eClinicalWorks",
    partnership: "NACHC-eClinicalWorks",
    metrics: [
      { label: "Documentation Speed", value: "26 patients in 30 min" },
      { label: "Visit Volume", value: "Record highs achieved" },
      { label: "Affordability", value: "NACHC Select bundled pricing" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    sourceOrg: "NACHC",
    date: "2025-11-01",
    tags: ["eclinicalworks", "healow", "sunoh", "nachc-select", "documentation"],
  },

  {
    id: "claude-for-healthcare",
    title: {
      en: "Claude for Healthcare: HIPAA-Ready AI with CMS & ICD-10 Integration",
      es: "Claude para Salud: IA Lista para HIPAA con Integracion CMS e ICD-10",
    },
    description: {
      en: "Anthropic launched Claude for Healthcare at the J.P. Morgan Healthcare Conference in January 2026 — HIPAA-ready tools built on Claude Opus 4.5 for providers and payers. Features include native integration to the CMS Coverage Database (Local and National Coverage Determinations), ICD-10 code database, PubMed, prior authorization workflow support, and claims appeals. Elation Health (EHR serving 46,000 clinical users) reduced chart review time by 61% with Claude. No direct FQHC adoption yet — first-mover advantage exists.",
      es: "Anthropic lanzo Claude para Salud en la Conferencia J.P. Morgan Healthcare en enero 2026 — herramientas listas para HIPAA construidas sobre Claude Opus 4.5. Incluye integracion nativa con la Base de Datos de Cobertura CMS, codigos ICD-10, PubMed, y soporte de autorizacion previa. Elation Health redujo tiempo de revision de historiales en 61%.",
    },
    category: "clinical-documentation",
    vendor: "Anthropic",
    partnership: null,
    metrics: [
      { label: "Chart Review Reduction", value: "61% (Elation Health)" },
      { label: "Time Saved Per Visit", value: "13 minutes" },
      { label: "Clinical Users", value: "46,000 (via Elation)" },
      { label: "Provider Satisfaction", value: "75% report more joy in work" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.anthropic.com/news/healthcare-life-sciences",
    sourceOrg: "Anthropic",
    date: "2026-01-12",
    tags: ["anthropic", "claude", "hipaa", "cms", "icd-10", "elation", "prior-auth"],
  },

  {
    id: "elation-health-claude",
    title: {
      en: "Elation Health + Claude: 61% Chart Review Reduction for Primary Care",
      es: "Elation Health + Claude: 61% de Reduccion en Revision de Historiales para Atencion Primaria",
    },
    description: {
      en: "Elation Health, an EHR platform serving primary care clinicians, partnered with Anthropic to power Clinical Insights with Claude. Results: chart review time reduced by 61%, clinicians save 13 minutes per visit with Note Assist, Clinical Insights usage doubled after Claude migration. 87% of providers say better patient care. Partnership Health Centers in New Jersey is a named FQHC user. Directly applicable to FQHC primary care workflows.",
      es: "Elation Health, una plataforma EHR sirviendo a clinicos de atencion primaria, se asocio con Anthropic para potenciar Clinical Insights con Claude. Resultados: tiempo de revision de historiales reducido en 61%, clinicos ahorran 13 minutos por visita. Partnership Health Centers en New Jersey es un usuario FQHC nombrado.",
    },
    category: "clinical-documentation",
    vendor: "Elation Health / Anthropic",
    partnership: "Elation-Anthropic",
    metrics: [
      { label: "Chart Review Reduction", value: "61%" },
      { label: "Time Saved Per Visit", value: "13 minutes" },
      { label: "Usage After Migration", value: "Doubled" },
      { label: "Better Patient Care", value: "87% of providers agree" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.elationhealth.com/resources/blogs/elation-health-and-anthropic-team-to-power-clinical-insights-for-primary-care",
    sourceOrg: "Elation Health",
    date: "2026-01-12",
    tags: ["elation", "anthropic", "claude", "primary-care", "ehr", "chart-review"],
  },

  {
    id: "nachc-ai-action-guide-readmissions",
    title: {
      en: "NACHC AI Action Guide: $7.2M Retained via Readmission Prediction",
      es: "Guia de Accion de IA NACHC: $7.2M Retenidos via Prediccion de Readmisiones",
    },
    description: {
      en: "NACHC's AI Action Guide (September 2025) documents a U.S. community health center that integrated an AI-based predictive algorithm within its EHR to identify high-risk readmission patients. The system reduced readmission rates from 27.9% to 23.9% and retained $7.2 million in at-risk pay-for-performance funding. The guide provides a roadmap for CHCs to evaluate, pilot, and scale AI tools.",
      es: "La Guia de Accion de IA de NACHC (septiembre 2025) documenta un centro de salud comunitario que integro un algoritmo predictivo basado en IA en su EHR para identificar pacientes con alto riesgo de readmision. Redujo tasas de readmision de 27.9% a 23.9% y retuvo $7.2 millones en financiamiento de pago por rendimiento.",
    },
    category: "population-health",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Readmission Rate Reduction", value: "27.9% → 23.9%" },
      { label: "Revenue Retained", value: "$7.2 million" },
      { label: "Funding Type", value: "Pay-for-performance" },
    ],
    adoptionStage: "pilot",
    sourceUrl:
      "https://www.nachc.org/wp-content/uploads/2025/11/NACHC-AI-Action-Guide_September-2025.pdf",
    sourceOrg: "NACHC",
    date: "2025-09-01",
    tags: ["readmissions", "predictive", "ehr-integration", "p4p", "nachc"],
  },

  {
    id: "ai-rcm-adoption-stats",
    title: {
      en: "AI in Revenue Cycle: 80% Exploring, Only 15% Fully Integrated",
      es: "IA en Ciclo de Ingresos: 80% Explorando, Solo 15% Totalmente Integrado",
    },
    description: {
      en: "An HFMA/AKASA survey found 80% of health systems are beginning to explore, pilot, or implement generative AI in their revenue cycle management — a 38% increase from two years prior. However, only 15% have fully integrated AI into standard RCM operations (Experian Health). The gap represents massive opportunity for FQHCs: automated coding can cut administrative costs by up to 30% (AMA) and achieve 98% clean claim rates. Provider organizations lose approximately $210,000 annually due to under-billing that AI can prevent.",
      es: "Una encuesta HFMA/AKASA encontro que el 80% de los sistemas de salud estan explorando o implementando IA generativa en su gestion del ciclo de ingresos. Sin embargo, solo el 15% la ha integrado completamente. La brecha representa oportunidad masiva para FQHCs: la codificacion automatizada puede reducir costos administrativos hasta 30%.",
    },
    category: "revenue-cycle",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Systems Exploring AI RCM", value: "80%" },
      { label: "Fully Integrated", value: "Only 15%" },
      { label: "Admin Cost Reduction", value: "Up to 30%" },
      { label: "Annual Under-Billing Loss", value: "$210,000" },
      { label: "Clean Claim Rate (AI)", value: "98%" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.hfma.org/ai/how-to-optimize-the-revenue-cycle-workforce-in-2026/",
    sourceOrg: "HFMA",
    date: "2026-01-15",
    tags: ["rcm", "revenue-cycle", "coding", "claims", "hfma", "akasa"],
  },

  {
    id: "ambient-documentation-trend",
    title: {
      en: "Ambient AI Documentation: Eliminating 'Pajama Time' for FQHC Providers",
      es: "Documentacion Ambiental con IA: Eliminando 'Tiempo en Pijama' para Proveedores FQHC",
    },
    description: {
      en: "Ambient AI documentation tools that listen to provider-patient conversations and generate structured clinical notes are rapidly transforming FQHC workflows. AI physician adoption rose from 38% in 2023 to 66% in 2024. Key vendors include Sunoh.ai (via NACHC-eClinicalWorks), DAX Copilot (Microsoft/Nuance), and Suki AI. Benefits: elimination of after-hours documentation, reduced burnout, improved note accuracy. 60% of CHCs cite expenses as a barrier — NACHC Select program addresses this with bundled pricing.",
      es: "Las herramientas de documentacion ambiental con IA que escuchan conversaciones proveedor-paciente y generan notas clinicas estan transformando rapido los flujos de trabajo FQHC. La adopcion por medicos subio de 38% en 2023 a 66% en 2024. El 60% de los CHCs citan costos como barrera — el programa NACHC Select aborda esto con precios agrupados.",
    },
    category: "clinical-documentation",
    vendor: "Multiple (Sunoh.ai, DAX Copilot, Suki)",
    partnership: null,
    metrics: [
      { label: "Physician AI Adoption", value: "38% → 66% (2023-2024)" },
      { label: "CHCs Citing Cost Barrier", value: "60%" },
      { label: "Rural CHCs Citing Cost", value: "70%" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.medusind.com/resources/blog/how-ai-is-reshaping-healthcare-rcm-key-updates-and-insights-for-2026",
    sourceOrg: "Medusind",
    date: "2026-01-01",
    tags: ["ambient", "documentation", "burnout", "nachc-select", "sunoh"],
  },

  {
    id: "rapidclaims-fqhc-rcm",
    title: {
      en: "RapidClaims: AI-Powered FQHC Revenue Cycle — 98% Clean Claim Rate",
      es: "RapidClaims: Ciclo de Ingresos FQHC con IA — 98% Tasa de Reclamaciones Limpias",
    },
    description: {
      en: "RapidClaims offers AI-powered revenue cycle management specifically designed for FQHCs. Their platform achieves 98% clean claim rates, denial reduction up to 40%, and coder productivity gains up to 170%. For FQHCs dealing with complex PPS encounter rules, sliding fee discounts, and varied payer mixes, AI-powered coding and claims scrubbing can recover significant revenue lost to under-coding and preventable denials.",
      es: "RapidClaims ofrece gestion del ciclo de ingresos con IA disenada especificamente para FQHCs. Su plataforma logra 98% de tasa de reclamaciones limpias, reduccion de denegaciones hasta 40%, y ganancias de productividad de codificadores hasta 170%.",
    },
    category: "revenue-cycle",
    vendor: "RapidClaims",
    partnership: null,
    metrics: [
      { label: "Clean Claim Rate", value: "98%" },
      { label: "Denial Reduction", value: "Up to 40%" },
      { label: "Coder Productivity", value: "+170%" },
    ],
    adoptionStage: "expanding",
    sourceUrl:
      "https://www.rapidclaims.ai/blogs/fqhc-revenue-cycle-management-challenges-opportunities",
    sourceOrg: "RapidClaims",
    date: "2026-02-01",
    tags: ["rcm", "claims", "coding", "denials", "fqhc-specific"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all items, optionally filtered */
export function getAIItems(opts?: {
  category?: AICategory;
  stage?: AdoptionStage;
}): AIAdoptionItem[] {
  let items = [...AI_ADOPTION_ITEMS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (opts?.category) {
    items = items.filter((i) => i.category === opts.category);
  }
  if (opts?.stage) {
    items = items.filter((i) => i.adoptionStage === opts.stage);
  }

  return items;
}

/** Get counts by category */
export function getAICounts(): Record<AICategory, number> & { total: number } {
  const counts = { total: AI_ADOPTION_ITEMS.length } as Record<
    AICategory,
    number
  > & { total: number };
  for (const cat of AI_CATEGORIES) {
    counts[cat.id] = AI_ADOPTION_ITEMS.filter(
      (i) => i.category === cat.id
    ).length;
  }
  return counts;
}

/** Get counts by adoption stage */
export function getAdoptionStageCounts(): Record<AdoptionStage, number> {
  const counts = {} as Record<AdoptionStage, number>;
  for (const stage of ADOPTION_STAGES) {
    counts[stage.id] = AI_ADOPTION_ITEMS.filter(
      (i) => i.adoptionStage === stage.id
    ).length;
  }
  return counts;
}
