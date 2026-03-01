/* ------------------------------------------------------------------ */
/*  Newsletter Send Utility                                            */
/*  Queries subscribers, renders templates, sends via Resend           */
/*  Call from a cron job, API endpoint, or manually                    */
/* ------------------------------------------------------------------ */

import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import {
  intelBriefHtml,
  intelBriefSubject,
  pulseHtml,
  pulseSubject,
  type IntelBriefContent,
  type PulseContent,
} from "@/lib/newsletter-templates";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Subscriber {
  id: string;
  email: string;
  audience: "intel-brief" | "the-pulse" | "both";
  region: string | null;
  unsubscribe_token: string;
}

interface SendResult {
  total: number;
  sent: number;
  failed: number;
  errors: { email: string; error: string }[];
}

/* ------------------------------------------------------------------ */
/*  Get Active Subscribers                                             */
/* ------------------------------------------------------------------ */

export async function getActiveSubscribers(
  audience: "intel-brief" | "the-pulse",
): Promise<Subscriber[]> {
  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id, email, audience, region, unsubscribe_token")
    .eq("status", "active")
    .or(`audience.eq.${audience},audience.eq.both`);

  if (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }

  return (data || []) as Subscriber[];
}

/* ------------------------------------------------------------------ */
/*  Send Intel Brief                                                   */
/* ------------------------------------------------------------------ */

export async function sendIntelBrief(
  content: IntelBriefContent,
): Promise<SendResult> {
  const subscribers = await getActiveSubscribers("intel-brief");
  const subject = intelBriefSubject(content);
  const result: SendResult = {
    total: subscribers.length,
    sent: 0,
    failed: 0,
    errors: [],
  };

  if (!resend) {
    console.warn("Resend not configured — skipping email send.");
    return { ...result, failed: result.total, errors: [{ email: "*", error: "Resend not configured" }] };
  }

  const resendClient = resend; // narrow for use inside async callbacks

  // Send in batches of 10 to avoid rate limits
  const BATCH_SIZE = 10;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);

    const promises = batch.map(async (sub) => {
      try {
        const html = intelBriefHtml(content, sub.unsubscribe_token);
        await resendClient.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject,
          html,
        });
        result.sent++;
      } catch (err) {
        result.failed++;
        result.errors.push({
          email: sub.email,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    });

    await Promise.all(promises);

    // Brief pause between batches
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  // Log send record
  try {
    await supabaseAdmin.from("newsletter_sends").insert({
      track: "intel-brief",
      issue_number: content.issueNumber,
      subject,
      total_recipients: result.total,
      sent_count: result.sent,
      failed_count: result.failed,
      sent_at: new Date().toISOString(),
    });
  } catch {
    console.error("Failed to log newsletter send record");
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Send The Pulse                                                     */
/* ------------------------------------------------------------------ */

export async function sendPulse(
  content: PulseContent,
): Promise<SendResult> {
  const subscribers = await getActiveSubscribers("the-pulse");
  const subject = pulseSubject(content);
  const result: SendResult = {
    total: subscribers.length,
    sent: 0,
    failed: 0,
    errors: [],
  };

  if (!resend) {
    console.warn("Resend not configured — skipping email send.");
    return { ...result, failed: result.total, errors: [{ email: "*", error: "Resend not configured" }] };
  }

  const resendClient = resend; // narrow for use inside async callbacks

  // Send in batches of 10
  const BATCH_SIZE = 10;
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);

    const promises = batch.map(async (sub) => {
      try {
        const html = pulseHtml(content, sub.unsubscribe_token);
        await resendClient.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject,
          html,
        });
        result.sent++;
      } catch (err) {
        result.failed++;
        result.errors.push({
          email: sub.email,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    });

    await Promise.all(promises);

    // Brief pause between batches
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  // Log send record
  try {
    await supabaseAdmin.from("newsletter_sends").insert({
      track: "the-pulse",
      issue_number: content.issueNumber,
      subject,
      total_recipients: result.total,
      sent_count: result.sent,
      failed_count: result.failed,
      sent_at: new Date().toISOString(),
    });
  } catch {
    console.error("Failed to log newsletter send record");
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Preview (returns HTML without sending)                             */
/* ------------------------------------------------------------------ */

export function previewIntelBrief(content: IntelBriefContent): string {
  return intelBriefHtml(content, "preview-token-not-real");
}

export function previewPulse(content: PulseContent): string {
  return pulseHtml(content, "preview-token-not-real");
}
