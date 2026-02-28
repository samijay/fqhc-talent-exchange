// strategy-knowledge-graph.ts
// Master Knowledge Graph — the interconnection layer between all strategic content
//
// This file maps relationships between:
// - Case Studies ↔ Economics Concepts ↔ Execution Frameworks ↔ OKR Templates ↔ Thought Leaders
// - Strategic themes that span multiple content types
// - Recommended learning paths for different FQHC scenarios
//
// The graph enables:
// 1. "Related content" on every page
// 2. Strategic foresight — showing executives HOW concepts connect
// 3. Learning paths — guided journeys through the knowledge base
//
// Last updated: 2026-02-28

export const KNOWLEDGE_GRAPH_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ContentType =
  | "case-study"
  | "economics"
  | "framework"
  | "okr"
  | "leader"
  | "intel";

export type RelationshipType =
  | "implements" // case study implements a framework
  | "demonstrates" // case study demonstrates an economics concept
  | "measures" // OKR measures an economics concept
  | "uses" // OKR uses a framework for execution
  | "advocates" // leader advocates for this concept/approach
  | "created" // leader created this framework/approach
  | "informs" // intel item informs this strategy
  | "enables" // one concept enables another
  | "requires" // one concept requires another
  | "complements"; // two items work well together

export interface KnowledgeEdge {
  from: { type: ContentType; id: string };
  to: { type: ContentType; id: string };
  relationship: RelationshipType;
  strength: 1 | 2 | 3; // 1=tangential, 2=related, 3=core
  context?: { en: string; es: string }; // Why this connection matters
}

export type StrategicThemeId =
  | "federal-survival"
  | "revenue-engine"
  | "ai-transformation"
  | "workforce-crisis"
  | "patient-access-equity"
  | "operational-mastery";

export interface StrategicTheme {
  id: StrategicThemeId;
  title: { en: string; es: string };
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  icon: string; // Lucide icon name
  color: string; // Tailwind color
  urgency: "critical" | "high" | "medium";
  caseStudyIds: string[];
  economicsIds: string[];
  frameworkIds: string[];
  okrIds: string[];
  leaderIds: string[];
  foresight: { en: string; es: string }; // Strategic foresight — what's coming
}

export type PathDifficulty = "new-to-fqhc" | "experienced-leader" | "crisis-mode";

export interface LearningPath {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  targetAudience: { en: string; es: string };
  difficulty: PathDifficulty;
  estimatedTime: string; // "2 hours", "1 week", etc.
  steps: LearningStep[];
}

export interface LearningStep {
  order: number;
  title: { en: string; es: string };
  contentType: ContentType;
  contentId: string;
  action: { en: string; es: string }; // "Read this case study", "Complete this assessment"
  insight: { en: string; es: string }; // Key takeaway from this step
}

/* ------------------------------------------------------------------ */
/*  Knowledge Edges — the connections                                  */
/* ------------------------------------------------------------------ */

export const knowledgeEdges: KnowledgeEdge[] = [
  // === CASE STUDY → FRAMEWORK connections ===
  {
    from: { type: "case-study", id: "pureview-federal-dependency" },
    to: { type: "framework", id: "rumelt-good-strategy" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "PureView's 5-year transformation is a textbook Rumelt case: they diagnosed federal dependency, set a guiding policy of revenue diversification, and executed coherent actions that reduced federal revenue from 62.5% to 17%.",
      es: "La transformación de 5 años de PureView es un caso de libro de Rumelt: diagnosticaron la dependencia federal, establecieron una política guía de diversificación de ingresos, y ejecutaron acciones coherentes.",
    },
  },
  {
    from: { type: "case-study", id: "pureview-federal-dependency" },
    to: { type: "framework", id: "kotter-8-step" },
    relationship: "implements",
    strength: 2,
    context: {
      en: "PureView's multi-year transformation required sustained organizational change — Kotter's 8-step model explains how they maintained momentum across 5 years of diversification.",
      es: "La transformación multi-año de PureView requirió cambio organizacional sostenido — el modelo de 8 pasos de Kotter explica cómo mantuvieron el impulso.",
    },
  },
  {
    from: { type: "case-study", id: "highland-health-340b" },
    to: { type: "framework", id: "dmaic-lean" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "Highland Health's 340B optimization is a DMAIC success story: they measured the gap, analyzed their pharmacy model, improved with in-house operations, and controlled with ongoing metrics tracking.",
      es: "La optimización 340B de Highland Health es una historia de éxito DMAIC: midieron la brecha, analizaron su modelo de farmacia, mejoraron con operaciones internas.",
    },
  },
  {
    from: { type: "case-study", id: "sun-river-health-ai-documentation" },
    to: { type: "framework", id: "ooda-loop" },
    relationship: "implements",
    strength: 2,
    context: {
      en: "Sun River Health's AI documentation pilot used rapid OODA cycles: observe documentation bottlenecks, orient around AI solutions, decide on ambient AI, act by piloting with providers.",
      es: "El piloto de documentación AI de Sun River Health usó ciclos OODA rápidos: observar cuellos de botella, orientarse a soluciones AI, decidir, y actuar.",
    },
  },
  {
    from: { type: "case-study", id: "united-health-centers-ipa" },
    to: { type: "framework", id: "cynefin-framework" },
    relationship: "implements",
    strength: 2,
    context: {
      en: "Launching a for-profit IPA from a nonprofit FQHC sits in Cynefin's 'complex' domain — the outcome was unknowable in advance, requiring safe-to-fail probes and emergent strategy.",
      es: "Lanzar un IPA con fines de lucro desde un FQHC sin fines de lucro está en el dominio 'complejo' de Cynefin — requirió sondas seguras para fallar y estrategia emergente.",
    },
  },
  {
    from: { type: "case-study", id: "neighborhood-healthcare-ai-ambient" },
    to: { type: "framework", id: "pdsa-cycle" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "Neighborhood Healthcare's AI ambient documentation pilot is a PDSA exemplar: Plan the Nabla integration, Do the pilot, Study provider time savings, Act on results to expand.",
      es: "El piloto de documentación AI ambiental de Neighborhood Healthcare es un ejemplo PDSA: Planificar la integración de Nabla, Hacer el piloto, Estudiar los ahorros de tiempo.",
    },
  },
  {
    from: { type: "case-study", id: "salud-chw-pipeline" },
    to: { type: "framework", id: "adkar-model" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "Salud's CHW career ladder addresses each ADKAR element: Awareness (turnover crisis), Desire (career growth), Knowledge (training), Ability (certification), Reinforcement (promotion pathway).",
      es: "La escalera profesional CHW de Salud aborda cada elemento ADKAR: Conciencia (crisis de rotación), Deseo (crecimiento profesional), Conocimiento, Habilidad, Refuerzo.",
    },
  },
  {
    from: { type: "case-study", id: "opca-collaborative-qi" },
    to: { type: "framework", id: "dmaic-lean" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "Oregon PCA's collaborative QI uses DMAIC at the state level: shared measurement, root cause analysis across FQHCs, improvements shared as best practices.",
      es: "La QI colaborativa de Oregon PCA usa DMAIC a nivel estatal: medición compartida, análisis de causa raíz entre FQHCs, mejoras compartidas.",
    },
  },
  {
    from: { type: "case-study", id: "yvfwc-integrated-delivery" },
    to: { type: "framework", id: "stars-model" },
    relationship: "implements",
    strength: 2,
    context: {
      en: "YVFWC's growth from single clinic to 200K+ patient system required different STARS approaches: startup for new sites, turnaround for struggling acquisitions, sustaining success for mature operations.",
      es: "El crecimiento de YVFWC de una clínica a un sistema de 200K+ pacientes requirió diferentes enfoques STARS.",
    },
  },
  {
    from: { type: "case-study", id: "fenway-lgbtq-care-model" },
    to: { type: "framework", id: "kotter-8-step" },
    relationship: "implements",
    strength: 2,
    context: {
      en: "Fenway Health's evolution into a nationally recognized LGBTQ+ health center followed Kotter's model — creating urgency around health disparities, building a coalition, and institutionalizing new practices.",
      es: "La evolución de Fenway Health en un centro de salud LGBTQ+ reconocido nacionalmente siguió el modelo de Kotter.",
    },
  },
  {
    from: { type: "case-study", id: "whitman-walker-specialty-diversification" },
    to: { type: "framework", id: "rumelt-good-strategy" },
    relationship: "implements",
    strength: 3,
    context: {
      en: "Whitman-Walker diagnosed over-reliance on Ryan White funding, set a guiding policy of service diversification, and executed by adding primary care, dental, and commercial insurance — textbook Rumelt.",
      es: "Whitman-Walker diagnosticó la dependencia excesiva del financiamiento Ryan White y ejecutó diversificación de servicios — Rumelt de libro.",
    },
  },

  // === CASE STUDY → ECONOMICS connections ===
  {
    from: { type: "case-study", id: "highland-health-340b" },
    to: { type: "economics", id: "340b-program" },
    relationship: "demonstrates",
    strength: 3,
    context: {
      en: "Highland Health's 270% revenue increase is the definitive 340B optimization case study — showing exactly how in-house pharmacy + contract pharmacy management maximizes program value.",
      es: "El aumento de ingresos del 270% de Highland Health es el caso definitivo de optimización 340B.",
    },
  },
  {
    from: { type: "case-study", id: "pureview-federal-dependency" },
    to: { type: "economics", id: "section-330-grants" },
    relationship: "demonstrates",
    strength: 3,
    context: {
      en: "PureView demonstrates what happens when an FQHC strategically reduces its Section 330 dependency — building resilience against the CHCF authorization cliff.",
      es: "PureView demuestra qué pasa cuando un FQHC reduce estratégicamente su dependencia de la Sección 330.",
    },
  },
  {
    from: { type: "case-study", id: "united-health-centers-ipa" },
    to: { type: "economics", id: "value-based-payment" },
    relationship: "demonstrates",
    strength: 3,
    context: {
      en: "United Health Centers' IPA launch is the most aggressive VBP move by a California FQHC — taking on full capitation risk through a purpose-built entity.",
      es: "El lanzamiento del IPA de United Health Centers es la jugada VBP más agresiva de un FQHC de California.",
    },
  },
  {
    from: { type: "case-study", id: "mcr-health-subscription-model" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "demonstrates",
    strength: 2,
    context: {
      en: "MCR Health's subscription model shows an alternative to PPS dependency — generating revenue directly from patients willing to pay for enhanced access and concierge-style primary care.",
      es: "El modelo de suscripción de MCR Health muestra una alternativa a la dependencia de PPS.",
    },
  },
  {
    from: { type: "case-study", id: "communicare-dental-integration" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "demonstrates",
    strength: 3,
    context: {
      en: "CommuniCare's dental integration captures separate PPS dental encounter rates — each dental visit generates an additional PPS claim on top of medical visits.",
      es: "La integración dental de CommuniCare captura tarifas PPS dentales separadas — cada visita dental genera una reclamación PPS adicional.",
    },
  },
  {
    from: { type: "case-study", id: "salud-chw-pipeline" },
    to: { type: "economics", id: "workforce-sb525" },
    relationship: "demonstrates",
    strength: 2,
    context: {
      en: "Salud's CHW career ladder directly addresses the SB 525 wage compression challenge — creating advancement paths that justify higher wages through expanded scope and productivity.",
      es: "La escalera profesional CHW de Salud aborda directamente el desafío de compresión salarial de SB 525.",
    },
  },
  {
    from: { type: "case-study", id: "sun-river-health-ai-documentation" },
    to: { type: "economics", id: "hcc-risk-adjustment" },
    relationship: "demonstrates",
    strength: 2,
    context: {
      en: "AI documentation tools like those used at Sun River improve HCC capture by ensuring all diagnosed conditions are documented completely — boosting risk-adjusted revenue.",
      es: "Las herramientas de documentación AI como las usadas en Sun River mejoran la captura de HCC asegurando que todas las condiciones diagnosticadas se documenten completamente.",
    },
  },
  {
    from: { type: "case-study", id: "zufall-multilingual-access" },
    to: { type: "economics", id: "sliding-fee-uninsured" },
    relationship: "demonstrates",
    strength: 3,
    context: {
      en: "Zufall Health Center's model of radical language access for immigrant populations is built on the sliding fee scale — making the financial safety net visible and accessible across 15+ languages.",
      es: "El modelo de acceso lingüístico radical de Zufall se construye sobre la escala de tarifas deslizantes — haciendo la red de seguridad financiera visible y accesible.",
    },
  },
  {
    from: { type: "case-study", id: "asian-health-services-community-model" },
    to: { type: "economics", id: "sliding-fee-uninsured" },
    relationship: "demonstrates",
    strength: 2,
  },
  {
    from: { type: "case-study", id: "whitman-walker-specialty-diversification" },
    to: { type: "economics", id: "340b-program" },
    relationship: "demonstrates",
    strength: 2,
    context: {
      en: "Whitman-Walker leveraged 340B specialty pharmacy (particularly HIV/Hep C drugs) as a revenue pillar during their diversification away from Ryan White dependence.",
      es: "Whitman-Walker aprovechó la farmacia especializada 340B como pilar de ingresos durante su diversificación.",
    },
  },
  {
    from: { type: "case-study", id: "genesis-telehealth-scaling" },
    to: { type: "economics", id: "caliam-ecm" },
    relationship: "demonstrates",
    strength: 2,
    context: {
      en: "Genesis's telehealth model enables ECM delivery in rural areas — care coordination visits via telehealth qualify for both PPS and ECM PMPM payments.",
      es: "El modelo de telesalud de Genesis permite la entrega de ECM en áreas rurales — las visitas de coordinación de atención por telesalud califican para pagos PPS y ECM.",
    },
  },

  // === OKR → FRAMEWORK connections ===
  {
    from: { type: "okr", id: "advanced-federal-dependency" },
    to: { type: "framework", id: "rumelt-good-strategy" },
    relationship: "uses",
    strength: 3,
  },
  {
    from: { type: "okr", id: "advanced-ipa-launch" },
    to: { type: "framework", id: "cynefin-framework" },
    relationship: "uses",
    strength: 2,
  },
  {
    from: { type: "okr", id: "advanced-crisis-alignment" },
    to: { type: "framework", id: "kotter-8-step" },
    relationship: "uses",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-340b-pharmacy-launch" },
    to: { type: "framework", id: "dmaic-lean" },
    relationship: "uses",
    strength: 2,
  },
  {
    from: { type: "okr", id: "tactical-ai-documentation" },
    to: { type: "framework", id: "pdsa-cycle" },
    relationship: "uses",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-ecm-scaling" },
    to: { type: "framework", id: "adkar-model" },
    relationship: "uses",
    strength: 2,
  },
  {
    from: { type: "okr", id: "tactical-chw-program-launch" },
    to: { type: "framework", id: "foglamp-onboarding" },
    relationship: "uses",
    strength: 3,
  },

  // === OKR → ECONOMICS connections ===
  {
    from: { type: "okr", id: "tactical-340b-pharmacy-launch" },
    to: { type: "economics", id: "340b-program" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-ecm-scaling" },
    to: { type: "economics", id: "caliam-ecm" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-sb525-compliance" },
    to: { type: "economics", id: "workforce-sb525" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "advanced-federal-dependency" },
    to: { type: "economics", id: "section-330-grants" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "advanced-ipa-launch" },
    to: { type: "economics", id: "value-based-payment" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-revenue-cycle" },
    to: { type: "economics", id: "hcc-risk-adjustment" },
    relationship: "measures",
    strength: 2,
  },
  {
    from: { type: "okr", id: "tactical-revenue-cycle" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "measures",
    strength: 3,
  },
  {
    from: { type: "okr", id: "tactical-undocumented-enrollment" },
    to: { type: "economics", id: "fmap-medicaid" },
    relationship: "measures",
    strength: 2,
  },
  {
    from: { type: "okr", id: "tactical-dental-integration" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "measures",
    strength: 2,
  },

  // === ECONOMICS → ECONOMICS connections ===
  {
    from: { type: "economics", id: "section-330-grants" },
    to: { type: "economics", id: "340b-program" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "Section 330 grant status is the prerequisite for 340B eligibility. Losing the grant means losing 340B access — potentially $1M+ in annual revenue.",
      es: "El estatus de subvención Sección 330 es el prerrequisito para la elegibilidad 340B. Perder la subvención significa perder acceso a 340B.",
    },
  },
  {
    from: { type: "economics", id: "section-330-grants" },
    to: { type: "economics", id: "ftca-malpractice" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "FTCA coverage requires Section 330 deemed status. Loss of grant = $200-500K annual malpractice insurance cost.",
      es: "La cobertura FTCA requiere estatus designado Sección 330. Pérdida de subvención = $200-500K costo anual de seguro de mala praxis.",
    },
  },
  {
    from: { type: "economics", id: "section-330-grants" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "PPS reimbursement is only available to Section 330 grantees. The grant itself may be 15-20% of revenue, but PPS (enabled by the grant) is 50%+.",
      es: "El reembolso PPS solo está disponible para beneficiarios de Sección 330. La subvención puede ser 15-20% de ingresos, pero PPS (habilitado por la subvención) es 50%+.",
    },
  },
  {
    from: { type: "economics", id: "fmap-medicaid" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "FMAP determines the size of the Medicaid patient pool. When FMAP drops, states cut enrollment, reducing the number of patients generating PPS visits.",
      es: "FMAP determina el tamaño de la población de pacientes de Medicaid. Cuando FMAP baja, los estados reducen inscripción, reduciendo pacientes que generan visitas PPS.",
    },
  },
  {
    from: { type: "economics", id: "hcc-risk-adjustment" },
    to: { type: "economics", id: "value-based-payment" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "Accurate HCC coding directly increases capitation payments under VBP contracts. FQHCs that capture 90%+ of HCCs earn significantly more in risk-adjusted revenue.",
      es: "La codificación HCC precisa aumenta directamente los pagos de capitación bajo contratos VBP.",
    },
  },
  {
    from: { type: "economics", id: "caliam-ecm" },
    to: { type: "economics", id: "value-based-payment" },
    relationship: "complements",
    strength: 3,
    context: {
      en: "ECM is California's vehicle for transitioning FQHCs to value-based care. ECM PMPM payments + quality incentives create the infrastructure for full capitation readiness.",
      es: "ECM es el vehículo de California para la transición de FQHCs a la atención basada en valor.",
    },
  },
  {
    from: { type: "economics", id: "workforce-sb525" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "requires",
    strength: 2,
    context: {
      en: "SB 525 raises costs but PPS rates don't auto-adjust. FQHCs must file change-in-scope requests to get PPS rates that reflect higher labor costs.",
      es: "SB 525 aumenta costos pero las tarifas PPS no se ajustan automáticamente.",
    },
  },

  // === FRAMEWORK → FRAMEWORK connections ===
  {
    from: { type: "framework", id: "cynefin-framework" },
    to: { type: "framework", id: "rumelt-good-strategy" },
    relationship: "complements",
    strength: 3,
    context: {
      en: "Use Cynefin first to classify the problem domain (complex vs. complicated), then Rumelt to structure your strategic response. Cynefin diagnoses; Rumelt prescribes.",
      es: "Use Cynefin primero para clasificar el dominio del problema, luego Rumelt para estructurar su respuesta estratégica.",
    },
  },
  {
    from: { type: "framework", id: "kotter-8-step" },
    to: { type: "framework", id: "adkar-model" },
    relationship: "complements",
    strength: 3,
    context: {
      en: "Kotter manages organizational change (macro); ADKAR manages individual change (micro). Use both: Kotter for your org-wide transformation roadmap, ADKAR for each employee's journey.",
      es: "Kotter gestiona el cambio organizacional (macro); ADKAR gestiona el cambio individual (micro). Use ambos.",
    },
  },
  {
    from: { type: "framework", id: "dmaic-lean" },
    to: { type: "framework", id: "pdsa-cycle" },
    relationship: "complements",
    strength: 2,
    context: {
      en: "DMAIC is for large, structured improvement projects. PDSA is for rapid small experiments. Use DMAIC for the annual initiative; PDSA for the weekly iteration.",
      es: "DMAIC es para proyectos de mejora grandes y estructurados. PDSA es para experimentos pequeños y rápidos.",
    },
  },
  {
    from: { type: "framework", id: "stars-model" },
    to: { type: "framework", id: "foglamp-onboarding" },
    relationship: "complements",
    strength: 3,
    context: {
      en: "STARS diagnoses the situation you're entering; FOGLAMP structures your first conversations. Together: know the terrain (STARS), then navigate it (FOGLAMP).",
      es: "STARS diagnostica la situación en la que entras; FOGLAMP estructura tus primeras conversaciones.",
    },
  },
  {
    from: { type: "framework", id: "swot-pestel" },
    to: { type: "framework", id: "rumelt-good-strategy" },
    relationship: "enables",
    strength: 2,
    context: {
      en: "SWOT+PESTEL provides the environmental scan; Rumelt provides the strategic response framework. SWOT informs the diagnosis; Rumelt structures the strategy.",
      es: "SWOT+PESTEL proporciona el escaneo ambiental; Rumelt proporciona el marco de respuesta estratégica.",
    },
  },
  {
    from: { type: "framework", id: "readiness-assessment" },
    to: { type: "framework", id: "kotter-8-step" },
    relationship: "enables",
    strength: 3,
    context: {
      en: "The Readiness Assessment tells you if your organization is prepared for change. If not, step back and work Kotter's early steps (urgency, coalition) before launching.",
      es: "La Evaluación de Preparación indica si su organización está lista para el cambio.",
    },
  },

  // === LEADER connections ===
  {
    from: { type: "leader", id: "sara-rosenbaum" },
    to: { type: "economics", id: "section-330-grants" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "sara-rosenbaum" },
    to: { type: "economics", id: "fmap-medicaid" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "dario-amodei" },
    to: { type: "case-study", id: "sun-river-health-ai-documentation" },
    relationship: "advocates",
    strength: 2,
  },
  {
    from: { type: "leader", id: "kedar-mate" },
    to: { type: "framework", id: "pdsa-cycle" },
    relationship: "created",
    strength: 3,
  },
  {
    from: { type: "leader", id: "brenda-battle" },
    to: { type: "case-study", id: "pureview-federal-dependency" },
    relationship: "created",
    strength: 3,
  },
  {
    from: { type: "leader", id: "kevin-rios" },
    to: { type: "case-study", id: "united-health-centers-ipa" },
    relationship: "created",
    strength: 3,
  },
  {
    from: { type: "leader", id: "robert-gillanders" },
    to: { type: "case-study", id: "mcr-health-subscription-model" },
    relationship: "created",
    strength: 3,
  },
  {
    from: { type: "leader", id: "rachel-harrington" },
    to: { type: "economics", id: "340b-program" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "rachel-harrington" },
    to: { type: "economics", id: "pps-reimbursement" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "carmela-castellano-garcia" },
    to: { type: "economics", id: "caliam-ecm" },
    relationship: "advocates",
    strength: 2,
  },
  {
    from: { type: "leader", id: "jim-macrae" },
    to: { type: "economics", id: "section-330-grants" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "bianca-frogner" },
    to: { type: "economics", id: "workforce-sb525" },
    relationship: "advocates",
    strength: 2,
  },
  {
    from: { type: "leader", id: "joe-dunn" },
    to: { type: "economics", id: "section-330-grants" },
    relationship: "advocates",
    strength: 3,
  },
  {
    from: { type: "leader", id: "joe-dunn" },
    to: { type: "economics", id: "fmap-medicaid" },
    relationship: "advocates",
    strength: 2,
  },
];

/* ------------------------------------------------------------------ */
/*  Strategic Themes — the big picture                                 */
/* ------------------------------------------------------------------ */

export const strategicThemes: StrategicTheme[] = [
  {
    id: "federal-survival",
    title: {
      en: "Federal Funding Survival",
      es: "Supervivencia del Financiamiento Federal",
    },
    subtitle: {
      en: "Preparing for the worst while planning for the best",
      es: "Prepararse para lo peor mientras se planifica lo mejor",
    },
    description: {
      en: "Section 330 CHCF authorization expires late 2025/2026. H.R. 1 proposes the largest Medicaid cuts in history. Every FQHC must model their zero-grant scenario and build a 3-year runway plan. The FQHCs that survive will be those that diversified before the cliff.",
      es: "La autorización CHCF de Sección 330 expira a finales de 2025/2026. H.R. 1 propone los mayores recortes a Medicaid en la historia. Cada FQHC debe modelar su escenario sin subvención y construir un plan de 3 años.",
    },
    icon: "Shield",
    color: "rose",
    urgency: "critical",
    caseStudyIds: ["pureview-federal-dependency", "whitman-walker-specialty-diversification"],
    economicsIds: ["section-330-grants", "fmap-medicaid", "ftca-malpractice", "sliding-fee-uninsured"],
    frameworkIds: ["rumelt-good-strategy", "swot-pestel", "readiness-assessment"],
    okrIds: ["advanced-federal-dependency", "tactical-grant-diversification"],
    leaderIds: ["joe-dunn", "sara-rosenbaum", "jim-macrae", "carole-johnson", "brenda-battle"],
    foresight: {
      en: "By 2027, FQHCs will split into two tiers: those that prepared for federal uncertainty (diversified revenue, built reserves, reduced dependency) and those that didn't. The preparation window is NOW. Model your zero-grant scenario. Start diversifying. Every month of delay reduces your runway.",
      es: "Para 2027, los FQHCs se dividirán en dos niveles: los que se prepararon para la incertidumbre federal y los que no. La ventana de preparación es AHORA.",
    },
  },
  {
    id: "revenue-engine",
    title: {
      en: "Revenue Engine Building",
      es: "Construyendo el Motor de Ingresos",
    },
    subtitle: {
      en: "Beyond PPS: building multiple revenue streams",
      es: "Más allá de PPS: construyendo múltiples flujos de ingresos",
    },
    description: {
      en: "The most resilient FQHCs generate revenue from 5+ distinct sources. 340B pharmacy, dental integration, specialty referral management, capitated contracts, and ECM payments each represent significant revenue opportunities that reduce dependence on any single payer.",
      es: "Los FQHCs más resilientes generan ingresos de 5+ fuentes distintas. La farmacia 340B, integración dental, gestión de referencias especializadas, contratos capitados, y pagos ECM representan oportunidades significativas.",
    },
    icon: "DollarSign",
    color: "amber",
    urgency: "high",
    caseStudyIds: ["highland-health-340b", "mcr-health-subscription-model", "united-health-centers-ipa", "communicare-dental-integration", "whitman-walker-specialty-diversification"],
    economicsIds: ["pps-reimbursement", "340b-program", "value-based-payment", "caliam-ecm", "hcc-risk-adjustment"],
    frameworkIds: ["dmaic-lean", "rumelt-good-strategy"],
    okrIds: ["intermediate-340b-optimization", "tactical-340b-pharmacy-launch", "advanced-ipa-launch", "tactical-dental-integration", "tactical-ecm-scaling", "tactical-revenue-cycle"],
    leaderIds: ["rachel-harrington", "kevin-rios", "robert-gillanders"],
    foresight: {
      en: "The 340B program faces existential regulatory risk — model 20-30% revenue reduction over 5 years. IPAs and capitation will grow as California pushes managed care. FQHCs that build VBP infrastructure NOW will capture disproportionate share of new managed care contracts. The math is clear: a 10,000-patient capitated panel at $50 PMPM generates more predictable revenue than PPS volume alone.",
      es: "El programa 340B enfrenta riesgo regulatorio existencial. Los IPAs y la capitación crecerán a medida que California impulse la atención administrada.",
    },
  },
  {
    id: "ai-transformation",
    title: {
      en: "AI Transformation",
      es: "Transformación de Inteligencia Artificial",
    },
    subtitle: {
      en: "From documentation burden to strategic advantage",
      es: "De la carga de documentación a la ventaja estratégica",
    },
    description: {
      en: "AI is not future — it's now. FQHCs are deploying ambient documentation, AI-assisted coding, automated scheduling, and predictive analytics. The early movers are seeing 50%+ documentation time reduction, improved HCC capture, and provider satisfaction increases. The question isn't whether to adopt AI, but how fast.",
      es: "La IA no es futuro — es ahora. Los FQHCs están desplegando documentación ambiental, codificación asistida por IA, programación automatizada y análisis predictivo.",
    },
    icon: "Cpu",
    color: "blue",
    urgency: "high",
    caseStudyIds: ["sun-river-health-ai-documentation", "urban-health-plan-ai-scheduling", "neighborhood-healthcare-ai-ambient"],
    economicsIds: ["hcc-risk-adjustment", "pps-reimbursement", "value-based-payment"],
    frameworkIds: ["pdsa-cycle", "ooda-loop", "tech-stack-assessment"],
    okrIds: ["advanced-ai-full-stack", "tactical-ai-documentation", "intermediate-ai-rcm"],
    leaderIds: ["dario-amodei", "girish-navani", "adam-cheriff", "jonathan-bush"],
    foresight: {
      en: "Within 18 months, AI-assisted documentation will be table stakes — not a competitive advantage. The next frontier is AI-driven population health management: predictive risk stratification, automated care gap closure, and real-time quality reporting. FQHCs that deploy AI for documentation today should plan for AI in clinical decision support and revenue optimization tomorrow. The workforce impact: AI doesn't replace providers — it gives each provider capacity for 25-30% more patients.",
      es: "En 18 meses, la documentación asistida por IA será estándar — no una ventaja competitiva. La próxima frontera es la gestión de salud poblacional impulsada por IA.",
    },
  },
  {
    id: "workforce-crisis",
    title: {
      en: "Workforce Crisis Navigation",
      es: "Navegando la Crisis Laboral",
    },
    subtitle: {
      en: "Recruiting, retaining, and developing mission-driven teams",
      es: "Reclutar, retener y desarrollar equipos orientados a la misión",
    },
    description: {
      en: "FQHCs face a perfect storm: SB 525 raising costs, provider burnout driving turnover, CHW demand outstripping supply, and layoffs at larger systems creating both displaced workers and hiring opportunities. The winners will build career ladders, invest in training, and leverage AI to reduce administrative burden.",
      es: "Los FQHCs enfrentan una tormenta perfecta: SB 525 aumentando costos, agotamiento de proveedores impulsando rotación, y despidos en sistemas más grandes.",
    },
    icon: "Users",
    color: "purple",
    urgency: "high",
    caseStudyIds: ["salud-chw-pipeline", "fenway-lgbtq-care-model", "yvfwc-integrated-delivery"],
    economicsIds: ["workforce-sb525", "caliam-ecm"],
    frameworkIds: ["adkar-model", "stars-model", "foglamp-onboarding"],
    okrIds: ["tactical-chw-program-launch", "tactical-sb525-compliance"],
    leaderIds: ["bianca-frogner", "rachel-gonzales-hanson", "atul-grover"],
    foresight: {
      en: "SB 525 will compress wages upward through 2027. FQHCs that build career ladders NOW (CHW → care coordinator → case manager → program director) will retain talent while those offering flat roles will hemorrhage staff. The CHW workforce is the strategic asset: they cost $25-30/hr but generate $150-350 PMPM in ECM revenue per member. Every FQHC should have a CHW training pipeline.",
      es: "SB 525 comprimirá los salarios hacia arriba hasta 2027. Los FQHCs que construyan escaleras profesionales AHORA retendrán talento.",
    },
  },
  {
    id: "patient-access-equity",
    title: {
      en: "Patient Access & Health Equity",
      es: "Acceso al Paciente y Equidad en Salud",
    },
    subtitle: {
      en: "Serving the underserved in an uncertain political landscape",
      es: "Sirviendo a los desatendidos en un panorama político incierto",
    },
    description: {
      en: "Undocumented patients gained full-scope Medi-Cal, then face H.R. 1 verification requirements that could reverse coverage. LGBTQ+ health access faces political headwinds. Immigrant communities fear seeking care. FQHCs are the last line of defense — and must adapt access models to serve communities regardless of coverage status.",
      es: "Los pacientes indocumentados obtuvieron Medi-Cal completo, luego enfrentan requisitos de verificación de H.R. 1 que podrían revertir la cobertura.",
    },
    icon: "HeartPulse",
    color: "teal",
    urgency: "critical",
    caseStudyIds: ["zufall-multilingual-access", "callen-lorde-community-governance", "fenway-lgbtq-care-model", "asian-health-services-community-model", "genesis-telehealth-scaling"],
    economicsIds: ["sliding-fee-uninsured", "fmap-medicaid", "section-330-grants"],
    frameworkIds: ["bridges-transition", "kotter-8-step"],
    okrIds: ["tactical-undocumented-enrollment", "starter-undocumented-reassurance"],
    leaderIds: ["lei-chou-thao", "roger-rosenthal", "carmela-castellano-garcia"],
    foresight: {
      en: "The next 24 months will determine whether California's undocumented Medi-Cal expansion survives. FQHCs must prepare for both scenarios: (1) Coverage maintained — maximize enrollment and PPS revenue from newly covered populations; (2) Coverage reversed — rebuild sliding fee infrastructure, secure uncompensated care funding, and deploy CHWs for community trust-building. The FQHCs with the strongest community relationships will lose the fewest patients regardless of the policy outcome.",
      es: "Los próximos 24 meses determinarán si la expansión de Medi-Cal para indocumentados de California sobrevive.",
    },
  },
  {
    id: "operational-mastery",
    title: {
      en: "Operational Excellence",
      es: "Excelencia Operacional",
    },
    subtitle: {
      en: "Systems, processes, and continuous improvement",
      es: "Sistemas, procesos y mejora continua",
    },
    description: {
      en: "The best strategy fails without operational discipline. QI programs, documentation compliance, grant cycle management, and cross-department coordination determine whether good ideas become sustained results. FQHCs that build QI muscle outperform peers on every metric.",
      es: "La mejor estrategia falla sin disciplina operacional. Programas de QI, cumplimiento de documentación, gestión de ciclos de subvenciones y coordinación interdepartamental.",
    },
    icon: "Cog",
    color: "stone",
    urgency: "medium",
    caseStudyIds: ["opca-collaborative-qi", "chc-weitzman-research-model", "yvfwc-integrated-delivery"],
    economicsIds: ["pps-reimbursement", "hcc-risk-adjustment"],
    frameworkIds: ["dmaic-lean", "pdsa-cycle", "eisenhower-matrix", "readiness-assessment"],
    okrIds: ["tactical-uds-quality", "starter-documentation-audit"],
    leaderIds: ["kedar-mate", "fran-silvestri", "kyu-rhee"],
    foresight: {
      en: "HRSA's UDS reporting is becoming more granular and consequential. FQHCs that outperform on UDS metrics will receive preferential treatment in competitive funding rounds. The investment in QI infrastructure (data dashboards, PDSA training, documentation compliance) pays compound returns through better quality scores, higher 330 grant awards, managed care quality bonuses, and VBP shared savings.",
      es: "Los reportes UDS de HRSA se están volviendo más granulares y consecuentes. Los FQHCs que superen los métricas UDS recibirán trato preferencial.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Learning Paths — guided journeys                                   */
/* ------------------------------------------------------------------ */

export const learningPaths: LearningPath[] = [
  {
    id: "new-fqhc-executive",
    title: {
      en: "New FQHC Executive Orientation",
      es: "Orientación para Nuevo Ejecutivo de FQHC",
    },
    description: {
      en: "Essential knowledge for anyone new to FQHC leadership. Start here to understand how FQHCs work financially, what frameworks to use, and what the current strategic landscape looks like.",
      es: "Conocimiento esencial para cualquier persona nueva en liderazgo de FQHC. Comience aquí para entender cómo funcionan financieramente los FQHCs.",
    },
    targetAudience: {
      en: "New CEOs, CFOs, COOs, or board members at FQHCs",
      es: "Nuevos CEOs, CFOs, COOs o miembros de junta en FQHCs",
    },
    difficulty: "new-to-fqhc",
    estimatedTime: "4-6 hours",
    steps: [
      {
        order: 1,
        title: { en: "Understand PPS — Your Revenue Engine", es: "Entienda PPS — Su Motor de Ingresos" },
        contentType: "economics",
        contentId: "pps-reimbursement",
        action: { en: "Read the Foundation and Operational levels", es: "Lea los niveles Fundamentos y Operacional" },
        insight: { en: "Every qualifying visit generates the same amount. Documentation quality = revenue quality.", es: "Cada visita calificante genera la misma cantidad. Calidad de documentación = calidad de ingresos." },
      },
      {
        order: 2,
        title: { en: "Know Your 330 Grant Ecosystem", es: "Conozca Su Ecosistema de Subvención 330" },
        contentType: "economics",
        contentId: "section-330-grants",
        action: { en: "Read all three levels to understand the grant's multiplier effect", es: "Lea los tres niveles para entender el efecto multiplicador de la subvención" },
        insight: { en: "The grant is 15-20% of revenue but unlocks PPS (50%+), 340B, FTCA, and NHSC — the entire financial architecture.", es: "La subvención es 15-20% de ingresos pero desbloquea PPS, 340B, FTCA y NHSC." },
      },
      {
        order: 3,
        title: { en: "Learn the STARS Diagnostic", es: "Aprenda el Diagnóstico STARS" },
        contentType: "framework",
        contentId: "stars-model",
        action: { en: "Assess which STARS situation your FQHC is in", es: "Evalúe en qué situación STARS está su FQHC" },
        insight: { en: "Startup, Turnaround, Accelerated Growth, Realignment, or Sustaining Success — your approach must match the situation.", es: "Su enfoque debe coincidir con la situación." },
      },
      {
        order: 4,
        title: { en: "Run the FOGLAMP Conversations", es: "Ejecute las Conversaciones FOGLAMP" },
        contentType: "framework",
        contentId: "foglamp-onboarding",
        action: { en: "Schedule FOGLAMP conversations with each direct report in your first 30 days", es: "Programe conversaciones FOGLAMP con cada reporte directo en sus primeros 30 días" },
        insight: { en: "Failures, Opportunities, Goals, Leadership style, Asks, Measures, People — structured first conversations reveal the real organization.", es: "Fracasos, Oportunidades, Metas, Estilo de Liderazgo, Peticiones, Métricas, Personas." },
      },
      {
        order: 5,
        title: { en: "Study a Diversification Success Story", es: "Estudie una Historia de Éxito de Diversificación" },
        contentType: "case-study",
        contentId: "pureview-federal-dependency",
        action: { en: "Read how PureView reduced federal dependency from 62.5% to 17%", es: "Lea cómo PureView redujo la dependencia federal del 62.5% al 17%" },
        insight: { en: "The best protection against federal uncertainty is not lobbying — it's building revenue resilience before you need it.", es: "La mejor protección contra la incertidumbre federal es construir resiliencia de ingresos antes de necesitarla." },
      },
      {
        order: 6,
        title: { en: "Set Your First OKR", es: "Establezca Su Primer OKR" },
        contentType: "okr",
        contentId: "starter-documentation-audit",
        action: { en: "Use this starter OKR as a template for your first 90-day priority", es: "Use esta plantilla OKR para su primera prioridad de 90 días" },
        insight: { en: "OKRs align departments around shared outcomes. Start with one cross-functional OKR to break down silos.", es: "Los OKRs alinean departamentos alrededor de resultados compartidos." },
      },
    ],
  },
  {
    id: "revenue-diversification-sprint",
    title: {
      en: "Revenue Diversification Sprint",
      es: "Sprint de Diversificación de Ingresos",
    },
    description: {
      en: "A fast-track path for FQHCs that need to reduce federal dependency and build new revenue streams. Covers the economics, case studies, and execution frameworks for 340B, dental, IPA, and ECM expansion.",
      es: "Una ruta acelerada para FQHCs que necesitan reducir la dependencia federal y construir nuevos flujos de ingresos.",
    },
    targetAudience: {
      en: "CFOs, Revenue Cycle Directors, and CEOs facing funding uncertainty",
      es: "CFOs, Directores de Ciclo de Ingresos y CEOs que enfrentan incertidumbre de financiamiento",
    },
    difficulty: "experienced-leader",
    estimatedTime: "3-4 hours",
    steps: [
      {
        order: 1,
        title: { en: "Assess Your Current Revenue Mix", es: "Evalúe Su Mezcla Actual de Ingresos" },
        contentType: "economics",
        contentId: "section-330-grants",
        action: { en: "Calculate your federal dependency percentage (330 + FMAP as % of total revenue)", es: "Calcule su porcentaje de dependencia federal" },
        insight: { en: "If >40% of revenue is federal, you're in the danger zone. PureView's target was <20%.", es: "Si >40% de ingresos es federal, está en la zona de peligro." },
      },
      {
        order: 2,
        title: { en: "340B Pharmacy Opportunity", es: "Oportunidad de Farmacia 340B" },
        contentType: "case-study",
        contentId: "highland-health-340b",
        action: { en: "Study Highland Health's 270% revenue increase from 340B optimization", es: "Estudie el aumento de ingresos del 270% de Highland Health" },
        insight: { en: "In-house pharmacy captures maximum 340B margin. Contract pharmacy extends reach but splits revenue.", es: "La farmacia interna captura el máximo margen 340B." },
      },
      {
        order: 3,
        title: { en: "Plan Your Diversification Using Rumelt", es: "Planifique Su Diversificación Usando Rumelt" },
        contentType: "framework",
        contentId: "rumelt-good-strategy",
        action: { en: "Diagnose your biggest vulnerability, set a guiding policy, plan 3-5 coherent actions", es: "Diagnostique su mayor vulnerabilidad, establezca una política guía, planifique 3-5 acciones coherentes" },
        insight: { en: "Good strategy is focused. Don't try to diversify into everything at once — pick the highest-ROI revenue stream first.", es: "La buena estrategia está enfocada. No intente diversificar en todo a la vez." },
      },
      {
        order: 4,
        title: { en: "Set Your Federal Dependency OKR", es: "Establezca Su OKR de Dependencia Federal" },
        contentType: "okr",
        contentId: "advanced-federal-dependency",
        action: { en: "Adapt this OKR template to your FQHC's specific revenue targets", es: "Adapte esta plantilla OKR a los objetivos de ingresos específicos de su FQHC" },
        insight: { en: "A 12-month OKR to reduce federal dependency below 40% — with measurable key results for 340B, dental, and commercial insurance.", es: "Un OKR de 12 meses para reducir la dependencia federal por debajo del 40%." },
      },
      {
        order: 5,
        title: { en: "Value-Based Payment Readiness", es: "Preparación para Pago Basado en Valor" },
        contentType: "economics",
        contentId: "value-based-payment",
        action: { en: "Read the executive level to understand the capitation math", es: "Lea el nivel ejecutivo para entender las matemáticas de la capitación" },
        insight: { en: "A 10,000-patient panel at $50 PMPM capitation = $6M annual. If managed at $40 PMPM cost, the $1.2M surplus exceeds PPS-only revenue.", es: "Un panel de 10,000 pacientes a $50 PMPM de capitación = $6M anual." },
      },
    ],
  },
  {
    id: "crisis-response-playbook",
    title: {
      en: "Crisis Response Playbook",
      es: "Manual de Respuesta a Crisis",
    },
    description: {
      en: "For FQHCs facing immediate threats: funding cuts, layoffs, merger pressure, or regulatory changes. This path moves fast through assessment, communication, and action frameworks.",
      es: "Para FQHCs que enfrentan amenazas inmediatas: recortes de financiamiento, despidos, presión de fusión o cambios regulatorios.",
    },
    targetAudience: {
      en: "CEOs and leadership teams in crisis mode",
      es: "CEOs y equipos de liderazgo en modo crisis",
    },
    difficulty: "crisis-mode",
    estimatedTime: "2 hours",
    steps: [
      {
        order: 1,
        title: { en: "Classify the Problem", es: "Clasifique el Problema" },
        contentType: "framework",
        contentId: "cynefin-framework",
        action: { en: "Determine if your crisis is simple, complicated, complex, or chaotic — this determines your response approach", es: "Determine si su crisis es simple, complicada, compleja o caótica" },
        insight: { en: "Complex problems (most FQHC crises) require safe-to-fail probes, not best-practice templates. Don't copy — experiment.", es: "Los problemas complejos requieren sondas seguras para fallar, no plantillas de mejores prácticas." },
      },
      {
        order: 2,
        title: { en: "Assess Organizational Readiness", es: "Evalúe la Preparación Organizacional" },
        contentType: "framework",
        contentId: "readiness-assessment",
        action: { en: "Run the readiness assessment with your leadership team — be honest about gaps", es: "Ejecute la evaluación de preparación con su equipo de liderazgo" },
        insight: { en: "Most organizations overestimate their change readiness. Better to know the truth now than discover it during execution.", es: "La mayoría de las organizaciones sobreestiman su preparación para el cambio." },
      },
      {
        order: 3,
        title: { en: "Build the Urgency Case", es: "Construya el Caso de Urgencia" },
        contentType: "framework",
        contentId: "kotter-8-step",
        action: { en: "Focus on Steps 1-3: create urgency, build coalition, form vision — these must happen before any action", es: "Enfóquese en los Pasos 1-3: crear urgencia, construir coalición, formar visión" },
        insight: { en: "70% of change initiatives fail because they skip the first three Kotter steps. Don't jump to action without alignment.", es: "70% de las iniciativas de cambio fracasan porque saltan los primeros tres pasos de Kotter." },
      },
      {
        order: 4,
        title: { en: "Set Crisis OKRs", es: "Establezca OKRs de Crisis" },
        contentType: "okr",
        contentId: "advanced-crisis-alignment",
        action: { en: "Deploy this 90-day crisis alignment OKR — every department, one shared objective", es: "Despliegue este OKR de alineación de crisis de 90 días" },
        insight: { en: "In crisis, alignment matters more than perfection. One shared OKR across all departments creates unified response.", es: "En crisis, la alineación importa más que la perfección." },
      },
      {
        order: 5,
        title: { en: "Understand the Financial Landscape", es: "Entienda el Panorama Financiero" },
        contentType: "economics",
        contentId: "fmap-medicaid",
        action: { en: "Model three scenarios: optimistic, base case, and stress case for your Medicaid revenue", es: "Modele tres escenarios para sus ingresos de Medicaid" },
        insight: { en: "Each 1% drop in Medicaid patient panel = approximately 1% PPS revenue decline. Model the cascade.", es: "Cada 1% de caída en el panel de pacientes de Medicaid = aproximadamente 1% de caída en ingresos PPS." },
      },
      {
        order: 6,
        title: { en: "Study Crisis Diversification", es: "Estudie la Diversificación en Crisis" },
        contentType: "case-study",
        contentId: "pureview-federal-dependency",
        action: { en: "PureView did this deliberately over 5 years. In crisis mode, prioritize the highest-ROI moves first.", es: "PureView hizo esto deliberadamente durante 5 años. En modo crisis, priorice los movimientos de mayor ROI." },
        insight: { en: "The FQHCs that survive crises are those that had already started diversifying. If you haven't started, today is the second-best time.", es: "Los FQHCs que sobreviven crisis son los que ya habían comenzado a diversificar." },
      },
    ],
  },
  {
    id: "ai-adoption-journey",
    title: {
      en: "AI Adoption Journey",
      es: "Viaje de Adopción de IA",
    },
    description: {
      en: "Step-by-step path for FQHCs beginning their AI journey. From understanding the landscape to piloting ambient documentation to scaling across departments.",
      es: "Ruta paso a paso para FQHCs que comienzan su viaje de IA.",
    },
    targetAudience: {
      en: "CMOs, CIOs, IT Directors, and practice managers",
      es: "CMOs, CIOs, Directores de TI y gerentes de práctica",
    },
    difficulty: "experienced-leader",
    estimatedTime: "3 hours",
    steps: [
      {
        order: 1,
        title: { en: "Assess Your Tech Stack", es: "Evalúe Su Stack Tecnológico" },
        contentType: "framework",
        contentId: "tech-stack-assessment",
        action: { en: "Complete the tech stack assessment to identify readiness and gaps", es: "Complete la evaluación de stack tecnológico para identificar preparación y brechas" },
        insight: { en: "AI adoption depends on EHR readiness, data infrastructure, and staff digital literacy. Assess before investing.", es: "La adopción de IA depende de la preparación del EHR, infraestructura de datos y alfabetización digital del personal." },
      },
      {
        order: 2,
        title: { en: "Learn from Early Movers", es: "Aprenda de los Primeros en Adoptar" },
        contentType: "case-study",
        contentId: "sun-river-health-ai-documentation",
        action: { en: "Study Sun River Health's AI documentation results: 26 patients charted in 30 minutes", es: "Estudie los resultados de documentación AI de Sun River Health" },
        insight: { en: "AI documentation is the beachhead. Start there, prove value, then expand to coding, scheduling, and population health.", es: "La documentación AI es la cabeza de playa. Comience ahí, demuestre valor, luego expanda." },
      },
      {
        order: 3,
        title: { en: "Design Your PDSA Pilot", es: "Diseñe Su Piloto PDSA" },
        contentType: "framework",
        contentId: "pdsa-cycle",
        action: { en: "Use PDSA to design a 30-day ambient documentation pilot with 3-5 willing providers", es: "Use PDSA para diseñar un piloto de documentación ambiental de 30 días" },
        insight: { en: "Start with willing early adopters, measure time savings, document workflows, then iterate before scaling.", es: "Comience con adoptadores tempranos dispuestos, mida ahorros de tiempo, documente flujos de trabajo." },
      },
      {
        order: 4,
        title: { en: "Understand the Revenue Impact", es: "Entienda el Impacto en Ingresos" },
        contentType: "economics",
        contentId: "hcc-risk-adjustment",
        action: { en: "Learn how AI documentation improves HCC capture — turning clinical quality into revenue", es: "Aprenda cómo la documentación AI mejora la captura HCC" },
        insight: { en: "AI catches diagnosis codes that humans miss. A 0.1 increase in average RAF score across 10K patients = $1.2M additional annual revenue.", es: "La IA captura códigos de diagnóstico que los humanos pierden." },
      },
      {
        order: 5,
        title: { en: "Set Your AI OKR", es: "Establezca Su OKR de IA" },
        contentType: "okr",
        contentId: "tactical-ai-documentation",
        action: { en: "Adapt this OKR template for your FQHC's AI documentation pilot", es: "Adapte esta plantilla OKR para el piloto de documentación AI de su FQHC" },
        insight: { en: "Measure three things: documentation time, provider satisfaction, and coding accuracy. If all three improve, scale aggressively.", es: "Mida tres cosas: tiempo de documentación, satisfacción del proveedor y precisión de codificación." },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

/** Get all edges connected to a specific content item */
export function getEdgesForContent(
  type: ContentType,
  id: string
): KnowledgeEdge[] {
  return knowledgeEdges.filter(
    (e) =>
      (e.from.type === type && e.from.id === id) ||
      (e.to.type === type && e.to.id === id)
  );
}

/** Get all content IDs related to a specific item (one hop) */
export function getRelatedContent(
  type: ContentType,
  id: string
): { type: ContentType; id: string; relationship: RelationshipType; strength: number }[] {
  const edges = getEdgesForContent(type, id);
  return edges.map((e) => {
    const isFrom = e.from.type === type && e.from.id === id;
    return {
      type: isFrom ? e.to.type : e.from.type,
      id: isFrom ? e.to.id : e.from.id,
      relationship: e.relationship,
      strength: e.strength,
    };
  });
}

/** Get the strategic theme that includes a specific content item */
export function getThemesForContent(
  type: ContentType,
  id: string
): StrategicTheme[] {
  return strategicThemes.filter((theme) => {
    switch (type) {
      case "case-study":
        return theme.caseStudyIds.includes(id);
      case "economics":
        return theme.economicsIds.includes(id);
      case "framework":
        return theme.frameworkIds.includes(id);
      case "okr":
        return theme.okrIds.includes(id);
      case "leader":
        return theme.leaderIds.includes(id);
      default:
        return false;
    }
  });
}

/** Get a learning path by ID */
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((p) => p.id === id);
}

/** Get learning paths by difficulty */
export function getLearningPathsByDifficulty(
  difficulty: PathDifficulty
): LearningPath[] {
  return learningPaths.filter((p) => p.difficulty === difficulty);
}

/** Calculate knowledge graph stats */
export function getKnowledgeGraphStats(): {
  totalEdges: number;
  totalThemes: number;
  totalPaths: number;
  totalPathSteps: number;
  edgesByType: Record<RelationshipType, number>;
} {
  const edgesByType: Record<RelationshipType, number> = {
    implements: 0,
    demonstrates: 0,
    measures: 0,
    uses: 0,
    advocates: 0,
    created: 0,
    informs: 0,
    enables: 0,
    requires: 0,
    complements: 0,
  };
  knowledgeEdges.forEach((e) => {
    edgesByType[e.relationship]++;
  });
  return {
    totalEdges: knowledgeEdges.length,
    totalThemes: strategicThemes.length,
    totalPaths: learningPaths.length,
    totalPathSteps: learningPaths.reduce((sum, p) => sum + p.steps.length, 0),
    edgesByType,
  };
}

/** Get content with most connections (hub nodes) */
export function getContentHubs(): {
  type: ContentType;
  id: string;
  connectionCount: number;
}[] {
  const counts: Record<string, { type: ContentType; id: string; count: number }> = {};

  knowledgeEdges.forEach((e) => {
    const fromKey = `${e.from.type}:${e.from.id}`;
    const toKey = `${e.to.type}:${e.to.id}`;

    if (!counts[fromKey]) counts[fromKey] = { type: e.from.type, id: e.from.id, count: 0 };
    if (!counts[toKey]) counts[toKey] = { type: e.to.type, id: e.to.id, count: 0 };

    counts[fromKey].count++;
    counts[toKey].count++;
  });

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .map((c) => ({ type: c.type, id: c.id, connectionCount: c.count }));
}
