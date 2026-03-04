// Workforce Resilience & Retention Hub — Data & Models
// The unified hub aggregating all FQHC retention intelligence
// Primary sources: NACHC, HRSA, NSI, SHRM, Commonwealth Fund, BLS
// Last updated: 2026-03-03

export const WORKFORCE_RESILIENCE_LAST_UPDATED = "2026-03-03";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type RetentionPillar =
  | "career-ladders"
  | "compensation-strategy"
  | "burnout-prevention"
  | "culture-mission"
  | "remote-flexibility"
  | "training-development";

export type Difficulty = "quick-win" | "medium-effort" | "strategic-investment";

export type TimeToImpact = "1-3 months" | "3-6 months" | "6-12 months" | "12+ months";

export interface RetentionStrategy {
  id: string;
  pillar: RetentionPillar;
  title: { en: string; es: string };
  description: { en: string; es: string };
  evidenceStat: { en: string; es: string };
  difficulty: Difficulty;
  timeToImpact: TimeToImpact;
  primarySource: { label: string; url: string };
  crossLinks: { label: string; href: string }[];
  tags: string[];
}

export interface TurnoverCostRole {
  id: string;
  role: { en: string; es: string };
  avgSalary: number; // annual CA salary
  replacementMultiplier: number; // SHRM formula: 0.5-2.0x salary
  replacementCost: number; // calculated
  avgTimeToFill: number; // days
  category: "clinical" | "behavioral-health" | "admin" | "leadership";
}

export interface RetentionBenchmark {
  id: string;
  metric: { en: string; es: string };
  fqhcAverage: string;
  topPerformers: string;
  hospitalComparison: string;
  source: { label: string; url: string };
  direction: "lower-is-better" | "higher-is-better";
}

/* ------------------------------------------------------------------ */
/*  Pillar Metadata                                                    */
/* ------------------------------------------------------------------ */

export const PILLAR_META: {
  id: RetentionPillar;
  en: string;
  es: string;
  description: { en: string; es: string };
  icon: string;
  color: string;
}[] = [
  {
    id: "career-ladders",
    en: "Career Ladders",
    es: "Escaleras de Carrera",
    description: {
      en: "Structured advancement pathways that give staff visible upward mobility within the FQHC.",
      es: "Rutas de avance estructuradas que brindan al personal movilidad ascendente visible dentro del FQHC.",
    },
    icon: "TrendingUp",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    id: "compensation-strategy",
    en: "Compensation Strategy",
    es: "Estrategia de Compensación",
    description: {
      en: "Total compensation approaches that compete on value, not just salary — including benefits FQHCs uniquely offer.",
      es: "Enfoques de compensación total que compiten en valor, no solo en salario — incluyendo beneficios únicos de FQHCs.",
    },
    icon: "DollarSign",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "burnout-prevention",
    en: "Burnout Prevention",
    es: "Prevención del Agotamiento",
    description: {
      en: "Evidence-based programs that reduce moral injury and compassion fatigue in safety-net care settings.",
      es: "Programas basados en evidencia que reducen el daño moral y la fatiga por compasión en entornos de red de seguridad.",
    },
    icon: "Heart",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "culture-mission",
    en: "Culture & Mission Alignment",
    es: "Cultura y Alineación con la Misión",
    description: {
      en: "Leveraging the FQHC mission as a retention superpower — connecting daily work to community impact.",
      es: "Aprovechando la misión del FQHC como superpoder de retención — conectando el trabajo diario con el impacto comunitario.",
    },
    icon: "Users",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "remote-flexibility",
    en: "Remote & Flexible Work",
    es: "Trabajo Remoto y Flexible",
    description: {
      en: "Telehealth infrastructure and flexible scheduling that expands the talent pool while improving work-life balance.",
      es: "Infraestructura de telesalud y horarios flexibles que amplían el grupo de talento mientras mejoran el equilibrio vida-trabajo.",
    },
    icon: "Monitor",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "training-development",
    en: "Training & Development",
    es: "Capacitación y Desarrollo",
    description: {
      en: "Continuous learning programs that build loyalty through skill growth and credentialing support.",
      es: "Programas de aprendizaje continuo que generan lealtad a través del crecimiento de habilidades y apoyo en certificaciones.",
    },
    icon: "GraduationCap",
    color: "bg-green-50 text-green-700 border-green-200",
  },
];

export const DIFFICULTY_META: {
  id: Difficulty;
  en: string;
  es: string;
  color: string;
}[] = [
  { id: "quick-win", en: "Quick Win", es: "Victoria Rápida", color: "bg-green-50 text-green-700 border-green-200" },
  { id: "medium-effort", en: "Medium Effort", es: "Esfuerzo Medio", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "strategic-investment", en: "Strategic Investment", es: "Inversión Estratégica", color: "bg-red-50 text-red-700 border-red-200" },
];

/* ------------------------------------------------------------------ */
/*  Retention Strategies — 6 pillars × 3-4 each = 22 strategies       */
/* ------------------------------------------------------------------ */

export const RETENTION_STRATEGIES: RetentionStrategy[] = [
  // ── Career Ladders ──────────────────────────────────────────────
  {
    id: "cl-1",
    pillar: "career-ladders",
    title: {
      en: "CHW-to-Care Coordinator Pathway",
      es: "Ruta de CHW a Coordinador de Atención",
    },
    description: {
      en: "Formalize a 12-18 month advancement track from Community Health Worker to Care Coordinator, including ECM/CCM certification support and supervised caseload progression.",
      es: "Formalice una ruta de avance de 12-18 meses de Promotor de Salud a Coordinador de Atención, incluyendo apoyo de certificación ECM/CCM y progresión supervisada de casos.",
    },
    evidenceStat: {
      en: "Career ladders increase retention odds 2.4x at community health centers (Shin et al., PMC)",
      es: "Las escaleras de carrera aumentan las probabilidades de retención 2.4x en centros de salud comunitarios (Shin et al., PMC)",
    },
    difficulty: "medium-effort",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "Shin et al. — Career Ladders in CHCs (PMC)",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4339529/",
    },
    crossLinks: [
      { label: "Career Roadmap", href: "/career-roadmap" },
      { label: "ECM Workflows Guide", href: "/guides" },
      { label: "CHW Certifications", href: "/certifications" },
    ],
    tags: ["chw", "ecm", "career-development", "advancement"],
  },
  {
    id: "cl-2",
    pillar: "career-ladders",
    title: {
      en: "MA-to-LVN Bridge Program",
      es: "Programa Puente de MA a LVN",
    },
    description: {
      en: "Partner with local community colleges to create an MA-to-LVN bridge for existing Medical Assistants. Offer tuition assistance tied to 2-year retention agreements.",
      es: "Asóciese con colegios comunitarios locales para crear un puente MA-a-LVN para Asistentes Médicos existentes. Ofrezca asistencia de matrícula vinculada a acuerdos de retención de 2 años.",
    },
    evidenceStat: {
      en: "Tuition-assisted staff stay 2.3x longer than non-assisted peers (NACHC Workforce Report 2024)",
      es: "El personal con asistencia de matrícula permanece 2.3x más que sus pares sin asistencia (Informe de Fuerza Laboral NACHC 2024)",
    },
    difficulty: "strategic-investment",
    timeToImpact: "12+ months",
    primarySource: {
      label: "NACHC Workforce Report 2024",
      url: "https://www.nachc.org/research-and-data/workforce/",
    },
    crossLinks: [
      { label: "Scope of Practice", href: "/strategy/scope-of-practice" },
      { label: "Career Roadmap (Nursing)", href: "/career-roadmap" },
    ],
    tags: ["ma", "lvn", "nursing", "tuition", "bridge-program"],
  },
  {
    id: "cl-3",
    pillar: "career-ladders",
    title: {
      en: "Revenue Cycle Specialist Track",
      es: "Pista de Especialista en Ciclo de Ingresos",
    },
    description: {
      en: "Create a 3-tier billing career path: Billing Clerk → Coding Specialist (CPC) → Revenue Cycle Analyst. Include 340B and PPS rate expertise as advancement milestones.",
      es: "Cree una ruta de carrera de facturación de 3 niveles: Empleado de Facturación → Especialista en Codificación (CPC) → Analista de Ciclo de Ingresos. Incluya experiencia en 340B y tarifas PPS como hitos de avance.",
    },
    evidenceStat: {
      en: "FQHCs with structured RCM career paths report 45% lower billing staff turnover (HFMA 2024)",
      es: "Los FQHCs con rutas de carrera estructuradas en RCM reportan 45% menos rotación de personal de facturación (HFMA 2024)",
    },
    difficulty: "medium-effort",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "HFMA Revenue Cycle Workforce Survey 2024",
      url: "https://www.hfma.org/operations-management/revenue-cycle/",
    },
    crossLinks: [
      { label: "Revenue Cycle Roles Guide", href: "/guides" },
      { label: "CPC Certification", href: "/certifications" },
      { label: "Career Roadmap (Revenue)", href: "/career-roadmap" },
    ],
    tags: ["billing", "rcm", "coding", "340b", "pps", "back-office"],
  },

  // ── Compensation Strategy ───────────────────────────────────────
  {
    id: "cs-1",
    pillar: "compensation-strategy",
    title: {
      en: "NHSC Loan Repayment as Recruitment Anchor",
      es: "Reembolso de Préstamos NHSC como Ancla de Reclutamiento",
    },
    description: {
      en: "Actively market NHSC loan repayment ($50K-$75K over 2 years) in all job postings. Train HR to guide candidates through the application process as a white-glove benefit.",
      es: "Comercialice activamente el reembolso de préstamos NHSC ($50K-$75K en 2 años) en todas las publicaciones de empleo. Capacite a RR.HH. para guiar a candidatos a través del proceso de solicitud.",
    },
    evidenceStat: {
      en: "NHSC participants have 55% retention rate after service obligation ends (HRSA 2023)",
      es: "Los participantes de NHSC tienen una tasa de retención del 55% después de que termina la obligación de servicio (HRSA 2023)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "HRSA NHSC Program Data 2023",
      url: "https://nhsc.hrsa.gov/about-us/mission-history",
    },
    crossLinks: [
      { label: "NHSC Resource", href: "/resources" },
      { label: "Job Listings", href: "/jobs" },
    ],
    tags: ["nhsc", "loan-repayment", "recruitment", "benefits"],
  },
  {
    id: "cs-2",
    pillar: "compensation-strategy",
    title: {
      en: "Total Compensation Dashboard for Candidates",
      es: "Panel de Compensación Total para Candidatos",
    },
    description: {
      en: "Create a visual total comp summary showing salary + NHSC loan repayment + CalPERS pension value + PSLF forgiveness eligibility. Average FQHC total comp exceeds hospital comp for many roles.",
      es: "Cree un resumen visual de compensación total mostrando salario + reembolso NHSC + valor de pensión CalPERS + elegibilidad para PSLF. La compensación total promedio de FQHC supera la del hospital para muchos roles.",
    },
    evidenceStat: {
      en: "Total FQHC compensation is 15-25% higher than base salary alone when including NHSC + PSLF (BLS 2024)",
      es: "La compensación total de FQHC es 15-25% más alta que solo el salario base cuando incluye NHSC + PSLF (BLS 2024)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "BLS Employer Costs for Employee Compensation 2024",
      url: "https://www.bls.gov/news.release/ecec.toc.htm",
    },
    crossLinks: [
      { label: "Salary Intelligence", href: "/salary-data" },
      { label: "Why FQHC?", href: "/why-fqhc" },
    ],
    tags: ["total-comp", "nhsc", "pslf", "calpers", "recruitment"],
  },
  {
    id: "cs-3",
    pillar: "compensation-strategy",
    title: {
      en: "SB 525 Compliance as Competitive Advantage",
      es: "Cumplimiento de SB 525 como Ventaja Competitiva",
    },
    description: {
      en: "Proactively implement SB 525 healthcare minimum wage ($25/hr by 2027 for FQHCs) ahead of schedule. Use early compliance as a recruitment message: 'We lead on fair pay.'",
      es: "Implemente proactivamente el salario mínimo SB 525 ($25/hr para 2027 para FQHCs) antes de tiempo. Use el cumplimiento anticipado como mensaje de reclutamiento: 'Lideramos en pago justo.'",
    },
    evidenceStat: {
      en: "FQHCs proactively raising wages report 18% fewer vacancies within 6 months (CPCA survey 2024)",
      es: "Los FQHCs que aumentan salarios proactivamente reportan 18% menos vacantes en 6 meses (encuesta CPCA 2024)",
    },
    difficulty: "strategic-investment",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "CA Senate Bill 525 — Healthcare Worker Minimum Wage",
      url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    },
    crossLinks: [
      { label: "Healthcare Economics", href: "/strategy/economics" },
      { label: "Funding Impact", href: "/funding-impact" },
    ],
    tags: ["sb-525", "minimum-wage", "compliance", "competitive"],
  },
  {
    id: "cs-4",
    pillar: "compensation-strategy",
    title: {
      en: "Retention Bonuses Tied to Mission Milestones",
      es: "Bonos de Retención Vinculados a Hitos de Misión",
    },
    description: {
      en: "Replace generic annual bonuses with milestone-based retention incentives: 1-year + 3-year service awards tied to patient outcomes achieved, certifications earned, and mentoring contributions.",
      es: "Reemplace bonos anuales genéricos con incentivos de retención basados en hitos: premios de 1 año y 3 años vinculados a resultados de pacientes, certificaciones obtenidas y contribuciones de mentoría.",
    },
    evidenceStat: {
      en: "Mission-connected incentives reduce voluntary turnover 22% more than flat bonuses (Berger & Berger, Compensation Handbook)",
      es: "Los incentivos conectados a la misión reducen la rotación voluntaria 22% más que los bonos fijos (Berger & Berger, Manual de Compensación)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "SHRM Compensation & Benefits Survey 2024",
      url: "https://www.shrm.org/topics-tools/research/employee-benefits-survey",
    },
    crossLinks: [
      { label: "OKR Templates", href: "/strategy/okrs" },
      { label: "Masterclass: Retention Machine", href: "/strategy/masterclass" },
    ],
    tags: ["bonuses", "retention", "milestones", "incentives"],
  },

  // ── Burnout Prevention ──────────────────────────────────────────
  {
    id: "bp-1",
    pillar: "burnout-prevention",
    title: {
      en: "Ambient AI Documentation to Reduce Pajama Time",
      es: "Documentación con IA Ambiental para Reducir 'Tiempo Pijama'",
    },
    description: {
      en: "Deploy ambient AI documentation (Sunoh.ai, Abridge, or similar) to cut after-hours charting. Providers report 60-90 minutes/day of 'pajama time' — documentation done at home after work.",
      es: "Implemente documentación con IA ambiental (Sunoh.ai, Abridge, o similar) para reducir la documentación fuera de horario. Los proveedores reportan 60-90 minutos/día de documentación hecha en casa después del trabajo.",
    },
    evidenceStat: {
      en: "Ambient AI reduces burnout from 51.9% to 38.8% among primary care providers (Abridge/KLAS 2026)",
      es: "La IA ambiental reduce el agotamiento de 51.9% a 38.8% entre proveedores de atención primaria (Abridge/KLAS 2026)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "KLAS Research — Best in KLAS 2026: Ambient AI",
      url: "https://klasresearch.com/best-in-klas-ranking/ambient-ai-documentation/2026",
    },
    crossLinks: [
      { label: "AI Tracker", href: "/ai-tracker" },
      { label: "Masterclass: AI Strategy", href: "/strategy/masterclass" },
    ],
    tags: ["ai", "ambient", "documentation", "burnout", "ehr"],
  },
  {
    id: "bp-2",
    pillar: "burnout-prevention",
    title: {
      en: "Team-Based Care Model with Panel Management",
      es: "Modelo de Atención en Equipo con Gestión de Panel",
    },
    description: {
      en: "Shift from provider-centric to team-based care. Assign dedicated MAs, CHWs, and care coordinators per provider panel. Providers focus on complex medical decisions; team handles outreach, refills, forms.",
      es: "Cambie del modelo centrado en el proveedor al modelo de atención en equipo. Asigne MAs, CHWs y coordinadores dedicados por panel de proveedor. Los proveedores se enfocan en decisiones médicas complejas.",
    },
    evidenceStat: {
      en: "Team-based care reduces provider burnout by 30% and increases visits by 25% (PCMH studies, AHRQ)",
      es: "La atención en equipo reduce el agotamiento del proveedor en 30% y aumenta las visitas en 25% (estudios PCMH, AHRQ)",
    },
    difficulty: "strategic-investment",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "AHRQ — Team-Based Care in Patient-Centered Medical Homes",
      url: "https://www.ahrq.gov/ncepcr/tools/team-based-care.html",
    },
    crossLinks: [
      { label: "Scope of Practice", href: "/strategy/scope-of-practice" },
      { label: "ECM Workflows Guide", href: "/guides" },
    ],
    tags: ["pcmh", "team-care", "panel-management", "burnout"],
  },
  {
    id: "bp-3",
    pillar: "burnout-prevention",
    title: {
      en: "Quarterly Moral Injury Check-In Protocol",
      es: "Protocolo Trimestral de Revisión de Daño Moral",
    },
    description: {
      en: "Implement structured quarterly check-ins using the Moral Injury Symptom Scale for healthcare (MISS-HP). Focus on systemic causes (not individual coping) — what org-level changes reduce moral distress?",
      es: "Implemente revisiones trimestrales estructuradas usando la Escala de Síntomas de Daño Moral para salud (MISS-HP). Enfóquese en causas sistémicas — ¿qué cambios a nivel organizacional reducen la angustia moral?",
    },
    evidenceStat: {
      en: "77% of CHC clinical staff report burnout symptoms — organizational intervention is 3x more effective than individual (HRSA 2022 survey)",
      es: "77% del personal clínico de CHC reporta síntomas de agotamiento — la intervención organizacional es 3x más efectiva que la individual (encuesta HRSA 2022)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "HRSA Health Workforce Burnout Survey 2022",
      url: "https://bhw.hrsa.gov/data-research/review-health-workforce-research",
    },
    crossLinks: [
      { label: "Team Readiness Assessment", href: "/team-readiness" },
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
    ],
    tags: ["burnout", "moral-injury", "check-in", "systemic"],
  },

  // ── Culture & Mission Alignment ────────────────────────────────
  {
    id: "cm-1",
    pillar: "culture-mission",
    title: {
      en: "Patient Impact Storytelling Program",
      es: "Programa de Narrativa de Impacto en Pacientes",
    },
    description: {
      en: "Create a monthly 'Impact Story' ritual where front-line staff share a patient success story at all-hands meetings. Connect daily tasks to mission outcomes. Publish internally with HIPAA-safe narratives.",
      es: "Cree un ritual mensual de 'Historia de Impacto' donde el personal de primera línea comparte una historia de éxito con pacientes. Conecte las tareas diarias con los resultados de la misión.",
    },
    evidenceStat: {
      en: "Mission-connected employees are 2.5x more likely to stay than salary-motivated peers (Gallup Workplace 2023)",
      es: "Los empleados conectados a la misión tienen 2.5x más probabilidades de quedarse que los pares motivados por salario (Gallup Workplace 2023)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "Gallup — State of the Global Workplace 2023",
      url: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
    },
    crossLinks: [
      { label: "The Movement", href: "/strategy/movement" },
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
    ],
    tags: ["storytelling", "mission", "engagement", "culture"],
  },
  {
    id: "cm-2",
    pillar: "culture-mission",
    title: {
      en: "Community Advisory Board Integration",
      es: "Integración de Junta Asesora Comunitaria",
    },
    description: {
      en: "Invite staff to participate in Patient/Community Advisory Board meetings. Hearing directly from community members reinforces why the work matters and reduces 'just a job' mindset.",
      es: "Invite al personal a participar en reuniones de la Junta Asesora de Pacientes/Comunidad. Escuchar directamente a los miembros de la comunidad refuerza por qué el trabajo importa.",
    },
    evidenceStat: {
      en: "Staff with direct community exposure report 35% higher job satisfaction (NACHC Engagement Survey 2024)",
      es: "El personal con exposición directa a la comunidad reporta 35% más satisfacción laboral (Encuesta de Compromiso NACHC 2024)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "NACHC Community Engagement Toolkit",
      url: "https://www.nachc.org/resource/community-engagement/",
    },
    crossLinks: [
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
      { label: "FQHC Directory", href: "/directory" },
    ],
    tags: ["community", "advisory-board", "engagement", "satisfaction"],
  },
  {
    id: "cm-3",
    pillar: "culture-mission",
    title: {
      en: "Concordance Hiring Strategy",
      es: "Estrategia de Contratación por Concordancia",
    },
    description: {
      en: "Prioritize hiring staff who reflect the patient population — linguistic concordance, cultural background, lived experience. Concordant staff understand patient barriers intuitively and stay longer.",
      es: "Priorice la contratación de personal que refleje la población de pacientes — concordancia lingüística, trasfondo cultural, experiencia vivida. El personal concordante entiende las barreras del paciente intuitivamente.",
    },
    evidenceStat: {
      en: "Linguistically concordant providers have 42% lower turnover than non-concordant (JAMA Network Open 2023)",
      es: "Los proveedores lingüísticamente concordantes tienen 42% menos rotación que los no concordantes (JAMA Network Open 2023)",
    },
    difficulty: "medium-effort",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "JAMA Network Open — Workforce Concordance and Retention",
      url: "https://jamanetwork.com/journals/jamanetworkopen",
    },
    crossLinks: [
      { label: "Cultural Humility", href: "/strategy/cultural-humility" },
      { label: "Movement History", href: "/strategy/movement" },
    ],
    tags: ["concordance", "diversity", "hiring", "bilingual"],
  },

  // ── Remote & Flexible Work ─────────────────────────────────────
  {
    id: "rf-1",
    pillar: "remote-flexibility",
    title: {
      en: "Telehealth-First BH Program",
      es: "Programa de Salud Conductual con Telesalud Primero",
    },
    description: {
      en: "Redesign behavioral health delivery as telehealth-first. BH therapists and psychiatrists work remotely 3-4 days/week. Expands hiring radius statewide. CA AB 32 guarantees Medi-Cal PPS parity for telehealth visits.",
      es: "Rediseñe la prestación de salud conductual como telesalud primero. Terapeutas y psiquiatras de BH trabajan remotamente 3-4 días/semana. AB 32 de CA garantiza paridad PPS de Medi-Cal para visitas de telesalud.",
    },
    evidenceStat: {
      en: "96% of FQHCs offer telehealth, but only 12% have structured remote positions (Commonwealth Fund 2024)",
      es: "96% de los FQHCs ofrecen telesalud, pero solo 12% tienen posiciones remotas estructuradas (Commonwealth Fund 2024)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "Commonwealth Fund — Telehealth in Community Health Centers 2024",
      url: "https://www.commonwealthfund.org/publications/issue-briefs/2024/feb/telehealth-community-health-centers",
    },
    crossLinks: [
      { label: "Remote Jobs", href: "/jobs" },
      { label: "BH Integration Guide", href: "/guides" },
    ],
    tags: ["telehealth", "remote", "behavioral-health", "ab-32"],
  },
  {
    id: "rf-2",
    pillar: "remote-flexibility",
    title: {
      en: "Hybrid Revenue Cycle Operations",
      es: "Operaciones Híbridas de Ciclo de Ingresos",
    },
    description: {
      en: "Move billing, coding, and denials management to hybrid or fully remote. These roles need EHR access, not physical presence. Reduces overhead costs while improving talent recruitment from a wider geography.",
      es: "Mueva facturación, codificación y gestión de denegaciones a híbrido o completamente remoto. Estos roles necesitan acceso al EHR, no presencia física. Reduce costos mientras mejora el reclutamiento.",
    },
    evidenceStat: {
      en: "Remote billing staff report 28% higher job satisfaction and 31% lower turnover (HFMA Remote Work Survey 2024)",
      es: "El personal de facturación remoto reporta 28% más satisfacción laboral y 31% menos rotación (Encuesta HFMA 2024)",
    },
    difficulty: "quick-win",
    timeToImpact: "1-3 months",
    primarySource: {
      label: "HFMA — Remote Work in Revenue Cycle 2024",
      url: "https://www.hfma.org/operations-management/revenue-cycle/",
    },
    crossLinks: [
      { label: "Revenue Cycle Roles Guide", href: "/guides" },
      { label: "Remote Jobs", href: "/jobs" },
    ],
    tags: ["remote", "billing", "rcm", "hybrid", "back-office"],
  },
  {
    id: "rf-3",
    pillar: "remote-flexibility",
    title: {
      en: "4-Day Workweek Pilot for Clinical Staff",
      es: "Piloto de Semana Laboral de 4 Días para Personal Clínico",
    },
    description: {
      en: "Pilot compressed schedules (4×10hr days) for willing clinical teams. Studies show no productivity loss when combined with team-based care. Massive retention differentiator vs. hospitals stuck on 5-day models.",
      es: "Pilotee horarios comprimidos (4×10hr días) para equipos clínicos dispuestos. Estudios muestran cero pérdida de productividad combinados con atención en equipo. Gran diferenciador de retención vs. hospitales.",
    },
    evidenceStat: {
      en: "Organizations offering compressed schedules see 63% lower turnover in participating roles (4 Day Week Global 2023)",
      es: "Organizaciones que ofrecen horarios comprimidos ven 63% menos rotación en roles participantes (4 Day Week Global 2023)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "4 Day Week Global — Healthcare Pilot Results 2023",
      url: "https://www.4dayweek.com/research",
    },
    crossLinks: [
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
      { label: "Masterclass: Retention", href: "/strategy/masterclass" },
    ],
    tags: ["flexible", "compressed", "4-day", "clinical", "scheduling"],
  },
  {
    id: "rf-4",
    pillar: "remote-flexibility",
    title: {
      en: "Remote Care Coordination Hub",
      es: "Centro de Coordinación de Atención Remota",
    },
    description: {
      en: "Centralize care coordination, referral management, and patient outreach in a virtual hub. Care coordinators work from home with HIPAA-compliant tools. Serves multiple clinic sites from one team.",
      es: "Centralice la coordinación de atención, gestión de referencias y alcance al paciente en un centro virtual. Coordinadores trabajan desde casa con herramientas compatibles con HIPAA.",
    },
    evidenceStat: {
      en: "Virtual care coordination hubs reduce no-show rates by 18% while cutting overhead 22% (CHCF Innovation Report 2024)",
      es: "Los centros virtuales de coordinación reducen las ausencias en 18% mientras reducen costos operativos en 22% (Informe de Innovación CHCF 2024)",
    },
    difficulty: "strategic-investment",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "CHCF — Innovation in California Health Centers 2024",
      url: "https://www.chcf.org/collection/health-center-innovation/",
    },
    crossLinks: [
      { label: "ECM Workflows", href: "/guides" },
      { label: "Remote Jobs", href: "/jobs" },
    ],
    tags: ["remote", "care-coordination", "virtual", "hipaa"],
  },

  // ── Training & Development ─────────────────────────────────────
  {
    id: "td-1",
    pillar: "training-development",
    title: {
      en: "FQHC-Specific Onboarding Academy",
      es: "Academia de Incorporación Específica para FQHC",
    },
    description: {
      en: "Build a structured 90-day onboarding program covering PPS billing, HRSA compliance, scope-of-practice, CalAIM programs, and org-specific workflows. New hires at FQHCs often come from hospital or private practice and need FQHC-specific orientation.",
      es: "Construya un programa de incorporación estructurado de 90 días cubriendo facturación PPS, cumplimiento HRSA, alcance de práctica, programas CalAIM y flujos de trabajo específicos de la organización.",
    },
    evidenceStat: {
      en: "Structured onboarding programs improve 1-year retention by 25% (Brandon Hall Group 2023)",
      es: "Los programas de incorporación estructurados mejoran la retención a 1 año en 25% (Brandon Hall Group 2023)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "Brandon Hall Group — Onboarding Research 2023",
      url: "https://brandonhall.com/",
    },
    crossLinks: [
      { label: "First 90 Days Plan", href: "/career-insights" },
      { label: "Workplace Guides", href: "/guides" },
      { label: "FQHC Revenue 101", href: "/guides" },
    ],
    tags: ["onboarding", "training", "pps", "hrsa", "90-day"],
  },
  {
    id: "td-2",
    pillar: "training-development",
    title: {
      en: "Certification Sponsorship with Retention Agreement",
      es: "Patrocinio de Certificación con Acuerdo de Retención",
    },
    description: {
      en: "Sponsor staff certifications (CPC, CHW, LCSW supervision hours, etc.) with a simple retention agreement: org pays for the cert, employee commits to 18-24 months post-certification.",
      es: "Patrocine certificaciones del personal (CPC, CHW, horas de supervisión LCSW, etc.) con un acuerdo de retención simple: la organización paga la certificación, el empleado se compromete 18-24 meses después.",
    },
    evidenceStat: {
      en: "Certification-sponsored employees have 40% higher 3-year retention rates (NACHC 2024)",
      es: "Los empleados con certificación patrocinada tienen tasas de retención a 3 años 40% más altas (NACHC 2024)",
    },
    difficulty: "medium-effort",
    timeToImpact: "6-12 months",
    primarySource: {
      label: "NACHC Workforce Investment Report 2024",
      url: "https://www.nachc.org/research-and-data/workforce/",
    },
    crossLinks: [
      { label: "Certification Catalog", href: "/certifications" },
      { label: "Career Resources", href: "/resources" },
    ],
    tags: ["certifications", "sponsorship", "retention-agreement", "investment"],
  },
  {
    id: "td-3",
    pillar: "training-development",
    title: {
      en: "Cross-Training for Operational Resilience",
      es: "Capacitación Cruzada para Resiliencia Operativa",
    },
    description: {
      en: "Cross-train staff across related functions: MAs learn basic billing coding, care coordinators learn CHW outreach, billing clerks learn front-desk triage. Creates job variety, reduces single-point-of-failure risk, and opens internal mobility.",
      es: "Capacite al personal en funciones cruzadas: MAs aprenden codificación básica, coordinadores aprenden alcance CHW, facturadores aprenden triaje de recepción. Crea variedad, reduce riesgos y abre movilidad interna.",
    },
    evidenceStat: {
      en: "Cross-trained healthcare teams show 20% better job satisfaction and 15% lower absenteeism (AHRQ)",
      es: "Los equipos de salud con capacitación cruzada muestran 20% mejor satisfacción laboral y 15% menos ausentismo (AHRQ)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "AHRQ — TeamSTEPPS Cross-Training Framework",
      url: "https://www.ahrq.gov/teamstepps/index.html",
    },
    crossLinks: [
      { label: "Scope of Practice", href: "/strategy/scope-of-practice" },
      { label: "Resilience Scorecard", href: "/strategy/resilience" },
    ],
    tags: ["cross-training", "resilience", "teamstepps", "variety"],
  },
  {
    id: "td-4",
    pillar: "training-development",
    title: {
      en: "Internal Mentorship & Preceptor Program",
      es: "Programa Interno de Mentoría y Preceptoría",
    },
    description: {
      en: "Pair experienced staff with new hires as formal mentors/preceptors. Include compensation (stipend or reduced caseload) for mentors. Creates a sense of investment and belonging for both parties.",
      es: "Asigne personal experimentado con nuevos empleados como mentores/preceptores formales. Incluya compensación (estipendio o carga reducida) para mentores. Crea un sentido de inversión y pertenencia.",
    },
    evidenceStat: {
      en: "Formal mentorship programs reduce first-year turnover by 50% in healthcare settings (Sun River Health case study)",
      es: "Los programas formales de mentoría reducen la rotación del primer año en 50% en entornos de salud (caso Sun River Health)",
    },
    difficulty: "medium-effort",
    timeToImpact: "3-6 months",
    primarySource: {
      label: "Sun River Health — Workforce Retention Strategies",
      url: "https://www.sunriver.org/about",
    },
    crossLinks: [
      { label: "Case Studies", href: "/strategy/case-studies" },
      { label: "Executive Guides", href: "/strategy/guides" },
    ],
    tags: ["mentorship", "preceptor", "onboarding", "belonging"],
  },
];

/* ------------------------------------------------------------------ */
/*  Turnover Cost Model — Role-specific replacement costs              */
/* ------------------------------------------------------------------ */

export const TURNOVER_COST_ROLES: TurnoverCostRole[] = [
  {
    id: "chw",
    role: { en: "Community Health Worker", es: "Promotor de Salud Comunitaria" },
    avgSalary: 45_000,
    replacementMultiplier: 0.5,
    replacementCost: 22_500,
    avgTimeToFill: 30,
    category: "clinical",
  },
  {
    id: "ma",
    role: { en: "Medical Assistant", es: "Asistente Médico" },
    avgSalary: 42_000,
    replacementMultiplier: 0.5,
    replacementCost: 21_000,
    avgTimeToFill: 28,
    category: "clinical",
  },
  {
    id: "rn",
    role: { en: "Registered Nurse (RN)", es: "Enfermera Registrada (RN)" },
    avgSalary: 115_000,
    replacementMultiplier: 0.75,
    replacementCost: 86_250,
    avgTimeToFill: 60,
    category: "clinical",
  },
  {
    id: "provider",
    role: { en: "Primary Care Provider (MD/NP/PA)", es: "Proveedor de Atención Primaria (MD/NP/PA)" },
    avgSalary: 220_000,
    replacementMultiplier: 2.0,
    replacementCost: 440_000,
    avgTimeToFill: 120,
    category: "clinical",
  },
  {
    id: "bh-therapist",
    role: { en: "BH Therapist (LCSW/LMFT)", es: "Terapeuta de Salud Conductual (LCSW/LMFT)" },
    avgSalary: 85_000,
    replacementMultiplier: 0.75,
    replacementCost: 63_750,
    avgTimeToFill: 75,
    category: "behavioral-health",
  },
  {
    id: "psychiatrist",
    role: { en: "Psychiatrist", es: "Psiquiatra" },
    avgSalary: 280_000,
    replacementMultiplier: 2.0,
    replacementCost: 560_000,
    avgTimeToFill: 180,
    category: "behavioral-health",
  },
  {
    id: "billing",
    role: { en: "Billing Specialist", es: "Especialista en Facturación" },
    avgSalary: 48_000,
    replacementMultiplier: 0.5,
    replacementCost: 24_000,
    avgTimeToFill: 25,
    category: "admin",
  },
  {
    id: "care-coord",
    role: { en: "Care Coordinator", es: "Coordinador de Atención" },
    avgSalary: 52_000,
    replacementMultiplier: 0.6,
    replacementCost: 31_200,
    avgTimeToFill: 35,
    category: "clinical",
  },
  {
    id: "rcm-analyst",
    role: { en: "Revenue Cycle Analyst", es: "Analista de Ciclo de Ingresos" },
    avgSalary: 65_000,
    replacementMultiplier: 0.75,
    replacementCost: 48_750,
    avgTimeToFill: 45,
    category: "admin",
  },
  {
    id: "cmo",
    role: { en: "Chief Medical Officer (CMO)", es: "Director Médico (CMO)" },
    avgSalary: 300_000,
    replacementMultiplier: 2.0,
    replacementCost: 600_000,
    avgTimeToFill: 180,
    category: "leadership",
  },
];

/* ------------------------------------------------------------------ */
/*  Retention Benchmarks — FQHC vs. Hospital vs. Top Performers       */
/* ------------------------------------------------------------------ */

export const RETENTION_BENCHMARKS: RetentionBenchmark[] = [
  {
    id: "rb-1",
    metric: { en: "Annual Turnover Rate", es: "Tasa de Rotación Anual" },
    fqhcAverage: "32%",
    topPerformers: "12-15%",
    hospitalComparison: "22%",
    source: {
      label: "NACHC / FrontRunner HC Workforce Report 2024",
      url: "https://www.nachc.org/research-and-data/workforce/",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-2",
    metric: { en: "RN Vacancy Rate", es: "Tasa de Vacantes de RN" },
    fqhcAverage: "18%",
    topPerformers: "5-8%",
    hospitalComparison: "9.9%",
    source: {
      label: "NSI National Health Care Retention Report 2025",
      url: "https://www.nsinursingsolutions.com/",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-3",
    metric: { en: "Time to Fill (Clinical Roles)", es: "Tiempo para Cubrir (Roles Clínicos)" },
    fqhcAverage: "75 days",
    topPerformers: "30-45 days",
    hospitalComparison: "52 days",
    source: {
      label: "SHRM Talent Acquisition Benchmarking 2024",
      url: "https://www.shrm.org/topics-tools/research",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-4",
    metric: { en: "First-Year Turnover", es: "Rotación del Primer Año" },
    fqhcAverage: "40%",
    topPerformers: "15-20%",
    hospitalComparison: "28%",
    source: {
      label: "NACHC Workforce Report 2024",
      url: "https://www.nachc.org/research-and-data/workforce/",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-5",
    metric: { en: "Staff Engagement Score", es: "Puntaje de Compromiso del Personal" },
    fqhcAverage: "62%",
    topPerformers: "82-88%",
    hospitalComparison: "71%",
    source: {
      label: "Gallup Healthcare Engagement Database 2023",
      url: "https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx",
    },
    direction: "higher-is-better",
  },
  {
    id: "rb-6",
    metric: { en: "Provider Burnout Rate", es: "Tasa de Agotamiento de Proveedores" },
    fqhcAverage: "77%",
    topPerformers: "35-45%",
    hospitalComparison: "53%",
    source: {
      label: "HRSA Health Workforce Burnout Survey 2022",
      url: "https://bhw.hrsa.gov/data-research/review-health-workforce-research",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-7",
    metric: { en: "CHW Vacancy Rate", es: "Tasa de Vacantes de CHW" },
    fqhcAverage: "23%",
    topPerformers: "8-12%",
    hospitalComparison: "N/A",
    source: {
      label: "CA HCAI CHW Workforce Data 2025",
      url: "https://hcai.ca.gov/workforce-development/",
    },
    direction: "lower-is-better",
  },
  {
    id: "rb-8",
    metric: { en: "Revenue Lost per Provider Vacancy/Month", es: "Ingresos Perdidos por Vacante de Proveedor/Mes" },
    fqhcAverage: "$150K-250K",
    topPerformers: "<$50K (rapid fill)",
    hospitalComparison: "$100K-200K",
    source: {
      label: "MGMA Provider Compensation Data 2024",
      url: "https://www.mgma.com/data",
    },
    direction: "lower-is-better",
  },
];

/* ------------------------------------------------------------------ */
/*  Hero Stats — for the page header                                   */
/* ------------------------------------------------------------------ */

export const HERO_STATS: {
  value: string;
  label: { en: string; es: string };
  source: string;
}[] = [
  {
    value: "32%",
    label: { en: "Average FQHC annual turnover", es: "Rotación anual promedio de FQHC" },
    source: "NACHC 2024",
  },
  {
    value: "$440K",
    label: { en: "Cost to replace one primary care provider", es: "Costo de reemplazar un proveedor de atención primaria" },
    source: "SHRM formula",
  },
  {
    value: "77%",
    label: { en: "CHC clinical staff report burnout", es: "Personal clínico de CHC reporta agotamiento" },
    source: "HRSA 2022",
  },
  {
    value: "23%",
    label: { en: "CHW vacancy rate in California", es: "Tasa de vacantes de CHW en California" },
    source: "HCAI 2025",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

export function getStrategiesByPillar(pillar: RetentionPillar): RetentionStrategy[] {
  return RETENTION_STRATEGIES.filter((s) => s.pillar === pillar);
}

export function getPillarMeta(pillar: RetentionPillar) {
  return PILLAR_META.find((p) => p.id === pillar);
}

export function getDifficultyMeta(difficulty: Difficulty) {
  return DIFFICULTY_META.find((d) => d.id === difficulty);
}

export function getStrategyCounts(): Record<RetentionPillar, number> {
  const counts: Record<string, number> = {};
  for (const pillar of PILLAR_META) {
    counts[pillar.id] = RETENTION_STRATEGIES.filter((s) => s.pillar === pillar.id).length;
  }
  return counts as Record<RetentionPillar, number>;
}

/**
 * Turnover cost calculator — the interactive model for the page
 * Takes org parameters, returns annual cost and potential savings
 */
export function calculateTurnoverCost(params: {
  totalStaff: number;
  roleDistribution: Record<string, number>; // role id → count
  currentTurnoverRate: number; // e.g., 0.32
  targetTurnoverRate: number; // e.g., 0.15
}): {
  annualTurnoverCost: number;
  annualSavings: number;
  roleBreakdown: { role: TurnoverCostRole; departures: number; cost: number }[];
} {
  const roleBreakdown = TURNOVER_COST_ROLES.filter(
    (r) => params.roleDistribution[r.id] && params.roleDistribution[r.id] > 0
  ).map((role) => {
    const count = params.roleDistribution[role.id] || 0;
    const departures = Math.round(count * params.currentTurnoverRate);
    const cost = departures * role.replacementCost;
    return { role, departures, cost };
  });

  const annualTurnoverCost = roleBreakdown.reduce((sum, r) => sum + r.cost, 0);

  // Savings from reducing turnover to target
  const savingsBreakdown = TURNOVER_COST_ROLES.filter(
    (r) => params.roleDistribution[r.id] && params.roleDistribution[r.id] > 0
  ).map((role) => {
    const count = params.roleDistribution[role.id] || 0;
    const currentDepartures = Math.round(count * params.currentTurnoverRate);
    const targetDepartures = Math.round(count * params.targetTurnoverRate);
    return (currentDepartures - targetDepartures) * role.replacementCost;
  });

  const annualSavings = savingsBreakdown.reduce((sum, s) => sum + s, 0);

  return { annualTurnoverCost, annualSavings, roleBreakdown };
}

/**
 * Get related content across all site features that touch retention
 */
export function getRelatedContent(): {
  title: { en: string; es: string };
  href: string;
  type: string;
  description: { en: string; es: string };
}[] {
  return [
    {
      title: { en: "Resilience Scorecard", es: "Tarjeta de Resiliencia" },
      href: "/strategy/resilience",
      type: "tool",
      description: { en: "See how 220 FQHCs score on workforce stability", es: "Vea cómo 220 FQHCs puntúan en estabilidad laboral" },
    },
    {
      title: { en: "Career Roadmap", es: "Mapa de Carrera" },
      href: "/career-roadmap",
      type: "tool",
      description: { en: "5 career tracks with CA salary data to share with staff", es: "5 rutas de carrera con datos salariales de CA para compartir con el personal" },
    },
    {
      title: { en: "Salary Intelligence", es: "Inteligencia Salarial" },
      href: "/salary-data",
      type: "data",
      description: { en: "30 roles × 9 regions — benchmark your compensation", es: "30 roles × 9 regiones — compare su compensación" },
    },
    {
      title: { en: "Scope of Practice", es: "Alcance de Práctica" },
      href: "/strategy/scope-of-practice",
      type: "strategy",
      description: { en: "Top-of-license staffing reduces burnout and increases revenue", es: "Personal a máximo alcance reduce agotamiento y aumenta ingresos" },
    },
    {
      title: { en: "Cultural Humility Framework", es: "Marco de Humildad Cultural" },
      href: "/strategy/cultural-humility",
      type: "strategy",
      description: { en: "Concordance hiring and CLAS standards for retention", es: "Contratación por concordancia y estándares CLAS para retención" },
    },
    {
      title: { en: "Case Studies", es: "Estudios de Caso" },
      href: "/strategy/case-studies",
      type: "evidence",
      description: { en: "Real FQHC transformation stories with retention outcomes", es: "Historias reales de transformación de FQHC con resultados de retención" },
    },
    {
      title: { en: "OKR Templates", es: "Plantillas OKR" },
      href: "/strategy/okrs",
      type: "tool",
      description: { en: "12 change management templates including workforce OKRs", es: "12 plantillas de gestión de cambio incluyendo OKRs de fuerza laboral" },
    },
    {
      title: { en: "Certification Catalog", es: "Catálogo de Certificaciones" },
      href: "/certifications",
      type: "tool",
      description: { en: "15 CA-specific certifications to sponsor for staff", es: "15 certificaciones específicas de CA para patrocinar al personal" },
    },
    {
      title: { en: "Executive Masterclass", es: "Masterclass Ejecutiva" },
      href: "/strategy/masterclass",
      type: "learning",
      description: { en: "Deep-dive modules on retention strategy and workforce crisis", es: "Módulos de inmersión sobre estrategia de retención y crisis laboral" },
    },
    {
      title: { en: "FQHC Movement History", es: "Historia del Movimiento FQHC" },
      href: "/strategy/movement",
      type: "culture",
      description: { en: "Connect new staff to the 60-year CHC social justice movement", es: "Conecte al personal nuevo con el movimiento de justicia social de 60 años" },
    },
  ];
}
