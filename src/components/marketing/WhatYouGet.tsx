import { FiGlobe, FiSettings, FiSmartphone } from "react-icons/fi";
import { WHAT_YOU_GET } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS = [FiSettings, FiGlobe, FiSmartphone];
const TINTS = ["from-emerald-500 to-teal-500", "from-orange-500 to-rose-500", "from-brand-500 to-purple-500"];

// What the gym actually receives, in three lines: the system behind the desk,
// its own website and the member portal, set up together.
export default function WhatYouGet() {
  return (
    <section id="included" className="relative border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={WHAT_YOU_GET.eyebrow} title={WHAT_YOU_GET.title} text={WHAT_YOU_GET.text} />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {WHAT_YOU_GET.parts.map((part, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={part.title} delay={i * 110} as="li">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-card">
                  <span className={`v-pop inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${TINTS[i]} text-white shadow-lg`} style={stagger(0)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="v-rise mt-4 font-display text-xl font-semibold tracking-tight text-slate-900" style={stagger(1)}>
                    {part.title}
                  </h3>
                  <p className="v-rise mt-2 text-base leading-relaxed text-slate-600" style={stagger(2)}>
                    {part.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
