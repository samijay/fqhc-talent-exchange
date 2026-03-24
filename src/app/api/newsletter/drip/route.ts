import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { getDripEmail, getDripDays } from "@/lib/drip-templates";
import { verifySecret } from "@/lib/security";

/* ------------------------------------------------------------------ */
/*  GET /api/newsletter/drip                                           */
/*  Called by Vercel cron once daily (17:00 UTC = 9:00 AM Pacific).  */
/*  Sends the next drip email to each subscriber who is due.          */
/*                                                                     */
/*  Auth: Authorization: Bearer {NEWSLETTER_SECRET}                   */
/*  Vercel cron setup: set CRON_SECRET = value of NEWSLETTER_SECRET   */
/*  in your Vercel project settings so Vercel sends the right token.  */
/* ------------------------------------------------------------------ */

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET(request: Request) {
  // Auth — same pattern as /api/newsletter/send
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Newsletter sending not configured. Set NEWSLETTER_SECRET env var." },
      { status: 503 }
    );
  }
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token || !verifySecret(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!resend) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  try {
    // Fetch active subscribers who still have drip steps to receive
    const { data: subscribers, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, email, audience, drip_step, subscribed_at, unsubscribe_token")
      .eq("status", "active")
      .lt("drip_step", 3); // max 3 drip emails (steps 0–2)

    if (error) {
      console.error("[drip] Supabase fetch error:", error.message);
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ sent: 0, skipped: 0 });
    }

    const now = new Date();
    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map(async (sub) => {
          const { id, email, audience, drip_step, subscribed_at, unsubscribe_token } = sub;

          const dripDays = getDripDays(audience as string);
          const stepIndex = drip_step as number;

          if (stepIndex >= dripDays.length) {
            skipped++;
            return;
          }

          const daysNeeded = dripDays[stepIndex];
          const subscribedDate = new Date(subscribed_at as string);
          const dueAt = new Date(subscribedDate.getTime() + daysNeeded * 86_400_000);

          if (now < dueAt) {
            skipped++;
            return;
          }

          const unsubUrl = `https://www.fqhctalent.com/api/newsletter/unsubscribe?token=${unsubscribe_token}`;
          const emailContent = getDripEmail(audience as string, stepIndex, unsubUrl);

          if (!emailContent) {
            skipped++;
            return;
          }

          try {
            await resend!.emails.send({
              from: FROM_EMAIL,
              to: email as string,
              subject: emailContent.subject,
              html: emailContent.html,
            });

            // Increment drip_step on success
            const { error: updateError } = await supabaseAdmin
              .from("newsletter_subscribers")
              .update({ drip_step: stepIndex + 1 })
              .eq("id", id);

            if (updateError) {
              console.error(`[drip] Failed to update drip_step for ${email}:`, updateError.message);
              errors.push(email as string);
            } else {
              sent++;
            }
          } catch (emailErr) {
            console.error(`[drip] Email send failed for ${email}:`, emailErr);
            errors.push(email as string);
          }
        })
      );

      if (i + BATCH_SIZE < subscribers.length) {
        await sleep(BATCH_DELAY_MS);
      }
    }

    console.log(`[drip] Completed: ${sent} sent, ${skipped} skipped, ${errors.length} errors`);
    // Don't return subscriber emails in response — PII protection
    return NextResponse.json({
      sent,
      skipped,
      ...(errors.length > 0 ? { errorCount: errors.length } : {}),
    });
  } catch (err) {
    console.error("[drip] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
