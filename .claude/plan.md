# Plan: Learning Content Organization + Certification Relevancy + Google Sign-In

## Context

We have **10+ learning systems** (pathways, academy, masterclass, research archive, OKR course, certifications, guides, resources, career roadmap, interview prep, resume builder, compliance hub) that operate as **separate silos**. Users can't discover what's relevant to them, progress doesn't carry across systems, and some role-based buttons link to empty results (e.g., HR role → certifications page showing zero HR certs — now partially fixed with 10 new back-office certs added this session).

## Three Problems

1. **Certification relevancy is broken** — role IDs are inconsistent across 4 systems, no query parameter support for deep-linking, and `getCertificationsForFQHC()` references a non-existent `"social-worker"` role
2. **Learning content is siloed** — no unified discovery or progress tracking across 10+ systems
3. **Google sign-in branding** — code is 100% built, needs manual setup in Google Cloud Console + Supabase

---

## Phase 1: Fix Certification Relevancy (code changes)

### Step 1.1 — Create role registry (single source of truth)
Create `src/lib/role-registry.ts` — one canonical list of all FQHC role IDs with display names (EN/ES) and categories. All other files derive from this instead of maintaining separate hardcoded lists.

### Step 1.2 — Fix broken references
- Remove `"social-worker"` from `getCertificationsForFQHC()` in certification-data.ts (line ~1384)
- Align ROLE_OPTIONS in certifications/page.tsx to include all roles that have certs (add hr_manager, payroll_specialist, finance_manager, compliance_officer, privacy_officer, quality_officer)
- Update learning-pathways.ts PATHWAY_ROLES to match

### Step 1.3 — Add query parameter support for role filtering
- Update `/certifications` page to read `?role=hr_manager` from URL and pre-select that filter
- Update ProfileTabs CareerTab to link to `/certifications?role=${relevantRole}` instead of bare `/certifications`
- Add certification deep-links from career-roadmap levels
- Add certification deep-links from pathway steps

### Step 1.4 — Fill certification gaps for career pathway roles
Ensure every role in career-pathways.ts has at least 1 certification in `helpfulFor`. For roles like `bh-technician`, `charge-nurse`, `cno`, `director-finance` — map to existing certs (e.g., charge-nurse → registered_nurse certs, cno → registered_nurse + leadership certs, director-finance → CHFP).

---

## Phase 2: Unify Learning Content Discovery (code changes)

### Step 2.1 — Wire Academy hub as the central discovery point
- Add research curriculum tracks (Clinician, Non-Clinician) as courses in academy-catalog.ts
- Add Masterclass as a browsable course in academy-catalog
- Ensure "Continue Where You Left Off" reads from all progress sources (pathways + syllabi + courses)

### Step 2.2 — Add cross-navigation breadcrumbs
- From any learning page (masterclass, research, guides, certs), add "← Back to Academy" link
- From pathway steps that link to external pages, add "You're on step 3 of 5 in your CHW pathway" persistent banner or breadcrumb

### Step 2.3 — Role-based content discovery
- On Academy hub, add "Recommended for your role" section
- When a user selects a role (from pathway or assessment), show relevant: certs, guides, masterclass modules, resources, career roadmap level — all on one screen
- This is the key UX fix: instead of navigating 6 separate pages, see everything for "CHW" or "HR Manager" in one place

### Step 2.4 — Complete remaining research curriculum tracks
- Write Public Health curriculum track (15 lessons with expert narratives)
- Write Executive curriculum track (15 lessons with expert narratives)
- Wire both into SyllabusReader + Academy catalog

---

## Phase 3: Google Sign-In Setup (manual steps — no code)

### Step 3.1 — Google Cloud Console
1. Go to https://console.cloud.google.com
2. Create a new project (or use existing): "FQHC Talent Exchange"
3. APIs & Services → OAuth consent screen
   - User Type: External
   - App name: **"FQHC Talent Exchange"** (this is what users see!)
   - User support email: hello@fqhctalent.com
   - App logo: upload the teal/amber heart logo
   - Authorized domains: `fqhctalent.com`, `supabase.co`
   - Developer contact: hello@fqhctalent.com
4. APIs & Services → Credentials → Create OAuth 2.0 Client ID
   - Application type: Web application
   - Name: "FQHC Talent Production"
   - Authorized redirect URI: `https://jwaeiteocbiavlydkzjt.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret

### Step 3.2 — Supabase Dashboard
1. Go to Supabase Dashboard → Authentication → Providers
2. Find Google → Enable
3. Paste Client ID and Client Secret
4. Save

### Step 3.3 — Verify
1. Visit https://www.fqhctalent.com/login
2. Click "Continue with Google"
3. Confirm consent screen shows **"FQHC Talent Exchange"** (not "Vercel" or generic)
4. Complete sign-in → should redirect to /dashboard

### Step 3.4 — Run auth SQL (if not already done)
Run `supabase-auth-dashboard.sql` in Supabase SQL Editor to create user_profiles, user_favorites, user_watchlist tables.

---

## Implementation Order

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 1 | Phase 1 (cert relevancy fixes) | ~2 hours | Fixes broken UX — buttons that lead to empty results |
| 2 | Phase 3 (Google sign-in) | ~15 min manual | Unblocks user accounts |
| 3 | Phase 2.1-2.3 (Academy unification) | ~3 hours | Makes 10+ content systems discoverable |
| 4 | Phase 2.4 (remaining curricula) | ~2 hours | Completes research archive |

## Files Modified

| File | Changes |
|------|---------|
| `src/lib/role-registry.ts` | **NEW** — canonical role definitions |
| `src/lib/certification-data.ts` | Fix social-worker ref, update helpfulFor mappings |
| `src/app/[locale]/certifications/page.tsx` | Add URL query param support, expand ROLE_OPTIONS |
| `src/components/directory/ProfileTabs.tsx` | Deep-link certs with role param |
| `src/app/[locale]/career-roadmap/page.tsx` | Add cert links per level |
| `src/lib/academy-catalog.ts` | Add research tracks + masterclass as courses |
| `src/lib/learning-progress.ts` | Aggregate from all progress sources |
| `src/app/[locale]/academy/page.tsx` | Role-based recommendations section |
| `src/lib/research-syllabus-content.ts` | Public Health + Executive track content |
