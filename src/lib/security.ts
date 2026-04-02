/**
 * Security utilities for the FQHC Talent
 */

import crypto from "crypto";

/**
 * Constant-time comparison of two strings to prevent timing attacks.
 * Use for comparing secrets (API keys, auth tokens, etc.)
 */
export function verifySecret(actual: string, expected: string): boolean {
  if (actual.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
  } catch {
    return false;
  }
}

/**
 * Standard email footer with physical address for CAN-SPAM compliance.
 * Include at the bottom of all outbound emails.
 */
export const EMAIL_FOOTER_HTML = `<p style="font-size:10px;color:#a8a29e;margin-top:24px;border-top:1px solid #e7e5e4;padding-top:12px;">FQHC Talent &middot; Los Angeles, CA &middot; <a href="https://www.fqhctalent.com/privacy" style="color:#a8a29e;text-decoration:underline;">Privacy Policy</a></p>`;

/**
 * Escape HTML special characters to prevent XSS in email templates.
 * Use this on ANY user-supplied string before inserting into HTML.
 */
export function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Simple in-memory rate limiter for API routes.
 *
 * Uses a sliding window approach per IP address.
 * Not shared across serverless instances (Vercel), but provides
 * baseline protection against rapid abuse from a single source.
 *
 * For production-grade rate limiting, consider @upstash/ratelimit with Redis.
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Max requests per window (default: 10) */
  limit?: number;
  /** Window size in milliseconds (default: 60000 = 1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { limit = 10, windowMs = 60_000 } = options;
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  return { allowed: true, remaining: limit - entry.count, resetTime: entry.resetTime };
}

/**
 * Extract client IP from request headers.
 *
 * Prefers x-real-ip (set by Vercel from the actual connection and cannot be
 * spoofed) over x-forwarded-for (which CAN be spoofed by adding extra IPs).
 */
export function getClientIp(request: Request): string {
  // x-real-ip is set by Vercel/Nginx from the TCP connection — trustworthy
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // x-forwarded-for can be spoofed, but is a reasonable fallback
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

/**
 * Validate that a request's Origin header matches an allowed domain.
 * Use on public POST endpoints to prevent cross-site form submissions (CSRF).
 *
 * Returns true if the origin is allowed, false otherwise.
 */
const ALLOWED_ORIGINS = [
  "https://www.fqhctalent.com",
  "https://fqhctalent.com",
  // Allow localhost in development
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://localhost:3001"]
    : []),
];

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  // If no Origin header (e.g. server-to-server), allow it — rate limiting covers abuse
  if (!origin) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

/**
 * Check Content-Length header to reject oversized payloads early.
 * Returns true if the payload is within the limit (or no Content-Length header).
 * Use on POST endpoints to prevent memory exhaustion from giant payloads.
 */
export function checkContentLength(request: Request, maxBytes: number): boolean {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return true; // No header — rely on body parsing limits
  const length = parseInt(contentLength, 10);
  if (isNaN(length)) return true;
  return length <= maxBytes;
}
