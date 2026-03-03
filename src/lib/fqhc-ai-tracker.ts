// fqhc-ai-tracker.ts
// Track AI adoption across the FQHC/CHC sector
// Every entry has a primary source URL — no unsourced claims
// Updated via daily-update pipeline (Step 3.6: AI & Innovation Scan)
// Last updated: 2026-03-03 (daily update #8)

/** Exported for display on pages — updated by /daily-update pipeline */
export const AI_TRACKER_LAST_UPDATED = "2026-03-03";

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
      "https://www.fiercehealthcare.com/ai-and-machine-learning/adoption-ai-hospital-rcm-surges-even-health-systems-navigate-cost",
    sourceOrg: "Fierce Healthcare / HFMA",
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
      "https://www.ama-assn.org/practice-management/digital-health/2-3-physicians-are-using-health-ai-78-2023",
    sourceOrg: "American Medical Association",
    date: "2026-01-01",
    tags: ["ambient", "documentation", "burnout", "nachc-select", "sunoh"],
  },

  {
    id: "athenahealth-free-ambient-ai",
    title: {
      en: "athenahealth Launches Free Ambient AI Scribe for All Customers",
      es: "athenahealth Lanza Escriba Ambiental de IA Gratuita para Todos los Clientes",
    },
    description: {
      en: "athenahealth introduced athenaAmbient, a free AI scribe included in standard athenaOne software updates at no additional cost. The digital scribe listens to patient conversations and automatically drafts diagnoses, prescriptions, and clinical notes. Also launched: Sage, an AI clinical copilot that surfaces patient insights and answers chart questions. User testing began February 2026. This is significant for FQHCs — many use athenahealth as their EHR, and the zero-cost model removes the budget barrier that has prevented smaller health centers from adopting ambient AI.",
      es: "athenahealth introdujo athenaAmbient, un escriba de IA gratuito incluido en actualizaciones estándar de athenaOne. El escriba digital escucha conversaciones con pacientes y redacta automáticamente diagnósticos, recetas y notas clínicas. Las pruebas de usuario comenzaron en febrero de 2026. Significativo para FQHCs que usan athenahealth como EHR — el costo cero elimina la barrera presupuestaria.",
    },
    category: "clinical-documentation",
    vendor: "athenahealth",
    partnership: null,
    metrics: [
      { label: "Cost to Customers", value: "$0 (included)" },
      { label: "User Testing Start", value: "February 2026" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.digitalhealthnews.com/athenahealth-introduces-ambient-scribe-ai-copilot-for-ehr-users",
    sourceOrg: "Digital Health News",
    date: "2026-02-01",
    tags: ["ambient-ai", "free", "ehr-integrated", "athenahealth", "zero-cost"],
  },
  {
    id: "nextgen-ambient-assist-rural-fqhcs",
    title: {
      en: "NextGen Ambient Assist Eliminates 'Pajama Time' at Two Rural FQHCs",
      es: "NextGen Ambient Assist Elimina 'Tiempo en Pijama' en Dos FQHCs Rurales",
    },
    description: {
      en: "Juniper Health and White House Clinics, two rural Kentucky FQHCs, reported near-instant elimination of after-hours charting ('pajama time') after deploying NextGen Healthcare's Ambient Assist. Clinicians who previously spent 2-3 hours nightly on documentation reclaimed evenings. Patient net promoter scores hit all-time highs. The providers most struggling with documentation became the strongest AI advocates. Critically, the relief stabilized workforce retention and reduced early retirements — a key lesson for rural FQHCs facing burnout-driven turnover.",
      es: "Juniper Health y White House Clinics, dos FQHCs rurales de Kentucky, reportaron eliminación casi instantánea de la documentación después del horario laboral tras implementar NextGen Ambient Assist. Médicos que pasaban 2-3 horas nocturnas en documentación recuperaron sus noches. Las puntuaciones NPS alcanzaron máximos históricos.",
    },
    category: "clinical-documentation",
    vendor: "NextGen Healthcare",
    partnership: null,
    metrics: [
      { label: "After-Hours Charting", value: "Eliminated" },
      { label: "Patient NPS", value: "All-time high" },
      { label: "Previous Pajama Time", value: "2-3 hrs/night" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.healthcareittoday.com/2026/02/10/how-nextgen-healthcares-ambient-ai-helped-two-clinics-break-the-cycle-of-pajama-time/",
    sourceOrg: "Healthcare IT Today",
    date: "2026-02-10",
    tags: ["ambient-ai", "rural-fqhc", "burnout", "pajama-time", "workforce-retention"],
  },
  {
    id: "neighborhood-healthcare-nabla-ai",
    title: {
      en: "Neighborhood Healthcare (CA FQHC) Pilots Nabla Ambient AI Across 30 Facilities",
      es: "Neighborhood Healthcare (FQHC de CA) Pilota Nabla IA Ambiental en 30 Instalaciones",
    },
    description: {
      en: "Neighborhood Healthcare, a California FQHC facilitating over 500,000 medical, dental, and behavioral health visits across 30 facilities, deployed Nabla's ambient AI scribe to reduce after-hours documentation burden. Staff embraced the tool, and patients were comfortable with the technology — only a handful expressed data privacy concerns. Clinicians address these by explaining that conversation data stays in the cloud briefly before being deleted. For an FQHC of this scale, the investment in ambient AI appears to deliver strong ROI in clinician satisfaction and retention.",
      es: "Neighborhood Healthcare, un FQHC de California con más de 500,000 visitas en 30 instalaciones, implementó el escriba de IA ambiental de Nabla para reducir la carga de documentación. El personal adoptó la herramienta y los pacientes se mostraron cómodos con la tecnología.",
    },
    category: "clinical-documentation",
    vendor: "Nabla",
    partnership: null,
    metrics: [
      { label: "Annual Visits", value: "500,000+" },
      { label: "Facilities", value: "30" },
      { label: "Patient Comfort", value: "High acceptance" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://www.techtarget.com/healthtechanalytics/feature/How-an-FQHC-is-using-ambient-AI-to-reduce-clinician-burden",
    sourceOrg: "TechTarget",
    date: "2026-02-15",
    tags: ["ambient-ai", "california-fqhc", "nabla", "patient-acceptance", "large-scale"],
  },
  {
    id: "epic-ai-charting-launch",
    title: {
      en: "Epic Launches AI Charting — Potential Disruption to Ambient Scribe Market",
      es: "Epic Lanza AI Charting — Posible Disrupción del Mercado de Escribas Ambientales",
    },
    description: {
      en: "Epic Systems announced details of its AI Charting feature in February 2026, potentially disrupting the standalone ambient scribe market. Several health systems began piloting the tools. For FQHCs using OCHIN Epic or other Epic instances, this could mean ambient AI documentation becomes available directly within their existing EHR at no additional vendor cost. At ViVE 2026 (Feb 26), conference attendees noted that 'the excitement over scribes has died down' as the market matures from novelty to standard feature — signaling AI documentation is becoming table stakes for EHR vendors.",
      es: "Epic Systems anunció detalles de su función AI Charting en febrero de 2026, potencialmente disrumpiendo el mercado de escribas ambientales independientes. Para FQHCs que usan OCHIN Epic, esto podría significar documentación de IA ambiental disponible directamente en su EHR existente. En ViVE 2026, los asistentes notaron que la IA de documentación se está convirtiendo en una función estándar.",
    },
    category: "clinical-documentation",
    vendor: "Epic Systems",
    partnership: null,
    metrics: [
      { label: "Market Signal", value: "AI becoming table stakes" },
      { label: "FQHC Relevance", value: "OCHIN Epic users" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.statnews.com/2026/02/04/epic-ai-charting-ambient-scribe-abridge-microsoft/",
    sourceOrg: "STAT News",
    date: "2026-02-04",
    tags: ["epic", "ehr-native", "market-disruption", "ochin", "vive-2026"],
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

  {
    id: "sun-river-health-sunoh-7k-visits",
    title: {
      en: "Sun River Health Deploys Sunoh.ai Across 7,000 Monthly Visits — Largest FQHC Ambient AI Rollout",
      es: "Sun River Health Despliega Sunoh.ai en 7,000 Visitas Mensuales — Mayor Implementación de IA Ambiental en FQHC",
    },
    description: {
      en: "Sun River Health, the largest FQHC on the East Coast, has scaled Sunoh.ai ambient documentation across 500+ providers handling 7,000 patient visits per month. Using eClinicalWorks as their EHR with Sunoh.ai integration, providers can complete clinical notes for 26 patients within 30 minutes. The deployment represents the largest known ambient AI implementation at a single FQHC and demonstrates that these tools can scale beyond pilot programs to enterprise-wide adoption in high-volume community health settings.",
      es: "Sun River Health, el FQHC más grande de la Costa Este, ha escalado Sunoh.ai a 500+ proveedores manejando 7,000 visitas por mes. Los proveedores completan notas clínicas de 26 pacientes en 30 minutos. El despliegue representa la mayor implementación conocida de IA ambiental en un solo FQHC.",
    },
    category: "clinical-documentation",
    vendor: "Sunoh.ai / eClinicalWorks",
    partnership: "NACHC-eClinicalWorks",
    metrics: [
      { label: "Monthly Visits", value: "7,000" },
      { label: "Active Providers", value: "500+" },
      { label: "Notes Per Session", value: "26 patients in 30 min" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://sunoh.ai/press-releases/providers-at-sun-river-health-successfully-utilize-sunoh-ai-to-document-over-7000-visits-monthly/",
    sourceOrg: "Sunoh.ai",
    date: "2026-02-20",
    tags: ["sunoh", "ambient-ai", "eclinicalworks", "large-scale", "east-coast-fqhc"],
  },
  {
    id: "sacramento-native-american-hc-ai",
    title: {
      en: "Sacramento Native American Health Center: AI Scribes Transforming Clinical Documentation",
      es: "Centro de Salud Nativo Americano de Sacramento: Escribas de IA Transformando Documentación Clínica",
    },
    description: {
      en: "Sacramento Native American Health Center (SNAHC) adopted AI medical scribes to reduce clinician documentation burden, becoming one of the first tribal health centers in California to implement ambient AI. The adoption addresses a critical challenge: SNAHC providers serve urban Native American, Alaska Native, and surrounding communities with complex care needs, and after-hours documentation was consuming significant provider time. Key lessons: ensure cultural sensitivity in AI-generated content for Native populations, integrate outputs directly into EHR workflows, and start with willing champions before expanding.",
      es: "El Centro de Salud Nativo Americano de Sacramento (SNAHC) adoptó escribas médicos de IA para reducir la carga de documentación, convirtiéndose en uno de los primeros centros de salud tribales en California en implementar IA ambiental. Lecciones clave: asegurar sensibilidad cultural en contenido generado por IA, integrar con flujos de trabajo del EHR, y comenzar con defensores dispuestos.",
    },
    category: "clinical-documentation",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "AI Use Case", value: "Ambient AI Scribe" },
      { label: "Population Served", value: "Native American / Alaska Native" },
      { label: "Key Lesson", value: "Cultural sensitivity in AI outputs" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://snahc.org/2025/08/29/ai-scribes-revolutionizing-medical-documentation/",
    sourceOrg: "Sacramento Native American Health Center",
    date: "2025-08-29",
    tags: ["ambient-ai", "scribe", "documentation", "native-american", "cultural-sensitivity", "tribal-health"],
  },
  {
    id: "abridge-best-in-klas-2026",
    title: {
      en: "Abridge Wins Best in KLAS 2026 for Ambient AI — Gold Standard for FQHC Evaluation",
      es: "Abridge Gana Best in KLAS 2026 para IA Ambiental — Estándar de Oro para Evaluación FQHC",
    },
    description: {
      en: "Abridge won the 2026 Best in KLAS award for Ambient AI, establishing itself as the top-rated ambient documentation solution based on provider satisfaction scores. Abridge reports that AI scribes are saving physicians an average of 2-3 hours per day on documentation, with physician burnout rates dropping from 51.9% to 38.8% at organizations that deploy ambient AI tools. For FQHCs evaluating ambient AI vendors, KLAS ratings provide the most reliable third-party assessment. Abridge's win signals strong provider satisfaction — a critical factor for adoption in resource-constrained FQHC environments.",
      es: "Abridge ganó el premio Best in KLAS 2026 para IA Ambiental, estableciéndose como la solución mejor calificada. Los escribas de IA ahorran a los médicos 2-3 horas diarias, con tasas de agotamiento bajando de 51.9% a 38.8%. Para FQHCs evaluando proveedores de IA ambiental, las calificaciones KLAS proporcionan la evaluación de terceros más confiable.",
    },
    category: "clinical-documentation",
    vendor: "Abridge",
    partnership: null,
    metrics: [
      { label: "Award", value: "Best in KLAS 2026" },
      { label: "Time Saved", value: "2-3 hours/day" },
      { label: "Burnout Reduction", value: "51.9% → 38.8%" },
    ],
    adoptionStage: "widely-adopted",
    sourceUrl: "https://www.abridge.com/press-release/best-in-klas-2026-press",
    sourceOrg: "Abridge / KLAS Research",
    date: "2026-02-15",
    tags: ["abridge", "klas", "ambient-ai", "burnout-reduction", "best-in-class"],
  },

  {
    id: "imperial-beach-eclinicalworks-sunoh",
    title: {
      en: "Imperial Beach Community Clinic (CA FQHC) Adopts eClinicalWorks + Sunoh.ai Scribe",
      es: "Clínica Comunitaria de Imperial Beach (FQHC de CA) Adopta eClinicalWorks + Escriba Sunoh.ai",
    },
    description: {
      en: "Imperial Beach Community Clinic, a 31-provider FQHC in Southern California, selected eClinicalWorks' AI-driven EHR platform alongside Sunoh.ai AI-powered medical scribe and healow patient engagement solutions. The clinic's CEO noted that introducing AI solutions will offer relief from repetitive documentation and help focus on improving the patient-provider interaction. Sunoh.ai reports saving providers up to 8-10 hours weekly on clinical documentation by converting natural conversations into structured clinical notes.",
      es: "La Clínica Comunitaria de Imperial Beach, un FQHC de 31 proveedores en el sur de California, seleccionó la plataforma EHR con IA de eClinicalWorks junto con el escriba médico con IA Sunoh.ai y soluciones healow. El director ejecutivo señaló que las soluciones de IA ofrecerán alivio de la documentación repetitiva. Sunoh.ai reporta ahorrar 8-10 horas semanales en documentación clínica.",
    },
    category: "clinical-documentation",
    vendor: "eClinicalWorks / Sunoh.ai",
    partnership: null,
    metrics: [
      { label: "Providers", value: "31" },
      { label: "Time Saved", value: "8-10 hrs/week" },
      { label: "Tools", value: "EHR + AI Scribe + Patient Engagement" },
    ],
    adoptionStage: "pilot",
    sourceUrl:
      "https://www.eclinicalworks.com/31-provider-fqhc-to-leverage-eclinicalworks-ai-driven-ehr-and-sunoh-ai-ai-medical-scribe/",
    sourceOrg: "eClinicalWorks",
    date: "2024-06-26",
    tags: [
      "eclinicalworks",
      "sunoh-ai",
      "ambient-scribe",
      "imperial-beach",
      "southern-california",
    ],
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
