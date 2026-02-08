import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import {
  employerConfirmationHtml,
  adminEmployerNotificationHtml,
} from "@/lib/emails";

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
      console.error("Supabase employer-waitlist error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Something went wrong. Please try again.", detail: error.message, code: error.code, hint: error.hint },
        { status: 500 }
      );
    }

    // Send emails (non-blocking — don't let email failures break the form)
    if (resend) {
      try {
        await Promise.all([
          // Confirmation to employer
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `Request received, ${contactName}! — FQHC Talent Exchange`,
            html: employerConfirmationHtml({ contactName, orgName }),
          }),
          // Notification to admin
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `New Employer Request: ${orgName}`,
            html: adminEmployerNotificationHtml({
              orgName,
              contactName,
              contactTitle,
              email,
              phone,
              positionsCount,
              rolesNeeded,
              programsActive,
              ehrSystem,
              timeline,
              notes,
            }),
          }),
        ]);
      } catch (emailErr) {
        // Log but don't fail the request
        console.error("Email send error:", emailErr);
      }
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
