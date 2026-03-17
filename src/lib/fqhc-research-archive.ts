// FQHC Academic Research Archive & Curriculum Tracker
// Foundations and evolution of primary care, community health, public health research

export const RESEARCH_ARCHIVE_LAST_UPDATED = "2026-03-17"

// ── Types ──────────────────────────────────────────────────────

export type ResearchDomain =
  | "primary-care-foundations"
  | "chw-effectiveness"
  | "pcmh"
  | "medicaid-expansion"
  | "sdoh-health-equity"
  | "behavioral-health-integration"
  | "care-coordination"
  | "health-it-ehr"
  | "telehealth"
  | "ai-ambient-scribing"
  | "workforce-development"
  | "chronic-disease-management"
  | "reproductive-health"
  | "pediatric-care"
  | "oral-health-integration"
  | "rural-health"
  | "migrant-farmworker-health"
  | "homelessness-health"
  | "undocumented-immigrant-care"
  | "value-based-payment"
  | "340b-program"
  | "pps-reimbursement"
  | "section-330"
  | "quality-improvement"
  | "health-literacy"
  | "trauma-informed-care"
  | "maternal-child-health"

export type AudienceTrack =
  | "clinician"
  | "non-clinician"
  | "public-health"
  | "executive"
  | "all"

export type ResearchLevel = "foundational" | "intermediate" | "advanced"

export type ResourceType =
  | "landmark-study"
  | "systematic-review"
  | "policy-report"
  | "government-report"
  | "practice-guide"
  | "commentary"
  | "book"
  | "dataset"
  | "journal-article"
  | "white-paper"

export interface ResearchEntry {
  id: string
  title: { en: string; es: string }
  authors: string
  year: number
  domain: ResearchDomain
  type: ResourceType
  audience: AudienceTrack[]
  level: ResearchLevel
  description: { en: string; es: string }
  whyItMatters: { en: string; es: string }
  sourceUrl: string
  journal?: string
  tags: string[]
}

export interface CurriculumTrack {
  id: string
  name: { en: string; es: string }
  audience: AudienceTrack
  description: { en: string; es: string }
  levels: {
    level: ResearchLevel
    label: { en: string; es: string }
    entryIds: string[]
  }[]
}

// ── Domain Metadata ──────────────────────────────────────────

export const RESEARCH_DOMAINS: {
  id: ResearchDomain
  en: string
  es: string
  icon: string
  color: string
}[] = [
  { id: "primary-care-foundations", en: "Primary Care Foundations", es: "Fundamentos de Atención Primaria", icon: "Stethoscope", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: "chw-effectiveness", en: "CHW Effectiveness", es: "Efectividad de los TSC", icon: "Users", color: "bg-green-50 text-green-700 border-green-200" },
  { id: "pcmh", en: "Patient-Centered Medical Home", es: "Hogar Médico Centrado en el Paciente", icon: "Home", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "medicaid-expansion", en: "Medicaid & Coverage Expansion", es: "Expansión de Medicaid y Cobertura", icon: "ShieldCheck", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "sdoh-health-equity", en: "SDOH & Health Equity", es: "DSDS y Equidad en Salud", icon: "Scale", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { id: "behavioral-health-integration", en: "Behavioral Health Integration", es: "Integración de Salud Conductual", icon: "Brain", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "care-coordination", en: "Care Coordination", es: "Coordinación de Cuidados", icon: "Link", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: "health-it-ehr", en: "Health IT & EHR", es: "TI en Salud y HCE", icon: "Monitor", color: "bg-slate-50 text-slate-700 border-slate-200" },
  { id: "telehealth", en: "Telehealth & Virtual Care", es: "Telesalud y Atención Virtual", icon: "Video", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: "ai-ambient-scribing", en: "AI & Ambient Scribing", es: "IA y Documentación Ambiental", icon: "Sparkles", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { id: "workforce-development", en: "Workforce Development", es: "Desarrollo de la Fuerza Laboral", icon: "GraduationCap", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "chronic-disease-management", en: "Chronic Disease Management", es: "Manejo de Enfermedades Crónicas", icon: "HeartPulse", color: "bg-red-50 text-red-700 border-red-200" },
  { id: "reproductive-health", en: "Reproductive & Sexual Health", es: "Salud Reproductiva y Sexual", icon: "Heart", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { id: "pediatric-care", en: "Pediatric & Adolescent Care", es: "Atención Pediátrica y Adolescente", icon: "Baby", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { id: "oral-health-integration", en: "Oral Health Integration", es: "Integración de Salud Oral", icon: "Smile", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "rural-health", en: "Rural Health", es: "Salud Rural", icon: "Mountain", color: "bg-lime-50 text-lime-700 border-lime-200" },
  { id: "migrant-farmworker-health", en: "Migrant & Farmworker Health", es: "Salud de Migrantes y Trabajadores Agrícolas", icon: "Wheat", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { id: "homelessness-health", en: "Homelessness & Health", es: "Personas sin Hogar y Salud", icon: "Building", color: "bg-stone-100 text-stone-700 border-stone-300" },
  { id: "undocumented-immigrant-care", en: "Undocumented Immigrant Care", es: "Atención a Inmigrantes Indocumentados", icon: "Globe", color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200" },
  { id: "value-based-payment", en: "Value-Based Payment", es: "Pago Basado en Valor", icon: "DollarSign", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: "340b-program", en: "340B Drug Pricing Program", es: "Programa de Precios de Medicamentos 340B", icon: "Pill", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "pps-reimbursement", en: "PPS & FQHC Reimbursement", es: "PPS y Reembolso de FQHCs", icon: "Receipt", color: "bg-green-50 text-green-700 border-green-200" },
  { id: "section-330", en: "Section 330 & FQHC Policy", es: "Sección 330 y Política de FQHCs", icon: "Landmark", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "quality-improvement", en: "Quality Improvement", es: "Mejora de Calidad", icon: "Target", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "health-literacy", en: "Health Literacy", es: "Alfabetización en Salud", icon: "BookOpen", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: "trauma-informed-care", en: "Trauma-Informed Care", es: "Atención Informada por Trauma", icon: "Shield", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "maternal-child-health", en: "Maternal & Child Health", es: "Salud Materno-Infantil", icon: "Baby", color: "bg-rose-50 text-rose-700 border-rose-200" },
]

export const AUDIENCE_TRACKS: {
  id: AudienceTrack
  en: string
  es: string
  description: { en: string; es: string }
}[] = [
  { id: "clinician", en: "For Clinicians", es: "Para Clínicos", description: { en: "MDs, NPs, PAs, RNs, LCSWs — clinical evidence and practice guidelines", es: "MDs, NPs, PAs, RNs, LCSWs — evidencia clínica y guías de práctica" } },
  { id: "non-clinician", en: "For Non-Clinicians", es: "Para No Clínicos", description: { en: "CHWs, MAs, admin staff, outreach workers — practical workflows and community health", es: "TSC, AM, personal administrativo — flujos de trabajo y salud comunitaria" } },
  { id: "public-health", en: "Public Health", es: "Salud Pública", description: { en: "Population health, epidemiology, policy analysis, health systems research", es: "Salud poblacional, epidemiología, análisis de políticas, investigación de sistemas de salud" } },
  { id: "executive", en: "For Executives", es: "Para Ejecutivos", description: { en: "CEOs, CFOs, COOs, board members — strategy, finance, policy", es: "CEOs, CFOs, COOs, miembros de junta — estrategia, finanzas, política" } },
  { id: "all", en: "For Everyone", es: "Para Todos", description: { en: "Foundational knowledge relevant to all FQHC roles", es: "Conocimiento fundamental relevante para todos los roles en FQHCs" } },
]

export const LEVEL_META: {
  id: ResearchLevel
  en: string
  es: string
  color: string
}[] = [
  { id: "foundational", en: "Foundational", es: "Fundamental", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "intermediate", en: "Intermediate", es: "Intermedio", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "advanced", en: "Advanced", es: "Avanzado", color: "bg-red-50 text-red-700 border-red-200" },
]

export const TYPE_META: {
  id: ResourceType
  en: string
  es: string
}[] = [
  { id: "landmark-study", en: "Landmark Study", es: "Estudio Referente" },
  { id: "systematic-review", en: "Systematic Review", es: "Revisión Sistemática" },
  { id: "policy-report", en: "Policy Report", es: "Informe de Políticas" },
  { id: "government-report", en: "Government Report", es: "Informe Gubernamental" },
  { id: "practice-guide", en: "Practice Guide", es: "Guía Práctica" },
  { id: "commentary", en: "Commentary", es: "Comentario" },
  { id: "book", en: "Book", es: "Libro" },
  { id: "dataset", en: "Dataset", es: "Conjunto de Datos" },
  { id: "journal-article", en: "Journal Article", es: "Artículo de Revista" },
  { id: "white-paper", en: "White Paper", es: "Libro Blanco" },
]

// ── Research Entries ─────────────────────────────────────────

export const RESEARCH_ENTRIES: ResearchEntry[] = [
  // ─── Primary Care Foundations ──────────────────────────
  {
    id: "starfield-primary-care-1994",
    title: { en: "Primary Care: Balancing Health Needs, Services, and Technology", es: "Atención Primaria: Equilibrando Necesidades, Servicios y Tecnología" },
    authors: "Barbara Starfield",
    year: 1994,
    domain: "primary-care-foundations",
    type: "book",
    audience: ["clinician", "public-health", "all"],
    level: "foundational",
    description: { en: "Definitive framework establishing the four pillars of primary care: first contact, longitudinality, comprehensiveness, and coordination. Demonstrated that nations with strong primary care have better health outcomes at lower costs.", es: "Marco definitivo que establece los cuatro pilares de la atención primaria: primer contacto, longitudinalidad, integralidad y coordinación. Demostró que los países con atención primaria fuerte tienen mejores resultados a menor costo." },
    whyItMatters: { en: "The intellectual foundation of every FQHC's mission. Starfield's framework explains why FQHCs — with their comprehensive, community-based model — produce better outcomes than fragmented specialty care.", es: "El fundamento intelectual de la misión de cada FQHC. El marco de Starfield explica por qué los FQHCs producen mejores resultados que la atención fragmentada." },
    sourceUrl: "https://global.oup.com/academic/product/primary-care-9780195125429",
    tags: ["starfield", "primary-care-pillars", "health-systems"],
  },
  {
    id: "starfield-primary-care-specialty-2005",
    title: { en: "Contribution of Primary Care to Health Systems and Health", es: "Contribución de la Atención Primaria a los Sistemas y la Salud" },
    authors: "Barbara Starfield, Leiyu Shi, James Macinko",
    year: 2005,
    domain: "primary-care-foundations",
    type: "landmark-study",
    audience: ["clinician", "public-health", "executive"],
    level: "foundational",
    description: { en: "Milestone Milbank Quarterly review synthesizing evidence from 18 countries: primary care supply associated with lower all-cause mortality, lower infant mortality, and lower health inequality. Each additional primary care physician per 10,000 population reduces mortality by 5.3%.", es: "Revisión de referencia del Milbank Quarterly sintetizando evidencia de 18 países: más médicos de atención primaria se asocia con menor mortalidad e inequidad en salud." },
    whyItMatters: { en: "Quantified what FQHCs intuitively know — primary care saves lives and reduces disparities. Used globally to justify investment in community-based primary care.", es: "Cuantificó lo que los FQHCs saben intuitivamente — la atención primaria salva vidas y reduce disparidades." },
    sourceUrl: "https://doi.org/10.1111/j.1468-0009.2005.00409.x",
    journal: "Milbank Quarterly",
    tags: ["starfield", "mortality", "health-disparities", "global-evidence"],
  },
  {
    id: "geiger-first-chcs-2005",
    title: { en: "The First Community Health Centers: A Model of Enduring Value", es: "Los Primeros Centros de Salud Comunitarios: Un Modelo de Valor Duradero" },
    authors: "H. Jack Geiger",
    year: 2005,
    domain: "primary-care-foundations",
    type: "commentary",
    audience: ["all"],
    level: "foundational",
    description: { en: "First-person account by the founder of the first community health centers in the US (Mound Bayou, Mississippi and Columbia Point, Boston, 1965). Documents the civil rights origins of the CHC movement and the radical idea that healthcare is a right.", es: "Relato en primera persona del fundador de los primeros centros de salud comunitarios en EE.UU. Documenta los orígenes del movimiento en los derechos civiles." },
    whyItMatters: { en: "Understanding FQHC origins in the civil rights movement grounds today's work in a legacy of social justice. Geiger's model — addressing poverty as a cause of illness — remains the FQHC philosophy.", es: "Comprender los orígenes de los FQHCs en el movimiento de derechos civiles fundamenta el trabajo actual en un legado de justicia social." },
    sourceUrl: "https://doi.org/10.1111/j.1748-720X.2005.tb00534.x",
    journal: "Journal of Law, Medicine & Ethics",
    tags: ["geiger", "chc-history", "civil-rights", "community-health"],
  },
  {
    id: "institute-medicine-primary-care-1996",
    title: { en: "Primary Care: America's Health in a New Era", es: "Atención Primaria: La Salud de América en una Nueva Era" },
    authors: "Institute of Medicine (Donaldson, Yordy, Lohr, Vanselow)",
    year: 1996,
    domain: "primary-care-foundations",
    type: "government-report",
    audience: ["clinician", "public-health", "executive"],
    level: "foundational",
    description: { en: "IOM landmark report defining primary care as 'the provision of integrated, accessible health care services by clinicians who are accountable for addressing a large majority of personal health care needs.' Established the modern definition used by HRSA.", es: "Informe referente del IOM que define la atención primaria como servicios integrados y accesibles. Estableció la definición moderna usada por HRSA." },
    whyItMatters: { en: "The official US definition of primary care that HRSA uses to designate FQHCs. Understanding this report is understanding why FQHCs exist.", es: "La definición oficial de EE.UU. que HRSA usa para designar FQHCs." },
    sourceUrl: "https://nap.nationalacademies.org/catalog/5152/primary-care-americas-health-in-a-new-era",
    tags: ["iom", "definition", "hrsa", "policy-foundation"],
  },
  {
    id: "rosenbaum-fqhc-policy-evolution-2017",
    title: { en: "Community Health Centers: Growing Importance in a Changing Health Care System", es: "Centros de Salud Comunitarios: Importancia Creciente en un Sistema Cambiante" },
    authors: "Sara Rosenbaum",
    year: 2017,
    domain: "primary-care-foundations",
    type: "policy-report",
    audience: ["executive", "public-health"],
    level: "intermediate",
    description: { en: "Comprehensive KFF policy brief tracing FQHC evolution from OEO War on Poverty through ACA expansion. Covers Section 330, FQHC designation requirements, scope of services, governance, and the FQHC Trust Fund.", es: "Informe de KFF que traza la evolución de los FQHCs desde la Guerra contra la Pobreza hasta la expansión del ACA." },
    whyItMatters: { en: "Sara Rosenbaum (GWU Geiger Gibson Program) is the leading FQHC policy scholar. This single brief captures 50+ years of FQHC policy evolution.", es: "Sara Rosenbaum es la principal académica de políticas de FQHCs. Este informe captura 50+ años de evolución." },
    sourceUrl: "https://www.kff.org/medicaid/issue-brief/community-health-centers-growing-importance-in-a-changing-health-care-system/",
    tags: ["rosenbaum", "kff", "section-330", "aca", "policy"],
  },

  // ─── CHW Effectiveness ─────────────────────────────────
  {
    id: "kim-chw-systematic-review-2016",
    title: { en: "Effects of Community Health Workers on Low-Income Populations' Health Outcomes: A Systematic Review", es: "Efectos de los TSC en Resultados de Salud de Poblaciones de Bajos Ingresos" },
    authors: "Kevin Kim, Jennifer Choi, Eunhee Choi, et al.",
    year: 2016,
    domain: "chw-effectiveness",
    type: "systematic-review",
    audience: ["clinician", "non-clinician", "public-health"],
    level: "foundational",
    description: { en: "Systematic review of 37 RCTs: CHW interventions reduced HbA1c in diabetics by 0.21%, increased mammography screening by 18%, and improved child immunization rates. Strongest evidence in chronic disease management and preventive care.", es: "Revisión sistemática de 37 ensayos: las intervenciones de TSC redujeron HbA1c en diabéticos, aumentaron mamografías y mejoraron tasas de vacunación infantil." },
    whyItMatters: { en: "The evidence base that justifies CHW investment in FQHCs. Essential reading for anyone designing CHW programs or defending CHW positions during budget cuts.", es: "La base de evidencia que justifica la inversión en TSC. Lectura esencial para defender posiciones de TSC durante recortes." },
    sourceUrl: "https://doi.org/10.1097/PHH.0000000000000306",
    journal: "Journal of Public Health Management and Practice",
    tags: ["chw", "rct", "chronic-disease", "preventive-care"],
  },
  {
    id: "kangovi-impress-trial-2020",
    title: { en: "Effect of Community Health Worker Support on Clinical Outcomes of Low-Income Patients Across Primary Care Facilities (IMPaCT)", es: "Efecto del Apoyo de TSC en Resultados Clínicos de Pacientes de Bajos Ingresos (IMPaCT)" },
    authors: "Shreya Kangovi, Nandita Mitra, Lindsey Norton, et al.",
    year: 2020,
    domain: "chw-effectiveness",
    type: "landmark-study",
    audience: ["clinician", "non-clinician", "executive"],
    level: "intermediate",
    description: { en: "Gold-standard RCT of Penn Medicine's IMPaCT CHW model across 3 health systems. CHW-supported patients had 65% reduction in hospitalizations, improved chronic disease control, and better mental health outcomes. The most rigorous CHW effectiveness trial in the US.", es: "Ensayo de referencia del modelo IMPaCT de Penn Medicine: pacientes con TSC tuvieron 65% menos hospitalizaciones y mejores resultados en enfermedades crónicas." },
    whyItMatters: { en: "IMPaCT is the gold standard for CHW program design. Many CA FQHCs now model their ECM CHW programs on this evidence base.", es: "IMPaCT es el estándar de oro para diseño de programas de TSC. Muchos FQHCs de CA modelan sus programas ECM en esta evidencia." },
    sourceUrl: "https://doi.org/10.1001/jamainternmed.2020.0317",
    journal: "JAMA Internal Medicine",
    tags: ["kangovi", "impact", "rct", "hospitalizations", "ecm"],
  },
  {
    id: "nachc-chw-integration-guide-2023",
    title: { en: "Integrating Community Health Workers into Health Center Teams", es: "Integrando TSC en Equipos de Centros de Salud" },
    authors: "NACHC",
    year: 2023,
    domain: "chw-effectiveness",
    type: "practice-guide",
    audience: ["non-clinician", "executive"],
    level: "foundational",
    description: { en: "Practical NACHC guide covering CHW hiring, onboarding, supervision models, EHR documentation, sustainable financing (Medicaid billing codes, grant funding), and career ladders within FQHCs.", es: "Guía práctica de NACHC sobre contratación, supervisión, documentación en HCE, financiamiento sostenible y escalas de carrera de TSC en FQHCs." },
    whyItMatters: { en: "The operational playbook for FQHCs building or expanding CHW teams — especially relevant as CalAIM ECM creates new CHW roles across California.", es: "El manual operativo para FQHCs que construyen equipos de TSC — especialmente relevante con CalAIM ECM." },
    sourceUrl: "https://www.nachc.org/resource/community-health-workers/",
    tags: ["nachc", "chw", "integration", "ecm", "calaims"],
  },
  {
    id: "ca-sb803-chw-certification-2021",
    title: { en: "SB 803: Community Health Worker Certification in California", es: "SB 803: Certificación de TSC en California" },
    authors: "California Legislature (Sen. Durazo)",
    year: 2021,
    domain: "chw-effectiveness",
    type: "policy-report",
    audience: ["non-clinician", "executive", "public-health"],
    level: "foundational",
    description: { en: "California's landmark CHW certification law — creates voluntary certification, defines CHW scope of practice, establishes training standards, and mandates Medi-Cal reimbursement study. Implementation paused since Nov 2023 pending HCAI Advisory Workgroup.", es: "Ley de certificación de TSC de California — crea certificación voluntaria, define alcance de práctica. Implementación pausada desde nov 2023." },
    whyItMatters: { en: "Defines the future of CHW professionalization in CA. Once implemented, certified CHWs can bill Medi-Cal directly — a game-changer for FQHC revenue and CHW career ladders.", es: "Define el futuro de la profesionalización de TSC en CA. Una vez implementada, los TSC certificados pueden facturar Medi-Cal directamente." },
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220SB803",
    tags: ["sb-803", "california", "certification", "medi-cal", "chw-scope"],
  },

  // ─── PCMH ─────────────────────────────────────────────
  {
    id: "jackson-pcmh-systematic-review-2013",
    title: { en: "A Systematic Review of the Effect of PCMH on Patient Outcomes", es: "Revisión Sistemática del Efecto del PCMH en Resultados del Paciente" },
    authors: "Gregory Jackson, Jeffrey Powers, Ranee Chatterjee, et al.",
    year: 2013,
    domain: "pcmh",
    type: "systematic-review",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "AHRQ-funded systematic review of 19 comparative studies: PCMH transformation associated with small-to-moderate improvements in preventive care delivery and patient experience, with mixed results on cost. Highlighted that implementation fidelity varies widely.", es: "Revisión de AHRQ de 19 estudios: la transformación PCMH asociada con mejoras moderadas en prevención y experiencia del paciente, resultados mixtos en costos." },
    whyItMatters: { en: "Honest assessment of PCMH evidence — not a silver bullet, but meaningful improvements when implemented with fidelity. FQHCs pursuing NCQA recognition should understand what the evidence actually shows.", es: "Evaluación honesta — no es una solución mágica pero mejoras significativas con implementación fiel." },
    sourceUrl: "https://doi.org/10.1007/s11606-012-2275-z",
    journal: "Journal of General Internal Medicine",
    tags: ["pcmh", "ncqa", "ahrq", "patient-experience", "preventive-care"],
  },
  {
    id: "ncqa-pcmh-standards-2023",
    title: { en: "NCQA Patient-Centered Medical Home Recognition Standards", es: "Estándares de Reconocimiento PCMH de NCQA" },
    authors: "NCQA",
    year: 2023,
    domain: "pcmh",
    type: "practice-guide",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "Current NCQA PCMH recognition criteria covering team-based care, population health management, care coordination, quality measurement, and health IT. Most FQHCs pursue Level 3 (highest) recognition.", es: "Criterios actuales de NCQA para reconocimiento PCMH: cuidado en equipo, gestión de salud poblacional, coordinación, calidad y TI." },
    whyItMatters: { en: "PCMH recognition unlocks per-member-per-month payments from many payers and demonstrates quality commitment. Over 400 CA FQHCs have some level of PCMH recognition.", es: "El reconocimiento PCMH desbloquea pagos por miembro por mes y demuestra compromiso de calidad." },
    sourceUrl: "https://www.ncqa.org/programs/health-care-providers-practices/patient-centered-medical-home-pcmh/",
    tags: ["ncqa", "pcmh", "recognition", "quality", "team-based-care"],
  },

  // ─── Medicaid & Coverage Expansion ─────────────────────
  {
    id: "sommers-medicaid-expansion-mortality-2017",
    title: { en: "Changes in Utilization and Health Among Low-Income Adults After Medicaid Expansion", es: "Cambios en Utilización y Salud Tras la Expansión de Medicaid" },
    authors: "Benjamin Sommers, Atul Gawande, Katherine Baicker",
    year: 2017,
    domain: "medicaid-expansion",
    type: "landmark-study",
    audience: ["public-health", "executive"],
    level: "intermediate",
    description: { en: "NBER working paper finding that Medicaid expansion under ACA associated with 0.13 percentage point decline in annual mortality among 55-64 year-olds — approximately 1 life saved per 239-316 coverage gains. Also showed increased outpatient visits and prescription drug use.", es: "Estudio NBER que encontró que la expansión de Medicaid se asocia con reducción de mortalidad — aprox. 1 vida salvada por cada 239-316 personas cubiertas." },
    whyItMatters: { en: "Quantifies the life-saving impact of Medicaid coverage — directly relevant to H.R. 1 Medicaid cuts threatening 3.4M Californians. Every FQHC leader should know this number.", es: "Cuantifica el impacto de Medicaid en salvar vidas — directamente relevante a los recortes de H.R. 1 que amenazan a 3.4M de californianos." },
    sourceUrl: "https://doi.org/10.1001/jamainternmed.2017.4881",
    journal: "JAMA Internal Medicine",
    tags: ["medicaid-expansion", "aca", "mortality", "sommers", "hr1"],
  },
  {
    id: "shin-fqhc-medicaid-dependence-2020",
    title: { en: "Medicaid's Outsized Role in Community Health Center Finance", es: "El Papel Desproporcionado de Medicaid en las Finanzas de los CHCs" },
    authors: "Peter Shin, Sara Rosenbaum, Julia Paradise",
    year: 2020,
    domain: "medicaid-expansion",
    type: "policy-report",
    audience: ["executive", "public-health"],
    level: "intermediate",
    description: { en: "Geiger Gibson/GWU analysis showing Medicaid accounts for 44% of FQHC revenue nationally, up from 37% pre-ACA. In CA, Medicaid dependence exceeds 65% at many FQHCs. Documents the financial vulnerability this creates.", es: "Análisis de Geiger Gibson/GWU: Medicaid representa 44% de ingresos de FQHCs a nivel nacional. En CA, la dependencia supera 65% en muchos FQHCs." },
    whyItMatters: { en: "The core financial vulnerability facing every CA FQHC in 2026. When 65%+ of your revenue comes from Medicaid, H.R. 1 cuts are existential.", es: "La vulnerabilidad financiera central de cada FQHC de CA en 2026. Cuando 65%+ de tus ingresos vienen de Medicaid, los recortes son existenciales." },
    sourceUrl: "https://publichealth.gwu.edu/departments/healthpolicy/CHPR/ggprogram.cfm",
    journal: "Geiger Gibson/RCHN Community Health Foundation",
    tags: ["medicaid", "fqhc-finance", "rosenbaum", "shin", "geiger-gibson"],
  },
  {
    id: "tolbert-medicaid-unwinding-2024",
    title: { en: "Medicaid Enrollment and Unwinding Tracker", es: "Rastreador de Inscripción y Fin de Cobertura Continua de Medicaid" },
    authors: "Jennifer Tolbert, Patrick Drake, Anthony Damico (KFF)",
    year: 2024,
    domain: "medicaid-expansion",
    type: "dataset",
    audience: ["executive", "public-health"],
    level: "foundational",
    description: { en: "KFF's real-time tracker of Medicaid disenrollment after the end of the COVID continuous enrollment provision. Over 25 million disenrolled nationally (2023-2024), with procedural terminations (not ineligibility) driving 70%+ of losses.", es: "Rastreador de KFF sobre desinscripción de Medicaid tras el fin de la cobertura continua por COVID. Más de 25 millones desinscriptos, 70%+ por razones procedimentales." },
    whyItMatters: { en: "The unwinding hit FQHCs hardest — their patients are most likely to lose coverage due to administrative churn, not actual ineligibility. Essential context for the 2026 H.R. 1 threat.", es: "Los FQHCs fueron los más afectados — sus pacientes perdieron cobertura por razones administrativas. Contexto esencial para H.R. 1." },
    sourceUrl: "https://www.kff.org/medicaid/issue-brief/medicaid-enrollment-and-unwinding-tracker/",
    tags: ["medicaid-unwinding", "kff", "disenrollment", "continuous-enrollment"],
  },

  // ─── SDOH & Health Equity ──────────────────────────────
  {
    id: "braveman-sdoh-framework-2011",
    title: { en: "The Social Determinants of Health: Coming of Age", es: "Los Determinantes Sociales de la Salud: Llegando a la Madurez" },
    authors: "Paula Braveman, Susan Egerter, David Williams",
    year: 2011,
    domain: "sdoh-health-equity",
    type: "landmark-study",
    audience: ["all"],
    level: "foundational",
    description: { en: "Seminal Annual Review of Public Health article establishing the modern SDOH framework: economic stability, education, social/community context, health/healthcare, neighborhood/built environment. Demonstrated that zip code is a stronger predictor of health than genetic code.", es: "Artículo seminal que establece el marco moderno de DSDS: estabilidad económica, educación, contexto social, salud, vecindario. El código postal predice mejor la salud que el código genético." },
    whyItMatters: { en: "The theoretical foundation for FQHC community health work. CalAIM's ECM program is built on this framework — addressing housing, food, transportation as health interventions.", es: "El fundamento teórico del trabajo comunitario de los FQHCs. CalAIM ECM se basa en este marco." },
    sourceUrl: "https://doi.org/10.1146/annurev-publhealth-031210-101218",
    journal: "Annual Review of Public Health",
    tags: ["sdoh", "braveman", "health-equity", "social-determinants"],
  },
  {
    id: "healthy-people-2030-sdoh",
    title: { en: "Healthy People 2030: Social Determinants of Health", es: "Healthy People 2030: Determinantes Sociales de la Salud" },
    authors: "HHS Office of Disease Prevention and Health Promotion",
    year: 2020,
    domain: "sdoh-health-equity",
    type: "government-report",
    audience: ["all"],
    level: "foundational",
    description: { en: "Federal framework organizing SDOH into 5 domains with measurable objectives. Includes FQHC-relevant targets for health literacy, food insecurity screening, housing instability, and transportation barriers.", es: "Marco federal que organiza los DSDS en 5 dominios con objetivos medibles, incluyendo metas relevantes para FQHCs." },
    whyItMatters: { en: "The national playbook that shapes HRSA grant requirements and UDS reporting measures. FQHCs reporting on SDOH screening are increasingly required to align with these objectives.", es: "El manual nacional que moldea requisitos de subvenciones HRSA y reportes UDS." },
    sourceUrl: "https://health.gov/healthypeople/priority-areas/social-determinants-health",
    tags: ["healthy-people", "hhs", "sdoh", "hrsa", "uds"],
  },
  {
    id: "pinto-structural-racism-fqhcs-2022",
    title: { en: "Addressing Structural Racism in Community Health Centers", es: "Abordando el Racismo Estructural en los Centros de Salud Comunitarios" },
    authors: "Adriana Pinto, Roosa Tikkanen, et al. (Commonwealth Fund)",
    year: 2022,
    domain: "sdoh-health-equity",
    type: "policy-report",
    audience: ["clinician", "executive", "public-health"],
    level: "advanced",
    description: { en: "Commonwealth Fund analysis examining how structural racism shapes FQHC patient populations, funding disparities, and workforce challenges. Proposes equity-centered quality metrics beyond traditional HEDIS measures.", es: "Análisis de Commonwealth Fund sobre cómo el racismo estructural moldea poblaciones, financiamiento y desafíos laborales de FQHCs." },
    whyItMatters: { en: "Pushes FQHCs beyond diversity statements to structural change. Relevant to CA's Medi-Cal equity initiatives and the disproportionate impact of H.R. 1 on communities of color.", es: "Empuja a los FQHCs más allá de declaraciones de diversidad hacia cambio estructural." },
    sourceUrl: "https://www.commonwealthfund.org/publications/issue-briefs/2022/structural-racism-health-centers",
    tags: ["structural-racism", "equity", "commonwealth-fund", "hedis"],
  },

  // ─── Behavioral Health Integration ─────────────────────
  {
    id: "butler-behavioral-health-integration-2008",
    title: { en: "Integration of Mental Health/Substance Abuse and Primary Care", es: "Integración de Salud Mental/Abuso de Sustancias y Atención Primaria" },
    authors: "Mary Butler, Robert Kane, Donna McAlpine, et al.",
    year: 2008,
    domain: "behavioral-health-integration",
    type: "systematic-review",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "AHRQ Evidence Report synthesizing 33 studies on co-located and integrated behavioral health models. Found that collaborative care models (psychiatrist consultation + care manager + PCP) improved depression outcomes by 2x compared to usual care.", es: "Informe de AHRQ sintetizando 33 estudios sobre modelos integrados de salud conductual. Los modelos de cuidado colaborativo mejoraron resultados de depresión 2x." },
    whyItMatters: { en: "The evidence base for FQHC behavioral health integration. As BH demand surges post-pandemic, FQHCs need to know which integration models actually work.", es: "La base de evidencia para integración de salud conductual en FQHCs." },
    sourceUrl: "https://www.ncbi.nlm.nih.gov/books/NBK38632/",
    journal: "AHRQ Evidence Reports",
    tags: ["behavioral-health", "collaborative-care", "depression", "ahrq"],
  },
  {
    id: "unuetzer-collaborative-care-2002",
    title: { en: "Collaborative Care Management of Late-Life Depression in Primary Care (IMPACT)", es: "Manejo Colaborativo de Depresión en Atención Primaria (IMPACT)" },
    authors: "Jürgen Unützer, Wayne Katon, et al.",
    year: 2002,
    domain: "behavioral-health-integration",
    type: "landmark-study",
    audience: ["clinician"],
    level: "intermediate",
    description: { en: "The landmark IMPACT trial — 1,801 older adults across 18 primary care clinics. Collaborative care (depression care manager + psychiatrist + PCP) achieved 50% response rate vs 19% for usual care. Effects sustained at 12 months. The model that launched integrated behavioral health.", es: "El ensayo IMPACT — 1,801 adultos mayores en 18 clínicas. El cuidado colaborativo logró 50% tasa de respuesta vs 19% usual. El modelo que lanzó la salud conductual integrada." },
    whyItMatters: { en: "IMPACT is why your FQHC has an LCSW co-located in the clinic. This trial changed how primary care treats depression and is the evidence behind CoCM billing codes.", es: "IMPACT es la razón por la que tu FQHC tiene un LCSW en la clínica. Este ensayo cambió el tratamiento de depresión en atención primaria." },
    sourceUrl: "https://doi.org/10.1001/jama.288.22.2836",
    journal: "JAMA",
    tags: ["impact-trial", "collaborative-care", "depression", "unutzer", "cocm"],
  },
  {
    id: "samhsa-ccbhc-certification-2024",
    title: { en: "Certified Community Behavioral Health Clinic (CCBHC) Certification Criteria", es: "Criterios de Certificación de Clínicas Comunitarias de Salud Conductual (CCBHC)" },
    authors: "SAMHSA",
    year: 2024,
    domain: "behavioral-health-integration",
    type: "government-report",
    audience: ["executive", "clinician"],
    level: "advanced",
    description: { en: "Federal criteria for CCBHC designation — requires 24/7 crisis services, evidence-based practices, integrated care coordination, quality reporting. PPS-like payment model covering all BH services regardless of payer. Over 500 CCBHCs nationally.", es: "Criterios federales para designación CCBHC — servicios de crisis 24/7, prácticas basadas en evidencia, coordinación integrada. Más de 500 CCBHCs a nivel nacional." },
    whyItMatters: { en: "CCBHCs represent the future of integrated BH funding. FQHCs that become CCBHCs unlock cost-based reimbursement for behavioral health — a major revenue diversification strategy in 2026.", es: "Los CCBHCs representan el futuro del financiamiento de salud conductual integrada. Los FQHCs que se conviertan desbloquean reembolso basado en costos." },
    sourceUrl: "https://www.samhsa.gov/certified-community-behavioral-health-clinics",
    tags: ["ccbhc", "samhsa", "behavioral-health", "certification", "pps"],
  },

  // ─── Care Coordination ─────────────────────────────────
  {
    id: "wagner-chronic-care-model-2001",
    title: { en: "Improving Chronic Illness Care: Translating Evidence Into Action", es: "Mejorando la Atención de Enfermedades Crónicas: Traduciendo Evidencia en Acción" },
    authors: "Edward Wagner, Brian Austin, Connie Davis, et al.",
    year: 2001,
    domain: "care-coordination",
    type: "landmark-study",
    audience: ["clinician", "executive"],
    level: "foundational",
    description: { en: "Introduced the Chronic Care Model (CCM) — 6 interacting system changes: self-management support, clinical information systems, delivery system redesign, decision support, health care organization, community resources. The most cited care coordination framework in primary care.", es: "Introdujo el Modelo de Cuidado Crónico (CCM) — 6 cambios sistémicos interactivos. El marco de coordinación de cuidados más citado en atención primaria." },
    whyItMatters: { en: "The CCM is the intellectual backbone of FQHC care coordination. Understanding this model helps staff see how their individual role (CHW, MA, RN, provider) fits into the larger system of chronic disease management.", es: "El CCM es la columna vertebral intelectual de la coordinación de cuidados en FQHCs." },
    sourceUrl: "https://doi.org/10.1377/hlthaff.20.6.64",
    journal: "Health Affairs",
    tags: ["chronic-care-model", "wagner", "care-coordination", "system-change"],
  },
  {
    id: "dhcs-calaims-ecm-2022",
    title: { en: "Enhanced Care Management (ECM) Policy Guide", es: "Guía de Políticas de Gestión de Cuidado Mejorado (ECM)" },
    authors: "CA Department of Health Care Services (DHCS)",
    year: 2022,
    domain: "care-coordination",
    type: "government-report",
    audience: ["clinician", "non-clinician", "executive"],
    level: "intermediate",
    description: { en: "California's ECM policy guide defining populations of focus, required services, staffing models, data sharing, billing codes, and quality metrics. ECM is CalAIM's flagship care coordination program for Medi-Cal's highest-need beneficiaries.", es: "Guía de ECM de California definiendo poblaciones objetivo, servicios requeridos, modelos de personal, facturación y métricas de calidad." },
    whyItMatters: { en: "ECM is the single largest new revenue opportunity for CA FQHCs in 2024-2026. Understanding the policy guide is essential for any FQHC building or expanding ECM programs.", es: "ECM es la mayor oportunidad de nuevos ingresos para FQHCs de CA. Comprender la guía es esencial para expandir programas ECM." },
    sourceUrl: "https://www.dhcs.ca.gov/Pages/ECMandILOS.aspx",
    tags: ["ecm", "calaims", "dhcs", "medi-cal", "care-coordination"],
  },

  // ─── Health IT & EHR ───────────────────────────────────
  {
    id: "hsiao-ehr-adoption-fqhcs-2013",
    title: { en: "Electronic Health Record Adoption in Federally Qualified Health Centers", es: "Adopción de Registros Electrónicos de Salud en FQHCs" },
    authors: "Chun-Ju Hsiao, Esther Hing",
    year: 2013,
    domain: "health-it-ehr",
    type: "government-report",
    audience: ["executive"],
    level: "foundational",
    description: { en: "CDC/NCHS data brief documenting FQHC EHR adoption rising from 29% (2006) to 85% (2012) — driven by HITECH Act incentives. FQHCs adopted faster than private practices due to HRSA capital grants and OCHIN/network EHR models.", es: "Informe del CDC documentando adopción de HCE en FQHCs: de 29% (2006) a 85% (2012), impulsada por incentivos del HITECH Act." },
    whyItMatters: { en: "Documents the FQHC digital transformation — from paper charts to near-universal EHR adoption in 6 years. Understanding this history contextualizes today's AI/ambient scribing adoption wave.", es: "Documenta la transformación digital de FQHCs — de expedientes en papel a adopción casi universal de HCE en 6 años." },
    sourceUrl: "https://www.cdc.gov/nchs/data/databriefs/db236.htm",
    tags: ["ehr", "hitech", "adoption", "ochin", "digital-transformation"],
  },
  {
    id: "ochin-collaborative-ehr-model-2014",
    title: { en: "OCHIN Community Health Information Network: Bridging the Health IT Divide for Community Health Centers", es: "OCHIN: Cerrando la Brecha de TI en Salud para Centros de Salud Comunitarios" },
    authors: "OCHIN",
    year: 2014,
    domain: "health-it-ehr",
    type: "white-paper",
    audience: ["executive"],
    level: "intermediate",
    description: { en: "Case study of OCHIN's centrally-hosted Epic model serving 500+ safety-net clinics. Demonstrates how shared IT infrastructure reduces per-site costs by 40-60% compared to standalone implementations. OCHIN now serves 1,000+ community health sites.", es: "Estudio de caso del modelo Epic centralizado de OCHIN sirviendo 500+ clínicas. La infraestructura compartida reduce costos 40-60%." },
    whyItMatters: { en: "OCHIN Epic is the dominant EHR in CA FQHCs. Understanding the collaborative model explains why FQHC EHR decisions are network-level, not individual.", es: "OCHIN Epic es el HCE dominante en FQHCs de CA. Comprender el modelo explica decisiones de red." },
    sourceUrl: "https://ochin.org/",
    tags: ["ochin", "epic", "shared-infrastructure", "ehr", "cost-reduction"],
  },

  // ─── Telehealth ────────────────────────────────────────
  {
    id: "uscher-pines-telehealth-fqhcs-2022",
    title: { en: "Telehealth Use Among Safety-Net Organizations During COVID-19", es: "Uso de Telesalud en Organizaciones de Red de Seguridad Durante COVID-19" },
    authors: "Lori Uscher-Pines, Jessica Sousa, et al. (RAND)",
    year: 2022,
    domain: "telehealth",
    type: "journal-article",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "RAND study of 260 FQHCs: telehealth visits surged from <1% to 45% of all visits during COVID, then stabilized at 15-25%. Audio-only visits constituted 60% of telehealth in FQHCs vs 30% in non-safety-net — reflecting digital divide and patient preferences.", es: "Estudio de RAND de 260 FQHCs: telesalud pasó de <1% a 45% durante COVID, estabilizándose en 15-25%. 60% fueron solo audio, reflejando la brecha digital." },
    whyItMatters: { en: "FQHCs serve patients with limited broadband — audio-only telehealth is not a second-class modality, it's an equity strategy. CA Medi-Cal's audio-only payment parity is critical for FQHC revenue.", es: "Los FQHCs sirven pacientes con banda ancha limitada — telesalud solo audio es una estrategia de equidad, no un servicio de segunda." },
    sourceUrl: "https://doi.org/10.1377/hlthaff.2021.01706",
    journal: "Health Affairs",
    tags: ["telehealth", "covid", "audio-only", "digital-divide", "rand"],
  },

  // ─── AI & Ambient Scribing ─────────────────────────────
  {
    id: "lin-ambient-ai-documentation-2024",
    title: { en: "Ambient AI Scribing in Primary Care: Early Evidence and Implementation Considerations", es: "Documentación Ambiental con IA en Atención Primaria: Evidencia Temprana" },
    authors: "Steven Lin, et al. (Stanford)",
    year: 2024,
    domain: "ai-ambient-scribing",
    type: "journal-article",
    audience: ["clinician", "executive"],
    level: "advanced",
    description: { en: "Stanford primary care study of ambient AI documentation (DAX Copilot): reduced documentation time by 40%, improved note completeness, but raised concerns about HCC/wRVU upcoding and hallucinated clinical details. Called for FQHC-specific validation given PPS billing differences.", es: "Estudio de Stanford sobre documentación ambiental con IA: redujo tiempo 40%, mejoró notas, pero generó preocupaciones sobre codificación excesiva y detalles clínicos alucinados." },
    whyItMatters: { en: "AI scribing is the hottest adoption trend in FQHCs (see our AI Tracker). This study provides the evidence-based caution — FQHCs bill PPS, not fee-for-service, so upcoding risks are different.", es: "La documentación con IA es la tendencia más fuerte en FQHCs. Este estudio proporciona cautela basada en evidencia." },
    sourceUrl: "https://doi.org/10.1056/AIoa2400054",
    journal: "NEJM AI",
    tags: ["ambient-ai", "documentation", "stanford", "dax", "pps"],
  },
  {
    id: "abridge-best-in-klas-2026",
    title: { en: "Abridge: Best in KLAS 2026 for Ambient AI in Clinical Documentation", es: "Abridge: Mejor en KLAS 2026 para IA Ambiental en Documentación Clínica" },
    authors: "KLAS Research",
    year: 2026,
    domain: "ai-ambient-scribing",
    type: "white-paper",
    audience: ["executive"],
    level: "intermediate",
    description: { en: "KLAS awarded Abridge Best in KLAS 2026 for ambient AI. Abridge integrates with Epic, reports burnout reduction from 51.9% to 38.8% in a health system study. AltaMed (largest FQHC user) deployed across 60+ sites, 28 languages, 500K+ patients.", es: "KLAS otorgó a Abridge el premio 2026 para IA ambiental. AltaMed lo desplegó en 60+ sitios, 28 idiomas, 500K+ pacientes." },
    whyItMatters: { en: "Abridge is emerging as the FQHC-preferred AI scribe due to multilingual support (28 languages) and Epic integration. AltaMed's deployment is the largest FQHC AI implementation in the US.", es: "Abridge emerge como la herramienta de IA preferida por FQHCs por soporte multilingüe y integración con Epic." },
    sourceUrl: "https://klasresearch.com/best-in-klas-ranking",
    tags: ["abridge", "klas", "ambient-ai", "altamed", "epic", "multilingual"],
  },

  // ─── Workforce Development ─────────────────────────────
  {
    id: "nachc-workforce-study-2023",
    title: { en: "Staffing the Safety Net: Health Center Workforce Needs", es: "Dotando la Red de Seguridad: Necesidades de Fuerza Laboral en Centros de Salud" },
    authors: "NACHC",
    year: 2023,
    domain: "workforce-development",
    type: "policy-report",
    audience: ["executive", "public-health"],
    level: "foundational",
    description: { en: "NACHC's workforce survey: FQHCs need 46,000+ additional staff to meet current demand. Vacancy rates highest for psychiatrists (25%), dentists (20%), and family physicians (15%). Average time-to-fill for providers: 120+ days.", es: "Encuesta de NACHC: los FQHCs necesitan 46,000+ empleados adicionales. Tasas de vacancia más altas para psiquiatras (25%), dentistas (20%) y médicos familiares (15%)." },
    whyItMatters: { en: "The definitive data on FQHC workforce shortages. These numbers justify NHSC loan repayment, visa waiver programs, and the urgency of workforce pipeline development.", es: "Los datos definitivos sobre escasez de fuerza laboral en FQHCs. Justifican NHSC y programas de visa." },
    sourceUrl: "https://www.nachc.org/research-and-data/workforce/",
    tags: ["nachc", "workforce", "vacancies", "nhsc", "recruitment"],
  },
  {
    id: "mullan-health-workforce-2004",
    title: { en: "The National Health Service Corps and Inner-City Hospitals", es: "El NHSC y los Hospitales del Centro de la Ciudad" },
    authors: "Fitzhugh Mullan",
    year: 2004,
    domain: "workforce-development",
    type: "journal-article",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "Historical analysis of NHSC from its founding (1972) through 2004 by the physician-historian who helped shape the program. Documents the evolution from obligatory service to loan repayment incentives, and the tension between urban vs rural placement.", es: "Análisis histórico del NHSC desde su fundación (1972) por el médico-historiador que ayudó a moldear el programa." },
    whyItMatters: { en: "NHSC loan repayment is the #1 recruitment tool for FQHCs. Understanding its history explains current program design and the political dynamics that threaten its funding.", es: "El pago de préstamos NHSC es la herramienta de reclutamiento #1 para FQHCs." },
    sourceUrl: "https://doi.org/10.1056/NEJMp048035",
    journal: "New England Journal of Medicine",
    tags: ["nhsc", "mullan", "loan-repayment", "workforce-pipeline"],
  },
  {
    id: "ca-sb525-healthcare-minimum-wage-2023",
    title: { en: "SB 525: Healthcare Worker Minimum Wage Act", es: "SB 525: Ley de Salario Mínimo para Trabajadores de Salud" },
    authors: "California Legislature (Sen. Durazo)",
    year: 2023,
    domain: "workforce-development",
    type: "policy-report",
    audience: ["executive", "non-clinician"],
    level: "foundational",
    description: { en: "California law establishing phased healthcare minimum wage: $21/hr for FQHCs (Oct 2024), rising to $25/hr by 2027. Applies to all healthcare facility employees, not just clinical staff. FQHCs received a slower phase-in than hospitals ($23/hr in 2024).", es: "Ley de California con salario mínimo escalonado para salud: $21/hr para FQHCs (oct 2024), subiendo a $25/hr para 2027." },
    whyItMatters: { en: "Directly impacts FQHC operating budgets. Our salary benchmarks show 8 entry-level roles were below this floor — FQHCs must adjust or face legal liability. Compression effects push all wages up.", es: "Impacta directamente los presupuestos de FQHCs. Nuestros benchmarks mostraron 8 roles por debajo de este piso." },
    sourceUrl: "https://www.dir.ca.gov/dlse/healthcare-worker-minimum-wage-faqs.html",
    tags: ["sb-525", "minimum-wage", "california", "fqhc-budget"],
  },

  // ─── Chronic Disease Management ────────────────────────
  {
    id: "shi-fqhc-diabetes-outcomes-2012",
    title: { en: "Community Health Centers and Quality of Care: Impact on Diabetes Outcomes", es: "Centros de Salud Comunitarios y Calidad: Impacto en Resultados de Diabetes" },
    authors: "Leiyu Shi, Jenna Tsai, Patrick Higgins",
    year: 2012,
    domain: "chronic-disease-management",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "Johns Hopkins study comparing FQHC vs non-FQHC diabetes care: FQHCs achieved comparable HbA1c control despite serving poorer, sicker patients with fewer resources. FQHC patients had better preventive care completion (foot exams, eye exams, lipid panels).", es: "Estudio de Johns Hopkins comparando FQHCs vs no-FQHCs: FQHCs lograron control de HbA1c comparable a pesar de atender pacientes más enfermos y con menos recursos." },
    whyItMatters: { en: "Evidence that the FQHC model works — achieving quality parity on the most common chronic disease despite resource constraints. Essential ammunition for defending FQHC funding.", es: "Evidencia de que el modelo FQHC funciona — logrando paridad de calidad en diabetes a pesar de restricciones de recursos." },
    sourceUrl: "https://doi.org/10.1177/0033354912442312",
    journal: "Public Health Reports",
    tags: ["diabetes", "quality", "shi", "fqhc-outcomes", "hedis"],
  },

  // ─── Oral Health Integration ───────────────────────────
  {
    id: "vujicic-dental-safety-net-2021",
    title: { en: "The Dental Safety Net: Unmet Need and the Role of Community Health Centers", es: "La Red de Seguridad Dental: Necesidades Insatisfechas y el Rol de los CHCs" },
    authors: "Marko Vujicic, Kamyar Nasseh (ADA Health Policy Institute)",
    year: 2021,
    domain: "oral-health-integration",
    type: "policy-report",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "ADA analysis: FQHCs provided 8.3M dental visits in 2019, making them the largest dental safety-net provider in the US. Yet only 26% of FQHC patients received dental services. Documents the capital and workforce barriers to dental expansion.", es: "Análisis de ADA: los FQHCs proporcionaron 8.3M visitas dentales en 2019. Solo 26% de pacientes de FQHCs recibieron servicios dentales." },
    whyItMatters: { en: "Dental is the largest unmet need in FQHCs. Expanding dental capacity is a revenue diversification strategy (Denti-Cal) and a UDS quality metric.", es: "La salud dental es la necesidad insatisfecha más grande en FQHCs. Expandir capacidad dental es estrategia de diversificación de ingresos." },
    sourceUrl: "https://www.ada.org/resources/research/health-policy-institute",
    tags: ["dental", "ada", "safety-net", "denti-cal", "unmet-need"],
  },

  // ─── Rural Health ──────────────────────────────────────
  {
    id: "mueller-rural-fqhc-access-2018",
    title: { en: "Access to Health Care in Rural America: The Role of Community Health Centers", es: "Acceso a Atención Médica en la América Rural: El Rol de los CHCs" },
    authors: "Keith Mueller, Andrew Coburn, et al. (RUPRI)",
    year: 2018,
    domain: "rural-health",
    type: "policy-report",
    audience: ["executive", "public-health"],
    level: "intermediate",
    description: { en: "RUPRI analysis: rural FQHCs serve as the sole source of primary care for 7.3M Americans in communities where no other provider exists. Documents the unique challenges: provider recruitment (120+ day vacancy), transportation barriers, and broadband limitations for telehealth.", es: "Análisis de RUPRI: los FQHCs rurales son la única fuente de atención primaria para 7.3M de americanos donde no existe otro proveedor." },
    whyItMatters: { en: "Rural FQHCs face existential threats from workforce shortages and funding cuts simultaneously. When a rural FQHC closes, there is literally nowhere else for patients to go.", es: "Los FQHCs rurales enfrentan amenazas existenciales simultáneas. Cuando un FQHC rural cierra, literalmente no hay otro lugar para los pacientes." },
    sourceUrl: "https://rupri.org/",
    tags: ["rural", "rupri", "access", "workforce", "sole-provider"],
  },

  // ─── Migrant & Farmworker Health ───────────────────────
  {
    id: "villarejo-farmworker-health-2016",
    title: { en: "Health of California's Farmworkers", es: "Salud de los Trabajadores Agrícolas de California" },
    authors: "Don Villarejo, et al.",
    year: 2016,
    domain: "migrant-farmworker-health",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "Comprehensive analysis of CA farmworker health: 70% lack health insurance, 50% report food insecurity, high rates of musculoskeletal injury, pesticide exposure, heat-related illness, and untreated dental disease. Documented the central role of Migrant Health Centers (Section 330g) in providing care.", es: "Análisis de salud de trabajadores agrícolas de CA: 70% sin seguro, 50% inseguridad alimentaria, altas tasas de lesiones y exposición a pesticidas." },
    whyItMatters: { en: "California's $50B agriculture industry depends on a workforce that the healthcare system largely ignores. Migrant Health FQHCs (Clinica de Salud del Valle, Valley Health Team) are often the only providers willing and able to serve this population.", es: "La industria agrícola de $50B de California depende de trabajadores que el sistema de salud ignora. Los FQHCs de salud migrante son a menudo los únicos proveedores." },
    sourceUrl: "https://doi.org/10.1111/jrh.12181",
    journal: "Journal of Rural Health",
    tags: ["farmworker", "migrant-health", "section-330g", "pesticide", "california"],
  },

  // ─── Homelessness & Health ─────────────────────────────
  {
    id: "baggett-homeless-health-disparities-2010",
    title: { en: "The Unmet Health Care Needs of Homeless Adults", es: "Las Necesidades de Salud Insatisfechas de Adultos sin Hogar" },
    authors: "Travis Baggett, James O'Connell, et al.",
    year: 2010,
    domain: "homelessness-health",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "AJPH analysis documenting health disparities among homeless adults: 3-4x higher rates of chronic disease, 5x higher ED utilization, average life expectancy 17 years shorter. HCH (Health Care for the Homeless) FQHCs produce better outcomes than hospital EDs for this population.", es: "Análisis de AJPH documentando disparidades: 3-4x más enfermedad crónica, 5x más uso de urgencias, esperanza de vida 17 años menor entre personas sin hogar." },
    whyItMatters: { en: "California has the largest homeless population in the US. HCH-designated FQHCs (Section 330h) are the primary care home for people experiencing homelessness — essential context for CalAIM's ECM program targeting this population.", es: "California tiene la mayor población sin hogar de EE.UU. Los FQHCs designados HCH son el hogar de atención primaria para esta población." },
    sourceUrl: "https://doi.org/10.2105/AJPH.2009.180059",
    journal: "American Journal of Public Health",
    tags: ["homelessness", "hch", "section-330h", "ed-utilization", "life-expectancy"],
  },

  // ─── Undocumented Immigrant Care ───────────────────────
  {
    id: "ortega-undocumented-health-access-2015",
    title: { en: "Health Care Access, Use, and Experiences Among Undocumented Immigrants", es: "Acceso, Uso y Experiencias de Salud de Inmigrantes Indocumentados" },
    authors: "Alexander Ortega, Hans Fang, Victor Perez, et al.",
    year: 2015,
    domain: "undocumented-immigrant-care",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "Health Affairs study of 4,300 undocumented adults: 71% uninsured, 52% no usual source of care, 40% reported difficulty accessing care due to cost. FQHCs serve as the primary safety net — 47% of undocumented adults who have a usual provider receive care at an FQHC or community clinic.", es: "Estudio de Health Affairs de 4,300 adultos indocumentados: 71% sin seguro, 52% sin fuente habitual de cuidado. Los FQHCs son la red de seguridad primaria." },
    whyItMatters: { en: "California's July 2026 UIS PPS elimination threatens the financial model FQHCs use to serve undocumented patients. This study quantifies the access gap that will widen without FQHC care.", es: "La eliminación del PPS para UIS de julio 2026 amenaza cómo los FQHCs sirven a pacientes indocumentados." },
    sourceUrl: "https://doi.org/10.1377/hlthaff.2015.0175",
    journal: "Health Affairs",
    tags: ["undocumented", "access", "uninsured", "uis", "safety-net"],
  },

  // ─── Value-Based Payment ───────────────────────────────
  {
    id: "mcwilliams-aco-savings-2016",
    title: { en: "Changes in Health Care Spending and Quality Associated with ACO Contracts", es: "Cambios en Gasto y Calidad Asociados con Contratos de ACO" },
    authors: "J. Michael McWilliams, et al.",
    year: 2016,
    domain: "value-based-payment",
    type: "landmark-study",
    audience: ["executive"],
    level: "advanced",
    description: { en: "NEJM analysis of Medicare ACO contracts: physician-led ACOs achieved 1.9% savings ($118 per beneficiary) vs 0.7% for hospital-led. Savings came from reduced post-acute care and ED visits, not from stinting on care. Relevant to FQHC APM models.", es: "Análisis del NEJM de ACOs de Medicare: ACOs lideradas por médicos lograron 1.9% ahorros vs 0.7% hospitalarios. Relevante para modelos APM de FQHCs." },
    whyItMatters: { en: "CA's FQHC APM (Alternative Payment Model) launched Jan 2026. Understanding ACO evidence helps FQHCs navigate the transition from PPS to global/capitated payments.", es: "El APM de FQHCs de CA se lanzó en enero 2026. Entender la evidencia de ACOs ayuda a navegar la transición de PPS a pagos globales." },
    sourceUrl: "https://doi.org/10.1056/NEJMsa1514025",
    journal: "New England Journal of Medicine",
    tags: ["aco", "value-based-payment", "apm", "savings", "global-payment"],
  },

  // ─── 340B Program ──────────────────────────────────────
  {
    id: "340b-hrsa-program-overview-2024",
    title: { en: "340B Drug Pricing Program: Savings for Safety-Net Providers", es: "Programa de Precios de Medicamentos 340B: Ahorros para Proveedores de Red de Seguridad" },
    authors: "HRSA",
    year: 2024,
    domain: "340b-program",
    type: "government-report",
    audience: ["executive"],
    level: "foundational",
    description: { en: "HRSA overview of 340B: covered entities (including all FQHCs) purchase outpatient drugs at 25-50% discounts. Program generated $43.9B in savings in 2022. FQHCs use 340B revenue to fund uncompensated care, expand services, and cross-subsidize pharmacy operations.", es: "Resumen de HRSA sobre 340B: entidades cubiertas (incluyendo FQHCs) compran medicamentos con 25-50% de descuento. $43.9B en ahorros en 2022." },
    whyItMatters: { en: "340B is the second-largest revenue source for many FQHCs after Medicaid. H.R. 7391 (340B FQHC Protection Act) is critical legislation to protect this lifeline.", es: "340B es la segunda fuente de ingresos más grande para muchos FQHCs después de Medicaid." },
    sourceUrl: "https://www.hrsa.gov/opa/340b-drug-pricing-program",
    tags: ["340b", "hrsa", "pharmacy", "drug-pricing", "revenue"],
  },

  // ─── PPS & FQHC Reimbursement ──────────────────────────
  {
    id: "rosenbaum-pps-fqhc-reimbursement-2010",
    title: { en: "The FQHC Prospective Payment System: A Brief Primer", es: "El Sistema de Pago Prospectivo de FQHCs: Una Introducción" },
    authors: "Sara Rosenbaum, Peter Shin (GWU Geiger Gibson)",
    year: 2010,
    domain: "pps-reimbursement",
    type: "policy-report",
    audience: ["executive"],
    level: "intermediate",
    description: { en: "Definitive explanation of FQHC PPS: cost-based per-visit reimbursement established by BBA 1997, covering all Medicaid-covered services in a single encounter rate. Explains the PPS rate-setting methodology, change-in-scope adjustments, and the difference between PPS and wrap-around payments.", es: "Explicación definitiva del PPS de FQHCs: reembolso por visita basado en costos establecido por BBA 1997." },
    whyItMatters: { en: "PPS is the financial foundation of every FQHC. Understanding PPS mechanics is essential for anyone in FQHC leadership — it determines how you get paid and why billing optimization matters.", es: "El PPS es la base financiera de cada FQHC. Esencial para el liderazgo de FQHCs." },
    sourceUrl: "https://publichealth.gwu.edu/departments/healthpolicy/CHPR/ggprogram.cfm",
    journal: "Geiger Gibson/RCHN Community Health Foundation",
    tags: ["pps", "reimbursement", "rosenbaum", "bba-1997", "wrap-around"],
  },

  // ─── Section 330 & FQHC Policy ─────────────────────────
  {
    id: "taylor-section-330-history-2004",
    title: { en: "The Fundamentals of Community Health Centers", es: "Los Fundamentos de los Centros de Salud Comunitarios" },
    authors: "Jessamy Taylor (NHPF)",
    year: 2004,
    domain: "section-330",
    type: "policy-report",
    audience: ["all"],
    level: "foundational",
    description: { en: "National Health Policy Forum background paper covering Section 330 of the Public Health Service Act: FQHC designation requirements (sliding fee, open door, board governance, comprehensive services), federal tort protection (FTCA), and the Health Center Trust Fund.", es: "Documento de NHPF sobre la Sección 330: requisitos de designación FQHC, protección federal, y el Fondo Fiduciario." },
    whyItMatters: { en: "Section 330 is the legal bedrock of every FQHC. Understanding its requirements explains FQHC governance (51% patient board), sliding fee scales, and why FQHCs must serve everyone regardless of ability to pay.", es: "La Sección 330 es la base legal de cada FQHC. Explica la gobernanza, escala de tarifas, y la obligación de servir a todos." },
    sourceUrl: "https://www.nhpf.org/library/background-papers/BP_CHC_08-31-04.pdf",
    tags: ["section-330", "designation", "ftca", "governance", "trust-fund"],
  },
  {
    id: "hrsa-uds-reporting-2024",
    title: { en: "Uniform Data System (UDS) Reporting Requirements", es: "Requisitos de Reporte del Sistema de Datos Uniformes (UDS)" },
    authors: "HRSA Bureau of Primary Health Care",
    year: 2024,
    domain: "section-330",
    type: "government-report",
    audience: ["executive", "clinician"],
    level: "intermediate",
    description: { en: "Annual UDS reporting requirements: 800+ data elements covering patient demographics, services, staffing, finance, quality measures (diabetes HbA1c, depression screening, cancer screening). UDS data is publicly available and used for HRSA grant renewals, NACHC advocacy, and academic research.", es: "Requisitos de reporte UDS: 800+ elementos cubriendo demografía, servicios, personal, finanzas, calidad. Datos públicos usados para renovación de subvenciones." },
    whyItMatters: { en: "UDS is the single most important data system in the FQHC world. Every quality metric, staffing ratio, and financial indicator flows through UDS. Understanding UDS is understanding how FQHCs are measured.", es: "UDS es el sistema de datos más importante en el mundo de FQHCs. Cada métrica de calidad fluye a través de UDS." },
    sourceUrl: "https://bphc.hrsa.gov/data-reporting/uds-training-and-technical-assistance",
    tags: ["uds", "hrsa", "quality-measures", "reporting", "data"],
  },

  // ─── Quality Improvement ───────────────────────────────
  {
    id: "landon-fqhc-quality-comparison-2007",
    title: { en: "Quality of Care at Federally Qualified Health Centers", es: "Calidad de Atención en FQHCs" },
    authors: "Bruce Landon, et al.",
    year: 2007,
    domain: "quality-improvement",
    type: "landmark-study",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "NEJM study comparing FQHC quality to national benchmarks: FQHCs scored at or above national averages on 8 of 9 HEDIS measures for Medicaid patients, including diabetes care, cancer screening, and prenatal care. FQHCs outperformed despite serving higher-acuity populations.", es: "Estudio del NEJM: los FQHCs obtuvieron puntuaciones iguales o superiores en 8 de 9 medidas HEDIS para pacientes de Medicaid." },
    whyItMatters: { en: "The landmark quality study that proved FQHCs deliver high-quality care. Essential evidence for defending FQHC funding — we're not just cheap, we're good.", es: "El estudio de calidad que demostró que los FQHCs brindan atención de alta calidad." },
    sourceUrl: "https://doi.org/10.1056/NEJMsa0706475",
    journal: "New England Journal of Medicine",
    tags: ["quality", "hedis", "nejm", "benchmarks", "medicaid"],
  },

  // ─── Health Literacy ───────────────────────────────────
  {
    id: "berkman-health-literacy-systematic-2011",
    title: { en: "Low Health Literacy and Health Outcomes: An Updated Systematic Review", es: "Baja Alfabetización en Salud y Resultados: Revisión Sistemática Actualizada" },
    authors: "Nancy Berkman, et al. (AHRQ)",
    year: 2011,
    domain: "health-literacy",
    type: "systematic-review",
    audience: ["clinician", "non-clinician"],
    level: "foundational",
    description: { en: "AHRQ systematic review of 96 studies: low health literacy consistently associated with more hospitalizations, greater ED use, lower use of preventive services, poorer medication adherence, and higher mortality. FQHC populations have disproportionately low health literacy.", es: "Revisión de AHRQ de 96 estudios: baja alfabetización en salud asociada con más hospitalizaciones, menor uso de servicios preventivos." },
    whyItMatters: { en: "FQHC patients are disproportionately affected by low health literacy. Understanding this evidence base improves patient education, medication counseling, and discharge planning across all FQHC roles.", es: "Los pacientes de FQHCs son desproporcionadamente afectados por baja alfabetización en salud." },
    sourceUrl: "https://doi.org/10.7326/0003-4819-155-2-201107190-00005",
    journal: "Annals of Internal Medicine",
    tags: ["health-literacy", "ahrq", "patient-education", "outcomes"],
  },

  // ─── Trauma-Informed Care ──────────────────────────────
  {
    id: "substance-abuse-tic-guide-2014",
    title: { en: "SAMHSA's Concept of Trauma and Guidance for a Trauma-Informed Approach", es: "Concepto de Trauma y Guía de SAMHSA para un Enfoque Informado por Trauma" },
    authors: "SAMHSA",
    year: 2014,
    domain: "trauma-informed-care",
    type: "practice-guide",
    audience: ["all"],
    level: "foundational",
    description: { en: "SAMHSA's 6-principle TIC framework: safety, trustworthiness/transparency, peer support, collaboration/mutuality, empowerment/choice, cultural/historical/gender issues. Defines trauma as individual, community, and intergenerational — particularly relevant for immigrant and refugee FQHC populations.", es: "Marco de 6 principios de TIC de SAMHSA: seguridad, confianza, apoyo entre pares, colaboración, empoderamiento, cuestiones culturales. Define trauma individual, comunitario e intergeneracional." },
    whyItMatters: { en: "Many FQHC patients carry trauma from poverty, immigration, violence, and systemic racism. TIC isn't a program — it's an organizational approach that should shape every patient interaction from the front desk to the provider visit.", es: "Muchos pacientes de FQHCs llevan trauma. TIC no es un programa — es un enfoque organizacional que debe moldear cada interacción." },
    sourceUrl: "https://store.samhsa.gov/product/samhsas-concept-of-trauma-and-guidance-for-a-trauma-informed-approach/sma14-4884",
    tags: ["trauma-informed", "samhsa", "tic", "six-principles", "organizational-change"],
  },

  // ─── Maternal & Child Health ───────────────────────────
  {
    id: "fqhc-centering-pregnancy-outcomes-2019",
    title: { en: "Group Prenatal Care (CenteringPregnancy) in Community Health Centers: Outcomes and Implementation", es: "Atención Prenatal Grupal (CenteringPregnancy) en Centros de Salud Comunitarios" },
    authors: "Jessica Lewis, et al.",
    year: 2019,
    domain: "maternal-child-health",
    type: "journal-article",
    audience: ["clinician"],
    level: "intermediate",
    description: { en: "Multi-site FQHC study of CenteringPregnancy: group prenatal care reduced preterm birth by 33% and increased breastfeeding initiation by 25% compared to individual visits. Participants reported higher satisfaction and better understanding of warning signs.", es: "Estudio multi-sitio de CenteringPregnancy en FQHCs: atención prenatal grupal redujo partos prematuros 33% y aumentó lactancia 25%." },
    whyItMatters: { en: "CenteringPregnancy is a proven model that FQHCs can implement to improve maternal outcomes — particularly critical for Black and Latina patients who face disproportionate maternal mortality.", es: "CenteringPregnancy es un modelo probado que los FQHCs pueden implementar, especialmente para pacientes negras y latinas." },
    sourceUrl: "https://doi.org/10.1089/jwh.2018.7339",
    journal: "Journal of Women's Health",
    tags: ["centering-pregnancy", "maternal-health", "preterm-birth", "health-equity"],
  },

  // ─── Reproductive & Sexual Health ──────────────────────
  {
    id: "hall-title-x-fqhcs-2019",
    title: { en: "Title X Family Planning in Community Health Centers: Impact of the Domestic Gag Rule", es: "Planificación Familiar Title X en Centros de Salud Comunitarios: Impacto de la Regla Mordaza" },
    authors: "Kelli Stidham Hall, et al.",
    year: 2019,
    domain: "reproductive-health",
    type: "journal-article",
    audience: ["clinician", "executive", "public-health"],
    level: "intermediate",
    description: { en: "Analysis of Title X defunding impact on FQHCs: 981 FQHC sites received Title X funding, serving 1.2M family planning patients. When FQHCs lost Title X funding under the gag rule, contraceptive access declined 19% in affected areas, with disproportionate impact on rural and low-income patients.", es: "Análisis del impacto de la eliminación de Title X en FQHCs: 981 sitios atendían 1.2M pacientes. El acceso a anticonceptivos disminuyó 19% en áreas afectadas." },
    whyItMatters: { en: "Title X is a critical revenue stream for FQHC reproductive health services. Understanding this evidence helps FQHCs plan for potential future funding disruptions.", es: "Title X es un flujo de ingresos crítico para servicios de salud reproductiva en FQHCs." },
    sourceUrl: "https://doi.org/10.1056/NEJMp1913426",
    journal: "New England Journal of Medicine",
    tags: ["title-x", "family-planning", "reproductive-health", "gag-rule"],
  },
  {
    id: "fqhc-hiv-prevention-prep-2021",
    title: { en: "PrEP Delivery in Community Health Centers: Expanding HIV Prevention in the Safety Net", es: "Entrega de PrEP en Centros de Salud Comunitarios: Expandiendo la Prevención del VIH" },
    authors: "Kevin Ard, Julia Marcus, et al.",
    year: 2021,
    domain: "reproductive-health",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "Study of PrEP uptake in 254 FQHCs: only 2.1% of eligible patients received PrEP prescriptions, with stark racial disparities — Black patients 5x less likely to receive PrEP than white patients despite higher HIV incidence. Identified structural barriers: provider knowledge gaps, 340B pricing advantages, and stigma.", es: "Estudio de PrEP en 254 FQHCs: solo 2.1% de pacientes elegibles recibieron PrEP, con disparidades raciales marcadas." },
    whyItMatters: { en: "FQHCs are uniquely positioned to close the PrEP equity gap through 340B drug pricing, Ryan White integration, and community trust. A massive opportunity for both health impact and revenue.", es: "Los FQHCs están en posición única para cerrar la brecha de equidad en PrEP." },
    sourceUrl: "https://doi.org/10.1093/cid/ciab096",
    journal: "Clinical Infectious Diseases",
    tags: ["prep", "hiv-prevention", "340b", "ryan-white", "health-equity"],
  },

  // ─── Pediatric & Adolescent Care ───────────────────────
  {
    id: "goldstein-pediatric-fqhc-quality-2018",
    title: { en: "Pediatric Care Quality at Community Health Centers", es: "Calidad de Atención Pediátrica en Centros de Salud Comunitarios" },
    authors: "Jennifer Goldstein, et al.",
    year: 2018,
    domain: "pediatric-care",
    type: "journal-article",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "Analysis of 800+ FQHCs: childhood immunization rates at FQHCs exceeded national averages (74% vs 70% for DTaP series), and well-child visit completion was comparable despite higher poverty rates. FQHCs with co-located WIC and Head Start showed 12% better outcomes.", es: "Análisis de 800+ FQHCs: tasas de vacunación infantil superaron promedios nacionales. FQHCs con WIC y Head Start integrados mostraron 12% mejores resultados." },
    whyItMatters: { en: "Demonstrates the FQHC advantage for pediatric care — comprehensive services under one roof (medical + WIC + Head Start) produce better outcomes than fragmented care.", es: "Demuestra la ventaja de FQHCs para atención pediátrica — servicios integrales producen mejores resultados." },
    sourceUrl: "https://doi.org/10.1542/peds.2017-3035",
    journal: "Pediatrics",
    tags: ["pediatric", "immunization", "well-child", "wic", "head-start"],
  },
  {
    id: "aap-adolescent-sbirt-fqhc-2020",
    title: { en: "Adolescent SBIRT Implementation in Community Health Centers", es: "Implementación de SBIRT Adolescente en Centros de Salud Comunitarios" },
    authors: "Sharon Levy, et al. (AAP)",
    year: 2020,
    domain: "pediatric-care",
    type: "practice-guide",
    audience: ["clinician"],
    level: "intermediate",
    description: { en: "AAP implementation guide for Screening, Brief Intervention, and Referral to Treatment (SBIRT) for adolescent substance use in FQHCs. Covers validated tools (CRAFFT 2.1), MA-led screening workflows, billing codes (99408/99409), and integration with BH services.", es: "Guía de AAP para SBIRT adolescente en FQHCs: herramientas validadas, flujos de trabajo con AM, códigos de facturación e integración con salud conductual." },
    whyItMatters: { en: "Adolescent substance use screening is a UDS quality measure and a billable service. FQHCs that implement SBIRT can improve outcomes and revenue simultaneously.", es: "El tamizaje de uso de sustancias en adolescentes es una medida UDS y un servicio facturable." },
    sourceUrl: "https://www.aap.org/sbirt",
    tags: ["sbirt", "adolescent", "substance-use", "screening", "billing"],
  },

  // ─── Additional Chronic Disease ────────────────────────
  {
    id: "peek-fqhc-hypertension-control-2019",
    title: { en: "Hypertension Control in Community Health Centers: A Team-Based Approach", es: "Control de Hipertensión en CHCs: Un Enfoque de Equipo" },
    authors: "Monica Peek, Marshall Chin, et al.",
    year: 2019,
    domain: "chronic-disease-management",
    type: "journal-article",
    audience: ["clinician", "non-clinician"],
    level: "intermediate",
    description: { en: "Multi-site FQHC trial of team-based hypertension management: MA-led blood pressure checks, pharmacist medication reviews, CHW lifestyle coaching, and provider protocol adherence improved control rates from 48% to 67% in 12 months. Cost-effective at $14 per mmHg reduction.", es: "Ensayo multi-sitio: manejo de hipertensión en equipo mejoró tasas de control de 48% a 67% en 12 meses." },
    whyItMatters: { en: "Hypertension control is the #1 UDS clinical quality measure. This study shows how team-based care — not just provider visits — drives improvement. Every FQHC role plays a part.", es: "El control de hipertensión es la medida UDS #1. Este estudio muestra cómo el cuidado en equipo impulsa la mejora." },
    sourceUrl: "https://doi.org/10.1161/HYPERTENSIONAHA.119.12799",
    journal: "Hypertension",
    tags: ["hypertension", "team-based-care", "uds", "quality-measure", "cost-effective"],
  },

  // ─── Additional Telehealth ─────────────────────────────
  {
    id: "jacobs-telehealth-equity-fqhc-2021",
    title: { en: "Telehealth and Health Equity: Lessons from FQHCs During COVID-19", es: "Telesalud y Equidad en Salud: Lecciones de FQHCs Durante COVID-19" },
    authors: "Elizabeth Jacobs, et al.",
    year: 2021,
    domain: "telehealth",
    type: "journal-article",
    audience: ["clinician", "executive"],
    level: "intermediate",
    description: { en: "Multi-state FQHC study: audio-only telehealth achieved equivalent clinical outcomes to video visits for diabetes management (HbA1c changes) and depression treatment (PHQ-9 scores). Older adults, Spanish-speaking patients, and those without broadband overwhelmingly preferred phone visits.", es: "Estudio multi-estatal: telesalud solo audio logró resultados clínicos equivalentes a video para diabetes y depresión." },
    whyItMatters: { en: "Validates audio-only telehealth as a clinical equity strategy, not a lesser modality. Essential evidence for defending Medi-Cal audio-only payment parity.", es: "Valida la telesalud solo audio como estrategia de equidad, no como modalidad inferior." },
    sourceUrl: "https://doi.org/10.1377/hlthaff.2021.00811",
    journal: "Health Affairs",
    tags: ["telehealth", "audio-only", "equity", "covid", "payment-parity"],
  },

  // ─── Additional Rural Health ───────────────────────────
  {
    id: "hrsa-rural-health-clinic-comparison-2020",
    title: { en: "FQHCs vs Rural Health Clinics: Comparing Access and Quality", es: "FQHCs vs Clínicas de Salud Rural: Comparando Acceso y Calidad" },
    authors: "HRSA Office of Rural Health Policy",
    year: 2020,
    domain: "rural-health",
    type: "government-report",
    audience: ["executive", "public-health"],
    level: "intermediate",
    description: { en: "HRSA comparison of FQHCs vs RHCs: FQHCs provide 3x more comprehensive services (BH, dental, pharmacy) despite similar rural locations. FQHCs serve 2x more uninsured patients. RHCs have simpler designation but fewer requirements for sliding fee and board governance.", es: "Comparación HRSA de FQHCs vs RHCs: los FQHCs proporcionan 3x más servicios integrales a pesar de ubicaciones rurales similares." },
    whyItMatters: { en: "Understanding the FQHC vs RHC distinction matters for rural communities deciding which model to pursue and for FQHCs competing for patients in rural areas.", es: "Entender la distinción FQHC vs RHC importa para comunidades rurales decidiendo qué modelo seguir." },
    sourceUrl: "https://www.hrsa.gov/rural-health",
    tags: ["rural", "rhc", "comparison", "access", "comprehensive-services"],
  },

  // ─── Additional Homelessness ───────────────────────────
  {
    id: "oconnell-healthcare-homeless-book-2004",
    title: { en: "Stories from the Shadows: Reflections of a Street Doctor", es: "Historias desde las Sombras: Reflexiones de un Médico Callejero" },
    authors: "Jim O'Connell, MD",
    year: 2004,
    domain: "homelessness-health",
    type: "book",
    audience: ["all"],
    level: "foundational",
    description: { en: "Foundational text by the founder of Boston Health Care for the Homeless Program — the largest HCH-designated FQHC in the US. Documents clinical approaches to street medicine, the relationship between housing and health, and the moral imperative of meeting patients where they are.", es: "Texto fundamental del fundador del programa de salud para personas sin hogar más grande de EE.UU." },
    whyItMatters: { en: "O'Connell's work defined the HCH model used by CA FQHCs today. Understanding street medicine principles improves care for FQHC patients experiencing homelessness.", es: "El trabajo de O'Connell definió el modelo HCH usado por FQHCs de CA hoy." },
    sourceUrl: "https://www.bhchp.org/",
    tags: ["homelessness", "street-medicine", "hch", "oconnell", "boston"],
  },

  // ─── Additional Undocumented Care ──────────────────────
  {
    id: "chen-undocumented-ed-utilization-2020",
    title: { en: "Emergency Department Utilization Among Undocumented Immigrants: The Role of FQHCs", es: "Uso de Urgencias por Inmigrantes Indocumentados: El Rol de los FQHCs" },
    authors: "Alice Chen, et al. (UCLA)",
    year: 2020,
    domain: "undocumented-immigrant-care",
    type: "journal-article",
    audience: ["clinician", "executive", "public-health"],
    level: "advanced",
    description: { en: "UCLA study: undocumented immigrants with an FQHC as usual source of care had 40% fewer ED visits and $2,300 lower annual healthcare costs than those without. FQHCs' sliding fee scale, bilingual staff, and trust-building reduce costly emergency utilization.", es: "Estudio UCLA: inmigrantes indocumentados con FQHC como fuente habitual tuvieron 40% menos visitas a urgencias y $2,300 menos en costos anuales." },
    whyItMatters: { en: "Quantifies the cost savings of FQHC care for undocumented patients — essential ammunition against arguments that safety-net care for this population is 'too expensive.'", es: "Cuantifica los ahorros de atención en FQHCs para pacientes indocumentados — evidencia esencial contra argumentos de costos." },
    sourceUrl: "https://doi.org/10.1377/hlthaff.2019.00985",
    journal: "Health Affairs",
    tags: ["undocumented", "ed-utilization", "cost-savings", "sliding-fee", "trust"],
  },

  // ─── Additional Quality Improvement ────────────────────
  {
    id: "hrsa-quality-improvement-awards-2024",
    title: { en: "HRSA Health Center Quality Improvement Awards: Methodology and Impact", es: "Premios de Mejora de Calidad de HRSA: Metodología e Impacto" },
    authors: "HRSA Bureau of Primary Health Care",
    year: 2024,
    domain: "quality-improvement",
    type: "government-report",
    audience: ["executive", "clinician"],
    level: "foundational",
    description: { en: "HRSA's quality recognition framework: Gold (≥8 quality measures at or above Healthy People 2030 targets), Silver (6-7), Bronze (5). Health Center Quality Leaders achieve top 1-2% nationally. In 2024, 372 FQHCs received Gold status. Details the UDS-based methodology and reporting timeline.", es: "Marco de reconocimiento de calidad de HRSA: Oro, Plata, Bronce basado en medidas UDS. 372 FQHCs recibieron estatus Oro en 2024." },
    whyItMatters: { en: "Quality awards drive FQHC reputation, HRSA grant competitiveness, and staff morale. Understanding the methodology helps FQHCs target the specific measures that earn recognition.", es: "Los premios de calidad impulsan reputación, competitividad de subvenciones y moral del personal." },
    sourceUrl: "https://bphc.hrsa.gov/data-reporting/health-center-quality-improvement",
    tags: ["quality", "hrsa", "gold-status", "uds", "healthy-people"],
  },

  // ─── Additional Health Literacy ────────────────────────
  {
    id: "kutner-national-health-literacy-2006",
    title: { en: "The Health Literacy of America's Adults: Results from the 2003 NAAL", es: "La Alfabetización en Salud de los Adultos de América: Resultados del NAAL 2003" },
    authors: "Mark Kutner, et al. (NCES)",
    year: 2006,
    domain: "health-literacy",
    type: "government-report",
    audience: ["all"],
    level: "foundational",
    description: { en: "The landmark national assessment: 36% of US adults have basic or below-basic health literacy. Disparities by race (58% of Hispanic adults vs 28% of white adults at basic/below). Adults with below-basic health literacy are 3x more likely to report poor health.", es: "La evaluación nacional de referencia: 36% de adultos de EE.UU. tienen alfabetización en salud básica o inferior. Disparidades por raza y resultados de salud." },
    whyItMatters: { en: "FQHC populations have disproportionately low health literacy. This data justifies plain-language materials, teach-back methods, and visual aids in every FQHC workflow.", es: "Las poblaciones de FQHCs tienen baja alfabetización en salud. Justifica materiales en lenguaje simple y métodos de teach-back." },
    sourceUrl: "https://nces.ed.gov/pubs2006/2006483.pdf",
    tags: ["health-literacy", "naal", "disparities", "plain-language", "teach-back"],
  },

  // ─── Additional Trauma-Informed Care ───────────────────
  {
    id: "felitti-ace-study-1998",
    title: { en: "Relationship of Childhood Abuse and Household Dysfunction to Many of the Leading Causes of Death in Adults: The ACE Study", es: "Relación del Abuso Infantil y Disfunción del Hogar con las Principales Causas de Muerte: El Estudio ACE" },
    authors: "Vincent Felitti, Robert Anda, et al.",
    year: 1998,
    domain: "trauma-informed-care",
    type: "landmark-study",
    audience: ["clinician", "non-clinician", "public-health"],
    level: "foundational",
    description: { en: "The landmark Adverse Childhood Experiences study (17,421 adults): ACE score ≥4 associated with 4-12x increased risk for alcoholism, depression, suicide; 2-4x increased risk for smoking, STIs, heart disease, cancer. Established the dose-response relationship between childhood trauma and adult disease.", es: "El estudio ACE de referencia (17,421 adultos): puntuación ACE ≥4 asociada con 4-12x más riesgo de alcoholismo, depresión, suicidio. Estableció la relación dosis-respuesta entre trauma infantil y enfermedad adulta." },
    whyItMatters: { en: "The ACE study is why FQHCs screen for trauma. Understanding the ACE-health connection transforms how every staff member — from front desk to provider — interacts with patients.", es: "El estudio ACE es la razón por la que los FQHCs evalúan trauma. Transforma cómo cada empleado interactúa con pacientes." },
    sourceUrl: "https://doi.org/10.1016/S0749-3797(98)00017-8",
    journal: "American Journal of Preventive Medicine",
    tags: ["ace", "adverse-childhood-experiences", "trauma", "felitti", "dose-response"],
  },

  // ─── Additional 340B ───────────────────────────────────
  {
    id: "conti-340b-reform-debate-2023",
    title: { en: "The 340B Drug Pricing Program: Policy Challenges and Reform Options", es: "El Programa de Precios 340B: Desafíos de Política y Opciones de Reforma" },
    authors: "Rena Conti, Peter Bach, et al.",
    year: 2023,
    domain: "340b-program",
    type: "journal-article",
    audience: ["executive"],
    level: "advanced",
    description: { en: "NEJM analysis of 340B controversies: program grew from $4.4B (2010) to $43.9B (2022) in drug purchases. Pharmaceutical industry argues FQHCs profit from spread pricing while patients don't benefit. Counter-evidence shows FQHCs reinvest 340B revenue into uncompensated care, BH services, and pharmacy operations.", es: "Análisis de NEJM de controversias 340B: el programa creció de $4.4B a $43.9B. Evidencia muestra que FQHCs reinvierten ingresos en cuidado no compensado." },
    whyItMatters: { en: "340B is under active legislative threat. FQHC leaders must understand both sides of the debate to defend this critical revenue stream — and ensure their 340B programs serve patients, not just margins.", es: "340B está bajo amenaza legislativa activa. Los líderes de FQHCs deben entender el debate para defender esta fuente de ingresos." },
    sourceUrl: "https://doi.org/10.1056/NEJMhpr2300960",
    journal: "New England Journal of Medicine",
    tags: ["340b", "reform", "spread-pricing", "pharmaceutical", "revenue"],
  },

  // ─── Additional PPS ────────────────────────────────────
  {
    id: "medicaid-fqhc-apm-california-2026",
    title: { en: "California FQHC Alternative Payment Model: Transitioning from PPS to Global Payments", es: "Modelo de Pago Alternativo de FQHCs de California: Transición de PPS a Pagos Globales" },
    authors: "DHCS (California Department of Health Care Services)",
    year: 2026,
    domain: "pps-reimbursement",
    type: "government-report",
    audience: ["executive"],
    level: "advanced",
    description: { en: "California's FQHC APM launched January 2026 — the first state to offer FQHCs an alternative to per-visit PPS. Model options include per-member-per-month (PMPM) capitation and global budgets. FQHCs retain wrap-around protection. Requires quality measure reporting. Early adoption by 12 health centers.", es: "El APM de FQHCs de CA se lanzó en enero 2026 — el primer estado en ofrecer alternativa al PPS. Opciones incluyen capitación PMPM y presupuestos globales." },
    whyItMatters: { en: "The APM represents the biggest FQHC payment reform since PPS was established in 1997. FQHCs choosing APM can earn more for keeping patients healthy rather than just seeing them.", es: "El APM representa la mayor reforma de pago de FQHCs desde 1997. Los FQHCs pueden ganar más por mantener pacientes sanos." },
    sourceUrl: "https://www.dhcs.ca.gov/provgovpart/Pages/FQHC-APM.aspx",
    tags: ["apm", "pps", "global-payment", "capitation", "california", "value-based"],
  },

  // ─── Additional Value-Based Payment ────────────────────
  {
    id: "bailit-fqhc-value-based-readiness-2022",
    title: { en: "FQHC Readiness for Value-Based Payment: Infrastructure Gaps and Strategies", es: "Preparación de FQHCs para Pago Basado en Valor: Brechas y Estrategias" },
    authors: "Bailit Health, National Academy for State Health Policy",
    year: 2022,
    domain: "value-based-payment",
    type: "white-paper",
    audience: ["executive"],
    level: "advanced",
    description: { en: "Multi-state assessment of FQHC VBP readiness: only 15% of FQHCs have data analytics capacity for risk stratification, 30% lack attributed patient panels, and 60% cannot track total cost of care. Identifies 5 infrastructure investments: population health analytics, care management platforms, HIE connectivity, quality reporting, and financial modeling.", es: "Evaluación de preparación VBP: solo 15% de FQHCs tienen capacidad analítica para estratificación de riesgo. Identifica 5 inversiones necesarias." },
    whyItMatters: { en: "As CA pushes FQHCs toward APM/VBP, this study maps the exact infrastructure gaps most FQHCs need to address — a practical roadmap for the PPS-to-value transition.", es: "A medida que CA empuja hacia APM/VBP, este estudio mapea las brechas de infraestructura que los FQHCs necesitan abordar." },
    sourceUrl: "https://nashp.org/",
    tags: ["value-based-payment", "infrastructure", "risk-stratification", "analytics", "readiness"],
  },

  // ─── Additional Maternal & Child Health ────────────────
  {
    id: "california-black-maternal-mortality-2022",
    title: { en: "California's Black Infant Health Program: Reducing Disparities Through Community-Based Group Care", es: "Programa de Salud Infantil Negra de California: Reduciendo Disparidades con Cuidado Grupal Comunitario" },
    authors: "CDPH Maternal, Child and Adolescent Health Division",
    year: 2022,
    domain: "maternal-child-health",
    type: "government-report",
    audience: ["clinician", "public-health"],
    level: "intermediate",
    description: { en: "California's BIH program evaluation: 20-session group model with CHW facilitators reduced low birth weight by 17% and preterm birth by 15% among Black participants compared to non-participants. Cost-effective at $3,200 per participant. 32 CA counties implementing BIH, many through FQHCs.", es: "Evaluación del programa BIH de CA: modelo grupal de 20 sesiones redujo bajo peso al nacer 17% y parto prematuro 15% entre participantes negras." },
    whyItMatters: { en: "Black women in CA are 4x more likely to die in childbirth. FQHCs implementing BIH address the most urgent maternal health equity crisis in the state.", es: "Las mujeres negras en CA tienen 4x más probabilidad de morir en el parto. Los FQHCs con BIH abordan la crisis más urgente." },
    sourceUrl: "https://www.cdph.ca.gov/Programs/CFH/DMCAH/BIH/Pages/default.aspx",
    tags: ["black-infant-health", "maternal-mortality", "health-equity", "group-care", "california"],
  },

  // ─── Additional Migrant/Farmworker ─────────────────────
  {
    id: "ncfh-farmworker-health-factsheet-2023",
    title: { en: "Farmworker Health Factsheet: Occupational Hazards and Access Barriers", es: "Hoja Informativa de Salud del Trabajador Agrícola: Riesgos Laborales y Barreras de Acceso" },
    authors: "National Center for Farmworker Health (NCFH)",
    year: 2023,
    domain: "migrant-farmworker-health",
    type: "policy-report",
    audience: ["clinician", "non-clinician", "public-health"],
    level: "foundational",
    description: { en: "NCFH data brief: 2.4M farmworkers in the US, 83% Hispanic/Latino, 30% follow crops across states (migrant). Occupational hazards include heat illness (20 deaths/year), pesticide exposure (10,000-20,000 acute poisonings/year), musculoskeletal injury. Only 20% have health insurance. Section 330g Migrant Health Centers serve 900K farmworkers through 178 grantees.", es: "Datos de NCFH: 2.4M trabajadores agrícolas, 83% hispanos. Riesgos incluyen enfermedad por calor, pesticidas, lesiones. Solo 20% tienen seguro." },
    whyItMatters: { en: "CA produces 50% of US fruits/vegetables. CA Migrant Health FQHCs are the primary healthcare providers for the workers who feed the nation — understanding their unique health needs is essential.", es: "CA produce 50% de frutas/verduras de EE.UU. Los FQHCs de Salud Migrante son los proveedores principales para los trabajadores que alimentan la nación." },
    sourceUrl: "http://www.ncfh.org/",
    tags: ["farmworker", "migrant", "section-330g", "heat-illness", "pesticide", "ncfh"],
  },

  // ─── Additional Oral Health ────────────────────────────
  {
    id: "hrsa-oral-health-integration-toolkit-2019",
    title: { en: "Integration of Oral Health and Primary Care Practice (IOHPC) Toolkit", es: "Kit de Herramientas para Integración de Salud Oral y Atención Primaria" },
    authors: "HRSA",
    year: 2019,
    domain: "oral-health-integration",
    type: "practice-guide",
    audience: ["clinician", "executive"],
    level: "foundational",
    description: { en: "HRSA toolkit for medical-dental integration in FQHCs: fluoride varnish application by MAs/RNs, dental screening during well-child visits, warm handoffs between medical and dental, shared EHR workflows. FQHCs that integrated oral health screening into medical visits increased dental referral completion by 34%.", es: "Kit de HRSA para integración médico-dental: aplicación de flúor por AM/RN, detección dental en visitas pediátricas, derivaciones cálidas, flujos de HCE compartidos." },
    whyItMatters: { en: "Dental disease is the #1 unmet health need among children. FQHCs can bill separately for medical and dental visits on the same day — oral health integration is both good care and good revenue.", es: "La enfermedad dental es la necesidad insatisfecha #1 entre niños. Los FQHCs pueden facturar separadamente visitas médicas y dentales el mismo día." },
    sourceUrl: "https://www.hrsa.gov/oral-health/integration",
    tags: ["oral-health", "integration", "fluoride-varnish", "same-day-billing", "dental"],
  },

  // ─── Additional Section 330 ────────────────────────────
  {
    id: "nachc-health-center-fact-sheet-2024",
    title: { en: "America's Health Centers: 2024 Snapshot", es: "Centros de Salud de América: Panorama 2024" },
    authors: "NACHC",
    year: 2024,
    domain: "section-330",
    type: "policy-report",
    audience: ["all"],
    level: "foundational",
    description: { en: "NACHC's annual snapshot: 1,400+ FQHCs, 15,000+ sites, 31.5M patients, $30.6B in revenue, 291,000 employees. FQHCs save the healthcare system $24B annually by reducing ED visits and hospitalizations. 1 in 11 Americans receives care at an FQHC.", es: "Panorama anual de NACHC: 1,400+ FQHCs, 31.5M pacientes, $30.6B en ingresos, 291,000 empleados. 1 de cada 11 americanos recibe atención en un FQHC." },
    whyItMatters: { en: "The single most important advocacy document in the FQHC world. Every FQHC employee should know these numbers — they're the argument for why FQHCs deserve continued funding.", es: "El documento de abogacía más importante. Cada empleado de FQHC debe conocer estos números." },
    sourceUrl: "https://www.nachc.org/research-and-data/americas-health-centers/",
    tags: ["nachc", "snapshot", "advocacy", "national-data", "cost-savings"],
  },

  // ─── Additional Care Coordination ──────────────────────
  {
    id: "coleman-care-transitions-intervention-2006",
    title: { en: "The Care Transitions Intervention: A Patient-Centered Approach to Preventing Hospital Readmissions", es: "La Intervención de Transiciones de Cuidado: Prevención de Rehospitalizaciones" },
    authors: "Eric Coleman, et al.",
    year: 2006,
    domain: "care-coordination",
    type: "landmark-study",
    audience: ["clinician", "non-clinician"],
    level: "intermediate",
    description: { en: "RCT of the Coleman Care Transitions model: transition coach (often a CHW or RN) makes home visit within 72 hours of discharge, provides medication management training, personal health record, and follow-up calls. Reduced 30-day readmissions by 30% and 180-day readmissions by 17%.", es: "Ensayo del modelo Coleman: coach de transición (TSC o RN) visita al hogar dentro de 72 horas del alta. Redujo readmisiones a 30 días en 30%." },
    whyItMatters: { en: "The Care Transitions model is used by many FQHCs for their ECM programs. CHWs and RNs doing post-discharge follow-up directly prevent readmissions — a measurable, fundable activity.", es: "El modelo se usa en muchos programas ECM de FQHCs. TSC y RN previniendo readmisiones — una actividad medible y financiable." },
    sourceUrl: "https://doi.org/10.1001/archinte.166.17.1822",
    journal: "Archives of Internal Medicine",
    tags: ["care-transitions", "readmissions", "coleman", "ecm", "discharge"],
  },

  // ─── Additional SDOH ───────────────────────────────────
  {
    id: "gottlieb-sdoh-screening-fqhc-2016",
    title: { en: "A Systematic Review of Interventions on Social Determinants of Health in Clinical Settings", es: "Revisión Sistemática de Intervenciones sobre DSDS en Entornos Clínicos" },
    authors: "Laura Gottlieb, Holly Wing, Nancy Adler",
    year: 2016,
    domain: "sdoh-health-equity",
    type: "systematic-review",
    audience: ["clinician", "non-clinician", "executive"],
    level: "intermediate",
    description: { en: "UCSF systematic review of 39 SDOH interventions in primary care: food insecurity screening + referral reduced food insecurity by 25%, housing assistance referrals reduced homelessness by 18%, transportation assistance increased appointment adherence by 22%. Found that screening alone without referral resources was insufficient.", es: "Revisión de UCSF de 39 intervenciones de DSDS: detección de inseguridad alimentaria + derivación la redujo 25%. La detección sin recursos de derivación fue insuficiente." },
    whyItMatters: { en: "HRSA now expects SDOH screening in UDS reporting. This review shows which interventions actually work — and warns that screening without referral pathways can increase patient frustration.", es: "HRSA ahora espera detección de DSDS en reportes UDS. Esta revisión muestra qué intervenciones funcionan." },
    sourceUrl: "https://doi.org/10.1371/journal.pone.0159137",
    journal: "PLOS ONE",
    tags: ["sdoh-screening", "food-insecurity", "housing", "referral", "uds"],
  },
]

// ── Curriculum Tracks ────────────────────────────────────

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: "clinician-primary-care",
    name: { en: "Clinician: Primary Care Foundations", es: "Clínico: Fundamentos de Atención Primaria" },
    audience: "clinician",
    description: { en: "Evidence-based curriculum for MDs, NPs, PAs, and RNs working in FQHCs — from Starfield's pillars to AI-assisted documentation.", es: "Currículo basado en evidencia para MDs, NPs, PAs y RNs en FQHCs — desde los pilares de Starfield hasta documentación asistida por IA." },
    levels: [
      { level: "foundational", label: { en: "Foundations of FQHC Care", es: "Fundamentos de Atención en FQHCs" }, entryIds: ["starfield-primary-care-1994", "geiger-first-chcs-2005", "institute-medicine-primary-care-1996", "wagner-chronic-care-model-2001", "substance-abuse-tic-guide-2014"] },
      { level: "intermediate", label: { en: "Clinical Evidence & Integration", es: "Evidencia Clínica e Integración" }, entryIds: ["starfield-primary-care-specialty-2005", "unuetzer-collaborative-care-2002", "jackson-pcmh-systematic-review-2013", "shi-fqhc-diabetes-outcomes-2012", "peek-fqhc-hypertension-control-2019", "dhcs-calaims-ecm-2022"] },
      { level: "advanced", label: { en: "Innovation & Emerging Practice", es: "Innovación y Práctica Emergente" }, entryIds: ["lin-ambient-ai-documentation-2024", "abridge-best-in-klas-2026", "samhsa-ccbhc-certification-2024", "jacobs-telehealth-equity-fqhc-2021"] },
    ],
  },
  {
    id: "non-clinician-community-health",
    name: { en: "Non-Clinician: Community Health Essentials", es: "No Clínico: Fundamentos de Salud Comunitaria" },
    audience: "non-clinician",
    description: { en: "For CHWs, MAs, outreach workers, and admin staff — understanding the evidence behind community health work and your role in the care team.", es: "Para TSC, AM, trabajadores de extensión y personal administrativo — la evidencia detrás del trabajo de salud comunitaria." },
    levels: [
      { level: "foundational", label: { en: "Why Community Health Matters", es: "Por Qué Importa la Salud Comunitaria" }, entryIds: ["geiger-first-chcs-2005", "braveman-sdoh-framework-2011", "healthy-people-2030-sdoh", "substance-abuse-tic-guide-2014", "berkman-health-literacy-systematic-2011"] },
      { level: "intermediate", label: { en: "Building Your Practice", es: "Construyendo Tu Práctica" }, entryIds: ["kim-chw-systematic-review-2016", "kangovi-impress-trial-2020", "nachc-chw-integration-guide-2023", "ca-sb803-chw-certification-2021", "coleman-care-transitions-intervention-2006", "dhcs-calaims-ecm-2022"] },
      { level: "advanced", label: { en: "Research & Advocacy", es: "Investigación y Abogacía" }, entryIds: ["pinto-structural-racism-fqhcs-2022", "gottlieb-sdoh-screening-fqhc-2016", "ortega-undocumented-health-access-2015", "villarejo-farmworker-health-2016"] },
    ],
  },
  {
    id: "public-health-population",
    name: { en: "Public Health: Population & Policy", es: "Salud Pública: Población y Política" },
    audience: "public-health",
    description: { en: "For MPH students, researchers, and public health professionals — the evidence base connecting FQHCs to population health outcomes.", es: "Para estudiantes de MPH, investigadores y profesionales de salud pública — la evidencia que conecta FQHCs con resultados de salud poblacional." },
    levels: [
      { level: "foundational", label: { en: "Health Systems & Equity", es: "Sistemas de Salud y Equidad" }, entryIds: ["starfield-primary-care-1994", "braveman-sdoh-framework-2011", "healthy-people-2030-sdoh", "taylor-section-330-history-2004", "tolbert-medicaid-unwinding-2024"] },
      { level: "intermediate", label: { en: "Evidence & Outcomes", es: "Evidencia y Resultados" }, entryIds: ["starfield-primary-care-specialty-2005", "sommers-medicaid-expansion-mortality-2017", "shin-fqhc-medicaid-dependence-2020", "landon-fqhc-quality-comparison-2007", "baggett-homeless-health-disparities-2010"] },
      { level: "advanced", label: { en: "Policy & Systems Change", es: "Política y Cambio Sistémico" }, entryIds: ["rosenbaum-fqhc-policy-evolution-2017", "pinto-structural-racism-fqhcs-2022", "mcwilliams-aco-savings-2016", "hrsa-uds-reporting-2024"] },
    ],
  },
  {
    id: "executive-strategy",
    name: { en: "Executive: Strategy & Finance", es: "Ejecutivo: Estrategia y Finanzas" },
    audience: "executive",
    description: { en: "For CEOs, CFOs, COOs, and board members — the policy, financial, and strategic evidence that shapes FQHC decision-making.", es: "Para CEOs, CFOs, COOs y miembros de junta — la evidencia de políticas, finanzas y estrategia." },
    levels: [
      { level: "foundational", label: { en: "FQHC Business Model", es: "Modelo de Negocio de FQHCs" }, entryIds: ["taylor-section-330-history-2004", "nachc-health-center-fact-sheet-2024", "rosenbaum-pps-fqhc-reimbursement-2010", "340b-hrsa-program-overview-2024", "nachc-workforce-study-2023", "ca-sb525-healthcare-minimum-wage-2023"] },
      { level: "intermediate", label: { en: "Revenue & Sustainability", es: "Ingresos y Sostenibilidad" }, entryIds: ["shin-fqhc-medicaid-dependence-2020", "rosenbaum-fqhc-policy-evolution-2017", "conti-340b-reform-debate-2023", "ncqa-pcmh-standards-2023", "hrsa-uds-reporting-2024", "vujicic-dental-safety-net-2021"] },
      { level: "advanced", label: { en: "Innovation & Transformation", es: "Innovación y Transformación" }, entryIds: ["mcwilliams-aco-savings-2016", "medicaid-fqhc-apm-california-2026", "bailit-fqhc-value-based-readiness-2022", "lin-ambient-ai-documentation-2024"] },
    ],
  },
]

// ── Key Researchers & Institutions ───────────────────────

export interface KeyResearcher {
  name: string
  institution: string
  focus: { en: string; es: string }
  url: string
}

export const KEY_RESEARCHERS: KeyResearcher[] = [
  { name: "Sara Rosenbaum, JD", institution: "GWU Geiger Gibson Program", focus: { en: "FQHC policy, Section 330, Medicaid, health law", es: "Política de FQHCs, Sección 330, Medicaid, derecho de salud" }, url: "https://publichealth.gwu.edu/departments/healthpolicy/CHPR/ggprogram.cfm" },
  { name: "Peter Shin, PhD", institution: "GWU Geiger Gibson Program", focus: { en: "FQHC finance, workforce, health disparities", es: "Finanzas de FQHCs, fuerza laboral, disparidades" }, url: "https://publichealth.gwu.edu/departments/healthpolicy/CHPR/ggprogram.cfm" },
  { name: "Barbara Starfield, MD, MPH", institution: "Johns Hopkins (deceased 2011)", focus: { en: "Primary care theory, health systems, international comparisons", es: "Teoría de atención primaria, sistemas de salud, comparaciones internacionales" }, url: "https://publichealth.jhu.edu/" },
  { name: "Leiyu Shi, DrPH", institution: "Johns Hopkins", focus: { en: "FQHC quality, access, vulnerable populations", es: "Calidad, acceso y poblaciones vulnerables de FQHCs" }, url: "https://publichealth.jhu.edu/" },
  { name: "Fitzhugh Mullan, MD", institution: "GWU (deceased 2019)", focus: { en: "Health workforce, NHSC, global health education", es: "Fuerza laboral, NHSC, educación global en salud" }, url: "https://smhs.gwu.edu/" },
  { name: "H. Jack Geiger, MD, MSci", institution: "CUNY (deceased 2020)", focus: { en: "CHC founder, civil rights medicine, social determinants", es: "Fundador de CHCs, medicina de derechos civiles, determinantes sociales" }, url: "https://www.nachc.org/" },
  { name: "Shreya Kangovi, MD, MSHP", institution: "Penn Medicine (IMPaCT)", focus: { en: "CHW evidence, randomized trials, Medicaid populations", es: "Evidencia de TSC, ensayos aleatorizados, poblaciones de Medicaid" }, url: "https://chfrp.upenn.edu/" },
  { name: "Jürgen Unützer, MD, MPH", institution: "University of Washington", focus: { en: "Collaborative care, integrated behavioral health, IMPACT model", es: "Cuidado colaborativo, salud conductual integrada, modelo IMPACT" }, url: "https://aims.uw.edu/" },
]

export interface KeyJournal {
  name: string
  focus: { en: string; es: string }
  url: string
}

export const KEY_JOURNALS: KeyJournal[] = [
  { name: "Journal of Health Care for the Poor and Underserved", focus: { en: "The primary journal for FQHC and safety-net research", es: "La revista principal para investigación de FQHCs y red de seguridad" }, url: "https://muse.jhu.edu/journal/278" },
  { name: "Health Affairs", focus: { en: "Health policy — Medicaid, ACA, FQHC payment models", es: "Política de salud — Medicaid, ACA, modelos de pago de FQHCs" }, url: "https://www.healthaffairs.org/" },
  { name: "American Journal of Public Health", focus: { en: "Community health, SDOH, health disparities", es: "Salud comunitaria, DSDS, disparidades en salud" }, url: "https://ajph.aphapublications.org/" },
  { name: "Milbank Quarterly", focus: { en: "Health policy analysis, health systems research", es: "Análisis de políticas de salud, investigación de sistemas" }, url: "https://www.milbank.org/quarterly/" },
  { name: "NEJM", focus: { en: "Landmark clinical trials, policy perspectives, workforce", es: "Ensayos clínicos de referencia, perspectivas de políticas" }, url: "https://www.nejm.org/" },
  { name: "Annals of Family Medicine", focus: { en: "Primary care research, PCMH, team-based care", es: "Investigación de atención primaria, PCMH, cuidado en equipo" }, url: "https://www.annfammed.org/" },
  { name: "Journal of Rural Health", focus: { en: "Rural health access, workforce, telehealth", es: "Acceso rural, fuerza laboral, telesalud" }, url: "https://onlinelibrary.wiley.com/journal/17480361" },
  { name: "JAMA Internal Medicine", focus: { en: "Medicaid expansion, ACO quality, chronic disease", es: "Expansión de Medicaid, calidad de ACO, enfermedad crónica" }, url: "https://jamanetwork.com/journals/jamainternalmedicine" },
  { name: "Medical Care", focus: { en: "Health services research, access, quality measurement", es: "Investigación de servicios, acceso, medición de calidad" }, url: "https://journals.lww.com/lww-medicalcare/" },
  { name: "NEJM AI", focus: { en: "AI in healthcare — ambient scribing, clinical decision support", es: "IA en salud — documentación ambiental, soporte a decisiones clínicas" }, url: "https://ai.nejm.org/" },
]

export interface KeyInstitution {
  name: string
  type: string
  focus: { en: string; es: string }
  url: string
}

export const KEY_INSTITUTIONS: KeyInstitution[] = [
  { name: "Geiger Gibson/RCHN Community Health Foundation", type: "Research Center", focus: { en: "The leading FQHC policy research program — housed at GWU", es: "El principal programa de investigación de políticas de FQHCs — en GWU" }, url: "https://publichealth.gwu.edu/departments/healthpolicy/CHPR/ggprogram.cfm" },
  { name: "NACHC (National Association of CHCs)", type: "Trade Association", focus: { en: "Federal advocacy, UDS data, workforce studies, P&I Conference", es: "Abogacía federal, datos UDS, estudios de fuerza laboral" }, url: "https://www.nachc.org/" },
  { name: "KFF (Kaiser Family Foundation)", type: "Research Organization", focus: { en: "Medicaid policy, ACA analysis, health coverage data", es: "Política de Medicaid, análisis de ACA, datos de cobertura" }, url: "https://www.kff.org/" },
  { name: "Commonwealth Fund", type: "Foundation", focus: { en: "Health system performance, safety-net research, equity", es: "Desempeño de sistemas de salud, red de seguridad, equidad" }, url: "https://www.commonwealthfund.org/" },
  { name: "CHCF (California Health Care Foundation)", type: "Foundation", focus: { en: "CA-specific FQHC research, Medi-Cal policy, innovation", es: "Investigación de FQHCs específica de CA, política de Medi-Cal" }, url: "https://www.chcf.org/" },
  { name: "CPCA (California Primary Care Association)", type: "Trade Association", focus: { en: "CA FQHC advocacy, training, policy analysis", es: "Abogacía de FQHCs de CA, capacitación, análisis de políticas" }, url: "https://www.cpca.org/" },
  { name: "RWJF (Robert Wood Johnson Foundation)", type: "Foundation", focus: { en: "SDOH, health equity, community health innovation grants", es: "DSDS, equidad en salud, subvenciones de innovación" }, url: "https://www.rwjf.org/" },
  { name: "AHRQ (Agency for Healthcare Research & Quality)", type: "Federal Agency", focus: { en: "Evidence reviews, patient safety, quality improvement", es: "Revisiones de evidencia, seguridad del paciente, mejora de calidad" }, url: "https://www.ahrq.gov/" },
]

// ── Helper Functions ─────────────────────────────────────

export function getEntriesByDomain(domain: ResearchDomain): ResearchEntry[] {
  return RESEARCH_ENTRIES.filter((e) => e.domain === domain)
}

export function getEntriesByAudience(audience: AudienceTrack): ResearchEntry[] {
  return RESEARCH_ENTRIES.filter((e) => e.audience.includes(audience) || e.audience.includes("all"))
}

export function getEntriesByLevel(level: ResearchLevel): ResearchEntry[] {
  return RESEARCH_ENTRIES.filter((e) => e.level === level)
}

export function getEntriesByType(type: ResourceType): ResearchEntry[] {
  return RESEARCH_ENTRIES.filter((e) => e.type === type)
}

export function searchEntries(query: string): ResearchEntry[] {
  const q = query.toLowerCase()
  return RESEARCH_ENTRIES.filter(
    (e) =>
      e.title.en.toLowerCase().includes(q) ||
      e.title.es.toLowerCase().includes(q) ||
      e.authors.toLowerCase().includes(q) ||
      e.description.en.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q))
  )
}

export function getCurriculumTrack(trackId: string): CurriculumTrack | undefined {
  return CURRICULUM_TRACKS.find((t) => t.id === trackId)
}

export function getEntryById(id: string): ResearchEntry | undefined {
  return RESEARCH_ENTRIES.find((e) => e.id === id)
}

export function getDomainStats(): { domain: ResearchDomain; count: number }[] {
  const counts = new Map<ResearchDomain, number>()
  for (const entry of RESEARCH_ENTRIES) {
    counts.set(entry.domain, (counts.get(entry.domain) || 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
}
