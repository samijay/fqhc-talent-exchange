// analytics.ts — GA4 custom event tracking for FQHC Talent Exchange
// Wraps window.gtag() with type-safe helper functions.
// All events respect DNT and opt-out (GA script won't load if opted out,
// so gtag() simply won't exist — these calls become no-ops).

/* ------------------------------------------------------------------ */
/*  Type definitions                                                    */
/* ------------------------------------------------------------------ */

/** GA4 recommended event parameters */
interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

/** Safe gtag wrapper — no-op if gtag isn't loaded (DNT, opt-out, SSR) */
function trackEvent(eventName: string, params?: GtagEventParams): void {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }
}

/* ------------------------------------------------------------------ */
/*  Form submission events                                              */
/* ------------------------------------------------------------------ */

/** Newsletter signup */
export function trackNewsletterSignup(audience: string): void {
  trackEvent("newsletter_signup", {
    method: "form",
    audience, // "intel-brief" | "pulse" | "both"
  });
}

/** Candidate waitlist signup */
export function trackCandidateWaitlist(): void {
  trackEvent("generate_lead", {
    form_type: "candidate_waitlist",
    currency: "USD",
    value: 0,
  });
}

/** Employer waitlist signup */
export function trackEmployerWaitlist(): void {
  trackEvent("generate_lead", {
    form_type: "employer_waitlist",
    currency: "USD",
    value: 50,
  });
}

/** Offboarding intake form submission */
export function trackOffboardingIntake(tier: string): void {
  trackEvent("generate_lead", {
    form_type: "offboarding_intake",
    service_tier: tier,
    currency: "USD",
    value: 100,
  });
}

/** Fast-track / displaced worker signup */
export function trackFastTrackSignup(): void {
  trackEvent("generate_lead", {
    form_type: "fast_track",
    currency: "USD",
    value: 25,
  });
}

/** Feedback submission */
export function trackFeedbackSubmit(type: string): void {
  trackEvent("feedback_submit", {
    feedback_type: type, // "bug" | "suggestion" | "praise" | "other"
  });
}

/** Locum provider interest */
export function trackLocumProviderSignup(): void {
  trackEvent("generate_lead", {
    form_type: "locum_provider",
    currency: "USD",
    value: 75,
  });
}

/** Locum FQHC request */
export function trackLocumFQHCRequest(): void {
  trackEvent("generate_lead", {
    form_type: "locum_fqhc_request",
    currency: "USD",
    value: 150,
  });
}

/* ------------------------------------------------------------------ */
/*  CTA click events                                                    */
/* ------------------------------------------------------------------ */

/** External link click (job application, source URL, etc.) */
export function trackExternalLink(url: string, context: string): void {
  trackEvent("click", {
    link_url: url,
    link_context: context, // "job_application" | "source_link" | "fqhc_website"
    outbound: true,
  });
}

/** Calendly booking CTA */
export function trackCalendlyClick(context: string): void {
  trackEvent("calendly_click", {
    context, // "report" | "career_insights" | "hire" | "fast_track"
  });
}

/** Internal navigation CTA */
export function trackCTAClick(label: string, destination: string): void {
  trackEvent("cta_click", {
    cta_label: label,
    cta_destination: destination,
  });
}

/* ------------------------------------------------------------------ */
/*  Content engagement events                                           */
/* ------------------------------------------------------------------ */

/** Blog article view (beyond pageview — tracks which article) */
export function trackArticleView(slug: string, category: string): void {
  trackEvent("article_view", {
    article_slug: slug,
    article_category: category,
  });
}

/** Intel item expanded (user clicked to read more) */
export function trackIntelExpand(itemId: string, category: string): void {
  trackEvent("intel_expand", {
    item_id: itemId,
    intel_category: category,
  });
}

/** FQHC directory profile view */
export function trackFQHCProfileView(slug: string, name: string): void {
  trackEvent("view_item", {
    item_id: slug,
    item_name: name,
    item_category: "fqhc_profile",
  });
}

/** FQHC strategic report view */
export function trackReportView(slug: string): void {
  trackEvent("view_item", {
    item_id: slug,
    item_category: "strategic_report",
  });
}

/** Job listing click (external career page) */
export function trackJobClick(
  role: string,
  fqhc: string,
  region: string,
): void {
  trackEvent("job_click", {
    job_role: role,
    job_fqhc: fqhc,
    job_region: region,
  });
}

/* ------------------------------------------------------------------ */
/*  Tool usage events                                                   */
/* ------------------------------------------------------------------ */

/** Career assessment started */
export function trackAssessmentStart(role: string): void {
  trackEvent("assessment_start", {
    assessment_type: "career",
    selected_role: role,
  });
}

/** Career assessment completed */
export function trackAssessmentComplete(
  role: string,
  overallScore: number,
): void {
  trackEvent("assessment_complete", {
    assessment_type: "career",
    selected_role: role,
    score: overallScore,
  });
}

/** Manager team readiness assessment started */
export function trackManagerAssessmentStart(role: string): void {
  trackEvent("assessment_start", {
    assessment_type: "manager",
    selected_role: role,
  });
}

/** Manager team readiness assessment completed */
export function trackManagerAssessmentComplete(
  role: string,
  overallScore: number,
): void {
  trackEvent("assessment_complete", {
    assessment_type: "manager",
    selected_role: role,
    score: overallScore,
  });
}

/** Resume builder started */
export function trackResumeStart(): void {
  trackEvent("tool_use", { tool: "resume_builder", action: "start" });
}

/** Resume downloaded */
export function trackResumeDownload(template: string): void {
  trackEvent("tool_use", {
    tool: "resume_builder",
    action: "download",
    template,
  });
  // Also track server-side
  try {
    import("./track").then(({ trackEvent: serverTrack }) => {
      serverTrack({
        event_type: "resume_create",
        tool_name: "resume-builder",
        item_id: template,
      });
    });
  } catch { /* silent */ }
}

/** Clinic simulator interaction */
export function trackSimulatorUse(action: string): void {
  trackEvent("tool_use", { tool: "clinic_simulator", action });
}

/** FQHC comparison tool used */
export function trackCompareUse(fqhcCount: number): void {
  trackEvent("tool_use", {
    tool: "fqhc_compare",
    action: "compare",
    items_compared: fqhcCount,
  });
}

/** Learning pathway progress */
export function trackPathwayProgress(
  phase: string,
  stepsCompleted: number,
): void {
  trackEvent("tool_use", {
    tool: "learning_pathway",
    action: "progress",
    phase,
    steps_completed: stepsCompleted,
  });
}

/* ------------------------------------------------------------------ */
/*  Navigation events                                                   */
/* ------------------------------------------------------------------ */

/** News feed filter used */
export function trackNewsFilter(
  filterType: string,
  filterValue: string,
): void {
  trackEvent("filter_use", {
    filter_type: filterType, // "category" | "region"
    filter_value: filterValue,
  });
}

/** Language toggle */
export function trackLanguageToggle(newLocale: string): void {
  trackEvent("language_toggle", { locale: newLocale });
}

/** Search used (directory, jobs, compare) */
export function trackSearch(query: string, context: string): void {
  trackEvent("search", {
    search_term: query,
    search_context: context, // "directory" | "jobs" | "compare"
  });
}
