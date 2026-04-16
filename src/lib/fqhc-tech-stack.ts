// fqhc-tech-stack.ts
// FQHC Technology Stack — vendor comparison across 12 software categories
// Every entry has a primary source URL — no unsourced claims
// Updated via daily-update pipeline (Step 3.10: Tech Stack Scan)

export const TECH_STACK_LAST_UPDATED = "2026-03-20";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type TechCategory =
  | "ehr"
  | "rcm-billing"
  | "hr-payroll"
  | "time-attendance"
  | "workforce-scheduling"
  | "project-management"
  | "communication"
  | "cloud-ai"
  | "cybersecurity"
  | "accounting"
  | "compliance-audit"
  | "patient-engagement";

export type FQHCFit = "high" | "moderate" | "low";
export type PricingModel =
  | "per-user"
  | "per-provider"
  | "per-encounter"
  | "per-device"
  | "flat-rate"
  | "tiered"
  | "custom"
  | "free-tier"
  | "unknown";

export type CriticalityLevel = "mission-critical" | "important" | "operational";

export interface EHRIntegration {
  ehr: string;
  level: "native" | "api" | "partial" | "none";
}

export interface TechVendor {
  id: string;
  name: string;
  tagline: { en: string; es: string };
  category: TechCategory;
  description: { en: string; es: string };
  pricingModel: PricingModel;
  pricingRange: { min: number; max: number; unit: string } | null;
  pricingNote: { en: string; es: string } | null;
  fqhcFit: FQHCFit;
  fqhcFitReason: { en: string; es: string };
  fqhcDiscount: { en: string; es: string } | null;
  fqhcCustomers: string[];
  ehrIntegrations: EHRIntegration[];
  hipaaCompliant: boolean;
  keyFeatures: { en: string; es: string }[];
  limitations: { en: string; es: string }[];
  website: string;
  sourceUrl: string;
  sourceOrg: string;
  lastVerified: string;
  nachcPartner: boolean;
  tags: string[];
}

export interface TechCategoryMeta {
  id: TechCategory;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
  criticalityLevel: CriticalityLevel;
  budgetRange: { en: string; es: string };
  keyConsiderations: { en: string; es: string }[];
}

export interface TechStackProfile {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  orgSize: "small" | "medium" | "large";
  annualBudget: { en: string; es: string };
  stack: { category: TechCategory; vendorId: string; note?: string }[];
}

/* ------------------------------------------------------------------ */
/*  Category Metadata                                                  */
/* ------------------------------------------------------------------ */

export const TECH_CATEGORIES: TechCategoryMeta[] = [
  {
    id: "ehr",
    name: { en: "EHR Systems", es: "Sistemas de Historia Clinica Electronica" },
    description: {
      en: "Electronic Health Record systems are the clinical backbone of every FQHC — managing patient records, billing, UDS reporting, and care coordination.",
      es: "Los sistemas de historia clinica electronica son la columna vertebral clinica de cada FQHC — gestionando registros de pacientes, facturacion, informes UDS y coordinacion de atencion.",
    },
    icon: "Stethoscope",
    criticalityLevel: "mission-critical",
    budgetRange: { en: "30-50% of IT budget", es: "30-50% del presupuesto de TI" },
    keyConsiderations: [
      { en: "UDS reporting capability is non-negotiable for HRSA compliance", es: "La capacidad de informes UDS es innegociable para el cumplimiento de HRSA" },
      { en: "OCHIN consortium model reduces cost for small FQHCs", es: "El modelo de consorcio OCHIN reduce costos para FQHCs pequenos" },
      { en: "EHR choice locks you into an ecosystem — switching costs $1M+", es: "La eleccion de EHR te ata a un ecosistema — el costo de cambio es $1M+" },
      { en: "PPS billing integration is essential for Medi-Cal reimbursement", es: "La integracion de facturacion PPS es esencial para el reembolso de Medi-Cal" },
    ],
  },
  {
    id: "rcm-billing",
    name: { en: "Revenue Cycle & Billing", es: "Ciclo de Ingresos y Facturacion" },
    description: {
      en: "Revenue cycle management tools handle claims submission, denial management, PPS billing, and 340B tracking — protecting the financial lifeline of FQHCs.",
      es: "Las herramientas de gestion del ciclo de ingresos manejan la presentacion de reclamos, gestion de denegaciones, facturacion PPS y seguimiento 340B.",
    },
    icon: "DollarSign",
    criticalityLevel: "mission-critical",
    budgetRange: { en: "10-20% of IT budget", es: "10-20% del presupuesto de TI" },
    keyConsiderations: [
      { en: "PPS-specific billing rules differ from standard fee-for-service", es: "Las reglas de facturacion PPS difieren del servicio estandar" },
      { en: "340B drug pricing compliance requires dedicated tracking", es: "El cumplimiento de precios de medicamentos 340B requiere seguimiento dedicado" },
      { en: "Denial rates above 5% signal RCM tool or process problems", es: "Tasas de denegacion superiores al 5% senalan problemas de herramientas o procesos" },
      { en: "Azara DRVS is the de facto population health standard (50% of US FQHCs)", es: "Azara DRVS es el estandar de salud poblacional de facto (50% de FQHCs de EE.UU.)" },
    ],
  },
  {
    id: "hr-payroll",
    name: { en: "HR & Payroll", es: "Recursos Humanos y Nomina" },
    description: {
      en: "HR and payroll platforms manage hiring, benefits, credentialing, payroll across multiple sites, and SB 525 minimum wage compliance for California FQHCs.",
      es: "Las plataformas de RRHH y nomina gestionan contratacion, beneficios, acreditacion, nomina en multiples sitios y cumplimiento del salario minimo SB 525.",
    },
    icon: "Users",
    criticalityLevel: "mission-critical",
    budgetRange: { en: "5-10% of IT budget", es: "5-10% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Multi-site payroll is critical — FQHCs average 5-15 locations", es: "La nomina multi-sitio es critica — los FQHCs promedian 5-15 ubicaciones" },
      { en: "SB 525 requires tracking healthcare-specific minimum wage tiers", es: "SB 525 requiere rastrear niveles de salario minimo especificos de salud" },
      { en: "Provider credentialing and license expiry tracking prevents compliance gaps", es: "La acreditacion de proveedores y el seguimiento de licencias previene brechas de cumplimiento" },
      { en: "Union payroll rules add complexity (SEIU, NUHW locals)", es: "Las reglas de nomina sindical agregan complejidad (SEIU, locales de NUHW)" },
    ],
  },
  {
    id: "time-attendance",
    name: { en: "Time & Attendance", es: "Tiempo y Asistencia" },
    description: {
      en: "Time tracking and attendance systems ensure accurate payroll, overtime compliance, break tracking for union contracts, and staffing visibility across shifts.",
      es: "Los sistemas de tiempo y asistencia aseguran nomina precisa, cumplimiento de horas extra, seguimiento de descansos y visibilidad de personal.",
    },
    icon: "Clock",
    criticalityLevel: "important",
    budgetRange: { en: "2-5% of IT budget", es: "2-5% del presupuesto de TI" },
    keyConsiderations: [
      { en: "CA meal/rest break compliance is heavily enforced — fines up to $100/day/employee", es: "El cumplimiento de descansos en CA se aplica estrictamente — multas hasta $100/dia/empleado" },
      { en: "Union contract rules require specific break and overtime tracking", es: "Las reglas de contratos sindicales requieren seguimiento especifico de descansos y horas extra" },
      { en: "Geofencing prevents buddy punching across multiple clinic sites", es: "El geofencing previene el fichaje por companeros en multiples clinicas" },
    ],
  },
  {
    id: "workforce-scheduling",
    name: { en: "Workforce Scheduling", es: "Programacion de Personal" },
    description: {
      en: "Provider and staff scheduling tools manage clinical shifts, on-call rotations, float pools, and patient demand forecasting.",
      es: "Herramientas de programacion de proveedores y personal gestionan turnos clinicos, rotaciones de guardia y pronostico de demanda.",
    },
    icon: "CalendarClock",
    criticalityLevel: "important",
    budgetRange: { en: "2-4% of IT budget", es: "2-4% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Provider scheduling must account for scope-of-practice rules (NP/PA supervision)", es: "La programacion de proveedores debe considerar reglas de alcance de practica" },
      { en: "Float pool management reduces reliance on expensive locum tenens", es: "La gestion de pool flotante reduce la dependencia de locum tenens costosos" },
      { en: "Patient demand forecasting helps match staffing to visit volume", es: "El pronostico de demanda de pacientes ayuda a ajustar el personal al volumen de visitas" },
    ],
  },
  {
    id: "project-management",
    name: { en: "Project Management", es: "Gestion de Proyectos" },
    description: {
      en: "Project management tools track grant deliverables, quality improvement initiatives, PCMH workflows, and cross-departmental projects.",
      es: "Herramientas de gestion de proyectos rastrean entregables de subvenciones, iniciativas de mejora de calidad y flujos de trabajo PCMH.",
    },
    icon: "KanbanSquare",
    criticalityLevel: "operational",
    budgetRange: { en: "1-3% of IT budget", es: "1-3% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Grant tracking requires deadline management and reporting templates", es: "El seguimiento de subvenciones requiere gestion de plazos y plantillas de informes" },
      { en: "Non-technical staff need intuitive interfaces — avoid developer-oriented tools", es: "El personal no tecnico necesita interfaces intuitivas — evita herramientas orientadas a desarrolladores" },
      { en: "Nonprofit pricing available from most major PM vendors", es: "Precios para organizaciones sin fines de lucro disponibles en la mayoria de proveedores" },
    ],
  },
  {
    id: "communication",
    name: { en: "Communication & Collaboration", es: "Comunicacion y Colaboracion" },
    description: {
      en: "HIPAA-compliant messaging, video conferencing, and collaboration platforms for clinical teams, telehealth, and multi-site coordination.",
      es: "Mensajeria compatible con HIPAA, videoconferencia y plataformas de colaboracion para equipos clinicos, telesalud y coordinacion multi-sitio.",
    },
    icon: "MessageSquare",
    criticalityLevel: "important",
    budgetRange: { en: "3-8% of IT budget", es: "3-8% del presupuesto de TI" },
    keyConsiderations: [
      { en: "HIPAA BAA is mandatory — not all plans include it by default", es: "El BAA de HIPAA es obligatorio — no todos los planes lo incluyen por defecto" },
      { en: "Telehealth integration reduces need for separate video platform", es: "La integracion de telesalud reduce la necesidad de una plataforma de video separada" },
      { en: "Microsoft ecosystem dominates healthcare — Teams often included with M365", es: "El ecosistema Microsoft domina la salud — Teams a menudo incluido con M365" },
    ],
  },
  {
    id: "cloud-ai",
    name: { en: "Cloud & AI Platforms", es: "Plataformas de Nube e IA" },
    description: {
      en: "Cloud infrastructure and AI platforms powering analytics, ambient documentation, population health insights, and operational automation.",
      es: "Infraestructura en la nube y plataformas de IA que impulsan analitica, documentacion ambiental, informacion de salud poblacional y automatizacion operativa.",
    },
    icon: "Cloud",
    criticalityLevel: "important",
    budgetRange: { en: "5-15% of IT budget", es: "5-15% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Azure offers automatic HIPAA BAA + nonprofit credits ($3,500/yr)", es: "Azure ofrece BAA HIPAA automatico + creditos para sin fines de lucro ($3,500/ano)" },
      { en: "Google Cloud nonprofit programs may exclude healthcare orgs — verify eligibility", es: "Los programas sin fines de lucro de Google Cloud pueden excluir organizaciones de salud — verificar elegibilidad" },
      { en: "AI tools must integrate with your EHR to deliver clinical value", es: "Las herramientas de IA deben integrarse con su EHR para entregar valor clinico" },
      { en: "AWS IMAGINE Grant provides up to $300K for qualifying nonprofits", es: "AWS IMAGINE Grant proporciona hasta $300K para organizaciones sin fines de lucro calificadas" },
    ],
  },
  {
    id: "cybersecurity",
    name: { en: "Cybersecurity", es: "Ciberseguridad" },
    description: {
      en: "Endpoint protection, threat detection, security awareness training, and HIPAA compliance tools to defend against ransomware and data breaches.",
      es: "Proteccion de endpoints, deteccion de amenazas, capacitacion en seguridad y herramientas de cumplimiento HIPAA para defenderse contra ransomware.",
    },
    icon: "Shield",
    criticalityLevel: "mission-critical",
    budgetRange: { en: "5-10% of IT budget", es: "5-10% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Healthcare is the #1 target for ransomware — 133M records breached in 2023", es: "La salud es el objetivo #1 de ransomware — 133M registros violados en 2023" },
      { en: "CISA offers free vulnerability scanning and tabletop exercises", es: "CISA ofrece escaneo de vulnerabilidades y ejercicios de simulacion gratuitos" },
      { en: "HHS Cybersecurity Performance Goals (CPGs) set the minimum bar", es: "Los Objetivos de Rendimiento de Ciberseguridad de HHS establecen el estandar minimo" },
      { en: "TriZetto breach (3.4M records, 2025) shows third-party vendor risk", es: "La violacion de TriZetto (3.4M registros, 2025) muestra el riesgo de proveedores terceros" },
    ],
  },
  {
    id: "accounting",
    name: { en: "Accounting & Finance", es: "Contabilidad y Finanzas" },
    description: {
      en: "Fund accounting, grant tracking, 340B revenue management, and financial reporting for FQHC multi-source funding models.",
      es: "Contabilidad de fondos, seguimiento de subvenciones, gestion de ingresos 340B e informes financieros para modelos de financiacion de FQHCs.",
    },
    icon: "Calculator",
    criticalityLevel: "mission-critical",
    budgetRange: { en: "3-8% of IT budget", es: "3-8% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Fund accounting is required — standard accounting software can't track grant restrictions", es: "La contabilidad de fondos es requerida — el software estandar no puede rastrear restricciones de subvenciones" },
      { en: "HRSA grant tracking requires separate cost centers and reporting", es: "El seguimiento de subvenciones HRSA requiere centros de costos y reportes separados" },
      { en: "340B savings must be tracked and reported for compliance", es: "Los ahorros 340B deben ser rastreados y reportados para cumplimiento" },
    ],
  },
  {
    id: "compliance-audit",
    name: { en: "Compliance & Audit", es: "Cumplimiento y Auditoria" },
    description: {
      en: "HIPAA compliance management, HRSA Operational Site Visit (OSV) preparation, staff credentialing, and required training tracking.",
      es: "Gestion de cumplimiento HIPAA, preparacion para Visitas de Sitio Operacional (OSV) de HRSA, acreditacion de personal y seguimiento de capacitacion.",
    },
    icon: "ClipboardCheck",
    criticalityLevel: "important",
    budgetRange: { en: "2-5% of IT budget", es: "2-5% del presupuesto de TI" },
    keyConsiderations: [
      { en: "HRSA OSV prep tools can save weeks of manual preparation", es: "Las herramientas de preparacion OSV de HRSA pueden ahorrar semanas de preparacion manual" },
      { en: "All-in-one platforms (MedTrainer, Compliancy Group) reduce vendor sprawl", es: "Plataformas todo-en-uno (MedTrainer, Compliancy Group) reducen la dispersion de proveedores" },
      { en: "Provider credentialing must track license expirations across states", es: "La acreditacion de proveedores debe rastrear vencimientos de licencias entre estados" },
    ],
  },
  {
    id: "patient-engagement",
    name: { en: "Patient Engagement", es: "Participacion del Paciente" },
    description: {
      en: "Digital intake, appointment reminders, patient portals, multilingual messaging, and care gap outreach for diverse FQHC populations.",
      es: "Admision digital, recordatorios de citas, portales de pacientes, mensajeria multilingue y alcance de brechas de atencion para poblaciones diversas de FQHCs.",
    },
    icon: "Heart",
    criticalityLevel: "important",
    budgetRange: { en: "3-7% of IT budget", es: "3-7% del presupuesto de TI" },
    keyConsiderations: [
      { en: "Multilingual support is essential — CA FQHCs serve 60%+ Spanish-speaking patients", es: "El soporte multilingue es esencial — los FQHCs de CA atienden 60%+ pacientes hispanohablantes" },
      { en: "SMS-based tools (CareMessage) work best for patients without smartphones", es: "Herramientas basadas en SMS (CareMessage) funcionan mejor para pacientes sin smartphones" },
      { en: "No-show reduction directly impacts PPS revenue per encounter", es: "La reduccion de ausencias impacta directamente los ingresos PPS por encuentro" },
      { en: "SDOH screening integration helps meet UDS and HEDIS requirements", es: "La integracion de evaluacion SDOH ayuda a cumplir requisitos UDS y HEDIS" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Vendors                                                            */
/* ------------------------------------------------------------------ */

export const TECH_VENDORS: TechVendor[] = [
  // ─── EHR Systems ─────────────────────────────────────────────────
  {
    id: "ochin-epic",
    name: "Epic (via OCHIN)",
    tagline: {
      en: "Community-owned Epic access through the nation's largest health center network",
      es: "Acceso a Epic a traves de la red de centros de salud mas grande del pais",
    },
    category: "ehr",
    description: {
      en: "OCHIN is a nonprofit health IT organization that provides Epic EHR access to 600+ community health centers through a shared, hosted model. FQHCs get enterprise-grade Epic without the $50M+ implementation cost. OCHIN handles hosting, updates, and compliance. Over 50% of California FQHCs use OCHIN Epic.",
      es: "OCHIN es una organizacion sin fines de lucro de TI en salud que proporciona acceso a Epic EHR a mas de 600 centros de salud comunitarios a traves de un modelo compartido y alojado.",
    },
    pricingModel: "per-provider",
    pricingRange: null,
    pricingNote: {
      en: "Consortium pricing — significantly below direct Epic licensing. Per-provider monthly fee includes hosting, upgrades, and support.",
      es: "Precios de consorcio — significativamente por debajo de la licencia directa de Epic. Tarifa mensual por proveedor incluye alojamiento, actualizaciones y soporte.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Built specifically for community health — UDS reporting, PPS billing, sliding fee scale, and 340B tracking are native features. 600+ CHC customers.",
      es: "Construido especificamente para salud comunitaria — informes UDS, facturacion PPS, escala de tarifas deslizantes y seguimiento 340B son funciones nativas.",
    },
    fqhcDiscount: {
      en: "Consortium model provides enterprise Epic at a fraction of direct cost. OCHIN membership required.",
      es: "El modelo de consorcio proporciona Epic empresarial a una fraccion del costo directo. Se requiere membresia OCHIN.",
    },
    fqhcCustomers: ["AltaMed", "Family HealthCare Network", "MCHC Health Centers", "Santa Cruz County HSA", "OLE Health"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Full Epic EHR with community health workflows", es: "Epic EHR completo con flujos de trabajo de salud comunitaria" },
      { en: "Built-in UDS reporting and HRSA compliance tools", es: "Informes UDS integrados y herramientas de cumplimiento HRSA" },
      { en: "PPS and sliding fee scale billing native", es: "Facturacion PPS y escala de tarifas deslizantes nativa" },
      { en: "MyChart patient portal included", es: "Portal de pacientes MyChart incluido" },
      { en: "Epic Community Connect interoperability", es: "Interoperabilidad Epic Community Connect" },
    ],
    limitations: [
      { en: "Locked into OCHIN's implementation timeline and configuration choices", es: "Atado al cronograma de implementacion y configuraciones de OCHIN" },
      { en: "Less customization flexibility than direct Epic deployment", es: "Menos flexibilidad de personalizacion que la implementacion directa de Epic" },
    ],
    website: "https://ochin.org",
    sourceUrl: "https://ochin.org/epic-ehr",
    sourceOrg: "OCHIN",
    lastVerified: "2026-03-20",
    nachcPartner: true,
    tags: ["ehr", "community-health", "consortium", "epic"],
  },
  {
    id: "eclinicalworks",
    name: "eClinicalWorks",
    tagline: {
      en: "Cloud-based EHR with NACHC Select bundled pricing for community health",
      es: "EHR en la nube con precios agrupados NACHC Select para salud comunitaria",
    },
    category: "ehr",
    description: {
      en: "eClinicalWorks is a cloud-based EHR serving 150,000+ physicians. Their NACHC Select program offers discounted bundled pricing for NACHC member health centers, including the Sunoh.ai ambient scribe. Growing FQHC market share with AI integration.",
      es: "eClinicalWorks es un EHR en la nube que sirve a mas de 150,000 medicos. Su programa NACHC Select ofrece precios agrupados con descuento para centros de salud miembros de NACHC.",
    },
    pricingModel: "per-provider",
    pricingRange: { min: 449, max: 599, unit: "/provider/month" },
    pricingNote: {
      en: "NACHC Select bundled pricing includes EHR + healow patient engagement + Sunoh.ai scribe. List price $449-599/provider/month.",
      es: "Precios agrupados NACHC Select incluyen EHR + participacion de pacientes healow + escriba Sunoh.ai.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "NACHC Select partnership provides FQHC-specific pricing and bundled AI tools. Strong UDS reporting. Sunoh.ai scribe included.",
      es: "La asociacion NACHC Select proporciona precios especificos para FQHCs y herramientas de IA agrupadas. Informes UDS solidos.",
    },
    fqhcDiscount: {
      en: "NACHC Select: Discounted bundled pricing for NACHC member CHCs — includes Sunoh.ai ambient AI scribe at no additional cost.",
      es: "NACHC Select: Precios agrupados con descuento para CHCs miembros de NACHC — incluye escriba de IA ambiental Sunoh.ai sin costo adicional.",
    },
    fqhcCustomers: ["Imperial Beach Community Clinic", "Sun River Health", "AltaMed", "Sacramento Native American Health Center", "Hyndman Area Health Center (PA)", "Southeast Alabama Rural Health Associates"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Cloud-based with 99.9% uptime SLA", es: "Basado en la nube con SLA de 99.9% de tiempo de actividad" },
      { en: "NACHC Select bundled pricing", es: "Precios agrupados NACHC Select" },
      { en: "Sunoh.ai ambient AI scribe: 15% provider efficiency gain, 1+ hr/day saved (SE Alabama FQHC 2026)", es: "Escriba de IA ambiental Sunoh.ai: 15% de ganancia en eficiencia del proveedor" },
      { en: "healow AI no-show prediction: drives no-show rate to 8–9% vs. 20%+ national FQHC average", es: "Prediccion de ausencias healow AI: reduce la tasa a 8–9% vs. promedio nacional de 20%+" },
      { en: "healow Image AI: processes 4,000+ fax pages/month for automated workflows", es: "healow Image AI: procesa mas de 4,000 paginas de fax/mes para flujos de trabajo automatizados" },
      { en: "healow patient engagement suite included", es: "Suite de participacion de pacientes healow incluida" },
    ],
    limitations: [
      { en: "2023 ONC penalty for data blocking ($155M settlement) — monitor compliance improvements", es: "Penalizacion ONC 2023 por bloqueo de datos ($155M) — monitorear mejoras de cumplimiento" },
      { en: "Interface can feel dated compared to modern EHRs", es: "La interfaz puede sentirse anticuada comparada con EHRs modernos" },
    ],
    website: "https://www.eclinicalworks.com",
    sourceUrl: "https://www.eclinicalworks.com/community-health-centers/",
    sourceOrg: "eClinicalWorks",
    lastVerified: "2026-04-16",
    nachcPartner: true,
    tags: ["ehr", "cloud", "nachc-select", "ai-scribe"],
  },
  {
    id: "nextgen-healthcare",
    name: "NextGen Healthcare",
    tagline: {
      en: "Purpose-built ambulatory EHR with strong FQHC and rural health focus",
      es: "EHR ambulatorio disenado con enfoque en FQHCs y salud rural",
    },
    category: "ehr",
    description: {
      en: "NextGen Healthcare serves community health centers with an EHR designed for ambulatory care, including FQHC-specific workflows for UDS reporting, sliding fee, and behavioral health integration. Used by many mid-size FQHCs.",
      es: "NextGen Healthcare sirve a centros de salud comunitarios con un EHR disenado para atencion ambulatoria, incluyendo flujos de trabajo especificos de FQHC.",
    },
    pricingModel: "per-provider",
    pricingRange: { min: 300, max: 500, unit: "/provider/month" },
    pricingNote: {
      en: "Pricing varies by modules selected. Ambulatory EHR + Practice Management typically $300-500/provider/month.",
      es: "El precio varia segun los modulos seleccionados. EHR ambulatorio + gestion de practicas tipicamente $300-500/proveedor/mes.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Strong FQHC workflows including UDS, sliding fee, BH integration. Waystar RCM partnership. Growing ambient AI features via partnership with Abridge.",
      es: "Flujos de trabajo solidos de FQHC incluyendo UDS, tarifa deslizante, integracion BH. Asociacion RCM con Waystar.",
    },
    fqhcDiscount: null,
    fqhcCustomers: ["Valley Health Team", "Neighborhood Healthcare"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "FQHC-specific UDS reporting and sliding fee workflows", es: "Informes UDS y flujos de tarifa deslizante especificos de FQHC" },
      { en: "Behavioral health integration module", es: "Modulo de integracion de salud conductual" },
      { en: "Waystar revenue cycle management partnership", es: "Asociacion de gestion del ciclo de ingresos con Waystar" },
      { en: "NextGen Ambient Assist (AI documentation)", es: "NextGen Ambient Assist (documentacion con IA)" },
    ],
    limitations: [
      { en: "Smaller app marketplace compared to Epic", es: "Mercado de aplicaciones mas pequeno comparado con Epic" },
      { en: "Implementation can take 6-12 months", es: "La implementacion puede tomar 6-12 meses" },
    ],
    website: "https://www.nextgen.com",
    sourceUrl: "https://www.nextgen.com/solutions/specialties/federally-qualified-health-centers",
    sourceOrg: "NextGen Healthcare",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["ehr", "ambulatory", "fqhc-workflows"],
  },
  {
    id: "athenahealth",
    name: "athenahealth",
    tagline: {
      en: "Cloud-native EHR with industry-leading claim resolution rates",
      es: "EHR nativo en la nube con tasas lideres de resolucion de reclamos",
    },
    category: "ehr",
    description: {
      en: "athenahealth offers a cloud-native EHR and practice management platform known for strong revenue cycle performance. Their athenaOne platform handles clinical, financial, and patient engagement workflows. Used by some California FQHCs.",
      es: "athenahealth ofrece un EHR nativo en la nube y plataforma de gestion de practicas conocida por su solido rendimiento en ciclo de ingresos.",
    },
    pricingModel: "per-encounter",
    pricingRange: null,
    pricingNote: {
      en: "Revenue-based pricing model — percentage of collections rather than flat monthly fee. Aligns vendor incentive with FQHC revenue.",
      es: "Modelo de precios basado en ingresos — porcentaje de cobros en lugar de tarifa mensual fija.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Strong RCM performance and cloud-native architecture. Less FQHC-specific than OCHIN Epic or eClinicalWorks. Revenue-based pricing can be expensive for high-volume FQHCs.",
      es: "Solido rendimiento RCM y arquitectura nativa en la nube. Menos especifico para FQHCs que OCHIN Epic o eClinicalWorks.",
    },
    fqhcDiscount: null,
    fqhcCustomers: ["West County Health Centers"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Cloud-native — no on-premise servers needed", es: "Nativo en la nube — no se necesitan servidores locales" },
      { en: "Industry-leading first-pass claim resolution rate (96%+)", es: "Tasa lider de resolucion de reclamos en primer paso (96%+)" },
      { en: "Integrated patient portal and telehealth", es: "Portal de pacientes y telesalud integrados" },
      { en: "athenaNet network intelligence benchmarking", es: "Inteligencia de benchmarking de red athenaNet" },
    ],
    limitations: [
      { en: "Revenue-based pricing can be costly for high-volume FQHCs", es: "Los precios basados en ingresos pueden ser costosos para FQHCs de alto volumen" },
      { en: "UDS reporting less mature than OCHIN/eCW FQHC-specific tools", es: "Informes UDS menos maduros que herramientas especificas de FQHC de OCHIN/eCW" },
    ],
    website: "https://www.athenahealth.com",
    sourceUrl: "https://www.athenahealth.com/solutions/community-health",
    sourceOrg: "athenahealth",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["ehr", "cloud-native", "rcm"],
  },
  // ─── Revenue Cycle & Billing ─────────────────────────────────────
  {
    id: "azara-drvs",
    name: "Azara Healthcare (DRVS)",
    tagline: {
      en: "Population health analytics powering 50% of all US FQHCs",
      es: "Analitica de salud poblacional que impulsa el 50% de todos los FQHCs de EE.UU.",
    },
    category: "rcm-billing",
    description: {
      en: "Azara DRVS is the de facto standard for FQHC population health analytics and quality reporting. Used by 1,000+ community health centers managing data for 25 million Americans. Unifies clinical, claims, and SDOH data. Built-in UDS+ reporting with 600+ measures. 2023-2024 Best in KLAS for Population Health.",
      es: "Azara DRVS es el estandar de facto para analitica de salud poblacional y reportes de calidad de FQHCs. Usado por mas de 1,000 centros de salud comunitarios.",
    },
    pricingModel: "custom",
    pricingRange: null,
    pricingNote: {
      en: "Custom pricing based on organization size and modules. Contact Azara for quote. Deployed through PCAs and HCCNs.",
      es: "Precios personalizados segun tamano de organizacion y modulos. Implementado a traves de PCAs y HCCNs.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Built exclusively for safety-net providers. 50% of all US FQHCs. Best in KLAS 2023-2024. UDS+ reporting, care gap identification, value-based care analytics.",
      es: "Construido exclusivamente para proveedores de red de seguridad. 50% de todos los FQHCs de EE.UU. Best in KLAS 2023-2024.",
    },
    fqhcDiscount: {
      en: "Deployed through Primary Care Associations (PCAs) and Health Center Controlled Networks (HCCNs) — consortium pricing available.",
      es: "Implementado a traves de Asociaciones de Atencion Primaria (PCAs) y Redes Controladas de Centros de Salud (HCCNs).",
    },
    fqhcCustomers: ["Honor Community Health (MI)", "600+ clients across 42 states"],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "native" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "NextGen", level: "api" },
      { ehr: "athenahealth", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Built-in UDS+ reporting with 600+ quality measures", es: "Informes UDS+ integrados con mas de 600 medidas de calidad" },
      { en: "Care gap identification and automated outreach", es: "Identificacion de brechas de atencion y alcance automatizado" },
      { en: "Value-based care analytics for APM readiness", es: "Analitica de atencion basada en valor para preparacion APM" },
      { en: "Multi-level drill-down from network to patient detail", es: "Desglose multi-nivel desde la red hasta detalle del paciente" },
    ],
    limitations: [
      { en: "Not a billing/claims tool — complements RCM, doesn't replace it", es: "No es una herramienta de facturacion/reclamos — complementa RCM, no lo reemplaza" },
      { en: "Implementation takes several weeks to months", es: "La implementacion toma varias semanas a meses" },
    ],
    website: "https://www.azarahealthcare.com",
    sourceUrl: "https://www.azarahealthcare.com/solutions/drvs",
    sourceOrg: "Azara Healthcare",
    lastVerified: "2026-03-20",
    nachcPartner: true,
    tags: ["population-health", "analytics", "uds", "quality"],
  },
  {
    id: "waystar",
    name: "Waystar",
    tagline: {
      en: "End-to-end revenue cycle platform with AI-powered denial management",
      es: "Plataforma de ciclo de ingresos de extremo a extremo con gestion de denegaciones impulsada por IA",
    },
    category: "rcm-billing",
    description: {
      en: "Waystar provides cloud-based revenue cycle technology for healthcare organizations. NextGen Healthcare's official RCM partner. AltitudeAI engine for predictive denial management. Custom pricing per organization.",
      es: "Waystar proporciona tecnologia de ciclo de ingresos basada en la nube para organizaciones de salud. Socio oficial de RCM de NextGen Healthcare.",
    },
    pricingModel: "custom",
    pricingRange: null,
    pricingNote: {
      en: "Custom pricing based on claim volume and modules selected. Contact for quote.",
      es: "Precios personalizados basados en volumen de reclamos y modulos seleccionados.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Strong general-purpose RCM but not FQHC-specific. Best paired with NextGen EHR. AltitudeAI helps reduce denials.",
      es: "RCM de proposito general solido pero no especifico para FQHCs. Mejor combinado con NextGen EHR.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [
      { ehr: "NextGen", level: "native" },
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "athenahealth", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "AltitudeAI predictive denial management", es: "Gestion predictiva de denegaciones AltitudeAI" },
      { en: "Native NextGen Healthcare integration", es: "Integracion nativa con NextGen Healthcare" },
      { en: "Automated claim status tracking and reporting", es: "Seguimiento automatizado de estado de reclamos y reportes" },
    ],
    limitations: [
      { en: "Custom pricing makes cost comparison difficult", es: "Los precios personalizados dificultan la comparacion de costos" },
      { en: "Not FQHC-specific — may need PPS billing configuration", es: "No especifico para FQHCs — puede necesitar configuracion de facturacion PPS" },
    ],
    website: "https://www.waystar.com",
    sourceUrl: "https://www.waystar.com/our-platform/",
    sourceOrg: "Waystar",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["rcm", "claims", "ai", "denial-management"],
  },
  // ─── HR & Payroll ────────────────────────────────────────────────
  {
    id: "adp-workforce-now",
    name: "ADP Workforce Now",
    tagline: {
      en: "Enterprise HR and payroll platform dominant in healthcare",
      es: "Plataforma empresarial de RRHH y nomina dominante en salud",
    },
    category: "hr-payroll",
    description: {
      en: "ADP is the largest payroll provider in the US, serving 1M+ clients. ADP Workforce Now is their mid-market platform (50-999 employees) with HR, payroll, benefits, time, and talent modules. Strong healthcare vertical with compliance features for multi-state licensure tracking.",
      es: "ADP es el mayor proveedor de nomina de EE.UU., sirviendo a mas de 1M de clientes. ADP Workforce Now es su plataforma de mercado medio (50-999 empleados).",
    },
    pricingModel: "per-user",
    pricingRange: { min: 12, max: 30, unit: "/employee/month" },
    pricingNote: {
      en: "Base payroll ~$12/employee/month. Full suite (HR + Benefits + Time + Talent) ~$25-30/employee/month. Volume discounts available.",
      es: "Nomina base ~$12/empleado/mes. Suite completa (RRHH + Beneficios + Tiempo + Talento) ~$25-30/empleado/mes.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Dominant in healthcare payroll. Handles multi-site, multi-state complexity. Strong compliance (ACA, SB 525). Integrates with major time and EHR systems.",
      es: "Dominante en nomina de salud. Maneja complejidad multi-sitio y multi-estado. Fuerte cumplimiento (ACA, SB 525).",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Multi-site payroll processing with location-specific rules", es: "Procesamiento de nomina multi-sitio con reglas especificas por ubicacion" },
      { en: "ACA compliance tracking and reporting", es: "Seguimiento y reportes de cumplimiento ACA" },
      { en: "Integrated benefits administration", es: "Administracion de beneficios integrada" },
      { en: "Healthcare-specific compliance library", es: "Biblioteca de cumplimiento especifica de salud" },
    ],
    limitations: [
      { en: "Can be complex to configure — dedicated implementation specialist recommended", es: "Puede ser complejo de configurar — se recomienda especialista de implementacion dedicado" },
      { en: "Add-on modules increase cost significantly", es: "Los modulos adicionales aumentan significativamente el costo" },
    ],
    website: "https://www.adp.com",
    sourceUrl: "https://www.adp.com/what-we-offer/products/adp-workforce-now.aspx",
    sourceOrg: "ADP",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["hr", "payroll", "benefits", "healthcare"],
  },
  {
    id: "rippling",
    name: "Rippling",
    tagline: {
      en: "Modern all-in-one HR platform with device management and IT automation",
      es: "Plataforma moderna todo-en-uno de RRHH con gestion de dispositivos y automatizacion de TI",
    },
    category: "hr-payroll",
    description: {
      en: "Rippling combines HR, IT, and finance in one platform. Handles payroll, benefits, device management, app provisioning, and compliance. Growing in healthcare with automated license tracking and multi-location support.",
      es: "Rippling combina RRHH, TI y finanzas en una plataforma. Maneja nomina, beneficios, gestion de dispositivos, aprovisionamiento de aplicaciones y cumplimiento.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 8, max: 35, unit: "/employee/month" },
    pricingNote: {
      en: "Core platform starts at $8/employee/month. Full suite with IT, device management, and benefits ~$25-35/employee/month.",
      es: "Plataforma base desde $8/empleado/mes. Suite completa con TI, gestion de dispositivos y beneficios ~$25-35/empleado/mes.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Modern UX and IT automation are appealing, but less healthcare-specific than ADP. Device management is a unique differentiator for FQHCs managing clinic hardware.",
      es: "UX moderna y automatizacion de TI son atractivos, pero menos especifico de salud que ADP. La gestion de dispositivos es un diferenciador unico.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Unified HR + IT + Finance platform", es: "Plataforma unificada de RRHH + TI + Finanzas" },
      { en: "Automated device management and app provisioning", es: "Gestion automatizada de dispositivos y aprovisionamiento de aplicaciones" },
      { en: "License and certification tracking with expiry alerts", es: "Seguimiento de licencias y certificaciones con alertas de vencimiento" },
      { en: "Multi-location payroll with state-specific compliance", es: "Nomina multi-ubicacion con cumplimiento especifico por estado" },
    ],
    limitations: [
      { en: "Newer to healthcare — less industry-specific compliance than ADP", es: "Mas nuevo en salud — menos cumplimiento especifico de la industria que ADP" },
      { en: "Full suite pricing can rival ADP for larger organizations", es: "El precio de la suite completa puede rivalizar con ADP para organizaciones mas grandes" },
    ],
    website: "https://www.rippling.com",
    sourceUrl: "https://www.rippling.com/hr",
    sourceOrg: "Rippling",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["hr", "payroll", "it-management", "modern"],
  },
  // ─── Time & Attendance ───────────────────────────────────────────
  {
    id: "ukg-workforce",
    name: "UKG (Kronos)",
    tagline: {
      en: "Healthcare workforce management standard — time, scheduling, and compliance",
      es: "Estandar de gestion de personal de salud — tiempo, programacion y cumplimiento",
    },
    category: "time-attendance",
    description: {
      en: "UKG (formerly Kronos + Ultimate Software) is the dominant workforce management platform in healthcare. Handles time tracking, scheduling, absence management, and labor compliance. Deep union payroll rule support.",
      es: "UKG (anteriormente Kronos + Ultimate Software) es la plataforma dominante de gestion de personal en salud.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 6, max: 15, unit: "/employee/month" },
    pricingNote: {
      en: "Time and attendance ~$6-8/employee/month. Full workforce management suite ~$12-15/employee/month. Volume discounts for 200+ employees.",
      es: "Tiempo y asistencia ~$6-8/empleado/mes. Suite completa de gestion de personal ~$12-15/empleado/mes.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Healthcare workforce management standard. Union rule compliance, CA meal/rest break tracking, multi-site scheduling. Used by hospitals and health systems nationwide.",
      es: "Estandar de gestion de personal de salud. Cumplimiento de reglas sindicales, seguimiento de descansos de CA, programacion multi-sitio.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "CA meal/rest break compliance tracking", es: "Seguimiento de cumplimiento de descansos de CA" },
      { en: "Union contract rule automation", es: "Automatizacion de reglas de contratos sindicales" },
      { en: "Multi-site time tracking with geofencing", es: "Seguimiento de tiempo multi-sitio con geofencing" },
      { en: "Overtime and premium pay calculations", es: "Calculos de horas extra y pago premium" },
    ],
    limitations: [
      { en: "Enterprise-oriented — may be over-featured for small FQHCs (<50 staff)", es: "Orientado a empresas — puede tener demasiadas funciones para FQHCs pequenos (<50 personal)" },
      { en: "Implementation and configuration can be complex", es: "La implementacion y configuracion pueden ser complejas" },
    ],
    website: "https://www.ukg.com",
    sourceUrl: "https://www.ukg.com/solutions/healthcare",
    sourceOrg: "UKG",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["time", "attendance", "scheduling", "healthcare"],
  },
  {
    id: "when-i-work",
    name: "When I Work",
    tagline: {
      en: "Simple shift scheduling and time tracking for frontline teams",
      es: "Programacion de turnos y seguimiento de tiempo simple para equipos de primera linea",
    },
    category: "time-attendance",
    description: {
      en: "When I Work is an affordable shift scheduling and time tracking platform designed for hourly and shift-based workers. Mobile-first with easy shift swapping and team messaging.",
      es: "When I Work es una plataforma asequible de programacion de turnos y seguimiento de tiempo disenada para trabajadores por hora.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 2, max: 5, unit: "/user/month" },
    pricingNote: {
      en: "Standard plan $2.50/user/month. Advanced plan $5/user/month with overtime tracking and labor reporting.",
      es: "Plan estandar $2.50/usuario/mes. Plan avanzado $5/usuario/mes con seguimiento de horas extra.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Great value for small FQHCs. Easy to deploy. But lacks healthcare-specific compliance features (credentialing, union rules) of UKG.",
      es: "Gran valor para FQHCs pequenos. Facil de implementar. Pero carece de funciones de cumplimiento especificas de salud de UKG.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: false,
    keyFeatures: [
      { en: "Mobile-first shift scheduling and swapping", es: "Programacion y cambio de turnos movil" },
      { en: "Team messaging built in", es: "Mensajeria de equipo integrada" },
      { en: "Affordable pricing for small teams", es: "Precios asequibles para equipos pequenos" },
    ],
    limitations: [
      { en: "No HIPAA BAA — cannot be used for patient-related scheduling communication", es: "Sin BAA HIPAA — no se puede usar para comunicacion de programacion relacionada con pacientes" },
      { en: "Limited healthcare compliance features", es: "Funciones limitadas de cumplimiento de salud" },
    ],
    website: "https://wheniwork.com",
    sourceUrl: "https://wheniwork.com/pricing",
    sourceOrg: "When I Work",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["scheduling", "time", "affordable", "mobile"],
  },
  // ─── Workforce Scheduling ────────────────────────────────────────
  {
    id: "qgenda",
    name: "QGenda",
    tagline: {
      en: "Provider scheduling and workforce management for healthcare",
      es: "Programacion de proveedores y gestion de personal para salud",
    },
    category: "workforce-scheduling",
    description: {
      en: "QGenda is the leading provider scheduling platform for healthcare, managing on-call, clinic shifts, and operating room assignments. Handles complex provider scheduling rules including scope-of-practice requirements.",
      es: "QGenda es la plataforma lider de programacion de proveedores para salud, gestionando guardia, turnos clinicos y asignaciones de sala de operaciones.",
    },
    pricingModel: "per-provider",
    pricingRange: { min: 30, max: 75, unit: "/provider/month" },
    pricingNote: {
      en: "Per-provider pricing varies by modules. Basic scheduling ~$30/provider/month. Full suite with analytics ~$50-75/provider/month.",
      es: "Precios por proveedor varian segun modulos. Programacion basica ~$30/proveedor/mes.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Best for medium-large FQHCs with complex provider scheduling. Small FQHCs may find it over-featured for their needs.",
      es: "Mejor para FQHCs medianos-grandes con programacion compleja de proveedores.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "NextGen", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Complex provider scheduling with rule-based automation", es: "Programacion compleja de proveedores con automatizacion basada en reglas" },
      { en: "On-call and call coverage management", es: "Gestion de guardia y cobertura de llamadas" },
      { en: "Workforce analytics and demand forecasting", es: "Analitica de personal y pronostico de demanda" },
    ],
    limitations: [
      { en: "Per-provider pricing can be expensive for large multi-provider FQHCs", es: "Los precios por proveedor pueden ser costosos para FQHCs con muchos proveedores" },
      { en: "Primarily designed for hospitals — FQHC workflows may need configuration", es: "Disenado principalmente para hospitales — los flujos de trabajo de FQHC pueden necesitar configuracion" },
    ],
    website: "https://www.qgenda.com",
    sourceUrl: "https://www.qgenda.com/solutions/provider-scheduling",
    sourceOrg: "QGenda",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["scheduling", "provider", "on-call", "healthcare"],
  },
  // ─── Project Management ──────────────────────────────────────────
  {
    id: "smartsheet",
    name: "Smartsheet",
    tagline: {
      en: "Enterprise work management with strong grant tracking and reporting",
      es: "Gestion de trabajo empresarial con fuerte seguimiento de subvenciones y reportes",
    },
    category: "project-management",
    description: {
      en: "Smartsheet is a work management platform offering spreadsheet-like interfaces with project management capabilities. Popular in healthcare for grant tracking, QI projects, and regulatory compliance workflows.",
      es: "Smartsheet es una plataforma de gestion de trabajo que ofrece interfaces tipo hoja de calculo con capacidades de gestion de proyectos.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 7, max: 25, unit: "/user/month" },
    pricingNote: {
      en: "Pro $7/user/month. Business $25/user/month. Nonprofit pricing available (30-50% discount via TechSoup).",
      es: "Pro $7/usuario/mes. Business $25/usuario/mes. Precios para sin fines de lucro disponibles (30-50% descuento via TechSoup).",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Familiar spreadsheet UX works well for non-technical staff. Grant tracking templates available. Nonprofit discount through TechSoup.",
      es: "UX familiar de hoja de calculo funciona bien para personal no tecnico. Plantillas de seguimiento de subvenciones disponibles.",
    },
    fqhcDiscount: {
      en: "30-50% nonprofit discount available through TechSoup.",
      es: "30-50% de descuento para sin fines de lucro disponible a traves de TechSoup.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Spreadsheet-like interface familiar to all staff", es: "Interfaz tipo hoja de calculo familiar para todo el personal" },
      { en: "Grant tracking and deadline management templates", es: "Plantillas de seguimiento de subvenciones y gestion de plazos" },
      { en: "Automated workflows and approval chains", es: "Flujos de trabajo automatizados y cadenas de aprobacion" },
      { en: "Dashboard and reporting for leadership visibility", es: "Tablero y reportes para visibilidad del liderazgo" },
    ],
    limitations: [
      { en: "Per-user pricing adds up for larger organizations", es: "Los precios por usuario se acumulan para organizaciones mas grandes" },
      { en: "Can become complex with many interconnected sheets", es: "Puede volverse complejo con muchas hojas interconectadas" },
    ],
    website: "https://www.smartsheet.com",
    sourceUrl: "https://www.smartsheet.com/pricing",
    sourceOrg: "Smartsheet",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["project-management", "grant-tracking", "nonprofit"],
  },
  {
    id: "monday-com",
    name: "Monday.com",
    tagline: {
      en: "Visual work management with nonprofit pricing and healthcare templates",
      es: "Gestion visual de trabajo con precios para sin fines de lucro y plantillas de salud",
    },
    category: "project-management",
    description: {
      en: "Monday.com is a visual work management platform with drag-and-drop boards, automations, and integrations. Offers significant nonprofit discounts and healthcare-specific templates.",
      es: "Monday.com es una plataforma visual de gestion de trabajo con tableros de arrastrar y soltar, automatizaciones e integraciones.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 8, max: 16, unit: "/seat/month" },
    pricingNote: {
      en: "Standard $10/seat/month. Pro $16/seat/month. Nonprofit discount: up to 70% off through Monday.com Social Impact program.",
      es: "Estandar $10/asiento/mes. Pro $16/asiento/mes. Descuento para sin fines de lucro: hasta 70% a traves del programa de Impacto Social.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Intuitive visual interface great for non-technical teams. Up to 70% nonprofit discount makes it very affordable. Less healthcare-specific than Smartsheet.",
      es: "Interfaz visual intuitiva ideal para equipos no tecnicos. Hasta 70% de descuento para sin fines de lucro.",
    },
    fqhcDiscount: {
      en: "Up to 70% off through Monday.com Social Impact program for qualifying nonprofits.",
      es: "Hasta 70% de descuento a traves del programa de Impacto Social de Monday.com.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: false,
    keyFeatures: [
      { en: "Visual drag-and-drop project boards", es: "Tableros de proyectos visuales de arrastrar y soltar" },
      { en: "Workflow automations and integrations", es: "Automatizaciones de flujos de trabajo e integraciones" },
      { en: "Up to 70% nonprofit discount", es: "Hasta 70% de descuento para sin fines de lucro" },
    ],
    limitations: [
      { en: "No HIPAA BAA — cannot store PHI", es: "Sin BAA HIPAA — no se puede almacenar PHI" },
      { en: "Not designed for clinical workflows", es: "No disenado para flujos de trabajo clinicos" },
    ],
    website: "https://monday.com",
    sourceUrl: "https://monday.com/nonprofits",
    sourceOrg: "Monday.com",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["project-management", "visual", "nonprofit"],
  },
  // ─── Communication & Collaboration ───────────────────────────────
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    tagline: {
      en: "HIPAA-compliant communication hub — most FQHCs already have it",
      es: "Centro de comunicacion compatible con HIPAA — la mayoria de FQHCs ya lo tienen",
    },
    category: "communication",
    description: {
      en: "Microsoft Teams is the dominant workplace communication platform in healthcare. Most FQHCs already have access through Microsoft 365 licensing. HIPAA BAA included with business/enterprise plans. Integrates telehealth via Teams EHR connector for Epic.",
      es: "Microsoft Teams es la plataforma dominante de comunicacion en el lugar de trabajo en salud. La mayoria de FQHCs ya tienen acceso a traves de licencias Microsoft 365.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 4, max: 13, unit: "/user/month" },
    pricingNote: {
      en: "Microsoft 365 Business Basic $6/user/month (includes Teams). Nonprofit pricing: $5.50-7.50/user/month for M365 suite. Teams Essentials standalone $4/user/month.",
      es: "Microsoft 365 Business Basic $6/usuario/mes (incluye Teams). Precios para sin fines de lucro: $5.50-7.50/usuario/mes para suite M365.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Already in most FQHC environments via M365. HIPAA BAA included. Telehealth-capable. Nonprofit pricing available. Least disruption to adopt.",
      es: "Ya presente en la mayoria de entornos FQHC via M365. BAA HIPAA incluido. Capaz de telesalud. Precios para sin fines de lucro disponibles.",
    },
    fqhcDiscount: {
      en: "Microsoft 365 for Nonprofits: Business Basic free for first 300 users. Business Premium at $5.50/user/month (vs $22 commercial).",
      es: "Microsoft 365 para sin fines de lucro: Business Basic gratis para los primeros 300 usuarios. Business Premium a $5.50/usuario/mes.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "partial" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "HIPAA BAA included with business plans", es: "BAA HIPAA incluido con planes empresariales" },
      { en: "Teams EHR Connector for Epic telehealth integration", es: "Conector Teams EHR para integracion de telesalud Epic" },
      { en: "Chat, video, file sharing, and channels in one platform", es: "Chat, video, uso compartido de archivos y canales en una plataforma" },
      { en: "Free Business Basic for first 300 nonprofit users", es: "Business Basic gratis para los primeros 300 usuarios de sin fines de lucro" },
    ],
    limitations: [
      { en: "Can feel bloated — many features FQHCs won't use", es: "Puede sentirse sobrecargado — muchas funciones que los FQHCs no usaran" },
      { en: "Requires Microsoft 365 ecosystem commitment", es: "Requiere compromiso con el ecosistema Microsoft 365" },
    ],
    website: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software",
    sourceUrl: "https://www.microsoft.com/en-us/nonprofits/microsoft-365",
    sourceOrg: "Microsoft",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["communication", "telehealth", "microsoft", "nonprofit"],
  },
  {
    id: "zoom-healthcare",
    name: "Zoom for Healthcare",
    tagline: {
      en: "HIPAA-compliant video with dedicated telehealth workflows",
      es: "Video compatible con HIPAA con flujos de trabajo de telesalud dedicados",
    },
    category: "communication",
    description: {
      en: "Zoom for Healthcare is a HIPAA-compliant video communication platform with telehealth-specific features including virtual waiting rooms, EHR integration, and patient workflow management.",
      es: "Zoom para Salud es una plataforma de comunicacion por video compatible con HIPAA con funciones especificas de telesalud.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 13, max: 22, unit: "/user/month" },
    pricingNote: {
      en: "Business plan $13.33/user/month (annual). Healthcare add-on for telehealth features. BAA included with paid plans.",
      es: "Plan Business $13.33/usuario/mes (anual). Complemento de salud para funciones de telesalud. BAA incluido con planes pagados.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Best-in-class video quality and patient familiarity. But many FQHCs already have Teams — adding Zoom means paying for two platforms.",
      es: "Mejor calidad de video y familiaridad del paciente. Pero muchos FQHCs ya tienen Teams — agregar Zoom significa pagar por dos plataformas.",
    },
    fqhcDiscount: {
      en: "50% off for nonprofits through Zoom Social Impact program (verified 501c3 required).",
      es: "50% de descuento para sin fines de lucro a traves del programa de Impacto Social de Zoom.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "HIPAA BAA with paid plans", es: "BAA HIPAA con planes pagados" },
      { en: "Virtual waiting rooms for telehealth visits", es: "Salas de espera virtuales para visitas de telesalud" },
      { en: "EHR integration for appointment-based video visits", es: "Integracion EHR para visitas de video basadas en citas" },
      { en: "50% nonprofit discount", es: "50% de descuento para sin fines de lucro" },
    ],
    limitations: [
      { en: "Adds cost if Teams already available through M365", es: "Agrega costo si Teams ya esta disponible a traves de M365" },
      { en: "Healthcare add-on required for telehealth features", es: "Se requiere complemento de salud para funciones de telesalud" },
    ],
    website: "https://zoom.us/healthcare",
    sourceUrl: "https://zoom.us/healthcare",
    sourceOrg: "Zoom",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["communication", "telehealth", "video", "nonprofit"],
  },
  // ─── Cloud & AI ──────────────────────────────────────────────────
  {
    id: "microsoft-azure",
    name: "Microsoft Azure",
    tagline: {
      en: "HIPAA-ready cloud with automatic BAA and $3,500/year nonprofit credits",
      es: "Nube lista para HIPAA con BAA automatico y $3,500/ano en creditos para sin fines de lucro",
    },
    category: "cloud-ai",
    description: {
      en: "Azure is Microsoft's cloud platform, dominant in healthcare due to automatic HIPAA BAA, Azure Health Data Services (FHIR), and the $3,500/year Microsoft nonprofit credit. Most FQHCs are already in the Microsoft ecosystem.",
      es: "Azure es la plataforma en la nube de Microsoft, dominante en salud debido al BAA HIPAA automatico y los creditos para sin fines de lucro de $3,500/ano.",
    },
    pricingModel: "tiered",
    pricingRange: null,
    pricingNote: {
      en: "Pay-as-you-go cloud pricing. Nonprofit credit: $3,500/year in Azure services. Azure Health Data Services for FHIR/DICOM.",
      es: "Precios de nube de pago por uso. Credito para sin fines de lucro: $3,500/ano en servicios Azure.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Automatic HIPAA BAA (no separate agreement needed). $3,500/year nonprofit credit. Azure Health Data Services for interoperability. Already in most FQHC Microsoft ecosystems.",
      es: "BAA HIPAA automatico (no se necesita acuerdo separado). Credito de $3,500/ano para sin fines de lucro.",
    },
    fqhcDiscount: {
      en: "$3,500/year Azure credit for eligible nonprofits. Additional discounts on Microsoft 365 and Dynamics.",
      es: "$3,500/ano en creditos Azure para sin fines de lucro elegibles. Descuentos adicionales en Microsoft 365 y Dynamics.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Automatic HIPAA BAA for all healthcare workloads", es: "BAA HIPAA automatico para todas las cargas de trabajo de salud" },
      { en: "Azure Health Data Services (FHIR, DICOM)", es: "Azure Health Data Services (FHIR, DICOM)" },
      { en: "$3,500/year nonprofit credit", es: "$3,500/ano en creditos para sin fines de lucro" },
      { en: "Azure AI services for clinical analytics", es: "Servicios de IA Azure para analitica clinica" },
    ],
    limitations: [
      { en: "Cloud costs can escalate without proper governance", es: "Los costos de nube pueden escalar sin gobernanza adecuada" },
      { en: "Requires cloud engineering expertise to optimize", es: "Requiere experiencia en ingenieria de nube para optimizar" },
    ],
    website: "https://azure.microsoft.com/en-us/solutions/healthcare/",
    sourceUrl: "https://www.microsoft.com/en-us/nonprofits/azure",
    sourceOrg: "Microsoft",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["cloud", "ai", "healthcare", "nonprofit"],
  },
  {
    id: "aws-healthcare",
    name: "Amazon Web Services (AWS)",
    tagline: {
      en: "Largest cloud platform with IMAGINE Grant up to $300K for nonprofits",
      es: "La plataforma en la nube mas grande con subsidio IMAGINE de hasta $300K para sin fines de lucro",
    },
    category: "cloud-ai",
    description: {
      en: "AWS is the world's largest cloud platform. AWS for Health provides HIPAA-eligible services, HealthLake for FHIR data, and Amazon Comprehend Medical for NLP. The IMAGINE Grant program provides up to $300K in credits for qualifying nonprofits.",
      es: "AWS es la plataforma en la nube mas grande del mundo. AWS para Salud proporciona servicios elegibles para HIPAA y HealthLake para datos FHIR.",
    },
    pricingModel: "tiered",
    pricingRange: null,
    pricingNote: {
      en: "Pay-as-you-go. IMAGINE Grant: up to $300K in AWS credits for qualifying nonprofits. Free Tier available for initial exploration.",
      es: "Pago por uso. Subsidio IMAGINE: hasta $300K en creditos AWS para sin fines de lucro calificados.",
    },
    fqhcFit: "moderate",
    fqhcFitReason: {
      en: "Powerful platform but requires more cloud expertise than Azure. IMAGINE Grant is significant ($300K). Less healthcare-ecosystem alignment than Microsoft.",
      es: "Plataforma poderosa pero requiere mas experiencia en nube que Azure. El subsidio IMAGINE es significativo ($300K).",
    },
    fqhcDiscount: {
      en: "AWS IMAGINE Grant: up to $300K in credits for qualifying 501(c)(3) nonprofits focused on social impact.",
      es: "Subsidio AWS IMAGINE: hasta $300K en creditos para sin fines de lucro 501(c)(3) calificados.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Broadest range of cloud services (200+)", es: "Gama mas amplia de servicios en la nube (200+)" },
      { en: "AWS HealthLake for FHIR-native data storage", es: "AWS HealthLake para almacenamiento de datos nativo FHIR" },
      { en: "Amazon Comprehend Medical for clinical NLP", es: "Amazon Comprehend Medical para NLP clinico" },
      { en: "IMAGINE Grant up to $300K for nonprofits", es: "Subsidio IMAGINE de hasta $300K para sin fines de lucro" },
    ],
    limitations: [
      { en: "Steeper learning curve than Azure for healthcare orgs", es: "Curva de aprendizaje mas pronunciada que Azure para organizaciones de salud" },
      { en: "BAA must be requested — not automatic like Azure", es: "BAA debe solicitarse — no es automatico como Azure" },
    ],
    website: "https://aws.amazon.com/health/",
    sourceUrl: "https://aws.amazon.com/government-education/nonprofits/",
    sourceOrg: "Amazon Web Services",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["cloud", "ai", "nonprofit", "grants"],
  },
  // ─── Cybersecurity ───────────────────────────────────────────────
  {
    id: "huntress",
    name: "Huntress",
    tagline: {
      en: "Managed detection and response built for small healthcare — 14K+ healthcare customers",
      es: "Deteccion y respuesta gestionada para salud pequena — mas de 14K clientes de salud",
    },
    category: "cybersecurity",
    description: {
      en: "Huntress provides managed endpoint detection and response (EDR), identity threat detection (ITDR), security awareness training (SAT), and managed SIEM. Serves 14K+ healthcare organizations. 24/7 SOC included at no additional cost. Deploys in under 1 hour.",
      es: "Huntress proporciona EDR gestionado, deteccion de amenazas de identidad, capacitacion en conciencia de seguridad y SIEM gestionado. Sirve a mas de 14K organizaciones de salud.",
    },
    pricingModel: "per-device",
    pricingRange: { min: 12, max: 15, unit: "/device/month" },
    pricingNote: {
      en: "~$15/device/month with volume discounts to ~$12/device. 24/7 SOC included. No setup fees. Per-data-source SIEM pricing (not per GB).",
      es: "~$15/dispositivo/mes con descuentos por volumen a ~$12/dispositivo. SOC 24/7 incluido. Sin tarifas de configuracion.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Purpose-built for small/mid-size organizations. 14K+ healthcare customers. 24/7 SOC included (no add-on). Transparent pricing. Deploys in 1 hour.",
      es: "Disenado para organizaciones pequenas/medianas. Mas de 14K clientes de salud. SOC 24/7 incluido. Precios transparentes.",
    },
    fqhcDiscount: null,
    fqhcCustomers: ["Cohere Health (SAT customer)", "14,000+ healthcare organizations"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "24/7 human-led SOC included at no additional cost", es: "SOC dirigido por humanos 24/7 incluido sin costo adicional" },
      { en: "Managed EDR, ITDR, SAT, and SIEM in one platform", es: "EDR, ITDR, SAT y SIEM gestionados en una plataforma" },
      { en: "Deploys in under 1 hour — no complex configuration", es: "Se implementa en menos de 1 hora — sin configuracion compleja" },
      { en: "Transparent per-device pricing with volume discounts", es: "Precios transparentes por dispositivo con descuentos por volumen" },
    ],
    limitations: [
      { en: "Healthcare compliance premiums may add 20-40% to base pricing", es: "Las primas de cumplimiento de salud pueden agregar 20-40% al precio base" },
      { en: "Newer to market than CrowdStrike/SentinelOne", es: "Mas nuevo en el mercado que CrowdStrike/SentinelOne" },
    ],
    website: "https://www.huntress.com",
    sourceUrl: "https://www.huntress.com/pricing",
    sourceOrg: "Huntress",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["cybersecurity", "edr", "soc", "healthcare"],
  },
  {
    id: "knowbe4",
    name: "KnowBe4",
    tagline: {
      en: "Security awareness training — the #1 way to prevent healthcare phishing",
      es: "Capacitacion en conciencia de seguridad — la forma #1 de prevenir phishing en salud",
    },
    category: "cybersecurity",
    description: {
      en: "KnowBe4 is the world's largest security awareness training platform. Provides simulated phishing campaigns, interactive training modules, and compliance reporting. Critical for HIPAA compliance — 90% of healthcare breaches start with phishing.",
      es: "KnowBe4 es la plataforma de capacitacion en conciencia de seguridad mas grande del mundo. Proporciona campanas de phishing simulado y modulos de capacitacion interactivos.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 18, max: 30, unit: "/user/year" },
    pricingNote: {
      en: "Silver plan ~$18/user/year. Gold ~$24/user/year. Platinum ~$30/user/year. Volume discounts for 100+ users.",
      es: "Plan Silver ~$18/usuario/ano. Gold ~$24/usuario/ano. Platinum ~$30/usuario/ano.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Essential for HIPAA compliance. 90% of breaches start with phishing. Low cost per user. Satisfies HHS Cybersecurity Performance Goal for security training.",
      es: "Esencial para cumplimiento HIPAA. 90% de violaciones comienzan con phishing. Bajo costo por usuario.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Simulated phishing campaigns with reporting", es: "Campanas de phishing simulado con reportes" },
      { en: "1,000+ interactive training modules", es: "Mas de 1,000 modulos de capacitacion interactivos" },
      { en: "HIPAA compliance training content included", es: "Contenido de capacitacion de cumplimiento HIPAA incluido" },
      { en: "Phish Alert Button for Outlook/Gmail", es: "Boton de Alerta de Phishing para Outlook/Gmail" },
    ],
    limitations: [
      { en: "Training fatigue — staff may disengage from frequent simulations", es: "Fatiga de capacitacion — el personal puede desconectarse de simulaciones frecuentes" },
      { en: "Doesn't protect endpoints — complements EDR, doesn't replace it", es: "No protege endpoints — complementa EDR, no lo reemplaza" },
    ],
    website: "https://www.knowbe4.com",
    sourceUrl: "https://www.knowbe4.com/pricing",
    sourceOrg: "KnowBe4",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["cybersecurity", "training", "phishing", "hipaa"],
  },
  // ─── Accounting & Finance ────────────────────────────────────────
  {
    id: "sage-intacct",
    name: "Sage Intacct",
    tagline: {
      en: "AICPA-preferred cloud accounting with native fund and grant tracking",
      es: "Contabilidad en la nube preferida por AICPA con seguimiento nativo de fondos y subvenciones",
    },
    category: "accounting",
    description: {
      en: "Sage Intacct is the AICPA's preferred cloud financial management solution and the leading choice for healthcare nonprofits. Native multi-entity, fund accounting, grant tracking, and HIPAA-certified cloud infrastructure.",
      es: "Sage Intacct es la solucion de gestion financiera en la nube preferida por AICPA y la opcion lider para organizaciones de salud sin fines de lucro.",
    },
    pricingModel: "custom",
    pricingRange: { min: 400, max: 1500, unit: "/user/month" },
    pricingNote: {
      en: "Starting ~$400/user/month for core financials. Healthcare and nonprofit modules additional. Implementation costs $25K-100K. Nonprofit pricing available.",
      es: "Desde ~$400/usuario/mes para financieros basicos. Modulos de salud y sin fines de lucro adicionales.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Purpose-built fund accounting for nonprofits. HIPAA certified. Grant tracking with HRSA reporting. Multi-entity for multi-site FQHCs. Seattle Indian Health Board is a named customer.",
      es: "Contabilidad de fondos disenada para sin fines de lucro. Certificado HIPAA. Seguimiento de subvenciones con informes HRSA.",
    },
    fqhcDiscount: {
      en: "Nonprofit pricing available through Sage Intacct. Contact for healthcare nonprofit quote.",
      es: "Precios para sin fines de lucro disponibles. Contactar para cotizacion de sin fines de lucro de salud.",
    },
    fqhcCustomers: ["Seattle Indian Health Board"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Native fund accounting with grant restriction tracking", es: "Contabilidad de fondos nativa con seguimiento de restricciones de subvenciones" },
      { en: "Multi-entity support for multi-site FQHCs", es: "Soporte multi-entidad para FQHCs multi-sitio" },
      { en: "AICPA-preferred financial reporting", es: "Informes financieros preferidos por AICPA" },
      { en: "HIPAA-certified cloud infrastructure", es: "Infraestructura en la nube certificada HIPAA" },
    ],
    limitations: [
      { en: "High per-user cost — may be expensive for small FQHCs", es: "Alto costo por usuario — puede ser costoso para FQHCs pequenos" },
      { en: "Implementation requires specialized consulting ($25K-100K)", es: "La implementacion requiere consultoria especializada ($25K-100K)" },
    ],
    website: "https://www.sageintacct.com",
    sourceUrl: "https://www.sageintacct.com/healthcare",
    sourceOrg: "Sage Intacct",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["accounting", "fund-accounting", "grant-tracking", "nonprofit"],
  },
  {
    id: "quickbooks-nonprofit",
    name: "QuickBooks (via TechSoup)",
    tagline: {
      en: "Affordable basic accounting for small FQHCs — $75-160/year via TechSoup",
      es: "Contabilidad basica asequible para FQHCs pequenos — $75-160/ano via TechSoup",
    },
    category: "accounting",
    description: {
      en: "QuickBooks is the most widely used small business accounting software. Available at steep discounts through TechSoup for nonprofits. Suitable for very small FQHCs with simple accounting needs, but lacks native fund accounting.",
      es: "QuickBooks es el software de contabilidad mas utilizado. Disponible con grandes descuentos a traves de TechSoup para sin fines de lucro.",
    },
    pricingModel: "tiered",
    pricingRange: { min: 75, max: 160, unit: "/year (TechSoup)" },
    pricingNote: {
      en: "TechSoup pricing: QuickBooks Online Plus ~$75/year, Advanced ~$160/year (vs $1,000+/year commercial). Desktop Pro also available.",
      es: "Precios TechSoup: QuickBooks Online Plus ~$75/ano, Advanced ~$160/ano (vs $1,000+/ano comercial).",
    },
    fqhcFit: "low",
    fqhcFitReason: {
      en: "Only suitable for the smallest FQHCs with simple finances. No native fund accounting, no grant tracking, no multi-entity support. Outgrown quickly.",
      es: "Solo adecuado para los FQHCs mas pequenos con finanzas simples. Sin contabilidad de fondos nativa.",
    },
    fqhcDiscount: {
      en: "TechSoup: 70-85% discount. QuickBooks Online Plus ~$75/year (vs $540/year). QuickBooks Advanced ~$160/year (vs $1,200/year).",
      es: "TechSoup: 70-85% de descuento. QuickBooks Online Plus ~$75/ano. QuickBooks Advanced ~$160/ano.",
    },
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: false,
    keyFeatures: [
      { en: "Most familiar accounting interface in the market", es: "La interfaz de contabilidad mas familiar del mercado" },
      { en: "Massive accountant/bookkeeper ecosystem", es: "Ecosistema masivo de contadores y tenedores de libros" },
      { en: "TechSoup pricing makes it extremely affordable", es: "Los precios de TechSoup lo hacen extremadamente asequible" },
    ],
    limitations: [
      { en: "No native fund accounting — critical gap for FQHCs with multiple grants", es: "Sin contabilidad de fondos nativa — brecha critica para FQHCs con multiples subvenciones" },
      { en: "No HIPAA BAA — cannot store financial data linked to PHI", es: "Sin BAA HIPAA — no se puede almacenar datos financieros vinculados a PHI" },
      { en: "No multi-entity support for multi-site organizations", es: "Sin soporte multi-entidad para organizaciones multi-sitio" },
    ],
    website: "https://quickbooks.intuit.com",
    sourceUrl: "https://www.techsoup.org/products/quickbooks",
    sourceOrg: "TechSoup / Intuit",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["accounting", "affordable", "techsoup"],
  },
  // ─── Compliance & Audit ──────────────────────────────────────────
  {
    id: "medtrainer",
    name: "MedTrainer",
    tagline: {
      en: "All-in-one compliance, credentialing, and training for healthcare",
      es: "Cumplimiento, acreditacion y capacitacion todo-en-uno para salud",
    },
    category: "compliance-audit",
    description: {
      en: "MedTrainer combines learning management, compliance documentation, and credentialing in one platform designed for healthcare organizations. Handles HIPAA training, OSHA compliance, provider credentialing, and policy management.",
      es: "MedTrainer combina gestion de aprendizaje, documentacion de cumplimiento y acreditacion en una plataforma disenada para organizaciones de salud.",
    },
    pricingModel: "per-user",
    pricingRange: { min: 3, max: 8, unit: "/user/month" },
    pricingNote: {
      en: "Estimated $3-8/user/month depending on modules selected. Contact for healthcare-specific quote.",
      es: "Estimado $3-8/usuario/mes dependiendo de modulos seleccionados.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "All-in-one reduces vendor sprawl — training + credentialing + compliance in one platform. Healthcare-specific. Affordable per-user pricing.",
      es: "Todo-en-uno reduce la dispersion de proveedores — capacitacion + acreditacion + cumplimiento en una plataforma.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "LMS with HIPAA, OSHA, and healthcare compliance courses", es: "LMS con cursos de cumplimiento HIPAA, OSHA y salud" },
      { en: "Provider credentialing and privilege management", es: "Acreditacion de proveedores y gestion de privilegios" },
      { en: "Policy and procedure document management", es: "Gestion de documentos de politicas y procedimientos" },
      { en: "Automated expiration tracking and renewal alerts", es: "Seguimiento automatizado de vencimientos y alertas de renovacion" },
    ],
    limitations: [
      { en: "Less customizable than standalone LMS platforms", es: "Menos personalizable que plataformas LMS independientes" },
      { en: "Credentialing features may not match dedicated solutions like symplr", es: "Las funciones de acreditacion pueden no igualar soluciones dedicadas como symplr" },
    ],
    website: "https://medtrainer.com",
    sourceUrl: "https://medtrainer.com/solutions/",
    sourceOrg: "MedTrainer",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["compliance", "credentialing", "training", "lms"],
  },
  {
    id: "compliancy-group",
    name: "Compliancy Group (The Guard)",
    tagline: {
      en: "Guided HIPAA compliance with audit-ready documentation",
      es: "Cumplimiento HIPAA guiado con documentacion lista para auditoria",
    },
    category: "compliance-audit",
    description: {
      en: "Compliancy Group's 'The Guard' platform provides guided HIPAA compliance with step-by-step workflows for risk assessments, policies, training, and incident management. Designed for small healthcare organizations.",
      es: "La plataforma 'The Guard' de Compliancy Group proporciona cumplimiento HIPAA guiado con flujos de trabajo paso a paso.",
    },
    pricingModel: "flat-rate",
    pricingRange: { min: 200, max: 500, unit: "/month" },
    pricingNote: {
      en: "Flat monthly fee based on organization size. Typically $200-500/month for small healthcare organizations. Includes compliance coaching.",
      es: "Tarifa mensual fija basada en el tamano de la organizacion. Tipicamente $200-500/mes para organizaciones de salud pequenas.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Step-by-step guided compliance is ideal for FQHCs without dedicated compliance officers. Audit-ready documentation. Compliance coaching included.",
      es: "El cumplimiento guiado paso a paso es ideal para FQHCs sin oficiales de cumplimiento dedicados.",
    },
    fqhcDiscount: null,
    fqhcCustomers: [],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Guided HIPAA compliance workflows (not just checklists)", es: "Flujos de trabajo de cumplimiento HIPAA guiados (no solo listas de verificacion)" },
      { en: "Risk assessment with audit-ready documentation", es: "Evaluacion de riesgos con documentacion lista para auditoria" },
      { en: "Compliance coaching from dedicated specialists", es: "Coaching de cumplimiento de especialistas dedicados" },
      { en: "HIPAA Seal of Compliance for marketing", es: "Sello de Cumplimiento HIPAA para marketing" },
    ],
    limitations: [
      { en: "HIPAA-focused — doesn't cover HRSA OSV or broader compliance needs", es: "Enfocado en HIPAA — no cubre OSV de HRSA u otras necesidades de cumplimiento" },
      { en: "No credentialing module — need separate tool for provider management", es: "Sin modulo de acreditacion — necesita herramienta separada para gestion de proveedores" },
    ],
    website: "https://compliancy-group.com",
    sourceUrl: "https://compliancy-group.com/hipaa-compliance-software/",
    sourceOrg: "Compliancy Group",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["compliance", "hipaa", "audit", "guided"],
  },
  // ─── Patient Engagement ──────────────────────────────────────────
  {
    id: "caremessage",
    name: "CareMessage",
    tagline: {
      en: "Nonprofit patient messaging platform — serves 1 in 7 FQHCs nationwide",
      es: "Plataforma sin fines de lucro de mensajeria a pacientes — sirve a 1 de cada 7 FQHCs a nivel nacional",
    },
    category: "patient-engagement",
    description: {
      en: "CareMessage is a 501(c)(3) nonprofit building the largest patient engagement platform for under-resourced populations. Serves 400+ safety-net organizations across 45 states, reaching 10 million patients. SMS-based — works for patients without smartphones. 60+ language support.",
      es: "CareMessage es una organizacion sin fines de lucro 501(c)(3) que construye la plataforma de participacion de pacientes mas grande para poblaciones con acceso limitado a la atenci\u00f3n.",
    },
    pricingModel: "custom",
    pricingRange: null,
    pricingNote: {
      en: "Nonprofit pricing model — designed to be sustainable for safety-net providers. Contact CareMessage for quote. Strategic NACHC and NAFC partnerships.",
      es: "Modelo de precios para sin fines de lucro — disenado para ser sostenible para proveedores de red de seguridad.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Built BY a nonprofit FOR safety-net providers. 1 in 7 FQHCs nationwide. SMS-based (no app needed). 60+ languages. Published clinical outcomes research. NACHC partner.",
      es: "Construido POR una organizacion sin fines de lucro PARA proveedores de red de seguridad. 1 de cada 7 FQHCs. Basado en SMS. 60+ idiomas.",
    },
    fqhcDiscount: {
      en: "Fellow 501(c)(3) nonprofit — pricing designed for safety-net sustainability. NACHC and NAFC partnerships provide additional access pathways.",
      es: "Organizacion sin fines de lucro 501(c)(3) — precios disenados para sostenibilidad de red de seguridad.",
    },
    fqhcCustomers: ["400+ safety-net organizations in 45 states", "Honor Community Health (MI)"],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "NextGen", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "SMS-based — works for patients without smartphones", es: "Basado en SMS — funciona para pacientes sin smartphones" },
      { en: "60+ languages including Spanish, Chinese, Vietnamese, Tagalog", es: "60+ idiomas incluyendo espanol, chino, vietnamita, tagalo" },
      { en: "Published clinical outcomes research (diabetes, no-shows, mental health)", es: "Investigacion publicada de resultados clinicos (diabetes, ausencias, salud mental)" },
      { en: "Mass and 1:1 texting with EHR integration", es: "Mensajeria masiva y 1:1 con integracion EHR" },
    ],
    limitations: [
      { en: "EHR integration could be deeper — survey results don't always flow back", es: "La integracion EHR podria ser mas profunda — los resultados de encuestas no siempre regresan" },
      { en: "SMS-only — no patient portal or digital intake", es: "Solo SMS — sin portal de pacientes o admision digital" },
    ],
    website: "https://www.caremessage.org",
    sourceUrl: "https://www.caremessage.org/partners/fqhcs/",
    sourceOrg: "CareMessage",
    lastVerified: "2026-03-20",
    nachcPartner: true,
    tags: ["patient-engagement", "sms", "nonprofit", "multilingual"],
  },
  {
    id: "luma-health",
    name: "Luma Health",
    tagline: {
      en: "Operational AI for patient access — 550+ health systems and FQHCs",
      es: "IA operativa para acceso de pacientes — mas de 550 sistemas de salud y FQHCs",
    },
    category: "patient-engagement",
    description: {
      en: "Luma Health is a patient engagement platform using operational AI to automate scheduling, reminders, waitlist management, and care gap outreach. Serves 550+ healthcare organizations including FQHCs. Pre-built FQHC-specific workflows.",
      es: "Luma Health es una plataforma de participacion de pacientes que usa IA operativa para automatizar programacion, recordatorios y alcance de brechas de atencion.",
    },
    pricingModel: "custom",
    pricingRange: { min: 250, max: 500, unit: "/month (starting)" },
    pricingNote: {
      en: "Starting ~$250/month. Scales by providers and patient volume. Custom quote required. FQHC-specific implementations available.",
      es: "Desde ~$250/mes. Escala por proveedores y volumen de pacientes. Cotizacion personalizada requerida.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "Pre-built FQHC workflows. Azara DRVS integration. 94% user satisfaction. Near North Health saw 300% diabetes engagement increase. Cook County Health is a customer.",
      es: "Flujos de trabajo FQHC preconstruidos. Integracion Azara DRVS. 94% satisfaccion de usuarios.",
    },
    fqhcDiscount: null,
    fqhcCustomers: ["Near North Health (Chicago)", "Ryan Health", "Cook County Health", "GPW Health Center (VA)"],
    ehrIntegrations: [
      { ehr: "eClinicalWorks", level: "native" },
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "NextGen", level: "api" },
      { ehr: "athenahealth", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Pre-built FQHC-specific workflows (Luma Bedrock)", es: "Flujos de trabajo especificos de FQHC preconstruidos (Luma Bedrock)" },
      { en: "Azara DRVS integration for care gap outreach", es: "Integracion Azara DRVS para alcance de brechas de atencion" },
      { en: "Automated waitlist management — 95% fill rate", es: "Gestion automatizada de lista de espera — 95% tasa de llenado" },
      { en: "Operational AI saved 2M+ staff hours in 2025", es: "IA operativa ahorro mas de 2M de horas de personal en 2025" },
    ],
    limitations: [
      { en: "Pricing can be expensive for smaller FQHCs", es: "Los precios pueden ser costosos para FQHCs mas pequenos" },
      { en: "Some customization limitations reported by users", es: "Algunas limitaciones de personalizacion reportadas por usuarios" },
    ],
    website: "https://www.lumahealth.io",
    sourceUrl: "https://www.lumahealth.io/who-we-serve/fqhc/",
    sourceOrg: "Luma Health",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["patient-engagement", "ai", "scheduling", "fqhc"],
  },
  {
    id: "phreesia",
    name: "Phreesia",
    tagline: {
      en: "Digital intake and patient access with FQHC-specific UDS data collection",
      es: "Admision digital y acceso de pacientes con recopilacion de datos UDS especifica de FQHC",
    },
    category: "patient-engagement",
    description: {
      en: "Phreesia provides digital check-in, patient intake, clinical screenings (PHQ-9, PRAPARE, GAD-7), and SDOH data collection. FQHC-specific features include UDS data collection, HEDIS/MIPS quality measure support, and 20+ language support.",
      es: "Phreesia proporciona check-in digital, admision de pacientes, evaluaciones clinicas y recopilacion de datos SDOH. Funciones especificas de FQHC incluyen recopilacion de datos UDS.",
    },
    pricingModel: "custom",
    pricingRange: null,
    pricingNote: {
      en: "Custom pricing based on organization size, patient volume, and modules. Contact for FQHC-specific quote.",
      es: "Precios personalizados basados en tamano de organizacion, volumen de pacientes y modulos.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "FQHC-specific UDS data collection, SDOH screening (PRAPARE), HEDIS/MIPS support, 20+ languages. 79% no-show reduction. Named FQHC customers.",
      es: "Recopilacion de datos UDS especifica de FQHC, evaluacion SDOH (PRAPARE), soporte HEDIS/MIPS, 20+ idiomas.",
    },
    fqhcDiscount: null,
    fqhcCustomers: ["Family Health Care of Northwest Ohio", "Community Health Center of Yavapai", "Community Health of Northwest Florida"],
    ehrIntegrations: [
      { ehr: "OCHIN Epic", level: "api" },
      { ehr: "eClinicalWorks", level: "api" },
      { ehr: "NextGen", level: "api" },
      { ehr: "athenahealth", level: "api" },
    ],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "FQHC-specific UDS data collection and reporting", es: "Recopilacion y reportes de datos UDS especificos de FQHC" },
      { en: "PRAPARE SDOH screening integrated into intake", es: "Evaluacion SDOH PRAPARE integrada en la admision" },
      { en: "20+ languages for diverse patient populations", es: "20+ idiomas para poblaciones diversas de pacientes" },
      { en: "Clinical screenings (PHQ-9, GAD-7, AUDIT-C) with real-time results", es: "Evaluaciones clinicas (PHQ-9, GAD-7, AUDIT-C) con resultados en tiempo real" },
    ],
    limitations: [
      { en: "Custom pricing makes comparison difficult", es: "Los precios personalizados dificultan la comparacion" },
      { en: "Requires hardware (tablets/kiosks) for in-clinic check-in", es: "Requiere hardware (tabletas/kioscos) para check-in en clinica" },
    ],
    website: "https://www.phreesia.com",
    sourceUrl: "https://www.phreesia.com/solutions/fqhc/",
    sourceOrg: "Phreesia",
    lastVerified: "2026-03-20",
    nachcPartner: false,
    tags: ["patient-engagement", "intake", "sdoh", "uds"],
  },
  {
    id: "pointcare",
    name: "Pointcare",
    tagline: {
      en: "Medicaid coverage management — proactive alerts before patients lose coverage",
      es: "Gestion de cobertura de Medicaid — alertas proactivas antes de que los pacientes pierdan cobertura",
    },
    category: "patient-engagement",
    description: {
      en: "Pointcare is a Medicaid coverage management platform serving 80+ community health centers and 1.8 million patients. Continuously monitors coverage status, proactively alerts patients before lapses, and guides mobile-friendly re-enrollment. NACHC Select partner — no new fees for NACHC member health centers. Directly addresses Medi-Cal redetermination crisis and H.R. 1 coverage disruption.",
      es: "Pointcare es una plataforma de gestion de cobertura de Medicaid que sirve a mas de 80 centros de salud comunitarios. Monitorea el estado de cobertura continuamente y alerta a los pacientes antes de que pierdan su cobertura.",
    },
    pricingModel: "custom",
    pricingRange: { min: 0, max: 0, unit: "no new fees for NACHC members" },
    pricingNote: {
      en: "NACHC Select partnership: no additional fees for NACHC member CHCs. Pricing for non-members not publicly disclosed.",
      es: "Asociacion NACHC Select: sin cargos adicionales para CHCs miembros de NACHC.",
    },
    fqhcFit: "high",
    fqhcFitReason: {
      en: "NACHC Select partner with no-cost adoption for member CHCs. Directly addresses Medi-Cal redetermination and H.R. 1 coverage disruption — highest-priority revenue protection tool in 2026.",
      es: "Socio NACHC Select sin costo para CHCs miembros. Aborda directamente la redeterminacion de Medi-Cal y la interrupcion de cobertura de H.R. 1.",
    },
    fqhcDiscount: {
      en: "NACHC Select: No new fees for NACHC member community health centers.",
      es: "NACHC Select: Sin nuevos cargos para centros de salud comunitarios miembros de NACHC.",
    },
    fqhcCustomers: ["80+ community health centers (national)"],
    ehrIntegrations: [],
    hipaaCompliant: true,
    keyFeatures: [
      { en: "Continuous Medicaid/Medi-Cal coverage status monitoring", es: "Monitoreo continuo del estado de cobertura de Medicaid/Medi-Cal" },
      { en: "Proactive patient alerts before coverage lapses", es: "Alertas proactivas a pacientes antes de que la cobertura caduque" },
      { en: "Mobile-friendly re-enrollment guidance", es: "Guia de reinscripcion amigable para moviles" },
      { en: "Addresses H.R. 1 redetermination wave — 1.8M patients served nationally", es: "Aborda la ola de redeterminacion de H.R. 1 — 1.8M pacientes atendidos a nivel nacional" },
    ],
    limitations: [
      { en: "New NACHC Select partnership (Feb 2026) — limited CA-specific FQHC case studies yet", es: "Nueva asociacion NACHC Select (Feb 2026) — aun pocos casos de estudio especificos de CA" },
    ],
    website: "https://www.pointcare.com",
    sourceUrl: "https://www.nachc.org/nachc-and-pointcare-partner-to-protect-health-care-coverage-for-community-health-center-patients/",
    sourceOrg: "NACHC",
    lastVerified: "2026-04-16",
    nachcPartner: true,
    tags: ["patient-engagement", "medicaid", "coverage-management", "nachc-select"],
  },
];

/* ------------------------------------------------------------------ */
/*  Sample Tech Stack Profiles                                         */
/* ------------------------------------------------------------------ */

export const TECH_STACK_PROFILES: TechStackProfile[] = [
  {
    id: "small-fqhc",
    name: { en: "Small FQHC (<50 staff, 1-3 sites)", es: "FQHC Pequeno (<50 personal, 1-3 sitios)" },
    description: {
      en: "Budget-conscious stack for small community health centers. Prioritizes consortium EHR, affordable HR, and essential cybersecurity.",
      es: "Stack consciente del presupuesto para centros de salud comunitarios pequenos.",
    },
    orgSize: "small",
    annualBudget: { en: "$50K-150K IT budget", es: "$50K-150K presupuesto de TI" },
    stack: [
      { category: "ehr", vendorId: "ochin-epic", note: "Consortium model keeps costs manageable" },
      { category: "rcm-billing", vendorId: "azara-drvs", note: "Via PCA or HCCN" },
      { category: "hr-payroll", vendorId: "adp-workforce-now", note: "Basic payroll + compliance" },
      { category: "time-attendance", vendorId: "when-i-work", note: "Affordable for small teams" },
      { category: "communication", vendorId: "microsoft-teams", note: "Free with M365 nonprofit" },
      { category: "cloud-ai", vendorId: "microsoft-azure", note: "$3,500/yr nonprofit credit" },
      { category: "cybersecurity", vendorId: "huntress", note: "24/7 SOC included" },
      { category: "cybersecurity", vendorId: "knowbe4", note: "Staff phishing training" },
      { category: "accounting", vendorId: "quickbooks-nonprofit", note: "$75/yr via TechSoup" },
      { category: "compliance-audit", vendorId: "compliancy-group", note: "Guided HIPAA compliance" },
      { category: "patient-engagement", vendorId: "caremessage", note: "Nonprofit SMS outreach" },
    ],
  },
  {
    id: "medium-fqhc",
    name: { en: "Medium FQHC (50-250 staff, 5-15 sites)", es: "FQHC Mediano (50-250 personal, 5-15 sitios)" },
    description: {
      en: "Balanced stack for mid-size FQHCs with multiple locations, behavioral health integration, and growing data needs.",
      es: "Stack equilibrado para FQHCs medianos con multiples ubicaciones e integracion de salud conductual.",
    },
    orgSize: "medium",
    annualBudget: { en: "$150K-500K IT budget", es: "$150K-500K presupuesto de TI" },
    stack: [
      { category: "ehr", vendorId: "ochin-epic", note: "Or eClinicalWorks with NACHC Select" },
      { category: "rcm-billing", vendorId: "azara-drvs", note: "Population health + quality" },
      { category: "rcm-billing", vendorId: "waystar", note: "Claims + denial management" },
      { category: "hr-payroll", vendorId: "adp-workforce-now", note: "Full suite with benefits" },
      { category: "time-attendance", vendorId: "ukg-workforce", note: "Union compliance + multi-site" },
      { category: "workforce-scheduling", vendorId: "qgenda", note: "Provider scheduling" },
      { category: "project-management", vendorId: "smartsheet", note: "Grant tracking" },
      { category: "communication", vendorId: "microsoft-teams", note: "M365 suite" },
      { category: "cloud-ai", vendorId: "microsoft-azure", note: "Infrastructure + AI" },
      { category: "cybersecurity", vendorId: "huntress", note: "Managed EDR + SIEM" },
      { category: "cybersecurity", vendorId: "knowbe4", note: "Security training" },
      { category: "accounting", vendorId: "sage-intacct", note: "Fund accounting + grants" },
      { category: "compliance-audit", vendorId: "medtrainer", note: "Training + credentialing" },
      { category: "patient-engagement", vendorId: "luma-health", note: "AI scheduling + outreach" },
      { category: "patient-engagement", vendorId: "phreesia", note: "Digital intake + SDOH" },
    ],
  },
  {
    id: "large-fqhc",
    name: { en: "Large FQHC (250+ staff, 15+ sites)", es: "FQHC Grande (250+ personal, 15+ sitios)" },
    description: {
      en: "Enterprise stack for large health center networks managing complex operations, multiple grants, union workforce, and APM readiness.",
      es: "Stack empresarial para redes grandes de centros de salud gestionando operaciones complejas y preparacion para APM.",
    },
    orgSize: "large",
    annualBudget: { en: "$500K-2M+ IT budget", es: "$500K-2M+ presupuesto de TI" },
    stack: [
      { category: "ehr", vendorId: "ochin-epic", note: "Enterprise Epic via OCHIN" },
      { category: "rcm-billing", vendorId: "azara-drvs", note: "Network-wide quality + VBC" },
      { category: "hr-payroll", vendorId: "adp-workforce-now", note: "Enterprise HCM" },
      { category: "hr-payroll", vendorId: "rippling", note: "IT + device management layer" },
      { category: "time-attendance", vendorId: "ukg-workforce", note: "Enterprise workforce mgmt" },
      { category: "workforce-scheduling", vendorId: "qgenda", note: "Provider + call scheduling" },
      { category: "project-management", vendorId: "smartsheet", note: "Enterprise work mgmt" },
      { category: "communication", vendorId: "microsoft-teams", note: "Enterprise M365 + Copilot" },
      { category: "cloud-ai", vendorId: "microsoft-azure", note: "Enterprise cloud + AI" },
      { category: "cybersecurity", vendorId: "huntress", note: "Managed EDR + SIEM" },
      { category: "cybersecurity", vendorId: "knowbe4", note: "Security training at scale" },
      { category: "accounting", vendorId: "sage-intacct", note: "Multi-entity fund accounting" },
      { category: "compliance-audit", vendorId: "medtrainer", note: "Enterprise compliance" },
      { category: "patient-engagement", vendorId: "luma-health", note: "AI-powered access" },
      { category: "patient-engagement", vendorId: "phreesia", note: "Enterprise intake + SDOH" },
      { category: "patient-engagement", vendorId: "caremessage", note: "SMS for under-resourced populations" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

export function getVendorsByCategory(category: TechCategory): TechVendor[] {
  return TECH_VENDORS.filter((v) => v.category === category);
}

export function getHighFitVendors(): TechVendor[] {
  return TECH_VENDORS.filter((v) => v.fqhcFit === "high");
}

export function getVendorsByEHR(ehr: string): TechVendor[] {
  return TECH_VENDORS.filter((v) =>
    v.ehrIntegrations.some((e) => e.ehr === ehr && e.level !== "none"),
  );
}

export function getVendorsWithDiscounts(): TechVendor[] {
  return TECH_VENDORS.filter((v) => v.fqhcDiscount !== null);
}

export function getNACHCPartners(): TechVendor[] {
  return TECH_VENDORS.filter((v) => v.nachcPartner);
}

export function getTechStackStats(): {
  totalVendors: number;
  totalCategories: number;
  highFitCount: number;
  nachcPartnerCount: number;
  discountCount: number;
} {
  return {
    totalVendors: TECH_VENDORS.length,
    totalCategories: TECH_CATEGORIES.length,
    highFitCount: TECH_VENDORS.filter((v) => v.fqhcFit === "high").length,
    nachcPartnerCount: TECH_VENDORS.filter((v) => v.nachcPartner).length,
    discountCount: TECH_VENDORS.filter((v) => v.fqhcDiscount !== null).length,
  };
}

export function getCategoryMeta(id: TechCategory): TechCategoryMeta | undefined {
  return TECH_CATEGORIES.find((c) => c.id === id);
}

export function getTechStackProfile(id: string): TechStackProfile | undefined {
  return TECH_STACK_PROFILES.find((p) => p.id === id);
}
