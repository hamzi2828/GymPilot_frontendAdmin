import Link from "next/link";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FEATURES_INTRO, HIGHLIGHTS } from "@/content/features";
import { stagger } from "@/lib/motion";
import { FEATURE_ICONS, FEATURE_PICTURES, FEATURE_TINTS } from "./FeaturePictures";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// The six that sell the product. Everything else is on /features, one click
// away — a landing page that lists twelve of anything stops being read.
//
// Three rows of six columns: a wide card (text beside the picture) and a
// narrow one (picture over text), alternating so neither side is always big.
const LAYOUT: Record<string, { span: string; wide?: boolean }> = {
  billing: { span: "md:col-span-2 lg:col-span-4", wide: true },
  booking: { span: "lg:col-span-2" },
  frontdesk: { span: "lg:col-span-2" },
  messaging: { span: "md:col-span-2 lg:col-span-4", wide: true },
  website: { span: "md:col-span-2 lg:col-span-4", wide: true },
  reports: { span: "lg:col-span-2" },
};

export default function Features() {
  return (
    <section id="features" className="relative bg-slate-50 py-24 sm:py-28">
      <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={FEATURES_INTRO.eyebrow} title={FEATURES_INTRO.title} text={FEATURES_INTRO.text} />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {HIGHLIGHTS.map((f, i) => {
            const Icon = FEATURE_ICONS[f.key];
            const Picture = FEATURE_PICTURES[f.key];
            const layout = LAYOUT[f.key] || { span: "lg:col-span-2" };
            const text = (
              <div className={layout.wide ? "flex flex-col justify-center" : ""}>
                <span className={`v-pop inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${FEATURE_TINTS[f.key]}`} style={stagger(0)}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <h3 className="v-rise mt-4 font-display text-lg font-semibold tracking-tight text-slate-900" style={stagger(1)}>
                  {f.title}
                </h3>
                <p className="v-rise mt-2 text-sm leading-relaxed text-slate-600" style={stagger(2)}>
                  {f.text}
                </p>
                {/* Three at most: the landing page is a shop window, and the
                    rest of each list is on /features. */}
                <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                  {f.points.slice(0, 3).map((p, j) => (
                    <li key={p} className="v-rise flex items-start gap-2" style={stagger(3 + j)}>
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
            return (
              <Reveal key={f.key} delay={(i % 3) * 80} className={layout.span} as="article">
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                  {layout.wide ? (
                    <div className="grid h-full gap-6 lg:grid-cols-[1fr_1.1fr]">
                      {text}
                      {Picture && <Picture />}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col gap-5">
                      {Picture && <Picture />}
                      {text}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* The six above are a sixth of the product, so this is the most
            important link on the page: a lit halo, a shine that sweeps by
            itself and an arrow that keeps nudging. Nobody scrolls past it
            wondering whether there is more. */}
        <Reveal delay={200} className="mt-14 flex flex-col items-center">
          <div className="flex items-center gap-2 sm:gap-5">
            <FaHandPointRight aria-hidden="true" className="a-point-r h-7 w-7 shrink-0 text-brand-500 drop-shadow-sm sm:h-10 sm:w-10" />

            <div className="relative">
              {/* Three layers of "look here": a lit halo, a ring that leaves
                  the button every couple of seconds, and a shine that sweeps
                  across on its own. */}
              <span
                aria-hidden="true"
                className="a-halo pointer-events-none absolute -inset-5 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.55), transparent 72%)" }}
              />
              <span aria-hidden="true" className="a-ping-ring pointer-events-none absolute inset-0 rounded-full ring-2 ring-brand-500" />
              <Link
                href="/features"
                className="btn-sweep group relative inline-flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 px-7 text-base font-bold text-white shadow-lift ring-1 ring-white/25 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] sm:px-10 sm:text-lg"
              >
                {FEATURES_INTRO.cta}
                <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <FaHandPointLeft aria-hidden="true" className="a-point-l h-7 w-7 shrink-0 text-brand-500 drop-shadow-sm sm:h-10 sm:w-10" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">Every one of them is in every plan.</p>
        </Reveal>
      </div>
    </section>
  );
}
