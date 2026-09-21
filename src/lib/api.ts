// Where the GymPilot API lives. The marketing site uses the public routes
// under /api/platform/public; the panel uses the rest with a platform token.

export const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
export const PLATFORM_API = `${API_BASE}/api/platform`;

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/** fetch() against a public platform route: no session, JSON in and out. */
export async function publicFetch<T>(path: string, init: { method?: "GET" | "POST"; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${PLATFORM_API}/public${path}`, {
    method: init.method || "GET",
    headers: init.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let json: { success?: boolean; message?: string; code?: string } & Record<string, unknown> = {};
  try {
    json = await res.json();
  } catch {
    /* no body */
  }
  if (!res.ok) throw new ApiError(json.message || `Request failed (${res.status})`, res.status, json.code);
  return json as T;
}

export interface PublicPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: { monthly: number; yearly: number; currency: string };
  limits: { maxMembers: number; maxStaff: number; maxTrainers: number; maxClasses: number };
  features: string[];
  /** Add-on slugs this plan comes with at no extra charge. */
  includedAddons: string[];
  trialDays: number;
  order: number;
}

/** GET /public/config: how this deployment names things that the site shows. */
export interface PublicConfig {
  /** Gyms get `<slug>.<root_domain>`; empty when the platform has no root domain. */
  root_domain: string;
}

/** Sold beside a plan. `planSlugs` empty means it goes with any of them. */
export interface PublicAddon {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: { monthly: number; yearly: number; currency: string };
  planSlugs: string[];
}

/**
 * The plan the site points at: the middle of three, the second-from-top of
 * four -- the tier most gyms actually land on, never the cheapest or the
 * dearest. Pricing marks it "Most popular"; checkout starts on it.
 */
export function popularPlanIndex(count: number): number {
  return count >= 4 ? 2 : count >= 3 ? 1 : 0;
}

/** What paying yearly saves on twelve monthly payments, in whole percent; 0 when there is no yearly price. */
export function yearlySaving(price: { monthly: number; yearly: number }): number {
  if (!(price.yearly > 0) || !(price.monthly > 0)) return 0;
  return Math.max(0, Math.round((1 - price.yearly / (price.monthly * 12)) * 100));
}

export function formatMoney(amount: number, currency: string, fractionDigits = 0): string {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD", maximumFractionDigits: fractionDigits, minimumFractionDigits: 0 }).format(amount || 0);
  } catch {
    return `${currency} ${amount}`;
  }
}
