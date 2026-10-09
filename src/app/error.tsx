"use client";

// What a visitor sees when a page breaks while it is being shown. It offers
// another go, the way home, and every way to reach us -- never a blank
// screen. Self-contained on purpose: it draws no header or footer, so it
// still works if one of those is what broke.

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import Brand from "@/components/marketing/Brand";
import ContactLinks from "@/components/marketing/ContactLinks";
import Glow from "@/components/marketing/Glow";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // For whoever is looking at the browser's console; nothing is sent anywhere.
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" aria-hidden="true" />
      <Glow className="left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3" color="rgba(245,158,11,0.24)" drift="a" />
      <div className="relative mx-auto max-w-xl">
        <Brand />
        <div className="mt-20 text-center sm:mt-28" role="alert">
          <span className="a-pop mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30">
            <FiAlertTriangle className="h-8 w-8" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Something went wrong</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">This page did not load properly. It is our fault, not yours. Please try again.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="btn-shine btn-shine-dark inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
            >
              <FiRefreshCw className="h-4 w-4" /> Try again
            </button>
            <Link href="/" className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-slate-300 hover:text-white">
              Go to the home page <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-10 text-sm text-slate-400">Still stuck? Tell us.</p>
          <ContactLinks layout="row" className="mt-3" />
        </div>
      </div>
    </main>
  );
}
