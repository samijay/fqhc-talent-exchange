// masterclass-course-modules-part1.ts
// Interactive masterclass course content — modules 1-15
// Converts static FQHC masterclass modules into interactive courses with exercises
// Last updated: 2026-03-23

import type {
  ConceptCardExercise,
  ClassifierExercise,
  DragSortExercise,
  MiniQuizExercise,
} from "./okr-course-modules";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type MasterclassExercise =
  | ConceptCardExercise
  | ClassifierExercise
  | DragSortExercise
  | MiniQuizExercise;

export interface MasterclassCourseModule {
  id: string;
  order: number;
  title: { en: string; es: string };
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  estimatedMinutes: number;
  icon: string;
  color: string;
  category: string;
  learningObjectives: { en: string; es: string }[];
  conceptContent: {
    heading: { en: string; es: string };
    body: { en: string; es: string };
  }[];
  exercises: MasterclassExercise[];
  sourceMaterials: { label: string; url: string }[];
  totalXP: number;
}

/* ================================================================== */
/*  Module 1: The 17% FQHC                                            */
/* ================================================================== */

const module1: MasterclassCourseModule = {
  id: "the-17-percent-fqhc",
  order: 1,
  title: {
    en: "The 17% FQHC — Breaking the Grant Dependency Trap",
    es: "El FQHC del 17% — Rompiendo la Trampa de Dependencia de Subvenciones",
  },
  subtitle: {
    en: "How one health center reduced federal funding dependency from 62.5% to 17% while serving more uninsured patients",
    es: "Cómo un centro de salud redujo su dependencia de fondos federales del 62.5% al 17% mientras servía a más pacientes sin seguro",
  },
  description: {
    en: "With CHCF authorization expiring December 2026 and Medicaid work requirements taking effect January 2027, FQHCs that remain 60%+ dependent on federal funding face existential risk. Learn how to diversify revenue while strengthening your mission.",
    es: "Con la autorización del CHCF expirando en diciembre de 2026 y los requisitos de trabajo de Medicaid en enero de 2027, los FQHCs con más del 60% de dependencia federal enfrentan riesgo existencial. Aprenda a diversificar ingresos mientras fortalece su misión.",
  },
  estimatedMinutes: 10,
  icon: "ShieldAlert",
  color: "red",
  category: "survival",
  learningObjectives: [
    { en: "Calculate your center's federal dependency ratio and benchmark against the sector", es: "Calcule el índice de dependencia federal de su centro y compárelo con el sector" },
    { en: "Identify 3-5 revenue diversification strategies aligned with your mission", es: "Identifique 3-5 estrategias de diversificación de ingresos alineadas con su misión" },
    { en: "Build a commercially insured patient acquisition strategy without compromising safety-net mission", es: "Construya una estrategia de adquisición de pacientes con seguro comercial sin comprometer la misión de red de seguridad" },
    { en: "Model the financial impact of a 30% federal funding reduction on your operations", es: "Modele el impacto financiero de una reducción del 30% en fondos federales en sus operaciones" },
  ],
  conceptContent: [
    {
      heading: { en: "The Grant Dependency Problem", es: "El Problema de la Dependencia de Subvenciones" },
      body: {
        en: "A DEA efficiency study of 1,375 FQHCs found that grant revenues were negatively associated with operational efficiency — meaning grants may enable the very slack that makes centers fragile. 50% of CHCs had negative operating margins in 2023. The path forward isn't more grants; it's less dependency. One center reduced its federal funding share from 62.5% to 17% and now serves MORE uninsured patients than before.",
        es: "Un estudio de eficiencia DEA de 1,375 FQHCs encontró que los ingresos por subvenciones estaban negativamente asociados con la eficiencia operativa. El 50% de los CHC tuvieron márgenes negativos en 2023. El camino no es más subvenciones, sino menos dependencia. Un centro redujo su dependencia federal del 62.5% al 17% y ahora sirve a MÁS pacientes sin seguro.",
      },
    },
    {
      heading: { en: "Revenue Diversification Is Mission-Aligned", es: "La Diversificación de Ingresos Está Alineada con la Misión" },
      body: {
        en: "Attracting commercially insured patients cross-subsidizes care for the uninsured. Financial resilience enables mission expansion. The 17% center didn't abandon its mission — it funded it differently. Strategies include: expanding commercially insured panels, building specialty care referral networks that keep revenue in-house, and launching employer health programs for local businesses.",
        es: "Atraer pacientes con seguro comercial subsidia la atención de los no asegurados. La resiliencia financiera permite la expansión de la misión. El centro del 17% no abandonó su misión — la financió de manera diferente. Las estrategias incluyen: expandir paneles de seguros comerciales, construir redes de referencia de atención especializada y lanzar programas de salud para empleadores locales.",
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "17pct-quiz",
      questions: [
        {
          question: { en: "What percentage of CHCs had negative operating margins in 2023?", es: "¿Qué porcentaje de los CHC tuvieron márgenes operativos negativos en 2023?" },
          options: [
            { text: { en: "25%", es: "25%" }, isCorrect: false, explanation: { en: "Higher — the financial pressure is more widespread than many realize.", es: "Más alto — la presión financiera es más generalizada de lo que muchos creen." } },
            { text: { en: "50%", es: "50%" }, isCorrect: true, explanation: { en: "Correct. Half of all CHCs operated at a loss in 2023, making revenue diversification urgent.", es: "Correcto. La mitad de todos los CHC operaron con pérdidas en 2023." } },
            { text: { en: "35%", es: "35%" }, isCorrect: false, explanation: { en: "The actual figure is higher at 50%.", es: "La cifra real es mayor, al 50%." } },
            { text: { en: "75%", es: "75%" }, isCorrect: false, explanation: { en: "Not quite that high — it's 50%, though the trend is concerning.", es: "No es tan alto — es el 50%, aunque la tendencia es preocupante." } },
          ],
        },
        {
          question: { en: "According to the DEA efficiency study, what was the relationship between grant revenue and operational efficiency?", es: "Según el estudio de eficiencia DEA, ¿cuál fue la relación entre ingresos por subvenciones y eficiencia operativa?" },
          options: [
            { text: { en: "Grants improved efficiency", es: "Las subvenciones mejoraron la eficiencia" }, isCorrect: false, explanation: { en: "Actually the opposite — grants were negatively associated with efficiency.", es: "En realidad lo contrario — las subvenciones se asociaron negativamente con la eficiencia." } },
            { text: { en: "Grants were negatively associated with efficiency", es: "Las subvenciones se asociaron negativamente con la eficiencia" }, isCorrect: true, explanation: { en: "Correct. Grants may enable organizational slack that makes centers fragile.", es: "Correcto. Las subvenciones pueden permitir holgura organizacional que hace frágiles a los centros." } },
            { text: { en: "No relationship was found", es: "No se encontró relación" }, isCorrect: false, explanation: { en: "A clear negative relationship was found across 1,375 FQHCs.", es: "Se encontró una relación negativa clara en 1,375 FQHCs." } },
            { text: { en: "The study was inconclusive", es: "El estudio fue inconcluso" }, isCorrect: false, explanation: { en: "The study had clear findings across a large sample.", es: "El estudio tuvo hallazgos claros en una muestra grande." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "17pct-classify",
      instruction: { en: "Which strategies effectively reduce federal funding dependency?", es: "¿Cuáles estrategias reducen efectivamente la dependencia de fondos federales?" },
      items: [
        { text: { en: "Expanding commercially insured patient panels", es: "Expandir paneles de pacientes con seguro comercial" }, isGood: true, explanation: { en: "Commercial insurance cross-subsidizes uninsured care while reducing grant dependency.", es: "El seguro comercial subsidiza la atención no asegurada mientras reduce la dependencia de subvenciones." } },
        { text: { en: "Applying for more federal grants", es: "Solicitar más subvenciones federales" }, isGood: false, explanation: { en: "More grants increase dependency — the goal is diversifying AWAY from federal funding.", es: "Más subvenciones aumentan la dependencia — el objetivo es diversificar LEJOS del financiamiento federal." } },
        { text: { en: "Building employer health programs for local businesses", es: "Construir programas de salud para empleadores locales" }, isGood: true, explanation: { en: "Employer programs bring commercially insured revenue and strengthen community ties.", es: "Los programas para empleadores traen ingresos de seguros comerciales y fortalecen lazos comunitarios." } },
        { text: { en: "Reducing services to match grant funding", es: "Reducir servicios para igualar fondos de subvenciones" }, isGood: false, explanation: { en: "Cutting services shrinks your mission — the goal is new revenue, not less service.", es: "Recortar servicios reduce su misión — el objetivo es nuevos ingresos, no menos servicio." } },
        { text: { en: "Developing specialty care referral networks in-house", es: "Desarrollar redes de referencia de atención especializada internas" }, isGood: true, explanation: { en: "Keeping specialty referrals in-house retains revenue that would otherwise leave your system.", es: "Mantener las referencias de especialidad internas retiene ingresos que de otra manera saldrían de su sistema." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "FQHC Associates: Business Model Analysis", url: "https://www.fqhc.org/blog/2026/2/4/fqhc-funding-uncertainty-isnt-the-real-problem-the-business-model-is" },
    { label: "PMC: Grant Revenue & FQHC Efficiency (DEA)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3976192/" },
    { label: "Commonwealth Fund: Financial Challenges Loom", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 2: Seven Cliffs                                             */
/* ================================================================== */

const module2: MasterclassCourseModule = {
  id: "seven-cliffs",
  order: 2,
  title: { en: "Seven Cliffs in Eighteen Months — Crisis Scenario Planning", es: "Siete Precipicios en Dieciocho Meses — Planificación de Escenarios de Crisis" },
  subtitle: { en: "Build if/then financial models for the unprecedented convergence of CHCF expiration, Medicaid cuts, and 340B erosion", es: "Construya modelos financieros si/entonces para la convergencia sin precedentes de expiración del CHCF, recortes de Medicaid y erosión del 340B" },
  description: { en: "No FQHC in the program's 60-year history has faced this many simultaneous funding threats. Learn to build three financial scenarios before Q2 2026.", es: "Ningún FQHC en los 60 años del programa ha enfrentado tantas amenazas simultáneas. Aprenda a construir tres escenarios financieros antes del Q2 2026." },
  estimatedMinutes: 10,
  icon: "ShieldAlert",
  color: "red",
  category: "survival",
  learningObjectives: [
    { en: "Map all 7 funding cliffs on a single timeline with dollar-amount exposure per cliff", es: "Mapee los 7 precipicios de financiamiento en una sola línea de tiempo con exposición en dólares por precipicio" },
    { en: "Build 3 financial scenarios (optimistic, realistic, catastrophic) using if/then models", es: "Construya 3 escenarios financieros (optimista, realista, catastrófico) usando modelos si/entonces" },
    { en: "Prepare the board conversation with decision points, not just problems", es: "Prepare la conversación con la junta con puntos de decisión, no solo problemas" },
  ],
  conceptContent: [
    {
      heading: { en: "The Unprecedented Convergence", es: "La Convergencia Sin Precedentes" },
      body: { en: "CHCF authorization expires December 2026. Dental coverage for undocumented adults ends July 2026. Medicaid work requirements begin January 2027. The provider tax phase-down starts 2028. PPS elimination for UIS services hits 2028. Seven major policy deadlines in eighteen months — no FQHC has faced this before.", es: "La autorización CHCF expira en diciembre 2026. La cobertura dental para adultos indocumentados termina en julio 2026. Los requisitos de trabajo de Medicaid comienzan en enero 2027. Siete plazos de políticas importantes en dieciocho meses — ningún FQHC ha enfrentado esto antes." },
    },
    {
      heading: { en: "Scenario Planning, Not Doomsday Planning", es: "Planificación de Escenarios, No Planificación Apocalíptica" },
      body: { en: "The board needs to see decision trees, not doomsday presentations. Build three scenarios: optimistic (partial extensions, some cuts absorbed), realistic (50% of threats materialize), and catastrophic (all cliffs hit fully). For each, identify services to protect first and which can be restructured. FQHCs that plan now will absorb patients from centers that didn't — crisis creates opportunity for the prepared.", es: "La junta necesita ver árboles de decisión, no presentaciones apocalípticas. Construya tres escenarios: optimista (extensiones parciales), realista (50% de amenazas se materializan) y catastrófico (todos los precipicios golpean). Los FQHCs que planifican ahora absorberán pacientes de los centros que no lo hicieron." },
    },
  ],
  exercises: [
    {
      type: "drag-sort",
      id: "seven-cliffs-sort",
      instruction: { en: "Rank these funding cliffs by timeline — which hits first?", es: "Ordene estos precipicios de financiamiento por cronología — ¿cuál golpea primero?" },
      items: [
        { text: { en: "Dental coverage elimination for undocumented adults (Jul 2026)", es: "Eliminación de cobertura dental para adultos indocumentados (Jul 2026)" }, correctPosition: 1 },
        { text: { en: "CHCF authorization expiration (Dec 2026)", es: "Expiración de autorización CHCF (Dic 2026)" }, correctPosition: 2 },
        { text: { en: "Medicaid work requirements (Jan 2027)", es: "Requisitos de trabajo de Medicaid (Ene 2027)" }, correctPosition: 3 },
        { text: { en: "Provider tax phase-down (2028)", es: "Reducción del impuesto a proveedores (2028)" }, correctPosition: 4 },
        { text: { en: "PPS elimination for UIS services (2028)", es: "Eliminación de PPS para servicios UIS (2028)" }, correctPosition: 5 },
      ],
      xpReward: 20,
    },
    {
      type: "mini-quiz",
      id: "seven-cliffs-quiz",
      questions: [
        {
          question: { en: "What should your board presentation include for each scenario?", es: "¿Qué debe incluir su presentación a la junta para cada escenario?" },
          options: [
            { text: { en: "Dollar amounts only", es: "Solo cantidades en dólares" }, isCorrect: false, explanation: { en: "Numbers alone don't help the board make decisions.", es: "Los números solos no ayudan a la junta a tomar decisiones." } },
            { text: { en: "Decision points and if/then actions", es: "Puntos de decisión y acciones si/entonces" }, isCorrect: true, explanation: { en: "Correct — make it actionable with clear triggers and responses for each scenario.", es: "Correcto — hágalo accionable con disparadores claros y respuestas para cada escenario." } },
            { text: { en: "Worst-case only to create urgency", es: "Solo el peor caso para crear urgencia" }, isCorrect: false, explanation: { en: "Three scenarios (optimistic, realistic, catastrophic) are needed for balanced planning.", es: "Se necesitan tres escenarios para una planificación equilibrada." } },
            { text: { en: "A request for more grant funding", es: "Una solicitud de más subvenciones" }, isCorrect: false, explanation: { en: "The whole point of scenario planning is preparing for reduced federal funding.", es: "El punto de la planificación de escenarios es prepararse para la reducción de fondos federales." } },
          ],
        },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "Community Link: Scenario Planning for FQHCs", url: "https://www.communitylinkconsulting.com/clc-articles-tips/scenario-planning-fqhc-federal-funding-uncertainty" },
    { label: "NACHC 2024 UDS Early Takeaways", url: "https://www.nachc.org/2024-uds-early-takeaways-community-health-center-growth-under-pressure/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 3: 340B Under Siege                                         */
/* ================================================================== */

const module3: MasterclassCourseModule = {
  id: "340b-under-siege",
  order: 3,
  title: { en: "Your 340B Is Under Siege — Protecting Your Pharmacy Lifeline", es: "Su 340B Está Bajo Asedio — Protegiendo su Línea de Vida Farmacéutica" },
  subtitle: { en: "18 manufacturers have restricted 340B pricing since 2020 — here's how to protect this existential revenue stream", es: "18 fabricantes han restringido los precios 340B desde 2020 — así es cómo proteger esta fuente de ingresos existencial" },
  description: { en: "340B savings fund dental, behavioral health, translation services, food banks, and co-pay assistance. 38% of CHCs expect further declines. Learn to protect and optimize this critical program.", es: "Los ahorros del 340B financian servicios dentales, salud conductual, traducción, bancos de alimentos y asistencia con copagos. El 38% de los CHC espera más disminuciones." },
  estimatedMinutes: 10,
  icon: "ShieldAlert",
  color: "red",
  category: "survival",
  learningObjectives: [
    { en: "Understand how 340B savings flow through your P&L and which services they subsidize", es: "Entienda cómo los ahorros del 340B fluyen a través de su P&L y qué servicios subsidian" },
    { en: "Map manufacturer restrictions affecting your formulary and quantify revenue exposure", es: "Mapee las restricciones de fabricantes que afectan su formulario y cuantifique la exposición de ingresos" },
    { en: "Audit contract pharmacy arrangements for compliance before external audit hits", es: "Audite los arreglos de farmacias contratistas para cumplimiento antes de la auditoría externa" },
  ],
  conceptContent: [
    {
      heading: { en: "Why 340B Matters for FQHCs", es: "Por Qué el 340B Importa para los FQHCs" },
      body: { en: "CHCs account for only 5.4% of 340B purchases but serve the most vulnerable patients. 340B isn't a profit center — it's the financial plumbing that makes sliding-scale care possible. Every penny of 340B savings must be reinvested into patient care. When 340B shrinks, uninsured patients lose dental, behavioral health, and translation services.", es: "Los CHC representan solo el 5.4% de las compras del 340B pero sirven a los pacientes más vulnerables. El 340B no es un centro de ganancias — es la infraestructura que hace posible la atención de escala deslizante." },
    },
    {
      heading: { en: "The Coordinated Attack", es: "El Ataque Coordinado" },
      body: { en: "18 manufacturers have unilaterally restricted 340B pricing since 2020. PBMs are squeezing contract pharmacy margins. Congressional critics continue to propose program limitations. 38% of CHCs expect revenue to decline further. Proactive compliance audits are cheaper than reactive investigations — start now.", es: "18 fabricantes han restringido unilateralmente los precios del 340B desde 2020. Los PBMs están presionando los márgenes de farmacias contratistas. El 38% de los CHC espera que los ingresos disminuyan más." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "340b-quiz",
      questions: [
        {
          question: { en: "What percentage of 340B purchases do CHCs account for?", es: "¿Qué porcentaje de las compras del 340B representan los CHC?" },
          options: [
            { text: { en: "5.4%", es: "5.4%" }, isCorrect: true, explanation: { en: "Correct — CHCs are a small part of total 340B volume but serve the most vulnerable populations.", es: "Correcto — los CHC son una pequeña parte del volumen total del 340B pero sirven a las poblaciones más vulnerables." } },
            { text: { en: "15%", es: "15%" }, isCorrect: false, explanation: { en: "CHCs account for just 5.4% of 340B purchases.", es: "Los CHC representan solo el 5.4% de las compras del 340B." } },
            { text: { en: "25%", es: "25%" }, isCorrect: false, explanation: { en: "Much less — hospitals and other covered entities dominate 340B volume.", es: "Mucho menos — los hospitales dominan el volumen del 340B." } },
            { text: { en: "40%", es: "40%" }, isCorrect: false, explanation: { en: "CHCs are only 5.4% — this is a key advocacy point.", es: "Los CHC son solo el 5.4% — este es un punto clave de defensa." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "340b-classify",
      instruction: { en: "Which actions protect your 340B program?", es: "¿Cuáles acciones protegen su programa 340B?" },
      items: [
        { text: { en: "Conducting proactive compliance audits", es: "Realizar auditorías proactivas de cumplimiento" }, isGood: true, explanation: { en: "Proactive audits are cheaper than reactive investigations.", es: "Las auditorías proactivas son más baratas que las investigaciones reactivas." } },
        { text: { en: "Evaluating in-house pharmacy optimization", es: "Evaluar la optimización de farmacia interna" }, isGood: true, explanation: { en: "In-house pharmacies hedge against contract pharmacy erosion.", es: "Las farmacias internas protegen contra la erosión de farmacias contratistas." } },
        { text: { en: "Waiting for Congress to fix the program", es: "Esperar a que el Congreso arregle el programa" }, isGood: false, explanation: { en: "Passive waiting puts your revenue at risk — take proactive steps now.", es: "Esperar pasivamente pone en riesgo sus ingresos — tome medidas proactivas ahora." } },
        { text: { en: "Mapping manufacturer restrictions against your formulary", es: "Mapear las restricciones de fabricantes contra su formulario" }, isGood: true, explanation: { en: "Understanding your exposure lets you plan mitigations.", es: "Entender su exposición le permite planificar mitigaciones." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "NACHC: 340B Critical Program", url: "https://www.nachc.org/resource/340-b-a-critical-program-for-health-centers/" },
    { label: "CBO: Growth in the 340B Program", url: "https://www.cbo.gov/publication/61730" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 4: PPS Codes Not Billing                                    */
/* ================================================================== */

const module4: MasterclassCourseModule = {
  id: "pps-codes-not-billing",
  order: 4,
  title: { en: "The PPS Codes You're Not Billing — Revenue Hiding in Plain Sight", es: "Los Códigos PPS que No Está Facturando — Ingresos Ocultos a la Vista" },
  subtitle: { en: "New billable services from 2024 that most FQHCs haven't adopted yet", es: "Nuevos servicios facturables de 2024 que la mayoría de los FQHC aún no han adoptado" },
  description: { en: "CMS expanded billable FQHC services in 2024, but adoption is lagging. Each missed encounter at the $202.65 PPS rate compounds into significant annual revenue loss.", es: "CMS expandió los servicios facturables de FQHC en 2024, pero la adopción está rezagada. Cada encuentro perdido a la tarifa PPS de $202.65 se acumula en pérdidas significativas." },
  estimatedMinutes: 9,
  icon: "DollarSign",
  color: "amber",
  category: "revenue",
  learningObjectives: [
    { en: "Audit your current PPS billing against the full menu of eligible encounter types", es: "Audite su facturación PPS actual contra el menú completo de tipos de encuentros elegibles" },
    { en: "Implement G0511 multi-billing workflows for care management encounters", es: "Implemente flujos de trabajo de facturación múltiple G0511 para encuentros de gestión de atención" },
    { en: "Convert existing SDoH screening into billable G0136 encounters", es: "Convierta las evaluaciones SDoH existentes en encuentros facturables G0136" },
  ],
  conceptContent: [
    {
      heading: { en: "You're Already Doing the Work", es: "Ya Está Haciendo el Trabajo" },
      body: { en: "G0511 General Care Management can be billed multiple times per month — most FQHCs bill once. G0136 Social Determinants of Health risk assessments are now reimbursable, yet 67% of FQHCs screen but far fewer bill for it. Caregiver training for chronic illness is a new billable category most haven't activated. The gap is in documentation and coding, not clinical practice.", es: "G0511 puede facturarse varias veces al mes — la mayoría factura una vez. Las evaluaciones G0136 SDoH ahora son reembolsables, pero el 67% evalúa y pocos facturan. La brecha está en documentación y codificación, no en práctica clínica." },
    },
    {
      heading: { en: "The Revenue Math", es: "Las Matemáticas de Ingresos" },
      body: { en: "2 additional encounters per provider per day at $202.65 = approximately $100K+ per provider per year. For a 20-provider FQHC, that's $2M+ in annual revenue recovery from services you're already delivering. PPS rate rebasing is your right — if your cost structure has changed, request it.", es: "2 encuentros adicionales por proveedor por día a $202.65 = aproximadamente $100K+ por proveedor por año. Para un FQHC de 20 proveedores, eso es $2M+ en recuperación anual de ingresos de servicios que ya está entregando." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "pps-quiz",
      questions: [
        {
          question: { en: "What is the approximate annual revenue gain from 2 additional PPS encounters per provider per day?", es: "¿Cuál es la ganancia anual aproximada de 2 encuentros PPS adicionales por proveedor por día?" },
          options: [
            { text: { en: "$25K per provider", es: "$25K por proveedor" }, isCorrect: false, explanation: { en: "Much higher — at $202.65 per encounter, 2 per day adds up quickly.", es: "Mucho más alto — a $202.65 por encuentro, 2 por día se acumulan rápidamente." } },
            { text: { en: "$100K+ per provider", es: "$100K+ por proveedor" }, isCorrect: true, explanation: { en: "Correct. 2 encounters × $202.65 × ~250 working days = over $100K per provider per year.", es: "Correcto. 2 encuentros × $202.65 × ~250 días laborales = más de $100K por proveedor por año." } },
            { text: { en: "$50K per provider", es: "$50K por proveedor" }, isCorrect: false, explanation: { en: "At $202.65 per encounter, the actual figure is closer to $100K+.", es: "A $202.65 por encuentro, la cifra real es cercana a $100K+." } },
            { text: { en: "$500K per provider", es: "$500K por proveedor" }, isCorrect: false, explanation: { en: "That would require about 10 extra encounters per day — 2 per day yields ~$100K.", es: "Eso requeriría unos 10 encuentros extra por día — 2 por día produce ~$100K." } },
          ],
        },
        {
          question: { en: "What percentage of FQHCs screen for SDoH but don't bill for it?", es: "¿Qué porcentaje de FQHCs evalúan SDoH pero no facturan por ello?" },
          options: [
            { text: { en: "30%", es: "30%" }, isCorrect: false, explanation: { en: "The gap is much larger — 67% screen but far fewer bill.", es: "La brecha es mucho mayor — el 67% evalúa pero muchos menos facturan." } },
            { text: { en: "67%", es: "67%" }, isCorrect: true, explanation: { en: "Correct — G0136 makes this screening billable, but most centers haven't converted.", es: "Correcto — G0136 hace esta evaluación facturable, pero la mayoría no ha convertido." } },
            { text: { en: "50%", es: "50%" }, isCorrect: false, explanation: { en: "The actual screening rate is 67%.", es: "La tasa de evaluación real es del 67%." } },
            { text: { en: "90%", es: "90%" }, isCorrect: false, explanation: { en: "67% screen, and the billing rate is even lower than that.", es: "El 67% evalúa, y la tasa de facturación es aún menor." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "pps-classify",
      instruction: { en: "Which are new or underutilized billable FQHC encounter types?", es: "¿Cuáles son tipos de encuentros facturables nuevos o subutilizados en FQHCs?" },
      items: [
        { text: { en: "G0511 General Care Management (multiple per month)", es: "G0511 Gestión General de Atención (múltiple por mes)" }, isGood: true, explanation: { en: "Most FQHCs bill once — it can be billed multiple times per month.", es: "La mayoría factura una vez — puede facturarse múltiples veces por mes." } },
        { text: { en: "G0136 SDoH risk assessments", es: "G0136 Evaluaciones de riesgo SDoH" }, isGood: true, explanation: { en: "Now reimbursable under PPS — convert existing screenings to billable encounters.", es: "Ahora reembolsable bajo PPS — convierta evaluaciones existentes en encuentros facturables." } },
        { text: { en: "Standard office visit (already billing)", es: "Visita de oficina estándar (ya facturando)" }, isGood: false, explanation: { en: "This is already being billed — the opportunity is in NEW encounter types.", es: "Esto ya se está facturando — la oportunidad está en NUEVOS tipos de encuentros." } },
        { text: { en: "Caregiver training for chronic illness", es: "Capacitación de cuidadores para enfermedades crónicas" }, isGood: true, explanation: { en: "A new billable category most FQHCs haven't activated yet.", es: "Una nueva categoría facturable que la mayoría de los FQHCs no ha activado." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "NACHC FQHC Payment Guide (PDF)", url: "https://www.nachc.org/wp-content/uploads/2025/05/FQHC-Payment-Guide.pdf" },
    { label: "CMS FQHC Center (PDF)", url: "https://www.cms.gov/files/document/mln006397-federally-qualified-health-center.pdf" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 5: IPA Formation                                            */
/* ================================================================== */

const module5: MasterclassCourseModule = {
  id: "ipa-formation",
  order: 5,
  title: { en: "The IPA Nobody Told You About — Collective Bargaining for Small FQHCs", es: "La IPA que Nadie le Contó — Negociación Colectiva para FQHCs Pequeños" },
  subtitle: { en: "How FQHC-only independent practice associations give small centers the negotiating power of large systems", es: "Cómo las IPAs exclusivas para FQHCs dan a los centros pequeños el poder de negociación de grandes sistemas" },
  description: { en: "62% of CHCs are in ACOs but most small FQHCs negotiate alone. CHIPA in New York proved that collective bargaining through an IPA changes the power dynamic with MCOs.", es: "El 62% de los CHC están en ACO pero la mayoría de los FQHCs pequeños negocian solos. CHIPA en Nueva York demostró que la negociación colectiva a través de una IPA cambia la dinámica de poder." },
  estimatedMinutes: 10,
  icon: "DollarSign",
  color: "amber",
  category: "revenue",
  learningObjectives: [
    { en: "Understand structural differences between MSO, IPA, and ACO models", es: "Entienda las diferencias estructurales entre modelos MSO, IPA y ACO" },
    { en: "Assess your center's readiness for collective contracting", es: "Evalúe la preparación de su centro para contratación colectiva" },
    { en: "Model shared-risk contracts and understand downside exposure", es: "Modele contratos de riesgo compartido y entienda la exposición negativa" },
  ],
  conceptContent: [
    {
      heading: { en: "Why Small FQHCs Lose the Negotiation Game", es: "Por Qué los FQHCs Pequeños Pierden el Juego de Negociación" },
      body: { en: "Medicaid managed care organizations increasingly dictate terms to individual FQHCs. Small centers lack patient volume and data infrastructure to negotiate value-based contracts alone. With 65% of FQHCs reporting insufficient financial resources, collective action isn't optional — it's survival math.", es: "Las organizaciones de atención administrada de Medicaid dictan cada vez más los términos a los FQHCs individuales. Los centros pequeños carecen del volumen y la infraestructura de datos para negociar solos. Con el 65% reportando recursos financieros insuficientes, la acción colectiva no es opcional." },
    },
    {
      heading: { en: "The CHIPA Model", es: "El Modelo CHIPA" },
      body: { en: "CHIPA in New York proved that an FQHC-only IPA can collectively bargain with MCOs, share risk, reduce administrative overhead, and build shared data infrastructure for value-based care. Cultural alignment between partner FQHCs is the #1 predictor of IPA success — financial and clinical alignment alone aren't enough.", es: "CHIPA en Nueva York demostró que una IPA exclusiva de FQHC puede negociar colectivamente con MCOs, compartir riesgo, reducir gastos administrativos y construir infraestructura de datos compartida. La alineación cultural entre FQHCs socios es el predictor #1 del éxito de una IPA." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "ipa-quiz",
      questions: [
        {
          question: { en: "What is the #1 predictor of IPA success among partner FQHCs?", es: "¿Cuál es el predictor #1 del éxito de una IPA entre FQHCs socios?" },
          options: [
            { text: { en: "Financial size", es: "Tamaño financiero" }, isCorrect: false, explanation: { en: "Size helps but cultural alignment matters more.", es: "El tamaño ayuda pero la alineación cultural importa más." } },
            { text: { en: "Cultural alignment", es: "Alineación cultural" }, isCorrect: true, explanation: { en: "Correct — partners must be financially, clinically, AND culturally aligned.", es: "Correcto — los socios deben estar alineados financiera, clínica Y culturalmente." } },
            { text: { en: "Geographic proximity", es: "Proximidad geográfica" }, isCorrect: false, explanation: { en: "While helpful, cultural alignment is the strongest predictor.", es: "Aunque ayuda, la alineación cultural es el predictor más fuerte." } },
            { text: { en: "Number of providers", es: "Número de proveedores" }, isCorrect: false, explanation: { en: "Provider count helps negotiating leverage but isn't the top success factor.", es: "El número de proveedores ayuda pero no es el factor principal de éxito." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "ipa-classify",
      instruction: { en: "Which factors indicate IPA readiness?", es: "¿Qué factores indican preparación para una IPA?" },
      items: [
        { text: { en: "Electronic health records with quality reporting capabilities", es: "Registros electrónicos con capacidades de informes de calidad" }, isGood: true, explanation: { en: "Data infrastructure is essential for value-based contracting.", es: "La infraestructura de datos es esencial para contratación basada en valor." } },
        { text: { en: "Strong cultural alignment with potential partners", es: "Fuerte alineación cultural con socios potenciales" }, isGood: true, explanation: { en: "The #1 predictor of IPA success.", es: "El predictor #1 del éxito de una IPA." } },
        { text: { en: "Desire to avoid all financial risk", es: "Deseo de evitar todo riesgo financiero" }, isGood: false, explanation: { en: "Value-based care requires accepting some shared risk.", es: "La atención basada en valor requiere aceptar algo de riesgo compartido." } },
        { text: { en: "Willingness to share data and best practices", es: "Disposición a compartir datos y mejores prácticas" }, isGood: true, explanation: { en: "IPAs pool data and practices — transparency is essential.", es: "Las IPAs comparten datos y prácticas — la transparencia es esencial." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "CHIPA (NY FQHC IPA)", url: "https://www.communityhealthipa.com/" },
    { label: "Commonwealth Fund: Advancing Accountable Care in CHCs", url: "https://www.commonwealthfund.org/publications/issue-briefs/2025/aug/advancing-accountable-care-community-health-centers" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 6: Grant Stacking                                           */
/* ================================================================== */

const module6: MasterclassCourseModule = {
  id: "grant-stacking",
  order: 6,
  title: { en: "Grant Stacking 101 — The Section 330 Sub-Grants You Didn't Apply For", es: "Apilamiento de Subvenciones 101 — Las Sub-Subvenciones de la Sección 330 que No Solicitó" },
  subtitle: { en: "Most FQHCs have their base 330 grant — few stack all available sub-grants, NHSC slots, and FTCA coverage", es: "La mayoría tienen su subvención base 330 — pocos apilan todas las sub-subvenciones, plazas NHSC y cobertura FTCA" },
  description: { en: "Section 330 funding doubled from $2.2B to $5.6B but many FQHCs are missing sub-grants they're already eligible for. NHSC loan repayment and FTCA coverage are money you're entitled to.", es: "El financiamiento de la Sección 330 se duplicó pero muchos FQHCs no aprovechan sub-subvenciones para las que ya son elegibles." },
  estimatedMinutes: 9,
  icon: "DollarSign",
  color: "amber",
  category: "revenue",
  learningObjectives: [
    { en: "Inventory all Section 330 sub-grant categories and assess eligibility", es: "Inventaríe todas las categorías de sub-subvenciones de la Sección 330 y evalúe la elegibilidad" },
    { en: "Calculate the financial value of NHSC slots and FTCA coverage", es: "Calcule el valor financiero de las plazas NHSC y la cobertura FTCA" },
    { en: "Build a multi-year grant calendar with application deadlines", es: "Construya un calendario de subvenciones multianual con fechas límite" },
  ],
  conceptContent: [
    {
      heading: { en: "The Sub-Grants You're Missing", es: "Las Sub-Subvenciones que Está Perdiendo" },
      body: { en: "Beyond the base Section 330 grant, many FQHCs qualify for: Health Centers for the Homeless, Migrant Health Centers, Public Housing Primary Care. NHSC loan repayment slots are essentially free clinical labor. FTCA malpractice coverage saves $50-150K/year per center. These aren't new programs — they're money you're already entitled to.", es: "Además de la subvención base, muchos FQHCs califican para: Centros para Personas sin Hogar, Centros de Salud para Migrantes, Atención Primaria en Vivienda Pública. Las plazas NHSC son esencialmente mano de obra clínica gratuita. La cobertura FTCA ahorra $50-150K/año." },
    },
    {
      heading: { en: "Getting Paid for What You Already Do", es: "Recibir Pago por lo que Ya Hace" },
      body: { en: "HRSA issued the first New Access Points NOFO since 2019 in May 2024 — $50 million for new sites with maximum $650K/year per award. Grant stacking isn't about doing more — it's about getting paid for services you're already delivering to populations you're already serving.", es: "HRSA emitió el primer NOFO de Nuevos Puntos de Acceso desde 2019 en mayo 2024 — $50 millones para nuevos sitios. El apilamiento de subvenciones no se trata de hacer más — se trata de recibir pago por servicios que ya está entregando." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "grants-quiz",
      questions: [
        {
          question: { en: "How much does FTCA malpractice coverage save per center per year?", es: "¿Cuánto ahorra la cobertura FTCA por centro por año?" },
          options: [
            { text: { en: "$10-25K", es: "$10-25K" }, isCorrect: false, explanation: { en: "FTCA saves much more — $50-150K/year by eliminating commercial malpractice insurance.", es: "FTCA ahorra mucho más — $50-150K/año al eliminar el seguro comercial de negligencia." } },
            { text: { en: "$50-150K", es: "$50-150K" }, isCorrect: true, explanation: { en: "Correct — if you're buying commercial malpractice insurance, you're overpaying.", es: "Correcto — si compra seguro comercial de negligencia, está pagando de más." } },
            { text: { en: "$200-300K", es: "$200-300K" }, isCorrect: false, explanation: { en: "The actual savings range is $50-150K/year.", es: "El rango real de ahorro es $50-150K/año." } },
            { text: { en: "$5-10K", es: "$5-10K" }, isCorrect: false, explanation: { en: "Much more — FTCA replaces expensive commercial policies.", es: "Mucho más — FTCA reemplaza pólizas comerciales costosas." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "grants-classify",
      instruction: { en: "Which are Section 330 sub-grant categories or related programs?", es: "¿Cuáles son categorías de sub-subvenciones de la Sección 330 o programas relacionados?" },
      items: [
        { text: { en: "Health Centers for the Homeless", es: "Centros de Salud para Personas sin Hogar" }, isGood: true, explanation: { en: "A specific Section 330 sub-grant for homeless populations.", es: "Una sub-subvención específica de la Sección 330 para poblaciones sin hogar." } },
        { text: { en: "NHSC Loan Repayment", es: "Reembolso de Préstamos NHSC" }, isGood: true, explanation: { en: "The most underutilized recruitment tool — essentially a federal salary subsidy.", es: "La herramienta de reclutamiento más subutilizada — esencialmente un subsidio salarial federal." } },
        { text: { en: "Private foundation grants only", es: "Solo subvenciones de fundaciones privadas" }, isGood: false, explanation: { en: "Section 330 sub-grants are federal, not private foundation grants.", es: "Las sub-subvenciones de la Sección 330 son federales, no de fundaciones privadas." } },
        { text: { en: "Migrant Health Centers", es: "Centros de Salud para Migrantes" }, isGood: true, explanation: { en: "Another Section 330 sub-grant category for migrant populations.", es: "Otra categoría de sub-subvención de la Sección 330 para poblaciones migrantes." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "KFF: CHC Financing — Section 330 & Medicaid", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
    { label: "Advocates for Community Health: How CHCs Are Funded", url: "https://advocatesforcommunityhealth.org/how-are-community-health-centers-funded/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 7: ICE Playbook                                             */
/* ================================================================== */

const module7: MasterclassCourseModule = {
  id: "ice-playbook",
  order: 7,
  title: { en: "The ICE Playbook — Operational Protocols for Post-Protected-Areas Healthcare", es: "El Manual de ICE — Protocolos Operativos para la Atención Médica Post-Áreas Protegidas" },
  subtitle: { en: "84% of healthcare workers report patient visit declines since January 2025 — your protocols can reverse this", es: "El 84% de los trabajadores de salud reportan disminución de visitas desde enero 2025 — sus protocolos pueden revertir esto" },
  description: { en: "The rescission of the Protected Areas policy means FQHCs need clear operational protocols. California SB 81 provides new legal protections — but implementation is the gap.", es: "La rescisión de la política de Áreas Protegidas significa que los FQHCs necesitan protocolos operativos claros. SB 81 de California proporciona nuevas protecciones legales." },
  estimatedMinutes: 11,
  icon: "Heart",
  color: "purple",
  category: "undocumented-care",
  learningObjectives: [
    { en: "Distinguish judicial warrants from ICE administrative warrants", es: "Distinga las órdenes judiciales de las órdenes administrativas de ICE" },
    { en: "Map public vs. private areas in your facility and establish protocols", es: "Mapee las áreas públicas vs. privadas en su instalación y establezca protocolos" },
    { en: "Implement a waiting room 'Know Your Rights' program", es: "Implemente un programa de 'Conozca Sus Derechos' en la sala de espera" },
  ],
  conceptContent: [
    {
      heading: { en: "What Changed in January 2025", es: "Qué Cambió en Enero 2025" },
      body: { en: "The rescission of the Protected Areas policy removed the designation of healthcare facilities as off-limits to immigration enforcement. 84% of healthcare workers surveyed by Physicians for Human Rights report significant visit declines. 29% of immigrants report skipping healthcare. But HIPAA still protects patient information from compelled disclosure — this is your strongest shield.", es: "La rescisión de la política de Áreas Protegidas eliminó la designación de instalaciones de salud como fuera del alcance de inmigración. El 84% de los trabajadores reportan disminuciones de visitas. Pero HIPAA aún protege la información del paciente — este es su escudo más fuerte." },
    },
    {
      heading: { en: "California SB 81 and Operational Protocols", es: "SB 81 de California y Protocolos Operativos" },
      body: { en: "California SB 81 'Care Over Fear Act' makes immigration status protected medical information. Clinica Romero's Know Your Rights program in the waiting room maintains patient trust. Designate an institutional liaison for any enforcement interaction. Map your facility's public vs. private areas. Proactive trust-building is cheaper than reactive crisis management.", es: "SB 81 de California convierte el estatus migratorio en información médica protegida. El programa Conozca Sus Derechos de Clínica Romero en la sala de espera mantiene la confianza del paciente. Designe un enlace institucional para cualquier interacción de aplicación." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "ice-quiz",
      questions: [
        {
          question: { en: "What percentage of immigrants report skipping or postponing healthcare in 2025?", es: "¿Qué porcentaje de inmigrantes reporta omitir o posponer atención médica en 2025?" },
          options: [
            { text: { en: "10%", es: "10%" }, isCorrect: false, explanation: { en: "Higher — nearly a third of immigrants are avoiding care.", es: "Más alto — casi un tercio de los inmigrantes está evitando la atención." } },
            { text: { en: "29%", es: "29%" }, isCorrect: true, explanation: { en: "Correct — the KFF/NYT 2025 survey found 29% skipped or postponed healthcare.", es: "Correcto — la encuesta KFF/NYT de 2025 encontró que el 29% omitió o pospuso atención." } },
            { text: { en: "50%", es: "50%" }, isCorrect: false, explanation: { en: "The actual figure is 29%, though 30% also limited activities outside the home.", es: "La cifra real es 29%, aunque el 30% también limitó actividades fuera del hogar." } },
            { text: { en: "15%", es: "15%" }, isCorrect: false, explanation: { en: "Nearly double that — 29% are skipping care.", es: "Casi el doble — el 29% está omitiendo atención." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "ice-classify",
      instruction: { en: "Which are correct operational protocols for immigration enforcement interactions?", es: "¿Cuáles son protocolos operativos correctos para interacciones de aplicación de inmigración?" },
      items: [
        { text: { en: "Require a judicial warrant (not ICE administrative warrant) for access", es: "Requerir una orden judicial (no administrativa de ICE) para acceso" }, isGood: true, explanation: { en: "Administrative warrants don't carry the legal weight of judicial warrants.", es: "Las órdenes administrativas no tienen el peso legal de las órdenes judiciales." } },
        { text: { en: "Provide patient records when asked by any law enforcement", es: "Proporcionar registros de pacientes cuando lo pida cualquier autoridad" }, isGood: false, explanation: { en: "HIPAA protects patient information — don't disclose without a proper judicial order.", es: "HIPAA protege la información — no divulgue sin una orden judicial adecuada." } },
        { text: { en: "Designate an institutional liaison for enforcement interactions", es: "Designar un enlace institucional para interacciones de aplicación" }, isGood: true, explanation: { en: "Having a trained point person prevents ad-hoc decisions under pressure.", es: "Tener una persona de contacto capacitada previene decisiones improvisadas bajo presión." } },
        { text: { en: "Post 'Know Your Rights' information in waiting areas", es: "Publicar información 'Conozca Sus Derechos' en salas de espera" }, isGood: true, explanation: { en: "Following Clinica Romero's model, this builds trust and informs patients.", es: "Siguiendo el modelo de Clínica Romero, esto construye confianza e informa a los pacientes." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "NILC/PHR: Healthcare & Immigration Guide", url: "https://www.nilc.org/wp-content/uploads/2025/03/Health-Care-and-U.S.-Immigration-Enforcement_What-Providers-Need-to-Know_Guide_PHR-and-NILC-2025.pdf" },
    { label: "PMC: Clinica Romero KYR Case Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8804239/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 8: Maintaining Trust                                        */
/* ================================================================== */

const module8: MasterclassCourseModule = {
  id: "maintaining-trust",
  order: 8,
  title: { en: "Maintaining Trust When Patients Are Afraid — The Chilling Effect Response", es: "Manteniendo la Confianza Cuando los Pacientes Tienen Miedo — Respuesta al Efecto Disuasorio" },
  subtitle: { en: "29% of immigrants are skipping healthcare — community outreach strategies that rebuild patient volume", es: "El 29% de los inmigrantes está omitiendo atención — estrategias de alcance comunitario que reconstruyen el volumen" },
  description: { en: "The chilling effect is measurable and reversible. FQHCs that invest in promotora networks, faith partnerships, and community presence are rebuilding trust.", es: "El efecto disuasorio es medible y reversible. Los FQHCs que invierten en promotoras, asociaciones de fe y presencia comunitaria están reconstruyendo la confianza." },
  estimatedMinutes: 9,
  icon: "Heart",
  color: "purple",
  category: "undocumented-care",
  learningObjectives: [
    { en: "Quantify the chilling effect using no-show rates, new patient intake, and cancellations", es: "Cuantifique el efecto disuasorio usando tasas de inasistencia e ingreso de nuevos pacientes" },
    { en: "Design a promotora/CHW outreach program targeting high-fear communities", es: "Diseñe un programa de alcance de promotoras/CHW para comunidades con alto miedo" },
    { en: "Build faith community and school partnerships as trusted referral channels", es: "Construya asociaciones con comunidades de fe y escuelas como canales de referencia confiables" },
  ],
  conceptContent: [
    {
      heading: { en: "Measuring the Chilling Effect", es: "Midiendo el Efecto Disuasorio" },
      body: { en: "The chilling effect isn't just about undocumented patients — a 16.9% visit decline was measured among lawfully present Hispanics. Track no-show rates by zip code, new patient intake trends, and cancellation patterns. The effect is measurable, which means it's reversible.", es: "El efecto disuasorio no solo afecta a pacientes indocumentados — se midió una disminución del 16.9% en visitas entre hispanos con residencia legal. Rastree tasas de inasistencia por código postal. El efecto es medible, lo que significa que es reversible." },
    },
    {
      heading: { en: "Rebuilding Trust Through Consistent Presence", es: "Reconstruyendo la Confianza con Presencia Consistente" },
      body: { en: "Trust is rebuilt through consistent presence, not one-time campaigns. Embed outreach in operations. Your bilingual staff are your greatest trust asset — invest in their training and community role. Promotora networks, faith community partnerships, and school-based outreach create trusted channels that fear can't break.", es: "La confianza se reconstruye con presencia consistente, no campañas únicas. Su personal bilingüe es su mayor activo de confianza. Las redes de promotoras, asociaciones de fe y alcance escolar crean canales confiables que el miedo no puede romper." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "trust-quiz",
      questions: [
        {
          question: { en: "The chilling effect on healthcare visits affected which population?", es: "¿A qué población afectó el efecto disuasorio en las visitas médicas?" },
          options: [
            { text: { en: "Only undocumented immigrants", es: "Solo inmigrantes indocumentados" }, isCorrect: false, explanation: { en: "The effect extends beyond undocumented populations — a 16.9% decline was seen among lawfully present Hispanics.", es: "El efecto se extiende más allá — se vio una disminución del 16.9% entre hispanos con residencia legal." } },
            { text: { en: "Undocumented AND lawfully present immigrants", es: "Inmigrantes indocumentados Y con residencia legal" }, isCorrect: true, explanation: { en: "Correct — the chilling effect harms people who aren't even its targets.", es: "Correcto — el efecto disuasorio daña a personas que ni siquiera son sus objetivos." } },
            { text: { en: "Only citizens of Hispanic origin", es: "Solo ciudadanos de origen hispano" }, isCorrect: false, explanation: { en: "The effect primarily hits immigrant communities, both documented and undocumented.", es: "El efecto golpea principalmente a comunidades inmigrantes, documentadas e indocumentadas." } },
            { text: { en: "All patient populations equally", es: "Todas las poblaciones por igual" }, isCorrect: false, explanation: { en: "The effect disproportionately impacts immigrant and Hispanic communities.", es: "El efecto impacta desproporcionadamente a comunidades inmigrantes e hispanas." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "trust-classify",
      instruction: { en: "Which strategies effectively rebuild patient trust?", es: "¿Cuáles estrategias reconstruyen efectivamente la confianza del paciente?" },
      items: [
        { text: { en: "Promotora/CHW outreach in high-fear communities", es: "Alcance de promotoras/CHW en comunidades con alto miedo" }, isGood: true, explanation: { en: "Trusted community health workers bridge the fear gap.", es: "Los trabajadores comunitarios de confianza cierran la brecha del miedo." } },
        { text: { en: "One-time advertising campaign", es: "Campaña de publicidad única" }, isGood: false, explanation: { en: "Trust requires consistent presence, not one-time efforts.", es: "La confianza requiere presencia consistente, no esfuerzos únicos." } },
        { text: { en: "Faith community partnerships as referral channels", es: "Asociaciones con comunidades de fe como canales de referencia" }, isGood: true, explanation: { en: "Churches and faith communities are trusted institutions in immigrant neighborhoods.", es: "Las iglesias y comunidades de fe son instituciones confiables en vecindarios inmigrantes." } },
        { text: { en: "Investing in bilingual staff training and community roles", es: "Invertir en capacitación de personal bilingüe y roles comunitarios" }, isGood: true, explanation: { en: "Bilingual staff are your greatest trust asset.", es: "El personal bilingüe es su mayor activo de confianza." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "PHR: ICE Tactics Survey", url: "https://phr.org/news/ice-tactics-and-deportation-fears-limit-access-to-health-care-for-children-of-immigrants-survey/" },
    { label: "AMA Journal of Ethics: Sanctuary Doctoring", url: "https://journalofethics.ama-assn.org/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 9: Beyond Grants                                            */
/* ================================================================== */

const module9: MasterclassCourseModule = {
  id: "beyond-grants",
  order: 9,
  title: { en: "Beyond Grants — Your First Non-Federal Dollar", es: "Más Allá de las Subvenciones — Su Primer Dólar No Federal" },
  subtitle: { en: "70% of FQHC revenue comes from Medicaid and grants — this module shows how to build your first philanthropic revenue stream", es: "El 70% de los ingresos FQHC proviene de Medicaid y subvenciones — este módulo muestra cómo construir su primera fuente de ingresos filantrópicos" },
  description: { en: "Most FQHCs have never actively fundraised. Learn the fundamentals of philanthropic revenue for mission-driven organizations.", es: "La mayoría de los FQHCs nunca han recaudado fondos activamente. Aprenda los fundamentos de ingresos filantrópicos para organizaciones impulsadas por misión." },
  estimatedMinutes: 9,
  icon: "HandCoins",
  color: "blue",
  category: "fundraising",
  learningObjectives: [
    { en: "Assess your organization's fundraising readiness", es: "Evalúe la preparación de su organización para recaudar fondos" },
    { en: "Identify your first 3 non-federal revenue opportunities", es: "Identifique sus primeras 3 oportunidades de ingresos no federales" },
    { en: "Build a case for support using patient impact data", es: "Construya un caso de apoyo usando datos de impacto en pacientes" },
  ],
  conceptContent: [
    {
      heading: { en: "Why FQHCs Don't Fundraise (And Why They Should)", es: "Por Qué los FQHCs No Recaudan (Y Por Qué Deberían)" },
      body: { en: "FQHCs have historically relied on Section 330 grants and Medicaid reimbursement. But with both under threat, philanthropic revenue provides a hedge. Community health foundations, corporate giving programs, and individual donors are all untapped sources. Your patient impact stories are your strongest fundraising tool.", es: "Los FQHCs han dependido históricamente de subvenciones Section 330 y reembolso de Medicaid. Pero con ambos bajo amenaza, los ingresos filantrópicos proporcionan una protección. Fundaciones de salud comunitaria y donantes corporativos son fuentes sin explotar." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "beyond-grants-quiz",
      questions: [
        {
          question: { en: "What percentage of FQHC revenue typically comes from Medicaid and federal grants?", es: "¿Qué porcentaje de los ingresos FQHC típicamente proviene de Medicaid y subvenciones federales?" },
          options: [
            { text: { en: "40%", es: "40%" }, isCorrect: false, explanation: { en: "Higher — most FQHCs are heavily dependent on government funding.", es: "Más alto — la mayoría de los FQHCs dependen mucho del financiamiento gubernamental." } },
            { text: { en: "70%", es: "70%" }, isCorrect: true, explanation: { en: "Correct — this level of dependency makes philanthropic diversification essential.", es: "Correcto — este nivel de dependencia hace esencial la diversificación filantrópica." } },
            { text: { en: "55%", es: "55%" }, isCorrect: false, explanation: { en: "The typical figure is around 70%.", es: "La cifra típica es alrededor del 70%." } },
            { text: { en: "90%", es: "90%" }, isCorrect: false, explanation: { en: "Some centers are this dependent, but the average is about 70%.", es: "Algunos centros tienen esta dependencia, pero el promedio es alrededor del 70%." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "beyond-grants-classify",
      instruction: { en: "Which are viable first-time fundraising channels for FQHCs?", es: "¿Cuáles son canales viables de recaudación de fondos por primera vez para FQHCs?" },
      items: [
        { text: { en: "Community health foundation grants", es: "Subvenciones de fundaciones de salud comunitaria" }, isGood: true, explanation: { en: "Many foundations specifically fund community health centers.", es: "Muchas fundaciones financian específicamente centros de salud comunitarios." } },
        { text: { en: "Corporate giving programs from local businesses", es: "Programas de donación corporativa de negocios locales" }, isGood: true, explanation: { en: "Local employers benefit from healthy communities — align your ask with their interests.", es: "Los empleadores locales se benefician de comunidades saludables." } },
        { text: { en: "Charging patients higher fees", es: "Cobrar tarifas más altas a los pacientes" }, isGood: false, explanation: { en: "FQHCs use sliding-scale fees — the goal is new revenue streams, not higher patient costs.", es: "Los FQHCs usan tarifas de escala deslizante — el objetivo son nuevas fuentes de ingresos." } },
        { text: { en: "Patient impact storytelling for individual donors", es: "Narrativas de impacto en pacientes para donantes individuales" }, isGood: true, explanation: { en: "Your patient stories are your strongest fundraising asset.", es: "Sus historias de pacientes son su activo más fuerte para recaudar fondos." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "KFF: CHC Financing Explained", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Modules 10-15: Abbreviated format (same structure)                 */
/* ================================================================== */

const module10: MasterclassCourseModule = {
  id: "fundraising-math",
  order: 10,
  title: { en: "The Fundraising Math for FQHCs — Building a Development Function from Zero", es: "Las Matemáticas de Recaudación para FQHCs — Construyendo una Función de Desarrollo desde Cero" },
  subtitle: { en: "When to hire your first development officer and what ROI to expect", es: "Cuándo contratar su primer oficial de desarrollo y qué ROI esperar" },
  description: { en: "Building a development function requires investment before return. Learn the financial math that justifies the hire and the realistic timeline to ROI.", es: "Construir una función de desarrollo requiere inversión antes del retorno. Aprenda las matemáticas financieras que justifican la contratación." },
  estimatedMinutes: 9,
  icon: "HandCoins",
  color: "blue",
  category: "fundraising",
  learningObjectives: [
    { en: "Calculate when to hire your first development officer", es: "Calcule cuándo contratar su primer oficial de desarrollo" },
    { en: "Set realistic ROI expectations for year 1, 2, and 3", es: "Establezca expectativas realistas de ROI para los años 1, 2 y 3" },
  ],
  conceptContent: [
    {
      heading: { en: "The Investment Timeline", es: "La Línea de Tiempo de Inversión" },
      body: { en: "A development officer costs $80-120K in total compensation. Year 1 ROI is typically negative — you're building relationships. Year 2 should break even. Year 3+ should deliver 3-5x return. The mistake is expecting immediate returns. The bigger mistake is never starting.", es: "Un oficial de desarrollo cuesta $80-120K en compensación total. El ROI del Año 1 es típicamente negativo. El Año 2 debe alcanzar equilibrio. El Año 3+ debe entregar 3-5x de retorno." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "fundraising-math-quiz",
      questions: [
        {
          question: { en: "By year 3, what ROI should a development function deliver?", es: "¿Qué ROI debe entregar una función de desarrollo para el año 3?" },
          options: [
            { text: { en: "1x (break even)", es: "1x (equilibrio)" }, isCorrect: false, explanation: { en: "Break even should happen by year 2. Year 3 should exceed that.", es: "El equilibrio debería ocurrir en el año 2. El año 3 debería excederlo." } },
            { text: { en: "3-5x return", es: "3-5x de retorno" }, isCorrect: true, explanation: { en: "Correct — a mature development function delivers strong multiples.", es: "Correcto — una función de desarrollo madura entrega múltiplos fuertes." } },
            { text: { en: "10x return", es: "10x de retorno" }, isCorrect: false, explanation: { en: "3-5x is a realistic target. 10x is possible but aspirational.", es: "3-5x es un objetivo realista. 10x es posible pero aspiracional." } },
            { text: { en: "Still negative", es: "Aún negativo" }, isCorrect: false, explanation: { en: "If year 3 is still negative, there's a problem with your strategy.", es: "Si el año 3 es aún negativo, hay un problema con su estrategia." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "fundraising-math-classify",
      instruction: { en: "Which are realistic year-1 development activities?", es: "¿Cuáles son actividades realistas de desarrollo del año 1?" },
      items: [
        { text: { en: "Building a donor prospect list", es: "Construir una lista de prospectos de donantes" }, isGood: true, explanation: { en: "Foundation work — essential before asking for money.", es: "Trabajo de base — esencial antes de pedir dinero." } },
        { text: { en: "Expecting $1M in donations", es: "Esperar $1M en donaciones" }, isGood: false, explanation: { en: "Year 1 is investment phase — relationships come before revenue.", es: "El año 1 es fase de inversión — las relaciones vienen antes de los ingresos." } },
        { text: { en: "Creating patient impact case studies", es: "Crear estudios de caso de impacto en pacientes" }, isGood: true, explanation: { en: "Your stories are your fundraising foundation.", es: "Sus historias son la base de su recaudación." } },
        { text: { en: "Developing foundation grant applications", es: "Desarrollar solicitudes de subvenciones de fundaciones" }, isGood: true, explanation: { en: "Foundation grants are often the quickest philanthropic win.", es: "Las subvenciones de fundaciones son a menudo la ganancia filantrópica más rápida." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "NACHC: Financial Sustainability Toolkit", url: "https://www.nachc.org/" },
  ],
  totalXP: 40,
};

const module11: MasterclassCourseModule = {
  id: "blue-ocean",
  order: 11,
  title: { en: "The Blue Ocean You're Already In — Why FQHCs Can't Be Replicated", es: "El Océano Azul en el que Ya Está — Por Qué los FQHCs No Pueden Ser Replicados" },
  subtitle: { en: "Section 330 status, PPS rates, 340B access, FTCA coverage — your competitive moat is wider than you think", es: "Estatus Section 330, tarifas PPS, acceso 340B, cobertura FTCA — su foso competitivo es más amplio de lo que cree" },
  description: { en: "FQHCs have structural advantages that no hospital system, urgent care chain, or telehealth startup can replicate. Understanding your moat changes how you compete.", es: "Los FQHCs tienen ventajas estructurales que ningún sistema hospitalario puede replicar. Entender su foso cambia cómo compite." },
  estimatedMinutes: 9,
  icon: "TrendingUp",
  color: "teal",
  category: "economics",
  learningObjectives: [
    { en: "Map your structural advantages: PPS, 340B, FTCA, NHSC, community board governance", es: "Mapee sus ventajas estructurales: PPS, 340B, FTCA, NHSC, gobernanza de junta comunitaria" },
    { en: "Identify competitive threats that CANNOT replicate your advantages", es: "Identifique amenazas competitivas que NO PUEDEN replicar sus ventajas" },
  ],
  conceptContent: [
    {
      heading: { en: "The FQHC Competitive Moat", es: "El Foso Competitivo del FQHC" },
      body: { en: "No other healthcare delivery model combines: enhanced PPS reimbursement rates, 340B drug pricing, FTCA malpractice coverage, NHSC loan repayment eligibility, and community board governance all under one roof. These aren't just programs — they're structural advantages that compound. When a hospital calculates whether to open a competing clinic in your service area, they can't access any of these.", es: "Ningún otro modelo combina: tarifas PPS mejoradas, precios 340B, cobertura FTCA, elegibilidad NHSC, y gobernanza de junta comunitaria bajo un mismo techo. Estas son ventajas estructurales que se componen." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "blue-ocean-quiz",
      questions: [
        {
          question: { en: "Which advantage is unique to FQHCs and cannot be accessed by hospital-owned clinics?", es: "¿Cuál ventaja es exclusiva de los FQHCs y no puede ser accedida por clínicas de hospitales?" },
          options: [
            { text: { en: "All of the above: PPS, 340B, FTCA, NHSC combined", es: "Todas las anteriores: PPS, 340B, FTCA, NHSC combinadas" }, isCorrect: true, explanation: { en: "Correct — the combination is unique to Section 330 grantees.", es: "Correcto — la combinación es exclusiva de los beneficiarios de Section 330." } },
            { text: { en: "Electronic health records", es: "Registros electrónicos de salud" }, isCorrect: false, explanation: { en: "Any provider can use EHRs — that's not an FQHC advantage.", es: "Cualquier proveedor puede usar EHR — eso no es una ventaja FQHC." } },
            { text: { en: "Accepting Medicaid patients", es: "Aceptar pacientes de Medicaid" }, isCorrect: false, explanation: { en: "Many providers accept Medicaid — FQHCs have enhanced PPS rates.", es: "Muchos proveedores aceptan Medicaid — los FQHCs tienen tarifas PPS mejoradas." } },
            { text: { en: "Hiring bilingual staff", es: "Contratar personal bilingüe" }, isCorrect: false, explanation: { en: "Any organization can hire bilingual staff — that's not structural.", es: "Cualquier organización puede contratar personal bilingüe — eso no es estructural." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "blue-ocean-classify",
      instruction: { en: "Which are structural FQHC advantages that competitors can't replicate?", es: "¿Cuáles son ventajas estructurales del FQHC que los competidores no pueden replicar?" },
      items: [
        { text: { en: "Enhanced PPS reimbursement rates", es: "Tarifas de reembolso PPS mejoradas" }, isGood: true, explanation: { en: "Only Section 330 grantees receive PPS rates.", es: "Solo los beneficiarios de Section 330 reciben tarifas PPS." } },
        { text: { en: "340B drug pricing access", es: "Acceso a precios de medicamentos 340B" }, isGood: true, explanation: { en: "A powerful cost advantage for pharmacy operations.", es: "Una poderosa ventaja de costos para operaciones de farmacia." } },
        { text: { en: "Modern facility design", es: "Diseño moderno de instalaciones" }, isGood: false, explanation: { en: "Any organization can build a modern facility — that's not structural.", es: "Cualquier organización puede construir una instalación moderna — eso no es estructural." } },
        { text: { en: "FTCA malpractice coverage", es: "Cobertura de negligencia FTCA" }, isGood: true, explanation: { en: "Eliminates malpractice insurance costs — unique to FQHCs.", es: "Elimina costos de seguro de negligencia — exclusivo de FQHCs." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "KFF: CHC Financing Explained", url: "https://www.kff.org/medicaid/community-health-center-financing-the-role-of-medicaid-and-section-330-grant-funding-explained/" },
  ],
  totalXP: 40,
};

const module12: MasterclassCourseModule = {
  id: "ma-for-mission",
  order: 12,
  title: { en: "M&A for Mission — When to Merge, Acquire, or Be Acquired", es: "F&A por la Misión — Cuándo Fusionarse, Adquirir o Ser Adquirido" },
  subtitle: { en: "60% of CHCs lack sufficient financial resources — consolidation may strengthen the safety net", es: "El 60% de los CHC carecen de recursos financieros suficientes — la consolidación puede fortalecer la red de seguridad" },
  description: { en: "FQHC mergers are increasing as financial pressures mount. Learn when consolidation strengthens mission delivery and when it dilutes it.", es: "Las fusiones de FQHCs están aumentando a medida que las presiones financieras crecen. Aprenda cuándo la consolidación fortalece la misión." },
  estimatedMinutes: 10,
  icon: "TrendingUp",
  color: "teal",
  category: "economics",
  learningObjectives: [
    { en: "Evaluate merger readiness using financial, cultural, and service area criteria", es: "Evalúe la preparación para fusión usando criterios financieros, culturales y de área de servicio" },
    { en: "Distinguish mission-aligned consolidation from mission-diluting acquisitions", es: "Distinga la consolidación alineada con la misión de las adquisiciones que la diluyen" },
  ],
  conceptContent: [
    {
      heading: { en: "When Consolidation Strengthens Mission", es: "Cuándo la Consolidación Fortalece la Misión" },
      body: { en: "FQHCs that merge can share administrative costs, negotiate better MCO contracts, achieve EHR economies of scale, and fill service gaps. But cultural alignment between organizations matters more than financial fit. The best mergers combine complementary strengths — one center's dental program with another's behavioral health expertise.", es: "Los FQHCs que se fusionan pueden compartir costos administrativos, negociar mejores contratos MCO y lograr economías de escala. Pero la alineación cultural importa más que el ajuste financiero." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "ma-quiz",
      questions: [
        {
          question: { en: "What percentage of CHCs report lacking sufficient financial resources?", es: "¿Qué porcentaje de CHC reportan carecer de recursos financieros suficientes?" },
          options: [
            { text: { en: "40%", es: "40%" }, isCorrect: false, explanation: { en: "Higher — the financial pressure is widespread.", es: "Más alto — la presión financiera es generalizada." } },
            { text: { en: "60%", es: "60%" }, isCorrect: true, explanation: { en: "Correct — this drives consolidation as a survival strategy.", es: "Correcto — esto impulsa la consolidación como estrategia de supervivencia." } },
            { text: { en: "25%", es: "25%" }, isCorrect: false, explanation: { en: "The actual figure is 60%.", es: "La cifra real es el 60%." } },
            { text: { en: "80%", es: "80%" }, isCorrect: false, explanation: { en: "Not that high — but 60% is serious enough.", es: "No tan alto — pero el 60% es suficientemente serio." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "ma-classify",
      instruction: { en: "Which factors indicate a mission-aligned merger?", es: "¿Qué factores indican una fusión alineada con la misión?" },
      items: [
        { text: { en: "Complementary service offerings (e.g., dental + behavioral health)", es: "Ofertas de servicios complementarios (ej. dental + salud conductual)" }, isGood: true, explanation: { en: "Complementary strengths create a stronger combined organization.", es: "Las fortalezas complementarias crean una organización combinada más fuerte." } },
        { text: { en: "One center is purely seeking financial bailout", es: "Un centro busca puramente un rescate financiero" }, isGood: false, explanation: { en: "Financial desperation without strategic alignment often leads to failed mergers.", es: "La desesperación financiera sin alineación estratégica a menudo lleva a fusiones fallidas." } },
        { text: { en: "Strong cultural alignment between leadership teams", es: "Fuerte alineación cultural entre equipos de liderazgo" }, isGood: true, explanation: { en: "Cultural fit is the top predictor of merger success.", es: "El ajuste cultural es el predictor principal del éxito de una fusión." } },
        { text: { en: "Adjacent service areas with gap-filling potential", es: "Áreas de servicio adyacentes con potencial de llenar brechas" }, isGood: true, explanation: { en: "Geographic complementarity expands mission reach.", es: "La complementariedad geográfica expande el alcance de la misión." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "Commonwealth Fund: Financial Challenges", url: "https://www.commonwealthfund.org/blog/2024/community-health-centers-are-serving-more-patients-ever-financial-challenges-loom-large" },
  ],
  totalXP: 40,
};

const module13: MasterclassCourseModule = {
  id: "ai-dividend",
  order: 13,
  title: { en: "The AI Dividend — Ambient Documentation as Revenue Recovery", es: "El Dividendo de IA — Documentación Ambiental como Recuperación de Ingresos" },
  subtitle: { en: "AI scribes are giving providers 2 hours back per day — that's 4 more patients at PPS rates", es: "Los escribanos de IA están devolviendo 2 horas por día a los proveedores — eso son 4 pacientes más a tarifas PPS" },
  description: { en: "Ambient clinical documentation AI returns 2 hours per provider per day. At PPS rates, that's $200K+ in annual revenue recovery per provider.", es: "La IA de documentación clínica ambiental devuelve 2 horas por proveedor por día. A tarifas PPS, eso es $200K+ en recuperación de ingresos anual por proveedor." },
  estimatedMinutes: 9,
  icon: "TrendingUp",
  color: "teal",
  category: "economics",
  learningObjectives: [
    { en: "Calculate the ROI of ambient documentation AI at your center", es: "Calcule el ROI de la IA de documentación ambiental en su centro" },
    { en: "Evaluate ambient AI vendors against FQHC-specific requirements", es: "Evalúe proveedores de IA ambiental contra requisitos específicos de FQHC" },
  ],
  conceptContent: [
    {
      heading: { en: "2 Hours Back = Revenue Recovery", es: "2 Horas Devueltas = Recuperación de Ingresos" },
      body: { en: "Providers spend 2+ hours daily on documentation. Ambient AI scribes (like Abridge, Nuance DAX) listen to visits and generate notes automatically. This returns time for 4+ additional patient encounters per day. At $202.65 PPS rate × 4 encounters × 250 days = $200K+ per provider per year. For a 20-provider FQHC, that's $4M+ in potential annual revenue recovery.", es: "Los proveedores pasan 2+ horas diarias en documentación. Los escribanos de IA ambiental escuchan visitas y generan notas automáticamente. Esto devuelve tiempo para 4+ encuentros adicionales por día. A $202.65 tarifa PPS × 4 encuentros × 250 días = $200K+ por proveedor por año." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "ai-quiz",
      questions: [
        {
          question: { en: "How much annual revenue per provider can ambient AI documentation recover at PPS rates?", es: "¿Cuánto ingreso anual por proveedor puede recuperar la documentación de IA ambiental a tarifas PPS?" },
          options: [
            { text: { en: "$50K", es: "$50K" }, isCorrect: false, explanation: { en: "Much higher — 4 extra encounters per day at $202.65 compounds to $200K+.", es: "Mucho más — 4 encuentros extra por día a $202.65 se acumulan a $200K+." } },
            { text: { en: "$200K+", es: "$200K+" }, isCorrect: true, explanation: { en: "Correct — 4 encounters × $202.65 × 250 working days = over $200K per year.", es: "Correcto — 4 encuentros × $202.65 × 250 días laborales = más de $200K por año." } },
            { text: { en: "$100K", es: "$100K" }, isCorrect: false, explanation: { en: "With 4 extra encounters per day at PPS rates, the figure exceeds $200K.", es: "Con 4 encuentros extra por día a tarifas PPS, la cifra excede $200K." } },
            { text: { en: "$500K", es: "$500K" }, isCorrect: false, explanation: { en: "The per-provider figure is about $200K+ annually.", es: "La cifra por proveedor es aproximadamente $200K+ anuales." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "ai-classify",
      instruction: { en: "Which are FQHC-specific requirements for ambient AI documentation?", es: "¿Cuáles son requisitos específicos de FQHC para documentación de IA ambiental?" },
      items: [
        { text: { en: "HIPAA-compliant data handling and BAA agreements", es: "Manejo de datos conforme a HIPAA y acuerdos BAA" }, isGood: true, explanation: { en: "Non-negotiable for any healthcare AI tool.", es: "No negociable para cualquier herramienta de IA en salud." } },
        { text: { en: "Multi-language support for diverse patient populations", es: "Soporte multilingüe para poblaciones diversas" }, isGood: true, explanation: { en: "FQHCs serve linguistically diverse communities — AI must handle this.", es: "Los FQHCs sirven comunidades lingüísticamente diversas — la IA debe manejar esto." } },
        { text: { en: "Lowest possible price regardless of features", es: "El precio más bajo posible sin importar las funciones" }, isGood: false, explanation: { en: "ROI matters more than sticker price — $200K+ recovery justifies investment.", es: "El ROI importa más que el precio — $200K+ de recuperación justifica la inversión." } },
        { text: { en: "EHR integration with your specific system", es: "Integración con su sistema EHR específico" }, isGood: true, explanation: { en: "Seamless EHR integration is essential for adoption.", es: "La integración fluida con el EHR es esencial para la adopción." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "Abridge: Ambient Clinical Documentation", url: "https://www.abridge.com/" },
  ],
  totalXP: 40,
};

const module14: MasterclassCourseModule = {
  id: "ceo-succession",
  order: 14,
  title: { en: "CEO Succession — The 36% Problem", es: "Sucesión del CEO — El Problema del 36%" },
  subtitle: { en: "36% of FQHC CEOs plan to retire within 5 years — most have no succession plan", es: "El 36% de los CEOs de FQHC planean jubilarse en 5 años — la mayoría no tiene plan de sucesión" },
  description: { en: "The FQHC sector faces a CEO succession crisis. Learn to build leadership pipelines that ensure continuity of mission.", es: "El sector FQHC enfrenta una crisis de sucesión de CEO. Aprenda a construir pipelines de liderazgo que aseguren la continuidad de la misión." },
  estimatedMinutes: 9,
  icon: "Users",
  color: "stone",
  category: "leadership",
  learningObjectives: [
    { en: "Assess your organization's succession readiness", es: "Evalúe la preparación de su organización para la sucesión" },
    { en: "Identify and develop internal CEO candidates over a 3-5 year horizon", es: "Identifique y desarrolle candidatos internos para CEO en un horizonte de 3-5 años" },
  ],
  conceptContent: [
    {
      heading: { en: "The Scale of the Problem", es: "La Escala del Problema" },
      body: { en: "NACHC data shows 36% of FQHC CEOs plan to retire within 5 years. Most organizations have no formal succession plan. When a long-tenured CEO leaves without preparation, institutional knowledge walks out the door, board relationships reset, and grant relationships are disrupted. The cost of an unplanned CEO transition can reach 2-3 years of organizational instability.", es: "Los datos de NACHC muestran que el 36% de los CEOs de FQHC planean jubilarse en 5 años. La mayoría de las organizaciones no tienen un plan de sucesión formal. Cuando un CEO de larga trayectoria se va sin preparación, el conocimiento institucional se pierde." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "succession-quiz",
      questions: [
        {
          question: { en: "What percentage of FQHC CEOs plan to retire within 5 years?", es: "¿Qué porcentaje de los CEOs de FQHC planean jubilarse en 5 años?" },
          options: [
            { text: { en: "15%", es: "15%" }, isCorrect: false, explanation: { en: "The actual figure is much higher — 36%.", es: "La cifra real es mucho más alta — 36%." } },
            { text: { en: "36%", es: "36%" }, isCorrect: true, explanation: { en: "Correct — more than a third of FQHC CEOs plan to leave, creating a sector-wide crisis.", es: "Correcto — más de un tercio de los CEOs planean irse, creando una crisis sectorial." } },
            { text: { en: "50%", es: "50%" }, isCorrect: false, explanation: { en: "Not quite that high — 36% is still alarming.", es: "No tan alto — pero el 36% es alarmante." } },
            { text: { en: "25%", es: "25%" }, isCorrect: false, explanation: { en: "Higher — 36% of CEOs plan to retire within 5 years.", es: "Más alto — el 36% planea jubilarse en 5 años." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "succession-classify",
      instruction: { en: "Which are effective CEO succession planning practices?", es: "¿Cuáles son prácticas efectivas de planificación de sucesión de CEO?" },
      items: [
        { text: { en: "Identifying 2-3 internal candidates and creating development plans", es: "Identificar 2-3 candidatos internos y crear planes de desarrollo" }, isGood: true, explanation: { en: "Multiple candidates reduce risk and create healthy development competition.", es: "Múltiples candidatos reducen riesgo y crean competencia saludable de desarrollo." } },
        { text: { en: "Waiting until the CEO announces retirement to start planning", es: "Esperar hasta que el CEO anuncie jubilación para comenzar a planificar" }, isGood: false, explanation: { en: "Succession planning should begin 3-5 years before transition.", es: "La planificación de sucesión debe comenzar 3-5 años antes de la transición." } },
        { text: { en: "Exposing potential successors to board relationships and grant management", es: "Exponer a los posibles sucesores a relaciones con la junta y gestión de subvenciones" }, isGood: true, explanation: { en: "These are CEO-specific skills that take years to develop.", es: "Estas son habilidades específicas del CEO que toman años en desarrollarse." } },
        { text: { en: "Always hiring external candidates for fresh perspective", es: "Siempre contratar candidatos externos para perspectiva fresca" }, isGood: false, explanation: { en: "Internal candidates preserve institutional knowledge and relationships.", es: "Los candidatos internos preservan conocimiento institucional y relaciones." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "NACHC: Workforce & Leadership Data", url: "https://www.nachc.org/" },
  ],
  totalXP: 40,
};

const module15: MasterclassCourseModule = {
  id: "board-effectiveness",
  order: 15,
  title: { en: "The Board You Need vs The Board You Have", es: "La Junta que Necesita vs La Junta que Tiene" },
  subtitle: { en: "51% patient-majority governance is both your superpower and your challenge", es: "La gobernanza con mayoría de pacientes del 51% es tanto su superpoder como su desafío" },
  description: { en: "FQHC boards must be 51%+ patients — this creates unique governance dynamics. Learn to optimize board effectiveness while maintaining community representation.", es: "Las juntas FQHC deben ser 51%+ pacientes — esto crea dinámicas de gobernanza únicas. Aprenda a optimizar la efectividad de la junta mientras mantiene la representación comunitaria." },
  estimatedMinutes: 9,
  icon: "Users",
  color: "stone",
  category: "leadership",
  learningObjectives: [
    { en: "Assess your board's skill gaps against crisis-era requirements", es: "Evalúe las brechas de habilidades de su junta contra los requisitos de la era de crisis" },
    { en: "Build board training programs that respect the patient-majority requirement", es: "Construya programas de capacitación para la junta que respeten el requisito de mayoría de pacientes" },
  ],
  conceptContent: [
    {
      heading: { en: "The 51% Superpower", es: "El Superpoder del 51%" },
      body: { en: "The 51% patient-majority board requirement ensures community voice in governance — but it also means board members may lack healthcare finance, compliance, or strategic planning expertise. The answer isn't changing the requirement (it's federal law and mission-critical). The answer is board development: orientation programs, continuing education, committee structures that pair patient members with subject matter expertise, and clear role definition.", es: "El requisito de mayoría de pacientes del 51% asegura la voz comunitaria en la gobernanza — pero también significa que los miembros pueden carecer de experiencia en finanzas, cumplimiento o planificación estratégica. La respuesta es desarrollo de la junta: orientación, educación continua y estructuras de comités." },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "board-quiz",
      questions: [
        {
          question: { en: "What is the federal requirement for FQHC board patient representation?", es: "¿Cuál es el requisito federal de representación de pacientes en la junta FQHC?" },
          options: [
            { text: { en: "25% minimum", es: "25% mínimo" }, isCorrect: false, explanation: { en: "Much higher — the requirement is 51%+.", es: "Mucho más alto — el requisito es 51%+." } },
            { text: { en: "51% or more", es: "51% o más" }, isCorrect: true, explanation: { en: "Correct — patient-majority governance is a core FQHC requirement.", es: "Correcto — la gobernanza con mayoría de pacientes es un requisito central del FQHC." } },
            { text: { en: "75% or more", es: "75% o más" }, isCorrect: false, explanation: { en: "The requirement is 51%+ — not that high.", es: "El requisito es 51%+ — no tan alto." } },
            { text: { en: "No minimum required", es: "No se requiere mínimo" }, isCorrect: false, explanation: { en: "There is a federal requirement — 51%+ patients.", es: "Hay un requisito federal — 51%+ pacientes." } },
          ],
        },
      ],
      xpReward: 20,
    },
    {
      type: "classifier",
      id: "board-classify",
      instruction: { en: "Which are effective board development strategies for FQHCs?", es: "¿Cuáles son estrategias efectivas de desarrollo de junta para FQHCs?" },
      items: [
        { text: { en: "Pairing patient members with subject matter experts in committees", es: "Emparejar miembros pacientes con expertos en comités" }, isGood: true, explanation: { en: "Knowledge transfer happens best in committee work.", es: "La transferencia de conocimiento ocurre mejor en el trabajo de comités." } },
        { text: { en: "Replacing patient members with finance professionals", es: "Reemplazar miembros pacientes con profesionales de finanzas" }, isGood: false, explanation: { en: "The 51% requirement is federal law and mission-critical — it can't be changed.", es: "El requisito del 51% es ley federal y crítico para la misión — no puede cambiarse." } },
        { text: { en: "Creating a structured board orientation program", es: "Crear un programa estructurado de orientación para la junta" }, isGood: true, explanation: { en: "New members need healthcare finance and compliance basics.", es: "Los nuevos miembros necesitan fundamentos de finanzas y cumplimiento en salud." } },
        { text: { en: "Providing continuing education on healthcare policy changes", es: "Proporcionar educación continua sobre cambios en políticas de salud" }, isGood: true, explanation: { en: "Board members can't govern what they don't understand.", es: "Los miembros de la junta no pueden gobernar lo que no entienden." } },
      ],
      xpReward: 20,
    },
  ],
  sourceMaterials: [
    { label: "HRSA: Health Center Program Governance", url: "https://bphc.hrsa.gov/" },
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Export                                                              */
/* ================================================================== */

export const MASTERCLASS_MODULES_PART1: MasterclassCourseModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
  module11,
  module12,
  module13,
  module14,
  module15,
];
