# CTA Archive

All call-to-action code removed in commit 978eee2 ("Remove all CTAs — convert site to free resource only"). Organized here for easy re-enablement.

## What's Here

### Components
| File | What It Did |
|------|-------------|
| `components/booking/BookingCTA.tsx` | Reusable Calendly booking card with 4 variants (candidate, employer, fastTrack, manager). Used on CareerInsights, CareerAssessment, TeamReadiness, demo, fast-track, hire. |

### Libraries
| File | What It Did |
|------|-------------|
| `lib/booking-config.ts` | `CALENDLY_URL`, `BOOKING_THRESHOLDS` (score-based CTA display), `BOOKING_VARIANTS` (copy per audience). |
| `lib/emails.ts` | 8 email templates: candidate/employer/displaced/offboarding confirmations + admin notifications. Uses Resend. |
| `lib/email-helpers-cta.ts` | 3 CTA-only email helpers extracted from `src/lib/email-helpers.ts`: `candidateResourceLinks()`, `employerResourceLinks()`, `dropTeaser()`. |

### API Routes
| File | Endpoint | Supabase Table |
|------|----------|----------------|
| `api/candidate-waitlist/route.ts` | POST `/api/candidate-waitlist` | `candidate_waitlist` |
| `api/employer-waitlist/route.ts` | POST `/api/employer-waitlist` | `employer_waitlist` |
| `api/displaced-candidates/route.ts` | POST `/api/displaced-candidates` | `displaced_candidates` |
| `api/offboarding-intake/route.ts` | POST `/api/offboarding-intake` | `offboarding_intake` |
| `api/drop-waitlist/route.ts` | POST `/api/drop-waitlist` | `drop_waitlist` |

### SQL Migrations
| File | Tables |
|------|--------|
| `sql/supabase-waitlist-migration.sql` | `candidate_waitlist`, `employer_waitlist` |
| `sql/supabase-displaced-candidates.sql` | `displaced_candidates` |
| `sql/supabase-offboarding-intake.sql` | `offboarding_intake` |
| `sql/supabase-drop-waitlist.sql` | `drop_waitlist` |

## Pages That Used These

| Page | CTA Type | Status |
|------|----------|--------|
| `/fast-track` | Displaced worker intake form (16 fields) | Converted to free resource landing page |
| `/hire` | Employer waitlist form | Converted to resource directory |
| `/strategy/offboarding` | Offboarding intake form (roles, timeline, NDA) | Form removed, info page kept |
| `/report/[slug]` | Calendly "Book a Briefing" + offboarding link | Section removed |
| `/career-insights` | BookingCTA (score >= 60%) | Component removed |
| CareerAssessment (directory profiles) | BookingCTA + waitlist form in step 6 | Both removed |
| TeamReadiness results | BookingCTA | Component removed |
| `/demo` | BookingCTA | Component removed |

## How to Re-enable

### 1. Restore a single CTA (e.g., BookingCTA)
```bash
# Copy back to src
cp _archive/cta/components/booking/BookingCTA.tsx src/components/booking/
cp _archive/cta/lib/booking-config.ts src/lib/

# Then import where needed:
# import { BookingCTA } from "@/components/booking/BookingCTA";
# import { BOOKING_THRESHOLDS } from "@/lib/booking-config";
```

### 2. Restore an API route (e.g., candidate waitlist)
```bash
mkdir -p src/app/api/candidate-waitlist
cp _archive/cta/api/candidate-waitlist/route.ts src/app/api/candidate-waitlist/

# Also restore emails.ts if you need confirmation emails:
cp _archive/cta/lib/emails.ts src/lib/

# Run the SQL migration in Supabase:
# sql/supabase-waitlist-migration.sql
```

### 3. Restore everything
```bash
cp -r _archive/cta/components/booking src/components/
cp _archive/cta/lib/booking-config.ts src/lib/
cp _archive/cta/lib/emails.ts src/lib/
for dir in candidate-waitlist employer-waitlist displaced-candidates offboarding-intake drop-waitlist; do
  mkdir -p "src/app/api/$dir"
  cp "_archive/cta/api/$dir/route.ts" "src/app/api/$dir/"
done
# Then re-add CTA helpers back to email-helpers.ts from email-helpers-cta.ts
# Run all SQL migrations in Supabase
```

## Dependencies
- **Supabase**: All API routes use `supabaseAdmin` from `@/lib/supabase`
- **Resend**: Email templates use Resend via `RESEND_API_KEY` env var
- **Security**: API routes use `checkRateLimit` + `getClientIp` from `@/lib/security`
- **Zod**: All API routes validate input with Zod schemas
- **Calendly**: BookingCTA links to Calendly URL defined in `booking-config.ts`
