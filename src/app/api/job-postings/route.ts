import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";

/* ------------------------------------------------------------------ */
/*  POST /api/job-postings — Save a job posting (data collection)      */
/* ------------------------------------------------------------------ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      roleId,
      jobTitle,
      employmentType,
      summary,
      responsibilities,
      qualifications,
      preferredSkills,
      orgName,
      contactName,
      contactEmail,
      contactPhone,
      region,
      city,
      ehrSystem,
      activePrograms,
      orgNotes,
      salaryMin,
      salaryMax,
      selectedBenefits,
      additionalBenefits,
      screeningQuestions,
      postOnSite,
      locale,
    } = body;

    // Basic validation
    if (!orgName || !contactEmail || !jobTitle || !roleId) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 },
      );
    }

    // Try to save to Supabase (table may not exist yet — that's okay)
    try {
      await supabase.from("job_postings").insert({
        role_id: roleId,
        job_title: jobTitle,
        employment_type: employmentType || null,
        summary: summary || null,
        responsibilities: responsibilities || [],
        qualifications: qualifications || [],
        preferred_skills: preferredSkills || [],
        org_name: orgName,
        contact_name: contactName || null,
        contact_email: contactEmail.toLowerCase(),
        contact_phone: contactPhone || null,
        region: region || null,
        city: city || null,
        ehr_system: ehrSystem || null,
        active_programs: activePrograms || [],
        org_notes: orgNotes || null,
        salary_min: salaryMin || null,
        salary_max: salaryMax || null,
        selected_benefits: selectedBenefits || [],
        additional_benefits: additionalBenefits || null,
        screening_questions: screeningQuestions || [],
        post_on_site: postOnSite ?? false,
        locale: locale || "en",
      });
    } catch {
      // Table might not exist yet — still send the email notification
      console.log("Supabase insert skipped (table may not exist yet)");
    }

    // Send admin notification email
    if (resend) {
      try {
        const salaryInfo =
          salaryMin && salaryMax
            ? `$${salaryMin.toLocaleString()} – $${salaryMax.toLocaleString()}`
            : "Not specified";

        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Job Posting: ${jobTitle} at ${orgName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
  <h2 style="color: #0d9488; font-size: 20px;">New Job Posting Created</h2>
  <p style="color: #44403c;">An FQHC used the Job Posting Builder${postOnSite ? " and wants to post on the site" : ""}.</p>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e7e5e4;">
    <tr><td style="padding: 8px 12px; font-weight: 600;">Job Title</td><td style="padding: 8px 12px;">${jobTitle}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Organization</td><td style="padding: 8px 12px;">${orgName}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Contact</td><td style="padding: 8px 12px;">${contactName || "N/A"} — <a href="mailto:${contactEmail}">${contactEmail}</a></td></tr>
    ${contactPhone ? `<tr><td style="padding: 8px 12px; font-weight: 600;">Phone</td><td style="padding: 8px 12px;">${contactPhone}</td></tr>` : ""}
    <tr><td style="padding: 8px 12px; font-weight: 600;">Region</td><td style="padding: 8px 12px;">${region || "N/A"} ${city ? `(${city})` : ""}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Type</td><td style="padding: 8px 12px;">${employmentType || "N/A"}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Salary</td><td style="padding: 8px 12px;">${salaryInfo}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">EHR</td><td style="padding: 8px 12px;">${ehrSystem || "N/A"}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Programs</td><td style="padding: 8px 12px;">${activePrograms?.join(", ") || "N/A"}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Benefits</td><td style="padding: 8px 12px;">${selectedBenefits?.join(", ") || "N/A"}</td></tr>
    <tr><td style="padding: 8px 12px; font-weight: 600;">Post on Site?</td><td style="padding: 8px 12px; ${postOnSite ? "color: #0d9488; font-weight: 600;" : ""}">${postOnSite ? "YES" : "No"}</td></tr>
  </table>

  <p style="font-size: 13px; color: #a8a29e; margin-top: 24px;">
    View all postings in your <a href="https://supabase.com/dashboard" style="color: #0d9488;">Supabase dashboard</a>.
  </p>
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({
      message: "Job posting saved successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
