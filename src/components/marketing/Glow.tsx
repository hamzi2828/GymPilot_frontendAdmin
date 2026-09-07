// A soft coloured glow behind content. A radial gradient, not a blurred
// element: CSS blur filters on large elements are expensive to paint on
// every scroll frame, a gradient costs nothing.
export default function Glow({ className = "", color = "rgba(79,70,229,0.35)" }: { className?: string; color?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-full ${className}`} style={{ background: `radial-gradient(closest-side, ${color}, transparent 72%)` }} />;
}
