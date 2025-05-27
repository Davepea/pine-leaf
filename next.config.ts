import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['pineleaflaravel.sunmence.com.ng'],
  },

  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during `next build`
  },
  typescript: {
    ignoreBuildErrors: true, // Skips type checking during `next build`
  },
};

export default nextConfig;
