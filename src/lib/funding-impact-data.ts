// funding-impact-data.ts
// Data for the interactive funding impact dashboard
// Tracks H.R. 1, state budget cuts, and their impact on FQHCs, patients, and programs
// Last updated: 2026-02-15

/* ------------------------------------------------------------------ */
/*  Timeline of policy changes                                         */
/* ------------------------------------------------------------------ */

export interface PolicyChange {
  id: string;
  date: string; // ISO date
  title: { en: string; es: string };
  description: { en: string; es: string };
  impact: { en: string; es: string };
  category: "federal" | "state" | "local";
  affectsUndocumented: boolean;
  affectsDental: boolean;
  affectsCalAIM: boolean;
  dollarAmount: string | null; // e.g. "$30B/year"
  peopleAffected: string | null; // e.g. "3.4 million"
  source: string;
  sourceTitle: string;
}

export const policyTimeline: PolicyChange[] = [
  {
    id: "hr1-signed",
    date: "2025-07-04",
    title: {
      en: "H.R. 1 \"One Big Beautiful Bill\" Signed Into Law",
      es: "H.R. 1 \"One Big Beautiful Bill\" Firmada como Ley",
    },
    description: {
      en: "Congress enacts the largest Medicaid funding reduction in the program's 60-year history, cutting nearly $1 trillion from Medicaid nationwide.",
      es: "El Congreso aprueba la mayor reducción de financiamiento de Medicaid en los 60 años del programa, recortando casi $1 billón de Medicaid a nivel nacional.",
    },
    impact: {
      en: "California faces $30 billion/year in Medi-Cal funding cuts. By 2034, an estimated 10 million Americans will lose coverage.",
      es: "California enfrenta recortes de $30 mil millones/año en Medi-Cal. Para 2034, se estima que 10 millones de estadounidenses perderán cobertura.",
    },
    category: "federal",
    affectsUndocumented: true,
    affectsDental: false,
    affectsCalAIM: true,
    dollarAmount: "$1T (national) / $30B/yr (CA)",
    peopleAffected: "14M+ Medi-Cal enrollees",
    source: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceTitle: "California Health Care Foundation",
  },
  {
    id: "ca-enrollment-freeze",
    date: "2026-01-01",
    title: {
      en: "Medi-Cal Enrollment Freeze for Undocumented Adults",
      es: "Congelamiento de Inscripción en Medi-Cal para Adultos Indocumentados",
    },
    description: {
      en: "California freezes full-scope Medi-Cal enrollment for new undocumented applicants aged 19+. Existing enrollees retain coverage if they complete annual renewal. New enrollment limited to emergency and pregnancy-related care only.",
      es: "California congela la inscripción de alcance completo en Medi-Cal para nuevos solicitantes indocumentados de 19+ años. Los inscritos existentes mantienen cobertura si completan la renovación anual. Nueva inscripción limitada solo a emergencias y cuidado prenatal.",
    },
    impact: {
      en: "Approximately 1.7 million undocumented immigrants currently enrolled are grandfathered in. New arrivals and those who lose coverage cannot re-enroll in full-scope benefits.",
      es: "Aproximadamente 1.7 millones de inmigrantes indocumentados actualmente inscritos mantienen su cobertura. Los nuevos llegados y quienes pierdan la cobertura no pueden reinscribirse en beneficios completos.",
    },
    category: "state",
    affectsUndocumented: true,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: "$77.9M savings in 2025-26, rising to $3.3B by 2028-29",
    peopleAffected: "1.7M currently enrolled; unknown # of future applicants",
    source: "https://calmatters.org/health/2025/05/newsom-freeze-medi-cal-undocumented-immigrants/",
    sourceTitle: "CalMatters",
  },
  {
    id: "dental-elimination",
    date: "2026-07-01",
    title: {
      en: "Dental Coverage Eliminated for Undocumented Adults",
      es: "Cobertura Dental Eliminada para Adultos Indocumentados",
    },
    description: {
      en: "Full-scope dental benefits removed for Medi-Cal members aged 19+ with unsatisfactory immigration status. This includes undocumented individuals, DACA recipients, TPS holders, asylum applicants, U visa applicants, and lawful permanent residents in the 5-year waiting period.",
      es: "Los beneficios dentales completos son eliminados para miembros de Medi-Cal mayores de 19 años con estatus migratorio insatisfactorio. Esto incluye personas indocumentadas, beneficiarios de DACA, titulares de TPS, solicitantes de asilo, solicitantes de visa U, y residentes permanentes legales en el período de espera de 5 años.",
    },
    impact: {
      en: "Only emergency dental services (pain, infection, urgent care) will remain. Preventive and restorative dental care eliminated. FQHCs lose dental revenue for this population AND lose PPS reimbursement rates.",
      es: "Solo quedan servicios dentales de emergencia (dolor, infección, atención urgente). Se elimina la atención dental preventiva y restaurativa. Los FQHCs pierden ingresos dentales para esta población Y pierden las tasas de reembolso PPS.",
    },
    category: "state",
    affectsUndocumented: true,
    affectsDental: true,
    affectsCalAIM: false,
    dollarAmount: "$308M savings in 2026-27; $336M annually thereafter",
    peopleAffected: "1.7M+ undocumented Medi-Cal enrollees",
    source: "https://www.familydocs.org/news-governors-2025-26-may-revision-proposes-major-cuts-to-healthcare-and-undermines-medi-cal-expansion-commitments/",
    sourceTitle: "California Academy of Family Physicians",
  },
  {
    id: "pps-elimination",
    date: "2026-07-01",
    title: {
      en: "PPS Rates Eliminated for FQHCs Serving Undocumented Patients",
      es: "Tasas PPS Eliminadas para FQHCs que Atienden Pacientes Indocumentados",
    },
    description: {
      en: "Prospective Payment System (PPS) rates — the enhanced reimbursement that FQHCs rely on — are eliminated for state-only-funded services provided to undocumented individuals. FQHCs will instead receive lower Medi-Cal Fee Schedule rates.",
      es: "Las tasas del Sistema de Pago Prospectivo (PPS) — el reembolso mejorado del que dependen los FQHCs — son eliminadas para servicios financiados solo por el estado proporcionados a personas indocumentadas. Los FQHCs recibirán en su lugar las tasas más bajas del Calendario de Tarifas de Medi-Cal.",
    },
    impact: {
      en: "FQHCs face a massive revenue reduction for every visit by an undocumented patient. PPS rates average $200-400/visit vs. $80-120 on the fee schedule — a 50-70% cut per encounter.",
      es: "Los FQHCs enfrentan una reducción masiva de ingresos por cada visita de un paciente indocumentado. Las tasas PPS promedian $200-400/visita vs. $80-120 en el calendario de tarifas — un recorte del 50-70% por encuentro.",
    },
    category: "state",
    affectsUndocumented: true,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: "50-70% revenue cut per undocumented patient visit",
    peopleAffected: "All FQHCs serving undocumented patients",
    source: "https://calbudgetcenter.org/resources/first-look-understanding-the-governors-2025-26-may-revision/",
    sourceTitle: "California Budget & Policy Center",
  },
  {
    id: "hr1-community-engagement",
    date: "2026-10-01",
    title: {
      en: "Work/Community Engagement Requirements Begin",
      es: "Requisitos de Trabajo/Participación Comunitaria Comienzan",
    },
    description: {
      en: "Under H.R. 1, nondisabled, childless adults on Medicaid must comply with new community engagement (work) requirements. States can add work requirements that may cause eligible people to lose coverage due to paperwork errors.",
      es: "Bajo H.R. 1, adultos sin discapacidad y sin hijos en Medicaid deben cumplir con nuevos requisitos de participación comunitaria (trabajo). Los estados pueden agregar requisitos de trabajo que pueden causar que personas elegibles pierdan cobertura por errores de papeleo.",
    },
    impact: {
      en: "In other states that implemented work requirements, up to 25% of eligible enrollees lost coverage due to administrative burden — not because they were ineligible.",
      es: "En otros estados que implementaron requisitos de trabajo, hasta el 25% de los inscritos elegibles perdieron cobertura por carga administrativa — no porque no fueran elegibles.",
    },
    category: "federal",
    affectsUndocumented: false,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: null,
    peopleAffected: "Millions of childless adults on Medi-Cal",
    source: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceTitle: "California Health Care Foundation",
  },
  {
    id: "hr1-undocumented-fmap",
    date: "2026-10-01",
    title: {
      en: "Federal Match Reduced for Emergency Services to Undocumented",
      es: "Aportación Federal Reducida para Servicios de Emergencia a Indocumentados",
    },
    description: {
      en: "H.R. 1 reduces the FMAP (Federal Medical Assistance Percentage) from 90% to California's standard rate for emergency medical services to undocumented immigrants. Emergency coverage remains but at lower federal match.",
      es: "H.R. 1 reduce el FMAP (Porcentaje Federal de Asistencia Médica) del 90% a la tasa estándar de California para servicios médicos de emergencia para inmigrantes indocumentados. La cobertura de emergencia permanece pero con menor aportación federal.",
    },
    impact: {
      en: "California must absorb significantly more of the cost of emergency care for undocumented individuals. Hospitals and FQHCs providing emergency care face funding shortfalls.",
      es: "California debe absorber significativamente más del costo de atención de emergencia para personas indocumentadas. Hospitales y FQHCs que brindan atención de emergencia enfrentan déficits de financiamiento.",
    },
    category: "federal",
    affectsUndocumented: true,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: null,
    peopleAffected: "All undocumented Californians needing emergency care",
    source: "https://paragoninstitute.org/medicaid/immigration-and-health-care-in-the-one-big-beautiful-bill-how-the-new-law-reforms-eligibility-for-medicaid-medicare-and-aca-subsidies/",
    sourceTitle: "Paragon Health Institute",
  },
  {
    id: "calaim-waiver-expiry",
    date: "2026-12-31",
    title: {
      en: "CalAIM Waiver Expires — ECM & Community Supports at Risk",
      es: "Expiración del Waiver CalAIM — ECM y Apoyos Comunitarios en Riesgo",
    },
    description: {
      en: "California's CalAIM 1115 waiver expires at the end of 2026. Under the current federal administration, renewal is uncertain. CalAIM funds ECM ($956M) and Community Supports ($231M) — programs that serve the highest-need Medi-Cal members.",
      es: "El waiver 1115 de CalAIM de California expira a finales de 2026. Bajo la administración federal actual, la renovación es incierta. CalAIM financia ECM ($956M) y Apoyos Comunitarios ($231M) — programas que atienden a los miembros de Medi-Cal de mayor necesidad.",
    },
    impact: {
      en: "If the waiver is not renewed, FQHCs could lose billions in ECM and Community Supports revenue. CHWs, care coordinators, and patient navigators funded by these programs face layoffs.",
      es: "Si el waiver no se renueva, los FQHCs podrían perder miles de millones en ingresos de ECM y Apoyos Comunitarios. Los CHWs, coordinadores de cuidados y navegadores de pacientes financiados por estos programas enfrentan despidos.",
    },
    category: "federal",
    affectsUndocumented: false,
    affectsDental: false,
    affectsCalAIM: true,
    dollarAmount: "$1.2B/year (ECM + Community Supports)",
    peopleAffected: "Highest-need Medi-Cal members statewide",
    source: "https://lao.ca.gov/Publications/Report/5003",
    sourceTitle: "CA Legislative Analyst's Office",
  },
  {
    id: "premiums-undocumented",
    date: "2027-07-01",
    title: {
      en: "$30/Month Premium for Undocumented Medi-Cal Members",
      es: "Prima de $30/Mes para Miembros Indocumentados de Medi-Cal",
    },
    description: {
      en: "Undocumented Medi-Cal members aged 19-59 who are not pregnant must pay a $30 monthly premium to retain full-scope coverage. Those who cannot pay may lose coverage.",
      es: "Los miembros indocumentados de Medi-Cal de 19 a 59 años que no estén embarazadas deben pagar una prima mensual de $30 para mantener la cobertura completa. Quienes no puedan pagar pueden perder cobertura.",
    },
    impact: {
      en: "Even modest premiums cause significant coverage loss among low-income populations. Studies show 15-25% of eligible enrollees drop coverage when premiums are introduced.",
      es: "Incluso primas modestas causan pérdida significativa de cobertura entre poblaciones de bajos ingresos. Los estudios muestran que el 15-25% de los inscritos elegibles abandonan la cobertura cuando se introducen primas.",
    },
    category: "state",
    affectsUndocumented: true,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: "$30/month per enrollee",
    peopleAffected: "~1.7M undocumented Medi-Cal enrollees aged 19-59",
    source: "https://healthconsumer.org/medi-cal-changes-and-what-you-need-to-know/",
    sourceTitle: "Health Consumer Alliance",
  },
  {
    id: "retroactive-coverage-reduction",
    date: "2027-01-01",
    title: {
      en: "Retroactive Medi-Cal Coverage Reduced",
      es: "Cobertura Retroactiva de Medi-Cal Reducida",
    },
    description: {
      en: "H.R. 1 reduces retroactive coverage from 3 months to 2 months (1 month for expansion adults). This means more medical debt for low-income patients and more uncompensated care for providers.",
      es: "H.R. 1 reduce la cobertura retroactiva de 3 meses a 2 meses (1 mes para adultos de expansión). Esto significa más deuda médica para pacientes de bajos ingresos y más atención no compensada para proveedores.",
    },
    impact: {
      en: "Hospitals and FQHCs will provide more uncompensated care. Low-income patients face medical debt for care received before enrollment was processed.",
      es: "Hospitales y FQHCs proporcionarán más atención no compensada. Los pacientes de bajos ingresos enfrentan deuda médica por atención recibida antes de que su inscripción fuera procesada.",
    },
    category: "federal",
    affectsUndocumented: false,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: null,
    peopleAffected: "All new Medi-Cal enrollees",
    source: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    sourceTitle: "California Health Care Foundation",
  },
  {
    id: "copays-begin",
    date: "2028-10-01",
    title: {
      en: "$35 Copays for Non-Essential Services (FQHCs Exempt)",
      es: "Copagos de $35 para Servicios No Esenciales (FQHCs Exentos)",
    },
    description: {
      en: "ACA expansion adults face up to $35 copays for \"non-essential\" services. FQHCs, behavioral health clinics, and rural health clinics are exempt from these copays.",
      es: "Los adultos de expansión ACA enfrentan copagos de hasta $35 por servicios \"no esenciales\". Los FQHCs, clínicas de salud mental y clínicas rurales están exentos de estos copagos.",
    },
    impact: {
      en: "While FQHCs are exempt, copays at other providers may push more patients toward FQHCs — increasing demand without increasing FQHC funding.",
      es: "Aunque los FQHCs están exentos, los copagos en otros proveedores pueden empujar más pacientes hacia los FQHCs — aumentando la demanda sin aumentar el financiamiento de los FQHCs.",
    },
    category: "federal",
    affectsUndocumented: false,
    affectsDental: false,
    affectsCalAIM: false,
    dollarAmount: "Up to $35/visit at non-FQHC providers",
    peopleAffected: "ACA expansion adults at non-exempt providers",
    source: "https://www.marincounty.gov/departments/executive/budget-and-priority-setting/legislative-support-and-advocacy/legislative-letters/september-9-full-informational-report-update-board-hr-1-one-big-beautiful-bill-act",
    sourceTitle: "Marin County Board Report",
  },
];

/* ------------------------------------------------------------------ */
/*  Impact statistics                                                   */
/* ------------------------------------------------------------------ */

export interface ImpactStat {
  id: string;
  value: string;
  label: { en: string; es: string };
  context: { en: string; es: string };
  icon: "dollar" | "people" | "hospital" | "dental" | "chart" | "warning";
  color: "red" | "amber" | "teal" | "blue";
}

export const impactStats: ImpactStat[] = [
  {
    id: "medi-cal-cuts",
    value: "$30B",
    label: {
      en: "Annual Medi-Cal Cuts",
      es: "Recortes Anuales a Medi-Cal",
    },
    context: {
      en: "per year cut from California's Medi-Cal program under H.R. 1",
      es: "por año recortados del programa Medi-Cal de California bajo H.R. 1",
    },
    icon: "dollar",
    color: "red",
  },
  {
    id: "undocumented-enrolled",
    value: "1.7M",
    label: {
      en: "Undocumented Enrolled",
      es: "Indocumentados Inscritos",
    },
    context: {
      en: "undocumented immigrants currently enrolled in Medi-Cal facing coverage changes",
      es: "inmigrantes indocumentados actualmente inscritos en Medi-Cal enfrentando cambios de cobertura",
    },
    icon: "people",
    color: "amber",
  },
  {
    id: "could-lose-coverage",
    value: "3.4M",
    label: {
      en: "Could Lose Coverage",
      es: "Podrían Perder Cobertura",
    },
    context: {
      en: "Californians at risk of losing Medi-Cal coverage due to federal and state changes",
      es: "californianos en riesgo de perder cobertura de Medi-Cal debido a cambios federales y estatales",
    },
    icon: "warning",
    color: "red",
  },
  {
    id: "dental-savings",
    value: "$308M",
    label: {
      en: "Dental Cuts (Year 1)",
      es: "Recortes Dentales (Año 1)",
    },
    context: {
      en: "saved by eliminating dental coverage for undocumented adults — at the cost of preventive care",
      es: "ahorrados al eliminar la cobertura dental para adultos indocumentados — a costa de la atención preventiva",
    },
    icon: "dental",
    color: "amber",
  },
  {
    id: "calaim-at-risk",
    value: "$1.2B",
    label: {
      en: "CalAIM Funding at Risk",
      es: "Fondos CalAIM en Riesgo",
    },
    context: {
      en: "in ECM + Community Supports funding at risk when the CalAIM waiver expires Dec 2026",
      es: "en fondos de ECM + Apoyos Comunitarios en riesgo cuando el waiver CalAIM expire en dic 2026",
    },
    icon: "chart",
    color: "teal",
  },
  {
    id: "fqhcs-at-risk",
    value: "1,400+",
    label: {
      en: "Health Centers at Risk",
      es: "Centros de Salud en Riesgo",
    },
    context: {
      en: "community health centers nationally face revenue shortfalls from Medicaid restructuring",
      es: "centros de salud comunitarios a nivel nacional enfrentan déficits de ingresos por reestructuración de Medicaid",
    },
    icon: "hospital",
    color: "blue",
  },
];

/* ------------------------------------------------------------------ */
/*  Programs affected                                                   */
/* ------------------------------------------------------------------ */

export interface ProgramImpact {
  id: string;
  name: string;
  nameEs: string;
  description: { en: string; es: string };
  status: "eliminated" | "reduced" | "at-risk" | "frozen" | "protected";
  effectiveDate: string;
  revenueImpact: { en: string; es: string };
  patientsAffected: string;
  affectsUndocumented: boolean;
}

export const programImpacts: ProgramImpact[] = [
  {
    id: "full-scope-medi-cal",
    name: "Full-Scope Medi-Cal (Undocumented Adults)",
    nameEs: "Medi-Cal de Alcance Completo (Adultos Indocumentados)",
    description: {
      en: "California's historic expansion of full Medi-Cal coverage to all income-eligible adults regardless of immigration status, enacted via AB 133 (2021) and expanded through 2024.",
      es: "La expansión histórica de California de cobertura completa de Medi-Cal para todos los adultos elegibles por ingresos sin importar su estatus migratorio, promulgada mediante AB 133 (2021) y expandida hasta 2024.",
    },
    status: "frozen",
    effectiveDate: "2026-01-01",
    revenueImpact: {
      en: "$77.9M savings in 2025-26, growing to $3.3B by 2028-29",
      es: "$77.9M de ahorro en 2025-26, creciendo a $3.3B para 2028-29",
    },
    patientsAffected: "1.7M currently enrolled",
    affectsUndocumented: true,
  },
  {
    id: "denti-cal-undocumented",
    name: "Denti-Cal for Undocumented Adults",
    nameEs: "Denti-Cal para Adultos Indocumentados",
    description: {
      en: "Full-scope dental benefits for Medi-Cal members aged 19+ with unsatisfactory immigration status. Includes preventive, restorative, and emergency dental care.",
      es: "Beneficios dentales completos para miembros de Medi-Cal mayores de 19 años con estatus migratorio insatisfactorio. Incluye atención dental preventiva, restaurativa y de emergencia.",
    },
    status: "eliminated",
    effectiveDate: "2026-07-01",
    revenueImpact: {
      en: "$308M/year in state savings. FQHCs lose both dental revenue and PPS rates for these patients.",
      es: "$308M/año en ahorros estatales. Los FQHCs pierden tanto los ingresos dentales como las tasas PPS para estos pacientes.",
    },
    patientsAffected: "1.7M+ affected enrollees",
    affectsUndocumented: true,
  },
  {
    id: "pps-rates-undocumented",
    name: "PPS Rates for Undocumented Patient Services",
    nameEs: "Tasas PPS para Servicios a Pacientes Indocumentados",
    description: {
      en: "Enhanced Prospective Payment System reimbursement rates that FQHCs receive for serving Medi-Cal patients. PPS rates average $200-400/visit vs. $80-120 on the standard fee schedule.",
      es: "Las tasas de reembolso mejoradas del Sistema de Pago Prospectivo que los FQHCs reciben por atender pacientes de Medi-Cal. Las tasas PPS promedian $200-400/visita vs. $80-120 en el calendario de tarifas estándar.",
    },
    status: "eliminated",
    effectiveDate: "2026-07-01",
    revenueImpact: {
      en: "50-70% revenue cut per undocumented patient visit for FQHCs",
      es: "Recorte de ingresos del 50-70% por visita de paciente indocumentado para FQHCs",
    },
    patientsAffected: "All FQHCs serving undocumented patients",
    affectsUndocumented: true,
  },
  {
    id: "ecm-program",
    name: "Enhanced Care Management (ECM)",
    nameEs: "Manejo Mejorado de Cuidados (ECM)",
    description: {
      en: "CalAIM's flagship care coordination program for highest-need Medi-Cal members. Funds CHWs, care coordinators, and patient navigators at FQHCs. $956M annual budget.",
      es: "El programa estrella de coordinación de cuidados de CalAIM para los miembros de Medi-Cal de mayor necesidad. Financia CHWs, coordinadores de cuidados y navegadores de pacientes en FQHCs. Presupuesto anual de $956M.",
    },
    status: "at-risk",
    effectiveDate: "2026-12-31",
    revenueImpact: {
      en: "$956M/year at risk when CalAIM waiver expires. Federal renewal uncertain under current administration.",
      es: "$956M/año en riesgo cuando el waiver CalAIM expire. Renovación federal incierta bajo la administración actual.",
    },
    patientsAffected: "Highest-need Medi-Cal members statewide",
    affectsUndocumented: false,
  },
  {
    id: "community-supports",
    name: "Community Supports",
    nameEs: "Apoyos Comunitarios",
    description: {
      en: "CalAIM benefit providing housing navigation, medically tailored meals, and other social determinants of health services. $231M annual budget. Federal administration has signaled opposition to social-services-oriented Medicaid spending.",
      es: "Beneficio CalAIM que proporciona navegación de vivienda, comidas adaptadas médicamente y otros servicios de determinantes sociales de salud. Presupuesto anual de $231M. La administración federal ha señalado oposición al gasto de Medicaid orientado a servicios sociales.",
    },
    status: "at-risk",
    effectiveDate: "2026-12-31",
    revenueImpact: {
      en: "$231M/year at risk. Federal guidelines supporting social services spending were rescinded in March 2025.",
      es: "$231M/año en riesgo. Las directrices federales que apoyaban el gasto en servicios sociales fueron rescindidas en marzo de 2025.",
    },
    patientsAffected: "Members receiving housing, meals, and social services",
    affectsUndocumented: false,
  },
  {
    id: "mco-tax",
    name: "Managed Care Organization (MCO) Tax",
    nameEs: "Impuesto a Organizaciones de Cuidado Administrado (MCO)",
    description: {
      en: "California's provider tax mechanism that generates $7-8 billion in federal Medicaid matching funds annually. H.R. 1 limits provider taxes starting January 2026, potentially undermining this critical funding source.",
      es: "El mecanismo de impuesto a proveedores de California que genera $7-8 mil millones en fondos federales de contrapartida de Medicaid anualmente. H.R. 1 limita los impuestos a proveedores desde enero 2026, potencialmente socavando esta fuente de financiamiento crítica.",
    },
    status: "at-risk",
    effectiveDate: "2026-01-01",
    revenueImpact: {
      en: "Up to $7-8B/year in federal matching funds at risk",
      es: "Hasta $7-8B/año en fondos federales de contrapartida en riesgo",
    },
    patientsAffected: "All 14M+ Medi-Cal enrollees",
    affectsUndocumented: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Revenue impact model for FQHCs                                      */
/* ------------------------------------------------------------------ */

export interface FQHCRevenueImpact {
  category: string;
  categoryEs: string;
  currentRevenue: string;
  projectedLoss: string;
  percentLoss: number;
  description: { en: string; es: string };
}

export const fqhcRevenueModel: FQHCRevenueImpact[] = [
  {
    category: "Medi-Cal Reimbursement (General)",
    categoryEs: "Reembolso de Medi-Cal (General)",
    currentRevenue: "60-80% of FQHC revenue",
    projectedLoss: "10-25% reduction",
    percentLoss: 17,
    description: {
      en: "Provider payment caps under H.R. 1 will edge rates downward from current levels toward substantially lower Medicare levels starting in 2028.",
      es: "Los topes de pago a proveedores bajo H.R. 1 reducirán las tasas gradualmente desde los niveles actuales hacia niveles de Medicare sustancialmente más bajos a partir de 2028.",
    },
  },
  {
    category: "PPS Rates (Undocumented Patients)",
    categoryEs: "Tasas PPS (Pacientes Indocumentados)",
    currentRevenue: "$200-400/visit",
    projectedLoss: "Reduced to $80-120/visit",
    percentLoss: 60,
    description: {
      en: "State budget eliminates PPS rates for undocumented patient services. FQHCs reimbursed at standard fee schedule instead — a 50-70% cut per visit.",
      es: "El presupuesto estatal elimina las tasas PPS para servicios a pacientes indocumentados. Los FQHCs son reembolsados al calendario de tarifas estándar — un recorte del 50-70% por visita.",
    },
  },
  {
    category: "Dental Revenue",
    categoryEs: "Ingresos Dentales",
    currentRevenue: "10-15% of FQHC revenue (for those with dental)",
    projectedLoss: "Near-total loss for undocumented patients",
    percentLoss: 85,
    description: {
      en: "Dental coverage eliminated for undocumented adults effective July 2026. Only emergency dental services remain. FQHCs must absorb the cost or stop providing care.",
      es: "Cobertura dental eliminada para adultos indocumentados efectivo julio 2026. Solo quedan servicios dentales de emergencia. Los FQHCs deben absorber el costo o dejar de brindar atención.",
    },
  },
  {
    category: "CalAIM ECM/Community Supports",
    categoryEs: "CalAIM ECM/Apoyos Comunitarios",
    currentRevenue: "$1.2B statewide",
    projectedLoss: "Uncertain — waiver expires Dec 2026",
    percentLoss: 40,
    description: {
      en: "If the CalAIM waiver is not renewed, ECM and Community Supports funding could be cut or restructured. CHW and care coordinator positions funded by these programs are at highest risk.",
      es: "Si el waiver CalAIM no se renueva, el financiamiento de ECM y Apoyos Comunitarios podría ser recortado o reestructurado. Los puestos de CHW y coordinadores de cuidados financiados por estos programas tienen el mayor riesgo.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Key sources & articles for embedding                                */
/* ------------------------------------------------------------------ */

export interface KeySource {
  title: { en: string; es: string };
  url: string;
  publisher: string;
  date: string;
  type: "article" | "report" | "data" | "legislation" | "video";
  relevance: "primary" | "supporting";
}

export const keySources: KeySource[] = [
  {
    title: {
      en: "How Massive Federal Cuts Will Create Unprecedented Challenges for Medi-Cal",
      es: "Cómo los Recortes Federales Masivos Crearán Desafíos Sin Precedentes para Medi-Cal",
    },
    url: "https://www.chcf.org/resource/how-massive-federal-cuts-will-create-unprecedented-challenges-medi-cal-patients-providers/",
    publisher: "California Health Care Foundation",
    date: "2025-10-15",
    type: "report",
    relevance: "primary",
  },
  {
    title: {
      en: "H.R. 1 and the Federal Budget: How California Leaders Can Respond",
      es: "H.R. 1 y el Presupuesto Federal: Cómo Pueden Responder los Líderes de California",
    },
    url: "https://calbudgetcenter.org/resources/hr1-and-the-federal-budget-how-california-leaders-can-respond-to-trumps-cuts/",
    publisher: "California Budget & Policy Center",
    date: "2025-09-01",
    type: "report",
    relevance: "primary",
  },
  {
    title: {
      en: "CalAIM ECM and Community Supports Implementation Update",
      es: "Actualización de Implementación de ECM y Apoyos Comunitarios de CalAIM",
    },
    url: "https://lao.ca.gov/Publications/Report/5003",
    publisher: "CA Legislative Analyst's Office",
    date: "2025-03-06",
    type: "report",
    relevance: "primary",
  },
  {
    title: {
      en: "Newsom Proposes to Freeze Medi-Cal Enrollment for Undocumented Immigrants",
      es: "Newsom Propone Congelar la Inscripción en Medi-Cal para Inmigrantes Indocumentados",
    },
    url: "https://calmatters.org/health/2025/05/newsom-freeze-medi-cal-undocumented-immigrants/",
    publisher: "CalMatters",
    date: "2025-05-14",
    type: "article",
    relevance: "primary",
  },
  {
    title: {
      en: "California DHCS H.R.1 Implementation Plan",
      es: "Plan de Implementación de H.R.1 del DHCS de California",
    },
    url: "https://www.dhcs.ca.gov/federal-impacts/Documents/DHCS-HR1-Implementation-Plan.pdf",
    publisher: "CA Dept. of Health Care Services",
    date: "2026-01-29",
    type: "legislation",
    relevance: "primary",
  },
  {
    title: {
      en: "The State of Health Coverage in California: Progress, Disparities, and Policy Threats",
      es: "El Estado de la Cobertura de Salud en California: Progreso, Disparidades y Amenazas de Política",
    },
    url: "https://calbudgetcenter.org/resources/california-health-coverage-progress-disparities-and-policy-threats/",
    publisher: "California Budget & Policy Center",
    date: "2025-12-01",
    type: "report",
    relevance: "supporting",
  },
  {
    title: {
      en: "Valley Hospitals, Clinics Brace for Financial 'Tsunami'",
      es: "Hospitales y Clínicas del Valle se Preparan para 'Tsunami' Financiero",
    },
    url: "https://hanfordsentinel.com/business/valley-hospitals-clinics-brace-for-financial-tsunami-threatening-health-care-access/article_6b322558-6092-43a5-81db-d4e44d17400e.html",
    publisher: "Hanford Sentinel",
    date: "2026-01-15",
    type: "article",
    relevance: "supporting",
  },
  {
    title: {
      en: "The Future of Enhanced Care Management: Why CalAIM Must Be Protected",
      es: "El Futuro del Manejo Mejorado de Cuidados: Por Qué CalAIM Debe Ser Protegido",
    },
    url: "https://presidiumhealth.com/future-of-enhanced-care-management-calaim-advocacy/",
    publisher: "Presidium Health",
    date: "2025-11-01",
    type: "article",
    relevance: "supporting",
  },
  {
    title: {
      en: "Medi-Cal Changes and What You Need to Know",
      es: "Cambios en Medi-Cal y Lo Que Necesitas Saber",
    },
    url: "https://healthconsumer.org/medi-cal-changes-and-what-you-need-to-know/",
    publisher: "Health Consumer Alliance",
    date: "2025-12-15",
    type: "article",
    relevance: "supporting",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: status labels                                               */
/* ------------------------------------------------------------------ */

export const programStatusLabels: Record<string, { en: string; es: string }> = {
  eliminated: { en: "Eliminated", es: "Eliminado" },
  reduced: { en: "Reduced", es: "Reducido" },
  "at-risk": { en: "At Risk", es: "En Riesgo" },
  frozen: { en: "Frozen", es: "Congelado" },
  protected: { en: "Protected", es: "Protegido" },
};

/* ------------------------------------------------------------------ */
/*  Primary legislation sources with direct links                      */
/* ------------------------------------------------------------------ */

export interface LegislationSource {
  id: string;
  shortName: string;
  officialName: string;
  esOfficialName: string;
  level: "federal" | "state" | "local";
  status: "enacted" | "proposed" | "expired" | "pending";
  dateEnacted: string | null;
  dateEffective: string | null;
  billTextUrl: string;
  fullTextPdfUrl: string | null;
  summaryUrl: string | null;
  keyProvisions: {
    sectionRef: string;
    title: { en: string; es: string };
    summary: { en: string; es: string };
    specificLanguage: string | null;
    impact: { en: string; es: string };
  }[];
  fqhcImpact: { en: string; es: string };
  tags: string[];
}

export const legislationSources: LegislationSource[] = [
  /* --- FEDERAL --- */
  {
    id: "hr1-obbba",
    shortName: "H.R. 1 — One Big Beautiful Bill Act",
    officialName: "One Big Beautiful Bill Act (P.L. 119-21)",
    esOfficialName: "Ley One Big Beautiful Bill (P.L. 119-21)",
    level: "federal",
    status: "enacted",
    dateEnacted: "2025-07-04",
    dateEffective: "2025-07-04",
    billTextUrl: "https://www.congress.gov/bill/119th-congress/house-bill/1/text",
    fullTextPdfUrl: "https://www.congress.gov/119/plaws/publ21/PLAW-119publ21.pdf",
    summaryUrl: "https://www.congress.gov/crs-product/R48569",
    keyProvisions: [
      {
        sectionRef: "Section 71107",
        title: {
          en: "6-Month Eligibility Redeterminations",
          es: "Redeterminaciones de Elegibilidad Cada 6 Meses",
        },
        summary: {
          en: "Requires states to increase Medicaid eligibility redeterminations from every 12 months to every 6 months for ACA expansion adults, effective January 1, 2027. Exempts American Indians/Alaska Natives eligible for IHS.",
          es: "Requiere que los estados aumenten las redeterminaciones de elegibilidad de Medicaid de cada 12 meses a cada 6 meses para adultos de expansión ACA, efectivo el 1 de enero de 2027. Exime a indígenas americanos/nativos de Alaska elegibles para IHS.",
        },
        specificLanguage: "\"Beginning January 1, 2027...each State shall redetermine the eligibility of each individual enrolled under [the ACA expansion] not less frequently than once every 6 months.\"",
        impact: {
          en: "Doubles the administrative burden for states and enrollees. CBO estimates millions will lose coverage due to paperwork, not ineligibility. FQHCs will see patient churn and revenue disruption.",
          es: "Duplica la carga administrativa para estados e inscritos. La CBO estima que millones perderán cobertura por papeleo, no por inelegibilidad. Los FQHCs verán rotación de pacientes e interrupción de ingresos.",
        },
      },
      {
        sectionRef: "Section 71119",
        title: {
          en: "Medicaid Community Engagement (Work) Requirements",
          es: "Requisitos de Participación Comunitaria (Trabajo) de Medicaid",
        },
        summary: {
          en: "Establishes mandatory work/community engagement requirements for non-disabled Medicaid expansion adults ages 19-64. Requires 80 hours/month of employment, job training, education, or community service. Parents exempt only if youngest child is under 14. States must implement by January 1, 2027 (with possible extension to December 31, 2028).",
          es: "Establece requisitos obligatorios de trabajo/participación comunitaria para adultos no discapacitados de expansión Medicaid de 19-64 años. Requiere 80 horas/mes de empleo, capacitación laboral, educación o servicio comunitario. Padres exentos solo si el hijo menor tiene menos de 14 años. Los estados deben implementar antes del 1 de enero de 2027 (con posible extensión hasta el 31 de diciembre de 2028).",
        },
        specificLanguage: "\"As a condition of eligibility...an applicable individual shall participate in...not less than 80 hours per month\" in qualifying activities including \"unsubsidized or subsidized employment...a work program...educational activities...community service.\"",
        impact: {
          en: "CBO projects $325.6 billion reduction in federal Medicaid outlays over 10 years. An estimated 5 million people nationwide will lose coverage. In California, 8.2 million non-disabled adults ages 19-64 are at risk — 62% of whom already work.",
          es: "La CBO proyecta una reducción de $325.6 mil millones en gastos federales de Medicaid en 10 años. Se estima que 5 millones de personas a nivel nacional perderán cobertura. En California, 8.2 millones de adultos no discapacitados de 19-64 años están en riesgo — el 62% de los cuales ya trabajan.",
        },
      },
      {
        sectionRef: "Section 71108",
        title: {
          en: "Reduced Retroactive Coverage",
          es: "Cobertura Retroactiva Reducida",
        },
        summary: {
          en: "Reduces retroactive Medicaid coverage from 3 months to 1 month for ACA expansion adults and 2 months for other groups (children, elderly, disabled). Effective January 1, 2027.",
          es: "Reduce la cobertura retroactiva de Medicaid de 3 meses a 1 mes para adultos de expansión ACA y 2 meses para otros grupos (niños, adultos mayores, discapacitados). Efectivo el 1 de enero de 2027.",
        },
        specificLanguage: null,
        impact: {
          en: "Patients will face medical debt for care received before enrollment was processed. FQHCs and hospitals will provide more uncompensated care for newly enrolled patients.",
          es: "Los pacientes enfrentarán deuda médica por atención recibida antes de que su inscripción fuera procesada. Los FQHCs y hospitales proporcionarán más atención no compensada para pacientes recién inscritos.",
        },
      },
      {
        sectionRef: "Section 71120",
        title: {
          en: "Copayments for Expansion Adults (FQHCs Exempt)",
          es: "Copagos para Adultos de Expansión (FQHCs Exentos)",
        },
        summary: {
          en: "Beginning October 1, 2028, ACA expansion adults with income above 100% FPL face copays up to $35 per service. FQHCs, behavioral health clinics, and rural health clinics are explicitly exempt.",
          es: "A partir del 1 de octubre de 2028, adultos de expansión ACA con ingresos superiores al 100% FPL enfrentan copagos de hasta $35 por servicio. Los FQHCs, clínicas de salud mental y clínicas rurales están explícitamente exentos.",
        },
        specificLanguage: null,
        impact: {
          en: "FQHC copay exemption creates a competitive advantage — patients may shift from non-exempt providers to FQHCs, increasing demand. FQHCs should prepare for volume increases.",
          es: "La exención de copagos para FQHCs crea una ventaja competitiva — los pacientes pueden cambiar de proveedores no exentos a FQHCs, aumentando la demanda. Los FQHCs deben prepararse para aumentos de volumen.",
        },
      },
      {
        sectionRef: "Title IV — Provider Tax Limits",
        title: {
          en: "State Provider Tax and Directed Payment Restrictions",
          es: "Restricciones de Impuestos a Proveedores Estatales y Pagos Dirigidos",
        },
        summary: {
          en: "Limits state Medicaid provider taxes and directed payments, threatening California's MCO tax mechanism that generates $7-8 billion annually in federal matching funds.",
          es: "Limita los impuestos a proveedores de Medicaid estatales y pagos dirigidos, amenazando el mecanismo de impuesto MCO de California que genera $7-8 mil millones anuales en fondos federales de contrapartida.",
        },
        specificLanguage: null,
        impact: {
          en: "California relies heavily on the MCO tax to draw down federal matching funds. If restricted, the state faces a multi-billion dollar funding gap that could lead to provider rate cuts.",
          es: "California depende en gran medida del impuesto MCO para obtener fondos federales de contrapartida. Si se restringe, el estado enfrenta un déficit de miles de millones que podría llevar a recortes de tasas a proveedores.",
        },
      },
    ],
    fqhcImpact: {
      en: "FQHCs face a cascading crisis: patient coverage losses from work requirements and redeterminations reduce revenue, while increased demand from copay-exempt status strains capacity. Total projected impact: $840B in federal Medicaid cuts over 10 years, 10 million Americans losing coverage by 2034.",
      es: "Los FQHCs enfrentan una crisis en cascada: las pérdidas de cobertura de pacientes por requisitos de trabajo y redeterminaciones reducen los ingresos, mientras que la mayor demanda por el estatus exento de copagos presiona la capacidad. Impacto total proyectado: $840B en recortes federales de Medicaid en 10 años, 10 millones de estadounidenses perdiendo cobertura para 2034.",
    },
    tags: ["medicaid", "work-requirements", "redeterminations", "copays", "provider-tax"],
  },
  {
    id: "aca-section-2001",
    shortName: "ACA Section 2001 — Medicaid Expansion",
    officialName: "Patient Protection and Affordable Care Act (P.L. 111-148), Section 2001",
    esOfficialName: "Ley de Protección al Paciente y Cuidado de Salud Asequible (P.L. 111-148), Sección 2001",
    level: "federal",
    status: "enacted",
    dateEnacted: "2010-03-23",
    dateEffective: "2014-01-01",
    billTextUrl: "https://www.govinfo.gov/content/pkg/PLAW-111publ148/html/PLAW-111publ148.htm",
    fullTextPdfUrl: "https://www.congress.gov/111/plaws/publ148/PLAW-111publ148.pdf",
    summaryUrl: "https://www.dpc.senate.gov/healthreformbill/healthbill05.pdf",
    keyProvisions: [
      {
        sectionRef: "§2001(a)(1) — 42 U.S.C. §1396a(a)(10)(A)(i)(VIII)",
        title: {
          en: "Medicaid Expansion to 133% FPL",
          es: "Expansión de Medicaid al 133% del FPL",
        },
        summary: {
          en: "Created a new mandatory Medicaid eligibility category for all non-elderly, non-pregnant adults with income at or below 133% of the Federal Poverty Level (effectively 138% with the 5% income disregard). 100% federal funding for newly eligible through 2016, phased down to 90% by 2020.",
          es: "Creó una nueva categoría obligatoria de elegibilidad de Medicaid para todos los adultos no ancianos, no embarazados con ingresos iguales o inferiores al 133% del Nivel Federal de Pobreza (efectivamente 138% con el descuento del 5% de ingresos). Financiamiento federal del 100% para nuevos elegibles hasta 2016, reducido al 90% para 2020.",
        },
        specificLanguage: "\"[A state plan must provide] for making medical assistance available...to all individuals...under age 65...not described in [other eligibility categories]...whose income does not exceed 133 percent of the poverty line.\"",
        impact: {
          en: "Expanded Medicaid to approximately 20 million Americans. In California, Medi-Cal enrollment grew from 8.6M to 14.7M. FQHCs saw dramatic increases in insured patients and revenue. Now threatened by H.R. 1 restructuring.",
          es: "Expandió Medicaid a aproximadamente 20 millones de estadounidenses. En California, la inscripción en Medi-Cal creció de 8.6M a 14.7M. Los FQHCs vieron aumentos dramáticos en pacientes asegurados e ingresos. Ahora amenazado por la reestructuración de H.R. 1.",
        },
      },
    ],
    fqhcImpact: {
      en: "The ACA expansion was transformative for FQHCs — converting millions of uninsured patients into Medi-Cal enrollees with PPS reimbursement. California FQHCs became financially sustainable largely because of this expansion. H.R. 1 now threatens to reverse these gains.",
      es: "La expansión del ACA fue transformadora para los FQHCs — convirtiendo millones de pacientes sin seguro en inscritos de Medi-Cal con reembolso PPS. Los FQHCs de California se volvieron financieramente sostenibles en gran parte gracias a esta expansión. H.R. 1 ahora amenaza con revertir estas ganancias.",
    },
    tags: ["aca", "medicaid-expansion", "medi-cal"],
  },
  {
    id: "phs-act-section-330",
    shortName: "Section 330 — FQHC Authorization",
    officialName: "Public Health Service Act, Section 330 (42 U.S.C. §254b)",
    esOfficialName: "Ley del Servicio de Salud Pública, Sección 330 (42 U.S.C. §254b)",
    level: "federal",
    status: "enacted",
    dateEnacted: "1996-10-11",
    dateEffective: "1996-10-11",
    billTextUrl: "https://www.law.cornell.edu/uscode/text/42/254b",
    fullTextPdfUrl: "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title42-section254b&num=0&edition=prelim",
    summaryUrl: "https://bphc.hrsa.gov/compliance/compliance-manual/introduction",
    keyProvisions: [
      {
        sectionRef: "§330(a) — Definition of Health Center",
        title: {
          en: "Health Center Definition and Mission",
          es: "Definición y Misión de Centro de Salud",
        },
        summary: {
          en: "Defines a 'health center' as an entity serving a medically underserved population by providing required primary care and related services. Includes special populations: migratory/seasonal agricultural workers (§330g), homeless (§330h), and public housing residents (§330i).",
          es: "Define un 'centro de salud' como una entidad que sirve a una población médicamente desatendida proporcionando atención primaria requerida y servicios relacionados. Incluye poblaciones especiales: trabajadores agrícolas migrantes/estacionales (§330g), personas sin hogar (§330h) y residentes de vivienda pública (§330i).",
        },
        specificLanguage: "\"The term 'health center' means an entity that serves a population that is medically underserved...by providing, either through the staff and supporting resources of the center or through contracts or cooperative arrangements — required primary health care services.\"",
        impact: {
          en: "This is the foundational federal law authorizing FQHCs. Section 330 grant funding is the bedrock of the community health center model, supplementing patient revenue to ensure care regardless of ability to pay.",
          es: "Esta es la ley federal fundacional que autoriza los FQHCs. El financiamiento de subvenciones de la Sección 330 es la base del modelo de centro de salud comunitario, complementando los ingresos de pacientes para asegurar atención sin importar la capacidad de pago.",
        },
      },
    ],
    fqhcImpact: {
      en: "Section 330 grants fund FQHCs' core mission of serving the underserved. Any cuts to Section 330 funding directly threaten FQHC viability. The Health Center Program Fund ($4B annually) expires and requires periodic Congressional reauthorization.",
      es: "Las subvenciones de la Sección 330 financian la misión central de los FQHCs de servir a los desatendidos. Cualquier recorte al financiamiento de la Sección 330 amenaza directamente la viabilidad de los FQHCs. El Fondo del Programa de Centros de Salud ($4B anuales) expira y requiere reautorización periódica del Congreso.",
    },
    tags: ["fqhc", "section-330", "health-centers", "hrsa"],
  },
  /* --- STATE (CALIFORNIA) --- */
  {
    id: "ca-ab-133",
    shortName: "AB 133 — CalAIM Authorization",
    officialName: "Assembly Bill 133 (2021-2022): Budget Act Health Omnibus — CalAIM",
    esOfficialName: "Proyecto de Ley AB 133 (2021-2022): Ley de Presupuesto de Salud — CalAIM",
    level: "state",
    status: "enacted",
    dateEnacted: "2021-07-27",
    dateEffective: "2022-01-01",
    billTextUrl: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202120220AB133",
    fullTextPdfUrl: null,
    summaryUrl: "https://www.dhcs.ca.gov/CalAIM",
    keyProvisions: [
      {
        sectionRef: "CalAIM Initiative — Enhanced Care Management",
        title: {
          en: "Enhanced Care Management (ECM) Benefit",
          es: "Beneficio de Manejo Mejorado de Cuidados (ECM)",
        },
        summary: {
          en: "Establishes ECM as a Medi-Cal benefit designed to address clinical and nonclinical needs on a whole-person-care basis for target populations enrolled in managed care. Managed care plans must consult with county mental health plans for ECM delivery.",
          es: "Establece ECM como un beneficio de Medi-Cal diseñado para abordar las necesidades clínicas y no clínicas de manera integral para poblaciones objetivo inscritas en atención administrada. Los planes de atención administrada deben consultar con los planes de salud mental del condado para la entrega de ECM.",
        },
        specificLanguage: "\"The department shall implement an enhanced care management benefit designed to address the clinical and nonclinical needs on a whole-person-care basis for certain target populations of Medi-Cal beneficiaries enrolled in managed care plans.\"",
        impact: {
          en: "ECM funds CHWs, care coordinators, and patient navigators at FQHCs. $956M annual budget. This is a primary revenue source for FQHC care coordination staff. Waiver expires December 2026.",
          es: "ECM financia CHWs, coordinadores de cuidados y navegadores de pacientes en FQHCs. Presupuesto anual de $956M. Esta es una fuente principal de ingresos para el personal de coordinación de cuidados de FQHCs. El waiver expira en diciembre de 2026.",
        },
      },
      {
        sectionRef: "CalAIM Initiative — Community Supports",
        title: {
          en: "Community Supports (In Lieu of Services)",
          es: "Apoyos Comunitarios (En Lugar de Servicios)",
        },
        summary: {
          en: "Authorizes Medi-Cal managed care plans to cover community supports as medically appropriate alternatives — including housing navigation, medically tailored meals, and other social determinants of health services.",
          es: "Autoriza a los planes de atención administrada de Medi-Cal a cubrir apoyos comunitarios como alternativas médicamente apropiadas — incluyendo navegación de vivienda, comidas adaptadas médicamente y otros servicios de determinantes sociales de salud.",
        },
        specificLanguage: null,
        impact: {
          en: "$231M/year funds housing navigation, medically tailored meals, and SDOH services. FQHCs and community-based organizations depend on this revenue stream.",
          es: "$231M/año financian navegación de vivienda, comidas adaptadas médicamente y servicios de SDOH. Los FQHCs y organizaciones comunitarias dependen de este flujo de ingresos.",
        },
      },
      {
        sectionRef: "CalAIM Initiative — PATH Program",
        title: {
          en: "Providing Access and Transforming Health (PATH) Incentive Program",
          es: "Programa de Incentivos PATH (Proveyendo Acceso y Transformando Salud)",
        },
        summary: {
          en: "Authorizes incentive payments, grants, and financial support for infrastructure and capacity building to advance CalAIM goals.",
          es: "Autoriza pagos de incentivos, subvenciones y apoyo financiero para infraestructura y desarrollo de capacidades para avanzar los objetivos de CalAIM.",
        },
        specificLanguage: null,
        impact: {
          en: "PATH funding supports FQHC infrastructure investment — EHR upgrades, workforce training, and practice transformation.",
          es: "El financiamiento PATH apoya la inversión en infraestructura de FQHCs — actualizaciones de EHR, capacitación de fuerza laboral y transformación de prácticas.",
        },
      },
    ],
    fqhcImpact: {
      en: "CalAIM is the framework for California's Medi-Cal transformation. FQHCs depend on ECM and Community Supports revenue for care coordination staff. The 1115 waiver authorizing CalAIM expires December 2026 — renewal under the current federal administration is uncertain.",
      es: "CalAIM es el marco para la transformación de Medi-Cal en California. Los FQHCs dependen de los ingresos de ECM y Apoyos Comunitarios para el personal de coordinación de cuidados. El waiver 1115 que autoriza CalAIM expira en diciembre de 2026 — la renovación bajo la administración federal actual es incierta.",
    },
    tags: ["calaim", "ecm", "community-supports", "medi-cal"],
  },
  {
    id: "ca-sb-525",
    shortName: "SB 525 — Healthcare Minimum Wage",
    officialName: "Senate Bill 525 (2023-2024): Minimum Wages: Health Care Workers",
    esOfficialName: "Proyecto de Ley SB 525 (2023-2024): Salarios Mínimos: Trabajadores de Salud",
    level: "state",
    status: "enacted",
    dateEnacted: "2023-10-13",
    dateEffective: "2024-06-01",
    billTextUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    fullTextPdfUrl: null,
    summaryUrl: "https://leginfo.legislature.ca.gov/faces/billAnalysisClient.xhtml?bill_id=202320240SB525",
    keyProvisions: [
      {
        sectionRef: "Wage Schedule — Large Employers & Dialysis",
        title: {
          en: "Phase-In for Large Health Systems (10,000+ FTEs)",
          es: "Implementación Gradual para Grandes Sistemas de Salud (10,000+ FTEs)",
        },
        summary: {
          en: "$23/hr from June 2024, $24/hr from June 2025, $25/hr from June 2026. Applies to employers with 10,000+ FTE, integrated delivery systems, dialysis clinics, and large county facilities.",
          es: "$23/hr desde junio 2024, $24/hr desde junio 2025, $25/hr desde junio 2026. Aplica a empleadores con 10,000+ FTE, sistemas de entrega integrados, clínicas de diálisis e instalaciones de condados grandes.",
        },
        specificLanguage: null,
        impact: {
          en: "Large FQHCs like AltaMed (40+ clinics) are on this faster timeline. Increased labor costs must be absorbed or offset by revenue gains.",
          es: "FQHCs grandes como AltaMed (40+ clínicas) están en esta línea de tiempo más rápida. Los costos laborales aumentados deben ser absorbidos o compensados por ganancias de ingresos.",
        },
      },
      {
        sectionRef: "Wage Schedule — Clinics (Specified)",
        title: {
          en: "Phase-In for Specified Clinics (Including FQHCs)",
          es: "Implementación Gradual para Clínicas Especificadas (Incluyendo FQHCs)",
        },
        summary: {
          en: "$21/hr from June 2024, $22/hr from June 2026, $25/hr from June 2027. Applies to clinics that meet specified requirements, including many FQHCs.",
          es: "$21/hr desde junio 2024, $22/hr desde junio 2026, $25/hr desde junio 2027. Aplica a clínicas que cumplen requisitos especificados, incluyendo muchos FQHCs.",
        },
        specificLanguage: null,
        impact: {
          en: "Most mid-size FQHCs fall into this category. The $25/hr wage floor by 2027 increases costs significantly for roles like medical assistants, patient service reps, and health navigators.",
          es: "La mayoría de los FQHCs medianos caen en esta categoría. El piso salarial de $25/hr para 2027 aumenta significativamente los costos para roles como asistentes médicos, representantes de servicios al paciente y navegadores de salud.",
        },
      },
      {
        sectionRef: "Wage Schedule — Rural & High Gov Payor",
        title: {
          en: "Extended Timeline for Rural/High-Governmental-Payor Facilities",
          es: "Línea de Tiempo Extendida para Instalaciones Rurales/Alto Pagador Gubernamental",
        },
        summary: {
          en: "$18/hr from June 2024 with a long ramp to $25/hr by June 2033. Applies to rural independent facilities and hospitals with high governmental payor mix.",
          es: "$18/hr desde junio 2024 con una rampa larga a $25/hr para junio 2033. Aplica a instalaciones independientes rurales y hospitales con alta mezcla de pagador gubernamental.",
        },
        specificLanguage: null,
        impact: {
          en: "Rural FQHCs in the Central Valley and inland areas get more time to adjust, but the extended timeline also means ongoing recruitment challenges competing with urban clinics paying more.",
          es: "Los FQHCs rurales del Valle Central y áreas del interior tienen más tiempo para ajustarse, pero la línea de tiempo extendida también significa desafíos continuos de reclutamiento compitiendo con clínicas urbanas que pagan más.",
        },
      },
    ],
    fqhcImpact: {
      en: "SB 525 raises the wage floor for all health care workers — a victory for labor but a cost pressure on FQHCs already facing revenue cuts. FQHCs must optimize revenue to absorb $25/hr minimums for support staff. SEIU-UHW and SEIU Community Clinic Workers United campaigned for this bill.",
      es: "SB 525 eleva el piso salarial para todos los trabajadores de salud — una victoria para el trabajo pero una presión de costos para FQHCs que ya enfrentan recortes de ingresos. Los FQHCs deben optimizar ingresos para absorber mínimos de $25/hr para personal de apoyo. SEIU-UHW y SEIU Community Clinic Workers United impulsaron este proyecto de ley.",
    },
    tags: ["minimum-wage", "healthcare-workers", "labor", "seiu"],
  },
  {
    id: "ca-ab-2697",
    shortName: "AB 2697 — CHW Medi-Cal Benefit",
    officialName: "Assembly Bill 2697 (2022): Medi-Cal: Community Health Worker Services",
    esOfficialName: "Proyecto de Ley AB 2697 (2022): Medi-Cal: Servicios de Trabajadores Comunitarios de Salud",
    level: "state",
    status: "enacted",
    dateEnacted: "2022-09-29",
    dateEffective: "2022-07-01",
    billTextUrl: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202120220AB2697",
    fullTextPdfUrl: null,
    summaryUrl: "https://www.dhcs.ca.gov/services/medi-cal/Documents/CHW-FAQs.pdf",
    keyProvisions: [
      {
        sectionRef: "CHW Medi-Cal Benefit Codification",
        title: {
          en: "Community Health Worker Services as Medi-Cal Benefit",
          es: "Servicios de Trabajadores Comunitarios de Salud como Beneficio de Medi-Cal",
        },
        summary: {
          en: "Codifies CHW services as a covered Medi-Cal benefit. Eligible services include health navigation, health education addressing social drivers of health, social needs screening and assessment, and individual support/advocacy. CHWs can bill through managed care plans for eligible Medi-Cal members.",
          es: "Codifica los servicios de CHW como un beneficio cubierto de Medi-Cal. Los servicios elegibles incluyen navegación de salud, educación sanitaria abordando los impulsores sociales de la salud, evaluación de necesidades sociales y apoyo/defensa individual. Los CHWs pueden facturar a través de planes de atención administrada para miembros elegibles de Medi-Cal.",
        },
        specificLanguage: "DHCS issued a statewide standing recommendation that all Medi-Cal members who meet defined eligibility criteria would benefit from CHW services, fulfilling federal requirements under 42 CFR §440.130(c).",
        impact: {
          en: "Opens a new revenue stream for FQHCs that employ CHWs. Members must meet criteria such as: chronic conditions, ACEs screening positive, unmet social needs, or recent ED/inpatient stays. Note: CHW services are NOT PPS-eligible visits but costs can be incorporated into PPS rates via change-in-scope.",
          es: "Abre un nuevo flujo de ingresos para FQHCs que emplean CHWs. Los miembros deben cumplir criterios como: condiciones crónicas, evaluación ACEs positiva, necesidades sociales no cubiertas o estancias recientes en ED/hospitalización. Nota: los servicios de CHW NO son visitas elegibles para PPS pero los costos pueden incorporarse a las tasas PPS mediante cambio de alcance.",
        },
      },
    ],
    fqhcImpact: {
      en: "CHW Medi-Cal billing is a crucial new revenue pathway — but many FQHCs have not yet leveraged it. CHW services can be billed through managed care OR incorporated into PPS rates. FQHCs should pursue change-in-scope requests to add CHW costs to their PPS base.",
      es: "La facturación de CHW por Medi-Cal es una nueva vía de ingresos crucial — pero muchos FQHCs aún no la han aprovechado. Los servicios de CHW pueden facturarse a través de atención administrada O incorporarse a las tasas PPS. Los FQHCs deben solicitar cambios de alcance para agregar costos de CHW a su base PPS.",
    },
    tags: ["chw", "community-health-workers", "medi-cal", "billing"],
  },
  {
    id: "ca-ab-204",
    shortName: "AB 204 — Clinic Workforce Retention",
    officialName: "Assembly Bill 204 (2022): Budget Act Health Omnibus — Clinic Retention Payments",
    esOfficialName: "Proyecto de Ley AB 204 (2022): Ley de Presupuesto de Salud — Pagos de Retención de Clínicas",
    level: "state",
    status: "enacted",
    dateEnacted: "2022-09-29",
    dateEffective: "2022-09-29",
    billTextUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB204",
    fullTextPdfUrl: null,
    summaryUrl: null,
    keyProvisions: [
      {
        sectionRef: "Clinic Workforce Stabilization",
        title: {
          en: "Retention Payments for Community Clinic Workers",
          es: "Pagos de Retención para Trabajadores de Clínicas Comunitarias",
        },
        summary: {
          en: "Established a clinic workforce stabilization retention payment program providing funds to eligible qualified clinics (including FQHCs and RHCs). Retention payments of up to $1,000 per eligible employee to address post-pandemic staffing shortages.",
          es: "Estableció un programa de pagos de retención de estabilización de la fuerza laboral de clínicas proporcionando fondos a clínicas calificadas elegibles (incluyendo FQHCs y RHCs). Pagos de retención de hasta $1,000 por empleado elegible para abordar la escasez de personal post-pandemia.",
        },
        specificLanguage: null,
        impact: {
          en: "One-time retention payments helped FQHCs retain staff during the post-COVID workforce crisis. SEIU 521 and other unions negotiated additional retention bonuses at individual FQHCs using this as a framework.",
          es: "Los pagos de retención únicos ayudaron a los FQHCs a retener personal durante la crisis de fuerza laboral post-COVID. SEIU 521 y otros sindicatos negociaron bonos de retención adicionales en FQHCs individuales usando esto como marco.",
        },
      },
    ],
    fqhcImpact: {
      en: "The retention payment program provided critical short-term relief. FQHCs should monitor for future workforce stabilization appropriations as the SB 525 minimum wage phase-in increases cost pressures.",
      es: "El programa de pagos de retención proporcionó alivio crítico a corto plazo. Los FQHCs deben monitorear futuras apropiaciones de estabilización de fuerza laboral a medida que la implementación gradual del salario mínimo SB 525 aumenta las presiones de costos.",
    },
    tags: ["workforce", "retention", "clinics", "labor"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: get legislation by level                                    */
/* ------------------------------------------------------------------ */

export function getLegislationByLevel(level: "federal" | "state" | "local"): LegislationSource[] {
  return legislationSources.filter((l) => l.level === level);
}

export function getLegislationByTag(tag: string): LegislationSource[] {
  return legislationSources.filter((l) => l.tags.includes(tag));
}

/* ------------------------------------------------------------------ */
/*  FQHC Revenue Optimization Strategies                               */
/*  California-focused strategies to increase, diversify, and unlock    */
/*  hidden revenue — especially critical during Medicaid restructuring  */
/* ------------------------------------------------------------------ */

export interface RevenueStrategy {
  id: string;
  title: { en: string; es: string };
  category: "billing" | "program" | "grants" | "operations" | "partnerships";
  difficulty: "low" | "medium" | "high";
  potentialRevenue: string;
  timeToImplement: string;
  description: { en: string; es: string };
  steps: { en: string; es: string }[];
  keyBillingCodes: string[] | null;
  relevantLegislation: string[] | null; // IDs from legislationSources
  sources: { title: string; url: string }[];
}

export const revenueStrategies: RevenueStrategy[] = [
  {
    id: "same-day-covisits",
    title: {
      en: "Same-Day Medical + Behavioral Health Co-Visits",
      es: "Co-Visitas Médicas + Salud Mental el Mismo Día",
    },
    category: "billing",
    difficulty: "medium",
    potentialRevenue: "$150–400 additional per co-visit",
    timeToImplement: "1–3 months",
    description: {
      en: "FQHCs can bill for two separate PPS visits on the same day when a patient sees a medical provider AND a behavioral health provider (clinical psychologist or LCSW). Many FQHCs already have behavioral health staff but don't schedule or bill co-visits. Under both Medicare PPS and Medi-Cal, this is a fully reimbursable second encounter.",
      es: "Los FQHCs pueden facturar dos visitas PPS separadas el mismo día cuando un paciente ve a un proveedor médico Y a un proveedor de salud mental (psicólogo clínico o LCSW). Muchos FQHCs ya tienen personal de salud mental pero no programan ni facturan co-visitas. Bajo Medicare PPS y Medi-Cal, este es un segundo encuentro completamente reembolsable.",
    },
    steps: [
      {
        en: "Audit current patient panels — identify patients with both medical and BH needs",
        es: "Auditar los paneles de pacientes actuales — identificar pacientes con necesidades médicas y de salud mental",
      },
      {
        en: "Implement warm handoffs: medical provider walks patient to BH provider same day",
        es: "Implementar transferencias directas: el proveedor médico acompaña al paciente al proveedor de salud mental el mismo día",
      },
      {
        en: "Train scheduling staff to pre-schedule co-visits for identified patients",
        es: "Capacitar al personal de programación para pre-programar co-visitas para pacientes identificados",
      },
      {
        en: "Submit two separate claims with different revenue codes (medical: 521, BH: 900)",
        es: "Enviar dos reclamos separados con diferentes códigos de ingresos (médico: 521, salud mental: 900)",
      },
    ],
    keyBillingCodes: ["Revenue Code 521 (medical)", "Revenue Code 900 (BH)", "90791", "90832-90838", "96150-96155"],
    relevantLegislation: null,
    sources: [
      {
        title: "Same-Day Billing for Medical and Mental Health Services at FQHCs — CHCF",
        url: "https://www.chcf.org/resource/same-day-billing-medical-mental-health-services-fqhcs/",
      },
      {
        title: "Can FQHCs bill for more than one visit on the same day? — AMA",
        url: "https://www.ama-assn.org/practice-management/sustainability/can-fqhcs-bill-more-one-visit-same-day-patient",
      },
    ],
  },
  {
    id: "care-management-cpt-codes",
    title: {
      en: "Chronic Care Management & Care Coordination (CPT Codes)",
      es: "Manejo de Cuidados Crónicos y Coordinación de Cuidados (Códigos CPT)",
    },
    category: "billing",
    difficulty: "medium",
    potentialRevenue: "$50–150/patient/month for qualifying patients",
    timeToImplement: "2–4 months",
    description: {
      en: "As of late 2025, FQHCs transitioned from the bundled G0511 code to individual CPT codes for care management services. This actually opens MORE billing opportunities — each service is now billed separately. Services include Chronic Care Management (CCM/99490, 99487, 99489), Behavioral Health Integration (BHI/99484), Remote Patient Monitoring (RPM/99457-99458), Community Health Integration (CHI), and Principal Illness Navigation (PIN). Multiple services can be billed for the same patient in a single month.",
      es: "Desde finales de 2025, los FQHCs pasaron del código agrupado G0511 a códigos CPT individuales para servicios de manejo de cuidados. Esto en realidad abre MÁS oportunidades de facturación — cada servicio se factura por separado. Los servicios incluyen Manejo de Cuidados Crónicos (CCM/99490, 99487, 99489), Integración de Salud Mental (BHI/99484), Monitoreo Remoto de Pacientes (RPM/99457-99458), Integración de Salud Comunitaria (CHI) y Navegación de Enfermedad Principal (PIN). Se pueden facturar múltiples servicios para el mismo paciente en un solo mes.",
    },
    steps: [
      {
        en: "Identify all patients with 2+ chronic conditions (CCM-eligible) in your EHR",
        es: "Identificar todos los pacientes con 2+ condiciones crónicas (elegibles para CCM) en su EHR",
      },
      {
        en: "Assign care management staff (RN, LVN, MA, CHW) to panels of chronic patients",
        es: "Asignar personal de manejo de cuidados (RN, LVN, MA, CHW) a paneles de pacientes crónicos",
      },
      {
        en: "Document at least 20 minutes of non-face-to-face care coordination monthly per patient",
        es: "Documentar al menos 20 minutos de coordinación de cuidados no presencial mensualmente por paciente",
      },
      {
        en: "Bill individual CPT codes (99490 for CCM, 99484 for BHI, etc.) — no longer use G0511",
        es: "Facturar códigos CPT individuales (99490 para CCM, 99484 para BHI, etc.) — ya no usar G0511",
      },
      {
        en: "Layer RPM codes for patients with devices (blood pressure cuffs, glucometers)",
        es: "Agregar códigos RPM para pacientes con dispositivos (tensiómetros, glucómetros)",
      },
    ],
    keyBillingCodes: ["99490", "99487", "99489", "99484", "99457", "99458", "99491"],
    relevantLegislation: null,
    sources: [
      {
        title: "New Code G0511 Transition: What FQHCs Should Know for 2025 — Prevounce",
        url: "https://blog.prevounce.com/whats-happening-with-care-management-code-g0511",
      },
      {
        title: "CMS 2025 Update: FQHC Billing for G0511 Replacement — Medcor Group",
        url: "https://medcorinc.com/cms-2025-update-fqhc-and-rhc-billing-deadline-for-g0511-replacement/",
      },
      {
        title: "Reimbursement Tips: CCM/CCCM/PCM — NACHC",
        url: "https://www.nachc.org/nachc-content/uploads/2023/07/Reimbursement-Tips_CCM-CCCM-PCM.pdf",
      },
    ],
  },
  {
    id: "chw-medi-cal-billing",
    title: {
      en: "Community Health Worker Medi-Cal Billing",
      es: "Facturación de Trabajadores Comunitarios de Salud por Medi-Cal",
    },
    category: "billing",
    difficulty: "medium",
    potentialRevenue: "Varies — managed care plan rates; up to 150% of Medi-Cal fee schedule at some plans",
    timeToImplement: "3–6 months (credentialing + contracting)",
    description: {
      en: "California added CHW services as a Medi-Cal benefit (AB 2697). FQHCs that employ CHWs can now bill managed care plans for health navigation, health education, social needs screening, and individual advocacy. DHCS issued a statewide standing recommendation for CHW services. While CHW services are NOT PPS-eligible, FQHCs can either bill managed care directly OR incorporate CHW costs into their PPS rate through a change-in-scope request. Some plans pay up to 150% of Medi-Cal rates, and there are $65K capacity grants available ($75K for bilingual CHWs).",
      es: "California agregó los servicios de CHW como un beneficio de Medi-Cal (AB 2697). Los FQHCs que emplean CHWs ahora pueden facturar a planes de atención administrada por navegación de salud, educación sanitaria, evaluación de necesidades sociales y defensa individual. DHCS emitió una recomendación permanente estatal para servicios de CHW. Aunque los servicios de CHW NO son elegibles para PPS, los FQHCs pueden facturar directamente a la atención administrada O incorporar costos de CHW en su tasa PPS mediante una solicitud de cambio de alcance. Algunos planes pagan hasta 150% de las tasas de Medi-Cal, y hay subvenciones de capacidad de $65K disponibles ($75K para CHWs bilingües).",
    },
    steps: [
      {
        en: "Ensure CHWs meet DHCS certification requirements (or are working toward certification)",
        es: "Asegurar que los CHWs cumplan los requisitos de certificación del DHCS (o estén trabajando hacia la certificación)",
      },
      {
        en: "Contract with managed care plans to bill for CHW services",
        es: "Contratar con planes de atención administrada para facturar servicios de CHW",
      },
      {
        en: "Screen Medi-Cal patients for CHW eligibility criteria (chronic conditions, ACEs, social needs)",
        es: "Evaluar pacientes de Medi-Cal para criterios de elegibilidad de CHW (condiciones crónicas, ACEs, necesidades sociales)",
      },
      {
        en: "Apply for Medi-Cal Capacity Grant ($65K per CHW, +$10K bilingual incentive)",
        es: "Solicitar Subvención de Capacidad de Medi-Cal ($65K por CHW, +$10K incentivo bilingüe)",
      },
      {
        en: "File change-in-scope to incorporate CHW costs into PPS rate (long-term strategy)",
        es: "Presentar cambio de alcance para incorporar costos de CHW en la tasa PPS (estrategia a largo plazo)",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: ["ca-ab-2697"],
    sources: [
      {
        title: "Medi-Cal Billing for Community Health Worker Services — Pear Suite",
        url: "https://www.pearsuite.com/post/medi-cal-billing-for-community-health-workers/",
      },
      {
        title: "CHW FAQs for FQHCs, RHCs, and IHS — DHCS",
        url: "https://www.dhcs.ca.gov/services/medi-cal/Documents/CHW-FAQs-FQHC-RHC-IHS.pdf",
      },
      {
        title: "Community Health Worker Services — Health Net California",
        url: "https://providerlibrary.healthnetcalifornia.com/medi-cal/provider-manual/calaim/community-health-worker-services-medi-cal.html",
      },
    ],
  },
  {
    id: "340b-optimization",
    title: {
      en: "340B Drug Pricing Program Optimization",
      es: "Optimización del Programa de Precios de Medicamentos 340B",
    },
    category: "program",
    difficulty: "high",
    potentialRevenue: "Avg. 5% of total operating budget; $500K–$2M+ annually for larger FQHCs",
    timeToImplement: "3–12 months (depending on current program maturity)",
    description: {
      en: "The 340B program allows FQHCs to purchase outpatient drugs at deeply discounted prices, generating significant savings that can be reinvested in patient care. Many FQHCs underutilize their 340B programs. Key optimization areas include: contract pharmacy analysis and expansion, specialty drug capture, virtual inventory models, 340B-specific software, and compliance oversight committees. WARNING: The 340B program faces significant threats in 2025-2026 — a potential shift from upfront discounts to a rebate model could create cash flow crises.",
      es: "El programa 340B permite a los FQHCs comprar medicamentos ambulatorios a precios profundamente descontados, generando ahorros significativos que pueden reinvertirse en atención al paciente. Muchos FQHCs subutilizan sus programas 340B. Las áreas clave de optimización incluyen: análisis y expansión de farmacias por contrato, captura de medicamentos especializados, modelos de inventario virtual, software específico para 340B y comités de supervisión de cumplimiento. ADVERTENCIA: El programa 340B enfrenta amenazas significativas en 2025-2026 — un posible cambio de descuentos iniciales a un modelo de reembolso podría crear crisis de flujo de efectivo.",
    },
    steps: [
      {
        en: "Audit current 340B capture rate — many FQHCs capture only 40-60% of eligible prescriptions",
        es: "Auditar la tasa de captura 340B actual — muchos FQHCs capturan solo el 40-60% de las recetas elegibles",
      },
      {
        en: "Evaluate and expand contract pharmacy relationships (specialty, mail order, retail)",
        es: "Evaluar y expandir relaciones con farmacias por contrato (especializadas, correo, minoristas)",
      },
      {
        en: "Invest in 340B-specific software that integrates with your EHR",
        es: "Invertir en software específico para 340B que se integre con su EHR",
      },
      {
        en: "Establish a monthly 340B oversight committee to review capture rates and compliance",
        es: "Establecer un comité mensual de supervisión 340B para revisar tasas de captura y cumplimiento",
      },
      {
        en: "Model financial impact of potential rebate-model shift and build cash reserves",
        es: "Modelar el impacto financiero del posible cambio al modelo de reembolso y construir reservas de efectivo",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: null,
    sources: [
      {
        title: "340B Discounts at Risk: What It Means for FQHCs — AAFCPAs",
        url: "https://www.aafcpa.com/2025/03/19/340b-discounts-at-risk-what-it-means-for-fqhcs-and-patient-care/",
      },
      {
        title: "340B Participation and Safety Net Engagement Among FQHCs — PMC",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11452821/",
      },
      {
        title: "The Hidden Revenue Opportunities Most FQHCs Are Missing — Jill Steeley",
        url: "https://www.jillsteeley.com/blog/the-hidden-revenue-opportunities-most-fqhcs-are-missing",
      },
    ],
  },
  {
    id: "ecm-community-supports",
    title: {
      en: "Enhanced Care Management & Community Supports (CalAIM)",
      es: "Manejo Mejorado de Cuidados y Apoyos Comunitarios (CalAIM)",
    },
    category: "program",
    difficulty: "medium",
    potentialRevenue: "Varies — ECM capitation rates per member per month",
    timeToImplement: "3–6 months to become ECM lead entity",
    description: {
      en: "CalAIM's Enhanced Care Management (ECM) program pays FQHCs capitated rates for intensive care coordination for highest-need Medi-Cal members. Community Supports pays for housing navigation, medically tailored meals, and SDOH services. FQHCs can serve as ECM lead entities or subcontract with managed care plans. This revenue stream funds CHWs, care coordinators, and patient navigators. Critical risk: the CalAIM 1115 waiver expires December 2026.",
      es: "El programa de Manejo Mejorado de Cuidados (ECM) de CalAIM paga a los FQHCs tasas capitadas por coordinación intensiva de cuidados para los miembros de Medi-Cal de mayor necesidad. Los Apoyos Comunitarios pagan por navegación de vivienda, comidas adaptadas médicamente y servicios de SDOH. Los FQHCs pueden servir como entidades líderes de ECM o subcontratar con planes de atención administrada. Este flujo de ingresos financia CHWs, coordinadores de cuidados y navegadores de pacientes. Riesgo crítico: el waiver 1115 de CalAIM expira en diciembre de 2026.",
    },
    steps: [
      {
        en: "Apply to become an ECM lead entity with your managed care plan(s)",
        es: "Solicitar ser una entidad líder de ECM con su(s) plan(es) de atención administrada",
      },
      {
        en: "Identify patients meeting ECM target population criteria in your panel",
        es: "Identificar pacientes que cumplan los criterios de población objetivo de ECM en su panel",
      },
      {
        en: "Build or expand care coordination team (CHWs, care coordinators, navigators)",
        es: "Construir o expandir el equipo de coordinación de cuidados (CHWs, coordinadores de cuidados, navegadores)",
      },
      {
        en: "Negotiate Community Supports contracts for housing navigation, medically tailored meals",
        es: "Negociar contratos de Apoyos Comunitarios para navegación de vivienda, comidas adaptadas médicamente",
      },
      {
        en: "Advocate for CalAIM waiver renewal — engage with DHCS and managed care plan partners",
        es: "Abogar por la renovación del waiver CalAIM — involucrarse con DHCS y socios de planes de atención administrada",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: ["ca-ab-133"],
    sources: [
      {
        title: "CalAIM — DHCS",
        url: "https://www.dhcs.ca.gov/CalAIM",
      },
      {
        title: "CalAIM ECM and Community Supports — CA Legislative Analyst's Office",
        url: "https://lao.ca.gov/Publications/Report/5003",
      },
    ],
  },
  {
    id: "sliding-fee-insurance-screening",
    title: {
      en: "Sliding Fee + Insurance Screening Optimization",
      es: "Optimización de Escala Deslizante + Evaluación de Seguro",
    },
    category: "operations",
    difficulty: "low",
    potentialRevenue: "Significant — converting uninsured to Medi-Cal increases revenue per visit 3-5x",
    timeToImplement: "1–2 months",
    description: {
      en: "Many FQHCs process sliding fee applications without checking if the patient qualifies for Medi-Cal, Covered California, or other insurance. By integrating systematic insurance screening into the sliding fee application process, FQHCs can convert uninsured patients to insured status — dramatically increasing revenue per visit from sliding-fee rates ($20-50) to PPS rates ($200-400). This is one of the simplest and highest-impact revenue strategies available.",
      es: "Muchos FQHCs procesan solicitudes de escala deslizante sin verificar si el paciente califica para Medi-Cal, Covered California u otro seguro. Al integrar la evaluación sistemática de seguro en el proceso de solicitud de escala deslizante, los FQHCs pueden convertir pacientes sin seguro a estado asegurado — aumentando dramáticamente los ingresos por visita de tasas de escala deslizante ($20-50) a tasas PPS ($200-400). Esta es una de las estrategias de ingresos más simples y de mayor impacto disponibles.",
    },
    steps: [
      {
        en: "Train front desk and eligibility staff to screen every sliding-fee applicant for Medi-Cal/Covered CA",
        es: "Capacitar al personal de recepción y elegibilidad para evaluar a cada solicitante de escala deslizante para Medi-Cal/Covered CA",
      },
      {
        en: "Add insurance screening questions to the sliding fee application form",
        es: "Agregar preguntas de evaluación de seguro al formulario de solicitud de escala deslizante",
      },
      {
        en: "Partner with a Certified Enrollment Entity (CEE) or train staff as Certified Application Assistors",
        es: "Asociarse con una Entidad de Inscripción Certificada (CEE) o capacitar personal como Asistentes de Solicitud Certificados",
      },
      {
        en: "Track conversion rates monthly: what % of sliding-fee patients were enrolled in coverage?",
        es: "Rastrear tasas de conversión mensualmente: ¿qué % de pacientes de escala deslizante fueron inscritos en cobertura?",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: null,
    sources: [
      {
        title: "Unlocking Hidden Revenue Potential in Your FQHC Sliding Fee Program — Community Link Consulting",
        url: "https://www.communitylinkconsulting.com/blog/revenue-potential-fqhc-sliding-fee-programs",
      },
    ],
  },
  {
    id: "pps-rate-rebasing",
    title: {
      en: "PPS Rate Rebasing & Change-in-Scope Requests",
      es: "Rebase de Tasas PPS y Solicitudes de Cambio de Alcance",
    },
    category: "operations",
    difficulty: "high",
    potentialRevenue: "10–30% PPS rate increase if costs have grown since last rebase",
    timeToImplement: "6–12 months",
    description: {
      en: "FQHCs' PPS rates are based on historical costs and adjusted annually by the Medicare Economic Index (MEI). If an FQHC has significantly expanded services, added new providers, or increased costs since its PPS rate was last set, a change-in-scope request can reset the rate to reflect current costs. Adding new service types (dental, behavioral health, CHW services, pharmacy) or new sites qualifies as a change in scope. This is one of the most impactful but underutilized strategies for increasing per-visit revenue.",
      es: "Las tasas PPS de los FQHCs se basan en costos históricos y se ajustan anualmente por el Índice Económico de Medicare (MEI). Si un FQHC ha expandido significativamente sus servicios, agregado nuevos proveedores o aumentado costos desde que se estableció su tasa PPS por última vez, una solicitud de cambio de alcance puede restablecer la tasa para reflejar los costos actuales. Agregar nuevos tipos de servicio (dental, salud mental, servicios de CHW, farmacia) o nuevos sitios califica como cambio de alcance. Esta es una de las estrategias más impactantes pero subutilizadas para aumentar los ingresos por visita.",
    },
    steps: [
      {
        en: "Compare current costs per visit to your existing PPS rate — if costs exceed PPS, consider rebasing",
        es: "Comparar costos actuales por visita con su tasa PPS existente — si los costos exceden PPS, considerar el rebase",
      },
      {
        en: "Document all new services added since last PPS rate setting (dental, BH, CHW, new sites)",
        es: "Documentar todos los nuevos servicios agregados desde la última fijación de tasa PPS (dental, salud mental, CHW, nuevos sitios)",
      },
      {
        en: "Work with a PPS rate consultant to prepare the change-in-scope application",
        es: "Trabajar con un consultor de tasas PPS para preparar la solicitud de cambio de alcance",
      },
      {
        en: "Submit to your Medicare Administrative Contractor (MAC) and Medi-Cal simultaneously",
        es: "Enviar simultáneamente a su Contratista Administrativo de Medicare (MAC) y Medi-Cal",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: null,
    sources: [
      {
        title: "Medi-Cal Explained: How Health Centers Are Paid — CHCF",
        url: "https://www.chcf.org/resource/medi-cal-explained-how-health-centers-paid/",
      },
      {
        title: "FQHC Payment Guide — NACHC",
        url: "https://www.nachc.org/wp-content/uploads/2025/05/FQHC-Payment-Guide.pdf",
      },
    ],
  },
  {
    id: "revenue-cycle-management",
    title: {
      en: "Revenue Cycle Management & Clinical Documentation Improvement",
      es: "Manejo del Ciclo de Ingresos y Mejora de Documentación Clínica",
    },
    category: "operations",
    difficulty: "medium",
    potentialRevenue: "3–5% improvement in collections; 15% reduction in claim denials",
    timeToImplement: "1–3 months for initial audit; ongoing",
    description: {
      en: "Many FQHCs leave significant revenue uncollected due to billing errors, under-coding, incomplete documentation, and high denial rates. A structured Clinical Documentation Improvement (CDI) program ensures providers document to the level of complexity they deliver. Quarterly billing audits catch missed charges and coding errors. A 3-5% improvement in collections efficiency can equal hundreds of thousands in additional annual revenue without adding a single new service.",
      es: "Muchos FQHCs dejan ingresos significativos sin cobrar debido a errores de facturación, sub-codificación, documentación incompleta y altas tasas de denegación. Un programa estructurado de Mejora de Documentación Clínica (CDI) asegura que los proveedores documenten al nivel de complejidad que brindan. Las auditorías de facturación trimestrales detectan cargos perdidos y errores de codificación. Una mejora del 3-5% en la eficiencia de cobranza puede equivaler a cientos de miles en ingresos anuales adicionales sin agregar un solo servicio nuevo.",
    },
    steps: [
      {
        en: "Conduct a baseline revenue cycle audit: denials, AR days, collections rate, charge capture",
        es: "Realizar una auditoría de referencia del ciclo de ingresos: denegaciones, días de cuentas por cobrar, tasa de cobranza, captura de cargos",
      },
      {
        en: "Implement a CDI program: train providers on documentation requirements for billable visit levels",
        es: "Implementar un programa CDI: capacitar a proveedores sobre requisitos de documentación para niveles de visita facturables",
      },
      {
        en: "Set up quarterly coding audits with an AAPC-certified coder",
        es: "Establecer auditorías de codificación trimestrales con un codificador certificado AAPC",
      },
      {
        en: "Implement denial tracking and root-cause analysis — focus on top 5 denial reasons",
        es: "Implementar seguimiento de denegaciones y análisis de causa raíz — enfocarse en las 5 principales razones de denegación",
      },
      {
        en: "Consider AI-driven tools for predictive denial management (can reduce denials by up to 45%)",
        es: "Considerar herramientas impulsadas por IA para manejo predictivo de denegaciones (puede reducir denegaciones hasta un 45%)",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: null,
    sources: [
      {
        title: "FQHC Financial Health: Key Indicators — Community Link Consulting",
        url: "https://www.communitylinkconsulting.com/blog/fqhc-financial-health-decline-indicators",
      },
      {
        title: "Best Practices for Managing Revenue Cycle in FQHCs — CPa Medical Billing",
        url: "https://cpamedicalbilling.com/best-practices-for-managing-revenue-cycle-in-fqhcs/",
      },
    ],
  },
  {
    id: "grant-diversification",
    title: {
      en: "Grant Diversification Beyond Section 330",
      es: "Diversificación de Subvenciones Más Allá de la Sección 330",
    },
    category: "grants",
    difficulty: "medium",
    potentialRevenue: "Varies widely — $50K to $5M+ per grant",
    timeToImplement: "Ongoing — grant cycles vary",
    description: {
      en: "Beyond HRSA Section 330 grants, FQHCs can pursue a wide range of federal, state, and private funding sources. Key opportunities include: SAMHSA grants for substance use and mental health, CDC community health grants, California Endowment and CHCF grants, local public health department contracts, university research partnerships, and corporate/pharmaceutical foundation grants. Building a dedicated grants team (even part-time) can significantly diversify revenue.",
      es: "Más allá de las subvenciones HRSA Sección 330, los FQHCs pueden buscar una amplia gama de fuentes de financiamiento federal, estatal y privado. Las oportunidades clave incluyen: subvenciones de SAMHSA para uso de sustancias y salud mental, subvenciones de salud comunitaria del CDC, subvenciones de California Endowment y CHCF, contratos de departamentos de salud pública locales, asociaciones de investigación universitaria y subvenciones de fundaciones corporativas/farmacéuticas. Construir un equipo dedicado de subvenciones (incluso a tiempo parcial) puede diversificar significativamente los ingresos.",
    },
    steps: [
      {
        en: "Inventory current grants and identify gaps — what programs are you NOT funded for?",
        es: "Inventariar subvenciones actuales e identificar brechas — ¿para qué programas NO tiene financiamiento?",
      },
      {
        en: "Subscribe to Grants.gov alerts for HRSA, SAMHSA, CDC, and DHCS funding opportunities",
        es: "Suscribirse a alertas de Grants.gov para oportunidades de financiamiento de HRSA, SAMHSA, CDC y DHCS",
      },
      {
        en: "Apply for California-specific grants: CHCF Innovation Fund, CA Endowment, CPCA awards",
        es: "Solicitar subvenciones específicas de California: Fondo de Innovación CHCF, CA Endowment, premios CPCA",
      },
      {
        en: "Partner with universities for FQHC-based research (brings indirect cost recovery)",
        es: "Asociarse con universidades para investigación basada en FQHCs (genera recuperación de costos indirectos)",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: ["phs-act-section-330"],
    sources: [
      {
        title: "Beyond the Grant: Practical Ways FQHCs Can Diversify Revenue — Synergy Billing",
        url: "https://synergybilling.com/news/insights/beyond-the-grant-practical-ways-fqhcs-can-diversify-revenue-streams",
      },
      {
        title: "The Funding Landscape for Community Health Centers in 2026 — Synergy Billing",
        url: "https://synergybilling.com/news/insights/the-funding-landscape-for-community-health-centers-in-2026",
      },
    ],
  },
  {
    id: "value-based-care",
    title: {
      en: "Value-Based Payment Model Participation",
      es: "Participación en Modelos de Pago Basado en Valor",
    },
    category: "partnerships",
    difficulty: "high",
    potentialRevenue: "5–15% bonus on quality metrics; shared savings from reduced ER/hospital utilization",
    timeToImplement: "6–18 months",
    description: {
      en: "Value-based payment (VBP) models reward FQHCs for improving health outcomes rather than visit volume. Managed care plans offer quality incentive payments (QIPs) for meeting HEDIS measures, closing care gaps, and reducing unnecessary ER visits. FQHCs with strong data infrastructure and care management teams can earn significant bonus revenue. In California, Medi-Cal managed care plans are increasingly shifting to VBP arrangements.",
      es: "Los modelos de pago basado en valor (VBP) recompensan a los FQHCs por mejorar los resultados de salud en lugar del volumen de visitas. Los planes de atención administrada ofrecen pagos de incentivos de calidad (QIPs) por cumplir medidas HEDIS, cerrar brechas de cuidado y reducir visitas innecesarias a urgencias. Los FQHCs con infraestructura de datos sólida y equipos de manejo de cuidados pueden ganar ingresos significativos por bonificaciones. En California, los planes de atención administrada de Medi-Cal están cambiando cada vez más a acuerdos VBP.",
    },
    steps: [
      {
        en: "Review managed care plan contracts for quality incentive payment opportunities",
        es: "Revisar contratos de planes de atención administrada para oportunidades de pagos de incentivos de calidad",
      },
      {
        en: "Invest in population health management tools and dashboards (HEDIS tracking)",
        es: "Invertir en herramientas de manejo de salud poblacional y tableros (seguimiento HEDIS)",
      },
      {
        en: "Focus care management on high-utilizer patients to reduce ER visits and hospitalizations",
        es: "Enfocar el manejo de cuidados en pacientes de alta utilización para reducir visitas a urgencias y hospitalizaciones",
      },
      {
        en: "Negotiate shared savings arrangements with your managed care plans",
        es: "Negociar acuerdos de ahorros compartidos con sus planes de atención administrada",
      },
    ],
    keyBillingCodes: null,
    relevantLegislation: ["ca-ab-133"],
    sources: [
      {
        title: "Strategic Funding for FQHCs: 2025 Reauthorization Playbook — Oatmeal Health",
        url: "https://oatmealhealth.com/strategic-funding-for-fqhcs/",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Enrollment Assistance & Retention Strategies                        */
/*  What FQHCs can do to help patients enroll, stay enrolled,           */
/*  and navigate new requirements — California focused                  */
/* ------------------------------------------------------------------ */

export interface EnrollmentStrategy {
  id: string;
  title: { en: string; es: string };
  category: "enrollment" | "retention" | "work-requirements" | "outreach";
  urgency: "immediate" | "soon" | "planning";
  targetDate: string | null;
  description: { en: string; es: string };
  actionItems: { en: string; es: string }[];
  resources: { title: string; url: string }[];
}

export const enrollmentStrategies: EnrollmentStrategy[] = [
  {
    id: "pre-redetermination-outreach",
    title: {
      en: "Pre-Redetermination Outreach Campaign",
      es: "Campaña de Alcance Pre-Redeterminación",
    },
    category: "retention",
    urgency: "immediate",
    targetDate: "2027-01-01",
    description: {
      en: "Starting January 1, 2027, ACA expansion adults will face eligibility redeterminations every 6 months instead of annually (Section 71107). FQHCs should proactively contact patients BEFORE their renewal deadline to help them complete paperwork. During the Medicaid unwinding (2023-2024), millions lost coverage for procedural reasons — not because they were ineligible. FQHCs that ran proactive outreach campaigns retained significantly more patients.",
      es: "A partir del 1 de enero de 2027, los adultos de expansión ACA enfrentarán redeterminaciones de elegibilidad cada 6 meses en lugar de anualmente (Sección 71107). Los FQHCs deben contactar proactivamente a los pacientes ANTES de su fecha límite de renovación para ayudarlos a completar el papeleo. Durante la desvinculación de Medicaid (2023-2024), millones perdieron cobertura por razones de procedimiento — no porque fueran inelegibles. Los FQHCs que ejecutaron campañas de alcance proactivo retuvieron significativamente más pacientes.",
    },
    actionItems: [
      {
        en: "Build a redetermination tracking system in your EHR: flag patients 60, 30, and 14 days before renewal",
        es: "Construir un sistema de seguimiento de redeterminaciones en su EHR: marcar pacientes 60, 30 y 14 días antes de la renovación",
      },
      {
        en: "Train front desk staff to verify Medi-Cal status at every visit and update contact information",
        es: "Capacitar al personal de recepción para verificar el estatus de Medi-Cal en cada visita y actualizar información de contacto",
      },
      {
        en: "Assign CHWs or eligibility workers to outreach panels: call, text, and mail renewal reminders",
        es: "Asignar CHWs o trabajadores de elegibilidad a paneles de alcance: llamar, enviar mensajes de texto y correo con recordatorios de renovación",
      },
      {
        en: "Offer in-clinic renewal assistance: dedicate a station where patients can complete paperwork on-site",
        es: "Ofrecer asistencia de renovación en la clínica: dedicar una estación donde los pacientes puedan completar el papeleo en el sitio",
      },
      {
        en: "Partner with county eligibility offices for warm referrals and shared data (where permitted)",
        es: "Asociarse con oficinas de elegibilidad del condado para referencias directas y datos compartidos (donde sea permitido)",
      },
    ],
    resources: [
      {
        title: "DHCS H.R. 1 Implementation Plan",
        url: "https://www.dhcs.ca.gov/federal-impacts/Documents/DHCS-HR1-Implementation-Plan.pdf",
      },
      {
        title: "Medi-Cal Changes and What You Need to Know — Health Consumer Alliance",
        url: "https://healthconsumer.org/medi-cal-changes-and-what-you-need-to-know/",
      },
    ],
  },
  {
    id: "work-requirements-preparation",
    title: {
      en: "Work Requirements Compliance Support for Patients",
      es: "Apoyo de Cumplimiento de Requisitos de Trabajo para Pacientes",
    },
    category: "work-requirements",
    urgency: "soon",
    targetDate: "2027-01-01",
    description: {
      en: "Section 71119 mandates 80 hours/month of work, education, job training, or community service for non-disabled expansion adults ages 19-64. States must implement by January 1, 2027 (possible extension to December 31, 2028). In California, 8.2 million adults are potentially affected — but 62% already work. The biggest risk isn't that people don't work; it's that working people lose coverage because they can't navigate the reporting requirements. FQHCs can play a critical role helping patients document compliance and claim exemptions.",
      es: "La Sección 71119 exige 80 horas/mes de trabajo, educación, capacitación laboral o servicio comunitario para adultos de expansión no discapacitados de 19-64 años. Los estados deben implementar antes del 1 de enero de 2027 (posible extensión hasta el 31 de diciembre de 2028). En California, 8.2 millones de adultos están potencialmente afectados — pero el 62% ya trabajan. El mayor riesgo no es que las personas no trabajen; es que las personas que trabajan pierdan cobertura porque no pueden navegar los requisitos de informes. Los FQHCs pueden desempeñar un papel crítico ayudando a los pacientes a documentar el cumplimiento y reclamar exenciones.",
    },
    actionItems: [
      {
        en: "Identify patients who may qualify for exemptions: disability, pregnancy, caregiving, students, tribal members, seasonal workers already meeting SNAP requirements",
        es: "Identificar pacientes que puedan calificar para exenciones: discapacidad, embarazo, cuidado de personas, estudiantes, miembros tribales, trabajadores estacionales que ya cumplen requisitos de SNAP",
      },
      {
        en: "Create patient-facing materials (bilingual) explaining work requirements, exemptions, and how to report",
        es: "Crear materiales para pacientes (bilingües) explicando los requisitos de trabajo, exenciones y cómo informar",
      },
      {
        en: "Train CHWs and patient navigators to help patients document compliance and file exemption paperwork",
        es: "Capacitar CHWs y navegadores de pacientes para ayudar a los pacientes a documentar cumplimiento y presentar papeleo de exención",
      },
      {
        en: "Partner with workforce development agencies, community colleges, and job training programs for referrals",
        es: "Asociarse con agencias de desarrollo laboral, colegios comunitarios y programas de capacitación laboral para referencias",
      },
      {
        en: "Monitor CMS guidance (due June 1, 2026) for California-specific implementation details",
        es: "Monitorear la guía del CMS (prevista para el 1 de junio de 2026) para detalles de implementación específicos de California",
      },
      {
        en: "Advocate: engage with DHCS on state implementation plan to minimize coverage losses",
        es: "Abogar: involucrarse con DHCS en el plan de implementación estatal para minimizar las pérdidas de cobertura",
      },
    ],
    resources: [
      {
        title: "A Summary of Federal Medicaid Work Requirements — CHCS",
        url: "https://www.chcs.org/resource/a-summary-of-national-medicaid-work-requirements/",
      },
      {
        title: "Eight Million Medi-Cal Enrollees at Risk — UC Berkeley Labor Center",
        url: "https://laborcenter.berkeley.edu/eight-million-medi-cal-enrollees-at-risk-of-losing-health-coverage-if-congress-imposes-work-requirements/",
      },
      {
        title: "CMS Community Engagement Requirements Guidance (Dec 2025)",
        url: "https://www.medicaid.gov/federal-policy-guidance/downloads/cib12082025.pdf",
      },
      {
        title: "Work Requirements Implementation Milestones — SHVS",
        url: "https://shvs.org/wp-content/uploads/2025/08/HR-1-Work-Requirements-Implementation-Milestones.pdf",
      },
    ],
  },
  {
    id: "copay-exemption-marketing",
    title: {
      en: "Promote FQHC Copay Exemption Advantage",
      es: "Promover la Ventaja de Exención de Copagos de FQHCs",
    },
    category: "outreach",
    urgency: "planning",
    targetDate: "2028-10-01",
    description: {
      en: "Starting October 1, 2028, ACA expansion adults with income above 100% FPL will face copays up to $35/service at most providers — but FQHCs, behavioral health clinics, and rural health clinics are explicitly exempt. This creates a significant competitive advantage for FQHCs. Patients who learn about the exemption may actively choose FQHCs over other providers. FQHCs should prepare messaging and capacity now.",
      es: "A partir del 1 de octubre de 2028, los adultos de expansión ACA con ingresos superiores al 100% FPL enfrentarán copagos de hasta $35/servicio en la mayoría de proveedores — pero los FQHCs, clínicas de salud mental y clínicas rurales están explícitamente exentos. Esto crea una ventaja competitiva significativa para los FQHCs. Los pacientes que se enteren de la exención pueden elegir activamente los FQHCs sobre otros proveedores. Los FQHCs deben preparar mensajes y capacidad ahora.",
    },
    actionItems: [
      {
        en: "Develop bilingual marketing materials: 'No copays at [FQHC name] — ever'",
        es: "Desarrollar materiales de marketing bilingües: 'Sin copagos en [nombre del FQHC] — nunca'",
      },
      {
        en: "Train front desk and scheduling staff to communicate the copay exemption benefit",
        es: "Capacitar al personal de recepción y programación para comunicar el beneficio de exención de copagos",
      },
      {
        en: "Plan for increased patient volume — may need to extend hours, add providers, or open new access points",
        es: "Planificar para mayor volumen de pacientes — puede necesitar extender horarios, agregar proveedores o abrir nuevos puntos de acceso",
      },
      {
        en: "Partner with managed care plans on member communications highlighting FQHC copay exemption",
        es: "Asociarse con planes de atención administrada en comunicaciones a miembros destacando la exención de copagos de FQHCs",
      },
    ],
    resources: [
      {
        title: "FQHC Leaders: Preparing for Healthcare Policy Changes — Community Link Consulting",
        url: "https://www.communitylinkconsulting.com/blog/fqhc-healthcare-policy-changes-2025",
      },
    ],
  },
  {
    id: "enrollment-assistance-infrastructure",
    title: {
      en: "Build Enrollment Assistance Infrastructure",
      es: "Construir Infraestructura de Asistencia de Inscripción",
    },
    category: "enrollment",
    urgency: "immediate",
    targetDate: null,
    description: {
      en: "With coverage churn increasing due to 6-month redeterminations, work requirements, and premium requirements for undocumented enrollees, FQHCs need dedicated enrollment infrastructure. This means certified application assistors on staff, warm handoff processes with county eligibility offices, and systems to quickly re-enroll patients who fall off coverage. FQHCs are uniquely positioned because they see patients regularly — every visit is an opportunity to check and maintain coverage.",
      es: "Con la rotación de cobertura aumentando debido a redeterminaciones semestrales, requisitos de trabajo y requisitos de primas para inscritos indocumentados, los FQHCs necesitan infraestructura dedicada de inscripción. Esto significa asistentes de solicitud certificados en el personal, procesos de referencia directa con oficinas de elegibilidad del condado y sistemas para reinscribir rápidamente a pacientes que pierdan cobertura. Los FQHCs están en una posición única porque ven pacientes regularmente — cada visita es una oportunidad para verificar y mantener la cobertura.",
    },
    actionItems: [
      {
        en: "Hire or train Certified Application Assistors (CAAs) or Certified Enrollment Counselors (CECs)",
        es: "Contratar o capacitar Asistentes de Solicitud Certificados (CAAs) o Consejeros de Inscripción Certificados (CECs)",
      },
      {
        en: "Implement coverage verification at every patient visit — add to intake workflow",
        es: "Implementar verificación de cobertura en cada visita del paciente — agregar al flujo de trabajo de admisión",
      },
      {
        en: "Create a rapid re-enrollment protocol for patients who lose coverage mid-treatment",
        es: "Crear un protocolo de reinscripción rápida para pacientes que pierdan cobertura durante el tratamiento",
      },
      {
        en: "Track and report coverage churn metrics: how many patients lost and regained coverage per month?",
        es: "Rastrear e informar métricas de rotación de cobertura: ¿cuántos pacientes perdieron y recuperaron cobertura por mes?",
      },
      {
        en: "Apply for state outreach and enrollment funding ($200M federal allocation for FY2026)",
        es: "Solicitar financiamiento estatal de alcance e inscripción (asignación federal de $200M para el año fiscal 2026)",
      },
    ],
    resources: [
      {
        title: "Do Medi-Cal Enrollees Work? Policy at a Glance — CHCF",
        url: "https://www.chcf.org/resource/do-medi-cal-enrollees-work-policy-glance/",
      },
      {
        title: "Q&A: Understanding Medi-Cal Coverage, Funding, and Federal Cuts — Cal Budget Center",
        url: "https://calbudgetcenter.org/resources/qa-understanding-medi-cal-coverage-funding-and-the-threat-of-federal-cuts/",
      },
    ],
  },
  {
    id: "undocumented-premium-navigation",
    title: {
      en: "Help Undocumented Enrollees Navigate $30/Month Premiums",
      es: "Ayudar a Inscritos Indocumentados a Navegar Primas de $30/Mes",
    },
    category: "retention",
    urgency: "soon",
    targetDate: "2027-07-01",
    description: {
      en: "Starting July 1, 2027, undocumented Medi-Cal members aged 19-59 who are not pregnant must pay a $30/month premium to retain full-scope coverage. Research shows that even modest premiums cause 15-25% of eligible enrollees to drop coverage. FQHCs must help patients understand this requirement and set up payment. For patients who cannot afford the premium, FQHCs should be prepared to serve them under sliding fee or connect them with emergency/limited-scope coverage.",
      es: "A partir del 1 de julio de 2027, los miembros indocumentados de Medi-Cal de 19-59 años que no estén embarazadas deben pagar una prima mensual de $30 para mantener la cobertura completa. La investigación muestra que incluso primas modestas causan que el 15-25% de los inscritos elegibles abandonen la cobertura. Los FQHCs deben ayudar a los pacientes a entender este requisito y establecer el pago. Para pacientes que no puedan pagar la prima, los FQHCs deben estar preparados para atenderlos bajo escala deslizante o conectarlos con cobertura de emergencia/alcance limitado.",
    },
    actionItems: [
      {
        en: "Identify all undocumented patients aged 19-59 in your panel before July 2027",
        es: "Identificar todos los pacientes indocumentados de 19-59 años en su panel antes de julio 2027",
      },
      {
        en: "Create bilingual FAQ materials explaining the premium, payment options, and what happens if unpaid",
        es: "Crear materiales FAQ bilingües explicando la prima, opciones de pago y qué sucede si no se paga",
      },
      {
        en: "Set up payment assistance programs or connect with community organizations that can help",
        es: "Establecer programas de asistencia de pago o conectar con organizaciones comunitarias que puedan ayudar",
      },
      {
        en: "Prepare sliding-fee-scale capacity for patients who lose full-scope coverage",
        es: "Preparar capacidad de escala deslizante para pacientes que pierdan cobertura completa",
      },
    ],
    resources: [
      {
        title: "Medi-Cal Changes and What You Need to Know — Health Consumer Alliance",
        url: "https://healthconsumer.org/medi-cal-changes-and-what-you-need-to-know/",
      },
    ],
  },
  {
    id: "scenario-planning",
    title: {
      en: "Financial Scenario Planning for Multiple Policy Outcomes",
      es: "Planificación de Escenarios Financieros para Múltiples Resultados de Política",
    },
    category: "outreach",
    urgency: "immediate",
    targetDate: null,
    description: {
      en: "With unprecedented policy uncertainty — H.R. 1 implementation, CalAIM waiver expiration, state budget cuts, 340B changes, and SB 525 wage increases all converging — FQHCs need formal scenario planning. Model at least three scenarios (optimistic, baseline, severe) across key variables: Medicaid enrollment loss, PPS rate changes, grant funding levels, 340B revenue, and labor costs. The most effective leadership teams are preparing for different futures rather than reacting to present circumstances.",
      es: "Con una incertidumbre de política sin precedentes — implementación de H.R. 1, expiración del waiver CalAIM, recortes presupuestarios estatales, cambios al 340B e incrementos salariales SB 525 convergiendo — los FQHCs necesitan planificación formal de escenarios. Modelar al menos tres escenarios (optimista, base, severo) a través de variables clave: pérdida de inscripción en Medicaid, cambios en tasas PPS, niveles de financiamiento de subvenciones, ingresos 340B y costos laborales. Los equipos de liderazgo más efectivos se preparan para diferentes futuros en lugar de reaccionar a las circunstancias presentes.",
    },
    actionItems: [
      {
        en: "Model 3 scenarios: 10% patient loss (mild), 20% (moderate), 35% (severe) — with corresponding revenue impact",
        es: "Modelar 3 escenarios: 10% pérdida de pacientes (leve), 20% (moderado), 35% (severo) — con impacto de ingresos correspondiente",
      },
      {
        en: "Calculate the revenue impact of losing PPS rates for undocumented patients (50-70% cut per visit)",
        es: "Calcular el impacto en ingresos de perder tasas PPS para pacientes indocumentados (recorte del 50-70% por visita)",
      },
      {
        en: "Model CalAIM waiver non-renewal: what positions are funded by ECM/Community Supports?",
        es: "Modelar la no renovación del waiver CalAIM: ¿qué posiciones son financiadas por ECM/Apoyos Comunitarios?",
      },
      {
        en: "Identify revenue strategies that offset each scenario — which strategies in this guide apply?",
        es: "Identificar estrategias de ingresos que compensen cada escenario — ¿cuáles estrategias de esta guía aplican?",
      },
      {
        en: "Build a 90-day cash reserve target to weather coverage transition periods",
        es: "Construir una meta de reserva de efectivo de 90 días para resistir períodos de transición de cobertura",
      },
    ],
    resources: [
      {
        title: "Strategic Scenario Planning: How FQHCs Can Respond to Federal Policy Uncertainty — Community Link",
        url: "https://www.communitylinkconsulting.com/clc-articles-tips/scenario-planning-fqhc-federal-funding-uncertainty",
      },
      {
        title: "National Context for California's Renewal of CalAIM in 2026 — CHCS",
        url: "https://www.chcs.org/resource/national-context-for-californias-renewal-of-calaim-in-2026/",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Key implementation dates timeline                                   */
/*  Critical milestones FQHCs need to prepare for                       */
/* ------------------------------------------------------------------ */

export interface ImplementationMilestone {
  date: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  category: "federal" | "state";
  relatedLegislation: string; // ID from legislationSources
}

export const implementationTimeline: ImplementationMilestone[] = [
  {
    date: "2026-01-01",
    title: { en: "Medi-Cal enrollment freeze for undocumented adults", es: "Congelamiento de inscripción en Medi-Cal para adultos indocumentados" },
    description: { en: "New undocumented applicants aged 19+ limited to emergency/pregnancy care only", es: "Nuevos solicitantes indocumentados de 19+ años limitados solo a atención de emergencia/embarazo" },
    category: "state",
    relatedLegislation: "ca-ab-133",
  },
  {
    date: "2026-06-01",
    title: { en: "HHS must issue work requirement guidance to states", es: "HHS debe emitir guía de requisitos de trabajo a los estados" },
    description: { en: "Federal guidance on implementing Section 71119 community engagement requirements", es: "Guía federal sobre implementación de requisitos de participación comunitaria Sección 71119" },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
  {
    date: "2026-06-30",
    title: { en: "State outreach period begins (work requirements)", es: "Período de alcance estatal comienza (requisitos de trabajo)" },
    description: { en: "States must begin notifying affected Medicaid enrollees about community engagement requirements", es: "Los estados deben comenzar a notificar a los inscritos de Medicaid afectados sobre los requisitos de participación comunitaria" },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
  {
    date: "2026-07-01",
    title: { en: "Dental coverage eliminated for undocumented adults", es: "Cobertura dental eliminada para adultos indocumentados" },
    description: { en: "Only emergency dental services remain for Medi-Cal members with unsatisfactory immigration status", es: "Solo quedan servicios dentales de emergencia para miembros de Medi-Cal con estatus migratorio insatisfactorio" },
    category: "state",
    relatedLegislation: "ca-ab-133",
  },
  {
    date: "2026-07-01",
    title: { en: "PPS rates eliminated for undocumented patient services", es: "Tasas PPS eliminadas para servicios a pacientes indocumentados" },
    description: { en: "FQHCs reimbursed at standard Medi-Cal fee schedule (50-70% cut per visit) for undocumented patients", es: "FQHCs reembolsados al calendario de tarifas estándar de Medi-Cal (recorte del 50-70% por visita) para pacientes indocumentados" },
    category: "state",
    relatedLegislation: "ca-ab-133",
  },
  {
    date: "2026-12-31",
    title: { en: "CalAIM 1115 waiver expires", es: "Waiver 1115 de CalAIM expira" },
    description: { en: "ECM ($956M) and Community Supports ($231M) at risk. Renewal submission in progress but uncertain under current federal administration.", es: "ECM ($956M) y Apoyos Comunitarios ($231M) en riesgo. Solicitud de renovación en proceso pero incierta bajo la administración federal actual." },
    category: "federal",
    relatedLegislation: "ca-ab-133",
  },
  {
    date: "2027-01-01",
    title: { en: "6-month redeterminations begin", es: "Redeterminaciones semestrales comienzan" },
    description: { en: "ACA expansion adults must complete eligibility renewal every 6 months instead of annually", es: "Adultos de expansión ACA deben completar renovación de elegibilidad cada 6 meses en lugar de anualmente" },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
  {
    date: "2027-01-01",
    title: { en: "Work requirements take effect (states without extension)", es: "Requisitos de trabajo entran en vigor (estados sin extensión)" },
    description: { en: "80 hours/month requirement for non-disabled expansion adults ages 19-64. States may request extension to Dec 2028.", es: "Requisito de 80 horas/mes para adultos de expansión no discapacitados de 19-64 años. Los estados pueden solicitar extensión hasta dic 2028." },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
  {
    date: "2027-01-01",
    title: { en: "Retroactive coverage reduced", es: "Cobertura retroactiva reducida" },
    description: { en: "Retroactive coverage cut from 3 months to 1 month (expansion adults) or 2 months (others)", es: "Cobertura retroactiva reducida de 3 meses a 1 mes (adultos de expansión) o 2 meses (otros)" },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
  {
    date: "2027-06-01",
    title: { en: "SB 525: $25/hr minimum for specified clinics (including FQHCs)", es: "SB 525: Mínimo de $25/hr para clínicas especificadas (incluyendo FQHCs)" },
    description: { en: "Most mid-size FQHCs reach the $25/hr healthcare worker minimum wage floor", es: "La mayoría de los FQHCs medianos alcanzan el piso de salario mínimo de $25/hr para trabajadores de salud" },
    category: "state",
    relatedLegislation: "ca-sb-525",
  },
  {
    date: "2027-07-01",
    title: { en: "$30/month premiums for undocumented Medi-Cal members", es: "Primas de $30/mes para miembros indocumentados de Medi-Cal" },
    description: { en: "Undocumented enrollees aged 19-59 must pay monthly premium to retain full-scope coverage", es: "Inscritos indocumentados de 19-59 años deben pagar prima mensual para mantener cobertura completa" },
    category: "state",
    relatedLegislation: "ca-ab-133",
  },
  {
    date: "2028-10-01",
    title: { en: "$35 copays begin (FQHCs exempt)", es: "Copagos de $35 comienzan (FQHCs exentos)" },
    description: { en: "Expansion adults over 100% FPL face copays at non-exempt providers. FQHCs explicitly exempt — competitive advantage.", es: "Adultos de expansión sobre 100% FPL enfrentan copagos en proveedores no exentos. FQHCs explícitamente exentos — ventaja competitiva." },
    category: "federal",
    relatedLegislation: "hr1-obbba",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper functions for revenue strategies and enrollment              */
/* ------------------------------------------------------------------ */

export function getStrategiesByCategory(category: RevenueStrategy["category"]): RevenueStrategy[] {
  return revenueStrategies.filter((s) => s.category === category);
}

export function getStrategiesByDifficulty(difficulty: RevenueStrategy["difficulty"]): RevenueStrategy[] {
  return revenueStrategies.filter((s) => s.difficulty === difficulty);
}

export function getEnrollmentByCategory(category: EnrollmentStrategy["category"]): EnrollmentStrategy[] {
  return enrollmentStrategies.filter((s) => s.category === category);
}

export function getEnrollmentByUrgency(urgency: EnrollmentStrategy["urgency"]): EnrollmentStrategy[] {
  return enrollmentStrategies.filter((s) => s.urgency === urgency);
}

export function getUpcomingMilestones(fromDate: string = new Date().toISOString().split("T")[0]): ImplementationMilestone[] {
  return implementationTimeline
    .filter((m) => m.date >= fromDate)
    .sort((a, b) => a.date.localeCompare(b.date));
}
