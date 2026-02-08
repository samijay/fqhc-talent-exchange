import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { orgName, contactName, contactTitle, email, phone, positionsCount, rolesNeeded, programsActive, ehrSystem, timeline, notes } = body;

    if (!orgName || !contactName || !email) {
      return NextResponse.json(
        { error: "Organization name, contact name, and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("employer_waitlist")
      .insert({
        org_name: orgName,
        contact_name: contactName,
        contact_title: contactTitle || null,
        email,
        phone: phone || null,
        positions_count: positionsCount || null,
        roles_needed: rolesNeeded || [],
        programs_active: programsActive || [],
        ehr_system: ehrSystem || null,
        timeline: timeline || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Request received!",
      data,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}

export async function GET() {
  const { count, error } = await supabase
    .from("employer_waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
