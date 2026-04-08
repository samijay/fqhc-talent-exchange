// Role-specific behavioral assessment questions (Part D: dental roles).
// Roles: dental_assistant, dental_hygienist, dentist
// 45 questions: 15 per role (3 per domain × 5 domains)
// Imported by role-specific-questions.ts.

export const ROLE_SPECIFIC_QUESTIONS_D = [
  /* ================================================================ */
  /*  DENTAL ASSISTANT                                                */
  /* ================================================================ */

  // DA - Mission 1
  {
    id: "rs_da_mission1",
    roleId: "dental_assistant",
    domain: "mission",
    scenario:
      "A patient tells you they haven't been to a dentist in 8 years because they couldn't afford it. They're embarrassed about the condition of their teeth and apologize repeatedly during the appointment.",
    esScenario:
      "Un paciente te dice que no ha ido al dentista en 8 años porque no podía pagarlo. Está avergonzado por el estado de sus dientes y se disculpa repetidamente durante la cita.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_da_m1_a",
        text: "Normalize their experience — tell them many patients here haven't had care in years and that's exactly why this clinic exists. Reassure them there's no judgment, and the team is glad they came in",
        esText: "Normalizar su experiencia — decirles que muchos pacientes aquí no han tenido atención en años y por eso exactamente existe esta clínica. Asegurarles que no hay juicio y que el equipo está contento de que hayan venido",
        score: 4,
        behaviorTag: "mission-driven-compassion",
      },
      {
        id: "rs_da_m1_b",
        text: "Tell them not to worry and focus on explaining each step of the procedure so they feel informed and in control",
        esText: "Decirles que no se preocupen y enfocarse en explicar cada paso del procedimiento para que se sientan informados y en control",
        score: 3,
        behaviorTag: "procedurally-reassuring",
      },
      {
        id: "rs_da_m1_c",
        text: "Smile and say something positive about them being here now, then quickly move on to the clinical tasks",
        esText: "Sonreír y decir algo positivo sobre que están aquí ahora, luego pasar rápidamente a las tareas clínicas",
        score: 2,
        behaviorTag: "surface-positive",
      },
      {
        id: "rs_da_m1_d",
        text: "Stay quiet to avoid making them more uncomfortable and focus on getting the procedures done efficiently",
        esText: "Quedarte callado para evitar hacerlos sentir más incómodos y enfocarse en terminar los procedimientos eficientemente",
        score: 1,
        behaviorTag: "task-avoidant",
      },
    ],
  },

  // DA - Mission 2
  {
    id: "rs_da_mission2",
    roleId: "dental_assistant",
    domain: "mission",
    scenario:
      "You overhear a coworker say, 'These Denti-Cal patients don't take care of their teeth anyway, so why bother spending extra time on them?' You know many patients face barriers like cost, transportation, and work schedules.",
    esScenario:
      "Escuchas a un compañero decir: 'Estos pacientes de Denti-Cal no cuidan sus dientes de todos modos, así que para qué molestarse en pasar tiempo extra con ellos?' Sabes que muchos pacientes enfrentan barreras como costo, transporte y horarios de trabajo.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_m2_a",
        text: "Share specific examples of barriers patients face — cost, fear, work schedules — and explain that deferred care is usually about access, not attitude. Suggest approaching each patient as if today might be their only visit this year",
        esText: "Compartir ejemplos específicos de barreras que enfrentan los pacientes — costo, miedo, horarios de trabajo — y explicar que la atención postergada generalmente es sobre acceso, no actitud. Sugerir abordar a cada paciente como si hoy pudiera ser su única visita este año",
        score: 4,
        behaviorTag: "advocacy-educator",
      },
      {
        id: "rs_da_m2_b",
        text: "Gently push back and say that our job is to provide the same quality care to every patient regardless of their insurance",
        esText: "Responder suavemente que nuestro trabajo es proporcionar la misma calidad de atención a cada paciente independientemente de su seguro",
        score: 3,
        behaviorTag: "equity-minded",
      },
      {
        id: "rs_da_m2_c",
        text: "Disagree internally but don't say anything — it's not your place to correct a coworker",
        esText: "Estar en desacuerdo internamente pero no decir nada — no es tu lugar corregir a un compañero",
        score: 2,
        behaviorTag: "conflict-avoidant",
      },
      {
        id: "rs_da_m2_d",
        text: "Shrug it off — everyone vents sometimes, and it doesn't affect how they treat patients",
        esText: "Dejarlo pasar — todos desahogan a veces, y no afecta cómo tratan a los pacientes",
        score: 1,
        behaviorTag: "dismissive",
      },
    ],
  },

  // DA - Mission 3
  {
    id: "rs_da_mission3",
    roleId: "dental_assistant",
    domain: "mission",
    scenario:
      "Your FQHC is launching a school-based dental sealant program for underserved elementary schools. The Dental Director asks if anyone wants to volunteer for weekend clinics. You already work full-time.",
    esScenario:
      "Tu FQHC está lanzando un programa de selladores dentales en escuelas primarias desatendidas. El Director Dental pregunta si alguien quiere ser voluntario para clínicas de fin de semana. Ya trabajas tiempo completo.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_da_m3_a",
        text: "Volunteer for at least one session — school sealant programs prevent cavities in kids who otherwise wouldn't see a dentist, and it's a chance to make a community impact beyond the clinic walls",
        esText: "Ser voluntario para al menos una sesión — los programas de selladores escolares previenen caries en niños que de otra manera no verian a un dentista, y es una oportunidad de hacer un impacto comunitario más allá de las paredes de la clínica",
        score: 4,
        behaviorTag: "community-committed",
      },
      {
        id: "rs_da_m3_b",
        text: "Express interest and ask about the schedule to see if you can fit it in without burning out",
        esText: "Expresar interés y preguntar sobre el horario para ver si puedes encajarlo sin agotarte",
        score: 3,
        behaviorTag: "willing-but-realistic",
      },
      {
        id: "rs_da_m3_c",
        text: "Decline politely — you need your weekends to recharge so you can give your best during the work week",
        esText: "Declinar cortesmente — necesitas tus fines de semana para recargarte y poder dar lo mejor durante la semana laboral",
        score: 2,
        behaviorTag: "boundary-focused",
      },
      {
        id: "rs_da_m3_d",
        text: "Feel that weekend clinics are above and beyond your job description and shouldn't be expected",
        esText: "Sentir que las clínicas de fin de semana están más allá de la descripción de tu trabajo y no deberían esperarse",
        score: 1,
        behaviorTag: "role-limited",
      },
    ],
  },

  // DA - People 1
  {
    id: "rs_da_people1",
    roleId: "dental_assistant",
    domain: "people",
    scenario:
      "A 5-year-old patient is crying and clinging to their parent, refusing to sit in the dental chair. The dentist is running behind schedule and growing frustrated. The parent looks overwhelmed.",
    esScenario:
      "Un paciente de 5 años está llorando y aferrándose a su padre, negándose a sentarse en la silla dental. El dentista está atrasado y se está frustrando. El padre se ve abrumado.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_p1_a",
        text: "Get at the child's eye level, show them the 'cool' tools, let them hold the suction, and use tell-show-do to gradually acclimate them. Reassure the parent that this is normal and the team is patient",
        esText: "Ponerse a la altura de los ojos del niño, mostrarle las herramientas 'geniales', dejarle sostener la succión, y usar contar-mostrar-hacer para aclimatarlos gradualmente. Asegurar al padre que esto es normal y el equipo es paciente",
        score: 4,
        behaviorTag: "pediatric-skilled",
      },
      {
        id: "rs_da_p1_b",
        text: "Talk to the child calmly, offer a reward for sitting in the chair, and suggest the parent sit with them during the exam",
        esText: "Hablar con el niño calmadamente, ofrecer una recompensa por sentarse en la silla, y sugerir que el padre se siente con ellos durante el examen",
        score: 3,
        behaviorTag: "incentive-based",
      },
      {
        id: "rs_da_p1_c",
        text: "Let the parent handle the situation and wait until the child calms down on their own before starting",
        esText: "Dejar que el padre maneje la situación y esperar hasta que el niño se calme por su cuenta antes de comenzar",
        score: 2,
        behaviorTag: "passive-observer",
      },
      {
        id: "rs_da_p1_d",
        text: "Suggest rescheduling the appointment since the child isn't cooperating and the dentist is behind",
        esText: "Sugerir reprogramar la cita ya que el niño no coopera y el dentista está atrasado",
        score: 1,
        behaviorTag: "reschedule-default",
      },
    ],
  },

  // DA - People 2
  {
    id: "rs_da_people2",
    roleId: "dental_assistant",
    domain: "people",
    scenario:
      "A patient speaks only Spanish. You're bilingual but the dentist isn't. The dentist asks you to quickly translate treatment options, but the patient has questions about risks and costs that require nuanced explanation.",
    esScenario:
      "Un paciente habla solo español. Tu eres bilingüe pero el dentista no. El dentista te pide que traduzcas rápidamente las opciones de tratamiento, pero el paciente tiene preguntas sobre riesgos y costos que requieren explicación matizada.",
    question: "How do you handle this?",
    esQuestion: "Cómo manejas esto?",
    options: [
      {
        id: "rs_da_p2_a",
        text: "Take the time to interpret thoroughly — explain each option, risks, and costs in the patient's language at their comprehension level. Ask the dentist to slow down if needed. Informed consent requires full understanding",
        esText: "Tomar el tiempo para interpretar completamente — explicar cada opción, riesgos y costos en el idioma del paciente a su nivel de comprensión. Pedir al dentista que baje la velocidad si es necesario. El consentimiento informado requiere comprensión completa",
        score: 4,
        behaviorTag: "patient-advocate-interpreter",
      },
      {
        id: "rs_da_p2_b",
        text: "Translate the key points as accurately as possible and suggest calling the language line for the detailed cost discussion",
        esText: "Traducir los puntos clave lo más precisamente posible y sugerir llamar a la línea de idiomas para la discusion detallada de costos",
        score: 3,
        behaviorTag: "resourceful-practical",
      },
      {
        id: "rs_da_p2_c",
        text: "Translate quickly to keep the schedule moving and hand the patient a consent form in Spanish to review",
        esText: "Traducir rápidamente para mantener el horario y entregar al paciente un formulario de consentimiento en español para revisar",
        score: 2,
        behaviorTag: "efficiency-over-understanding",
      },
      {
        id: "rs_da_p2_d",
        text: "Translate the basics and assume the patient will ask more questions if they need to",
        esText: "Traducir lo básico y asumir que el paciente hará más preguntas si lo necesita",
        score: 1,
        behaviorTag: "assumption-based",
      },
    ],
  },

  // DA - People 3
  {
    id: "rs_da_people3",
    roleId: "dental_assistant",
    domain: "people",
    scenario:
      "A new dental assistant joins your team and is struggling with operatory setup. She's slower than expected and the dentist has mentioned it to you privately. The new DA seems stressed and embarrassed.",
    esScenario:
      "Una nueva asistente dental se une a tu equipo y está luchando con la configuración del consultorio. Es más lenta de lo esperado y el dentista te lo ha mencionado en privado. La nueva DA parece estresada y avergonzada.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_p3_a",
        text: "Offer to work alongside her during setup, share your own tricks for efficiency, and create a quick-reference checklist. Mention to the dentist that she's improving and needs a bit more time",
        esText: "Ofrecer trabajar junto a ella durante la configuración, compartir tus propios trucos de eficiencia, y crear una lista de verificación de referencia rápida. Mencionar al dentista que está mejorando y necesita un poco más de tiempo",
        score: 4,
        behaviorTag: "mentor-advocate",
      },
      {
        id: "rs_da_p3_b",
        text: "Check in with her and ask if she needs help with anything specific — she may have gaps in training you can fill",
        esText: "Acercarte a ella y preguntar si necesita ayuda con algo específico — puede tener brechas en la capacitación que puedes llenar",
        score: 3,
        behaviorTag: "supportive-peer",
      },
      {
        id: "rs_da_p3_c",
        text: "Let her figure it out on her own — you learned by doing, and she will too",
        esText: "Dejarla que lo descubra por su cuenta — tu aprendiste haciendo, y ella también lo hara",
        score: 2,
        behaviorTag: "sink-or-swim",
      },
      {
        id: "rs_da_p3_d",
        text: "Agree with the dentist that she needs to pick up the pace — the team can't keep accommodating slower performance",
        esText: "Estar de acuerdo con el dentista en que necesita acelerar el ritmo — el equipo no puede seguir acomodando un rendimiento más lento",
        score: 1,
        behaviorTag: "performance-critical",
      },
    ],
  },

  // DA - Execution 1
  {
    id: "rs_da_exec1",
    roleId: "dental_assistant",
    domain: "execution",
    scenario:
      "During a busy day with 16 patients scheduled, you notice the autoclave (sterilizer) isn't reaching the correct temperature. You have instruments needed for the next patient in 10 minutes.",
    esScenario:
      "Durante un día ocupado con 16 pacientes programados, notas que la autoclave (esterilizador) no está alcanzando la temperatura correcta. Tienes instrumentos necesarios para el próximo paciente en 10 minutos.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_e1_a",
        text: "Stop the cycle immediately — never use instruments from a failed sterilization. Alert the dentist, pull backup instrument sets, document the failure, and quarantine the affected load per OSHA protocols",
        esText: "Detener el ciclo inmediatamente — nunca usar instrumentos de una esterilización fallida. Alertar al dentista, sacar conjuntos de instrumentos de respaldo, documentar la falla y poner en cuarentena la carga afectada según protocolos de OSHA",
        score: 4,
        behaviorTag: "infection-control-first",
      },
      {
        id: "rs_da_e1_b",
        text: "Re-run the cycle and use backup instruments for the next patient while waiting. Report the issue to the office manager",
        esText: "Volver a ejecutar el ciclo y usar instrumentos de respaldo para el próximo paciente mientras esperas. Reportar el problema al gerente de oficina",
        score: 3,
        behaviorTag: "protocol-follower",
      },
      {
        id: "rs_da_e1_c",
        text: "Run the instruments through chemical disinfection as an alternative and use them for the next patient to stay on schedule",
        esText: "Pasar los instrumentos por desinfección química como alternativa y usarlos para el próximo paciente para mantenerse en horario",
        score: 2,
        behaviorTag: "shortcut-taker",
      },
      {
        id: "rs_da_e1_d",
        text: "Assume the instruments are probably fine since the autoclave was working earlier — use them and deal with the issue later",
        esText: "Asumir que los instrumentos probablemente están bien ya que la autoclave estaba funcionando antes — usarlos y lidiar con el problema después",
        score: 1,
        behaviorTag: "safety-dismissive",
      },
    ],
  },

  // DA - Execution 2
  {
    id: "rs_da_exec2",
    roleId: "dental_assistant",
    domain: "execution",
    scenario:
      "The dental clinic is transitioning from Dentrix to a new EHR system (Curve Dental). You've been asked to help train other DAs on the new system while maintaining your regular patient schedule.",
    esScenario:
      "La clínica dental está haciendo la transición de Dentrix a un nuevo sistema EHR (Curve Dental). Te han pedido que ayudes a capacitar a otros DAs en el nuevo sistema mientras mantienes tu horario regular de pacientes.",
    question: "How do you approach this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_da_e2_a",
        text: "Create quick-reference guides for the most common tasks (charting, scheduling, treatment plans), schedule brief training sessions during operatory downtime, and build a cheat sheet comparing old vs. new workflows",
        esText: "Crear guías de referencia rápida para las tareas más comunes (charting, programación, planes de tratamiento), programar breves sesiones de capacitación durante el tiempo muerto del consultorio, y construir una hoja de trucos comparando flujos de trabajo antiguos vs. nuevos",
        score: 4,
        behaviorTag: "systematic-trainer",
      },
      {
        id: "rs_da_e2_b",
        text: "Offer to shadow each DA during their first few patients on the new system and answer questions as they come up",
        esText: "Ofrecer acompanar a cada DA durante sus primeros pacientes en el nuevo sistema y responder preguntas conforme surjan",
        score: 3,
        behaviorTag: "hands-on-helper",
      },
      {
        id: "rs_da_e2_c",
        text: "Share what you know when people ask, but focus primarily on your own patient schedule — you can't do two jobs at once",
        esText: "Compartir lo que sabes cuando la gente pregunte, pero enfocarse principalmente en tu propio horario de pacientes — no puedes hacer dos trabajos a la vez",
        score: 2,
        behaviorTag: "self-prioritizing",
      },
      {
        id: "rs_da_e2_d",
        text: "Tell them to just read the vendor's training manual — you're too busy with patients to be an informal trainer",
        esText: "Decirles que lean el manual de capacitación del proveedor — estás demasiado ocupado con pacientes para ser un capacitador informal",
        score: 1,
        behaviorTag: "deflecting",
      },
    ],
  },

  // DA - Execution 3
  {
    id: "rs_da_exec3",
    roleId: "dental_assistant",
    domain: "execution",
    scenario:
      "You're assisting a complex extraction when the dentist asks for an instrument that should be on the tray but isn't — the operatory setup was incomplete. The patient is in the chair with their mouth open.",
    esScenario:
      "Estás asistiendo una extracción compleja cuando el dentista pide un instrumento que debería estar en la bandeja pero no está — la configuración del consultorio fue incompleta. El paciente está en la silla con la boca abierta.",
    question: "How do you handle this?",
    esQuestion: "Cómo manejas esto?",
    options: [
      {
        id: "rs_da_e3_a",
        text: "Immediately and calmly retrieve the instrument from the supply area. After the procedure, review your setup checklist to identify what was missed, and add it to prevent it happening again",
        esText: "Recuperar inmediata y calmadamente el instrumento del area de suministros. Después del procedimiento, revisar tu lista de verificación de configuración para identificar lo que faltaba, y agregarlo para evitar que vuelva a suceder",
        score: 4,
        behaviorTag: "recover-and-improve",
      },
      {
        id: "rs_da_e3_b",
        text: "Quickly grab the instrument and apologize briefly to the dentist. Make a mental note to double-check setups for extractions",
        esText: "Agarrar rápidamente el instrumento y disculparse brevemente con el dentista. Hacer una nota mental de verificar dos veces las configuraciones para extracciones",
        score: 3,
        behaviorTag: "quick-recovery",
      },
      {
        id: "rs_da_e3_c",
        text: "Look around the tray hoping it's just in the wrong spot, then go get it when you confirm it's missing",
        esText: "Buscar alrededor de la bandeja esperando que esté en el lugar equivocado, luego ir a buscarlo cuando confirmes que falta",
        score: 2,
        behaviorTag: "delayed-response",
      },
      {
        id: "rs_da_e3_d",
        text: "Feel embarrassed and freeze for a moment before the dentist repeats the request more urgently",
        esText: "Sentirte avergonzado y congelarte por un momento antes de que el dentista repita la solicitud con más urgencia",
        score: 1,
        behaviorTag: "freeze-under-pressure",
      },
    ],
  },

  // DA - Growth 1
  {
    id: "rs_da_growth1",
    roleId: "dental_assistant",
    domain: "growth",
    scenario:
      "Your supervisor mentions that getting your RDA (Registered Dental Assistant) license would qualify you for expanded duties — coronal polishing, sealant placement — and a $3-5K salary increase. But the exam prep takes 3-6 months.",
    esScenario:
      "Tu supervisor menciona que obtener tu licencia RDA (Asistente Dental Registrado) te calificaría para deberes ampliados — pulido coronal, colocación de selladores — y un aumento salarial de $3-5K. Pero la preparación del examen toma 3-6 meses.",
    question: "What's your response?",
    esQuestion: "Cuál es tu respuesta?",
    options: [
      {
        id: "rs_da_g1_a",
        text: "Start immediately — ask about study stipends, create a study schedule, and identify an RDA-certified colleague who can mentor you. The expanded scope and pay increase are worth the investment",
        esText: "Comenzar inmediatamente — preguntar sobre estipendios de estudio, crear un horario de estudio, e identificar un colega certificado RDA que pueda ser tu mentor. El alcance ampliado y el aumento salarial valen la inversión",
        score: 4,
        behaviorTag: "growth-driven",
      },
      {
        id: "rs_da_g1_b",
        text: "Research the RDA exam requirements and timeline, then create a plan to start studying within the next month",
        esText: "Investigar los requisitos del examen RDA y cronograma, luego crear un plan para comenzar a estudiar dentro del próximo mes",
        score: 3,
        behaviorTag: "deliberate-planner",
      },
      {
        id: "rs_da_g1_c",
        text: "Consider it but feel uncertain about the time commitment — maybe after things settle down at work",
        esText: "Considerarlo pero sentirse inseguro sobre el compromiso de tiempo — tal vez después de que las cosas se calmen en el trabajo",
        score: 2,
        behaviorTag: "postponer",
      },
      {
        id: "rs_da_g1_d",
        text: "Feel that your current skills are sufficient and the extra studying isn't necessary for your career goals",
        esText: "Sentir que tus habilidades actuales son suficientes y el estudio extra no es necesario para tus metas profesionales",
        score: 1,
        behaviorTag: "growth-resistant",
      },
    ],
  },

  // DA - Growth 2
  {
    id: "rs_da_growth2",
    roleId: "dental_assistant",
    domain: "growth",
    scenario:
      "The clinic is adding a pediatric dental program and needs DAs trained in behavior management techniques for children. There's an online course available, but it's 20 hours and not required for your job.",
    esScenario:
      "La clínica está agregando un programa de odontología pediátrica y necesita DAs capacitados en técnicas de manejo de comportamiento para niños. Hay un curso en línea disponible, pero es de 20 horas y no es requerido para tu trabajo.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_g2_a",
        text: "Sign up immediately — pediatric dental skills make you more versatile and the program's success depends on the whole team being prepared, not just the dentist",
        esText: "Inscribirte inmediatamente — las habilidades dentales pediátricas te hacen más versátil y el éxito del programa depende de que todo el equipo esté preparado, no solo el dentista",
        score: 4,
        behaviorTag: "proactive-learner",
      },
      {
        id: "rs_da_g2_b",
        text: "Ask your supervisor if the clinic will cover the training time or offer a stipend, then sign up",
        esText: "Preguntar a tu supervisor si la clínica cubrirá el tiempo de capacitación u ofrecerá un estipendio, luego inscribirte",
        score: 3,
        behaviorTag: "practical-learner",
      },
      {
        id: "rs_da_g2_c",
        text: "Wait to see if the training becomes required before committing 20 hours to it",
        esText: "Esperar a ver si la capacitación se vuelve obligatoria antes de comprometer 20 horas",
        score: 2,
        behaviorTag: "requirement-driven",
      },
      {
        id: "rs_da_g2_d",
        text: "Skip it — 20 hours is a lot for an optional course, and you can learn on the job when the program starts",
        esText: "Saltarlo — 20 horas es mucho para un curso opcional, y puedes aprender en el trabajo cuando el programa comience",
        score: 1,
        behaviorTag: "effort-averse",
      },
    ],
  },

  // DA - Growth 3
  {
    id: "rs_da_growth3",
    roleId: "dental_assistant",
    domain: "growth",
    scenario:
      "A dental hygienist at your clinic shares that she started as a DA and went back to school for her RDH license, which tripled her salary. She offers to tell you about the pathway.",
    esScenario:
      "Una higienista dental en tu clínica comparte que empezó como DA y volvió a la escuela para su licencia RDH, lo cual triplicó su salario. Ella ofrece contarte sobre el camino.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_da_g3_a",
        text: "Absolutely — schedule a coffee chat, ask about program prerequisites, costs, how she balanced school and work, and whether your FQHC offers tuition support. Start researching programs right away",
        esText: "Absolutamente — programar una charla de café, preguntar sobre prerrequisitos del programa, costos, cómo equilibró escuela y trabajo, y si tu FQHC ofrece apoyo de matrícula. Comenzar a investigar programas de inmediato",
        score: 4,
        behaviorTag: "career-ambitious",
      },
      {
        id: "rs_da_g3_b",
        text: "Thank her and ask a few questions — you're curious about the pathway even if you're not sure it's the right time",
        esText: "Agradecerle y hacer algunas preguntas — tienes curiosidad sobre el camino aunque no estes seguro de que sea el momento adecuado",
        score: 3,
        behaviorTag: "curious-cautious",
      },
      {
        id: "rs_da_g3_c",
        text: "Appreciate the offer but feel that going back to school isn't realistic right now given your financial situation",
        esText: "Apreciar la oferta pero sentir que volver a la escuela no es realista ahora dada tu situación financiera",
        score: 2,
        behaviorTag: "barrier-focused",
      },
      {
        id: "rs_da_g3_d",
        text: "Politely decline — you're content as a DA and don't see yourself going back to school",
        esText: "Declinar cortesmente — estás contento como DA y no te ves volviendo a la escuela",
        score: 1,
        behaviorTag: "career-static",
      },
    ],
  },

  // DA - Transition 1
  {
    id: "rs_da_trans1",
    roleId: "dental_assistant",
    domain: "transition",
    scenario:
      "You've accepted a DA position at a new FQHC that uses a different dental EHR system than you're used to. Your start date is in two weeks.",
    esScenario:
      "Has aceptado un puesto de DA en un nuevo FQHC que usa un sistema EHR dental diferente al que estás acostumbrado. Tu fecha de inicio es en dos semanas.",
    question: "How do you prepare?",
    esQuestion: "Cómo te preparas?",
    options: [
      {
        id: "rs_da_t1_a",
        text: "Research the new EHR system online (tutorials, user forums), review the FQHC's Denti-Cal provider types, look up their dental team on LinkedIn, and prepare questions about their infection control and clinical protocols",
        esText: "Investigar el nuevo sistema EHR en línea (tutoriales, foros de usuarios), revisar los tipos de proveedor Denti-Cal del FQHC, buscar su equipo dental en LinkedIn, y preparar preguntas sobre sus protocolos de control de infecciones y clínicos",
        score: 4,
        behaviorTag: "thoroughly-prepared",
      },
      {
        id: "rs_da_t1_b",
        text: "Look up the new EHR system and review basic Denti-Cal documentation requirements so you're not starting completely cold",
        esText: "Buscar el nuevo sistema EHR y revisar los requisitos básicos de documentación Denti-Cal para no empezar completamente en frío",
        score: 3,
        behaviorTag: "reasonably-prepared",
      },
      {
        id: "rs_da_t1_c",
        text: "Relax and enjoy the time off — they'll train you when you get there",
        esText: "Relajarte y disfrutar el tiempo libre — te capacitarán cuando llegues",
        score: 2,
        behaviorTag: "reactive",
      },
      {
        id: "rs_da_t1_d",
        text: "Worry about whether you'll be able to learn the new system quickly enough, but don't take any specific preparation steps",
        esText: "Preocuparte por si podrás aprender el nuevo sistema lo suficientemente rápido, pero no tomar ningún paso de preparación específico",
        score: 1,
        behaviorTag: "anxious-passive",
      },
    ],
  },

  // DA - Transition 2
  {
    id: "rs_da_trans2",
    roleId: "dental_assistant",
    domain: "transition",
    scenario:
      "On your first day at a new FQHC dental clinic, you realize their sterilization workflow is different from what you were trained on. Their approach seems equally valid but unfamiliar.",
    esScenario:
      "En tu primer día en una nueva clínica dental de FQHC, te das cuenta de que su flujo de trabajo de esterilización es diferente de lo que te enseñaron. Su enfoque parece igualmente válido pero desconocido.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_da_t2_a",
        text: "Follow their protocol exactly, ask the lead DA to walk you through each step so you understand the reasoning, and note any differences for your own reference. Adapt to their system first, then offer suggestions later if needed",
        esText: "Seguir su protocolo exactamente, pedir al DA líder que te guíe a través de cada paso para que entiendas el razonamiento, y anotar cualquier diferencia para tu propia referencia. Adaptarte a su sistema primero, luego ofrecer sugerencias después si es necesario",
        score: 4,
        behaviorTag: "adaptive-learner",
      },
      {
        id: "rs_da_t2_b",
        text: "Follow their protocol and ask questions as you go to make sure you're doing everything correctly",
        esText: "Seguir su protocolo y hacer preguntas sobre la marcha para asegurarte de que estás haciendo todo correctamente",
        score: 3,
        behaviorTag: "compliant-learner",
      },
      {
        id: "rs_da_t2_c",
        text: "Follow their protocol but mention that your previous clinic did it differently — maybe they'd want to consider your approach",
        esText: "Seguir su protocolo pero mencionar que tu clínica anterior lo hacía diferente — tal vez quieran considerar tu enfoque",
        score: 2,
        behaviorTag: "premature-suggester",
      },
      {
        id: "rs_da_t2_d",
        text: "Feel confused and anxious about the different approach — what if their way isn't as safe?",
        esText: "Sentirte confundido y ansioso por el enfoque diferente — qué pasa si su manera no es tan segura?",
        score: 1,
        behaviorTag: "change-resistant",
      },
    ],
  },

  // DA - Transition 3
  {
    id: "rs_da_trans3",
    roleId: "dental_assistant",
    domain: "transition",
    scenario:
      "You're transitioning from a private dental practice to an FQHC. In private practice, you saw mostly insured patients with regular care. At this FQHC, many patients are uninsured, have Denti-Cal, and present with extensive deferred care needs.",
    esScenario:
      "Estás haciendo la transición de una práctica dental privada a un FQHC. En la práctica privada, veías principalmente pacientes asegurados con atención regular. En este FQHC, muchos pacientes no tienen seguro, tienen Denti-Cal, y presentan necesidades extensas de atención postergada.",
    question: "How do you adjust your approach?",
    esQuestion: "Cómo ajustas tu enfoque?",
    options: [
      {
        id: "rs_da_t3_a",
        text: "Recognize that this patient population needs extra patience and compassion — prepare for more complex cases, longer treatment plans, and patients who may be fearful or distrustful of dental care. See each patient as someone the system failed, not someone who failed to take care of themselves",
        esText: "Reconocer que esta población de pacientes necesita paciencia y compasión extra — prepararse para casos más complejos, planes de tratamiento más largos, y pacientes que pueden tener miedo o desconfianza de la atención dental. Ver a cada paciente como alguien a quien el sistema le falló, no alguien que no se cuidó",
        score: 4,
        behaviorTag: "mission-ready-transition",
      },
      {
        id: "rs_da_t3_b",
        text: "Expect a learning curve and ask colleagues about the most common presentations and how to prepare operatories for more complex procedures",
        esText: "Esperar una curva de aprendizaje y preguntar a los colegas sobre las presentaciones más comunes y cómo preparar consultorios para procedimientos más complejos",
        score: 3,
        behaviorTag: "practical-adapter",
      },
      {
        id: "rs_da_t3_c",
        text: "Apply the same clinical skills but expect a busier and more chaotic environment than private practice",
        esText: "Aplicar las mismas habilidades clínicas pero esperar un entorno más ocupado y caótico que la práctica privada",
        score: 2,
        behaviorTag: "surface-adapter",
      },
      {
        id: "rs_da_t3_d",
        text: "Feel overwhelmed by the volume and complexity of cases compared to what you're used to",
        esText: "Sentirte abrumado por el volumen y complejidad de casos comparado con lo que estás acostumbrado",
        score: 1,
        behaviorTag: "overwhelmed",
      },
    ],
  },

  /* ================================================================ */
  /*  DENTAL HYGIENIST                                                */
  /* ================================================================ */

  // DH - Mission 1
  {
    id: "rs_dh_mission1",
    roleId: "dental_hygienist",
    domain: "mission",
    scenario:
      "During a recall appointment, you notice a 45-year-old patient with advanced periodontal disease also has an elevated blood pressure reading (taken at check-in) and mentions they haven't seen a doctor in years. They're here only for a cleaning.",
    esScenario:
      "Durante una cita de seguimiento, notas que un paciente de 45 años con enfermedad periodontal avanzada también tiene una lectura de presión arterial elevada (tomada al registrarse) y menciona que no ha visto a un médico en años. Solo está aquí para una limpieza.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dh_m1_a",
        text: "Explain the connection between periodontal disease and cardiovascular risk. Recommend a same-day warm handoff to the medical team for a blood pressure follow-up — at an FQHC, the doctor is often right down the hall. This is oral-systemic integration in action",
        esText: "Explicar la conexión entre la enfermedad periodontal y el riesgo cardiovascular. Recomendar una transferencia cálida el mismo día al equipo médico para seguimiento de presión arterial — en un FQHC, el doctor a menudo está justo al final del pasillo. Esto es integración oral-sistémica en acción",
        score: 4,
        behaviorTag: "oral-systemic-integrator",
      },
      {
        id: "rs_dh_m1_b",
        text: "Note the elevated BP in the chart, complete the hygiene appointment, and recommend they schedule a medical appointment before their next dental visit",
        esText: "Anotar la PA elevada en el expediente, completar la cita de higiene, y recomendar que programen una cita médica antes de su próxima visita dental",
        score: 3,
        behaviorTag: "documentation-focused",
      },
      {
        id: "rs_dh_m1_c",
        text: "Mention the elevated BP reading and suggest they follow up with a doctor, but stay focused on the dental appointment",
        esText: "Mencionar la lectura de PA elevada y sugerir que hagan seguimiento con un médico, pero mantenerse enfocado en la cita dental",
        score: 2,
        behaviorTag: "scope-limited",
      },
      {
        id: "rs_dh_m1_d",
        text: "Focus on the dental cleaning — blood pressure is outside your scope and the medical team will catch it eventually",
        esText: "Enfocarse en la limpieza dental — la presión arterial está fuera de tu alcance y el equipo médico lo detectará eventualmente",
        score: 1,
        behaviorTag: "siloed",
      },
    ],
  },

  // DH - Mission 2
  {
    id: "rs_dh_mission2",
    roleId: "dental_hygienist",
    domain: "mission",
    scenario:
      "Your clinic serves a large migrant farmworker population. Many patients have severe dental erosion from pesticide exposure and limited access to fluoridated water. The standard hygiene protocols feel insufficient for this population's needs.",
    esScenario:
      "Tu clínica atiende a una gran población de trabajadores agrícolas migrantes. Muchos pacientes tienen erosión dental severa por exposición a pesticidas y acceso limitado a agua fluorada. Los protocolos estándar de higiene se sienten insuficientes para las necesidades de esta población.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dh_m2_a",
        text: "Research evidence-based fluoride protocols for high-risk agricultural communities, propose a modified prevention protocol to the Dental Director, and develop culturally appropriate oral hygiene education materials in Spanish",
        esText: "Investigar protocolos de flúor basados en evidencia para comunidades agrícolas de alto riesgo, proponer un protocolo de prevención modificado al Director Dental, y desarrollar materiales de educación de higiene oral culturalmente apropiados en español",
        score: 4,
        behaviorTag: "population-health-advocate",
      },
      {
        id: "rs_dh_m2_b",
        text: "Increase fluoride varnish frequency for these patients and spend extra time on oral hygiene education during appointments",
        esText: "Aumentar la frecuencia de barniz de flúor para estos pacientes y dedicar tiempo extra en educación de higiene oral durante las citas",
        score: 3,
        behaviorTag: "clinically-responsive",
      },
      {
        id: "rs_dh_m2_c",
        text: "Follow the standard protocols and document the severity of cases so the dental team can track patterns",
        esText: "Seguir los protocolos estándar y documentar la severidad de los casos para que el equipo dental pueda rastrear patrones",
        score: 2,
        behaviorTag: "protocol-follower",
      },
      {
        id: "rs_dh_m2_d",
        text: "Do your best within the standard protocol — the population's challenges are systemic and beyond what a hygienist can change",
        esText: "Hacer lo mejor dentro del protocolo estándar — los desafios de la población son sistémicos y están más allá de lo que un higienista puede cambiar",
        score: 1,
        behaviorTag: "passive-acceptance",
      },
    ],
  },

  // DH - Mission 3
  {
    id: "rs_dh_mission3",
    roleId: "dental_hygienist",
    domain: "mission",
    scenario:
      "A pregnant patient comes in for her hygiene appointment. She mentions she's been avoiding dental care during pregnancy because her mother told her 'dental work harms the baby.' She has visible signs of pregnancy gingivitis.",
    esScenario:
      "Una paciente embarazada viene para su cita de higiene. Menciona que ha estado evitando la atención dental durante el embarazo porque su madre le dijo que 'el trabajo dental daña al bebé.' Tiene signos visibles de gingivitis del embarazo.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dh_m3_a",
        text: "Acknowledge her mother's concern respectfully, then explain with evidence that dental cleanings are safe and recommended during pregnancy — and that untreated periodontal disease is actually linked to preterm birth. Offer to provide written materials she can share with her family",
        esText: "Reconocer la preocupación de su madre respetuosamente, luego explicar con evidencia que las limpiezas dentales son seguras y recomendadas durante el embarazo — y que la enfermedad periodontal no tratada en realidad está vinculada al parto prematuro. Ofrecer proporcionar materiales escritos que pueda compartir con su familia",
        score: 4,
        behaviorTag: "evidence-based-culturally-sensitive",
      },
      {
        id: "rs_dh_m3_b",
        text: "Explain that dental cleanings are safe during pregnancy and that it's important to treat the gingivitis to protect both her and the baby",
        esText: "Explicar que las limpiezas dentales son seguras durante el embarazo y que es importante tratar la gingivitis para proteger tanto a ella como al bebé",
        score: 3,
        behaviorTag: "clinically-direct",
      },
      {
        id: "rs_dh_m3_c",
        text: "Proceed with the cleaning and mention that dental care is safe during pregnancy, but don't push if she seems hesitant",
        esText: "Proceder con la limpieza y mencionar que la atención dental es segura durante el embarazo, pero no presionar si parece dudosa",
        score: 2,
        behaviorTag: "non-confrontational",
      },
      {
        id: "rs_dh_m3_d",
        text: "Do a gentle cleaning and recommend she check with her OB before her next dental appointment",
        esText: "Hacer una limpieza suave y recomendar que consulte con su obstetra antes de su próxima cita dental",
        score: 1,
        behaviorTag: "deferring",
      },
    ],
  },

  // DH - People 1
  {
    id: "rs_dh_people1",
    roleId: "dental_hygienist",
    domain: "people",
    scenario:
      "A patient with extensive periodontal disease needs scaling and root planing (SRP) over multiple visits. After the first quadrant, they say they don't want to come back because 'it hurt too much.' They're due for 3 more quadrants.",
    esScenario:
      "Un paciente con enfermedad periodontal extensa necesita raspado y alisado radicular (SRP) en múltiples visitas. Después del primer cuadrante, dice que no quiere volver porque 'dolió demasiado.' Tiene pendientes 3 cuadrantes más.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dh_p1_a",
        text: "Validate their pain experience, discuss anesthesia options (local, topical, nitrous oxide), offer to adjust the pace and pressure for future appointments, and explain what happens to their teeth and gums if treatment stops after one quadrant",
        esText: "Validar su experiencia de dolor, discutir opciones de anestesia (local, tópica, óxido nitroso), ofrecer ajustar el ritmo y presión para futuras citas, y explicar que pasa con sus dientes y encías si el tratamiento se detiene después de un cuadrante",
        score: 4,
        behaviorTag: "empathetic-problem-solver",
      },
      {
        id: "rs_dh_p1_b",
        text: "Offer to use more anesthesia next time and schedule shorter appointments so it's less overwhelming",
        esText: "Ofrecer usar más anestesia la próxima vez y programar citas más cortas para que sea menos abrumador",
        score: 3,
        behaviorTag: "accommodation-focused",
      },
      {
        id: "rs_dh_p1_c",
        text: "Explain that SRP is uncomfortable but necessary, and encourage them to complete the treatment plan",
        esText: "Explicar que el SRP es incómodo pero necesario, y animarlos a completar el plan de tratamiento",
        score: 2,
        behaviorTag: "clinical-logical",
      },
      {
        id: "rs_dh_p1_d",
        text: "Note in the chart that the patient declined further SRP and move on — you can't force them to come back",
        esText: "Anotar en el expediente que el paciente declinó más SRP y seguir adelante — no puedes forzarlos a volver",
        score: 1,
        behaviorTag: "disengaged",
      },
    ],
  },

  // DH - People 2
  {
    id: "rs_dh_people2",
    roleId: "dental_hygienist",
    domain: "people",
    scenario:
      "The dental director asks you to mentor a new hygienist who just graduated. She's clinically competent but struggles with patient communication — patients seem tense during her appointments and recall compliance is low for her panel.",
    esScenario:
      "El director dental te pide que seas mentora de una nueva higienista recién graduada. Es clínicamente competente pero tiene dificultades con la comunicación con pacientes — los pacientes parecen tensos durante sus citas y el cumplimiento de seguimiento es bajo para su panel.",
    question: "How do you approach mentoring her?",
    esQuestion: "Cómo abordas ser su mentora?",
    options: [
      {
        id: "rs_dh_p2_a",
        text: "Observe one of her appointments (with patient consent), then give specific feedback on communication moments — tone, pacing, use of tell-show-do. Teach her motivational interviewing basics and help her develop opening scripts that put patients at ease",
        esText: "Observar una de sus citas (con consentimiento del paciente), luego dar retroalimentación específica sobre momentos de comunicación — tono, ritmo, uso de contar-mostrar-hacer. Enseñarle conceptos básicos de entrevista motivacional y ayudarle a desarrollar guiones de apertura que pongan a los pacientes cómodos",
        score: 4,
        behaviorTag: "structured-mentor",
      },
      {
        id: "rs_dh_p2_b",
        text: "Share your own patient communication techniques and suggest she sit in on a few of your appointments to observe your approach",
        esText: "Compartir tus propias técnicas de comunicación con pacientes y sugerirle que asista a algunas de tus citas para observar tu enfoque",
        score: 3,
        behaviorTag: "lead-by-example",
      },
      {
        id: "rs_dh_p2_c",
        text: "Give her general tips about being friendly and chatting with patients to build rapport",
        esText: "Darle consejos generales sobre ser amigable y charlar con los pacientes para construir rapport",
        score: 2,
        behaviorTag: "surface-advice",
      },
      {
        id: "rs_dh_p2_d",
        text: "Feel that communication skills are innate and she'll either develop them naturally or she won't — not something you can really teach",
        esText: "Sentir que las habilidades de comunicación son innatas y ella las desarrollará naturalmente o no — no es algo que realmente puedas enseñar",
        score: 1,
        behaviorTag: "fixed-mindset",
      },
    ],
  },

  // DH - People 3
  {
    id: "rs_dh_people3",
    roleId: "dental_hygienist",
    domain: "people",
    scenario:
      "A dental assistant approaches you privately and says the dentist has been rushing through exams and missing findings. She's worried about patient safety but afraid to report it because the dentist is her direct supervisor.",
    esScenario:
      "Una asistente dental se acerca a ti en privado y dice que el dentista ha estado apresurando los exámenes y pasando por alto hallazgos. Está preocupada por la seguridad del paciente pero tiene miedo de reportarlo porque el dentista es su supervisor directo.",
    question: "How do you handle this?",
    esQuestion: "Cómo manejas esto?",
    options: [
      {
        id: "rs_dh_p3_a",
        text: "Take her concern seriously. Suggest documenting specific examples, then offer to go with her to the Dental Director or clinic manager together. Patient safety issues need to be escalated through proper channels, and she shouldn't feel alone in raising them",
        esText: "Tomar su preocupación en serio. Sugerir documentar ejemplos específicos, luego ofrecer ir con ella al Director Dental o gerente de clínica juntas. Los problemas de seguridad del paciente necesitan escalarse a través de canales apropiados, y ella no debería sentirse sola al plantearlos",
        score: 4,
        behaviorTag: "safety-advocate-ally",
      },
      {
        id: "rs_dh_p3_b",
        text: "Validate her concern and suggest she document specific instances. Recommend she speak to the clinic manager confidentially",
        esText: "Validar su preocupación y sugerir que documente instancias específicas. Recomendar que hable con el gerente de clínica confidencialmente",
        score: 3,
        behaviorTag: "supportive-advisor",
      },
      {
        id: "rs_dh_p3_c",
        text: "Tell her you'll keep an eye on it yourself during your own patient exams and bring it up if you notice the same pattern",
        esText: "Decirle que tu misma estarás atenta durante tus propios exámenes de pacientes y lo plantearás si notas el mismo patrón",
        score: 2,
        behaviorTag: "indirect-observer",
      },
      {
        id: "rs_dh_p3_d",
        text: "Tell her that the dentist probably knows what they're doing and she may be overreacting — exams can look rushed without being inadequate",
        esText: "Decirle que el dentista probablemente sabe lo que hace y ella puede estar exagerando — los exámenes pueden parecer apresurados sin ser inadecuados",
        score: 1,
        behaviorTag: "dismissive",
      },
    ],
  },

  // DH - Execution 1
  {
    id: "rs_dh_exec1",
    roleId: "dental_hygienist",
    domain: "execution",
    scenario:
      "You've completed a full-mouth SRP on a patient. When you submit the treatment to billing, the claim is denied because the documentation doesn't meet Denti-Cal's clinical justification requirements for D4341 (SRP).",
    esScenario:
      "Has completado un SRP de boca completa en un paciente. Cuando envías el tratamiento a facturación, el reclamo es denegado porque la documentación no cumple con los requisitos de justificación clínica de Denti-Cal para D4341 (SRP).",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dh_e1_a",
        text: "Review Denti-Cal's specific documentation requirements for D4341, update your charting templates to include all required elements (pocket depths, bleeding on probing, clinical attachment loss), fix this claim, and update your workflow so future SRP documentation is complete from the start",
        esText: "Revisar los requisitos de documentación específicos de Denti-Cal para D4341, actualizar tus plantillas de charting para incluir todos los elementos requeridos (profundidad de bolsas, sangrado al sondaje, pérdida de inserción clínica), corregir este reclamo, y actualizar tu flujo de trabajo para que la documentación futura de SRP esté completa desde el inicio",
        score: 4,
        behaviorTag: "systematic-improver",
      },
      {
        id: "rs_dh_e1_b",
        text: "Ask the billing team what was missing, fix the documentation for this claim, and try to remember the requirements for next time",
        esText: "Preguntar al equipo de facturación qué faltaba, corregir la documentación para este reclamo, e intentar recordar los requisitos para la próxima vez",
        score: 3,
        behaviorTag: "reactive-learner",
      },
      {
        id: "rs_dh_e1_c",
        text: "Fix the claim and move on — Denti-Cal denials happen all the time and it's mostly a billing department issue",
        esText: "Corregir el reclamo y seguir adelante — las denegaciones de Denti-Cal suceden todo el tiempo y es principalmente un problema del departamento de facturación",
        score: 2,
        behaviorTag: "billing-detached",
      },
      {
        id: "rs_dh_e1_d",
        text: "Let the billing team handle it — documentation details aren't really the hygienist's responsibility",
        esText: "Dejar que el equipo de facturación lo maneje — los detalles de documentación no son realmente responsabilidad del higienista",
        score: 1,
        behaviorTag: "responsibility-avoidant",
      },
    ],
  },

  // DH - Execution 2
  {
    id: "rs_dh_exec2",
    roleId: "dental_hygienist",
    domain: "execution",
    scenario:
      "Your patient recall compliance rate is 55% — meaning almost half of your patients don't come back for their scheduled follow-up hygiene appointments. The clinic target is 70%.",
    esScenario:
      "Tu tasa de cumplimiento de seguimiento de pacientes es 55% — lo que significa que casi la mitad de tus pacientes no regresan para sus citas de seguimiento de higiene programadas. El objetivo de la clínica es 70%.",
    question: "How do you address this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_dh_e2_a",
        text: "Analyze why patients aren't returning — is it scheduling barriers, cost, transportation, or appointment experience? Work with front desk to implement reminder systems, offer flexible scheduling, and end every appointment by booking the next one before the patient leaves the chair",
        esText: "Analizar por qué los pacientes no regresan — son barreras de programación, costo, transporte o experiencia de la cita? Trabajar con recepción para implementar sistemas de recordatorio, ofrecer programación flexible, y terminar cada cita reservando la próxima antes de que el paciente se levante de la silla",
        score: 4,
        behaviorTag: "data-driven-problem-solver",
      },
      {
        id: "rs_dh_e2_b",
        text: "Ask the front desk to implement more reminder calls and texts, and make a point to emphasize the importance of follow-up during appointments",
        esText: "Pedir a recepción que implemente más llamadas y textos de recordatorio, y hacer un punto de enfatizar la importancia del seguimiento durante las citas",
        score: 3,
        behaviorTag: "delegation-focused",
      },
      {
        id: "rs_dh_e2_c",
        text: "Remind patients to schedule their next appointment at the end of each visit — beyond that, it's up to them to follow through",
        esText: "Recordar a los pacientes que programen su próxima cita al final de cada visita — más allá de eso, depende de ellos cumplir",
        score: 2,
        behaviorTag: "minimal-effort",
      },
      {
        id: "rs_dh_e2_d",
        text: "Accept that FQHC patients have chaotic lives and a 55% rate is probably the best you can realistically achieve",
        esText: "Aceptar que los pacientes de FQHC tienen vidas caóticas y una tasa del 55% es probablemente lo mejor que puedes lograr realistamente",
        score: 1,
        behaviorTag: "low-expectations",
      },
    ],
  },

  // DH - Execution 3
  {
    id: "rs_dh_exec3",
    roleId: "dental_hygienist",
    domain: "execution",
    scenario:
      "The dental clinic is consistently running 30 minutes behind by mid-morning. As the hygienist, you can see that the bottleneck is the dentist exam — hygienists are completing assessments but waiting idle for the dentist to check before dismissing patients.",
    esScenario:
      "La clínica dental consistentemente tiene 30 minutos de atraso para media mañana. Como higienista, puedes ver que el cuello de botella es el examen del dentista — las higienistas están completando evaluaciones pero esperando ociosas a que el dentista revise antes de dar de alta a los pacientes.",
    question: "How do you address this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_dh_e3_a",
        text: "Propose a workflow change to the Dental Director: implement general supervision protocols where hygienists can dismiss patients for routine prophylaxis without waiting for the dentist exam, and batch dentist exams for complex cases. This could increase daily capacity by 30-50%",
        esText: "Proponer un cambio de flujo de trabajo al Director Dental: implementar protocolos de supervisión general donde las higienistas puedan dar de alta a pacientes para profilaxis rutinaria sin esperar el examen del dentista, y agrupar exámenes del dentista para casos complejos. Esto podría aumentar la capacidad diaria en 30-50%",
        score: 4,
        behaviorTag: "systems-thinker",
      },
      {
        id: "rs_dh_e3_b",
        text: "Bring up the bottleneck at the next team meeting and suggest adjusting the schedule to build in dentist exam time",
        esText: "Plantear el cuello de botella en la próxima reunión del equipo y sugerir ajustar el horario para incluir tiempo de examen del dentista",
        score: 3,
        behaviorTag: "team-communicator",
      },
      {
        id: "rs_dh_e3_c",
        text: "Use the waiting time productively — catch up on charting, set up the next operatory, or do patient education",
        esText: "Usar el tiempo de espera productivamente — ponerte al día con charting, preparar el próximo consultorio, o hacer educación del paciente",
        score: 2,
        behaviorTag: "coping-strategy",
      },
      {
        id: "rs_dh_e3_d",
        text: "Accept that running behind is normal in a busy FQHC dental clinic — it's just how things work here",
        esText: "Aceptar que atrasarse es normal en una clínica dental de FQHC ocupada — así es como funcionan las cosas aquí",
        score: 1,
        behaviorTag: "status-quo-acceptance",
      },
    ],
  },

  // DH - Growth 1
  {
    id: "rs_dh_growth1",
    roleId: "dental_hygienist",
    domain: "growth",
    scenario:
      "California has the RDHAP (Registered Dental Hygienist in Alternative Practice) credential that allows independent practice in underserved settings without direct dentist supervision. It requires additional education and 2,000+ hours of clinical experience.",
    esScenario:
      "California tiene la credencial RDHAP (Higienista Dental Registrada en Práctica Alternativa) que permite práctica independiente en entornos desatendidos sin supervisión directa de un dentista. Requiere educación adicional y 2,000+ horas de experiencia clínica.",
    question: "How interested are you in pursuing this credential?",
    esQuestion: "Qué tan interesado/a estás en obtener esta credencial?",
    options: [
      {
        id: "rs_dh_g1_a",
        text: "Very interested — RDHAP would let me bring preventive care directly to schools, nursing homes, and underserved communities where there's no dentist. I'll research programs and start planning the prerequisites",
        esText: "Muy interesado/a — RDHAP me permitiría llevar atención preventiva directamente a escuelas, hogares de ancianos y comunidades desatendidas donde no hay dentista. Investigaré programas y comenzaré a planificar los prerrequisitos",
        score: 4,
        behaviorTag: "scope-expanding",
      },
      {
        id: "rs_dh_g1_b",
        text: "Interesting — I'd like to learn more about the requirements and career impact before committing to the additional education",
        esText: "Interesante — me gustaría aprender más sobre los requisitos e impacto profesional antes de comprometerme con la educación adicional",
        score: 3,
        behaviorTag: "exploratory",
      },
      {
        id: "rs_dh_g1_c",
        text: "Maybe eventually, but right now I'm focused on building my clinical skills in the current role",
        esText: "Tal vez eventualmente, pero ahora mismo estoy enfocado/a en construir mis habilidades clínicas en el puesto actual",
        score: 2,
        behaviorTag: "deferred-interest",
      },
      {
        id: "rs_dh_g1_d",
        text: "Not interested — I prefer working under a dentist's supervision and don't want the added responsibility",
        esText: "No interesado/a — prefiero trabajar bajo la supervisión de un dentista y no quiero la responsabilidad adicional",
        score: 1,
        behaviorTag: "scope-comfortable",
      },
    ],
  },

  // DH - Growth 2
  {
    id: "rs_dh_growth2",
    roleId: "dental_hygienist",
    domain: "growth",
    scenario:
      "Your FQHC is piloting a Virtual Dental Home program where hygienists provide preventive care at community sites (schools, senior centers) and telehealth-connect with a dentist for diagnosis. You're asked to lead the pilot.",
    esScenario:
      "Tu FQHC está piloteando un programa Virtual Dental Home donde las higienistas proporcionan atención preventiva en sitios comunitarios (escuelas, centros de adultos mayores) y se conectan por telesalud con un dentista para diagnóstico. Te piden que lideres el piloto.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dh_g2_a",
        text: "Accept enthusiastically — this is the future of FQHC dental access. Draft a pilot plan including site selection, equipment needs, telehealth protocols, and metrics for success. This leadership role could define the next stage of your career",
        esText: "Aceptar con entusiasmo — este es el futuro del acceso dental de FQHC. Redactar un plan piloto incluyendo selección de sitio, necesidades de equipo, protocolos de telesalud y métricas de éxito. Este rol de liderazgo podría definir la próxima etapa de tu carrera",
        score: 4,
        behaviorTag: "innovation-leader",
      },
      {
        id: "rs_dh_g2_b",
        text: "Accept and ask for training on the telehealth platform and remote clinical protocols before launching",
        esText: "Aceptar y pedir capacitación en la plataforma de telesalud y protocolos clínicos remotos antes del lanzamiento",
        score: 3,
        behaviorTag: "willing-prepared",
      },
      {
        id: "rs_dh_g2_c",
        text: "Express interest but concern about working without a dentist physically present — you want clear protocols first",
        esText: "Expresar interés pero preocupación por trabajar sin un dentista físicamente presente — quieres protocolos claros primero",
        score: 2,
        behaviorTag: "cautiously-interested",
      },
      {
        id: "rs_dh_g2_d",
        text: "Decline — you prefer a traditional clinical setting and don't want the added complexity of telehealth",
        esText: "Declinar — prefieres un entorno clínico tradicional y no quieres la complejidad adicional de la telesalud",
        score: 1,
        behaviorTag: "innovation-averse",
      },
    ],
  },

  // DH - Growth 3
  {
    id: "rs_dh_growth3",
    roleId: "dental_hygienist",
    domain: "growth",
    scenario:
      "You notice that none of the dental team has formal training in tobacco cessation counseling — a service that's reimbursable under Denti-Cal and clinically important for your patient population with high smoking rates.",
    esScenario:
      "Notas que nadie del equipo dental tiene capacitación formal en consejería de cesación tabáquica — un servicio que es reembolsable bajo Denti-Cal y clínicamente importante para tu población de pacientes con altas tasas de tabaquismo.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dh_g3_a",
        text: "Research certification programs (CDA offers a weekend course), estimate the revenue impact of adding D1320 (tobacco counseling) to hygiene appointments, and present a business case to the Dental Director",
        esText: "Investigar programas de certificación (CDA ofrece un curso de fin de semana), estimar el impacto en ingresos de agregar D1320 (consejería tabáquica) a citas de higiene, y presentar un caso de negocio al Director Dental",
        score: 4,
        behaviorTag: "revenue-aware-clinician",
      },
      {
        id: "rs_dh_g3_b",
        text: "Sign up for the certification yourself and start offering tobacco cessation counseling to patients who smoke",
        esText: "Inscribirte tu misma en la certificación y comenzar a ofrecer consejería de cesación tabáquica a pacientes que fuman",
        score: 3,
        behaviorTag: "self-starter",
      },
      {
        id: "rs_dh_g3_c",
        text: "Mention it to the Dental Director as a suggestion and let them decide whether it's worth pursuing",
        esText: "Mencionarlo al Director Dental como sugerencia y dejar que ellos decidan si vale la pena perseguirlo",
        score: 2,
        behaviorTag: "passive-suggester",
      },
      {
        id: "rs_dh_g3_d",
        text: "Continue providing informal cessation advice during appointments — formal certification seems unnecessary for what you already do",
        esText: "Continuar proporcionando consejos informales de cesación durante las citas — la certificación formal parece innecesaria para lo que ya haces",
        score: 1,
        behaviorTag: "informal-sufficient",
      },
    ],
  },

  // DH - Transition 1
  {
    id: "rs_dh_trans1",
    roleId: "dental_hygienist",
    domain: "transition",
    scenario:
      "You're starting at a new FQHC next month. You've worked in private practice for 5 years and this is your first community health center position. The patient population will be very different from what you're used to.",
    esScenario:
      "Empiezas en un nuevo FQHC el próximo mes. Has trabajado en práctica privada por 5 años y este es tu primer puesto en un centro de salud comunitario. La población de pacientes será muy diferente de lo que estás acostumbrado/a.",
    question: "How do you prepare?",
    esQuestion: "Cómo te preparas?",
    options: [
      {
        id: "rs_dh_t1_a",
        text: "Review the Denti-Cal provider manual for covered hygiene services and frequency limitations, research the FQHC's patient demographics, prepare for high-acuity patients with deferred care, and mentally shift from production-focused private practice to access-focused community health",
        esText: "Revisar el manual de proveedor Denti-Cal para servicios de higiene cubiertos y limitaciones de frecuencia, investigar la demografía de pacientes del FQHC, prepararse para pacientes de alta agudeza con atención postergada, y cambiar mentalmente de práctica privada enfocada en producción a salud comunitaria enfocada en acceso",
        score: 4,
        behaviorTag: "comprehensive-preparation",
      },
      {
        id: "rs_dh_t1_b",
        text: "Review Denti-Cal basics and read about the FQHC's mission and services to understand the culture shift from private practice",
        esText: "Revisar conceptos básicos de Denti-Cal y leer sobre la misión y servicios del FQHC para entender el cambio cultural de la práctica privada",
        score: 3,
        behaviorTag: "moderate-preparation",
      },
      {
        id: "rs_dh_t1_c",
        text: "Assume your clinical skills transfer directly and the main difference will be the patient population and pace",
        esText: "Asumir que tus habilidades clínicas se transfieren directamente y la principal diferencia será la población de pacientes y el ritmo",
        score: 2,
        behaviorTag: "assumption-based",
      },
      {
        id: "rs_dh_t1_d",
        text: "Feel anxious about the transition but don't take specific preparation steps beyond showing up ready to learn",
        esText: "Sentir ansiedad por la transición pero no tomar pasos de preparación específicos más allá de presentarse listo/a para aprender",
        score: 1,
        behaviorTag: "unprepared",
      },
    ],
  },

  // DH - Transition 2
  {
    id: "rs_dh_trans2",
    roleId: "dental_hygienist",
    domain: "transition",
    scenario:
      "In your first week at the new FQHC, you notice the hygiene recall program is poorly organized — patients are falling through the cracks and there's no systematic follow-up process.",
    esScenario:
      "En tu primera semana en el nuevo FQHC, notas que el programa de seguimiento de higiene está mal organizado — los pacientes se están cayendo por las grietas y no hay un proceso sistemático de seguimiento.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dh_t2_a",
        text: "Observe and document the current process for 2-3 weeks before suggesting changes. Then propose a structured recall system based on what you've learned works at other clinics, while being respectful of why things are done the way they are",
        esText: "Observar y documentar el proceso actual por 2-3 semanas antes de sugerir cambios. Luego proponer un sistema de seguimiento estructurado basado en lo que has aprendido que funciona en otras clínicas, siendo respetuoso de por qué las cosas se hacen de la manera que son",
        score: 4,
        behaviorTag: "observe-then-improve",
      },
      {
        id: "rs_dh_t2_b",
        text: "Ask the Dental Director about the recall system and share your experience with what worked at your previous practice",
        esText: "Preguntar al Director Dental sobre el sistema de seguimiento y compartir tu experiencia con lo que funcionó en tu práctica anterior",
        score: 3,
        behaviorTag: "dialogue-first",
      },
      {
        id: "rs_dh_t2_c",
        text: "Focus on your own patients' recall compliance and lead by example — the rest of the team will see your approach works",
        esText: "Enfocarte en el cumplimiento de seguimiento de tus propios pacientes y dar el ejemplo — el resto del equipo verá que tu enfoque funciona",
        score: 2,
        behaviorTag: "individual-focused",
      },
      {
        id: "rs_dh_t2_d",
        text: "Keep your observations to yourself — you're too new to suggest changes and it might come across as critical",
        esText: "Guardar tus observaciones para ti — eres demasiado nuevo/a para sugerir cambios y podría verse como crítica",
        score: 1,
        behaviorTag: "overly-deferential",
      },
    ],
  },

  // DH - Transition 3
  {
    id: "rs_dh_trans3",
    roleId: "dental_hygienist",
    domain: "transition",
    scenario:
      "You've been at your new FQHC for 3 weeks. The Dental Director asks you to evaluate whether the clinic should add a prenatal oral health program, which would require changes to your schedule and patient flow.",
    esScenario:
      "Has estado en tu nuevo FQHC por 3 semanas. El Director Dental te pide evaluar si la clínica debería agregar un programa de salud oral prenatal, lo cual requeriría cambios en tu horario y flujo de pacientes.",
    question: "How do you approach this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_dh_t3_a",
        text: "Research the evidence for prenatal oral health interventions, review Denti-Cal coverage for pregnant patients, assess the clinic's OB/prenatal referral pipeline, and present a structured recommendation with scheduling impact and revenue projections",
        esText: "Investigar la evidencia de intervenciones de salud oral prenatal, revisar la cobertura Denti-Cal para pacientes embarazadas, evaluar la cartera de referencias OB/prenatales de la clínica, y presentar una recomendación estructurada con impacto en programación y proyecciones de ingresos",
        score: 4,
        behaviorTag: "strategic-evaluator",
      },
      {
        id: "rs_dh_t3_b",
        text: "Share your knowledge of prenatal oral health and work with the Director to develop the program outline together",
        esText: "Compartir tu conocimiento de salud oral prenatal y trabajar con el Director para desarrollar el esquema del programa juntos",
        score: 3,
        behaviorTag: "collaborative-contributor",
      },
      {
        id: "rs_dh_t3_c",
        text: "Say you'll look into it but feel uncertain — you're still new and not sure you have enough context about the clinic's needs",
        esText: "Decir que lo investigarás pero sentirte inseguro/a — aún eres nuevo/a y no estás seguro/a de tener suficiente contexto sobre las necesidades de la clínica",
        score: 2,
        behaviorTag: "hesitant-new",
      },
      {
        id: "rs_dh_t3_d",
        text: "Suggest the Director ask someone more senior — you don't want to make recommendations when you're still learning the clinic",
        esText: "Sugerir que el Director pregunte a alguien más senior — no quieres hacer recomendaciones cuando aún estás aprendiendo la clínica",
        score: 1,
        behaviorTag: "defers-authority",
      },
    ],
  },

  /* ================================================================ */
  /*  DENTIST                                                         */
  /* ================================================================ */

  // Dentist - Mission 1
  {
    id: "rs_dentist_mission1",
    roleId: "dentist",
    domain: "mission",
    scenario:
      "You're reviewing a patient's treatment plan: extensive restorative work totaling $8,000. The patient has Denti-Cal which covers about 40% of the needed procedures. The patient has no ability to pay the remainder out-of-pocket.",
    esScenario:
      "Estás revisando el plan de tratamiento de un paciente: trabajo restaurativo extenso que totaliza $8,000. El paciente tiene Denti-Cal que cubre aproximadamente el 40% de los procedimientos necesarios. El paciente no tiene capacidad de pagar el resto de su bolsillo.",
    question: "How do you approach this treatment plan?",
    esQuestion: "Cómo abordas este plan de tratamiento?",
    options: [
      {
        id: "rs_dentist_m1_a",
        text: "Prioritize treatment into phases based on clinical urgency — address pain and infection first, then functional restoration, then elective procedures. Maximize Denti-Cal coverage for each phase, use the FQHC sliding fee scale, and spread treatment over multiple visits to make it manageable",
        esText: "Priorizar el tratamiento en fases basadas en urgencia clínica — abordar dolor e infección primero, luego restauración funcional, luego procedimientos electivos. Maximizar la cobertura Denti-Cal para cada fase, usar la escala de tarifas deslizantes del FQHC, y distribuir el tratamiento en múltiples visitas para hacerlo manejable",
        score: 4,
        behaviorTag: "equity-driven-clinician",
      },
      {
        id: "rs_dentist_m1_b",
        text: "Focus treatment on what Denti-Cal covers and make sure the patient understands which additional procedures are clinically necessary vs. elective",
        esText: "Enfocar el tratamiento en lo que Denti-Cal cubre y asegurarse de que el paciente entienda qué procedimientos adicionales son clínicamente necesarios vs. electivos",
        score: 3,
        behaviorTag: "practical-planner",
      },
      {
        id: "rs_dentist_m1_c",
        text: "Present the full treatment plan and let the patient decide what they can afford — it's their decision",
        esText: "Presentar el plan de tratamiento completo y dejar que el paciente decida lo que puede pagar — es su decisión",
        score: 2,
        behaviorTag: "patient-defers",
      },
      {
        id: "rs_dentist_m1_d",
        text: "Limit treatment to what Denti-Cal covers and move on to the next patient — there's only so much time in the day",
        esText: "Limitar el tratamiento a lo que Denti-Cal cubre y pasar al siguiente paciente — solo hay tanto tiempo en el día",
        score: 1,
        behaviorTag: "volume-driven",
      },
    ],
  },

  // Dentist - Mission 2
  {
    id: "rs_dentist_mission2",
    roleId: "dentist",
    domain: "mission",
    scenario:
      "Your FQHC serves a large undocumented immigrant population. With Medi-Cal coverage for undocumented adults now under threat from state budget cuts, some patients are asking if they should still come in for dental care.",
    esScenario:
      "Tu FQHC atiende a una gran población de inmigrantes indocumentados. Con la cobertura de Medi-Cal para adultos indocumentados ahora amenazada por recortes presupuestarios estatales, algunos pacientes preguntan si aún deberían venir para atención dental.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dentist_m2_a",
        text: "Assure them that FQHCs serve everyone regardless of ability to pay or insurance status — that's the legal mandate. Explain the sliding fee scale, connect them with a patient navigator for coverage questions, and emphasize that preventive dental care now prevents expensive emergency visits later",
        esText: "Asegurarles que los FQHCs atienden a todos independientemente de la capacidad de pago o estatus de seguro — ese es el mandato legal. Explicar la escala de tarifas deslizantes, conectarlos con un navegador de pacientes para preguntas de cobertura, y enfatizar que la atención dental preventiva ahora previene visitas de emergencia costosas después",
        score: 4,
        behaviorTag: "mission-champion",
      },
      {
        id: "rs_dentist_m2_b",
        text: "Tell them to keep coming in and that your FQHC will figure out the coverage situation — you don't want them to delay care",
        esText: "Decirles que sigan viniendo y que tu FQHC resolverá la situación de cobertura — no quieres que retrasen la atención",
        score: 3,
        behaviorTag: "reassuring",
      },
      {
        id: "rs_dentist_m2_c",
        text: "Refer them to the front desk to discuss insurance options and focus on providing care for today's appointment",
        esText: "Referirlos a recepción para discutir opciones de seguro y enfocarse en proporcionar atención para la cita de hoy",
        score: 2,
        behaviorTag: "referral-redirect",
      },
      {
        id: "rs_dentist_m2_d",
        text: "Explain that you're not sure what will happen with coverage and suggest they check back when things are clearer",
        esText: "Explicar que no estás seguro de que pasará con la cobertura y sugerir que vuelvan a consultar cuando las cosas estén más claras",
        score: 1,
        behaviorTag: "uncertainty-default",
      },
    ],
  },

  // Dentist - Mission 3
  {
    id: "rs_dentist_mission3",
    roleId: "dentist",
    domain: "mission",
    scenario:
      "The CEO asks you to present to the board on why the FQHC should expand dental services to a second location. Some board members see dental as a 'cost center' that loses money compared to medical services.",
    esScenario:
      "El CEO te pide que presentes a la junta sobre por qué el FQHC debería expandir los servicios dentales a una segunda ubicación. Algunos miembros de la junta ven lo dental como un 'centro de costos' que pierde dinero comparado con los servicios médicos.",
    question: "How do you make the case?",
    esQuestion: "Cómo presentas el argumento?",
    options: [
      {
        id: "rs_dentist_m3_a",
        text: "Present the full picture: each dental encounter generates a PPS payment ($100-200+), dental is the #1 unmet need in FQHC communities, oral health integration improves chronic disease outcomes (reducing medical costs), and HRSA scope-of-service expansion strengthens the grant application. Include patient stories alongside the numbers",
        esText: "Presentar el panorama completo: cada encuentro dental genera un pago PPS ($100-200+), dental es la necesidad #1 no satisfecha en comunidades de FQHC, la integración de salud oral mejora resultados de enfermedades crónicas (reduciendo costos médicos), y la expansión del alcance de servicios HRSA fortalece la solicitud de subvención. Incluir historias de pacientes junto con los números",
        score: 4,
        behaviorTag: "strategic-advocate",
      },
      {
        id: "rs_dentist_m3_b",
        text: "Focus on the revenue case: PPS payments per encounter, patient demand data, and the cost of turning away dental patients who then use the ER",
        esText: "Enfocarse en el caso de ingresos: pagos PPS por encuentro, datos de demanda de pacientes, y el costo de rechazar pacientes dentales que luego usan la sala de emergencias",
        score: 3,
        behaviorTag: "revenue-focused",
      },
      {
        id: "rs_dentist_m3_c",
        text: "Emphasize the community need and patient demand — the mission of the FQHC should be reason enough",
        esText: "Enfatizar la necesidad comunitaria y demanda de pacientes — la misión del FQHC debería ser razón suficiente",
        score: 2,
        behaviorTag: "mission-only",
      },
      {
        id: "rs_dentist_m3_d",
        text: "Prepare a basic overview and hope the board sees the value — you're not comfortable making business cases",
        esText: "Preparar un resumen básico y esperar que la junta vea el valor — no te sientes cómodo haciendo casos de negocio",
        score: 1,
        behaviorTag: "unprepared-presenter",
      },
    ],
  },

  // Dentist - People 1
  {
    id: "rs_dentist_people1",
    roleId: "dentist",
    domain: "people",
    scenario:
      "Your lead dental hygienist approaches you with data showing that her recall compliance rate is 30% higher than the other two hygienists. She wants formal recognition and feels her colleagues aren't pulling their weight.",
    esScenario:
      "Tu higienista dental líder se acerca con datos mostrando que su tasa de cumplimiento de seguimiento es 30% más alta que las otras dos higienistas. Quiere reconocimiento formal y siente que sus colegas no están haciendo su parte.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dentist_p1_a",
        text: "Acknowledge her excellent work specifically. Then look at the data holistically — is the gap about skill, patient mix, scheduling differences, or front-desk support? Create an opportunity for her to mentor the other hygienists rather than creating competition. Team performance matters more than individual stats",
        esText: "Reconocer su excelente trabajo específicamente. Luego mirar los datos holísticamente — es la brecha sobre habilidad, mezcla de pacientes, diferencias de programación o apoyo de recepción? Crear una oportunidad para que ella sea mentora de las otras higienistas en lugar de crear competencia. El rendimiento del equipo importa más que las estadísticas individuales",
        score: 4,
        behaviorTag: "team-builder-leader",
      },
      {
        id: "rs_dentist_p1_b",
        text: "Thank her for the strong performance and review the other hygienists' numbers to understand the gap before taking any action",
        esText: "Agradecerle por el fuerte rendimiento y revisar los números de las otras higienistas para entender la brecha antes de tomar cualquier acción",
        score: 3,
        behaviorTag: "data-first-manager",
      },
      {
        id: "rs_dentist_p1_c",
        text: "Praise her work and talk to the other hygienists about improving their recall rates",
        esText: "Elogiar su trabajo y hablar con las otras higienistas sobre mejorar sus tasas de seguimiento",
        score: 2,
        behaviorTag: "direct-correction",
      },
      {
        id: "rs_dentist_p1_d",
        text: "Tell her that everyone's doing their best and metrics aren't everything — you don't want to create tension on the team",
        esText: "Decirle que todos están haciendo lo mejor que pueden y las métricas no lo son todo — no quieres crear tensión en el equipo",
        score: 1,
        behaviorTag: "conflict-avoidant",
      },
    ],
  },

  // Dentist - People 2
  {
    id: "rs_dentist_people2",
    roleId: "dentist",
    domain: "people",
    scenario:
      "A patient with severe dental anxiety tells you they had a traumatic experience at another dental office as a child. They're shaking in the chair and can barely open their mouth for the exam.",
    esScenario:
      "Un paciente con ansiedad dental severa te dice que tuvo una experiencia traumática en otro consultorio dental cuando era niño. Está temblando en la silla y apenas puede abrir la boca para el examen.",
    question: "How do you proceed?",
    esQuestion: "Cómo procedes?",
    options: [
      {
        id: "rs_dentist_p2_a",
        text: "Stop the exam. Sit at eye level, acknowledge their courage in coming today, and establish a stop signal they can use at any time. Offer options: shorter appointment focused only on assessment, nitrous oxide, or referral for sedation if needed. Build trust before building a treatment plan",
        esText: "Detener el examen. Sentarse a nivel de los ojos, reconocer su valentía al venir hoy, y establecer una señal de parada que puedan usar en cualquier momento. Ofrecer opciones: cita más corta enfocada solo en evaluación, óxido nitroso, o referencia para sedación si es necesario. Construir confianza antes de construir un plan de tratamiento",
        score: 4,
        behaviorTag: "trauma-informed-provider",
      },
      {
        id: "rs_dentist_p2_b",
        text: "Slow down, explain each step before doing it, offer frequent breaks, and do only what the patient is comfortable with today",
        esText: "Bajar la velocidad, explicar cada paso antes de hacerlo, ofrecer descansos frecuentes, y hacer solo lo que el paciente esté cómodo con hoy",
        score: 3,
        behaviorTag: "patient-paced",
      },
      {
        id: "rs_dentist_p2_c",
        text: "Offer nitrous oxide or local anesthesia to help them relax and proceed with the exam as gently as possible",
        esText: "Ofrecer óxido nitroso o anestesia local para ayudarlos a relajarse y proceder con el examen lo más suavemente posible",
        score: 2,
        behaviorTag: "pharmacological-first",
      },
      {
        id: "rs_dentist_p2_d",
        text: "Encourage them to try to relax and get through the exam — the sooner it's done, the sooner the anxiety is over",
        esText: "Animarlos a tratar de relajarse y pasar el examen — entre más rápido termine, más rápido se acaba la ansiedad",
        score: 1,
        behaviorTag: "push-through",
      },
    ],
  },

  // Dentist - People 3
  {
    id: "rs_dentist_people3",
    roleId: "dentist",
    domain: "people",
    scenario:
      "You're the only dentist at a 3-operatory FQHC dental clinic. Your team (2 DAs, 1 hygienist, 1 front desk) is burning out from the patient volume. The CEO says hiring another dentist isn't in the budget this year.",
    esScenario:
      "Eres el único dentista en una clínica dental de FQHC de 3 consultorios. Tu equipo (2 DAs, 1 higienista, 1 recepción) está agotándose por el volumen de pacientes. El CEO dice que contratar otro dentista no está en el presupuesto este año.",
    question: "How do you manage your team?",
    esQuestion: "Cómo gestiónas tu equipo?",
    options: [
      {
        id: "rs_dentist_p3_a",
        text: "Have an honest team conversation about workload, implement schedule adjustments (protected lunch, no-add-on blocks), maximize delegation to the hygienist under general supervision, cross-train DAs for expanded duties, and present data to the CEO showing revenue loss from staff turnover vs. cost of a part-time dentist",
        esText: "Tener una conversación honesta del equipo sobre carga de trabajo, implementar ajustes de horario (almuerzo protegido, bloques sin adiciones), maximizar delegación a la higienista bajo supervisión general, capacitar DAs para deberes ampliados, y presentar datos al CEO mostrando pérdida de ingresos por rotación de personal vs. costo de un dentista a medio tiempo",
        score: 4,
        behaviorTag: "team-protector-advocate",
      },
      {
        id: "rs_dentist_p3_b",
        text: "Adjust the schedule to reduce daily patient volume slightly and have regular check-ins with each team member about their workload",
        esText: "Ajustar el horario para reducir ligeramente el volumen diario de pacientes y tener reuniones regulares con cada miembro del equipo sobre su carga de trabajo",
        score: 3,
        behaviorTag: "accommodation-focused",
      },
      {
        id: "rs_dentist_p3_c",
        text: "Push through — it's temporary and the team needs to be resilient during tough budget times",
        esText: "Seguir adelante — es temporal y el equipo necesita ser resiliente durante tiempos difíciles de presupuesto",
        score: 2,
        behaviorTag: "grind-mentality",
      },
      {
        id: "rs_dentist_p3_d",
        text: "Accept the situation and hope no one quits — there's not much you can do without budget approval",
        esText: "Aceptar la situación y esperar que nadie renuncie — no hay mucho que puedas hacer sin aprobación de presupuesto",
        score: 1,
        behaviorTag: "helpless-acceptance",
      },
    ],
  },

  // Dentist - Execution 1
  {
    id: "rs_dentist_exec1",
    roleId: "dentist",
    domain: "execution",
    scenario:
      "Your Denti-Cal claim denial rate has increased from 5% to 15% over the past quarter. The billing team says the most common reason is 'insufficient clinical documentation' for procedures you've performed.",
    esScenario:
      "Tu tasa de denegación de reclamos Denti-Cal ha aumentado del 5% al 15% en el último trimestre. El equipo de facturación dice que la razón más común es 'documentación clínica insuficiente' para procedimientos que has realizado.",
    question: "How do you address this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_dentist_e1_a",
        text: "Audit your own denied claims to identify specific documentation gaps, update your charting templates to include all Denti-Cal required elements, schedule a working session with the billing team to align clinical documentation with billing requirements, and track the denial rate monthly",
        esText: "Auditar tus propios reclamos denegados para identificar brechas específicas de documentación, actualizar tus plantillas de charting para incluir todos los elementos requeridos por Denti-Cal, programar una sesión de trabajo con el equipo de facturación para alinear la documentación clínica con los requisitos de facturación, y rastrear la tasa de denegación mensualmente",
        score: 4,
        behaviorTag: "self-auditing-improver",
      },
      {
        id: "rs_dentist_e1_b",
        text: "Ask the billing team to send you examples of denied claims so you can see what's missing and adjust your documentation",
        esText: "Pedir al equipo de facturación que te envíe ejemplos de reclamos denegados para que puedas ver qué falta y ajustar tu documentación",
        score: 3,
        behaviorTag: "responsive-learner",
      },
      {
        id: "rs_dentist_e1_c",
        text: "Spend a few extra minutes on documentation for each patient and hope the denial rate improves",
        esText: "Pasar unos minutos extra en documentación para cada paciente y esperar que la tasa de denegación mejore",
        score: 2,
        behaviorTag: "vague-effort",
      },
      {
        id: "rs_dentist_e1_d",
        text: "Blame Denti-Cal's overly strict documentation requirements — the claims are clinically justified even if the paperwork doesn't satisfy their bureaucratic standards",
        esText: "Culpar los requisitos de documentación excesivamente estrictos de Denti-Cal — los reclamos están clínicamente justificados aunque el papeleo no satisfaga sus estándares burocráticos",
        score: 1,
        behaviorTag: "externally-blaming",
      },
    ],
  },

  // Dentist - Execution 2
  {
    id: "rs_dentist_exec2",
    roleId: "dentist",
    domain: "execution",
    scenario:
      "A patient presents with a dental emergency — severe toothache from a cracked molar with pulpal involvement. They need a root canal, but your FQHC doesn't have an endodontist and the nearest referral has a 6-week wait.",
    esScenario:
      "Un paciente se presenta con una emergencia dental — dolor de muelas severo por un molar fracturado con compromiso pulpar. Necesitan un tratamiento de conducto, pero tu FQHC no tiene endodoncista y la referencia más cercana tiene 6 semanas de espera.",
    question: "How do you manage this case?",
    esQuestion: "Cómo manejas este caso?",
    options: [
      {
        id: "rs_dentist_e2_a",
        text: "Provide same-day palliative care (pulpotomy, pain management, antibiotics if infected), initiate the referral, and consider whether you can perform the root canal yourself if it's within your competence. For a single-rooted or straightforward case, many FQHC dentists handle these in-house to avoid the 6-week delay",
        esText: "Proporcionar atención paliativa el mismo día (pulpotomía, manejo del dolor, antibióticos si hay infección), iniciar la referencia, y considerar si puedes realizar el tratamiento de conducto tu mismo si está dentro de tu competencia. Para un caso de raíz única o sencillo, muchos dentistas de FQHC los manejan internamente para evitar la demora de 6 semanas",
        score: 4,
        behaviorTag: "resourceful-clinician",
      },
      {
        id: "rs_dentist_e2_b",
        text: "Provide pain relief and palliative care today, place the referral to the endodontist, and schedule a follow-up to manage the patient until they can be seen",
        esText: "Proporcionar alivio del dolor y atención paliativa hoy, colocar la referencia al endodoncista, y programar un seguimiento para manejar al paciente hasta que puedan ser atendidos",
        score: 3,
        behaviorTag: "standard-protocol",
      },
      {
        id: "rs_dentist_e2_c",
        text: "Prescribe pain medication and antibiotics, refer to the endodontist, and tell the patient to go to the ER if the pain becomes unbearable before their appointment",
        esText: "Recetar medicación para el dolor y antibióticos, referir al endodoncista, y decirle al paciente que vaya a urgencias si el dolor se vuelve insoportable antes de su cita",
        score: 2,
        behaviorTag: "refer-and-defer",
      },
      {
        id: "rs_dentist_e2_d",
        text: "Extract the tooth as the simplest solution — it resolves the pain immediately and avoids the referral wait",
        esText: "Extraer el diente como la solución más simple — resuelve el dolor inmediatamente y evita la espera de referencia",
        score: 1,
        behaviorTag: "extraction-default",
      },
    ],
  },

  // Dentist - Execution 3
  {
    id: "rs_dentist_exec3",
    roleId: "dentist",
    domain: "execution",
    scenario:
      "You discover that your FQHC isn't billing for same-day medical-dental encounters. When a dental patient also sees a medical provider the same day, only one PPS encounter is being billed. The FQHC PPS rules actually allow billing for both.",
    esScenario:
      "Descubres que tu FQHC no está facturando por encuentros médico-dentales del mismo día. Cuando un paciente dental también ve a un proveedor médico el mismo día, solo se está facturando un encuentro PPS. Las reglas PPS de FQHC en realidad permiten facturar por ambos.",
    question: "What do you do?",
    esQuestion: "Qué haces?",
    options: [
      {
        id: "rs_dentist_e3_a",
        text: "Document the billing gap with data — how many same-day encounters are being missed and the estimated lost revenue. Present findings to the billing team and CFO with the HRSA/CMS regulation that allows same-day billing. Implement a workflow for dental-medical warm handoffs that captures both encounters",
        esText: "Documentar la brecha de facturación con datos — cuántos encuentros del mismo día se están perdiendo y los ingresos perdidos estimados. Presentar hallazgos al equipo de facturación y CFO con la regulación de HRSA/CMS que permite facturación del mismo día. Implementar un flujo de trabajo para transferencias cálidas dental-médicas que capture ambos encuentros",
        score: 4,
        behaviorTag: "revenue-recovery-leader",
      },
      {
        id: "rs_dentist_e3_b",
        text: "Notify the billing team about the issue and share the relevant billing guidelines so they can update their process",
        esText: "Notificar al equipo de facturación sobre el problema y compartir las guías de facturación relevantes para que puedan actualizar su proceso",
        score: 3,
        behaviorTag: "informer",
      },
      {
        id: "rs_dentist_e3_c",
        text: "Mention it to the office manager and trust that they'll handle the billing change",
        esText: "Mencionarlo al gerente de oficina y confiar en que ellos manejarán el cambio de facturación",
        score: 2,
        behaviorTag: "hands-off-reporter",
      },
      {
        id: "rs_dentist_e3_d",
        text: "Focus on clinical care and leave billing issues to the billing department — that's not your responsibility",
        esText: "Enfocarse en la atención clínica y dejar los problemas de facturación al departamento de facturación — eso no es tu responsabilidad",
        score: 1,
        behaviorTag: "clinician-only-mindset",
      },
    ],
  },

  // Dentist - Growth 1
  {
    id: "rs_dentist_growth1",
    roleId: "dentist",
    domain: "growth",
    scenario:
      "Your FQHC is considering adding a residency teaching component to the dental program (a Dental Teaching Health Center). This would bring in federal GME funding and residents, but also mean significant time spent supervising and teaching.",
    esScenario:
      "Tu FQHC está considerando agregar un componente de enseñanza de residencia al programa dental (un Centro de Salud de Enseñanza Dental). Esto traería financiamiento federal GME y residentes, pero también significaría tiempo significativo dedicado a supervisar y enseñar.",
    question: "How interested are you?",
    esQuestion: "Qué tan interesado/a estás?",
    options: [
      {
        id: "rs_dentist_g1_a",
        text: "Very interested — Teaching Health Centers bring federal funding, attract new talent to FQHC dentistry, and strengthen clinical quality through academic rigor. I'd research THCGME program requirements and draft a proposal for the CEO",
        esText: "Muy interesado/a — los Centros de Salud de Enseñanza traen financiamiento federal, atraen nuevo talento a la odontología de FQHC, y fortalecen la calidad clínica a través del rigor académico. Investigaría los requisitos del programa THCGME y redactaría una propuesta para el CEO",
        score: 4,
        behaviorTag: "academic-leader",
      },
      {
        id: "rs_dentist_g1_b",
        text: "Interested but want to understand the time commitment and how it would affect patient volume before committing",
        esText: "Interesado/a pero quiero entender el compromiso de tiempo y cómo afectaría el volumen de pacientes antes de comprometerme",
        score: 3,
        behaviorTag: "cautiously-interested",
      },
      {
        id: "rs_dentist_g1_c",
        text: "Open to it in theory but concerned about the administrative burden on top of clinical responsibilities",
        esText: "Abierto/a en teoría pero preocupado/a por la carga administrativa además de las responsabilidades clínicas",
        score: 2,
        behaviorTag: "burden-concerned",
      },
      {
        id: "rs_dentist_g1_d",
        text: "Not interested — I became a dentist to treat patients, not to teach residents",
        esText: "No interesado/a — me hice dentista para tratar pacientes, no para enseñar residentes",
        score: 1,
        behaviorTag: "clinical-only",
      },
    ],
  },

  // Dentist - Growth 2
  {
    id: "rs_dentist_growth2",
    roleId: "dentist",
    domain: "growth",
    scenario:
      "An AI ambient documentation tool (like Abridge or Sunoh) is being piloted at your FQHC. It records patient encounters and auto-generates clinical notes. Some dentists at other FQHCs report saving 1-2 hours per day on documentation.",
    esScenario:
      "Una herramienta de documentación ambiental de IA (como Abridge o Sunoh) está siendo piloteada en tu FQHC. Graba encuentros con pacientes y auto-genera notas clínicas. Algunos dentistas en otros FQHCs reportan ahorrar 1-2 horas por día en documentación.",
    question: "How do you approach this?",
    esQuestion: "Cómo abordas esto?",
    options: [
      {
        id: "rs_dentist_g2_a",
        text: "Volunteer for the pilot — 1-2 hours saved per day on documentation means more patients served or better work-life balance. Review the AI-generated notes carefully at first, provide feedback to improve accuracy, and share your experience with the team to accelerate adoption",
        esText: "Ser voluntario para el piloto — 1-2 horas ahorradas por día en documentación significan más pacientes atendidos o mejor equilibrio trabajo-vida. Revisar las notas generadas por IA cuidadosamente al principio, proporcionar retroalimentación para mejorar la precisión, y compartir tu experiencia con el equipo para acelerar la adopción",
        score: 4,
        behaviorTag: "technology-champion",
      },
      {
        id: "rs_dentist_g2_b",
        text: "Try it with a few patients and see if the notes are accurate enough to be useful before committing fully",
        esText: "Probarlo con algunos pacientes y ver si las notas son lo suficientemente precisas para ser útiles antes de comprometerte completamente",
        score: 3,
        behaviorTag: "cautious-adopter",
      },
      {
        id: "rs_dentist_g2_c",
        text: "Wait for others to try it first and see their results — you don't want to be the guinea pig for new technology",
        esText: "Esperar a que otros lo prueben primero y ver sus resultados — no quieres ser el conejillo de indias para nueva tecnología",
        score: 2,
        behaviorTag: "late-adopter",
      },
      {
        id: "rs_dentist_g2_d",
        text: "Decline — you prefer to write your own notes and don't trust AI to document clinical care accurately",
        esText: "Declinar — prefieres escribir tus propias notas y no confías en que la IA documente la atención clínica con precisión",
        score: 1,
        behaviorTag: "technology-resistant",
      },
    ],
  },

  // Dentist - Growth 3
  {
    id: "rs_dentist_growth3",
    roleId: "dentist",
    domain: "growth",
    scenario:
      "You've been a staff dentist at your FQHC for 3 years. The Dental Director is retiring next year and the CEO asks if you'd be interested in the leadership role. It means less clinical time and more administrative/management responsibility.",
    esScenario:
      "Has sido dentista de planta en tu FQHC por 3 años. El Director Dental se retira el próximo año y el CEO pregunta si estarías interesado/a en el rol de liderazgo. Significa menos tiempo clínico y más responsabilidad administrativa/de gestión.",
    question: "How do you respond?",
    esQuestion: "Cómo respondes?",
    options: [
      {
        id: "rs_dentist_g3_a",
        text: "Express strong interest and ask about transition planning — shadow the current Director, learn budget management and HRSA compliance, and develop a vision for the dental program. Leadership means you can shape the program to serve more patients more effectively",
        esText: "Expresar fuerte interés y preguntar sobre planificación de transición — acompañar al Director actual, aprender gestión de presupuesto y cumplimiento HRSA, y desarrollar una visión para el programa dental. El liderazgo significa que puedes moldear el programa para atender a más pacientes más efectivamente",
        score: 4,
        behaviorTag: "leadership-ready",
      },
      {
        id: "rs_dentist_g3_b",
        text: "Express interest and ask to learn more about the role's balance of clinical vs. administrative time before deciding",
        esText: "Expresar interés y pedir aprender más sobre el equilibrio del rol entre tiempo clínico y administrativo antes de decidir",
        score: 3,
        behaviorTag: "thoughtful-consideration",
      },
      {
        id: "rs_dentist_g3_c",
        text: "Hesitate — you enjoy clinical work and worry about losing that if you take on leadership",
        esText: "Dudar — disfrutas el trabajo clínico y te preocupa perder eso si asumes el liderazgo",
        score: 2,
        behaviorTag: "clinical-attachment",
      },
      {
        id: "rs_dentist_g3_d",
        text: "Decline — you became a dentist to treat patients, not to manage budgets and attend board meetings",
        esText: "Declinar — te hiciste dentista para tratar pacientes, no para gestionar presupuestos y asistir a reuniones de junta",
        score: 1,
        behaviorTag: "leadership-averse",
      },
    ],
  },

  // Dentist - Transition 1
  {
    id: "rs_dentist_trans1",
    roleId: "dentist",
    domain: "transition",
    scenario:
      "You've accepted a position as a staff dentist at an FQHC after 5 years in private practice. You start in 3 weeks. You've never worked in a community health center before.",
    esScenario:
      "Has aceptado un puesto como dentista de planta en un FQHC después de 5 años en práctica privada. Empiezas en 3 semanas. Nunca has trabajado en un centro de salud comunitario antes.",
    question: "How do you prepare?",
    esQuestion: "Cómo te preparas?",
    options: [
      {
        id: "rs_dentist_t1_a",
        text: "Study the FQHC PPS billing model (encounter-based, not fee-for-service), review the Denti-Cal provider manual for covered services and documentation requirements, research the patient population demographics, and mentally prepare for the clinical shift — high-volume, high-acuity, deferred care, Denti-Cal limitations",
        esText: "Estudiar el modelo de facturación PPS de FQHC (basado en encuentros, no pago por servicio), revisar el manual de proveedor Denti-Cal para servicios cubiertos y requisitos de documentación, investigar la demografía de la población de pacientes, y prepararse mentalmente para el cambio clínico — alto volumen, alta agudeza, atención postergada, limitaciones de Denti-Cal",
        score: 4,
        behaviorTag: "comprehensively-prepared",
      },
      {
        id: "rs_dentist_t1_b",
        text: "Review basic FQHC billing concepts and Denti-Cal guidelines, and read about the organization's mission and programs",
        esText: "Revisar conceptos básicos de facturación FQHC y guías de Denti-Cal, y leer sobre la misión y programas de la organización",
        score: 3,
        behaviorTag: "moderately-prepared",
      },
      {
        id: "rs_dentist_t1_c",
        text: "Trust your clinical skills — dentistry is dentistry whether it's private practice or an FQHC. Focus on learning the specific systems when you arrive",
        esText: "Confiar en tus habilidades clínicas — la odontología es odontología ya sea práctica privada o un FQHC. Enfocarte en aprender los sistemas específicos cuando llegues",
        score: 2,
        behaviorTag: "overconfident",
      },
      {
        id: "rs_dentist_t1_d",
        text: "Feel nervous about the transition but don't take specific preparation steps beyond reviewing the offer letter details",
        esText: "Sentirte nervioso por la transición pero no tomar pasos de preparación específicos más allá de revisar los detalles de la carta de oferta",
        score: 1,
        behaviorTag: "unprepared-anxious",
      },
    ],
  },

  // Dentist - Transition 2
  {
    id: "rs_dentist_trans2",
    roleId: "dentist",
    domain: "transition",
    scenario:
      "In your first week at the FQHC, you realize the clinical protocols are different from what you practiced in private. The patient volume is higher, the cases are more complex (years of deferred care), and Denti-Cal coverage limitations mean you can't do everything you'd ideally want to for each patient.",
    esScenario:
      "En tu primera semana en el FQHC, te das cuenta de que los protocolos clínicos son diferentes de lo que practicabas en privado. El volumen de pacientes es más alto, los casos son más complejos (anos de atención postergada), y las limitaciones de cobertura Denti-Cal significan que no puedes hacer todo lo que idealmente querrías para cada paciente.",
    question: "How do you adjust?",
    esQuestion: "Cómo te ajustas?",
    options: [
      {
        id: "rs_dentist_t2_a",
        text: "Accept that FQHC dentistry requires a different mindset — you're optimizing access and outcomes for a population, not perfection for individual patients. Learn to triage effectively, create phased treatment plans within Denti-Cal constraints, and find the balance between clinical idealism and practical impact",
        esText: "Aceptar que la odontología de FQHC requiere una mentalidad diferente — estás optimizando acceso y resultados para una población, no perfección para pacientes individuales. Aprender a clasificar efectivamente, crear planes de tratamiento por fases dentro de las restricciones de Denti-Cal, y encontrar el equilibrio entre idealismo clínico e impacto práctico",
        score: 4,
        behaviorTag: "population-health-mindset",
      },
      {
        id: "rs_dentist_t2_b",
        text: "Focus on learning the Denti-Cal system and adapting your treatment planning to work within the constraints while maintaining clinical quality",
        esText: "Enfocarte en aprender el sistema Denti-Cal y adaptar tu planificación de tratamiento para trabajar dentro de las restricciones mientras mantienes calidad clínica",
        score: 3,
        behaviorTag: "system-adapter",
      },
      {
        id: "rs_dentist_t2_c",
        text: "Try to maintain your private practice standards and accept that you'll see fewer patients per day as a result",
        esText: "Intentar mantener tus estándares de práctica privada y aceptar que verás menos pacientes por día como resultado",
        score: 2,
        behaviorTag: "standard-rigid",
      },
      {
        id: "rs_dentist_t2_d",
        text: "Feel frustrated that you can't provide the level of care you're used to and question whether FQHC dentistry was the right career move",
        esText: "Sentirte frustrado de que no puedes proporcionar el nivel de atención al que estás acostumbrado y cuestionar si la odontología de FQHC fue la decisión profesional correcta",
        score: 1,
        behaviorTag: "disillusioned",
      },
    ],
  },

  // Dentist - Transition 3
  {
    id: "rs_dentist_trans3",
    roleId: "dentist",
    domain: "transition",
    scenario:
      "After one month at the FQHC, the Dental Director asks you to lead a lunchtime case presentation for the full dental team. You've never presented clinical cases in a group setting at your previous practice.",
    esScenario:
      "Después de un mes en el FQHC, el Director Dental te pide que lideres una presentación de casos a la hora del almuerzo para todo el equipo dental. Nunca has presentado casos clínicos en un entorno grupal en tu práctica anterior.",
    question: "How do you handle this?",
    esQuestion: "Cómo manejas esto?",
    options: [
      {
        id: "rs_dentist_t3_a",
        text: "Accept — select an interesting case from your first month that illustrates a clinical decision point relevant to the whole team (Denti-Cal coverage limits, phased treatment planning, oral-systemic referral). Use it as an opportunity to learn from colleagues' experience while sharing your own clinical reasoning",
        esText: "Aceptar — seleccionar un caso interesante de tu primer mes que ilustre un punto de decisión clínica relevante para todo el equipo (límites de cobertura Denti-Cal, planificación de tratamiento por fases, referencia oral-sistémica). Usarlo como oportunidad para aprender de la experiencia de los colegas mientras compartes tu propio razonamiento clínico",
        score: 4,
        behaviorTag: "growth-through-teaching",
      },
      {
        id: "rs_dentist_t3_b",
        text: "Accept and prepare a straightforward case with clear learning points — it's a good opportunity even if you're nervous",
        esText: "Aceptar y preparar un caso sencillo con puntos de aprendizaje claros — es una buena oportunidad aunque estés nervioso/a",
        score: 3,
        behaviorTag: "willing-nervous",
      },
      {
        id: "rs_dentist_t3_c",
        text: "Ask if you can present next month instead — you'd like more time to get comfortable with the team and patient population first",
        esText: "Preguntar si puedes presentar el próximo mes — te gustaría más tiempo para sentirte cómodo/a con el equipo y la población de pacientes primero",
        score: 2,
        behaviorTag: "delay-comfort",
      },
      {
        id: "rs_dentist_t3_d",
        text: "Decline — you're still new and don't feel qualified to present cases to a team that knows this patient population better than you do",
        esText: "Declinar — aún eres nuevo/a y no te sientes calificado/a para presentar casos a un equipo que conoce esta población de pacientes mejor que tu",
        score: 1,
        behaviorTag: "imposter-syndrome",
      },
    ],
  },
];
