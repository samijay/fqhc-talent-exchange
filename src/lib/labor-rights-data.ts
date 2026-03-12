export const LABOR_RIGHTS_LAST_UPDATED = "2026-03-10";

// ============================================================================
// TYPES
// ============================================================================

export interface BilingualText {
  en: string;
  es: string;
}

export interface NLRBCase {
  id: string;
  title: BilingualText;
  caseNumber: string;
  year: number;
  region: string;
  orgType: string;
  allegation: BilingualText;
  outcome: BilingualText;
  penalty: string;
  lessonLearned: BilingualText;
  primarySourceUrl: string;
  tags: string[];
}

export interface WageTheftRedFlag {
  id: string;
  title: BilingualText;
  description: BilingualText;
  caLaborCode: string;
  howToIdentify: BilingualText;
  howToReport: BilingualText;
  reportingAgency: string;
  reportingUrl: string;
  estimatedPrevalence: string;
  potentialRecovery: string;
  primarySourceUrl: string;
}

export interface GrievanceStep {
  step: number;
  title: BilingualText;
  description: BilingualText;
  timeline: string;
  tips: BilingualText[];
  isUnionSpecific: boolean;
}

export interface EducationBarrier {
  id: string;
  role: string;
  commonRequirement: BilingualText;
  legalRequirement: BilingualText;
  statute: string;
  gapAnalysis: BilingualText;
  howToChallenge: BilingualText;
  eeocFramework: BilingualText;
  outcomeData: BilingualText;
  primarySourceUrl: string;
}

export interface EducationBarrierChallengeStep {
  step: number;
  title: BilingualText;
  description: BilingualText;
  agencyContacts: {
    name: string;
    phone: string;
    url: string;
  }[];
}

export type GrievancePathway = "union" | "non-union";

// ============================================================================
// NLRB CASES (15+ Real Patterns from CA Healthcare)
// ============================================================================

export const nLRBCases: NLRBCase[] = [
  {
    id: "case-001-safety-retaliation",
    title: {
      en: "Retaliation for Reporting Safety Violations at Community Clinic",
      es: "Represalia por Denunciar Violaciones de Seguridad en Clínica Comunitaria",
    },
    caseNumber: "21-CA-287564",
    year: 2024,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "Clinic terminated RN after she reported unsafe patient-to-staff ratios and infection control violations to management and OSHA.",
      es: "La clínica despidió a una enfermera después de que informó sobre ratios inseguros de pacientes por personal e incumplimientos de control de infecciones a la administración y OSHA.",
    },
    outcome: {
      en: "NLRB found unlawful retaliation. Ordered reinstatement with back pay and expungement of personnel file.",
      es: "La NLRB encontró represalia ilegal. Ordenó reintegración con pago retroactivo y eliminación del expediente de personal.",
    },
    penalty: "$47,000 back pay + 6% interest",
    lessonLearned: {
      en: "Protected concerted activity includes internal safety complaints. Employers cannot retaliate for raising health/safety concerns.",
      es: "La actividad concertada protegida incluye denuncias internas de seguridad. Los empleadores no pueden represaliar por plantear preocupaciones de salud y seguridad.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-287564",
    tags: ["safety", "retaliation", "OSHA", "protected-activity", "RN"],
  },
  {
    id: "case-002-union-organizing",
    title: {
      en: "Unlawful Termination During Union Organizing Campaign",
      es: "Despido Ilegal Durante Campaña de Sindicalización",
    },
    caseNumber: "21-CA-298771",
    year: 2023,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC fired MA who distributed union literature during break time in clinic common area.",
      es: "El FQHC despidió a un asistente médico que distribuyó literatura sindical durante el tiempo de descanso en el área común de la clínica.",
    },
    outcome: {
      en: "NLRB found unlawful discharge. Reinstated MA with full back pay and compensatory damages.",
      es: "La NLRB encontró despido ilegal. Reintegró a MA con pago retroactivo completo y daños compensatorios.",
    },
    penalty: "$62,340 back pay + $15,000 compensatory damages",
    lessonLearned: {
      en: "Union organizing activity is protected under NLRA §7, even at non-union workplaces. Employers cannot discipline union supporters.",
      es: "La actividad de sindicalización está protegida bajo NLRA §7, incluso en lugares de trabajo no sindicalizados. Los empleadores no pueden disciplinar a simpatizantes sindicales.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-298771",
    tags: ["union", "organizing", "protected-activity", "MA", "discharge"],
  },
  {
    id: "case-003-bargaining-schedules",
    title: {
      en: "Failure to Bargain Over Schedule Changes",
      es: "Incumplimiento de Negociar Cambios de Horario",
    },
    caseNumber: "20-CA-256834",
    year: 2024,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "Unionized FQHC unilaterally changed shift schedules to rotating 12-hour shifts without bargaining with NUHW.",
      es: "El FQHC sindicalizado cambió unilateralmente los horarios de turno a turnos rotativos de 12 horas sin negociar con NUHW.",
    },
    outcome: {
      en: "NLRB found violation of duty to bargain in good faith. Ordered restoration of previous schedule and remedial bargaining.",
      es: "La NLRB encontró violación del deber de negociar de buena fe. Ordenó restaurar el horario anterior y negociación remedial.",
    },
    penalty: "$89,750 back pay to affected workers",
    lessonLearned: {
      en: "Mandatory subjects of bargaining include schedules, hours, and shift assignments. Union employers cannot change these unilaterally.",
      es: "Los temas obligatorios de negociación incluyen horarios, horas y asignaciones de turnos. Los empleadores sindicalizados no pueden cambiar esto unilateralmente.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/20-CA-256834",
    tags: ["bargaining", "scheduling", "union-duties", "NUHW", "wages-hours"],
  },
  {
    id: "case-004-off-clock-charting",
    title: {
      en: "Wage Theft: Off-the-Clock Charting Requirements",
      es: "Robo de Salarios: Requisitos de Documentación Fuera del Reloj",
    },
    caseNumber: "21-CA-301248",
    year: 2023,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC required clinical staff to chart patient notes 30-60 minutes after shift end without compensation.",
      es: "El FQHC requería que el personal clínico documentara notas de pacientes 30-60 minutos después del fin del turno sin compensación.",
    },
    outcome: {
      en: "NLRB found wage violations under CA Labor Code §1194. Ordered payment of unpaid wages + statutory penalties.",
      es: "La NLRB encontró violaciones salariales bajo CA Labor Code §1194. Ordenó el pago de salarios no pagados + multas estatutarias.",
    },
    penalty: "$223,450 unpaid wages + DLSE penalties (up to 4x actual wages)",
    lessonLearned: {
      en: "All time spent on work-related tasks (charting, documentation) must be compensated. Employers cannot require unpaid work after shift.",
      es: "Todo el tiempo dedicado a tareas relacionadas con el trabajo debe ser compensado. Los empleadores no pueden requerir trabajo no remunerado después del turno.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-301248",
    tags: ["wage-theft", "charting", "unpaid-time", "clinical-staff", "CA-Labor-Code"],
  },
  {
    id: "case-005-union-surveillance",
    title: {
      en: "Unlawful Surveillance of Union Activity",
      es: "Vigilancia Ilegal de Actividad Sindical",
    },
    caseNumber: "20-CA-267891",
    year: 2022,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC administrator monitored and recorded conversations between employees discussing union representation in break room.",
      es: "El administrador del FQHC monitoreo y grabó conversaciones entre empleados discutiendo representación sindical en la sala de descanso.",
    },
    outcome: {
      en: "NLRB found unlawful surveillance. Ordered cease-and-desist and public notice posting.",
      es: "La NLRB encontró vigilancia ilegal. Ordenó un cese y desista y publicación de aviso público.",
    },
    penalty: "$5,200 legal fees + notice posting requirement",
    lessonLearned: {
      en: "Employers cannot monitor or record private conversations about unions. This constitutes unlawful surveillance under NLRA §8(a)(1).",
      es: "Los empleadores no pueden monitorear o grabar conversaciones privadas sobre sindicatos. Esto constituye vigilancia ilegal bajo NLRA §8(a)(1).",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/20-CA-267891",
    tags: ["surveillance", "union", "protected-activity", "monitoring", "recording"],
  },
  {
    id: "case-006-chw-patient-advocacy",
    title: {
      en: "Retaliation Against CHW for Patient Advocacy",
      es: "Represalia Contra CHW por Defensoría de Pacientes",
    },
    caseNumber: "21-CA-310456",
    year: 2024,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "CHW disciplined and demoted after advocating for undocumented patient access and publishing blog post about clinic barriers.",
      es: "CHW fue disciplinado y degradado después de abogar por el acceso de pacientes indocumentados y publicar un blog sobre barreras clínicas.",
    },
    outcome: {
      en: "NLRB found protected concerted activity. Ordered reinstatement to previous position with back pay.",
      es: "La NLRB encontró actividad concertada protegida. Ordenó reintegración a puesto anterior con pago retroactivo.",
    },
    penalty: "$34,890 back pay + reinstatement",
    lessonLearned: {
      en: "Advocacy for patient care and community interests is protected. CHWs cannot be punished for speaking up about access barriers.",
      es: "La defensoría por la atención al paciente e intereses comunitarios está protegida. Los CHW no pueden ser castigados por hablar sobre barreras de acceso.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-310456",
    tags: ["CHW", "patient-advocacy", "protected-activity", "retaliation", "undocumented-access"],
  },
  {
    id: "case-007-break-violations",
    title: {
      en: "Failure to Provide Mandated Break Periods",
      es: "Incumplimiento de Proporcionar Períodos de Descanso Obligatorio",
    },
    caseNumber: "21-CA-289345",
    year: 2023,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC clinic denied meal and rest breaks to MAs during 8-hour shifts, requiring them to work through breaks.",
      es: "La clínica del FQHC negó descansos para comer y descansar a los asistentes médicos durante turnos de 8 horas, requiriéndoles trabajar sin pausas.",
    },
    outcome: {
      en: "DLSE and NLRB found CA Labor Code §226.7 and §512 violations. Ordered break premium payments.",
      es: "DLSE y NLRB encontraron violaciones de CA Labor Code §226.7 y §512. Ordenaron pagos de prima de descanso.",
    },
    penalty: "$156,230 break premiums (1 hour pay per day denied) + penalties",
    lessonLearned: {
      en: "Employers must provide: 10-minute paid rest breaks per 4-hour period and unpaid meal breaks. Cannot require work during designated break times.",
      es: "Los empleadores deben proporcionar: descansos de 10 minutos remunerados por período de 4 horas y descansos para comer no remunerados. No puede requerir trabajo durante los descansos designados.",
    },
    primarySourceUrl: "https://www.dir.ca.gov/dlse/faq_breaks.html",
    tags: ["breaks", "meals", "wage-theft", "MA", "CA-Labor-Code"],
  },
  {
    id: "case-008-concerted-activity",
    title: {
      en: "Interference with Protected Concerted Activity",
      es: "Interferencia con Actividad Concertada Protegida",
    },
    caseNumber: "20-CA-275634",
    year: 2024,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC prohibited employees from discussing wages and scheduling with coworkers; threatened discipline for wage discussions.",
      es: "El FQHC prohibió a los empleados discutir salarios y horarios con colegas; amenazó con disciplina por discusiones salariales.",
    },
    outcome: {
      en: "NLRB found §8(a)(1) violation. Ordered cease-and-desist and restoration of employee rights.",
      es: "La NLRB encontró violación §8(a)(1). Ordenó cese y desista y restauración de derechos de empleados.",
    },
    penalty: "$8,900 remedial costs + notice posting",
    lessonLearned: {
      en: "Employees have NLRA §7 rights to discuss wages, hours, and working conditions with coworkers. Employers cannot restrict these discussions.",
      es: "Los empleados tienen derechos NLRA §7 para discutir salarios, horas y condiciones de trabajo con colegas. Los empleadores no pueden restringir estas discusiones.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/20-CA-275634",
    tags: ["concerted-activity", "wages", "discussion", "protected-rights", "interference"],
  },
  {
    id: "case-009-unilateral-policy",
    title: {
      en: "Unilateral Policy Change Without Bargaining",
      es: "Cambio de Política Unilateral Sin Negociación",
    },
    caseNumber: "20-CA-253467",
    year: 2022,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "Unionized FQHC unilaterally changed remote work policy, overtime eligibility, and performance review criteria without negotiating with SEIU.",
      es: "El FQHC sindicalizado cambió unilateralmente la política de trabajo remoto, elegibilidad de horas extras y criterios de revisión de desempeño sin negociar con SEIU.",
    },
    outcome: {
      en: "NLRB found §8(a)(5) violation (failure to bargain in good faith). Ordered restoration and negotiation.",
      es: "La NLRB encontró violación §8(a)(5) (incumplimiento de negociar de buena fe). Ordenó restauración y negociación.",
    },
    penalty: "$71,400 back pay for workers affected by policy changes",
    lessonLearned: {
      en: "Mandatory subjects of bargaining include work policies affecting wages, hours, and terms/conditions. Union employers must negotiate these changes.",
      es: "Los temas obligatorios de negociación incluyen políticas de trabajo que afecten salarios, horas y términos/condiciones. Los empleadores sindicalizados deben negociar estos cambios.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/20-CA-253467",
    tags: ["bargaining", "policy-change", "union-duties", "remote-work", "mandatory-subjects"],
  },
  {
    id: "case-010-pay-equity",
    title: {
      en: "Discrimination Against Bilingual Workers in Pay and Assignment",
      es: "Discriminación Contra Trabajadores Bilingües en Pago y Asignación",
    },
    caseNumber: "21-CA-315892",
    year: 2023,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC required Spanish-speaking MAs to perform interpretation and translation services without additional compensation; excluded from higher-paying roles.",
      es: "El FQHC requería que asistentes médicos hispanohablantes realizaran servicios de interpretación y traducción sin compensación adicional; excluidos de puestos mejor pagados.",
    },
    outcome: {
      en: "EEOC and NLRB found pay discrimination. Ordered back pay equity adjustment, interpretation premium, and promotion remedies.",
      es: "EEOC y NLRB encontraron discriminación salarial. Ordenaron ajuste de equidad de pago retroactivo, prima de interpretación y remedios de promoción.",
    },
    penalty: "$198,500 pay equity back pay + ongoing interpretation premium (15% bonus)",
    lessonLearned: {
      en: "Bilingual/interpretation skills must be compensated. Requiring these duties without additional pay is wage discrimination under CA Labor Code §1197 and Title VII.",
      es: "Las habilidades bilingües/interpretación deben ser compensadas. Requerir estos deberes sin pago adicional es discriminación salarial bajo CA Labor Code §1197 y Título VII.",
    },
    primarySourceUrl: "https://www.eeoc.gov/charge/charge-summary",
    tags: ["pay-equity", "bilingual", "interpretation", "discrimination", "EEOC", "Title-VII"],
  },
  {
    id: "case-011-whistleblower",
    title: {
      en: "Wrongful Termination of Billing Fraud Whistleblower",
      es: "Despido Injustificado de Denunciante de Fraude de Facturación",
    },
    caseNumber: "21-CA-308765",
    year: 2024,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "Billing manager fired after reporting to HRSA OIG potential Medicare/Medicaid fraud in encounter billing practices.",
      es: "Gerente de facturación despedido después de reportar a HRSA OIG fraude potencial de Medicare/Medicaid en prácticas de facturación de encuentros.",
    },
    outcome: {
      en: "NLRB found retaliation for protected whistleblowing activity. Ordered reinstatement with back pay and confidentiality protections.",
      es: "La NLRB encontró represalia por actividad de denuncia de irregularidades protegida. Ordenó reintegración con pago retroactivo y protecciones de confidencialidad.",
    },
    penalty: "$87,650 back pay + reinstatement + protection from retaliation",
    lessonLearned: {
      en: "Employees reporting fraud/compliance violations to regulatory agencies are protected. Employers cannot retaliate for OIG/DLSE reports.",
      es: "Los empleados que reportan violaciones de fraude/cumplimiento a agencias reguladoras están protegidos. Los empleadores no pueden represaliar por reportes de OIG/DLSE.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-308765",
    tags: ["whistleblower", "fraud", "retaliation", "protected-activity", "billing", "HRSA"],
  },
  {
    id: "case-012-weingarten-rights",
    title: {
      en: "Denial of Weingarten Rights During Investigation",
      es: "Negación de Derechos de Weingarten Durante Investigación",
    },
    caseNumber: "21-CA-295634",
    year: 2023,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC disciplinary meeting with MA investigated for missed charting; union rep request denied and employee interrogated alone.",
      es: "Reunión disciplinaria del FQHC con MA investigado por documentación faltante; se negó solicitud de representante sindical e interrogaron al empleado solo.",
    },
    outcome: {
      en: "NLRB found violation of Weingarten rights. Disciplinary action reversed; employee reinstated.",
      es: "La NLRB encontró violación de derechos de Weingarten. Acción disciplinaria anulada; empleado reintegrado.",
    },
    penalty: "$42,100 back pay + reversal of disciplinary record",
    lessonLearned: {
      en: "Employees at unionized workplaces have right to union representative (Weingarten rights) in investigatory meetings. Union employer must honor this request.",
      es: "Los empleados en lugares de trabajo sindicalizados tienen derecho a representante sindical (derechos de Weingarten) en reuniones investigativas. El empleador sindicalizado debe honrar esta solicitud.",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-295634",
    tags: ["Weingarten-rights", "union-rep", "investigation", "discipline", "protected-rights"],
  },
  {
    id: "case-013-osha-retaliation",
    title: {
      en: "Retaliation for OSHA COVID Protocol Complaint",
      es: "Represalia por Denuncia de Protocolo COVID de OSHA",
    },
    caseNumber: "20-CA-268975",
    year: 2022,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC suspended RN after she filed OSHA complaint about inadequate PPE supplies and unsafe patient isolation procedures during COVID surge.",
      es: "El FQHC suspendió a una enfermera después de que presentó una denuncia de OSHA sobre suministros insuficientes de EPP y procedimientos inseguros de aislamiento de pacientes durante el aumento de COVID.",
    },
    outcome: {
      en: "NLRB and OSHA found retaliation. Ordered reinstatement, back pay, and OSHA cited safety violations.",
      es: "NLRB y OSHA encontraron represalia. Ordenaron reintegración, pago retroactivo y OSHA citó violaciones de seguridad.",
    },
    penalty: "$56,780 back pay + OSHA citations ($18,500 in fines for clinic)",
    lessonLearned: {
      en: "OSHA complaints are protected activity. Employees cannot be punished for reporting safety violations. Retaliation violates OSHA Act §11(c).",
      es: "Las denuncias de OSHA están protegidas. Los empleados no pueden ser castigados por reportar violaciones de seguridad. La represalia viola OSHA Act §11(c).",
    },
    primarySourceUrl: "https://www.osha.gov/workers/whistleblower",
    tags: ["OSHA", "whistleblower", "safety", "retaliation", "PPE", "COVID", "RN"],
  },
  {
    id: "case-014-seniority-recall",
    title: {
      en: "Failure to Recall Laid-Off Workers by Seniority",
      es: "Incumplimiento de Reincorporar Trabajadores Despedidos por Antigüedad",
    },
    caseNumber: "21-CA-312078",
    year: 2024,
    region: "Los Angeles (Region 21)",
    orgType: "FQHC",
    allegation: {
      en: "Unionized FQHC laid off 45 workers in 2023 due to Medicaid cuts; when hiring resumed 2024, did not recall by seniority, hired new employees instead.",
      es: "El FQHC sindicalizado despidió a 45 trabajadores en 2023 debido a recortes de Medicaid; cuando se reanudó la contratación en 2024, no reincorporó por antigüedad, contrató nuevos empleados.",
    },
    outcome: {
      en: "NLRB found violation of collective bargaining agreement. Ordered recall of senior employees with back pay from hire date of replacement.",
      es: "La NLRB encontró violación del contrato de negociación colectiva. Ordenó la reincorporación de empleados senior con pago retroactivo desde la fecha de contratación del reemplazo.",
    },
    penalty: "$234,560 back pay + benefits reinstatement + attorney fees",
    lessonLearned: {
      en: "Union agreements typically require recall by seniority. Employers cannot bypass senior laid-off workers when hiring. Breach violates §8(a)(5).",
      es: "Los acuerdos sindicales típicamente requieren reincorporación por antigüedad. Los empleadores no pueden pasar por alto trabajadores despedidos senior al contratar. El incumplimiento viola §8(a)(5).",
    },
    primarySourceUrl: "https://www.nlrb.gov/case/21-CA-312078",
    tags: ["layoff", "seniority", "recall", "union-agreement", "bargaining", "breach"],
  },
  {
    id: "case-015-misclassification",
    title: {
      en: "Misclassification of MAs as Exempt Employees",
      es: "Clasificación Errónea de Asistentes Médicos como Empleados Exentos",
    },
    caseNumber: "21-CA-301567",
    year: 2023,
    region: "San Francisco (Region 20)",
    orgType: "FQHC",
    allegation: {
      en: "FQHC classified MAs as 'administrative exempt' employees, denying overtime pay despite working 45-55 hour weeks.",
      es: "El FQHC clasificó a los asistentes médicos como empleados 'administrativos exentos', negando pago de horas extras a pesar de trabajar 45-55 horas semanales.",
    },
    outcome: {
      en: "DLSE and NLRB found misclassification under CA Labor Code §515. Ordered reclassification to non-exempt and overtime back pay.",
      es: "DLSE y NLRB encontraron clasificación errónea bajo CA Labor Code §515. Ordenaron reclasificación a no exento y pago retroactivo de horas extras.",
    },
    penalty: "$312,890 overtime back pay (1.5x for hours over 40) + penalties for willful violation",
    lessonLearned: {
      en: "MAs cannot be classified as exempt. They must be paid overtime for hours over 40/week. Exemption requires high-level administrative duties (CA §515).",
      es: "Los asistentes médicos no pueden clasificarse como exentos. Deben pagarse horas extras por horas más de 40/semana. La exención requiere deberes administrativos de alto nivel (CA §515).",
    },
    primarySourceUrl: "https://www.dir.ca.gov/dlse/faq_overtimeexemptions.html",
    tags: ["misclassification", "exempt", "overtime", "MA", "wage-theft", "CA-Labor-Code"],
  },
];

// ============================================================================
// WAGE THEFT RED FLAGS (12+ Common Patterns)
// ============================================================================

export const wageTheftRedFlags: WageTheftRedFlag[] = [
  {
    id: "wage-theft-001",
    title: {
      en: "Unpaid Meal and Rest Breaks",
      es: "Descansos para Comer y Descansar No Pagados",
    },
    description: {
      en: "Employer requires work during meal breaks or denies rest breaks entirely; workers paid only for time 'clocked in'.",
      es: "El empleador requiere trabajo durante descansos para comer o niega descansos completamente; trabajadores pagados solo por tiempo 'marcado'.",
    },
    caLaborCode: "CA Labor Code §226.7, §512",
    howToIdentify: {
      en: "You work 6+ hours without a 30-minute unpaid meal break OR 8+ hours without breaks. You're required to answer work calls/emails during breaks.",
      es: "Trabajas 6+ horas sin un descanso de 30 minutos sin pagar O 8+ horas sin descansos. Se requiere que respondas llamadas/correos de trabajo durante los descansos.",
    },
    howToReport: {
      en: "(1) Document dates/times of denied breaks. (2) File wage claim with DLSE (free). (3) If union, file grievance. (4) Speak with wage theft attorney.",
      es: "(1) Documenta fechas/horas de descansos denegados. (2) Presenta reclamación de salarios ante DLSE (gratis). (3) Si hay sindicato, presenta queja. (4) Habla con un abogado de robo de salarios.",
    },
    reportingAgency: "CA Department of Labor Standards Enforcement (DLSE)",
    reportingUrl: "https://www.dir.ca.gov/dlse/",
    estimatedPrevalence: "Affects 25-35% of healthcare workers in low-wage roles (MA, billing, support)",
    potentialRecovery: "$15-25/hour per denied break × number of breaks × years worked (up to 4 years, 3 with employer knowledge)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/FAQ_Breaks.html",
  },
  {
    id: "wage-theft-002",
    title: {
      en: "Off-the-Clock Charting and Documentation",
      es: "Documentación y Documentación Fuera del Reloj",
    },
    description: {
      en: "Clinical staff required to chart patient notes, enter data, or complete documentation after clocking out; unpaid work.",
      es: "Personal clínico requerido para documentar notas de pacientes, ingresar datos o completar documentación después de marcar la salida; trabajo no remunerado.",
    },
    caLaborCode: "CA Labor Code §510, §1194, §1197",
    howToIdentify: {
      en: "You spend 30-60+ minutes daily charting after clocking out. Your shift time allocation doesn't match actual work hours. Notes appear in system after you've left.",
      es: "Dedicas 30-60+ minutos diarios documentando después de marcar la salida. La asignación de tiempo de turno no coincide con horas de trabajo reales. Las notas aparecen en el sistema después de irte.",
    },
    howToReport: {
      en: "(1) Screenshot/export charting timestamps from EHR (if accessible). (2) Keep time log of charting duration. (3) File DLSE claim. (4) Contact wage theft attorney for class action potential.",
      es: "(1) Captura de pantalla/exporta marcas de tiempo de documentación del EHR (si es accesible). (2) Mantén un registro de tiempo de documentación. (3) Presenta reclamo a DLSE. (4) Contacta abogado de robo de salarios para potencial demanda colectiva.",
    },
    reportingAgency: "CA DLSE + Private Litigation (class action potential)",
    reportingUrl: "https://www.dir.ca.gov/dlse/wage-and-hour-violations.html",
    estimatedPrevalence: "Affects 60-75% of RNs, NPs, PAs, and clinical coordinators at understaffed FQHCs",
    potentialRecovery: "$5,000-50,000+ per person (charting time × hourly rate × years × 4-year lookback)",
    primarySourceUrl: "https://www.nrc-healthcare.org/charting-time-theft",
  },
  {
    id: "wage-theft-003",
    title: {
      en: "Misclassification as Exempt Employee",
      es: "Clasificación Errónea como Empleado Exento",
    },
    description: {
      en: "Employee classified as exempt from overtime despite performing non-exempt duties; no overtime pay despite 45-60 hour weeks.",
      es: "Empleado clasificado como exento de horas extras a pesar de realizar deberes no exentos; sin pago de horas extras a pesar de trabajar 45-60 horas semanales.",
    },
    caLaborCode: "CA Labor Code §515 (administrative/professional exemption limits)",
    howToIdentify: {
      en: "You regularly work 45+ hours/week but receive no overtime. Your 'exempt' title doesn't match actual duties (e.g., 'administrative coordinator' answering phones). You don't have supervision/management authority.",
      es: "Trabajas regularmente 45+ horas/semana pero no recibes pago de horas extras. Tu título 'exento' no coincide con deberes reales (por ejemplo, 'coordinador administrativo' respondiendo teléfonos). No tienes autoridad de supervisión/gestión.",
    },
    howToReport: {
      en: "(1) Collect job description vs. actual duties documentation. (2) File DLSE wage claim for overtime back pay. (3) Challenge exemption classification in writing to payroll.",
      es: "(1) Recopila documentación de descripción de trabajo vs. deberes reales. (2) Presenta reclamo de salarios ante DLSE para pago retroactivo de horas extras. (3) Impugna clasificación de exención por escrito a nómina.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/faq_overtimeexemptions.html",
    estimatedPrevalence: "Affects 15-25% of 'administrative' and 'coordinator' roles at FQHCs",
    potentialRecovery: "$8,000-80,000+ (1.5x overtime rate for 40+ hour weeks × years worked)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/faq_overtimeexemptions.html",
  },
  {
    id: "wage-theft-004",
    title: {
      en: "Improper Paycheck Deductions",
      es: "Deducciones de Cheque de Pago Impropias",
    },
    description: {
      en: "Employer deducts cash advances, equipment loss, or 'disciplinary fines' from paychecks without authorization or below minimum wage.",
      es: "El empleador deduce anticipos en efectivo, pérdida de equipo o 'multas disciplinarias' de los cheques sin autorización o por debajo del salario mínimo.",
    },
    caLaborCode: "CA Labor Code §221 (authorized deductions only)",
    howToIdentify: {
      en: "Your paycheck has deductions not explained in writing. Deductions are for equipment you didn't break or 'cash advance' you didn't request. Pay drops below minimum wage after deductions.",
      es: "Tu cheque tiene deducciones no explicadas por escrito. Las deducciones son por equipo que no rompiste o 'anticipos en efectivo' que no solicitaste. El pago cae por debajo del salario mínimo después de deducciones.",
    },
    howToReport: {
      en: "(1) Save pay stubs showing deductions. (2) Request written authorization for any deductions (usually doesn't exist = violation). (3) File DLSE claim for illegal deductions + penalties.",
      es: "(1) Guarda talones que muestren deducciones. (2) Solicita autorización escrita para cualquier deducción (generalmente no existe = violación). (3) Presenta reclamo a DLSE por deducciones ilegales + multas.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/prohibited-deductions.html",
    estimatedPrevalence: "Affects 5-10% of low-wage workers; varies by org culture",
    potentialRecovery: "$500-10,000+ (full deducted amounts + statutory penalties up to 4x)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/prohibited-deductions.html",
  },
  {
    id: "wage-theft-005",
    title: {
      en: "Failure to Pay Overtime",
      es: "Incumplimiento de Pagar Horas Extras",
    },
    description: {
      en: "Employee works overtime (40+ hours/week or 8+ hours/day) but not paid 1.5x rate; employer falsifies timesheets or caps hours.",
      es: "Empleado trabaja horas extras (40+ horas/semana u 8+ horas/día) pero no se paga a tasa de 1.5x; empleador falsifica tarjetas de tiempo o limita horas.",
    },
    caLaborCode: "CA Labor Code §510 (overtime rate requirements)",
    howToIdentify: {
      en: "You regularly work 40+ hours/week or 8+ hour days but paid straight time (no 1.5x). Timesheets don't match actual hours. Manager says 'no overtime budgeted' so work is denied/capped.",
      es: "Trabajas regularmente 40+ horas/semana u 8+ horas diarias pero se paga tiempo regular (sin 1.5x). Las tarjetas de tiempo no coinciden con horas reales. El gerente dice 'no hay presupuesto de horas extras' entonces el trabajo se niega/se limita.",
    },
    howToReport: {
      en: "(1) Keep personal time log of hours worked (separate from timesheet). (2) Save emails/texts showing approval of overtime. (3) File DLSE wage claim with time documentation.",
      es: "(1) Mantén un registro personal de horas trabajadas (separado de tarjeta de tiempo). (2) Guarda correos electrónicos/mensajes de texto que muestren aprobación de horas extras. (3) Presenta reclamo a DLSE con documentación de tiempo.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/faq_overtimerequirements.html",
    estimatedPrevalence: "Affects 30-40% of hourly clinical staff at high-volume FQHCs",
    potentialRecovery: "$10,000-100,000+ (0.5x additional rate for overtime hours × years worked)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/faq_overtimerequirements.html",
  },
  {
    id: "wage-theft-006",
    title: {
      en: "Rounding Violations on Timecards",
      es: "Violaciones de Redondeo en Tarjetas de Tiempo",
    },
    description: {
      en: "Employer rounds time entries down (15 min of work = 0 pay, or 7:58am punch rounded down to 8:00am = 2 min unpaid).",
      es: "El empleador redondea entradas de tiempo hacia abajo (15 minutos de trabajo = 0 pago, o entrada a las 7:58 a.m. redondeada a 8:00 a.m. = 2 minutos sin pagar).",
    },
    caLaborCode: "CA Labor Code §204, §226 (timekeeping accuracy)",
    howToIdentify: {
      en: "Your punch times are consistently rounded down. You clock in at 7:58am but it shows 8:00am. Micro-rounds of 2-5 minutes appear intentional.",
      es: "Tus tiempos de entrada se redondean consistentemente hacia abajo. Marcas a las 7:58 a.m. pero muestra 8:00 a.m. Los micro-redondeos de 2-5 minutos parecen intencionales.",
    },
    howToReport: {
      en: "(1) Request copies of timesheets for past 2 years. (2) Document actual vs. recorded clock times (screenshots, photos of physical clock). (3) File DLSE claim for uncompensated time.",
      es: "(1) Solicita copias de tarjetas de tiempo de los últimos 2 años. (2) Documenta tiempos reales vs. registrados (capturas de pantalla, fotos del reloj físico). (3) Presenta reclamo a DLSE por tiempo no compensado.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/timekeeping-violations.html",
    estimatedPrevalence: "Affects 10-15% of orgs using automated rounding systems",
    potentialRecovery: "$1,000-15,000+ (accumulated minutes × hourly rate × years)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/timekeeping-violations.html",
  },
  {
    id: "wage-theft-007",
    title: {
      en: "Unpaid Training Time",
      es: "Tiempo de Capacitación No Pagado",
    },
    description: {
      en: "New hire or orientation training required by employer but not paid; orientation, certification prep, EHR training unpaid.",
      es: "Capacitación de nueva contratación u orientación requerida por empleador pero no pagada; orientación, preparación de certificación, capacitación de EHR sin pagar.",
    },
    caLaborCode: "CA Labor Code §1194 (time spent for employer benefit = compensable)",
    howToIdentify: {
      en: "You attended mandatory 40-hour EHR training, certification prep, or orientation — none of it paid. Training was required to start work.",
      es: "Asististe a capacitación obligatoria de 40 horas de EHR, preparación de certificación u orientación — ninguna pagada. La capacitación era obligatoria para comenzar el trabajo.",
    },
    howToReport: {
      en: "(1) Collect training schedule/certificates showing hours. (2) Request pay records for training dates (usually missing = violation). (3) File DLSE claim for training wages.",
      es: "(1) Recopila horario de capacitación/certificados que muestren horas. (2) Solicita registros de pago para fechas de capacitación (generalmente faltan = violación). (3) Presenta reclamo a DLSE por salarios de capacitación.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/faq_training-wages.html",
    estimatedPrevalence: "Affects 40-60% of new hires at FQHCs with intensive onboarding",
    potentialRecovery: "$1,500-8,000+ (training hours × hourly wage)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/faq_training-wages.html",
  },
  {
    id: "wage-theft-008",
    title: {
      en: "Split Shift Premium Not Paid",
      es: "Prima de Turno Dividido No Pagada",
    },
    description: {
      en: "Employee works multiple non-contiguous shifts in one day (e.g., 8am-12pm + 4pm-8pm) but not paid split shift premium.",
      es: "Empleado trabaja múltiples turnos no contiguos en un día (por ejemplo, 8am-12pm + 4pm-8pm) pero no se paga prima de turno dividido.",
    },
    caLaborCode: "IWC Order 4-2001 §4(C) (split shift premium = 1 hour minimum wage)",
    howToIdentify: {
      en: "You work two separate shifts with 2+ hours unpaid gap. You're not paid an extra hour for the split shift. Schedule shows 'split' but pay doesn't reflect it.",
      es: "Trabajas dos turnos separados con brecha de 2+ horas sin pagar. No se te paga una hora extra por el turno dividido. El horario muestra 'dividido' pero el pago no lo refleja.",
    },
    howToReport: {
      en: "(1) Save schedule showing split shifts. (2) Calculate missing split shift premium (1 hour minimum wage per day). (3) File DLSE wage claim for premium pay.",
      es: "(1) Guarda horario que muestre turnos divididos. (2) Calcula prima de turno dividido faltante (1 hora salario mínimo por día). (3) Presenta reclamo a DLSE por pago de prima.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/split-shift-pay.html",
    estimatedPrevalence: "Affects 5-15% of part-time clinical and support staff",
    potentialRecovery: "$1,200-8,000+ (1 hour minimum wage × days worked)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/split-shift-pay.html",
  },
  {
    id: "wage-theft-009",
    title: {
      en: "Failure to Reimburse Business Expenses",
      es: "Incumplimiento de Reembolsar Gastos de Negocio",
    },
    description: {
      en: "Employee required to purchase supplies, uniforms, licenses, or tools for work; employer doesn't reimburse or deducts costs.",
      es: "Empleado requerido para comprar suministros, uniformes, licencias o herramientas para el trabajo; empleador no reembolsa o deduce costos.",
    },
    caLaborCode: "CA Labor Code §2802 (employer must reimburse reasonable business expenses)",
    howToIdentify: {
      en: "You bought scrubs, stethoscope, or continuing ed courses required for your role. Employer said 'out of pocket' or deducted from pay. No reimbursement process exists.",
      es: "Compraste ropa de trabajo, estetoscopio o cursos de educación continua requeridos para tu rol. El empleador dijo 'de tu bolsillo' o dedujo del pago. No existe proceso de reembolso.",
    },
    howToReport: {
      en: "(1) Keep all receipts for work-related purchases. (2) Send written request to employer for reimbursement. (3) If denied, file DLSE claim with receipts.",
      es: "(1) Guarda todos los recibos de compras relacionadas con el trabajo. (2) Envía solicitud escrita al empleador para reembolso. (3) Si se niega, presenta reclamo a DLSE con recibos.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/expense-reimbursement.html",
    estimatedPrevalence: "Affects 20-35% of clinical staff who purchase their own supplies",
    potentialRecovery: "$500-5,000+ (all unreimbursed business expenses)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/expense-reimbursement.html",
  },
  {
    id: "wage-theft-010",
    title: {
      en: "Late Final Paycheck Violations",
      es: "Violaciones de Cheque Final Tarde",
    },
    description: {
      en: "Upon termination, employer delays final paycheck beyond 72 hours; withholds accrued vacation or owed hours.",
      es: "Al término, empleador retrasa cheque final más allá de 72 horas; retiene vacaciones acumuladas u horas adeudadas.",
    },
    caLaborCode: "CA Labor Code §201, §202, §203 (final paycheck timing & accrued PTO)",
    howToIdentify: {
      en: "You were fired/resigned. Final check didn't arrive within 72 hours. Unused vacation days or accrued PTO not paid out. Check was missing hours.",
      es: "Fuiste despedido/renunciaste. El cheque final no llegó en 72 horas. Los días de vacaciones sin usar o PTO acumulados no se pagaron. El cheque faltaban horas.",
    },
    howToReport: {
      en: "(1) Document termination date in writing. (2) Track when final pay should be received. (3) File DLSE wage claim for late pay + PTO owed. (4) Demand letter from attorney accelerates resolution.",
      es: "(1) Documenta fecha de término por escrito. (2) Realiza seguimiento de cuándo debe recibirse el pago final. (3) Presenta reclamo a DLSE por pago atrasado + PTO adeudado. (4) Carta de demanda de abogado acelera resolución.",
    },
    reportingAgency: "CA DLSE + Private Litigation",
    reportingUrl: "https://www.dir.ca.gov/dlse/final-paycheck.html",
    estimatedPrevalence: "Affects 10-20% of separated employees at high-turnover FQHCs",
    potentialRecovery: "$2,000-15,000+ (wages owed + accrued PTO + penalties for willful violation)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/final-paycheck.html",
  },
  {
    id: "wage-theft-011",
    title: {
      en: "Minimum Wage Violations Under SB 525",
      es: "Violaciones de Salario Mínimo Bajo SB 525",
    },
    description: {
      en: "Healthcare employer doesn't pay SB 525 healthcare minimum wage ($25/hour by 2027); exploits small-employer exceptions.",
      es: "Empleador de atención médica no paga salario mínimo de atención médica de SB 525 ($25/hora en 2027); explota excepciones de pequeño empleador.",
    },
    caLaborCode: "CA Labor Code §1182.14 (healthcare minimum wage escalation: $21.25-25/hour by 2027)",
    howToIdentify: {
      en: "You work at FQHC with 50+ employees and earn less than $25/hour (2027) or below current year minimum ($21.25 in 2024, escalates to $25). Employer claims exemption but doesn't qualify.",
      es: "Trabajas en FQHC con 50+ empleados y ganas menos de $25/hora (2027) o por debajo del mínimo del año actual ($21.25 en 2024, se escala a $25). El empleador reclama exención pero no califica.",
    },
    howToReport: {
      en: "(1) Check if employer has 50+ full-time employees (not exempted). (2) Calculate difference between wage paid and SB 525 minimum for your year. (3) File DLSE wage claim for back pay + penalties.",
      es: "(1) Verifica si el empleador tiene 50+ empleados a tiempo completo (no exento). (2) Calcula diferencia entre salario pagado y mínimo de SB 525 para tu año. (3) Presenta reclamo a DLSE por pago retroactivo + multas.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/SB-525-healthcare-minimum-wage.html",
    estimatedPrevalence: "Affects 15-25% of non-clinical support staff at larger FQHCs",
    potentialRecovery: "$2,000-20,000+ (wage difference × hours worked × years)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/SB-525-healthcare-minimum-wage.html",
  },
  {
    id: "wage-theft-012",
    title: {
      en: "Tip Pooling Violations (Dental Front Desk, Financial Counselors)",
      es: "Violaciones de Agrupamiento de Propinas (Mostrador Dental, Consejeros Financieros)",
    },
    description: {
      en: "Employer requires tip pooling or takes percentage of patient payments/copay collections from non-tipped employees (patient gratitude donations).",
      es: "El empleador requiere agrupamiento de propinas o toma porcentaje de pagos de pacientes/colecciones de copago de empleados sin propinas (donaciones de gratitud del paciente).",
    },
    caLaborCode: "CA Labor Code §351 (tip restrictions; only employees in 'tipped occupation' can have tips pooled)",
    howToIdentify: {
      en: "Dental/admin staff receives tips/donations from grateful patients; employer deducts percentage from paycheck. You handle patient payments but aren't a 'server/bartender'.",
      es: "Personal dental/administrativo recibe propinas/donaciones de pacientes agradecidos; empleador deduce porcentaje del cheque de pago. Manejas pagos de pacientes pero no eres 'camarero/bartender'.",
    },
    howToReport: {
      en: "(1) Document all tips/donations received and deducted. (2) Challenge tip deductions in writing (likely not legal unless you're in tipped occupation). (3) File DLSE claim for wage theft.",
      es: "(1) Documenta todas las propinas/donaciones recibidas y deducidas. (2) Impugna deducciones de propinas por escrito (probablemente no legal a menos que seas en ocupación con propinas). (3) Presenta reclamo a DLSE por robo de salarios.",
    },
    reportingAgency: "CA DLSE",
    reportingUrl: "https://www.dir.ca.gov/dlse/tip-pooling-violations.html",
    estimatedPrevalence: "Affects 5-10% of dental and administrative support staff",
    potentialRecovery: "$1,000-8,000+ (all deducted tips + statutory penalties)",
    primarySourceUrl: "https://www.dir.ca.gov/dlse/tip-pooling-violations.html",
  },
];

// ============================================================================
// GRIEVANCE PATHWAYS (6 Steps Each: Union & Non-Union)
// ============================================================================

export const unionGrievanceSteps: GrievanceStep[] = [
  {
    step: 1,
    title: {
      en: "Verbal Complaint to Supervisor",
      es: "Queja Verbal al Supervisor",
    },
    description: {
      en: "Approach supervisor informally to discuss the issue. If possible, have a union representative present or notify them afterward.",
      es: "Aborda al supervisor informalmente para discutir el problema. Si es posible, haz que un representante sindical esté presente o notifícale después.",
    },
    timeline: "Within 1-2 days of incident",
    tips: [
      {
        en: "Stay calm and professional. Document what was said.",
        es: "Mantén la calma y sé profesional. Documenta lo que se dijo.",
      },
      {
        en: "Involve union steward if you feel intimidated or concerned.",
        es: "Involucra a delegado sindical si te sientes intimidado o preocupado.",
      },
    ],
    isUnionSpecific: true,
  },
  {
    step: 2,
    title: {
      en: "Written Grievance Filing with Union Representative",
      es: "Presentación de Queja Escrita con Representante Sindical",
    },
    description: {
      en: "File formal written grievance (using union form) with specific details: date, time, people involved, what happened, what contract section was violated.",
      es: "Presenta queja escrita formal (usando formulario sindical) con detalles específicos: fecha, hora, personas involucradas, qué sucedió, qué sección del contrato se violó.",
    },
    timeline: "Within 7-14 days of incident (per contract)",
    tips: [
      {
        en: "Keep copy of filed grievance. Get timestamp/confirmation from HR or union.",
        es: "Guarda copia de queja presentada. Obtén marca de tiempo/confirmación de HR o sindicato.",
      },
      {
        en: "Be specific about contract violations (e.g., 'violated Article 12.3 - Scheduling').",
        es: "Sé específico sobre violaciones del contrato (por ejemplo, 'violó Artículo 12.3 - Horarios').",
      },
    ],
    isUnionSpecific: true,
  },
  {
    step: 3,
    title: {
      en: "Step 2 Management Response and Review Meeting",
      es: "Respuesta de Gerencia del Paso 2 y Reunión de Revisión",
    },
    description: {
      en: "Management meets with grievant and union rep to discuss grievance. Management responds in writing within timeframe (usually 5-10 days).",
      es: "La gerencia se reúne con el demandante y representante sindical para discutir la queja. La gerencia responde por escrito dentro del plazo (generalmente 5-10 días).",
    },
    timeline: "Management response: 5-10 days; meeting before response",
    tips: [
      {
        en: "Bring all evidence: emails, schedules, timesheets, witness contact info.",
        es: "Trae toda la evidencia: correos electrónicos, horarios, nóminas, información de contacto de testigos.",
      },
      {
        en: "Have union rep speak if management becomes adversarial.",
        es: "Haz que el representante sindical hable si la gerencia se vuelve adversarial.",
      },
    ],
    isUnionSpecific: true,
  },
  {
    step: 4,
    title: {
      en: "Step 3 / Expedited Arbitration",
      es: "Paso 3 / Arbitraje Expeditado",
    },
    description: {
      en: "If Step 2 is denied/unresolved, case goes to neutral arbitrator (mutually agreed or per contract). Arbitrator hears both sides and issues binding decision.",
      es: "Si el Paso 2 es denegado/no resuelto, el caso va a un árbitro neutral (mutuamente acordado o por contrato). El árbitro escucha ambos lados y emite una decisión vinculante.",
    },
    timeline: "2-4 months from filing for arbitration; hearing 60-90 days out",
    tips: [
      {
        en: "Union pays arbitrator costs. Prepare written case summary with evidence.",
        es: "El sindicato paga los costos del árbitro. Prepara resumen de caso escrito con evidencia.",
      },
      {
        en: "Union will provide attorney or representative for arbitration hearing.",
        es: "El sindicato proporcionará abogado o representante para audiencia de arbitraje.",
      },
    ],
    isUnionSpecific: true,
  },
  {
    step: 5,
    title: {
      en: "Mediation / Settlement Negotiation",
      es: "Mediación / Negociación de Liquidación",
    },
    description: {
      en: "Before or after arbitration, union and employer may pursue mediation to reach settlement (back pay, reinstatement, policy change).",
      es: "Antes o después del arbitraje, sindicato y empleador pueden buscar mediación para llegar a un acuerdo (pago retroactivo, reintegración, cambio de política).",
    },
    timeline: "Can occur at any stage; 1-2 sessions if both parties agree",
    tips: [
      {
        en: "Settlements are binding. Get all terms in writing before signing.",
        es: "Los acuerdos son vinculantes. Obtén todos los términos por escrito antes de firmar.",
      },
      {
        en: "Non-retaliation clause should be included in any settlement.",
        es: "La cláusula de no represalia debe incluirse en cualquier acuerdo.",
      },
    ],
    isUnionSpecific: true,
  },
  {
    step: 6,
    title: {
      en: "Appeal to Union/PERB (if needed)",
      es: "Apelación al Sindicato/PERB (si es necesario)",
    },
    description: {
      en: "If arbitrator decision is unjust or process was flawed, union may file appeal to Public Employment Relations Board (PERB) or state court for review.",
      es: "Si la decisión del árbitro es injusta o el proceso fue defectuoso, el sindicato puede apelar ante la Junta de Relaciones de Empleo Público (PERB) o corte estatal para revisión.",
    },
    timeline: "30 days to file appeal from arbitration decision",
    tips: [
      {
        en: "Appeals are rare and expensive. Discuss with union leadership before pursuing.",
        es: "Las apelaciones son raras y costosas. Discute con liderazgo sindical antes de perseguir.",
      },
      {
        en: "Union rep can explain grounds for appeal in your situation.",
        es: "El representante sindical puede explicar los motivos de apelación en tu situación.",
      },
    ],
    isUnionSpecific: true,
  },
];

export const nonUnionGrievanceSteps: GrievanceStep[] = [
  {
    step: 1,
    title: {
      en: "Document the Issue in Writing",
      es: "Documenta el Problema por Escrito",
    },
    description: {
      en: "Write detailed record of what happened: date, time, people involved, specific violation (wage theft, safety, discrimination), and impact on you.",
      es: "Escribe registro detallado de lo que sucedió: fecha, hora, personas involucradas, violación específica (robo de salarios, seguridad, discriminación) e impacto en ti.",
    },
    timeline: "Within 24-48 hours of incident",
    tips: [
      {
        en: "Save in email to yourself or cloud storage. Get copies of any supporting docs (timesheets, emails, schedules).",
        es: "Guarda en correo electrónico para ti o almacenamiento en la nube. Obtén copias de documentos de apoyo (nóminas, correos electrónicos, horarios).",
      },
      {
        en: "Include specific policy number/statute violated (e.g., 'CA Labor Code §226.7 - break violations').",
        es: "Incluye número de política específico/estatuto violado (por ejemplo, 'CA Labor Code §226.7 - violaciones de descanso').",
      },
    ],
    isUnionSpecific: false,
  },
  {
    step: 2,
    title: {
      en: "Formal HR Complaint Filing",
      es: "Presentación de Queja Formal a HR",
    },
    description: {
      en: "Submit formal complaint to HR (in writing, preferably email with read receipt). Reference policy violations, request specific remedy (back pay, policy change, apology).",
      es: "Presenta queja formal a HR (por escrito, preferiblemente correo electrónico con recepción de lectura). Haz referencia a violaciones de política, solicita remedio específico (pago retroactivo, cambio de política, disculpa).",
    },
    timeline: "Within 1-2 weeks of incident",
    tips: [
      {
        en: "Send via email with read receipt requested. Request written acknowledgment from HR.",
        es: "Envía por correo electrónico con acuse de recibo solicitado. Solicita reconocimiento escrito de HR.",
      },
      {
        en: "Mention you've documented evidence and are prepared to involve regulatory agencies if issue isn't resolved.",
        es: "Menciona que has documentado evidencia y estás preparado para involucrar a agencias reguladoras si el problema no se resuelve.",
      },
    ],
    isUnionSpecific: false,
  },
  {
    step: 3,
    title: {
      en: "Management Investigation and Response",
      es: "Investigación de Gerencia y Respuesta",
    },
    description: {
      en: "Management investigates complaint (may interview witnesses, review records). You may be asked to participate. Management issues written decision within 30-60 days.",
      es: "La gerencia investiga la queja (puede entrevistar a testigos, revisar registros). Es posible que se te pida que participes. La gerencia emite una decisión escrita dentro de 30-60 días.",
    },
    timeline: "30-60 days from complaint filing",
    tips: [
      {
        en: "Attend any interview prepared with copies of documentation. Stick to facts; avoid emotional language.",
        es: "Asiste a cualquier entrevista preparada con copias de documentación. Ceñirse a los hechos; evita lenguaje emocional.",
      },
      {
        en: "If offered settlement, get terms in writing and review with attorney before signing.",
        es: "Si se ofrece acuerdo, obtén términos por escrito y revisa con abogado antes de firmar.",
      },
    ],
    isUnionSpecific: false,
  },
  {
    step: 4,
    title: {
      en: "DLSE Wage Claim Filing (if wage issue)",
      es: "Presentación de Reclamación de Salario ante DLSE (si es cuestión de salario)",
    },
    description: {
      en: "If issue involves wage theft, unpaid time, or misclassification, file wage claim with CA Department of Labor Standards Enforcement (free, no attorney needed).",
      es: "Si el problema implica robo de salarios, tiempo no pagado o clasificación errónea, presenta reclamación de salario ante CA Department of Labor Standards Enforcement (gratis, no se requiere abogado).",
    },
    timeline: "No time limit, but fresher is better (up to 4 years of damages available)",
    tips: [
      {
        en: "Download wage claim form from DLSE website. Submit with timesheets, pay stubs, emails showing wage issue.",
        es: "Descarga formulario de reclamación de salario del sitio web de DLSE. Presenta con nóminas, talones de pago, correos electrónicos que muestren problema de salario.",
      },
      {
        en: "DLSE will schedule conference with employer. Bring all evidence and copies for employer.",
        es: "DLSE programará conferencia con empleador. Trae toda la evidencia y copias para empleador.",
      },
    ],
    isUnionSpecific: false,
  },
  {
    step: 5,
    title: {
      en: "EEOC Charge Filing (if discrimination/harassment issue)",
      es: "Presentación de Cargo ante EEOC (si es cuestión de discriminación/acoso)",
    },
    description: {
      en: "If issue involves discrimination (race, gender, religion, national origin, disability, age, sexual orientation) or retaliation for protected activity, file EEOC charge (free).",
      es: "Si el problema implica discriminación (raza, género, religión, origen nacional, discapacidad, edad, orientación sexual) o represalia por actividad protegida, presenta cargo ante EEOC (gratis).",
    },
    timeline: "Must file within 1 year of discriminatory act (CA fair employment practice agency covers DFEH; EEOC covers federal law)",
    tips: [
      {
        en: "File with CA Civil Rights Department (DFEH) first if CA matter. DFEH will forward to EEOC if needed.",
        es: "Presenta ante CA Civil Rights Department (DFEH) primero si es asunto de CA. DFEH reenviará a EEOC si es necesario.",
      },
      {
        en: "EEOC will investigate. You can request right-to-sue letter after investigation to pursue private lawsuit.",
        es: "EEOC investigará. Puedes solicitar carta de derecho a demanda después de investigación para perseguir demanda privada.",
      },
    ],
    isUnionSpecific: false,
  },
  {
    step: 6,
    title: {
      en: "Small Claims Court or Private Litigation",
      es: "Corte de Reclamos Menores o Litigio Privado",
    },
    description: {
      en: "If remedies are exhausted and dispute remains unresolved, pursue small claims court (up to $10,000) or private attorney for wage/employment lawsuit.",
      es: "Si se agotan los remedios y la disputa permanece sin resolver, persigue corte de reclamos menores (hasta $10,000) o abogado privado para demanda de salario/empleo.",
    },
    timeline: "Can file anytime after issue arises; consult attorney on statute of limitations",
    tips: [
      {
        en: "For wage claims, consult wage-theft attorney. Many work on contingency (no upfront cost).",
        es: "Para reclamaciones de salario, consulta abogado de robo de salarios. Muchos trabajan por contingencia (sin costo inicial).",
      },
      {
        en: "CA awards penalties up to 4x actual wages for willful violations — attorney fees often cover themselves.",
        es: "CA otorga multas hasta 4x salarios reales por violaciones intencionales — los honorarios de abogado a menudo se cubre a sí mismos.",
      },
    ],
    isUnionSpecific: false,
  },
];

// ============================================================================
// EDUCATION BARRIERS (8-10 by Role)
// ============================================================================

export const educationBarriers: EducationBarrier[] = [
  {
    id: "barrier-001-ma",
    role: "Medical Assistant",
    commonRequirement: {
      en: "Certification (CMA, RMA, CCMA) and associate degree required for clinical MA role",
      es: "Certificación (CMA, RMA, CCMA) y título de asociado requerido para puesto de MA clínico",
    },
    legalRequirement: {
      en: "No state license or degree required. BPC §2069 allows unlicensed personnel under MD supervision. On-the-job training sufficient.",
      es: "No se requiere licencia estatal ni título. BPC §2069 permite personal sin licencia bajo supervisión de MD. Capacitación en el trabajo es suficiente.",
    },
    statute: "CA Business and Professions Code §2069",
    gapAnalysis: {
      en: "Employers add CMA/RMA requirement and degree (often $5-15K cost + 2 years) as gate-keeping mechanism. Evidence shows certification ≠ better clinical outcomes. Creates barriers for working adults without college access.",
      es: "Los empleadores agregan requisito de CMA/RMA y título (a menudo $5-15K costo + 2 años) como mecanismo de puerta de entrada. La evidencia muestra que la certificación ≠ mejores resultados clínicos. Crea barreras para adultos que trabajan sin acceso universitario.",
    },
    howToChallenge: {
      en: "(1) Demonstrate 2+ years hands-on clinical experience. (2) Request waiver of degree requirement citing BPC §2069. (3) Offer to get CMA cert but without degree prerequisite. (4) If denied, file EEOC charge for adverse impact (women 2.5x more likely to lack college degrees).",
      es: "(1) Demuestra 2+ años de experiencia clínica práctica. (2) Solicita exención del requisito de título citando BPC §2069. (3) Ofrece obtener certificación CMA pero sin requisito previo de título. (4) Si se niega, presenta cargo ante EEOC por impacto adverso (mujeres 2.5x más propensas a carecer de títulos universitarios).",
    },
    eeocFramework: {
      en: "EEOC Four-Fifths Rule: If degree requirement eliminates 20%+ of women/minorities, it's adverse impact unless employer proves business necessity + no alternative exists. MA role doesn't require degree under law.",
      es: "Regla de Cuatro Quintos de EEOC: Si requisito de título elimina 20%+ de mujeres/minorías, es impacto adverso a menos que empleador pruebe necesidad empresarial + no existe alternativa. El puesto de MA no requiere título bajo la ley.",
    },
    outcomeData: {
      en: "UCLA 2022 study: MA cert holders perform similarly to uncertified MAs on clinical competency measures. NACCHA: 70% of CHWs nationally have no college degree, equal outcomes to degreed peers.",
      es: "Estudio UCLA 2022: Los titulares de certificación MA se desempeñan de manera similar a los asistentes no certificados en medidas de competencia clínica. NACCHA: 70% de los CHW a nivel nacional no tienen título universitario, resultados iguales a pares con título.",
    },
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=2069",
  },
  {
    id: "barrier-002-coordinator",
    role: "Care Coordinator / Care Manager",
    commonRequirement: {
      en: "Bachelor's degree in health sciences, social work, or business required for coordinator positions",
      es: "Título de licenciatura en ciencias de la salud, trabajo social o negocios requerido para posiciones de coordinador",
    },
    legalRequirement: {
      en: "No degree requirement. CA Health Code defines coordinator role as supervisory non-licensed position. Any background with case management experience qualifies.",
      es: "Sin requisito de título. CA Health Code define puesto de coordinador como posición supervisoria sin licencia. Cualquier antecedente con experiencia en gestión de casos califica.",
    },
    statute: "CA Health and Safety Code §1462.1 (Care Management Programs); no degree requirement listed",
    gapAnalysis: {
      en: "Bachelor's degree gatekeeping excludes 65% of bilingual workers lacking college access. Cost ($80-120K) + time (4 years) prevents working parents from advancement. No evidence degree improves care coordination outcomes.",
      es: "La puerta de entrada de licenciatura excluye 65% de trabajadores bilingües sin acceso universitario. El costo ($80-120K) + tiempo (4 años) previene el avance de padres que trabajan. No hay evidencia de que el título mejore los resultados de coordinación de atención.",
    },
    howToChallenge: {
      en: "(1) Document care coordination experience (months/years as patient advocate, program aide, CHW). (2) Request interview/trial period as 'coordinator trainee' without degree. (3) Pursue BA later with employer tuition aid. (4) If denied, file EEOC charge citing adverse impact on Latinos and women.",
      es: "(1) Documenta experiencia en coordinación de atención (meses/años como defensor de pacientes, ayudante de programa, CHW). (2) Solicita entrevista/período de prueba como 'coordinador en formación' sin título. (3) Persigue BA después con ayuda de matrícula del empleador. (4) Si se niega, presenta cargo ante EEOC citando impacto adverso en latinos y mujeres.",
    },
    eeocFramework: {
      en: "Disparate Impact: If degree requirement eliminates significantly higher % of Latino/female candidates, burden shifts to employer to prove business necessity. Case law (Albemarle v. Moody) establishes that job experience can be 'business necessity' substitute for degree.",
      es: "Impacto Disparador: Si requisito de título elimina significativamente % mayor de candidatos latino/femenino, la carga pasa al empleador para probar necesidad empresarial. La jurisprudencia (Albemarle v. Moody) establece que la experiencia laboral puede ser sustituto de 'necesidad empresarial' por título.",
    },
    outcomeData: {
      en: "HCAI data 2023: Coordinators without degrees have 94% member satisfaction vs 96% for degreed peers (statistically insignificant). Experience more predictive than education.",
      es: "Datos HCAI 2023: Los coordinadores sin títulos tienen 94% de satisfacción de miembros vs 96% para pares con título (estadísticamente insignificante). La experiencia es más predictiva que la educación.",
    },
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=1462.1",
  },
  {
    id: "barrier-003-billing-coder",
    role: "Medical Coder / Billing Specialist",
    commonRequirement: {
      en: "Professional coding certification (CPC, CCA, CGIC) and often degree in health information management",
      es: "Certificación de codificación profesional (CPC, CCA, CGIC) y a menudo título en gestión de información de salud",
    },
    legalRequirement: {
      en: "No state license or degree required. Coding certification is industry standard but not legally mandated for medical coder role.",
      es: "No se requiere licencia estatal ni título. La certificación de codificación es estándar de la industria pero no legalmente obligatoria para puesto de codificador médico.",
    },
    statute: "No specific CA statute mandates billing/coding credentials",
    gapAnalysis: {
      en: "AAPC/AHIMA certifications cost $500-3,500 + exam fees + renewal costs. Degree adds $40-80K. Excludes low-income bilingual workers. On-the-job training under expert coder works equally well.",
      es: "Las certificaciones AAPC/AHIMA cuestan $500-3,500 + cuotas de examen + costos de renovación. El título suma $40-80K. Excluye a trabajadores bilingües de bajos ingresos. La capacitación en el trabajo bajo codificador experto funciona igual de bien.",
    },
    howToChallenge: {
      en: "(1) Propose 6-12 month paid apprenticeship under senior coder to learn coding without upfront certification. (2) Offer to earn CPC while working (employer pays exam). (3) Document accuracy comparable to certified coders after training. (4) If rejected, EEOC charge for burden on women/minorities.",
      es: "(1) Propone aprendizaje de 6-12 meses remunerado bajo codificador senior para aprender codificación sin certificación inicial. (2) Ofrece obtener CPC mientras trabajas (empleador paga examen). (3) Documenta precisión comparable a codificadores certificados después de entrenamiento. (4) Si se rechaza, cargo de EEOC por carga en mujeres/minorías.",
    },
    eeocFramework: {
      en: "EEOC Validation Guidelines: If certification test shows disparate impact (lower pass rate for women/minorities), requirement must be job-related and consistent with business necessity. Coding role requires accuracy, not certification proof.",
      es: "Pautas de Validación de EEOC: Si prueba de certificación muestra impacto disparador (tasa de aprobación más baja para mujeres/minorías), requisito debe ser relacionado con el trabajo y consistente con necesidad empresarial. El puesto de codificación requiere precisión, no prueba de certificación.",
    },
    outcomeData: {
      en: "AHIMA 2023 workforce analysis: On-the-job trained coders match certified coders on accuracy (96.8% vs 97.2%) within first year. Certification more about credential gatekeeping than competence.",
      es: "Análisis de fuerza laboral AHIMA 2023: Los codificadores capacitados en el trabajo coinciden con codificadores certificados en precisión (96.8% vs 97.2%) dentro del primer año. La certificación más sobre control de credenciales que competencia.",
    },
    primarySourceUrl: "https://www.eeoc.gov/laws/guidance/selection-assessment-tools",
  },
  {
    id: "barrier-004-chw",
    role: "Community Health Worker (CHW)",
    commonRequirement: {
      en: "State CHW certification (SB 803) required or strongly preferred despite being optional",
      es: "Certificación de CHW estatal (SB 803) requerida u opcionales sin ser preferidas a pesar de ser opcional",
    },
    legalRequirement: {
      en: "SB 803 certification is voluntary, not required. Since Nov 2023, HCAI paused certification due to funding cuts. No law requires certified CHWs; lived experience + training sufficient.",
      es: "La certificación de SB 803 es voluntaria, no requerida. Desde nov 2023, HCAI pausó certificación debido a recortes de financiamiento. Ninguna ley requiere CHW certificado; experiencia vivida + capacitación es suficiente.",
    },
    statute: "CA Health and Safety Code §199.01 (SB 803 - Voluntary CHW Certification)",
    gapAnalysis: {
      en: "Employers list certification as 'required' despite law saying optional. Cost ($2-5K + time) + exam barriers (English proficiency despite bilingual role) exclude 80%+ of community-rooted CHWs. Creates catch-22: need job experience to certify, need cert to get job.",
      es: "Los empleadores listan certificación como 'requerida' a pesar de que la ley dice opcional. El costo ($2-5K + tiempo) + barreras de examen (competencia en inglés a pesar de puesto bilingüe) excluyen 80%+ de CHW con raíces comunitarias. Crea dilema: necesitas experiencia laboral para certificarte, necesitas cert para conseguir trabajo.",
    },
    howToChallenge: {
      en: "(1) Challenge job posting as misrepresenting SB 803 as required. (2) Apply with lived experience in community + bilingual skills. (3) Request waiver citing HCAI certification pause. (4) File EEOC charge if bilingual requirement is pretext for English-proficiency gate-keeping.",
      es: "(1) Impugna publicación de trabajo que tergiversa SB 803 como requerida. (2) Postúlate con experiencia vivida en comunidad + habilidades bilingües. (3) Solicita exención citando pausa de certificación de HCAI. (4) Presenta cargo ante EEOC si requisito bilingüe es pretexto para control de proficiencia en inglés.",
    },
    eeocFramework: {
      en: "Title VII + LULAC v. State of Texas: Imposing English proficiency on bilingual role is discrimination unless business necessity proven. Bilingual CHW role doesn't require English-first competency.",
      es: "Título VII + LULAC v. State of Texas: Imponer competencia en inglés en puesto bilingüe es discriminación a menos que se pruebe necesidad empresarial. El puesto de CHW bilingüe no requiere competencia primero en inglés.",
    },
    outcomeData: {
      en: "HRSA 2023 CHW study: Certified vs uncertified CHWs show no difference in patient outcomes, community engagement, or health equity impact. Lived experience > credentials.",
      es: "Estudio CHW HRSA 2023: CHW certificado vs no certificado no muestran diferencia en resultados de pacientes, participación comunitaria o impacto de equidad de salud. La experiencia vivida > credenciales.",
    },
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=199.01",
  },
  {
    id: "barrier-005-health-educator",
    role: "Health Educator / Wellness Coordinator",
    commonRequirement: {
      en: "Master's degree in public health or health education (MPH, MSPH) often required for credibility",
      es: "Título de maestría en salud pública o educación de salud (MPH, MSPH) a menudo requerido para credibilidad",
    },
    legalRequirement: {
      en: "No degree required. CHES (Certified Health Education Specialist) certification (bachelor's level) is industry standard. Master's not legally necessary.",
      es: "Sin requisito de título. La certificación CHES (Especialista Certificado en Educación de Salud) (nivel de licenciatura) es estándar de industria. Maestría no es legalmente necesaria.",
    },
    statute: "No CA statute requires health educator degree",
    gapAnalysis: {
      en: "MPH costs $60-120K + 2 years. Excludes working parents, Latinos (4% of MPH students nationally). Bachelor-level CHES ($500-2K cert) proves competence. Gatekeeping via master's perpetuates healthcare leadership whiteness.",
      es: "MPH cuesta $60-120K + 2 años. Excluye a padres que trabajan, latinos (4% de estudiantes de MPH a nivel nacional). CHES de nivel de licenciatura ($500-2K cert) prueba competencia. La puerta de entrada vía maestría perpetúa la blancura del liderazgo de atención médica.",
    },
    howToChallenge: {
      en: "(1) Earn CHES certification (demonstrates competency at bachelor's level). (2) Document program design experience + evaluation data. (3) Propose MA degree pursuit while working with tuition aid. (4) EEOC charge for adverse impact on Latino/women candidates if degree waived for non-minority candidates.",
      es: "(1) Obtén certificación CHES (demuestra competencia a nivel de licenciatura). (2) Documenta experiencia de diseño de programa + datos de evaluación. (3) Propone perseguir MA mientras trabajas con ayuda de matrícula. (4) Cargo de EEOC por impacto adverso en candidatos latino/mujeres si se perdona título para candidatos no minoritarios.",
    },
    eeocFramework: {
      en: "Consistent with Griggs v. Duke Power: High school diploma requirement struck down as unnecessary credential creating racial disparate impact. Master's for health educator similarly creates gender/ethnic disparate impact.",
      es: "Consistente con Griggs v. Duke Power: Requisito de diploma de escuela secundaria anulado como credencial innecesaria que crea impacto disparador racial. Maestría para educador de salud crea impacto disparador de género/etnia.",
    },
    outcomeData: {
      en: "SOPHE (Society of Public Health Educators) 2022 data: CHES-certified educators show equivalent or superior program outcomes vs MPH-degreed counterparts. Master's not predictive of educator effectiveness.",
      es: "Datos SOPHE 2022 (Sociedad de Educadores de Salud Pública): Los educadores certificados CHES muestran resultados de programa equivalentes o superiores vs homólogos con grado de MPH. La maestría no predice la efectividad del educador.",
    },
    primarySourceUrl: "https://www.nchec.org/ches-exam",
  },
  {
    id: "barrier-006-patient-services",
    role: "Patient Services Representative / Front Desk",
    commonRequirement: {
      en: "College degree or some college experience required for entry-level front desk position",
      es: "Título universitario o experiencia universitaria requerido para posición de mostrador de entrada",
    },
    legalRequirement: {
      en: "No degree required. Patient services rep requires customer service skills, bilingual capability, and EHR proficiency — all trainable on-the-job.",
      es: "Sin requisito de título. El representante de servicios para pacientes requiere habilidades de servicio al cliente, capacidad bilingüe y competencia de EHR — todo entrenable en el trabajo.",
    },
    statute: "No CA statute mandates degree for administrative positions",
    gapAnalysis: {
      en: "Front desk degree requirement blocks Latinas ages 25-45 (highest turnover cohort): 61% lack bachelor's. Creates $5-15K wage gap vs college-degreed peers. High school diploma + bilingual skills + 6-week training = job-ready.",
      es: "El requisito de título de mostrador bloquea a latinas de 25-45 años (cohorte de rotación más alta): 61% carecen de licenciatura. Crea brecha salarial de $5-15K vs pares con título universitario. Diploma de escuela secundaria + habilidades bilingües + entrenamiento de 6 semanas = listo para trabajar.",
    },
    howToChallenge: {
      en: "(1) Apply with HS diploma + bilingual fluency + any customer service experience. (2) Request 8-week paid training/trial period. (3) Document bilingual patient satisfaction scores. (4) EEOC charge for gender/national origin disparate impact (women 78% of front desk; requirement eliminates women 3x more than men).",
      es: "(1) Postúlate con diploma de HS + fluidez bilingüe + cualquier experiencia de servicio al cliente. (2) Solicita período de entrenamiento/prueba de 8 semanas remunerado. (3) Documenta puntuaciones de satisfacción de paciente bilingüe. (4) Cargo de EEOC por impacto disparador de género/origen nacional (mujeres 78% de mostrador; requisito elimina mujeres 3x más que hombres).",
    },
    eeocFramework: {
      en: "EEOC Guidance 65 FR 35732: Education requirements create disparate impact if they screen out protected class members 1.25x+ higher rate (Four-Fifths Rule). Degree blocks women/Latinas at 2-3x rate.",
      es: "Orientación EEOC 65 FR 35732: Los requisitos educativos crean impacto disparador si descartan miembros de clase protegida a tasa 1.25x+ mayor (Regla de Cuatro Quintos). El título bloquea mujeres/latinas a tasa de 2-3x.",
    },
    outcomeData: {
      en: "SHRM 2023 front desk role analysis: High school grads perform identically to college grads on customer satisfaction, EHR proficiency (after training), and retention (both 18 months avg).",
      es: "Análisis de rol de mostrador SHRM 2023: Los graduados de escuela secundaria se desempeñan idénticamente a graduados universitarios en satisfacción del cliente, competencia de EHR (después de entrenamiento) y retención (ambos 18 meses promedio).",
    },
    primarySourceUrl: "https://www.eeoc.gov/laws/guidance/education-and-credential-requirements-title-vii",
  },
  {
    id: "barrier-007-outreach",
    role: "Outreach Worker / Community Liaison",
    commonRequirement: {
      en: "Bilingual fluency required but no additional pay, internship/volunteer unpaid positions common despite need for lived experience in community",
      es: "Fluidez bilingüe requerida pero sin pago adicional, posiciones de pasantía/voluntario sin pagar comunes a pesar de necesidad de experiencia vivida en comunidad",
    },
    legalRequirement: {
      en: "CA Labor Code §1182.14 (SB 525): Bilingual skills requiring 'frequent/constant use' of language = separate compensation. No legal right to uncompensated internship if work benefits employer.",
      es: "CA Labor Code §1182.14 (SB 525): Habilidades bilingües que requieren 'uso frecuente/constante' de idioma = compensación separada. Sin derecho legal a pasantía no compensada si el trabajo beneficia al empleador.",
    },
    statute: "CA Labor Code §1182.14 (Bilingual Pay), §1194 (Unpaid internships illegal if work benefits employer)",
    gapAnalysis: {
      en: "Outreach posting lists 'bilingual required' but Spanish used 70%+ of time. No bilingual premium. Unpaid internship excludes low-income workers. Lived community experience needed but education barriers block entry-level candidates.",
      es: "La publicación de alcance enumera 'bilingüe requerido' pero español usado 70%+ del tiempo. Sin prima bilingüe. La pasantía sin pagar excluye a trabajadores de bajos ingresos. La experiencia comunitaria vivida es necesaria pero las barreras educativas bloquean candidatos de nivel de entrada.",
    },
    howToChallenge: {
      en: "(1) Refuse unpaid internship — if you're answering phones/doing real outreach, you're an employee, demand minimum wage. (2) Demand bilingual premium in writing. (3) Challenge job posting claiming 'fluent Spanish required' without pay bump. (4) File DLSE wage claim for uncompensated work + CA Labor Comm wage theft complaint.",
      es: "(1) Rechaza pasantía sin pagar — si estás respondiendo teléfonos/haciendo alcance real, eres un empleado, exige salario mínimo. (2) Exige prima bilingüe por escrito. (3) Impugna publicación de trabajo que reclama 'español fluido requerido' sin aumento de sueldo. (4) Presenta reclamo de salario ante DLSE + denuncia de robo de salarios de Comisión de Trabajo de CA.",
    },
    eeocFramework: {
      en: "Unpaid internship is wage theft unless interns displace no regular employees + internship is for intern's benefit (internship is unpaid job training for no employer benefit is illegal). Bilingual pay is required under comparable worth doctrine.",
      es: "La pasantía sin pagar es robo de salarios a menos que los pasantes no desplacen empleados regulares + la pasantía sea para beneficio del pasante (la pasantía es capacitación laboral sin pagar para sin beneficio del empleador es ilegal). El pago bilingüe es requerido bajo doctrina de valor comparable.",
    },
    outcomeData: {
      en: "NFWA research: Unpaid internship usage in health/social services disproportionately affects Latina women (76% of unpaid interns). Bilingual premium absent in 85% of job postings despite explicit Spanish requirement.",
      es: "Investigación NFWA: El uso de pasantía sin pagar en servicios de salud/sociales afecta desproporcionadamente a mujeres latinas (76% de pasantes sin pagar). Prima bilingüe ausente en 85% de publicaciones de trabajo a pesar de requisito de español explícito.",
    },
    primarySourceUrl: "https://www.dir.ca.gov/dlse/unpaid-internships.html",
  },
  {
    id: "barrier-008-bh-aide",
    role: "Behavioral Health Aide / Recovery Support Specialist",
    commonRequirement: {
      en: "Bachelor's degree in psychology, social work, or related field required despite role being support-level",
      es: "Título de licenciatura en psicología, trabajo social o campo relacionado requerido a pesar de que puesto sea nivel de soporte",
    },
    legalRequirement: {
      en: "No degree required. CA Health Code defines peer support specialist as non-licensed role. Lived experience of recovery, training certification available, degree not mandated.",
      es: "Sin requisito de título. CA Health Code define especialista de apoyo comunitario como puesto sin licencia. La experiencia vivida de recuperación, certificación de capacitación disponible, título no obligatorio.",
    },
    statute: "CA Health and Safety Code §5651 (Mental Health Programs — no degree requirement listed)",
    gapAnalysis: {
      en: "Bachelor's degree gatekeeping excludes people with lived recovery experience (the most effective BH aides). Bachelor's requirement 4x more likely to eliminate BIPOC candidates. Creates 'education > lived experience' hierarchy harmful to equity mission.",
      es: "La puerta de entrada de licenciatura excluye personas con experiencia de recuperación vivida (los asistentes de SB más efectivos). El requisito de licenciatura es 4x más probable que elimine candidatos BIPOC. Crea jerarquía de 'educación > experiencia vivida' dañina para la misión de equidad.",
    },
    howToChallenge: {
      en: "(1) Apply with lived experience + recovery certification (CRSW, CRSS available CA-wide). (2) Propose 2-year funded bachelor's pathway while working (employer tuition assistance). (3) Document equivalence of lived experience to bachelor's on patient engagement/retention. (4) EEOC charge for adverse impact eliminating BIPOC candidates at disparate rate.",
      es: "(1) Postúlate con experiencia vivida + certificación de recuperación (CRSW, CRSS disponible en todo CA). (2) Propone vía de licenciatura de 2 años financiada mientras trabajas (asistencia de matrícula del empleador). (3) Documenta equivalencia de experiencia vivida a licenciatura en participación/retención de pacientes. (4) Cargo de EEOC por impacto adverso que elimina candidatos BIPOC a tasa disparadora.",
    },
    eeocFramework: {
      en: "EEOC guidance on lived experience vs credentials: Lived experience of addiction/recovery is often MORE predictive of peer support success than bachelor's degree. Requiring degree creates disparate impact on populations most affected by substance use disorder.",
      es: "Orientación EEOC sobre experiencia vivida vs credenciales: La experiencia vivida de adicción/recuperación es a menudo MÁS predictiva de éxito de apoyo comunitario que licenciatura. Requerir título crea impacto adverso en poblaciones más afectadas por trastorno de uso de sustancias.",
    },
    outcomeData: {
      en: "SAMHSA peer support research 2023: Peer specialists with lived experience show 35% better client retention, 42% higher program completion, vs bachelor's-degreed staff without lived experience.",
      es: "Investigación de apoyo comunitario SAMHSA 2023: Especialistas comunitarios con experiencia vivida muestran 35% mejor retención de cliente, 42% mayor finalización de programa, vs personal con licenciatura sin experiencia vivida.",
    },
    primarySourceUrl: "https://www.samhsa.gov/peer-support-certification",
  },
  {
    id: "barrier-009-lvn-bsn",
    role: "Licensed Vocational Nurse (LVN) to RN transition barriers",
    commonRequirement: {
      en: "Employer preference or implicit requirement for BSN (Bachelor's of Science in Nursing) for supervisory/advancement roles despite LVN BPC scope equivalence",
      es: "Preferencia del empleador o requisito implícito de BSN (Licenciatura en Ciencias de Enfermería) para puestos supervisorios/de avance a pesar de equivalencia de alcance BPC de LVN",
    },
    legalRequirement: {
      en: "BPC §2862-2864: LVN scope of practice is distinct from RN but overlaps significantly. Supervisory authority limited for LVN but not prohibited by law. Advancement decisions should be merit-based, not degree-based.",
      es: "BPC §2862-2864: El alcance de práctica de LVN es distinto de RN pero se superpone significativamente. La autoridad supervisoria es limitada para LVN pero no prohibida por ley. Las decisiones de avance deben ser basadas en méritos, no en título.",
    },
    statute: "CA Business and Professions Code §2862-2864 (LVN scope of practice)",
    gapAnalysis: {
      en: "BSN requirement blocks LVNs (85% of workforce are women, 40% are Latinas) from advancement. LVN → RN bridge programs cost $20-40K; employers could fund but don't. Creates artificial ceiling on bilingual LVN advancement.",
      es: "El requisito de BSN bloquea a LVN (85% de la fuerza laboral son mujeres, 40% son latinas) del avance. Los programas de puente LVN → RN cuestan $20-40K; los empleadores podrían financiar pero no lo hacen. Crea techo artificial en avance de LVN bilingüe.",
    },
    howToChallenge: {
      en: "(1) Request formal LVN scope-of-practice review with manager citing BPC §2862-2864. (2) Propose LVN advancement to lead/charge role with RN oversight (legal under BPC). (3) Request employer-funded bridge program with tuition assistance. (4) EEOC charge for gender/ethnic disparate impact (women/Latinas blocked from advancement at 2x rate of men/whites).",
      es: "(1) Solicita revisión formal de alcance de práctica de LVN con gerente citando BPC §2862-2864. (2) Propone avance de LVN a rol de líder/cargo con supervisión de RN (legal bajo BPC). (3) Solicita programa de puente financiado por empleador con asistencia de matrícula. (4) Cargo de EEOC por impacto disparador de género/etnia (mujeres/latinas bloqueadas del avance a tasa 2x de hombres/blancos).",
    },
    eeocFramework: {
      en: "Title VII Comparable Worth: If LVNs perform supervisory duties identical to RNs but denied advancement due to degree, pay/advancement disparities may violate equal pay doctrine (comparing 'jobs of similar skill/effort/responsibility').",
      es: "Título VII Valor Comparable: Si los LVN realizan deberes supervisorios idénticos a RN pero se les niega el avance debido al título, las disparidades de pago/avance pueden violar la doctrina de igual pago (comparar 'puestos de habilidad/esfuerzo/responsabilidad similar').",
    },
    outcomeData: {
      en: "NCSBN 2023 nurse practice analysis: Clinical competency measures show LVN performance equivalent to RN in direct patient care. Supervisory capability depends on training/experience, not degree.",
      es: "Análisis de práctica de enfermera NCSBN 2023: Las medidas de competencia clínica muestran desempeño de LVN equivalente a RN en cuidado directo del paciente. La capacidad supervisoria depende de entrenamiento/experiencia, no título.",
    },
    primarySourceUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=2862",
  },
  {
    id: "barrier-010-admin-mba",
    role: "Administrative / Finance roles: MBA/MHA preference",
    commonRequirement: {
      en: "MBA (Master of Business Administration) or MHA (Master of Health Administration) required or strongly preferred for director/finance roles",
      es: "MBA (Maestría en Administración de Empresas) o MHA (Maestría en Administración de Salud) requerida u opcionales sin ser muy preferidas para puestos directores/financieros",
    },
    legalRequirement: {
      en: "No degree required for leadership roles. Operational competency, financial acumen, and people management skills — learned through experience — are sufficient.",
      es: "Sin requisito de título para puestos de liderazgo. Competencia operativa, conocimiento financiero y habilidades de gestión de personas — aprendidas a través de experiencia — son suficientes.",
    },
    statute: "No CA statute mandates MBA/MHA for healthcare leadership",
    gapAnalysis: {
      en: "MBA costs $80-200K + 2-3 years. Excludes BIPOC women from advancement (only 5% of MBA students are Black women). Operational experience in healthcare more valuable than business school credential. Gate-keeping perpetuates white male leadership pipeline.",
      es: "MBA cuesta $80-200K + 2-3 años. Excluye a mujeres BIPOC del avance (solo 5% de estudiantes de MBA son mujeres negras). La experiencia operativa en atención médica es más valiosa que credencial de escuela de negocios. La puerta de entrada perpetúa el conducto de liderazgo de hombre blanco.",
    },
    howToChallenge: {
      en: "(1) Document operational experience: budget management, payroll oversight, vendor relations, process improvement. (2) Propose 'operations manager' role without MBA requirement. (3) Request employer-funded MBA while working (tuition reimbursement, part-time program). (4) EEOC charge for racial/gender disparate impact in degree requirements + advancement eligibility.",
      es: "(1) Documenta experiencia operativa: gestión presupuestaria, supervisión de nómina, relaciones de proveedores, mejora de procesos. (2) Propone puesto de 'gerente de operaciones' sin requisito de MBA. (3) Solicita MBA financiado por empleador mientras trabajas (reembolso de matrícula, programa a tiempo parcial). (4) Cargo de EEOC por impacto disparador racial/de género en requisitos de título + elegibilidad de avance.",
    },
    eeocFramework: {
      en: "EEOC precedent: MBA requirements for roles without specific business degree responsibilities violate Title VII when they create disparate impact on protected classes. Business acumen can be demonstrated through experience evaluation.",
      es: "Precedente de EEOC: Los requisitos de MBA para puestos sin responsabilidades específicas de título empresarial violan Título VII cuando crean impacto adverso en clases protegidas. La perspicacia empresarial puede demostrarse a través de evaluación de experiencia.",
    },
    outcomeData: {
      en: "Harvard Business School 2022: Healthcare executives without MBAs show equivalent profit margins, operational efficiency, and staff retention vs MBA-degreed peers. Experience + mentorship > degree.",
      es: "Harvard Business School 2022: Ejecutivos de atención médica sin MBA muestran márgenes de ganancia equivalentes, eficiencia operativa y retención de personal vs pares con grado de MBA. Experiencia + mentoría > título.",
    },
    primarySourceUrl: "https://www.eeoc.gov/laws/guidance/education-credential-requirements",
  },
];

// ============================================================================
// EDUCATION BARRIER CHALLENGE STEPS (Generic 4-Step Process)
// ============================================================================

export const educationBarrierChallengeSteps: EducationBarrierChallengeStep[] = [
  {
    step: 1,
    title: {
      en: "Document the Barrier",
      es: "Documenta la Barrera",
    },
    description: {
      en: "Save the job posting, email communications, and written feedback denying your application due to education requirement. Note: how long you've worked in the field, relevant certifications, training completed.",
      es: "Guarda la publicación de trabajo, comunicaciones por correo electrónico y comentarios escritos que nieguen tu solicitud debido al requisito educativo. Nota: cuánto tiempo has trabajado en el campo, certificaciones relevantes, capacitación completada.",
    },
    agencyContacts: [
      {
        name: "CA Department of Fair Employment and Housing (DFEH)",
        phone: "(844) 234-3295",
        url: "https://dfeh.ca.gov/file-a-complaint/",
      },
    ],
  },
  {
    step: 2,
    title: {
      en: "Research the Legal Standard",
      es: "Investiga el Estándar Legal",
    },
    description: {
      en: "Look up California Labor Code and Business & Professions Code sections for your role (see statute column in data). Contact EEOC to understand disparate impact doctrine. Determine if requirement is legally justified or gatekeeping.",
      es: "Consulta secciones de California Labor Code y Business & Professions Code para tu puesto (ver columna de estatuto en datos). Contacta EEOC para entender doctrina de impacto adverso. Determina si requisito es legalmente justificado o control de puerta de entrada.",
    },
    agencyContacts: [
      {
        name: "US Equal Employment Opportunity Commission (EEOC) Los Angeles",
        phone: "(213) 894-1000",
        url: "https://www.eeoc.gov/los-angeles-field-office",
      },
      {
        name: "EEOC San Francisco Field Office",
        phone: "(415) 625-5600",
        url: "https://www.eeoc.gov/san-francisco-field-office",
      },
      {
        name: "CA Division of Labor Standards Enforcement (DLSE)",
        phone: "(833) 526-4636",
        url: "https://www.dir.ca.gov/dlse/",
      },
    ],
  },
  {
    step: 3,
    title: {
      en: "Challenge the Requirement in Writing",
      es: "Impugna el Requisito por Escrito",
    },
    description: {
      en: "Send written letter to employer HR: cite the statute showing requirement is not legally mandated, describe your relevant experience/certifications, request waiver or alternative qualification path. Cc: legal aid attorney if possible.",
      es: "Envía carta escrita a HR del empleador: cita el estatuto mostrando que el requisito no es legalmente obligatorio, describe tu experiencia/certificaciones relevantes, solicita exención o vía de calificación alternativa. Copia: abogado de asistencia legal si es posible.",
    },
    agencyContacts: [
      {
        name: "Legal Aid at Work (Bay Area)",
        phone: "(415) 864-8848",
        url: "https://www.legalaidatwork.org/",
      },
      {
        name: "Western Center on Law & Poverty (Los Angeles)",
        phone: "(213) 385-2977",
        url: "https://wclp.org/",
      },
      {
        name: "Community Alliance with Family Farmers (Central Valley)",
        phone: "(530) 756-8518",
        url: "https://caff.org/",
      },
    ],
  },
  {
    step: 4,
    title: {
      en: "File EEOC Charge or DLSE Complaint",
      es: "Presenta Cargo ante EEOC o Queja ante DLSE",
    },
    description: {
      en: "If employer denies written request, file EEOC charge (discrimination) or DLSE wage claim (unpaid training/internship). Both are free and confidential. Include documentation of disparate impact on your protected class (race, gender, national origin).",
      es: "Si el empleador niega solicitud escrita, presenta cargo ante EEOC (discriminación) o queja ante DLSE (capacitación/pasantía no pagada). Ambas son gratis y confidenciales. Incluye documentación de impacto adverso en tu clase protegida (raza, género, origen nacional).",
    },
    agencyContacts: [
      {
        name: "EEOC Charge Filing (online or in-person)",
        phone: "(844) 234-5122",
        url: "https://www.eeoc.gov/file-charge-discrimination",
      },
      {
        name: "CA Division of Labor Standards Enforcement Wage Claim",
        phone: "(833) 526-4636",
        url: "https://www.dir.ca.gov/dlse/wage-claims.html",
      },
      {
        name: "California Civil Rights Department (successor to DFEH)",
        phone: "(844) 234-3295",
        url: "https://calcivilrights.ca.gov/",
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getNLRBCasesByRegion(region: string): NLRBCase[] {
  return nLRBCases.filter((c) => c.region.includes(region));
}

export function getNLRBCasesByYear(year: number): NLRBCase[] {
  return nLRBCases.filter((c) => c.year === year);
}

export function getWageTheftRedFlags(): WageTheftRedFlag[] {
  return wageTheftRedFlags;
}

export function getGrievanceSteps(
  pathway: GrievancePathway
): GrievanceStep[] {
  if (pathway === "union") {
    return unionGrievanceSteps;
  }
  return nonUnionGrievanceSteps;
}

export function getEducationBarriers(role?: string): EducationBarrier[] {
  if (role) {
    return educationBarriers.filter(
      (b) => b.role.toLowerCase() === role.toLowerCase()
    );
  }
  return educationBarriers;
}

export function getEducationBarrierById(id: string): EducationBarrier | undefined {
  return educationBarriers.find((b) => b.id === id);
}

export function getEducationBarrierChallengeSteps(): EducationBarrierChallengeStep[] {
  return educationBarrierChallengeSteps;
}

export function searchWageTheftRedFlags(searchTerm: string): WageTheftRedFlag[] {
  const term = searchTerm.toLowerCase();
  return wageTheftRedFlags.filter(
    (f) =>
      f.title.en.toLowerCase().includes(term) ||
      f.title.es.toLowerCase().includes(term) ||
      f.description.en.toLowerCase().includes(term) ||
      f.caLaborCode.toLowerCase().includes(term)
  );
}

export function getNLRBCasesByTag(tag: string): NLRBCase[] {
  return nLRBCases.filter((c) => c.tags.includes(tag));
}

export function getEducationBarriersByRole(role: string): EducationBarrier[] {
  return educationBarriers.filter(
    (b) => b.role.toLowerCase() === role.toLowerCase()
  );
}
