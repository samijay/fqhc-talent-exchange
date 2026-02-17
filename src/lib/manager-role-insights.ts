/* ------------------------------------------------------------------ */
/*  Manager Role Insights                                              */
/*  Strength/growth messages, next steps for 4 leadership roles        */
/*  Follows pattern from role-insights.ts (candidate version)          */
/* ------------------------------------------------------------------ */

import type { DomainId } from "./career-assessment-engine";
import type { LeadershipRoleId } from "./manager-assessment-engine";

export const MANAGER_ROLE_INSIGHTS: Record<LeadershipRoleId, {
  strengthMessages: Record<DomainId, string>;
  esStrengthMessages: Record<DomainId, string>;
  growthMessages: Record<DomainId, string>;
  esGrowthMessages: Record<DomainId, string>;
  nextSteps: Record<DomainId, string>;
  esNextSteps: Record<DomainId, string>;
  employerWants: {
    topQualifications: string[];
    esTopQualifications: string[];
    topSkills: string[];
    esTopSkills: string[];
    certifications: string[];
    esCertifications: string[];
  };
}> = {

  /* ================================================================ */
  /*  Program Manager                                                  */
  /* ================================================================ */
  program_manager: {
    strengthMessages: {
      mission: "Your ability to connect program outcomes back to patient impact is what separates great FQHC program managers from administrators who just track metrics. Teams led by mission-driven PMs have 25% lower turnover — your team knows you care about the 'why,' not just the 'what.'",
      people: "Your strength in building trust across disciplines is critical for program success. The best ECM and CalAIM programs run on cross-functional relationships — and your ability to resolve conflict and keep CHWs, clinicians, and admin staff aligned is the glue that holds it together.",
      execution: "Your systematic approach to program management means your team can count on clear processes and reliable follow-through. In an FQHC environment where programs change quarterly, having a PM who maintains order amid chaos is worth their weight in gold.",
      growth: "Your investment in growing your team's capabilities creates a multiplier effect — every skill you build in one staff member radiates to the rest of the program. Program managers who develop their teams see 40% better program outcomes within the first year.",
      transition: "Your ability to quickly assess a new program situation, identify what's working and what's not, and create structure for your team shows exceptional leadership maturity. The best FQHC program managers inherit messy situations and turn them into models within 90 days.",
    },
    esStrengthMessages: {
      mission: "Tu capacidad para conectar los resultados del programa con el impacto en los pacientes es lo que separa a los grandes gerentes de programa de FQHC de los administradores que solo rastrean metricas. Los equipos liderados por PMs motivados por la mision tienen 25% menos rotacion — tu equipo sabe que te importa el 'por que,' no solo el 'que.'",
      people: "Tu fortaleza en construir confianza entre disciplinas es critica para el exito del programa. Los mejores programas de ECM y CalAIM funcionan gracias a relaciones multifuncionales — y tu capacidad para resolver conflictos y mantener alineados a CHWs, clinicos y personal administrativo es el pegamento que lo mantiene unido.",
      execution: "Tu enfoque sistematico en la gestion de programas significa que tu equipo puede contar con procesos claros y seguimiento confiable. En un entorno de FQHC donde los programas cambian trimestralmente, tener un PM que mantenga el orden en medio del caos vale su peso en oro.",
      growth: "Tu inversion en desarrollar las capacidades de tu equipo crea un efecto multiplicador — cada habilidad que construyes en un miembro del personal irradia al resto del programa. Los gerentes de programa que desarrollan a sus equipos ven resultados 40% mejores dentro del primer ano.",
      transition: "Tu capacidad para evaluar rapidamente una nueva situacion de programa, identificar que funciona y que no, y crear estructura para tu equipo muestra una madurez de liderazgo excepcional. Los mejores gerentes de programa de FQHC heredan situaciones desordenadas y las convierten en modelos en 90 dias.",
    },
    growthMessages: {
      mission: "Reconnecting your team to the patient impact of their work can transform morale. Consider starting team meetings with a brief patient story or outcome win — it takes 2 minutes and reminds everyone why the spreadsheets and compliance paperwork matter.",
      people: "Building your conflict resolution skills will pay dividends across every program you manage. Consider facilitating structured team retrospectives monthly — even 30 minutes of honest dialogue prevents the small frustrations that become team-splitting resentments.",
      execution: "Creating clearer program dashboards and tracking systems will reduce the 'firefighting' mode that burns out both you and your staff. Invest one afternoon in building a simple visual tracker your team can reference daily — clarity is the antidote to overwhelm.",
      growth: "Scheduling regular 1:1 development conversations with each team member (not just performance reviews) signals that you're invested in their growth. Many FQHC program staff leave because no one ever asked what they wanted to learn next.",
      transition: "When inheriting or launching a program, resist the urge to change everything immediately. Spend your first 30 days diagnosing the situation — shadow your team, map the workflows, identify the 3 things that must change vs. the 10 things that can wait.",
    },
    esGrowthMessages: {
      mission: "Reconectar a tu equipo con el impacto en los pacientes de su trabajo puede transformar la moral. Considera comenzar reuniones de equipo con una breve historia de paciente o logro — toma 2 minutos y recuerda a todos por que importan las hojas de calculo y el papeleo de cumplimiento.",
      people: "Desarrollar tus habilidades de resolucion de conflictos rendira dividendos en cada programa que gestiones. Considera facilitar retrospectivas de equipo estructuradas mensualmente — incluso 30 minutos de dialogo honesto previene las pequenas frustraciones que se convierten en resentimientos que dividen al equipo.",
      execution: "Crear paneles de control de programa mas claros y sistemas de seguimiento reducira el modo de 'apagar incendios' que agota tanto a ti como a tu personal. Invierte una tarde en construir un rastreador visual simple que tu equipo pueda consultar diariamente — la claridad es el antidoto contra el agobio.",
      growth: "Programar conversaciones regulares de desarrollo 1:1 con cada miembro del equipo (no solo evaluaciones de rendimiento) senala que estas invertido en su crecimiento. Muchos empleados de programas FQHC se van porque nadie les pregunto que querian aprender despues.",
      transition: "Cuando heredes o lances un programa, resiste el impulso de cambiar todo inmediatamente. Dedica tus primeros 30 dias a diagnosticar la situacion — acompana a tu equipo, mapea los flujos de trabajo, identifica las 3 cosas que deben cambiar vs. las 10 que pueden esperar.",
    },
    nextSteps: {
      mission: "Lead a team visioning session using '15% Solutions' — ask each staff member what they can do within their authority to better serve patients this month",
      people: "Implement structured monthly 1:1s with each team member using a consistent agenda (wins, challenges, development, priorities) to build trust and catch issues early",
      execution: "Build a simple program dashboard showing 3-5 key metrics your team owns — visible scorecards drive accountability better than email reminders",
      growth: "Create an annual learning plan for your team with quarterly skill-building goals tied to program needs and individual career interests",
      transition: "Complete a STARS self-assessment for your current program situation and share it with your supervisor — alignment on what kind of transition you're leading prevents mismatched expectations",
    },
    esNextSteps: {
      mission: "Lidera una sesion de vision de equipo usando 'Soluciones del 15%' — pregunta a cada miembro del personal que pueden hacer dentro de su autoridad para servir mejor a los pacientes este mes",
      people: "Implementa 1:1s mensuales estructurados con cada miembro del equipo usando una agenda consistente (logros, desafios, desarrollo, prioridades) para construir confianza y detectar problemas temprano",
      execution: "Construye un panel de control simple del programa mostrando 3-5 metricas clave que tu equipo posee — los marcadores visibles impulsan la responsabilidad mejor que los recordatorios por correo",
      growth: "Crea un plan de aprendizaje anual para tu equipo con metas trimestrales de desarrollo de habilidades vinculadas a las necesidades del programa e intereses profesionales individuales",
      transition: "Completa una autoevaluacion STARS para tu situacion actual del programa y compartela con tu supervisor — la alineacion sobre que tipo de transicion estas liderando previene expectativas desalineadas",
    },
    employerWants: {
      topQualifications: [
        "3+ years managing community health programs (ECM, CalAIM, or similar)",
        "Experience with Medi-Cal compliance and program reporting",
        "Track record of meeting program enrollment and outcome targets",
        "Experience managing multidisciplinary teams (CHWs, care coordinators, BH staff)",
      ],
      esTopQualifications: [
        "3+ anos gestionando programas de salud comunitaria (ECM, CalAIM o similares)",
        "Experiencia con cumplimiento de Medi-Cal y reportes de programas",
        "Historial de cumplir metas de inscripcion y resultados del programa",
        "Experiencia gestionando equipos multidisciplinarios (CHWs, coordinadores de atencion, personal de BH)",
      ],
      topSkills: [
        "Program outcome tracking and reporting",
        "Cross-functional team coordination",
        "CalAIM/ECM compliance and documentation",
        "Staff performance management",
        "Budget management and resource allocation",
      ],
      esTopSkills: [
        "Seguimiento y reporte de resultados del programa",
        "Coordinacion de equipos multifuncionales",
        "Cumplimiento y documentacion de CalAIM/ECM",
        "Gestion del rendimiento del personal",
        "Gestion de presupuesto y asignacion de recursos",
      ],
      certifications: [
        "PMP or CAPM (preferred)",
        "CHW Supervisor Certification (CA)",
        "Motivational Interviewing Trainer Certification",
      ],
      esCertifications: [
        "PMP o CAPM (preferido)",
        "Certificacion de Supervisor de CHW (CA)",
        "Certificacion de Entrenador en Entrevista Motivacional",
      ],
    },
  },

  /* ================================================================ */
  /*  Clinical Supervisor                                              */
  /* ================================================================ */
  clinical_supervisor: {
    strengthMessages: {
      mission: "Your commitment to clinical excellence rooted in community mission is what distinguishes FQHC clinical leadership from hospital-based supervision. Clinical supervisors who model mission-driven practice see their teams adopt the same standard — your patients feel the difference.",
      people: "Your ability to build psychological safety on your clinical team means staff bring concerns early, before they become patient safety issues. Clinical supervisors with strong people skills have 35% fewer adverse events because their teams aren't afraid to speak up.",
      execution: "Your systematic approach to clinical protocols and quality metrics gives your team the structure they need to deliver consistent care. In FQHCs where clinical standards must meet both HRSA and health plan requirements, your organizational skills are essential.",
      growth: "Your investment in developing clinical competence across your team creates a talent pipeline that benefits the entire FQHC. Clinical supervisors who actively mentor see 50% more internal promotions — you're not just managing, you're building the next generation of leaders.",
      transition: "Your ability to assess a clinical team's strengths and gaps quickly, and create a structured improvement plan, shows the kind of leadership maturity that FQHCs desperately need. You can walk into an underperforming clinic and start making it better on day one.",
    },
    esStrengthMessages: {
      mission: "Tu compromiso con la excelencia clinica arraigada en la mision comunitaria es lo que distingue el liderazgo clinico de FQHC de la supervision hospitalaria. Los supervisores clinicos que modelan la practica impulsada por la mision ven a sus equipos adoptar el mismo estandar — tus pacientes sienten la diferencia.",
      people: "Tu capacidad para construir seguridad psicologica en tu equipo clinico significa que el personal plantea preocupaciones temprano, antes de que se conviertan en problemas de seguridad del paciente. Los supervisores clinicos con fuertes habilidades de personas tienen 35% menos eventos adversos porque sus equipos no temen hablar.",
      execution: "Tu enfoque sistematico en protocolos clinicos y metricas de calidad le da a tu equipo la estructura que necesitan para brindar atencion consistente. En FQHCs donde los estandares clinicos deben cumplir tanto con HRSA como con planes de salud, tus habilidades organizativas son esenciales.",
      growth: "Tu inversion en desarrollar competencia clinica en tu equipo crea un pipeline de talento que beneficia a todo el FQHC. Los supervisores clinicos que mentorean activamente ven 50% mas promociones internas — no solo estas gestionando, estas construyendo la proxima generacion de lideres.",
      transition: "Tu capacidad para evaluar las fortalezas y brechas de un equipo clinico rapidamente, y crear un plan de mejora estructurado, muestra el tipo de madurez de liderazgo que los FQHCs necesitan desesperadamente. Puedes entrar a una clinica de bajo rendimiento y comenzar a mejorarla desde el primer dia.",
    },
    growthMessages: {
      mission: "Carving out time for mission reflection amid clinical demands is tough but essential. Consider starting each team huddle with a 60-second 'patient impact moment' — it costs nothing and reminds your clinical team why they chose community health.",
      people: "Building your skills in giving difficult feedback will prevent small clinical concerns from becoming serious issues. Practice the SBI model (Situation-Behavior-Impact) — it provides structure that makes tough conversations feel less personal and more productive.",
      execution: "Developing clearer clinical protocols and competency checklists for your team will reduce variability in patient care. Start with the three procedures where you see the most inconsistency — standardize those first, then expand.",
      growth: "Creating structured clinical supervision sessions (not just case reviews, but intentional skill-building) will accelerate your team's development. Set aside 30 minutes monthly for each direct report to work on one specific clinical competency.",
      transition: "When taking over a clinical team, resist the urge to change protocols immediately. Spend 2-3 weeks observing current practice, understanding the team culture, and identifying who your clinical champions are before introducing any changes.",
    },
    esGrowthMessages: {
      mission: "Encontrar tiempo para la reflexion sobre la mision en medio de las demandas clinicas es dificil pero esencial. Considera comenzar cada reunion de equipo con un 'momento de impacto en pacientes' de 60 segundos — no cuesta nada y recuerda a tu equipo clinico por que eligieron la salud comunitaria.",
      people: "Desarrollar tus habilidades para dar retroalimentacion dificil evitara que pequenas preocupaciones clinicas se conviertan en problemas serios. Practica el modelo SBI (Situacion-Comportamiento-Impacto) — proporciona estructura que hace que las conversaciones dificiles se sientan menos personales y mas productivas.",
      execution: "Desarrollar protocolos clinicos mas claros y listas de verificacion de competencias para tu equipo reducira la variabilidad en la atencion al paciente. Comienza con los tres procedimientos donde ves mas inconsistencia — estandariza esos primero, luego expande.",
      growth: "Crear sesiones de supervision clinica estructuradas (no solo revisiones de casos, sino desarrollo intencional de habilidades) acelerara el desarrollo de tu equipo. Reserva 30 minutos mensuales para cada subordinado directo para trabajar en una competencia clinica especifica.",
      transition: "Al hacerte cargo de un equipo clinico, resiste el impulso de cambiar protocolos inmediatamente. Dedica 2-3 semanas observando la practica actual, entendiendo la cultura del equipo e identificando quienes son tus campeones clinicos antes de introducir cualquier cambio.",
    },
    nextSteps: {
      mission: "Organize a quarterly 'Community Health Impact' meeting where your team presents patient outcome data alongside patient stories — connecting clinical metrics to human impact sustains motivation",
      people: "Implement weekly 15-minute 'skill of the week' teaching moments during team huddles — these bite-sized sessions build clinical competence without overwhelming schedules",
      execution: "Audit your top 5 clinical protocols for clarity and staff adherence — create simple one-page reference cards for the most common procedures",
      growth: "Map each staff member's career trajectory and create a 12-month development plan with specific training milestones and stretch assignments",
      transition: "Create a 'Clinical Team Onboarding Playbook' so that every new hire gets the same foundation — this reduces your personal onboarding burden and ensures consistency",
    },
    esNextSteps: {
      mission: "Organiza una reunion trimestral de 'Impacto en Salud Comunitaria' donde tu equipo presente datos de resultados de pacientes junto con historias de pacientes — conectar metricas clinicas con impacto humano sostiene la motivacion",
      people: "Implementa semanalmente 'habilidad de la semana' de 15 minutos durante reuniones de equipo — estas sesiones breves construyen competencia clinica sin sobrecargar agendas",
      execution: "Audita tus 5 principales protocolos clinicos por claridad y adherencia del personal — crea tarjetas de referencia simples de una pagina para los procedimientos mas comunes",
      growth: "Mapea la trayectoria profesional de cada miembro del personal y crea un plan de desarrollo de 12 meses con hitos de capacitacion especificos y asignaciones de estiramiento",
      transition: "Crea un 'Manual de Incorporacion del Equipo Clinico' para que cada nueva contratacion obtenga la misma base — esto reduce tu carga personal de incorporacion y asegura consistencia",
    },
    employerWants: {
      topQualifications: [
        "Active clinical license (RN, LCSW, LMFT, NP, PA) with 2+ years supervisory experience",
        "Experience with integrated care models and BH co-location",
        "Track record of improving clinical quality metrics (HEDIS, UDS)",
        "Experience mentoring pre-licensure clinicians toward independent practice",
      ],
      esTopQualifications: [
        "Licencia clinica activa (RN, LCSW, LMFT, NP, PA) con 2+ anos de experiencia supervisora",
        "Experiencia con modelos de atencion integrada y co-ubicacion de BH",
        "Historial de mejora de metricas de calidad clinica (HEDIS, UDS)",
        "Experiencia mentoreando clinicos pre-licenciatura hacia la practica independiente",
      ],
      topSkills: [
        "Clinical quality improvement",
        "Staff competency assessment and development",
        "Integrated care model implementation",
        "Clinical protocol development",
        "EHR clinical workflow optimization",
      ],
      esTopSkills: [
        "Mejora de calidad clinica",
        "Evaluacion y desarrollo de competencias del personal",
        "Implementacion de modelos de atencion integrada",
        "Desarrollo de protocolos clinicos",
        "Optimizacion de flujos de trabajo clinicos del EHR",
      ],
      certifications: [
        "Clinical supervision certification (discipline-specific)",
        "BLS/ACLS Instructor",
        "Lean Six Sigma (Yellow or Green Belt)",
      ],
      esCertifications: [
        "Certificacion de supervision clinica (especifica de disciplina)",
        "Instructor de BLS/ACLS",
        "Lean Six Sigma (Cinturon Amarillo o Verde)",
      ],
    },
  },

  /* ================================================================ */
  /*  Operations Director                                              */
  /* ================================================================ */
  operations_director: {
    strengthMessages: {
      mission: "Your ability to translate mission into operational reality is what makes safety-net healthcare work. Operations directors who keep the mission visible in every workflow decision — from scheduling to supply chain — create FQHCs where staff feel purpose, not just process.",
      people: "Your strength in managing cross-functional teams means your FQHC runs smoothly even when departments have competing priorities. Operations directors who build bridges between clinical, admin, and finance teams reduce internal friction by 40% — that time goes straight back to patient care.",
      execution: "Your operational discipline creates the reliability that both patients and staff depend on. In an FQHC environment with razor-thin margins and high regulatory demands, having an ops director who delivers consistent systems is the difference between survival and thriving.",
      growth: "Your commitment to building operational capacity — not just maintaining it — means your FQHC can absorb new programs, new sites, and new requirements without collapsing under the weight. You're building infrastructure, not just managing it.",
      transition: "Your ability to assess operational bottlenecks quickly and implement structured improvements shows strategic thinking that goes beyond day-to-day management. FQHCs that hire operations directors with your transition readiness recover from disruptions twice as fast.",
    },
    esStrengthMessages: {
      mission: "Tu capacidad para traducir la mision en realidad operativa es lo que hace funcionar la atencion de red de seguridad. Los directores de operaciones que mantienen la mision visible en cada decision de flujo de trabajo — desde programacion hasta cadena de suministros — crean FQHCs donde el personal siente proposito, no solo proceso.",
      people: "Tu fortaleza en gestionar equipos multifuncionales significa que tu FQHC funciona sin problemas incluso cuando los departamentos tienen prioridades que compiten. Los directores de operaciones que construyen puentes entre equipos clinicos, administrativos y financieros reducen la friccion interna en 40% — ese tiempo regresa directamente a la atencion al paciente.",
      execution: "Tu disciplina operativa crea la confiabilidad de la que dependen tanto los pacientes como el personal. En un entorno de FQHC con margenes muy ajustados y altas demandas regulatorias, tener un director de operaciones que entrega sistemas consistentes es la diferencia entre sobrevivir y prosperar.",
      growth: "Tu compromiso con construir capacidad operativa — no solo mantenerla — significa que tu FQHC puede absorber nuevos programas, nuevos sitios y nuevos requisitos sin colapsar bajo el peso. Estas construyendo infraestructura, no solo gestionandola.",
      transition: "Tu capacidad para evaluar cuellos de botella operativos rapidamente e implementar mejoras estructuradas muestra pensamiento estrategico que va mas alla de la gestion diaria. Los FQHCs que contratan directores de operaciones con tu preparacion para la transicion se recuperan de las interrupciones dos veces mas rapido.",
    },
    growthMessages: {
      mission: "Making time to connect with the clinical side of your FQHC prevents the 'operational bubble' that can disconnect admin leaders from the mission. Shadow a provider or CHW for half a day each quarter — it will change how you prioritize operational decisions.",
      people: "Developing your coaching skills (beyond directive management) will unlock the discretionary effort in your team. Operations staff who feel coached — not just instructed — take more initiative and solve problems before they escalate to your desk.",
      execution: "Investing in process documentation and standardization will reduce the number of decisions that require your personal involvement. Build playbooks for your top 10 recurring operational situations so your team can handle them independently.",
      growth: "Creating a culture of continuous improvement across your departments requires intentional structure. Consider implementing a monthly 'ops kaizen' session where team members propose and implement small improvements — distributed problem-solving scales better than top-down fixes.",
      transition: "When taking over operations at a new site or FQHC, map the existing power structures and informal decision-makers before making changes. The org chart tells you reporting lines — the real influence network determines whether your changes will stick.",
    },
    esGrowthMessages: {
      mission: "Hacer tiempo para conectar con el lado clinico de tu FQHC previene la 'burbuja operativa' que puede desconectar a los lideres administrativos de la mision. Acompana a un proveedor o CHW por medio dia cada trimestre — cambiara como priorizas las decisiones operativas.",
      people: "Desarrollar tus habilidades de coaching (mas alla de la gestion directiva) desbloqueara el esfuerzo discrecional en tu equipo. El personal de operaciones que se siente coacheado — no solo instruido — toma mas iniciativa y resuelve problemas antes de que escalen a tu escritorio.",
      execution: "Invertir en documentacion de procesos y estandarizacion reducira la cantidad de decisiones que requieren tu participacion personal. Construye manuales para tus 10 situaciones operativas recurrentes principales para que tu equipo pueda manejarlas independientemente.",
      growth: "Crear una cultura de mejora continua en tus departamentos requiere estructura intencional. Considera implementar una sesion mensual de 'kaizen de operaciones' donde los miembros del equipo propongan e implementen pequenas mejoras — la resolucion de problemas distribuida escala mejor que las soluciones de arriba hacia abajo.",
      transition: "Al hacerte cargo de operaciones en un nuevo sitio o FQHC, mapea las estructuras de poder existentes y los tomadores de decisiones informales antes de hacer cambios. El organigrama te dice las lineas de reporte — la red de influencia real determina si tus cambios se mantendran.",
    },
    nextSteps: {
      mission: "Schedule quarterly 'Clinical Shadow Days' where you spend time observing frontline care — it will inform better operational decisions and signal to staff that leadership understands their reality",
      people: "Implement a structured rounding practice — visit each department weekly for 15 minutes of informal conversation to catch issues early and build trust",
      execution: "Create standardized operating procedures (SOPs) for your top 5 cross-departmental workflows and post them where staff can reference them daily",
      growth: "Launch a quarterly 'Innovation Hour' where any staff member can pitch an operational improvement — small investments in grassroots innovation yield outsized returns",
      transition: "Build a '90-Day Ops Diagnostic' template you can use whenever you take on a new department or site — having a structured assessment process prevents both analysis paralysis and hasty decisions",
    },
    esNextSteps: {
      mission: "Programa 'Dias de Sombra Clinica' trimestrales donde pases tiempo observando la atencion de primera linea — informara mejores decisiones operativas y senalara al personal que el liderazgo entiende su realidad",
      people: "Implementa una practica estructurada de rondas — visita cada departamento semanalmente por 15 minutos de conversacion informal para detectar problemas temprano y construir confianza",
      execution: "Crea procedimientos operativos estandarizados (SOPs) para tus 5 principales flujos de trabajo interdepartamentales y publicalos donde el personal pueda consultarlos diariamente",
      growth: "Lanza una 'Hora de Innovacion' trimestral donde cualquier miembro del personal pueda presentar una mejora operativa — pequenas inversiones en innovacion de base generan retornos desproporcionados",
      transition: "Construye una plantilla de 'Diagnostico Operativo de 90 Dias' que puedas usar siempre que asumas un nuevo departamento o sitio — tener un proceso de evaluacion estructurado previene tanto la paralisis por analisis como las decisiones apresuradas",
    },
    employerWants: {
      topQualifications: [
        "5+ years healthcare operations management, preferably in FQHC or community health",
        "Experience managing multi-site or multi-department operations",
        "Track record of improving operational efficiency while maintaining compliance",
        "Budget management experience ($1M+ annual departmental budgets)",
      ],
      esTopQualifications: [
        "5+ anos de gestion de operaciones de salud, preferiblemente en FQHC o salud comunitaria",
        "Experiencia gestionando operaciones de multiples sitios o departamentos",
        "Historial de mejorar la eficiencia operativa mientras se mantiene el cumplimiento",
        "Experiencia en gestion de presupuesto (presupuestos departamentales anuales de $1M+)",
      ],
      topSkills: [
        "Multi-site operations management",
        "Process improvement and standardization",
        "Cross-functional team leadership",
        "Budget and resource optimization",
        "HRSA compliance and reporting",
      ],
      esTopSkills: [
        "Gestion de operaciones multi-sitio",
        "Mejora y estandarizacion de procesos",
        "Liderazgo de equipos multifuncionales",
        "Optimizacion de presupuesto y recursos",
        "Cumplimiento y reportes de HRSA",
      ],
      certifications: [
        "Lean Six Sigma (Green or Black Belt)",
        "FQHC Operations Certificate (NACHC)",
        "PMP or healthcare administration credential",
      ],
      esCertifications: [
        "Lean Six Sigma (Cinturon Verde o Negro)",
        "Certificado de Operaciones FQHC (NACHC)",
        "PMP o credencial de administracion de salud",
      ],
    },
  },

  /* ================================================================ */
  /*  Executive Director / C-Suite                                     */
  /* ================================================================ */
  executive_director: {
    strengthMessages: {
      mission: "Your ability to hold the mission at the center of every strategic decision is the difference between an FQHC that survives and one that thrives. Executive leaders who model mission-driven decision-making create organizations where staff retention is 30% higher — people stay where leadership practices what it preaches.",
      people: "Your strength in developing your leadership team cascades through the entire organization. Executive directors who invest in their direct reports' growth build FQHCs that can withstand leadership transitions, funding shocks, and growth challenges without losing momentum.",
      execution: "Your discipline in translating strategy into execution — with clear accountability and timelines — means your FQHC delivers on its commitments to patients, board, and funders. In an era of funding uncertainty, operational credibility is your most valuable currency.",
      growth: "Your strategic vision for organizational development positions your FQHC not just to survive current challenges but to shape the future of community health in your region. Executive directors who think 3-5 years ahead while executing today build institutions that outlast individuals.",
      transition: "Your ability to rapidly assess organizational health, build coalitions, and implement strategic change demonstrates the kind of executive leadership that FQHCs need during this era of unprecedented disruption. You don't just manage transitions — you architect them.",
    },
    esStrengthMessages: {
      mission: "Tu capacidad para mantener la mision en el centro de cada decision estrategica es la diferencia entre un FQHC que sobrevive y uno que prospera. Los lideres ejecutivos que modelan la toma de decisiones impulsada por la mision crean organizaciones donde la retencion del personal es 30% mayor — la gente se queda donde el liderazgo practica lo que predica.",
      people: "Tu fortaleza en desarrollar tu equipo de liderazgo se cascada a traves de toda la organizacion. Los directores ejecutivos que invierten en el crecimiento de sus subordinados directos construyen FQHCs que pueden resistir transiciones de liderazgo, shocks de financiamiento y desafios de crecimiento sin perder impulso.",
      execution: "Tu disciplina en traducir estrategia en ejecucion — con responsabilidad clara y plazos — significa que tu FQHC cumple sus compromisos con pacientes, junta directiva y financiadores. En una era de incertidumbre de financiamiento, la credibilidad operativa es tu moneda mas valiosa.",
      growth: "Tu vision estrategica para el desarrollo organizacional posiciona a tu FQHC no solo para sobrevivir los desafios actuales sino para dar forma al futuro de la salud comunitaria en tu region. Los directores ejecutivos que piensan 3-5 anos adelante mientras ejecutan hoy construyen instituciones que perduran mas que los individuos.",
      transition: "Tu capacidad para evaluar rapidamente la salud organizacional, construir coaliciones e implementar cambio estrategico demuestra el tipo de liderazgo ejecutivo que los FQHCs necesitan durante esta era de disrupcion sin precedentes. No solo gestionas transiciones — las arquitectas.",
    },
    growthMessages: {
      mission: "Protecting time for mission reflection at the executive level prevents the strategic drift that slowly turns FQHCs into 'just another clinic.' Schedule monthly time to visit patient-facing operations — not to inspect, but to reconnect with why this organization exists.",
      people: "Developing your skills in having candid conversations with your leadership team — about performance, about culture, about difficult decisions — is the single highest-leverage investment you can make. Executives who model vulnerability create organizations where truth travels up, not just down.",
      execution: "Building robust strategic planning and execution systems will free you from being the 'chief problem solver' and allow you to operate as the 'chief strategist.' Create clear dashboards and delegation structures so your leadership team can handle execution while you focus on direction.",
      growth: "Investing in your own executive development — through peer networks, executive coaching, or NACHC leadership programs — prevents the isolation that causes executive burnout. FQHC CEOs who have strong peer networks make better decisions and last longer in the role.",
      transition: "When entering a new executive role, dedicate your first 60 days exclusively to listening, learning, and building relationships. The executive who arrives with a 'ready-made plan' before understanding the organization's unique context will face resistance from the very team they need to lead.",
    },
    esGrowthMessages: {
      mission: "Proteger tiempo para la reflexion sobre la mision a nivel ejecutivo previene la desviacion estrategica que lentamente convierte a los FQHCs en 'solo otra clinica.' Programa tiempo mensual para visitar operaciones de atencion al paciente — no para inspeccionar, sino para reconectarte con por que existe esta organizacion.",
      people: "Desarrollar tus habilidades para tener conversaciones candidas con tu equipo de liderazgo — sobre rendimiento, sobre cultura, sobre decisiones dificiles — es la inversion de mayor apalancamiento que puedes hacer. Los ejecutivos que modelan vulnerabilidad crean organizaciones donde la verdad viaja hacia arriba, no solo hacia abajo.",
      execution: "Construir sistemas robustos de planificacion y ejecucion estrategica te liberara de ser el 'jefe solucionador de problemas' y te permitira operar como el 'jefe estratega.' Crea paneles de control claros y estructuras de delegacion para que tu equipo de liderazgo maneje la ejecucion mientras tu te enfocas en la direccion.",
      growth: "Invertir en tu propio desarrollo ejecutivo — a traves de redes de pares, coaching ejecutivo o programas de liderazgo de NACHC — previene el aislamiento que causa agotamiento ejecutivo. Los CEOs de FQHC que tienen redes de pares fuertes toman mejores decisiones y duran mas en el puesto.",
      transition: "Al entrar en un nuevo puesto ejecutivo, dedica tus primeros 60 dias exclusivamente a escuchar, aprender y construir relaciones. El ejecutivo que llega con un 'plan listo' antes de entender el contexto unico de la organizacion enfrentara resistencia del mismo equipo que necesita liderar.",
    },
    nextSteps: {
      mission: "Establish a quarterly 'Mission Health Check' with your board — track not just financial metrics but patient outcomes, staff satisfaction, and community impact to keep mission at the center of governance",
      people: "Create a leadership development program for your top 5 emerging leaders — succession planning is the executive responsibility most FQHCs neglect until it's too late",
      execution: "Implement a monthly strategic execution review with your leadership team using a simple stoplight dashboard — green/yellow/red forces clarity about what's on track and what needs attention",
      growth: "Join a FQHC CEO peer network (NACHC, state PCA, or private CEO roundtable) to combat executive isolation and learn from peers navigating similar challenges",
      transition: "Document your organizational knowledge — strategic priorities, key relationships, institutional history, and pending decisions — in a 'Leadership Continuity Binder' that protects the FQHC if you transition out",
    },
    esNextSteps: {
      mission: "Establece un 'Chequeo de Salud de la Mision' trimestral con tu junta directiva — rastrea no solo metricas financieras sino resultados de pacientes, satisfaccion del personal e impacto comunitario para mantener la mision en el centro de la gobernanza",
      people: "Crea un programa de desarrollo de liderazgo para tus 5 principales lideres emergentes — la planificacion de sucesion es la responsabilidad ejecutiva que la mayoria de los FQHCs descuidan hasta que es demasiado tarde",
      execution: "Implementa una revision mensual de ejecucion estrategica con tu equipo de liderazgo usando un panel de semaforo simple — verde/amarillo/rojo fuerza claridad sobre que esta en camino y que necesita atencion",
      growth: "Unete a una red de pares de CEO de FQHC (NACHC, PCA estatal o mesa redonda privada de CEOs) para combatir el aislamiento ejecutivo y aprender de pares navegando desafios similares",
      transition: "Documenta tu conocimiento organizacional — prioridades estrategicas, relaciones clave, historia institucional y decisiones pendientes — en un 'Cuaderno de Continuidad de Liderazgo' que proteja al FQHC si tu transicionas",
    },
    employerWants: {
      topQualifications: [
        "7+ years progressive healthcare leadership, 3+ at director level or above",
        "Experience leading an FQHC or FQHC-like organization through growth or turnaround",
        "Track record with HRSA compliance, board governance, and multi-million dollar budgets",
        "Experience navigating Medi-Cal managed care contracts and payer relationships",
      ],
      esTopQualifications: [
        "7+ anos de liderazgo progresivo en salud, 3+ a nivel de director o superior",
        "Experiencia liderando un FQHC u organizacion similar a traves de crecimiento o cambio",
        "Historial con cumplimiento de HRSA, gobernanza de junta directiva y presupuestos multimillonarios",
        "Experiencia navegando contratos de atencion administrada de Medi-Cal y relaciones con pagadores",
      ],
      topSkills: [
        "Strategic planning and organizational development",
        "Board governance and stakeholder management",
        "Healthcare finance and revenue diversification",
        "Community and political relationship building",
        "Organizational change management",
      ],
      esTopSkills: [
        "Planificacion estrategica y desarrollo organizacional",
        "Gobernanza de junta directiva y gestion de partes interesadas",
        "Finanzas de salud y diversificacion de ingresos",
        "Construccion de relaciones comunitarias y politicas",
        "Gestion del cambio organizacional",
      ],
      certifications: [
        "MHA, MBA, or MPH (preferred)",
        "FACHE (Fellow, American College of Healthcare Executives)",
        "NACHC Leadership Institute graduate",
      ],
      esCertifications: [
        "MHA, MBA o MPH (preferido)",
        "FACHE (Fellow, American College of Healthcare Executives)",
        "Graduado del Instituto de Liderazgo de NACHC",
      ],
    },
  },
};
