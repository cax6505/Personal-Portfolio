import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Charan Adithya — Portfolio";
    const desc = searchParams.get("desc") || "Frontend/Full-stack Engineer & AI/ML Enthusiast";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#09090b",
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(139, 92, 246, 0.15) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
            padding: "80px",
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span style={{ fontSize: "20px", fontFamily: "monospace", color: "#a1a1aa", textTransform: "uppercase" }}>
              Charan Adithya • Portfolio
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                background: "linear-gradient(to bottom, #ffffff, #a1a1aa)",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p style={{ fontSize: "24px", color: "#a1a1aa", margin: 0, maxWidth: "800px", fontWeight: 400 }}>
              {desc}
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", fontSize: "16px", fontFamily: "monospace", color: "#a78bfa" }}>
              Next.js 16
            </span>
            <span style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", fontSize: "16px", fontFamily: "monospace", color: "#a78bfa" }}>
              TypeScript
            </span>
            <span style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.15)", fontSize: "16px", fontFamily: "monospace", color: "#a78bfa" }}>
              AI/ML Engineering
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
