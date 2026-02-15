import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      region,
      roleType,
      yearsExperience,
      objective,
      ehrSystems,
      programs,
      certifications,
      languages,
      selectedBullets,
      workHistory,
      education,
      originalResumeUrl,
      originalResumeText,
    } = body;

    if (!firstName || !lastName || !email || !roleType) {
      return NextResponse.json(
        { error: "Name, email, and role type are required." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("resume_profiles")
      .upsert(
        {
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          phone: phone || null,
          city: city || null,
          region: region || null,
          role_type: roleType,
          years_experience: yearsExperience || null,
          objective: objective || null,
          ehr_systems: ehrSystems || [],
          programs: programs || [],
          certifications: certifications || [],
          languages: languages || [],
          selected_bullets: selectedBullets || [],
          work_history: workHistory || [],
          education: education || [],
          original_resume_url: originalResumeUrl || null,
          original_resume_text: originalResumeText || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" },
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase resume-profiles error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Profile saved!", data });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
