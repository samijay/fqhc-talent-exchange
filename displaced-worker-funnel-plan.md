# Displaced Worker Fast-Track Funnel — Implementation Plan

## Business Context & Strategic Fit

### Why This Feature Matters

The FQHC Talent Exchange already has the **blog content** (Medi-Cal funding cuts article) and the **FQHC database** (87 orgs with programs, EHR, staffing) — but the current signup flows treat all candidates equally. A displaced worker who was laid off yesterday and has 5 years of ECM experience goes through the same 5-day process as someone casually browsing.

**The Displaced Worker Funnel creates a third, accelerated path:**
- Regular candidate → `/join` → 5-day intro guarantee
- Detailed candidate → `/for-job-seekers` → 5-day intro guarantee
- **Displaced worker → `/fast-track` → 48-hour intro guarantee**

### Pitch Deck Alignment

This feature directly supports the **Talent Drop** concept from the pitch deck:
- Displaced workers are "pre-packaged" talent — they already have FQHC experience, EHR familiarity, and program knowledge
- Employers get a curated batch of immediately-available, verified candidates
- The 48-hour promise is credible because these workers don't need 2-week notice periods
- Creates urgency and exclusivity for employers: "These candidates won't be available long"

### Revenue Implications

- **Free for displaced workers** (always free for candidates)
- **Premium for employers**: Fast-track candidate pool could be a paid feature — "Get first access to displaced talent before they're on the general waitlist"
- **Marketing value**: Positions FQHC Talent Exchange as a safety net during industry disruptions — builds brand loyalty

---

## Two Entry Points

### Entry Point 1: Employer-Initiated Offboarding (Future Phase)

When an FQHC is doing layoffs, they can opt-in to register their affected staff:
- Employer submits a batch list of affected employees (names, emails, roles, last day)
- Platform sends invitations to those employees with a "verified displaced" status
- Workers who accept get auto-verified and enter the fast-track pool
- **Benefit to laying-off employer**: Demonstrates good faith, helps staff land on their feet
- **Benefit to platform**: Pre-verified candidates with known skills and experience

### Entry Point 2: Worker Self-Signup (MVP — Build Now)

Workers who were recently laid off can self-register through a dedicated fast-track form:
- Short form optimized for speed (under 2 minutes)
- Verification: self-reported (MVP), with optional layoff notice upload (future)
- "Available Now" badge applied to their profile
- **48-hour intro guarantee** (vs. standard 5-day)

---

## MVP Implementation Plan

### Part 1: Database

**New Supabase table: `displaced_candidates`**

```sql
CREATE TABLE displaced_candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Personal info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,

  -- Displacement details
  previous_employer TEXT,                      -- FQHC they were laid off from
  previous_role TEXT NOT NULL,                 -- Their last role
  layoff_date DATE,                            -- When they were/will be laid off
  available_start TEXT DEFAULT 'immediately',  -- immediately, within_1_week, within_2_weeks

  -- FQHC-specific qualifications (revenue-generating focus)
  years_experience TEXT NOT NULL,              -- Less than 1, 1-3, 3-5, 5-10, 10+
  programs TEXT[] DEFAULT '{}',               -- ECM, CCM, Community Supports, TCM, BH-ASO
  ehr_systems TEXT[] DEFAULT '{}',            -- OCHIN Epic, NextGen, eClinicalWorks, etc.
  bilingual TEXT DEFAULT 'no',                -- spanish_english, other, no

  -- Geographic flexibility
  current_region TEXT,                         -- Where they currently are
  open_to_regions TEXT[] DEFAULT '{}',        -- Regions willing to work in
  willing_to_relocate BOOLEAN DEFAULT FALSE,

  -- Fast-track specific
  has_resume BOOLEAN DEFAULT FALSE,           -- Did they upload/build resume?
  resume_profile_id UUID REFERENCES resume_profiles(id),
  assessment_results JSONB,                   -- Career Insights Assessment results
  verification_status TEXT DEFAULT 'self_reported',  -- self_reported, document_uploaded, employer_verified

  -- Status tracking
  status TEXT DEFAULT 'new',                  -- new, reviewing, matched, placed, inactive
  matched_at TIMESTAMPTZ,
  notes TEXT
);

-- Index for quick lookups
CREATE INDEX idx_displaced_candidates_status ON displaced_candidates(status);
CREATE INDEX idx_displaced_candidates_programs ON displaced_candidates USING GIN(programs);
CREATE INDEX idx_displaced_candidates_regions ON displaced_candidates USING GIN(open_to_regions);
```

**Migration file:** `supabase-displaced-candidates.sql`

---

### Part 2: Fast-Track Landing Page

**Route:** `src/app/[locale]/fast-track/page.tsx`

**Design:**
- Urgent, empathetic tone — NOT corporate or generic
- Teal primary with amber accent (matches site)
- Mobile-first (these workers may be filling out on their phone right after being told)
- EN/ES bilingual (critical — many displaced CHWs are bilingual)

**Page Structure:**

```
┌─────────────────────────────────────────────────┐
│  🚀 Were You Recently Laid Off from an FQHC?   │
│                                                   │
│  You have experience that FQHCs across            │
│  California need RIGHT NOW.                       │
│                                                   │
│  We'll connect you with hiring FQHCs              │
│  within 48 hours — not weeks.                     │
│                                                   │
│  [Start Your Fast-Track Profile →]                │
│                                                   │
│  ✓ 100% free   ✓ 48-hour intro   ✓ No account   │
│  ✓ Available-now badge   ✓ Priority matching      │
└─────────────────────────────────────────────────┘

Stats bar: [X] displaced workers placed | [Y] hiring FQHCs | 48hr avg match

── WHY FAST-TRACK? ──

Three cards:
1. "You're Immediately Available"
   No 2-week notice. Employers who need staff NOW want you.

2. "You're Already Trained"
   Your ECM/CCM/EHR experience transfers directly. No ramp-up.

3. "We Advocate For You"
   A real person reviews your profile and makes direct intros.

── THE FORM (single page, 6 sections) ──

Section 1: Who You Are
  - First name, Last name, Email, Phone

Section 2: Your Situation
  - Previous employer (text or dropdown of known FQHCs)
  - Previous role (dropdown)
  - Approximate layoff date (date picker)
  - When can you start? (radio: Immediately / Within 1 week / Within 2 weeks)

Section 3: Your FQHC Experience
  - Years of FQHC experience (dropdown)
  - Programs you've worked in (checkboxes: ECM, CCM, Community Supports, TCM, BH-ASO)
  - EHR systems (checkboxes: OCHIN Epic, NextGen, eClinicalWorks, Cerner, athenahealth)

Section 4: Languages & Location
  - Bilingual? (radio: Spanish/English, Other language, No)
  - Current region (dropdown)
  - Open to working in (multi-select checkboxes: LA, San Diego, Bay Area, Sacramento, Central Valley, Inland Empire, All of CA)
  - Willing to relocate? (checkbox)

Section 5: Your Resume (Optional)
  - "Already have an FQHC-ready resume?"
  - [Upload Resume] or [Build One Free →] (links to resume builder)

Section 6: Anything Else?
  - Notes textarea (optional, 300 char)

[Submit: Get Fast-Tracked →]

── SUCCESS SCREEN ──

"You're In the Fast-Track Pool, [First Name]!"

Timeline cards:
1. "Right Now" — Your profile is in our fast-track queue
2. "Within 24 Hours" — A placement advocate reviews your qualifications
3. "Within 48 Hours" — You'll receive your first FQHC introduction

"While You Wait" section:
- [Build Your Free Resume] if they didn't upload one
- [Take Career Insights Assessment] to strengthen their profile
- [Browse Open Positions] → /jobs

── ENTRY POINTS (link from existing pages) ──

1. Medi-Cal blog article CTA → "/fast-track"
2. Homepage banner (conditional/seasonal) → "/fast-track"
3. /join page → "Were you recently laid off? [Fast-track your application →]"
4. /for-job-seekers → "Displaced from an FQHC? [Get fast-tracked →]"
5. Nav dropdown or banner (optional)
```

---

### Part 3: API Route

**File:** `src/app/api/displaced-candidates/route.ts`

```typescript
// POST: Submit displaced candidate profile
// - Validate required fields
// - Upsert to Supabase displaced_candidates table
// - Send confirmation email via Resend (with fast-track timeline)
// - Send admin notification with full profile
// - Return { message, data }

// GET: Return count of displaced candidates (for stats display)
```

**Email Templates:**

**Candidate confirmation:**
- Subject: "You're in the Fast-Track Pool, [First Name]"
- Body: 48-hour timeline, what to expect, links to resume builder & assessment
- Tone: Urgent but warm

**Admin notification:**
- Subject: "⚡ FAST-TRACK: [Name] — [Role] from [Previous Employer]"
- Body: Full profile with programs, EHR, availability, region preferences
- Priority: High (faster than regular candidate notifications)

---

### Part 4: Integration Points

**A. Medi-Cal Blog Article Update**
- Change existing CTA from "Build Your Free Resume" to dual CTA:
  - "Build Your Free Resume" (existing)
  - "Fast-Track Your Job Search →" (new, links to /fast-track)

**B. /join Page Cross-Link**
- Add a banner at top of candidate waitlist form:
  ```
  ┌─────────────────────────────────────────┐
  │  ⚡ Recently laid off from an FQHC?     │
  │  Skip the line — get matched in 48hrs   │
  │  [Go to Fast-Track →]                   │
  └─────────────────────────────────────────┘
  ```

**C. Homepage (Optional)**
- Add a conditional banner below hero:
  ```
  ┌─────────────────────────────────────────┐
  │  Affected by recent FQHC layoffs?       │
  │  We're fast-tracking displaced workers.  │
  │  [Learn More →]                         │
  └─────────────────────────────────────────┘
  ```

**D. Sitemap & SEO**
- Add `/fast-track` to sitemap
- SEO metadata targeting "FQHC layoffs California", "community health worker laid off", "Medi-Cal funding cuts jobs"

**E. Blog Article**
- Write a dedicated blog post: "Laid Off from an FQHC? Here's How to Get Rehired in 48 Hours"
- Links to /fast-track as primary CTA

---

### Part 5: For Employers (Phase 2)

**Employer Dashboard Enhancement:**

On the employer side (`/hire` or `/for-employers`), add an option:

```
┌─────────────────────────────────────────────────┐
│  ⚡ Fast-Track Candidates Available              │
│                                                   │
│  [X] experienced FQHC workers are immediately    │
│  available — no 2-week notice needed.            │
│                                                   │
│  Programs: ECM (12), CCM (8), Community          │
│  Supports (15), BH-ASO (4)                       │
│                                                   │
│  [View Fast-Track Talent Pool →]                 │
│  (Premium feature — contact us)                  │
└─────────────────────────────────────────────────┘
```

**Employer-Initiated Offboarding (Phase 3):**

For employers doing layoffs, add a form at `/hire/offboard`:
- Upload a CSV of affected staff (name, email, role, last day)
- Platform sends invitations with pre-filled profiles
- Workers who accept are auto-verified and enter fast-track pool
- Employer gets credit/goodwill and optional priority access to talent from other FQHCs

---

## Implementation Order

### Phase 1: MVP (This Session or Next)
1. Create `supabase-displaced-candidates.sql` migration
2. Build `/fast-track` page with form (EN/ES)
3. Build `POST /api/displaced-candidates` route with Resend emails
4. Add cross-links from `/join` page and Medi-Cal blog article
5. Update sitemap
6. Build, verify, commit

### Phase 2: Enhancement (Future Session)
7. Write dedicated "Fast-Track" blog article
8. Add homepage banner
9. Add fast-track stats to homepage (displaced workers placed)
10. Employer-side visibility of fast-track pool

### Phase 3: Employer Offboarding (Future)
11. Employer offboarding form at `/hire/offboard`
12. Batch invitation system
13. Employer verification flow
14. Dashboard for employers to see displaced talent

---

## File Inventory

| File | Action | Description |
|------|--------|-------------|
| `supabase-displaced-candidates.sql` | NEW | Database migration |
| `src/app/[locale]/fast-track/page.tsx` | NEW | Fast-track landing page + form (EN/ES) |
| `src/app/api/displaced-candidates/route.ts` | NEW | API for form submission |
| `src/app/[locale]/join/page.tsx` | MODIFY | Add fast-track cross-link banner |
| `src/app/[locale]/blog/medi-cal-funding-cuts.../page.tsx` | MODIFY | Update CTA to include fast-track link |
| `src/app/sitemap.ts` | MODIFY | Add /fast-track |
| `messages/en.json` | MODIFY | Add fast-track translations |
| `messages/es.json` | MODIFY | Add fast-track translations |

---

## Verification

1. `npm run build` passes
2. `/fast-track` page loads with form
3. Form submission saves to Supabase
4. Confirmation email sent to candidate
5. Admin notification sent
6. Cross-links work from `/join` and Medi-Cal blog
7. Spanish version renders correctly at `/es/fast-track`
8. Mobile responsive
