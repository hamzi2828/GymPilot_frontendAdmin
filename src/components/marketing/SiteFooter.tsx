import Link from "next/link";
import { FiMail, FiPhone } from "react-icons/fi";
import Brand from "./Brand";
import { FOOTER, SITE } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{FOOTER.blurb}</p>
            {(SITE.contactEmail || SITE.contactPhone) && (
              <div className="mt-5 flex flex-col gap-1.5 text-sm">
                {SITE.contactEmail && (
                  <a href={`mailto:${SITE.contactEmail}`} className="inline-flex items-center gap-2 hover:text-white">
                    <FiMail className="h-4 w-4" /> {SITE.contactEmail}
                  </a>
                )}
                {SITE.contactPhone && (
                  <a href={`tel:${SITE.contactPhone}`} className="inline-flex items-center gap-2 hover:text-white">
                    <FiPhone className="h-4 w-4" /> {SITE.contactPhone}
                  </a>
                )}
              </div>
            )}
          </div>
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    {/* A section of the landing page is reachable from every
                        page, so its link always carries the leading slash. */}
                    <Link href={l.href.startsWith("#") ? `/${l.href}` : l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Every gym on {SITE.name} runs in its own database on its own domain.</p>
        </div>
      </div>
    </footer>
  );
}
