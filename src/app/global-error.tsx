/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1c1917" }}>
            Something went wrong
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              maxWidth: "28rem",
              fontSize: "0.875rem",
              color: "#57534e",
            }}
          >
            We hit an unexpected error. Try refreshing the page.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#0f766e",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#44403c",
                backgroundColor: "#fff",
                border: "1px solid #d6d3d1",
                borderRadius: "0.5rem",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
          {error.digest && (
            <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#a8a29e" }}>
              Error ID: {error.digest}
            </p>
          )}
          {error.message && (
            <details style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#a8a29e", maxWidth: "40rem" }}>
              <summary style={{ cursor: "pointer" }}>Technical details</summary>
              <pre style={{ marginTop: "0.5rem", textAlign: "left", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}
