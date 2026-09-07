import { FiPlus } from "react-icons/fi";
import { FAQ } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  return (
    <section id="faq" className="bg-slate-50 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions gyms ask before switching" />
        <Reveal className="mt-12">
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
            {FAQ.map((item, i) => (
              <details key={item.q} className="v-rise group px-6 py-4" style={stagger(i)}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-slate-900 transition-colors hover:text-brand-700">
                  {item.q}
                  <FiPlus className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-45 group-open:text-brand-600" aria-hidden="true" />
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
