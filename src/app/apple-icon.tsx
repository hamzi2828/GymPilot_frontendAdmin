import { ImageResponse } from "next/og";

// The icon a phone shows when the site is added to its home screen. Drawn
// from the same shapes as icon.svg, on a full square: the phone rounds the
// corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// icon.svg's dumbbell, on its 64-unit grid: [x, y, width, height].
const BARS = [
  [10, 26, 5, 12],
  [49, 26, 5, 12],
  [17, 21, 6, 22],
  [41, 21, 6, 22],
  [23, 29, 18, 6],
];

export default function AppleIcon() {
  const scale = size.width / 64;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
        {BARS.map(([x, y, w, h], i) => (
          <div key={i} style={{ position: "absolute", left: x * scale, top: y * scale, width: w * scale, height: h * scale, background: "#ffffff" }} />
        ))}
      </div>
    ),
    size
  );
}
