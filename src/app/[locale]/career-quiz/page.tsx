"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Trophy,
  Briefcase,
  GraduationCap,
  DollarSign,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuizQuestion {
  id: string;
  question: { en: string; es: string };
  options: { value: string; label: { en: string; es: string } }[];
}

interface RoleMatch {
  roleId: string;
  label: { en: string; es: string };
  description: { en: string; es: string };
  matchPercent: number;
  salaryRange: { p25: number; p50: number; p75: number } | null;
  certifications: string[];
  department: string;
}

/* ------------------------------------------------------------------ */
/*  Quiz Questions                                                     */
/* ------------------------------------------------------------------ */

const QUESTIONS: QuizQuestion[] = [
  {
    id: "patient-care",
    question: {
      en: "Do you prefer direct patient care or behind-the-scenes work?",
      es: "Prefieres la atencion directa al paciente o el trabajo detras de escena?",
    },
    options: [
      { value: "direct", label: { en: "Direct patient care", es: "Atencion directa al paciente" } },
      { value: "behind", label: { en: "Behind-the-scenes work", es: "Trabajo detras de escena" } },
      { value: "both", label: { en: "A mix of both", es: "Una mezcla de ambos" } },
    ],
  },
  {
    id: "education",
    question: {
      en: "What is your highest education level?",
      es: "Cual es tu nivel educativo mas alto?",
    },
    options: [
      { value: "highschool", label: { en: "High school diploma / GED", es: "Diploma de preparatoria / GED" } },
      { value: "associates", label: { en: "Associate's degree", es: "Grado asociado" } },
      { value: "bachelors", label: { en: "Bachelor's degree", es: "Licenciatura" } },
      { value: "masters", label: { en: "Master's degree", es: "Maestria" } },
      { value: "doctorate", label: { en: "Doctorate (MD, DO, PhD, PsyD)", es: "Doctorado (MD, DO, PhD, PsyD)" } },
    ],
  },
  {
    id: "bilingual",
    question: {
      en: "Are you bilingual (English + another language)?",
      es: "Eres bilingue (ingles + otro idioma)?",
    },
    options: [
      { value: "yes", label: { en: "Yes", es: "Si" } },
      { value: "no", label: { en: "No", es: "No" } },
    ],
  },
  {
    id: "work-style",
    question: {
      en: "Do you prefer working independently or in teams?",
      es: "Prefieres trabajar de forma independiente o en equipo?",
    },
    options: [
      { value: "independent", label: { en: "Independently", es: "Independientemente" } },
      { value: "team", label: { en: "In teams", es: "En equipo" } },
      { value: "either", label: { en: "Either is fine", es: "Cualquiera esta bien" } },
    ],
  },
  {
    id: "motivation",
    question: {
      en: "What motivates you most at work?",
      es: "Que te motiva mas en el trabajo?",
    },
    options: [
      { value: "helping", label: { en: "Helping patients directly", es: "Ayudar a los pacientes directamente" } },
      { value: "solving", label: { en: "Solving complex problems", es: "Resolver problemas complejos" } },
      { value: "leading", label: { en: "Leading and mentoring teams", es: "Liderar y asesorar equipos" } },
      { value: "efficiency", label: { en: "Administrative efficiency & systems", es: "Eficiencia administrativa y sistemas" } },
    ],
  },
  {
    id: "clinical",
    question: {
      en: "Are you comfortable with clinical procedures (vital signs, blood draws, exams)?",
      es: "Te sientes comodo/a con procedimientos clinicos (signos vitales, extracciones de sangre, examenes)?",
    },
    options: [
      { value: "yes", label: { en: "Yes, very comfortable", es: "Si, muy comodo/a" } },
      { value: "somewhat", label: { en: "Somewhat — I can learn", es: "Algo — puedo aprender" } },
      { value: "no", label: { en: "No, I prefer non-clinical work", es: "No, prefiero trabajo no clinico" } },
    ],
  },
  {
    id: "stress",
    question: {
      en: "How do you handle high-stress situations?",
      es: "Como manejas las situaciones de alto estres?",
    },
    options: [
      { value: "thrive", label: { en: "I thrive under pressure", es: "Prospero bajo presion" } },
      { value: "manage", label: { en: "I manage well with support", es: "Lo manejo bien con apoyo" } },
      { value: "calm", label: { en: "I prefer calm, predictable environments", es: "Prefiero ambientes tranquilos y predecibles" } },
    ],
  },
  {
    id: "experience",
    question: {
      en: "How much healthcare experience do you have?",
      es: "Cuanta experiencia en salud tienes?",
    },
    options: [
      { value: "none", label: { en: "None — I'm new to healthcare", es: "Ninguna — soy nuevo/a en salud" } },
      { value: "1-3", label: { en: "1-3 years", es: "1-3 anos" } },
      { value: "3-5", label: { en: "3-5 years", es: "3-5 anos" } },
      { value: "5+", label: { en: "5+ years", es: "5+ anos" } },
    ],
  },
  {
    id: "environment",
    question: {
      en: "What work environment do you prefer?",
      es: "Que ambiente de trabajo prefieres?",
    },
    options: [
      { value: "clinic", label: { en: "Clinic / exam rooms", es: "Clinica / consultorios" } },
      { value: "office", label: { en: "Office / desk work", es: "Oficina / trabajo de escritorio" } },
      { value: "community", label: { en: "Community / field work", es: "Comunidad / trabajo de campo" } },
      { value: "mixed", label: { en: "Mixed — variety is good", es: "Mixto — la variedad es buena" } },
    ],
  },
  {
    id: "salary",
    question: {
      en: "What salary range are you targeting?",
      es: "Que rango salarial buscas?",
    },
    options: [
      { value: "under50", label: { en: "Under $50,000", es: "Menos de $50,000" } },
      { value: "50-75", label: { en: "$50,000 - $75,000", es: "$50,000 - $75,000" } },
      { value: "75-100", label: { en: "$75,000 - $100,000", es: "$75,000 - $100,000" } },
      { value: "100-150", label: { en: "$100,000 - $150,000", es: "$100,000 - $150,000" } },
      { value: "150+", label: { en: "$150,000+", es: "$150,000+" } },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Role Definitions — scored against answers                          */
/* ------------------------------------------------------------------ */

interface RoleProfile {
  roleId: string;
  label: { en: string; es: string };
  description: { en: string; es: string };
  certifications: string[];
  department: string;
  // Scoring weights: each field maps answer values to a 0-10 score
  scores: Record<string, Record<string, number>>;
}

const ROLE_PROFILES: RoleProfile[] = [
  {
    roleId: "chw",
    label: { en: "Community Health Worker", es: "Promotor/a de Salud" },
    description: {
      en: "Connect patients to resources, lead health education workshops, and advocate for underserved communities. The heart of the FQHC mission.",
      es: "Conecta a los pacientes con recursos, dirige talleres de educacion en salud y aboga por las comunidades desatendidas.",
    },
    certifications: ["CHW Certificate (SB 803)", "BLS/CPR"],
    department: "Care Coordination",
    scores: {
      "patient-care": { direct: 8, behind: 2, both: 6 },
      "education": { highschool: 10, associates: 9, bachelors: 7, masters: 4, doctorate: 2 },
      "bilingual": { yes: 10, no: 5 },
      "work-style": { independent: 5, team: 8, either: 7 },
      "motivation": { helping: 10, solving: 4, leading: 5, efficiency: 2 },
      "clinical": { yes: 5, somewhat: 7, no: 9 },
      "stress": { thrive: 7, manage: 8, calm: 5 },
      "experience": { none: 9, "1-3": 8, "3-5": 6, "5+": 4 },
      "environment": { clinic: 4, office: 2, community: 10, mixed: 7 },
      "salary": { under50: 9, "50-75": 8, "75-100": 4, "100-150": 1, "150+": 0 },
    },
  },
  {
    roleId: "care_coordinator",
    label: { en: "Care Coordinator", es: "Coordinador/a de Atencion" },
    description: {
      en: "Manage patient care plans, coordinate between providers, and ensure patients get the follow-up care they need. A crucial bridge between patients and the healthcare system.",
      es: "Administra planes de atencion, coordina entre proveedores y asegura que los pacientes reciban el seguimiento que necesitan.",
    },
    certifications: ["CCM (optional)", "BLS/CPR"],
    department: "Care Coordination",
    scores: {
      "patient-care": { direct: 7, behind: 4, both: 9 },
      "education": { highschool: 5, associates: 8, bachelors: 9, masters: 6, doctorate: 3 },
      "bilingual": { yes: 9, no: 5 },
      "work-style": { independent: 5, team: 9, either: 7 },
      "motivation": { helping: 9, solving: 7, leading: 5, efficiency: 6 },
      "clinical": { yes: 6, somewhat: 9, no: 5 },
      "stress": { thrive: 7, manage: 9, calm: 5 },
      "experience": { none: 5, "1-3": 9, "3-5": 8, "5+": 6 },
      "environment": { clinic: 6, office: 6, community: 5, mixed: 9 },
      "salary": { under50: 7, "50-75": 9, "75-100": 5, "100-150": 2, "150+": 0 },
    },
  },
  {
    roleId: "medical_assistant",
    label: { en: "Medical Assistant", es: "Asistente Medico/a" },
    description: {
      en: "Support physicians and nurses with clinical tasks — vital signs, injections, EHR documentation. The backbone of clinic operations.",
      es: "Apoya a medicos y enfermeras con tareas clinicas — signos vitales, inyecciones, documentacion EHR.",
    },
    certifications: ["CMA or RMA", "BLS/CPR", "Phlebotomy (optional)"],
    department: "Clinical",
    scores: {
      "patient-care": { direct: 9, behind: 2, both: 6 },
      "education": { highschool: 8, associates: 9, bachelors: 6, masters: 3, doctorate: 1 },
      "bilingual": { yes: 9, no: 5 },
      "work-style": { independent: 4, team: 9, either: 7 },
      "motivation": { helping: 9, solving: 5, leading: 3, efficiency: 5 },
      "clinical": { yes: 10, somewhat: 6, no: 1 },
      "stress": { thrive: 8, manage: 7, calm: 4 },
      "experience": { none: 7, "1-3": 9, "3-5": 7, "5+": 5 },
      "environment": { clinic: 10, office: 1, community: 3, mixed: 6 },
      "salary": { under50: 9, "50-75": 7, "75-100": 3, "100-150": 0, "150+": 0 },
    },
  },
  {
    roleId: "nurse_rn",
    label: { en: "Registered Nurse (RN)", es: "Enfermera/o Registrada/o (RN)" },
    description: {
      en: "Provide direct patient care, triage, care management, and clinical leadership. FQHCs offer broader scope than many hospital roles.",
      es: "Brinda atencion directa al paciente, triaje, gestion de cuidados y liderazgo clinico.",
    },
    certifications: ["RN License (CA BRN)", "BLS/CPR", "ACLS (optional)"],
    department: "Clinical",
    scores: {
      "patient-care": { direct: 10, behind: 2, both: 7 },
      "education": { highschool: 1, associates: 7, bachelors: 9, masters: 8, doctorate: 5 },
      "bilingual": { yes: 8, no: 6 },
      "work-style": { independent: 7, team: 8, either: 8 },
      "motivation": { helping: 10, solving: 7, leading: 6, efficiency: 4 },
      "clinical": { yes: 10, somewhat: 5, no: 0 },
      "stress": { thrive: 10, manage: 7, calm: 2 },
      "experience": { none: 2, "1-3": 7, "3-5": 9, "5+": 10 },
      "environment": { clinic: 10, office: 2, community: 5, mixed: 7 },
      "salary": { under50: 1, "50-75": 3, "75-100": 6, "100-150": 9, "150+": 5 },
    },
  },
  {
    roleId: "nurse_practitioner",
    label: { en: "Nurse Practitioner (NP)", es: "Enfermera/o Practicante (NP)" },
    description: {
      en: "Diagnose conditions, prescribe medications, and manage patient panels. NPs at FQHCs practice at full scope under CA law.",
      es: "Diagnostica condiciones, prescribe medicamentos y administra paneles de pacientes.",
    },
    certifications: ["NP License (CA BRN)", "DEA Registration", "BLS/ACLS"],
    department: "Clinical",
    scores: {
      "patient-care": { direct: 10, behind: 1, both: 6 },
      "education": { highschool: 0, associates: 1, bachelors: 3, masters: 10, doctorate: 9 },
      "bilingual": { yes: 8, no: 6 },
      "work-style": { independent: 9, team: 6, either: 8 },
      "motivation": { helping: 10, solving: 8, leading: 7, efficiency: 3 },
      "clinical": { yes: 10, somewhat: 3, no: 0 },
      "stress": { thrive: 10, manage: 6, calm: 1 },
      "experience": { none: 0, "1-3": 3, "3-5": 7, "5+": 10 },
      "environment": { clinic: 10, office: 2, community: 5, mixed: 7 },
      "salary": { under50: 0, "50-75": 1, "75-100": 3, "100-150": 8, "150+": 10 },
    },
  },
  {
    roleId: "behavioral_health",
    label: { en: "Behavioral Health Specialist", es: "Especialista en Salud Conductual" },
    description: {
      en: "Provide therapy, crisis intervention, and behavioral health support integrated into primary care. High demand at FQHCs as BH integration expands.",
      es: "Brinda terapia, intervencion en crisis y apoyo de salud conductual integrado en la atencion primaria.",
    },
    certifications: ["LCSW, LMFT, or ASW/AMFT", "BLS/CPR"],
    department: "Behavioral Health",
    scores: {
      "patient-care": { direct: 9, behind: 2, both: 7 },
      "education": { highschool: 0, associates: 1, bachelors: 4, masters: 10, doctorate: 9 },
      "bilingual": { yes: 10, no: 5 },
      "work-style": { independent: 8, team: 7, either: 8 },
      "motivation": { helping: 10, solving: 8, leading: 4, efficiency: 2 },
      "clinical": { yes: 6, somewhat: 8, no: 5 },
      "stress": { thrive: 9, manage: 7, calm: 3 },
      "experience": { none: 1, "1-3": 6, "3-5": 9, "5+": 10 },
      "environment": { clinic: 8, office: 7, community: 5, mixed: 8 },
      "salary": { under50: 2, "50-75": 7, "75-100": 9, "100-150": 5, "150+": 2 },
    },
  },
  {
    roleId: "social_worker",
    label: { en: "Social Worker (LCSW/ASW)", es: "Trabajador/a Social (LCSW/ASW)" },
    description: {
      en: "Address social determinants of health — housing, food insecurity, legal aid, benefits enrollment. FQHCs are expanding SDOH-focused roles.",
      es: "Aborda determinantes sociales de la salud — vivienda, inseguridad alimentaria, asistencia legal, inscripcion en beneficios.",
    },
    certifications: ["LCSW or ASW License", "BLS/CPR"],
    department: "Behavioral Health",
    scores: {
      "patient-care": { direct: 8, behind: 3, both: 8 },
      "education": { highschool: 0, associates: 1, bachelors: 5, masters: 10, doctorate: 7 },
      "bilingual": { yes: 10, no: 5 },
      "work-style": { independent: 6, team: 8, either: 8 },
      "motivation": { helping: 10, solving: 7, leading: 5, efficiency: 3 },
      "clinical": { yes: 4, somewhat: 7, no: 8 },
      "stress": { thrive: 8, manage: 8, calm: 4 },
      "experience": { none: 2, "1-3": 7, "3-5": 9, "5+": 9 },
      "environment": { clinic: 5, office: 5, community: 9, mixed: 9 },
      "salary": { under50: 1, "50-75": 5, "75-100": 9, "100-150": 7, "150+": 2 },
    },
  },
  {
    roleId: "dental_assistant",
    label: { en: "Dental Assistant", es: "Asistente Dental" },
    description: {
      en: "Assist dentists with procedures, take X-rays, sterilize instruments, and educate patients on oral health. FQHCs are expanding dental programs.",
      es: "Asiste a los dentistas con procedimientos, toma radiografias, esteriliza instrumentos y educa a los pacientes sobre salud oral.",
    },
    certifications: ["DA License (DHCC)", "X-ray Certification", "BLS/CPR"],
    department: "Dental",
    scores: {
      "patient-care": { direct: 9, behind: 2, both: 5 },
      "education": { highschool: 8, associates: 9, bachelors: 5, masters: 2, doctorate: 0 },
      "bilingual": { yes: 8, no: 5 },
      "work-style": { independent: 3, team: 9, either: 7 },
      "motivation": { helping: 8, solving: 5, leading: 2, efficiency: 5 },
      "clinical": { yes: 9, somewhat: 6, no: 1 },
      "stress": { thrive: 7, manage: 8, calm: 5 },
      "experience": { none: 7, "1-3": 9, "3-5": 7, "5+": 5 },
      "environment": { clinic: 10, office: 1, community: 1, mixed: 5 },
      "salary": { under50: 9, "50-75": 7, "75-100": 2, "100-150": 0, "150+": 0 },
    },
  },
  {
    roleId: "patient_services",
    label: { en: "Patient Services Representative", es: "Representante de Servicios al Paciente" },
    description: {
      en: "First point of contact for patients — scheduling, check-in, insurance verification, and answering questions. The welcoming face of the FQHC.",
      es: "Primer punto de contacto para pacientes — programacion, registro, verificacion de seguro y responder preguntas.",
    },
    certifications: ["None required", "Bilingual preferred"],
    department: "Administrative",
    scores: {
      "patient-care": { direct: 6, behind: 5, both: 8 },
      "education": { highschool: 10, associates: 8, bachelors: 5, masters: 2, doctorate: 0 },
      "bilingual": { yes: 10, no: 5 },
      "work-style": { independent: 4, team: 8, either: 7 },
      "motivation": { helping: 8, solving: 4, leading: 3, efficiency: 8 },
      "clinical": { yes: 3, somewhat: 5, no: 10 },
      "stress": { thrive: 7, manage: 8, calm: 6 },
      "experience": { none: 10, "1-3": 8, "3-5": 5, "5+": 3 },
      "environment": { clinic: 6, office: 8, community: 2, mixed: 6 },
      "salary": { under50: 10, "50-75": 6, "75-100": 2, "100-150": 0, "150+": 0 },
    },
  },
  {
    roleId: "billing_specialist",
    label: { en: "Billing Specialist", es: "Especialista en Facturacion" },
    description: {
      en: "Process claims, manage denials, and ensure the FQHC gets paid for the care it provides. Revenue cycle expertise is critical for FQHC survival.",
      es: "Procesa reclamos, gestiona negaciones y asegura que el FQHC reciba pago por la atencion que brinda.",
    },
    certifications: ["CPC or CCS (preferred)", "FQHC billing knowledge"],
    department: "Administrative",
    scores: {
      "patient-care": { direct: 1, behind: 10, both: 5 },
      "education": { highschool: 5, associates: 8, bachelors: 9, masters: 5, doctorate: 1 },
      "bilingual": { yes: 6, no: 7 },
      "work-style": { independent: 8, team: 5, either: 7 },
      "motivation": { helping: 3, solving: 8, leading: 3, efficiency: 10 },
      "clinical": { yes: 3, somewhat: 5, no: 10 },
      "stress": { thrive: 6, manage: 8, calm: 7 },
      "experience": { none: 4, "1-3": 7, "3-5": 9, "5+": 9 },
      "environment": { clinic: 2, office: 10, community: 0, mixed: 5 },
      "salary": { under50: 6, "50-75": 9, "75-100": 6, "100-150": 2, "150+": 0 },
    },
  },
  {
    roleId: "health_educator",
    label: { en: "Health Educator", es: "Educador/a de Salud" },
    description: {
      en: "Design and deliver health education programs — diabetes self-management, nutrition, chronic disease prevention. Empower patients through knowledge.",
      es: "Disena y ofrece programas de educacion en salud — autocontrol de diabetes, nutricion, prevencion de enfermedades cronicas.",
    },
    certifications: ["CHES or MCHES (preferred)", "BLS/CPR"],
    department: "Care Coordination",
    scores: {
      "patient-care": { direct: 7, behind: 3, both: 8 },
      "education": { highschool: 3, associates: 5, bachelors: 9, masters: 8, doctorate: 5 },
      "bilingual": { yes: 10, no: 5 },
      "work-style": { independent: 5, team: 7, either: 8 },
      "motivation": { helping: 9, solving: 5, leading: 7, efficiency: 3 },
      "clinical": { yes: 4, somewhat: 7, no: 7 },
      "stress": { thrive: 5, manage: 8, calm: 7 },
      "experience": { none: 6, "1-3": 8, "3-5": 8, "5+": 7 },
      "environment": { clinic: 5, office: 3, community: 10, mixed: 8 },
      "salary": { under50: 7, "50-75": 9, "75-100": 5, "100-150": 2, "150+": 0 },
    },
  },
  {
    roleId: "program_manager",
    label: { en: "Program Manager", es: "Gerente de Programa" },
    description: {
      en: "Lead FQHC programs like ECM, CalAIM, Ryan White, or 340B. Manage budgets, staff, and outcomes. A leadership role with direct community impact.",
      es: "Dirige programas del FQHC como ECM, CalAIM, Ryan White o 340B. Administra presupuestos, personal y resultados.",
    },
    certifications: ["PMP (optional)", "CHC-specific training"],
    department: "Leadership",
    scores: {
      "patient-care": { direct: 3, behind: 7, both: 8 },
      "education": { highschool: 1, associates: 3, bachelors: 8, masters: 10, doctorate: 7 },
      "bilingual": { yes: 7, no: 6 },
      "work-style": { independent: 5, team: 7, either: 8 },
      "motivation": { helping: 6, solving: 8, leading: 10, efficiency: 7 },
      "clinical": { yes: 5, somewhat: 6, no: 7 },
      "stress": { thrive: 9, manage: 7, calm: 3 },
      "experience": { none: 0, "1-3": 4, "3-5": 8, "5+": 10 },
      "environment": { clinic: 4, office: 7, community: 4, mixed: 9 },
      "salary": { under50: 1, "50-75": 4, "75-100": 8, "100-150": 9, "150+": 4 },
    },
  },
  {
    roleId: "revenue_cycle",
    label: { en: "Revenue Cycle Specialist", es: "Especialista de Ciclo de Ingresos" },
    description: {
      en: "Optimize the full revenue cycle — from patient registration to final payment. Critical for FQHC financial sustainability, especially under PPS.",
      es: "Optimiza el ciclo completo de ingresos — desde el registro del paciente hasta el pago final.",
    },
    certifications: ["CRCR or CPC", "FQHC PPS knowledge"],
    department: "Administrative",
    scores: {
      "patient-care": { direct: 1, behind: 10, both: 5 },
      "education": { highschool: 3, associates: 7, bachelors: 9, masters: 7, doctorate: 2 },
      "bilingual": { yes: 5, no: 7 },
      "work-style": { independent: 7, team: 5, either: 7 },
      "motivation": { helping: 2, solving: 9, leading: 5, efficiency: 10 },
      "clinical": { yes: 2, somewhat: 4, no: 10 },
      "stress": { thrive: 7, manage: 8, calm: 5 },
      "experience": { none: 2, "1-3": 6, "3-5": 9, "5+": 10 },
      "environment": { clinic: 2, office: 10, community: 0, mixed: 5 },
      "salary": { under50: 4, "50-75": 8, "75-100": 8, "100-150": 3, "150+": 0 },
    },
  },
  {
    roleId: "enrollment_specialist",
    label: { en: "Health Enrollment Navigator", es: "Navegador/a de Inscripcion de Salud" },
    description: {
      en: "Help patients enroll in Medi-Cal, Covered California, Medicare, and other programs. A vital role as coverage changes threaten patient access.",
      es: "Ayuda a los pacientes a inscribirse en Medi-Cal, Covered California, Medicare y otros programas.",
    },
    certifications: ["Certified Application Assister (CAA)", "Bilingual strongly preferred"],
    department: "Care Coordination",
    scores: {
      "patient-care": { direct: 7, behind: 4, both: 8 },
      "education": { highschool: 8, associates: 9, bachelors: 7, masters: 3, doctorate: 0 },
      "bilingual": { yes: 10, no: 4 },
      "work-style": { independent: 6, team: 7, either: 8 },
      "motivation": { helping: 9, solving: 6, leading: 3, efficiency: 7 },
      "clinical": { yes: 2, somewhat: 5, no: 10 },
      "stress": { thrive: 6, manage: 9, calm: 6 },
      "experience": { none: 8, "1-3": 9, "3-5": 6, "5+": 4 },
      "environment": { clinic: 5, office: 6, community: 8, mixed: 8 },
      "salary": { under50: 9, "50-75": 8, "75-100": 3, "100-150": 0, "150+": 0 },
    },
  },
  {
    roleId: "pharmacist",
    label: { en: "Pharmacist", es: "Farmaceutico/a" },
    description: {
      en: "Manage 340B drug programs, conduct medication therapy management, and support clinical pharmacology. 340B savings are critical for FQHC revenue.",
      es: "Administra programas de medicamentos 340B, realiza gestion de terapia con medicamentos y apoya la farmacologia clinica.",
    },
    certifications: ["PharmD + CA License", "340B University (preferred)"],
    department: "Pharmacy",
    scores: {
      "patient-care": { direct: 7, behind: 5, both: 8 },
      "education": { highschool: 0, associates: 0, bachelors: 2, masters: 4, doctorate: 10 },
      "bilingual": { yes: 7, no: 6 },
      "work-style": { independent: 8, team: 6, either: 8 },
      "motivation": { helping: 7, solving: 9, leading: 5, efficiency: 6 },
      "clinical": { yes: 9, somewhat: 5, no: 1 },
      "stress": { thrive: 8, manage: 7, calm: 4 },
      "experience": { none: 0, "1-3": 5, "3-5": 8, "5+": 10 },
      "environment": { clinic: 8, office: 5, community: 2, mixed: 7 },
      "salary": { under50: 0, "50-75": 0, "75-100": 2, "100-150": 6, "150+": 10 },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Matching Logic                                                     */
/* ------------------------------------------------------------------ */

function calculateMatches(answers: Record<string, string>): RoleMatch[] {
  const results: RoleMatch[] = ROLE_PROFILES.map((role) => {
    let totalScore = 0;
    let maxScore = 0;

    for (const q of QUESTIONS) {
      const answer = answers[q.id];
      if (!answer) continue;
      const roleScore = role.scores[q.id]?.[answer] ?? 5;
      totalScore += roleScore;
      maxScore += 10;
    }

    const matchPercent = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    // Look up salary from benchmarks
    const benchmark = SALARY_BENCHMARKS.find((b) => b.roleId === role.roleId);

    return {
      roleId: role.roleId,
      label: role.label,
      description: role.description,
      matchPercent,
      salaryRange: benchmark ? { p25: benchmark.p25, p50: benchmark.p50, p75: benchmark.p75 } : null,
      certifications: role.certifications,
      department: role.department,
    };
  });

  // Sort by match percent, descending
  results.sort((a, b) => b.matchPercent - a.matchPercent);
  return results;
}

/* ------------------------------------------------------------------ */
/*  Formatting Helpers                                                 */
/* ------------------------------------------------------------------ */

function formatSalary(n: number): string {
  return `$${(n / 1000).toFixed(0)}K`;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CareerQuizPage() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const [step, setStep] = useState(0); // 0-9 = questions, 10 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<RoleMatch[]>([]);

  const currentQuestion = QUESTIONS[step];
  const totalQuestions = QUESTIONS.length;
  const progress = Math.round(((step) / totalQuestions) * 100);

  function selectAnswer(value: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      setResults(calculateMatches(newAnswers));
      setStep(totalQuestions);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults([]);
  }

  const showResults = step === totalQuestions;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
            <Trophy className="size-4" />
            {isEs ? "Quiz de 2 minutos" : "2-Minute Quiz"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
            {isEs ? "Cual Rol FQHC es Para Ti?" : "Which FQHC Role Fits You?"}
          </h1>
          <p className="mt-3 text-lg text-stone-600 dark:text-stone-400">
            {isEs
              ? "Responde 10 preguntas y descubre los mejores roles para ti en centros de salud comunitarios."
              : "Answer 10 questions and discover the best community health center roles for you."}
          </p>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
              <span>
                {isEs ? "Pregunta" : "Question"} {step + 1} / {totalQuestions}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Card */}
        {!showResults && currentQuestion && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-700 dark:bg-stone-800/50">
            <h2 className="mb-6 text-xl font-semibold text-stone-900 dark:text-white">
              {t(currentQuestion.question)}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(opt.value)}
                    className={`w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${
                      selected
                        ? "border-teal-600 bg-teal-50 text-teal-800 dark:border-teal-500 dark:bg-teal-900/30 dark:text-teal-200"
                        : "border-stone-200 bg-white text-stone-700 hover:border-teal-300 hover:bg-teal-50/50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-teal-600"
                    }`}
                  >
                    {t(opt.label)}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button
                onClick={goBack}
                className="mt-4 flex items-center gap-1 text-sm text-stone-500 hover:text-teal-700 dark:text-stone-400 dark:hover:text-teal-400"
              >
                <ChevronLeft className="size-4" />
                {isEs ? "Anterior" : "Back"}
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                {isEs ? "Tus Mejores Roles" : "Your Top Role Matches"}
              </h2>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                {isEs
                  ? "Basado en tus respuestas, estos roles son los mejores para ti."
                  : "Based on your answers, these roles are the best fit for you."}
              </p>
            </div>

            <div className="space-y-6">
              {results.slice(0, 3).map((role, i) => (
                <div
                  key={role.roleId}
                  className={`rounded-2xl border p-6 shadow-sm ${
                    i === 0
                      ? "border-teal-300 bg-teal-50/50 ring-2 ring-teal-200 dark:border-teal-600 dark:bg-teal-900/20 dark:ring-teal-800"
                      : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800/50"
                  }`}
                >
                  {/* Rank + Name + Match */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-10 items-center justify-center rounded-full text-lg font-bold ${
                          i === 0
                            ? "bg-teal-600 text-white"
                            : "bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                          {t(role.label)}
                        </h3>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          {role.department}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-teal-700 dark:text-teal-400">
                        {role.matchPercent}%
                      </span>
                      <span className="block text-xs text-stone-500 dark:text-stone-400">
                        {isEs ? "coincidencia" : "match"}
                      </span>
                    </div>
                  </div>

                  {/* Match Bar */}
                  <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                    <div
                      className="h-full rounded-full bg-teal-600 transition-all"
                      style={{ width: `${role.matchPercent}%` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-stone-600 dark:text-stone-300">
                    {t(role.description)}
                  </p>

                  {/* Stats Grid */}
                  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Salary */}
                    {role.salaryRange && (
                      <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 dark:bg-stone-700/50">
                        <DollarSign className="size-4 text-teal-600 dark:text-teal-400" />
                        <div>
                          <span className="text-xs text-stone-500 dark:text-stone-400">
                            {isEs ? "Salario CA" : "CA Salary Range"}
                          </span>
                          <p className="text-sm font-semibold text-stone-900 dark:text-white">
                            {formatSalary(role.salaryRange.p25)} - {formatSalary(role.salaryRange.p75)}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Certifications */}
                    <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2 dark:bg-stone-700/50">
                      <GraduationCap className="size-4 text-teal-600 dark:text-teal-400" />
                      <div>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {isEs ? "Certificaciones" : "Certifications"}
                        </span>
                        <p className="text-sm font-medium text-stone-900 dark:text-white">
                          {role.certifications.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/jobs?department=${encodeURIComponent(role.department)}` as "/jobs"}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
                    >
                      <Briefcase className="size-3.5" />
                      {isEs ? "Ver Empleos" : "View Jobs"}
                      <ArrowRight className="size-3.5" />
                    </Link>
                    <Link
                      href="/career-roadmap"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-700"
                    >
                      {isEs ? "Ruta de Carrera" : "Career Roadmap"}
                    </Link>
                    <Link
                      href="/resume-builder"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-700"
                    >
                      {isEs ? "Crear CV" : "Build Resume"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Roles */}
            {results.length > 3 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-stone-900 dark:text-white">
                  {isEs ? "Otros roles que podrian interesarte" : "Other roles you might explore"}
                </h3>
                <div className="space-y-2">
                  {results.slice(3, 8).map((role) => (
                    <div
                      key={role.roleId}
                      className="flex items-center justify-between rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-stone-700 dark:bg-stone-800/50"
                    >
                      <div>
                        <span className="font-medium text-stone-900 dark:text-white">
                          {t(role.label)}
                        </span>
                        <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
                          {role.department}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                        {role.matchPercent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Restart + Explore */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-700"
              >
                <RotateCcw className="size-4" />
                {isEs ? "Tomar de nuevo" : "Retake Quiz"}
              </button>
              <Link
                href="/career-insights"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800"
              >
                {isEs ? "Evaluacion Completa" : "Full Career Assessment"}
                <ChevronRight className="size-4" />
              </Link>
            </div>

            {/* Cross-links */}
            <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-800/30">
              <h3 className="mb-3 text-base font-semibold text-stone-900 dark:text-white">
                {isEs ? "Explora mas herramientas gratuitas" : "Explore more free tools"}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { href: "/career-insights" as const, label: isEs ? "Evaluacion de Carrera (5 dominios)" : "Career Assessment (5 domains)" },
                  { href: "/certifications" as const, label: isEs ? "Catalogo de Certificaciones" : "Certification Catalog" },
                  { href: "/salary-data" as const, label: isEs ? "Datos Salariales por Region" : "Salary Data by Region" },
                  { href: "/find-your-fit" as const, label: isEs ? "Encuentra Tu FQHC Ideal" : "Find Your Ideal FQHC" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-teal-700 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/20"
                  >
                    <ChevronRight className="size-3.5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
