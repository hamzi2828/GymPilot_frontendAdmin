import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, text, dark = false, align = "center" }: { eyebrow: string; title: string; text?: string; dark?: boolean; align?: "center" | "left" }) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`v-rise text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-brand-300" : "text-brand-600"}`} style={stagger(0)}>
        {eyebrow}
      </p>
      <h2 className={`v-rise mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? "text-white" : "text-slate-900"}`} style={stagger(1)}>
        {title}
      </h2>
      <span className={`v-fill mt-4 block h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 ${centered ? "mx-auto origin-center" : "origin-left"}`} style={stagger(2)} aria-hidden="true" />
      {text && (
        <p className={`v-rise mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`} style={stagger(3)}>
          {text}
        </p>
      )}
    </Reveal>
  );
}
