"use client";

// Plans come from the platform's own price list (the super admin edits them
// in the panel), so the website never disagrees with what a gym is charged.

import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { PRICING } from "@/content/site";
import { formatMoney, publicFetch, type PublicPlan } from "@/lib/api";
import { stagger } from "@/lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function limit(n: number) {
  return n ? n.toLocaleString() : "Unlimited";
}

export default function Pricing() {
  const [plans, setPlans] = useState<PublicPlan[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    publicFetch<{ data: PublicPlan[] }>("/plans")
      .then((res) => setPlans(res.data))
      .catch(() => setFailed(true));
  }, []);

  const popular = plans && plans.length >= 3 ? 1 : 0;
  const anyYearly = !!plans?.some((p) => p.price.yearly > 0);

  return (
    <section id="pricing" className="relative bg-slate-50 py-24 sm:py-28">
      <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={PRICING.eyebrow} title={PRICING.title} text={PRICING.text} />

        {anyYearly && (
          <div className="a-rise mt-10 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-sm shadow-card" role="group" aria-label="Billing period">
              {[
                ["monthly", "Monthly"],
                ["yearly", "Yearly"],
              ].map(([key, label]) => {
                const active = (key === "yearly") === yearly;
                return (
                  <button key={key} type="button" onClick={() => setYearly(key === "yearly")} aria-pressed={active} className={`rounded-full px-4 py-1.5 font-semibold transition-all duration-300 ${active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:text-slate-900"}`}>
                    {label}
                    {key === "yearly" && <span className={`ml-1.5 text-[11px] ${active ? "text-emerald-300" : "text-emerald-600"}`}>save</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12">
          {plans === null && !failed && (
            <div className="grid gap-5 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[420px] animate-pulse rounded-3xl border border-slate-200 bg-white" />
              ))}
            </div>
          )}

          {(failed || (plans && plans.length === 0)) && (
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-base text-slate-600">{PRICING.fallback}</p>
              <a href="#demo" className="btn-shine mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white">
                Book a demo <FiArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {plans && plans.length > 0 && (
            <div className={`grid gap-5 ${plans.length === 1 ? "mx-auto max-w-md" : plans.length === 2 ? "mx-auto max-w-4xl md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
              {plans.map((plan, i) => {
                const isPopular = i === popular;
                const perMonth = yearly && plan.price.yearly > 0 ? plan.price.yearly / 12 : plan.price.monthly;
                const saving = plan.price.yearly > 0 && plan.price.monthly > 0 ? Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100) : 0;
                return (
                  <article key={plan.id} className={`a-rise relative flex flex-col rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${isPopular ? "border-brand-500 bg-slate-950 text-white shadow-glow" : "border-slate-200 bg-white text-slate-900 shadow-card hover:shadow-lift"}`} style={stagger(i * 2)}>
                    {isPopular && <span className="absolute -top-3 left-7 animate-pulse-soft rounded-full bg-gradient-to-r from-brand-500 to-purple-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Most popular</span>}
                    <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                    {plan.description && <p className={`mt-1.5 text-sm ${isPopular ? "text-slate-300" : "text-slate-500"}`}>{plan.description}</p>}
                    <p key={yearly ? "yearly" : "monthly"} className="a-pop mt-6 flex origin-left items-baseline gap-1.5">
                      <span className="font-display text-4xl font-extrabold tracking-tight">{perMonth === 0 ? "Free" : formatMoney(perMonth, plan.price.currency)}</span>
                      {perMonth > 0 && <span className={`text-sm ${isPopular ? "text-slate-400" : "text-slate-500"}`}>/ month</span>}
                    </p>
                    <p className={`mt-1 text-xs ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                      {yearly && plan.price.yearly > 0 ? `${formatMoney(plan.price.yearly, plan.price.currency)} billed yearly${saving > 0 ? ` · save ${saving}%` : ""}` : plan.price.yearly > 0 ? `or ${formatMoney(plan.price.yearly, plan.price.currency)} / year` : "billed monthly"}
                      {plan.trialDays > 0 ? ` · ${plan.trialDays}-day free trial` : ""}
                    </p>

                    <a href="#demo" className={`btn-shine mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5 ${isPopular ? "btn-shine-dark bg-white text-slate-900" : "bg-slate-900 text-white"}`}>
                      {plan.trialDays > 0 ? "Start free trial" : "Get started"} <FiArrowRight className="h-4 w-4" />
                    </a>

                    <dl className={`mt-6 grid grid-cols-2 gap-2 text-xs ${isPopular ? "text-slate-300" : "text-slate-600"}`}>
                      {[
                        ["Members", plan.limits.maxMembers],
                        ["Staff", plan.limits.maxStaff],
                        ["Trainers", plan.limits.maxTrainers],
                        ["Classes", plan.limits.maxClasses],
                      ].map(([l, n], j) => (
                        <div key={String(l)} className={`a-pop rounded-xl px-3 py-2 ${isPopular ? "bg-white/[0.06]" : "bg-slate-50"}`} style={stagger(i * 2 + 3 + j)}>
                          <dt className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{l}</dt>
                          <dd className={`text-sm font-semibold ${isPopular ? "text-white" : "text-slate-900"}`}>{limit(Number(n))}</dd>
                        </div>
                      ))}
                    </dl>

                    {plan.features.length > 0 && (
                      <ul className={`mt-6 space-y-2 text-sm ${isPopular ? "text-slate-200" : "text-slate-700"}`}>
                        {plan.features.map((f, j) => (
                          <li key={f} className="a-rise flex items-start gap-2" style={stagger(i * 2 + 6 + j)}>
                            <FiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${isPopular ? "text-emerald-400" : "text-emerald-500"}`} /> {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <Reveal className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <p className="v-rise text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400" style={stagger(0)}>
              Included in every plan
            </p>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING.included.map((f, i) => (
                <li key={f} className="v-rise flex items-center gap-2" style={stagger(1 + i)}>
                  <FiCheck className="h-4 w-4 shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
