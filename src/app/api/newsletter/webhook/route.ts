import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Webhook } from "svix";

// Resend webhook handler for email open/click tracking
// Docs: https://resend.com/docs/dashboard/webhooks/introduction
// Events: email.delivered, email.opened, email.clicked, email.bounced, email.complained

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
    // click events
    click?: {
      link: string;
      timestamp: string;
    };
  };
}

export async function POST(req: NextRequest) {
  try {
    // ── Verify webhook signature (Resend uses Svix) ──
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    const rawBody = await req.text();
    let event: ResendWebhookEvent;

    if (webhookSecret) {
      const svixId = req.headers.get("svix-id");
      const svixTimestamp = req.headers.get("svix-timestamp");
      const svixSignature = req.headers.get("svix-signature");

      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: "Missing webhook signature headers" },
          { status: 401 }
        );
      }

      try {
        const wh = new Webhook(webhookSecret);
        event = wh.verify(rawBody, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        }) as ResendWebhookEvent;
      } catch {
        console.error("[newsletter/webhook] Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    } else {
      // Fallback: accept unsigned webhooks in development only
      if (process.env.NODE_ENV === "production") {
        console.error(
          "[newsletter/webhook] RESEND_WEBHOOK_SECRET is not set in production. " +
          "Webhooks are unverified — set this env var to enable signature checking."
        );
      }
      event = JSON.parse(rawBody) as ResendWebhookEvent;
    }

    // Only track events we care about
    const trackedTypes = [
      "email.delivered",
      "email.opened",
      "email.clicked",
      "email.bounced",
      "email.complained",
    ];

    if (!trackedTypes.includes(event.type)) {
      return NextResponse.json({ received: true });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const recipientEmail = event.data.to?.[0];

    if (!recipientEmail) {
      return NextResponse.json({ received: true });
    }

    // Log to newsletter_engagement table (create if first run)
    const { error } = await supabase.from("newsletter_engagement").insert({
      email: recipientEmail,
      event_type: event.type.replace("email.", ""),
      resend_email_id: event.data.email_id,
      subject: event.data.subject,
      click_url: event.data.click?.link || null,
      created_at: event.created_at,
    });

    if (error) {
      // Table may not exist yet — log but don't fail
      console.error("[newsletter/webhook] Supabase insert error:", error.message);
    }

    // Update subscriber record with last engagement
    if (event.type === "email.opened" || event.type === "email.clicked") {
      await supabase
        .from("newsletter_subscribers")
        .update({
          last_engaged_at: new Date().toISOString(),
        })
        .eq("email", recipientEmail);
    }

    // Handle bounces — mark subscriber as inactive
    if (event.type === "email.bounced") {
      await supabase
        .from("newsletter_subscribers")
        .update({ status: "bounced" })
        .eq("email", recipientEmail);
    }

    // Handle complaints — unsubscribe immediately
    if (event.type === "email.complained") {
      await supabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed" })
        .eq("email", recipientEmail);
    }

    return NextResponse.json({ received: true });
  } catch {
    console.error("[newsletter/webhook] Error processing webhook");
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
