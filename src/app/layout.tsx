import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CurrentYear } from "@/components/layout/current-year";
import { MobileCta } from "@/components/layout/mobile-cta";
import { BackToTop } from "@/components/layout/back-to-top";
import { site } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Family, Cosmetic & Implant Dentist in Media, PA`,
    template: `%s | ${site.name}`,
  },
  description:
    "Media Brite Smile offers gentle family, cosmetic and implant dentistry in Media, PA. Mercury-free, minimally invasive care, same-day emergencies and new patients welcome. Call (610) 566-2711.",
  keywords: [
    "dentist Media PA",
    "family dentist Media",
    "dental implants Media PA",
    "Invisalign Media PA",
    "cosmetic dentist",
    "emergency dentist Media PA",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    images: [{ url: "/images/office/office-5.jpg", width: 2200, height: 1466, alt: `${site.name} reception` }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#009ecb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Preloader />
          <Header />
          <main id="main">{children}</main>
          <Footer year={<CurrentYear />} />
          <MobileCta />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
