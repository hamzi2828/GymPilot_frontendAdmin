"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import Brand from "./Brand";
import { CONTACT, NAV, SITE } from "@/content/site";

// How far below the top of the viewport a section has to reach before the
// menu treats it as the current one (the header's own height plus a little).
const ACTIVE_OFFSET = 120;

type NavItem = (typeof NAV)[number];

/** The landing-page section that lights a menu item, if any. */
const spyOf = (item: NavItem) => item.spy ?? (item.href.startsWith("#") ? item.href : null);

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export default function SiteHeader() {
  const pathname = usePathname();
  // The menu's "#…" targets are sections of the landing page. From anywhere
  // else they have to carry the "/" so they still lead somewhere.
  const onLanding = pathname === "/";
  const href = (target: string) => (target.startsWith("#") && !onLanding ? `/${target}` : target);
  const onFeatures = pathname === "/features" || pathname.startsWith("/features/");

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Scroll-spy: the menu item for the section currently on screen is lit.
  useEffect(() => {
    const ids = onLanding ? NAV.map(spyOf).filter((h): h is string => !!h).map((h) => h.slice(1)) : [];
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = `#${id}`;
      }
      // At the very bottom the last section counts even if it is short.
      if (ids.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = `#${ids[ids.length - 1]}`;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [onLanding]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Features is lit anywhere under /features, and over its landing section.
  const isActive = (item: NavItem) => (item.menu === "features" && onFeatures) || (onLanding && !!spyOf(item) && active === spyOf(item));
  const close = () => setOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open || !onLanding ? "border-b border-white/10 bg-slate-950/95" : "border-b border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const current = isActive(item);
            return (
              <Link key={item.href} href={href(item.href)} aria-current={current ? "true" : undefined} className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${FOCUS} ${current ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
                {item.label}
                <span className={`absolute -bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400 transition-opacity ${current ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {SITE.whatsappUrl && (
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 ${FOCUS}`}>
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
          )}
          <Link href={href("#demo")} className={`btn-shine btn-shine-dark group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-transform hover:-translate-y-0.5 ${FOCUS}`}>
            Book a demo <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={`rounded-lg p-2 text-slate-200 hover:bg-white/10 lg:hidden ${FOCUS}`}>
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-slate-950 px-5 py-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => {
              const current = isActive(item);
              return (
                <Link key={item.href} href={href(item.href)} onClick={close} aria-current={current ? "true" : undefined} className={`rounded-lg px-3 py-3 text-base font-medium ${FOCUS} ${current ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link href={href("#demo")} onClick={close} className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 ${FOCUS}`}>
              Book a demo <FiArrowRight className="h-4 w-4" />
            </Link>
            {SITE.whatsappUrl && (
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white ${FOCUS}`}>
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" /> Message us on WhatsApp
              </a>
            )}
            <Link href="/contact" onClick={close} className={`inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-200 ${FOCUS}`}>
              Contact us
            </Link>
            {/* No sign-in here: a gym signs in on its own website, and the
                platform's own sign-in is one quiet link in the footer. */}
            <p className="px-1 pt-1 text-center text-xs leading-relaxed text-slate-500">{CONTACT.existing}</p>
          </div>
        </div>
      )}
    </header>
  );
}
