# Scrape FQHC Jobs — Career Page Scanner

Check FQHC career pages for new job postings and generate FQHCJobListing entries.

## Steps

### 1. Load reference data

Read these files to understand the current state:

- **`src/lib/career-page-config.ts`** — which FQHCs are scrapeable, ATS type, last checked
- **`src/lib/california-fqhcs.ts`** — all 90 FQHCs with `slug`, `name`, `careersUrl`, `ehrSystem`, `city`, `region`
- **`src/lib/fqhc-job-listings.ts`** — existing 156+ job listings. Note which `fqhcSlug` values already have listings and what job titles exist.

### 2. Determine today's batch

Pick **10 FQHCs** to check today by rotating through the career page config:

1. Sort FQHCs by `lastChecked` date (oldest first, `null` = never checked)
2. Skip any FQHCs where `scrapeable` is `false`
3. Take the first 10 that are due for checking

If `career-page-config.ts` has fewer than 10 scrapeable entries, check all available ones and then try a few unconfigured FQHCs from the main directory (to discover new scrapeable pages).

### 3. Fetch career pages

For each FQHC in today's batch, use the **best method** based on their `atsType`:

#### 3a. Workday FQHCs (`atsType: "workday"`) — USE JSON API ✅

Workday has a hidden JSON API that returns structured job data. This is the **best** data source — it includes titles, locations, salary, and full descriptions.

**How to fetch jobs from Workday:**

```bash
# Step 1: Get job list (paginate with offset, max 20 per request)
curl -s -X POST 'https://{company}.wd1.myworkdayjobs.com/wday/cxs/{company}/{site}/jobs' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"appliedFacets":{},"limit":20,"offset":0,"searchText":""}'

# Step 2: Get individual job details (includes salary, description, requirements)
curl -s 'https://{company}.wd1.myworkdayjobs.com/wday/cxs/{company}/{site}{externalPath}' \
  -H 'Accept: application/json'
```

**Known Workday endpoints:**
| FQHC | Company | Site | Base URL |
|------|---------|------|----------|
| AltaMed | `altamed` | `Careers` | `https://altamed.wd1.myworkdayjobs.com/wday/cxs/altamed/Careers/jobs` |

**What the Workday API returns:**
- **Job list:** `{ total, jobPostings: [{ title, externalPath, locationsText, postedOn, remoteType, bulletFields }] }`
- **Job details:** `{ jobPostingInfo: { title, jobDescription (HTML with salary embedded), location, timeType, startDate, remoteType, jobReqId } }`
- Salary is embedded in the `jobDescription` HTML as `$XX,XXX.XX - $YY,YYY.YY annually` or `$XX.XX - $YY.YY hourly`
- Bilingual requirements are mentioned in the description text

**Pagination:** The API returns max 20 jobs per request. Paginate with `offset` (0, 20, 40...) until you've fetched all jobs up to `total`.

**For job details:** Only fetch details for jobs that look new (not already in our listings). Check the title against existing listings first to avoid unnecessary API calls.

#### 3b. Lever FQHCs (`atsType: "lever"`) — USE JSON API ✅

Lever also has a public JSON API:

```bash
curl -s 'https://api.lever.co/v0/postings/{company}?mode=json'
```

Returns an array of job objects with: `text` (title), `categories` (team, location, commitment), `description`, `lists` (requirements), `hostedUrl`.

#### 3c. All Other FQHCs — USE WebFetch

1. Use `WebFetch` to load their `careersUrl`
2. Ask the WebFetch to: "List all job postings on this page. For each job, extract: job title, department, location, salary range (if shown), job type (full-time/part-time), language requirements, and a brief description."
3. If the page returns no useful content (login wall, empty, JavaScript-only rendering):
   - Note it as unreachable
   - BUT check if the page mentions or links to an ATS platform (Paycom, Workday, ADP, Lever, iCIMS, BambooHR). If so, record the `atsType` in career-page-config.ts — even if we can't scrape the ATS, knowing the platform is useful.
   - If the career page links to a specific ATS URL (e.g., `https://altamed.wd1.myworkdayjobs.com/Careers`), try fetching THAT URL too — some ATS platforms serve partial HTML.
   - **If a Workday URL is discovered**, test the JSON API endpoint: `https://{company}.wd1.myworkdayjobs.com/wday/cxs/{company}/{site}/jobs` with a POST request. If it works, update the config with `atsType: "workday"` and add the endpoint URL to `notes`.
   - **If a Lever URL is discovered**, test: `https://api.lever.co/v0/postings/{company}?mode=json`. If it works, update the config with `atsType: "lever"`.

**Known ATS platforms:**
- **Workday** (`*.wd1.myworkdayjobs.com`) — ✅ JSON API available (see 3a above)
- **Lever** (`jobs.lever.co/*`) — ✅ JSON API available (see 3b above)
- **Paycom** (`paycomonline.net`) — ❌ JavaScript-only, not scrapeable
- **ADP** — ❌ Usually JavaScript-only
- **Direct HTML** — ✅ Simple career pages, best for WebFetch scraping

### 4. Filter and deduplicate

For each job found on a career page:

1. Check if a similar job already exists in `fqhc-job-listings.ts` for that `fqhcSlug`:
   - Same or very similar title (e.g., "Care Coordinator" vs "Care Coordinator - ECM Program")
   - Same department
   - If it's clearly the same posting, skip it
2. Only propose genuinely new positions

### 5. Generate FQHCJobListing objects

For each new job, create a `FQHCJobListing` matching this exact interface:

```typescript
{
  id: string;                          // "{fqhcSlug}-{three-digit-number}" e.g., "altamed-health-services-009"
  fqhcSlug: string;                    // From the FQHC directory
  title: string;                       // Job title as posted
  roleType: string;                    // Map to existing role types: "Community Health Worker", "Care Coordinator", "Medical Assistant", "Case Manager", "Behavioral Health Specialist", "Registered Nurse", "Patient Services Representative", "Revenue Cycle Specialist", "Licensed Therapist", "Dental Hygienist", "Pharmacist", "Nurse Practitioner", "Program Manager", "Administrative"
  department: string;                  // e.g., "Primary Care", "Behavioral Health", "ECM Program", "Dental", "Administration"
  salaryMin: number;                   // Annual salary. If only hourly shown, multiply by 2080. If no salary, estimate from existing benchmarks for that roleType.
  salaryMax: number;
  type: "Full-time" | "Part-time" | "Per Diem";
  location: string;                    // City name from FQHC directory
  bilingual: boolean;                  // true if posting mentions bilingual or Spanish
  ehrSystem: string;                   // From the FQHC directory data (e.g., "OCHIN Epic")
  programs: string[];                  // Infer from description: ECM, CCM, CalAIM, 340B, BH Integration, etc.
  postedDate: string;                  // Today's date in ISO format (YYYY-MM-DD)
  description: string;                 // 1-2 sentence summary of the role
  requirements: string[];              // 3-4 key requirements as bullet points
  languageRequired?: string | null;    // "Spanish" if explicitly required, null otherwise
  languagePreferred?: string[] | null; // e.g., ["Spanish", "Vietnamese"] if listed as preferred
}
```

**ID numbering:** Look at existing IDs for that fqhcSlug to find the highest number, then continue from there. For example, if `altamed-health-services-008` exists, the next one is `altamed-health-services-009`.

**Salary estimation:** If the career page doesn't show salary, use existing salary ranges from `fqhc-job-listings.ts` for the same `roleType` as a reasonable estimate. Note in the description that the salary is estimated.

### 6. Update career page config

After checking each FQHC, update `career-page-config.ts`:
- Set `lastChecked` to today's date
- If the page was unreachable or had no useful content, set `scrapeable: false` and add a `notes` explaining why (e.g., "Paycom ATS — JavaScript-rendered, no static job listings")
- If this was a previously unconfigured FQHC and it worked, add a new entry with `scrapeable: true`

### 7. Present for review

Show me:
- How many FQHCs were checked
- How many were reachable vs. unreachable
- How many new job listings were found (and at which FQHCs)
- The full TypeScript code for each new `FQHCJobListing`

**Wait for my approval before making any changes.**

### 8. After approval

- Append new listings to `fqhc-job-listings.ts` in the section for that FQHC (look for the `// ─── ORG NAME ───` comment header). If no section exists, create one.
- Update `career-page-config.ts` with new `lastChecked` dates
- Do NOT remove or modify existing listings

### 9. Summary

Report:
- FQHCs checked today: X of Y
- New listings added: X
- Unreachable pages: list them with reasons
- FQHCs to check next time (the next 10 in rotation)
- Any FQHCs with zero listings that might benefit from manual checking
