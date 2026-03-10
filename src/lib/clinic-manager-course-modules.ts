// clinic-manager-course-modules.ts
// Clinic Manager Master Class — 8 modules covering FQHC operations
// Uses the generic Academy engine types for the CoursePlayer
// Last updated: 2026-03-10

import type {
  AcademyModule,
  AcademyExercise,
  AcademyCourseDefinition,
  BilingualText,
} from "./academy-types";

/* ================================================================== */
/*  Module 1: FQHC Revenue 101                                        */
/* ================================================================== */

const module1Revenue: AcademyModule = {
  id: "cm-revenue-101",
  order: 1,
  title: { en: "FQHC Revenue 101", es: "Ingresos FQHC 101" },
  subtitle: {
    en: "PPS, billing rules, payer mix — the financial engine of your clinic",
    es: "PPS, reglas de facturación, mezcla de pagadores — el motor financiero de tu clínica",
  },
  description: {
    en: "Understand how FQHCs get paid differently from every other healthcare provider. Master the Prospective Payment System, same-day billing rules, and payer mix strategy.",
    es: "Comprende cómo los FQHCs reciben pagos de manera diferente a cualquier otro proveedor de salud. Domina el Sistema de Pago Prospectivo, reglas de facturación de mismo día y estrategia de mezcla de pagadores.",
  },
  estimatedMinutes: 12,
  icon: "DollarSign",
  color: "teal",
  learningObjectives: [
    { en: "Explain how PPS differs from fee-for-service", es: "Explica cómo el PPS difiere del pago por servicio" },
    { en: "Identify the 3 same-day billing rules that impact revenue", es: "Identifica las 3 reglas de facturación de mismo día que impactan los ingresos" },
    { en: "Calculate the revenue impact of payer mix shifts", es: "Calcula el impacto en ingresos de los cambios en la mezcla de pagadores" },
  ],
  conceptContent: [
    {
      heading: { en: "The PPS Model — Why FQHCs Are Different", es: "El Modelo PPS — Por Qué los FQHCs Son Diferentes" },
      body: {
        en: `Unlike hospitals or private practices that bill per procedure (fee-for-service), FQHCs receive a flat per-visit rate called the Prospective Payment System (PPS) rate.

In California, the average PPS rate is $225–$275 per visit. This rate is the same whether the visit lasts 15 minutes or 60 minutes, and whether you run 2 labs or 20.

This changes everything about how you manage a clinic:
• Volume matters more than complexity — you earn the same PPS whether it's a simple med check or a complex chronic care visit
• No-shows are devastating — every missed appointment is $225+ in lost revenue with no way to recoup it
• Provider productivity (encounters per day) is the #1 lever for revenue
• The biggest revenue gain often comes from MA support that frees providers to see more patients, not from billing more procedures`,
        es: `A diferencia de hospitales o prácticas privadas que facturan por procedimiento, los FQHCs reciben una tarifa fija por visita llamada Sistema de Pago Prospectivo (PPS).

En California, la tarifa PPS promedio es de $225–$275 por visita. Esta tarifa es la misma si la visita dura 15 o 60 minutos, y si se ordenan 2 o 20 análisis.

Esto cambia todo sobre cómo manejas una clínica:
• El volumen importa más que la complejidad — ganas el mismo PPS si es un chequeo simple o una visita compleja
• Las citas perdidas son devastadoras — cada cita perdida son $225+ en ingresos perdidos sin forma de recuperarlos
• La productividad del proveedor (encuentros por día) es la palanca #1 para ingresos
• La mayor ganancia de ingresos a menudo viene del soporte de MA que libera a los proveedores para ver más pacientes`,
      },
    },
    {
      heading: { en: "Same-Day Billing: The Rules That Make or Break Revenue", es: "Facturación del Mismo Día: Las Reglas que Hacen o Deshacen los Ingresos" },
      body: {
        en: `Same-day billing rules determine when you can bill 2 PPS encounters in a single patient visit. Getting this right can increase revenue 15-25%.

Rule 1: Medical + Dental = 2 PPS (Both Payers)
A patient sees a PCP and a dentist on the same day → you bill 2 separate PPS encounters. This works for both Medi-Cal AND Medicare. This is why integrated dental is a revenue multiplier.

Rule 2: Medical + BH = 2 PPS (Medicare Only by Default)
A patient sees a PCP and a behavioral health provider on the same day → you bill 2 PPS encounters under Medicare. Under Medi-Cal, you can only bill 1 PPS UNLESS your FQHC is enrolled in the Alternative Payment Methodology (APM).

Rule 3: RN Visits Are NOT Independently Billable
An RN co-visit or nursing-only visit does NOT generate a separate PPS encounter. RN time must be "incident to" a provider visit. This is why the MA 1.5:1 model focuses on MAs, not RNs, for provider support.

APM Enrollment: If your FQHC enrolls in APM with DHCS, you unlock same-day BH billing under Medi-Cal — potentially worth $500K–$2M/year for a mid-size FQHC.`,
        es: `Las reglas de facturación del mismo día determinan cuándo puedes facturar 2 encuentros PPS en una sola visita del paciente. Hacer esto bien puede aumentar los ingresos 15-25%.

Regla 1: Médico + Dental = 2 PPS (Ambos Pagadores)
Un paciente ve a un PCP y un dentista el mismo día → facturas 2 encuentros PPS separados. Funciona tanto para Medi-Cal COMO para Medicare. Es por esto que el dental integrado es un multiplicador de ingresos.

Regla 2: Médico + Salud Mental = 2 PPS (Solo Medicare por Defecto)
Un paciente ve a un PCP y un proveedor de salud mental el mismo día → facturas 2 PPS bajo Medicare. Bajo Medi-Cal, solo puedes facturar 1 PPS A MENOS que tu FQHC esté inscrito en la Metodología de Pago Alternativa (APM).

Regla 3: Las Visitas de RN NO Son Facturables Independientemente
Una co-visita de RN o visita solo de enfermería NO genera un encuentro PPS separado.

Inscripción APM: Si tu FQHC se inscribe en APM con DHCS, desbloqueas la facturación de BH del mismo día bajo Medi-Cal — potencialmente $500K–$2M/año para un FQHC mediano.`,
      },
    },
    {
      heading: { en: "Payer Mix Strategy", es: "Estrategia de Mezcla de Pagadores" },
      body: {
        en: `Your payer mix — the percentage of patients covered by Medi-Cal, Medicare, commercial insurance, and self-pay — directly determines your revenue per encounter.

Typical California FQHC Payer Mix:
• Medi-Cal: 55-70% of patients (PPS rate ~$225)
• Medicare: 10-15% (PPS rate ~$180-200)
• Commercial/Private: 5-15% (negotiated rates, often higher than PPS)
• Uninsured/Self-Pay: 10-25% (sliding fee scale, much lower revenue)

The math is simple but the implications are huge:
• A clinic with 70% Medi-Cal and 5% commercial earns less per encounter than one with 55% Medi-Cal and 15% commercial
• Every 5% shift from uninsured to Medi-Cal can mean $200K-$400K more annual revenue for a mid-size clinic
• This is why enrollment navigators are revenue generators, not overhead — every patient they help get Medi-Cal coverage converts a $50 sliding-fee visit into a $225 PPS encounter`,
        es: `Tu mezcla de pagadores — el porcentaje de pacientes cubiertos por Medi-Cal, Medicare, seguro comercial y auto-pago — determina directamente tus ingresos por encuentro.

Mezcla de Pagadores Típica de FQHC en California:
• Medi-Cal: 55-70% de pacientes (tarifa PPS ~$225)
• Medicare: 10-15% (tarifa PPS ~$180-200)
• Comercial/Privado: 5-15% (tarifas negociadas, a menudo más altas que PPS)
• Sin seguro/Auto-pago: 10-25% (escala deslizante, ingresos mucho menores)

Las matemáticas son simples pero las implicaciones son enormes:
• Cada cambio del 5% de no asegurados a Medi-Cal puede significar $200K-$400K más en ingresos anuales
• Es por eso que los navegadores de inscripción son generadores de ingresos, no gastos generales — cada paciente que ayudan a obtener cobertura Medi-Cal convierte una visita de $50 en un encuentro PPS de $225`,
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "cm-rev-quiz-1",
      questions: [
        {
          question: {
            en: "What is the average PPS rate for FQHCs in California?",
            es: "¿Cuál es la tarifa PPS promedio para FQHCs en California?",
          },
          options: [
            { text: { en: "$50-$100 per visit", es: "$50-$100 por visita" }, isCorrect: false, explanation: { en: "That's closer to a sliding-fee-scale payment for uninsured patients.", es: "Eso se acerca más a un pago de escala deslizante para pacientes sin seguro." } },
            { text: { en: "$225-$275 per visit", es: "$225-$275 por visita" }, isCorrect: true, explanation: { en: "Correct! California FQHC PPS rates average $225-$275, regardless of visit complexity.", es: "¡Correcto! Las tarifas PPS de FQHC en California promedian $225-$275, sin importar la complejidad de la visita." } },
            { text: { en: "$500-$750 per visit", es: "$500-$750 por visita" }, isCorrect: false, explanation: { en: "This would be closer to emergency room rates. PPS is a flat per-visit rate.", es: "Esto sería más cercano a las tarifas de sala de emergencias." } },
            { text: { en: "It varies by CPT code", es: "Varía por código CPT" }, isCorrect: false, explanation: { en: "That's fee-for-service billing, not PPS. FQHCs get a flat rate per visit.", es: "Eso es facturación por servicio, no PPS. Los FQHCs reciben una tarifa fija por visita." } },
          ],
        },
        {
          question: {
            en: "Under Medi-Cal (without APM), can you bill 2 PPS encounters for a same-day medical + BH visit?",
            es: "Bajo Medi-Cal (sin APM), ¿puedes facturar 2 encuentros PPS por una visita médica + salud mental del mismo día?",
          },
          options: [
            { text: { en: "Yes, always", es: "Sí, siempre" }, isCorrect: false, explanation: { en: "Under standard Medi-Cal, same-day medical + BH only generates 1 PPS. You need APM enrollment to bill 2.", es: "Bajo Medi-Cal estándar, médico + salud mental del mismo día solo genera 1 PPS. Necesitas inscripción APM para facturar 2." } },
            { text: { en: "No — only with APM enrollment", es: "No — solo con inscripción APM" }, isCorrect: true, explanation: { en: "Correct! Standard Medi-Cal limits same-day medical + BH to 1 PPS. APM enrollment unlocks the second billing.", es: "¡Correcto! Medi-Cal estándar limita médico + BH del mismo día a 1 PPS. La inscripción APM desbloquea la segunda facturación." } },
            { text: { en: "Yes, but only for psychiatrists", es: "Sí, pero solo para psiquiatras" }, isCorrect: false, explanation: { en: "Provider type doesn't matter — the billing rule is about the payer methodology, not the clinician.", es: "El tipo de proveedor no importa — la regla de facturación es sobre la metodología del pagador." } },
          ],
        },
      ],
      xpReward: 25,
    } as AcademyExercise,
    {
      type: "classifier",
      id: "cm-rev-classifier-1",
      instruction: {
        en: "Classify each statement as TRUE or FALSE about FQHC billing:",
        es: "Clasifica cada afirmación como VERDADERA o FALSA sobre facturación FQHC:",
      },
      items: [
        {
          text: { en: "A longer, more complex visit earns a higher PPS rate", es: "Una visita más larga y compleja gana una tarifa PPS más alta" },
          isGood: false,
          explanation: { en: "False — PPS is a flat rate regardless of visit complexity or duration.", es: "Falso — PPS es una tarifa fija sin importar la complejidad o duración de la visita." },
        },
        {
          text: { en: "Medical + Dental same-day visits can bill 2 PPS under both Medi-Cal and Medicare", es: "Las visitas médica + dental del mismo día pueden facturar 2 PPS bajo Medi-Cal y Medicare" },
          isGood: true,
          explanation: { en: "True — This is one of the few same-day billing rules that works across all payers.", es: "Verdadero — Esta es una de las pocas reglas de facturación del mismo día que funciona con todos los pagadores." },
        },
        {
          text: { en: "RN-only visits generate a separate PPS encounter", es: "Las visitas solo de RN generan un encuentro PPS separado" },
          isGood: false,
          explanation: { en: "False — RN visits are 'incident to' provider visits and do not generate independent PPS billing.", es: "Falso — Las visitas de RN son 'incidentales a' las visitas del proveedor y no generan facturación PPS independiente." },
        },
        {
          text: { en: "Enrollment navigators can increase clinic revenue by converting uninsured to Medi-Cal patients", es: "Los navegadores de inscripción pueden aumentar los ingresos de la clínica convirtiendo pacientes sin seguro a Medi-Cal" },
          isGood: true,
          explanation: { en: "True — Converting a $50 sliding-fee patient to a $225 PPS Medi-Cal encounter is a massive revenue gain.", es: "Verdadero — Convertir un paciente de $50 en escala deslizante a un encuentro PPS de $225 es una ganancia masiva de ingresos." },
        },
      ],
      xpReward: 20,
    } as AcademyExercise,
  ],
  totalXP: 45,
};

/* ================================================================== */
/*  Module 2: Team-Based Care Design                                   */
/* ================================================================== */

const module2TeamCare: AcademyModule = {
  id: "cm-team-care",
  order: 2,
  title: { en: "Team-Based Care Design", es: "Diseño de Atención en Equipo" },
  subtitle: {
    en: "MA ratios, delegation, scope of practice — building the optimal care team",
    es: "Ratios de MA, delegación, alcance de práctica — construyendo el equipo de atención óptimo",
  },
  description: {
    en: "Learn the 1.5:1 MA-to-provider model, California scope-of-practice rules, and how to design care teams that maximize both quality and revenue.",
    es: "Aprende el modelo 1.5:1 de MA a proveedor, reglas de alcance de práctica en California, y cómo diseñar equipos de atención que maximicen calidad e ingresos.",
  },
  estimatedMinutes: 10,
  icon: "Users",
  color: "blue",
  learningObjectives: [
    { en: "Design a care team using the 1.5:1 MA-to-provider ratio", es: "Diseña un equipo de atención usando el ratio 1.5:1 de MA a proveedor" },
    { en: "Identify which tasks can be delegated to MAs vs. RNs in California", es: "Identifica qué tareas pueden delegarse a MAs vs. RNs en California" },
    { en: "Calculate the ROI of adding an MA to a provider team", es: "Calcula el ROI de agregar un MA a un equipo de proveedores" },
  ],
  conceptContent: [
    {
      heading: { en: "The 1.5:1 MA Model — Why It Works", es: "El Modelo 1.5:1 de MA — Por Qué Funciona" },
      body: {
        en: `The most effective FQHC care teams use a 1.5:1 MA-to-provider ratio. For every 2 providers, you need 3 MAs. Here's why:

With 1:1 staffing, the MA is constantly moving between rooming patients, documenting vitals, and assisting the provider. There's dead time when the provider is documenting and the MA is idle, or when a patient needs extra support and no MA is available.

At 1.5:1, one MA rooms the next patient while the other assists the current provider. This "leapfrog" pattern means:
• Zero provider downtime between patients (5-8 more encounters/day)
• Better documentation quality (MA pre-charts and closes notes)
• Higher patient satisfaction (no waiting in the room alone)
• Provider burnout reduction (less after-hours charting)

The math: Adding 1 MA at $42K salary enables a provider to see 5 more patients/day × $225 PPS × 250 days = $281K additional revenue. Net gain: $239K per year.

AltaMed, serving 465K patients across 60+ sites, uses this model system-wide. Their provider encounter rates are among the highest in California.`,
        es: `Los equipos de atención FQHC más efectivos usan un ratio de 1.5:1 de MA a proveedor. Por cada 2 proveedores, necesitas 3 MAs. Aquí está el porqué:

Con dotación 1:1, el MA constantemente se mueve entre preparar pacientes, documentar signos vitales y asistir al proveedor. Hay tiempo muerto cuando el proveedor documenta y el MA está inactivo.

A 1.5:1, un MA prepara al siguiente paciente mientras el otro asiste al proveedor actual. Este patrón de "salto de rana" significa:
• Cero tiempo muerto del proveedor entre pacientes (5-8 más encuentros/día)
• Mejor calidad de documentación
• Mayor satisfacción del paciente
• Reducción del agotamiento del proveedor

Las matemáticas: Agregar 1 MA a $42K de salario permite que un proveedor vea 5 pacientes más/día × $225 PPS × 250 días = $281K de ingresos adicionales. Ganancia neta: $239K por año.

AltaMed, sirviendo a 465K pacientes en 60+ sitios, usa este modelo en todo el sistema.`,
      },
    },
    {
      heading: { en: "California Scope of Practice — What MAs Can and Can't Do", es: "Alcance de Práctica en California — Qué Pueden y No Pueden Hacer los MAs" },
      body: {
        en: `In California, Medical Assistants (MAs) operate under BPC §2069 with specific delegation rules:

MAs CAN do (under provider supervision):
✓ Room patients and take vitals
✓ Administer medications (oral, topical, injectables per provider order)
✓ Perform simple lab draws (venipuncture, fingerstick glucose)
✓ Remove sutures and change dressings
✓ Apply/remove casts and splints
✓ Perform EKGs
✓ Administer immunizations per provider protocol

MAs CANNOT do:
✗ Perform patient assessments or nursing diagnoses
✗ Triage patients (determine acuity)
✗ Administer IV medications
✗ Interpret lab results or make care decisions
✗ Provide patient education independently (must be under provider protocol)

Key distinction from RNs: MAs perform tasks, RNs make clinical judgments. An MA can take a blood pressure reading; only an RN or provider can assess what that reading means and decide what to do about it.

This is why adding MAs (not RNs) is the revenue play — MAs cost $38-48K vs. RNs at $72-95K, and MAs can handle all the task-based work that slows providers down.`,
        es: `En California, los Asistentes Médicos (MAs) operan bajo BPC §2069 con reglas específicas de delegación:

Los MAs PUEDEN hacer (bajo supervisión del proveedor):
✓ Preparar pacientes y tomar signos vitales
✓ Administrar medicamentos (oral, tópico, inyectables por orden del proveedor)
✓ Realizar extracciones de laboratorio simples
✓ Remover suturas y cambiar vendajes
✓ Realizar EKGs
✓ Administrar inmunizaciones por protocolo del proveedor

Los MAs NO PUEDEN hacer:
✗ Realizar evaluaciones de pacientes o diagnósticos de enfermería
✗ Hacer triaje de pacientes
✗ Administrar medicamentos IV
✗ Interpretar resultados de laboratorio
✗ Proporcionar educación al paciente independientemente

Distinción clave de los RNs: Los MAs realizan tareas, los RNs hacen juicios clínicos.

Es por eso que agregar MAs (no RNs) es la jugada de ingresos — los MAs cuestan $38-48K vs. RNs a $72-95K.`,
      },
    },
  ],
  exercises: [
    {
      type: "classifier",
      id: "cm-team-classifier-1",
      instruction: {
        en: "Can an MA perform this task in California? Classify as YES or NO:",
        es: "¿Puede un MA realizar esta tarea en California? Clasifica como SÍ o NO:",
      },
      items: [
        { text: { en: "Take patient blood pressure and weight", es: "Tomar presión arterial y peso del paciente" }, isGood: true, explanation: { en: "Yes — vitals are a core MA task under BPC §2069.", es: "Sí — los signos vitales son una tarea central del MA." } },
        { text: { en: "Determine if a patient's symptoms are urgent or non-urgent (triage)", es: "Determinar si los síntomas del paciente son urgentes o no urgentes (triaje)" }, isGood: false, explanation: { en: "No — triage requires clinical judgment, which is an RN scope task.", es: "No — el triaje requiere juicio clínico, que es una tarea del alcance del RN." } },
        { text: { en: "Administer an immunization per standing protocol", es: "Administrar una inmunización por protocolo permanente" }, isGood: true, explanation: { en: "Yes — MAs can administer immunizations under provider protocol.", es: "Sí — los MAs pueden administrar inmunizaciones bajo protocolo del proveedor." } },
        { text: { en: "Start an IV line for medication administration", es: "Iniciar una línea IV para administración de medicamentos" }, isGood: false, explanation: { en: "No — IV procedures are beyond MA scope. This requires an RN or provider.", es: "No — los procedimientos IV están fuera del alcance del MA. Esto requiere un RN o proveedor." } },
        { text: { en: "Perform a venipuncture for a basic lab draw", es: "Realizar una venopunción para una extracción de laboratorio básica" }, isGood: true, explanation: { en: "Yes — venipuncture for lab draws is within MA scope.", es: "Sí — la venopunción para extracciones de laboratorio está dentro del alcance del MA." } },
      ],
      xpReward: 25,
    } as AcademyExercise,
    {
      type: "mini-quiz",
      id: "cm-team-quiz-1",
      questions: [
        {
          question: { en: "What is the recommended MA-to-provider ratio for optimal clinic efficiency?", es: "¿Cuál es el ratio recomendado de MA a proveedor para eficiencia óptima?" },
          options: [
            { text: { en: "1:1 — one MA per provider", es: "1:1 — un MA por proveedor" }, isCorrect: false, explanation: { en: "1:1 creates bottlenecks. The provider waits while the MA rooms the next patient.", es: "1:1 crea cuellos de botella. El proveedor espera mientras el MA prepara al siguiente paciente." } },
            { text: { en: "1.5:1 — three MAs per two providers", es: "1.5:1 — tres MAs por cada dos proveedores" }, isCorrect: true, explanation: { en: "Correct! The 1.5:1 'leapfrog' model eliminates provider downtime.", es: "¡Correcto! El modelo 1.5:1 de 'salto de rana' elimina el tiempo muerto del proveedor." } },
            { text: { en: "2:1 — two MAs per provider", es: "2:1 — dos MAs por proveedor" }, isCorrect: false, explanation: { en: "2:1 creates MA idle time. The sweet spot is 1.5:1.", es: "2:1 crea tiempo inactivo del MA. El punto óptimo es 1.5:1." } },
          ],
        },
      ],
      xpReward: 15,
    } as AcademyExercise,
  ],
  totalXP: 40,
};

/* ================================================================== */
/*  Module 3: Scheduling for Revenue                                   */
/* ================================================================== */

const module3Scheduling: AcademyModule = {
  id: "cm-scheduling",
  order: 3,
  title: { en: "Scheduling for Revenue", es: "Programación para Ingresos" },
  subtitle: {
    en: "Encounters, hours, no-shows, shift patterns — the levers that drive revenue",
    es: "Encuentros, horarios, citas perdidas, patrones de turno — las palancas que impulsan los ingresos",
  },
  description: {
    en: "Master scheduling strategies that directly impact your bottom line. Learn how to optimize provider schedules, reduce no-show rates, and design shift patterns that maximize encounters.",
    es: "Domina las estrategias de programación que impactan directamente tus resultados. Aprende a optimizar los horarios de los proveedores, reducir las tasas de citas perdidas y diseñar patrones de turno que maximicen los encuentros.",
  },
  estimatedMinutes: 10,
  icon: "Calendar",
  color: "indigo",
  learningObjectives: [
    { en: "Calculate the revenue impact of no-show rates", es: "Calcula el impacto en ingresos de las tasas de citas perdidas" },
    { en: "Design optimal provider shift patterns", es: "Diseña patrones de turno óptimos para proveedores" },
    { en: "Identify 3 scheduling tactics that increase daily encounters", es: "Identifica 3 tácticas de programación que aumenten los encuentros diarios" },
  ],
  conceptContent: [
    {
      heading: { en: "No-Show Rate: Your Revenue Killer", es: "Tasa de Citas Perdidas: Tu Asesino de Ingresos" },
      body: {
        en: `The average FQHC no-show rate is 18-25%. For a mid-size clinic with 5 providers seeing 18 patients/day:

At 20% no-show rate:
• 18 scheduled × 5 providers = 90 daily slots
• 20% no-show = 18 empty slots per day
• 18 × $225 PPS = $4,050 lost revenue per day
• $4,050 × 250 working days = $1,012,500 lost revenue per year

Reducing no-shows from 20% to 12% saves $405K/year.

Proven no-show reduction strategies:
1. Two-touch reminder system: Text 48 hours before + call 2 hours before (reduces no-shows 30-40%)
2. Same-day open access: Reserve 20-30% of slots for same-day scheduling (patients who call today are much less likely to no-show)
3. Overbooking science: Overbook 15-20% based on historical no-show data, with a float MA to handle surges
4. Transportation barrier removal: Partner with ride-share programs or community transport
5. Morning vs. afternoon patterns: No-shows typically spike in afternoon — front-load complex visits

The key insight: No-show reduction is a scheduling problem, not a patient compliance problem.`,
        es: `La tasa promedio de citas perdidas en FQHCs es 18-25%. Para una clínica mediana con 5 proveedores viendo 18 pacientes/día:

A 20% de tasa de citas perdidas:
• 18 programados × 5 proveedores = 90 espacios diarios
• 20% citas perdidas = 18 espacios vacíos por día
• 18 × $225 PPS = $4,050 ingresos perdidos por día
• $4,050 × 250 días laborables = $1,012,500 ingresos perdidos por año

Reducir las citas perdidas de 20% a 12% ahorra $405K/año.

Estrategias comprobadas de reducción:
1. Sistema de recordatorio de dos contactos (reduce 30-40%)
2. Acceso abierto del mismo día: Reservar 20-30% de espacios para programación del mismo día
3. Ciencia de sobreprogramación: Sobreprogramar 15-20% basado en datos históricos
4. Eliminación de barreras de transporte
5. Patrones de mañana vs. tarde: Las citas perdidas típicamente se disparan en la tarde`,
      },
    },
    {
      heading: { en: "Shift Pattern Optimization", es: "Optimización de Patrones de Turno" },
      body: {
        en: `Provider shift patterns directly determine your revenue ceiling. Here are the most effective models:

Standard Model (M-F 8-5):
• 8 hours × 2.25 encounters/hour = 18 encounters/day/provider
• Revenue: 18 × $225 = $4,050/day/provider
• Annual: $4,050 × 250 = $1,012,500/provider

Extended Hours Model (M-F 8-7, Sat 8-1):
• Adds 2 hours/day (4 more encounters) + Saturday (9 encounters)
• Revenue gain: 24 additional encounters/week × $225 = $5,400/week
• Annual gain: $280,800/provider (but requires OT or staggered shifts)

Staggered Shift Model (7-4 / 9-6 / 10-7):
• Covers 7am-7pm without overtime
• Captures early-morning and after-work patients
• Reduces provider burnout (choice of preferred hours)
• Typically increases daily encounters by 20-30%

Saturday Clinic (8-1):
• 5 hours = 11 encounters
• Revenue: 11 × $225 = $2,475/Saturday
• Annual: $2,475 × 50 = $123,750 per provider on rotation

The highest-performing FQHCs combine staggered shifts + Saturday clinic + overbooking to maximize encounters.`,
        es: `Los patrones de turno de los proveedores determinan directamente tu techo de ingresos.

Modelo Estándar (L-V 8-5):
• 8 horas × 2.25 encuentros/hora = 18 encuentros/día/proveedor
• Ingresos: 18 × $225 = $4,050/día/proveedor

Modelo de Horario Extendido (L-V 8-7, Sáb 8-1):
• Agrega 2 horas/día (4 más encuentros) + Sábado (9 encuentros)
• Ganancia anual: $280,800/proveedor

Modelo de Turno Escalonado (7-4 / 9-6 / 10-7):
• Cubre 7am-7pm sin horas extra
• Captura pacientes de mañana temprano y después del trabajo
• Típicamente aumenta los encuentros diarios 20-30%

Clínica de Sábado (8-1):
• 5 horas = 11 encuentros
• Ingresos: 11 × $225 = $2,475/sábado
• Anual: $123,750 por proveedor en rotación`,
      },
    },
  ],
  exercises: [
    {
      type: "scoring-sim",
      id: "cm-sched-sim-1",
      instruction: {
        en: "Calculate the revenue impact of these scheduling changes. Score how close the estimate is (0.0-1.0 accuracy):",
        es: "Calcula el impacto en ingresos de estos cambios de programación. Puntúa qué tan cercana es la estimación (precisión 0.0-1.0):",
      },
      scenarios: [
        {
          keyResult: { en: "Reduce no-show rate from 22% to 14% (5 providers, 18 slots/day, $225 PPS)", es: "Reducir tasa de citas perdidas de 22% a 14% (5 proveedores, 18 espacios/día, $225 PPS)" },
          target: "$405,000 annual revenue gain",
          actual: "$405,000",
          correctScore: 0.8,
          explanation: { en: "8% reduction × 90 daily slots = 7.2 more daily encounters × $225 × 250 days = $405,000", es: "8% de reducción × 90 espacios diarios = 7.2 más encuentros diarios × $225 × 250 días = $405,000" },
        },
        {
          keyResult: { en: "Add Saturday clinic (8-1) with 2 providers on rotation", es: "Agregar clínica de sábado (8-1) con 2 proveedores en rotación" },
          target: "$247,500 annual revenue gain",
          actual: "$247,500",
          correctScore: 0.7,
          explanation: { en: "2 providers × 11 encounters × $225 × 50 Saturdays = $247,500", es: "2 proveedores × 11 encuentros × $225 × 50 sábados = $247,500" },
        },
      ],
      xpReward: 30,
    } as AcademyExercise,
  ],
  totalXP: 30,
};

/* ================================================================== */
/*  Module 4: BH & Dental Integration                                  */
/* ================================================================== */

const module4Integration: AcademyModule = {
  id: "cm-integration",
  order: 4,
  title: { en: "BH & Dental Integration", es: "Integración de Salud Mental y Dental" },
  subtitle: {
    en: "Same-day billing, warm handoffs, and building a truly integrated clinic",
    es: "Facturación del mismo día, transferencias directas y construcción de una clínica verdaderamente integrada",
  },
  description: {
    en: "Master the operational and billing complexities of integrating behavioral health and dental services into primary care — the model that can double your per-patient revenue.",
    es: "Domina las complejidades operativas y de facturación de integrar servicios de salud mental y dental en la atención primaria.",
  },
  estimatedMinutes: 10,
  icon: "HeartPulse",
  color: "purple",
  learningObjectives: [
    { en: "Design warm handoff workflows for BH integration", es: "Diseña flujos de trabajo de transferencia directa para integración de salud mental" },
    { en: "Calculate the revenue impact of APM enrollment", es: "Calcula el impacto en ingresos de la inscripción APM" },
    { en: "Structure same-day dental scheduling to maximize dual billing", es: "Estructura la programación dental del mismo día para maximizar la doble facturación" },
  ],
  conceptContent: [
    {
      heading: { en: "The Integrated Care Model — Revenue Multiplier", es: "El Modelo de Atención Integrada — Multiplicador de Ingresos" },
      body: {
        en: `An FQHC with integrated medical, behavioral health, and dental services can generate 2-3× the revenue per patient visit compared to medical-only.

Single medical visit: 1 PPS = $225
Medical + Dental same day: 2 PPS = $450
Medical + BH same day (with APM): 2 PPS = $450
Medical + Dental + BH same day: 3 PPS = $675

The "warm handoff" model is key: When a provider identifies a patient who could benefit from BH or dental, they introduce the patient to the BH or dental provider in real-time. The patient walks down the hall, not to a separate appointment weeks later.

Warm handoff success rates:
• Traditional referral (schedule for later): 30-40% follow-through
• Warm handoff (same-day, same clinic): 85-90% follow-through

For a clinic seeing 100 patients/day, if 20% get a warm handoff to BH or dental:
• 20 additional same-day encounters × $225 PPS = $4,500/day
• Annual: $4,500 × 250 = $1,125,000 additional revenue

This is why integration isn't just better care — it's a business imperative.`,
        es: `Un FQHC con servicios médicos, de salud mental y dental integrados puede generar 2-3× los ingresos por visita de paciente comparado con solo servicios médicos.

Visita médica única: 1 PPS = $225
Médica + Dental mismo día: 2 PPS = $450
Médica + Salud Mental mismo día (con APM): 2 PPS = $450
Médica + Dental + Salud Mental mismo día: 3 PPS = $675

El modelo de "transferencia directa" es clave: Cuando un proveedor identifica un paciente que podría beneficiarse, lo presenta al proveedor de salud mental o dental en tiempo real.

Tasas de éxito:
• Referencia tradicional (programar después): 30-40% de seguimiento
• Transferencia directa (mismo día, misma clínica): 85-90% de seguimiento

Para una clínica que ve 100 pacientes/día, si 20% obtienen una transferencia directa:
• 20 encuentros adicionales × $225 PPS = $4,500/día
• Anual: $4,500 × 250 = $1,125,000 ingresos adicionales`,
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "cm-integ-quiz-1",
      questions: [
        {
          question: { en: "What is the typical follow-through rate for warm handoffs vs. traditional referrals?", es: "¿Cuál es la tasa típica de seguimiento para transferencias directas vs. referencias tradicionales?" },
          options: [
            { text: { en: "Warm handoff: 50%, Traditional: 25%", es: "Directa: 50%, Tradicional: 25%" }, isCorrect: false, explanation: { en: "The gap is bigger than this — warm handoffs are dramatically more effective.", es: "La brecha es más grande que esto." } },
            { text: { en: "Warm handoff: 85-90%, Traditional: 30-40%", es: "Directa: 85-90%, Tradicional: 30-40%" }, isCorrect: true, explanation: { en: "Correct! This 2-3× improvement is why same-day warm handoffs are the gold standard.", es: "¡Correcto! Esta mejora de 2-3× es por qué las transferencias directas son el estándar de oro." } },
            { text: { en: "Both are about the same (~60%)", es: "Ambas son similares (~60%)" }, isCorrect: false, explanation: { en: "Not at all. Warm handoffs dramatically outperform traditional referrals.", es: "Para nada. Las transferencias directas superan dramáticamente las referencias tradicionales." } },
          ],
        },
      ],
      xpReward: 15,
    } as AcademyExercise,
  ],
  totalXP: 15,
};

/* ================================================================== */
/*  Module 5: ECM & CalAIM Operations                                  */
/* ================================================================== */

const module5Ecm: AcademyModule = {
  id: "cm-ecm-calaim",
  order: 5,
  title: { en: "ECM & CalAIM Operations", es: "Operaciones ECM y CalAIM" },
  subtitle: {
    en: "Enrollment, coordination, PMPM revenue — California's care management revolution",
    es: "Inscripción, coordinación, ingresos PMPM — la revolución de gestión de atención de California",
  },
  description: {
    en: "Navigate California's Enhanced Care Management (ECM) program under CalAIM. Learn enrollment strategies, PMPM revenue modeling, and operational workflows.",
    es: "Navega el programa de Gestión de Atención Mejorada (ECM) de California bajo CalAIM. Aprende estrategias de inscripción, modelado de ingresos PMPM y flujos de trabajo operacionales.",
  },
  estimatedMinutes: 10,
  icon: "Shield",
  color: "cyan",
  learningObjectives: [
    { en: "Explain the ECM enrollment process and eligibility criteria", es: "Explica el proceso de inscripción ECM y los criterios de elegibilidad" },
    { en: "Calculate PMPM revenue for different ECM populations", es: "Calcula los ingresos PMPM para diferentes poblaciones ECM" },
    { en: "Design ECM workflows that maximize enrollment rates", es: "Diseña flujos de trabajo ECM que maximicen las tasas de inscripción" },
  ],
  conceptContent: [
    {
      heading: { en: "What Is ECM? — The Revenue Opportunity", es: "¿Qué es ECM? — La Oportunidad de Ingresos" },
      body: {
        en: `Enhanced Care Management (ECM) is California's approach to coordinating care for Medi-Cal members with complex needs. Under CalAIM, FQHCs can earn Per Member Per Month (PMPM) payments — a recurring revenue stream on top of PPS visit revenue.

ECM-eligible populations (Populations of Focus):
• Adults with SMI/SUD living unsheltered or at risk
• Adults/children with complex conditions and high utilization
• Adults transitioning from incarceration
• Children/youth with complex trauma or in foster care
• Individuals at risk for institutionalization
• Pregnant/postpartum with SUD

PMPM rates range from $150-$400/month depending on the managed care plan and population.

Revenue example for a mid-size FQHC:
• 200 patients enrolled in ECM at average $250 PMPM
• Monthly: 200 × $250 = $50,000
• Annual: $50,000 × 12 = $600,000 in PMPM revenue
• PLUS regular PPS visit revenue for those same patients

This is revenue that comes every month whether the patient visits or not — a predictable, recurring stream that stabilizes your budget.`,
        es: `La Gestión de Atención Mejorada (ECM) es el enfoque de California para coordinar la atención de miembros de Medi-Cal con necesidades complejas. Bajo CalAIM, los FQHCs pueden ganar pagos Por Miembro Por Mes (PMPM) — un flujo de ingresos recurrente además de los ingresos por visitas PPS.

Las tarifas PMPM varían de $150-$400/mes dependiendo del plan de atención administrada y la población.

Ejemplo de ingresos para un FQHC mediano:
• 200 pacientes inscritos en ECM a promedio de $250 PMPM
• Mensual: 200 × $250 = $50,000
• Anual: $50,000 × 12 = $600,000 en ingresos PMPM
• MÁS ingresos regulares de visitas PPS para esos mismos pacientes

Estos son ingresos que llegan cada mes sin importar si el paciente visita o no — un flujo predecible y recurrente que estabiliza tu presupuesto.`,
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "cm-ecm-quiz-1",
      questions: [
        {
          question: { en: "ECM revenue (PMPM payments) is paid...", es: "Los ingresos ECM (pagos PMPM) se pagan..." },
          options: [
            { text: { en: "Only when the patient visits the clinic", es: "Solo cuando el paciente visita la clínica" }, isCorrect: false, explanation: { en: "No — PMPM is per month, not per visit. It's paid regardless of visits.", es: "No — PMPM es por mes, no por visita. Se paga sin importar las visitas." } },
            { text: { en: "Monthly, regardless of whether the patient visits", es: "Mensualmente, sin importar si el paciente visita" }, isCorrect: true, explanation: { en: "Correct! PMPM is a recurring monthly payment, providing predictable revenue.", es: "¡Correcto! PMPM es un pago mensual recurrente, proporcionando ingresos predecibles." } },
            { text: { en: "Annually as a lump sum", es: "Anualmente como suma global" }, isCorrect: false, explanation: { en: "No — PMPM payments flow monthly, not annually.", es: "No — los pagos PMPM fluyen mensualmente, no anualmente." } },
          ],
        },
      ],
      xpReward: 15,
    } as AcademyExercise,
  ],
  totalXP: 15,
};

/* ================================================================== */
/*  Module 6: Workforce Retention                                      */
/* ================================================================== */

const module6Retention: AcademyModule = {
  id: "cm-retention",
  order: 6,
  title: { en: "Workforce Retention", es: "Retención de Personal" },
  subtitle: {
    en: "Burnout prevention, career ladders, SB 525, and keeping your best people",
    es: "Prevención del agotamiento, escalas de carrera, SB 525 y mantener a tu mejor equipo",
  },
  description: {
    en: "FQHC turnover costs $50-100K per clinical position. Learn strategies to retain staff, navigate California's healthcare minimum wage law, and build career ladders that keep talent.",
    es: "La rotación en FQHCs cuesta $50-100K por posición clínica. Aprende estrategias para retener personal, navegar la ley de salario mínimo de salud y construir escalas de carrera.",
  },
  estimatedMinutes: 8,
  icon: "Heart",
  color: "rose",
  learningObjectives: [
    { en: "Calculate the true cost of clinical staff turnover", es: "Calcula el costo real de la rotación de personal clínico" },
    { en: "Design career ladders for 3+ clinical roles", es: "Diseña escalas de carrera para 3+ roles clínicos" },
    { en: "Prepare for SB 525 wage compression impacts", es: "Prepárate para los impactos de compresión salarial de SB 525" },
  ],
  conceptContent: [
    {
      heading: { en: "SB 525: California's Healthcare Minimum Wage", es: "SB 525: El Salario Mínimo de Salud de California" },
      body: {
        en: `California's SB 525 established a healthcare minimum wage floor that phases in over several years:
• June 2024: $21/hour
• 2025: $22/hour
• 2026: $23/hour (current)
• 2027: $25/hour (full implementation)

For FQHCs, the impact goes far beyond the front desk:

Wage Compression Problem: When entry-level wages rise to $25/hr, experienced MAs earning $24-26/hr expect raises too. Same for LVNs at $28/hr — the gap between "new hire" and "5-year veteran" shrinks to nearly nothing.

Estimated total labor cost increase: 12-18% for a typical FQHC by 2027.

Budget Planning Strategy:
1. Map every position against the SB 525 timeline
2. Build wage compression adjustments into 2026-2027 budgets NOW
3. Identify productivity gains to offset costs (MA 1.5:1 model, scheduling optimization)
4. Renegotiate managed care contracts with labor cost data
5. Use NHSC loan repayment as a non-cash retention tool for providers`,
        es: `El SB 525 de California estableció un piso de salario mínimo de salud:
• Junio 2024: $21/hora
• 2025: $22/hora
• 2026: $23/hora (actual)
• 2027: $25/hora (implementación completa)

Problema de Compresión Salarial: Cuando los salarios de nivel de entrada suben a $25/hr, los MAs experimentados que ganan $24-26/hr esperan aumentos también.

Aumento estimado del costo total de mano de obra: 12-18% para un FQHC típico para 2027.

Estrategia de Planificación Presupuestaria:
1. Mapear cada posición contra la línea de tiempo de SB 525
2. Incorporar ajustes de compresión salarial en los presupuestos 2026-2027 AHORA
3. Identificar ganancias de productividad para compensar costos
4. Renegociar contratos de atención administrada con datos de costos laborales
5. Usar el pago de préstamos NHSC como herramienta de retención sin efectivo`,
      },
    },
    {
      heading: { en: "Career Ladders That Retain Talent", es: "Escalas de Carrera que Retienen Talento" },
      body: {
        en: `The #1 reason FQHC staff leave: "I don't see a future here." Career ladders fix this.

MA Career Ladder:
Level 1: Entry MA ($38-42K) → Room patients, vitals, basic tasks
Level 2: Senior MA ($42-48K) → Lead MA duties, train new hires, pre-charting
Level 3: MA Supervisor ($48-55K) → Manage MA team, workflow design
Level 4: Practice Manager ($55-70K) → Full clinic operations

CHW Career Ladder:
Level 1: CHW ($40-50K) → Community outreach, enrollment assistance
Level 2: Senior CHW ($50-60K) → ECM care coordination, complex cases
Level 3: CHW Supervisor ($60-70K) → Lead CHW team, program design
Level 4: Program Manager ($70-90K) → Multi-program oversight

The key principle: Every role should have a visible "next step" that doesn't require leaving for another employer. Tuition assistance for relevant certifications (CHW certification, MA to LVN bridge programs) makes the ladder concrete.

Cost of retention vs. turnover:
• Career ladder annual cost: ~$3-5K per employee in wage increases
• Cost to replace one MA: $15-20K (recruiting, training, lost productivity)
• Cost to replace one provider: $80-150K`,
        es: `La razón #1 por la que el personal de FQHC se va: "No veo un futuro aquí." Las escalas de carrera arreglan esto.

Escala de Carrera de MA:
Nivel 1: MA de Entrada ($38-42K)
Nivel 2: MA Senior ($42-48K)
Nivel 3: Supervisor de MA ($48-55K)
Nivel 4: Gerente de Práctica ($55-70K)

Escala de Carrera de CHW:
Nivel 1: CHW ($40-50K)
Nivel 2: CHW Senior ($50-60K)
Nivel 3: Supervisor de CHW ($60-70K)
Nivel 4: Gerente de Programa ($70-90K)

Principio clave: Cada rol debe tener un "siguiente paso" visible que no requiera irse a otro empleador.

Costo de retención vs. rotación:
• Costo anual de escala de carrera: ~$3-5K por empleado
• Costo de reemplazar un MA: $15-20K
• Costo de reemplazar un proveedor: $80-150K`,
      },
    },
  ],
  exercises: [
    {
      type: "drag-sort",
      id: "cm-retention-sort-1",
      instruction: {
        en: "Rank these retention strategies from highest to lowest impact (based on research):",
        es: "Ordena estas estrategias de retención de mayor a menor impacto (basado en investigación):",
      },
      items: [
        { text: { en: "Career ladder with clear advancement path", es: "Escala de carrera con camino claro de avance" }, correctPosition: 1 },
        { text: { en: "Flexible scheduling / shift choice", es: "Horarios flexibles / elección de turno" }, correctPosition: 2 },
        { text: { en: "Tuition reimbursement for certifications", es: "Reembolso de matrícula para certificaciones" }, correctPosition: 3 },
        { text: { en: "Annual salary increase above inflation", es: "Aumento salarial anual por encima de la inflación" }, correctPosition: 4 },
      ],
      xpReward: 20,
    } as AcademyExercise,
  ],
  totalXP: 20,
};

/* ================================================================== */
/*  Module 7: Financial Modeling Workshop                               */
/* ================================================================== */

const module7Financial: AcademyModule = {
  id: "cm-financial-modeling",
  order: 7,
  title: { en: "Financial Modeling Workshop", es: "Taller de Modelado Financiero" },
  subtitle: {
    en: "Build your clinic's financial model using the Clinic Simulator",
    es: "Construye el modelo financiero de tu clínica usando el Simulador de Clínica",
  },
  description: {
    en: "Apply everything you've learned in a hands-on financial modeling exercise. Use the Clinic Simulator to build, test, and optimize your clinic's staffing and revenue model.",
    es: "Aplica todo lo aprendido en un ejercicio práctico de modelado financiero. Usa el Simulador de Clínica para construir, probar y optimizar el modelo de personal e ingresos de tu clínica.",
  },
  estimatedMinutes: 15,
  icon: "Calculator",
  color: "amber",
  learningObjectives: [
    { en: "Build a staffing model for a mid-size FQHC", es: "Construye un modelo de personal para un FQHC mediano" },
    { en: "Analyze the revenue impact of staffing changes", es: "Analiza el impacto en ingresos de los cambios de personal" },
    { en: "Identify the top 3 revenue levers for your clinic", es: "Identifica las 3 principales palancas de ingresos para tu clínica" },
  ],
  conceptContent: [
    {
      heading: { en: "The Clinic Financial Model — Key Variables", es: "El Modelo Financiero de la Clínica — Variables Clave" },
      body: {
        en: `Every FQHC's financial model comes down to a few key variables. Understanding these lets you predict the impact of any operational change:

Revenue Side:
• Providers × Encounters/Day × PPS Rate × Working Days = Base Revenue
• + Same-Day BH/Dental Encounters × PPS Rate = Integration Revenue
• + ECM Enrolled × PMPM Rate × 12 = ECM Revenue
• − No-Show Rate Impact = Lost Revenue

Cost Side:
• Provider Salaries + Benefits (largest cost, typically 55-65% of budget)
• Support Staff (MAs, RNs, front desk)
• Facility (rent, utilities, maintenance)
• Supplies, Technology, Insurance

Key Ratios to Track:
• Cost per encounter (target: $150-$200)
• Revenue per encounter (target: PPS rate $225+)
• Gross margin per encounter (target: $50-$75)
• Provider productivity (target: 18-22 encounters/day)
• No-show rate (target: <15%)
• MA:Provider ratio (target: 1.5:1)

Try it yourself: Use the Clinic Simulator tool to model your own clinic's numbers and experiment with different staffing configurations.`,
        es: `El modelo financiero de cada FQHC se reduce a unas pocas variables clave:

Lado de Ingresos:
• Proveedores × Encuentros/Día × Tarifa PPS × Días Laborales = Ingresos Base
• + Encuentros BH/Dental del Mismo Día × Tarifa PPS = Ingresos de Integración
• + Inscritos ECM × Tarifa PMPM × 12 = Ingresos ECM
• − Impacto de Tasa de Citas Perdidas = Ingresos Perdidos

Ratios Clave a Seguir:
• Costo por encuentro (meta: $150-$200)
• Ingresos por encuentro (meta: tarifa PPS $225+)
• Productividad del proveedor (meta: 18-22 encuentros/día)
• Tasa de citas perdidas (meta: <15%)
• Ratio MA:Proveedor (meta: 1.5:1)

Pruébalo: Usa el Simulador de Clínica para modelar los números de tu propia clínica.`,
      },
    },
  ],
  exercises: [
    {
      type: "mini-quiz",
      id: "cm-financial-quiz-1",
      questions: [
        {
          question: { en: "For a 5-provider clinic with 18 encounters/day at $225 PPS and 250 working days, what is the annual base revenue?", es: "Para una clínica con 5 proveedores con 18 encuentros/día a $225 PPS y 250 días laborales, ¿cuál es el ingreso base anual?" },
          options: [
            { text: { en: "$3,375,000", es: "$3,375,000" }, isCorrect: false, explanation: { en: "Close but check the math: 5 × 18 × $225 × 250 = $5,062,500", es: "Cerca pero revisa: 5 × 18 × $225 × 250 = $5,062,500" } },
            { text: { en: "$5,062,500", es: "$5,062,500" }, isCorrect: true, explanation: { en: "Correct! 5 providers × 18 encounters × $225 × 250 days = $5,062,500", es: "¡Correcto! 5 proveedores × 18 encuentros × $225 × 250 días = $5,062,500" } },
            { text: { en: "$6,750,000", es: "$6,750,000" }, isCorrect: false, explanation: { en: "Too high. This would require 24 encounters/day/provider.", es: "Demasiado alto. Esto requeriría 24 encuentros/día/proveedor." } },
          ],
        },
        {
          question: { en: "What is the target cost per encounter for an efficient FQHC?", es: "¿Cuál es el costo meta por encuentro para un FQHC eficiente?" },
          options: [
            { text: { en: "$50-$100", es: "$50-$100" }, isCorrect: false, explanation: { en: "Too low — this doesn't cover provider salaries and overhead.", es: "Demasiado bajo — esto no cubre los salarios de proveedores y gastos generales." } },
            { text: { en: "$150-$200", es: "$150-$200" }, isCorrect: true, explanation: { en: "Correct! $150-$200 cost per encounter with $225+ PPS gives a healthy margin.", es: "¡Correcto! $150-$200 de costo por encuentro con PPS de $225+ da un margen saludable." } },
            { text: { en: "$300-$400", es: "$300-$400" }, isCorrect: false, explanation: { en: "This would mean you're losing money on every encounter at $225 PPS.", es: "Esto significaría que estás perdiendo dinero en cada encuentro a $225 PPS." } },
          ],
        },
      ],
      xpReward: 20,
    } as AcademyExercise,
  ],
  totalXP: 20,
};

/* ================================================================== */
/*  Module 8: Capstone — Build Your Clinic Plan                        */
/* ================================================================== */

const module8Capstone: AcademyModule = {
  id: "cm-capstone",
  order: 8,
  title: { en: "Capstone: Build Your Clinic Plan", es: "Capstone: Construye Tu Plan de Clínica" },
  subtitle: {
    en: "Apply everything — create a 90-day operational improvement plan",
    es: "Aplica todo — crea un plan de mejora operacional de 90 días",
  },
  description: {
    en: "Synthesize all 7 modules into a concrete 90-day plan for your clinic. Use the Schedule Planner and Clinic Simulator to model your improvements, then export your plan.",
    es: "Sintetiza los 7 módulos en un plan concreto de 90 días para tu clínica. Usa el Planificador de Horarios y el Simulador de Clínica para modelar tus mejoras.",
  },
  estimatedMinutes: 15,
  icon: "Award",
  color: "green",
  learningObjectives: [
    { en: "Create a 90-day clinic improvement plan with specific targets", es: "Crea un plan de mejora de clínica de 90 días con metas específicas" },
    { en: "Prioritize changes by revenue impact and implementation difficulty", es: "Prioriza cambios por impacto en ingresos y dificultad de implementación" },
    { en: "Present your plan in an executive summary format", es: "Presenta tu plan en formato de resumen ejecutivo" },
  ],
  conceptContent: [
    {
      heading: { en: "Your 90-Day Framework", es: "Tu Marco de 90 Días" },
      body: {
        en: `The best clinic managers don't try to change everything at once. The 90-day framework focuses your energy:

Days 1-30 — Quick Wins (Low effort, high impact):
□ Implement 2-touch reminder system (reduce no-shows 30%)
□ Enable same-day scheduling for 20% of slots
□ Review and optimize MA:Provider ratios
□ Audit same-day billing compliance (are you capturing all dual encounters?)

Days 31-60 — Systems Changes (Medium effort, high impact):
□ Implement warm handoff protocol for BH integration
□ Add Saturday clinic on rotation
□ Begin ECM enrollment push (identify eligible patients)
□ Launch MA career ladder program

Days 61-90 — Strategic Improvements (Higher effort, sustained impact):
□ Negotiate APM enrollment with DHCS
□ Implement staggered provider scheduling
□ Build SB 525 wage compression model for 2027
□ Present ROI case for additional MAs to leadership

Track these metrics weekly:
• Encounters per day per provider
• No-show rate
• Same-day encounter capture rate
• ECM enrollment count
• Staff satisfaction score

Use the Schedule Planner to build your optimized weekly schedule, and the Clinic Simulator to model the revenue impact of your 90-day changes.`,
        es: `Los mejores gerentes de clínica no intentan cambiar todo a la vez. El marco de 90 días enfoca tu energía:

Días 1-30 — Ganancias Rápidas:
□ Implementar sistema de recordatorio de 2 contactos (reducir citas perdidas 30%)
□ Habilitar programación del mismo día para 20% de espacios
□ Revisar y optimizar ratios MA:Proveedor
□ Auditar cumplimiento de facturación del mismo día

Días 31-60 — Cambios de Sistemas:
□ Implementar protocolo de transferencia directa para integración de BH
□ Agregar clínica de sábado en rotación
□ Comenzar impulso de inscripción ECM
□ Lanzar programa de escala de carrera de MA

Días 61-90 — Mejoras Estratégicas:
□ Negociar inscripción APM con DHCS
□ Implementar programación escalonada de proveedores
□ Construir modelo de compresión salarial SB 525 para 2027
□ Presentar caso ROI para MAs adicionales

Métricas a seguir semanalmente:
• Encuentros por día por proveedor
• Tasa de citas perdidas
• Tasa de captura de encuentros del mismo día
• Conteo de inscripción ECM
• Puntuación de satisfacción del personal`,
      },
    },
  ],
  exercises: [
    {
      type: "drag-sort",
      id: "cm-capstone-sort-1",
      instruction: {
        en: "Rank these clinic improvements from quickest win to longest implementation:",
        es: "Ordena estas mejoras de clínica de ganancia más rápida a implementación más larga:",
      },
      items: [
        { text: { en: "Implement automated appointment reminders", es: "Implementar recordatorios de citas automatizados" }, correctPosition: 1 },
        { text: { en: "Optimize MA:Provider scheduling ratios", es: "Optimizar ratios de programación MA:Proveedor" }, correctPosition: 2 },
        { text: { en: "Launch BH warm handoff protocol", es: "Lanzar protocolo de transferencia directa de BH" }, correctPosition: 3 },
        { text: { en: "Enroll in APM with DHCS for same-day BH billing", es: "Inscribirse en APM con DHCS para facturación BH del mismo día" }, correctPosition: 4 },
      ],
      xpReward: 20,
    } as AcademyExercise,
    {
      type: "concept-card",
      id: "cm-capstone-cards-1",
      cards: [
        {
          front: { en: "What is the #1 quick-win for increasing FQHC revenue?", es: "¿Cuál es la ganancia rápida #1 para aumentar los ingresos de un FQHC?" },
          back: { en: "Reducing no-show rates. A 2-touch reminder system can reduce no-shows 30-40% and recover $200K-$400K annually.", es: "Reducir las tasas de citas perdidas. Un sistema de recordatorio de 2 contactos puede reducir las citas perdidas 30-40% y recuperar $200K-$400K anualmente." },
          fqhcExample: { en: "AltaMed reduced their no-show rate from 22% to 11% using automated text + live call reminders, recovering an estimated $1.2M in annual revenue.", es: "AltaMed redujo su tasa de citas perdidas de 22% a 11% usando recordatorios automatizados de texto + llamada en vivo, recuperando un estimado de $1.2M en ingresos anuales." },
        },
        {
          front: { en: "What is the formula for FQHC base revenue?", es: "¿Cuál es la fórmula para los ingresos base de un FQHC?" },
          back: { en: "Providers × Encounters/Day × PPS Rate × Working Days\nExample: 5 × 18 × $225 × 250 = $5,062,500", es: "Proveedores × Encuentros/Día × Tarifa PPS × Días Laborales\nEjemplo: 5 × 18 × $225 × 250 = $5,062,500" },
        },
      ],
      xpReward: 15,
    } as AcademyExercise,
  ],
  totalXP: 35,
};

/* ================================================================== */
/*  Export: Course Definition                                          */
/* ================================================================== */

export const CLINIC_MANAGER_MODULES: AcademyModule[] = [
  module1Revenue,
  module2TeamCare,
  module3Scheduling,
  module4Integration,
  module5Ecm,
  module6Retention,
  module7Financial,
  module8Capstone,
];

export const CLINIC_MANAGER_TOTAL_XP = CLINIC_MANAGER_MODULES.reduce(
  (sum, m) => sum + m.totalXP,
  0,
);

export const CLINIC_MANAGER_TOTAL_MINUTES = CLINIC_MANAGER_MODULES.reduce(
  (sum, m) => sum + m.estimatedMinutes,
  0,
);

export const CLINIC_MANAGER_COURSE: AcademyCourseDefinition = {
  id: "clinic-manager",
  title: {
    en: "Clinic Manager Master Class",
    es: "Clase Magistral de Gerente de Clínica",
  },
  subtitle: {
    en: "The complete operations playbook for FQHC managers",
    es: "El manual completo de operaciones para gerentes de FQHC",
  },
  description: {
    en: "Master FQHC operations: PPS billing, team design, scheduling, BH/dental integration, CalAIM, workforce retention, and financial modeling. 8 modules with hands-on exercises.",
    es: "Domina las operaciones de FQHC: facturación PPS, diseño de equipo, programación, integración de BH/dental, CalAIM, retención de personal y modelado financiero.",
  },
  icon: "Building2",
  color: "indigo",
  modules: CLINIC_MANAGER_MODULES,
  totalXP: CLINIC_MANAGER_TOTAL_XP,
  estimatedMinutes: CLINIC_MANAGER_TOTAL_MINUTES,
  storageKey: "clinic-manager",
  hasCapstone: true,
};
