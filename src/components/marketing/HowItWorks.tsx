import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HOW_IT_WORKS, STEPS } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Glow from "./Glow";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" aria-hidden="true" />
      <Glow className="left-1/2 top-1/2 h-[680px] w-[1100px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.28)" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading dark eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} text={HOW_IT_WORKS.text} />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120} as="li" className="relative">
              <div className="glass h-full rounded-3xl p-7 md:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 font-display text-lg font-bold text-white shadow-glow">{i + 1}</span>
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{step.title}</h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-slate-300">{step.text}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-brand-300 ring-1 ring-white/10 md:flex" aria-hidden="true">
                  <FiArrowRight className="h-4 w-4" />
                </span>
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={360} className="mt-10 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-300">
            <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-400" /> {HOW_IT_WORKS.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
