// RSS 2.0 feed for FQHC Talent Exchange blog
// Accessible at /blog-feed.xml

import { BLOG_POSTS } from "@/lib/blog-posts";

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
  const livePosts = BLOG_POSTS.filter((p) => p.live !== false);

  const items = livePosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://www.fqhctalent.com/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.isoDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://www.fqhctalent.com/blog/${post.slug}</guid>
      <category>${escapeXml(post.category)}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FQHC Talent Exchange — Blog</title>
    <link>https://www.fqhctalent.com/blog</link>
    <description>Strategic intelligence and career guidance for California's FQHC workforce</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.fqhctalent.com/blog-feed.xml" rel="self" type="application/rss+xml" />
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
