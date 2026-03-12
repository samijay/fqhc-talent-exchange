export const SALARY_NEGOTIATION_LAST_UPDATED = "2026-03-10";

// ============================================================================
// TYPES
// ============================================================================

export interface BilingualText {
  en: string;
  es: string;
}

export interface NegotiationScenario {
  id: string;
  role: string;
  title: BilingualText;
  situation: BilingualText;
  marketRate: { p25: number; p50: number; p75: number };
  currentOffer: number;
  negotiationTactics: {
    step: number;
    tactic: BilingualText;
    script: BilingualText;
    employerResponse: BilingualText;
    counterTactic: BilingualText;
  }[];
  sb525Leverage: BilingualText;
  totalCompFramework: BilingualText;
  primarySourceUrl: string;
}

export interface SB525Phase {
  effectiveDate: string;
  minimumWage: number;
  facilityType: string;
  annualFTE: number;
  notes: BilingualText;
}

export interface TotalCompComponent {
  id: string;
  category: "monetary" | "time-off" | "development" | "mission";
  title: BilingualText;
  description: BilingualText;
  typicalValue: string;
  negotiable: boolean;
  negotiationTip: BilingualText;
}

export interface NegotiationMistake {
  id: string;
  mistake: BilingualText;
  why: BilingualText;
  instead: BilingualText;
}

// ============================================================================
// SB 525 PHASES (California Healthcare Minimum Wage Law)
// ============================================================================

export const SB525_PHASES: SB525Phase[] = [
  {
    effectiveDate: "2024-06-01",
    minimumWage: 21,
    facilityType: "Rural/Independent FQHC (<200 beds)",
    annualFTE: 43680,
    notes: {
      en: "First phase of SB 525. Rural FQHCs and independent facilities reached $21/hr. Larger health systems already at $23/hr.",
      es: "Primera fase de SB 525. Los centros de salud rural e instalaciones independientes alcanzaron $21/hr. Los sistemas de salud más grandes ya estaban en $23/hr.",
    },
  },
  {
    effectiveDate: "2024-06-01",
    minimumWage: 23,
    facilityType: "Large Health Systems (200+ beds, hospital chains)",
    annualFTE: 47840,
    notes: {
      en: "Large health systems reached $23/hr in Phase 1. This includes hospital-based clinics and chains.",
      es: "Los sistemas de salud grandes alcanzaron $23/hr en la Fase 1. Esto incluye clínicas basadas en hospitales y cadenas.",
    },
  },
  {
    effectiveDate: "2025-06-01",
    minimumWage: 23,
    facilityType: "All Rural/Independent FQHCs",
    annualFTE: 47840,
    notes: {
      en: "Phase 2: All rural FQHCs and independent facilities now at $23/hr. Large systems continue at $25/hr trajectory.",
      es: "Fase 2: Todos los centros de salud rural e independientes ahora en $23/hr. Los sistemas grandes continúan en la trayectoria de $25/hr.",
    },
  },
  {
    effectiveDate: "2025-06-01",
    minimumWage: 25,
    facilityType: "Large Health Systems (ongoing)",
    annualFTE: 52000,
    notes: {
      en: "Phase 2: Large health systems reach $25/hr. Significant cost for FQHC integrated delivery systems.",
      es: "Fase 2: Los sistemas de salud grandes alcanzan $25/hr. Costo significativo para sistemas integrados de FQHC.",
    },
  },
  {
    effectiveDate: "2026-06-01",
    minimumWage: 25,
    facilityType: "All Healthcare Facilities (Universal)",
    annualFTE: 52000,
    notes: {
      en: "Phase 3: Universal $25/hr minimum for all healthcare facilities in California. This is your strongest negotiating leverage point.",
      es: "Fase 3: Mínimo universal de $25/hr para todos los establecimientos de salud en California. Este es su punto de ventaja de negociación más fuerte.",
    },
  },
  {
    effectiveDate: "2026-06-01",
    minimumWage: 23,
    facilityType: "If Governor pauses (economic hardship provision)",
    annualFTE: 47840,
    notes: {
      en: "Governor can delay Phase 3 by 1 year if CA budget deficit > $27.6B. Monitor CA budget news. Workers retain 2025 wages.",
      es: "El gobernador puede retrasar la Fase 3 un año si el déficit presupuestario de CA es > $27.6B. Monitoree las noticias del presupuesto de CA. Los trabajadores retienen los salarios de 2025.",
    },
  },
];

// ============================================================================
// TOTAL COMPENSATION COMPONENTS
// ============================================================================

export const TOTAL_COMP_COMPONENTS: TotalCompComponent[] = [
  {
    id: "base-salary",
    category: "monetary",
    title: { en: "Base Salary", es: "Salario Base" },
    description: {
      en: "Annual or hourly wage. This is your foundation. Never negotiate only this — it ignores other value.",
      es: "Salario anual u horario. Esta es su base. Nunca negocie solo esto — ignora otro valor.",
    },
    typicalValue: "$45K-$160K",
    negotiable: true,
    negotiationTip: {
      en: "Always research market rates before negotiating. Know your P25, P50, P75. SB 525 gives you a legal floor.",
      es: "Siempre investigue las tasas del mercado antes de negociar. Conozca su P25, P50, P75. SB 525 le da un piso legal.",
    },
  },
  {
    id: "health-insurance",
    category: "monetary",
    title: { en: "Health Insurance", es: "Seguro de Salud" },
    description: {
      en: "Employer contribution to medical, dental, vision. Value = $8,000-$18,000/year depending on coverage tier and family status.",
      es: "Contribución del empleador a médico, dental, visión. Valor = $8,000-$18,000/año según el nivel de cobertura y estado familiar.",
    },
    typicalValue: "$8K-$18K/year",
    negotiable: true,
    negotiationTip: {
      en: "Ask specifically: 'Does the employer pay 100% employee premium? What's the family coverage cost?' Cheaper plans shift burden to you.",
      es: "Pregunte específicamente: '¿El empleador paga el 100% de la prima del empleado? ¿Cuál es el costo de cobertura familiar?' Los planes más baratos le transfieren la carga.",
    },
  },
  {
    id: "nhsc-loan-repayment",
    category: "monetary",
    title: { en: "NHSC Loan Repayment", es: "Reembolso de Préstamo NHSC" },
    description: {
      en: "National Health Service Corps program. FQHC commits to repay $50K-$75K of your student loans over 2-3 years if you stay. Limited to direct care roles (MD, NP, PA, RN, dentist). Check NHSC eligibility.",
      es: "Programa del Cuerpo Nacional de Servicio de Salud. FQHC se compromete a reembolsar $50K-$75K de sus préstamos estudiantiles durante 2-3 años si se queda. Limitado a roles de atención directa. Verifique elegibilidad NHSC.",
    },
    typicalValue: "$50K-$75K over 2-3 years",
    negotiable: true,
    negotiationTip: {
      en: "Not all FQHCs have NHSC slots. Ask: 'Does your FQHC have NHSC funding? If not, can you negotiate sign-on bonus instead?'",
      es: "No todos los FQHC tienen espacios NHSC. Pregunte: '¿Su FQHC tiene fondos NHSC? Si no, ¿puede negociar un bono de firma en su lugar?'",
    },
  },
  {
    id: "retirement-401k",
    category: "monetary",
    title: { en: "401k/Retirement Match", es: "Coincidencia de 401k/Jubilación" },
    description: {
      en: "Employer matches your 401k contribution, typically 3-6% of salary. Example: You save 5%, employer adds $2,500-$8,000/year.",
      es: "El empleador iguala su contribución 401k, típicamente 3-6% del salario. Ejemplo: Ahorra 5%, el empleador agrega $2,500-$8,000/año.",
    },
    typicalValue: "3-6% match = $2K-$8K/year",
    negotiable: true,
    negotiationTip: {
      en: "Verify the match percentage before signing. Some FQHCs offer 4%, others 6%. This is free money for retirement — negotiate for max match.",
      es: "Verifique el porcentaje de coincidencia antes de firmar. Algunos FQHC ofrecen 4%, otros 6%. Este es dinero gratuito para la jubilación — negocie la coincidencia máxima.",
    },
  },
  {
    id: "pto-paid-time-off",
    category: "time-off",
    title: { en: "Paid Time Off (PTO)", es: "Tiempo Libre Pagado (PTO)" },
    description: {
      en: "Vacation, sick, personal days combined. Industry standard: 15-25 days/year. Value: $3,000-$8,000+ depending on salary.",
      es: "Vacaciones, enfermedad, días personales combinados. Estándar de la industria: 15-25 días/año. Valor: $3,000-$8,000+ según salario.",
    },
    typicalValue: "15-25 days/year",
    negotiable: true,
    negotiationTip: {
      en: "Many FQHCs offer only 10 days to new hires. Negotiate: 'Can we start at 15 days and review after year 1?' Document accrual schedule.",
      es: "Muchos FQHC ofrecen solo 10 días a nuevos empleados. Negocie: '¿Podemos comenzar con 15 días y revisar después del año 1?' Documente el cronograma de acumulación.",
    },
  },
  {
    id: "cme-allowance",
    category: "development",
    title: { en: "CME/CEU Allowance", es: "Asignación de CME/CEU" },
    description: {
      en: "Continuing Medical Education or Continuing Education Unit budget for trainings, conferences, certifications. Typical: $500-$2,500/year.",
      es: "Presupuesto de Educación Médica Continua o Unidad de Educación Continua para entrenamientos, conferencias, certificaciones. Típico: $500-$2,500/año.",
    },
    typicalValue: "$500-$2.5K/year",
    negotiable: true,
    negotiationTip: {
      en: "Ask for written CME policy. Does it roll over? Can you attend FQHC-specific conferences? Some FQHCs offer $0 to new hires — negotiate based on your field.",
      es: "Solicite una política CME escrita. ¿Se acumula? ¿Puede asistir a conferencias específicas de FQHC? Algunos FQHC ofrecen $0 a nuevos empleados — negocie según su campo.",
    },
  },
  {
    id: "tuition-reimbursement",
    category: "development",
    title: { en: "Tuition Reimbursement", es: "Reembolso de Matrícula" },
    description: {
      en: "Employer pays for degree programs related to your role. Typical: $2,000-$5,250/year (often tied to CA state limit). Examples: RN-to-BSN, MSW programs.",
      es: "El empleador paga programas de grados relacionados con su rol. Típico: $2,000-$5,250/año (a menudo vinculado al límite estatal de CA). Ejemplos: Programas RN-a-BSN, MSW.",
    },
    typicalValue: "$2K-$5.25K/year",
    negotiable: true,
    negotiationTip: {
      en: "Ask: 'Will you reimburse my RN-to-BSN program? Any strings attached (stay 2 years, etc.)?' Get it in writing.",
      es: "Pregunte: '¿Reembolsará mi programa RN-a-BSN? ¿Hay restricciones (quedarse 2 años, etc.)?' Obténgalo por escrito.",
    },
  },
  {
    id: "bilingual-differential",
    category: "monetary",
    title: { en: "Bilingual Pay Differential", es: "Diferencial de Pago Bilingüe" },
    description: {
      en: "Additional 5-10% pay for Spanish-fluent roles. In California with 41% Latino population, this is standard for patient-facing roles.",
      es: "Pago adicional del 5-10% para roles con fluidez en español. En California con 41% de población latina, esto es estándar para roles orientados al paciente.",
    },
    typicalValue: "5-10% = $2K-$8K/year",
    negotiable: true,
    negotiationTip: {
      en: "This is non-negotiable value in CA. If the offer doesn't include bilingual differential, ask directly: 'What's the bilingual pay for this role?'",
      es: "Este es un valor innegociable en CA. Si la oferta no incluye diferencial bilingüe, pregunte directamente: '¿Cuál es el pago bilingüe para este rol?'",
    },
  },
  {
    id: "certification-bonuses",
    category: "monetary",
    title: { en: "Certification Bonuses", es: "Bonificaciones de Certificación" },
    description: {
      en: "One-time or annual payments for certifications: CHW ($500), CCS ($1,000), RHIA ($1,500), RN-BSN ($2,000+). Shows commitment to quality.",
      es: "Pagos únicos o anuales para certificaciones: CHW ($500), CCS ($1,000), RHIA ($1,500), RN-BSN ($2,000+). Demuestra compromiso con la calidad.",
    },
    typicalValue: "$500-$2K per cert",
    negotiable: true,
    negotiationTip: {
      en: "If you already have certifications, ask for a lump-sum bonus to acknowledge that value. 'I have my CHW cert — can we add $500 to recognize that?'",
      es: "Si ya tiene certificaciones, solicite un bono de suma global para reconocer ese valor. 'Tengo mi certificado CHW — ¿podemos agregar $500 para reconocer eso?'",
    },
  },
  {
    id: "sign-on-bonus",
    category: "monetary",
    title: { en: "Sign-On Bonus", es: "Bono de Firma" },
    description: {
      en: "Lump-sum payment when you start ($2K-$10K depending on role). More common for hard-to-fill roles (RN, NP, specialist dentists).",
      es: "Pago de suma global cuando comienza ($2K-$10K según el rol). Más común para roles difíciles de llenar (RN, NP, dentistas especialistas).",
    },
    typicalValue: "$2K-$10K",
    negotiable: true,
    negotiationTip: {
      en: "Sign-on bonuses are common in tight labor markets. If competing offers exist, mention it: 'Another FQHC offered a $5K sign-on. Can you match?'",
      es: "Los bonos de firma son comunes en mercados laborales ajustados. Si existen ofertas competidoras, mencione: 'Otro FQHC ofreció $5K de firma. ¿Puede igualar?'",
    },
  },
  {
    id: "relocation-assistance",
    category: "monetary",
    title: { en: "Relocation Assistance", es: "Asistencia de Reubicación" },
    description: {
      en: "Employer covers moving costs if relocating to take the job. Typical: $2K-$5K. Rarer for CA-to-CA moves, more common for out-of-state.",
      es: "El empleador cubre costos de mudanza si se reubica para tomar el trabajo. Típico: $2K-$5K. Más raro para mudanzas CA-a-CA, más común para fuera del estado.",
    },
    typicalValue: "$2K-$5K",
    negotiable: true,
    negotiationTip: {
      en: "Most FQHC relocation packages are limited. For rural CA placements, ask about housing stipends or temporary lodging instead.",
      es: "La mayoría de los paquetes de reubicación de FQHC son limitados. Para colocaciones rurales de CA, pregunte sobre estipendios de vivienda o alojamiento temporal.",
    },
  },
  {
    id: "malpractice-insurance",
    category: "monetary",
    title: { en: "Malpractice Insurance", es: "Seguro de Negligencia Médica" },
    description: {
      en: "For clinical roles (MD, NP, PA, RN). FQHC pays for coverage under Federal Tort Claims Act (FTCA). Value: $5K-$15K/year depending on specialty.",
      es: "Para roles clínicos (MD, NP, PA, RN). FQHC paga cobertura bajo la Ley Federal de Reclamaciones por Agravios (FTCA). Valor: $5K-$15K/año según especialidad.",
    },
    typicalValue: "$5K-$15K/year",
    negotiable: false,
    negotiationTip: {
      en: "FTCA coverage is mandatory for federally-supported FQHCs. Don't negotiate this — verify it's included. Ask: 'What coverage level and deductible?'",
      es: "La cobertura FTCA es obligatoria para FQHC con apoyo federal. No negocie esto — verifique que esté incluido. Pregunte: '¿Qué nivel de cobertura y deducible?'",
    },
  },
  {
    id: "flexible-scheduling",
    category: "time-off",
    title: { en: "Flexible Scheduling/Remote Work", es: "Horario Flexible/Trabajo Remoto" },
    description: {
      en: "Compressed work weeks, flex hours, remote days for admin roles. Not usually available for patient-facing roles, but ask for hybrid options.",
      es: "Semanas de trabajo comprimidas, horas flexibles, días remotos para roles administrativos. No suele estar disponible para roles orientados al paciente, pero solicite opciones híbridas.",
    },
    typicalValue: "Varies (1-2 days/week remote)",
    negotiable: true,
    negotiationTip: {
      en: "For clinical roles: 'Can I do charting from home 1 day/week?' For admin: 'Can I start at 7am instead of 8am to pick up kids?' Small things matter.",
      es: "Para roles clínicos: '¿Puedo hacer gráficas desde casa 1 día/semana?' Para administración: '¿Puedo comenzar a las 7am en lugar de 8am para recoger a los niños?' Las cosas pequeñas importan.",
    },
  },
  {
    id: "mission-alignment",
    category: "mission",
    title: { en: "Mission Alignment (Non-Monetary)", es: "Alineación de Misión (Sin Dinero)" },
    description: {
      en: "Working at a mission-driven FQHC means serving your community, training future providers, advancing health equity. Real career value but don't let it replace cash negotiation.",
      es: "Trabajar en un FQHC impulsado por una misión significa servir a su comunidad, capacitar a futuros proveedores, avanzar la equidad en salud. Valor de carrera real pero no lo deje reemplazar la negociación en efectivo.",
    },
    typicalValue: "Career fulfillment + community impact",
    negotiable: false,
    negotiationTip: {
      en: "Mission is real but it doesn't pay rent. Use it as leverage: 'I'm committed to this mission AND market rates show $X. Can we meet in the middle?'",
      es: "La misión es real pero no paga el alquiler. Úsela como ventaja: 'Estoy comprometido con esta misión Y las tasas de mercado muestran $X. ¿Podemos encontrar el equilibrio?'",
    },
  },
];

// ============================================================================
// NEGOTIATION SCENARIOS (15 ROLES)
// ============================================================================

export const NEGOTIATION_SCENARIOS: NegotiationScenario[] = [
  {
    id: "ma-negotiation",
    role: "medical-assistant",
    title: {
      en: "Medical Assistant Salary Negotiation",
      es: "Negociación de Salario de Asistente Médico",
    },
    situation: {
      en: "You've received an offer for $22/hr at a rural FQHC. You have 2 years of experience and bilingual (EN/ES). Market rate is $24-26/hr.",
      es: "Ha recibido una oferta de $22/hr en un FQHC rural. Tiene 2 años de experiencia y es bilingüe (EN/ES). La tasa de mercado es $24-26/hr.",
    },
    marketRate: { p25: 22, p50: 25, p75: 27 },
    currentOffer: 22,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Thank them and ask for 24 hours to review",
          es: "Agradézcales y pida 24 horas para revisar",
        },
        script: {
          en: "'Thank you so much for the offer. This is exciting. I'd like 24 hours to review the full details and come back to you with any questions. Is that okay?'",
          es: "'Muchas gracias por la oferta. Esto es emocionante. Me gustaría 24 horas para revisar todos los detalles y volver a usted con preguntas. ¿Está bien?'",
        },
        employerResponse: {
          en: "'Sure, no problem. Let us know tomorrow.' (They assume you'll accept as-is)",
          es: "'Claro, sin problema. Avísanos mañana.' (Asumen que aceptará tal cual)",
        },
        counterTactic: {
          en: "Use this time to gather market data from Glassdoor, Indeed, BLS. Prepare your counter with specific numbers.",
          es: "Use este tiempo para recopilar datos de mercado de Glassdoor, Indeed, BLS. Prepare su contra con números específicos.",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Lead with market data, not your needs",
          es: "Lidere con datos de mercado, no sus necesidades",
        },
        script: {
          en: "'I'm very interested in this role. I researched salaries for MAs with 2+ years experience in this region, and the market range is $24-26/hr. My bilingual skills add value for your patient population. Can we adjust to $24.50/hr?'",
          es: "'Estoy muy interesado en este rol. Investigué salarios para MAs con 2+ años de experiencia en esta región, y el rango de mercado es $24-26/hr. Mis habilidades bilingües agregan valor a su población de pacientes. ¿Podemos ajustar a $24.50/hr?'",
        },
        employerResponse: {
          en: "'Our budget for this position is $22/hr. That's what we pay all MAs at your level.' (Budget constraint claim)",
          es: "'Nuestro presupuesto para este puesto es $22/hr. Eso es lo que pagamos a todos los MAs en tu nivel.' (Reclamo de restricción presupuestaria)",
        },
        counterTactic: {
          en: "Acknowledge budget reality but push on total comp: 'I understand budget constraints. What if we explored total comp — can we add $500 sign-on bonus or increase PTO to 15 days?'",
          es: "Reconozca la realidad presupuestaria pero presione sobre compensación total: 'Entiendo las restricciones presupuestarias. ¿Y si exploramos compensación total — podemos agregar un bono de firma de $500 o aumentar PTO a 15 días?'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Use SB 525 as your legal floor",
          es: "Use SB 525 como su piso legal",
        },
        script: {
          en: "'I also want to mention California SB 525. By June 2026, all healthcare facilities must pay $25/hr minimum. That's less than 15 months away. If I start at $22, I'm leaving $3/hr on the table during that transition. Can we start at market rate now to avoid future adjustment shock?'",
          es: "'También quiero mencionar SB 525 de California. Para junio de 2026, todos los establecimientos de salud deben pagar un mínimo de $25/hr. Eso es menos de 15 meses. Si comienzo en $22, estoy dejando $3/hr sobre la mesa durante esa transición. ¿Podemos comenzar con una tasa de mercado ahora para evitar un shock de ajuste futuro?'",
        },
        employerResponse: {
          en: "'SB 525 is coming, but we're not there yet. We'll cross that bridge when we get to it.' (Dismissive of future regulation)",
          es: "'SB 525 viene, pero no estamos ahí todavía. Cruzaremos ese puente cuando lleguemos.' (Despectivo de regulación futura)",
        },
        counterTactic: {
          en: "Reframe: 'I want to build a long-term relationship with this FQHC. Starting at market rate shows commitment to that. Plus, you'll avoid rapid re-negotiation in 15 months.'",
          es: "Reenmárquelo: 'Quiero construir una relación a largo plazo con este FQHC. Comenzar con una tasa de mercado muestra compromiso con eso. Además, evitará renegociación rápida en 15 meses.'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Bring alternative offers into the conversation (ethically)",
          es: "Traiga ofertas alternativas a la conversación (éticamente)",
        },
        script: {
          en: "'I have another FQHC that offered $24.50/hr, but I prefer your location and mission. I'm hoping you can match the offer so I can move forward with you.'",
          es: "'Tengo otro FQHC que ofreció $24.50/hr, pero prefiero su ubicación y misión. Espero que pueda igualar la oferta para poder avanzar con usted.'",
        },
        employerResponse: {
          en: "'We can't match that. Our budget is fixed. Take it or leave it.' (Hardline)",
          es: "'No podemos igualar eso. Nuestro presupuesto es fijo. Tómalo o déjalo.' (Posición firme)",
        },
        counterTactic: {
          en: "Ask for next best alternative: 'I understand. Could we start at $23.50/hr with a $500 sign-on and revisit salary at 6-month mark?' Get it in writing.",
          es: "Pregunte por la siguiente mejor alternativa: '¿Entiendo. ¿Podríamos comenzar en $23.50/hr con un bono de firma de $500 y revisar el salario en la marca de 6 meses?' Obténgalo por escrito.",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Make your final decision with full information",
          es: "Tome su decisión final con información completa",
        },
        script: {
          en: "'Thank you for working with me on this. Before I accept, I want to confirm in writing: starting salary $23.50/hr, $500 sign-on bonus, 15 days PTO, bilingual differential of 5%. Can you send me an updated offer letter with these terms?'",
          es: "'Gracias por trabajar conmigo en esto. Antes de aceptar, quiero confirmar por escrito: salario inicial $23.50/hr, bono de firma de $500, 15 días de PTO, diferencial bilingüe del 5%. ¿Puede enviarme una carta de oferta actualizada con estos términos?'",
        },
        employerResponse: {
          en: "'Sure, we can do that. Here's the revised offer.' (They gave because you were specific and data-backed)",
          es: "'Claro, podemos hacer eso. Aquí está la oferta revisada.' (Dieron porque fue específico y respaldado por datos)",
        },
        counterTactic: {
          en: "Review carefully. If they won't budge on anything, accept and plan to re-negotiate at 1-year mark using SB 525 Phase 2 ($23/hr floor) as your leverage.",
          es: "Revise cuidadosamente. Si no se mueven en nada, acepte y planifique renegociar en la marca de 1 año usando SB 525 Fase 2 ($23/hr piso) como su ventaja.",
        },
      },
    ],
    sb525Leverage: {
      en: "SB 525 is your strongest leverage point. By June 2026, this MA position MUST pay $25/hr. That's less than 15 months. Starting below market rate now means you'll face rapid re-negotiation soon. Use this fact to start at market rate immediately: $24-25/hr.",
      es: "SB 525 es su punto de ventaja más fuerte. Para junio de 2026, este puesto de MA DEBE pagar $25/hr. Eso es menos de 15 meses. Comenzar por debajo de la tasa de mercado ahora significa que enfrentará renegociación rápida pronto. Use este hecho para comenzar con una tasa de mercado inmediatamente: $24-25/hr.",
    },
    totalCompFramework: {
      en: "Don't accept base salary alone. Total comp for MA should include: base salary ($24-25/hr), health insurance ($10K value), 15 days PTO ($2K value), CME allowance ($500), 4% 401k match ($1.5K), bilingual differential (5%), sign-on bonus ($1K). Total package value: $47K+.",
      es: "No acepte solo salario base. La compensación total para MA debe incluir: salario base ($24-25/hr), seguro de salud ($10K valor), 15 días de PTO ($2K valor), asignación de CME ($500), coincidencia de 401k del 4% ($1.5K), diferencial bilingüe (5%), bono de firma ($1K). Valor del paquete total: $47K+.",
    },
    primarySourceUrl:
      "https://www.bls.gov/oes/current/oes319093.htm",
  },
  {
    id: "care-coordinator-negotiation",
    role: "care-coordinator",
    title: {
      en: "Care Coordinator Salary Negotiation",
      es: "Negociación de Salario de Coordinador de Atención",
    },
    situation: {
      en: "Offer: $52K. You have 3 years of ECM/CCM experience. Market rate: $58-65K. FQHC is in a region with high Medi-Cal dependency.",
      es: "Oferta: $52K. Tiene 3 años de experiencia en ECM/CCM. Tasa de mercado: $58-65K. FQHC está en una región con alta dependencia de Medi-Cal.",
    },
    marketRate: { p25: 54, p50: 62, p75: 68 },
    currentOffer: 52,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Highlight ECM program impact during interview",
          es: "Destaque el impacto del programa ECM durante la entrevista",
        },
        script: {
          en: "'In my current role, I've improved ECM enrollment by 35% and reduced ED utilization by 22% in my caseload. These outcomes directly impact your PPS revenue. How does your FQHC measure care coordinator impact on revenue?'",
          es: "'En mi rol actual, he mejorado la inscripción en ECM en un 35% y reducido la utilización de ED en un 22% en mi caseload. Estos resultados impactan directamente sus ingresos de PPS. ¿Cómo mide su FQHC el impacto del coordinador de atención en los ingresos?'",
        },
        employerResponse: {
          en: "'We track outcomes through our EHR. We have 2,000 Medi-Cal patients and ECM penetration is only 15%. We need someone to grow that.'",
          es: "'Rastreamos resultados a través de nuestro EHR. Tenemos 2,000 pacientes de Medi-Cal y la penetración de ECM es solo del 15%. Necesitamos a alguien que desarrolle eso.'",
        },
        counterTactic: {
          en: "This is your opening. They have a clear problem: low ECM uptake = lost revenue. Your experience solves that. Save this for your salary negotiation.",
          es: "Esta es su apertura. Tienen un problema claro: baja adopción de ECM = ingresos perdidos. Su experiencia resuelve eso. Guarde esto para su negociación de salario.",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Quantify your revenue value before negotiating salary",
          es: "Cuantifique su valor de ingresos antes de negociar el salario",
        },
        script: {
          en: "'You mentioned ECM penetration is at 15%. My goal would be to reach 35-40% within 18 months. That's roughly 400-500 additional lives under enhanced care management. At $150/PMPM, that's $600-900K in additional annual revenue. As a care coordinator driving that, what salary range reflects that value creation?'",
          es: "'Mencionó que la penetración de ECM está en el 15%. Mi objetivo sería alcanzar el 35-40% en 18 meses. Eso es aproximadamente 400-500 vidas adicionales bajo gestión de atención mejorada. A $150/PMPM, eso es $600-900K en ingresos anuales adicionales. Como coordinador de atención impulsando eso, ¿qué rango salarial refleja ese valor creado?'",
        },
        employerResponse: {
          en: "'That's ambitious. We've been trying for years. We have a $52K budget for this role. That's what we pay coordinators.' (Constrained response)",
          es: "'Eso es ambicioso. Hemos estado intentando durante años. Tenemos un presupuesto de $52K para este rol. Eso es lo que pagamos a los coordinadores.' (Respuesta limitada)",
        },
        counterTactic: {
          en: "Reframe: 'I understand your budget constraints. But if I deliver even half of that revenue growth ($300-450K), my salary cost is essentially offset. Can we structure this with a base of $58K + performance bonus of $3-5K if ECM penetration reaches 30%?'",
          es: "Reenmárquelo: 'Entiendo sus restricciones presupuestarias. Pero si entrego incluso la mitad de ese crecimiento de ingresos ($300-450K), mi costo salarial se compensa esencialmente. ¿Podemos estructurar esto con una base de $58K + bono de desempeño de $3-5K si la penetración de ECM alcanza el 30%?'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Show market alignment with CalAIM certifications",
          es: "Muestre alineación de mercado con certificaciones CalAIM",
        },
        script: {
          en: "'I also have CalAIM training and understand integrated care coordination. According to CHCF salary data for care coordinators with CalAIM certification in CA, the market range is $58-65K. My experience with ECM puts me at the higher end of that range.'",
          es: "'También tengo capacitación en CalAIM y entiendo la coordinación de atención integrada. Según datos de salarios de CHCF para coordinadores de atención con certificación CalAIM en CA, el rango de mercado es $58-65K. Mi experiencia con ECM me coloca en el rango más alto.'",
        },
        employerResponse: {
          en: "'We're aware of market rates, but we're a rural FQHC with limited funding. We can't match that.'",
          es: "'Somos conscientes de las tasas del mercado, pero somos un FQHC rural con financiamiento limitado. No podemos igualar eso.'",
        },
        counterTactic: {
          en: "Acknowledge rural constraints but redirect: 'I understand rural funding challenges. What if we start at $56K with a 6-month review when I've shown ECM enrollment impact? That shows you value performance and I'm committed long-term.'",
          es: "Reconozca limitaciones rurales pero redirija: 'Entiendo los desafíos de financiamiento rural. ¿Y si comenzamos a $56K con una revisión de 6 meses cuando haya mostrado impacto en la inscripción de ECM? Eso muestra que valora el desempeño y estoy comprometido a largo plazo.'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Bundle total comp to reach market value",
          es: "Empaquete compensación total para alcanzar valor de mercado",
        },
        script: {
          en: "'Let's look at total compensation. If the base is $56K, can we include: health insurance, 4% 401k match, 20 days PTO, $1.5K CME budget, and $2K sign-on bonus? That brings total comp closer to market.'",
          es: "'Miremos la compensación total. Si la base es $56K, ¿podemos incluir: seguro de salud, coincidencia 401k del 4%, 20 días de PTO, presupuesto de CME de $1.5K y bono de firma de $2K? Eso acerca la compensación total al mercado.'",
        },
        employerResponse: {
          en: "'We can probably do 20 days PTO and the sign-on bonus. The 401k match is standard 3%. Can we make this work?'",
          es: "'Probablemente podemos hacer 20 días de PTO y el bono de firma. La coincidencia 401k es estándar del 3%. ¿Podemos hacer que funcione?'",
        },
        counterTactic: {
          en: "Calculate: $56K base + $11K health ins + $1.68K 401k (3%) + $4K PTO + $1.5K CME + $2K bonus = $76.18K total comp. Write it down and say: 'That works for me. Let's document this in the offer letter.'",
          es: "Calcule: $56K base + $11K seguro de salud + $1.68K 401k (3%) + $4K PTO + $1.5K CME + $2K bono = $76.18K compensación total. Escríbalo y diga: 'Eso funciona para mí. Documentemos esto en la carta de oferta.'",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Finalize with performance review timeline",
          es: "Finalizar con cronograma de revisión de desempeño",
        },
        script: {
          en: "'I'm excited to join your team and drive ECM growth. Can we schedule a 6-month performance review where we assess ECM penetration progress? If I hit 25%+ penetration, we revisit salary to market rate ($60K+). This shows mutual commitment to success.'",
          es: "'Estoy emocionado de unirme a su equipo e impulsar el crecimiento de ECM. ¿Podemos programar una revisión de desempeño de 6 meses donde evaluemos el progreso de la penetración de ECM? Si alcanzo penetración del 25%+, revisitamos el salario a tasa de mercado ($60K+). Esto muestra compromiso mutuo con el éxito.'",
        },
        employerResponse: {
          en: "'That sounds fair. Let's put a 6-month review on the calendar.' (They're bought in to your value creation.)",
          es: "'Eso suena justo. Pongamos una revisión de 6 meses en el calendario.' (Están comprados en su creación de valor.)",
        },
        counterTactic: {
          en: "Get the 6-month review and salary escalation language IN WRITING in your offer letter. 'Pending demonstration of ECM penetration reaching 25%+, salary review to $60K+ at 6-month mark.'",
          es: "Obtenga la revisión de 6 meses y la escalada salarial ESCRITA en su carta de oferta. 'Pendiente de demostración de penetración de ECM alcanzando 25%+, revisión salarial a $60K+ en la marca de 6 meses.'",
        },
      },
    ],
    sb525Leverage: {
      en: "SB 525 doesn't directly impact care coordinator wages (typically above minimum), but the labor shortage it signals does. As FQHC wages rise across the board, your ability to retain quality care coordinators becomes critical. Use this: 'As SB 525 drives up wages sector-wide, attracting experienced coordinators becomes harder. Starting me at market rate now ensures you keep quality talent.'",
      es: "SB 525 no impacta directamente los salarios de coordinadores de atención (típicamente por encima del mínimo), pero la escasez laboral que señala sí lo hace. A medida que los salarios de FQHC suben en general, su capacidad de retener coordinadores de atención de calidad se vuelve crítica. Use esto: 'A medida que SB 525 impulsa los salarios en todo el sector, atraer coordinadores experimentados se vuelve más difícil. Comenzarme a tasa de mercado ahora asegura que mantenga talento de calidad.'",
    },
    totalCompFramework: {
      en: "Care coordinator total comp: base $56-60K + health insurance ($12K) + 401k match 3-4% ($1.7-2.4K) + 20 days PTO ($4K) + CME $1.5K + sign-on bonus $2K + potential performance bonus $3-5K = $79-89K total comp. This is market rate.",
      es: "Compensación total del coordinador de atención: base $56-60K + seguro de salud ($12K) + coincidencia 401k 3-4% ($1.7-2.4K) + 20 días de PTO ($4K) + CME $1.5K + bono de firma $2K + bonificación de desempeño potencial $3-5K = $79-89K compensación total. Esta es la tasa de mercado.",
    },
    primarySourceUrl:
      "https://www.chcf.org/publication/care-coordination-california-fqhcs/",
  },
  {
    id: "chw-negotiation",
    role: "community-health-worker",
    title: {
      en: "Community Health Worker (CHW) Salary Negotiation",
      es: "Negociación de Salario de Trabajador de Salud Comunitario (CHW)",
    },
    situation: {
      en: "Offer: $20/hr. You have 5 years of community health experience, bilingual, deep roots in the neighborhood. Market rate: $23-26/hr. CHW certification is still pending state approval.",
      es: "Oferta: $20/hr. Tiene 5 años de experiencia en salud comunitaria, es bilingüe, raíces profundas en el vecindario. Tasa de mercado: $23-26/hr. La certificación CHW aún está pendiente de aprobación estatal.",
    },
    marketRate: { p25: 21, p50: 24, p75: 27 },
    currentOffer: 20,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Emphasize cultural asset and retention value",
          es: "Enfatice el activo cultural y el valor de retención",
        },
        script: {
          en: "'I'm deeply rooted in this community. I know the families, the barriers they face, the trust I've built. That's not easy to replace. In 5 years, I've learned what works here. That knowledge has real value for your FQHC's success.'",
          es: "'Estoy profundamente arraigado en esta comunidad. Conozco a las familias, las barreras que enfrentan, la confianza que he construido. Eso no es fácil de reemplazar. En 5 años, he aprendido qué funciona aquí. Ese conocimiento tiene un valor real para el éxito de su FQHC.'",
        },
        employerResponse: {
          en: "'We appreciate that. But we can hire a new CHW at $20/hr. Market pressure isn't that tight here.'",
          es: "'Apreciamos eso. Pero podemos contratar un nuevo CHW a $20/hr. La presión del mercado no es tan apretada aquí.'",
        },
        counterTactic: {
          en: "Show market data specific to YOUR community: 'Actually, I researched CHW wages in this region. Places like Community Health Center here pay $24-25/hr. And SB 803 is moving toward CHW licensure, which will increase demand. I deserve market rate.'",
          es: "Muestre datos de mercado específicos de SU comunidad: 'En realidad, investigué los salarios de CHW en esta región. Lugares como Community Health Center aquí pagan $24-25/hr. Y SB 803 se está moviendo hacia la licencia CHW, lo que aumentará la demanda. Merezco una tasa de mercado.'",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Leverage SB 803 pending CHW certification as credential upgrade",
          es: "Aproveche la certificación CHW pendiente de SB 803 como actualización de credencial",
        },
        script: {
          en: "'SB 803 will establish CHW licensure, which should happen within the next 12-18 months. When that becomes law, CHW wages are expected to increase 15-20%. If I start at $20/hr now, the jump to $23-25/hr in 2027 will create budget shock for you. Let's start at market rate now and smooth that transition.'",
          es: "'SB 803 establecerá la licencia CHW, que debería ocurrir en los próximos 12-18 meses. Cuando eso se convierta en ley, se espera que los salarios de CHW aumenten 15-20%. Si comienzo a $20/hr ahora, el salto a $23-25/hr en 2027 creará un shock presupuestario para usted. Comencemos con una tasa de mercado ahora y suavicemos esa transición.'",
        },
        employerResponse: {
          en: "'That's speculative. SB 803 may not pass or may be delayed. We can't budget based on what might happen.'",
          es: "'Eso es especulativo. SB 803 puede no pasar o ser retrasado. No podemos presupuestar basado en lo que podría suceder.'",
        },
        counterTactic: {
          en: "Reframe as risk mitigation: 'I understand the uncertainty. But even without SB 803, market data shows CHW rates are rising due to labor shortages. Starting me at $23/hr protects you from rapid turnover and re-hiring costs.'",
          es: "Reformule como mitigación de riesgos: 'Entiendo la incertidumbre. Pero incluso sin SB 803, los datos del mercado muestran que las tasas de CHW están subiendo debido a escasez laboral. Comenzarme a $23/hr lo protege de rotación rápida y costos de recontratación.'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Show turnover cost math",
          es: "Muestre matemáticas de costo de rotación",
        },
        script: {
          en: "'Let me show you the turnover math. If you hire me at $20/hr and I leave in 18 months because another FQHC offers $24/hr, you lose: 3 months of recruiting and onboarding, loss of institutional knowledge, community relationship loss. That's $8-10K in direct costs. Paying me $23/hr now costs $6K/year more, but saves you $8-10K in turnover costs.'",
          es: "'Déjeme mostrarle la matemática de rotación. Si me contrata a $20/hr y me voy en 18 meses porque otro FQHC ofrece $24/hr, pierde: 3 meses de reclutamiento e incorporación, pérdida de conocimiento institucional, pérdida de relación comunitaria. Eso es $8-10K en costos directos. Pagarme $23/hr ahora cuesta $6K/año más, pero le ahorra $8-10K en costos de rotación.'",
        },
        employerResponse: {
          en: "'That's a good point, but we're not budgeted for that. Let me talk to leadership.' (Opening!)",
          es: "'Ese es un buen punto, pero no estamos presupuestados para eso. Déjeme hablar con liderazgo.' (¡Apertura!)",
        },
        counterTactic: {
          en: "This is progress. They're considering it. Follow up in 2 days: 'I'm still very interested. Did you get feedback from leadership on adjusting the offer to $23/hr?'",
          es: "Este es progreso. Están considerándolo. Haga seguimiento en 2 días: 'Aún estoy muy interesado. ¿Obtuvo comentarios del liderazgo sobre ajustar la oferta a $23/hr?'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Propose tiered total comp if base salary stalls",
          es: "Proponga compensación total escalonada si el salario base se estanca",
        },
        script: {
          en: "'I understand budget constraints. What if we structure this way: start at $21.50/hr, but add: $1K sign-on bonus, 15 days PTO (vs. 10), $500 bilingual differential (annual), and a 6-month review for salary adjustment based on community impact metrics. Does that work?'",
          es: "'Entiendo las restricciones presupuestarias. ¿Y si estructuramos de esta manera: comenzar a $21.50/hr, pero agregar: bono de firma de $1K, 15 días de PTO (vs. 10), diferencial bilingüe de $500 (anual) y una revisión de 6 meses para ajuste salarial basado en métricas de impacto comunitario. ¿Funciona eso?'",
        },
        employerResponse: {
          en: "'We can do $21.50/hr, 15 days PTO, and the sign-on bonus. The bilingual differential and 6-month review is reasonable. Let me get that to you in writing.'",
          es: "'Podemos hacer $21.50/hr, 15 días de PTO y el bono de firma. El diferencial bilingüe y la revisión de 6 meses es razonable. Déjeme enviárselo por escrito.'",
        },
        counterTactic: {
          en: "Calculate total value: $21.50 × 2,080 = $44,720 + $11K health ins + $1K sign-on + $3K PTO value + $500 bilingual = $60.22K total comp. That's closer to $24/hr equivalent.",
          es: "Calcule el valor total: $21.50 × 2,080 = $44,720 + $11K seguro de salud + $1K firma + $3K valor de PTO + $500 bilingüe = $60.22K compensación total. Eso es más cercano al equivalente de $24/hr.",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Lock in the 6-month review commitment in writing",
          es: "Asegure el compromiso de revisión de 6 meses por escrito",
        },
        script: {
          en: "'Great. Before I accept, I want to confirm the 6-month review in writing: 'At 6-month mark, CHW salary will be reviewed for adjustment to $23/hr pending demonstration of community engagement metrics (patient satisfaction, referral volume, community relationship strength).' Can you include that language in the offer?'",
          es: "'Excelente. Antes de aceptar, quiero confirmar la revisión de 6 meses por escrito: 'En la marca de 6 meses, el salario de CHW será revisado para ajuste a $23/hr dependiendo de la demostración de métricas de compromiso comunitario (satisfacción del paciente, volumen de derivaciones, fortaleza de relación comunitaria).' ¿Puede incluir ese lenguaje en la oferta?'",
        },
        employerResponse: {
          en: "'Yes, we can add that. Here's your updated offer.' (Victory — you've locked in a path to market rate.)",
          es: "'Sí, podemos agregar eso. Aquí está su oferta actualizada.' (Victoria — ha asegurado un camino hacia la tasa de mercado.)",
        },
        counterTactic: {
          en: "Review the written offer carefully. Make sure '6-month review for salary adjustment to $23/hr' is explicit, not vague. Sign and celebrate.",
          es: "Revise la oferta escrita cuidadosamente. Asegúrese de que 'revisión de 6 meses para ajuste salarial a $23/hr' sea explícito, no vago. Firme y celebre.",
        },
      },
    ],
    sb525Leverage: {
      en: "While SB 525 sets a $25/hr floor by June 2026, CHW wages are driven more by SB 803 (pending CHW licensure law). Use both: SB 525 signals tight labor market, SB 803 signals credential professionalization. Together, they justify $23-25/hr now. Frame it as: 'Both laws signal the value of health workers is rising. Market rates reflect that reality.'",
      es: "Aunque SB 525 establece un piso de $25/hr para junio de 2026, los salarios de CHW están más impulsados por SB 803 (ley de licencia CHW pendiente). Use ambos: SB 525 señala un mercado laboral ajustado, SB 803 señala profesionalización de credenciales. Juntos, justifican $23-25/hr ahora. Enmarquelo como: 'Ambas leyes señalan que el valor de los trabajadores de salud está aumentando. Las tasas del mercado reflejan esa realidad.'",
    },
    totalCompFramework: {
      en: "CHW total comp: base $21.50-23/hr + health insurance ($11K) + 15 days PTO ($3K+) + sign-on $1K + bilingual differential ($500+) + CME allowance ($250) + 3% 401k match ($1.4K) = $56-62K total comp. This is competitive.",
      es: "Compensación total de CHW: base $21.50-23/hr + seguro de salud ($11K) + 15 días de PTO ($3K+) + firma $1K + diferencial bilingüe ($500+) + asignación CME ($250) + coincidencia 401k 3% ($1.4K) = $56-62K compensación total. Esto es competitivo.",
    },
    primarySourceUrl:
      "https://www.hrsa.gov/sites/default/files/hrsa/about/organization/bureaus/opon/hr-4206-approved-chw-training.pdf",
  },
  {
    id: "rn-clinic-negotiation",
    role: "registered-nurse-clinic",
    title: {
      en: "Registered Nurse (Clinic) Salary Negotiation",
      es: "Negociación de Salario de Enfermera Registrada (Clínica)",
    },
    situation: {
      en: "Offer: $85K. You have 7 years of clinic nursing experience, have mentored 2 student nurses. Market rate: $105-120K. California has critical RN shortage.",
      es: "Oferta: $85K. Tiene 7 años de experiencia en enfermería de clínica, ha mentorizado a 2 enfermeras estudiantes. Tasa de mercado: $105-120K. California tiene una escasez crítica de RN.",
    },
    marketRate: { p25: 102, p50: 115, p75: 130 },
    currentOffer: 85,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Lead with California RN shortage data",
          es: "Lidere con datos de escasez de RN de California",
        },
        script: {
          en: "'I'm very interested in this role. Before we discuss compensation, I want to acknowledge the California RN shortage. According to the California Hospital Association, there's a 15% RN vacancy rate state-wide. That puts experienced clinic nurses in high demand. I've been researching RN salaries in this region for clinic settings, and the market range is $105-120K for someone with my experience level.'",
          es: "'Estoy muy interesado en este rol. Antes de discutir compensación, quiero reconocer la escasez de RN de California. Según la Asociación de Hospitales de California, hay una tasa de vacancia de RN del 15% en todo el estado. Eso pone a las enfermeras de clínica experimentadas en alta demanda. He estado investigando salarios de RN en esta región para configuraciones de clínica, y el rango de mercado es $105-120K para alguien con mi nivel de experiencia.'",
        },
        employerResponse: {
          en: "'We understand the market pressure. Our offer of $85K reflects our FQHC budget. We're a nonprofit with limited margins.' (Budget constraint + nonprofit positioning)",
          es: "'Entendemos la presión del mercado. Nuestra oferta de $85K refleja nuestro presupuesto de FQHC. Somos una organización sin fines de lucro con márgenes limitados.' (Restricción presupuestaria + posicionamiento sin fines de lucro)",
        },
        counterTactic: {
          en: "Acknowledge nonprofit status but redirect: 'I respect that FQHCs operate on tight margins. But your RN vacancy impacts patient care and revenue. An experienced RN reduces training costs, improves patient outcomes, and retains institutional knowledge. Let's talk about what that's worth.'",
          es: "Reconozca el estado sin fines de lucro pero redirija: 'Respeto que los FQHC operen con márgenes apretados. Pero su vacancia de RN impacta la atención del paciente e ingresos. Una RN experimentada reduce costos de capacitación, mejora resultados de pacientes y retiene conocimiento institucional. Hablemos sobre lo que vale.'",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Quantify your mentorship and training value",
          es: "Cuantifique su valor de mentoría y capacitación",
        },
        script: {
          en: "'I've mentored 2 nursing students to graduation, reducing your new-hire training burden. I develop clinic protocols, train new staff, and maintain continuity. Training a replacement RN costs $15-20K in onboarding. Losing me means losing all that institutional knowledge. If you can retain me at market rate, you avoid that cost.'",
          es: "'He mentorizado a 2 estudiantes de enfermería hasta la graduación, reduciendo su carga de capacitación de nuevos empleados. Desarrollo protocolos de clínica, capacito personal nuevo y mantengo continuidad. La capacitación de una RN de reemplazo cuesta $15-20K en incorporación. Perderme significa perder todo ese conocimiento institucional. Si puede retenerme a tasa de mercado, evita ese costo.'",
        },
        employerResponse: {
          en: "'Those are good points. But we have to be fiscally responsible. We can do $90K. That's our best offer.'",
          es: "'Esos son buenos puntos. Pero tenemos que ser fiscalmente responsables. Podemos hacer $90K. Esa es nuestra mejor oferta.'",
        },
        counterTactic: {
          en: "Don't accept $90K yet. Push back: 'I appreciate the increase to $90K. But that's still 15-20% below market. A $5K increase shows effort but doesn't reflect market reality. Can we reach $100K or explore other comp components?'",
          es: "No acepte $90K aún. Empuje: 'Aprecio el aumento a $90K. Pero eso sigue siendo 15-20% por debajo del mercado. Un aumento de $5K muestra esfuerzo pero no refleja realidad del mercado. ¿Podemos llegar a $100K o explorar otros componentes de compensación?'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Introduce loan repayment as alternative leverage",
          es: "Introduzca reembolso de préstamo como alternativa de ventaja",
        },
        script: {
          en: "'I understand budget constraints. But here's an alternative: If the base salary cap is $90K, is your FQHC eligible for NHSC loan repayment? I have $60K in student loans. If you can offer $90K base + $50K NHSC loan repayment over 3 years, that's equivalent to $105K+ over time, and the loan repayment comes from a federal program, not your budget.'",
          es: "'Entiendo las restricciones presupuestarias. Pero aquí hay una alternativa: Si el tope salarial base es $90K, ¿es su FQHC elegible para reembolso de préstamo NHSC? Tengo $60K en préstamos estudiantiles. Si puede ofrecer $90K base + reembolso de préstamo NHSC de $50K durante 3 años, eso es equivalente a $105K+ con el tiempo, y el reembolso de préstamo proviene de un programa federal, no de su presupuesto.'",
        },
        employerResponse: {
          en: "'Yes, we have NHSC slots. That's a good idea. Let me check if a clinic RN qualifies and how many slots we have available.'",
          es: "'Sí, tenemos espacios NHSC. Esa es una buena idea. Déjeme verificar si una RN de clínica califica y cuántos espacios disponibles tenemos.'",
        },
        counterTactic: {
          en: "This is a win. If NHSC works, you get to market-rate compensation without straining their budget. If NHSC doesn't work for clinic nurses, follow up: 'If NHSC isn't available, can we do $95K base + $1.5K CME + $2K sign-on to total $98.5K?'",
          es: "Este es un ganador. Si NHSC funciona, llega a compensación de tasa de mercado sin tensar su presupuesto. Si NHSC no funciona para enfermeras de clínica, haga seguimiento: 'Si NHSC no está disponible, ¿podemos hacer $95K base + CME de $1.5K + firma de $2K para totalizar $98.5K?'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Propose RN advancement pathway investment",
          es: "Proponga inversión en trayectoria de avance de RN",
        },
        script: {
          en: "'I'm also interested in advancement. Many nurses move into NP roles eventually. If your FQHC would support my RN-to-MSN pathway with tuition reimbursement ($5K/year), and we work toward that goal over 3-4 years, I'd be invested long-term in this organization. That's retention value worth discussing.'",
          es: "'También estoy interesado en el avance. Muchas enfermeras eventualmente se trasladan a roles de NP. Si su FQHC apoyaría mi trayectoria RN-a-MSN con reembolso de matrícula ($5K/año) y trabajamos hacia ese objetivo en 3-4 años, estaría inversamente comprometido a largo plazo con esta organización. Ese es un valor de retención que vale la pena discutir.'",
        },
        employerResponse: {
          en: "'We do support professional development. If you commit to a 3-year stay, we can discuss tuition reimbursement. But that would be after your first year.' (Retention angle accepted)",
          es: "'Apoyamos el desarrollo profesional. Si se compromete a una estadía de 3 años, podemos discutir reembolso de matrícula. Pero eso sería después de su primer año.' (Ángulo de retención aceptado)",
        },
        counterTactic: {
          en: "Secure the deal: 'Great. Let me propose the full package: $95K base salary, 20 days PTO, 4% 401k match, health insurance, NHSC loan repayment if available, and tuition reimbursement ($5K/year) starting year 2 after a 3-year commitment. Can we put this in writing?'",
          es: "Asegure el trato: 'Excelente. Permítame proponer el paquete completo: salario base de $95K, 20 días de PTO, coincidencia 401k del 4%, seguro de salud, reembolso de préstamo NHSC si está disponible, y reembolso de matrícula ($5K/año) a partir del año 2 después de un compromiso de 3 años. ¿Podemos ponerlo por escrito?'",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Finalize the written offer with growth language",
          es: "Finalice la oferta escrita con lenguaje de crecimiento",
        },
        script: {
          en: "'Perfect. I want the offer to include: (1) $95K base, (2) NHSC loan repayment eligibility for $50K over 3 years, (3) Tuition reimbursement up to $5K/year starting year 2 for RN-to-MSN pursuit, (4) Annual salary review at cost-of-living minimum, (5) Expectation of 3-year commitment with retention bonus at 3-year mark. Does this capture our discussion?'",
          es: "'Perfecto. Quiero que la oferta incluya: (1) Base de $95K, (2) Elegibilidad de reembolso de préstamo NHSC para $50K durante 3 años, (3) Reembolso de matrícula hasta $5K/año a partir del año 2 para perseguir RN-a-MSN, (4) Revisión salarial anual con mínimo de costo de vida, (5) Expectativa de compromiso de 3 años con bono de retención en marca de 3 años. ¿Esto captura nuestra discusión?'",
        },
        employerResponse: {
          en: "'Yes, that all makes sense. Let me draft the full offer letter with those terms. You should see it within 2 business days.' (You've structured a comprehensive win.)",
          es: "'Sí, eso tiene sentido. Déjame redactar la carta de oferta completa con esos términos. Debería verla en 2 días hábiles.' (Ha estructurado una victoria completa.)",
        },
        counterTactic: {
          en: "Review the offer letter carefully when received. Ensure NHSC is explicitly mentioned, tuition reimbursement timeline is clear (starting Year 2), and the 3-year retention plan is written. Sign and start your new role confident you negotiated well.",
          es: "Revise cuidadosamente la carta de oferta cuando la reciba. Asegúrese de que NHSC se menciona explícitamente, el cronograma de reembolso de matrícula es claro (comenzando en el Año 2) y el plan de retención de 3 años está escrito. Firme y comience su nuevo rol confiado de que negoció bien.",
        },
      },
    ],
    sb525Leverage: {
      en: "SB 525 elevates all healthcare worker wages, but RN salaries (typically $85K+) are already above minimum wage. Your leverage is California's critical RN shortage (15% vacancy rate). Use this: 'California's RN shortage means experienced nurses have options. Starting me at market rate ensures you retain institutional knowledge and avoid costly turnover.'",
      es: "SB 525 eleva los salarios de todos los trabajadores de salud, pero los salarios de RN (típicamente $85K+) ya están por encima del salario mínimo. Su ventaja es la escasez crítica de RN de California (tasa de vacancia del 15%). Use esto: 'La escasez de RN de California significa que las enfermeras experimentadas tienen opciones. Comenzarme a tasa de mercado asegura que retenga conocimiento institucional y evite rotación costosa.'",
    },
    totalCompFramework: {
      en: "RN clinic total comp: base $95K + health insurance ($14K) + 20 days PTO ($4.6K) + NHSC $16.7K/year (3-year avg $50K) + 401k 4% match ($3.8K) + CME $1.5K + tuition reimbursement $5K (Year 2+) = $135-145K total comp. This is market rate.",
      es: "Compensación total de RN clínica: base $95K + seguro de salud ($14K) + 20 días de PTO ($4.6K) + NHSC $16.7K/año (promedio de 3 años $50K) + coincidencia 401k 4% ($3.8K) + CME $1.5K + reembolso de matrícula $5K (Año 2+) = $135-145K compensación total. Esta es la tasa de mercado.",
    },
    primarySourceUrl:
      "https://www.bls.gov/oes/current/oes291111.htm",
  },
  {
    id: "lcsw-negotiation",
    role: "behavioral-health-lcsw",
    title: {
      en: "Behavioral Health Clinician (LCSW) Salary Negotiation",
      es: "Negociación de Salario de Clínico de Salud del Comportamiento (LCSW)",
    },
    situation: {
      en: "Offer: $72K. You have LCSW license (5 years post-MSW), bilingual, can diagnose and treat independently. Market rate: $88-102K. CalAIM integration means BH demand is surging.",
      es: "Oferta: $72K. Tiene licencia LCSW (5 años post-MSW), es bilingüe, puede diagnosticar y tratar independientemente. Tasa de mercado: $88-102K. La integración de CalAIM significa que la demanda de BH está aumentando.",
    },
    marketRate: { p25: 85, p50: 95, p75: 110 },
    currentOffer: 72,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Highlight CalAIM integration urgency",
          es: "Destaque urgencia de integración de CalAIM",
        },
        script: {
          en: "'CalAIM has created unprecedented demand for integrated behavioral health in FQHCs. Your ECM reimbursement includes BH support, and your beneficiaries expect it. An LCSW can bill independently, manage complex cases, and train your clinic staff. That's high-value clinical work. The offer of $72K doesn't reflect the market value of independent BH providers right now.'",
          es: "'CalAIM ha creado una demanda sin precedentes de salud del comportamiento integrada en FQHC. Su reembolso de ECM incluye soporte de BH, y sus beneficiarios lo esperan. Un LCSW puede facturar independientemente, gestionar casos complejos y capacitar a su personal de clínica. Ese es trabajo clínico de alto valor. La oferta de $72K no refleja el valor de mercado de proveedores independientes de BH en este momento.'",
        },
        employerResponse: {
          en: "'We agree BH is critical. But we're a primary care FQHC, not a BH specialist org. We're developing our BH program as we go. Our budget reflects that.'",
          es: "'Estamos de acuerdo en que BH es crítico. Pero somos un FQHC de atención primaria, no una organización especializada en BH. Estamos desarrollando nuestro programa de BH conforme avanzamos. Nuestro presupuesto refleja eso.'",
        },
        counterTactic: {
          en: "Turn their development argument into your leverage: 'That's exactly why you need an experienced LCSW. I can build your BH program from scratch. That's not a junior clinician job — that's a program-building role worth $90K+. And your ECM patients will benefit immediately.'",
          es: "Convierta su argumento de desarrollo en su ventaja: 'Eso es exactamente por qué necesita una LCSW experimentada. Puedo construir su programa de BH desde cero. Ese no es un trabajo de clínico junior — ese es un rol de construcción de programa que vale $90K+. Y sus pacientes de ECM se beneficiarán inmediatamente.'",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Quantify BH program revenue impact",
          es: "Cuantifique el impacto de ingresos del programa de BH",
        },
        script: {
          en: "'Let me put numbers on this. If you have 2,000 Medi-Cal patients and integrate BH at 15% penetration, that's 300 patients receiving BH services. At $120-150 PMPM for integrated BH, that's $36-45K in annual incremental revenue. I'm generating that value. An LCSW salary of $88K is roughly offset by the revenue I bring in.'",
          es: "'Permítame poner números en esto. Si tiene 2,000 pacientes de Medi-Cal e integra BH con penetración del 15%, eso son 300 pacientes que reciben servicios de BH. A $120-150 PMPM para BH integrado, eso son $36-45K en ingresos incrementales anuales. Estoy generando ese valor. Un salario de LCSW de $88K es aproximadamente compensado por los ingresos que aporto.'",
        },
        employerResponse: {
          en: "'That's helpful context. But I still need approval from our finance team. Let me see what's possible.'",
          es: "'Eso es contexto útil. Pero aún necesito aprobación de nuestro equipo de finanzas. Déjame ver qué es posible.'",
        },
        counterTactic: {
          en: "This is progress. Give them time to check with finance. But also say: 'I appreciate that. When you talk to finance, frame it this way: my salary is an investment in ECM success, not a cost. The BH integration drives PMPM growth.'",
          es: "Este es progreso. Deles tiempo para verificar con finanzas. Pero también diga: 'Aprecio eso. Cuando hables con finanzas, enmarquémoslo así: mi salario es una inversión en éxito de ECM, no un costo. La integración de BH impulsa el crecimiento de PMPM.'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Request bilingual and license level differential",
          es: "Solicite diferencial de nivel de licencia y bilingüe",
        },
        script: {
          en: "'I'm also bilingual Spanish. In California health care, bilingual LCSW wages typically run 8-12% higher than monolingual. Plus, I have my LCSW license, which allows independent practice and billing. That's different from an MSW or LMFT. Can we factor in a license-level differential ($3-5K) plus bilingual differential ($2-3K)?'",
          es: "'También soy bilingüe en español. En la atención de salud de California, los salarios de LCSW bilingüe típicamente son 8-12% más altos que los monolingües. Además, tengo mi licencia de LCSW, que permite práctica independiente y facturación. Eso es diferente a un MSW o LMFT. ¿Podemos factorizar un diferencial a nivel de licencia ($3-5K) más diferencial bilingüe ($2-3K)?'",
        },
        employerResponse: {
          en: "'We don't typically pay bilingual differentials for clinical roles. Your salary reflects your skills.' (Downplaying linguistic value)",
          es: "'Típicamente no pagamos diferenciales bilingües para roles clínicos. Su salario refleja sus habilidades.' (Restando importancia al valor lingüístico)",
        },
        counterTactic: {
          en: "Challenge this directly: 'Bilingual services are a competitive advantage in California health care. Your Medi-Cal patients are 60%+ Latino. BH services in Spanish increase engagement and outcomes. That's value worth compensating. Market data shows bilingual LCSWs earn $88-95K. Monolingual might be $80-85K. The differential is real.'",
          es: "Desafíe esto directamente: 'Los servicios bilingües son una ventaja competitiva en la atención de salud de California. Sus pacientes de Medi-Cal son 60%+ latinos. Los servicios de BH en español aumentan compromiso y resultados. Ese es un valor que vale la pena compensar. Los datos del mercado muestran que las LCSW bilingües ganan $88-95K. Las monolingües podrían ser $80-85K. El diferencial es real.'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Build a comprehensive total comp counter",
          es: "Construya una contra de compensación total completa",
        },
        script: {
          en: "'Let me propose a comprehensive package: $85K base salary, bilingual differential of $3K (built into base), health insurance, 401k 4% match, 20 days PTO, $2K sign-on bonus, $1.5K CME allowance, and a 12-month review for salary adjustment based on BH program growth metrics (patient volume, referral conversion, payer mix). Does that work?'",
          es: "'Permítame proponer un paquete integral: salario base de $85K, diferencial bilingüe de $3K (integrado en la base), seguro de salud, coincidencia 401k del 4%, 20 días de PTO, bono de firma de $2K, asignación de CME de $1.5K, y una revisión de 12 meses para ajuste salarial basado en métricas de crecimiento del programa de BH (volumen de pacientes, conversión de derivaciones, mezcla de pagadores). ¿Funciona eso?'",
        },
        employerResponse: {
          en: "'That's more reasonable. Let me get approval for $85K base. The other components sound fair. Give me a few days.'",
          es: "'Eso es más razonable. Déjame obtener aprobación para base de $85K. Los otros componentes suenan justos. Dame unos pocos días.'",
        },
        counterTactic: {
          en: "Calculate total value: $85K base + $11K health + $3.4K 401k (4%) + $4K PTO + $2K sign-on + $1.5K CME = $107K total comp. That's much closer to market ($95-102K range). You've won.",
          es: "Calcule valor total: $85K base + $11K salud + $3.4K 401k (4%) + $4K PTO + $2K firma + $1.5K CME = $107K compensación total. Eso es mucho más cercano al mercado (rango $95-102K). Ha ganado.",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Secure 12-month program review language",
          es: "Asegure lenguaje de revisión de programa de 12 meses",
        },
        script: {
          en: "'Great. For the offer letter, can we include: '12-month review for salary adjustment to $90K+ pending demonstration of BH program growth: minimum 300 active BH patients in panel, 50%+ referral acceptance rate, and mixed-payer approach (Medi-Cal, commercial, uninsured sliding scale). If metrics are met, salary adjusts to $90K starting Year 2.' Does that capture the partnership we're building?'",
          es: "'Excelente. Para la carta de oferta, ¿podemos incluir: 'Revisión de 12 meses para ajuste salarial a $90K+ dependiendo de demostración de crecimiento del programa de BH: mínimo 300 pacientes activos de BH en panel, tasa de aceptación de derivación del 50%+, y enfoque de mezcla de pagadores (Medi-Cal, comercial, escala móvil sin seguro). Si se cumplen métricas, el salario se ajusta a $90K comenzando Año 2.' ¿Captura eso la asociación que estamos construyendo?'",
        },
        employerResponse: {
          en: "'Yes, that's a fair framework. It shows you're invested in the program, and it gives us a path to increase your salary if you deliver. I'll get the updated offer to you within 2 days.'",
          es: "'Sí, eso es un marco justo. Muestra que estás inversamente en el programa, y nos da un camino para aumentar tu salario si entregas. Te enviaré la oferta actualizada en 2 días.'",
        },
        counterTactic: {
          en: "Confirm receipt of updated offer. Review it carefully. Make sure the 12-month review, BH metrics, and salary adjustment language are explicit. Sign and congratulate yourself — you negotiated a great deal with growth built in.",
          es: "Confirme recepción de oferta actualizada. Revísela cuidadosamente. Asegúrese de que la revisión de 12 meses, métricas de BH e idioma de ajuste salarial sean explícitos. Firme y felicítese — negoció un gran trato con crecimiento integrado.",
        },
      },
    ],
    sb525Leverage: {
      en: "While LCSW salaries are typically above SB 525 minimums, the law signals tight labor markets and workforce value recognition. Use this: 'SB 525 shows California recognizes health worker value and shortage. That includes licensed mental health providers. Market rates for bilingual LCSWs reflect that recognition: $90-100K minimum.'",
      es: "Aunque los salarios de LCSW son típicamente por encima de los mínimos de SB 525, la ley señala mercados laborales ajustados y reconocimiento de valor de la fuerza laboral. Use esto: 'SB 525 muestra que California reconoce el valor y la escasez de trabajadores de salud. Eso incluye proveedores de salud mental con licencia. Las tasas del mercado para LCSW bilingües reflejan ese reconocimiento: mínimo de $90-100K.'",
    },
    totalCompFramework: {
      en: "LCSW behavioral health total comp: base $85-90K + health insurance ($12K) + 401k 4% match ($3.4-3.6K) + 20 days PTO ($4K) + CME $1.5K + sign-on $2K + potential performance bonus $5-8K (if metrics hit) = $108-121K total comp. This is market rate for bilingual LCSW.",
      es: "Compensación total de LCSW de salud del comportamiento: base $85-90K + seguro de salud ($12K) + coincidencia 401k 4% ($3.4-3.6K) + 20 días de PTO ($4K) + CME $1.5K + firma $2K + bonificación de desempeño potencial $5-8K (si métricas aciertos) = $108-121K compensación total. Esta es la tasa de mercado para LCSW bilingüe.",
    },
    primarySourceUrl:
      "https://www.bls.gov/oes/current/oes211023.htm",
  },
  {
    id: "billing-specialist-negotiation",
    role: "billing-specialist",
    title: {
      en: "Medical Billing Specialist Salary Negotiation",
      es: "Negociación de Salario de Especialista en Facturación Médica",
    },
    situation: {
      en: "Offer: $48K. You have 4 years of FQHC PPS billing experience, you understand 340B drug program, you've caught $150K in billing errors for your current employer. Market rate: $58-65K.",
      es: "Oferta: $48K. Tiene 4 años de experiencia en facturación de PPS de FQHC, entiende el programa de drogas 340B, ha detectado $150K en errores de facturación para su empleador actual. Tasa de mercado: $58-65K.",
    },
    marketRate: { p25: 52, p50: 60, p75: 68 },
    currentOffer: 48,
    negotiationTactics: [
      {
        step: 1,
        tactic: {
          en: "Quantify your error-catching and compliance impact",
          es: "Cuantifique su impacto de detección de errores y cumplimiento",
        },
        script: {
          en: "'I've caught $150K in billing errors at my current FQHC. That's prevented claim denials, recovered underpaid claims, and protected the organization from compliance issues. Billing expertise directly impacts your bottom line. A $48K offer doesn't reflect the revenue protection and compliance value I bring.'",
          es: "'He detectado $150K en errores de facturación en mi FQHC actual. Eso ha prevenido rechazos de reclamaciones, recuperado reclamaciones subpagadas y protegido la organización de problemas de cumplimiento. La experiencia de facturación impacta directamente su resultado final. Una oferta de $48K no refleja el valor de protección de ingresos y cumplimiento que aporto.'",
        },
        employerResponse: {
          en: "'That's impressive error catching. But we have a billing compliance staff already. We're looking for someone to join that team, not lead it.'",
          es: "'Eso es una detección de errores impresionante. Pero ya tenemos personal de cumplimiento de facturación. Estamos buscando a alguien que se una a ese equipo, no que lo lidere.'",
        },
        counterTactic: {
          en: "Position yourself as a team elevator: 'I understand. But even as a team member, my error-catching and compliance expertise will elevate your team's performance. That knowledge transfer is valuable. Can we structure the offer to reflect that contribution? $55-57K might be fair.'",
          es: "Posiciónese como elevador de equipo: 'Entiendo. Pero incluso como miembro del equipo, mi experiencia en detección de errores y cumplimiento elevará el desempeño de su equipo. Esa transferencia de conocimiento es valiosa. ¿Podemos estructurar la oferta para reflejar esa contribución? $55-57K podría ser justo.'",
        },
      },
      {
        step: 2,
        tactic: {
          en: "Highlight PPS and 340B expertise as specialized skills",
          es: "Destaque la experiencia de PPS y 340B como habilidades especializadas",
        },
        script: {
          en: "'Not many billing specialists understand FQHC Prospective Payment System or the 340B drug program as deeply as I do. PPS optimization and 340B compliance are specialized skills that directly affect your revenue. According to BLS data, billing specialists with that level of specialization earn $58-65K in California. My $48K offer seems to undervalue that expertise.'",
          es: "'No muchos especialistas en facturación entienden el Sistema de Pago Prospectivo de FQHC o el programa de drogas 340B tan profundamente como yo. La optimización de PPS y el cumplimiento de 340B son habilidades especializadas que afectan directamente sus ingresos. Según datos de BLS, especialistas en facturación con ese nivel de especialización ganan $58-65K en California. Mi oferta de $48K parece subestimar esa experiencia.'",
        },
        employerResponse: {
          en: "'We understand the value, but we're a smaller FQHC. We can't match those larger org salaries. Can you consider location/mission alignment as part of the value?'",
          es: "'Entendemos el valor, pero somos un FQHC más pequeño. No podemos igualar esos salarios de organización más grande. ¿Puede considerar la alineación de ubicación/misión como parte del valor?'",
        },
        counterTactic: {
          en: "Don't let mission substitute for cash. 'Mission matters to me, and that's why I'm interested. But market rates exist for a reason. Smaller FQHCs can't compete on size, but can compete on recognition of value. $55K shows you value my expertise AND you respect market rates.'",
          es: "No deje que la misión sustituya dinero. 'La misión me importa, y por eso estoy interesado. Pero las tasas del mercado existen por una razón. Los FQHC más pequeños no pueden competir en tamaño, pero pueden competir en reconocimiento de valor. $55K muestra que valoras mi experiencia Y respetas las tasas del mercado.'",
        },
      },
      {
        step: 3,
        tactic: {
          en: "Use revenue-raising potential with certification advancement",
          es: "Use potencial de aumento de ingresos con avance de certificación",
        },
        script: {
          en: "'I'm also CPC-eligible (Certified Professional Coder). If your FQHC will support my CPC certification ($1.5K exam + study materials), I can more effectively optimize your billing codes and catch errors. CPC billing specialists typically earn $5-8K more than non-certified specialists. Your investment in my certification pays for itself in improved billing accuracy.'",
          es: "'También soy elegible para CPC (Codificador Profesional Certificado). Si su FQHC apoyará mi certificación CPC ($1.5K examen + materiales de estudio), puedo optimizar más efectivamente sus códigos de facturación y detectar errores. Los especialistas en facturación certificados en CPC típicamente ganan $5-8K más que especialistas no certificados. Su inversión en mi certificación se paga a sí misma en precisión de facturación mejorada.'",
        },
        employerResponse: {
          en: "'We can support certification. That's a reasonable investment. But does that change your salary expectations?'",
          es: "'Podemos apoyar la certificación. Esa es una inversión razonable. ¿Pero eso cambia tus expectativas de salario?'",
        },
        counterTactic: {
          en: "Yes, it does. 'With certification support and the specialized PPS/340B knowledge I bring, $55K base + $1.5K certification support makes sense. The certification will make me even more valuable long-term, justifying the investment.'",
          es: "Sí, lo hace. 'Con apoyo de certificación y el conocimiento especializado de PPS/340B que aporto, $55K base + $1.5K apoyo de certificación tiene sentido. La certificación me hará aún más valiosa a largo plazo, justificando la inversión.'",
        },
      },
      {
        step: 4,
        tactic: {
          en: "Propose performance metrics tied to revenue recovery",
          es: "Proponga métricas de desempeño vinculadas a recuperación de ingresos",
        },
        script: {
          en: "'Let's tie my compensation to outcomes. If I reduce claim denials by 10% or recover $50K+ in previously underpaid claims, does that justify salary adjustment to $58K in year 2? This shows we're aligned on revenue protection goals.'",
          es: "'Vamos a vincular mi compensación a resultados. Si reduzco el rechazo de reclamaciones en un 10% o recupero $50K+ en reclamaciones subpagadas anteriormente, ¿eso justifica ajuste salarial a $58K en el año 2? Esto muestra que estamos alineados en objetivos de protección de ingresos.'",
        },
        employerResponse: {
          en: "'That's fair. We like pay-for-performance. Let's structure this: $52K base, and if you hit those metrics at the 12-month mark, we adjust to $58K.'",
          es: "'Eso es justo. Nos gusta el pago por desempeño. Estructurémos esto: base de $52K, y si alcanzas esas métricas en la marca de 12 meses, ajustamos a $58K.'",
        },
        counterTactic: {
          en: "Close the gap: 'How about $54K base with the $58K at 12 months if metrics hit? That's a middle ground that acknowledges both my current expertise and my future performance.'",
          es: "Cierre la brecha: '¿Qué tal $54K base con $58K a los 12 meses si las métricas aciertos? Ese es un término medio que reconoce tanto mi experiencia actual como mi desempeño futuro.'",
        },
      },
      {
        step: 5,
        tactic: {
          en: "Finalize with full total comp package",
          es: "Finalice con paquete completo de compensación total",
        },
        script: {
          en: "'Great. Let me confirm the full package: $54K base, health insurance, 401k 3% match, 15 days PTO, $1.5K certification support (CPC), $1K sign-on bonus, and 12-month performance review for salary adjustment to $58K if denials drop 10% or claims recovery exceeds $50K. Can we put this in writing?'",
          es: "'Excelente. Déjame confirmar el paquete completo: base de $54K, seguro de salud, coincidencia 401k del 3%, 15 días de PTO, apoyo de certificación de $1.5K (CPC), bono de firma de $1K, y revisión de desempeño de 12 meses para ajuste salarial a $58K si el rechazo cae 10% o la recuperación de reclamaciones excede $50K. ¿Podemos ponerlo por escrito?'",
        },
        employerResponse: {
          en: "'Yes, that's solid. I'll get you the updated offer within 2 days. Welcome to the team.'",
          es: "'Sí, eso es sólido. Te enviaré la oferta actualizada en 2 días. Bienvenido al equipo.'",
        },
        counterTactic: {
          en: "Calculate total value: $54K base + $10K health + $1.62K 401k (3%) + $3K PTO + $1.5K cert + $1K sign-on = $71K first year + path to $78K year 2 if you hit metrics. You've negotiated well.",
          es: "Calcule valor total: $54K base + $10K salud + $1.62K 401k (3%) + $3K PTO + $1.5K cert + $1K firma = $71K primer año + camino a $78K año 2 si alcanza métricas. Ha negociado bien.",
        },
      },
    ],
    sb525Leverage: {
      en: "While billing specialists are typically above SB 525 minimums, the law signals sector-wide wage growth and competitive pressure. Use this: 'SB 525 is raising wages across all FQHC roles, which tightens labor markets for specialized roles like billing. Starting at market rate ($54-55K) protects you from needing rapid adjustments as the entire market shifts upward.'",
      es: "Aunque los especialistas en facturación son típicamente por encima de los mínimos de SB 525, la ley señala crecimiento salarial y presión competitiva en todo el sector. Use esto: 'SB 525 está elevando los salarios en todos los roles de FQHC, lo que ajusta los mercados laborales para roles especializados como facturación. Comenzar a tasa de mercado ($54-55K) lo protege de necesitar ajustes rápidos a medida que todo el mercado se desplaza hacia arriba.'",
    },
    totalCompFramework: {
      en: "Billing specialist total comp: base $54-58K + health insurance ($10K) + 401k 3% match ($1.6-1.7K) + 15 days PTO ($3K) + certification support ($1.5K) + sign-on bonus ($1K) = $71-81K total comp. This is competitive.",
      es: "Compensación total de especialista en facturación: base $54-58K + seguro de salud ($10K) + coincidencia 401k 3% ($1.6-1.7K) + 15 días de PTO ($3K) + apoyo de certificación ($1.5K) + bono de firma ($1K) = $71-81K compensación total. Esto es competitivo.",
    },
    primarySourceUrl:
      "https://www.bls.gov/oes/current/oes439021.htm",
  },
];

// ... Additional scenarios to follow in next section ...

// ============================================================================
// COMMON NEGOTIATION MISTAKES
// ============================================================================

export const NEGOTIATION_MISTAKES: NegotiationMistake[] = [
  {
    id: "no-negotiation",
    mistake: {
      en: "Not negotiating at all",
      es: "No negociar en absoluto",
    },
    why: {
      en: "60% of healthcare workers don't negotiate. Employers expect it and budget for it. By not negotiating, you leave 5-15% on the table ($3K-$15K+ depending on role).",
      es: "El 60% de los trabajadores de salud no negocian. Los empleadores lo esperan y lo presupuestan. Al no negociar, deja 5-15% sobre la mesa ($3K-$15K+ según el rol).",
    },
    instead: {
      en: "Always negotiate. Even if you're nervous, a simple 'Can we reach $X?' opens the door. Employers respect candidates who know their worth.",
      es: "Siempre negocie. Incluso si está nervioso, un simple '¿Podemos llegar a $X?' abre la puerta. Los empleadores respetan a los candidatos que conocen su valor.",
    },
  },
  {
    id: "salary-sharing",
    mistake: {
      en: "Disclosing your current salary or giving a salary history",
      es: "Divulgar su salario actual o dar un historial salarial",
    },
    why: {
      en: "California Labor Code §432.3 prohibits employers from asking. But many still ask or ask you to provide prior W-2s. Your past salary shouldn't anchor your future one. If you were underpaid before, that becomes their anchor to underpay you again.",
      es: "El Código Laboral de California §432.3 prohíbe que los empleadores pregunten. Pero muchos aún preguntan o le piden que proporcione W-2 anteriores. Su salario pasado no debería ser el ancla para el futuro. Si fue subpagado antes, eso se convierte en su ancla para subpagarlo nuevamente.",
    },
    instead: {
      en: "Say: 'I prefer to discuss the market rate for this role rather than my prior salary. What's the market range for this position?' Redirect to EXTERNAL market data, not your history.",
      es: "Diga: 'Prefiero discutir la tasa de mercado para este rol en lugar de mi salario anterior. ¿Cuál es el rango de mercado para esta posición?' Redirija a datos de MERCADO EXTERNO, no a su historia.",
    },
  },
  {
    id: "first-offer-acceptance",
    mistake: {
      en: "Accepting the first offer without a counter",
      es: "Aceptar la primera oferta sin una contra",
    },
    why: {
      en: "Employers intentionally lowball initial offers to see if you'll negotiate. First offers are typically 10-20% below what they're willing to pay. Accepting signals you either don't know your worth or don't value yourself.",
      es: "Los empleadores bajan intencionalmente las ofertas iniciales para ver si negociará. Las primeras ofertas son típicamente 10-20% por debajo de lo que están dispuestos a pagar. Aceptar señala que o no conoce su valor o no se valora a sí mismo.",
    },
    instead: {
      en: "Always counter, even if it's a small ask: 'Thank you for the offer. Based on market research, I was expecting $X. Can we negotiate?' This opens the door and rarely results in offer withdrawal.",
      es: "Siempre contra, incluso si es una pequeña solicitud: 'Gracias por la oferta. Basado en investigación de mercado, esperaba $X. ¿Podemos negociar?' Esto abre la puerta y rara vez resulta en retiro de oferta.",
    },
  },
  {
    id: "base-salary-only",
    mistake: {
      en: "Only negotiating base salary, ignoring total compensation",
      es: "Solo negociar salario base, ignorando compensación total",
    },
    why: {
      en: "Total comp includes health insurance, 401k match, PTO, CME, bonuses, tuition reimbursement, loan repayment, bilingual differential, etc. Focusing only on base salary means you miss 30-40% of your actual value.",
      es: "La compensación total incluye seguro de salud, coincidencia 401k, PTO, CME, bonificaciones, reembolso de matrícula, reembolso de préstamo, diferencial bilingüe, etc. Enfocarse solo en salario base significa que se pierde 30-40% de su valor real.",
    },
    instead: {
      en: "Negotiate holistically: 'If base salary is capped at $X, let's discuss total comp: What's the health insurance value? 401k match percentage? PTO days? Sign-on bonus?' Get the full picture and total comp often gets you to market rate.",
      es: "Negocie holísticamente: 'Si el salario base está limitado a $X, discutamos compensación total: ¿Cuál es el valor del seguro de salud? ¿Porcentaje de coincidencia 401k? ¿Días de PTO? ¿Bono de firma?' Obtenga el cuadro completo y la compensación total a menudo lo lleva a tasa de mercado.",
    },
  },
  {
    id: "no-research",
    mistake: {
      en: "Not researching market rates before interview or negotiation",
      es: "No investigar tasas de mercado antes de entrevista o negociación",
    },
    why: {
      en: "Without market data, you negotiate from emotion ('I need this job') instead of data. Employers know market rates and will exploit your lack of knowledge.",
      es: "Sin datos de mercado, negocia desde la emoción ('Necesito este trabajo') en lugar de datos. Los empleadores conocen las tasas del mercado y explotarán su falta de conocimiento.",
    },
    instead: {
      en: "Before any interview, research: (1) BLS.gov salary data for your role + CA, (2) Glassdoor reviews + salary estimates, (3) Indeed salary data, (4) CHCF salary surveys if available. Know P25, P50, P75. Go into negotiation prepared.",
      es: "Antes de cualquier entrevista, investigue: (1) Datos salariales de BLS.gov para su rol + CA, (2) Reseñas de Glassdoor + estimaciones salariales, (3) Datos salariales de Indeed, (4) Encuestas salariales de CHCF si están disponibles. Conozca P25, P50, P75. Vaya a la negociación preparado.",
    },
  },
  {
    id: "i-need-framing",
    mistake: {
      en: "Using 'I need' language instead of 'market data' language",
      es: "Usar lenguaje 'Necesito' en lugar de lenguaje 'datos de mercado'",
    },
    why: {
      en: "Saying 'I need $X because I have rent' is emotional and weak. Employers will counter: 'That's your personal problem, not ours.' Market data is objective and harder to argue against.",
      es: "Decir 'Necesito $X porque tengo alquiler' es emocional y débil. Los empleadores contraatacarán: 'Ese es tu problema personal, no el nuestro.' Los datos del mercado son objetivos y más difíciles de argumentar.",
    },
    instead: {
      en: "Use market language: 'Based on BLS data and Glassdoor reviews, care coordinators with my experience level earn $58-65K in California. Market data supports that range. Can we reach $60K?'",
      es: "Use lenguaje de mercado: 'Basado en datos de BLS y reseñas de Glassdoor, coordinadores de atención con mi nivel de experiencia ganan $58-65K en California. Los datos de mercado apoyan ese rango. ¿Podemos llegar a $60K?'",
    },
  },
  {
    id: "too-early-negotiation",
    mistake: {
      en: "Negotiating salary before the offer",
      es: "Negociar salario antes de la oferta",
    },
    why: {
      en: "If you discuss salary during interviews before a formal offer, you lock yourself into a range. Once you say 'I expect $X', that becomes their ceiling. Let them make the offer first.",
      es: "Si discute salario durante entrevistas antes de una oferta formal, se bloquea en un rango. Una vez que dice 'Espero $X', eso se convierte en su límite. Deje que hagan la oferta primero.",
    },
    instead: {
      en: "During interviews, when asked about salary expectations, say: 'I'm flexible and want to focus on the role fit first. I'm sure you have a competitive range in mind. What's the budget for this position?' Deflect until you have an offer.",
      es: "Durante entrevistas, cuando le pregunten sobre expectativas salariales, diga: 'Soy flexible y quiero enfocarse primero en el ajuste del rol. Estoy seguro de que tiene un rango competitivo en mente. ¿Cuál es el presupuesto para esta posición?' Desvíe hasta tener una oferta.",
    },
  },
  {
    id: "no-written-confirmation",
    mistake: {
      en: "Not getting the negotiated offer in writing",
      es: "No obtener la oferta negociada por escrito",
    },
    why: {
      en: "Verbal agreements are easily forgotten or disputed. If you agree to $58K + $1.5K sign-on + PTO adjustment, that must be in the written offer letter. Otherwise, you have no recourse.",
      es: "Los acuerdos verbales se olvidan fácilmente o se disputan. Si acepta $58K + $1.5K firma + ajuste de PTO, eso debe estar en la carta de oferta escrita. De lo contrario, no tiene recurso.",
    },
    instead: {
      en: "After verbal negotiation, say: 'Great, let me confirm what we discussed: salary $58K, sign-on bonus $1.5K, 15 days PTO, CME allowance $500/year, starting [DATE]. Can you send me an updated offer letter with these terms?' Don't start until it's in writing.",
      es: "Después de negociación verbal, diga: 'Excelente, déjame confirmar lo que discutimos: salario $58K, bono de firma $1.5K, 15 días de PTO, asignación de CME $500/año, comenzando [FECHA]. ¿Puede enviarme una carta de oferta actualizada con estos términos?' No comience hasta que esté por escrito.",
    },
  },
  {
    id: "pto-schedule-forgotten",
    mistake: {
      en: "Forgetting to negotiate PTO and schedule",
      es: "Olvidar negociar PTO y horario",
    },
    why: {
      en: "PTO is worth $3-8K/year depending on role. Schedule flexibility (early start, comp time, remote days) has real life value. If you don't ask, many FQHCs default to minimums (10 days, rigid schedules).",
      es: "PTO vale $3-8K/año según el rol. La flexibilidad de horario (inicio temprano, tiempo compensatorio, días remotos) tiene valor de vida real. Si no pregunta, muchos FQHC se ajustan a mínimos (10 días, horarios rígidos).",
    },
    instead: {
      en: "Add to negotiation: 'What's the starting PTO? Can we discuss schedule flexibility? Are compressed work weeks or remote options available for this role?' Often these are easier for FQHCs to adjust than base salary.",
      es: "Agregar a negociación: '¿Cuál es el PTO inicial? ¿Podemos discutir flexibilidad de horario? ¿Hay opciones de semanas de trabajo comprimidas u opciones remotas disponibles para este rol?' A menudo, estos son más fáciles para que los FQHC ajusten que el salario base.",
    },
  },
  {
    id: "competing-offers-unethical",
    mistake: {
      en: "Fabricating competing offers to negotiate",
      es: "Fabricar ofertas competidoras para negociar",
    },
    why: {
      en: "FQHCs talk to each other. If you say you have another offer and don't, that lie will damage your reputation in a tight professional community. Trust is critical in healthcare.",
      es: "Los FQHC hablan entre sí. Si dice que tiene otra oferta y no la tiene, esa mentira dañará su reputación en una comunidad profesional apretada. La confianza es crítica en la salud.",
    },
    instead: {
      en: "If you have a real competing offer, use it: 'I have another offer at $60K, but I prefer your FQHC's location and mission. Can you match or get closer to $60K?' If you don't have a competing offer, don't fabricate. Use market data instead.",
      es: "Si tiene una oferta competidora real, úsela: 'Tengo otra oferta a $60K, pero prefiero la ubicación y misión de su FQHC. ¿Puede igualar u acercarse a $60K?' Si no tiene una oferta competidora, no la fabrique. Use datos de mercado en su lugar.",
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getScenariosByRole(role: string): NegotiationScenario[] {
  return NEGOTIATION_SCENARIOS.filter((s) =>
    s.role.toLowerCase().includes(role.toLowerCase())
  );
}

export function getSB525Phases(): SB525Phase[] {
  return SB525_PHASES;
}

export function getTotalCompComponents(): TotalCompComponent[] {
  return TOTAL_COMP_COMPONENTS;
}

export function getNegotiationMistakes(): NegotiationMistake[] {
  return NEGOTIATION_MISTAKES;
}

export function calculateTotalComp(
  baseSalary: number,
  componentIds: string[]
): number {
  let total = baseSalary;

  const componentMap: Record<string, number> = {
    "health-insurance": 12000,
    "nhsc-loan-repayment": 16700, // avg $50K/3 years
    "retirement-401k": 3000, // 3% match on $100K = $3K
    "pto-paid-time-off": 3750, // 15 days at $250/day
    "cme-allowance": 1000,
    "tuition-reimbursement": 2000,
    "bilingual-differential": 3000,
    "certification-bonuses": 500,
    "sign-on-bonus": 2000,
    "relocation-assistance": 2500,
    "malpractice-insurance": 8000,
  };

  componentIds.forEach((id) => {
    if (componentMap[id]) {
      total += componentMap[id];
    }
  });

  return total;
}
