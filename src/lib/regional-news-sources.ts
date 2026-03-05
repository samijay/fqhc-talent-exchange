// regional-news-sources.ts
// Configuration for regional news scanning in the /daily-update pipeline
// Each region has key news outlets, major cities, health systems, and search keywords
// Used by Step 3.8 of the daily pipeline to rotate through all 9 CA regions weekly
// Last updated: 2026-03-05

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RegionalNewsSource {
  name: string;
  domain: string;
}

export interface RegionalNewsConfig {
  region: string;
  slug: string;
  /** Key counties in this region (for search queries — use top 2-3 by FQHC count) */
  counties: string[];
  /** Major cities to include in searches */
  keyCities: string[];
  /** Major health systems/hospitals (whose layoffs affect FQHC workforce pipeline) */
  majorHealthSystems: string[];
  /** Named FQHCs with highest patient volume or strategic importance */
  keyFQHCs: string[];
  /** Local news outlets — often break stories 1-2 weeks before state/national coverage */
  newsOutlets: RegionalNewsSource[];
  /** Additional search keywords specific to this region */
  searchKeywords: string[];
}

/* ------------------------------------------------------------------ */
/*  Rotation Schedule                                                   */
/* ------------------------------------------------------------------ */

/**
 * 5-day rotation: 2 regions per weekday, all 9 covered every week.
 * LA and Bay Area get 2x/week because they have the highest FQHC density.
 *
 * Monday:    Los Angeles (89 FQHCs) + Sacramento (12)
 * Tuesday:   Bay Area (40 FQHCs) + Central Valley (16)
 * Wednesday: San Diego (14) + Inland Empire (15)
 * Thursday:  Los Angeles + Central Coast (10)
 * Friday:    Bay Area + North State (12) + North Coast (11)
 */
const ROTATION_SCHEDULE: Record<number, string[]> = {
  1: ["Los Angeles", "Sacramento"], // Monday
  2: ["Bay Area", "Central Valley"], // Tuesday
  3: ["San Diego", "Inland Empire"], // Wednesday
  4: ["Los Angeles", "Central Coast"], // Thursday
  5: ["Bay Area", "North State", "North Coast"], // Friday — combine rural regions
};

/** Get today's scan regions based on day of week (1=Mon..5=Fri) */
export function getTodaysScanRegions(): RegionalNewsConfig[] {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ..., 5=Fri
  const regionsToday = ROTATION_SCHEDULE[dayOfWeek] || [];
  return REGIONAL_NEWS_CONFIGS.filter((c) => regionsToday.includes(c.region));
}

/** Get the rotation schedule for display */
export function getRotationSchedule(): { day: string; regions: string[] }[] {
  return [
    { day: "Monday", regions: ["Los Angeles", "Sacramento"] },
    { day: "Tuesday", regions: ["Bay Area", "Central Valley"] },
    { day: "Wednesday", regions: ["San Diego", "Inland Empire"] },
    { day: "Thursday", regions: ["Los Angeles", "Central Coast"] },
    { day: "Friday", regions: ["Bay Area", "North State", "North Coast"] },
  ];
}

/* ------------------------------------------------------------------ */
/*  Regional Configurations                                             */
/* ------------------------------------------------------------------ */

export const REGIONAL_NEWS_CONFIGS: RegionalNewsConfig[] = [
  {
    region: "Los Angeles",
    slug: "los-angeles",
    counties: ["Los Angeles", "Orange"],
    keyCities: ["Los Angeles", "Long Beach", "Pasadena", "Santa Ana", "Anaheim", "Pomona"],
    majorHealthSystems: [
      "LA County DHS",
      "Kaiser Permanente",
      "Cedars-Sinai",
      "UCLA Health",
      "Providence",
      "Dignity Health",
      "MemorialCare",
      "PIH Health",
    ],
    keyFQHCs: [
      "AltaMed",
      "APLA Health",
      "St. John's Community Health",
      "Northeast Valley Health Corporation",
      "Venice Family Clinic",
      "JWCH Institute",
    ],
    newsOutlets: [
      { name: "Los Angeles Times", domain: "latimes.com" },
      { name: "LAist", domain: "laist.com" },
      { name: "Los Angeles Daily News", domain: "dailynews.com" },
      { name: "Pasadena Star-News", domain: "pasadenastarnews.com" },
      { name: "OC Register", domain: "ocregister.com" },
      { name: "Long Beach Post", domain: "lbpost.com" },
    ],
    searchKeywords: ["LA County DHS", "LA County health", "Orange County health"],
  },
  {
    region: "Bay Area",
    slug: "bay-area",
    counties: [
      "San Francisco",
      "Alameda",
      "Contra Costa",
      "Santa Clara",
      "San Mateo",
      "Marin",
      "Solano",
      "Napa",
      "Sonoma",
    ],
    keyCities: ["San Francisco", "Oakland", "San Jose", "Berkeley", "Richmond", "Fremont", "Vallejo"],
    majorHealthSystems: [
      "SF DPH",
      "Alameda Health System",
      "Santa Clara Valley Medical Center",
      "Kaiser Permanente",
      "Sutter Health",
      "Stanford Health Care",
      "UCSF Health",
      "John Muir Health",
      "Zuckerberg SF General",
    ],
    keyFQHCs: [
      "Asian Health Services",
      "La Clinica de La Raza",
      "LifeLong Medical Care",
      "North East Medical Services",
      "Ravenswood Family Health",
      "San Francisco Community Health Center",
    ],
    newsOutlets: [
      { name: "San Francisco Chronicle", domain: "sfchronicle.com" },
      { name: "SF Standard", domain: "sfstandard.com" },
      { name: "Mission Local", domain: "missionlocal.org" },
      { name: "KQED", domain: "kqed.org" },
      { name: "KALW", domain: "kalw.org" },
      { name: "Berkeleyside", domain: "berkeleyside.org" },
      { name: "San Jose Mercury News", domain: "mercurynews.com" },
      { name: "Oakland Side", domain: "oaklandside.org" },
      { name: "Marin Independent Journal", domain: "marinij.com" },
    ],
    searchKeywords: ["SF DPH", "Alameda Health System", "SFCCC", "Bay Area health"],
  },
  {
    region: "San Diego",
    slug: "san-diego",
    counties: ["San Diego", "Imperial"],
    keyCities: ["San Diego", "Chula Vista", "Escondido", "El Cajon", "El Centro"],
    majorHealthSystems: [
      "UC San Diego Health",
      "Sharp HealthCare",
      "Scripps Health",
      "Kaiser Permanente",
      "Palomar Health",
      "Rady Children's",
    ],
    keyFQHCs: [
      "Family Health Centers of San Diego",
      "San Ysidro Health",
      "Neighborhood Healthcare",
      "Borrego Health",
    ],
    newsOutlets: [
      { name: "San Diego Union-Tribune", domain: "sandiegouniontribune.com" },
      { name: "Voice of San Diego", domain: "voiceofsandiego.org" },
      { name: "KPBS", domain: "kpbs.org" },
      { name: "Imperial Valley Press", domain: "ivpressonline.com" },
    ],
    searchKeywords: ["San Diego County health", "Imperial County health", "border health"],
  },
  {
    region: "Sacramento",
    slug: "sacramento",
    counties: ["Sacramento", "Yolo", "Placer", "El Dorado", "Sutter"],
    keyCities: ["Sacramento", "Davis", "Roseville", "Elk Grove", "Yuba City"],
    majorHealthSystems: [
      "UC Davis Health",
      "Sutter Health",
      "Kaiser Permanente",
      "Dignity Health",
      "Sacramento County DHHS",
    ],
    keyFQHCs: [
      "WellSpace Health",
      "Sacramento Native American Health Center",
      "One Community Health",
    ],
    newsOutlets: [
      { name: "Sacramento Bee", domain: "sacbee.com" },
      { name: "CapRadio", domain: "capradio.org" },
      { name: "Davis Enterprise", domain: "davisenterprise.com" },
    ],
    searchKeywords: ["Sacramento County health", "state capitol health budget"],
  },
  {
    region: "Central Valley",
    slug: "central-valley",
    counties: ["Fresno", "Kern", "Tulare", "Stanislaus", "San Joaquin", "Merced", "Madera", "Kings"],
    keyCities: ["Fresno", "Bakersfield", "Stockton", "Modesto", "Visalia", "Merced"],
    majorHealthSystems: [
      "Community Medical Centers (Fresno)",
      "Kern Medical",
      "Adventist Health",
      "Kaiser Permanente",
      "Kaweah Health",
    ],
    keyFQHCs: [
      "Clinica Sierra Vista",
      "United Health Centers",
      "Family Healthcare Network",
      "Golden Valley Health Centers",
    ],
    newsOutlets: [
      { name: "Fresno Bee", domain: "fresnobee.com" },
      { name: "KVPR", domain: "kvpr.org" },
      { name: "Bakersfield Californian", domain: "bakersfield.com" },
      { name: "Stockton Record", domain: "recordnet.com" },
      { name: "Modesto Bee", domain: "modbee.com" },
    ],
    searchKeywords: ["San Joaquin Valley health", "Central Valley health", "agricultural worker health"],
  },
  {
    region: "Inland Empire",
    slug: "inland-empire",
    counties: ["Riverside", "San Bernardino"],
    keyCities: ["Riverside", "San Bernardino", "Ontario", "Fontana", "Moreno Valley", "Rancho Cucamonga"],
    majorHealthSystems: [
      "Loma Linda University Health",
      "Kaiser Permanente",
      "Riverside University Health System",
      "Arrowhead Regional Medical Center",
    ],
    keyFQHCs: ["Borrego Health", "SAC Health"],
    newsOutlets: [
      { name: "Press-Enterprise", domain: "pe.com" },
      { name: "San Bernardino Sun", domain: "sbsun.com" },
      { name: "Inland Empire Community News", domain: "iecn.com" },
    ],
    searchKeywords: ["Inland Empire health", "Riverside County health", "San Bernardino County health"],
  },
  {
    region: "Central Coast",
    slug: "central-coast",
    counties: ["Santa Barbara", "San Luis Obispo", "Ventura", "Monterey", "Santa Cruz", "San Benito"],
    keyCities: ["Santa Barbara", "Ventura", "Oxnard", "Salinas", "San Luis Obispo", "Santa Cruz"],
    majorHealthSystems: [
      "Cottage Health",
      "Community Memorial Health System",
      "Dignity Health",
      "Natividad Medical Center",
    ],
    keyFQHCs: [
      "Clinicas del Camino Real",
      "Community Health Centers of the Central Coast",
      "Santa Cruz Community Health",
    ],
    newsOutlets: [
      { name: "Santa Barbara Independent", domain: "independent.com" },
      { name: "Ventura County Star", domain: "vcstar.com" },
      { name: "Monterey Herald", domain: "montereyherald.com" },
      { name: "Santa Cruz Sentinel", domain: "santacruzsentinel.com" },
    ],
    searchKeywords: ["Central Coast health", "Ventura County health", "agricultural worker health"],
  },
  {
    region: "North State",
    slug: "north-state",
    counties: ["Shasta", "Butte", "Tehama", "Siskiyou", "Lassen", "Nevada", "Yuba"],
    keyCities: ["Redding", "Chico", "Red Bluff", "Yreka", "Oroville"],
    majorHealthSystems: [
      "Mercy Medical Center Redding",
      "Enloe Medical Center",
      "Adventist Health",
    ],
    keyFQHCs: ["Shasta Community Health Center", "Ampla Health"],
    newsOutlets: [
      { name: "Redding Record Searchlight", domain: "redding.com" },
      { name: "Chico Enterprise-Record", domain: "chicoer.com" },
      { name: "North State Journal", domain: "nsjonline.com" },
    ],
    searchKeywords: ["North State health", "rural health California", "Shasta County health"],
  },
  {
    region: "North Coast",
    slug: "north-coast",
    counties: ["Humboldt", "Del Norte", "Mendocino", "Lake", "Trinity"],
    keyCities: ["Eureka", "Arcata", "Ukiah", "Willits", "Crescent City"],
    majorHealthSystems: [
      "Providence St. Joseph Hospital",
      "Adventist Health",
      "Mendocino Coast District Hospital",
    ],
    keyFQHCs: [
      "Open Door Community Health Centers",
      "Mendocino Coast Clinics",
      "Long Valley Health Center",
    ],
    newsOutlets: [
      { name: "Times-Standard", domain: "times-standard.com" },
      { name: "Mendocino Voice", domain: "mendovoice.com" },
      { name: "Lost Coast Outpost", domain: "lostcoastoutpost.com" },
      { name: "North Coast Journal", domain: "northcoastjournal.com" },
    ],
    searchKeywords: ["North Coast health", "rural health California", "tribal health", "Humboldt County health"],
  },
];

/* ------------------------------------------------------------------ */
/*  Lookup helpers                                                      */
/* ------------------------------------------------------------------ */

/** Get config for a specific region by name */
export function getRegionalNewsConfig(region: string): RegionalNewsConfig | undefined {
  return REGIONAL_NEWS_CONFIGS.find((c) => c.region === region);
}

/** Get config for a specific region by slug */
export function getRegionalNewsConfigBySlug(slug: string): RegionalNewsConfig | undefined {
  return REGIONAL_NEWS_CONFIGS.find((c) => c.slug === slug);
}

/** Get all news outlets across all regions (deduped by domain) */
export function getAllNewsOutlets(): RegionalNewsSource[] {
  const seen = new Set<string>();
  const outlets: RegionalNewsSource[] = [];
  for (const config of REGIONAL_NEWS_CONFIGS) {
    for (const outlet of config.newsOutlets) {
      if (!seen.has(outlet.domain)) {
        seen.add(outlet.domain);
        outlets.push(outlet);
      }
    }
  }
  return outlets;
}
