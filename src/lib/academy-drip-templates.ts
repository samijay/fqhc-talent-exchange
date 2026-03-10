/* ------------------------------------------------------------------ */
/*  Academy Bite-Size Email Lessons ("Email Crumbs")                   */
/*  30-day drip: 1 concept + 1 mini quiz per email                   */
/*  CTA: "Continue this module on the site →"                        */
/*  Last updated: 2026-03-10                                          */
/* ------------------------------------------------------------------ */

const SITE = "https://www.fqhctalent.com";
const TEAL = "#0F766E";
const TEAL_LIGHT = "#F0FDFA";
const TEAL_BORDER = "#99F6E4";
const INDIGO = "#4338CA";
const INDIGO_LIGHT = "#EEF2FF";
const INDIGO_BORDER = "#C7D2FE";
const AMBER = "#F59E0B";
const AMBER_BG = "#FFFBEB";

/* ------------------------------------------------------------------ */
/*  Schedule: send one lesson every 2 days for 30 days (15 lessons)   */
/* ------------------------------------------------------------------ */

export const ACADEMY_DRIP_DAYS = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
] as const;

/* ------------------------------------------------------------------ */
/*  Lesson Content Model                                               */
/* ------------------------------------------------------------------ */

export interface AcademyDripLesson {
  day: number;
  subject: string;
  esSubject: string;
  concept: string;      // 1-2 paragraph concept text (EN)
  esConcept: string;    // Spanish version
  quizQuestion: string;
  esQuizQuestion: string;
  quizOptions: { text: string; esText: string; isCorrect: boolean }[];
  correctExplanation: string;
  esCorrectExplanation: string;
  ctaLink: string;      // Link to continue on site
  ctaText: string;
  esCtaText: string;
  /** Which course this lesson belongs to */
  courseId: string;
  moduleId: string;
}

/* ------------------------------------------------------------------ */
/*  Lesson Data                                                        */
/* ------------------------------------------------------------------ */

export const ACADEMY_DRIP_LESSONS: AcademyDripLesson[] = [
  // ── Lesson 1: PPS Basics ─────────────────────────────────────────
  {
    day: 2,
    subject: "How FQHCs Get Paid (It's Not What You Think)",
    esSubject: "Cómo Se Les Paga a los FQHCs (No Es Lo Que Piensas)",
    concept: "Unlike hospitals that bill per procedure, FQHCs receive a flat per-visit payment called the Prospective Payment System (PPS) rate. In California, this averages $225-$275 per visit — the same rate whether a visit lasts 15 minutes or 60 minutes, and whether 2 labs or 20 are ordered. This single fact shapes everything about how FQHCs operate.",
    esConcept: "A diferencia de los hospitales que facturan por procedimiento, los FQHCs reciben un pago fijo por visita llamado tarifa del Sistema de Pago Prospectivo (PPS). En California, esto promedia $225-$275 por visita — la misma tarifa sin importar si la visita dura 15 o 60 minutos.",
    quizQuestion: "Under PPS, what earns an FQHC more revenue?",
    esQuizQuestion: "Bajo PPS, ¿qué genera más ingresos para un FQHC?",
    quizOptions: [
      { text: "Ordering more labs and procedures per visit", esText: "Ordenar más laboratorios y procedimientos por visita", isCorrect: false },
      { text: "Seeing more patients per day", esText: "Ver más pacientes por día", isCorrect: true },
      { text: "Longer, more complex visits", esText: "Visitas más largas y complejas", isCorrect: false },
    ],
    correctExplanation: "Since PPS is a flat rate per visit, seeing more patients = more PPS encounters = more revenue. Volume matters more than complexity.",
    esCorrectExplanation: "Dado que el PPS es una tarifa fija por visita, ver más pacientes = más encuentros PPS = más ingresos.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Start the full Revenue 101 module →",
    esCtaText: "Comienza el módulo completo de Ingresos 101 →",
    courseId: "clinic-manager",
    moduleId: "cm-revenue-101",
  },

  // ── Lesson 2: Same-Day Billing ──────────────────────────────────
  {
    day: 4,
    subject: "The Same-Day Billing Rule Worth $500K/Year",
    esSubject: "La Regla de Facturación del Mismo Día que Vale $500K/Año",
    concept: "When a patient sees both a medical provider and a dentist on the same day at your FQHC, you can bill 2 separate PPS encounters — one for each service. This works for both Medi-Cal AND Medicare. For a clinic with integrated dental, this can add $500K-$1M in annual revenue. The key? Scheduling patients for same-day medical + dental visits and implementing 'warm handoffs' between departments.",
    esConcept: "Cuando un paciente ve tanto a un proveedor médico como a un dentista el mismo día en tu FQHC, puedes facturar 2 encuentros PPS separados — uno por cada servicio. Esto funciona tanto para Medi-Cal COMO para Medicare. Para una clínica con dental integrado, esto puede agregar $500K-$1M en ingresos anuales.",
    quizQuestion: "Same-day Medical + Dental billing works under which payers?",
    esQuizQuestion: "La facturación del mismo día Médica + Dental funciona bajo ¿cuáles pagadores?",
    quizOptions: [
      { text: "Medicare only", esText: "Solo Medicare", isCorrect: false },
      { text: "Medi-Cal only", esText: "Solo Medi-Cal", isCorrect: false },
      { text: "Both Medi-Cal and Medicare", esText: "Tanto Medi-Cal como Medicare", isCorrect: true },
    ],
    correctExplanation: "Medical + Dental same-day billing works under both payers. This is one of the most reliable dual-billing opportunities for FQHCs.",
    esCorrectExplanation: "La facturación del mismo día Médica + Dental funciona bajo ambos pagadores. Esta es una de las oportunidades más confiables de doble facturación.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Learn all the billing rules →",
    esCtaText: "Aprende todas las reglas de facturación →",
    courseId: "clinic-manager",
    moduleId: "cm-revenue-101",
  },

  // ── Lesson 3: MA Ratios ─────────────────────────────────────────
  {
    day: 6,
    subject: "The $239K ROI of Adding One MA",
    esSubject: "El ROI de $239K de Agregar Un MA",
    concept: "The most effective FQHCs use a 1.5:1 MA-to-provider ratio (3 MAs for every 2 providers). At this ratio, one MA rooms the next patient while the other assists the current provider — eliminating provider downtime. The math: Adding 1 MA at $42K salary enables a provider to see 5 more patients/day × $225 PPS × 250 working days = $281K additional revenue. Net gain: $239K per year.",
    esConcept: "Los FQHCs más efectivos usan un ratio de 1.5:1 de MA a proveedor (3 MAs por cada 2 proveedores). A este ratio, un MA prepara al siguiente paciente mientras el otro asiste al proveedor actual. Las matemáticas: Agregar 1 MA a $42K de salario permite que un proveedor vea 5 pacientes más/día × $225 PPS × 250 días = $281K de ingresos adicionales. Ganancia neta: $239K por año.",
    quizQuestion: "What is the recommended MA-to-provider ratio?",
    esQuizQuestion: "¿Cuál es el ratio recomendado de MA a proveedor?",
    quizOptions: [
      { text: "1:1 — one MA per provider", esText: "1:1 — un MA por proveedor", isCorrect: false },
      { text: "1.5:1 — three MAs per two providers", esText: "1.5:1 — tres MAs por cada dos proveedores", isCorrect: true },
      { text: "2:1 — two MAs per provider", esText: "2:1 — dos MAs por proveedor", isCorrect: false },
    ],
    correctExplanation: "1.5:1 is the sweet spot. The 'leapfrog' pattern eliminates provider downtime without creating MA idle time.",
    esCorrectExplanation: "1.5:1 es el punto óptimo. El patrón de 'salto de rana' elimina el tiempo muerto del proveedor sin crear tiempo inactivo del MA.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Master team design →",
    esCtaText: "Domina el diseño de equipos →",
    courseId: "clinic-manager",
    moduleId: "cm-team-care",
  },

  // ── Lesson 4: No-Shows ──────────────────────────────────────────
  {
    day: 8,
    subject: "Your No-Shows Are Costing $1M/Year",
    esSubject: "Tus Citas Perdidas Te Cuestan $1M/Año",
    concept: "The average FQHC no-show rate is 18-25%. For a mid-size clinic with 5 providers: 20% no-show × 90 daily slots = 18 empty slots × $225 PPS = $4,050 lost per day = $1,012,500 per year. The #1 fix? A two-touch reminder system (text 48 hours before + call 2 hours before) reduces no-shows by 30-40%. That's $300K-$400K recovered annually — for the cost of an SMS service.",
    esConcept: "La tasa promedio de citas perdidas en FQHCs es 18-25%. Para una clínica mediana con 5 proveedores: 20% de citas perdidas × 90 espacios diarios = 18 vacíos × $225 PPS = $4,050 perdidos por día = $1,012,500 por año. La solución #1: Un sistema de recordatorio de dos contactos reduce las citas perdidas 30-40%.",
    quizQuestion: "What is the most cost-effective intervention for reducing no-shows?",
    esQuizQuestion: "¿Cuál es la intervención más rentable para reducir las citas perdidas?",
    quizOptions: [
      { text: "Charging cancellation fees", esText: "Cobrar tarifas de cancelación", isCorrect: false },
      { text: "Two-touch reminder (text + call)", esText: "Recordatorio de dos contactos (texto + llamada)", isCorrect: true },
      { text: "Requiring prepayment", esText: "Requerir pago anticipado", isCorrect: false },
    ],
    correctExplanation: "Two-touch reminders are the proven approach — they reduce no-shows 30-40% and cost almost nothing compared to the revenue recovered.",
    esCorrectExplanation: "Los recordatorios de dos contactos son el enfoque comprobado — reducen las citas perdidas 30-40% y cuestan casi nada comparado con los ingresos recuperados.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Learn scheduling strategies →",
    esCtaText: "Aprende estrategias de programación →",
    courseId: "clinic-manager",
    moduleId: "cm-scheduling",
  },

  // ── Lesson 5: Warm Handoffs ─────────────────────────────────────
  {
    day: 10,
    subject: "Warm Handoffs: 85% vs. 30% Follow-Through",
    esSubject: "Transferencias Directas: 85% vs. 30% de Seguimiento",
    concept: "When a primary care provider identifies a patient who needs behavioral health support, there are two approaches: traditional referral (schedule a separate appointment) or a warm handoff (walk the patient to the BH provider right now). Traditional referrals have only 30-40% follow-through. Warm handoffs? 85-90%. For a clinic seeing 100 patients/day, if 20% get a same-day warm handoff: 20 extra encounters × $225 PPS = $4,500/day = $1.125M/year in additional revenue.",
    esConcept: "Cuando un proveedor de atención primaria identifica a un paciente que necesita apoyo de salud mental, hay dos enfoques: referencia tradicional (programar una cita separada) o transferencia directa (llevar al paciente al proveedor de BH ahora). Las referencias tradicionales tienen solo 30-40% de seguimiento. ¿Las transferencias directas? 85-90%.",
    quizQuestion: "What is the follow-through rate for same-day warm handoffs?",
    esQuizQuestion: "¿Cuál es la tasa de seguimiento para transferencias directas del mismo día?",
    quizOptions: [
      { text: "About 50%", esText: "Aproximadamente 50%", isCorrect: false },
      { text: "85-90%", esText: "85-90%", isCorrect: true },
      { text: "About 60%", esText: "Aproximadamente 60%", isCorrect: false },
    ],
    correctExplanation: "Warm handoffs achieve 85-90% follow-through, compared to just 30-40% for traditional referrals. The immediacy makes all the difference.",
    esCorrectExplanation: "Las transferencias directas logran 85-90% de seguimiento, comparado con solo 30-40% para referencias tradicionales.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Master BH integration →",
    esCtaText: "Domina la integración de BH →",
    courseId: "clinic-manager",
    moduleId: "cm-integration",
  },

  // ── Lesson 6: ECM Revenue ───────────────────────────────────────
  {
    day: 12,
    subject: "ECM: $600K in Recurring Revenue You May Be Missing",
    esSubject: "ECM: $600K en Ingresos Recurrentes que Podrías Estar Perdiendo",
    concept: "Under California's CalAIM, FQHCs can earn Per Member Per Month (PMPM) payments for Enhanced Care Management — $150-$400/month per enrolled patient. This is recurring revenue that comes every month whether the patient visits or not. Example: 200 patients × $250 PMPM × 12 months = $600,000/year in predictable revenue, on top of regular PPS visit revenue for those same patients.",
    esConcept: "Bajo CalAIM de California, los FQHCs pueden ganar pagos Por Miembro Por Mes (PMPM) por Gestión de Atención Mejorada — $150-$400/mes por paciente inscrito. Estos son ingresos recurrentes que llegan cada mes sin importar si el paciente visita. Ejemplo: 200 pacientes × $250 PMPM × 12 meses = $600,000/año.",
    quizQuestion: "ECM PMPM payments are received...",
    esQuizQuestion: "Los pagos PMPM de ECM se reciben...",
    quizOptions: [
      { text: "Only when the patient visits", esText: "Solo cuando el paciente visita", isCorrect: false },
      { text: "Monthly, regardless of visits", esText: "Mensualmente, sin importar las visitas", isCorrect: true },
      { text: "Annually as a lump sum", esText: "Anualmente como suma global", isCorrect: false },
    ],
    correctExplanation: "PMPM is a monthly recurring payment — the most predictable revenue stream an FQHC can have.",
    esCorrectExplanation: "PMPM es un pago mensual recurrente — el flujo de ingresos más predecible que un FQHC puede tener.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Learn ECM operations →",
    esCtaText: "Aprende operaciones ECM →",
    courseId: "clinic-manager",
    moduleId: "cm-ecm-calaim",
  },

  // ── Lesson 7: SB 525 ───────────────────────────────────────────
  {
    day: 14,
    subject: "SB 525: The Wage Law That Will Reshape Your Budget",
    esSubject: "SB 525: La Ley Salarial que Reformará Tu Presupuesto",
    concept: "California's SB 525 is raising the healthcare minimum wage to $25/hour by 2027 (currently $23/hour in 2026). The bigger impact? Wage compression — when entry-level wages hit $25/hr, experienced MAs earning $24-26/hr expect raises too. Estimated total labor cost increase: 12-18% for a typical FQHC. Smart managers are building these adjustments into their 2026-2027 budgets NOW.",
    esConcept: "El SB 525 de California está aumentando el salario mínimo de salud a $25/hora para 2027 (actualmente $23/hora en 2026). ¿El impacto más grande? Compresión salarial — cuando los salarios de nivel de entrada llegan a $25/hr, los MAs experimentados que ganan $24-26/hr también esperan aumentos. Aumento estimado del costo laboral total: 12-18%.",
    quizQuestion: "What is 'wage compression' in the context of SB 525?",
    esQuizQuestion: "¿Qué es la 'compresión salarial' en el contexto de SB 525?",
    quizOptions: [
      { text: "Wages being cut due to budget constraints", esText: "Salarios siendo recortados por restricciones presupuestarias", isCorrect: false },
      { text: "The gap between new hire and experienced staff wages shrinking", esText: "La brecha entre salarios de nuevos empleados y personal experimentado reduciéndose", isCorrect: true },
      { text: "A temporary wage freeze", esText: "Un congelamiento temporal de salarios", isCorrect: false },
    ],
    correctExplanation: "Wage compression happens when minimum wage increases push entry-level pay close to experienced staff pay, requiring adjustments across all levels.",
    esCorrectExplanation: "La compresión salarial ocurre cuando los aumentos del salario mínimo empujan el pago de nivel de entrada cerca del pago del personal experimentado.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Plan your retention strategy →",
    esCtaText: "Planifica tu estrategia de retención →",
    courseId: "clinic-manager",
    moduleId: "cm-retention",
  },

  // ── Lesson 8: OKR Basics ────────────────────────────────────────
  {
    day: 16,
    subject: "OKRs for FQHCs: Goals That Actually Get Done",
    esSubject: "OKRs para FQHCs: Metas que Realmente Se Logran",
    concept: "OKRs (Objectives and Key Results) are a goal-setting framework used by Google, Intel, and increasingly by community health centers. An Objective is what you want to achieve (qualitative, inspiring). Key Results are how you measure it (quantitative, specific). Example: Objective: 'Eliminate preventable appointment no-shows' — KR1: Reduce no-show rate from 22% to 12%, KR2: Implement 2-touch reminder for 100% of appointments, KR3: Launch same-day scheduling for 20% of slots.",
    esConcept: "Los OKRs (Objetivos y Resultados Clave) son un marco de establecimiento de metas usado por Google, Intel, y cada vez más por centros de salud comunitarios. Un Objetivo es lo que quieres lograr (cualitativo, inspirador). Los Resultados Clave son cómo lo mides (cuantitativos, específicos).",
    quizQuestion: "In an OKR, what should a Key Result contain?",
    esQuizQuestion: "En un OKR, ¿qué debe contener un Resultado Clave?",
    quizOptions: [
      { text: "A list of tasks to complete", esText: "Una lista de tareas a completar", isCorrect: false },
      { text: "A measurable outcome with a specific number", esText: "Un resultado medible con un número específico", isCorrect: true },
      { text: "A general description of the goal", esText: "Una descripción general de la meta", isCorrect: false },
    ],
    correctExplanation: "Key Results must be measurable and specific — 'Reduce no-show rate from 22% to 12%' not 'Improve attendance.'",
    esCorrectExplanation: "Los Resultados Clave deben ser medibles y específicos — 'Reducir la tasa de citas perdidas de 22% a 12%' no 'Mejorar la asistencia.'",
    ctaLink: "/strategy/okr-course",
    ctaText: "Take the full OKR course →",
    esCtaText: "Toma el curso completo de OKR →",
    courseId: "okr-course",
    moduleId: "what-are-okrs",
  },

  // ── Lesson 9: Scope of Practice ─────────────────────────────────
  {
    day: 18,
    subject: "What Your MAs Can (and Absolutely Cannot) Do in California",
    esSubject: "Lo que Tus MAs Pueden (y Absolutamente No Pueden) Hacer en California",
    concept: "In California, MAs operate under BPC §2069. They CAN: take vitals, administer medications by provider order, perform simple lab draws, administer immunizations per protocol, perform EKGs. They CANNOT: triage patients, make clinical judgments, start IVs, interpret lab results, or provide patient education independently. The key distinction: MAs perform tasks, RNs make clinical judgments.",
    esConcept: "En California, los MAs operan bajo BPC §2069. PUEDEN: tomar signos vitales, administrar medicamentos por orden del proveedor, realizar extracciones de laboratorio simples, administrar inmunizaciones por protocolo, realizar EKGs. NO PUEDEN: hacer triaje, hacer juicios clínicos, iniciar IVs, interpretar resultados de laboratorio.",
    quizQuestion: "Which task is OUTSIDE an MA's scope in California?",
    esQuizQuestion: "¿Cuál tarea está FUERA del alcance de un MA en California?",
    quizOptions: [
      { text: "Administering an immunization per standing protocol", esText: "Administrar una inmunización por protocolo permanente", isCorrect: false },
      { text: "Determining if a patient's symptoms are urgent (triage)", esText: "Determinar si los síntomas de un paciente son urgentes (triaje)", isCorrect: true },
      { text: "Performing a venipuncture for lab work", esText: "Realizar una venopunción para trabajo de laboratorio", isCorrect: false },
    ],
    correctExplanation: "Triage requires clinical judgment — that's an RN or provider scope task. MAs perform directed tasks, not assessments.",
    esCorrectExplanation: "El triaje requiere juicio clínico — esa es una tarea del alcance del RN o proveedor.",
    ctaLink: "/strategy/scope-of-practice",
    ctaText: "View the full scope matrix →",
    esCtaText: "Ver la matriz completa de alcance →",
    courseId: "clinic-manager",
    moduleId: "cm-team-care",
  },

  // ── Lesson 10: Career Ladders ───────────────────────────────────
  {
    day: 20,
    subject: "Career Ladders: Retention's Secret Weapon",
    esSubject: "Escalas de Carrera: El Arma Secreta de la Retención",
    concept: "The #1 reason FQHC staff leave: 'I don't see a future here.' The fix? Career ladders. MA ladder: Entry MA ($38-42K) → Senior MA ($42-48K) → MA Supervisor ($48-55K) → Practice Manager ($55-70K). The cost comparison: Career ladder annual cost ~$3-5K per employee in raises. Cost to replace one MA: $15-20K. Cost to replace one provider: $80-150K. Every role should have a visible 'next step' that doesn't require leaving.",
    esConcept: "La razón #1 por la que el personal de FQHC se va: 'No veo un futuro aquí.' La solución: Escalas de carrera. Escala de MA: MA de Entrada ($38-42K) → MA Senior ($42-48K) → Supervisor de MA ($48-55K) → Gerente de Práctica ($55-70K). Comparación: Costo anual de escala ~$3-5K por empleado. Costo de reemplazo de un MA: $15-20K.",
    quizQuestion: "What does it typically cost to replace one MA at an FQHC?",
    esQuizQuestion: "¿Cuánto cuesta típicamente reemplazar un MA en un FQHC?",
    quizOptions: [
      { text: "$3-5K", esText: "$3-5K", isCorrect: false },
      { text: "$15-20K", esText: "$15-20K", isCorrect: true },
      { text: "$50-75K", esText: "$50-75K", isCorrect: false },
    ],
    correctExplanation: "MA replacement costs $15-20K (recruiting, training, lost productivity) — far more than the $3-5K annual cost of career ladder raises.",
    esCorrectExplanation: "El reemplazo de un MA cuesta $15-20K (reclutamiento, capacitación, productividad perdida) — mucho más que el costo anual de $3-5K de aumentos en escalas de carrera.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Build your retention strategy →",
    esCtaText: "Construye tu estrategia de retención →",
    courseId: "clinic-manager",
    moduleId: "cm-retention",
  },

  // ── Lesson 11: APM Enrollment ───────────────────────────────────
  {
    day: 22,
    subject: "APM: Unlock $500K-$2M in Hidden Revenue",
    esSubject: "APM: Desbloquea $500K-$2M en Ingresos Ocultos",
    concept: "If your FQHC has behavioral health providers but hasn't enrolled in the Alternative Payment Methodology (APM) with DHCS, you're leaving money on the table. Without APM, same-day medical + BH visits only bill 1 PPS under Medi-Cal. WITH APM, you bill 2 PPS — doubling the revenue for those visits. For a mid-size FQHC, this can mean $500K-$2M in additional annual revenue.",
    esConcept: "Si tu FQHC tiene proveedores de salud mental pero no se ha inscrito en la Metodología de Pago Alternativa (APM) con DHCS, estás dejando dinero sobre la mesa. Sin APM, las visitas de médico + BH del mismo día solo facturan 1 PPS bajo Medi-Cal. CON APM, facturas 2 PPS.",
    quizQuestion: "What does APM enrollment unlock for Medi-Cal billing?",
    esQuizQuestion: "¿Qué desbloquea la inscripción APM para la facturación de Medi-Cal?",
    quizOptions: [
      { text: "Higher PPS rates for all visits", esText: "Tarifas PPS más altas para todas las visitas", isCorrect: false },
      { text: "Same-day medical + BH dual billing under Medi-Cal", esText: "Doble facturación médica + BH del mismo día bajo Medi-Cal", isCorrect: true },
      { text: "Direct Medicare billing authority", esText: "Autoridad de facturación directa de Medicare", isCorrect: false },
    ],
    correctExplanation: "APM lets you bill 2 PPS for same-day medical + BH under Medi-Cal — without APM, you can only bill 1.",
    esCorrectExplanation: "APM te permite facturar 2 PPS por médico + BH del mismo día bajo Medi-Cal — sin APM, solo puedes facturar 1.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Learn integration strategies →",
    esCtaText: "Aprende estrategias de integración →",
    courseId: "clinic-manager",
    moduleId: "cm-integration",
  },

  // ── Lesson 12: Provider Productivity ────────────────────────────
  {
    day: 24,
    subject: "Provider Productivity: The #1 Revenue Lever",
    esSubject: "Productividad del Proveedor: La Palanca de Ingresos #1",
    concept: "Under PPS, provider productivity (encounters per day) is the single biggest revenue lever. Target: 18-22 encounters/day. Going from 16 to 20 encounters/day per provider = 4 more × $225 × 250 days = $225K more revenue per provider per year. The top 3 ways to increase productivity: 1) Optimize MA support (1.5:1 ratio), 2) Pre-charting and documentation assistance, 3) Reduce administrative burden (scribes, simplified workflows).",
    esConcept: "Bajo PPS, la productividad del proveedor (encuentros por día) es la palanca de ingresos más grande. Meta: 18-22 encuentros/día. Ir de 16 a 20 encuentros/día = 4 más × $225 × 250 días = $225K más de ingresos por proveedor por año. Las 3 principales formas de aumentar la productividad: 1) Optimizar soporte de MA, 2) Pre-registro y asistencia de documentación, 3) Reducir carga administrativa.",
    quizQuestion: "What is the target range for provider encounters per day at an FQHC?",
    esQuizQuestion: "¿Cuál es el rango meta de encuentros del proveedor por día en un FQHC?",
    quizOptions: [
      { text: "10-14 encounters/day", esText: "10-14 encuentros/día", isCorrect: false },
      { text: "18-22 encounters/day", esText: "18-22 encuentros/día", isCorrect: true },
      { text: "28-32 encounters/day", esText: "28-32 encuentros/día", isCorrect: false },
    ],
    correctExplanation: "18-22 is the sweet spot — enough volume for revenue without sacrificing care quality or causing burnout.",
    esCorrectExplanation: "18-22 es el punto óptimo — suficiente volumen para ingresos sin sacrificar calidad de atención o causar agotamiento.",
    ctaLink: "/strategy/clinic-simulator",
    ctaText: "Model your clinic's numbers →",
    esCtaText: "Modela los números de tu clínica →",
    courseId: "clinic-manager",
    moduleId: "cm-scheduling",
  },

  // ── Lesson 13: 340B Drug Pricing ────────────────────────────────
  {
    day: 26,
    subject: "340B: Your Pharmacy Revenue Lifeline",
    esSubject: "340B: Tu Línea de Vida de Ingresos de Farmacia",
    concept: "The 340B program lets FQHCs purchase outpatient drugs at deeply discounted prices (often 25-50% below wholesale) and then bill payers at standard rates. The spread between purchase price and reimbursement generates significant revenue — some FQHCs earn $1-3M annually from their 340B program. But 340B is under constant legislative threat, so diversifying revenue streams is critical.",
    esConcept: "El programa 340B permite a los FQHCs comprar medicamentos ambulatorios a precios muy descontados (a menudo 25-50% por debajo del mayoreo) y luego facturar a los pagadores a tarifas estándar. La diferencia entre precio de compra y reembolso genera ingresos significativos — algunos FQHCs ganan $1-3M anualmente de su programa 340B.",
    quizQuestion: "How much below wholesale can FQHCs purchase drugs through 340B?",
    esQuizQuestion: "¿Cuánto por debajo del mayoreo pueden los FQHCs comprar medicamentos a través de 340B?",
    quizOptions: [
      { text: "5-10% discount", esText: "5-10% de descuento", isCorrect: false },
      { text: "25-50% discount", esText: "25-50% de descuento", isCorrect: true },
      { text: "75-90% discount", esText: "75-90% de descuento", isCorrect: false },
    ],
    correctExplanation: "340B discounts typically range from 25-50% below wholesale, with the spread generating significant pharmacy revenue.",
    esCorrectExplanation: "Los descuentos 340B típicamente varían de 25-50% por debajo del mayoreo.",
    ctaLink: "/strategy/economics",
    ctaText: "Explore healthcare economics →",
    esCtaText: "Explora la economía de la salud →",
    courseId: "clinic-manager",
    moduleId: "cm-revenue-101",
  },

  // ── Lesson 14: Financial Model ──────────────────────────────────
  {
    day: 28,
    subject: "The FQHC Financial Model in One Formula",
    esSubject: "El Modelo Financiero del FQHC en Una Fórmula",
    concept: "Every FQHC's financial model boils down to: (Providers × Encounters/Day × PPS Rate × Working Days) + Integration Revenue + ECM Revenue − (Payroll + Overhead). Key ratios to track: Cost per encounter ($150-$200 target), Provider productivity (18-22/day), No-show rate (<15%), MA:Provider ratio (1.5:1). If you know these 4 numbers for your clinic, you can predict the impact of almost any operational change.",
    esConcept: "El modelo financiero de cada FQHC se reduce a: (Proveedores × Encuentros/Día × Tarifa PPS × Días Laborales) + Ingresos de Integración + Ingresos ECM − (Nómina + Gastos). Ratios clave: Costo por encuentro ($150-$200), Productividad del proveedor (18-22/día), Tasa de citas perdidas (<15%), Ratio MA:Proveedor (1.5:1).",
    quizQuestion: "What is the target cost per encounter for an efficient FQHC?",
    esQuizQuestion: "¿Cuál es el costo meta por encuentro para un FQHC eficiente?",
    quizOptions: [
      { text: "$50-$100", esText: "$50-$100", isCorrect: false },
      { text: "$150-$200", esText: "$150-$200", isCorrect: true },
      { text: "$300-$400", esText: "$300-$400", isCorrect: false },
    ],
    correctExplanation: "$150-$200 per encounter gives a healthy margin against the $225+ PPS rate.",
    esCorrectExplanation: "$150-$200 por encuentro da un margen saludable contra la tarifa PPS de $225+.",
    ctaLink: "/strategy/clinic-simulator",
    ctaText: "Build your financial model →",
    esCtaText: "Construye tu modelo financiero →",
    courseId: "clinic-manager",
    moduleId: "cm-financial-modeling",
  },

  // ── Lesson 15: 90-Day Plan ──────────────────────────────────────
  {
    day: 30,
    subject: "Your 90-Day Clinic Improvement Plan",
    esSubject: "Tu Plan de Mejora de Clínica de 90 Días",
    concept: "The best clinic managers don't try to change everything at once. Days 1-30 (Quick Wins): Implement 2-touch reminders, enable same-day scheduling, optimize MA ratios. Days 31-60 (Systems Changes): Launch warm handoff protocol, add Saturday clinic, push ECM enrollment. Days 61-90 (Strategic Improvements): Negotiate APM enrollment, implement staggered scheduling, build SB 525 wage model. Track weekly: encounters/day, no-show rate, same-day capture rate, ECM enrollment, staff satisfaction.",
    esConcept: "Los mejores gerentes de clínica no intentan cambiar todo a la vez. Días 1-30 (Ganancias Rápidas): Implementar recordatorios, habilitar programación del mismo día, optimizar ratios de MA. Días 31-60 (Cambios de Sistemas): Lanzar protocolo de transferencia directa, agregar clínica de sábado, impulsar inscripción ECM. Días 61-90 (Mejoras Estratégicas): Negociar inscripción APM, implementar programación escalonada.",
    quizQuestion: "What should be the FIRST operational change a new clinic manager makes?",
    esQuizQuestion: "¿Cuál debería ser el PRIMER cambio operacional que haga un nuevo gerente de clínica?",
    quizOptions: [
      { text: "Restructure all provider schedules", esText: "Reestructurar todos los horarios de proveedores", isCorrect: false },
      { text: "Implement appointment reminders (quick win)", esText: "Implementar recordatorios de citas (ganancia rápida)", isCorrect: true },
      { text: "Negotiate APM enrollment with DHCS", esText: "Negociar inscripción APM con DHCS", isCorrect: false },
    ],
    correctExplanation: "Always start with quick wins! Appointment reminders are low-effort, high-impact, and build credibility for bigger changes later.",
    esCorrectExplanation: "¡Siempre comienza con ganancias rápidas! Los recordatorios de citas son de bajo esfuerzo, alto impacto, y construyen credibilidad para cambios más grandes después.",
    ctaLink: "/academy/clinic-manager",
    ctaText: "Take the full Master Class →",
    esCtaText: "Toma la Clase Magistral completa →",
    courseId: "clinic-manager",
    moduleId: "cm-capstone",
  },
];

/* ------------------------------------------------------------------ */
/*  Email Renderer                                                     */
/* ------------------------------------------------------------------ */

function academyDripFooter(unsubscribeUrl: string): string {
  return `
  <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
  <p style="font-size:12px;color:#a8a29e;text-align:center;line-height:1.6;">
    FQHC Academy — Bite-Size Lessons for Community Health Leaders<br />
    <a href="${SITE}" style="color:#a8a29e;">fqhctalent.com</a> ·
    <a href="${unsubscribeUrl}" style="color:#a8a29e;">Unsubscribe</a>
  </p>`;
}

export function renderAcademyDripEmail(
  lesson: AcademyDripLesson,
  locale: "en" | "es",
  unsubscribeUrl: string,
): { subject: string; html: string } {
  const isEs = locale === "es";
  const subject = isEs ? lesson.esSubject : lesson.subject;
  const concept = isEs ? lesson.esConcept : lesson.concept;
  const quiz = isEs ? lesson.esQuizQuestion : lesson.quizQuestion;
  const correct = lesson.quizOptions.find((o) => o.isCorrect)!;
  const correctText = isEs ? correct.esText : correct.text;
  const explanation = isEs ? lesson.esCorrectExplanation : lesson.correctExplanation;
  const ctaText = isEs ? lesson.esCtaText : lesson.ctaText;
  const lessonNum = ACADEMY_DRIP_LESSONS.indexOf(lesson) + 1;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#1c1917;">
  <div style="background:linear-gradient(135deg,${INDIGO} 0%,#3730a3 100%);border-radius:12px;padding:24px;margin-bottom:24px;">
    <h1 style="color:white;font-size:18px;margin:0;">FQHC Academy</h1>
    <p style="color:#c7d2fe;font-size:13px;margin:6px 0 0 0;">${isEs ? "Lección" : "Lesson"} ${lessonNum} ${isEs ? "de" : "of"} ${ACADEMY_DRIP_LESSONS.length}</p>
  </div>

  <h2 style="color:${INDIGO};font-size:18px;margin:0 0 16px 0;">${subject}</h2>

  <div style="background:${INDIGO_LIGHT};border:1px solid ${INDIGO_BORDER};border-radius:8px;padding:20px;margin:0 0 24px 0;">
    <p style="color:#312e81;line-height:1.7;font-size:14px;margin:0;">${concept}</p>
  </div>

  <div style="background:${AMBER_BG};border:1px solid #fde68a;border-radius:8px;padding:20px;margin:0 0 24px 0;">
    <p style="color:#92400e;font-size:13px;font-weight:600;margin:0 0 8px 0;">💡 ${isEs ? "Mini Quiz" : "Quick Quiz"}</p>
    <p style="color:#78350f;font-size:14px;font-weight:600;margin:0 0 12px 0;">${quiz}</p>
    <p style="color:#92400e;font-size:13px;margin:0 0 4px 0;">✓ <strong>${correctText}</strong></p>
    <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">${explanation}</p>
  </div>

  <div style="text-align:center;margin:24px 0;">
    <a href="${SITE}${lesson.ctaLink}" style="display:inline-block;background:${INDIGO};color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">${ctaText}</a>
  </div>

  <p style="font-size:13px;color:#78716c;text-align:center;margin:16px 0 0 0;">
    ${isEs ? "Próxima lección en 2 días" : "Next lesson in 2 days"} · ${isEs ? "Lección" : "Lesson"} ${lessonNum}/${ACADEMY_DRIP_LESSONS.length}
  </p>

  ${academyDripFooter(unsubscribeUrl)}
</body>
</html>`;

  return { subject, html };
}

/* ------------------------------------------------------------------ */
/*  Helper: Get lesson by day                                          */
/* ------------------------------------------------------------------ */

export function getAcademyLessonByDay(
  daysSinceSubscribe: number,
): AcademyDripLesson | null {
  return (
    ACADEMY_DRIP_LESSONS.find((l) => l.day === daysSinceSubscribe) ?? null
  );
}
