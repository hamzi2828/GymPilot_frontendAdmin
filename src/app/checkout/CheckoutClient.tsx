"use client";

// Checkout. Pick a plan, add what you want to it, tell us who you are.
//
// No card is asked for: every plan starts on a free trial, so taking payment
// details before a gym has seen its own admin would only lose signups. What
// this collects is what we need to build the gym; the panel turns it into one.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiCheck, FiCheckCircle, FiLock, FiSmartphone, FiPlus } from "react-icons/fi";
import { formatMoney, publicFetch, type PublicAddon, type PublicPlan } from "@/lib/api";
import { stagger } from "@/lib/motion";
import SiteFooter from "@/components/marketing/SiteFooter";
import Brand from "@/components/marketing/Brand";
import Glow from "@/components/marketing/Glow";

type Cycle = "monthly" | "yearly";

const FIELDS = [
  { key: "gymName", label: "Gym name", placeholder: "Iron Works Fitness", required: true, autoComplete: "organization", wide: true },
  { key: "firstName", label: "First name", placeholder: "Aisha", required: true, autoComplete: "given-name", wide: false },
  { key: "lastName", label: "Last name", placeholder: "Khan", required: true, autoComplete: "family-name", wide: false },
  { key: "email", label: "Email", placeholder: "you@yourgym.com", required: true, type: "email", autoComplete: "email", wide: false },
  { key: "phone", label: "Phone", placeholder: "+92 300 1234567", required: false, type: "tel", autoComplete: "tel", wide: false },
  { key: "country", label: "City / country", placeholder: "Karachi, Pakistan", required: false, autoComplete: "address-level2", wide: true },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function CheckoutClient() {
  const params = useSearchParams();
  const router = useRouter();

  const [plans, setPlans] = useState<PublicPlan[] | null>(null);
  const [addons, setAddons] = useState<PublicAddon[]>([]);
  const [planSlug, setPlanSlug] = useState(params.get("plan") || "");
  const [cycle, setCycle] = useState<Cycle>(params.get("cycle") === "yearly" ? "yearly" : "monthly");
  const [chosenAddons, setChosenAddons] = useState<string[]>([]);
  const [form, setForm] = useState<Record<FieldKey, string>>({ gymName: "", firstName: "", lastName: "", email: "", phone: "", country: "" });
  const [webAddress, setWebAddress] = useState("");
  const [touchedAddress, setTouchedAddress] = useState(false);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    publicFetch<{ data: PublicPlan[] }>("/plans")
      .then((res) => {
        setPlans(res.data);
        setPlanSlug((current) => current || res.data[Math.min(2, res.data.length - 1)]?.slug || "");
      })
      .catch(() => setPlans([]));
    publicFetch<{ data: PublicAddon[] }>("/addons")
      .then((res) => setAddons(res.data))
      .catch(() => setAddons([]));
  }, []);

  const plan = useMemo(() => (plans || []).find((p) => p.slug === planSlug) || null, [plans, planSlug]);

  const included = useMemo(
    () => (plan ? addons.filter((a) => (plan.includedAddons || []).includes(a.slug)) : []),
    [plan, addons]
  );
  const sellable = useMemo(
    () =>
      plan
        ? addons.filter(
            (a) => !(plan.includedAddons || []).includes(a.slug) && (!a.planSlugs.length || a.planSlugs.includes(plan.slug))
          )
        : [],
    [plan, addons]
  );

  // An add-on stays chosen only while the plan it was chosen on still sells it.
  useEffect(() => {
    setChosenAddons((list) => list.filter((slug) => sellable.some((a) => a.slug === slug)));
  }, [sellable]);

  const priceOf = (p: { monthly: number; yearly: number }) => (cycle === "yearly" ? p.yearly : p.monthly);
  const planPrice = plan ? priceOf(plan.price) : 0;
  const addonLines = sellable.filter((a) => chosenAddons.includes(a.slug));
  const total = addonLines.reduce((sum, a) => sum + priceOf(a.price), planPrice);
  const currency = plan?.price.currency || "PKR";
  const per = cycle === "yearly" ? "year" : "month";

  const submit = async () => {
    if (!plan) return;
    const missing = FIELDS.filter((f) => f.required && !form[f.key].trim());
    if (missing.length) {
      setError(`${missing[0].label} is required.`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await publicFetch("/demo-requests", {
        method: "POST",
        body: {
          kind: "trial",
          ...form,
          // The record keeps one name; the form asks for both halves because
          // that is how the owner's account inside the gym is created.
          name: `${form.firstName} ${form.lastName}`.trim(),
          message,
          website, // honeypot: a person never fills this
          preferredSlug: webAddress || slugify(form.gymName),
          planSlug: plan.slug,
          billingCycle: cycle,
          addonSlugs: chosenAddons,
          source: typeof window !== "undefined" ? window.location.href : "",
        },
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send that. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  /* ------------------------------ the receipt ----------------------------- */
  if (done) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-5 py-24 text-white">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" aria-hidden="true" />
        <Glow className="left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3" color="rgba(16,185,129,0.32)" drift="a" />
        <div className="relative mx-auto max-w-xl text-center">
          <span className="a-pop mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
            <FiCheckCircle className="h-8 w-8" />
          </span>
          <h1 className="a-rise mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl" style={stagger(1)}>
            That is everything we need
          </h1>
          <p className="a-rise mt-4 text-lg leading-relaxed text-slate-300" style={stagger(2)}>
            We are setting up {form.gymName}. You will get an email at <span className="font-semibold text-white">{form.email}</span> with your
            admin address and sign-in, usually within one working day.
          </p>
          <div className="a-rise mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm" style={stagger(3)}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">What you chose</p>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <span className="text-slate-300">
                {plan?.name} · {cycle}
              </span>
              <span className="font-display text-lg font-bold">
                {formatMoney(total, currency)} <span className="text-xs font-normal text-slate-400">/ {per}</span>
              </span>
            </div>
            {plan?.trialDays ? <p className="mt-2 text-xs text-emerald-400">Free for the first {plan.trialDays} days. Nothing to pay today.</p> : null}
          </div>
          <Link
            href="/"
            className="btn-shine btn-shine-dark mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            Back to the website <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  /* ------------------------------- the form ------------------------------- */
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Brand />
          <button
            type="button"
            onClick={() => router.push("/#pricing")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to pricing
          </button>
        </div>
      </header>

      <main className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="a-rise text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Checkout</p>
          <h1 className="a-rise mt-2 font-display text-3xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-4xl" style={stagger(1)}>
            Start your free trial
          </h1>
          <p className="a-rise mt-3 max-w-2xl text-base text-slate-600" style={stagger(2)}>
            No card needed. Tell us about your gym and we will have it running — website, admin and all — usually within one working day.
          </p>

          {!plans ? (
            <div className="mt-10 h-64 animate-pulse rounded-3xl border border-slate-200 bg-white" />
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              {/* ---------------------------- details ---------------------------- */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-display text-lg font-bold text-slate-900">Your details</h2>

                {error && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <label key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
                      <span className="text-sm font-semibold text-slate-700">
                        {f.label}
                        {!f.required && <span className="ml-1 font-normal text-slate-400">optional</span>}
                      </span>
                      <input
                        type={"type" in f ? f.type : "text"}
                        value={form[f.key]}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        onChange={(e) => {
                          setForm((x) => ({ ...x, [f.key]: e.target.value }));
                          if (f.key === "gymName" && !touchedAddress) setWebAddress(slugify(e.target.value));
                        }}
                        className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                      />
                    </label>
                  ))}

                  <label className="sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">Your web address</span>
                    <div className="mt-1.5 flex items-center rounded-xl border border-slate-200 bg-white pr-4 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
                      <input
                        value={webAddress}
                        onChange={(e) => {
                          setTouchedAddress(true);
                          setWebAddress(slugify(e.target.value));
                        }}
                        placeholder="ironworks"
                        className="h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                      />
                      <span className="whitespace-nowrap text-sm text-slate-400">.gympilot.app</span>
                    </div>
                    <span className="mt-1.5 block text-xs text-slate-500">
                      Start here and point your own domain (yourgym.com) at it whenever you are ready.
                    </span>
                  </label>

                  <label className="sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">
                      Anything we should know <span className="ml-1 font-normal text-slate-400">optional</span>
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="How many members you have, what you are moving from…"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                    />
                  </label>

                  {/* Bots fill every field they find; people never see this one. */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={busy || !plan}
                  className="btn-shine group mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 py-4 text-base font-bold text-white shadow-lift transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {busy ? "Sending…" : plan?.trialDays ? `Start my ${plan.trialDays}-day free trial` : "Send my details"}
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <FiLock className="h-3.5 w-3.5" /> No card today. We only use these details to set your gym up.
                </p>
              </div>

              {/* ----------------------------- summary --------------------------- */}
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <h2 className="font-display text-lg font-bold text-slate-900">Your plan</h2>

                  <div className="mt-4 inline-flex w-full items-center rounded-full border border-slate-200 bg-slate-50 p-1 text-sm">
                    {(["monthly", "yearly"] as Cycle[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCycle(c)}
                        className={`flex-1 rounded-full px-3 py-1.5 font-semibold capitalize transition-all ${
                          cycle === c ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {c}
                        {c === "yearly" && <span className="ml-1 text-[11px] text-emerald-600">2 months free</span>}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    {(plans || []).map((p) => {
                      const on = p.slug === planSlug;
                      return (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => setPlanSlug(p.slug)}
                          className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                            on ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-200" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              on ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"
                            }`}
                          >
                            {on && <FiCheck className="h-3 w-3" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-slate-900">{p.name}</span>
                            <span className="block truncate text-xs text-slate-500">
                              {p.limits.maxMembers ? `up to ${p.limits.maxMembers.toLocaleString()} members` : "unlimited members"}
                            </span>
                          </span>
                          <span className="whitespace-nowrap text-sm font-bold text-slate-900">{formatMoney(priceOf(p.price), p.price.currency)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {(included.length > 0 || sellable.length > 0) && (
                    <>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Add-ons</p>
                      <div className="mt-2 space-y-2">
                        {included.map((addon) => (
                          <div key={addon.slug} className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                            <FiCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="min-w-0 flex-1 text-sm font-semibold text-slate-900">{addon.name}</span>
                            <span className="text-sm font-bold text-emerald-700">Free</span>
                          </div>
                        ))}
                        {sellable.map((addon) => {
                          const on = chosenAddons.includes(addon.slug);
                          return (
                            <button
                              key={addon.slug}
                              type="button"
                              onClick={() =>
                                setChosenAddons((list) => (on ? list.filter((s) => s !== addon.slug) : [...list, addon.slug]))
                              }
                              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                                on ? "border-brand-500 bg-brand-50/60 ring-1 ring-brand-200" : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                                  on ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"
                                }`}
                              >
                                {on ? <FiCheck className="h-3 w-3" /> : <FiPlus className="h-3 w-3 text-slate-400" />}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                                  {addon.slug.includes("app") && <FiSmartphone className="h-3.5 w-3.5 text-brand-600" />}
                                  {addon.name}
                                </span>
                                <span className="block truncate text-xs text-slate-500">{addon.description}</span>
                              </span>
                              <span className="whitespace-nowrap text-sm font-bold text-slate-900">
                                +{formatMoney(priceOf(addon.price), addon.price.currency)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <div className="mt-6 border-t border-slate-200 pt-4 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>{plan?.name || "Plan"}</span>
                      <span className="font-medium text-slate-900">{formatMoney(planPrice, currency)}</span>
                    </div>
                    {addonLines.map((addon) => (
                      <div key={addon.slug} className="mt-1.5 flex justify-between text-slate-600">
                        <span>{addon.name}</span>
                        <span className="font-medium text-slate-900">+{formatMoney(priceOf(addon.price), currency)}</span>
                      </div>
                    ))}
                    <div className="mt-3 flex items-baseline justify-between border-t border-slate-200 pt-3">
                      <span className="font-semibold text-slate-900">Total</span>
                      <span className="font-display text-2xl font-extrabold text-slate-900">
                        {formatMoney(total, currency)}
                        <span className="text-sm font-normal text-slate-500"> / {per}</span>
                      </span>
                    </div>
                    {plan?.trialDays ? (
                      <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700">
                        Free for {plan.trialDays} days · nothing to pay today
                      </p>
                    ) : null}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
