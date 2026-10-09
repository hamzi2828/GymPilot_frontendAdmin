import type { Metadata } from "next";

// Part of the platform panel, not the marketing site: its own title, and
// kept out of search results.
export const metadata: Metadata = {
  title: "Reset password",
  robots: { index: false, follow: false },
};

export default function ResetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
