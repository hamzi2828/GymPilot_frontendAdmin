import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1020 0%, #1e1b4b 60%, #312e81 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800 }}>G</div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{SITE.tagline}</div>
          <div style={{ fontSize: 28, color: "#c7d2fe", maxWidth: 960, lineHeight: 1.4 }}>{SITE.description}</div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#a5b4fc" }}>
          {SITE.heroPills.map((p) => (
            <div key={p} style={{ padding: "8px 18px", borderRadius: 999, border: "1px solid rgba(165,180,252,0.35)" }}>
              {p}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
