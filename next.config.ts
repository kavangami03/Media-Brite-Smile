import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // WebP at q90: AVIF at the default q75 looks soft on photography.
    formats: ["image/webp"],
    qualities: [90],
  },
  experimental: {
    // Tree-shake icon/animation barrels so only used exports ship.
    optimizePackageImports: ["lucide-react", "motion", "gsap"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
