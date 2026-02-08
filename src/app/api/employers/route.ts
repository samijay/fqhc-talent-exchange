import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      organizationName,
      website,
      contactName,
      contactEmail,
      contactPhone,
      ehrSystem,
      positions,
    } = body;

    // Basic server-side validation
    if (!organizationName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Organization name, contact name, and email are required." },
        { status: 400 }
      );
    }

    // Insert employer
    const { data: employer, error: employerError } = await supabase
      .from("employers")
      .insert({
        organization_name: organizationName,
        website,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        ehr_system: ehrSystem,
      })
      .select()
      .single();

    if (employerError) {
      console.error("Supabase employer insert error:", employerError);
      return NextResponse.json(
        { error: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }

    // Insert job openings if provided
    if (positions && Array.isArray(positions) && positions.length > 0) {
      const jobRows = positions.map(
        (pos: {
          title: string;
          roleType: string;
          salaryMin: string;
          salaryMax: string;
          urgency: string;
        }) => ({
          employer_id: employer.id,
          title: pos.title,
          role_type: pos.roleType,
          salary_min: pos.salaryMin ? Number(pos.salaryMin) : null,
          salary_max: pos.salaryMax ? Number(pos.salaryMax) : null,
          urgency: pos.urgency,
        })
      );

      const { error: jobsError } = await supabase
        .from("job_openings")
        .insert(jobRows);

      if (jobsError) {
        console.error("Supabase job_openings insert error:", jobsError);
        // Employer was created, just warn about positions
        return NextResponse.json(
          {
            message:
              "Employer profile created but some positions failed to save. We'll follow up.",
            employer,
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json(
      { message: "Submitted successfully!", employer },
      { status: 201 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
