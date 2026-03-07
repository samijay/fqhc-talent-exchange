/* ------------------------------------------------------------------ */
/*  FQHC Interview Prep Tool                                            */
/*  Role-specific mock interview questions with STAR format guidance   */
/*  and FQHC-specific answer frameworks                                 */
/* ------------------------------------------------------------------ */

export type InterviewCategory =
  | "behavioral"
  | "clinical"
  | "mission"
  | "team"
  | "situational"
  | "culture";

export type InterviewDifficulty = "entry" | "mid" | "senior";

export interface STARTip {
  situation: string;
  esSituation: string;
  task: string;
  esTask: string;
  action: string;
  esAction: string;
  result: string;
  esResult: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  esQuestion: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  roles: string[];   // role IDs from career-assessment-engine, or "all"
  whyAsked: string;
  esWhyAsked: string;
  starTip: STARTip;
  strongAnswerExample: string;
  esStrongAnswerExample: string;
  redFlags: string[];
  esRedFlags: string[];
  followUpQuestions: string[];
  esFollowUpQuestions: string[];
}

export interface RoleInterviewGuide {
  roleId: string;
  roleName: string;
  esRoleName: string;
  topQuestions: string[];  // question IDs most common for this role
  keyThemes: { en: string; es: string }[];
  salaryNegotiationTip: { en: string; es: string };
  fqhcSpecificTip: { en: string; es: string };
  interviewFormat: { en: string; es: string };
}

/* --- Category Labels ----------------------------------------------- */

export const CATEGORY_LABELS: Record<InterviewCategory, { en: string; es: string; color: string }> = {
  behavioral:   { en: "Behavioral",  es: "Conductual",   color: "bg-teal-900 text-teal-300" },
  clinical:     { en: "Clinical",    es: "Clínico",      color: "bg-blue-900 text-blue-300" },
  mission:      { en: "Mission Fit", es: "Misión",       color: "bg-amber-900 text-amber-300" },
  team:         { en: "Teamwork",    es: "Trabajo en Equipo", color: "bg-purple-900 text-purple-300" },
  situational:  { en: "Situational", es: "Situacional",  color: "bg-orange-900 text-orange-300" },
  culture:      { en: "Culture Fit", es: "Cultura",      color: "bg-rose-900 text-rose-300" },
};

export const DIFFICULTY_LABELS: Record<InterviewDifficulty, { en: string; es: string; color: string }> = {
  entry:  { en: "Entry Level",  es: "Nivel de Entrada", color: "text-green-400" },
  mid:    { en: "Mid Level",    es: "Nivel Medio",      color: "text-amber-400" },
  senior: { en: "Senior Level", es: "Nivel Senior",     color: "text-red-400" },
};

/* --- Interview Questions ------------------------------------------- */

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  /* ─── MISSION FIT ─────────────────────────────────────────────── */
  {
    id: "mission-why-fqhc",
    question: "Why do you want to work at an FQHC specifically — as opposed to a private practice or hospital?",
    esQuestion: "¿Por qué quieres trabajar en un FQHC específicamente, en lugar de una práctica privada o un hospital?",
    category: "mission",
    difficulty: "entry",
    roles: ["all"],
    whyAsked: "FQHCs serve the most vulnerable populations and have high turnover. Hiring managers need to know you understand the mission and won't leave in 6 months.",
    esWhyAsked: "Los FQHCs sirven a las poblaciones más vulnerables y tienen alta rotación. Los gerentes de contratación necesitan saber que entiendes la misión.",
    starTip: {
      situation: "Describe a moment when you witnessed healthcare inequality or barriers to care",
      esSituation: "Describe un momento en que fuiste testigo de desigualdad en la atención médica o barreras al acceso",
      task: "What was your role or what did you wish you could do differently?",
      esTask: "¿Cuál era tu rol o qué hubieras hecho diferente?",
      action: "What drew you specifically to safety-net medicine or community health?",
      esAction: "¿Qué te atrajo específicamente a la medicina de red de seguridad o la salud comunitaria?",
      result: "How does this FQHC's mission connect to that experience?",
      esResult: "¿Cómo se conecta la misión de este FQHC con esa experiencia?",
    },
    strongAnswerExample: "I grew up without health insurance and relied on a community health center for all my care as a teenager. That experience showed me what accessible, dignified care looks like — and what's at stake when it's not available. I've specifically sought out FQHC roles because I want to be part of the system that creates that access, not just participate in healthcare.",
    esStrongAnswerExample: "Crecí sin seguro de salud y dependí de un centro de salud comunitario para toda mi atención de adolescente. Esa experiencia me mostró cómo es la atención accesible y digna, y lo que está en juego cuando no está disponible.",
    redFlags: [
      "Vague answer about 'helping people' without specific connection to underserved communities",
      "Mentions FQHC as a backup to preferred hospital or private practice role",
      "No awareness of what FQHC stands for or what federally qualified means",
    ],
    esRedFlags: [
      "Respuesta vaga sobre 'ayudar a la gente' sin conexión específica con comunidades desatendidas",
      "Menciona el FQHC como respaldo a un rol preferido en hospital o práctica privada",
    ],
    followUpQuestions: [
      "What do you know about our specific patient population?",
      "Have you worked with uninsured or undocumented patients before?",
      "What does health equity mean to you in practice?",
    ],
    esFollowUpQuestions: [
      "¿Qué sabes sobre nuestra población de pacientes específica?",
      "¿Has trabajado con pacientes sin seguro o indocumentados antes?",
    ],
  },
  {
    id: "mission-health-equity",
    question: "Tell me about a time you advocated for a patient who faced systemic barriers to care.",
    esQuestion: "Cuéntame sobre una vez que abogaste por un paciente que enfrentó barreras sistémicas para recibir atención.",
    category: "mission",
    difficulty: "mid",
    roles: ["all"],
    whyAsked: "FQHCs need staff who go beyond clinical tasks to address social determinants. This question reveals whether you think about the whole patient.",
    esWhyAsked: "Los FQHCs necesitan personal que vaya más allá de las tareas clínicas para abordar los determinantes sociales.",
    starTip: {
      situation: "Describe the specific barrier (insurance, language, transportation, cost, immigration status, housing)",
      esSituation: "Describe la barrera específica (seguro, idioma, transporte, costo, estatus migratorio, vivienda)",
      task: "What was your responsibility vs. what went beyond your job description?",
      esTask: "¿Cuál era tu responsabilidad vs. qué iba más allá de tu descripción de trabajo?",
      action: "What specific steps did you take? Who did you involve? What resources did you connect them to?",
      esAction: "¿Qué pasos específicos tomaste? ¿A quién involucraste? ¿A qué recursos los conectaste?",
      result: "What was the outcome? What did you learn about systemic advocacy?",
      esResult: "¿Cuál fue el resultado? ¿Qué aprendiste sobre la defensa sistémica?",
    },
    strongAnswerExample: "A patient needed specialty care but couldn't afford the $300 specialist copay at an in-network facility. I researched sliding-scale options, found a federally funded specialty clinic 20 miles away, arranged a warm handoff with their scheduling team, and helped the patient access IHSS transportation. The care happened — but it took 4 hours of my time that wasn't billable. I brought this to our care team huddle and we created a community resource one-pager to reduce that time for future patients.",
    esStrongAnswerExample: "Un paciente necesitaba atención especializada pero no podía pagar el copago de $300. Investigué opciones de tarifa escalonada, encontré una clínica especializada con financiamiento federal, coordiné la derivación y ayudé al paciente a acceder a transporte IHSS.",
    redFlags: [
      "Describes only clinical intervention without addressing social barriers",
      "Blames the patient for not following up",
      "Says it 'wasn't my job' or defers entirely to social work",
    ],
    esRedFlags: [
      "Describe solo intervención clínica sin abordar barreras sociales",
      "Culpa al paciente por no dar seguimiento",
    ],
    followUpQuestions: [
      "How did you handle it when you couldn't resolve the barrier?",
      "What systems or workflows did you help change as a result?",
    ],
    esFollowUpQuestions: [
      "¿Cómo lo manejaste cuando no pudiste resolver la barrera?",
      "¿Qué sistemas o flujos de trabajo ayudaste a cambiar como resultado?",
    ],
  },

  /* ─── BEHAVIORAL ───────────────────────────────────────────────── */
  {
    id: "behavioral-conflict",
    question: "Tell me about a time you had a conflict with a colleague. How did you handle it?",
    esQuestion: "Cuéntame sobre una vez que tuviste un conflicto con un colega. ¿Cómo lo manejaste?",
    category: "behavioral",
    difficulty: "entry",
    roles: ["all"],
    whyAsked: "FQHC care is highly team-based. Interpersonal conflict handled poorly cascades to patient care.",
    esWhyAsked: "La atención en FQHC es muy basada en equipo. El conflicto interpersonal manejado mal se traslada a la atención al paciente.",
    starTip: {
      situation: "Set up the conflict clearly — roles, stakes, what triggered it",
      esSituation: "Establece el conflicto claramente — roles, apuestas, qué lo desencadenó",
      task: "What did you need to accomplish despite the conflict?",
      esTask: "¿Qué necesitabas lograr a pesar del conflicto?",
      action: "How did you approach the other person? What did you say? Did you escalate?",
      esAction: "¿Cómo te acercaste a la otra persona? ¿Qué dijiste? ¿Escalaste?",
      result: "What was the resolution? What would you do differently?",
      esResult: "¿Cuál fue la resolución? ¿Qué harías diferente?",
    },
    strongAnswerExample: "A nurse on my team consistently ran late with documentation, which delayed my CHW outreach calls because we shared patient notes. Instead of venting to our supervisor, I asked for 10 minutes one-on-one and said: 'I've noticed our handoffs take longer than expected — can we figure out what's getting in the way?' It turned out she was covering for a colleague on leave and was overwhelmed. We agreed on a simplified handoff protocol for the next 3 weeks. Documentation delays dropped 70%.",
    esStrongAnswerExample: "Una enfermera en mi equipo siempre se retrasaba con la documentación, lo que retrasaba mis llamadas de extensión de CHW. En lugar de quejarme al supervisor, pedí 10 minutos uno a uno y pregunté qué obstáculos había.",
    redFlags: [
      "Claims to never have had conflict",
      "Makes the colleague entirely the villain",
      "Went straight to management without attempting direct resolution",
      "Describes ongoing conflict never resolved",
    ],
    esRedFlags: [
      "Afirma nunca haber tenido conflicto",
      "Hace al colega completamente el villano",
    ],
    followUpQuestions: [
      "What did you learn about your own communication style from that experience?",
      "How do you typically approach giving critical feedback to peers?",
    ],
    esFollowUpQuestions: [
      "¿Qué aprendiste sobre tu propio estilo de comunicación de esa experiencia?",
    ],
  },
  {
    id: "behavioral-high-volume",
    question: "Describe how you manage a high patient volume day when things aren't going as planned.",
    esQuestion: "Describe cómo manejas un día de alto volumen de pacientes cuando las cosas no van como se planeó.",
    category: "behavioral",
    difficulty: "mid",
    roles: ["chw", "medical_assistant", "registered_nurse", "nurse_practitioner", "physician"],
    whyAsked: "FQHCs consistently operate with under-resourced staff. Chaos management is a core competency.",
    esWhyAsked: "Los FQHCs operan constantemente con personal insuficiente. El manejo del caos es una competencia central.",
    starTip: {
      situation: "Name the specific disruption — no-shows, walk-ins, EHR down, provider out sick",
      esSituation: "Nombra la interrupción específica — ausencias, visitas sin cita, EHR caído, proveedor enfermo",
      task: "What were your non-negotiables for that shift?",
      esTask: "¿Cuáles eran tus puntos no negociables para ese turno?",
      action: "How did you triage, communicate to patients, and coordinate with team?",
      esAction: "¿Cómo triajaste, comunicaste a pacientes y coordinaste con el equipo?",
      result: "What got done? What got deferred? How did you debrief?",
      esResult: "¿Qué se hizo? ¿Qué se pospuso? ¿Cómo hiciste el debriefing?",
    },
    strongAnswerExample: "Our EHR went down for 3 hours on a Monday — our highest-volume day. I immediately printed our pending patient list, created a paper triage log, and briefed providers on our manual workflow. We triaged by acuity — urgent patients got seen, routine physicals rescheduled with same-day call backs. I personally called 18 patients to explain the delay. We saw 85% of our scheduled patients. Post-shift I submitted an incident report and suggested we add the manual workflow to our emergency procedures.",
    esStrongAnswerExample: "Nuestro EHR se cayó por 3 horas en un lunes — nuestro día de mayor volumen. Inmediatamente imprimí nuestra lista de pacientes pendientes, creé un registro de triage en papel y orienté a los proveedores sobre nuestro flujo de trabajo manual.",
    redFlags: [
      "Describes panicking or freezing",
      "Blames EHR, management, or colleagues without describing own actions",
      "Can't describe specific triage decisions made",
    ],
    esRedFlags: [
      "Describe entrar en pánico o paralizarse",
      "Culpa al EHR, gestión o colegas sin describir sus propias acciones",
    ],
    followUpQuestions: [
      "How do you know when to escalate versus handle independently?",
      "What systems have you helped create to prevent or manage these situations?",
    ],
    esFollowUpQuestions: [
      "¿Cómo sabes cuándo escalar versus manejar independientemente?",
    ],
  },
  {
    id: "behavioral-difficult-patient",
    question: "Tell me about a time you cared for a patient who was difficult or resistant to treatment.",
    esQuestion: "Cuéntame sobre una vez que atendiste a un paciente que era difícil o resistente al tratamiento.",
    category: "behavioral",
    difficulty: "mid",
    roles: ["all"],
    whyAsked: "FQHC patients often have complex social histories, trauma, distrust of healthcare systems, and communication barriers. Empathy without giving up is essential.",
    esWhyAsked: "Los pacientes de FQHC a menudo tienen historias sociales complejas, trauma y desconfianza hacia los sistemas de salud.",
    starTip: {
      situation: "Describe what made the patient 'difficult' — angry, non-compliant, fearful, cognitive barriers, substance use?",
      esSituation: "Describe qué hacía al paciente 'difícil' — enojado, no conforme, asustado, barreras cognitivas, uso de sustancias?",
      task: "What was the clinical or care coordination goal?",
      esTask: "¿Cuál era el objetivo clínico o de coordinación de atención?",
      action: "What techniques did you use? Did you involve interpreters, CHWs, or behavioral health?",
      esAction: "¿Qué técnicas usaste? ¿Involucraste intérpretes, CHWs o salud conductual?",
      result: "What was the outcome? What did you learn about meeting patients where they are?",
      esResult: "¿Cuál fue el resultado? ¿Qué aprendiste sobre encontrar a los pacientes donde están?",
    },
    strongAnswerExample: "A patient with uncontrolled Type 2 diabetes refused insulin, citing fear of needles and cultural distrust of medications. Instead of repeating the same education in a different tone, I asked her permission to explore what was really behind her hesitation. Over two visits, I learned her mother had gone blind from diabetes — she associated treatment with disease progression, not prevention. Once I understood that frame, I reoriented education around 'preventing your mom's outcome.' Her A1C dropped 2.1 points in 6 months.",
    esStrongAnswerExample: "Un paciente con diabetes tipo 2 descontrolada rechazó la insulina, citando miedo a las agujas y desconfianza cultural. En lugar de repetir la misma educación, pedí permiso para explorar qué estaba realmente detrás de su hesitación.",
    redFlags: [
      "Describes giving up or referring out without attempting engagement",
      "Shows frustration with the patient in the telling",
      "Fails to mention cultural or linguistic barriers as possible factors",
    ],
    esRedFlags: [
      "Describe rendirse o referir sin intentar el compromiso",
      "Muestra frustración con el paciente al narrar",
    ],
    followUpQuestions: [
      "How do you maintain boundaries when a patient's behavior becomes unsafe?",
      "How do you adjust your communication style across different patient populations?",
    ],
    esFollowUpQuestions: [
      "¿Cómo mantienes límites cuando el comportamiento de un paciente se vuelve inseguro?",
    ],
  },

  /* ─── CLINICAL ─────────────────────────────────────────────────── */
  {
    id: "clinical-ehr",
    question: "Which EHR systems have you worked with, and how do you learn a new system quickly?",
    esQuestion: "¿Con qué sistemas EHR has trabajado y cómo aprendes un nuevo sistema rápidamente?",
    category: "clinical",
    difficulty: "entry",
    roles: ["chw", "medical_assistant", "registered_nurse", "nurse_practitioner", "physician", "care_coordinator"],
    whyAsked: "Most CA FQHCs use OCHIN Epic, eClinicalWorks, or NextGen. Switching EHRs is expensive and time-consuming — they need someone who adapts fast.",
    esWhyAsked: "La mayoría de los FQHCs de CA usan OCHIN Epic, eClinicalWorks o NextGen. Cambiar de EHR es costoso y requiere tiempo.",
    starTip: {
      situation: "Name the EHR systems you've used — be specific about version or specialty modules",
      esSituation: "Nombra los sistemas EHR que has usado — sé específico sobre versión o módulos especializados",
      task: "Describe a time you had to learn a new EHR under time pressure",
      esTask: "Describe una vez que tuviste que aprender un nuevo EHR bajo presión de tiempo",
      action: "What was your learning strategy? Did you document shortcuts? Train others?",
      esAction: "¿Cuál fue tu estrategia de aprendizaje? ¿Documentaste atajos? ¿Entrenaste a otros?",
      result: "How long until you were proficient? What's your current speed vs your first week?",
      esResult: "¿Cuánto tiempo tardaste en ser competente? ¿Cuál es tu velocidad actual vs tu primera semana?",
    },
    strongAnswerExample: "I've worked in NextGen for 3 years and trained on eClinicalWorks for 6 months. When I joined my current clinic they were on a version of Epic I hadn't used — I created a personal cheat sheet of my 20 most-used shortcuts in week one, attended every optional Epic training session, and by week 3 I was documenting faster than colleagues who had been on Epic for a year. I since created a one-page 'Epic Quickstart' for new CHWs on our team.",
    esStrongAnswerExample: "He trabajado en NextGen durante 3 años y me entrené en eClinicalWorks por 6 meses. Cuando me uní a mi clínica actual tenían una versión de Epic que no había usado — creé una hoja de referencia personal de mis 20 atajos más usados en la primera semana.",
    redFlags: [
      "Claims to know an EHR but can't name specific modules or workflows",
      "Says EHR doesn't matter much to the job",
      "Can't describe a learning strategy beyond 'I figure it out'",
    ],
    esRedFlags: [
      "Afirma conocer un EHR pero no puede nombrar módulos o flujos de trabajo específicos",
    ],
    followUpQuestions: [
      "Have you ever used EHR for care gap identification or population health reporting?",
      "How do you handle EHR downtime — do you have a manual backup workflow?",
    ],
    esFollowUpQuestions: [
      "¿Alguna vez has usado EHR para identificación de brechas de atención o informes de salud poblacional?",
    ],
  },
  {
    id: "clinical-billing",
    question: "What do you know about FQHC billing — specifically the PPS rate and how it affects patient care decisions?",
    esQuestion: "¿Qué sabes sobre la facturación de FQHC, específicamente la tarifa PPS y cómo afecta las decisiones de atención al paciente?",
    category: "clinical",
    difficulty: "senior",
    roles: ["nurse_practitioner", "physician", "care_coordinator", "operations_director"],
    whyAsked: "Understanding PPS helps clinical staff make decisions that optimize revenue without compromising care. Shows financial literacy unusual in candidates.",
    esWhyAsked: "Entender PPS ayuda al personal clínico a tomar decisiones que optimizan los ingresos sin comprometer la atención.",
    starTip: {
      situation: "Explain what PPS is at a basic level (Prospective Payment System — all-inclusive per-visit rate)",
      esSituation: "Explica qué es PPS a nivel básico (Sistema de Pago Prospectivo — tarifa por visita todo incluido)",
      task: "Connect it to a care workflow you've participated in",
      esTask: "Conéctalo a un flujo de trabajo de atención en el que hayas participado",
      action: "How did your clinic maximize PPS visits — co-visits, panel size, same-day access?",
      esAction: "¿Cómo maximizaba tu clínica las visitas PPS — co-visitas, tamaño del panel, acceso el mismo día?",
      result: "How did revenue and care quality connect in your experience?",
      esResult: "¿Cómo se relacionaron los ingresos y la calidad de atención en tu experiencia?",
    },
    strongAnswerExample: "PPS pays an all-inclusive rate per qualifying visit — at our clinic it was $312 in 2025. I knew this meant every eligible provider visit counted, including CHW wellness visits when properly documented as billable encounters. I worked with our billing team to identify which of my CHW outreach contacts could be coded as PPS visits and we added $45K in annual revenue while maintaining care quality — no upcoding, just correctly capturing the work we were already doing.",
    esStrongAnswerExample: "PPS paga una tarifa todo incluido por visita calificada — en nuestra clínica era $312 en 2025. Sabía que esto significaba que cada visita elegible de proveedor contaba, incluidas las visitas de bienestar de CHW cuando se documentaban correctamente como encuentros facturables.",
    redFlags: [
      "Has never heard of PPS",
      "Thinks PPS is the same as fee-for-service",
      "Sees billing as entirely separate from clinical responsibilities",
    ],
    esRedFlags: [
      "Nunca ha oído hablar de PPS",
      "Cree que PPS es lo mismo que tarifa por servicio",
    ],
    followUpQuestions: [
      "How would you handle a situation where a billing change conflicts with what you think is clinically appropriate?",
      "What do you know about 340B and how it affects FQHC pharmacy revenue?",
    ],
    esFollowUpQuestions: [
      "¿Cómo manejarías una situación donde un cambio de facturación conflictúa con lo que crees que es clínicamente apropiado?",
    ],
  },

  /* ─── SITUATIONAL ─────────────────────────────────────────────── */
  {
    id: "situational-workforce-cuts",
    question: "Imagine our FQHC just had to reduce staff by 15% due to funding cuts. You still have the same patient panel. What do you do?",
    esQuestion: "Imagina que nuestro FQHC acaba de reducir el personal en un 15% debido a recortes de financiamiento. Todavía tienes el mismo panel de pacientes. ¿Qué haces?",
    category: "situational",
    difficulty: "senior",
    roles: ["all"],
    whyAsked: "Given H.R. 1 and CalAIM uncertainty, this is a near-certain future scenario. FQHCs need staff who think strategically under resource constraints, not just panic.",
    esWhyAsked: "Dado H.R. 1 y la incertidumbre de CalAIM, este es un escenario casi certero. Los FQHCs necesitan personal que piense estratégicamente bajo restricciones de recursos.",
    starTip: {
      situation: "Accept the premise — don't debate the cuts",
      esSituation: "Acepta la premisa — no debatas los recortes",
      task: "What are your non-negotiables for patient safety and care quality?",
      esTask: "¿Cuáles son tus puntos no negociables para la seguridad del paciente y la calidad de la atención?",
      action: "Walk through a triage framework: which tasks can be deferred, automated, or delegated?",
      esAction: "Presenta un marco de triaje: ¿qué tareas pueden aplazarse, automatizarse o delegarse?",
      result: "What would you measure to know if quality is holding up?",
      esResult: "¿Qué medirías para saber si la calidad se mantiene?",
    },
    strongAnswerExample: "First, I'd map every patient-facing task against what's truly clinical vs. administrative. High-acuity patients stay on my panel; stable chronic disease patients get moved to a shared care model with CHW support. I'd look at telehealth for routine follow-ups to expand capacity. I'd bring the care team together to identify which documentation steps can be streamlined without losing compliance. And I'd flag the top 10% of the panel by complexity for weekly check-ins until we stabilize.",
    esStrongAnswerExample: "Primero, mapearía cada tarea orientada al paciente contra lo que es verdaderamente clínico vs administrativo. Los pacientes de alta agudeza permanecen en mi panel; los pacientes estables con enfermedad crónica se mueven a un modelo de atención compartida con apoyo de CHW.",
    redFlags: [
      "Says they would just 'work harder' without restructuring workflow",
      "Focuses entirely on the injustice of cuts rather than solutions",
      "Can't describe any prioritization framework",
    ],
    esRedFlags: [
      "Dice que simplemente 'trabajaría más duro' sin reestructurar el flujo de trabajo",
      "Se enfoca enteramente en la injusticia de los recortes en lugar de soluciones",
    ],
    followUpQuestions: [
      "What would you do if quality metrics started declining despite your adjustments?",
      "How would you communicate the changes to patients?",
    ],
    esFollowUpQuestions: [
      "¿Qué harías si las métricas de calidad comenzaran a disminuir a pesar de tus ajustes?",
    ],
  },

  /* ─── TEAM ─────────────────────────────────────────────────────── */
  {
    id: "team-multilingual",
    question: "How have you worked effectively with patients or colleagues whose primary language is not English?",
    esQuestion: "¿Cómo has trabajado efectivamente con pacientes o colegas cuyo idioma principal no es el inglés?",
    category: "team",
    difficulty: "entry",
    roles: ["all"],
    whyAsked: "CA FQHCs serve predominantly Spanish-speaking, Vietnamese, Tagalog, and other non-English populations. Cultural and linguistic competency is core to the job.",
    esWhyAsked: "Los FQHCs de CA sirven principalmente a poblaciones de habla hispana, vietnamita, tagalog y otras no anglohablantes.",
    starTip: {
      situation: "Name the language and context — patient care? Team meeting? Training?",
      esSituation: "Nombra el idioma y el contexto — ¿atención al paciente? ¿Reunión de equipo? ¿Capacitación?",
      task: "What communication goal needed to be achieved?",
      esTask: "¿Qué objetivo de comunicación necesitaba alcanzarse?",
      action: "What resources did you use — interpreter services, bilingual staff, visual aids, written materials?",
      esAction: "¿Qué recursos usaste — servicios de intérprete, personal bilingüe, ayudas visuales, materiales escritos?",
      result: "Did the communication succeed? What would you do better next time?",
      esResult: "¿Tuvo éxito la comunicación? ¿Qué harías mejor la próxima vez?",
    },
    strongAnswerExample: "I'm conversational in Spanish and worked with a primarily Spanish-speaking patient panel for 2 years. For complex medical conversations I always used an interpreter rather than relying on my Spanish — I learned that my language skills create false confidence. I also developed bilingual educational materials for our most common diagnoses that patients could take home. When we had Vietnamese patients I advocated for budget to bring in community health interpreters rather than relying on family members.",
    esStrongAnswerExample: "Tengo conversación en español y trabajé con un panel de pacientes principalmente hispanohablantes durante 2 años. Para conversaciones médicas complejas siempre usé un intérprete en lugar de depender de mi español — aprendí que mis habilidades lingüísticas crean falsa confianza.",
    redFlags: [
      "Uses family members as interpreters for medical conversations",
      "Relies only on their own bilingual skills without professional interpreter",
      "Has never worked with non-English speaking patients",
      "Shows discomfort with or dismissiveness of translation services",
    ],
    esRedFlags: [
      "Usa miembros de la familia como intérpretes para conversaciones médicas",
      "Depende solo de sus propias habilidades bilingües sin intérprete profesional",
    ],
    followUpQuestions: [
      "What languages do you speak professionally? What's your proficiency level for medical conversations?",
      "How do you ensure informed consent when there's a language barrier?",
    ],
    esFollowUpQuestions: [
      "¿Qué idiomas hablas profesionalmente? ¿Cuál es tu nivel de competencia para conversaciones médicas?",
    ],
  },

  /* ─── CULTURE ──────────────────────────────────────────────────── */
  {
    id: "culture-salary",
    question: "What are your salary expectations for this role?",
    esQuestion: "¿Cuáles son tus expectativas salariales para este rol?",
    category: "culture",
    difficulty: "entry",
    roles: ["all"],
    whyAsked: "FQHCs are transparent about salary bands due to grant-funded structures. They want to confirm you've done your research and are in range without overcommitting.",
    esWhyAsked: "Los FQHCs son transparentes sobre las bandas salariales debido a estructuras financiadas por subvenciones. Quieren confirmar que has investigado y estás en rango.",
    starTip: {
      situation: "Do your research first — use fqhctalent.com/salary-data for CA benchmarks",
      esSituation: "Investiga primero — usa fqhctalent.com/salary-data para referencias de CA",
      task: "Know the P25/P50/P75 range for your role and region before the interview",
      esTask: "Conoce el rango P25/P50/P75 para tu rol y región antes de la entrevista",
      action: "Give a range anchored to the median, not below",
      esAction: "Da un rango anclado a la mediana, no por debajo",
      result: "Ask about total compensation — benefits, loan repayment, PTO — not just salary",
      esResult: "Pregunta sobre compensación total — beneficios, pago de préstamos, PTO — no solo salario",
    },
    strongAnswerExample: "Based on my research on CA FQHC salary benchmarks for this role and region, I'm looking for a base in the $72,000-$82,000 range. I'm particularly interested in whether the role qualifies for NHSC loan repayment and what the benefits package looks like — total compensation matters more to me than base salary alone. If that range doesn't align with your band, I'd love to understand where you are so we can find a path forward.",
    esStrongAnswerExample: "Basándome en mi investigación sobre las referencias salariales de FQHC de CA para este rol y región, estoy buscando una base en el rango de $72,000-$82,000. Estoy particularmente interesado en si el rol califica para el pago de préstamos NHSC y cómo es el paquete de beneficios.",
    redFlags: [
      "Names a number well below market (undervalues themselves)",
      "Refuses to give a range ('whatever is fair')",
      "Doesn't know about NHSC loan repayment as a compensation factor at FQHCs",
    ],
    esRedFlags: [
      "Nombra un número muy por debajo del mercado",
      "Se niega a dar un rango ('lo que sea justo')",
    ],
    followUpQuestions: [
      "Are you aware of the NHSC loan repayment program and do you qualify?",
      "What non-salary benefits matter most to you?",
    ],
    esFollowUpQuestions: [
      "¿Conoces el programa de pago de préstamos NHSC y calificas?",
    ],
  },
];

/* --- Role Guides --------------------------------------------------- */

export const ROLE_INTERVIEW_GUIDES: RoleInterviewGuide[] = [
  {
    roleId: "chw",
    roleName: "Community Health Worker (CHW)",
    esRoleName: "Promotor(a) de Salud Comunitaria (CHW)",
    topQuestions: ["mission-why-fqhc", "mission-health-equity", "behavioral-high-volume", "team-multilingual", "culture-salary"],
    keyThemes: [
      { en: "Community trust and cultural humility", es: "Confianza comunitaria y humildad cultural" },
      { en: "Social determinants navigation (housing, food, transportation)", es: "Navegación de determinantes sociales (vivienda, alimentación, transporte)" },
      { en: "Outreach skills and home visit experience", es: "Habilidades de extensión y experiencia en visitas domiciliarias" },
      { en: "ECM enrollment and documentation", es: "Inscripción en ECM y documentación" },
    ],
    salaryNegotiationTip: {
      en: "CA FQHCs typically pay CHWs $22-32/hr. With CalAIM ECM certification, expect $26-34/hr. Always ask if the role qualifies for NHSC loan repayment — most FQHC CHW roles do.",
      es: "Los FQHCs de CA típicamente pagan a los CHWs $22-32/hr. Con certificación ECM de CalAIM, espera $26-34/hr.",
    },
    fqhcSpecificTip: {
      en: "Know about CalAIM and Enhanced Care Management before your interview. Most FQHC CHW interviews will test your knowledge of ECM eligibility criteria and the 12 Community Supports.",
      es: "Conoce sobre CalAIM y la Gestión de Atención Mejorada antes de tu entrevista. La mayoría de las entrevistas de CHW en FQHC evaluarán tu conocimiento de los criterios de elegibilidad de ECM.",
    },
    interviewFormat: {
      en: "Typically 2 rounds: phone screen with HR, then panel interview with 2-3 team members. Expect a brief scenario exercise.",
      es: "Típicamente 2 rondas: revisión telefónica con RRHH, luego entrevista de panel con 2-3 miembros del equipo. Espera un breve ejercicio de escenario.",
    },
  },
  {
    roleId: "registered_nurse",
    roleName: "Registered Nurse (RN)",
    esRoleName: "Enfermero(a) Registrado(a) (RN)",
    topQuestions: ["mission-why-fqhc", "behavioral-high-volume", "behavioral-difficult-patient", "clinical-ehr", "situational-workforce-cuts"],
    keyThemes: [
      { en: "Ambulatory care vs. inpatient experience", es: "Atención ambulatoria vs. experiencia hospitalaria" },
      { en: "Panel management and chronic disease protocols", es: "Gestión de panel y protocolos de enfermedad crónica" },
      { en: "RN co-visit workflows and top-of-license practice", es: "Flujos de trabajo de co-visita de enfermería y práctica al más alto nivel" },
      { en: "Delegation and MA supervision", es: "Delegación y supervisión de MA" },
    ],
    salaryNegotiationTip: {
      en: "FQHC RNs earn $72-95K in most CA regions. LA and Bay Area command a 10-15% premium. With supervisory responsibilities, push toward $88-100K. Verify NHSC eligibility.",
      es: "Los RNs de FQHC ganan $72-95K en la mayoría de las regiones de CA. LA y Bay Area tienen una prima del 10-15%.",
    },
    fqhcSpecificTip: {
      en: "Know what 'RN co-visit' means — an RN conducting a preventive care visit alongside or instead of the physician. This is central to FQHC efficiency and will likely come up.",
      es: "Conoce qué significa 'co-visita de enfermería' — un RN realizando una visita de atención preventiva junto a o en lugar del médico.",
    },
    interviewFormat: {
      en: "3 rounds typical: HR phone screen, nurse manager interview, then panel with clinical staff. May include skills checklist review.",
      es: "3 rondas típicas: revisión telefónica de RRHH, entrevista con gerente de enfermería, luego panel con personal clínico.",
    },
  },
  {
    roleId: "care_coordinator",
    roleName: "Care Coordinator / Case Manager",
    esRoleName: "Coordinador(a) de Atención / Gerente de Caso",
    topQuestions: ["mission-health-equity", "behavioral-conflict", "behavioral-difficult-patient", "team-multilingual", "clinical-billing"],
    keyThemes: [
      { en: "Care transitions and hospital follow-up", es: "Transiciones de atención y seguimiento hospitalario" },
      { en: "ECM/CCM documentation and metrics", es: "Documentación y métricas de ECM/CCM" },
      { en: "Multi-disciplinary team collaboration", es: "Colaboración en equipos multidisciplinarios" },
      { en: "Utilization management and authorization", es: "Gestión de utilización y autorización" },
    ],
    salaryNegotiationTip: {
      en: "Care coordinators at CA FQHCs earn $45-68K. With ECM lead certification or LCSW licensure, $60-78K is achievable. NHSC eligibility varies — verify by grant type.",
      es: "Los coordinadores de atención en FQHCs de CA ganan $45-68K. Con certificación de líder ECM o licencia LCSW, $60-78K es alcanzable.",
    },
    fqhcSpecificTip: {
      en: "Know the difference between ECM (Enhanced Care Management), CCM (Complex Care Management), and TCM (Targeted Case Management). You'll almost certainly be asked to distinguish them.",
      es: "Conoce la diferencia entre ECM (Gestión de Atención Mejorada), CCM (Gestión de Atención Compleja) y TCM (Gestión de Casos Dirigida).",
    },
    interviewFormat: {
      en: "Usually 2 rounds: phone screen then in-person panel. Scenario-based questions about managing a complex patient situation are common.",
      es: "Usualmente 2 rondas: revisión telefónica luego panel en persona. Son comunes las preguntas basadas en escenarios sobre el manejo de situaciones complejas de pacientes.",
    },
  },
];

/* --- Helper Functions --------------------------------------------- */

export function getQuestionsByRole(roleId: string): InterviewQuestion[] {
  return INTERVIEW_QUESTIONS.filter(
    (q) => q.roles.includes("all") || q.roles.includes(roleId)
  );
}

export function getQuestionsByCategory(category: InterviewCategory): InterviewQuestion[] {
  return INTERVIEW_QUESTIONS.filter((q) => q.category === category);
}

export function getRoleGuide(roleId: string): RoleInterviewGuide | undefined {
  return ROLE_INTERVIEW_GUIDES.find((g) => g.roleId === roleId);
}

export function getTopQuestionsForRole(roleId: string): InterviewQuestion[] {
  const guide = getRoleGuide(roleId);
  if (!guide) return INTERVIEW_QUESTIONS.slice(0, 5);
  return guide.topQuestions
    .map((id) => INTERVIEW_QUESTIONS.find((q) => q.id === id))
    .filter(Boolean) as InterviewQuestion[];
}

export const INTERVIEW_LAST_UPDATED = "2026-03-07";
