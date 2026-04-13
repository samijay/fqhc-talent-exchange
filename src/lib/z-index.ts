/**
 * Z-index scale for consistent stacking context.
 * Use these constants instead of arbitrary z-[N] values.
 *
 * Layer guide:
 * - Content: 0 (default)
 * - Sticky elements: 10-20
 * - Dropdowns/popovers: 30-40
 * - Fixed UI (header, back-to-top): 40-50
 * - Modals/sheets: 50-60
 * - Toasts/notifications: 60-70
 * - Skip-nav/critical overlays: 9999
 */
export const Z = {
  /** Default content layer */
  content: 0,
  /** Sticky table headers, TOC sidebar */
  sticky: 10,
  /** Dropdown menus, popovers, tooltips */
  dropdown: 30,
  /** Fixed header navigation */
  header: 40,
  /** Back-to-top button, feedback widget */
  float: 45,
  /** Modal/sheet overlays */
  modal: 50,
  /** Toast notifications (sonner) */
  toast: 60,
  /** Skip-navigation link */
  skipNav: 9999,
} as const;

export type ZLayer = keyof typeof Z;
