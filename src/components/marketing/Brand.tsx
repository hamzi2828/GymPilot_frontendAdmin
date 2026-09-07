import Link from "next/link";
import { SITE } from "@/content/site";

export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`a-pop inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 text-white shadow-lg shadow-brand-500/30 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="currentColor">
        <path d="M3 10h2v4H3v-4Zm16 0h2v4h-2v-4ZM6 8h2v8H6V8Zm10 0h2v8h-2V8Zm-7 3h6v2H9v-2Z" />
      </svg>
    </span>
  );
}

export default function Brand({ dark = true, href = "/" }: { dark?: boolean; href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
      <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <BrandMark />
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>{SITE.name}</span>
    </Link>
  );
}
