// Measuring the adverts. Nothing here runs unless an id is set in the
// environment: NEXT_PUBLIC_GA_ID loads Google Analytics 4 and
// NEXT_PUBLIC_META_PIXEL_ID loads the Meta Pixel (components/Analytics.tsx).
// With neither, no script is loaded and trackConversion() does nothing.
//
// Only the name of what happened is sent, with the plan and its price where
// there is one. Never a name, an email or anything typed into a form.

/** An id is pasted into a script tag, so it is taken only in the shape an id has. */
const idFrom = (value: string | undefined, shape: RegExp) => {
  const id = (value || "").trim();
  return shape.test(id) ? id : "";
};

export const GA_ID = idFrom(process.env.NEXT_PUBLIC_GA_ID, /^[A-Za-z0-9-]+$/);
export const META_PIXEL_ID = idFrom(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d+$/);

/** The three things an advert is paid to cause. */
export type Conversion = "demo_request" | "checkout_started" | "signup_completed";

// Each network's own name for the event, so its reports recognise it.
const NAMES: Record<Conversion, { ga: string; meta: string }> = {
  demo_request: { ga: "generate_lead", meta: "Lead" },
  checkout_started: { ga: "begin_checkout", meta: "InitiateCheckout" },
  signup_completed: { ga: "sign_up", meta: "CompleteRegistration" },
};

export interface ConversionDetail {
  /** The plan's slug. */
  plan?: string;
  /** What the plan costs per period, in `currency`. */
  value?: number;
  currency?: string;
  /** How they signed up: "card" (paid on Stripe) or "request" (sent the form). */
  method?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// The scripts load after the page is interactive, so a conversion that
// happens early (reaching checkout) waits for them: up to five seconds, then
// it goes to whichever did load. A blocked tracker costs nothing but the wait.
const WAIT_MS = 250;
const MAX_WAITS = 20;

const loaded = () => (!GA_ID || typeof window.gtag === "function") && (!META_PIXEL_ID || typeof window.fbq === "function");

/** Tell the analytics that are switched on that a conversion happened. Safe to call anywhere. */
export function trackConversion(what: Conversion, detail: ConversionDetail = {}, waits = 0) {
  if (typeof window === "undefined" || (!GA_ID && !META_PIXEL_ID)) return;
  if (!loaded() && waits < MAX_WAITS) {
    window.setTimeout(() => trackConversion(what, detail, waits + 1), WAIT_MS);
    return;
  }
  const names = NAMES[what];
  const money = typeof detail.value === "number" && detail.currency ? { value: detail.value, currency: detail.currency } : {};
  try {
    window.gtag?.("event", names.ga, { ...money, ...(detail.plan ? { plan: detail.plan } : {}), ...(detail.method ? { method: detail.method } : {}) });
    window.fbq?.("track", names.meta, { ...money, ...(detail.plan ? { content_name: detail.plan } : {}) });
  } catch {
    /* a blocked or broken tracker must never break the page */
  }
}

/**
 * The same, at most once per `key` in this tab: a page that is reloaded, or
 * polled, must not count the same sign-up twice.
 */
export function trackConversionOnce(key: string, what: Conversion, detail: ConversionDetail = {}) {
  if (typeof window === "undefined") return;
  const name = `gympilot.tracked.${key}`;
  try {
    if (window.sessionStorage.getItem(name)) return;
    window.sessionStorage.setItem(name, "1");
  } catch {
    /* storage blocked: count it rather than lose it */
  }
  trackConversion(what, detail);
}
