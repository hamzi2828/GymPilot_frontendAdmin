import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Start your free trial",
  description: "Pick a plan, add what you want to it, and tell us about your gym. No card needed — every plan starts on a free trial.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    // useSearchParams needs a boundary; the plan is read from ?plan=.
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CheckoutClient />
    </Suspense>
  );
}
