import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve the files in /public as they are. Vercel image optimisation is a paid allowance on the
    // Hobby plan and answers 402 once it is used up, which leaves every next/image blank.
    // The photos are already resized and compressed, so they can be served directly.
    unoptimized: true,
  },
  // Old /locations URLs (before the approved sitemap) move to their sitemap addresses.
  redirects() {
    return [
      { source: "/locations", destination: "/areas-we-serve", permanent: true },
      { source: "/locations/media-pa", destination: "/areas-we-serve", permanent: true },
      { source: "/locations/philadelphia-pa", destination: "/areas-we-serve", permanent: true },
      { source: "/locations/nether-providence-pa", destination: "/dentist-wallingford-pa", permanent: true },
      { source: "/locations/:town([a-z-]+)-pa", destination: "/dentist-:town-pa", permanent: true },
      { source: "/preventative-care/tmj", destination: "/tmj-tmd-treatment-media-pa", permanent: true },
      { source: "/privacy-policy", destination: "/patient-information/privacy", permanent: true },
    ];
  },
  // Sitemap URLs (approved 12-13 Nov 2026) are served by the routes under /locations.
  rewrites() {
    return [
      { source: "/areas-we-serve", destination: "/locations" },
      {
        // Service + Location pages (sitemap section 07)
        source:
          "/:slug(dental-implants-brookhaven-pa|dental-implants-delaware-county-pa|dental-implants-springfield-pa|dental-implants-swarthmore-pa|emergency-dentist-delaware-county-pa|emergency-dentist-springfield-pa|emergency-dentist-swarthmore-pa|invisalign-springfield-pa|dentures-brookhaven-pa)",
        destination: "/service-area/:slug",
      },
      { source: "/dentist-:town([a-z-]+)-pa", destination: "/locations/:town-pa" },
      { source: "/tmj-tmd-treatment-media-pa", destination: "/preventative-care/tmj" },
    ];
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
