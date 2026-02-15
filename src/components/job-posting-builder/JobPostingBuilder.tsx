"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CheckCircle2,
  Loader2,
  Briefcase,
  FileText,
  DollarSign,
  Shield,
  Users,
  ArrowRight,
  ArrowLeft,
  Download,
  Copy,
  Check,
  AlertTriangle,
  TrendingUp,
  Star,
  ClipboardList,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_POSTING_TEMPLATES,
  SALARY_BENCHMARKS,
  STANDARD_BENEFITS,
  SCREENING_CATEGORIES,
  getSalaryBenchmark,
  getSalaryCompetitiveness,
  formatSalary,
  type PostingTemplate,
  type SalaryBenchmark,
} from "@/lib/job-posting-templates";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TOTAL_STEPS = 5;

const REGIONS = [
  "Los Angeles",
  "San Diego",
  "Bay Area",
  "Sacramento",
  "Central Valley",
  "Inland Empire",
  "Other California",
] as const;

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "NextGen",
  "eClinicalWorks",
  "Cerner",
  "athenahealth",
  "Other",
] as const;

const PROGRAMS = [
  "ECM",
  "CCM",
  "Community Supports",
  "TCM",
  "BH-ASO",
] as const;

const EMPLOYMENT_TYPES = [
  { value: "full-time", en: "Full-Time", es: "Tiempo Completo" },
  { value: "part-time", en: "Part-Time", es: "Medio Tiempo" },
  { value: "per-diem", en: "Per Diem", es: "Por Día" },
  { value: "contract", en: "Contract", es: "Contrato" },
] as const;

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */

const content = {
  en: {
    heroTitle: "Free FQHC Job Posting Builder",
    heroSubtitle: "Create professional, optimized job postings that attract qualified community health candidates. Includes salary benchmarks, screening questions, and bilingual output.",
    badge1: "100% free",
    badge2: "Bilingual EN/ES output",
    badge3: "Salary benchmarks",
    // Steps
    step1Title: "Select Role",
    step2Title: "Organization Details",
    step3Title: "Compensation & Benefits",
    step4Title: "Screening Questions",
    step5Title: "Review & Download",
    stepOf: "Step {current} of {total}",
    // Step 1
    selectRoleType: "What role are you hiring for?",
    selectRolePlaceholder: "Select a role",
    roleSelected: "Template loaded! Customize the posting below.",
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g. Care Coordinator — ECM Program",
    employmentType: "Employment Type",
    selectEmploymentType: "Select type",
    positionSummary: "Position Summary",
    summaryPlaceholder: "Describe the role and its impact on your community...",
    responsibilities: "Key Responsibilities",
    addResponsibility: "+ Add Responsibility",
    qualifications: "Required Qualifications",
    addQualification: "+ Add Qualification",
    preferredSkills: "Preferred Skills",
    addPreferredSkill: "+ Add Preferred Skill",
    // Step 2
    orgName: "Organization Name",
    orgNamePlaceholder: "Community Health Center of...",
    contactName: "Hiring Manager / Contact Name",
    contactNamePlaceholder: "Jane Smith",
    contactEmail: "Contact Email",
    contactEmailPlaceholder: "hr@yourfqhc.org",
    contactPhone: "Phone",
    contactPhonePlaceholder: "(555) 123-4567",
    region: "Region",
    selectRegion: "Select region",
    city: "City",
    cityPlaceholder: "e.g. East Los Angeles",
    ehrSystem: "EHR System",
    selectEhr: "Select EHR",
    programs: "Active Programs",
    orgNotes: "About Your Organization",
    orgNotesPlaceholder: "Tell candidates about your FQHC's mission, culture, and what makes it a great place to work...",
    // Step 3
    salaryRange: "Salary Range",
    salaryMin: "Min Salary ($)",
    salaryMax: "Max Salary ($)",
    salaryBenchmark: "Market Benchmark",
    benchmarkP25: "25th Percentile",
    benchmarkP50: "50th Percentile (Median)",
    benchmarkP75: "75th Percentile",
    yourOffer: "Your Offer Range",
    competitiveness: "Competitiveness",
    belowMarket: "Below Market — May struggle to attract candidates",
    competitive: "Competitive — In range with market",
    strong: "Strong — Above median, attractive to experienced candidates",
    premium: "Premium — Will attract top talent quickly",
    recommendation: "To be competitive in this market, we recommend offering at least",
    benefits: "Benefits Offered",
    additionalBenefits: "Additional Benefits / Perks",
    additionalBenefitsPlaceholder: "e.g. Sign-on bonus, relocation assistance, student loan repayment matching...",
    // Step 4
    screeningTitle: "Screening Questions",
    screeningSubtitle: "Select questions to include in your posting. These help identify candidates with the FQHC-specific experience you need.",
    customQuestion: "Add Custom Question",
    customQuestionPlaceholder: "Type a custom screening question...",
    addQuestion: "Add",
    selectedQuestions: "Selected Questions",
    noQuestionsSelected: "No screening questions selected yet.",
    // Step 5
    previewTitle: "Job Posting Preview",
    outputLanguage: "Output Language",
    englishOnly: "English Only",
    spanishOnly: "Spanish Only",
    bilingual: "Bilingual (EN + ES)",
    copyToClipboard: "Copy to Clipboard",
    copied: "Copied!",
    downloadPosting: "Download as Text",
    downloadPdf: "Download as PDF",
    saveAndCollect: "Save & Join FQHC Network",
    editPosting: "Edit Posting",
    postOnSite: "Also post on FQHCTalent.com?",
    postOnSiteDesc: "We'll review and publish your posting on our site — visible to our talent network for free.",
    yesPostOnSite: "Yes, post on FQHC Talent Exchange",
    noJustDownload: "No, I just need the posting",
    // Shared
    back: "Back",
    next: "Next",
    optional: "optional",
    required: "required",
    remove: "Remove",
    // Validation
    roleRequired: "Please select a role.",
    titleRequired: "Job title is required.",
    orgNameRequired: "Organization name is required.",
    emailRequired: "Contact email is required.",
    emailInvalid: "Please enter a valid email.",
    // Success
    successTitle: "Your Job Posting is Ready!",
    successSubtitle: "We've also captured your posting details. Here's what you get:",
    successStep1: "Your Posting",
    successStep1Desc: "A professional, FQHC-optimized job posting ready to use anywhere.",
    successStep2: "Salary Insights",
    successStep2Desc: "Your salary range compared to California FQHC benchmarks.",
    successStep3: "Talent Access",
    successStep3Desc: "When you're ready, access our pre-vetted community health candidate network.",
    whileYoureHere: "While You're Here",
    browseCandidates: "Post on FQHC Talent Exchange",
    viewDirectory: "Browse FQHC Directory",
    viewSalaryGuide: "Salary Negotiation Guide",
    // Output labels
    outputPostedBy: "Posted by",
    outputLocation: "Location",
    outputType: "Employment Type",
    outputSalary: "Salary Range",
    outputAboutUs: "About Us",
    outputResponsibilities: "Key Responsibilities",
    outputQualifications: "Required Qualifications",
    outputPreferred: "Preferred Skills",
    outputBenefits: "Benefits",
    outputScreening: "Screening Questions",
    outputApply: "To Apply",
    outputApplyText: "Submit your resume to",
    outputEqualOpp: "Equal Opportunity Employer",
    outputEqualOppText: "We are committed to providing equal employment opportunities to all qualified individuals regardless of race, color, religion, sex, national origin, disability, or veteran status. We actively encourage applications from bilingual and multilingual candidates.",
  },
  es: {
    heroTitle: "Creador de Publicaciones de Empleo FQHC — Gratis",
    heroSubtitle: "Crea publicaciones de empleo profesionales y optimizadas que atraigan candidatos calificados de salud comunitaria. Incluye puntos de referencia salariales, preguntas de evaluación y salida bilingüe.",
    badge1: "100% gratis",
    badge2: "Salida bilingüe EN/ES",
    badge3: "Puntos de referencia salariales",
    step1Title: "Seleccionar Puesto",
    step2Title: "Detalles de Organización",
    step3Title: "Compensación y Beneficios",
    step4Title: "Preguntas de Evaluación",
    step5Title: "Revisar y Descargar",
    stepOf: "Paso {current} de {total}",
    selectRoleType: "¿Para qué puesto estás contratando?",
    selectRolePlaceholder: "Selecciona un puesto",
    roleSelected: "¡Plantilla cargada! Personaliza la publicación abajo.",
    jobTitle: "Título del Puesto",
    jobTitlePlaceholder: "ej. Coordinador/a de Atención — Programa ECM",
    employmentType: "Tipo de Empleo",
    selectEmploymentType: "Selecciona tipo",
    positionSummary: "Resumen del Puesto",
    summaryPlaceholder: "Describe el puesto y su impacto en tu comunidad...",
    responsibilities: "Responsabilidades Clave",
    addResponsibility: "+ Agregar Responsabilidad",
    qualifications: "Calificaciones Requeridas",
    addQualification: "+ Agregar Calificación",
    preferredSkills: "Habilidades Preferidas",
    addPreferredSkill: "+ Agregar Habilidad Preferida",
    orgName: "Nombre de la Organización",
    orgNamePlaceholder: "Centro de Salud Comunitario de...",
    contactName: "Gerente de Contratación / Nombre de Contacto",
    contactNamePlaceholder: "María García",
    contactEmail: "Correo Electrónico de Contacto",
    contactEmailPlaceholder: "rh@sufqhc.org",
    contactPhone: "Teléfono",
    contactPhonePlaceholder: "(555) 123-4567",
    region: "Región",
    selectRegion: "Selecciona región",
    city: "Ciudad",
    cityPlaceholder: "ej. Este de Los Ángeles",
    ehrSystem: "Sistema EHR",
    selectEhr: "Selecciona EHR",
    programs: "Programas Activos",
    orgNotes: "Acerca de Tu Organización",
    orgNotesPlaceholder: "Cuéntale a los candidatos sobre la misión, cultura y lo que hace de tu FQHC un gran lugar para trabajar...",
    salaryRange: "Rango Salarial",
    salaryMin: "Salario Mínimo ($)",
    salaryMax: "Salario Máximo ($)",
    salaryBenchmark: "Referencia del Mercado",
    benchmarkP25: "Percentil 25",
    benchmarkP50: "Percentil 50 (Mediana)",
    benchmarkP75: "Percentil 75",
    yourOffer: "Tu Rango de Oferta",
    competitiveness: "Competitividad",
    belowMarket: "Por Debajo del Mercado — Puede ser difícil atraer candidatos",
    competitive: "Competitivo — En rango con el mercado",
    strong: "Fuerte — Por encima de la mediana, atractivo para candidatos experimentados",
    premium: "Premium — Atraerá al mejor talento rápidamente",
    recommendation: "Para ser competitivo en este mercado, recomendamos ofrecer al menos",
    benefits: "Beneficios Ofrecidos",
    additionalBenefits: "Beneficios / Ventajas Adicionales",
    additionalBenefitsPlaceholder: "ej. Bono de contratación, asistencia de reubicación, igualación de pago de préstamos estudiantiles...",
    screeningTitle: "Preguntas de Evaluación",
    screeningSubtitle: "Selecciona preguntas para incluir en tu publicación. Estas ayudan a identificar candidatos con la experiencia FQHC específica que necesitas.",
    customQuestion: "Agregar Pregunta Personalizada",
    customQuestionPlaceholder: "Escribe una pregunta de evaluación personalizada...",
    addQuestion: "Agregar",
    selectedQuestions: "Preguntas Seleccionadas",
    noQuestionsSelected: "No se han seleccionado preguntas de evaluación aún.",
    previewTitle: "Vista Previa de Publicación de Empleo",
    outputLanguage: "Idioma de Salida",
    englishOnly: "Solo Inglés",
    spanishOnly: "Solo Español",
    bilingual: "Bilingüe (EN + ES)",
    copyToClipboard: "Copiar al Portapapeles",
    copied: "¡Copiado!",
    downloadPosting: "Descargar como Texto",
    downloadPdf: "Descargar como PDF",
    saveAndCollect: "Guardar y Unirse a Red FQHC",
    editPosting: "Editar Publicación",
    postOnSite: "¿También publicar en FQHCTalent.com?",
    postOnSiteDesc: "Revisaremos y publicaremos tu publicación en nuestro sitio — visible para nuestra red de talento gratis.",
    yesPostOnSite: "Sí, publicar en FQHC Talent Exchange",
    noJustDownload: "No, solo necesito la publicación",
    back: "Atrás",
    next: "Siguiente",
    optional: "opcional",
    required: "requerido",
    remove: "Eliminar",
    roleRequired: "Por favor selecciona un puesto.",
    titleRequired: "El título del puesto es obligatorio.",
    orgNameRequired: "El nombre de la organización es obligatorio.",
    emailRequired: "El correo electrónico de contacto es obligatorio.",
    emailInvalid: "Ingresa un correo electrónico válido.",
    successTitle: "¡Tu Publicación de Empleo Está Lista!",
    successSubtitle: "También hemos capturado los detalles de tu publicación. Esto es lo que obtienes:",
    successStep1: "Tu Publicación",
    successStep1Desc: "Una publicación de empleo profesional optimizada para FQHC lista para usar en cualquier lugar.",
    successStep2: "Insights Salariales",
    successStep2Desc: "Tu rango salarial comparado con puntos de referencia de FQHCs en California.",
    successStep3: "Acceso a Talento",
    successStep3Desc: "Cuando estés listo, accede a nuestra red pre-evaluada de candidatos de salud comunitaria.",
    whileYoureHere: "Mientras Estás Aquí",
    browseCandidates: "Publicar en FQHC Talent Exchange",
    viewDirectory: "Explorar Directorio FQHC",
    viewSalaryGuide: "Guía de Negociación Salarial",
    outputPostedBy: "Publicado por",
    outputLocation: "Ubicación",
    outputType: "Tipo de Empleo",
    outputSalary: "Rango Salarial",
    outputAboutUs: "Acerca de Nosotros",
    outputResponsibilities: "Responsabilidades Clave",
    outputQualifications: "Calificaciones Requeridas",
    outputPreferred: "Habilidades Preferidas",
    outputBenefits: "Beneficios",
    outputScreening: "Preguntas de Evaluación",
    outputApply: "Para Postularse",
    outputApplyText: "Envía tu currículum a",
    outputEqualOpp: "Empleador con Igualdad de Oportunidades",
    outputEqualOppText: "Estamos comprometidos a proporcionar igualdad de oportunidades de empleo a todas las personas calificadas sin importar raza, color, religión, sexo, origen nacional, discapacidad o estado de veterano. Alentamos activamente las solicitudes de candidatos bilingües y multilingües.",
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormErrors {
  role?: string;
  title?: string;
  orgName?: string;
  email?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function JobPostingBuilder() {
  const locale = useLocale();
  const t = locale === "es" ? content.es : content.en;
  const previewRef = useRef<HTMLDivElement>(null);

  /* --- Step --- */
  const [step, setStep] = useState(1);

  /* --- Step 1: Role & Content --- */
  const [selectedRole, setSelectedRole] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [summary, setSummary] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);

  /* --- Step 2: Organization --- */
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [ehrSystem, setEhrSystem] = useState("");
  const [activePrograms, setActivePrograms] = useState<string[]>([]);
  const [orgNotes, setOrgNotes] = useState("");

  /* --- Step 3: Compensation --- */
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [additionalBenefits, setAdditionalBenefits] = useState("");

  /* --- Step 4: Screening --- */
  const [screeningQuestions, setScreeningQuestions] = useState<string[]>([]);
  const [customQuestion, setCustomQuestion] = useState("");

  /* --- Step 5: Output --- */
  const [outputLang, setOutputLang] = useState<"en" | "es" | "bilingual">("en");
  const [postOnSite, setPostOnSite] = useState(true);
  const [copied, setCopied] = useState(false);

  /* --- UI state --- */
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  Helpers                                                          */
  /* ---------------------------------------------------------------- */

  function toggleCheckbox(
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) {
    setter(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value],
    );
  }

  function handleRoleSelect(roleId: string) {
    setSelectedRole(roleId);
    const template = JOB_POSTING_TEMPLATES.find((t) => t.roleId === roleId);
    if (template) {
      const isEs = locale === "es";
      setJobTitle(isEs ? template.esLabel : template.label);
      setSummary(isEs ? template.esSummaryTemplate : template.summaryTemplate);
      setResponsibilities(isEs ? [...template.esResponsibilities] : [...template.responsibilities]);
      setQualifications(isEs ? [...template.esQualifications] : [...template.qualifications]);
      setPreferredSkills(isEs ? [...template.esPreferredSkills] : [...template.preferredSkills]);
    }
  }

  function addListItem(list: string[], setter: (v: string[]) => void) {
    setter([...list, ""]);
  }

  function updateListItem(list: string[], setter: (v: string[]) => void, index: number, value: string) {
    const updated = [...list];
    updated[index] = value;
    setter(updated);
  }

  function removeListItem(list: string[], setter: (v: string[]) => void, index: number) {
    setter(list.filter((_, i) => i !== index));
  }

  function addScreeningQuestion(question: string) {
    if (question.trim() && !screeningQuestions.includes(question.trim())) {
      setScreeningQuestions([...screeningQuestions, question.trim()]);
    }
  }

  /* --- Salary benchmark --- */
  const benchmark = getSalaryBenchmark(selectedRole);
  const minNum = parseInt(salaryMin) || 0;
  const maxNum = parseInt(salaryMax) || 0;
  const midpoint = minNum && maxNum ? Math.round((minNum + maxNum) / 2) : 0;
  const competitiveness = benchmark && midpoint ? getSalaryCompetitiveness(midpoint, benchmark) : null;

  /* ---------------------------------------------------------------- */
  /*  Validation                                                       */
  /* ---------------------------------------------------------------- */

  function validateStep(s: number): boolean {
    const next: FormErrors = {};

    if (s === 1) {
      if (!selectedRole) next.role = t.roleRequired;
      if (!jobTitle.trim()) next.title = t.titleRequired;
    }

    if (s === 2) {
      if (!orgName.trim()) next.orgName = t.orgNameRequired;
      if (!contactEmail.trim()) {
        next.email = t.emailRequired;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
        next.email = t.emailInvalid;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------------------------------------------------------- */
  /*  Generate posting text                                            */
  /* ---------------------------------------------------------------- */

  function generatePosting(lang: "en" | "es"): string {
    const isEs = lang === "es";
    const template = JOB_POSTING_TEMPLATES.find((t) => t.roleId === selectedRole);
    const tOut = isEs ? content.es : content.en;

    const lines: string[] = [];

    // Header
    lines.push("═".repeat(60));
    lines.push(jobTitle.toUpperCase());
    lines.push(`${tOut.outputPostedBy}: ${orgName}`);
    if (city && region) lines.push(`${tOut.outputLocation}: ${city}, ${region}`);
    else if (region) lines.push(`${tOut.outputLocation}: ${region}`);
    if (employmentType) {
      const empType = EMPLOYMENT_TYPES.find((e) => e.value === employmentType);
      lines.push(`${tOut.outputType}: ${empType ? (isEs ? empType.es : empType.en) : employmentType}`);
    }
    if (minNum && maxNum) {
      lines.push(`${tOut.outputSalary}: ${formatSalary(minNum)} – ${formatSalary(maxNum)}`);
    }
    lines.push("═".repeat(60));
    lines.push("");

    // Summary
    if (summary) {
      lines.push(summary);
      lines.push("");
    }

    // About Us
    if (orgNotes) {
      lines.push(`── ${tOut.outputAboutUs} ${"─".repeat(40)}`);
      lines.push(orgNotes);
      lines.push("");
    }

    // Responsibilities
    const resps = isEs && template ? template.esResponsibilities : responsibilities;
    if (resps.length > 0) {
      lines.push(`── ${tOut.outputResponsibilities} ${"─".repeat(30)}`);
      resps.filter(Boolean).forEach((r) => lines.push(`• ${r}`));
      lines.push("");
    }

    // Qualifications
    const quals = isEs && template ? template.esQualifications : qualifications;
    if (quals.length > 0) {
      lines.push(`── ${tOut.outputQualifications} ${"─".repeat(30)}`);
      quals.filter(Boolean).forEach((q) => lines.push(`• ${q}`));
      lines.push("");
    }

    // Preferred Skills
    const prefs = isEs && template ? template.esPreferredSkills : preferredSkills;
    if (prefs.length > 0) {
      lines.push(`── ${tOut.outputPreferred} ${"─".repeat(30)}`);
      prefs.filter(Boolean).forEach((p) => lines.push(`• ${p}`));
      lines.push("");
    }

    // Benefits
    if (selectedBenefits.length > 0 || additionalBenefits) {
      lines.push(`── ${tOut.outputBenefits} ${"─".repeat(30)}`);
      selectedBenefits.forEach((id) => {
        const benefit = STANDARD_BENEFITS.find((b) => b.id === id);
        if (benefit) lines.push(`• ${isEs ? benefit.esText : benefit.text}`);
      });
      if (additionalBenefits) lines.push(`• ${additionalBenefits}`);
      lines.push("");
    }

    // Screening Questions
    const sqs = isEs && template ? template.esScreeningQuestions : screeningQuestions;
    if (sqs.length > 0) {
      lines.push(`── ${tOut.outputScreening} ${"─".repeat(30)}`);
      sqs.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
      lines.push("");
    }

    // Apply
    lines.push(`── ${tOut.outputApply} ${"─".repeat(30)}`);
    lines.push(`${tOut.outputApplyText} ${contactEmail}`);
    lines.push("");

    // Equal Opportunity
    lines.push(`── ${tOut.outputEqualOpp} ${"─".repeat(20)}`);
    lines.push(tOut.outputEqualOppText);

    return lines.join("\n");
  }

  /**
   * Generate a single interwoven bilingual posting.
   * Strategy: Job title bilingual, summary both languages, responsibilities/qualifications
   * paired EN→ES per bullet, benefits paired, apply section bilingual, screening EN-only
   * (internal hiring tool). This creates one cohesive post that speaks to both audiences.
   */
  function generateBilingualPosting(): string {
    const template = JOB_POSTING_TEMPLATES.find((t) => t.roleId === selectedRole);
    const tEn = content.en;
    const tEs = content.es;

    const lines: string[] = [];

    // ── HEADER: Bilingual title ──
    lines.push("═".repeat(60));
    const esRoleLabel = template?.esLabel;
    if (esRoleLabel && esRoleLabel.toLowerCase() !== jobTitle.toLowerCase()) {
      lines.push(`${jobTitle.toUpperCase()} / ${esRoleLabel.toUpperCase()}`);
    } else {
      lines.push(jobTitle.toUpperCase());
    }
    lines.push(`${orgName}`);
    if (city && region) lines.push(`📍 ${city}, ${region}`);
    else if (region) lines.push(`📍 ${region}`);
    if (employmentType) {
      const empType = EMPLOYMENT_TYPES.find((e) => e.value === employmentType);
      if (empType) lines.push(`🕐 ${empType.en} / ${empType.es}`);
    }
    if (minNum && maxNum) {
      lines.push(`💰 ${formatSalary(minNum)} – ${formatSalary(maxNum)}`);
    }
    lines.push("═".repeat(60));
    lines.push("");

    // ── SUMMARY: EN paragraph, then ES paragraph ──
    if (summary) {
      lines.push(summary);
      lines.push("");
      if (template?.esSummaryTemplate) {
        lines.push(template.esSummaryTemplate);
        lines.push("");
      }
    }

    // ── ABOUT US: Keep as-is (org writes in their preferred language) ──
    if (orgNotes) {
      lines.push(`── About Us / Sobre Nosotros ${"─".repeat(25)}`);
      lines.push(orgNotes);
      lines.push("");
    }

    // ── RESPONSIBILITIES: Interwoven — EN bullet with ES indented below ──
    const enResps = responsibilities.filter(Boolean);
    const esResps = template?.esResponsibilities ?? [];
    if (enResps.length > 0) {
      lines.push(`── Responsibilities / Responsabilidades ${"─".repeat(14)}`);
      enResps.forEach((r, i) => {
        lines.push(`• ${r}`);
        if (esResps[i]) lines.push(`  ${esResps[i]}`);
      });
      lines.push("");
    }

    // ── QUALIFICATIONS: Interwoven — EN bullet with ES indented below ──
    const enQuals = qualifications.filter(Boolean);
    const esQuals = template?.esQualifications ?? [];
    if (enQuals.length > 0) {
      lines.push(`── Qualifications / Requisitos ${"─".repeat(22)}`);
      enQuals.forEach((q, i) => {
        lines.push(`• ${q}`);
        if (esQuals[i]) lines.push(`  ${esQuals[i]}`);
      });
      lines.push("");
    }

    // ── PREFERRED SKILLS: EN / ES on same line ──
    const enPrefs = preferredSkills.filter(Boolean);
    const esPrefs = template?.esPreferredSkills ?? [];
    if (enPrefs.length > 0) {
      lines.push(`── Preferred / Preferido ${"─".repeat(28)}`);
      enPrefs.forEach((p, i) => {
        if (esPrefs[i]) {
          lines.push(`• ${p} / ${esPrefs[i]}`);
        } else {
          lines.push(`• ${p}`);
        }
      });
      lines.push("");
    }

    // ── BENEFITS: Bilingual on each line ──
    if (selectedBenefits.length > 0 || additionalBenefits) {
      lines.push(`── Benefits / Beneficios ${"─".repeat(28)}`);
      selectedBenefits.forEach((id) => {
        const benefit = STANDARD_BENEFITS.find((b) => b.id === id);
        if (benefit) lines.push(`✓ ${benefit.text} / ${benefit.esText}`);
      });
      if (additionalBenefits) lines.push(`✓ ${additionalBenefits}`);
      lines.push("");
    }

    // ── SCREENING QUESTIONS: EN only (internal hiring process) ──
    if (screeningQuestions.filter(Boolean).length > 0) {
      lines.push(`── Screening Questions ${"─".repeat(30)}`);
      screeningQuestions.filter(Boolean).forEach((q, i) => lines.push(`${i + 1}. ${q}`));
      lines.push("");
    }

    // ── HOW TO APPLY: Fully bilingual ──
    lines.push(`── How to Apply / Cómo Aplicar ${"─".repeat(22)}`);
    lines.push(`${tEn.outputApplyText} ${contactEmail}`);
    lines.push(`${tEs.outputApplyText} ${contactEmail}`);
    lines.push("");

    // ── EQUAL OPPORTUNITY: Fully bilingual ──
    lines.push(`── Equal Opportunity / Igualdad de Oportunidades ${"─".repeat(4)}`);
    lines.push(tEn.outputEqualOppText);
    lines.push("");
    lines.push(tEs.outputEqualOppText);

    return lines.join("\n");
  }

  function getFullOutput(): string {
    if (outputLang === "bilingual") {
      return generateBilingualPosting();
    }
    return generatePosting(outputLang);
  }

  /* ---------------------------------------------------------------- */
  /*  Copy & Download                                                  */
  /* ---------------------------------------------------------------- */

  function handleCopy() {
    navigator.clipboard.writeText(getFullOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadText() {
    const blob = new Blob([getFullOutput()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `job-posting-${selectedRole}-${orgName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------------------------------------------------------------- */
  /*  Submit / Save                                                    */
  /* ---------------------------------------------------------------- */

  async function handleSave() {
    setSubmitting(true);
    try {
      // Save the posting data for our collection
      await fetch("/api/job-postings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: selectedRole,
          jobTitle,
          employmentType,
          summary,
          responsibilities: responsibilities.filter(Boolean),
          qualifications: qualifications.filter(Boolean),
          preferredSkills: preferredSkills.filter(Boolean),
          orgName: orgName.trim(),
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim().toLowerCase(),
          contactPhone: contactPhone.trim() || undefined,
          region: region || undefined,
          city: city.trim() || undefined,
          ehrSystem: ehrSystem || undefined,
          activePrograms,
          orgNotes: orgNotes.trim() || undefined,
          salaryMin: minNum || undefined,
          salaryMax: maxNum || undefined,
          selectedBenefits,
          additionalBenefits: additionalBenefits.trim() || undefined,
          screeningQuestions,
          postOnSite,
          locale,
        }),
      });
      // Even if the API fails, show success — the posting is still generated
      setSuccess(true);
    } catch {
      // Still show success — they got their posting
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  /* ================================================================ */
  /*  SUCCESS STATE                                                    */
  /* ================================================================ */

  if (success) {
    return (
      <div className="bg-stone-50">
        <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-14 text-center text-white sm:py-20">
          <div className="mx-auto max-w-2xl px-4">
            <CheckCircle2 className="mx-auto size-16 text-amber-400" />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.successTitle}
            </h1>
            <p className="mt-4 text-lg text-stone-300">
              {t.successSubtitle}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 py-14">
          <div className="space-y-6">
            {[
              { label: t.successStep1, desc: t.successStep1Desc, icon: FileText },
              { label: t.successStep2, desc: t.successStep2Desc, icon: TrendingUp },
              { label: t.successStep3, desc: t.successStep3Desc, icon: Users },
            ].map((s, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                  <s.icon className="size-5 text-teal-700" />
                </div>
                <div>
                  <p className="font-bold text-stone-900">{s.label}</p>
                  <p className="mt-1 text-sm text-stone-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 border-teal-700 text-teal-700 hover:bg-teal-50"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t.copied : t.copyToClipboard}
            </Button>
            <Button
              onClick={handleDownloadText}
              className="flex-1 bg-teal-700 text-white hover:bg-teal-800"
            >
              <Download className="size-4" />
              {t.downloadPosting}
            </Button>
          </div>

          {/* While you're here */}
          <div className="mt-10 rounded-xl border border-teal-200 bg-teal-50 p-6">
            <h3 className="mb-4 font-bold text-stone-900">{t.whileYoureHere}</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hire"
                className="flex items-center justify-center gap-2 rounded-lg bg-stone-800 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-900 transition-colors"
              >
                {t.browseCandidates} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/directory"
                className="flex items-center justify-center gap-2 rounded-lg border border-teal-700 px-5 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition-colors"
              >
                {t.viewDirectory}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  MAIN FORM                                                        */
  /* ================================================================ */

  const stepTitles = [t.step1Title, t.step2Title, t.step3Title, t.step4Title, t.step5Title];

  return (
    <div className="bg-stone-50">
      {/* ---------- Hero ---------- */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-semibold text-amber-300">
            <Briefcase className="size-4" />
            {locale === "es" ? "PARA EMPLEADORES" : "FOR EMPLOYERS"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            {t.heroSubtitle}
          </p>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
            {[t.badge1, t.badge2, t.badge3].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur"
              >
                <CheckCircle2 className="size-4 text-amber-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Progress bar ---------- */}
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-stone-900">{stepTitles[step - 1]}</span>
          <span className="text-stone-500">
            {t.stepOf.replace("{current}", String(step)).replace("{total}", String(TOTAL_STEPS))}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-stone-200">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* ---------- Form ---------- */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow sm:p-10">
          {/* ================================================ */}
          {/* STEP 1: Select Role & Customize Content           */}
          {/* ================================================ */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">{t.selectRoleType}</Label>
                <Select value={selectedRole} onValueChange={handleRoleSelect}>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder={t.selectRolePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_POSTING_TEMPLATES.map((tmpl) => (
                      <SelectItem key={tmpl.roleId} value={tmpl.roleId}>
                        {locale === "es" ? tmpl.esLabel : tmpl.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                {selectedRole && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-teal-700">
                    <CheckCircle2 className="size-4" />
                    {t.roleSelected}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="jobTitle">{t.jobTitle} <span className="text-red-500">*</span></Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder={t.jobTitlePlaceholder}
                    className="mt-1.5"
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                </div>
                <div>
                  <Label>{t.employmentType}</Label>
                  <Select value={employmentType} onValueChange={setEmploymentType}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder={t.selectEmploymentType} />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_TYPES.map((et) => (
                        <SelectItem key={et.value} value={et.value}>
                          {locale === "es" ? et.es : et.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="summary">{t.positionSummary}</Label>
                <Textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder={t.summaryPlaceholder}
                  rows={4}
                  className="mt-1.5"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <Label>{t.responsibilities}</Label>
                <div className="mt-2 space-y-2">
                  {responsibilities.map((r, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={r}
                        onChange={(e) => updateListItem(responsibilities, setResponsibilities, i, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeListItem(responsibilities, setResponsibilities, i)}
                        className="shrink-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addListItem(responsibilities, setResponsibilities)}
                  className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {t.addResponsibility}
                </button>
              </div>

              {/* Qualifications */}
              <div>
                <Label>{t.qualifications}</Label>
                <div className="mt-2 space-y-2">
                  {qualifications.map((q, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={q}
                        onChange={(e) => updateListItem(qualifications, setQualifications, i, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeListItem(qualifications, setQualifications, i)}
                        className="shrink-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addListItem(qualifications, setQualifications)}
                  className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {t.addQualification}
                </button>
              </div>

              {/* Preferred Skills */}
              <div>
                <Label>{t.preferredSkills}</Label>
                <div className="mt-2 space-y-2">
                  {preferredSkills.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={p}
                        onChange={(e) => updateListItem(preferredSkills, setPreferredSkills, i, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeListItem(preferredSkills, setPreferredSkills, i)}
                        className="shrink-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addListItem(preferredSkills, setPreferredSkills)}
                  className="mt-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  {t.addPreferredSkill}
                </button>
              </div>
            </div>
          )}

          {/* ================================================ */}
          {/* STEP 2: Organization Details                      */}
          {/* ================================================ */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="orgName">{t.orgName} <span className="text-red-500">*</span></Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={t.orgNamePlaceholder}
                    className="mt-1.5"
                    aria-invalid={!!errors.orgName}
                  />
                  {errors.orgName && <p className="mt-1 text-xs text-red-600">{errors.orgName}</p>}
                </div>
                <div>
                  <Label htmlFor="contactName">{t.contactName}</Label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={t.contactNamePlaceholder}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contactEmail">{t.contactEmail} <span className="text-red-500">*</span></Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder={t.contactEmailPlaceholder}
                    className="mt-1.5"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="contactPhone">{t.contactPhone}</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder={t.contactPhonePlaceholder}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>{t.region}</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder={t.selectRegion} />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">{t.city}</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.cityPlaceholder}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>{t.ehrSystem}</Label>
                  <Select value={ehrSystem} onValueChange={setEhrSystem}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder={t.selectEhr} />
                    </SelectTrigger>
                    <SelectContent>
                      {EHR_SYSTEMS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.programs}</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PROGRAMS.map((p) => (
                      <label
                        key={p}
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-teal-300 hover:bg-teal-50 has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900"
                      >
                        <input
                          type="checkbox"
                          checked={activePrograms.includes(p)}
                          onChange={() => toggleCheckbox(p, activePrograms, setActivePrograms)}
                          className="size-3.5 rounded border-stone-300 text-teal-700 accent-teal-700"
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="orgNotes">
                  {t.orgNotes}{" "}
                  <span className="font-normal text-stone-400">({t.optional})</span>
                </Label>
                <Textarea
                  id="orgNotes"
                  value={orgNotes}
                  onChange={(e) => setOrgNotes(e.target.value)}
                  placeholder={t.orgNotesPlaceholder}
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </div>
          )}

          {/* ================================================ */}
          {/* STEP 3: Compensation & Benefits                   */}
          {/* ================================================ */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Salary */}
              <div>
                <Label className="text-base font-semibold">{t.salaryRange}</Label>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="salaryMin" className="text-sm font-normal">{t.salaryMin}</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="45000"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax" className="text-sm font-normal">{t.salaryMax}</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="65000"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Benchmark */}
              {benchmark && (
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
                  <h4 className="flex items-center gap-2 font-semibold text-stone-900">
                    <TrendingUp className="size-5 text-teal-700" />
                    {t.salaryBenchmark}: {locale === "es" ? benchmark.esLabel : benchmark.label}
                  </h4>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-stone-500">{t.benchmarkP25}</p>
                      <p className="mt-1 text-lg font-bold text-stone-700">{formatSalary(benchmark.p25)}</p>
                    </div>
                    <div className="rounded-lg bg-teal-50 p-3 shadow-sm ring-1 ring-teal-200">
                      <p className="text-xs text-teal-700">{t.benchmarkP50}</p>
                      <p className="mt-1 text-lg font-bold text-teal-800">{formatSalary(benchmark.p50)}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-xs text-stone-500">{t.benchmarkP75}</p>
                      <p className="mt-1 text-lg font-bold text-stone-700">{formatSalary(benchmark.p75)}</p>
                    </div>
                  </div>

                  {/* Competitiveness indicator */}
                  {competitiveness && midpoint > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-600">{t.yourOffer}: {formatSalary(minNum)} – {formatSalary(maxNum)}</span>
                        <span className={`font-semibold ${
                          competitiveness.level === "below" ? "text-red-600" :
                          competitiveness.level === "competitive" ? "text-amber-600" :
                          competitiveness.level === "strong" ? "text-teal-700" :
                          "text-emerald-600"
                        }`}>
                          {locale === "es" ? competitiveness.esPercentile : competitiveness.percentile}
                        </span>
                      </div>
                      <div className="mt-2 rounded-lg border p-3 text-sm">
                        {competitiveness.level === "below" && (
                          <div className="flex items-start gap-2 text-red-700">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                            <div>
                              <p className="font-semibold">{t.belowMarket}</p>
                              <p className="mt-1 text-red-600">
                                {t.recommendation} <strong>{formatSalary(benchmark.p25)}</strong>.
                              </p>
                            </div>
                          </div>
                        )}
                        {competitiveness.level === "competitive" && (
                          <div className="flex items-start gap-2 text-amber-700">
                            <DollarSign className="mt-0.5 size-4 shrink-0" />
                            <p>{t.competitive}</p>
                          </div>
                        )}
                        {competitiveness.level === "strong" && (
                          <div className="flex items-start gap-2 text-teal-700">
                            <Star className="mt-0.5 size-4 shrink-0" />
                            <p>{t.strong}</p>
                          </div>
                        )}
                        {competitiveness.level === "premium" && (
                          <div className="flex items-start gap-2 text-emerald-700">
                            <TrendingUp className="mt-0.5 size-4 shrink-0" />
                            <p>{t.premium}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits */}
              <div>
                <Label className="text-base font-semibold">{t.benefits}</Label>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {STANDARD_BENEFITS.map((benefit) => (
                    <label
                      key={benefit.id}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-teal-300 hover:bg-teal-50 has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBenefits.includes(benefit.id)}
                        onChange={() => toggleCheckbox(benefit.id, selectedBenefits, setSelectedBenefits)}
                        className="size-4 rounded border-stone-300 text-teal-700 accent-teal-700"
                      />
                      {locale === "es" ? benefit.esText : benefit.text}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalBenefits">
                  {t.additionalBenefits}{" "}
                  <span className="font-normal text-stone-400">({t.optional})</span>
                </Label>
                <Input
                  id="additionalBenefits"
                  value={additionalBenefits}
                  onChange={(e) => setAdditionalBenefits(e.target.value)}
                  placeholder={t.additionalBenefitsPlaceholder}
                  className="mt-1.5"
                />
              </div>
            </div>
          )}

          {/* ================================================ */}
          {/* STEP 4: Screening Questions                       */}
          {/* ================================================ */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-stone-900">{t.screeningTitle}</h3>
                <p className="mt-1 text-sm text-stone-600">{t.screeningSubtitle}</p>
              </div>

              {/* Category-based questions */}
              {Object.entries(SCREENING_CATEGORIES).map(([key, cat]) => (
                <div key={key} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                  <h4 className="flex items-center gap-2 font-semibold text-stone-900">
                    <ClipboardList className="size-4 text-teal-700" />
                    {locale === "es" ? cat.esLabel : cat.label}
                  </h4>
                  <div className="mt-3 space-y-2">
                    {cat.questions.map((q, i) => {
                      const qText = locale === "es" ? q.esText : q.text;
                      const isSelected = screeningQuestions.includes(q.text) || screeningQuestions.includes(q.esText);
                      return (
                        <label
                          key={i}
                          className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-teal-300 hover:bg-teal-50 has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              const textToUse = q.text; // Always store English version
                              if (isSelected) {
                                setScreeningQuestions(screeningQuestions.filter((sq) => sq !== q.text && sq !== q.esText));
                              } else {
                                setScreeningQuestions([...screeningQuestions, textToUse]);
                              }
                            }}
                            className="mt-0.5 size-4 rounded border-stone-300 text-teal-700 accent-teal-700"
                          />
                          {qText}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Template screening questions */}
              {selectedRole && (() => {
                const template = JOB_POSTING_TEMPLATES.find((t) => t.roleId === selectedRole);
                if (!template) return null;
                return (
                  <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
                    <h4 className="flex items-center gap-2 font-semibold text-stone-900">
                      <FileText className="size-4 text-teal-700" />
                      {locale === "es" ? `Preguntas para: ${template.esLabel}` : `Questions for: ${template.label}`}
                    </h4>
                    <div className="mt-3 space-y-2">
                      {template.screeningQuestions.map((q, i) => {
                        const isSelected = screeningQuestions.includes(q);
                        const esQ = template.esScreeningQuestions[i];
                        return (
                          <label
                            key={i}
                            className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-teal-200 bg-white px-3 py-2.5 text-sm text-stone-700 transition-colors hover:border-teal-400 hover:bg-teal-50 has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if (isSelected) {
                                  setScreeningQuestions(screeningQuestions.filter((sq) => sq !== q));
                                } else {
                                  setScreeningQuestions([...screeningQuestions, q]);
                                }
                              }}
                              className="mt-0.5 size-4 rounded border-stone-300 text-teal-700 accent-teal-700"
                            />
                            {locale === "es" ? esQ : q}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Custom question */}
              <div className="flex gap-2">
                <Input
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder={t.customQuestionPlaceholder}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addScreeningQuestion(customQuestion);
                      setCustomQuestion("");
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    addScreeningQuestion(customQuestion);
                    setCustomQuestion("");
                  }}
                  className="border-teal-700 text-teal-700 hover:bg-teal-50"
                >
                  {t.addQuestion}
                </Button>
              </div>

              {/* Selected questions summary */}
              <div>
                <h4 className="font-semibold text-stone-900">{t.selectedQuestions} ({screeningQuestions.length})</h4>
                {screeningQuestions.length === 0 ? (
                  <p className="mt-2 text-sm text-stone-500">{t.noQuestionsSelected}</p>
                ) : (
                  <div className="mt-2 space-y-2">
                    {screeningQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                          {i + 1}
                        </span>
                        <span className="flex-1 text-stone-700">{q}</span>
                        <button
                          type="button"
                          onClick={() => setScreeningQuestions(screeningQuestions.filter((_, idx) => idx !== i))}
                          className="shrink-0 text-red-400 hover:text-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================ */}
          {/* STEP 5: Review & Download                         */}
          {/* ================================================ */}
          {step === 5 && (
            <div className="space-y-6">
              {/* Output Language Selector */}
              <div>
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Globe className="size-5 text-teal-700" />
                  {t.outputLanguage}
                </Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { value: "en" as const, label: t.englishOnly },
                    { value: "es" as const, label: t.spanishOnly },
                    { value: "bilingual" as const, label: t.bilingual },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                        outputLang === opt.value
                          ? "border-teal-500 bg-teal-50 text-teal-900"
                          : "border-stone-200 bg-stone-50 text-stone-700 hover:border-teal-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="outputLang"
                        value={opt.value}
                        checked={outputLang === opt.value}
                        onChange={() => setOutputLang(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div
                ref={previewRef}
                className="max-h-[500px] overflow-y-auto rounded-xl border border-stone-200 bg-white p-5 font-mono text-xs leading-relaxed text-stone-800 shadow-inner sm:text-sm"
              >
                <pre className="whitespace-pre-wrap">{getFullOutput()}</pre>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1 border-teal-700 text-teal-700 hover:bg-teal-50"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? t.copied : t.copyToClipboard}
                </Button>
                <Button
                  type="button"
                  onClick={handleDownloadText}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="size-4" />
                  {t.downloadPosting}
                </Button>
              </div>

              {/* Post on site option */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h4 className="font-semibold text-stone-900">{t.postOnSite}</h4>
                <p className="mt-1 text-sm text-stone-600">{t.postOnSiteDesc}</p>
                <div className="mt-3 space-y-2">
                  {[
                    { value: true, label: t.yesPostOnSite },
                    { value: false, label: t.noJustDownload },
                  ].map((opt) => (
                    <label
                      key={String(opt.value)}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700"
                    >
                      <input
                        type="radio"
                        name="postOnSite"
                        checked={postOnSite === opt.value}
                        onChange={() => setPostOnSite(opt.value)}
                        className="size-4 border-stone-300 text-teal-700 accent-teal-700"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- Navigation buttons ---------- */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="size-4" />
                {t.back}
              </Button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-teal-700 text-white hover:bg-teal-800"
              >
                {t.next}
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                className="bg-gradient-to-r from-stone-800 to-amber-700 text-white hover:shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {locale === "es" ? "Guardando..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Building2 className="size-4" />
                    {t.saveAndCollect}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
