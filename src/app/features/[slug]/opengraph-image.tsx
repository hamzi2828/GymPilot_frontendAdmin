import { ImageResponse } from "next/og";
import { FEATURES, featureBySlug, groupOf } from "@/content/features";
import { SITE } from "@/content/site";

// The picture a link to a feature page shows when it is shared: the same
// look as the site's own card, with the feature's headline on it.
export const alt = `A feature of ${SITE.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export default async function FeatureOpenGraphImage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  const group = feature ? groupOf(feature) : null;

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
          {group && <div style={{ marginLeft: 12, fontSize: 24, color: "#a5b4fc" }}>{`Features · ${group.label}`}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: 3 }}>{feature ? feature.name : "Features"}</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1050 }}>{feature ? feature.title : SITE.tagline}</div>
          <div style={{ fontSize: 30, color: "#c7d2fe", maxWidth: 1000, lineHeight: 1.4 }}>{feature ? feature.text : SITE.description}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 22, color: "#a5b4fc" }}>
          {(feature ? feature.points.slice(0, 3) : SITE.heroPills).map((p) => (
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
