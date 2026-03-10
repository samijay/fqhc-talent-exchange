// hipaa-course-modules.ts
// HIPAA Essentials — 4 modules using the Academy course engine
// Covers Privacy Rule, Security Rule, breach response, and staff responsibilities

import type { AcademyModule, AcademyCourseDefinition } from "./academy-types";

export const HIPAA_MODULES: AcademyModule[] = [
  // ── Module 1: The HIPAA Privacy Rule ──
  {
    id: "hipaa-m1",
    order: 1,
    title: {
      en: "The HIPAA Privacy Rule",
      es: "La Regla de Privacidad HIPAA",
    },
    subtitle: {
      en: "PHI, covered entities, and the minimum necessary standard",
      es: "PHI, entidades cubiertas y el estándar de mínimo necesario",
    },
    description: {
      en: "Understand what PHI is, who must protect it, and the minimum necessary standard.",
      es: "Comprender qué es la PHI, quién debe protegerla y el estándar de mínimo necesario.",
    },
    icon: "Shield",
    color: "teal",
    estimatedMinutes: 8,
    totalXP: 40,
    learningObjectives: [
      { en: "Define Protected Health Information (PHI) and ePHI", es: "Definir Información de Salud Protegida (PHI) y ePHI" },
      { en: "Identify covered entities and business associates", es: "Identificar entidades cubiertas y asociados de negocio" },
      { en: "Apply the minimum necessary standard", es: "Aplicar el estándar de mínimo necesario" },
    ],
    conceptContent: [
      {
        heading: { en: "What is PHI?", es: "¿Qué es la PHI?" },
        body: {
          en: "Protected Health Information (PHI) is any individually identifiable health information held or transmitted by a covered entity. This includes:\n\n• Patient names, addresses, birth dates, Social Security numbers\n• Medical records, lab results, diagnoses, medications\n• Insurance information, billing records\n• Appointment schedules, photos, voicemails\n• Any combination of health data + identity\n\nElectronic PHI (ePHI) is PHI stored or transmitted electronically — in your EHR, email, text messages, cloud drives, or even fax-to-email systems.\n\nAt an FQHC, you encounter PHI constantly: during patient check-in, in the EHR, on printed encounter forms, and even in casual hallway conversations about patients.",
          es: "La Información de Salud Protegida (PHI) es cualquier información de salud individualmente identificable mantenida o transmitida por una entidad cubierta. Esto incluye:\n\n• Nombres de pacientes, direcciones, fechas de nacimiento, números de Seguro Social\n• Registros médicos, resultados de laboratorio, diagnósticos, medicamentos\n• Información de seguro, registros de facturación\n• Horarios de citas, fotos, mensajes de voz\n• Cualquier combinación de datos de salud + identidad\n\nLa PHI electrónica (ePHI) es PHI almacenada o transmitida electrónicamente — en tu EHR, correo electrónico, mensajes de texto, almacenamiento en la nube, o incluso sistemas de fax-a-email.\n\nEn un FQHC, encuentras PHI constantemente: durante el registro del paciente, en el EHR, en formularios de encuentro impresos, e incluso en conversaciones casuales de pasillo sobre pacientes.",
        },
      },
      {
        heading: { en: "Minimum Necessary Standard", es: "Estándar de Mínimo Necesario" },
        body: {
          en: "The Privacy Rule requires that when using or disclosing PHI, covered entities must make reasonable efforts to limit the information to the minimum amount necessary to accomplish the purpose.\n\nPractical examples:\n• A front desk staff member should NOT access a patient's full medical history to verify an appointment\n• A billing coder needs diagnosis codes, not the full clinical note narrative\n• An MA rooming a patient needs vitals and chief complaint, not psychiatric notes\n\nExceptions: The minimum necessary standard does NOT apply to:\n• Treatment purposes (providers sharing info for patient care)\n• Requests by the patient for their own records\n• Uses required by law\n• Uses required for compliance/enforcement activities",
          es: "La Regla de Privacidad requiere que al usar o divulgar PHI, las entidades cubiertas deben hacer esfuerzos razonables para limitar la información a la cantidad mínima necesaria para lograr el propósito.\n\nEjemplos prácticos:\n• Un empleado de recepción NO debe acceder al historial médico completo del paciente para verificar una cita\n• Un codificador de facturación necesita códigos de diagnóstico, no la narrativa completa de la nota clínica\n• Un MA que prepara al paciente necesita signos vitales y motivo de consulta, no notas psiquiátricas\n\nExcepciones: El estándar de mínimo necesario NO se aplica a:\n• Propósitos de tratamiento (proveedores compartiendo información para atención del paciente)\n• Solicitudes del paciente de sus propios registros\n• Usos requeridos por ley\n• Usos requeridos para actividades de cumplimiento/aplicación",
        },
      },
    ],
    exercises: [
      // Ex 1: Classifier — PHI (isGood=true) vs Not PHI (isGood=false)
      {
        type: "classifier",
        id: "hipaa-m1-ex1",
        instruction: {
          en: "Classify each item as PHI (✓) or NOT PHI (✗). Remember: PHI must combine health data with individual identity.",
          es: "Clasifica cada elemento como PHI (✓) o NO PHI (✗). Recuerda: la PHI debe combinar datos de salud con identidad individual.",
        },
        items: [
          {
            text: { en: "Patient chart with name and diagnosis", es: "Expediente del paciente con nombre y diagnóstico" },
            isGood: true,
            explanation: { en: "This is PHI — it combines a patient's identity (name) with health information (diagnosis).", es: "Esto es PHI — combina la identidad del paciente (nombre) con información de salud (diagnóstico)." },
          },
          {
            text: { en: "Anonymous aggregate clinic stats (500 diabetic patients)", es: "Estadísticas anónimas agregadas de la clínica (500 pacientes diabéticos)" },
            isGood: false,
            explanation: { en: "Not PHI — aggregate data with no individual identifiers is de-identified information.", es: "No es PHI — datos agregados sin identificadores individuales es información desidentificada." },
          },
          {
            text: { en: "Voicemail from a patient about their lab results", es: "Mensaje de voz de un paciente sobre sus resultados de laboratorio" },
            isGood: true,
            explanation: { en: "PHI — the voice identifies the individual and lab results are health information.", es: "PHI — la voz identifica al individuo y los resultados de laboratorio son información de salud." },
          },
          {
            text: { en: "Employee's work schedule posted in break room", es: "Horario de trabajo del empleado publicado en el comedor" },
            isGood: false,
            explanation: { en: "Not PHI — employee work schedules are employment records, not patient health information.", es: "No es PHI — los horarios de trabajo de empleados son registros laborales, no información de salud del paciente." },
          },
          {
            text: { en: "Insurance EOB mailed to a patient's home", es: "EOB de seguro enviado por correo al hogar del paciente" },
            isGood: true,
            explanation: { en: "PHI — an Explanation of Benefits contains the patient's name, provider, dates, and services received.", es: "PHI — una Explicación de Beneficios contiene el nombre del paciente, proveedor, fechas y servicios recibidos." },
          },
          {
            text: { en: "De-identified research dataset with no names or dates", es: "Conjunto de datos de investigación sin identificadores, nombres ni fechas" },
            isGood: false,
            explanation: { en: "Not PHI — properly de-identified data (per HIPAA standards) removes all 18 identifiers.", es: "No es PHI — datos correctamente desidentificados (según estándares HIPAA) eliminan los 18 identificadores." },
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Mini-Quiz — Minimum Necessary Standard
      {
        type: "mini-quiz",
        id: "hipaa-m1-ex2",
        questions: [
          {
            question: {
              en: "A billing specialist needs to verify a patient's diagnosis for a claim. Which approach follows the minimum necessary standard?",
              es: "Un especialista de facturación necesita verificar el diagnóstico de un paciente para un reclamo. ¿Qué enfoque sigue el estándar de mínimo necesario?",
            },
            options: [
              {
                text: { en: "Access the patient's full EHR record including all notes", es: "Acceder al expediente completo del EHR del paciente incluyendo todas las notas" },
                isCorrect: false,
                explanation: { en: "Accessing the full record violates minimum necessary — billing doesn't need clinical notes.", es: "Acceder al expediente completo viola el mínimo necesario — facturación no necesita notas clínicas." },
              },
              {
                text: { en: "View only the encounter diagnosis codes and billing summary", es: "Ver solo los códigos de diagnóstico del encuentro y resumen de facturación" },
                isCorrect: true,
                explanation: { en: "Correct! The minimum necessary standard requires limiting access to only what's needed. A billing specialist only needs diagnosis codes and billing data.", es: "¡Correcto! El estándar de mínimo necesario requiere limitar el acceso solo a lo necesario. Un especialista de facturación solo necesita códigos de diagnóstico y datos de facturación." },
              },
              {
                text: { en: "Ask the provider to verbally share the diagnosis in the hallway", es: "Pedir al proveedor que comparta el diagnóstico verbalmente en el pasillo" },
                isCorrect: false,
                explanation: { en: "Discussing PHI in public areas creates an additional privacy risk — not a minimum necessary solution.", es: "Discutir PHI en áreas públicas crea un riesgo adicional de privacidad — no es una solución de mínimo necesario." },
              },
              {
                text: { en: "Print the full chart and highlight the relevant section", es: "Imprimir el expediente completo y resaltar la sección relevante" },
                isCorrect: false,
                explanation: { en: "Printing the full chart creates unnecessary PHI on paper that must then be secured and shredded.", es: "Imprimir el expediente completo crea PHI innecesaria en papel que luego debe asegurarse y triturarse." },
              },
            ],
          },
        ],
        xpReward: 20,
      },
    ],
  },

  // ── Module 2: The HIPAA Security Rule ──
  {
    id: "hipaa-m2",
    order: 2,
    title: {
      en: "The HIPAA Security Rule",
      es: "La Regla de Seguridad HIPAA",
    },
    subtitle: {
      en: "Administrative, physical, and technical safeguards for ePHI",
      es: "Salvaguardas administrativas, físicas y técnicas para ePHI",
    },
    description: {
      en: "Learn the three types of safeguards required to protect ePHI.",
      es: "Aprende los tres tipos de salvaguardas requeridas para proteger la ePHI.",
    },
    icon: "Lock",
    color: "indigo",
    estimatedMinutes: 8,
    totalXP: 40,
    learningObjectives: [
      { en: "Distinguish administrative, physical, and technical safeguards", es: "Distinguir salvaguardas administrativas, físicas y técnicas" },
      { en: "Identify common security threats in FQHC settings", es: "Identificar amenazas de seguridad comunes en entornos FQHC" },
      { en: "Apply password and access control best practices", es: "Aplicar mejores prácticas de contraseñas y control de acceso" },
    ],
    conceptContent: [
      {
        heading: { en: "Three Types of Safeguards", es: "Tres Tipos de Salvaguardas" },
        body: {
          en: "The Security Rule requires three categories of safeguards to protect electronic PHI:\n\n1. ADMINISTRATIVE SAFEGUARDS\n• Security risk assessments (annual)\n• Workforce training programs\n• Designated Security Officer\n• Access management procedures\n• Incident response plans\n\n2. PHYSICAL SAFEGUARDS\n• Workstation security (screen locks, positioning)\n• Facility access controls (badge systems, locked doors)\n• Device and media controls (encrypted drives, secure disposal)\n• Server room restrictions\n\n3. TECHNICAL SAFEGUARDS\n• Access controls (unique user IDs, auto-logoff)\n• Audit controls (EHR access logs)\n• Transmission security (encryption for email, messaging)\n• Integrity controls (data validation)\n\nFQHC-specific concern: Many FQHCs use shared workstations at nursing stations. Each user MUST log out between patients. Auto-logoff should be set to 15 minutes maximum.",
          es: "La Regla de Seguridad requiere tres categorías de salvaguardas para proteger la PHI electrónica:\n\n1. SALVAGUARDAS ADMINISTRATIVAS\n• Evaluaciones de riesgo de seguridad (anuales)\n• Programas de capacitación del personal\n• Oficial de Seguridad designado\n• Procedimientos de gestión de acceso\n• Planes de respuesta a incidentes\n\n2. SALVAGUARDAS FÍSICAS\n• Seguridad de estaciones de trabajo (bloqueo de pantalla, posicionamiento)\n• Controles de acceso a instalaciones (sistemas de credenciales, puertas cerradas)\n• Controles de dispositivos y medios (unidades cifradas, eliminación segura)\n• Restricciones de sala de servidores\n\n3. SALVAGUARDAS TÉCNICAS\n• Controles de acceso (IDs de usuario únicos, cierre automático)\n• Controles de auditoría (registros de acceso al EHR)\n• Seguridad de transmisión (cifrado para email, mensajería)\n• Controles de integridad (validación de datos)\n\nPreocupación específica de FQHC: Muchos FQHCs usan estaciones de trabajo compartidas en estaciones de enfermería. Cada usuario DEBE cerrar sesión entre pacientes. El cierre automático debe establecerse en 15 minutos máximo.",
        },
      },
    ],
    exercises: [
      // Ex 1: Mini-Quiz — Classify safeguard types (using quiz since classifier is binary only)
      {
        type: "mini-quiz",
        id: "hipaa-m2-ex1",
        questions: [
          {
            question: {
              en: "A clinic requires badge-swipe access to enter the server room. What type of safeguard is this?",
              es: "Una clínica requiere acceso con credencial para entrar al cuarto de servidores. ¿Qué tipo de salvaguarda es esta?",
            },
            options: [
              { text: { en: "Administrative", es: "Administrativa" }, isCorrect: false, explanation: { en: "Administrative safeguards are policies and procedures (e.g., training, risk assessments). Badge access is a physical control.", es: "Las salvaguardas administrativas son políticas y procedimientos (e.g., capacitación, evaluaciones de riesgo). El acceso por credencial es un control físico." } },
              { text: { en: "Physical", es: "Física" }, isCorrect: true, explanation: { en: "Correct! Badge-swipe door access is a physical safeguard — it controls physical access to facilities where ePHI is stored.", es: "¡Correcto! El acceso por credencial es una salvaguarda física — controla el acceso físico a instalaciones donde se almacena ePHI." } },
              { text: { en: "Technical", es: "Técnica" }, isCorrect: false, explanation: { en: "Technical safeguards are technology-based (encryption, access controls in software). Physical door locks are physical safeguards.", es: "Las salvaguardas técnicas son basadas en tecnología (cifrado, controles de acceso en software). Las cerraduras físicas son salvaguardas físicas." } },
            ],
          },
          {
            question: {
              en: "Auto-logoff after 15 minutes of EHR inactivity is an example of what safeguard type?",
              es: "El cierre automático de sesión después de 15 minutos de inactividad en el EHR es un ejemplo de qué tipo de salvaguarda?",
            },
            options: [
              { text: { en: "Administrative", es: "Administrativa" }, isCorrect: false, explanation: { en: "While the policy requiring auto-logoff is administrative, the technology itself is a technical safeguard.", es: "Aunque la política que requiere cierre automático es administrativa, la tecnología en sí es una salvaguarda técnica." } },
              { text: { en: "Physical", es: "Física" }, isCorrect: false, explanation: { en: "Physical safeguards protect the physical environment. Auto-logoff is a software-based control.", es: "Las salvaguardas físicas protegen el entorno físico. El cierre automático es un control basado en software." } },
              { text: { en: "Technical", es: "Técnica" }, isCorrect: true, explanation: { en: "Correct! Auto-logoff is a technical safeguard — it's a technology-based access control built into the EHR system.", es: "¡Correcto! El cierre automático es una salvaguarda técnica — es un control de acceso basado en tecnología integrado en el sistema EHR." } },
            ],
          },
          {
            question: {
              en: "Annual HIPAA training for all staff is an example of what safeguard type?",
              es: "La capacitación HIPAA anual para todo el personal es un ejemplo de qué tipo de salvaguarda?",
            },
            options: [
              { text: { en: "Administrative", es: "Administrativa" }, isCorrect: true, explanation: { en: "Correct! Workforce training programs are administrative safeguards — they establish policies and procedures for how staff handle ePHI.", es: "¡Correcto! Los programas de capacitación del personal son salvaguardas administrativas — establecen políticas y procedimientos para cómo el personal maneja ePHI." } },
              { text: { en: "Physical", es: "Física" }, isCorrect: false, explanation: { en: "Physical safeguards protect the physical environment and hardware. Training is a policy/procedure-based control.", es: "Las salvaguardas físicas protegen el entorno físico y hardware. La capacitación es un control basado en políticas/procedimientos." } },
              { text: { en: "Technical", es: "Técnica" }, isCorrect: false, explanation: { en: "Technical safeguards are technology controls. Training is people-focused, making it an administrative safeguard.", es: "Las salvaguardas técnicas son controles de tecnología. La capacitación se enfoca en personas, haciéndola una salvaguarda administrativa." } },
            ],
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Mini-Quiz — Security scenario
      {
        type: "mini-quiz",
        id: "hipaa-m2-ex2",
        questions: [
          {
            question: {
              en: "An MA at your FQHC finishes rooming a patient and walks away from the computer to get supplies. The EHR is still open on the screen. The waiting area is visible from this workstation. What should happen?",
              es: "Un MA en tu FQHC termina de preparar a un paciente y se aleja de la computadora para buscar suministros. El EHR todavía está abierto en la pantalla. La sala de espera es visible desde esta estación de trabajo. ¿Qué debería suceder?",
            },
            options: [
              { text: { en: "The auto-logoff will handle it — no action needed", es: "El cierre automático se encargará — no se necesita acción" }, isCorrect: false, explanation: { en: "Auto-logoff is a backup control, not a primary one. 15 minutes of exposed ePHI is a serious risk.", es: "El cierre automático es un control de respaldo, no primario. 15 minutos de ePHI expuesta es un riesgo serio." } },
              { text: { en: "The MA should lock the screen (Ctrl+L) before stepping away", es: "El MA debe bloquear la pantalla (Ctrl+L) antes de alejarse" }, isCorrect: true, explanation: { en: "Correct! Staff must manually lock workstations EVERY time they step away. With the waiting area visible, other patients could see ePHI on the screen.", es: "¡Correcto! El personal debe bloquear manualmente las estaciones de trabajo CADA vez que se alejan. Con la sala de espera visible, otros pacientes podrían ver ePHI." } },
              { text: { en: "It's okay because the patient in the room has already been checked in", es: "Está bien porque el paciente en la sala ya fue registrado" }, isCorrect: false, explanation: { en: "The risk isn't from the patient in the room — it's from anyone walking by who can see the screen from the waiting area.", es: "El riesgo no es del paciente en la sala — es de cualquier persona que pase y pueda ver la pantalla desde la sala de espera." } },
              { text: { en: "The front desk should monitor the screen", es: "La recepción debe monitorear la pantalla" }, isCorrect: false, explanation: { en: "It's each user's responsibility to secure their own workstation. Front desk has their own duties and PHI to protect.", es: "Es responsabilidad de cada usuario asegurar su propia estación de trabajo. La recepción tiene sus propias tareas y PHI que proteger." } },
            ],
          },
        ],
        xpReward: 20,
      },
    ],
  },

  // ── Module 3: Breach Notification ──
  {
    id: "hipaa-m3",
    order: 3,
    title: {
      en: "Breach Notification Rules",
      es: "Reglas de Notificación de Violaciones",
    },
    subtitle: {
      en: "Recognizing breaches, risk assessment, and reporting timelines",
      es: "Reconocer violaciones, evaluación de riesgo y cronogramas de reporte",
    },
    description: {
      en: "Know what constitutes a breach and the required notification timeline.",
      es: "Saber qué constituye una violación y el cronograma de notificación requerido.",
    },
    icon: "AlertTriangle",
    color: "amber",
    estimatedMinutes: 7,
    totalXP: 40,
    learningObjectives: [
      { en: "Define what constitutes a breach of unsecured PHI", es: "Definir qué constituye una violación de PHI no asegurada" },
      { en: "Recall the breach notification timeline (60 days)", es: "Recordar el cronograma de notificación de violación (60 días)" },
      { en: "Explain the breach risk assessment factors", es: "Explicar los factores de evaluación de riesgo de violación" },
    ],
    conceptContent: [
      {
        heading: { en: "What is a Breach?", es: "¿Qué es una Violación?" },
        body: {
          en: "A breach is the unauthorized acquisition, access, use, or disclosure of PHI that compromises the security or privacy of the information.\n\nCommon FQHC breach scenarios:\n• EHR accessed by unauthorized staff (\"just curious\" about a neighbor's records)\n• Unencrypted laptop stolen from a provider's car\n• Misdirected fax with patient records sent to wrong number\n• Unshredded patient documents in regular trash\n• Verbal disclosure in a public area\n\nExceptions (NOT breaches):\n• Unintentional access by workforce in good faith, within scope of authority\n• Inadvertent disclosure within the organization\n• Good faith belief that the unauthorized person could not retain the information\n\nBreach assessment uses 4 factors:\n1. Nature and extent of PHI involved\n2. Who improperly accessed the PHI\n3. Whether PHI was actually acquired or viewed\n4. Extent to which risk has been mitigated",
          es: "Una violación es la adquisición, acceso, uso o divulgación no autorizada de PHI que compromete la seguridad o privacidad de la información.\n\nEscenarios comunes de violación en FQHC:\n• EHR accedido por personal no autorizado (\"solo curiosidad\" sobre los registros de un vecino)\n• Laptop sin cifrado robada del auto de un proveedor\n• Fax mal dirigido con registros de pacientes enviado a número equivocado\n• Documentos de pacientes sin triturar en basura regular\n• Divulgación verbal en área pública\n\nExcepciones (NO son violaciones):\n• Acceso involuntario por personal de buena fe, dentro del alcance de su autoridad\n• Divulgación inadvertida dentro de la organización\n• Creencia de buena fe de que la persona no autorizada no pudo retener la información\n\nLa evaluación de violación usa 4 factores:\n1. Naturaleza y alcance de la PHI involucrada\n2. Quién accedió indebidamente a la PHI\n3. Si la PHI fue realmente adquirida o vista\n4. Grado en que el riesgo ha sido mitigado",
        },
      },
    ],
    exercises: [
      // Ex 1: Mini-Quiz — Breach or not?
      {
        type: "mini-quiz",
        id: "hipaa-m3-ex1",
        questions: [
          {
            question: {
              en: "A nurse accidentally opens the wrong patient's chart in the EHR, immediately realizes the error, and closes it without reading any information. Is this a reportable breach?",
              es: "Una enfermera abre accidentalmente el expediente del paciente equivocado en el EHR, inmediatamente se da cuenta del error y lo cierra sin leer ninguna información. ¿Es esto una violación reportable?",
            },
            options: [
              { text: { en: "Yes — any unauthorized access is automatically a breach", es: "Sí — cualquier acceso no autorizado es automáticamente una violación" }, isCorrect: false, explanation: { en: "Not all unauthorized access is a breach. HIPAA provides specific exceptions for unintentional, good-faith access.", es: "No todo acceso no autorizado es una violación. HIPAA provee excepciones específicas para acceso involuntario de buena fe." } },
              { text: { en: "No — unintentional access in good faith is an exception", es: "No — acceso involuntario de buena fe es una excepción" }, isCorrect: true, explanation: { en: "Correct! This falls under the 'unintentional access by workforce member in good faith' exception. The nurse was acting within scope, and no PHI was acquired. However, it should still be documented internally.", es: "¡Correcto! Esto cae bajo la excepción de 'acceso involuntario por miembro del personal de buena fe'. La enfermera actuaba dentro de su alcance y no se adquirió PHI. Sin embargo, aún debe documentarse internamente." } },
              { text: { en: "It depends on the patient's insurance status", es: "Depende del estado de seguro del paciente" }, isCorrect: false, explanation: { en: "Insurance status has nothing to do with breach determination. The analysis focuses on the nature of the access itself.", es: "El estado de seguro no tiene nada que ver con la determinación de violación. El análisis se enfoca en la naturaleza del acceso en sí." } },
              { text: { en: "Only if the patient finds out", es: "Solo si el paciente se entera" }, isCorrect: false, explanation: { en: "Whether the patient discovers the access doesn't determine if it's a breach. The breach analysis is objective.", es: "Si el paciente descubre el acceso no determina si es una violación. El análisis de violación es objetivo." } },
            ],
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Drag-Sort — Breach Response Steps
      {
        type: "drag-sort",
        id: "hipaa-m3-ex2",
        instruction: {
          en: "Put the breach response steps in the correct order:",
          es: "Pon los pasos de respuesta a violación en el orden correcto:",
        },
        items: [
          { text: { en: "Discover and contain the breach", es: "Descubrir y contener la violación" }, correctPosition: 1 },
          { text: { en: "Conduct 4-factor risk assessment", es: "Realizar evaluación de riesgo de 4 factores" }, correctPosition: 2 },
          { text: { en: "Notify affected individuals within 60 days", es: "Notificar a individuos afectados dentro de 60 días" }, correctPosition: 3 },
          { text: { en: "Notify HHS (immediately if 500+, annual log if fewer)", es: "Notificar a HHS (inmediatamente si 500+, registro anual si menos)" }, correctPosition: 4 },
          { text: { en: "Implement corrective actions to prevent recurrence", es: "Implementar acciones correctivas para prevenir recurrencia" }, correctPosition: 5 },
        ],
        xpReward: 20,
      },
    ],
  },

  // ── Module 4: Your HIPAA Responsibilities ──
  {
    id: "hipaa-m4",
    order: 4,
    title: {
      en: "Your HIPAA Responsibilities",
      es: "Tus Responsabilidades HIPAA",
    },
    subtitle: {
      en: "Daily habits, patient requests, and reporting violations",
      es: "Hábitos diarios, solicitudes de pacientes y reporte de violaciones",
    },
    description: {
      en: "Practical daily habits to protect patient privacy at your FQHC.",
      es: "Hábitos diarios prácticos para proteger la privacidad del paciente en tu FQHC.",
    },
    icon: "UserCheck",
    color: "green",
    estimatedMinutes: 7,
    totalXP: 40,
    learningObjectives: [
      { en: "Practice secure workstation habits", es: "Practicar hábitos seguros de estación de trabajo" },
      { en: "Handle patient information requests properly", es: "Manejar solicitudes de información del paciente correctamente" },
      { en: "Report potential violations to the Privacy Officer", es: "Reportar posibles violaciones al Oficial de Privacidad" },
    ],
    conceptContent: [
      {
        heading: { en: "Daily HIPAA Habits", es: "Hábitos HIPAA Diarios" },
        body: {
          en: "Every staff member at an FQHC plays a role in protecting PHI. Here are the daily habits that matter most:\n\n✅ DO:\n• Lock your screen every time you step away (Ctrl+L or Win+L)\n• Use your own login credentials — never share passwords\n• Verify patient identity before sharing any information by phone\n• Use the shredder for all paper with patient information\n• Report suspicious access or potential breaches immediately\n• Keep voices down when discussing patients in clinical areas\n\n❌ DON'T:\n• Look up friends, family, or VIP patients out of curiosity\n• Text patient information on personal phones\n• Leave printed patient lists at the printer\n• Discuss patient cases in elevators, cafeterias, or parking lots\n• Forward patient emails to personal email accounts\n• Take photos of patient charts or screens\n\nRemember: HIPAA violations can result in civil penalties of $100-$50,000 per violation (up to $1.5M per year per category), and criminal penalties including imprisonment for knowing violations.",
          es: "Cada miembro del personal en un FQHC juega un papel en la protección de la PHI. Aquí están los hábitos diarios que más importan:\n\n✅ HAZ:\n• Bloquea tu pantalla cada vez que te alejes (Ctrl+L o Win+L)\n• Usa tus propias credenciales de inicio de sesión — nunca compartas contraseñas\n• Verifica la identidad del paciente antes de compartir cualquier información por teléfono\n• Usa la trituradora para todo papel con información del paciente\n• Reporta accesos sospechosos o posibles violaciones inmediatamente\n• Mantén la voz baja al discutir pacientes en áreas clínicas\n\n❌ NO HAGAS:\n• Buscar amigos, familiares o pacientes VIP por curiosidad\n• Enviar información del paciente por texto en teléfonos personales\n• Dejar listas impresas de pacientes en la impresora\n• Discutir casos de pacientes en elevadores, cafeterías o estacionamientos\n• Reenviar correos de pacientes a cuentas de correo personales\n• Tomar fotos de expedientes o pantallas de pacientes\n\nRecuerda: Las violaciones de HIPAA pueden resultar en sanciones civiles de $100-$50,000 por violación (hasta $1.5M por año por categoría), y sanciones penales incluyendo encarcelamiento por violaciones intencionales.",
        },
      },
    ],
    exercises: [
      // Ex 1: Mini-Quiz — Front desk scenario
      {
        type: "mini-quiz",
        id: "hipaa-m4-ex1",
        questions: [
          {
            question: {
              en: "You're a front desk staff member. A patient's spouse calls and says: 'I need to know what time my wife's appointment is today and what the doctor said at her last visit.' What do you do?",
              es: "Eres un empleado de recepción. El esposo de una paciente llama y dice: 'Necesito saber a qué hora es la cita de mi esposa hoy y qué dijo el doctor en su última visita.' ¿Qué haces?",
            },
            options: [
              { text: { en: "Share the appointment time and visit summary — they're married", es: "Compartir la hora de la cita y resumen de visita — están casados" }, isCorrect: false, explanation: { en: "Marriage does NOT automatically grant access to a spouse's PHI under HIPAA.", es: "El matrimonio NO otorga automáticamente acceso a la PHI del cónyuge bajo HIPAA." } },
              { text: { en: "Share the appointment time only but not the clinical details", es: "Compartir solo la hora de la cita pero no los detalles clínicos" }, isCorrect: false, explanation: { en: "Even appointment times are PHI. Without proper authorization, you cannot share any patient information.", es: "Incluso los horarios de citas son PHI. Sin autorización adecuada, no puedes compartir ninguna información del paciente." } },
              { text: { en: "Verify if there's a signed authorization on file, then share only what's authorized", es: "Verificar si hay una autorización firmada en archivo, luego compartir solo lo autorizado" }, isCorrect: true, explanation: { en: "Correct! You must check for a signed HIPAA authorization or personal representative designation before sharing any information.", es: "¡Correcto! Debes verificar si hay una autorización HIPAA firmada o designación de representante personal antes de compartir cualquier información." } },
              { text: { en: "Tell the spouse to ask his wife directly", es: "Decirle al esposo que pregunte directamente a su esposa" }, isCorrect: false, explanation: { en: "While this avoids the HIPAA issue, it's not the best customer service. Check for an authorization first, then direct them if none exists.", es: "Aunque esto evita el problema de HIPAA, no es el mejor servicio al cliente. Verifica primero si hay autorización, luego dirígelos si no existe." } },
            ],
          },
        ],
        xpReward: 20,
      },
      // Ex 2: Classifier — Good vs bad HIPAA habits
      {
        type: "classifier",
        id: "hipaa-m4-ex2",
        instruction: {
          en: "Sort each action: is it a HIPAA-compliant habit (✓) or a violation risk (✗)?",
          es: "Clasifica cada acción: ¿es un hábito compatible con HIPAA (✓) o un riesgo de violación (✗)?",
        },
        items: [
          {
            text: { en: "Locking your screen before stepping away from the EHR", es: "Bloquear tu pantalla antes de alejarte del EHR" },
            isGood: true,
            explanation: { en: "This is a fundamental HIPAA habit that prevents unauthorized viewing of ePHI.", es: "Este es un hábito fundamental de HIPAA que previene la visualización no autorizada de ePHI." },
          },
          {
            text: { en: "Looking up your neighbor's lab results because they asked you to", es: "Buscar los resultados de laboratorio de tu vecino porque te lo pidió" },
            isGood: false,
            explanation: { en: "This is unauthorized access even if they asked. Patients should request their own records through official channels.", es: "Esto es acceso no autorizado incluso si te lo pidieron. Los pacientes deben solicitar sus propios registros por canales oficiales." },
          },
          {
            text: { en: "Using the shredder for all paper with patient names or medical information", es: "Usar la trituradora para todo papel con nombres de pacientes o información médica" },
            isGood: true,
            explanation: { en: "Proper disposal of paper PHI prevents physical breaches.", es: "La eliminación adecuada de PHI en papel previene violaciones físicas." },
          },
          {
            text: { en: "Texting a provider a patient's lab result on your personal phone", es: "Enviar por texto los resultados de laboratorio de un paciente en tu teléfono personal" },
            isGood: false,
            explanation: { en: "Personal phones lack encryption and security controls. Use approved secure messaging systems only.", es: "Los teléfonos personales carecen de cifrado y controles de seguridad. Usa solo sistemas de mensajería segura aprobados." },
          },
          {
            text: { en: "Reporting a coworker who was browsing charts they had no care relationship with", es: "Reportar a un compañero que estaba navegando expedientes con los que no tenía relación de atención" },
            isGood: true,
            explanation: { en: "Reporting potential violations is your responsibility. You are protected from retaliation for good-faith reporting.", es: "Reportar posibles violaciones es tu responsabilidad. Estás protegido contra represalias por reportes de buena fe." },
          },
        ],
        xpReward: 20,
      },
    ],
  },
];

export const HIPAA_TOTAL_XP = HIPAA_MODULES.reduce((sum, m) => sum + m.totalXP, 0);

export const HIPAA_COURSE: AcademyCourseDefinition = {
  id: "hipaa-essentials",
  title: {
    en: "HIPAA Essentials for FQHC Staff",
    es: "Fundamentos HIPAA para Personal de FQHC",
  },
  subtitle: {
    en: "Protect patient privacy — the rules every FQHC worker must know",
    es: "Protege la privacidad del paciente — las reglas que todo trabajador de FQHC debe saber",
  },
  description: {
    en: "Protect patient privacy and meet HIPAA requirements. Covers Privacy Rule, Security Rule, breach response, and daily habits.",
    es: "Protege la privacidad del paciente y cumple los requisitos HIPAA. Cubre Regla de Privacidad, Regla de Seguridad, respuesta a violaciones y hábitos diarios.",
  },
  icon: "ShieldCheck",
  color: "teal",
  modules: HIPAA_MODULES,
  totalXP: HIPAA_TOTAL_XP,
  estimatedMinutes: 30,
  storageKey: "hipaa-essentials",
};
