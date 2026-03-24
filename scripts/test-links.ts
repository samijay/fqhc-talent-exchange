import { INTEL_BRIEF_003, PULSE_003 } from "@/lib/newsletter-editions";

const urls: { label: string; url: string }[] = [];

for (const item of INTEL_BRIEF_003.badNews ?? []) {
  urls.push({ label: `[Bad] ${item.headline.slice(0, 60)}`, url: item.sourceUrl });
}
for (const item of INTEL_BRIEF_003.goodNews ?? []) {
  urls.push({ label: `[Good] ${item.headline.slice(0, 60)}`, url: item.sourceUrl });
}
if (INTEL_BRIEF_003.successStory?.sourceUrl) {
  urls.push({ label: `[Success] ${INTEL_BRIEF_003.successStory.title.slice(0, 60)}`, url: INTEL_BRIEF_003.successStory.sourceUrl });
}
if (INTEL_BRIEF_003.toolkit) {
  urls.push({ label: `[Toolkit] ${INTEL_BRIEF_003.toolkit.title.slice(0, 60)}`, url: INTEL_BRIEF_003.toolkit.url });
}
urls.push({ label: `[Featured] ${INTEL_BRIEF_003.featuredContent.title}`, url: INTEL_BRIEF_003.featuredContent.url });
urls.push({ label: `[Pulse Tool] ${PULSE_003.toolSpotlight.name}`, url: PULSE_003.toolSpotlight.url });
urls.push({ label: `[Pulse Post] ${PULSE_003.featuredPost.title}`, url: PULSE_003.featuredPost.url });
if (PULSE_003.successStory?.sourceUrl) {
  urls.push({ label: `[Pulse Success] ${PULSE_003.successStory.headline.slice(0, 60)}`, url: PULSE_003.successStory.sourceUrl });
}
for (const fqhc of PULSE_003.jobHighlights.topFQHCs) {
  urls.push({ label: `[Pulse Job] ${fqhc.name}`, url: fqhc.url });
}

async function testUrl(label: string, url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const resp = await fetch(url, { 
      method: "HEAD", 
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    });
    clearTimeout(timeout);
    if (resp.status < 400) return `✅ ${resp.status} ${label}\n   ${url}`;
    // retry with GET
    const resp2 = await fetch(url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } });
    if (resp2.status < 400) return `✅ ${resp2.status} ${label}\n   ${url}`;
    return `❌ ${resp2.status} ${label}\n   ${url}`;
  } catch (err: any) {
    try {
      const resp = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000), headers: { "User-Agent": "Mozilla/5.0" } });
      if (resp.status < 400) return `✅ ${resp.status} ${label}\n   ${url}`;
      return `❌ ${resp.status} ${label}\n   ${url}`;
    } catch (err2: any) {
      return `❌ ERR ${label}\n   ${url}\n   ${err2.message?.slice(0, 100)}`;
    }
  }
}

async function main() {
  console.log(`Testing ${urls.length} URLs from Issue #3...\n`);
  const results = await Promise.all(urls.map(u => testUrl(u.label, u.url)));
  for (const r of results) console.log(r);
  const failures = results.filter(r => r.startsWith("❌"));
  console.log(`\n--- ${results.length - failures.length}/${results.length} passed ---`);
  if (failures.length > 0) {
    console.log(`\n⚠️  FAILURES:`);
    for (const f of failures) console.log(f);
  }
}
main();
