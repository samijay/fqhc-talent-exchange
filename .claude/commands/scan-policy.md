# FQHC Policy & Legislative Scanner

Deep scan of federal, state, and local policy developments affecting FQHCs and community health centers. Produces a structured intelligence brief for newsletter content and data updates.

**Target time: 10-15 minutes.**

---

## Step 1: Federal Scan (4 searches in parallel)

Run these web searches simultaneously:

1. `NACHC community health center news [current month] [year]`
2. `FQHC federal funding legislation [current month] [year]`
3. `Medicaid cuts community health center impact [year]`
4. `HRSA health center program [current month] [year]`

### Federal Sources to Prioritize:
| Source | URL | Signal |
|--------|-----|--------|
| **NACHC** | nachc.org | Funding alerts, CHCF reauthorization, advocacy, P&I Forum |
| **KFF** | kff.org | Medicaid enrollment data, policy explainers, state-by-state analyses |
| **CBO** | cbo.gov | Scoring of healthcare legislation, budget projections |
| **Congress.gov** | congress.gov | Bill text, committee actions, floor votes |
| **HRSA** | hrsa.gov | Health center program updates, grant announcements, UDS data releases |
| **CMS** | cms.gov | Medicaid rules, provider payment changes, managed care guidance |
| **Fierce Healthcare** | fiercehealthcare.com | Layoff tracker, financial news, system consolidations |
| **Becker's** | beckershospitalreview.com | Hospital/health system layoffs, closures, executive moves |
| **Modern Healthcare** | modernhealthcare.com | Live layoff/closure updates, policy analysis |

---

## Step 2: California State Scan (4 searches in parallel)

1. `California Medi-Cal FQHC reimbursement changes [current month] [year]`
2. `DHCS Medi-Cal managed care news [current month] [year]`
3. `California health center funding CalAIM [current month] [year]`
4. `California provider tax MCO hospital quality assurance fee [year]`

### State Sources to Prioritize:
| Source | URL | Signal |
|--------|-----|--------|
| **CPCA** | cpca.org | CA primary care association — FQHC-specific policy, legislative alerts |
| **CHCF** | chcf.org | Medi-Cal analysis, funding projections, provider payment data |
| **CA LAO** | lao.ca.gov | Budget analyses, Medi-Cal fiscal outlook |
| **DHCS** | dhcs.ca.gov | Medi-Cal rate changes, FQHC/RHC bulletins, managed care procurement |
| **CalMatters** | calmatters.org | Budget coverage, Medi-Cal policy, human impact stories |
| **CA Senate Budget** | sbud.senate.ca.gov | Budget subcommittee hearings, fiscal analyses |
| **CA Legislative Info** | leginfo.legislature.ca.gov | Bill tracking (SB 525, AB-specific bills) |

---

## Step 3: Local/County Scan (3 searches in parallel)

1. `California county health department layoffs OR funding cuts [current month] [year]`
2. `California FQHC closure OR layoff OR restructuring [current month] [year]`
3. `[specific FQHC name if relevant] layoffs OR funding OR restructuring [year]`

### Local Sources to Prioritize:
| Source | Signal |
|--------|--------|
| **County Board of Supervisors agendas** | Budget hearings, health department funding votes |
| **Local newspapers** (LA Times, SF Chronicle, Sacramento Bee, San Diego Union-Tribune) | FQHC closure/layoff stories, community impact |
| **Oakland Side, Stocktonia, CalMatters local** | Safety-net provider stories, county health responses |
| **County health department press releases** | Program changes, clinic closures, service reductions |

---

## Step 3.5: Extended Categories Scan (5 searches in parallel)

These additional searches feed the intelligence dashboard (`fqhc-news-intel.ts`):

1. **Mergers & acquisitions:** `"FQHC merger" OR "health center acquisition" OR "community health consolidation" California [year]`
2. **Patient stories:** `"FQHC patient" OR "community health center patient story" OR "health center saved my life" California [year]`
3. **Lobbying & advocacy:** `NACHC lobby OR CPCA advocacy OR "FQHC coalition" OR "health center advocacy" California [current month] [year]`
4. **Undocumented access:** `"undocumented healthcare" OR "FQHC undocumented" OR "immigrant health access" California [current month] [year]`
5. **Change management:** `FQHC revenue strategy OR "health center sustainability" OR "sliding fee scale" California [year]`

### Sources to Prioritize (Extended):
| Source | URL | Signal |
|--------|-----|--------|
| **NACHC Undocumented Patient Resources** | nachc.org/focus-areas/policy-and-advocacy/undocumented-patients/ | Immigrant access policy, advocacy toolkits |
| **HRSA Funding Opportunities** | bphc.hrsa.gov/funding | New Access Points, service expansion grants |
| **340B Health** | 340bhealth.org | Drug pricing policy, FQHC 340B participation |
| **National Immigration Law Center** | nilc.org | Immigrant healthcare access, state-level analysis |
| **Health Affairs** | healthaffairs.org | FQHC research, payment model studies |
| **Institute for Medicaid Innovation** | medicaidinnovation.org | MCO partnerships, value-based care |

---

## Step 4: Synthesize Intel Brief

For each significant finding, record in this format:

```
### [HEADLINE]
- **Date:** [Published date]
- **Source:** [Publication name + URL]
- **Category:** Federal | State | Local | Industry
- **Impact Level:** Critical | High | Medium | Low
- **Summary:** [2-3 sentences: what happened and why it matters]
- **FQHC Workforce Impact:** [How this affects hiring, layoffs, or operations at FQHCs]
- **Our Data Says:** [Cross-reference with our data — job counts, layoff tracker, directory, salary data]
- **Actionable:**
  - [ ] Newsletter content (candidate-facing)
  - [ ] Newsletter content (employer-facing)
  - [ ] Blog topic
  - [ ] Update funding-impact-data.ts
  - [ ] Update california-fqhc-layoffs.ts
  - [ ] Update california-fqhcs.ts (directory)
  - [ ] Outreach trigger (specific FQHC to contact)
```

---

## Step 5: Policy Timeline Check

Review the key dates in `funding-impact-data.ts` and check if any upcoming deadlines have new developments:

| Date | Event | Check For |
|------|-------|-----------|
| 2026-07-01 | Dental coverage ends (undocumented adults) | Implementation guidance, FQHC dental program changes |
| 2026-07-01 | MCO tax adjustment deadline | State response, DHCS guidance |
| 2026-10-01 | Immigrant eligibility restrictions | CMS rules, state implementation plans |
| 2026-12-31 | CHCF authorization expires | Reauthorization bills introduced? Committee action? |
| 2026-12-31 | Semi-annual redetermination begins | DHCS implementation timeline |
| 2027-01-01 | Medicaid work requirements | State waiver requests, exemption categories |
| 2028-01-01 | Provider tax phase-down | State budget planning, alternative revenue strategies |

If any of these have NEW information (bill introduced, CMS guidance released, state implementation plan published), flag for `funding-impact-data.ts` update.

---

## Step 5.5: Generate IntelItem Entries

For each significant finding, output an IntelItem object for `fqhc-news-intel.ts`:

```typescript
{
  id: "kebab-case-unique-id",
  date: "YYYY-MM-DD",  // published date
  headline: {
    en: "One-line headline in English",
    es: "Titular en español",
  },
  summary: {
    en: "2-3 sentence summary with specific numbers and impact.",
    es: "Resumen de 2-3 oraciones con números y impacto específico.",
  },
  category: "legislation" | "lobbying" | "patient-story" | "merger-acquisition" | "funding" | "workforce" | "undocumented-access" | "change-management",
  impactLevel: "critical" | "high" | "medium" | "low",
  sourceUrl: "https://primary-source-url",
  sourceOrg: "Source Organization Name",
  region: "California" | "Federal" | "County Name",
  affectedOrgs: ["Specific FQHC names if applicable"],
  tags: ["relevant", "search", "tags"],
}
```

### Impact Level Guide:
- **Critical:** Direct revenue impact >$10M, >200 workers, legislative passage, enrollment changes
- **High:** Named FQHC affected, significant policy change, >50 workers, new funding stream
- **Medium:** Industry trend, emerging issue, no specific FQHC named
- **Low:** Background context, general industry news

### Category Assignment Guide:
- **legislation:** Bills, votes, regulations, executive orders
- **lobbying:** Advocacy efforts, coalition actions, NACHC/CPCA campaigns
- **patient-story:** Individual patient impact stories at FQHCs
- **merger-acquisition:** Health system M&A, FQHC consolidation, facility closures/sales
- **funding:** Grant awards, budget allocations, reimbursement changes
- **workforce:** Hiring trends, layoffs, WARN filings, union activity
- **undocumented-access:** Policy changes affecting undocumented patient access
- **change-management:** Strategy/tactics for navigating disruption (editorial items)

---

## Step 6: Output Intel Brief

Print the complete brief in newsletter-ready format:

```
================================================================
FQHC INTEL BRIEF — [Date]
Prepared by FQHC Talent Exchange
================================================================

RED FLAGS (Critical/High impact):
- [item]
- [item]

FEDERAL LANDSCAPE:
- [item]
- [item]

CALIFORNIA STATE:
- [item]
- [item]

LOCAL/COUNTY:
- [item]
- [item]

WORKFORCE SIGNALS:
- 588 open positions tracked (+40 from last week)
- [hiring trends, hot roles, salary movement]

POLICY TIMELINE — NEXT 90 DAYS:
- [upcoming deadline + status]
- [upcoming deadline + status]

NEWSLETTER CONTENT IDEAS:
Candidate-facing:
  1. [topic + angle]
  2. [topic + angle]
Employer-facing:
  1. [topic + angle]
  2. [topic + angle]

DATA UPDATES NEEDED:
- [ ] [specific file + what to add]

OUTREACH TRIGGERS:
- [ ] [FQHC name + reason to contact + what to offer]

================================================================
```

---

## Step 7: Apply Updates (if approved)

If the brief identified data updates:
1. Add new IntelItem entries to `src/lib/fqhc-news-intel.ts` (append to INTEL_ITEMS array)
2. Update `funding-impact-data.ts` with new policy timeline entries
3. Update `california-fqhc-layoffs.ts` with new layoff entries
4. Update `california-fqhcs.ts` if FQHC-specific changes found
5. Remove intel items older than 90 days from `fqhc-news-intel.ts`
6. Run `npm run build` to verify

**Always ask before making code changes from policy scan findings.**

---

## Notes

- This command is designed for **deep dives** — run weekly or when a major policy event happens.
- The daily-update command includes a lighter version of this scan (Step 3 in daily-update).
- The output format is designed to feed directly into the weekly newsletter ("FQHC Intel Brief" / "The Briefing").
- Cross-referencing findings against our own data (directory, jobs, layoffs) is what makes our intelligence unique — always include the "Our Data Says" section.
- California focus for now; expand to other states when ready.
