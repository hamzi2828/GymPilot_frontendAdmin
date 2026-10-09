"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import Brand from "./Brand";
import { CONTACT, NAV, SITE } from "@/content/site";
import { FEATURES, FEATURE_GROUPS, featuresIn } from "@/content/features";
import { FEATURE_ICONS } from "./featureIcons";

// How far below the top of the viewport a section has to reach before the
// menu treats it as the current one (the header's own height plus a little).
const ACTIVE_OFFSET = 120;

type NavItem = (typeof NAV)[number];

/** The landing-page section that lights a menu item, if any. */
const spyOf = (item: NavItem) => item.spy ?? (item.href.startsWith("#") ? item.href : null);

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/**
 * The Features menu on wide screens: a button that opens a panel of every
 * feature, by group, under the header. A disclosure rather than an ARIA
 * menu -- it is a set of links, so Tab walks through them as on any page.
 * Enter, Space or Arrow Down opens it (Arrow Down also moves into it), Esc
 * closes it and hands focus back to the button, and it closes when focus or
 * a click lands anywhere else.
 */
function FeaturesMenu({ current }: { current: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const focusFirst = () => window.requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("a")?.focus());

  return (
    <div
      ref={wrap}
      onBlur={(e) => {
        if (open && !wrap.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            focusFirst();
          }
        }}
        className={`relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${FOCUS} ${current || open ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
      >
        Features
        <FiChevronDown className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        <span className={`absolute -bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-fuchsia-400 transition-opacity ${current ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
      </button>

      {/* Placed against the header itself (the nearest positioned box), so
          it spans the page under the bar rather than hanging off a button. */}
      <div
        ref={panel}
        id={panelId}
        hidden={!open}
        className="a-menu absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
      >
        <div className="mx-auto max-w-7xl px-8 py-8">
          <div className="grid grid-cols-4 gap-x-8 gap-y-8">
            {FEATURE_GROUPS.map((group) => (
              <div key={group.key}>
                <Link href={`/features#${group.key}`} onClick={() => setOpen(false)} className={`rounded text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300 hover:text-white ${FOCUS}`}>
                  {group.label}
                </Link>
                <ul className="mt-3 space-y-0.5">
                  {featuresIn(group.key).map((f) => {
                    const Icon = FEATURE_ICONS[f.key];
                    const here = pathname === `/features/${f.slug}`;
                    return (
                      <li key={f.key}>
                        <Link
                          href={`/features/${f.slug}`}
                          onClick={() => setOpen(false)}
                          aria-current={here ? "page" : undefined}
                          className={`group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${FOCUS} ${here ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-brand-300" aria-hidden="true" />
                          {f.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-6 border-t border-white/10 pt-5">
            <p className="text-sm text-slate-400">Everything here is in every plan, except the native member app: that is the one add-on.</p>
            <Link href="/features" onClick={() => setOpen(false)} className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${FOCUS}`}>
              All {FEATURES.length} features <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const mobileFeaturesId = useId();

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
    setFeaturesOpen(false);
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
            if (item.menu === "features") return <FeaturesMenu key={item.href} current={current} />;
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
              if (item.menu === "features") {
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      aria-expanded={featuresOpen}
                      aria-controls={mobileFeaturesId}
                      onClick={() => setFeaturesOpen((o) => !o)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium ${FOCUS} ${current ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"}`}
                    >
                      Features
                      <FiChevronDown className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${featuresOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    <div id={mobileFeaturesId} hidden={!featuresOpen} className="a-menu mb-2 ml-3 border-l border-white/10 pl-3">
                      <Link href="/features" onClick={close} aria-current={pathname === "/features" ? "page" : undefined} className={`mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5 ${FOCUS}`}>
                        All {FEATURES.length} features <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      {FEATURE_GROUPS.map((group) => (
                        <div key={group.key} className="mt-3">
                          <Link href={`/features#${group.key}`} onClick={close} className={`block rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300 ${FOCUS}`}>
                            {group.label}
                          </Link>
                          <ul>
                            {featuresIn(group.key).map((f) => {
                              const here = pathname === `/features/${f.slug}`;
                              return (
                                <li key={f.key}>
                                  <Link
                                    href={`/features/${f.slug}`}
                                    onClick={close}
                                    aria-current={here ? "page" : undefined}
                                    className={`block rounded-lg px-3 py-2 text-sm ${FOCUS} ${here ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
                                  >
                                    {f.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
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
