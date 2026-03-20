import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawType = searchParams.get("type") || "achievement";
  const rawId = searchParams.get("id") || "";
  const rawName = searchParams.get("name") || "";

  // Sanitize inputs — strip tags and limit length
  const sanitize = (s: string, max = 100) =>
    s.replace(/<[^>]*>/g, "").replace(/[<>"'&]/g, "").trim().slice(0, max);

  const type = rawType.replace(/[^a-z_-]/g, "");
  const id = sanitize(rawId, 200);
  const name = sanitize(rawName);

  // Type label mapping
  const TYPE_LABELS: Record<string, string> = {
    masterclass: "Masterclass Completed",
    course: "Course Completed",
    assessment: "Assessment Completed",
    pathway: "Learning Pathway Completed",
    certification: "Certification Prep Completed",
  };

  const typeLabel = TYPE_LABELS[type] || "Achievement Unlocked";

  // Format the content ID into a readable title
  const title = id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #1c1917 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Trophy icon circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginBottom: "24px",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>

        {/* Name */}
        {name && (
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "8px",
            }}
          >
            {name}
          </div>
        )}

        {/* Type label */}
        <div
          style={{
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "#f59e0b",
            marginBottom: "12px",
          }}
        >
          {typeLabel}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            margin: "24px 0",
          }}
        />

        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            FQHC Talent Exchange
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
