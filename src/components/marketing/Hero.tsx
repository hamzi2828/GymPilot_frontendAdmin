import { FiArrowRight, FiCheck, FiPlay } from "react-icons/fi";
import { HERO, SITE } from "@/content/site";
import ProductMock from "./ProductMock";
import Glow from "./Glow";

export default function Hero() {
  return (
    <section id="product" className="relative overflow-hidden bg-slate-950 pb-20 pt-32 text-white sm:pt-36 lg:pb-28 lg:pt-40">
      {/* backdrop */}
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <Glow className="left-1/2 top-0 h-[720px] w-[1200px] -translate-x-1/2 -translate-y-1/3" color="rgba(79,70,229,0.4)" />
      <Glow className="right-0 top-1/3 h-[560px] w-[560px] translate-x-1/3" color="rgba(217,70,239,0.22)" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1.5 pr-3 text-xs font-medium text-slate-300">
            <span className="rounded-full bg-gradient-to-r from-brand-500 to-purple-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">All in one</span>
            {HERO.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]">
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
            <br />
            <span className="text-gradient">{HERO.title[2]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{HERO.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={HERO.primary.href} className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-transform hover:-translate-y-0.5">
              {HERO.primary.label} <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={HERO.secondary.href} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <FiPlay className="h-4 w-4 text-brand-300" /> {HERO.secondary.label}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {HERO.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-emerald-400" /> {t}
              </li>
            ))}
          </ul>

          {SITE.demoGymUrl && (
            <p className="mt-6 text-xs text-slate-500">
              Want to poke around first?{" "}
              <a href={SITE.demoGymUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-300 underline-offset-4 hover:underline">
                Open a live demo gym
              </a>
            </p>
          )}
        </div>

        <div className="relative lg:pl-6">
          <ProductMock />
        </div>
      </div>
    </section>
  );
}
