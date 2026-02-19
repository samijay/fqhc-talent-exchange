# Update Layoff Tracker — WARN Act Check

Check the California EDD WARN Act page for new healthcare layoff filings and add them to the layoff tracker.

## Steps

### 1. Download the WARN Act report

Download the current WARN XLSX file from the California EDD:

```
curl -sL "https://edd.ca.gov/siteassets/files/jobs_and_training/warn/warn_report1.xlsx" -o /tmp/warn-report.xlsx
```

If this URL fails (404), check `https://edd.ca.gov/en/jobs_and_training/Layoff_Services_WARN` for the current file link. The EDD occasionally changes the filename.

### 2. Parse the XLSX file

Use python3 to extract healthcare entries from the XLSX. The file has multiple sheets — the data is on the **"Detailed WARN Report "** sheet (note trailing space).

If `openpyxl` is not installed, run `pip3 install openpyxl` first.

The sheet has these columns:
- `County/Parish` — e.g., "Los Angeles County"
- `Notice Date` — e.g., "2025-07-01 00:00:00"
- `Processed Date`
- `Effective Date`
- `Company` — org name (may include address codes in parentheses)
- `Layoff/ Closure` — e.g., "Layoff Permanent", "Closure Permanent"
- `No. Of Employees` — number affected
- `Address` — full street address with city, state, zip
- `Related Industry` — NAICS sector, e.g., "62 Healthcare and Social Assistance"

Note: Column headers may contain newline characters (e.g., `Notice\nDate`). Strip these when parsing.

### 3. Filter for healthcare entries

From the parsed data, filter for healthcare-related WARN filings using these criteria:
- **NAICS codes** starting with `621` (Ambulatory Health Care), `622` (Hospitals), or `623` (Nursing/Residential Care)
- **OR** company/organization name contains any of: `health`, `hospital`, `clinic`, `medical`, `community health`, `FQHC`, `dental`, `behavioral`, `mental health`, `nursing`, `care center`, `wellness`
- Must be in **California** (should be all entries since this is the CA EDD file)

### 4. Check for duplicates

Read `src/lib/california-fqhc-layoffs.ts` and extract:
- All existing `id` values
- All existing `organization` names

Skip any WARN filing where the organization name closely matches an existing entry from the same year. The existing ID format is `{slugified-org-name}-{year}` (e.g., `"alameda-health-system-2026"`).

### 5. Cross-reference with FQHC directory

Read `src/lib/california-fqhcs.ts` to get the list of 90 FQHCs with their `name` and `slug` fields. For each new WARN filing:
- If the organization name matches (or closely matches) a known FQHC, set `isFQHC: true` and `slug` to the matching FQHC's slug
- If not a known FQHC, set `isFQHC: false` and `slug: null`

### 6. Generate LayoffEntry objects

For each new healthcare WARN filing, generate a `LayoffEntry` matching this exact interface:

```typescript
{
  id: string;                    // "{slugified-org-name}-{year}"
  organization: string;          // Official org name from WARN filing
  slug: string | null;           // FQHC directory slug if applicable
  city: string;
  county: string;
  region: "Los Angeles" | "San Diego" | "Bay Area" | "Sacramento" | "Central Valley" | "Inland Empire" | "Central Coast" | "North State" | "North Coast" | "Statewide";
  dateAnnounced: string;         // ISO date from WARN filing
  dateEffective: string | null;  // ISO date if listed
  employeesAffected: number;     // From WARN "number of employees" field
  employeesTotal: number | null; // null if unknown
  percentOfWorkforce: number | null; // null if unknown
  rolesAffected: string[];       // Infer from department/job titles if available, otherwise ["Various"]
  departments: string[];         // From WARN filing if available
  reason: string;                // Brief factual description of why
  reasonCategory: "federal-funding-cuts" | "state-funding-cuts" | "financial-restructuring" | "program-closure" | "merger-acquisition" | "operational-changes" | "facility-closure";
  source: string;                // "California EDD WARN Act Filing"
  sourceTitle: string;           // "CA EDD WARN"
  warnActFiled: true;            // Always true for WARN data
  isFQHC: boolean;
  status: "announced";           // New filings are always "announced"
  notes: string | null;
}
```

**Region mapping** — use the county to determine the region:
- Los Angeles County → "Los Angeles"
- San Diego County → "San Diego"
- San Francisco, Alameda, Contra Costa, Santa Clara, San Mateo, Marin, Sonoma, Napa, Solano → "Bay Area"
- Sacramento, Placer, El Dorado, Yolo → "Sacramento"
- Fresno, Kern, Tulare, Stanislaus, San Joaquin, Merced, Kings, Madera → "Central Valley"
- Riverside, San Bernardino → "Inland Empire"
- Santa Barbara, San Luis Obispo, Monterey, Santa Cruz, Ventura → "Central Coast"
- Shasta, Butte, Tehama, Siskiyou, Lassen → "North State"
- Humboldt, Mendocino, Del Norte, Lake → "North Coast"

### 7. Present for review

Show me all proposed new entries formatted as TypeScript code. Include:
- How many new healthcare WARN filings were found
- How many are FQHCs vs. hospitals/other health orgs
- How many were skipped as duplicates
- The full TypeScript code for each new entry

**Wait for my approval before making any changes.**

### 8. After approval

- Append the new entries to the `californiaFQHCLayoffs` array in `src/lib/california-fqhc-layoffs.ts`
- Add them in the appropriate year section (use `// ── {YEAR} ──` comment headers)
- Update the `// Last updated:` comment at the top of the file to today's date
- **Note:** The layoffs page (`/layoffs`) automatically derives its "Last updated" badge from the most recent `dateAnnounced` in the data array — no manual page edit needed

### 9. Summary

Report:
- Total new entries added
- Organizations and affected workers
- Any entries you skipped and why
