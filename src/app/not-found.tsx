import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SiteHeader from "@/components/marketing/SiteHeader";
import SiteFooter from "@/components/marketing/SiteFooter";
import Glow from "@/components/marketing/Glow";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Page not found",
};

const LINKS = [
  { label: "All features", href: "/features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact us", href: "/contact" },
];

// An address that leads nowhere: say so, and offer the pages people usually
// wanted instead of the browser's bare "404".
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden bg-slate-950 px-5 pb-24 pt-36 text-white sm:px-8 sm:pt-44">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
        <Glow className="left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2" color="rgba(79,70,229,0.34)" drift="a" />
        <div className="relative mx-auto max-w-xl text-center">
          <p className="a-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-300" style={stagger(0)}>
            Error 404
          </p>
          <h1 className="a-rise mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl" style={stagger(1)}>
            We could not find that page
          </h1>
          <p className="a-rise mt-5 text-lg leading-relaxed text-slate-300" style={stagger(2)}>
            The link may be old, or the address may have a typing mistake. These will get you back on track.
          </p>
          <div className="a-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={stagger(3)}>
            <Link href="/" className="btn-shine btn-shine-dark group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5">
              Go to the home page <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="a-rise mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={stagger(4)}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold text-slate-300 underline-offset-4 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
