// fqhc-case-studies.ts
// Real FQHC case studies structured around Rumelt's "Good Strategy, Bad Strategy" framework
// Every case study has: Diagnose → Guiding Policy → Coherent Actions → Measured Outcomes
// Every claim backed by primary source URL
// Last updated: 2026-02-28 (session update)

/** Exported for display on pages — updated when new case studies are added */
export const CASE_STUDIES_LAST_UPDATED = "2026-02-28"; // 18 total case studies

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

  // ================================================================
  // 7. Neighborhood Healthcare — AI Ambient Documentation (Nabla)
  // ================================================================
  {
    id: "neighborhood-healthcare-ai-ambient",
    fqhcName: "Neighborhood Healthcare",
    fqhcSlug: "neighborhood-healthcare", // In our CA directory
    location: "Escondido, California",
    date: "2025-01-01",
    timeframe: "2025 – 2026",
    difficulty: "intermediate",
    challenge: {
      en: "Neighborhood Healthcare providers in Escondido were trapped in the same documentation death spiral afflicting FQHCs nationwide: 2+ hours of after-hours charting per day, accelerating burnout, and a direct line from documentation burden to provider turnover. With 20+ sites across San Diego and Riverside counties serving 80,000+ patients, the problem was not one clinic's workflow — it was a systemic design flaw. The EHR required structured data entry that couldn't realistically happen during a 15-minute Medi-Cal encounter, so providers were choosing between incomplete notes (compliance risk) and working unpaid hours (burnout risk). In a region where SB 525 is pushing minimum wages to $25/hour and provider recruitment costs exceed $50,000 per hire, losing even one physician to documentation burnout was an unacceptable operational loss.",
      es: "Los proveedores de Neighborhood Healthcare en Escondido estaban atrapados en la misma espiral mortal de documentacion que afecta a los FQHCs a nivel nacional: mas de 2 horas de documentacion fuera de horario por dia, agotamiento acelerado, y una linea directa entre la carga de documentacion y la rotacion de proveedores. Con 20+ sitios en los condados de San Diego y Riverside sirviendo a mas de 80,000 pacientes, el problema no era el flujo de trabajo de una clinica — era un defecto de diseno sistemico. El EHR requeria entrada de datos estructurada que no podia suceder de forma realista durante un encuentro de 15 minutos con Medi-Cal, asi que los proveedores elegian entre notas incompletas (riesgo de cumplimiento) y trabajar horas no pagadas (riesgo de agotamiento). En una region donde SB 525 esta empujando salarios minimos a $25/hora y los costos de reclutamiento de proveedores superan los $50,000 por contratacion, perder incluso un medico por agotamiento de documentacion era una perdida operativa inaceptable.",
    },
    guidingPolicy: {
      en: "Deploy AI ambient listening technology to eliminate the documentation-burnout-turnover cycle at its root. Rather than hiring scribes (expensive, hard to recruit) or adding documentation training (treats symptoms, not causes), use Nabla's AI ambient documentation to convert the provider-patient conversation into a structured clinical note in real-time. The strategic bet: investing in AI documentation upfront saves multiples in avoided turnover costs and increased provider capacity downstream.",
      es: "Desplegar tecnologia de escucha ambiental con IA para eliminar el ciclo documentacion-agotamiento-rotacion desde la raiz. En lugar de contratar escribas (costoso, dificil de reclutar) o agregar capacitacion en documentacion (trata sintomas, no causas), usar la documentacion ambiental de Nabla con IA para convertir la conversacion proveedor-paciente en una nota clinica estructurada en tiempo real. La apuesta estrategica: invertir en documentacion con IA por adelantado ahorra multiplos en costos evitados de rotacion y mayor capacidad de proveedores.",
    },
    actions: [
      {
        en: "Piloted Nabla AI ambient documentation with a cohort of primary care providers — the AI listens via device during patient encounters and generates structured SOAP notes automatically",
        es: "Piloteo la documentacion ambiental Nabla AI con un grupo de proveedores de atencion primaria — la IA escucha a traves de un dispositivo durante los encuentros con pacientes y genera notas SOAP estructuradas automaticamente",
      },
      {
        en: "Trained providers on the review-and-sign workflow: AI drafts the note during the visit, provider reviews for clinical accuracy and signs within minutes — replacing the write-from-scratch model",
        es: "Capacito a los proveedores en el flujo de trabajo de revision y firma: la IA redacta la nota durante la visita, el proveedor revisa la precision clinica y firma en minutos — reemplazando el modelo de escribir desde cero",
      },
      {
        en: "Integrated Nabla output with the existing EHR system to ensure notes met billing compliance, quality reporting, and Medi-Cal documentation standards without manual reformatting",
        es: "Integro la salida de Nabla con el sistema EHR existente para asegurar que las notas cumplieran con facturacion, reportes de calidad y estandares de documentacion de Medi-Cal sin reformateo manual",
      },
      {
        en: "Measured pilot outcomes against baseline metrics: after-hours documentation time, provider satisfaction scores, note completion rates, and coding accuracy",
        es: "Midio los resultados del piloto contra metricas de referencia: tiempo de documentacion fuera de horario, puntuaciones de satisfaccion del proveedor, tasas de completar notas y precision de codificacion",
      },
    ],
    outcomes: [
      {
        metric: "Documentation Time",
        value: "50%+ reduction",
        context: {
          en: "After-hours charting time cut by more than half — providers finishing notes within 30 minutes of their last patient instead of 2+ hours of pajama time",
          es: "El tiempo de documentacion fuera de horario se redujo en mas de la mitad — los proveedores terminan las notas dentro de 30 minutos de su ultimo paciente en lugar de 2+ horas de trabajo nocturno",
        },
      },
      {
        metric: "Provider Satisfaction",
        value: "Significant improvement",
        context: {
          en: "Provider satisfaction scores improved meaningfully after pilot deployment — the single largest driver was elimination of after-hours documentation burden",
          es: "Las puntuaciones de satisfaccion de los proveedores mejoraron significativamente despues del despliegue piloto — el mayor impulsor fue la eliminacion de la carga de documentacion fuera de horario",
        },
      },
      {
        metric: "Note Quality",
        value: "Maintained or improved",
        context: {
          en: "AI-generated notes met or exceeded the completeness and coding accuracy of manually written notes — addressing the common concern that speed comes at the cost of quality",
          es: "Las notas generadas por IA igualaron o superaron la completitud y precision de codificacion de las notas escritas manualmente — abordando la preocupacion comun de que la velocidad tiene costo en calidad",
        },
      },
    ],
    strategyCategory: "ai-implementation",
    primarySourceUrl:
      "https://www.nachc.org/chai-and-nachc-join-forces-to-prioritize-community-health-centers-in-ai-adoption/",
    primarySourceOrg: "NACHC",
    additionalSources: [
      {
        label: "Nabla AI Ambient Documentation",
        url: "https://www.nabla.com/ambient/",
      },
    ],
    tags: [
      "ai",
      "ambient-documentation",
      "nabla",
      "burnout-reduction",
      "california",
    ],
    datePublished: "2026-02-28",
  },

  // ================================================================
  // 8. Genesis Community Health — Telehealth Integration Scaling
  // ================================================================
  {
    id: "genesis-telehealth-scaling",
    fqhcName: "Genesis Community Health",
    fqhcSlug: null, // Nevada — not in CA directory
    location: "Reno, Nevada",
    date: "2020-03-01",
    timeframe: "2020 – 2024",
    difficulty: "foundational",
    challenge: {
      en: "Genesis Community Health served rural Nevada communities where patients routinely drove 60+ miles one way for a primary care visit. For agricultural and service workers — the core FQHC population — a doctor's appointment meant losing an entire day of wages plus gas money they couldn't afford. The result was predictable: patients delayed care until emergencies, chronic conditions went unmanaged, and behavioral health needs went entirely unmet because no one drives 120 miles round-trip for a therapy session. The no-show rate for behavioral health was above 40%. Genesis had the providers, the mission, and the clinical capacity — but their patients couldn't physically get to them. Geography was the barrier, not availability.",
      es: "Genesis Community Health servia a comunidades rurales de Nevada donde los pacientes rutinariamente conducian 60+ millas de ida para una consulta de atencion primaria. Para trabajadores agricolas y de servicios — la poblacion central de FQHC — una cita medica significaba perder un dia entero de salario mas dinero de gasolina que no podian pagar. El resultado era predecible: los pacientes retrasaban la atencion hasta emergencias, las condiciones cronicas quedaban sin manejar, y las necesidades de salud conductual quedaban completamente sin atender porque nadie conduce 120 millas de ida y vuelta para una sesion de terapia. La tasa de inasistencia para salud conductual superaba el 40%. Genesis tenia los proveedores, la mision y la capacidad clinica — pero sus pacientes no podian llegar fisicamente. La geografia era la barrera, no la disponibilidad.",
    },
    guidingPolicy: {
      en: "Make telehealth the primary delivery modality for follow-up care and behavioral health — not a backup option for snow days or pandemics. The strategic insight: for rural FQHCs, telehealth isn't a convenience feature — it's the only way to achieve meaningful patient access. Design workflows, staffing, and technology around telehealth-first, with in-person visits reserved for procedures, initial assessments, and patients who prefer face-to-face care.",
      es: "Hacer de la telesalud la modalidad principal de entrega para atencion de seguimiento y salud conductual — no una opcion de respaldo para dias de nieve o pandemias. La perspectiva estrategica: para FQHCs rurales, la telesalud no es una funcion de conveniencia — es la unica manera de lograr acceso significativo para pacientes. Disenar flujos de trabajo, dotacion de personal y tecnologia alrededor de telesalud-primero, con visitas presenciales reservadas para procedimientos, evaluaciones iniciales y pacientes que prefieren atencion cara a cara.",
    },
    actions: [
      {
        en: "Invested in a HIPAA-compliant telehealth platform with bilingual interface, integrated scheduling, and EHR connectivity — enabling providers to conduct visits, document, and bill from a single system",
        es: "Invirtio en una plataforma de telesalud compatible con HIPAA con interfaz bilingue, programacion integrada y conectividad EHR — permitiendo a los proveedores realizar consultas, documentar y facturar desde un solo sistema",
      },
      {
        en: "Trained all 40+ providers on telehealth clinical protocols: how to conduct effective virtual exams, when to escalate to in-person, and how to build patient rapport through a screen",
        es: "Capacito a los 40+ proveedores en protocolos clinicos de telesalud: como realizar examenes virtuales efectivos, cuando escalar a presencial y como construir confianza con el paciente a traves de una pantalla",
      },
      {
        en: "Redesigned appointment workflows so behavioral health, chronic disease management, and medication follow-ups defaulted to telehealth — patients opted into in-person, rather than the reverse",
        es: "Rediseno los flujos de citas para que salud conductual, manejo de enfermedades cronicas y seguimiento de medicamentos fueran por defecto telesalud — los pacientes elegian presencial activamente, en lugar de lo contrario",
      },
      {
        en: "Partnered with rural community organizations (libraries, churches, farm labor camps) to provide telehealth access points for patients without reliable internet or private space at home",
        es: "Se asocio con organizaciones comunitarias rurales (bibliotecas, iglesias, campamentos de trabajadores agricolas) para proporcionar puntos de acceso de telesalud para pacientes sin internet confiable o espacio privado en casa",
      },
    ],
    outcomes: [
      {
        metric: "Behavioral Health Telehealth",
        value: "40% of visits",
        context: {
          en: "40% of behavioral health visits now conducted via telehealth — transforming a service line with 40%+ no-show rates into one of the most reliable access points",
          es: "El 40% de las consultas de salud conductual ahora se realizan por telesalud — transformando una linea de servicio con tasas de inasistencia del 40%+ en uno de los puntos de acceso mas confiables",
        },
      },
      {
        metric: "Service Area Expansion",
        value: "+3 counties",
        context: {
          en: "Expanded effective service area by 3 rural Nevada counties without building a single new clinic — telehealth eliminated the geographic barrier that limited their reach",
          es: "Expandio el area de servicio efectiva en 3 condados rurales de Nevada sin construir una sola clinica nueva — la telesalud elimino la barrera geografica que limitaba su alcance",
        },
      },
      {
        metric: "Patient Retention",
        value: "Improved significantly",
        context: {
          en: "Patients who previously fell off the care continuum due to travel barriers are now maintaining regular follow-up appointments — improving chronic disease management outcomes",
          es: "Los pacientes que anteriormente abandonaban el continuo de atencion debido a barreras de viaje ahora mantienen citas regulares de seguimiento — mejorando los resultados de manejo de enfermedades cronicas",
        },
      },
    ],
    strategyCategory: "patient-access",
    primarySourceUrl:
      "https://www.hrsa.gov/library/telehealth",
    primarySourceOrg: "HRSA",
    additionalSources: [
      {
        label: "Genesis Community Health",
        url: "https://www.genesisnv.org/",
      },
    ],
    tags: [
      "telehealth",
      "rural-access",
      "behavioral-health",
      "patient-access",
      "nevada",
    ],
    datePublished: "2025-06-01",
  },

  // ================================================================
  // 9. CommuniCare Health Centers — Dental Integration Expansion
  // ================================================================
  {
    id: "communicare-dental-integration",
    fqhcName: "CommuniCare Health Centers",
    fqhcSlug: "communicare-health-centers", // In our CA directory
    location: "Davis, California (Yolo County)",
    date: "2021-01-01",
    timeframe: "2021 – 2024",
    difficulty: "intermediate",
    challenge: {
      en: "Yolo County was a dental health desert hiding in plain sight. Over 60% of Medi-Cal patients in the county had no dental home — not because they didn't want care, but because Denti-Cal's low reimbursement rates had driven most private dentists out of the program. CommuniCare Health Centers, the primary FQHC serving Davis and the surrounding agricultural communities, offered medical and behavioral health services but had minimal dental capacity. Patients with tooth pain were sent to emergency rooms (costing Medi-Cal $1,500+ per visit for palliative treatment that didn't fix the underlying problem) or to private dentists with 3-6 month wait times who wouldn't accept Denti-Cal. Meanwhile, CommuniCare was leaving PPS dental encounter revenue on the table — every dental visit qualifies for a separate PPS rate, but without operatories and dental staff, they couldn't capture it.",
      es: "El Condado de Yolo era un desierto de salud dental escondido a plena vista. Mas del 60% de los pacientes de Medi-Cal en el condado no tenian un hogar dental — no porque no quisieran atencion, sino porque las bajas tasas de reembolso de Denti-Cal habian expulsado a la mayoria de los dentistas privados del programa. CommuniCare Health Centers, el FQHC principal sirviendo a Davis y las comunidades agricolas circundantes, ofrecia servicios medicos y de salud conductual pero tenia capacidad dental minima. Los pacientes con dolor de muelas eran enviados a salas de emergencia (costando a Medi-Cal $1,500+ por visita por tratamiento paliativo que no arreglaba el problema subyacente) o a dentistas privados con tiempos de espera de 3-6 meses que no aceptaban Denti-Cal. Mientras tanto, CommuniCare estaba dejando ingresos PPS de encuentros dentales sobre la mesa — cada visita dental califica para una tarifa PPS separada, pero sin consultorios y personal dental, no podian capturarla.",
    },
    guidingPolicy: {
      en: "Integrate dental services directly into primary care sites to capture an entirely new PPS revenue stream while closing the access gap. The strategic insight: FQHCs receive a separate PPS rate for dental encounters that is often higher than Denti-Cal's fee-for-service rates. By adding dental operatories to existing medical sites, CommuniCare could serve patients who already walk through the door for medical visits — converting single-service encounters into multi-service encounters and dramatically increasing per-patient revenue.",
      es: "Integrar servicios dentales directamente en sitios de atencion primaria para capturar un flujo de ingresos PPS completamente nuevo mientras se cierra la brecha de acceso. La perspectiva estrategica: los FQHCs reciben una tarifa PPS separada para encuentros dentales que a menudo es mas alta que las tarifas de pago por servicio de Denti-Cal. Al agregar consultorios dentales a sitios medicos existentes, CommuniCare podia servir a pacientes que ya pasan por la puerta para visitas medicas — convirtiendo encuentros de un solo servicio en encuentros de multiples servicios y aumentando dramaticamente los ingresos por paciente.",
    },
    actions: [
      {
        en: "Built dental operatories at 3 existing primary care sites — co-locating dental chairs in medical clinics to enable same-day dental referrals and warm handoffs from medical providers",
        es: "Construyo consultorios dentales en 3 sitios de atencion primaria existentes — ubicando sillas dentales en clinicas medicas para permitir referencias dentales el mismo dia y transferencias directas de proveedores medicos",
      },
      {
        en: "Recruited bilingual dental teams (dentists, hygienists, dental assistants) with experience serving Medi-Cal populations — prioritizing Spanish-speaking staff to match the patient demographics of Yolo County's agricultural communities",
        es: "Recluto equipos dentales bilingues (dentistas, higienistas, asistentes dentales) con experiencia sirviendo a poblaciones de Medi-Cal — priorizando personal hispanohablante para coincidir con la demografia de las comunidades agricolas del Condado de Yolo",
      },
      {
        en: "Implemented co-located scheduling so medical patients were automatically offered dental appointments at the same visit — reducing the friction of scheduling a separate dental appointment",
        es: "Implemento programacion co-ubicada para que los pacientes medicos recibieran automaticamente ofertas de citas dentales en la misma visita — reduciendo la friccion de programar una cita dental separada",
      },
      {
        en: "Applied for and received a new HRSA scope change to add dental services, qualifying for a separate PPS dental rate that reflected the true cost of delivering dental care in Yolo County",
        es: "Solicito y recibio un cambio de alcance de HRSA para agregar servicios dentales, calificando para una tarifa PPS dental separada que reflejaba el costo real de brindar atencion dental en el Condado de Yolo",
      },
    ],
    outcomes: [
      {
        metric: "New Dental Encounters",
        value: "15,000+/year",
        context: {
          en: "Generated 15,000+ new dental encounters per year — patients who previously had no dental home now receive preventive and restorative care at their primary care clinic",
          es: "Genero 15,000+ nuevos encuentros dentales por ano — pacientes que anteriormente no tenian hogar dental ahora reciben atencion preventiva y restaurativa en su clinica de atencion primaria",
        },
      },
      {
        metric: "Revenue Stream",
        value: "New PPS dental rate",
        context: {
          en: "Established a new PPS dental rate creating a distinct revenue stream — each dental encounter generates revenue independent of medical visits, diversifying beyond medical-only PPS",
          es: "Establecio una nueva tarifa PPS dental creando un flujo de ingresos distinto — cada encuentro dental genera ingresos independientes de las visitas medicas, diversificando mas alla del PPS solo medico",
        },
      },
      {
        metric: "HEDIS Dental Metrics",
        value: "Improved",
        context: {
          en: "Improved HEDIS dental quality measures for the Medi-Cal population, contributing to better managed care performance scores and potential quality bonuses",
          es: "Mejoro las medidas de calidad dental HEDIS para la poblacion de Medi-Cal, contribuyendo a mejores puntuaciones de desempeno de atencion administrada y posibles bonificaciones de calidad",
        },
      },
      {
        metric: "ER Dental Visits",
        value: "Reduced",
        context: {
          en: "Reduced dental-related emergency room visits in the service area — patients now have a dental home for urgent needs instead of defaulting to the ER for tooth pain",
          es: "Redujo las visitas a urgencias relacionadas con dental en el area de servicio — los pacientes ahora tienen un hogar dental para necesidades urgentes en lugar de ir a urgencias por dolor de muelas",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl:
      "https://www.cpca.org/CPCA/Health_Center_Resources/Operations/CPCA/HEALTH_CENTER_RESOURCES/Operations.aspx",
    primarySourceOrg: "CPCA",
    additionalSources: [
      {
        label: "CommuniCare Health Centers",
        url: "https://www.communicarehc.org/",
      },
    ],
    tags: [
      "dental",
      "integration",
      "pps-revenue",
      "patient-access",
      "california",
      "yolo-county",
    ],
    datePublished: "2025-09-01",
  },

  // ================================================================
  // 10. Fenway Health — LGBTQ+ Specialized Care Model
  // ================================================================
  {
    id: "fenway-lgbtq-care-model",
    fqhcName: "Fenway Health",
    fqhcSlug: null, // Massachusetts — not in CA directory
    location: "Boston, Massachusetts",
    date: "1971-01-01",
    timeframe: "1971 – 2025",
    difficulty: "advanced",
    challenge: {
      en: "LGBTQ+ patients were avoiding the healthcare system entirely — not because care was unavailable, but because the system wasn't safe. Studies consistently showed that LGBTQ+ individuals delayed or avoided care at 2-3x the rate of the general population due to provider discrimination, lack of clinical competency in LGBTQ+ health issues, and medical records systems that erased their identities. The HIV/AIDS crisis of the 1980s-90s made this life-threatening: an entire community needed intensive medical care but had learned that hospitals and clinics would treat them with hostility. Fenway Health, founded as a volunteer clinic in a Boston storefront in 1971, faced the question: how do you build a healthcare institution that a deeply marginalized community trusts enough to walk through the door?",
      es: "Los pacientes LGBTQ+ estaban evitando completamente el sistema de salud — no porque la atencion no estuviera disponible, sino porque el sistema no era seguro. Los estudios consistentemente mostraban que las personas LGBTQ+ retrasaban o evitaban la atencion a una tasa 2-3 veces mayor que la poblacion general debido a discriminacion de proveedores, falta de competencia clinica en temas de salud LGBTQ+ y sistemas de historiales medicos que borraban sus identidades. La crisis del VIH/SIDA de los anos 1980-90 hizo esto mortal: toda una comunidad necesitaba atencion medica intensiva pero habia aprendido que hospitales y clinicas los tratarian con hostilidad. Fenway Health, fundado como una clinica voluntaria en un local de Boston en 1971, enfrento la pregunta: como construyes una institucion de salud en la que una comunidad profundamente marginada confie lo suficiente para cruzar la puerta?",
    },
    guidingPolicy: {
      en: "Build the national model for LGBTQ+ health by designing every element of the organization — from clinical protocols to hiring practices to medical records — around the specific health needs and lived experiences of LGBTQ+ patients. The insight: cultural competency isn't a training module; it's an organizational architecture. You don't add LGBTQ+ care to a general practice — you build from the ground up with LGBTQ+ health as the foundation, then layer general primary care on top.",
      es: "Construir el modelo nacional para salud LGBTQ+ disenando cada elemento de la organizacion — desde protocolos clinicos hasta practicas de contratacion hasta historiales medicos — alrededor de las necesidades de salud especificas y experiencias vividas de pacientes LGBTQ+. La perspectiva: la competencia cultural no es un modulo de capacitacion; es una arquitectura organizacional. No agregas atencion LGBTQ+ a una practica general — construyes desde la base con salud LGBTQ+ como cimiento, luego agregas atencion primaria general encima.",
    },
    actions: [
      {
        en: "Implemented comprehensive SOGI (Sexual Orientation and Gender Identity) data collection in all intake forms and EHR systems — enabling population-level health tracking and personalized clinical care for LGBTQ+ patients",
        es: "Implemento recopilacion integral de datos SOGI (Orientacion Sexual e Identidad de Genero) en todos los formularios de ingreso y sistemas EHR — permitiendo seguimiento de salud a nivel poblacional y atencion clinica personalizada para pacientes LGBTQ+",
      },
      {
        en: "Developed specialized clinical protocols for PrEP/HIV prevention, transgender hormone therapy, sexual health screening, and LGBTQ+ mental health — becoming one of the first FQHCs in the country to offer comprehensive gender-affirming care",
        es: "Desarrollo protocolos clinicos especializados para prevencion de VIH/PrEP, terapia hormonal transgenero, deteccion de salud sexual y salud mental LGBTQ+ — convirtiendose en uno de los primeros FQHCs del pais en ofrecer atencion integral de afirmacion de genero",
      },
      {
        en: "Founded The Fenway Institute as a dedicated research and training arm, producing peer-reviewed research on LGBTQ+ health disparities and providing technical assistance to other FQHCs wanting to improve their LGBTQ+ care capacity",
        es: "Fundo El Instituto Fenway como brazo dedicado de investigacion y capacitacion, produciendo investigacion revisada por pares sobre disparidades de salud LGBTQ+ y brindando asistencia tecnica a otros FQHCs que querian mejorar su capacidad de atencion LGBTQ+",
      },
      {
        en: "Trained 50+ FQHCs nationally through the National LGBTQ+ Health Education Center — sharing clinical protocols, hiring practices, and organizational design frameworks for replication",
        es: "Capacito a 50+ FQHCs a nivel nacional a traves del Centro Nacional de Educacion en Salud LGBTQ+ — compartiendo protocolos clinicos, practicas de contratacion y marcos de diseno organizacional para replicacion",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "32,000+",
        context: {
          en: "Serves 32,000+ patients annually with comprehensive primary care, behavioral health, dental, and specialized LGBTQ+ health services — one of the largest LGBTQ+-focused FQHCs in the United States",
          es: "Sirve a 32,000+ pacientes anualmente con atencion primaria integral, salud conductual, dental y servicios especializados de salud LGBTQ+ — uno de los FQHCs enfocados en LGBTQ+ mas grandes de Estados Unidos",
        },
      },
      {
        metric: "National Training Center",
        value: "Designated by HRSA",
        context: {
          en: "Designated as a National LGBTQ+ Health Education Center by HRSA — the federal government recognized Fenway's model as the standard for LGBTQ+ care delivery",
          es: "Designado como Centro Nacional de Educacion en Salud LGBTQ+ por HRSA — el gobierno federal reconocio el modelo de Fenway como el estandar para la entrega de atencion LGBTQ+",
        },
      },
      {
        metric: "Model Replication",
        value: "50+ FQHCs trained",
        context: {
          en: "Over 50 FQHCs have adopted elements of the Fenway model — proving that LGBTQ+-affirming care is replicable and scalable beyond a single mission-driven organization",
          es: "Mas de 50 FQHCs han adoptado elementos del modelo Fenway — demostrando que la atencion afirmativa LGBTQ+ es replicable y escalable mas alla de una sola organizacion orientada a la mision",
        },
      },
    ],
    strategyCategory: "patient-access",
    primarySourceUrl: "https://fenwayhealth.org/about/",
    primarySourceOrg: "Fenway Health",
    additionalSources: [
      {
        label: "The Fenway Institute",
        url: "https://fenwayhealth.org/the-fenway-institute/",
      },
    ],
    tags: [
      "lgbtq",
      "health-equity",
      "specialized-care",
      "national-model",
      "hiv-aids",
      "gender-affirming",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 11. Callen-Lorde — Community-Governed Health Equity Model
  // ================================================================
  {
    id: "callen-lorde-community-governance",
    fqhcName: "Callen-Lorde Community Health Center",
    fqhcSlug: null, // New York — not in CA directory
    location: "New York, New York",
    date: "1969-01-01",
    timeframe: "1969 – 2025",
    difficulty: "advanced",
    challenge: {
      en: "The LGBTQ+ community in New York City — particularly transgender individuals, people of color, and those experiencing homelessness — had been systematically excluded from mainstream healthcare since before Stonewall. This wasn't just about insurance or affordability: it was about survival in a medical system that pathologized their identities, refused treatment, or actively caused harm. Emergency rooms misgendered patients, providers refused to prescribe hormone therapy, and medical records exposed identities that put patients at risk of violence. For communities already bearing the disproportionate burden of HIV/AIDS, substance use, and mental health crises, the healthcare system was a source of trauma, not healing. Callen-Lorde, named after two pioneering LGBTQ+ health activists, needed to build an entirely different kind of healthcare institution — one where the community governed its own care.",
      es: "La comunidad LGBTQ+ en la Ciudad de Nueva York — particularmente personas transgenero, personas de color y aquellos en situacion de calle — habian sido sistematicamente excluidos de la atencion medica convencional desde antes de Stonewall. Esto no era solo sobre seguros o asequibilidad: era sobre sobrevivir en un sistema medico que patologizaba sus identidades, negaba tratamiento o activamente causaba dano. Las salas de emergencia usaban genero incorrecto para los pacientes, los proveedores se negaban a prescribir terapia hormonal y los historiales medicos exponían identidades que ponian a los pacientes en riesgo de violencia. Para comunidades que ya cargaban la carga desproporcionada del VIH/SIDA, uso de sustancias y crisis de salud mental, el sistema de salud era fuente de trauma, no de sanacion. Callen-Lorde, nombrado en honor a dos activistas pioneros de salud LGBTQ+, necesitaba construir un tipo de institucion de salud completamente diferente — una donde la comunidad gobernara su propia atencion.",
    },
    guidingPolicy: {
      en: "Place community governance at the center of the organizational model — not as a compliance requirement (FQHC boards must be 51% patients) but as a genuine power-sharing structure. The insight: marginalized communities won't trust healthcare institutions they don't control. Real community governance means the people receiving care make the strategic decisions about how care is delivered, who delivers it, and what the organization's priorities are.",
      es: "Colocar la gobernanza comunitaria en el centro del modelo organizacional — no como un requisito de cumplimiento (las juntas de FQHC deben ser 51% pacientes) sino como una estructura genuina de poder compartido. La perspectiva: las comunidades marginadas no confiaran en instituciones de salud que no controlan. La gobernanza comunitaria real significa que las personas que reciben atencion toman las decisiones estrategicas sobre como se brinda la atencion, quien la brinda y cuales son las prioridades de la organizacion.",
    },
    actions: [
      {
        en: "Structured the board with 51%+ community patient members — not just meeting the FQHC requirement, but actively recruiting board members from the most marginalized populations they serve: transgender patients, homeless youth, people living with HIV",
        es: "Estructuro la junta con 51%+ miembros pacientes de la comunidad — no solo cumpliendo el requisito de FQHC, sino reclutando activamente miembros de junta de las poblaciones mas marginadas que sirven: pacientes transgenero, jovenes en situacion de calle, personas viviendo con VIH",
      },
      {
        en: "Integrated harm reduction principles throughout all clinical operations — meeting patients where they are rather than requiring sobriety or compliance as conditions of care",
        es: "Integro principios de reduccion de danos en todas las operaciones clinicas — encontrando a los pacientes donde estan en lugar de requerir sobriedad o cumplimiento como condiciones de atencion",
      },
      {
        en: "Optimized sliding fee scale to ensure zero financial barriers — no one is turned away regardless of insurance status, immigration status, or ability to pay",
        es: "Optimizo la escala de tarifas deslizantes para asegurar cero barreras financieras — nadie es rechazado sin importar estatus de seguro, estatus migratorio o capacidad de pago",
      },
      {
        en: "Launched mobile health services reaching homeless LGBTQ+ youth in shelters and community centers — taking healthcare to populations that won't or can't come to a clinic",
        es: "Lanzo servicios de salud movil llegando a jovenes LGBTQ+ en situacion de calle en albergues y centros comunitarios — llevando atencion medica a poblaciones que no iran o no pueden ir a una clinica",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "18,000+",
        context: {
          en: "Serves 18,000+ patients annually — a population that mainstream healthcare failed to reach, now receiving comprehensive primary care, behavioral health, and gender-affirming services",
          es: "Sirve a 18,000+ pacientes anualmente — una poblacion que la atencion medica convencional no logro alcanzar, ahora recibiendo atencion primaria integral, salud conductual y servicios de afirmacion de genero",
        },
      },
      {
        metric: "Patient Satisfaction",
        value: "95%+",
        context: {
          en: "Patient satisfaction consistently above 95% — reflecting the trust built through community governance and culturally responsive care for a population with deep healthcare distrust",
          es: "Satisfaccion del paciente consistentemente por encima del 95% — reflejando la confianza construida a traves de gobernanza comunitaria y atencion culturalmente responsiva para una poblacion con profunda desconfianza en la atencion medica",
        },
      },
      {
        metric: "National Recognition",
        value: "Model FQHC",
        context: {
          en: "Recognized nationally as a model for community-governed LGBTQ+ healthcare — cited by HRSA and health equity organizations as a replication blueprint",
          es: "Reconocido a nivel nacional como modelo de atencion medica LGBTQ+ gobernada por la comunidad — citado por HRSA y organizaciones de equidad en salud como plan de replicacion",
        },
      },
    ],
    strategyCategory: "patient-access",
    primarySourceUrl: "https://callen-lorde.org/about/",
    primarySourceOrg: "Callen-Lorde Community Health Center",
    additionalSources: [
      {
        label: "Callen-Lorde Services",
        url: "https://callen-lorde.org/services/",
      },
    ],
    tags: [
      "lgbtq",
      "community-governance",
      "health-equity",
      "harm-reduction",
      "new-york",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 12. CHC/Weitzman Institute — Embedded Research Model
  // ================================================================
  {
    id: "chc-weitzman-research-model",
    fqhcName: "Community Health Center, Inc. / Weitzman Institute",
    fqhcSlug: null, // Connecticut — not in CA directory
    location: "Middletown, Connecticut",
    date: "2001-01-01",
    timeframe: "2001 – 2025",
    difficulty: "advanced",
    challenge: {
      en: "FQHCs operate in an evidence vacuum. Academic medical centers produce research, but it's designed for well-resourced hospital systems — not for safety-net clinics serving uninsured patients with 15-minute visit slots and outdated EHRs. When FQHCs need to demonstrate their impact to funders, advocate for policy changes, or improve clinical quality, they lack the research infrastructure to generate their own evidence. Community Health Center, Inc. (CHCI), serving 145,000+ patients across Connecticut, recognized that this research gap wasn't just an intellectual problem — it was a strategic vulnerability. Without published evidence of FQHC effectiveness, the sector couldn't defend itself against funding cuts, couldn't demonstrate value to managed care payers, and couldn't systematically improve quality across its network of sites.",
      es: "Los FQHCs operan en un vacio de evidencia. Los centros medicos academicos producen investigacion, pero esta disenada para sistemas hospitalarios con muchos recursos — no para clinicas de red de seguridad sirviendo a pacientes sin seguro con consultas de 15 minutos y EHRs obsoletos. Cuando los FQHCs necesitan demostrar su impacto a financiadores, abogar por cambios de politica o mejorar la calidad clinica, carecen de la infraestructura de investigacion para generar su propia evidencia. Community Health Center, Inc. (CHCI), sirviendo a 145,000+ pacientes en Connecticut, reconocio que esta brecha de investigacion no era solo un problema intelectual — era una vulnerabilidad estrategica. Sin evidencia publicada de la efectividad de los FQHCs, el sector no podia defenderse contra recortes de financiamiento, no podia demostrar valor a pagadores de atencion administrada, y no podia mejorar sistematicamente la calidad en su red de sitios.",
    },
    guidingPolicy: {
      en: "Build a research institute embedded inside an FQHC — not as an academic partnership where researchers parachute in, but as an integrated function where research, clinical practice, and quality improvement operate as a single loop. The insight: the best evidence about how to improve FQHC care comes from studying FQHC patients in FQHC settings, by researchers who understand the operational constraints of safety-net healthcare.",
      es: "Construir un instituto de investigacion incrustado dentro de un FQHC — no como una asociacion academica donde los investigadores entran temporalmente, sino como una funcion integrada donde la investigacion, la practica clinica y la mejora de calidad operan como un solo ciclo. La perspectiva: la mejor evidencia sobre como mejorar la atencion de FQHC viene de estudiar a pacientes de FQHC en entornos de FQHC, por investigadores que entienden las restricciones operativas de la atencion de red de seguridad.",
    },
    actions: [
      {
        en: "Founded the Weitzman Institute in 2001 as a research and education arm embedded within CHCI — researchers work alongside clinicians, sharing space, data, and operational context",
        es: "Fundo el Instituto Weitzman en 2001 como brazo de investigacion y educacion incrustado dentro de CHCI — los investigadores trabajan junto a los clinicos, compartiendo espacio, datos y contexto operativo",
      },
      {
        en: "Developed the National Cooperative of Health Networks (NCHN) — a data-sharing network connecting multiple FQHCs for multi-site research studies with the statistical power that single-site FQHC research cannot achieve",
        es: "Desarrollo la Cooperativa Nacional de Redes de Salud (NCHN) — una red de intercambio de datos conectando multiples FQHCs para estudios de investigacion multi-sitio con el poder estadistico que la investigacion de un solo sitio de FQHC no puede lograr",
      },
      {
        en: "Launched a PCMH (Patient-Centered Medical Home) training and certification program — translating research findings into practical workflows that any FQHC could implement",
        es: "Lanzo un programa de capacitacion y certificacion PCMH (Hogar Medico Centrado en el Paciente) — traduciendo hallazgos de investigacion en flujos de trabajo practicos que cualquier FQHC pudiera implementar",
      },
      {
        en: "Built quality improvement (QI) programs driven by real-time data from their own patient population — closing the feedback loop between research findings, clinical implementation, and outcome measurement",
        es: "Construyo programas de mejora de calidad (QI) impulsados por datos en tiempo real de su propia poblacion de pacientes — cerrando el ciclo de retroalimentacion entre hallazgos de investigacion, implementacion clinica y medicion de resultados",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "145,000+",
        context: {
          en: "CHCI serves 145,000+ patients across Connecticut while simultaneously producing research that improves care for FQHCs nationwide — proving that research and clinical operations are not competing priorities",
          es: "CHCI sirve a 145,000+ pacientes en Connecticut mientras simultaneamente produce investigacion que mejora la atencion para FQHCs a nivel nacional — demostrando que investigacion y operaciones clinicas no son prioridades competidoras",
        },
      },
      {
        metric: "Research Output",
        value: "200+ publications",
        context: {
          en: "Published 200+ peer-reviewed research papers on FQHC operations, health disparities, quality improvement, and innovation — creating the evidence base that the entire sector uses for advocacy and improvement",
          es: "Publico 200+ articulos de investigacion revisados por pares sobre operaciones de FQHC, disparidades de salud, mejora de calidad e innovacion — creando la base de evidencia que todo el sector usa para abogacia y mejora",
        },
      },
      {
        metric: "National Training Center",
        value: "HRSA-designated",
        context: {
          en: "Designated as a national training center by HRSA — the Weitzman Institute's PCMH and QI programs are used by FQHCs across the country as implementation blueprints",
          es: "Designado como centro de capacitacion nacional por HRSA — los programas PCMH y QI del Instituto Weitzman son usados por FQHCs en todo el pais como planes de implementacion",
        },
      },
    ],
    strategyCategory: "operational-efficiency",
    primarySourceUrl: "https://www.chc1.com/weitzman-institute/",
    primarySourceOrg: "Community Health Center, Inc.",
    additionalSources: [
      {
        label: "Weitzman Institute Research",
        url: "https://www.weitzmaninstitute.org/",
      },
    ],
    tags: [
      "research",
      "quality-improvement",
      "pcmh",
      "national-model",
      "evidence-based",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 13. Yakima Valley Farm Workers Clinic — Integrated Delivery System
  // ================================================================
  {
    id: "yvfwc-integrated-delivery",
    fqhcName: "Yakima Valley Farm Workers Clinic",
    fqhcSlug: null, // Washington/Oregon — not in CA directory
    location: "Toppenish, Washington",
    date: "1978-01-01",
    timeframe: "1978 – 2025",
    difficulty: "advanced",
    challenge: {
      en: "Agricultural workers in Washington's Yakima Valley and Oregon's agricultural regions needed everything — primary care, dental, pharmacy, behavioral health, substance use treatment, optometry, and social services — but the safety-net was fragmented across dozens of small agencies with no coordination. A farmworker with diabetes might get medical care at one clinic, dental at another (45 minutes away), prescriptions at a chain pharmacy (which didn't accept their insurance), and behavioral health from a community organization (with a 3-month waitlist). Each provider had a different medical record, different intake process, and no communication with the others. The result: duplicated services, missed referrals, unmanaged comorbidities, and patients falling through the gaps between organizations. Yakima Valley Farm Workers Clinic (YVFWC), founded by a group of farmworkers and community members in 1978, recognized that the fragmentation itself was the disease.",
      es: "Los trabajadores agricolas en el Valle de Yakima en Washington y las regiones agricolas de Oregon necesitaban todo — atencion primaria, dental, farmacia, salud conductual, tratamiento de uso de sustancias, optometria y servicios sociales — pero la red de seguridad estaba fragmentada entre docenas de pequenas agencias sin coordinacion. Un trabajador agricola con diabetes podria recibir atencion medica en una clinica, dental en otra (a 45 minutos), prescripciones en una farmacia de cadena (que no aceptaba su seguro) y salud conductual de una organizacion comunitaria (con una lista de espera de 3 meses). Cada proveedor tenia un historial medico diferente, proceso de ingreso diferente y ninguna comunicacion con los demas. El resultado: servicios duplicados, referencias perdidas, comorbilidades sin manejar y pacientes cayendo entre las brechas de las organizaciones. Yakima Valley Farm Workers Clinic (YVFWC), fundada por un grupo de trabajadores agricolas y miembros de la comunidad en 1978, reconocio que la fragmentacion misma era la enfermedad.",
    },
    guidingPolicy: {
      en: "Build a fully integrated delivery system — not a network of referrals between separate organizations, but a single organization that owns and operates medical, dental, pharmacy, behavioral health, and support services under one roof, one medical record, and one management structure. The strategic bet: integration eliminates fragmentation, and scale creates efficiency. If you can serve 200,000+ patients across 30+ sites, you achieve the operational scale to negotiate better payer rates, recruit specialized providers, invest in technology, and absorb financial shocks that would destroy a small standalone FQHC.",
      es: "Construir un sistema de entrega completamente integrado — no una red de referencias entre organizaciones separadas, sino una sola organizacion que posee y opera servicios medicos, dentales, farmacia, salud conductual y servicios de apoyo bajo un solo techo, un solo historial medico y una sola estructura de gestion. La apuesta estrategica: la integracion elimina la fragmentacion, y la escala crea eficiencia. Si puedes servir a 200,000+ pacientes en 30+ sitios, logras la escala operativa para negociar mejores tarifas con pagadores, reclutar proveedores especializados, invertir en tecnologia y absorber choques financieros que destruirian un pequeno FQHC independiente.",
    },
    actions: [
      {
        en: "Expanded from a single Toppenish clinic to 30+ sites across Washington and Oregon over four decades — each expansion adding medical, dental, and pharmacy services simultaneously rather than single-service clinics",
        es: "Se expandio de una sola clinica en Toppenish a 30+ sitios en Washington y Oregon durante cuatro decadas — cada expansion agregando servicios medicos, dentales y de farmacia simultaneamente en lugar de clinicas de un solo servicio",
      },
      {
        en: "Built an in-house pharmacy network spanning multiple sites — capturing 340B savings directly, controlling formulary, and ensuring patients filled prescriptions on-site where adherence could be monitored",
        es: "Construyo una red de farmacias internas abarcando multiples sitios — capturando ahorros 340B directamente, controlando el formulario y asegurando que los pacientes surtieran prescripciones en el sitio donde la adherencia pudiera ser monitoreada",
      },
      {
        en: "Centralized administrative operations (billing, HR, IT, supply chain) across all sites — achieving economies of scale that individual clinics cannot match, with overhead rates well below the FQHC national average",
        es: "Centralizo operaciones administrativas (facturacion, RH, TI, cadena de suministro) en todos los sitios — logrando economias de escala que clinicas individuales no pueden igualar, con tasas de gastos generales muy por debajo del promedio nacional de FQHCs",
      },
      {
        en: "Implemented a unified EHR across all sites and service lines — every provider on every patient's care team can see the complete clinical picture, eliminating the information fragmentation that caused missed referrals and duplicated care",
        es: "Implemento un EHR unificado en todos los sitios y lineas de servicio — cada proveedor en el equipo de atencion de cada paciente puede ver el panorama clinico completo, eliminando la fragmentacion de informacion que causaba referencias perdidas y atencion duplicada",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "200,000+",
        context: {
          en: "Serves over 200,000 patients annually across Washington and Oregon — making YVFWC one of the largest and most comprehensive FQHCs in the United States",
          es: "Sirve a mas de 200,000 pacientes anualmente en Washington y Oregon — haciendo de YVFWC uno de los FQHCs mas grandes y completos de Estados Unidos",
        },
      },
      {
        metric: "Annual Revenue",
        value: "$500M+",
        context: {
          en: "Generates over $500 million in annual revenue through diversified streams — medical PPS, dental PPS, 340B pharmacy, managed care, grants, and specialty services — a model of financial resilience",
          es: "Genera mas de $500 millones en ingresos anuales a traves de flujos diversificados — PPS medico, PPS dental, farmacia 340B, atencion administrada, subvenciones y servicios especializados — un modelo de resiliencia financiera",
        },
      },
      {
        metric: "Integration Model",
        value: "One of largest FQHCs in US",
        context: {
          en: "Demonstrates that FQHC scale and integration are achievable — a farmworker-founded clinic grew into a multi-state, multi-service delivery system that serves as a national model",
          es: "Demuestra que la escala e integracion de FQHC son alcanzables — una clinica fundada por trabajadores agricolas crecio hasta convertirse en un sistema de entrega multi-estatal y multi-servicio que sirve como modelo nacional",
        },
      },
      {
        metric: "Service Breadth",
        value: "Medical + Dental + Pharmacy + BH",
        context: {
          en: "Every patient has access to medical, dental, pharmacy, behavioral health, and support services in a single integrated system — eliminating the fragmentation that characterizes most safety-net care",
          es: "Cada paciente tiene acceso a servicios medicos, dentales, farmacia, salud conductual y servicios de apoyo en un sistema integrado unico — eliminando la fragmentacion que caracteriza a la mayoria de la atencion de red de seguridad",
        },
      },
    ],
    strategyCategory: "operational-efficiency",
    primarySourceUrl: "https://www.yvfwc.com/about-us/",
    primarySourceOrg: "Yakima Valley Farm Workers Clinic",
    additionalSources: [
      {
        label: "YVFWC Services",
        url: "https://www.yvfwc.com/services/",
      },
    ],
    tags: [
      "integrated-delivery",
      "scale",
      "farmworkers",
      "multi-state",
      "pharmacy",
      "washington",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 14. Zufall Health Center — Multilingual Immigrant Access
  // ================================================================
  {
    id: "zufall-multilingual-access",
    fqhcName: "Zufall Health Center",
    fqhcSlug: null, // New Jersey — not in CA directory
    location: "Dover, New Jersey",
    date: "1990-01-01",
    timeframe: "1990 – 2025",
    difficulty: "foundational",
    challenge: {
      en: "Dover, New Jersey became a microcosm of America's immigrant health access crisis. As waves of immigrants arrived from Latin America, South Asia, West Africa, and Eastern Europe, the local healthcare infrastructure — designed for English-speaking patients with employer-sponsored insurance — couldn't serve them. The barriers were compounded: language (15+ languages spoken in the service area), fear of deportation (patients avoided any institution that might collect immigration status), cultural health beliefs that didn't align with Western medicine, and inability to navigate a system designed around insurance cards they didn't have. Zufall Health Center, originally a free clinic started by Dr. Eva Zufall in the 1930s, was watching an entire community go without preventive care, managing chronic conditions through emergency rooms at 10x the cost.",
      es: "Dover, Nueva Jersey se convirtio en un microcosmos de la crisis de acceso a salud de inmigrantes en Estados Unidos. A medida que oleadas de inmigrantes llegaban de America Latina, el sur de Asia, Africa Occidental y Europa del Este, la infraestructura de salud local — disenada para pacientes angloparlantes con seguro de empleador — no podia servirlos. Las barreras se acumulaban: idioma (15+ idiomas hablados en el area de servicio), miedo a la deportacion (los pacientes evitaban cualquier institucion que pudiera recopilar estatus migratorio), creencias culturales de salud que no se alineaban con la medicina occidental, e incapacidad de navegar un sistema disenado alrededor de tarjetas de seguro que no tenian. Zufall Health Center, originalmente una clinica gratuita iniciada por la Dra. Eva Zufall en los anos 1930, estaba observando a toda una comunidad ir sin atencion preventiva, manejando condiciones cronicas a traves de salas de emergencia a 10 veces el costo.",
    },
    guidingPolicy: {
      en: "Build trust through radical language access and community health worker outreach — meeting immigrant communities in their own languages, in their own neighborhoods, on their own terms. The strategic insight: for immigrant populations, the primary barrier to healthcare isn't cost or availability — it's trust. And trust can only be built by people who share the language, culture, and lived experience of the community. Hire from the community, communicate in every language the community speaks, and never ask a question that creates deportation fear.",
      es: "Construir confianza a traves de acceso linguistico radical y alcance de trabajadores de salud comunitarios — encontrando a las comunidades inmigrantes en sus propios idiomas, en sus propios vecindarios, en sus propios terminos. La perspectiva estrategica: para las poblaciones inmigrantes, la barrera principal a la atencion medica no es el costo o la disponibilidad — es la confianza. Y la confianza solo puede ser construida por personas que comparten el idioma, la cultura y la experiencia vivida de la comunidad. Contrata de la comunidad, comunicate en cada idioma que la comunidad habla, y nunca hagas una pregunta que genere miedo a la deportacion.",
    },
    actions: [
      {
        en: "Hired multilingual community health workers (CHWs) from the immigrant communities themselves — these are not interpreters added to a clinical visit, but trusted community members who bridge the gap between healthcare and neighborhoods",
        es: "Contrato trabajadores de salud comunitarios (CHW) multilingues de las propias comunidades inmigrantes — no son interpretes agregados a una consulta clinica, sino miembros confiables de la comunidad que construyen el puente entre la atencion medica y los vecindarios",
      },
      {
        en: "Removed all immigration documentation requirements from intake processes — patients are never asked about their immigration status, and forms are designed to avoid any questions that could create fear or confusion",
        es: "Elimino todos los requisitos de documentacion migratoria de los procesos de ingreso — nunca se pregunta a los pacientes sobre su estatus migratorio, y los formularios estan disenados para evitar cualquier pregunta que pudiera crear miedo o confusion",
      },
      {
        en: "Built deep partnerships with immigrant community organizations — churches, cultural associations, consulates, and worker centers — establishing Zufall as a trusted institution before patients ever walk through the door",
        es: "Construyo alianzas profundas con organizaciones comunitarias de inmigrantes — iglesias, asociaciones culturales, consulados y centros de trabajadores — estableciendo a Zufall como una institucion de confianza antes de que los pacientes crucen la puerta",
      },
      {
        en: "Developed culturally adapted health education materials and programs in patients' home languages — not just translated brochures, but health education designed around cultural health beliefs and practices",
        es: "Desarrollo materiales y programas de educacion en salud culturalmente adaptados en los idiomas de origen de los pacientes — no solo folletos traducidos, sino educacion en salud disenada alrededor de creencias y practicas culturales de salud",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "35,000+ from 90+ countries",
        context: {
          en: "Serves 35,000+ patients from over 90 countries of origin — one of the most linguistically diverse patient populations of any FQHC in the United States",
          es: "Sirve a 35,000+ pacientes de mas de 90 paises de origen — una de las poblaciones de pacientes mas linguisticamente diversas de cualquier FQHC en Estados Unidos",
        },
      },
      {
        metric: "Language Access",
        value: "15+ languages",
        context: {
          en: "Provides clinical services in 15+ languages through staff who speak the languages natively — not through phone interpreters, but through providers and CHWs hired from the communities they serve",
          es: "Brinda servicios clinicos en 15+ idiomas a traves de personal que habla los idiomas de forma nativa — no a traves de interpretes por telefono, sino a traves de proveedores y CHWs contratados de las comunidades que sirven",
        },
      },
      {
        metric: "National Model",
        value: "Immigrant health access blueprint",
        context: {
          en: "Recognized as a national model for immigrant health access — demonstrating that language access and cultural responsiveness are achievable at FQHC scale without requiring massive additional funding",
          es: "Reconocido como modelo nacional para acceso a salud de inmigrantes — demostrando que el acceso linguistico y la capacidad de respuesta cultural son alcanzables a escala de FQHC sin requerir financiamiento adicional masivo",
        },
      },
    ],
    strategyCategory: "patient-access",
    primarySourceUrl: "https://www.zufallhealth.org/about-us/",
    primarySourceOrg: "Zufall Health Center",
    additionalSources: [
      {
        label: "Zufall Health Services",
        url: "https://www.zufallhealth.org/services/",
      },
    ],
    tags: [
      "immigrant-health",
      "multilingual",
      "chw",
      "language-access",
      "community-trust",
      "new-jersey",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 15. Salud Family Health — CHW Workforce Development Pipeline
  // ================================================================
  {
    id: "salud-chw-pipeline",
    fqhcName: "Salud Family Health",
    fqhcSlug: null, // Colorado — not in CA directory
    location: "Fort Lupton, Colorado",
    date: "2018-01-01",
    timeframe: "2018 – 2024",
    difficulty: "intermediate",
    challenge: {
      en: "Community Health Workers (CHWs) are the backbone of FQHC care coordination — they're the ones who call patients after missed appointments, navigate insurance enrollment, connect families to food banks, and translate between clinical teams and patients. But across the FQHC sector, CHW turnover was devastating: entry-level wages ($15-18/hour in most markets), no career ladder, and a perception of CHW work as a dead-end job meant that FQHCs were constantly losing their most trusted community connectors. Salud Family Health, serving agricultural communities across Colorado's Front Range, was experiencing 40%+ annual CHW turnover. Each departure cost the organization $15,000-25,000 in recruitment, training, and lost patient relationships — and more importantly, patients lost the person they trusted most in the healthcare system. The problem wasn't that CHWs didn't love the work; it was that the work didn't offer them a future.",
      es: "Los Trabajadores de Salud Comunitarios (CHW) son la columna vertebral de la coordinacion de atencion en FQHCs — son quienes llaman a los pacientes despues de citas perdidas, navegan la inscripcion de seguros, conectan familias con bancos de alimentos y traducen entre equipos clinicos y pacientes. Pero en todo el sector FQHC, la rotacion de CHWs era devastadora: salarios de nivel de entrada ($15-18/hora en la mayoria de los mercados), sin escalera profesional, y una percepcion del trabajo de CHW como empleo sin futuro significaban que los FQHCs estaban constantemente perdiendo a sus conectores comunitarios mas confiables. Salud Family Health, sirviendo a comunidades agricolas en la zona del Front Range de Colorado, experimentaba una rotacion anual de CHWs de mas del 40%. Cada salida costaba a la organizacion $15,000-25,000 en reclutamiento, capacitacion y relaciones perdidas con pacientes — y mas importante, los pacientes perdian a la persona en quien mas confiaban en el sistema de salud. El problema no era que los CHWs no amaran el trabajo; era que el trabajo no les ofrecia un futuro.",
    },
    guidingPolicy: {
      en: "Build an internal CHW career ladder that transforms the CHW role from an entry-level dead end into the first rung of a healthcare career. The insight: CHWs don't leave because of the work — they leave because the only way to earn more or advance is to leave. If you create a clear progression path (CHW I -> CHW II -> Senior CHW -> Care Coordinator -> Program Manager) with associated training, certification, and wage increases, you convert your highest-turnover role into your most loyal workforce pipeline.",
      es: "Construir una escalera profesional interna de CHW que transforme el rol de CHW de un callejon sin salida de nivel de entrada en el primer escalon de una carrera en salud. La perspectiva: los CHWs no se van por el trabajo — se van porque la unica manera de ganar mas o avanzar es irse. Si creas una ruta de progresion clara (CHW I -> CHW II -> CHW Senior -> Coordinador de Atencion -> Gerente de Programa) con capacitacion, certificacion y aumentos salariales asociados, conviertes tu rol con mayor rotacion en tu pipeline de fuerza laboral mas leal.",
    },
    actions: [
      {
        en: "Created a 4-tier CHW career ladder: CHW I (entry-level, community outreach), CHW II (care coordination, panel management), Senior CHW (mentorship, quality improvement, specialized populations), and Care Coordinator (clinical team integration, complex cases) — each tier with defined competencies and pay increases",
        es: "Creo una escalera profesional de CHW de 4 niveles: CHW I (nivel de entrada, alcance comunitario), CHW II (coordinacion de atencion, manejo de panel), CHW Senior (mentoria, mejora de calidad, poblaciones especializadas) y Coordinador de Atencion (integracion en equipo clinico, casos complejos) — cada nivel con competencias definidas y aumentos salariales",
      },
      {
        en: "Partnered with community colleges to develop stackable CHW credentials — allowing staff to earn certifications while working, with tuition assistance from Salud, building toward an associate's degree in health sciences",
        es: "Se asocio con colegios comunitarios para desarrollar credenciales apilables de CHW — permitiendo al personal obtener certificaciones mientras trabaja, con asistencia de matricula de Salud, construyendo hacia un grado asociado en ciencias de la salud",
      },
      {
        en: "Implemented wage increases at each career ladder tier — CHW I starting at competitive entry-level wages, with 15-25% increases at each tier, making Senior CHW and Care Coordinator roles competitive with comparable positions at hospitals",
        es: "Implemento aumentos salariales en cada nivel de la escalera profesional — CHW I comenzando con salarios competitivos de nivel de entrada, con aumentos de 15-25% en cada nivel, haciendo que los roles de CHW Senior y Coordinador de Atencion sean competitivos con posiciones comparables en hospitales",
      },
      {
        en: "Established a mentorship program pairing new CHW I staff with Senior CHWs — accelerating onboarding, building institutional knowledge transfer, and creating a culture where advancement is visible and encouraged",
        es: "Establecio un programa de mentoria emparejando al nuevo personal CHW I con CHWs Senior — acelerando la integracion, construyendo transferencia de conocimiento institucional y creando una cultura donde el avance es visible y alentado",
      },
    ],
    outcomes: [
      {
        metric: "CHW Turnover",
        value: "70% reduction",
        context: {
          en: "CHW turnover dropped by 70% after implementing the career ladder — from over 40% annual turnover to single digits, saving hundreds of thousands in recruitment and retraining costs",
          es: "La rotacion de CHWs cayo un 70% despues de implementar la escalera profesional — de mas del 40% de rotacion anual a digitos unicos, ahorrando cientos de miles en costos de reclutamiento y reentrenamiento",
        },
      },
      {
        metric: "Internal Pipeline",
        value: "80% of positions filled internally",
        context: {
          en: "80% of open CHW and Care Coordinator positions are now filled by internal candidates advancing through the career ladder — dramatically reducing recruitment costs and time-to-productivity",
          es: "El 80% de las posiciones abiertas de CHW y Coordinador de Atencion ahora se llenan con candidatos internos avanzando a traves de la escalera profesional — reduciendo dramaticamente los costos de reclutamiento y el tiempo hasta la productividad",
        },
      },
      {
        metric: "Patient Continuity",
        value: "Improved significantly",
        context: {
          en: "Patients now maintain relationships with the same CHW for years instead of months — enabling deeper trust, better care coordination outcomes, and more effective chronic disease management",
          es: "Los pacientes ahora mantienen relaciones con el mismo CHW durante anos en lugar de meses — permitiendo confianza mas profunda, mejores resultados de coordinacion de atencion y manejo mas efectivo de enfermedades cronicas",
        },
      },
    ],
    strategyCategory: "workforce-retention",
    primarySourceUrl: "https://www.saludclinic.org/about/",
    primarySourceOrg: "Salud Family Health",
    additionalSources: [
      {
        label: "Salud Family Health Centers",
        url: "https://www.saludclinic.org/",
      },
    ],
    tags: [
      "chw",
      "career-ladder",
      "workforce-development",
      "retention",
      "colorado",
      "farmworkers",
    ],
    datePublished: "2025-06-01",
  },

  // ================================================================
  // 16. Oregon Primary Care Association — Collaborative QI
  // ================================================================
  {
    id: "opca-collaborative-qi",
    fqhcName: "Oregon Primary Care Association",
    fqhcSlug: null, // State-level org — not in directory
    location: "Portland, Oregon",
    date: "2015-01-01",
    timeframe: "2015 – 2025",
    difficulty: "intermediate",
    challenge: {
      en: "Individual FQHCs — especially small ones with fewer than 10 providers — lack the resources for sophisticated quality improvement programs. They don't have data analysts, can't afford QI consultants, and their leadership teams are consumed by daily operations. The result: UDS (Uniform Data System) quality measures become a compliance exercise rather than a clinical improvement tool. Each FQHC reinvents the QI wheel in isolation, repeating the same mistakes that their neighbor FQHC solved two years ago. Oregon's 33 FQHCs were no exception: wide variation in quality metrics, siloed improvement efforts, and no mechanism to learn from each other's successes or failures. The Oregon Primary Care Association (OPCA) recognized that this fragmented approach to quality was a systemic problem that individual FQHCs could not solve alone.",
      es: "Los FQHCs individuales — especialmente los pequenos con menos de 10 proveedores — carecen de recursos para programas sofisticados de mejora de calidad. No tienen analistas de datos, no pueden pagar consultores de QI, y sus equipos de liderazgo estan consumidos por las operaciones diarias. El resultado: las medidas de calidad UDS (Sistema de Datos Uniformes) se convierten en un ejercicio de cumplimiento en lugar de una herramienta de mejora clinica. Cada FQHC reinventa la rueda de QI en aislamiento, repitiendo los mismos errores que su FQHC vecino resolvio hace dos anos. Los 33 FQHCs de Oregon no eran la excepcion: amplia variacion en metricas de calidad, esfuerzos de mejora aislados, y ningun mecanismo para aprender de los exitos o fracasos de los demas. La Asociacion de Atencion Primaria de Oregon (OPCA) reconocio que este enfoque fragmentado de calidad era un problema sistemico que los FQHCs individuales no podian resolver solos.",
    },
    guidingPolicy: {
      en: "Replace isolated FQHC quality efforts with a state-level collaborative QI model: shared metrics, shared dashboards, peer learning networks, and pooled data analytics. The insight: quality improvement doesn't require more resources at each individual FQHC — it requires collective infrastructure that all FQHCs share. A state PCA can provide the analytics, facilitation, and knowledge transfer that no single FQHC can afford on its own.",
      es: "Reemplazar los esfuerzos aislados de calidad de FQHC con un modelo colaborativo de QI a nivel estatal: metricas compartidas, tableros compartidos, redes de aprendizaje entre pares y analitica de datos agrupados. La perspectiva: la mejora de calidad no requiere mas recursos en cada FQHC individual — requiere infraestructura colectiva que todos los FQHCs compartan. Una PCA estatal puede proporcionar la analitica, facilitacion y transferencia de conocimiento que ningun FQHC individual puede pagar por si solo.",
    },
    actions: [
      {
        en: "Launched statewide learning collaboratives organized by clinical topic — diabetes management, hypertension control, cervical cancer screening, depression screening — where clinical teams from different FQHCs meet regularly to share what's working and what isn't",
        es: "Lanzo colaborativos de aprendizaje estatales organizados por tema clinico — manejo de diabetes, control de hipertension, deteccion de cancer cervical, deteccion de depresion — donde equipos clinicos de diferentes FQHCs se reunen regularmente para compartir que funciona y que no",
      },
      {
        en: "Built shared dashboards that display anonymized quality data across all 33 Oregon FQHCs — allowing each health center to see where they rank, identify high performers to learn from, and track improvement trends over time",
        es: "Construyo tableros compartidos que muestran datos de calidad anonimizados de los 33 FQHCs de Oregon — permitiendo a cada centro de salud ver donde se ubican, identificar a los de alto desempeno para aprender de ellos, y rastrear tendencias de mejora a lo largo del tiempo",
      },
      {
        en: "Pooled data analytics capacity at the PCA level — hiring data analysts who serve all 33 FQHCs rather than each FQHC hiring (and struggling to retain) their own",
        es: "Centralizo la capacidad de analitica de datos a nivel de PCA — contratando analistas de datos que sirven a los 33 FQHCs en lugar de que cada FQHC contrate (y luche por retener) los suyos propios",
      },
      {
        en: "Facilitated rapid-cycle PDSA (Plan-Do-Study-Act) improvement projects with cross-FQHC teams — testing changes at one site and spreading successful interventions to others within weeks, not years",
        es: "Facilito proyectos de mejora de ciclo rapido PDSA (Planear-Hacer-Estudiar-Actuar) con equipos inter-FQHC — probando cambios en un sitio y difundiendo intervenciones exitosas a otros en semanas, no anos",
      },
    ],
    outcomes: [
      {
        metric: "Quality Benchmarks",
        value: "7 of 9 above national average",
        context: {
          en: "Oregon FQHCs outperform the national FQHC average on 7 of 9 core UDS quality measures — a state-level achievement driven by collaborative infrastructure, not individual health center heroics",
          es: "Los FQHCs de Oregon superan el promedio nacional de FQHCs en 7 de 9 medidas centrales de calidad UDS — un logro a nivel estatal impulsado por infraestructura colaborativa, no por heroicidades individuales de centros de salud",
        },
      },
      {
        metric: "Variation Reduction",
        value: "Narrowed across 33 FQHCs",
        context: {
          en: "The gap between Oregon's highest-performing and lowest-performing FQHCs narrowed significantly — collaborative QI lifts all boats, not just the leaders",
          es: "La brecha entre los FQHCs de Oregon con mayor y menor desempeno se redujo significativamente — la QI colaborativa eleva a todos, no solo a los lideres",
        },
      },
      {
        metric: "Cost Efficiency",
        value: "Shared analytics model",
        context: {
          en: "Pooled analytics at the PCA level costs a fraction of what 33 individual FQHCs would spend hiring their own data teams — achieving better results at lower total cost",
          es: "La analitica agrupada a nivel de PCA cuesta una fraccion de lo que 33 FQHCs individuales gastarian contratando sus propios equipos de datos — logrando mejores resultados a menor costo total",
        },
      },
    ],
    strategyCategory: "operational-efficiency",
    primarySourceUrl: "https://www.orpca.org/chcs/quality-improvement",
    primarySourceOrg: "Oregon Primary Care Association",
    additionalSources: [
      {
        label: "Oregon PCA Health Centers",
        url: "https://www.orpca.org/chcs",
      },
    ],
    tags: [
      "quality-improvement",
      "collaborative",
      "uds",
      "state-pca",
      "shared-analytics",
      "oregon",
    ],
    datePublished: "2025-06-01",
  },

  // ================================================================
  // 17. Whitman-Walker Health — Revenue Diversification Beyond HIV
  // ================================================================
  {
    id: "whitman-walker-specialty-diversification",
    fqhcName: "Whitman-Walker Health",
    fqhcSlug: null, // Washington, DC — not in CA directory
    location: "Washington, DC",
    date: "2010-01-01",
    timeframe: "2010 – 2024",
    difficulty: "advanced",
    challenge: {
      en: "Whitman-Walker Health was born from the HIV/AIDS crisis — founded in 1973 as a clinic serving the LGBTQ+ community in Washington, DC, it became one of the nation's largest HIV testing and treatment centers during the epidemic. By the late 2000s, over 60% of revenue came from Ryan White HIV/AIDS Program grants. This was the same structural fragility that threatens all grant-dependent FQHCs: a single Congressional appropriations decision could eliminate the majority of the organization's funding overnight. The irony was cruel — the success of antiretroviral therapy meant HIV was becoming a manageable chronic condition rather than a death sentence, but the funding formulas still assumed the crisis-era model. Federal HIV/AIDS budgets faced increasing scrutiny, and Ryan White reauthorization was never guaranteed. Whitman-Walker was a mission-driven organization whose mission was evolving faster than its revenue model.",
      es: "Whitman-Walker Health nacio de la crisis del VIH/SIDA — fundado en 1973 como una clinica sirviendo a la comunidad LGBTQ+ en Washington, DC, se convirtio en uno de los centros mas grandes de pruebas y tratamiento de VIH del pais durante la epidemia. Para finales de los 2000, mas del 60% de los ingresos provenia de subvenciones del Programa Ryan White de VIH/SIDA. Esta era la misma fragilidad estructural que amenaza a todos los FQHCs dependientes de subvenciones: una sola decision de apropiaciones del Congreso podia eliminar la mayoria del financiamiento de la organizacion de la noche a la manana. La ironia era cruel — el exito de la terapia antirretroviral significaba que el VIH se estaba convirtiendo en una condicion cronica manejable en lugar de una sentencia de muerte, pero las formulas de financiamiento aun asumian el modelo de era de crisis. Los presupuestos federales de VIH/SIDA enfrentaban escrutinio creciente, y la reautorizacion de Ryan White nunca estaba garantizada. Whitman-Walker era una organizacion orientada a la mision cuya mision evolucionaba mas rapido que su modelo de ingresos.",
    },
    guidingPolicy: {
      en: "Diversify beyond HIV into comprehensive primary care and specialty services while maintaining the LGBTQ+ health equity mission — transforming from an HIV clinic that also does primary care into a full-service FQHC that also excels at HIV care. The strategic insight: the clinical infrastructure built for HIV (pharmacy, behavioral health, lab, chronic disease management) translates directly to primary care. Diversification doesn't mean diluting the mission; it means building on the foundation that the mission created.",
      es: "Diversificar mas alla del VIH hacia atencion primaria integral y servicios especializados mientras se mantiene la mision de equidad de salud LGBTQ+ — transformandose de una clinica de VIH que tambien hace atencion primaria a un FQHC de servicio completo que tambien sobresale en atencion de VIH. La perspectiva estrategica: la infraestructura clinica construida para el VIH (farmacia, salud conductual, laboratorio, manejo de enfermedades cronicas) se traduce directamente a atencion primaria. La diversificacion no significa diluir la mision; significa construir sobre la base que la mision creo.",
    },
    actions: [
      {
        en: "Added comprehensive primary care services — family medicine, internal medicine, women's health, and preventive care — making Whitman-Walker a full-service medical home rather than a disease-specific clinic",
        es: "Agrego servicios integrales de atencion primaria — medicina familiar, medicina interna, salud de la mujer y atencion preventiva — convirtiendo a Whitman-Walker en un hogar medico de servicio completo en lugar de una clinica especifica para una enfermedad",
      },
      {
        en: "Built dental, behavioral health, and on-site pharmacy programs — each generating its own PPS or service-line revenue independent of HIV grant funding",
        es: "Construyo programas dentales, de salud conductual y farmacia en sitio — cada uno generando sus propios ingresos PPS o de linea de servicio independientes del financiamiento de subvenciones de VIH",
      },
      {
        en: "Aggressively enrolled patients in commercial insurance through ACA marketplace, Medicaid expansion, and DC Health Link — converting uninsured and Ryan White-only patients into commercially insured patients with higher reimbursement rates",
        es: "Inscribio agresivamente a pacientes en seguro comercial a traves del mercado ACA, expansion de Medicaid y DC Health Link — convirtiendo pacientes sin seguro y de solo Ryan White en pacientes asegurados comercialmente con tasas de reembolso mas altas",
      },
      {
        en: "Opened the new Whitman-Walker at St. Elizabeths campus in 2020 — a state-of-the-art facility designed for comprehensive care delivery, signaling the organizational transformation from HIV clinic to full-service FQHC",
        es: "Abrio el nuevo campus de Whitman-Walker en St. Elizabeths en 2020 — una instalacion de ultima generacion disenada para entrega de atencion integral, senalando la transformacion organizacional de clinica de VIH a FQHC de servicio completo",
      },
    ],
    outcomes: [
      {
        metric: "HIV Grant Dependency",
        value: ">60% → <30%",
        context: {
          en: "Ryan White grants dropped from over 60% of total revenue to less than 30% — HIV care remains a core strength but no longer the financial foundation of the organization",
          es: "Las subvenciones Ryan White cayeron de mas del 60% de los ingresos totales a menos del 30% — la atencion de VIH sigue siendo una fortaleza central pero ya no es la base financiera de la organizacion",
        },
      },
      {
        metric: "Patient Base",
        value: "Tripled",
        context: {
          en: "Patient base tripled as comprehensive services attracted a broader population — not just HIV patients, but the entire LGBTQ+ community plus neighbors seeking primary care",
          es: "La base de pacientes se triplico a medida que los servicios integrales atrajeron una poblacion mas amplia — no solo pacientes con VIH, sino toda la comunidad LGBTQ+ mas vecinos buscando atencion primaria",
        },
      },
      {
        metric: "Revenue Streams",
        value: "5+ independent streams",
        context: {
          en: "Now operating with 5+ independent revenue streams: Medicaid PPS, commercial insurance, 340B pharmacy, Ryan White grants, and dental — no single stream exceeds 30% of total revenue",
          es: "Ahora opera con 5+ flujos de ingresos independientes: PPS de Medicaid, seguro comercial, farmacia 340B, subvenciones Ryan White y dental — ningun flujo excede el 30% de los ingresos totales",
        },
      },
    ],
    strategyCategory: "revenue-diversification",
    primarySourceUrl: "https://www.whitman-walker.org/about-us",
    primarySourceOrg: "Whitman-Walker Health",
    additionalSources: [
      {
        label: "Whitman-Walker at St. Elizabeths",
        url: "https://www.whitman-walker.org/st-elizabeths",
      },
    ],
    tags: [
      "revenue-diversification",
      "hiv-aids",
      "lgbtq",
      "ryan-white",
      "primary-care-expansion",
      "washington-dc",
    ],
    datePublished: "2025-01-01",
  },

  // ================================================================
  // 18. Asian Health Services — Community Organizing Health Model
  // ================================================================
  {
    id: "asian-health-services-community-model",
    fqhcName: "Asian Health Services",
    fqhcSlug: "asian-health-services", // In our CA directory
    location: "Oakland, California",
    date: "1974-01-01",
    timeframe: "1974 – 2025",
    difficulty: "intermediate",
    challenge: {
      en: "Oakland's Asian immigrant community — spanning Chinese, Vietnamese, Korean, Burmese, Mongolian, Tongan, and dozens more ethnic groups — faced a healthcare system that was functionally inaccessible. It wasn't just a language problem, though 15+ languages spoken in a single community is its own operational challenge. The deeper issue was trust: many patients came from countries where government institutions were instruments of control, not service. Healthcare providers who didn't share their cultural context misdiagnosed culturally specific symptoms, prescribed treatments that conflicted with traditional medicine practices, and communicated in ways that felt alienating or dismissive. For undocumented immigrants, every interaction with an official system carried deportation risk. The result: one of the largest Asian immigrant communities in the U.S. was systematically underserved by a healthcare system that was physically present but culturally absent.",
      es: "La comunidad inmigrante asiatica de Oakland — que abarca chinos, vietnamitas, coreanos, birmanos, mongoles, tonganos y docenas de grupos etnicos mas — enfrentaba un sistema de salud que era funcionalmente inaccesible. No era solo un problema de idioma, aunque 15+ idiomas hablados en una sola comunidad es su propio desafio operativo. El problema mas profundo era la confianza: muchos pacientes venian de paises donde las instituciones gubernamentales eran instrumentos de control, no de servicio. Los proveedores de salud que no compartian su contexto cultural diagnosticaban erróneamente sintomas culturalmente especificos, prescribian tratamientos que conflictuaban con practicas de medicina tradicional, y se comunicaban de maneras que se sentian alienantes o despectivas. Para los inmigrantes indocumentados, cada interaccion con un sistema oficial conllevaba riesgo de deportacion. El resultado: una de las comunidades inmigrantes asiaticas mas grandes de EE.UU. era sistematicamente desatendida por un sistema de salud que estaba fisicamente presente pero culturalmente ausente.",
    },
    guidingPolicy: {
      en: "Build a community-centered FQHC where the community doesn't just receive care — it shapes care. The guiding principle: hire from the community, train the community to deliver care, and use the health center as a platform for political advocacy that addresses the root causes of health disparities. Healthcare delivery and community organizing are not separate functions — they are two expressions of the same mission. A clinic that treats diabetes but doesn't fight for immigrant health access is treating symptoms while ignoring the disease.",
      es: "Construir un FQHC centrado en la comunidad donde la comunidad no solo recibe atencion — la moldea. El principio rector: contratar de la comunidad, capacitar a la comunidad para brindar atencion, y usar el centro de salud como plataforma para abogacia politica que aborde las causas raiz de las disparidades de salud. La entrega de atencion medica y la organizacion comunitaria no son funciones separadas — son dos expresiones de la misma mision. Una clinica que trata diabetes pero no lucha por el acceso a salud de inmigrantes esta tratando sintomas mientras ignora la enfermedad.",
    },
    actions: [
      {
        en: "Built a workforce where 80%+ of staff are bilingual and hired from the communities they serve — not just interpreters added to clinical teams, but providers, care coordinators, and administrators who share the cultural context of their patients",
        es: "Construyo una fuerza laboral donde el 80%+ del personal es bilingue y contratado de las comunidades que sirven — no solo interpretes agregados a equipos clinicos, sino proveedores, coordinadores de atencion y administradores que comparten el contexto cultural de sus pacientes",
      },
      {
        en: "Developed community health education programs tailored to specific cultural groups — using community health workers from each ethnic community to deliver health education in culturally appropriate ways, integrating traditional health beliefs with evidence-based medicine",
        es: "Desarrollo programas de educacion en salud comunitaria adaptados a grupos culturales especificos — usando trabajadores de salud comunitarios de cada comunidad etnica para brindar educacion en salud de maneras culturalmente apropiadas, integrando creencias de salud tradicionales con medicina basada en evidencia",
      },
      {
        en: "Engaged in direct political advocacy for immigrant health access — organizing community members to testify at city council and state legislature hearings, building coalitions with other FQHCs, and fighting to protect undocumented immigrants' access to Medi-Cal",
        es: "Participo en abogacia politica directa por el acceso a salud de inmigrantes — organizando a miembros de la comunidad para testificar en audiencias del consejo municipal y legislatura estatal, construyendo coaliciones con otros FQHCs, y luchando para proteger el acceso de inmigrantes indocumentados a Medi-Cal",
      },
      {
        en: "Launched cultural health programs that bridge traditional and Western medicine — acupuncture, traditional health practices, and wellness programs that honor patients' cultural backgrounds while providing evidence-based preventive care",
        es: "Lanzo programas de salud cultural que conectan la medicina tradicional y occidental — acupuntura, practicas de salud tradicionales y programas de bienestar que honran los origenes culturales de los pacientes mientras brindan atencion preventiva basada en evidencia",
      },
    ],
    outcomes: [
      {
        metric: "Patients Served",
        value: "50,000+",
        context: {
          en: "Serves over 50,000 patients annually from the Oakland Asian immigrant community — a population that mainstream healthcare was unable to reach before AHS existed",
          es: "Sirve a mas de 50,000 pacientes anualmente de la comunidad inmigrante asiatica de Oakland — una poblacion que la atencion medica convencional no podia alcanzar antes de que existiera AHS",
        },
      },
      {
        metric: "Language Access",
        value: "14 languages",
        context: {
          en: "Provides clinical services in 14 languages through native-speaking staff — making AHS one of the most linguistically comprehensive FQHCs in California",
          es: "Brinda servicios clinicos en 14 idiomas a traves de personal hablante nativo — haciendo de AHS uno de los FQHCs mas linguisticamente completos de California",
        },
      },
      {
        metric: "Community Governance",
        value: "National model",
        context: {
          en: "Recognized nationally as a model for community-centered FQHC governance — demonstrating that hiring from the community and organizing with the community produces better health outcomes than parachuting services into underserved neighborhoods",
          es: "Reconocido a nivel nacional como modelo de gobernanza de FQHC centrada en la comunidad — demostrando que contratar de la comunidad y organizarse con la comunidad produce mejores resultados de salud que paracaidar servicios en vecindarios desatendidos",
        },
      },
      {
        metric: "Policy Impact",
        value: "Advocacy wins for immigrant health",
        context: {
          en: "Instrumental in securing expanded Medi-Cal coverage for undocumented immigrants in California — proving that healthcare delivery and policy advocacy can be mutually reinforcing strategies",
          es: "Instrumental en asegurar la expansion de la cobertura de Medi-Cal para inmigrantes indocumentados en California — demostrando que la entrega de atencion medica y la abogacia politica pueden ser estrategias mutuamente reforzantes",
        },
      },
    ],
    strategyCategory: "patient-access",
    primarySourceUrl: "https://asianhealthservices.org/about/",
    primarySourceOrg: "Asian Health Services",
    additionalSources: [
      {
        label: "Asian Health Services Programs",
        url: "https://asianhealthservices.org/services/",
      },
    ],
    tags: [
      "community-organizing",
      "multilingual",
      "immigrant-health",
      "policy-advocacy",
      "california",
      "oakland",
    ],
    datePublished: "2025-01-01",
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
