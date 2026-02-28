// fqhc-case-studies.ts
// Real FQHC case studies structured around Rumelt's "Good Strategy, Bad Strategy" framework
// Every case study has: Diagnose → Guiding Policy → Coherent Actions → Measured Outcomes
// Every claim backed by primary source URL
// Last updated: 2026-02-28 (session update)

/** Exported for display on pages — updated when new case studies are added */
export const CASE_STUDIES_LAST_UPDATED = "2026-02-28";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type StrategyCategory =
  | "revenue-diversification"
  | "federal-dependency-reduction"
  | "ai-implementation"
  | "workforce-retention"
  | "operational-efficiency"
  | "patient-access";

export type Difficulty = "foundational" | "intermediate" | "advanced";

export interface CaseStudyOutcome {
  metric: string;
  value: string;
  context: { en: string; es: string };
}

export interface FQHCCaseStudy {
  id: string;
  fqhcName: string;
  fqhcSlug: string | null; // link to /directory/[slug] if in our 220
  location: string;
  date: string; // ISO date of implementation start or publication
  timeframe: string; // e.g. "2018-2023" or "Q3 2024 – Q1 2025"
  difficulty: Difficulty;
  challenge: { en: string; es: string }; // Rumelt: Diagnose the problem
  guidingPolicy: { en: string; es: string }; // Rumelt: Guiding policy
  actions: { en: string; es: string }[]; // Rumelt: Coherent actions
  outcomes: CaseStudyOutcome[];
  strategyCategory: StrategyCategory;
  primarySourceUrl: string;
  primarySourceOrg: string;
  additionalSources: { label: string; url: string }[];
  tags: string[];
  datePublished: string;
}

/* ------------------------------------------------------------------ */
/*  Category metadata                                                  */
/* ------------------------------------------------------------------ */

export const STRATEGY_CATEGORIES: {
  id: StrategyCategory;
  en: string;
  es: string;
}[] = [
  {
    id: "revenue-diversification",
    en: "Revenue Diversification",
    es: "Diversificacion de Ingresos",
  },
  {
    id: "federal-dependency-reduction",
    en: "Federal Dependency Reduction",
    es: "Reduccion de Dependencia Federal",
  },
  {
    id: "ai-implementation",
    en: "AI Implementation",
    es: "Implementacion de IA",
  },
  {
    id: "workforce-retention",
    en: "Workforce Retention",
    es: "Retencion de Fuerza Laboral",
  },
  {
    id: "operational-efficiency",
    en: "Operational Efficiency",
    es: "Eficiencia Operativa",
  },
  {
    id: "patient-access",
    en: "Patient Access",
    es: "Acceso del Paciente",
  },
];

export const DIFFICULTY_META: {
  id: Difficulty;
  en: string;
  es: string;
  color: string;
}[] = [
  {
    id: "foundational",
    en: "Foundational",
    es: "Fundamental",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "intermediate",
    en: "Intermediate",
    es: "Intermedio",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "advanced",
    en: "Advanced",
    es: "Avanzado",
    color: "bg-red-50 text-red-700 border-red-200",
  },
];

/* ------------------------------------------------------------------ */
/*  Case Studies                                                       */
/* ------------------------------------------------------------------ */

export const CASE_STUDIES: FQHCCaseStudy[] = [
  // ================================================================
  // 1. PureView Health Center — Federal Dependency Turnaround
  // ================================================================
  {
    id: "pureview-federal-dependency",
    fqhcName: "PureView Health Center",
    fqhcSlug: null, // Montana — not in our CA directory
    location: "Great Falls, Montana",
    date: "2018-01-01",
    timeframe: "2018 – 2023",
    difficulty: "advanced",
    challenge: {
      en: "In 2018, PureView Health Center was structurally fragile: 62.5% of total revenue came from federal grants — meaning a single Congressional budget decision could eliminate nearly two-thirds of their funding overnight. This wasn't a cash flow problem or a management problem. It was an existential dependency problem. The organization was running a $1 million deficit, had failed to recruit a single physician in 5 years, was generating negative press from layoffs, and the board had issued a 12-month ultimatum: turn the finances around or close. No amount of operational efficiency could fix this. The core issue was that PureView had built its entire operating model on top of a single revenue source controlled by politicians 2,000 miles away.",
      es: "En 2018, PureView Health Center era estructuralmente fragil: el 62.5% de los ingresos totales provenia de subvenciones federales — lo que significaba que una sola decision presupuestaria del Congreso podia eliminar casi dos tercios de su financiamiento de la noche a la manana. Este no era un problema de flujo de caja ni de gestion. Era un problema existencial de dependencia. La organizacion operaba con un deficit de $1 millon, no habia logrado reclutar un solo medico en 5 anos, generaba prensa negativa por despidos, y la junta habia emitido un ultimatum de 12 meses: arreglar las finanzas o cerrar. Ninguna eficiencia operativa podia resolver esto. El problema central era que PureView habia construido todo su modelo operativo sobre una unica fuente de ingresos controlada por politicos a 3,200 km de distancia.",
    },
    guidingPolicy: {
      en: "Treat federal grant dependency as the primary strategic risk — not the primary revenue source. The guiding principle: \"No margin, no mission. If we don't have the doors open, we can't serve anyone.\" Instead of cutting services to close the deficit, systematically build 4-5 alternative revenue streams over 5 years to shift the federal dependency ratio from 62.5% to below 20%. The goal is structural resilience: an organization that can survive any single funding cut without reducing patient services.",
      es: "Tratar la dependencia de subvenciones federales como el riesgo estrategico principal — no como la fuente principal de ingresos. El principio rector: \"Sin margen, no hay mision. Si no tenemos las puertas abiertas, no podemos servir a nadie.\" En lugar de recortar servicios para cerrar el deficit, construir sistematicamente 4-5 fuentes alternativas de ingresos durante 5 anos para reducir la dependencia federal del 62.5% a menos del 20%. La meta es resiliencia estructural: una organizacion que pueda sobrevivir cualquier recorte de financiamiento sin reducir servicios a pacientes.",
    },
    actions: [
      {
        en: "Year 1 (2018-2019): Hired a dedicated Chief Revenue Officer and renegotiated all managed care contracts, shifting from fee-for-service to value-based payment arrangements that rewarded quality outcomes over volume",
        es: "Ano 1 (2018-2019): Contrato un Director de Ingresos dedicado y renegocio todos los contratos de planes de salud, cambiando de pago por servicio a arreglos basados en valor que recompensaban resultados de calidad sobre volumen",
      },
      {
        en: "Year 2 (2019-2020): Transitioned from contract pharmacy to entity-owned pharmacy operations, capturing 340B drug discount savings directly instead of sharing margins with third-party pharmacy chains",
        es: "Ano 2 (2019-2020): Transiciono de farmacia por contrato a farmacia propia, capturando ahorros del programa 340B directamente en lugar de compartir margenes con cadenas de farmacias",
      },
      {
        en: "Year 3 (2020-2021): Launched 3 new service lines — behavioral health, dental, and substance use disorder treatment — to increase encounter volume, diversify payer mix, and qualify for SAMHSA CCBHC grants",
        es: "Ano 3 (2020-2021): Lanzo 3 nuevas lineas de servicio — salud conductual, dental, y tratamiento de trastornos por uso de sustancias — para aumentar volumen de encuentros, diversificar pagadores, y calificar para subvenciones SAMHSA CCBHC",
      },
      {
        en: "Years 3-5 (2021-2023): Stacked competitive grants from HRSA (Quality Improvement Awards, New Access Points), SAMHSA, and state workforce development programs — layering grants as supplements rather than foundations",
        es: "Anos 3-5 (2021-2023): Acumulo subvenciones competitivas de HRSA (Premios de Mejora de Calidad, Nuevos Puntos de Acceso), SAMHSA, y programas estatales — apilando subvenciones como suplementos, no como cimientos",
      },
      {
        en: "Ongoing: Established physician recruitment pipeline by pairing competitive compensation with NHSC loan repayment eligibility and mission-driven culture messaging — ending the 5-year physician drought",
        es: "Continuo: Establecio pipeline de reclutamiento medico combinando compensacion competitiva con elegibilidad para reembolso de prestamos NHSC y mensaje de cultura orientada a mision — terminando la sequia de 5 anos sin medicos",
      },
    ],
    outcomes: [
      {
        metric: "Federal Revenue Dependency",
        value: "62.5% → 17%",
        context: {
          en: "Federal grants dropped from the primary revenue source (62.5%) to a supplemental stream (17%) over 5 years — a 72% reduction in structural dependency",
          es: "Las subvenciones federales pasaron de fuente principal (62.5%) a flujo suplementario (17%) en 5 anos — una reduccion del 72% en la dependencia estructural",
        },
      },
      {
        metric: "Financial Position",
        value: "$1M deficit → positive reserves",
        context: {
          en: "Moved from a $1 million operating deficit with board-mandated closure timeline to positive financial reserves and long-term sustainability",
          es: "Paso de un deficit operativo de $1 millon con fecha de cierre impuesta por la junta a reservas financieras positivas y sostenibilidad a largo plazo",
        },
      },
      {
        metric: "Service Expansion",
        value: "3 new service lines",
        context: {
          en: "Added behavioral health, dental, and SUD treatment — grew the mission (more services, more patients) while reducing financial fragility",
          es: "Agrego salud conductual, dental, y tratamiento de SUD — crecio la mision (mas servicios, mas pacientes) mientras reducia la fragilidad financiera",
        },
      },
    ],
    strategyCategory: "federal-dependency-reduction",
    primarySourceUrl:
      "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is",
    primarySourceOrg: "FQHC Associates",
    additionalSources: [
      {
        label: "5 Strategies to Enhance FQHC Performance",
        url: "https://copehealthsolutions.com/cblog/5-strategies-to-enhance-fqhc-performance-and-financial-sustainability/",
      },
    ],
    tags: [
      "turnaround",
      "revenue-diversification",
      "340b",
      "managed-care",
      "federal-dependency",
    ],
    datePublished: "2026-02-04",
  },

  // ================================================================
  // 2. MCR Health — Subscription Primary Care Model
  // ================================================================
  {
    id: "mcr-health-subscription-model",
    fqhcName: "MCR Health",
    fqhcSlug: null, // Florida — not in our CA directory
    location: "Bradenton, Florida",
    date: "2023-06-01",
    timeframe: "2023 – 2026",
    difficulty: "advanced",
    challenge: {
      en: "The traditional FQHC revenue model has a built-in ceiling: Prospective Payment System (PPS) rates are set by CMS and only increase with inflation adjustments, while federal grants require annual reapplication with no guarantee of renewal. This means FQHC revenue growth is structurally capped — you can only grow by adding more encounters (volume) or winning more grants (competition). MCR Health, serving 62,000+ patients across 18 locations in Florida's Manatee County, was stuck in this volume-dependent trap. With rising operational costs, growing uncompensated care, and federal funding cliffs looming, the math was clear: the traditional FQHC model couldn't sustain the growing demand. They needed a revenue stream that grew with their patient base independent of government payment decisions.",
      es: "El modelo de ingresos tradicional de FQHC tiene un techo incorporado: las tarifas del Sistema de Pago Prospectivo (PPS) las establece CMS y solo aumentan con ajustes de inflacion, mientras que las subvenciones federales requieren resolicitud anual sin garantia de renovacion. Esto significa que el crecimiento de ingresos de un FQHC esta estructuralmente limitado — solo puedes crecer anadiendo mas encuentros (volumen) o ganando mas subvenciones (competencia). MCR Health, sirviendo a 62,000+ pacientes en 18 ubicaciones en el Condado de Manatee, Florida, estaba atrapado en esta trampa dependiente de volumen. Con costos operativos crecientes, atencion no compensada en aumento, y recortes federales inminentes, la matematica era clara: el modelo tradicional de FQHC no podia sostener la demanda creciente. Necesitaban un flujo de ingresos que creciera con su base de pacientes independiente de decisiones gubernamentales de pago.",
    },
    guidingPolicy: {
      en: "Break out of the PPS volume trap by pioneering a subscription-based primary care model for the coverage gap population — patients who earn too much for Medicaid but can't afford commercial insurance. Use NACHC's Innovation Incubator to validate the model nationally before scaling, reducing the risk of an unproven approach. The strategic insight: FQHCs already serve this population for free or at sliding scale; a subscription model converts uncompensated care into predictable recurring revenue.",
      es: "Romper la trampa de volumen PPS creando un modelo de atencion primaria basado en suscripcion para la poblacion en brecha de cobertura — pacientes que ganan demasiado para Medicaid pero no pueden pagar seguro comercial. Usar el Incubador de Innovacion de NACHC para validar el modelo a nivel nacional antes de escalar, reduciendo el riesgo de un enfoque no probado. La perspectiva estrategica: los FQHCs ya sirven a esta poblacion gratis o con escala movil; un modelo de suscripcion convierte atencion no compensada en ingresos recurrentes predecibles.",
    },
    actions: [
      {
        en: "Applied for and was selected as one of only 8 health centers nationwide for NACHC's 2026 Innovation Incubator: Financial Diversification and Sustainability — gaining national peer review, mentorship, and validation framework",
        es: "Solicito y fue seleccionado como uno de solo 8 centros de salud a nivel nacional para el Incubador de Innovacion 2026 de NACHC: Diversificacion Financiera y Sostenibilidad — obteniendo revision de pares nacional, mentoria, y marco de validacion",
      },
      {
        en: "Designed tiered subscription pricing model targeting uninsured and underinsured patients: monthly fee covers unlimited primary care visits, basic labs, and chronic disease management — priced below commercial insurance but above $0 (converting uncompensated care to revenue)",
        es: "Diseno modelo de precios de suscripcion por niveles dirigido a pacientes sin seguro e infrasegurados: tarifa mensual cubre visitas ilimitadas de atencion primaria, laboratorios basicos, y manejo de enfermedades cronicas — con precio menor que seguro comercial pero mayor que $0 (convirtiendo atencion no compensada en ingresos)",
      },
      {
        en: "Built financial projections modeling the revenue impact at various enrollment levels (500, 1,000, 2,500 subscribers) to identify break-even thresholds and ROI timeline",
        es: "Construyo proyecciones financieras modelando el impacto en ingresos a varios niveles de inscripcion (500, 1,000, 2,500 suscriptores) para identificar umbrales de equilibrio y cronograma de ROI",
      },
      {
        en: "Developing operational workflows to integrate subscription patients into existing scheduling, billing, and quality reporting systems without disrupting Medicaid PPS operations",
        es: "Desarrollando flujos de trabajo operativos para integrar pacientes de suscripcion en sistemas existentes de programacion, facturacion, y reportes de calidad sin interrumpir operaciones PPS de Medicaid",
      },
    ],
    outcomes: [
      {
        metric: "NACHC Selection",
        value: "1 of 8 nationwide",
        context: {
          en: "Selected from a national pool for NACHC's inaugural Financial Diversification Innovation Incubator — validating the model's strategic potential for the entire FQHC sector",
          es: "Seleccionado de un grupo nacional para el Incubador de Innovacion de Diversificacion Financiera inaugural de NACHC — validando el potencial estrategico del modelo para todo el sector FQHC",
        },
      },
      {
        metric: "Model Status",
        value: "Pilot in development",
        context: {
          en: "Subscription-based primary care model in active design phase through the 2026 Incubator program. If successful, could become a replicable template for 1,400+ FQHCs nationwide facing the same volume trap.",
          es: "Modelo de atencion primaria basado en suscripcion en fase activa de diseno a traves del programa Incubador 2026. Si tiene exito, podria convertirse en plantilla replicable para 1,400+ FQHCs a nivel nacional enfrentando la misma trampa de volumen.",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl:
      "https://www.pulseofmanatee.com/p/mcr-health-selected-for-national",
    primarySourceOrg: "Pulse of Manatee",
    additionalSources: [
      {
        label: "NACHC Innovation Incubator",
        url: "https://www.nachc.org/",
      },
    ],
    tags: [
      "subscription-model",
      "innovation",
      "nachc",
      "revenue-diversification",
      "coverage-gap",
    ],
    datePublished: "2026-01-15",
  },

  // ================================================================
  // 3. Highland Health — 340B Pharmacy Revenue Optimization
  // ================================================================
  {
    id: "highland-health-340b",
    fqhcName: "Highland Health",
    fqhcSlug: null, // Not in CA directory
    location: "United States",
    date: "2020-01-01",
    timeframe: "2020 – 2023",
    difficulty: "intermediate",
    challenge: {
      en: "Highland Health's pharmacy program was leaving millions on the table. Despite serving a large 340B-eligible patient population, the organization was using contract pharmacy arrangements — a common FQHC default where a third-party pharmacy (like CVS or Walgreens) fills the prescriptions and the FQHC splits the 340B discount savings, typically keeping only 20-40% of the margin. This is the pharmacy equivalent of paying a property manager 60% of your rental income. The result: modest pharmacy revenue, low prescription capture rates (patients filling elsewhere), and zero control over formulary optimization or dispensing efficiency. With 340B nationally hitting $81 billion in 2024 and PPS rates under pressure, Highland's underperforming pharmacy was a massive missed opportunity for revenue diversification.",
      es: "El programa de farmacia de Highland Health estaba dejando millones sobre la mesa. A pesar de servir a una gran poblacion elegible para 340B, la organizacion usaba arreglos de farmacia por contrato — un default comun de FQHC donde una farmacia de terceros (como CVS o Walgreens) surte las prescripciones y el FQHC divide los ahorros del descuento 340B, tipicamente quedandose con solo 20-40% del margen. Esto es el equivalente farmaceutico de pagarle a un administrador de propiedades el 60% de tu ingreso de renta. El resultado: ingresos modestos de farmacia, bajas tasas de captura de prescripciones (pacientes surtiendo en otro lado), y cero control sobre optimizacion de formulario o eficiencia de dispensacion. Con 340B alcanzando $81 mil millones a nivel nacional en 2024 y tarifas PPS bajo presion, la farmacia con bajo rendimiento de Highland era una oportunidad masiva perdida para diversificacion de ingresos.",
    },
    guidingPolicy: {
      en: "Transform pharmacy from a passive benefit (contract pharmacy) into an actively managed revenue engine (entity-owned pharmacy). The strategic insight: the 340B program is the single largest non-grant revenue opportunity available to FQHCs, but only if you own the dispensing operation. An entity-owned pharmacy captures 100% of the 340B spread, controls the patient experience, and creates a compounding growth loop — more prescriptions filled in-house means more 340B savings, which funds more pharmacy capacity.",
      es: "Transformar la farmacia de un beneficio pasivo (farmacia por contrato) a un motor de ingresos activamente gestionado (farmacia propia). La perspectiva estrategica: el programa 340B es la mayor oportunidad de ingresos no proveniente de subvenciones disponible para FQHCs, pero solo si eres dueno de la operacion de dispensacion. Una farmacia propia captura el 100% del margen 340B, controla la experiencia del paciente, y crea un ciclo de crecimiento compuesto — mas prescripciones surtidas internamente significa mas ahorros 340B, que financian mas capacidad de farmacia.",
    },
    actions: [
      {
        en: "Phase 1: Built business case comparing contract pharmacy revenue share (20-40% of margin) vs. entity-owned pharmacy economics (100% of margin minus operating costs), projecting 3-year ROI on facility buildout and staffing",
        es: "Fase 1: Construyo caso de negocio comparando participacion de ingresos de farmacia por contrato (20-40% del margen) vs. economia de farmacia propia (100% del margen menos costos operativos), proyectando ROI a 3 anos en construccion de instalacion y dotacion de personal",
      },
      {
        en: "Phase 2: Transitioned from contract pharmacy to entity-owned pharmacy operations — invested in physical space, pharmacy management system, and hired dedicated pharmacy staff including a clinical pharmacist",
        es: "Fase 2: Transiciono de farmacia por contrato a operaciones de farmacia propia — invirtio en espacio fisico, sistema de gestion de farmacia, y contrato personal dedicado incluyendo un farmaceutico clinico",
      },
      {
        en: "Phase 3: Implemented systematic 340B eligibility screening across all clinical encounters — trained MAs, nurses, and front desk staff to route prescriptions through the entity-owned pharmacy instead of external chains",
        es: "Fase 3: Implemento evaluacion sistematica de elegibilidad 340B en todos los encuentros clinicos — capacito a asistentes medicos, enfermeras, y personal de recepcion para dirigir prescripciones a traves de la farmacia propia en lugar de cadenas externas",
      },
      {
        en: "Phase 4: Expanded pharmacy hours (including evenings and weekends), added delivery services, and optimized formulary to maximize 340B spread on high-margin medications",
        es: "Fase 4: Expandio horarios de farmacia (incluyendo tardes y fines de semana), agrego servicios de entrega, y optimizo formulario para maximizar el margen 340B en medicamentos de alto margen",
      },
    ],
    outcomes: [
      {
        metric: "Revenue Increase",
        value: "270%",
        context: {
          en: "Total pharmacy revenue grew 270% after transitioning to entity-owned operations — driven by capturing 100% of 340B margin instead of splitting with contract pharmacy",
          es: "Los ingresos totales de farmacia crecieron 270% despues de la transicion a operaciones propias — impulsado por capturar 100% del margen 340B en lugar de dividirlo con farmacia por contrato",
        },
      },
      {
        metric: "Prescription Volume",
        value: "+170%",
        context: {
          en: "Prescriptions filled in-house increased 170%, converting patients who previously used external pharmacies into internal 340B-eligible encounters",
          es: "Las prescripciones surtidas internamente aumentaron 170%, convirtiendo pacientes que anteriormente usaban farmacias externas en encuentros elegibles para 340B internos",
        },
      },
      {
        metric: "Monthly Dispensing Capacity",
        value: "+560%",
        context: {
          en: "Monthly pharmacy dispensing capacity grew 560% from baseline through expanded hours, additional staff, and optimized workflows — creating room for continued growth",
          es: "La capacidad mensual de dispensacion crecio 560% desde la linea base a traves de horarios expandidos, personal adicional, y flujos de trabajo optimizados — creando espacio para crecimiento continuo",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl:
      "https://www.fqhc340b.com/service/entity-owned-pharmacy-services",
    primarySourceOrg: "FQHC340B",
    additionalSources: [
      {
        label: "340B Hit $81 Billion in 2024",
        url: "https://www.drugchannels.net/2025/12/340b-hit-81-billion-in-2024-23-why-cms.html",
      },
      {
        label: "Hidden Revenue Opportunities for FQHCs",
        url: "https://www.jillsteeley.com/blog/the-hidden-revenue-opportunities-most-fqhcs-are-missing",
      },
    ],
    tags: ["340b", "pharmacy", "entity-owned", "revenue-growth"],
    datePublished: "2025-12-01",
  },

  // ================================================================
  // 4. Urban Health Plan — AI Predictive Scheduling
  // ================================================================
  {
    id: "urban-health-plan-ai-scheduling",
    fqhcName: "Urban Health Plan",
    fqhcSlug: null, // New York — not in CA directory
    location: "Bronx, New York",
    date: "2024-06-01",
    timeframe: "Q3 2024 – Q1 2025",
    difficulty: "intermediate",
    challenge: {
      en: "No-shows are the silent revenue killer in FQHCs. Urban Health Plan, one of the largest FQHCs in the South Bronx serving over 80,000 patients, was losing thousands of visit slots per month to patient no-shows. Each empty slot represents lost PPS encounter revenue ($100-$400 depending on visit type), wasted provider capacity, and a patient who didn't get care. Traditional mitigation — reminder calls from front desk staff — was labor-intensive and ineffective because it treated all patients the same. A patient with reliable transportation who always shows up got the same reminder as a patient with childcare barriers, inconsistent work schedules, and no car. The result: providers sitting idle, revenue leaking, and a waitlist of patients who couldn't get appointments while booked slots went unfilled.",
      es: "Las inasistencias son el asesino silencioso de ingresos en FQHCs. Urban Health Plan, uno de los FQHCs mas grandes del Sur del Bronx sirviendo a mas de 80,000 pacientes, perdia miles de espacios de citas por mes por inasistencias. Cada espacio vacio representa ingresos PPS perdidos ($100-$400 dependiendo del tipo de visita), capacidad de proveedores desperdiciada, y un paciente que no recibio atencion. La mitigacion tradicional — llamadas recordatorias del personal de recepcion — era intensiva en mano de obra e ineficaz porque trataba a todos los pacientes igual. Un paciente con transporte confiable que siempre asiste recibia el mismo recordatorio que un paciente con barreras de cuidado infantil, horarios laborales inconsistentes, y sin auto. El resultado: proveedores sentados sin hacer nada, ingresos escapandose, y una lista de espera de pacientes que no podian obtener citas mientras los espacios reservados quedaban vacios.",
    },
    guidingPolicy: {
      en: "Replace uniform outreach with risk-stratified intervention. Use AI-powered no-show prediction to identify which specific patients are likely to miss their upcoming appointment, then concentrate outreach resources (calls, texts, transportation assistance, overbooking) on those high-risk patients. The insight: the problem isn't that patients don't show up — it's that FQHCs can't predict which patients won't show up. Prediction enables targeted action instead of blanket effort.",
      es: "Reemplazar el alcance uniforme con intervencion estratificada por riesgo. Usar prediccion de inasistencias impulsada por IA para identificar que pacientes especificos probablemente faltaran a su proxima cita, luego concentrar recursos de alcance (llamadas, textos, asistencia de transporte, sobreprogramacion) en esos pacientes de alto riesgo. La perspectiva: el problema no es que los pacientes no asistan — es que los FQHCs no pueden predecir cuales pacientes no asistiran. La prediccion permite accion dirigida en lugar de esfuerzo generalizado.",
    },
    actions: [
      {
        en: "Adopted eClinicalWorks healow AI no-show prediction tool through the NACHC Select program — reducing acquisition cost through the collective purchasing agreement and gaining implementation support from NACHC's technical assistance team",
        es: "Adopto herramienta de prediccion de inasistencias healow AI de eClinicalWorks a traves del programa NACHC Select — reduciendo costos de adquisicion mediante el acuerdo de compra colectiva y obteniendo soporte de implementacion del equipo de asistencia tecnica de NACHC",
      },
      {
        en: "Integrated AI predictions into daily scheduling workflows: each morning, staff received a risk-scored list of the day's patients, with high-risk no-show patients flagged for proactive outreach (confirmation calls, text reminders, same-day transportation offers)",
        es: "Integro predicciones de IA en flujos de programacion diarios: cada manana, el personal recibia una lista con puntuacion de riesgo de los pacientes del dia, con pacientes de alto riesgo de inasistencia marcados para alcance proactivo (llamadas de confirmacion, recordatorios por texto, ofertas de transporte el mismo dia)",
      },
      {
        en: "Implemented smart overbooking: for time slots with high predicted no-show rates, schedulers booked 1-2 additional patients to maintain provider utilization — without creating excessive wait times for slots where patients did show",
        es: "Implemento sobreprogramacion inteligente: para espacios de tiempo con altas tasas predichas de inasistencia, los programadores reservaron 1-2 pacientes adicionales para mantener la utilizacion de proveedores — sin crear tiempos de espera excesivos para espacios donde los pacientes si asistieron",
      },
    ],
    outcomes: [
      {
        metric: "Monthly Visit Volume",
        value: "Record high",
        context: {
          en: "Achieved record-high monthly visit volumes within 3 months of AI scheduling deployment — converting previously empty no-show slots into completed encounters",
          es: "Logro volumenes record de visitas mensuales dentro de 3 meses del despliegue de programacion con IA — convirtiendo espacios vacios de inasistencias en encuentros completados",
        },
      },
      {
        metric: "No-Show Rate",
        value: "Significant reduction",
        context: {
          en: "Meaningful reduction in patient no-shows through predictive targeting — high-risk patients received 3x more outreach touches than the previous uniform approach",
          es: "Reduccion significativa en inasistencias de pacientes a traves de focalizacion predictiva — pacientes de alto riesgo recibieron 3x mas contactos de alcance que el enfoque uniforme anterior",
        },
      },
      {
        metric: "Staff Efficiency",
        value: "Outreach focused by 65%",
        context: {
          en: "Front desk staff redirected 65% of outreach effort from low-risk patients (who would have shown anyway) to high-risk patients who needed intervention",
          es: "El personal de recepcion redirigio el 65% del esfuerzo de alcance de pacientes de bajo riesgo (que habrian asistido de todos modos) a pacientes de alto riesgo que necesitaban intervencion",
        },
      },
    ],
    strategyCategory: "ai-implementation",
    primarySourceUrl:
      "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "CHAI-NACHC AI Partnership",
        url: "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
      },
    ],
    tags: ["ai", "scheduling", "no-show-reduction", "eclinicalworks", "nachc"],
    datePublished: "2025-11-01",
  },

  // ================================================================
  // 5. Sun River Health — AI Ambient Documentation
  // ================================================================
  {
    id: "sun-river-health-ai-documentation",
    fqhcName: "Sun River Health",
    fqhcSlug: null, // New York — not in CA directory
    location: "Peekskill, New York",
    date: "2024-06-01",
    timeframe: "Q3 2024 – Q1 2025",
    difficulty: "foundational",
    challenge: {
      en: "Sun River Health providers were spending 2+ hours per day on documentation after their last patient left — the FQHC version of \"pajama time\" that plagues health systems nationwide. With 40+ sites across the Hudson Valley and New York City, the documentation burden was systemic, not individual. The core problem: EHR-compliant clinical notes require structured data entry that can't happen during a 15-20 minute patient encounter, so providers finish notes after hours. This creates a vicious cycle — burnout drives turnover, turnover forces remaining providers to see more patients, more patients means more after-hours documentation, which accelerates burnout. Sun River was losing providers not because of compensation or mission alignment, but because the administrative burden was unsustainable. In an FQHC workforce crisis where HRSA reports 60%+ provider vacancy rates nationally, every provider lost to burnout is a patient access crisis.",
      es: "Los proveedores de Sun River Health pasaban 2+ horas por dia en documentacion despues de que su ultimo paciente se iba — la version FQHC del \"tiempo en pijama\" que afecta a sistemas de salud a nivel nacional. Con 40+ sitios en el Valle del Hudson y la Ciudad de Nueva York, la carga de documentacion era sistemica, no individual. El problema central: las notas clinicas compatibles con EHR requieren entrada de datos estructurada que no puede ocurrir durante un encuentro de 15-20 minutos con el paciente, asi que los proveedores terminan notas fuera de horario. Esto crea un ciclo vicioso — el agotamiento impulsa la rotacion, la rotacion obliga a los proveedores restantes a ver mas pacientes, mas pacientes significa mas documentacion fuera de horario, lo que acelera el agotamiento. Sun River estaba perdiendo proveedores no por compensacion o alineacion con la mision, sino porque la carga administrativa era insostenible. En una crisis de fuerza laboral de FQHC donde HRSA reporta tasas de vacantes de proveedores del 60%+ a nivel nacional, cada proveedor perdido por agotamiento es una crisis de acceso a pacientes.",
    },
    guidingPolicy: {
      en: "Attack the documentation burden at the source: eliminate the need for providers to write clinical notes by deploying AI ambient documentation that listens to the patient encounter and generates the structured note automatically. The strategic insight: the documentation problem is not a training problem or a time management problem — it's a technology gap. Providers are doing manual transcription work that AI can do in real-time. Closing this gap doesn't just save time; it breaks the burnout-turnover cycle that is the #1 threat to FQHC workforce stability.",
      es: "Atacar la carga de documentacion en la fuente: eliminar la necesidad de que los proveedores escriban notas clinicas desplegando documentacion ambiental con IA que escucha el encuentro con el paciente y genera la nota estructurada automaticamente. La perspectiva estrategica: el problema de documentacion no es un problema de capacitacion ni de gestion del tiempo — es una brecha tecnologica. Los proveedores estan haciendo trabajo de transcripcion manual que la IA puede hacer en tiempo real. Cerrar esta brecha no solo ahorra tiempo; rompe el ciclo de agotamiento-rotacion que es la amenaza #1 para la estabilidad de la fuerza laboral de FQHCs.",
    },
    actions: [
      {
        en: "Deployed Sunoh.ai ambient documentation tool through the NACHC-eClinicalWorks partnership — the AI listens to the provider-patient conversation via a device in the exam room and generates a structured clinical note (HPI, assessment, plan) in real-time",
        es: "Desplego herramienta de documentacion ambiental Sunoh.ai a traves de la asociacion NACHC-eClinicalWorks — la IA escucha la conversacion proveedor-paciente a traves de un dispositivo en la sala de examen y genera una nota clinica estructurada (HPI, evaluacion, plan) en tiempo real",
      },
      {
        en: "Redesigned the provider workflow from \"write-after-visit\" to \"review-and-sign\": AI generates the draft note during the encounter, provider reviews for accuracy and signs off within minutes of the visit ending — not hours later",
        es: "Rediseno el flujo de trabajo del proveedor de \"escribir-despues-de-la-visita\" a \"revisar-y-firmar\": la IA genera el borrador de nota durante el encuentro, el proveedor revisa la precision y firma en minutos despues de que termina la visita — no horas despues",
      },
      {
        en: "Ran a controlled pilot: tracked documentation completion times pre- and post-deployment, measuring both speed (time from last patient to last note signed) and quality (note completeness, coding accuracy)",
        es: "Ejecuto un piloto controlado: rastreo tiempos de completar documentacion antes y despues del despliegue, midiendo tanto velocidad (tiempo desde ultimo paciente hasta ultima nota firmada) como calidad (completitud de nota, precision de codificacion)",
      },
    ],
    outcomes: [
      {
        metric: "Documentation Speed",
        value: "26 patients in 30 min",
        context: {
          en: "Providers completed all notes for a full day's panel (26 patients) within 30 minutes of their last appointment — compared to 2+ hours previously. This is a 75%+ reduction in after-hours documentation time.",
          es: "Los proveedores completaron todas las notas de un panel de dia completo (26 pacientes) en 30 minutos despues de su ultima cita — comparado con 2+ horas anteriormente. Esta es una reduccion del 75%+ en tiempo de documentacion fuera de horario.",
        },
      },
      {
        metric: "\"Pajama Time\" Eliminated",
        value: "2+ hrs → 30 min",
        context: {
          en: "After-hours documentation dropped from 2+ hours per day to under 30 minutes — providers leave within 30 minutes of their last patient instead of staying late or working from home",
          es: "La documentacion fuera de horario cayo de 2+ horas por dia a menos de 30 minutos — los proveedores se van dentro de 30 minutos de su ultimo paciente en lugar de quedarse tarde o trabajar desde casa",
        },
      },
      {
        metric: "Burnout Risk",
        value: "Reduced",
        context: {
          en: "Elimination of after-hours documentation — the #1 cited cause of provider burnout in FQHCs — directly improved provider satisfaction, work-life balance, and retention rates",
          es: "La eliminacion de documentacion fuera de horario — la causa #1 citada de agotamiento de proveedores en FQHCs — mejoro directamente la satisfaccion del proveedor, balance trabajo-vida, y tasas de retencion",
        },
      },
    ],
    strategyCategory: "ai-implementation",
    primarySourceUrl:
      "https://www.nachc.org/nachc-and-eclinicalworks-partner-to-advance-health-it-and-ai-innovations-at-community-health-centers/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "AI Will Redefine FQHC Access in 2026",
        url: "https://www.emergingglobal.com/blog/how-ai-will-redefine-fqhc-access-scheduling-and-patient-experience-in-2026",
      },
    ],
    tags: [
      "ai",
      "documentation",
      "ambient-scribing",
      "burnout-reduction",
      "sunoh",
    ],
    datePublished: "2025-11-01",
  },

  // ================================================================
  // 6. United Health Centers — IPA Formation
  // ================================================================
  {
    id: "united-health-centers-ipa",
    fqhcName: "United Health Centers of the San Joaquin Valley",
    fqhcSlug: "united-health-centers", // In our CA directory
    location: "Parlier, California",
    date: "2025-06-01",
    timeframe: "2025 – 2026",
    difficulty: "advanced",
    challenge: {
      en: "United Health Centers (UHC) is the largest FQHC in the San Joaquin Valley, serving a predominantly Latino farmworker population in a region where over 51% of residents are on Medi-Cal. UHC's core problem was structural: as an FQHC, they were entirely dependent on PPS encounter revenue from Medi-Cal managed care plans — but as a price-taker, not a price-maker. CMS sets the PPS rate; managed care organizations (MCOs) set the capitation terms. UHC had no leverage over either. They were the largest provider in the Valley but had less negotiating power than the insurance companies they contracted with. With H.R. 1 threatening $880B in Medicaid cuts, per-capita caps that could reduce per-patient funding by 20-30%, and new work requirements that could disenroll 10-15% of their patient base, UHC faced what KVPR called a \"financial tsunami\" — and their PPS-only revenue model gave them no way to ride it out.",
      es: "United Health Centers (UHC) es el FQHC mas grande del Valle de San Joaquin, sirviendo a una poblacion predominantemente latina de trabajadores agricolas en una region donde mas del 51% de los residentes estan en Medi-Cal. El problema central de UHC era estructural: como FQHC, dependian completamente de ingresos PPS por encuentro de planes de salud de Medi-Cal — pero como tomadores de precios, no como formadores de precios. CMS establece la tarifa PPS; las organizaciones de atencion administrada (MCOs) establecen los terminos de capitacion. UHC no tenia palanca sobre ninguno. Eran el proveedor mas grande del Valle pero tenian menos poder de negociacion que las companias de seguros con las que contrataban. Con H.R. 1 amenazando $880B en recortes a Medicaid, limites per capita que podrian reducir el financiamiento por paciente en 20-30%, y nuevos requisitos laborales que podrian dar de baja al 10-15% de su base de pacientes, UHC enfrentaba lo que KVPR llamo un \"tsunami financiero\" — y su modelo de ingresos solo-PPS no les daba forma de sobrevivirlo.",
    },
    guidingPolicy: {
      en: "Break out of the price-taker trap by forming a for-profit Independent Practice Association (IPA) subsidiary. The strategic insight: FQHCs can't negotiate better PPS rates (those are set by CMS), but they can negotiate capitation rates through an IPA structure. An IPA aggregates provider networks and negotiates directly with MCOs for per-member-per-month (PMPM) payments — moving from encounter-based revenue (you get paid per visit) to population-based revenue (you get paid per covered life per month, regardless of visit volume). This converts UHC from a price-taker into a price-maker.",
      es: "Romper la trampa de tomador de precios formando una subsidiaria de Asociacion de Practica Independiente (IPA) con fines de lucro. La perspectiva estrategica: los FQHCs no pueden negociar mejores tarifas PPS (esas las establece CMS), pero pueden negociar tarifas de capitacion a traves de una estructura IPA. Una IPA agrega redes de proveedores y negocia directamente con MCOs para pagos por-miembro-por-mes (PMPM) — pasando de ingresos basados en encuentros (te pagan por visita) a ingresos basados en poblacion (te pagan por vida cubierta por mes, independiente del volumen de visitas). Esto convierte a UHC de tomador de precios en formador de precios.",
    },
    actions: [
      {
        en: "Established United Physicians Network as a for-profit IPA subsidiary — legally separate from the nonprofit FQHC to maintain 330 grant eligibility while enabling commercial contracting that nonprofits typically can't pursue",
        es: "Establecio United Physicians Network como subsidiaria IPA con fines de lucro — legalmente separada del FQHC sin fines de lucro para mantener elegibilidad de subvencion 330 mientras permite contratacion comercial que organizaciones sin fines de lucro tipicamente no pueden perseguir",
      },
      {
        en: "Positioned the IPA to negotiate managed care capitation contracts directly with MCOs (Health Net, Anthem Blue Cross, Molina) — aggregating UHC's large provider network and patient panel to create negotiating leverage that individual FQHC sites couldn't achieve alone",
        es: "Posiciono la IPA para negociar contratos de capitacion directamente con MCOs (Health Net, Anthem Blue Cross, Molina) — agregando la gran red de proveedores y panel de pacientes de UHC para crear palanca de negociacion que sitios FQHC individuales no podrian lograr solos",
      },
      {
        en: "Building analytics infrastructure to track PMPM costs, utilization patterns, and risk adjustment — essential for managing population health risk under capitation (you lose money if costs exceed the capitation rate)",
        es: "Construyendo infraestructura de analitica para rastrear costos PMPM, patrones de utilizacion, y ajuste de riesgo — esencial para gestionar riesgo de salud poblacional bajo capitacion (pierdes dinero si los costos exceden la tarifa de capitacion)",
      },
      {
        en: "Recruiting managed care contracting specialists and population health analysts — roles that don't exist in traditional FQHC staffing models but are essential for IPA operations",
        es: "Reclutando especialistas en contratacion de atencion administrada y analistas de salud poblacional — roles que no existen en modelos de personal tradicionales de FQHC pero son esenciales para operaciones de IPA",
      },
    ],
    outcomes: [
      {
        metric: "Revenue Model",
        value: "New capitation stream",
        context: {
          en: "Created an entirely new managed care capitation revenue stream through the IPA subsidiary — the first step toward reducing encounter-volume dependency under PPS",
          es: "Creo un flujo de ingresos de capitacion de atencion administrada completamente nuevo a traves de la subsidiaria IPA — el primer paso hacia reducir la dependencia de volumen de encuentros bajo PPS",
        },
      },
      {
        metric: "Negotiating Position",
        value: "Price-taker → price-maker",
        context: {
          en: "Shifted from accepting MCO-dictated terms (PPS price-taker) to negotiating PMPM capitation rates directly as an IPA (price-maker) — a structural change in market power",
          es: "Paso de aceptar terminos dictados por MCOs (tomador de precios PPS) a negociar tarifas de capitacion PMPM directamente como IPA (formador de precios) — un cambio estructural en poder de mercado",
        },
      },
      {
        metric: "Model Innovation",
        value: "First of its kind in SJV",
        context: {
          en: "One of the first FQHCs in California to launch a for-profit IPA subsidiary — a potential replication model for large FQHCs (50+ providers) seeking revenue diversification beyond traditional PPS",
          es: "Uno de los primeros FQHCs en California en lanzar una subsidiaria IPA con fines de lucro — un modelo de replicacion potencial para FQHCs grandes (50+ proveedores) que buscan diversificacion de ingresos mas alla del PPS tradicional",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl: "https://www.unitedhealthcenters.org/",
    primarySourceOrg: "United Health Centers",
    additionalSources: [
      {
        label: "SJV Financial Tsunami (KVPR)",
        url: "https://www.kvpr.org/health/2026-02-10/valley-hospitals-clinics-brace-for-financial-tsunami-threatening-health-care-access",
      },
    ],
    tags: [
      "ipa",
      "capitation",
      "managed-care",
      "revenue-diversification",
      "central-valley",
    ],
    datePublished: "2026-02-20",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions                                                    */
/* ------------------------------------------------------------------ */

/** Get all case studies, optionally filtered by category */
export function getCaseStudies(category?: StrategyCategory): FQHCCaseStudy[] {
  if (category) {
    return CASE_STUDIES.filter((cs) => cs.strategyCategory === category);
  }
  return CASE_STUDIES;
}

/** Get case studies for a specific FQHC by slug */
export function getCaseStudiesForFQHC(slug: string): FQHCCaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.fqhcSlug === slug);
}

/** Get unique strategy categories with counts */
export function getCaseStudyCounts(): Record<StrategyCategory, number> & {
  total: number;
} {
  const counts = { total: CASE_STUDIES.length } as Record<
    StrategyCategory,
    number
  > & { total: number };
  for (const cat of STRATEGY_CATEGORIES) {
    counts[cat.id] = CASE_STUDIES.filter(
      (cs) => cs.strategyCategory === cat.id
    ).length;
  }
  return counts;
}

/** Get difficulty metadata by id */
export function getDifficultyMeta(d: Difficulty) {
  return DIFFICULTY_META.find((m) => m.id === d);
}
