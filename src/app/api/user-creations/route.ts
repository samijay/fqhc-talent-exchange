import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";

const CREATION_EVENT_TYPES = [
  "resume_create",
  "okr_download",
  "okr_download_all",
  "assessment_complete",
  "simulator_run",
  "pathway_start",
  "pathway_complete",
];

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ creations: [] });
    }

    const { data, error } = await supabaseAdmin
      .from("tool_events")
      .select("event_type, tool_name, item_id, metadata, created_at")
      .eq("email", user.email)
      .in("event_type", CREATION_EVENT_TYPES)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("user-creations query error:", error.message);
      return NextResponse.json({ creations: [] });
    }

    return NextResponse.json({ creations: data ?? [] });
  } catch {
    return NextResponse.json({ creations: [] });
  }
}
