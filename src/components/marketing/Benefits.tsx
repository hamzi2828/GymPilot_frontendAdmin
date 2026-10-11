import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { featureHref } from "@/content/features";
import { BENEFITS } from "@/content/site";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_TINTS } from "./featureIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// What a gym owner gets out of it: six outcomes, a sentence each. A landing
// page that lists every feature stops being read, so the detail lives on each
// feature's own page, one tap from its card, and the full list on /features.
export default function Benefits() {
  return (
    <section id="features" className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={BENEFITS.eyebrow} title={BENEFITS.title} text={BENEFITS.text} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.items.map((item, i) => {
            const Icon = FEATURE_ICONS[item.key];
            return (
              <Reveal key={item.key} delay={(i % 3) * 80} as="li">
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className={`v-pop inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${FEATURE_TINTS[item.key]}`} style={stagger(0)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="v-rise mt-4 font-display text-xl font-semibold tracking-tight text-slate-900" style={stagger(1)}>
                    {/* Stretched over the whole card, so a tap anywhere opens
                        the feature behind it; the outcome is the link text. */}
                    <Link href={featureHref(item.key)} className="outline-none before:absolute before:inset-0 before:rounded-2xl before:content-['']">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="v-rise mt-2 text-base leading-relaxed text-slate-600" style={stagger(2)}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={200} className="mt-10 flex justify-center">
          <Link
            href="/features"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {BENEFITS.cta} <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
