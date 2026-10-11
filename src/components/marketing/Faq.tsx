import { FiChevronDown, FiPlus } from "react-icons/fi";
import { FAQ } from "@/content/site";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Question({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <details className="v-rise group px-6 py-4" style={stagger(index)}>
      <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold text-slate-900 transition-colors hover:text-brand-700">
        {q}
        <FiPlus className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-45 group-open:text-brand-600" aria-hidden="true" />
      </summary>
      <p className="mt-3 pr-8 text-sm leading-relaxed text-slate-600">{a}</p>
    </details>
  );
}

// The few questions a gym owner asks first are on show; the rest open under
// "More questions", so the page stays short and nothing is taken away.
export default function Faq() {
  const first = FAQ.filter((item) => !item.more);
  const more = FAQ.filter((item) => item.more);
  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions gyms ask first" />
        <Reveal className="mt-12">
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
            {first.map((item, i) => (
              <Question key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>

          {more.length > 0 && (
            <details className="group/more mt-4">
              <summary className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-brand-300 hover:text-brand-700">
                More questions
                <FiChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open/more:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card">
                {more.map((item, i) => (
                  <Question key={item.q} q={item.q} a={item.a} index={i} />
                ))}
              </div>
            </details>
          )}
        </Reveal>
      </div>
    </section>
  );
}
