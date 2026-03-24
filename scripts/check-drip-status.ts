import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function main() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, audience, drip_step, subscribed_at, status")
    .eq("status", "active")
    .lt("drip_step", 3);

  if (error) { console.error(error); return; }
  
  console.log(`Active subscribers with pending drips: ${data?.length ?? 0}\n`);
  
  const now = new Date();
  for (const sub of data ?? []) {
    const subscribed = new Date(sub.subscribed_at);
    const daysSince = Math.floor((now.getTime() - subscribed.getTime()) / 86_400_000);
    console.log(`${sub.email} | ${sub.audience} | step ${sub.drip_step} | subscribed ${daysSince} days ago (${sub.subscribed_at})`);
  }
}
main();
