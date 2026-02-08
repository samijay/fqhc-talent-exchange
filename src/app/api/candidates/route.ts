import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      currentRole,
      yearsExperience,
      skills,
      preferredLocations,
      availability,
    } = body;

    // Basic server-side validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("candidates")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        job_role: currentRole,
        years_experience: yearsExperience,
        skills,
        preferred_locations: preferredLocations,
        availability,
      })
      .select()
      .single();

    if (error) {
      // Handle duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A candidate with this email already exists." },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit profile. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Profile submitted successfully!", candidate: data },
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
