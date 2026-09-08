// src/app/super-admin/_shared/api.ts
//
// The platform panel's API client. Its session is separate from a gym's:
// a platform token lives under its own key, is sent only to /api/platform,
// and is refused by every gym endpoint (and vice versa).

import { PLATFORM_API } from "@/lib/api";

export { API_BASE, PLATFORM_API } from "@/lib/api";

const TOKEN_KEY = "platform_token";

export function getPlatformToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

// Stored in localStorage for requests and mirrored in a cookie so the edge
// middleware can turn away a signed-out visitor before the page loads.
export function setPlatformToken(token: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; samesite=lax${window.location.protocol === "https:" ? "; secure" : ""}`;
  } catch {
    /* storage blocked -- the session lasts this page view only */
  }
}

export function clearPlatformToken() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; Max-Age=0; path=/; samesite=lax`;
  } catch {
    /* nothing to clear */
  }
}

export class PlatformApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * fetch() against the platform API. Throws PlatformApiError with the
 * server's message; a 401 also ends the session and returns to the login.
 */
export async function platformFetch<T>(path: string, init: { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: unknown } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getPlatformToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (init.body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${PLATFORM_API}${path}`, {
    method: init.method || "GET",
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  let json: { success?: boolean; message?: string; code?: string } & Record<string, unknown> = {};
  try {
    json = await res.json();
  } catch {
    /* no body */
  }

  if (res.status === 401 && !path.startsWith("/auth/login")) {
    clearPlatformToken();
    if (typeof window !== "undefined") window.location.href = "/login";
  }
  if (!res.ok) throw new PlatformApiError(json.message || `Request failed (${res.status})`, res.status, json.code);
  return json as T;
}

// ---- Types shared by the panel's pages ----------------------------------

export interface PlatformAdmin {
  id: string;
  name: string;
  email: string;
  last_login: string | null;
  two_factor?: boolean;
}

export interface PlatformConfig {
  platform_database: string;
  tenant_database_prefix: string;
  root_domain: string;
  default_tenant_slug: string;
}

export interface Plan {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: { monthly: number; yearly: number; currency: string };
  limits: { maxMembers: number; maxStaff: number; maxTrainers: number; maxClasses: number };
  features: string[];
  /** Add-on slugs this plan gives away rather than sells. */
  includedAddons: string[];
  trialDays: number;
  isActive: boolean;
  order: number;
  gym_count?: number;
}

/** Something sold beside a plan -- see platform/models/platformAddonModel.js. */
export interface Addon {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: { monthly: number; yearly: number; currency: string };
  /** Empty means it can go on any plan. */
  planSlugs: string[];
  isPublic: boolean;
  isActive: boolean;
  order: number;
  gym_count?: number;
}

export interface GymStats {
  members?: number;
  staff?: number;
  trainers?: number;
  classes?: number;
  active_memberships?: number;
  pending_orders?: number;
  revenue_this_month?: { currency: string; total: number; orders: number }[];
  last_visit_at?: string | null;
  last_login_at?: string | null;
  error?: string;
}

export interface Gym {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  status: "active" | "suspended";
  domains: { host: string; isPrimary: boolean; addedAt?: string }[];
  database: { name: string };
  owner: { firstName: string; lastName: string; email: string; phone: string };
  plan: string | Plan | null;
  subscription: {
    status: "trialing" | "active" | "past_due" | "expired" | "cancelled";
    billingCycle: "monthly" | "yearly";
    /** The whole bill for a cycle: the plan plus whatever add-ons are on. */
    amount: number;
    planAmount?: number;
    addons?: { slug: string; name: string; amount: number }[];
    currency: string;
    startedAt: string | null;
    currentPeriodEnd: string | null;
    cancelledAt: string | null;
    notes: string;
  };
  locale: { timezone: string; currency: string; country: string };
  notes: string;
  provisionedAt: string | null;
  createdAt: string;
  updatedAt: string;
  access_block: { status: number; code: string; message: string } | null;
  stats?: GymStats | null;
}

export interface GymBrief {
  id: string;
  name: string;
  slug: string;
  plan: string | null;
  currentPeriodEnd: string | null;
}

export interface Overview {
  gyms: { total: number; active: number; suspended: number };
  subscriptions: Record<string, number>;
  expiring_within_30_days: number;
  mrr: { currency: string; amount: number; gyms: number }[];
  attention?: { renewing: GymBrief[]; past_due: GymBrief[]; suspended: GymBrief[] };
  demo_requests_new?: number;
}

export const DEMO_REQUEST_STATUSES = ["new", "contacted", "converted", "closed"] as const;
export type DemoRequestStatus = (typeof DEMO_REQUEST_STATUSES)[number];

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  gymName: string;
  gymSize: string;
  country: string;
  message: string;
  source: string;
  status: DemoRequestStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export function planOf(gym: Gym): Plan | null {
  return gym.plan && typeof gym.plan === "object" ? (gym.plan as Plan) : null;
}

export function formatDate(value?: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount || 0);
  } catch {
    return `${currency} ${amount}`;
  }
}

export const SUBSCRIPTION_STATUSES = ["trialing", "active", "past_due", "expired", "cancelled"] as const;
export const BILLING_CYCLES = ["monthly", "yearly"] as const;
