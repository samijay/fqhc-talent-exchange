import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "FQHC Talent Exchange — Connecting community health professionals with FQHCs across California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        {/* Heart icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="#f59e0b"
            stroke="#f59e0b"
            strokeWidth="2"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            display: "flex",
            gap: "16px",
          }}
        >
          <span>FQHC</span>
          <span style={{ color: "#fbbf24" }}>Talent</span>
          <span>Exchange</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#99f6e4",
            textAlign: "center",
            marginTop: "24px",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Connecting community health professionals with FQHCs across California
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "48px",
            padding: "20px 40px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>87</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>FQHCs</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>165+</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>Jobs</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>100%</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>Free</span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 20,
            color: "#5eead4",
            marginTop: "32px",
          }}
        >
          fqhctalent.com
        </div>
      </div>
    ),
    { ...size }
  );
}
