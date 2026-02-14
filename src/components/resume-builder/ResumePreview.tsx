"use client";

import { ROLE_TEMPLATES } from "./resume-templates";

export interface WorkHistoryEntry {
  employer: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  roleType: string;
  yearsExperience: string;
  objective: string;
  ehrSystems: string[];
  programs: string[];
  certifications: string[];
  languages: string[];
  selectedBullets: string[];
  workHistory: WorkHistoryEntry[];
  education: EducationEntry[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ResumePreview({ data }: { data: ResumeData }) {
  const roleTemplate = ROLE_TEMPLATES.find((r) => r.roleId === data.roleType);
  const selectedBulletTexts = roleTemplate
    ? roleTemplate.bullets
        .filter((b) => data.selectedBullets.includes(b.id))
        .map((b) => b.text)
    : [];

  const hasSkills =
    data.ehrSystems.length > 0 ||
    data.programs.length > 0 ||
    data.certifications.length > 0 ||
    data.languages.length > 0;

  const locationParts = [data.city, data.region].filter(Boolean).join(", ");

  return (
    <div
      id="resume-preview"
      className="mx-auto max-w-[800px] bg-white p-10 text-stone-900"
      style={{ fontFamily: "Georgia, serif", lineHeight: "1.5" }}
    >
      {/* Header */}
      <div className="border-b-2 border-stone-800 pb-4 text-center">
        <h1
          className="text-3xl font-bold tracking-wide text-stone-900"
          style={{ letterSpacing: "0.05em" }}
        >
          {data.firstName} {data.lastName}
        </h1>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 text-sm text-stone-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {locationParts && <span>{locationParts}</span>}
        </div>
      </div>

      {/* Professional Objective */}
      {data.objective && (
        <div className="mt-5">
          <h2
            className="mb-2 text-sm font-bold uppercase tracking-widest text-stone-700"
            style={{ letterSpacing: "0.15em" }}
          >
            Professional Summary
          </h2>
          <p className="text-sm text-stone-700">{data.objective}</p>
        </div>
      )}

      {/* Skills & Qualifications */}
      {hasSkills && (
        <div className="mt-5">
          <h2
            className="mb-2 text-sm font-bold uppercase tracking-widest text-stone-700"
            style={{ letterSpacing: "0.15em" }}
          >
            Skills & Qualifications
          </h2>
          <div className="text-sm text-stone-700">
            {data.programs.length > 0 && (
              <p>
                <span className="font-semibold">Programs:</span>{" "}
                {data.programs.join(", ")}
              </p>
            )}
            {data.ehrSystems.length > 0 && (
              <p>
                <span className="font-semibold">EHR Systems:</span>{" "}
                {data.ehrSystems.join(", ")}
              </p>
            )}
            {data.certifications.length > 0 && (
              <p>
                <span className="font-semibold">Certifications:</span>{" "}
                {data.certifications.join(", ")}
              </p>
            )}
            {data.languages.length > 0 && (
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {data.languages.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {(data.workHistory.length > 0 || selectedBulletTexts.length > 0) && (
        <div className="mt-5">
          <h2
            className="mb-2 text-sm font-bold uppercase tracking-widest text-stone-700"
            style={{ letterSpacing: "0.15em" }}
          >
            Professional Experience
          </h2>

          {data.workHistory.length > 0 ? (
            data.workHistory.map((job, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-stone-900">
                      {job.title || roleTemplate?.roleLabel || ""}
                    </span>
                    {job.employer && (
                      <span className="text-sm text-stone-600">
                        {" "}| {job.employer}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-500">
                    {formatDate(job.startDate)}
                    {(job.endDate || job.current) && " – "}
                    {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                {/* Show selected bullets under the first work entry */}
                {i === 0 && selectedBulletTexts.length > 0 && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-stone-700">
                    {selectedBulletTexts.map((text, j) => (
                      <li key={j}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            /* If no work history entries but bullets selected, show bullets standalone */
            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700">
              {selectedBulletTexts.map((text, j) => (
                <li key={j}>{text}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 &&
        data.education.some((e) => e.institution || e.degree) && (
          <div className="mt-5">
            <h2
              className="mb-2 text-sm font-bold uppercase tracking-widest text-stone-700"
              style={{ letterSpacing: "0.15em" }}
            >
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm">
                <div>
                  <span className="font-bold text-stone-900">
                    {edu.degree}
                  </span>
                  {edu.institution && (
                    <span className="text-stone-600">
                      {" "}| {edu.institution}
                    </span>
                  )}
                </div>
                {edu.year && (
                  <span className="text-xs text-stone-500">{edu.year}</span>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
