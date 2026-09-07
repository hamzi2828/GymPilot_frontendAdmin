import { FiArrowRight, FiCheck, FiGlobe, FiSettings, FiSmartphone } from "react-icons/fi";
import { WHAT_YOU_GET } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";

const ICONS = [FiGlobe, FiSmartphone, FiSettings];
const TINTS = ["from-orange-500 to-rose-500", "from-brand-500 to-purple-500", "from-emerald-500 to-teal-500"];

// The point a buyer has to get before anything else: this is not one more
// piece of software for the desk. It is the website, the member app and the
// management system, set up together.
export default function WhatYouGet() {
  return (
    <section id="included" className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="v-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-600" style={stagger(0)}>
            {WHAT_YOU_GET.eyebrow}
          </p>
          <h2 className="v-rise mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]" style={stagger(1)}>
            {WHAT_YOU_GET.title}
          </h2>
          <p className="v-rise mt-4 text-base leading-relaxed text-slate-600 sm:text-lg" style={stagger(2)}>
            {WHAT_YOU_GET.text}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {WHAT_YOU_GET.parts.map((part, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={part.title} delay={i * 110} as="article">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lift">
                  <span className={`v-pop inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${TINTS[i]} text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`} style={stagger(0)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="v-rise mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400" style={stagger(1)}>
                    {part.kicker}
                  </p>
                  <h3 className="v-rise mt-1 font-display text-2xl font-bold tracking-tight text-slate-900" style={stagger(2)}>
                    {part.title}
                  </h3>
                  <p className="v-rise mt-3 text-sm leading-relaxed text-slate-600" style={stagger(3)}>
                    {part.text}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-700">
                    {part.points.map((p, j) => (
                      <li key={p} className="v-rise flex items-start gap-2" style={stagger(4 + j)}>
                        <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={360} className="mt-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-slate-950 px-7 py-6 text-white sm:flex-row">
            <p className="v-rise font-display text-lg font-semibold sm:text-xl" style={stagger(0)}>
              {WHAT_YOU_GET.banner.strong} <span className="font-normal text-slate-300">{WHAT_YOU_GET.banner.rest}</span>
            </p>
            <a href="#demo" className="btn-shine btn-shine-dark v-pop group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5" style={stagger(2)}>
              {WHAT_YOU_GET.banner.cta} <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
