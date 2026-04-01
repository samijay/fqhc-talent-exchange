/**
 * Lightweight client-side event tracking for FQHC Talent tools.
 *
 * Fires and forgets — tracking never blocks or breaks the user experience.
 * Events are sent to /api/track-event and stored in the tool_events table.
 */

export type TrackEventType =
  | "okr_download"
  | "okr_download_all"
  | "course_enroll"
  | "course_complete"
  | "simulator_run"
  | "resume_create"
  | "pathway_start"
  | "pathway_complete"
  | "assessment_complete"
  | "assessment_download";

export interface TrackEventPayload {
  event_type: TrackEventType;
  tool_name: string;
  item_id?: string;
  email?: string;
  metadata?: Record<string, unknown>;
  locale?: "en" | "es";
}

/**
 * Track a tool usage event. Fire-and-forget — never throws.
 *
 * @example
 * trackEvent({
 *   event_type: "okr_download",
 *   tool_name: "okr-templates",
 *   item_id: "financial-survival-2026",
 *   locale: "en",
 * });
 */
export function trackEvent(payload: TrackEventPayload): void {
  // Don't track in development
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    console.debug("[track]", payload.event_type, payload.tool_name, payload.item_id);
    return;
  }

  // Fire and forget — use navigator.sendBeacon for reliability on page unload,
  // fall back to fetch for normal interactions
  try {
    const body = JSON.stringify(payload);

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track-event",
        new Blob([body], { type: "application/json" })
      );
    } else {
      fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Silent fail
      });
    }
  } catch {
    // Silent fail — tracking should never disrupt
  }
}

/**
 * Sync course progress to server. Returns true if synced, false on failure.
 *
 * @example
 * const synced = await syncProgress({
 *   email: "user@example.com",
 *   course_id: "okr-course",
 *   modules_completed: ["mod-1", "mod-2"],
 *   total_xp: 350,
 * });
 */
export async function syncProgress(payload: {
  email: string;
  course_id: string;
  modules_completed?: string[];
  exercise_scores?: Record<string, number>;
  total_xp?: number;
  current_module_id?: string;
  capstone_data?: Record<string, unknown>;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/course-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Retrieve course progress from server.
 * Returns null if no progress found or on error.
 */
export async function getServerProgress(
  email: string,
  courseId: string
): Promise<{
  modules_completed: string[];
  exercise_scores: Record<string, number>;
  total_xp: number;
  current_module_id: string | null;
  capstone_data: Record<string, unknown> | null;
  last_active_at: string;
} | null> {
  try {
    const res = await fetch(
      `/api/course-progress?email=${encodeURIComponent(email)}&course_id=${encodeURIComponent(courseId)}`
    );
    if (!res.ok) return null;
    const { progress } = await res.json();
    return progress;
  } catch {
    return null;
  }
}
