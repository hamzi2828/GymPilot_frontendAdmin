import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 via-purple-600/30 to-fuchsia-600/30" aria-hidden="true" />
            <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-5xl">Ready to run your gym from one place?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-200 sm:text-lg">Book a demo and see your timetable, memberships and website on GymPilot before you decide anything.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#demo" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                  Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="#pricing" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/15">
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
