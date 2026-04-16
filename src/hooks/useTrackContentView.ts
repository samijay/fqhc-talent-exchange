"use client";

import { useEffect, useRef } from "react";
import { createAuthClient } from "@/lib/supabase-client";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Auto-tracks content page views for authenticated users.
 * Waits 3 seconds before recording to avoid accidental clicks.
 * Fires once per mount — no duplicate tracking on re-renders.
 */
export function useTrackContentView(
  contentType: string,
  contentId: string | undefined
) {
  const { user } = useAuth();
  const tracked = useRef(false);

  useEffect(() => {
    if (!user || !contentId || tracked.current) return;

    const timer = setTimeout(() => {
      if (tracked.current) return;
      tracked.current = true;

      const supabase = createAuthClient();
      supabase.from("content_reads").upsert(
        {
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
          status: "reading",
          last_read_at: new Date().toISOString(),
        },
        { onConflict: "user_id,content_type,content_id", ignoreDuplicates: false }
      ).then(() => {
        // Fire and forget — silent on error
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, contentType, contentId]);
}
