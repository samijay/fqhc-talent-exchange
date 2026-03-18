/* ------------------------------------------------------------------ */
/*  Role-Specific Behavioral Assessment Questions                      */
/*  180 questions: 15 per role × 12 FQHC roles (3 per domain × 5)    */
/* ------------------------------------------------------------------ */

import type { AssessmentQuestion } from "./career-assessment-engine";

export type RoleId =
  | "chw"
  | "care_coordinator"
  | "medical_assistant"
  | "case_manager"
  | "behavioral_health"
  | "registered_nurse"
  | "patient_services"
  | "revenue_cycle"
  | "hr_manager"
  | "accountant"
  | "payroll_specialist"
  | "finance_manager"
  | "compliance_officer"
  | "compliance_analyst";

export const ROLE_SPECIFIC_QUESTIONS: (AssessmentQuestion & { roleId: RoleId })[] = [
  /* ================================================================ */
  /*  CHW (Community Health Worker)                                    */
  /* ================================================================ */

  // CHW - Mission
  {
    id: "rs_chw_mission",
    roleId: "chw",
    domain: "mission",
    scenario:
      "You're doing door-to-door outreach in a neighborhood where residents are skeptical of health programs. A family opens the door but immediately says, 'We don't need anything from you people — last time someone came here they just wanted our information.'",
    esScenario:
      "Estás haciendo alcance comunitario puerta a puerta en un vecindario donde los residentes desconfían de los programas de salud. Una familia abre la puerta pero inmediatamente dice: 'No necesitamos nada de ustedes — la última vez que alguien vino aquí solo quería nuestra información.'",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_chw_m_a",
        text: "Acknowledge their past experience, introduce yourself as a community member — not a salesperson — share your own story of why you do this work, and offer to leave information they can review on their own terms",
        esText: "Reconocer su experiencia pasada, presentarte como miembro de la comunidad — no como vendedor — compartir tu propia historia de por qué haces este trabajo, y ofrecer dejar información que puedan revisar en sus propios términos",
        score: 4,
        behaviorTag: "trust-builder",
      },
      {
        id: "rs_chw_m_b",
        text: "Respect their hesitation, briefly explain what services are available, leave a flyer with your personal number, and make a note to follow up in a few weeks",
        esText: "Respetar su vacilación, explicar brevemente qué servicios están disponibles, dejar un folleto con tu número personal, y anotar para dar seguimiento en unas semanas",
        score: 3,
        behaviorTag: "persistent-respectful",
      },
      {
        id: "rs_chw_m_c",
        text: "Thank them for their time, leave a flyer, and move on to the next house",
        esText: "Agradecerles por su tiempo, dejar un folleto, y pasar a la siguiente casa",
        score: 2,
        behaviorTag: "transactional",
      },
      {
        id: "rs_chw_m_d",
        text: "Accept their refusal and cross them off your list — you can't force people to accept help",
        esText: "Aceptar su rechazo y tacharlos de tu lista — no puedes forzar a la gente a aceptar ayuda",
        score: 1,
        behaviorTag: "easily-deterred",
      },
    ],
  },

  // CHW - People
  {
    id: "rs_chw_people",
    roleId: "chw",
    domain: "people",
    scenario:
      "An elderly patient you visit regularly wants to manage their diabetes with traditional remedies instead of insulin. Their adult children are upset and insist you 'make them' follow the doctor's orders.",
    esScenario:
      "Un paciente anciano que visitas regularmente quiere manejar su diabetes con remedios tradicionales en lugar de insulina. Sus hijos adultos están molestos e insisten en que lo 'obligues' a seguir las órdenes del médico.",
    question: "How do you navigate this conflict?",
    esQuestion: "¿Cómo manejas este conflicto?",
    options: [
      {
        id: "rs_chw_p_a",
        text: "Facilitate a family conversation where the patient's autonomy is respected, explore whether traditional remedies can complement (not replace) medical treatment, and connect them with a culturally sensitive provider",
        esText: "Facilitar una conversación familiar donde se respete la autonomía del paciente, explorar si los remedios tradicionales pueden complementar (no reemplazar) el tratamiento médico, y conectarlos con un proveedor culturalmente sensible",
        score: 4,
        behaviorTag: "culturally-bridging",
      },
      {
        id: "rs_chw_p_b",
        text: "Listen to both sides, reinforce the importance of the treatment plan, and report the situation to the care team so they can follow up clinically",
        esText: "Escuchar a ambas partes, reforzar la importancia del plan de tratamiento, y reportar la situación al equipo de atención para que puedan dar seguimiento clínico",
        score: 3,
        behaviorTag: "team-connector",
      },
      {
        id: "rs_chw_p_c",
        text: "Side with the adult children and firmly explain to the patient why they need to follow the prescribed treatment",
        esText: "Ponerse del lado de los hijos adultos y explicar firmemente al paciente por qué necesita seguir el tratamiento prescrito",
        score: 2,
        behaviorTag: "directive",
      },
      {
        id: "rs_chw_p_d",
        text: "Tell the family it's not your role to make medical decisions and that they need to talk to the doctor",
        esText: "Decirle a la familia que no es tu rol tomar decisiones médicas y que necesitan hablar con el doctor",
        score: 1,
        behaviorTag: "deflecting",
      },
    ],
  },

  // CHW - Execution
  {
    id: "rs_chw_execution",
    roleId: "chw",
    domain: "execution",
    scenario:
      "During a home visit, you discover your patient is living in unsafe conditions — black mold, no running water, and extension cords used dangerously. The patient hasn't mentioned any of this to their care team.",
    esScenario:
      "Durante una visita domiciliaria, descubres que tu paciente vive en condiciones inseguras — moho negro, sin agua corriente, y cables de extensión usados peligrosamente. El paciente no ha mencionado nada de esto a su equipo de atención.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_chw_e_a",
        text: "Document the conditions with the patient's permission, immediately contact your care team and supervisor, research housing assistance and tenant rights resources, and create a safety action plan with the patient before you leave",
        esText: "Documentar las condiciones con el permiso del paciente, contactar inmediatamente a tu equipo de atención y supervisor, investigar recursos de asistencia de vivienda y derechos del inquilino, y crear un plan de acción de seguridad con el paciente antes de irte",
        score: 4,
        behaviorTag: "comprehensive-responder",
      },
      {
        id: "rs_chw_e_b",
        text: "Talk to the patient about the dangers, report the housing conditions to your supervisor, and connect them with 211 or local housing resources",
        esText: "Hablar con el paciente sobre los peligros, reportar las condiciones de vivienda a tu supervisor, y conectarlos con 211 o recursos locales de vivienda",
        score: 3,
        behaviorTag: "responsive",
      },
      {
        id: "rs_chw_e_c",
        text: "Note the conditions in your visit report and bring it up at your next team meeting",
        esText: "Anotar las condiciones en tu informe de visita y mencionarlo en tu próxima reunión de equipo",
        score: 2,
        behaviorTag: "delayed-responder",
      },
      {
        id: "rs_chw_e_d",
        text: "Focus on the health-related reason for your visit — housing issues are outside your scope of practice",
        esText: "Enfocarte en la razón de salud de tu visita — los problemas de vivienda están fuera de tu ámbito de práctica",
        score: 1,
        behaviorTag: "scope-limited",
      },
    ],
  },

  // CHW - Growth
  {
    id: "rs_chw_growth",
    roleId: "chw",
    domain: "growth",
    scenario:
      "New CalAIM requirements have changed how you document outreach encounters. The new system requires detailed SDOH screenings, goal-setting documentation, and outcome tracking. Your colleagues are struggling too, and the learning curve is steep.",
    esScenario:
      "Los nuevos requisitos de CalAIM han cambiado cómo documentas tus encuentros de alcance comunitario. El nuevo sistema requiere evaluaciones detalladas de SDOH, documentación de metas, y seguimiento de resultados. Tus colegas también están luchando, y la curva de aprendizaje es empinada.",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_chw_g_a",
        text: "Dedicate extra time to master the new requirements, create personal cheat sheets, offer to partner with a colleague to practice together, and view this as a chance to elevate your professional skills",
        esText: "Dedicar tiempo extra para dominar los nuevos requisitos, crear hojas de referencia personales, ofrecer asociarte con un colega para practicar juntos, y ver esto como una oportunidad de elevar tus habilidades profesionales",
        score: 4,
        behaviorTag: "proactive-learner",
      },
      {
        id: "rs_chw_g_b",
        text: "Follow the training materials closely, ask questions when stuck, and give yourself grace during the transition period",
        esText: "Seguir los materiales de entrenamiento de cerca, hacer preguntas cuando te atascas, y darte gracia durante el período de transición",
        score: 3,
        behaviorTag: "steady-adapter",
      },
      {
        id: "rs_chw_g_c",
        text: "Do the minimum to comply but voice frustration to leadership about how the new requirements take time away from actual patient care",
        esText: "Hacer lo mínimo para cumplir pero expresar frustración a los líderes sobre cómo los nuevos requisitos quitan tiempo de la atención real al paciente",
        score: 2,
        behaviorTag: "reluctant-complier",
      },
      {
        id: "rs_chw_g_d",
        text: "Continue documenting the way you're comfortable with and hope the requirements change or get simplified",
        esText: "Continuar documentando de la forma en que te sientes cómodo/a y esperar que los requisitos cambien o se simplifiquen",
        score: 1,
        behaviorTag: "change-resistant",
      },
    ],
  },

  /* ================================================================ */
  /*  Care Coordinator                                                 */
  /* ================================================================ */

  // Care Coordinator - Mission
  {
    id: "rs_cc_mission",
    roleId: "care_coordinator",
    domain: "mission",
    scenario:
      "Your ECM enrollment targets are behind schedule and leadership is pressuring you to rush enrollments. You know that rushing means patients won't get proper needs assessments and some may not truly qualify for ECM — but your metrics review is next week.",
    esScenario:
      "Tus metas de inscripción de ECM están atrasadas y el liderazgo te presiona para apresurar las inscripciones. Sabes que apresurarse significa que los pacientes no recibirán evaluaciones de necesidades adecuadas y algunos podrían no calificar realmente para ECM — pero tu revisión de métricas es la próxima semana.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_cc_m_a",
        text: "Have an honest conversation with leadership about why proper assessments matter for patient outcomes and program integrity, propose a realistic timeline to get back on track, and document your rationale",
        esText: "Tener una conversación honesta con el liderazgo sobre por qué las evaluaciones adecuadas importan para los resultados de los pacientes y la integridad del programa, proponer un cronograma realista para ponerse al día, y documentar tu razonamiento",
        score: 4,
        behaviorTag: "integrity-driven",
      },
      {
        id: "rs_cc_m_b",
        text: "Speed up the enrollment process where you can without cutting corners on clinical assessments, and ask for temporary help to meet targets",
        esText: "Acelerar el proceso de inscripción donde puedas sin tomar atajos en las evaluaciones clínicas, y pedir ayuda temporal para cumplir las metas",
        score: 3,
        behaviorTag: "balanced-pragmatist",
      },
      {
        id: "rs_cc_m_c",
        text: "Rush through the enrollments to meet your numbers — you can always reassess patients later",
        esText: "Apresurar las inscripciones para cumplir tus números — siempre puedes reevaluar a los pacientes después",
        score: 2,
        behaviorTag: "metrics-driven",
      },
      {
        id: "rs_cc_m_d",
        text: "Comply with the pressure and enroll quickly — if leadership wants it this way, that's their call",
        esText: "Cumplir con la presión e inscribir rápido — si el liderazgo lo quiere así, es su decisión",
        score: 1,
        behaviorTag: "compliance-over-quality",
      },
    ],
  },

  // Care Coordinator - People
  {
    id: "rs_cc_people",
    roleId: "care_coordinator",
    domain: "people",
    scenario:
      "You've developed a comprehensive care plan for a complex patient with co-occurring diabetes and depression. During the interdisciplinary huddle, the PCP dismisses your recommendations, saying 'I've been treating this patient for years — just focus on scheduling their appointments.'",
    esScenario:
      "Has desarrollado un plan de atención integral para un paciente complejo con diabetes y depresión coexistentes. Durante la reunión interdisciplinaria, el médico de cabecera desestima tus recomendaciones, diciendo 'He estado tratando a este paciente durante años — solo enfócate en programar sus citas.'",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_cc_p_a",
        text: "Calmly acknowledge the provider's experience with the patient, then present specific data points from your assessments that support your recommendations — frame it as complementing their clinical knowledge with your community-level insights",
        esText: "Reconocer con calma la experiencia del proveedor con el paciente, luego presentar datos específicos de tus evaluaciones que respalden tus recomendaciones — enmarcarlo como complementar su conocimiento clínico con tus percepciones a nivel comunitario",
        score: 4,
        behaviorTag: "assertive-collaborator",
      },
      {
        id: "rs_cc_p_b",
        text: "Accept the feedback in the meeting, then follow up one-on-one with the PCP to share your concerns and evidence in a less public setting",
        esText: "Aceptar la retroalimentación en la reunión, luego dar seguimiento a solas con el médico para compartir tus preocupaciones y evidencia en un entorno menos público",
        score: 3,
        behaviorTag: "strategic-advocate",
      },
      {
        id: "rs_cc_p_c",
        text: "Defer to the PCP's judgment — they have the medical degree and the longer relationship with the patient",
        esText: "Deferir al juicio del médico — tienen el título médico y la relación más larga con el paciente",
        score: 2,
        behaviorTag: "deferential",
      },
      {
        id: "rs_cc_p_d",
        text: "Escalate to your supervisor and ask them to intervene with the PCP",
        esText: "Escalar a tu supervisor y pedirle que intervenga con el médico",
        score: 1,
        behaviorTag: "avoidant-escalator",
      },
    ],
  },

  // Care Coordinator - Execution
  {
    id: "rs_cc_execution",
    roleId: "care_coordinator",
    domain: "execution",
    scenario:
      "It's 2 PM on a Friday. You have three urgent care transitions happening simultaneously: a patient being discharged from the ED who needs a follow-up within 48 hours, a patient who needs SNF placement by Monday or they lose their bed, and a patient who just got approved for transitional housing but the unit must be claimed by 5 PM today.",
    esScenario:
      "Son las 2 PM de un viernes. Tienes tres transiciones de cuidado urgentes ocurriendo simultáneamente: un paciente siendo dado de alta de urgencias que necesita seguimiento dentro de 48 horas, un paciente que necesita colocación en SNF antes del lunes o pierde su cama, y un paciente que acaba de ser aprobado para vivienda transicional pero la unidad debe reclamarse antes de las 5 PM de hoy.",
    question: "How do you triage this?",
    esQuestion: "¿Cómo priorizas esto?",
    options: [
      {
        id: "rs_cc_e_a",
        text: "Immediately tackle the housing unit (hardest deadline), delegate the ED follow-up scheduling to a colleague or leave a warm handoff, call the SNF to confirm Monday timeline, and set weekend reminders for anything that can't be completed today",
        esText: "Abordar inmediatamente la unidad de vivienda (plazo más difícil), delegar la programación de seguimiento de urgencias a un colega o dejar una transferencia coordinada, llamar al SNF para confirmar el plazo del lunes, y configurar recordatorios de fin de semana para lo que no se pueda completar hoy",
        score: 4,
        behaviorTag: "strategic-triager",
      },
      {
        id: "rs_cc_e_b",
        text: "Handle the housing first since it expires today, then the SNF placement, then the ED discharge — work through them in deadline order",
        esText: "Manejar primero la vivienda ya que vence hoy, luego la colocación en SNF, luego el alta de urgencias — trabajar en orden de fecha límite",
        score: 3,
        behaviorTag: "deadline-sequencer",
      },
      {
        id: "rs_cc_e_c",
        text: "Contact your supervisor to explain the situation and ask which one to prioritize",
        esText: "Contactar a tu supervisor para explicar la situación y preguntar cuál priorizar",
        score: 2,
        behaviorTag: "supervisor-dependent",
      },
      {
        id: "rs_cc_e_d",
        text: "Start with whichever patient's chart is easiest to pull up and work through the list",
        esText: "Empezar con el expediente del paciente que sea más fácil de abrir y trabajar la lista",
        score: 1,
        behaviorTag: "unstructured",
      },
    ],
  },

  // Care Coordinator - Growth
  {
    id: "rs_cc_growth",
    roleId: "care_coordinator",
    domain: "growth",
    scenario:
      "Your FQHC is launching a new Community Supports pilot program under CalAIM and your director asks if you'd be interested in leading it. You've never managed a program before — it would mean overseeing a small team, managing a budget, and reporting to the state. It's a significant step up from your current role.",
    esScenario:
      "Tu FQHC está lanzando un nuevo programa piloto de Apoyos Comunitarios bajo CalAIM y tu director te pregunta si te interesaría liderarlo. Nunca has gestionado un programa antes — significaría supervisar un equipo pequeño, manejar un presupuesto, y reportar al estado. Es un paso significativo desde tu puesto actual.",
    question: "What's your reaction?",
    esQuestion: "¿Cuál es tu reacción?",
    options: [
      {
        id: "rs_cc_g_a",
        text: "Accept enthusiastically, immediately start researching Community Supports requirements, ask for a mentor who's managed programs before, and create a 30/60/90-day learning plan for yourself",
        esText: "Aceptar con entusiasmo, comenzar inmediatamente a investigar los requisitos de Apoyos Comunitarios, pedir un mentor que haya gestionado programas antes, y crear un plan de aprendizaje de 30/60/90 días para ti mismo/a",
        score: 4,
        behaviorTag: "opportunity-seizer",
      },
      {
        id: "rs_cc_g_b",
        text: "Express strong interest but ask for a clear job description, training timeline, and regular check-ins before committing fully",
        esText: "Expresar mucho interés pero pedir una descripción de trabajo clara, cronograma de capacitación, y reuniones regulares de seguimiento antes de comprometerte completamente",
        score: 3,
        behaviorTag: "thoughtful-accepter",
      },
      {
        id: "rs_cc_g_c",
        text: "Ask if you could be part of the team without leading it — you'd rather gain experience first",
        esText: "Preguntar si podrías ser parte del equipo sin liderarlo — preferirías ganar experiencia primero",
        score: 2,
        behaviorTag: "cautious-participant",
      },
      {
        id: "rs_cc_g_d",
        text: "Decline — you're good at care coordination and don't want to risk failing in a management role",
        esText: "Declinar — eres bueno/a en coordinación de cuidado y no quieres arriesgarte a fracasar en un rol de gestión",
        score: 1,
        behaviorTag: "comfort-zone-bound",
      },
    ],
  },

  /* ================================================================ */
  /*  Medical Assistant                                                */
  /* ================================================================ */

  // Medical Assistant - Mission
  {
    id: "rs_ma_mission",
    roleId: "medical_assistant",
    domain: "mission",
    scenario:
      "While rooming a patient, they quietly tell you they can't afford their blood pressure medication and have been cutting pills in half. They ask you not to put it in their chart because they're embarrassed and don't want the doctor to know.",
    esScenario:
      "Mientras preparas a un paciente en el consultorio, te dice en voz baja que no puede pagar su medicamento para la presión arterial y ha estado cortando las pastillas por la mitad. Te pide que no lo pongas en su expediente porque le da vergüenza y no quiere que el doctor lo sepa.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ma_m_a",
        text: "Gently explain that the provider needs to know so they can help — offer to bring it up yourself in a compassionate way, mention that there are patient assistance programs and 340B pharmacy options that could get their medication free or low-cost",
        esText: "Explicar gentilmente que el proveedor necesita saber para poder ayudar — ofrecer mencionarlo tú mismo/a de manera compasiva, mencionar que existen programas de asistencia al paciente y opciones de farmacia 340B que podrían conseguir su medicamento gratis o a bajo costo",
        score: 4,
        behaviorTag: "patient-advocate",
      },
      {
        id: "rs_ma_m_b",
        text: "Reassure the patient there's no shame in needing help, document the medication concern, and let the provider know so they can discuss alternatives",
        esText: "Tranquilizar al paciente de que no hay vergüenza en necesitar ayuda, documentar la preocupación del medicamento, y avisar al proveedor para que puedan discutir alternativas",
        score: 3,
        behaviorTag: "transparent-helper",
      },
      {
        id: "rs_ma_m_c",
        text: "Respect the patient's wishes and don't document it, but suggest they talk to the doctor themselves at the visit",
        esText: "Respetar los deseos del paciente y no documentarlo, pero sugerirle que hablen con el doctor ellos mismos durante la visita",
        score: 2,
        behaviorTag: "passive-sympathizer",
      },
      {
        id: "rs_ma_m_d",
        text: "Note it in the chart without telling the patient — the provider needs accurate information",
        esText: "Anotarlo en el expediente sin decirle al paciente — el proveedor necesita información precisa",
        score: 1,
        behaviorTag: "rule-follower-rigid",
      },
    ],
  },

  // Medical Assistant - People
  {
    id: "rs_ma_people",
    roleId: "medical_assistant",
    domain: "people",
    scenario:
      "The provider you're working with is running 45 minutes behind schedule. They ask you to skip pre-visit planning for the remaining 8 patients — no vitals review, no medication reconciliation, no pre-visit huddle. 'Just room them and I'll figure it out,' they say.",
    esScenario:
      "El proveedor con el que trabajas lleva 45 minutos de retraso. Te pide que omitas la planificación previa a la visita para los 8 pacientes restantes — sin revisión de signos vitales, sin reconciliación de medicamentos, sin reunión previa. 'Solo ponlos en el consultorio y yo me las arreglo,' dice.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ma_p_a",
        text: "Respectfully push back — explain that skipping medication reconciliation is a patient safety issue, offer a compromise where you do abbreviated but essential pre-visit steps, and ask if any appointments can be rescheduled",
        esText: "Oponerte respetuosamente — explicar que omitir la reconciliación de medicamentos es un problema de seguridad del paciente, ofrecer un compromiso donde haces pasos previos abreviados pero esenciales, y preguntar si alguna cita puede reprogramarse",
        score: 4,
        behaviorTag: "safety-advocate",
      },
      {
        id: "rs_ma_p_b",
        text: "Do abbreviated pre-visit planning — focus on medication reconciliation and key vitals, skip the non-critical items to save time",
        esText: "Hacer una planificación previa abreviada — enfocarte en la reconciliación de medicamentos y signos vitales clave, omitir los elementos no críticos para ahorrar tiempo",
        score: 3,
        behaviorTag: "practical-compromiser",
      },
      {
        id: "rs_ma_p_c",
        text: "Do what the provider asks — they're the one responsible for clinical decisions",
        esText: "Hacer lo que pide el proveedor — es quien tiene la responsabilidad de las decisiones clínicas",
        score: 2,
        behaviorTag: "deferential",
      },
      {
        id: "rs_ma_p_d",
        text: "Skip the steps but document that you were told to skip them, in case something goes wrong",
        esText: "Omitir los pasos pero documentar que te dijeron que los omitieras, en caso de que algo salga mal",
        score: 1,
        behaviorTag: "self-protecting",
      },
    ],
  },

  // Medical Assistant - Execution
  {
    id: "rs_ma_execution",
    roleId: "medical_assistant",
    domain: "execution",
    scenario:
      "You're running a flu vaccination clinic and midway through the morning, you count the remaining supply and realize you're short 30 doses compared to what was ordered. Fifty patients are still scheduled, and you need to figure out what happened while keeping the clinic running.",
    esScenario:
      "Estás dirigiendo una clínica de vacunación contra la gripe y a mitad de la mañana, cuentas el suministro restante y te das cuenta de que faltan 30 dosis comparado con lo que se ordenó. Cincuenta pacientes todavía están programados, y necesitas descubrir qué pasó mientras mantienes la clínica funcionando.",
    question: "What's your immediate action?",
    esQuestion: "¿Cuál es tu acción inmediata?",
    options: [
      {
        id: "rs_ma_e_a",
        text: "Alert the clinic manager immediately, recount to confirm the discrepancy, check the delivery receipt and storage logs for errors, continue vaccinating while a colleague contacts the supplier for an emergency order or locates backup supply from another site",
        esText: "Alertar al gerente de la clínica inmediatamente, recontar para confirmar la discrepancia, revisar el recibo de entrega y registros de almacenamiento para errores, continuar vacunando mientras un colega contacta al proveedor para un pedido de emergencia o localiza suministro de respaldo de otro sitio",
        score: 4,
        behaviorTag: "calm-problem-solver",
      },
      {
        id: "rs_ma_e_b",
        text: "Stop and recount everything carefully, report the discrepancy to your supervisor, and continue vaccinating until supply runs out while the issue is investigated",
        esText: "Detenerte y recontar todo cuidadosamente, reportar la discrepancia a tu supervisor, y continuar vacunando hasta que se acabe el suministro mientras se investiga el problema",
        score: 3,
        behaviorTag: "methodical-reporter",
      },
      {
        id: "rs_ma_e_c",
        text: "Continue vaccinating and deal with the discrepancy at the end of the day — the clinic needs to keep moving",
        esText: "Continuar vacunando y lidiar con la discrepancia al final del día — la clínica necesita seguir funcionando",
        score: 2,
        behaviorTag: "crisis-deferred",
      },
      {
        id: "rs_ma_e_d",
        text: "Stop the clinic until the discrepancy is resolved — you can't continue without knowing what happened to the missing doses",
        esText: "Detener la clínica hasta que se resuelva la discrepancia — no puedes continuar sin saber qué pasó con las dosis faltantes",
        score: 1,
        behaviorTag: "rigid-reactor",
      },
    ],
  },

  // Medical Assistant - Growth
  {
    id: "rs_ma_growth",
    roleId: "medical_assistant",
    domain: "growth",
    scenario:
      "Your clinic is transitioning from its legacy EHR to OCHIN Epic. After two weeks of training and one week of go-live, you're still significantly slower than your usual pace. You notice that some colleagues have already adapted while you're still struggling with basic workflows.",
    esScenario:
      "Tu clínica está haciendo la transición de su EHR anterior a OCHIN Epic. Después de dos semanas de entrenamiento y una semana de uso en vivo, sigues significativamente más lento/a que tu ritmo habitual. Notas que algunos colegas ya se han adaptado mientras tú todavía luchas con flujos de trabajo básicos.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ma_g_a",
        text: "Ask the colleagues who adapted quickly to show you their shortcuts, practice on the training environment during lunch or after hours, create a personal tip sheet, and remind yourself that struggling now is normal and temporary",
        esText: "Pedir a los colegas que se adaptaron rápido que te muestren sus atajos, practicar en el ambiente de entrenamiento durante el almuerzo o después de horas, crear una hoja personal de consejos, y recordarte que luchar ahora es normal y temporal",
        score: 4,
        behaviorTag: "humble-learner",
      },
      {
        id: "rs_ma_g_b",
        text: "Request additional one-on-one training sessions and focus on mastering one workflow at a time instead of everything at once",
        esText: "Solicitar sesiones adicionales de entrenamiento individual y enfocarte en dominar un flujo de trabajo a la vez en lugar de todo al mismo tiempo",
        score: 3,
        behaviorTag: "structured-learner",
      },
      {
        id: "rs_ma_g_c",
        text: "Push through as best you can and hope it clicks eventually — asking for help feels embarrassing",
        esText: "Seguir adelante lo mejor que puedas y esperar que eventualmente haga clic — pedir ayuda se siente vergonzoso",
        score: 2,
        behaviorTag: "pride-bound",
      },
      {
        id: "rs_ma_g_d",
        text: "Express to management that the old system worked fine and the transition is hurting patient care",
        esText: "Expresar a la gerencia que el sistema anterior funcionaba bien y la transición está perjudicando la atención al paciente",
        score: 1,
        behaviorTag: "backward-focused",
      },
    ],
  },

  /* ================================================================ */
  /*  Case Manager                                                     */
  /* ================================================================ */

  // Case Manager - Mission
  {
    id: "rs_cm_mission",
    roleId: "case_manager",
    domain: "mission",
    scenario:
      "A patient with co-occurring substance use disorder and schizophrenia keeps cycling through the ED — four visits this month alone. Your supervisor reviews the case and suggests closing it, labeling the patient as 'non-compliant.' You know this patient's housing fell through last month and they lost access to their medications.",
    esScenario:
      "Un paciente con trastorno por uso de sustancias y esquizofrenia coexistentes sigue yendo a urgencias repetidamente — cuatro visitas solo este mes. Tu supervisor revisa el caso y sugiere cerrarlo, etiquetando al paciente como 'no cumplidor.' Sabes que la vivienda de este paciente se cayó el mes pasado y perdieron acceso a sus medicamentos.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_cm_m_a",
        text: "Push back on the 'non-compliant' label — present the full picture of what's driving ED visits, propose an updated care plan addressing housing and medication access, and advocate for the patient's continued enrollment",
        esText: "Oponerse a la etiqueta de 'no cumplidor' — presentar el panorama completo de lo que impulsa las visitas a urgencias, proponer un plan de atención actualizado que aborde vivienda y acceso a medicamentos, y abogar por la inscripción continua del paciente",
        score: 4,
        behaviorTag: "fierce-advocate",
      },
      {
        id: "rs_cm_m_b",
        text: "Ask your supervisor for more time on the case, explain the recent housing loss, and develop a focused 30-day plan to stabilize the patient",
        esText: "Pedir más tiempo a tu supervisor para el caso, explicar la pérdida reciente de vivienda, y desarrollar un plan enfocado de 30 días para estabilizar al paciente",
        score: 3,
        behaviorTag: "persistent-helper",
      },
      {
        id: "rs_cm_m_c",
        text: "Agree to close the case but make a warm referral to another program that might be able to help",
        esText: "Aceptar cerrar el caso pero hacer una referencia cálida a otro programa que podría ayudar",
        score: 2,
        behaviorTag: "compliant-connector",
      },
      {
        id: "rs_cm_m_d",
        text: "Close the case as directed — you can't help someone who doesn't help themselves, and you have other patients who need your attention",
        esText: "Cerrar el caso según se indica — no puedes ayudar a alguien que no se ayuda a sí mismo, y tienes otros pacientes que necesitan tu atención",
        score: 1,
        behaviorTag: "burned-out-complier",
      },
    ],
  },

  // Case Manager - People
  {
    id: "rs_cm_people",
    roleId: "case_manager",
    domain: "people",
    scenario:
      "A patient's adult daughter calls you, furious. She says her mother isn't getting enough support, threatens to file a formal complaint, and accuses you of neglect. You've actually been in close contact with the patient, but the daughter lives out of state and isn't on the communication plan.",
    esScenario:
      "La hija adulta de una paciente te llama, furiosa. Dice que su madre no está recibiendo suficiente apoyo, amenaza con presentar una queja formal, y te acusa de negligencia. En realidad has estado en contacto cercano con la paciente, pero la hija vive fuera del estado y no está en el plan de comunicación.",
    question: "How do you handle the call?",
    esQuestion: "¿Cómo manejas la llamada?",
    options: [
      {
        id: "rs_cm_p_a",
        text: "Let her express her frustration without interrupting, validate her concern for her mother, explain what you can share within HIPAA boundaries, offer to add her to the communication plan with the patient's consent, and schedule a family care conference",
        esText: "Dejarla expresar su frustración sin interrumpir, validar su preocupación por su madre, explicar lo que puedes compartir dentro de los límites de HIPAA, ofrecer agregarla al plan de comunicación con el consentimiento de la paciente, y programar una conferencia familiar de atención",
        score: 4,
        behaviorTag: "de-escalator",
      },
      {
        id: "rs_cm_p_b",
        text: "Listen calmly, acknowledge her feelings, explain the HIPAA limitations, and ask the patient at your next visit if she'd like to involve her daughter in care planning",
        esText: "Escuchar con calma, reconocer sus sentimientos, explicar las limitaciones de HIPAA, y preguntarle a la paciente en tu próxima visita si le gustaría involucrar a su hija en la planificación de atención",
        score: 3,
        behaviorTag: "professional-listener",
      },
      {
        id: "rs_cm_p_c",
        text: "Explain that you can't discuss the patient's care without authorization and suggest she contact the patient directly",
        esText: "Explicar que no puedes discutir la atención de la paciente sin autorización y sugerirle que contacte a la paciente directamente",
        score: 2,
        behaviorTag: "policy-bound",
      },
      {
        id: "rs_cm_p_d",
        text: "Become defensive and list everything you've done for the patient to prove the daughter is wrong",
        esText: "Ponerte a la defensiva y enumerar todo lo que has hecho por la paciente para demostrar que la hija está equivocada",
        score: 1,
        behaviorTag: "defensive-reactor",
      },
    ],
  },

  // Case Manager - Execution
  {
    id: "rs_cm_execution",
    roleId: "case_manager",
    domain: "execution",
    scenario:
      "You discover that three patients on your caseload have been approved for Section 8 housing vouchers, but the vouchers expire in 48 hours. One patient is in a shelter with no phone, another has pending background check issues, and the third needs medical documentation you haven't completed yet.",
    esScenario:
      "Descubres que tres pacientes de tu carga de trabajo han sido aprobados para vales de vivienda Sección 8, pero los vales vencen en 48 horas. Un paciente está en un refugio sin teléfono, otro tiene problemas pendientes de verificación de antecedentes, y el tercero necesita documentación médica que aún no has completado.",
    question: "How do you tackle this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_cm_e_a",
        text: "Map out all three cases immediately — go to the shelter in person to find patient one, call the housing authority about patient two's background check timeline, start the medical documentation for patient three now, and enlist colleagues to help with parallel tasks",
        esText: "Trazar los tres casos inmediatamente — ir al refugio en persona para encontrar al paciente uno, llamar a la autoridad de vivienda sobre el cronograma de verificación de antecedentes del paciente dos, comenzar la documentación médica del paciente tres ahora, y alistar colegas para ayudar con tareas paralelas",
        score: 4,
        behaviorTag: "action-oriented-planner",
      },
      {
        id: "rs_cm_e_b",
        text: "Prioritize the patient with the most straightforward path to completion first, then work through the more complex cases, escalating anything you can't resolve alone",
        esText: "Priorizar al paciente con el camino más directo a completar primero, luego trabajar los casos más complejos, escalando cualquier cosa que no puedas resolver solo/a",
        score: 3,
        behaviorTag: "sequential-solver",
      },
      {
        id: "rs_cm_e_c",
        text: "Contact the housing authority to ask for extensions on the voucher deadlines, then work through each case at a normal pace",
        esText: "Contactar a la autoridad de vivienda para pedir extensiones en los plazos de los vales, luego trabajar cada caso a un ritmo normal",
        score: 2,
        behaviorTag: "extension-seeker",
      },
      {
        id: "rs_cm_e_d",
        text: "Focus on the one patient you're most likely to get placed and accept that the other two may lose their vouchers",
        esText: "Enfocarte en el paciente que es más probable que logres colocar y aceptar que los otros dos podrían perder sus vales",
        score: 1,
        behaviorTag: "triage-by-convenience",
      },
    ],
  },

  // Case Manager - Growth
  {
    id: "rs_cm_growth",
    roleId: "case_manager",
    domain: "growth",
    scenario:
      "A new state reporting requirement for CalAIM means completely restructuring how you track patient outcomes. Instead of simple encounter logs, you now need to track SDOH screenings, care plan goals, and measurable outcomes for every patient — using a framework you've never seen before.",
    esScenario:
      "Un nuevo requisito de reporte estatal para CalAIM significa reestructurar completamente cómo rastreas los resultados de los pacientes. En lugar de registros simples de encuentros, ahora necesitas rastrear evaluaciones de SDOH, metas del plan de atención, y resultados medibles para cada paciente — usando un marco que nunca has visto.",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_cm_g_a",
        text: "Dive into the new framework, attend every available training, build yourself a template that integrates the new requirements into your daily workflow, and offer to share it with your team once you've refined it",
        esText: "Sumergirte en el nuevo marco, asistir a cada entrenamiento disponible, construirte una plantilla que integre los nuevos requisitos en tu flujo de trabajo diario, y ofrecer compartirla con tu equipo una vez que la hayas refinado",
        score: 4,
        behaviorTag: "system-builder",
      },
      {
        id: "rs_cm_g_b",
        text: "Follow the training step by step, start applying the new framework to new patients first, and gradually transition your existing caseload",
        esText: "Seguir el entrenamiento paso a paso, comenzar a aplicar el nuevo marco a pacientes nuevos primero, y gradualmente hacer la transición de tu carga existente",
        score: 3,
        behaviorTag: "gradual-adopter",
      },
      {
        id: "rs_cm_g_c",
        text: "Wait for your team to figure it out and follow their lead — there's no point in everyone struggling independently",
        esText: "Esperar a que tu equipo lo descifre y seguir su ejemplo — no tiene sentido que todos luchen independientemente",
        score: 2,
        behaviorTag: "follower",
      },
      {
        id: "rs_cm_g_d",
        text: "Keep using your current tracking methods and add the new elements only when audited or asked",
        esText: "Seguir usando tus métodos de rastreo actuales y agregar los nuevos elementos solo cuando te auditen o te lo pidan",
        score: 1,
        behaviorTag: "minimum-compliance",
      },
    ],
  },

  /* ================================================================ */
  /*  Behavioral Health                                                */
  /* ================================================================ */

  // Behavioral Health - Mission
  {
    id: "rs_bh_mission",
    roleId: "behavioral_health",
    domain: "mission",
    scenario:
      "A patient with serious mental illness has made real progress in therapy over six months — stable medication, improved functioning, reconnecting with family. Now they want to discontinue therapy because they 'feel fine.' You know from clinical experience that this is a high-risk moment for relapse.",
    esScenario:
      "Un paciente con enfermedad mental grave ha progresado realmente en terapia durante seis meses — medicación estable, funcionamiento mejorado, reconectándose con la familia. Ahora quieren discontinuar la terapia porque 'se sienten bien.' Sabes por experiencia clínica que este es un momento de alto riesgo para recaída.",
    question: "How do you approach this conversation?",
    esQuestion: "¿Cómo abordas esta conversación?",
    options: [
      {
        id: "rs_bh_m_a",
        text: "Celebrate their progress genuinely, use motivational interviewing to explore what 'feeling fine' means to them, collaboratively develop a relapse prevention plan, discuss tapering frequency rather than stopping completely, and respect their autonomy while ensuring informed decision-making",
        esText: "Celebrar su progreso genuinamente, usar entrevista motivacional para explorar qué significa 'sentirse bien' para ellos, desarrollar colaborativamente un plan de prevención de recaídas, discutir reducir la frecuencia en lugar de parar completamente, y respetar su autonomía mientras se asegura la toma de decisiones informada",
        score: 4,
        behaviorTag: "clinical-wisdom",
      },
      {
        id: "rs_bh_m_b",
        text: "Acknowledge their progress, share your clinical concern about relapse risk with specific data, and recommend a gradual step-down plan rather than abrupt termination",
        esText: "Reconocer su progreso, compartir tu preocupación clínica sobre el riesgo de recaída con datos específicos, y recomendar un plan de reducción gradual en lugar de una terminación abrupta",
        score: 3,
        behaviorTag: "evidence-based-advocate",
      },
      {
        id: "rs_bh_m_c",
        text: "Warn them strongly about the risks of stopping and ask them to commit to at least three more months",
        esText: "Advertirles fuertemente sobre los riesgos de parar y pedirles que se comprometan a al menos tres meses más",
        score: 2,
        behaviorTag: "directive-cautious",
      },
      {
        id: "rs_bh_m_d",
        text: "Respect their decision to stop — it's their right and you've documented your recommendation",
        esText: "Respetar su decisión de parar — es su derecho y has documentado tu recomendación",
        score: 1,
        behaviorTag: "hands-off",
      },
    ],
  },

  // Behavioral Health - People
  {
    id: "rs_bh_people",
    roleId: "behavioral_health",
    domain: "people",
    scenario:
      "During a warm handoff from a primary care provider, the patient crosses their arms and says, 'I don't need to talk to a mental health person. I came in for back pain, not to have someone mess with my head.' The PCP looks at you awkwardly.",
    esScenario:
      "Durante una transferencia cálida de un proveedor de atención primaria, el paciente cruza los brazos y dice: 'No necesito hablar con una persona de salud mental. Vine por dolor de espalda, no para que alguien me meta cosas en la cabeza.' El médico te mira con incomodidad.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_bh_p_a",
        text: "Normalize the reaction with warmth, reframe your role — 'I'm part of the whole-person care team, and chronic pain affects everything including sleep, stress, and daily life. Can I have just 5 minutes to see if there's anything that might help with the pain?' Meet them where they are without the mental health label",
        esText: "Normalizar la reacción con calidez, replantear tu rol — 'Soy parte del equipo de atención integral, y el dolor crónico afecta todo incluyendo el sueño, el estrés y la vida diaria. ¿Puedo tener solo 5 minutos para ver si hay algo que pueda ayudar con el dolor?' Encontrarlos donde están sin la etiqueta de salud mental",
        score: 4,
        behaviorTag: "stigma-navigator",
      },
      {
        id: "rs_bh_p_b",
        text: "Acknowledge their feelings, briefly explain that behavioral health is standard in FQHCs and integrated with all care, and offer to chat briefly with no pressure",
        esText: "Reconocer sus sentimientos, explicar brevemente que la salud conductual es estándar en los FQHCs e integrada con toda la atención, y ofrecer conversar brevemente sin presión",
        score: 3,
        behaviorTag: "gentle-educator",
      },
      {
        id: "rs_bh_p_c",
        text: "Hand them your card and say they can reach out anytime if they change their mind, then step out",
        esText: "Darles tu tarjeta y decir que pueden comunicarse en cualquier momento si cambian de opinión, luego retirarte",
        score: 2,
        behaviorTag: "non-intrusive",
      },
      {
        id: "rs_bh_p_d",
        text: "Tell the PCP this patient isn't ready and leave — forcing it will only increase resistance",
        esText: "Decirle al médico que este paciente no está listo/a y retirarte — forzarlo solo aumentará la resistencia",
        score: 1,
        behaviorTag: "premature-withdrawal",
      },
    ],
  },

  // Behavioral Health - Execution
  {
    id: "rs_bh_execution",
    roleId: "behavioral_health",
    domain: "execution",
    scenario:
      "You're facilitating a group therapy session for patients with anxiety and depression. Midway through, one participant becomes tearful and discloses that they've been having active suicidal thoughts this week, including a plan. The other group members look alarmed.",
    esScenario:
      "Estás facilitando una sesión de terapia grupal para pacientes con ansiedad y depresión. A mitad de la sesión, un participante se pone lloroso y revela que ha tenido pensamientos suicidas activos esta semana, incluyendo un plan. Los otros miembros del grupo se ven alarmados.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_bh_e_a",
        text: "Thank the patient for their courage, calmly acknowledge the seriousness to the group without panicking, ask a co-facilitator or colleague to continue the group session, take the patient to a private space for immediate safety assessment, and activate your clinic's crisis protocol",
        esText: "Agradecer al paciente por su valentía, reconocer con calma la seriedad ante el grupo sin entrar en pánico, pedir a un co-facilitador o colega que continúe la sesión grupal, llevar al paciente a un espacio privado para una evaluación de seguridad inmediata, y activar el protocolo de crisis de tu clínica",
        score: 4,
        behaviorTag: "crisis-competent",
      },
      {
        id: "rs_bh_e_b",
        text: "Pause the group, ensure the patient is safe, conduct a brief safety screen in the room, then end the session early to provide individual crisis support",
        esText: "Pausar el grupo, asegurar que el paciente esté seguro, realizar un breve tamizaje de seguridad en la sala, luego terminar la sesión temprano para proporcionar apoyo individual de crisis",
        score: 3,
        behaviorTag: "safety-first",
      },
      {
        id: "rs_bh_e_c",
        text: "Validate the patient's feelings and continue the group session, then pull the patient aside afterward for a safety assessment",
        esText: "Validar los sentimientos del paciente y continuar la sesión grupal, luego hablar con el paciente aparte después para una evaluación de seguridad",
        score: 2,
        behaviorTag: "delayed-response",
      },
      {
        id: "rs_bh_e_d",
        text: "Immediately call 911 — active suicidal ideation with a plan requires emergency services",
        esText: "Llamar al 911 inmediatamente — ideación suicida activa con un plan requiere servicios de emergencia",
        score: 1,
        behaviorTag: "over-reactive",
      },
    ],
  },

  // Behavioral Health - Growth
  {
    id: "rs_bh_growth",
    roleId: "behavioral_health",
    domain: "growth",
    scenario:
      "Your FQHC wants to expand behavioral health access by having you provide telehealth sessions to patients in rural areas. You're trained in in-person therapy and have concerns about therapeutic alliance, reading body language, and clinical effectiveness over video. But the need is real — these patients have zero local access to behavioral health.",
    esScenario:
      "Tu FQHC quiere expandir el acceso a salud conductual haciendo que brindes sesiones de telesalud a pacientes en áreas rurales. Estás entrenado/a en terapia presencial y tienes preocupaciones sobre la alianza terapéutica, la lectura del lenguaje corporal, y la efectividad clínica por video. Pero la necesidad es real — estos pacientes tienen cero acceso local a salud conductual.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_bh_g_a",
        text: "Accept the challenge — research telehealth-specific therapeutic techniques, seek supervision from clinicians experienced in telehealth, propose a small pilot with outcome tracking, and adapt your clinical skills to the new modality",
        esText: "Aceptar el desafío — investigar técnicas terapéuticas específicas de telesalud, buscar supervisión de clínicos con experiencia en telesalud, proponer un piloto pequeño con seguimiento de resultados, y adaptar tus habilidades clínicas a la nueva modalidad",
        score: 4,
        behaviorTag: "adaptive-clinician",
      },
      {
        id: "rs_bh_g_b",
        text: "Agree to try it but request specific telehealth training first, and ask for a reduced caseload initially while you build competency in the new format",
        esText: "Aceptar intentarlo pero solicitar entrenamiento específico de telesalud primero, y pedir una carga reducida inicialmente mientras desarrollas competencia en el nuevo formato",
        score: 3,
        behaviorTag: "prepared-adapter",
      },
      {
        id: "rs_bh_g_c",
        text: "Raise your clinical concerns formally and suggest the FQHC hire someone with telehealth experience instead",
        esText: "Plantear tus preocupaciones clínicas formalmente y sugerir que el FQHC contrate a alguien con experiencia en telesalud en su lugar",
        score: 2,
        behaviorTag: "specialist-mindset",
      },
      {
        id: "rs_bh_g_d",
        text: "Decline — providing therapy in a modality where you can't ensure quality would be unethical",
        esText: "Declinar — proporcionar terapia en una modalidad donde no puedes asegurar la calidad sería poco ético",
        score: 1,
        behaviorTag: "rigidly-ethical",
      },
    ],
  },

  /* ================================================================ */
  /*  Registered Nurse                                                 */
  /* ================================================================ */

  // Registered Nurse - Mission
  {
    id: "rs_rn_mission",
    roleId: "registered_nurse",
    domain: "mission",
    scenario:
      "A patient with uncontrolled diabetes (A1C of 12.4) has missed their last three follow-up appointments. When you finally reach them by phone, they say they've stopped taking their insulin because they can't afford the co-pay after losing their job. You're worried about immediate complications — potential DKA, kidney damage, vision loss.",
    esScenario:
      "Un paciente con diabetes no controlada (A1C de 12.4) ha faltado a sus últimas tres citas de seguimiento. Cuando finalmente los contactas por teléfono, dicen que dejaron de tomar su insulina porque no pueden pagar el copago después de perder su trabajo. Te preocupan las complicaciones inmediatas — posible DKA, daño renal, pérdida de visión.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rn_m_a",
        text: "First address the immediate danger — arrange a same-day or next-day visit for labs. Connect them with your FQHC's 340B pharmacy for low-cost insulin, a financial counselor for Medi-Cal re-enrollment, and the CHW team for ongoing support. Create a simplified care plan they can follow right now",
        esText: "Primero abordar el peligro inmediato — organizar una visita el mismo día o al día siguiente para laboratorios. Conectarlos con la farmacia 340B de tu FQHC para insulina a bajo costo, un consejero financiero para reinscripción en Medi-Cal, y el equipo de CHW para apoyo continuo. Crear un plan de atención simplificado que puedan seguir ahora mismo",
        score: 4,
        behaviorTag: "holistic-urgency",
      },
      {
        id: "rs_rn_m_b",
        text: "Get them scheduled for an urgent visit, talk to the PCP about the medication access issue, and refer them to patient financial services",
        esText: "Programarles una visita urgente, hablar con el médico sobre el problema de acceso a medicamentos, y referirlos a servicios financieros del paciente",
        score: 3,
        behaviorTag: "clinically-responsive",
      },
      {
        id: "rs_rn_m_c",
        text: "Document the no-shows, note the reason, and send a letter asking them to reschedule when they can",
        esText: "Documentar las ausencias, anotar la razón, y enviar una carta pidiéndoles que reprogramen cuando puedan",
        score: 2,
        behaviorTag: "procedural",
      },
      {
        id: "rs_rn_m_d",
        text: "Update the chart and flag for provider review at the next team huddle — it's ultimately the patient's responsibility to follow up",
        esText: "Actualizar el expediente y marcar para revisión del proveedor en la próxima reunión del equipo — en última instancia es responsabilidad del paciente dar seguimiento",
        score: 1,
        behaviorTag: "detached",
      },
    ],
  },

  // Registered Nurse - People
  {
    id: "rs_rn_people",
    roleId: "registered_nurse",
    domain: "people",
    scenario:
      "You've noticed that a medical assistant you work with consistently makes errors on medication reconciliation — wrong doses recorded, discontinued medications listed as current, allergies not updated. You've quietly corrected errors three times this week. The MA is well-liked by the team and patients.",
    esScenario:
      "Has notado que un asistente médico con el que trabajas comete errores consistentemente en la reconciliación de medicamentos — dosis incorrectas registradas, medicamentos descontinuados listados como actuales, alergias no actualizadas. Has corregido errores discretamente tres veces esta semana. El asistente médico es muy querido por el equipo y los pacientes.",
    question: "How do you address this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_rn_p_a",
        text: "Have a private, direct conversation — frame it around patient safety not personal criticism, share specific examples, ask if they need additional training or if something is affecting their work, and offer to do a few medication reconciliations together to help them improve",
        esText: "Tener una conversación privada y directa — enmarcarla en torno a la seguridad del paciente, no como crítica personal, compartir ejemplos específicos, preguntar si necesitan entrenamiento adicional o si algo está afectando su trabajo, y ofrecer hacer algunas reconciliaciones de medicamentos juntos para ayudarles a mejorar",
        score: 4,
        behaviorTag: "compassionate-confronter",
      },
      {
        id: "rs_rn_p_b",
        text: "Document the pattern and bring it to your supervisor, requesting they address it through formal channels or additional training",
        esText: "Documentar el patrón y llevarlo a tu supervisor, solicitando que lo aborden a través de canales formales o entrenamiento adicional",
        score: 3,
        behaviorTag: "formal-escalator",
      },
      {
        id: "rs_rn_p_c",
        text: "Continue correcting the errors yourself and double-check their work going forward — it's faster than dealing with the confrontation",
        esText: "Seguir corrigiendo los errores tú mismo/a y revisar su trabajo en adelante — es más rápido que lidiar con la confrontación",
        score: 2,
        behaviorTag: "conflict-avoidant-worker",
      },
      {
        id: "rs_rn_p_d",
        text: "Mention it casually in a group setting, like a team huddle, without naming the MA specifically",
        esText: "Mencionarlo casualmente en un entorno grupal, como una reunión de equipo, sin nombrar al asistente médico específicamente",
        score: 1,
        behaviorTag: "indirect-communicator",
      },
    ],
  },

  // Registered Nurse - Execution
  {
    id: "rs_rn_execution",
    roleId: "registered_nurse",
    domain: "execution",
    scenario:
      "Two patients arrive at your FQHC clinic simultaneously. Patient A, age 55, is reporting chest tightness, sweating, and left arm numbness. Patient B, age 8, is having an acute asthma attack — audible wheezing, using accessory muscles, SpO2 reading 88%. You're the only RN on the floor. An MA is available to assist.",
    esScenario:
      "Dos pacientes llegan a tu clínica FQHC simultáneamente. Paciente A, de 55 años, reporta opresión en el pecho, sudoración y entumecimiento del brazo izquierdo. Paciente B, de 8 años, tiene un ataque agudo de asma — sibilancias audibles, usando músculos accesorios, SpO2 al 88%. Eres el/la único/a enfermero/a en el piso. Un asistente médico está disponible para ayudar.",
    question: "How do you manage both patients?",
    esQuestion: "¿Cómo manejas ambos pacientes?",
    options: [
      {
        id: "rs_rn_e_a",
        text: "Initiate rapid parallel response: direct the MA to start the asthma patient on nebulizer treatment and continuous pulse ox monitoring while you do a rapid cardiac assessment on Patient A. Call 911 for the chest pain patient if ACS is suspected, then check on the asthma patient. Keep both visible and communicate continuously with the MA",
        esText: "Iniciar respuesta rápida paralela: dirigir al asistente médico para comenzar al paciente asmático con tratamiento de nebulizador y monitoreo continuo de pulso ox mientras haces una evaluación cardíaca rápida del Paciente A. Llamar al 911 para el paciente con dolor torácico si se sospecha SCA, luego verificar al paciente asmático. Mantener a ambos visibles y comunicarse continuamente con el asistente médico",
        score: 4,
        behaviorTag: "parallel-crisis-manager",
      },
      {
        id: "rs_rn_e_b",
        text: "Assess the chest pain patient first since it's potentially life-threatening, call 911 immediately, then attend to the asthma patient while waiting for EMS",
        esText: "Evaluar primero al paciente con dolor torácico ya que es potencialmente mortal, llamar al 911 inmediatamente, luego atender al paciente asmático mientras se espera al servicio de emergencias",
        score: 3,
        behaviorTag: "sequential-prioritizer",
      },
      {
        id: "rs_rn_e_c",
        text: "Focus on the child first since their SpO2 is critically low, get nebulizer started, then address the chest pain patient",
        esText: "Enfocarte primero en el niño ya que su SpO2 está críticamente baja, iniciar el nebulizador, luego abordar al paciente con dolor torácico",
        score: 2,
        behaviorTag: "severity-focused",
      },
      {
        id: "rs_rn_e_d",
        text: "Call 911 for both patients immediately and provide basic comfort care while waiting for paramedics",
        esText: "Llamar al 911 para ambos pacientes inmediatamente y proporcionar cuidados básicos de confort mientras se espera a los paramédicos",
        score: 1,
        behaviorTag: "overwhelmed-delegator",
      },
    ],
  },

  // Registered Nurse - Growth
  {
    id: "rs_rn_growth",
    roleId: "registered_nurse",
    domain: "growth",
    scenario:
      "Your FQHC wants you to lead chronic disease panel management for 200+ diabetic patients. This means population health analytics, standing order protocols, outreach coordination, and quality metric reporting — work that's much more strategic than your current clinical role. You've never done panel management before.",
    esScenario:
      "Tu FQHC quiere que lideres la gestión de panel de enfermedades crónicas para más de 200 pacientes diabéticos. Esto significa analítica de salud poblacional, protocolos de órdenes permanentes, coordinación de alcance, y reporte de métricas de calidad — trabajo mucho más estratégico que tu rol clínico actual. Nunca has hecho gestión de panel antes.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_rn_g_a",
        text: "Accept with enthusiasm — request training on population health tools, connect with nurses at other FQHCs who've done panel management, propose a phased rollout starting with your highest-risk patients, and see this as a career-defining opportunity",
        esText: "Aceptar con entusiasmo — solicitar entrenamiento en herramientas de salud poblacional, conectar con enfermeros/as de otros FQHCs que hayan hecho gestión de panel, proponer una implementación por fases comenzando con tus pacientes de más alto riesgo, y ver esto como una oportunidad que define tu carrera",
        score: 4,
        behaviorTag: "strategic-grower",
      },
      {
        id: "rs_rn_g_b",
        text: "Express interest but negotiate for proper training, dedicated time away from direct patient care, and clear success metrics before taking it on",
        esText: "Expresar interés pero negociar entrenamiento adecuado, tiempo dedicado fuera de la atención directa al paciente, y métricas de éxito claras antes de asumirlo",
        score: 3,
        behaviorTag: "prepared-accepter",
      },
      {
        id: "rs_rn_g_c",
        text: "Suggest they find someone with population health experience — you're strongest at the bedside and don't want to stretch too thin",
        esText: "Sugerir que encuentren a alguien con experiencia en salud poblacional — eres más fuerte en la atención directa y no quieres estirarte demasiado",
        score: 2,
        behaviorTag: "niche-protector",
      },
      {
        id: "rs_rn_g_d",
        text: "Decline — you became a nurse to take care of patients, not to sit in front of spreadsheets",
        esText: "Declinar — te hiciste enfermero/a para cuidar pacientes, no para sentarte frente a hojas de cálculo",
        score: 1,
        behaviorTag: "identity-rigid",
      },
    ],
  },

  /* ================================================================ */
  /*  Patient Services (Front Desk / Patient Access)                   */
  /* ================================================================ */

  // Patient Services - Mission
  {
    id: "rs_ps_mission",
    roleId: "patient_services",
    domain: "mission",
    scenario:
      "A Spanish-speaking patient approaches the front desk looking confused and anxious. Your colleague is about to turn them away, saying, 'We can't verify their insurance — they need to come back with the right paperwork.' You overhear the patient's name and recognize it from yesterday's Medi-Cal eligibility report — they likely have active coverage that just hasn't been linked to their profile yet.",
    esScenario:
      "Un paciente hispanohablante se acerca a la recepción luciendo confundido y ansioso. Tu colega está a punto de rechazarlo, diciendo: 'No podemos verificar su seguro — necesita regresar con los papeles correctos.' Escuchas el nombre del paciente y lo reconoces del informe de elegibilidad de Medi-Cal de ayer — probablemente tienen cobertura activa que simplemente no se ha vinculado a su perfil todavía.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ps_m_a",
        text: "Step in immediately — greet the patient in Spanish, reassure them they won't be turned away, check the Medi-Cal eligibility system yourself, and help resolve the issue on the spot. Afterward, gently coach your colleague about never turning patients away without exhausting verification options",
        esText: "Intervenir inmediatamente — saludar al paciente en español, asegurarles que no serán rechazados, verificar el sistema de elegibilidad de Medi-Cal tú mismo/a, y ayudar a resolver el problema en el momento. Después, orientar gentilmente a tu colega sobre nunca rechazar pacientes sin agotar las opciones de verificación",
        score: 4,
        behaviorTag: "patient-champion",
      },
      {
        id: "rs_ps_m_b",
        text: "Ask your colleague to wait, pull up the eligibility system to verify coverage, and help register the patient properly",
        esText: "Pedir a tu colega que espere, abrir el sistema de elegibilidad para verificar cobertura, y ayudar a registrar al paciente correctamente",
        score: 3,
        behaviorTag: "problem-solver",
      },
      {
        id: "rs_ps_m_c",
        text: "Tell your colleague about the eligibility report and let them handle it from there",
        esText: "Decirle a tu colega sobre el informe de elegibilidad y dejarles manejar la situación desde ahí",
        score: 2,
        behaviorTag: "informer",
      },
      {
        id: "rs_ps_m_d",
        text: "Don't interfere with your colleague's patient — they might take it the wrong way. The patient can come back another day",
        esText: "No interferir con el paciente de tu colega — podrían tomarlo mal. El paciente puede regresar otro día",
        score: 1,
        behaviorTag: "bystander",
      },
    ],
  },

  // Patient Services - People
  {
    id: "rs_ps_people",
    roleId: "patient_services",
    domain: "people",
    scenario:
      "A patient is standing at the front desk, loudly yelling at you about a $200 billing error that isn't your fault — it was a coding mistake from the back office. They're saying things like 'This place is a scam' and 'You people always do this.' The waiting room is full of other patients watching the interaction.",
    esScenario:
      "Un paciente está parado en la recepción, gritándote fuertemente sobre un error de facturación de $200 que no es tu culpa — fue un error de codificación de la oficina trasera. Está diciendo cosas como 'Este lugar es una estafa' y 'Ustedes siempre hacen esto.' La sala de espera está llena de otros pacientes observando la interacción.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ps_p_a",
        text: "Stay calm and lower your voice to de-escalate, validate their frustration — 'I understand this is upsetting and $200 is a lot of money.' Invite them to a private area to review the bill together, take ownership of resolving it even though it wasn't your error, and follow up within 24 hours with a resolution",
        esText: "Mantener la calma y bajar tu voz para desescalar, validar su frustración — 'Entiendo que esto es molesto y $200 es mucho dinero.' Invitarlos a un área privada para revisar la factura juntos, tomar responsabilidad de resolverlo aunque no fue tu error, y dar seguimiento dentro de 24 horas con una resolución",
        score: 4,
        behaviorTag: "professional-de-escalator",
      },
      {
        id: "rs_ps_p_b",
        text: "Apologize for the error, explain that you'll look into it, take their information, and promise to have the billing team call them back within the day",
        esText: "Disculparse por el error, explicar que lo investigarás, tomar su información, y prometer que el equipo de facturación les llamará dentro del día",
        score: 3,
        behaviorTag: "empathetic-responder",
      },
      {
        id: "rs_ps_p_c",
        text: "Tell them the billing error wasn't your fault, that it was a back-office mistake, and transfer them to the billing department",
        esText: "Decirles que el error de facturación no fue tu culpa, que fue un error de la oficina trasera, y transferirlos al departamento de facturación",
        score: 2,
        behaviorTag: "blame-deflector",
      },
      {
        id: "rs_ps_p_d",
        text: "Ask them to lower their voice or you'll have to call your supervisor — you don't deserve to be yelled at",
        esText: "Pedirles que bajen la voz o tendrás que llamar a tu supervisor — no mereces que te griten",
        score: 1,
        behaviorTag: "boundary-rigid",
      },
    ],
  },

  // Patient Services - Execution
  {
    id: "rs_ps_execution",
    roleId: "patient_services",
    domain: "execution",
    scenario:
      "It's Monday morning at 8 AM. Fifteen patients are in the lobby, the EHR is completely down, the phone is ringing nonstop, and a brand-new patient who speaks only Cantonese needs full registration including insurance verification. Your colleague called in sick, so you're the only one at the front desk.",
    esScenario:
      "Es lunes a las 8 AM. Quince pacientes están en el vestíbulo, el EHR está completamente caído, el teléfono suena sin parar, y un paciente nuevo que solo habla cantonés necesita registro completo incluyendo verificación de seguro. Tu colega llamó enfermo/a, así que eres el/la único/a en la recepción.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ps_e_a",
        text: "Take a breath and triage: announce to the lobby that the system is down and give an estimated wait time, set up a paper check-in process for patients with existing appointments, find the language line number for Cantonese, let the phone roll to voicemail with a custom message, and call your supervisor to request backup coverage",
        esText: "Tomar un respiro y hacer triaje: anunciar al vestíbulo que el sistema está caído y dar un tiempo estimado de espera, establecer un proceso de registro en papel para pacientes con citas existentes, encontrar el número de la línea de idiomas para cantonés, dejar que el teléfono vaya a buzón de voz con un mensaje personalizado, y llamar a tu supervisor para solicitar cobertura de respaldo",
        score: 4,
        behaviorTag: "chaos-manager",
      },
      {
        id: "rs_ps_e_b",
        text: "Start checking in patients manually on paper, handle the phone between patients, and ask a clinical staff member to help with the Cantonese-speaking patient using a translation app",
        esText: "Comenzar a registrar pacientes manualmente en papel, atender el teléfono entre pacientes, y pedir a un miembro del personal clínico que ayude con el paciente que habla cantonés usando una aplicación de traducción",
        score: 3,
        behaviorTag: "improviser",
      },
      {
        id: "rs_ps_e_c",
        text: "Focus on the patients in front of you one at a time, let the phone ring, and ask the new patient to come back when the system is working",
        esText: "Enfocarte en los pacientes frente a ti uno a la vez, dejar que el teléfono suene, y pedir al nuevo paciente que regrese cuando el sistema esté funcionando",
        score: 2,
        behaviorTag: "tunnel-vision",
      },
      {
        id: "rs_ps_e_d",
        text: "Call your supervisor immediately and wait for them to tell you what to do — this situation is beyond what one person should handle",
        esText: "Llamar a tu supervisor inmediatamente y esperar a que te digan qué hacer — esta situación está más allá de lo que una persona debería manejar",
        score: 1,
        behaviorTag: "paralyzed",
      },
    ],
  },

  // Patient Services - Growth
  {
    id: "rs_ps_growth",
    roleId: "patient_services",
    domain: "growth",
    scenario:
      "Your FQHC is implementing a new patient portal and management wants front desk staff to help patients set up their accounts during check-in. You've been shown the system once, but you're not comfortable with the technology. You struggle with the setup process yourself, and now you're expected to teach patients — many of whom are elderly and have limited tech experience.",
    esScenario:
      "Tu FQHC está implementando un nuevo portal de pacientes y la gerencia quiere que el personal de recepción ayude a los pacientes a configurar sus cuentas durante el registro. Te han mostrado el sistema una vez, pero no te sientes cómodo/a con la tecnología. Luchas con el proceso de configuración tú mismo/a, y ahora se espera que enseñes a pacientes — muchos de los cuales son ancianos y tienen experiencia tecnológica limitada.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ps_g_a",
        text: "Practice the portal setup repeatedly until you're confident, create a simple step-by-step visual guide for patients (with screenshots in English and Spanish), ask for additional training, and reframe the challenge — helping patients navigate technology is a valuable skill for your career growth",
        esText: "Practicar la configuración del portal repetidamente hasta sentirte seguro/a, crear una guía visual simple paso a paso para pacientes (con capturas de pantalla en inglés y español), pedir entrenamiento adicional, y replantear el desafío — ayudar a los pacientes a navegar la tecnología es una habilidad valiosa para tu crecimiento profesional",
        score: 4,
        behaviorTag: "resourceful-learner",
      },
      {
        id: "rs_ps_g_b",
        text: "Ask for more training sessions, practice with colleagues, and start helping patients once you feel somewhat competent — even if it's slow at first",
        esText: "Pedir más sesiones de entrenamiento, practicar con colegas, y comenzar a ayudar pacientes una vez que te sientas algo competente — aunque sea lento al principio",
        score: 3,
        behaviorTag: "willing-learner",
      },
      {
        id: "rs_ps_g_c",
        text: "Do the minimum — show patients the portal link and let them figure it out at home or call tech support",
        esText: "Hacer lo mínimo — mostrar a los pacientes el enlace del portal y dejar que lo descifren en casa o llamen a soporte técnico",
        score: 2,
        behaviorTag: "minimum-effort",
      },
      {
        id: "rs_ps_g_d",
        text: "Tell your supervisor this isn't part of your job description and the FQHC should have a dedicated tech support person for this",
        esText: "Decirle a tu supervisor que esto no es parte de tu descripción de trabajo y que el FQHC debería tener una persona dedicada de soporte técnico para esto",
        score: 1,
        behaviorTag: "role-rigid",
      },
    ],
  },

  /* ================================================================ */
  /*  Revenue Cycle                                                    */
  /* ================================================================ */

  // Revenue Cycle - Mission
  {
    id: "rs_rc_mission",
    roleId: "revenue_cycle",
    domain: "mission",
    scenario:
      "While reviewing claims data, you discover a clear pattern: three providers are consistently undercoding E&M visits — billing 99213 for visits that clearly meet 99214 or 99215 criteria based on documentation. This pattern is costing the FQHC an estimated $180,000 annually. Bringing it up means difficult conversations with providers who will likely feel you're questioning their clinical judgment.",
    esScenario:
      "Al revisar datos de reclamaciones, descubres un patrón claro: tres proveedores están consistentemente subcodificando visitas E&M — facturando 99213 por visitas que claramente cumplen criterios de 99214 o 99215 basado en la documentación. Este patrón le está costando al FQHC un estimado de $180,000 anuales. Mencionarlo significa conversaciones difíciles con proveedores que probablemente sentirán que estás cuestionando su juicio clínico.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rc_m_a",
        text: "Prepare a data-driven report showing the pattern and financial impact, frame it as an education opportunity rather than an accusation, present to leadership first, then offer to do one-on-one coding education sessions with the providers — emphasize that proper coding supports the FQHC's mission by funding more patient services",
        esText: "Preparar un informe basado en datos mostrando el patrón y el impacto financiero, enmarcarlo como una oportunidad educativa en lugar de una acusación, presentar al liderazgo primero, luego ofrecer sesiones de educación de codificación individuales con los proveedores — enfatizar que la codificación correcta apoya la misión del FQHC al financiar más servicios para pacientes",
        score: 4,
        behaviorTag: "mission-revenue-bridge",
      },
      {
        id: "rs_rc_m_b",
        text: "Bring the data to your supervisor and let them decide how to approach the providers — it's a management issue as much as a coding issue",
        esText: "Llevar los datos a tu supervisor y dejarles decidir cómo abordar a los proveedores — es un problema de gestión tanto como de codificación",
        score: 3,
        behaviorTag: "appropriate-escalator",
      },
      {
        id: "rs_rc_m_c",
        text: "Send an email with the data to the providers and cc your supervisor — put it in writing so there's a record",
        esText: "Enviar un correo electrónico con los datos a los proveedores y copiar a tu supervisor — ponerlo por escrito para que haya un registro",
        score: 2,
        behaviorTag: "impersonal-documenter",
      },
      {
        id: "rs_rc_m_d",
        text: "Document it but don't push it — providers don't like being told how to code and it's not worth the conflict",
        esText: "Documentarlo pero no insistir — a los proveedores no les gusta que les digan cómo codificar y no vale la pena el conflicto",
        score: 1,
        behaviorTag: "conflict-avoidant",
      },
    ],
  },

  // Revenue Cycle - People
  {
    id: "rs_rc_people",
    roleId: "revenue_cycle",
    domain: "people",
    scenario:
      "There's a growing conflict between the billing department and clinical staff. Clinicians say the billing team is too aggressive with prior authorization requirements and slowing down patient care. The billing team says clinicians don't document properly, causing denials that cost the FQHC money. Both sides have come to you because you work between both worlds.",
    esScenario:
      "Hay un conflicto creciente entre el departamento de facturación y el personal clínico. Los clínicos dicen que el equipo de facturación es demasiado agresivo con los requisitos de autorización previa y retrasando la atención al paciente. El equipo de facturación dice que los clínicos no documentan correctamente, causando denegaciones que le cuestan dinero al FQHC. Ambos lados han acudido a ti porque trabajas entre ambos mundos.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_rc_p_a",
        text: "Organize a joint working session — bring specific examples from both sides, facilitate a conversation focused on shared goals (patient care AND financial sustainability), co-develop a streamlined workflow that addresses both concerns, and create a simple reference guide for documentation requirements",
        esText: "Organizar una sesión de trabajo conjunta — traer ejemplos específicos de ambos lados, facilitar una conversación enfocada en metas compartidas (atención al paciente Y sostenibilidad financiera), co-desarrollar un flujo de trabajo optimizado que aborde ambas preocupaciones, y crear una guía de referencia simple para requisitos de documentación",
        score: 4,
        behaviorTag: "bridge-builder",
      },
      {
        id: "rs_rc_p_b",
        text: "Meet with each side separately to understand their specific frustrations, identify common ground, then propose a solution to leadership that addresses both perspectives",
        esText: "Reunirte con cada lado por separado para entender sus frustraciones específicas, identificar terreno común, luego proponer una solución al liderazgo que aborde ambas perspectivas",
        score: 3,
        behaviorTag: "mediator",
      },
      {
        id: "rs_rc_p_c",
        text: "Side with the billing team — they're right that proper documentation is essential, and without it the FQHC loses revenue",
        esText: "Ponerte del lado del equipo de facturación — tienen razón en que la documentación adecuada es esencial, y sin ella el FQHC pierde ingresos",
        score: 2,
        behaviorTag: "department-loyal",
      },
      {
        id: "rs_rc_p_d",
        text: "Stay out of it — this is a leadership problem, not yours. Let management sort it out",
        esText: "Mantenerte fuera — esto es un problema de liderazgo, no tuyo. Dejar que la gerencia lo resuelva",
        score: 1,
        behaviorTag: "disengaged",
      },
    ],
  },

  // Revenue Cycle - Execution
  {
    id: "rs_rc_execution",
    roleId: "revenue_cycle",
    domain: "execution",
    scenario:
      "It's the last week of the month. You have 50+ denied claims that need appeals before the filing deadline, the quarterly UDS financial report is due to your CFO by Friday, and you just received notice that a major Medi-Cal managed care plan changed their electronic submission requirements effective immediately — meaning your current batch of 200 pending claims may need reformatting.",
    esScenario:
      "Es la última semana del mes. Tienes más de 50 reclamaciones denegadas que necesitan apelaciones antes de la fecha límite de presentación, el informe financiero trimestral UDS se debe entregar a tu CFO antes del viernes, y acabas de recibir aviso de que un plan importante de atención administrada de Medi-Cal cambió sus requisitos de presentación electrónica con efecto inmediato — lo que significa que tu lote actual de 200 reclamaciones pendientes podría necesitar reformateo.",
    question: "How do you prioritize?",
    esQuestion: "¿Cómo priorizas?",
    options: [
      {
        id: "rs_rc_e_a",
        text: "Assess the submission change first — if the 200 pending claims are at risk, identify exactly what needs reformatting and delegate or batch-process the fix. Then sort denied claims by dollar amount and deadline, appeal the highest-value ones first. Block time Thursday for the UDS report. Communicate realistic timelines to your CFO now, not Friday",
        esText: "Evaluar primero el cambio de presentación — si las 200 reclamaciones pendientes están en riesgo, identificar exactamente qué necesita reformateo y delegar o procesar la corrección en lote. Luego ordenar las reclamaciones denegadas por monto y fecha límite, apelar primero las de mayor valor. Bloquear tiempo el jueves para el informe UDS. Comunicar cronogramas realistas a tu CFO ahora, no el viernes",
        score: 4,
        behaviorTag: "strategic-executor",
      },
      {
        id: "rs_rc_e_b",
        text: "Start with the denied claim appeals since they have filing deadlines, work on the UDS report in the evenings, and address the submission format change next week when you have more time to investigate",
        esText: "Empezar con las apelaciones de reclamaciones denegadas ya que tienen fechas límite de presentación, trabajar en el informe UDS por las noches, y abordar el cambio de formato de presentación la próxima semana cuando tengas más tiempo para investigar",
        score: 3,
        behaviorTag: "deadline-focused",
      },
      {
        id: "rs_rc_e_c",
        text: "Focus on the UDS report since the CFO is expecting it, then work through the denied claims, and email the payer about the submission change to clarify requirements",
        esText: "Enfocarte en el informe UDS ya que el CFO lo espera, luego trabajar las reclamaciones denegadas, y enviar un correo al pagador sobre el cambio de presentación para aclarar requisitos",
        score: 2,
        behaviorTag: "authority-driven",
      },
      {
        id: "rs_rc_e_d",
        text: "Tell your supervisor that this workload is unreasonable and ask for deadline extensions on everything",
        esText: "Decirle a tu supervisor que esta carga de trabajo es irrazonable y pedir extensiones de plazo para todo",
        score: 1,
        behaviorTag: "overwhelm-capitulator",
      },
    ],
  },

  // Revenue Cycle - Growth
  {
    id: "rs_rc_growth",
    roleId: "revenue_cycle",
    domain: "growth",
    scenario:
      "Your FQHC currently outsources all medical coding to a vendor. Leadership wants to bring coding in-house to save $150K annually and improve turnaround times. They're looking at you to lead the transition — but it would require you to earn your CPC (Certified Professional Coder) certification within 6 months while continuing your current job. The exam has a 50% pass rate.",
    esScenario:
      "Tu FQHC actualmente terceriza toda la codificación médica a un proveedor externo. El liderazgo quiere traer la codificación internamente para ahorrar $150K anuales y mejorar los tiempos de respuesta. Te están considerando para liderar la transición — pero requeriría que obtengas tu certificación CPC (Codificador Profesional Certificado) dentro de 6 meses mientras continúas tu trabajo actual. El examen tiene una tasa de aprobación del 50%.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_rc_g_a",
        text: "Accept the challenge — enroll in a CPC prep course immediately, negotiate study time into your work schedule, connect with certified coders for mentorship, set a study plan with milestones, and view this as a career-transforming investment that also saves the FQHC significant money",
        esText: "Aceptar el desafío — inscribirte en un curso de preparación CPC inmediatamente, negociar tiempo de estudio en tu horario laboral, conectar con codificadores certificados para mentoría, establecer un plan de estudio con hitos, y ver esto como una inversión transformadora de carrera que también ahorra dinero significativo al FQHC",
        score: 4,
        behaviorTag: "investment-mindset",
      },
      {
        id: "rs_rc_g_b",
        text: "Express interest but negotiate the terms — ask for the FQHC to pay for the prep course and exam, allow dedicated study hours, and extend the timeline to 9 months for a more realistic path",
        esText: "Expresar interés pero negociar los términos — pedir que el FQHC pague el curso de preparación y el examen, permitir horas dedicadas de estudio, y extender el plazo a 9 meses para un camino más realista",
        score: 3,
        behaviorTag: "realistic-negotiator",
      },
      {
        id: "rs_rc_g_c",
        text: "Suggest a hybrid approach — bring some coding in-house with existing staff and keep the vendor for complex cases, avoiding the need for CPC certification",
        esText: "Sugerir un enfoque híbrido — traer algo de codificación internamente con el personal existente y mantener al proveedor para casos complejos, evitando la necesidad de certificación CPC",
        score: 2,
        behaviorTag: "compromise-seeker",
      },
      {
        id: "rs_rc_g_d",
        text: "Decline — the 50% pass rate is too risky and you don't want to fail publicly. Recommend they hire an experienced coder instead",
        esText: "Declinar — la tasa de aprobación del 50% es muy riesgosa y no quieres fracasar públicamente. Recomendar que contraten un codificador experimentado en su lugar",
        score: 1,
        behaviorTag: "failure-avoidant",
      },
    ],
  },

  // ============================================================
  // TRANSITION READINESS — Role-Specific Questions (1 per role)
  // Tests: situation diagnosis, alignment-seeking, self-organization
  // ============================================================

  // CHW — Previous CHW left no community contacts or outreach documentation
  {
    id: "rs_chw_t",
    roleId: "chw",
    domain: "transition",
    scenario:
      "You just started as a CHW at a new FQHC. The previous CHW left abruptly with no documentation — no community contact lists, no outreach logs, no notes on which apartment complexes or community organizations they worked with. Your supervisor says, 'You'll figure it out — just start doing outreach.' You have a panel of 80 patients assigned to you, and many haven't been contacted in months.",
    esScenario:
      "Acabas de comenzar como CHW en un nuevo FQHC. El CHW anterior se fue abruptamente sin documentación — sin listas de contactos comunitarios, sin registros de alcance, sin notas sobre qué complejos de apartamentos u organizaciones comunitarias trabajaban. Tu supervisor dice, 'Lo resolverás — solo empieza a hacer alcance.' Tienes un panel de 80 pacientes asignados, y muchos no han sido contactados en meses.",
    question: "How do you approach your first two weeks?",
    esQuestion: "¿Cómo enfocas tus primeras dos semanas?",
    options: [
      {
        id: "rs_chw_t_a",
        text: "Before any outreach, spend 3-4 days diagnosing the situation: pull patient data from the EHR to identify who's highest-risk, talk to medical assistants and front desk staff about which patients they've seen recently, research community organizations in the service area, and schedule a sit-down with your supervisor to clarify expectations and success metrics for your first 90 days",
        esText: "Antes de cualquier alcance, dedica 3-4 días a diagnosticar la situación: revisar datos de pacientes en el EHR para identificar quiénes son de mayor riesgo, hablar con asistentes médicos y personal de recepción sobre qué pacientes han visto recientemente, investigar organizaciones comunitarias en el área de servicio, y programar una reunión con tu supervisor para clarificar expectativas y métricas de éxito para tus primeros 90 días",
        score: 4,
        behaviorTag: "situation-aware",
      },
      {
        id: "rs_chw_t_b",
        text: "Start outreach immediately with the highest-risk patients on your panel — call them, attempt home visits, and rebuild the contact list as you go. Ask colleagues informally about what worked before",
        esText: "Comenzar alcance inmediatamente con los pacientes de mayor riesgo en tu panel — llamarlos, intentar visitas domiciliarias, y reconstruir la lista de contactos sobre la marcha. Preguntar informalmente a colegas qué funcionaba antes",
        score: 3,
        behaviorTag: "bias-to-action",
      },
      {
        id: "rs_chw_t_c",
        text: "Ask your supervisor for a more detailed onboarding plan and request to shadow another CHW at the FQHC for a week before starting your own outreach",
        esText: "Pedir a tu supervisor un plan de incorporación más detallado y solicitar observar a otro CHW en el FQHC durante una semana antes de comenzar tu propio alcance",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_chw_t_d",
        text: "Focus on getting your own workspace set up — computer access, EHR training, badge, parking — and wait for your supervisor to schedule a proper orientation before starting any patient contact",
        esText: "Enfocarte en preparar tu propio espacio de trabajo — acceso a computadora, capacitación del EHR, credencial, estacionamiento — y esperar a que tu supervisor programe una orientación adecuada antes de iniciar cualquier contacto con pacientes",
        score: 1,
        behaviorTag: "passive-onboarder",
      },
    ],
  },

  // Care Coordinator — Inherit ECM panel with incomplete care plans
  {
    id: "rs_cc_t",
    roleId: "care_coordinator",
    domain: "transition",
    scenario:
      "You've been hired as a Care Coordinator inheriting an ECM panel of 40 patients. The previous coordinator was overwhelmed and left. Looking at the records, you find that 15 patients have incomplete care plans, 8 haven't been contacted in over 60 days (a compliance risk), and 5 have upcoming specialist appointments that haven't been confirmed. Your new supervisor is in back-to-back meetings all week and tells you to 'prioritize as you see fit.'",
    esScenario:
      "Te contrataron como Coordinador de Cuidado heredando un panel ECM de 40 pacientes. El coordinador anterior estaba abrumado y se fue. Al revisar los registros, encuentras que 15 pacientes tienen planes de cuidado incompletos, 8 no han sido contactados en más de 60 días (un riesgo de cumplimiento), y 5 tienen citas con especialistas próximas que no han sido confirmadas. Tu nuevo supervisor está en reuniones seguidas toda la semana y te dice que 'priorices como mejor te parezca.'",
    question: "How do you organize your first week?",
    esQuestion: "¿Cómo organizas tu primera semana?",
    options: [
      {
        id: "rs_cc_t_a",
        text: "Create a triage system: immediately address the 5 upcoming specialist appointments (time-sensitive), then contact the 8 patients at compliance risk within 48 hours, then schedule a meeting with your supervisor — even if brief — to align on what 'success' looks like at 30/60/90 days and to understand the team's compliance reporting deadlines. Build your own tracking spreadsheet to manage the inherited panel systematically",
        esText: "Crear un sistema de triaje: abordar inmediatamente las 5 citas con especialistas próximas (urgentes en tiempo), luego contactar a los 8 pacientes en riesgo de cumplimiento dentro de 48 horas, después programar una reunión con tu supervisor — aunque sea breve — para alinear qué significa 'éxito' a los 30/60/90 días y entender los plazos de reportes de cumplimiento del equipo. Crear tu propia hoja de seguimiento para manejar el panel heredado sistemáticamente",
        score: 4,
        behaviorTag: "self-organizer",
      },
      {
        id: "rs_cc_t_b",
        text: "Start calling patients right away — begin with the 8 who haven't been contacted in 60+ days since that's the biggest risk. Work through the list and deal with care plans as you go",
        esText: "Empezar a llamar pacientes de inmediato — comenzar con los 8 que no han sido contactados en más de 60 días ya que es el mayor riesgo. Trabajar la lista y resolver los planes de cuidado sobre la marcha",
        score: 3,
        behaviorTag: "bias-to-action",
      },
      {
        id: "rs_cc_t_c",
        text: "Email your supervisor asking for a detailed handoff document and a list of the team's priority patients before you start making any calls",
        esText: "Enviar un correo a tu supervisor pidiendo un documento detallado de transferencia y una lista de los pacientes prioritarios del equipo antes de comenzar a hacer llamadas",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_cc_t_d",
        text: "Spend the week reading through all 40 patient charts to fully understand each case before reaching out to anyone. You want to be prepared before making contact",
        esText: "Pasar la semana leyendo los 40 expedientes de pacientes para entender completamente cada caso antes de contactar a alguien. Quieres estar preparado antes de hacer contacto",
        score: 1,
        behaviorTag: "no-diagnosis",
      },
    ],
  },

  // Medical Assistant — New clinic, different EHR, different provider preferences
  {
    id: "rs_ma_t",
    roleId: "medical_assistant",
    domain: "transition",
    scenario:
      "You just transferred to a new FQHC clinic after 3 years at your previous site. This clinic uses a different EHR system you've never worked with, the providers have different preferences for rooming patients and vitals workflows, and the front desk team seems hesitant to help you learn the ropes. One provider has already complained that you're 'too slow' on your second day.",
    esScenario:
      "Acabas de transferirte a una nueva clínica FQHC después de 3 años en tu sitio anterior. Esta clínica usa un sistema EHR diferente que nunca has usado, los proveedores tienen preferencias diferentes para el flujo de trabajo de habitaciones y signos vitales, y el equipo de recepción parece reacio a ayudarte a aprender. Un proveedor ya se quejó de que eres 'muy lento/a' en tu segundo día.",
    question: "How do you handle this transition?",
    esQuestion: "¿Cómo manejas esta transición?",
    options: [
      {
        id: "rs_ma_t_a",
        text: "Schedule a 10-minute conversation with each provider to learn their specific preferences and workflow expectations. Ask the clinic lead for EHR training resources or to shadow a veteran MA for a half-day. Create a cheat sheet of each provider's preferences. Address the speed complaint directly with the provider: 'I'm investing time this week to learn your preferences so I can be efficient long-term — can you tell me your top 3 priorities for rooming?'",
        esText: "Programar una conversación de 10 minutos con cada proveedor para aprender sus preferencias específicas y expectativas de flujo de trabajo. Pedir al líder de clínica recursos de capacitación del EHR o observar a un MA veterano por medio día. Crear una hoja de referencia con las preferencias de cada proveedor. Abordar la queja de velocidad directamente con el proveedor: 'Estoy invirtiendo tiempo esta semana para aprender tus preferencias y ser eficiente a largo plazo — ¿puedes decirme tus 3 prioridades principales para preparar pacientes?'",
        score: 4,
        behaviorTag: "proactive-aligner",
      },
      {
        id: "rs_ma_t_b",
        text: "Watch what other MAs do and try to mirror their workflows. Stay late to practice the EHR system on your own. Keep your head down until you're up to speed",
        esText: "Observar lo que hacen otros MAs e intentar replicar sus flujos de trabajo. Quedarte tarde para practicar el sistema EHR por tu cuenta. Mantener perfil bajo hasta que estés al día",
        score: 2,
        behaviorTag: "passive-learner",
      },
      {
        id: "rs_ma_t_c",
        text: "Ask your clinic manager to arrange a formal training schedule for your first two weeks — EHR modules, provider shadowing, and front desk orientation",
        esText: "Pedir a tu gerente de clínica que organice un programa formal de capacitación para tus primeras dos semanas — módulos del EHR, observación de proveedores, y orientación de recepción",
        score: 3,
        behaviorTag: "structured-learner",
      },
      {
        id: "rs_ma_t_d",
        text: "Tell the provider who complained that you just started and need time. Focus on doing things correctly rather than quickly, even if it means longer patient wait times for now",
        esText: "Decirle al proveedor que se quejó que acabas de empezar y necesitas tiempo. Enfocarte en hacer las cosas correctamente en lugar de rápido, aunque signifique tiempos de espera más largos por ahora",
        score: 1,
        behaviorTag: "unstructured",
      },
    ],
  },

  // Case Manager — Take over high-acuity caseload with no case notes
  {
    id: "rs_cm_t",
    roleId: "case_manager",
    domain: "transition",
    scenario:
      "You're starting as a Case Manager at an FQHC taking over a caseload of 25 high-acuity patients from a colleague who was terminated. There are almost no case notes in the system — just names, diagnoses, and insurance information. Several patients are in active housing transitions, two have pending SSI applications with court dates, and one was recently hospitalized. Your supervisor hands you the list and says, 'These patients can't wait — they need someone now.'",
    esScenario:
      "Estás comenzando como Case Manager en un FQHC tomando un caseload de 25 pacientes de alta agudeza de un colega que fue despedido. Casi no hay notas de caso en el sistema — solo nombres, diagnósticos e información de seguro. Varios pacientes están en transiciones activas de vivienda, dos tienen solicitudes de SSI pendientes con fechas de corte, y uno fue hospitalizado recientemente. Tu supervisor te entrega la lista y dice, 'Estos pacientes no pueden esperar — necesitan a alguien ahora.'",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_cm_t_a",
        text: "Immediately triage by urgency: contact the hospitalized patient first, verify the SSI court dates and prepare documentation, then assess the housing transitions. Simultaneously, schedule a meeting with your supervisor within 48 hours to define expectations, learn who the key community partners are (housing authorities, legal aid, SSI advocates), and set up a systematic tracking tool for all 25 patients with status, next action, and deadline columns",
        esText: "Triaje inmediato por urgencia: contactar primero al paciente hospitalizado, verificar las fechas de corte de SSI y preparar documentación, luego evaluar las transiciones de vivienda. Simultáneamente, programar una reunión con tu supervisor dentro de 48 horas para definir expectativas, conocer quiénes son los socios comunitarios clave (autoridades de vivienda, asistencia legal, defensores de SSI), y establecer una herramienta de seguimiento sistemático para los 25 pacientes con columnas de estado, próxima acción y fecha límite",
        score: 4,
        behaviorTag: "self-organizer",
      },
      {
        id: "rs_cm_t_b",
        text: "Start calling all 25 patients this week to introduce yourself and assess their current needs. Document everything as you go to rebuild the case files",
        esText: "Empezar a llamar a los 25 pacientes esta semana para presentarte y evaluar sus necesidades actuales. Documentar todo sobre la marcha para reconstruir los expedientes",
        score: 3,
        behaviorTag: "bias-to-action",
      },
      {
        id: "rs_cm_t_c",
        text: "Ask your supervisor to identify the top 5 most critical patients and focus only on those until you've gotten proper orientation and understand the FQHC's referral network",
        esText: "Pedir a tu supervisor que identifique los 5 pacientes más críticos y enfocarte solo en esos hasta que hayas recibido una orientación adecuada y entiendas la red de referidos del FQHC",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_cm_t_d",
        text: "Tell your supervisor this situation is untenable — you can't safely manage 25 high-acuity patients with no documentation. Request a reduced caseload or a two-week ramp-up period before taking full responsibility",
        esText: "Decirle a tu supervisor que esta situación es insostenible — no puedes manejar de forma segura 25 pacientes de alta agudeza sin documentación. Solicitar un caseload reducido o un período de dos semanas de preparación antes de asumir responsabilidad completa",
        score: 1,
        behaviorTag: "task-oriented",
      },
    ],
  },

  // Behavioral Health — Join integrated BH team where providers don't understand your role
  {
    id: "rs_bh_t",
    roleId: "behavioral_health",
    domain: "transition",
    scenario:
      "You've joined an FQHC as a Behavioral Health Specialist on their new integrated care team. During your first week, you realize the medical providers don't understand what you do — they either refer every patient to you ('she's stressed, send her to BH') or none at all. The warm handoff process exists on paper but isn't happening in practice. Your BH supervisor is at a different site and available only by phone. The clinic manager says, 'We're glad you're here — make it work.'",
    esScenario:
      "Te uniste a un FQHC como Especialista en Salud Conductual en su nuevo equipo de cuidado integrado. Durante tu primera semana, te das cuenta de que los proveedores médicos no entienden lo que haces — o te refieren a todos los pacientes ('está estresada, envíala a BH') o a ninguno. El proceso de transferencia en caliente existe en papel pero no sucede en la práctica. Tu supervisor de BH está en otro sitio y disponible solo por teléfono. El gerente de clínica dice, 'Nos alegra que estés aquí — hazlo funcionar.'",
    question: "How do you establish your role in the first month?",
    esQuestion: "¿Cómo estableces tu rol en el primer mes?",
    options: [
      {
        id: "rs_bh_t_a",
        text: "Diagnose the situation first: observe the clinic flow for 2-3 days to understand when and how patients move through visits. Then schedule brief 1:1 meetings with each provider to learn their perspective on behavioral health needs and explain when warm handoffs are most valuable. Create a simple one-page guide ('When to refer to BH') and post it in each exam room. Set up weekly check-ins with your BH supervisor to align on integration goals and metrics",
        esText: "Diagnosticar la situación primero: observar el flujo de la clínica durante 2-3 días para entender cuándo y cómo los pacientes se mueven durante las visitas. Luego programar reuniones breves 1:1 con cada proveedor para conocer su perspectiva sobre necesidades de salud conductual y explicar cuándo las transferencias en caliente son más valiosas. Crear una guía simple de una página ('Cuándo referir a BH') y publicarla en cada sala de examen. Establecer check-ins semanales con tu supervisor de BH para alinear metas y métricas de integración",
        score: 4,
        behaviorTag: "situation-aware",
      },
      {
        id: "rs_bh_t_b",
        text: "Start showing up to provider huddles uninvited, introduce yourself, and offer to do same-day consultations. Make yourself visible and available so providers naturally start referring appropriately over time",
        esText: "Empezar a presentarte en las reuniones de proveedores sin invitación, presentarte y ofrecer hacer consultas del mismo día. Hacerte visible y disponible para que los proveedores naturalmente comiencen a referir apropiadamente con el tiempo",
        score: 3,
        behaviorTag: "network-builder",
      },
      {
        id: "rs_bh_t_c",
        text: "Ask the clinic manager to send an email to all providers explaining your role, the warm handoff process, and when to refer patients to behavioral health",
        esText: "Pedir al gerente de clínica que envíe un correo a todos los proveedores explicando tu rol, el proceso de transferencia en caliente, y cuándo referir pacientes a salud conductual",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_bh_t_d",
        text: "Accept whatever referrals come your way and focus on building your patient panel. The providers will learn the appropriate referral patterns over time as they see what kinds of patients benefit most from BH services",
        esText: "Aceptar cualquier referido que llegue y enfocarte en construir tu panel de pacientes. Los proveedores aprenderán los patrones de referido apropiados con el tiempo al ver qué tipos de pacientes se benefician más de los servicios de BH",
        score: 1,
        behaviorTag: "passive-onboarder",
      },
    ],
  },

  // Registered Nurse — Float to new clinic with different protocols
  {
    id: "rs_rn_t",
    roleId: "registered_nurse",
    domain: "transition",
    scenario:
      "You're an RN who just accepted a position at a multi-site FQHC. You'll be floating between 3 clinic sites, each with different patient populations, slightly different protocols, and different care teams. Your first day at Site A, you discover their triage protocols differ from what you learned in orientation (which was based on Site B). The charge nurse is busy and says, 'Just do what makes clinical sense.' You also don't know where supplies are stored or who to call for urgent situations.",
    esScenario:
      "Eres un/a RN que acaba de aceptar una posición en un FQHC con múltiples sitios. Estarás rotando entre 3 sitios clínicos, cada uno con diferentes poblaciones de pacientes, protocolos ligeramente diferentes, y diferentes equipos de cuidado. Tu primer día en el Sitio A, descubres que sus protocolos de triaje difieren de lo que aprendiste en orientación (que estaba basada en el Sitio B). La enfermera a cargo está ocupada y dice, 'Solo haz lo que tenga sentido clínico.' Tampoco sabes dónde están los suministros ni a quién llamar para situaciones urgentes.",
    question: "How do you navigate this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_rn_t_a",
        text: "Create your own 'site readiness' system: for each of the 3 sites, build a quick-reference card with key contacts (charge nurse, provider on call, pharmacy), supply locations, and site-specific protocol variations. Start by asking the MAs at Site A — they know the practical details better than anyone. Schedule a conversation with your nursing supervisor to discuss expectations for float nurses and clarify which protocols take precedence when sites differ",
        esText: "Crear tu propio sistema de 'preparación por sitio': para cada uno de los 3 sitios, hacer una tarjeta de referencia rápida con contactos clave (enfermera a cargo, proveedor de guardia, farmacia), ubicaciones de suministros, y variaciones de protocolo específicas del sitio. Empezar preguntando a los MAs del Sitio A — ellos conocen los detalles prácticos mejor que nadie. Programar una conversación con tu supervisor de enfermería para discutir expectativas para enfermeras rotativas y clarificar qué protocolos tienen prioridad cuando los sitios difieren",
        score: 4,
        behaviorTag: "self-organizer",
      },
      {
        id: "rs_rn_t_b",
        text: "Follow the charge nurse's advice — use your clinical judgment for today, take notes on how things work at this site, and bring up the protocol discrepancies at the next staff meeting",
        esText: "Seguir el consejo de la enfermera a cargo — usar tu juicio clínico por hoy, tomar notas sobre cómo funcionan las cosas en este sitio, y plantear las discrepancias de protocolo en la próxima reunión de personal",
        score: 3,
        behaviorTag: "adaptive-learner",
      },
      {
        id: "rs_rn_t_c",
        text: "Email your nursing supervisor about the protocol discrepancy and ask for written clarification before you see any more patients at Site A",
        esText: "Enviar un correo a tu supervisor de enfermería sobre la discrepancia de protocolo y pedir clarificación por escrito antes de ver más pacientes en el Sitio A",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_rn_t_d",
        text: "Just follow the orientation protocols from Site B consistently across all sites — at least you'll have a standard approach, and if there's an issue, you can point to your training",
        esText: "Simplemente seguir los protocolos de orientación del Sitio B consistentemente en todos los sitios — al menos tendrás un enfoque estándar, y si hay un problema, puedes señalar tu capacitación",
        score: 1,
        behaviorTag: "unstructured",
      },
    ],
  },

  // Patient Services — FQHC just switched billing systems
  {
    id: "rs_ps_t",
    roleId: "patient_services",
    domain: "transition",
    scenario:
      "You've been hired as a Patient Services Representative at an FQHC that just switched to a new billing and scheduling system two weeks before you started. The staff are frustrated and still learning the system themselves. Patients are experiencing longer wait times, scheduling errors, and insurance verification issues. Your training consisted of a 2-hour video module. On your first full day, the phone queue has 15 patients waiting, two walk-ins are upset about appointment mix-ups, and a colleague asks you to help with a Medi-Cal eligibility check you don't know how to do in the new system.",
    esScenario:
      "Te contrataron como Representante de Servicios al Paciente en un FQHC que cambió a un nuevo sistema de facturación y programación dos semanas antes de que empezaras. El personal está frustrado y aún aprendiendo el sistema. Los pacientes experimentan tiempos de espera más largos, errores de programación y problemas de verificación de seguro. Tu capacitación consistió en un módulo de video de 2 horas. En tu primer día completo, la cola telefónica tiene 15 pacientes esperando, dos pacientes sin cita están molestos por confusiones de citas, y un colega te pide ayuda con una verificación de elegibilidad de Medi-Cal que no sabes hacer en el nuevo sistema.",
    question: "How do you handle this situation?",
    esQuestion: "¿Cómo manejas esta situación?",
    options: [
      {
        id: "rs_ps_t_a",
        text: "Triage the immediate needs: help the two upset walk-in patients first (they're in front of you), then join the phone queue. For the Medi-Cal eligibility check, ask your colleague to show you how to do it once so you can handle it next time. After the morning rush, approach your supervisor to request a buddy system — pair you with an experienced rep for your first week. Create your own 'cheat sheet' of common tasks in the new system as you learn them, and share it with the team",
        esText: "Triaje de necesidades inmediatas: ayudar primero a los dos pacientes sin cita que están molestos (están frente a ti), luego unirte a la cola telefónica. Para la verificación de elegibilidad de Medi-Cal, pedir a tu colega que te muestre cómo hacerlo una vez para que puedas manejarlo la próxima vez. Después del rush de la mañana, acercarte a tu supervisor para solicitar un sistema de compañero — emparejarte con un representante experimentado para tu primera semana. Crear tu propia 'hoja de referencia' de tareas comunes en el nuevo sistema conforme las aprendas, y compartirla con el equipo",
        score: 4,
        behaviorTag: "proactive-aligner",
      },
      {
        id: "rs_ps_t_b",
        text: "Jump into the phone queue immediately — that's where the biggest backlog is. Figure out the new system by doing. Ask questions as they come up and learn in real-time",
        esText: "Unirte a la cola telefónica inmediatamente — ahí es donde está el mayor atraso. Aprender el nuevo sistema haciéndolo. Hacer preguntas conforme surjan y aprender en tiempo real",
        score: 3,
        behaviorTag: "bias-to-action",
      },
      {
        id: "rs_ps_t_c",
        text: "Tell your supervisor that a 2-hour video isn't sufficient training for a new system and request additional formal training before being put on the phones or front desk",
        esText: "Decirle a tu supervisor que un video de 2 horas no es capacitación suficiente para un nuevo sistema y solicitar capacitación formal adicional antes de que te pongan en los teléfonos o recepción",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_ps_t_d",
        text: "Focus on the tasks you can do with confidence — greeting patients, taking messages, filing paperwork — and redirect anything system-related to your more experienced colleagues until you've completed more training",
        esText: "Enfocarte en las tareas que puedes hacer con confianza — saludar pacientes, tomar mensajes, archivar documentos — y redirigir cualquier cosa relacionada con el sistema a tus colegas más experimentados hasta que hayas completado más capacitación",
        score: 1,
        behaviorTag: "passive-onboarder",
      },
    ],
  },

  // Revenue Cycle — New payer contracts changed, denial rates spiking
  {
    id: "rs_rc_t",
    roleId: "revenue_cycle",
    domain: "transition",
    scenario:
      "You've just started as a Revenue Cycle Specialist at an FQHC. During your first week, you discover that three major Medi-Cal managed care plans just changed their authorization requirements and fee schedules, but nobody at the FQHC has updated the billing workflows or documented the new rules. Denial rates have spiked 40% in the past month. The billing team is small (3 people including you), stressed, and behind on appeals. Your supervisor says, 'We need someone who can hit the ground running — figure out what's changed and fix it.'",
    esScenario:
      "Acabas de comenzar como Especialista en Ciclo de Ingresos en un FQHC. Durante tu primera semana, descubres que tres planes principales de managed care de Medi-Cal acaban de cambiar sus requisitos de autorización y tarifas, pero nadie en el FQHC ha actualizado los flujos de facturación ni documentado las nuevas reglas. Las tasas de denegación han aumentado 40% en el último mes. El equipo de facturación es pequeño (3 personas incluyéndote), estresado y atrasado en apelaciones. Tu supervisor dice, 'Necesitamos a alguien que pueda empezar fuerte — averigua qué cambió y arréglalo.'",
    question: "How do you tackle this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_rc_t_a",
        text: "Start by diagnosing the root cause: pull denial reports for the past 3 months and categorize by payer and denial reason code. Contact each of the 3 managed care plans directly to get the updated authorization requirements and fee schedules. Create a comparison document showing what changed. Meet with your supervisor to align on priorities — should you focus on stopping new denials (update workflows) or recovering revenue (work the appeals backlog)? Propose a 30-day action plan with both tracks",
        esText: "Empezar diagnosticando la causa raíz: obtener reportes de denegaciones de los últimos 3 meses y categorizar por pagador y código de razón de denegación. Contactar directamente a cada uno de los 3 planes de managed care para obtener los requisitos de autorización y tarifas actualizados. Crear un documento comparativo mostrando qué cambió. Reunirte con tu supervisor para alinear prioridades — ¿debes enfocarte en detener nuevas denegaciones (actualizar flujos) o recuperar ingresos (trabajar el atraso de apelaciones)? Proponer un plan de acción de 30 días con ambas líneas",
        score: 4,
        behaviorTag: "situation-aware",
      },
      {
        id: "rs_rc_t_b",
        text: "Dive into the appeals backlog immediately — that's the most urgent revenue recovery. Call payers to understand the denials as you work through each appeal, and learn the new rules through the process",
        esText: "Sumergirte en el atraso de apelaciones inmediatamente — esa es la recuperación de ingresos más urgente. Llamar a pagadores para entender las denegaciones mientras trabajas cada apelación, y aprender las nuevas reglas a través del proceso",
        score: 3,
        behaviorTag: "bias-to-action",
      },
      {
        id: "rs_rc_t_c",
        text: "Ask your supervisor for the payer contracts and previous billing guidelines so you can understand what the old rules were before trying to figure out what changed",
        esText: "Pedir a tu supervisor los contratos con pagadores y las guías de facturación anteriores para entender cuáles eran las reglas antiguas antes de intentar averiguar qué cambió",
        score: 2,
        behaviorTag: "waits-for-direction",
      },
      {
        id: "rs_rc_t_d",
        text: "Focus on processing current claims correctly using whatever guidelines you can find. The denials from the past month are someone else's problem — you need to make sure YOUR claims going forward are clean",
        esText: "Enfocarte en procesar las reclamaciones actuales correctamente usando las guías que puedas encontrar. Las denegaciones del mes pasado son problema de alguien más — necesitas asegurarte de que TUS reclamaciones en adelante estén limpias",
        score: 1,
        behaviorTag: "no-diagnosis",
      },
    ],
  },

  /* ================================================================ */
  /*  HR Manager                                                       */
  /* ================================================================ */

  // HR Manager - Mission
  {
    id: "rs_hr_mission",
    roleId: "hr_manager",
    domain: "mission",
    scenario:
      "Your FQHC has an urgent opening for a bilingual Care Coordinator — the panel of 200+ Medi-Cal patients has been without a coordinator for 3 weeks and no-show rates are climbing. A recruiter presents a candidate with solid clinical coordination experience but no community health background, no Spanish fluency, and no experience working with underserved populations. The hiring manager is desperate and wants to extend an offer immediately.",
    esScenario:
      "Tu FQHC tiene una vacante urgente para un Coordinador de Cuidado bilingüe — el panel de más de 200 pacientes de Medi-Cal ha estado sin coordinador por 3 semanas y las tasas de inasistencia están aumentando. Un reclutador presenta un candidato con sólida experiencia en coordinación clínica pero sin experiencia en salud comunitaria, sin fluidez en español, y sin experiencia trabajando con poblaciones desatendidas. El gerente de contratación está desesperado y quiere hacer una oferta inmediatamente.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_hr_m_a",
        text: "Acknowledge the urgency and the real patient impact of the vacancy. Propose a compromise: bring the candidate in for a working interview while simultaneously activating community-based recruiting channels (CHW networks, local college programs, community organizations). Present the hiring manager with data showing that cultural-fit hires have 40% better retention — a bad hire now means re-recruiting in 6 months",
        esText: "Reconocer la urgencia y el impacto real en los pacientes de la vacante. Proponer un compromiso: traer al candidato para una entrevista práctica mientras simultáneamente se activan canales de reclutamiento comunitario (redes de CHW, programas universitarios locales, organizaciones comunitarias). Presentar al gerente de contratación datos mostrando que contrataciones con ajuste cultural tienen 40% mejor retención — una mala contratación ahora significa reclutar de nuevo en 6 meses",
        score: 4,
        behaviorTag: "mission-steward",
      },
      {
        id: "rs_hr_m_b",
        text: "Support the hire but negotiate a 90-day probationary period with clear cultural competency milestones, and require the candidate to enroll in conversational Spanish classes within 30 days",
        esText: "Apoyar la contratación pero negociar un período de prueba de 90 días con hitos claros de competencia cultural, y requerir que el candidato se inscriba en clases de español conversacional dentro de 30 días",
        score: 3,
        behaviorTag: "pragmatic-guardrails",
      },
      {
        id: "rs_hr_m_c",
        text: "Defer to the hiring manager's judgment — they know the clinical needs better than HR does, and the patients need someone now",
        esText: "Ceder al juicio del gerente de contratación — ellos conocen las necesidades clínicas mejor que Recursos Humanos, y los pacientes necesitan a alguien ahora",
        score: 2,
        behaviorTag: "passive-deferral",
      },
      {
        id: "rs_hr_m_d",
        text: "Block the hire based on the job description requirements — the posting says 'bilingual required' and you can't make exceptions",
        esText: "Bloquear la contratación basándote en los requisitos de la descripción del puesto — la publicación dice 'bilingüe requerido' y no puedes hacer excepciones",
        score: 1,
        behaviorTag: "rigid-compliance",
      },
    ],
  },

  // HR Manager - People
  {
    id: "rs_hr_people",
    roleId: "hr_manager",
    domain: "people",
    scenario:
      "Your FQHC's SEIU local has filed a formal grievance claiming that recent schedule changes at two clinic sites were implemented without proper bargaining. The union steward is angry and threatening to escalate to an unfair labor practice charge. Your CEO wants you to 'make this go away quickly.' Meanwhile, the schedule changes were made because patient demand patterns shifted and the old schedule left afternoon slots empty while morning slots were overbooked.",
    esScenario:
      "El sindicato SEIU de tu FQHC ha presentado una queja formal alegando que los cambios recientes de horario en dos clínicas se implementaron sin negociación adecuada. El delegado sindical está enojado y amenaza con escalar a un cargo de práctica laboral injusta. Tu CEO quiere que 'resuelvas esto rápidamente.' Mientras tanto, los cambios de horario se hicieron porque los patrones de demanda de pacientes cambiaron y el horario anterior dejaba turnos de la tarde vacíos mientras los de la mañana estaban sobre-reservados.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_hr_p_a",
        text: "Schedule a meeting with the union steward within 48 hours. Come prepared with the patient demand data that drove the schedule changes. Acknowledge the procedural misstep — the changes should have gone through the bargaining process regardless of the operational reasons. Propose a path forward: retroactively bargain the changes with a commitment to a joint labor-management committee that reviews scheduling decisions quarterly. Frame the shared goal: both the union and management want adequate staffing during peak patient hours",
        esText: "Programar una reunión con el delegado sindical dentro de 48 horas. Llegar preparado con datos de demanda de pacientes que motivaron los cambios de horario. Reconocer el error procedimental — los cambios debieron pasar por el proceso de negociación sin importar las razones operativas. Proponer un camino a seguir: negociar retroactivamente los cambios con un compromiso de un comité conjunto labor-gerencia que revise decisiones de horario trimestralmente. Enmarcar el objetivo compartido: tanto el sindicato como la gerencia quieren personal adecuado durante las horas pico de pacientes",
        score: 4,
        behaviorTag: "labor-partnership",
      },
      {
        id: "rs_hr_p_b",
        text: "Meet with the union steward, acknowledge the issue, and offer to negotiate the schedule changes now while keeping the current schedules in place temporarily",
        esText: "Reunirse con el delegado sindical, reconocer el problema, y ofrecer negociar los cambios de horario ahora mientras se mantienen los horarios actuales temporalmente",
        score: 3,
        behaviorTag: "corrective-action",
      },
      {
        id: "rs_hr_p_c",
        text: "Send the union a written response defending the changes as a management right under the 'operational necessity' clause of the CBA",
        esText: "Enviar al sindicato una respuesta escrita defendiendo los cambios como un derecho de gestión bajo la cláusula de 'necesidad operativa' del convenio colectivo",
        score: 2,
        behaviorTag: "adversarial",
      },
      {
        id: "rs_hr_p_d",
        text: "Tell the CEO you'll handle it and then reverse the schedule changes entirely to make the grievance moot",
        esText: "Decirle al CEO que lo manejarás y luego revertir completamente los cambios de horario para que la queja quede sin efecto",
        score: 1,
        behaviorTag: "avoidant",
      },
    ],
  },

  // HR Manager - Execution
  {
    id: "rs_hr_execution",
    roleId: "hr_manager",
    domain: "execution",
    scenario:
      "California's SB 525 healthcare minimum wage law requires your FQHC to raise wages to $25/hour by June 2027, with interim increases starting this year. You have 6 clinic sites with different staffing mixes. Your CFO has flagged that the wage increases will cost an additional $1.2M annually — but the budget only has $800K allocated. You need to develop the compliance implementation plan and present it to the executive team in two weeks.",
    esScenario:
      "La ley SB 525 de salario mínimo de salud de California requiere que tu FQHC aumente los salarios a $25/hora para junio de 2027, con aumentos intermedios comenzando este año. Tienes 6 clínicas con diferentes combinaciones de personal. Tu CFO ha señalado que los aumentos salariales costarán $1.2M adicionales anualmente — pero el presupuesto solo tiene $800K asignados. Necesitas desarrollar el plan de implementación de cumplimiento y presentarlo al equipo ejecutivo en dos semanas.",
    question: "How do you build this plan?",
    esQuestion: "¿Cómo desarrollas este plan?",
    options: [
      {
        id: "rs_hr_e_a",
        text: "Start with a site-by-site compensation audit: map every employee's current wage against the SB 525 tier schedule and calculate the exact gap per site. Identify wage compression issues — staff just above the new minimum who will expect adjustments. Model three implementation scenarios: (1) minimum compliance only, (2) compliance + compression fix, (3) compliance + compression + market adjustment. Present all three to the executive team with cost projections and retention risk analysis for each scenario. Recommend scenario 2 as the balanced approach and propose funding the $400K gap through a combination of PPS rate optimization and operational efficiency",
        esText: "Empezar con una auditoría de compensación sitio por sitio: mapear el salario actual de cada empleado contra el cronograma de niveles SB 525 y calcular la brecha exacta por sitio. Identificar problemas de compresión salarial — personal justo por encima del nuevo mínimo que esperará ajustes. Modelar tres escenarios de implementación: (1) solo cumplimiento mínimo, (2) cumplimiento + corrección de compresión, (3) cumplimiento + compresión + ajuste de mercado. Presentar los tres al equipo ejecutivo con proyecciones de costos y análisis de riesgo de retención para cada escenario. Recomendar el escenario 2 como enfoque equilibrado y proponer financiar la brecha de $400K a través de una combinación de optimización de tarifas PPS y eficiencia operativa",
        score: 4,
        behaviorTag: "strategic-planner",
      },
      {
        id: "rs_hr_e_b",
        text: "Calculate the total cost increase per site, present the CFO with a straightforward compliance-only plan, and flag the compression risk as a separate discussion for later",
        esText: "Calcular el aumento total de costo por sitio, presentar al CFO un plan directo de solo cumplimiento, y señalar el riesgo de compresión como una discusión separada para después",
        score: 3,
        behaviorTag: "compliant-basic",
      },
      {
        id: "rs_hr_e_c",
        text: "Wait for the California Department of Healthcare Access and Information (HCAI) to publish specific implementation guidelines before building the plan",
        esText: "Esperar a que el Departamento de Acceso e Información de Salud de California (HCAI) publique guías de implementación específicas antes de construir el plan",
        score: 2,
        behaviorTag: "waits-for-guidance",
      },
      {
        id: "rs_hr_e_d",
        text: "Apply the new minimum wage to all affected employees on the compliance date and deal with compression complaints if and when they come up",
        esText: "Aplicar el nuevo salario mínimo a todos los empleados afectados en la fecha de cumplimiento y lidiar con las quejas de compresión si y cuando surjan",
        score: 1,
        behaviorTag: "reactive",
      },
    ],
  },

  // HR Manager - Growth
  {
    id: "rs_hr_growth",
    roleId: "hr_manager",
    domain: "growth",
    scenario:
      "Your FQHC is launching CalAIM Enhanced Care Management (ECM) services and needs to hire 8 new Community Health Workers within 60 days. You've never recruited for this specific role before, and the CalAIM requirements include specific training certifications that most candidates won't have yet. Your CEO mentions that several local community colleges have CHW training programs, but you don't have existing relationships with them.",
    esScenario:
      "Tu FQHC está lanzando servicios de Gestión de Cuidado Mejorado (ECM) de CalAIM y necesita contratar 8 nuevos Promotores de Salud dentro de 60 días. Nunca has reclutado para este rol específico antes, y los requisitos de CalAIM incluyen certificaciones de capacitación específicas que la mayoría de los candidatos aún no tendrán. Tu CEO menciona que varias universidades comunitarias locales tienen programas de capacitación de CHW, pero no tienes relaciones existentes con ellas.",
    question: "How do you approach this unfamiliar hiring challenge?",
    esQuestion: "¿Cómo abordas este desafío de contratación desconocido?",
    options: [
      {
        id: "rs_hr_g_a",
        text: "Invest your first week in learning the CalAIM ECM program requirements and CHW competency standards. Reach out to the community college CHW programs to establish pipeline partnerships — attend a class, meet current students, offer to speak about FQHC careers. Simultaneously, connect with other CA FQHCs that have already launched ECM programs to learn what worked in their hiring process. Design a 'hire for mission, train for certification' approach where you recruit from the communities you serve and fund the CalAIM training as part of onboarding",
        esText: "Invertir tu primera semana en aprender los requisitos del programa CalAIM ECM y los estándares de competencia CHW. Contactar los programas CHW de universidades comunitarias para establecer alianzas de pipeline — asistir a una clase, conocer estudiantes actuales, ofrecer hablar sobre carreras en FQHC. Simultáneamente, conectarte con otros FQHCs de CA que ya han lanzado programas ECM para aprender qué funcionó en su proceso de contratación. Diseñar un enfoque de 'contratar por misión, capacitar para certificación' donde reclutes de las comunidades que sirves y financies la capacitación CalAIM como parte de la incorporación",
        score: 4,
        behaviorTag: "proactive-learner",
      },
      {
        id: "rs_hr_g_b",
        text: "Post the positions on healthcare job boards with the CalAIM requirements listed, while researching the certification requirements so you can evaluate candidates accurately",
        esText: "Publicar las posiciones en portales de empleo de salud con los requisitos de CalAIM listados, mientras investigas los requisitos de certificación para poder evaluar candidatos con precisión",
        score: 3,
        behaviorTag: "standard-process",
      },
      {
        id: "rs_hr_g_c",
        text: "Ask the ECM program manager to define the exact hiring requirements and handle the initial screening — they know what they need better than HR does",
        esText: "Pedir al gerente del programa ECM que defina los requisitos exactos de contratación y maneje la selección inicial — ellos saben lo que necesitan mejor que Recursos Humanos",
        score: 2,
        behaviorTag: "delegates-expertise",
      },
      {
        id: "rs_hr_g_d",
        text: "Use a staffing agency that specializes in healthcare — they can find 8 CHWs faster than you can build a pipeline from scratch",
        esText: "Usar una agencia de personal especializada en salud — pueden encontrar 8 CHWs más rápido de lo que puedes construir un pipeline desde cero",
        score: 1,
        behaviorTag: "outsources-learning",
      },
    ],
  },

  // HR Manager - Mission 2
  {
    id: "rs_hr_mission_2",
    roleId: "hr_manager",
    domain: "mission",
    scenario:
      "Your FQHC receives NHSC loan repayment slots for 3 providers, but HR must decide allocation criteria. The Medical Director wants to reserve all 3 for physicians. Meanwhile, your FQHC has critical vacancies for a Licensed Clinical Social Worker and a Nurse Practitioner — both serving a behavioral health desert in the Inland Empire. Losing either role means 800+ Medi-Cal patients lose access to behavioral health services.",
    esScenario:
      "Tu FQHC recibe plazas de reembolso de préstamos del NHSC para 3 proveedores, pero Recursos Humanos debe decidir los criterios de asignación. El Director Médico quiere reservar las 3 para médicos. Mientras tanto, tu FQHC tiene vacantes críticas para un Trabajador Social Clínico Licenciado y un Enfermero Practicante — ambos sirviendo un desierto de salud conductual en el Inland Empire. Perder cualquiera de estos roles significa que más de 800 pacientes de Medi-Cal pierden acceso a servicios de salud conductual.",
    question: "How do you allocate the NHSC slots?",
    esQuestion: "¿Cómo asignas las plazas del NHSC?",
    options: [
      {
        id: "rs_hr_m2_a",
        text: "Build a data-driven allocation framework: analyze vacancy duration, patient panel impact, cost-of-turnover per role, and market salary gaps for each position. Present findings showing that allocating 1 slot to the LCSW and 1 to the NP closes the behavioral health gap affecting 800+ patients while still reserving 1 for a physician. Frame the NHSC program as a retention tool aligned with the FQHC's mission — not just a physician perk",
        esText: "Construir un marco de asignación basado en datos: analizar duración de vacantes, impacto en el panel de pacientes, costo de rotación por rol, y brechas salariales de mercado para cada posición. Presentar hallazgos mostrando que asignar 1 plaza al LCSW y 1 al NP cierra la brecha de salud conductual que afecta a más de 800 pacientes mientras se reserva 1 para un médico. Enmarcar el programa NHSC como una herramienta de retención alineada con la misión del FQHC — no solo un beneficio para médicos",
        score: 4,
        behaviorTag: "mission-aligned-allocator",
      },
      {
        id: "rs_hr_m2_b",
        text: "Propose splitting 2 slots for physicians and 1 for whichever behavioral health role has the longest vacancy, while documenting the unmet behavioral health need for future NHSC applications",
        esText: "Proponer dividir 2 plazas para médicos y 1 para el rol de salud conductual con la vacante más larga, mientras se documenta la necesidad no satisfecha de salud conductual para futuras solicitudes del NHSC",
        score: 3,
        behaviorTag: "compromise-seeker",
      },
      {
        id: "rs_hr_m2_c",
        text: "Defer to the Medical Director's preference — physicians are the hardest to recruit and the most expensive to replace",
        esText: "Ceder a la preferencia del Director Médico — los médicos son los más difíciles de reclutar y los más caros de reemplazar",
        score: 2,
        behaviorTag: "hierarchy-deferent",
      },
      {
        id: "rs_hr_m2_d",
        text: "Assign all 3 to physicians as requested and submit a separate NHSC application next cycle for behavioral health positions",
        esText: "Asignar las 3 a médicos como se solicitó y enviar una solicitud separada del NHSC el próximo ciclo para posiciones de salud conductual",
        score: 1,
        behaviorTag: "path-of-least-resistance",
      },
    ],
  },

  // HR Manager - Mission 3
  {
    id: "rs_hr_mission_3",
    roleId: "hr_manager",
    domain: "mission",
    scenario:
      "H.R. 1 budget cuts are projected to eliminate $1.8M in Medi-Cal funding for your FQHC over the next fiscal year. The CEO asks you to develop a workforce reduction plan that cuts $900K in personnel costs. You have 340 employees across 6 sites. The easy option is eliminating 12 Community Health Worker positions — they're the lowest-paid staff. But your CHWs are the connective tissue between the FQHC and the farmworker communities you serve, and most were hired from those same communities.",
    esScenario:
      "Los recortes presupuestarios de H.R. 1 se proyectan para eliminar $1.8M en financiamiento de Medi-Cal para tu FQHC durante el próximo año fiscal. El CEO te pide desarrollar un plan de reducción de fuerza laboral que recorte $900K en costos de personal. Tienes 340 empleados en 6 sitios. La opción fácil es eliminar 12 posiciones de Promotores de Salud — son el personal con menor salario. Pero tus CHWs son el tejido conectivo entre el FQHC y las comunidades de trabajadores agrícolas que sirves, y la mayoría fueron contratados de esas mismas comunidades.",
    question: "How do you build the reduction plan?",
    esQuestion: "¿Cómo construyes el plan de reducción?",
    options: [
      {
        id: "rs_hr_m3_a",
        text: "Refuse to take the easy path. Build a comprehensive analysis: map every position against revenue generation, grant funding, and mission criticality. Identify savings through attrition holds, executive compensation adjustments, consolidating duplicated admin roles across sites, and renegotiating vendor contracts before cutting any community-facing staff. Present the CEO with a plan that protects CHWs because they drive ECM enrollment revenue and patient retention — cutting them actually worsens the funding gap",
        esText: "Negarte a tomar el camino fácil. Construir un análisis comprehensivo: mapear cada posición contra generación de ingresos, financiamiento de subvenciones, y criticidad de misión. Identificar ahorros a través de retención de vacantes, ajustes de compensación ejecutiva, consolidación de roles administrativos duplicados entre sitios, y renegociación de contratos con proveedores antes de recortar cualquier personal comunitario. Presentar al CEO un plan que proteja a los CHWs porque impulsan ingresos de inscripción ECM y retención de pacientes — recortarlos en realidad empeora la brecha de financiamiento",
        score: 4,
        behaviorTag: "mission-guardian",
      },
      {
        id: "rs_hr_m3_b",
        text: "Propose a blended approach: reduce CHW positions by 4 through attrition only (no layoffs), implement a hiring freeze, and find the remaining savings through overtime reduction and benefit plan restructuring",
        esText: "Proponer un enfoque combinado: reducir posiciones de CHW en 4 solo por desgaste natural (sin despidos), implementar congelamiento de contrataciones, y encontrar los ahorros restantes a través de reducción de horas extras y reestructuración del plan de beneficios",
        score: 3,
        behaviorTag: "balanced-cutter",
      },
      {
        id: "rs_hr_m3_c",
        text: "Present the CHW elimination plan as requested — HR's job is to execute the reduction strategy, not to question which positions get cut",
        esText: "Presentar el plan de eliminación de CHWs como se solicitó — el trabajo de Recursos Humanos es ejecutar la estrategia de reducción, no cuestionar qué posiciones se recortan",
        score: 2,
        behaviorTag: "order-taker",
      },
      {
        id: "rs_hr_m3_d",
        text: "Suggest across-the-board salary cuts of 5% for all employees instead of layoffs — it spreads the pain equally",
        esText: "Sugerir recortes salariales generales del 5% para todos los empleados en lugar de despidos — distribuye el dolor equitativamente",
        score: 1,
        behaviorTag: "blunt-instrument",
      },
    ],
  },

  // HR Manager - People 2
  {
    id: "rs_hr_people_2",
    roleId: "hr_manager",
    domain: "people",
    scenario:
      "Three bilingual Medical Assistants at your busiest clinic site submit their resignations within the same week. In their exit interviews, all three cite the same issue: their clinic manager micromanages their patient intake workflow, publicly criticizes them in front of colleagues, and dismisses their suggestions for improving the Spanish-language intake process. The clinic manager has been with the FQHC for 12 years, is clinically excellent, and is a favorite of the Medical Director.",
    esScenario:
      "Tres Asistentes Médicos bilingües en tu clínica más ocupada presentan sus renuncias en la misma semana. En sus entrevistas de salida, los tres citan el mismo problema: su gerente de clínica microgestiona su flujo de trabajo de admisión de pacientes, los critica públicamente frente a colegas, y descarta sus sugerencias para mejorar el proceso de admisión en español. El gerente de clínica ha estado en el FQHC por 12 años, es clínicamente excelente, y es favorito del Director Médico.",
    question: "How do you address this pattern?",
    esQuestion: "¿Cómo abordas este patrón?",
    options: [
      {
        id: "rs_hr_p2_a",
        text: "Treat this as an urgent retention crisis with data. Compile the exit interview themes, calculate the cost of losing 3 MAs simultaneously (recruiting, training, lost revenue from reduced patient throughput — likely $45K+ per MA). Present the pattern to the Medical Director privately: this isn't about one complaint, it's a systemic management issue costing the FQHC $135K+. Require the clinic manager to complete a leadership development program, assign an executive coach, and implement quarterly skip-level check-ins with the MA team. Make retention metrics part of the manager's performance review",
        esText: "Tratar esto como una crisis de retención urgente con datos. Compilar los temas de entrevistas de salida, calcular el costo de perder 3 MAs simultáneamente (reclutamiento, capacitación, ingresos perdidos por reducción de rendimiento de pacientes — probablemente $45K+ por MA). Presentar el patrón al Director Médico de forma privada: esto no es sobre una queja, es un problema de gestión sistémico que le cuesta al FQHC $135K+. Requerir que el gerente de clínica complete un programa de desarrollo de liderazgo, asignar un coach ejecutivo, e implementar reuniones trimestrales de nivel superior con el equipo de MAs. Hacer que las métricas de retención sean parte de la evaluación de desempeño del gerente",
        score: 4,
        behaviorTag: "data-driven-confronter",
      },
      {
        id: "rs_hr_p2_b",
        text: "Meet with the clinic manager to share the exit interview feedback, provide coaching on management communication, and monitor the situation over the next quarter",
        esText: "Reunirse con el gerente de clínica para compartir la retroalimentación de entrevistas de salida, proporcionar coaching sobre comunicación gerencial, y monitorear la situación durante el próximo trimestre",
        score: 3,
        behaviorTag: "coaching-approach",
      },
      {
        id: "rs_hr_p2_c",
        text: "Share the exit interview themes with the Medical Director and let them handle it — the clinic manager reports to them, not to HR",
        esText: "Compartir los temas de entrevistas de salida con el Director Médico y dejar que lo manejen — el gerente de clínica reporta a ellos, no a Recursos Humanos",
        score: 2,
        behaviorTag: "hands-off",
      },
      {
        id: "rs_hr_p2_d",
        text: "Focus on backfilling the 3 MA positions quickly — turnover happens, and you can't force a tenured manager to change their style",
        esText: "Enfocarse en llenar las 3 posiciones de MA rápidamente — la rotación sucede, y no puedes forzar a un gerente con antigüedad a cambiar su estilo",
        score: 1,
        behaviorTag: "ignores-root-cause",
      },
    ],
  },

  // HR Manager - People 3
  {
    id: "rs_hr_people_3",
    roleId: "hr_manager",
    domain: "people",
    scenario:
      "Your FQHC is implementing a new HRIS system (Paylocity) to replace manual spreadsheets for tracking employee certifications, license renewals, and continuing education credits. The rollout is in 6 weeks. Your HR team of 3 is already stretched thin with open enrollment. The site managers — who will need to use the system daily — range from tech-savvy to openly resistant. One site manager told you: 'I've been tracking my staff's certifications on paper for 15 years and it works fine.'",
    esScenario:
      "Tu FQHC está implementando un nuevo sistema HRIS (Paylocity) para reemplazar hojas de cálculo manuales para rastrear certificaciones de empleados, renovaciones de licencias, y créditos de educación continua. El lanzamiento es en 6 semanas. Tu equipo de Recursos Humanos de 3 personas ya está sobrecargado con la inscripción abierta. Los gerentes de sitio — que necesitarán usar el sistema diariamente — varían desde tecnológicamente hábiles hasta abiertamente resistentes. Un gerente de sitio te dijo: 'He estado rastreando las certificaciones de mi personal en papel por 15 años y funciona bien.'",
    question: "How do you drive adoption?",
    esQuestion: "¿Cómo impulsas la adopción?",
    options: [
      {
        id: "rs_hr_p3_a",
        text: "Start with the 'why' before the 'how.' Meet with each site manager individually. For the resistant manager, show them the compliance risk: paper tracking missed 2 expired MA certifications last year that could have triggered a HRSA finding. Recruit the tech-savvy site manager as a champion — have them demo the system to peers. Create role-specific 15-minute training videos (not 2-hour workshops). Run a 2-week parallel period where both systems are used. Celebrate early wins publicly: 'Site 3 caught an expiring RN license 60 days early using the new alert system'",
        esText: "Empezar con el 'por qué' antes del 'cómo'. Reunirse con cada gerente de sitio individualmente. Para el gerente resistente, mostrarle el riesgo de cumplimiento: el rastreo en papel no detectó 2 certificaciones de MA expiradas el año pasado que podrían haber desencadenado un hallazgo de HRSA. Reclutar al gerente de sitio tecnológicamente hábil como campeón — que haga una demostración del sistema a sus pares. Crear videos de capacitación de 15 minutos específicos por rol (no talleres de 2 horas). Ejecutar un período paralelo de 2 semanas donde ambos sistemas se usen. Celebrar victorias tempranas públicamente: 'El Sitio 3 detectó una licencia de RN por expirar 60 días antes usando el nuevo sistema de alertas'",
        score: 4,
        behaviorTag: "change-champion",
      },
      {
        id: "rs_hr_p3_b",
        text: "Schedule group training sessions for all site managers, provide written guides, and set a hard cutover date — sometimes you just need to set a deadline and hold people accountable",
        esText: "Programar sesiones de capacitación grupal para todos los gerentes de sitio, proporcionar guías escritas, y establecer una fecha de corte firme — a veces solo necesitas establecer una fecha límite y hacer responsables a las personas",
        score: 3,
        behaviorTag: "deadline-driven",
      },
      {
        id: "rs_hr_p3_c",
        text: "Delay the rollout until after open enrollment — trying to launch both simultaneously will overwhelm your small HR team and the site managers",
        esText: "Retrasar el lanzamiento hasta después de la inscripción abierta — intentar lanzar ambos simultáneamente abrumará a tu pequeño equipo de Recursos Humanos y a los gerentes de sitio",
        score: 2,
        behaviorTag: "avoids-overload",
      },
      {
        id: "rs_hr_p3_d",
        text: "Have your HR team handle all the data entry into the new system themselves rather than asking site managers to change their workflow",
        esText: "Hacer que tu equipo de Recursos Humanos maneje toda la entrada de datos en el nuevo sistema ellos mismos en lugar de pedir a los gerentes de sitio que cambien su flujo de trabajo",
        score: 1,
        behaviorTag: "absorbs-all-work",
      },
    ],
  },

  // HR Manager - Execution 2
  {
    id: "rs_hr_execution_2",
    roleId: "hr_manager",
    domain: "execution",
    scenario:
      "Your FQHC's annual turnover rate is 34% — nearly double the national FQHC average of 19%. The CEO wants a retention plan on her desk in 30 days. You pull exit interview data from the last 18 months and find three dominant themes: (1) compensation below market for Medical Assistants and LVNs, (2) no clear career advancement pathways, (3) burnout from chronic understaffing. You have a $50K budget for retention initiatives this fiscal year.",
    esScenario:
      "La tasa de rotación anual de tu FQHC es del 34% — casi el doble del promedio nacional de FQHC del 19%. La CEO quiere un plan de retención en su escritorio en 30 días. Obtienes datos de entrevistas de salida de los últimos 18 meses y encuentras tres temas dominantes: (1) compensación por debajo del mercado para Asistentes Médicos y LVNs, (2) sin caminos claros de avance profesional, (3) agotamiento por falta crónica de personal. Tienes un presupuesto de $50K para iniciativas de retención este año fiscal.",
    question: "How do you build the retention plan?",
    esQuestion: "¿Cómo construyes el plan de retención?",
    options: [
      {
        id: "rs_hr_e2_a",
        text: "Build a 3-tier plan mapped to the exit interview data. Tier 1 (immediate, $0): Create career ladder frameworks for MA→LVN→RN and front desk→billing→revenue cycle with clear promotion criteria. Partner with local community colleges for tuition assistance pipelines. Tier 2 ($30K): Conduct a market compensation study for the 5 highest-turnover roles and propose targeted adjustments using PPS rate optimization revenue. Tier 3 ($20K): Launch a 'stay interview' program — proactive quarterly conversations with high-performers before they start looking. Track 90-day and 1-year retention rates as KPIs. Present the CEO with projected ROI: reducing turnover by 10% saves approximately $280K in recruiting and training costs annually",
        esText: "Construir un plan de 3 niveles mapeado a los datos de entrevistas de salida. Nivel 1 (inmediato, $0): Crear marcos de escalera profesional para MA→LVN→RN y recepción→facturación→ciclo de ingresos con criterios claros de promoción. Asociarse con colegios comunitarios locales para pipelines de asistencia de matrícula. Nivel 2 ($30K): Realizar un estudio de compensación de mercado para los 5 roles con mayor rotación y proponer ajustes dirigidos usando ingresos de optimización de tarifas PPS. Nivel 3 ($20K): Lanzar un programa de 'entrevistas de permanencia' — conversaciones proactivas trimestrales con empleados de alto rendimiento antes de que empiecen a buscar. Rastrear tasas de retención a 90 días y 1 año como KPIs. Presentar a la CEO el ROI proyectado: reducir la rotación en 10% ahorra aproximadamente $280K en costos de reclutamiento y capacitación anualmente",
        score: 4,
        behaviorTag: "data-driven-strategist",
      },
      {
        id: "rs_hr_e2_b",
        text: "Focus the $50K budget on market salary adjustments for the highest-turnover roles — compensation is the #1 driver according to exit data, so fix that first and address career pathways next fiscal year",
        esText: "Enfocar el presupuesto de $50K en ajustes salariales de mercado para los roles con mayor rotación — la compensación es el factor #1 según los datos de salida, así que corregir eso primero y abordar caminos profesionales el próximo año fiscal",
        score: 3,
        behaviorTag: "prioritizes-top-driver",
      },
      {
        id: "rs_hr_e2_c",
        text: "Recommend increasing the retention budget — $50K is insufficient to address a 34% turnover rate, and implementing an underfunded plan will just create cynicism",
        esText: "Recomendar aumentar el presupuesto de retención — $50K es insuficiente para abordar una tasa de rotación del 34%, e implementar un plan con fondos insuficientes solo creará cinismo",
        score: 2,
        behaviorTag: "budget-dependent",
      },
      {
        id: "rs_hr_e2_d",
        text: "Hire a compensation consultant to benchmark salaries and design the retention program — this is too important to get wrong with internal resources",
        esText: "Contratar un consultor de compensación para hacer benchmarking de salarios y diseñar el programa de retención — esto es demasiado importante para hacerlo mal con recursos internos",
        score: 1,
        behaviorTag: "outsources-core-function",
      },
    ],
  },

  // HR Manager - Execution 3
  {
    id: "rs_hr_execution_3",
    roleId: "hr_manager",
    domain: "execution",
    scenario:
      "An HRSA Operational Site Visit is scheduled in 8 weeks. During your pre-visit file audit, you discover that 23 out of 340 employee personnel files are missing required documentation: some lack I-9 reverification, others are missing annual TB screening records, and 4 grant-funded employees have no signed conflict-of-interest disclosures. Your HR coordinator who was responsible for file maintenance left 3 months ago and was never replaced.",
    esScenario:
      "Una Visita Operativa de HRSA está programada en 8 semanas. Durante tu auditoría previa de archivos, descubres que 23 de 340 archivos de personal están faltando documentación requerida: algunos carecen de reverificación I-9, otros faltan registros de evaluación anual de TB, y 4 empleados financiados por subvenciones no tienen declaraciones de conflicto de interés firmadas. Tu coordinador de Recursos Humanos que era responsable del mantenimiento de archivos se fue hace 3 meses y nunca fue reemplazado.",
    question: "How do you get compliant in 8 weeks?",
    esQuestion: "¿Cómo logras el cumplimiento en 8 semanas?",
    options: [
      {
        id: "rs_hr_e3_a",
        text: "Build a remediation tracker in a spreadsheet: list every deficient file, the specific missing document, the responsible party, and the deadline. Prioritize by HRSA risk level — conflict-of-interest disclosures for grant-funded staff are highest risk (potential grant conditions), I-9 issues are ICE/DOJ risk, TB screenings are occupational health compliance. Assign site managers to collect TB and COI documents from their teams within 2 weeks. Handle I-9 reverifications personally since those require specific legal knowledge. Simultaneously, build the business case for replacing the HR coordinator position — present the CEO with the compliance gap this vacancy created and the cost of a potential HRSA finding versus the $45K coordinator salary",
        esText: "Construir un rastreador de remediación en una hoja de cálculo: listar cada archivo deficiente, el documento específico faltante, la persona responsable, y la fecha límite. Priorizar por nivel de riesgo HRSA — las declaraciones de conflicto de interés para personal de subvenciones son el riesgo más alto (posibles condiciones en la subvención), los problemas de I-9 son riesgo de ICE/DOJ, las evaluaciones de TB son cumplimiento de salud ocupacional. Asignar a gerentes de sitio la recolección de documentos de TB y COI de sus equipos dentro de 2 semanas. Manejar las reverificaciones I-9 personalmente ya que requieren conocimiento legal específico. Simultáneamente, construir el caso de negocio para reemplazar la posición de coordinador de RH — presentar al CEO la brecha de cumplimiento que creó esta vacante y el costo de un posible hallazgo de HRSA versus el salario de $45K del coordinador",
        score: 4,
        behaviorTag: "systematic-remediator",
      },
      {
        id: "rs_hr_e3_b",
        text: "Focus on fixing all 23 files yourself over the next 4 weeks, then use the remaining 4 weeks to do a second verification pass before the site visit",
        esText: "Enfocarse en arreglar los 23 archivos tú mismo durante las próximas 4 semanas, luego usar las 4 semanas restantes para hacer una segunda pasada de verificación antes de la visita",
        score: 3,
        behaviorTag: "solo-fixer",
      },
      {
        id: "rs_hr_e3_c",
        text: "Hire a temporary HR contractor to handle the file remediation — you're already covering the vacant coordinator's responsibilities and can't take this on",
        esText: "Contratar un contratista temporal de RH para manejar la remediación de archivos — ya estás cubriendo las responsabilidades del coordinador vacante y no puedes asumir esto",
        score: 2,
        behaviorTag: "adds-headcount",
      },
      {
        id: "rs_hr_e3_d",
        text: "Contact HRSA to request a site visit postponement — 8 weeks isn't enough time to remediate 23 files while managing ongoing HR operations",
        esText: "Contactar a HRSA para solicitar una postergación de la visita — 8 semanas no es suficiente tiempo para remediar 23 archivos mientras se manejan las operaciones continuas de RH",
        score: 1,
        behaviorTag: "avoids-deadline",
      },
    ],
  },

  // HR Manager - Growth 2
  {
    id: "rs_hr_growth_2",
    roleId: "hr_manager",
    domain: "growth",
    scenario:
      "Your CEO wants HR to lead a Diversity, Equity, and Inclusion audit of the FQHC's hiring and promotion practices. Your workforce is 78% Latino — reflecting the patient population — but leadership positions (director-level and above) are 85% non-Latino. Several long-tenured bilingual staff have expressed frustration that they're passed over for promotions in favor of external candidates with graduate degrees but no community health experience. You've never conducted a DEI audit before.",
    esScenario:
      "Tu CEO quiere que Recursos Humanos lidere una auditoría de Diversidad, Equidad e Inclusión de las prácticas de contratación y promoción del FQHC. Tu fuerza laboral es 78% Latina — reflejando la población de pacientes — pero las posiciones de liderazgo (nivel de director y superior) son 85% no Latinas. Varios empleados bilingües con antigüedad han expresado frustración porque son pasados por alto para promociones a favor de candidatos externos con títulos de posgrado pero sin experiencia en salud comunitaria. Nunca has conducido una auditoría DEI antes.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_hr_g2_a",
        text: "Treat this as a learning opportunity that directly serves the mission. Start by researching NACHC's workforce equity frameworks and connect with HR leaders at FQHCs known for equitable promotion practices (like AltaMed, which promotes from within extensively). Conduct a quantitative analysis: map promotion rates by ethnicity, tenure, and education level over the past 5 years. Pair the data with confidential staff focus groups to capture qualitative experiences. Present findings to leadership with specific recommendations: structured promotion criteria that weight community health experience equally with formal education, internal leadership development programs, and mentorship pipelines. Set measurable goals and report quarterly",
        esText: "Tratar esto como una oportunidad de aprendizaje que sirve directamente a la misión. Empezar investigando los marcos de equidad laboral de NACHC y conectarse con líderes de RH en FQHCs conocidos por prácticas de promoción equitativas (como AltaMed, que promueve internamente extensivamente). Realizar un análisis cuantitativo: mapear tasas de promoción por etnicidad, antigüedad, y nivel educativo durante los últimos 5 años. Combinar los datos con grupos focales confidenciales de personal para capturar experiencias cualitativas. Presentar hallazgos al liderazgo con recomendaciones específicas: criterios de promoción estructurados que valoren la experiencia en salud comunitaria igualmente que la educación formal, programas internos de desarrollo de liderazgo, y pipelines de mentoría. Establecer metas medibles y reportar trimestralmente",
        score: 4,
        behaviorTag: "equity-champion",
      },
      {
        id: "rs_hr_g2_b",
        text: "Hire a DEI consulting firm to conduct the audit — this is sensitive work that requires specialized expertise to avoid legal pitfalls and ensure credibility",
        esText: "Contratar una firma consultora de DEI para conducir la auditoría — este es un trabajo sensible que requiere experiencia especializada para evitar riesgos legales y asegurar credibilidad",
        score: 3,
        behaviorTag: "seeks-expertise",
      },
      {
        id: "rs_hr_g2_c",
        text: "Pull the promotion data and present it to leadership — the numbers will speak for themselves, and the CEO can decide what changes to make",
        esText: "Obtener los datos de promoción y presentarlos al liderazgo — los números hablarán por sí solos, y el CEO puede decidir qué cambios hacer",
        score: 2,
        behaviorTag: "data-only",
      },
      {
        id: "rs_hr_g2_d",
        text: "Suggest starting with an anonymous staff survey to gauge perception before committing to a full audit — you want to make sure this is a real problem before investing resources",
        esText: "Sugerir empezar con una encuesta anónima de personal para medir percepción antes de comprometerse con una auditoría completa — quieres asegurarte de que es un problema real antes de invertir recursos",
        score: 1,
        behaviorTag: "delays-action",
      },
    ],
  },

  // HR Manager - Growth 3
  {
    id: "rs_hr_growth_3",
    roleId: "hr_manager",
    domain: "growth",
    scenario:
      "Your FQHC's board has approved a new strategic priority: becoming a Teaching Health Center to train Family Medicine residents. This will bring HRSA GME funding but requires HR to develop entirely new systems — resident onboarding, academic affiliation agreements, faculty credentialing, GME-specific employment contracts, and duty hour tracking for ACGME compliance. You have zero experience with graduate medical education employment practices.",
    esScenario:
      "La junta de tu FQHC ha aprobado una nueva prioridad estratégica: convertirse en un Centro de Salud de Enseñanza para capacitar residentes de Medicina Familiar. Esto traerá financiamiento GME de HRSA pero requiere que Recursos Humanos desarrolle sistemas completamente nuevos — incorporación de residentes, acuerdos de afiliación académica, credenciales de facultad, contratos laborales específicos de GME, y rastreo de horas de servicio para cumplimiento de ACGME. Tienes cero experiencia con prácticas laborales de educación médica de posgrado.",
    question: "How do you prepare for this new responsibility?",
    esQuestion: "¿Cómo te preparas para esta nueva responsabilidad?",
    options: [
      {
        id: "rs_hr_g3_a",
        text: "Map out every HR deliverable the Teaching Health Center designation requires, then build a learning plan. Contact HR directors at existing FQHC Teaching Health Centers (like Valley Health Team in Fresno or Shasta Community Health Center) to learn from their experience. Attend the AAFP and THC-GME consortium conferences. Study ACGME institutional requirements specific to HR: duty hours, moonlighting policies, grievance procedures. Draft a phased implementation timeline and present it to the board showing which systems you can build internally and which need legal review (affiliation agreements, resident contracts). Propose hiring a part-time GME coordinator to share the ongoing workload",
        esText: "Mapear cada entregable de RH que requiere la designación de Centro de Salud de Enseñanza, luego construir un plan de aprendizaje. Contactar a directores de RH en Centros de Salud de Enseñanza FQHC existentes (como Valley Health Team en Fresno o Shasta Community Health Center) para aprender de su experiencia. Asistir a las conferencias de AAFP y del consorcio THC-GME. Estudiar los requisitos institucionales de ACGME específicos a RH: horas de servicio, políticas de trabajo externo, procedimientos de quejas. Redactar un cronograma de implementación por fases y presentarlo a la junta mostrando qué sistemas puedes construir internamente y cuáles necesitan revisión legal (acuerdos de afiliación, contratos de residentes). Proponer contratar un coordinador GME de medio tiempo para compartir la carga de trabajo continua",
        score: 4,
        behaviorTag: "strategic-self-developer",
      },
      {
        id: "rs_hr_g3_b",
        text: "Research ACGME and HRSA THC requirements online, attend a webinar on Teaching Health Centers, and build the new systems incrementally as the program timeline progresses",
        esText: "Investigar los requisitos de ACGME y HRSA THC en línea, asistir a un webinario sobre Centros de Salud de Enseñanza, y construir los nuevos sistemas incrementalmente a medida que avanza el cronograma del programa",
        score: 3,
        behaviorTag: "self-directed-learner",
      },
      {
        id: "rs_hr_g3_c",
        text: "Recommend the FQHC hire a dedicated GME HR specialist — this is too specialized for a generalist HR manager to take on in addition to existing responsibilities",
        esText: "Recomendar que el FQHC contrate un especialista de RH en GME dedicado — esto es demasiado especializado para que un gerente de RH generalista lo asuma además de las responsabilidades existentes",
        score: 2,
        behaviorTag: "scope-limiter",
      },
      {
        id: "rs_hr_g3_d",
        text: "Let the Medical Director and the residency program director handle the GME-specific employment issues — they understand the academic medicine world better than HR does",
        esText: "Dejar que el Director Médico y el director del programa de residencia manejen los asuntos laborales específicos de GME — ellos entienden el mundo de la medicina académica mejor que Recursos Humanos",
        score: 1,
        behaviorTag: "abdicates-responsibility",
      },
    ],
  },

  // HR Manager - Transition 1
  {
    id: "rs_hr_transition",
    roleId: "hr_manager",
    domain: "transition",
    scenario:
      "You've just started as HR Manager at a 6-site FQHC with 280 employees. On your first day, you discover the previous HR Manager left abruptly 2 months ago. Since then, the Office Manager has been handling HR tasks — but employee files are disorganized, 14 positions are open with no active recruiting, the SEIU contract expires in 4 months, and three employee grievances are sitting unresolved. The CEO tells you: 'We need you to stabilize HR fast — we have an HRSA site visit in 6 months.'",
    esScenario:
      "Acabas de empezar como Gerente de Recursos Humanos en un FQHC de 6 sitios con 280 empleados. En tu primer día, descubres que el Gerente de RH anterior se fue abruptamente hace 2 meses. Desde entonces, la Gerente de Oficina ha estado manejando tareas de RH — pero los archivos de empleados están desorganizados, 14 posiciones están abiertas sin reclutamiento activo, el contrato de SEIU expira en 4 meses, y tres quejas de empleados están sin resolver. El CEO te dice: 'Necesitamos que estabilices RH rápido — tenemos una visita de HRSA en 6 meses.'",
    question: "How do you approach your first 30 days?",
    esQuestion: "¿Cómo abordas tus primeros 30 días?",
    options: [
      {
        id: "rs_hr_t1_a",
        text: "Diagnose before acting. Week 1: Meet every site manager 1-on-1 to understand their most urgent HR pain points. Review the SEIU contract, the 3 pending grievances, and the HRSA compliance requirements. Have the Office Manager walk you through what she's been covering. Week 2: Triage into 3 buckets — (1) legal/compliance risks (grievances have deadlines, CBA expiration requires bargaining notice), (2) operational emergencies (the 14 vacancies causing patient access problems), (3) HRSA readiness (file audit). Week 3-4: Address the grievances first (legal exposure), start recruiting for the 3 most critical vacancies, and begin a systematic personnel file audit. Present the CEO a 90-day stabilization plan with clear milestones",
        esText: "Diagnosticar antes de actuar. Semana 1: Reunirse con cada gerente de sitio individualmente para entender sus puntos de dolor de RH más urgentes. Revisar el contrato de SEIU, las 3 quejas pendientes, y los requisitos de cumplimiento de HRSA. Hacer que la Gerente de Oficina te explique lo que ha estado cubriendo. Semana 2: Clasificar en 3 categorías — (1) riesgos legales/de cumplimiento (las quejas tienen plazos, el vencimiento del convenio colectivo requiere aviso de negociación), (2) emergencias operativas (las 14 vacantes causando problemas de acceso a pacientes), (3) preparación para HRSA (auditoría de archivos). Semana 3-4: Abordar las quejas primero (exposición legal), comenzar reclutamiento para las 3 vacantes más críticas, y empezar una auditoría sistemática de archivos de personal. Presentar al CEO un plan de estabilización de 90 días con hitos claros",
        score: 4,
        behaviorTag: "diagnostic-leader",
      },
      {
        id: "rs_hr_t1_b",
        text: "Start with the most visible problem — the 14 open positions. Post them all immediately, set up interviews, and show quick wins on hiring. Address the grievances and SEIU contract as you settle in",
        esText: "Empezar con el problema más visible — las 14 posiciones abiertas. Publicarlas todas inmediatamente, programar entrevistas, y mostrar victorias rápidas en contratación. Abordar las quejas y el contrato de SEIU a medida que te acomodas",
        score: 3,
        behaviorTag: "action-first",
      },
      {
        id: "rs_hr_t1_c",
        text: "Focus entirely on HRSA readiness since that has the firmest deadline — audit every personnel file, fix compliance gaps, and address recruiting and labor relations after the site visit",
        esText: "Enfocarse completamente en la preparación para HRSA ya que tiene la fecha límite más firme — auditar cada archivo de personal, corregir brechas de cumplimiento, y abordar reclutamiento y relaciones laborales después de la visita",
        score: 2,
        behaviorTag: "single-track",
      },
      {
        id: "rs_hr_t1_d",
        text: "Ask the CEO for a 90-day observation period before making any changes — you need to fully understand the organization before you can fix its HR problems",
        esText: "Pedir al CEO un período de observación de 90 días antes de hacer cualquier cambio — necesitas entender completamente la organización antes de poder arreglar sus problemas de RH",
        score: 1,
        behaviorTag: "over-cautious",
      },
    ],
  },

  // HR Manager - Transition 2
  {
    id: "rs_hr_transition_2",
    roleId: "hr_manager",
    domain: "transition",
    scenario:
      "You're 3 weeks into your new HR Manager role at an FQHC. You've learned that the organization has never had a formal performance review process — managers give informal feedback sporadically, and raise decisions are made by the CEO based on personal judgment. Two long-tenured employees have filed internal complaints about favoritism. The SEIU shop steward has mentioned that the union is considering filing a grievance over inconsistent pay raise practices. The CEO tells you she's 'always done it this way' and it's worked fine.",
    esScenario:
      "Llevas 3 semanas en tu nuevo rol de Gerente de Recursos Humanos en un FQHC. Has aprendido que la organización nunca ha tenido un proceso formal de evaluación de desempeño — los gerentes dan retroalimentación informal esporádicamente, y las decisiones de aumentos las toma el CEO basándose en juicio personal. Dos empleados con antigüedad han presentado quejas internas sobre favoritismo. El delegado sindical de SEIU ha mencionado que el sindicato está considerando presentar una queja por prácticas inconsistentes de aumento salarial. La CEO te dice que 'siempre lo ha hecho así' y ha funcionado bien.",
    question: "How do you navigate this as a new hire?",
    esQuestion: "¿Cómo navegas esto como empleado nuevo?",
    options: [
      {
        id: "rs_hr_t2_a",
        text: "Build the case with data, not opinions. Pull the last 3 years of raise decisions and map them by role, tenure, performance indicators, and demographics. If the data shows inconsistency (which it likely will), present it to the CEO privately: 'I respect that your approach has worked, but here's the legal and labor risk we're carrying — and here's what the union is signaling.' Propose a phased approach: start with a simple annual review template this cycle, not a complex system. Frame it as protecting the CEO: documented performance reviews are the best defense against favoritism claims and union grievances. Get the SEIU steward's input on the framework — making the union a partner prevents the grievance",
        esText: "Construir el caso con datos, no opiniones. Obtener los últimos 3 años de decisiones de aumentos y mapearlas por rol, antigüedad, indicadores de desempeño, y demografía. Si los datos muestran inconsistencia (que probablemente lo harán), presentarlos a la CEO de forma privada: 'Respeto que su enfoque ha funcionado, pero aquí está el riesgo legal y laboral que estamos cargando — y aquí está lo que el sindicato está señalando.' Proponer un enfoque por fases: empezar con una plantilla de evaluación anual simple este ciclo, no un sistema complejo. Enmarcarlo como protección para la CEO: las evaluaciones de desempeño documentadas son la mejor defensa contra reclamos de favoritismo y quejas sindicales. Obtener la opinión del delegado de SEIU sobre el marco — hacer al sindicato un socio previene la queja",
        score: 4,
        behaviorTag: "diplomatic-change-agent",
      },
      {
        id: "rs_hr_t2_b",
        text: "Draft a performance review policy and present it to the CEO as an HR best practice. Acknowledge her current approach while explaining the legal risk of undocumented pay decisions",
        esText: "Redactar una política de evaluación de desempeño y presentarla a la CEO como una mejor práctica de RH. Reconocer su enfoque actual mientras se explica el riesgo legal de decisiones de pago no documentadas",
        score: 3,
        behaviorTag: "policy-proposer",
      },
      {
        id: "rs_hr_t2_c",
        text: "Wait until the union actually files the grievance — then you'll have leverage to convince the CEO that a formal process is necessary. Right now you're too new to push back on her management style",
        esText: "Esperar hasta que el sindicato realmente presente la queja — entonces tendrás palanca para convencer a la CEO de que un proceso formal es necesario. Ahora mismo eres muy nuevo para confrontar su estilo de gestión",
        score: 2,
        behaviorTag: "waits-for-crisis",
      },
      {
        id: "rs_hr_t2_d",
        text: "Focus on the two internal complaints first and address the performance review process later — you need to earn trust before proposing systemic changes",
        esText: "Enfocarse primero en las dos quejas internas y abordar el proceso de evaluación de desempeño después — necesitas ganar confianza antes de proponer cambios sistémicos",
        score: 1,
        behaviorTag: "avoids-root-cause",
      },
    ],
  },

  // HR Manager - Transition 3
  {
    id: "rs_hr_transition_3",
    roleId: "hr_manager",
    domain: "transition",
    scenario:
      "You've been at your new FQHC for 6 weeks. You're building relationships across sites when you discover a significant compliance gap: the organization has been classifying 8 Community Health Workers as independent contractors instead of employees. They work set schedules at FQHC sites, use FQHC equipment, and are supervised by FQHC managers — all indicators of employee status under California AB 5. The CFO set up this arrangement 2 years ago to save on benefits costs. Reclassifying them as employees would cost approximately $120K annually in benefits, payroll taxes, and SB 525 wage compliance.",
    esScenario:
      "Llevas 6 semanas en tu nuevo FQHC. Estás construyendo relaciones entre sitios cuando descubres una brecha de cumplimiento significativa: la organización ha estado clasificando a 8 Promotores de Salud como contratistas independientes en lugar de empleados. Trabajan horarios fijos en sitios del FQHC, usan equipo del FQHC, y son supervisados por gerentes del FQHC — todos indicadores de estatus de empleado bajo la ley AB 5 de California. El CFO estableció este arreglo hace 2 años para ahorrar en costos de beneficios. Reclasificarlos como empleados costaría aproximadamente $120K anuales en beneficios, impuestos de nómina, y cumplimiento de SB 525.",
    question: "How do you handle this as the new HR Manager?",
    esQuestion: "¿Cómo manejas esto como nuevo Gerente de RH?",
    options: [
      {
        id: "rs_hr_t3_a",
        text: "This is a legal and ethical line that can't wait regardless of organizational politics. Document the misclassification risk with specific AB 5 criteria. Calculate the exposure: California penalties for willful misclassification are $5,000-$25,000 per worker, plus back taxes, benefits, and potential EDD audits — total exposure could exceed $400K versus the $120K annual cost of compliance. Present this to the CEO and CFO together with a clear recommendation: reclassify immediately and build a corrective plan. Propose phasing the budget impact over 2 quarters. Be direct: 'I understand why this was set up, but my job is to protect this organization from legal risk — and this one is significant.'",
        esText: "Esta es una línea legal y ética que no puede esperar sin importar la política organizacional. Documentar el riesgo de clasificación errónea con criterios específicos de AB 5. Calcular la exposición: las penalidades de California por clasificación errónea intencional son $5,000-$25,000 por trabajador, más impuestos atrasados, beneficios, y posibles auditorías de EDD — la exposición total podría exceder $400K versus el costo anual de $120K de cumplimiento. Presentar esto al CEO y CFO juntos con una recomendación clara: reclasificar inmediatamente y construir un plan correctivo. Proponer distribuir el impacto presupuestario en 2 trimestres. Ser directo: 'Entiendo por qué se estableció esto, pero mi trabajo es proteger a esta organización del riesgo legal — y este es significativo.'",
        score: 4,
        behaviorTag: "principled-new-leader",
      },
      {
        id: "rs_hr_t3_b",
        text: "Bring the issue to the CEO privately, present the legal risk, and recommend engaging an employment attorney to advise on the reclassification process before taking action",
        esText: "Llevar el tema al CEO de forma privada, presentar el riesgo legal, y recomendar contratar un abogado laboral para asesorar sobre el proceso de reclasificación antes de tomar acción",
        score: 3,
        behaviorTag: "cautious-escalator",
      },
      {
        id: "rs_hr_t3_c",
        text: "Flag the issue in writing to the CEO and CFO but let them decide the timeline — you've only been here 6 weeks and the CFO set this up for a reason",
        esText: "Señalar el tema por escrito al CEO y CFO pero dejar que ellos decidan el cronograma — solo llevas 6 semanas y el CFO estableció esto por una razón",
        score: 2,
        behaviorTag: "documents-but-defers",
      },
      {
        id: "rs_hr_t3_d",
        text: "Keep gathering information and wait until you've been here longer to raise this — challenging the CFO's decision in your second month could damage your credibility and your working relationship",
        esText: "Seguir recopilando información y esperar hasta que lleves más tiempo para plantear esto — desafiar la decisión del CFO en tu segundo mes podría dañar tu credibilidad y tu relación laboral",
        score: 1,
        behaviorTag: "conflict-avoidant",
      },
    ],
  },

  /* ================================================================ */
  /*  Accountant                                                       */
  /* ================================================================ */

  // Accountant - Mission
  {
    id: "rs_acct_mission",
    roleId: "accountant",
    domain: "mission",
    scenario:
      "During a routine review, you discover that your FQHC has been under-billing Medi-Cal for sliding fee scale patients — the system has been applying a flat discount instead of using the correct income-based tiers. This has been going on for at least 6 months. Fixing it would recover approximately $180K in revenue, but it would also mean retroactively adjusting patient bills for some families who may now owe more than they were originally told.",
    esScenario:
      "Durante una revisión rutinaria, descubres que tu FQHC ha estado sub-facturando a Medi-Cal por pacientes de escala de tarifas deslizantes — el sistema ha estado aplicando un descuento fijo en lugar de usar los niveles correctos basados en ingresos. Esto ha estado pasando por al menos 6 meses. Corregirlo recuperaría aproximadamente $180K en ingresos, pero también significaría ajustar retroactivamente las facturas de pacientes para algunas familias que ahora podrían deber más de lo que se les dijo originalmente.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_acct_m_a",
        text: "Document the full scope of the billing error with a detailed analysis showing both the revenue impact and the patient impact. Present findings to your supervisor and the CFO together. Recommend a two-track approach: (1) fix the system going forward immediately, (2) for retroactive adjustments, work with patient services to identify affected families and apply the FQHC's hardship waiver policy — recovering the Medi-Cal reimbursement portion while protecting patients who were given incorrect information from unexpected bills. Frame this as both a compliance obligation and a mission alignment issue",
        esText: "Documentar el alcance completo del error de facturación con un análisis detallado mostrando tanto el impacto en ingresos como el impacto en pacientes. Presentar hallazgos a tu supervisor y al CFO juntos. Recomendar un enfoque de dos vías: (1) corregir el sistema hacia adelante inmediatamente, (2) para ajustes retroactivos, trabajar con servicios al paciente para identificar familias afectadas y aplicar la política de exención por dificultad del FQHC — recuperando la porción de reembolso de Medi-Cal mientras se protege a pacientes que recibieron información incorrecta de facturas inesperadas. Enmarcar esto como una obligación de cumplimiento y un tema de alineación con la misión",
        score: 4,
        behaviorTag: "mission-and-compliance",
      },
      {
        id: "rs_acct_m_b",
        text: "Fix the billing system immediately and flag the retroactive amount as a receivable. Let the CFO decide how to handle the patient-facing portion — that's a leadership decision, not an accounting one",
        esText: "Corregir el sistema de facturación inmediatamente y marcar el monto retroactivo como una cuenta por cobrar. Dejar que el CFO decida cómo manejar la porción que enfrenta el paciente — esa es una decisión de liderazgo, no de contabilidad",
        score: 3,
        behaviorTag: "technical-fix",
      },
      {
        id: "rs_acct_m_c",
        text: "Fix the system going forward but don't pursue the retroactive amount — the cost of re-billing and the patient relations damage isn't worth $180K",
        esText: "Corregir el sistema hacia adelante pero no perseguir el monto retroactivo — el costo de re-facturar y el daño en relaciones con pacientes no vale $180K",
        score: 2,
        behaviorTag: "avoids-complexity",
      },
      {
        id: "rs_acct_m_d",
        text: "Write off the $180K as a prior period adjustment and note it for next year's audit — opening up old billing is too risky",
        esText: "Dar de baja los $180K como un ajuste de período anterior y anotarlo para la auditoría del próximo año — abrir facturación antigua es demasiado riesgoso",
        score: 1,
        behaviorTag: "avoidant",
      },
    ],
  },

  // Accountant - People
  {
    id: "rs_acct_people",
    roleId: "accountant",
    domain: "people",
    scenario:
      "Your FQHC's program directors keep submitting grant expense reports late and with incorrect cost allocations. This is the third month in a row. The HRSA site visit is in 4 months, and if the grant accounting isn't clean, the FQHC could face conditions on its grant or even repayment demands. When you've raised this before, the program directors say accounting is 'not their job' and they're too busy with patient care to deal with 'paperwork.'",
    esScenario:
      "Los directores de programa de tu FQHC siguen entregando reportes de gastos de subvenciones tarde y con asignaciones de costos incorrectas. Este es el tercer mes consecutivo. La visita de HRSA es en 4 meses, y si la contabilidad de subvenciones no está limpia, el FQHC podría enfrentar condiciones en su subvención o incluso demandas de reembolso. Cuando has planteado esto antes, los directores de programa dicen que la contabilidad 'no es su trabajo' y están demasiado ocupados con la atención al paciente para lidiar con 'papeleo.'",
    question: "How do you get buy-in from non-finance staff?",
    esQuestion: "¿Cómo consigues el apoyo del personal no financiero?",
    options: [
      {
        id: "rs_acct_p_a",
        text: "Request a 30-minute slot at the next directors' meeting. Translate the accounting requirement into mission language: 'Every dollar we can't account for correctly is a dollar HRSA could claw back — that's X patient visits we lose.' Show a simplified one-page expense tracking template that takes 10 minutes per week. Offer to do a 1-on-1 walkthrough with each director. Set up automated calendar reminders for submission deadlines. Escalate the HRSA risk to the CFO as a formal finding that needs executive attention",
        esText: "Solicitar 30 minutos en la próxima reunión de directores. Traducir el requisito contable a lenguaje de misión: 'Cada dólar que no podamos contabilizar correctamente es un dólar que HRSA podría reclamar — eso son X visitas de pacientes que perdemos.' Mostrar una plantilla simplificada de una página para seguimiento de gastos que toma 10 minutos por semana. Ofrecer hacer un recorrido individual con cada director. Configurar recordatorios automáticos de calendario para fechas límite de entrega. Escalar el riesgo de HRSA al CFO como un hallazgo formal que necesita atención ejecutiva",
        score: 4,
        behaviorTag: "bridge-builder",
      },
      {
        id: "rs_acct_p_b",
        text: "Escalate the issue to the CFO and ask them to mandate compliance — this needs to come from leadership, not the accounting department",
        esText: "Escalar el problema al CFO y pedir que exijan cumplimiento — esto necesita venir del liderazgo, no del departamento de contabilidad",
        score: 3,
        behaviorTag: "escalates-up",
      },
      {
        id: "rs_acct_p_c",
        text: "Do your best to reconstruct the expense allocations yourself from available records — it's faster than trying to change other people's behavior",
        esText: "Hacer tu mejor esfuerzo para reconstruir las asignaciones de gastos tú mismo a partir de registros disponibles — es más rápido que tratar de cambiar el comportamiento de otras personas",
        score: 2,
        behaviorTag: "works-around",
      },
      {
        id: "rs_acct_p_d",
        text: "Send another email reminder about the deadline and document that you've notified them — if the grant has findings, it's on the program directors",
        esText: "Enviar otro correo recordatorio sobre la fecha límite y documentar que los has notificado — si la subvención tiene hallazgos, es responsabilidad de los directores de programa",
        score: 1,
        behaviorTag: "covers-self",
      },
    ],
  },

  // Accountant - Execution
  {
    id: "rs_acct_execution",
    roleId: "accountant",
    domain: "execution",
    scenario:
      "Your FQHC just received a HRSA financial audit finding: $45,000 in grant expenditures were flagged as 'insufficiently documented' because time-and-effort reports for grant-funded staff don't match the actual hours worked on grant activities. HRSA has given you 90 days to provide corrective documentation or the FQHC may need to return the funds. The affected period is the last fiscal year. Some of the staff involved have since left the organization.",
    esScenario:
      "Tu FQHC acaba de recibir un hallazgo de auditoría financiera de HRSA: $45,000 en gastos de subvención fueron señalados como 'insuficientemente documentados' porque los reportes de tiempo y esfuerzo del personal financiado por la subvención no coinciden con las horas reales trabajadas en actividades de la subvención. HRSA ha dado 90 días para proporcionar documentación correctiva o el FQHC podría necesitar devolver los fondos. El período afectado es el último año fiscal. Parte del personal involucrado ya dejó la organización.",
    question: "How do you tackle this audit finding?",
    esQuestion: "¿Cómo abordas este hallazgo de auditoría?",
    options: [
      {
        id: "rs_acct_e_a",
        text: "Build a 90-day corrective action plan: Week 1-2, gather all available documentation (timesheets, calendars, project records, emails) for each flagged staff member. Week 3-4, reconstruct time-and-effort certifications using supervisor attestations and project deliverable records as supporting evidence. For departed staff, contact them for voluntary certifications and use supervisor records as backup. Week 5-8, compile the corrective documentation package with a narrative explaining the methodology. Simultaneously, implement a new time-and-effort tracking system with monthly supervisor certifications to prevent recurrence. Week 9-12, submit to HRSA with the corrective plan attached",
        esText: "Construir un plan de acción correctiva de 90 días: Semana 1-2, reunir toda la documentación disponible (hojas de tiempo, calendarios, registros de proyectos, correos) para cada miembro del personal señalado. Semana 3-4, reconstruir certificaciones de tiempo y esfuerzo usando atestaciones de supervisores y registros de entregables del proyecto como evidencia de apoyo. Para personal que se fue, contactarlos para certificaciones voluntarias y usar registros de supervisores como respaldo. Semana 5-8, compilar el paquete de documentación correctiva con una narrativa explicando la metodología. Simultáneamente, implementar un nuevo sistema de seguimiento de tiempo y esfuerzo con certificaciones mensuales de supervisores para prevenir recurrencia. Semana 9-12, enviar a HRSA con el plan correctivo adjunto",
        score: 4,
        behaviorTag: "systematic-corrective",
      },
      {
        id: "rs_acct_e_b",
        text: "Focus on reconstructing the documentation for the $45K and submit it before the deadline. Address the process improvements after the immediate crisis is resolved",
        esText: "Enfocarse en reconstruir la documentación por los $45K y enviarla antes de la fecha límite. Abordar las mejoras de proceso después de que la crisis inmediata se resuelva",
        score: 3,
        behaviorTag: "crisis-focused",
      },
      {
        id: "rs_acct_e_c",
        text: "Hire an external auditor to handle the response — HRSA findings require specialized expertise that your small accounting team doesn't have",
        esText: "Contratar un auditor externo para manejar la respuesta — los hallazgos de HRSA requieren experiencia especializada que tu pequeño equipo de contabilidad no tiene",
        score: 2,
        behaviorTag: "outsources",
      },
      {
        id: "rs_acct_e_d",
        text: "Accept the $45K repayment and move on — trying to reconstruct a year of documentation for departed employees isn't realistic",
        esText: "Aceptar el reembolso de $45K y seguir adelante — tratar de reconstruir un año de documentación para empleados que se fueron no es realista",
        score: 1,
        behaviorTag: "gives-up-revenue",
      },
    ],
  },

  // Accountant - Growth
  {
    id: "rs_acct_growth",
    roleId: "accountant",
    domain: "growth",
    scenario:
      "Your FQHC is expanding its 340B Drug Pricing Program from 2 contract pharmacies to 5. Your CFO tells you that you'll now be responsible for 340B program accounting — tracking drug purchases at 340B ceiling prices, monitoring contract pharmacy claims, reconciling rebates, and ensuring split-billing compliance. You've heard of 340B but have never managed the accounting for it. The revenue impact is significant: 340B savings represent $400K annually for your FQHC.",
    esScenario:
      "Tu FQHC está expandiendo su Programa de Precios de Medicamentos 340B de 2 farmacias contratadas a 5. Tu CFO te dice que ahora serás responsable de la contabilidad del programa 340B — rastrear compras de medicamentos a precios techo 340B, monitorear reclamos de farmacias contratadas, conciliar reembolsos, y asegurar cumplimiento de facturación dividida. Has escuchado de 340B pero nunca has manejado la contabilidad para ello. El impacto en ingresos es significativo: los ahorros de 340B representan $400K anuales para tu FQHC.",
    question: "How do you get up to speed on 340B accounting?",
    esQuestion: "¿Cómo te pones al día con la contabilidad 340B?",
    options: [
      {
        id: "rs_acct_g_a",
        text: "Build a structured learning plan: Start with the HRSA 340B Program website and the Apexus (HRSA's prime vendor) free training modules. Join the 340B Health network for regulatory updates. Connect with accountants at other CA FQHCs who manage 340B programs — CPCA (California Primary Care Association) has peer learning groups. Simultaneously, audit the current 2-pharmacy 340B accounting to understand the existing system before the expansion. Create a documentation template for the 5-pharmacy model and propose monthly reconciliation meetings with the pharmacy director",
        esText: "Construir un plan de aprendizaje estructurado: Empezar con el sitio web del Programa 340B de HRSA y los módulos de capacitación gratuitos de Apexus (el proveedor principal de HRSA). Unirse a la red 340B Health para actualizaciones regulatorias. Conectarse con contadores de otros FQHCs de CA que manejan programas 340B — CPCA (Asociación de Atención Primaria de California) tiene grupos de aprendizaje entre pares. Simultáneamente, auditar la contabilidad 340B actual de 2 farmacias para entender el sistema existente antes de la expansión. Crear una plantilla de documentación para el modelo de 5 farmacias y proponer reuniones mensuales de conciliación con el director de farmacia",
        score: 4,
        behaviorTag: "systematic-learner",
      },
      {
        id: "rs_acct_g_b",
        text: "Take the Apexus 340B University online courses and review the current 340B accounting files to understand the existing setup before the expansion",
        esText: "Tomar los cursos en línea de la Universidad 340B de Apexus y revisar los archivos contables 340B actuales para entender la configuración existente antes de la expansión",
        score: 3,
        behaviorTag: "self-study",
      },
      {
        id: "rs_acct_g_c",
        text: "Ask the pharmacy director to walk you through the 340B program — they've been managing it operationally and can explain the financial side",
        esText: "Pedir al director de farmacia que te explique el programa 340B — ellos lo han estado manejando operativamente y pueden explicar el lado financiero",
        score: 2,
        behaviorTag: "relies-on-others",
      },
      {
        id: "rs_acct_g_d",
        text: "Recommend that the FQHC hire a 340B consultant to manage the expanded program — the compliance risk is too high for someone learning on the job",
        esText: "Recomendar que el FQHC contrate un consultor 340B para manejar el programa expandido — el riesgo de cumplimiento es demasiado alto para alguien aprendiendo en el trabajo",
        score: 1,
        behaviorTag: "avoids-stretch",
      },
    ],
  },

  // Accountant - Mission 2
  {
    id: "rs_acct_mission_2",
    roleId: "accountant",
    domain: "mission",
    scenario:
      "Your FQHC's CFO asks you to reclassify $95K in grant-funded staff training expenses as 'general administrative overhead' to improve the operating margin for an upcoming bank loan application. The expenses are legitimately training costs charged to a HRSA Workforce Development grant. The reclassification wouldn't technically violate GAAP, but it would misrepresent the grant's true expenditure rate to HRSA and make the training program appear underspent — potentially jeopardizing future grant renewals because HRSA would see unspent funds.",
    esScenario:
      "El CFO de tu FQHC te pide reclasificar $95K en gastos de capacitación de personal financiados por subvención como 'gastos generales administrativos' para mejorar el margen operativo para una próxima solicitud de préstamo bancario. Los gastos son legítimamente costos de capacitación cargados a una subvención de Desarrollo de Fuerza Laboral de HRSA. La reclasificación técnicamente no violaría los GAAP, pero tergiversaría la tasa real de gastos de la subvención ante HRSA y haría que el programa de capacitación parezca sub-gastado — potencialmente poniendo en riesgo futuras renovaciones de subvención porque HRSA vería fondos sin gastar.",
    question: "How do you respond to your CFO?",
    esQuestion: "¿Cómo respondes a tu CFO?",
    options: [
      {
        id: "rs_acct_m2_a",
        text: "Push back with specifics. Explain that while the reclassification is technically GAAP-compliant, it creates two risks: (1) HRSA sees the training grant as underspent, which could trigger a budget revision or reduced funding in the next cycle — that's $95K+ in future grant revenue at risk; (2) if the bank's auditors cross-reference the FQHC's federal grant reports, the inconsistency could raise red flags. Propose an alternative: prepare a supplemental financial narrative for the bank that explains the FQHC's grant-funded programs as a strength — diversified revenue streams, not overhead. Offer to help build a loan package that tells the financial story honestly",
        esText: "Objetar con detalles específicos. Explicar que aunque la reclasificación es técnicamente compatible con GAAP, crea dos riesgos: (1) HRSA ve la subvención de capacitación como sub-gastada, lo que podría desencadenar una revisión presupuestaria o financiamiento reducido en el próximo ciclo — son $95K+ en ingresos futuros de subvención en riesgo; (2) si los auditores del banco cruzan referencias con los reportes federales de subvención del FQHC, la inconsistencia podría levantar alertas. Proponer una alternativa: preparar una narrativa financiera suplementaria para el banco que explique los programas financiados por subvenciones del FQHC como una fortaleza — flujos de ingresos diversificados, no gastos generales. Ofrecer ayudar a construir un paquete de préstamo que cuente la historia financiera honestamente",
        score: 4,
        behaviorTag: "ethical-problem-solver",
      },
      {
        id: "rs_acct_m2_b",
        text: "Make the reclassification as requested but document the CFO's instruction in writing and note the original classification in the workpapers for audit trail purposes",
        esText: "Hacer la reclasificación como se solicitó pero documentar la instrucción del CFO por escrito y anotar la clasificación original en los papeles de trabajo para fines de trazabilidad de auditoría",
        score: 3,
        behaviorTag: "compliant-documenter",
      },
      {
        id: "rs_acct_m2_c",
        text: "Refuse and cite grant compliance rules — the training expenses are properly classified and moving them is a compliance violation",
        esText: "Negarse y citar reglas de cumplimiento de subvenciones — los gastos de capacitación están correctamente clasificados y moverlos es una violación de cumplimiento",
        score: 2,
        behaviorTag: "rigid-refusal",
      },
      {
        id: "rs_acct_m2_d",
        text: "Make the reclassification — the CFO is your boss and this falls within a gray area of accounting judgment. HRSA won't notice a $95K shift",
        esText: "Hacer la reclasificación — el CFO es tu jefe y esto cae dentro de una zona gris de juicio contable. HRSA no notará un cambio de $95K",
        score: 1,
        behaviorTag: "compliance-risk-taker",
      },
    ],
  },

  // Accountant - Mission 3
  {
    id: "rs_acct_mission_3",
    roleId: "accountant",
    domain: "mission",
    scenario:
      "During year-end close, you discover that your FQHC's 340B program has generated $520K in drug savings — $180K more than budgeted. The CFO wants to record all 340B savings as general operating revenue. However, you know that HRSA guidance strongly recommends 340B savings be reinvested in patient care services, and that several FQHCs have faced Congressional scrutiny for using 340B savings to fund executive bonuses and administrative expansion. Your FQHC's community advisory board has been requesting funds for a medication assistance program for uninsured patients.",
    esScenario:
      "Durante el cierre de fin de año, descubres que el programa 340B de tu FQHC ha generado $520K en ahorros de medicamentos — $180K más de lo presupuestado. El CFO quiere registrar todos los ahorros de 340B como ingresos operativos generales. Sin embargo, sabes que la guía de HRSA recomienda fuertemente que los ahorros de 340B se reinviertan en servicios de atención al paciente, y que varios FQHCs han enfrentado escrutinio del Congreso por usar ahorros de 340B para financiar bonos ejecutivos y expansión administrativa. La junta comunitaria asesora de tu FQHC ha estado solicitando fondos para un programa de asistencia de medicamentos para pacientes sin seguro.",
    question: "How do you handle the 340B accounting?",
    esQuestion: "¿Cómo manejas la contabilidad de 340B?",
    options: [
      {
        id: "rs_acct_m3_a",
        text: "Prepare a 340B savings report that separates the budgeted savings ($340K) from the surplus ($180K). Recommend to the CFO a split approach: the budgeted amount follows the existing allocation plan, but propose directing the $180K surplus toward the community advisory board's medication assistance request. Include a memo on the reputational and regulatory risk of using 340B savings for non-patient purposes — cite the recent OIG audits and Congressional hearings. Frame it as protecting the program: FQHCs that can document 340B reinvestment in patient care are better positioned when HRSA conducts 340B audits",
        esText: "Preparar un reporte de ahorros 340B que separe los ahorros presupuestados ($340K) del excedente ($180K). Recomendar al CFO un enfoque dividido: el monto presupuestado sigue el plan de asignación existente, pero proponer dirigir el excedente de $180K hacia la solicitud de programa de asistencia de medicamentos de la junta comunitaria asesora. Incluir un memo sobre el riesgo reputacional y regulatorio de usar ahorros de 340B para propósitos no relacionados con pacientes — citar las auditorías recientes del OIG y las audiencias del Congreso. Enmarcarlo como protección del programa: los FQHCs que pueden documentar reinversión de 340B en atención al paciente están mejor posicionados cuando HRSA realiza auditorías de 340B",
        score: 4,
        behaviorTag: "mission-steward-accountant",
      },
      {
        id: "rs_acct_m3_b",
        text: "Record the savings as operating revenue as directed but create a separate 340B tracking report that shows how the funds are being used — this gives the FQHC documentation if HRSA ever asks",
        esText: "Registrar los ahorros como ingresos operativos según se indicó pero crear un reporte separado de seguimiento de 340B que muestre cómo se están usando los fondos — esto le da al FQHC documentación si HRSA alguna vez pregunta",
        score: 3,
        behaviorTag: "passive-documenter",
      },
      {
        id: "rs_acct_m3_c",
        text: "Record it all as operating revenue — there's no legal requirement to segregate 340B savings, and the FQHC needs the revenue to cover its operating shortfall",
        esText: "Registrar todo como ingresos operativos — no hay requisito legal de segregar ahorros de 340B, y el FQHC necesita los ingresos para cubrir su déficit operativo",
        score: 2,
        behaviorTag: "revenue-focused",
      },
      {
        id: "rs_acct_m3_d",
        text: "Follow the CFO's direction without comment — how 340B savings are allocated is a management decision, not an accounting decision",
        esText: "Seguir la dirección del CFO sin comentarios — cómo se asignan los ahorros de 340B es una decisión de gestión, no una decisión contable",
        score: 1,
        behaviorTag: "passive-executor",
      },
    ],
  },

  // Accountant - People 2
  {
    id: "rs_acct_people_2",
    roleId: "accountant",
    domain: "people",
    scenario:
      "Your FQHC just hired a new Billing Manager who is technically skilled but keeps making decisions in isolation — she changed the claim denial follow-up process without telling the front desk supervisors, causing confusion at 3 sites. Revenue cycle staff are coming to you complaining because they see you as the 'stable presence' in the finance department. Your CFO is aware but says 'she just needs time to settle in.' Meanwhile, claim denial rates have increased 8% since her process change.",
    esScenario:
      "Tu FQHC acaba de contratar una nueva Gerente de Facturación que es técnicamente hábil pero sigue tomando decisiones en aislamiento — cambió el proceso de seguimiento de reclamos denegados sin avisar a los supervisores de recepción, causando confusión en 3 sitios. El personal del ciclo de ingresos viene a ti quejándose porque te ven como la 'presencia estable' en el departamento de finanzas. Tu CFO está al tanto pero dice 'solo necesita tiempo para adaptarse.' Mientras tanto, las tasas de denegación de reclamos han aumentado 8% desde su cambio de proceso.",
    question: "How do you navigate this lateral relationship?",
    esQuestion: "¿Cómo navegas esta relación lateral?",
    options: [
      {
        id: "rs_acct_p2_a",
        text: "Have a direct, private conversation with the Billing Manager — not as a complaint, but as a peer offering context. Share what you know about how the front desk workflows connect to billing: 'When I was handling AR reconciliation last quarter, I noticed that the front desk supervisors flag certain denials at the point of service — if they don't know about your new process, those flags get lost.' Offer to introduce her to the site supervisors so she can understand their workflows. Then bring the 8% denial increase data to the CFO — not as a complaint about the Billing Manager, but as a financial trend that needs attention. Suggest the CFO facilitate a joint workflow review meeting",
        esText: "Tener una conversación directa y privada con la Gerente de Facturación — no como una queja, sino como un par ofreciendo contexto. Compartir lo que sabes sobre cómo los flujos de trabajo de recepción se conectan con facturación: 'Cuando estaba manejando la conciliación de cuentas por cobrar el trimestre pasado, noté que los supervisores de recepción señalan ciertas denegaciones en el punto de servicio — si no saben de tu nuevo proceso, esas señales se pierden.' Ofrecer presentarla a los supervisores de sitio para que pueda entender sus flujos de trabajo. Luego llevar los datos del aumento del 8% en denegaciones al CFO — no como una queja sobre la Gerente de Facturación, sino como una tendencia financiera que necesita atención. Sugerir que el CFO facilite una reunión conjunta de revisión de flujos de trabajo",
        score: 4,
        behaviorTag: "peer-bridge-builder",
      },
      {
        id: "rs_acct_p2_b",
        text: "Share the denial rate data with the CFO and recommend they address the process change with the Billing Manager — it's the CFO's job to manage their direct reports, not yours",
        esText: "Compartir los datos de tasa de denegación con el CFO y recomendar que aborden el cambio de proceso con la Gerente de Facturación — es trabajo del CFO gestionar a sus reportes directos, no tuyo",
        score: 3,
        behaviorTag: "escalates-appropriately",
      },
      {
        id: "rs_acct_p2_c",
        text: "Stay out of it — the Billing Manager doesn't report to you, and getting involved in her management decisions will create tension in the finance department",
        esText: "Mantenerse al margen — la Gerente de Facturación no te reporta a ti, e involucrarte en sus decisiones de gestión creará tensión en el departamento de finanzas",
        score: 2,
        behaviorTag: "avoids-involvement",
      },
      {
        id: "rs_acct_p2_d",
        text: "Tell the complaining staff to raise their concerns directly with the Billing Manager or the CFO — you're the accountant, not the mediator",
        esText: "Decir al personal que se queja que planteen sus preocupaciones directamente con la Gerente de Facturación o el CFO — eres el contador, no el mediador",
        score: 1,
        behaviorTag: "deflects",
      },
    ],
  },

  // Accountant - People 3
  {
    id: "rs_acct_people_3",
    roleId: "accountant",
    domain: "people",
    scenario:
      "Your FQHC received a federal Community Health Center Fund supplemental grant of $250K for workforce development. The grant requires quarterly financial reports to HRSA. You've been assigned to work with 4 program managers who have never managed federal grant budgets before. At the kickoff meeting, one program manager says: 'Just tell me how much I can spend and I'll spend it. I don't need to understand the accounting.' Another asks: 'Can I use this money for anything I want as long as it's workforce-related?'",
    esScenario:
      "Tu FQHC recibió una subvención suplementaria federal del Fondo de Centros de Salud Comunitaria de $250K para desarrollo de fuerza laboral. La subvención requiere reportes financieros trimestrales a HRSA. Te han asignado trabajar con 4 gerentes de programa que nunca han manejado presupuestos de subvenciones federales antes. En la reunión de inicio, un gerente de programa dice: 'Solo dime cuánto puedo gastar y lo gastaré. No necesito entender la contabilidad.' Otro pregunta: '¿Puedo usar este dinero para lo que quiera mientras sea relacionado con fuerza laboral?'",
    question: "How do you set these program managers up for success?",
    esQuestion: "¿Cómo preparas a estos gerentes de programa para el éxito?",
    options: [
      {
        id: "rs_acct_p3_a",
        text: "Create a 'Grant Spending 101' one-pager in plain language — no accounting jargon. Cover the 3 things they must know: (1) allowable vs. unallowable costs under federal grants (with real examples: 'Yes to staff training travel, no to office furniture unless approved'), (2) documentation requirements ('Every purchase needs a receipt and a one-sentence justification connecting it to the grant's workforce development goal'), (3) spending deadlines ('We must spend 90% by month 9 or we risk returning funds'). Give each manager a simple budget tracker spreadsheet pre-loaded with their allocation. Schedule monthly 15-minute check-ins where they tell you what they're planning to spend next month — this catches problems before they become findings. Frame your role: 'I'm not here to say no — I'm here to make sure every dollar you spend is bulletproof when HRSA audits us'",
        esText: "Crear una hoja de 'Gastos de Subvención 101' en lenguaje simple — sin jerga contable. Cubrir las 3 cosas que deben saber: (1) costos permitidos vs. no permitidos bajo subvenciones federales (con ejemplos reales: 'Sí a viajes de capacitación de personal, no a muebles de oficina a menos que estén aprobados'), (2) requisitos de documentación ('Cada compra necesita un recibo y una justificación de una oración conectándola con el objetivo de desarrollo de fuerza laboral de la subvención'), (3) plazos de gasto ('Debemos gastar el 90% para el mes 9 o arriesgamos devolver fondos'). Dar a cada gerente una hoja de cálculo simple de seguimiento de presupuesto pre-cargada con su asignación. Programar reuniones mensuales de 15 minutos donde te digan qué planean gastar el próximo mes — esto detecta problemas antes de que se conviertan en hallazgos. Enmarcar tu rol: 'No estoy aquí para decir que no — estoy aquí para asegurar que cada dólar que gastes sea a prueba de balas cuando HRSA nos audite'",
        score: 4,
        behaviorTag: "empowering-educator",
      },
      {
        id: "rs_acct_p3_b",
        text: "Send each program manager the grant agreement and the federal Uniform Guidance cost principles (2 CFR 200), schedule a training session, and require pre-approval for all purchases over $500",
        esText: "Enviar a cada gerente de programa el acuerdo de subvención y los principios de costos de la Guía Uniforme federal (2 CFR 200), programar una sesión de capacitación, y requerir pre-aprobación para todas las compras mayores a $500",
        score: 3,
        behaviorTag: "formal-trainer",
      },
      {
        id: "rs_acct_p3_c",
        text: "Tell them that all grant purchases must be pre-approved by accounting — it's the only way to ensure compliance when the program managers don't understand grant rules",
        esText: "Decirles que todas las compras de subvención deben ser pre-aprobadas por contabilidad — es la única forma de asegurar cumplimiento cuando los gerentes de programa no entienden las reglas de subvenciones",
        score: 2,
        behaviorTag: "centralizes-control",
      },
      {
        id: "rs_acct_p3_d",
        text: "Give each manager their budget allocation and the HRSA spending guidelines. They're managers — they should be able to figure out appropriate spending on their own",
        esText: "Dar a cada gerente su asignación presupuestaria y las guías de gastos de HRSA. Son gerentes — deberían poder determinar gastos apropiados por su cuenta",
        score: 1,
        behaviorTag: "hands-off-risk",
      },
    ],
  },

  // Accountant - Execution 2
  {
    id: "rs_acct_execution_2",
    roleId: "accountant",
    domain: "execution",
    scenario:
      "Your FQHC has 6 active grants from 4 different funding sources (HRSA Section 330, HRSA HCOP, a state DHCS behavioral health grant, and a private foundation grant). Each has different fiscal years, different reporting formats, different cost allocation requirements, and different match requirements. Your current tracking system is a collection of Excel spreadsheets that the previous accountant maintained. You just discovered that $38K in shared staff costs (rent, IT, insurance) were double-allocated to two grants in Q2, which means one grant will appear overspent in the next report due in 3 weeks.",
    esScenario:
      "Tu FQHC tiene 6 subvenciones activas de 4 fuentes de financiamiento diferentes (HRSA Sección 330, HRSA HCOP, una subvención estatal de salud conductual de DHCS, y una subvención de fundación privada). Cada una tiene diferentes años fiscales, diferentes formatos de reporte, diferentes requisitos de asignación de costos, y diferentes requisitos de contrapartida. Tu sistema actual de seguimiento es una colección de hojas de cálculo de Excel que el contador anterior mantenía. Acabas de descubrir que $38K en costos compartidos de personal (renta, IT, seguro) fueron doble-asignados a dos subvenciones en el Q2, lo que significa que una subvención aparecerá sobre-gastada en el próximo reporte que vence en 3 semanas.",
    question: "How do you fix this and prevent it from recurring?",
    esQuestion: "¿Cómo corriges esto y previenes que recurra?",
    options: [
      {
        id: "rs_acct_e2_a",
        text: "Fix the immediate problem first: trace the $38K back to specific cost categories, determine which grant should properly bear each cost based on the approved budgets and cost allocation plan, and make the correcting journal entries. Prepare a brief memo explaining the error and the correction for the grant file. Then address the systemic issue: build a unified grant tracking workbook with a master cost allocation schedule that cross-references all 6 grants. Create formulas that flag when any shared cost is allocated above 100%. Propose to the CFO that the FQHC invest in grant accounting software (like Abila MIP or Sage Intacct) — the Excel system is a compliance timebomb with 6 grants and growing. Include the cost of the double-allocation error as justification",
        esText: "Corregir el problema inmediato primero: rastrear los $38K hasta categorías de costos específicas, determinar qué subvención debe cargar correctamente cada costo basándose en los presupuestos aprobados y el plan de asignación de costos, y hacer los asientos contables correctivos. Preparar un memo breve explicando el error y la corrección para el archivo de la subvención. Luego abordar el problema sistémico: construir un libro de trabajo unificado de seguimiento de subvenciones con un cronograma maestro de asignación de costos que cruce referencias de las 6 subvenciones. Crear fórmulas que alerten cuando cualquier costo compartido se asigne por encima del 100%. Proponer al CFO que el FQHC invierta en software de contabilidad de subvenciones (como Abila MIP o Sage Intacct) — el sistema de Excel es una bomba de cumplimiento con 6 subvenciones y creciendo. Incluir el costo del error de doble-asignación como justificación",
        score: 4,
        behaviorTag: "fix-and-prevent",
      },
      {
        id: "rs_acct_e2_b",
        text: "Correct the double allocation and submit the grant report on time. Rebuild the spreadsheet tracking system with better formulas and cross-checks to prevent future errors",
        esText: "Corregir la doble asignación y enviar el reporte de subvención a tiempo. Reconstruir el sistema de seguimiento de hojas de cálculo con mejores fórmulas y verificaciones cruzadas para prevenir errores futuros",
        score: 3,
        behaviorTag: "fix-focused",
      },
      {
        id: "rs_acct_e2_c",
        text: "Contact the grant officer at the overspent grant's funding agency, explain the error, and request a deadline extension to fix the allocation before submitting the report",
        esText: "Contactar al oficial de subvención de la agencia de financiamiento de la subvención sobre-gastada, explicar el error, y solicitar una extensión del plazo para corregir la asignación antes de enviar el reporte",
        score: 2,
        behaviorTag: "seeks-extension",
      },
      {
        id: "rs_acct_e2_d",
        text: "Submit the report as-is with a footnote explaining the allocation error — you don't have time to untangle $38K in shared costs across 6 grants before the deadline",
        esText: "Enviar el reporte tal como está con una nota al pie explicando el error de asignación — no tienes tiempo para desenredar $38K en costos compartidos entre 6 subvenciones antes de la fecha límite",
        score: 1,
        behaviorTag: "submits-with-errors",
      },
    ],
  },

  // Accountant - Execution 3
  {
    id: "rs_acct_execution_3",
    roleId: "accountant",
    domain: "execution",
    scenario:
      "Your FQHC is due for its annual PPS (Prospective Payment System) cost report — the filing that determines your Medi-Cal per-visit reimbursement rate for the next year. The cost report is due in 60 days. Your predecessor left incomplete workpapers from last year, the general ledger has 47 unreconciled accounts, and the COO is pushing you to 'maximize the rate' by including costs that may not be allowable under Medicare cost principles (specifically, $160K in fundraising event expenses and $85K in board retreat costs). A higher PPS rate could mean $400K+ in additional annual revenue.",
    esScenario:
      "Tu FQHC debe presentar su reporte de costos PPS (Sistema de Pago Prospectivo) anual — la presentación que determina tu tasa de reembolso por visita de Medi-Cal para el próximo año. El reporte de costos vence en 60 días. Tu predecesor dejó papeles de trabajo incompletos del año pasado, el libro mayor tiene 47 cuentas sin conciliar, y el COO te presiona para 'maximizar la tasa' incluyendo costos que pueden no ser permitidos bajo los principios de costos de Medicare (específicamente, $160K en gastos de eventos de recaudación de fondos y $85K en costos de retiro de la junta directiva). Una tasa PPS más alta podría significar $400K+ en ingresos anuales adicionales.",
    question: "How do you approach this cost report?",
    esQuestion: "¿Cómo abordas este reporte de costos?",
    options: [
      {
        id: "rs_acct_e3_a",
        text: "Build a 60-day work plan: Weeks 1-3, reconcile the 47 accounts — you can't file an accurate cost report on an unreconciled ledger. Weeks 4-6, prepare the cost report workpapers using Medicare cost principles as the standard. For the COO's request: fundraising and board retreat costs are explicitly unallowable under CMS Provider Reimbursement Manual Chapter 21. Include them and you risk a retroactive rate adjustment that could cost the FQHC more than the $400K gain. Instead, identify legitimately allowable costs that may have been excluded: CHW outreach time, quality improvement activities, interpreter services, care coordination — these are often under-reported on FQHC cost reports. Weeks 7-8, review and submit. Present the COO with a memo explaining which costs are allowable and which aren't, with CMS citations, and show the rate impact of the legitimate additions",
        esText: "Construir un plan de trabajo de 60 días: Semanas 1-3, conciliar las 47 cuentas — no puedes presentar un reporte de costos preciso sobre un libro mayor sin conciliar. Semanas 4-6, preparar los papeles de trabajo del reporte de costos usando los principios de costos de Medicare como estándar. Para la solicitud del COO: los costos de recaudación de fondos y retiro de junta son explícitamente no permitidos bajo el Manual de Reembolso de Proveedores de CMS Capítulo 21. Incluirlos y arriesgas un ajuste retroactivo de tasa que podría costarle al FQHC más que la ganancia de $400K. En cambio, identificar costos legítimamente permitidos que pueden haber sido excluidos: tiempo de alcance de CHW, actividades de mejora de calidad, servicios de interpretación, coordinación de cuidado — estos frecuentemente se sub-reportan en reportes de costos de FQHC. Semanas 7-8, revisar y enviar. Presentar al COO un memo explicando qué costos son permitidos y cuáles no, con citas de CMS, y mostrar el impacto en la tasa de las adiciones legítimas",
        score: 4,
        behaviorTag: "compliant-maximizer",
      },
      {
        id: "rs_acct_e3_b",
        text: "Reconcile the accounts and prepare the cost report with only clearly allowable costs. Flag the fundraising and board retreat costs as excluded with a brief explanation to the COO",
        esText: "Conciliar las cuentas y preparar el reporte de costos con solo costos claramente permitidos. Señalar los costos de recaudación de fondos y retiro de junta como excluidos con una explicación breve al COO",
        score: 3,
        behaviorTag: "conservative-filer",
      },
      {
        id: "rs_acct_e3_c",
        text: "Include the questionable costs as the COO requested — the worst case is they get disallowed during the desk review, and the FQHC can appeal",
        esText: "Incluir los costos cuestionables como solicitó el COO — el peor caso es que sean rechazados durante la revisión de escritorio, y el FQHC puede apelar",
        score: 2,
        behaviorTag: "aggressive-filer",
      },
      {
        id: "rs_acct_e3_d",
        text: "Hire a PPS cost report consultant — the unreconciled ledger and the pressure to include questionable costs make this too risky to handle internally",
        esText: "Contratar un consultor de reportes de costos PPS — el libro mayor sin conciliar y la presión para incluir costos cuestionables hacen que esto sea demasiado riesgoso para manejarlo internamente",
        score: 1,
        behaviorTag: "outsources-core",
      },
    ],
  },

  // Accountant - Growth 2
  {
    id: "rs_acct_growth_2",
    roleId: "accountant",
    domain: "growth",
    scenario:
      "Your CFO announces that the FQHC is transitioning from QuickBooks to Sage Intacct — a full fund accounting system designed for nonprofits and grant-funded organizations. You'll be the lead on the financial data migration and the primary user of the new system. You've used QuickBooks for 8 years and are highly proficient, but you've never worked with enterprise nonprofit accounting software. The migration must be complete before the new fiscal year starts in 4 months.",
    esScenario:
      "Tu CFO anuncia que el FQHC está transitando de QuickBooks a Sage Intacct — un sistema completo de contabilidad de fondos diseñado para organizaciones sin fines de lucro y financiadas por subvenciones. Serás el líder de la migración de datos financieros y el usuario principal del nuevo sistema. Has usado QuickBooks por 8 años y eres altamente competente, pero nunca has trabajado con software de contabilidad empresarial para organizaciones sin fines de lucro. La migración debe estar completa antes de que el nuevo año fiscal comience en 4 meses.",
    question: "How do you approach this system transition?",
    esQuestion: "¿Cómo abordas esta transición de sistema?",
    options: [
      {
        id: "rs_acct_g2_a",
        text: "Build a structured learning and migration plan. Month 1: Complete Sage Intacct's nonprofit certification training (online, self-paced). Map the current QuickBooks chart of accounts to Intacct's fund accounting structure — this is the hardest part because you'll need to redesign how grants, programs, and cost centers are tracked. Connect with accountants at other FQHCs using Intacct (CPCA peer networks) to learn their chart of accounts structure. Month 2: Set up the new system with the redesigned chart of accounts, configure grant tracking dimensions, and import historical data. Month 3: Run parallel systems — process every transaction in both QuickBooks and Intacct to verify accuracy. Month 4: Go live, decommission QuickBooks, train any other finance staff on the new system. Document every mapping decision for the auditors",
        esText: "Construir un plan estructurado de aprendizaje y migración. Mes 1: Completar la capacitación de certificación de Sage Intacct para organizaciones sin fines de lucro (en línea, a tu propio ritmo). Mapear el catálogo de cuentas actual de QuickBooks a la estructura de contabilidad de fondos de Intacct — esta es la parte más difícil porque necesitarás rediseñar cómo se rastrean las subvenciones, programas y centros de costos. Conectarse con contadores de otros FQHCs usando Intacct (redes de pares de CPCA) para aprender la estructura de su catálogo de cuentas. Mes 2: Configurar el nuevo sistema con el catálogo de cuentas rediseñado, configurar dimensiones de seguimiento de subvenciones, e importar datos históricos. Mes 3: Ejecutar sistemas paralelos — procesar cada transacción en QuickBooks e Intacct para verificar precisión. Mes 4: Ir en vivo, descomisionar QuickBooks, capacitar a cualquier otro personal de finanzas en el nuevo sistema. Documentar cada decisión de mapeo para los auditores",
        score: 4,
        behaviorTag: "systematic-transformer",
      },
      {
        id: "rs_acct_g2_b",
        text: "Sign up for Sage Intacct training, start learning the system, and work with the Intacct implementation consultant to migrate the data on their recommended timeline",
        esText: "Inscribirse en la capacitación de Sage Intacct, empezar a aprender el sistema, y trabajar con el consultor de implementación de Intacct para migrar los datos en su cronograma recomendado",
        score: 3,
        behaviorTag: "follows-vendor-lead",
      },
      {
        id: "rs_acct_g2_c",
        text: "Push back on the timeline — 4 months is too aggressive for a full accounting system migration, especially during active grant reporting periods",
        esText: "Objetar el cronograma — 4 meses es demasiado agresivo para una migración completa de sistema contable, especialmente durante períodos activos de reportes de subvenciones",
        score: 2,
        behaviorTag: "resists-timeline",
      },
      {
        id: "rs_acct_g2_d",
        text: "Ask the CFO to hire a Sage Intacct specialist to handle the migration and ongoing system management — learning a new enterprise system shouldn't fall on the accountant",
        esText: "Pedir al CFO que contrate un especialista de Sage Intacct para manejar la migración y la gestión continua del sistema — aprender un nuevo sistema empresarial no debería recaer en el contador",
        score: 1,
        behaviorTag: "avoids-growth",
      },
    ],
  },

  // Accountant - Growth 3
  {
    id: "rs_acct_growth_3",
    roleId: "accountant",
    domain: "growth",
    scenario:
      "Your CFO is leaving in 3 months. The CEO approaches you: 'We'd like to promote you to CFO. You know our grants, our PPS reporting, and our financial systems better than anyone. But you'll need to step up on board presentations, strategic planning, and banking relationships — things you haven't done before.' You've been a staff accountant for 6 years and have never managed anyone or presented to a board of directors.",
    esScenario:
      "Tu CFO se va en 3 meses. El CEO se acerca: 'Nos gustaría promoverte a CFO. Conoces nuestras subvenciones, nuestros reportes PPS, y nuestros sistemas financieros mejor que nadie. Pero necesitarás mejorar en presentaciones a la junta, planificación estratégica, y relaciones bancarias — cosas que no has hecho antes.' Has sido contador de planta por 6 años y nunca has gestionado a nadie ni presentado ante una junta directiva.",
    question: "How do you respond to this opportunity?",
    esQuestion: "¿Cómo respondes a esta oportunidad?",
    options: [
      {
        id: "rs_acct_g3_a",
        text: "Accept with a clear development plan. Ask the outgoing CFO to shadow them for the full 3 months — attend every board meeting, every bank call, every strategic planning session. Join NACHC's financial leadership network for peer mentorship from experienced FQHC CFOs. Identify your 3 biggest skill gaps (likely board communication, cash flow forecasting, and people management) and seek targeted development for each: a board presentation workshop, a CFO mentorship pairing, and a management fundamentals course. Be honest with the CEO: 'I'm ready for this challenge, and here's my plan to close the gaps in my first 6 months'",
        esText: "Aceptar con un plan de desarrollo claro. Pedir al CFO saliente que lo acompañes durante los 3 meses completos — asistir a cada reunión de junta, cada llamada bancaria, cada sesión de planificación estratégica. Unirse a la red de liderazgo financiero de NACHC para mentoría de pares de CFOs de FQHC experimentados. Identificar tus 3 mayores brechas de habilidades (probablemente comunicación con la junta, pronóstico de flujo de efectivo, y gestión de personas) y buscar desarrollo dirigido para cada una: un taller de presentación a juntas, un emparejamiento de mentoría de CFO, y un curso de fundamentos de gestión. Ser honesto con el CEO: 'Estoy listo para este desafío, y aquí está mi plan para cerrar las brechas en mis primeros 6 meses'",
        score: 4,
        behaviorTag: "strategic-growth-seeker",
      },
      {
        id: "rs_acct_g3_b",
        text: "Accept the promotion and commit to learning the CFO role over time. Focus the 3-month transition on mastering the financial reporting and board materials the CFO currently handles",
        esText: "Aceptar la promoción y comprometerse a aprender el rol de CFO con el tiempo. Enfocar la transición de 3 meses en dominar los reportes financieros y materiales de junta que el CFO actualmente maneja",
        score: 3,
        behaviorTag: "willing-but-unstructured",
      },
      {
        id: "rs_acct_g3_c",
        text: "Ask for an 'interim CFO' title first — you want to test whether you can handle the strategic responsibilities before committing to the full role",
        esText: "Pedir un título de 'CFO interino' primero — quieres probar si puedes manejar las responsabilidades estratégicas antes de comprometerte con el rol completo",
        score: 2,
        behaviorTag: "hedges-commitment",
      },
      {
        id: "rs_acct_g3_d",
        text: "Decline and suggest the FQHC recruit an experienced CFO externally — the gap between staff accountant and CFO is too large, and the organization needs someone with existing strategic experience",
        esText: "Declinar y sugerir que el FQHC reclute un CFO experimentado externamente — la brecha entre contador de planta y CFO es demasiado grande, y la organización necesita a alguien con experiencia estratégica existente",
        score: 1,
        behaviorTag: "self-limiting",
      },
    ],
  },

  // Accountant - Transition 1
  {
    id: "rs_acct_transition",
    roleId: "accountant",
    domain: "transition",
    scenario:
      "You've just started as the accountant at a mid-size FQHC with 4 clinic sites and $18M in annual revenue. On your first day, you receive a stack of boxes — the outgoing accountant's files. There's no written procedures manual. The chart of accounts has 380 line items, many with cryptic names like 'Misc-DHS-2019' and 'Old Grant Reserve.' Month-end close is in 2 weeks, and the CFO expects you to handle it. The previous accountant worked here for 11 years and kept everything in their head.",
    esScenario:
      "Acabas de empezar como contador en un FQHC de tamaño medio con 4 clínicas y $18M en ingresos anuales. En tu primer día, recibes una pila de cajas — los archivos del contador saliente. No hay un manual de procedimientos escrito. El catálogo de cuentas tiene 380 líneas, muchas con nombres crípticos como 'Misc-DHS-2019' y 'Old Grant Reserve.' El cierre de fin de mes es en 2 semanas, y el CFO espera que lo manejes. El contador anterior trabajó aquí por 11 años y mantenía todo en su cabeza.",
    question: "How do you approach your first 2 weeks?",
    esQuestion: "¿Cómo abordas tus primeras 2 semanas?",
    options: [
      {
        id: "rs_acct_t1_a",
        text: "Prioritize learning the close process over understanding everything. Day 1-3: Ask the CFO for the prior month's closing workpapers and the bank reconciliations — these reveal the actual close process even without a manual. Pull the trial balance and flag every account you don't understand. Day 4-7: Walk through each cryptic account with the CFO or the person who used it — 'Misc-DHS-2019' is probably an old DHCS grant that should have been closed. Start building your own procedures checklist as you learn each step. Day 8-14: Execute the close using your new checklist, asking the CFO to review your work. After the close, propose a chart of accounts cleanup project — 380 accounts is excessive for an $18M FQHC, and the cryptic names create audit risk. Begin documenting every procedure you learn",
        esText: "Priorizar aprender el proceso de cierre sobre entender todo. Día 1-3: Pedir al CFO los papeles de trabajo del cierre del mes anterior y las conciliaciones bancarias — estos revelan el proceso real de cierre incluso sin un manual. Obtener la balanza de comprobación y señalar cada cuenta que no entiendas. Día 4-7: Revisar cada cuenta críptica con el CFO o la persona que la usaba — 'Misc-DHS-2019' es probablemente una subvención antigua de DHCS que debería haberse cerrado. Empezar a construir tu propia lista de verificación de procedimientos a medida que aprendes cada paso. Día 8-14: Ejecutar el cierre usando tu nueva lista de verificación, pidiendo al CFO que revise tu trabajo. Después del cierre, proponer un proyecto de limpieza del catálogo de cuentas — 380 cuentas es excesivo para un FQHC de $18M, y los nombres crípticos crean riesgo de auditoría. Empezar a documentar cada procedimiento que aprendas",
        score: 4,
        behaviorTag: "structured-onboarder",
      },
      {
        id: "rs_acct_t1_b",
        text: "Focus entirely on the month-end close — study last month's workpapers, replicate the process, and ask the CFO for help on anything unclear. Worry about the chart of accounts and procedures manual later",
        esText: "Enfocarse completamente en el cierre de fin de mes — estudiar los papeles de trabajo del mes anterior, replicar el proceso, y pedir ayuda al CFO en cualquier cosa que no esté clara. Preocuparse por el catálogo de cuentas y el manual de procedimientos después",
        score: 3,
        behaviorTag: "deadline-focused",
      },
      {
        id: "rs_acct_t1_c",
        text: "Tell the CFO you need an additional month before handling a close independently — you can't responsibly close books you don't understand",
        esText: "Decirle al CFO que necesitas un mes adicional antes de manejar un cierre independientemente — no puedes cerrar libros que no entiendes de forma responsable",
        score: 2,
        behaviorTag: "requests-delay",
      },
      {
        id: "rs_acct_t1_d",
        text: "Start by reading through every file in the boxes and organizing the chart of accounts — you need to understand the full picture before you can close the books",
        esText: "Empezar leyendo cada archivo en las cajas y organizando el catálogo de cuentas — necesitas entender el panorama completo antes de poder cerrar los libros",
        score: 1,
        behaviorTag: "analysis-paralysis",
      },
    ],
  },

  // Accountant - Transition 2
  {
    id: "rs_acct_transition_2",
    roleId: "accountant",
    domain: "transition",
    scenario:
      "You're 4 weeks into your new accountant role at an FQHC. While reconciling accounts receivable, you discover that $215K in Medi-Cal claims from 6 months ago were denied and never resubmitted. The denials appear to be coding errors that could be corrected and rebilled. The previous accountant apparently marked them as 'bad debt' and wrote them off. The CFO is unaware. Rebilling would require coordinating with the billing department, which you haven't worked with yet, and the timely filing deadline for Medi-Cal rebilling is approaching in 45 days.",
    esScenario:
      "Llevas 4 semanas en tu nuevo rol de contador en un FQHC. Mientras concilias cuentas por cobrar, descubres que $215K en reclamos de Medi-Cal de hace 6 meses fueron denegados y nunca reenviados. Las denegaciones parecen ser errores de codificación que podrían corregirse y refacturarse. El contador anterior aparentemente los marcó como 'deuda incobrable' y los canceló. El CFO no está al tanto. Refacturar requeriría coordinar con el departamento de facturación, con el que aún no has trabajado, y la fecha límite de presentación oportuna para refacturación de Medi-Cal se acerca en 45 días.",
    question: "What do you do with this discovery?",
    esQuestion: "¿Qué haces con este descubrimiento?",
    options: [
      {
        id: "rs_acct_t2_a",
        text: "Act immediately — $215K is too significant to sit on. Pull the denial detail reports and categorize them by denial reason code to confirm they're rebillable. Bring the analysis to the CFO the same day: 'I found potential recovered revenue while reconciling AR — here's the data and the 45-day deadline we're working against.' Then reach out to the Billing Manager: introduce yourself through the lens of a shared win, not a critique of their department. 'I found some old denials that look correctable — if we can partner on resubmitting these in the next 30 days, that's $215K back on the books.' Reverse the bad debt write-off in the GL and reclassify as AR pending resubmission. Create a denial tracking report so this doesn't happen again",
        esText: "Actuar inmediatamente — $215K es demasiado significativo para dejarlo. Obtener los reportes de detalle de denegación y categorizarlos por código de razón de denegación para confirmar que son refacturables. Llevar el análisis al CFO el mismo día: 'Encontré potencial de ingresos recuperados mientras conciliaba cuentas por cobrar — aquí están los datos y la fecha límite de 45 días contra la que estamos trabajando.' Luego contactar a la Gerente de Facturación: presentarte a través del lente de una victoria compartida, no una crítica a su departamento. 'Encontré algunas denegaciones antiguas que parecen corregibles — si podemos asociarnos para reenviarlas en los próximos 30 días, son $215K de vuelta en los libros.' Revertir la cancelación de deuda incobrable en el GL y reclasificar como cuentas por cobrar pendientes de reenvío. Crear un reporte de seguimiento de denegaciones para que esto no vuelva a suceder",
        score: 4,
        behaviorTag: "proactive-revenue-recoverer",
      },
      {
        id: "rs_acct_t2_b",
        text: "Report the finding to the CFO with the dollar amount and the deadline, and ask them to direct the billing department to prioritize the resubmissions",
        esText: "Reportar el hallazgo al CFO con el monto en dólares y la fecha límite, y pedir que dirijan al departamento de facturación a priorizar los reenvíos",
        score: 3,
        behaviorTag: "reports-up",
      },
      {
        id: "rs_acct_t2_c",
        text: "Note the finding and plan to address it after you've completed your AR reconciliation and built a relationship with the billing department — you don't want to start your tenure by pointing out other departments' mistakes",
        esText: "Anotar el hallazgo y planear abordarlo después de completar tu conciliación de cuentas por cobrar y construir una relación con el departamento de facturación — no quieres empezar tu mandato señalando errores de otros departamentos",
        score: 2,
        behaviorTag: "relationship-first",
      },
      {
        id: "rs_acct_t2_d",
        text: "Leave it as written off — the previous accountant may have had reasons for the write-off that you don't understand yet, and challenging their decisions this early could create tension",
        esText: "Dejarlo como cancelado — el contador anterior puede haber tenido razones para la cancelación que aún no entiendes, y cuestionar sus decisiones tan pronto podría crear tensión",
        score: 1,
        behaviorTag: "preserves-status-quo",
      },
    ],
  },

  // Accountant - Transition 3
  {
    id: "rs_acct_transition_3",
    roleId: "accountant",
    domain: "transition",
    scenario:
      "You've been at your new FQHC for 8 weeks. An HRSA Notice of Award just arrived for a new $400K behavioral health integration grant your FQHC applied for 6 months ago — before you were hired. Nobody on the current finance team was involved in the budget development. The grant requires establishing a separate fund, a cost allocation methodology for shared costs, quarterly financial reporting to HRSA, and your first report is due in 75 days. The program director has already started hiring staff against the grant budget.",
    esScenario:
      "Llevas 8 semanas en tu nuevo FQHC. Acaba de llegar un Aviso de Adjudicación de HRSA para una nueva subvención de $400K de integración de salud conductual que tu FQHC solicitó hace 6 meses — antes de que fueras contratado. Nadie en el equipo financiero actual estuvo involucrado en el desarrollo del presupuesto. La subvención requiere establecer un fondo separado, una metodología de asignación de costos para costos compartidos, reportes financieros trimestrales a HRSA, y tu primer reporte vence en 75 días. El director de programa ya ha empezado a contratar personal contra el presupuesto de la subvención.",
    question: "How do you set up this new grant?",
    esQuestion: "¿Cómo configuras esta nueva subvención?",
    options: [
      {
        id: "rs_acct_t3_a",
        text: "Move fast but methodically. Day 1: Read the entire Notice of Award, the approved budget, and the terms and conditions — understand what HRSA approved before spending begins. Day 2-3: Meet with the program director to align on the budget categories and staffing plan. Flag any hires that don't match the approved budget — if the PD is hiring positions not in the grant budget, those costs can't be charged to the grant. Day 4-10: Set up the fund in the accounting system with cost centers matching the approved budget categories. Develop the cost allocation methodology for shared costs (rent, IT, admin) — use the same methodology your FQHC uses for other federal grants for consistency. Day 11-20: Create the quarterly report template and populate it with the initial data. Build a spending tracker dashboard for the program director so they can see real-time budget consumption. Schedule monthly budget-to-actual reviews with the PD",
        esText: "Moverse rápido pero metódicamente. Día 1: Leer completamente el Aviso de Adjudicación, el presupuesto aprobado, y los términos y condiciones — entender qué aprobó HRSA antes de que comience el gasto. Día 2-3: Reunirse con el director de programa para alinear las categorías presupuestarias y el plan de personal. Señalar cualquier contratación que no coincida con el presupuesto aprobado — si el director está contratando posiciones no incluidas en el presupuesto de la subvención, esos costos no se pueden cargar a la subvención. Día 4-10: Configurar el fondo en el sistema contable con centros de costos que coincidan con las categorías del presupuesto aprobado. Desarrollar la metodología de asignación de costos para costos compartidos (renta, IT, administración) — usar la misma metodología que tu FQHC usa para otras subvenciones federales para consistencia. Día 11-20: Crear la plantilla de reporte trimestral y poblarla con los datos iniciales. Construir un tablero de seguimiento de gastos para el director de programa para que pueda ver el consumo presupuestario en tiempo real. Programar revisiones mensuales de presupuesto vs. real con el director de programa",
        score: 4,
        behaviorTag: "grant-startup-expert",
      },
      {
        id: "rs_acct_t3_b",
        text: "Set up the fund and cost centers in the accounting system, review the approved budget, and schedule a kickoff meeting with the program director to establish spending procedures",
        esText: "Configurar el fondo y centros de costos en el sistema contable, revisar el presupuesto aprobado, y programar una reunión de inicio con el director de programa para establecer procedimientos de gasto",
        score: 3,
        behaviorTag: "standard-setup",
      },
      {
        id: "rs_acct_t3_c",
        text: "Ask the CFO to handle the grant setup since you weren't involved in the application — you need more institutional knowledge before managing a new federal grant",
        esText: "Pedir al CFO que maneje la configuración de la subvención ya que no estuviste involucrado en la solicitud — necesitas más conocimiento institucional antes de manejar una nueva subvención federal",
        score: 2,
        behaviorTag: "defers-to-experience",
      },
      {
        id: "rs_acct_t3_d",
        text: "Wait for the program director to tell you what they need from accounting — they wrote the grant proposal and understand the program better than you do",
        esText: "Esperar a que el director de programa te diga qué necesitan de contabilidad — ellos escribieron la propuesta de subvención y entienden el programa mejor que tú",
        score: 1,
        behaviorTag: "passive-new-hire",
      },
    ],
  },

  /* ================================================================ */
  /*  Payroll Specialist                                               */
  /* ================================================================ */

  // Payroll Specialist - Mission
  {
    id: "rs_pay_mission",
    roleId: "payroll_specialist",
    domain: "mission",
    scenario:
      "It's the day before payday and you discover that a system error has calculated overtime incorrectly for 15 Medical Assistants across 3 clinic sites — they'll each be underpaid by $200-400 on tomorrow's check. Most of these MAs are hourly workers living paycheck to paycheck, and several have told you informally that they're already stressed about rent increases. Your payroll system vendor says the fix requires a patch that won't be ready until next week. Your manager suggests issuing corrections on the next pay cycle in two weeks.",
    esScenario:
      "Es el día antes del día de pago y descubres que un error del sistema ha calculado las horas extras incorrectamente para 15 Asistentes Médicos en 3 clínicas — cada uno recibirá entre $200-400 menos en el cheque de mañana. La mayoría de estos MAs son trabajadores por hora que viven de cheque en cheque, y varios te han dicho informalmente que ya están estresados por aumentos de renta. El proveedor de tu sistema de nómina dice que la corrección requiere un parche que no estará listo hasta la próxima semana. Tu gerente sugiere emitir correcciones en el próximo ciclo de pago en dos semanas.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_pay_m_a",
        text: "Escalate immediately — waiting two weeks to correct a payroll error for hourly healthcare workers is both a CA labor law violation (underpayment must be corrected promptly) and a mission failure. Calculate the exact shortage for each MA manually. Request emergency off-cycle checks or direct deposits for the difference. Notify each affected employee personally before payday so they know the shortage and the fix timeline. Document everything for compliance. Then work with the vendor on the system patch to prevent recurrence",
        esText: "Escalar inmediatamente — esperar dos semanas para corregir un error de nómina para trabajadores por hora de salud es tanto una violación de la ley laboral de CA (el pago insuficiente debe corregirse prontamente) como una falla de misión. Calcular el faltante exacto para cada MA manualmente. Solicitar cheques de emergencia fuera de ciclo o depósitos directos por la diferencia. Notificar a cada empleado afectado personalmente antes del día de pago para que sepan del faltante y el cronograma de corrección. Documentar todo para cumplimiento. Luego trabajar con el proveedor en el parche del sistema para prevenir recurrencia",
        score: 4,
        behaviorTag: "worker-advocate",
      },
      {
        id: "rs_pay_m_b",
        text: "Process the payroll as-is tomorrow but immediately start processing off-cycle corrections for early next week. Send each affected MA an email explaining the error and the correction timeline",
        esText: "Procesar la nómina tal como está mañana pero inmediatamente comenzar a procesar correcciones fuera de ciclo para principios de la próxima semana. Enviar a cada MA afectado un correo explicando el error y el cronograma de corrección",
        score: 3,
        behaviorTag: "quick-corrector",
      },
      {
        id: "rs_pay_m_c",
        text: "Follow your manager's suggestion and correct it on the next pay cycle — the error will be fixed, just two weeks late",
        esText: "Seguir la sugerencia de tu gerente y corregirlo en el próximo ciclo de pago — el error se corregirá, solo dos semanas tarde",
        score: 2,
        behaviorTag: "follows-direction",
      },
      {
        id: "rs_pay_m_d",
        text: "Wait for the vendor patch to fix the system calculation — manually overriding the payroll could introduce other errors",
        esText: "Esperar el parche del proveedor para corregir el cálculo del sistema — anular manualmente la nómina podría introducir otros errores",
        score: 1,
        behaviorTag: "risk-averse-passive",
      },
    ],
  },

  // Payroll Specialist - People
  {
    id: "rs_pay_people",
    roleId: "payroll_specialist",
    domain: "people",
    scenario:
      "A union steward from SEIU Local 521 contacts you directly, upset about a pay discrepancy for three Registered Nurses. They claim the nurses were not paid the correct shift differential for night shifts worked last month. The union steward is confrontational: 'This is the second time in three months your department has shorted our nurses. We're filing a grievance and contacting the Labor Commissioner.' You check the records and find the discrepancy is real — a timekeeper at one site entered the wrong shift codes.",
    esScenario:
      "Un delegado sindical de SEIU Local 521 te contacta directamente, molesto por una discrepancia salarial de tres Enfermeras Registradas. Alegan que las enfermeras no recibieron el diferencial de turno correcto por turnos nocturnos trabajados el mes pasado. El delegado sindical es confrontativo: 'Esta es la segunda vez en tres meses que su departamento les ha pagado de menos a nuestras enfermeras. Vamos a presentar una queja y contactar al Comisionado Laboral.' Revisas los registros y encuentras que la discrepancia es real — un encargado de registro de tiempo en un sitio ingresó los códigos de turno equivocados.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_pay_p_a",
        text: "Acknowledge the error immediately and without defensiveness — the union steward is right to be upset. Provide the specific dollar amounts owed to each nurse within 24 hours. Commit to issuing corrections on the next available pay run. Then address the root cause: meet with the site timekeeper to retrain on shift differential codes, implement a cross-check process where payroll verifies shift differentials before processing. Share the corrective actions with the union steward and offer a standing monthly check-in to catch issues before they become grievances",
        esText: "Reconocer el error inmediatamente y sin estar a la defensiva — el delegado sindical tiene razón en estar molesto. Proporcionar los montos exactos adeudados a cada enfermera dentro de 24 horas. Comprometerse a emitir correcciones en la próxima nómina disponible. Luego abordar la causa raíz: reunirse con el encargado de registro de tiempo del sitio para reentrenamiento en códigos de diferencial de turno, implementar un proceso de verificación cruzada donde nómina verifique los diferenciales de turno antes de procesar. Compartir las acciones correctivas con el delegado sindical y ofrecer una reunión mensual permanente para detectar problemas antes de que se conviertan en quejas",
        score: 4,
        behaviorTag: "accountability-builder",
      },
      {
        id: "rs_pay_p_b",
        text: "Confirm the error, apologize, and commit to correcting the pay within one pay cycle. Ask the union steward to hold off on the grievance while you process the corrections",
        esText: "Confirmar el error, disculparse, y comprometerse a corregir el pago dentro de un ciclo de nómina. Pedir al delegado sindical que espere con la queja mientras procesas las correcciones",
        score: 3,
        behaviorTag: "responsive-reactive",
      },
      {
        id: "rs_pay_p_c",
        text: "Tell the union steward that grievances should go through HR, not payroll — you'll process the correction once the formal grievance is filed and approved",
        esText: "Decirle al delegado sindical que las quejas deben ir a través de Recursos Humanos, no nómina — procesarás la corrección una vez que la queja formal sea presentada y aprobada",
        score: 2,
        behaviorTag: "bureaucratic",
      },
      {
        id: "rs_pay_p_d",
        text: "Explain that the error was the timekeeper's fault, not payroll's, and redirect the steward to speak with the site manager about the incorrect time entries",
        esText: "Explicar que el error fue del encargado de registro de tiempo, no de nómina, y redirigir al delegado al gerente del sitio sobre las entradas de tiempo incorrectas",
        score: 1,
        behaviorTag: "blame-shifting",
      },
    ],
  },

  // Payroll Specialist - Execution
  {
    id: "rs_pay_execution",
    roleId: "payroll_specialist",
    domain: "execution",
    scenario:
      "Your FQHC operates 6 clinic sites across 2 counties. SB 525 requires you to implement a tiered minimum wage increase: $23/hour this year, $24/hour next year, $25/hour by 2027. Each site has a different mix of exempt and non-exempt employees, different shift differentials, and two sites have unionized staff whose CBA includes wage reopener clauses tied to minimum wage changes. You need to implement the first tier increase across all 6 sites in the next payroll cycle (2 weeks). Your payroll system (ADP Workforce Now) needs to be updated, all affected employees need notification, and the two unionized sites may require bargaining.",
    esScenario:
      "Tu FQHC opera 6 clínicas en 2 condados. SB 525 requiere implementar un aumento escalonado del salario mínimo: $23/hora este año, $24/hora el próximo año, $25/hora para 2027. Cada sitio tiene una mezcla diferente de empleados exentos y no exentos, diferentes diferenciales de turno, y dos sitios tienen personal sindicalizado cuyos convenios colectivos incluyen cláusulas de reapertura salarial vinculadas a cambios de salario mínimo. Necesitas implementar el primer nivel de aumento en los 6 sitios en el próximo ciclo de nómina (2 semanas). Tu sistema de nómina (ADP Workforce Now) necesita actualizarse, todos los empleados afectados necesitan notificación, y los dos sitios sindicalizados podrían requerir negociación.",
    question: "How do you execute this?",
    esQuestion: "¿Cómo ejecutas esto?",
    options: [
      {
        id: "rs_pay_e_a",
        text: "Create a site-by-site implementation checklist: For each site, pull the current employee roster, flag everyone under $23/hour, calculate the new rate and the budget impact. For the two unionized sites, immediately alert HR that the CBA wage reopener clause is triggered — they need to initiate bargaining before you can process. For non-union sites, update ADP with the new rates, run a test payroll to verify calculations, and prepare individual notification letters showing old rate → new rate → effective date. Build a tracking spreadsheet with status by site. Send a summary to the CFO showing total cost impact and completion status",
        esText: "Crear una lista de verificación de implementación sitio por sitio: Para cada sitio, obtener la nómina actual de empleados, señalar a todos los que están bajo $23/hora, calcular la nueva tarifa y el impacto presupuestario. Para los dos sitios sindicalizados, alertar inmediatamente a Recursos Humanos que la cláusula de reapertura salarial del convenio colectivo se ha activado — necesitan iniciar negociación antes de que puedas procesar. Para sitios no sindicalizados, actualizar ADP con las nuevas tarifas, ejecutar una nómina de prueba para verificar cálculos, y preparar cartas de notificación individuales mostrando tarifa anterior → nueva tarifa → fecha efectiva. Construir una hoja de seguimiento con estado por sitio. Enviar un resumen al CFO mostrando impacto total de costos y estado de finalización",
        score: 4,
        behaviorTag: "multi-site-executor",
      },
      {
        id: "rs_pay_e_b",
        text: "Update ADP for all 6 sites at once with the new minimum, run a test payroll, and notify affected employees via email. Flag the union sites to HR for CBA review",
        esText: "Actualizar ADP para los 6 sitios a la vez con el nuevo mínimo, ejecutar una nómina de prueba, y notificar a empleados afectados por correo. Señalar los sitios sindicalizados a Recursos Humanos para revisión del convenio",
        score: 3,
        behaviorTag: "efficient-processor",
      },
      {
        id: "rs_pay_e_c",
        text: "Start with the 4 non-union sites since those are simpler, and hold the 2 union sites until HR tells you what the bargaining outcome is",
        esText: "Empezar con los 4 sitios no sindicalizados ya que son más simples, y esperar con los 2 sitios sindicalizados hasta que Recursos Humanos te diga cuál es el resultado de la negociación",
        score: 2,
        behaviorTag: "partial-execution",
      },
      {
        id: "rs_pay_e_d",
        text: "Ask your ADP account representative to handle the rate updates — they know the system better and can ensure it's done correctly",
        esText: "Pedir a tu representante de cuenta de ADP que maneje las actualizaciones de tarifas — ellos conocen el sistema mejor y pueden asegurar que se haga correctamente",
        score: 1,
        behaviorTag: "outsources-core",
      },
    ],
  },

  // Payroll Specialist - Growth
  {
    id: "rs_pay_growth",
    roleId: "payroll_specialist",
    domain: "growth",
    scenario:
      "Your FQHC has just acquired a small rural clinic 2 hours away. This new site has 25 employees on a completely different payroll system (Paychex), different pay schedules (semi-monthly vs. your bi-weekly), and different benefit enrollment dates. Your CFO wants the new site fully integrated into your ADP system within 90 days. You've never done a payroll system migration before.",
    esScenario:
      "Tu FQHC acaba de adquirir una pequeña clínica rural a 2 horas de distancia. Este nuevo sitio tiene 25 empleados en un sistema de nómina completamente diferente (Paychex), diferentes calendarios de pago (quincenal vs. tu bisemanal), y diferentes fechas de inscripción de beneficios. Tu CFO quiere que el nuevo sitio esté completamente integrado en tu sistema ADP dentro de 90 días. Nunca has hecho una migración de sistema de nómina antes.",
    question: "How do you approach this unfamiliar challenge?",
    esQuestion: "¿Cómo abordas este desafío desconocido?",
    options: [
      {
        id: "rs_pay_g_a",
        text: "Break the 90-day migration into phases: Days 1-15, audit the Paychex system — pull every employee record, pay rate, tax withholding, garnishment, benefit deduction, and PTO accrual. Compare pay schedules and identify the transition date where semi-monthly aligns closest to bi-weekly to minimize employee confusion. Days 16-45, build the new site in ADP, enter all employee data, and run parallel payrolls (Paychex and ADP) for one cycle to verify accuracy. Days 46-75, go live on ADP, provide each employee a comparison showing their old vs. new pay statement. Days 76-90, decommission Paychex, archive records. Contact your ADP implementation team for migration support and connect with payroll managers at other multi-site FQHCs who've done similar transitions",
        esText: "Dividir la migración de 90 días en fases: Días 1-15, auditar el sistema Paychex — obtener cada registro de empleado, tarifa de pago, retención fiscal, embargo, deducción de beneficios, y acumulación de PTO. Comparar calendarios de pago e identificar la fecha de transición donde quincenal se alinea más con bisemanal para minimizar confusión del empleado. Días 16-45, construir el nuevo sitio en ADP, ingresar todos los datos de empleados, y ejecutar nóminas paralelas (Paychex y ADP) por un ciclo para verificar precisión. Días 46-75, ir en vivo en ADP, proporcionar a cada empleado una comparación mostrando su recibo de pago anterior vs. nuevo. Días 76-90, descomisionar Paychex, archivar registros. Contactar al equipo de implementación de ADP para soporte de migración y conectarse con gerentes de nómina de otros FQHCs multi-sitio que han hecho transiciones similares",
        score: 4,
        behaviorTag: "structured-migrator",
      },
      {
        id: "rs_pay_g_b",
        text: "Start by getting full data exports from Paychex and mapping each field to ADP. Run parallel payrolls for at least one cycle before switching over",
        esText: "Empezar obteniendo exportaciones completas de datos de Paychex y mapeando cada campo a ADP. Ejecutar nóminas paralelas por al menos un ciclo antes de hacer el cambio",
        score: 3,
        behaviorTag: "methodical",
      },
      {
        id: "rs_pay_g_c",
        text: "Ask ADP to assign a migration specialist to handle the technical setup while you focus on communicating the changes to the new site's employees",
        esText: "Pedir a ADP que asigne un especialista en migración para manejar la configuración técnica mientras te enfocas en comunicar los cambios a los empleados del nuevo sitio",
        score: 2,
        behaviorTag: "delegates-technical",
      },
      {
        id: "rs_pay_g_d",
        text: "Suggest keeping the new site on Paychex for now — a 90-day migration timeline is too aggressive and the risk of payroll errors during migration is too high",
        esText: "Sugerir mantener el nuevo sitio en Paychex por ahora — un cronograma de migración de 90 días es demasiado agresivo y el riesgo de errores de nómina durante la migración es demasiado alto",
        score: 1,
        behaviorTag: "resists-change",
      },
    ],
  },

  // Payroll Specialist - Mission 2
  {
    id: "rs_pay_mission_2",
    roleId: "payroll_specialist",
    domain: "mission",
    scenario:
      "Your FQHC hired 6 Community Health Workers through a CalAIM ECM workforce development grant. The grant requires these CHWs be paid $24/hour plus a $2/hour bilingual differential. However, your FQHC's existing CHWs — hired before the grant — earn $21/hour with no bilingual differential. Several existing CHWs have discovered the pay discrepancy and are upset. One told her supervisor: 'I've been here 3 years doing the same work and the new hires make $5 more an hour because they were hired under a fancy grant?' The SEIU steward is drafting a grievance.",
    esScenario:
      "Tu FQHC contrató 6 Promotores de Salud a través de una subvención de desarrollo de fuerza laboral de CalAIM ECM. La subvención requiere que estos CHWs reciban $24/hora más un diferencial bilingüe de $2/hora. Sin embargo, los CHWs existentes de tu FQHC — contratados antes de la subvención — ganan $21/hora sin diferencial bilingüe. Varios CHWs existentes han descubierto la discrepancia salarial y están molestos. Una le dijo a su supervisor: '¿Llevo 3 años aquí haciendo el mismo trabajo y las nuevas contrataciones ganan $5 más por hora porque fueron contratadas bajo una subvención elegante?' El delegado de SEIU está redactando una queja.",
    question: "How do you address this pay equity issue?",
    esQuestion: "¿Cómo abordas este problema de equidad salarial?",
    options: [
      {
        id: "rs_pay_m2_a",
        text: "Flag this as a systemic pay equity risk, not just a grievance issue. Pull a full compensation analysis: every CHW, their hire date, current rate, tenure, and certifications. Calculate the cost to bring existing CHWs to pay parity — this is likely a $60-80K annual impact. Present the analysis to the CFO and HR Manager together: the grant created an internal equity problem that will drive turnover and grievances if unaddressed. Propose a phased solution: immediately implement the bilingual differential for all qualifying CHWs (it's defensible and relatively low cost), then build a step-increase schedule for existing CHWs to reach $24/hour over 2 pay periods. Include the SB 525 wage trajectory in the analysis — the gap will close anyway by 2027, so accelerating it now prevents a year of grievances and turnover",
        esText: "Señalar esto como un riesgo sistémico de equidad salarial, no solo un problema de queja. Obtener un análisis completo de compensación: cada CHW, su fecha de contratación, tarifa actual, antigüedad, y certificaciones. Calcular el costo de llevar a los CHWs existentes a paridad salarial — esto es probablemente un impacto anual de $60-80K. Presentar el análisis al CFO y Gerente de RH juntos: la subvención creó un problema de equidad interna que impulsará rotación y quejas si no se aborda. Proponer una solución por fases: implementar inmediatamente el diferencial bilingüe para todos los CHWs que califiquen (es defendible y de costo relativamente bajo), luego construir un cronograma de aumentos escalonados para CHWs existentes para alcanzar $24/hora en 2 períodos de pago. Incluir la trayectoria salarial de SB 525 en el análisis — la brecha se cerrará de todos modos para 2027, así que acelerarla ahora previene un año de quejas y rotación",
        score: 4,
        behaviorTag: "equity-advocate",
      },
      {
        id: "rs_pay_m2_b",
        text: "Explain to the existing CHWs that the grant-funded positions have different pay rates set by the funder, not by the FQHC. Escalate the equity concern to HR and let them negotiate with the union",
        esText: "Explicar a los CHWs existentes que las posiciones financiadas por la subvención tienen tarifas de pago diferentes establecidas por el financiador, no por el FQHC. Escalar la preocupación de equidad a RH y dejar que negocien con el sindicato",
        score: 3,
        behaviorTag: "explains-and-escalates",
      },
      {
        id: "rs_pay_m2_c",
        text: "Process payroll as configured — the grant-funded rates are contractually required and the existing rates are per the CBA. Pay equity adjustments are an HR and management decision, not a payroll decision",
        esText: "Procesar la nómina como está configurada — las tarifas financiadas por la subvención son contractualmente requeridas y las tarifas existentes son según el convenio colectivo. Los ajustes de equidad salarial son una decisión de RH y gerencia, no de nómina",
        score: 2,
        behaviorTag: "processes-as-directed",
      },
      {
        id: "rs_pay_m2_d",
        text: "Keep the pay information confidential and remind managers that discussing individual pay rates violates company policy",
        esText: "Mantener la información salarial confidencial y recordar a los gerentes que discutir tarifas salariales individuales viola la política de la empresa",
        score: 1,
        behaviorTag: "suppresses-information",
      },
    ],
  },

  // Payroll Specialist - Mission 3
  {
    id: "rs_pay_mission_3",
    roleId: "payroll_specialist",
    domain: "mission",
    scenario:
      "It's December 28th. A Medical Assistant calls you in tears — her W-2 from last year shows $8,200 more in taxable income than she actually received. She filed her taxes based on her actual paychecks and now the IRS says she owes $1,900 in back taxes plus penalties. You investigate and find that the previous payroll specialist accidentally duplicated a bonus payment in the system. The MA was never overpaid (the bank records confirm this), but the W-2 was filed incorrectly. Issuing a corrected W-2c is straightforward, but the MA is a single mother already struggling financially and says she can't afford to wait — the IRS is threatening wage garnishment.",
    esScenario:
      "Es 28 de diciembre. Una Asistente Médica te llama llorando — su W-2 del año pasado muestra $8,200 más en ingresos gravables de lo que realmente recibió. Ella presentó sus impuestos basándose en sus cheques de pago reales y ahora el IRS dice que debe $1,900 en impuestos atrasados más penalidades. Investigas y encuentras que el especialista de nómina anterior duplicó accidentalmente un pago de bonificación en el sistema. La MA nunca recibió un pago excesivo (los registros bancarios lo confirman), pero el W-2 fue presentado incorrectamente. Emitir un W-2c corregido es directo, pero la MA es madre soltera ya luchando financieramente y dice que no puede esperar — el IRS está amenazando con embargo de salario.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_pay_m3_a",
        text: "Treat this as urgent — this employee is facing real financial harm from a payroll error that wasn't her fault. Same day: prepare the W-2c with the corrected amounts and provide the MA with a signed letter from the FQHC on company letterhead explaining the error, confirming the correct income figure, and stating that a corrected W-2c has been filed. Call the IRS practitioner priority line on her behalf (or coach her on what to say) to request a hold on collection while the corrected form is processed. Alert the CFO that this error may affect the FQHC's quarterly 941 filing — you'll need to reconcile the payroll tax returns. Then audit all W-2s from that period to check for other duplications. Document the root cause and implement a pre-filing W-2 reconciliation step for future years",
        esText: "Tratar esto como urgente — esta empleada enfrenta daño financiero real por un error de nómina que no fue su culpa. El mismo día: preparar el W-2c con los montos corregidos y proporcionar a la MA una carta firmada del FQHC en papel membretado explicando el error, confirmando la cifra correcta de ingresos, y declarando que se ha presentado un W-2c corregido. Llamar a la línea prioritaria de practicantes del IRS en su nombre (o guiarla sobre qué decir) para solicitar una suspensión de cobro mientras se procesa el formulario corregido. Alertar al CFO que este error puede afectar la presentación trimestral 941 del FQHC — necesitarás conciliar las declaraciones de impuestos de nómina. Luego auditar todos los W-2s de ese período para verificar otras duplicaciones. Documentar la causa raíz e implementar un paso de conciliación de W-2 pre-presentación para años futuros",
        score: 4,
        behaviorTag: "employee-champion",
      },
      {
        id: "rs_pay_m3_b",
        text: "Prepare and file the W-2c immediately, give the MA a letter documenting the error, and advise her to file an amended tax return. Follow up to make sure the correction is reflected in IRS records",
        esText: "Preparar y presentar el W-2c inmediatamente, dar a la MA una carta documentando el error, y aconsejarle que presente una declaración de impuestos enmendada. Dar seguimiento para asegurar que la corrección se refleje en los registros del IRS",
        score: 3,
        behaviorTag: "prompt-corrector",
      },
      {
        id: "rs_pay_m3_c",
        text: "File the W-2c and tell the MA to contact a tax preparer to file an amended return — payroll can fix the form, but tax filing is the employee's responsibility",
        esText: "Presentar el W-2c y decirle a la MA que contacte a un preparador de impuestos para presentar una declaración enmendada — nómina puede corregir el formulario, pero la presentación de impuestos es responsabilidad del empleado",
        score: 2,
        behaviorTag: "minimal-responsibility",
      },
      {
        id: "rs_pay_m3_d",
        text: "Add the W-2c to your queue and process it during the regular January W-2 cycle — corrected forms are routine and don't require special urgency",
        esText: "Agregar el W-2c a tu cola y procesarlo durante el ciclo regular de W-2 de enero — los formularios corregidos son rutinarios y no requieren urgencia especial",
        score: 1,
        behaviorTag: "ignores-human-impact",
      },
    ],
  },

  // Payroll Specialist - People 2
  {
    id: "rs_pay_people_2",
    roleId: "payroll_specialist",
    domain: "people",
    scenario:
      "Your FQHC has 6 clinic sites with different timekeepers (usually the site's Office Manager). Three timekeepers submit accurate, well-organized timesheets every cycle. The other three consistently submit late, with errors — wrong overtime calculations, missing meal period waivers, unapproved PTO entered as regular hours. You've sent email reminders and even created a training guide, but nothing has changed. Each error costs you 30-60 minutes to fix, and the pattern is causing you to miss your own payroll processing deadlines.",
    esScenario:
      "Tu FQHC tiene 6 clínicas con diferentes encargados de registro de tiempo (generalmente el Gerente de Oficina del sitio). Tres encargados envían hojas de tiempo precisas y bien organizadas cada ciclo. Los otros tres consistentemente envían tarde, con errores — cálculos incorrectos de horas extras, exenciones de período de comida faltantes, PTO no aprobado ingresado como horas regulares. Has enviado correos recordatorios e incluso creaste una guía de capacitación, pero nada ha cambiado. Cada error te cuesta 30-60 minutos corregir, y el patrón está causando que no cumplas tus propias fechas límite de procesamiento de nómina.",
    question: "How do you fix the timekeeper problem?",
    esQuestion: "¿Cómo arreglas el problema de los encargados de registro de tiempo?",
    options: [
      {
        id: "rs_pay_p2_a",
        text: "Stop treating this as a training problem — it's an accountability and system design problem. Schedule a 30-minute in-person visit to each of the 3 problem sites (not an email). Sit with each timekeeper and observe how they process timesheets — you'll likely find their workflows create the errors (wrong Excel formulas, manual overtime calculation, unclear meal waiver process). Fix the root cause: create a pre-submission checklist and a standardized timesheet template with built-in overtime calculations and required fields. Then establish a clear escalation: timesheet submissions more than 4 hours late or with more than 2 errors get flagged to the site's supervisor with a copy to HR. Share the 'cost' of errors: 'Each correction delays processing by 45 minutes — across 3 sites, I'm spending 6 hours per cycle fixing preventable errors instead of processing payroll.' Publicly recognize the 3 timekeepers who do it right",
        esText: "Dejar de tratar esto como un problema de capacitación — es un problema de rendición de cuentas y diseño de sistema. Programar una visita presencial de 30 minutos a cada uno de los 3 sitios problemáticos (no un correo). Sentarte con cada encargado y observar cómo procesan las hojas de tiempo — probablemente encontrarás que sus flujos de trabajo crean los errores (fórmulas incorrectas de Excel, cálculo manual de horas extras, proceso poco claro de exención de comida). Corregir la causa raíz: crear una lista de verificación pre-envío y una plantilla estandarizada de hojas de tiempo con cálculos de horas extras incorporados y campos requeridos. Luego establecer una escalación clara: envíos de hojas de tiempo con más de 4 horas de retraso o con más de 2 errores se señalan al supervisor del sitio con copia a RH. Compartir el 'costo' de los errores: 'Cada corrección retrasa el procesamiento por 45 minutos — en 3 sitios, estoy gastando 6 horas por ciclo corrigiendo errores prevenibles en lugar de procesar la nómina.' Reconocer públicamente a los 3 encargados que lo hacen bien",
        score: 4,
        behaviorTag: "system-fixer",
      },
      {
        id: "rs_pay_p2_b",
        text: "Escalate to the HR Manager — the timekeepers need to be held accountable by their supervisors, not by the payroll department. Provide documentation of the recurring errors as evidence",
        esText: "Escalar al Gerente de RH — los encargados de registro de tiempo necesitan rendir cuentas ante sus supervisores, no ante el departamento de nómina. Proporcionar documentación de los errores recurrentes como evidencia",
        score: 3,
        behaviorTag: "escalates-with-data",
      },
      {
        id: "rs_pay_p2_c",
        text: "Reject incomplete or late timesheets and return them to the timekeepers for correction before processing — once they experience the consequences (delayed pay for their site), they'll improve",
        esText: "Rechazar hojas de tiempo incompletas o tardías y devolverlas a los encargados para corrección antes de procesar — una vez que experimenten las consecuencias (pago retrasado para su sitio), mejorarán",
        score: 2,
        behaviorTag: "punitive-approach",
      },
      {
        id: "rs_pay_p2_d",
        text: "Just fix the errors yourself each cycle — it's faster than trying to change people who clearly don't prioritize payroll accuracy",
        esText: "Solo corregir los errores tú mismo cada ciclo — es más rápido que tratar de cambiar a personas que claramente no priorizan la precisión de nómina",
        score: 1,
        behaviorTag: "absorbs-dysfunction",
      },
    ],
  },

  // Payroll Specialist - People 3
  {
    id: "rs_pay_people_3",
    roleId: "payroll_specialist",
    domain: "people",
    scenario:
      "An employee comes to you confidentially. She's a Dental Hygienist at your FQHC earning $42/hour — but she's discovered that a male Dental Hygienist hired 6 months after her, with the same license and less experience, earns $47/hour. She's visibly upset: 'Is this legal? I want to see the pay scale.' Your FQHC doesn't have a formalized pay scale for dental positions. Under California's Equal Pay Act (SB 1162), employers must provide pay scales upon request and cannot pay employees less for substantially similar work based on sex or race.",
    esScenario:
      "Una empleada viene a ti confidencialmente. Es Higienista Dental en tu FQHC ganando $42/hora — pero ha descubierto que un Higienista Dental hombre contratado 6 meses después de ella, con la misma licencia y menos experiencia, gana $47/hora. Está visiblemente molesta: '¿Es esto legal? Quiero ver la escala salarial.' Tu FQHC no tiene una escala salarial formalizada para posiciones dentales. Bajo la Ley de Pago Igualitario de California (SB 1162), los empleadores deben proporcionar escalas salariales a solicitud y no pueden pagar menos a empleados por trabajo sustancialmente similar basándose en sexo o raza.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_pay_p3_a",
        text: "Take this seriously — it's both a legal compliance issue and a trust issue. Verify the pay discrepancy in the system (confirm the $5/hour gap). Do not share the male employee's specific pay with her, but validate that you've confirmed there is a discrepancy. Immediately notify the HR Manager and CFO: under SB 1162, the FQHC must provide a pay scale upon request, and a $5/hour gap between same-role employees with no documented justification is an Equal Pay Act liability. Recommend three actions: (1) create a pay scale for dental positions immediately (legally required), (2) conduct a pay equity audit across all positions, (3) adjust the Dental Hygienist's pay to equitable levels retroactively. Document everything — the employee's request, the discrepancy, and the timeline of your response. Follow up with the employee within 48 hours with the pay scale and the FQHC's plan to address the gap",
        esText: "Tomar esto en serio — es tanto un problema de cumplimiento legal como un problema de confianza. Verificar la discrepancia salarial en el sistema (confirmar la brecha de $5/hora). No compartir el pago específico del empleado masculino con ella, pero validar que has confirmado que existe una discrepancia. Notificar inmediatamente al Gerente de RH y CFO: bajo SB 1162, el FQHC debe proporcionar una escala salarial a solicitud, y una brecha de $5/hora entre empleados del mismo rol sin justificación documentada es una responsabilidad bajo la Ley de Pago Igualitario. Recomendar tres acciones: (1) crear una escala salarial para posiciones dentales inmediatamente (legalmente requerido), (2) realizar una auditoría de equidad salarial en todas las posiciones, (3) ajustar el pago de la Higienista Dental a niveles equitativos retroactivamente. Documentar todo — la solicitud de la empleada, la discrepancia, y el cronograma de tu respuesta. Dar seguimiento con la empleada dentro de 48 horas con la escala salarial y el plan del FQHC para abordar la brecha",
        score: 4,
        behaviorTag: "compliance-and-equity-champion",
      },
      {
        id: "rs_pay_p3_b",
        text: "Confirm the discrepancy exists and refer the employee to HR — pay equity complaints need to be handled through proper HR channels, not through payroll",
        esText: "Confirmar que la discrepancia existe y referir a la empleada a RH — las quejas de equidad salarial necesitan manejarse a través de los canales apropiados de RH, no a través de nómina",
        score: 3,
        behaviorTag: "refers-appropriately",
      },
      {
        id: "rs_pay_p3_c",
        text: "Tell her you can't share other employees' compensation information and suggest she discuss the matter with her supervisor or HR",
        esText: "Decirle que no puedes compartir información de compensación de otros empleados y sugerir que discuta el asunto con su supervisor o RH",
        score: 2,
        behaviorTag: "deflects-concern",
      },
      {
        id: "rs_pay_p3_d",
        text: "Explain that pay differences can be based on negotiation at time of hire and different market conditions when each person was hired — it doesn't necessarily mean discrimination",
        esText: "Explicar que las diferencias salariales pueden basarse en negociación al momento de contratación y diferentes condiciones de mercado cuando cada persona fue contratada — no necesariamente significa discriminación",
        score: 1,
        behaviorTag: "minimizes-concern",
      },
    ],
  },

  // Payroll Specialist - Execution 2
  {
    id: "rs_pay_execution_2",
    roleId: "payroll_specialist",
    domain: "execution",
    scenario:
      "Your FQHC's SEIU contract was just ratified with a complex wage structure: Step 1-5 base rates by classification, a $1.50/hour bilingual differential, $2.00/hour evening shift differential, $3.00/hour weekend differential, and a 3% annual step increase effective on each employee's anniversary date (not a common date). You have 180 union employees across 6 sites. Your ADP system is currently configured for flat rates with manual differential overrides. The new CBA wages take effect in 3 weeks. Several employees are approaching anniversary dates and will be eligible for step increases within the first month.",
    esScenario:
      "El contrato de SEIU de tu FQHC fue recién ratificado con una estructura salarial compleja: tarifas base de Paso 1-5 por clasificación, un diferencial bilingüe de $1.50/hora, diferencial de turno nocturno de $2.00/hora, diferencial de fin de semana de $3.00/hora, y un aumento de paso anual del 3% efectivo en la fecha de aniversario de cada empleado (no una fecha común). Tienes 180 empleados sindicalizados en 6 sitios. Tu sistema ADP está actualmente configurado para tarifas fijas con sobrecargas manuales de diferenciales. Los salarios del nuevo convenio colectivo entran en vigencia en 3 semanas. Varios empleados se acercan a fechas de aniversario y serán elegibles para aumentos de paso dentro del primer mes.",
    question: "How do you implement this?",
    esQuestion: "¿Cómo implementas esto?",
    options: [
      {
        id: "rs_pay_e2_a",
        text: "Build a comprehensive implementation plan. Week 1: Create a master spreadsheet mapping every union employee to their classification, current step, anniversary date, applicable differentials, and new CBA rate. Identify the 15-20 employees with anniversary dates in the first 60 days. Reconfigure ADP: set up earning codes for each differential type (bilingual, evening, weekend) so they calculate automatically instead of manual overrides — this prevents errors going forward. Week 2: Enter all new base rates and differential codes in ADP. Run a parallel test payroll for one site to verify calculations. Cross-reference the test output against your master spreadsheet. Have HR validate the classification assignments. Week 3: Go live across all 6 sites. Send each employee a personalized letter showing their old rate, new rate, applicable differentials, and next step increase date. Set up ADP alerts for upcoming anniversary dates so step increases process automatically",
        esText: "Construir un plan de implementación comprehensivo. Semana 1: Crear una hoja de cálculo maestra mapeando cada empleado sindicalizado a su clasificación, paso actual, fecha de aniversario, diferenciales aplicables, y nueva tarifa del convenio colectivo. Identificar los 15-20 empleados con fechas de aniversario en los primeros 60 días. Reconfigurar ADP: establecer códigos de ganancia para cada tipo de diferencial (bilingüe, nocturno, fin de semana) para que se calculen automáticamente en lugar de sobrecargas manuales — esto previene errores a futuro. Semana 2: Ingresar todas las nuevas tarifas base y códigos de diferencial en ADP. Ejecutar una nómina de prueba paralela para un sitio para verificar cálculos. Cruzar referencias de la salida de prueba contra tu hoja de cálculo maestra. Hacer que RH valide las asignaciones de clasificación. Semana 3: Ir en vivo en los 6 sitios. Enviar a cada empleado una carta personalizada mostrando su tarifa anterior, nueva tarifa, diferenciales aplicables, y fecha del próximo aumento de paso. Configurar alertas de ADP para fechas de aniversario próximas para que los aumentos de paso se procesen automáticamente",
        score: 4,
        behaviorTag: "systematic-implementer",
      },
      {
        id: "rs_pay_e2_b",
        text: "Update all base rates in ADP by the effective date, process the differentials manually for the first cycle, and then work on automating the differential codes over the following month",
        esText: "Actualizar todas las tarifas base en ADP para la fecha efectiva, procesar los diferenciales manualmente para el primer ciclo, y luego trabajar en automatizar los códigos de diferencial durante el mes siguiente",
        score: 3,
        behaviorTag: "phased-implementer",
      },
      {
        id: "rs_pay_e2_c",
        text: "Contact ADP professional services to configure the new wage structure — the complexity of step increases plus multiple differentials plus anniversary-based increases requires vendor expertise",
        esText: "Contactar los servicios profesionales de ADP para configurar la nueva estructura salarial — la complejidad de aumentos de paso más múltiples diferenciales más aumentos basados en aniversario requiere experiencia del proveedor",
        score: 2,
        behaviorTag: "vendor-dependent",
      },
      {
        id: "rs_pay_e2_d",
        text: "Implement the base rate changes now and handle differentials and step increases as they come up — trying to automate everything at once is overengineering a 3-week deadline",
        esText: "Implementar los cambios de tarifa base ahora y manejar diferenciales y aumentos de paso a medida que surjan — tratar de automatizar todo a la vez es sobre-ingeniar una fecha límite de 3 semanas",
        score: 1,
        behaviorTag: "reactive-piecemeal",
      },
    ],
  },

  // Payroll Specialist - Execution 3
  {
    id: "rs_pay_execution_3",
    roleId: "payroll_specialist",
    domain: "execution",
    scenario:
      "The California Employment Development Department (EDD) sends your FQHC a notice: you're being audited for the last 3 fiscal years. The audit will examine payroll tax filings (DE 9/DE 9C), worker classification (employee vs. contractor), unemployment insurance contributions, and State Disability Insurance (SDI) withholdings. You have 30 days to prepare. Your FQHC has 240 employees, uses 12 independent contractors (some of whom work regular schedules at clinic sites), and went through a payroll system migration from Paychex to ADP 18 months ago — meaning data spans two systems.",
    esScenario:
      "El Departamento de Desarrollo del Empleo de California (EDD) envía a tu FQHC un aviso: están siendo auditados por los últimos 3 años fiscales. La auditoría examinará declaraciones de impuestos de nómina (DE 9/DE 9C), clasificación de trabajadores (empleado vs. contratista), contribuciones de seguro de desempleo, y retenciones de Seguro de Incapacidad Estatal (SDI). Tienes 30 días para prepararte. Tu FQHC tiene 240 empleados, usa 12 contratistas independientes (algunos de los cuales trabajan horarios regulares en sitios de clínica), y pasó por una migración de sistema de nómina de Paychex a ADP hace 18 meses — lo que significa que los datos abarcan dos sistemas.",
    question: "How do you prepare for this audit?",
    esQuestion: "¿Cómo te preparas para esta auditoría?",
    options: [
      {
        id: "rs_pay_e3_a",
        text: "Build a 30-day audit preparation war plan. Week 1: Pull all quarterly DE 9/DE 9C filings for the 3-year period from both Paychex (years 1-1.5) and ADP (years 1.5-3). Reconcile the payroll tax totals across the system migration — this is where discrepancies are most likely. Export the 1099 contractor list and flag the ones working regular schedules at clinic sites — these are the highest reclassification risk under California's ABC test. Week 2: Prepare a worker classification analysis for each of the 12 contractors using the ABC test criteria. For the ones that fail (regular schedule, FQHC equipment, supervised by FQHC managers), alert the CFO and HR immediately — you may want to proactively reclassify before the audit. Week 3: Organize all supporting documents by year and quarter. Verify SDI withholding rates match the annual maximum for each year. Week 4: Prepare a summary binder with an index and tabs for each audit category. Brief the CFO on potential findings and recommended responses",
        esText: "Construir un plan de guerra de preparación de auditoría de 30 días. Semana 1: Obtener todas las declaraciones trimestrales DE 9/DE 9C del período de 3 años de Paychex (años 1-1.5) y ADP (años 1.5-3). Conciliar los totales de impuestos de nómina a través de la migración de sistema — aquí es donde las discrepancias son más probables. Exportar la lista de contratistas 1099 y señalar los que trabajan horarios regulares en sitios de clínica — estos son el riesgo de reclasificación más alto bajo la prueba ABC de California. Semana 2: Preparar un análisis de clasificación de trabajadores para cada uno de los 12 contratistas usando los criterios de la prueba ABC. Para los que no pasen (horario regular, equipo del FQHC, supervisados por gerentes del FQHC), alertar al CFO y RH inmediatamente — puede que quieran reclasificar proactivamente antes de la auditoría. Semana 3: Organizar todos los documentos de soporte por año y trimestre. Verificar que las tasas de retención de SDI coincidan con el máximo anual para cada año. Semana 4: Preparar un carpeta resumen con índice y pestañas para cada categoría de auditoría. Informar al CFO sobre hallazgos potenciales y respuestas recomendadas",
        score: 4,
        behaviorTag: "audit-commander",
      },
      {
        id: "rs_pay_e3_b",
        text: "Gather all payroll tax filings and employee records from both systems. Organize them chronologically and flag any discrepancies from the Paychex-to-ADP migration for the auditor's review",
        esText: "Reunir todas las declaraciones de impuestos de nómina y registros de empleados de ambos sistemas. Organizarlos cronológicamente y señalar cualquier discrepancia de la migración Paychex-a-ADP para revisión del auditor",
        score: 3,
        behaviorTag: "organized-preparer",
      },
      {
        id: "rs_pay_e3_c",
        text: "Engage the FQHC's external accounting firm to handle the EDD audit preparation and response — payroll audits can result in significant penalties and require professional representation",
        esText: "Contratar a la firma contable externa del FQHC para manejar la preparación y respuesta de la auditoría de EDD — las auditorías de nómina pueden resultar en penalidades significativas y requieren representación profesional",
        score: 2,
        behaviorTag: "outsources-to-experts",
      },
      {
        id: "rs_pay_e3_d",
        text: "Pull the records the EDD requests and let the auditor review them — over-preparing can look like you're trying to hide something. Just provide what's asked for",
        esText: "Obtener los registros que el EDD solicita y dejar que el auditor los revise — prepararse en exceso puede parecer que estás tratando de ocultar algo. Solo proporcionar lo que se pide",
        score: 1,
        behaviorTag: "passive-responder",
      },
    ],
  },

  // Payroll Specialist - Growth 2
  {
    id: "rs_pay_growth_2",
    roleId: "payroll_specialist",
    domain: "growth",
    scenario:
      "Your CFO wants to implement an employee self-service payroll portal where employees can view pay stubs, update direct deposit information, download W-2s, and submit PTO requests — all through ADP's Workforce Now self-service module. Currently, employees call or visit you in person for all of these requests, which consumes about 15 hours per week of your time. You've never configured or administered an employee self-service portal. Your workforce includes many Medical Assistants and custodial staff who are not comfortable with technology, and about 40% primarily speak Spanish.",
    esScenario:
      "Tu CFO quiere implementar un portal de autoservicio de nómina para empleados donde puedan ver recibos de pago, actualizar información de depósito directo, descargar W-2s, y enviar solicitudes de PTO — todo a través del módulo de autoservicio de ADP Workforce Now. Actualmente, los empleados llaman o te visitan en persona para todas estas solicitudes, lo que consume aproximadamente 15 horas por semana de tu tiempo. Nunca has configurado o administrado un portal de autoservicio para empleados. Tu fuerza laboral incluye muchos Asistentes Médicos y personal de limpieza que no se sienten cómodos con la tecnología, y aproximadamente el 40% habla principalmente español.",
    question: "How do you approach this rollout?",
    esQuestion: "¿Cómo abordas este lanzamiento?",
    options: [
      {
        id: "rs_pay_g2_a",
        text: "Build a rollout plan that addresses both the technical setup and the human adoption challenge. Phase 1 (Weeks 1-3): Complete ADP's self-service administrator training, configure the portal with Spanish language settings enabled, and create bilingual quick-start guides with screenshots (not text-heavy manuals). Phase 2 (Weeks 4-6): Pilot with one site — choose the site with the most tech-savvy staff to work out issues. Hold hands-on enrollment sessions (not webinars) during lunch breaks where you walk employees through setup on their phones. Recruit 2-3 'portal champions' from the MA staff who can help coworkers in Spanish. Phase 3 (Weeks 7-10): Roll out to remaining sites with the portal champions leading peer training. Track adoption metrics: what percentage of employees are accessing their own pay stubs within 60 days? Keep the in-person option available for a transition period but redirect requests to the portal: 'Let me show you how to pull that up yourself — it takes 30 seconds'",
        esText: "Construir un plan de lanzamiento que aborde tanto la configuración técnica como el desafío de adopción humana. Fase 1 (Semanas 1-3): Completar la capacitación de administrador de autoservicio de ADP, configurar el portal con ajustes de idioma español habilitados, y crear guías de inicio rápido bilingües con capturas de pantalla (no manuales con mucho texto). Fase 2 (Semanas 4-6): Piloto con un sitio — elegir el sitio con el personal más hábil en tecnología para resolver problemas. Realizar sesiones de inscripción presenciales (no webinarios) durante la hora del almuerzo donde guíes a los empleados en la configuración en sus teléfonos. Reclutar 2-3 'campeones del portal' del personal de MA que puedan ayudar a compañeros en español. Fase 3 (Semanas 7-10): Desplegar a los sitios restantes con los campeones del portal liderando la capacitación entre pares. Rastrear métricas de adopción: ¿qué porcentaje de empleados acceden a sus propios recibos de pago dentro de 60 días? Mantener la opción presencial disponible durante un período de transición pero redirigir solicitudes al portal: 'Déjame mostrarte cómo obtener eso tú mismo — toma 30 segundos'",
        score: 4,
        behaviorTag: "inclusive-innovator",
      },
      {
        id: "rs_pay_g2_b",
        text: "Complete the ADP self-service training, configure the portal, send an email announcement with login instructions in English and Spanish, and make yourself available for questions during the first month",
        esText: "Completar la capacitación de autoservicio de ADP, configurar el portal, enviar un anuncio por correo con instrucciones de inicio de sesión en inglés y español, y estar disponible para preguntas durante el primer mes",
        score: 3,
        behaviorTag: "standard-rollout",
      },
      {
        id: "rs_pay_g2_c",
        text: "Ask ADP to send a trainer to conduct the employee onboarding sessions — they know the system better than you do and can handle the multilingual setup",
        esText: "Pedir a ADP que envíe un capacitador para conducir las sesiones de incorporación de empleados — ellos conocen el sistema mejor que tú y pueden manejar la configuración multilingüe",
        score: 2,
        behaviorTag: "vendor-reliant",
      },
      {
        id: "rs_pay_g2_d",
        text: "Push back on the timeline — many of your employees aren't comfortable with technology, and forcing a self-service portal will create more problems than it solves. Suggest a slower, voluntary adoption approach",
        esText: "Objetar el cronograma — muchos de tus empleados no se sienten cómodos con la tecnología, y forzar un portal de autoservicio creará más problemas de los que resuelve. Sugerir un enfoque de adopción voluntaria más lento",
        score: 1,
        behaviorTag: "resists-efficiency",
      },
    ],
  },

  // Payroll Specialist - Growth 3
  {
    id: "rs_pay_growth_3",
    roleId: "payroll_specialist",
    domain: "growth",
    scenario:
      "Your FQHC is expanding to process payroll for a new subsidiary — a nonprofit pharmacy benefit entity created to manage the organization's 340B contract pharmacy network. The subsidiary has 12 employees, a different EIN, a separate bank account, and different benefit plans. Your CFO wants you to manage payroll for both entities. You've only ever processed single-entity payroll and have no experience with multi-entity payroll processing, consolidated reporting, or inter-company transactions.",
    esScenario:
      "Tu FQHC se está expandiendo para procesar nómina para una nueva subsidiaria — una entidad sin fines de lucro de beneficio farmacéutico creada para gestionar la red de farmacias contratadas 340B de la organización. La subsidiaria tiene 12 empleados, un EIN diferente, una cuenta bancaria separada, y planes de beneficios diferentes. Tu CFO quiere que manejes la nómina para ambas entidades. Solo has procesado nómina de una sola entidad y no tienes experiencia con procesamiento de nómina multi-entidad, reportes consolidados, o transacciones inter-compañía.",
    question: "How do you prepare for this expansion?",
    esQuestion: "¿Cómo te preparas para esta expansión?",
    options: [
      {
        id: "rs_pay_g3_a",
        text: "Map the full scope before building. First: understand the legal separation — different EIN means separate tax filings (DE 9, 940/941, W-2s under each EIN), separate workers' comp policy, and potentially different labor law obligations. Contact ADP to set up the subsidiary as a separate company within your ADP environment, with its own tax IDs, bank account, and benefit deductions. Then learn multi-entity best practices: attend an ADP multi-company processing webinar, connect with payroll managers at other FQHCs that operate subsidiaries (CPCA network). Build a dual-entity processing calendar — the subsidiary may have different pay periods initially. Create a checklist of every quarterly and annual filing required per entity. Present the CFO with a realistic timeline: 4-6 weeks to configure, test, and go live, with a parallel processing period for the first 2 cycles",
        esText: "Mapear el alcance completo antes de construir. Primero: entender la separación legal — diferente EIN significa declaraciones fiscales separadas (DE 9, 940/941, W-2s bajo cada EIN), póliza de compensación laboral separada, y potencialmente diferentes obligaciones de ley laboral. Contactar a ADP para configurar la subsidiaria como una compañía separada dentro de tu entorno ADP, con sus propios IDs fiscales, cuenta bancaria, y deducciones de beneficios. Luego aprender mejores prácticas multi-entidad: asistir a un webinario de procesamiento multi-compañía de ADP, conectarse con gerentes de nómina de otros FQHCs que operan subsidiarias (red CPCA). Construir un calendario de procesamiento dual-entidad — la subsidiaria puede tener períodos de pago diferentes inicialmente. Crear una lista de verificación de cada declaración trimestral y anual requerida por entidad. Presentar al CFO un cronograma realista: 4-6 semanas para configurar, probar, y salir en vivo, con un período de procesamiento paralelo para los primeros 2 ciclos",
        score: 4,
        behaviorTag: "methodical-expander",
      },
      {
        id: "rs_pay_g3_b",
        text: "Set up the subsidiary in ADP as a new company, enter the 12 employees, and process the first payroll with extra verification steps. Learn multi-entity reporting as you go",
        esText: "Configurar la subsidiaria en ADP como una nueva compañía, ingresar a los 12 empleados, y procesar la primera nómina con pasos de verificación adicionales. Aprender reportes multi-entidad sobre la marcha",
        score: 3,
        behaviorTag: "learn-by-doing",
      },
      {
        id: "rs_pay_g3_c",
        text: "Recommend that the subsidiary use a separate payroll service provider — managing two entities on one system adds complexity and risk that one payroll specialist shouldn't handle alone",
        esText: "Recomendar que la subsidiaria use un proveedor de servicios de nómina separado — gestionar dos entidades en un sistema agrega complejidad y riesgo que un especialista de nómina no debería manejar solo",
        score: 2,
        behaviorTag: "avoids-complexity",
      },
      {
        id: "rs_pay_g3_d",
        text: "Tell the CFO you need additional payroll staff before taking on a second entity — 12 more employees may seem small but the compliance burden of a separate EIN is significant",
        esText: "Decirle al CFO que necesitas personal de nómina adicional antes de asumir una segunda entidad — 12 empleados más puede parecer poco pero la carga de cumplimiento de un EIN separado es significativa",
        score: 1,
        behaviorTag: "requests-before-trying",
      },
    ],
  },

  // Payroll Specialist - Transition 1
  {
    id: "rs_pay_transition",
    roleId: "payroll_specialist",
    domain: "transition",
    scenario:
      "You've just started as the Payroll Specialist at a 4-site FQHC with 195 employees. On day one, you learn that payroll runs tomorrow — a bi-weekly cycle. The outgoing payroll specialist left 2 weeks ago, and the Office Manager has been entering timesheets into ADP but hasn't processed an actual payroll run. She hands you a sticky note with the ADP login and says 'I think it's mostly ready, but I'm not sure about the garnishments.' You discover there are 8 active wage garnishments (child support, tax levies, student loans) that need to be calculated and deducted correctly.",
    esScenario:
      "Acabas de empezar como Especialista de Nómina en un FQHC de 4 sitios con 195 empleados. En tu primer día, te enteras de que la nómina se ejecuta mañana — un ciclo bisemanal. La especialista de nómina saliente se fue hace 2 semanas, y la Gerente de Oficina ha estado ingresando hojas de tiempo en ADP pero no ha procesado una ejecución de nómina real. Te entrega una nota adhesiva con el login de ADP y dice 'Creo que está mayormente listo, pero no estoy segura sobre los embargos.' Descubres que hay 8 embargos de salario activos (manutención infantil, gravámenes fiscales, préstamos estudiantiles) que necesitan calcularse y deducirse correctamente.",
    question: "How do you handle payroll on your first day?",
    esQuestion: "¿Cómo manejas la nómina en tu primer día?",
    options: [
      {
        id: "rs_pay_t1_a",
        text: "Stay focused — you have one job tonight: get payroll right tomorrow. Step 1: Pull the last successful payroll register (the one the previous specialist ran 4 weeks ago) as your baseline. Step 2: Review every garnishment order document in the employee files — verify the calculation method, maximum withholding, and remittance address for each of the 8 garnishments. California has specific priority rules for multiple garnishments (child support takes priority over tax levies, which take priority over creditor garnishments). Step 3: Verify the timesheet entries the Office Manager loaded — spot-check 20% of employees against the source timesheets. Step 4: Run a pre-process payroll report in ADP and compare gross wages, deductions, and net pay against the prior period — flag any large variances. Step 5: If the numbers check out, process the payroll. If you find significant discrepancies, call the CFO immediately — better to delay payroll by 4 hours than to issue incorrect checks. After payroll, document every garnishment setup and create a payroll processing checklist for yourself",
        esText: "Mantener el enfoque — tienes un trabajo esta noche: que la nómina salga bien mañana. Paso 1: Obtener el último registro de nómina exitoso (el que la especialista anterior ejecutó hace 4 semanas) como tu línea base. Paso 2: Revisar cada documento de orden de embargo en los archivos de empleados — verificar el método de cálculo, retención máxima, y dirección de remisión para cada uno de los 8 embargos. California tiene reglas de prioridad específicas para múltiples embargos (manutención infantil tiene prioridad sobre gravámenes fiscales, que tienen prioridad sobre embargos de acreedores). Paso 3: Verificar las entradas de hojas de tiempo que cargó la Gerente de Oficina — verificar al azar el 20% de empleados contra las hojas de tiempo fuente. Paso 4: Ejecutar un reporte de nómina pre-proceso en ADP y comparar salarios brutos, deducciones, y pago neto contra el período anterior — señalar cualquier varianza grande. Paso 5: Si los números cuadran, procesar la nómina. Si encuentras discrepancias significativas, llamar al CFO inmediatamente — mejor retrasar la nómina 4 horas que emitir cheques incorrectos. Después de la nómina, documentar la configuración de cada embargo y crear una lista de verificación de procesamiento de nómina para ti mismo",
        score: 4,
        behaviorTag: "calm-under-pressure",
      },
      {
        id: "rs_pay_t1_b",
        text: "Review the ADP setup, verify the garnishments are configured correctly in the system, run the pre-process report, and process payroll. Follow up on any questionable entries after payday",
        esText: "Revisar la configuración de ADP, verificar que los embargos estén configurados correctamente en el sistema, ejecutar el reporte pre-proceso, y procesar la nómina. Dar seguimiento a cualquier entrada cuestionable después del día de pago",
        score: 3,
        behaviorTag: "trusts-system",
      },
      {
        id: "rs_pay_t1_c",
        text: "Call the CFO and ask to delay payroll by one cycle — you can't responsibly process payroll for 195 employees with 8 garnishments on your first day without understanding the system",
        esText: "Llamar al CFO y pedir retrasar la nómina un ciclo — no puedes responsablemente procesar nómina para 195 empleados con 8 embargos en tu primer día sin entender el sistema",
        score: 2,
        behaviorTag: "delays-for-safety",
      },
      {
        id: "rs_pay_t1_d",
        text: "Process the payroll as the Office Manager set it up and skip the garnishments for this cycle — you can add them back once you've had time to review the garnishment orders properly",
        esText: "Procesar la nómina como la configuró la Gerente de Oficina y omitir los embargos para este ciclo — puedes agregarlos de vuelta una vez que hayas tenido tiempo de revisar las órdenes de embargo apropiadamente",
        score: 1,
        behaviorTag: "skips-legal-requirements",
      },
    ],
  },

  // Payroll Specialist - Transition 2
  {
    id: "rs_pay_transition_2",
    roleId: "payroll_specialist",
    domain: "transition",
    scenario:
      "You're 3 weeks into your new payroll role. While reviewing the benefit deduction setup in ADP, you notice that 22 employees enrolled in the FQHC's Kaiser HMO plan are being deducted at the 'Employee Only' rate, but their enrollment forms show 'Employee + Spouse' or 'Employee + Family' coverage. This means the FQHC has been undercollecting employee contributions — approximately $1,800/month total — and absorbing the cost without realizing it. Over 6 months, that's roughly $10,800 the FQHC overpaid. The employees have been receiving the correct coverage (their families are covered) but paying less than they should.",
    esScenario:
      "Llevas 3 semanas en tu nuevo rol de nómina. Mientras revisas la configuración de deducciones de beneficios en ADP, notas que 22 empleados inscritos en el plan Kaiser HMO del FQHC están siendo deducidos a la tarifa de 'Solo Empleado', pero sus formularios de inscripción muestran cobertura de 'Empleado + Cónyuge' o 'Empleado + Familia'. Esto significa que el FQHC ha estado sub-cobrando contribuciones de empleados — aproximadamente $1,800/mes en total — y absorbiendo el costo sin darse cuenta. Durante 6 meses, eso es aproximadamente $10,800 que el FQHC pagó de más. Los empleados han estado recibiendo la cobertura correcta (sus familias están cubiertas) pero pagando menos de lo que deberían.",
    question: "How do you handle this as the new payroll specialist?",
    esQuestion: "¿Cómo manejas esto como nuevo especialista de nómina?",
    options: [
      {
        id: "rs_pay_t2_a",
        text: "Document the full scope: list every affected employee, the tier they should be at, the tier they're deducted at, the monthly difference, and the total under-collection. Present this to the HR Manager and CFO together — this is both a payroll error and an employee communication issue. Recommend a three-part fix: (1) Correct all deduction rates effective next pay period — this is non-negotiable. (2) For the historical under-collection, recommend the FQHC absorb the $10,800 rather than retroactively charging employees who were never told their deductions were wrong — clawing back from healthcare workers' paychecks would be devastating for trust and retention. (3) Communicate transparently: send each affected employee a letter explaining that their deductions were incorrect and will be corrected going forward, but that they will NOT owe anything for the prior period. Implement a quarterly benefit deduction audit to catch mismatches early",
        esText: "Documentar el alcance completo: listar cada empleado afectado, el nivel en que deberían estar, el nivel al que se les deduce, la diferencia mensual, y el total sub-cobrado. Presentar esto al Gerente de RH y CFO juntos — esto es tanto un error de nómina como un problema de comunicación con empleados. Recomendar una corrección de tres partes: (1) Corregir todas las tasas de deducción efectivas el próximo período de pago — esto no es negociable. (2) Para el sub-cobro histórico, recomendar que el FQHC absorba los $10,800 en lugar de cobrar retroactivamente a empleados que nunca fueron informados de que sus deducciones eran incorrectas — reclamar de los cheques de pago de trabajadores de salud sería devastador para la confianza y retención. (3) Comunicar transparentemente: enviar a cada empleado afectado una carta explicando que sus deducciones eran incorrectas y serán corregidas en adelante, pero que NO deberán nada por el período anterior. Implementar una auditoría trimestral de deducciones de beneficios para detectar discrepancias temprano",
        score: 4,
        behaviorTag: "compassionate-corrector",
      },
      {
        id: "rs_pay_t2_b",
        text: "Fix the deduction rates going forward and present the CFO with the retroactive under-collection amount. Let the CFO decide whether to recover the $10,800 from employees or absorb it",
        esText: "Corregir las tasas de deducción en adelante y presentar al CFO el monto de sub-cobro retroactivo. Dejar que el CFO decida si recuperar los $10,800 de los empleados o absorberlo",
        score: 3,
        behaviorTag: "corrects-and-defers",
      },
      {
        id: "rs_pay_t2_c",
        text: "Fix the rates going forward but don't raise the historical issue — $10,800 over 6 months is a rounding error for an $18M organization, and bringing it up in your first month will make it look like you're criticizing the previous payroll specialist",
        esText: "Corregir las tasas en adelante pero no plantear el problema histórico — $10,800 en 6 meses es un error de redondeo para una organización de $18M, y plantearlo en tu primer mes hará parecer que estás criticando al especialista de nómina anterior",
        score: 2,
        behaviorTag: "partial-fix",
      },
      {
        id: "rs_pay_t2_d",
        text: "Correct the rates and set up retroactive deductions to recover the $10,800 from affected employees over the next 4 pay periods — they received the coverage, so they owe the premiums",
        esText: "Corregir las tasas y configurar deducciones retroactivas para recuperar los $10,800 de empleados afectados durante los próximos 4 períodos de pago — recibieron la cobertura, así que deben las primas",
        score: 1,
        behaviorTag: "mechanically-correct-but-harmful",
      },
    ],
  },

  // Payroll Specialist - Transition 3
  {
    id: "rs_pay_transition_3",
    roleId: "payroll_specialist",
    domain: "transition",
    scenario:
      "You've been at your new FQHC for 6 weeks. You've stabilized the payroll processing, but you're noticing a pattern that concerns you: the Office Manager at Site 3 consistently submits timesheets showing 8 employees working exactly 7.5 hours per day, 5 days per week — never any overtime, never any variation. Every other site shows normal fluctuations (some employees over 8 hours, some under, occasional overtime weeks). You pull the badge-in/badge-out records from the time clock system at Site 3 and find that several employees are regularly working 9-10 hour days but their timesheets are being edited down to 7.5 hours. This is wage theft under California law.",
    esScenario:
      "Llevas 6 semanas en tu nuevo FQHC. Has estabilizado el procesamiento de nómina, pero estás notando un patrón que te preocupa: la Gerente de Oficina del Sitio 3 consistentemente envía hojas de tiempo mostrando 8 empleados trabajando exactamente 7.5 horas por día, 5 días por semana — nunca horas extras, nunca ninguna variación. Cada otro sitio muestra fluctuaciones normales (algunos empleados sobre 8 horas, algunos bajo, semanas ocasionales de horas extras). Obtienes los registros de entrada/salida del sistema de reloj de tiempo en el Sitio 3 y encuentras que varios empleados están regularmente trabajando 9-10 horas por día pero sus hojas de tiempo están siendo editadas a 7.5 horas. Esto es robo de salario bajo la ley de California.",
    question: "What do you do with this discovery?",
    esQuestion: "¿Qué haces con este descubrimiento?",
    options: [
      {
        id: "rs_pay_t3_a",
        text: "This is a legal emergency — California wage theft carries penalties of $200/day per employee and potential criminal liability. Stop processing Site 3 timesheets from the Office Manager immediately. Document everything: print the badge records and the submitted timesheets side by side for each affected employee. Bring this directly to the HR Manager and CFO with the evidence — frame it clearly: 'I've found evidence of systematic timesheet falsification at Site 3. Employees are being denied overtime pay they've earned. Under California Labor Code Section 510, we owe them overtime for every hour over 8 per day and every hour over 40 per week. Our exposure is $X based on [calculated back pay]. This needs immediate investigation.' Do not confront the Office Manager yourself — this is an HR investigation. Calculate the estimated back pay owed to each affected employee so leadership can act quickly. Recommend the FQHC proactively pay the back wages and implement time clock-to-payroll integration to prevent manual timesheet editing",
        esText: "Esta es una emergencia legal — el robo de salario en California conlleva penalidades de $200/día por empleado y potencial responsabilidad criminal. Dejar de procesar las hojas de tiempo del Sitio 3 de la Gerente de Oficina inmediatamente. Documentar todo: imprimir los registros de entrada/salida y las hojas de tiempo enviadas lado a lado para cada empleado afectado. Llevar esto directamente al Gerente de RH y CFO con la evidencia — enmarcarlo claramente: 'He encontrado evidencia de falsificación sistemática de hojas de tiempo en el Sitio 3. A los empleados se les está negando el pago de horas extras que han ganado. Bajo el Código Laboral de California Sección 510, les debemos horas extras por cada hora sobre 8 por día y cada hora sobre 40 por semana. Nuestra exposición es $X basada en [pago retroactivo calculado].' No confrontar a la Gerente de Oficina tú mismo — esta es una investigación de RH. Calcular el pago retroactivo estimado adeudado a cada empleado afectado para que el liderazgo pueda actuar rápidamente. Recomendar que el FQHC proactivamente pague los salarios atrasados e implemente integración de reloj de tiempo a nómina para prevenir edición manual de hojas de tiempo",
        score: 4,
        behaviorTag: "whistleblower-with-evidence",
      },
      {
        id: "rs_pay_t3_b",
        text: "Report the discrepancy to the HR Manager with the badge records and timesheets as evidence. Ask HR to investigate and advise you on how to handle the current and back pay",
        esText: "Reportar la discrepancia al Gerente de RH con los registros de entrada/salida y hojas de tiempo como evidencia. Pedir a RH que investigue y te asesore sobre cómo manejar el pago actual y retroactivo",
        score: 3,
        behaviorTag: "reports-and-waits",
      },
      {
        id: "rs_pay_t3_c",
        text: "Talk to the Office Manager at Site 3 first — there might be an explanation (maybe employees badge in early but don't start working, or the time clock is miscalibrated). Give them a chance to explain before escalating",
        esText: "Hablar primero con la Gerente de Oficina del Sitio 3 — podría haber una explicación (tal vez los empleados registran entrada temprano pero no empiezan a trabajar, o el reloj de tiempo está mal calibrado). Darle oportunidad de explicar antes de escalar",
        score: 2,
        behaviorTag: "tips-off-subject",
      },
      {
        id: "rs_pay_t3_d",
        text: "Process the timesheets as submitted — the Office Manager is the authorized timekeeper, and it's not payroll's job to investigate whether the time entries are accurate",
        esText: "Procesar las hojas de tiempo como fueron enviadas — la Gerente de Oficina es la encargada autorizada del registro de tiempo, y no es trabajo de nómina investigar si las entradas de tiempo son precisas",
        score: 1,
        behaviorTag: "enables-wage-theft",
      },
    ],
  },

  /* ================================================================ */
  /*  Finance Manager                                                  */
  /* ================================================================ */

  // Finance Manager - Mission
  {
    id: "rs_fm_mission",
    roleId: "finance_manager",
    domain: "mission",
    scenario:
      "Your FQHC is facing a $2.1M budget shortfall due to a combination of Medi-Cal reimbursement delays (3 months backlogged) and a 15% drop in patient volume after a competing urgent care chain opened nearby. The CEO has asked you to present options to the board next week. The leadership team is split: the Medical Director wants to cut administrative staff first to protect clinical services, while the COO wants to close the least productive satellite clinic (which serves a rural, predominantly farmworker community 45 minutes from the main campus).",
    esScenario:
      "Tu FQHC enfrenta un déficit presupuestario de $2.1M debido a una combinación de retrasos en reembolsos de Medi-Cal (3 meses atrasados) y una caída del 15% en volumen de pacientes después de que una cadena competidora de urgencias abrió cerca. El CEO te ha pedido presentar opciones a la junta la próxima semana. El equipo de liderazgo está dividido: el Director Médico quiere recortar personal administrativo primero para proteger servicios clínicos, mientras el COO quiere cerrar la clínica satélite menos productiva (que sirve a una comunidad rural, predominantemente de trabajadores agrícolas, a 45 minutos del campus principal).",
    question: "How do you frame the financial options for the board?",
    esQuestion: "¿Cómo presentas las opciones financieras a la junta?",
    options: [
      {
        id: "rs_fm_m_a",
        text: "Present three scenarios with full financial modeling and mission impact analysis. Scenario 1: Targeted admin restructuring — quantify the savings but also the operational risk (slower billing = more revenue loss). Scenario 2: Satellite clinic closure — show the financial savings but also present the HRSA service area implications (closing a site in an underserved area could jeopardize FQHC designation scope). Scenario 3: Revenue recovery-first approach — negotiate Medi-Cal advance payments using the reimbursement backlog documentation, launch a patient re-engagement campaign to recover volume, and implement a 90-day hiring freeze on non-essential positions. Recommend Scenario 3 as the approach that addresses the root causes without sacrificing the mission",
        esText: "Presentar tres escenarios con modelado financiero completo y análisis de impacto en la misión. Escenario 1: Reestructuración administrativa dirigida — cuantificar los ahorros pero también el riesgo operativo (facturación más lenta = más pérdida de ingresos). Escenario 2: Cierre de clínica satélite — mostrar los ahorros financieros pero también presentar las implicaciones del área de servicio de HRSA (cerrar un sitio en un área desatendida podría poner en riesgo el alcance de la designación FQHC). Escenario 3: Enfoque de recuperación de ingresos primero — negociar pagos anticipados de Medi-Cal usando la documentación del atraso de reembolsos, lanzar una campaña de re-captación de pacientes para recuperar volumen, e implementar un congelamiento de contrataciones de 90 días en posiciones no esenciales. Recomendar el Escenario 3 como el enfoque que aborda las causas raíz sin sacrificar la misión",
        score: 4,
        behaviorTag: "strategic-steward",
      },
      {
        id: "rs_fm_m_b",
        text: "Present a data-driven analysis of both options with full cost projections, and let the board make the decision — it's their fiduciary responsibility",
        esText: "Presentar un análisis basado en datos de ambas opciones con proyecciones de costos completas, y dejar que la junta tome la decisión — es su responsabilidad fiduciaria",
        score: 3,
        behaviorTag: "neutral-analyst",
      },
      {
        id: "rs_fm_m_c",
        text: "Recommend closing the satellite clinic — the numbers clearly show it's the least productive site, and the $2.1M shortfall is too large for administrative cuts alone to solve",
        esText: "Recomendar cerrar la clínica satélite — los números claramente muestran que es el sitio menos productivo, y el déficit de $2.1M es demasiado grande para que los recortes administrativos solos lo resuelvan",
        score: 2,
        behaviorTag: "numbers-only",
      },
      {
        id: "rs_fm_m_d",
        text: "Focus on the Medi-Cal reimbursement delays — those are temporary and once the backlog clears, the FQHC will be fine. Recommend drawing from reserves to cover the gap",
        esText: "Enfocarse en los retrasos de reembolsos de Medi-Cal — son temporales y una vez que el atraso se resuelva, el FQHC estará bien. Recomendar usar las reservas para cubrir la brecha",
        score: 1,
        behaviorTag: "wishful-thinking",
      },
    ],
  },

  // Finance Manager - People
  {
    id: "rs_fm_people",
    roleId: "finance_manager",
    domain: "people",
    scenario:
      "You're presenting quarterly financial results to the FQHC's board of directors. The numbers are bad: revenue is down 12%, operating margin is negative for the second consecutive quarter, and the 340B program savings are declining because of new manufacturer restrictions. One board member — a community leader without financial background — interrupts your presentation: 'I don't understand any of these charts. Just tell me: are we going to have to close? Are people going to lose their jobs?' Several other board members look equally confused.",
    esScenario:
      "Estás presentando los resultados financieros trimestrales a la junta directiva del FQHC. Los números son malos: los ingresos bajaron 12%, el margen operativo es negativo por segundo trimestre consecutivo, y los ahorros del programa 340B están disminuyendo por nuevas restricciones de fabricantes. Un miembro de la junta — un líder comunitario sin experiencia financiera — interrumpe tu presentación: 'No entiendo ninguno de estos gráficos. Solo dime: ¿vamos a tener que cerrar? ¿La gente va a perder sus trabajos?' Varios otros miembros de la junta se ven igualmente confundidos.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_fm_p_a",
        text: "Stop the slide presentation. Thank the board member for asking what everyone was thinking. Reframe the entire presentation in plain language: 'We're not closing. But we are spending more than we're bringing in, and if we don't change course in the next 6 months, we'll burn through our cash reserves. Here's what that means in real terms...' Use concrete examples: 'The 12% revenue drop means we collected $X less than last year — that's equivalent to Y staff positions.' Then present the action plan in simple terms: what you're doing, what it will cost, when the board will see results. Offer to schedule a separate financial literacy session for any board members who want deeper understanding",
        esText: "Detener la presentación de diapositivas. Agradecer al miembro de la junta por preguntar lo que todos estaban pensando. Reformular toda la presentación en lenguaje simple: 'No vamos a cerrar. Pero estamos gastando más de lo que ingresamos, y si no cambiamos el rumbo en los próximos 6 meses, agotaremos nuestras reservas de efectivo. Esto es lo que significa en términos reales...' Usar ejemplos concretos: 'La caída del 12% en ingresos significa que recaudamos $X menos que el año pasado — eso equivale a Y posiciones de personal.' Luego presentar el plan de acción en términos simples: qué están haciendo, cuánto costará, cuándo la junta verá resultados. Ofrecer programar una sesión separada de educación financiera para cualquier miembro de la junta que quiera entender más profundamente",
        score: 4,
        behaviorTag: "translator-leader",
      },
      {
        id: "rs_fm_p_b",
        text: "Pause and directly answer the board member's question: 'We're not in danger of closing, but we need to make changes. Let me simplify the next few slides to focus on what matters most'",
        esText: "Pausar y responder directamente la pregunta del miembro de la junta: 'No estamos en peligro de cerrar, pero necesitamos hacer cambios. Déjenme simplificar las próximas diapositivas para enfocarnos en lo más importante'",
        score: 3,
        behaviorTag: "responsive-simplifier",
      },
      {
        id: "rs_fm_p_c",
        text: "Continue with the presentation as prepared — the board needs to understand the financial details to make informed decisions, and simplifying too much could lead to bad governance",
        esText: "Continuar con la presentación tal como fue preparada — la junta necesita entender los detalles financieros para tomar decisiones informadas, y simplificar demasiado podría llevar a mala gobernanza",
        score: 2,
        behaviorTag: "technical-communicator",
      },
      {
        id: "rs_fm_p_d",
        text: "Suggest that the board chair schedule a separate executive session where you can walk through the financials in detail with smaller groups",
        esText: "Sugerir que el presidente de la junta programe una sesión ejecutiva separada donde puedas revisar los financieros en detalle con grupos más pequeños",
        score: 1,
        behaviorTag: "deflects",
      },
    ],
  },

  // Finance Manager - Execution
  {
    id: "rs_fm_execution",
    roleId: "finance_manager",
    domain: "execution",
    scenario:
      "Medi-Cal reimbursements — which represent 65% of your FQHC's revenue — are 90 days behind. Your cash reserve has dropped from $1.8M to $600K, and you have $520K in payroll due in 10 days. Vendors are calling about overdue invoices. The Medi-Cal fiscal intermediary says they're 'processing a backlog' but can't give a specific payment date. Your CEO asks: 'What do we do? Can we make payroll?'",
    esScenario:
      "Los reembolsos de Medi-Cal — que representan el 65% de los ingresos de tu FQHC — están 90 días atrasados. Tu reserva de efectivo ha caído de $1.8M a $600K, y tienes $520K en nómina que vence en 10 días. Los proveedores están llamando sobre facturas vencidas. El intermediario fiscal de Medi-Cal dice que están 'procesando un atraso' pero no pueden dar una fecha de pago específica. Tu CEO pregunta: '¿Qué hacemos? ¿Podemos pagar la nómina?'",
    question: "How do you manage this cash crisis?",
    esQuestion: "¿Cómo manejas esta crisis de efectivo?",
    options: [
      {
        id: "rs_fm_e_a",
        text: "Build a 90-day cash flow forecast by week, starting with the $600K and mapping every obligation: payroll, rent, vendor commitments, loan payments. Prioritize ruthlessly: payroll is #1 (legal requirement), core medical supplies #2, everything else gets negotiated. Contact your FQHC's bank about a short-term line of credit secured by the Medi-Cal receivables. Simultaneously, escalate the Medi-Cal delay through CPCA (they have direct channels to DHCS) and document everything for a potential interest claim. Negotiate extended payment terms with top 5 vendors — most will work with an FQHC facing payer delays. Present the CEO with a weekly cash dashboard showing runway, expected inflows, and decision points",
        esText: "Construir un pronóstico de flujo de efectivo de 90 días por semana, empezando con los $600K y mapeando cada obligación: nómina, renta, compromisos con proveedores, pagos de préstamos. Priorizar sin piedad: nómina es #1 (requisito legal), suministros médicos esenciales #2, todo lo demás se negocia. Contactar al banco del FQHC sobre una línea de crédito a corto plazo garantizada por las cuentas por cobrar de Medi-Cal. Simultáneamente, escalar el retraso de Medi-Cal a través de CPCA (tienen canales directos con DHCS) y documentar todo para un posible reclamo de intereses. Negociar términos de pago extendidos con los 5 principales proveedores — la mayoría trabajará con un FQHC enfrentando retrasos de pagador. Presentar al CEO un tablero semanal de efectivo mostrando margen de maniobra, ingresos esperados, y puntos de decisión",
        score: 4,
        behaviorTag: "crisis-manager",
      },
      {
        id: "rs_fm_e_b",
        text: "Confirm you can make the next payroll from the $600K reserve. Immediately pause all non-essential vendor payments and start daily follow-up with the Medi-Cal intermediary for payment timeline",
        esText: "Confirmar que puedes cubrir la próxima nómina con la reserva de $600K. Inmediatamente pausar todos los pagos no esenciales a proveedores y comenzar seguimiento diario con el intermediario de Medi-Cal para el cronograma de pago",
        score: 3,
        behaviorTag: "triage-focused",
      },
      {
        id: "rs_fm_e_c",
        text: "Apply for an emergency HRSA grant or supplemental funding — the federal government should cover shortfalls caused by Medi-Cal processing delays",
        esText: "Solicitar una subvención de emergencia de HRSA o financiamiento suplementario — el gobierno federal debería cubrir los faltantes causados por retrasos en el procesamiento de Medi-Cal",
        score: 2,
        behaviorTag: "looks-external",
      },
      {
        id: "rs_fm_e_d",
        text: "Tell the CEO you can make one more payroll but after that the FQHC needs to start planning for potential layoffs if Medi-Cal doesn't pay",
        esText: "Decirle al CEO que puedes cubrir una nómina más pero después de eso el FQHC necesita empezar a planificar posibles despidos si Medi-Cal no paga",
        score: 1,
        behaviorTag: "alarmist",
      },
    ],
  },

  // Finance Manager - Growth
  {
    id: "rs_fm_growth",
    roleId: "finance_manager",
    domain: "growth",
    scenario:
      "Your CEO is excited about CalAIM's new Community Supports benefit and wants to launch three new revenue-generating programs: housing navigation, medically tailored meals, and community transition services. They've asked you to build the financial models to present to the board. You've managed FQHC budgets for years, but CalAIM Community Supports is a completely new reimbursement structure — you've never modeled revenue for programs that bill through managed care plans rather than traditional PPS.",
    esScenario:
      "Tu CEO está entusiasmado con el nuevo beneficio de Apoyos Comunitarios de CalAIM y quiere lanzar tres nuevos programas generadores de ingresos: navegación de vivienda, comidas médicamente adaptadas, y servicios de transición comunitaria. Te ha pedido construir los modelos financieros para presentar a la junta. Has manejado presupuestos de FQHC por años, pero los Apoyos Comunitarios de CalAIM son una estructura de reembolso completamente nueva — nunca has modelado ingresos para programas que facturan a través de planes de atención administrada en lugar del PPS tradicional.",
    question: "How do you build these financial models?",
    esQuestion: "¿Cómo construyes estos modelos financieros?",
    options: [
      {
        id: "rs_fm_g_a",
        text: "Start by deeply understanding the CalAIM reimbursement mechanics: attend DHCS webinars, review the Community Supports rate methodology, and study the managed care plan contracts your FQHC holds. Connect with CFOs at FQHCs that launched Community Supports early (several Bay Area and LA FQHCs piloted in 2024) to learn real-world revenue and cost data. Build conservative financial models for each program: project enrollment ramp-up (usually 3-6 months to scale), per-member-per-month reimbursement rates, staff and infrastructure costs, and break-even timelines. Present the board with a phased approach: launch one program first, prove the model, then scale the other two",
        esText: "Empezar entendiendo profundamente la mecánica de reembolso de CalAIM: asistir a webinarios de DHCS, revisar la metodología de tarifas de Apoyos Comunitarios, y estudiar los contratos de planes de atención administrada que tiene tu FQHC. Conectarse con CFOs de FQHCs que lanzaron Apoyos Comunitarios temprano (varios FQHCs del Área de la Bahía y LA pilotaron en 2024) para aprender datos reales de ingresos y costos. Construir modelos financieros conservadores para cada programa: proyectar la rampa de inscripción (usualmente 3-6 meses para escalar), tarifas de reembolso por miembro por mes, costos de personal e infraestructura, y cronogramas de punto de equilibrio. Presentar a la junta un enfoque por fases: lanzar un programa primero, probar el modelo, luego escalar los otros dos",
        score: 4,
        behaviorTag: "strategic-modeler",
      },
      {
        id: "rs_fm_g_b",
        text: "Research the CalAIM reimbursement rates published by DHCS and build projections using those rates with conservative volume assumptions. Present to the board with clear caveats about the uncertainty",
        esText: "Investigar las tarifas de reembolso de CalAIM publicadas por DHCS y construir proyecciones usando esas tarifas con supuestos conservadores de volumen. Presentar a la junta con advertencias claras sobre la incertidumbre",
        score: 3,
        behaviorTag: "research-based",
      },
      {
        id: "rs_fm_g_c",
        text: "Hire a CalAIM financial consultant to build the models — this is too specialized for someone without CalAIM experience to model accurately",
        esText: "Contratar un consultor financiero de CalAIM para construir los modelos — esto es demasiado especializado para que alguien sin experiencia en CalAIM lo modele con precisión",
        score: 2,
        behaviorTag: "outsources-growth",
      },
      {
        id: "rs_fm_g_d",
        text: "Tell the CEO that you need to wait until other FQHCs publish their Community Supports financial results before you can build reliable models — launching without proven data is too risky",
        esText: "Decirle al CEO que necesitas esperar hasta que otros FQHCs publiquen sus resultados financieros de Apoyos Comunitarios antes de poder construir modelos confiables — lanzar sin datos comprobados es demasiado arriesgado",
        score: 1,
        behaviorTag: "waits-for-proof",
      },
    ],
  },

  // Finance Manager - Mission 2
  {
    id: "rs_fm_mission_2",
    roleId: "finance_manager",
    domain: "mission",
    scenario:
      "Your FQHC is one of 3 finalists for a $2M HRSA Service Area Competition (SAC) grant that would fund a new clinic site in a severely underserved agricultural community. However, your financial modeling shows the new site won't break even for 3 years and will require $600K in bridge funding from the FQHC's reserves. Your board treasurer — a retired bank executive — is strongly opposed: 'We can't risk the financial health of the entire organization for one site that won't be profitable for 3 years.' The CEO is passionate about serving this community and is pressuring you to present the numbers in the most favorable light possible.",
    esScenario:
      "Tu FQHC es uno de 3 finalistas para una subvención de $2M de Competencia de Área de Servicio (SAC) de HRSA que financiaría un nuevo sitio de clínica en una comunidad agrícola severamente desatendida. Sin embargo, tu modelo financiero muestra que el nuevo sitio no alcanzará el punto de equilibrio por 3 años y requerirá $600K en financiamiento puente de las reservas del FQHC. El tesorero de la junta — un ejecutivo bancario retirado — está fuertemente en contra: 'No podemos arriesgar la salud financiera de toda la organización por un sitio que no será rentable por 3 años.' El CEO es apasionado sobre servir a esta comunidad y te presiona para presentar los números de la forma más favorable posible.",
    question: "How do you navigate between the CEO's vision and financial prudence?",
    esQuestion: "¿Cómo navegas entre la visión del CEO y la prudencia financiera?",
    options: [
      {
        id: "rs_fm_m2_a",
        text: "Present honest numbers with a mission-aligned financial strategy. Build a comprehensive model that shows: the $2M grant covers startup costs, the 3-year break-even trajectory is realistic for a new FQHC site (industry average is 2-4 years), and the $600K bridge can be structured as a phased draw-down rather than an upfront commitment. Show the board treasurer that the new site will generate its own PPS rate, 340B eligibility, and additional HRSA Section 330 base funding once operational — the long-term revenue exceeds the short-term investment. But also model the downside: if patient volume ramps slower than projected, what's the maximum reserve draw? At what point would you recommend pausing? Give the board both the vision and the guardrails. Never inflate numbers to please the CEO — your credibility as Finance Manager depends on the board trusting your projections",
        esText: "Presentar números honestos con una estrategia financiera alineada con la misión. Construir un modelo comprehensivo que muestre: la subvención de $2M cubre costos de inicio, la trayectoria de punto de equilibrio de 3 años es realista para un nuevo sitio FQHC (el promedio de la industria es 2-4 años), y los $600K puente pueden estructurarse como una disposición gradual en lugar de un compromiso inicial. Mostrar al tesorero de la junta que el nuevo sitio generará su propia tasa PPS, elegibilidad 340B, y financiamiento base adicional de HRSA Sección 330 una vez operativo — los ingresos a largo plazo exceden la inversión a corto plazo. Pero también modelar el escenario negativo: si el volumen de pacientes crece más lento de lo proyectado, ¿cuál es la disposición máxima de reservas? ¿En qué punto recomendarías pausar? Dar a la junta tanto la visión como las barreras de protección. Nunca inflar números para complacer al CEO — tu credibilidad como Gerente de Finanzas depende de que la junta confíe en tus proyecciones",
        score: 4,
        behaviorTag: "honest-strategist",
      },
      {
        id: "rs_fm_m2_b",
        text: "Present the financial model as-is — 3-year break-even with $600K bridge requirement — and let the board debate the mission versus financial risk tradeoff. Your job is to present accurate numbers, not to advocate for or against the expansion",
        esText: "Presentar el modelo financiero tal como está — punto de equilibrio a 3 años con requisito de $600K puente — y dejar que la junta debata la compensación entre misión y riesgo financiero. Tu trabajo es presentar números precisos, no abogar a favor o en contra de la expansión",
        score: 3,
        behaviorTag: "neutral-presenter",
      },
      {
        id: "rs_fm_m2_c",
        text: "Side with the board treasurer — the FQHC can't afford to drain reserves during a Medicaid funding crisis. Recommend passing on the SAC grant and applying again when the financial position is stronger",
        esText: "Ponerse del lado del tesorero de la junta — el FQHC no puede darse el lujo de agotar reservas durante una crisis de financiamiento de Medicaid. Recomendar pasar la subvención SAC y aplicar de nuevo cuando la posición financiera sea más fuerte",
        score: 2,
        behaviorTag: "risk-averse",
      },
      {
        id: "rs_fm_m2_d",
        text: "Adjust the model assumptions to show a 2-year break-even — use more aggressive patient volume projections and lower startup cost estimates to make the numbers more palatable to the board",
        esText: "Ajustar los supuestos del modelo para mostrar un punto de equilibrio de 2 años — usar proyecciones más agresivas de volumen de pacientes y estimaciones más bajas de costos de inicio para hacer los números más aceptables para la junta",
        score: 1,
        behaviorTag: "manipulates-data",
      },
    ],
  },

  // Finance Manager - Mission 3
  {
    id: "rs_fm_mission_3",
    roleId: "finance_manager",
    domain: "mission",
    scenario:
      "Your FQHC's sliding fee scale hasn't been updated in 4 years. You analyze the current structure and find that the income thresholds are based on 2022 Federal Poverty Level guidelines — meaning families earning just above the outdated thresholds are being charged full price even though they'd qualify for discounts under current FPL guidelines. This particularly affects working families who earn $35-50K annually — too much for Medi-Cal but not enough to afford full-price dental and behavioral health services. Updating the sliding fee scale to current FPL guidelines would reduce revenue by approximately $120K annually, but it would also bring the FQHC into HRSA compliance (Section 330 requires using current FPL guidelines) and better serve the community.",
    esScenario:
      "La escala de tarifas deslizantes de tu FQHC no se ha actualizado en 4 años. Analizas la estructura actual y encuentras que los umbrales de ingresos están basados en las guías del Nivel Federal de Pobreza de 2022 — lo que significa que familias que ganan justo por encima de los umbrales desactualizados están siendo cobradas a precio completo aunque calificarían para descuentos bajo las guías actuales de FPL. Esto afecta particularmente a familias trabajadoras que ganan $35-50K anualmente — demasiado para Medi-Cal pero no suficiente para pagar servicios dentales y de salud conductual a precio completo. Actualizar la escala de tarifas deslizantes a las guías actuales de FPL reduciría los ingresos en aproximadamente $120K anualmente, pero también pondría al FQHC en cumplimiento con HRSA (la Sección 330 requiere usar las guías actuales de FPL) y serviría mejor a la comunidad.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_fm_m3_a",
        text: "Flag this immediately as both a compliance issue and a mission issue. Present the analysis to the CEO and board with three frames: (1) Compliance: HRSA requires current FPL guidelines — the outdated scale is a site visit finding waiting to happen. (2) Mission: working families in your service area are being overcharged — some may be avoiding care because of cost, which contradicts the FQHC's purpose. (3) Financial: the $120K revenue reduction can be partially offset by increased visit volume from patients who were previously priced out, and by improved Medi-Cal Managed Care capitation negotiations that include the broader sliding fee population. Propose updating the scale immediately and phasing in the revenue impact over 2 quarters. Include a patient communication plan — families who were overcharged deserve to know about the corrected rates",
        esText: "Señalar esto inmediatamente como un problema de cumplimiento y de misión. Presentar el análisis al CEO y la junta con tres marcos: (1) Cumplimiento: HRSA requiere guías de FPL actuales — la escala desactualizada es un hallazgo de visita esperando suceder. (2) Misión: familias trabajadoras en tu área de servicio están siendo sobrecobradas — algunas pueden estar evitando atención por el costo, lo que contradice el propósito del FQHC. (3) Financiero: la reducción de $120K en ingresos puede ser parcialmente compensada por mayor volumen de visitas de pacientes que anteriormente no podían pagar, y por mejores negociaciones de capitación de Medi-Cal Managed Care que incluyan la población más amplia de tarifa deslizante. Proponer actualizar la escala inmediatamente y distribuir el impacto en ingresos durante 2 trimestres. Incluir un plan de comunicación a pacientes — las familias que fueron sobrecobradas merecen saber sobre las tarifas corregidas",
        score: 4,
        behaviorTag: "compliance-mission-integrator",
      },
      {
        id: "rs_fm_m3_b",
        text: "Update the sliding fee scale to current FPL guidelines and present the $120K revenue impact to the CEO with a plan to absorb it through other revenue growth",
        esText: "Actualizar la escala de tarifas deslizantes a las guías actuales de FPL y presentar el impacto de $120K en ingresos al CEO con un plan para absorberlo a través de crecimiento de otros ingresos",
        score: 3,
        behaviorTag: "compliant-fixer",
      },
      {
        id: "rs_fm_m3_c",
        text: "Schedule the update for next fiscal year's budget cycle — making a $120K revenue change mid-year is disruptive, and the FQHC has survived HRSA visits with the current scale for 4 years",
        esText: "Programar la actualización para el ciclo presupuestario del próximo año fiscal — hacer un cambio de $120K en ingresos a mitad de año es disruptivo, y el FQHC ha sobrevivido visitas de HRSA con la escala actual por 4 años",
        score: 2,
        behaviorTag: "delays-compliance",
      },
      {
        id: "rs_fm_m3_d",
        text: "Update the FPL thresholds on paper but maintain the current pricing tiers — you'll be technically compliant with the FPL requirement while minimizing revenue impact",
        esText: "Actualizar los umbrales de FPL en papel pero mantener los niveles de precio actuales — serás técnicamente compatible con el requisito de FPL mientras minimizas el impacto en ingresos",
        score: 1,
        behaviorTag: "paper-compliance",
      },
    ],
  },

  // Finance Manager - People 2
  {
    id: "rs_fm_people_2",
    roleId: "finance_manager",
    domain: "people",
    scenario:
      "Your FQHC is going through a CalAIM ECM program launch. The program director — who is clinically brilliant — keeps making financial commitments without consulting finance: she promised a community partner organization a $15K subcontract, told 3 CHW candidates they'd start at $26/hour (your approved budget shows $23), and ordered $8K in outreach materials without a purchase order. Your CFO says: 'Fix this relationship — we can't have program directors spending grant money without financial oversight, but we also can't afford to lose her.'",
    esScenario:
      "Tu FQHC está lanzando un programa ECM de CalAIM. La directora de programa — que es clínicamente brillante — sigue haciendo compromisos financieros sin consultar a finanzas: prometió a una organización socia comunitaria un subcontrato de $15K, dijo a 3 candidatos CHW que empezarían a $26/hora (tu presupuesto aprobado muestra $23), y ordenó $8K en materiales de alcance sin una orden de compra. Tu CFO dice: 'Arregla esta relación — no podemos tener directoras de programa gastando dinero de subvenciones sin supervisión financiera, pero tampoco podemos darnos el lujo de perderla.'",
    question: "How do you establish financial boundaries without alienating the program director?",
    esQuestion: "¿Cómo estableces límites financieros sin alienar a la directora de programa?",
    options: [
      {
        id: "rs_fm_p2_a",
        text: "Meet with the program director privately — lead with partnership, not policing. Start by acknowledging her programmatic expertise and the urgency of launching ECM. Then explain the financial reality: 'Every dollar in this grant is auditable by HRSA. If we spend outside the approved budget categories or rates, we risk having to return the money — which kills the program you're building.' Walk through the specific issues: the $26/hour CHW rate exceeds the approved budget (show her the line item), the $15K subcontract needs to be in the approved budget or requires a budget modification to HRSA, the $8K purchase needs a PO for audit trail. Propose a solution: create a simple one-page spending approval process — anything under $2K is program director authority, $2K-$10K requires finance review, over $10K requires CFO approval. Set up biweekly budget check-ins so she can plan spending proactively. Frame it: 'I want you to spend every dollar of this grant — I just need to make sure we do it in a way that keeps the grant safe'",
        esText: "Reunirse con la directora de programa de forma privada — liderar con asociación, no con vigilancia. Empezar reconociendo su experiencia programática y la urgencia de lanzar ECM. Luego explicar la realidad financiera: 'Cada dólar en esta subvención es auditable por HRSA. Si gastamos fuera de las categorías o tarifas del presupuesto aprobado, arriesgamos tener que devolver el dinero — lo que mata el programa que estás construyendo.' Revisar los problemas específicos: la tarifa de CHW de $26/hora excede el presupuesto aprobado (mostrarle la línea del presupuesto), el subcontrato de $15K necesita estar en el presupuesto aprobado o requiere una modificación presupuestaria ante HRSA, la compra de $8K necesita una orden de compra para trazabilidad de auditoría. Proponer una solución: crear un proceso simple de aprobación de gastos de una página — cualquier cosa bajo $2K es autoridad de la directora de programa, $2K-$10K requiere revisión financiera, más de $10K requiere aprobación del CFO. Establecer reuniones quincenales de revisión presupuestaria para que pueda planear gastos proactivamente. Enmarcarlo: 'Quiero que gastes cada dólar de esta subvención — solo necesito asegurarme de que lo hagamos de forma que mantenga la subvención segura'",
        score: 4,
        behaviorTag: "collaborative-guardrail-setter",
      },
      {
        id: "rs_fm_p2_b",
        text: "Send the program director a formal memo outlining the spending authority limits and require all future expenditures over $1K to go through finance approval. Copy the CFO to establish accountability",
        esText: "Enviar a la directora de programa un memo formal delineando los límites de autoridad de gastos y requerir que todos los gastos futuros mayores a $1K pasen por aprobación financiera. Copiar al CFO para establecer rendición de cuentas",
        score: 3,
        behaviorTag: "formal-boundary-setter",
      },
      {
        id: "rs_fm_p2_c",
        text: "Ask the CFO to have the conversation with the program director — it's a management issue, not a finance issue, and the program director will take it more seriously coming from leadership",
        esText: "Pedir al CFO que tenga la conversación con la directora de programa — es un problema de gestión, no de finanzas, y la directora de programa lo tomará más en serio viniendo del liderazgo",
        score: 2,
        behaviorTag: "escalates-rather-than-engages",
      },
      {
        id: "rs_fm_p2_d",
        text: "Fix the specific issues (adjust the CHW rate, process the PO, review the subcontract) and hope the program director learns the process through correction",
        esText: "Arreglar los problemas específicos (ajustar la tarifa de CHW, procesar la orden de compra, revisar el subcontrato) y esperar que la directora de programa aprenda el proceso a través de la corrección",
        score: 1,
        behaviorTag: "fixes-symptoms-not-pattern",
      },
    ],
  },

  // Finance Manager - People 3
  {
    id: "rs_fm_people_3",
    roleId: "finance_manager",
    domain: "people",
    scenario:
      "Your finance team consists of 2 people: you and a Staff Accountant who has been at the FQHC for 7 years. She's reliable for routine tasks — AP, bank reconciliations, monthly journal entries — but struggles with anything analytical: budget variance reports, grant financial projections, and cash flow forecasting. When you ask her to prepare a variance analysis, she produces a spreadsheet full of formulas but can't explain what the numbers mean. You've tried to coach her, but she becomes defensive: 'I've been doing this job for 7 years and nobody has ever complained before.' Your workload is unsustainable because you're doing all analytical work on top of your management responsibilities.",
    esScenario:
      "Tu equipo de finanzas consiste en 2 personas: tú y una Contadora de Planta que ha estado en el FQHC por 7 años. Es confiable para tareas rutinarias — cuentas por pagar, conciliaciones bancarias, asientos contables mensuales — pero tiene dificultades con cualquier cosa analítica: reportes de varianza presupuestaria, proyecciones financieras de subvenciones, y pronósticos de flujo de efectivo. Cuando le pides preparar un análisis de varianza, produce una hoja de cálculo llena de fórmulas pero no puede explicar qué significan los números. Has intentado guiarla, pero se pone a la defensiva: 'He estado haciendo este trabajo por 7 años y nadie se ha quejado antes.' Tu carga de trabajo es insostenible porque estás haciendo todo el trabajo analítico además de tus responsabilidades de gestión.",
    question: "How do you develop this team member?",
    esQuestion: "¿Cómo desarrollas a esta miembro del equipo?",
    options: [
      {
        id: "rs_fm_p3_a",
        text: "Have an honest, supportive conversation that reframes the situation. Start with genuine appreciation: 'Your reliability on AP, reconciliations, and journal entries is the foundation this department runs on — I couldn't do my job without that.' Then be direct about the growth need: 'As our FQHC grows and faces more financial complexity, I need this team to grow with it. I'd like to invest in building your analytical skills — not because your current work isn't valued, but because I think you're capable of more and I need a partner, not just a processor.' Propose a specific development plan: start with one analytical skill (budget variance analysis), provide a template with notes explaining what each number means, walk through 2-3 examples together, then have her prepare the next one with your review. Set a 90-day goal: she independently produces monthly variance reports. Connect the skill development to her career: 'Accountants who can do variance analysis earn $8-12K more in the market — this is good for you too'",
        esText: "Tener una conversación honesta y de apoyo que reencuadre la situación. Empezar con apreciación genuina: 'Tu confiabilidad en cuentas por pagar, conciliaciones, y asientos contables es la base sobre la que funciona este departamento — no podría hacer mi trabajo sin eso.' Luego ser directo sobre la necesidad de crecimiento: 'A medida que nuestro FQHC crece y enfrenta más complejidad financiera, necesito que este equipo crezca con él. Me gustaría invertir en construir tus habilidades analíticas — no porque tu trabajo actual no sea valorado, sino porque creo que eres capaz de más y necesito una socia, no solo una procesadora.' Proponer un plan de desarrollo específico: empezar con una habilidad analítica (análisis de varianza presupuestaria), proporcionar una plantilla con notas explicando qué significa cada número, revisar 2-3 ejemplos juntos, luego hacer que ella prepare el siguiente con tu revisión. Establecer una meta a 90 días: que produzca independientemente reportes mensuales de varianza. Conectar el desarrollo de habilidades con su carrera: 'Contadores que pueden hacer análisis de varianza ganan $8-12K más en el mercado — esto también es bueno para ti'",
        score: 4,
        behaviorTag: "developmental-leader",
      },
      {
        id: "rs_fm_p3_b",
        text: "Accept that she's a transactional accountant, not an analytical one. Restructure the team responsibilities: she handles all routine processing, you handle all analysis. Request budget for a part-time financial analyst to help with your workload",
        esText: "Aceptar que es una contadora transaccional, no analítica. Reestructurar las responsabilidades del equipo: ella maneja todo el procesamiento rutinario, tú manejas todo el análisis. Solicitar presupuesto para un analista financiero de medio tiempo para ayudar con tu carga de trabajo",
        score: 3,
        behaviorTag: "works-around",
      },
      {
        id: "rs_fm_p3_c",
        text: "Document the performance gap and put her on a formal performance improvement plan — after 7 years, she should be able to do variance analysis, and coaching hasn't worked",
        esText: "Documentar la brecha de desempeño y ponerla en un plan formal de mejora de rendimiento — después de 7 años, debería poder hacer análisis de varianza, y el coaching no ha funcionado",
        score: 2,
        behaviorTag: "formal-discipline",
      },
      {
        id: "rs_fm_p3_d",
        text: "Continue doing the analytical work yourself — it's faster than teaching someone who doesn't want to learn, and the FQHC can't afford to lose a reliable accountant during a staffing crisis",
        esText: "Continuar haciendo el trabajo analítico tú mismo — es más rápido que enseñar a alguien que no quiere aprender, y el FQHC no puede darse el lujo de perder un contador confiable durante una crisis de personal",
        score: 1,
        behaviorTag: "martyr-manager",
      },
    ],
  },

  // Finance Manager - Execution 2
  {
    id: "rs_fm_execution_2",
    roleId: "finance_manager",
    domain: "execution",
    scenario:
      "Your FQHC is preparing for its annual budget. Revenue assumptions are volatile: H.R. 1 could cut Medi-Cal funding by 12-18%, SB 525 wage increases will add $800K in personnel costs, 340B savings are declining due to manufacturer restrictions, and your largest managed care plan contract is up for renegotiation. The CEO wants a single budget number. The board wants certainty. But you're facing more financial uncertainty than any prior year.",
    esScenario:
      "Tu FQHC se está preparando para su presupuesto anual. Los supuestos de ingresos son volátiles: H.R. 1 podría recortar el financiamiento de Medi-Cal entre 12-18%, los aumentos salariales de SB 525 agregarán $800K en costos de personal, los ahorros de 340B están disminuyendo por restricciones de fabricantes, y el contrato de tu plan de atención administrada más grande está en renegociación. El CEO quiere un número presupuestario único. La junta quiere certeza. Pero enfrentas más incertidumbre financiera que cualquier año anterior.",
    question: "How do you build a budget under extreme uncertainty?",
    esQuestion: "¿Cómo construyes un presupuesto bajo incertidumbre extrema?",
    options: [
      {
        id: "rs_fm_e2_a",
        text: "Abandon the single-number budget in favor of scenario-based planning — this is the honest approach when the variables are genuinely unknown. Build 3 scenarios: (1) Base case: Medi-Cal cuts at 12%, managed care renegotiation at current rates, 340B decline continues at current trend. (2) Stress case: Medi-Cal cuts at 18%, managed care rate reduction of 5%, 340B savings drop 30%. (3) Opportunity case: Medi-Cal cuts limited by state legislation, managed care rate increase of 3%, new CalAIM revenue offsets 340B decline. For each scenario, calculate the operating surplus/deficit, days cash on hand, and required cost reductions. Present the board with decision triggers: 'If Medi-Cal cuts exceed 15% by Q2, we activate cost reduction plan B — here's exactly what that looks like.' Build the expense budget at the base case level but create a 'flex budget' appendix showing which costs get cut or deferred in the stress case. This gives the CEO a working number and the board the certainty they need — certainty about the plan, not the outcome",
        esText: "Abandonar el presupuesto de número único a favor de planificación basada en escenarios — este es el enfoque honesto cuando las variables son genuinamente desconocidas. Construir 3 escenarios: (1) Caso base: recortes de Medi-Cal al 12%, renegociación de atención administrada a tarifas actuales, disminución de 340B continúa la tendencia actual. (2) Caso de estrés: recortes de Medi-Cal al 18%, reducción de tarifa de atención administrada del 5%, ahorros de 340B caen 30%. (3) Caso de oportunidad: recortes de Medi-Cal limitados por legislación estatal, aumento de tarifa de atención administrada del 3%, nuevos ingresos de CalAIM compensan disminución de 340B. Para cada escenario, calcular el superávit/déficit operativo, días de efectivo disponible, y reducciones de costos requeridas. Presentar a la junta con disparadores de decisión: 'Si los recortes de Medi-Cal exceden el 15% para el Q2, activamos el plan de reducción de costos B — aquí está exactamente cómo se ve.' Construir el presupuesto de gastos al nivel del caso base pero crear un apéndice de 'presupuesto flexible' mostrando qué costos se recortan o difieren en el caso de estrés. Esto da al CEO un número de trabajo y a la junta la certeza que necesitan — certeza sobre el plan, no sobre el resultado",
        score: 4,
        behaviorTag: "scenario-planner",
      },
      {
        id: "rs_fm_e2_b",
        text: "Build the budget using conservative revenue assumptions (worst-case Medi-Cal, flat managed care, declining 340B) and present it as a floor — if conditions improve, the FQHC will beat budget rather than miss it",
        esText: "Construir el presupuesto usando supuestos conservadores de ingresos (peor caso de Medi-Cal, atención administrada plana, 340B en declive) y presentarlo como un piso — si las condiciones mejoran, el FQHC superará el presupuesto en lugar de no cumplirlo",
        score: 3,
        behaviorTag: "conservative-budgeter",
      },
      {
        id: "rs_fm_e2_c",
        text: "Use last year's revenue as the baseline, add a 5% cushion for uncertainty, and adjust quarterly as actual data comes in — an annual budget is inherently a guess anyway",
        esText: "Usar los ingresos del año pasado como línea base, agregar un colchón del 5% para incertidumbre, y ajustar trimestralmente a medida que llegan datos reales — un presupuesto anual es inherentemente una estimación de todos modos",
        score: 2,
        behaviorTag: "status-quo-budgeter",
      },
      {
        id: "rs_fm_e2_d",
        text: "Wait until the H.R. 1 legislation and managed care negotiations are finalized before presenting a budget — you can't build a meaningful budget without knowing the major revenue variables",
        esText: "Esperar hasta que la legislación H.R. 1 y las negociaciones de atención administrada estén finalizadas antes de presentar un presupuesto — no puedes construir un presupuesto significativo sin conocer las variables principales de ingresos",
        score: 1,
        behaviorTag: "paralyzed-by-uncertainty",
      },
    ],
  },

  // Finance Manager - Execution 3
  {
    id: "rs_fm_execution_3",
    roleId: "finance_manager",
    domain: "execution",
    scenario:
      "Your FQHC's external auditor just issued a 'going concern' qualification on the annual financial statements — a formal warning that questions the organization's ability to continue operating. This was triggered by 2 consecutive years of operating losses totaling $1.4M and declining days cash on hand (from 45 days to 18 days). The going concern qualification will be visible to HRSA, your bank (which holds a $500K line of credit), and any prospective grantors. Your CEO is panicking. The board chair wants an emergency meeting.",
    esScenario:
      "El auditor externo de tu FQHC acaba de emitir una calificación de 'empresa en marcha' en los estados financieros anuales — una advertencia formal que cuestiona la capacidad de la organización para continuar operando. Esto fue desencadenado por 2 años consecutivos de pérdidas operativas totalizando $1.4M y días de efectivo disponible en declive (de 45 días a 18 días). La calificación de empresa en marcha será visible para HRSA, tu banco (que tiene una línea de crédito de $500K), y cualquier posible otorgante de subvenciones. Tu CEO está en pánico. El presidente de la junta quiere una reunión de emergencia.",
    question: "How do you respond to this crisis?",
    esQuestion: "¿Cómo respondes a esta crisis?",
    options: [
      {
        id: "rs_fm_e3_a",
        text: "Take control of the narrative before it controls you. First, prepare a 'Management Response' letter (required by auditing standards) that outlines the concrete steps the FQHC is taking to address the going concern factors — this gets published alongside the audit report. Make it specific: 'Management has implemented a 12-month financial recovery plan including [list actions].' Then prepare for the emergency board meeting with a 90-day financial stabilization plan: immediate cash preservation measures (pause non-essential spending, negotiate vendor payment extensions), revenue acceleration (expedite Medi-Cal claims processing, capture unbilled encounters), and structural changes (consolidate administrative functions across sites, renegotiate managed care contracts). Proactively contact the bank: share the stabilization plan before they call you — banks are more likely to maintain the credit line if you demonstrate proactive management. Contact HRSA's Bureau of Primary Health Care to flag the situation — they have technical assistance resources and progressive action protocols for FQHCs in financial distress. Present the board with a quarterly dashboard that tracks the recovery metrics. A going concern is survivable — but only with decisive action in the first 90 days",
        esText: "Tomar control de la narrativa antes de que te controle. Primero, preparar una carta de 'Respuesta de la Gerencia' (requerida por estándares de auditoría) que delinee los pasos concretos que el FQHC está tomando para abordar los factores de empresa en marcha — esto se publica junto al informe de auditoría. Hacerlo específico: 'La gerencia ha implementado un plan de recuperación financiera de 12 meses que incluye [listar acciones].' Luego prepararse para la reunión de emergencia de la junta con un plan de estabilización financiera de 90 días: medidas inmediatas de preservación de efectivo (pausar gastos no esenciales, negociar extensiones de pago con proveedores), aceleración de ingresos (expeditar procesamiento de reclamos de Medi-Cal, capturar encuentros no facturados), y cambios estructurales (consolidar funciones administrativas entre sitios, renegociar contratos de atención administrada). Contactar proactivamente al banco: compartir el plan de estabilización antes de que te llamen — los bancos son más propensos a mantener la línea de crédito si demuestras gestión proactiva. Contactar a la Oficina de Atención Primaria de HRSA para señalar la situación — tienen recursos de asistencia técnica y protocolos de acción progresiva para FQHCs en dificultades financieras. Presentar a la junta un tablero trimestral que rastree las métricas de recuperación. Una empresa en marcha es sobrevivible — pero solo con acción decisiva en los primeros 90 días",
        score: 4,
        behaviorTag: "crisis-commander",
      },
      {
        id: "rs_fm_e3_b",
        text: "Prepare a cost reduction plan to return to positive operating margin within 2 quarters and present it at the emergency board meeting. Contact the bank to reassure them the FQHC is taking corrective action",
        esText: "Preparar un plan de reducción de costos para volver a margen operativo positivo dentro de 2 trimestres y presentarlo en la reunión de emergencia de la junta. Contactar al banco para asegurarles que el FQHC está tomando acción correctiva",
        score: 3,
        behaviorTag: "cost-cutter",
      },
      {
        id: "rs_fm_e3_c",
        text: "Challenge the auditor's going concern qualification — 18 days cash on hand is low but not critical, and the operating losses were driven by one-time expenses (system migration, SB 525 implementation) that won't recur",
        esText: "Desafiar la calificación de empresa en marcha del auditor — 18 días de efectivo disponible es bajo pero no crítico, y las pérdidas operativas fueron impulsadas por gastos únicos (migración de sistema, implementación de SB 525) que no se repetirán",
        score: 2,
        behaviorTag: "disputes-diagnosis",
      },
      {
        id: "rs_fm_e3_d",
        text: "Resign — a going concern qualification means the organization is failing, and you don't want this on your professional record. The FQHC needs a turnaround specialist, not a Finance Manager",
        esText: "Renunciar — una calificación de empresa en marcha significa que la organización está fallando, y no quieres esto en tu historial profesional. El FQHC necesita un especialista en reestructuración, no un Gerente de Finanzas",
        score: 1,
        behaviorTag: "abandons-ship",
      },
    ],
  },

  // Finance Manager - Growth 2
  {
    id: "rs_fm_growth_2",
    roleId: "finance_manager",
    domain: "growth",
    scenario:
      "Your FQHC's CEO asks you to lead a due diligence analysis for a potential merger with a smaller FQHC in a neighboring county. The target organization has 2 sites, 85 employees, $6M in revenue, and is struggling financially after losing a major grant. The merger could expand your service area and increase your HRSA base grant, but it also means inheriting their financial problems. You've never participated in a healthcare organization merger or acquisition, let alone led the financial analysis.",
    esScenario:
      "El CEO de tu FQHC te pide liderar un análisis de debida diligencia para una posible fusión con un FQHC más pequeño en un condado vecino. La organización objetivo tiene 2 sitios, 85 empleados, $6M en ingresos, y está luchando financieramente después de perder una subvención importante. La fusión podría expandir tu área de servicio y aumentar tu subvención base de HRSA, pero también significa heredar sus problemas financieros. Nunca has participado en una fusión o adquisición de organización de salud, mucho menos liderado el análisis financiero.",
    question: "How do you approach this unfamiliar challenge?",
    esQuestion: "¿Cómo abordas este desafío desconocido?",
    options: [
      {
        id: "rs_fm_g2_a",
        text: "Build your expertise fast while executing methodically. Research FQHC-specific merger frameworks — NACHC has published guidance on FQHC mergers and affiliations, and several CA FQHCs (like Community Health Center Network in Alameda County) have completed recent mergers with public documentation. Develop a financial due diligence checklist: (1) 3 years of audited financials and management letters, (2) all grant agreements and compliance history, (3) outstanding liabilities, pending litigation, and tax obligations, (4) 340B program status and savings, (5) PPS rate and cost report history, (6) managed care contracts and reimbursement rates, (7) employee benefit obligations and union contracts, (8) capital equipment and lease obligations. Build a pro forma combined budget showing the merged entity's revenue, costs, and projected margin. Model the HRSA base grant increase (merging service areas increases the scope score). Identify the deal-breakers: undisclosed liabilities, HRSA compliance conditions, or unfunded pension obligations that could threaten the combined entity. Present the CEO with a go/no-go framework based on financial risk thresholds",
        esText: "Construir tu experiencia rápido mientras ejecutas metódicamente. Investigar marcos de fusión específicos de FQHC — NACHC ha publicado guía sobre fusiones y afiliaciones de FQHC, y varios FQHCs de CA (como Community Health Center Network en el Condado de Alameda) han completado fusiones recientes con documentación pública. Desarrollar una lista de verificación de debida diligencia financiera: (1) 3 años de estados financieros auditados y cartas de gestión, (2) todos los acuerdos de subvención e historial de cumplimiento, (3) pasivos pendientes, litigios en curso, y obligaciones fiscales, (4) estado del programa 340B y ahorros, (5) tasa PPS e historial de reportes de costos, (6) contratos de atención administrada y tasas de reembolso, (7) obligaciones de beneficios de empleados y contratos sindicales, (8) equipo de capital y obligaciones de arrendamiento. Construir un presupuesto pro forma combinado mostrando ingresos, costos, y margen proyectado de la entidad fusionada. Modelar el aumento de la subvención base de HRSA (fusionar áreas de servicio aumenta el puntaje de alcance). Identificar los factores decisivos negativos: pasivos no divulgados, condiciones de cumplimiento de HRSA, u obligaciones de pensiones sin fondos que podrían amenazar a la entidad combinada. Presentar al CEO un marco de decisión ir/no-ir basado en umbrales de riesgo financiero",
        score: 4,
        behaviorTag: "rapid-capability-builder",
      },
      {
        id: "rs_fm_g2_b",
        text: "Request the target FQHC's audited financials, review them thoroughly, and prepare a summary of their financial position for the CEO. Flag any concerns and recommend next steps",
        esText: "Solicitar los estados financieros auditados del FQHC objetivo, revisarlos exhaustivamente, y preparar un resumen de su posición financiera para el CEO. Señalar cualquier preocupación y recomendar próximos pasos",
        score: 3,
        behaviorTag: "step-by-step",
      },
      {
        id: "rs_fm_g2_c",
        text: "Recommend hiring a healthcare M&A consultant to lead the due diligence — mergers involve legal, regulatory, and financial complexity that requires specialized expertise",
        esText: "Recomendar contratar un consultor de M&A de salud para liderar la debida diligencia — las fusiones involucran complejidad legal, regulatoria, y financiera que requiere experiencia especializada",
        score: 2,
        behaviorTag: "outsources-to-specialists",
      },
      {
        id: "rs_fm_g2_d",
        text: "Advise the CEO against the merger — taking on a financially struggling organization during a Medicaid funding crisis is too risky regardless of the service area benefits",
        esText: "Aconsejar al CEO en contra de la fusión — asumir una organización financieramente en dificultades durante una crisis de financiamiento de Medicaid es demasiado riesgoso sin importar los beneficios del área de servicio",
        score: 1,
        behaviorTag: "refuses-challenge",
      },
    ],
  },

  // Finance Manager - Growth 3
  {
    id: "rs_fm_growth_3",
    roleId: "finance_manager",
    domain: "growth",
    scenario:
      "Your FQHC's board has asked you to implement a new business intelligence dashboard that gives real-time financial visibility to the executive team and board members. Currently, financial data takes 3 weeks to compile after month-end close, and board members only see quarterly reports (which are 6 weeks old by the time they're presented). The board wants to see daily cash position, weekly revenue by payer, monthly budget-to-actual by department, and real-time grant spending against budget. You have a Sage Intacct accounting system and basic Excel skills but no experience with BI tools like Power BI, Tableau, or even advanced Excel dashboarding.",
    esScenario:
      "La junta de tu FQHC te ha pedido implementar un nuevo tablero de inteligencia de negocios que dé visibilidad financiera en tiempo real al equipo ejecutivo y miembros de la junta. Actualmente, los datos financieros toman 3 semanas en compilarse después del cierre de mes, y los miembros de la junta solo ven reportes trimestrales (que tienen 6 semanas de antigüedad cuando se presentan). La junta quiere ver posición de efectivo diaria, ingresos semanales por pagador, presupuesto vs. real mensual por departamento, y gasto de subvenciones en tiempo real contra presupuesto. Tienes un sistema contable Sage Intacct y habilidades básicas de Excel pero ninguna experiencia con herramientas de BI como Power BI, Tableau, o incluso dashboarding avanzado de Excel.",
    question: "How do you deliver on this request?",
    esQuestion: "¿Cómo cumples con esta solicitud?",
    options: [
      {
        id: "rs_fm_g3_a",
        text: "Break this into a learn-build-iterate approach. Phase 1 (Weeks 1-4): Take a Power BI fundamentals course (Microsoft offers free learning paths). Simultaneously, identify what's causing the 3-week close delay — likely manual reconciliation steps that could be streamlined in Sage Intacct. Connect with the Sage Intacct user community to learn which financial reports auto-export and which BI tools integrate natively (Sage Intacct has built-in dashboarding that might cover 60% of the need without a separate tool). Phase 2 (Weeks 5-8): Build an MVP dashboard in either Sage Intacct's built-in reporting or Power BI. Start with the two most-requested metrics: daily cash position (automated bank feed) and grant spending vs. budget (Sage Intacct dimension reporting). Phase 3 (Weeks 9-12): Add weekly revenue by payer and monthly budget-to-actual. Train the executive team on self-service access. Present the board with the dashboard at the next quarterly meeting — live, not screenshots. Collect feedback and iterate. Target: reduce month-end reporting from 3 weeks to 1 week within 6 months",
        esText: "Dividir esto en un enfoque de aprender-construir-iterar. Fase 1 (Semanas 1-4): Tomar un curso de fundamentos de Power BI (Microsoft ofrece rutas de aprendizaje gratuitas). Simultáneamente, identificar qué está causando el retraso de 3 semanas en el cierre — probablemente pasos de conciliación manual que podrían optimizarse en Sage Intacct. Conectarse con la comunidad de usuarios de Sage Intacct para aprender qué reportes financieros se auto-exportan y qué herramientas de BI se integran nativamente (Sage Intacct tiene dashboarding incorporado que podría cubrir el 60% de la necesidad sin una herramienta separada). Fase 2 (Semanas 5-8): Construir un tablero MVP en el reporte incorporado de Sage Intacct o Power BI. Empezar con las dos métricas más solicitadas: posición de efectivo diaria (alimentación bancaria automatizada) y gasto de subvención vs. presupuesto (reportes de dimensión de Sage Intacct). Fase 3 (Semanas 9-12): Agregar ingresos semanales por pagador y presupuesto vs. real mensual. Capacitar al equipo ejecutivo en acceso de autoservicio. Presentar a la junta el tablero en la próxima reunión trimestral — en vivo, no capturas de pantalla. Recopilar retroalimentación e iterar. Meta: reducir reportes de cierre de mes de 3 semanas a 1 semana dentro de 6 meses",
        score: 4,
        behaviorTag: "technical-growth-driver",
      },
      {
        id: "rs_fm_g3_b",
        text: "Research BI tools, select one that integrates with Sage Intacct, and build the dashboard incrementally — starting with cash position and adding metrics as you learn the tool",
        esText: "Investigar herramientas de BI, seleccionar una que se integre con Sage Intacct, y construir el tablero incrementalmente — empezando con posición de efectivo y agregando métricas a medida que aprendes la herramienta",
        score: 3,
        behaviorTag: "self-directed-builder",
      },
      {
        id: "rs_fm_g3_c",
        text: "Hire a BI consultant to build the dashboard and train you on maintaining it — this is a technical project that needs professional implementation",
        esText: "Contratar un consultor de BI para construir el tablero y capacitarte en su mantenimiento — este es un proyecto técnico que necesita implementación profesional",
        score: 2,
        behaviorTag: "outsources-build",
      },
      {
        id: "rs_fm_g3_d",
        text: "Improve the current Excel-based reporting by accelerating the close process — real-time dashboards are nice but the priority should be getting monthly financials out faster, not building a new technology platform",
        esText: "Mejorar el reporte actual basado en Excel acelerando el proceso de cierre — los tableros en tiempo real son buenos pero la prioridad debería ser sacar los financieros mensuales más rápido, no construir una nueva plataforma tecnológica",
        score: 1,
        behaviorTag: "incrementalist",
      },
    ],
  },

  // Finance Manager - Transition 1
  {
    id: "rs_fm_transition",
    roleId: "finance_manager",
    domain: "transition",
    scenario:
      "You've just been hired as Finance Manager at a 5-site FQHC with $22M in annual revenue. During your first week, you discover: (1) the monthly financial close hasn't been completed for the last 2 months, (2) there's a $340K discrepancy between the bank balance and the general ledger, (3) the board hasn't received financial statements in 3 months, (4) the FQHC's line of credit is at 90% utilization, and (5) the PPS cost report is due in 45 days. The previous Finance Manager was terminated for performance issues. The CFO position has been vacant for a year — you report directly to the CEO.",
    esScenario:
      "Acabas de ser contratado como Gerente de Finanzas en un FQHC de 5 sitios con $22M en ingresos anuales. Durante tu primera semana, descubres: (1) el cierre financiero mensual no se ha completado en los últimos 2 meses, (2) hay una discrepancia de $340K entre el saldo bancario y el libro mayor, (3) la junta no ha recibido estados financieros en 3 meses, (4) la línea de crédito del FQHC está al 90% de utilización, y (5) el reporte de costos PPS vence en 45 días. El Gerente de Finanzas anterior fue despedido por problemas de rendimiento. La posición de CFO ha estado vacante por un año — reportas directamente al CEO.",
    question: "How do you stabilize the finances in your first 30 days?",
    esQuestion: "¿Cómo estabilizas las finanzas en tus primeros 30 días?",
    options: [
      {
        id: "rs_fm_t1_a",
        text: "Diagnose, triage, and communicate — in that order. Day 1-3: Get the bank statements, the GL trial balance, and the last completed reconciliation. The $340K discrepancy is the highest priority — you can't make any financial decisions until you know the real cash position. Day 4-7: Close the two outstanding months. They won't be perfect — use estimates where necessary and mark items for follow-up. Getting 90% accurate financials to the board in 2 weeks is better than 100% accurate financials in 2 months. Day 8-10: Present the CEO with a candid assessment: 'Here's what I've found, here's the risk level, here's my 30-day stabilization plan.' Include the line of credit situation — at 90% utilization with delayed revenue recognition, the FQHC may be closer to a cash crisis than anyone realizes. Day 11-30: Resolve the bank reconciliation discrepancy, produce board financial statements, and begin the PPS cost report. Prioritize: PPS cost report deadline is immovable and directly affects future revenue. Communicate weekly progress to the CEO — transparency builds trust when you're the new person inheriting problems",
        esText: "Diagnosticar, priorizar, y comunicar — en ese orden. Día 1-3: Obtener los estados bancarios, la balanza de comprobación del GL, y la última conciliación completada. La discrepancia de $340K es la prioridad más alta — no puedes tomar decisiones financieras hasta saber la posición real de efectivo. Día 4-7: Cerrar los dos meses pendientes. No serán perfectos — usar estimaciones donde sea necesario y marcar items para seguimiento. Obtener estados financieros 90% precisos para la junta en 2 semanas es mejor que estados financieros 100% precisos en 2 meses. Día 8-10: Presentar al CEO una evaluación sincera: 'Esto es lo que he encontrado, este es el nivel de riesgo, este es mi plan de estabilización de 30 días.' Incluir la situación de la línea de crédito — al 90% de utilización con reconocimiento de ingresos retrasado, el FQHC puede estar más cerca de una crisis de efectivo de lo que nadie se da cuenta. Día 11-30: Resolver la discrepancia de conciliación bancaria, producir estados financieros para la junta, y comenzar el reporte de costos PPS. Priorizar: la fecha límite del reporte de costos PPS es inamovible y afecta directamente los ingresos futuros. Comunicar progreso semanal al CEO — la transparencia construye confianza cuando eres la persona nueva heredando problemas",
        score: 4,
        behaviorTag: "turnaround-leader",
      },
      {
        id: "rs_fm_t1_b",
        text: "Focus on the PPS cost report first since it has the firmest deadline and the biggest revenue impact. Close the outstanding months and resolve the bank reconciliation as time allows",
        esText: "Enfocarse en el reporte de costos PPS primero ya que tiene la fecha límite más firme y el mayor impacto en ingresos. Cerrar los meses pendientes y resolver la conciliación bancaria según el tiempo lo permita",
        score: 3,
        behaviorTag: "deadline-driven",
      },
      {
        id: "rs_fm_t1_c",
        text: "Hire a temporary accounting firm to help clean up the backlog — 2 months of unclosed books, a $340K discrepancy, and a PPS cost report due in 45 days is too much for one person",
        esText: "Contratar una firma contable temporal para ayudar a limpiar el atraso — 2 meses de libros sin cerrar, una discrepancia de $340K, y un reporte de costos PPS que vence en 45 días es demasiado para una persona",
        score: 2,
        behaviorTag: "seeks-reinforcement",
      },
      {
        id: "rs_fm_t1_d",
        text: "Tell the CEO you need 90 days to fully assess the financial situation before committing to any deadlines — making hasty financial decisions without a complete picture could make things worse",
        esText: "Decirle al CEO que necesitas 90 días para evaluar completamente la situación financiera antes de comprometerte con cualquier fecha límite — tomar decisiones financieras apresuradas sin un panorama completo podría empeorar las cosas",
        score: 1,
        behaviorTag: "delays-in-crisis",
      },
    ],
  },

  // Finance Manager - Transition 2
  {
    id: "rs_fm_transition_2",
    roleId: "finance_manager",
    domain: "transition",
    scenario:
      "You're 4 weeks into your new Finance Manager role. You've stabilized the month-end close and resolved the bank reconciliation. Now you're reviewing the FQHC's revenue model and you discover a significant problem: the organization's Medi-Cal managed care contracts haven't been renegotiated in 3 years. The current rates are 12-18% below what comparable FQHCs in your region are receiving. Meanwhile, your PPS rate (which applies to fee-for-service Medi-Cal patients) has been properly updated annually. This means the FQHC is leaving an estimated $380K per year on the table in managed care underpayments. Nobody on the current team has experience negotiating managed care contracts.",
    esScenario:
      "Llevas 4 semanas en tu nuevo rol de Gerente de Finanzas. Has estabilizado el cierre de fin de mes y resuelto la conciliación bancaria. Ahora estás revisando el modelo de ingresos del FQHC y descubres un problema significativo: los contratos de atención administrada de Medi-Cal de la organización no se han renegociado en 3 años. Las tarifas actuales están 12-18% por debajo de lo que FQHCs comparables en tu región están recibiendo. Mientras tanto, tu tasa PPS (que aplica a pacientes de Medi-Cal de pago por servicio) ha sido correctamente actualizada anualmente. Esto significa que el FQHC está dejando un estimado de $380K por año sobre la mesa en pagos insuficientes de atención administrada. Nadie en el equipo actual tiene experiencia negociando contratos de atención administrada.",
    question: "How do you approach managed care renegotiation?",
    esQuestion: "¿Cómo abordas la renegociación de atención administrada?",
    options: [
      {
        id: "rs_fm_t2_a",
        text: "Build a negotiation strategy based on data, not just asking for more money. Step 1: Pull your FQHC's PPS rate and use it as the benchmark — managed care plans should pay rates comparable to or above PPS for the same services. Calculate the gap between your current managed care rates and your PPS rate by CPT code. Step 2: Research what other CA FQHCs are receiving — CPCA collects this data from member organizations, and NACHC publishes managed care rate surveys. Step 3: Build a rate proposal document showing: your current rates, your PPS rates, the regional average, and your requested rates (start 10% above your target to leave room for negotiation). Step 4: Leverage your position — managed care plans need FQHC network adequacy to meet DHCS access requirements. If your FQHC serves a geographic area with few alternatives, you have negotiating power. Step 5: Learn negotiation skills — attend a CPCA managed care contracting workshop, connect with experienced FQHC CFOs who've negotiated successfully. Present the CEO with the $380K revenue recovery opportunity and your negotiation timeline. Start with the smallest managed care contract to build experience before tackling the largest",
        esText: "Construir una estrategia de negociación basada en datos, no solo pedir más dinero. Paso 1: Obtener la tasa PPS de tu FQHC y usarla como referencia — los planes de atención administrada deberían pagar tarifas comparables o superiores a PPS por los mismos servicios. Calcular la brecha entre tus tarifas actuales de atención administrada y tu tasa PPS por código CPT. Paso 2: Investigar lo que otros FQHCs de CA están recibiendo — CPCA recopila estos datos de organizaciones miembro, y NACHC publica encuestas de tarifas de atención administrada. Paso 3: Construir un documento de propuesta de tarifas mostrando: tus tarifas actuales, tus tarifas PPS, el promedio regional, y tus tarifas solicitadas (empezar 10% arriba de tu objetivo para dejar espacio de negociación). Paso 4: Aprovechar tu posición — los planes de atención administrada necesitan adecuación de red de FQHC para cumplir requisitos de acceso de DHCS. Si tu FQHC sirve un área geográfica con pocas alternativas, tienes poder de negociación. Paso 5: Aprender habilidades de negociación — asistir a un taller de contratación de atención administrada de CPCA, conectarse con CFOs de FQHC experimentados que han negociado exitosamente. Presentar al CEO la oportunidad de recuperación de ingresos de $380K y tu cronograma de negociación. Empezar con el contrato de atención administrada más pequeño para construir experiencia antes de abordar el más grande",
        score: 4,
        behaviorTag: "revenue-recovery-strategist",
      },
      {
        id: "rs_fm_t2_b",
        text: "Contact each managed care plan, request a rate review, and present your PPS rate as justification for an increase. Negotiate each contract individually as they come up for renewal",
        esText: "Contactar a cada plan de atención administrada, solicitar una revisión de tarifas, y presentar tu tasa PPS como justificación para un aumento. Negociar cada contrato individualmente cuando vengan para renovación",
        score: 3,
        behaviorTag: "direct-negotiator",
      },
      {
        id: "rs_fm_t2_c",
        text: "Hire a managed care consulting firm to handle the renegotiations — contract negotiation requires specialized expertise and established relationships with the managed care plans",
        esText: "Contratar una firma consultora de atención administrada para manejar las renegociaciones — la negociación de contratos requiere experiencia especializada y relaciones establecidas con los planes de atención administrada",
        score: 2,
        behaviorTag: "outsources-negotiation",
      },
      {
        id: "rs_fm_t2_d",
        text: "Wait for the contracts to come up for renewal naturally — initiating renegotiations as the new Finance Manager might signal financial desperation to the managed care plans",
        esText: "Esperar a que los contratos lleguen a renovación naturalmente — iniciar renegociaciones como nuevo Gerente de Finanzas podría señalar desesperación financiera a los planes de atención administrada",
        score: 1,
        behaviorTag: "leaves-money-on-table",
      },
    ],
  },

  // Finance Manager - Transition 3
  {
    id: "rs_fm_transition_3",
    roleId: "finance_manager",
    domain: "transition",
    scenario:
      "You've been at your new FQHC for 6 weeks. The board has scheduled a special meeting to review your initial financial assessment and your recommended priorities for the next 12 months. This is your first board presentation at this organization. You know the board includes: the board chair (a retired hospital CEO), the treasurer (a CPA with corporate finance background), 3 community members with no financial background (one is a farmworker advocate, one is a pastor, one is a former patient), and 2 at-large members (a local business owner and a county health department official). The financial situation is complex: some good news (PPS rate is strong, 340B program is healthy) and some concerning trends (operating losses, high turnover costs, underpayment by managed care).",
    esScenario:
      "Llevas 6 semanas en tu nuevo FQHC. La junta ha programado una reunión especial para revisar tu evaluación financiera inicial y tus prioridades recomendadas para los próximos 12 meses. Esta es tu primera presentación a la junta en esta organización. Sabes que la junta incluye: el presidente de la junta (un CEO de hospital retirado), la tesorera (una CPA con experiencia en finanzas corporativas), 3 miembros comunitarios sin experiencia financiera (uno es defensor de trabajadores agrícolas, uno es pastor, una es ex paciente), y 2 miembros generales (un propietario de negocio local y un oficial del departamento de salud del condado). La situación financiera es compleja: algunas buenas noticias (la tasa PPS es fuerte, el programa 340B es saludable) y algunas tendencias preocupantes (pérdidas operativas, altos costos de rotación, pagos insuficientes de atención administrada).",
    question: "How do you prepare for this first board presentation?",
    esQuestion: "¿Cómo te preparas para esta primera presentación a la junta?",
    options: [
      {
        id: "rs_fm_t3_a",
        text: "Design the presentation for the most important audience: the 3 community members who don't have financial backgrounds. If they understand, everyone understands. Structure it in 3 clear sections: (1) 'Where we are' — use a simple green/yellow/red dashboard showing financial health indicators. Translate every number into mission impact: '$380K in managed care underpayments = 3,800 patient visits we're subsidizing from reserves.' (2) 'What I've found' — present the good news first (PPS rate strength, healthy 340B), then the concerns with specific dollar amounts and clear explanations. Avoid accounting jargon — say 'we're spending more than we're earning' not 'negative operating margin.' (3) 'What I recommend' — present 3-5 priorities ranked by impact and urgency, each with a timeline, cost, and expected return. Pre-meet with the treasurer 1-on-1 to get her input and buy-in before the meeting — she's your financial ally on the board. Send the presentation materials 5 days in advance so board members can prepare questions. End with: 'Here's what I need from the board' — clear asks, not just information sharing",
        esText: "Diseñar la presentación para la audiencia más importante: los 3 miembros comunitarios que no tienen experiencia financiera. Si ellos entienden, todos entienden. Estructurar en 3 secciones claras: (1) 'Dónde estamos' — usar un tablero simple verde/amarillo/rojo mostrando indicadores de salud financiera. Traducir cada número en impacto de misión: '$380K en pagos insuficientes de atención administrada = 3,800 visitas de pacientes que estamos subsidiando de las reservas.' (2) 'Lo que he encontrado' — presentar las buenas noticias primero (fortaleza de tasa PPS, 340B saludable), luego las preocupaciones con montos específicos y explicaciones claras. Evitar jerga contable — decir 'estamos gastando más de lo que ganamos' no 'margen operativo negativo.' (3) 'Lo que recomiendo' — presentar 3-5 prioridades clasificadas por impacto y urgencia, cada una con cronograma, costo, y retorno esperado. Reunirse previamente con la tesorera individualmente para obtener su opinión y apoyo antes de la reunión — ella es tu aliada financiera en la junta. Enviar los materiales de presentación 5 días antes para que los miembros de la junta puedan preparar preguntas. Terminar con: 'Esto es lo que necesito de la junta' — solicitudes claras, no solo compartir información",
        score: 4,
        behaviorTag: "inclusive-communicator",
      },
      {
        id: "rs_fm_t3_b",
        text: "Prepare a comprehensive financial presentation with all the key metrics: income statement trends, balance sheet position, cash flow forecast, and your recommended priorities. Include a Q&A section and be ready to simplify for non-financial board members if asked",
        esText: "Preparar una presentación financiera comprehensiva con todas las métricas clave: tendencias del estado de resultados, posición del balance general, pronóstico de flujo de efectivo, y tus prioridades recomendadas. Incluir una sección de preguntas y respuestas y estar listo para simplificar para miembros de la junta sin experiencia financiera si se solicita",
        score: 3,
        behaviorTag: "thorough-presenter",
      },
      {
        id: "rs_fm_t3_c",
        text: "Present a high-level summary — the board doesn't need to see all the details. Focus on the 3 biggest financial risks and your plan to address each one. Keep it to 15 minutes",
        esText: "Presentar un resumen de alto nivel — la junta no necesita ver todos los detalles. Enfocarse en los 3 riesgos financieros más grandes y tu plan para abordar cada uno. Mantenerlo en 15 minutos",
        score: 2,
        behaviorTag: "surface-level",
      },
      {
        id: "rs_fm_t3_d",
        text: "Ask the CEO to present the financial assessment together — you're too new to present alone and the board will take the message more seriously from the CEO",
        esText: "Pedir al CEO que presente la evaluación financiera juntos — eres muy nuevo para presentar solo y la junta tomará el mensaje más en serio viniendo del CEO",
        score: 1,
        behaviorTag: "lacks-confidence",
      },
    ],
  },

  // ============================================================
  //  BATCH 1: Additional questions for CHW, CC, MA, CM
  //  (10 per role, 2 per domain)
  // ============================================================
  // ============================================================
  //  CHW (Community Health Worker) — 10 new questions
  // ============================================================

  // CHW - Mission 2
  {
    id: "rs_chw_mission_2",
    roleId: "chw",
    domain: "mission",
    scenario:
      "Your FQHC just lost a major grant that funded the promotora program, and leadership is considering cutting CHW positions. A community partner asks you, 'Is it even worth staying in this work? The clinics are all cutting back.' You know that several high-risk patients on your panel depend on you for their only connection to healthcare.",
    esScenario:
      "Tu FQHC acaba de perder una subvención importante que financiaba el programa de promotoras, y el liderazgo está considerando eliminar posiciones de CHW. Un socio comunitario te pregunta, '¿Vale la pena seguir en este trabajo? Las clínicas están recortando todo.' Sabes que varios pacientes de alto riesgo en tu panel dependen de ti como su única conexión con la atención médica.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_chw_m2_a",
        text: "Share why you believe the work matters more than ever — with Medi-Cal cuts and clinic closures, CHWs are often the last line of connection for patients who would otherwise fall through the cracks. Acknowledge the real financial pressures but explain that you're documenting your patient outcomes to make the case for sustaining the program, and invite the partner to collaborate on a data-driven advocacy strategy to present to leadership.",
        esText: "Compartir por qué crees que el trabajo importa más que nunca — con los recortes a Medi-Cal y cierres de clínicas, los CHW son frecuentemente la última línea de conexión para pacientes que de otra forma quedarían sin atención. Reconocer las presiones financieras reales pero explicar que estás documentando los resultados de tus pacientes para hacer el caso de sostener el programa, e invitar al socio a colaborar en una estrategia de abogacía basada en datos para presentar al liderazgo.",
        score: 4,
        behaviorTag: "mission-advocate",
      },
      {
        id: "rs_chw_m2_b",
        text: "Acknowledge the uncertainty but express commitment to your patients. Mention that you're planning to talk to your supervisor about how to demonstrate the program's value and that you'll keep doing the work as long as you can.",
        esText: "Reconocer la incertidumbre pero expresar compromiso con tus pacientes. Mencionar que planeas hablar con tu supervisor sobre cómo demostrar el valor del programa y que seguirás haciendo el trabajo mientras puedas.",
        score: 3,
        behaviorTag: "committed-but-uncertain",
      },
      {
        id: "rs_chw_m2_c",
        text: "Agree that the situation looks bad and suggest the partner start looking at other community organizations that might be hiring, while you keep your head down and hope for the best.",
        esText: "Estar de acuerdo en que la situación se ve mal y sugerir al socio que busque en otras organizaciones comunitarias que podrían estar contratando, mientras mantienes perfil bajo y esperas lo mejor.",
        score: 2,
        behaviorTag: "pessimistic-passive",
      },
      {
        id: "rs_chw_m2_d",
        text: "Tell the partner they're right — the writing is on the wall — and that you're already updating your resume. The clinic clearly doesn't value community health work if they're cutting the program.",
        esText: "Decirle al socio que tiene razón — la situación es clara — y que ya estás actualizando tu currículum. La clínica claramente no valora el trabajo de salud comunitaria si está cortando el programa.",
        score: 1,
        behaviorTag: "mission-abandoner",
      },
    ],
  },

  // CHW - Mission 3
  {
    id: "rs_chw_mission_3",
    roleId: "chw",
    domain: "mission",
    scenario:
      "You're at a community health fair and a monolingual Spanish-speaking farmworker approaches your table. He's clearly in pain — limping, holding his back — but says he can't go to the clinic because he doesn't have papers and is afraid of being reported. He asks if you can just give him some pain medication.",
    esScenario:
      "Estás en una feria de salud comunitaria y un trabajador agrícola que solo habla español se acerca a tu mesa. Claramente tiene dolor — cojea, se sostiene la espalda — pero dice que no puede ir a la clínica porque no tiene papeles y teme ser reportado. Te pide que simplemente le des un medicamento para el dolor.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_chw_m3_a",
        text: "First, validate his fear — it's real and legitimate. Explain in Spanish that FQHCs are required by federal law to serve everyone regardless of immigration status, and that your clinic does not ask for or share immigration information. Offer to personally introduce him to a bilingual provider, walk him through what to expect at intake, and give him your direct number so he has a trusted point of contact. Explain you can't provide medication but can connect him to same-day care.",
        esText: "Primero, validar su miedo — es real y legítimo. Explicar en español que los FQHCs están obligados por ley federal a atender a todos sin importar su estatus migratorio, y que tu clínica no pide ni comparte información migratoria. Ofrecer presentarle personalmente a un proveedor bilingüe, guiarlo sobre qué esperar en la recepción, y darle tu número directo para que tenga un punto de contacto de confianza. Explicar que no puedes dar medicamentos pero puedes conectarlo con atención el mismo día.",
        score: 4,
        behaviorTag: "health-equity-champion",
      },
      {
        id: "rs_chw_m3_b",
        text: "Reassure him that the clinic serves everyone and give him a brochure about the FQHC's services and a number to call for an appointment. Encourage him to come in when he's ready.",
        esText: "Asegurarle que la clínica atiende a todos y darle un folleto sobre los servicios del FQHC y un número para hacer cita. Animarlo a venir cuando esté listo.",
        score: 3,
        behaviorTag: "informative-but-passive",
      },
      {
        id: "rs_chw_m3_c",
        text: "Tell him you understand his concern but that you can't give out medication. Suggest he try the emergency room if the pain gets worse, since they have to treat everyone.",
        esText: "Decirle que entiendes su preocupación pero que no puedes dar medicamentos. Sugerirle que vaya a la sala de emergencias si el dolor empeora, ya que tienen que atender a todos.",
        score: 2,
        behaviorTag: "deflects-to-er",
      },
      {
        id: "rs_chw_m3_d",
        text: "Explain that you're not a medical professional and can't help with pain issues. Give him the clinic's general number and move on to the next person at the health fair.",
        esText: "Explicar que no eres un profesional médico y no puedes ayudar con problemas de dolor. Darle el número general de la clínica y pasar a la siguiente persona en la feria de salud.",
        score: 1,
        behaviorTag: "dismissive",
      },
    ],
  },

  // CHW - People 2
  {
    id: "rs_chw_people_2",
    roleId: "chw",
    domain: "people",
    scenario:
      "A Hmong grandmother on your panel has been missing appointments. When you visit her home, you learn that her adult son — who usually drives her — recently lost his job and sold the car. She also confides that she's been feeling depressed since her husband died six months ago but doesn't want to see a 'crazy doctor.' Her grandchildren are translating, and you notice they're softening her words significantly.",
    esScenario:
      "Una abuela Hmong en tu panel ha estado faltando a sus citas. Cuando visitas su hogar, descubres que su hijo adulto — quien usualmente la lleva — perdió su trabajo recientemente y vendió el carro. Ella también te confía que se ha sentido deprimida desde que su esposo murió hace seis meses pero no quiere ver a un 'doctor de locos.' Sus nietos están traduciendo, y notas que están suavizando significativamente sus palabras.",
    question: "How do you navigate this situation?",
    esQuestion: "¿Cómo manejas esta situación?",
    options: [
      {
        id: "rs_chw_p2_a",
        text: "Address each layer of need with cultural sensitivity. First, arrange for professional Hmong interpreter services for future conversations so the grandchildren don't carry the burden of translating sensitive topics. Then tackle transportation by connecting her to Medi-Cal's Non-Emergency Medical Transportation (NEMT) benefit. For the grief and depression, ask if she'd be open to speaking with a Hmong community elder or a culturally matched behavioral health counselor — framing it as support for grief, not 'crazy doctor' treatment. Document all barriers in the EHR for the care team.",
        esText: "Abordar cada capa de necesidad con sensibilidad cultural. Primero, coordinar servicios de intérprete profesional Hmong para futuras conversaciones para que los nietos no carguen con la responsabilidad de traducir temas sensibles. Luego abordar el transporte conectándola con el beneficio de Transporte Médico No-Emergencia (NEMT) de Medi-Cal. Para el duelo y la depresión, preguntar si estaría abierta a hablar con un líder comunitario Hmong o un consejero de salud conductual culturalmente compatible — enmarcándolo como apoyo para el duelo, no tratamiento de 'doctor de locos.' Documentar todas las barreras en el EHR para el equipo de atención.",
        score: 4,
        behaviorTag: "multi-barrier-navigator",
      },
      {
        id: "rs_chw_p2_b",
        text: "Help solve the transportation issue by researching ride options and NEMT. Gently suggest she might benefit from talking to someone about her grief, and let the care team know she's been missing appointments due to multiple barriers.",
        esText: "Ayudar a resolver el problema de transporte investigando opciones de transporte y NEMT. Sugerir gentilmente que podría beneficiarse de hablar con alguien sobre su duelo, e informar al equipo de atención que ha faltado a citas por múltiples barreras.",
        score: 3,
        behaviorTag: "practical-helper",
      },
      {
        id: "rs_chw_p2_c",
        text: "Focus on getting her to her next appointment by offering to personally drive her or arranging a one-time ride. Let the provider know about the depression during the visit.",
        esText: "Enfocarte en llevarla a su próxima cita ofreciendo llevarla personalmente o coordinando un viaje por una vez. Informar al proveedor sobre la depresión durante la visita.",
        score: 2,
        behaviorTag: "short-term-fix",
      },
      {
        id: "rs_chw_p2_d",
        text: "Reschedule her appointment and tell her son to call the clinic when he can figure out transportation. Note in the chart that the patient is non-compliant with appointments.",
        esText: "Reprogramar su cita y decirle a su hijo que llame a la clínica cuando pueda resolver el transporte. Anotar en el expediente que la paciente no cumple con las citas.",
        score: 1,
        behaviorTag: "labels-non-compliant",
      },
    ],
  },

  // CHW - People 3
  {
    id: "rs_chw_people_3",
    roleId: "chw",
    domain: "people",
    scenario:
      "You're co-leading a diabetes self-management group in a community center. One participant — a middle-aged Latina woman — dominates every session, interrupting others and insisting that her home remedies are 'the real cure.' Other participants have stopped coming, and your co-facilitator wants to ask the dominant participant to leave the group.",
    esScenario:
      "Estás co-facilitando un grupo de autocontrol de diabetes en un centro comunitario. Una participante — una mujer latina de mediana edad — domina cada sesión, interrumpiendo a otros e insistiendo en que sus remedios caseros son 'la verdadera cura.' Otros participantes han dejado de venir, y tu co-facilitador quiere pedirle a la participante dominante que se vaya del grupo.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_chw_p3_a",
        text: "Before the next session, have a private one-on-one conversation with the participant — acknowledge her knowledge and passion, validate that traditional remedies are part of her cultural identity, but explain that the group needs to be a space where everyone can share. Offer her a role as a 'peer mentor' where she can contribute her experience in structured ways. With your co-facilitator, establish group agreements (ground rules) about taking turns and respectful listening. Reach out to participants who stopped attending to invite them back.",
        esText: "Antes de la próxima sesión, tener una conversación privada uno a uno con la participante — reconocer su conocimiento y pasión, validar que los remedios tradicionales son parte de su identidad cultural, pero explicar que el grupo necesita ser un espacio donde todos puedan compartir. Ofrecerle un rol como 'mentora par' donde pueda contribuir su experiencia de formas estructuradas. Con tu co-facilitador, establecer acuerdos de grupo (reglas básicas) sobre turnos para hablar y escucha respetuosa. Contactar a participantes que dejaron de asistir para invitarlos a regresar.",
        score: 4,
        behaviorTag: "inclusive-facilitator",
      },
      {
        id: "rs_chw_p3_b",
        text: "Implement group ground rules at the next session — a talking stick or timed shares — so everyone gets equal time. Privately check in with the dominant participant afterward to see how she felt about the structure.",
        esText: "Implementar reglas de grupo en la próxima sesión — un bastón de la palabra o turnos cronometrados — para que todos tengan tiempo igual. Hablar en privado con la participante dominante después para ver cómo se sintió con la estructura.",
        score: 3,
        behaviorTag: "structural-solution",
      },
      {
        id: "rs_chw_p3_c",
        text: "Agree with your co-facilitator and ask the participant to take a break from the group for a few weeks, explaining that others need space to share too.",
        esText: "Estar de acuerdo con tu co-facilitador y pedir a la participante que tome un descanso del grupo por unas semanas, explicando que otros necesitan espacio para compartir también.",
        score: 2,
        behaviorTag: "exclusionary",
      },
      {
        id: "rs_chw_p3_d",
        text: "Let the situation continue as-is. The group will naturally work itself out, and you don't want to confront the participant and risk losing her too.",
        esText: "Dejar que la situación continúe como está. El grupo se resolverá naturalmente, y no quieres confrontar a la participante y arriesgarte a perderla también.",
        score: 1,
        behaviorTag: "conflict-avoidant",
      },
    ],
  },

  // CHW - Execution 2
  {
    id: "rs_chw_execution_2",
    roleId: "chw",
    domain: "execution",
    scenario:
      "It's Friday afternoon and you have 12 patients flagged for outreach by end of day — a mix of missed appointment follow-ups, medication refill reminders, and SDOH screening completions. Your EHR is running slowly, you have a home visit scheduled in 45 minutes across town, and your supervisor just messaged that a compliance audit is Monday and your outreach documentation for the past two weeks needs to be cleaned up.",
    esScenario:
      "Es viernes por la tarde y tienes 12 pacientes marcados para alcance antes de fin de día — una mezcla de seguimientos por citas perdidas, recordatorios de resurtido de medicamentos, y evaluaciones SDOH pendientes. Tu EHR está funcionando lento, tienes una visita domiciliaria programada en 45 minutos al otro lado de la ciudad, y tu supervisor acaba de enviarte un mensaje de que hay una auditoría de cumplimiento el lunes y tu documentación de alcance de las últimas dos semanas necesita ser actualizada.",
    question: "How do you prioritize?",
    esQuestion: "¿Cómo priorizas?",
    options: [
      {
        id: "rs_chw_e2_a",
        text: "Triage by urgency and compliance risk: first, quickly identify which of the 12 patients are highest acuity (missed chronic disease appointments > medication refills > SDOH screenings). Make the critical calls before the home visit. During drive time, use hands-free to call the simpler refill reminders. After the home visit, dedicate 1-2 hours to cleaning up documentation for the audit — focus on encounters that are missing required fields. Send your supervisor a status update: 'X of 12 completed today, remaining Y will be done Monday morning before audit. Documentation cleanup 80% complete.'",
        esText: "Clasificar por urgencia y riesgo de cumplimiento: primero, identificar rápidamente cuáles de los 12 pacientes son de mayor agudeza (citas perdidas de enfermedades crónicas > resurtidos de medicamentos > evaluaciones SDOH). Hacer las llamadas críticas antes de la visita domiciliaria. Durante el trayecto, usar manos libres para llamar por los recordatorios más simples de resurtido. Después de la visita domiciliaria, dedicar 1-2 horas a limpiar documentación para la auditoría — enfocarse en encuentros que faltan campos requeridos. Enviar a tu supervisor una actualización de estado: 'X de 12 completados hoy, los Y restantes se harán lunes por la mañana antes de la auditoría. Limpieza de documentación 80% completa.'",
        score: 4,
        behaviorTag: "clinical-triager",
      },
      {
        id: "rs_chw_e2_b",
        text: "Cancel the home visit to focus on the 12 outreach calls and the audit documentation. The home visit patient can be rescheduled for Monday.",
        esText: "Cancelar la visita domiciliaria para enfocarte en las 12 llamadas de alcance y la documentación de la auditoría. El paciente de la visita domiciliaria puede ser reprogramado para el lunes.",
        score: 3,
        behaviorTag: "task-focused",
      },
      {
        id: "rs_chw_e2_c",
        text: "Focus entirely on the audit documentation since that's what your supervisor cares about right now. Send the 12 patients a quick text message and do the home visit as scheduled.",
        esText: "Enfocarte completamente en la documentación de la auditoría ya que eso es lo que le importa a tu supervisor ahora mismo. Enviar a los 12 pacientes un mensaje de texto rápido y hacer la visita domiciliaria como está programada.",
        score: 2,
        behaviorTag: "compliance-only",
      },
      {
        id: "rs_chw_e2_d",
        text: "Feel overwhelmed and decide to leave the outreach calls for Monday. Head to the home visit and deal with the audit documentation over the weekend if you have time.",
        esText: "Sentirte abrumado/a y decidir dejar las llamadas de alcance para el lunes. Ir a la visita domiciliaria y atender la documentación de la auditoría el fin de semana si tienes tiempo.",
        score: 1,
        behaviorTag: "avoidant-under-pressure",
      },
    ],
  },

  // CHW - Execution 3
  {
    id: "rs_chw_execution_3",
    roleId: "chw",
    domain: "execution",
    scenario:
      "During a routine home visit, your patient — a 72-year-old man with COPD and diabetes — tells you he stopped taking two of his medications three weeks ago because 'they make me feel worse.' He also mentions he's been using a neighbor's nebulizer instead of his own prescribed inhaler. His blood sugar log shows readings over 300 for the past week. He begs you not to tell his doctor because 'they'll just yell at me.'",
    esScenario:
      "Durante una visita domiciliaria rutinaria, tu paciente — un hombre de 72 años con EPOC y diabetes — te dice que dejó de tomar dos de sus medicamentos hace tres semanas porque 'lo hacen sentir peor.' También menciona que ha estado usando el nebulizador de un vecino en lugar de su inhalador recetado. Su registro de azúcar en sangre muestra lecturas por encima de 300 la última semana. Te suplica que no le digas a su doctor porque 'solo me van a regañar.'",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_chw_e3_a",
        text: "Acknowledge his trust in telling you — that took courage. Explain that as his CHW, you're part of his care team and withholding this information could put his health at serious risk, especially with blood sugars over 300. Ask him what specifically makes the medications feel worse — side effects are a clinical issue his provider can address. Offer to be present at his next appointment to advocate for him and ensure the conversation is supportive, not punitive. Flag the situation to the care team as urgent same-day, noting the medication non-adherence, borrowed nebulizer, and uncontrolled blood sugar.",
        esText: "Reconocer su confianza al contarte — eso tomó valor. Explicar que como su CHW, eres parte de su equipo de atención y ocultar esta información podría poner su salud en riesgo serio, especialmente con niveles de azúcar por encima de 300. Preguntarle qué específicamente de los medicamentos lo hace sentir peor — los efectos secundarios son un problema clínico que su proveedor puede abordar. Ofrecer estar presente en su próxima cita para abogar por él y asegurar que la conversación sea de apoyo, no punitiva. Señalar la situación al equipo de atención como urgente el mismo día, notando la no-adherencia a medicamentos, nebulizador prestado, y azúcar en sangre descontrolada.",
        score: 4,
        behaviorTag: "patient-advocate-clinically-aware",
      },
      {
        id: "rs_chw_e3_b",
        text: "Reassure the patient that you'll help him talk to his doctor in a way that won't feel like getting in trouble. Call the clinic to schedule an urgent appointment and give the care team a heads-up about the medication issues.",
        esText: "Asegurar al paciente que le ayudarás a hablar con su doctor de una manera que no se sienta como estar en problemas. Llamar a la clínica para programar una cita urgente y avisar al equipo de atención sobre los problemas con los medicamentos.",
        score: 3,
        behaviorTag: "bridge-builder",
      },
      {
        id: "rs_chw_e3_c",
        text: "Promise not to tell his doctor for now, but strongly encourage him to restart his medications and throw away the neighbor's nebulizer. Plan to check in again next week to see if things improve.",
        esText: "Prometer no decirle a su doctor por ahora, pero animarlo fuertemente a reiniciar sus medicamentos y desechar el nebulizador del vecino. Planear volver a visitarlo la próxima semana para ver si las cosas mejoran.",
        score: 2,
        behaviorTag: "colludes-with-patient",
      },
      {
        id: "rs_chw_e3_d",
        text: "Tell the patient that medication decisions are between him and his doctor, and that you're not qualified to advise on clinical matters. Document the visit and move on.",
        esText: "Decirle al paciente que las decisiones sobre medicamentos son entre él y su doctor, y que no estás calificado/a para aconsejar sobre asuntos clínicos. Documentar la visita y seguir adelante.",
        score: 1,
        behaviorTag: "scope-hiding",
      },
    ],
  },

  // CHW - Growth 2
  {
    id: "rs_chw_growth_2",
    roleId: "chw",
    domain: "growth",
    scenario:
      "Your FQHC is launching a new Whole Person Care pilot that integrates behavioral health screening into every CHW home visit. You'll need to learn PHQ-9 and GAD-7 screening tools, document results in a new EHR module, and warm-handoff patients who screen positive to the behavioral health team. Several veteran CHWs are pushing back, saying, 'We're not therapists — this isn't our job.' Your supervisor asks you to help champion the initiative.",
    esScenario:
      "Tu FQHC está lanzando un nuevo piloto de Atención Integral que integra evaluaciones de salud conductual en cada visita domiciliaria de CHW. Necesitarás aprender las herramientas de evaluación PHQ-9 y GAD-7, documentar resultados en un nuevo módulo del EHR, y hacer transferencias cálidas de pacientes que resulten positivos al equipo de salud conductual. Varios CHWs veteranos están resistiéndose, diciendo, 'No somos terapeutas — esto no es nuestro trabajo.' Tu supervisor te pide que ayudes a promover la iniciativa.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo enfocas esto?",
    options: [
      {
        id: "rs_chw_g2_a",
        text: "Embrace the opportunity as a way to expand your professional scope and improve patient outcomes. Volunteer to be in the first training cohort and offer to create a simple one-page reference guide for colleagues. When talking to resistant CHWs, validate their concern — screening isn't therapy — and reframe it: 'We already ask about housing, food, and safety. Mental health is just another SDOH barrier we can help identify. We're not treating — we're connecting.' Share data on how many CHW patients have undiagnosed depression or anxiety to make it tangible.",
        esText: "Abrazar la oportunidad como una forma de expandir tu alcance profesional y mejorar los resultados de los pacientes. Ofrecerte voluntario/a para ser del primer grupo de capacitación y crear una guía de referencia de una página para colegas. Al hablar con CHWs resistentes, validar su preocupación — la evaluación no es terapia — y reenmarcarlo: 'Ya preguntamos sobre vivienda, comida y seguridad. La salud mental es solo otra barrera SDOH que podemos ayudar a identificar. No estamos tratando — estamos conectando.' Compartir datos sobre cuántos pacientes CHW tienen depresión o ansiedad no diagnosticada para hacerlo tangible.",
        score: 4,
        behaviorTag: "scope-champion",
      },
      {
        id: "rs_chw_g2_b",
        text: "Agree to learn the new screening tools and go through the training. Wait and see how the pilot goes before actively promoting it to colleagues.",
        esText: "Aceptar aprender las nuevas herramientas de evaluación e ir a la capacitación. Esperar a ver cómo va el piloto antes de promoverlo activamente a colegas.",
        score: 3,
        behaviorTag: "willing-follower",
      },
      {
        id: "rs_chw_g2_c",
        text: "Express concern to your supervisor that the veteran CHWs have a point — adding behavioral health screening might compromise the trust-based relationships CHWs have built. Suggest the behavioral health team handle the screenings instead.",
        esText: "Expresar preocupación a tu supervisor de que los CHWs veteranos tienen un punto — agregar evaluaciones de salud conductual podría comprometer las relaciones basadas en confianza que los CHWs han construido. Sugerir que el equipo de salud conductual maneje las evaluaciones.",
        score: 2,
        behaviorTag: "scope-protector",
      },
      {
        id: "rs_chw_g2_d",
        text: "Join the resistant CHWs in pushing back. This feels like management adding more work without more pay, and you didn't sign up to do mental health assessments.",
        esText: "Unirte a los CHWs resistentes en su oposición. Esto se siente como que la gerencia agrega más trabajo sin más pago, y tú no te inscribiste para hacer evaluaciones de salud mental.",
        score: 1,
        behaviorTag: "change-blocker",
      },
    ],
  },

  // CHW - Growth 3
  {
    id: "rs_chw_growth_3",
    roleId: "chw",
    domain: "growth",
    scenario:
      "You've been a CHW for 4 years and feel stuck in your career. Your supervisor suggests you pursue the California CHW certification (once it becomes available) and consider a pathway toward becoming a Care Coordinator or Health Education Specialist. But the certification requires coursework outside of work hours, and you're a single parent. A colleague tells you, 'Don't bother — certification won't change your pay, and they'll just give you more work.'",
    esScenario:
      "Has sido CHW por 4 años y te sientes estancado/a en tu carrera. Tu supervisor sugiere que busques la certificación de CHW de California (cuando esté disponible) y consideres un camino hacia convertirte en Coordinador de Cuidado o Especialista en Educación de Salud. Pero la certificación requiere cursos fuera del horario laboral, y eres padre/madre soltero/a. Un colega te dice, 'No te molestes — la certificación no cambiará tu pago, y solo te darán más trabajo.'",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_chw_g3_a",
        text: "Research the certification requirements and career pathway options thoroughly. Talk to your supervisor about whether the FQHC can support the coursework — tuition assistance, flexible scheduling, or counting some training hours as professional development time. Look into HRSA workforce development grants that might cover costs. Acknowledge the colleague's frustration but set your own career goals: 'I want to move into care coordination within two years, and the certification is a stepping stone. Even if pay doesn't change immediately, it opens doors.'",
        esText: "Investigar los requisitos de certificación y opciones de trayectoria profesional a fondo. Hablar con tu supervisor sobre si el FQHC puede apoyar los cursos — asistencia de matrícula, horario flexible, o contar algunas horas de capacitación como desarrollo profesional. Buscar subvenciones de desarrollo de fuerza laboral de HRSA que podrían cubrir costos. Reconocer la frustración del colega pero establecer tus propias metas profesionales: 'Quiero pasar a coordinación de cuidado dentro de dos años, y la certificación es un paso. Aunque el pago no cambie inmediatamente, abre puertas.'",
        score: 4,
        behaviorTag: "strategic-career-planner",
      },
      {
        id: "rs_chw_g3_b",
        text: "Express interest to your supervisor and ask them to let you know when the certification becomes available. Start looking into care coordinator job postings to understand what qualifications you'd need.",
        esText: "Expresar interés a tu supervisor y pedirle que te avise cuando la certificación esté disponible. Comenzar a ver publicaciones de trabajo de coordinador de cuidado para entender qué calificaciones necesitarías.",
        score: 3,
        behaviorTag: "interested-but-passive",
      },
      {
        id: "rs_chw_g3_c",
        text: "Appreciate the suggestion but explain that with your family responsibilities, it's just not realistic right now. Maybe in a few years when your kids are older.",
        esText: "Agradecer la sugerencia pero explicar que con tus responsabilidades familiares, simplemente no es realista ahora mismo. Quizás en unos años cuando tus hijos sean mayores.",
        score: 2,
        behaviorTag: "defers-growth",
      },
      {
        id: "rs_chw_g3_d",
        text: "Agree with your colleague — certifications are just a way for organizations to add requirements without increasing pay. You'd rather focus on doing your current job well than chase credentials.",
        esText: "Estar de acuerdo con tu colega — las certificaciones son solo una forma de que las organizaciones agreguen requisitos sin aumentar el pago. Preferirías enfocarte en hacer bien tu trabajo actual que perseguir credenciales.",
        score: 1,
        behaviorTag: "growth-resistant",
      },
    ],
  },

  // CHW - Transition 2
  {
    id: "rs_chw_transition_2",
    roleId: "chw",
    domain: "transition",
    scenario:
      "You've accepted a CHW position at a large multi-site FQHC after 3 years at a small community clinic where you knew everyone. The new organization uses OCHIN Epic (you've never used Epic), assigns CHWs to specific care teams rather than geographic areas, and has formal protocols for every type of outreach encounter. On your first day, you overhear two CHWs complaining that the organization 'treats us like data entry clerks, not community workers.' Your assigned care team includes a nurse practitioner who seems skeptical about CHWs in general.",
    esScenario:
      "Aceptaste un puesto de CHW en un FQHC grande con múltiples sitios después de 3 años en una clínica comunitaria pequeña donde conocías a todos. La nueva organización usa OCHIN Epic (nunca has usado Epic), asigna CHWs a equipos de atención específicos en lugar de áreas geográficas, y tiene protocolos formales para cada tipo de encuentro de alcance. En tu primer día, escuchas a dos CHWs quejándose de que la organización 'nos trata como empleados de entrada de datos, no como trabajadores comunitarios.' Tu equipo de atención asignado incluye una enfermera practicante que parece escéptica sobre los CHWs en general.",
    question: "How do you navigate your first month?",
    esQuestion: "¿Cómo navegas tu primer mes?",
    options: [
      {
        id: "rs_chw_t2_a",
        text: "Take a three-pronged approach: (1) Master the systems — request dedicated Epic training, create a workflow cheat sheet for the outreach documentation protocols, and ask for the name of the best Epic power-user CHW to shadow. (2) Build the relationship with the skeptical NP — schedule a 15-minute meeting to understand her care team's biggest pain points and what she wishes a CHW could help with, rather than waiting for her to define your role. (3) Stay neutral on the 'data entry' complaints — listen to veteran CHWs' frustrations to learn the organizational culture, but don't adopt their negativity before you've formed your own experience.",
        esText: "Tomar un enfoque de tres frentes: (1) Dominar los sistemas — solicitar capacitación dedicada de Epic, crear una hoja de referencia para los protocolos de documentación de alcance, y pedir el nombre del mejor CHW usuario avanzado de Epic para observar. (2) Construir la relación con la NP escéptica — programar una reunión de 15 minutos para entender los mayores puntos de dolor de su equipo de atención y qué desearía que un CHW pudiera ayudar, en lugar de esperar a que ella defina tu rol. (3) Mantenerte neutral sobre las quejas de 'entrada de datos' — escuchar las frustraciones de los CHWs veteranos para aprender la cultura organizacional, pero no adoptar su negatividad antes de que hayas formado tu propia experiencia.",
        score: 4,
        behaviorTag: "strategic-onboarder",
      },
      {
        id: "rs_chw_t2_b",
        text: "Focus on learning Epic and the documentation protocols as fast as possible so you can start seeing patients. Be friendly to the care team and prove your value through your work rather than conversations.",
        esText: "Enfocarte en aprender Epic y los protocolos de documentación lo más rápido posible para poder empezar a ver pacientes. Ser amigable con el equipo de atención y demostrar tu valor a través de tu trabajo en lugar de conversaciones.",
        score: 3,
        behaviorTag: "heads-down-worker",
      },
      {
        id: "rs_chw_t2_c",
        text: "Bond with the other CHWs over shared frustrations about the organization. They can teach you the shortcuts and workarounds they've developed. Try to stay under the NP's radar until you've gotten the hang of things.",
        esText: "Crear lazos con los otros CHWs sobre las frustraciones compartidas sobre la organización. Ellos pueden enseñarte los atajos y soluciones alternativas que han desarrollado. Tratar de mantener perfil bajo con la NP hasta que hayas dominado las cosas.",
        score: 2,
        behaviorTag: "clique-joiner",
      },
      {
        id: "rs_chw_t2_d",
        text: "Keep doing outreach the way you did at your old clinic — community-based, relationship-driven — and fill in the Epic documentation when you have time. The protocols seem bureaucratic and you know what works from experience.",
        esText: "Seguir haciendo alcance como lo hacías en tu clínica anterior — basado en la comunidad, orientado a las relaciones — y llenar la documentación de Epic cuando tengas tiempo. Los protocolos parecen burocráticos y sabes lo que funciona por experiencia.",
        score: 1,
        behaviorTag: "resists-new-systems",
      },
    ],
  },

  // CHW - Transition 3
  {
    id: "rs_chw_transition_3",
    roleId: "chw",
    domain: "transition",
    scenario:
      "You're starting at an FQHC that recently merged with another community clinic. Staff from both organizations are still adjusting, and there's tension — the 'original' staff feel protective of their processes, while the merged staff feel like second-class employees. You've been assigned a patient panel that includes patients from both legacy organizations, and some patients are confused about who their CHW is now. Your supervisor from the merged clinic was laid off during the transition, and your new supervisor seems overwhelmed.",
    esScenario:
      "Estás empezando en un FQHC que recientemente se fusionó con otra clínica comunitaria. El personal de ambas organizaciones aún se está ajustando, y hay tensión — el personal 'original' se siente protector de sus procesos, mientras que el personal fusionado se siente como empleados de segunda clase. Te asignaron un panel de pacientes que incluye pacientes de ambas organizaciones anteriores, y algunos pacientes están confundidos sobre quién es su CHW ahora. Tu supervisor de la clínica fusionada fue despedido/a durante la transición, y tu nuevo supervisor parece abrumado/a.",
    question: "How do you approach your first few weeks?",
    esQuestion: "¿Cómo enfocas tus primeras semanas?",
    options: [
      {
        id: "rs_chw_t3_a",
        text: "Focus on what you can control: your patients. Reach out to every patient on your panel with a personal introduction — acknowledge the merger confusion, let them know you're their dedicated CHW now, and ask what's been working well and what they need. For the organizational tension, stay professionally neutral — build relationships with staff from both legacy orgs by asking them what works best in their workflows rather than picking sides. Schedule a meeting with your new supervisor, even if brief, to clarify your role, reporting expectations, and which documentation system to use. Volunteer to help create a unified patient communication template that both legacy teams can adopt.",
        esText: "Enfocarte en lo que puedes controlar: tus pacientes. Contactar a cada paciente en tu panel con una presentación personal — reconocer la confusión de la fusión, hacerles saber que eres su CHW dedicado/a ahora, y preguntar qué ha estado funcionando bien y qué necesitan. Para la tensión organizacional, mantenerte profesionalmente neutral — construir relaciones con personal de ambas organizaciones anteriores preguntándoles qué funciona mejor en sus flujos de trabajo en lugar de tomar bandos. Programar una reunión con tu nuevo supervisor, aunque sea breve, para clarificar tu rol, expectativas de reportes, y qué sistema de documentación usar. Ofrecerte a ayudar a crear una plantilla unificada de comunicación con pacientes que ambos equipos puedan adoptar.",
        score: 4,
        behaviorTag: "merger-navigator",
      },
      {
        id: "rs_chw_t3_b",
        text: "Focus on learning the primary organization's systems and protocols, since that's the surviving entity. Introduce yourself to patients and start outreach using the established workflows.",
        esText: "Enfocarte en aprender los sistemas y protocolos de la organización principal, ya que es la entidad que sobrevive. Presentarte a los pacientes y comenzar el alcance usando los flujos de trabajo establecidos.",
        score: 3,
        behaviorTag: "adapts-to-dominant",
      },
      {
        id: "rs_chw_t3_c",
        text: "Wait for the organizational dust to settle before making any big moves. Focus on administrative tasks like getting your systems access set up while leadership sorts out the merger issues.",
        esText: "Esperar a que el polvo organizacional se asiente antes de hacer grandes movimientos. Enfocarte en tareas administrativas como configurar tu acceso a los sistemas mientras el liderazgo resuelve los problemas de la fusión.",
        score: 2,
        behaviorTag: "waits-for-clarity",
      },
      {
        id: "rs_chw_t3_d",
        text: "Express frustration to whoever will listen that the merger has been poorly managed. Ally with the merged clinic staff since you understand what it's like to be the new person. Avoid the 'original' staff who seem territorial.",
        esText: "Expresar frustración a quien quiera escuchar de que la fusión ha sido mal manejada. Aliarte con el personal de la clínica fusionada ya que entiendes lo que es ser la persona nueva. Evitar al personal 'original' que parece territorial.",
        score: 1,
        behaviorTag: "faction-joiner",
      },
    ],
  },

  // ============================================================
  //  Care Coordinator — 10 new questions
  // ============================================================

  // Care Coordinator - Mission 2
  {
    id: "rs_cc_mission_2",
    roleId: "care_coordinator",
    domain: "mission",
    scenario:
      "You're reviewing your ECM panel and notice that a patient — a 45-year-old unhoused man with schizophrenia and diabetes — has been enrolled for 11 months with almost no progress on his care plan goals. He rarely answers his phone, misses appointments, and the last CHW who tried to locate him couldn't find him. Your health plan is pushing for a discharge summary showing 'meaningful engagement,' and your supervisor suggests disenrolling him to make room for patients who are 'actually participating.' You know this patient was hospitalized twice last quarter.",
    esScenario:
      "Estás revisando tu panel ECM y notas que un paciente — un hombre sin hogar de 45 años con esquizofrenia y diabetes — ha estado inscrito por 11 meses con casi ningún progreso en las metas de su plan de cuidado. Raramente contesta su teléfono, falta a las citas, y el último CHW que intentó localizarlo no pudo encontrarlo. Tu plan de salud está presionando por un resumen de alta que muestre 'participación significativa,' y tu supervisor sugiere darlo de baja para hacer espacio para pacientes que 'realmente participan.' Sabes que este paciente fue hospitalizado dos veces el último trimestre.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_cc_m2_a",
        text: "Push back thoughtfully on the disenrollment. This patient is exactly who ECM was designed for — high-acuity, hard to reach, cycling through emergency care. Present the data: two hospitalizations last quarter means the system is spending thousands on reactive care that ECM could prevent. Propose a revised engagement strategy: partner with the street medicine team or homeless outreach workers to make contact, adjust the care plan goals to meet the patient where he is (e.g., 'maintain monthly contact' instead of 'attend weekly appointments'), and document engagement attempts to satisfy the health plan's reporting requirements while keeping him enrolled.",
        esText: "Resistir reflexivamente la baja. Este paciente es exactamente para quien fue diseñado ECM — alta agudeza, difícil de localizar, entrando y saliendo de atención de emergencia. Presentar los datos: dos hospitalizaciones el último trimestre significa que el sistema está gastando miles en atención reactiva que ECM podría prevenir. Proponer una estrategia de participación revisada: asociarse con el equipo de medicina callejera o trabajadores de alcance para personas sin hogar para hacer contacto, ajustar las metas del plan de cuidado para encontrar al paciente donde está (ej. 'mantener contacto mensual' en lugar de 'asistir a citas semanales'), y documentar los intentos de participación para satisfacer los requisitos de reporte del plan de salud mientras lo mantiene inscrito.",
        score: 4,
        behaviorTag: "mission-defender",
      },
      {
        id: "rs_cc_m2_b",
        text: "Express concern about disenrolling him but follow your supervisor's guidance. Document your outreach attempts thoroughly so there's a clear record that you tried. Flag the patient to the behavioral health team in case he surfaces.",
        esText: "Expresar preocupación sobre darlo de baja pero seguir la guía de tu supervisor. Documentar tus intentos de alcance detalladamente para que haya un registro claro de que lo intentaste. Señalar al paciente al equipo de salud conductual por si aparece.",
        score: 3,
        behaviorTag: "compliant-with-concern",
      },
      {
        id: "rs_cc_m2_c",
        text: "Agree with your supervisor — the patient isn't engaging, and there are other patients on the waitlist who want services. Send a final letter to his last known address and process the disenrollment.",
        esText: "Estar de acuerdo con tu supervisor — el paciente no está participando, y hay otros pacientes en lista de espera que quieren servicios. Enviar una carta final a su última dirección conocida y procesar la baja.",
        score: 2,
        behaviorTag: "efficiency-over-equity",
      },
      {
        id: "rs_cc_m2_d",
        text: "Disenroll him without further discussion — you've been trying for almost a year and the health plan wants results. Focus your energy on patients who show up.",
        esText: "Darlo de baja sin más discusión — has estado intentando por casi un año y el plan de salud quiere resultados. Enfocar tu energía en pacientes que se presentan.",
        score: 1,
        behaviorTag: "abandons-hard-cases",
      },
    ],
  },

  // Care Coordinator - Mission 3
  {
    id: "rs_cc_mission_3",
    roleId: "care_coordinator",
    domain: "mission",
    scenario:
      "Your FQHC has signed a new managed care contract that includes financial incentives for reducing ED utilization among ECM patients. Your manager announces a new policy: care coordinators must call every patient within 24 hours of an ED visit and schedule a follow-up appointment within 72 hours, or the visit 'counts against' the team's performance metrics. You have a patient who uses the ED frequently for panic attacks — she goes because she genuinely believes she's having a heart attack each time. Simply scheduling her a follow-up appointment won't address the root cause.",
    esScenario:
      "Tu FQHC firmó un nuevo contrato de atención administrada que incluye incentivos financieros por reducir la utilización de la sala de emergencias entre pacientes ECM. Tu gerente anuncia una nueva política: los coordinadores de cuidado deben llamar a cada paciente dentro de 24 horas de una visita a la sala de emergencias y programar una cita de seguimiento dentro de 72 horas, o la visita 'cuenta en contra' de las métricas de rendimiento del equipo. Tienes una paciente que usa la sala de emergencias frecuentemente por ataques de pánico — va porque genuinamente cree que está teniendo un ataque al corazón cada vez. Simplemente programarle una cita de seguimiento no abordará la causa raíz.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_cc_m3_a",
        text: "Meet the 24-hour call requirement — that's reasonable and you should comply — but go beyond the checkbox. During the call, listen to the patient's experience and validate her fear (panic attacks feel like heart attacks). Then coordinate a targeted care plan: connect her with behavioral health for CBT or anxiety management, ask her PCP about a crisis plan she can use before going to the ED, and explore whether she has a trusted person who can help her reality-test during an episode. Share this approach with your manager as a model for reducing ED utilization through root-cause interventions, not just follow-up scheduling.",
        esText: "Cumplir con el requisito de llamada de 24 horas — eso es razonable y debes cumplir — pero ir más allá del check. Durante la llamada, escuchar la experiencia de la paciente y validar su miedo (los ataques de pánico se sienten como ataques al corazón). Luego coordinar un plan de cuidado dirigido: conectarla con salud conductual para TCC o manejo de ansiedad, preguntar a su PCP sobre un plan de crisis que pueda usar antes de ir a la sala de emergencias, y explorar si tiene una persona de confianza que pueda ayudarla a verificar la realidad durante un episodio. Compartir este enfoque con tu gerente como un modelo para reducir la utilización de la sala de emergencias a través de intervenciones de causa raíz, no solo programando seguimientos.",
        score: 4,
        behaviorTag: "root-cause-thinker",
      },
      {
        id: "rs_cc_m3_b",
        text: "Make the required 24-hour call and schedule the follow-up appointment. Also refer the patient to behavioral health and note in the care plan that ED utilization is related to panic disorder.",
        esText: "Hacer la llamada requerida de 24 horas y programar la cita de seguimiento. También referir a la paciente a salud conductual y notar en el plan de cuidado que la utilización de la sala de emergencias está relacionada con trastorno de pánico.",
        score: 3,
        behaviorTag: "compliant-plus-referral",
      },
      {
        id: "rs_cc_m3_c",
        text: "Follow the new policy exactly — make the call, schedule the appointment, document it. The metrics are what they are, and it's not your job to redesign the program.",
        esText: "Seguir la nueva política exactamente — hacer la llamada, programar la cita, documentarlo. Las métricas son lo que son, y no es tu trabajo rediseñar el programa.",
        score: 2,
        behaviorTag: "checkbox-compliant",
      },
      {
        id: "rs_cc_m3_d",
        text: "Tell the patient to stop going to the ED for panic attacks — it's hurting the team's metrics. Give her the clinic's after-hours number to call instead.",
        esText: "Decirle a la paciente que deje de ir a la sala de emergencias por ataques de pánico — está perjudicando las métricas del equipo. Darle el número de la clínica para después de horas para que llame en su lugar.",
        score: 1,
        behaviorTag: "blames-patient",
      },
    ],
  },

  // Care Coordinator - People 2
  {
    id: "rs_cc_people_2",
    roleId: "care_coordinator",
    domain: "people",
    scenario:
      "A patient's adult daughter calls you furious. Her mother — an 80-year-old diabetic on your ECM panel — was discharged from the hospital yesterday, but nobody called the daughter, the discharge medications are different from what her mother was taking before, and there's no home health referral even though the mother can barely walk. The daughter says, 'I'm going to report this clinic to the state — you people don't care about old people.' You had no idea the patient was hospitalized because the hospital didn't send a notification.",
    esScenario:
      "La hija adulta de una paciente te llama furiosa. Su madre — una diabética de 80 años en tu panel ECM — fue dada de alta del hospital ayer, pero nadie llamó a la hija, los medicamentos de alta son diferentes de los que su madre estaba tomando antes, y no hay referencia de salud en el hogar aunque la madre apenas puede caminar. La hija dice, 'Voy a reportar esta clínica al estado — a ustedes no les importan los ancianos.' No tenías idea de que la paciente fue hospitalizada porque el hospital no envió una notificación.",
    question: "How do you handle this call?",
    esQuestion: "¿Cómo manejas esta llamada?",
    options: [
      {
        id: "rs_cc_p2_a",
        text: "Let the daughter express her frustration without getting defensive — she's advocating for her mother and has every right to be upset. Acknowledge the gap: 'You're right that the communication broke down, and I'm sorry you and your mother experienced that. Here's what I'm going to do right now.' Then take immediate action: pull up the hospital discharge summary, reconcile the medications with the patient's PCP today, initiate the home health referral as an urgent request, and schedule a post-discharge visit within 48 hours. Also ask the daughter what her mother needs most right now and whether she's the primary caregiver. After the crisis is handled, work with your team to improve hospital notification workflows so this doesn't happen again.",
        esText: "Dejar que la hija exprese su frustración sin ponerte a la defensiva — ella está abogando por su madre y tiene todo el derecho de estar molesta. Reconocer la brecha: 'Tiene razón en que la comunicación falló, y lamento que usted y su madre hayan experimentado eso. Esto es lo que voy a hacer ahora mismo.' Luego tomar acción inmediata: buscar el resumen de alta del hospital, reconciliar los medicamentos con el PCP de la paciente hoy, iniciar la referencia de salud en el hogar como solicitud urgente, y programar una visita post-alta dentro de 48 horas. También preguntar a la hija qué necesita más su madre ahora y si ella es la cuidadora principal. Después de manejar la crisis, trabajar con tu equipo para mejorar los flujos de notificación hospitalaria para que esto no vuelva a suceder.",
        score: 4,
        behaviorTag: "de-escalation-expert",
      },
      {
        id: "rs_cc_p2_b",
        text: "Apologize for the situation and explain that you didn't receive a hospital notification. Take the daughter's information and promise to call back within 2 hours after you've contacted the hospital and the patient's PCP about the medication discrepancies.",
        esText: "Disculparte por la situación y explicar que no recibiste una notificación del hospital. Tomar la información de la hija y prometer llamar de vuelta dentro de 2 horas después de que hayas contactado al hospital y al PCP de la paciente sobre las discrepancias de medicamentos.",
        score: 3,
        behaviorTag: "responsive-professional",
      },
      {
        id: "rs_cc_p2_c",
        text: "Explain that it's the hospital's responsibility to coordinate discharge, not yours, and that you'll look into the situation when you get a chance. Suggest the daughter call the hospital's patient advocate directly.",
        esText: "Explicar que es responsabilidad del hospital coordinar el alta, no tuya, y que revisarás la situación cuando tengas oportunidad. Sugerir que la hija llame directamente al defensor del paciente del hospital.",
        score: 2,
        behaviorTag: "deflects-responsibility",
      },
      {
        id: "rs_cc_p2_d",
        text: "Tell the daughter that you have over 40 patients on your panel and can't be expected to know when each one goes to the hospital. Suggest she file a complaint with administration if she feels the need.",
        esText: "Decirle a la hija que tienes más de 40 pacientes en tu panel y no se puede esperar que sepas cuando cada uno va al hospital. Sugerir que presente una queja con administración si siente la necesidad.",
        score: 1,
        behaviorTag: "defensive-dismissive",
      },
    ],
  },

  // Care Coordinator - People 3
  {
    id: "rs_cc_people_3",
    roleId: "care_coordinator",
    domain: "people",
    scenario:
      "You're coordinating care for a transgender patient who recently started hormone therapy. The patient tells you that their PCP — a provider at your FQHC — keeps using their deadname and wrong pronouns despite being corrected multiple times. The patient is considering leaving the clinic entirely. You know the PCP is well-respected and has been at the FQHC for 15 years, and you've heard other staff make similar mistakes with this patient's name and pronouns.",
    esScenario:
      "Estás coordinando atención para un paciente transgénero que recientemente comenzó terapia hormonal. El paciente te dice que su PCP — un proveedor en tu FQHC — sigue usando su nombre anterior y pronombres incorrectos a pesar de haber sido corregido múltiples veces. El paciente está considerando dejar la clínica completamente. Sabes que el PCP es muy respetado y ha estado en el FQHC por 15 años, y has escuchado a otros empleados cometer errores similares con el nombre y pronombres de este paciente.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_cc_p3_a",
        text: "Take the patient's concern seriously — misgendering is a patient safety and dignity issue, not a minor inconvenience. First, validate their experience and ask what would make them feel safe continuing care here. Then take action: verify that the patient's preferred name and pronouns are correctly entered in the EHR (some systems have a specific field for this), raise the issue with your clinic manager or compliance officer as a pattern affecting patient retention, and offer to help the patient transfer to a different PCP within the FQHC if they'd prefer — without framing it as their burden. Follow up with the patient within a week to see if things have improved.",
        esText: "Tomar la preocupación del paciente en serio — usar el género incorrecto es un problema de seguridad y dignidad del paciente, no un inconveniente menor. Primero, validar su experiencia y preguntar qué lo haría sentirse seguro continuando la atención aquí. Luego tomar acción: verificar que el nombre preferido y pronombres del paciente estén correctamente ingresados en el EHR (algunos sistemas tienen un campo específico para esto), plantear el problema con tu gerente de clínica u oficial de cumplimiento como un patrón que afecta la retención de pacientes, y ofrecer ayudar al paciente a transferirse a un PCP diferente dentro del FQHC si lo prefiere — sin enmarcarlo como su carga. Dar seguimiento con el paciente dentro de una semana para ver si las cosas han mejorado.",
        score: 4,
        behaviorTag: "equity-advocate",
      },
      {
        id: "rs_cc_p3_b",
        text: "Apologize on behalf of the clinic, check that the EHR has the correct name and pronouns, and offer to help the patient switch to a different provider. Mention the situation to your supervisor.",
        esText: "Disculparte en nombre de la clínica, verificar que el EHR tenga el nombre y pronombres correctos, y ofrecer ayudar al paciente a cambiar a un proveedor diferente. Mencionar la situación a tu supervisor.",
        score: 3,
        behaviorTag: "supportive-but-indirect",
      },
      {
        id: "rs_cc_p3_c",
        text: "Sympathize with the patient but explain that the PCP is very experienced and probably doesn't mean any harm — it's just a generational thing. Encourage the patient to give the provider more time to adjust.",
        esText: "Simpatizar con el paciente pero explicar que el PCP es muy experimentado y probablemente no tiene mala intención — es solo algo generacional. Animar al paciente a darle más tiempo al proveedor para ajustarse.",
        score: 2,
        behaviorTag: "minimizes-harm",
      },
      {
        id: "rs_cc_p3_d",
        text: "Tell the patient that you can't control how providers speak, and that if they're unhappy, they're free to find another clinic. You don't want to get involved in a conflict with a senior provider.",
        esText: "Decirle al paciente que no puedes controlar cómo hablan los proveedores, y que si no está contento, es libre de buscar otra clínica. No quieres involucrarte en un conflicto con un proveedor senior.",
        score: 1,
        behaviorTag: "bystander",
      },
    ],
  },

  // Care Coordinator - Execution 2
  {
    id: "rs_cc_execution_2",
    roleId: "care_coordinator",
    domain: "execution",
    scenario:
      "You receive an ADT (Admission-Discharge-Transfer) alert that one of your high-risk ECM patients was just discharged from the hospital after a CHF (congestive heart failure) exacerbation. This is his third hospitalization in 4 months. The discharge summary lists 8 medications (3 are new), a follow-up cardiology appointment in 2 weeks, daily weight monitoring, and a low-sodium diet. The patient lives alone, has limited English, and told you last month he can't afford all his medications. The health plan's quality team has flagged this patient for a mandatory care conference next week.",
    esScenario:
      "Recibes una alerta ADT (Admisión-Alta-Transferencia) de que uno de tus pacientes ECM de alto riesgo acaba de ser dado de alta del hospital después de una exacerbación de ICC (insuficiencia cardíaca congestiva). Esta es su tercera hospitalización en 4 meses. El resumen de alta lista 8 medicamentos (3 son nuevos), una cita de seguimiento con cardiología en 2 semanas, monitoreo diario de peso, y una dieta baja en sodio. El paciente vive solo, tiene inglés limitado, y te dijo el mes pasado que no puede pagar todos sus medicamentos. El equipo de calidad del plan de salud ha marcado a este paciente para una conferencia de atención obligatoria la próxima semana.",
    question: "How do you organize the next 72 hours?",
    esQuestion: "¿Cómo organizas las próximas 72 horas?",
    options: [
      {
        id: "rs_cc_e2_a",
        text: "Activate a post-discharge protocol within 24 hours: (1) Call the patient (with interpreter services) to confirm he's home, understands his new medications, has them in hand, and knows when his cardiology appointment is. (2) Coordinate a medication reconciliation with his PCP — flag the 3 new meds and the affordability barrier — and check if any qualify for the FQHC's 340B pharmacy discount or patient assistance programs. (3) Request a CHW home visit within 48 hours for a medication check, weight scale setup, and low-sodium diet education in his language. (4) Prepare for the care conference by pulling the pattern — 3 admits in 4 months — and drafting a root-cause analysis (medication non-adherence due to cost? health literacy? social isolation?) with a revised care plan that addresses the underlying drivers, not just the clinical symptoms.",
        esText: "Activar un protocolo post-alta dentro de 24 horas: (1) Llamar al paciente (con servicios de intérprete) para confirmar que está en casa, entiende sus nuevos medicamentos, los tiene en mano, y sabe cuándo es su cita de cardiología. (2) Coordinar una reconciliación de medicamentos con su PCP — señalar los 3 nuevos medicamentos y la barrera de costo — y verificar si alguno califica para el descuento de farmacia 340B del FQHC o programas de asistencia al paciente. (3) Solicitar una visita domiciliaria de CHW dentro de 48 horas para verificación de medicamentos, instalación de báscula, y educación de dieta baja en sodio en su idioma. (4) Prepararse para la conferencia de atención reuniendo el patrón — 3 admisiones en 4 meses — y redactando un análisis de causa raíz (¿no adherencia a medicamentos por costo? ¿alfabetización en salud? ¿aislamiento social?) con un plan de cuidado revisado que aborde los impulsores subyacentes, no solo los síntomas clínicos.",
        score: 4,
        behaviorTag: "systems-coordinator",
      },
      {
        id: "rs_cc_e2_b",
        text: "Call the patient within 24 hours to check on him, confirm his medications, and schedule a PCP follow-up. Reach out to the CHW team for a home visit. Prepare basic notes for the care conference.",
        esText: "Llamar al paciente dentro de 24 horas para verificar cómo está, confirmar sus medicamentos, y programar un seguimiento con PCP. Contactar al equipo de CHW para una visita domiciliaria. Preparar notas básicas para la conferencia de atención.",
        score: 3,
        behaviorTag: "competent-follow-through",
      },
      {
        id: "rs_cc_e2_c",
        text: "Schedule the PCP follow-up and cardiology appointment confirmation. Plan to deal with the medication cost issue and the care conference when they come up.",
        esText: "Programar el seguimiento de PCP y la confirmación de la cita de cardiología. Planear lidiar con el problema de costo de medicamentos y la conferencia de atención cuando surjan.",
        score: 2,
        behaviorTag: "reactive-scheduler",
      },
      {
        id: "rs_cc_e2_d",
        text: "Forward the discharge summary to the patient's PCP and wait for the care conference to discuss next steps with the team. You have too many other patients to deal with this one immediately.",
        esText: "Reenviar el resumen de alta al PCP del paciente y esperar la conferencia de atención para discutir los próximos pasos con el equipo. Tienes demasiados otros pacientes para lidiar con este inmediatamente.",
        score: 1,
        behaviorTag: "defers-urgency",
      },
    ],
  },

  // Care Coordinator - Execution 3
  {
    id: "rs_cc_execution_3",
    roleId: "care_coordinator",
    domain: "execution",
    scenario:
      "Your FQHC's managed care plan just announced that ECM billing now requires a new standardized care plan template with 6 required sections, and all existing care plans must be migrated to the new format within 30 days. You have 38 active ECM patients. At the same time, the state released new CalAIM Community Supports authorization requirements that change how you document housing and food referrals. Your team of 4 care coordinators is already stretched thin, and morale is low after a recent layoff of support staff.",
    esScenario:
      "El plan de atención administrada de tu FQHC acaba de anunciar que la facturación de ECM ahora requiere una nueva plantilla estandarizada de plan de cuidado con 6 secciones requeridas, y todos los planes de cuidado existentes deben migrarse al nuevo formato dentro de 30 días. Tienes 38 pacientes ECM activos. Al mismo tiempo, el estado publicó nuevos requisitos de autorización de Community Supports de CalAIM que cambian cómo documentas las referencias de vivienda y alimentos. Tu equipo de 4 coordinadores de cuidado ya está al límite, y la moral está baja después de un despido reciente de personal de apoyo.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo enfocas esto?",
    options: [
      {
        id: "rs_cc_e3_a",
        text: "Don't panic — break it into manageable pieces. First, read both new requirements carefully and identify what actually changed versus what's just reformatted. Create a crosswalk document showing where your current care plan data maps to the new template's 6 sections. Then propose a team strategy: divide the 38 migrations among the 4 coordinators (roughly 10 each), create a shared checklist, and set weekly milestones (10/week = done in 4 weeks with buffer). For the Community Supports changes, volunteer to create a one-page reference guide for the team. Bring the plan to your supervisor with a realistic timeline and flag if you need temporary admin support to hit the 30-day deadline without sacrificing patient care.",
        esText: "No entrar en pánico — dividirlo en piezas manejables. Primero, leer ambos nuevos requisitos cuidadosamente e identificar qué realmente cambió versus qué es solo reformateo. Crear un documento de referencia cruzada mostrando dónde los datos de tu plan de cuidado actual se mapean a las 6 secciones de la nueva plantilla. Luego proponer una estrategia de equipo: dividir las 38 migraciones entre los 4 coordinadores (aproximadamente 10 cada uno), crear una lista de verificación compartida, y establecer hitos semanales (10/semana = terminado en 4 semanas con margen). Para los cambios de Community Supports, ofrecerte a crear una guía de referencia de una página para el equipo. Llevar el plan a tu supervisor con un cronograma realista y señalar si necesitas apoyo administrativo temporal para cumplir el plazo de 30 días sin sacrificar la atención al paciente.",
        score: 4,
        behaviorTag: "change-implementer",
      },
      {
        id: "rs_cc_e3_b",
        text: "Start migrating your own patients' care plans right away, focusing on the highest-acuity patients first. Keep up with the Community Supports changes as you go and share tips with colleagues.",
        esText: "Comenzar a migrar los planes de cuidado de tus propios pacientes de inmediato, enfocándote primero en los pacientes de mayor agudeza. Mantenerte al día con los cambios de Community Supports sobre la marcha y compartir consejos con colegas.",
        score: 3,
        behaviorTag: "individual-doer",
      },
      {
        id: "rs_cc_e3_c",
        text: "Tell your supervisor that the 30-day deadline is unrealistic given the recent layoffs and ask for an extension. Wait for guidance on how the team should handle the migration before starting.",
        esText: "Decirle a tu supervisor que el plazo de 30 días es poco realista dado los despidos recientes y pedir una extensión. Esperar instrucciones sobre cómo el equipo debe manejar la migración antes de comenzar.",
        score: 2,
        behaviorTag: "waits-for-extension",
      },
      {
        id: "rs_cc_e3_d",
        text: "Focus on your regular patient care and deal with the care plan migration when you have downtime. These administrative requirements change constantly and often get modified or delayed anyway.",
        esText: "Enfocarte en tu atención regular a pacientes y lidiar con la migración de planes de cuidado cuando tengas tiempo libre. Estos requisitos administrativos cambian constantemente y a menudo se modifican o retrasan de todos modos.",
        score: 1,
        behaviorTag: "ignores-compliance",
      },
    ],
  },

  // Care Coordinator - Growth 2
  {
    id: "rs_cc_growth_2",
    roleId: "care_coordinator",
    domain: "growth",
    scenario:
      "Your FQHC just received a HRSA grant to launch a new maternal health ECM program targeting high-risk pregnancies in underserved communities. Your supervisor asks if you'd be interested in leading the program — it would mean learning obstetric care coordination, perinatal mood disorders, and WIC/Medi-Cal prenatal coverage, which are outside your current expertise in chronic disease management. The role comes with a small pay increase but significantly more responsibility, and you'd need to complete a perinatal care coordination certificate within 6 months.",
    esScenario:
      "Tu FQHC acaba de recibir una subvención de HRSA para lanzar un nuevo programa ECM de salud materna dirigido a embarazos de alto riesgo en comunidades desatendidas. Tu supervisor te pregunta si estarías interesado/a en liderar el programa — significaría aprender coordinación de atención obstétrica, trastornos perinatales del estado de ánimo, y cobertura prenatal de WIC/Medi-Cal, que están fuera de tu experiencia actual en manejo de enfermedades crónicas. El rol viene con un pequeño aumento de sueldo pero significativamente más responsabilidad, y necesitarías completar un certificado de coordinación de atención perinatal dentro de 6 meses.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_cc_g2_a",
        text: "Express strong interest but approach it strategically. Ask for a week to research the perinatal certificate program, understand the grant deliverables and timeline, and assess what support you'd need (mentorship from an OB provider, protected learning time, etc.). Come back with a proposal: 'I'm excited about this and here's how I'd ramp up — I'd like to shadow the OB team for two weeks, enroll in the certificate by next month, and build the program structure using the chronic disease ECM model I already know. Can we agree on 90-day milestones?' This shows initiative while being realistic about the learning curve.",
        esText: "Expresar fuerte interés pero enfocarlo estratégicamente. Pedir una semana para investigar el programa de certificado perinatal, entender los entregables y cronograma de la subvención, y evaluar qué apoyo necesitarías (mentoría de un proveedor de obstetricia, tiempo protegido de aprendizaje, etc.). Regresar con una propuesta: 'Estoy emocionado/a por esto y así es como me prepararía — me gustaría observar al equipo de obstetricia por dos semanas, inscribirme en el certificado el próximo mes, y construir la estructura del programa usando el modelo ECM de enfermedades crónicas que ya conozco. ¿Podemos acordar hitos a 90 días?' Esto muestra iniciativa siendo realista sobre la curva de aprendizaje.",
        score: 4,
        behaviorTag: "strategic-growth-seeker",
      },
      {
        id: "rs_cc_g2_b",
        text: "Accept the opportunity enthusiastically and start researching perinatal care coordination right away. You'll figure out the details as you go — learning on the job is how you've grown in every role.",
        esText: "Aceptar la oportunidad con entusiasmo y comenzar a investigar la coordinación de atención perinatal de inmediato. Resolverás los detalles sobre la marcha — aprender en el trabajo es como has crecido en cada rol.",
        score: 3,
        behaviorTag: "eager-but-unplanned",
      },
      {
        id: "rs_cc_g2_c",
        text: "Decline politely — you've built strong expertise in chronic disease management and don't want to start over in a completely new clinical area. Suggest they hire someone with maternal health experience.",
        esText: "Declinar educadamente — has construido fuerte experiencia en manejo de enfermedades crónicas y no quieres empezar de cero en un área clínica completamente nueva. Sugerir que contraten a alguien con experiencia en salud materna.",
        score: 2,
        behaviorTag: "comfort-zone-protector",
      },
      {
        id: "rs_cc_g2_d",
        text: "Say you'll think about it but privately decide it's too much work. The certificate requirement feels like the FQHC is asking you to do more without adequate compensation, and you'd rather stay in your current role.",
        esText: "Decir que lo pensarás pero privadamente decidir que es demasiado trabajo. El requisito del certificado se siente como que el FQHC te está pidiendo hacer más sin compensación adecuada, y preferirías quedarte en tu rol actual.",
        score: 1,
        behaviorTag: "avoids-stretch",
      },
    ],
  },

  // Care Coordinator - Growth 3
  {
    id: "rs_cc_growth_3",
    roleId: "care_coordinator",
    domain: "growth",
    scenario:
      "During a case review meeting, the clinical director points out that your care plans tend to focus heavily on medical appointments and medication compliance but rarely address social determinants like food insecurity, transportation, or housing instability — even though many of your patients face these barriers. She suggests you attend a training on SDOH-integrated care coordination. You feel stung because you've been getting positive performance reviews and thought you were doing a good job.",
    esScenario:
      "Durante una reunión de revisión de casos, la directora clínica señala que tus planes de cuidado tienden a enfocarse mucho en citas médicas y cumplimiento de medicamentos pero rara vez abordan determinantes sociales como inseguridad alimentaria, transporte, o inestabilidad de vivienda — aunque muchos de tus pacientes enfrentan estas barreras. Ella sugiere que asistas a una capacitación sobre coordinación de cuidado integrada con SDOH. Te sientes herido/a porque has estado recibiendo evaluaciones de rendimiento positivas y pensabas que estabas haciendo un buen trabajo.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_cc_g3_a",
        text: "Set aside the initial sting and recognize this as a specific, actionable growth opportunity — not a criticism of your overall performance. Thank the clinical director for the feedback and ask for examples of what SDOH-integrated care plans look like in practice. Sign up for the training and, in the meantime, audit 5 of your current care plans to honestly assess whether you're screening for and documenting social determinants. Ask a colleague whose care plans are strong in this area if you can review one together. View this as building a skill that will make you more competitive for senior care coordinator or supervisor roles down the line.",
        esText: "Dejar de lado la molestia inicial y reconocer esto como una oportunidad de crecimiento específica y accionable — no una crítica de tu rendimiento general. Agradecer a la directora clínica por la retroalimentación y pedir ejemplos de cómo se ven los planes de cuidado integrados con SDOH en la práctica. Inscribirte en la capacitación y, mientras tanto, auditar 5 de tus planes de cuidado actuales para evaluar honestamente si estás evaluando y documentando determinantes sociales. Pedir a un colega cuyos planes de cuidado son fuertes en esta área si puedes revisar uno juntos. Ver esto como construir una habilidad que te hará más competitivo/a para roles de coordinador de cuidado senior o supervisor en el futuro.",
        score: 4,
        behaviorTag: "feedback-integrator",
      },
      {
        id: "rs_cc_g3_b",
        text: "Agree to attend the training and make a mental note to include more SDOH documentation in future care plans. You're not sure the criticism was fair, but the training might be useful.",
        esText: "Aceptar asistir a la capacitación y tomar nota mental de incluir más documentación de SDOH en futuros planes de cuidado. No estás seguro/a de que la crítica fue justa, pero la capacitación podría ser útil.",
        score: 3,
        behaviorTag: "reluctant-acceptor",
      },
      {
        id: "rs_cc_g3_c",
        text: "Defend your approach — your patients' medical outcomes have improved, and you document what's clinically relevant. Social needs should be handled by CHWs and social workers, not care coordinators.",
        esText: "Defender tu enfoque — los resultados médicos de tus pacientes han mejorado, y documentas lo que es clínicamente relevante. Las necesidades sociales deben ser manejadas por CHWs y trabajadores sociales, no coordinadores de cuidado.",
        score: 2,
        behaviorTag: "defensive",
      },
      {
        id: "rs_cc_g3_d",
        text: "Feel demoralized and lose motivation. Start questioning whether this job is worth the constant pressure to do more. Don't attend the training — if they wanted SDOH expertise they should have hired someone with a social work background.",
        esText: "Sentirte desmoralizado/a y perder motivación. Empezar a cuestionar si este trabajo vale la constante presión de hacer más. No asistir a la capacitación — si querían experiencia en SDOH deberían haber contratado a alguien con formación en trabajo social.",
        score: 1,
        behaviorTag: "shuts-down",
      },
    ],
  },

  // Care Coordinator - Transition 2
  {
    id: "rs_cc_transition_2",
    roleId: "care_coordinator",
    domain: "transition",
    scenario:
      "You've just been hired as a Care Coordinator at an FQHC that recently transitioned from fee-for-service to a managed care capitation model. The ECM program is 6 months old, and you're the second care coordinator hired — the first one set up the initial workflows but just went on maternity leave with limited documentation. The managed care plan requires monthly care plan updates, quarterly outcomes reports, and real-time ADT alert responses. Your supervisor has clinical expertise but admits she's never managed an ECM program before. There are 60 patients enrolled across both coordinator panels.",
    esScenario:
      "Acabas de ser contratado/a como Coordinador/a de Cuidado en un FQHC que recientemente transitó de pago por servicio a un modelo de capitación de atención administrada. El programa ECM tiene 6 meses, y eres el/la segundo/a coordinador/a contratado/a — el/la primero/a estableció los flujos de trabajo iniciales pero acaba de salir de licencia de maternidad con documentación limitada. El plan de atención administrada requiere actualizaciones mensuales de planes de cuidado, reportes trimestrales de resultados, y respuestas en tiempo real a alertas ADT. Tu supervisora tiene experiencia clínica pero admite que nunca ha gestionado un programa ECM. Hay 60 pacientes inscritos en los dos paneles de coordinadores.",
    question: "How do you approach your first month?",
    esQuestion: "¿Cómo enfocas tu primer mes?",
    options: [
      {
        id: "rs_cc_t2_a",
        text: "Recognize that you're essentially co-building the program, not just filling a role. First week: audit the existing documentation — what workflows exist, what reporting templates are in place, what's the current compliance status with the managed care plan? Second week: reach out to the health plan's ECM program manager directly to understand their expectations, reporting deadlines, and what common pitfalls new programs face. Third week: take ownership of your 30-patient panel by triaging patients by acuity and compliance risk, and create a shared operations manual so the program doesn't depend on one person's knowledge. Throughout: have honest conversations with your supervisor about what decisions she wants to approve versus what you can own, and propose a weekly 30-minute check-in to align on program priorities.",
        esText: "Reconocer que esencialmente estás co-construyendo el programa, no solo llenando un puesto. Primera semana: auditar la documentación existente — qué flujos de trabajo existen, qué plantillas de reportes están en su lugar, cuál es el estado actual de cumplimiento con el plan de atención administrada. Segunda semana: contactar directamente al gerente del programa ECM del plan de salud para entender sus expectativas, plazos de reportes, y qué errores comunes enfrentan los programas nuevos. Tercera semana: tomar control de tu panel de 30 pacientes clasificando por agudeza y riesgo de cumplimiento, y crear un manual de operaciones compartido para que el programa no dependa del conocimiento de una persona. Durante todo: tener conversaciones honestas con tu supervisora sobre qué decisiones quiere aprobar versus qué puedes manejar tú, y proponer un check-in semanal de 30 minutos para alinear prioridades del programa.",
        score: 4,
        behaviorTag: "program-builder",
      },
      {
        id: "rs_cc_t2_b",
        text: "Focus on learning the existing workflows and start managing your patient panel. Ask your supervisor to connect you with the first coordinator so you can get a phone briefing on how things work. Handle compliance requirements as they come due.",
        esText: "Enfocarte en aprender los flujos de trabajo existentes y comenzar a gestionar tu panel de pacientes. Pedir a tu supervisora que te conecte con el/la primer/a coordinador/a para que puedas recibir una orientación telefónica sobre cómo funcionan las cosas. Manejar los requisitos de cumplimiento conforme venzan.",
        score: 3,
        behaviorTag: "follows-existing-path",
      },
      {
        id: "rs_cc_t2_c",
        text: "Tell your supervisor you'll need at least 2-3 weeks of onboarding before you can start seeing patients. Request training materials, compliance manuals, and access to the managed care plan's provider portal before taking on the panel.",
        esText: "Decirle a tu supervisora que necesitarás al menos 2-3 semanas de incorporación antes de poder empezar a ver pacientes. Solicitar materiales de capacitación, manuales de cumplimiento, y acceso al portal de proveedores del plan de atención administrada antes de asumir el panel.",
        score: 2,
        behaviorTag: "waits-for-preparation",
      },
      {
        id: "rs_cc_t2_d",
        text: "Feel overwhelmed by the lack of structure and wonder if you made a mistake taking this job. Wait for the first coordinator to come back from leave so she can properly train you before you take on responsibilities.",
        esText: "Sentirte abrumado/a por la falta de estructura y preguntarte si cometiste un error al tomar este trabajo. Esperar a que la primera coordinadora regrese de licencia para que pueda capacitarte adecuadamente antes de asumir responsabilidades.",
        score: 1,
        behaviorTag: "paralyzed-by-ambiguity",
      },
    ],
  },

  // Care Coordinator - Transition 3
  {
    id: "rs_cc_transition_3",
    roleId: "care_coordinator",
    domain: "transition",
    scenario:
      "You're transitioning from a hospital-based care coordination role to an FQHC ECM position. The FQHC is smaller, uses a different EHR, and operates on a completely different model — in the hospital you coordinated discharges for 5-7 day stays, but here you'll manage ongoing longitudinal relationships with patients for months or years. During your first week, you notice the FQHC team is less structured — there are no daily huddles, no standard handoff protocols, and communication happens mostly through informal hallway conversations. A colleague tells you, 'We don't do things by the book here — we just know our patients.'",
    esScenario:
      "Estás transicionando de un rol de coordinación de cuidado en hospital a una posición ECM en un FQHC. El FQHC es más pequeño, usa un EHR diferente, y opera con un modelo completamente diferente — en el hospital coordinabas altas para estancias de 5-7 días, pero aquí manejarás relaciones longitudinales continuas con pacientes por meses o años. Durante tu primera semana, notas que el equipo del FQHC es menos estructurado — no hay reuniones diarias, no hay protocolos estándar de transferencia, y la comunicación ocurre mayormente a través de conversaciones informales en el pasillo. Un colega te dice, 'Aquí no hacemos las cosas según el libro — simplemente conocemos a nuestros pacientes.'",
    question: "How do you adjust?",
    esQuestion: "¿Cómo te ajustas?",
    options: [
      {
        id: "rs_cc_t3_a",
        text: "Respect the culture while identifying where your hospital experience can add value without being pushy. Spend the first two weeks learning the informal communication patterns — who talks to whom, when decisions get made, what the unwritten rules are. Adapt your coordination style from episodic (discharge-focused) to longitudinal (relationship-focused), which means investing time in understanding each patient's full story, not just their clinical needs. After you've built credibility, gently introduce small structural improvements: 'At my previous role, we found a 10-minute morning huddle really helped with handoffs — would the team be open to trying it for a few weeks?' Frame everything as a suggestion, not a correction.",
        esText: "Respetar la cultura mientras identificas dónde tu experiencia hospitalaria puede agregar valor sin ser impositivo/a. Pasar las primeras dos semanas aprendiendo los patrones de comunicación informales — quién habla con quién, cuándo se toman decisiones, cuáles son las reglas no escritas. Adaptar tu estilo de coordinación de episódico (enfocado en altas) a longitudinal (enfocado en relaciones), lo que significa invertir tiempo en entender la historia completa de cada paciente, no solo sus necesidades clínicas. Después de haber construido credibilidad, introducir gentilmente pequeñas mejoras estructurales: 'En mi rol anterior, encontramos que una reunión de 10 minutos por la mañana realmente ayudaba con las transferencias — ¿estaría el equipo abierto a probarlo por unas semanas?' Enmarcar todo como una sugerencia, no una corrección.",
        score: 4,
        behaviorTag: "culture-reader",
      },
      {
        id: "rs_cc_t3_b",
        text: "Adapt to the FQHC's informal style and focus on building relationships with patients and colleagues. Keep your hospital habits as personal tools but don't try to change the team's approach yet.",
        esText: "Adaptarte al estilo informal del FQHC y enfocarte en construir relaciones con pacientes y colegas. Mantener tus hábitos hospitalarios como herramientas personales pero no intentar cambiar el enfoque del equipo todavía.",
        score: 3,
        behaviorTag: "quiet-adapter",
      },
      {
        id: "rs_cc_t3_c",
        text: "Immediately propose implementing the structured protocols you used at the hospital — daily huddles, standard handoffs, escalation procedures. The FQHC clearly needs more organization and your experience can fix that.",
        esText: "Proponer inmediatamente implementar los protocolos estructurados que usabas en el hospital — reuniones diarias, transferencias estándar, procedimientos de escalamiento. El FQHC claramente necesita más organización y tu experiencia puede arreglar eso.",
        score: 2,
        behaviorTag: "imposes-old-model",
      },
      {
        id: "rs_cc_t3_d",
        text: "Conclude that the FQHC is disorganized and unprofessional compared to the hospital. Keep to yourself, do your own work the 'right' way, and start looking for a more structured environment if things don't improve.",
        esText: "Concluir que el FQHC es desorganizado y poco profesional comparado con el hospital. Mantenerte apartado/a, hacer tu propio trabajo de la manera 'correcta,' y empezar a buscar un ambiente más estructurado si las cosas no mejoran.",
        score: 1,
        behaviorTag: "judgmental-outsider",
      },
    ],
  },

  // ============================================================
  //  Medical Assistant — 10 new questions
  // ============================================================

  // Medical Assistant - Mission 2
  {
    id: "rs_ma_mission_2",
    roleId: "medical_assistant",
    domain: "mission",
    scenario:
      "You're rooming a patient for a well-child visit — a 4-year-old brought in by her grandmother. While taking the child's height and weight, you notice bruising on both arms in different stages of healing. The grandmother says the child 'falls a lot at daycare.' The child is quiet and avoids eye contact. The provider is running 30 minutes behind, and there are 6 patients waiting. Your gut tells you something is wrong.",
    esScenario:
      "Estás preparando a una paciente para una visita de niño sano — una niña de 4 años traída por su abuela. Mientras tomas la estatura y peso de la niña, notas moretones en ambos brazos en diferentes etapas de curación. La abuela dice que la niña 'se cae mucho en la guardería.' La niña está callada y evita el contacto visual. El proveedor lleva 30 minutos de retraso, y hay 6 pacientes esperando. Tu instinto te dice que algo está mal.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ma_m2_a",
        text: "This is a potential mandatory reporting situation and it takes priority over the schedule. Document what you observed objectively in the chart — location, size, and color of bruising, the grandmother's explanation, and the child's behavior. Alert the provider before they enter the room so they can conduct a thorough physical exam with this context. Don't confront the grandmother or make accusations, but make sure the provider knows about your observations so they can assess and determine whether a CPS report is warranted. In California, healthcare workers are mandated reporters — you can't ignore this regardless of how busy the clinic is.",
        esText: "Esta es una situación potencial de reporte obligatorio y tiene prioridad sobre el horario. Documentar lo que observaste objetivamente en el expediente — ubicación, tamaño y color de los moretones, la explicación de la abuela, y el comportamiento de la niña. Alertar al proveedor antes de que entre al cuarto para que pueda realizar un examen físico completo con este contexto. No confrontar a la abuela ni hacer acusaciones, pero asegurarte de que el proveedor sepa sobre tus observaciones para que pueda evaluar y determinar si un reporte a CPS está justificado. En California, los trabajadores de salud son reporteros obligatorios — no puedes ignorar esto sin importar cuán ocupada esté la clínica.",
        score: 4,
        behaviorTag: "mandated-reporter-aware",
      },
      {
        id: "rs_ma_m2_b",
        text: "Document the bruising in the chart and mention it to the provider when you hand off the patient. Let the provider decide the next steps since they're the clinical authority.",
        esText: "Documentar los moretones en el expediente y mencionarlo al proveedor cuando le entregues el paciente. Dejar que el proveedor decida los próximos pasos ya que es la autoridad clínica.",
        score: 3,
        behaviorTag: "documents-defers",
      },
      {
        id: "rs_ma_m2_c",
        text: "Ask the grandmother more questions about the bruising to try to determine if it's really just from falling. If her explanation seems reasonable, proceed with the visit as normal.",
        esText: "Hacer más preguntas a la abuela sobre los moretones para intentar determinar si realmente es solo por caídas. Si su explicación parece razonable, proceder con la visita normalmente.",
        score: 2,
        behaviorTag: "investigates-alone",
      },
      {
        id: "rs_ma_m2_d",
        text: "Note the bruising in the vitals section but don't make a big deal about it — kids do fall a lot, and you don't want to falsely accuse a family. The provider will see the child during the exam anyway.",
        esText: "Anotar los moretones en la sección de signos vitales pero no hacer gran cosa al respecto — los niños se caen mucho, y no quieres acusar falsamente a una familia. El proveedor verá a la niña durante el examen de todos modos.",
        score: 1,
        behaviorTag: "minimizes-concern",
      },
    ],
  },

  // Medical Assistant - Mission 3
  {
    id: "rs_ma_mission_3",
    roleId: "medical_assistant",
    domain: "mission",
    scenario:
      "A patient walks in without an appointment — she's a monolingual Mixtec speaker (an indigenous language from Oaxaca, Mexico) and is clearly distressed. The front desk turns her away because there are no walk-in slots available and no Mixtec interpreter on staff. She starts crying in the waiting room. You're the only MA who speaks some Spanish, but Mixtec is not Spanish. Your next patient is due in 5 minutes.",
    esScenario:
      "Una paciente llega sin cita — habla solo mixteco (una lengua indígena de Oaxaca, México) y está claramente angustiada. La recepción la rechaza porque no hay espacios para pacientes sin cita y no hay intérprete de mixteco en el personal. Ella comienza a llorar en la sala de espera. Eres el/la único/a MA que habla algo de español, pero el mixteco no es español. Tu próximo paciente llega en 5 minutos.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ma_m3_a",
        text: "This patient's distress is an access-to-care issue that your FQHC is legally and ethically obligated to address. Step in immediately: try basic Spanish to assess if she understands any — some Mixtec speakers also speak Spanish. If not, use a language line service that covers indigenous Mexican languages (companies like LanguageLine or CyraCom often have Mixtec). While waiting, use compassionate non-verbal communication — offer water, a tissue, a seat in a private area. Alert your clinic manager that you need walk-in capacity for a distressed patient. Brief your provider about the 5-minute delay and why. Document the language access barrier so the FQHC can plan for future Mixtec-speaking patients.",
        esText: "La angustia de esta paciente es un problema de acceso a atención que tu FQHC está legal y éticamente obligado a abordar. Intervenir inmediatamente: intentar español básico para evaluar si entiende algo — algunos hablantes de mixteco también hablan español. Si no, usar un servicio de línea de idiomas que cubra lenguas indígenas mexicanas (compañías como LanguageLine o CyraCom frecuentemente tienen mixteco). Mientras tanto, usar comunicación no-verbal compasiva — ofrecer agua, un pañuelo, un asiento en un área privada. Alertar a tu gerente de clínica que necesitas capacidad de emergencia para una paciente angustiada. Informar a tu proveedor sobre el retraso de 5 minutos y por qué. Documentar la barrera de acceso lingüístico para que el FQHC pueda planificar para futuros pacientes que hablen mixteco.",
        score: 4,
        behaviorTag: "language-access-champion",
      },
      {
        id: "rs_ma_m3_b",
        text: "Try to communicate with the patient using your Spanish and gestures. Help her sit down and tell the front desk to try the phone interpreter service. Get back to your scheduled patient after making sure someone is attending to her.",
        esText: "Intentar comunicarte con la paciente usando tu español y gestos. Ayudarla a sentarse y decirle a la recepción que intente el servicio telefónico de intérpretes. Regresar a tu paciente programado después de asegurarte de que alguien la está atendiendo.",
        score: 3,
        behaviorTag: "helpful-handoff",
      },
      {
        id: "rs_ma_m3_c",
        text: "Feel bad for the patient but agree with the front desk — there are no walk-in slots and no interpreter available. Suggest she come back tomorrow and try to bring someone who can translate.",
        esText: "Sentir pena por la paciente pero estar de acuerdo con la recepción — no hay espacios sin cita y no hay intérprete disponible. Sugerirle que regrese mañana e intente traer a alguien que pueda traducir.",
        score: 2,
        behaviorTag: "rule-bound",
      },
      {
        id: "rs_ma_m3_d",
        text: "Stay at your station — this is a front desk and scheduling issue, not an MA responsibility. You have patients to room and can't afford to fall behind.",
        esText: "Quedarte en tu estación — esto es un problema de recepción y programación, no una responsabilidad del MA. Tienes pacientes que preparar y no puedes darte el lujo de atrasarte.",
        score: 1,
        behaviorTag: "not-my-job",
      },
    ],
  },

  // Medical Assistant - People 2
  {
    id: "rs_ma_people_2",
    roleId: "medical_assistant",
    domain: "people",
    scenario:
      "You've been working with the same provider for 2 years and have an excellent rhythm. A new MA was just hired and assigned to shadow you for training. On her second day, she accidentally gives a patient the wrong vaccine — Tdap instead of the flu shot the provider ordered. You catch the error before the patient leaves. The new MA is visibly shaken and says, 'Please don't tell anyone — I'll be fired. I just need more practice.'",
    esScenario:
      "Has trabajado con el mismo proveedor por 2 años y tienen un ritmo excelente. Una nueva MA fue contratada y asignada a observarte para capacitación. En su segundo día, accidentalmente le da a un paciente la vacuna equivocada — Tdap en lugar de la vacuna contra la gripe que el proveedor ordenó. Atrapas el error antes de que el paciente se vaya. La nueva MA está visiblemente asustada y dice, 'Por favor no le digas a nadie — me van a despedir. Solo necesito más práctica.'",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ma_p2_a",
        text: "Be compassionate but clear: this is a patient safety event that must be reported — it's not optional, and covering it up would be worse for both the patient and the new MA. Walk her through the process: first, inform the provider immediately so they can assess the patient (Tdap isn't harmful, but the patient still needs the flu shot and needs to know what happened). Then complete an incident report together — frame it as a learning opportunity, not a punishment. Reassure her that vaccine administration errors happen, especially during training, and that honest reporting actually protects her. Afterward, debrief with her on what led to the mix-up and set up a verification protocol (read-back the vaccine name before drawing it up).",
        esText: "Ser compasivo/a pero claro/a: esto es un evento de seguridad del paciente que debe reportarse — no es opcional, y encubrirlo sería peor tanto para el paciente como para la nueva MA. Guiarla a través del proceso: primero, informar al proveedor inmediatamente para que pueda evaluar al paciente (Tdap no es dañino, pero el paciente aún necesita la vacuna contra la gripe y necesita saber qué pasó). Luego completar un reporte de incidente juntas — enmarcarlo como oportunidad de aprendizaje, no como castigo. Asegurarle que los errores de administración de vacunas suceden, especialmente durante la capacitación, y que reportar honestamente realmente la protege. Después, hacer un debriefing sobre qué llevó a la confusión y establecer un protocolo de verificación (leer en voz alta el nombre de la vacuna antes de prepararla).",
        score: 4,
        behaviorTag: "safety-culture-builder",
      },
      {
        id: "rs_ma_p2_b",
        text: "Tell the provider about the error and let them handle the incident report. Reassure the new MA that mistakes happen and she'll improve with time.",
        esText: "Informar al proveedor sobre el error y dejar que manejen el reporte de incidente. Asegurar a la nueva MA que los errores suceden y mejorará con el tiempo.",
        score: 3,
        behaviorTag: "reports-but-disconnects",
      },
      {
        id: "rs_ma_p2_c",
        text: "Agree not to report it this time since the Tdap won't hurt the patient, but tell the new MA that next time you'll have to say something. Give the patient the flu shot as well and chart both vaccines.",
        esText: "Aceptar no reportarlo esta vez ya que la Tdap no dañará al paciente, pero decirle a la nueva MA que la próxima vez tendrás que decir algo. Darle al paciente la vacuna contra la gripe también y registrar ambas vacunas.",
        score: 2,
        behaviorTag: "covers-for-colleague",
      },
      {
        id: "rs_ma_p2_d",
        text: "Report the error to your supervisor immediately and recommend they reconsider whether the new MA is ready for patient care. She could have caused serious harm.",
        esText: "Reportar el error a tu supervisor inmediatamente y recomendar que reconsideren si la nueva MA está lista para la atención al paciente. Podría haber causado un daño serio.",
        score: 1,
        behaviorTag: "punitive-reporter",
      },
    ],
  },

  // Medical Assistant - People 3
  {
    id: "rs_ma_people_3",
    roleId: "medical_assistant",
    domain: "people",
    scenario:
      "A patient you see regularly for diabetes management comes in for a follow-up. While taking vitals, she mentions that she recently started a new medication prescribed by an outside specialist, but she can't remember the name. She shows you a pill bottle with a label in Spanish from a pharmacy in Mexico — it's not in your FQHC's system. The provider she's seeing today is known for being dismissive of patients who use medications from Mexico, and last time this happened with another patient, the provider lectured them for 10 minutes about 'dangerous foreign drugs.'",
    esScenario:
      "Una paciente que ves regularmente para manejo de diabetes viene para un seguimiento. Mientras tomas sus signos vitales, menciona que recientemente comenzó un nuevo medicamento recetado por un especialista externo, pero no puede recordar el nombre. Te muestra un frasco de pastillas con una etiqueta en español de una farmacia en México — no está en el sistema de tu FQHC. El proveedor que la verá hoy es conocido por ser despectivo con pacientes que usan medicamentos de México, y la última vez que esto pasó con otro paciente, el proveedor les dio un sermón de 10 minutos sobre 'drogas extranjeras peligrosas.'",
    question: "How do you navigate this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ma_p3_a",
        text: "Protect both the patient's dignity and clinical safety. First, help identify the medication — translate the label, look up the active ingredient, and document it in the patient's medication list so the provider has accurate clinical data. Before the provider enters, give a professional heads-up: 'The patient is taking a medication from Mexico — I've identified it as [name/ingredient] and added it to the med list. She's being transparent about it, which is exactly what we want.' This sets the provider up to have a clinical conversation rather than a judgmental one. If the provider is still dismissive during the visit, follow up afterward with the patient to make sure she feels heard and isn't deterred from disclosing medications in the future.",
        esText: "Proteger tanto la dignidad de la paciente como la seguridad clínica. Primero, ayudar a identificar el medicamento — traducir la etiqueta, buscar el ingrediente activo, y documentarlo en la lista de medicamentos de la paciente para que el proveedor tenga datos clínicos precisos. Antes de que el proveedor entre, dar una nota profesional: 'La paciente está tomando un medicamento de México — lo identifiqué como [nombre/ingrediente] y lo agregué a la lista de medicamentos. Ella está siendo transparente al respecto, que es exactamente lo que queremos.' Esto prepara al proveedor para tener una conversación clínica en lugar de una de juicio. Si el proveedor aún es despectivo durante la visita, dar seguimiento después con la paciente para asegurarte de que se sienta escuchada y no se desanime de revelar medicamentos en el futuro.",
        score: 4,
        behaviorTag: "cultural-bridge-builder",
      },
      {
        id: "rs_ma_p3_b",
        text: "Document the medication as best you can and let the provider know about it. Stay neutral and let the clinical conversation happen however it happens.",
        esText: "Documentar el medicamento lo mejor que puedas y avisar al proveedor. Mantenerte neutral y dejar que la conversación clínica suceda como suceda.",
        score: 3,
        behaviorTag: "neutral-documenter",
      },
      {
        id: "rs_ma_p3_c",
        text: "Warn the patient that the provider might not react well to the Mexican medication. Suggest she bring it up on her own terms or wait to discuss it at her next visit with a different provider.",
        esText: "Advertir a la paciente que el proveedor podría no reaccionar bien al medicamento de México. Sugerirle que lo mencione en sus propios términos o espere a discutirlo en su próxima visita con un proveedor diferente.",
        score: 2,
        behaviorTag: "avoids-provider-conflict",
      },
      {
        id: "rs_ma_p3_d",
        text: "Don't mention the Mexican medication to the provider — the patient might get lectured, and it could make her stop coming to the clinic altogether. She seems to be doing fine on it.",
        esText: "No mencionar el medicamento mexicano al proveedor — podrían darle un sermón a la paciente, y podría hacer que deje de venir a la clínica por completo. Parece que le está yendo bien con él.",
        score: 1,
        behaviorTag: "withholds-clinical-info",
      },
    ],
  },

  // Medical Assistant - Execution 2
  {
    id: "rs_ma_execution_2",
    roleId: "medical_assistant",
    domain: "execution",
    scenario:
      "You're supporting two providers simultaneously today because your partner MA called in sick. Provider A runs a tight 15-minute schedule and gets visibly frustrated when patients aren't roomed on time. Provider B is slower but has a complex chronic disease panel with patients who need extensive vitals, point-of-care testing, and medication reconciliation. By 10 AM, Provider A is 2 patients behind, Provider B needs a fingerstick A1C drawn on the patient currently in the room, and the front desk just informed you that a walk-in patient with chest pain is in the lobby.",
    esScenario:
      "Hoy estás apoyando a dos proveedores simultáneamente porque tu compañero/a MA llamó enfermo/a. El Proveedor A tiene un horario ajustado de 15 minutos y se frustra visiblemente cuando los pacientes no se preparan a tiempo. El Proveedor B es más lento pero tiene un panel complejo de enfermedades crónicas con pacientes que necesitan signos vitales extensos, pruebas en el punto de atención, y reconciliación de medicamentos. Para las 10 AM, el Proveedor A está 2 pacientes atrasado, el Proveedor B necesita que le saquen una A1C por punción digital al paciente que está actualmente en el consultorio, y la recepción te acaba de informar que un paciente sin cita con dolor de pecho está en el vestíbulo.",
    question: "How do you prioritize?",
    esQuestion: "¿Cómo priorizas?",
    options: [
      {
        id: "rs_ma_e2_a",
        text: "The chest pain patient is the immediate clinical priority — potential cardiac events require triage now, not in 20 minutes. Tell the front desk to bring the patient to a room immediately and take a quick set of vitals (BP, pulse, O2 sat, pain scale). Alert whichever provider is available first. Then return to Provider B's A1C — it's time-sensitive for the current visit. For Provider A's backlog, communicate directly: 'I'm covering solo today. I'm going to room your next patient in 5 minutes — the delay is because of a chest pain walk-in.' Honest, brief communication prevents frustration better than scrambling silently. If the situation doesn't stabilize, ask your clinic lead to pull another MA or float from a different pod.",
        esText: "El paciente con dolor de pecho es la prioridad clínica inmediata — los eventos cardíacos potenciales requieren triaje ahora, no en 20 minutos. Decirle a la recepción que lleve al paciente a un consultorio inmediatamente y tomar signos vitales rápidos (presión arterial, pulso, saturación de O2, escala de dolor). Alertar al proveedor que esté disponible primero. Luego regresar a la A1C del Proveedor B — es urgente para la visita actual. Para el atraso del Proveedor A, comunicar directamente: 'Estoy cubriendo solo/a hoy. Voy a preparar a tu próximo paciente en 5 minutos — el retraso es por un paciente con dolor de pecho sin cita.' Comunicación honesta y breve previene la frustración mejor que apresurarse en silencio. Si la situación no se estabiliza, pedir a tu líder de clínica que traiga otro/a MA o uno/a flotante de otro pod.",
        score: 4,
        behaviorTag: "triage-under-pressure",
      },
      {
        id: "rs_ma_e2_b",
        text: "Tell the front desk to have the chest pain patient sit down and you'll be there in a few minutes. Quickly finish the A1C for Provider B, then room Provider A's next patient, then go check on the chest pain patient.",
        esText: "Decirle a la recepción que el paciente con dolor de pecho se siente y que estarás ahí en unos minutos. Terminar rápido la A1C para el Proveedor B, luego preparar al próximo paciente del Proveedor A, luego ir a revisar al paciente con dolor de pecho.",
        score: 2,
        behaviorTag: "delays-urgent",
      },
      {
        id: "rs_ma_e2_c",
        text: "Focus on keeping Provider A happy since they get the most frustrated. Room their patients first, deal with Provider B's A1C when you have a gap, and let the front desk handle the chest pain patient until you're free.",
        esText: "Enfocarte en mantener contento al Proveedor A ya que es el que más se frustra. Preparar sus pacientes primero, lidiar con la A1C del Proveedor B cuando tengas un espacio, y dejar que la recepción maneje al paciente con dolor de pecho hasta que estés libre.",
        score: 2,
        behaviorTag: "people-pleaser",
      },
      {
        id: "rs_ma_e2_d",
        text: "Feel overwhelmed and tell the front desk that walk-ins can't be seen today since you're short-staffed. Focus on the scheduled patients and let the chest pain patient go to the emergency room.",
        esText: "Sentirte abrumado/a y decirle a la recepción que pacientes sin cita no pueden ser atendidos hoy porque falta personal. Enfocarte en los pacientes programados y dejar que el paciente con dolor de pecho vaya a la sala de emergencias.",
        score: 1,
        behaviorTag: "refuses-under-stress",
      },
    ],
  },

  // Medical Assistant - Execution 3
  {
    id: "rs_ma_execution_3",
    roleId: "medical_assistant",
    domain: "execution",
    scenario:
      "During a routine vaccine administration, you draw up the correct vaccine (Shingrix) but when you check the vial again before injecting, you notice it expired 3 days ago. The patient — a 68-year-old with mobility issues — traveled 45 minutes by bus to get here. There are no unexpired Shingrix doses in the clinic's refrigerator. The patient's next available appointment isn't for 3 weeks, and she says she can't easily make another trip.",
    esScenario:
      "Durante una administración rutinaria de vacuna, preparas la vacuna correcta (Shingrix) pero cuando revisas el frasco otra vez antes de inyectar, notas que expiró hace 3 días. La paciente — una mujer de 68 años con problemas de movilidad — viajó 45 minutos en autobús para llegar aquí. No hay dosis de Shingrix sin expirar en el refrigerador de la clínica. La próxima cita disponible de la paciente no es hasta dentro de 3 semanas, y dice que no puede hacer otro viaje fácilmente.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ma_e3_a",
        text: "You absolutely cannot administer an expired vaccine — this is non-negotiable regardless of the patient's inconvenience. Discard the expired dose following your clinic's biohazard protocol and document the waste. Then problem-solve for the patient: check with your pharmacy or other clinic sites for unexpired stock that could be transferred today. If Shingrix can't be sourced same-day, coordinate with scheduling to find the earliest possible appointment and arrange NEMT (Medi-Cal Non-Emergency Medical Transportation) so she doesn't have to take the bus again. Report the expired inventory to your clinic manager — this is a cold chain management issue that needs to be investigated to prevent recurrence. Apologize sincerely to the patient for the inconvenience.",
        esText: "Absolutamente no puedes administrar una vacuna expirada — esto es innegociable sin importar la inconveniencia para la paciente. Desechar la dosis expirada siguiendo el protocolo de residuos biológicos de tu clínica y documentar el desperdicio. Luego resolver el problema para la paciente: verificar con tu farmacia u otros sitios de la clínica si hay stock sin expirar que pueda ser transferido hoy. Si Shingrix no puede conseguirse el mismo día, coordinar con programación para encontrar la cita más pronto posible y coordinar NEMT (Transporte Médico No-Emergencia de Medi-Cal) para que no tenga que tomar el autobús otra vez. Reportar el inventario expirado a tu gerente de clínica — esto es un problema de manejo de cadena de frío que necesita investigarse para prevenir recurrencia. Disculparse sinceramente con la paciente por la inconveniencia.",
        score: 4,
        behaviorTag: "protocol-adherent-compassionate",
      },
      {
        id: "rs_ma_e3_b",
        text: "Don't give the expired vaccine. Apologize to the patient, check if another clinic site has unexpired stock, and reschedule the appointment as soon as possible. Report the expired vaccine to your supervisor.",
        esText: "No dar la vacuna expirada. Disculparte con la paciente, verificar si otro sitio de la clínica tiene stock sin expirar, y reprogramar la cita lo antes posible. Reportar la vacuna expirada a tu supervisor.",
        score: 3,
        behaviorTag: "safe-but-basic",
      },
      {
        id: "rs_ma_e3_c",
        text: "The vaccine only expired 3 days ago — it's probably still effective. The patient made a huge effort to get here. Give the vaccine and note the expiration issue in the chart. Report the inventory issue afterward.",
        esText: "La vacuna solo expiró hace 3 días — probablemente aún es efectiva. La paciente hizo un gran esfuerzo para llegar aquí. Dar la vacuna y notar el problema de expiración en el expediente. Reportar el problema de inventario después.",
        score: 2,
        behaviorTag: "bends-safety-rules",
      },
      {
        id: "rs_ma_e3_d",
        text: "Tell the patient the vaccine isn't available today and she'll need to reschedule. Don't mention the expiration issue to her — it would make the clinic look bad.",
        esText: "Decirle a la paciente que la vacuna no está disponible hoy y que necesitará reprogramar. No mencionar el problema de expiración — haría que la clínica se vea mal.",
        score: 1,
        behaviorTag: "hides-error",
      },
    ],
  },

  // Medical Assistant - Growth 2
  {
    id: "rs_ma_growth_2",
    roleId: "medical_assistant",
    domain: "growth",
    scenario:
      "Your FQHC is expanding its scope-of-practice for MAs — you'll now be trained to perform point-of-care ultrasounds for pregnancy confirmation and gestational dating under provider supervision. Some of your colleagues are excited, but you're nervous because you've never used an ultrasound machine. The training is a 40-hour certification program on weekends over 2 months. A senior MA tells you, 'Don't waste your time — they'll train you and then not actually let you do the scans because the providers won't trust us.'",
    esScenario:
      "Tu FQHC está expandiendo el alcance de práctica para MAs — ahora serás capacitado/a para realizar ultrasonidos en el punto de atención para confirmación de embarazo y datación gestacional bajo supervisión del proveedor. Algunos colegas están emocionados, pero tú estás nervioso/a porque nunca has usado una máquina de ultrasonido. La capacitación es un programa de certificación de 40 horas en fines de semana durante 2 meses. Un MA senior te dice, 'No pierdas tu tiempo — te entrenarán y luego no te dejarán hacer los escaneos porque los proveedores no confiarán en nosotros.'",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_ma_g2_a",
        text: "Sign up for the certification — expanding your clinical skills is how you grow as an MA, and point-of-care ultrasound is a high-value skill that few MAs have. Address your nervousness by reaching out to MAs at other FQHCs who've completed similar training to learn what to expect. As for the senior MA's skepticism, recognize that earning provider trust is part of the process — plan to demonstrate competence during the supervised practice phase and ask your champion provider to let you practice on willing patients. If the FQHC doesn't follow through after you're certified, you'll have a credential that makes you more competitive anywhere.",
        esText: "Inscribirte en la certificación — expandir tus habilidades clínicas es cómo creces como MA, y el ultrasonido en el punto de atención es una habilidad de alto valor que pocos MAs tienen. Abordar tu nerviosismo contactando a MAs en otros FQHCs que han completado capacitación similar para saber qué esperar. En cuanto al escepticismo del MA senior, reconocer que ganarse la confianza del proveedor es parte del proceso — planear demostrar competencia durante la fase de práctica supervisada y pedir a tu proveedor defensor que te deje practicar con pacientes dispuestos. Si el FQHC no cumple después de que estés certificado/a, tendrás una credencial que te hace más competitivo/a en cualquier lugar.",
        score: 4,
        behaviorTag: "skill-builder",
      },
      {
        id: "rs_ma_g2_b",
        text: "Sign up for the certification because it's an opportunity the FQHC is offering. Even if you're nervous, you'll learn as you go. Wait and see if the providers actually let you do the scans.",
        esText: "Inscribirte en la certificación porque es una oportunidad que el FQHC está ofreciendo. Aunque estés nervioso/a, aprenderás sobre la marcha. Esperar a ver si los proveedores realmente te dejan hacer los escaneos.",
        score: 3,
        behaviorTag: "willing-but-passive",
      },
      {
        id: "rs_ma_g2_c",
        text: "Decide to wait and see how the first cohort of MAs does before signing up. If it actually works out and providers let them do the scans, you'll join the next round.",
        esText: "Decidir esperar a ver cómo le va al primer grupo de MAs antes de inscribirte. Si realmente funciona y los proveedores los dejan hacer los escaneos, te unirás a la siguiente ronda.",
        score: 2,
        behaviorTag: "wait-and-see",
      },
      {
        id: "rs_ma_g2_d",
        text: "Agree with the senior MA — the FQHC is adding responsibilities without increasing pay, and spending your weekends on training isn't worth it if providers won't trust the results anyway.",
        esText: "Estar de acuerdo con el MA senior — el FQHC está agregando responsabilidades sin aumentar el pago, y pasar tus fines de semana en capacitación no vale la pena si los proveedores no confiarán en los resultados de todos modos.",
        score: 1,
        behaviorTag: "cynical-non-starter",
      },
    ],
  },

  // Medical Assistant - Growth 3
  {
    id: "rs_ma_growth_3",
    roleId: "medical_assistant",
    domain: "growth",
    scenario:
      "You've been an MA for 6 years and are interested in becoming a Licensed Vocational Nurse (LVN). Your FQHC offers tuition reimbursement up to $3,000/year, but the LVN program costs $15,000 and is 12 months full-time. You can't work full-time while in the program. A colleague who tried a similar path two years ago dropped out because the FQHC wouldn't adjust her schedule, and she's still paying off the loans.",
    esScenario:
      "Has sido MA por 6 años y estás interesado/a en convertirte en Enfermero/a Vocacional con Licencia (LVN). Tu FQHC ofrece reembolso de matrícula de hasta $3,000/año, pero el programa de LVN cuesta $15,000 y es de 12 meses a tiempo completo. No puedes trabajar tiempo completo mientras estés en el programa. Una colega que intentó un camino similar hace dos años abandonó porque el FQHC no ajustó su horario, y todavía está pagando los préstamos.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo enfocas esto?",
    options: [
      {
        id: "rs_ma_g3_a",
        text: "Approach it as a negotiation with data. Research the full financial picture: $15K program cost minus $6K FQHC reimbursement (over 2 years) = $9K gap. Look into HRSA Nursing Workforce Development grants, state Board of Vocational Nursing scholarships, and whether the FQHC would consider a 'grow your own' arrangement — reduce to part-time during the program in exchange for a commitment to return as an LVN. Talk to your colleague who dropped out to understand specifically what went wrong and how to avoid the same pitfalls. Present a formal proposal to your supervisor: 'Here's my plan, here's what I'm asking for, and here's how the FQHC benefits — you'll get an LVN who already knows your systems, patients, and providers.' Have a backup plan if the FQHC says no.",
        esText: "Enfocarlo como una negociación con datos. Investigar el panorama financiero completo: $15K del programa menos $6K de reembolso del FQHC (en 2 años) = $9K de brecha. Buscar subvenciones de Desarrollo de Fuerza Laboral de Enfermería de HRSA, becas del Board of Vocational Nursing del estado, y si el FQHC consideraría un arreglo de 'cultivar talento propio' — reducir a tiempo parcial durante el programa a cambio de un compromiso de regresar como LVN. Hablar con tu colega que abandonó para entender específicamente qué salió mal y cómo evitar los mismos errores. Presentar una propuesta formal a tu supervisor: 'Aquí está mi plan, esto es lo que pido, y así es como el FQHC se beneficia — tendrán un LVN que ya conoce sus sistemas, pacientes y proveedores.' Tener un plan B si el FQHC dice que no.",
        score: 4,
        behaviorTag: "career-negotiator",
      },
      {
        id: "rs_ma_g3_b",
        text: "Start saving money and researching LVN programs. Apply for the tuition reimbursement and plan to take out loans for the rest. Figure out the scheduling challenges once you're accepted into a program.",
        esText: "Empezar a ahorrar dinero e investigar programas de LVN. Solicitar el reembolso de matrícula y planear tomar préstamos por el resto. Resolver los desafíos de horario una vez que seas aceptado/a en un programa.",
        score: 3,
        behaviorTag: "hopeful-planner",
      },
      {
        id: "rs_ma_g3_c",
        text: "Decide it's too risky financially, especially after hearing about your colleague's experience. Maybe look into online bridge programs or wait until your financial situation is more stable.",
        esText: "Decidir que es demasiado arriesgado financieramente, especialmente después de escuchar sobre la experiencia de tu colega. Quizás buscar programas puente en línea o esperar hasta que tu situación financiera sea más estable.",
        score: 2,
        behaviorTag: "risk-averse",
      },
      {
        id: "rs_ma_g3_d",
        text: "Give up on the idea — the FQHC clearly doesn't support career advancement for MAs, and you can't afford the financial risk. Stay in your current role and focus on being the best MA you can be.",
        esText: "Renunciar a la idea — el FQHC claramente no apoya el avance profesional para MAs, y no puedes permitirte el riesgo financiero. Quedarte en tu rol actual y enfocarte en ser el/la mejor MA que puedas ser.",
        score: 1,
        behaviorTag: "gives-up",
      },
    ],
  },

  // Medical Assistant - Transition 2
  {
    id: "rs_ma_transition_2",
    roleId: "medical_assistant",
    domain: "transition",
    scenario:
      "You've been hired at a rural FQHC after working at a large urban clinic for 5 years. The rural clinic has 3 providers, 2 MAs (including you), and covers a geographic area larger than some states. You'll be doing things you didn't do at your city clinic: drawing blood (no phlebotomist on site), running rapid strep and flu tests, assisting with minor procedures, and sometimes covering the front desk during lunch. The other MA has been there for 12 years and 'does things her own way.' On your first day, you notice the supply room is disorganized, expired medications are mixed in with current stock, and the autoclave log hasn't been updated in months.",
    esScenario:
      "Te contrataron en un FQHC rural después de trabajar en una clínica urbana grande por 5 años. La clínica rural tiene 3 proveedores, 2 MAs (incluyéndote), y cubre un área geográfica más grande que algunos estados. Harás cosas que no hacías en tu clínica de la ciudad: sacar sangre (no hay flebotomista en sitio), ejecutar pruebas rápidas de estreptococo y gripe, asistir con procedimientos menores, y a veces cubrir la recepción durante el almuerzo. La otra MA ha estado ahí por 12 años y 'hace las cosas a su manera.' En tu primer día, notas que el cuarto de suministros está desorganizado, medicamentos expirados están mezclados con stock actual, y el registro del autoclave no ha sido actualizado en meses.",
    question: "How do you approach your first month?",
    esQuestion: "¿Cómo enfocas tu primer mes?",
    options: [
      {
        id: "rs_ma_t2_a",
        text: "Prioritize safety first, relationships second, improvements third — in that order. Week 1: focus on the immediate safety issues — the expired medications and autoclave log are compliance and patient safety risks that can't wait. Address them factually with the clinic manager, not as a criticism of the other MA. Weeks 2-3: invest in learning from the veteran MA — she knows the patient population, the providers' preferences, and the rural-specific workflows (phlebotomy, procedures) that are new to you. Show respect for her 12 years of experience even as you notice things that need updating. Week 4: once you've built credibility, propose small improvements — start with the supply room organization since it helps everyone, and frame it as 'I'd like to help with this' rather than 'this is wrong.'",
        esText: "Priorizar seguridad primero, relaciones segundo, mejoras tercero — en ese orden. Semana 1: enfocarte en los problemas de seguridad inmediatos — los medicamentos expirados y el registro del autoclave son riesgos de cumplimiento y seguridad del paciente que no pueden esperar. Abordarlos factualmente con el gerente de la clínica, no como una crítica a la otra MA. Semanas 2-3: invertir en aprender de la MA veterana — ella conoce la población de pacientes, las preferencias de los proveedores, y los flujos de trabajo específicos rurales (flebotomía, procedimientos) que son nuevos para ti. Mostrar respeto por sus 12 años de experiencia incluso mientras notas cosas que necesitan actualización. Semana 4: una vez que hayas construido credibilidad, proponer pequeñas mejoras — empezar con la organización del cuarto de suministros ya que ayuda a todos, y enmarcarlo como 'me gustaría ayudar con esto' en lugar de 'esto está mal.'",
        score: 4,
        behaviorTag: "safety-first-diplomat",
      },
      {
        id: "rs_ma_t2_b",
        text: "Focus on learning the new skills you'll need — phlebotomy, rapid tests, procedures — and adapt to the rural workflow. Mention the expired medications to the clinic manager but don't make waves about the supply room yet.",
        esText: "Enfocarte en aprender las nuevas habilidades que necesitarás — flebotomía, pruebas rápidas, procedimientos — y adaptarte al flujo de trabajo rural. Mencionar los medicamentos expirados al gerente de la clínica pero no hacer olas sobre el cuarto de suministros todavía.",
        score: 3,
        behaviorTag: "learns-then-acts",
      },
      {
        id: "rs_ma_t2_c",
        text: "Reorganize the supply room and update the autoclave log right away — these are basic compliance issues. The other MA will appreciate having a partner who holds high standards.",
        esText: "Reorganizar el cuarto de suministros y actualizar el registro del autoclave de inmediato — estos son problemas básicos de cumplimiento. La otra MA apreciará tener una compañera que mantiene altos estándares.",
        score: 2,
        behaviorTag: "fixes-without-relationships",
      },
      {
        id: "rs_ma_t2_d",
        text: "Keep your head down and adapt to how things work here. The other MA has been managing fine for 12 years, and coming in as the 'city clinic' person trying to change everything will only create conflict.",
        esText: "Mantener perfil bajo y adaptarte a cómo funcionan las cosas aquí. La otra MA ha estado manejando bien por 12 años, y llegar como la persona de la 'clínica de la ciudad' intentando cambiar todo solo creará conflicto.",
        score: 1,
        behaviorTag: "ignores-safety-issues",
      },
    ],
  },

  // Medical Assistant - Transition 3
  {
    id: "rs_ma_transition_3",
    roleId: "medical_assistant",
    domain: "transition",
    scenario:
      "You're starting at an FQHC that just adopted a team-based care model where MAs are expected to do pre-visit planning, chronic disease registry outreach, and panel management — far beyond traditional rooming and vitals. Your previous FQHC had a strict scope where MAs only roomed patients and took vitals. On your first day, the lead MA hands you a list of 25 diabetic patients who are overdue for A1C labs and says, 'These are yours to call and schedule. Also, review their charts and flag anyone who might need a medication adjustment at their next visit.' You're uncomfortable flagging clinical concerns — that feels like it's outside your scope.",
    esScenario:
      "Estás empezando en un FQHC que acaba de adoptar un modelo de atención basado en equipos donde se espera que los MAs hagan planificación previa a la visita, alcance de registro de enfermedades crónicas, y manejo de panel — mucho más allá del trabajo tradicional de preparar pacientes y tomar signos vitales. Tu FQHC anterior tenía un alcance estricto donde los MAs solo preparaban pacientes y tomaban signos vitales. En tu primer día, el MA líder te da una lista de 25 pacientes diabéticos que están atrasados para laboratorios de A1C y dice, 'Estos son tuyos para llamar y programar. También, revisa sus expedientes y señala a cualquiera que podría necesitar un ajuste de medicamento en su próxima visita.' Te sientes incómodo/a señalando preocupaciones clínicas — sientes que está fuera de tu alcance.",
    question: "How do you handle this transition?",
    esQuestion: "¿Cómo manejas esta transición?",
    options: [
      {
        id: "rs_ma_t3_a",
        text: "Recognize that team-based care redefines the MA role — and it's actually an upgrade, not scope creep. Ask the lead MA to clarify exactly what 'flagging for medication adjustment' means in practice: are you identifying patients whose last A1C was above target and noting it for the provider, or are you making clinical recommendations? The first is data review (within scope), the second is clinical judgment (provider territory). Get comfortable with the distinction. For the 25 patient calls, create a tracking system so you can report back on who you reached, who needs scheduling, and who you couldn't contact. Ask to shadow the lead MA doing pre-visit planning for a few patients so you can see the workflow before doing it independently. Embrace the expanded role while setting appropriate boundaries.",
        esText: "Reconocer que la atención basada en equipos redefine el rol del MA — y es realmente una mejora, no exceso de alcance. Pedir al MA líder que clarifique exactamente qué significa 'señalar para ajuste de medicamento' en la práctica: ¿estás identificando pacientes cuya última A1C estaba por encima del objetivo y anotándolo para el proveedor, o estás haciendo recomendaciones clínicas? Lo primero es revisión de datos (dentro del alcance), lo segundo es juicio clínico (territorio del proveedor). Familiarizarte con la distinción. Para las 25 llamadas a pacientes, crear un sistema de seguimiento para que puedas reportar a quién contactaste, quién necesita programación, y a quién no pudiste contactar. Pedir observar al MA líder haciendo planificación previa a la visita para algunos pacientes para ver el flujo de trabajo antes de hacerlo independientemente. Abrazar el rol expandido mientras estableces límites apropiados.",
        score: 4,
        behaviorTag: "scope-clarifier",
      },
      {
        id: "rs_ma_t3_b",
        text: "Start making the calls and scheduling the overdue A1C labs — that part is straightforward. For the chart review and flagging, ask the lead MA to show you some examples of what they're looking for before you try it yourself.",
        esText: "Empezar a hacer las llamadas y programar los laboratorios de A1C atrasados — esa parte es sencilla. Para la revisión de expedientes y señalamiento, pedir al MA líder que te muestre algunos ejemplos de lo que buscan antes de intentarlo tú mismo/a.",
        score: 3,
        behaviorTag: "starts-safe-zone",
      },
      {
        id: "rs_ma_t3_c",
        text: "Express your concern to the lead MA that flagging clinical issues isn't within the MA scope of practice. Suggest that the providers or nurses should handle the chart review portion while MAs focus on scheduling and outreach.",
        esText: "Expresar tu preocupación al MA líder de que señalar problemas clínicos no está dentro del alcance de práctica del MA. Sugerir que los proveedores o enfermeras manejen la porción de revisión de expedientes mientras los MAs se enfocan en programación y alcance.",
        score: 2,
        behaviorTag: "scope-rigid",
      },
      {
        id: "rs_ma_t3_d",
        text: "Comply with the request but don't actually flag any clinical concerns — just make the calls and schedule the labs. If something gets missed, it's not your responsibility since you were asked to do something outside your scope.",
        esText: "Cumplir con la solicitud pero no señalar realmente ninguna preocupación clínica — solo hacer las llamadas y programar los laboratorios. Si algo se pierde, no es tu responsabilidad ya que te pidieron hacer algo fuera de tu alcance.",
        score: 1,
        behaviorTag: "passive-non-complier",
      },
    ],
  },

  // ============================================================
  //  Case Manager — 10 new questions
  // ============================================================

  // Case Manager - Mission 2
  {
    id: "rs_cm_mission_2",
    roleId: "case_manager",
    domain: "mission",
    scenario:
      "Your FQHC receives a referral from the county jail for a patient being released next week — a 32-year-old man with HIV, hepatitis C, and opioid use disorder who has been incarcerated for 18 months. He'll be released with a 7-day supply of antiretrovirals and buprenorphine, no housing, no Medi-Cal (it was suspended during incarceration), and a parole officer he's never met. Your supervisor tells you your caseload is already at capacity (30 patients) and suggests referring him to the county's re-entry program, which has a 6-week waitlist.",
    esScenario:
      "Tu FQHC recibe una referencia de la cárcel del condado para un paciente que será liberado la próxima semana — un hombre de 32 años con VIH, hepatitis C, y trastorno por uso de opioides que ha estado encarcelado por 18 meses. Será liberado con un suministro de 7 días de antirretrovirales y buprenorfina, sin vivienda, sin Medi-Cal (fue suspendido durante el encarcelamiento), y un oficial de libertad condicional que nunca ha conocido. Tu supervisor te dice que tu carga de casos ya está al máximo (30 pacientes) y sugiere referirlo al programa de reingreso del condado, que tiene una lista de espera de 6 semanas.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_cm_m2_a",
        text: "Advocate for taking this case — a 6-week gap in care for someone on antiretrovirals and buprenorphine isn't just a waitlist problem, it's a life-threatening interruption. Present the clinical urgency to your supervisor: if his HIV meds lapse, he risks viral resistance; if his buprenorphine runs out, he's at extreme overdose risk in the first two weeks post-release, which is the highest mortality window for formerly incarcerated people. Propose a plan: initiate Medi-Cal reinstatement immediately (California law requires processing within 10 days for re-entry), coordinate with the jail discharge planner for a warm handoff, line up a same-week PCP appointment to bridge his medications, and connect with housing resources. Ask your supervisor which lower-acuity patient can be transitioned to maintenance-level support to make room.",
        esText: "Abogar por tomar este caso — una brecha de 6 semanas en atención para alguien con antirretrovirales y buprenorfina no es solo un problema de lista de espera, es una interrupción potencialmente mortal. Presentar la urgencia clínica a tu supervisor: si sus medicamentos de VIH se interrumpen, arriesga resistencia viral; si su buprenorfina se acaba, está en riesgo extremo de sobredosis en las primeras dos semanas post-liberación, que es la ventana de mayor mortalidad para personas previamente encarceladas. Proponer un plan: iniciar la reactivación de Medi-Cal inmediatamente (la ley de California requiere procesamiento dentro de 10 días para reingreso), coordinar con el planificador de alta de la cárcel para una transferencia cálida, agendar una cita de PCP la misma semana para hacer puente con sus medicamentos, y conectar con recursos de vivienda. Preguntar a tu supervisor qué paciente de menor agudeza puede ser transicionado a apoyo de nivel de mantenimiento para hacer espacio.",
        score: 4,
        behaviorTag: "urgency-advocate",
      },
      {
        id: "rs_cm_m2_b",
        text: "Agree to take the case temporarily while the re-entry program waitlist clears. Focus on getting his Medi-Cal reinstated and bridging his medications, then transfer him once the county program has capacity.",
        esText: "Aceptar tomar el caso temporalmente mientras se despeja la lista de espera del programa de reingreso. Enfocarte en reactivar su Medi-Cal y hacer puente con sus medicamentos, luego transferirlo una vez que el programa del condado tenga capacidad.",
        score: 3,
        behaviorTag: "bridge-supporter",
      },
      {
        id: "rs_cm_m2_c",
        text: "Refer him to the county re-entry program as your supervisor suggests, but call the program to flag the case as urgent and ask them to expedite. Send the referral with a detailed summary of his medication needs.",
        esText: "Referirlo al programa de reingreso del condado como sugiere tu supervisor, pero llamar al programa para señalar el caso como urgente y pedir que lo agilicen. Enviar la referencia con un resumen detallado de sus necesidades de medicamentos.",
        score: 2,
        behaviorTag: "warm-referral-only",
      },
      {
        id: "rs_cm_m2_d",
        text: "Follow your supervisor's guidance — your caseload is already at capacity, and taking on more patients would compromise care for your existing 30 patients. The county program exists for exactly this type of case.",
        esText: "Seguir la guía de tu supervisor — tu carga de casos ya está al máximo, y tomar más pacientes comprometería la atención de tus 30 pacientes actuales. El programa del condado existe exactamente para este tipo de caso.",
        score: 1,
        behaviorTag: "capacity-capper",
      },
    ],
  },

  // Case Manager - Mission 3
  {
    id: "rs_cm_mission_3",
    roleId: "case_manager",
    domain: "mission",
    scenario:
      "A longtime patient — a 55-year-old woman you've worked with for 2 years — tells you she's decided to stop dialysis. She's tired of the treatments, the transportation burden, and feeling sick afterward. She has no family nearby and says she's 'at peace with it.' Clinically, stopping dialysis means she'll likely die within 1-2 weeks. Your supervisor says it's her right and to start end-of-life planning. You feel conflicted because she told you last month she was depressed, and you're not sure this decision is coming from a stable emotional place.",
    esScenario:
      "Una paciente de mucho tiempo — una mujer de 55 años con quien has trabajado por 2 años — te dice que decidió dejar la diálisis. Está cansada de los tratamientos, la carga de transporte, y sentirse mal después. No tiene familia cercana y dice que está 'en paz con eso.' Clínicamente, dejar la diálisis significa que probablemente morirá dentro de 1-2 semanas. Tu supervisor dice que es su derecho y que comiences la planificación de fin de vida. Te sientes en conflicto porque te dijo el mes pasado que estaba deprimida, y no estás seguro/a de que esta decisión venga de un lugar emocional estable.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo enfocas esto?",
    options: [
      {
        id: "rs_cm_m3_a",
        text: "Respect her autonomy while ensuring the decision is truly informed and not driven by untreated depression. Don't start end-of-life planning yet. First, have an honest conversation: 'I hear you, and I respect your right to make this choice. I also want to make sure we've addressed your depression, because I want you to feel confident this decision reflects what you truly want, not how you feel on your worst days.' Request a behavioral health consultation — ideally someone who specializes in chronic illness and end-of-life decisions — before proceeding. Simultaneously, explore whether the treatment burden could be reduced: home dialysis, transportation assistance, or schedule adjustments. Document everything carefully. Only begin end-of-life planning once you're confident the decision is made with full capacity and support.",
        esText: "Respetar su autonomía mientras aseguras que la decisión esté verdaderamente informada y no impulsada por depresión no tratada. No comenzar la planificación de fin de vida todavía. Primero, tener una conversación honesta: 'Te escucho, y respeto tu derecho a tomar esta decisión. También quiero asegurarme de que hayamos abordado tu depresión, porque quiero que te sientas segura de que esta decisión refleja lo que realmente quieres, no cómo te sientes en tus peores días.' Solicitar una consulta de salud conductual — idealmente alguien que se especialice en enfermedades crónicas y decisiones de fin de vida — antes de proceder. Simultáneamente, explorar si la carga del tratamiento podría reducirse: diálisis en casa, asistencia de transporte, o ajustes de horario. Documentar todo cuidadosamente. Solo comenzar la planificación de fin de vida una vez que estés seguro/a de que la decisión se toma con plena capacidad y apoyo.",
        score: 4,
        behaviorTag: "ethical-navigator",
      },
      {
        id: "rs_cm_m3_b",
        text: "Respect her decision and begin end-of-life planning as your supervisor directed. Make sure she has access to a social worker and hospice referral. Check in with her frequently over the coming days.",
        esText: "Respetar su decisión y comenzar la planificación de fin de vida como indicó tu supervisor. Asegurarte de que tenga acceso a un trabajador social y referencia de hospicio. Verificar con ella frecuentemente en los próximos días.",
        score: 3,
        behaviorTag: "follows-directive",
      },
      {
        id: "rs_cm_m3_c",
        text: "Try to convince her to continue dialysis — explain the consequences of stopping, share stories of other patients who felt the same way but changed their minds. She's not thinking clearly because of her depression.",
        esText: "Intentar convencerla de continuar la diálisis — explicar las consecuencias de parar, compartir historias de otros pacientes que se sintieron igual pero cambiaron de opinión. No está pensando claramente por su depresión.",
        score: 2,
        behaviorTag: "overrides-autonomy",
      },
      {
        id: "rs_cm_m3_d",
        text: "Process it as a routine case closure. She's made her decision, your supervisor agreed, and it's not your place to question her mental capacity. Complete the paperwork and move on.",
        esText: "Procesarlo como un cierre de caso rutinario. Ella tomó su decisión, tu supervisor estuvo de acuerdo, y no es tu lugar cuestionar su capacidad mental. Completar el papeleo y seguir adelante.",
        score: 1,
        behaviorTag: "emotionally-detached",
      },
    ],
  },

  // Case Manager - People 2
  {
    id: "rs_cm_people_2",
    roleId: "case_manager",
    domain: "people",
    scenario:
      "You've been working closely with a patient's family to coordinate care for their autistic teenage son. The family — two immigrant parents who speak limited English — trusts you deeply. During a home visit, the mother confides that her husband has been hitting their son when he has meltdowns because 'that's how we discipline in our country.' She immediately becomes afraid she told you and begs you not to say anything. The teenager has visible bruises on his arms.",
    esScenario:
      "Has estado trabajando cercanamente con la familia de un paciente para coordinar atención para su hijo adolescente autista. La familia — dos padres inmigrantes que hablan inglés limitado — confía profundamente en ti. Durante una visita domiciliaria, la madre te confía que su esposo ha estado golpeando a su hijo cuando tiene crisis porque 'así disciplinamos en nuestro país.' Ella inmediatamente se asusta de haberte dicho y te suplica que no digas nada. El adolescente tiene moretones visibles en sus brazos.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_cm_p2_a",
        text: "This is a mandated reporting situation — there's no gray area when a minor has visible injuries. But how you handle it determines whether this family stays connected to services or disappears. Be honest with the mother: 'I understand this is how discipline works in your culture, and I can see you're telling me because you're worried about your son. I have to be honest with you — as a healthcare worker in California, I'm legally required to report when a child may be hurt. But I want you to know this doesn't mean your family will be torn apart. I will advocate for your family, and I will help connect you with parenting support that understands autism and your cultural background.' Make the CPS report, document the bruises, alert the care team, and immediately connect the family with culturally sensitive autism support services and parenting classes. Follow up within 24 hours to maintain the relationship.",
        esText: "Esta es una situación de reporte obligatorio — no hay zona gris cuando un menor tiene lesiones visibles. Pero cómo lo manejas determina si esta familia se mantiene conectada a servicios o desaparece. Ser honesto/a con la madre: 'Entiendo que así funciona la disciplina en su cultura, y puedo ver que me lo dice porque está preocupada por su hijo. Tengo que ser honesto/a — como trabajador/a de salud en California, estoy legalmente obligado/a a reportar cuando un niño puede estar siendo lastimado. Pero quiero que sepa que esto no significa que su familia será separada. Voy a abogar por su familia, y la ayudaré a conectarse con apoyo para padres que entiende el autismo y su origen cultural.' Hacer el reporte a CPS, documentar los moretones, alertar al equipo de atención, e inmediatamente conectar a la familia con servicios de apoyo para autismo culturalmente sensibles y clases de crianza. Dar seguimiento dentro de 24 horas para mantener la relación.",
        score: 4,
        behaviorTag: "compassionate-mandated-reporter",
      },
      {
        id: "rs_cm_p2_b",
        text: "Make the mandated report as required by law. Explain to the mother that you have no choice and that CPS will investigate. Connect the family with resources afterward.",
        esText: "Hacer el reporte obligatorio como lo requiere la ley. Explicar a la madre que no tienes opción y que CPS investigará. Conectar a la familia con recursos después.",
        score: 3,
        behaviorTag: "duty-bound-reporter",
      },
      {
        id: "rs_cm_p2_c",
        text: "Try to work with the family first — talk to the father about alternative discipline approaches, connect them with autism parenting resources, and monitor the situation. Only report if the bruising continues or worsens.",
        esText: "Intentar trabajar con la familia primero — hablar con el padre sobre enfoques alternativos de disciplina, conectarlos con recursos de crianza para autismo, y monitorear la situación. Solo reportar si los moretones continúan o empeoran.",
        score: 2,
        behaviorTag: "delays-mandatory-report",
      },
      {
        id: "rs_cm_p2_d",
        text: "The mother told you in confidence and the family trusts you. Breaking that confidence would destroy the relationship and the family would stop coming to the clinic. Keep it between you and the family and try to help informally.",
        esText: "La madre te lo dijo en confianza y la familia confía en ti. Romper esa confianza destruiría la relación y la familia dejaría de venir a la clínica. Mantenerlo entre tú y la familia e intentar ayudar informalmente.",
        score: 1,
        behaviorTag: "protects-relationship-over-child",
      },
    ],
  },

  // Case Manager - People 3
  {
    id: "rs_cm_people_3",
    roleId: "case_manager",
    domain: "people",
    scenario:
      "Two case managers on your team — one Black, one Latina — are in an escalating conflict. The Latina case manager has been requesting that all Spanish-speaking patients be assigned to her, arguing that language concordance improves outcomes. The Black case manager feels this is being used to justify giving her a lighter caseload or implying she can't serve Latino patients. Other team members are taking sides. Your supervisor asks you to help mediate because 'the team respects you.'",
    esScenario:
      "Dos case managers en tu equipo — una afroamericana, una latina — están en un conflicto que va escalando. La case manager latina ha estado pidiendo que todos los pacientes hispanohablantes sean asignados a ella, argumentando que la concordancia lingüística mejora los resultados. La case manager afroamericana siente que esto se está usando para justificar darle una carga de casos más liviana o implicar que no puede atender a pacientes latinos. Otros miembros del equipo están tomando bandos. Tu supervisor te pide que ayudes a mediar porque 'el equipo te respeta.'",
    question: "How do you approach this?",
    esQuestion: "¿Cómo enfocas esto?",
    options: [
      {
        id: "rs_cm_p3_a",
        text: "Agree to mediate but start by listening to each person separately — there are likely legitimate concerns on both sides that have gotten tangled with personal feelings. The Latina CM has a valid point: research shows language concordance does improve health outcomes, and many patients prefer a Spanish-speaking provider. The Black CM also has a valid concern: assignment by language alone can be a proxy for racial sorting and can undermine professional equity. In the mediation, refocus the conversation on patient-centered criteria: 'How do we assign patients in a way that optimizes language access AND distributes caseload fairly AND doesn't reduce either of you to a single dimension of your professional identity?' Propose a solution: use interpreter services and bilingual CHWs to support language access across the team, while assigning by acuity and geography rather than ethnicity. Bring data, not feelings, to the team discussion.",
        esText: "Aceptar mediar pero empezar escuchando a cada persona por separado — probablemente hay preocupaciones legítimas de ambos lados que se han enredado con sentimientos personales. La CM latina tiene un punto válido: la investigación muestra que la concordancia lingüística mejora los resultados de salud, y muchos pacientes prefieren un proveedor que hable español. La CM afroamericana también tiene una preocupación válida: la asignación solo por idioma puede ser un proxy para clasificación racial y puede socavar la equidad profesional. En la mediación, reenfocar la conversación en criterios centrados en el paciente: '¿Cómo asignamos pacientes de una manera que optimice el acceso lingüístico Y distribuya la carga de casos justamente Y no reduzca a ninguna de ustedes a una sola dimensión de su identidad profesional?' Proponer una solución: usar servicios de intérprete y CHWs bilingües para apoyar el acceso lingüístico en todo el equipo, mientras se asigna por agudeza y geografía en lugar de etnicidad. Traer datos, no sentimientos, a la discusión del equipo.",
        score: 4,
        behaviorTag: "equity-mediator",
      },
      {
        id: "rs_cm_p3_b",
        text: "Sit down with both case managers together, establish ground rules for the conversation, let each person share their perspective, and help them find a compromise on patient assignment that both can accept.",
        esText: "Sentarse con ambas case managers juntas, establecer reglas básicas para la conversación, dejar que cada persona comparta su perspectiva, y ayudarlas a encontrar un compromiso en la asignación de pacientes que ambas puedan aceptar.",
        score: 3,
        behaviorTag: "direct-mediator",
      },
      {
        id: "rs_cm_p3_c",
        text: "Tell your supervisor this is a management issue, not a peer mediation issue. Recommend that leadership create a formal patient assignment policy so it's not left to interpersonal negotiation.",
        esText: "Decirle a tu supervisor que esto es un problema de gestión, no un problema de mediación entre pares. Recomendar que el liderazgo cree una política formal de asignación de pacientes para que no se deje a la negociación interpersonal.",
        score: 2,
        behaviorTag: "escalates-upward",
      },
      {
        id: "rs_cm_p3_d",
        text: "Stay out of it — this is a racial dynamics issue that you're not qualified to mediate, and getting involved could make you a target. Let the supervisor handle their own team.",
        esText: "Mantenerte al margen — esto es un problema de dinámicas raciales para el que no estás calificado/a para mediar, e involucrarte podría hacerte un blanco. Dejar que el supervisor maneje su propio equipo.",
        score: 1,
        behaviorTag: "avoids-difficult-conversation",
      },
    ],
  },

  // Case Manager - Execution 2
  {
    id: "rs_cm_execution_2",
    roleId: "case_manager",
    domain: "execution",
    scenario:
      "You discover that a patient you've been case managing for 6 months has been receiving duplicate services — she's enrolled in your FQHC's ECM program AND a health plan's separate care management program AND a county-funded community health program. All three programs are unaware of each other. The patient has three different care plans with conflicting medication lists, and each program is billing for overlapping services. You realize this could be a compliance issue for your FQHC.",
    esScenario:
      "Descubres que una paciente que has estado gestionando por 6 meses ha estado recibiendo servicios duplicados — está inscrita en el programa ECM de tu FQHC Y en un programa separado de gestión de cuidado del plan de salud Y en un programa comunitario de salud financiado por el condado. Los tres programas no saben de los otros. La paciente tiene tres planes de cuidado diferentes con listas de medicamentos conflictivas, y cada programa está facturando por servicios superpuestos. Te das cuenta de que esto podría ser un problema de cumplimiento para tu FQHC.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_cm_e2_a",
        text: "Treat this as both a patient safety issue and a compliance issue — address both simultaneously. First, reconcile the three medication lists immediately to identify conflicts that could be harming the patient. Then alert your supervisor and compliance officer about the duplicate billing risk — CalAIM has specific rules about ECM billing when other care management is active, and your FQHC needs to determine if any claims need to be corrected. Reach out to the other two programs to coordinate: propose a joint care conference to create a single unified care plan and determine which program is best positioned to serve which needs (e.g., your FQHC handles medical coordination, the county program handles housing, the health plan program handles transitions). Document how the duplication occurred so your team can screen for it in future enrollments.",
        esText: "Tratar esto como un problema de seguridad del paciente y de cumplimiento — abordar ambos simultáneamente. Primero, reconciliar las tres listas de medicamentos inmediatamente para identificar conflictos que podrían estar dañando a la paciente. Luego alertar a tu supervisor y oficial de cumplimiento sobre el riesgo de facturación duplicada — CalAIM tiene reglas específicas sobre facturación de ECM cuando otra gestión de cuidado está activa, y tu FQHC necesita determinar si algún reclamo necesita ser corregido. Contactar a los otros dos programas para coordinar: proponer una conferencia de atención conjunta para crear un plan de cuidado único unificado y determinar qué programa está mejor posicionado para atender qué necesidades (ej. tu FQHC maneja coordinación médica, el programa del condado maneja vivienda, el programa del plan de salud maneja transiciones). Documentar cómo ocurrió la duplicación para que tu equipo pueda detectarla en futuros ingresos.",
        score: 4,
        behaviorTag: "compliance-and-coordination",
      },
      {
        id: "rs_cm_e2_b",
        text: "Talk to the patient about the three programs and let her decide which one she wants to keep. Notify your supervisor about the duplicate billing concern and let compliance handle it.",
        esText: "Hablar con la paciente sobre los tres programas y dejar que ella decida cuál quiere mantener. Notificar a tu supervisor sobre la preocupación de facturación duplicada y dejar que cumplimiento lo maneje.",
        score: 3,
        behaviorTag: "partial-coordinator",
      },
      {
        id: "rs_cm_e2_c",
        text: "Disenroll the patient from the other two programs and consolidate everything under your FQHC's ECM program. Notify your supervisor about the billing overlap afterward.",
        esText: "Dar de baja a la paciente de los otros dos programas y consolidar todo bajo el programa ECM de tu FQHC. Notificar a tu supervisor sobre la superposición de facturación después.",
        score: 2,
        behaviorTag: "unilateral-fixer",
      },
      {
        id: "rs_cm_e2_d",
        text: "Keep managing your piece of the patient's care and let the other programs do theirs. It's not your responsibility to coordinate between organizations, and raising the billing issue could create problems for your FQHC.",
        esText: "Seguir gestionando tu parte de la atención de la paciente y dejar que los otros programas hagan lo suyo. No es tu responsabilidad coordinar entre organizaciones, y plantear el problema de facturación podría crear problemas para tu FQHC.",
        score: 1,
        behaviorTag: "ignores-compliance-risk",
      },
    ],
  },

  // Case Manager - Execution 3
  {
    id: "rs_cm_execution_3",
    roleId: "case_manager",
    domain: "execution",
    scenario:
      "You've been working for months to get a patient into a substance use treatment program. She finally got accepted into a 90-day residential program starting Monday. On Friday, she calls you in tears — her landlord just posted a 3-day eviction notice, and if she goes to treatment, she'll lose her apartment. She can't afford first/last/deposit for a new place when she gets out. She's ready to skip treatment to save her apartment.",
    esScenario:
      "Has estado trabajando por meses para conseguir que una paciente entre a un programa de tratamiento por uso de sustancias. Finalmente fue aceptada en un programa residencial de 90 días que comienza el lunes. El viernes, te llama llorando — su propietario acaba de publicar un aviso de desalojo de 3 días, y si va a tratamiento, perderá su apartamento. No puede pagar primer/último mes y depósito para un lugar nuevo cuando salga. Está lista para saltarse el tratamiento para salvar su apartamento.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_cm_e3_a",
        text: "Don't let her choose between treatment and housing — your job is to find a way she can have both. Act immediately: (1) Call a legal aid organization that handles tenant rights — in California, a 3-day notice has specific legal requirements and many are defective or unenforceable. There may be grounds to challenge it. (2) Contact the treatment program to explain the housing emergency — some programs have social workers who can help coordinate, and many residential programs allow patients to maintain a lease during treatment. (3) Explore emergency rental assistance through CalWORKs, county homeless prevention funds, or FQHC community partnerships that could cover rent during her 90-day stay. (4) If the apartment can't be saved, begin planning for transitional housing upon completion. Make the calls today — this can't wait until Monday.",
        esText: "No dejar que elija entre tratamiento y vivienda — tu trabajo es encontrar una manera de que pueda tener ambos. Actuar inmediatamente: (1) Llamar a una organización de asistencia legal que maneje derechos de inquilinos — en California, un aviso de 3 días tiene requisitos legales específicos y muchos son defectuosos o inaplicables. Puede haber bases para impugnarlo. (2) Contactar al programa de tratamiento para explicar la emergencia de vivienda — algunos programas tienen trabajadores sociales que pueden ayudar a coordinar, y muchos programas residenciales permiten que los pacientes mantengan un contrato de alquiler durante el tratamiento. (3) Explorar asistencia de renta de emergencia a través de CalWORKs, fondos de prevención de personas sin hogar del condado, o asociaciones comunitarias del FQHC que podrían cubrir la renta durante su estadía de 90 días. (4) Si el apartamento no se puede salvar, comenzar a planificar vivienda de transición al completar el programa. Hacer las llamadas hoy — esto no puede esperar hasta el lunes.",
        score: 4,
        behaviorTag: "refuses-false-choice",
      },
      {
        id: "rs_cm_e3_b",
        text: "Encourage her to go to treatment as planned — her health is the priority. Help her pack essentials and store her belongings. Start looking for housing options for when she completes the program in 90 days.",
        esText: "Animarla a ir al tratamiento como estaba planeado — su salud es la prioridad. Ayudarla a empacar lo esencial y guardar sus pertenencias. Empezar a buscar opciones de vivienda para cuando complete el programa en 90 días.",
        score: 3,
        behaviorTag: "treatment-first",
      },
      {
        id: "rs_cm_e3_c",
        text: "Agree that she should postpone treatment to deal with the housing situation first. Help her fight the eviction, and once her housing is stable, reapply for the treatment program.",
        esText: "Estar de acuerdo en que debería posponer el tratamiento para lidiar con la situación de vivienda primero. Ayudarla a pelear el desalojo, y una vez que su vivienda esté estable, volver a solicitar el programa de tratamiento.",
        score: 2,
        behaviorTag: "housing-first-but-delays-treatment",
      },
      {
        id: "rs_cm_e3_d",
        text: "Tell her the decision is hers and you'll support whatever she chooses. Present the pros and cons of each option and let her figure it out.",
        esText: "Decirle que la decisión es suya y que la apoyarás en lo que elija. Presentar los pros y contras de cada opción y dejar que ella lo resuelva.",
        score: 1,
        behaviorTag: "passive-neutral",
      },
    ],
  },

  // Case Manager - Growth 2
  {
    id: "rs_cm_growth_2",
    roleId: "case_manager",
    domain: "growth",
    scenario:
      "Your FQHC is implementing a new data-driven case management model where every patient interaction must be documented using standardized outcome measures — PHQ-9 for depression, PROMIS for functional status, and a custom SDOH dashboard. You'll need to enter data in real-time during patient meetings instead of writing narrative notes afterward. You've been doing narrative case notes for 8 years and consider them essential for capturing the nuances of each patient's story. Several colleagues share your frustration and are openly resisting the change.",
    esScenario:
      "Tu FQHC está implementando un nuevo modelo de gestión de casos basado en datos donde cada interacción con pacientes debe documentarse usando medidas de resultados estandarizadas — PHQ-9 para depresión, PROMIS para estado funcional, y un tablero personalizado de SDOH. Necesitarás ingresar datos en tiempo real durante las reuniones con pacientes en lugar de escribir notas narrativas después. Has estado haciendo notas narrativas de caso por 8 años y las consideras esenciales para capturar los matices de la historia de cada paciente. Varios colegas comparten tu frustración y están resistiéndose abiertamente al cambio.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_cm_g2_a",
        text: "Acknowledge your resistance honestly but challenge your own assumptions. Ask yourself: are narrative notes actually better for patients, or are they better for you because they're comfortable? The truth is probably both — narratives capture nuance, but standardized measures produce data that can demonstrate impact, identify patterns across patients, and justify funding for your program. The ideal approach is to adopt the new tools while preserving what works: learn the outcome measures thoroughly, practice integrating them conversationally during patient meetings rather than making them feel like a checklist, and add brief narrative context where the numbers alone don't tell the story. Bring a constructive proposal to leadership: 'I'll champion the new model, but here's how we can preserve clinical narrative within the framework.' That's more effective than joining the resistance.",
        esText: "Reconocer tu resistencia honestamente pero desafiar tus propias suposiciones. Preguntarte: ¿las notas narrativas son realmente mejores para los pacientes, o son mejores para ti porque son cómodas? La verdad probablemente es ambas — las narrativas capturan matices, pero las medidas estandarizadas producen datos que pueden demostrar impacto, identificar patrones entre pacientes, y justificar financiamiento para tu programa. El enfoque ideal es adoptar las nuevas herramientas mientras preservas lo que funciona: aprender las medidas de resultados a fondo, practicar integrarlas conversacionalmente durante las reuniones con pacientes en lugar de hacerlas sentir como una lista de verificación, y agregar contexto narrativo breve donde los números solos no cuentan la historia. Traer una propuesta constructiva al liderazgo: 'Promoveré el nuevo modelo, pero así es como podemos preservar la narrativa clínica dentro del marco.' Eso es más efectivo que unirse a la resistencia.",
        score: 4,
        behaviorTag: "adaptive-innovator",
      },
      {
        id: "rs_cm_g2_b",
        text: "Go along with the change and learn the new tools. Keep personal narrative notes on the side for your own reference, and use the standardized measures as required.",
        esText: "Ir con el cambio y aprender las nuevas herramientas. Mantener notas narrativas personales al lado para tu propia referencia, y usar las medidas estandarizadas como se requiere.",
        score: 3,
        behaviorTag: "parallel-tracker",
      },
      {
        id: "rs_cm_g2_c",
        text: "Voice your concerns to leadership — standardized outcome measures can't capture the complexity of case management work, and real-time data entry during patient meetings undermines rapport. Ask them to reconsider the approach.",
        esText: "Expresar tus preocupaciones al liderazgo — las medidas de resultados estandarizadas no pueden capturar la complejidad del trabajo de gestión de casos, y la entrada de datos en tiempo real durante reuniones con pacientes socava la conexión. Pedirles que reconsideren el enfoque.",
        score: 2,
        behaviorTag: "resists-with-rationale",
      },
      {
        id: "rs_cm_g2_d",
        text: "Join your colleagues in resisting the change. You've been doing this work for 8 years and know what works. Standardized measures are management's way of reducing complex human work to checkboxes. Continue with narrative notes.",
        esText: "Unirte a tus colegas en resistir el cambio. Has estado haciendo este trabajo por 8 años y sabes lo que funciona. Las medidas estandarizadas son la forma de la gerencia de reducir trabajo humano complejo a casillas de verificación. Continuar con notas narrativas.",
        score: 1,
        behaviorTag: "entrenched-resister",
      },
    ],
  },

  // Case Manager - Growth 3
  {
    id: "rs_cm_growth_3",
    roleId: "case_manager",
    domain: "growth",
    scenario:
      "You've been passed over for a supervisor position that went to a colleague with fewer years of case management experience but who has a master's degree in social work (MSW). Your supervisor explains that the MSW was required for the role and encourages you to pursue the degree. You have a bachelor's in psychology, 10 years of FQHC case management experience, and strong patient outcomes — but no graduate degree. The closest MSW program is 40 minutes away and costs $30,000 for a part-time evening program.",
    esScenario:
      "Te pasaron por alto para una posición de supervisor que fue a un colega con menos años de experiencia en gestión de casos pero que tiene una maestría en trabajo social (MSW). Tu supervisor explica que el MSW era un requisito para el rol y te anima a buscar el título. Tienes una licenciatura en psicología, 10 años de experiencia en gestión de casos en FQHC, y fuertes resultados con pacientes — pero no un título de posgrado. El programa de MSW más cercano está a 40 minutos y cuesta $30,000 para un programa de medio tiempo vespertino.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_cm_g3_a",
        text: "Feel the frustration but channel it into strategy. First, evaluate whether the MSW is actually the right path or if there are alternative credentials that would open supervisory doors (e.g., LCSW with clinical supervision hours, Certified Case Manager [CCM], or a healthcare administration certificate). Research whether your employer offers tuition reimbursement, whether the MSW program offers field placement credit for your existing FQHC experience, and whether online/hybrid options exist that are more feasible. Talk to the colleague who got the job — not with resentment, but to understand what the MSW added to their toolkit. If the MSW is the right move, build a 3-year plan: save, apply, negotiate employer support. If not, identify what supervisory skills you need to develop and pursue them through other channels.",
        esText: "Sentir la frustración pero canalizarla en estrategia. Primero, evaluar si el MSW es realmente el camino correcto o si hay credenciales alternativas que abrirían puertas de supervisión (ej. LCSW con horas de supervisión clínica, Case Manager Certificado [CCM], o un certificado de administración de salud). Investigar si tu empleador ofrece reembolso de matrícula, si el programa de MSW ofrece crédito de práctica de campo por tu experiencia existente en FQHC, y si existen opciones en línea/híbridas que sean más factibles. Hablar con el colega que obtuvo el puesto — no con resentimiento, sino para entender qué agregó el MSW a su conjunto de herramientas. Si el MSW es el movimiento correcto, construir un plan de 3 años: ahorrar, aplicar, negociar apoyo del empleador. Si no, identificar qué habilidades de supervisión necesitas desarrollar y buscarlas a través de otros canales.",
        score: 4,
        behaviorTag: "strategic-career-architect",
      },
      {
        id: "rs_cm_g3_b",
        text: "Start researching MSW programs and financial aid options. Ask your supervisor if the FQHC would support you through tuition assistance. Begin the application process for the next academic year.",
        esText: "Empezar a investigar programas de MSW y opciones de ayuda financiera. Preguntar a tu supervisor si el FQHC te apoyaría con asistencia de matrícula. Comenzar el proceso de solicitud para el próximo año académico.",
        score: 3,
        behaviorTag: "action-taker",
      },
      {
        id: "rs_cm_g3_c",
        text: "Accept the decision but feel demoralized. Focus on your current caseload and stop volunteering for extra projects or leadership opportunities — clearly experience doesn't count as much as credentials here.",
        esText: "Aceptar la decisión pero sentirte desmoralizado/a. Enfocarte en tu carga de casos actual y dejar de ofrecerte para proyectos extra u oportunidades de liderazgo — claramente la experiencia no cuenta tanto como las credenciales aquí.",
        score: 2,
        behaviorTag: "withdraws-effort",
      },
      {
        id: "rs_cm_g3_d",
        text: "Start looking for supervisor positions at other FQHCs or organizations that value experience over degrees. You've been loyal to this FQHC for 10 years and they passed you over — it's time to move on.",
        esText: "Empezar a buscar posiciones de supervisor en otros FQHCs u organizaciones que valoren la experiencia sobre los títulos. Has sido leal a este FQHC por 10 años y te pasaron por alto — es hora de seguir adelante.",
        score: 1,
        behaviorTag: "flight-over-growth",
      },
    ],
  },

  // Case Manager - Transition 2
  {
    id: "rs_cm_transition_2",
    roleId: "case_manager",
    domain: "transition",
    scenario:
      "You've been hired as a Case Manager at an FQHC that's launching a brand-new Complex Care Management (CCM) program — you're the first and only hire. There's no existing infrastructure: no assessment tools, no referral workflows, no community partner MOUs, no EHR templates for CCM documentation, and no existing caseload. Your supervisor is the COO, who has operational expertise but no clinical background. She tells you, 'We got the grant funding. Build the program. We need 25 patients enrolled in 90 days.'",
    esScenario:
      "Te contrataron como Case Manager en un FQHC que está lanzando un programa completamente nuevo de Gestión de Cuidado Complejo (CCM) — eres la primera y única contratación. No hay infraestructura existente: sin herramientas de evaluación, sin flujos de referencia, sin MOUs con socios comunitarios, sin plantillas de EHR para documentación de CCM, y sin carga de casos existente. Tu supervisora es la COO, quien tiene experiencia operacional pero no antecedentes clínicos. Te dice, 'Conseguimos el financiamiento de la subvención. Construye el programa. Necesitamos 25 pacientes inscritos en 90 días.'",
    question: "How do you build from scratch?",
    esQuestion: "¿Cómo construyes desde cero?",
    options: [
      {
        id: "rs_cm_t2_a",
        text: "Break the 90-day goal into three 30-day phases. Month 1 (Build): create the program infrastructure — develop intake criteria and assessment tools (adapt existing validated instruments like PRAPARE for SDOH screening), build EHR documentation templates, identify and reach out to 5-10 key community partners (housing authorities, behavioral health agencies, food banks, legal aid), and draft referral workflows. Simultaneously, start identifying potential patients by mining the EHR for high-utilizers (frequent ED visits, multiple chronic conditions, social complexity). Month 2 (Launch): begin enrolling the highest-acuity patients first, establish the care planning workflow, set up weekly case conferences with the care team. Month 3 (Scale): reach 25 enrollments, refine workflows based on what's working, create a dashboard to track outcomes for the grant deliverables. Present the plan to the COO with milestones so she can track progress and flag resource needs early.",
        esText: "Dividir la meta de 90 días en tres fases de 30 días. Mes 1 (Construir): crear la infraestructura del programa — desarrollar criterios de admisión y herramientas de evaluación (adaptar instrumentos validados existentes como PRAPARE para evaluación de SDOH), construir plantillas de documentación de EHR, identificar y contactar 5-10 socios comunitarios clave (autoridades de vivienda, agencias de salud conductual, bancos de alimentos, asistencia legal), y redactar flujos de referencia. Simultáneamente, comenzar a identificar pacientes potenciales minando el EHR para altos utilizadores (visitas frecuentes a urgencias, múltiples condiciones crónicas, complejidad social). Mes 2 (Lanzar): comenzar a inscribir los pacientes de mayor agudeza primero, establecer el flujo de planificación de cuidado, establecer conferencias de caso semanales con el equipo de atención. Mes 3 (Escalar): alcanzar 25 inscripciones, refinar flujos basados en lo que funciona, crear un tablero para rastrear resultados para los entregables de la subvención. Presentar el plan a la COO con hitos para que pueda rastrear progreso y señalar necesidades de recursos temprano.",
        score: 4,
        behaviorTag: "program-architect",
      },
      {
        id: "rs_cm_t2_b",
        text: "Start by identifying and enrolling patients right away — you can build the documentation and workflows as you go. Ask the providers to refer high-need patients, and begin case management immediately. Refine the program structure based on what you learn from the first patients.",
        esText: "Empezar por identificar e inscribir pacientes de inmediato — puedes construir la documentación y flujos sobre la marcha. Pedir a los proveedores que refieran pacientes de alta necesidad, y comenzar la gestión de casos inmediatamente. Refinar la estructura del programa basado en lo que aprendes de los primeros pacientes.",
        score: 3,
        behaviorTag: "learns-by-doing",
      },
      {
        id: "rs_cm_t2_c",
        text: "Tell the COO that 90 days is unrealistic for a brand-new program with zero infrastructure. Request a 6-month ramp-up period and additional staff before you can meet the enrollment target.",
        esText: "Decirle a la COO que 90 días es poco realista para un programa completamente nuevo sin infraestructura. Solicitar un período de preparación de 6 meses y personal adicional antes de que puedas cumplir la meta de inscripciones.",
        score: 2,
        behaviorTag: "pushes-back-without-plan",
      },
      {
        id: "rs_cm_t2_d",
        text: "Feel overwhelmed by the scope and start second-guessing whether you should have taken the job. Research what other FQHCs' CCM programs look like, but struggle to take the first concrete step because everything seems to depend on everything else.",
        esText: "Sentirte abrumado/a por el alcance y empezar a dudar si debiste tomar el trabajo. Investigar cómo se ven los programas CCM de otros FQHCs, pero luchar para dar el primer paso concreto porque todo parece depender de todo lo demás.",
        score: 1,
        behaviorTag: "analysis-paralysis",
      },
    ],
  },

  // Case Manager - Transition 3
  {
    id: "rs_cm_transition_3",
    roleId: "case_manager",
    domain: "transition",
    scenario:
      "You're transitioning from a county behavioral health department to an FQHC case management role. At the county, you had a small caseload (15 patients), deep resources (in-house psychiatrists, housing specialists, benefits coordinators), and a well-defined scope. At the FQHC, your caseload is 35 patients, you're expected to handle medical, behavioral, and social needs, and the resources are thinner — the behavioral health counselor is part-time, there's no housing specialist, and community referral relationships haven't been formalized. A week in, you realize that three of your patients need psychiatric medication management but the FQHC doesn't have a psychiatrist, and the county wait for a psychiatry referral is 4 months.",
    esScenario:
      "Estás transicionando de un departamento de salud conductual del condado a un rol de gestión de casos en un FQHC. En el condado, tenías una carga de casos pequeña (15 pacientes), recursos profundos (psiquiatras internos, especialistas de vivienda, coordinadores de beneficios), y un alcance bien definido. En el FQHC, tu carga de casos es de 35 pacientes, se espera que manejes necesidades médicas, conductuales, y sociales, y los recursos son más escasos — el consejero de salud conductual es de medio tiempo, no hay especialista de vivienda, y las relaciones de referencia comunitaria no han sido formalizadas. Una semana después, te das cuenta de que tres de tus pacientes necesitan manejo de medicación psiquiátrica pero el FQHC no tiene psiquiatra, y la espera del condado para una referencia de psiquiatría es de 4 meses.",
    question: "How do you adapt?",
    esQuestion: "¿Cómo te adaptas?",
    options: [
      {
        id: "rs_cm_t3_a",
        text: "Recognize that the FQHC model requires a different operating mindset — you need to be more resourceful with less, broader in scope, and more creative with community partnerships. For the immediate psychiatric need: ask the FQHC's medical providers if any are comfortable managing basic psychotropic medications (many FQHC NPs and family medicine physicians do this), explore whether a telepsychiatry consultation service like Mindoula or a Project ECHO psychiatric mentoring model could bridge the gap, and leverage your county contacts to see if any former colleagues can expedite the referrals. For the structural gaps: start building a community resource guide specific to your patients' zip codes — identify housing programs, food assistance, legal aid, peer support — because without in-house specialists, your referral network IS your resource. Have an honest conversation with your supervisor about caseload: 35 patients with this breadth of needs and no support infrastructure may not be sustainable, and you need data to make that case.",
        esText: "Reconocer que el modelo FQHC requiere una mentalidad operativa diferente — necesitas ser más ingenioso/a con menos, más amplio/a en alcance, y más creativo/a con asociaciones comunitarias. Para la necesidad psiquiátrica inmediata: preguntar a los proveedores médicos del FQHC si alguno se siente cómodo manejando medicaciones psicotrópicas básicas (muchos NPs y médicos de familia de FQHC hacen esto), explorar si un servicio de consulta de telepsiquiatría como Mindoula o un modelo de mentoría psiquiátrica Project ECHO podría llenar la brecha, y usar tus contactos del condado para ver si algún antiguo colega puede agilizar las referencias. Para las brechas estructurales: comenzar a construir una guía de recursos comunitarios específica para los códigos postales de tus pacientes — identificar programas de vivienda, asistencia alimentaria, asistencia legal, apoyo de pares — porque sin especialistas internos, tu red de referencias ES tu recurso. Tener una conversación honesta con tu supervisor sobre la carga de casos: 35 pacientes con esta amplitud de necesidades y sin infraestructura de apoyo puede no ser sostenible, y necesitas datos para hacer ese caso.",
        score: 4,
        behaviorTag: "resourceful-adapter",
      },
      {
        id: "rs_cm_t3_b",
        text: "Focus on stabilizing your highest-need patients first and building referral relationships with community organizations. Accept that the FQHC model is different and you'll need to learn a broader skill set over time.",
        esText: "Enfocarte en estabilizar a tus pacientes de mayor necesidad primero y construir relaciones de referencia con organizaciones comunitarias. Aceptar que el modelo FQHC es diferente y que necesitarás aprender un conjunto de habilidades más amplio con el tiempo.",
        score: 3,
        behaviorTag: "steady-adapter",
      },
      {
        id: "rs_cm_t3_c",
        text: "Talk to your supervisor about the resource gaps and request that the FQHC hire a psychiatrist or at least a full-time behavioral health provider before expecting you to manage patients with serious psychiatric needs.",
        esText: "Hablar con tu supervisor sobre las brechas de recursos y solicitar que el FQHC contrate un psiquiatra o al menos un proveedor de salud conductual de tiempo completo antes de esperar que manejes pacientes con necesidades psiquiátricas serias.",
        score: 2,
        behaviorTag: "resource-requester",
      },
      {
        id: "rs_cm_t3_d",
        text: "Realize that the FQHC is under-resourced compared to the county and start questioning whether you should have stayed. The patients here need more than you can provide without proper support, and you're being set up to fail.",
        esText: "Darte cuenta de que el FQHC tiene menos recursos comparado con el condado y empezar a cuestionar si debiste haberte quedado. Los pacientes aquí necesitan más de lo que puedes proveer sin apoyo adecuado, y te están poniendo en posición de fracasar.",
        score: 1,
        behaviorTag: "regrets-transition",
      },
    ],
  },

  // ============================================================
  //  BATCH 2: Additional questions for BH, RN, PS, RC
  //  (10 per role, 2 per domain)
  // ============================================================
  // ============================================================
  // Behavioral Health Specialist — Additional Questions (10)
  // ============================================================

  // Behavioral Health Specialist - Mission 2
  {
    id: "rs_bh_mission_2",
    roleId: "behavioral_health",
    domain: "mission",
    scenario:
      "Your FQHC serves a large immigrant community where mental health is heavily stigmatized. You notice that PHQ-9 screening scores are suspiciously low across the board — patients are scoring 0-4 even when providers suspect significant depression. The medical director asks you to 'fix the screening process' because UDS behavioral health metrics are suffering.",
    esScenario:
      "Tu FQHC sirve a una gran comunidad inmigrante donde la salud mental es fuertemente estigmatizada. Notas que los puntajes de detección PHQ-9 son sospechosamente bajos en general — los pacientes obtienen 0-4 incluso cuando los proveedores sospechan depresión significativa. El director médico te pide que 'arregles el proceso de detección' porque las métricas UDS de salud conductual están sufriendo.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_bh_m2_a",
        text: "Reframe the problem: the screening tool isn't broken — the cultural context is being ignored. Propose training MAs on trauma-informed administration of the PHQ-9, develop culturally adapted language for screening questions (working with bilingual staff to normalize the concepts), introduce the screening as part of 'whole-body health' rather than 'mental health,' and track pre/post data to show improvement in detection rates",
        esText: "Replantear el problema: la herramienta de detección no está rota — el contexto cultural está siendo ignorado. Proponer capacitación para los MAs sobre administración informada por trauma del PHQ-9, desarrollar lenguaje culturalmente adaptado para las preguntas de detección (trabajando con personal bilingüe para normalizar los conceptos), introducir la detección como parte de 'salud integral' en vez de 'salud mental,' y rastrear datos pre/post para mostrar mejora en las tasas de detección",
        score: 4,
        behaviorTag: "culturally-informed-systems-thinker",
      },
      {
        id: "rs_bh_m2_b",
        text: "Suggest switching to a different validated screening tool that may be more culturally appropriate, and offer to train the MAs on proper administration technique",
        esText: "Sugerir cambiar a una herramienta de detección validada diferente que pueda ser más culturalmente apropiada, y ofrecer capacitar a los MAs en la técnica de administración correcta",
        score: 3,
        behaviorTag: "tool-focused-adapter",
      },
      {
        id: "rs_bh_m2_c",
        text: "Have the BH team administer the PHQ-9 directly instead of MAs, since you can build more rapport and get more honest answers from patients",
        esText: "Hacer que el equipo de BH administre el PHQ-9 directamente en vez de los MAs, ya que puedes generar más rapport y obtener respuestas más honestas de los pacientes",
        score: 2,
        behaviorTag: "bottleneck-creator",
      },
      {
        id: "rs_bh_m2_d",
        text: "Tell the medical director that low scores reflect the patient population and you can't force people to disclose mental health symptoms — the UDS metrics will have to reflect reality",
        esText: "Decirle al director médico que los puntajes bajos reflejan la población de pacientes y no puedes forzar a la gente a revelar síntomas de salud mental — las métricas UDS tendrán que reflejar la realidad",
        score: 1,
        behaviorTag: "resigned-acceptance",
      },
    ],
  },

  // Behavioral Health Specialist - Mission 3
  {
    id: "rs_bh_mission_3",
    roleId: "behavioral_health",
    domain: "mission",
    scenario:
      "A 16-year-old patient discloses during a session that they are using fentanyl recreationally with friends. They beg you not to tell their parents, saying 'They'll kick me out — I'll end up on the street.' California's minor consent laws allow this patient to consent to their own substance use treatment. You also know the patient's mother, who is a longtime FQHC patient and deeply involved in their child's care.",
    esScenario:
      "Un paciente de 16 años revela durante una sesión que está usando fentanilo recreativamente con amigos. Te ruegan que no le digas a sus padres, diciendo 'Me van a echar — voy a terminar en la calle.' Las leyes de consentimiento de menores de California permiten que este paciente consienta su propio tratamiento de uso de sustancias. También conoces a la madre del paciente, quien es paciente de largo tiempo del FQHC y muy involucrada en el cuidado de su hijo/a.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_bh_m3_a",
        text: "Honor the patient's confidentiality under California minor consent law while addressing the clinical urgency. Assess for immediate safety — frequency of use, knowledge of Narcan, overdose risk factors. Develop a harm reduction plan that includes naloxone access and safety education. Explore the patient's fear about parental response and work toward a supported disclosure when the patient is ready, while connecting them to adolescent substance use resources at your FQHC or through county behavioral health",
        esText: "Respetar la confidencialidad del paciente bajo la ley de consentimiento de menores de California mientras se aborda la urgencia clínica. Evaluar la seguridad inmediata — frecuencia de uso, conocimiento de Narcan, factores de riesgo de sobredosis. Desarrollar un plan de reducción de daños que incluya acceso a naloxona y educación de seguridad. Explorar el temor del paciente sobre la respuesta de los padres y trabajar hacia una revelación apoyada cuando el paciente esté listo, mientras se conecta con recursos de uso de sustancias para adolescentes en tu FQHC o a través de salud conductual del condado",
        score: 4,
        behaviorTag: "legally-grounded-harm-reducer",
      },
      {
        id: "rs_bh_m3_b",
        text: "Maintain confidentiality per California law, focus on building a treatment plan with the patient, and strongly encourage them to include a trusted adult in their recovery process over time",
        esText: "Mantener la confidencialidad según la ley de California, enfocarse en construir un plan de tratamiento con el paciente, y animarles fuertemente a incluir un adulto de confianza en su proceso de recuperación con el tiempo",
        score: 3,
        behaviorTag: "clinically-appropriate",
      },
      {
        id: "rs_bh_m3_c",
        text: "Tell the patient you're legally required to inform their parents about drug use involving a life-threatening substance like fentanyl — their safety overrides confidentiality",
        esText: "Decirle al paciente que estás legalmente obligado/a a informar a sus padres sobre el uso de drogas que involucran una sustancia potencialmente mortal como el fentanilo — su seguridad anula la confidencialidad",
        score: 2,
        behaviorTag: "misapplied-duty",
      },
      {
        id: "rs_bh_m3_d",
        text: "Document the disclosure carefully in the chart and refer them to a substance use specialist — fentanyl is beyond your scope and you don't want the liability",
        esText: "Documentar la revelación cuidadosamente en el expediente y referirlos a un especialista en uso de sustancias — el fentanilo está más allá de tu alcance y no quieres la responsabilidad",
        score: 1,
        behaviorTag: "liability-driven-avoidant",
      },
    ],
  },

  // Behavioral Health Specialist - People 2
  {
    id: "rs_bh_people_2",
    roleId: "behavioral_health",
    domain: "people",
    scenario:
      "A primary care provider pulls you aside and says, 'I've been prescribing Xanax to Mrs. Garcia for 10 years and she's doing fine on it. Stop trying to get my patients off benzos — that's my medical decision, not yours.' You've been flagging long-term benzodiazepine use in older patients because of fall risk and cognitive decline data, and you believe a slow taper with CBT support could benefit several of these patients.",
    esScenario:
      "Un proveedor de atención primaria te aparta y dice: 'He estado recetando Xanax a la Sra. García por 10 años y le va bien. Deja de intentar sacar a mis pacientes de los benzos — esa es mi decisión médica, no la tuya.' Has estado señalando el uso de benzodiazepinas a largo plazo en pacientes mayores por datos de riesgo de caídas y deterioro cognitivo, y crees que una reducción gradual con apoyo de TCC podría beneficiar a varios de estos pacientes.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_bh_p2_a",
        text: "Acknowledge the provider's clinical authority and long relationship with the patient. Reframe your role: you're not overriding prescribing decisions — you're offering adjunct behavioral interventions that could reduce the need for medication over time. Share the evidence on benzo risks in older adults (falls, cognitive decline, Beers Criteria) and propose a collaborative pilot: identify 2-3 willing patients to try CBT anxiety management alongside a provider-directed slow taper, with shared outcome tracking",
        esText: "Reconocer la autoridad clínica del proveedor y su larga relación con la paciente. Replantear tu rol: no estás anulando decisiones de prescripción — estás ofreciendo intervenciones conductuales complementarias que podrían reducir la necesidad de medicación con el tiempo. Compartir la evidencia sobre riesgos de benzos en adultos mayores (caídas, deterioro cognitivo, Criterios de Beers) y proponer un piloto colaborativo: identificar 2-3 pacientes dispuestos a probar manejo de ansiedad con TCC junto con una reducción gradual dirigida por el proveedor, con seguimiento compartido de resultados",
        score: 4,
        behaviorTag: "evidence-based-collaborator",
      },
      {
        id: "rs_bh_p2_b",
        text: "Back off the benzo topic with this provider, but bring the broader concern about long-term benzodiazepine use in elderly patients to the medical director or quality committee for a clinic-wide policy discussion",
        esText: "Retirarse del tema de benzos con este proveedor, pero llevar la preocupación más amplia sobre el uso de benzodiazepinas a largo plazo en pacientes mayores al director médico o comité de calidad para una discusión de política a nivel clínica",
        score: 3,
        behaviorTag: "strategic-escalator",
      },
      {
        id: "rs_bh_p2_c",
        text: "Respect the provider's position — they know their patients and prescribing is outside your scope. Focus your attention on patients whose providers are receptive to BH collaboration",
        esText: "Respetar la posición del proveedor — ellos conocen a sus pacientes y la prescripción está fuera de tu alcance. Enfocar tu atención en pacientes cuyos proveedores son receptivos a la colaboración de BH",
        score: 2,
        behaviorTag: "path-of-least-resistance",
      },
      {
        id: "rs_bh_p2_d",
        text: "Drop it entirely — the provider is right that prescribing decisions aren't your call, and pushing the issue will damage your working relationship",
        esText: "Dejarlo por completo — el proveedor tiene razón en que las decisiones de prescripción no son tu decisión, y insistir dañará tu relación de trabajo",
        score: 1,
        behaviorTag: "conflict-avoidant-deferral",
      },
    ],
  },

  // Behavioral Health Specialist - People 3
  {
    id: "rs_bh_people_3",
    roleId: "behavioral_health",
    domain: "people",
    scenario:
      "You overhear a medical assistant in the break room saying about a patient, 'That lady is in here every week crying about the same thing. She's just looking for attention — there's nothing actually wrong with her.' You know this patient has complex PTSD from domestic violence and has been making slow but real progress in therapy with you.",
    esScenario:
      "Escuchas a un asistente médico en la sala de descanso decir sobre una paciente: 'Esa señora viene cada semana llorando por lo mismo. Solo busca atención — no tiene nada realmente malo.' Sabes que esta paciente tiene TEPT complejo por violencia doméstica y ha estado haciendo un progreso lento pero real en terapia contigo.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_bh_p3_a",
        text: "Address it in the moment without breaking patient confidentiality. Say something like, 'I can't discuss her case, but I want to flag that comments like that reflect stigma about mental health — patients who come in frequently often have conditions we can't see. How we talk about patients matters, even in the break room.' Later, suggest to your clinic manager that the team could benefit from a brief training on trauma-informed language and implicit bias toward frequent utilizers",
        esText: "Abordarlo en el momento sin romper la confidencialidad del paciente. Decir algo como: 'No puedo discutir su caso, pero quiero señalar que comentarios así reflejan estigma sobre salud mental — los pacientes que vienen frecuentemente a menudo tienen condiciones que no podemos ver. Cómo hablamos de los pacientes importa, incluso en la sala de descanso.' Después, sugerir al gerente de clínica que el equipo se beneficiaría de una capacitación breve sobre lenguaje informado por trauma y sesgo implícito hacia usuarios frecuentes",
        score: 4,
        behaviorTag: "stigma-interrupter",
      },
      {
        id: "rs_bh_p3_b",
        text: "Pull the MA aside privately and explain — without sharing diagnosis details — that patients who seem to be 'attention-seeking' often have real conditions that present differently than physical illness, and ask them to be mindful of how they talk about patients",
        esText: "Apartar al MA en privado y explicar — sin compartir detalles del diagnóstico — que los pacientes que parecen 'buscar atención' a menudo tienen condiciones reales que se presentan diferente a las enfermedades físicas, y pedirles que sean conscientes de cómo hablan de los pacientes",
        score: 3,
        behaviorTag: "private-educator",
      },
      {
        id: "rs_bh_p3_c",
        text: "Don't say anything in the moment — people vent in the break room and it's not your place to police conversations. But make a mental note in case a pattern of disrespectful comments emerges",
        esText: "No decir nada en el momento — la gente se desahoga en la sala de descanso y no es tu lugar supervisar las conversaciones. Pero hacer una nota mental en caso de que emerja un patrón de comentarios irrespetuosos",
        score: 2,
        behaviorTag: "passive-observer",
      },
      {
        id: "rs_bh_p3_d",
        text: "Report the MA to the clinic manager for an HIPAA-related concern — they're discussing a patient's visit patterns in a common area",
        esText: "Reportar al MA ante el gerente de clínica por una preocupación relacionada con HIPAA — están discutiendo los patrones de visita de un paciente en un área común",
        score: 1,
        behaviorTag: "punitive-escalator",
      },
    ],
  },

  // Behavioral Health Specialist - Execution 2
  {
    id: "rs_bh_execution_2",
    roleId: "behavioral_health",
    domain: "execution",
    scenario:
      "Your FQHC's ECM program has enrolled 45 patients with serious mental illness, but only 12 are actively engaging in behavioral health services. The ECM care coordinators say patients agree to enroll for the case management benefits (housing help, food assistance) but refuse BH appointments. Your clinic director wants the engagement rate above 60% to justify the program's staffing costs to leadership.",
    esScenario:
      "El programa ECM de tu FQHC ha inscrito a 45 pacientes con enfermedad mental grave, pero solo 12 están participando activamente en servicios de salud conductual. Los coordinadores de cuidado ECM dicen que los pacientes aceptan inscribirse por los beneficios de gestión de casos (ayuda con vivienda, asistencia alimentaria) pero rechazan las citas de BH. Tu directora de clínica quiere la tasa de participación por encima del 60% para justificar los costos de personal del programa ante el liderazgo.",
    question: "How do you increase engagement?",
    esQuestion: "¿Cómo aumentas la participación?",
    options: [
      {
        id: "rs_bh_e2_a",
        text: "Redesign the engagement model: instead of asking patients to come to you, embed BH into the ECM workflow — join care coordination home visits, provide curbside consultations during housing appointments, and offer brief check-ins during food pantry pickups. Train ECM coordinators on motivational interviewing to reduce BH resistance. Track engagement using broader metrics (any BH contact, not just formal appointments) to capture the real picture and present to leadership",
        esText: "Rediseñar el modelo de participación: en vez de pedir a los pacientes que vengan a ti, integrar BH en el flujo de trabajo ECM — unirse a visitas domiciliarias de coordinación de cuidado, proporcionar consultas informales durante citas de vivienda, y ofrecer chequeos breves durante recogidas de despensa. Capacitar a coordinadores ECM en entrevista motivacional para reducir la resistencia a BH. Rastrear participación usando métricas más amplias (cualquier contacto de BH, no solo citas formales) para capturar el panorama real y presentar al liderazgo",
        score: 4,
        behaviorTag: "model-redesigner",
      },
      {
        id: "rs_bh_e2_b",
        text: "Work with ECM coordinators to identify the top barriers to BH engagement for each patient (stigma, transportation, scheduling conflicts) and develop individualized outreach plans. Offer telehealth as an alternative for patients who won't come to the clinic",
        esText: "Trabajar con coordinadores ECM para identificar las principales barreras de participación en BH para cada paciente (estigma, transporte, conflictos de horario) y desarrollar planes de alcance individualizados. Ofrecer telesalud como alternativa para pacientes que no vendrán a la clínica",
        score: 3,
        behaviorTag: "barrier-reducer",
      },
      {
        id: "rs_bh_e2_c",
        text: "Create a standing BH group session specifically for ECM patients — a drop-in wellness group that doesn't feel like 'therapy' — and count attendance toward the engagement metric",
        esText: "Crear una sesión grupal permanente de BH específicamente para pacientes ECM — un grupo de bienestar sin cita que no se sienta como 'terapia' — y contar la asistencia hacia la métrica de participación",
        score: 2,
        behaviorTag: "metric-focused-workaround",
      },
      {
        id: "rs_bh_e2_d",
        text: "Tell the clinic director that 60% engagement is unrealistic for SMI patients and that forcing behavioral health participation undermines patient autonomy and the recovery model",
        esText: "Decirle a la directora de clínica que 60% de participación es irreal para pacientes con enfermedad mental grave y que forzar la participación en salud conductual socava la autonomía del paciente y el modelo de recuperación",
        score: 1,
        behaviorTag: "metric-rejector",
      },
    ],
  },

  // Behavioral Health Specialist - Execution 3
  {
    id: "rs_bh_execution_3",
    roleId: "behavioral_health",
    domain: "execution",
    scenario:
      "During a routine therapy session, your patient — a 35-year-old mother of three — tells you she has been stockpiling her Zoloft and has written letters to her children. She says she hasn't decided anything yet but 'wants to be prepared in case things get worse.' Her husband recently lost his job and they received an eviction notice last week. She asks you to promise not to tell anyone because 'they'll take my kids away.'",
    esScenario:
      "Durante una sesión de terapia rutinaria, tu paciente — una madre de tres hijos de 35 años — te dice que ha estado acumulando su Zoloft y ha escrito cartas a sus hijos. Dice que no ha decidido nada todavía pero 'quiere estar preparada en caso de que las cosas empeoren.' Su esposo perdió su trabajo recientemente y recibieron un aviso de desalojo la semana pasada. Te pide que prometas no decirle a nadie porque 'me van a quitar a mis hijos.'",
    question: "What is your clinical response?",
    esQuestion: "¿Cuál es tu respuesta clínica?",
    options: [
      {
        id: "rs_bh_e3_a",
        text: "Recognize this as a high-lethality situation requiring immediate safety intervention. Validate her pain without promising confidentiality you can't keep. Conduct a structured suicide risk assessment (C-SSRS), address means restriction by discussing safe disposal of the stockpiled medication, activate your clinic's safety protocol, and connect her with SDOH resources for the housing and employment crisis. Document thoroughly. Clarify that mandatory reporting applies to child abuse — not to a parent struggling with suicidal thoughts — to ease her fear about losing her children",
        esText: "Reconocer esto como una situación de alta letalidad que requiere intervención de seguridad inmediata. Validar su dolor sin prometer confidencialidad que no puedes mantener. Realizar una evaluación estructurada de riesgo suicida (C-SSRS), abordar la restricción de medios discutiendo la eliminación segura de la medicación acumulada, activar el protocolo de seguridad de tu clínica, y conectarla con recursos SDOH para la crisis de vivienda y empleo. Documentar exhaustivamente. Aclarar que el reporte obligatorio aplica a abuso infantil — no a una madre luchando con pensamientos suicidas — para aliviar su miedo de perder a sus hijos",
        score: 4,
        behaviorTag: "lethality-aware-crisis-responder",
      },
      {
        id: "rs_bh_e3_b",
        text: "Take the disclosure seriously, complete a safety assessment, create a safety plan together, and ask her to bring in the stockpiled medication at her next visit. Schedule a follow-up within 48 hours and consult with your supervisor",
        esText: "Tomar la revelación en serio, completar una evaluación de seguridad, crear un plan de seguridad juntas, y pedirle que traiga la medicación acumulada en su próxima visita. Programar un seguimiento dentro de 48 horas y consultar con tu supervisor",
        score: 3,
        behaviorTag: "safety-planner",
      },
      {
        id: "rs_bh_e3_c",
        text: "Call 911 or initiate a 5150 hold — she has a plan, means, and intent. You can't take any chances with three children at home",
        esText: "Llamar al 911 o iniciar una retención 5150 — tiene un plan, medios e intención. No puedes arriesgarte con tres hijos en casa",
        score: 2,
        behaviorTag: "over-reactive-escalator",
      },
      {
        id: "rs_bh_e3_d",
        text: "Respect her request for privacy to maintain the therapeutic relationship — she said she hasn't decided anything. Increase session frequency and monitor closely at her next appointment",
        esText: "Respetar su solicitud de privacidad para mantener la relación terapéutica — ella dijo que no ha decidido nada. Aumentar la frecuencia de sesiones y monitorear de cerca en su próxima cita",
        score: 1,
        behaviorTag: "dangerously-passive",
      },
    ],
  },

  // Behavioral Health Specialist - Growth 2
  {
    id: "rs_bh_growth_2",
    roleId: "behavioral_health",
    domain: "growth",
    scenario:
      "Your FQHC has received a CalAIM Community Supports grant to provide housing transition navigation services. Leadership wants you to lead the BH component — conducting psychosocial assessments for housing readiness and providing brief interventions for patients experiencing homelessness. You've worked with homeless patients before, but you've never interfaced with county housing systems, coordinated entry, or done formal housing readiness assessments.",
    esScenario:
      "Tu FQHC ha recibido una subvención de Apoyos Comunitarios CalAIM para proporcionar servicios de navegación de transición de vivienda. El liderazgo quiere que lideres el componente de BH — realizando evaluaciones psicosociales de preparación para vivienda y proporcionando intervenciones breves para pacientes en situación de calle. Has trabajado con pacientes sin hogar antes, pero nunca has interactuado con sistemas de vivienda del condado, entrada coordinada, o hecho evaluaciones formales de preparación para vivienda.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_bh_g2_a",
        text: "Accept the opportunity and build your competency systematically: shadow the county coordinated entry team for a day, review HUD's housing readiness assessment framework, connect with BH colleagues at other FQHCs who've implemented Community Supports, and propose a phased rollout — start with 5 patients to develop the workflow before scaling. This bridges your clinical skills with systems navigation and positions you for program leadership",
        esText: "Aceptar la oportunidad y desarrollar tu competencia sistemáticamente: acompañar al equipo de entrada coordinada del condado por un día, revisar el marco de evaluación de preparación para vivienda de HUD, conectar con colegas de BH en otros FQHCs que hayan implementado Apoyos Comunitarios, y proponer una implementación por fases — comenzar con 5 pacientes para desarrollar el flujo de trabajo antes de escalar. Esto conecta tus habilidades clínicas con navegación de sistemas y te posiciona para liderazgo de programa",
        score: 4,
        behaviorTag: "systems-learning-leader",
      },
      {
        id: "rs_bh_g2_b",
        text: "Agree to take it on but request that the FQHC pay for a housing navigation training certificate and give you two weeks of ramp-up time before you start seeing patients in this capacity",
        esText: "Aceptar asumirlo pero solicitar que el FQHC pague un certificado de capacitación en navegación de vivienda y te dé dos semanas de preparación antes de empezar a ver pacientes en esta capacidad",
        score: 3,
        behaviorTag: "structured-learner",
      },
      {
        id: "rs_bh_g2_c",
        text: "Suggest that the FQHC hire a dedicated housing navigator with experience in coordinated entry and county systems — you can provide the BH assessments but shouldn't lead the whole component",
        esText: "Sugerir que el FQHC contrate un navegador de vivienda dedicado con experiencia en entrada coordinada y sistemas del condado — puedes proporcionar las evaluaciones de BH pero no deberías liderar todo el componente",
        score: 2,
        behaviorTag: "scope-limiter",
      },
      {
        id: "rs_bh_g2_d",
        text: "Decline — housing is a social work function, not behavioral health. Your clinical training didn't prepare you for systems navigation and you'd be working outside your competency",
        esText: "Declinar — la vivienda es una función de trabajo social, no de salud conductual. Tu formación clínica no te preparó para navegación de sistemas y estarías trabajando fuera de tu competencia",
        score: 1,
        behaviorTag: "rigid-scope-identity",
      },
    ],
  },

  // Behavioral Health Specialist - Growth 3
  {
    id: "rs_bh_growth_3",
    roleId: "behavioral_health",
    domain: "growth",
    scenario:
      "The opioid crisis has hit your FQHC's patient population hard. Your medical director wants to launch a Medication-Assisted Treatment (MAT) program and asks you to become the clinic's point person for the psychosocial component — running intake groups, relapse prevention, and family education sessions. You have experience with CBT and motivational interviewing but zero training in substance use disorders. Your current caseload is already full at 25 patients.",
    esScenario:
      "La crisis de opioides ha golpeado fuerte a la población de pacientes de tu FQHC. Tu director médico quiere lanzar un programa de Tratamiento Asistido con Medicamentos (MAT) y te pide que seas la persona de referencia de la clínica para el componente psicosocial — dirigiendo grupos de admisión, prevención de recaídas, y sesiones de educación familiar. Tienes experiencia con TCC y entrevista motivacional pero cero capacitación en trastornos por uso de sustancias. Tu caseload actual ya está lleno con 25 pacientes.",
    question: "What's your approach?",
    esQuestion: "¿Cuál es tu enfoque?",
    options: [
      {
        id: "rs_bh_g3_a",
        text: "Recognize this as a critical mission need and a career-defining skill expansion. Negotiate the terms: ask for SAMHSA's free online SUD training series, request a temporary caseload reduction of 5 patients to create capacity, propose starting with one group per week as a pilot, and seek clinical supervision from a licensed SUD counselor — even if external to the FQHC. Your MI skills are directly transferable, and this makes you indispensable to the clinic's future",
        esText: "Reconocer esto como una necesidad crítica de misión y una expansión de habilidades que define tu carrera. Negociar los términos: pedir la serie de capacitación en línea gratuita de SAMHSA en TUS, solicitar una reducción temporal de caseload de 5 pacientes para crear capacidad, proponer comenzar con un grupo por semana como piloto, y buscar supervisión clínica de un consejero certificado en TUS — incluso si es externo al FQHC. Tus habilidades de EM son directamente transferibles, y esto te hace indispensable para el futuro de la clínica",
        score: 4,
        behaviorTag: "mission-driven-skill-builder",
      },
      {
        id: "rs_bh_g3_b",
        text: "Agree to participate but insist on completing a recognized SUD training program before leading any groups, and ask the medical director to adjust your caseload accordingly",
        esText: "Aceptar participar pero insistir en completar un programa de capacitación reconocido en TUS antes de liderar cualquier grupo, y pedir al director médico que ajuste tu caseload en consecuencia",
        score: 3,
        behaviorTag: "competency-first",
      },
      {
        id: "rs_bh_g3_c",
        text: "Offer to handle the family education sessions since those align with your existing skills, but recommend they hire a certified SUD counselor for the intake groups and relapse prevention work",
        esText: "Ofrecer manejar las sesiones de educación familiar ya que se alinean con tus habilidades existentes, pero recomendar que contraten un consejero certificado en TUS para los grupos de admisión y el trabajo de prevención de recaídas",
        score: 2,
        behaviorTag: "partial-commitment",
      },
      {
        id: "rs_bh_g3_d",
        text: "Decline — your caseload is already full, you're not trained in SUD, and taking this on would compromise the quality of care for your existing 25 patients",
        esText: "Declinar — tu caseload ya está lleno, no estás capacitado/a en TUS, y asumir esto comprometería la calidad de atención para tus 25 pacientes existentes",
        score: 1,
        behaviorTag: "capacity-protector",
      },
    ],
  },

  // Behavioral Health Specialist - Transition 2
  {
    id: "rs_bh_transition_2",
    roleId: "behavioral_health",
    domain: "transition",
    scenario:
      "You've started at a new FQHC and inherited a caseload of 20 patients from the previous BH specialist who left abruptly. Reviewing the charts, you find minimal treatment plans — most notes say 'supportive counseling' with no measurable goals, no standardized assessments, and no evidence of care coordination with PCPs. Several patients have been seen weekly for over a year with no documented progress. Your supervisor says the previous clinician was 'beloved by patients' and warns you not to 'rock the boat.'",
    esScenario:
      "Has comenzado en un nuevo FQHC y heredaste un caseload de 20 pacientes del especialista de BH anterior que se fue abruptamente. Al revisar los expedientes, encuentras planes de tratamiento mínimos — la mayoría de las notas dicen 'consejería de apoyo' sin metas medibles, sin evaluaciones estandarizadas, y sin evidencia de coordinación de cuidado con PCPs. Varios pacientes han sido vistos semanalmente por más de un año sin progreso documentado. Tu supervisor dice que el clínico anterior era 'querido por los pacientes' y te advierte que no 'hagas olas.'",
    question: "How do you approach your first month with this caseload?",
    esQuestion: "¿Cómo abordas tu primer mes con este caseload?",
    options: [
      {
        id: "rs_bh_t2_a",
        text: "Start with relationship before restructuring. Meet each patient individually to introduce yourself, learn their story, and understand what they valued about their previous therapist. Simultaneously, begin conducting baseline assessments (PHQ-9, GAD-7) and developing proper treatment plans with measurable goals — framing it as 'getting to know you better so I can be most helpful.' Prioritize the patients with longest treatment duration and least documented progress for clinical review. Share your assessment with your supervisor using data, not opinions, to build the case for stronger clinical documentation standards",
        esText: "Empezar con la relación antes de reestructurar. Reunirte individualmente con cada paciente para presentarte, aprender su historia, y entender qué valoraban de su terapeuta anterior. Simultáneamente, comenzar a realizar evaluaciones de base (PHQ-9, GAD-7) y desarrollar planes de tratamiento adecuados con metas medibles — enmarcándolo como 'conocerte mejor para poder ser más útil.' Priorizar los pacientes con mayor duración de tratamiento y menor progreso documentado para revisión clínica. Compartir tu evaluación con tu supervisor usando datos, no opiniones, para construir el caso para estándares más fuertes de documentación clínica",
        score: 4,
        behaviorTag: "relationship-first-reformer",
      },
      {
        id: "rs_bh_t2_b",
        text: "Focus your first month on meeting patients and building rapport. Once you've established trust, gradually introduce standardized assessments and treatment goals over the following months",
        esText: "Enfocar tu primer mes en conocer pacientes y construir rapport. Una vez que hayas establecido confianza, introducir gradualmente evaluaciones estandarizadas y metas de tratamiento en los meses siguientes",
        score: 3,
        behaviorTag: "slow-change-agent",
      },
      {
        id: "rs_bh_t2_c",
        text: "Immediately implement proper treatment plans for all 20 patients — they deserve evidence-based care, and continuing without documented goals is clinically and legally risky regardless of what your supervisor says",
        esText: "Implementar inmediatamente planes de tratamiento adecuados para los 20 pacientes — merecen atención basada en evidencia, y continuar sin metas documentadas es clínicamente y legalmente riesgoso sin importar lo que diga tu supervisor",
        score: 2,
        behaviorTag: "abrupt-reformer",
      },
      {
        id: "rs_bh_t2_d",
        text: "Follow your supervisor's advice — maintain the current approach with these patients and reserve your clinical rigor for new patients you take on. Fighting the system this early will only hurt your standing",
        esText: "Seguir el consejo de tu supervisor — mantener el enfoque actual con estos pacientes y reservar tu rigor clínico para nuevos pacientes que asumas. Pelear contra el sistema tan temprano solo dañará tu posición",
        score: 1,
        behaviorTag: "compliance-over-quality",
      },
    ],
  },

  // Behavioral Health Specialist - Transition 3
  {
    id: "rs_bh_transition_3",
    roleId: "behavioral_health",
    domain: "transition",
    scenario:
      "During your second week at a new FQHC, you realize the clinic has no formal safety protocol for behavioral health crises. When you ask the clinic manager what to do if a patient becomes acutely suicidal or violent, she says, 'Just call 911 — that's what the last person did.' There's no designated safe room, no crisis de-escalation supplies, no after-hours on-call BH coverage, and no documented Tarasoff procedure.",
    esScenario:
      "Durante tu segunda semana en un nuevo FQHC, te das cuenta de que la clínica no tiene un protocolo formal de seguridad para crisis de salud conductual. Cuando le preguntas a la gerente de clínica qué hacer si un paciente se vuelve agudamente suicida o violento, ella dice: 'Solo llama al 911 — eso es lo que hacía la persona anterior.' No hay sala segura designada, no hay suministros de desescalamiento de crisis, no hay cobertura de BH de guardia fuera de horario, y no hay procedimiento de Tarasoff documentado.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_bh_t3_a",
        text: "Treat this as a patient safety gap that needs immediate attention, not a suggestion for later. Draft a basic crisis response protocol within your first week — include risk assessment steps, means restriction conversation guide, Tarasoff notification procedures per California law, 911 call criteria, and post-crisis documentation requirements. Identify a room that could serve as a crisis de-escalation space. Present the protocol to your supervisor and clinic manager with the framing: 'This protects the clinic legally and protects our patients clinically — we need this before our next crisis, not after.'",
        esText: "Tratar esto como una brecha de seguridad del paciente que necesita atención inmediata, no una sugerencia para después. Redactar un protocolo básico de respuesta a crisis dentro de tu primera semana — incluir pasos de evaluación de riesgo, guía de conversación de restricción de medios, procedimientos de notificación Tarasoff según la ley de California, criterios de llamada al 911, y requisitos de documentación post-crisis. Identificar una sala que pueda servir como espacio de desescalamiento de crisis. Presentar el protocolo a tu supervisor y gerente de clínica con el encuadre: 'Esto protege a la clínica legalmente y protege a nuestros pacientes clínicamente — necesitamos esto antes de nuestra próxima crisis, no después.'",
        score: 4,
        behaviorTag: "safety-infrastructure-builder",
      },
      {
        id: "rs_bh_t3_b",
        text: "Email your supervisor documenting the gap and requesting a meeting to discuss developing a crisis protocol. In the meantime, create your own personal crisis response checklist so you're prepared if a situation arises",
        esText: "Enviar un correo a tu supervisor documentando la brecha y solicitando una reunión para discutir el desarrollo de un protocolo de crisis. Mientras tanto, crear tu propia lista de verificación personal de respuesta a crisis para estar preparado/a si surge una situación",
        score: 3,
        behaviorTag: "documented-escalator",
      },
      {
        id: "rs_bh_t3_c",
        text: "Make note of it and plan to bring it up at the next team meeting or staff in-service. You're too new to push major policy changes in your second week",
        esText: "Tomar nota y planear mencionarlo en la próxima reunión de equipo o capacitación del personal. Eres muy nuevo/a para impulsar cambios de política importantes en tu segunda semana",
        score: 2,
        behaviorTag: "deferred-action",
      },
      {
        id: "rs_bh_t3_d",
        text: "Follow the existing practice — call 911 for emergencies. Every clinic handles crises differently, and you shouldn't impose your previous clinic's standards on a new workplace",
        esText: "Seguir la práctica existente — llamar al 911 para emergencias. Cada clínica maneja las crisis de manera diferente, y no deberías imponer los estándares de tu clínica anterior en un nuevo lugar de trabajo",
        score: 1,
        behaviorTag: "dangerous-conformity",
      },
    ],
  },

  // ============================================================
  // Registered Nurse — Additional Questions (10)
  // ============================================================

  // Registered Nurse - Mission 2
  {
    id: "rs_rn_mission_2",
    roleId: "registered_nurse",
    domain: "mission",
    scenario:
      "Your FQHC's HEDIS metrics show that only 38% of your diabetic patients have had a retinal eye exam in the past year — the target is 60%. The medical director has asked you to 'figure out why.' You pull the data and discover three problems: the nearest ophthalmologist accepting Medi-Cal is 45 minutes away, many patients lack transportation, and the referral process requires three separate phone calls. Meanwhile, you know a retinal camera company has been pitching your clinic on a point-of-care device.",
    esScenario:
      "Las métricas HEDIS de tu FQHC muestran que solo el 38% de tus pacientes diabéticos han tenido un examen de retina en el último año — la meta es 60%. El director médico te ha pedido que 'averigües por qué.' Extraes los datos y descubres tres problemas: el oftalmólogo más cercano que acepta Medi-Cal está a 45 minutos, muchos pacientes carecen de transporte, y el proceso de referencia requiere tres llamadas telefónicas separadas. Mientras tanto, sabes que una compañía de cámaras de retina ha estado ofreciendo un dispositivo de punto de cuidado a tu clínica.",
    question: "What do you recommend?",
    esQuestion: "¿Qué recomiendas?",
    options: [
      {
        id: "rs_rn_m2_a",
        text: "Present a comprehensive solution to the medical director: recommend the point-of-care retinal camera as a long-term investment (calculate ROI using PPS visit rates plus quality bonus potential), propose an immediate short-term fix by building a simplified referral workflow and partnering with your CHW team to arrange transportation for the next 6 months, and create a diabetic eye exam registry to track and outreach patients who are overdue. Frame the whole recommendation around the FQHC's UDS quality metrics and grant competitiveness",
        esText: "Presentar una solución integral al director médico: recomendar la cámara de retina de punto de cuidado como inversión a largo plazo (calcular el ROI usando tasas de visita PPS más potencial de bonificación de calidad), proponer una solución inmediata a corto plazo simplificando el flujo de referencia y asociándose con el equipo de CHW para organizar transporte por los próximos 6 meses, y crear un registro de exámenes oftalmológicos diabéticos para rastrear y contactar pacientes atrasados. Enmarcar toda la recomendación en torno a las métricas de calidad UDS y competitividad de subvenciones del FQHC",
        score: 4,
        behaviorTag: "population-health-strategist",
      },
      {
        id: "rs_rn_m2_b",
        text: "Streamline the referral process to a single phone call, create a patient handout explaining the importance of retinal exams in English and Spanish, and set up a tracking system to follow up with patients who haven't completed the referral",
        esText: "Simplificar el proceso de referencia a una sola llamada telefónica, crear un folleto para pacientes explicando la importancia de los exámenes de retina en inglés y español, y establecer un sistema de seguimiento para dar seguimiento a pacientes que no han completado la referencia",
        score: 3,
        behaviorTag: "process-improver",
      },
      {
        id: "rs_rn_m2_c",
        text: "Focus on patient education — make sure every diabetic patient understands why eye exams matter during their next visit, and document that the recommendation was made in their chart",
        esText: "Enfocarse en la educación del paciente — asegurarse de que cada paciente diabético entienda por qué los exámenes oculares importan durante su próxima visita, y documentar que se hizo la recomendación en su expediente",
        score: 2,
        behaviorTag: "education-only",
      },
      {
        id: "rs_rn_m2_d",
        text: "Report the findings to the medical director — the 38% rate is a systemic access problem, not a nursing problem. The clinic needs to solve the Medi-Cal ophthalmologist shortage before the metric will improve",
        esText: "Reportar los hallazgos al director médico — la tasa del 38% es un problema sistémico de acceso, no un problema de enfermería. La clínica necesita resolver la escasez de oftalmólogos que aceptan Medi-Cal antes de que la métrica mejore",
        score: 1,
        behaviorTag: "problem-identifier-not-solver",
      },
    ],
  },

  // Registered Nurse - Mission 3
  {
    id: "rs_rn_mission_3",
    roleId: "registered_nurse",
    domain: "mission",
    scenario:
      "A patient who is undocumented tells you during a visit that she has been having chest pain for two weeks but was afraid to come in because 'someone told her the clinic reports to immigration now.' She heard a rumor in her community after ICE was seen near the health center last week. You know the rumor is false — ICE was at a neighboring business — but you can see the fear is real and widespread.",
    esScenario:
      "Una paciente indocumentada te dice durante una visita que ha tenido dolor de pecho por dos semanas pero tenía miedo de venir porque 'alguien le dijo que la clínica ahora reporta a inmigración.' Escuchó un rumor en su comunidad después de que ICE fue visto cerca del centro de salud la semana pasada. Sabes que el rumor es falso — ICE estaba en un negocio vecino — pero puedes ver que el miedo es real y generalizado.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_rn_m3_a",
        text: "Address the immediate clinical concern first — her chest pain needs evaluation now. Reassure her clearly about the clinic's confidentiality policies and that FQHCs serve everyone regardless of immigration status. Then escalate the community rumor to your clinic leadership and outreach team — if one patient delayed care for two weeks because of this fear, others are likely doing the same. Suggest the clinic issue a community statement in Spanish reaffirming its safe-space policies and have CHWs actively counter the misinformation during outreach",
        esText: "Abordar la preocupación clínica inmediata primero — su dolor de pecho necesita evaluación ahora. Tranquilizarla claramente sobre las políticas de confidencialidad de la clínica y que los FQHCs sirven a todos sin importar el estatus migratorio. Luego escalar el rumor comunitario al liderazgo de tu clínica y equipo de alcance — si una paciente retrasó atención por dos semanas por este miedo, otros probablemente están haciendo lo mismo. Sugerir que la clínica emita un comunicado comunitario en español reafirmando sus políticas de espacio seguro y que los CHWs contrarresten activamente la desinformación durante el alcance",
        score: 4,
        behaviorTag: "clinical-plus-community-advocate",
      },
      {
        id: "rs_rn_m3_b",
        text: "Reassure the patient that the clinic does not share information with immigration authorities, treat her chest pain, and suggest she tell friends and family that the clinic is safe for everyone",
        esText: "Tranquilizar a la paciente de que la clínica no comparte información con autoridades de inmigración, tratar su dolor de pecho, y sugerirle que diga a amigos y familiares que la clínica es segura para todos",
        score: 3,
        behaviorTag: "individual-reassurer",
      },
      {
        id: "rs_rn_m3_c",
        text: "Focus on her clinical needs — the chest pain is the priority. Immigration concerns are outside your scope and best handled by administration or social workers",
        esText: "Enfocarse en sus necesidades clínicas — el dolor de pecho es la prioridad. Las preocupaciones de inmigración están fuera de tu alcance y mejor manejadas por administración o trabajadores sociales",
        score: 2,
        behaviorTag: "narrow-clinical-focus",
      },
      {
        id: "rs_rn_m3_d",
        text: "Treat her chest pain and move on — you can't control community rumors and it's not your job to make public statements about clinic policy",
        esText: "Tratar su dolor de pecho y seguir adelante — no puedes controlar los rumores de la comunidad y no es tu trabajo hacer declaraciones públicas sobre la política de la clínica",
        score: 1,
        behaviorTag: "mission-blind",
      },
    ],
  },

  // Registered Nurse - People 2
  {
    id: "rs_rn_people_2",
    roleId: "registered_nurse",
    domain: "people",
    scenario:
      "A new nurse practitioner has joined your FQHC and is seeing patients much faster than anyone else — 25 patients per day versus the clinic average of 18. However, you've noticed that the NP is skipping medication reconciliation, not reviewing the MA's vitals before prescribing, and ordering labs without checking if they were recently completed. Two patients have come back to you confused about duplicate medication orders. The NP has already been praised by the clinic manager for 'productivity.'",
    esScenario:
      "Una nueva enfermera practicante se ha unido a tu FQHC y está viendo pacientes mucho más rápido que cualquier otro — 25 pacientes por día versus el promedio de la clínica de 18. Sin embargo, has notado que la NP está omitiendo la reconciliación de medicamentos, no revisando los signos vitales del MA antes de prescribir, y ordenando laboratorios sin verificar si se completaron recientemente. Dos pacientes han regresado a ti confundidos por órdenes de medicación duplicadas. La NP ya ha sido elogiada por el gerente de clínica por 'productividad.'",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_rn_p2_a",
        text: "Document the specific patient safety concerns with dates and examples — the duplicate medication orders and skipped med rec are concrete, not subjective. Have a private conversation with the NP first, framing it around patient safety: 'I've caught two duplicate med orders this week and want to make sure our workflow is keeping patients safe.' If the pattern continues after that conversation, bring the documented concerns to the clinic manager or medical director, emphasizing that speed without safety creates liability for the entire clinic",
        esText: "Documentar las preocupaciones específicas de seguridad del paciente con fechas y ejemplos — las órdenes de medicación duplicadas y la reconciliación de medicamentos omitida son concretas, no subjetivas. Tener una conversación privada con la NP primero, enmarcándola en la seguridad del paciente: 'He detectado dos órdenes de medicación duplicadas esta semana y quiero asegurarme de que nuestro flujo de trabajo mantiene seguros a los pacientes.' Si el patrón continúa después de esa conversación, llevar las preocupaciones documentadas al gerente de clínica o director médico, enfatizando que la velocidad sin seguridad crea responsabilidad para toda la clínica",
        score: 4,
        behaviorTag: "safety-advocate-with-evidence",
      },
      {
        id: "rs_rn_p2_b",
        text: "Bring the duplicate medication orders directly to the clinic manager as a patient safety concern and let them decide how to address it with the NP",
        esText: "Llevar las órdenes de medicación duplicadas directamente al gerente de clínica como una preocupación de seguridad del paciente y dejarles decidir cómo abordarlo con la NP",
        score: 3,
        behaviorTag: "escalation-first",
      },
      {
        id: "rs_rn_p2_c",
        text: "Catch the errors yourself and correct them — you're the last line of defense for patient safety, and it's not worth creating tension with a new provider",
        esText: "Detectar los errores tú mismo/a y corregirlos — eres la última línea de defensa para la seguridad del paciente, y no vale la pena crear tensión con un proveedor nuevo",
        score: 2,
        behaviorTag: "silent-safety-net",
      },
      {
        id: "rs_rn_p2_d",
        text: "Stay out of it — the NP has prescriptive authority and their workflow is between them and the medical director. If patients are confused, direct them back to the NP",
        esText: "Mantenerte fuera — la NP tiene autoridad prescriptiva y su flujo de trabajo es entre ella y el director médico. Si los pacientes están confundidos, dirigirlos de vuelta a la NP",
        score: 1,
        behaviorTag: "scope-deferral",
      },
    ],
  },

  // Registered Nurse - People 3
  {
    id: "rs_rn_people_3",
    roleId: "registered_nurse",
    domain: "people",
    scenario:
      "Your FQHC has started RN co-visits with CHWs for chronic disease patients — you handle clinical education while the CHW addresses SDOH barriers. Your assigned CHW partner is passionate but keeps giving patients clinical advice during home visits: telling a diabetic patient to 'cut their insulin dose in half since their sugar is down' and advising another to 'stop the blood pressure medicine because it makes them dizzy.' The CHW means well and patients trust them deeply.",
    esScenario:
      "Tu FQHC ha comenzado co-visitas de RN con CHWs para pacientes con enfermedades crónicas — tú manejas la educación clínica mientras el CHW aborda barreras de SDOH. Tu compañero CHW asignado es apasionado pero sigue dando consejos clínicos durante visitas domiciliarias: diciéndole a un paciente diabético que 'reduzca su dosis de insulina a la mitad ya que su azúcar bajó' y aconsejando a otro que 'deje la medicina para la presión porque le da mareos.' El CHW tiene buenas intenciones y los pacientes confían profundamente en él.",
    question: "How do you address this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_rn_p3_a",
        text: "Have an immediate, private, and compassionate conversation with the CHW. Acknowledge their dedication and the trust patients have in them — that trust is valuable. But explain clearly that advising patients to change medications is outside CHW scope under California law and puts both the patient and the CHW at serious risk. Co-develop a response framework: when patients ask medication questions, the CHW says 'That's a great question for your nurse or doctor — let me help you reach them.' Offer to do a joint training session on scope boundaries and create a simple reference card for when to defer clinical questions",
        esText: "Tener una conversación inmediata, privada y compasiva con el CHW. Reconocer su dedicación y la confianza que los pacientes tienen en él — esa confianza es valiosa. Pero explicar claramente que aconsejar a los pacientes sobre cambiar medicamentos está fuera del alcance del CHW según la ley de California y pone en riesgo serio tanto al paciente como al CHW. Co-desarrollar un marco de respuesta: cuando los pacientes pregunten sobre medicamentos, el CHW dice 'Esa es una gran pregunta para tu enfermero/a o doctor — déjame ayudarte a contactarlos.' Ofrecer hacer una sesión de capacitación conjunta sobre límites de alcance y crear una tarjeta de referencia simple para cuándo derivar preguntas clínicas",
        score: 4,
        behaviorTag: "scope-boundary-teacher",
      },
      {
        id: "rs_rn_p3_b",
        text: "Report the incidents to your supervisor and the CHW's supervisor — giving medication advice without a license is a liability issue that needs to be addressed by management",
        esText: "Reportar los incidentes a tu supervisor y al supervisor del CHW — dar consejos de medicación sin licencia es un problema de responsabilidad que necesita ser abordado por la gerencia",
        score: 3,
        behaviorTag: "formal-escalator",
      },
      {
        id: "rs_rn_p3_c",
        text: "Correct the information with the patients directly, adjust their care plans accordingly, and keep a closer eye on what the CHW says during future co-visits",
        esText: "Corregir la información con los pacientes directamente, ajustar sus planes de atención en consecuencia, y vigilar más de cerca lo que dice el CHW durante futuras co-visitas",
        score: 2,
        behaviorTag: "silent-corrector",
      },
      {
        id: "rs_rn_p3_d",
        text: "Don't make a big deal out of it — the CHW has more trust with these patients than you do, and they'll listen to the CHW more than they'll listen to you. Just monitor the patients more closely",
        esText: "No hacer un escándalo — el CHW tiene más confianza con estos pacientes que tú, y le escucharán más a él que a ti. Solo monitorear a los pacientes más de cerca",
        score: 1,
        behaviorTag: "dangerous-permissiveness",
      },
    ],
  },

  // Registered Nurse - Execution 2
  {
    id: "rs_rn_execution_2",
    roleId: "registered_nurse",
    domain: "execution",
    scenario:
      "Your FQHC has just received notification from the county health department of a measles exposure at a local school. Twelve children who attend that school are patients at your clinic, and your EHR shows that 4 of them have incomplete MMR vaccination records. The county is asking all FQHCs to verify immunization status and administer catch-up vaccinations within 72 hours. Your clinic has the MMR vaccine in stock, but your normal scheduling is booked solid for the next three days.",
    esScenario:
      "Tu FQHC acaba de recibir notificación del departamento de salud del condado sobre una exposición a sarampión en una escuela local. Doce niños que asisten a esa escuela son pacientes de tu clínica, y tu EHR muestra que 4 de ellos tienen registros de vacunación MMR incompletos. El condado está pidiendo a todos los FQHCs que verifiquen el estado de inmunización y administren vacunas de recuperación dentro de 72 horas. Tu clínica tiene la vacuna MMR en stock, pero tu programación normal está llena para los próximos tres días.",
    question: "How do you execute this?",
    esQuestion: "¿Cómo ejecutas esto?",
    options: [
      {
        id: "rs_rn_e2_a",
        text: "Activate an urgent response: first, verify the immunization records for all 12 children in both the EHR and CAIR2 (California Immunization Registry) — some may have received vaccines elsewhere. For the 4 with confirmed gaps, contact families immediately by phone to schedule same-day or next-day walk-in vaccine appointments, using double-booked slots or lunch breaks. Coordinate with your MA to prepare vaccine supply and consent forms in English and Spanish. Notify the clinic manager about the public health requirement so they can support schedule flexibility. Document everything for the county's exposure response tracking",
        esText: "Activar una respuesta urgente: primero, verificar los registros de inmunización de los 12 niños tanto en el EHR como en CAIR2 (Registro de Inmunización de California) — algunos pueden haber recibido vacunas en otro lugar. Para los 4 con brechas confirmadas, contactar a las familias inmediatamente por teléfono para programar citas de vacunación sin cita el mismo día o al día siguiente, usando horarios doble-reservados o descansos de almuerzo. Coordinar con tu MA para preparar suministro de vacunas y formularios de consentimiento en inglés y español. Notificar al gerente de clínica sobre el requisito de salud pública para que apoyen la flexibilidad de horarios. Documentar todo para el seguimiento de respuesta a exposición del condado",
        score: 4,
        behaviorTag: "public-health-rapid-responder",
      },
      {
        id: "rs_rn_e2_b",
        text: "Call the families of the 4 children with incomplete records and schedule them for the earliest available appointments. If regular slots aren't open, ask your supervisor if you can add walk-in slots at the end of each day",
        esText: "Llamar a las familias de los 4 niños con registros incompletos y programarlos para las citas disponibles más próximas. Si no hay horarios regulares abiertos, preguntar a tu supervisor si puedes agregar horarios sin cita al final de cada día",
        score: 3,
        behaviorTag: "responsive-scheduler",
      },
      {
        id: "rs_rn_e2_c",
        text: "Send letters to all 12 families informing them of the exposure and recommending they verify their child's vaccination status, then call the 4 with gaps to schedule appointments",
        esText: "Enviar cartas a las 12 familias informándoles de la exposición y recomendando que verifiquen el estado de vacunación de su hijo, luego llamar a los 4 con brechas para programar citas",
        score: 2,
        behaviorTag: "slow-communicator",
      },
      {
        id: "rs_rn_e2_d",
        text: "Forward the county notification to the clinic manager and medical director — immunization outreach campaigns are an administrative function, not something you should organize while managing your existing patient load",
        esText: "Reenviar la notificación del condado al gerente de clínica y director médico — las campañas de alcance de inmunización son una función administrativa, no algo que debas organizar mientras manejas tu carga de pacientes existente",
        score: 1,
        behaviorTag: "delegation-without-action",
      },
    ],
  },

  // Registered Nurse - Execution 3
  {
    id: "rs_rn_execution_3",
    roleId: "registered_nurse",
    domain: "execution",
    scenario:
      "You're conducting insulin start education with a newly diagnosed Type 2 diabetic patient who speaks limited English. Through the Spanish interpreter on the phone, you learn the patient is terrified of needles, lives alone, has never used any medical device, and asks, 'Will I die if I don't take the injection?' The provider has prescribed insulin glargine (Lantus) once daily. You have 20 minutes before your next patient.",
    esScenario:
      "Estás realizando educación de inicio de insulina con un paciente recién diagnosticado con diabetes tipo 2 que habla inglés limitado. A través del intérprete de español por teléfono, aprendes que el paciente está aterrorizado de las agujas, vive solo, nunca ha usado ningún dispositivo médico, y pregunta: '¿Me voy a morir si no me pongo la inyección?' El proveedor ha prescrito insulina glargina (Lantus) una vez al día. Tienes 20 minutos antes de tu próximo paciente.",
    question: "How do you approach this education session?",
    esQuestion: "¿Cómo abordas esta sesión de educación?",
    options: [
      {
        id: "rs_rn_e3_a",
        text: "Simplify and focus on what matters most right now — don't try to cover everything in 20 minutes. Address the fear first: acknowledge the needle anxiety, demonstrate the injection on yourself or a practice pad to show it's manageable, and validate that the fear is normal. Teach ONLY the essential skill today: how to inject once daily at the same time. Use teach-back through the interpreter to confirm understanding. Create a simple visual guide with pictures (not text-heavy) that the patient can reference at home. Schedule a follow-up nursing visit within 48 hours, and connect them with your FQHC's diabetes self-management program and a CHW who speaks Spanish for ongoing support",
        esText: "Simplificar y enfocarse en lo que más importa ahora — no intentar cubrir todo en 20 minutos. Abordar el miedo primero: reconocer la ansiedad a las agujas, demostrar la inyección en ti mismo/a o en una almohadilla de práctica para mostrar que es manejable, y validar que el miedo es normal. Enseñar SOLO la habilidad esencial hoy: cómo inyectar una vez al día a la misma hora. Usar teach-back a través del intérprete para confirmar comprensión. Crear una guía visual simple con imágenes (no cargada de texto) que el paciente pueda consultar en casa. Programar una visita de enfermería de seguimiento dentro de 48 horas, y conectarlos con el programa de autogestión de diabetes de tu FQHC y un CHW que hable español para apoyo continuo",
        score: 4,
        behaviorTag: "patient-centered-educator",
      },
      {
        id: "rs_rn_e3_b",
        text: "Walk through the full insulin injection process step by step: storage, preparation, injection site selection, technique, and disposal. Have the patient practice on the pad. Give them the standard diabetes education packet in Spanish to take home",
        esText: "Recorrer el proceso completo de inyección de insulina paso a paso: almacenamiento, preparación, selección del sitio de inyección, técnica y desecho. Hacer que el paciente practique en la almohadilla. Darles el paquete estándar de educación sobre diabetes en español para llevar a casa",
        score: 3,
        behaviorTag: "thorough-but-overwhelming",
      },
      {
        id: "rs_rn_e3_c",
        text: "Tell the patient that insulin is essential and not taking it could lead to serious complications. Demonstrate the injection once, give them the supplies and written instructions, and tell them to call if they have questions",
        esText: "Decirle al paciente que la insulina es esencial y no tomarla podría llevar a complicaciones graves. Demostrar la inyección una vez, darles los suministros e instrucciones escritas, y decirles que llamen si tienen preguntas",
        score: 2,
        behaviorTag: "information-dump",
      },
      {
        id: "rs_rn_e3_d",
        text: "Given the language barrier and needle phobia, ask the provider to consider an oral medication alternative first — insulin starts should ideally happen with in-person interpreter support, not phone interpretation",
        esText: "Dada la barrera del idioma y la fobia a las agujas, pedir al proveedor que considere primero una alternativa de medicación oral — los inicios de insulina idealmente deberían ocurrir con apoyo de intérprete en persona, no interpretación telefónica",
        score: 1,
        behaviorTag: "avoidance-via-deferral",
      },
    ],
  },

  // Registered Nurse - Growth 2
  {
    id: "rs_rn_growth_2",
    roleId: "registered_nurse",
    domain: "growth",
    scenario:
      "Your FQHC is implementing a new standing order protocol that allows RNs to independently initiate point-of-care A1C testing, adjust insulin sliding scales within defined parameters, and order routine diabetic lab panels — without waiting for a provider order each time. This expands your clinical authority significantly. Several veteran RNs on your team are resistant, saying 'This is practicing medicine — it's not what nurses do.' You're excited about the expanded scope but understand their concern.",
    esScenario:
      "Tu FQHC está implementando un nuevo protocolo de órdenes permanentes que permite a los RNs iniciar independientemente pruebas de A1C en punto de cuidado, ajustar escalas móviles de insulina dentro de parámetros definidos, y ordenar paneles de laboratorio diabéticos rutinarios — sin esperar una orden del proveedor cada vez. Esto expande tu autoridad clínica significativamente. Varios RNs veteranos en tu equipo son resistentes, diciendo 'Esto es practicar medicina — no es lo que hacen los enfermeros.' Estás emocionado/a por el alcance expandido pero entiendes su preocupación.",
    question: "What role do you play?",
    esQuestion: "¿Qué rol juegas?",
    options: [
      {
        id: "rs_rn_g2_a",
        text: "Champion the change while respecting the concerns. Volunteer to be an early adopter and document your experience. Organize a peer learning session where you walk colleagues through the standing order parameters — showing that the protocols have clear guardrails and are within RN scope per California BPC 2725. Share evidence that RN-initiated standing orders improve patient access and reduce wait times in FQHCs. Acknowledge that 'top-of-license' practice requires confidence-building and offer to mentor hesitant colleagues through their first cases",
        esText: "Defender el cambio mientras se respetan las preocupaciones. Ofrecerse voluntariamente como adoptante temprano y documentar tu experiencia. Organizar una sesión de aprendizaje entre pares donde guíes a colegas a través de los parámetros de órdenes permanentes — mostrando que los protocolos tienen barreras claras y están dentro del alcance del RN según el BPC 2725 de California. Compartir evidencia de que las órdenes permanentes iniciadas por RN mejoran el acceso del paciente y reducen tiempos de espera en FQHCs. Reconocer que la práctica 'al tope de licencia' requiere construir confianza y ofrecer ser mentor de colegas vacilantes en sus primeros casos",
        score: 4,
        behaviorTag: "change-champion-mentor",
      },
      {
        id: "rs_rn_g2_b",
        text: "Support the initiative privately and implement the standing orders in your own practice, but let management handle the resistance from the veteran nurses — it's not your job to convince your peers",
        esText: "Apoyar la iniciativa en privado e implementar las órdenes permanentes en tu propia práctica, pero dejar que la gerencia maneje la resistencia de los enfermeros veteranos — no es tu trabajo convencer a tus pares",
        score: 3,
        behaviorTag: "individual-adopter",
      },
      {
        id: "rs_rn_g2_c",
        text: "Wait to see how the first few months go before committing — if the veteran nurses are uncomfortable, there might be legitimate concerns about liability or clinical safety that haven't been fully addressed",
        esText: "Esperar a ver cómo van los primeros meses antes de comprometerte — si los enfermeros veteranos están incómodos, podría haber preocupaciones legítimas sobre responsabilidad o seguridad clínica que no se han abordado completamente",
        score: 2,
        behaviorTag: "wait-and-see",
      },
      {
        id: "rs_rn_g2_d",
        text: "Side with the veteran nurses — expanding RN scope without additional pay or liability protection puts nurses at risk. The standing orders should be optional, not mandatory",
        esText: "Ponerse del lado de los enfermeros veteranos — expandir el alcance del RN sin pago adicional o protección de responsabilidad pone a los enfermeros en riesgo. Las órdenes permanentes deberían ser opcionales, no obligatorias",
        score: 1,
        behaviorTag: "change-resistant",
      },
    ],
  },

  // Registered Nurse - Growth 3
  {
    id: "rs_rn_growth_3",
    roleId: "registered_nurse",
    domain: "growth",
    scenario:
      "Your FQHC's quality improvement committee has asked you to lead a nurse-driven hypertension management initiative. The data shows that only 52% of your hypertensive patients have controlled blood pressure (below 140/90), and the HRSA target is 65%. You'd need to design the intervention, train other nurses, track outcomes, and present results quarterly to leadership. You've never led a QI project before.",
    esScenario:
      "El comité de mejora de calidad de tu FQHC te ha pedido que lideres una iniciativa de manejo de hipertensión dirigida por enfermeros. Los datos muestran que solo el 52% de tus pacientes hipertensos tienen presión arterial controlada (debajo de 140/90), y la meta de HRSA es 65%. Necesitarías diseñar la intervención, capacitar a otros enfermeros, rastrear resultados, y presentar resultados trimestralmente al liderazgo. Nunca has liderado un proyecto de QI antes.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_rn_g3_a",
        text: "Accept with a growth mindset. Research nurse-led HTN protocols from other FQHCs (NACHC has case studies), take a free IHI Open School quality improvement course to learn PDSA methodology, and design a simple pilot: start with your own patient panel, implement evidence-based interventions (BP rechecks at every visit, medication adherence follow-up calls, home BP monitoring kits), track outcomes monthly, then scale to other nurses after proving results. This positions you as a clinical leader and strengthens your FQHC's HRSA application",
        esText: "Aceptar con mentalidad de crecimiento. Investigar protocolos de HTN dirigidos por enfermeros de otros FQHCs (NACHC tiene estudios de caso), tomar un curso gratuito de mejora de calidad de IHI Open School para aprender metodología PDSA, y diseñar un piloto simple: empezar con tu propio panel de pacientes, implementar intervenciones basadas en evidencia (reverdificaciones de PA en cada visita, llamadas de seguimiento de adherencia a medicamentos, kits de monitoreo de PA en casa), rastrear resultados mensualmente, luego escalar a otros enfermeros después de probar resultados. Esto te posiciona como líder clínico y fortalece la solicitud HRSA de tu FQHC",
        score: 4,
        behaviorTag: "evidence-based-qi-leader",
      },
      {
        id: "rs_rn_g3_b",
        text: "Accept but negotiate for structured support — a QI mentor, dedicated time away from patient care for data analysis, and clear expectations about what success looks like before you start",
        esText: "Aceptar pero negociar apoyo estructurado — un mentor de QI, tiempo dedicado fuera de la atención al paciente para análisis de datos, y expectativas claras sobre cómo se ve el éxito antes de empezar",
        score: 3,
        behaviorTag: "supported-grower",
      },
      {
        id: "rs_rn_g3_c",
        text: "Suggest the medical director lead the initiative since hypertension management is really a provider-driven issue — nurses can support but shouldn't design the intervention",
        esText: "Sugerir que el director médico lidere la iniciativa ya que el manejo de hipertensión es realmente un problema dirigido por proveedores — los enfermeros pueden apoyar pero no deberían diseñar la intervención",
        score: 2,
        behaviorTag: "defers-leadership",
      },
      {
        id: "rs_rn_g3_d",
        text: "Decline — you're a bedside nurse, not a project manager. QI work should be done by someone with MPH or quality improvement certification",
        esText: "Declinar — eres un/a enfermero/a de cabecera, no un/a gerente de proyectos. El trabajo de QI debería ser hecho por alguien con MPH o certificación en mejora de calidad",
        score: 1,
        behaviorTag: "credential-gatekeeping",
      },
    ],
  },

  // Registered Nurse - Transition 2
  {
    id: "rs_rn_transition_2",
    roleId: "registered_nurse",
    domain: "transition",
    scenario:
      "You've just started at an FQHC that uses OCHIN Epic, but your previous 8 years of nursing experience were all on Cerner. On your third day, you're struggling to find where to document nursing assessments, how to review medication lists, and where the immunization module is. The providers are already handing you orders and expecting you to work at speed. Another nurse says, 'Just document in free text for now — we'll fix it later.' You know that free-text documentation won't pull into quality reports.",
    esScenario:
      "Acabas de comenzar en un FQHC que usa OCHIN Epic, pero tus 8 años previos de experiencia en enfermería fueron todos en Cerner. En tu tercer día, estás luchando para encontrar dónde documentar evaluaciones de enfermería, cómo revisar listas de medicamentos, y dónde está el módulo de inmunización. Los proveedores ya te están dando órdenes y esperan que trabajes a velocidad. Otra enfermera dice: 'Solo documenta en texto libre por ahora — lo arreglaremos después.' Sabes que la documentación en texto libre no se extrae en reportes de calidad.",
    question: "How do you handle the EHR transition?",
    esQuestion: "¿Cómo manejas la transición de EHR?",
    options: [
      {
        id: "rs_rn_t2_a",
        text: "Reject the free-text shortcut because you know it creates downstream data quality problems. Instead, ask your supervisor for access to OCHIN Epic training modules (they exist online), spend 30 minutes before or after shifts this week practicing in the training environment, and create a personal 'cheat sheet' mapping your most common Cerner workflows to their Epic equivalents. Identify the clinic's Epic super-user and ask for a 15-minute daily check-in during your first two weeks. Accept that you'll be slower initially but maintain documentation quality from day one",
        esText: "Rechazar el atajo de texto libre porque sabes que crea problemas de calidad de datos posteriores. En cambio, pedir a tu supervisor acceso a los módulos de capacitación de OCHIN Epic (existen en línea), dedicar 30 minutos antes o después de turnos esta semana practicando en el entorno de entrenamiento, y crear una 'hoja de referencia' personal mapeando tus flujos de trabajo más comunes de Cerner a sus equivalentes en Epic. Identificar al super-usuario de Epic de la clínica y pedir un check-in diario de 15 minutos durante tus primeras dos semanas. Aceptar que serás más lento/a inicialmente pero mantener la calidad de documentación desde el día uno",
        score: 4,
        behaviorTag: "quality-preserving-learner",
      },
      {
        id: "rs_rn_t2_b",
        text: "Accept that you'll need extra time initially, ask a colleague to show you the most critical workflows (med rec, nursing assessment, immunizations), and request additional Epic training from your supervisor",
        esText: "Aceptar que necesitarás tiempo extra inicialmente, pedir a un colega que te muestre los flujos de trabajo más críticos (rec de medicamentos, evaluación de enfermería, inmunizaciones), y solicitar capacitación adicional de Epic a tu supervisor",
        score: 3,
        behaviorTag: "help-seeking-learner",
      },
      {
        id: "rs_rn_t2_c",
        text: "Follow the other nurse's advice and document in free text for now — getting through the day safely is more important than perfect documentation, and you can learn the structured fields later",
        esText: "Seguir el consejo de la otra enfermera y documentar en texto libre por ahora — superar el día de forma segura es más importante que la documentación perfecta, y puedes aprender los campos estructurados después",
        score: 2,
        behaviorTag: "shortcut-taker",
      },
      {
        id: "rs_rn_t2_d",
        text: "Tell your supervisor the FQHC's EHR onboarding is inadequate and that you shouldn't be expected to work independently on a new system with only basic orientation. Request to shadow another nurse for a full week before taking your own patient assignments",
        esText: "Decirle a tu supervisor que la incorporación de EHR del FQHC es inadecuada y que no deberían esperar que trabajes independientemente en un nuevo sistema con solo orientación básica. Solicitar acompañar a otro enfermero por una semana completa antes de tomar tus propias asignaciones de pacientes",
        score: 1,
        behaviorTag: "productivity-blocking",
      },
    ],
  },

  // Registered Nurse - Transition 3
  {
    id: "rs_rn_transition_3",
    roleId: "registered_nurse",
    domain: "transition",
    scenario:
      "During your first week at a new FQHC, you discover that the clinic's vaccine storage refrigerator has no temperature log for the past two weeks — the previous nurse who managed the vaccine program left and nobody took over monitoring. You open the fridge and find the thermometer reading 48°F (CDC recommends 36-46°F for most vaccines). There's approximately $8,000 worth of VFC (Vaccines for Children) vaccines inside. The clinic manager doesn't seem alarmed: 'It's probably fine — we've never had a problem.'",
    esScenario:
      "Durante tu primera semana en un nuevo FQHC, descubres que el refrigerador de almacenamiento de vacunas de la clínica no tiene registro de temperatura de las últimas dos semanas — la enfermera anterior que manejaba el programa de vacunas se fue y nadie tomó el monitoreo. Abres el refrigerador y encuentras que el termómetro marca 48°F (el CDC recomienda 36-46°F para la mayoría de las vacunas). Hay aproximadamente $8,000 en vacunas VFC (Vacunas para Niños) adentro. La gerente de clínica no parece alarmada: 'Probablemente está bien — nunca hemos tenido un problema.'",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rn_t3_a",
        text: "Treat this as an urgent compliance and patient safety issue. Immediately quarantine the vaccines (mark 'DO NOT USE' and separate from new stock), begin a temperature log starting today, and contact the VFC program coordinator at the county to report the excursion and get guidance on vaccine viability. Research the specific temperature stability data for each vaccine in the fridge — some may be salvageable. Present the situation to the clinic manager with the facts: an unreported VFC storage excursion can result in program sanctions, loss of free vaccine supply, and potential harm if ineffective vaccines were administered. Volunteer to take over vaccine program management and establish proper protocols",
        esText: "Tratar esto como un problema urgente de cumplimiento y seguridad del paciente. Inmediatamente poner en cuarentena las vacunas (marcar 'NO USAR' y separar del stock nuevo), comenzar un registro de temperatura a partir de hoy, y contactar al coordinador del programa VFC del condado para reportar la excursión y obtener orientación sobre la viabilidad de las vacunas. Investigar los datos específicos de estabilidad de temperatura para cada vacuna en el refrigerador — algunas pueden ser recuperables. Presentar la situación a la gerente de clínica con los hechos: una excursión de almacenamiento VFC no reportada puede resultar en sanciones al programa, pérdida de suministro gratuito de vacunas, y daño potencial si se administraron vacunas ineficaces. Ofrecerse para asumir la gestión del programa de vacunas y establecer protocolos adecuados",
        score: 4,
        behaviorTag: "compliance-aware-leader",
      },
      {
        id: "rs_rn_t3_b",
        text: "Start a temperature log immediately, adjust the refrigerator temperature, and report the excursion to the medical director. Let them decide whether to contact the VFC program",
        esText: "Comenzar un registro de temperatura inmediatamente, ajustar la temperatura del refrigerador, y reportar la excursión al director médico. Dejarles decidir si contactar al programa VFC",
        score: 3,
        behaviorTag: "partial-responder",
      },
      {
        id: "rs_rn_t3_c",
        text: "Adjust the refrigerator temperature to the proper range, start logging temperatures going forward, and keep an eye on it — the vaccines have probably been fine since the excursion is only 2 degrees above the upper limit",
        esText: "Ajustar la temperatura del refrigerador al rango adecuado, comenzar a registrar temperaturas en adelante, y vigilarlo — las vacunas probablemente están bien ya que la excursión es solo 2 grados por encima del límite superior",
        score: 2,
        behaviorTag: "minimizer",
      },
      {
        id: "rs_rn_t3_d",
        text: "You're new — bringing up a vaccine storage problem in your first week will look like you're criticizing the previous nurse and the clinic. Make a note and wait until you've built relationships before raising compliance issues",
        esText: "Eres nuevo/a — plantear un problema de almacenamiento de vacunas en tu primera semana parecerá que estás criticando a la enfermera anterior y a la clínica. Tomar nota y esperar hasta que hayas construido relaciones antes de plantear problemas de cumplimiento",
        score: 1,
        behaviorTag: "relationship-over-safety",
      },
    ],
  },

  // ============================================================
  // Patient Services Representative — Additional Questions (10)
  // ============================================================

  // Patient Services Representative - Mission 2
  {
    id: "rs_ps_mission_2",
    roleId: "patient_services",
    domain: "mission",
    scenario:
      "An elderly patient arrives for her appointment 45 minutes late. Your FQHC has a strict 15-minute late policy — patients who arrive more than 15 minutes late must reschedule. The patient is distressed: she took two buses to get here, her daughter couldn't drive her today, and she hasn't seen a doctor in 8 months because she keeps missing appointments for the same transportation reason. She's due for a critical diabetes check-up. The provider's schedule has a gap in 20 minutes from a cancellation.",
    esScenario:
      "Una paciente anciana llega a su cita 45 minutos tarde. Tu FQHC tiene una política estricta de 15 minutos de retraso — los pacientes que llegan más de 15 minutos tarde deben reprogramar. La paciente está angustiada: tomó dos autobuses para llegar, su hija no pudo llevarla hoy, y no ha visto a un médico en 8 meses porque sigue perdiendo citas por la misma razón de transporte. Tiene una revisión crítica de diabetes pendiente. El horario del proveedor tiene un espacio en 20 minutos por una cancelación.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ps_m2_a",
        text: "Use clinical judgment over rigid policy. Check if the provider can see her in the cancellation gap — the 8-month care gap for a diabetic patient is a clinical risk. While she waits, update her chart, verify her Medi-Cal eligibility, and connect her with your clinic's transportation assistance program or county Medi-Cal non-emergency medical transportation benefit. Flag her chart for transportation barriers so future appointments can be scheduled with this in mind. Afterward, bring the pattern to your supervisor — if multiple patients are missing appointments due to transportation, the late policy may need a clinical exception process",
        esText: "Usar juicio clínico sobre la política rígida. Verificar si el proveedor puede verla en el espacio de cancelación — la brecha de atención de 8 meses para una paciente diabética es un riesgo clínico. Mientras espera, actualizar su expediente, verificar su elegibilidad de Medi-Cal, y conectarla con el programa de asistencia de transporte de tu clínica o el beneficio de transporte médico no emergente de Medi-Cal del condado. Marcar su expediente por barreras de transporte para que futuras citas se programen con esto en mente. Después, llevar el patrón a tu supervisor — si múltiples pacientes están perdiendo citas por transporte, la política de retraso podría necesitar un proceso de excepción clínica",
        score: 4,
        behaviorTag: "mission-driven-problem-solver",
      },
      {
        id: "rs_ps_m2_b",
        text: "Check if the provider has availability in the cancellation slot and try to fit her in. Reschedule her for the next available appointment if not, and mention that the clinic may have transportation resources",
        esText: "Verificar si el proveedor tiene disponibilidad en el espacio de cancelación e intentar acomodarla. Reprogramarla para la próxima cita disponible si no, y mencionar que la clínica puede tener recursos de transporte",
        score: 3,
        behaviorTag: "flexible-within-system",
      },
      {
        id: "rs_ps_m2_c",
        text: "Apologize but explain the policy — she'll need to reschedule. Offer to book her the earliest available appointment and suggest she call ahead if she's running late next time",
        esText: "Disculparse pero explicar la política — necesitará reprogramar. Ofrecer reservarle la cita disponible más próxima y sugerir que llame con anticipación si se retrasa la próxima vez",
        score: 2,
        behaviorTag: "policy-enforcer",
      },
      {
        id: "rs_ps_m2_d",
        text: "Follow the late policy — if you make exceptions for one patient, everyone will expect exceptions. Reschedule her and move on to the next patient in line",
        esText: "Seguir la política de retraso — si haces excepciones para un paciente, todos esperarán excepciones. Reprogramarla y pasar al siguiente paciente en la fila",
        score: 1,
        behaviorTag: "rigid-rule-follower",
      },
    ],
  },

  // Patient Services Representative - Mission 3
  {
    id: "rs_ps_mission_3",
    roleId: "patient_services",
    domain: "mission",
    scenario:
      "A patient who you know is undocumented comes to the front desk to apply for the sliding fee discount program. While filling out the application, they freeze at the income verification section and whisper, 'I get paid in cash — I don't have pay stubs or tax returns. Does that mean I can't get the discount?' They look around nervously. You know that HRSA requires FQHCs to have a sliding fee scale and that self-attestation of income is allowed under HRSA guidelines.",
    esScenario:
      "Un paciente que sabes que es indocumentado viene a la recepción para solicitar el programa de descuento de tarifa escalonada. Mientras llena la solicitud, se detiene en la sección de verificación de ingresos y susurra: 'Me pagan en efectivo — no tengo talones de pago ni declaraciones de impuestos. ¿Eso significa que no puedo obtener el descuento?' Mira a su alrededor nerviosamente. Sabes que HRSA requiere que los FQHCs tengan una tarifa escalonada y que la auto-declaración de ingresos está permitida bajo las directrices de HRSA.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ps_m3_a",
        text: "Reassure the patient quietly and warmly — 'You absolutely qualify to apply. You don't need pay stubs.' Explain that the FQHC accepts self-attestation of income, which means they can write down their estimated monthly income and sign a statement. Walk them through the form step by step, help them calculate an approximate income, and ensure they know this program exists specifically so that everyone can access care regardless of documentation or payment method. Never ask about immigration status — it's not relevant to the sliding fee application",
        esText: "Tranquilizar al paciente de forma cálida y discreta — 'Absolutamente califica para solicitar. No necesita talones de pago.' Explicar que el FQHC acepta auto-declaración de ingresos, lo que significa que puede escribir su ingreso mensual estimado y firmar una declaración. Guiarlos paso a paso por el formulario, ayudarles a calcular un ingreso aproximado, y asegurar que sepan que este programa existe específicamente para que todos puedan acceder a atención sin importar la documentación o método de pago. Nunca preguntar sobre estatus migratorio — no es relevante para la solicitud de tarifa escalonada",
        score: 4,
        behaviorTag: "access-champion",
      },
      {
        id: "rs_ps_m3_b",
        text: "Tell them they can use self-attestation instead of pay stubs, help them complete the form, and submit it to the billing department for processing",
        esText: "Decirles que pueden usar auto-declaración en vez de talones de pago, ayudarles a completar el formulario, y enviarlo al departamento de facturación para procesamiento",
        score: 3,
        behaviorTag: "knowledgeable-helper",
      },
      {
        id: "rs_ps_m3_c",
        text: "Explain that you're not sure about the documentation requirements and offer to have the billing department call them back with the answer",
        esText: "Explicar que no estás seguro/a sobre los requisitos de documentación y ofrecer que el departamento de facturación les llame de vuelta con la respuesta",
        score: 2,
        behaviorTag: "uncertain-deferrer",
      },
      {
        id: "rs_ps_m3_d",
        text: "Tell them you'll need to check with your supervisor about whether cash income without documentation qualifies — you don't want to submit an incomplete application that gets rejected",
        esText: "Decirles que necesitarás verificar con tu supervisor si el ingreso en efectivo sin documentación califica — no quieres enviar una solicitud incompleta que sea rechazada",
        score: 1,
        behaviorTag: "bureaucratic-gatekeeper",
      },
    ],
  },

  // Patient Services Representative - People 2
  {
    id: "rs_ps_people_2",
    roleId: "patient_services",
    domain: "people",
    scenario:
      "A mother brings her three children (ages 2, 5, and 8) for their well-child visits. The 8-year-old has an appointment, but the other two don't — the mother says she tried to make appointments for all three but was told by phone that she could only schedule one child at a time. She took the day off work and can't come back. The kids are getting restless, the waiting room is full, and your colleague at the next station sighs and says loud enough for the mother to hear, 'People need to schedule properly — we're not a walk-in clinic.'",
    esScenario:
      "Una madre trae a sus tres hijos (de 2, 5 y 8 años) para sus exámenes de niño sano. El de 8 años tiene cita, pero los otros dos no — la madre dice que intentó hacer citas para los tres pero le dijeron por teléfono que solo podía programar un niño a la vez. Tomó el día libre del trabajo y no puede regresar. Los niños están inquietos, la sala de espera está llena, y tu colega en la estación de al lado suspira y dice lo suficientemente fuerte para que la madre escuche: 'La gente necesita programar correctamente — no somos una clínica sin cita.'",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ps_p2_a",
        text: "First, address the mother with empathy — apologize for the scheduling difficulty and validate that she did the right thing bringing all three. Check the providers' schedules to see if the other two children can be seen today — well-child visits are HEDIS measures and the FQHC benefits from completing them. If same-day isn't possible, schedule the other two for the next available date and offer to coordinate them together. Afterward, address your colleague privately — the comment was inappropriate and undermines patient trust. Also flag the scheduling issue to your supervisor: if the phone scheduling process prevents families from booking multiple children, it's a systems problem that needs fixing",
        esText: "Primero, dirigirse a la madre con empatía — disculparse por la dificultad de programación y validar que hizo lo correcto al traer a los tres. Verificar los horarios de los proveedores para ver si los otros dos niños pueden ser vistos hoy — las visitas de niño sano son medidas HEDIS y el FQHC se beneficia de completarlas. Si el mismo día no es posible, programar a los otros dos para la próxima fecha disponible y ofrecer coordinarlos juntos. Después, abordar a tu colega en privado — el comentario fue inapropiado y socava la confianza del paciente. También señalar el problema de programación a tu supervisor: si el proceso de programación telefónica previene que las familias reserven múltiples niños, es un problema de sistemas que necesita arreglo",
        score: 4,
        behaviorTag: "family-advocate-systems-fixer",
      },
      {
        id: "rs_ps_p2_b",
        text: "Help the mother check in the 8-year-old and try to add the other two as walk-ins. Ignore your colleague's comment for now and focus on solving the immediate problem",
        esText: "Ayudar a la madre a registrar al de 8 años e intentar agregar a los otros dos como pacientes sin cita. Ignorar el comentario de tu colega por ahora y enfocarte en resolver el problema inmediato",
        score: 3,
        behaviorTag: "action-focused",
      },
      {
        id: "rs_ps_p2_c",
        text: "Check in the 8-year-old for the scheduled appointment and help the mother schedule the other two children for the next available day. Explain the scheduling policy kindly",
        esText: "Registrar al de 8 años para la cita programada y ayudar a la madre a programar a los otros dos niños para el próximo día disponible. Explicar la política de programación amablemente",
        score: 2,
        behaviorTag: "policy-compliant",
      },
      {
        id: "rs_ps_p2_d",
        text: "Tell the mother you can only see the child with the appointment today. Give her the phone number to call back and schedule the other two individually — that's the process",
        esText: "Decirle a la madre que solo pueden ver al niño con cita hoy. Darle el número de teléfono para llamar y programar a los otros dos individualmente — ese es el proceso",
        score: 1,
        behaviorTag: "process-over-people",
      },
    ],
  },

  // Patient Services Representative - People 3
  {
    id: "rs_ps_people_3",
    roleId: "patient_services",
    domain: "people",
    scenario:
      "Your FQHC has a new call center system, and hold times have increased to 15-20 minutes. A patient standing at the front desk tells you — in Spanish — that she's been trying to call for three days to make an appointment for her husband who is having severe headaches and blurred vision, but she keeps getting disconnected after holding for 15 minutes. She's visibly frustrated and says, 'This clinic doesn't care about us anymore.' Two patients behind her are getting impatient.",
    esScenario:
      "Tu FQHC tiene un nuevo sistema de centro de llamadas, y los tiempos de espera han aumentado a 15-20 minutos. Una paciente parada en la recepción te dice — en español — que ha estado intentando llamar por tres días para hacer una cita para su esposo que tiene dolores de cabeza severos y visión borrosa, pero sigue siendo desconectada después de esperar 15 minutos. Está visiblemente frustrada y dice: 'Esta clínica ya no se preocupa por nosotros.' Dos pacientes detrás de ella se están impacientando.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ps_p3_a",
        text: "Respond in Spanish to immediately reduce the communication barrier. Validate her frustration: 'Tiene razón en estar frustrada — tres días es demasiado tiempo.' Address the clinical urgency first — severe headaches with blurred vision could indicate a serious condition, so schedule her husband for the earliest available appointment or a same-day slot if symptoms warrant it. While booking, briefly and warmly acknowledge the patients waiting behind her: 'I'll be right with you.' After resolving her issue, document the call center complaint and the pattern of disconnections — bring it to your supervisor with specifics so the phone system problem gets escalated",
        esText: "Responder en español para reducir inmediatamente la barrera de comunicación. Validar su frustración: 'Tiene razón en estar frustrada — tres días es demasiado tiempo.' Abordar la urgencia clínica primero — dolores de cabeza severos con visión borrosa podrían indicar una condición seria, así que programar a su esposo para la cita disponible más próxima o un horario del mismo día si los síntomas lo ameritan. Mientras reservas, reconocer breve y cálidamente a los pacientes esperando detrás: 'Los atiendo en un momento.' Después de resolver su problema, documentar la queja del centro de llamadas y el patrón de desconexiones — llevarlo a tu supervisor con detalles específicos para que el problema del sistema telefónico se escale",
        score: 4,
        behaviorTag: "bilingual-de-escalator-advocate",
      },
      {
        id: "rs_ps_p3_b",
        text: "Apologize for the phone issues, schedule the appointment for her husband right away, and suggest she come in person for scheduling until the phone system is fixed",
        esText: "Disculparse por los problemas telefónicos, programar la cita para su esposo de inmediato, y sugerir que venga en persona para programar hasta que se arregle el sistema telefónico",
        score: 3,
        behaviorTag: "immediate-resolver",
      },
      {
        id: "rs_ps_p3_c",
        text: "Tell her you understand the frustration, give her a direct number to reach the front desk instead of the call center, and schedule the appointment",
        esText: "Decirle que entiendes la frustración, darle un número directo para llegar a la recepción en vez del centro de llamadas, y programar la cita",
        score: 2,
        behaviorTag: "workaround-provider",
      },
      {
        id: "rs_ps_p3_d",
        text: "Explain that the new phone system is being improved and suggest she try calling during less busy hours — early morning or late afternoon. Schedule the appointment now since she's here",
        esText: "Explicar que el nuevo sistema telefónico está siendo mejorado y sugerir que intente llamar durante horas menos ocupadas — temprano en la mañana o al final de la tarde. Programar la cita ahora que está aquí",
        score: 1,
        behaviorTag: "deflector",
      },
    ],
  },

  // Patient Services Representative - Execution 2
  {
    id: "rs_ps_execution_2",
    roleId: "patient_services",
    domain: "execution",
    scenario:
      "Your clinic manager asks you to review last month's no-show data. You pull the report and find that your FQHC had a 32% no-show rate — well above the 15-20% industry average. Digging deeper, you notice a pattern: 80% of no-shows are for afternoon appointments, and most are Medi-Cal patients. The providers are frustrated because empty slots mean lost PPS revenue. The manager says, 'Just start overbooking afternoon slots.'",
    esScenario:
      "Tu gerente de clínica te pide que revises los datos de inasistencia del mes pasado. Extraes el informe y encuentras que tu FQHC tuvo una tasa de inasistencia del 32% — muy por encima del promedio de la industria del 15-20%. Al profundizar, notas un patrón: el 80% de las inasistencias son para citas de la tarde, y la mayoría son pacientes de Medi-Cal. Los proveedores están frustrados porque los espacios vacíos significan ingresos PPS perdidos. La gerente dice: 'Solo empieza a sobre-programar los horarios de la tarde.'",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_ps_e2_a",
        text: "Push back respectfully on blind overbooking — it creates chaos when everyone shows up. Instead, propose a data-driven approach: analyze WHY afternoon no-shows are higher (transportation? work schedules? childcare? appointment reminders not going out?), implement targeted interventions (confirmation calls 24 and 2 hours before, text reminders in Spanish and English, offer morning rescheduling for chronic no-show patients), and pilot smart overbooking only for specific time slots with the highest historical no-show rates. Track results weekly and adjust. Present this to the manager as a plan that recovers revenue without creating bottlenecks",
        esText: "Cuestionar respetuosamente la sobre-programación ciega — crea caos cuando todos llegan. En cambio, proponer un enfoque basado en datos: analizar POR QUÉ las inasistencias de la tarde son más altas (¿transporte? ¿horarios de trabajo? ¿cuidado de niños? ¿no se envían recordatorios de cita?), implementar intervenciones dirigidas (llamadas de confirmación 24 y 2 horas antes, recordatorios por texto en español e inglés, ofrecer reprogramación matutina para pacientes que faltan crónicamente), y pilotear sobre-programación inteligente solo para horarios específicos con las tasas históricas de inasistencia más altas. Rastrear resultados semanalmente y ajustar. Presentar esto a la gerente como un plan que recupera ingresos sin crear cuellos de botella",
        score: 4,
        behaviorTag: "data-driven-optimizer",
      },
      {
        id: "rs_ps_e2_b",
        text: "Implement overbooking for afternoon slots as requested, but also start a reminder call program — call patients the day before their appointment to confirm, and fill cancelled slots from a wait list",
        esText: "Implementar sobre-programación para horarios de la tarde como se solicitó, pero también iniciar un programa de llamadas recordatorias — llamar a pacientes el día anterior a su cita para confirmar, y llenar espacios cancelados de una lista de espera",
        score: 3,
        behaviorTag: "compliant-with-additions",
      },
      {
        id: "rs_ps_e2_c",
        text: "Start overbooking afternoon slots as the manager requested — they have more experience and this is a common solution to no-show problems in healthcare",
        esText: "Comenzar a sobre-programar los horarios de la tarde como solicitó la gerente — tiene más experiencia y esta es una solución común a problemas de inasistencia en salud",
        score: 2,
        behaviorTag: "directive-follower",
      },
      {
        id: "rs_ps_e2_d",
        text: "Tell the manager that no-shows are a patient behavior problem that can't really be solved from the front desk — patients need to take responsibility for their appointments",
        esText: "Decirle a la gerente que las inasistencias son un problema de comportamiento del paciente que realmente no puede resolverse desde la recepción — los pacientes necesitan tomar responsabilidad por sus citas",
        score: 1,
        behaviorTag: "blame-shifting",
      },
    ],
  },

  // Patient Services Representative - Execution 3
  {
    id: "rs_ps_execution_3",
    roleId: "patient_services",
    domain: "execution",
    scenario:
      "During a busy morning, you're processing a new patient registration when the Medi-Cal eligibility verification system goes down statewide. You have 8 new patients scheduled this morning who need insurance verification before being seen. Your clinic's policy requires verified insurance or sliding fee enrollment before a visit. The phones are ringing, patients are arriving, and the clinical staff is asking why patients aren't being roomed.",
    esScenario:
      "Durante una mañana ocupada, estás procesando el registro de un nuevo paciente cuando el sistema de verificación de elegibilidad de Medi-Cal se cae a nivel estatal. Tienes 8 pacientes nuevos programados esta mañana que necesitan verificación de seguro antes de ser vistos. La política de tu clínica requiere seguro verificado o inscripción en tarifa escalonada antes de una visita. Los teléfonos están sonando, los pacientes están llegando, y el personal clínico está preguntando por qué no se están pasando pacientes a las salas.",
    question: "How do you manage this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_ps_e3_a",
        text: "Don't let a system outage stop patient care. Ask each new patient for their Medi-Cal card or BIC, collect the CIN (Client Index Number) and record it manually, and register them with a note that eligibility verification is pending due to system outage. Notify the billing team that today's new patient visits will need retroactive verification when the system comes back. Inform your supervisor of the statewide outage so they can set clinic expectations. Keep patients flowing — your FQHC serves patients regardless of ability to pay, and a system outage doesn't change that mission. Check the system every 30 minutes and batch-verify when it's back up",
        esText: "No dejar que una caída del sistema detenga la atención al paciente. Pedir a cada paciente nuevo su tarjeta de Medi-Cal o BIC, recopilar el CIN (Número de Índice del Cliente) y registrarlo manualmente, y registrarlos con una nota de que la verificación de elegibilidad está pendiente por caída del sistema. Notificar al equipo de facturación que las visitas de pacientes nuevos de hoy necesitarán verificación retroactiva cuando el sistema regrese. Informar a tu supervisor de la caída estatal para que establezcan expectativas en la clínica. Mantener el flujo de pacientes — tu FQHC atiende a pacientes sin importar su capacidad de pago, y una caída del sistema no cambia esa misión. Verificar el sistema cada 30 minutos y verificar en lote cuando regrese",
        score: 4,
        behaviorTag: "mission-first-contingency-planner",
      },
      {
        id: "rs_ps_e3_b",
        text: "Collect patients' insurance cards, register them provisionally, and tell the clinical staff to proceed with visits. Verify eligibility retroactively when the system comes back online",
        esText: "Recopilar las tarjetas de seguro de los pacientes, registrarlos provisionalmente, y decir al personal clínico que procedan con las visitas. Verificar elegibilidad retroactivamente cuando el sistema regrese",
        score: 3,
        behaviorTag: "practical-adapter",
      },
      {
        id: "rs_ps_e3_c",
        text: "Ask new patients to wait in the lobby until the system comes back up, but proceed with patients who have existing verified insurance in the system",
        esText: "Pedir a los pacientes nuevos que esperen en el vestíbulo hasta que el sistema regrese, pero proceder con los pacientes que tienen seguro verificado existente en el sistema",
        score: 2,
        behaviorTag: "selective-gatekeeper",
      },
      {
        id: "rs_ps_e3_d",
        text: "Follow the policy — no verified insurance, no visit. Reschedule the new patients and tell them to come back when the system is working. You can't risk seeing patients without verified coverage",
        esText: "Seguir la política — sin seguro verificado, sin visita. Reprogramar a los pacientes nuevos y decirles que regresen cuando el sistema esté funcionando. No puedes arriesgarte a ver pacientes sin cobertura verificada",
        score: 1,
        behaviorTag: "policy-over-patients",
      },
    ],
  },

  // Patient Services Representative - Growth 2
  {
    id: "rs_ps_growth_2",
    roleId: "patient_services",
    domain: "growth",
    scenario:
      "Your FQHC is hiring a new Patient Services Supervisor — a position that would be your direct manager. The clinic director encourages you to apply, saying you've been there three years and 'know the operation better than anyone.' The role requires overseeing 6 front desk staff, managing the scheduling template, running monthly access reports, and presenting patient satisfaction data to leadership. You've never supervised anyone or presented to leadership.",
    esScenario:
      "Tu FQHC está contratando un nuevo Supervisor de Servicios al Paciente — una posición que sería tu gerente directo. El director de clínica te anima a postularte, diciendo que llevas tres años ahí y 'conoces la operación mejor que nadie.' El rol requiere supervisar a 6 empleados de recepción, manejar la plantilla de programación, ejecutar informes mensuales de acceso, y presentar datos de satisfacción del paciente al liderazgo. Nunca has supervisado a nadie ni presentado ante el liderazgo.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ps_g2_a",
        text: "Apply with confidence in what you know and a plan for what you don't. Your three years of operational knowledge is exactly the foundation a supervisor needs. Before the interview, prepare by: learning the basics of scheduling template management (ask the current supervisor or operations manager to walk you through it), reviewing last quarter's access and satisfaction reports to understand the metrics, and writing down specific examples of times you've trained or mentored new staff — that's informal supervision. In the interview, be honest that formal management is new to you, but present a 90-day plan showing how you'd use your operational expertise to improve front desk workflows",
        esText: "Postularte con confianza en lo que sabes y un plan para lo que no. Tus tres años de conocimiento operacional son exactamente la base que un supervisor necesita. Antes de la entrevista, prepararte: aprender lo básico de la gestión de plantilla de programación (pedir al supervisor actual o gerente de operaciones que te lo explique), revisar los informes de acceso y satisfacción del último trimestre para entender las métricas, y escribir ejemplos específicos de veces que has capacitado o mentoreado a personal nuevo — eso es supervisión informal. En la entrevista, ser honesto/a de que la gestión formal es nueva para ti, pero presentar un plan de 90 días mostrando cómo usarías tu experiencia operacional para mejorar los flujos de trabajo de recepción",
        score: 4,
        behaviorTag: "growth-minded-self-advocate",
      },
      {
        id: "rs_ps_g2_b",
        text: "Apply for the position but also enroll in a healthcare management or supervisory skills course to prepare. Ask the clinic director for feedback on what the role requires and where you'd need to grow",
        esText: "Postularte para la posición pero también inscribirte en un curso de gestión de salud o habilidades de supervisión para prepararte. Pedir al director de clínica retroalimentación sobre lo que requiere el rol y dónde necesitarías crecer",
        score: 3,
        behaviorTag: "willing-but-cautious",
      },
      {
        id: "rs_ps_g2_c",
        text: "Express interest but suggest that you'd be better as an 'assistant supervisor' first — taking on some responsibilities while learning management skills before becoming the full supervisor",
        esText: "Expresar interés pero sugerir que serías mejor como 'asistente de supervisor' primero — asumiendo algunas responsabilidades mientras aprendes habilidades de gestión antes de ser el supervisor completo",
        score: 2,
        behaviorTag: "step-incremental",
      },
      {
        id: "rs_ps_g2_d",
        text: "Thank the director for the encouragement but decline — you're good at front desk work and don't want the stress of supervising former peers. Let them find someone with management experience",
        esText: "Agradecer al director por el ánimo pero declinar — eres bueno/a en el trabajo de recepción y no quieres el estrés de supervisar a antiguos compañeros. Dejar que encuentren a alguien con experiencia en gestión",
        score: 1,
        behaviorTag: "comfort-zone-protector",
      },
    ],
  },

  // Patient Services Representative - Growth 3
  {
    id: "rs_ps_growth_3",
    roleId: "patient_services",
    domain: "growth",
    scenario:
      "Your FQHC is rolling out a Medi-Cal enrollment assistance program and wants front desk staff to become certified application assistors (CAAs). This means completing a 24-hour state training, passing an exam, and then helping uninsured patients apply for Medi-Cal coverage during their visits. The training is on your own time (two Saturdays), and the FQHC will pay for it but not pay overtime. Some colleagues think it's unfair to ask front desk staff to get certified on their weekends.",
    esScenario:
      "Tu FQHC está implementando un programa de asistencia de inscripción en Medi-Cal y quiere que el personal de recepción se certifique como asistores de solicitud certificados (CAAs). Esto significa completar una capacitación estatal de 24 horas, aprobar un examen, y luego ayudar a pacientes sin seguro a solicitar cobertura de Medi-Cal durante sus visitas. La capacitación es en tu tiempo libre (dos sábados), y el FQHC la pagará pero no pagará horas extra. Algunos colegas piensan que es injusto pedir al personal de recepción que se certifiquen en sus fines de semana.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_ps_g3_a",
        text: "Sign up for the training. Being a certified application assistor makes you more valuable to the FQHC and to patients — you'll be the person who can take an uninsured patient walking in the door and walk them out with Medi-Cal coverage. This is a credential that stays with you and opens doors to enrollment coordinator or patient navigator roles. Advocate to your supervisor that future trainings should be during work hours, but don't let that stop you from getting certified now. Helping patients access coverage is directly aligned with why FQHCs exist",
        esText: "Inscribirte en la capacitación. Ser un asistor de solicitud certificado te hace más valioso/a para el FQHC y para los pacientes — serás la persona que puede tomar a un paciente sin seguro que entra por la puerta y sacarlo con cobertura de Medi-Cal. Esta es una credencial que se queda contigo y abre puertas a roles de coordinador de inscripción o navegador de pacientes. Abogar ante tu supervisor para que futuras capacitaciones sean durante horas laborales, pero no dejar que eso te impida certificarte ahora. Ayudar a los pacientes a acceder a cobertura está directamente alineado con la razón por la que existen los FQHCs",
        score: 4,
        behaviorTag: "mission-aligned-investor",
      },
      {
        id: "rs_ps_g3_b",
        text: "Agree to do the training but formally request compensatory time off for the two Saturdays. The certification benefits the FQHC, so they should provide equivalent time back",
        esText: "Aceptar hacer la capacitación pero solicitar formalmente tiempo compensatorio por los dos sábados. La certificación beneficia al FQHC, así que deberían proporcionar tiempo equivalente de vuelta",
        score: 3,
        behaviorTag: "fair-negotiator",
      },
      {
        id: "rs_ps_g3_c",
        text: "Wait and see if the FQHC changes the training to work hours before signing up — other staff have valid concerns about unpaid weekend training requirements",
        esText: "Esperar a ver si el FQHC cambia la capacitación a horas laborales antes de inscribirte — otros empleados tienen preocupaciones válidas sobre requisitos de capacitación en fines de semana sin pago",
        score: 2,
        behaviorTag: "wait-for-better-terms",
      },
      {
        id: "rs_ps_g3_d",
        text: "Decline — enrollment assistance isn't your job, and giving up two Saturdays without overtime pay sets a bad precedent. Let the FQHC hire certified enrollment specialists",
        esText: "Declinar — la asistencia de inscripción no es tu trabajo, y ceder dos sábados sin pago de horas extra establece un mal precedente. Dejar que el FQHC contrate especialistas de inscripción certificados",
        score: 1,
        behaviorTag: "boundary-rigid",
      },
    ],
  },

  // Patient Services Representative - Transition 2
  {
    id: "rs_ps_transition_2",
    roleId: "patient_services",
    domain: "transition",
    scenario:
      "You've started at a new FQHC and quickly realize that the front desk workflow is very different from your previous clinic. At your old job, one person handled check-in and check-out. Here, check-in, check-out, phone calls, and referral scheduling are all done by the same person simultaneously. There's no written workflow guide, and each of the three front desk staff does things slightly differently — different greeting scripts, different ways of collecting copays, different processes for scanning insurance cards into the EHR.",
    esScenario:
      "Has comenzado en un nuevo FQHC y rápidamente te das cuenta de que el flujo de trabajo de recepción es muy diferente de tu clínica anterior. En tu trabajo anterior, una persona manejaba el registro de entrada y salida. Aquí, el registro de entrada, salida, llamadas telefónicas, y programación de referencias son todos hechos por la misma persona simultáneamente. No hay guía de flujo de trabajo escrita, y cada uno de los tres empleados de recepción hace las cosas de manera ligeramente diferente — diferentes guiones de saludo, diferentes formas de cobrar copagos, diferentes procesos para escanear tarjetas de seguro al EHR.",
    question: "How do you approach your first month?",
    esQuestion: "¿Cómo abordas tu primer mes?",
    options: [
      {
        id: "rs_ps_t2_a",
        text: "Observe first, then standardize. Spend your first week learning each colleague's approach — note what works best from each person's process. Then draft a simple front desk workflow checklist covering the 5 most common tasks (check-in, check-out, phone scheduling, copay collection, insurance scanning) using the best practices you observed. Share it with the team for feedback — frame it as 'I made this to help myself learn, but thought it might be useful for everyone.' This builds relationships, shows initiative, and creates the documentation the clinic is missing without positioning yourself as the new person who thinks they know better",
        esText: "Observar primero, luego estandarizar. Pasar tu primera semana aprendiendo el enfoque de cada colega — anotar qué funciona mejor del proceso de cada persona. Luego redactar una lista de verificación simple de flujo de trabajo de recepción cubriendo las 5 tareas más comunes (registro de entrada, salida, programación telefónica, cobro de copagos, escaneo de seguro) usando las mejores prácticas que observaste. Compartirla con el equipo para retroalimentación — enmarcarlo como 'Hice esto para ayudarme a aprender, pero pensé que podría ser útil para todos.' Esto construye relaciones, muestra iniciativa, y crea la documentación que le falta a la clínica sin posicionarte como la persona nueva que cree que sabe más",
        score: 4,
        behaviorTag: "observe-then-systematize",
      },
      {
        id: "rs_ps_t2_b",
        text: "Pick the colleague who seems most efficient and shadow them closely for the first week, adopting their workflow as your own. Ask questions and take notes so you can get up to speed quickly",
        esText: "Elegir al colega que parece más eficiente y seguirlo de cerca la primera semana, adoptando su flujo de trabajo como propio. Hacer preguntas y tomar notas para ponerte al día rápidamente",
        score: 3,
        behaviorTag: "model-follower",
      },
      {
        id: "rs_ps_t2_c",
        text: "Use your previous clinic's workflows as a starting point and adapt as you go. When things are done differently here, ask why — but default to what you know until someone corrects you",
        esText: "Usar los flujos de trabajo de tu clínica anterior como punto de partida y adaptar sobre la marcha. Cuando las cosas se hacen de manera diferente aquí, preguntar por qué — pero defaultear a lo que sabes hasta que alguien te corrija",
        score: 2,
        behaviorTag: "old-habits-default",
      },
      {
        id: "rs_ps_t2_d",
        text: "Tell your supervisor that the lack of standardized workflows is creating inconsistencies that affect patient experience and ask them to create an official front desk manual before you fully take on the role",
        esText: "Decirle a tu supervisor que la falta de flujos de trabajo estandarizados está creando inconsistencias que afectan la experiencia del paciente y pedirles que creen un manual oficial de recepción antes de que asumas completamente el rol",
        score: 1,
        behaviorTag: "waits-for-structure",
      },
    ],
  },

  // Patient Services Representative - Transition 3
  {
    id: "rs_ps_transition_3",
    roleId: "patient_services",
    domain: "transition",
    scenario:
      "In your second week at a new FQHC, you notice that the sliding fee discount schedule posted in the waiting area hasn't been updated since 2023 — the income thresholds are based on the 2023 Federal Poverty Level, not the 2026 guidelines. This means some patients may be paying more than they should. When you mention it to the front desk lead, she says, 'Oh, we've been meaning to update that. It hasn't caused any issues.' You also discover that the FQHC's sliding fee application form is only available in English, even though 60% of patients are Spanish-speaking.",
    esScenario:
      "En tu segunda semana en un nuevo FQHC, notas que el programa de descuento de tarifa escalonada publicado en la sala de espera no ha sido actualizado desde 2023 — los umbrales de ingreso están basados en el Nivel Federal de Pobreza de 2023, no en las directrices de 2026. Esto significa que algunos pacientes pueden estar pagando más de lo que deberían. Cuando lo mencionas a la líder de recepción, ella dice: 'Oh, hemos querido actualizar eso. No ha causado ningún problema.' También descubres que el formulario de solicitud de tarifa escalonada del FQHC solo está disponible en inglés, aunque el 60% de los pacientes habla español.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_ps_t3_a",
        text: "Treat this as both a HRSA compliance issue and a patient equity issue — it has caused problems, patients just don't know they're overpaying. Research the 2026 FPL guidelines yourself and draft an updated sliding fee schedule. Translate the application form into Spanish (or find your FQHC's translation resources). Present both updates to the front desk lead and the operations manager together, framing it as: 'I noticed this during onboarding and wanted to help — updating the FPL thresholds and having a Spanish form will protect us during HRSA site visits and make sure our patients are getting the discounts they're entitled to.' Offer to help implement the changes and retrain the team on the updated schedule",
        esText: "Tratar esto como un problema de cumplimiento con HRSA y un problema de equidad para el paciente — ha causado problemas, los pacientes simplemente no saben que están pagando de más. Investigar las directrices del FPL 2026 tú mismo/a y redactar un programa de tarifa escalonada actualizado. Traducir el formulario de solicitud al español (o encontrar los recursos de traducción de tu FQHC). Presentar ambas actualizaciones a la líder de recepción y al gerente de operaciones juntos, enmarcándolo como: 'Noté esto durante la incorporación y quise ayudar — actualizar los umbrales del FPL y tener un formulario en español nos protegerá durante las visitas de sitio de HRSA y asegurará que nuestros pacientes reciban los descuentos a los que tienen derecho.' Ofrecer ayudar a implementar los cambios y re-capacitar al equipo sobre el programa actualizado",
        score: 4,
        behaviorTag: "compliance-equity-champion",
      },
      {
        id: "rs_ps_t3_b",
        text: "Bring both issues to the operations manager or clinic director formally — the outdated FPL thresholds and the English-only form — and ask them to prioritize updates since these are HRSA compliance requirements",
        esText: "Llevar ambos problemas al gerente de operaciones o director de clínica formalmente — los umbrales FPL desactualizados y el formulario solo en inglés — y pedirles que prioricen las actualizaciones ya que estos son requisitos de cumplimiento de HRSA",
        score: 3,
        behaviorTag: "escalation-focused",
      },
      {
        id: "rs_ps_t3_c",
        text: "Make a note to bring it up at the next staff meeting. The front desk lead said it hasn't caused issues, and you don't want to overstep in your second week",
        esText: "Tomar nota para mencionarlo en la próxima reunión de personal. La líder de recepción dijo que no ha causado problemas, y no quieres excederte en tu segunda semana",
        score: 2,
        behaviorTag: "deferred-action",
      },
      {
        id: "rs_ps_t3_d",
        text: "The front desk lead has been here longer and knows the clinic better — if she says it hasn't caused problems, trust her judgment. Focus on learning your own role before trying to fix things",
        esText: "La líder de recepción ha estado aquí más tiempo y conoce mejor la clínica — si ella dice que no ha causado problemas, confiar en su juicio. Enfocarte en aprender tu propio rol antes de intentar arreglar cosas",
        score: 1,
        behaviorTag: "seniority-deference",
      },
    ],
  },

  // ============================================================
  // Revenue Cycle Specialist — Additional Questions (10)
  // ============================================================

  // Revenue Cycle Specialist - Mission 2
  {
    id: "rs_rc_mission_2",
    roleId: "revenue_cycle",
    domain: "mission",
    scenario:
      "Your FQHC's 340B program has been generating $1.2M annually in drug savings, but a recent internal audit reveals that contract pharmacy arrangements have compliance gaps — some prescriptions dispensed through the contract pharmacy weren't properly linked to 340B-eligible patients, creating potential duplicate discount violations. The pharmacy director says, 'We've always done it this way and nobody's been audited.' HRSA has been increasing 340B audit activity in 2026.",
    esScenario:
      "El programa 340B de tu FQHC ha estado generando $1.2M anuales en ahorros de medicamentos, pero una auditoría interna reciente revela que los arreglos de farmacia contratada tienen brechas de cumplimiento — algunas recetas dispensadas a través de la farmacia contratada no fueron vinculadas correctamente a pacientes elegibles para 340B, creando posibles violaciones de descuento duplicado. El director de farmacia dice: 'Siempre lo hemos hecho así y nadie nos ha auditado.' HRSA ha estado aumentando la actividad de auditoría 340B en 2026.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rc_m2_a",
        text: "Treat this as an urgent compliance risk that protects the FQHC's most valuable revenue stream. Document the specific gaps found in the audit — which prescriptions, which patients, which dates. Research current HRSA 340B audit enforcement actions to quantify the risk (other FQHCs have lost 340B eligibility entirely). Present findings to the CFO and CEO with a clear message: 'We have $1.2M in annual savings at risk if we don't fix this before an audit.' Propose an immediate remediation plan: reconcile the flagged prescriptions, implement prospective eligibility verification at the point of dispensing, and consider engaging a 340B compliance consultant for a mock audit. Frame the pharmacy director's objection as a known compliance risk, not a valid defense",
        esText: "Tratar esto como un riesgo de cumplimiento urgente que protege la fuente de ingresos más valiosa del FQHC. Documentar las brechas específicas encontradas en la auditoría — qué recetas, qué pacientes, qué fechas. Investigar las acciones de cumplimiento de auditoría 340B actuales de HRSA para cuantificar el riesgo (otros FQHCs han perdido la elegibilidad 340B por completo). Presentar hallazgos al CFO y CEO con un mensaje claro: 'Tenemos $1.2M en ahorros anuales en riesgo si no arreglamos esto antes de una auditoría.' Proponer un plan de remediación inmediata: reconciliar las recetas marcadas, implementar verificación de elegibilidad prospectiva en el punto de dispensación, y considerar contratar un consultor de cumplimiento 340B para una auditoría simulada. Enmarcar la objeción del director de farmacia como un riesgo de cumplimiento conocido, no una defensa válida",
        score: 4,
        behaviorTag: "compliance-protector",
      },
      {
        id: "rs_rc_m2_b",
        text: "Escalate the audit findings to the CFO immediately with the recommendation to hire a 340B compliance consultant to assess the full scope of the problem and develop a corrective action plan",
        esText: "Escalar los hallazgos de auditoría al CFO inmediatamente con la recomendación de contratar un consultor de cumplimiento 340B para evaluar el alcance completo del problema y desarrollar un plan de acción correctiva",
        score: 3,
        behaviorTag: "appropriate-escalator",
      },
      {
        id: "rs_rc_m2_c",
        text: "Fix the compliance gaps going forward — implement proper eligibility verification for new 340B prescriptions — but don't dig into the historical discrepancies. What's done is done, and retroactive reconciliation could uncover larger problems",
        esText: "Arreglar las brechas de cumplimiento en adelante — implementar verificación de elegibilidad adecuada para nuevas recetas 340B — pero no indagar en las discrepancias históricas. Lo hecho está hecho, y la reconciliación retroactiva podría descubrir problemas más grandes",
        score: 2,
        behaviorTag: "forward-only-fixer",
      },
      {
        id: "rs_rc_m2_d",
        text: "The pharmacy director is right — if nobody has flagged this before and HRSA hasn't audited the FQHC, the risk is low. Focus your energy on bigger revenue cycle issues and let the pharmacy manage its own compliance",
        esText: "El director de farmacia tiene razón — si nadie ha señalado esto antes y HRSA no ha auditado al FQHC, el riesgo es bajo. Enfocar tu energía en problemas más grandes del ciclo de ingresos y dejar que la farmacia maneje su propio cumplimiento",
        score: 1,
        behaviorTag: "compliance-dismissive",
      },
    ],
  },

  // Revenue Cycle Specialist - Mission 3
  {
    id: "rs_rc_mission_3",
    roleId: "revenue_cycle",
    domain: "mission",
    scenario:
      "Your FQHC's CFO shows you a troubling trend: the payor mix has shifted from 65% Medi-Cal / 20% Medicare / 15% uninsured two years ago to 55% Medi-Cal / 15% Medicare / 30% uninsured today. The increase in uninsured patients is largely from the Medi-Cal redetermination process — patients who lost coverage and haven't re-enrolled. The sliding fee discount program costs are up 40%, and the CFO is considering restricting the sliding fee schedule to reduce losses. The medical director objects: 'We can't turn patients away — that's our mission.'",
    esScenario:
      "El CFO de tu FQHC te muestra una tendencia preocupante: la mezcla de pagadores ha cambiado de 65% Medi-Cal / 20% Medicare / 15% sin seguro hace dos años a 55% Medi-Cal / 15% Medicare / 30% sin seguro hoy. El aumento en pacientes sin seguro es en gran parte del proceso de redeterminación de Medi-Cal — pacientes que perdieron cobertura y no se han reinscrito. Los costos del programa de descuento de tarifa escalonada aumentaron 40%, y el CFO está considerando restringir la escala de tarifa escalonada para reducir pérdidas. El director médico objeta: 'No podemos rechazar pacientes — esa es nuestra misión.'",
    question: "What solution do you propose?",
    esQuestion: "¿Qué solución propones?",
    options: [
      {
        id: "rs_rc_m3_a",
        text: "Neither restricting the fee schedule nor ignoring the financial impact is the answer. Propose a re-enrollment initiative: identify every patient who lost Medi-Cal coverage by running eligibility reports, deploy front desk staff and CHWs to assist patients with re-enrollment at the point of care (every visit is a re-enrollment opportunity), and partner with county eligibility workers to hold monthly enrollment events at the clinic. Calculate the revenue recovery: each patient re-enrolled from sliding fee to Medi-Cal recovers the PPS rate difference. Present the CFO with projected ROI — a dedicated re-enrollment effort that converts even 50% of the 30% uninsured back to Medi-Cal will improve the payor mix more than restricting the fee schedule ever could, without compromising the mission",
        esText: "Ni restringir la escala de tarifas ni ignorar el impacto financiero es la respuesta. Proponer una iniciativa de reinscripción: identificar a cada paciente que perdió cobertura de Medi-Cal ejecutando informes de elegibilidad, desplegar personal de recepción y CHWs para asistir a pacientes con reinscripción en el punto de atención (cada visita es una oportunidad de reinscripción), y asociarse con trabajadores de elegibilidad del condado para realizar eventos mensuales de inscripción en la clínica. Calcular la recuperación de ingresos: cada paciente reinscrito de tarifa escalonada a Medi-Cal recupera la diferencia de tarifa PPS. Presentar al CFO el ROI proyectado — un esfuerzo dedicado de reinscripción que convierta incluso el 50% del 30% sin seguro de vuelta a Medi-Cal mejorará la mezcla de pagadores más de lo que restringir la escala de tarifas podría, sin comprometer la misión",
        score: 4,
        behaviorTag: "mission-revenue-innovator",
      },
      {
        id: "rs_rc_m3_b",
        text: "Recommend a Medi-Cal re-enrollment campaign targeting the patients who lost coverage, while keeping the sliding fee schedule unchanged. Present the financial case that re-enrollment is more cost-effective than restricting access",
        esText: "Recomendar una campaña de reinscripción de Medi-Cal dirigida a los pacientes que perdieron cobertura, mientras se mantiene la escala de tarifa escalonada sin cambios. Presentar el caso financiero de que la reinscripción es más costo-efectiva que restringir el acceso",
        score: 3,
        behaviorTag: "revenue-recovery-focused",
      },
      {
        id: "rs_rc_m3_c",
        text: "Support the CFO's proposal to adjust the sliding fee schedule — the FQHC can still serve uninsured patients but with a more sustainable discount structure. HRSA requires a sliding fee scale but doesn't prescribe the specific discounts",
        esText: "Apoyar la propuesta del CFO de ajustar la escala de tarifa escalonada — el FQHC aún puede servir a pacientes sin seguro pero con una estructura de descuento más sostenible. HRSA requiere una escala de tarifa escalonada pero no prescribe los descuentos específicos",
        score: 2,
        behaviorTag: "financial-pragmatist",
      },
      {
        id: "rs_rc_m3_d",
        text: "Side with the medical director — restricting the fee schedule would violate the FQHC's mission. The clinic needs to find other revenue sources (grants, fundraising) to cover the increased uninsured volume",
        esText: "Ponerse del lado del director médico — restringir la escala de tarifas violaría la misión del FQHC. La clínica necesita encontrar otras fuentes de ingresos (subvenciones, recaudación de fondos) para cubrir el volumen aumentado de pacientes sin seguro",
        score: 1,
        behaviorTag: "mission-without-strategy",
      },
    ],
  },

  // Revenue Cycle Specialist - People 2
  {
    id: "rs_rc_people_2",
    roleId: "revenue_cycle",
    domain: "people",
    scenario:
      "A provider approaches you frustrated because three of her ECM patients' claims were denied for 'missing prior authorization.' She says she submitted the authorization requests through the EHR two weeks ago and 'billing should have followed up.' You check and discover the authorizations were submitted but never confirmed — they're sitting in 'pending' status because the managed care plan requires a follow-up call within 5 business days, which nobody made. This is a workflow gap between clinical and billing that has been costing the FQHC approximately $15,000/month in avoidable ECM denials.",
    esScenario:
      "Una proveedora se te acerca frustrada porque las reclamaciones de tres de sus pacientes ECM fueron denegadas por 'falta de autorización previa.' Dice que envió las solicitudes de autorización a través del EHR hace dos semanas y que 'facturación debería haber dado seguimiento.' Verificas y descubres que las autorizaciones fueron enviadas pero nunca confirmadas — están en estado 'pendiente' porque el plan de managed care requiere una llamada de seguimiento dentro de 5 días hábiles, que nadie hizo. Esta es una brecha de flujo de trabajo entre lo clínico y facturación que le ha estado costando al FQHC aproximadamente $15,000/mes en denegaciones ECM evitables.",
    question: "How do you respond?",
    esQuestion: "¿Cómo respondes?",
    options: [
      {
        id: "rs_rc_p2_a",
        text: "Acknowledge the provider's frustration without being defensive — the denials are real and the revenue loss is real. Explain what happened: the authorization was submitted but the managed care plan requires a confirmation call that nobody on either side knew was their responsibility. Then move from problem to solution: propose a clear authorization workflow that assigns responsibility — who submits, who follows up, who verifies confirmation, and by when. Offer to create a shared tracking spreadsheet or EHR task that both clinical and billing can see. Appeal the three denied claims immediately. Present the $15K/month data to your supervisor to justify making this a permanent process improvement, not just a one-time fix",
        esText: "Reconocer la frustración de la proveedora sin ser defensivo — las denegaciones son reales y la pérdida de ingresos es real. Explicar qué pasó: la autorización fue enviada pero el plan de managed care requiere una llamada de confirmación que nadie en ningún lado sabía que era su responsabilidad. Luego pasar del problema a la solución: proponer un flujo de trabajo de autorización claro que asigne responsabilidad — quién envía, quién da seguimiento, quién verifica confirmación, y para cuándo. Ofrecer crear una hoja de cálculo de seguimiento compartida o tarea en el EHR que tanto clínico como facturación puedan ver. Apelar las tres reclamaciones denegadas inmediatamente. Presentar los datos de $15K/mes a tu supervisor para justificar hacer esto una mejora de proceso permanente, no solo una corrección única",
        score: 4,
        behaviorTag: "workflow-architect",
      },
      {
        id: "rs_rc_p2_b",
        text: "Appeal the three denied claims right away, then set up a weekly authorization status check between billing and the clinical team to prevent this from happening again",
        esText: "Apelar las tres reclamaciones denegadas de inmediato, luego establecer una verificación semanal de estado de autorizaciones entre facturación y el equipo clínico para prevenir que esto suceda de nuevo",
        score: 3,
        behaviorTag: "fix-and-prevent",
      },
      {
        id: "rs_rc_p2_c",
        text: "Explain to the provider that the authorization follow-up call is ultimately a clinical responsibility — the billing team processes claims after authorization is confirmed, not before. Offer to help appeal the denials as a courtesy",
        esText: "Explicar a la proveedora que la llamada de seguimiento de autorización es en última instancia una responsabilidad clínica — el equipo de facturación procesa reclamaciones después de que la autorización es confirmada, no antes. Ofrecer ayudar a apelar las denegaciones como cortesía",
        score: 2,
        behaviorTag: "blame-clarifier",
      },
      {
        id: "rs_rc_p2_d",
        text: "Tell the provider that authorization follow-up isn't in your job description and she should take it up with the clinic manager. Process the appeals when you get to them in the normal queue",
        esText: "Decirle a la proveedora que el seguimiento de autorizaciones no está en tu descripción de trabajo y que debería hablarlo con el gerente de clínica. Procesar las apelaciones cuando llegues a ellas en la cola normal",
        score: 1,
        behaviorTag: "territorial-disengaged",
      },
    ],
  },

  // Revenue Cycle Specialist - People 3
  {
    id: "rs_rc_people_3",
    roleId: "revenue_cycle",
    domain: "people",
    scenario:
      "Your billing team colleague — who has been at the FQHC for 12 years — is still posting charges using CPT codes that were replaced two years ago. The old codes aren't technically wrong (the claims still process), but they don't capture the complexity of services being provided and are likely costing the FQHC revenue. When you bring it up casually, she says, 'My codes work fine. I've been doing this longer than you've been in healthcare.' The supervisor has never addressed it.",
    esScenario:
      "Tu colega del equipo de facturación — que ha estado en el FQHC por 12 años — sigue registrando cargos usando códigos CPT que fueron reemplazados hace dos años. Los códigos antiguos no están técnicamente mal (las reclamaciones aún se procesan), pero no capturan la complejidad de los servicios proporcionados y probablemente le están costando ingresos al FQHC. Cuando lo mencionas casualmente, ella dice: 'Mis códigos funcionan bien. He estado haciendo esto más tiempo del que llevas tú en el cuidado de salud.' El supervisor nunca lo ha abordado.",
    question: "How do you handle this?",
    esQuestion: "¿Cómo manejas esto?",
    options: [
      {
        id: "rs_rc_p3_a",
        text: "Don't make it personal — make it about the data. Pull a report comparing her claims to yours for the same service types, showing the revenue difference from the outdated codes versus the current ones. Calculate the annual revenue impact. Then bring both the data and a proposed solution to your supervisor: 'I've found a coding discrepancy that's costing us an estimated $X per year. I'd like to propose a team coding update session.' Frame it as a team-wide refresher (not singling her out), cover all the major code changes from the past two years, and provide updated reference materials. If the supervisor won't act, put it in writing so there's a record",
        esText: "No hacerlo personal — hacerlo sobre los datos. Sacar un informe comparando sus reclamaciones con las tuyas para los mismos tipos de servicio, mostrando la diferencia de ingresos de los códigos desactualizados versus los actuales. Calcular el impacto anual de ingresos. Luego llevar tanto los datos como una solución propuesta a tu supervisor: 'He encontrado una discrepancia de codificación que nos está costando un estimado de $X por año. Me gustaría proponer una sesión de actualización de codificación para el equipo.' Enmarcarlo como una actualización para todo el equipo (sin señalarla), cubrir todos los cambios de código importantes de los últimos dos años, y proporcionar materiales de referencia actualizados. Si el supervisor no actúa, ponerlo por escrito para que haya un registro",
        score: 4,
        behaviorTag: "data-driven-diplomat",
      },
      {
        id: "rs_rc_p3_b",
        text: "Bring the coding discrepancy to your supervisor directly and let them decide how to handle the training need — it's a management responsibility to ensure staff are using current codes",
        esText: "Llevar la discrepancia de codificación a tu supervisor directamente y dejarles decidir cómo manejar la necesidad de capacitación — es una responsabilidad de la gerencia asegurar que el personal use códigos actuales",
        score: 3,
        behaviorTag: "supervisor-escalator",
      },
      {
        id: "rs_rc_p3_c",
        text: "Drop it — her claims process fine and she has 12 years of experience. The revenue difference is probably marginal and not worth the workplace tension",
        esText: "Dejarlo — sus reclamaciones se procesan bien y tiene 12 años de experiencia. La diferencia de ingresos probablemente es marginal y no vale la tensión en el lugar de trabajo",
        score: 2,
        behaviorTag: "harmony-over-accuracy",
      },
      {
        id: "rs_rc_p3_d",
        text: "Start correcting her claims yourself when you notice outdated codes — it's faster than trying to change her habits, and the claims will be accurate",
        esText: "Comenzar a corregir sus reclamaciones tú mismo/a cuando notes códigos desactualizados — es más rápido que intentar cambiar sus hábitos, y las reclamaciones serán precisas",
        score: 1,
        behaviorTag: "silent-workaround",
      },
    ],
  },

  // Revenue Cycle Specialist - Execution 2
  {
    id: "rs_rc_execution_2",
    roleId: "revenue_cycle",
    domain: "execution",
    scenario:
      "Your FQHC receives a letter from a Medi-Cal managed care plan announcing that they're switching from a per-visit fee-for-service reimbursement to a capitated payment model for primary care visits, effective in 60 days. Under capitation, the plan will pay a flat monthly rate per enrolled member regardless of visit volume — the opposite of your current PPS reimbursement model. Your CFO is panicking because the FQHC hasn't done a utilization analysis and doesn't know if capitation will be financially viable. The contract must be signed or rejected in 30 days.",
    esScenario:
      "Tu FQHC recibe una carta de un plan de managed care de Medi-Cal anunciando que están cambiando de un reembolso de tarifa por servicio por visita a un modelo de pago capitado para visitas de atención primaria, efectivo en 60 días. Bajo capitación, el plan pagará una tarifa mensual fija por miembro inscrito sin importar el volumen de visitas — lo opuesto a tu modelo de reembolso PPS actual. Tu CFO está en pánico porque el FQHC no ha hecho un análisis de utilización y no sabe si la capitación será financieramente viable. El contrato debe firmarse o rechazarse en 30 días.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rc_e2_a",
        text: "Run the numbers immediately — this is a 30-day decision with long-term consequences. Pull 12 months of claims data for this plan's members: visit volume per member per year, average PPS reimbursement per visit, and total annual revenue from this plan. Calculate the break-even point: at what capitation rate does the FQHC earn the same or more than fee-for-service? Factor in that capitation incentivizes efficiency (fewer unnecessary visits) but penalizes high-utilizers (chronic disease patients who need frequent visits — your FQHC's core population). Present the CFO with three scenarios: best case, expected, and worst case. Recommend negotiation terms: a higher capitation rate for your patient acuity level, risk corridors to protect against losses in year one, and carve-outs for behavioral health and complex chronic disease management that should remain fee-for-service",
        esText: "Hacer los números inmediatamente — esta es una decisión de 30 días con consecuencias a largo plazo. Extraer 12 meses de datos de reclamaciones para los miembros de este plan: volumen de visitas por miembro por año, reembolso PPS promedio por visita, y ingresos anuales totales de este plan. Calcular el punto de equilibrio: ¿a qué tarifa de capitación el FQHC gana lo mismo o más que tarifa por servicio? Considerar que la capitación incentiva la eficiencia (menos visitas innecesarias) pero penaliza a los usuarios altos (pacientes con enfermedades crónicas que necesitan visitas frecuentes — la población central de tu FQHC). Presentar al CFO tres escenarios: mejor caso, esperado, y peor caso. Recomendar términos de negociación: una tarifa de capitación más alta por el nivel de agudeza de tus pacientes, corredores de riesgo para proteger contra pérdidas en el año uno, y excepciones para salud conductual y manejo de enfermedades crónicas complejas que deberían permanecer en tarifa por servicio",
        score: 4,
        behaviorTag: "financial-analyst-strategist",
      },
      {
        id: "rs_rc_e2_b",
        text: "Run a basic utilization analysis comparing current per-visit revenue to the proposed capitation rate. Present the comparison to the CFO with a recommendation to accept or reject based on the numbers",
        esText: "Ejecutar un análisis básico de utilización comparando los ingresos actuales por visita con la tarifa de capitación propuesta. Presentar la comparación al CFO con una recomendación de aceptar o rechazar basada en los números",
        score: 3,
        behaviorTag: "analytical-reporter",
      },
      {
        id: "rs_rc_e2_c",
        text: "Recommend rejecting the capitation contract — FQHCs with high-need patient populations generally lose money under capitation. Stick with the PPS fee-for-service model that's working",
        esText: "Recomendar rechazar el contrato de capitación — los FQHCs con poblaciones de pacientes de alta necesidad generalmente pierden dinero bajo capitación. Quedarse con el modelo PPS de tarifa por servicio que está funcionando",
        score: 2,
        behaviorTag: "risk-averse-default",
      },
      {
        id: "rs_rc_e2_d",
        text: "Tell the CFO this is above your pay grade — contract negotiations with managed care plans should involve a healthcare attorney and possibly a consultant. Wait for their guidance",
        esText: "Decirle al CFO que esto está por encima de tu nivel — las negociaciones de contrato con planes de managed care deberían involucrar un abogado de salud y posiblemente un consultor. Esperar su orientación",
        score: 1,
        behaviorTag: "abdication",
      },
    ],
  },

  // Revenue Cycle Specialist - Execution 3
  {
    id: "rs_rc_execution_3",
    roleId: "revenue_cycle",
    domain: "execution",
    scenario:
      "Your monthly aged accounts receivable report shows that $340,000 in claims over 90 days old remain unpaid. Breaking it down: $180,000 is from one Medi-Cal managed care plan that has been consistently slow-paying, $95,000 is from Medicare claims denied for timely filing, and $65,000 is from self-pay patients on the sliding fee schedule who haven't made payments. Your supervisor wants the over-90 AR reduced by 50% within 60 days.",
    esScenario:
      "Tu informe mensual de cuentas por cobrar antiguas muestra que $340,000 en reclamaciones de más de 90 días siguen sin pagar. Desglosándolo: $180,000 es de un plan de managed care de Medi-Cal que ha sido consistentemente lento para pagar, $95,000 es de reclamaciones de Medicare denegadas por presentación oportuna, y $65,000 es de pacientes de autopago en la escala de tarifa escalonada que no han hecho pagos. Tu supervisor quiere que las cuentas por cobrar de más de 90 días se reduzcan en 50% dentro de 60 días.",
    question: "How do you prioritize the work?",
    esQuestion: "¿Cómo priorizas el trabajo?",
    options: [
      {
        id: "rs_rc_e3_a",
        text: "Attack in order of recovery probability and dollar value. First, the $180K from the managed care plan — this is collectible revenue. Call the plan's provider relations, escalate the payment delays, reference your contract terms for timely payment requirements, and file batch follow-ups on every claim over 60 days. Second, the $95K Medicare timely filing denials — review each denial to see if any qualify for exceptions (system outages, payer delays) and appeal those immediately; write off the rest as lessons learned and implement a prevention system (weekly clean claims submission tracking). Third, the $65K self-pay — segment by amount: establish payment plans for patients with balances over $500, send statements to accounts under $200, and apply for any hardship write-off policies your FQHC has. Present your supervisor with a 60-day recovery forecast by category",
        esText: "Atacar en orden de probabilidad de recuperación y valor en dólares. Primero, los $180K del plan de managed care — estos son ingresos cobrables. Llamar a las relaciones con proveedores del plan, escalar los retrasos de pago, referenciar los términos de tu contrato para requisitos de pago oportuno, y presentar seguimientos en lote de cada reclamación de más de 60 días. Segundo, los $95K de denegaciones de Medicare por presentación oportuna — revisar cada denegación para ver si alguna califica para excepciones (caídas de sistema, retrasos del pagador) y apelar esas inmediatamente; cancelar el resto como lecciones aprendidas e implementar un sistema de prevención (seguimiento semanal de presentación de reclamaciones limpias). Tercero, los $65K de autopago — segmentar por monto: establecer planes de pago para pacientes con saldos mayores a $500, enviar estados de cuenta a cuentas menores de $200, y aplicar cualquier política de cancelación por dificultad que tu FQHC tenga. Presentar a tu supervisor un pronóstico de recuperación de 60 días por categoría",
        score: 4,
        behaviorTag: "strategic-ar-manager",
      },
      {
        id: "rs_rc_e3_b",
        text: "Start with the largest bucket — the $180K managed care balance. Call the plan, file follow-ups, and get those claims moving. Then work through the Medicare denials and self-pay accounts systematically",
        esText: "Empezar con el grupo más grande — el saldo de $180K de managed care. Llamar al plan, presentar seguimientos, y poner esas reclamaciones en movimiento. Luego trabajar las denegaciones de Medicare y cuentas de autopago sistemáticamente",
        score: 3,
        behaviorTag: "largest-first",
      },
      {
        id: "rs_rc_e3_c",
        text: "Focus on the Medicare timely filing denials first — those are the most time-sensitive since appeal deadlines are strict. Then address the managed care and self-pay accounts",
        esText: "Enfocarse primero en las denegaciones de Medicare por presentación oportuna — esas son las más sensibles al tiempo ya que los plazos de apelación son estrictos. Luego abordar las cuentas de managed care y autopago",
        score: 2,
        behaviorTag: "deadline-driven",
      },
      {
        id: "rs_rc_e3_d",
        text: "Tell your supervisor that a 50% reduction in 60 days is unrealistic with this volume. Ask for additional staff or extended timeline before committing to a plan",
        esText: "Decirle a tu supervisor que una reducción del 50% en 60 días es irreal con este volumen. Pedir personal adicional o un plazo extendido antes de comprometerte con un plan",
        score: 1,
        behaviorTag: "capacity-complaint",
      },
    ],
  },

  // Revenue Cycle Specialist - Growth 2
  {
    id: "rs_rc_growth_2",
    roleId: "revenue_cycle",
    domain: "growth",
    scenario:
      "Your FQHC's CFO wants to start tracking revenue per visit by provider, department, and payor — granular financial analytics that the FQHC has never done before. Currently, you produce basic monthly reports: total charges, total collections, and days in AR. The CFO envisions real-time dashboards that leadership can use for strategic decisions. Building this capability would require you to learn SQL queries against your EHR's reporting database, master a BI tool like Tableau or Power BI, and redesign the entire reporting framework. This is a 6-month project on top of your regular duties.",
    esScenario:
      "El CFO de tu FQHC quiere empezar a rastrear ingresos por visita por proveedor, departamento, y pagador — analítica financiera granular que el FQHC nunca ha hecho antes. Actualmente, produces informes mensuales básicos: cargos totales, cobros totales, y días en cuentas por cobrar. El CFO visualiza dashboards en tiempo real que el liderazgo pueda usar para decisiones estratégicas. Construir esta capacidad requeriría que aprendas consultas SQL contra la base de datos de reportes de tu EHR, domines una herramienta de BI como Tableau o Power BI, y rediseñes todo el marco de reporteo. Este es un proyecto de 6 meses además de tus deberes regulares.",
    question: "What's your response?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      {
        id: "rs_rc_g2_a",
        text: "Accept this as a career-transforming opportunity — revenue cycle specialists who can build financial dashboards are rare in FQHCs and command significantly higher compensation. Negotiate the terms: ask for a free Coursera or LinkedIn Learning subscription for SQL and BI training, request one dedicated day per week for the first 3 months to learn and build, and propose a phased deliverable schedule — start with one dashboard (revenue per visit by provider) as proof of concept in month 2, then expand. Connect with other FQHC finance teams through NACHC to see what they're tracking. This positions you for a Revenue Cycle Director role within 2-3 years",
        esText: "Aceptar esto como una oportunidad transformadora de carrera — los especialistas en ciclo de ingresos que pueden construir dashboards financieros son raros en FQHCs y comandan compensación significativamente más alta. Negociar los términos: pedir una suscripción gratuita de Coursera o LinkedIn Learning para capacitación en SQL y BI, solicitar un día dedicado por semana por los primeros 3 meses para aprender y construir, y proponer un calendario de entregables por fases — empezar con un dashboard (ingresos por visita por proveedor) como prueba de concepto en el mes 2, luego expandir. Conectar con otros equipos de finanzas de FQHCs a través de NACHC para ver qué están rastreando. Esto te posiciona para un rol de Director de Ciclo de Ingresos en 2-3 años",
        score: 4,
        behaviorTag: "career-accelerator",
      },
      {
        id: "rs_rc_g2_b",
        text: "Express interest but recommend hiring a part-time data analyst to handle the technical build while you provide the revenue cycle domain expertise and define what metrics matter",
        esText: "Expresar interés pero recomendar contratar un analista de datos a medio tiempo para manejar la construcción técnica mientras tú proporcionas la experiencia en dominio del ciclo de ingresos y defines qué métricas importan",
        score: 3,
        behaviorTag: "realistic-collaborator",
      },
      {
        id: "rs_rc_g2_c",
        text: "Improve the existing Excel-based reports with more granularity — add provider-level and payor-level breakdowns to your monthly reports. Dashboards and SQL are overkill for an FQHC your size",
        esText: "Mejorar los informes existentes basados en Excel con más granularidad — agregar desgloses a nivel de proveedor y pagador a tus informes mensuales. Dashboards y SQL son excesivos para un FQHC de tu tamaño",
        score: 2,
        behaviorTag: "incremental-improver",
      },
      {
        id: "rs_rc_g2_d",
        text: "Decline — learning SQL and Tableau on top of your current workload is unreasonable. Suggest the CFO purchase a pre-built healthcare analytics platform instead",
        esText: "Declinar — aprender SQL y Tableau además de tu carga de trabajo actual es irrazonable. Sugerir que el CFO compre una plataforma de analítica de salud pre-construida en su lugar",
        score: 1,
        behaviorTag: "off-the-shelf-deferral",
      },
    ],
  },

  // Revenue Cycle Specialist - Growth 3
  {
    id: "rs_rc_growth_3",
    roleId: "revenue_cycle",
    domain: "growth",
    scenario:
      "California has expanded Medi-Cal eligibility to all income-eligible adults regardless of immigration status. Your FQHC has seen a 25% increase in newly eligible patients, but your billing team doesn't understand the nuances of billing for this population — restricted Medi-Cal vs full-scope, aid codes, share of cost calculations, and CHDP eligibility. Claims are being submitted with wrong aid codes and getting denied. Your supervisor asks you to become the team's expert on this and train the rest of the billing staff.",
    esScenario:
      "California ha expandido la elegibilidad de Medi-Cal a todos los adultos elegibles por ingresos sin importar el estatus migratorio. Tu FQHC ha visto un aumento del 25% en pacientes recién elegibles, pero tu equipo de facturación no entiende los matices de facturar para esta población — Medi-Cal restringido vs alcance completo, códigos de ayuda, cálculos de participación en el costo, y elegibilidad CHDP. Las reclamaciones se están enviando con códigos de ayuda incorrectos y están siendo denegadas. Tu supervisor te pide que te conviertas en el experto del equipo en esto y capacites al resto del personal de facturación.",
    question: "How do you approach this?",
    esQuestion: "¿Cómo abordas esto?",
    options: [
      {
        id: "rs_rc_g3_a",
        text: "Embrace the opportunity — this is exactly the kind of specialized knowledge that makes a revenue cycle specialist indispensable. Immediately access DHCS provider bulletins and Medi-Cal billing manuals for the expanded eligibility rules. Attend the next CPCA or NACHC webinar on Medi-Cal expansion billing. Pull the denied claims to identify the specific aid code errors and build a reference guide mapping patient eligibility categories to correct aid codes and billing procedures. Create a 1-hour training for the billing team with real claim examples. Set up a review process where you personally audit expanded Medi-Cal claims for the first 30 days until the team builds confidence. Track denial rates weekly to measure improvement",
        esText: "Abrazar la oportunidad — este es exactamente el tipo de conocimiento especializado que hace indispensable a un especialista en ciclo de ingresos. Acceder inmediatamente a los boletines de proveedores de DHCS y manuales de facturación de Medi-Cal para las reglas de elegibilidad expandida. Asistir al próximo webinar de CPCA o NACHC sobre facturación de expansión de Medi-Cal. Sacar las reclamaciones denegadas para identificar los errores específicos de código de ayuda y construir una guía de referencia mapeando categorías de elegibilidad de pacientes a códigos de ayuda y procedimientos de facturación correctos. Crear una capacitación de 1 hora para el equipo de facturación con ejemplos de reclamaciones reales. Establecer un proceso de revisión donde personalmente audites reclamaciones de Medi-Cal expandido por los primeros 30 días hasta que el equipo construya confianza. Rastrear tasas de denegación semanalmente para medir mejora",
        score: 4,
        behaviorTag: "specialist-knowledge-builder",
      },
      {
        id: "rs_rc_g3_b",
        text: "Research the expanded Medi-Cal billing rules, create a quick reference guide for the team, and offer to be the go-to person for questions while everyone gets up to speed",
        esText: "Investigar las reglas de facturación de Medi-Cal expandido, crear una guía de referencia rápida para el equipo, y ofrecer ser la persona de consulta para preguntas mientras todos se ponen al día",
        score: 3,
        behaviorTag: "knowledge-sharer",
      },
      {
        id: "rs_rc_g3_c",
        text: "Suggest that the FQHC invest in a Medi-Cal billing training from DHCS or a billing consultant — having one person become the expert creates a single point of failure",
        esText: "Sugerir que el FQHC invierta en una capacitación de facturación de Medi-Cal de DHCS o un consultor de facturación — tener a una persona como experto crea un punto único de fallo",
        score: 2,
        behaviorTag: "outsource-expertise",
      },
      {
        id: "rs_rc_g3_d",
        text: "Push back — learning an entirely new billing domain on top of your current workload is too much. Ask the supervisor to hire a bilingual billing specialist with Medi-Cal expansion experience",
        esText: "Rechazar — aprender un dominio de facturación completamente nuevo además de tu carga de trabajo actual es demasiado. Pedir al supervisor que contrate un especialista de facturación bilingüe con experiencia en expansión de Medi-Cal",
        score: 1,
        behaviorTag: "workload-protector",
      },
    ],
  },

  // Revenue Cycle Specialist - Transition 2
  {
    id: "rs_rc_transition_2",
    roleId: "revenue_cycle",
    domain: "transition",
    scenario:
      "You've just started at an FQHC after working in hospital billing for 5 years. During your first week, you realize that FQHC billing is fundamentally different from hospital billing — PPS reimbursement means you get a flat rate per visit regardless of what services were provided, 340B drug pricing creates a separate revenue stream, the sliding fee discount program means some patients pay $0 but the visit still generates PPS revenue, and the UDS reporting requirements are unlike anything you've seen in a hospital. Your supervisor assumes you know all of this because 'you have billing experience.'",
    esScenario:
      "Acabas de comenzar en un FQHC después de trabajar en facturación hospitalaria por 5 años. Durante tu primera semana, te das cuenta de que la facturación de FQHC es fundamentalmente diferente de la facturación hospitalaria — el reembolso PPS significa que recibes una tarifa fija por visita sin importar qué servicios se proporcionaron, los precios de medicamentos 340B crean un flujo de ingresos separado, el programa de descuento de tarifa escalonada significa que algunos pacientes pagan $0 pero la visita aún genera ingresos PPS, y los requisitos de reporteo UDS son diferentes a cualquier cosa que hayas visto en un hospital. Tu supervisor asume que sabes todo esto porque 'tienes experiencia en facturación.'",
    question: "How do you handle the knowledge gap?",
    esQuestion: "¿Cómo manejas la brecha de conocimiento?",
    options: [
      {
        id: "rs_rc_t2_a",
        text: "Be transparent about what you know and what you don't — your hospital billing skills are foundational but FQHC-specific rules are new to you. Proactively build your knowledge: request access to NACHC's revenue cycle training resources, read the HRSA Compliance Manual sections on billing and sliding fee requirements, review your FQHC's PPS rate calculation and wraparound payment methodology, and ask your supervisor to walk you through one complete claim lifecycle — from patient check-in to PPS payment receipt. Create a side-by-side comparison document of hospital vs FQHC billing to map your existing knowledge to the new framework. Set specific 30/60/90-day learning goals and share them with your supervisor so they know you're taking ownership of the gap",
        esText: "Ser transparente sobre lo que sabes y lo que no — tus habilidades de facturación hospitalaria son fundamentales pero las reglas específicas de FQHC son nuevas para ti. Construir tu conocimiento proactivamente: solicitar acceso a los recursos de capacitación de ciclo de ingresos de NACHC, leer las secciones del Manual de Cumplimiento de HRSA sobre requisitos de facturación y tarifa escalonada, revisar el cálculo de tarifa PPS y la metodología de pago wraparound de tu FQHC, y pedir a tu supervisor que te guíe por un ciclo de vida completo de reclamación — desde el registro del paciente hasta la recepción del pago PPS. Crear un documento comparativo lado a lado de facturación hospitalaria vs FQHC para mapear tu conocimiento existente al nuevo marco. Establecer metas de aprendizaje específicas a 30/60/90 días y compartirlas con tu supervisor para que sepan que estás tomando responsabilidad de la brecha",
        score: 4,
        behaviorTag: "honest-accelerated-learner",
      },
      {
        id: "rs_rc_t2_b",
        text: "Tell your supervisor directly that FQHC billing is new to you and ask for a structured onboarding — specific training on PPS, 340B, sliding fee, and UDS. In the meantime, focus on the claims processing work that transfers from hospital billing (denials, appeals, AR follow-up)",
        esText: "Decirle a tu supervisor directamente que la facturación de FQHC es nueva para ti y pedir una incorporación estructurada — capacitación específica en PPS, 340B, tarifa escalonada, y UDS. Mientras tanto, enfocarte en el trabajo de procesamiento de reclamaciones que se transfiere de la facturación hospitalaria (denegaciones, apelaciones, seguimiento de cuentas por cobrar)",
        score: 3,
        behaviorTag: "transparent-learner",
      },
      {
        id: "rs_rc_t2_c",
        text: "Don't highlight the knowledge gap — figure it out as you go. You have 5 years of billing experience and the fundamentals are the same. Ask colleagues questions casually rather than formally admitting you don't know the FQHC-specific rules",
        esText: "No resaltar la brecha de conocimiento — descubrirlo sobre la marcha. Tienes 5 años de experiencia en facturación y los fundamentos son los mismos. Hacer preguntas a colegas casualmente en vez de admitir formalmente que no conoces las reglas específicas de FQHC",
        score: 2,
        behaviorTag: "fake-it-till-you-make-it",
      },
      {
        id: "rs_rc_t2_d",
        text: "Focus on what you already know — claims processing, denial management, and AR follow-up work the same way everywhere. Let the FQHC-specific stuff like PPS rates and 340B be handled by whoever was doing it before you arrived",
        esText: "Enfocarte en lo que ya sabes — el procesamiento de reclamaciones, gestión de denegaciones, y seguimiento de cuentas por cobrar funcionan igual en todas partes. Dejar que las cosas específicas de FQHC como tarifas PPS y 340B sean manejadas por quien las hacía antes de que llegaras",
        score: 1,
        behaviorTag: "comfort-zone-limited",
      },
    ],
  },

  // Revenue Cycle Specialist - Transition 3
  {
    id: "rs_rc_transition_3",
    roleId: "revenue_cycle",
    domain: "transition",
    scenario:
      "In your third week at a new FQHC, you run your first charge reconciliation report and discover that 15% of patient visits from the past two months were never billed — the charges were captured in the EHR but never dropped to the billing system. This represents approximately $120,000 in unbilled revenue. When you bring it to the billing supervisor, she seems unsurprised: 'Yeah, we've had that interface issue for a while. We just catch up when we can.' There's no formal charge reconciliation process, and nobody has been assigned to monitor the charge lag.",
    esScenario:
      "En tu tercera semana en un nuevo FQHC, ejecutas tu primer informe de reconciliación de cargos y descubres que el 15% de las visitas de pacientes de los últimos dos meses nunca fueron facturadas — los cargos fueron capturados en el EHR pero nunca pasaron al sistema de facturación. Esto representa aproximadamente $120,000 en ingresos no facturados. Cuando lo llevas a la supervisora de facturación, no parece sorprendida: 'Sí, hemos tenido ese problema de interfaz por un tiempo. Nos ponemos al día cuando podemos.' No hay un proceso formal de reconciliación de cargos, y nadie ha sido asignado para monitorear el retraso de cargos.",
    question: "What do you do?",
    esQuestion: "¿Qué haces?",
    options: [
      {
        id: "rs_rc_t3_a",
        text: "Treat this as a revenue emergency hiding in plain sight. First, address the immediate $120K: generate the unbilled visit list, batch-process the charge drops manually if the interface won't cooperate, and submit the claims before any timely filing deadlines expire — check each payor's filing limit (90 days Medi-Cal, 365 days Medicare). Second, fix the systemic problem: work with your IT team to diagnose the interface issue between the EHR and billing system (is it a configuration error, a timing issue, or a genuine technical failure?). Third, implement a daily charge reconciliation process — a simple report comparing EHR visits to billing system charges, run every morning, with variances investigated same-day. Present the $120K recovery to the CFO with your proposed prevention system. This establishes you as someone who finds and fixes revenue leaks",
        esText: "Tratar esto como una emergencia de ingresos escondida a plena vista. Primero, abordar los $120K inmediatos: generar la lista de visitas no facturadas, procesar en lote los cargos manualmente si la interfaz no coopera, y enviar las reclamaciones antes de que expiren los plazos de presentación oportuna — verificar el límite de presentación de cada pagador (90 días Medi-Cal, 365 días Medicare). Segundo, arreglar el problema sistémico: trabajar con tu equipo de TI para diagnosticar el problema de interfaz entre el EHR y el sistema de facturación (¿es un error de configuración, un problema de temporización, o una falla técnica genuina?). Tercero, implementar un proceso diario de reconciliación de cargos — un informe simple comparando visitas del EHR con cargos del sistema de facturación, ejecutado cada mañana, con variaciones investigadas el mismo día. Presentar la recuperación de $120K al CFO con tu sistema de prevención propuesto. Esto te establece como alguien que encuentra y arregla fugas de ingresos",
        score: 4,
        behaviorTag: "revenue-leak-hunter",
      },
      {
        id: "rs_rc_t3_b",
        text: "Focus on recovering the $120K first — process the unbilled claims immediately before any filing deadlines pass. Then propose a weekly charge reconciliation report to the billing supervisor to prevent future buildup",
        esText: "Enfocarse en recuperar los $120K primero — procesar las reclamaciones no facturadas inmediatamente antes de que pasen los plazos de presentación. Luego proponer un informe semanal de reconciliación de cargos a la supervisora de facturación para prevenir acumulación futura",
        score: 3,
        behaviorTag: "recovery-then-prevention",
      },
      {
        id: "rs_rc_t3_c",
        text: "Submit an IT ticket to fix the interface issue and start manually checking for unbilled charges weekly until it's resolved. The $120K will get billed eventually as part of the catch-up process",
        esText: "Enviar un ticket de TI para arreglar el problema de interfaz y comenzar a verificar manualmente cargos no facturados semanalmente hasta que se resuelva. Los $120K se facturarán eventualmente como parte del proceso de ponerse al día",
        score: 2,
        behaviorTag: "passive-fixer",
      },
      {
        id: "rs_rc_t3_d",
        text: "The billing supervisor has been here longer and knows about the issue. If she says they catch up when they can, trust her process. Focus on learning your assigned tasks before trying to redesign workflows in your third week",
        esText: "La supervisora de facturación ha estado aquí más tiempo y conoce el problema. Si ella dice que se ponen al día cuando pueden, confiar en su proceso. Enfocarte en aprender tus tareas asignadas antes de intentar rediseñar flujos de trabajo en tu tercera semana",
        score: 1,
        behaviorTag: "deference-over-action",
      },
    ],
  },

  /* ================================================================ */
  /*  COMPLIANCE OFFICER                                              */
  /* ================================================================ */

  // Compliance Officer - Mission (1 of 3)
  {
    id: "rs_co_mission1",
    roleId: "compliance_officer",
    domain: "mission",
    scenario:
      "Your FQHC's CEO asks you to 'go easy' on a billing compliance issue because the organization is already under financial pressure from Medi-Cal cuts. The discrepancy involves $180K in potentially improper same-day encounter billing that could trigger an OIG audit if not corrected.",
    esScenario:
      "El CEO de tu FQHC te pide que 'no seas tan estricto' con un problema de cumplimiento de facturación porque la organización ya está bajo presión financiera por los recortes de Medi-Cal. La discrepancia involucra $180K en facturación potencialmente incorrecta de encuentros del mismo día que podría desencadenar una auditoría del OIG si no se corrige.",
    question: "How do you handle this pressure from leadership?",
    esQuestion: "¿Cómo manejas esta presión del liderazgo?",
    options: [
      { id: "rs_co_m1_a", text: "Present the CEO with a clear risk analysis: the $180K in revenue is dwarfed by the potential $500K-2M False Claims Act penalty. Propose a voluntary self-disclosure to OIG with a corrective action plan that protects both the mission and the finances", esText: "Presentar al CEO un análisis de riesgo claro: los $180K en ingresos son pequeños comparados con la posible multa de $500K-2M de la Ley de Reclamaciones Falsas. Proponer una autodivulgación voluntaria al OIG con un plan de acción correctiva que proteja tanto la misión como las finanzas", score: 4, behaviorTag: "principled-protector" },
      { id: "rs_co_m1_b", text: "Document the conversation in writing, correct the billing errors immediately, and implement new controls — but don't escalate to the board yet since the CEO may come around", esText: "Documentar la conversación por escrito, corregir los errores de facturación inmediatamente e implementar nuevos controles — pero no escalar a la junta todavía ya que el CEO puede reconsiderar", score: 3, behaviorTag: "quiet-fixer" },
      { id: "rs_co_m1_c", text: "Compromise by fixing the billing going forward but not retroactively correcting the $180K — this balances compliance with the organization's financial needs", esText: "Comprometerse arreglando la facturación en adelante pero sin corregir retroactivamente los $180K — esto equilibra el cumplimiento con las necesidades financieras de la organización", score: 2, behaviorTag: "compromiser" },
      { id: "rs_co_m1_d", text: "The CEO has the final say on organizational risk tolerance. Document your recommendation and move on — you've done your job by flagging it", esText: "El CEO tiene la última palabra sobre la tolerancia al riesgo organizacional. Documentar tu recomendación y seguir adelante — hiciste tu trabajo al señalarlo", score: 1, behaviorTag: "passive-documenter" },
    ],
  },

  // Compliance Officer - Mission (2 of 3)
  {
    id: "rs_co_mission2",
    roleId: "compliance_officer",
    domain: "mission",
    scenario:
      "During an internal audit, you discover that your FQHC's sliding fee schedule hasn't been updated to reflect the 2026 Federal Poverty Level guidelines. This means approximately 400 patients have been overcharged for 3 months — a direct violation of HRSA's Section 330 grant requirements.",
    esScenario:
      "Durante una auditoría interna, descubres que la escala de tarifas deslizantes de tu FQHC no se ha actualizado para reflejar las guías del Nivel Federal de Pobreza 2026. Esto significa que aproximadamente 400 pacientes han sido sobrecobrados durante 3 meses — una violación directa de los requisitos de la subvención Sección 330 de HRSA.",
    question: "What is your immediate course of action?",
    esQuestion: "¿Cuál es tu curso de acción inmediato?",
    options: [
      { id: "rs_co_m2_a", text: "Immediately update the fee schedule, calculate refunds owed to all 400 patients, notify the CFO and CEO, prepare a patient notification plan, and document the root cause (missed annual update process) with a corrective action to prevent recurrence", esText: "Actualizar inmediatamente la escala de tarifas, calcular reembolsos debidos a los 400 pacientes, notificar al CFO y CEO, preparar un plan de notificación a pacientes, y documentar la causa raíz (proceso de actualización anual omitido) con una acción correctiva para prevenir recurrencia", score: 4, behaviorTag: "comprehensive-corrector" },
      { id: "rs_co_m2_b", text: "Update the fee schedule immediately and flag the refund issue to the CFO. Let finance handle the refund calculations while you focus on building an annual compliance calendar to prevent this from happening again", esText: "Actualizar la escala de tarifas inmediatamente y señalar el problema de reembolsos al CFO. Dejar que finanzas maneje los cálculos de reembolso mientras te enfocas en construir un calendario de cumplimiento anual para evitar que esto vuelva a suceder", score: 3, behaviorTag: "systemic-thinker" },
      { id: "rs_co_m2_c", text: "Fix the fee schedule going forward and calculate the average overcharge — if it's under $50 per patient, the refund process may cost more than the overcharges. Present the cost-benefit analysis to leadership", esText: "Arreglar la escala de tarifas en adelante y calcular el sobrecobro promedio — si es menos de $50 por paciente, el proceso de reembolso puede costar más que los sobrecobros. Presentar el análisis costo-beneficio al liderazgo", score: 2, behaviorTag: "cost-rationalizer" },
      { id: "rs_co_m2_d", text: "Update the fee schedule quietly and hope it doesn't come up in the next HRSA site visit. The overcharges were unintentional and the amounts are small", esText: "Actualizar la escala de tarifas discretamente y esperar que no salga en la próxima visita de sitio de HRSA. Los sobrecobros fueron no intencionales y los montos son pequeños", score: 1, behaviorTag: "avoidance" },
    ],
  },

  // Compliance Officer - Mission (3 of 3)
  {
    id: "rs_co_mission3",
    roleId: "compliance_officer",
    domain: "mission",
    scenario:
      "A whistleblower — a medical assistant — reports that a provider has been upcoding patient visits (billing Level 4 E&M codes for Level 2 visits). The provider generates 30% of your FQHC's revenue. The MA is afraid of retaliation.",
    esScenario:
      "Un denunciante — un asistente médico — reporta que un proveedor ha estado sobrecodificando visitas de pacientes (facturando códigos E&M de Nivel 4 para visitas de Nivel 2). El proveedor genera el 30% de los ingresos de tu FQHC. El MA tiene miedo de represalias.",
    question: "How do you handle this situation?",
    esQuestion: "¿Cómo manejas esta situación?",
    options: [
      { id: "rs_co_m3_a", text: "Immediately assure the MA of whistleblower protections under the False Claims Act and CA Labor Code §1102.5. Launch a confidential chart audit of the provider's last 90 days of billing, notify the compliance committee, and document everything in a privileged investigation file", esText: "Asegurar inmediatamente al MA las protecciones de denunciantes bajo la Ley de Reclamaciones Falsas y el Código Laboral de CA §1102.5. Lanzar una auditoría confidencial de expedientes de los últimos 90 días de facturación del proveedor, notificar al comité de cumplimiento, y documentar todo en un archivo de investigación privilegiado", score: 4, behaviorTag: "whistleblower-protector" },
      { id: "rs_co_m3_b", text: "Thank the MA for reporting, explain that you'll investigate, and start pulling a random sample of the provider's charts to verify the claim before escalating. Keep the MA's identity confidential", esText: "Agradecer al MA por reportar, explicar que investigarás, y comenzar a revisar una muestra aleatoria de los expedientes del proveedor para verificar el reclamo antes de escalar. Mantener la identidad del MA confidencial", score: 3, behaviorTag: "cautious-investigator" },
      { id: "rs_co_m3_c", text: "Tell the MA you'll look into it but first have an informal conversation with the provider to get their perspective. Maybe there's a documentation issue rather than intentional upcoding", esText: "Decir al MA que lo investigarás pero primero tener una conversación informal con el proveedor para obtener su perspectiva. Tal vez hay un problema de documentación en lugar de sobrecodificación intencional", score: 2, behaviorTag: "premature-confrontation" },
      { id: "rs_co_m3_d", text: "Acknowledge the concern but explain that you need more evidence before launching a formal investigation. Ask the MA to document specific examples and come back with dates and patient IDs", esText: "Reconocer la preocupación pero explicar que necesitas más evidencia antes de lanzar una investigación formal. Pedir al MA que documente ejemplos específicos y regrese con fechas e identificaciones de pacientes", score: 1, behaviorTag: "burden-shifting" },
    ],
  },

  // Compliance Officer - People (1 of 3)
  {
    id: "rs_co_people1",
    roleId: "compliance_officer",
    domain: "people",
    scenario:
      "You're presenting HRSA OSV audit findings to the clinical team. The Medical Director pushes back aggressively: 'These compliance requirements are designed by bureaucrats who've never seen a patient. I'm not changing my workflow for a checklist.' Several providers nod in agreement.",
    esScenario:
      "Estás presentando hallazgos de la auditoría OSV de HRSA al equipo clínico. El Director Médico reacciona agresivamente: 'Estos requisitos de cumplimiento fueron diseñados por burócratas que nunca han visto un paciente. No voy a cambiar mi flujo de trabajo por una lista de verificación.' Varios proveedores asienten de acuerdo.",
    question: "How do you respond to this resistance?",
    esQuestion: "¿Cómo respondes a esta resistencia?",
    options: [
      { id: "rs_co_p1_a", text: "Validate their frustration — the requirements ARE burdensome. Then reframe: 'These 19 requirements are what keeps our $3.2M HRSA grant funded. If we lose that, we lose 40% of our budget and 12 positions. Let me work with you to find the least disruptive way to meet each requirement.' Offer 1:1 time with resistant providers", esText: "Validar su frustración — los requisitos SON onerosos. Luego reformular: 'Estos 19 requisitos son lo que mantiene financiada nuestra subvención de $3.2M de HRSA. Si perdemos eso, perdemos el 40% de nuestro presupuesto y 12 posiciones. Déjame trabajar contigo para encontrar la forma menos disruptiva de cumplir cada requisito.' Ofrecer tiempo individual con proveedores resistentes", score: 4, behaviorTag: "empathetic-reframer" },
      { id: "rs_co_p1_b", text: "Acknowledge the concern, share a brief story of an FQHC that lost their HRSA grant after an OSV failure, and ask the team to help prioritize which requirements to tackle first so they have ownership of the process", esText: "Reconocer la preocupación, compartir una breve historia de un FQHC que perdió su subvención HRSA después de fallar una OSV, y pedir al equipo que ayude a priorizar qué requisitos abordar primero para que tengan apropiación del proceso", score: 3, behaviorTag: "story-teller" },
      { id: "rs_co_p1_c", text: "Stand firm: 'I understand your perspective, but these are federal requirements, not suggestions. We need to comply by the deadline. I'll send a detailed action plan by Friday'", esText: "Mantenerte firme: 'Entiendo tu perspectiva, pero estos son requisitos federales, no sugerencias. Necesitamos cumplir para la fecha límite. Enviaré un plan de acción detallado para el viernes'", score: 2, behaviorTag: "authority-leaner" },
      { id: "rs_co_p1_d", text: "Back down from the confrontation — schedule a follow-up meeting when emotions aren't running so high. You can address it with the CEO first to get executive backing", esText: "Retroceder de la confrontación — programar una reunión de seguimiento cuando las emociones no estén tan altas. Puedes abordarlo primero con el CEO para obtener respaldo ejecutivo", score: 1, behaviorTag: "conflict-avoider" },
    ],
  },

  // Compliance Officer - People (2 of 3)
  {
    id: "rs_co_people2",
    roleId: "compliance_officer",
    domain: "people",
    scenario:
      "Three front-desk staff members have failed their annual HIPAA training assessment for the second time. They primarily speak Spanish and struggle with the English-only training materials. One says, 'I know HIPAA — I just can't pass the test in English.'",
    esScenario:
      "Tres miembros del personal de recepción han reprobado su evaluación de capacitación HIPAA anual por segunda vez. Hablan principalmente español y tienen dificultades con los materiales de capacitación solo en inglés. Uno dice: 'Yo sé HIPAA — solo no puedo pasar el examen en inglés.'",
    question: "How do you address this training gap?",
    esQuestion: "¿Cómo abordas esta brecha de capacitación?",
    options: [
      { id: "rs_co_p2_a", text: "Immediately source or create Spanish-language HIPAA training materials and assessments. Work with the staff to understand which concepts they find confusing and build scenario-based training using real front-desk situations they encounter daily. This is a systemic gap that likely affects more staff", esText: "Buscar o crear inmediatamente materiales de capacitación HIPAA en español y evaluaciones. Trabajar con el personal para entender qué conceptos encuentran confusos y construir capacitación basada en escenarios usando situaciones reales de recepción que enfrentan diariamente. Esta es una brecha sistémica que probablemente afecta a más personal", score: 4, behaviorTag: "culturally-responsive" },
      { id: "rs_co_p2_b", text: "Create a bilingual study guide for the assessment and offer a supervised retake session where they can ask questions in Spanish. Request budget for proper Spanish-language HIPAA materials for next year's training cycle", esText: "Crear una guía de estudio bilingüe para la evaluación y ofrecer una sesión de repetición supervisada donde puedan hacer preguntas en español. Solicitar presupuesto para materiales HIPAA adecuados en español para el próximo ciclo de capacitación", score: 3, behaviorTag: "pragmatic-helper" },
      { id: "rs_co_p2_c", text: "Pair each staff member with a bilingual colleague who can translate the training content during a group study session. They need to pass the existing assessment — accommodations are fine but the standard stays the same", esText: "Emparejar a cada miembro del personal con un colega bilingüe que pueda traducir el contenido durante una sesión de estudio grupal. Necesitan pasar la evaluación existente — las adaptaciones están bien pero el estándar se mantiene igual", score: 2, behaviorTag: "minimum-accommodation" },
      { id: "rs_co_p2_d", text: "HIPAA compliance requires passing the assessment. Give them one more chance and if they fail again, document it as a performance issue and involve HR", esText: "El cumplimiento de HIPAA requiere pasar la evaluación. Darles una oportunidad más y si reprueban de nuevo, documentarlo como un problema de rendimiento e involucrar a RRHH", score: 1, behaviorTag: "punitive-compliance" },
    ],
  },

  // Compliance Officer - People (3 of 3)
  {
    id: "rs_co_people3",
    roleId: "compliance_officer",
    domain: "people",
    scenario:
      "You've been asked to train the board of directors on their compliance oversight responsibilities. Half the board members are community representatives (patients) with limited formal education. The board chair wants you to keep it under 20 minutes because 'they just need to sign off.'",
    esScenario:
      "Te han pedido capacitar a la junta directiva sobre sus responsabilidades de supervisión de cumplimiento. La mitad de los miembros de la junta son representantes comunitarios (pacientes) con educación formal limitada. El presidente de la junta quiere que lo mantengas en menos de 20 minutos porque 'solo necesitan firmar.'",
    question: "How do you approach this board training?",
    esQuestion: "¿Cómo abordas esta capacitación de la junta?",
    options: [
      { id: "rs_co_p3_a", text: "Push back on the 20-minute limit — board compliance training is an HRSA OSV requirement with specific topics. Create a plain-language, visual-heavy presentation that respects varying education levels. Use real scenarios (sliding fee, conflict of interest) instead of legal jargon. Build in Q&A to ensure genuine understanding, not just signature collection", esText: "Rechazar el límite de 20 minutos — la capacitación de cumplimiento de la junta es un requisito de la OSV de HRSA con temas específicos. Crear una presentación en lenguaje sencillo con muchos elementos visuales que respete diferentes niveles educativos. Usar escenarios reales (escala deslizante, conflicto de intereses) en lugar de jerga legal. Incluir preguntas y respuestas para asegurar comprensión genuina, no solo recolección de firmas", score: 4, behaviorTag: "accessible-educator" },
      { id: "rs_co_p3_b", text: "Negotiate for 30-45 minutes and create a board-friendly compliance overview that covers the 5 most critical areas. Provide a take-home reference sheet in both English and Spanish. Follow up individually with any board member who has questions", esText: "Negociar por 30-45 minutos y crear un resumen de cumplimiento amigable para la junta que cubra las 5 áreas más críticas. Proporcionar una hoja de referencia para llevar a casa en inglés y español. Hacer seguimiento individual con cualquier miembro de la junta que tenga preguntas", score: 3, behaviorTag: "negotiator" },
      { id: "rs_co_p3_c", text: "Keep it to 20 minutes as requested but cover the HRSA-required topics at a high level. Provide detailed written materials they can review later and collect signatures confirming they received the training", esText: "Mantenerlo en 20 minutos como se solicitó pero cubrir los temas requeridos por HRSA a un nivel alto. Proporcionar materiales escritos detallados que puedan revisar después y recoger firmas confirmando que recibieron la capacitación", score: 2, behaviorTag: "check-the-box" },
      { id: "rs_co_p3_d", text: "Comply with the 20-minute request — the board chair knows their members best. Send materials in advance and collect signatures. The important thing is documentation that training occurred", esText: "Cumplir con la solicitud de 20 minutos — el presidente de la junta conoce mejor a sus miembros. Enviar materiales por adelantado y recoger firmas. Lo importante es la documentación de que se realizó la capacitación", score: 1, behaviorTag: "passive-compliance" },
    ],
  },

  // Compliance Officer - Execution (1 of 3)
  {
    id: "rs_co_execution1",
    roleId: "compliance_officer",
    domain: "execution",
    scenario:
      "Your FQHC just received a 90-day notice of a HRSA Operational Site Visit. You have 15 of 19 program requirements in good standing, but 4 have significant gaps: board governance documentation, credentialing files missing for 3 providers, the QI/QA plan hasn't been updated in 18 months, and your sliding fee schedule needs recalculation. You have one part-time compliance assistant.",
    esScenario:
      "Tu FQHC acaba de recibir un aviso de 90 días de una Visita de Sitio Operacional de HRSA. Tienes 15 de 19 requisitos del programa en buen estado, pero 4 tienen brechas significativas: documentación de gobernanza de la junta, archivos de credencialización faltantes para 3 proveedores, el plan QI/QA no se ha actualizado en 18 meses, y tu escala de tarifas deslizantes necesita recalculación. Tienes un asistente de cumplimiento de medio tiempo.",
    question: "How do you prioritize and execute the 90-day sprint?",
    esQuestion: "¿Cómo priorizas y ejecutas el sprint de 90 días?",
    options: [
      { id: "rs_co_e1_a", text: "Create a 30-60-90 day sprint: Week 1-4: credentialing files (highest penalty risk), Week 4-8: board governance + sliding fee (parallel tracks, delegate fee to finance), Week 8-12: QI/QA plan update + mock site visit. Request temporary help from admin staff. Send weekly progress reports to CEO and board chair", esText: "Crear un sprint de 30-60-90 días: Semana 1-4: archivos de credencialización (mayor riesgo de penalización), Semana 4-8: gobernanza de junta + escala de tarifas (pistas paralelas, delegar tarifas a finanzas), Semana 8-12: actualización del plan QI/QA + visita de sitio simulada. Solicitar ayuda temporal del personal administrativo. Enviar informes de progreso semanales al CEO y presidente de la junta", score: 4, behaviorTag: "strategic-sprinter" },
      { id: "rs_co_e1_b", text: "Focus on the two highest-risk items first (credentialing and governance — these can result in Conditions of Award). Tackle QI/QA and sliding fee in parallel during the second half. Ask for overtime approval for your assistant", esText: "Enfocarse en los dos elementos de mayor riesgo primero (credencialización y gobernanza — estos pueden resultar en Condiciones de Adjudicación). Abordar QI/QA y escala de tarifas en paralelo durante la segunda mitad. Pedir aprobación de horas extras para tu asistente", score: 3, behaviorTag: "risk-prioritizer" },
      { id: "rs_co_e1_c", text: "Start with the easiest fix — the sliding fee schedule recalculation — to build momentum and demonstrate progress. Then tackle the larger items with the remaining time", esText: "Comenzar con la solución más fácil — la recalculación de la escala de tarifas — para generar impulso y demostrar progreso. Luego abordar los elementos más grandes con el tiempo restante", score: 2, behaviorTag: "momentum-seeker" },
      { id: "rs_co_e1_d", text: "This is too much for one person with a part-time assistant. Escalate to the CEO that you need to hire a consultant or the organization risks HRSA conditions. Don't start until you have adequate resources", esText: "Esto es demasiado para una persona con un asistente de medio tiempo. Escalar al CEO que necesitas contratar un consultor o la organización arriesga condiciones de HRSA. No comenzar hasta tener recursos adecuados", score: 1, behaviorTag: "resource-dependent" },
    ],
  },

  // Compliance Officer - Execution (2 of 3)
  {
    id: "rs_co_execution2",
    roleId: "compliance_officer",
    domain: "execution",
    scenario:
      "A staff member's laptop containing unencrypted PHI for 2,300 patients was stolen from their car. The HIPAA Breach Notification Rule requires notifying affected individuals within 60 days and HHS within 60 days (for breaches affecting 500+ individuals, immediate notification to HHS and media is required). It's 5pm on a Friday.",
    esScenario:
      "La computadora portátil de un empleado que contenía PHI no encriptada de 2,300 pacientes fue robada de su carro. La Regla de Notificación de Brechas de HIPAA requiere notificar a los individuos afectados dentro de 60 días y al HHS dentro de 60 días (para brechas que afectan a 500+ individuos, se requiere notificación inmediata al HHS y medios). Son las 5pm de un viernes.",
    question: "Walk through your breach response protocol.",
    esQuestion: "Describe tu protocolo de respuesta a brechas.",
    options: [
      { id: "rs_co_e2_a", text: "Activate breach response immediately: (1) Document the incident with the staff member before memories fade, (2) Report to HHS OCR breach portal tonight — the 500+ threshold requires 'without unreasonable delay', (3) Notify your privacy officer and legal counsel, (4) Monday AM: engage credit monitoring vendor, draft patient notification letters, prepare media statement, (5) Begin risk assessment to determine if encryption could have prevented the breach, (6) File police report for the theft", esText: "Activar respuesta a brechas inmediatamente: (1) Documentar el incidente con el empleado antes de que los recuerdos se desvanezcan, (2) Reportar al portal de brechas de HHS OCR esta noche — el umbral de 500+ requiere 'sin demora irrazonable', (3) Notificar al oficial de privacidad y asesor legal, (4) Lunes AM: contratar proveedor de monitoreo de crédito, redactar cartas de notificación a pacientes, preparar comunicado para medios, (5) Comenzar evaluación de riesgos para determinar si la encriptación podría haber prevenido la brecha, (6) Presentar reporte policial por el robo", score: 4, behaviorTag: "crisis-commander" },
      { id: "rs_co_e2_b", text: "Secure the facts tonight: interview the staff member, document what was on the laptop, notify the CEO. Monday, engage legal counsel to determine if this qualifies as a reportable breach (the laptop may have been password-protected). Then proceed with HHS notification if required", esText: "Asegurar los hechos esta noche: entrevistar al empleado, documentar qué había en la computadora, notificar al CEO. Lunes, contactar asesor legal para determinar si esto califica como brecha reportable (la computadora puede haber tenido contraseña). Luego proceder con notificación al HHS si es requerido", score: 3, behaviorTag: "methodical-responder" },
      { id: "rs_co_e2_c", text: "Email the CEO and HR director about the incident and schedule an emergency meeting for Monday morning. The 60-day deadline gives you time — there's no need to rush a response over the weekend", esText: "Enviar email al CEO y director de RRHH sobre el incidente y programar una reunión de emergencia para el lunes por la mañana. El plazo de 60 días te da tiempo — no hay necesidad de apurar una respuesta durante el fin de semana", score: 2, behaviorTag: "delayed-responder" },
      { id: "rs_co_e2_d", text: "First, check if the laptop was encrypted — if it was, this may not be a reportable breach. Contact IT to verify the encryption status before taking any notification steps", esText: "Primero, verificar si la computadora estaba encriptada — si lo estaba, puede no ser una brecha reportable. Contactar a TI para verificar el estado de encriptación antes de tomar cualquier paso de notificación", score: 1, behaviorTag: "technicality-seeker" },
    ],
  },

  // Compliance Officer - Execution (3 of 3)
  {
    id: "rs_co_execution3",
    roleId: "compliance_officer",
    domain: "execution",
    scenario:
      "Your annual billing compliance audit reveals that 12% of PPS claims have documentation that doesn't support the level of service billed. The total exposure is approximately $340K. Your FQHC's CFO wants to 'gradually correct' the billing over the next quarter to avoid a sudden revenue hit.",
    esScenario:
      "Tu auditoría anual de cumplimiento de facturación revela que el 12% de los reclamos PPS tienen documentación que no respalda el nivel de servicio facturado. La exposición total es aproximadamente $340K. El CFO de tu FQHC quiere 'corregir gradualmente' la facturación durante el próximo trimestre para evitar un golpe repentino en los ingresos.",
    question: "How do you approach this billing compliance issue?",
    esQuestion: "¿Cómo abordas este problema de cumplimiento de facturación?",
    options: [
      { id: "rs_co_e3_a", text: "Reject the 'gradual correction' approach — continued improper billing is ongoing fraud risk. Implement immediate corrective action: pause questionable claims, retrain billing staff on PPS documentation requirements, conduct full chart review of flagged claims, and present a voluntary refund plan to the board. The $340K hit now is better than a $3.4M False Claims Act penalty later", esText: "Rechazar el enfoque de 'corrección gradual' — la facturación incorrecta continua es riesgo de fraude en curso. Implementar acción correctiva inmediata: pausar reclamos cuestionables, recapacitar al personal de facturación sobre requisitos de documentación PPS, realizar revisión completa de expedientes señalados, y presentar un plan de reembolso voluntario a la junta. El golpe de $340K ahora es mejor que una multa de $3.4M de la Ley de Reclamaciones Falsas después", score: 4, behaviorTag: "decisive-corrector" },
      { id: "rs_co_e3_b", text: "Compromise: implement new billing standards immediately for all future claims, but work with the CFO on a 30-day timeline (not a quarter) to address the $340K in historical claims. Document everything in case of future audit", esText: "Comprometerse: implementar nuevos estándares de facturación inmediatamente para todos los reclamos futuros, pero trabajar con el CFO en un cronograma de 30 días (no un trimestre) para abordar los $340K en reclamos históricos. Documentar todo en caso de auditoría futura", score: 3, behaviorTag: "pragmatic-negotiator" },
      { id: "rs_co_e3_c", text: "Accept the quarterly correction timeline but insist on new documentation standards starting immediately. The 12% error rate suggests a training issue, not fraud — so the gradual approach is reasonable", esText: "Aceptar el cronograma de corrección trimestral pero insistir en nuevos estándares de documentación comenzando inmediatamente. La tasa de error del 12% sugiere un problema de capacitación, no fraude — así que el enfoque gradual es razonable", score: 2, behaviorTag: "rationalized-delay" },
      { id: "rs_co_e3_d", text: "The CFO manages the financial operations. Document your audit findings, present them in writing, and let finance decide the correction timeline. Your job is to identify the issue, not dictate the remedy", esText: "El CFO maneja las operaciones financieras. Documentar tus hallazgos de auditoría, presentarlos por escrito, y dejar que finanzas decida el cronograma de corrección. Tu trabajo es identificar el problema, no dictar el remedio", score: 1, behaviorTag: "abdication" },
    ],
  },

  // Compliance Officer - Growth (1 of 3)
  {
    id: "rs_co_growth1",
    roleId: "compliance_officer",
    domain: "growth",
    scenario:
      "California just announced that FQHC PPS rates for uninsured patients will be eliminated effective July 2026 (the UIS PPS elimination). This is a $1B statewide revenue impact that creates entirely new compliance requirements around financial assistance programs, charity care documentation, and alternative payment models. Your CEO asks, 'What do we need to do to comply?'",
    esScenario:
      "California acaba de anunciar que las tarifas PPS de FQHC para pacientes no asegurados se eliminarán a partir de julio de 2026 (la eliminación PPS UIS). Este es un impacto de ingresos de $1B a nivel estatal que crea requisitos de cumplimiento completamente nuevos alrededor de programas de asistencia financiera, documentación de atención caritativa, y modelos de pago alternativos. Tu CEO pregunta, '¿Qué necesitamos hacer para cumplir?'",
    question: "How do you approach learning and implementing an entirely new regulatory area?",
    esQuestion: "¿Cómo abordas aprender e implementar un área regulatoria completamente nueva?",
    options: [
      { id: "rs_co_g1_a", text: "Within 48 hours: read the DHCS UIS Fact Sheet, attend the next CPCA/NACHC webinar, connect with compliance peers at 3 other FQHCs to share intelligence. Within 2 weeks: draft a compliance impact assessment mapping every affected workflow (billing, intake, financial counseling, reporting). Present to leadership with a phased implementation timeline", esText: "Dentro de 48 horas: leer la Hoja Informativa UIS de DHCS, asistir al próximo seminario web de CPCA/NACHC, conectar con pares de cumplimiento en 3 otros FQHCs para compartir inteligencia. Dentro de 2 semanas: redactar una evaluación de impacto de cumplimiento mapeando cada flujo de trabajo afectado (facturación, admisión, consejería financiera, reportes). Presentar al liderazgo con un cronograma de implementación por fases", score: 4, behaviorTag: "rapid-learner" },
      { id: "rs_co_g1_b", text: "Start with the official sources: DHCS guidance documents, HRSA FAQ, and CPCA analysis. Build a compliance checklist of new requirements and cross-reference against your current processes. Share the initial analysis within a month", esText: "Comenzar con las fuentes oficiales: documentos de orientación de DHCS, FAQ de HRSA, y análisis de CPCA. Construir una lista de verificación de cumplimiento de nuevos requisitos y cruzar con tus procesos actuales. Compartir el análisis inicial dentro de un mes", score: 3, behaviorTag: "systematic-learner" },
      { id: "rs_co_g1_c", text: "Recommend hiring a healthcare regulatory consultant who specializes in FQHC reimbursement changes. This is too complex and high-stakes for in-house compliance to handle alone", esText: "Recomendar contratar un consultor regulatorio de salud que se especialice en cambios de reembolso de FQHC. Esto es demasiado complejo y de alto riesgo para que el cumplimiento interno lo maneje solo", score: 2, behaviorTag: "outsource-dependent" },
      { id: "rs_co_g1_d", text: "Wait for CPCA to publish implementation guidance — they'll have templates and tools. No point in building something from scratch when the professional association will do it for you", esText: "Esperar a que CPCA publique orientación de implementación — tendrán plantillas y herramientas. No tiene sentido construir algo desde cero cuando la asociación profesional lo hará por ti", score: 1, behaviorTag: "passive-waiter" },
    ],
  },

  // Compliance Officer - Growth (2 of 3)
  {
    id: "rs_co_growth2",
    roleId: "compliance_officer",
    domain: "growth",
    scenario:
      "Your FQHC is considering deploying an AI ambient scribe (like Abridge or Nabla) to reduce provider documentation burden. The vendor claims the tool is 'HIPAA compliant' but you notice the BAA doesn't address AI model training on patient data, the data retention policy is vague, and there's no mention of how the AI handles documentation errors.",
    esScenario:
      "Tu FQHC está considerando implementar un escriba ambiental de IA (como Abridge o Nabla) para reducir la carga de documentación de proveedores. El vendedor afirma que la herramienta es 'compatible con HIPAA' pero notas que el BAA no aborda el entrenamiento del modelo de IA con datos de pacientes, la política de retención de datos es vaga, y no hay mención de cómo la IA maneja errores de documentación.",
    question: "How do you evaluate this emerging technology from a compliance perspective?",
    esQuestion: "¿Cómo evalúas esta tecnología emergente desde una perspectiva de cumplimiento?",
    options: [
      { id: "rs_co_g2_a", text: "Develop an AI vendor compliance checklist covering: (1) BAA with explicit AI/ML data use clauses, (2) data retention and deletion policies, (3) audit trail for AI-generated documentation, (4) provider review and attestation requirements, (5) error correction protocols, (6) patient consent for AI-assisted documentation. Negotiate BAA amendments before proceeding. Research NEJM Catalyst and AMA guidance on AI in clinical documentation", esText: "Desarrollar una lista de verificación de cumplimiento de vendedores de IA cubriendo: (1) BAA con cláusulas explícitas de uso de datos de IA/ML, (2) políticas de retención y eliminación de datos, (3) rastro de auditoría para documentación generada por IA, (4) requisitos de revisión y atestación del proveedor, (5) protocolos de corrección de errores, (6) consentimiento del paciente para documentación asistida por IA. Negociar enmiendas al BAA antes de proceder. Investigar orientación de NEJM Catalyst y AMA sobre IA en documentación clínica", score: 4, behaviorTag: "tech-forward-compliance" },
      { id: "rs_co_g2_b", text: "Flag the BAA gaps to the vendor and request specific language on AI data training, retention, and error handling. Delay deployment until the BAA is satisfactory. Research what other FQHCs have done with similar tools", esText: "Señalar las brechas del BAA al vendedor y solicitar lenguaje específico sobre entrenamiento de datos de IA, retención y manejo de errores. Retrasar la implementación hasta que el BAA sea satisfactorio. Investigar qué otros FQHCs han hecho con herramientas similares", score: 3, behaviorTag: "cautious-evaluator" },
      { id: "rs_co_g2_c", text: "Recommend against the tool — AI in healthcare documentation is too new and the regulatory framework hasn't caught up. Wait until HHS issues specific guidance on AI scribes before deploying", esText: "Recomendar en contra de la herramienta — la IA en documentación de salud es demasiado nueva y el marco regulatorio no se ha actualizado. Esperar hasta que HHS emita orientación específica sobre escribas de IA antes de implementar", score: 2, behaviorTag: "risk-averse-blocker" },
      { id: "rs_co_g2_d", text: "The vendor says it's HIPAA compliant and they have other healthcare clients. If they're willing to sign a BAA, that's sufficient. The clinical team really needs this tool to reduce burnout", esText: "El vendedor dice que es compatible con HIPAA y tienen otros clientes de salud. Si están dispuestos a firmar un BAA, eso es suficiente. El equipo clínico realmente necesita esta herramienta para reducir el agotamiento", score: 1, behaviorTag: "vendor-trusting" },
    ],
  },

  // Compliance Officer - Growth (3 of 3)
  {
    id: "rs_co_growth3",
    roleId: "compliance_officer",
    domain: "growth",
    scenario:
      "You've been the only compliance person at your 200-person FQHC for 3 years. You've kept the organization out of trouble, but you realize you've been reactive — putting out fires rather than building systematic compliance infrastructure. You want to grow into a more strategic role but your days are consumed by audits, training, and incident response.",
    esScenario:
      "Has sido la única persona de cumplimiento en tu FQHC de 200 personas durante 3 años. Has mantenido a la organización fuera de problemas, pero te das cuenta de que has sido reactivo — apagando incendios en lugar de construir infraestructura de cumplimiento sistemática. Quieres crecer hacia un rol más estratégico pero tus días se consumen en auditorías, capacitación y respuesta a incidentes.",
    question: "How do you transition from reactive to strategic compliance?",
    esQuestion: "¿Cómo haces la transición de cumplimiento reactivo a estratégico?",
    options: [
      { id: "rs_co_g3_a", text: "Build the business case for a compliance analyst hire by documenting time spent on each task. Meanwhile, create a compliance risk matrix scoring all 19 HRSA requirements + HIPAA + billing risks. Present to the board: 'Here's where we're strong, here's where we're exposed, and here's my 12-month plan to build systematic resilience.' Pursue CHC certification to formalize your expertise", esText: "Construir el caso de negocio para contratar un analista de cumplimiento documentando el tiempo dedicado a cada tarea. Mientras tanto, crear una matriz de riesgo de cumplimiento puntuando los 19 requisitos de HRSA + HIPAA + riesgos de facturación. Presentar a la junta: 'Aquí es donde somos fuertes, aquí es donde estamos expuestos, y aquí está mi plan de 12 meses para construir resiliencia sistemática.' Obtener la certificación CHC para formalizar tu experiencia", score: 4, behaviorTag: "strategic-builder" },
      { id: "rs_co_g3_b", text: "Start by documenting and automating your most time-consuming repetitive tasks (annual training scheduling, policy review tracking, incident documentation). Free up 10 hours/week for strategic work. Join HCCA for professional development and networking with compliance peers", esText: "Comenzar documentando y automatizando tus tareas repetitivas más consumidoras de tiempo (programación de capacitación anual, seguimiento de revisión de políticas, documentación de incidentes). Liberar 10 horas/semana para trabajo estratégico. Unirte a HCCA para desarrollo profesional y networking con pares de cumplimiento", score: 3, behaviorTag: "efficiency-builder" },
      { id: "rs_co_g3_c", text: "Ask the CEO for a 'compliance strategic planning day' — one day per month dedicated to long-term compliance infrastructure. Use that time to build policies, procedures, and monitoring systems", esText: "Pedir al CEO un 'día de planificación estratégica de cumplimiento' — un día por mes dedicado a infraestructura de cumplimiento a largo plazo. Usar ese tiempo para construir políticas, procedimientos y sistemas de monitoreo", score: 2, behaviorTag: "incremental-changer" },
      { id: "rs_co_g3_d", text: "The reactive approach is working — you haven't had a major compliance failure in 3 years. Strategic planning is nice in theory but the day-to-day demands of the role come first", esText: "El enfoque reactivo está funcionando — no has tenido un fallo de cumplimiento importante en 3 años. La planificación estratégica es buena en teoría pero las demandas diarias del rol son primero", score: 1, behaviorTag: "status-quo-comfort" },
    ],
  },

  // Compliance Officer - Transition (1 of 3)
  {
    id: "rs_co_transition1",
    roleId: "compliance_officer",
    domain: "transition",
    scenario:
      "You've accepted a Compliance Officer role at a new FQHC. On your first week, you discover: no compliance committee exists, the last HRSA site visit had 3 Conditions of Award, HIPAA training records are missing for 40% of staff, and the previous compliance person left 6 months ago with no documentation of open issues.",
    esScenario:
      "Aceptaste un rol de Oficial de Cumplimiento en un nuevo FQHC. En tu primera semana, descubres: no existe un comité de cumplimiento, la última visita de sitio de HRSA tuvo 3 Condiciones de Adjudicación, los registros de capacitación HIPAA faltan para el 40% del personal, y la persona de cumplimiento anterior se fue hace 6 meses sin documentación de problemas abiertos.",
    question: "How do you approach your first 90 days?",
    esQuestion: "¿Cómo abordas tus primeros 90 días?",
    options: [
      { id: "rs_co_t1_a", text: "Days 1-30: Complete compliance risk assessment (every domain), resolve HRSA Conditions of Award (these have deadlines), launch emergency HIPAA training for all staff. Days 31-60: Establish compliance committee with board representation, create policy library, start credentialing file audit. Days 61-90: Build annual compliance calendar, present compliance roadmap to board, schedule mock OSV. Document everything from day one — you need a paper trail showing when you arrived and what you inherited", esText: "Días 1-30: Completar evaluación de riesgo de cumplimiento (cada dominio), resolver Condiciones de Adjudicación de HRSA (estas tienen plazos), lanzar capacitación HIPAA de emergencia para todo el personal. Días 31-60: Establecer comité de cumplimiento con representación de la junta, crear biblioteca de políticas, iniciar auditoría de archivos de credencialización. Días 61-90: Construir calendario anual de cumplimiento, presentar hoja de ruta de cumplimiento a la junta, programar OSV simulada. Documentar todo desde el día uno — necesitas un rastro de papel mostrando cuándo llegaste y qué heredaste", score: 4, behaviorTag: "structured-turnaround" },
      { id: "rs_co_t1_b", text: "Start with the HRSA Conditions of Award — those have hard deadlines and the organization could lose funding. Then tackle HIPAA training gaps. Build the compliance committee and calendar in the second quarter once the fires are out", esText: "Comenzar con las Condiciones de Adjudicación de HRSA — esas tienen plazos firmes y la organización podría perder financiamiento. Luego abordar las brechas de capacitación HIPAA. Construir el comité de cumplimiento y calendario en el segundo trimestre una vez que se apaguen los incendios", score: 3, behaviorTag: "triage-first" },
      { id: "rs_co_t1_c", text: "Spend the first month listening and learning — understand the culture, meet every department head, and map out all the compliance gaps before making any changes. A new compliance officer who comes in making demands will face resistance", esText: "Pasar el primer mes escuchando y aprendiendo — entender la cultura, reunirte con cada jefe de departamento, y mapear todas las brechas de cumplimiento antes de hacer cambios. Un nuevo oficial de cumplimiento que llega haciendo exigencias enfrentará resistencia", score: 2, behaviorTag: "slow-start" },
      { id: "rs_co_t1_d", text: "This is too much for one person. Immediately tell the CEO you need a consultant to address the HRSA Conditions and a budget for compliance infrastructure before you can make progress", esText: "Esto es demasiado para una persona. Inmediatamente decir al CEO que necesitas un consultor para abordar las Condiciones de HRSA y un presupuesto para infraestructura de cumplimiento antes de poder avanzar", score: 1, behaviorTag: "resource-gating" },
    ],
  },

  // Compliance Officer - Transition (2 of 3)
  {
    id: "rs_co_transition2",
    roleId: "compliance_officer",
    domain: "transition",
    scenario:
      "Two months into your new role, you realize the organization's culture sees compliance as 'the department that says no.' Staff avoid you, don't report issues, and department heads make compliance decisions without consulting you. The previous compliance officer was apparently very punitive.",
    esScenario:
      "Dos meses en tu nuevo rol, te das cuenta de que la cultura de la organización ve al cumplimiento como 'el departamento que dice no.' El personal te evita, no reporta problemas, y los jefes de departamento toman decisiones de cumplimiento sin consultarte. El oficial de cumplimiento anterior era aparentemente muy punitivo.",
    question: "How do you rebuild trust and change the compliance culture?",
    esQuestion: "¿Cómo reconstruyes la confianza y cambias la cultura de cumplimiento?",
    options: [
      { id: "rs_co_t2_a", text: "Rebrand compliance as 'organizational protection' — not punishment. Start with quick wins: help a department solve a problem they've been struggling with (a billing error pattern, a credentialing bottleneck). Hold open office hours. Create a confidential reporting channel. Publicly celebrate when someone reports an issue. Share 'compliance wins' (penalties avoided, processes simplified) in all-staff meetings", esText: "Cambiar la marca de cumplimiento como 'protección organizacional' — no castigo. Comenzar con victorias rápidas: ayudar a un departamento a resolver un problema con el que han luchado (un patrón de errores de facturación, un cuello de botella de credencialización). Tener horas de oficina abiertas. Crear un canal de reporte confidencial. Celebrar públicamente cuando alguien reporta un problema. Compartir 'victorias de cumplimiento' (penalidades evitadas, procesos simplificados) en reuniones de todo el personal", score: 4, behaviorTag: "culture-changer" },
      { id: "rs_co_t2_b", text: "Schedule 1:1 meetings with every department head to understand their compliance pain points and offer to solve problems rather than create them. Build relationships before enforcing rules", esText: "Programar reuniones individuales con cada jefe de departamento para entender sus puntos de dolor de cumplimiento y ofrecer resolver problemas en lugar de crearlos. Construir relaciones antes de hacer cumplir reglas", score: 3, behaviorTag: "relationship-builder" },
      { id: "rs_co_t2_c", text: "Focus on making compliance training more engaging and less punitive. If people understand WHY the rules exist, they'll comply voluntarily. Create short, bilingual training videos instead of long policy documents", esText: "Enfocarse en hacer la capacitación de cumplimiento más atractiva y menos punitiva. Si las personas entienden POR QUÉ existen las reglas, cumplirán voluntariamente. Crear videos de capacitación cortos y bilingües en lugar de documentos de política largos", score: 2, behaviorTag: "educator-only" },
      { id: "rs_co_t2_d", text: "The culture will change naturally as people see consistent, fair enforcement. Don't try to be popular — just be consistent and transparent. People will respect compliance when they see everyone held to the same standard", esText: "La cultura cambiará naturalmente a medida que las personas vean una aplicación consistente y justa. No intentes ser popular — solo sé consistente y transparente. Las personas respetarán el cumplimiento cuando vean que todos son mantenidos al mismo estándar", score: 1, behaviorTag: "enforcement-first" },
    ],
  },

  // Compliance Officer - Transition (3 of 3)
  {
    id: "rs_co_transition3",
    roleId: "compliance_officer",
    domain: "transition",
    scenario:
      "You're transitioning from a hospital compliance role to an FQHC. Your hospital background is strong (Joint Commission, CMS, HIPAA) but you've never worked with HRSA grant requirements, PPS billing, 340B, or the community health center model. The interview panel asks: 'What's your 30-day plan for getting up to speed on FQHC-specific compliance?'",
    esScenario:
      "Estás haciendo la transición de un rol de cumplimiento hospitalario a un FQHC. Tu experiencia hospitalaria es sólida (Joint Commission, CMS, HIPAA) pero nunca has trabajado con requisitos de subvenciones HRSA, facturación PPS, 340B, o el modelo de centros de salud comunitarios. El panel de entrevista pregunta: '¿Cuál es tu plan de 30 días para ponerte al día con el cumplimiento específico de FQHC?'",
    question: "What's your answer?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      { id: "rs_co_t3_a", text: "Week 1: Read the HRSA Compliance Manual cover to cover, review the last 2 OSV reports, meet with every department head. Week 2: Shadow the billing team to understand PPS (it's fundamentally different from hospital DRG billing), review 340B program operations and recent HRSA audit findings. Week 3: Attend a NACHC or CPCA webinar, connect with 3 experienced FQHC compliance officers in my region for mentorship. Week 4: Present my gap analysis and learning plan to the CEO. My hospital HIPAA and CMS experience transfers directly — I need to add the HRSA grant and PPS layers", esText: "Semana 1: Leer el Manual de Cumplimiento de HRSA completo, revisar los últimos 2 reportes de OSV, reunirme con cada jefe de departamento. Semana 2: Observar al equipo de facturación para entender PPS (es fundamentalmente diferente de la facturación hospitalaria DRG), revisar operaciones del programa 340B y hallazgos recientes de auditoría HRSA. Semana 3: Asistir a un seminario web de NACHC o CPCA, conectar con 3 oficiales de cumplimiento de FQHC experimentados en mi región para mentoría. Semana 4: Presentar mi análisis de brechas y plan de aprendizaje al CEO. Mi experiencia hospitalaria en HIPAA y CMS se transfiere directamente — necesito agregar las capas de subvención HRSA y PPS", score: 4, behaviorTag: "structured-transition" },
      { id: "rs_co_t3_b", text: "Focus on the HRSA Compliance Manual and 340B regulations first — those are the most different from hospital compliance. HIPAA and billing fraud concepts transfer well. I'd also join HCCA and NACHC's compliance networks for peer learning", esText: "Enfocarme en el Manual de Cumplimiento de HRSA y regulaciones 340B primero — esos son los más diferentes del cumplimiento hospitalario. Los conceptos de HIPAA y fraude de facturación se transfieren bien. También me uniría a las redes de cumplimiento de HCCA y NACHC para aprendizaje entre pares", score: 3, behaviorTag: "focused-learner" },
      { id: "rs_co_t3_c", text: "I'd lean heavily on the existing staff who know the FQHC model — they can teach me the HRSA requirements while I bring hospital-level compliance rigor to the organization. It's a partnership", esText: "Me apoyaría mucho en el personal existente que conoce el modelo FQHC — ellos pueden enseñarme los requisitos HRSA mientras yo aporto el rigor de cumplimiento a nivel hospitalario a la organización. Es una asociación", score: 2, behaviorTag: "dependency-lean" },
      { id: "rs_co_t3_d", text: "Compliance principles are universal — risk assessment, training, documentation, monitoring. The specific regulations are different but the framework is the same. I'd spend the first month learning the content while applying the compliance infrastructure I've already built in hospitals", esText: "Los principios de cumplimiento son universales — evaluación de riesgos, capacitación, documentación, monitoreo. Las regulaciones específicas son diferentes pero el marco es el mismo. Pasaría el primer mes aprendiendo el contenido mientras aplico la infraestructura de cumplimiento que ya construí en hospitales", score: 1, behaviorTag: "overconfident-transferor" },
    ],
  },

  /* ================================================================ */
  /*  COMPLIANCE ANALYST                                              */
  /* ================================================================ */

  // Compliance Analyst - Mission (1 of 3)
  {
    id: "rs_ca_mission1",
    roleId: "compliance_analyst",
    domain: "mission",
    scenario:
      "You're reviewing chart documentation for a billing compliance audit and discover that a popular provider has been consistently documenting 'patient counseling on diabetes management' for visits that — based on the visit duration and vitals recorded — appear to be routine medication refill appointments. The provider sees 35 patients/day and is loved by the community.",
    esScenario:
      "Estás revisando documentación de expedientes para una auditoría de cumplimiento de facturación y descubres que un proveedor popular ha estado documentando consistentemente 'consejería al paciente sobre manejo de diabetes' para visitas que — basado en la duración de la visita y signos vitales registrados — parecen ser citas rutinarias de resurtido de medicamentos. El proveedor ve 35 pacientes/día y es querido por la comunidad.",
    question: "How do you handle this finding?",
    esQuestion: "¿Cómo manejas este hallazgo?",
    options: [
      { id: "rs_ca_m1_a", text: "Document the pattern with specific chart numbers, visit dates, and time discrepancies. Present the finding to the Compliance Officer with a statistical analysis (e.g., '23 of 30 sampled charts show this pattern'). Recommend a focused audit of this provider's last 6 months of billing. The data speaks — your job is to present it clearly, not to judge the provider's character", esText: "Documentar el patrón con números de expedientes específicos, fechas de visita y discrepancias de tiempo. Presentar el hallazgo al Oficial de Cumplimiento con un análisis estadístico (ej., '23 de 30 expedientes muestreados muestran este patrón'). Recomendar una auditoría enfocada de los últimos 6 meses de facturación de este proveedor. Los datos hablan — tu trabajo es presentarlos claramente, no juzgar el carácter del proveedor", score: 4, behaviorTag: "data-driven-reporter" },
      { id: "rs_ca_m1_b", text: "Pull a larger sample to confirm the pattern before reporting. If 50+ charts show the same issue, present it to the Compliance Officer. Include a recommendation for provider education on documentation standards", esText: "Sacar una muestra más grande para confirmar el patrón antes de reportar. Si 50+ expedientes muestran el mismo problema, presentarlo al Oficial de Cumplimiento. Incluir una recomendación de educación al proveedor sobre estándares de documentación", score: 3, behaviorTag: "thorough-verifier" },
      { id: "rs_ca_m1_c", text: "Mention it to the Compliance Officer informally — 'I noticed something odd in Dr. X's charts.' Let them decide whether to investigate further. You don't want to be the one who formally flags a popular provider", esText: "Mencionarlo al Oficial de Cumplimiento informalmente — 'Noté algo extraño en los expedientes del Dr. X.' Dejar que ellos decidan si investigar más. No quieres ser quien señale formalmente a un proveedor popular", score: 2, behaviorTag: "informal-reporter" },
      { id: "rs_ca_m1_d", text: "The provider is seeing 35 patients a day — of course the documentation isn't perfect. Note it in your audit summary as an area for improvement but don't treat it as a compliance finding. Documentation issues aren't the same as billing fraud", esText: "El proveedor está viendo 35 pacientes al día — por supuesto que la documentación no es perfecta. Anotarlo en tu resumen de auditoría como un área de mejora pero no tratarlo como un hallazgo de cumplimiento. Los problemas de documentación no son lo mismo que fraude de facturación", score: 1, behaviorTag: "minimizer" },
    ],
  },

  // Compliance Analyst - Mission (2 of 3)
  {
    id: "rs_ca_mission2",
    roleId: "compliance_analyst",
    domain: "mission",
    scenario:
      "Your FQHC serves a largely undocumented immigrant community. A new state policy requires FQHCs to collect additional demographic data that some patients fear could be shared with immigration authorities. Staff are worried that data collection will drive patients away from care.",
    esScenario:
      "Tu FQHC atiende a una comunidad mayormente de inmigrantes indocumentados. Una nueva política estatal requiere que los FQHCs recolecten datos demográficos adicionales que algunos pacientes temen podrían ser compartidos con autoridades de inmigración. El personal está preocupado de que la recolección de datos alejará a los pacientes de la atención.",
    question: "How do you balance compliance with patient trust?",
    esQuestion: "¿Cómo equilibras el cumplimiento con la confianza del paciente?",
    options: [
      { id: "rs_ca_m2_a", text: "Research the exact regulatory requirement and what data is actually mandated vs. optional. Create a bilingual FAQ for front-desk staff explaining what must be collected, what's optional, and how it's protected (HIPAA, state privacy laws, FQHC confidentiality). Draft patient-facing materials in Spanish explaining their privacy rights. Ensure the data collection workflow doesn't create barriers to care", esText: "Investigar el requisito regulatorio exacto y qué datos son realmente obligatorios vs. opcionales. Crear un FAQ bilingüe para personal de recepción explicando qué debe recolectarse, qué es opcional, y cómo está protegido (HIPAA, leyes de privacidad estatales, confidencialidad de FQHC). Redactar materiales para pacientes en español explicando sus derechos de privacidad. Asegurar que el flujo de recolección de datos no cree barreras a la atención", score: 4, behaviorTag: "community-protector" },
      { id: "rs_ca_m2_b", text: "Work with the Compliance Officer to implement the minimum data collection required. Add prominent privacy notices in Spanish at intake. Train staff on how to reassure patients about data protection", esText: "Trabajar con el Oficial de Cumplimiento para implementar la recolección mínima de datos requerida. Agregar avisos de privacidad prominentes en español en la admisión. Capacitar al personal sobre cómo tranquilizar a los pacientes sobre protección de datos", score: 3, behaviorTag: "minimum-compliance" },
      { id: "rs_ca_m2_c", text: "Comply with the state requirement as written — patient privacy is protected by HIPAA regardless. Over-accommodating fears could actually undermine compliance", esText: "Cumplir con el requisito estatal tal como está escrito — la privacidad del paciente está protegida por HIPAA independientemente. Sobre-acomodar miedos podría realmente socavar el cumplimiento", score: 2, behaviorTag: "literal-complier" },
      { id: "rs_ca_m2_d", text: "Flag the issue to the Compliance Officer and recommend delaying implementation until legal counsel reviews whether the data collection could create liability for the FQHC", esText: "Señalar el problema al Oficial de Cumplimiento y recomendar retrasar la implementación hasta que el asesor legal revise si la recolección de datos podría crear responsabilidad para el FQHC", score: 1, behaviorTag: "delay-recommender" },
    ],
  },

  // Compliance Analyst - Mission (3 of 3)
  {
    id: "rs_ca_mission3",
    roleId: "compliance_analyst",
    domain: "mission",
    scenario:
      "During a 340B program review, you discover that your pharmacy has been providing 340B-priced medications to patients who weren't eligible (they had commercial insurance that should have been billed at full price). The estimated duplicate discount exposure is $85K over 12 months.",
    esScenario:
      "Durante una revisión del programa 340B, descubres que tu farmacia ha estado proporcionando medicamentos a precio 340B a pacientes que no eran elegibles (tenían seguro comercial que debería haberse facturado a precio completo). La exposición estimada de descuento duplicado es $85K durante 12 meses.",
    question: "What's your recommended course of action?",
    esQuestion: "¿Cuál es tu curso de acción recomendado?",
    options: [
      { id: "rs_ca_m3_a", text: "Document the full extent of the issue with specific patient counts, drug categories, and dollar amounts. Present to the Compliance Officer with a recommendation to: (1) immediately correct the eligibility screening process, (2) calculate exact duplicate discount amounts per manufacturer, (3) self-report to HRSA and affected manufacturers, (4) implement split-billing or contract pharmacy safeguards. Frame it as: 'We found this ourselves, which puts us in the strongest position for self-correction'", esText: "Documentar la extensión completa del problema con conteos específicos de pacientes, categorías de medicamentos y montos en dólares. Presentar al Oficial de Cumplimiento con una recomendación de: (1) corregir inmediatamente el proceso de verificación de elegibilidad, (2) calcular montos exactos de descuento duplicado por fabricante, (3) auto-reportar a HRSA y fabricantes afectados, (4) implementar salvaguardas de facturación dividida o farmacia contratada. Enmarcarlo como: 'Lo encontramos nosotros mismos, lo que nos pone en la mejor posición para auto-corrección'", score: 4, behaviorTag: "proactive-self-reporter" },
      { id: "rs_ca_m3_b", text: "Fix the eligibility screening immediately and document the correction. Calculate the $85K exposure and present options to the Compliance Officer: self-report vs. corrective action only. Recommend consulting with a 340B specialist before deciding", esText: "Arreglar la verificación de elegibilidad inmediatamente y documentar la corrección. Calcular la exposición de $85K y presentar opciones al Oficial de Cumplimiento: auto-reporte vs. solo acción correctiva. Recomendar consultar con un especialista 340B antes de decidir", score: 3, behaviorTag: "measured-fixer" },
      { id: "rs_ca_m3_c", text: "Fix the screening process going forward and note the historical issue in the audit report. The $85K is relatively small for a 340B program and self-reporting could trigger a larger HRSA audit", esText: "Arreglar el proceso de verificación en adelante y anotar el problema histórico en el reporte de auditoría. Los $85K son relativamente pequeños para un programa 340B y auto-reportar podría desencadenar una auditoría más grande de HRSA", score: 2, behaviorTag: "forward-only-fixer" },
      { id: "rs_ca_m3_d", text: "Check whether other FQHCs in the region have had similar issues — if it's a common problem, HRSA may be more lenient. Hold off on reporting until you understand the enforcement landscape", esText: "Verificar si otros FQHCs en la región han tenido problemas similares — si es un problema común, HRSA puede ser más indulgente. Esperar para reportar hasta que entiendas el panorama de aplicación", score: 1, behaviorTag: "benchmarking-delay" },
    ],
  },

  // Compliance Analyst - People
  {
    id: "rs_ca_people1",
    roleId: "compliance_analyst",
    domain: "people",
    scenario:
      "You're conducting HIPAA training for front-desk staff at a busy clinic. Several attendees are on their phones, two are whispering, and one says, 'We do this every year — it's the same stuff. Can we just sign the form and get back to work? We have patients waiting.'",
    esScenario:
      "Estás conduciendo capacitación HIPAA para el personal de recepción en una clínica ocupada. Varios asistentes están en sus teléfonos, dos están susurrando, y uno dice: 'Hacemos esto cada año — es lo mismo. ¿Podemos solo firmar el formulario y volver al trabajo? Tenemos pacientes esperando.'",
    question: "How do you engage a resistant audience?",
    esQuestion: "¿Cómo enganchas a una audiencia resistente?",
    options: [
      { id: "rs_ca_p1_a", text: "Acknowledge their time pressure: 'I know you have patients waiting — let's make this count.' Switch to scenario-based learning using real front-desk situations: 'A patient's ex-spouse calls asking about their appointment. What do you say?' Make it interactive with quick polls. Share a recent breach example where a front-desk mistake cost an FQHC $75K. End with: 'This protects you as much as the patients'", esText: "Reconocer su presión de tiempo: 'Sé que tienen pacientes esperando — hagamos que esto cuente.' Cambiar a aprendizaje basado en escenarios usando situaciones reales de recepción: 'El ex-cónyuge de un paciente llama preguntando por su cita. ¿Qué dices?' Hacerlo interactivo con encuestas rápidas. Compartir un ejemplo reciente de brecha donde un error de recepción le costó a un FQHC $75K. Terminar con: 'Esto los protege a ustedes tanto como a los pacientes'", score: 4, behaviorTag: "engaging-educator" },
      { id: "rs_ca_p1_b", text: "Keep it brief and focused on what's new this year. Highlight the 2-3 most relevant changes, use a quick quiz format, and let them go within 15 minutes. Follow up with an email summary they can reference", esText: "Mantenerlo breve y enfocado en lo nuevo de este año. Destacar los 2-3 cambios más relevantes, usar un formato de quiz rápido, y dejarlos ir dentro de 15 minutos. Hacer seguimiento con un resumen por email que puedan consultar", score: 3, behaviorTag: "efficient-trainer" },
      { id: "rs_ca_p1_c", text: "Firmly but politely ask them to put their phones away and participate. Explain that HIPAA training is mandatory and HR tracks completion. You have material to cover and it's important", esText: "Pedir firme pero cortésmente que guarden sus teléfonos y participen. Explicar que la capacitación HIPAA es obligatoria y RRHH rastrea la finalización. Tienes material que cubrir y es importante", score: 2, behaviorTag: "authority-trainer" },
      { id: "rs_ca_p1_d", text: "They're right — annual refreshers are repetitive. Send the updated materials via email, have them complete a quick online assessment, and collect the attestation forms. In-person training isn't always the best format", esText: "Tienen razón — las actualizaciones anuales son repetitivas. Enviar los materiales actualizados por email, que completen una evaluación rápida en línea, y recoger los formularios de atestación. La capacitación presencial no siempre es el mejor formato", score: 1, behaviorTag: "path-of-least-resistance" },
    ],
  },

  // Compliance Analyst - People (2 of 3)
  {
    id: "rs_ca_people2",
    roleId: "compliance_analyst",
    domain: "people",
    scenario:
      "A billing coder confides in you that she's been pressured by her supervisor to 'code up' when documentation is borderline — choosing the higher-paying code when either code could technically apply. She's afraid to report it formally because the supervisor controls her schedule and performance review.",
    esScenario:
      "Una codificadora de facturación te confía que ha sido presionada por su supervisora para 'codificar hacia arriba' cuando la documentación es ambigua — elegir el código de mayor pago cuando cualquier código podría técnicamente aplicar. Tiene miedo de reportarlo formalmente porque la supervisora controla su horario y evaluación de desempeño.",
    question: "How do you handle this sensitive disclosure?",
    esQuestion: "¿Cómo manejas esta revelación sensible?",
    options: [
      { id: "rs_ca_p2_a", text: "Thank her for trusting you. Explain that this is exactly what the compliance program is designed to address. Document her concerns (with her permission), assure her of whistleblower protections under CA Labor Code §1102.5 and the False Claims Act, and escalate to the Compliance Officer through the confidential reporting channel. Offer to accompany her if she wants to report directly. Monitor for any retaliation", esText: "Agradecerle por confiar en ti. Explicar que esto es exactamente para lo que está diseñado el programa de cumplimiento. Documentar sus preocupaciones (con su permiso), asegurarle las protecciones de denunciante bajo el Código Laboral de CA §1102.5 y la Ley de Reclamaciones Falsas, y escalar al Oficial de Cumplimiento a través del canal de reporte confidencial. Ofrecer acompañarla si quiere reportar directamente. Monitorear cualquier represalia", score: 4, behaviorTag: "whistleblower-advocate" },
      { id: "rs_ca_p2_b", text: "Pull a coding sample from the supervisor's team to verify the pattern independently. If the data confirms systematic upcoding, present the finding to the Compliance Officer without naming the coder as the source", esText: "Sacar una muestra de codificación del equipo de la supervisora para verificar el patrón independientemente. Si los datos confirman sobrecodificación sistemática, presentar el hallazgo al Oficial de Cumplimiento sin nombrar a la codificadora como la fuente", score: 3, behaviorTag: "data-protector" },
      { id: "rs_ca_p2_c", text: "Suggest she use the anonymous compliance hotline to report the concern formally. You can't be the intermediary — it needs to go through proper channels", esText: "Sugerir que use la línea de cumplimiento anónima para reportar la preocupación formalmente. No puedes ser el intermediario — necesita pasar por canales apropiados", score: 2, behaviorTag: "channel-redirector" },
      { id: "rs_ca_p2_d", text: "Coding judgment calls in borderline cases aren't necessarily fraud — it depends on the documentation. Suggest she ask for coding guidance from the supervisor in writing so there's a paper trail, but this may not rise to a compliance issue", esText: "Las decisiones de codificación en casos ambiguos no son necesariamente fraude — depende de la documentación. Sugerir que pida orientación de codificación a la supervisora por escrito para que haya un rastro de papel, pero esto puede no llegar a ser un problema de cumplimiento", score: 1, behaviorTag: "minimizer-normalizer" },
    ],
  },

  // Compliance Analyst - People (3 of 3)
  {
    id: "rs_ca_people3",
    roleId: "compliance_analyst",
    domain: "people",
    scenario:
      "You need to collect credentialing documentation from 8 providers for HRSA audit preparation. Three providers have been unresponsive to your emails for 2 weeks. Their office manager says, 'They're too busy seeing patients to deal with paperwork. Can't you just pull what you need from the EHR?'",
    esScenario:
      "Necesitas recolectar documentación de credencialización de 8 proveedores para preparación de auditoría HRSA. Tres proveedores no han respondido a tus emails por 2 semanas. Su gerente de oficina dice: 'Están muy ocupados viendo pacientes para lidiar con papeleo. ¿No puedes simplemente sacar lo que necesitas del EHR?'",
    question: "How do you get the documentation without creating conflict?",
    esQuestion: "¿Cómo obtienes la documentación sin crear conflicto?",
    options: [
      { id: "rs_ca_p3_a", text: "Acknowledge the patient care priority. Offer to minimize their burden: 'I'll pull everything I can from the EHR and credentialing files. I just need 10 minutes per provider to verify 3 items that only they can confirm.' Create a pre-filled checklist showing what you already have vs. what's missing. Schedule brief slots during their lunch or between patients. CC the Medical Director on the request with a friendly note about the HRSA deadline", esText: "Reconocer la prioridad de atención al paciente. Ofrecer minimizar su carga: 'Sacaré todo lo que pueda del EHR y archivos de credencialización. Solo necesito 10 minutos por proveedor para verificar 3 elementos que solo ellos pueden confirmar.' Crear una lista de verificación pre-llenada mostrando lo que ya tienes vs. lo que falta. Programar espacios breves durante su almuerzo o entre pacientes. Copiar al Director Médico en la solicitud con una nota amigable sobre la fecha límite de HRSA", score: 4, behaviorTag: "burden-reducer" },
      { id: "rs_ca_p3_b", text: "Send a follow-up email with the specific documents needed and a deadline tied to the HRSA visit date. Copy the Compliance Officer and Medical Director. Make it clear this is mandatory, not optional", esText: "Enviar un email de seguimiento con los documentos específicos necesarios y una fecha límite vinculada a la fecha de visita HRSA. Copiar al Oficial de Cumplimiento y Director Médico. Dejar claro que esto es obligatorio, no opcional", score: 3, behaviorTag: "escalation-path" },
      { id: "rs_ca_p3_c", text: "Pull what you can from the EHR and credentialing files. If the remaining gaps are minor, you can work around them or flag them as 'in progress' for the HRSA reviewer", esText: "Sacar lo que puedas del EHR y archivos de credencialización. Si las brechas restantes son menores, puedes trabajar alrededor de ellas o señalarlas como 'en progreso' para el revisor de HRSA", score: 2, behaviorTag: "workaround-finder" },
      { id: "rs_ca_p3_d", text: "Report the unresponsive providers to the Compliance Officer and let them handle it. You've made your requests — it's their responsibility to comply", esText: "Reportar a los proveedores no responsivos al Oficial de Cumplimiento y dejar que ellos lo manejen. Has hecho tus solicitudes — es su responsabilidad cumplir", score: 1, behaviorTag: "hands-off-reporter" },
    ],
  },

  // Compliance Analyst - Execution (1 of 3)
  {
    id: "rs_ca_execution1",
    roleId: "compliance_analyst",
    domain: "execution",
    scenario:
      "You're assigned to build a compliance tracking dashboard for your FQHC. The Compliance Officer wants to monitor: HIPAA training completion rates, credentialing expiration dates, billing audit findings, policy review status, and incident reports. Currently all of this is tracked in separate spreadsheets, email threads, and paper files.",
    esScenario:
      "Te asignan construir un tablero de seguimiento de cumplimiento para tu FQHC. El Oficial de Cumplimiento quiere monitorear: tasas de finalización de capacitación HIPAA, fechas de vencimiento de credencialización, hallazgos de auditoría de facturación, estado de revisión de políticas, y reportes de incidentes. Actualmente todo esto se rastrea en hojas de cálculo separadas, hilos de email y archivos de papel.",
    question: "How do you approach building this system?",
    esQuestion: "¿Cómo abordas la construcción de este sistema?",
    options: [
      { id: "rs_ca_e1_a", text: "Start by mapping every data source and owner. Create a master Excel workbook with linked sheets for each domain (HIPAA, credentialing, billing, policy, incidents). Build automated alerts for: credentials expiring within 60 days, overdue training, and open incidents >30 days. Color-code a dashboard summary sheet. Phase 2: migrate to a shared compliance platform (SharePoint, Smartsheet, or dedicated GRC tool) once the data structure is proven", esText: "Comenzar mapeando cada fuente de datos y responsable. Crear un libro de Excel maestro con hojas vinculadas para cada dominio (HIPAA, credencialización, facturación, política, incidentes). Construir alertas automatizadas para: credenciales que vencen dentro de 60 días, capacitación vencida, e incidentes abiertos >30 días. Codificar por colores una hoja resumen del tablero. Fase 2: migrar a una plataforma de cumplimiento compartida (SharePoint, Smartsheet, o herramienta GRC dedicada) una vez que la estructura de datos esté probada", score: 4, behaviorTag: "systems-builder" },
      { id: "rs_ca_e1_b", text: "Research compliance tracking software (Compliancy Group, MedTrainer, or Healthicity) that's designed for healthcare organizations. Present 3 options to the Compliance Officer with pricing and features. Don't reinvent the wheel with spreadsheets when purpose-built tools exist", esText: "Investigar software de seguimiento de cumplimiento (Compliancy Group, MedTrainer, o Healthicity) diseñado para organizaciones de salud. Presentar 3 opciones al Oficial de Cumplimiento con precios y características. No reinventar la rueda con hojas de cálculo cuando existen herramientas diseñadas para esto", score: 3, behaviorTag: "tool-researcher" },
      { id: "rs_ca_e1_c", text: "Create a single consolidated spreadsheet that combines all the existing tracking into one place. Keep it simple — the current users are comfortable with spreadsheets and a new system would require training", esText: "Crear una sola hoja de cálculo consolidada que combine todo el seguimiento existente en un lugar. Mantenerlo simple — los usuarios actuales están cómodos con hojas de cálculo y un nuevo sistema requeriría capacitación", score: 2, behaviorTag: "consolidator" },
      { id: "rs_ca_e1_d", text: "Ask IT to build a custom database — they can pull from the EHR, HR system, and LMS to auto-populate most of the data. A proper database is better than any spreadsheet", esText: "Pedir a TI que construya una base de datos personalizada — pueden extraer del EHR, sistema de RRHH, y LMS para auto-poblar la mayoría de los datos. Una base de datos adecuada es mejor que cualquier hoja de cálculo", score: 1, behaviorTag: "over-engineering" },
    ],
  },

  // Compliance Analyst - Execution (2 of 3)
  {
    id: "rs_ca_execution2",
    roleId: "compliance_analyst",
    domain: "execution",
    scenario:
      "Your FQHC has 180 active Business Associate Agreements (BAAs) with vendors — IT companies, labs, clearinghouses, interpreters, shredding services, etc. The Compliance Officer asks you to verify that all BAAs are current and compliant with the 2024 HIPAA Security Rule updates. You estimate this will take 100+ hours.",
    esScenario:
      "Tu FQHC tiene 180 Acuerdos de Asociado de Negocio (BAAs) activos con proveedores — compañías de TI, laboratorios, cámaras de compensación, intérpretes, servicios de trituración, etc. El Oficial de Cumplimiento te pide verificar que todos los BAAs estén vigentes y cumplan con las actualizaciones de la Regla de Seguridad HIPAA 2024. Estimas que esto tomará 100+ horas.",
    question: "How do you execute this efficiently?",
    esQuestion: "¿Cómo ejecutas esto eficientemente?",
    options: [
      { id: "rs_ca_e2_a", text: "Risk-stratify the 180 BAAs: Tier 1 (cloud/EHR/billing = highest PHI access, ~30 vendors — review first), Tier 2 (labs/specialists = moderate PHI, ~60 vendors — review second), Tier 3 (shredding/cleaning = minimal PHI, ~90 vendors — spot-check 20%). Create a tracking spreadsheet with: vendor name, BAA date, expiration, key clause status (breach notification, subcontractor, termination). Flag expired or non-compliant BAAs for immediate action. Deliver a prioritized report within 4 weeks", esText: "Estratificar por riesgo los 180 BAAs: Nivel 1 (nube/EHR/facturación = mayor acceso a PHI, ~30 proveedores — revisar primero), Nivel 2 (laboratorios/especialistas = PHI moderado, ~60 proveedores — revisar segundo), Nivel 3 (trituración/limpieza = PHI mínimo, ~90 proveedores — verificar por muestreo 20%). Crear una hoja de seguimiento con: nombre del proveedor, fecha del BAA, vencimiento, estado de cláusulas clave (notificación de brecha, subcontratista, terminación). Señalar BAAs vencidos o no conformes para acción inmediata. Entregar un reporte priorizado dentro de 4 semanas", score: 4, behaviorTag: "risk-stratifier" },
      { id: "rs_ca_e2_b", text: "Create a standard BAA compliance checklist based on the 2024 updates. Work through the vendor list alphabetically, checking each BAA against the checklist. Track completion in a spreadsheet and flag issues as you find them", esText: "Crear una lista de verificación estándar de cumplimiento de BAA basada en las actualizaciones 2024. Trabajar la lista de proveedores alfabéticamente, verificando cada BAA contra la lista. Rastrear el progreso en una hoja de cálculo y señalar problemas a medida que los encuentres", score: 3, behaviorTag: "methodical-reviewer" },
      { id: "rs_ca_e2_c", text: "Ask each department to verify their own vendor BAAs against a checklist you create. This distributes the work and gets done faster. You'll review the results and follow up on any issues", esText: "Pedir a cada departamento que verifique sus propios BAAs de proveedores contra una lista de verificación que creas. Esto distribuye el trabajo y se hace más rápido. Revisarás los resultados y darás seguimiento a cualquier problema", score: 2, behaviorTag: "delegator" },
      { id: "rs_ca_e2_d", text: "100 hours is too much for one person. Ask the Compliance Officer to hire a temp or contract worker to handle the BAA review. Your time is better spent on higher-priority audit preparation", esText: "100 horas es demasiado para una persona. Pedir al Oficial de Cumplimiento que contrate un temporal o trabajador por contrato para manejar la revisión de BAA. Tu tiempo se usa mejor en preparación de auditoría de mayor prioridad", score: 1, behaviorTag: "resource-requester" },
    ],
  },

  // Compliance Analyst - Execution (3 of 3)
  {
    id: "rs_ca_execution3",
    roleId: "compliance_analyst",
    domain: "execution",
    scenario:
      "You're conducting the monthly 340B reconciliation and discover a discrepancy: 47 prescriptions filled at your contract pharmacy show 340B pricing applied but the patients don't appear in your EHR as active patients. The contract pharmacy says 'our system shows them as eligible.'",
    esScenario:
      "Estás conduciendo la reconciliación mensual de 340B y descubres una discrepancia: 47 prescripciones surtidas en tu farmacia contratada muestran precio 340B aplicado pero los pacientes no aparecen en tu EHR como pacientes activos. La farmacia contratada dice 'nuestro sistema los muestra como elegibles.'",
    question: "How do you resolve this discrepancy?",
    esQuestion: "¿Cómo resuelves esta discrepancia?",
    options: [
      { id: "rs_ca_e3_a", text: "Flag all 47 prescriptions for hold/review immediately. Cross-reference each patient against three data sources: (1) your EHR patient roster, (2) the 340B eligibility database, (3) the contract pharmacy's dispensing records. For any confirmed ineligible patients, calculate the duplicate discount amount owed to manufacturers. Document the root cause — is it a data sync issue, a definition-of-eligible-patient mismatch, or something worse? Report findings to Compliance Officer with a recommended corrective action", esText: "Señalar las 47 prescripciones para retención/revisión inmediatamente. Cruzar cada paciente contra tres fuentes de datos: (1) tu lista de pacientes del EHR, (2) la base de datos de elegibilidad 340B, (3) los registros de dispensación de la farmacia contratada. Para cualquier paciente confirmado como no elegible, calcular el monto de descuento duplicado adeudado a fabricantes. Documentar la causa raíz — ¿es un problema de sincronización de datos, una discrepancia en la definición de paciente elegible, o algo peor? Reportar hallazgos al Oficial de Cumplimiento con acción correctiva recomendada", score: 4, behaviorTag: "forensic-analyst" },
      { id: "rs_ca_e3_b", text: "Request the contract pharmacy's eligibility documentation for all 47 patients. Compare their records to yours. The discrepancy is likely a data sync lag — but you need to verify before closing the issue", esText: "Solicitar la documentación de elegibilidad de la farmacia contratada para los 47 pacientes. Comparar sus registros con los tuyos. La discrepancia probablemente es un retraso en la sincronización de datos — pero necesitas verificar antes de cerrar el problema", score: 3, behaviorTag: "verification-seeker" },
      { id: "rs_ca_e3_c", text: "The contract pharmacy manages their own eligibility screening — that's part of the contract. Send them a formal inquiry and ask them to resolve the discrepancy on their end. Follow up in 2 weeks", esText: "La farmacia contratada maneja su propia verificación de elegibilidad — eso es parte del contrato. Enviar una consulta formal y pedir que resuelvan la discrepancia de su lado. Dar seguimiento en 2 semanas", score: 2, behaviorTag: "contract-reliance" },
      { id: "rs_ca_e3_d", text: "47 out of potentially thousands of prescriptions is a small percentage. Note it in your reconciliation report and monitor the trend over the next 2-3 months before escalating", esText: "47 de potencialmente miles de prescripciones es un porcentaje pequeño. Anotarlo en tu reporte de reconciliación y monitorear la tendencia durante los próximos 2-3 meses antes de escalar", score: 1, behaviorTag: "trend-watcher" },
    ],
  },

  // Compliance Analyst - Growth
  {
    id: "rs_ca_growth1",
    roleId: "compliance_analyst",
    domain: "growth",
    scenario:
      "You've been a compliance analyst for 18 months and feel stuck. Your daily work is mostly data entry, training scheduling, and BAA tracking. You want to grow toward a Compliance Officer role but you don't have the CHC certification, your FQHC doesn't have a training budget, and the Compliance Officer isn't going anywhere.",
    esScenario:
      "Has sido analista de cumplimiento por 18 meses y te sientes estancado. Tu trabajo diario es mayormente entrada de datos, programación de capacitación y seguimiento de BAA. Quieres crecer hacia un rol de Oficial de Cumplimiento pero no tienes la certificación CHC, tu FQHC no tiene presupuesto de capacitación, y el Oficial de Cumplimiento no se va a ningún lado.",
    question: "How do you invest in your own growth?",
    esQuestion: "¿Cómo inviertes en tu propio crecimiento?",
    options: [
      { id: "rs_ca_g1_a", text: "Create your own development plan: (1) Ask the Compliance Officer to delegate higher-level tasks (audit preparation, policy drafting, board presentations) so you build experience. (2) Study for CHC certification using free HCCA resources — the exam is $375 and you can self-fund if needed. (3) Volunteer to lead a compliance project (like building the risk matrix or updating all policies). (4) Network with compliance officers at other FQHCs through NACHC/CPCA events. (5) Document your compliance audit findings and present them — visibility builds career equity", esText: "Crear tu propio plan de desarrollo: (1) Pedir al Oficial de Cumplimiento que delegue tareas de nivel más alto (preparación de auditoría, redacción de políticas, presentaciones a la junta) para que construyas experiencia. (2) Estudiar para la certificación CHC usando recursos gratuitos de HCCA — el examen es $375 y puedes autofinanciar si es necesario. (3) Ofrecerte voluntariamente para liderar un proyecto de cumplimiento (como construir la matriz de riesgos o actualizar todas las políticas). (4) Hacer networking con oficiales de cumplimiento en otros FQHCs a través de eventos NACHC/CPCA. (5) Documentar tus hallazgos de auditoría de cumplimiento y presentarlos — la visibilidad construye capital profesional", score: 4, behaviorTag: "self-directed-grower" },
      { id: "rs_ca_g1_b", text: "Focus on the CHC certification — it's the biggest credential differentiator. Study on your own time using HCCA's study guides. Once certified, your market value increases significantly and you can either grow internally or move to a larger FQHC", esText: "Enfocarte en la certificación CHC — es el mayor diferenciador de credenciales. Estudiar en tu propio tiempo usando las guías de estudio de HCCA. Una vez certificado, tu valor de mercado aumenta significativamente y puedes crecer internamente o moverte a un FQHC más grande", score: 3, behaviorTag: "credential-focused" },
      { id: "rs_ca_p1_c2", text: "Talk to your Compliance Officer about a succession plan. Express interest in growing into their role and ask what skills/experience you need. They may start delegating more responsibility", esText: "Hablar con tu Oficial de Cumplimiento sobre un plan de sucesión. Expresar interés en crecer hacia su rol y preguntar qué habilidades/experiencia necesitas. Pueden empezar a delegar más responsabilidad", score: 2, behaviorTag: "mentor-seeker" },
      { id: "rs_ca_g1_d", text: "Start looking for Compliance Officer openings at other FQHCs. 18 months of analyst experience plus your institutional knowledge should qualify you. The fastest path to growth is often a lateral move to a bigger role elsewhere", esText: "Empezar a buscar vacantes de Oficial de Cumplimiento en otros FQHCs. 18 meses de experiencia como analista más tu conocimiento institucional deberían calificarte. El camino más rápido al crecimiento es a menudo un movimiento lateral a un rol más grande en otro lugar", score: 1, behaviorTag: "exit-first" },
    ],
  },

  // Compliance Analyst - Growth (2 of 3)
  {
    id: "rs_ca_growth2",
    roleId: "compliance_analyst",
    domain: "growth",
    scenario:
      "Your FQHC wants to implement a new EHR system. The Compliance Officer is involved in the clinical and billing evaluation but asks you to assess the compliance implications. You have no experience evaluating EHR systems.",
    esScenario:
      "Tu FQHC quiere implementar un nuevo sistema EHR. El Oficial de Cumplimiento está involucrado en la evaluación clínica y de facturación pero te pide que evalúes las implicaciones de cumplimiento. No tienes experiencia evaluando sistemas EHR.",
    question: "How do you approach a compliance domain you've never worked in?",
    esQuestion: "¿Cómo abordas un dominio de cumplimiento en el que nunca has trabajado?",
    options: [
      { id: "rs_ca_g2_a", text: "Build a compliance evaluation framework: (1) HIPAA Security Rule requirements (encryption, access controls, audit trails), (2) 21st Century Cures Act compliance (interoperability, information blocking), (3) EHR-specific BAA terms, (4) data migration security, (5) user access management, (6) reporting capabilities for UDS/HEDIS/compliance tracking. Research each area using ONC, HHS, and HCCA resources. Present a vendor comparison matrix focused on compliance criteria", esText: "Construir un marco de evaluación de cumplimiento: (1) requisitos de la Regla de Seguridad HIPAA (encriptación, controles de acceso, rastros de auditoría), (2) cumplimiento de la Ley del Siglo 21 (interoperabilidad, bloqueo de información), (3) términos de BAA específicos de EHR, (4) seguridad de migración de datos, (5) gestión de acceso de usuarios, (6) capacidades de reporte para UDS/HEDIS/seguimiento de cumplimiento. Investigar cada área usando recursos de ONC, HHS y HCCA. Presentar una matriz de comparación de proveedores enfocada en criterios de cumplimiento", score: 4, behaviorTag: "framework-builder" },
      { id: "rs_ca_g2_b", text: "Connect with compliance analysts at FQHCs that recently went through EHR transitions. Learn from their experience — what compliance issues came up, what they wish they'd evaluated, what surprised them. Combine their insights with your own research", esText: "Conectar con analistas de cumplimiento en FQHCs que recientemente pasaron por transiciones de EHR. Aprender de su experiencia — qué problemas de cumplimiento surgieron, qué desearían haber evaluado, qué los sorprendió. Combinar sus perspectivas con tu propia investigación", score: 3, behaviorTag: "peer-learner" },
      { id: "rs_ca_e2_c2", text: "Ask the EHR vendors to provide their own compliance documentation — HIPAA attestation, SOC 2 reports, BAA templates. Review these against a standard checklist", esText: "Pedir a los proveedores de EHR que proporcionen su propia documentación de cumplimiento — atestación HIPAA, reportes SOC 2, plantillas de BAA. Revisar estos contra una lista de verificación estándar", score: 2, behaviorTag: "vendor-dependent" },
      { id: "rs_ca_g2_d", text: "Be honest that you're not qualified to evaluate EHR compliance. Recommend hiring a health IT consultant who specializes in FQHC EHR implementations", esText: "Ser honesto de que no estás calificado para evaluar cumplimiento de EHR. Recomendar contratar un consultor de TI de salud que se especialice en implementaciones de EHR en FQHC", score: 1, behaviorTag: "self-disqualifier" },
    ],
  },

  // Compliance Analyst - Growth (3 of 3)
  {
    id: "rs_ca_growth3",
    roleId: "compliance_analyst",
    domain: "growth",
    scenario:
      "You notice that your FQHC's compliance program is entirely reactive — responding to audits, breaches, and complaints. You have an idea for a proactive compliance monitoring system that could prevent issues before they become violations. But nobody asked for it and you're 'just the analyst.'",
    esScenario:
      "Notas que el programa de cumplimiento de tu FQHC es completamente reactivo — respondiendo a auditorías, brechas y quejas. Tienes una idea para un sistema proactivo de monitoreo de cumplimiento que podría prevenir problemas antes de que se conviertan en violaciones. Pero nadie lo pidió y eres 'solo el analista.'",
    question: "Do you pursue this initiative?",
    esQuestion: "¿Persigues esta iniciativa?",
    options: [
      { id: "rs_ca_g3_a", text: "Absolutely. Build a proof of concept on your own time: pick one compliance domain (e.g., credentialing expirations), create an automated monitoring dashboard showing current status + 30/60/90-day forecasts, and demonstrate it to the Compliance Officer. Show the ROI: 'This dashboard would have caught the 3 expired credentials we scrambled to fix last month.' Let the results make the case for expanding to other domains", esText: "Absolutamente. Construir una prueba de concepto en tu propio tiempo: elegir un dominio de cumplimiento (ej., vencimientos de credencialización), crear un tablero de monitoreo automatizado mostrando estado actual + pronósticos de 30/60/90 días, y demostrarlo al Oficial de Cumplimiento. Mostrar el ROI: 'Este tablero habría detectado las 3 credenciales vencidas que nos apuramos a arreglar el mes pasado.' Dejar que los resultados hagan el caso para expandir a otros dominios", score: 4, behaviorTag: "initiative-taker" },
      { id: "rs_ca_g3_b", text: "Write a brief proposal outlining the concept, estimated time to build, and expected benefits. Share it with the Compliance Officer and ask for permission to spend a few hours per week on it", esText: "Escribir una propuesta breve describiendo el concepto, tiempo estimado para construir, y beneficios esperados. Compartirla con el Oficial de Cumplimiento y pedir permiso para dedicar algunas horas por semana", score: 3, behaviorTag: "proposal-writer" },
      { id: "rs_ca_g3_c", text: "Mention the idea casually to the Compliance Officer and gauge their interest. If they're supportive, offer to build it. If not, don't push it — they may have reasons you don't know about", esText: "Mencionar la idea casualmente al Oficial de Cumplimiento y evaluar su interés. Si lo apoyan, ofrecer construirlo. Si no, no insistir — pueden tener razones que no conoces", score: 2, behaviorTag: "permission-seeker" },
      { id: "rs_ca_g3_d", text: "Focus on doing your assigned job well. Proactive monitoring is a great idea but it's not your role to redesign the compliance program. When you become a Compliance Officer, you can implement these changes", esText: "Enfocarte en hacer bien tu trabajo asignado. El monitoreo proactivo es una gran idea pero no es tu rol rediseñar el programa de cumplimiento. Cuando seas Oficial de Cumplimiento, puedes implementar estos cambios", score: 1, behaviorTag: "role-limited" },
    ],
  },

  // Compliance Analyst - Transition (1 of 3)
  {
    id: "rs_ca_transition1",
    roleId: "compliance_analyst",
    domain: "transition",
    scenario:
      "You're starting your first compliance role at an FQHC after working in medical billing for 4 years. Your new Compliance Officer is overwhelmed and says, 'I need you to hit the ground running — we have a HRSA site visit in 5 months and I haven't started preparing. Here's the checklist, here's the shared drive. Figure it out.'",
    esScenario:
      "Estás comenzando tu primer rol de cumplimiento en un FQHC después de trabajar en facturación médica por 4 años. Tu nuevo Oficial de Cumplimiento está abrumado y dice: 'Necesito que empieces a correr — tenemos una visita de sitio HRSA en 5 meses y no he empezado a preparar. Aquí está la lista de verificación, aquí está el drive compartido. Resuélvelo.'",
    question: "How do you onboard yourself with minimal support?",
    esQuestion: "¿Cómo te incorporas con apoyo mínimo?",
    options: [
      { id: "rs_ca_t1_a", text: "Week 1: Read the HRSA Compliance Manual chapters on the 19 program requirements. Review the last OSV report to understand what was flagged. Map the shared drive to find existing policies, credentialing files, and training records. Week 2: Create a status tracker for all 19 requirements (green/yellow/red). Week 3-4: Interview department heads to assess current compliance status for their areas. By month 2: Present a gap analysis with a 4-month sprint plan to the Compliance Officer", esText: "Semana 1: Leer los capítulos del Manual de Cumplimiento de HRSA sobre los 19 requisitos del programa. Revisar el último reporte de OSV para entender qué fue señalado. Mapear el drive compartido para encontrar políticas existentes, archivos de credencialización y registros de capacitación. Semana 2: Crear un rastreador de estado para los 19 requisitos (verde/amarillo/rojo). Semana 3-4: Entrevistar a jefes de departamento para evaluar el estado actual de cumplimiento en sus áreas. Para el mes 2: Presentar un análisis de brechas con un plan de sprint de 4 meses al Oficial de Cumplimiento", score: 4, behaviorTag: "self-starter" },
      { id: "rs_ca_t1_b", text: "Focus on what you know: billing compliance. Start with a PPS billing audit since that's your strength, then expand to HIPAA and governance as you learn the HRSA requirements. Your billing expertise will earn credibility with the team", esText: "Enfocarte en lo que sabes: cumplimiento de facturación. Comenzar con una auditoría de facturación PPS ya que es tu fortaleza, luego expandir a HIPAA y gobernanza a medida que aprendas los requisitos HRSA. Tu experiencia en facturación ganará credibilidad con el equipo", score: 3, behaviorTag: "strength-first" },
      { id: "rs_ca_t1_c", text: "Ask the Compliance Officer for a structured onboarding plan — even if they're busy, they should provide some guidance. You can't 'figure it out' without understanding the organizational context", esText: "Pedir al Oficial de Cumplimiento un plan de incorporación estructurado — aunque estén ocupados, deberían proporcionar alguna orientación. No puedes 'resolverlo' sin entender el contexto organizacional", score: 2, behaviorTag: "support-dependent" },
      { id: "rs_ca_t1_d", text: "Start with the checklist they gave you and work through it item by item. Don't overcomplicate it — check off what's done, flag what's missing, and report back weekly", esText: "Comenzar con la lista de verificación que te dieron y trabajarla punto por punto. No lo compliques demasiado — marcar lo que está hecho, señalar lo que falta, y reportar semanalmente", score: 1, behaviorTag: "checklist-follower" },
    ],
  },

  // Compliance Analyst - Transition (2 of 3)
  {
    id: "rs_ca_transition2",
    roleId: "compliance_analyst",
    domain: "transition",
    scenario:
      "You're 6 weeks into your new compliance analyst role. You've noticed that the finance team and the compliance team have very different interpretations of PPS billing rules. The finance team bills aggressively to maximize revenue; the compliance team (just you and the CO) flags billing risks. The CFO has told the billing team to 'just bill it' when documentation is borderline. There's clear tension between the departments.",
    esScenario:
      "Llevas 6 semanas en tu nuevo rol de analista de cumplimiento. Has notado que el equipo de finanzas y el equipo de cumplimiento tienen interpretaciones muy diferentes de las reglas de facturación PPS. El equipo de finanzas factura agresivamente para maximizar ingresos; el equipo de cumplimiento (solo tú y el CO) señala riesgos de facturación. El CFO ha dicho al equipo de facturación que 'solo factúrenlo' cuando la documentación es ambigua. Hay tensión clara entre los departamentos.",
    question: "How do you navigate this organizational conflict as a new employee?",
    esQuestion: "¿Cómo navegas este conflicto organizacional como empleado nuevo?",
    options: [
      { id: "rs_ca_t2_a", text: "Don't pick sides — present data. Pull a sample of the 'borderline' claims and analyze outcomes: denial rates, payer audits, overpayment requests. Present the financial risk of aggressive billing: 'These 50 claims have a 35% denial rate and 12% audit trigger rate. Conservative documentation would reduce denials by $45K/quarter and lower audit risk.' Frame compliance as revenue protection, not revenue reduction", esText: "No tomar lados — presentar datos. Sacar una muestra de los reclamos 'ambiguos' y analizar resultados: tasas de denegación, auditorías de pagadores, solicitudes de sobrepago. Presentar el riesgo financiero de la facturación agresiva: 'Estos 50 reclamos tienen una tasa de denegación del 35% y una tasa de activación de auditoría del 12%. La documentación conservadora reduciría denegaciones en $45K/trimestre y disminuiría el riesgo de auditoría.' Enmarcar el cumplimiento como protección de ingresos, no reducción de ingresos", score: 4, behaviorTag: "data-diplomat" },
      { id: "rs_ca_t2_b", text: "Discuss the tension with the Compliance Officer and develop a joint position on PPS billing standards. Present it to the CFO as a compliance recommendation backed by CMS/HRSA guidance. Having the CO's backing gives your analysis more weight", esText: "Discutir la tensión con el Oficial de Cumplimiento y desarrollar una posición conjunta sobre estándares de facturación PPS. Presentarlo al CFO como una recomendación de cumplimiento respaldada por orientación de CMS/HRSA. Tener el respaldo del CO da más peso a tu análisis", score: 3, behaviorTag: "coalition-builder" },
      { id: "rs_ca_t2_c", text: "Document the CFO's 'just bill it' directive in your audit notes. If it leads to a billing compliance issue, you'll have a record showing you flagged the risk. Don't push back too hard as a new employee — earn trust first", esText: "Documentar la directiva del CFO de 'solo factúrenlo' en tus notas de auditoría. Si lleva a un problema de cumplimiento de facturación, tendrás un registro mostrando que señalaste el riesgo. No insistir demasiado como empleado nuevo — ganar confianza primero", score: 2, behaviorTag: "cya-documenter" },
      { id: "rs_ca_t2_d", text: "The CFO outranks you. Focus on your assigned compliance tasks and leave billing disputes to the Compliance Officer and CFO to resolve. Getting in the middle of an executive conflict in your first 6 weeks is a career risk", esText: "El CFO tiene mayor rango que tú. Enfocarte en tus tareas de cumplimiento asignadas y dejar las disputas de facturación para que el Oficial de Cumplimiento y el CFO las resuelvan. Meterte en medio de un conflicto ejecutivo en tus primeras 6 semanas es un riesgo profesional", score: 1, behaviorTag: "conflict-avoider" },
    ],
  },

  // Compliance Analyst - Transition (3 of 3)
  {
    id: "rs_ca_transition3",
    roleId: "compliance_analyst",
    domain: "transition",
    scenario:
      "You're interviewing for a compliance analyst position at an FQHC. The hiring manager asks: 'We're a 150-person FQHC with no formal compliance program. We've never had a dedicated compliance person. What would you do in your first 90 days to build one from scratch?'",
    esScenario:
      "Estás entrevistando para un puesto de analista de cumplimiento en un FQHC. El gerente de contratación pregunta: 'Somos un FQHC de 150 personas sin programa de cumplimiento formal. Nunca hemos tenido una persona dedicada al cumplimiento. ¿Qué harías en tus primeros 90 días para construir uno desde cero?'",
    question: "What's your answer?",
    esQuestion: "¿Cuál es tu respuesta?",
    options: [
      { id: "rs_ca_t3_a", text: "Days 1-30 (Assess): Complete compliance risk assessment across all domains — HRSA requirements, HIPAA, billing, 340B, workplace safety. Review last HRSA site visit findings. Interview every department head. Map existing policies and gaps. Days 31-60 (Build): Create compliance committee charter (including board representation), draft core policies (HIPAA, billing compliance, conflict of interest), establish confidential reporting mechanism, build compliance calendar. Days 61-90 (Train): Launch organization-wide HIPAA training, present compliance roadmap to board, start credentialing file audit. Deliverable: A written compliance plan the board can approve, with a 12-month implementation timeline", esText: "Días 1-30 (Evaluar): Completar evaluación de riesgo de cumplimiento en todos los dominios — requisitos HRSA, HIPAA, facturación, 340B, seguridad laboral. Revisar hallazgos de la última visita de sitio HRSA. Entrevistar a cada jefe de departamento. Mapear políticas existentes y brechas. Días 31-60 (Construir): Crear carta del comité de cumplimiento (incluyendo representación de la junta), redactar políticas centrales (HIPAA, cumplimiento de facturación, conflicto de intereses), establecer mecanismo de reporte confidencial, construir calendario de cumplimiento. Días 61-90 (Capacitar): Lanzar capacitación HIPAA a toda la organización, presentar hoja de ruta de cumplimiento a la junta, iniciar auditoría de archivos de credencialización. Entregable: Un plan de cumplimiento escrito que la junta pueda aprobar, con un cronograma de implementación de 12 meses", score: 4, behaviorTag: "program-builder" },
      { id: "rs_ca_t3_b", text: "Start with the highest-risk areas: HIPAA and HRSA requirements. Get the basics in place — training, policies, credentialing — before expanding to billing compliance, 340B, and other domains. A 150-person FQHC can't do everything at once", esText: "Comenzar con las áreas de mayor riesgo: HIPAA y requisitos HRSA. Poner lo básico en su lugar — capacitación, políticas, credencialización — antes de expandir a cumplimiento de facturación, 340B, y otros dominios. Un FQHC de 150 personas no puede hacer todo a la vez", score: 3, behaviorTag: "risk-based-prioritizer" },
      { id: "rs_ca_t3_c", text: "Research what other FQHCs of similar size have in place for compliance. Use their programs as a template and adapt it to this organization. No need to reinvent the wheel", esText: "Investigar qué otros FQHCs de tamaño similar tienen en su lugar para cumplimiento. Usar sus programas como plantilla y adaptarla a esta organización. No hay necesidad de reinventar la rueda", score: 2, behaviorTag: "template-adapter" },
      { id: "rs_ca_t3_d", text: "Hire a compliance consultant to do the initial assessment and build the program framework. As a solo analyst, you'll need expert guidance to set up a program from scratch. Your first 90 days should focus on learning the organization while the consultant builds the infrastructure", esText: "Contratar un consultor de cumplimiento para hacer la evaluación inicial y construir el marco del programa. Como analista solo, necesitarás orientación experta para establecer un programa desde cero. Tus primeros 90 días deberían enfocarse en aprender la organización mientras el consultor construye la infraestructura", score: 1, behaviorTag: "consultant-dependent" },
    ],
  },

];
