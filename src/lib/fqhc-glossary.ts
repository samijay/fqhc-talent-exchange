// fqhc-glossary.ts
// Comprehensive FQHC and healthcare glossary — all terms, definitions, and helper functions
// Data sources: HRSA, CMS, DHCS, NACHC, state/federal legislation
// Last updated: 2026-03-25

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type GlossaryCategory =
  | "reimbursement"
  | "program"
  | "clinical"
  | "compliance"
  | "technology"
  | "workforce"
  | "policy"
  | "organization";

export interface GlossaryTerm {
  term: string;
  fullName: { en: string; es: string };
  definition: { en: string; es: string };
  category: GlossaryCategory;
  relatedTerms?: string[];
  learnMoreUrl?: string;
}

/* ------------------------------------------------------------------ */
/*  Glossary Terms (40+ core FQHC & healthcare terms)                 */
/* ------------------------------------------------------------------ */

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "FQHC",
    fullName: { en: "Federally Qualified Health Center", es: "Centro de Salud Calificado Federalmente" },
    definition: {
      en: "A nonprofit health center that receives federal funding (Section 330 grants) to serve uninsured and low-income patients in medically underserved areas. FQHCs provide comprehensive primary care and preventive services regardless of a patient's ability to pay.",
      es: "Un centro de salud sin fines de lucro que recibe fondos federales para servir a pacientes sin seguro y de bajos ingresos. Los FQHC proporcionan atención primaria integral y servicios preventivos sin importar la capacidad de pago del paciente.",
    },
    category: "organization",
    relatedTerms: ["Section 330", "PPS", "HRSA"],
    learnMoreUrl: "/directory",
  },
  {
    term: "PPS",
    fullName: { en: "Prospective Payment System", es: "Sistema de Pago Prospectivo" },
    definition: {
      en: "A reimbursement method for FQHCs where Medicare and Medicaid pay a per-visit rate based on the center's costs, adjusted annually. This allows FQHCs to be reimbursed fairly regardless of which patients they serve.",
      es: "Un método de reembolso para FQHC donde Medicare y Medicaid pagan una tarifa por visita basada en los costos del centro. Esto permite que los FQHC reciban un reembolso justo independientemente de qué pacientes atiendan.",
    },
    category: "reimbursement",
    relatedTerms: ["FQHC", "RVU", "Medicaid", "Medicare"],
    learnMoreUrl: "/strategy/guides?topic=revenue",
  },
  {
    term: "340B",
    fullName: { en: "340B Drug Pricing Program", es: "Programa de Precios de Medicamentos 340B" },
    definition: {
      en: "A federal program that requires pharmaceutical manufacturers to offer discounted prices on drugs to covered entities like FQHCs. This can save millions annually on medication costs.",
      es: "Un programa federal que requiere que los fabricantes farmacéuticos ofrezcan precios reducidos a entidades como FQHC. Esto puede ahorrar millones anualmente en costos de medicamentos.",
    },
    category: "program",
    relatedTerms: ["FQHC", "PBM"],
    learnMoreUrl: "/strategy/guides",
  },
  {
    term: "CalAIM",
    fullName: { en: "California Advancing and Innovating Medi-Cal", es: "California Avanzando e Innovando Medi-Cal" },
    definition: {
      en: "California's multi-year initiative to strengthen Medicaid by expanding behavioral health services, addressing social determinants of health, and improving care coordination through enhanced programs like ECM.",
      es: "La iniciativa de California para fortalecer Medicaid expandiendo servicios de salud mental y mejorando la coordinación de la atención a través de programas mejorados.",
    },
    category: "policy",
    relatedTerms: ["ECM", "Medi-Cal", "Community Supports"],
    learnMoreUrl: "/guides",
  },
  {
    term: "ECM",
    fullName: { en: "Enhanced Care Management", es: "Gestión de Atención Mejorada" },
    definition: {
      en: "A Medi-Cal program that pays FQHCs to coordinate care for high-risk patients through home visits, care planning, and referrals to social services. Eligible patients include those with serious health conditions or social barriers to health.",
      es: "Un programa de Medi-Cal que paga a los FQHC por coordinar la atención de pacientes de alto riesgo a través de visitas a domicilio, planificación de la atención y derivaciones.",
    },
    category: "program",
    relatedTerms: ["CCM", "TCM", "Medi-Cal", "CalAIM"],
    learnMoreUrl: "/guides",
  },
  {
    term: "CCM",
    fullName: { en: "Complex Care Management", es: "Gestión de Atención Compleja" },
    definition: {
      en: "A Medicare program that reimburses FQHCs for comprehensive care coordination for patients with multiple chronic conditions. Different from ECM but serves similar patients.",
      es: "Un programa de Medicare que reembolsa a los FQHC por la coordinación integral de la atención de pacientes con múltiples condiciones crónicas.",
    },
    category: "program",
    relatedTerms: ["ECM", "TCM", "Medicare"],
  },
  {
    term: "TCM",
    fullName: { en: "Targeted Case Management", es: "Gestión de Casos Dirigida" },
    definition: {
      en: "A Medi-Cal program that reimburses FQHCs for case management services for specific populations, such as homeless individuals or those with chronic conditions. More targeted than ECM.",
      es: "Un programa de Medi-Cal que reembolsa a los FQHC por servicios de gestión de casos para poblaciones específicas como personas sin hogar.",
    },
    category: "program",
    relatedTerms: ["ECM", "CCM", "Medi-Cal"],
  },
  {
    term: "BH-ASO",
    fullName: { en: "Behavioral Health Administrative Services Organization", es: "Organización de Servicios Administrativos de Salud Mental" },
    definition: {
      en: "A regional organization contracted by Medicaid to manage behavioral health services, approvals, and claims. FQHCs often coordinate with BH-ASOs to deliver mental health care.",
      es: "Una organización regional contratada por Medicaid para gestionar servicios de salud mental, aprobaciones y reclamaciones.",
    },
    category: "organization",
    relatedTerms: ["Medicaid", "BH"],
  },
  {
    term: "EHR",
    fullName: { en: "Electronic Health Record", es: "Registro Electrónico de Salud" },
    definition: {
      en: "A digital system that stores patient medical records, test results, medications, and visit history. Most FQHCs use EHRs for clinical care, billing, and quality reporting.",
      es: "Un sistema digital que almacena registros médicos de pacientes, resultados de pruebas y medicamentos.",
    },
    category: "technology",
    relatedTerms: ["OCHIN Epic", "Medicaid"],
    learnMoreUrl: "/strategy/tech-stack",
  },
  {
    term: "OCHIN Epic",
    fullName: { en: "OCHIN Epic", es: "OCHIN Epic" },
    definition: {
      en: "A shared Electronic Health Record system used by many California FQHCs. Allows for data sharing across organizations to improve care coordination and quality reporting.",
      es: "Un sistema de Registro Electrónico de Salud compartido utilizado por muchos FQHC de California.",
    },
    category: "technology",
    relatedTerms: ["EHR", "FQHC"],
    learnMoreUrl: "/strategy/tech-stack",
  },
  {
    term: "CHW",
    fullName: { en: "Community Health Worker", es: "Trabajador de Salud Comunitaria" },
    definition: {
      en: "A frontline health professional who bridges clinics and communities—conducting outreach, health education, care coordination, and social support. CHWs are integral to FQHC service delivery in California.",
      es: "Un profesional de salud de primera línea que realiza educación en salud, coordinación de atención y apoyo social en las comunidades.",
    },
    category: "workforce",
    relatedTerms: ["FQHC", "SB 525"],
    learnMoreUrl: "/career-roadmap",
  },
  {
    term: "HEDIS",
    fullName: { en: "Healthcare Effectiveness Data and Information Set", es: "Conjunto de Datos e Información de Efectividad de la Atención Médica" },
    definition: {
      en: "A set of standardized quality measures used to track healthcare performance in areas like diabetes control, preventive care, and medication use. FQHCs report HEDIS data to health plans.",
      es: "Un conjunto de medidas de calidad estandarizadas utilizadas para rastrear el desempeño de la atención médica en áreas como control de diabetes y atención preventiva.",
    },
    category: "compliance",
    relatedTerms: ["UDS", "Quality"],
  },
  {
    term: "UDS",
    fullName: { en: "Uniform Data System", es: "Sistema Uniforme de Datos" },
    definition: {
      en: "A federal data collection system where FQHCs report clinical, financial, and operational performance metrics to HRSA. Used to assess quality, access, and fiscal health.",
      es: "Un sistema federal de recopilación de datos donde los FQHC informan métricas de desempeño clínico, financiero y operacional a HRSA.",
    },
    category: "compliance",
    relatedTerms: ["HRSA", "FQHC", "HEDIS"],
  },
  {
    term: "PCMH",
    fullName: { en: "Patient-Centered Medical Home", es: "Centro Médico Centrado en el Paciente" },
    definition: {
      en: "A model of care where the FQHC coordinates all aspects of patient health—primary care, specialist referrals, mental health, and social services—with the patient's primary clinician leading the care team.",
      es: "Un modelo de atención donde el FQHC coordina todos los aspectos de la salud del paciente con el clínico principal liderando el equipo de atención.",
    },
    category: "clinical",
    relatedTerms: ["FQHC", "Care Coordination"],
  },
  {
    term: "HRSA",
    fullName: { en: "Health Resources and Services Administration", es: "Administración de Recursos y Servicios de Salud" },
    definition: {
      en: "The federal agency within the U.S. Department of Health and Human Services that funds FQHCs through Section 330 grants and oversees their operations and reporting requirements.",
      es: "La agencia federal dentro del Departamento de Salud y Servicios Humanos que financia los FQHC a través de becas y supervisa sus operaciones.",
    },
    category: "organization",
    relatedTerms: ["FQHC", "Section 330", "HHS"],
    learnMoreUrl: "/directory",
  },
  {
    term: "CMS",
    fullName: { en: "Centers for Medicare & Medicaid Services", es: "Centros de Servicios de Medicare y Medicaid" },
    definition: {
      en: "The federal agency that administers Medicare and Medicaid programs and sets reimbursement rates for FQHCs. CMS regulations directly impact FQHC revenue and operations.",
      es: "La agencia federal que administra los programas de Medicare y Medicaid y establece tasas de reembolso para los FQHC.",
    },
    category: "organization",
    relatedTerms: ["Medicare", "Medicaid", "Reimbursement"],
  },
  {
    term: "DHCS",
    fullName: { en: "California Department of Health Care Services", es: "Departamento de Servicios de Atención Médica de California" },
    definition: {
      en: "California's state agency that administers Medi-Cal (California's Medicaid program) and contracts with health plans, BH-ASOs, and FQHCs. Sets state-level healthcare policy affecting FQHC operations.",
      es: "La agencia estatal de California que administra Medi-Cal y establece políticas de atención médica a nivel estatal.",
    },
    category: "organization",
    relatedTerms: ["Medi-Cal", "Medicaid"],
  },
  {
    term: "NACHC",
    fullName: { en: "National Association of Community Health Centers", es: "Asociación Nacional de Centros de Salud Comunitarios" },
    definition: {
      en: "The national trade association representing FQHCs and community health centers. Advocates for FQHC funding, policy, and workforce issues at the federal level.",
      es: "La asociación comercial nacional que representa a los FQHC. Aboga por la financiación, política y temas de la fuerza laboral a nivel federal.",
    },
    category: "organization",
    relatedTerms: ["FQHC", "CPCA"],
  },
  {
    term: "CPCA",
    fullName: { en: "California Primary Care Association", es: "Asociación de Atención Primaria de California" },
    definition: {
      en: "The state trade association representing California's FQHCs. Advocates for FQHC policy, funding, and workforce issues at the state level.",
      es: "La asociación comercial estatal que representa a los FQHC de California. Aboga por política, financiación y temas de la fuerza laboral.",
    },
    category: "organization",
    relatedTerms: ["FQHC", "NACHC"],
  },
  {
    term: "Medi-Cal",
    fullName: { en: "Medi-Cal", es: "Medi-Cal" },
    definition: {
      en: "California's Medicaid program that provides health coverage to low-income individuals and families. Medi-Cal is the largest payer for FQHC services in California.",
      es: "El programa Medicaid de California que proporciona cobertura de salud a individuos y familias de bajos ingresos. Medi-Cal es el pagador más grande para servicios FQHC.",
    },
    category: "program",
    relatedTerms: ["Medicaid", "FQHC", "CalAIM"],
    learnMoreUrl: "/why-fqhc",
  },
  {
    term: "NHSC",
    fullName: { en: "National Health Service Corps", es: "Cuerpo Nacional de Servicio de Salud" },
    definition: {
      en: "A federal loan repayment and scholarship program that helps clinicians pay off student loans in exchange for working at FQHCs and other underserved settings. Popular among physicians and nurses.",
      es: "Un programa federal de reembolso de préstamos que ayuda a los clínicos a pagar préstamos estudiantiles a cambio de trabajar en FQHC.",
    },
    category: "program",
    relatedTerms: ["FQHC", "Workforce"],
    learnMoreUrl: "/resources",
  },
  {
    term: "SB 525",
    fullName: { en: "SB 525 Healthcare Minimum Wage", es: "SB 525 Salario Mínimo de Atención Médica" },
    definition: {
      en: "California law requiring FQHCs and other covered employers to pay healthcare workers at least $25 per hour by 2027. This affects FQHC payroll budgets significantly.",
      es: "Ley de California que requiere que los FQHC paguen a los trabajadores de salud al menos $25 por hora para 2027.",
    },
    category: "policy",
    relatedTerms: ["FQHC", "CHW", "Workforce"],
  },
  {
    term: "CalBRACE",
    fullName: { en: "California Building Resilience Against Climate Events", es: "California Construyendo Resiliencia Contra Eventos Climáticos" },
    definition: {
      en: "A state program supporting climate-resilient healthcare infrastructure. FQHCs can apply for funding to upgrade facilities, solar, or backup power to handle climate emergencies.",
      es: "Un programa estatal que apoya la infraestructura de atención médica resistente al clima. Los FQHC pueden solicitar fondos para mejorar las instalaciones.",
    },
    category: "program",
    relatedTerms: ["FQHC", "Infrastructure"],
  },
  {
    term: "FPL",
    fullName: { en: "Federal Poverty Level", es: "Nivel de Pobreza Federal" },
    definition: {
      en: "The income threshold set by the federal government used to determine eligibility for programs like Medicaid and sliding fee scales. FQHCs serve patients up to 200% FPL.",
      es: "El umbral de ingresos establecido por el gobierno federal para determinar la elegibilidad para programas como Medicaid.",
    },
    category: "policy",
    relatedTerms: ["Medicaid", "Sliding Fee Scale"],
  },
  {
    term: "MAT/MOUD",
    fullName: { en: "Medication-Assisted Treatment / Medications for Opioid Use Disorder", es: "Tratamiento Asistido por Medicamentos / Medicamentos para Trastorno de Uso de Opioides" },
    definition: {
      en: "Evidence-based treatment using medications like buprenorphine or methadone to treat opioid addiction. Many FQHCs provide MAT/MOUD services integrated with primary care.",
      es: "Tratamiento basado en evidencia usando medicamentos como buprenorfina o metadona para tratar la adicción a opioides.",
    },
    category: "clinical",
    relatedTerms: ["BH", "SUD"],
  },
  {
    term: "SUD",
    fullName: { en: "Substance Use Disorder", es: "Trastorno por Consumo de Sustancias" },
    definition: {
      en: "A medical condition involving the misuse of substances (drugs, alcohol) that causes significant functional impairment. FQHCs integrate SUD screening, treatment, and recovery support into primary care.",
      es: "Una condición médica que implica el mal uso de sustancias que causa deterioro funcional significativo.",
    },
    category: "clinical",
    relatedTerms: ["BH", "MAT/MOUD"],
  },
  {
    term: "BH",
    fullName: { en: "Behavioral Health", es: "Salud Mental" },
    definition: {
      en: "Healthcare services addressing mental health conditions (depression, anxiety) and substance use. Many FQHCs integrate behavioral health into primary care to address SDOH and improve outcomes.",
      es: "Servicios de atención médica que abordan condiciones de salud mental y uso de sustancias.",
    },
    category: "clinical",
    relatedTerms: ["SUD", "MAT/MOUD"],
  },
  {
    term: "RVU",
    fullName: { en: "Relative Value Unit", es: "Unidad de Valor Relativo" },
    definition: {
      en: "A billing metric that assigns points to medical services based on complexity and time. Under RVU-based payment, higher RVU services generate more revenue—can incentivize inappropriate coding.",
      es: "Una métrica de facturación que asigna puntos a servicios médicos basados en complejidad y tiempo.",
    },
    category: "reimbursement",
    relatedTerms: ["wRVU", "Billing"],
  },
  {
    term: "wRVU",
    fullName: { en: "Work Relative Value Unit", es: "Unidad de Valor Relativo de Trabajo" },
    definition: {
      en: "A variant of RVU that includes work time, practice expense, and malpractice. Used by some clinicians to track productivity. Concerns exist about overuse incentivizing higher-complexity coding.",
      es: "Una variante de RVU que incluye tiempo de trabajo, gasto de práctica y negligencia.",
    },
    category: "reimbursement",
    relatedTerms: ["RVU"],
  },
  {
    term: "FTE",
    fullName: { en: "Full-Time Equivalent", es: "Equivalente a Tiempo Completo" },
    definition: {
      en: "A measure of workforce size. One FTE equals one full-time employee (40 hours/week). Part-time staff are counted as fractions (e.g., 0.5 FTE for 20 hours/week).",
      es: "Una medida del tamaño de la fuerza laboral. Un FTE equivale a un empleado a tiempo completo.",
    },
    category: "workforce",
    relatedTerms: ["Staffing"],
  },
  {
    term: "HCAI",
    fullName: { en: "Healthcare Association of Informed Investors (formerly Office of Statewide Health Planning and Development)", es: "Asociación de Atención Médica de Inversores Informados" },
    definition: {
      en: "The California agency responsible for healthcare workforce programs, facility licensing, and health workforce development initiatives including CHW certification.",
      es: "La agencia de California responsable de programas de fuerza laboral en salud y desarrollo de la fuerza laboral.",
    },
    category: "organization",
    relatedTerms: ["CHW"],
  },
  {
    term: "CHCF",
    fullName: { en: "California Health Care Foundation", es: "Fundación de Atención Médica de California" },
    definition: {
      en: "A large California nonprofit foundation that funds health policy research and healthcare initiatives. Publishes key analyses on FQHC funding impacts and healthcare access.",
      es: "Una gran fundación sin fines de lucro de California que financia investigación de políticas de salud.",
    },
    category: "organization",
    relatedTerms: ["FQHC"],
  },
  {
    term: "KFF",
    fullName: { en: "KFF (Kaiser Family Foundation)", es: "Fundación Familiar Kaiser" },
    definition: {
      en: "A nonpartisan nonprofit organization producing health policy research and analysis. Known for Medicaid data, healthcare coverage tracking, and policy briefs.",
      es: "Una organización sin fines de lucro no partidista que produce investigación de políticas de salud.",
    },
    category: "organization",
    relatedTerms: ["Health Policy"],
  },
  {
    term: "IPA",
    fullName: { en: "Independent Physician Association", es: "Asociación de Médicos Independientes" },
    definition: {
      en: "A network of independent physicians and clinics that contract together with health plans to provide care and manage capitated risk. FQHCs sometimes partner with IPAs for capitated contracts.",
      es: "Una red de médicos y clínicas independientes que se asocian con planes de salud para proporcionar atención.",
    },
    category: "organization",
    relatedTerms: ["ACO", "APM"],
  },
  {
    term: "ACO",
    fullName: { en: "Accountable Care Organization", es: "Organización de Atención Responsable" },
    definition: {
      en: "A network of healthcare providers (hospitals, clinics, FQHCs) aligned to jointly manage patient populations and improve outcomes under value-based contracts. Shares savings if quality improves and costs decrease.",
      es: "Una red de proveedores de atención médica alineados para gestionar conjuntamente poblaciones de pacientes bajo contratos basados en valor.",
    },
    category: "organization",
    relatedTerms: ["APM", "IPA"],
  },
  {
    term: "APM",
    fullName: { en: "Alternative Payment Model", es: "Modelo de Pago Alternativo" },
    definition: {
      en: "Reimbursement methods other than fee-for-service, such as capitation or value-based payments where providers share risk and potential savings. FQHCs increasingly use APMs.",
      es: "Métodos de reembolso distintos del pago por servicio, como capitalización o pagos basados en valor.",
    },
    category: "reimbursement",
    relatedTerms: ["PPS", "Capitation"],
  },
  {
    term: "Section 330",
    fullName: { en: "Section 330 of the Public Health Service Act", es: "Sección 330 de la Ley de Servicio de Salud Pública" },
    definition: {
      en: "The federal statute that defines FQHCs and authorizes federal funding (grants) for community health centers. Requires FQHCs to serve all patients regardless of ability to pay and insurance status.",
      es: "El estatuto federal que define los FQHC y autoriza la financiación federal para centros de salud comunitarios.",
    },
    category: "policy",
    relatedTerms: ["FQHC", "HRSA"],
    learnMoreUrl: "/strategy/guides",
  },
  {
    term: "DPH",
    fullName: { en: "Department of Public Health", es: "Departamento de Salud Pública" },
    definition: {
      en: "California's state public health agency. Works with FQHCs on disease surveillance, emergency response, vaccination programs, and health equity initiatives.",
      es: "La agencia estatal de salud pública de California. Trabaja con FQHC en vigilancia de enfermedades y programas de vacunación.",
    },
    category: "organization",
    relatedTerms: ["Public Health"],
  },
  {
    term: "HHS",
    fullName: { en: "U.S. Department of Health and Human Services", es: "Departamento de Salud y Servicios Humanos" },
    definition: {
      en: "The federal department overseeing health programs including Medicare, Medicaid, HRSA, and CMS. Sets national health policy affecting FQHCs.",
      es: "El departamento federal que supervisa programas de salud incluyendo Medicare, Medicaid y HRSA.",
    },
    category: "organization",
    relatedTerms: ["HRSA", "CMS"],
  },
  {
    term: "EPSDT",
    fullName: { en: "Early and Periodic Screening, Diagnostic, and Treatment", es: "Cribado, Diagnóstico y Tratamiento Temprano y Periódico" },
    definition: {
      en: "A Medicaid benefit requiring comprehensive preventive care and treatment for children under 21. FQHCs provide EPSDT screening and ensure access to specialty care referrals.",
      es: "Un beneficio de Medicaid que requiere atención preventiva y tratamiento integral para niños menores de 21 años.",
    },
    category: "program",
    relatedTerms: ["Medicaid", "Preventive Care"],
  },
  {
    term: "Ryan White",
    fullName: { en: "Ryan White HIV/AIDS Program", es: "Programa HIV/SIDA Ryan White" },
    definition: {
      en: "A federal program providing funding to FQHCs and other providers for comprehensive HIV care, treatment, and support services. Covers patients without other insurance.",
      es: "Un programa federal que proporciona fondos a los FQHC para atención integral del VIH, tratamiento y servicios de apoyo.",
    },
    category: "program",
    relatedTerms: ["HIV", "Federal Funding"],
  },
  {
    term: "FMAP",
    fullName: { en: "Federal Medical Assistance Percentage", es: "Porcentaje Federal de Asistencia Médica" },
    definition: {
      en: "The federal government's share of Medicaid spending for a state. Higher FMAP means more federal funding for Medicaid services. California's FMAP affects FQHC Medicaid revenue.",
      es: "La parte del gobierno federal de los gastos de Medicaid para un estado.",
    },
    category: "policy",
    relatedTerms: ["Medicaid", "Federal Funding"],
  },
  {
    term: "PBM",
    fullName: { en: "Pharmacy Benefit Manager", es: "Gerente de Beneficios de Farmacia" },
    definition: {
      en: "An intermediary company that processes prescription drug claims between FQHCs, pharmacies, and health plans. PBMs negotiate drug prices and manage formularies.",
      es: "Una empresa intermedia que procesa reclamaciones de medicamentos recetados entre FQHC, farmacias y planes de salud.",
    },
    category: "organization",
    relatedTerms: ["340B", "Pharmacy"],
  },
  {
    term: "CLAS",
    fullName: { en: "Culturally and Linguistically Appropriate Services", es: "Servicios Culturalmente Apropiados" },
    definition: {
      en: "Federal standards requiring healthcare organizations to provide culturally competent and linguistically accessible services. CLAS standards guide FQHC interpretation, translation, and cultural competency training.",
      es: "Estándares federales que requieren que las organizaciones de atención médica proporcionen servicios culturalmente competentes.",
    },
    category: "compliance",
    relatedTerms: ["Cultural Competency"],
    learnMoreUrl: "/strategy/cultural-humility",
  },
  {
    term: "OSV",
    fullName: { en: "Operational Site Visit", es: "Visita de Sitio Operativo" },
    definition: {
      en: "A federal monitoring visit where HRSA staff inspect an FQHC's operations, financial management, clinical services, and compliance with Section 330 requirements.",
      es: "Una visita de monitoreo federal donde el personal de HRSA inspecciona las operaciones del FQHC.",
    },
    category: "compliance",
    relatedTerms: ["HRSA", "Compliance"],
  },
  {
    term: "CalAIM Community Supports",
    fullName: { en: "CalAIM Community Supports", es: "Apoyos Comunitarios de CalAIM" },
    definition: {
      en: "A CalAIM component providing Medi-Cal funding for social services like housing assistance, nutrition, and transportation—addressing social determinants of health. FQHCs refer patients to these supports.",
      es: "Un componente de CalAIM que proporciona fondos de Medi-Cal para servicios sociales como asistencia de vivienda.",
    },
    category: "program",
    relatedTerms: ["CalAIM", "SDOH"],
  },
  {
    term: "H.R. 1",
    fullName: { en: "H.R. 1 (One Big Beautiful Bill) / Medicaid Fiscal Stability Act", es: "Ley de Estabilidad Fiscal de Medicaid" },
    definition: {
      en: "Proposed federal legislation (2025-2026) to slash Medicaid funding by $4.6B, cut undocumented Medicaid, eliminate ECM, and reduce FQHC reimbursement. Major threat to FQHC sustainability.",
      es: "Legislación federal propuesta para reducir la financiación de Medicaid, eliminar ECM y reducir el reembolso de FQHC.",
    },
    category: "policy",
    relatedTerms: ["Medicaid", "Federal Funding"],
    learnMoreUrl: "/funding-impact",
  },
  {
    term: "Title X",
    fullName: { en: "Title X Family Planning Program", es: "Programa de Planificación Familiar Título X" },
    definition: {
      en: "A federal program funding family planning and reproductive health services at FQHCs and other clinics. Provides contraception, STI testing, and cancer screening regardless of income or insurance.",
      es: "Un programa federal que financia servicios de planificación familiar en FQHC.",
    },
    category: "program",
    relatedTerms: ["Federal Funding", "Reproductive Health"],
  },
  {
    term: "Sliding Fee Scale",
    fullName: { en: "Sliding Fee Scale", es: "Escala de Tarifas Deslizantes" },
    definition: {
      en: "A payment model where patients pay fees based on their income and family size, from free to full cost. Required of all FQHCs to ensure affordability and access for low-income patients.",
      es: "Un modelo de pago donde los pacientes pagan tarifas según sus ingresos y tamaño familiar.",
    },
    category: "reimbursement",
    relatedTerms: ["FQHC", "FPL"],
  },
  // ─── Additional requested terms ──────────────────────────────────────
  {
    term: "HPSA",
    fullName: { en: "Health Professional Shortage Area", es: "Área de Escasez de Profesionales de Salud" },
    definition: {
      en: "A federal designation for areas with too few primary care, dental, or mental health providers relative to the population. FQHCs located in HPSAs qualify for NHSC loan repayment and bonus Medicare payments.",
      es: "Una designación federal para áreas con muy pocos proveedores de atención primaria. Los FQHC en HPSA califican para el pago de préstamos NHSC y pagos adicionales de Medicare.",
    },
    category: "policy",
    relatedTerms: ["MUA", "NHSC", "HRSA"],
    learnMoreUrl: "/salary-data",
  },
  {
    term: "MUA",
    fullName: { en: "Medically Underserved Area", es: "Área Médicamente Desatendida" },
    definition: {
      en: "A geographic area with a shortage of healthcare services based on the ratio of providers to population, poverty rate, infant mortality, and elderly population. FQHCs must be located in or serve an MUA or MUP.",
      es: "Un área geográfica con escasez de servicios de salud basada en la proporción de proveedores a población, pobreza y mortalidad infantil.",
    },
    category: "policy",
    relatedTerms: ["HPSA", "FQHC", "Section 330"],
  },
  {
    term: "Wrap-Around Payment",
    fullName: { en: "Wrap-Around Payment (Medicaid)", es: "Pago Complementario (Medicaid)" },
    definition: {
      en: "The additional payment FQHCs receive from Medicaid to make up the difference between the managed care plan's payment and the FQHC's PPS rate. Ensures FQHCs are reimbursed at their full cost-based rate.",
      es: "El pago adicional que los FQHC reciben de Medicaid para compensar la diferencia entre el pago del plan de salud y la tarifa PPS del FQHC.",
    },
    category: "reimbursement",
    relatedTerms: ["PPS", "Medicaid", "FQHC"],
  },
  {
    term: "VBP",
    fullName: { en: "Value-Based Payment", es: "Pago Basado en Valor" },
    definition: {
      en: "A reimbursement model that rewards providers for quality outcomes rather than volume of services. FQHCs are increasingly moving toward VBP through quality bonuses, shared savings, and capitation arrangements.",
      es: "Un modelo de reembolso que recompensa a los proveedores por resultados de calidad en lugar del volumen de servicios.",
    },
    category: "reimbursement",
    relatedTerms: ["APM", "ACO", "PPS"],
    learnMoreUrl: "/strategy/economics",
  },
  {
    term: "Scope of Practice",
    fullName: { en: "Scope of Practice", es: "Alcance de la Práctica" },
    definition: {
      en: "The legal boundaries defining what services a healthcare professional can provide based on their license, training, and state regulations. In FQHCs, working at 'top of scope' maximizes team productivity and revenue.",
      es: "Los límites legales que definen qué servicios puede proporcionar un profesional de salud según su licencia, capacitación y regulaciones estatales.",
    },
    category: "workforce",
    relatedTerms: ["CHW", "NP", "PA"],
    learnMoreUrl: "/strategy/scope-of-practice",
  },
  {
    term: "Health Equity",
    fullName: { en: "Health Equity", es: "Equidad en Salud" },
    definition: {
      en: "The principle that everyone should have a fair opportunity to achieve their full health potential regardless of race, income, geography, or social position. FQHCs are central to health equity because they serve communities facing the greatest barriers to care.",
      es: "El principio de que todos deben tener una oportunidad justa de alcanzar su máximo potencial de salud sin importar raza, ingresos o posición social.",
    },
    category: "clinical",
    relatedTerms: ["SDOH", "CLAS", "FQHC"],
    learnMoreUrl: "/strategy/cultural-humility",
  },
  {
    term: "SDOH",
    fullName: { en: "Social Determinants of Health", es: "Determinantes Sociales de la Salud" },
    definition: {
      en: "The non-medical factors that shape health outcomes—housing, food security, education, employment, and transportation. FQHCs screen for and address SDOH through CalAIM Community Supports and care coordination.",
      es: "Los factores no médicos que influyen en los resultados de salud—vivienda, seguridad alimentaria, educación, empleo y transporte.",
    },
    category: "clinical",
    relatedTerms: ["CalAIM Community Supports", "Health Equity", "ECM"],
    learnMoreUrl: "/strategy/cultural-humility",
  },
  {
    term: "Promotora",
    fullName: { en: "Promotora / Promotor de Salud", es: "Promotor/a de Salud" },
    definition: {
      en: "A Spanish-language term for Community Health Worker, especially common in Latino communities. Promotoras bridge cultural and language gaps between patients and clinics through health education, outreach, and advocacy.",
      es: "Un trabajador de salud comunitaria que conecta a las comunidades latinas con servicios de salud mediante educación, alcance comunitario y apoyo cultural.",
    },
    category: "workforce",
    relatedTerms: ["CHW", "CLAS", "Health Equity"],
    learnMoreUrl: "/career-roadmap",
  },
  {
    term: "Care Coordination",
    fullName: { en: "Care Coordination", es: "Coordinación de la Atención" },
    definition: {
      en: "The organized process of managing a patient's care across multiple providers, settings, and services. In FQHCs, care coordinators connect patients to specialists, social services, and follow-up appointments.",
      es: "El proceso organizado de gestionar la atención de un paciente entre múltiples proveedores, entornos y servicios.",
    },
    category: "clinical",
    relatedTerms: ["ECM", "CCM", "PCMH"],
    learnMoreUrl: "/guides",
  },
  {
    term: "Population Health",
    fullName: { en: "Population Health Management", es: "Gestión de Salud Poblacional" },
    definition: {
      en: "An approach that uses data to improve health outcomes for a defined group of patients. FQHCs use population health to identify high-risk patients, track chronic disease metrics, and allocate resources where they'll have the most impact.",
      es: "Un enfoque que usa datos para mejorar los resultados de salud de un grupo definido de pacientes.",
    },
    category: "clinical",
    relatedTerms: ["HEDIS", "UDS", "VBP"],
  },
  {
    term: "TIC",
    fullName: { en: "Trauma-Informed Care", es: "Atención Informada sobre Trauma" },
    definition: {
      en: "A clinical approach that recognizes the impact of trauma on patient health and behavior. FQHCs implement TIC by training staff to recognize trauma signs, avoid re-traumatization, and create safe healing environments.",
      es: "Un enfoque clínico que reconoce el impacto del trauma en la salud y el comportamiento del paciente.",
    },
    category: "clinical",
    relatedTerms: ["BH", "Health Equity"],
    learnMoreUrl: "/strategy/research",
  },
  {
    term: "MI",
    fullName: { en: "Motivational Interviewing", es: "Entrevista Motivacional" },
    definition: {
      en: "A collaborative counseling technique that helps patients find their own motivation for behavior change. Widely used in FQHCs for smoking cessation, diabetes management, substance use treatment, and chronic disease self-management.",
      es: "Una técnica de consejería colaborativa que ayuda a los pacientes a encontrar su propia motivación para cambiar comportamientos.",
    },
    category: "clinical",
    relatedTerms: ["BH", "SUD"],
  },
  {
    term: "SBIRT",
    fullName: { en: "Screening, Brief Intervention, and Referral to Treatment", es: "Cribado, Intervención Breve y Derivación a Tratamiento" },
    definition: {
      en: "A public health approach for screening patients for substance use disorders during routine visits. FQHCs use SBIRT to identify at-risk patients early and connect them with treatment before problems escalate.",
      es: "Un enfoque de salud pública para detectar trastornos por uso de sustancias durante visitas de rutina.",
    },
    category: "clinical",
    relatedTerms: ["SUD", "MAT/MOUD", "BH"],
  },
  {
    term: "Telehealth",
    fullName: { en: "Telehealth / Telemedicine", es: "Telesalud / Telemedicina" },
    definition: {
      en: "The delivery of healthcare services via video, phone, or messaging platforms. FQHCs expanded telehealth dramatically during COVID-19 and continue to use it for behavioral health, chronic disease follow-ups, and serving rural patients.",
      es: "La prestación de servicios de salud a través de video, teléfono o plataformas de mensajería.",
    },
    category: "technology",
    relatedTerms: ["EHR", "RPM"],
    learnMoreUrl: "/strategy/tech-stack",
  },
  {
    term: "RPM",
    fullName: { en: "Remote Patient Monitoring", es: "Monitoreo Remoto de Pacientes" },
    definition: {
      en: "Technology that allows FQHCs to track patient health data (blood pressure, glucose, weight) outside the clinic using connected devices. RPM generates billable visits and improves chronic disease management outcomes.",
      es: "Tecnología que permite a los FQHC rastrear datos de salud del paciente fuera de la clínica usando dispositivos conectados.",
    },
    category: "technology",
    relatedTerms: ["Telehealth", "CCM", "BHI"],
  },
  {
    term: "BHI",
    fullName: { en: "Behavioral Health Integration", es: "Integración de Salud Conductual" },
    definition: {
      en: "A Medicare billing code set (99484, 99492-99494) that reimburses FQHCs for integrating behavioral health services into primary care. Also refers to the broader clinical model of co-locating mental health within FQHC settings.",
      es: "Un conjunto de códigos de facturación de Medicare que reembolsa a los FQHC por integrar servicios de salud mental en la atención primaria.",
    },
    category: "reimbursement",
    relatedTerms: ["BH", "CCM", "Medicare"],
    learnMoreUrl: "/guides",
  },
  {
    term: "CCM Billing",
    fullName: { en: "Chronic Care Management (Billing)", es: "Gestión de Atención Crónica (Facturación)" },
    definition: {
      en: "A Medicare billing program (CPT 99490, 99491) that reimburses FQHCs for non-face-to-face care coordination for patients with two or more chronic conditions. Requires 20+ minutes of staff time per month. Distinct from CalAIM's Complex Care Management.",
      es: "Un programa de facturación de Medicare que reembolsa a los FQHC por la coordinación de atención para pacientes con dos o más condiciones crónicas.",
    },
    category: "reimbursement",
    relatedTerms: ["CCM", "RPM", "Medicare"],
  },
  {
    term: "AWV",
    fullName: { en: "Annual Wellness Visit", es: "Visita Anual de Bienestar" },
    definition: {
      en: "A yearly preventive visit covered by Medicare that includes health risk assessment, personalized prevention plan, and screening referrals. FQHCs use AWVs to improve quality metrics and identify care gaps proactively.",
      es: "Una visita preventiva anual cubierta por Medicare que incluye evaluación de riesgo de salud y plan de prevención personalizado.",
    },
    category: "reimbursement",
    relatedTerms: ["Medicare", "HEDIS", "Quality Improvement"],
  },
  {
    term: "Risk Adjustment",
    fullName: { en: "Risk Adjustment / Risk Stratification", es: "Ajuste de Riesgo / Estratificación de Riesgo" },
    definition: {
      en: "A payment methodology that adjusts reimbursement based on the health complexity of a patient population. FQHCs serving sicker patients receive higher payments. Accurate documentation and HCC coding drive risk-adjusted revenue.",
      es: "Una metodología de pago que ajusta el reembolso según la complejidad de salud de la población de pacientes.",
    },
    category: "reimbursement",
    relatedTerms: ["HCC", "VBP", "Medicare"],
  },
  {
    term: "HCC",
    fullName: { en: "Hierarchical Condition Category", es: "Categoría de Condición Jerárquica" },
    definition: {
      en: "A coding system used by Medicare and managed care plans to classify patient diagnoses for risk adjustment. Accurate HCC coding at FQHCs ensures appropriate reimbursement for the complexity of patients served.",
      es: "Un sistema de codificación utilizado por Medicare para clasificar diagnósticos de pacientes para el ajuste de riesgo.",
    },
    category: "reimbursement",
    relatedTerms: ["Risk Adjustment", "RVU", "Medicare"],
  },
  {
    term: "QI",
    fullName: { en: "Quality Improvement", es: "Mejora de Calidad" },
    definition: {
      en: "A systematic approach to continuously improving patient care, safety, and operational efficiency. FQHCs use QI methodologies like PDSA cycles and Lean to improve UDS metrics, HEDIS scores, and patient satisfaction.",
      es: "Un enfoque sistemático para mejorar continuamente la atención al paciente, la seguridad y la eficiencia operacional.",
    },
    category: "compliance",
    relatedTerms: ["UDS", "HEDIS", "PCMH"],
  },
  {
    term: "UDS Clinical Measures",
    fullName: { en: "UDS Clinical Quality Measures", es: "Medidas Clínicas de Calidad UDS" },
    definition: {
      en: "Specific quality metrics FQHCs report annually to HRSA—including diabetes control (HbA1c <9%), hypertension control (<140/90), cervical cancer screening, and depression screening. Performance affects grant funding.",
      es: "Métricas específicas de calidad que los FQHC reportan anualmente a HRSA, incluyendo control de diabetes, hipertensión y cribado de cáncer cervical.",
    },
    category: "compliance",
    relatedTerms: ["UDS", "HEDIS", "QI"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper Functions                                                   */
/* ------------------------------------------------------------------ */

/**
 * Get a glossary term by acronym/name
 */
export function getTermDefinition(term: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );
}

/**
 * Get all terms in a specific category
 */
export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((t) => t.category === category);
}

/**
 * Search glossary by term, full name, or definition
 */
export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.fullName.en.toLowerCase().includes(q) ||
      t.fullName.es.toLowerCase().includes(q) ||
      t.definition.en.toLowerCase().includes(q) ||
      t.definition.es.toLowerCase().includes(q)
  );
}

/**
 * Get all unique categories (for filtering UI)
 */
export function getAllCategories(): GlossaryCategory[] {
  return Array.from(
    new Set(GLOSSARY_TERMS.map((t) => t.category))
  ) as GlossaryCategory[];
}

/**
 * Get all terms that are related to a given term
 */
export function getRelatedTerms(term: string): GlossaryTerm[] {
  const glossaryTerm = getTermDefinition(term);
  if (!glossaryTerm || !glossaryTerm.relatedTerms) return [];
  return glossaryTerm.relatedTerms
    .map((relatedName) => getTermDefinition(relatedName))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

/**
 * Get category metadata for display
 */
export const CATEGORY_LABELS: Record<GlossaryCategory, { en: string; es: string }> = {
  reimbursement: { en: "Reimbursement", es: "Reembolso" },
  program: { en: "Program", es: "Programa" },
  clinical: { en: "Clinical", es: "Clínico" },
  compliance: { en: "Compliance", es: "Cumplimiento" },
  technology: { en: "Technology", es: "Tecnología" },
  workforce: { en: "Workforce", es: "Fuerza Laboral" },
  policy: { en: "Policy", es: "Política" },
  organization: { en: "Organization", es: "Organización" },
};

/**
 * Get category color for badge display
 */
export const CATEGORY_COLORS: Record<GlossaryCategory, string> = {
  reimbursement: "bg-amber-50 text-amber-700 border-amber-200",
  program: "bg-teal-50 text-teal-700 border-teal-200",
  clinical: "bg-blue-50 text-blue-700 border-blue-200",
  compliance: "bg-orange-50 text-orange-700 border-orange-200",
  technology: "bg-purple-50 text-purple-700 border-purple-200",
  workforce: "bg-green-50 text-green-700 border-green-200",
  policy: "bg-red-50 text-red-700 border-red-200",
  organization: "bg-slate-50 text-slate-700 border-slate-200",
};
