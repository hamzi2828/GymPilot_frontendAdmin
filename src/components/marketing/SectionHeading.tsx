import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, text, dark = false, align = "center" }: { eyebrow: string; title: string; text?: string; dark?: boolean; align?: "center" | "left" }) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-brand-300" : "text-brand-600"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{text}</p>}
    </Reveal>
  );
}
