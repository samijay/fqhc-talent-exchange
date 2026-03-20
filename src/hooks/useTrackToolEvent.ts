"use client";

import { useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { trackEvent, type TrackEventPayload } from "@/lib/track";

/**
 * Wrapper around trackEvent that auto-includes the authenticated user's email.
 * This ensures tool_events can be queried per-user in the dashboard "My Creations" section.
 */
export function useTrackToolEvent() {
  const { user } = useAuth();

  const track = useCallback(
    (payload: Omit<TrackEventPayload, "email">) => {
      trackEvent({
        ...payload,
        email: user?.email ?? undefined,
      });
    },
    [user?.email]
  );

  return track;
}
