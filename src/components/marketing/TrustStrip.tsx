import { AUDIENCES, PROOF } from "@/content/site";
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
              <li key={`${a}-${i}`} className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <dt className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-slate-900">{p.value}</span>
                  <span className="text-sm font-semibold text-slate-700">{p.label}</span>
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-500">{p.hint}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
