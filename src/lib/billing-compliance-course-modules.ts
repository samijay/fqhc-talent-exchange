// billing-compliance-course-modules.ts
// Billing Compliance 101 — 3 modules on PPS rules, documentation, and False Claims Act
// Covers FQHC-specific billing rules that trip up health centers

import type { AcademyModule, AcademyCourseDefinition } from "./academy-types";

export const BILLING_MODULES: AcademyModule[] = [
  // ── Module 1: FQHC Billing Fundamentals ──
  {
    id: "billing-m1",
    order: 1,
    title: {
      en: "FQHC Billing Fundamentals",
      es: "Fundamentos de Facturación FQHC",
    },
    subtitle: {
      en: "PPS rates, encounter definitions, and payer mix basics",
      es: "Tarifas PPS, definiciones de encuentro y conceptos básicos de mezcla de pagadores",
    },
    description: {
      en: "Understand how PPS billing works, what counts as a billable encounter, and why payer mix matters.",
      es: "Comprende cómo funciona la facturación PPS, qué cuenta como un encuentro facturable y por qué importa la mezcla de pagadores.",
    },
    icon: "DollarSign",
    color: "green",
    estimatedMinutes: 10,
    totalXP: 45,
    learningObjectives: [
      { en: "Explain the Prospective Payment System (PPS) for FQHCs", es: "Explicar el Sistema de Pago Prospectivo (PPS) para FQHCs" },
      { en: "Define what constitutes a billable encounter", es: "Definir qué constituye un encuentro facturable" },
      { en: "Describe same-day billing rules for different payers", es: "Describir las reglas de facturación del mismo día para diferentes pagadores" },
    ],
    conceptContent: [
      {
        heading: { en: "How PPS Works", es: "Cómo Funciona el PPS" },
        body: {
          en: "FQHCs are paid differently from most healthcare providers. Instead of fee-for-service (where each CPT code has a different price), FQHCs receive a flat per-visit rate called the Prospective Payment System (PPS) rate.\n\nKey PPS facts:\n• California average PPS rate: $225-$275 per visit\n• The rate is the SAME regardless of visit complexity (a 15-min BP check pays the same as a 45-min complex visit)\n• Each FQHC has its own PPS rate, set when they first became an FQHC and adjusted annually for inflation\n• PPS applies to Medi-Cal and Medicare patients (commercial insurance pays differently)\n\nWhy this matters for billing compliance:\n• You CANNOT upcode or downcode with PPS — the rate is flat\n• But you CAN maximize encounters by understanding same-day billing rules\n• Documentation must support that a face-to-face visit occurred with an eligible provider\n• Missing documentation = no billable encounter = lost revenue",
          es: "Los FQHCs reciben pagos de manera diferente a la mayoría de los proveedores de salud. En lugar de pago por servicio (donde cada código CPT tiene un precio diferente), los FQHCs reciben una tarifa fija por visita llamada tarifa del Sistema de Pago Prospectivo (PPS).\n\nDatos clave del PPS:\n• Tarifa PPS promedio en California: $225-$275 por visita\n• La tarifa es la MISMA independientemente de la complejidad de la visita (un chequeo de presión de 15 min paga lo mismo que una visita compleja de 45 min)\n• Cada FQHC tiene su propia tarifa PPS, establecida cuando se convirtieron en FQHC y ajustada anualmente por inflación\n• PPS aplica a pacientes de Medi-Cal y Medicare (el seguro comercial paga diferente)\n\nPor qué esto importa para el cumplimiento de facturación:\n• NO puedes sobrecodificar ni subcodificar con PPS — la tarifa es fija\n• Pero SÍ puedes maximizar encuentros entendiendo las reglas de facturación del mismo día\n• La documentación debe apoyar que una visita cara a cara ocurrió con un proveedor elegible\n• Documentación faltante = sin encuentro facturable = ingresos perdidos",
        },
      },
      {
        heading: { en: "Same-Day Billing Rules", es: "Reglas de Facturación del Mismo Día" },
        body: {
          en: "Same-day billing is one of the biggest revenue opportunities (and compliance risks) for FQHCs:\n\nMEDI-CAL (Standard):\n• Medical + Dental in same day = 2 PPS ✅\n• Medical + BH in same day = 1 PPS only ❌\n• Medical + Medical (different provider) = 1 PPS only ❌\n\nMEDI-CAL WITH APM (Alternative Payment Methodology):\n• Medical + BH in same day = 2 PPS ✅\n• Medical + Dental = 2 PPS ✅\n• Must be enrolled in APM to unlock BH same-day billing\n\nMEDICARE:\n• Medical + BH in same day = 2 PPS ✅ (separate encounters)\n• Medical + Dental = 2 PPS ✅\n• Must use modifier codes properly\n\nCRITICAL COMPLIANCE RULES:\n• Each encounter must have a separate, signed progress note\n• The provider for each encounter must be an eligible billing provider\n• Medical necessity must be documented for each visit\n• You CANNOT bill two encounters for the same discipline on the same day (e.g., two separate medical visits)\n\nBilling tip: The #1 revenue leak at FQHCs is missed same-day encounters — patients see a doctor AND a BH provider but only one encounter is billed because of documentation gaps.",
          es: "La facturación del mismo día es una de las mayores oportunidades de ingresos (y riesgos de cumplimiento) para FQHCs:\n\nMEDI-CAL (Estándar):\n• Médico + Dental en el mismo día = 2 PPS ✅\n• Médico + Salud Mental en el mismo día = 1 PPS solamente ❌\n• Médico + Médico (diferente proveedor) = 1 PPS solamente ❌\n\nMEDI-CAL CON APM (Metodología de Pago Alternativa):\n• Médico + Salud Mental en el mismo día = 2 PPS ✅\n• Médico + Dental = 2 PPS ✅\n• Debe estar inscrito en APM para desbloquear facturación de salud mental del mismo día\n\nMEDICARE:\n• Médico + Salud Mental en el mismo día = 2 PPS ✅ (encuentros separados)\n• Médico + Dental = 2 PPS ✅\n• Debe usar códigos modificadores correctamente\n\nREGLAS CRÍTICAS DE CUMPLIMIENTO:\n• Cada encuentro debe tener una nota de progreso separada y firmada\n• El proveedor de cada encuentro debe ser un proveedor de facturación elegible\n• La necesidad médica debe documentarse para cada visita\n• NO puedes facturar dos encuentros para la misma disciplina en el mismo día (e.g., dos visitas médicas separadas)\n\nConsejo de facturación: La fuga de ingresos #1 en FQHCs son encuentros del mismo día perdidos — los pacientes ven a un médico Y un proveedor de salud mental pero solo un encuentro se factura por brechas de documentación.",
        },
      },
    ],
    exercises: [
      // Ex 1: Classifier — Valid same-day billing scenarios
      {
        type: "classifier",
        id: "billing-m1-ex1",
        instruction: {
          en: "Can this same-day combination bill 2 PPS encounters under standard Medi-Cal? Mark ✓ (YES = 2 PPS) or ✗ (NO = only 1 PPS):",
          es: "¿Puede esta combinación del mismo día facturar 2 encuentros PPS bajo Medi-Cal estándar? Marca ✓ (SÍ = 2 PPS) o ✗ (NO = solo 1 PPS):",
        },
        items: [
          {
            text: { en: "Medical visit + Dental visit (same day, same patient)", es: "Visita médica + Visita dental (mismo día, mismo paciente)" },
            isGood: true,
            explanation: { en: "YES — Medical + Dental generates 2 PPS under ALL payers, including standard Medi-Cal.", es: "SÍ — Médico + Dental genera 2 PPS bajo TODOS los pagadores, incluyendo Medi-Cal estándar." },
          },
          {
            text: { en: "Medical visit + Behavioral health visit (standard Medi-Cal, no APM)", es: "Visita médica + Visita de salud mental (Medi-Cal estándar, sin APM)" },
            isGood: false,
            explanation: { en: "NO — Under standard Medi-Cal (without APM), medical + BH same-day only generates 1 PPS. You need APM enrollment.", es: "NO — Bajo Medi-Cal estándar (sin APM), médico + salud mental del mismo día solo genera 1 PPS. Necesitas inscripción en APM." },
          },
          {
            text: { en: "Medical visit + Behavioral health visit (Medicare)", es: "Visita médica + Visita de salud mental (Medicare)" },
            isGood: true,
            explanation: { en: "YES — Medicare allows same-day medical + BH as 2 separate PPS encounters, with proper documentation and modifiers.", es: "SÍ — Medicare permite médico + salud mental del mismo día como 2 encuentros PPS separados, con documentación y modificadores adecuados." },
          },
          {
            text: { en: "Medical visit in morning + second medical visit in afternoon (same provider)", es: "Visita médica en la mañana + segunda visita médica en la tarde (mismo proveedor)" },
            isGood: false,
            explanation: { en: "NO — You cannot bill two same-discipline encounters on the same day under any payer.", es: "NO — No puedes facturar dos encuentros de la misma disciplina en el mismo día bajo ningún pagador." },
          },
          {
            text: { en: "Medical visit + Dental visit (commercial insurance)", es: "Visita médica + Visita dental (seguro comercial)" },
            isGood: true,
            explanation: { en: "YES — Commercial insurance typically pays fee-for-service, so each service is billed separately (though not at PPS rates).", es: "SÍ — El seguro comercial típicamente paga por servicio, así que cada servicio se factura por separado (aunque no a tarifas PPS)." },
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Mini-Quiz — PPS fundamentals
      {
        type: "mini-quiz",
        id: "billing-m1-ex2",
        questions: [
          {
            question: {
              en: "A provider sees 3 patients today: a 15-minute blood pressure check, a 30-minute diabetes management visit, and a 45-minute complex chronic care visit. Under PPS, how does the revenue compare across these visits?",
              es: "Un proveedor ve 3 pacientes hoy: un chequeo de presión de 15 minutos, una visita de manejo de diabetes de 30 minutos, y una visita compleja de cuidado crónico de 45 minutos. Bajo PPS, ¿cómo se comparan los ingresos entre estas visitas?",
            },
            options: [
              { text: { en: "The complex visit pays significantly more", es: "La visita compleja paga significativamente más" }, isCorrect: false, explanation: { en: "Under PPS, the rate is flat regardless of complexity. A 15-minute visit pays the same as a 45-minute visit.", es: "Bajo PPS, la tarifa es fija independientemente de la complejidad. Una visita de 15 minutos paga lo mismo que una de 45 minutos." } },
              { text: { en: "All three pay the same PPS rate", es: "Las tres pagan la misma tarifa PPS" }, isCorrect: true, explanation: { en: "Correct! PPS is a flat per-visit rate (~$225-$275 in CA). Visit complexity doesn't change the payment. This is fundamentally different from fee-for-service.", es: "¡Correcto! PPS es una tarifa fija por visita (~$225-$275 en CA). La complejidad de la visita no cambia el pago. Esto es fundamentalmente diferente del pago por servicio." } },
              { text: { en: "It depends on the CPT code", es: "Depende del código CPT" }, isCorrect: false, explanation: { en: "CPT codes determine payment in fee-for-service, but NOT in PPS. FQHCs bill CPT codes for tracking purposes, but payment is flat.", es: "Los códigos CPT determinan el pago en pago por servicio, pero NO en PPS. Los FQHCs facturan códigos CPT para seguimiento, pero el pago es fijo." } },
            ],
          },
        ],
        xpReward: 25,
      },
    ],
  },

  // ── Module 2: Documentation Requirements ──
  {
    id: "billing-m2",
    order: 2,
    title: {
      en: "Documentation for Billing Compliance",
      es: "Documentación para Cumplimiento de Facturación",
    },
    subtitle: {
      en: "What must be in the chart to support a billable encounter",
      es: "Qué debe estar en el expediente para apoyar un encuentro facturable",
    },
    description: {
      en: "Learn the documentation standards that must be met for every billable encounter.",
      es: "Aprende los estándares de documentación que deben cumplirse para cada encuentro facturable.",
    },
    icon: "FileCheck",
    color: "amber",
    estimatedMinutes: 10,
    totalXP: 45,
    learningObjectives: [
      { en: "List the minimum documentation elements for a billable encounter", es: "Listar los elementos mínimos de documentación para un encuentro facturable" },
      { en: "Identify documentation gaps that create billing risk", es: "Identificar brechas de documentación que crean riesgo de facturación" },
      { en: "Apply co-signature and supervisory requirements", es: "Aplicar requisitos de co-firma y supervisión" },
    ],
    conceptContent: [
      {
        heading: { en: "Minimum Documentation for a Billable Encounter", es: "Documentación Mínima para un Encuentro Facturable" },
        body: {
          en: "Every PPS encounter must have documentation that supports:\n\n1. FACE-TO-FACE VISIT occurred\n• The visit happened in person (or via approved telehealth)\n• Documentation includes date, start/end time, and location\n\n2. ELIGIBLE PROVIDER delivered the service\n• Provider must be an FQHC-billable provider type (physician, NP, PA, dentist, LCSW, clinical psychologist, etc.)\n• MAs, RNs, and CHWs are NOT billable providers (they support encounters but can't generate one)\n\n3. MEDICAL NECESSITY documented\n• Chief complaint or reason for visit\n• Assessment/diagnosis\n• Plan of care\n\n4. PROVIDER SIGNATURE\n• Electronic or handwritten signature\n• Must include credentials (MD, DO, NP, PA, LCSW, etc.)\n• Unsigned notes = unbillable encounter\n\n5. SLIDING FEE applied correctly (if applicable)\n• Patient's FPG status documented\n• Correct discount applied per your fee schedule\n\nCommon documentation pitfalls at FQHCs:\n• Notes left unsigned in the EHR (\"pending signature\" queue)\n• Telehealth visits missing the required attestation\n• Student/resident notes without required co-signatures\n• MA-only visits billed as provider encounters\n• Copy-pasted notes that don't reflect the actual visit",
          es: "Cada encuentro PPS debe tener documentación que apoye:\n\n1. VISITA CARA A CARA ocurrió\n• La visita sucedió en persona (o vía telesalud aprobada)\n• La documentación incluye fecha, hora de inicio/fin y ubicación\n\n2. PROVEEDOR ELEGIBLE brindó el servicio\n• El proveedor debe ser un tipo de proveedor facturable por FQHC (médico, NP, PA, dentista, LCSW, psicólogo clínico, etc.)\n• MAs, RNs y CHWs NO son proveedores facturables (apoyan encuentros pero no pueden generar uno)\n\n3. NECESIDAD MÉDICA documentada\n• Motivo de consulta o razón de visita\n• Evaluación/diagnóstico\n• Plan de atención\n\n4. FIRMA DEL PROVEEDOR\n• Firma electrónica o manuscrita\n• Debe incluir credenciales (MD, DO, NP, PA, LCSW, etc.)\n• Notas sin firmar = encuentro no facturable\n\n5. ESCALA DESLIZANTE aplicada correctamente (si aplica)\n• Estado FPG del paciente documentado\n• Descuento correcto aplicado según su tabla de tarifas\n\nErrores comunes de documentación en FQHCs:\n• Notas sin firmar en el EHR (cola de \"firma pendiente\")\n• Visitas de telesalud sin la atestación requerida\n• Notas de estudiantes/residentes sin co-firmas requeridas\n• Visitas solo de MA facturadas como encuentros de proveedor\n• Notas copiadas y pegadas que no reflejan la visita real",
        },
      },
    ],
    exercises: [
      // Ex 1: Classifier — Billable or not billable
      {
        type: "classifier",
        id: "billing-m2-ex1",
        instruction: {
          en: "Is this encounter billable under PPS? Mark ✓ (BILLABLE) or ✗ (NOT BILLABLE):",
          es: "¿Es este encuentro facturable bajo PPS? Marca ✓ (FACTURABLE) o ✗ (NO FACTURABLE):",
        },
        items: [
          {
            text: { en: "NP sees patient for diabetes management, signs the note same day", es: "NP ve paciente para manejo de diabetes, firma la nota el mismo día" },
            isGood: true,
            explanation: { en: "Billable — NP is an eligible provider, face-to-face visit occurred, and the note is signed.", es: "Facturable — NP es un proveedor elegible, ocurrió visita cara a cara, y la nota está firmada." },
          },
          {
            text: { en: "MA takes vitals and gives a flu shot, no provider sees the patient", es: "MA toma signos vitales y pone vacuna de gripe, ningún proveedor ve al paciente" },
            isGood: false,
            explanation: { en: "Not billable — MAs are not eligible billing providers. A provider must see the patient to generate a PPS encounter.", es: "No facturable — los MAs no son proveedores de facturación elegibles. Un proveedor debe ver al paciente para generar un encuentro PPS." },
          },
          {
            text: { en: "Physician sees patient via telehealth, documents the visit with telehealth attestation", es: "Médico ve paciente via telesalud, documenta la visita con atestación de telesalud" },
            isGood: true,
            explanation: { en: "Billable — Approved telehealth visits are billable with proper documentation including telehealth attestation.", es: "Facturable — Las visitas de telesalud aprobadas son facturables con documentación adecuada incluyendo atestación de telesalud." },
          },
          {
            text: { en: "LCSW conducts therapy session but forgets to sign the note for 2 weeks", es: "LCSW realiza sesión de terapia pero olvida firmar la nota por 2 semanas" },
            isGood: false,
            explanation: { en: "Not billable until signed! Unsigned notes cannot be billed. Late signatures also create audit risk — best practice is same-day signing.", es: "¡No facturable hasta que se firme! Las notas sin firmar no pueden facturarse. Las firmas tardías también crean riesgo de auditoría — la mejor práctica es firmar el mismo día." },
          },
          {
            text: { en: "Dentist performs an exam and cleaning, documents treatment in dental EHR", es: "Dentista realiza examen y limpieza, documenta tratamiento en EHR dental" },
            isGood: true,
            explanation: { en: "Billable — Dental visits generate their own PPS encounter with proper documentation.", es: "Facturable — Las visitas dentales generan su propio encuentro PPS con documentación adecuada." },
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Mini-Quiz — Documentation scenario
      {
        type: "mini-quiz",
        id: "billing-m2-ex2",
        questions: [
          {
            question: {
              en: "Your billing team discovers that a provider has 47 unsigned notes in the EHR from the past month. What is the compliance impact?",
              es: "Tu equipo de facturación descubre que un proveedor tiene 47 notas sin firmar en el EHR del mes pasado. ¿Cuál es el impacto de cumplimiento?",
            },
            options: [
              { text: { en: "No impact — the visits still happened", es: "Sin impacto — las visitas aún ocurrieron" }, isCorrect: false, explanation: { en: "Without signed documentation, you cannot bill these encounters. This represents ~$10,000-$12,000 in lost revenue.", es: "Sin documentación firmada, no puedes facturar estos encuentros. Esto representa ~$10,000-$12,000 en ingresos perdidos." } },
              { text: { en: "Those 47 encounters cannot be billed until the notes are signed", es: "Esos 47 encuentros no pueden facturarse hasta que las notas estén firmadas" }, isCorrect: true, explanation: { en: "Correct! Unsigned notes = unbillable encounters. At ~$250/encounter, that's $11,750 in revenue held up. Many payers also have timely filing limits (90-365 days).", es: "¡Correcto! Notas sin firmar = encuentros no facturables. A ~$250/encuentro, eso son $11,750 en ingresos detenidos. Muchos pagadores también tienen límites de presentación oportuna (90-365 días)." } },
              { text: { en: "The billing team can sign on the provider's behalf", es: "El equipo de facturación puede firmar en nombre del proveedor" }, isCorrect: false, explanation: { en: "Only the rendering provider can sign the clinical note. Having billing staff sign would be fraudulent.", es: "Solo el proveedor que brindó el servicio puede firmar la nota clínica. Hacer que el personal de facturación firme sería fraudulento." } },
            ],
          },
        ],
        xpReward: 25,
      },
    ],
  },

  // ── Module 3: False Claims Act & Audit Readiness ──
  {
    id: "billing-m3",
    order: 3,
    title: {
      en: "False Claims Act & Audit Readiness",
      es: "Ley de Reclamaciones Falsas y Preparación para Auditorías",
    },
    subtitle: {
      en: "Understanding fraud risks, whistleblower protections, and audit prep",
      es: "Entender riesgos de fraude, protecciones de denunciantes y preparación para auditorías",
    },
    description: {
      en: "Learn about the False Claims Act, common fraud scenarios in FQHCs, and how to prepare for billing audits.",
      es: "Aprende sobre la Ley de Reclamaciones Falsas, escenarios comunes de fraude en FQHCs y cómo prepararse para auditorías de facturación.",
    },
    icon: "Scale",
    color: "red",
    estimatedMinutes: 10,
    totalXP: 50,
    learningObjectives: [
      { en: "Explain the False Claims Act and its penalties", es: "Explicar la Ley de Reclamaciones Falsas y sus penalidades" },
      { en: "Identify common billing fraud scenarios in FQHCs", es: "Identificar escenarios comunes de fraude de facturación en FQHCs" },
      { en: "Describe whistleblower protections under the FCA", es: "Describir las protecciones de denunciantes bajo la FCA" },
    ],
    conceptContent: [
      {
        heading: { en: "The False Claims Act (FCA)", es: "La Ley de Reclamaciones Falsas (FCA)" },
        body: {
          en: "The False Claims Act (31 U.S.C. §§ 3729-3733) is the federal government's primary tool for combating fraud against government programs, including Medicare and Medicaid.\n\nKEY PROVISIONS:\n• Penalties: $11,000-$23,000 PER false claim + triple damages\n• \"Knowingly\" includes actual knowledge, deliberate ignorance, or reckless disregard\n• You don't need to intend to defraud — reckless billing practices can violate the FCA\n\nFQHC-SPECIFIC FRAUD SCENARIOS:\n• Billing for encounters that never occurred (\"phantom billing\")\n• Billing for services not provided (e.g., billing a full visit when only vitals were taken)\n• Billing under a provider who didn't see the patient (\"incident-to\" abuse)\n• Falsifying sliding fee eligibility to get higher reimbursement\n• Billing telehealth visits that didn't meet platform/documentation requirements\n\nWHISTLEBLOWER PROTECTIONS (Qui Tam):\n• Any person can file an FCA lawsuit on behalf of the government\n• Whistleblowers can receive 15-30% of the recovery amount\n• Employers cannot retaliate against employees who report suspected fraud\n• This is why every FQHC needs a compliance program and reporting hotline\n\nProtecting your FQHC:\n• Regular internal billing audits (monthly or quarterly)\n• Compliance officer who reports directly to the board\n• Anonymous reporting mechanism for staff\n• Annual compliance training for all billing staff\n• Prompt voluntary disclosure if issues are discovered",
          es: "La Ley de Reclamaciones Falsas (31 U.S.C. §§ 3729-3733) es la herramienta principal del gobierno federal para combatir el fraude contra programas gubernamentales, incluyendo Medicare y Medicaid.\n\nDISPOSICIONES CLAVE:\n• Penalidades: $11,000-$23,000 POR reclamación falsa + triple daños\n• \"A sabiendas\" incluye conocimiento real, ignorancia deliberada o descuido imprudente\n• No necesitas intención de defraudar — prácticas de facturación imprudentes pueden violar la FCA\n\nESCENARIOS DE FRAUDE ESPECÍFICOS DE FQHC:\n• Facturar encuentros que nunca ocurrieron (\"facturación fantasma\")\n• Facturar servicios no proporcionados (e.g., facturar una visita completa cuando solo se tomaron signos vitales)\n• Facturar bajo un proveedor que no vio al paciente (abuso de \"incidente a\")\n• Falsificar elegibilidad de escala deslizante para obtener mayor reembolso\n• Facturar visitas de telesalud que no cumplieron requisitos de plataforma/documentación\n\nPROTECCIONES DE DENUNCIANTES (Qui Tam):\n• Cualquier persona puede presentar una demanda FCA en nombre del gobierno\n• Los denunciantes pueden recibir 15-30% del monto recuperado\n• Los empleadores no pueden tomar represalias contra empleados que reporten sospecha de fraude\n• Por esto cada FQHC necesita un programa de cumplimiento y línea de reporte\n\nProtegiendo tu FQHC:\n• Auditorías internas de facturación regulares (mensual o trimestral)\n• Oficial de cumplimiento que reporte directamente a la junta\n• Mecanismo de reporte anónimo para el personal\n• Capacitación anual de cumplimiento para todo el personal de facturación\n• Divulgación voluntaria inmediata si se descubren problemas",
        },
      },
    ],
    exercises: [
      // Ex 1: Mini-Quiz — FCA scenarios
      {
        type: "mini-quiz",
        id: "billing-m3-ex1",
        questions: [
          {
            question: {
              en: "A billing coder notices that a provider consistently documents 'complex visits' for simple follow-ups, resulting in higher CPT codes. Although PPS pays the same rate regardless, this could still be an FCA issue. Why?",
              es: "Un codificador de facturación nota que un proveedor documenta consistentemente 'visitas complejas' para seguimientos simples, resultando en códigos CPT más altos. Aunque PPS paga la misma tarifa sin importar qué, esto podría ser un problema de FCA. ¿Por qué?",
            },
            options: [
              { text: { en: "It's not an issue — PPS pays the same rate regardless", es: "No es un problema — PPS paga la misma tarifa sin importar qué" }, isCorrect: false, explanation: { en: "Even though PPS is flat, upcoding can inflate the FQHC's PPS rate during rebasing and affects Medicare cost reports. It's still false documentation.", es: "Aunque PPS es fijo, la sobrecodificación puede inflar la tarifa PPS del FQHC durante el rebasamiento y afecta los informes de costos de Medicare. Sigue siendo documentación falsa." } },
              { text: { en: "Upcoding inflates the PPS rate during rebasing and is false documentation", es: "La sobrecodificación infla la tarifa PPS durante el rebasamiento y es documentación falsa" }, isCorrect: true, explanation: { en: "Correct! FQHC PPS rates are periodically rebased using cost reports. Inflated documentation leads to inflated costs, which leads to inflated PPS rates — which is fraud.", es: "¡Correcto! Las tarifas PPS de FQHC se rebasan periódicamente usando informes de costos. Documentación inflada lleva a costos inflados, que llevan a tarifas PPS infladas — lo cual es fraude." } },
              { text: { en: "Only the provider is responsible, not the organization", es: "Solo el proveedor es responsable, no la organización" }, isCorrect: false, explanation: { en: "Under the FCA, both individuals AND organizations can be held liable. The FQHC has a duty to monitor and correct billing patterns.", es: "Bajo la FCA, tanto individuos COMO organizaciones pueden ser responsables. El FQHC tiene el deber de monitorear y corregir patrones de facturación." } },
            ],
          },
          {
            question: {
              en: "An employee discovers potential billing fraud at their FQHC and is worried about retaliation if they report it. What protection do they have?",
              es: "Un empleado descubre posible fraude de facturación en su FQHC y le preocupa la represalia si lo reporta. ¿Qué protección tiene?",
            },
            options: [
              { text: { en: "None — they should keep quiet to protect their job", es: "Ninguna — deben guardar silencio para proteger su trabajo" }, isCorrect: false, explanation: { en: "This is exactly what the FCA's whistleblower protections exist to prevent. Employees are legally protected.", es: "Esto es exactamente lo que las protecciones de denunciantes de la FCA existen para prevenir. Los empleados están legalmente protegidos." } },
              { text: { en: "FCA whistleblower protections prevent retaliation and they may receive 15-30% of any recovery", es: "Las protecciones de denunciantes de la FCA previenen represalias y pueden recibir 15-30% de cualquier recuperación" }, isCorrect: true, explanation: { en: "Correct! The FCA's qui tam provisions allow employees to file lawsuits and protect them from retaliation. Rewards can be 15-30% of the government's recovery.", es: "¡Correcto! Las disposiciones qui tam de la FCA permiten a los empleados presentar demandas y los protegen de represalias. Las recompensas pueden ser 15-30% de la recuperación del gobierno." } },
              { text: { en: "They can only report to their direct supervisor", es: "Solo pueden reportar a su supervisor directo" }, isCorrect: false, explanation: { en: "Employees can report to the compliance officer, the board, OIG, or file a qui tam lawsuit. Multiple channels exist by design.", es: "Los empleados pueden reportar al oficial de cumplimiento, la junta, OIG, o presentar una demanda qui tam. Múltiples canales existen por diseño." } },
            ],
          },
        ],
        xpReward: 25,
      },
      // Ex 2: Drag-Sort — Audit response steps
      {
        type: "drag-sort",
        id: "billing-m3-ex2",
        instruction: {
          en: "A payer requests a billing audit of 50 randomly selected encounters. Put the response steps in order:",
          es: "Un pagador solicita una auditoría de facturación de 50 encuentros seleccionados aleatoriamente. Pon los pasos de respuesta en orden:",
        },
        items: [
          { text: { en: "Notify the compliance officer and document the audit request", es: "Notificar al oficial de cumplimiento y documentar la solicitud de auditoría" }, correctPosition: 1 },
          { text: { en: "Pull all 50 charts and verify documentation completeness", es: "Sacar los 50 expedientes y verificar completitud de documentación" }, correctPosition: 2 },
          { text: { en: "Identify any documentation gaps and get provider clarifications (addendums)", es: "Identificar brechas de documentación y obtener aclaraciones del proveedor (addendums)" }, correctPosition: 3 },
          { text: { en: "Submit records within the payer's deadline with a cover letter", es: "Enviar registros dentro del plazo del pagador con carta de presentación" }, correctPosition: 4 },
          { text: { en: "Review audit findings and appeal any incorrect denials", es: "Revisar hallazgos de auditoría y apelar cualquier denegación incorrecta" }, correctPosition: 5 },
        ],
        xpReward: 25,
      },
    ],
  },
];

export const BILLING_TOTAL_XP = BILLING_MODULES.reduce((sum, m) => sum + m.totalXP, 0);

export const BILLING_COURSE: AcademyCourseDefinition = {
  id: "billing-compliance",
  title: {
    en: "Billing Compliance 101",
    es: "Cumplimiento de Facturación 101",
  },
  subtitle: {
    en: "PPS billing rules, documentation standards, and fraud prevention",
    es: "Reglas de facturación PPS, estándares de documentación y prevención de fraude",
  },
  description: {
    en: "Master FQHC billing rules, documentation requirements, and False Claims Act compliance. Prevent revenue leaks and audit risk.",
    es: "Domina las reglas de facturación FQHC, requisitos de documentación y cumplimiento de la Ley de Reclamaciones Falsas. Prevén fugas de ingresos y riesgo de auditoría.",
  },
  icon: "Receipt",
  color: "green",
  modules: BILLING_MODULES,
  totalXP: BILLING_TOTAL_XP,
  estimatedMinutes: 30,
  storageKey: "billing-compliance",
};
