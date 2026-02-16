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
