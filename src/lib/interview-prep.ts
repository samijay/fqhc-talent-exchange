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

  /* ─── PROVIDER-SPECIFIC: PANEL MANAGEMENT ─────────────────────── */
  {
    id: "clinical-panel-management",
    question: "Walk me through how you manage a panel of 1,400+ patients with chronic conditions in a high-volume ambulatory setting.",
    esQuestion: "Descríbeme cómo manejas un panel de más de 1,400 pacientes con condiciones crónicas en un entorno ambulatorio de alto volumen.",
    category: "clinical",
    difficulty: "senior",
    roles: ["physician", "nurse_practitioner", "physician_assistant"],
    whyAsked: "FQHC providers carry large panels (1,200–1,800 for MDs, 800–1,200 for NPs/PAs). Hiring managers need to know you can maintain quality metrics while managing volume.",
    esWhyAsked: "Los proveedores de FQHC tienen paneles grandes. Los gerentes necesitan saber que puedes mantener métricas de calidad mientras manejas el volumen.",
    starTip: {
      situation: "Describe the size and complexity of a panel you've managed — mix of DM, HTN, BH, Medi-Cal",
      esSituation: "Describe el tamaño y complejidad de un panel que hayas manejado — mezcla de DM, HTN, BH, Medi-Cal",
      task: "What were your quality targets (HbA1c, BP control, cancer screenings, HEDIS measures)?",
      esTask: "¿Cuáles eran tus objetivos de calidad (HbA1c, control de PA, detección de cáncer, medidas HEDIS)?",
      action: "How did you use team-based care, huddles, pre-visit planning, and standing orders to manage at scale?",
      esAction: "¿Cómo usaste la atención basada en equipo, reuniones, planificación previsita y órdenes permanentes para manejar a escala?",
      result: "What metrics improved and what does your quality data show?",
      esResult: "¿Qué métricas mejoraron y qué muestran tus datos de calidad?",
    },
    strongAnswerExample: "My panel at [prior FQHC] had about 1,450 patients — 60% Medi-Cal, high DM and HTN burden. I ran daily 10-minute team huddles with my MA and care coordinator where we flagged patients due for HbA1c, gaps in HEDIS measures, and recent ED visits. We used standing orders for vaccinations and A1c checks so MAs could prep without a full visit. My DM controlled rate went from 48% to 67% in 18 months. At FQHCs, panel management is a team sport — not just what happens in the exam room.",
    esStrongAnswerExample: "Mi panel tenía alrededor de 1,450 pacientes — 60% Medi-Cal, alta carga de DM e HTN. Realizaba reuniones diarias de 10 minutos con mi MA y coordinador de atención donde identificábamos pacientes que necesitaban HbA1c, brechas en medidas HEDIS y visitas recientes a urgencias.",
    redFlags: [
      "Focuses only on the clinical encounter with no mention of team-based care or proactive outreach",
      "Can't name specific quality metrics they tracked (HEDIS, UDS, HbA1c controlled rate)",
      "No experience with pre-visit planning or standing orders — these are standard at FQHCs",
    ],
    esRedFlags: [
      "Se centra solo en el encuentro clínico sin mencionar atención basada en equipo",
      "No puede nombrar métricas de calidad específicas que rastreó",
    ],
    followUpQuestions: [
      "How many patients were on your panel and what was your same-day access rate?",
      "How do you handle patients who don't show up for follow-up on chronic disease management?",
      "What was your HEDIS or UDS performance on your top 3 measures?",
    ],
    esFollowUpQuestions: [
      "¿Cuántos pacientes tenías en tu panel y cuál era tu tasa de acceso el mismo día?",
      "¿Cómo manejas a los pacientes que no se presentan al seguimiento?",
    ],
  },
  {
    id: "clinical-np-pa-scope",
    question: "How do you approach scope-of-practice decisions at an FQHC, and how do you handle cases that fall outside your scope?",
    esQuestion: "¿Cómo abordas las decisiones de alcance de práctica en un FQHC, y cómo manejas los casos fuera de tu alcance?",
    category: "clinical",
    difficulty: "mid",
    roles: ["nurse_practitioner", "physician_assistant"],
    whyAsked: "FQHC NPs and PAs practice at or near full scope under California law, but collaborative practice requirements and FQHC culture vary. Hiring managers are testing your judgment, not just your license.",
    esWhyAsked: "Los NPs y PAs de FQHC practican al más alto nivel bajo la ley de CA, pero los requisitos de práctica colaborativa y la cultura del FQHC varían.",
    starTip: {
      situation: "Describe a specific situation where you had to make a scope determination — complex case, unusual presentation, or high-acuity patient",
      esSituation: "Describe una situación específica donde tuviste que tomar una determinación de alcance",
      task: "What was the clinical question and what did you need to decide?",
      esTask: "¿Cuál era la pregunta clínica y qué necesitabas decidir?",
      action: "How did you work within your team — consult the collaborating physician, refer, or manage?",
      esAction: "¿Cómo trabajaste dentro de tu equipo — consultar al médico colaborador, referir o manejar?",
      result: "What was the patient outcome and what did you learn about FQHC practice?",
      esResult: "¿Cuál fue el resultado del paciente y qué aprendiste sobre la práctica en FQHC?",
    },
    strongAnswerExample: "In California, NPs have full scope authority, but at FQHCs the expectation is still collaborative practice and good communication with the physician team. My approach is: I manage everything I'm trained and confident to handle, and I build a clear handoff protocol for anything that requires a higher level of care — complex specialist management, inpatient admission decisions, or acute situations I haven't seen before. I ask early, document thoroughly, and never let ego drive clinical decisions. The best FQHC I've worked at had a culture of 'ask before you assume' — that's the culture I bring.",
    esStrongAnswerExample: "En California, los NPs tienen autoridad de alcance completo, pero en los FQHCs la expectativa sigue siendo la práctica colaborativa y buena comunicación con el equipo médico.",
    redFlags: [
      "Can't articulate what falls inside vs. outside their scope",
      "Has never worked in a team-based care model with physician oversight",
      "Defensiveness about 'needing' to consult a physician — this signals poor team dynamics",
    ],
    esRedFlags: [
      "No puede articular qué está dentro y fuera de su alcance",
      "Nunca ha trabajado en un modelo de atención basado en equipo",
    ],
    followUpQuestions: [
      "In California, NPs can practice independently — would you be interested in that or do you prefer collaborative practice?",
      "How do you structure your relationship with the supervising or collaborating physician?",
    ],
    esFollowUpQuestions: [
      "En California, los NPs pueden practicar independientemente — ¿prefiere eso o práctica colaborativa?",
    ],
  },
  {
    id: "clinical-dentistry-medicaid",
    question: "What is your experience with Medi-Cal dental (Denti-Cal) billing and how have you managed the reimbursement challenges at FQHCs?",
    esQuestion: "¿Cuál es tu experiencia con la facturación de Denti-Cal y cómo has manejado los desafíos de reembolso en los FQHCs?",
    category: "clinical",
    difficulty: "mid",
    roles: ["dentist"],
    whyAsked: "Denti-Cal is notoriously complex and underfunded. FQHCs use PPS billing to offset low Medi-Cal rates. Dentists who understand the financial model are far more effective partners for the organization.",
    esWhyAsked: "Denti-Cal es notoriamente complejo y subfinanciado. Los FQHCs usan la facturación PPS para compensar las bajas tarifas de Medi-Cal.",
    starTip: {
      situation: "Describe your experience with Medi-Cal or Medicaid dental coverage in a safety-net setting",
      esSituation: "Describe tu experiencia con la cobertura dental de Medi-Cal o Medicaid en un entorno de red de seguridad",
      task: "What were the key billing challenges — prior authorizations, covered vs. non-covered services, claim denials?",
      esTask: "¿Cuáles fueron los principales desafíos de facturación?",
      action: "How did you work with your billing team to improve collections or reduce denials?",
      esAction: "¿Cómo trabajaste con tu equipo de facturación para mejorar los cobros o reducir los rechazos?",
      result: "What happened to productivity, patient throughput, or revenue capture?",
      esResult: "¿Qué pasó con la productividad, el flujo de pacientes o la captación de ingresos?",
    },
    strongAnswerExample: "I spent three years at a safety-net dental clinic where 80% of patients were on Denti-Cal. The PPS structure at FQHCs actually helps — you get a fixed per-visit rate regardless of services, which removes the incentive to over-treat. What I learned was that efficiency is everything: complete the diagnosis up front, submit clean claims, and make sure your DA is trained on prior auth requirements for prosthetics and oral surgery. I built a tracking sheet for outstanding auths that cut our denial rate from 18% to 6%.",
    esStrongAnswerExample: "Pasé tres años en una clínica dental de red de seguridad donde el 80% de los pacientes estaban en Denti-Cal. La estructura PPS en FQHCs ayuda — obtienes una tarifa fija por visita independientemente de los servicios.",
    redFlags: [
      "No familiarity with Denti-Cal covered services and prior authorization requirements",
      "Doesn't understand FQHC PPS dental billing vs. fee-for-service",
      "Has only worked in private practice with commercial insurance — steep learning curve",
    ],
    esRedFlags: [
      "Sin familiaridad con los servicios cubiertos de Denti-Cal y los requisitos de autorización previa",
      "No entiende la facturación dental PPS de FQHC",
    ],
    followUpQuestions: [
      "How many patients per day were you seeing and what was your production target?",
      "How do you approach patients who've avoided dental care for years due to fear or cost?",
      "Are you comfortable with the full scope of FQHC dental — extractions, dentures, peds, ortho?",
    ],
    esFollowUpQuestions: [
      "¿Cuántos pacientes por día veías y cuál era tu objetivo de producción?",
      "¿Cómo abordas a los pacientes que han evitado la atención dental por años?",
    ],
  },
  {
    id: "team-provider-supervision",
    question: "Describe your experience supervising or collaborating with NPs, PAs, or MAs in a team-based primary care model.",
    esQuestion: "Describe tu experiencia supervisando o colaborando con NPs, PAs o MAs en un modelo de atención primaria basado en equipo.",
    category: "team",
    difficulty: "senior",
    roles: ["physician"],
    whyAsked: "FQHC physicians often supervise 1-3 NPs/PAs and delegate significantly to MAs. The model only works with a physician who actively enables team-based care.",
    esWhyAsked: "Los médicos de FQHC a menudo supervisan a 1-3 NPs/PAs y delegan significativamente a los MAs.",
    starTip: {
      situation: "Describe a team-based care model you've led or participated in — who was on the team, what their scope was",
      esSituation: "Describe un modelo de atención basado en equipo que hayas liderado o en el que hayas participado",
      task: "What were the supervision and delegation responsibilities?",
      esTask: "¿Cuáles eran las responsabilidades de supervisión y delegación?",
      action: "How did you create psychological safety for the team to raise issues, escalate cases, and work to top of license?",
      esAction: "¿Cómo creaste seguridad psicológica para que el equipo planteara problemas y escalara casos?",
      result: "How did the model affect patient outcomes, visit volume, or staff retention?",
      esResult: "¿Cómo afectó el modelo a los resultados del paciente, el volumen de visitas o la retención del personal?",
    },
    strongAnswerExample: "At my last FQHC, I supervised two NPs and worked closely with four MAs. My approach is to front-load the relationship: I meet one-on-one with each NP in the first week to understand their confidence levels, case types they want to build skills on, and what kind of curbside consultation they need. I build standing order protocols together with them so they're not constantly seeking sign-off for routine things. The result was that my two NPs ran independent schedules at 85% of my visit volume, and our MA-administered preventive care rate (vaccines, A1c checks) was the highest in the clinic.",
    esStrongAnswerExample: "En mi último FQHC, supervisé a dos NPs y trabajé en estrecha colaboración con cuatro MAs. Mi enfoque es establecer la relación desde el principio: me reúno uno a uno con cada NP en la primera semana.",
    redFlags: [
      "Views NPs/PAs as 'physician extenders' rather than clinical colleagues — signals poor supervisory culture",
      "Can't describe specific delegation protocols or standing orders used",
      "Has never worked in a team-based model — primarily solo practice mentality",
    ],
    esRedFlags: [
      "Ve a los NPs/PAs como 'extensores del médico' en lugar de colegas clínicos",
      "No puede describir protocolos específicos de delegación",
    ],
    followUpQuestions: [
      "How many NPs and PAs have you supervised simultaneously?",
      "What types of cases do you require NPs/PAs to consult you on versus handle independently?",
    ],
    esFollowUpQuestions: [
      "¿Cuántos NPs y PAs has supervisado simultáneamente?",
    ],
  },
  {
    id: "clinical-pps-billing",
    question: "Do you understand how FQHC Prospective Payment System (PPS) billing works, and how does it influence your clinical decision-making?",
    esQuestion: "¿Entiendes cómo funciona la facturación del Sistema de Pago Prospectivo (PPS) de FQHC, y cómo influye en tu toma de decisiones clínicas?",
    category: "clinical",
    difficulty: "mid",
    roles: ["physician", "nurse_practitioner", "physician_assistant"],
    whyAsked: "PPS billing is unique to FQHCs — one encounter = one PPS rate regardless of what you do. Providers who understand this avoid leaving revenue on the table by not adding qualifying visits and also avoid unnecessary over-documentation.",
    esWhyAsked: "La facturación PPS es única de los FQHCs — un encuentro = una tarifa PPS independientemente de lo que hagas.",
    starTip: {
      situation: "What do you know about FQHC-specific billing — PPS, encounter-based payment, qualifying visit types?",
      esSituation: "¿Qué sabes sobre la facturación específica de FQHC — PPS, pago basado en encuentros, tipos de visitas calificadas?",
      task: "How does this inform how you schedule same-day issues, add-on problems, or split versus combined visits?",
      esTask: "¿Cómo informa esto cómo programas problemas del mismo día, problemas adicionales o visitas divididas versus combinadas?",
      action: "Describe how you've worked with a billing or compliance team to maximize appropriate billing",
      esAction: "Describe cómo has trabajado con un equipo de facturación o cumplimiento para maximizar la facturación apropiada",
      result: "What was the result for the clinic's financial health or your compliance record?",
      esResult: "¿Cuál fue el resultado para la salud financiera de la clínica o tu registro de cumplimiento?",
    },
    strongAnswerExample: "PPS is one of the things that makes FQHC practice unique. You get one bundled rate per qualifying encounter — so the incentive is to make every encounter count, not to fragment care across multiple visits. I've learned to split visits strategically when there's a distinct unrelated problem, work with my billing team on Medi-Cal supplemental billing, and understand that behavioral health 'incident-to' billing under PPS works differently than in private practice. Most importantly, I document to the complexity level that matches what I actually did — no gaming, no under-documentation.",
    esStrongAnswerExample: "PPS es una de las cosas que hace única la práctica de FQHC. Obtienes una tarifa combinada por encuentro calificado, por lo que el incentivo es que cada encuentro cuente.",
    redFlags: [
      "Has never worked in a Medicaid/FQHC setting and has no knowledge of PPS",
      "Conflates FQHC billing with fee-for-service — signals learning curve",
      "Can't distinguish between a qualifying and non-qualifying FQHC encounter",
    ],
    esRedFlags: [
      "Nunca ha trabajado en un entorno de Medicaid/FQHC",
      "Confunde la facturación de FQHC con el pago por servicio",
    ],
    followUpQuestions: [
      "What's the difference between a qualifying encounter and a non-qualifying encounter under FQHC rules?",
      "How have you handled the behavioral health billing carve-out under PPS?",
    ],
    esFollowUpQuestions: [
      "¿Cuál es la diferencia entre un encuentro calificado y uno no calificado bajo las reglas de FQHC?",
    ],
  },
  {
    id: "clinical-dental-integration",
    question: "How do you integrate dental care with the rest of the medical team in a whole-person care model at an FQHC?",
    esQuestion: "¿Cómo integras la atención dental con el resto del equipo médico en un modelo de atención integral en un FQHC?",
    category: "team",
    difficulty: "mid",
    roles: ["dentist"],
    whyAsked: "FQHCs increasingly integrate oral-systemic health connections (DM-periodontitis, BH-oral health, prenatal care). Dentists who understand this whole-person model are more effective and aligned with the mission.",
    esWhyAsked: "Los FQHCs cada vez más integran las conexiones de salud oral-sistémica. Los dentistas que entienden este modelo son más efectivos.",
    starTip: {
      situation: "Describe a time when you identified a medical issue during a dental appointment, or coordinated with a medical provider",
      esSituation: "Describe un momento en que identificaste un problema médico durante una cita dental, o coordinaste con un proveedor médico",
      task: "What was the systemic-oral connection and what did you do?",
      esTask: "¿Cuál era la conexión sistémica-oral y qué hiciste?",
      action: "How did you coordinate with the medical team — warm handoff, EHR note, co-location visit?",
      esAction: "¿Cómo coordinaste con el equipo médico — transferencia directa, nota EHR, visita de colocalización?",
      result: "What happened for the patient and what did it teach you about integrated care?",
      esResult: "¿Qué pasó con el paciente y qué te enseñó sobre la atención integrada?",
    },
    strongAnswerExample: "I've been in FQHC dentistry long enough to see the shift from 'dental is its own silo' to full oral-systemic integration. At my current clinic, if I see uncontrolled blood pressure during a dental screening (we do BP checks on every adult), I walk the patient to the medical side for a same-day triage. I flag diabetic patients in the EHR because periodontal disease worsens glycemic control — that's a two-way street. And for our prenatal care patients, I coordinate with OB-GYN for first-trimester cleanings because periodontal disease is linked to preterm birth. It's the most satisfying part of FQHC dentistry — you're part of the whole care team.",
    esStrongAnswerExample: "He estado en la odontología de FQHC el tiempo suficiente para ver el cambio de 'dental es su propio silo' a la integración oral-sistémica completa.",
    redFlags: [
      "Has never integrated with medical team — purely siloed dental practice",
      "Unaware of oral-systemic connections relevant to FQHC populations (DM-periodontitis, prenatal, BH)",
      "Doesn't know that FQHCs can offer dental case management or care coordination",
    ],
    esRedFlags: [
      "Nunca se ha integrado con el equipo médico — práctica dental puramente aislada",
      "Desconoce las conexiones orales-sistémicas relevantes para las poblaciones de FQHC",
    ],
    followUpQuestions: [
      "How do you handle patients who haven't had dental care in 5+ years due to cost or fear?",
      "What is your experience with special needs dentistry — patients with developmental disabilities, serious mental illness?",
    ],
    esFollowUpQuestions: [
      "¿Cómo manejas a los pacientes que no han tenido atención dental en 5+ años?",
    ],
  },

  /* ─── DENTAL ASSISTANT ─────────────────────────────────────────── */
  {
    id: "clinical-da-four-handed",
    question: "Walk me through your role during a high-volume FQHC dental session — what does an efficient day look like for you as a dental assistant?",
    esQuestion: "Descríbeme tu papel durante una sesión dental de alto volumen en un FQHC — ¿cómo es un día eficiente para ti como asistente dental?",
    category: "clinical",
    difficulty: "mid",
    roles: ["dental_assistant"],
    whyAsked: "FQHC dental clinics run on volume — the DA is the throughput engine. Interviewers want to see if you can manage setup, turnover, and chairside simultaneously.",
    esWhyAsked: "Las clínicas dentales de FQHC funcionan con volumen — el asistente dental es el motor de rendimiento.",
    starTip: {
      situation: "Describe the type of clinic — how many ops, how many providers, what patient population",
      esSituation: "Describe el tipo de clínica — cuántas operatorias, cuántos proveedores, qué población de pacientes",
      task: "What was your role in keeping the schedule moving?",
      esTask: "¿Cuál fue tu papel para mantener el horario en movimiento?",
      action: "Detail your setup/breakdown routine, supply management, patient intake steps",
      esAction: "Detalla tu rutina de preparación/desmontaje, manejo de suministros, pasos de recepción de pacientes",
      result: "How many patients per provider per day? Any efficiency wins you achieved?",
      esResult: "¿Cuántos pacientes por proveedor por día? ¿Algún logro de eficiencia que hayas alcanzado?",
    },
    strongAnswerExample: "At my last FQHC dental clinic we ran 3 dentists across 6 operatories. My job was to keep all 6 turning — I'd prep the next patient in Op 3 while the dentist was finishing in Op 1. I memorized each dentist's setup preferences (Dr. Ramos likes a specific composite kit laid out by shade, Dr. Chen wants radiographs pre-loaded). We went from 14 to 18 patients per provider per day in six months just by tightening the turnover to 8 minutes.",
    esStrongAnswerExample: "En mi última clínica dental de FQHC teníamos 3 dentistas en 6 operatorias. Mi trabajo era mantener las 6 rotando — preparaba al siguiente paciente en la Op 3 mientras el dentista terminaba en la Op 1.",
    redFlags: [
      "No clear understanding of four-handed dentistry principles",
      "Has never worked with Denti-Cal patients or doesn't understand insurance workflows",
      "Can't describe a specific throughput strategy",
    ],
    esRedFlags: [
      "No tiene clara comprensión de los principios de odontología a cuatro manos",
      "Nunca ha trabajado con pacientes de Denti-Cal",
    ],
    followUpQuestions: [
      "Are you EDDA-certified (Expanded Duties Dental Assistant) in California?",
      "How do you handle a patient who is extremely fearful or had a prior traumatic dental experience?",
    ],
    esFollowUpQuestions: [
      "¿Tienes certificación EDDA (Asistente Dental con Deberes Expandidos) en California?",
    ],
  },

  /* ─── DENTAL HYGIENIST ─────────────────────────────────────────── */
  {
    id: "clinical-dh-perio",
    question: "Many FQHC patients have significant periodontal disease and years of deferred care. How do you approach a patient who needs extensive treatment and has never seen a dentist regularly?",
    esQuestion: "Muchos pacientes de FQHC tienen enfermedad periodontal significativa y años de atención diferida. ¿Cómo abordas a un paciente que necesita tratamiento extenso y nunca ha visitado al dentista regularmente?",
    category: "clinical",
    difficulty: "mid",
    roles: ["dental_hygienist"],
    whyAsked: "FQHC hygienists work with high-acuity, trauma-aware patients. Interviewers want to see your patient education approach, trauma-informed care skills, and prioritization strategy.",
    esWhyAsked: "Los higienistas de FQHC trabajan con pacientes de alta agudeza. Los entrevistadores quieren ver tu enfoque de educación del paciente y habilidades de atención informada en trauma.",
    starTip: {
      situation: "Describe the patient demographics at your clinic and how deferred care shows up clinically",
      esSituation: "Describe la demografía de pacientes en tu clínica y cómo se manifiesta clínicamente la atención diferida",
      task: "What was your goal for a first-time or lapsed patient visit?",
      esTask: "¿Cuál era tu objetivo para una visita de paciente nuevo o con lapso de atención?",
      action: "Walk through your approach — assessment, education, SRP scheduling, referrals",
      esAction: "Describe tu enfoque — evaluación, educación, programación de SRP, referencias",
      result: "What outcomes have you seen with patients who follow through on treatment plans?",
      esResult: "¿Qué resultados has visto con pacientes que siguen los planes de tratamiento?",
    },
    strongAnswerExample: "Most of my patients haven't had a cleaning in 5+ years. I don't lead with the clinical picture — I lead with 'What's been getting in the way of dental care for you?' because cost and fear are the biggest barriers. Once I understand their situation, I prioritize: what's urgent, what can wait. I'll do an emergency SRP on the worst quadrant, get them scheduled for the rest, and coach home care they can actually do — not just 'floss more.' For diabetic patients I explain the A1C-periodontal connection because that motivates follow-through.",
    esStrongAnswerExample: "La mayoría de mis pacientes no han tenido una limpieza en 5+ años. No comienzo con el cuadro clínico — comienzo con '¿Qué ha impedido la atención dental para usted?' porque el costo y el miedo son las mayores barreras.",
    redFlags: [
      "Leads with judgment about patient's dental hygiene without exploring barriers",
      "No experience with SRP or scaling beyond routine cleanings",
      "Doesn't understand oral-systemic connections relevant to FQHC populations",
    ],
    esRedFlags: [
      "Lidera con juicio sobre la higiene dental del paciente sin explorar barreras",
      "No tiene experiencia con SRP más allá de limpiezas de rutina",
    ],
    followUpQuestions: [
      "Do you have experience with direct access dental hygiene or Alternative Practice settings?",
      "How do you coordinate with the dentist when you identify a patient needing urgent restorative care?",
    ],
    esFollowUpQuestions: [
      "¿Tienes experiencia con higiene dental de acceso directo o entornos de práctica alternativa?",
    ],
  },

  /* ─── PHARMACIST ───────────────────────────────────────────────── */
  {
    id: "clinical-pharmacist-340b",
    question: "FQHCs rely heavily on 340B drug pricing to reduce medication costs for patients. What is your understanding of the 340B program and how have you worked within it?",
    esQuestion: "Los FQHCs dependen en gran medida del precio de medicamentos 340B para reducir los costos de medicamentos para los pacientes. ¿Cuál es tu comprensión del programa 340B y cómo has trabajado dentro de él?",
    category: "clinical",
    difficulty: "mid",
    roles: ["pharmacist", "pharmacy_technician"],
    whyAsked: "340B is central to FQHC pharmacy economics. Pharmacists who understand split billing, contract pharmacy relationships, and audit compliance add direct financial value.",
    esWhyAsked: "340B es central para la economía de farmacia de FQHC. Los farmacéuticos que entienden la facturación dividida agregan valor financiero directo.",
    starTip: {
      situation: "Have you worked at a 340B-covered entity or contract pharmacy?",
      esSituation: "¿Has trabajado en una entidad cubierta por 340B o farmacia contratada?",
      task: "What was your role in 340B compliance or program management?",
      esTask: "¿Cuál fue tu papel en el cumplimiento o gestión del programa 340B?",
      action: "Describe the processes — eligibility verification, duplicate discount prevention, audit preparation",
      esAction: "Describe los procesos — verificación de elegibilidad, prevención de descuentos duplicados, preparación de auditorías",
      result: "Any cost savings demonstrated or audit outcomes?",
      esResult: "¿Algún ahorro de costos demostrado o resultados de auditoría?",
    },
    strongAnswerExample: "At HealthRight 360 I worked with our 340B TPA (we used Sentry) to manage contract pharmacy relationships. My role included reviewing the eligibility file monthly to ensure only Medi-Cal and uninsured patients received 340B pricing, running duplicate discount reports quarterly, and preparing for the HRSA audit documentation. We passed our audit with zero findings. The 340B savings funded our PAP program that covered insulin for 200+ patients monthly.",
    esStrongAnswerExample: "En HealthRight 360 trabajé con nuestro TPA 340B para gestionar las relaciones de farmacia contratada. Mi función incluía revisar el archivo de elegibilidad mensualmente y preparar la documentación de auditoría HRSA.",
    redFlags: [
      "No knowledge of 340B basics — covered entity vs contract pharmacy distinction",
      "Unaware of duplicate discount prohibition",
      "Never worked with low-income or uninsured patient medication programs",
    ],
    esRedFlags: [
      "Sin conocimiento de los conceptos básicos de 340B",
      "Desconoce la prohibición de descuentos duplicados",
    ],
    followUpQuestions: [
      "What medication therapy management (MTM) experience do you have, especially for chronic disease management?",
      "How do you counsel patients on medication adherence when cost is a barrier?",
    ],
    esFollowUpQuestions: [
      "¿Qué experiencia tienes en gestión de terapia de medicamentos (MTM) para manejo de enfermedades crónicas?",
    ],
  },

  /* ─── HEALTH ENROLLMENT NAVIGATOR ─────────────────────────────── */
  {
    id: "clinical-navigator-calAIM",
    question: "A patient presents uninsured, speaks limited English, and has a complex chronic condition. Walk me through how you would enroll them in coverage and connect them to FQHC services.",
    esQuestion: "Un paciente llega sin seguro, habla inglés limitado y tiene una condición crónica compleja. Descríbeme cómo lo inscribirías en cobertura y lo conectarías con los servicios del FQHC.",
    category: "situational",
    difficulty: "mid",
    roles: ["health_enrollment_navigator"],
    whyAsked: "This is the core competency test for enrollment navigators. FQHCs serve complex, multilingual, uninsured populations — and enrollment directly drives PPS revenue.",
    esWhyAsked: "Esta es la prueba de competencia básica para los navegadores de inscripción. Los FQHCs atienden poblaciones complejas, multilingües y sin seguro — y la inscripción impulsa directamente los ingresos PPS.",
    starTip: {
      situation: "What was the patient's language, documentation status, and health needs?",
      esSituation: "¿Cuál era el idioma, estado de documentación y necesidades de salud del paciente?",
      task: "What coverage options were available to this patient?",
      esTask: "¿Qué opciones de cobertura estaban disponibles para este paciente?",
      action: "Describe the enrollment steps — Covered CA, full-scope Medi-Cal, restricted Medi-Cal, PCIP, county indigent programs",
      esAction: "Describe los pasos de inscripción — Covered CA, Medi-Cal completo, Medi-Cal restringido, PCIP, programas indigentes del condado",
      result: "What coverage did you secure? How did it change the patient's care access?",
      esResult: "¿Qué cobertura aseguraste? ¿Cómo cambió el acceso a la atención del paciente?",
    },
    strongAnswerExample: "First I assess documentation status — because for undocumented patients over 26, restricted-scope Medi-Cal covers emergency and pregnancy only; for under-26, full-scope is available since January 2024. Then income: under 138% FPL is Medi-Cal, above is Covered California. If no documentation and over 26, I look at county options — LA has the My Health LA program for the uninsured. For language, I use our bilingual staff or CLAS-compliant telephone interpretation. Once enrolled, I warm-hand them to care coordination for ECM screening if they meet criteria — complex chronic condition, high ED utilization.",
    esStrongAnswerExample: "Primero evalúo el estado de documentación — porque para pacientes indocumentados mayores de 26 años, el Medi-Cal de alcance restringido solo cubre emergencias y embarazo; para menores de 26, el alcance completo está disponible desde enero de 2024.",
    redFlags: [
      "Doesn't know the difference between full-scope and restricted Medi-Cal",
      "Unfamiliar with Covered California income thresholds",
      "Has never worked with interpretation services or LEP patients",
    ],
    esRedFlags: [
      "No conoce la diferencia entre Medi-Cal de alcance completo y restringido",
      "No está familiarizado con los umbrales de ingresos de Covered California",
    ],
    followUpQuestions: [
      "What experience do you have with CalFresh, CalWORKs, or other public benefit programs that FQHCs help patients navigate?",
      "How do you handle a patient who is afraid to apply for coverage due to immigration concerns?",
    ],
    esFollowUpQuestions: [
      "¿Qué experiencia tienes con CalFresh, CalWORKs u otros programas de beneficios públicos?",
      "¿Cómo manejas a un paciente que teme solicitar cobertura por preocupaciones de inmigración?",
    ],
  },

  /* ─── LVN ─────────────────────────────────────────────────────── */
  {
    id: "clinical-lvn-scope",
    question: "LVN scope of practice in California is specific — what can you do independently, and what requires RN or provider supervision at an FQHC?",
    esQuestion: "El alcance de práctica de LVN en California es específico — ¿qué puedes hacer de forma independiente y qué requiere supervisión de RN o proveedor en un FQHC?",
    category: "clinical",
    difficulty: "entry",
    roles: ["lvn"],
    whyAsked: "LVN scope confusion creates liability. Interviewers need to confirm you understand your boundaries — IV therapy, medication administration, assessment vs. evaluation distinctions.",
    esWhyAsked: "La confusión sobre el alcance de LVN crea responsabilidad. Los entrevistadores necesitan confirmar que entiendes tus límites.",
    starTip: {
      situation: "What type of clinic have you worked in — primary care, specialty, BH, FQHC?",
      esSituation: "¿En qué tipo de clínica has trabajado — atención primaria, especialidad, BH, FQHC?",
      task: "Give an example where knowing your scope prevented an error or escalation",
      esTask: "Da un ejemplo donde conocer tu alcance previno un error o escalación",
      action: "Describe what you did, who you notified, and why",
      esAction: "Describe lo que hiciste, a quién notificaste y por qué",
      result: "What was the outcome and what did it reinforce for you about scope?",
      esResult: "¿Cuál fue el resultado y qué te reforzó sobre el alcance?",
    },
    strongAnswerExample: "In California, LVNs can administer medications, perform IV therapy with the IV Certification, take vitals, collect specimens, do wound care, and implement the nursing care plan. What we cannot do is the initial nursing assessment — that belongs to the RN — and we cannot independently adjust a care plan without RN/provider direction. At my last clinic I caught a medication order that seemed outside the normal parameters. I flagged it immediately to the RN supervisor rather than administering it, the order was corrected, and the MD thanked me. That's the job — know what you know, know who to call when you don't.",
    esStrongAnswerExample: "En California, los LVN pueden administrar medicamentos, realizar terapia IV con la certificación de IV, tomar signos vitales, recolectar muestras, realizar cuidado de heridas e implementar el plan de cuidado de enfermería. Lo que no podemos hacer es la evaluación inicial de enfermería — eso le corresponde al RN.",
    redFlags: [
      "Unclear on LVN vs. RN scope distinctions in California",
      "Has never worked in primary care — FQHC LVN work is different from acute care",
      "Can't give an example of appropriate escalation to supervising RN or provider",
    ],
    esRedFlags: [
      "No tiene claras las distinciones de alcance de LVN vs. RN en California",
      "Nunca ha trabajado en atención primaria",
    ],
    followUpQuestions: [
      "Do you have your IV Therapy certification? If not, is that something you're working toward?",
      "Describe your experience with chronic disease management in a primary care setting — diabetes, hypertension, asthma protocols.",
    ],
    esFollowUpQuestions: [
      "¿Tienes tu certificación de terapia IV? Si no, ¿es algo hacia lo que estás trabajando?",
    ],
  },

  /* ─── PSYCHIATRIC NP ────────────────────────────────────────────── */
  {
    id: "clinical-pnp-collaborative-care",
    question: "Describe your experience with integrated behavioral health or Collaborative Care Model (CoCM) in a primary care setting. How do you work alongside PCPs?",
    esQuestion: "Describe tu experiencia con salud conductual integrada o el Modelo de Atención Colaborativa (CoCM) en un entorno de atención primaria. ¿Cómo trabajas junto a los PCPs?",
    category: "clinical",
    difficulty: "senior",
    roles: ["psychiatric_np"],
    whyAsked: "FQHCs increasingly integrate behavioral health into primary care. PMHNPs who can function in a CoCM model — brief consults, caseload panel, population health — are highest value.",
    esWhyAsked: "Los FQHCs integran cada vez más la salud conductual en la atención primaria. Los PMHNPs que pueden funcionar en un modelo CoCM son de mayor valor.",
    starTip: {
      situation: "What was the BH integration model at your last clinical site?",
      esSituation: "¿Cuál era el modelo de integración de BH en tu último sitio clínico?",
      task: "How did you collaborate with PCPs on shared patients?",
      esTask: "¿Cómo colaboraste con los PCPs en pacientes compartidos?",
      action: "Describe warm handoffs, caseload reviews, co-prescribing coordination",
      esAction: "Describe las transferencias directas, revisiones de lista de casos, coordinación de co-prescripción",
      result: "What outcomes did the integrated model produce vs. traditional siloed BH?",
      esResult: "¿Qué resultados produjo el modelo integrado vs. la BH siloada tradicional?",
    },
    strongAnswerExample: "I've worked in two FQHCs with different integration levels. At the first, it was co-location only — we were in the same building but referred separately. At the second, we ran a true CoCM: I had a panel of 80 patients in the registry, the PCP could warm-hand a PHQ-9 ≥10 patient to my door same day, we had weekly case reviews with the care manager, and I adjusted psychotropics collaboratively with the PCP rather than in a separate psychiatry appointment. The second model got patients to symptom improvement 40% faster. For FQHC work specifically, I also prescribe buprenorphine for OUD — that's a core competency the sector needs.",
    esStrongAnswerExample: "He trabajado en dos FQHCs con diferentes niveles de integración. En el primero, era solo co-ubicación. En el segundo, ejecutamos un verdadero CoCM: tenía un panel de 80 pacientes en el registro, el PCP podía transferir directamente a un paciente con PHQ-9 ≥10 el mismo día.",
    redFlags: [
      "Has only worked in traditional outpatient psychiatry — no primary care integration experience",
      "Cannot prescribe buprenorphine (X-waiver or DATA 2000) — significant gap for FQHC",
      "No experience with trauma-informed care or complex social needs populations",
    ],
    esRedFlags: [
      "Solo ha trabajado en psiquiatría ambulatoria tradicional — sin experiencia en integración de atención primaria",
      "No puede prescribir buprenorfina — brecha significativa para FQHC",
    ],
    followUpQuestions: [
      "Do you have your DEA X-waiver (buprenorphine prescribing) for OUD treatment?",
      "How do you handle a patient who needs a level of care you cannot provide at the FQHC — inpatient psychiatric hold?",
    ],
    esFollowUpQuestions: [
      "¿Tienes tu exención DEA X (prescripción de buprenorfina) para el tratamiento de OUD?",
    ],
  },

  /* ─── PROGRAM MANAGER ─────────────────────────────────────────── */
  {
    id: "clinical-pgm-grant-compliance",
    question: "Walk me through a grant-funded program you've managed from implementation through HRSA reporting. What metrics did you track and how did you ensure compliance?",
    esQuestion: "Descríbeme un programa financiado con subvenciones que hayas gestionado desde la implementación hasta los informes de HRSA. ¿Qué métricas rastreaste y cómo aseguraste el cumplimiento?",
    category: "clinical",
    difficulty: "senior",
    roles: ["program_manager"],
    whyAsked: "Program managers at FQHCs are directly responsible for grant compliance and UDS reporting. This question tests whether you understand the full lifecycle of a federal program.",
    esWhyAsked: "Los gerentes de programa en FQHCs son directamente responsables del cumplimiento de subvenciones e informes UDS. Esta pregunta evalúa si entiendes el ciclo de vida completo de un programa federal.",
    starTip: {
      situation: "What program? HRSA section 330? CalAIM ECM? Title X? Ryan White?",
      esSituation: "¿Qué programa? ¿Sección HRSA 330? ¿CalAIM ECM? ¿Título X? ¿Ryan White?",
      task: "What were the reporting requirements and compliance obligations?",
      esTask: "¿Cuáles eran los requisitos de informes y las obligaciones de cumplimiento?",
      action: "Describe your tracking systems, team management, and QI processes",
      esAction: "Describe tus sistemas de seguimiento, gestión del equipo y procesos de mejora de calidad",
      result: "UDS outcomes, audit results, program renewal, patient impact numbers",
      esResult: "Resultados UDS, resultados de auditoría, renovación del programa, números de impacto en pacientes",
    },
    strongAnswerExample: "I managed a Ryan White Part C program serving 340 HIV+ patients. I built our UDS data collection workflow in our EHR (eClinicalWorks) to auto-populate the core clinical measures — viral suppression rate, CD4 testing, TB screening. We tracked toward 90% viral suppression using a monthly dashboard I presented to leadership. When we had a reporting discrepancy in our HAB data, I caught it in our pre-submission review, corrected it with documentation, and submitted on time. We got a clean site visit and renewed at the same funding level. The key was making compliance a team habit, not an annual scramble.",
    esStrongAnswerExample: "Gestioné un programa Ryan White Parte C que atendía a 340 pacientes con VIH+. Construí nuestro flujo de trabajo de recopilación de datos UDS en nuestro EHR para poblar automáticamente las medidas clínicas básicas — tasa de supresión viral, pruebas de CD4, detección de TB.",
    redFlags: [
      "No experience with federal grant reporting (UDS, HAB, Title X, HRSA Section 330)",
      "Cannot describe a program dashboard or QI process",
      "Has not managed direct reports or cross-department teams",
    ],
    esRedFlags: [
      "Sin experiencia con informes de subvenciones federales (UDS, HAB, Título X)",
      "No puede describir un panel de programa o proceso de mejora de calidad",
    ],
    followUpQuestions: [
      "How do you handle a situation where program data shows you're not hitting targets mid-year?",
      "Describe your experience with the HRSA Operational Site Visit (OSV) or similar federal compliance review.",
    ],
    esFollowUpQuestions: [
      "¿Cómo manejas una situación en la que los datos del programa muestran que no estás alcanzando los objetivos a mitad de año?",
      "Describe tu experiencia con la Visita al Sitio Operativo (OSV) de HRSA o revisión similar de cumplimiento federal.",
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

  /* ── PROVIDER ROLE GUIDES ─────────────────────────────────────── */
  {
    roleId: "physician",
    roleName: "Physician (MD/DO)",
    esRoleName: "Médico (MD/DO)",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-panel-management",
      "team-provider-supervision",
      "clinical-pps-billing",
      "behavioral-high-volume",
      "situational-workforce-cuts",
    ],
    keyThemes: [
      { en: "Panel management at 1,200–1,800 patients with HEDIS/UDS quality targets", es: "Gestión de panel de 1,200–1,800 pacientes con objetivos de calidad HEDIS/UDS" },
      { en: "Supervising NPs, PAs, and MAs — enabling top-of-license practice", es: "Supervisión de NPs, PAs y MAs — habilitando práctica al más alto nivel" },
      { en: "FQHC PPS billing and qualifying encounter documentation", es: "Facturación PPS de FQHC y documentación de encuentros calificados" },
      { en: "Same-day access, open-access scheduling, walk-in care", es: "Acceso el mismo día, programación de acceso abierto, atención sin cita" },
      { en: "CalAIM / ECM integration and Medi-Cal population health", es: "Integración CalAIM / ECM y salud de población Medi-Cal" },
    ],
    salaryNegotiationTip: {
      en: "FQHC primary care physicians earn $185–260K base in California. Add NHSC loan repayment ($50K/year, tax-free) and the total comp picture is strong. Productivity bonuses are possible but not universal — ask specifically about the model. Internists typically land $190–220K; Family Medicine $185–215K; Pediatricians $180–205K.",
      es: "Los médicos de atención primaria de FQHC ganan $185–260K base en California. Agrega el pago de préstamos NHSC ($50K/año, libre de impuestos) y el cuadro de compensación total es sólido.",
    },
    fqhcSpecificTip: {
      en: "FQHC physician interviews almost always include a case presentation or clinical scenario. Expect to be tested on HEDIS measure gaps, panel management strategy, AND your experience supervising NPs/PAs. Know the difference between FQHC PPS billing and fee-for-service — it will come up. Board certification is typically required (or in-process for recent grads).",
      es: "Las entrevistas de médicos de FQHC casi siempre incluyen una presentación de caso o escenario clínico. Espera ser evaluado en brechas de medidas HEDIS, estrategia de gestión de panel Y tu experiencia supervisando NPs/PAs.",
    },
    interviewFormat: {
      en: "3–4 rounds typical: HR phone screen → Medical Director / Chief Medical Officer interview → panel with clinical lead team (nurses, MAs, BH) → site tour with Chief of Medicine. Credentialing file review begins at offer stage. Expect a quality metrics discussion.",
      es: "3–4 rondas típicas: revisión telefónica de RRHH → entrevista con Director Médico/CMO → panel con equipo clínico → recorrido por el sitio con el Jefe de Medicina. La revisión del expediente de credenciales comienza en la etapa de oferta.",
    },
  },
  {
    roleId: "nurse_practitioner",
    roleName: "Nurse Practitioner (NP / FNP / PMHNP)",
    esRoleName: "Enfermero(a) Practicante (NP / FNP / PMHNP)",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-panel-management",
      "clinical-np-pa-scope",
      "clinical-pps-billing",
      "behavioral-difficult-patient",
      "team-multilingual",
    ],
    keyThemes: [
      { en: "Full-scope NP practice under California law — independent or collaborative?", es: "Práctica NP de alcance completo bajo la ley de California — ¿independiente o colaborativa?" },
      { en: "Panel size (800–1,200) and chronic disease management protocols", es: "Tamaño del panel (800–1,200) y protocolos de manejo de enfermedades crónicas" },
      { en: "Collaborative practice agreement and relationship with physician team", es: "Acuerdo de práctica colaborativa y relación con el equipo médico" },
      { en: "RN co-visit workflows and delegation to MAs", es: "Flujos de trabajo de co-visita de enfermería y delegación a MAs" },
      { en: "Psychiatric NP (PMHNP) — BH integration in primary care", es: "NP Psiquiátrico (PMHNP) — integración de salud conductual en atención primaria" },
    ],
    salaryNegotiationTip: {
      en: "FNPs at CA FQHCs earn $120–155K base. PMHNPs command a premium: $140–175K. With NHSC loan repayment (NPs qualify), your effective comp can reach $170–220K. Most FQHCs include RVU-based productivity incentives — ask how targets are set for NPs vs. MDs.",
      es: "Los FNPs en FQHCs de CA ganan $120–155K base. Los PMHNPs tienen una prima: $140–175K. Con el pago de préstamos NHSC (los NPs califican), tu compensación efectiva puede llegar a $170–220K.",
    },
    fqhcSpecificTip: {
      en: "Know your California NP scope inside and out — prescriptive authority, DEA registration, and the 2023 full-practice authority law. FQHCs vary in how they structure NP-MD collaboration: some have weekly case review, others use formal collaborative practice agreements. Ask directly: 'How do you structure the NP-MD relationship here?' It signals you've done your research.",
      es: "Conoce tu alcance de NP de California de adentro hacia afuera — autoridad prescriptiva, registro DEA y la ley de autoridad de práctica completa de 2023. Los FQHCs varían en cómo estructuran la colaboración NP-MD.",
    },
    interviewFormat: {
      en: "2–3 rounds: HR phone screen → Nurse Practitioner/Medical Director panel → clinical skills discussion. May include a chart review exercise or case scenario. Reference check includes former collaborating physicians.",
      es: "2–3 rondas: revisión telefónica de RRHH → panel de NP/Director Médico → discusión de habilidades clínicas. Puede incluir un ejercicio de revisión de gráficos o escenario de caso.",
    },
  },
  {
    roleId: "physician_assistant",
    roleName: "Physician Assistant (PA-C)",
    esRoleName: "Asistente del Médico (PA-C)",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-panel-management",
      "clinical-np-pa-scope",
      "clinical-pps-billing",
      "behavioral-high-volume",
      "behavioral-difficult-patient",
    ],
    keyThemes: [
      { en: "PA scope and supervisory physician relationship in CA — formal agreement requirements", es: "Alcance del PA y relación con médico supervisor en CA — requisitos de acuerdo formal" },
      { en: "Same-day access and urgent care management at FQHC", es: "Acceso el mismo día y manejo de atención urgente en FQHC" },
      { en: "Chronic disease panel management and preventive care protocols", es: "Gestión de panel de enfermedades crónicas y protocolos de atención preventiva" },
      { en: "Productivity metrics: wRVU or visit targets, quality measures", es: "Métricas de productividad: objetivos de wRVU o visitas, medidas de calidad" },
      { en: "NHSC loan repayment eligibility (PAs qualify for NHSC)", es: "Elegibilidad para el pago de préstamos NHSC (los PAs califican para NHSC)" },
    ],
    salaryNegotiationTip: {
      en: "PA-Cs at CA FQHCs earn $115–148K base. With NHSC loan repayment ($50K/year tax-free), effective comp reaches $165–198K for qualifying loans. Ask if the FQHC has a formal PA-MD collaboration agreement and what productivity targets are — these affect your day-to-day significantly.",
      es: "Los PA-Cs en FQHCs de CA ganan $115–148K base. Con el pago de préstamos NHSC ($50K/año libre de impuestos), la compensación efectiva alcanza $165–198K.",
    },
    fqhcSpecificTip: {
      en: "In California, PAs require a written Supervision Agreement with their supervising physician. Ask the FQHC specifically: who is the supervising physician, how often do you meet, and what cases require direct sign-off vs. countersignature only? The strongest FQHC PA-MD relationships include weekly chart reviews and clear protocols for escalation — this is what you want to hear in an interview.",
      es: "En California, los PAs requieren un Acuerdo de Supervisión escrito con su médico supervisor. Pregunta específicamente al FQHC: ¿quién es el médico supervisor, con qué frecuencia se reúnen y qué casos requieren firma directa?",
    },
    interviewFormat: {
      en: "2–3 rounds: HR screen → Medical Director or Chief PA interview → panel with clinical team. Expect discussion of PA-specific topics: supervision agreement structure, DEA registration, productivity expectations, and credentialing requirements. References from supervising physicians carry significant weight.",
      es: "2–3 rondas: revisión de RRHH → entrevista con Director Médico o PA Principal → panel con equipo clínico. Espera discusión de temas específicos de PA: estructura del acuerdo de supervisión, registro DEA y expectativas de productividad.",
    },
  },
  {
    roleId: "dentist",
    roleName: "Dentist (DMD/DDS) — FQHC",
    esRoleName: "Dentista (DMD/DDS) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-dentistry-medicaid",
      "clinical-dental-integration",
      "behavioral-difficult-patient",
      "mission-health-equity",
    ],
    keyThemes: [
      { en: "Denti-Cal (Medi-Cal dental) billing, prior auths, and PPS encounter structure", es: "Facturación Denti-Cal (dental Medi-Cal), autorizaciones previas y estructura de encuentros PPS" },
      { en: "Full scope FQHC dentistry — extractions, dentures, pediatric, special needs", es: "Odontología FQHC de alcance completo — extracciones, dentaduras, pediátrico, necesidades especiales" },
      { en: "Oral-systemic integration with medical team (DM-periodontitis, prenatal, BH)", es: "Integración oral-sistémica con el equipo médico (DM-periodontitis, prenatal, BH)" },
      { en: "Trauma-informed care for patients avoiding dental care due to fear or cost", es: "Atención informada en trauma para pacientes que evitan la atención dental por miedo o costo" },
      { en: "Dental assistant supervision, expanded duties DA (EDDA), and dental hygiene collaboration", es: "Supervisión de asistente dental, DA con deberes expandidos (EDDA) y colaboración con higiene dental" },
    ],
    salaryNegotiationTip: {
      en: "FQHC dentists in CA earn $130–195K base. Oral surgeons and pediatric dentists command higher ranges ($155–210K). NHSC loan repayment applies — this is especially valuable for dental school debt ($250K+ common). Ask about productivity bonuses — many FQHCs use a base + production model. Denti-Cal rates are low per procedure but FQHC PPS partially offsets this.",
      es: "Los dentistas de FQHC en CA ganan $130–195K base. Los cirujanos orales y dentistas pediátricos tienen rangos más altos ($155–210K). El pago de préstamos NHSC aplica — esto es especialmente valioso para la deuda de la escuela dental.",
    },
    fqhcSpecificTip: {
      en: "FQHC dental interviews almost always include a patient case scenario testing your approach to a medically complex patient — diabetic with 5+ missing teeth, a patient with serious mental illness, or a child with early childhood caries. Know Denti-Cal covered services and prior auth requirements cold. Ask about the DA team structure — EDDA-certified DAs in California can take impressions, place restorations under supervision, and dramatically increase your throughput.",
      es: "Las entrevistas dentales de FQHC casi siempre incluyen un escenario de caso de paciente que prueba tu enfoque para un paciente médicamente complejo. Conoce los servicios cubiertos de Denti-Cal y los requisitos de autorización previa.",
    },
    interviewFormat: {
      en: "2–3 rounds: HR screen → Dental Director or Chief Dental Officer interview → case scenario discussion and/or clinical skills review. Credentialing file review begins at offer (DEA, California dental license, NPI, malpractice history). Some FQHCs require a half-day working interview.",
      es: "2–3 rondas: revisión de RRHH → entrevista con Director Dental → discusión de escenario de caso y/o revisión de habilidades clínicas. La revisión del expediente de credenciales comienza en la oferta (DEA, licencia dental de California, NPI).",
    },
  },

  /* ─── DENTAL ASSISTANT ─────────────────────────────────────────── */
  {
    roleId: "dental_assistant",
    roleName: "Dental Assistant (RDA/EDDA) — FQHC",
    esRoleName: "Asistente Dental (RDA/EDDA) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-da-four-handed",
      "behavioral-difficult-patient",
      "mission-health-equity",
      "team-multilingual",
    ],
    keyThemes: [
      { en: "Four-handed dentistry and operatory turnover efficiency", es: "Odontología a cuatro manos y eficiencia en la rotación de operatorias" },
      { en: "Denti-Cal patient workflows and prior authorization support", es: "Flujos de trabajo con pacientes Denti-Cal y apoyo en autorizaciones previas" },
      { en: "EDDA scope — expanded duties and what requires dentist supervision", es: "Alcance EDDA — deberes expandidos y qué requiere supervisión del dentista" },
      { en: "Infection control (OSHA, CDPH, CDCPH dental sterilization protocols)", es: "Control de infecciones (OSHA, protocolos de esterilización dental)" },
      { en: "Trauma-informed care for anxious or first-time dental patients", es: "Atención informada en trauma para pacientes ansiosos o de primera visita dental" },
    ],
    salaryNegotiationTip: {
      en: "FQHC dental assistants in CA earn $22–32/hr. EDDA-certified DAs earn $26–35/hr — the expanded duties certification is worth $3–5/hr more. Ask about Denti-Cal billing training, EDDA sponsorship, and whether the clinic offers dental benefits for your own family.",
      es: "Los asistentes dentales de FQHC en CA ganan $22–32/hr. Los DA con certificación EDDA ganan $26–35/hr — la certificación de deberes expandidos vale $3–5/hr más.",
    },
    fqhcSpecificTip: {
      en: "FQHC dental is full-scope — extractions, pediatric, dentures, special needs, and increasingly oral surgery. Know how to assist for all procedure types, not just restorations. Most FQHC dental interviews include a practical or skills walk-through. Be ready to describe your sterilization protocol step by step — infection control is always tested.",
      es: "La odontología de FQHC es de alcance completo — extracciones, pediátrico, dentaduras, necesidades especiales. Conoce cómo asistir en todos los tipos de procedimientos, no solo restauraciones. La mayoría de las entrevistas dentales de FQHC incluyen una evaluación práctica.",
    },
    interviewFormat: {
      en: "1–2 rounds: HR screen + working interview in clinic. You may be asked to set up a tray for a specific procedure, demonstrate sterilization protocol, or assist during an actual patient appointment (with patient consent). EDDA certification is strongly preferred — bring documentation.",
      es: "1–2 rondas: revisión de RRHH + entrevista de trabajo en clínica. Es posible que te pidan configurar una bandeja para un procedimiento específico, demostrar el protocolo de esterilización o asistir durante una cita real de paciente.",
    },
  },

  /* ─── DENTAL HYGIENIST ─────────────────────────────────────────── */
  {
    roleId: "dental_hygienist",
    roleName: "Dental Hygienist (RDH) — FQHC",
    esRoleName: "Higienista Dental (RDH) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-dh-perio",
      "mission-health-equity",
      "behavioral-difficult-patient",
      "team-multilingual",
    ],
    keyThemes: [
      { en: "Periodontal disease management in underserved, high-acuity populations", es: "Manejo de la enfermedad periodontal en poblaciones desatendidas de alta agudeza" },
      { en: "Oral-systemic integration — diabetes, pregnancy, cardiovascular, BH", es: "Integración oral-sistémica — diabetes, embarazo, cardiovascular, salud conductual" },
      { en: "Trauma-informed patient education and barrier exploration", es: "Educación del paciente informada en trauma y exploración de barreras" },
      { en: "Alternative Practice Dental Hygienist (APDH) scope in California", es: "Alcance del Higienista Dental de Práctica Alternativa (APDH) en California" },
      { en: "Fluoride varnish, sealants, and preventive care in school-based or mobile programs", es: "Barniz de flúor, selladores y atención preventiva en programas escolares o móviles" },
    ],
    salaryNegotiationTip: {
      en: "FQHC RDHs in CA earn $42–62/hr. RDHs with APDH certification can work with greater autonomy and are worth more — ask about alternative practice opportunities (school-based, mobile, community events). FQHCs often offer student loan assistance programs that effectively raise total comp.",
      es: "Los RDH de FQHC en CA ganan $42–62/hr. Los RDH con certificación APDH pueden trabajar con mayor autonomía y valen más — pregunta sobre oportunidades de práctica alternativa.",
    },
    fqhcSpecificTip: {
      en: "FQHC hygiene interviews will probe your trauma-informed approach more than your clinical skills. Your ability to meet patients where they are — whether they haven't seen a dentist in 10 years or have severe dental anxiety — is the differentiator. Know Denti-Cal covered hygiene services (SRP, limited and periodic exams, x-rays) and prior auth requirements. If you speak Spanish, lead with it.",
      es: "Las entrevistas de higiene de FQHC explorarán tu enfoque informado en trauma más que tus habilidades clínicas. Tu capacidad para encontrar a los pacientes donde están — ya sea que no hayan visto a un dentista en 10 años o tengan ansiedad dental severa — es el diferenciador.",
    },
    interviewFormat: {
      en: "1–2 rounds: HR screen + clinical interview with Dental Director or Lead RDH. Be prepared to discuss patient case scenarios (complex perio, medically compromised patients). Some FQHCs conduct working interviews. Bring your California RDH license and any additional certifications (local anesthesia, nitrous oxide, APDH).",
      es: "1–2 rondas: revisión de RRHH + entrevista clínica con el Director Dental o RDH Principal. Prepárate para discutir escenarios de casos de pacientes. Algunos FQHCs realizan entrevistas de trabajo. Trae tu licencia de RDH de California.",
    },
  },

  /* ─── PHARMACIST ───────────────────────────────────────────────── */
  {
    roleId: "pharmacist",
    roleName: "Pharmacist (PharmD) — FQHC",
    esRoleName: "Farmacéutico(a) (PharmD) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-pharmacist-340b",
      "mission-health-equity",
      "behavioral-difficult-patient",
      "behavioral-high-volume",
    ],
    keyThemes: [
      { en: "340B drug pricing program — covered entity compliance, split billing, audit readiness", es: "Programa de precio de medicamentos 340B — cumplimiento de entidad cubierta, facturación dividida, preparación para auditorías" },
      { en: "Medication therapy management (MTM) for complex chronic disease patients", es: "Gestión de terapia de medicamentos (MTM) para pacientes con enfermedades crónicas complejas" },
      { en: "Medi-Cal formulary and prior authorization workflows", es: "Formulario Medi-Cal y flujos de trabajo de autorización previa" },
      { en: "Adherence counseling for LEP patients with cost and literacy barriers", es: "Consejería de adherencia para pacientes LEP con barreras de costo y alfabetización" },
      { en: "Collaborative practice agreements with FQHC providers (pharmacist-managed clinics)", es: "Acuerdos de práctica colaborativa con proveedores de FQHC (clínicas gestionadas por farmacéuticos)" },
    ],
    salaryNegotiationTip: {
      en: "FQHC pharmacists in CA earn $130–165K. Many FQHCs have collaborative practice agreements that allow pharmacist-managed hypertension, diabetes, and anticoagulation clinics — which significantly expand your scope and career growth. Ask specifically about 340B program savings and whether the pharmacy has a TPA relationship (Sentry, Macro Helix, etc.).",
      es: "Los farmacéuticos de FQHC en CA ganan $130–165K. Muchos FQHCs tienen acuerdos de práctica colaborativa que permiten clínicas gestionadas por farmacéuticos para hipertensión, diabetes y anticoagulación.",
    },
    fqhcSpecificTip: {
      en: "340B compliance is the highest-leverage skill you bring. If you've managed a 340B program — eligibility files, duplicate discount prevention, contract pharmacy relationships — lead with it. FQHCs depend on 340B savings to fund PAPs (patient assistance programs) for insulin, biologics, and HIV medications. Your knowledge of 340B directly affects patient access to medications.",
      es: "El cumplimiento 340B es la habilidad de mayor apalancamiento que traes. Si has gestionado un programa 340B — archivos de elegibilidad, prevención de descuentos duplicados, relaciones de farmacia contratada — lidera con eso.",
    },
    interviewFormat: {
      en: "2 rounds: HR screen → Pharmacy Director or CMO interview. Expect detailed questions on 340B, Medi-Cal formulary navigation, and your approach to patient counseling for complex regimens. A case scenario involving a Medi-Cal patient with multiple chronic conditions and medication access barriers is common.",
      es: "2 rondas: revisión de RRHH → entrevista con el Director de Farmacia o CMO. Espera preguntas detalladas sobre 340B, navegación del formulario Medi-Cal y tu enfoque para la consejería de pacientes.",
    },
  },

  /* ─── PHARMACY TECHNICIAN ──────────────────────────────────────── */
  {
    roleId: "pharmacy_technician",
    roleName: "Pharmacy Technician (CPhT) — FQHC",
    esRoleName: "Técnico de Farmacia (CPhT) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-pharmacist-340b",
      "behavioral-difficult-patient",
      "team-multilingual",
      "behavioral-high-volume",
    ],
    keyThemes: [
      { en: "340B dispensing workflows and patient eligibility verification at point of sale", es: "Flujos de trabajo de dispensación 340B y verificación de elegibilidad del paciente en el punto de venta" },
      { en: "Medi-Cal claim submission, rejection resolution, and PA support", es: "Presentación de reclamaciones Medi-Cal, resolución de rechazos y soporte de PA" },
      { en: "High-volume dispensing accuracy and prescription verification processes", es: "Precisión de dispensación de alto volumen y procesos de verificación de recetas" },
      { en: "Patient assistance program (PAP) enrollment and medication access navigation", es: "Inscripción en programas de asistencia al paciente (PAP) y navegación de acceso a medicamentos" },
      { en: "Bilingual pharmacy counseling support for LEP patients", es: "Soporte de consejería farmacéutica bilingüe para pacientes LEP" },
    ],
    salaryNegotiationTip: {
      en: "FQHC pharmacy techs in CA earn $20–30/hr. CPhT certification adds $2–4/hr. Immunization administration certification is increasingly required and adds value. Ask about advancement pathways — some FQHCs support techs pursuing PharmD programs.",
      es: "Los técnicos de farmacia de FQHC en CA ganan $20–30/hr. La certificación CPhT agrega $2–4/hr. La certificación de administración de inmunizaciones es cada vez más requerida y agrega valor.",
    },
    fqhcSpecificTip: {
      en: "FQHC pharmacy techs handle Medi-Cal rejections daily — 'NDC not covered,' 'quantity limit exceeded,' 'prior authorization required.' Know the basic rejection codes and the process for escalating to pharmacist or initiating a PA request. If you're bilingual, highlight it — patient-facing pharmacy work in FQHCs is often the first touchpoint for LEP patients navigating their prescriptions.",
      es: "Los técnicos de farmacia de FQHC manejan rechazos de Medi-Cal diariamente — 'NDC no cubierto,' 'límite de cantidad excedido,' 'autorización previa requerida.' Conoce los códigos de rechazo básicos y el proceso para escalar al farmacéutico.",
    },
    interviewFormat: {
      en: "1–2 rounds: HR screen + working interview in pharmacy. Expect to demonstrate dispensing workflow knowledge, Medi-Cal billing basics, and 340B eligibility checking. California requires CPhT registration with the Board of Pharmacy — bring documentation.",
      es: "1–2 rondas: revisión de RRHH + entrevista de trabajo en farmacia. Espera demostrar conocimiento del flujo de trabajo de dispensación, conceptos básicos de facturación Medi-Cal y verificación de elegibilidad 340B.",
    },
  },

  /* ─── HEALTH ENROLLMENT NAVIGATOR ─────────────────────────────── */
  {
    roleId: "health_enrollment_navigator",
    roleName: "Health Enrollment Navigator — FQHC",
    esRoleName: "Navegador(a) de Inscripción en Salud — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-navigator-calAIM",
      "mission-health-equity",
      "team-multilingual",
      "behavioral-difficult-patient",
    ],
    keyThemes: [
      { en: "Full-scope vs. restricted Medi-Cal — income, documentation status, age thresholds", es: "Medi-Cal de alcance completo vs. restringido — ingresos, estado de documentación, umbrales de edad" },
      { en: "Covered California income eligibility and special enrollment periods", es: "Elegibilidad de ingresos de Covered California y períodos de inscripción especial" },
      { en: "CalAIM Community Supports and ECM enrollment trigger criteria", es: "Apoyos Comunitarios CalAIM y criterios desencadenantes de inscripción en ECM" },
      { en: "Undocumented patient navigation — PCIP, county indigent programs, RW, restricted Medi-Cal", es: "Navegación para pacientes indocumentados — PCIP, programas indigentes del condado, Ryan White, Medi-Cal restringido" },
      { en: "Bilingual enrollment counseling and interpretation for LEP patients", es: "Consejería de inscripción bilingüe e interpretación para pacientes LEP" },
    ],
    salaryNegotiationTip: {
      en: "FQHC enrollment navigators in CA earn $22–34/hr. Certified Application Assistants (CAA) for Covered California earn at the top of the range. If you're bilingual and can assist Spanish-speaking patients end-to-end without an interpreter, that's worth $2–4/hr more. Ask about advancement to care coordination or ECM roles — enrollment is often the entry point to a case management career ladder.",
      es: "Los navegadores de inscripción de FQHC en CA ganan $22–34/hr. Los Asistentes de Solicitud Certificados (CAA) para Covered California ganan en la parte superior del rango.",
    },
    fqhcSpecificTip: {
      en: "Know the immigration/documentation eligibility matrix cold: under 26 full-scope Medi-Cal (since Jan 2024), over 26 = restricted-scope only for undocumented, over 65 = full-scope Medi-Cal regardless of status (since May 2023). County programs vary — in LA, My Health LA; in SF, Healthy SF. If you don't know the matrix, you'll leave patients uninsured who could have coverage. This question will be on every FQHC enrollment navigator interview.",
      es: "Conoce la matriz de elegibilidad de inmigración/documentación: menores de 26 años Medi-Cal de alcance completo (desde enero 2024), mayores de 26 = solo alcance restringido para indocumentados, mayores de 65 = Medi-Cal de alcance completo independientemente del estatus (desde mayo 2023).",
    },
    interviewFormat: {
      en: "1–2 rounds: HR screen + panel interview with care coordination or patient services team. Expect a patient scenario where you walk through enrollment for a complex case (undocumented, limited English, chronic condition). Covered California CAA certification is often required or preferred — bring proof if you have it.",
      es: "1–2 rondas: revisión de RRHH + entrevista en panel con el equipo de coordinación de atención o servicios al paciente. Espera un escenario de paciente donde recorras la inscripción para un caso complejo.",
    },
  },

  /* ─── LVN ─────────────────────────────────────────────────────── */
  {
    roleId: "lvn",
    roleName: "Licensed Vocational Nurse (LVN) — FQHC",
    esRoleName: "Enfermero(a) Vocacional Licenciado(a) (LVN) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-lvn-scope",
      "clinical-ehr",
      "behavioral-high-volume",
      "team-multilingual",
    ],
    keyThemes: [
      { en: "LVN scope of practice in California — assessments, medications, IV therapy, wound care", es: "Alcance de práctica de LVN en California — evaluaciones, medicamentos, terapia IV, cuidado de heridas" },
      { en: "Working under RN/provider supervision in a primary care FQHC team model", es: "Trabajar bajo supervisión de RN/proveedor en un modelo de equipo de atención primaria FQHC" },
      { en: "Chronic disease management protocols — DM, HTN, asthma standing orders", es: "Protocolos de gestión de enfermedades crónicas — DM, HTN, asma órdenes permanentes" },
      { en: "High-volume rooming, vital signs, and patient intake workflow efficiency", es: "Habilitación de habitaciones de alto volumen, signos vitales y eficiencia del flujo de trabajo de admisión de pacientes" },
      { en: "EHR documentation — OCHIN Epic or eClinicalWorks charting", es: "Documentación EHR — registro en OCHIN Epic o eClinicalWorks" },
    ],
    salaryNegotiationTip: {
      en: "FQHC LVNs in CA earn $26–40/hr. IV Therapy certified LVNs earn more. With SB 525, FQHC LVN wages must reach $25/hr minimum by 2027 — most are already there. Ask about LVN-to-RN bridge program tuition support — many FQHCs sponsor staff through RN programs, which dramatically increases your long-term earning potential.",
      es: "Los LVN de FQHC en CA ganan $26–40/hr. Los LVN con certificación de terapia IV ganan más. Con SB 525, los salarios de LVN de FQHC deben alcanzar un mínimo de $25/hr para 2027.",
    },
    fqhcSpecificTip: {
      en: "FQHC LVN interviews will test your understanding of when to escalate to an RN vs. when you can proceed independently. The critical distinction in California: LVNs conduct 'data collection' — they can take history and record symptoms. RNs conduct the 'nursing assessment' — analysis and clinical judgment. Know this distinction precisely. Also know that in FQHC team care models, LVNs often have deeper patient relationships than any other clinician — you're the face of continuity.",
      es: "Las entrevistas de LVN de FQHC evaluarán tu comprensión de cuándo escalar a un RN vs. cuándo puedes proceder de forma independiente. La distinción crítica en California: los LVN realizan 'recopilación de datos' — pueden tomar historial y registrar síntomas. Los RN realizan la 'evaluación de enfermería'.",
    },
    interviewFormat: {
      en: "1–2 rounds: HR screen + clinical supervisor interview. Expect questions on scope of practice, specific clinical scenarios (vital sign abnormality, patient in distress, medication question), and EHR experience. Some FQHCs conduct a brief skills check (blood pressure, documentation). Bring your California LVN license.",
      es: "1–2 rondas: revisión de RRHH + entrevista con supervisor clínico. Espera preguntas sobre el alcance de práctica, escenarios clínicos específicos y experiencia en EHR. Algunos FQHCs realizan una breve verificación de habilidades.",
    },
  },

  /* ─── PSYCHIATRIC NP ────────────────────────────────────────────── */
  {
    roleId: "psychiatric_np",
    roleName: "Psychiatric Mental Health NP (PMHNP) — FQHC",
    esRoleName: "NP de Salud Mental Psiquiátrica (PMHNP) — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-pnp-collaborative-care",
      "mission-health-equity",
      "behavioral-difficult-patient",
      "clinical-np-pa-scope",
    ],
    keyThemes: [
      { en: "Collaborative Care Model (CoCM) integration with primary care team", es: "Integración del Modelo de Atención Colaborativa (CoCM) con el equipo de atención primaria" },
      { en: "OUD treatment — buprenorphine prescribing (DEA X-waiver / DATA 2000)", es: "Tratamiento de OUD — prescripción de buprenorfina (exención DEA X / DATA 2000)" },
      { en: "Trauma-informed care for complex trauma, ACEs, and co-occurring disorders", es: "Atención informada en trauma para trauma complejo, ACEs y trastornos concurrentes" },
      { en: "Brief psychiatric assessment in integrated primary care — 20-30 min visits", es: "Evaluación psiquiátrica breve en atención primaria integrada — visitas de 20-30 min" },
      { en: "Involuntary psychiatric holds (5150) — recognition, initiation, and documentation", es: "Retenciones psiquiátricas involuntarias (5150) — reconocimiento, iniciación y documentación" },
    ],
    salaryNegotiationTip: {
      en: "FQHC PMHNPs in CA earn $130–175K. Buprenorphine prescribing authority (X-waiver) adds value — mention it upfront. NHSC loan repayment applies (PMHNPs qualify as mental health providers). Some FQHCs offer productivity bonuses tied to visit volume and PHQ-9/GAD-7 outcome improvement rates.",
      es: "Los PMHNP de FQHC en CA ganan $130–175K. La autoridad de prescripción de buprenorfina (exención X) agrega valor — menciónala desde el principio. El pago de préstamos NHSC aplica.",
    },
    fqhcSpecificTip: {
      en: "The highest-value PMHNP for an FQHC is one who can operate in an integrated primary care model — brief consultations, warm handoffs from PCPs, same-day crisis response — not one who only does traditional 50-minute psychiatry appointments. Demonstrate your comfort with the CoCM model and brief intervention. If you don't have X-waiver for buprenorphine, get it before your interviews — the FQHC sector desperately needs it.",
      es: "El PMHNP de mayor valor para un FQHC es el que puede operar en un modelo de atención primaria integrada — consultas breves, transferencias directas de PCPs, respuesta a crisis el mismo día — no el que solo hace citas de psiquiatría tradicionales de 50 minutos.",
    },
    interviewFormat: {
      en: "2–3 rounds: HR screen → CMO or Medical Director interview → panel with BH team. Expect clinical vignettes (agitated patient in waiting room, patient with psychosis and no housing, OUD patient requesting buprenorphine). California NP practice requires a standardized procedure or practice agreement — ask about the FQHC's structure. Bring DEA certificate, NP license, APRN certifications.",
      es: "2–3 rondas: revisión de RRHH → entrevista con CMO o Director Médico → panel con el equipo de BH. Espera viñetas clínicas (paciente agitado en sala de espera, paciente con psicosis sin vivienda, paciente con OUD solicitando buprenorfina).",
    },
  },

  /* ─── PROGRAM MANAGER ─────────────────────────────────────────── */
  {
    roleId: "program_manager",
    roleName: "Program Manager — FQHC",
    esRoleName: "Gerente de Programa — FQHC",
    topQuestions: [
      "mission-why-fqhc",
      "clinical-pgm-grant-compliance",
      "behavioral-high-volume",
      "behavioral-difficult-patient",
      "mission-health-equity",
    ],
    keyThemes: [
      { en: "Federal grant compliance — UDS reporting, HRSA OSV preparation, HAB, Title X, Ryan White", es: "Cumplimiento de subvenciones federales — informes UDS, preparación para OSV de HRSA, HAB, Título X, Ryan White" },
      { en: "Program implementation and multi-disciplinary team management", es: "Implementación de programas y gestión de equipos multidisciplinarios" },
      { en: "Data collection and dashboard design for quality improvement", es: "Recopilación de datos y diseño de paneles para mejora de calidad" },
      { en: "Community health needs assessments (CHNA) and program design", es: "Evaluaciones de necesidades de salud comunitaria (CHNA) y diseño de programas" },
      { en: "Budget management for grant-funded programs — spending pace, restrictions, modification requests", es: "Gestión presupuestaria para programas financiados con subvenciones — ritmo de gasto, restricciones, solicitudes de modificación" },
    ],
    salaryNegotiationTip: {
      en: "FQHC program managers in CA earn $65–90K. Those managing large federal grants ($1M+) or multiple programs earn $80–100K+. Highlight the total dollar value of grants you've managed — this is how they evaluate scope. MPH, MPA, or MHA significantly strengthens your candidacy and justifies higher compensation.",
      es: "Los gerentes de programa de FQHC en CA ganan $65–90K. Los que gestionan subvenciones federales grandes ($1M+) o múltiples programas ganan $80–100K+.",
    },
    fqhcSpecificTip: {
      en: "FQHCs live and die by federal compliance. The HRSA Operational Site Visit (OSV) is the most consequential event for FQHC operations — a 'deficiency' can trigger corrective action or funding reduction. If you've been through an OSV — or better yet, led the preparation — say so prominently. Also know UDS reporting: it's not just a compliance exercise, it's how the sector demonstrates its value to Congress and HRSA to justify the next appropriation.",
      es: "Los FQHCs viven y mueren por el cumplimiento federal. La Visita al Sitio Operativo (OSV) de HRSA es el evento más importante para las operaciones de FQHC. Si has pasado por una OSV — o mejor aún, liderado la preparación — menciónalo prominentemente.",
    },
    interviewFormat: {
      en: "2–3 rounds: HR screen → Director of Programs or COO interview → panel with clinical and administrative leadership. Expect questions on grant management experience, data tools (Excel, REDCap, EHR reporting), and a scenario where a program is underperforming mid-year. Be ready to present a program you've managed — scope, budget, key results, lessons learned.",
      es: "2–3 rondas: revisión de RRHH → entrevista con el Director de Programas o COO → panel con liderazgo clínico y administrativo. Espera preguntas sobre experiencia en gestión de subvenciones, herramientas de datos y un escenario donde un programa está por debajo del rendimiento.",
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
