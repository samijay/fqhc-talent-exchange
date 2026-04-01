import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "220 California FQHCs — Ratings, Salaries & Strategy";
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
        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>FQHC Directory</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#99f6e4",
            textAlign: "center",
            marginTop: "20px",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Ratings, Salaries & Strategy for Every California FQHC
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "48px",
            padding: "20px 48px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: "#fbbf24" }}>220+</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>FQHCs</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: "#fbbf24" }}>9</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>Regions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: "#fbbf24" }}>30+</span>
            <span style={{ fontSize: 16, color: "#99f6e4" }}>Roles Tracked</span>
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
          fqhctalent.com/directory
        </div>
      </div>
    ),
    { ...size }
  );
}
