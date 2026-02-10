'use client';

import { useState } from 'react';
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
} from 'lucide-react';

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
  { id: 'chw', label: 'Community Health Worker', icon: Heart },
  { id: 'care_coordinator', label: 'Care Coordinator', icon: Users },
  { id: 'medical_assistant', label: 'Medical Assistant', icon: Stethoscope },
  { id: 'behavioral_health', label: 'Behavioral Health', icon: Brain },
  { id: 'nursing', label: 'Nursing (RN)', icon: Activity },
  { id: 'provider', label: 'Provider (NP/PA/MD)', icon: User },
  { id: 'case_manager', label: 'Case Manager', icon: Briefcase },
  { id: 'administrative', label: 'Administrative/Other', icon: Zap },
];

const EHR_OPTIONS = [
  'OCHIN Epic',
  'NextGen',
  'eClinicalWorks',
  'Cerner',
  'athenahealth',
  'None yet',
];

const PROGRAM_OPTIONS = [
  { id: 'ecm', label: 'Enhanced Care Management (ECM)' },
  { id: 'ccm', label: 'Chronic Care Management (CCM)' },
  { id: 'community_supports', label: 'Community Supports' },
  { id: 'tcm', label: 'Transitional Care Management (TCM)' },
  { id: 'bh_integration', label: 'BH Integration' },
  { id: 'none', label: 'None yet' },
];

export default function CareerAssessment({
  fqhcName,
  fqhcSlug,
  fqhcPrograms,
  fqhcEhrSystem,
  onClose,
}: CareerAssessmentProps) {
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
    if (formData.bilingual !== 'English only') {
      score += 20;
    }

    // Experience bonus (max 10 points)
    maxScore += 10;
    if (formData.experience && formData.experience !== 'New to healthcare') {
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
            <h1 className="text-3xl font-bold text-violet-900">Career Screener</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">Step 1 of 5</span>
              <span className="text-sm text-stone-600">20% complete</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-1/5 bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              What type of role interests you?
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
                        ? 'border-violet-500 bg-violet-50 shadow-lg'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        isSelected ? 'text-violet-600' : 'text-stone-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium text-center ${
                        isSelected ? 'text-violet-900' : 'text-stone-700'
                      }`}
                    >
                      {role.label}
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
              Close
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Experience Level
  if (step === 2) {
    const experienceOptions = [
      'New to healthcare',
      'Less than 1 year',
      '1–3 years',
      '3–5 years',
      '5+ years',
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-violet-900">Career Screener</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">Step 2 of 5</span>
              <span className="text-sm text-stone-600">40% complete</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              How much healthcare experience do you have?
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {experienceOptions.map((option) => {
                const isSelected = formData.experience === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleExperienceSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? 'border-violet-500 bg-violet-500'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? 'text-violet-900' : 'text-stone-700'
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
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next <ChevronRight className="w-5 h-5" />
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
            <h1 className="text-3xl font-bold text-violet-900">Career Screener</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">Step 3 of 5</span>
              <span className="text-sm text-stone-600">60% complete</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              Which EHR systems have you used?
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {EHR_OPTIONS.map((ehr) => {
                const isSelected = formData.ehrSystems.includes(ehr);
                const isOrgEhr = ehr === fqhcEhrSystem;

                return (
                  <button
                    key={ehr}
                    onClick={() => handleEhrToggle(ehr)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-emerald-900' : 'text-stone-700'
                          }`}
                        >
                          {ehr}
                        </span>
                      </div>
                      {isOrgEhr && (
                        <span className="inline-block px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-semibold rounded-full">
                          This org uses
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-stone-600">
              Don't worry if you haven't used their specific system yet—we can help you get up to
              speed!
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Next <ChevronRight className="w-5 h-5" />
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
            <h1 className="text-3xl font-bold text-violet-900">Career Screener</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">Step 4 of 5</span>
              <span className="text-sm text-stone-600">80% complete</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              Which programs have you worked with?
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
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`font-medium ${
                            isSelected ? 'text-emerald-900' : 'text-stone-700'
                          }`}
                        >
                          {program.label}
                        </span>
                      </div>
                      {isOrgProgram && (
                        <span className="inline-block px-3 py-1 bg-violet-200 text-violet-800 text-xs font-semibold rounded-full">
                          This org runs
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm text-stone-600">
              Select the programs you've managed or coordinated. No experience? That's fine—we'll
              consider you for roles where you can learn on the job.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Bilingual
  if (step === 5) {
    const bilingualOptions = ['Spanish & English', 'Other bilingual', 'English only'];

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-violet-900">Career Screener</h1>
            <p className="mt-2 text-stone-600">{fqhcName}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-700">Step 5 of 5</span>
              <span className="text-sm text-stone-600">100% complete</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-violet-500 to-emerald-500 transition-all duration-500"></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">Are you bilingual?</h2>

            {/* Options */}
            <div className="space-y-3">
              {bilingualOptions.map((option) => {
                const isSelected = formData.bilingual === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleBilingualSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? 'border-violet-500 bg-violet-500'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? 'text-violet-900' : 'text-stone-700'
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
              Many FQHCs serve diverse communities and value multilingual staff. This helps us
              match you with the right role.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              See Your Results <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleWaitlistSubmit = () => {
    setEmailError('');

    if (!waitlistName.trim()) {
      setEmailError('Please enter your name');
      return;
    }

    if (!waitlistEmail.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(waitlistEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    handleSubmitWaitlist(waitlistName, waitlistEmail);
  };

  // Step 6: Results Screen
  if (step === 6) {
    const matchScore = calculateMatchScore();
    const suggestedRoles = getSuggestedRoles();

    if (submitSuccess) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white p-6">
          <div className="mx-auto max-w-4xl">
            {/* Success Message */}
            <div className="text-center py-16">
              <div className="mx-auto mb-6">
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto" />
              </div>

              <h1 className="text-4xl font-bold text-emerald-900 mb-4">You're on the waitlist!</h1>

              <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
                Thanks for completing the career screener. We've added you to {fqhcName}'s
                waitlist and matched your profile to their opportunities. You'll hear from us
                soon!
              </p>

              <p className="text-stone-500 mb-8">Check your email for next steps.</p>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Close
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
            <h1 className="text-4xl font-bold text-violet-900 mb-2">Your Career Match</h1>
            <p className="text-lg text-stone-600">{fqhcName}</p>
          </div>

          {/* Match Score */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-lg mb-2">Match Score</p>
                <p className="text-stone-500 text-sm">
                  Based on your experience, EHR familiarity, and language skills
                </p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-emerald-600">{matchScore}%</div>
                <p className="text-stone-600 mt-2">Strong match</p>
              </div>
            </div>
          </div>

          {/* Suggested Roles */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">Suggested Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedRoles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.id}
                    className="p-6 bg-white rounded-lg border-2 border-violet-200 hover:border-violet-400 hover:shadow-lg transition-all duration-200"
                  >
                    <Icon className="w-10 h-10 text-violet-600 mb-4" />
                    <h3 className="text-lg font-semibold text-stone-900">{role.label}</h3>
                    <p className="text-stone-600 text-sm mt-2">
                      A great fit based on your background and interests
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-t-4 border-violet-500">
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
              Join the Waitlist & Get Matched
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              {emailError && <p className="text-red-600 text-sm font-medium">{emailError}</p>}
            </div>

            <button
              onClick={handleWaitlistSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </button>

            <p className="text-xs text-stone-500 mt-4 text-center">
              We'll use your information to match you with opportunities and notify you of new
              roles at {fqhcName}. Your data is secure and never shared.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 text-stone-700 hover:text-stone-900 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
