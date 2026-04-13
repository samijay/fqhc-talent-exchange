"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FileDown,
  Mail,
  Building2,
  User,
  CheckCircle2,
  BarChart3,
  MapPin,
  TrendingUp,
  ArrowRight,
  Loader2,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SALARY_BENCHMARKS } from "@/lib/job-posting-templates";
import { REGIONAL_MULTIPLIERS } from "@/lib/career-pathways";
import { t } from "@/lib/i18n-helpers";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmtK(amount: number): string {
  return `$${Math.round(amount / 1000)}k`;
}

function fmtFull(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/* ------------------------------------------------------------------ */
/*  Data groupings                                                     */
/* ------------------------------------------------------------------ */

const DEPT_ORDER = [
  "Care Coordination",
  "Clinical",
  "Behavioral Health",
  "Dental",
  "Pharmacy",
  "Admin & Revenue",
  "Back Office & Finance",
  "Leadership",
  "Compliance",
];

const ROLE_TO_DEPT: Record<string, string> = {
  chw: "Care Coordination",
  care_coordinator: "Care Coordination",
  case_manager: "Care Coordination",
  patient_navigator: "Care Coordination",
  health_educator: "Care Coordination",
  referral_coordinator: "Care Coordination",
  medical_assistant: "Clinical",
  nurse_rn: "Clinical",
  nurse_lvn: "Clinical",
  nurse_practitioner: "Clinical",
  physician: "Clinical",
  physician_assistant: "Clinical",
  phlebotomist: "Clinical",
  behavioral_health: "Behavioral Health",
  social_worker: "Behavioral Health",
  lmft: "Behavioral Health",
  psychologist: "Behavioral Health",
  psychiatrist: "Behavioral Health",
  psychiatric_np: "Behavioral Health",
  dentist: "Dental",
  dental_hygienist: "Dental",
  dental_assistant: "Dental",
  pharmacist: "Pharmacy",
  pharmacy_tech: "Pharmacy",
  patient_services: "Admin & Revenue",
  call_center: "Admin & Revenue",
  enrollment_specialist: "Admin & Revenue",
  revenue_cycle: "Admin & Revenue",
  billing_specialist: "Admin & Revenue",
  medical_coder: "Admin & Revenue",
  hr_manager: "Back Office & Finance",
  accountant: "Back Office & Finance",
  payroll_specialist: "Back Office & Finance",
  finance_manager: "Back Office & Finance",
  program_manager: "Leadership",
  medical_director: "Leadership",
  director: "Leadership",
  ceo: "Leadership",
  cfo: "Leadership",
  cmo: "Leadership",
  coo: "Leadership",
  chro: "Leadership",
  dental_director: "Leadership",
  behavioral_health_director: "Leadership",
  compliance_analyst: "Compliance",
  compliance_officer: "Compliance",
};

// Compute executive summary stats
const allP50 = SALARY_BENCHMARKS.map((b) => b.p50);
const avgP50 = Math.round(allP50.reduce((a, b) => a + b, 0) / allP50.length);
const highestPaid = SALARY_BENCHMARKS.reduce((a, b) =>
  a.p50 > b.p50 ? a : b
);
const lowestPaid = SALARY_BENCHMARKS.reduce((a, b) =>
  a.p50 < b.p50 ? a : b
);
const entryLevelRoles = SALARY_BENCHMARKS.filter((b) => b.p50 < 60000);
const midLevelRoles = SALARY_BENCHMARKS.filter(
  (b) => b.p50 >= 60000 && b.p50 < 120000
);
const seniorRoles = SALARY_BENCHMARKS.filter((b) => b.p50 >= 120000);

// Group by department
const deptGroups = DEPT_ORDER.map((dept) => ({
  dept,
  roles: SALARY_BENCHMARKS.filter((b) => ROLE_TO_DEPT[b.roleId] === dept).sort(
    (a, b) => b.p50 - a.p50
  ),
})).filter((g) => g.roles.length > 0);

/* ------------------------------------------------------------------ */
/*  PDF Report HTML Generator                                          */
/* ------------------------------------------------------------------ */

function generateReportHTML(): string {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const regionRows = REGIONAL_MULTIPLIERS.map(
    (r) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e7e5e4; font-size: 12px; font-weight: 500; color: #1c1917;">${r.region}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e7e5e4; font-size: 12px; text-align: center; font-weight: 600; color: ${r.multiplier >= 1.0 ? "#0f766e" : "#b45309"};">${r.multiplier >= 1.0 ? "+" : ""}${Math.round((r.multiplier - 1) * 100)}%</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e7e5e4; font-size: 12px; color: #57534e;">${r.description}</td>
    </tr>`
  )
    .join("");

  // Top 10 highest-paying roles
  const topPaying = [...SALARY_BENCHMARKS]
    .sort((a, b) => b.p50 - a.p50)
    .slice(0, 10);
  const topPayingRows = topPaying
    .map(
      (b, i) => `
    <tr>
      <td style="padding: 6px 10px; border-bottom: 1px solid #e7e5e4; font-size: 12px; color: #78716c; text-align: center;">${i + 1}</td>
      <td style="padding: 6px 10px; border-bottom: 1px solid #e7e5e4; font-size: 12px; font-weight: 500; color: #1c1917;">${b.label}</td>
      <td style="padding: 6px 10px; border-bottom: 1px solid #e7e5e4; font-size: 12px; text-align: right; font-weight: 600; color: #0f766e;">${fmtFull(b.p50)}</td>
      <td style="padding: 6px 10px; border-bottom: 1px solid #e7e5e4; font-size: 12px; text-align: right; color: #57534e;">${fmtFull(b.p25)} - ${fmtFull(b.p75)}</td>
    </tr>`
    )
    .join("");

  // Department salary table rows grouped
  const deptSections = deptGroups
    .map(
      (g) => `
    <tr>
      <td colspan="5" style="padding: 10px 10px 4px; font-size: 12px; font-weight: 700; color: #0f766e; border-bottom: 2px solid #0f766e; text-transform: uppercase; letter-spacing: 0.5px;">${g.dept}</td>
    </tr>
    ${g.roles
      .map(
        (b) => `
    <tr>
      <td style="padding: 5px 10px; border-bottom: 1px solid #f5f5f4; font-size: 11px; color: #1c1917; padding-left: 20px;">${b.label}</td>
      <td style="padding: 5px 10px; border-bottom: 1px solid #f5f5f4; font-size: 11px; text-align: right; color: #78716c;">${fmtFull(b.p25)}</td>
      <td style="padding: 5px 10px; border-bottom: 1px solid #f5f5f4; font-size: 11px; text-align: right; font-weight: 600; color: #0f766e;">${fmtFull(b.p50)}</td>
      <td style="padding: 5px 10px; border-bottom: 1px solid #f5f5f4; font-size: 11px; text-align: right; color: #78716c;">${fmtFull(b.p75)}</td>
      <td style="padding: 5px 10px; border-bottom: 1px solid #f5f5f4; font-size: 11px; text-align: right; color: #78716c;">${fmtFull(b.p75 - b.p25)}</td>
    </tr>`
      )
      .join("")}`
    )
    .join("");

  return `
<div id="salary-report-pdf" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1c1917; max-width: 800px; margin: 0 auto;">

  <!-- Cover Page -->
  <div style="page-break-after: always; min-height: 95vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%); color: white; padding: 60px 40px; border-radius: 2px;">
    <div style="width: 60px; height: 60px; background: #0f766e; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
      <span style="font-size: 28px; color: white;">&#9829;</span>
    </div>
    <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: #f59e0b; margin-bottom: 16px;">FQHC Talent</div>
    <h1 style="font-size: 36px; font-weight: 800; line-height: 1.2; margin: 0 0 16px;">2026 California FQHC<br/>Salary &amp; Workforce Report</h1>
    <div style="width: 60px; height: 3px; background: #0f766e; margin: 16px auto;"></div>
    <p style="font-size: 16px; color: #a8a29e; max-width: 500px; line-height: 1.6;">
      Percentile-based compensation data for ${SALARY_BENCHMARKS.length} roles across 9 California regions.
      Built from 1,000+ job postings, NACHC surveys, BLS data, and FQHC salary disclosures.
    </p>
    <div style="margin-top: 40px; font-size: 12px; color: #78716c;">
      Published ${today}<br/>
      fqhctalent.com | hello@fqhctalent.com
    </div>
  </div>

  <!-- Executive Summary -->
  <div style="page-break-after: always; padding: 40px 30px;">
    <h2 style="font-size: 24px; font-weight: 700; color: #1c1917; margin: 0 0 8px;">Executive Summary</h2>
    <div style="width: 40px; height: 3px; background: #0f766e; margin-bottom: 24px;"></div>

    <p style="font-size: 13px; line-height: 1.7; color: #44403c; margin-bottom: 20px;">
      California's Federally Qualified Health Centers are navigating a convergence of challenges in 2026:
      potential $4.6 billion in federal funding cuts from H.R. 1, SB 525 minimum wage increases reaching
      $25/hour for all FQHC workers by 2027, and a competitive labor market driven by healthcare system
      consolidation. This report provides the salary benchmarks FQHC leaders need to recruit, retain, and
      budget effectively.
    </p>

    <div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 160px; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; text-align: center;">
        <div style="font-size: 28px; font-weight: 800; color: #0f766e;">${SALARY_BENCHMARKS.length}</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 4px;">Roles Benchmarked</div>
      </div>
      <div style="flex: 1; min-width: 160px; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; text-align: center;">
        <div style="font-size: 28px; font-weight: 800; color: #0f766e;">9</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 4px;">CA Regions</div>
      </div>
      <div style="flex: 1; min-width: 160px; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; text-align: center;">
        <div style="font-size: 28px; font-weight: 800; color: #0f766e;">${fmtK(avgP50)}</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 4px;">Avg. Median Salary</div>
      </div>
      <div style="flex: 1; min-width: 160px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; text-align: center;">
        <div style="font-size: 28px; font-weight: 800; color: #b45309;">$25/hr</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 4px;">SB 525 Min by 2027</div>
      </div>
    </div>

    <h3 style="font-size: 16px; font-weight: 600; color: #1c1917; margin: 28px 0 12px;">Key Findings</h3>
    <ul style="font-size: 13px; line-height: 1.8; color: #44403c; padding-left: 20px;">
      <li><strong>Highest-paid role:</strong> ${highestPaid.label} at ${fmtFull(highestPaid.p50)} median (P25-P75: ${fmtFull(highestPaid.p25)}-${fmtFull(highestPaid.p75)})</li>
      <li><strong>Entry-level floor:</strong> ${lowestPaid.label} at ${fmtFull(lowestPaid.p50)} median &mdash; impacted by SB 525 minimum wage</li>
      <li><strong>SF Bay Area premium:</strong> +15% above statewide baseline &mdash; the highest regional adjustment</li>
      <li><strong>Rural discount:</strong> North Coast roles pay 12% below statewide baseline, offset by NHSC loan repayment eligibility</li>
      <li><strong>${entryLevelRoles.length} roles</strong> fall under $60k median (entry-level), <strong>${midLevelRoles.length} roles</strong> in the $60-120k range (mid-career), and <strong>${seniorRoles.length} roles</strong> above $120k (senior/leadership)</li>
      <li><strong>Behavioral health demand:</strong> Psychiatrists (${fmtFull(SALARY_BENCHMARKS.find((b) => b.roleId === "psychiatrist")?.p50 ?? 0)}) and Psych NPs (${fmtFull(SALARY_BENCHMARKS.find((b) => b.roleId === "psychiatric_np")?.p50 ?? 0)}) command premium salaries due to critical shortages</li>
      <li><strong>SB 525 impact:</strong> CA FQHC minimum wage ($21/hr through June 2026, $22/hr July 2026, $25/hr by 2027) compresses pay for ${entryLevelRoles.length} entry-level roles &mdash; budget now for 2027 rates</li>
    </ul>

    <div style="margin-top: 28px; padding: 16px; background: #fefce8; border: 1px solid #fde68a; border-radius: 8px;">
      <p style="font-size: 12px; font-weight: 600; color: #92400e; margin: 0 0 6px;">Data Sources</p>
      <p style="font-size: 11px; color: #78716c; margin: 0; line-height: 1.6;">
        NACHC 2024-2025 Salary Report &bull; UHC Solutions 2025 Compensation Guide &bull; BLS Occupational
        Employment and Wage Statistics (OEWS) May 2024 &bull; CPCA 2024 Compensation Survey &bull; SB 525
        DIR FAQ &bull; 1,000+ scraped California FQHC job postings (fqhctalent.com)
      </p>
    </div>
  </div>

  <!-- Top 10 Highest-Paying Roles -->
  <div style="page-break-after: always; padding: 40px 30px;">
    <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 0 0 8px;">Top 10 Highest-Paying FQHC Roles</h2>
    <div style="width: 40px; height: 3px; background: #0f766e; margin-bottom: 20px;"></div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr style="background: #f5f5f4;">
          <th style="padding: 8px 10px; text-align: center; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1; width: 40px;">#</th>
          <th style="padding: 8px 10px; text-align: left; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Role</th>
          <th style="padding: 8px 10px; text-align: right; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Median (P50)</th>
          <th style="padding: 8px 10px; text-align: right; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Range (P25-P75)</th>
        </tr>
      </thead>
      <tbody>${topPayingRows}</tbody>
    </table>

    <div style="padding: 16px; background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; margin-top: 16px;">
      <p style="font-size: 12px; font-weight: 600; color: #0f766e; margin: 0 0 6px;">Insight: Leadership Premium</p>
      <p style="font-size: 11px; color: #44403c; margin: 0; line-height: 1.6;">
        C-suite and medical leadership roles (CMO, CEO, Medical Director) command the highest salaries,
        reflecting the complexity of navigating federal funding, state regulations, and community health
        operations simultaneously. The gap between P25 and P75 for these roles ($100k-$150k spread)
        indicates significant variation based on organization size, budget, and geographic market.
      </p>
    </div>
  </div>

  <!-- Full Salary Table by Department -->
  <div style="page-break-after: always; padding: 40px 30px;">
    <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 0 0 8px;">Complete Salary Benchmarks by Department</h2>
    <div style="width: 40px; height: 3px; background: #0f766e; margin-bottom: 6px;"></div>
    <p style="font-size: 11px; color: #78716c; margin-bottom: 16px;">Statewide baseline figures. Apply regional multipliers (next page) for location-adjusted compensation.</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f5f5f4;">
          <th style="padding: 6px 10px; text-align: left; font-size: 10px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Role</th>
          <th style="padding: 6px 10px; text-align: right; font-size: 10px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">P25</th>
          <th style="padding: 6px 10px; text-align: right; font-size: 10px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">P50 (Median)</th>
          <th style="padding: 6px 10px; text-align: right; font-size: 10px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">P75</th>
          <th style="padding: 6px 10px; text-align: right; font-size: 10px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Spread</th>
        </tr>
      </thead>
      <tbody>${deptSections}</tbody>
    </table>
  </div>

  <!-- Regional Multipliers -->
  <div style="page-break-after: always; padding: 40px 30px;">
    <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 0 0 8px;">Regional Salary Adjustments</h2>
    <div style="width: 40px; height: 3px; background: #0f766e; margin-bottom: 6px;"></div>
    <p style="font-size: 12px; color: #57534e; margin-bottom: 20px; line-height: 1.6;">
      California FQHC salaries vary significantly by region due to cost of living, labor market
      competition, and health professional shortage designations. Apply these multipliers to the
      statewide benchmarks for region-specific estimates.
    </p>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr style="background: #f5f5f4;">
          <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1; width: 150px;">Region</th>
          <th style="padding: 10px 12px; text-align: center; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1; width: 100px;">Adjustment</th>
          <th style="padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Context</th>
        </tr>
      </thead>
      <tbody>${regionRows}</tbody>
    </table>

    <h3 style="font-size: 16px; font-weight: 600; color: #1c1917; margin: 28px 0 12px;">Example: Regional Salary Comparison</h3>
    <p style="font-size: 12px; color: #57534e; margin-bottom: 12px;">Registered Nurse (RN) median salary adjusted by region:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f5f5f4;">
          <th style="padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Region</th>
          <th style="padding: 8px 12px; text-align: right; font-size: 11px; font-weight: 600; color: #78716c; border-bottom: 2px solid #d6d3d1;">Adjusted RN Median</th>
        </tr>
      </thead>
      <tbody>
        ${REGIONAL_MULTIPLIERS.map(
          (r) => `
        <tr>
          <td style="padding: 6px 12px; border-bottom: 1px solid #e7e5e4; font-size: 12px; color: #1c1917;">${r.region}</td>
          <td style="padding: 6px 12px; border-bottom: 1px solid #e7e5e4; font-size: 12px; text-align: right; font-weight: 600; color: #0f766e;">${fmtFull(Math.round(110000 * r.multiplier))}</td>
        </tr>`
        ).join("")}
      </tbody>
    </table>
  </div>

  <!-- SB 525 Impact + Methodology -->
  <div style="padding: 40px 30px;">
    <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 0 0 8px;">SB 525: Minimum Wage Impact on FQHCs</h2>
    <div style="width: 40px; height: 3px; background: #f59e0b; margin-bottom: 20px;"></div>

    <div style="padding: 16px; background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; margin-bottom: 24px;">
      <p style="font-size: 13px; font-weight: 600; color: #92400e; margin: 0 0 8px;">California Healthcare Minimum Wage Timeline</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 500; color: #44403c; border-bottom: 1px solid #fde68a;">Through June 2026</td>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 700; color: #92400e; border-bottom: 1px solid #fde68a; text-align: right;">$21/hour ($43,680/yr)</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 500; color: #44403c; border-bottom: 1px solid #fde68a;">July 2026</td>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 700; color: #92400e; border-bottom: 1px solid #fde68a; text-align: right;">$22/hour ($45,760/yr)</td>
        </tr>
        <tr>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 500; color: #44403c;">By 2027</td>
          <td style="padding: 6px 8px; font-size: 12px; font-weight: 700; color: #92400e; text-align: right;">$25/hour ($52,000/yr)</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 12px; color: #44403c; line-height: 1.7; margin-bottom: 20px;">
      SB 525 creates significant pay compression for ${entryLevelRoles.length} entry-level FQHC roles.
      As the minimum wage approaches $52,000/year, organizations must proactively adjust pay bands for
      roles like Care Coordinators, Medical Assistants, and Health Educators to maintain differentiation
      and prevent retention issues.
    </p>

    <h2 style="font-size: 22px; font-weight: 700; color: #1c1917; margin: 32px 0 8px;">Methodology &amp; Sources</h2>
    <div style="width: 40px; height: 3px; background: #0f766e; margin-bottom: 20px;"></div>

    <p style="font-size: 12px; color: #44403c; line-height: 1.7; margin-bottom: 12px;">
      Salary benchmarks in this report are derived from the following sources, cross-referenced
      for California FQHC-specific accuracy:
    </p>
    <ol style="font-size: 12px; color: #44403c; line-height: 1.8; padding-left: 20px;">
      <li><strong>NACHC 2024-2025 Health Center Salary &amp; Benefits Report</strong> &mdash; National-level benchmarks with state breakouts</li>
      <li><strong>UHC Solutions 2025 FQHC Compensation Guide</strong> &mdash; FQHC-specific salary data from the largest FQHC staffing firm</li>
      <li><strong>Bureau of Labor Statistics OEWS (May 2024)</strong> &mdash; California occupational wage data</li>
      <li><strong>CPCA 2024 Compensation Survey</strong> &mdash; California Primary Care Association member data</li>
      <li><strong>SB 525 Department of Industrial Relations FAQ</strong> &mdash; Minimum wage schedule for healthcare workers</li>
      <li><strong>1,000+ California FQHC job postings</strong> &mdash; Aggregated from fqhctalent.com scraping pipeline (AltaMed, FHCSD, AHS, La Clinica, and 30+ FQHCs)</li>
    </ol>

    <p style="font-size: 11px; color: #a8a29e; margin-top: 20px; line-height: 1.6;">
      Percentile figures (P25/P50/P75) represent the 25th, 50th (median), and 75th percentile of reported
      compensation for each role within California FQHCs. Ranges reflect variation in experience level,
      organization size, geographic location, and funding structure.
    </p>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e7e5e4; text-align: center;">
      <div style="font-size: 14px; font-weight: 700; color: #0f766e;">FQHC Talent</div>
      <div style="font-size: 11px; color: #78716c; margin-top: 4px;">fqhctalent.com | hello@fqhctalent.com</div>
      <div style="font-size: 10px; color: #a8a29e; margin-top: 8px;">
        &copy; ${new Date().getFullYear()} FQHC Talent. This report may be shared freely with attribution.
      </div>
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SalaryReportPage() {
  const locale = useLocale();
  const isEs = locale === "es";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGated, setIsGated] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setIsSubmitting(true);

      try {
        const res = await fetch("/api/salary-report-download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, organization }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }

        setIsGated(false);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, organization]
  );

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      // Create a temporary container with the full report HTML
      const container = document.createElement("div");
      container.innerHTML = generateReportHTML();
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      document.body.appendChild(container);

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [0.3, 0.3, 0.3, 0.3],
          filename: "2026-California-FQHC-Salary-Workforce-Report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(container)
        .save();

      document.body.removeChild(container);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ---- Dark Hero ---- */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white py-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <Badge className="mb-4 bg-teal-800/50 text-teal-300 border-teal-700">
            <FileDown className="mr-1 size-3" />
            {isEs ? "Informe Descargable" : "Downloadable Report"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(
              {
                en: "2026 California FQHC Salary & Workforce Report",
                es: "Informe Salarial y de Fuerza Laboral FQHC de California 2026",
              },
              locale
            )}
          </h1>
          <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
            {t(
              {
                en: `Percentile-based compensation data for ${SALARY_BENCHMARKS.length} roles across 9 California regions. The most comprehensive FQHC salary guide built specifically for California.`,
                es: `Datos de compensacion por percentil para ${SALARY_BENCHMARKS.length} roles en 9 regiones de California. La guia salarial FQHC mas completa creada especificamente para California.`,
              },
              locale
            )}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1">
              <BarChart3 className="size-4 text-teal-400" />
              {SALARY_BENCHMARKS.length} {isEs ? "roles" : "roles"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4 text-teal-400" />
              9 {isEs ? "regiones" : "regions"}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="size-4 text-teal-400" />
              P25/P50/P75
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* ---- Left: Report Preview ---- */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-stone-900 mb-6">
              {isEs ? "Vista previa del informe" : "Report Preview"}
            </h2>

            {/* Preview cards showing what's inside */}
            <div className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-teal-50 p-2">
                    <BarChart3 className="size-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {isEs ? "Resumen Ejecutivo" : "Executive Summary"}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: "Key findings including average median salary across all roles, SB 525 minimum wage impact, and regional cost-of-living adjustments.",
                          es: "Hallazgos clave incluyendo salario mediano promedio, impacto del salario minimo SB 525 y ajustes regionales por costo de vida.",
                        },
                        locale
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-teal-50 p-2">
                    <TrendingUp className="size-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {isEs
                        ? "Los 10 Roles Mejor Pagados"
                        : "Top 10 Highest-Paying Roles"}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: `From ${highestPaid.label} (${fmtK(highestPaid.p50)} median) to the full leadership and provider salary spectrum.`,
                          es: `Desde ${highestPaid.label} (${fmtK(highestPaid.p50)} mediana) hasta el espectro completo de salarios de liderazgo y proveedores.`,
                        },
                        locale
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-teal-50 p-2">
                    <BarChart3 className="size-5 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {isEs
                        ? `${SALARY_BENCHMARKS.length} Roles con Datos P25/P50/P75`
                        : `${SALARY_BENCHMARKS.length} Roles with P25/P50/P75 Data`}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: `Complete salary benchmarks organized by department: Care Coordination, Clinical, Behavioral Health, Dental, Pharmacy, Admin & Revenue, Back Office, Leadership, and Compliance.`,
                          es: `Puntos de referencia salariales completos organizados por departamento: Coordinacion de Cuidado, Clinico, Salud Conductual, Dental, Farmacia, Admin e Ingresos, Back Office, Liderazgo y Cumplimiento.`,
                        },
                        locale
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <MapPin className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {isEs
                        ? "Multiplicadores Regionales"
                        : "Regional Multipliers"}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: "9 California regions with cost-of-living adjustments ranging from -12% (North Coast) to +15% (SF Bay Area), with RN salary example.",
                          es: "9 regiones de California con ajustes de costo de vida desde -12% (Costa Norte) hasta +15% (Area de la Bahia de SF), con ejemplo salarial de RN.",
                        },
                        locale
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <Shield className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">
                      {isEs
                        ? "Impacto del SB 525 + Metodologia"
                        : "SB 525 Impact + Methodology"}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: "Healthcare minimum wage timeline through 2027, pay compression analysis, and full source citations (NACHC, BLS, UHC Solutions, CPCA, 1,000+ job postings).",
                          es: "Cronograma de salario minimo de salud hasta 2027, analisis de compresion salarial y citas completas de fuentes.",
                        },
                        locale
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample data teaser */}
            <div className="mt-8 rounded-lg border border-stone-200 bg-white overflow-hidden">
              <div className="bg-stone-50 px-5 py-3 border-b border-stone-200">
                <h3 className="text-sm font-semibold text-stone-700">
                  {isEs ? "Vista previa de datos" : "Sample Data Preview"}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-stone-50/50 border-b border-stone-200">
                      <th className="px-4 py-2 text-left font-medium text-stone-500 text-xs">
                        {isEs ? "Rol" : "Role"}
                      </th>
                      <th className="px-4 py-2 text-right font-medium text-stone-500 text-xs">
                        P25
                      </th>
                      <th className="px-4 py-2 text-right font-medium text-teal-700 text-xs">
                        P50
                      </th>
                      <th className="px-4 py-2 text-right font-medium text-stone-500 text-xs">
                        P75
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_BENCHMARKS.slice(0, 5).map((b) => (
                      <tr
                        key={b.roleId}
                        className="border-b border-stone-100"
                      >
                        <td className="px-4 py-2 text-stone-900 text-xs">
                          {isEs ? b.esLabel : b.label}
                        </td>
                        <td className="px-4 py-2 text-right text-stone-500 text-xs">
                          {fmtK(b.p25)}
                        </td>
                        <td className="px-4 py-2 text-right font-semibold text-teal-700 text-xs">
                          {fmtK(b.p50)}
                        </td>
                        <td className="px-4 py-2 text-right text-stone-500 text-xs">
                          {fmtK(b.p75)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-center text-xs text-stone-400 italic"
                      >
                        {t(
                          {
                            en: `+ ${SALARY_BENCHMARKS.length - 5} more roles in the full report...`,
                            es: `+ ${SALARY_BENCHMARKS.length - 5} roles mas en el informe completo...`,
                          },
                          locale
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive salary-data link */}
            <div className="mt-8 rounded-lg border border-teal-200 bg-teal-50/50 p-5">
              <p className="text-sm text-stone-700">
                {t(
                  {
                    en: "Want to explore the data interactively instead? Use our online Salary Intelligence tool with real-time filtering, sorting, and regional adjustments.",
                    es: "Prefieres explorar los datos de forma interactiva? Usa nuestra herramienta de Inteligencia Salarial en linea con filtrado, ordenamiento y ajustes regionales en tiempo real.",
                  },
                  locale
                )}
              </p>
              <Link href="/salary-data">
                <Button
                  variant="outline"
                  className="mt-3 text-sm border-teal-300 text-teal-700 hover:bg-teal-100"
                >
                  {isEs
                    ? "Explorar Datos Salariales"
                    : "Explore Salary Intelligence"}
                  <ArrowRight className="ml-1 size-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* ---- Right: Download Form / Button ---- */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {isGated ? (
                <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-3 rounded-full bg-teal-100 p-3 w-fit">
                      <FileDown className="size-6 text-teal-700" />
                    </div>
                    <h2 className="text-lg font-bold text-stone-900">
                      {t(
                        {
                          en: "Download the Full Report",
                          es: "Descargar el Informe Completo",
                        },
                        locale
                      )}
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {t(
                        {
                          en: "Free PDF with all salary data, regional adjustments, and workforce analysis.",
                          es: "PDF gratuito con todos los datos salariales, ajustes regionales y analisis de fuerza laboral.",
                        },
                        locale
                      )}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        <User className="inline size-3 mr-1" />
                        {isEs ? "Nombre" : "Name"}
                      </label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={
                          isEs ? "Tu nombre completo" : "Your full name"
                        }
                        required
                        minLength={2}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        <Mail className="inline size-3 mr-1" />
                        {isEs ? "Correo electronico" : "Work email"}
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@organization.org"
                        required
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 mb-1 block">
                        <Building2 className="inline size-3 mr-1" />
                        {isEs ? "Organizacion" : "Organization"}
                      </label>
                      <Input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={
                          isEs
                            ? "Tu centro de salud u organizacion"
                            : "Your health center or organization"
                        }
                        required
                        minLength={2}
                        className="text-sm"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-600 bg-red-50 rounded p-2">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          {isEs ? "Procesando..." : "Processing..."}
                        </>
                      ) : (
                        <>
                          <FileDown className="mr-2 size-4" />
                          {t(
                            {
                              en: "Get the Free Report",
                              es: "Obtener el Informe Gratis",
                            },
                            locale
                          )}
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      <Shield className="size-3" />
                      {t(
                        {
                          en: "No spam. We respect your privacy.",
                          es: "Sin spam. Respetamos tu privacidad.",
                        },
                        locale
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] text-stone-400 border-stone-200"
                      >
                        {SALARY_BENCHMARKS.length} roles
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-stone-400 border-stone-200"
                      >
                        9 regions
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-stone-400 border-stone-200"
                      >
                        PDF format
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-teal-200 bg-teal-50 p-6 shadow-lg text-center">
                  <CheckCircle2 className="mx-auto size-10 text-teal-600 mb-3" />
                  <h2 className="text-lg font-bold text-stone-900 mb-2">
                    {t(
                      {
                        en: "Your report is ready!",
                        es: "Tu informe esta listo!",
                      },
                      locale
                    )}
                  </h2>
                  <p className="text-sm text-stone-600 mb-4">
                    {t(
                      {
                        en: "Click below to generate and download your PDF.",
                        es: "Haz clic abajo para generar y descargar tu PDF.",
                      },
                      locale
                    )}
                  </p>

                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white"
                    size="lg"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {t(
                          {
                            en: "Generating PDF...",
                            es: "Generando PDF...",
                          },
                          locale
                        )}
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 size-4" />
                        {t(
                          {
                            en: "Download PDF Report",
                            es: "Descargar Informe PDF",
                          },
                          locale
                        )}
                      </>
                    )}
                  </Button>

                  <p className="mt-3 text-xs text-stone-500">
                    {t(
                      {
                        en: `${SALARY_BENCHMARKS.length} roles | 9 regions | ~6 pages`,
                        es: `${SALARY_BENCHMARKS.length} roles | 9 regiones | ~6 paginas`,
                      },
                      locale
                    )}
                  </p>
                </div>
              )}

              {/* What's different vs UHC Solutions */}
              <div className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-stone-900 mb-3">
                  {t(
                    {
                      en: "Why this report?",
                      es: "Por que este informe?",
                    },
                    locale
                  )}
                </h3>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>
                      {t(
                        {
                          en: "California-specific (not national averages diluted across 50 states)",
                          es: "Especifico de California (no promedios nacionales diluidos en 50 estados)",
                        },
                        locale
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>
                      {t(
                        {
                          en: "9 regional multipliers for real cost-of-living adjustments",
                          es: "9 multiplicadores regionales para ajustes reales de costo de vida",
                        },
                        locale
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>
                      {t(
                        {
                          en: "SB 525 minimum wage analysis with 2027 planning guidance",
                          es: "Analisis de salario minimo SB 525 con guia de planificacion 2027",
                        },
                        locale
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>
                      {t(
                        {
                          en: "Built from 1,000+ actual CA FQHC job postings (not self-reported surveys)",
                          es: "Construido a partir de 1,000+ ofertas reales de empleo FQHC de CA",
                        },
                        locale
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-teal-600 mt-0.5 shrink-0" />
                    <span>
                      {t(
                        {
                          en: "100% free (no paywall, no upsell)",
                          es: "100% gratis (sin muro de pago, sin venta adicional)",
                        },
                        locale
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
