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
