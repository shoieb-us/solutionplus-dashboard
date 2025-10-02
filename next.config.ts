import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your other config options here */

  // Ignore TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
