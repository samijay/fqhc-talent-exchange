/**
 * Resume Parser — Heuristic-based text extraction from resumes.
 * No AI/LLM calls. Uses regex patterns and keyword matching
 * to extract structured data from raw resume text.
 */

/* ------------------------------------------------------------------ */
/*  Known lists for matching (must stay in sync with ResumeBuilder)    */
/* ------------------------------------------------------------------ */

const REGIONS = [
  "Los Angeles",
  "San Diego",
  "Bay Area",
  "Sacramento",
  "Central Valley",
  "Inland Empire",
  "Other California",
] as const;

const EHR_SYSTEMS = [
  "OCHIN Epic",
  "NextGen",
  "eClinicalWorks",
  "Cerner",
  "athenahealth",
] as const;

const PROGRAMS = [
  "ECM",
  "CCM",
  "Community Supports",
  "TCM",
  "BH-ASO",
  "BH Integration",
] as const;

const COMMON_CERTIFICATIONS = [
  "CHW Certification (CA)",
  "Certified Medical Assistant (CMA)",
  "BLS/CPR",
  "HIPAA Compliance",
  "Motivational Interviewing",
  "Mental Health First Aid",
  "Trauma-Informed Care",
  "ECM/CCM Training",
  "Phlebotomy",
  "Case Management Certification (CCM)",
  "LCSW",
  "LMFT",
  "ASW/AMFT",
  "LVN",
  "RN",
] as const;

const LANGUAGE_OPTIONS = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Tagalog",
  "Korean",
] as const;

// California cities for region detection
const CA_CITY_REGION_MAP: Record<string, string> = {
  "los angeles": "Los Angeles",
  "long beach": "Los Angeles",
  "pasadena": "Los Angeles",
  "glendale": "Los Angeles",
  "burbank": "Los Angeles",
  "compton": "Los Angeles",
  "inglewood": "Los Angeles",
  "pomona": "Los Angeles",
  "torrance": "Los Angeles",
  "el monte": "Los Angeles",
  "downey": "Los Angeles",
  "whittier": "Los Angeles",
  "san diego": "San Diego",
  "chula vista": "San Diego",
  "oceanside": "San Diego",
  "escondido": "San Diego",
  "carlsbad": "San Diego",
  "san francisco": "Bay Area",
  "oakland": "Bay Area",
  "san jose": "Bay Area",
  "fremont": "Bay Area",
  "hayward": "Bay Area",
  "sunnyvale": "Bay Area",
  "santa clara": "Bay Area",
  "berkeley": "Bay Area",
  "richmond": "Bay Area",
  "daly city": "Bay Area",
  "sacramento": "Sacramento",
  "elk grove": "Sacramento",
  "roseville": "Sacramento",
  "folsom": "Sacramento",
  "fresno": "Central Valley",
  "bakersfield": "Central Valley",
  "stockton": "Central Valley",
  "modesto": "Central Valley",
  "visalia": "Central Valley",
  "merced": "Central Valley",
  "riverside": "Inland Empire",
  "san bernardino": "Inland Empire",
  "ontario": "Inland Empire",
  "fontana": "Inland Empire",
  "moreno valley": "Inland Empire",
  "rancho cucamonga": "Inland Empire",
  "corona": "Inland Empire",
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ParsedWorkHistory {
  employer: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ParsedEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface ParsedResume {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  objective: string;
  ehrSystems: string[];
  programs: string[];
  certifications: string[];
  languages: string[];
  workHistory: ParsedWorkHistory[];
  education: ParsedEducation[];
}

/* ------------------------------------------------------------------ */
/*  Main parse function                                                */
/* ------------------------------------------------------------------ */

export function parseResumeText(text: string): ParsedResume {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const fullText = text.toLowerCase();

  return {
    ...extractContactInfo(lines),
    objective: extractObjective(text, lines),
    ehrSystems: matchKeywords(fullText, EHR_SYSTEMS),
    programs: matchKeywords(fullText, PROGRAMS),
    certifications: matchCertifications(fullText),
    languages: matchKeywords(fullText, LANGUAGE_OPTIONS),
    workHistory: extractWorkHistory(text),
    education: extractEducation(text),
  };
}

/* ------------------------------------------------------------------ */
/*  Contact info extraction                                            */
/* ------------------------------------------------------------------ */

function extractContactInfo(lines: string[]) {
  const email = extractEmail(lines);
  const phone = extractPhone(lines);
  const { firstName, lastName } = extractName(lines);
  const { city, region } = extractLocation(lines);

  return { firstName, lastName, email, phone, city, region };
}

function extractEmail(lines: string[]): string {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  for (const line of lines) {
    const match = line.match(emailRegex);
    if (match) return match[0];
  }
  return "";
}

function extractPhone(lines: string[]): string {
  const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  for (const line of lines) {
    const match = line.match(phoneRegex);
    if (match) return match[0];
  }
  return "";
}

function extractName(lines: string[]): { firstName: string; lastName: string } {
  // The name is usually the first line that isn't an email, phone, address, or URL
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const urlRegex = /https?:\/\/|www\.|linkedin\.com|github\.com/i;
  const addressRegex = /^\d+\s+\w+\s+(st|street|ave|avenue|blvd|boulevard|dr|drive|rd|road|ln|lane|way|ct|court)/i;

  for (const line of lines.slice(0, 5)) {
    // Skip lines that look like email, phone, URL, or address
    if (emailRegex.test(line)) continue;
    if (phoneRegex.test(line)) continue;
    if (urlRegex.test(line)) continue;
    if (addressRegex.test(line)) continue;
    // Skip very long lines (likely a summary, not a name)
    if (line.length > 60) continue;
    // Skip lines that are all uppercase single words like "RESUME" or "CURRICULUM VITAE"
    if (/^(resume|curriculum vitae|cv)$/i.test(line)) continue;

    // Try to split into first and last name
    const parts = line.split(/\s+/).filter(Boolean);
    if (parts.length >= 2 && parts.length <= 4) {
      // Filter out titles like "Mr.", "Ms.", "Dr."
      const filtered = parts.filter(
        (p) => !/^(mr|ms|mrs|dr|prof)\.?$/i.test(p)
      );
      if (filtered.length >= 2) {
        return {
          firstName: filtered[0].replace(/,/g, ""),
          lastName: filtered[filtered.length - 1].replace(/,/g, ""),
        };
      }
    }
    // Single-word first line — use as first name
    if (parts.length === 1 && /^[A-Za-z]{2,}$/.test(parts[0])) {
      return { firstName: parts[0], lastName: "" };
    }
  }
  return { firstName: "", lastName: "" };
}

function extractLocation(lines: string[]): { city: string; region: string } {
  const fullText = lines.join(" ").toLowerCase();

  // Check for California cities in the text
  for (const [cityName, regionName] of Object.entries(CA_CITY_REGION_MAP)) {
    if (fullText.includes(cityName)) {
      // Capitalize city name properly
      const capitalizedCity = cityName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return { city: capitalizedCity, region: regionName };
    }
  }

  // Check for region names directly
  for (const region of REGIONS) {
    if (fullText.includes(region.toLowerCase())) {
      return { city: "", region };
    }
  }

  // Check for "California" or "CA" in contact area (first few lines)
  const contactArea = lines.slice(0, 6).join(" ");
  if (/\bCA\b|California/i.test(contactArea)) {
    // Try to extract city from a line like "City, CA 90001"
    const cityStateMatch = contactArea.match(
      /([A-Z][a-zA-Z\s]+),?\s*(?:CA|California)\s*\d*/i
    );
    if (cityStateMatch) {
      return { city: cityStateMatch[1].trim(), region: "Other California" };
    }
  }

  return { city: "", region: "" };
}

/* ------------------------------------------------------------------ */
/*  Skills / keyword matching                                          */
/* ------------------------------------------------------------------ */

function matchKeywords(
  fullText: string,
  keywords: readonly string[]
): string[] {
  const matched: string[] = [];
  for (const keyword of keywords) {
    // Use word boundary for short keywords to avoid false matches
    if (keyword.length <= 3) {
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
      if (regex.test(fullText)) {
        matched.push(keyword);
      }
    } else if (fullText.includes(keyword.toLowerCase())) {
      matched.push(keyword);
    }
  }
  return matched;
}

function matchCertifications(fullText: string): string[] {
  const matched: string[] = [];

  // Direct matches
  for (const cert of COMMON_CERTIFICATIONS) {
    if (fullText.includes(cert.toLowerCase())) {
      matched.push(cert);
      continue;
    }
  }

  // Fuzzy matches for common variations
  const fuzzyMap: Record<string, string> = {
    "community health worker": "CHW Certification (CA)",
    "chw certified": "CHW Certification (CA)",
    "chw certification": "CHW Certification (CA)",
    "certified medical assistant": "Certified Medical Assistant (CMA)",
    "cma": "Certified Medical Assistant (CMA)",
    "basic life support": "BLS/CPR",
    "bls": "BLS/CPR",
    "cpr": "BLS/CPR",
    "hipaa": "HIPAA Compliance",
    "motivational interviewing": "Motivational Interviewing",
    "mental health first aid": "Mental Health First Aid",
    "mhfa": "Mental Health First Aid",
    "trauma-informed": "Trauma-Informed Care",
    "trauma informed": "Trauma-Informed Care",
    "phlebotomy": "Phlebotomy",
    "phlebotomist": "Phlebotomy",
    "case management certification": "Case Management Certification (CCM)",
    "licensed clinical social worker": "LCSW",
    "lcsw": "LCSW",
    "licensed marriage and family": "LMFT",
    "lmft": "LMFT",
    "associate social worker": "ASW/AMFT",
    "asw": "ASW/AMFT",
    "amft": "ASW/AMFT",
    "licensed vocational nurse": "LVN",
    "lvn": "LVN",
    "registered nurse": "RN",
  };

  for (const [variation, certName] of Object.entries(fuzzyMap)) {
    if (!matched.includes(certName) && fullText.includes(variation)) {
      matched.push(certName);
    }
  }

  return [...new Set(matched)]; // deduplicate
}

/* ------------------------------------------------------------------ */
/*  Work history extraction                                            */
/* ------------------------------------------------------------------ */

function extractWorkHistory(text: string): ParsedWorkHistory[] {
  const entries: ParsedWorkHistory[] = [];
  const lines = text.split("\n").map((l) => l.trim());

  // Look for sections that contain work history
  const sectionHeaders =
    /\b(experience|employment|work history|professional experience|career history)\b/i;

  let inWorkSection = false;
  let currentEntry: Partial<ParsedWorkHistory> | null = null;

  // Date range patterns
  const dateRangeRegex =
    /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|(?:\d{1,2}\/\d{4})|(?:\d{4}))\s*[-–—to]+\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|(?:\d{1,2}\/\d{4})|(?:\d{4})|Present|Current)/i;

  const monthYearRegex =
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*(\d{4})/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect section headers
    if (sectionHeaders.test(line) && line.length < 60) {
      inWorkSection = true;
      continue;
    }

    // Stop if we hit a different section
    if (
      inWorkSection &&
      /\b(education|skills|certifications|references|awards|volunteer|training|summary|objective|profile)\b/i.test(
        line
      ) &&
      line.length < 60
    ) {
      // Save current entry before leaving section
      if (currentEntry && (currentEntry.employer || currentEntry.title)) {
        entries.push(finalizeWorkEntry(currentEntry));
      }
      inWorkSection = false;
      continue;
    }

    if (!inWorkSection) continue;

    // Look for date ranges on this line
    const dateMatch = line.match(dateRangeRegex);
    if (dateMatch) {
      // Save previous entry
      if (currentEntry && (currentEntry.employer || currentEntry.title)) {
        entries.push(finalizeWorkEntry(currentEntry));
      }

      // Parse dates
      const { startDate, endDate, current } = parseDateRange(dateMatch[0]);

      // The job title and employer are usually on the same line or adjacent lines
      const cleanedLine = line.replace(dateRangeRegex, "").trim();
      const parts = cleanedLine.split(/[|,–—-]/).map((p) => p.trim()).filter(Boolean);

      currentEntry = {
        title: parts[0] || "",
        employer: parts[1] || "",
        startDate,
        endDate,
        current,
      };

      // If we only got one part, check the previous or next line
      if (!currentEntry.employer && i > 0) {
        const prevLine = lines[i - 1];
        if (prevLine && !dateRangeRegex.test(prevLine) && prevLine.length < 80) {
          currentEntry.employer = prevLine;
        }
      }
      if (!currentEntry.employer && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (nextLine && !dateRangeRegex.test(nextLine) && nextLine.length < 80) {
          // Check if next line looks like a company name (not a bullet point)
          if (!nextLine.startsWith("•") && !nextLine.startsWith("-") && !nextLine.startsWith("*")) {
            currentEntry.employer = nextLine;
          }
        }
      }
      continue;
    }

    // Look for standalone month/year patterns that might indicate dates
    const standaloneDate = line.match(monthYearRegex);
    if (standaloneDate && !currentEntry) {
      // Could be start of a new entry
    }
  }

  // Don't forget the last entry
  if (currentEntry && (currentEntry.employer || currentEntry.title)) {
    entries.push(finalizeWorkEntry(currentEntry));
  }

  return entries.slice(0, 5); // Cap at 5 entries
}

function parseDateRange(dateStr: string): {
  startDate: string;
  endDate: string;
  current: boolean;
} {
  const parts = dateStr.split(/[-–—]|to/i).map((p) => p.trim());
  const current = /present|current/i.test(dateStr);

  const startDate = parseMonthYear(parts[0] || "");
  const endDate = current ? "" : parseMonthYear(parts[1] || "");

  return { startDate, endDate, current };
}

function parseMonthYear(str: string): string {
  // Try "Month Year" format
  const monthNames: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04",
    may: "05", jun: "06", jul: "07", aug: "08",
    sep: "09", oct: "10", nov: "11", dec: "12",
  };

  const monthMatch = str.match(
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*(\d{4})/i
  );
  if (monthMatch) {
    const monthAbbr = str.slice(0, 3).toLowerCase();
    const month = monthNames[monthAbbr] || "01";
    return `${monthMatch[1]}-${month}`;
  }

  // Try "MM/YYYY" format
  const slashMatch = str.match(/(\d{1,2})\/(\d{4})/);
  if (slashMatch) {
    return `${slashMatch[2]}-${slashMatch[1].padStart(2, "0")}`;
  }

  // Try just year
  const yearMatch = str.match(/(\d{4})/);
  if (yearMatch) {
    return `${yearMatch[1]}-01`;
  }

  return "";
}

function finalizeWorkEntry(
  entry: Partial<ParsedWorkHistory>
): ParsedWorkHistory {
  return {
    employer: entry.employer || "",
    title: entry.title || "",
    startDate: entry.startDate || "",
    endDate: entry.endDate || "",
    current: entry.current || false,
  };
}

/* ------------------------------------------------------------------ */
/*  Education extraction                                               */
/* ------------------------------------------------------------------ */

function extractEducation(text: string): ParsedEducation[] {
  const entries: ParsedEducation[] = [];
  const lines = text.split("\n").map((l) => l.trim());

  const sectionHeaders = /\b(education|academic|degrees?|qualifications)\b/i;
  const degreeKeywords =
    /\b(bachelor|associate|master|mba|mph|msw|bsn|adn|doctorate|phd|certificate|diploma|degree|b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|a\.?a\.?|a\.?s\.?)\b/i;

  let inEduSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (sectionHeaders.test(line) && line.length < 60) {
      inEduSection = true;
      continue;
    }

    // Stop at next major section
    if (
      inEduSection &&
      /\b(experience|employment|work history|skills|certifications|references|awards|volunteer)\b/i.test(
        line
      ) &&
      line.length < 60
    ) {
      inEduSection = false;
      continue;
    }

    if (!inEduSection) continue;
    if (!line || line.length < 3) continue;

    // Look for lines with degree keywords or years
    if (degreeKeywords.test(line) || /\b(19|20)\d{2}\b/.test(line)) {
      const yearMatch = line.match(/\b((?:19|20)\d{2})\b/);
      const year = yearMatch ? yearMatch[1] : "";

      // Try to separate degree from institution
      const parts = line.split(/[,|–—-]/).map((p) => p.trim()).filter(Boolean);

      let degree = "";
      let institution = "";

      if (parts.length >= 2) {
        // Check which part has degree keywords
        for (const part of parts) {
          if (degreeKeywords.test(part)) {
            degree = part.replace(/\b(19|20)\d{2}\b/, "").trim();
          } else if (part.length > 3 && !/^\d{4}$/.test(part)) {
            institution = part;
          }
        }
      } else {
        // Single line — try to use it and check adjacent lines
        if (degreeKeywords.test(line)) {
          degree = line.replace(/\b(19|20)\d{2}\b/, "").trim();
          // Check next line for institution
          if (i + 1 < lines.length && !degreeKeywords.test(lines[i + 1])) {
            institution = lines[i + 1];
          }
        } else {
          institution = line.replace(/\b(19|20)\d{2}\b/, "").trim();
          // Check next line for degree
          if (i + 1 < lines.length && degreeKeywords.test(lines[i + 1])) {
            degree = lines[i + 1].replace(/\b(19|20)\d{2}\b/, "").trim();
          }
        }
      }

      // Only add if we have something useful
      if (degree || institution) {
        entries.push({ institution, degree, year });
      }
    }
  }

  return entries.slice(0, 3); // Cap at 3 entries
}

/* ------------------------------------------------------------------ */
/*  Objective / summary extraction                                     */
/* ------------------------------------------------------------------ */

function extractObjective(text: string, lines: string[]): string {
  const headerRegex =
    /\b(summary|objective|profile|professional summary|career objective|about me|about)\b/i;

  for (let i = 0; i < lines.length; i++) {
    if (headerRegex.test(lines[i]) && lines[i].length < 40) {
      // Collect text until the next section header or empty-ish line
      const paragraphLines: string[] = [];
      for (let j = i + 1; j < lines.length && j < i + 6; j++) {
        const nextLine = lines[j];
        // Stop if we hit another section header
        if (
          /\b(experience|education|skills|certifications|employment|work history)\b/i.test(
            nextLine
          ) &&
          nextLine.length < 40
        ) {
          break;
        }
        if (nextLine.length > 3) {
          paragraphLines.push(nextLine);
        }
      }
      if (paragraphLines.length > 0) {
        return paragraphLines.join(" ").slice(0, 500); // Cap at 500 chars
      }
    }
  }

  return "";
}

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
