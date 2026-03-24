import { getDripEmail } from "@/lib/drip-templates";

// Extract all URLs from drip HTML
const urlSet = new Set<string>();

const tracks = ["the-pulse", "intel-brief", "both"];
for (const track of tracks) {
  for (let step = 0; step < 3; step++) {
    const email = getDripEmail(track, step, "https://www.fqhctalent.com/newsletter/unsubscribe?token=test-token");
    if (email) {
      const matches = email.html.matchAll(/href="(https?:\/\/[^"]+)"/g);
      for (const m of matches) {
        urlSet.add(m[1]);
      }
    }
  }
}

const urls = [...urlSet].sort();
console.log(`Found ${urls.length} unique URLs across all 9 drip emails.\n`);

async function testUrl(url: string): Promise<string> {
  try {
    const resp = await fetch(url, { 
      method: "HEAD", 
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    });
    if (resp.status < 400) return `✅ ${resp.status} ${url}`;
    // retry with GET
    const resp2 = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000) });
    if (resp2.status < 400) return `✅ ${resp2.status} ${url}`;
    return `❌ ${resp2.status} ${url}`;
  } catch {
    try {
      const resp = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000) });
      if (resp.status < 400) return `✅ ${resp.status} ${url}`;
      return `❌ ${resp.status} ${url}`;
    } catch (err: any) {
      return `❌ ERR ${url} — ${err.message?.slice(0, 80)}`;
    }
  }
}

async function main() {
  const results = await Promise.all(urls.map(u => testUrl(u)));
  for (const r of results) console.log(r);
  const failures = results.filter(r => r.startsWith("❌"));
  console.log(`\n--- ${results.length - failures.length}/${results.length} passed ---`);
  if (failures.length > 0) {
    console.log(`\n⚠️  FAILURES:`);
    for (const f of failures) console.log(f);
  }
}
main();
