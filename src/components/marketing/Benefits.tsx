import Link from "next/link";
import { FaHandPointRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BENEFITS } from "@/content/site";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_TINTS } from "./featureIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// What a gym owner gets out of it: six outcomes, a sentence each, to read
// rather than click -- the header's Features lands here. A landing page that
// lists every feature stops being read, so one button under the cards leads
// to the full list on /features, where each feature has its own page.
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
                <div className="relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className={`v-pop inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${FEATURE_TINTS[item.key]}`} style={stagger(0)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="v-rise mt-4 font-display text-xl font-semibold tracking-tight text-slate-900" style={stagger(1)}>
                    {item.title}
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
            className="btn-sweep group inline-flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-brand-600 via-purple-600 to-fuchsia-600 px-8 text-base font-bold text-white shadow-xl shadow-brand-600/30 ring-4 ring-brand-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            {/* The hand keeps nudging towards the words, so the one way on
                from this section is hard to miss; it holds still for anyone
                who has asked for reduced motion. */}
            <FaHandPointRight className="a-point-r h-5 w-5 text-amber-300" aria-hidden="true" />
            {BENEFITS.cta}
            <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
