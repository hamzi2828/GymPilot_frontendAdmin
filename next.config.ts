import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // The sign-in pages used to live under /super-admin; old links and
  // password-reset emails still work.
  async redirects() {
    return [
      { source: "/super-admin/login", destination: "/login", permanent: true },
      { source: "/super-admin/forgot", destination: "/forgot", permanent: true },
      { source: "/super-admin/reset", destination: "/reset", permanent: true },
    ];
  },
};

export default nextConfig;
