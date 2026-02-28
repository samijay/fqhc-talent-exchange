// execution-frameworks.ts
// Execution frameworks and thinking tools for FQHC executives and workforce
// Includes change management models, workforce planning tools, and decision frameworks
// Adapted from untools.co concepts + healthcare-specific models
// Primary sources linked for all frameworks
// Last updated: 2026-02-28

export const FRAMEWORKS_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FrameworkCategory =
  | "change-management"
  | "decision-making"
  | "workforce-planning"
  | "operational-excellence"
  | "strategic-analysis"
  | "assessment-tools";

export interface FrameworkStep {
  name: { en: string; es: string };
  description: { en: string; es: string };
}

export interface ExecutionFramework {
  id: string;
  name: { en: string; es: string };
  category: FrameworkCategory;
  author: string;
  icon: string;
  tagline: { en: string; es: string };
  description: { en: string; es: string };
  steps: FrameworkStep[];
  fqhcApplication: { en: string; es: string };
  whenToUse: { en: string; es: string };
  shareableLevel: "all-staff" | "managers" | "executives";
  sourceUrl: string;
  sourceOrg: string;
}

export const categoryMeta: Record<
  FrameworkCategory,
  { label: { en: string; es: string }; color: string; icon: string }
> = {
  "change-management": {
    label: { en: "Change Management", es: "Gestión del Cambio" },
    color: "teal",
    icon: "RefreshCw",
  },
  "decision-making": {
    label: { en: "Decision Making", es: "Toma de Decisiones" },
    color: "amber",
    icon: "Compass",
  },
  "workforce-planning": {
    label: { en: "Workforce Planning", es: "Planificación de Personal" },
    color: "blue",
    icon: "Users",
  },
  "operational-excellence": {
    label: { en: "Operational Excellence", es: "Excelencia Operacional" },
    color: "purple",
    icon: "Cog",
  },
  "strategic-analysis": {
    label: { en: "Strategic Analysis", es: "Análisis Estratégico" },
    color: "rose",
    icon: "BarChart3",
  },
  "assessment-tools": {
    label: { en: "Assessment Tools", es: "Herramientas de Evaluación" },
    color: "stone",
    icon: "ClipboardCheck",
  },
};

export const shareableLevelMeta: Record<
  "all-staff" | "managers" | "executives",
  { label: { en: string; es: string }; color: string }
> = {
  "all-staff": {
    label: { en: "All Staff", es: "Todo el Personal" },
    color: "teal",
  },
  managers: {
    label: { en: "Managers", es: "Gerentes" },
    color: "amber",
  },
  executives: {
    label: { en: "Executives", es: "Ejecutivos" },
    color: "rose",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

export const executionFrameworks: ExecutionFramework[] = [
  /* ---- CHANGE MANAGEMENT ---- */
  {
    id: "kotter-8-step",
    name: { en: "Kotter's 8-Step Change Model", es: "Modelo de 8 Pasos de Kotter" },
    category: "change-management",
    author: "John Kotter",
    icon: "ArrowUpCircle",
    tagline: {
      en: "Lead change through urgency, coalition, and wins",
      es: "Lidere el cambio a través de urgencia, coalición y victorias",
    },
    description: {
      en: "The gold standard for organizational change. Kotter's model moves organizations from complacency to sustained transformation through sequential steps that build on each other.",
      es: "El estándar de oro para el cambio organizacional. El modelo de Kotter mueve organizaciones de la complacencia a la transformación sostenida.",
    },
    steps: [
      { name: { en: "Create Urgency", es: "Crear Urgencia" }, description: { en: "Help others see why change is necessary now — share the funding cliff data, layoff numbers, and H.R. 1 projections", es: "Ayude a otros a ver por qué el cambio es necesario ahora — comparta datos de acantilados de financiamiento" } },
      { name: { en: "Build Coalition", es: "Construir Coalición" }, description: { en: "Assemble a cross-department team: clinical, finance, HR, IT. Include informal leaders and union reps", es: "Arme un equipo interdepartamental: clínico, finanzas, RRHH, TI" } },
      { name: { en: "Form Vision", es: "Formar Visión" }, description: { en: "Define a clear picture of what success looks like — 'We will be financially independent of federal grants within 5 years'", es: "Defina una imagen clara del éxito" } },
      { name: { en: "Communicate Vision", es: "Comunicar Visión" }, description: { en: "Share the vision in every meeting, huddle, and all-hands. Use the Rumult framework to structure the narrative", es: "Comparta la visión en cada reunión y comunicación" } },
      { name: { en: "Empower Action", es: "Empoderar Acción" }, description: { en: "Remove barriers: outdated policies, resistant middle managers, legacy systems. Invest in training", es: "Elimine barreras: políticas obsoletas, gerentes resistentes, sistemas heredados" } },
      { name: { en: "Create Quick Wins", es: "Crear Victorias Rápidas" }, description: { en: "Deliver visible results within 30-60 days — pilot ECM in one clinic, launch 340B in-house pharmacy, implement ambient AI", es: "Entregue resultados visibles en 30-60 días" } },
      { name: { en: "Build on Wins", es: "Construir sobre Victorias" }, description: { en: "Use early wins to accelerate broader changes. Don't declare victory too early — maintain urgency", es: "Use victorias tempranas para acelerar cambios más amplios" } },
      { name: { en: "Anchor in Culture", es: "Anclar en la Cultura" }, description: { en: "Make the new ways 'how we do things here.' Update job descriptions, performance reviews, and onboarding", es: "Haga las nuevas formas parte de 'cómo hacemos las cosas aquí'" } },
    ],
    fqhcApplication: {
      en: "Perfect for major transitions: launching ECM program, implementing AI documentation, restructuring from fee-for-service to value-based care, or responding to federal funding cuts. Start with Step 1 by sharing Intelligence Dashboard data at your next leadership meeting.",
      es: "Perfecto para transiciones importantes: lanzar programa ECM, implementar documentación AI, reestructurar de tarifa por servicio a atención basada en valor.",
    },
    whenToUse: {
      en: "When you need to drive large-scale organizational change that affects multiple departments and requires sustained effort over 6-18 months.",
      es: "Cuando necesite impulsar cambio organizacional a gran escala que afecta múltiples departamentos.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://www.kotterinc.com/methodology/8-steps/",
    sourceOrg: "Kotter Inc.",
  },
  {
    id: "adkar-model",
    name: { en: "ADKAR Change Model", es: "Modelo de Cambio ADKAR" },
    category: "change-management",
    author: "Prosci / Jeff Hiatt",
    icon: "UserCheck",
    tagline: {
      en: "Change one person at a time",
      es: "Cambie una persona a la vez",
    },
    description: {
      en: "Individual-level change framework. While Kotter focuses on organizational steps, ADKAR focuses on each person's journey through change. Useful for frontline staff adoption of new workflows.",
      es: "Marco de cambio a nivel individual. Mientras Kotter se enfoca en pasos organizacionales, ADKAR se enfoca en el viaje de cada persona a través del cambio.",
    },
    steps: [
      { name: { en: "Awareness", es: "Conciencia" }, description: { en: "Does the person understand WHY the change is happening? Share the 'why' before the 'what' — funding cuts, patient impact, competitive pressure", es: "¿La persona entiende POR QUÉ está sucediendo el cambio?" } },
      { name: { en: "Desire", es: "Deseo" }, description: { en: "Does the person WANT to participate? Connect the change to what they care about — better patient outcomes, job security, professional growth", es: "¿La persona QUIERE participar? Conecte el cambio con lo que les importa" } },
      { name: { en: "Knowledge", es: "Conocimiento" }, description: { en: "Does the person know HOW to change? Provide training, job aids, mentoring. Don't expect people to figure it out", es: "¿La persona sabe CÓMO cambiar? Proporcione capacitación, guías, mentoría" } },
      { name: { en: "Ability", es: "Habilidad" }, description: { en: "Can the person actually DO it in their daily work? Allow practice time, reduce competing demands, provide coaching", es: "¿La persona puede HACERLO en su trabajo diario?" } },
      { name: { en: "Reinforcement", es: "Refuerzo" }, description: { en: "Will the person STICK with the change? Celebrate success, adjust performance metrics, remove old systems", es: "¿La persona MANTENDRÁ el cambio? Celebre el éxito, ajuste métricas" } },
    ],
    fqhcApplication: {
      en: "Use when rolling out new EHR features, changing clinical workflows (e.g., adding AI ambient documentation), or cross-training staff on new billing codes. Assess each team member on the ADKAR scale — the first gap is where to focus your effort.",
      es: "Úselo al implementar nuevas funciones de EHR, cambiar flujos de trabajo clínicos, o capacitar personal en nuevos códigos de facturación.",
    },
    whenToUse: {
      en: "When change resistance comes from individuals rather than organizational barriers. When you need to bring frontline staff along on a transition.",
      es: "Cuando la resistencia al cambio viene de individuos. Cuando necesita que el personal de primera línea adopte una transición.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://www.prosci.com/methodology/adkar",
    sourceOrg: "Prosci",
  },
  {
    id: "bridges-transition",
    name: { en: "Bridges' Transition Model", es: "Modelo de Transición de Bridges" },
    category: "change-management",
    author: "William Bridges",
    icon: "ArrowRightLeft",
    tagline: {
      en: "Change is external — transition is internal",
      es: "El cambio es externo — la transición es interna",
    },
    description: {
      en: "Change happens TO people, but transition happens INSIDE them. This model acknowledges the emotional journey of change — especially important in healthcare where staff are already dealing with compassion fatigue and burnout.",
      es: "El cambio le sucede A las personas, pero la transición sucede DENTRO de ellas. Este modelo reconoce el viaje emocional del cambio.",
    },
    steps: [
      { name: { en: "Ending (Letting Go)", es: "Fin (Dejar Ir)" }, description: { en: "People need to grieve what they're losing — old workflows, familiar systems, team structures. Acknowledge the loss. Don't rush past it.", es: "Las personas necesitan llorar lo que pierden — flujos antiguos, sistemas familiares. Reconozca la pérdida." } },
      { name: { en: "Neutral Zone", es: "Zona Neutral" }, description: { en: "The uncomfortable in-between where the old way is gone but the new way isn't working yet. This is where most changes fail. Provide extra support and clear milestones.", es: "El incómodo intermedio donde lo viejo se fue pero lo nuevo aún no funciona. Proporcione apoyo extra." } },
      { name: { en: "New Beginning", es: "Nuevo Comienzo" }, description: { en: "People embrace the new way when they can see it working, feel competent, and find new purpose. Celebrate the arrival. Connect it back to the mission.", es: "Las personas abrazan lo nuevo cuando lo ven funcionar y se sienten competentes." } },
    ],
    fqhcApplication: {
      en: "Essential after layoffs, mergers, or major restructuring. When a neighboring FQHC closes and your clinic absorbs their patients and staff, use this model to help both teams through the emotional transition. Also crucial when implementing automation that replaces manual workflows — staff need time to grieve the old way before embracing the new.",
      es: "Esencial después de despidos, fusiones o reestructuración importante. Cuando un FQHC vecino cierra y tu clínica absorbe sus pacientes y personal.",
    },
    whenToUse: {
      en: "When people are struggling emotionally with change, even when the change is objectively positive. When staff say 'it was better before' or show signs of disengagement.",
      es: "Cuando las personas luchan emocionalmente con el cambio, incluso cuando es objetivamente positivo.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://wmbridges.com/about/what-is-transition/",
    sourceOrg: "William Bridges Associates",
  },

  /* ---- DECISION MAKING ---- */
  {
    id: "cynefin-framework",
    name: { en: "Cynefin Framework", es: "Marco Cynefin" },
    category: "decision-making",
    author: "Dave Snowden",
    icon: "Grid3x3",
    tagline: {
      en: "Match your response to the situation's complexity",
      es: "Adapte su respuesta a la complejidad de la situación",
    },
    description: {
      en: "A sense-making framework that helps leaders choose the right approach based on how complex or chaotic the situation is. Not all problems need the same tools.",
      es: "Un marco de creación de sentido que ayuda a líderes a elegir el enfoque correcto basado en la complejidad de la situación.",
    },
    steps: [
      { name: { en: "Clear (Simple)", es: "Claro (Simple)" }, description: { en: "Cause and effect is obvious. Best practice exists. Example: patient check-in workflow, supply ordering. Response: Sense → Categorize → Respond", es: "Causa y efecto es obvio. Ejemplo: flujo de registro de pacientes. Respuesta: Percibir → Categorizar → Responder" } },
      { name: { en: "Complicated", es: "Complicado" }, description: { en: "Cause and effect requires analysis/expertise. Example: optimizing 340B pharmacy program, PPS rate negotiations. Response: Sense → Analyze → Respond", es: "Causa y efecto requiere análisis. Ejemplo: optimizar programa 340B. Respuesta: Percibir → Analizar → Responder" } },
      { name: { en: "Complex", es: "Complejo" }, description: { en: "Cause and effect only visible in retrospect. Example: workforce retention during crisis, VBP transition. Response: Probe → Sense → Respond (experiment first)", es: "Causa y efecto solo visible en retrospectiva. Ejemplo: retención de personal. Respuesta: Sondear → Percibir → Responder" } },
      { name: { en: "Chaotic", es: "Caótico" }, description: { en: "No discernible cause and effect. Example: sudden federal funding cut, mass layoff at neighboring FQHC. Response: Act → Sense → Respond (stabilize first, analyze later)", es: "Sin causa y efecto discernible. Ejemplo: corte repentino de fondos. Respuesta: Actuar → Percibir → Responder" } },
    ],
    fqhcApplication: {
      en: "Use when determining your response to challenges. H.R. 1 uncertainty is Complex (experiment with pilots); a WARN Act layoff at a neighboring clinic is Chaotic (act immediately to absorb displaced workers); 340B optimization is Complicated (get expert analysis). Matching your response to the domain prevents overthinking simple problems and under-analyzing complex ones.",
      es: "Use al determinar su respuesta a desafíos. La incertidumbre de H.R. 1 es Compleja; un despido WARN Act es Caótico; la optimización 340B es Complicada.",
    },
    whenToUse: {
      en: "When facing a new challenge and unsure whether to follow best practices, consult experts, run experiments, or take immediate action.",
      es: "Cuando enfrenta un nuevo desafío y no está seguro de si seguir mejores prácticas, consultar expertos, o actuar de inmediato.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://thecynefin.co/about-us/about-cynefin-framework/",
    sourceOrg: "Cynefin Co.",
  },
  {
    id: "eisenhower-matrix",
    name: { en: "Eisenhower Matrix", es: "Matriz de Eisenhower" },
    category: "decision-making",
    author: "Dwight D. Eisenhower",
    icon: "LayoutGrid",
    tagline: {
      en: "Urgent vs. important — stop confusing them",
      es: "Urgente vs. importante — deje de confundirlos",
    },
    description: {
      en: "A simple 2×2 grid that separates urgency from importance. Most healthcare workers spend all day in 'urgent + important' and never get to 'important but not urgent' — which is where strategy lives.",
      es: "Una cuadrícula 2×2 simple que separa urgencia de importancia.",
    },
    steps: [
      { name: { en: "Do (Urgent + Important)", es: "Hacer (Urgente + Importante)" }, description: { en: "Patient emergencies, compliance deadlines, WARN Act responses, payroll. Handle immediately.", es: "Emergencias de pacientes, plazos de cumplimiento. Manejar inmediatamente." } },
      { name: { en: "Schedule (Not Urgent + Important)", es: "Programar (No Urgente + Importante)" }, description: { en: "Strategic planning, staff development, VBP transition, 340B optimization, relationship building. This quadrant drives long-term success — block time for it.", es: "Planificación estratégica, desarrollo de personal, transición VBP. Este cuadrante impulsa el éxito a largo plazo." } },
      { name: { en: "Delegate (Urgent + Not Important)", es: "Delegar (Urgente + No Importante)" }, description: { en: "Most emails, routine approvals, meeting scheduling, data entry. Train others to handle these.", es: "La mayoría de emails, aprobaciones rutinarias. Entrene a otros para manejar estos." } },
      { name: { en: "Eliminate (Not Urgent + Not Important)", es: "Eliminar (No Urgente + No Importante)" }, description: { en: "Unnecessary meetings, reports nobody reads, outdated processes. Stop doing these.", es: "Reuniones innecesarias, reportes que nadie lee. Deje de hacer estos." } },
    ],
    fqhcApplication: {
      en: "Share with all managers. Most FQHC leaders are stuck in the 'Do' quadrant — reacting to daily crises. The 'Schedule' quadrant is where revenue diversification, AI implementation, and workforce strategy live. Block 2 hours every week for Quadrant 2 work.",
      es: "Comparta con todos los gerentes. La mayoría de líderes de FQHCs están atrapados en el cuadrante 'Hacer' — reaccionando a crisis diarias.",
    },
    whenToUse: {
      en: "Daily — for personal time management and for helping teams prioritize when everything feels urgent.",
      es: "Diariamente — para gestión del tiempo personal y para ayudar a equipos a priorizar.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://untools.co/eisenhower-matrix/",
    sourceOrg: "untools.co",
  },
  {
    id: "ooda-loop",
    name: { en: "OODA Loop", es: "Bucle OODA" },
    category: "decision-making",
    author: "John Boyd",
    icon: "RotateCcw",
    tagline: {
      en: "Observe, orient, decide, act — faster than the competition",
      es: "Observar, orientar, decidir, actuar — más rápido que la competencia",
    },
    description: {
      en: "A rapid decision-making loop developed for military strategy. In healthcare, it's how you respond to rapidly changing policy, competitive threats, and crisis situations faster than other organizations.",
      es: "Un bucle de toma de decisiones rápido. En salud, es cómo responder a políticas cambiantes, amenazas competitivas y crisis más rápido que otras organizaciones.",
    },
    steps: [
      { name: { en: "Observe", es: "Observar" }, description: { en: "Gather data: Intelligence Dashboard alerts, WARN Act filings, policy changes, competitor moves, patient volume trends", es: "Recopilar datos: alertas del Dashboard de Inteligencia, archivos WARN Act, cambios de política" } },
      { name: { en: "Orient", es: "Orientar" }, description: { en: "Analyze what the data means for YOUR FQHC: which patients are at risk, which revenue streams are threatened, what opportunities emerge", es: "Analizar qué significan los datos para SU FQHC: qué pacientes están en riesgo, qué oportunidades surgen" } },
      { name: { en: "Decide", es: "Decidir" }, description: { en: "Choose a course of action: expand ECM, hire displaced workers from closing clinic, launch 340B pharmacy, implement AI documentation", es: "Elegir un curso de acción: expandir ECM, contratar trabajadores desplazados, lanzar farmacia 340B" } },
      { name: { en: "Act", es: "Actuar" }, description: { en: "Execute immediately. Speed matters — the FQHC that acts first on a displaced workforce gets the best candidates", es: "Ejecutar inmediatamente. La velocidad importa — el FQHC que actúa primero obtiene los mejores candidatos" } },
    ],
    fqhcApplication: {
      en: "Use the Intelligence Dashboard as your 'Observe' input. When a layoff is announced at a neighboring FQHC, your OODA Loop should take hours, not weeks: Observe (WARN Act data) → Orient (what roles match our needs?) → Decide (activate recruitment) → Act (post jobs, attend job fair). Being faster than other FQHCs in recruiting displaced workers is a direct competitive advantage.",
      es: "Use el Dashboard de Inteligencia como su entrada de 'Observar'. Cuando se anuncian despidos en un FQHC vecino, su Bucle OODA debe tomar horas, no semanas.",
    },
    whenToUse: {
      en: "When facing time-sensitive decisions with competitive dynamics — hiring, patient acquisition from closing clinics, responding to policy changes.",
      es: "Cuando enfrenta decisiones sensibles al tiempo con dinámicas competitivas.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://untools.co/ooda-loop/",
    sourceOrg: "untools.co",
  },

  /* ---- WORKFORCE PLANNING ---- */
  {
    id: "stars-model",
    name: { en: "STARS Situational Model", es: "Modelo Situacional STARS" },
    category: "workforce-planning",
    author: "Michael Watkins",
    icon: "Star",
    tagline: {
      en: "Different situations need different leadership",
      es: "Diferentes situaciones necesitan diferente liderazgo",
    },
    description: {
      en: "From 'The First 90 Days.' Every leadership situation falls into one of five types, and each requires a fundamentally different approach. Using the wrong approach in the wrong situation is the #1 cause of leadership failure.",
      es: "De 'Los Primeros 90 Días.' Cada situación de liderazgo cae en uno de cinco tipos, y cada uno requiere un enfoque fundamentalmente diferente.",
    },
    steps: [
      { name: { en: "Start-up", es: "Arranque" }, description: { en: "Building something new: new ECM program, new clinic site, new service line. Focus: assembling team, building infrastructure, quick wins", es: "Construir algo nuevo: programa ECM, nuevo sitio de clínica. Enfoque: armar equipo, construir infraestructura" } },
      { name: { en: "Turnaround", es: "Reestructuración" }, description: { en: "Saving something in trouble: failing clinic, declining revenue, quality issues. Focus: triage, cut losses, motivate demoralized team", es: "Salvar algo en problemas: clínica en declive, problemas de calidad. Enfoque: triage, cortar pérdidas" } },
      { name: { en: "Accelerated Growth", es: "Crecimiento Acelerado" }, description: { en: "Scaling what works: expanding 340B, growing patient panel, adding sites. Focus: building systems that scale, hiring ahead of demand", es: "Escalar lo que funciona: expandir 340B, crecer panel de pacientes. Enfoque: construir sistemas escalables" } },
      { name: { en: "Realignment", es: "Realineación" }, description: { en: "Redirecting from complacency: successful FQHC that needs to prepare for coming threats. Focus: creating urgency without demoralizing, building new capabilities while maintaining current success", es: "Redirigir desde la complacencia. Enfoque: crear urgencia sin desmoralizar" } },
      { name: { en: "Sustaining Success", es: "Mantener Éxito" }, description: { en: "Maintaining and improving an already strong organization. Focus: continuous improvement, talent development, innovation. The hardest because there's no crisis forcing change", es: "Mantener y mejorar una organización ya fuerte. El más difícil porque no hay crisis forzando cambio" } },
    ],
    fqhcApplication: {
      en: "Most FQHCs in 2026 are in 'Realignment' or 'Turnaround' — facing federal funding threats while still serving patients. Identify your situation honestly, then match your leadership approach. Share with new managers through our Career Assessment's STARS diagnosis.",
      es: "La mayoría de FQHCs en 2026 están en 'Realineación' o 'Reestructuración.' Identifique su situación honestamente.",
    },
    whenToUse: {
      en: "When onboarding new leaders, promoting managers, or assessing your current organizational situation. Include in your leadership development program.",
      es: "Al incorporar nuevos líderes, promover gerentes, o evaluar la situación organizacional actual.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://hbr.org/2009/01/picking-the-right-transition-strategy",
    sourceOrg: "Harvard Business Review",
  },
  {
    id: "foglamp-onboarding",
    name: { en: "FOGLAMP Onboarding Checklist", es: "Lista de Verificación FOGLAMP" },
    category: "workforce-planning",
    author: "Michael Watkins",
    icon: "Lightbulb",
    tagline: {
      en: "The 7 things every new hire needs to learn",
      es: "Las 7 cosas que cada nuevo empleado necesita aprender",
    },
    description: {
      en: "A structured onboarding checklist ensuring new employees understand the fundamentals. Critical for FQHCs onboarding healthcare workers who may not know how community health centers operate.",
      es: "Una lista de verificación estructurada de incorporación asegurando que los nuevos empleados entienden los fundamentos.",
    },
    steps: [
      { name: { en: "F — Figures", es: "F — Cifras" }, description: { en: "Share the numbers: patient panel size, revenue breakdown, PPS rate, visit targets, UDS quality scores. New hires should understand the business of healthcare.", es: "Comparta los números: tamaño del panel de pacientes, desglose de ingresos, tarifa PPS, metas de visitas" } },
      { name: { en: "O — Organization", es: "O — Organización" }, description: { en: "Org chart, reporting lines, who does what. How your FQHC is structured: clinical ops, finance, programs, admin. Where does this role fit?", es: "Organigrama, líneas de reporte, quién hace qué. Cómo está estructurado tu FQHC" } },
      { name: { en: "G — Goals", es: "G — Metas" }, description: { en: "The FQHC's OKRs, strategic priorities, and department goals. How does this person's role contribute to organizational goals?", es: "Los OKRs del FQHC, prioridades estratégicas y metas departamentales" } },
      { name: { en: "L — Landscape", es: "L — Panorama" }, description: { en: "The competitive and policy landscape: H.R. 1, CalAIM, SB 525, neighboring FQHCs, managed care plans. Share the Intelligence Dashboard.", es: "El panorama competitivo y de políticas: H.R. 1, CalAIM, SB 525" } },
      { name: { en: "A — Allies", es: "A — Aliados" }, description: { en: "Who to build relationships with: key providers, department leads, managed care contacts, community partners, union representatives", es: "Con quién construir relaciones: proveedores clave, líderes de departamento, contactos de atención administrada" } },
      { name: { en: "M — Milestones", es: "M — Hitos" }, description: { en: "30/60/90-day expectations. What does success look like in the first month, quarter, year? Use our First 90 Days framework.", es: "Expectativas de 30/60/90 días. ¿Cómo se ve el éxito en el primer mes, trimestre, año?" } },
      { name: { en: "P — Priorities", es: "P — Prioridades" }, description: { en: "The top 3 things to focus on right now. Not 10 things — three. What will move the needle most for this role?", es: "Las 3 cosas principales en las que enfocarse ahora. No 10 cosas — tres." } },
    ],
    fqhcApplication: {
      en: "Build this into every new hire's first week. Combine with Healthcare Economics explainers for the 'Figures' step. Share the Intelligence Dashboard for the 'Landscape' step. Use OKR Templates for the 'Goals' step. This creates a standardized onboarding that ensures every employee understands how your FQHC works.",
      es: "Integre esto en la primera semana de cada nuevo empleado. Combine con explicadores de Economía de Salud para el paso de 'Cifras.'",
    },
    whenToUse: {
      en: "Every new hire, every internal transfer, every promotion. Also useful for existing employees who need to understand the broader organizational context.",
      es: "Cada nuevo empleado, cada transferencia interna, cada promoción.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://hbr.org/2009/04/the-first-90-days-proven-strat",
    sourceOrg: "Harvard Business Review",
  },

  /* ---- OPERATIONAL EXCELLENCE ---- */
  {
    id: "dmaic-lean",
    name: { en: "DMAIC (Lean Six Sigma)", es: "DMAIC (Lean Six Sigma)" },
    category: "operational-excellence",
    author: "Motorola / GE",
    icon: "Gauge",
    tagline: {
      en: "Measure, improve, control — eliminate waste systematically",
      es: "Medir, mejorar, controlar — eliminar desperdicio sistemáticamente",
    },
    description: {
      en: "A data-driven quality improvement framework widely used in healthcare. Instead of guessing what to fix, you measure the problem, find the root cause, and verify the fix works.",
      es: "Un marco de mejora de calidad basado en datos ampliamente usado en salud.",
    },
    steps: [
      { name: { en: "Define", es: "Definir" }, description: { en: "State the problem clearly: 'Patient no-show rate is 28%' or 'Average time from referral to appointment is 14 days' or '340B capture rate is only 62%'", es: "Declare el problema claramente: 'La tasa de no-presentación es 28%'" } },
      { name: { en: "Measure", es: "Medir" }, description: { en: "Collect baseline data: how bad is the problem? When does it happen? Which clinics, which providers, which patient populations?", es: "Recopilar datos de línea base: ¿qué tan malo es el problema? ¿Cuándo sucede?" } },
      { name: { en: "Analyze", es: "Analizar" }, description: { en: "Find the root cause using 5 Whys, fishbone diagrams, or data analysis. Don't treat symptoms — find the disease", es: "Encontrar la causa raíz usando 5 Porqués, diagramas de espina de pescado" } },
      { name: { en: "Improve", es: "Mejorar" }, description: { en: "Design and test solutions: automated appointment reminders (→ reduce no-shows), same-day scheduling (→ reduce referral wait), AI-assisted coding (→ improve HCC capture)", es: "Diseñar y probar soluciones: recordatorios automáticos, programación del mismo día" } },
      { name: { en: "Control", es: "Controlar" }, description: { en: "Monitor the improvement to make sure it sticks. Create dashboards, SOPs, and ongoing audits. If it regresses, investigate why.", es: "Monitorear la mejora para asegurar que se mantiene. Crear dashboards, SOPs y auditorías" } },
    ],
    fqhcApplication: {
      en: "Apply to your biggest operational pain points: no-show rates, billing cycle times, 340B capture rates, claim denial rates, patient wait times. Pick ONE metric, run a DMAIC cycle in 4-6 weeks, then move to the next. This is how you systematically improve operations without overwhelm.",
      es: "Aplique a sus mayores puntos débiles operacionales: tasas de no-presentación, tiempos de ciclo de facturación, tasas de captura 340B.",
    },
    whenToUse: {
      en: "When you have a measurable operational problem that's costing revenue or hurting patient experience. When previous improvement efforts failed because they didn't address root causes.",
      es: "Cuando tiene un problema operacional medible que cuesta ingresos o afecta la experiencia del paciente.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://www.ihi.org/resources/Pages/HowtoImprove/ScienceofImprovementTestingChanges.aspx",
    sourceOrg: "Institute for Healthcare Improvement",
  },
  {
    id: "pdsa-cycle",
    name: { en: "PDSA Cycle (Plan-Do-Study-Act)", es: "Ciclo PDSA (Planificar-Hacer-Estudiar-Actuar)" },
    category: "operational-excellence",
    author: "W. Edwards Deming",
    icon: "RefreshCcw",
    tagline: {
      en: "Small tests of change, rapid learning",
      es: "Pequeñas pruebas de cambio, aprendizaje rápido",
    },
    description: {
      en: "Healthcare's most practical improvement tool. Instead of big launches, test small changes rapidly and learn from each cycle. Used by IHI (Institute for Healthcare Improvement) as the core improvement method.",
      es: "La herramienta de mejora más práctica de salud. En lugar de grandes lanzamientos, pruebe pequeños cambios rápidamente.",
    },
    steps: [
      { name: { en: "Plan", es: "Planificar" }, description: { en: "What change are we testing? With how many patients? For how long? What data will we collect? Prediction: what do we expect to happen?", es: "¿Qué cambio estamos probando? ¿Con cuántos pacientes? ¿Qué datos recopilaremos?" } },
      { name: { en: "Do", es: "Hacer" }, description: { en: "Run the test on a small scale: one provider, one day, five patients. Document what actually happens, including problems and surprises.", es: "Ejecutar la prueba a pequeña escala: un proveedor, un día, cinco pacientes" } },
      { name: { en: "Study", es: "Estudiar" }, description: { en: "Compare results to prediction. What worked? What didn't? Was the change an improvement? Was our prediction correct?", es: "Comparar resultados con predicción. ¿Qué funcionó? ¿Qué no?" } },
      { name: { en: "Act", es: "Actuar" }, description: { en: "Based on results: adopt (it works — spread it), adapt (modify and test again), or abandon (it didn't work — try something else)", es: "Basado en resultados: adoptar, adaptar o abandonar" } },
    ],
    fqhcApplication: {
      en: "Perfect for testing AI documentation tools, new scheduling approaches, CHW workflow changes, or patient engagement strategies. Example: test ambient AI documentation with 1 provider for 1 week, measure time saved and documentation quality, then decide whether to expand. Low risk, high learning.",
      es: "Perfecto para probar herramientas de documentación AI, nuevos enfoques de programación. Bajo riesgo, alto aprendizaje.",
    },
    whenToUse: {
      en: "Before any significant operational change. When you're not sure if something will work. When staff are resistant to change — small tests feel safer than big launches.",
      es: "Antes de cualquier cambio operacional significativo. Cuando no está seguro si algo funcionará.",
    },
    shareableLevel: "all-staff",
    sourceUrl: "https://www.ihi.org/resources/tools/plan-do-study-act-pdsa-worksheet",
    sourceOrg: "Institute for Healthcare Improvement",
  },

  /* ---- STRATEGIC ANALYSIS ---- */
  {
    id: "rumelt-good-strategy",
    name: { en: "Rumelt's Good Strategy Kernel", es: "Núcleo de Buena Estrategia de Rumelt" },
    category: "strategic-analysis",
    author: "Richard Rumelt",
    icon: "Zap",
    tagline: {
      en: "Diagnose → Guiding Policy → Coherent Actions",
      es: "Diagnosticar → Política Guía → Acciones Coherentes",
    },
    description: {
      en: "The foundation of this platform's strategic approach. Good strategy is not goals, aspirations, or buzzwords. It's an honest diagnosis of the challenge, a guiding policy for addressing it, and a set of coherent actions that work together.",
      es: "La base del enfoque estratégico de esta plataforma. La buena estrategia no son metas, aspiraciones o palabras de moda.",
    },
    steps: [
      { name: { en: "Diagnose the Challenge", es: "Diagnosticar el Desafío" }, description: { en: "What is the actual problem? Not 'we need more funding' but 'we are 62% dependent on federal grants that face a 40% cut probability over 24 months'", es: "¿Cuál es el problema real? No 'necesitamos más fondos' sino datos específicos sobre dependencia y riesgo" } },
      { name: { en: "Set Guiding Policy", es: "Establecer Política Guía" }, description: { en: "The overall approach — not a goal, but a decision. 'We will diversify to <30% federal dependency through 340B expansion and ECM enrollment' — this rules out alternatives and focuses effort", es: "El enfoque general — no una meta, sino una decisión que descarta alternativas y enfoca esfuerzo" } },
      { name: { en: "Design Coherent Actions", es: "Diseñar Acciones Coherentes" }, description: { en: "Actions that reinforce each other: launch in-house pharmacy (340B revenue), hire pharmacist + CHWs (pharmacy operations + ECM enrollment), implement AI documentation (free provider time for higher-value visits)", es: "Acciones que se refuerzan mutuamente: lanzar farmacia interna, contratar farmacéutico + CHWs, implementar documentación AI" } },
    ],
    fqhcApplication: {
      en: "This is the framework we use throughout the platform. Every case study is structured this way. Every OKR template traces back to this logic. Use it for your annual strategic planning: diagnose your top 3 challenges, set a guiding policy for each, then design coherent actions that reinforce each other.",
      es: "Este es el marco que usamos en toda la plataforma. Cada estudio de caso está estructurado de esta manera.",
    },
    whenToUse: {
      en: "Annual strategic planning, board presentations, grant applications, and any time you need to explain 'why are we doing this and how does it all fit together?'",
      es: "Planificación estratégica anual, presentaciones de junta, solicitudes de subvención.",
    },
    shareableLevel: "executives",
    sourceUrl: "https://www.amazon.com/Good-Strategy-Bad-Difference-Matters/dp/0307886239",
    sourceOrg: "Crown Business (book)",
  },
  {
    id: "swot-pestel",
    name: { en: "SWOT + PESTEL Analysis", es: "Análisis SWOT + PESTEL" },
    category: "strategic-analysis",
    author: "Albert Humphrey / Francis Aguilar",
    icon: "Search",
    tagline: {
      en: "Internal strengths/weaknesses + external forces",
      es: "Fortalezas/debilidades internas + fuerzas externas",
    },
    description: {
      en: "SWOT maps internal strengths and weaknesses against external opportunities and threats. PESTEL scans six external forces: Political, Economic, Social, Technological, Environmental, Legal. Combined, they give a complete strategic picture.",
      es: "SWOT mapea fortalezas y debilidades internas contra oportunidades y amenazas externas. PESTEL escanea seis fuerzas externas.",
    },
    steps: [
      { name: { en: "Strengths (Internal)", es: "Fortalezas (Interno)" }, description: { en: "Your FQHC's advantages: strong 340B program, low turnover, good UDS scores, bilingual staff, established community trust, EHR capabilities", es: "Ventajas de su FQHC: programa 340B fuerte, baja rotación, buenos puntajes UDS" } },
      { name: { en: "Weaknesses (Internal)", es: "Debilidades (Interno)" }, description: { en: "Your gaps: high federal dependency, outdated EHR, provider burnout, limited data analytics, siloed departments, deferred maintenance", es: "Sus brechas: alta dependencia federal, EHR obsoleto, agotamiento de proveedores" } },
      { name: { en: "Opportunities (External)", es: "Oportunidades (Externo)" }, description: { en: "CalAIM ECM/CS expansion, Medi-Cal undocumented coverage, AI tools, displaced workers from closing clinics, VBP shared savings, 340B pharmacy", es: "Expansión de ECM/CS de CalAIM, cobertura Medi-Cal para indocumentados, herramientas AI" } },
      { name: { en: "Threats (External)", es: "Amenazas (Externo)" }, description: { en: "H.R. 1 Medicaid cuts, CHCF authorization cliff, 340B restrictions, SB 525 wage increases, competing systems acquiring FQHCs, AI displacing roles", es: "Recortes de Medicaid H.R. 1, acantilado de autorización CHCF, restricciones 340B" } },
      { name: { en: "PESTEL Scan", es: "Escaneo PESTEL" }, description: { en: "P: H.R. 1, CalAIM | E: inflation, SB 525 | S: immigration policy, aging population | T: AI, telehealth | E: wildfire displacement, housing crisis | L: 340B litigation, Medicaid verification rules", es: "P: H.R. 1, CalAIM | E: inflación, SB 525 | S: política migratoria | T: AI, telesalud | L: litigación 340B" } },
    ],
    fqhcApplication: {
      en: "Run this analysis quarterly using data from the Intelligence Dashboard. The PESTEL categories map directly to our intel categories (legislation, funding, workforce, undocumented-access). Present results to your board to justify strategic investments.",
      es: "Ejecute este análisis trimestralmente usando datos del Dashboard de Inteligencia.",
    },
    whenToUse: {
      en: "Quarterly strategic reviews, board presentations, grant renewal applications, annual planning retreats.",
      es: "Revisiones estratégicas trimestrales, presentaciones de junta, solicitudes de renovación de subvención.",
    },
    shareableLevel: "executives",
    sourceUrl: "https://untools.co/swot-analysis/",
    sourceOrg: "untools.co",
  },

  /* ---- ASSESSMENT TOOLS ---- */
  {
    id: "readiness-assessment",
    name: { en: "Organizational Change Readiness Assessment", es: "Evaluación de Preparación para Cambio Organizacional" },
    category: "assessment-tools",
    author: "FQHC Talent Exchange",
    icon: "ClipboardCheck",
    tagline: {
      en: "Is your organization ready for this change?",
      es: "¿Su organización está lista para este cambio?",
    },
    description: {
      en: "A structured self-assessment to evaluate whether your FQHC is ready for a major change initiative. Score yourself on 6 dimensions to identify where to invest before launching.",
      es: "Una autoevaluación estructurada para evaluar si su FQHC está listo para una iniciativa de cambio importante.",
    },
    steps: [
      { name: { en: "Leadership Alignment", es: "Alineación de Liderazgo" }, description: { en: "Rate 1-5: Do C-suite and department heads agree on the need for change, the approach, and the timeline? (5 = complete alignment)", es: "Califique 1-5: ¿C-suite y jefes de departamento están de acuerdo sobre la necesidad, enfoque y cronograma?" } },
      { name: { en: "Staff Capacity", es: "Capacidad del Personal" }, description: { en: "Rate 1-5: Does your staff have the bandwidth and skills for this change? Or are they already maxed out on daily operations?", es: "Califique 1-5: ¿Su personal tiene el ancho de banda y habilidades para este cambio?" } },
      { name: { en: "Financial Resources", es: "Recursos Financieros" }, description: { en: "Rate 1-5: Can you fund the change? Do you have budget for training, technology, temporary staff, or consultants?", es: "Califique 1-5: ¿Puede financiar el cambio? ¿Tiene presupuesto para capacitación, tecnología?" } },
      { name: { en: "Technology Infrastructure", es: "Infraestructura Tecnológica" }, description: { en: "Rate 1-5: Does your EHR/IT infrastructure support the change? Can you collect the data you need to measure success?", es: "Califique 1-5: ¿Su infraestructura EHR/IT soporta el cambio?" } },
      { name: { en: "Change History", es: "Historial de Cambio" }, description: { en: "Rate 1-5: Has your organization successfully implemented changes recently? (5 = strong track record of successful change)", es: "Califique 1-5: ¿Su organización ha implementado cambios exitosamente recientemente?" } },
      { name: { en: "Stakeholder Support", es: "Apoyo de Partes Interesadas" }, description: { en: "Rate 1-5: Do patients, community partners, board members, and unions support this change? (5 = broad stakeholder buy-in)", es: "Califique 1-5: ¿Pacientes, socios comunitarios, junta directiva y sindicatos apoyan este cambio?" } },
    ],
    fqhcApplication: {
      en: "Run this before any major initiative: ECM launch, AI implementation, 340B pharmacy, VBP transition, merger/acquisition. Score ≥24/30 = proceed with confidence. Score 18-23 = address gaps first. Score <18 = not ready — build foundations before launching. Share results with leadership team to align on preparation steps.",
      es: "Ejecute esto antes de cualquier iniciativa importante. Puntaje ≥24/30 = proceder con confianza. Puntaje 18-23 = abordar brechas primero. Puntaje <18 = no listo.",
    },
    whenToUse: {
      en: "Before committing to any change initiative that requires significant organizational effort (>3 months, >$50K investment, or cross-department coordination).",
      es: "Antes de comprometerse con cualquier iniciativa de cambio que requiera esfuerzo organizacional significativo.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://www.prosci.com/resources/articles/change-readiness",
    sourceOrg: "Prosci",
  },
  {
    id: "tech-stack-assessment",
    name: { en: "FQHC Technology Readiness Assessment", es: "Evaluación de Preparación Tecnológica FQHC" },
    category: "assessment-tools",
    author: "FQHC Talent Exchange",
    icon: "Cpu",
    tagline: {
      en: "Evaluate your tech stack for the AI era",
      es: "Evalúe su pila tecnológica para la era de IA",
    },
    description: {
      en: "A self-assessment for evaluating your FQHC's technology infrastructure readiness — EHR capabilities, data analytics, interoperability, cybersecurity, and AI readiness. Essential for planning technology investments.",
      es: "Una autoevaluación para evaluar la preparación de infraestructura tecnológica de su FQHC.",
    },
    steps: [
      { name: { en: "EHR Maturity", es: "Madurez de EHR" }, description: { en: "Which EHR? (OCHIN Epic, NextGen/OSIS, eClinicalWorks, athenahealth, other). Are you using advanced features? Patient portal adoption? Clinical decision support? Analytics module?", es: "¿Qué EHR? ¿Está usando funciones avanzadas? ¿Adopción de portal de pacientes?" } },
      { name: { en: "Data & Analytics", es: "Datos y Analítica" }, description: { en: "Can you generate UDS reports on demand? Do you have population health dashboards? Risk stratification? Care gap identification? If not, you're flying blind.", es: "¿Puede generar reportes UDS bajo demanda? ¿Tiene dashboards de salud poblacional?" } },
      { name: { en: "Interoperability", es: "Interoperabilidad" }, description: { en: "Can your systems share data with managed care plans, hospitals, labs, pharmacies? HIE (Health Information Exchange) participation? HL7 FHIR readiness?", es: "¿Sus sistemas pueden compartir datos con planes de atención administrada, hospitales, laboratorios?" } },
      { name: { en: "Cybersecurity", es: "Ciberseguridad" }, description: { en: "MFA on all systems? Encrypted backups? HIPAA Security Rule compliance? Incident response plan? Cyber insurance? Staff phishing training?", es: "¿MFA en todos los sistemas? ¿Copias de seguridad encriptadas? ¿Cumplimiento de HIPAA?" } },
      { name: { en: "AI Readiness", es: "Preparación para IA" }, description: { en: "Are you evaluating AI tools? (Ambient documentation, coding assistance, scheduling optimization, patient outreach). Do you have a governance framework for AI use? Staff trained on AI workflows?", es: "¿Está evaluando herramientas de IA? ¿Tiene un marco de gobernanza para uso de IA?" } },
    ],
    fqhcApplication: {
      en: "Map your scores against the AI Tracker to identify which AI tools are appropriate for your current maturity level. FQHCs on OCHIN Epic are best positioned for ambient AI (Epic partnership with Microsoft). NextGen/OSIS users should evaluate NextGen Ambient Assist. All FQHCs should have a cybersecurity baseline before adding AI tools.",
      es: "Mapee sus puntajes contra el AI Tracker para identificar qué herramientas de IA son apropiadas para su nivel de madurez actual.",
    },
    whenToUse: {
      en: "Before any technology purchase, during annual IT planning, when responding to AI vendor pitches, or when preparing grant applications for technology investments.",
      es: "Antes de cualquier compra de tecnología, durante la planificación anual de TI.",
    },
    shareableLevel: "managers",
    sourceUrl: "https://www.healthit.gov/topic/health-it-and-health-information-exchange-basics",
    sourceOrg: "ONC HealthIT.gov",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getFrameworksByCategory(category: FrameworkCategory): ExecutionFramework[] {
  return executionFrameworks.filter((f) => f.category === category);
}

export function getFrameworkById(id: string): ExecutionFramework | undefined {
  return executionFrameworks.find((f) => f.id === id);
}

export function getFrameworksForAudience(level: "all-staff" | "managers" | "executives"): ExecutionFramework[] {
  if (level === "executives") return executionFrameworks;
  if (level === "managers") return executionFrameworks.filter((f) => f.shareableLevel !== "executives");
  return executionFrameworks.filter((f) => f.shareableLevel === "all-staff");
}
