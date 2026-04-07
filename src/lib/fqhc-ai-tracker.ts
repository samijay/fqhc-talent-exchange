// fqhc-ai-tracker.ts
// Track AI adoption across the FQHC/CHC sector
// Every entry has a primary source URL — no unsourced claims
// Updated via daily-update pipeline (Step 3.6: AI & Innovation Scan)
// Last updated: 2026-03-03 (daily update #8)

/** Exported for display on pages — updated by /daily-update pipeline */
export const AI_TRACKER_LAST_UPDATED = "2026-04-07";

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
  featured?: boolean; // curated items for sidebar highlight
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
    id: "moses-weitzman-ai-governance-program",
    title: {
      en: "Moses-Weitzman Health System Builds AI Governance Framework for FQHCs",
      es: "Moses-Weitzman Health System Construye Marco de Gobernanza de IA para FQHCs",
    },
    description: {
      en: "Moses-Weitzman Health System (MWHS) published their experience building an AI governance program in the Journal of Ambulatory Care Management (Jan/March 2026). They established two workgroups — senior leadership and cross-departmental — to create AI policies emphasizing transparency, privacy, and security. With limited existing templates for FQHCs, they developed criteria for evaluating AI tools that interact with patient data. Key lessons: tech-savvy leadership is essential, cross-functional collaboration prevents siloed adoption, and careful differentiation between automation types (rules-based vs. ML vs. generative) helps organizations set appropriate guardrails. This is the first published FQHC-specific AI governance framework.",
      es: "Moses-Weitzman Health System publicó su experiencia construyendo un programa de gobernanza de IA en el Journal of Ambulatory Care Management (ene/mar 2026). Establecieron dos grupos de trabajo para crear políticas de IA enfatizando transparencia, privacidad y seguridad. Es el primer marco de gobernanza de IA publicado específicamente para FQHCs.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Workgroups", value: "2 (leadership + cross-departmental)" },
      { label: "Focus", value: "Governance, privacy, security criteria" },
      { label: "Publication", value: "JACM Jan/March 2026" },
    ],
    adoptionStage: "framework",
    sourceUrl: "https://journals.lww.com/ambulatorycaremanagement/abstract/2026/01000/lessons_from_one_fqhc_s_experience_with_artificial.5.aspx",
    sourceOrg: "Journal of Ambulatory Care Management",
    date: "2026-03-01",
    tags: ["governance", "policy", "fqhc-ai-program", "moses-weitzman", "privacy", "security"],
  },
  {
    id: "haip-practice-network-5-fqhcs-duke",
    title: {
      en: "HAIP Practice Network: 5 FQHCs Join Duke-Led 12-Month AI Peer Learning Initiative",
      es: "Red de Práctica HAIP: 5 FQHCs se Unen a Iniciativa de Aprendizaje de IA de 12 Meses Liderada por Duke",
    },
    description: {
      en: "Five under-resourced healthcare providers — four FQHCs and one community hospital — are collaborating through the Health AI Partnership (HAIP) Practice Network, a 12-month peer learning initiative supported by Duke University's Institute for Health Innovation. Participating organizations have deployed ambient scribes, no-show prediction algorithms, sepsis early warnings, and retinal scanning for diabetic retinopathy. HAIP's director notes that '90-95% of the 1,600+ community health centers and 6,000+ hospitals do not have expertise, infrastructure, or access to best-in-class AI solutions,' highlighting the massive adoption gap. North Country Healthcare (13 rural AZ clinics) is struggling with weak broadband and outdated tech even with HAIP support.",
      es: "Cinco proveedores de salud con recursos limitados — cuatro FQHCs y un hospital comunitario — colaboran a través de la Red de Práctica HAIP, una iniciativa de aprendizaje de 12 meses apoyada por Duke University. Han desplegado escribas ambientales, predicción de inasistencias, alertas tempranas de sepsis y escaneo retinal. El 90-95% de los 1,600+ centros de salud comunitarios no tienen experiencia ni infraestructura para IA.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: "HAIP-Duke University",
    metrics: [
      { label: "Participants", value: "5 organizations (4 FQHCs + 1 hospital)" },
      { label: "Duration", value: "12 months" },
      { label: "AI Tools Deployed", value: "Ambient scribes, no-show prediction, sepsis alerts, retinal scanning" },
      { label: "Adoption Gap", value: "90-95% of CHCs lack AI expertise/infrastructure" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://hipaatimes.com/5-underserved-health-centers-join-forces-to-tackle-ai-challenges",
    sourceOrg: "HIPAA Times / HAIP",
    date: "2026-03-15",
    tags: ["haip", "duke-university", "peer-learning", "rural-fqhc", "ambient-scribe", "adoption-gap", "north-country-healthcare"],
  },
  {
    id: "imperial-beach-eclinicalworks-sunoh",
    title: {
      en: "Imperial Beach Community Clinic Selects eClinicalWorks AI Suite + Sunoh.ai",
      es: "Imperial Beach Community Clinic Selecciona Suite IA de eClinicalWorks + Sunoh.ai",
    },
    description: {
      en: "Imperial Beach Community Clinic, a California FQHC, selected eClinicalWorks AI-driven EHR, healow patient engagement solutions, and AI-powered medical scribe Sunoh.ai. This is notable as another California FQHC joining the NACHC-eClinicalWorks ecosystem, which offers bundled pricing through NACHC Select. The clinic joins Sun River Health (NY) and Suncoast CHC (FL) as FQHCs reporting productivity gains from the AI scribe platform.",
      es: "Imperial Beach Community Clinic, un FQHC de California, seleccionó el EHR impulsado por IA de eClinicalWorks, soluciones healow y el escriba médico Sunoh.ai. Otro FQHC de California que se une al ecosistema NACHC-eClinicalWorks con precios agrupados a través de NACHC Select.",
    },
    category: "clinical-documentation",
    vendor: "eClinicalWorks / Sunoh.ai",
    partnership: "NACHC-eClinicalWorks",
    metrics: [
      { label: "Platform", value: "eClinicalWorks + Sunoh.ai" },
      { label: "Pricing", value: "NACHC Select bundled" },
    ],
    adoptionStage: "pilot",
    sourceUrl:
      "https://www.eclinicalworks.com/31-provider-fqhc-to-leverage-eclinicalworks-ai-driven-ehr-and-sunoh-ai-ai-medical-scribe/",
    sourceOrg: "eClinicalWorks",
    date: "2026-02-15",
    tags: ["eclinicalworks", "sunoh", "california-fqhc", "nachc-select", "san-diego", "imperial-beach-community-clinic"],
  },
  {
    id: "ambient-ai-coding-policy-brief",
    title: {
      en: "Policy Brief: AI Scribes Drive Revenue Through Coding Intensity — Ethics Concerns",
      es: "Informe de Política: Escribas de IA Impulsan Ingresos a Través de Intensidad de Codificación",
    },
    description: {
      en: "A March 2026 PMC policy brief documents growing concerns that ambient AI scribes are being deployed not just for burnout relief but as revenue capture tools. Data from Riverside Health shows 11% rise in wRVUs and 14% increase in HCC diagnoses per encounter after AI scribe deployment. For FQHCs under PPS, coding intensity has limited revenue impact, but FQHCs in value-based contracts or Medicare Advantage capitation should monitor whether AI-generated notes are inflating risk scores inappropriately.",
      es: "Un informe de política de PMC documenta preocupaciones crecientes de que los escribas de IA ambiental se están desplegando no solo para aliviar el agotamiento sino como herramientas de captura de ingresos. Los FQHCs en contratos basados en valor deben monitorear si las notas generadas por IA están inflando puntajes de riesgo.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "wRVU Increase", value: "11% (Riverside Health)" },
      { label: "HCC Dx Increase", value: "14% per encounter" },
      { label: "Burnout Reduction", value: "51.9% → 38.8%" },
    ],
    adoptionStage: "framework",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12738533/",
    sourceOrg: "PMC / NIH",
    date: "2026-03-01",
    tags: ["policy", "coding-intensity", "revenue-capture", "ethics", "wrvus", "hcc"],
  },
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
    featured: true,
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
    tags: ["ambient-ai", "california-fqhc", "nabla", "patient-acceptance", "large-scale", "neighborhood-healthcare"],
    featured: true,
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
    featured: true,
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
    tags: ["ambient-ai", "scribe", "documentation", "native-american", "cultural-sensitivity", "tribal-health", "sacramento-native-american-health-center"],
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
    featured: true,
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
      "imperial-beach-community-clinic",
      "southern-california",
    ],
  },

  {
    id: "ai-scribe-coding-arms-race",
    title: {
      en: "Policy Brief: Ambient AI Scribes and the Coding Arms Race — Revenue vs. Burden Reduction",
      es: "Informe de Política: Escribas de IA Ambiental y la Carrera Armamentista de Codificación — Ingresos vs. Reducción de Carga",
    },
    description: {
      en: "A policy brief in npj Digital Medicine (Dec 2025) warns that ambient AI scribes are increasingly used for revenue capture, not just burden reduction — risking a 'coding arms race' between providers and payers. JAMA Network Open study (Jan 2026) found AI scribes increase physician RVUs by 1.81/week ($3,044/year per physician). Riverside Health saw 11% wRVU increase and 14% more HCC diagnoses with Abridge. For FQHCs on PPS: direct wRVU impact is limited since PPS is per-visit, but more complete documentation improves quality scores, risk adjustment for managed care contracts, and UDS reporting. FQHCs should focus on documentation completeness for quality metrics rather than coding intensity.",
      es: "Un informe en npj Digital Medicine (dic 2025) advierte que los escribas de IA ambiental se usan cada vez más para captura de ingresos, no solo reducción de carga — arriesgando una 'carrera armamentista de codificación'. Estudio de JAMA (ene 2026): los escribas de IA aumentan RVUs en 1.81/semana ($3,044/año por médico). Para FQHCs en PPS: el impacto directo de wRVU es limitado, pero la documentación más completa mejora métricas de calidad y ajuste de riesgo.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: "AMA Digital Medicine Payment Advisory Group",
    metrics: [
      { label: "RVU Increase", value: "+1.81/week per physician" },
      { label: "Annual Revenue", value: "+$3,044/physician" },
      { label: "HCC Capture", value: "+14% (Riverside Health)" },
    ],
    adoptionStage: "framework",
    sourceUrl: "https://www.nature.com/articles/s41746-025-02272-z",
    sourceOrg: "npj Digital Medicine / Nature",
    date: "2025-12-24",
    tags: ["upcoding", "coding-arms-race", "revenue-impact", "policy-brief", "pps-implications", "quality-metrics"],
    featured: true,
  },

  {
    id: "akido-labs-scopeai-bay-area-street-medicine",
    title: {
      en: "Akido Labs ScopeAI: Bay Area's First AI-Powered Safety Net Program for Unhoused Patients",
      es: "Akido Labs ScopeAI: Primer Programa de Red de Seguridad con IA del Área de la Bahía para Pacientes Sin Hogar",
    },
    description: {
      en: "Future Communities Institute, Akido Labs, Five Keys, and ReImagine Freedom launched the Bay Area's first AI-powered street medicine program in January 2026. ScopeAI guides community health workers through comprehensive patient visits on tablets — listening to encounters, suggesting follow-up questions, generating preliminary diagnoses (92% accurate in top 3), and producing clinical reports for remote physician review. In LA/Kern counties, the model already serves 6,000 unhoused patients with 70% six-month retention and 40% ED visit reduction. Funded entirely through Medi-Cal's CalAIM Enhanced Care Management — no grants. Providers see ~350 patients per physician (vs. 200 previously). Patients needing MAT receive treatment within 4 hours. Critics raise concerns about experimenting on vulnerable populations and algorithmic bias.",
      es: "Future Communities Institute, Akido Labs, Five Keys y ReImagine Freedom lanzaron el primer programa de medicina callejera con IA del Área de la Bahía en enero 2026. ScopeAI guía a trabajadores comunitarios de salud a través de visitas integrales en tabletas — escuchando encuentros, sugiriendo preguntas de seguimiento, generando diagnósticos preliminares (92% precisión) y produciendo informes clínicos para revisión médica remota. En LA/Kern ya sirve a 6,000 pacientes sin hogar con 70% retención a 6 meses y 40% reducción de visitas a urgencias. Financiado por CalAIM ECM de Medi-Cal — sin subvenciones.",
    },
    category: "care-coordination",
    vendor: "Akido Labs (ScopeAI)",
    partnership: "FCI + Five Keys + ReImagine Freedom",
    metrics: [
      { label: "Diagnostic Accuracy", value: "92% (top 3)" },
      { label: "ED Reduction", value: "40% (LA pilot)" },
      { label: "Patients Served", value: "6,000+ (LA/Kern)" },
      { label: "Retention (6mo)", value: "70%" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.ktvu.com/video/fmc-s5kjj7k3h2w09riy",
    sourceOrg: "KTVU / CalMatters",
    date: "2026-01-28",
    tags: ["street-medicine", "unhoused", "calAIM", "ecm", "bay-area", "chw-scope-expansion", "medi-cal", "lifelong-medical-care"],
    featured: true,
  },
  {
    id: "altamed-abridge-ai-partnership",
    title: {
      en: "AltaMed + Abridge: Nation's Largest FQHC Deploys AI Documentation in 28 Languages",
      es: "AltaMed + Abridge: El FQHC Más Grande del País Despliega Documentación IA en 28 Idiomas",
    },
    description: {
      en: "AltaMed Health Services — the nation's largest FQHC with 3,500+ staff, 250,000+ patients across 60+ sites — selected Abridge as its AI documentation platform after a structured pilot led by Dr. Eric Lee (Medical Director of Clinical Informatics). Abridge supports 28 languages including all 16 most-spoken in the U.S. AltaMed established an interdisciplinary AI governance committee, required providers to sign a responsible use agreement, and conducted phased rollout. Dr. Lee's first Abridge patient was Mandarin-speaking: 'Abridge was able to encapsulate that conversation into a perfect hospital summary.' AltaMed is also exploring AI for prior authorization denial letters — noting the risk of 'payer AI versus provider AI.' AltaMed's adoption signals ambient AI scribes are moving from early adopter FQHCs to enterprise-scale safety-net operations.",
      es: "AltaMed Health Services — el FQHC más grande del país con más de 3,500 empleados — seleccionó Abridge como su plataforma de documentación IA tras un piloto estructurado liderado por el Dr. Eric Lee. Abridge soporta 28 idiomas incluyendo los 16 más hablados en EE.UU. AltaMed estableció un comité de gobernanza de IA y requirió acuerdos de uso responsable antes del lanzamiento.",
    },
    category: "clinical-documentation",
    vendor: "Abridge",
    partnership: null,
    metrics: [
      { label: "Languages Supported", value: "28 (all 16 most-spoken in US)" },
      { label: "Organization Size", value: "3,500+ staff, 250K+ patients, 60+ sites" },
      { label: "Announced", value: "April 2025 (BusinessWire)" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.businesswire.com/news/home/20250429541473/en/AltaMed-Health-Services-Corporation-Partners-with-Abridge-to-Bring-Leading-AI-Technology-to-Multilingual-Communities",
    sourceOrg: "BusinessWire",
    date: "2025-04-29",
    tags: ["ai-scribe", "ambient-documentation", "altamed-health-services", "abridge", "los-angeles", "large-fqhc", "multilingual", "clinical-informatics"],
    featured: true,
  },
  // --- Added 2026-03-10 (daily update #16) ---
  {
    id: "no-barrier-ai-nachc-accelerator-2026",
    title: {
      en: "No Barrier AI Selected for NACHC Accelerator 2026 — AI Medical Interpretation Comes to FQHCs",
      es: "No Barrier AI Seleccionada para Acelerador NACHC 2026 — Interpretación Médica IA Llega a FQHCs",
    },
    description: {
      en: "No Barrier AI was selected for the NACHC Health Center Innovation Accelerator 2026 cohort to scale its AI-powered medical interpretation platform across FQHCs nationwide. The technology addresses a critical FQHC pain point: 20–25% of patients have limited English proficiency (LEP) but in-person interpreter staffing is expensive and often unavailable. No Barrier uses real-time AI translation across 100+ languages with medical terminology accuracy, integrating into existing EHR workflows. NACHC Accelerator selection signals institutional validation of AI interpretation as a viable alternative to traditional language services in safety-net settings.",
      es: "No Barrier AI fue seleccionada para la cohorte del Acelerador de Innovación del NACHC 2026 para escalar su plataforma de interpretación médica impulsada por IA en FQHCs a nivel nacional. La tecnología aborda un punto crítico de los FQHCs: 20–25% de pacientes tienen dominio limitado del inglés (LEP) pero la interpretación presencial es cara y a menudo no disponible. No Barrier usa traducción IA en tiempo real en más de 100 idiomas con precisión de terminología médica.",
    },
    category: "care-coordination",
    vendor: "No Barrier AI",
    partnership: "NACHC Innovation Accelerator",
    metrics: [
      { label: "Languages", value: "100+" },
      { label: "Target Population", value: "20-25% LEP patients at FQHCs" },
      { label: "Program", value: "NACHC Health Center Innovation Accelerator 2026" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://www.nobarrier.ai/post/nachc-accelerator-2026",
    sourceOrg: "No Barrier AI",
    date: "2026-03-01",
    tags: ["ai-interpretation", "language-access", "nachc", "lep", "multilingual", "care-coordination"],
    featured: false,
  },
  {
    id: "himss-2026-ai-implementation-maturity",
    title: {
      en: "HIMSS 2026: Healthcare AI Shifts from Hype to Implementation — FQHCs Among Early Adopters",
      es: "HIMSS 2026: La IA en Salud Pasa del Entusiasmo a la Implementación — FQHCs Entre los Primeros Adoptantes",
    },
    description: {
      en: "HIMSS 2026 and ViVE 2026 (March 2026) marked the industry's transition from 'what AI can do' to 'how to implement AI responsibly.' Key FQHC-relevant developments: ambient AI scribes moving from pilot to standard workflow (Abridge, Sunoh.ai, Nabla leading), AI governance frameworks being adopted (AltaMed's interdisciplinary committee model cited as exemplar), and growing recognition that FQHCs are ideal AI adoption environments due to high documentation burden, multilingual patient needs, and chronic staffing shortages. The conferences also highlighted emerging risks: coding upcreep from AI-optimized documentation and the 'payer AI vs. provider AI' arms race.",
      es: "HIMSS 2026 y ViVE 2026 (marzo 2026) marcaron la transición de la industria de 'qué puede hacer la IA' a 'cómo implementar la IA responsablemente.' Desarrollos clave para FQHCs: escribas ambientales IA pasando de piloto a flujo estándar, marcos de gobernanza de IA siendo adoptados, y reconocimiento de que los FQHCs son entornos ideales para adopción de IA por alta carga de documentación y necesidades multilingües.",
    },
    category: "policy-framework",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Event", value: "HIMSS 2026 + ViVE 2026, March 2026" },
      { label: "Key Theme", value: "Implementation over innovation" },
      { label: "FQHC Relevance", value: "High — multilingual, documentation burden, staffing" },
    ],
    adoptionStage: "framework",
    sourceUrl: "https://www.htworld.co.uk/insight/himss-2026-artificial-intelligence-finds-its-human-balance-finn26/",
    sourceOrg: "HTWorld",
    date: "2026-03-10",
    tags: ["himss", "vive", "ai-governance", "implementation", "ambient-ai", "conference"],
    featured: false,
  },
  // --- Added 2026-03-26 ---
  {
    id: "soundhound-ai-voice-agent-fqhc-scheduling",
    title: {
      en: "SoundHound AI Voice Agent Deployed at FQHC for Patient Scheduling",
      es: "Agente de Voz AI de SoundHound Implementado en FQHC para Programación de Pacientes",
    },
    description: {
      en: "Primary Health Solutions, an Ohio-based FQHC, deployed SoundHound's AI voice agent to handle inbound patient scheduling calls. The system triages and routes calls to optimize finite staff resources, addressing a common bottleneck at FQHCs where phone wait times deter patients from scheduling appointments. This represents the emerging 'AI front door' category — using voice AI for patient access rather than clinical documentation.",
      es: "Primary Health Solutions, un FQHC con sede en Ohio, implementó el agente de voz AI de SoundHound para manejar llamadas entrantes de programación de pacientes. El sistema clasifica y enruta llamadas para optimizar recursos limitados del personal.",
    },
    category: "scheduling",
    vendor: "SoundHound AI",
    partnership: null,
    metrics: [
      { label: "Use case", value: "Inbound patient scheduling & call routing" },
      { label: "Setting", value: "FQHC (Primary Health Solutions, Ohio)" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://www.emergingglobal.com/blog/how-ai-will-redefine-fqhc-access-scheduling-and-patient-experience-in-2026",
    sourceOrg: "Emerging Global",
    date: "2026-03-01",
    tags: ["voice-ai", "patient-access", "scheduling", "call-routing"],
  },
  {
    id: "nachc-scalehealth-accelerator-2026-cohort",
    title: {
      en: "NACHC-ScaleHealth 2026 Accelerator: 3 AI Companies Selected for CHC Innovation",
      es: "Acelerador NACHC-ScaleHealth 2026: 3 Empresas de IA Seleccionadas para Innovación en CHCs",
    },
    description: {
      en: "NACHC partnered with ScaleHealth for an inaugural 9-month accelerator featuring six health-tech companies targeting critical CHC challenges. Three of the six selections are AI-focused: No Barrier (AI medical interpretation for LEP patients), Cair Health (agentic AI for revenue cycle/billing automation), and Delfina Care (AI-powered pregnancy complication prediction). This is a curated NACHC pipeline of vetted technology entering the FQHC market — significant because NACHC endorsement often opens procurement doors at member CHCs.",
      es: "NACHC se asoció con ScaleHealth para un acelerador inaugural de 9 meses con seis empresas de tecnología de salud. Tres selecciones son enfocadas en IA: No Barrier (interpretación médica con IA), Cair Health (IA agéntica para automatización de facturación), y Delfina Care (predicción de complicaciones del embarazo con IA).",
    },
    category: "care-coordination",
    vendor: "No Barrier / Cair Health / Delfina Care",
    partnership: "NACHC-ScaleHealth",
    metrics: [
      { label: "Cohort size", value: "6 companies (3 AI-focused)" },
      { label: "Program duration", value: "9 months" },
      { label: "AI focus areas", value: "Medical interpretation, revenue cycle, maternal health" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://www.nachc.org/nachc-and-scalehealth-announce-2026-accelerator-cohort-to-drive-innovation-in-community-health-centers/",
    sourceOrg: "NACHC",
    date: "2026-03-01",
    tags: ["nachc-accelerator", "scalehealth", "medical-interpretation", "revenue-cycle", "maternal-health"],
    featured: true,
  },
  {
    id: "vision-enabled-ai-scribe-smart-glasses-gemini",
    title: {
      en: "Vision-Enabled AI Scribes: Smart Glasses + Gemini Reduce Clinical Documentation Omissions to 2%",
      es: "Escribas de IA con Visión: Lentes Inteligentes + Gemini Reducen Omisiones de Documentación Clínica al 2%",
    },
    description: {
      en: "Researchers developed a vision-enabled AI scribe using Google's Gemini model and Ray-Ban Meta smart glasses for clinical documentation. The vision-enabled system achieved 98% overall accuracy versus 81% for audio-only processing, significantly reducing omissions in medication history capture. While still a research prototype, the multilingual and visual-context capabilities could be transformative for safety-net settings where encounters involve interpreters, physical demonstrations, and medication packaging. Published in npj Digital Medicine.",
      es: "Investigadores desarrollaron un escriba de IA con visión usando el modelo Gemini de Google y lentes inteligentes Ray-Ban Meta para documentación clínica. El sistema logró 98% de precisión general versus 81% para procesamiento solo de audio, reduciendo significativamente las omisiones en la captura del historial de medicamentos. Las capacidades multilingües y de contexto visual podrían ser transformadoras para entornos de red de seguridad.",
    },
    category: "clinical-documentation",
    vendor: "Google Gemini / Ray-Ban Meta (research prototype)",
    partnership: null,
    metrics: [
      { label: "Overall accuracy (vision)", value: "98%" },
      { label: "Overall accuracy (audio-only)", value: "81%" },
      { label: "Technology", value: "Gemini + Ray-Ban Meta smart glasses" },
    ],
    adoptionStage: "pilot",
    sourceUrl: "https://www.nature.com/articles/s41746-026-02494-9",
    sourceOrg: "npj Digital Medicine",
    date: "2026-03-01",
    tags: ["smart-glasses", "gemini", "vision-ai", "medication-history", "research-prototype"],
    featured: false,
  },

  // ── Daily Update #26 (2026-04-06) ──────────────────────────────────

  {
    id: "ai-scribe-1800-clinician-study-modest-savings",
    title: {
      en: "Largest AI Scribe Study: 1,800 Clinicians Save Just 16 Minutes Per Shift",
      es: "Estudio Más Grande de Escribas IA: 1,800 Clínicos Ahorran Solo 16 Minutos por Turno",
    },
    description: {
      en: "The largest real-world AI scribe study to date — 1,800 clinicians across 5 academic medical centers (2023-2025) — found AI scribes save only 16 minutes of documentation time and 13 fewer minutes in EHR per 8-hour shift. Primary care physicians and female clinicians benefited most. No significant reduction in after-hours EHR time. For FQHCs with tight budgets, burnout reduction may matter more than productivity gains.",
      es: "El estudio más grande de escribas IA — 1,800 clínicos en 5 centros médicos académicos — encontró que los escribas IA ahorran solo 16 minutos de tiempo de documentación por turno de 8 horas. La reducción del agotamiento puede importar más que las ganancias de productividad para FQHCs.",
    },
    category: "clinical-documentation",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Study Size", value: "1,800 clinicians across 5 academic medical centers" },
      { label: "Time Savings", value: "16 min documentation + 13 min less in EHR per shift" },
      { label: "Key Finding", value: "Modest productivity gain; burnout reduction may be primary value" },
    ],
    adoptionStage: "widely-adopted",
    sourceUrl: "https://www.statnews.com/2026/04/01/ai-ambient-scribes-modest-time-savings-clinical-documentation/",
    sourceOrg: "STAT News",
    date: "2026-04-01",
    tags: ["ai-scribe", "time-savings", "burnout", "roi-analysis", "primary-care"],
    featured: true,
  },
  {
    id: "npj-digital-medicine-ai-scribe-scaling-barriers",
    title: {
      en: "Study: AI Scribe Scaling Hits Language Barriers — English-Only Defaults Limit Safety-Net Use",
      es: "Estudio: Escalamiento de Escribas IA Encuentra Barreras de Idioma — Predeterminados en Inglés Limitan Uso en Red de Seguridad",
    },
    description: {
      en: "Peer-reviewed paper (Ohde et al.) in npj Digital Medicine identifies critical barriers to scaling ambient AI scribes beyond low-acuity ambulatory settings. Error rates of 1-3% introduce dangerous failure modes. Major barrier for FQHCs: English-only transcription remains the default despite multilingual claims — directly affects California FQHCs where 40%+ of encounters involve non-English speakers.",
      es: "Un artículo revisado por pares en npj Digital Medicine identifica barreras críticas para escalar escribas IA ambientales. Barrera principal para FQHCs: la transcripción solo en inglés sigue siendo el predeterminado — afecta directamente a FQHCs de California donde el 40%+ de los encuentros son en otros idiomas.",
    },
    category: "clinical-documentation",
    vendor: null,
    partnership: null,
    metrics: [
      { label: "Error Rate", value: "1-3% with dangerous failure modes" },
      { label: "Key Barrier", value: "English-only transcription despite multilingual claims" },
      { label: "FQHC Impact", value: "40%+ non-English encounters in CA FQHCs" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.nature.com/articles/s41746-026-02554-0",
    sourceOrg: "npj Digital Medicine",
    date: "2026-04-06",
    tags: ["ai-scribe", "language-barriers", "multilingual", "safety", "error-rates"],
    featured: false,
  },
  {
    id: "oak-orchard-health-full-ai-suite-ecw-sunoh",
    title: {
      en: "Oak Orchard Health Deploys Full AI Suite: eClinicalWorks + Sunoh.ai + healow",
      es: "Oak Orchard Health Despliega Suite Completa de IA: eClinicalWorks + Sunoh.ai + healow",
    },
    description: {
      en: "Oak Orchard Health, an FQHC serving 30,000+ patients in western New York, has deployed a full AI suite: Sunoh.ai ambient scribe for real-time clinical documentation, healow for patient engagement/scheduling/payment, and eClinicalWorks as the EHR backbone. Notable as a full-stack AI FQHC deployment — not just ambient scribes but AI across documentation, engagement, and billing.",
      es: "Oak Orchard Health, un FQHC que atiende a más de 30,000 pacientes en Nueva York, ha desplegado una suite completa de IA: Sunoh.ai, healow, y eClinicalWorks. Demuestra la estrategia del ecosistema eClinicalWorks para penetración del mercado FQHC.",
    },
    category: "clinical-documentation",
    vendor: "eClinicalWorks + Sunoh.ai",
    partnership: null,
    metrics: [
      { label: "FQHC", value: "Oak Orchard Health (NY, 30K+ patients)" },
      { label: "Stack", value: "eClinicalWorks + Sunoh.ai + healow" },
      { label: "Scope", value: "Full-stack: documentation + engagement + billing" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://www.medicaleconomics.com/view/fqhc-uses-suite-of-ai-tools-to-improve-documentation-and-engagement",
    sourceOrg: "Medical Economics",
    date: "2025-12-01",
    tags: ["eclinicalworks", "sunoh", "healow", "full-stack-ai", "fqhc-deployment"],
    featured: false,
  },

  // ── Daily Update #27 (2026-04-07) ──────────────────────────────────

  {
    id: "amazon-connect-health-agentic-ai-march-2026",
    title: {
      en: "AWS Launches Amazon Connect Health \u2014 Agentic AI for Healthcare Operations",
      es: "AWS Lanza Amazon Connect Health \u2014 IA Ag\u00e9ntica para Operaciones de Salud",
    },
    description: {
      en: "AWS launched Amazon Connect Health (GA March 5, 2026), a HIPAA-eligible agentic AI platform automating scheduling, documentation, patient verification, and medical coding. Integrates with EHRs. Netsmart (1,300+ community-based provider clients) has deployed it. Deployable in days, not months. Relevant for FQHCs seeking affordable AI automation beyond clinical documentation.",
      es: "AWS lanz\u00f3 Amazon Connect Health (GA 5 de marzo, 2026), una plataforma de IA ag\u00e9ntica compatible con HIPAA que automatiza programaci\u00f3n, documentaci\u00f3n, verificaci\u00f3n de pacientes y codificaci\u00f3n m\u00e9dica. Netsmart (1,300+ clientes) ya lo implementa.",
    },
    category: "scheduling",
    vendor: "Amazon Web Services",
    partnership: "Netsmart",
    metrics: [
      { label: "Launch", value: "GA March 5, 2026" },
      { label: "Scope", value: "Scheduling, documentation, verification, coding" },
      { label: "Early Adopter", value: "Netsmart (1,300+ community providers)" },
    ],
    adoptionStage: "expanding",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-connect-health-agentic-ai-healthcare/",
    sourceOrg: "AWS",
    date: "2026-03-05",
    tags: ["aws", "amazon-connect", "agentic-ai", "scheduling", "netsmart", "hipaa"],
    featured: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */
/*  AI Vendor Comparison                                               */
/* ------------------------------------------------------------------ */

export type VendorCategory =
  | "ambient-documentation"
  | "revenue-cycle"
  | "care-coordination"
  | "population-health"
  | "patient-engagement"
  | "ehr-native";

export interface EHRIntegration {
  ehr: string;
  level: "native" | "api" | "partial" | "none";
}

export interface AIVendor {
  id: string;
  name: string;
  tagline: { en: string; es: string };
  category: VendorCategory;
  description: { en: string; es: string };
  pricingModel: "subscription" | "per-encounter" | "bundled" | "grant-funded" | "unknown";
  pricingNote: { en: string; es: string } | null;
  ehrIntegrations: EHRIntegration[];
  fqhcCustomers: string[];  // named FQHC customers (public)
  nachcEndorsed: boolean;
  chaiCertified: boolean;
  nhscSiteEligible: boolean;  // whether NHSC loan repayment sites can use it
  keyFeatures: { en: string; es: string }[];
  knownLimitations: { en: string; es: string }[];
  sourceUrl: string;
  sourceOrg: string;
  lastVerified: string;  // ISO date
  fqhcFit: "high" | "moderate" | "low";  // our editorial assessment
  fqhcFitReason: { en: string; es: string };
}

export const FQHC_AI_VENDORS: AIVendor[] = [
  {
    id: "sunoh-eclinicalworks",
    name: "Sunoh.ai (eClinicalWorks)",
    tagline: {
      en: "Ambient AI documentation integrated with eClinicalWorks EHR",
      es: "Documentación ambiental de IA integrada con EHR eClinicalWorks",
    },
    category: "ambient-documentation",
    description: {
      en: "Sunoh.ai is eClinicalWorks' embedded ambient AI scribe. It listens to patient-provider conversations and auto-generates SOAP notes directly in the eCW EHR. Named FQHC results: Sun River Health providers completed notes on 26 patients within 30 minutes. AltaMed deployed across 600+ providers. Sacramento Native American Health Center achieved 43% reduction in after-hours charting.",
      es: "Sunoh.ai es el escriba ambiental de IA integrado de eClinicalWorks. Escucha conversaciones entre paciente y proveedor y genera automáticamente notas SOAP directamente en el EHR de eCW.",
    },
    pricingModel: "bundled",
    pricingNote: {
      en: "Included in NACHC Select (discounted eClinicalWorks bundle for NACHC member CHCs). Pricing varies by site count.",
      es: "Incluido en NACHC Select (paquete de eClinicalWorks con descuento para CHCs miembros de NACHC).",
    },
    ehrIntegrations: [
      { ehr: "eClinicalWorks", level: "native" },
      { ehr: "OCHIN Epic", level: "none" },
      { ehr: "athenahealth", level: "none" },
      { ehr: "NextGen", level: "none" },
    ],
    fqhcCustomers: ["Sun River Health", "AltaMed", "Sacramento Native American Health Center"],
    nachcEndorsed: true,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "Native eCW integration — no copy-paste workflow", es: "Integración nativa con eCW — sin flujo de copiar y pegar" },
      { en: "SOAP note auto-generation from ambient conversation", es: "Generación automática de notas SOAP desde conversación ambiental" },
      { en: "Multi-language support (Spanish available)", es: "Soporte multilingüe (español disponible)" },
      { en: "Bundled in NACHC Select for cost access", es: "Incluido en NACHC Select para acceso a costos" },
    ],
    knownLimitations: [
      { en: "eClinicalWorks-only — no value for Epic/OCHIN shops", es: "Solo eClinicalWorks — sin valor para sitios con Epic/OCHIN" },
      { en: "Documentation quality varies by provider speaking style", es: "La calidad de la documentación varía según el estilo de habla del proveedor" },
    ],
    sourceUrl: "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    sourceOrg: "NACHC",
    lastVerified: "2026-03-07",
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Best fit for the ~40% of FQHCs using eClinicalWorks. NACHC endorsement + NACHC Select bundled pricing makes it the most accessible ambient AI for safety-net sites.",
      es: "La mejor opción para el ~40% de los FQHCs que usan eClinicalWorks. El respaldo de NACHC + precios en paquete de NACHC Select lo convierte en el AI ambiental más accesible para sitios de red de seguridad.",
    },
  },
  {
    id: "abridge",
    name: "Abridge",
    tagline: {
      en: "Best in KLAS 2026 ambient AI scribe — works with Epic and OCHIN",
      es: "Mejor en KLAS 2026 para escriba ambiental de IA — funciona con Epic y OCHIN",
    },
    category: "ambient-documentation",
    description: {
      en: "Abridge is an enterprise ambient AI documentation platform that earned Best in KLAS 2026 for Ambient Clinical Voice. Published results: burnout reduction from 51.9% to 38.8% at UCSF, after-hours charting cut by 26%. Integrated with Epic (native) and expanding to OCHIN. Academic medical center and FQHC adoption accelerating in 2025-2026.",
      es: "Abridge es una plataforma de documentación de IA ambiental empresarial que ganó Best in KLAS 2026 para Voz Clínica Ambiental. Resultados publicados: reducción del agotamiento del 51.9% al 38.8% en UCSF.",
    },
    pricingModel: "subscription",
    pricingNote: {
      en: "Per-provider subscription. Enterprise pricing — typically $3,000–6,000/provider/year. Safety-net discounts available; contact Abridge directly.",
      es: "Suscripción por proveedor. Precios empresariales — típicamente $3,000–6,000/proveedor/año. Descuentos para red de seguridad disponibles.",
    },
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "native" },
      { ehr: "Epic", level: "native" },
      { ehr: "eClinicalWorks", level: "none" },
      { ehr: "athenahealth", level: "partial" },
    ],
    fqhcCustomers: ["AltaMed Health Services", "UCSF Health", "Kaiser Permanente"],
    nachcEndorsed: false,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "Best in KLAS 2026 — highest-rated ambient AI in healthcare", es: "Best in KLAS 2026 — IA ambiental mejor calificada en salud" },
      { en: "Native Epic integration including OCHIN builds", es: "Integración nativa con Epic incluyendo configuraciones de OCHIN" },
      { en: "Published burnout reduction data (51.9% → 38.8%)", es: "Datos publicados de reducción del agotamiento (51.9% → 38.8%)" },
      { en: "AI-generated draft notes — provider edits and approves", es: "Notas borrador generadas por IA — el proveedor edita y aprueba" },
    ],
    knownLimitations: [
      { en: "Premium pricing — challenging for budget-constrained FQHCs", es: "Precios premium — desafiante para FQHCs con presupuesto limitado" },
      { en: "No eClinicalWorks integration (40% of FQHCs)", es: "Sin integración con eClinicalWorks (40% de los FQHCs)" },
      { en: "Concern about AI-driven upcoding in RVU-based systems (npj Digital Medicine 2026)", es: "Preocupación sobre codificación al alza impulsada por IA en sistemas basados en RVU" },
    ],
    sourceUrl: "https://www.klas.com/reports/ambient-clinical-voice-2026-best-in-klas",
    sourceOrg: "KLAS Research",
    lastVerified: "2026-03-06",
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Now validated by AltaMed — the nation's largest FQHC (250K+ patients) — with 28-language support proving essential for multilingual safety-net populations. Best in KLAS 2026. Cost barrier remains for smaller FQHCs; safety-net pricing available.",
      es: "Ahora validado por AltaMed — el FQHC más grande del país — con soporte en 28 idiomas esencial para poblaciones de red de seguridad multilingüe. Best in KLAS 2026. El costo sigue siendo una barrera para FQHCs más pequeños.",
    },
  },
  {
    id: "nabla",
    name: "Nabla",
    tagline: {
      en: "Ambient AI for independent and community health — works across multiple EHRs",
      es: "IA ambiental para salud independiente y comunitaria — funciona en múltiples EHR",
    },
    category: "ambient-documentation",
    description: {
      en: "Nabla is a physician-designed ambient AI documentation platform with EHR-agnostic deployment. Proven in FQHCs: Neighborhood Healthcare (San Diego) piloted Nabla with a 4.4/5 provider satisfaction score. Works via web app or mobile — no deep EHR integration required, making it accessible for FQHCs with smaller IT infrastructure.",
      es: "Nabla es una plataforma de documentación de IA ambiental diseñada por médicos con implementación agnóstica de EHR. Probada en FQHCs: Neighborhood Healthcare (San Diego) pilotó Nabla con una puntuación de satisfacción de proveedores de 4.4/5.",
    },
    pricingModel: "subscription",
    pricingNote: {
      en: "Per-provider or site-based subscription. More affordable than Abridge; community health pricing available. Starts ~$99/provider/month.",
      es: "Suscripción por proveedor o sitio. Más asequible que Abridge; precios para salud comunitaria disponibles.",
    },
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "athenahealth", level: "api" },
      { ehr: "NextGen", level: "api" },
    ],
    fqhcCustomers: ["Neighborhood Healthcare (San Diego)"],
    nachcEndorsed: false,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "EHR-agnostic — works with any EHR including older systems", es: "Agnóstico de EHR — funciona con cualquier EHR incluyendo sistemas más antiguos" },
      { en: "No complex IT integration required — web/mobile app", es: "No requiere integración de IT compleja — aplicación web/móvil" },
      { en: "Proven in FQHC setting (Neighborhood Healthcare pilot)", es: "Probado en entorno de FQHC (piloto de Neighborhood Healthcare)" },
      { en: "Physician-designed workflow", es: "Flujo de trabajo diseñado por médicos" },
    ],
    knownLimitations: [
      { en: "API-based (not native) EHR integration — extra steps to push notes", es: "Integración de EHR basada en API (no nativa) — pasos adicionales para enviar notas" },
      { en: "Less brand recognition than Abridge or Nuance/DAX", es: "Menos reconocimiento de marca que Abridge o Nuance/DAX" },
    ],
    sourceUrl: "https://www.healthcareitnews.com/news/neighborhood-healthcare-pilots-nabla-ambient-ai-4-5-satisfaction-score",
    sourceOrg: "Healthcare IT News",
    lastVerified: "2026-03-04",
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Ideal for FQHCs without deep IT resources — EHR-agnostic deployment, FQHC-validated, and affordable relative to enterprise alternatives.",
      es: "Ideal para FQHCs sin recursos de IT profundos — implementación agnóstica de EHR, validado en FQHC y asequible en relación a alternativas empresariales.",
    },
  },
  {
    id: "rapidclaims",
    name: "RapidClaims",
    tagline: {
      en: "AI-powered revenue cycle and medical coding for FQHCs",
      es: "Ciclo de ingresos e codificación médica impulsados por IA para FQHCs",
    },
    category: "revenue-cycle",
    description: {
      en: "RapidClaims uses AI to automate medical coding and revenue cycle management — particularly relevant for FQHCs whose PPS billing model creates unique coding complexity. Can integrate with major FQHC EHRs. Reduces coder FTE requirements and improves first-pass claim approval rates. Tracked as a high-interest tool in the FQHC sector by NACHC.",
      es: "RapidClaims usa IA para automatizar la codificación médica y la gestión del ciclo de ingresos — particularmente relevante para FQHCs cuyo modelo de facturación PPS crea una complejidad de codificación única.",
    },
    pricingModel: "per-encounter",
    pricingNote: {
      en: "Per-encounter pricing — variable cost scales with patient volume. No upfront license fee.",
      es: "Precios por encuentro — el costo variable escala con el volumen de pacientes. Sin tarifa de licencia inicial.",
    },
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "athenahealth", level: "api" },
      { ehr: "NextGen", level: "api" },
    ],
    fqhcCustomers: [],
    nachcEndorsed: false,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "Automates ICD-10 and CPT coding from clinical documentation", es: "Automatiza la codificación ICD-10 y CPT desde la documentación clínica" },
      { en: "PPS encounter coding expertise for FQHC-specific billing", es: "Experiencia en codificación de encuentros PPS para facturación específica de FQHC" },
      { en: "Reduces coder FTE burden — especially useful during staff cuts", es: "Reduce la carga de FTE de codificadores — especialmente útil durante recortes de personal" },
      { en: "First-pass claim rate improvement", es: "Mejora de la tasa de aprobación de reclamaciones en primer intento" },
    ],
    knownLimitations: [
      { en: "AI coding carries compliance risk — requires human review process", es: "La codificación de IA conlleva riesgo de cumplimiento — requiere proceso de revisión humana" },
      { en: "Limited FQHC customer references available publicly", es: "Referencias de clientes de FQHC limitadas disponibles públicamente" },
    ],
    sourceUrl: "https://www.nachc.org/topic/health-information-technology/",
    sourceOrg: "NACHC",
    lastVerified: "2026-03-01",
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "High-value for FQHCs facing revenue pressure from funding cuts — automating coding during workforce reductions is a direct savings mechanism. Due diligence on compliance process required.",
      es: "Alto valor para FQHCs que enfrentan presión de ingresos por recortes de financiamiento — automatizar la codificación durante reducciones de personal es un mecanismo de ahorro directo.",
    },
  },
  {
    id: "akido-scopeai",
    name: "Akido Labs ScopeAI",
    tagline: {
      en: "AI for CHW-led street medicine — CalAIM ECM integrated",
      es: "IA para medicina callejera liderada por CHW — integrado con CalAIM ECM",
    },
    category: "care-coordination",
    description: {
      en: "ScopeAI by Akido Labs guides Community Health Workers through comprehensive street medicine visits using AI decision support. Featured on KTVU Fox 2 (Jan 2026). Key results: 92% diagnostic accuracy for CHW-conducted assessments, MAT (medication-assisted treatment for OUD) prescribed within 4 hours of first contact, 40% reduction in ED utilization among enrolled patients. Fully funded by Medi-Cal CalAIM Enhanced Care Management in deployment.",
      es: "ScopeAI de Akido Labs guía a los Trabajadores de Salud Comunitaria a través de visitas de medicina callejera integrales usando soporte de decisión de IA. Resultados clave: 92% de precisión diagnóstica, MAT prescrito en 4 horas, reducción del 40% en utilización de urgencias.",
    },
    pricingModel: "grant-funded",
    pricingNote: {
      en: "Funded through CalAIM Enhanced Care Management (ECM) billing — no additional cost to FQHC if CalAIM ECM-certified. Contact Akido Labs for non-ECM pricing.",
      es: "Financiado a través de la facturación de Gestión de Atención Mejorada (ECM) de CalAIM — sin costo adicional para el FQHC si está certificado como ECM de CalAIM.",
    },
    ehrIntegrations: [
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "OCHIN Epic", level: "partial" },
    ],
    fqhcCustomers: ["HealthRight 360", "Bay Area community health partners"],
    nachcEndorsed: false,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "CHW-facing AI — not provider-facing (unique differentiator)", es: "IA orientada al CHW — no al proveedor (diferenciador único)" },
      { en: "CalAIM ECM billable — effectively grant-funded for CA FQHCs", es: "Facturable como ECM de CalAIM — efectivamente financiado por subvenciones para FQHCs de CA" },
      { en: "Street medicine and unsheltered population expertise", es: "Especialización en medicina callejera y población sin hogar" },
      { en: "92% diagnostic accuracy validated in real-world CHW deployment", es: "92% de precisión diagnóstica validada en implementación real de CHW" },
    ],
    knownLimitations: [
      { en: "California-specific CalAIM funding model — may not apply outside CA", es: "Modelo de financiamiento CalAIM específico de California — puede no aplicar fuera de CA" },
      { en: "Best suited for FQHCs with active ECM/homeless outreach programs", es: "Más adecuado para FQHCs con programas activos de ECM/extensión a personas sin hogar" },
    ],
    sourceUrl: "https://www.ktvu.com/video/fmc-s5kjj7k3h2w09riy",
    sourceOrg: "KTVU Fox 2",
    lastVerified: "2026-01-15",
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Uniquely valuable for CA FQHCs with CalAIM ECM programs — effectively free via ECM billing, with proven outcomes for the highest-acuity population.",
      es: "Únicamente valioso para FQHCs de CA con programas CalAIM ECM — efectivamente gratuito a través de la facturación ECM, con resultados comprobados para la población de mayor agudeza.",
    },
  },
  {
    id: "healow-ai",
    name: "healow AI (eClinicalWorks)",
    tagline: {
      en: "AI-powered no-show prediction and appointment optimization for eCW sites",
      es: "Predicción de inasistencia y optimización de citas impulsadas por IA para sitios de eCW",
    },
    category: "patient-engagement",
    description: {
      en: "healow AI is eClinicalWorks' patient engagement and scheduling intelligence platform. Its no-show prediction algorithm helps FQHC schedulers proactively fill canceled slots, reducing the revenue impact of missed appointments — a critical issue for FQHCs where no-show rates can reach 20-30%. Part of NACHC Select bundle.",
      es: "healow AI es la plataforma de participación de pacientes e inteligencia de programación de eClinicalWorks. Su algoritmo de predicción de inasistencia ayuda a los programadores de FQHC a llenar proactivamente los espacios cancelados.",
    },
    pricingModel: "bundled",
    pricingNote: {
      en: "Included in NACHC Select (eClinicalWorks bundle for NACHC member CHCs).",
      es: "Incluido en NACHC Select (paquete de eClinicalWorks para CHCs miembros de NACHC).",
    },
    ehrIntegrations: [
      { ehr: "eClinicalWorks", level: "native" },
    ],
    fqhcCustomers: ["Urban Health Plan (NYC)"],
    nachcEndorsed: true,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "No-show prediction — fills slots before they're lost", es: "Predicción de inasistencia — llena espacios antes de que se pierdan" },
      { en: "Automated patient reminders and confirmations", es: "Recordatorios y confirmaciones automáticas de pacientes" },
      { en: "Bundled with Sunoh.ai in NACHC Select — single vendor relationship", es: "Incluido con Sunoh.ai en NACHC Select — relación con proveedor único" },
      { en: "Access optimization reporting for leadership dashboards", es: "Informes de optimización de acceso para paneles de liderazgo" },
    ],
    knownLimitations: [
      { en: "eClinicalWorks-only", es: "Solo eClinicalWorks" },
      { en: "No-show prediction accuracy varies by population and data history", es: "La precisión de predicción de inasistencia varía según la población y el historial de datos" },
    ],
    sourceUrl: "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    sourceOrg: "NACHC",
    lastVerified: "2026-03-07",
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "High-value for eCW FQHCs — no-show management directly impacts revenue. Access via NACHC Select is cost-efficient. Epic/other EHR sites should look at native scheduling analytics.",
      es: "Alto valor para FQHCs con eCW — la gestión de inasistencias impacta directamente los ingresos. El acceso a través de NACHC Select es rentable.",
    },
  },
  {
    id: "elation-ai",
    name: "Elation Health AI",
    tagline: {
      en: "AI-powered clinical intelligence for independent and community primary care",
      es: "Inteligencia clínica impulsada por IA para atención primaria independiente y comunitaria",
    },
    category: "ehr-native",
    description: {
      en: "Elation Health is an EHR designed for independent primary care with native AI features including chart summarization, gap-in-care detection, and clinical decision support. Growing adoption among smaller FQHCs (1-5 sites) that find Epic/eCW too complex. Particularly popular in rural and frontier FQHC settings.",
      es: "Elation Health es un EHR diseñado para atención primaria independiente con funciones de IA nativas que incluyen resumen de historial, detección de brechas en la atención y soporte de decisión clínica.",
    },
    pricingModel: "subscription",
    pricingNote: {
      en: "Per-provider subscription. More affordable than Epic or eCW for small sites. Contact for FQHC-specific pricing.",
      es: "Suscripción por proveedor. Más asequible que Epic o eCW para sitios pequeños.",
    },
    ehrIntegrations: [
      { ehr: "Elation Health (native)", level: "native" },
    ],
    fqhcCustomers: ["Multiple small/rural FQHCs (not publicly named)"],
    nachcEndorsed: false,
    chaiCertified: false,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "Built-in AI chart summarization — no add-on required", es: "Resumen de historial con IA integrado — no requiere complemento" },
      { en: "Care gap detection for HEDIS/UDS quality measures", es: "Detección de brechas de atención para medidas de calidad HEDIS/UDS" },
      { en: "Simpler implementation than Epic or eCW — ideal for small FQHCs", es: "Implementación más sencilla que Epic o eCW — ideal para FQHCs pequeños" },
      { en: "Regulatory compliance tools built in (HIPAA, PCMH)", es: "Herramientas de cumplimiento regulatorio integradas (HIPAA, PCMH)" },
    ],
    knownLimitations: [
      { en: "Not widely used by large FQHCs — limited peer benchmarking", es: "No ampliamente utilizado por grandes FQHCs — benchmarking de pares limitado" },
      { en: "Less FQHC-specific content than OCHIN Epic or eCW", es: "Menos contenido específico de FQHC que OCHIN Epic o eCW" },
    ],
    sourceUrl: "https://www.elationhealth.com",
    sourceOrg: "Elation Health",
    lastVerified: "2026-02-15",
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Best fit for small (1-5 site) FQHCs looking for a simpler EHR with built-in AI. Not the right choice for sites that need ECM billing complexity or are Epic/eCW shops.",
      es: "Mejor opción para FQHCs pequeños (1-5 sitios) que buscan un EHR más sencillo con IA integrada.",
    },
  },
  {
    id: "chai-nachc-framework",
    name: "CHAI-NACHC AI Evaluation Framework",
    tagline: {
      en: "Free AI governance and vendor evaluation framework built for community health centers",
      es: "Marco gratuito de gobernanza de IA y evaluación de proveedores construido para centros de salud comunitarios",
    },
    category: "population-health",
    description: {
      en: "The Coalition for Health AI (CHAI) and NACHC partnered to create a vendor-neutral AI evaluation and governance framework specifically for community health centers. Includes an 'AI in Healthcare for the Safety Net' curriculum, a CHC-specific vendor assessment checklist, and a soon-to-come vendor certification program. Free for NACHC member organizations.",
      es: "La Coalición para IA en Salud (CHAI) y NACHC se asociaron para crear un marco de evaluación y gobernanza de IA neutral para proveedores, específicamente para centros de salud comunitarios.",
    },
    pricingModel: "grant-funded",
    pricingNote: {
      en: "Free for NACHC member CHCs. Non-members can access framework guidance through CHAI's public resources.",
      es: "Gratuito para CHCs miembros de NACHC. Los no miembros pueden acceder a la guía del marco a través de los recursos públicos de CHAI.",
    },
    ehrIntegrations: [],
    fqhcCustomers: ["All 1,400+ NACHC member CHCs (access)"],
    nachcEndorsed: true,
    chaiCertified: true,
    nhscSiteEligible: false,
    keyFeatures: [
      { en: "Vendor assessment checklist tailored for safety-net organizations", es: "Lista de verificación de evaluación de proveedores adaptada para organizaciones de red de seguridad" },
      { en: "AI curriculum: 'AI in Healthcare for the Safety Net'", es: "Currículo de IA: 'IA en Salud para la Red de Seguridad'" },
      { en: "Vendor certification program (in development as of 2025)", es: "Programa de certificación de proveedores (en desarrollo a partir de 2025)" },
      { en: "Free, open-source governance tools", es: "Herramientas de gobernanza gratuitas y de código abierto" },
    ],
    knownLimitations: [
      { en: "Framework only — not a product. Must still select and implement a vendor.", es: "Solo marco — no es un producto. Aún debe seleccionar e implementar un proveedor." },
      { en: "Vendor certification not yet launched as of March 2026", es: "Certificación de proveedores aún no lanzada a partir de marzo de 2026" },
    ],
    sourceUrl: "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
    sourceOrg: "NACHC / CHAI",
    lastVerified: "2026-03-07",
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Use this BEFORE selecting any AI vendor. The CHAI-NACHC framework helps FQHCs ask the right questions, evaluate equity implications, and avoid costly vendor lock-in.",
      es: "Úsalo ANTES de seleccionar cualquier proveedor de IA. El marco CHAI-NACHC ayuda a los FQHCs a hacer las preguntas correctas, evaluar las implicaciones de equidad y evitar el bloqueo costoso de proveedores.",
    },
  },
];

export const VENDOR_CATEGORY_LABELS: Record<VendorCategory, { en: string; es: string; icon: string }> = {
  "ambient-documentation": { en: "Ambient Documentation", es: "Documentación Ambiental", icon: "🎙️" },
  "revenue-cycle": { en: "Revenue Cycle", es: "Ciclo de Ingresos", icon: "💰" },
  "care-coordination": { en: "Care Coordination", es: "Coordinación de Atención", icon: "🤝" },
  "population-health": { en: "Population Health / Framework", es: "Salud Poblacional / Marco", icon: "📊" },
  "patient-engagement": { en: "Patient Engagement", es: "Participación del Paciente", icon: "📱" },
  "ehr-native": { en: "EHR-Native AI", es: "IA Nativa del EHR", icon: "🏥" },
};

export function getVendorsByEHR(ehr: string): AIVendor[] {
  return FQHC_AI_VENDORS.filter((v) =>
    v.ehrIntegrations.some((e) => e.ehr.toLowerCase().includes(ehr.toLowerCase()) && e.level !== "none")
  );
}

export function getVendorsByCategory(category: VendorCategory): AIVendor[] {
  return FQHC_AI_VENDORS.filter((v) => v.category === category);
}

export function getHighFitVendors(): AIVendor[] {
  return FQHC_AI_VENDORS.filter((v) => v.fqhcFit === "high");
}

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

/** Get featured/curated items sorted by date desc */
export function getFeaturedAIItems(): AIAdoptionItem[] {
  return [...AI_ADOPTION_ITEMS]
    .filter((i) => i.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get AI adoption items relevant to a specific FQHC by slug or name */
export function getAIAdoptionForFQHC(
  slug: string,
  fqhcName: string
): AIAdoptionItem[] {
  const nameWords = fqhcName.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return AI_ADOPTION_ITEMS.filter((item) => {
    // Check tags for slug match
    if (item.tags.some((t) => t.toLowerCase() === slug.toLowerCase())) return true;
    // Check description for FQHC name match
    const desc = item.description.en.toLowerCase();
    if (nameWords.length >= 2 && nameWords.every((w) => desc.includes(w))) return true;
    return false;
  }).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Get AI vendors used by a specific FQHC (by name match in fqhcCustomers) */
export function getVendorsForFQHC(fqhcName: string): AIVendor[] {
  return FQHC_AI_VENDORS.filter((v) =>
    v.fqhcCustomers.some((c) => c.toLowerCase().includes(fqhcName.toLowerCase().split(" ")[0]))
  );
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
