import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo-config";

export const metadata: Metadata = pageMetadata.dashboard;

/**
 * Dashboard layout — server-side auth guard.
 *
 * If the user is not authenticated, redirect to the login page.
 * The dashboard is the only route in the site that requires auth.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return <>{children}</>;
}
