// RSS 2.0 feed for FQHC Intel Brief
// Accessible at /intel-feed.xml

import { INTEL_ITEMS } from "@/lib/fqhc-news-intel";

export const dynamic = "force-static";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Sort by date descending and take the 20 most recent
  const recentItems = [...INTEL_ITEMS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);

  const items = recentItems
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.headline.en)}</title>
      <link>${escapeXml(item.sourceUrl)}</link>
      <description>${escapeXml(item.summary.en)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <category>${escapeXml(item.category)}</category>
      <source url="https://www.fqhctalent.com">${escapeXml(item.sourceOrg)}</source>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FQHC Intel Brief</title>
    <link>https://www.fqhctalent.com</link>
    <description>Breaking intelligence for California FQHC executives — policy, funding, workforce, and strategy</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.fqhctalent.com/intel-feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
