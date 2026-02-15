import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import {
  displacedCandidateConfirmationHtml,
  adminDisplacedCandidateNotificationHtml,
} from "@/lib/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      previousEmployer,
      previousRole,
      layoffDate,
      availableStart,
      yearsExperience,
      ehrSystems,
      programs,
      bilingual,
      currentRegion,
      openToRegions,
      willingToRelocate,
      notes,
      locale,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("displaced_candidates")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        previous_employer: previousEmployer || null,
        previous_role: previousRole || null,
        layoff_date: layoffDate || null,
        available_start: availableStart || "immediately",
        years_experience: yearsExperience || null,
        ehr_systems: ehrSystems || [],
        programs: programs || [],
        bilingual: bilingual || null,
        current_region: currentRegion || null,
        open_to_regions: openToRegions || [],
        willing_to_relocate: willingToRelocate || false,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already in the fast-track pool." },
          { status: 409 },
        );
      }
      console.error(
        "Supabase displaced-candidates error:",
        JSON.stringify(error, null, 2),
      );
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    // Send emails (non-blocking)
    if (resend) {
      try {
        await Promise.all([
          // Confirmation to candidate
          resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: locale === "es"
              ? `¡Estás en el grupo Fast-Track, ${firstName}! — FQHC Talent Exchange`
              : `You're in the Fast-Track pool, ${firstName}! — FQHC Talent Exchange`,
            html: displacedCandidateConfirmationHtml({ firstName, locale }),
          }),
          // Admin notification (priority)
          resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `⚡ FAST-TRACK: ${firstName} ${lastName} — ${previousRole || "Displaced Worker"}`,
            html: adminDisplacedCandidateNotificationHtml({
              firstName,
              lastName,
              email,
              phone,
              previousEmployer,
              previousRole,
              layoffDate,
              availableStart,
              yearsExperience,
              ehrSystems,
              programs,
              bilingual,
              currentRegion,
              openToRegions,
              willingToRelocate,
              notes,
            }),
          }),
        ]);
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    return NextResponse.json({
      message: "You're in the Fast-Track pool!",
      data,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}

export async function GET() {
  const { count, error } = await supabase
    .from("displaced_candidates")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
