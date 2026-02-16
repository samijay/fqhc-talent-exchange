'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import {
  Heart,
  Users,
  Stethoscope,
  Brain,
  Activity,
  User,
  Briefcase,
  Zap,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  DollarSign,
} from 'lucide-react';
import { SALARY_BENCHMARKS, type SalaryBenchmark } from '@/lib/job-posting-templates';
import { ROLE_INSIGHTS } from '@/lib/role-insights';

interface CareerAssessmentProps {
  fqhcName: string;
  fqhcSlug: string;
  fqhcPrograms: string[];
  fqhcEhrSystem: string;
  onClose: () => void;
}

interface FormData {
  roleInterest: string;
  experience: string;
  ehrSystems: string[];
  programs: string[];
  bilingual: string;
  name?: string;
  email?: string;
}

const ROLE_OPTIONS = [
  { id: 'chw', label: 'Community Health Worker', esLabel: 'Promotor/a de Salud', icon: Heart },
  { id: 'care_coordinator', label: 'Care Coordinator', esLabel: 'Coordinador/a de Atención', icon: Users },
  { id: 'medical_assistant', label: 'Medical Assistant', esLabel: 'Asistente Médico/a', icon: Stethoscope },
  { id: 'case_manager', label: 'Case Manager', esLabel: 'Gestor/a de Casos', icon: Briefcase },
  { id: 'behavioral_health', label: 'Behavioral Health', esLabel: 'Salud Conductual', icon: Brain },
  { id: 'registered_nurse', label: 'Registered Nurse (RN)', esLabel: 'Enfermera/o Registrada/o (RN)', icon: Activity },
  { id: 'patient_services', label: 'Patient Services', esLabel: 'Servicios al Paciente', icon: User },
  { id: 'revenue_cycle', label: 'Revenue Cycle / Billing', esLabel: 'Ciclo de Ingresos / Facturación', icon: Zap },
];

const EHR_OPTIONS = [
  'OCHIN Epic',
  'NextGen',
  'eClinicalWorks',
  'Cerner',
  'athenahealth',
  'None yet',
];

const EHR_OPTIONS_ES: Record<string, string> = {
  'None yet': 'Ninguno todavía',
};

const PROGRAM_OPTIONS = [
  { id: 'ecm', label: 'Enhanced Care Management (ECM)', esLabel: 'Gestión de Atención Mejorada (ECM)' },
  { id: 'ccm', label: 'Chronic Care Management (CCM)', esLabel: 'Gestión de Atención Crónica (CCM)' },
  { id: 'community_supports', label: 'Community Supports', esLabel: 'Apoyos Comunitarios' },
  { id: 'tcm', label: 'Transitional Care Management (TCM)', esLabel: 'Gestión de Atención Transicional (TCM)' },
  { id: 'bh_integration', label: 'BH Integration', esLabel: 'Integración de Salud Conductual' },
  { id: 'none', label: 'None yet', esLabel: 'Ninguno todavía' },
];

export default function CareerAssessment({
  fqhcName,
  fqhcSlug,
  fqhcPrograms,
  fqhcEhrSystem,
  onClose,
}: CareerAssessmentProps) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    roleInterest: '',
    experience: '',
    ehrSystems: [],
    programs: [],
    bilingual: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [emailError, setEmailError] = useState('');

  // --- i18n text helpers ---
  const t = {
    careerScreener: isEs ? 'Evaluación de Carrera' : 'Career Screener',
    stepOf: (n: number) => isEs ? `Paso ${n} de 5` : `Step ${n} of 5`,
    complete: (pct: number) => isEs ? `${pct}% completado` : `${pct}% complete`,
    close: isEs ? 'Cerrar' : 'Close',
    next: isEs ? 'Siguiente' : 'Next',
    back: isEs ? 'Atrás' : 'Back',
    // Step 1
    roleQuestion: isEs ? '¿Qué tipo de puesto le interesa?' : 'What type of role interests you?',
    // Step 2
    experienceQuestion: isEs ? '¿Cuánta experiencia en salud tiene?' : 'How much healthcare experience do you have?',
    experienceOptions: isEs
      ? ['Nuevo/a en salud', 'Menos de 1 año', '1–3 años', '3–5 años', '5+ años']
      : ['New to healthcare', 'Less than 1 year', '1–3 years', '3–5 years', '5+ years'],
    // Step 3
    ehrQuestion: isEs ? '¿Qué sistemas EHR ha utilizado?' : 'Which EHR systems have you used?',
    thisOrgUses: isEs ? 'Esta org. usa' : 'This org uses',
    ehrHelpText: isEs
      ? 'No se preocupe si aún no ha usado su sistema específico — ¡podemos ayudarlo a ponerse al día!'
      : "Don't worry if you haven't used their specific system yet—we can help you get up to speed!",
    // Step 4
    programQuestion: isEs ? '¿Con qué programas ha trabajado?' : 'Which programs have you worked with?',
    thisOrgRuns: isEs ? 'Esta org. opera' : 'This org runs',
    programHelpText: isEs
      ? 'Seleccione los programas que ha gestionado o coordinado. ¿Sin experiencia? No hay problema — lo consideraremos para roles donde pueda aprender en el trabajo.'
      : "Select the programs you've managed or coordinated. No experience? That's fine—we'll consider you for roles where you can learn on the job.",
    // Step 5
    bilingualQuestion: isEs ? '¿Es bilingüe?' : 'Are you bilingual?',
    bilingualOptions: isEs
      ? ['Español e inglés', 'Otro bilingüe', 'Solo inglés']
      : ['Spanish & English', 'Other bilingual', 'English only'],
    bilingualHelpText: isEs
      ? 'Muchos FQHCs sirven a comunidades diversas y valoran al personal multilingüe. Esto nos ayuda a conectarlo con el puesto adecuado.'
      : 'Many FQHCs serve diverse communities and value multilingual staff. This helps us match you with the right role.',
    seeResults: isEs ? 'Ver Sus Resultados' : 'See Your Results',
    // Step 6 — Results
    yourCareerMatch: isEs ? 'Su Coincidencia de Carrera' : 'Your Career Match',
    matchScore: isEs ? 'Puntuación de Coincidencia' : 'Match Score',
    matchScoreDesc: isEs
      ? 'Basado en su experiencia, familiaridad con EHR e idiomas'
      : 'Based on your experience, EHR familiarity, and language skills',
    strongMatch: isEs ? 'Buena coincidencia' : 'Strong match',
    suggestedRoles: isEs ? 'Roles Sugeridos' : 'Suggested Roles',
    roleFitDesc: isEs
      ? 'Una buena opción basada en su experiencia e intereses'
      : 'A great fit based on your background and interests',
    joinWaitlist: isEs ? 'Únase a la Lista de Espera' : 'Join the Waitlist & Get Matched',
    fullName: isEs ? 'Nombre Completo *' : 'Full Name *',
    emailAddress: isEs ? 'Correo Electrónico *' : 'Email Address *',
    submitting: isEs ? 'Enviando...' : 'Submitting...',
    joinWaitlistBtn: isEs ? 'Unirse a la Lista' : 'Join Waitlist',
    waitlistDisclaimer: isEs
      ? `Usaremos su información para conectarlo con oportunidades y notificarle sobre nuevos roles en ${fqhcName}. Sus datos están seguros y nunca se comparten.`
      : `We'll use your information to match you with opportunities and notify you of new roles at ${fqhcName}. Your data is secure and never shared.`,
    // Success
    youreOnWaitlist: isEs ? '¡Está en la lista de espera!' : "You're on the waitlist!",
    successMessage: isEs
      ? `Gracias por completar la evaluación de carrera. Lo hemos agregado a la lista de espera de ${fqhcName} y hemos vinculado su perfil con sus oportunidades. ¡Pronto tendrá noticias nuestras!`
      : `Thanks for completing the career screener. We've added you to ${fqhcName}'s waitlist and matched your profile to their opportunities. You'll hear from us soon!`,
    checkEmail: isEs ? 'Revise su correo electrónico para los próximos pasos.' : 'Check your email for next steps.',
    // Validation
    enterName: isEs ? 'Por favor ingrese su nombre' : 'Please enter your name',
    enterEmail: isEs ? 'Por favor ingrese su correo electrónico' : 'Please enter your email',
    validEmail: isEs ? 'Por favor ingrese un correo electrónico válido' : 'Please enter a valid email address',
  };

  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, roleInterest: roleId });
  };

  const handleExperienceSelect = (exp: string) => {
    setFormData({ ...formData, experience: exp });
  };

  const handleEhrToggle = (ehr: string) => {
    setFormData((prev) => ({
      ...prev,
      ehrSystems: prev.ehrSystems.includes(ehr)
        ? prev.ehrSystems.filter((e) => e !== ehr)
        : [...prev.ehrSystems, ehr],
    }));
  };

  const handleProgramToggle = (programId: string) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.includes(programId)
        ? prev.programs.filter((p) => p !== programId)
        : [...prev.programs, programId],
    }));
  };

  const handleBilingualSelect = (option: string) => {
    setFormData({ ...formData, bilingual: option });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      setStep(6); // Results screen
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateMatchScore = (): number => {
    let score = 0;
    let maxScore = 0;

    // EHR match (max 30 points)
    maxScore += 30;
    if (formData.ehrSystems.length > 0) {
      const hasOrgEhr = formData.ehrSystems.includes(fqhcEhrSystem);
      score += hasOrgEhr ? 30 : 15;
    }

    // Program match (max 40 points)
    maxScore += 40;
    if (formData.programs.length > 0) {
      const orgPrograms = fqhcPrograms.map((p) => p.toLowerCase());
      const matchedPrograms = formData.programs.filter((p) => {
        const programLabel = PROGRAM_OPTIONS.find((po) => po.id === p)?.label.toLowerCase() || '';
        return orgPrograms.some((op) => programLabel.includes(op));
      }).length;
      score += (matchedPrograms / formData.programs.length) * 40;
    }

    // Bilingual bonus (max 20 points)
    maxScore += 20;
    const enOnlyOptions = ['English only', 'Solo inglés'];
    if (!enOnlyOptions.includes(formData.bilingual)) {
      score += 20;
    }

    // Experience bonus (max 10 points)
    maxScore += 10;
    const newOptions = ['New to healthcare', 'Nuevo/a en salud'];
    if (formData.experience && !newOptions.includes(formData.experience)) {
      score += 10;
    }

    return Math.round((score / maxScore) * 100);
  };

  const getSuggestedRoles = (): typeof ROLE_OPTIONS => {
    const roleId = formData.roleInterest;
    const selected = ROLE_OPTIONS.find((r) => r.id === roleId);

    if (!selected) return ROLE_OPTIONS.slice(0, 3);

    return [selected, ...ROLE_OPTIONS.filter((r) => r.id !== roleId).slice(0, 2)];
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return !!formData.roleInterest;
      case 2:
        return !!formData.experience;
      case 3:
        return true; // Optional step
      case 4:
        return true; // Optional step
      case 5:
        return !!formData.bilingual;
      default:
        return false;
    }
  };

  const handleSubmitWaitlist = async (name: string, email: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/candidate-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          fqhcSlug,
          fqhcName,
          roleInterest: formData.roleInterest,
          experience: formData.experience,
          ehrSystems: formData.ehrSystems,
          programs: formData.programs,
          bilingual: formData.bilingual,
          matchScore: calculateMatchScore(),
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Failed to submit waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Role Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-950">{t.careerScreener}</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">{t.stepOf(1)}</span>
              <span className="text-sm text-stone-600">{t.complete(20)}</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-1/5 bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              {t.roleQuestion}
            </h2>

            {/* Role Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ROLE_OPTIONS.map((role) => {
                const Icon = role.icon;
                const isSelected = formData.roleInterest === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50 shadow-lg'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        isSelected ? 'text-teal-700' : 'text-stone-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium text-center ${
                        isSelected ? 'text-teal-950' : 'text-stone-700'
                      }`}
                    >
                      {isEs ? role.esLabel : role.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              {t.close}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {t.next} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Experience Level
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-950">{t.careerScreener}</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">{t.stepOf(2)}</span>
              <span className="text-sm text-stone-600">{t.complete(40)}</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              {t.experienceQuestion}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {t.experienceOptions.map((option) => {
                const isSelected = formData.experience === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleExperienceSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? 'border-teal-500 bg-teal-500'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? 'text-teal-950' : 'text-stone-700'
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {t.next} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: EHR Systems
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-950">{t.careerScreener}</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">{t.stepOf(3)}</span>
              <span className="text-sm text-stone-600">{t.complete(60)}</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              {t.ehrQuestion}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {EHR_OPTIONS.map((ehr) => {
                const isSelected = formData.ehrSystems.includes(ehr);
                const isOrgEhr = ehr === fqhcEhrSystem;
                const displayLabel = isEs ? (EHR_OPTIONS_ES[ehr] || ehr) : ehr;

                return (
                  <button
                    key={ehr}
                    onClick={() => handleEhrToggle(ehr)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-amber-900' : 'text-stone-700'
                          }`}
                        >
                          {displayLabel}
                        </span>
                      </div>
                      {isOrgEhr && (
                        <span className="inline-block px-3 py-1 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full">
                          {t.thisOrgUses}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-stone-600">
              {t.ehrHelpText}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              {t.next} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Programs
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-950">{t.careerScreener}</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">{t.stepOf(4)}</span>
              <span className="text-sm text-stone-600">{t.complete(80)}</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              {t.programQuestion}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {PROGRAM_OPTIONS.map((program) => {
                const isSelected = formData.programs.includes(program.id);
                const isOrgProgram = fqhcPrograms.some(
                  (p) =>
                    p.toLowerCase() === program.id.replace(/_/g, '').toLowerCase() ||
                    program.label.toLowerCase().includes(p.toLowerCase())
                );

                return (
                  <button
                    key={program.id}
                    onClick={() => handleProgramToggle(program.id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-amber-900' : 'text-stone-700'
                          }`}
                        >
                          {isEs ? program.esLabel : program.label}
                        </span>
                      </div>
                      {isOrgProgram && (
                        <span className="inline-block px-3 py-1 bg-teal-200 text-teal-900 text-xs font-semibold rounded-full">
                          {t.thisOrgRuns}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-stone-600">
              {t.programHelpText}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              {t.next} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Bilingual
  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-950">{t.careerScreener}</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">{t.stepOf(5)}</span>
              <span className="text-sm text-stone-600">{t.complete(100)}</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-teal-500 to-amber-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">{t.bilingualQuestion}</h2>

            {/* Options */}
            <div className="space-y-3">
              {t.bilingualOptions.map((option) => {
                const isSelected = formData.bilingual === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleBilingualSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? 'border-teal-500 bg-teal-500'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? 'text-teal-950' : 'text-stone-700'
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-stone-600">
              {t.bilingualHelpText}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {t.seeResults} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleWaitlistSubmit = () => {
    setEmailError('');

    if (!waitlistName.trim()) {
      setEmailError(t.enterName);
      return;
    }

    if (!waitlistEmail.trim()) {
      setEmailError(t.enterEmail);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(waitlistEmail)) {
      setEmailError(t.validEmail);
      return;
    }

    handleSubmitWaitlist(waitlistName, waitlistEmail);
  };

  // Map CareerAssessment roleIds to salary benchmark roleIds
  const ROLE_TO_BENCHMARK: Record<string, string> = {
    chw: 'chw',
    care_coordinator: 'care_coordinator',
    medical_assistant: 'medical_assistant',
    case_manager: 'case_manager',
    behavioral_health: 'behavioral_health',
    registered_nurse: 'nurse_rn',
    patient_services: 'patient_services',
    revenue_cycle: 'revenue_cycle',
  };

  function getSalaryForRole(roleId: string): SalaryBenchmark | undefined {
    const benchmarkId = ROLE_TO_BENCHMARK[roleId];
    return benchmarkId ? SALARY_BENCHMARKS.find((b) => b.roleId === benchmarkId) : undefined;
  }

  // Step 6: Results Screen
  if (step === 6) {
    const matchScore = calculateMatchScore();
    const suggestedRoles = getSuggestedRoles();
    const selectedSalary = getSalaryForRole(formData.roleInterest);

    if (submitSuccess) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
          <div className="mx-auto max-w-4xl">
            {/* Success Message */}
            <div className="text-center py-16">
              <div className="mx-auto mb-6">
                <CheckCircle className="w-20 h-20 text-amber-500 mx-auto" />
              </div>

              <h1 className="text-4xl font-bold text-amber-900 mb-4">{t.youreOnWaitlist}</h1>

              <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
                {t.successMessage}
              </p>

              <p className="text-stone-500 mb-8">{t.checkEmail}</p>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-teal-950 mb-2">{t.yourCareerMatch}</h1>
            <p className="text-lg text-stone-600">{fqhcName}</p>
          </div>

          {/* Match Score */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-lg mb-2">{t.matchScore}</p>
                <p className="text-stone-500 text-sm">
                  {t.matchScoreDesc}
                </p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-amber-600">{matchScore}%</div>
                <p className="text-stone-600 mt-2">{t.strongMatch}</p>
              </div>
            </div>
          </div>

          {/* Suggested Roles */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">{t.suggestedRoles}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedRoles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.id}
                    className="p-6 bg-white rounded-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all duration-200"
                  >
                    <Icon className="w-10 h-10 text-teal-700 mb-4" />
                    <h3 className="text-lg font-semibold text-stone-900">
                      {isEs ? role.esLabel : role.label}
                    </h3>
                    <p className="text-stone-600 text-sm mt-2">
                      {t.roleFitDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Salary Benchmark Card */}
          {selectedSalary && (
            <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-stone-900">
                  {isEs ? 'Rango Salarial en California' : 'California Salary Range'}
                </h2>
              </div>
              <p className="text-sm text-stone-600 mb-4">
                {isEs
                  ? `Salarios típicos para ${selectedSalary.esLabel} en FQHCs de California`
                  : `Typical salaries for ${selectedSalary.label} at California FQHCs`}
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="text-center">
                  <p className="text-xs text-stone-500">{isEs ? '25° percentil' : '25th percentile'}</p>
                  <p className="text-xl font-bold text-stone-700">
                    ${Math.round(selectedSalary.p25 / 1000)}K
                  </p>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative h-3 rounded-full bg-stone-200">
                    <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-teal-300 via-teal-500 to-amber-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-stone-500">{isEs ? '75° percentil' : '75th percentile'}</p>
                  <p className="text-xl font-bold text-stone-700">
                    ${Math.round(selectedSalary.p75 / 1000)}K
                  </p>
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-stone-500">
                {isEs
                  ? `Salario mediano: $${(selectedSalary.p50 / 1000).toFixed(0)}K/año`
                  : `Median salary: $${(selectedSalary.p50 / 1000).toFixed(0)}K/year`}
              </p>
            </div>
          )}

          {/* What Employers Want — role-specific qualification tips */}
          {formData.roleInterest && ROLE_INSIGHTS[formData.roleInterest] && (() => {
            const insight = ROLE_INSIGHTS[formData.roleInterest];
            return (
              <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-stone-400">
                <div className="flex items-center gap-2 mb-5">
                  <Briefcase className="w-6 h-6 text-teal-700" />
                  <h2 className="text-xl font-semibold text-stone-900">
                    {isEs ? 'Lo que buscan los empleadores de FQHCs' : 'What FQHC Hiring Managers Look For'}
                  </h2>
                </div>

                {/* Top Qualifications */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {isEs ? 'Calificaciones principales' : 'Top Qualifications'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isEs ? insight.employerWants.esTopQualifications : insight.employerWants.topQualifications).map((qual, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Skills */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {isEs ? 'Habilidades clave' : 'Key Skills'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isEs ? insight.employerWants.esTopSkills : insight.employerWants.topSkills).map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Valued Certifications */}
                {insight.employerWants.certifications.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                      {isEs ? 'Certificaciones valoradas' : 'Valued Certifications'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(isEs ? insight.employerWants.esCertifications : insight.employerWants.certifications).map((cert, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Waitlist Form */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-500">
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
              {t.joinWaitlist}
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  id="name"
                  type="text"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder={isEs ? 'María García' : 'Jane Doe'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                  {t.emailAddress}
                </label>
                <input
                  id="email"
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder={isEs ? 'maria@ejemplo.com' : 'jane@example.com'}
                />
              </div>

              {emailError && <p className="text-red-600 text-sm font-medium">{emailError}</p>}
            </div>

            <button
              onClick={handleWaitlistSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-700 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? t.submitting : t.joinWaitlistBtn}
            </button>

            <p className="text-xs text-stone-500 mt-4 text-center">
              {t.waitlistDisclaimer}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> {t.back}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
