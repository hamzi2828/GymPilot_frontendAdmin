import { TESTIMONIALS } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="What owners notice first" title="Less admin. More floor time." />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.quote} delay={i * 100} as="li">
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lift">
                <span className="v-pop font-display text-5xl leading-none text-brand-300" style={stagger(0)} aria-hidden="true">
                  “
                </span>
                <blockquote className="v-rise mt-2 flex-1 text-base leading-relaxed text-slate-800" style={stagger(1)}>
                  {t.quote}
                </blockquote>
                <figcaption className="v-rise mt-6 flex items-center gap-3" style={stagger(2)}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-500 text-sm font-bold text-white">{t.who[0]}</span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{t.who}</span>
                    <span className="block text-xs text-slate-500">{t.where}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
