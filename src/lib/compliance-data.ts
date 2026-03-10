// compliance-data.ts
// 7-domain FQHC compliance framework with checklists, deadlines,
// policy templates, and training links
// Last updated: 2026-03-10

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

export interface BilingualText {
  en: string;
  es: string;
}

export type ComplianceDomainId =
  | "hipaa"
  | "osha"
  | "hrsa"
  | "billing"
  | "ehr"
  | "workforce"
  | "patient-rights";

export type ChecklistFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "annual";
export type DeadlineSeverity = "low" | "medium" | "high" | "critical";

export interface ComplianceDomain {
  id: ComplianceDomainId;
  title: BilingualText;
  shortTitle: BilingualText;
  description: BilingualText;
  icon: string; // Lucide icon name
  color: string; // Tailwind bg class
  textColor: string;
  borderColor: string;
  checklistItems: ChecklistItem[];
  policyTemplates: PolicyTemplate[];
  deadlines: RegulatoryDeadline[];
  trainingCourseId?: string; // Link to Academy course
  sourceUrls: string[];
}

export interface ChecklistItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  frequency: ChecklistFrequency;
  category: string;
  required: boolean; // Regulatory requirement vs best practice
  sourceRegulation?: string; // e.g., "45 CFR 164.308(a)(1)"
}

export interface PolicyTemplate {
  id: string;
  title: BilingualText;
  description: BilingualText;
  sections: PolicySection[];
  sourceRegulation?: string;
}

export interface PolicySection {
  heading: BilingualText;
  content: BilingualText; // Fill-in template text
  isEditable: boolean;
}

export interface RegulatoryDeadline {
  id: string;
  title: BilingualText;
  description: BilingualText;
  dueDate: string; // ISO date string or "recurring" description
  isRecurring: boolean;
  frequency?: ChecklistFrequency;
  severity: DeadlineSeverity;
  domain: ComplianceDomainId;
  sourceUrl?: string;
}

/* ================================================================== */
/*  HIPAA Domain                                                       */
/* ================================================================== */

const HIPAA_CHECKLISTS: ChecklistItem[] = [
  {
    id: "hipaa-risk-assessment",
    title: { en: "Complete annual HIPAA risk assessment", es: "Completar evaluación anual de riesgos HIPAA" },
    description: { en: "Conduct a thorough risk analysis of all systems that create, receive, maintain, or transmit ePHI. Document identified threats, vulnerabilities, and risk levels.", es: "Realizar un análisis completo de riesgos de todos los sistemas que crean, reciben, mantienen o transmiten ePHI. Documentar amenazas identificadas, vulnerabilidades y niveles de riesgo." },
    frequency: "annual",
    category: "Security",
    required: true,
    sourceRegulation: "45 CFR 164.308(a)(1)(ii)(A)",
  },
  {
    id: "hipaa-training",
    title: { en: "Complete staff HIPAA training", es: "Completar capacitación HIPAA del personal" },
    description: { en: "All workforce members must receive HIPAA training on privacy and security policies. New hires within 30 days, all staff annually.", es: "Todos los miembros del personal deben recibir capacitación HIPAA sobre políticas de privacidad y seguridad. Nuevos empleados dentro de 30 días, todo el personal anualmente." },
    frequency: "annual",
    category: "Training",
    required: true,
    sourceRegulation: "45 CFR 164.530(b)(1)",
  },
  {
    id: "hipaa-baa-review",
    title: { en: "Review Business Associate Agreements", es: "Revisar Acuerdos de Asociados de Negocio" },
    description: { en: "Verify all vendors with PHI access have current, signed BAAs. Update BAAs when services change.", es: "Verificar que todos los proveedores con acceso a PHI tengan BAAs vigentes y firmados. Actualizar BAAs cuando cambien los servicios." },
    frequency: "annual",
    category: "Legal",
    required: true,
    sourceRegulation: "45 CFR 164.502(e)",
  },
  {
    id: "hipaa-access-review",
    title: { en: "Review EHR access permissions", es: "Revisar permisos de acceso al EHR" },
    description: { en: "Audit user access levels in EHR, ensure minimum necessary access. Deactivate terminated employees immediately.", es: "Auditar niveles de acceso de usuarios en el EHR, asegurar acceso mínimo necesario. Desactivar empleados terminados inmediatamente." },
    frequency: "quarterly",
    category: "Security",
    required: true,
    sourceRegulation: "45 CFR 164.312(a)(1)",
  },
  {
    id: "hipaa-incident-log",
    title: { en: "Review security incident log", es: "Revisar registro de incidentes de seguridad" },
    description: { en: "Review and document all security incidents. Determine if any constitute a breach requiring notification.", es: "Revisar y documentar todos los incidentes de seguridad. Determinar si alguno constituye una violación que requiera notificación." },
    frequency: "monthly",
    category: "Security",
    required: true,
    sourceRegulation: "45 CFR 164.308(a)(6)(ii)",
  },
  {
    id: "hipaa-workstation-check",
    title: { en: "Check workstation security", es: "Verificar seguridad de estaciones de trabajo" },
    description: { en: "Verify screen locks, physical access controls, and that PHI is not visible to unauthorized persons.", es: "Verificar bloqueo de pantalla, controles de acceso físico, y que PHI no sea visible a personas no autorizadas." },
    frequency: "weekly",
    category: "Physical",
    required: true,
    sourceRegulation: "45 CFR 164.310(b)",
  },
  {
    id: "hipaa-logout-check",
    title: { en: "Verify auto-logout on EHR terminals", es: "Verificar cierre automático de sesión en terminales EHR" },
    description: { en: "Ensure all shared workstations have auto-logout enabled (15 min max idle time).", es: "Asegurar que todas las estaciones compartidas tengan cierre automático habilitado (máximo 15 min de inactividad)." },
    frequency: "daily",
    category: "Security",
    required: false,
  },
  {
    id: "hipaa-backup-verify",
    title: { en: "Verify ePHI backup completion", es: "Verificar finalización de respaldo de ePHI" },
    description: { en: "Confirm daily backup of electronic PHI completed successfully. Test recovery annually.", es: "Confirmar que el respaldo diario de PHI electrónico se completó exitosamente. Probar recuperación anualmente." },
    frequency: "daily",
    category: "Technical",
    required: true,
    sourceRegulation: "45 CFR 164.308(a)(7)(ii)(A)",
  },
];

const HIPAA_POLICIES: PolicyTemplate[] = [
  {
    id: "hipaa-baa-template",
    title: { en: "Business Associate Agreement (BAA)", es: "Acuerdo de Asociado de Negocio (BAA)" },
    description: { en: "Standard BAA template for vendors and partners who access, create, or maintain PHI.", es: "Plantilla estándar de BAA para proveedores y socios que acceden, crean o mantienen PHI." },
    sourceRegulation: "45 CFR 164.502(e)",
    sections: [
      {
        heading: { en: "Parties and Effective Date", es: "Partes y Fecha Efectiva" },
        content: { en: "This Business Associate Agreement (\"Agreement\") is entered into as of [DATE] between [COVERED ENTITY NAME] (\"Covered Entity\") and [BUSINESS ASSOCIATE NAME] (\"Business Associate\").", es: "Este Acuerdo de Asociado de Negocio (\"Acuerdo\") se celebra a partir del [FECHA] entre [NOMBRE DE ENTIDAD CUBIERTA] (\"Entidad Cubierta\") y [NOMBRE DEL ASOCIADO DE NEGOCIO] (\"Asociado de Negocio\")." },
        isEditable: true,
      },
      {
        heading: { en: "Obligations of Business Associate", es: "Obligaciones del Asociado de Negocio" },
        content: { en: "Business Associate agrees to: (a) Not use or disclose PHI except as permitted by this Agreement; (b) Use appropriate safeguards to prevent unauthorized use or disclosure; (c) Report any unauthorized use or disclosure within 24 hours; (d) Make PHI available for patient access requests within 30 days.", es: "El Asociado de Negocio acuerda: (a) No usar o divulgar PHI excepto según lo permitido por este Acuerdo; (b) Usar salvaguardas apropiadas para prevenir uso o divulgación no autorizados; (c) Reportar cualquier uso o divulgación no autorizado dentro de 24 horas; (d) Hacer PHI disponible para solicitudes de acceso del paciente dentro de 30 días." },
        isEditable: false,
      },
      {
        heading: { en: "Term and Termination", es: "Término y Terminación" },
        content: { en: "This Agreement shall be effective for [TERM LENGTH] and shall terminate when all PHI is destroyed or returned. Upon termination, Business Associate shall return or destroy all PHI within 30 days.", es: "Este Acuerdo será efectivo por [DURACIÓN DEL TÉRMINO] y terminará cuando toda la PHI sea destruida o devuelta. Al terminar, el Asociado de Negocio deberá devolver o destruir toda la PHI dentro de 30 días." },
        isEditable: true,
      },
    ],
  },
  {
    id: "hipaa-breach-notification",
    title: { en: "Breach Notification Policy", es: "Política de Notificación de Violaciones" },
    description: { en: "Outlines the process for identifying, reporting, and responding to breaches of unsecured PHI.", es: "Describe el proceso para identificar, reportar y responder a violaciones de PHI no asegurado." },
    sourceRegulation: "45 CFR 164.400-414",
    sections: [
      {
        heading: { en: "Purpose", es: "Propósito" },
        content: { en: "[ORGANIZATION NAME] is committed to protecting the privacy and security of Protected Health Information (PHI). This policy establishes procedures for responding to breaches of unsecured PHI as required by the HITECH Act.", es: "[NOMBRE DE LA ORGANIZACIÓN] está comprometida con la protección de la privacidad y seguridad de la Información de Salud Protegida (PHI). Esta política establece procedimientos para responder a violaciones de PHI no asegurado según lo requerido por la Ley HITECH." },
        isEditable: true,
      },
      {
        heading: { en: "Breach Assessment", es: "Evaluación de la Violación" },
        content: { en: "Upon discovery of a potential breach, a risk assessment shall be conducted within 24 hours evaluating: (1) Nature and extent of PHI involved; (2) Unauthorized person who used or received PHI; (3) Whether PHI was actually acquired or viewed; (4) Extent to which risk has been mitigated.", es: "Al descubrir una posible violación, se realizará una evaluación de riesgos dentro de 24 horas evaluando: (1) Naturaleza y alcance de la PHI involucrada; (2) Persona no autorizada que usó o recibió la PHI; (3) Si la PHI fue realmente adquirida o vista; (4) Grado en que el riesgo ha sido mitigado." },
        isEditable: false,
      },
      {
        heading: { en: "Notification Requirements", es: "Requisitos de Notificación" },
        content: { en: "Individual notification: Within 60 days of discovery. HHS notification: Within 60 days if 500+ individuals affected; annual log if fewer than 500. Media notification: Required if 500+ individuals in a single state/jurisdiction are affected.", es: "Notificación individual: Dentro de 60 días del descubrimiento. Notificación HHS: Dentro de 60 días si 500+ individuos afectados; registro anual si menos de 500. Notificación a medios: Requerida si 500+ individuos en un solo estado/jurisdicción son afectados." },
        isEditable: false,
      },
    ],
  },
];

/* ================================================================== */
/*  OSHA Domain                                                        */
/* ================================================================== */

const OSHA_CHECKLISTS: ChecklistItem[] = [
  {
    id: "osha-sharps-log",
    title: { en: "Maintain sharps injury log", es: "Mantener registro de lesiones por objetos punzocortantes" },
    description: { en: "Record all sharps injuries including type of device, department, and how injury occurred.", es: "Registrar todas las lesiones por objetos punzocortantes incluyendo tipo de dispositivo, departamento y cómo ocurrió la lesión." },
    frequency: "daily",
    category: "Bloodborne Pathogens",
    required: true,
    sourceRegulation: "29 CFR 1910.1030(h)(5)",
  },
  {
    id: "osha-bbp-training",
    title: { en: "Annual Bloodborne Pathogens training", es: "Capacitación anual de Patógenos Transmitidos por Sangre" },
    description: { en: "All employees with occupational exposure must receive annual training on BBP standards, exposure control plan, and post-exposure procedures.", es: "Todos los empleados con exposición ocupacional deben recibir capacitación anual sobre estándares de BBP, plan de control de exposición y procedimientos post-exposición." },
    frequency: "annual",
    category: "Bloodborne Pathogens",
    required: true,
    sourceRegulation: "29 CFR 1910.1030(g)(2)",
  },
  {
    id: "osha-exposure-plan",
    title: { en: "Review Exposure Control Plan", es: "Revisar Plan de Control de Exposición" },
    description: { en: "Annual review and update of the Exposure Control Plan to reflect new tasks, procedures, and positions with occupational exposure.", es: "Revisión y actualización anual del Plan de Control de Exposición para reflejar nuevas tareas, procedimientos y posiciones con exposición ocupacional." },
    frequency: "annual",
    category: "Bloodborne Pathogens",
    required: true,
    sourceRegulation: "29 CFR 1910.1030(c)(1)(iv)",
  },
  {
    id: "osha-eyewash-test",
    title: { en: "Test eyewash stations", es: "Probar estaciones de lavado de ojos" },
    description: { en: "Activate and test all emergency eyewash stations and safety showers. Check flow and water temperature.", es: "Activar y probar todas las estaciones de lavado de ojos de emergencia y duchas de seguridad. Verificar flujo y temperatura del agua." },
    frequency: "weekly",
    category: "Emergency Equipment",
    required: true,
    sourceRegulation: "ANSI Z358.1",
  },
  {
    id: "osha-fire-extinguisher",
    title: { en: "Inspect fire extinguishers", es: "Inspeccionar extintores de incendios" },
    description: { en: "Visual inspection of all fire extinguishers: check pressure gauge, inspect for damage, verify accessibility.", es: "Inspección visual de todos los extintores: verificar manómetro, inspeccionar daños, verificar accesibilidad." },
    frequency: "monthly",
    category: "Fire Safety",
    required: true,
    sourceRegulation: "29 CFR 1910.157(e)(2)",
  },
  {
    id: "osha-hazcom-sds",
    title: { en: "Update Safety Data Sheets (SDS)", es: "Actualizar Hojas de Datos de Seguridad (SDS)" },
    description: { en: "Ensure current SDS are available for all hazardous chemicals in the workplace. Update when new chemicals are introduced.", es: "Asegurar que las SDS actuales estén disponibles para todos los químicos peligrosos en el lugar de trabajo. Actualizar cuando se introduzcan nuevos químicos." },
    frequency: "quarterly",
    category: "HazCom",
    required: true,
    sourceRegulation: "29 CFR 1910.1200(g)",
  },
  {
    id: "osha-emergency-drill",
    title: { en: "Conduct emergency evacuation drill", es: "Realizar simulacro de evacuación de emergencia" },
    description: { en: "Practice evacuation procedures, verify all staff know routes and assembly points. Include after-hours drill annually.", es: "Practicar procedimientos de evacuación, verificar que todo el personal conozca rutas y puntos de reunión. Incluir simulacro fuera de horario anualmente." },
    frequency: "quarterly",
    category: "Emergency Preparedness",
    required: true,
    sourceRegulation: "29 CFR 1910.38",
  },
  {
    id: "osha-300-log",
    title: { en: "Maintain OSHA 300 Log", es: "Mantener Registro OSHA 300" },
    description: { en: "Record all recordable workplace injuries and illnesses. Post OSHA 300A summary February 1-April 30 annually.", es: "Registrar todas las lesiones y enfermedades laborales registrables. Publicar resumen OSHA 300A del 1 de febrero al 30 de abril anualmente." },
    frequency: "annual",
    category: "Record Keeping",
    required: true,
    sourceRegulation: "29 CFR 1904",
  },
];

const OSHA_POLICIES: PolicyTemplate[] = [
  {
    id: "osha-ecp-template",
    title: { en: "Exposure Control Plan", es: "Plan de Control de Exposición" },
    description: { en: "Required bloodborne pathogens exposure control plan for healthcare facilities.", es: "Plan de control de exposición a patógenos transmitidos por sangre requerido para instalaciones de salud." },
    sourceRegulation: "29 CFR 1910.1030(c)",
    sections: [
      {
        heading: { en: "Exposure Determination", es: "Determinación de Exposición" },
        content: { en: "The following job classifications at [ORGANIZATION NAME] have occupational exposure to blood or other potentially infectious materials:\n\nCategory I (routine exposure): Physicians, NPs, PAs, RNs, MAs, Dental staff, Lab technicians\nCategory II (possible exposure): Housekeeping, Maintenance, Front Desk (rare)\nCategory III (no exposure): Administrative, IT (remote)", es: "Las siguientes clasificaciones de trabajo en [NOMBRE DE LA ORGANIZACIÓN] tienen exposición ocupacional a sangre u otros materiales potencialmente infecciosos:\n\nCategoría I (exposición rutinaria): Médicos, NPs, PAs, RNs, MAs, Personal dental, Técnicos de laboratorio\nCategoría II (posible exposición): Limpieza, Mantenimiento, Recepción (raro)\nCategoría III (sin exposición): Administrativo, TI (remoto)" },
        isEditable: true,
      },
      {
        heading: { en: "Methods of Compliance", es: "Métodos de Cumplimiento" },
        content: { en: "Universal Precautions shall be observed. Engineering controls include: needleless systems, self-sheathing needles, sharps containers at point of use, biohazard bags, and handwashing facilities. PPE provided at no cost: gloves, gowns, face shields, eye protection, and N95 respirators.", es: "Se observarán Precauciones Universales. Los controles de ingeniería incluyen: sistemas sin aguja, agujas auto-retráctiles, contenedores de punzocortantes en punto de uso, bolsas de riesgo biológico e instalaciones de lavado de manos. EPP proporcionado sin costo: guantes, batas, protectores faciales, protección ocular y respiradores N95." },
        isEditable: false,
      },
    ],
  },
];

/* ================================================================== */
/*  HRSA Domain                                                        */
/* ================================================================== */

const HRSA_CHECKLISTS: ChecklistItem[] = [
  {
    id: "hrsa-uds-data",
    title: { en: "Prepare UDS data submission", es: "Preparar envío de datos UDS" },
    description: { en: "Compile Uniform Data System report covering patients served, services provided, clinical quality measures, and financial data.", es: "Compilar informe del Sistema Uniforme de Datos cubriendo pacientes atendidos, servicios proporcionados, medidas de calidad clínica y datos financieros." },
    frequency: "annual",
    category: "Reporting",
    required: true,
    sourceRegulation: "Section 330 of the PHS Act",
  },
  {
    id: "hrsa-sliding-fee",
    title: { en: "Verify sliding fee discount program", es: "Verificar programa de descuento por escala móvil" },
    description: { en: "Ensure sliding fee schedule is current, posted, and applied correctly. Patients at or below 100% FPL must not be charged. Review FPL guidelines after annual update.", es: "Asegurar que la escala de tarifas esté actualizada, publicada y aplicada correctamente. Pacientes al 100% FPL o menos no deben ser cobrados. Revisar guías FPL después de la actualización anual." },
    frequency: "annual",
    category: "Access",
    required: true,
    sourceRegulation: "HRSA PIN 2014-02",
  },
  {
    id: "hrsa-board-meeting",
    title: { en: "Hold Board of Directors meeting", es: "Realizar reunión de Junta Directiva" },
    description: { en: "Board must meet at least monthly. Majority must be patients (51%+). Review financials, quality metrics, and strategic goals.", es: "La Junta debe reunirse al menos mensualmente. La mayoría deben ser pacientes (51%+). Revisar finanzas, métricas de calidad y metas estratégicas." },
    frequency: "monthly",
    category: "Governance",
    required: true,
    sourceRegulation: "Section 330(k)(3)(H)",
  },
  {
    id: "hrsa-scope-verify",
    title: { en: "Verify scope of project compliance", es: "Verificar cumplimiento del alcance del proyecto" },
    description: { en: "Ensure all services listed in the HRSA scope of project are being provided. Report any changes via EHB scope change request.", es: "Asegurar que todos los servicios listados en el alcance del proyecto HRSA se estén proporcionando. Reportar cualquier cambio mediante solicitud de cambio de alcance en EHB." },
    frequency: "quarterly",
    category: "Scope",
    required: true,
    sourceRegulation: "Section 330(a)",
  },
  {
    id: "hrsa-credentialing",
    title: { en: "Review provider credentialing files", es: "Revisar archivos de credenciales de proveedores" },
    description: { en: "Verify all licensed providers have current credentialing and privileging. Re-credentialing every 2 years minimum.", es: "Verificar que todos los proveedores licenciados tengan credenciales y privilegios vigentes. Re-credenciamiento cada 2 años mínimo." },
    frequency: "quarterly",
    category: "Workforce",
    required: true,
    sourceRegulation: "HRSA Compliance Manual Chapter 5",
  },
  {
    id: "hrsa-340b-compliance",
    title: { en: "Audit 340B drug pricing compliance", es: "Auditar cumplimiento de precios de medicamentos 340B" },
    description: { en: "Verify 340B eligible patients, prevent duplicate discounts, review contract pharmacy agreements. Ensure no diversion to ineligible patients.", es: "Verificar pacientes elegibles 340B, prevenir descuentos duplicados, revisar acuerdos de farmacias contratadas. Asegurar no desvío a pacientes no elegibles." },
    frequency: "quarterly",
    category: "Pharmacy",
    required: true,
    sourceRegulation: "Section 340B of the PHS Act",
  },
  {
    id: "hrsa-chqr-review",
    title: { en: "Review CHQR clinical quality measures", es: "Revisar medidas de calidad clínica CHQR" },
    description: { en: "Track performance on Clinical Health Quality Recognition measures: diabetes control, hypertension, depression screening, cervical cancer screening, etc.", es: "Seguir el desempeño en medidas de Reconocimiento de Calidad Clínica: control de diabetes, hipertensión, detección de depresión, detección de cáncer cervical, etc." },
    frequency: "monthly",
    category: "Quality",
    required: false,
  },
];

const HRSA_POLICIES: PolicyTemplate[] = [
  {
    id: "hrsa-conflict-interest",
    title: { en: "Board Conflict of Interest Policy", es: "Política de Conflicto de Intereses de la Junta" },
    description: { en: "Required policy for governing board members to disclose and manage conflicts of interest.", es: "Política requerida para que los miembros de la junta directiva divulguen y manejen conflictos de intereses." },
    sourceRegulation: "HRSA Compliance Manual Chapter 19",
    sections: [
      {
        heading: { en: "Purpose", es: "Propósito" },
        content: { en: "[ORGANIZATION NAME] board members, officers, and key employees must disclose any actual or potential conflicts of interest that could affect their ability to act in the best interest of the health center.", es: "Los miembros de la junta, oficiales y empleados clave de [NOMBRE DE LA ORGANIZACIÓN] deben divulgar cualquier conflicto de intereses real o potencial que pueda afectar su capacidad de actuar en el mejor interés del centro de salud." },
        isEditable: true,
      },
      {
        heading: { en: "Annual Disclosure", es: "Divulgación Anual" },
        content: { en: "All board members shall complete a Conflict of Interest Disclosure Statement annually and upon any material change in circumstances. Disclosures shall be reviewed by the Board and documented in meeting minutes.", es: "Todos los miembros de la junta completarán una Declaración de Divulgación de Conflicto de Intereses anualmente y ante cualquier cambio material en las circunstancias. Las divulgaciones serán revisadas por la Junta y documentadas en las actas de reunión." },
        isEditable: false,
      },
    ],
  },
];

/* ================================================================== */
/*  Billing Compliance Domain                                          */
/* ================================================================== */

const BILLING_CHECKLISTS: ChecklistItem[] = [
  {
    id: "billing-encounter-audit",
    title: { en: "Audit encounter documentation", es: "Auditar documentación de encuentros" },
    description: { en: "Review sample of patient encounters to ensure proper documentation supports billing. Verify face-to-face requirement for PPS encounters.", es: "Revisar muestra de encuentros de pacientes para asegurar que la documentación apropiada respalde la facturación. Verificar requisito de cara a cara para encuentros PPS." },
    frequency: "monthly",
    category: "Documentation",
    required: true,
    sourceRegulation: "42 CFR 405.2463",
  },
  {
    id: "billing-same-day-review",
    title: { en: "Review same-day billing compliance", es: "Revisar cumplimiento de facturación mismo día" },
    description: { en: "Verify same-day dental and BH visits are billed correctly. Dental: both PPS billable. BH under Medi-Cal: only 1 PPS unless APM enrolled.", es: "Verificar que visitas dentales y BH del mismo día se facturen correctamente. Dental: ambos PPS facturables. BH bajo Medi-Cal: solo 1 PPS a menos que esté inscrito en APM." },
    frequency: "weekly",
    category: "Billing Rules",
    required: true,
    sourceRegulation: "WIC §14132.100",
  },
  {
    id: "billing-denial-tracking",
    title: { en: "Track and appeal claim denials", es: "Seguir y apelar denegaciones de reclamos" },
    description: { en: "Monitor denial rates by payer and reason code. Appeal all inappropriate denials within timely filing deadlines.", es: "Monitorear tasas de denegación por pagador y código de razón. Apelar todas las denegaciones inapropiadas dentro de los plazos de presentación oportuna." },
    frequency: "weekly",
    category: "Revenue Cycle",
    required: false,
  },
  {
    id: "billing-coding-update",
    title: { en: "Review coding updates (CPT/ICD-10)", es: "Revisar actualizaciones de codificación (CPT/ICD-10)" },
    description: { en: "Stay current on annual CPT code changes (January 1) and ICD-10 updates (October 1). Train coders on relevant changes.", es: "Mantenerse actualizado sobre cambios anuales de códigos CPT (1 de enero) y actualizaciones ICD-10 (1 de octubre). Capacitar codificadores sobre cambios relevantes." },
    frequency: "annual",
    category: "Coding",
    required: true,
  },
  {
    id: "billing-fca-training",
    title: { en: "False Claims Act training", es: "Capacitación sobre Ley de Reclamos Falsos" },
    description: { en: "Annual training for all billing staff on False Claims Act, Anti-Kickback Statute, and Stark Law requirements.", es: "Capacitación anual para todo el personal de facturación sobre la Ley de Reclamos Falsos, Estatuto Anti-Soborno y requisitos de la Ley Stark." },
    frequency: "annual",
    category: "Training",
    required: true,
    sourceRegulation: "31 USC 3729-3733",
  },
  {
    id: "billing-charge-capture",
    title: { en: "Verify charge capture completeness", es: "Verificar completitud de captura de cargos" },
    description: { en: "Compare scheduled appointments to billed encounters. Investigate gaps — missing charges are lost revenue.", es: "Comparar citas programadas con encuentros facturados. Investigar brechas — cargos faltantes son ingresos perdidos." },
    frequency: "daily",
    category: "Revenue Cycle",
    required: false,
  },
];

const BILLING_POLICIES: PolicyTemplate[] = [
  {
    id: "billing-compliance-plan",
    title: { en: "Billing Compliance Plan", es: "Plan de Cumplimiento de Facturación" },
    description: { en: "Comprehensive compliance program for billing and coding operations.", es: "Programa integral de cumplimiento para operaciones de facturación y codificación." },
    sourceRegulation: "OIG Compliance Program Guidance",
    sections: [
      {
        heading: { en: "Compliance Officer", es: "Oficial de Cumplimiento" },
        content: { en: "[OFFICER NAME] serves as the Compliance Officer for [ORGANIZATION NAME], reporting directly to the CEO and Board. The Compliance Officer is responsible for developing, implementing, and monitoring the compliance program.", es: "[NOMBRE DEL OFICIAL] sirve como Oficial de Cumplimiento para [NOMBRE DE LA ORGANIZACIÓN], reportando directamente al CEO y la Junta. El Oficial de Cumplimiento es responsable de desarrollar, implementar y monitorear el programa de cumplimiento." },
        isEditable: true,
      },
      {
        heading: { en: "Reporting Mechanism", es: "Mecanismo de Reporte" },
        content: { en: "An anonymous compliance hotline is available at [PHONE NUMBER]. All reports will be investigated within 30 days. No retaliation against good-faith reporters.", es: "Una línea de cumplimiento anónima está disponible al [NÚMERO DE TELÉFONO]. Todos los reportes serán investigados dentro de 30 días. Sin represalias contra reportantes de buena fe." },
        isEditable: true,
      },
    ],
  },
];

/* ================================================================== */
/*  EHR Documentation Domain                                           */
/* ================================================================== */

const EHR_CHECKLISTS: ChecklistItem[] = [
  {
    id: "ehr-note-completion",
    title: { en: "Check chart note completion rates", es: "Verificar tasas de finalización de notas clínicas" },
    description: { en: "Monitor open chart notes. All encounter notes should be completed within 72 hours. Flag overdue notes for provider follow-up.", es: "Monitorear notas clínicas abiertas. Todas las notas de encuentro deben completarse dentro de 72 horas. Marcar notas vencidas para seguimiento del proveedor." },
    frequency: "daily",
    category: "Documentation",
    required: true,
  },
  {
    id: "ehr-template-review",
    title: { en: "Review EHR documentation templates", es: "Revisar plantillas de documentación del EHR" },
    description: { en: "Ensure templates capture required data elements for billing and quality reporting. Update for new UDS measures.", es: "Asegurar que las plantillas capturen elementos de datos requeridos para facturación y reportes de calidad. Actualizar para nuevas medidas UDS." },
    frequency: "quarterly",
    category: "Configuration",
    required: false,
  },
  {
    id: "ehr-immunization-registry",
    title: { en: "Verify immunization registry reporting", es: "Verificar reporte al registro de inmunizaciones" },
    description: { en: "Confirm bi-directional data exchange with state immunization registry (CAIR2 in California).", es: "Confirmar intercambio bidireccional de datos con registro estatal de inmunizaciones (CAIR2 en California)." },
    frequency: "monthly",
    category: "Interoperability",
    required: true,
  },
  {
    id: "ehr-consent-forms",
    title: { en: "Audit informed consent documentation", es: "Auditar documentación de consentimiento informado" },
    description: { en: "Verify signed consent forms are scanned and linked to patient records. Check for annual updates.", es: "Verificar que formularios de consentimiento firmados estén escaneados y vinculados a registros de pacientes. Verificar actualizaciones anuales." },
    frequency: "quarterly",
    category: "Documentation",
    required: true,
  },
];

/* ================================================================== */
/*  Workforce Compliance Domain                                        */
/* ================================================================== */

const WORKFORCE_CHECKLISTS: ChecklistItem[] = [
  {
    id: "wf-license-verify",
    title: { en: "Verify active professional licenses", es: "Verificar licencias profesionales activas" },
    description: { en: "Check all clinical staff licenses are current through state licensing board. Track expiration dates 90 days in advance.", es: "Verificar que todas las licencias del personal clínico estén vigentes a través de la junta de licencias estatal. Seguir fechas de vencimiento con 90 días de anticipación." },
    frequency: "monthly",
    category: "Credentialing",
    required: true,
  },
  {
    id: "wf-sb525-compliance",
    title: { en: "Verify SB 525 minimum wage compliance", es: "Verificar cumplimiento de salario mínimo SB 525" },
    description: { en: "Ensure all healthcare workers meet California SB 525 minimum wage requirements ($25/hr as of June 2024). Track scheduled increases.", es: "Asegurar que todos los trabajadores de salud cumplan los requisitos de salario mínimo SB 525 de California ($25/hr desde junio 2024). Seguir aumentos programados." },
    frequency: "quarterly",
    category: "Compensation",
    required: true,
    sourceRegulation: "CA SB 525",
  },
  {
    id: "wf-background-check",
    title: { en: "Complete background checks for new hires", es: "Completar verificaciones de antecedentes para nuevos empleados" },
    description: { en: "All new hires must pass criminal background check and OIG/SAM exclusion screening before start date.", es: "Todos los nuevos empleados deben pasar verificación de antecedentes penales y evaluación de exclusión OIG/SAM antes de la fecha de inicio." },
    frequency: "monthly",
    category: "Hiring",
    required: true,
  },
  {
    id: "wf-oig-exclusion",
    title: { en: "Screen OIG/SAM exclusion lists", es: "Verificar listas de exclusión OIG/SAM" },
    description: { en: "Monthly check of all employees and contractors against OIG LEIE and SAM exclusion databases. Document results.", es: "Verificación mensual de todos los empleados y contratistas contra bases de datos de exclusión OIG LEIE y SAM. Documentar resultados." },
    frequency: "monthly",
    category: "Exclusion Screening",
    required: true,
    sourceRegulation: "42 CFR 1001",
  },
  {
    id: "wf-harassment-training",
    title: { en: "Complete harassment prevention training", es: "Completar capacitación de prevención de acoso" },
    description: { en: "California requires 2 hours for supervisors, 1 hour for non-supervisory employees. Must be completed within 6 months of hire and every 2 years.", es: "California requiere 2 horas para supervisores, 1 hora para empleados no supervisores. Debe completarse dentro de 6 meses de contratación y cada 2 años." },
    frequency: "annual",
    category: "Training",
    required: true,
    sourceRegulation: "CA SB 1343",
  },
  {
    id: "wf-i9-audit",
    title: { en: "Audit I-9 employment verification forms", es: "Auditar formularios de verificación de empleo I-9" },
    description: { en: "Review I-9 forms for completeness. Re-verify work authorization for employees with expiring documents.", es: "Revisar formularios I-9 para completitud. Re-verificar autorización de trabajo para empleados con documentos por vencer." },
    frequency: "annual",
    category: "Documentation",
    required: true,
    sourceRegulation: "8 CFR 274a.2",
  },
];

/* ================================================================== */
/*  Patient Rights Domain                                              */
/* ================================================================== */

const PATIENT_RIGHTS_CHECKLISTS: ChecklistItem[] = [
  {
    id: "pr-npp-posting",
    title: { en: "Verify Notice of Privacy Practices posted", es: "Verificar que el Aviso de Prácticas de Privacidad esté publicado" },
    description: { en: "Ensure current NPP is posted in waiting areas, available in all languages served, and provided to new patients.", es: "Asegurar que el NPP actual esté publicado en áreas de espera, disponible en todos los idiomas atendidos y proporcionado a nuevos pacientes." },
    frequency: "quarterly",
    category: "Privacy",
    required: true,
    sourceRegulation: "45 CFR 164.520",
  },
  {
    id: "pr-grievance-process",
    title: { en: "Review patient grievance process", es: "Revisar proceso de quejas de pacientes" },
    description: { en: "Ensure grievance forms are available, process is posted visibly, and all complaints are responded to within 7 business days.", es: "Asegurar que formularios de quejas estén disponibles, el proceso esté publicado visiblemente y todas las quejas sean respondidas dentro de 7 días hábiles." },
    frequency: "monthly",
    category: "Grievances",
    required: true,
  },
  {
    id: "pr-language-access",
    title: { en: "Verify language access services", es: "Verificar servicios de acceso lingüístico" },
    description: { en: "Confirm interpreter services available for LEP patients. Verify signage in threshold languages. Test phone interpreter service.", es: "Confirmar que servicios de interpretación estén disponibles para pacientes LEP. Verificar señalización en idiomas de umbral. Probar servicio de intérprete telefónico." },
    frequency: "quarterly",
    category: "Access",
    required: true,
    sourceRegulation: "Title VI, Civil Rights Act",
  },
  {
    id: "pr-patient-satisfaction",
    title: { en: "Review patient satisfaction surveys", es: "Revisar encuestas de satisfacción del paciente" },
    description: { en: "Analyze patient satisfaction data, identify trends, and implement improvement plans for low-scoring areas.", es: "Analizar datos de satisfacción del paciente, identificar tendencias e implementar planes de mejora para áreas de baja puntuación." },
    frequency: "quarterly",
    category: "Quality",
    required: false,
  },
  {
    id: "pr-ada-compliance",
    title: { en: "Verify ADA physical accessibility", es: "Verificar accesibilidad física ADA" },
    description: { en: "Inspect facility for ADA compliance: wheelchair access, signage, bathroom facilities, parking spaces.", es: "Inspeccionar instalación para cumplimiento ADA: acceso para sillas de ruedas, señalización, instalaciones de baño, espacios de estacionamiento." },
    frequency: "annual",
    category: "Accessibility",
    required: true,
    sourceRegulation: "42 USC 12101",
  },
];

/* ================================================================== */
/*  Regulatory Deadlines                                               */
/* ================================================================== */

export const REGULATORY_DEADLINES: RegulatoryDeadline[] = [
  {
    id: "uds-submission",
    title: { en: "UDS Report Submission", es: "Envío de Informe UDS" },
    description: { en: "Annual Uniform Data System report due to HRSA via Electronic Handbook (EHB).", es: "Informe anual del Sistema Uniforme de Datos a HRSA vía Manual Electrónico (EHB)." },
    dueDate: "2027-02-15",
    isRecurring: true,
    frequency: "annual",
    severity: "critical",
    domain: "hrsa",
    sourceUrl: "https://bphc.hrsa.gov/data-reporting",
  },
  {
    id: "osha-300a-posting",
    title: { en: "OSHA 300A Summary Posting", es: "Publicación de Resumen OSHA 300A" },
    description: { en: "Post OSHA Form 300A summary of injuries/illnesses from February 1 through April 30.", es: "Publicar resumen de lesiones/enfermedades del Formulario OSHA 300A del 1 de febrero al 30 de abril." },
    dueDate: "2027-02-01",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "osha",
  },
  {
    id: "osha-300a-removal",
    title: { en: "OSHA 300A Summary Removal", es: "Retiro de Resumen OSHA 300A" },
    description: { en: "OSHA 300A summary can be removed after April 30.", es: "El resumen OSHA 300A puede ser retirado después del 30 de abril." },
    dueDate: "2027-04-30",
    isRecurring: true,
    frequency: "annual",
    severity: "medium",
    domain: "osha",
  },
  {
    id: "hrsa-nncc",
    title: { en: "HRSA Non-Competing Continuation (NCC)", es: "Continuación No Competitiva HRSA (NCC)" },
    description: { en: "Annual Non-Competing Continuation application due 120 days before budget period end.", es: "Solicitud anual de Continuación No Competitiva con 120 días antes del fin del período presupuestario." },
    dueDate: "2027-01-01",
    isRecurring: true,
    frequency: "annual",
    severity: "critical",
    domain: "hrsa",
  },
  {
    id: "icd10-update",
    title: { en: "ICD-10-CM Code Updates Effective", es: "Actualizaciones de Códigos ICD-10-CM Vigentes" },
    description: { en: "New ICD-10-CM codes take effect October 1 each year. Update EHR and billing systems.", es: "Nuevos códigos ICD-10-CM entran en vigor el 1 de octubre cada año. Actualizar EHR y sistemas de facturación." },
    dueDate: "2026-10-01",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "billing",
  },
  {
    id: "cpt-update",
    title: { en: "CPT Code Updates Effective", es: "Actualizaciones de Códigos CPT Vigentes" },
    description: { en: "New CPT codes take effect January 1 each year. Update billing systems and train coders.", es: "Nuevos códigos CPT entran en vigor el 1 de enero cada año. Actualizar sistemas de facturación y capacitar codificadores." },
    dueDate: "2027-01-01",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "billing",
  },
  {
    id: "fpl-update",
    title: { en: "Federal Poverty Level Guidelines Update", es: "Actualización de Guías de Nivel Federal de Pobreza" },
    description: { en: "Update sliding fee schedule after new FPL guidelines published (typically late January). Grace period usually 60-90 days.", es: "Actualizar escala de tarifas después de publicación de nuevas guías FPL (típicamente a finales de enero). Período de gracia usualmente 60-90 días." },
    dueDate: "2027-01-25",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "hrsa",
  },
  {
    id: "ca-harassment-deadline",
    title: { en: "CA Sexual Harassment Training Deadline", es: "Fecha Límite de Capacitación de Acoso Sexual CA" },
    description: { en: "All California employees must complete sexual harassment prevention training every 2 years (SB 1343).", es: "Todos los empleados de California deben completar capacitación de prevención de acoso sexual cada 2 años (SB 1343)." },
    dueDate: "2027-01-01",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "workforce",
    sourceUrl: "https://www.dfeh.ca.gov/shpt/",
  },
  {
    id: "sb525-wage-increase",
    title: { en: "SB 525 Minimum Wage Increase", es: "Aumento de Salario Mínimo SB 525" },
    description: { en: "Track scheduled SB 525 healthcare worker minimum wage increases. Verify all staff meet new minimum.", es: "Seguir aumentos programados de salario mínimo SB 525 para trabajadores de salud. Verificar que todo el personal cumpla el nuevo mínimo." },
    dueDate: "2026-06-01",
    isRecurring: true,
    frequency: "annual",
    severity: "critical",
    domain: "workforce",
  },
  {
    id: "hipaa-risk-assessment-due",
    title: { en: "Annual HIPAA Risk Assessment", es: "Evaluación Anual de Riesgos HIPAA" },
    description: { en: "Complete comprehensive security risk assessment of all ePHI systems. Required annually, best done Q1.", es: "Completar evaluación integral de riesgos de seguridad de todos los sistemas ePHI. Requerido anualmente, mejor en Q1." },
    dueDate: "2027-03-31",
    isRecurring: true,
    frequency: "annual",
    severity: "high",
    domain: "hipaa",
  },
];

/* ================================================================== */
/*  Domain Assembly                                                    */
/* ================================================================== */

export const COMPLIANCE_DOMAINS: ComplianceDomain[] = [
  {
    id: "hipaa",
    title: { en: "HIPAA Privacy & Security", es: "Privacidad y Seguridad HIPAA" },
    shortTitle: { en: "HIPAA", es: "HIPAA" },
    description: { en: "Protect patient health information through administrative, physical, and technical safeguards.", es: "Proteger la información de salud del paciente mediante salvaguardas administrativas, físicas y técnicas." },
    icon: "Shield",
    color: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-200 dark:border-blue-800",
    checklistItems: HIPAA_CHECKLISTS,
    policyTemplates: HIPAA_POLICIES,
    deadlines: REGULATORY_DEADLINES.filter((d) => d.domain === "hipaa"),
    trainingCourseId: "hipaa-essentials",
    sourceUrls: [
      "https://www.hhs.gov/hipaa/",
      "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164",
    ],
  },
  {
    id: "osha",
    title: { en: "OSHA Workplace Safety", es: "Seguridad Laboral OSHA" },
    shortTitle: { en: "OSHA", es: "OSHA" },
    description: { en: "Ensure a safe and healthy workplace through hazard prevention and safety standards compliance.", es: "Asegurar un lugar de trabajo seguro y saludable mediante prevención de riesgos y cumplimiento de estándares de seguridad." },
    icon: "HardHat",
    color: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
    checklistItems: OSHA_CHECKLISTS,
    policyTemplates: OSHA_POLICIES,
    deadlines: REGULATORY_DEADLINES.filter((d) => d.domain === "osha"),
    sourceUrls: [
      "https://www.osha.gov/healthcare",
      "https://www.osha.gov/bloodborne-pathogens",
    ],
  },
  {
    id: "hrsa",
    title: { en: "HRSA Program Requirements", es: "Requisitos del Programa HRSA" },
    shortTitle: { en: "HRSA", es: "HRSA" },
    description: { en: "Meet federal grant requirements for Section 330 health center funding, governance, and reporting.", es: "Cumplir requisitos federales de subvención para financiamiento, gobernanza y reportes de centros de salud Sección 330." },
    icon: "Building",
    color: "bg-teal-100 dark:bg-teal-900/30",
    textColor: "text-teal-700 dark:text-teal-300",
    borderColor: "border-teal-200 dark:border-teal-800",
    checklistItems: HRSA_CHECKLISTS,
    policyTemplates: HRSA_POLICIES,
    deadlines: REGULATORY_DEADLINES.filter((d) => d.domain === "hrsa"),
    trainingCourseId: "osv-prep",
    sourceUrls: [
      "https://bphc.hrsa.gov/compliance",
      "https://bphc.hrsa.gov/sites/default/files/bphc/compliance/compliance-manual.pdf",
    ],
  },
  {
    id: "billing",
    title: { en: "Billing & Coding Compliance", es: "Cumplimiento de Facturación y Codificación" },
    shortTitle: { en: "Billing", es: "Facturación" },
    description: { en: "Ensure accurate billing practices, proper documentation, and compliance with False Claims Act.", es: "Asegurar prácticas de facturación precisas, documentación apropiada y cumplimiento de la Ley de Reclamos Falsos." },
    icon: "Receipt",
    color: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-700 dark:text-green-300",
    borderColor: "border-green-200 dark:border-green-800",
    checklistItems: BILLING_CHECKLISTS,
    policyTemplates: BILLING_POLICIES,
    deadlines: REGULATORY_DEADLINES.filter((d) => d.domain === "billing"),
    trainingCourseId: "billing-compliance",
    sourceUrls: [
      "https://oig.hhs.gov/compliance/compliance-guidance/",
    ],
  },
  {
    id: "ehr",
    title: { en: "EHR & Documentation", es: "EHR y Documentación" },
    shortTitle: { en: "EHR", es: "EHR" },
    description: { en: "Maintain proper electronic health record documentation, interoperability, and data integrity.", es: "Mantener documentación adecuada del expediente clínico electrónico, interoperabilidad e integridad de datos." },
    icon: "FileText",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    textColor: "text-indigo-700 dark:text-indigo-300",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    checklistItems: EHR_CHECKLISTS,
    policyTemplates: [],
    deadlines: [],
    sourceUrls: [
      "https://www.healthit.gov/topic/certified-health-it",
    ],
  },
  {
    id: "workforce",
    title: { en: "Workforce & Employment", es: "Fuerza Laboral y Empleo" },
    shortTitle: { en: "Workforce", es: "Personal" },
    description: { en: "Comply with California labor laws, credentialing requirements, and employment regulations.", es: "Cumplir con leyes laborales de California, requisitos de credenciales y regulaciones de empleo." },
    icon: "Users",
    color: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-700 dark:text-purple-300",
    borderColor: "border-purple-200 dark:border-purple-800",
    checklistItems: WORKFORCE_CHECKLISTS,
    policyTemplates: [],
    deadlines: REGULATORY_DEADLINES.filter((d) => d.domain === "workforce"),
    sourceUrls: [
      "https://www.dir.ca.gov/dlse/",
      "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB525",
    ],
  },
  {
    id: "patient-rights",
    title: { en: "Patient Rights & Access", es: "Derechos del Paciente y Acceso" },
    shortTitle: { en: "Patient Rights", es: "Derechos" },
    description: { en: "Ensure patient rights to privacy, grievances, language access, and ADA accommodations.", es: "Asegurar derechos del paciente a privacidad, quejas, acceso lingüístico y adaptaciones ADA." },
    icon: "Heart",
    color: "bg-rose-100 dark:bg-rose-900/30",
    textColor: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-200 dark:border-rose-800",
    checklistItems: PATIENT_RIGHTS_CHECKLISTS,
    policyTemplates: [],
    deadlines: [],
    sourceUrls: [
      "https://www.hhs.gov/civil-rights/",
      "https://www.ada.gov/",
    ],
  },
];

/* ================================================================== */
/*  Helper Functions                                                   */
/* ================================================================== */

/** Get all checklist items across all domains */
export function getAllChecklistItems(): (ChecklistItem & { domain: ComplianceDomainId })[] {
  return COMPLIANCE_DOMAINS.flatMap((d) =>
    d.checklistItems.map((item) => ({ ...item, domain: d.id })),
  );
}

/** Get checklist items by frequency */
export function getChecklistsByFrequency(
  frequency: ChecklistFrequency,
): (ChecklistItem & { domain: ComplianceDomainId })[] {
  return getAllChecklistItems().filter((item) => item.frequency === frequency);
}

/** Get upcoming deadlines sorted by date */
export function getUpcomingDeadlines(count = 5): RegulatoryDeadline[] {
  const now = new Date();
  return [...REGULATORY_DEADLINES]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .filter((d) => new Date(d.dueDate) >= now)
    .slice(0, count);
}

/** Count total items per domain */
export function getDomainItemCounts(): Record<ComplianceDomainId, number> {
  const counts = {} as Record<ComplianceDomainId, number>;
  for (const domain of COMPLIANCE_DOMAINS) {
    counts[domain.id] = domain.checklistItems.length;
  }
  return counts;
}

/* ================================================================== */
/*  Compliance Progress (localStorage)                                 */
/* ================================================================== */

const COMPLIANCE_STORAGE_KEY = "fqhc-compliance-progress";

export interface ComplianceProgress {
  completedItems: Record<string, string>; // itemId -> ISO date completed
  lastUpdated: string;
}

export function loadComplianceProgress(): ComplianceProgress {
  if (typeof window === "undefined") {
    return { completedItems: {}, lastUpdated: new Date().toISOString() };
  }
  try {
    const raw = localStorage.getItem(COMPLIANCE_STORAGE_KEY);
    if (!raw) return { completedItems: {}, lastUpdated: new Date().toISOString() };
    return JSON.parse(raw) as ComplianceProgress;
  } catch {
    return { completedItems: {}, lastUpdated: new Date().toISOString() };
  }
}

export function saveComplianceProgress(progress: ComplianceProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMPLIANCE_STORAGE_KEY, JSON.stringify({
      ...progress,
      lastUpdated: new Date().toISOString(),
    }));
  } catch {
    // Storage full — fail silently
  }
}

export function toggleChecklistItem(
  progress: ComplianceProgress,
  itemId: string,
): ComplianceProgress {
  const updated = { ...progress, completedItems: { ...progress.completedItems } };
  if (updated.completedItems[itemId]) {
    delete updated.completedItems[itemId];
  } else {
    updated.completedItems[itemId] = new Date().toISOString();
  }
  return updated;
}

export function calculateDomainScore(
  domain: ComplianceDomain,
  progress: ComplianceProgress,
): number {
  if (domain.checklistItems.length === 0) return 100;
  const completed = domain.checklistItems.filter(
    (item) => !!progress.completedItems[item.id],
  ).length;
  return Math.round((completed / domain.checklistItems.length) * 100);
}

export function calculateOverallScore(progress: ComplianceProgress): number {
  const allItems = getAllChecklistItems();
  if (allItems.length === 0) return 100;
  const completed = allItems.filter(
    (item) => !!progress.completedItems[item.id],
  ).length;
  return Math.round((completed / allItems.length) * 100);
}
