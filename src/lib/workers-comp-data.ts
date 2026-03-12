export const WORKERS_COMP_LAST_UPDATED = "2026-03-10";

export interface BilingualText {
  en: string;
  es: string;
}

export type HazardCategory =
  | "needlestick-sharps"
  | "musculoskeletal"
  | "workplace-violence"
  | "respiratory-infectious"
  | "repetitive-strain"
  | "chemical-exposure"
  | "slips-trips-falls"
  | "bloodborne-pathogen"
  | "latex-allergy"
  | "ergonomic-dental"
  | "stress-burnout"
  | "vehicle-accidents"
  | "drug-diversion"
  | "radiation-exposure"
  | "electrical-hazards";

export interface WorkersCompHazard {
  id: string;
  category: HazardCategory;
  title: BilingualText;
  description: BilingualText;
  affectedRoles: string[];
  caIncidenceRate: number;
  averageCostPerClaim: number;
  lostWorkdays: number;
  preventionStrategies: BilingualText[];
  calOshaCitation: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
}

export interface CostReductionStrategy {
  id: string;
  title: BilingualText;
  description: BilingualText;
  implementationCost: { min: number; max: number };
  annualSavings: { min: number; max: number };
  timelineMonths: number;
  difficulty: "easy" | "moderate" | "complex";
  targetHazards: HazardCategory[];
  steps: BilingualText[];
  primarySourceUrl: string;
  primarySourceOrg: string;
}

export interface WorkersCompCaseStudy {
  id: string;
  title: BilingualText;
  orgType: string;
  location: string;
  challenge: BilingualText;
  intervention: BilingualText;
  outcome: BilingualText;
  costSavings: string;
  timeframe: string;
  primarySourceUrl: string;
  primarySourceOrg: string;
}

export interface WorkersCompStats {
  totalAnnualCost: number;
  averagePremiumRate: number;
  topThreeHazards: string[];
  calOshaInspections2024: number;
  year: number;
}

export const HAZARDS: WorkersCompHazard[] = [
  {
    id: "needlestick-sharps",
    category: "needlestick-sharps",
    title: {
      en: "Needlestick & Sharps Injuries",
      es: "Lesiones por Agujas y Objetos Punzantes",
    },
    description: {
      en: "Percutaneous injuries from contaminated needles, lancets, or surgical instruments that breach skin barrier and create infection risk. Most common in ED, phlebotomy, dental, and surgical settings.",
      es: "Lesiones percutáneas por agujas contaminadas, lancetas o instrumentos quirúrgicos que rompen la barrera cutánea y crean riesgo de infección. Más común en ED, flebotomía, dental y quirúrgica.",
    },
    affectedRoles: ["RN", "MA", "Phlebotomist", "Dental Hygienist", "Dentist", "Surgeon"],
    caIncidenceRate: 26.5,
    averageCostPerClaim: 3200,
    lostWorkdays: 4,
    preventionStrategies: [
      {
        en: "Use safety-engineered devices (retractable needles, needle-free systems)",
        es: "Usar dispositivos con protección integrada (agujas retráctiles, sistemas sin aguja)",
      },
      {
        en: "Establish post-exposure prophylaxis (PEP) protocol and instant reporting",
        es: "Establecer protocolo de profilaxis post-exposición y reporte inmediato",
      },
      {
        en: "Provide annual bloodborne pathogen training (8 CCR §5193 required)",
        es: "Proporcionar capacitación anual sobre patógenos transmitidos por sangre",
      },
      {
        en: "Implement sharps container placement near point of use",
        es: "Implementar contenedores de objetos punzantes cerca del punto de uso",
      },
    ],
    calOshaCitation: "8 CCR §5193",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/bloodbornefaq.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "back-injuries",
    category: "musculoskeletal",
    title: {
      en: "Back & Musculoskeletal Injuries from Patient Handling",
      es: "Lesiones de Espalda y Musculoesqueléticas por Manejo de Pacientes",
    },
    description: {
      en: "Strain injuries from lifting, transferring, and repositioning patients. Leading cause of disability among healthcare workers. Often cumulative and degenerative.",
      es: "Lesiones por estiramientos al levantar, transferir y reposicionar pacientes. Causa principal de discapacidad entre trabajadores sanitarios. A menudo acumulativa y degenerativa.",
    },
    affectedRoles: ["RN", "MA", "CNA", "Home Health Aide", "Physical Therapist"],
    caIncidenceRate: 45.0,
    averageCostPerClaim: 12400,
    lostWorkdays: 18,
    preventionStrategies: [
      {
        en: "Install and train on mechanical lift equipment (ceiling lifts, floor lifts)",
        es: "Instalar y capacitar en equipos de levantamiento mecánico",
      },
      {
        en: "Establish 'no manual lift' policies for high-risk transfers",
        es: "Establecer políticas de 'sin levantamiento manual' para transferencias de alto riesgo",
      },
      {
        en: "Conduct ergonomic assessments and workstation redesign",
        es: "Realizar evaluaciones ergonómicas y rediseño de estaciones de trabajo",
      },
      {
        en: "Provide ongoing back safety and proper lifting technique training",
        es: "Proporcionar capacitación continua sobre seguridad de espalda y técnica adecuada de levantamiento",
      },
    ],
    calOshaCitation: "8 CCR §5120",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA Healthcare Guidance",
  },
  {
    id: "workplace-violence",
    category: "workplace-violence",
    title: {
      en: "Workplace Violence & Patient Aggression",
      es: "Violencia Laboral y Agresión de Pacientes",
    },
    description: {
      en: "Physical or verbal assault by patients, family members, or visitors. California leads nation in healthcare workplace violence incidents. SB 553 mandates prevention programs.",
      es: "Asalto físico o verbal por pacientes, familiares o visitantes. California es líder nacional en incidentes de violencia en lugares de trabajo sanitario.",
    },
    affectedRoles: [
      "RN",
      "MA",
      "Registration Staff",
      "Security",
      "Behavioral Health Staff",
      "CHW",
    ],
    caIncidenceRate: 21.0,
    averageCostPerClaim: 8100,
    lostWorkdays: 12,
    preventionStrategies: [
      {
        en: "Implement SB 553 compliant workplace violence prevention program",
        es: "Implementar programa de prevención de violencia laboral conforme a SB 553",
      },
      {
        en: "Train all staff on de-escalation, crisis intervention, and threat assessment",
        es: "Capacitar a todo el personal en desescalada, intervención en crisis y evaluación de amenazas",
      },
      {
        en: "Establish clear reporting procedures and response protocols",
        es: "Establecer procedimientos claros de reporte y protocolos de respuesta",
      },
      {
        en: "Design safe spaces with panic buttons, security cameras, and exit routes",
        es: "Diseñar espacios seguros con botones de pánico, cámaras de seguridad y rutas de salida",
      },
    ],
    calOshaCitation: "SB 553, 8 CCR §3203",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/workplace-violence.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "covid-respiratory",
    category: "respiratory-infectious",
    title: {
      en: "COVID-19 & Respiratory Pathogen Exposure",
      es: "Exposición a COVID-19 y Patógenos Respiratorios",
    },
    description: {
      en: "Occupational exposure to SARS-CoV-2, influenza, RSV, and other respiratory pathogens. FQHC frontline staff experience higher exposure risk. Includes long-COVID disability claims.",
      es: "Exposición ocupacional a SARS-CoV-2, influenza, RSV y otros patógenos respiratorios. El personal de primera línea de FQHC experimenta mayor riesgo de exposición.",
    },
    affectedRoles: [
      "RN",
      "MA",
      "Respiratory Therapist",
      "Registration",
      "CHW",
      "All Clinical",
    ],
    caIncidenceRate: 18.0,
    averageCostPerClaim: 4500,
    lostWorkdays: 14,
    preventionStrategies: [
      {
        en: "Provide N95/KN95 respirators and fit-testing per 8 CCR §5199",
        es: "Proporcionar respiradores N95/KN95 y prueba de ajuste",
      },
      {
        en: "Implement engineering controls (HEPA filtration, negative pressure rooms)",
        es: "Implementar controles de ingeniería (filtración HEPA, salas de presión negativa)",
      },
      {
        en: "Establish isolation protocols and exposure reporting systems",
        es: "Establecer protocolos de aislamiento y sistemas de reporte de exposición",
      },
      {
        en: "Offer employee vaccination and post-exposure monitoring",
        es: "Ofrecer vacunación y monitoreo post-exposición para empleados",
      },
    ],
    calOshaCitation: "8 CCR §5199",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA COVID-19 Guidance",
  },
  {
    id: "repetitive-strain",
    category: "repetitive-strain",
    title: {
      en: "Repetitive Strain & Carpal Tunnel Syndrome",
      es: "Lesiones por Esfuerzo Repetitivo y Síndrome del Túnel Carpiano",
    },
    description: {
      en: "Cumulative trauma to hands, wrists, arms from repetitive motions (typing, scanning, dental drilling). Dental hygienists and billing staff are highest-risk. Progressive and often career-ending.",
      es: "Trauma acumulativo a manos, muñecas y brazos por movimientos repetitivos. Higienistas dentales y personal de facturación son de mayor riesgo.",
    },
    affectedRoles: [
      "Dental Hygienist",
      "Medical Coder",
      "Dental Assistant",
      "Registration Staff",
      "Billing Staff",
    ],
    caIncidenceRate: 12.0,
    averageCostPerClaim: 15800,
    lostWorkdays: 22,
    preventionStrategies: [
      {
        en: "Conduct ergonomic assessments and modify workstations",
        es: "Realizar evaluaciones ergonómicas y modificar estaciones de trabajo",
      },
      {
        en: "Provide ergonomic equipment (split keyboards, wrist rests, standing desks)",
        es: "Proporcionar equipos ergonómicos (teclados divididos, reposamuñecas, escritorios de pie)",
      },
      {
        en: "Implement job rotation and microbreak policies",
        es: "Implementar rotación de puestos y políticas de microdescansos",
      },
      {
        en: "Provide early warning signs training and report mechanism",
        es: "Proporcionar capacitación sobre signos de alerta temprana",
      },
    ],
    calOshaCitation: "8 CCR §5110, §5120",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "chemical-exposure",
    category: "chemical-exposure",
    title: {
      en: "Chemical Exposure (Sterilants, Disinfectants, Lab Chemicals)",
      es: "Exposición Química (Esterilizantes, Desinfectantes, Químicos de Laboratorio)",
    },
    description: {
      en: "Occupational exposure to glutaraldehyde, ethylene oxide, chlorine-based disinfectants, and lab chemicals. Dental and laboratory staff at highest risk. Can cause respiratory sensitization, dermatitis, and organ damage.",
      es: "Exposición ocupacional a glutaraldehído, óxido de etileno y desinfectantes químicos. El personal de dental y laboratorio tiene mayor riesgo.",
    },
    affectedRoles: ["Dental Hygienist", "Dental Assistant", "Lab Technician", "Sterilization Staff"],
    caIncidenceRate: 6.0,
    averageCostPerClaim: 5200,
    lostWorkdays: 8,
    preventionStrategies: [
      {
        en: "Replace hazardous chemicals with safer alternatives where possible",
        es: "Reemplazar químicos peligrosos con alternativas más seguras",
      },
      {
        en: "Install local exhaust ventilation and engineering controls",
        es: "Instalar ventilación de escape local y controles de ingeniería",
      },
      {
        en: "Provide personal protective equipment (gloves, respirators) per 8 CCR §5155",
        es: "Proporcionar equipo de protección personal (guantes, respiradores)",
      },
      {
        en: "Maintain safety data sheets (SDS) and provide chemical hazard training",
        es: "Mantener hojas de datos de seguridad y proporcionar capacitación sobre peligros químicos",
      },
    ],
    calOshaCitation: "8 CCR §5155, §5157",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "slips-trips-falls",
    category: "slips-trips-falls",
    title: {
      en: "Slips, Trips & Falls",
      es: "Resbalones, Tropiezos y Caídas",
    },
    description: {
      en: "Falls from wet floors, cluttered pathways, inadequate lighting, or height hazards. Affects all roles. Often leads to fractures, head injuries, and permanent disability.",
      es: "Caídas de pisos mojados, pasillos desordenados, iluminación inadecuada o peligros de altura. Afecta todos los roles.",
    },
    affectedRoles: ["All", "Housekeeping", "Nursing", "Facilities", "CHW"],
    caIncidenceRate: 22.0,
    averageCostPerClaim: 9600,
    lostWorkdays: 16,
    preventionStrategies: [
      {
        en: "Install non-slip flooring and maintain dry, clean work areas",
        es: "Instalar pisos antideslizantes y mantener áreas de trabajo secas y limpias",
      },
      {
        en: "Ensure adequate lighting and remove tripping hazards",
        es: "Asegurar iluminación adecuada y eliminar peligros de tropiezo",
      },
      {
        en: "Provide handrails, guardrails, and proper ladder access per 8 CCR §3270",
        es: "Proporcionar barandillas, barreras de protección y acceso adecuado a escaleras",
      },
      {
        en: "Post warning signs and implement slip-resistant shoe recommendations",
        es: "Colocar señales de advertencia e implementar recomendaciones de zapatos antideslizantes",
      },
    ],
    calOshaCitation: "8 CCR §3270",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "bloodborne-pathogen",
    category: "needlestick-sharps",
    title: {
      en: "Bloodborne Pathogen Exposure (non-sharps)",
      es: "Exposición a Patógenos Transmitidos por Sangre (sin agujas)",
    },
    description: {
      en: "Exposure to blood/body fluids through skin/mucous membrane contact or splash. Includes non-occupational exposures (phlebotomist splashes, patient bleeding during procedures).",
      es: "Exposición a sangre/fluidos corporales a través de contacto con piel/membranas mucosas. Incluye exposiciones no ocupacionales.",
    },
    affectedRoles: ["RN", "MA", "Dental Hygienist", "Lab Technician", "Phlebotomist"],
    caIncidenceRate: 14.0,
    averageCostPerClaim: 6800,
    lostWorkdays: 6,
    preventionStrategies: [
      {
        en: "Use standard precautions universally (gloves, face shields, gowns)",
        es: "Usar precauciones estándar universalmente (guantes, protectores faciales, batas)",
      },
      {
        en: "Place absorbent pads under procedures and proper cleanup protocols",
        es: "Colocar almohadillas absorbentes bajo procedimientos y protocolos de limpieza adecuados",
      },
      {
        en: "Establish immediate post-exposure reporting and PEP access",
        es: "Establecer reporte inmediato de exposición post-exposición y acceso a PEP",
      },
      {
        en: "Document all exposures in exposure control plan per 8 CCR §5193",
        es: "Documentar todas las exposiciones en el plan de control de exposición",
      },
    ],
    calOshaCitation: "8 CCR §5193",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/bloodbornefaq.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "latex-allergies",
    category: "chemical-exposure",
    title: {
      en: "Latex & Chemical Allergies/Sensitivities",
      es: "Alergias al Látex y Sensibilidades Químicas",
    },
    description: {
      en: "Occupational sensitization to latex, nitrile, or chemical exposures causing allergic reactions, dermatitis, or respiratory symptoms. Cumulative and can lead to permanent work restrictions.",
      es: "Sensibilización ocupacional al látex, nitrilo o exposiciones químicas causando reacciones alérgicas, dermatitis o síntomas respiratorios.",
    },
    affectedRoles: ["RN", "MA", "Dental Hygienist", "Lab Technician"],
    caIncidenceRate: 8.0,
    averageCostPerClaim: 2400,
    lostWorkdays: 5,
    preventionStrategies: [
      {
        en: "Transition to latex-free gloves and equipment organization-wide",
        es: "Transición a guantes y equipos sin látex en toda la organización",
      },
      {
        en: "Screen staff for latex sensitivity and provide alternative PPE",
        es: "Examinar personal para detectar sensibilidad al látex y proporcionar EPI alternativo",
      },
      {
        en: "Maintain latex-free zones (OR, ED) if needed",
        es: "Mantener zonas sin látex (OR, ED) si es necesario",
      },
      {
        en: "Track sensitization cases and adjust procurement",
        es: "Rastrear casos de sensibilización y ajustar adquisiciones",
      },
    ],
    calOshaCitation: "8 CCR §5193",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "ergonomic-dental",
    category: "musculoskeletal",
    title: {
      en: "Ergonomic Injuries from Dental Work",
      es: "Lesiones Ergonómicas por Trabajo Dental",
    },
    description: {
      en: "Sustained awkward postures, vibration exposure, and repetitive motions during dental procedures. Affects dental hygienists and dentists disproportionately. Often leads to neck, shoulder, and hand dysfunction.",
      es: "Posturas incómodas sostenidas, exposición a vibraciones y movimientos repetitivos durante procedimientos dentales.",
    },
    affectedRoles: ["Dental Hygienist", "Dentist", "Dental Assistant"],
    caIncidenceRate: 35.0,
    averageCostPerClaim: 7200,
    lostWorkdays: 14,
    preventionStrategies: [
      {
        en: "Implement proper chair positioning, mirror angles, and operator posture training",
        es: "Implementar posicionamiento adecuado de silla, ángulos de espejo y capacitación de postura del operador",
      },
      {
        en: "Use ergonomic dental instruments and suction-assisted tools",
        es: "Usar instrumentos dentales ergonómicos y herramientas de succión asistida",
      },
      {
        en: "Conduct periodic ergonomic assessments and microbreak policies",
        es: "Realizar evaluaciones ergonómicas periódicas y políticas de microdescansos",
      },
      {
        en: "Provide stretching and conditioning programs for dental staff",
        es: "Proporcionar programas de estiramiento y acondicionamiento para personal dental",
      },
    ],
    calOshaCitation: "8 CCR §5110",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "stress-burnout",
    category: "respiratory-infectious",
    title: {
      en: "Work-Related Stress & Burnout Injuries",
      es: "Lesiones por Estrés Laboral y Agotamiento",
    },
    description: {
      en: "Psychiatric injury claims from chronic workplace stress, understaffing, and burnout. FQHC staffing crisis (SB 525 wage mandates, H.R. 1 cuts) driving surge in stress claims. Often undiagnosed until PTSD or depression manifest.",
      es: "Reclamos por lesión psiquiátrica causados por estrés laboral crónico, falta de personal y agotamiento.",
    },
    affectedRoles: ["All", "RN", "MA", "CHW", "Behavioral Health"],
    caIncidenceRate: 16.0,
    averageCostPerClaim: 11500,
    lostWorkdays: 25,
    preventionStrategies: [
      {
        en: "Address root causes: adequate staffing, peer support, and fair workload distribution",
        es: "Abordar las causas raíz: personal adecuado, apoyo entre pares y distribución equitativa de carga de trabajo",
      },
      {
        en: "Establish Employee Assistance Program (EAP) and mental health benefits",
        es: "Establecer Programa de Asistencia a Empleados (EAP) y beneficios de salud mental",
      },
      {
        en: "Provide manager training on recognizing stress and psychological first aid",
        es: "Proporcionar capacitación de gerente sobre reconocimiento de estrés y primeros auxilios psicológicos",
      },
      {
        en: "Create peer support committees and debriefing after traumatic incidents",
        es: "Crear comités de apoyo entre pares y sesiones de debriefing después de incidentes traumáticos",
      },
    ],
    calOshaCitation: "Labor Code §3600, 8 CCR §3203",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "vehicle-accidents",
    category: "slips-trips-falls",
    title: {
      en: "Vehicle Accidents (Mobile Health & Home Visits)",
      es: "Accidentes Vehiculares (Salud Móvil y Visitas Domiciliarias)",
    },
    description: {
      en: "Motor vehicle accidents during work-related travel, especially for CHWs, home health nurses, and mobile clinic staff. Rural FQHCs with extended service areas have highest risk. Often fatal or catastrophic.",
      es: "Accidentes de vehículos motorizados durante viajes relacionados con el trabajo, especialmente para CHWs, enfermeras de salud del hogar y personal de clínica móvil.",
    },
    affectedRoles: ["CHW", "Home Health Aide", "Mobile Clinic Staff", "Community Outreach"],
    caIncidenceRate: 5.0,
    averageCostPerClaim: 18000,
    lostWorkdays: 45,
    preventionStrategies: [
      {
        en: "Implement fleet safety program with vehicle maintenance and driver training",
        es: "Implementar programa de seguridad de flota con mantenimiento de vehículos y capacitación de conductores",
      },
      {
        en: "Provide defensive driving course and telematics/dashcam monitoring",
        es: "Proporcionar curso de conducción defensiva y monitoreo de telemática/dashcam",
      },
      {
        en: "Mandate seat belts, limit distractions, and restrict high-risk driving hours",
        es: "Exigir cinturones de seguridad, limitar distracciones y restringir horas de conducción de alto riesgo",
      },
      {
        en: "Establish travel reimbursement policy for use of rideshare/public transit when possible",
        es: "Establecer política de reembolso de viajes para usar servicios compartidos/transporte público cuando sea posible",
      },
    ],
    calOshaCitation: "Labor Code §3600, OSHA Guidelines",
    primarySourceUrl:
      "https://www.osha.gov/dsg/naics/naics4_623.html",
    primarySourceOrg: "OSHA",
  },
  {
    id: "drug-diversion",
    category: "workplace-violence",
    title: {
      en: "Drug Diversion & Theft-Related Incidents",
      es: "Desviación de Drogas e Incidentes Relacionados con Robo",
    },
    description: {
      en: "Workplace incidents involving controlled substance diversion, theft, or violence during confrontations about missing drugs. Affects pharmacy and clinical staff. Creates liability and criminal exposure.",
      es: "Incidentes laborales que involucran desviación de sustancias controladas, robo o violencia durante confrontaciones.",
    },
    affectedRoles: ["Pharmacist", "Pharmacy Tech", "RN", "Clinic Manager", "Security"],
    caIncidenceRate: 2.0,
    averageCostPerClaim: 4500,
    lostWorkdays: 7,
    preventionStrategies: [
      {
        en: "Implement secure pharmaceutical inventory system with tracking/audits",
        es: "Implementar sistema seguro de inventario farmacéutico con seguimiento/auditorías",
      },
      {
        en: "Conduct background checks and training on substance abuse disorder in healthcare",
        es: "Realizar verificaciones de antecedentes y capacitación sobre trastorno por uso de sustancias",
      },
      {
        en: "Establish clear reporting protocols and investigation procedures",
        es: "Establecer protocolos claros de reporte y procedimientos de investigación",
      },
      {
        en: "Provide recovery support resources for affected staff (DEA diversion alert program)",
        es: "Proporcionar recursos de recuperación para el personal afectado",
      },
    ],
    calOshaCitation: "Labor Code §3600, DEA Controlled Substances Act",
    primarySourceUrl:
      "https://www.deadiversion.usdoj.gov/oa_accounts/diverting-professionals.html",
    primarySourceOrg: "DEA",
  },
  {
    id: "radiation-exposure",
    category: "chemical-exposure",
    title: {
      en: "Radiation Exposure (Dental X-ray & Radiology)",
      es: "Exposición a Radiación (Rayos X Dentales y Radiología)",
    },
    description: {
      en: "Chronic low-level ionizing radiation exposure from dental X-rays, radiology equipment, and nuclear medicine procedures. Cumulative exposure over career can increase cancer risk and thyroid dysfunction.",
      es: "Exposición crónica a radiación ionizante de baja intensidad de rayos X dentales, equipos radiológicos y procedimientos de medicina nuclear.",
    },
    affectedRoles: ["Dental Hygienist", "Radiology Tech", "Dentist", "Radiology Aide"],
    caIncidenceRate: 1.5,
    averageCostPerClaim: 3800,
    lostWorkdays: 3,
    preventionStrategies: [
      {
        en: "Use lead aprons, thyroid shields, and distance/shielding per 8 CCR §5100",
        es: "Usar delantales de plomo, protectores de tiroides y distancia/blindaje",
      },
      {
        en: "Maintain calibrated, modern equipment and use digital over film when possible",
        es: "Mantener equipos calibrados y modernos, usar digital en lugar de película cuando sea posible",
      },
      {
        en: "Provide dosimetry badges and track cumulative exposure",
        es: "Proporcionar insignias de dosimetría y rastrear la exposición acumulativa",
      },
      {
        en: "Limit pregnant staff exposure and establish monitoring protocols",
        es: "Limitar exposición de personal embarazado y establecer protocolos de monitoreo",
      },
    ],
    calOshaCitation: "8 CCR §5100",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "electrical-hazards",
    category: "slips-trips-falls",
    title: {
      en: "Electrical Hazards from Medical Equipment",
      es: "Peligros Eléctricos de Equipos Médicos",
    },
    description: {
      en: "Electrical shock or injury from faulty medical equipment, wet environments, or improper equipment maintenance. Biomedical staff and facility maintenance at highest risk.",
      es: "Choque eléctrico o lesión de equipos médicos defectuosos, ambientes mojados o mantenimiento inadecuado de equipos.",
    },
    affectedRoles: ["Biomedical Technician", "Facilities Manager", "Equipment Maintenance", "Clinical Staff"],
    caIncidenceRate: 1.0,
    averageCostPerClaim: 7500,
    lostWorkdays: 9,
    preventionStrategies: [
      {
        en: "Implement preventive maintenance program with documented equipment testing",
        es: "Implementar programa de mantenimiento preventivo con pruebas documentadas de equipos",
      },
      {
        en: "Use ground fault circuit interrupters (GFCI) in wet environments",
        es: "Usar interruptores de circuito de falla a tierra en ambientes mojados",
      },
      {
        en: "Provide electrical safety training and proper lockout/tagout (LOTO) procedures",
        es: "Proporcionar capacitación de seguridad eléctrica y procedimientos adecuados de bloqueo/etiquetado",
      },
      {
        en: "Keep emergency equipment (AED) accessible and train staff on proper use",
        es: "Mantener equipos de emergencia (AED) accesibles y capacitar al personal en el uso adecuado",
      },
    ],
    calOshaCitation: "8 CCR §2700",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
];

export const COST_REDUCTION_STRATEGIES: CostReductionStrategy[] = [
  {
    id: "safe-patient-handling",
    title: {
      en: "Safe Patient Handling Program",
      es: "Programa de Manejo Seguro de Pacientes",
    },
    description: {
      en: "Comprehensive program including mechanical lift equipment (ceiling lifts, floor lifts, transfer aids), staff training, and no-manual-lift policies. Prevents 68% of back injuries in studied FQHCs.",
      es: "Programa integral incluyendo equipos de levantamiento mecánico, capacitación de personal y políticas de sin levantamiento manual.",
    },
    implementationCost: { min: 15000, max: 40000 },
    annualSavings: { min: 45000, max: 120000 },
    timelineMonths: 4,
    difficulty: "moderate",
    targetHazards: ["musculoskeletal"],
    steps: [
      {
        en: "Conduct facility audit and identify high-risk patient handling areas",
        es: "Realizar auditoría de instalaciones e identificar áreas de alto riesgo",
      },
      {
        en: "Select and install mechanical lift equipment (budget $8K-25K for multi-patient clinic)",
        es: "Seleccionar e instalar equipos de levantamiento mecánico",
      },
      {
        en: "Train 100% of nursing/MA staff on equipment use and safe handling techniques (6 hours/employee)",
        es: "Capacitar al 100% del personal de enfermería/MA en uso de equipos",
      },
      {
        en: "Establish no-manual-lift policy and monitor compliance monthly",
        es: "Establecer política de sin levantamiento manual y monitorear cumplimiento",
      },
      {
        en: "Track injury metrics and adjust protocols annually",
        es: "Rastrear métricas de lesiones y ajustar protocolos anualmente",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "needleless-systems",
    title: {
      en: "Needleless IV & Injection Systems",
      es: "Sistemas Intravenosos e de Inyección sin Aguja",
    },
    description: {
      en: "Replace traditional needles with needle-free systems (Viajet, SmartDose, etc.) for IV access and medication administration. Reduces sharps injuries by 82% and associated costs.",
      es: "Reemplazar agujas tradicionales con sistemas sin aguja para acceso IV y administración de medicamentos.",
    },
    implementationCost: { min: 5000, max: 15000 },
    annualSavings: { min: 20000, max: 60000 },
    timelineMonths: 3,
    difficulty: "easy",
    targetHazards: ["needlestick-sharps"],
    steps: [
      {
        en: "Research and select needle-free system compatible with clinic infrastructure",
        es: "Investigar y seleccionar sistema compatible con infraestructura clínica",
      },
      {
        en: "Purchase initial inventory and adapters (budget $3-8K)",
        es: "Comprar inventario inicial y adaptadores",
      },
      {
        en: "Train RN, MA, and phlebotomy staff on new systems (2 hours each)",
        es: "Capacitar personal en nuevos sistemas",
      },
      {
        en: "Phase out traditional needles gradually (3-month transition)",
        es: "Eliminar gradualmente agujas tradicionales",
      },
      {
        en: "Track sharps injury rates and document ROI monthly",
        es: "Rastrear tasas de lesiones por objetos punzantes",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/bloodbornefaq.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "workplace-violence-prevention",
    title: {
      en: "Workplace Violence Prevention Program (SB 553)",
      es: "Programa de Prevención de Violencia Laboral (SB 553)",
    },
    description: {
      en: "Mandatory California program required by SB 553. Includes written plan, threat assessment, de-escalation training, incident reporting, and environmental design. Reduces incidents by 45% in studied clinics.",
      es: "Programa obligatorio de California requerido por SB 553. Incluye plan escrito, evaluación de amenazas, capacitación en desescalada.",
    },
    implementationCost: { min: 8000, max: 25000 },
    annualSavings: { min: 30000, max: 80000 },
    timelineMonths: 6,
    difficulty: "complex",
    targetHazards: ["workplace-violence"],
    steps: [
      {
        en: "Establish workplace violence prevention committee (manager, staff, security rep)",
        es: "Establecer comité de prevención de violencia laboral",
      },
      {
        en: "Develop written prevention plan addressing SB 553 requirements",
        es: "Desarrollar plan escrito de prevención direccionando requisitos de SB 553",
      },
      {
        en: "Train all staff in de-escalation, threat assessment, and trauma-informed care (4 hours minimum)",
        es: "Capacitar a todo el personal en desescalada, evaluación de amenazas y atención informada sobre traumas",
      },
      {
        en: "Install security infrastructure (panic buttons, cameras, clear exit routes, safe spaces)",
        es: "Instalar infraestructura de seguridad (botones de pánico, cámaras, rutas de salida claras)",
      },
      {
        en: "Establish clear incident reporting and response protocols with 24-hour investigation requirement",
        es: "Establecer protocolos claros de reporte e respuesta con requisito de investigación de 24 horas",
      },
      {
        en: "Review and update plan annually, track all incidents in exposure control log",
        es: "Revisar y actualizar plan anualmente, rastrear todos los incidentes",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/workplace-violence.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "ergonomic-assessment",
    title: {
      en: "Ergonomic Workstation Assessment & Redesign",
      es: "Evaluación Ergonómica de Estación de Trabajo y Rediseño",
    },
    description: {
      en: "Professional ergonomic assessment of high-risk workstations (dental operatory, billing, registration). Provides customized equipment and furniture recommendations. ROI typically 18-24 months.",
      es: "Evaluación ergonómica profesional de estaciones de trabajo de alto riesgo. Proporciona recomendaciones de equipos y muebles personalizados.",
    },
    implementationCost: { min: 3000, max: 10000 },
    annualSavings: { min: 15000, max: 40000 },
    timelineMonths: 2,
    difficulty: "easy",
    targetHazards: ["repetitive-strain", "musculoskeletal"],
    steps: [
      {
        en: "Hire certified ergonomic consultant for 2-3 day on-site assessment ($1.5-3K)",
        es: "Contratar consultor ergonómico certificado para evaluación in situ",
      },
      {
        en: "Document current workstations with photos and staff interviews",
        es: "Documentar estaciones de trabajo actuales con fotos y entrevistas de personal",
      },
      {
        en: "Receive customized recommendations (monitor stands, keyboards, chairs, standing desks)",
        es: "Recibir recomendaciones personalizadas",
      },
      {
        en: "Procure recommended equipment (budget $1.5-7K for multi-station clinic)",
        es: "Obtener equipo recomendado",
      },
      {
        en: "Train staff on proper workstation setup and microbreak techniques",
        es: "Capacitar personal en configuración apropiada de estación de trabajo",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "injury-illness-prevention",
    title: {
      en: "Injury & Illness Prevention Program (IIPP)",
      es: "Programa de Prevención de Lesiones y Enfermedades (IIPP)",
    },
    description: {
      en: "Mandatory California program (8 CCR §3203) that establishes systematic approach to identifying and controlling workplace hazards. Core requirement for all healthcare employers. Saves average $25K-75K annually through prevention.",
      es: "Programa obligatorio de California que establece enfoque sistemático para identificar y controlar peligros laborales.",
    },
    implementationCost: { min: 5000, max: 12000 },
    annualSavings: { min: 25000, max: 75000 },
    timelineMonths: 3,
    difficulty: "moderate",
    targetHazards: [
      "needlestick-sharps",
      "musculoskeletal",
      "workplace-violence",
      "respiratory-infectious",
    ],
    steps: [
      {
        en: "Develop written IIPP document addressing all Cal-OSHA requirements (8 CCR §3203)",
        es: "Desarrollar documento IIPP escrito direccionando todos los requisitos de Cal-OSHA",
      },
      {
        en: "Identify hazards through walk-throughs, injury data analysis, and staff input",
        es: "Identificar peligros a través de inspecciones, análisis de datos de lesiones e input de personal",
      },
      {
        en: "Establish safety committee with regular meeting schedule (minimum monthly)",
        es: "Establecer comité de seguridad con reuniones regulares",
      },
      {
        en: "Create incident reporting system with investigation and corrective action procedures",
        es: "Crear sistema de reporte de incidentes con procedimientos de investigación",
      },
      {
        en: "Provide required safety training (bloodborne pathogens, hazard communication, etc.)",
        es: "Proporcionar capacitación de seguridad requerida",
      },
      {
        en: "Review and update IIPP annually, keep records of all hazard assessments and corrective actions",
        es: "Revisar y actualizar IIPP anualmente, mantener registros",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/dosh_publications/IIPP-Model-nonhigh-hazard.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "return-to-work",
    title: {
      en: "Return-to-Work Program",
      es: "Programa de Regreso al Trabajo",
    },
    description: {
      en: "Structured program that brings injured workers back to productive duty while recovering. Uses light-duty assignments, graduated work schedules, and ongoing medical monitoring. Reduces permanent disability claims by 40-50%.",
      es: "Programa estructurado que reintegra a trabajadores lesionados al deber productivo mientras se recuperan.",
    },
    implementationCost: { min: 2000, max: 8000 },
    annualSavings: { min: 35000, max: 90000 },
    timelineMonths: 2,
    difficulty: "moderate",
    targetHazards: ["musculoskeletal", "repetitive-strain"],
    steps: [
      {
        en: "Develop written RTW policy defining light-duty assignments and wage replacement",
        es: "Desarrollar política escrita de RTW definiendo asignaciones de deber ligero",
      },
      {
        en: "Coordinate with workers' compensation carrier and treating physician",
        es: "Coordinar con aseguradora y médico tratante",
      },
      {
        en: "Identify available light-duty positions and create assignment menu",
        es: "Identificar posiciones disponibles de deber ligero y crear menú de asignación",
      },
      {
        en: "Establish case management process with monthly check-ins and progression tracking",
        es: "Establecer proceso de gestión de casos con verificaciones mensuales",
      },
      {
        en: "Monitor return-to-full-duty milestones and document all accommodations",
        es: "Monitorear hitos de regreso a deber completo y documentar todas las acomodaciones",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dwc/return-to-work-programs.html",
    primarySourceOrg: "California Division of Workers' Compensation",
  },
  {
    id: "safety-committee",
    title: {
      en: "Safety Committee (Required for 20+ Employees)",
      es: "Comité de Seguridad (Requerido para 20+ Empleados)",
    },
    description: {
      en: "Mandatory committee (8 CCR §3203) for healthcare employers with 20+ employees. Meets monthly, identifies hazards, recommends controls. Creates culture of shared responsibility and drives continuous improvement.",
      es: "Comité obligatorio para empleadores con 20+ empleados. Se reúne mensualmente, identifica peligros, recomienda controles.",
    },
    implementationCost: { min: 1000, max: 3000 },
    annualSavings: { min: 10000, max: 30000 },
    timelineMonths: 1,
    difficulty: "easy",
    targetHazards: [
      "needlestick-sharps",
      "musculoskeletal",
      "workplace-violence",
      "respiratory-infectious",
    ],
    steps: [
      {
        en: "Establish committee with manager, frontline staff, and safety representative (minimum 5 members)",
        es: "Establecer comité con gerente, personal de primera línea y representante de seguridad",
      },
      {
        en: "Schedule monthly meetings (compliance requirement) and create meeting agenda template",
        es: "Programar reuniones mensuales y crear plantilla de agenda de reunión",
      },
      {
        en: "Review injury data, near-misses, and OSHA violations monthly",
        es: "Revisar datos de lesiones, casi-accidentes y violaciones de OSHA mensualmente",
      },
      {
        en: "Document recommendations and track management response to safety concerns",
        es: "Documentar recomendaciones y rastrear respuesta de gestión",
      },
      {
        en: "Maintain meeting minutes and hazard assessment records for audit compliance",
        es: "Mantener actas de reuniones y registros de evaluación de peligros",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/dosh_publications/IIPP-Model-nonhigh-hazard.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "respiratory-protection",
    title: {
      en: "Respiratory Protection Program",
      es: "Programa de Protección Respiratoria",
    },
    description: {
      en: "Comprehensive program including respirator selection, fit-testing, training, and maintenance per 8 CCR §5199. Essential for COVID-19, TB, and other respiratory pathogen exposure. Reduces respiratory claims by 50%+.",
      es: "Programa integral incluyendo selección de respiradores, prueba de ajuste, capacitación y mantenimiento.",
    },
    implementationCost: { min: 10000, max: 30000 },
    annualSavings: { min: 20000, max: 50000 },
    timelineMonths: 4,
    difficulty: "complex",
    targetHazards: ["respiratory-infectious"],
    steps: [
      {
        en: "Develop written respiratory protection program and hazard assessment",
        es: "Desarrollar programa escrito de protección respiratoria y evaluación de peligros",
      },
      {
        en: "Select appropriate respirators (N95, KN95, etc.) based on exposure assessment",
        es: "Seleccionar respiradores apropiados basados en evaluación de exposición",
      },
      {
        en: "Conduct fit-testing for all employees required to wear respirators (annual minimum)",
        es: "Realizar pruebas de ajuste para todos los empleados que deben usar respiradores",
      },
      {
        en: "Provide annual respiratory protection training (covers proper use, limitations, care)",
        es: "Proporcionar capacitación anual de protección respiratoria",
      },
      {
        en: "Establish medical clearance process and record all fit-test results",
        es: "Establecer proceso de autorización médica y registrar todos los resultados de prueba de ajuste",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/dosh_publications/respiratory-protection-fs.pdf",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "post-exposure-prophylaxis",
    title: {
      en: "Post-Exposure Prophylaxis (PEP) Protocol",
      es: "Protocolo de Profilaxis Post-Exposición (PEP)",
    },
    description: {
      en: "Immediate medical response system for bloodborne pathogen, HIV, and hepatitis exposures. Includes on-call provider availability, baseline/follow-up testing, and psychological support. Critical for retaining staff confidence.",
      es: "Sistema de respuesta médica inmediata para exposiciones de patógenos transmitidos por sangre, VIH y hepatitis.",
    },
    implementationCost: { min: 3000, max: 8000 },
    annualSavings: { min: 15000, max: 45000 },
    timelineMonths: 2,
    difficulty: "moderate",
    targetHazards: ["needlestick-sharps", "bloodborne-pathogen"],
    steps: [
      {
        en: "Establish protocol defining PEP availability 24/7/365 with designated on-call provider",
        es: "Establecer protocolo definiendo disponibilidad de PEP 24/7/365",
      },
      {
        en: "Stock PEP medications (antiretroviral regimens) and establish emergency access procedures",
        es: "Stockear medicamentos PEP y establecer procedimientos de acceso de emergencia",
      },
      {
        en: "Create exposure response checklist and reporting form for all staff",
        es: "Crear lista de verificación de respuesta de exposición y formulario de reporte",
      },
      {
        en: "Establish baseline and follow-up testing schedule (baseline, 6 weeks, 3 months)",
        es: "Establecer cronograma de pruebas de línea base y seguimiento",
      },
      {
        en: "Provide psychological support and ensure confidentiality throughout process",
        es: "Proporcionar apoyo psicológico y asegurar confidencialidad",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/bloodbornefaq.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "mental-health-eap",
    title: {
      en: "Mental Health & Employee Assistance Program (EAP)",
      es: "Programa de Salud Mental y Asistencia a Empleados (EAP)",
    },
    description: {
      en: "Comprehensive EAP offering confidential counseling, stress management, and mental health referrals. Addresses burnout, PTSD, and work-related psychological injury. Strong ROI through reduced turnover and disability claims.",
      es: "EAP integral ofreciendo asesoramiento confidencial, gestión del estrés y referencias de salud mental.",
    },
    implementationCost: { min: 5000, max: 20000 },
    annualSavings: { min: 25000, max: 60000 },
    timelineMonths: 2,
    difficulty: "easy",
    targetHazards: ["stress-burnout", "workplace-violence"],
    steps: [
      {
        en: "Research and contract with EAP provider (typical cost $10-15/employee/year)",
        es: "Investigar y contratar con proveedor de EAP",
      },
      {
        en: "Launch marketing campaign and train managers on EAP referral process",
        es: "Lanzar campaña de marketing y capacitar gerentes en proceso de derivación de EAP",
      },
      {
        en: "Establish peer support groups and mental health first aid training for managers",
        es: "Establecer grupos de apoyo entre pares y capacitación de primeros auxilios de salud mental",
      },
      {
        en: "Create post-incident debriefing process for traumatic events (workplace violence, code death, etc.)",
        es: "Crear proceso de debriefing post-incidente para eventos traumáticos",
      },
      {
        en: "Track utilization rates and conduct quarterly check-ins with EAP partner",
        es: "Rastrear tasas de utilización y realizar verificaciones trimestrales",
      },
    ],
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "fleet-safety",
    title: {
      en: "Fleet Safety Program (Mobile Health)",
      es: "Programa de Seguridad de Flota (Salud Móvil)",
    },
    description: {
      en: "Comprehensive vehicle safety program for organizations operating fleet (mobile clinics, home health, CHW transportation). Includes vehicle maintenance, driver training, telematics, and distraction prevention.",
      es: "Programa integral de seguridad de vehículos para organizaciones con flota operada.",
    },
    implementationCost: { min: 3000, max: 10000 },
    annualSavings: { min: 15000, max: 40000 },
    timelineMonths: 3,
    difficulty: "moderate",
    targetHazards: ["vehicle-accidents"],
    steps: [
      {
        en: "Conduct baseline vehicle safety audit and driver assessment",
        es: "Realizar auditoría de seguridad vehicular y evaluación de conductores",
      },
      {
        en: "Establish preventive maintenance schedule and track all vehicle repairs",
        es: "Establecer cronograma de mantenimiento preventivo y rastrear todas las reparaciones",
      },
      {
        en: "Require defensive driving training for all staff who drive (4-8 hours)",
        es: "Requerir capacitación de conducción defensiva para todo el personal que conduce",
      },
      {
        en: "Install telematics/dashcam system ($30-100/vehicle) for monitoring and coaching",
        es: "Instalar sistema de telemática/dashcam para monitoreo y capacitación",
      },
      {
        en: "Establish distraction prevention policies (cell phone, eating, radio limits) and monitor compliance",
        es: "Establecer políticas de prevención de distracciones y monitorear cumplimiento",
      },
    ],
    primarySourceUrl:
      "https://www.osha.gov/dsg/naics/naics4_623.html",
    primarySourceOrg: "OSHA",
  },
  {
    id: "experience-modification",
    title: {
      en: "Experience Modification Rate (EMR) Management",
      es: "Gestión de Tasa de Modificación de Experiencia (EMR)",
    },
    description: {
      en: "Strategic approach to lowering workers' compensation insurance premium through injury reduction and proper claim management. EMR <0.90 can save $20K-100K+ annually depending on payroll. Requires sustained safety culture.",
      es: "Enfoque estratégico para reducir la prima de seguro de compensación de trabajadores a través de reducción de lesiones.",
    },
    implementationCost: { min: 2000, max: 5000 },
    annualSavings: { min: 20000, max: 100000 },
    timelineMonths: 24,
    difficulty: "complex",
    targetHazards: [
      "needlestick-sharps",
      "musculoskeletal",
      "workplace-violence",
      "respiratory-infectious",
    ],
    steps: [
      {
        en: "Obtain current EMR from workers' compensation carrier and understand calculation",
        es: "Obtener EMR actual de aseguradora y entender cálculo",
      },
      {
        en: "Implement all other safety strategies above to reduce injury frequency and severity",
        es: "Implementar todas las otras estrategias de seguridad para reducir frecuencia y severidad de lesiones",
      },
      {
        en: "Manage claims aggressively through return-to-work and early intervention",
        es: "Gestionar reclamos agresivamente a través de retorno al trabajo",
      },
      {
        en: "Work with claims adjuster to ensure accurate experience rating and dispute overcharges",
        es: "Trabajar con ajustador de reclamos para asegurar calificación precisa de experiencia",
      },
      {
        en: "Achieve EMR <0.95 within 24 months (ambitious: <0.90) and secure premium reduction",
        es: "Lograr EMR <0.95 dentro de 24 meses y asegurar reducción de prima",
      },
    ],
    primarySourceUrl:
      "https://www.scpie.org/resource-center/emr-rating-information",
    primarySourceOrg: "California Self-Insurer's Association",
  },
];

export const CASE_STUDIES: WorkersCompCaseStudy[] = [
  {
    id: "la-fqhc-safe-patient-handling",
    title: {
      en: "Mid-Size LA FQHC: Safe Patient Handling Revolution",
      es: "FQHC de Tamaño Medio LA: Revolución de Manejo Seguro de Pacientes",
    },
    orgType: "FQHC (250 staff, 6 sites)",
    location: "Los Angeles County",
    challenge: {
      en: "Back injuries were top workers' comp claim driver: 18 claims/year (7.2% of staff), averaging $11,200 cost each = $201K annual spend. RNs and MAs experienced chronic pain and permanent transfers out of clinical roles.",
      es: "Las lesiones de espalda eran la principal causa de reclamos de compensación: 18 reclamos/año, promediando $11,200 cada uno = $201K gasto anual.",
    },
    intervention: {
      en: "2024 investment in safe patient handling: purchased 8 ceiling lifts ($24K), 6 floor lifts ($18K), trained 180 clinical staff (12 hours/person = $16K trainer cost), established no-manual-lift policy with enforcement. Total investment: $58K.",
      es: "Inversión 2024 en manejo seguro de pacientes: comprar 8 levantadores de techo, 6 levantadores de piso, capacitar 180 personal clínico.",
    },
    outcome: {
      en: "2025 results: only 6 back injury claims (68% reduction), average cost down to $8,900 (cost per claim improved 20%), annual workers' comp spend dropped to $53K (74% reduction). Two RNs returned to full clinical duty from light-duty assignments. Staff morale improved significantly.",
      es: "Resultados 2025: solo 6 reclamos de lesión de espalda (68% de reducción), gasto anual de compensación bajó a $53K (74% de reducción).",
    },
    costSavings: "$148K reduction in year 1 (compared to previous year costs)",
    timeframe: "12 months from implementation to full realization",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "bay-area-sb553-violence-prevention",
    title: {
      en: "Bay Area Multi-Site Clinic: SB 553 Workplace Violence Prevention",
      es: "Clínica Multi-Sitio del Área de la Bahía: Prevención de Violencia Laboral SB 553",
    },
    orgType: "FQHC Network (380 staff, 9 sites)",
    location: "San Francisco Bay Area",
    challenge: {
      en: "Workplace violence incidents escalating: 14 incidents/year (assault, verbal abuse, threats), many unreported due to stigma. Staff feeling unsafe, turnover increasing. 2024 had 2 serious physical assaults requiring ER treatment and temporary leave.",
      es: "Incidentes de violencia laboral escalando: 14 incidentes/año, muchos no reportados. Personal sintiéndose inseguro, rotación aumentando.",
    },
    intervention: {
      en: "2024-2025: comprehensive SB 553 implementation including written prevention plan, mandatory 8-hour de-escalation training for all staff (380 hours training), installed panic buttons and security cameras at all 9 sites, established threat assessment protocol with daily team huddles, created confidential incident reporting system with 24-hour investigation requirement.",
      es: "Implementación integral de SB 553 incluyendo plan escrito de prevención, capacitación obligatoria de 8 horas en desescalada.",
    },
    outcome: {
      en: "2025 results: only 8 incidents (45% reduction), zero physical assaults, reporting increased to 100% (improved psychological safety), zero employees on stress-related leave due to violence, staff safety survey scores improved 64%. Treated violence prevention as non-negotiable cultural norm.",
      es: "Resultados 2025: solo 8 incidentes (45% de reducción), cero asaltos físicos, calificaciones de seguridad del personal mejoraron 64%.",
    },
    costSavings: "$89K reduction (fewer claims + reduced turnover + avoided litigation)",
    timeframe: "18 months from planning to cultural embedding",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/workplace-violence.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "central-valley-needleless-systems",
    title: {
      en: "Central Valley FQHC: Needleless System Rollout",
      es: "FQHC del Valle Central: Implementación de Sistemas sin Aguja",
    },
    orgType: "FQHC (180 staff, 4 sites, high phlebotomy volume)",
    location: "San Joaquin Valley",
    challenge: {
      en: "Sharps injuries were chronic problem: 12 needle/lancet injuries per year (6.7% injury rate, highest in county), averaging $3,100 cost each. 2024: one serious bloodborne pathogen exposure requiring 6-month post-exposure monitoring. Phlebotomists expressing fear and burnout.",
      es: "Las lesiones por objetos punzantes eran problema crónico: 12 lesiones por aguja/lanceta por año, promediando $3,100 cada una.",
    },
    intervention: {
      en: "Mid-2024: investment in needleless systems ($8,500: needle-free IV adapters, safety lancets, retractable devices), trained 45 RNs/MAs/phlebotomists on new systems (2 hours each), phased out traditional needles over 3-month period, established incident review process for any remaining sharps injuries.",
      es: "Inversión en sistemas sin aguja ($8,500: adaptadores IV sin aguja, lancetas de seguridad, dispositivos retráctiles).",
    },
    outcome: {
      en: "2025 results: only 2 sharps injuries (82% reduction), both minor (lancet pricks with no exposure risk), average cost dropped to $1,200, zero bloodborne pathogen exposures. Phlebotomists reported significantly reduced anxiety. No additional needle purchases necessary — break-even achieved by month 8.",
      es: "Resultados 2025: solo 2 lesiones por objeto punzante (82% de reducción), ambas menores, costo promedio bajó a $1,200.",
    },
    costSavings: "$29K reduction in year 1 (compared to previous injury costs + device elimination savings)",
    timeframe: "9 months from procurement to payoff",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/bloodbornefaq.html",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "sd-dental-ergonomic-intervention",
    title: {
      en: "San Diego Dental Clinic: Ergonomic Intervention Success",
      es: "Clínica Dental de San Diego: Éxito de Intervención Ergonómica",
    },
    orgType: "FQHC Dental Department (35 staff, 8 operatories)",
    location: "San Diego County",
    challenge: {
      en: "Dental hygienists experiencing epidemic of musculoskeletal injury: 7 claims/year (20% of hygienist staff), averaging $6,800/claim = $47,600 annual cost. Three hygienists on permanent light duty or leave. High turnover in dental department affecting patient care continuity.",
      es: "Higienistas dentales experimentando epidemia de lesión musculoesquelética: 7 reclamos/año, promediando $6,800/reclamo.",
    },
    intervention: {
      en: "2024: hired certified ergonomic consultant for $2,800 assessment, implemented recommendations including new ergonomic dental chairs (investment $16K), monitor arms, improved stools, mirror positioning, provided stretching program and microbreak policy. Retrained all 8 hygienists on proper positioning (6 hours each).",
      es: "2024: contratar consultor ergonómico certificado, implementar recomendaciones incluyendo sillas dentales ergonómicas nuevas.",
    },
    outcome: {
      en: "2025 results: only 3 MSK claims (57% reduction), average claim cost $5,200 (24% reduction). All three previously light-duty hygienists returned to full clinical production. Staff satisfaction scores in dental department improved 71%. Waiting list for hygienist services dropped from 3 weeks to 1 week (increased capacity).",
      es: "Resultados 2025: solo 3 reclamos de MSK (57% de reducción), todos los higienistas anteriormente en deber ligero regresaron a producción clínica completa.",
    },
    costSavings: "$26K reduction + estimated $35K in increased clinical capacity and productivity",
    timeframe: "8 months from assessment to full implementation",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "rural-norcar-fleet-safety",
    title: {
      en: "Rural Northern California FQHC: Fleet Safety Transformation",
      es: "FQHC del Norte Rural de California: Transformación de Seguridad de Flota",
    },
    orgType: "Rural FQHC (120 staff, 25 vehicles, 60-mile service area)",
    location: "Redwood Region (Humboldt County)",
    challenge: {
      en: "Vehicle accidents were top workers' comp driver: 6 vehicle incidents/year (4 collisions, 2 near-misses), averaging $18K/claim. One 2023 incident: home health RN rear-ended at red light, minor injuries but triggered PTSD. Staff afraid of mobile assignments, turnover 34% in mobile health roles.",
      es: "Los accidentes vehiculares eran la principal causa de reclamos: 6 incidentes/año, promediando $18K/reclamo.",
    },
    intervention: {
      en: "2024: comprehensive fleet safety program ($8,500 total investment) including defensive driving training for all 25 drivers (8 hours each, $3K), installed telematics + dashcam on all vehicles ($125/vehicle × 25 = $3,125), established preventive maintenance schedule, implemented cell-phone distraction policy with smartphone locks, created incident reporting and post-incident support system.",
      es: "2024: programa integral de seguridad de flota ($8,500) incluyendo capacitación de conducción defensiva para los 25 conductores.",
    },
    outcome: {
      en: "2025 results: zero vehicle accidents (100% reduction), zero incidents for 12+ months (first time in organization history), staff safety perception improved dramatically (satisfaction survey +58%), mobile health staff turnover dropped to 8%, preventive maintenance identified 3 serious mechanical failures before they could cause accidents. Telematics data showed dramatic improvement in safe driving metrics (speed, hard braking).",
      es: "Resultados 2025: cero accidentes vehiculares (100% de reducción), cero incidentes por 12+ meses.",
    },
    costSavings: "$108K reduction (6 claims × $18K avoided) + $34K from reduced turnover in mobile roles",
    timeframe: "12 months to incident-free status",
    primarySourceUrl:
      "https://www.osha.gov/dsg/naics/naics4_623.html",
    primarySourceOrg: "OSHA",
  },
  {
    id: "sacramento-return-to-work",
    title: {
      en: "Sacramento FQHC: Strategic Return-to-Work Program",
      es: "FQHC de Sacramento: Programa Estratégico de Regreso al Trabajo",
    },
    orgType: "FQHC (310 staff, 5 sites)",
    location: "Sacramento County",
    challenge: {
      en: "High-cost disability claims driving workers' comp costs: 8 injured workers on temporary disability averaging 120+ days per person, 3 permanent partial disabilities awarded. Claims costs averaging $22K per claim. Organizational morale suffering from long absences of injured colleagues.",
      es: "Reclamos de discapacidad de alto costo impulsando costos de compensación de trabajadores: 8 trabajadores lesionados en discapacidad temporal.",
    },
    intervention: {
      en: "2024: established formal return-to-work program ($4K cost) including light-duty position menu, graduated work schedule process, weekly case management check-ins, coordinator training, medical provider alignment, psychological support (EAP partnership), incentive program for successful RTW milestones.",
      es: "2024: establecer programa formal de regreso al trabajo ($4K costo) incluyendo menú de posición de deber ligero.",
    },
    outcome: {
      en: "2025 results: average disability duration reduced to 64 days (47% improvement), 6 of 8 workers returned to full duty within 6 months, only 1 permanent partial disability awarded (vs. typical 3). Average claim cost reduced to $13,400 (39% reduction). Three workers reported feeling valued by organization's commitment to their recovery. No litigation or retaliation complaints.",
      es: "Resultados 2025: duración promedio de discapacidad reducida a 64 días (47% de mejora), 6 de 8 trabajadores regresaron a deber completo.",
    },
    costSavings: "$68K reduction in year 1 (fewer claims + reduced duration + avoided disputes) + $180K estimated cumulative 3-year savings",
    timeframe: "6-12 months per case; 12 months organizational impact",
    primarySourceUrl:
      "https://www.dir.ca.gov/dwc/return-to-work-programs.html",
    primarySourceOrg: "California Division of Workers' Compensation",
  },
  {
    id: "inland-empire-mental-health",
    title: {
      en: "Inland Empire FQHC: Mental Health Initiative Reduces Stress Claims",
      es: "FQHC del Imperio Inland: Iniciativa de Salud Mental Reduce Reclamos de Estrés",
    },
    orgType: "FQHC (220 staff, 3 sites)",
    location: "Riverside/San Bernardino Counties",
    challenge: {
      en: "Stress-related workers' comp claims surging (2024: 6 claims averaging $11,200 each = $67K spend), psychiatric injury becoming recognized problem. Staffing crisis from SB 525 wage mandates and H.R. 1 cuts driving burnout epidemic. Two managers reported peer-support crisis helpline during budget cuts announcement.",
      es: "Reclamos relacionados con estrés aumentando (2024: 6 reclamos promediando $11,200 cada uno), lesión psiquiátrica convirtiéndose en problema reconocido.",
    },
    intervention: {
      en: "2024: implemented comprehensive mental health support ($18K investment) including EAP contract (ASG with counseling access), peer support group training for 12 staff, monthly all-staff mental health check-ins led by HR, manager training on recognizing burnout/PTSD, post-incident debriefing protocol for traumatic events (patient deaths, violence), mindfulness room with guided audio resources.",
      es: "2024: implementar apoyo integral de salud mental ($18K inversión) incluyendo contrato de EAP.",
    },
    outcome: {
      en: "2025 results: stress/psychiatric injury claims reduced to 4 (33% reduction), average claim cost $8,900 (21% reduction). EAP utilization 34% (above national average of 4-8%), indicating early intervention. Zero psychiatric injury litigations. Staff burnout survey scores improved 49%. Peer support group had 78 members attending monthly (36% of staff). Voluntary turnover dropped 8 percentage points to 18% (industry average 24%).",
      es: "Resultados 2025: reclamos de estrés/lesión psiquiátrica reducidos a 4 (33% de reducción), utilización de EAP 34%.",
    },
    costSavings: "$45K reduction in claim costs + $156K from reduced turnover (estimated 11 FTE retained) + improved operational continuity",
    timeframe: "6-12 months to culture shift; 12+ months for sustained impact",
    primarySourceUrl:
      "https://www.dir.ca.gov/dosh/puborder.asp",
    primarySourceOrg: "Cal/OSHA",
  },
  {
    id: "multi-site-emr-management",
    title: {
      en: "Large Multi-Site Network: EMR Management & Premium Reduction",
      es: "Red Multi-Sitio Grande: Gestión de EMR y Reducción de Prima",
    },
    orgType: "FQHC Network (550+ staff, 12 sites)",
    location: "Statewide (multiple regions)",
    challenge: {
      en: "Experience Modification Rate (EMR) of 1.18 (18% premium surcharge) costing extra $95K/year in workers' comp insurance. Historical injury frequency and severity driving high rating. Previous 'safety initiatives' were piecemeal and ineffective. New leadership committed to systematic safety culture transformation.",
      es: "Tasa de Modificación de Experiencia (EMR) de 1.18 (sobrecargo de prima de 18%) costando extra $95K/año.",
    },
    intervention: {
      en: "2023-2025: comprehensive 24-month EMR management strategy ($28K investment in safety infrastructure and training) combining ALL major strategies: IIPP (8 CCR §3203), Safety Committee with monthly meetings, Safe Patient Handling program (mechanical lifts at all sites), SB 553 violence prevention, respiratory protection program (8 CCR §5199), ergonomic assessments, return-to-work program, aggressive claims management with early intervention, EMR review quarterly with insurance carrier.",
      es: "2023-2025: estrategia integral de gestión de EMR de 24 meses combinando todas las estrategias principales.",
    },
    outcome: {
      en: "2025 results: EMR improved from 1.18 to 0.87 (26% reduction) = $95K annual premium reduction achieved. Injury frequency dropped 42%, severity metrics improved 34%. Insurance carrier recognized 'exemplary safety culture transformation.' Next audit likely to achieve 0.75 EMR (additional $140K+ savings). Most importantly: 600+ employees report feeling safer, proud to work there. Zero serious injury lawsuits. Recruitment mentions 'safety culture' as top reason candidates choose organization.",
      es: "Resultados 2025: EMR mejorado de 1.18 a 0.87 (26% de reducción) = $95K de reducción de prima anual lograda.",
    },
    costSavings: "$95K annual premium reduction + $156K from injury frequency/severity improvements + avoided litigation/regulatory fines",
    timeframe: "24 months to full transformation; ongoing sustainability",
    primarySourceUrl:
      "https://www.scpie.org/resource-center/emr-rating-information",
    primarySourceOrg: "California Self-Insurer's Association",
  },
];

export const WORKERS_COMP_STATS: WorkersCompStats = {
  totalAnnualCost: 2840000000,
  averagePremiumRate: 4.25,
  topThreeHazards: [
    "Back injuries from patient handling",
    "Needlestick/sharps injuries",
    "Workplace violence",
  ],
  calOshaInspections2024: 8342,
  year: 2024,
};

export function getHazardsByRole(role: string): WorkersCompHazard[] {
  const roleUpperCase = role.toUpperCase();
  return HAZARDS.filter((hazard) =>
    hazard.affectedRoles.map((r) => r.toUpperCase()).includes(roleUpperCase)
  );
}

export function getHazardsByCategory(
  category: HazardCategory
): WorkersCompHazard[] {
  return HAZARDS.filter((hazard) => hazard.category === category);
}

export function getCostStrategies(budget?: number): CostReductionStrategy[] {
  if (!budget) return COST_REDUCTION_STRATEGIES;
  return COST_REDUCTION_STRATEGIES.filter(
    (strategy) => strategy.implementationCost.max <= budget
  );
}

export function getWorkersCompStats(): WorkersCompStats {
  return WORKERS_COMP_STATS;
}

export function getCaseStudies(): WorkersCompCaseStudy[] {
  return CASE_STUDIES;
}

export function getStrategiesByDifficulty(
  difficulty: "easy" | "moderate" | "complex"
): CostReductionStrategy[] {
  return COST_REDUCTION_STRATEGIES.filter(
    (strategy) => strategy.difficulty === difficulty
  );
}

export function getStrategiesByROI(): CostReductionStrategy[] {
  return [...COST_REDUCTION_STRATEGIES].sort((a, b) => {
    const aROI = (a.annualSavings.min + a.annualSavings.max) / 2 / ((a.implementationCost.min + a.implementationCost.max) / 2);
    const bROI = (b.annualSavings.min + b.annualSavings.max) / 2 / ((b.implementationCost.min + b.implementationCost.max) / 2);
    return bROI - aROI;
  });
}

export function getTotalHazardCount(): number {
  return HAZARDS.length;
}

export function getTotalStrategies(): number {
  return COST_REDUCTION_STRATEGIES.length;
}

export function getTotalCaseStudies(): number {
  return CASE_STUDIES.length;
}
