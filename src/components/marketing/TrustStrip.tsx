import { AUDIENCES, PROOF } from "@/content/site";
import { stagger } from "@/lib/motion";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function TrustStrip() {
  const items = [...AUDIENCES, ...AUDIENCES];
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Built for every kind of gym</p>
        <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <ul className="flex w-max animate-marquee gap-3">
            {items.map((a, i) => (
              <li key={`${a}-${i}`} className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <dt className="flex items-baseline gap-2">
                  <span className="v-pop font-display text-4xl font-extrabold tracking-tight text-slate-900" style={stagger(0)}>
                    <CountUp value={Number(p.value)} />
                  </span>
                  <span className="v-rise text-sm font-semibold text-slate-700" style={stagger(1)}>
                    {p.label}
                  </span>
                </dt>
                <dd className="v-rise mt-2 text-sm leading-relaxed text-slate-500" style={stagger(2)}>
                  {p.hint}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
