import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY?.trim();

if (!resendApiKey) {
  console.warn(
    "Missing RESEND_API_KEY environment variable. Email notifications will be disabled."
  );
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "fqhctalent@gmail.com";
export const FROM_EMAIL = process.env.FROM_EMAIL || "FQHC Talent Exchange <onboarding@resend.dev>";
