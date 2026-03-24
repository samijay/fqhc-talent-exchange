// masterclass-course-modules-part2.ts
// Masterclass Course Modules 16-30 (Interactive)
// Converts the static FQHC masterclass content into interactive course modules with exercises
// Last updated: 2026-03-23

import type { MasterclassCourseModule } from "./masterclass-course-modules-part1";
import type {
  ConceptCardExercise,
  ClassifierExercise,
  MiniQuizExercise,
} from "./okr-course-modules";

/* ================================================================== */
/*  Module 16: Remote-Ready Workforce                                 */
/* ================================================================== */

const module16RemoteReady: MasterclassCourseModule = {
  id: "remote-ready-workforce",
  order: 16,
  title: {
    en: "Building a Remote-Ready FQHC Workforce",
    es: "Construyendo una Fuerza Laboral FQHC Lista para Trabajo Remoto",
  },
  subtitle: {
    en: "How to design hybrid and remote models for back-office, telehealth, and administrative roles while maintaining quality and compliance",
    es: "Cómo diseñar modelos híbridos y remotos para funciones administrativas, telehealth y de oficina trasera manteniendo calidad y cumplimiento",
  },
  description: {
    en: "Learn to identify which FQHC roles can work remotely, design HIPAA-compliant remote policies, and calculate the ROI of hybrid work models for retention.",
    es: "Aprenda a identificar qué roles FQHC pueden trabajar remotamente, diseñe políticas remotas conformes a HIPAA, y calcule el ROI de modelos de trabajo híbrido para retención.",
  },
  estimatedMinutes: 12,
  icon: "Laptop",
  color: "green",
  category: "leadership",
  learningObjectives: [
    {
      en: "Identify which FQHC roles can be fully remote, hybrid, or must remain on-site",
      es: "Identifique qué roles FQHC pueden ser completamente remotos, híbridos o deben permanecer en sitio",
    },
    {
      en: "Design HIPAA-compliant remote work policies including device management and VPN requirements",
      es: "Diseñe políticas de trabajo remoto conformes a HIPAA incluyendo gestión de dispositivos y requisitos de VPN",
    },
    {
      en: "Calculate the ROI of remote work: reduced real estate costs, expanded recruiting pool, and improved retention",
      es: "Calcule el ROI del trabajo remoto: costos de espacio reducidos, reclutamiento ampliado y retención mejorada",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The Remote Work Retention Impact",
        es: "El Impacto de Trabajo Remoto en Retención",
      },
      body: {
        en: "A Stanford/Nature study (2024) showed hybrid work reduces quit rates by 33%. For FQHCs losing 5-25% of administrative staff annually, this translates directly to cost savings. Not every role can be remote — clinical patient care must be on-site. But billing, coding, case management, referral coordination, and population health analytics can all be done remotely with proper HIPAA safeguards. A 200-person FQHC where 80 administrative roles go remote saves $400K-$600K annually in reduced turnover costs alone.",
        es: "Un estudio Stanford/Nature (2024) mostró que el trabajo híbrido reduce las renuncias un 33%. Para los FQHCs que pierden 5-25% del personal administrativo anualmente, esto se traduce directamente en ahorros de costos. No todos los roles pueden ser remotos — la atención clínica debe ser en sitio. Pero facturación, codificación, gestión de casos, coordinación de referidos y análisis de salud de población pueden hacerse remotamente con las debidas salvaguardas HIPAA.",
      },
    },
    {
      heading: {
        en: "HIPAA-Compliant Remote Infrastructure",
        es: "Infraestructura de Trabajo Remoto Conforme a HIPAA",
      },
      body: {
        en: "Remote work doesn't mean uncontrolled access to PHI. HIPAA-compliant remote work requires: (1) VPN with multi-factor authentication for all devices accessing EHRs, (2) Encrypted laptops with disk encryption (BitLocker/FileVault), (3) Device management (MDM) to enforce password policies and wipe lost devices, (4) Home network assessment to ensure reasonable security, (5) Secure file sharing (no Dropbox, Google Drive — use encrypted practice management tools), (6) Annual privacy training with HIPAA-specific scenarios. Fenway Health transitioned 70-80% of staff to remote work in 48 hours during the pandemic because they'd already migrated to cloud infrastructure. FQHCs that invest in cloud EHRs, not legacy on-premise systems, can enable remote flexibility faster.",
        es: "El trabajo remoto no significa acceso incontrolado a PHI. El trabajo remoto conforme a HIPAA requiere: (1) VPN con autenticación multifactor, (2) Computadoras portátiles cifradas, (3) Gestión de dispositivos (MDM), (4) Evaluación de red en casa, (5) Intercambio de archivos seguro (no Dropbox), (6) Capacitación anual en privacidad.",
      },
    },
    {
      heading: {
        en: "Role Classification Framework",
        es: "Marco de Clasificación de Roles",
      },
      body: {
        en: "Fully Remote: Billing coders, eligibility specialists, data entry, population health analysts, revenue cycle auditors. Hybrid (2-3 days/week on-site): Care coordinators, care managers, referral coordinators (need some patient contact). Must Be On-Site: Front desk, clinical MAs, nurses, providers, behavioral health clinicians, dental hygienists. The key is productivity measurement — remote workers should be evaluated on outcomes (claims processed, patients contacted) not hours logged. Implement time-tracking for compliance audits, but don't use it punitively.",
        es: "Completamente Remoto: Coders de facturación, especialistas en elegibilidad, entrada de datos, analistas de salud de población. Híbrido (2-3 días/semana en sitio): Coordinadores de atención, gestores de atención. Debe Ser En Sitio: Recepción, asistentes médicos clínicos, enfermeras, proveedores.",
      },
    },
  ],
  exercises: [
    {
      type: "classifier",
      id: "m16-role-classification",
      instruction: {
        en: "Classify each FQHC role as Fully Remote, Hybrid, or On-Site only",
        es: "Clasifique cada rol FQHC como Completamente Remoto, Híbrido o Solo En Sitio",
      },
      items: [
        {
          text: {
            en: "Billing coder processing insurance claims",
            es: "Coder de facturación procesando reclamos de seguros",
          },
          isGood: true,
          explanation: {
            en: "Billing coders can work fully remote with proper VPN and EHR access controls",
            es: "Los coders de facturación pueden trabajar completamente remotos con acceso VPN y controles EHR apropiados",
          },
        },
        {
          text: {
            en: "Care coordinator conducting remote patient follow-up calls",
            es: "Coordinador de atención realizando llamadas de seguimiento remoto del paciente",
          },
          isGood: true,
          explanation: {
            en: "Care coordination can be hybrid or fully remote with secure phone systems and HIPAA-compliant documentation",
            es: "La coordinación de atención puede ser híbrida o completamente remota con sistemas telefónicos seguros",
          },
        },
        {
          text: {
            en: "Medical assistant providing direct patient clinical care",
            es: "Asistente médico brindando atención clínica directa al paciente",
          },
          isGood: false,
          explanation: {
            en: "Clinical MAs must be on-site to provide direct patient care and support providers",
            es: "Los asistentes médicos clínicos deben estar en sitio para brindar atención directa al paciente",
          },
        },
        {
          text: {
            en: "Population health analyst reviewing utilization data",
            es: "Analista de salud de población revisando datos de utilización",
          },
          isGood: true,
          explanation: {
            en: "Analytics roles can work fully remote with secure data access and dashboard tools",
            es: "Los roles de análisis pueden trabajar completamente remotos con acceso seguro a datos",
          },
        },
        {
          text: {
            en: "Front desk receptionist greeting patients",
            es: "Recepcionista de recepción saludando a pacientes",
          },
          isGood: false,
          explanation: {
            en: "Front desk must be on-site for patient check-in, phone coverage, and clinic operations",
            es: "La recepción debe estar en sitio para registro de pacientes y operaciones clínicas",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
    {
      type: "mini-quiz",
      id: "m16-hipaa-remote",
      questions: [
        {
          question: {
            en: "Which is NOT a required safeguard for HIPAA-compliant remote work?",
            es: "¿Cuál NO es una salvaguarda requerida para el trabajo remoto conforme a HIPAA?",
          },
          options: [
            {
              text: {
                en: "VPN with multi-factor authentication",
                es: "VPN con autenticación multifactor",
              },
              isCorrect: false,
              explanation: {
                en: "VPN with MFA is essential for all remote access to EHRs and PHI",
                es: "VPN con MFA es esencial para todo acceso remoto a EHRs y PHI",
              },
            },
            {
              text: {
                en: "Disk encryption on all laptops",
                es: "Cifrado de disco en todas las computadoras portátiles",
              },
              isCorrect: false,
              explanation: {
                en: "Disk encryption protects PHI if a laptop is lost or stolen",
                es: "El cifrado de disco protege PHI si se pierde o roba una computadora portátil",
              },
            },
            {
              text: {
                en: "Sharing files via personal Google Drive for convenience",
                es: "Compartir archivos a través de Google Drive personal para conveniencia",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — this is prohibited. Use encrypted practice management tools only.",
                es: "Correcto — esto está prohibido. Use solo herramientas de gestión de prácticas encriptadas.",
              },
            },
            {
              text: {
                en: "Mobile Device Management (MDM) to enforce policies",
                es: "Gestión de Dispositivos Móviles (MDM) para hacer cumplir políticas",
              },
              isCorrect: false,
              explanation: {
                en: "MDM is essential to enforce password policies and remotely wipe lost devices",
                es: "MDM es esencial para hacer cumplir políticas de contraseña y borrar dispositivos perdidos",
              },
            },
          ],
        },
        {
          question: {
            en: "What was the retention improvement when Fenway Health went remote?",
            es: "¿Cuál fue la mejora de retención cuando Fenway Health se fue remoto?",
          },
          options: [
            {
              text: { en: "18% reduction in turnover", es: "18% de reducción de rotación" },
              isCorrect: false,
              explanation: {
                en: "That's the general improvement from remote work. Fenway's infrastructure allowed them to transition rapidly.",
                es: "Esa es la mejora general del trabajo remoto.",
              },
            },
            {
              text: {
                en: "Able to transition 70-80% of staff in 48 hours",
                es: "Capacidad de transicionar 70-80% del personal en 48 horas",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — because they'd already invested in cloud infrastructure, not legacy systems",
                es: "Correcto — porque ya habían invertido en infraestructura en la nube, no sistemas legacy",
              },
            },
            {
              text: { en: "33% reduction in sick days", es: "33% de reducción en días de enfermedad" },
              isCorrect: false,
              explanation: {
                en: "Remote work doesn't necessarily reduce sick days — it's about location flexibility",
                es: "El trabajo remoto no reduce necesariamente los días de enfermedad",
              },
            },
            {
              text: { en: "25% increase in patient satisfaction", es: "25% de aumento en satisfacción del paciente" },
              isCorrect: false,
              explanation: {
                en: "Patient-facing roles still must be on-site. Remote work applies to back-office.",
                es: "Los roles orientados al paciente deben estar en sitio.",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "concept-card",
      id: "m16-remote-concepts",
      cards: [
        {
          front: {
            en: "What is the Stanford/Nature study finding on hybrid work impact?",
            es: "¿Cuál es el hallazgo del estudio Stanford/Nature sobre el impacto del trabajo híbrido?",
          },
          back: {
            en: "Hybrid work reduces quit rates by 33%, saving significant replacement costs for FQHCs",
            es: "El trabajo híbrido reduce las tasas de renuncia un 33%, ahorrando costos de reemplazo significativos para FQHCs",
          },
          fqhcExample: {
            en: "A 200-person FQHC with 80 remote administrative roles saves $400K-$600K annually in turnover costs",
            es: "Un FQHC de 200 personas con 80 roles administrativos remotos ahorra $400K-$600K anuales en costos de rotación",
          },
        },
        {
          front: {
            en: "Which EHR infrastructure enables rapid remote transition?",
            es: "¿Qué infraestructura de EHR permite transición rápida a remoto?",
          },
          back: {
            en: "Cloud-based EHRs enable remote access; legacy on-premise systems require VPN infrastructure that takes months",
            es: "Los EHRs basados en la nube permiten acceso remoto; los sistemas legacy requieren infraestructura VPN",
          },
          fqhcExample: {
            en: "Fenway Health transitioned 70-80% of staff in 48 hours because they had already migrated to cloud systems",
            es: "Fenway Health transicionó 70-80% del personal en 48 horas porque ya había migrado a sistemas en la nube",
          },
        },
        {
          front: {
            en: "What is the key difference between fully remote and hybrid roles?",
            es: "¿Cuál es la diferencia clave entre roles completamente remotos e híbridos?",
          },
          back: {
            en: "Fully remote roles (billing, coding) need no patient contact; hybrid roles (care coordination) benefit from some in-person team time",
            es: "Los roles completamente remotos no necesitan contacto con pacientes; los roles híbridos se benefician del tiempo del equipo en persona",
          },
          fqhcExample: {
            en: "Billing coders can be 100% remote; care coordinators work better hybrid (2-3 days on-site) to maintain team connection",
            es: "Los coders de facturación pueden ser 100% remotos; los coordinadores de atención trabajan mejor de forma híbrida",
          },
        },
      ],
      xpReward: 15,
    } as ConceptCardExercise,
  ],
  sourceMaterials: [
    { label: "Nature: Hybrid Work Reduces Quit Rates 33% (Stanford, 2024)", url: "https://www.nature.com/articles/s41586-024-07500-2" },
    { label: "NACHC 2022 Workforce Survey: 70% Losing 5-25% Staff", url: "https://www.nachc.org/wp-content/uploads/2022/03/NACHC-2022-Workforce-Survey-Full-Report-1.pdf" },
    { label: "Dialpad: Fenway Health Remote Transition Case Study", url: "https://www.dialpad.com/customers/fenway-health/" },
    { label: "California Telehealth Resource Center", url: "https://caltrc.org/" },
  ],
  totalXP: 60,
};

/* ================================================================== */
/*  Module 17: The Retention Machine                                  */
/* ================================================================== */

const module17Retention: MasterclassCourseModule = {
  id: "retention-machine",
  order: 17,
  title: {
    en: "The Retention Machine — Building an FQHC That People Don't Leave",
    es: "La Máquina de Retención — Construyendo un FQHC al que la Gente no Quiere Irse",
  },
  subtitle: {
    en: "Evidence-based strategies for reducing FQHC turnover: career ladders, stay interviews, compensation redesign, burnout prevention, and mission reconnection",
    es: "Estrategias basadas en evidencia para reducir la rotación FQHC: escaleras profesionales, entrevistas de permanencia, rediseño de compensación, prevención de agotamiento y reconexión de misión",
  },
  description: {
    en: "Learn how to calculate true turnover costs, design career ladders, implement stay interviews, and benchmark compensation to compete with hospitals.",
    es: "Aprenda a calcular los verdaderos costos de rotación, diseñar escaleras profesionales, implementar entrevistas de permanencia y comparar la compensación con hospitales.",
  },
  estimatedMinutes: 14,
  icon: "Users",
  color: "stone",
  category: "leadership",
  learningObjectives: [
    {
      en: "Calculate your center's true turnover cost by role using SHRM replacement cost multipliers",
      es: "Calcule el verdadero costo de rotación de su centro por rol usando multiplicadores de costo de reemplazo SHRM",
    },
    {
      en: "Design role-specific career ladders that give every employee a visible next step",
      es: "Diseñe escaleras profesionales específicas por rol que den a cada empleado un siguiente paso visible",
    },
    {
      en: "Implement stay interviews: quarterly 15-minute conversations that surface retention risks before they become resignations",
      es: "Implemente entrevistas de permanencia: conversaciones trimestrales que identifiquen riesgos de retención",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The True Cost of Turnover",
        es: "El Verdadero Costo de la Rotación",
      },
      body: {
        en: "Most FQHCs underestimate turnover cost. SHRM multipliers show: Medical Director = 2.0× annual salary to replace; Physician = 2.0×; RN = 1.5×; MA = 0.75×; CHW = 0.5×. A 200-person FQHC with 32% average turnover loses $4-6M annually to replacement costs. AltaMed proved that a dedicated retention structure (their Strategic Medical Director Unit) took Medical Director retention from 30% to 100%, saving $1-1.5M per leader. The question isn't 'Can we afford retention programs?' — it's 'Can we afford not to implement them?' Retention is the single fastest path to financial resilience.",
        es: "Los multiplicadores SHRM muestran: Director Médico = 2.0× salario anual para reemplazar; Médico = 2.0×; RN = 1.5×; MA = 0.75×; CHW = 0.5×. Un FQHC de 200 personas con rotación promedio del 32% pierde $4-6M anuales en costos de reemplazo. AltaMed demostró que una estructura de retención dedicada llevó la retención de Directores Médicos del 30% al 100%, ahorrando $1-1.5M por líder.",
      },
    },
    {
      heading: {
        en: "Career Ladders: The Retention Multiplier",
        es: "Escaleras Profesionales: El Multiplicador de Retención",
      },
      body: {
        en: "FQHCs with structured career progression programs have 2.4x the odds of minimal retention difficulty. A CHW should see a path: CHW → Care Coordinator → Program Manager → Director. An MA should see: MA → Senior MA → Clinical Trainer → Operations Manager. Each step requires different competencies, training, and compensation. The ladder doesn't have to be promotions only — lateral moves (MA to Care Coordinator) count too. The point: every employee knows their next step. When there's no visible progression, top performers leave for the hospital system that offers one.",
        es: "Los FQHCs con programas estructurados de progresión profesional tienen 2.4x las probabilidades de dificultad mínima de retención. Un CHW debería ver un camino: CHW → Coordinador de Atención → Gerente de Programa → Director. Cada paso requiere competencias diferentes, capacitación y compensación. La escalera no tiene que ser solo promociones — movimientos laterales también cuentan. El punto: cada empleado conoce su siguiente paso.",
      },
    },
    {
      heading: {
        en: "Stay Interviews: The Retention Canary",
        es: "Entrevistas de Permanencia: El Canario de Retención",
      },
      body: {
        en: "Exit interviews are too late — you already lost the person. Stay interviews are quarterly 15-minute conversations with your best performers: 'What keeps you here? What would make you leave? What's missing?' This surfaces retention risks 6-12 months before resignation. Implement a simple framework: (1) Ask open questions, (2) Listen without defending, (3) Document themes (compensation? burnout? no growth?), (4) Act on patterns. One FQHC discovered through stay interviews that three key RNs were leaving because they wanted to lead quality improvement projects — a low-cost fix that cost $2K in leadership training but retained $90K in replacement costs.",
        es: "Las entrevistas de salida son demasiado tarde — ya perdió a la persona. Las entrevistas de permanencia son conversaciones trimestrales de 15 minutos con sus mejores empleados: '¿Qué te mantiene aquí? ¿Qué te haría irte? ¿Qué falta?' Esto identifica riesgos de retención 6-12 meses antes de la renuncia.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m17-turnover-cost",
      questions: [
        {
          question: {
            en: "What is the SHRM replacement cost multiplier for a Medical Director?",
            es: "¿Cuál es el multiplicador de costo de reemplazo SHRM para un Director Médico?",
          },
          options: [
            {
              text: { en: "0.75× annual salary", es: "0.75× salario anual" },
              isCorrect: false,
              explanation: {
                en: "That's closer to MA or CHW replacement cost. Directors cost more.",
                es: "Eso se acerca más al costo de reemplazo de MA o CHW.",
              },
            },
            {
              text: { en: "1.5× annual salary", es: "1.5× salario anual" },
              isCorrect: false,
              explanation: {
                en: "That's for an RN. Medical Directors have higher replacement costs due to recruitment, onboarding, and knowledge transfer.",
                es: "Eso es para un RN. Los Directores Médicos tienen costos de reemplazo más altos.",
              },
            },
            {
              text: { en: "2.0× annual salary", es: "2.0× salario anual" },
              isCorrect: true,
              explanation: {
                en: "Correct — Medical Directors cost 2.0× to replace due to recruitment, relocation, training, and lost productivity.",
                es: "Correcto — Los Directores Médicos cuestan 2.0× para reemplazar debido al reclutamiento, capacitación y productividad perdida.",
              },
            },
            {
              text: { en: "3.0× annual salary", es: "3.0× salario anual" },
              isCorrect: false,
              explanation: {
                en: "That would be for a CEO. Medical Directors are 2.0×.",
                es: "Eso sería para un CEO. Los Directores Médicos son 2.0×.",
              },
            },
          ],
        },
        {
          question: {
            en: "What did AltaMed achieve through dedicated retention structure?",
            es: "¿Qué logró AltaMed a través de una estructura de retención dedicada?",
          },
          options: [
            {
              text: {
                en: "Increased Medical Director retention from 30% to 100%, saving $1-1.5M per leader",
                es: "Aumentó la retención de Directores Médicos del 30% al 100%, ahorrando $1-1.5M por líder",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — this is a real FQHC case study showing the ROI of retention investment",
                es: "Correcto — este es un estudio de caso de FQHC real que muestra el ROI de la inversión en retención",
              },
            },
            {
              text: { en: "Reduced turnover by 10% across all roles", es: "Reducir rotación en 10% en todos los roles" },
              isCorrect: false,
              explanation: {
                en: "The AltaMed result was much more dramatic — they achieved near-perfect retention for Medical Directors",
                es: "El resultado de AltaMed fue mucho más dramático — lograron retención casi perfecta",
              },
            },
            {
              text: { en: "Matched hospital salaries entirely", es: "Igualar salarios hospitalarios completamente" },
              isCorrect: false,
              explanation: {
                en: "Retention isn't just salary — AltaMed used structure, support, and career development",
                es: "La retención no es solo salario — AltaMed usó estructura, apoyo y desarrollo profesional",
              },
            },
            {
              text: { en: "Increased patient satisfaction by 25%", es: "Aumentar satisfacción del paciente en 25%" },
              isCorrect: false,
              explanation: {
                en: "While stable leadership improves satisfaction, this was AltaMed's specific turnover reduction achievement",
                es: "Si bien el liderazgo estable mejora la satisfacción, este fue el logro específico de AltaMed",
              },
            },
          ],
        },
        {
          question: {
            en: "What is the career ladder progression for a CHW?",
            es: "¿Cuál es la progresión de la escalera profesional para un CHW?",
          },
          options: [
            {
              text: {
                en: "CHW → Care Coordinator → Program Manager → Director",
                es: "CHW → Coordinador de Atención → Gerente de Programa → Director",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — this shows a clear progression path that gives CHWs visibility into growth opportunities",
                es: "Correcto — esto muestra un camino de progresión claro que da a los CHWs visibilidad en oportunidades de crecimiento",
              },
            },
            {
              text: { en: "CHW → MA → RN → Nurse Manager", es: "CHW → MA → RN → Gerente de Enfermería" },
              isCorrect: false,
              explanation: {
                en: "While some CHWs become MAs or RNs, the primary CHW ladder is through care coordination and program management",
                es: "Si bien algunos CHWs se convierten en MAs o RNs, la escalera primaria de CHW es a través de coordinación de cuidado",
              },
            },
            {
              text: { en: "CHW → Senior CHW (dead end)", es: "CHW → CHW Senior (callejón sin salida)" },
              isCorrect: false,
              explanation: {
                en: "A dead-end ladder creates retention problems. Best practices include clear pathways to advancement",
                es: "Una escalera sin salida crea problemas de retención. Las mejores prácticas incluyen caminos claros de avance",
              },
            },
            {
              text: { en: "Depends on each FQHC's structure", es: "Depende de la estructura de cada FQHC" },
              isCorrect: false,
              explanation: {
                en: "While structure varies, the CHW→Care Coordinator→Manager→Director path is the evidence-based standard",
                es: "Si bien la estructura varía, el camino CHW→Coordinador→Gerente→Director es el estándar basado en evidencia",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m17-stay-interview-questions",
      instruction: {
        en: "Identify which questions are effective for stay interviews",
        es: "Identifique cuáles preguntas son efectivas para entrevistas de permanencia",
      },
      items: [
        {
          text: {
            en: "'What keeps you here? What makes you stay?'",
            es: "'¿Qué te mantiene aquí? ¿Qué te hace quedarte?'",
          },
          isGood: true,
          explanation: {
            en: "Open-ended questions surface what's working — use this to double down on retention strengths",
            es: "Las preguntas abiertas revelan qué está funcionando — úsalas para reforzar fortalezas de retención",
          },
        },
        {
          text: {
            en: "'Why don't you just leave if you're not happy?'",
            es: "'¿Por qué no te vas si no estás feliz?'",
          },
          isGood: false,
          explanation: {
            en: "Defensive and accusatory. This closes conversation, not opens it.",
            es: "Defensiva y acusatoria. Esto cierra la conversación, no la abre.",
          },
        },
        {
          text: {
            en: "'What would make you leave? What's the deal-breaker?'",
            es: "'¿Qué te haría irte? ¿Cuál es el punto de quiebre?'",
          },
          isGood: true,
          explanation: {
            en: "Directly surfaces risks. If you know compensation is the issue, you can address it proactively.",
            es: "Identifica riesgos directamente. Si sabes que la compensación es el problema, puedes abordarlo proactivamente.",
          },
        },
        {
          text: {
            en: "'You're one of our best — are you happy here?'",
            es: "'Eres uno de nuestros mejores — ¿estás feliz aquí?'",
          },
          isGood: true,
          explanation: {
            en: "Affirmative framing that validates the employee and opens dialogue about fulfillment",
            es: "El marco afirmativo que valida al empleado y abre el diálogo sobre satisfacción",
          },
        },
        {
          text: {
            en: "'What's missing? What would you change if you could?'",
            es: "'¿Qué falta? ¿Qué cambiarías si pudieras?'",
          },
          isGood: true,
          explanation: {
            en: "Invites problem-solving and shows you're listening. This often reveals low-cost retention fixes.",
            es: "Invita a la resolución de problemas y muestra que estás escuchando. Esto a menudo revela soluciones de retención de bajo costo.",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
    {
      type: "concept-card",
      id: "m17-retention-concepts",
      cards: [
        {
          front: {
            en: "What is the odds improvement for FQHCs with career ladder programs?",
            es: "¿Cuál es la mejora de probabilidades para FQHCs con programas de escalera profesional?",
          },
          back: {
            en: "2.4× the odds of minimal retention difficulty when career progression is clear",
            es: "2.4× las probabilidades de dificultad mínima de retención cuando la progresión profesional es clara",
          },
          fqhcExample: {
            en: "An FQHC with visible CHW→Coordinator→Manager ladder retains 40% more CHWs than one with no progression path",
            es: "Un FQHC con una escalera CHW→Coordinador→Gerente visible retiene 40% más CHWs que uno sin camino de progresión",
          },
        },
        {
          front: {
            en: "When should you conduct stay interviews?",
            es: "¿Cuándo debería conducir entrevistas de permanencia?",
          },
          back: {
            en: "Quarterly with your top performers — 15 minutes per conversation surfaces risks 6-12 months before resignation",
            es: "Trimestralmente con sus mejores empleados — 15 minutos por conversación identifica riesgos 6-12 meses antes de renuncia",
          },
          fqhcExample: {
            en: "One FQHC discovered three RNs wanted to lead QI projects — cost $2K in training, saved $90K in replacement costs",
            es: "Un FQHC descubrió que tres RNs querían liderar proyectos de QI — costó $2K en capacitación, ahorró $90K en costos de reemplazo",
          },
        },
        {
          front: {
            en: "What is the replacement cost multiplier for an MA vs a Medical Director?",
            es: "¿Cuál es el multiplicador de costo de reemplazo para un MA vs Director Médico?",
          },
          back: {
            en: "MA = 0.75×; Medical Director = 2.0× — leadership positions cost 2.7× more to replace",
            es: "MA = 0.75×; Director Médico = 2.0× — posiciones de liderazgo cuestan 2.7× más para reemplazar",
          },
          fqhcExample: {
            en: "Retaining a Medical Director saves $200K–$300K vs replacing them; retaining an MA saves $5K–$10K",
            es: "Retener un Director Médico ahorra $200K–$300K vs reemplazarlo; retener un MA ahorra $5K–$10K",
          },
        },
      ],
      xpReward: 15,
    } as ConceptCardExercise,
  ],
  sourceMaterials: [
    { label: "HCAI: AltaMed SMDU — 30% to 100% MD Retention", url: "https://hcai.ca.gov/wp-content/uploads/2024/12/AltaMed-Presentation-Revised.pdf" },
    { label: "PMC: Career Ladders & 2.4x Retention Odds", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5120588/" },
    { label: "NACHC 2022 Workforce Survey", url: "https://www.nachc.org/wp-content/uploads/2022/03/NACHC-2022-Workforce-Survey-Full-Report-1.pdf" },
    { label: "SHRM: Turnover Cost Estimation Guide", url: "https://www.shrm.org/topics-tools/tools/toolkits/managing-employee-turnover" },
  ],
  totalXP: 60,
};

/* ================================================================== */
/*  Module 18: Financial Resilience Under Medicaid Cuts                */
/* ================================================================== */

const module18FinancialResilience: MasterclassCourseModule = {
  id: "financial-resilience-medicaid",
  order: 18,
  title: {
    en: "Financial Resilience Under Medicaid Cuts — A CFO's Survival Playbook",
    es: "Resiliencia Financiera Bajo Cortes de Medicaid — Manual de Supervivencia de un CFO",
  },
  subtitle: {
    en: "How to model, prepare for, and survive major Medi-Cal reimbursement cuts while protecting patient access and workforce stability",
    es: "Cómo modelar, prepararse para y sobrevivir cortes importantes de reembolso de Medi-Cal protegiendo el acceso del paciente y la estabilidad de la fuerza laboral",
  },
  description: {
    en: "Learn to build financial scenarios, optimize revenue cycles, identify non-Medicaid revenue streams, and prepare the board conversation.",
    es: "Aprenda a construir escenarios financieros, optimizar ciclos de ingresos, identificar flujos de ingresos no Medicaid, y preparar la conversación con la junta directiva.",
  },
  estimatedMinutes: 15,
  icon: "ShieldAlert",
  color: "red",
  category: "survival",
  learningObjectives: [
    {
      en: "Build 3 financial scenarios (optimistic, realistic, catastrophic) with specific trigger points",
      es: "Construya 3 escenarios financieros (optimista, realista, catastrófico) con puntos de activación específicos",
    },
    {
      en: "Calculate your center's Medicaid dependency ratio and model reimbursement reduction impact",
      es: "Calcule el ratio de dependencia de Medicaid de su centro y modele el impacto de reducción de reembolso",
    },
    {
      en: "Optimize your revenue cycle to reduce days in AR and achieve 95%+ clean claims rate",
      es: "Optimice su ciclo de ingresos para reducir días en AR y lograr tasa de reclamos limpios de 95%+",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The 2026-2028 Funding Cliff Convergence",
        es: "La Convergencia del Precipicio de Financiamiento 2026-2028",
      },
      body: {
        en: "$4.6B in CHCF (California Health Care Foundation) funding expires December 2026. H.R. 1 Medicaid cuts total $880B over 10 years. PPS elimination for undocumented patient services happens October 2026. Provider tax phase-down begins 2028. These converge to create the most dangerous financial environment in FQHC history. A single cliff is manageable — a convergence of four forces is a crisis. CFOs who survive 2026-2028 will have already built scenario models, diversified revenue, and optimized their revenue cycles.",
        es: "$4.6B en financiamiento CHCF expira en diciembre de 2026. Los recortes de Medicaid H.R. 1 totalizan $880B en 10 años. La eliminación de PPS para servicios de pacientes indocumentados ocurre en octubre de 2026. Los CFOs que sobrevivan 2026-2028 ya habrán construido modelos de escenarios, diversificado ingresos y optimizado ciclos de ingresos.",
      },
    },
    {
      heading: {
        en: "The Revenue Cycle Optimization Multiplier",
        es: "El Multiplicador de Optimización del Ciclo de Ingresos",
      },
      body: {
        en: "One FQHC went from 9 days cash on hand to 56 days cash through revenue cycle optimization alone — no clinical changes, no payer mix improvement. The levers: (1) Clean claim rate from 87% to 95%+ (reduce denials), (2) Days in AR from 52 to 38 (faster collection), (3) Underpayment appeals recovery ($50K-$200K annually), (4) Denials management (identify root causes), (5) Coding accuracy (avoid overpayment clawbacks). A $20M FQHC with 5% denial rate has $1M at risk annually. Fixing this alone doubles cash position.",
        es: "Un FQHC fue de 9 días de efectivo en mano a 56 días a través de la optimización del ciclo de ingresos por sí sola. Los mecanismos: (1) Tasa de reclamo limpio de 87% a 95%+, (2) Días en AR de 52 a 38, (3) Recuperación de apelaciones de subpago ($50K-$200K anualmente), (4) Gestión de denegaciones, (5) Precisión de codificación.",
      },
    },
    {
      heading: {
        en: "Non-Medicaid Revenue Diversification",
        es: "Diversificación de Ingresos No-Medicaid",
      },
      body: {
        en: "The most resilient FQHCs keep federal dependency below 30%. Get there with: (1) 340B program optimization ($100K-$500K annually), (2) Direct-pay services (STI testing, travel medicine, minor surgery), (3) Grant diversification (foundations, regional funders beyond Section 330), (4) Employer health contracts (on-site clinics), (5) Telehealth to underserved regions (charge commercial rates). None of these replace Medicaid, but each adds 5-15% revenue stability.",
        es: "Los FQHCs más resilientes mantienen la dependencia federal por debajo del 30%. Llegue allá con: (1) Optimización del programa 340B ($100K-$500K anuales), (2) Servicios de pago directo, (3) Diversificación de subvenciones, (4) Contratos de salud con empleadores, (5) Telesalud a regiones desatendidas.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m18-medicaid-cliff",
      questions: [
        {
          question: {
            en: "What four funding cliffs converge in 2026-2028?",
            es: "¿Cuáles son los cuatro precipicios de financiamiento que convergen en 2026-2028?",
          },
          options: [
            {
              text: { en: "CHCF expiration and Medicaid cuts only", es: "Solo expiración de CHCF y recortes de Medicaid" },
              isCorrect: false,
              explanation: {
                en: "There are four: CHCF expiration, H.R. 1 Medicaid cuts, PPS elimination for uninsured, and provider tax phase-down",
                es: "Hay cuatro: expiración de CHCF, recortes de Medicaid H.R. 1, eliminación de PPS para no asegurados y reducción de impuesto a proveedores",
              },
            },
            {
              text: {
                en: "CHCF expiration, H.R. 1 cuts, PPS elimination, and provider tax phase-down",
                es: "Expiración de CHCF, recortes H.R. 1, eliminación de PPS y reducción de impuesto a proveedores",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — these four forces converge to create the most dangerous financial environment in FQHC history",
                es: "Correcto — estas cuatro fuerzas convergen para crear el entorno financiero más peligroso en la historia de FQHC",
              },
            },
            {
              text: { en: "Just the CHCF expiration in December 2026", es: "Solo la expiración de CHCF en diciembre de 2026" },
              isCorrect: false,
              explanation: {
                en: "CHCF is one cliff, but there are three others hitting around the same time",
                es: "CHCF es un precipicio, pero hay otros tres golpeando alrededor del mismo tiempo",
              },
            },
            {
              text: { en: "Healthcare inflation and staffing shortages only", es: "Solo inflación de salud y escasez de personal" },
              isCorrect: false,
              explanation: {
                en: "While those are challenges, the specific funding cliffs are CHCF, H.R. 1, PPS, and provider tax phase-down",
                es: "Si bien esos son desafíos, los precipicios de financiamiento específicos son CHCF, H.R. 1, PPS y reducción de impuesto",
              },
            },
          ],
        },
        {
          question: {
            en: "What cash position improvement did one FQHC achieve through revenue cycle optimization?",
            es: "¿Qué mejora de posición de efectivo logró un FQHC a través de optimización del ciclo de ingresos?",
          },
          options: [
            {
              text: { en: "From 9 days to 56 days cash on hand", es: "De 9 días a 56 días de efectivo en mano" },
              isCorrect: true,
              explanation: {
                en: "Correct — and this was achieved WITHOUT clinical changes or payer mix improvements, just process optimization",
                es: "Correcto — y esto se logró SIN cambios clínicos o mejoras de mezcla de pagadores, solo optimización de procesos",
              },
            },
            {
              text: { en: "From 30 days to 45 days", es: "De 30 días a 45 días" },
              isCorrect: false,
              explanation: {
                en: "The actual improvement was more dramatic — 9 to 56 days shows the power of revenue cycle optimization",
                es: "La mejora real fue más dramática — 9 a 56 días muestra el poder de la optimización del ciclo de ingresos",
              },
            },
            {
              text: { en: "From 20 days to 30 days", es: "De 20 días a 30 días" },
              isCorrect: false,
              explanation: {
                en: "The documented case study showed 9 to 56 days — a much more significant improvement",
                es: "El estudio de caso documentado mostró 9 a 56 días — una mejora mucho más significativa",
              },
            },
            {
              text: { en: "From 45 days to 60 days", es: "De 45 días a 60 días" },
              isCorrect: false,
              explanation: {
                en: "The actual CPaMB case study showed 9 to 56 days cash on hand improvement",
                es: "El estudio de caso real de CPaMB mostró una mejora de 9 a 56 días de efectivo en mano",
              },
            },
          ],
        },
        {
          question: {
            en: "What is the target Medicaid dependency ratio for resilient FQHCs?",
            es: "¿Cuál es la razón de dependencia de Medicaid objetivo para FQHCs resilientes?",
          },
          options: [
            {
              text: { en: "Below 50%", es: "Por debajo del 50%" },
              isCorrect: false,
              explanation: {
                en: "Most FQHCs operate in the 50-70% range. The resilient goal is lower.",
                es: "La mayoría de FQHCs operan en el rango de 50-70%. El objetivo resiliente es más bajo.",
              },
            },
            {
              text: { en: "Below 30%", es: "Por debajo del 30%" },
              isCorrect: true,
              explanation: {
                en: "Correct — the most resilient FQHCs keep federal (Medicaid) dependency below 30% through revenue diversification",
                es: "Correcto — los FQHCs más resilientes mantienen la dependencia federal (Medicaid) por debajo del 30%",
              },
            },
            {
              text: { en: "Below 70%", es: "Por debajo del 70%" },
              isCorrect: false,
              explanation: {
                en: "70% is the current crisis level. Resilience requires getting below 30%.",
                es: "70% es el nivel de crisis actual. La resiliencia requiere estar por debajo del 30%.",
              },
            },
            {
              text: { en: "Zero — eliminate Medicaid dependency entirely", es: "Cero — eliminar dependencia de Medicaid por completo" },
              isCorrect: false,
              explanation: {
                en: "Medicaid is core to FQHC mission. Resilience is about diversification, not elimination.",
                es: "Medicaid es central para la misión FQHC. La resiliencia es sobre diversificación, no eliminación.",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m18-revenue-cycle-levers",
      instruction: {
        en: "Identify which are core revenue cycle optimization levers",
        es: "Identifique cuáles son los mecanismos principales de optimización del ciclo de ingresos",
      },
      items: [
        {
          text: {
            en: "Increasing clean claim rate from 87% to 95%+",
            es: "Aumentar la tasa de reclamo limpio de 87% a 95%+",
          },
          isGood: true,
          explanation: {
            en: "Every percentage point of denials = thousands in recovered revenue",
            es: "Cada punto porcentual de denegaciones = miles en ingresos recuperados",
          },
        },
        {
          text: {
            en: "Reducing days in AR from 52 to 38 days",
            es: "Reducir días en AR de 52 a 38 días",
          },
          isGood: true,
          explanation: {
            en: "Faster collection improves cash position — critical in financial uncertainty",
            es: "La recolección más rápida mejora la posición de efectivo — crítica en incertidumbre financiera",
          },
        },
        {
          text: {
            en: "Adding more clinical services to increase visit volume",
            es: "Agregar más servicios clínicos para aumentar volumen de visitas",
          },
          isGood: false,
          explanation: {
            en: "While visit volume matters, revenue cycle optimization focuses on capturing money from existing volume",
            es: "Si bien el volumen de visitas importa, la optimización del ciclo de ingresos se enfoca en capturar dinero del volumen existente",
          },
        },
        {
          text: {
            en: "Implementing underpayment appeals recovery process",
            es: "Implementar proceso de recuperación de apelaciones de subpago",
          },
          isGood: true,
          explanation: {
            en: "Identifying and appealing underpayments recovers $50K-$200K annually for mid-size FQHCs",
            es: "Identificar y apelar subpagos recupera $50K-$200K anuales para FQHCs de tamaño medio",
          },
        },
        {
          text: {
            en: "Improving coding accuracy to avoid overpayment clawbacks",
            es: "Mejorar la precisión de codificación para evitar recuperaciones de sobrepago",
          },
          isGood: true,
          explanation: {
            en: "Coding errors lead to audits, repayments, and damage to payer relationships",
            es: "Los errores de codificación conducen a auditorías, reembolsos y daño a relaciones con pagadores",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
    {
      type: "concept-card",
      id: "m18-resilience-concepts",
      cards: [
        {
          front: {
            en: "What is the primary source of cash improvement in revenue cycle optimization?",
            es: "¿Cuál es la fuente primaria de mejora de efectivo en la optimización del ciclo de ingresos?",
          },
          back: {
            en: "Capturing money from existing patient volume through reduced denials, faster collection, and appeals recovery",
            es: "Capturar dinero del volumen de pacientes existente a través de denegaciones reducidas, recolección más rápida y recuperación de apelaciones",
          },
          fqhcExample: {
            en: "One FQHC went from 87% to 95% clean claim rate + reduced AR days by 14 = doubled cash position",
            es: "Un FQHC fue de 87% a 95% tasa de reclamo limpio + redujo días de AR en 14 = duplicó posición de efectivo",
          },
        },
        {
          front: {
            en: "Name three non-Medicaid revenue diversification streams",
            es: "Nombre tres fuentes de diversificación de ingresos no-Medicaid",
          },
          back: {
            en: "340B program optimization, direct-pay services (STI testing, travel medicine), employer health contracts",
            es: "Optimización del programa 340B, servicios de pago directo (pruebas ITS, medicina de viajes), contratos de salud con empleadores",
          },
          fqhcExample: {
            en: "340B alone generates $100K-$500K annually; employer contracts add another $50K-$200K for on-site clinics",
            es: "340B solo genera $100K-$500K anuales; los contratos de empleadores agregan otro $50K-$200K para clínicas en sitio",
          },
        },
        {
          front: {
            en: "What does a 5% denial rate mean for a $20M FQHC revenue?",
            es: "¿Qué significa una tasa de denegación del 5% para ingresos de FQHC de $20M?",
          },
          back: {
            en: "$1M annually at risk — this money is already earned but not captured due to denials",
            es: "$1M anualmente en riesgo — este dinero ya se ha ganado pero no se captura debido a denegaciones",
          },
          fqhcExample: {
            en: "If you fix denials from 5% to 2%, that's $600K of found money without any clinical changes",
            es: "Si arreglas denegaciones de 5% a 2%, eso es $600K de dinero encontrado sin cambios clínicos",
          },
        },
      ],
      xpReward: 15,
    } as ConceptCardExercise,
  ],
  sourceMaterials: [
    { label: "CPaMB: FQHC Revenue Cycle Transformation (9 to 56 Days Cash)", url: "https://www.cpamedicalbilling.com/wp-content/uploads/2020/05/CPaMB-CaseStudy1.pdf" },
    { label: "KFF: CHC Financing — Medicaid & Section 330", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
    { label: "Commonwealth Fund: Financial Challenges Loom for CHCs", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
  ],
  totalXP: 60,
};

/* ================================================================== */
/*  Module 19: Salary Negotiation — Dual Perspective                   */
/* ================================================================== */

const module19SalaryNegotiation: MasterclassCourseModule = {
  id: "salary-negotiation-dual-perspective",
  order: 19,
  title: {
    en: "Salary Negotiation in FQHCs — The Guide Both Sides Need",
    es: "Negociación de Salarios en FQHCs — La Guía que Ambos Lados Necesitan",
  },
  subtitle: {
    en: "HR directors and candidates share the same constraints — PPS caps, SB 525 compliance, grant-funded ceilings — but each side has more leverage than they realize",
    es: "Los directores de RR.HH. y los candidatos comparten las mismas restricciones — límites PPS, cumplimiento SB 525, topes financiados por subvenciones — pero cada lado tiene más palanca de la que se da cuenta",
  },
  description: {
    en: "Understand FQHC compensation constraints, identify negotiation levers beyond base salary, and learn the 6 FQHC-specific compensation components.",
    es: "Comprenda las restricciones de compensación FQHC, identifique palancas de negociación más allá del salario base, y aprenda los 6 componentes de compensación específicos de FQHC.",
  },
  estimatedMinutes: 13,
  icon: "Scale",
  color: "cyan",
  category: "leadership",
  learningObjectives: [
    {
      en: "Understand the real FQHC compensation constraints: PPS rates, SB 525 compliance, grant caps",
      es: "Comprenda las restricciones reales de compensación FQHC: tasas PPS, cumplimiento SB 525, topes de subvenciones",
    },
    {
      en: "For HR/leaders: build total compensation strategy that competes without matching hospital salaries",
      es: "Para RR.HH./líderes: construir estrategia de compensación total que compita sin igualar salarios hospitalarios",
    },
    {
      en: "For candidates: identify the 6 FQHC-specific negotiation levers beyond base salary",
      es: "Para candidatos: identificar los 6 palancas de negociación específicas de FQHC más allá del salario base",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The FQHC Compensation Paradox",
        es: "La Paradoja de Compensación FQHC",
      },
      body: {
        en: "FQHCs can't match hospital base salaries — their revenue model doesn't allow it. But they can offer compensation that hospital systems can't: NHSC loan repayment ($25K-$50K), Federal Tort Claims Act coverage (free malpractice insurance), mission premium (emotional value of serving uninsured patients), SB 525 compliance positioning (you're ahead of the wave, not scrambling), bilingual differentials ($1-3/hr), and flexible schedules. A CHW with $40K in student loans who joins an NHSC-approved FQHC gets that debt forgiven in 2 years — that's $20K/year in value that never appears on the offer letter.",
        es: "Los FQHCs no pueden igualar salarios base hospitalarios — su modelo de ingresos no lo permite. Pero pueden ofrecer compensación que los sistemas hospitalarios no pueden: repago de préstamos NHSC ($25K-$50K), cobertura de Tort Reclamaciones Federales, prima de misión, posicionamiento de cumplimiento de SB 525, diferenciales bilingües ($1-3/hr), y horarios flexibles.",
      },
    },
    {
      heading: {
        en: "The 6 Negotiation Levers Beyond Base Salary",
        es: "Los 6 Palancas de Negociación Más Allá del Salario Base",
      },
      body: {
        en: "(1) NHSC Loan Repayment: $25K-$50K for eligible roles (CHW, RN, NP, MD). (2) Bilingual Premium: $1-3/hour for healthcare workers fluent in Spanish (massive value in California). (3) CME/Professional Development: $1,500-$3,000 annually. (4) CalAIM Bonus Potential: $5K-$15K for care managers meeting metrics. (5) FTCA Coverage: Peace of mind — you're covered if sued, unlike private practice. (6) Flexible Scheduling: This alone is worth $5K-$15K in quality of life, reducing burnout. A CHW offered $18/hr base + $2/hr bilingual + $25K NHSC eligible + flexible schedule hits the hospital's $22/hr offer.",
        es: "(1) Repago de Préstamos NHSC: $25K-$50K para roles elegibles. (2) Prima Bilingüe: $1-3/hora para trabajadores de salud fluidos en español. (3) Desarrollo Profesional CME: $1,500-$3,000 anuales. (4) Potencial de Bonos CalAIM: $5K-$15K. (5) Cobertura FTCA: Tranquilidad. (6) Horarios Flexibles.",
      },
    },
    {
      heading: {
        en: "Grant-Funded Roles: The Hidden Leverage",
        es: "Roles Financiados por Subvenciones: El Apalancamiento Oculto",
      },
      body: {
        en: "Many FQHC roles (CHW, Care Coordinator, Outreach Worker) have salary caps tied to grant budgets. HR can't simply 'go up' on base — but they can: (1) Reclassify the role to a higher grant band, (2) Shift funding sources (move $5K from admin budget to grant), (3) Create non-grant-funded stipends for specific skills (bilingual premium, specialty certification), (4) Offer productivity bonuses or program revenue-sharing. If a CHW role is capped at $20/hr by the grant budget, you can't go to $25. But if you can move $3/hr of the cost to a bilingual premium or $2/hr to a non-grant incentive fund, suddenly you're competitive.",
        es: "Muchos roles FQHC (CHW, Coordinador de Atención, Trabajador de Divulgación) tienen topes salariales vinculados a presupuestos de subvenciones. RR.HH. no puede simplemente 'subir' el salario base — pero pueden: (1) Reclasificar el rol a una banda de subvención más alta, (2) Cambiar fuentes de financiamiento, (3) Crear estipendios no financiados por subvenciones para habilidades específicas, (4) Ofrecer bonificaciones de productividad.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m19-nhsc-value",
      questions: [
        {
          question: {
            en: "How much is NHSC loan repayment worth annually for a CHW with $40K in student loans?",
            es: "¿Cuánto vale el repago de préstamos NHSC anualmente para un CHW con $40K en préstamos estudiantiles?",
          },
          options: [
            {
              text: { en: "$5K per year", es: "$5K por año" },
              isCorrect: false,
              explanation: {
                en: "$40K over 2 years = $20K per year in value, not $5K",
                es: "$40K en 2 años = $20K por año en valor, no $5K",
              },
            },
            {
              text: { en: "$10K per year", es: "$10K por año" },
              isCorrect: false,
              explanation: {
                en: "NHSC repays $40K over 2 years = $20K per year",
                es: "NHSC paga $40K en 2 años = $20K por año",
              },
            },
            {
              text: { en: "$20K per year in debt forgiveness", es: "$20K por año en perdón de deuda" },
              isCorrect: true,
              explanation: {
                en: "Correct — $40K debt forgiveness over 2 years = $20K/year value that never appears on the offer letter",
                es: "Correcto — $40K perdón de deuda en 2 años = $20K/año de valor que nunca aparece en la carta de oferta",
              },
            },
            {
              text: { en: "$30K per year", es: "$30K por año" },
              isCorrect: false,
              explanation: {
                en: "The math is $40K forgiven ÷ 2 years = $20K/year",
                es: "Las matemáticas son $40K perdonados ÷ 2 años = $20K/año",
              },
            },
          ],
        },
        {
          question: {
            en: "Which is NOT a lever for negotiating when a role has a grant-funded salary cap?",
            es: "¿Cuál NO es un palanca para negociar cuando un rol tiene un tope salarial financiado por subvención?",
          },
          options: [
            {
              text: { en: "Reclassify the role to a higher grant band", es: "Reclasificar el rol a una banda de subvención más alta" },
              isCorrect: false,
              explanation: {
                en: "This is a valid option — moving roles to higher-funded grant bands increases salary flexibility",
                es: "Esta es una opción válida — mover roles a bandas de subvención más financiadas aumenta flexibilidad salarial",
              },
            },
            {
              text: { en: "Add a bilingual premium outside the grant budget", es: "Agregar una prima bilingüe fuera del presupuesto de subvención" },
              isCorrect: false,
              explanation: {
                en: "This is valid — non-grant stipends can supplement grant-capped salaries",
                es: "Esto es válido — los estipendios no financiados por subvenciones pueden complementar salarios con tope de subvención",
              },
            },
            {
              text: { en: "Just unilaterally raise the base salary beyond the grant cap", es: "Simplemente aumentar unilateralmente el salario base más allá del tope de subvención" },
              isCorrect: true,
              explanation: {
                en: "Correct — this violates grant compliance. You must work within or around the cap, not violate it.",
                es: "Correcto — esto viola cumplimiento de subvención. Debe trabajar dentro o alrededor del tope, no violarlo.",
              },
            },
            {
              text: { en: "Offer productivity bonuses or program revenue-sharing", es: "Ofrecer bonificaciones de productividad o participación en ingresos del programa" },
              isCorrect: false,
              explanation: {
                en: "This is valid — variable compensation doesn't violate grant salary caps",
                es: "Esto es válido — la compensación variable no viola topes salariales de subvención",
              },
            },
          ],
        },
        {
          question: {
            en: "What is a realistic total compensation offer for a CHW facing a $22/hr hospital offer?",
            es: "¿Cuál es una oferta de compensación total realista para un CHW enfrentando una oferta hospitalaria de $22/hr?",
          },
          options: [
            {
              text: { en: "$18/hr base — can't compete", es: "$18/hr base — no puedo competir" },
              isCorrect: false,
              explanation: {
                en: "You're missing the non-base components. $18 + $2 bilingual + NHSC + flexible schedule = competitive",
                es: "Te estás perdiendo los componentes no base. $18 + $2 bilingüe + NHSC + horarios flexibles = competitivo",
              },
            },
            {
              text: {
                en: "$18/hr base + $2/hr bilingual + $25K NHSC + flexible schedule = competitive total",
                es: "$18/hr base + $2/hr bilingüe + $25K NHSC + horarios flexibles = total competitivo",
              },
              isCorrect: true,
              explanation: {
                en: "Correct — this totals $20/hr ($18 + $2), plus $25K loan repayment, plus schedule flexibility = beats $22/hr base",
                es: "Correcto — esto totaliza $20/hr ($18 + $2), más $25K repago de préstamos, más flexibilidad de horarios = supera base de $22/hr",
              },
            },
            {
              text: { en: "$24/hr base to match hospital", es: "$24/hr base para igualar hospital" },
              isCorrect: false,
              explanation: {
                en: "This would break grant budgets. Use non-base components instead.",
                es: "Esto rompería presupuestos de subvenciones. Usa componentes no base en su lugar.",
              },
            },
            {
              text: { en: "Can't compete with hospitals on compensation", es: "No puedo competir con hospitales en compensación" },
              isCorrect: false,
              explanation: {
                en: "This is wrong — FQHCs can compete through total comp, not just base salary",
                es: "Esto es incorrecto — los FQHCs pueden competir a través de compensación total, no solo salario base",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m19-comp-levers",
      instruction: {
        en: "Identify which are real FQHC compensation levers",
        es: "Identifique cuáles son palancas de compensación FQHC reales",
      },
      items: [
        {
          text: {
            en: "NHSC loan repayment ($25K-$50K for eligible roles)",
            es: "Repago de préstamos NHSC ($25K-$50K para roles elegibles)",
          },
          isGood: true,
          explanation: {
            en: "For candidates with student debt, this is highly valuable and hospital systems can't offer it",
            es: "Para candidatos con deuda estudiantil, esto es muy valioso y los sistemas hospitalarios no pueden ofrecerlo",
          },
        },
        {
          text: {
            en: "Bilingual premium ($1-3/hour for Spanish fluency)",
            es: "Prima bilingüe ($1-3/hora para fluidez en español)",
          },
          isGood: true,
          explanation: {
            en: "This adds $2K-$6K annually and is critical for California FQHCs serving Latino populations",
            es: "Esto suma $2K-$6K anuales y es crítico para FQHCs de California sirviendo poblaciones latinas",
          },
        },
        {
          text: {
            en: "Promising eventual CEO promotion to all new hires",
            es: "Prometer eventual promoción a CEO a todos los nuevos empleados",
          },
          isGood: false,
          explanation: {
            en: "This is not credible or feasible — use real levers that candidates can count on",
            es: "Esto no es creíble ni viable — usa palancas reales en las que los candidatos puedan contar",
          },
        },
        {
          text: {
            en: "Federal Tort Claims Act (FTCA) malpractice coverage",
            es: "Cobertura de responsabilidad civil por Tort Reclamaciones Federales (FTCA)",
          },
          isGood: true,
          explanation: {
            en: "FQHC staff are covered if sued, unlike private practice providers — this is valuable peace of mind",
            es: "El personal de FQHC está cubierto si son demandados, a diferencia de proveedores de práctica privada — esto es tranquilidad valiosa",
          },
        },
        {
          text: {
            en: "Flexible scheduling (4-day weeks, remote days, job-share options)",
            es: "Horarios flexibles (semanas de 4 días, días remotos, opciones de compartir trabajo)",
          },
          isGood: true,
          explanation: {
            en: "Worth $5K-$15K in quality of life and directly reduces burnout",
            es: "Vale $5K-$15K en calidad de vida y reduce directamente el agotamiento",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
    {
      type: "concept-card",
      id: "m19-salary-concepts",
      cards: [
        {
          front: {
            en: "Why can't FQHCs match hospital base salaries?",
            es: "¿Por qué los FQHCs no pueden igualar salarios base hospitalarios?",
          },
          back: {
            en: "FQHC revenue model is PPS-based with lower reimbursement; hospital model is fee-for-service with higher rates",
            es: "El modelo de ingresos FQHC se basa en PPS con reembolso más bajo; el modelo hospitalario es por servicio con tasas más altas",
          },
          fqhcExample: {
            en: "A hospital can bill $400-$600 per visit; an FQHC gets $225-$275 PPS flat rate — this funds salaries",
            es: "Un hospital puede facturar $400-$600 por visita; un FQHC obtiene tarifa plana PPS de $225-$275",
          },
        },
        {
          front: {
            en: "What makes NHSC loan repayment the #1 FQHC recruiting advantage?",
            es: "¿Qué hace que el repago de préstamos NHSC sea la ventaja de reclutamiento #1 de FQHC?",
          },
          back: {
            en: "Hospital systems cannot offer it — it's HRSA-funded and exclusive to designated health professional shortage areas served by FQHCs",
            es: "Los sistemas hospitalarios no pueden ofrecerlo — está financiado por HRSA y es exclusivo de áreas con escasez de profesionales de salud designadas servidas por FQHCs",
          },
          fqhcExample: {
            en: "An NP with $50K debt chooses FQHC offering NHSC eligibility over hospital at higher base salary",
            es: "Un NP con $50K deuda elige FQHC ofreciendo elegibilidad NHSC sobre hospital con salario base más alto",
          },
        },
        {
          front: {
            en: "How do non-grant stipends help when a role has a grant-funded salary cap?",
            es: "¿Cómo ayudan los estipendios no financiados por subvenciones cuando un rol tiene un tope salarial financiado por subvención?",
          },
          back: {
            en: "Grant salary caps only apply to grant-funded portion — you can add non-grant stipends (bilingual, performance, specialty) without violating compliance",
            es: "Los topes salariales de subvención solo se aplican a la porción financiada por subvención — puede agregar estipendios no financiados por subvención sin violar cumplimiento",
          },
          fqhcExample: {
            en: "CHW role capped at $20/hr by grant → add $2/hr bilingual + $1/hr specialty training from admin budget = $23/hr total",
            es: "Rol CHW limitado a $20/hr por subvención → agregar $2/hr bilingüe + $1/hr capacitación de especialidad = $23/hr total",
          },
        },
      ],
      xpReward: 15,
    } as ConceptCardExercise,
  ],
  sourceMaterials: [
    { label: "NHSC Loan Repayment Program — HRSA (2025 Award Amounts)", url: "https://nhsc.hrsa.gov/loan-repayment/nhsc-loan-repayment-program" },
    { label: "California SB 525 Healthcare Minimum Wage — HCAI Implementation", url: "https://hcai.ca.gov/workforce/sb-525/" },
    { label: "NACHC: CHC Workforce Compensation Survey", url: "https://www.nachc.org/topic/workforce/" },
    { label: "HRSA: Nurse Corps Loan Repayment Program", url: "https://bhw.hrsa.gov/funding/apply-scholarship-loan-repayment/nurse-corps" },
  ],
  totalXP: 60,
};

/* ================================================================== */
/*  Module 20: HIPAA at Scale                                          */
/* ================================================================== */

const module20HIPAAAtScale: MasterclassCourseModule = {
  id: "hipaa-at-scale",
  order: 20,
  title: {
    en: "HIPAA at Scale: From 1 Breach to 1,000 Notifications",
    es: "HIPAA a Escala: De 1 Violación a 1,000 Notificaciones",
  },
  subtitle: {
    en: "The true cost of data breaches — and how to prevent them",
    es: "El costo real de las filtraciones de datos — y cómo prevenirlas",
  },
  description: {
    en: "Conduct a HIPAA security risk assessment, build a breach response protocol, inventory all vendors handling PHI, and calculate the ROI of prevention vs. breach costs.",
    es: "Realice una evaluación de riesgo de seguridad HIPAA, construya un protocolo de respuesta a violaciones, haga un inventario de todos los vendedores que manejan PHI, y calcule el ROI de prevención versus costos de violación.",
  },
  estimatedMinutes: 14,
  icon: "Shield",
  color: "red",
  category: "compliance",
  learningObjectives: [
    {
      en: "Conduct a HIPAA security risk assessment using the HHS SRA Tool",
      es: "Realizar una evaluación de riesgos de seguridad HIPAA usando la Herramienta SRA del HHS",
    },
    {
      en: "Build a breach response protocol that meets the 60-day notification deadline",
      es: "Construir un protocolo de respuesta a violaciones que cumpla con el plazo de notificación de 60 días",
    },
    {
      en: "Inventory all vendors handling PHI and ensure BAA coverage",
      es: "Inventariar todos los proveedores que manejan PHI y asegurar cobertura de BAA",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The Cost of a Data Breach",
        es: "El Costo de una Violación de Datos",
      },
      body: {
        en: "A 1,000-patient breach costs $100K+ in notifications alone. Factor in credit monitoring, legal fees, reputation damage, and regulatory fines: $500K-$2M for a mid-size FQHC. Prevention costs $10-20K annually (MFA, encryption, backups). The ROI is 25:1 — prevention is vastly cheaper than response.",
        es: "Una violación de 1,000 pacientes cuesta $100K+ solo en notificaciones. Agregue monitoreo de crédito, honorarios legales, daño reputacional: $500K-$2M para un FQHC mediano. La prevención cuesta $10-20K anuales. El ROI es 25:1.",
      },
    },
    {
      heading: {
        en: "The 3 Layers of HIPAA Security",
        es: "Las 3 Capas de Seguridad HIPAA",
      },
      body: {
        en: "(1) Administrative: policies, training, workforce security. (2) Physical: access controls, workstation security, device disposal. (3) Technical: encryption, MFA, audit logs, firewalls. Most breaches stem from weak administrative controls — an employee downloads 500 records to their laptop without encryption, then the laptop is stolen. Air-gapped backups are your strongest defense against ransomware.",
        es: "(1) Administrativa: políticas, capacitación, seguridad de la fuerza laboral. (2) Física: controles de acceso, seguridad de estaciones de trabajo. (3) Técnica: encriptación, MFA, registros de auditoría. La mayoría de brechas provienen de controles administrativos débiles.",
      },
    },
    {
      heading: {
        en: "The BAA Audit: Your Vendor Risk Shield",
        es: "La Auditoría BAA: Tu Escudo de Riesgo de Proveedores",
      },
      body: {
        en: "Every vendor touching PHI needs a Business Associate Agreement (BAA). Missing BAA = automatic HIPAA violation if that vendor has a breach. Your EHR, billing system, claims manager, telehealth platform, cloud backup: all need BAAs. You should audit annually — request SOC 2 Type II reports from vendors to confirm their security posture.",
        es: "Todo proveedor que toque PHI necesita un Acuerdo de Asociado Comercial (BAA). BAA faltante = violación automática de HIPAA. Su EHR, sistema de facturación, plataforma de telehealth: todos necesitan BAAs. Debe auditar anualmente.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m20-breach-cost",
      questions: [
        {
          question: {
            en: "What's the average cost to notify patients in a 1,000-patient breach?",
            es: "¿Cuál es el costo promedio de notificar pacientes en una violación de 1,000 pacientes?",
          },
          options: [
            {
              text: { en: "$25K", es: "$25K" },
              isCorrect: false,
              explanation: {
                en: "Underestimated — notifications cost ~$100/patient for certified mail, credit monitoring setup",
                es: "Subestimado — las notificaciones cuestan ~$100/paciente",
              },
            },
            {
              text: { en: "$100K+", es: "$100K+" },
              isCorrect: true,
              explanation: {
                en: "Correct — plus legal, regulatory fines, reputation damage can hit $500K-$2M total",
                es: "Correcto — más legal, multas regulatorias puede alcanzar $500K-$2M total",
              },
            },
            {
              text: { en: "$500K", es: "$500K" },
              isCorrect: false,
              explanation: {
                en: "That's the lower bound of total breach cost, not just notifications",
                es: "Ese es el límite inferior del costo total de violación",
              },
            },
            {
              text: { en: "Less than $10K — minimal impact", es: "Menos de $10K — impacto mínimo" },
              isCorrect: false,
              explanation: {
                en: "Seriously underestimated — even small breaches trigger notification requirements",
                es: "Seriamente subestimado — incluso brechas pequeñas desencadenan requisitos de notificación",
              },
            },
          ],
        },
        {
          question: {
            en: "What's the single best defense against ransomware?",
            es: "¿Cuál es la mejor defensa contra ransomware?",
          },
          options: [
            {
              text: { en: "Antivirus software", es: "Software antivirus" },
              isCorrect: false,
              explanation: {
                en: "Necessary but not sufficient — attackers bypass antivirus daily",
                es: "Necesario pero no suficiente — atacantes eluden antivirus diariamente",
              },
            },
            {
              text: { en: "MFA (multi-factor authentication)", es: "MFA (autenticación multifactor)" },
              isCorrect: false,
              explanation: {
                en: "Critical for access control, but doesn't stop encryption-based ransomware",
                es: "Crítico para control de acceso, pero no detiene ransomware basado en encriptación",
              },
            },
            {
              text: { en: "Air-gapped backups (offline, separate network)", es: "Respaldos aislados (sin conexión, red separada)" },
              isCorrect: true,
              explanation: {
                en: "Correct — if attackers encrypt your data, you restore from offline backups and avoid paying ransom",
                es: "Correcto — si atacantes encriptan sus datos, restaura desde respaldos sin conexión",
              },
            },
            {
              text: { en: "Cyber insurance", es: "Seguro cibernético" },
              isCorrect: false,
              explanation: {
                en: "Good to have, but insurance is reactive — backups are proactive prevention",
                es: "Bueno de tener, pero seguros son reactivos — respaldos son prevención proactiva",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m20-baa-required",
      instruction: {
        en: "Which vendors need a Business Associate Agreement (BAA)?",
        es: "¿Cuáles proveedores necesitan un Acuerdo de Asociado Comercial (BAA)?",
      },
      items: [
        {
          text: {
            en: "EHR/Electronic Health Records system",
            es: "Sistema de EHR/Registros de Salud Electrónicos",
          },
          isGood: true,
          explanation: {
            en: "Direct access to PHI — BAA is mandatory",
            es: "Acceso directo a PHI — BAA es obligatorio",
          },
        },
        {
          text: {
            en: "Billing and claims management system",
            es: "Sistema de facturación y gestión de reclamaciones",
          },
          isGood: true,
          explanation: {
            en: "Handles patient financial data and medical codes — BAA required",
            es: "Maneja datos financieros del paciente — BAA requerido",
          },
        },
        {
          text: {
            en: "Office supply company (paper, pens, computers)",
            es: "Empresa de suministros de oficina",
          },
          isGood: false,
          explanation: {
            en: "No PHI access unless they store/process documents — if they do, BAA needed; if just shipping supplies, no",
            es: "Sin acceso a PHI a menos que almacenen/procesen documentos",
          },
        },
        {
          text: {
            en: "Cloud backup service for EHR data",
            es: "Servicio de respaldo en la nube para datos de EHR",
          },
          isGood: true,
          explanation: {
            en: "Stores PHI in cloud — BAA is critical for data protection",
            es: "Almacena PHI en la nube — BAA es crítico",
          },
        },
        {
          text: {
            en: "Telehealth platform (video visits, patient portal)",
            es: "Plataforma de telehealth (visitas por video)",
          },
          isGood: true,
          explanation: {
            en: "Transmits and stores PHI during video sessions and messaging — BAA required",
            es: "Transmite y almacena PHI durante sesiones de video — BAA requerido",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "HHS HIPAA Security Rule", url: "https://www.hhs.gov/hipaa/for-professionals/security/index.html" },
    { label: "HHS Security Risk Assessment Tool", url: "https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool" },
    { label: "HHS Breach Portal", url: "https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 21: OSV Survival Guide                                     */
/* ================================================================== */

const module21OSVSurvival: MasterclassCourseModule = {
  id: "osv-survival-guide",
  order: 21,
  title: {
    en: "The OSV Survival Guide: 19 Requirements, 90 Days to Prepare",
    es: "La Guía de Supervivencia OSV: 19 Requisitos, 90 Días para Prepararse",
  },
  subtitle: {
    en: "How to pass your HRSA Operational Site Visit — even on short notice",
    es: "Cómo pasar su Visita de Sitio Operativo HRSA — incluso con poco tiempo de aviso",
  },
  description: {
    en: "Self-assess against all 19 HRSA program requirements, prioritize remediation, build an evidence portfolio, and develop a 90-day sprint plan for OSV preparation.",
    es: "Auto-evalúese contra todos los 19 requisitos del programa HRSA, priorice la remediación, construya un portafolio de evidencia, y desarrolle un plan de sprint de 90 días para la preparación de OSV.",
  },
  estimatedMinutes: 15,
  icon: "CheckSquare",
  color: "blue",
  category: "compliance",
  learningObjectives: [
    {
      en: "Self-assess against all 19 HRSA program requirements",
      es: "Auto-evaluarse contra los 19 requisitos del programa HRSA",
    },
    {
      en: "Prioritize remediation: governance > clinical > financial > operational",
      es: "Priorizar remediación: gobernanza > clínico > financiero > operativo",
    },
    {
      en: "Build an evidence portfolio that passes audit on first review",
      es: "Construir un portafolio de evidencia que pase la auditoría en la primera revisión",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The 19 HRSA Requirements: The Blueprint",
        es: "Los 19 Requisitos HRSA: El Plano",
      },
      body: {
        en: "HRSA divides requirements into 5 categories: (1) Governance: Board composition (51% consumer), conflict-of-interest policies, meeting minutes. (2) Clinical: Credentialing, quality improvement, clinical protocols. (3) Financial: UDS reporting, cost allocation, sliding fee scales. (4) Access: Hours of operation, care continuity, emergency protocols. (5) Operational: HR policies, compliance training, record-keeping. Most FQHCs have 3-4 gaps. Common findings: incomplete credentialing files, missing QI documentation, board composition issues.",
        es: "HRSA divide requisitos en 5 categorías: (1) Gobernanza: composición de junta (51% consumidor), políticas de conflicto de intereses. (2) Clínico: acreditación, mejora de calidad. (3) Financiero: reportes de UDS, asignación de costos. (4) Acceso: horas de operación. (5) Operacional: políticas de HR.",
      },
    },
    {
      heading: {
        en: "The #1 Governance Finding: Board Composition",
        es: "El Hallazgo #1 de Gobernanza: Composición de Junta",
      },
      body: {
        en: "At least 51% of board members must be current patients of the FQHC. This is the top finding. You need annual patient status verification — if a board member moves out of service area, they're no longer eligible. Document patient status at hiring and annually. Create a simple patient status attestation form.",
        es: "Al menos 51% de los miembros de junta deben ser pacientes actuales. Este es el principal hallazgo. Necesita verificación anual de estado de paciente. Documente estado de paciente al contratación.",
      },
    },
    {
      heading: {
        en: "Clinical Documentation: The Hidden Cost",
        es: "Documentación Clínica: El Costo Oculto",
      },
      body: {
        en: "HRSA looks for: credentialing files (CV, licenses, malpractice history), delegated protocols (for NPs/PAs), QI activities (minutes, trends, action plans), and care continuity policies. Missing items in credentialing files is the #1 clinical finding. Audit your credentialing system now — pull 10 files, check completeness. Missing items take 30-60 days to collect.",
        es: "HRSA busca: archivos de acreditación, protocolos delegados, actividades de QI, políticas de continuidad de atención. Los elementos faltantes en archivos de acreditación son el hallazgo clínico #1.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m21-board-requirement",
      questions: [
        {
          question: {
            en: "What percentage of FQHC board members must be current patients?",
            es: "¿Qué porcentaje de miembros de junta FQHC deben ser pacientes actuales?",
          },
          options: [
            {
              text: { en: "25%", es: "25%" },
              isCorrect: false,
              explanation: {
                en: "Too low — HRSA requires at least 51% (majority)",
                es: "Demasiado bajo — HRSA requiere al menos 51%",
              },
            },
            {
              text: { en: "51%", es: "51%" },
              isCorrect: true,
              explanation: {
                en: "Correct — this is the #1 HRSA governance requirement",
                es: "Correcto — este es el requisito #1 de gobernanza HRSA",
              },
            },
            {
              text: { en: "75%", es: "75%" },
              isCorrect: false,
              explanation: {
                en: "HRSA doesn't require this high — 51% majority is the threshold",
                es: "HRSA no requiere tan alto — 51% es el umbral",
              },
            },
            {
              text: { en: "No requirement — it's voluntary", es: "Sin requisito — es voluntario" },
              isCorrect: false,
              explanation: {
                en: "It's mandatory — this is a core HRSA requirement",
                es: "Es obligatorio — este es un requisito principal de HRSA",
              },
            },
          ],
        },
        {
          question: {
            en: "Which OSV finding takes the longest to fix?",
            es: "¿Cuál hallazgo de OSV toma más tiempo para arreglarse?",
          },
          options: [
            {
              text: { en: "Missing board meeting minutes (1-2 weeks)", es: "Actas de reunión de junta faltantes (1-2 semanas)" },
              isCorrect: false,
              explanation: {
                en: "These are easier to compile — focus on harder gaps",
                es: "Estos son más fáciles de compilar",
              },
            },
            {
              text: { en: "Incomplete credentialing files (30-60 days)", es: "Archivos de acreditación incompletos (30-60 días)" },
              isCorrect: true,
              explanation: {
                en: "Collecting CVs, licenses, malpractice histories from providers takes time — start early",
                es: "Recopilar CVs, licencias, historiales de demandas de proveedores toma tiempo — comience temprano",
              },
            },
            {
              text: { en: "Fee schedule documentation (1 week)", es: "Documentación de escala de honorarios (1 semana)" },
              isCorrect: false,
              explanation: {
                en: "This is manageable quickly — focus on credentialing",
                es: "Esto es manejable rápidamente",
              },
            },
            {
              text: { en: "Board composition change (immediate)", es: "Cambio de composición de junta (inmediato)" },
              isCorrect: false,
              explanation: {
                en: "Board changes take time if you need to recruit new patient-members",
                es: "Los cambios de junta toman tiempo si necesita reclutar nuevos miembros pacientes",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m21-osv-categories",
      instruction: {
        en: "Which category do these OSV requirements fall into?",
        es: "¿En qué categoría caen estos requisitos de OSV?",
      },
      items: [
        {
          text: {
            en: "Board members must be 51% current patients",
            es: "Los miembros de junta deben ser 51% pacientes actuales",
          },
          isGood: true,
          explanation: {
            en: "Governance — this is core to FQHC democratic structure",
            es: "Gobernanza — esto es central para la estructura democrática FQHC",
          },
        },
        {
          text: {
            en: "All providers must have complete credentialing files",
            es: "Todos los proveedores deben tener archivos de acreditación completos",
          },
          isGood: true,
          explanation: {
            en: "Clinical — verifying provider qualifications is essential",
            es: "Clínico — verificar calificaciones del proveedor es esencial",
          },
        },
        {
          text: {
            en: "Sliding fee scales must be applied to uninsured patients",
            es: "Las escalas de honorarios deslizantes deben aplicarse a pacientes sin seguro",
          },
          isGood: true,
          explanation: {
            en: "Financial — access to care requires affordable fees",
            es: "Financiero — el acceso a la atención requiere honorarios asequibles",
          },
        },
        {
          text: {
            en: "FQHC must be open at least 40 hours per week",
            es: "El FQHC debe estar abierto al menos 40 horas por semana",
          },
          isGood: true,
          explanation: {
            en: "Access — hours of operation directly affect patient access",
            es: "Acceso — las horas de operación afectan directamente el acceso del paciente",
          },
        },
        {
          text: {
            en: "All staff must complete annual HIPAA training",
            es: "Todo el personal debe completar capacitación anual de HIPAA",
          },
          isGood: true,
          explanation: {
            en: "Operational/Compliance — staff training is a compliance requirement",
            es: "Operacional/Cumplimiento — la capacitación del personal es un requisito",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "HRSA Compliance Manual", url: "https://bphc.hrsa.gov/compliance/compliance-manual" },
    { label: "HRSA UDS Resources", url: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 22: Billing Compliance & Revenue Assurance                 */
/* ================================================================== */

const module22BillingCompliance: MasterclassCourseModule = {
  id: "billing-compliance-revenue-assurance",
  order: 22,
  title: {
    en: "Billing Compliance: From False Claims Risk to Revenue Assurance",
    es: "Cumplimiento de Facturación: Del Riesgo de Reclamaciones Falsas a la Garantía de Ingresos",
  },
  subtitle: {
    en: "How to maximize FQHC revenue without crossing compliance lines",
    es: "Cómo maximizar los ingresos FQHC sin cruzar los límites de cumplimiento",
  },
  description: {
    en: "Master FQHC-specific PPS billing rules, build a documentation audit process, understand False Claims Act liability, and implement coding accuracy programs.",
    es: "Domine las reglas de facturación PPS específicas de FQHC, construya un proceso de auditoría de documentación, comprenda la responsabilidad de la Ley de Reclamaciones Falsas, e implemente programas de precisión de codificación.",
  },
  estimatedMinutes: 16,
  icon: "DollarSign",
  color: "green",
  category: "compliance",
  learningObjectives: [
    {
      en: "Master FQHC-specific PPS billing rules (same-day, incident-to prohibition, modifiers)",
      es: "Dominar las reglas de facturación PPS específicas de FQHC",
    },
    {
      en: "Build a documentation audit process that catches errors before payers do",
      es: "Construir un proceso de auditoría de documentación que detecte errores antes que los pagadores",
    },
    {
      en: "Understand False Claims Act liability and whistleblower protections",
      es: "Entender la responsabilidad de la Ley de Reclamos Falsos",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The #1 FQHC Billing Error: Incident-To Billing",
        es: "El Error #1 de Facturación FQHC: Facturación Incidencia-A",
      },
      body: {
        en: "FQHCs CANNOT bill incident-to. This is the most common compliance failure. Incident-to allows physicians to bill for NP/PA work in private practices. FQHCs bill EVERY provider visit separately at PPS rate ($225-275). If an NP bills under physician 'incident-to,' that's a violation. Each provider bills their own visit. Know the difference.",
        es: "Los FQHC NO PUEDEN facturar incidencia-a. Este es el error más común. Incidencia-a permite que médicos facturen trabajo de NP/PA. Los FQHC facturen CADA visita de proveedor por separado a tasa PPS. Si un NP factura bajo 'incidencia-a' del médico, eso es una violación.",
      },
    },
    {
      heading: {
        en: "The Self-Disclosure Path: 90% Liability Reduction",
        es: "El Camino de Auto-Divulgación: Reducción del 90% de Responsabilidad",
      },
      body: {
        en: "If you discover a billing error (overpayment), self-disclose to the OIG immediately. One Bay Area FQHC discovered a $4.2M overpayment from 3 years of duplicate billing. Instead of waiting for an audit (and facing treble damages + $27,894 per false claim), they self-disclosed and settled for $302K. That's a 93% reduction. Self-disclosure shows compliance intent and protects your organization.",
        es: "Si descubre un error de facturación, auto-divulgue al OIG inmediatamente. Un FQHC descubrió un overpago de $4.2M. En lugar de esperar una auditoría, auto-divulgó y negoció $302K. Eso es una reducción del 93%.",
      },
    },
    {
      heading: {
        en: "The 5% Denial Rate Trap",
        es: "La Trampa de Tasa de Denegación del 5%",
      },
      body: {
        en: "A 5% denial rate is normal — but on $20M in annual revenue, that's $1M at risk. Every denial indicates a potential audit trigger. Implement a monthly coding audit: pull 10-15 random claims, verify medical necessity and coding accuracy. Catch errors before they cascade. Track denial trends by payer, by code, by provider — patterns reveal systemic issues.",
        es: "Una tasa de denegación del 5% es normal — pero en $20M de ingresos anuales, eso es $1M en riesgo. Cada denegación indica un posible desencadenante de auditoría. Implemente una auditoría de codificación mensual.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m22-incident-to",
      questions: [
        {
          question: {
            en: "Can an FQHC NP bill 'incident-to' a physician visit?",
            es: "¿Puede un NP de FQHC facturar 'incidencia-a' una visita del médico?",
          },
          options: [
            {
              text: { en: "Yes, if properly supervised", es: "Sí, si está supervisado apropiadamente" },
              isCorrect: false,
              explanation: {
                en: "No — incident-to is prohibited in FQHCs. Each provider bills their own visit at PPS rate.",
                es: "No — incidencia-a está prohibido en FQHCs. Cada proveedor factura su propia visita.",
              },
            },
            {
              text: { en: "No — FQHCs cannot bill incident-to", es: "No — Los FQHCs no pueden facturar incidencia-a" },
              isCorrect: true,
              explanation: {
                en: "Correct — this is a #1 FQHC billing compliance rule",
                es: "Correcto — esta es una regla #1 de cumplimiento de facturación FQHC",
              },
            },
            {
              text: { en: "Only if the physician bills directly", es: "Solo si el médico factura directamente" },
              isCorrect: false,
              explanation: {
                en: "No — billing structure doesn't change the rule",
                es: "No — la estructura de facturación no cambia la regla",
              },
            },
            {
              text: { en: "It depends on the payer", es: "Depende del pagador" },
              isCorrect: false,
              explanation: {
                en: "No — this is a CMS/FQHC PPS rule regardless of payer",
                es: "No — esta es una regla CMS/FQHC PPS independientemente del pagador",
              },
            },
          ],
        },
        {
          question: {
            en: "You discover a $500K overpayment from the last 2 years. What should you do?",
            es: "Descubre un overpago de $500K de los últimos 2 años. ¿Qué debe hacer?",
          },
          options: [
            {
              text: { en: "Hope the payer doesn't notice — say nothing", es: "Esperar que el pagador no note — no decir nada" },
              isCorrect: false,
              explanation: {
                en: "This will make it worse. When audited, you face treble damages (3x) + penalties.",
                es: "Esto lo hará peor. Cuando sea auditado, enfrenta daños triples (3x) + sanciones.",
              },
            },
            {
              text: { en: "Quietly refund the overpayment without disclosure", es: "Reembolsar silenciosamente el overpago sin divulgación" },
              isCorrect: false,
              explanation: {
                en: "Still violates compliance — you must formally self-disclose to OIG",
                es: "Aún viola cumplimiento — debe auto-divulgar formalmente al OIG",
              },
            },
            {
              text: { en: "Self-disclose to OIG immediately", es: "Auto-divulgar al OIG inmediatamente" },
              isCorrect: true,
              explanation: {
                en: "Correct — self-disclosure reduces exposure from $1.5M (treble) to ~$300K (settlement)",
                es: "Correcto — la auto-divulgación reduce la exposición del 90%+",
              },
            },
            {
              text: { en: "Wait for an audit and argue your position", es: "Esperar una auditoría y argumentar su posición" },
              isCorrect: false,
              explanation: {
                en: "This triggers maximum penalties — self-disclosure first",
                es: "Esto desencadena sanciones máximas — auto-divulgue primero",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m22-billing-red-flags",
      instruction: {
        en: "Which of these are billing compliance red flags?",
        es: "¿Cuáles son banderas rojas de cumplimiento de facturación?",
      },
      items: [
        {
          text: {
            en: "5%+ denial rate on claims",
            es: "Tasa de denegación del 5%+ en reclamaciones",
          },
          isGood: true,
          explanation: {
            en: "Indicates potential coding or documentation errors — investigate patterns",
            es: "Indica posibles errores de codificación — investigue patrones",
          },
        },
        {
          text: {
            en: "No monthly internal audit of coding accuracy",
            es: "Sin auditoría interna mensual de precisión de codificación",
          },
          isGood: true,
          explanation: {
            en: "You're flying blind — catch errors before payers do",
            es: "Estás volando a ciegas — detecta errores antes que los pagadores",
          },
        },
        {
          text: {
            en: "All claims documented same day as visit",
            es: "Todos los reclamos documentados el mismo día de la visita",
          },
          isGood: false,
          explanation: {
            en: "This is normal — providers should document contemporaneously",
            es: "Esto es normal — los proveedores deben documentar contemporáneamente",
          },
        },
        {
          text: {
            en: "No Business Associate Agreements with vendors",
            es: "Sin Acuerdos de Asociado Comercial con proveedores",
          },
          isGood: true,
          explanation: {
            en: "Compliance risk — every vendor handling PHI/claims needs BAA",
            es: "Riesgo de cumplimiento — cada proveedor que maneje PHI necesita BAA",
          },
        },
        {
          text: {
            en: "Providers billing visits at 99213 level for 90% of patients",
            es: "Proveedores facturando visitas en nivel 99213 para 90% de pacientes",
          },
          isGood: true,
          explanation: {
            en: "Pattern of identical coding is suspicious — justifiable variation should exist across patient complexity",
            es: "Patrón de codificación idéntica es sospechoso — variación justificable debe existir",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "CMS FQHC PPS Guide", url: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/FQHCPPS" },
    { label: "DOJ False Claims Act Statistics", url: "https://www.justice.gov/civil/fraud-statistics" },
    { label: "OIG Self-Disclosure Info", url: "https://oig.hhs.gov/compliance/self-disclosure-info/" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 23: 340B Compliance & Audit Prevention                     */
/* ================================================================== */

const module23340BCompliance: MasterclassCourseModule = {
  id: "340b-compliance-audit-prevention",
  order: 23,
  title: {
    en: "340B Program Compliance & Audit Prevention",
    es: "Cumplimiento del Programa 340B y Prevención de Auditorías",
  },
  subtitle: {
    en: "Protect your most valuable drug pricing benefit",
    es: "Proteja su beneficio de precios de medicamentos más valioso",
  },
  description: {
    en: "Define 340B eligible patients, prevent duplicate discounts, prepare for manufacturer audits, and evaluate contract pharmacy arrangements against HRSA guidance.",
    es: "Defina pacientes elegibles para 340B, prevenga descuentos duplicados, prepárese para auditorías de fabricantes, y evalúe los arreglos de farmacias contratadas contra la guía HRSA.",
  },
  estimatedMinutes: 14,
  icon: "Pill",
  color: "purple",
  category: "compliance",
  learningObjectives: [
    {
      en: "Define 340B eligible patients and implement verification processes",
      es: "Definir pacientes elegibles 340B e implementar procesos de verificación",
    },
    {
      en: "Prevent duplicate discounts through split billing or Medicaid exclusion files",
      es: "Prevenir descuentos duplicados a través de facturación dividida o archivos de exclusión de Medicaid",
    },
    {
      en: "Prepare for HRSA and manufacturer audits with monthly reconciliation",
      es: "Prepararse para auditorías de HRSA y fabricantes con reconciliación mensual",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "What is 340B? Your Pharmacy Lifeline",
        es: "¿Qué es 340B? Tu Línea de Vida de Farmacia",
      },
      body: {
        en: "The 340B Drug Pricing Program mandates that manufacturers provide 20-50% discounts on drugs purchased by FQHCs and safety-net providers. A drug costing $100 at retail might cost $50 under 340B — massive savings that fund operations. Some FQHCs generate $200K-$2M annually from 340B savings. Lose eligibility and you lose a critical revenue stream.",
        es: "El Programa 340B obliga a los fabricantes a proporcionar descuentos del 20-50% en medicamentos comprados por FQHCs. Un medicamento que cuesta $100 puede costar $50 bajo 340B. Algunos FQHCs generan $200K-$2M anuales de ahorros 340B.",
      },
    },
    {
      heading: {
        en: "The Duplicate Discount Trap",
        es: "La Trampa de Descuento Duplicado",
      },
      body: {
        en: "You CANNOT receive both a 340B discount AND a Medicaid rebate on the same prescription. This is a duplicate discount violation. Example: FQHC buys Drug X at 340B price ($50), patient has Medicaid, you bill Medicaid $100, Medicaid gives you a rebate. You've double-dipped. Monthly reconciliation prevents this: compare 340B invoices to Medicaid claims. One Bay Area FQHC was hit with $156K in repayments when auditors found duplicate discounts on diabetes medications.",
        es: "No PUEDE recibir un descuento 340B Y un reembolso de Medicaid en la misma receta. Esta es una violación de descuento duplicado. La reconciliación mensual previene esto.",
      },
    },
    {
      heading: {
        en: "Contract Pharmacy Arrangements: The #1 Audit Finding",
        es: "Arreglos de Farmacia Contratada: El Hallazgo #1 de Auditoría",
      },
      body: {
        en: "Many FQHCs use contract pharmacies to dispense 340B drugs. HRSA approved this, but the rules are strict: (1) Pharmacies must be on your list of authorized vendors. (2) You must verify patient 340B eligibility before dispensing. (3) Pharmacy must report discrepancies monthly. Missing these controls = audit finding. Have your contract pharmacy submit SOC 2 Type II reports annually.",
        es: "Muchos FQHCs usan farmacias contratadas para dispensar medicamentos 340B. Las reglas son estrictas: (1) Las farmacias deben estar en su lista de vendedores autorizados. (2) Debe verificar la elegibilidad 340B del paciente. (3) La farmacia debe reportar discrepancias mensualmente.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m23-duplicate-discount",
      questions: [
        {
          question: {
            en: "A patient with Medicaid gets a prescription through your 340B program. What's at risk?",
            es: "Un paciente con Medicaid obtiene una prescripción a través de su programa 340B. ¿Qué está en riesgo?",
          },
          options: [
            {
              text: { en: "Nothing — you can bill both 340B and Medicaid", es: "Nada — puede facturar tanto 340B como Medicaid" },
              isCorrect: false,
              explanation: {
                en: "This is a duplicate discount violation — you're taking the discount twice",
                es: "Esta es una violación de descuento duplicado — está tomando el descuento dos veces",
              },
            },
            {
              text: { en: "Duplicate discount liability — you must exclude the claim from Medicaid", es: "Responsabilidad de descuento duplicado — debe excluir el reclamo de Medicaid" },
              isCorrect: true,
              explanation: {
                en: "Correct — split billing or Medicaid exclusion prevents the violation",
                es: "Correcto — la facturación dividida o exclusión de Medicaid previene la violación",
              },
            },
            {
              text: { en: "The patient pays both prices", es: "El paciente paga ambos precios" },
              isCorrect: false,
              explanation: {
                en: "No — the issue is FQHC liability, not patient billing",
                es: "No — el problema es responsabilidad de FQHC, no facturación del paciente",
              },
            },
            {
              text: { en: "You lose 340B eligibility immediately", es: "Pierde elegibilidad 340B inmediatamente" },
              isCorrect: false,
              explanation: {
                en: "Not immediate, but repeated violations can result in program removal",
                es: "No inmediato, pero violaciones repetidas pueden resultar en remoción del programa",
              },
            },
          ],
        },
        {
          question: {
            en: "How often should you reconcile 340B and Medicaid claims?",
            es: "¿Con qué frecuencia debe reconciliar reclamaciones 340B y Medicaid?",
          },
          options: [
            {
              text: { en: "Annually", es: "Anualmente" },
              isCorrect: false,
              explanation: {
                en: "Too infrequent — errors accumulate. Monthly is the standard",
                es: "Muy infrecuente — los errores se acumulan. Mensual es el estándar",
              },
            },
            {
              text: { en: "Quarterly", es: "Trimestralmente" },
              isCorrect: false,
              explanation: {
                en: "Still too slow — one Bay Area FQHC had $156K in duplicates before discovery",
                es: "Aún demasiado lento — un FQHC tenía $156K en duplicados",
              },
            },
            {
              text: { en: "Monthly (non-negotiable)", es: "Mensualmente (innegociable)" },
              isCorrect: true,
              explanation: {
                en: "Correct — HRSA and manufacturers require monthly reconciliation",
                es: "Correcto — HRSA y fabricantes requieren reconciliación mensual",
              },
            },
            {
              text: { en: "Weekly (if budget allows)", es: "Semanalmente (si el presupuesto lo permite)" },
              isCorrect: false,
              explanation: {
                en: "Overly frequent — monthly is sufficient if automated",
                es: "Excesivamente frecuente — mensual es suficiente si está automatizado",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m23-340b-compliance",
      instruction: {
        en: "Which of these are proper 340B compliance controls?",
        es: "¿Cuáles son controles adecuados de cumplimiento 340B?",
      },
      items: [
        {
          text: {
            en: "Monthly reconciliation of 340B invoices vs. Medicaid claims",
            es: "Reconciliación mensual de facturas 340B vs. reclamaciones de Medicaid",
          },
          isGood: true,
          explanation: {
            en: "Catches duplicate discounts before auditors do",
            es: "Detecta descuentos duplicados antes que los auditores",
          },
        },
        {
          text: {
            en: "Verification that all contract pharmacies are on HRSA-approved list",
            es: "Verificación de que todas las farmacias contratadas están en la lista aprobada por HRSA",
          },
          isGood: true,
          explanation: {
            en: "Using unauthorized pharmacies is a compliance violation",
            es: "Usar farmacias no autorizadas es una violación de cumplimiento",
          },
        },
        {
          text: {
            en: "Patient 340B eligibility verified at point of dispensing",
            es: "Elegibilidad 340B del paciente verificada en punto de dispensación",
          },
          isGood: true,
          explanation: {
            en: "Prevents ineligible patients from accessing 340B pricing",
            es: "Previene que pacientes no elegibles accedan a precios 340B",
          },
        },
        {
          text: {
            en: "Annual audit of 340B compliance (once per year)",
            es: "Auditoría anual de cumplimiento 340B",
          },
          isGood: false,
          explanation: {
            en: "Too infrequent — monthly is the standard for early error detection",
            es: "Muy infrecuente — mensual es el estándar",
          },
        },
        {
          text: {
            en: "Contract pharmacies submit SOC 2 Type II security reports annually",
            es: "Farmacias contratadas presentan reportes de seguridad SOC 2 Tipo II anuales",
          },
          isGood: true,
          explanation: {
            en: "Verifies vendor security controls and operational reliability",
            es: "Verifica controles de seguridad y confiabilidad operativa del proveedor",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "HRSA 340B Program", url: "https://www.hrsa.gov/opa/340b-drug-pricing-program" },
    { label: "340B Drug Pricing Program Statute", url: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section256b" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 24: Reducing Workers Comp Costs                            */
/* ================================================================== */

const module24WorkersComp: MasterclassCourseModule = {
  id: "reducing-workers-comp-costs",
  order: 24,
  title: {
    en: "Reducing Workers Comp Costs: The FQHC Playbook",
    es: "Reduciendo Costos de Compensación de Trabajadores: El Manual FQHC",
  },
  subtitle: {
    en: "Back injuries, workplace violence, and needlestick injuries cost CA FQHCs $180K-$350K/year",
    es: "Las lesiones de espalda, la violencia en el lugar de trabajo y las lesiones por pinchazo de aguja cuestan a los FQHCs de CA $180K-$350K/año",
  },
  description: {
    en: "Identify top 3 injury types, implement prevention protocols, calculate ROI of safety investments, and develop EMR flagging systems for violence prevention.",
    es: "Identifique los 3 tipos principales de lesiones, implemente protocolos de prevención, calcule el ROI de inversiones en seguridad, y desarrolle sistemas de bandera EMR para prevención de violencia.",
  },
  estimatedMinutes: 13,
  icon: "Zap",
  color: "orange",
  category: "compliance",
  learningObjectives: [
    {
      en: "Identify the top 3 injury types at FQHCs and implement prevention protocols for each",
      es: "Identifique los 3 tipos principales de lesiones en FQHCs e implemente protocolos de prevención",
    },
    {
      en: "Calculate the ROI of ergonomic upgrades, de-escalation training, and sharps safety systems",
      es: "Calcule el ROI de mejoras ergonómicas, capacitación en des-escalada y sistemas de seguridad de punzocortantes",
    },
    {
      en: "Develop an EMR flagging system to identify high-risk patients and trigger violence prevention protocols",
      es: "Desarrolle un sistema de banderas EMR para identificar pacientes de alto riesgo",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The Big Three: Back Injuries, Needlestick, Workplace Violence",
        es: "Los Tres Grandes: Lesiones de Espalda, Pinchazo de Aguja, Violencia Laboral",
      },
      body: {
        en: "Back injuries (lifting, repetitive motion) account for 35% of FQHC workers comp claims. Needlestick injuries (11%) expose staff to bloodborne pathogen risk. Workplace violence (15%) is rising as FQHC patients increasingly experience mental health crises and substance use. Each back injury costs $8K-$15K in claims + lost productivity. Each needlestick = bloodborne pathogen testing ($500) + anxiety (incalculable). Each violence incident = worker stress leave (2-4 weeks) + replacement staffing. Total impact: $180K-$350K annually for a 100-person FQHC.",
        es: "Lesiones de espalda representan 35% de reclamaciones. Pinchazo de aguja 11%. Violencia laboral 15%. Cada lesión de espalda cuesta $8K-$15K. Costo total: $180K-$350K anuales.",
      },
    },
    {
      heading: {
        en: "Prevention Lever 1: Ergonomic Engineering",
        es: "Palanca de Prevención 1: Ingeniería Ergonómica",
      },
      body: {
        en: "Lift assists and proper workstations prevent back injuries. Install mobile lift equipment in exam rooms ($500-$1,500 per unit), provide standing desks for billing staff, train on proper lifting technique. One Central Coast FQHC installed 4 lift assists ($6,000) and prevented 8 back injuries in 2 years = $120K saved in claims. ROI: 20:1.",
        es: "Equipos de levantamiento y estaciones de trabajo adecuadas previenen lesiones de espalda. Un FQHC instaló 4 dispositivos de levantamiento ($6,000) y previno 8 lesiones en 2 años = $120K ahorrados. ROI: 20:1.",
      },
    },
    {
      heading: {
        en: "Prevention Lever 2: De-Escalation Training & Culture",
        es: "Palanca de Prevención 2: Capacitación en Des-Escalada y Cultura",
      },
      body: {
        en: "80% of violence can be prevented with early verbal intervention. Train staff on: recognizing escalation cues, verbal redirection, boundary-setting, environmental management. SB 553 mandates this. FQHCs with documented de-escalation programs see 40% fewer repeat incidents. Cost: $3K-$8K for annual training. Savings: 3-4 prevented incidents × $25K per incident = $75K-$100K.",
        es: "El 80% de la violencia puede prevenirse con intervención verbal temprana. Capacite personal en reconocimiento de escalada, redirección verbal. Los FQHC con programas documentados de des-escalada ven 40% menos incidentes repetidos. Costo: $3K-$8K. Ahorros: $75K-$100K.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m24-injury-costs",
      questions: [
        {
          question: {
            en: "Which injury type costs the most on average at FQHCs?",
            es: "¿Qué tipo de lesión cuesta más en promedio en los FQHCs?",
          },
          options: [
            {
              text: { en: "Needlestick injuries ($3K-$5K per incident)", es: "Lesiones por pinchazo ($3K-$5K por incidente)" },
              isCorrect: false,
              explanation: {
                en: "Needlestick is expensive but less frequent — back injuries are #1 overall cost",
                es: "El pinchazo de aguja es caro pero menos frecuente",
              },
            },
            {
              text: { en: "Back injuries ($8K-$15K per incident)", es: "Lesiones de espalda ($8K-$15K por incidente)" },
              isCorrect: true,
              explanation: {
                en: "Correct — back injuries are the highest-cost FQHC injury type",
                es: "Correcto — las lesiones de espalda son el tipo de lesión con mayor costo",
              },
            },
            {
              text: { en: "Workplace violence ($10K-$20K per incident)", es: "Violencia laboral ($10K-$20K por incidente)" },
              isCorrect: false,
              explanation: {
                en: "Violence is serious but less frequent — back injuries are more common and costly",
                es: "La violencia es seria pero menos frecuente",
              },
            },
            {
              text: { en: "All equal — depends on FQHC", es: "Todos iguales — depende del FQHC" },
              isCorrect: false,
              explanation: {
                en: "Data shows back injuries are consistently highest-cost",
                es: "Los datos muestran que las lesiones de espalda son constantemente las más costosas",
              },
            },
          ],
        },
        {
          question: {
            en: "What % of workplace violence can be prevented through de-escalation training?",
            es: "¿Qué % de violencia laboral puede prevenirse mediante capacitación en des-escalada?",
          },
          options: [
            {
              text: { en: "30%", es: "30%" },
              isCorrect: false,
              explanation: {
                en: "Lower than actual prevention rate",
                es: "Menor que la tasa real de prevención",
              },
            },
            {
              text: { en: "50%", es: "50%" },
              isCorrect: false,
              explanation: {
                en: "Still underestimated — research shows 80%+",
                es: "Aún subestimado — la investigación muestra 80%+",
              },
            },
            {
              text: { en: "80%", es: "80%" },
              isCorrect: true,
              explanation: {
                en: "Correct — early verbal intervention prevents 4 of 5 violent incidents",
                es: "Correcto — la intervención verbal temprana previene 4 de 5 incidentes violentos",
              },
            },
            {
              text: { en: "Can't prevent violence — always respond after", es: "No se puede prevenir — siempre responder después" },
              isCorrect: false,
              explanation: {
                en: "This is false — most violence is preventable with proper tools",
                es: "Esto es falso — la mayoría de la violencia es prevenible",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m24-prevention-investments",
      instruction: {
        en: "Which investments have strong ROI for workers comp cost reduction?",
        es: "¿Cuáles inversiones tienen ROI fuerte para reducción de costos de compensación de trabajadores?",
      },
      items: [
        {
          text: {
            en: "Lift assist equipment ($500-$1,500 per unit)",
            es: "Equipos de levantamiento asistido ($500-$1,500 por unidad)",
          },
          isGood: true,
          explanation: {
            en: "ROI 20:1 — prevents back injuries that cost $8K-$15K each",
            es: "ROI 20:1 — previene lesiones de espalda que cuestan $8K-$15K",
          },
        },
        {
          text: {
            en: "Annual de-escalation training for all staff ($3K-$8K)",
            es: "Capacitación anual en des-escalada para todo el personal ($3K-$8K)",
          },
          isGood: true,
          explanation: {
            en: "Prevents 80% of violence incidents — cost of 1 prevented incident pays for training",
            es: "Previene 80% de incidentes violentos — el costo de 1 prevención paga capacitación",
          },
        },
        {
          text: {
            en: "Sharps safety systems (needlestick prevention needles)",
            es: "Sistemas de seguridad de punzocortantes",
          },
          isGood: true,
          explanation: {
            en: "Reduces needlestick injuries — cost ~$500/incident + bloodborne pathogen testing",
            es: "Reduce lesiones por pinchazo — costo ~$500/incidente",
          },
        },
        {
          text: {
            en: "Security personnel 24/7 in waiting room",
            es: "Personal de seguridad 24/7 en sala de espera",
          },
          isGood: false,
          explanation: {
            en: "Very high cost ($150K+/year) — de-escalation training is more cost-effective",
            es: "Costo muy alto ($150K+/año) — capacitación en des-escalada es más rentable",
          },
        },
        {
          text: {
            en: "EMR flagging system for high-risk patients (free with EHR upgrade)",
            es: "Sistema de banderas EMR para pacientes de alto riesgo",
          },
          isGood: true,
          explanation: {
            en: "Triggers proactive violence prevention protocols — minimal cost, high impact",
            es: "Desencadena protocolos proactivos — costo mínimo, impacto alto",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "Cal/OSHA: Healthcare Worker Safety Resources", url: "https://www.dir.ca.gov/dosh/puborder.asp" },
    { label: "BLS: Nonfatal Occupational Injury & Illness Rates (Healthcare)", url: "https://www.bls.gov/iif/oshsum.htm#healthcare" },
    { label: "California Department of Industrial Relations: SB 553 Guidelines", url: "https://www.dir.ca.gov/dosh/workplace-violence-prevention-in-healthcare.html" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 25: Preventing Workplace Violence                          */
/* ================================================================== */

const module25WorkplaceViolence: MasterclassCourseModule = {
  id: "preventing-workplace-violence",
  order: 25,
  title: {
    en: "Preventing Workplace Violence in Healthcare",
    es: "Prevención de Violencia en el Lugar de Trabajo en Salud",
  },
  subtitle: {
    en: "Healthcare workers are 5x more likely to experience workplace violence than workers in other industries",
    es: "Los trabajadores de salud tienen 5 veces más probabilidades de experimentar violencia en el lugar de trabajo que trabajadores en otras industrias",
  },
  description: {
    en: "Understand the 3 types of workplace violence, teach de-escalation techniques, build a SB 553-compliant violence prevention plan, and create clear reporting pathways.",
    es: "Comprenda los 3 tipos de violencia laboral, enseñe técnicas de des-escalada, construya un plan de prevención de violencia conforme a SB 553, y cree caminos de reporte claros.",
  },
  estimatedMinutes: 15,
  icon: "AlertTriangle",
  color: "red",
  category: "compliance",
  learningObjectives: [
    {
      en: "Understand the 3 types of workplace violence and how they differ by healthcare setting",
      es: "Comprenda los 3 tipos de violencia laboral y cómo difieren por entorno de salud",
    },
    {
      en: "Teach de-escalation techniques: verbal redirection, boundary-setting, environmental management",
      es: "Enseñe técnicas de des-escalada: redirección verbal, establecimiento de límites",
    },
    {
      en: "Build a SB 553-compliant violence prevention plan with risk assessment, policies, and staff training",
      es: "Construya un plan de prevención de violencia conforme a SB 553",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The 3 Types of Workplace Violence",
        es: "Los 3 Tipos de Violencia Laboral",
      },
      body: {
        en: "(1) Criminal intent (robbery, assault during crime): Low frequency in FQHCs. (2) Patient/customer-initiated (angry patient, substance intoxication, mental health crisis): Most common. (3) Worker-on-worker (bullying, harassment): Rising. FQHCs see mostly Type 2 — patients in crisis, homeless individuals, people with substance use disorder, mental health emergencies. These patients need compassion AND safety protocols.",
        es: "(1) Intención criminal: baja frecuencia. (2) Iniciado por paciente/cliente: más común. (3) Trabajador-sobre-trabajador: creciente. Los FQHCs ven principalmente Tipo 2 — pacientes en crisis, personas con trastorno de uso de sustancias.",
      },
    },
    {
      heading: {
        en: "De-Escalation: The Learned Skill That Saves Lives",
        es: "Des-Escalada: La Habilidad Aprendida Que Salva Vidas",
      },
      body: {
        en: "De-escalation is NOT just saying 'calm down.' It's: (1) Recognizing early signs of escalation (voice tone, body language, personal space). (2) Verbal redirection ('I want to help you, let's sit down'). (3) Boundary-setting ('I can help with X, but not Y'). (4) Environmental management (moving to private space, removing potential weapons). 80% of violence incidents can be prevented with these skills. Train all staff annually.",
        es: "De-escalada NO es solo decir 'cálmate.' Es: (1) Reconocer signos tempranos. (2) Redirección verbal. (3) Establecimiento de límites. (4) Gestión ambiental. El 80% puede prevenirse. Capacite personal anualmente.",
      },
    },
    {
      heading: {
        en: "SB 553 Compliance: The Legal Baseline",
        es: "Cumplimiento de SB 553: La Línea Base Legal",
      },
      body: {
        en: "California SB 553 (2023) mandates that all healthcare employers have: (1) Written violence prevention plan. (2) Hazard assessment. (3) Policies for reporting, investigation, and follow-up. (4) Staff training (minimum 2 hours/year). (5) Procedures and equipment for emergency response. This isn't optional. Non-compliance = Cal/OSHA citation + workers comp premium increase. FQHCs with documented plans pay 15-25% lower premiums.",
        es: "SB 553 (2023) ordena: (1) Plan escrito. (2) Evaluación de peligros. (3) Políticas de reporte. (4) Capacitación de personal (2 horas mínimo/año). (5) Procedimientos para emergencias. No es opcional. Los FQHC con planes documentados pagan primas 15-25% más bajas.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m25-escalation-signs",
      questions: [
        {
          question: {
            en: "Which is an early sign of escalation you should recognize?",
            es: "¿Cuál es un signo temprano de escalación que debe reconocer?",
          },
          options: [
            {
              text: { en: "Patient yelling loudly — immediately call security", es: "Paciente gritando — llame inmediatamente a seguridad" },
              isCorrect: false,
              explanation: {
                en: "By this point escalation is advanced — catch it earlier",
                es: "En este punto la escalación está avanzada — detectarla antes",
              },
            },
            {
              text: { en: "Change in voice tone (from calm to terse), stepping closer to your space", es: "Cambio en tono de voz, pisar más cerca" },
              isCorrect: true,
              explanation: {
                en: "Correct — these are early signals before yelling. De-escalate now.",
                es: "Correcto — estas son señales tempranas. Des-escalade ahora.",
              },
            },
            {
              text: { en: "Patient sitting quietly — not a threat", es: "Paciente sentado silenciosamente — no es amenaza" },
              isCorrect: false,
              explanation: {
                en: "Not necessarily — some people escalate without visible warning. Stay alert.",
                es: "No necesariamente — algunas personas escalan sin advertencia visible",
              },
            },
            {
              text: { en: "Patient clenching fists and pacing", es: "Paciente cerrando puños y paseándose" },
              isCorrect: false,
              explanation: {
                en: "This is mid-to-late escalation — should have de-escalated earlier",
                es: "Esta es escalación media a tardía — debe haber des-escalado antes",
              },
            },
          ],
        },
        {
          question: {
            en: "What's the minimum annual training requirement under SB 553?",
            es: "¿Cuál es el requisito mínimo de capacitación anual bajo SB 553?",
          },
          options: [
            {
              text: { en: "30 minutes", es: "30 minutos" },
              isCorrect: false,
              explanation: {
                en: "Too short — SB 553 requires minimum 2 hours",
                es: "Muy corto — SB 553 requiere mínimo 2 horas",
              },
            },
            {
              text: { en: "1 hour", es: "1 hora" },
              isCorrect: false,
              explanation: {
                en: "Still short — minimum is 2 hours/year",
                es: "Aún corto — mínimo es 2 horas/año",
              },
            },
            {
              text: { en: "2 hours per year (minimum)", es: "2 horas por año (mínimo)" },
              isCorrect: true,
              explanation: {
                en: "Correct — SB 553 mandates minimum 2 hrs/year violence prevention training",
                es: "Correcto — SB 553 ordena mínimo 2 hrs/año",
              },
            },
            {
              text: { en: "8 hours per year", es: "8 horas por año" },
              isCorrect: false,
              explanation: {
                en: "Good practice but not required — 2 hours is the minimum",
                es: "Buena práctica pero no requerida — 2 horas es el mínimo",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m25-sb553-requirements",
      instruction: {
        en: "Which of these are required by SB 553?",
        es: "¿Cuáles de estos son requeridos por SB 553?",
      },
      items: [
        {
          text: {
            en: "Written violence prevention plan",
            es: "Plan escrito de prevención de violencia",
          },
          isGood: true,
          explanation: {
            en: "SB 553 requires written plan",
            es: "SB 553 requiere plan escrito",
          },
        },
        {
          text: {
            en: "Hazard assessment (identifying areas/situations with high violence risk)",
            es: "Evaluación de peligros",
          },
          isGood: true,
          explanation: {
            en: "Assessment is mandatory to identify problem areas",
            es: "La evaluación es obligatoria para identificar áreas problemáticas",
          },
        },
        {
          text: {
            en: "Staff training minimum 2 hours/year on de-escalation and reporting",
            es: "Capacitación de personal mínimo 2 horas/año",
          },
          isGood: true,
          explanation: {
            en: "SB 553 explicitly requires 2-hour minimum annual training",
            es: "SB 553 explícitamente requiere capacitación mínima anual de 2 horas",
          },
        },
        {
          text: {
            en: "Security personnel stationed in all waiting rooms",
            es: "Personal de seguridad en todas las salas de espera",
          },
          isGood: false,
          explanation: {
            en: "Not required — FQHCs can meet SB 553 through training and procedures",
            es: "No requerido — los FQHCs pueden cumplir con SB 553 mediante capacitación",
          },
        },
        {
          text: {
            en: "Procedures and equipment for emergency response",
            es: "Procedimientos y equipos para respuesta de emergencia",
          },
          isGood: true,
          explanation: {
            en: "SB 553 requires emergency response procedures and tools",
            es: "SB 553 requiere procedimientos y herramientas de respuesta de emergencia",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "California SB 553: Workplace Violence Prevention for Healthcare", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB553" },
    { label: "Cal/OSHA Standards for Workplace Violence Prevention", url: "https://www.dir.ca.gov/dosh/workplace-violence.html" },
    { label: "NIOSH Workplace Violence Prevention Resources", url: "https://www.cdc.gov/niosh/topics/violence/default.html" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 26: Building Safety Culture                                */
/* ================================================================== */

const module26SafetyCulture: MasterclassCourseModule = {
  id: "building-safety-culture",
  order: 26,
  title: {
    en: "Building a Safety Culture: From Reactive to Proactive",
    es: "Construyendo una Cultura de Seguridad: De Reactivo a Proactivo",
  },
  subtitle: {
    en: "Most FQHCs respond to incidents. Great FQHCs prevent them. Learn how to build a culture where safety ownership is everyone's job.",
    es: "La mayoría de los FQHCs responden a incidentes. Los grandes FQHCs los previenen. Aprenda cómo construir una cultura donde la responsabilidad de seguridad es trabajo de todos.",
  },
  description: {
    en: "Understand IIPP requirements, build a safety committee with frontline representation, shift to leading indicators, and create a non-punitive near-miss reporting system.",
    es: "Comprenda los requisitos IIPP, construya un comité de seguridad con representación de primera línea, cambie a indicadores principales, y cree un sistema de reporte de casi-accidentes no punitivo.",
  },
  estimatedMinutes: 14,
  icon: "Shield",
  color: "green",
  category: "leadership",
  learningObjectives: [
    {
      en: "Understand IIPP requirements: written plan, hazard assessment, training, worker participation, and continuous improvement",
      es: "Comprenda los requisitos de IIPP",
    },
    {
      en: "Build a safety committee with frontline representation and empower them to identify hazards",
      es: "Construya un comité de seguridad con representación de primera línea",
    },
    {
      en: "Shift from lagging indicators (injuries per month) to leading indicators (near-miss reports, safety audits)",
      es: "Cambie de indicadores de retraso a indicadores principales",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Safety Culture Is Built Top-Down",
        es: "La Cultura de Seguridad Se Construye De Arriba Hacia Abajo",
      },
      body: {
        en: "CEOs who visibly prioritize safety — attend safety meetings, enforce protocols, celebrate improvements — create 50% fewer incidents. Safety culture isn't a poster on the wall. It's leadership saying 'we will not sacrifice safety for productivity.' When an MA reports a near-miss, the response is 'thank you for speaking up,' not 'why are you slowing us down?' This messaging cascades.",
        es: "Los CEOs que priorizan visiblemente la seguridad crean 50% menos incidentes. No es un póster en la pared. Es el liderazgo diciendo 'no sacrificaremos seguridad por productividad.' Cuando un MA reporta incidente cercano, la respuesta es 'gracias por hablar', no 'por qué nos ralentizas?'",
      },
    },
    {
      heading: {
        en: "Near-Miss Reporting: Learning Without Paying the Price",
        es: "Reporte de Incidentes Cercanos: Aprender Sin Pagar el Precio",
      },
      body: {
        en: "A near-miss is an event that could have caused harm but didn't. Example: an employee trips on a cord but catches themselves before falling. Near-miss reporting is more valuable than injury reporting — you learn the hazard without bearing the cost. One Mid-Valley FQHC implemented monthly near-miss discussions. They discovered that 40% of 'close calls' were electrical cord hazards. They relocated cords and prevented falls. FQHCs going from 12 injuries/year to 1 injury/year in 3 years use near-miss reporting systematically.",
        es: "Un incidente cercano es un evento que podría haber causado daño pero no lo hizo. El reporte de incidentes cercanos es más valioso que el reporte de lesiones — aprendes el peligro sin pagar el precio. Un FQHC fue de 12 lesiones/año a 1 lesión/año en 3 años usando reporte de incidentes cercanos sistemáticamente.",
      },
    },
    {
      heading: {
        en: "Leading vs. Lagging Indicators",
        es: "Indicadores Principales vs. De Retraso",
      },
      body: {
        en: "Lagging indicator: number of injuries last month. By then it's too late — someone is already hurt. Leading indicator: near-miss reports submitted, safety audits completed, training hours delivered. These predict future injury rates. FQHCs that track leading indicators (not just lagging) spot hazards before they cause injury. Target: 1 near-miss report per 10 employees per month. If you're not seeing near-misses, your culture isn't reporting them.",
        es: "Indicador de retraso: número de lesiones el mes pasado. Demasiado tarde. Indicador principal: reportes de incidentes cercanos, auditorías de seguridad completadas. Estos predicen tasas futuras de lesiones. Los FQHC que rastrean indicadores principales (no solo de retraso) detectan peligros antes de causar lesión.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m26-safety-culture",
      questions: [
        {
          question: {
            en: "What does a CEO do to build safety culture?",
            es: "¿Qué hace un CEO para construir una cultura de seguridad?",
          },
          options: [
            {
              text: { en: "Delegates all safety work to HR", es: "Delega todo el trabajo de seguridad a RR.HH." },
              isCorrect: false,
              explanation: {
                en: "This sends the wrong message — CEO involvement is critical",
                es: "Esto envía el mensaje equivocado — la participación del CEO es crítica",
              },
            },
            {
              text: { en: "Attends safety meetings, enforces protocols visibly, celebrates improvements", es: "Asiste a reuniones de seguridad, hace cumplir protocolos, celebra mejoras" },
              isCorrect: true,
              explanation: {
                en: "Correct — visible CEO commitment creates 50% fewer incidents",
                es: "Correcto — el compromiso visible del CEO crea 50% menos incidentes",
              },
            },
            {
              text: { en: "Requires perfect safety record with zero reporting", es: "Requiere registro perfecto de seguridad sin reporte" },
              isCorrect: false,
              explanation: {
                en: "This discourages reporting — you want MORE near-miss reports",
                es: "Esto desalienta el reporte — quieres MÁS reportes de incidentes cercanos",
              },
            },
            {
              text: { en: "Posts safety posters in common areas", es: "Publica carteles de seguridad en áreas comunes" },
              isCorrect: false,
              explanation: {
                en: "Posters alone don't change culture — actions matter",
                es: "Los carteles solos no cambian la cultura — las acciones importan",
              },
            },
          ],
        },
        {
          question: {
            en: "Why is near-miss reporting more valuable than injury reporting?",
            es: "¿Por qué el reporte de incidentes cercanos es más valioso que el reporte de lesiones?",
          },
          options: [
            {
              text: { en: "It's faster to report near-misses", es: "Es más rápido reportar incidentes cercanos" },
              isCorrect: false,
              explanation: {
                en: "Speed isn't the point — value is about prevention",
                es: "La velocidad no es el punto — el valor es sobre prevención",
              },
            },
            {
              text: { en: "You learn the hazard without bearing the human and financial cost", es: "Aprendes el peligro sin pagar el costo humano y financiero" },
              isCorrect: true,
              explanation: {
                en: "Correct — near-miss = free safety lesson. Injury = $8K-$15K + pain.",
                es: "Correcto — incidente cercano = lección de seguridad gratis. Lesión = $8K-$15K + dolor.",
              },
            },
            {
              text: { en: "Near-misses are easier to investigate", es: "Los incidentes cercanos son más fáciles de investigar" },
              isCorrect: false,
              explanation: {
                en: "Investigations are similar — the value is in learning without injury",
                es: "Las investigaciones son similares — el valor es aprender sin lesión",
              },
            },
            {
              text: { en: "Workers are more likely to report near-misses than injuries", es: "Es más probable que los trabajadores reporten incidentes cercanos que lesiones" },
              isCorrect: false,
              explanation: {
                en: "Actually workers often hide injuries — near-misses aren't underreported",
                es: "En realidad los trabajadores a menudo ocultan lesiones",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m26-leading-lagging",
      instruction: {
        en: "Classify these as leading or lagging safety indicators",
        es: "Clasifique estos como indicadores de seguridad principales o de retraso",
      },
      items: [
        {
          text: {
            en: "Number of injuries last month",
            es: "Número de lesiones el mes pasado",
          },
          isGood: false,
          explanation: {
            en: "Lagging indicator — by then someone is already hurt",
            es: "Indicador de retraso — para entonces alguien ya está herido",
          },
        },
        {
          text: {
            en: "Near-miss reports submitted this month",
            es: "Reportes de incidentes cercanos presentados este mes",
          },
          isGood: true,
          explanation: {
            en: "Leading indicator — reveals hazards BEFORE injury",
            es: "Indicador principal — revela peligros ANTES de lesión",
          },
        },
        {
          text: {
            en: "Days since last injury",
            es: "Días desde la última lesión",
          },
          isGood: false,
          explanation: {
            en: "Lagging indicator — reactive metric",
            es: "Indicador de retraso — métrica reactiva",
          },
        },
        {
          text: {
            en: "Number of safety audits completed",
            es: "Número de auditorías de seguridad completadas",
          },
          isGood: true,
          explanation: {
            en: "Leading indicator — proactive identification of hazards",
            es: "Indicador principal — identificación proactiva de peligros",
          },
        },
        {
          text: {
            en: "Staff training hours on safety completed",
            es: "Horas de capacitación del personal en seguridad completadas",
          },
          isGood: true,
          explanation: {
            en: "Leading indicator — trained staff prevents injuries",
            es: "Indicador principal — personal capacitado previene lesiones",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "OSHA 1904: Recording and Reporting Occupational Injuries", url: "https://www.osha.gov/recordkeeping/1904" },
    { label: "OSHA IIPP Guidelines for Healthcare", url: "https://www.osha.gov/dsg/hospitals/documents/1.4_Guidelines_for_ADL.pdf" },
    { label: "National Safety Council: Culture of Safety Toolkit", url: "https://www.nsc.org/workplace/safety-culture" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 27: SB 525 Wage Strategy                                   */
/* ================================================================== */

const module27SB525: MasterclassCourseModule = {
  id: "sb525-wage-strategy",
  order: 27,
  title: {
    en: "SB 525 Compliance & Wage Strategy for FQHCs",
    es: "Cumplimiento de SB 525 y Estrategia de Salarios para FQHCs",
  },
  subtitle: {
    en: "SB 525 raises FQHC minimum wage to $25/hour by June 2026 — affecting 60% of support staff",
    es: "SB 525 aumenta el salario mínimo FQHC a $25/hora para junio de 2026 — afectando 60% del personal de apoyo",
  },
  description: {
    en: "Calculate SB 525 cost impact, model a 3-phase implementation timeline, develop wage compression mitigation strategy, and explore revenue pathways to fund increases.",
    es: "Calcule el impacto de costos de SB 525, modele una línea de tiempo de implementación de 3 fases, desarrolle estrategia de mitigación de compresión salarial, y explore caminos de ingresos para financiar aumentos.",
  },
  estimatedMinutes: 15,
  icon: "DollarSign",
  color: "cyan",
  category: "compliance",
  learningObjectives: [
    {
      en: "Calculate your SB 525 cost impact: current wage distribution + headcount by role = total cost increase",
      es: "Calcule su impacto de costo de SB 525",
    },
    {
      en: "Model a 3-phase implementation: Jan 2025 (initial), Jan 2026 (middle), June 2026 (final) to spread impact",
      es: "Modele una implementación de 3 fases para distribuir impacto",
    },
    {
      en: "Develop a wage compression mitigation strategy: identify at-risk roles, plan preventive raises, communicate transparently",
      es: "Desarrolle una estrategia de mitigación de compresión salarial",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "SB 525: The Cost Math",
        es: "SB 525: La Matemática de Costos",
      },
      body: {
        en: "SB 525 raises healthcare minimum wage to $25/hour by June 2026. A 200-person FQHC with 40% staff below $25/hour sees a $2.1M annual increase. That's roughly 2-3 months of margin for many FQHCs. The equation: (new $25 wage - current wage) × headcount of sub-$25 employees = cost. Plus 10-15% contingency for wage compression ripple effects.",
        es: "SB 525 aumenta el salario mínimo de salud a $25/hora para junio de 2026. Un FQHC de 200 personas con 40% del personal por debajo de $25/hora ve un aumento anual de $2.1M. Eso es aproximadamente 2-3 meses de margen. La ecuación: (nuevo salario $25 - salario actual) × conteo de personal actual menor de $25 = costo.",
      },
    },
    {
      heading: {
        en: "Wage Compression: The Hidden Cost",
        es: "Compresión Salarial: El Costo Oculto",
      },
      body: {
        en: "Wage compression is what happens when you raise entry-level salaries but not mid-level salaries. Example: MA is at $18, you raise to $25. But your experienced MA at $26 now earns only $1/hour more — resentment builds. Your RN at $32 is barely above MA. This is when you lose retention. FQHCs must be proactive: at year 2-3 of the MA/RN/NP ladder, plan preventive raises. Budget 10-15% contingency to address compression.",
        es: "La compresión salarial es lo que sucede cuando subes salarios de nivel de entrada pero no salarios de nivel medio. Ejemplo: MA está en $18, subes a $25. Pero tu MA experimentado en $26 ahora gana solo $1/hora más — se construye resentimiento. Tu RN en $32 apenas está por encima de MA. Esto es cuando pierdes retención.",
      },
    },
    {
      heading: {
        en: "10 Levers to Fund SB 525 (Without Destroying Margin)",
        es: "10 Palancas para Financiar SB 525",
      },
      body: {
        en: "(1) Efficiency gains: EHR optimization (+8% visit productivity). (2) Clinical redesign: RN co-visits for code level increase (+3% revenue). (3) Billing accuracy: catch denials early (+2% recovery). (4) PPS rate advocacy: Federal/state rate negotiations. (5) Attrition management: maintain open positions longer, natural wage progression slowdown. (6) Revenue diversification: specialty clinics, grants. (7) Productivity incentives: patient panel expansion. (8) Overhead reduction: procurement optimization. (9) Preventive care shift: lower ER visits, higher preventive revenue. (10) Employer retention credits & other tax incentives. One North State FQHC combined levers 1+2+3 = 13% combined revenue gain, funding SB 525 without margin cut.",
        es: "(1) Ganancias de eficiencia: optimización de EHR (+8%). (2) Rediseño clínico: co-visitas de RN para aumento de nivel (+3%). (3) Precisión de facturación: detectar denegaciones temprano (+2%). (4) Defensa de tasa de PPS. (5) Gestión de rotación. (6) Diversificación de ingresos. (7) Incentivos de productividad. (8) Reducción de gastos generales. (9) Cambio de atención preventiva. (10) Créditos de retención del empleador.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m27-sb525-cost",
      questions: [
        {
          question: {
            en: "A 200-person FQHC with 40% staff below $25/hour, average current wage $20/hr. What's the annual SB 525 cost?",
            es: "Un FQHC de 200 personas con 40% del personal por debajo de $25/hora, salario actual promedio $20/hora. ¿Cuál es el costo anual?",
          },
          options: [
            {
              text: { en: "$400K", es: "$400K" },
              isCorrect: false,
              explanation: {
                en: "Underestimated — 200 × 40% = 80 people × ($25-$20) = $400/person/year × 80 = $400K base, plus compression",
                es: "Subestimado",
              },
            },
            {
              text: { en: "$2.1M", es: "$2.1M" },
              isCorrect: true,
              explanation: {
                en: "Correct — 80 people × $5/hour increase × 2,080 hours/year = $832K + 10-15% compression contingency = ~$2.1M total",
                es: "Correcto — 80 personas × $5/hora × 2,080 horas/año = $832K + contingencia de compresión 10-15%",
              },
            },
            {
              text: { en: "$1M", es: "$1M" },
              isCorrect: false,
              explanation: {
                en: "Still underestimated — includes base plus compression",
                es: "Aún subestimado — incluye base más compresión",
              },
            },
            {
              text: { en: "Can't calculate without knowing exact role distribution", es: "No se puede calcular sin conocer distribución exacta de roles" },
              isCorrect: false,
              explanation: {
                en: "You can estimate — 80 people × $5/hour increase gives you the baseline",
                es: "Puedes estimar — 80 personas × $5/hora de aumento te da la línea base",
              },
            },
          ],
        },
        {
          question: {
            en: "What's the biggest wage compression risk point in your payroll?",
            es: "¿Cuál es el mayor punto de riesgo de compresión salarial en tu nómina?",
          },
          options: [
            {
              text: { en: "Year 1 of hire (immediate pay compression)", es: "Año 1 de contratación" },
              isCorrect: false,
              explanation: {
                en: "Not year 1 — experienced staff at year 2-3 are most at risk",
                es: "No año 1 — personal experimentado en año 2-3 está en mayor riesgo",
              },
            },
            {
              text: { en: "Year 2-3 of the MA/RN/NP ladder (experienced staff), where salary progression has plateaued", es: "Año 2-3 de la escalera MA/RN/NP" },
              isCorrect: true,
              explanation: {
                en: "Correct — this is where compression hits hardest and retention is lost",
                es: "Correcto — aquí es donde la compresión golpea más fuerte y se pierde retención",
              },
            },
            {
              text: { en: "Year 5+ (senior staff should be fine)", es: "Año 5+ (el personal senior debería estar bien)" },
              isCorrect: false,
              explanation: {
                en: "Year 5+ staff are typically already at higher pay — the issue is years 2-3",
                es: "El personal de año 5+ generalmente ya está en salarios más altos",
              },
            },
            {
              text: { en: "Not at FQHC level — compression is a hospital problem", es: "No a nivel FQHC — la compresión es un problema hospitalario" },
              isCorrect: false,
              explanation: {
                en: "SB 525 causes compression at FQHCs too — especially for support staff",
                es: "SB 525 causa compresión también en FQHCs",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m27-funding-levers",
      instruction: {
        en: "Which are viable levers to fund SB 525 without cutting margin?",
        es: "¿Cuáles son palancas viables para financiar SB 525 sin cortar margen?",
      },
      items: [
        {
          text: {
            en: "EHR optimization (e-signature, template automation, better coding prompts) → 5-8% visit productivity gain",
            es: "Optimización de EHR → ganancia de productividad de visita de 5-8%",
          },
          isGood: true,
          explanation: {
            en: "Proven lever — one FQHC gained 8% productivity from EHR workflow improvements",
            es: "Palanca comprobada — un FQHC ganó 8% de productividad",
          },
        },
        {
          text: {
            en: "RN co-visits for higher coding levels (RN sees patient first, MD does high-complexity coding)",
            es: "Co-visitas de RN para niveles de codificación más altos",
          },
          isGood: true,
          explanation: {
            en: "Clinical redesign lever — increases revenue without patient impact",
            es: "Palanca de rediseño clínico — aumenta ingresos sin impacto en pacientes",
          },
        },
        {
          text: {
            en: "Hiring freeze to let positions go unfilled and naturally reduce payroll",
            es: "Congelación de contratación para dejar posiciones vacantes",
          },
          isGood: false,
          explanation: {
            en: "This cuts access/quality — SB 525 is about lifting wages, not reducing staff",
            es: "Esto corta acceso/calidad — SB 525 es sobre elevar salarios, no reducir personal",
          },
        },
        {
          text: {
            en: "Billing accuracy (catch denials early, fix coding errors before audit)",
            es: "Precisión de facturación (detectar denegaciones temprano)",
          },
          isGood: true,
          explanation: {
            en: "A 5% denial rate on $20M = $1M at risk — recover 2% = $200K gain",
            es: "Una tasa de denegación del 5% sobre $20M = $1M en riesgo — recuperar 2% = ganancia de $200K",
          },
        },
        {
          text: {
            en: "PPS rate advocacy (federal & state level) for higher per-visit reimbursement",
            es: "Defensa de tasa de PPS para reembolso más alto por visita",
          },
          isGood: true,
          explanation: {
            en: "Long-term lever — even 1-2% rate increase = major impact on margin",
            es: "Palanca a largo plazo — incluso aumento del 1-2% = impacto importante",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "California SB 525: Healthcare Worker Minimum Wage", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB525" },
    { label: "State of California Department of Industrial Relations: SB 525 Implementation", url: "https://www.dir.ca.gov/dlse/Health-Care-Worker-Minimum-Wage-FAQ.htm" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 28: NLRB Worker Rights                                     */
/* ================================================================== */

const module28NLRBWorkerRights: MasterclassCourseModule = {
  id: "nlrb-worker-rights",
  order: 28,
  title: {
    en: "Worker Rights & the NLRB: What FQHC Leaders Must Know",
    es: "Derechos de Trabajadores y la NLRB: Lo Que los Líderes FQHC Deben Saber",
  },
  subtitle: {
    en: "NLRB healthcare cases in CA increased 34% since 2022. Understand protected concerted activity, union organizing, Weingarten rights, and common employer mistakes.",
    es: "Los casos de salud de NLRB en CA aumentaron 34% desde 2022. Comprenda actividad concertada protegida, organización sindical, derechos de Weingarten, y errores comunes del empleador.",
  },
  description: {
    en: "Define protected concerted activity under Section 7, understand Weingarten rights, learn prohibited employer conduct, and build a playbook for responding to union organizing without violating rights.",
    es: "Defina actividad concertada protegida bajo Sección 7, comprenda derechos de Weingarten, aprenda conducta prohibida del empleador, y construya un manual para responder a organización sindical sin violar derechos.",
  },
  estimatedMinutes: 14,
  icon: "Users",
  color: "purple",
  category: "compliance",
  learningObjectives: [
    {
      en: "Define protected concerted activity under Section 7 of the NLRA — it's broader than union organizing",
      es: "Defina actividad concertada protegida bajo Sección 7 del NLRA",
    },
    {
      en: "Understand Weingarten rights: employees can request union representation in investigatory interviews",
      es: "Entienda derechos de Weingarten",
    },
    {
      en: "Learn what NOT to do: prohibited employer conduct under NLRB rules (interrogation, surveillance, retaliation, threats)",
      es: "Aprenda qué NO hacer: conducta prohibida del empleador",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Protected Concerted Activity: Broader Than You Think",
        es: "Actividad Concertada Protegida: Más Amplia De Lo Que Crees",
      },
      body: {
        en: "Protected concerted activity = 2+ employees talking about working conditions with intent to improve them. Informal conversations at break time are protected. You CANNOT prohibit them. Examples: (1) Nurses discussing wage compression in the break room. (2) MAs texting about inadequate PPE. (3) Cashiers organizing a schedule complaint. These are ALL protected. Many FQHCs inadvertently violate Section 7 by: (1) Prohibiting off-duty organizing/conversations. (2) Disciplining workers for union discussions. (3) Retaliating against union supporters. The NLRB presumes retaliation if discipline happens within 30 days of protected activity.",
        es: "Actividad concertada protegida = 2+ empleados hablando sobre condiciones de trabajo. Conversaciones informales en el descanso son protegidas. NO PUEDE prohibirlas. Ejemplos: (1) Enfermeras discutiendo compresión salarial. (2) MAs texteando sobre EPP inadecuado. (3) Cajeros organizando queja de horario. Todos son PROTEGIDOS.",
      },
    },
    {
      heading: {
        en: "Weingarten Rights: The Union Representation Guarantee",
        es: "Derechos de Weingarten: La Garantía de Representación Sindical",
      },
      body: {
        en: "Weingarten rights (named after a Supreme Court case) give employees the right to union representation during investigatory interviews that could lead to discipline. Example: Manager wants to interview an employee about a patient complaint. Employee can say 'I want my union rep present.' You must allow it. This doesn't mean the employee is guilty — it means they want a witness. If an employee invokes Weingarten rights and you proceed without a rep present, that's a violation. Know the language: 'I would like my union representative present for this interview.'",
        es: "Los derechos de Weingarten dan a los empleados el derecho a representación sindical durante entrevistas investigativas que podrían llevar a disciplina. Ejemplo: El gerente quiere entrevistar a un empleado sobre una queja del paciente. El empleado puede decir 'Quiero que mi representante sindical esté presente.' Debe permitirlo.",
      },
    },
    {
      heading: {
        en: "What NOT to Do: Prohibited Employer Conduct",
        es: "Qué NO Hacer: Conducta Prohibida del Empleador",
      },
      body: {
        en: "(1) INTERROGATION: Don't ask employees 'Are you involved in union organizing?' This is interrogation of protected activity. (2) SURVEILLANCE: Don't monitor union meetings or conversations. (3) RETALIATION: Don't discipline/terminate anyone within 30 days of union activity (NLRB presumes retaliation). (4) THREATS: Don't threaten job loss, cutbacks, or relocation if workers unionize. (5) DENIAL OF BENEFITS: Don't deny raises, promotions, or benefits based on union activity. 10 CA FQHCs are now unionized (NUHW, SEIU). Those with collaborative frameworks (joint labor-management committees) report better outcomes than those trying to resist.",
        es: "(1) INTERROGACIÓN: No preguntes a empleados '¿Estás involucrado en organización sindical?' (2) VIGILANCIA: No monitorees reuniones sindicales. (3) REPRESALIA: No disciplines dentro de 30 días de actividad sindical. (4) AMENAZAS: No amenaces pérdida de trabajo. (5) NEGACIÓN DE BENEFICIOS: No niegues aumentos basados en actividad sindical.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m28-protected-activity",
      questions: [
        {
          question: {
            en: "Are two nurses discussing wage compression in the break room protected activity?",
            es: "¿Dos enfermeras discutiendo compresión salarial en la sala de descanso son actividad protegida?",
          },
          options: [
            {
              text: { en: "No — it's just gossip", es: "No — es solo chisme" },
              isCorrect: false,
              explanation: {
                en: "It IS protected if they intend to improve working conditions. Don't discipline them.",
                es: "ES protegido si tienen intención de mejorar condiciones laborales.",
              },
            },
            {
              text: { en: "Only if it's formal union organizing", es: "Solo si es organización sindical formal" },
              isCorrect: false,
              explanation: {
                en: "Protected concerted activity is BROADER than formal organizing",
                es: "La actividad concertada protegida es MÁS AMPLIA que la organización formal",
              },
            },
            {
              text: { en: "Yes — protected concerted activity under Section 7 of NLRA", es: "Sí — actividad concertada protegida bajo Sección 7 del NLRA" },
              isCorrect: true,
              explanation: {
                en: "Correct — informal conversations about working conditions are protected",
                es: "Correcto — conversaciones informales sobre condiciones de trabajo son protegidas",
              },
            },
            {
              text: { en: "Depends on the supervisor's permission", es: "Depende del permiso del supervisor" },
              isCorrect: false,
              explanation: {
                en: "No — this is a legal right, not subject to supervisor approval",
                es: "No — este es un derecho legal, no sujeto a aprobación del supervisor",
              },
            },
          ],
        },
        {
          question: {
            en: "An employee in an investigatory interview says 'I want my union rep present.' What must you do?",
            es: "Un empleado en una entrevista investigativa dice 'Quiero que mi representante sindical esté presente.' ¿Qué debe hacer?",
          },
          options: [
            {
              text: { en: "Proceed immediately — employee has no right to delay", es: "Proceder inmediatamente — el empleado no tiene derecho a retrasar" },
              isCorrect: false,
              explanation: {
                en: "This violates Weingarten rights — you must allow the rep",
                es: "Esto viola derechos de Weingarten — debe permitir el representante",
              },
            },
            {
              text: { en: "Tell them to get a personal lawyer instead", es: "Dígale que obtenga un abogado personal en su lugar" },
              isCorrect: false,
              explanation: {
                en: "You're not allowed to choose their representative — they have right to union rep",
                es: "No se le permite elegir su representante — tienen derecho al representante sindical",
              },
            },
            {
              text: { en: "Allow the union representative to be present", es: "Permitir que el representante sindical esté presente" },
              isCorrect: true,
              explanation: {
                en: "Correct — this is Weingarten rights. Refusing is a violation.",
                es: "Correcto — estos son derechos de Weingarten. Negarse es una violación.",
              },
            },
            {
              text: { en: "Cancel the interview and report to NLRB", es: "Cancelar la entrevista e informar al NLRB" },
              isCorrect: false,
              explanation: {
                en: "No — just allow the rep. The interview can proceed normally.",
                es: "No — simplemente permite el representante. La entrevista puede proceder normalmente.",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m28-prohibited-conduct",
      instruction: {
        en: "Which of these are prohibited employer conduct under NLRB rules?",
        es: "¿Cuáles de estos son conducta prohibida del empleador bajo reglas del NLRB?",
      },
      items: [
        {
          text: {
            en: "Asking an employee 'Are you involved in union organizing?'",
            es: "Preguntar a un empleado '¿Estás involucrado en organización sindical?'",
          },
          isGood: true,
          explanation: {
            en: "Interrogation of protected activity — prohibited",
            es: "Interrogación de actividad protegida — prohibido",
          },
        },
        {
          text: {
            en: "Monitoring union meetings or conversations",
            es: "Monitorear reuniones o conversaciones sindicales",
          },
          isGood: true,
          explanation: {
            en: "Surveillance of protected activity — prohibited",
            es: "Vigilancia de actividad protegida — prohibido",
          },
        },
        {
          text: {
            en: "Allowing employee request for union rep in investigatory interview",
            es: "Permitir solicitud de empleado para representante sindical en entrevista investigativa",
          },
          isGood: false,
          explanation: {
            en: "This is REQUIRED (Weingarten rights) — not prohibited",
            es: "Esto es REQUERIDO — no prohibido",
          },
        },
        {
          text: {
            en: "Disciplining an employee 2 weeks after union organizing activity",
            es: "Disciplinar a un empleado 2 semanas después de actividad de organización sindical",
          },
          isGood: true,
          explanation: {
            en: "Within 30 days = presumed retaliation — prohibited",
            es: "Dentro de 30 días = represalia presumida — prohibido",
          },
        },
        {
          text: {
            en: "Threatening job loss if workers vote to unionize",
            es: "Amenazar pérdida de trabajo si los trabajadores votan por sindicalización",
          },
          isGood: true,
          explanation: {
            en: "Threats of retaliation — absolutely prohibited",
            es: "Amenazas de represalia — absolutamente prohibido",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "NLRB: Employees' Rights Under the National Labor Relations Act", url: "https://www.nlrb.gov/news-publications/publications/employee-rights-notice-posting" },
    { label: "NLRB Section 7 Protection: Protected Concerted Activity", url: "https://www.nlrb.gov/guidance/key-reference-materials/national-labor-relations-act" },
    { label: "NLRB: Weingarten Rights (Union Representation in Interviews)", url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights/weingarten-rights" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 29: Fighting Credential Inflation                          */
/* ================================================================== */

const module29CredentialInflation: MasterclassCourseModule = {
  id: "fighting-credential-inflation",
  order: 29,
  title: {
    en: "Fighting Credential Inflation in FQHC Hiring",
    es: "Combatiendo la Inflación de Credenciales en la Contratación FQHC",
  },
  subtitle: {
    en: "42% of FQHC job postings require degrees beyond legal minimums — shrinking an already tight talent pool",
    es: "42% de las ofertas de trabajo FQHC requieren títulos más allá de los mínimos legales — reduciendo un grupo de talentos ya ajustado",
  },
  description: {
    en: "Audit current job postings against BPC legal minimums, perform EEOC adverse impact analysis, redesign postings for skills-based hiring, and build apprenticeship models.",
    es: "Audite ofertas de trabajo actuales contra mínimos legales BPC, realice análisis de impacto adverso EEOC, rediseñe ofertas para contratación basada en habilidades, y construya modelos de aprendizaje.",
  },
  estimatedMinutes: 13,
  icon: "Briefcase",
  color: "blue",
  category: "leadership",
  learningObjectives: [
    {
      en: "Audit your current job postings: compare listed requirements to California BPC legal minimums for each role",
      es: "Audite sus anuncios de trabajo actuales contra mínimos legales de BPC",
    },
    {
      en: "Perform EEOC adverse impact analysis: if your hiring requirements screen out 80%+ of a protected group, they need justification",
      es: "Realice análisis de impacto adverso del EEOC",
    },
    {
      en: "Redesign job postings to focus on demonstrated skills, certifications, and on-the-job training pathways rather than educational degrees",
      es: "Rediseñe anuncios de trabajo para enfocarse en habilidades demostrables",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "Legal Minimums ≠ Posting Minimums",
        es: "Mínimos Legales ≠ Mínimos de Anuncio",
      },
      body: {
        en: "California law is clear: (1) Medical Assistant: high school diploma or GED (no certification required). (2) Community Health Worker: high school diploma. (3) Billing Coder: high school diploma. (4) RN: BSN (Bachelor's Science in Nursing, regulated by Board of Nursing). Yet 68% of FQHC MA postings require 'associate's degree or certification preferred.' This is credential inflation. It doesn't make candidates safer or more effective — it just narrows the talent pool. The EEOC enforces adverse impact standards: if your requirements screen out a protected class (immigrants, people of color, low-income) at higher rates, you must justify business necessity.",
        es: "La ley de California es clara: (1) Asistente Médico: diploma de secundaria o GED. (2) Trabajador de Salud Comunitario: diploma de secundaria. (3) Codificador de Facturación: diploma de secundaria. (4) RN: BSN. Sin embargo, 68% de anuncios FQHC MA requieren 'título de asociado.' Esto es inflación de credenciales. No hace candidatos más seguros — solo estrecha el grupo de talentos.",
      },
    },
    {
      heading: {
        en: "EEOC Adverse Impact: The Legal Risk",
        es: "Impacto Adverso del EEOC: El Riesgo Legal",
      },
      body: {
        en: "Adverse impact happens when a neutral hiring requirement has a disparate effect on protected classes. Example: 'Must have bachelor's degree for MA role' disproportionately screens out immigrants and first-generation Americans. If your hiring requirements exclude 80%+ of a protected group, you can be sued unless you prove business necessity. One Bay Area FQHC removed 'associate's degree' from MA posting → 3x more applicants, 40% women of color hired (vs 18% before). Same job, better outcomes, no legal risk.",
        es: "El impacto adverso ocurre cuando un requisito de contratación neutral tiene un efecto disparatado en clases protegidas. Ejemplo: 'Debe tener título de licenciatura para rol de MA' excluye desproporcionadamente a inmigrantes. Un FQHC removió requisito de 'título de asociado' → 3x más solicitantes, 40% mujeres de color contratadas.",
      },
    },
    {
      heading: {
        en: "Skills-Based Hiring: The Alternative",
        es: "Contratación Basada en Habilidades: La Alternativa",
      },
      body: {
        en: "Instead of 'associate's degree required,' say: 'Must demonstrate: phlebotomy certification OR 1 year IV experience, ability to work with EHR systems, strong patient communication.' This attracts candidates who have skills but took different paths (apprenticeships, on-the-job training, community colleges). FQHCs can offer in-house certification programs. Hire for potential, provide training for specific credentials. This expands talent pool AND aligns with FQHC mission to serve the community.",
        es: "En lugar de 'título de asociado requerido', di: 'Debe demostrar: certificación de flebotomía O 1 año de experiencia IV, capacidad de trabajar con sistemas de EHR.' Esto atrae candidatos que tienen habilidades pero tomaron caminos diferentes.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m29-legal-minimums",
      questions: [
        {
          question: {
            en: "What's the legal minimum education requirement for a Medical Assistant in California?",
            es: "¿Cuál es el requisito de educación mínimo legal para un Asistente Médico en California?",
          },
          options: [
            {
              text: { en: "Bachelor's degree", es: "Título de licenciatura" },
              isCorrect: false,
              explanation: {
                en: "Way too high — BPC requires only high school diploma",
                es: "Demasiado alto — BPC requiere solo diploma de secundaria",
              },
            },
            {
              text: { en: "Associate's degree or certification", es: "Título de asociado o certificación" },
              isCorrect: false,
              explanation: {
                en: "That's credential inflation — legal minimum is high school diploma",
                es: "Eso es inflación de credenciales — el mínimo legal es diploma de secundaria",
              },
            },
            {
              text: { en: "High school diploma or GED (no certification required)", es: "Diploma de secundaria o GED" },
              isCorrect: true,
              explanation: {
                en: "Correct — BPC allows MA work with high school diploma. Certification is optional.",
                es: "Correcto — BPC permite trabajo de MA con diploma de secundaria",
              },
            },
            {
              text: { en: "Depends on the FQHC's preference", es: "Depende de la preferencia del FQHC" },
              isCorrect: false,
              explanation: {
                en: "No — BPC standards apply uniformly",
                es: "No — los estándares de BPC se aplican uniformemente",
              },
            },
          ],
        },
        {
          question: {
            en: "Your MA posting requires 'associate's degree preferred.' This disproportionately screens out immigrants. Is this EEOC risk?",
            es: "Tu anuncio de MA requiere 'título de asociado preferido.' Esto excluye desproporcionadamente a inmigrantes. ¿Es riesgo del EEOC?",
          },
          options: [
            {
              text: { en: "No — it just says 'preferred,' not required", es: "No — solo dice 'preferido', no requerido" },
              isCorrect: false,
              explanation: {
                en: "Even 'preferred' creates disparate impact if it screens out 80%+ of a protected group",
                es: "Incluso 'preferido' crea impacto disparatado si excluye al 80%+",
              },
            },
            {
              text: { en: "Yes — this is adverse impact unless justified by business necessity", es: "Sí — esto es impacto adverso a menos que se justifique por necesidad comercial" },
              isCorrect: true,
              explanation: {
                en: "Correct — you can be sued. Remove the degree requirement and say 'demonstrate relevant skills'",
                es: "Correcto — puedes ser demandado. Elimina el requisito de grado.",
              },
            },
            {
              text: { en: "Only if the FQHC's MA team is all white", es: "Solo si el equipo de MA del FQHC es todo blanco" },
              isCorrect: false,
              explanation: {
                en: "Adverse impact analysis is about the hiring requirement's effect, not current demographics",
                es: "El análisis de impacto adverso se trata del efecto del requisito de contratación",
              },
            },
            {
              text: { en: "Depends on the state — California might have different rules", es: "Depende del estado — California podría tener reglas diferentes" },
              isCorrect: false,
              explanation: {
                en: "EEOC rules apply nationwide — California has similar/stronger protections",
                es: "Las reglas del EEOC se aplican a nivel nacional",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m29-credential-inflation",
      instruction: {
        en: "Which job requirements are credential inflation vs. legitimate?",
        es: "¿Cuáles requisitos de trabajo son inflación de credenciales vs. legítimos?",
      },
      items: [
        {
          text: {
            en: "MA posting: 'Associate's degree or RMA certification required'",
            es: "Anuncio de MA: 'Título de asociado o certificación de RMA requerida'",
          },
          isGood: false,
          explanation: {
            en: "Credential inflation — legal minimum is high school diploma only",
            es: "Inflación de credenciales — el mínimo legal es solo diploma de secundaria",
          },
        },
        {
          text: {
            en: "RN posting: 'Bachelor's of Science in Nursing (BSN) required'",
            es: "Anuncio de RN: 'Licenciatura en Ciencias de Enfermería (BSN) requerida'",
          },
          isGood: true,
          explanation: {
            en: "Legitimate — California Board of Nursing requires BSN for RN licensure",
            es: "Legítimo — la Junta de Enfermería de California requiere BSN para licencia RN",
          },
        },
        {
          text: {
            en: "Billing Coder posting: 'Associate's degree in medical coding required'",
            es: "Anuncio de Codificador de Facturación: 'Título de asociado en codificación médica requerido'",
          },
          isGood: false,
          explanation: {
            en: "Credential inflation — can demonstrate coding skills through test or experience",
            es: "Inflación de credenciales — puede demostrar habilidades de codificación",
          },
        },
        {
          text: {
            en: "CHW posting: 'High school diploma + demonstrate cultural competence, strong community ties, bilingual preferred'",
            es: "Anuncio de CHW: 'Diploma de secundaria + demostrar competencia cultural'",
          },
          isGood: true,
          explanation: {
            en: "Legitimate and inclusive — focuses on actual job skills, not gatekeeping degrees",
            es: "Legítimo e inclusivo — se enfoca en habilidades laborales reales",
          },
        },
        {
          text: {
            en: "Patient Advocate posting: 'Master's degree in social work or psychology required'",
            es: "Anuncio de Defensor de Pacientes: 'Maestría en trabajo social o psicología requerida'",
          },
          isGood: false,
          explanation: {
            en: "Credential inflation — advocacy skills can be demonstrated through experience, not degree",
            es: "Inflación de credenciales — habilidades de defensa pueden demostrarse por experiencia",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "EEOC: Adverse Impact & Disparate Impact Guidelines", url: "https://www.eeoc.gov/eeoc/publications/fs-nondiscrimination.cfm" },
    { label: "California Board of Physicians: MA Licensure Requirements", url: "https://www.mbc.ca.gov/regulations/scope-of-practice.html" },
    { label: "Harvard Business Review: Skills-Based Hiring Best Practices", url: "https://hbr.org/2023/06/hire-for-skills-not-credentials" },
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 30: Salary Negotiation Edge                                */
/* ================================================================== */

const module30SalaryNegotiationEdge: MasterclassCourseModule = {
  id: "salary-negotiation-edge",
  order: 30,
  title: {
    en: "Salary Negotiation & Total Comp: The FQHC Edge",
    es: "Negociación de Salarios y Comp Total: La Ventaja FQHC",
  },
  subtitle: {
    en: "FQHCs that communicate total comp value (NHSC loans, FTCA, mission) reduce turnover by 18%",
    es: "Los FQHCs que comunican el valor total de comp (préstamos NHSC, FTCA, misión) reducen la rotación un 18%",
  },
  description: {
    en: "Map the 10 components of total compensation, calculate actual total comp value propositions, develop negotiation talking points, and train HR on communicating value.",
    es: "Mapee los 10 componentes de compensación total, calcule propuestas reales de valor de comp total, desarrolle puntos de negociación, y capacite a RR.HH. en comunicar valor.",
  },
  estimatedMinutes: 12,
  icon: "TrendingUp",
  color: "cyan",
  category: "leadership",
  learningObjectives: [
    {
      en: "Map out the 10 components of total compensation for each FQHC role: base salary, health insurance, retirement, NHSC eligibility, FTCA, PTO, mission/impact value, bilingual differential, loan repayment pathway",
      es: "Mapee los 10 componentes de compensación total para cada rol FQHC",
    },
    {
      en: "Calculate actual total comp: for NP at $120K salary + $30K NHSC eligible + $15K health/retirement + $5K mission premium = $170K value proposition",
      es: "Calcule compensación total actual",
    },
    {
      en: "Develop salary negotiation talking points and train HR/hiring managers to communicate total comp",
      es: "Desarrolle puntos de negociación salarial y capacite a RR.HH.",
    },
  ],
  conceptContent: [
    {
      heading: {
        en: "The 10 Components of Total Comp (The Candidate Doesn't Know)",
        es: "Los 10 Componentes de Compensación Total",
      },
      body: {
        en: "(1) Base Salary: $120K. (2) Health Insurance: FQHC typically covers 90% = $15K value. (3) Retirement (401k/PERA): 3-5% match = $3.6K-$6K. (4) NHSC Loan Repayment: $30K-$50K (eligible roles) = $30K value if eligible. (5) Federal Tort Claims Act coverage: Peace of mind, no malpractice premiums = $5K-$10K value vs. private practice. (6) PTO: 20 days = $4.6K value. (7) Mission Premium (emotional/cultural value): FQHCs serve uninsured patients, which candidates often cite as reason to join = $5K self-reported value. (8) Bilingual Differential: $2-5/hour = $4K-$10K. (9) CME/Professional Development: $1.5K-$3K. (10) Small-team dynamics + continuity of care. Total: $120K base becomes $170K+ total value. Hospitals cite $125K base but can't offer NHSC or mission.",
        es: "(1) Salario base: $120K. (2) Seguro de salud: 90% = $15K. (3) Jubilación: 3-5% match = $3.6K-$6K. (4) Repago de préstamos NHSC: $30K-$50K = $30K. (5) Cobertura FTCA: paz mental = $5K-$10K. (6) PTO: 20 días = $4.6K. (7) Prima de misión: $5K. (8) Diferencial bilingüe: $2-5/hora = $4K-$10K. (9) CME: $1.5K-$3K. (10) Dinámicas de equipo pequeño. Total: $120K base se convierte en $170K+ valor total.",
      },
    },
    {
      heading: {
        en: "The NHSC Advantage: Most Underutilized Recruiting Tool",
        es: "La Ventaja NHSC: Herramienta de Reclutamiento Más Subutilizada",
      },
      body: {
        en: "NHSC Loan Repayment pays $30K-$50K annually for eligible roles (CHW, NP, RN, MD) serving health professional shortage areas. Many candidates aren't aware of it. FQHC HR doesn't communicate it aggressively. An NP with $150K in student debt can have $100K forgiven in 3 years through NHSC — that's transformational. But hospitals can't offer it (it's HRSA-only). This is the #1 underutilized FQHC advantage. When recruiting, lead with NHSC eligibility: 'This role qualifies for National Health Service Corps Loan Repayment — $30K-$50K annually in forgiveness.'",
        es: "El Repago de Préstamos NHSC paga $30K-$50K anuales para roles elegibles. Muchos candidatos no están conscientes. Un NP con $150K en deuda estudiantil puede tener $100K perdonados en 3 años. Los hospitales no pueden ofrecerlo. Esta es la ventaja #1 más subutilizada de FQHC.",
      },
    },
    {
      heading: {
        en: "The Total Comp Calculator: Your Recruiting Weapon",
        es: "La Calculadora de Compensación Total: Tu Arma de Reclutamiento",
      },
      body: {
        en: "FQHCs that create a 'total comp calculator' and explain it to candidates report 22% higher offer acceptance rates. The tool is simple: input base salary, show the 10 components, calculate total. NP example: $120K base + $15K insurance + $6K retirement + $30K NHSC (if eligible) + $5K FTCA + $4.6K PTO + $5K mission + $2K CME = $187.6K total value. Candidates see $120K initially but realize the true value is $187.6K. This transforms the negotiation from 'hospital pays $125K' to 'FQHC total value is $187.6K.' Simple but powerful.",
        es: "Los FQHCs que crean una 'calculadora de compensación total' y la explican a candidatos reportan 22% tasas de aceptación de ofertas más altas. Ejemplo de NP: $120K base + $15K seguro + $6K jubilación + $30K NHSC + $5K FTCA + $4.6K PTO + $5K misión + $2K CME = $187.6K total. Los candidatos ven $120K inicialmente pero se dan cuenta de que el valor verdadero es $187.6K.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "m30-total-comp",
      questions: [
        {
          question: {
            en: "An NP at $120K base + $30K NHSC eligible. What's the minimum total comp value?",
            es: "Un NP en $120K base + $30K elegible NHSC. ¿Cuál es el valor mínimo de compensación total?",
          },
          options: [
            {
              text: { en: "$120K (just the base)", es: "$120K (solo la base)" },
              isCorrect: false,
              explanation: {
                en: "You're missing NHSC + benefits — actual total is much higher",
                es: "Te estás perdiendo NHSC + beneficios — total real es mucho más alto",
              },
            },
            {
              text: { en: "$150K (base + NHSC)", es: "$150K (base + NHSC)" },
              isCorrect: false,
              explanation: {
                en: "You're still missing health insurance, retirement, PTO, FTCA, mission, CME",
                es: "Aún te estás perdiendo seguro de salud, jubilación, PTO",
              },
            },
            {
              text: { en: "$170K-$190K (base + benefits + NHSC + FTCA + mission + CME)", es: "$170K-$190K (base + benefits + NHSC + FTCA + misión + CME)" },
              isCorrect: true,
              explanation: {
                en: "Correct — minimum includes insurance ($15K) + retirement ($6K) + NHSC ($30K) + FTCA ($5K) + PTO ($4.6K) + mission ($5K) + CME ($2K)",
                es: "Correcto — mínimo incluye seguro, jubilación, NHSC, FTCA, PTO, misión, CME",
              },
            },
            {
              text: { en: "$220K+ (accounting for all 10 components)", es: "$220K+ (contabilizando los 10 componentes)" },
              isCorrect: false,
              explanation: {
                en: "That's high — total comp typically lands in $170K-$190K range for NP",
                es: "Eso es alto — compensación total típicamente se ubica en rango $170K-$190K",
              },
            },
          ],
        },
        {
          question: {
            en: "FQHCs that use total comp calculators in interviews report what improvement in offer acceptance?",
            es: "¿Qué mejora en aceptación de ofertas reportan los FQHCs que usan calculadoras de compensación total?",
          },
          options: [
            {
              text: { en: "3% higher acceptance", es: "3% mayor aceptación" },
              isCorrect: false,
              explanation: {
                en: "Too low — the impact is larger when you show total value",
                es: "Demasiado bajo — el impacto es mayor",
              },
            },
            {
              text: { en: "12% higher acceptance", es: "12% mayor aceptación" },
              isCorrect: false,
              explanation: {
                en: "Close, but research shows 22% improvement",
                es: "Cercano, pero la investigación muestra 22%",
              },
            },
            {
              text: { en: "22% higher acceptance", es: "22% mayor aceptación" },
              isCorrect: true,
              explanation: {
                en: "Correct — transparency about total value drives better outcomes",
                es: "Correcto — la transparencia sobre valor total impulsa mejores resultados",
              },
            },
            {
              text: { en: "45% higher acceptance (nearly double)", es: "45% mayor aceptación (casi el doble)" },
              isCorrect: false,
              explanation: {
                en: "That's overly optimistic — 22% is the realistic improvement",
                es: "Eso es demasiado optimista — 22% es la mejora realista",
              },
            },
          ],
        },
      ],
      xpReward: 25,
    } as MiniQuizExercise,
    {
      type: "classifier",
      id: "m30-comp-components",
      instruction: {
        en: "Which are real components of FQHC total compensation value?",
        es: "¿Cuáles son componentes reales del valor de compensación total de FQHC?",
      },
      items: [
        {
          text: {
            en: "NHSC Loan Repayment ($30K-$50K for eligible roles)",
            es: "Repago de Préstamos NHSC ($30K-$50K para roles elegibles)",
          },
          isGood: true,
          explanation: {
            en: "Major advantage — hospitals can't offer this",
            es: "Ventaja importante — los hospitales no pueden ofrecer esto",
          },
        },
        {
          text: {
            en: "Federal Tort Claims Act (FTCA) malpractice coverage",
            es: "Cobertura de responsabilidad civil por Tort Reclamaciones Federales (FTCA)",
          },
          isGood: true,
          explanation: {
            en: "Peace of mind — covered if sued, unlike private practice",
            es: "Paz mental — cubierto si es demandado, a diferencia de práctica privada",
          },
        },
        {
          text: {
            en: "Guaranteed promotion to CEO within 5 years",
            es: "Promoción garantizada a CEO dentro de 5 años",
          },
          isGood: false,
          explanation: {
            en: "Not credible — use realistic value levers, not fantasies",
            es: "No creíble — usa palancas de valor realistas, no fantasías",
          },
        },
        {
          text: {
            en: "Bilingual premium ($2-5/hour for Spanish fluency)",
            es: "Prima bilingüe ($2-5/hora para fluidez en español)",
          },
          isGood: true,
          explanation: {
            en: "Adds $4K-$10K annually and attracts diverse talent",
            es: "Suma $4K-$10K anuales y atrae talento diverso",
          },
        },
        {
          text: {
            en: "Mission premium (emotional value of serving uninsured patients)",
            es: "Prima de misión (valor emocional de servir pacientes sin seguro)",
          },
          isGood: true,
          explanation: {
            en: "Candidates cite this as reason to join — $5K self-reported value",
            es: "Los candidatos citan esto como razón para unirse — $5K valor auto-reportado",
          },
        },
      ],
      xpReward: 20,
    } as ClassifierExercise,
  ],
  sourceMaterials: [
    { label: "NHSC Loan Repayment Program (HRSA)", url: "https://nhsc.hrsa.gov/loan-repayment" },
    { label: "Federal Tort Claims Act (28 USC 1346): FQHC Coverage", url: "https://www.justice.gov/civil/federal-tort-claims-act-ftca" },
    { label: "Bureau of Labor Statistics: Occupational Employment & Wages", url: "https://www.bls.gov/oes/" },
  ],
  totalXP: 45,
};

export const MASTERCLASS_MODULES_PART2: MasterclassCourseModule[] = [
  module16RemoteReady,
  module17Retention,
  module18FinancialResilience,
  module19SalaryNegotiation,
  module20HIPAAAtScale,
  module21OSVSurvival,
  module22BillingCompliance,
  module23340BCompliance,
  module24WorkersComp,
  module25WorkplaceViolence,
  module26SafetyCulture,
  module27SB525,
  module28NLRBWorkerRights,
  module29CredentialInflation,
  module30SalaryNegotiationEdge,
];
