import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 text-center text-white sm:px-16">
            {/* a slowly turning aurora behind the words */}
            <div className="a-spin-slow absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2" style={{ background: "conic-gradient(from 0deg, rgba(99,102,241,0.45), rgba(217,70,239,0.3), rgba(16,185,129,0.25), rgba(99,102,241,0.45))" }} aria-hidden="true" />
            <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />
            <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <h2 className="v-rise font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-5xl" style={stagger(0)}>
                Ready to run your gym from one place?
              </h2>
              <p className="v-rise mx-auto mt-4 max-w-xl text-base text-slate-200 sm:text-lg" style={stagger(1)}>
                Book a demo and see your timetable, memberships and website on GymPilot before you decide anything.
              </p>
              <div className="v-rise mt-8 flex flex-col justify-center gap-3 sm:flex-row" style={stagger(2)}>
                {/* Always absolute: this band appears on more than one page. */}
                <Link href="/#demo" className="btn-shine btn-shine-dark group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
                  Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/#pricing" className="btn-shine inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/15">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
