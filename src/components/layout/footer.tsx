"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { locations, serviceGroups, site } from "@/content/site";
import { FacebookIcon, GoogleIcon, YelpIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pages = [
  { label: "About Us", href: "/about-us" },
  { label: "Office Tour", href: "/about-us/office-tour" },
  { label: "Patient Reviews", href: "/about-us/patient-reviews" },
  { label: "Special Offers", href: "/special-offers" },
  { label: "Savings Plan", href: "/about-us/dental-savings-plan" },
  { label: "CareCredit", href: "/patient-information/care-credit" },
  { label: "Contact", href: "/contact-us" },
];
const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap" },
];

const drawLine =
  "bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 ease-out-expo hover:bg-size-[100%_1px]";

/* The footer's top edge: flat when it enters, then it bends into the logo's smile. */
const FLAT = "M0,0 H1440 V40 Q720,40 0,40 Z";
const SMILE = "M0,0 H1440 V40 Q720,210 0,40 Z";
const ARC_FLAT = "M0,40 Q720,40 1440,40";
const ARC_SMILE = "M0,40 Q720,210 1440,40";

/** Background colour of the last section above the footer, so the curve blends into any page. */
function useEdgeFill(ref: RefObject<HTMLElement | null>) {
  const [fill, setFill] = useState("#ffffff");
  useEffect(() => {
    const main = ref.current?.previousElementSibling;
    if (!main) return;
    const read = () => {
      let el = main.lastElementChild as HTMLElement | null;
      // skip non-visual trailing nodes (scripts, portals)
      while (el && (el.tagName === "SCRIPT" || el.offsetHeight === 0))
        el = el.previousElementSibling as HTMLElement | null;
      let bg = "";
      for (let n: HTMLElement | null = el; n && n !== document.documentElement; n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (c && c !== "transparent" && !/rgba\(.*,\s*0\)$/.test(c)) {
          bg = c;
          break;
        }
      }
      setFill(bg || getComputedStyle(document.body).backgroundColor || "#ffffff");
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(main, { childList: true });
    return () => mo.disconnect();
  }, [ref]);
  return fill;
}

export function Footer({ year }: { year: ReactNode }) {
  const footerRef = useRef<HTMLElement>(null);
  const edgeFill = useEdgeFill(footerRef);

  return (
    <footer
      ref={footerRef}
      className="relative isolate overflow-hidden bg-linear-to-b from-brand-600 via-brand-700 to-brand-900 text-white"
    >
      {/* Smile edge */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[clamp(4rem,9vw,9rem)] w-full"
        initial="flat"
        whileInView="smile"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.path
          fill={edgeFill}
          variants={{ flat: { d: FLAT }, smile: { d: SMILE } }}
          transition={{ duration: 1.4, ease: ease.out }}
        />
        {/* highlight rides the curve edge-to-edge (a pathLength draw would be cut short by the non-scaling stroke) */}
        <motion.path
          fill="none"
          stroke="var(--color-glow)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          variants={{
            flat: { d: ARC_FLAT, opacity: 0 },
            smile: { d: ARC_SMILE, opacity: 1 },
          }}
          transition={{ duration: 1.4, ease: ease.out }}
        />
      </motion.svg>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 size-200 -translate-x-1/2 rounded-full bg-glow/15 blur-[140px]" />
      </div>

      <div className="relative container-site pt-[clamp(6.5rem,11vw,10rem)]">
        {/* ---------- Brand ---------- */}
        <Reveal className="flex justify-center">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image
              src="/images/brand/logo.svg"
              alt={site.name}
              width={892}
              height={302}
              unoptimized
              className="h-20 w-auto brightness-0 invert md:h-24"
            />
          </Link>
        </Reveal>

        {/* ---------- Navigation ---------- */}
        <nav aria-label="Footer" className="mt-10 text-center">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg font-semibold">
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={cn("text-white/90 hover:text-white", drawLine)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Services grouped by category, so each one is easy to find */}
          <div className="mt-12 grid w-full grid-cols-1 gap-px overflow-hidden rounded-4xl bg-line text-left shadow-[0_30px_70px_-30px_rgb(0_0_0/0.45)] md:grid-cols-3">
            {serviceGroups.map((g) => (
              <div key={g.id} className="bg-white p-7 md:p-8">
                <Link
                  href={g.href}
                  className="group flex items-center justify-between gap-3 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase max-xl:min-h-11"
                >
                  {g.title}
                  <span className="grid size-7 place-items-center rounded-full bg-brand-50 text-brand-600 transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
                <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 min-[400px]:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={cn("text-[0.9375rem] text-ink/75 hover:text-brand-700", drawLine)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Service areas: highlighted band linking to each location page */}
          <div className="mt-10 flex flex-col items-center gap-4 rounded-4xl bg-white/[0.08] px-6 py-6 ring-1 ring-white/15 lg:flex-row lg:justify-between lg:px-8">
            <p className="flex shrink-0 items-center gap-3 text-left">
              <span className="grid size-11 place-items-center rounded-full bg-white text-brand-600">
                <MapPin className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-bold tracking-[0.16em] text-glow uppercase">Proudly serving</span>
                <span className="block text-sm text-white/70">Media &amp; surrounding communities</span>
              </span>
            </p>
            <ul className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand-700 max-xl:min-h-11"
                  >
                    {l.name}
                    <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-45 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-12 grid grid-cols-1 items-center gap-5 border-t border-white/15 pt-7 pb-28 text-sm text-white/60 md:grid-cols-3 md:pr-20 lg:pb-7">
          <div className="text-center md:text-left">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="mt-1">
              Designed &amp; developed by{" "}
              <a
                href="https://softqubes.com/"
                target="_blank"
                rel="noopener"
                className={cn("font-semibold text-white hover:text-glow", drawLine)}
              >
                Softqube Technologies
              </a>
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {[
              { label: "Google", href: site.social.google, Icon: GoogleIcon },
              { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
              { label: "Yelp", href: site.social.yelp, Icon: YelpIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={`${site.name} on ${label}`}
                className="grid size-13 place-items-center rounded-full bg-white text-ink shadow-soft transition-transform duration-500 hover:-translate-y-1"
              >
                <Icon
                  size={28}
                  className={label === "Yelp" ? "text-[#d32323]" : label === "Facebook" ? "text-[#1877f2]" : undefined}
                />
              </a>
            ))}
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={cn("hover:text-white", drawLine)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
