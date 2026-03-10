// osv-prep-course-modules.ts
// HRSA Operational Site Visit (OSV) Prep — 3 modules
// Walks through the 19 program requirements with checklists and scenario exercises

import type { AcademyModule, AcademyCourseDefinition } from "./academy-types";

export const OSV_MODULES: AcademyModule[] = [
  // ── Module 1: Understanding the OSV ──
  {
    id: "osv-m1",
    order: 1,
    title: {
      en: "Understanding the HRSA Operational Site Visit",
      es: "Entendiendo la Visita Operacional del Sitio HRSA",
    },
    subtitle: {
      en: "What HRSA looks for, the 19 requirements, and how to prepare",
      es: "Qué busca HRSA, los 19 requisitos y cómo prepararse",
    },
    description: {
      en: "Learn the purpose, structure, and timeline of HRSA's Operational Site Visit and the 19 program requirements.",
      es: "Aprende el propósito, estructura y cronograma de la Visita Operacional del Sitio de HRSA y los 19 requisitos del programa.",
    },
    icon: "ClipboardCheck",
    color: "blue",
    estimatedMinutes: 12,
    totalXP: 50,
    learningObjectives: [
      { en: "Explain the purpose and frequency of HRSA's OSV", es: "Explicar el propósito y frecuencia de la OSV de HRSA" },
      { en: "List the 19 Health Center Program requirements", es: "Listar los 19 requisitos del Programa de Centros de Salud" },
      { en: "Identify the most commonly cited deficiencies", es: "Identificar las deficiencias más comúnmente citadas" },
    ],
    conceptContent: [
      {
        heading: { en: "What is an Operational Site Visit?", es: "¿Qué es una Visita Operacional del Sitio?" },
        body: {
          en: "HRSA conducts Operational Site Visits (OSVs) to verify that Health Center Program awardees comply with federal requirements. Every FQHC receives an OSV at least once during each project period (typically every 3 years).\n\nThe OSV covers 19 program requirements across 6 areas:\n\n1. NEEDS ASSESSMENT (Requirement 1)\n• Document community needs, target population, underserved area\n\n2. REQUIRED & ADDITIONAL SERVICES (Requirements 2-5)\n• Provide all required primary care services (onsite or by referral)\n• Cover required clinical services: medical, dental, BH, pharmacy, labs\n• Maintain formal referral arrangements for non-direct services\n\n3. CLINICAL STAFFING (Requirements 6-8)\n• Credentialing/privileging process for licensed providers\n• Clinical director oversight of clinical operations\n• Appropriate staffing levels for patient volume\n\n4. ACCESSIBLE & AVAILABLE SERVICES (Requirements 9-12)\n• Sliding fee discount program (SFDP)\n• Hours/location adequate for the community\n• After-hours coverage and emergency protocols\n• Continuity of care and follow-up systems\n\n5. MANAGEMENT & FINANCE (Requirements 13-16)\n• Key management staff (CEO/ED, CFO, CMO/CD)\n• Billing and collections systems\n• Budget/financial management and audits\n• Scope of project management\n\n6. GOVERNANCE (Requirements 17-19)\n• Board composition (51%+ patient majority)\n• Board authority and functions\n• Conflict of interest policies",
          es: "HRSA realiza Visitas Operacionales del Sitio (OSV) para verificar que los beneficiarios del Programa de Centros de Salud cumplan con los requisitos federales. Cada FQHC recibe una OSV al menos una vez durante cada período de proyecto (típicamente cada 3 años).\n\nLa OSV cubre 19 requisitos del programa en 6 áreas:\n\n1. EVALUACIÓN DE NECESIDADES (Requisito 1)\n• Documentar necesidades de la comunidad, población objetivo, área desatendida\n\n2. SERVICIOS REQUERIDOS Y ADICIONALES (Requisitos 2-5)\n• Proporcionar todos los servicios de atención primaria requeridos (en sitio o por referencia)\n• Cubrir servicios clínicos requeridos: médico, dental, salud mental, farmacia, laboratorios\n• Mantener arreglos formales de referencia para servicios no directos\n\n3. PERSONAL CLÍNICO (Requisitos 6-8)\n• Proceso de credencialización/privilegios para proveedores licenciados\n• Supervisión del director clínico de operaciones clínicas\n• Niveles de personal apropiados para volumen de pacientes\n\n4. SERVICIOS ACCESIBLES Y DISPONIBLES (Requisitos 9-12)\n• Programa de descuento por escala deslizante (SFDP)\n• Horarios/ubicación adecuados para la comunidad\n• Cobertura fuera de horario y protocolos de emergencia\n• Continuidad de atención y sistemas de seguimiento\n\n5. GESTIÓN Y FINANZAS (Requisitos 13-16)\n• Personal clave de gestión (CEO/ED, CFO, CMO/CD)\n• Sistemas de facturación y cobro\n• Presupuesto/gestión financiera y auditorías\n• Gestión del alcance del proyecto\n\n6. GOBERNANZA (Requisitos 17-19)\n• Composición de la junta (51%+ mayoría de pacientes)\n• Autoridad y funciones de la junta\n• Políticas de conflicto de interés",
        },
      },
      {
        heading: { en: "Most Commonly Cited Deficiencies", es: "Deficiencias Más Comúnmente Citadas" },
        body: {
          en: "Based on HRSA compliance data, these are the requirements most often flagged during OSVs:\n\n🔴 HIGH RISK (flagged in 30%+ of OSVs):\n• Sliding Fee Discount Program (Req 9) — incomplete fee schedules, not posting the policy, not applying discounts consistently\n• Credentialing & Privileging (Req 6) — missing primary source verification, expired licenses, incomplete files\n• Board Composition (Req 17) — falling below 51% patient majority, not documenting patient status\n\n🟡 MODERATE RISK (flagged in 15-30%):\n• After-Hours Coverage (Req 11) — voicemail without triage, no documentation of after-hours encounters\n• Scope of Project (Req 16) — providing services not listed in scope, or not providing listed services\n• Financial Management (Req 15) — late audits, unresolved findings\n\n🟢 LOWER RISK (flagged in <15%):\n• Needs Assessment (Req 1) — outdated data, not updating every 3 years\n• Referral Arrangements (Req 4) — informal arrangements without written agreements\n\nPro tip: HRSA's OSV Protocol Guide is publicly available. Use it as your preparation checklist — HRSA literally shows you what they'll look at.",
          es: "Basado en datos de cumplimiento de HRSA, estos son los requisitos más frecuentemente señalados durante las OSVs:\n\n🔴 ALTO RIESGO (señalado en 30%+ de OSVs):\n• Programa de Descuento por Escala Deslizante (Req 9) — tablas de tarifas incompletas, no publicar la política, no aplicar descuentos consistentemente\n• Credencialización y Privilegios (Req 6) — falta de verificación de fuente primaria, licencias vencidas, archivos incompletos\n• Composición de la Junta (Req 17) — caer por debajo del 51% de mayoría de pacientes, no documentar estado de paciente\n\n🟡 RIESGO MODERADO (señalado en 15-30%):\n• Cobertura Fuera de Horario (Req 11) — buzón de voz sin triaje, sin documentación de encuentros fuera de horario\n• Alcance del Proyecto (Req 16) — proporcionar servicios no listados en alcance, o no proporcionar servicios listados\n• Gestión Financiera (Req 15) — auditorías tardías, hallazgos sin resolver\n\n🟢 RIESGO MENOR (señalado en <15%):\n• Evaluación de Necesidades (Req 1) — datos desactualizados, no actualizar cada 3 años\n• Arreglos de Referencia (Req 4) — arreglos informales sin acuerdos escritos\n\nConsejo: La Guía del Protocolo OSV de HRSA está disponible públicamente. Úsala como tu lista de verificación de preparación — HRSA literalmente te muestra qué revisarán.",
        },
      },
    ],
    exercises: [
      // Ex 1: Classifier — High risk vs lower risk deficiencies
      {
        type: "classifier",
        id: "osv-m1-ex1",
        instruction: {
          en: "Classify each OSV finding as HIGH RISK (✓ = frequently cited, 30%+) or LOWER RISK (✗ = less commonly cited):",
          es: "Clasifica cada hallazgo de OSV como ALTO RIESGO (✓ = frecuentemente citado, 30%+) o RIESGO MENOR (✗ = menos comúnmente citado):",
        },
        items: [
          {
            text: { en: "Sliding fee schedule not posted in the waiting area", es: "Tabla de tarifas por escala deslizante no publicada en la sala de espera" },
            isGood: true,
            explanation: { en: "HIGH RISK — SFDP (Req 9) is one of the top 3 most cited deficiencies. The policy must be posted and accessible.", es: "ALTO RIESGO — SFDP (Req 9) es una de las 3 deficiencias más citadas. La política debe estar publicada y accesible." },
          },
          {
            text: { en: "Needs assessment data is 4 years old", es: "Los datos de evaluación de necesidades tienen 4 años" },
            isGood: false,
            explanation: { en: "LOWER RISK — While needs assessments should be updated every 3 years, this is less commonly flagged than SFDP or credentialing.", es: "RIESGO MENOR — Aunque las evaluaciones de necesidades deben actualizarse cada 3 años, esto es menos frecuentemente señalado que SFDP o credencialización." },
          },
          {
            text: { en: "A provider's license expired 2 months ago and hasn't been renewed in the file", es: "La licencia de un proveedor expiró hace 2 meses y no ha sido renovada en el archivo" },
            isGood: true,
            explanation: { en: "HIGH RISK — Credentialing (Req 6) is in the top 3. Expired licenses are a serious compliance issue.", es: "ALTO RIESGO — Credencialización (Req 6) está en el top 3. Licencias vencidas son un problema serio de cumplimiento." },
          },
          {
            text: { en: "Board meeting minutes don't document patient-status verification", es: "Las actas de reuniones de la junta no documentan verificación de estado de paciente" },
            isGood: true,
            explanation: { en: "HIGH RISK — Board composition (Req 17) requires 51% patient majority. Without documentation, HRSA can't verify compliance.", es: "ALTO RIESGO — La composición de la junta (Req 17) requiere 51% de mayoría de pacientes. Sin documentación, HRSA no puede verificar cumplimiento." },
          },
          {
            text: { en: "Referral to a specialist is done informally without a written agreement", es: "La referencia a un especialista se hace informalmente sin un acuerdo escrito" },
            isGood: false,
            explanation: { en: "LOWER RISK — While formal referral arrangements are required (Req 4), this is less commonly flagged during OSVs.", es: "RIESGO MENOR — Aunque se requieren arreglos formales de referencia (Req 4), esto es menos comúnmente señalado durante OSVs." },
          },
        ],
        xpReward: 25,
      },
      // Ex 2: Mini-Quiz — OSV basics
      {
        type: "mini-quiz",
        id: "osv-m1-ex2",
        questions: [
          {
            question: {
              en: "How often does HRSA typically conduct an Operational Site Visit for each FQHC?",
              es: "¿Con qué frecuencia HRSA realiza típicamente una Visita Operacional del Sitio para cada FQHC?",
            },
            options: [
              { text: { en: "Annually", es: "Anualmente" }, isCorrect: false, explanation: { en: "Annual visits would be very resource-intensive. HRSA uses a project-period cycle.", es: "Visitas anuales serían muy intensivas en recursos. HRSA usa un ciclo de período de proyecto." } },
              { text: { en: "At least once per project period (every ~3 years)", es: "Al menos una vez por período de proyecto (cada ~3 años)" }, isCorrect: true, explanation: { en: "Correct! OSVs happen at least once during each project period, typically 3 years. High-risk centers may get more frequent visits.", es: "¡Correcto! Las OSV ocurren al menos una vez durante cada período de proyecto, típicamente 3 años. Los centros de alto riesgo pueden recibir visitas más frecuentes." } },
              { text: { en: "Every 5 years", es: "Cada 5 años" }, isCorrect: false, explanation: { en: "While some health centers may go longer between visits, the standard is at least once per 3-year project period.", es: "Aunque algunos centros de salud pueden pasar más tiempo entre visitas, el estándar es al menos una vez por período de proyecto de 3 años." } },
              { text: { en: "Only when there's a complaint", es: "Solo cuando hay una queja" }, isCorrect: false, explanation: { en: "OSVs are routine monitoring visits, not complaint-driven. All FQHCs receive them regardless of complaints.", es: "Las OSV son visitas de monitoreo rutinarias, no impulsadas por quejas. Todos los FQHCs las reciben independientemente de quejas." } },
            ],
          },
        ],
        xpReward: 25,
      },
    ],
  },

  // ── Module 2: Key Requirements Deep Dive ──
  {
    id: "osv-m2",
    order: 2,
    title: {
      en: "Key Requirements Deep Dive",
      es: "Inmersión en Requisitos Clave",
    },
    subtitle: {
      en: "SFDP, credentialing, governance — the big three",
      es: "SFDP, credencialización, gobernanza — los tres grandes",
    },
    description: {
      en: "Deep dive into the three most commonly cited requirements: Sliding Fee, Credentialing, and Board Composition.",
      es: "Inmersión profunda en los tres requisitos más frecuentemente citados: Escala Deslizante, Credencialización y Composición de la Junta.",
    },
    icon: "Search",
    color: "indigo",
    estimatedMinutes: 15,
    totalXP: 60,
    learningObjectives: [
      { en: "Implement a compliant Sliding Fee Discount Program", es: "Implementar un Programa de Descuento por Escala Deslizante conforme" },
      { en: "Maintain complete credentialing and privileging files", es: "Mantener archivos completos de credencialización y privilegios" },
      { en: "Ensure board composition meets the 51% requirement", es: "Asegurar que la composición de la junta cumpla el requisito del 51%" },
    ],
    conceptContent: [
      {
        heading: { en: "Sliding Fee Discount Program (Requirement 9)", es: "Programa de Descuento por Escala Deslizante (Requisito 9)" },
        body: {
          en: "The SFDP is the #1 most cited deficiency. HRSA requires:\n\n✅ MUST HAVE:\n• A sliding fee schedule based on Federal Poverty Guidelines (FPG)\n• Discounts for patients at or below 200% FPG\n• A nominal fee (not $0) for patients at or below 100% FPG\n• Fees covering all services in scope of project (medical, dental, BH, pharmacy)\n• Annual update when new FPG published (usually January)\n• Board approval of the fee schedule\n• SFDP policy posted in the waiting area and on your website\n• Staff training on how to apply discounts\n\n❌ COMMON MISTAKES:\n• Not updating the fee schedule when new FPG data releases\n• Only applying discounts to medical visits (forgetting dental, BH, pharmacy)\n• Setting the nominal fee at $0 (must be above $0)\n• Not having the board formally approve the fee schedule annually\n• Not posting the SFDP policy where patients can see it\n• Not having a process to reassess patient eligibility periodically",
          es: "El SFDP es la deficiencia #1 más citada. HRSA requiere:\n\n✅ DEBE TENER:\n• Una tabla de tarifas basada en las Guías Federales de Pobreza (FPG)\n• Descuentos para pacientes al o por debajo del 200% FPG\n• Una tarifa nominal (no $0) para pacientes al o por debajo del 100% FPG\n• Tarifas que cubran todos los servicios en alcance del proyecto (médico, dental, salud mental, farmacia)\n• Actualización anual cuando se publiquen nuevos FPG (generalmente enero)\n• Aprobación de la junta de la tabla de tarifas\n• Política SFDP publicada en la sala de espera y en su sitio web\n• Capacitación del personal sobre cómo aplicar descuentos\n\n❌ ERRORES COMUNES:\n• No actualizar la tabla de tarifas cuando se publican nuevos datos FPG\n• Solo aplicar descuentos a visitas médicas (olvidando dental, salud mental, farmacia)\n• Establecer la tarifa nominal en $0 (debe ser superior a $0)\n• No tener la junta aprobando formalmente la tabla de tarifas anualmente\n• No publicar la política SFDP donde los pacientes puedan verla\n• No tener un proceso para reevaluar la elegibilidad del paciente periódicamente",
        },
      },
      {
        heading: { en: "Credentialing & Privileging (Requirement 6)", es: "Credencialización y Privilegios (Requisito 6)" },
        body: {
          en: "Every licensed or certified provider must have a complete credentialing file. HRSA checks:\n\n📋 CREDENTIALING FILE MUST INCLUDE:\n• Primary source verification of licenses (check directly with licensing board)\n• Education verification (medical school, residency)\n• DEA certificate (if prescribing controlled substances)\n• Malpractice history and National Practitioner Data Bank query\n• Board certification (if claimed)\n• Current, unexpired licenses\n• Completed application with no gaps in employment history\n\n📋 PRIVILEGING MUST INCLUDE:\n• Specific clinical privileges approved by the board or designated committee\n• Privileges match the scope of project\n• Temporary privileges process for new providers\n• Re-privileging timeline (typically every 2 years)\n\n⚠️ CRITICAL: If HRSA finds a provider practicing with an expired license, this is an immediate Condition finding — the most serious OSV outcome.",
          es: "Cada proveedor licenciado o certificado debe tener un archivo de credencialización completo. HRSA verifica:\n\n📋 EL ARCHIVO DE CREDENCIALIZACIÓN DEBE INCLUIR:\n• Verificación de fuente primaria de licencias (verificar directamente con la junta de licencias)\n• Verificación de educación (escuela de medicina, residencia)\n• Certificado DEA (si prescribe sustancias controladas)\n• Historial de negligencia y consulta al National Practitioner Data Bank\n• Certificación de la junta (si se reclama)\n• Licencias vigentes, no expiradas\n• Solicitud completada sin brechas en historial laboral\n\n📋 LOS PRIVILEGIOS DEBEN INCLUIR:\n• Privilegios clínicos específicos aprobados por la junta o comité designado\n• Privilegios que coincidan con el alcance del proyecto\n• Proceso de privilegios temporales para nuevos proveedores\n• Cronograma de re-privilegio (típicamente cada 2 años)\n\n⚠️ CRÍTICO: Si HRSA encuentra un proveedor practicando con una licencia expirada, esto es un hallazgo de Condición inmediata — el resultado más serio de la OSV.",
        },
      },
    ],
    exercises: [
      // Ex 1: Mini-Quiz — SFDP requirements
      {
        type: "mini-quiz",
        id: "osv-m2-ex1",
        questions: [
          {
            question: {
              en: "Your FQHC's sliding fee schedule was last updated in 2024. New Federal Poverty Guidelines were published in January 2026. What should you do?",
              es: "La tabla de tarifas por escala deslizante de tu FQHC fue actualizada por última vez en 2024. Las nuevas Guías Federales de Pobreza se publicaron en enero 2026. ¿Qué debes hacer?",
            },
            options: [
              { text: { en: "Wait until the next board meeting to discuss it", es: "Esperar hasta la próxima reunión de la junta para discutirlo" }, isCorrect: false, explanation: { en: "Delaying could mean months of non-compliance. The fee schedule should be updated promptly when new FPG data is released.", es: "Retrasar podría significar meses de incumplimiento. La tabla de tarifas debe actualizarse rápidamente cuando se publican nuevos datos FPG." } },
              { text: { en: "Update the fee schedule immediately and get board approval at the next meeting", es: "Actualizar la tabla de tarifas inmediatamente y obtener aprobación de la junta en la próxima reunión" }, isCorrect: true, explanation: { en: "Correct! Update as soon as new FPG data is available and formalize with board approval. Some FQHCs pre-authorize annual updates.", es: "¡Correcto! Actualiza tan pronto como estén disponibles nuevos datos FPG y formaliza con aprobación de la junta. Algunos FQHCs preautorizan actualizaciones anuales." } },
              { text: { en: "The 2024 schedule is still valid since FPG doesn't change much", es: "La tabla de 2024 aún es válida ya que las FPG no cambian mucho" }, isCorrect: false, explanation: { en: "FPG changes every year and the discount thresholds shift. Using outdated levels means patients may not get appropriate discounts.", es: "Las FPG cambian cada año y los umbrales de descuento cambian. Usar niveles desactualizados significa que los pacientes pueden no recibir descuentos apropiados." } },
            ],
          },
          {
            question: {
              en: "What is the minimum fee you can charge a patient at 100% FPG under the SFDP?",
              es: "¿Cuál es la tarifa mínima que puedes cobrar a un paciente al 100% FPG bajo el SFDP?",
            },
            options: [
              { text: { en: "$0 — services must be free for the poorest patients", es: "$0 — los servicios deben ser gratis para los pacientes más pobres" }, isCorrect: false, explanation: { en: "HRSA requires a nominal charge — never $0. The fee must be more than zero to comply.", es: "HRSA requiere un cargo nominal — nunca $0. La tarifa debe ser más que cero para cumplir." } },
              { text: { en: "A nominal fee above $0 (e.g., $10-$20)", es: "Una tarifa nominal superior a $0 (e.g., $10-$20)" }, isCorrect: true, explanation: { en: "Correct! HRSA requires a nominal (above $0) fee for patients at or below 100% FPG. Common amounts are $10-$25.", es: "¡Correcto! HRSA requiere una tarifa nominal (superior a $0) para pacientes al o por debajo del 100% FPG. Montos comunes son $10-$25." } },
              { text: { en: "Whatever the clinic decides — there's no minimum", es: "Lo que la clínica decida — no hay mínimo" }, isCorrect: false, explanation: { en: "HRSA has specific guidelines. The fee must be nominal (not a barrier to care) but more than $0.", es: "HRSA tiene pautas específicas. La tarifa debe ser nominal (no una barrera a la atención) pero más de $0." } },
            ],
          },
        ],
        xpReward: 30,
      },
      // Ex 2: Checklist — Credentialing file completeness
      {
        type: "checklist",
        id: "osv-m2-ex2",
        instruction: {
          en: "Check off ALL items that MUST be in a provider's credentialing file for OSV compliance:",
          es: "Marca TODOS los elementos que DEBEN estar en el archivo de credencialización de un proveedor para cumplimiento de OSV:",
        },
        items: [
          { text: { en: "Primary source verification of current license", es: "Verificación de fuente primaria de licencia vigente" }, isRequired: true, explanation: { en: "Required — you must verify directly with the licensing board, not just accept a copy.", es: "Requerido — debes verificar directamente con la junta de licencias, no solo aceptar una copia." } },
          { text: { en: "Provider's favorite coffee order", es: "Pedido de café favorito del proveedor" }, isRequired: false, explanation: { en: "Not required! This is not part of credentialing (though it might make onboarding friendlier).", es: "¡No requerido! Esto no es parte de la credencialización (aunque podría hacer la incorporación más amigable)." } },
          { text: { en: "Education verification (medical school, residency)", es: "Verificación de educación (escuela de medicina, residencia)" }, isRequired: true, explanation: { en: "Required — education must be verified through primary sources.", es: "Requerido — la educación debe verificarse a través de fuentes primarias." } },
          { text: { en: "NPDB (National Practitioner Data Bank) query results", es: "Resultados de consulta NPDB (National Practitioner Data Bank)" }, isRequired: true, explanation: { en: "Required — NPDB checks reveal malpractice history, adverse actions, and licensure issues.", es: "Requerido — las consultas NPDB revelan historial de negligencia, acciones adversas y problemas de licenciatura." } },
          { text: { en: "DEA certificate (for prescribing providers)", es: "Certificado DEA (para proveedores que prescriben)" }, isRequired: true, explanation: { en: "Required for any provider who prescribes controlled substances.", es: "Requerido para cualquier proveedor que prescriba sustancias controladas." } },
          { text: { en: "Board-approved clinical privileges", es: "Privilegios clínicos aprobados por la junta" }, isRequired: true, explanation: { en: "Required — the board (or designated committee) must approve specific clinical privileges for each provider.", es: "Requerido — la junta (o comité designado) debe aprobar privilegios clínicos específicos para cada proveedor." } },
        ],
        passingScore: 80,
        xpReward: 30,
      },
    ],
  },

  // ── Module 3: OSV Preparation Playbook ──
  {
    id: "osv-m3",
    order: 3,
    title: {
      en: "OSV Preparation Playbook",
      es: "Manual de Preparación para OSV",
    },
    subtitle: {
      en: "Timeline, document prep, and mock visit strategies",
      es: "Cronograma, preparación de documentos y estrategias de visita simulada",
    },
    description: {
      en: "A practical 90-day preparation playbook for getting your FQHC ready for an OSV.",
      es: "Un manual práctico de preparación de 90 días para preparar tu FQHC para una OSV.",
    },
    icon: "CalendarCheck",
    color: "green",
    estimatedMinutes: 10,
    totalXP: 50,
    learningObjectives: [
      { en: "Create a 90-day OSV preparation timeline", es: "Crear un cronograma de preparación de 90 días para OSV" },
      { en: "Organize documentation for each of the 19 requirements", es: "Organizar documentación para cada uno de los 19 requisitos" },
      { en: "Conduct an effective internal mock site visit", es: "Realizar una visita simulada interna efectiva" },
    ],
    conceptContent: [
      {
        heading: { en: "The 90-Day OSV Prep Timeline", es: "El Cronograma de Preparación OSV de 90 Días" },
        body: {
          en: "Start preparing at least 90 days before your expected OSV date. Here's a proven timeline:\n\nDAYS 90-60: ASSESSMENT PHASE\n• Download HRSA's current OSV Protocol Guide\n• Assign a lead for each of the 19 requirements\n• Conduct initial self-assessment against each requirement\n• Identify gaps and create a remediation plan\n• Review and update all policies\n\nDAYS 60-30: REMEDIATION PHASE\n• Close identified gaps (update fee schedules, fix credentialing files, etc.)\n• Update board documentation (minutes, composition, conflict of interest)\n• Ensure all services in scope of project are being provided\n• Conduct credentialing file audits for every provider\n• Update SFDP materials and train front desk staff\n\nDAYS 30-0: READINESS PHASE\n• Conduct a full internal mock site visit\n• Prepare a 'welcome binder' for HRSA reviewers (org chart, site list, key contacts)\n• Brief all staff on the OSV process and their roles\n• Ensure physical environment is organized (signage, SFDP posting, patient rights)\n• Stage all documents for easy retrieval\n\nPro tip: Many Primary Care Associations (PCAs) offer free mock site visits. Contact your state PCA well in advance.",
          es: "Comienza a prepararte al menos 90 días antes de tu fecha esperada de OSV. Aquí hay un cronograma probado:\n\nDÍAS 90-60: FASE DE EVALUACIÓN\n• Descargar la Guía del Protocolo OSV actual de HRSA\n• Asignar un líder para cada uno de los 19 requisitos\n• Realizar autoevaluación inicial contra cada requisito\n• Identificar brechas y crear un plan de remediación\n• Revisar y actualizar todas las políticas\n\nDÍAS 60-30: FASE DE REMEDIACIÓN\n• Cerrar brechas identificadas (actualizar tablas de tarifas, corregir archivos de credencialización, etc.)\n• Actualizar documentación de la junta (actas, composición, conflicto de interés)\n• Asegurar que todos los servicios en alcance del proyecto se estén proporcionando\n• Realizar auditorías de archivos de credencialización para cada proveedor\n• Actualizar materiales SFDP y capacitar personal de recepción\n\nDÍAS 30-0: FASE DE PREPARACIÓN\n• Realizar una visita simulada interna completa\n• Preparar una 'carpeta de bienvenida' para revisores de HRSA (organigrama, lista de sitios, contactos clave)\n• Informar a todo el personal sobre el proceso OSV y sus roles\n• Asegurar que el entorno físico esté organizado (señalización, publicación de SFDP, derechos del paciente)\n• Organizar todos los documentos para fácil recuperación\n\nConsejo: Muchas Asociaciones de Atención Primaria (PCA) ofrecen visitas simuladas gratuitas. Contacta a tu PCA estatal con anticipación.",
        },
      },
    ],
    exercises: [
      // Ex 1: Drag-Sort — 90-day timeline ordering
      {
        type: "drag-sort",
        id: "osv-m3-ex1",
        instruction: {
          en: "Put these OSV preparation steps in the correct chronological order (earliest first):",
          es: "Pon estos pasos de preparación OSV en el orden cronológico correcto (más temprano primero):",
        },
        items: [
          { text: { en: "Download HRSA's current OSV Protocol Guide", es: "Descargar la Guía del Protocolo OSV actual de HRSA" }, correctPosition: 1 },
          { text: { en: "Conduct initial self-assessment against 19 requirements", es: "Realizar autoevaluación inicial contra 19 requisitos" }, correctPosition: 2 },
          { text: { en: "Close identified gaps and update policies", es: "Cerrar brechas identificadas y actualizar políticas" }, correctPosition: 3 },
          { text: { en: "Audit every provider's credentialing file", es: "Auditar el archivo de credencialización de cada proveedor" }, correctPosition: 4 },
          { text: { en: "Conduct a full internal mock site visit", es: "Realizar una visita simulada interna completa" }, correctPosition: 5 },
          { text: { en: "Brief all staff and stage documents for easy retrieval", es: "Informar a todo el personal y organizar documentos para fácil recuperación" }, correctPosition: 6 },
        ],
        xpReward: 25,
      },
      // Ex 2: Mini-Quiz — Mock visit scenario
      {
        type: "mini-quiz",
        id: "osv-m3-ex2",
        questions: [
          {
            question: {
              en: "During your internal mock site visit, you discover that 3 of your 12 board members are no longer patients at your FQHC. This brings your patient-majority ratio to 50%. What is the FIRST thing you should do?",
              es: "Durante tu visita simulada interna, descubres que 3 de tus 12 miembros de la junta ya no son pacientes en tu FQHC. Esto reduce tu proporción de mayoría de pacientes al 50%. ¿Qué es lo PRIMERO que debes hacer?",
            },
            options: [
              { text: { en: "Recruit new patient board members before the OSV", es: "Reclutar nuevos miembros pacientes de la junta antes de la OSV" }, isCorrect: true, explanation: { en: "Correct! You need to immediately work to restore the 51% patient majority. Recruiting 1-2 new patient-members or verifying if existing members are receiving care at any of your sites.", es: "¡Correcto! Necesitas trabajar inmediatamente para restaurar la mayoría del 51% de pacientes. Reclutar 1-2 nuevos miembros pacientes o verificar si los miembros existentes reciben atención en alguno de tus sitios." } },
              { text: { en: "It's close enough — 50% should be acceptable", es: "Es casi suficiente — 50% debería ser aceptable" }, isCorrect: false, explanation: { en: "HRSA requires OVER 50% (51%+). There is no rounding or \"close enough\" — this would be flagged as a Condition.", es: "HRSA requiere MÁS del 50% (51%+). No hay redondeo ni \"casi suficiente\" — esto sería señalado como una Condición." } },
              { text: { en: "Remove the 3 non-patient members from the board", es: "Eliminar los 3 miembros no pacientes de la junta" }, isCorrect: false, explanation: { en: "While this technically fixes the ratio, losing board members suddenly creates governance issues. Recruitment is better.", es: "Aunque esto técnicamente arregla la proporción, perder miembros de la junta repentinamente crea problemas de gobernanza. El reclutamiento es mejor." } },
              { text: { en: "Ask them to schedule a visit so they count as patients again", es: "Pedirles que agenden una visita para que cuenten como pacientes de nuevo" }, isCorrect: false, explanation: { en: "While this could work, it may feel coercive and raises ethical concerns. HRSA looks for genuine patient representation.", es: "Aunque esto podría funcionar, puede sentirse coercitivo y plantea preocupaciones éticas. HRSA busca representación genuina de pacientes." } },
            ],
          },
        ],
        xpReward: 25,
      },
    ],
  },
];

export const OSV_TOTAL_XP = OSV_MODULES.reduce((sum, m) => sum + m.totalXP, 0);

export const OSV_COURSE: AcademyCourseDefinition = {
  id: "osv-prep",
  title: {
    en: "HRSA Operational Site Visit Prep",
    es: "Preparación para Visita Operacional HRSA",
  },
  subtitle: {
    en: "Pass your OSV with confidence — the 19 requirements demystified",
    es: "Pasa tu OSV con confianza — los 19 requisitos desmitificados",
  },
  description: {
    en: "Everything you need to prepare for HRSA's Operational Site Visit. Covers all 19 program requirements with checklists and practical exercises.",
    es: "Todo lo que necesitas para preparar la Visita Operacional del Sitio de HRSA. Cubre los 19 requisitos del programa con listas de verificación y ejercicios prácticos.",
  },
  icon: "ClipboardCheck",
  color: "blue",
  modules: OSV_MODULES,
  totalXP: OSV_TOTAL_XP,
  estimatedMinutes: 37,
  storageKey: "osv-prep",
};
