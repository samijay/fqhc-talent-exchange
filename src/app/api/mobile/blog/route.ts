import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`mobile-blog-${ip}`, { limit: 30, windowMs: 60000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  // Return all live blog posts sorted by date descending
  const posts = BLOG_POSTS
    .filter((p) => p.live !== false)
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      esTitle: p.esTitle,
      description: p.description,
      esDescription: p.esDescription,
      date: p.date,
      esDate: p.esDate,
      isoDate: p.isoDate,
      category: p.category,
      esCategory: p.esCategory,
      readTime: p.readTime,
      esReadTime: p.esReadTime,
      // Blog articles open in web view since they have complex layouts
      webUrl: `https://www.fqhctalent.com/blog/${p.slug}`,
    }));

  return NextResponse.json({ data: posts, totalCount: posts.length });
}
