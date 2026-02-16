/* ------------------------------------------------------------------ */
/*  Role-Specific Behavioral Assessment Questions                      */
/*  32 questions: 4 domains × 8 FQHC roles                           */
/* ------------------------------------------------------------------ */

import type { AssessmentQuestion, DomainId } from "./career-assessment-engine";

export type RoleId =
  | "chw"
  | "care_coordinator"
  | "medical_assistant"
  | "case_manager"
  | "behavioral_health"
  | "registered_nurse"
  | "patient_services"
  | "revenue_cycle";

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
];
