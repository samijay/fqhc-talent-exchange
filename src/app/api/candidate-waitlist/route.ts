import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import {
  candidateConfirmationHtml,
  adminCandidateNotificationHtml,
} from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, phone, region, currentRole, yearsExperience, ehrSystems, programs, bilingual, notes } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("candidate_waitlist")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        region: region || null,
        role_title: currentRole || null,
        years_experience: yearsExperience || null,
        ehr_systems: ehrSystems || [],
        programs: programs || [],
        bilingual: bilingual || null,
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
      console.error("Supabase candidate-waitlist error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Something went wrong. Please try again.", detail: error.message, code: error.code, hint: error.hint },
        { status: 500 }
      );
    }

    // Get the count for position number
    const { count } = await supabase
      .from("candidate_waitlist")
      .select("*", { count: "exact", head: true });

    const position = count ?? 1;

    // Send emails (non-blocking — don't let email failures break the form)
    if (resend) {
      try {
        await Promise.all([
          // Confirmation to candidate
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `You're on the list, ${firstName}! — FQHC Talent Exchange`,
            html: candidateConfirmationHtml({ firstName, position }),
          }),
          // Notification to admin
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Candidate Signup: ${firstName} ${lastName} (#${position})`,
            html: adminCandidateNotificationHtml({
              firstName,
              lastName,
              email,
              phone,
              region,
              currentRole,
              yearsExperience,
              ehrSystems,
              programs,
              bilingual,
              notes,
              position,
            }),
          }),
        ]);
      } catch (emailErr) {
        // Log but don't fail the request
        console.error("Email send error:", emailErr);
      }
    }

    return NextResponse.json({
      message: "You're on the list!",
      position,
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
    .from("candidate_waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
