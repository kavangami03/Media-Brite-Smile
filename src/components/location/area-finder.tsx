"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Home, MapPin, Navigation } from "lucide-react";
import { locations, site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Pick a town, see the real Google route from it to the office.
 * Hover (desktop) or tap (touch) a row to switch the map; the arrow opens the town's page.
 */
export function AreaFinder() {
  const [active, setActive] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const loc = locations[active];

  const pick = (i: number, fromTap = false) => {
    setActive(i);
    // on small screens the map sits above the list: bring it back into view
    if (fromTap && window.matchMedia("(max-width: 1023px)").matches) {
      const r = mapRef.current?.getBoundingClientRect();
      if (r && r.top < 80) mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative isolate overflow-clip rounded-4xl bg-ink text-white sm:rounded-5xl">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-140 rounded-full bg-brand-500/25 blur-[140px]" />
        <div className="absolute -right-24 -bottom-40 size-120 rounded-full bg-glow/10 blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:p-10 xl:p-12">
        {/* ---------- town list ---------- */}
        <div className="order-2 lg:order-1">
          <div className="flex items-end justify-between gap-4 px-2 pt-2 sm:px-3">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">Choose your town</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {locations.length} communities, one office
              </h2>
            </div>
            <span className="hidden shrink-0 text-sm text-white/50 sm:block">Hover to preview the route</span>
          </div>

          <ul className="mt-5 border-t border-white/10" role="list">
            {locations.map((l, i) => {
              const on = i === active;
              return (
                <li key={l.slug} className="border-b border-white/10">
                  <div
                    className={cn(
                      "group relative flex items-center gap-3 rounded-2xl transition-colors duration-300 sm:gap-4",
                      on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                    )}
                    onMouseEnter={() => pick(i)}
                  >
                    <button
                      type="button"
                      onClick={() => pick(i, true)}
                      onFocus={() => pick(i)}
                      aria-pressed={on}
                      aria-label={`Show the route from ${l.name}`}
                      className="flex min-h-16 min-w-0 flex-1 cursor-pointer items-center gap-3 py-3 pl-2 text-left sm:gap-5 sm:pl-3"
                    >
                      <span
                        className={cn(
                          "w-7 shrink-0 text-sm font-bold tabular-nums transition-colors duration-300",
                          on ? "text-glow" : "text-white/35",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-xl leading-tight font-bold tracking-tight transition-[color,transform] duration-500 ease-out-expo sm:text-2xl",
                            on ? "translate-x-1 text-white" : "text-white/75",
                          )}
                        >
                          {l.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-white/45">
                          {l.isHome ? "Our home town · the office is here" : `Dentist near ${l.name}, PA`}
                        </span>
                      </span>
                      {l.isHome && (
                        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold tracking-wide uppercase min-[420px]:inline-flex">
                          <Home className="size-3.5" /> Home
                        </span>
                      )}
                    </button>
                    <Link
                      href={`/locations/${l.slug}`}
                      aria-label={`${l.name} location page`}
                      className={cn(
                        "mr-2 grid size-11 shrink-0 place-items-center rounded-full transition-all duration-500 sm:mr-3",
                        on
                          ? "bg-white text-ink"
                          : "bg-white/5 text-white/70 ring-1 ring-white/15 hover:bg-white hover:text-ink",
                      )}
                    >
                      <ArrowUpRight className="size-4.5 transition-transform duration-500 group-hover:rotate-45" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- live map ---------- */}
        <div ref={mapRef} className="order-1 scroll-mt-28 lg:sticky lg:top-28 lg:order-2 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl bg-mist ring-1 ring-white/10 sm:rounded-4xl">
            <div className="relative aspect-4/3 sm:aspect-16/11 lg:aspect-auto lg:h-[min(36rem,calc(100svh-10rem))]">
              <AnimatePresence initial={false}>
                <motion.iframe
                  key={loc.slug}
                  src={loc.routeEmbed}
                  title={loc.isHome ? `Map of ${site.name}` : `Driving route from ${loc.name} to ${site.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.out }}
                />
              </AnimatePresence>
            </div>

            {/* route card */}
            <div className="flex flex-col gap-4 bg-white p-4 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                  {loc.isHome ? <MapPin className="size-5" /> : <Navigation className="size-5" />}
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={loc.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: ease.out }}
                    className="min-w-0 leading-tight"
                  >
                    <span className="block text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                      {loc.isHome ? "You're already here" : `From ${loc.name}`}
                    </span>
                    <span className="mt-1 block font-semibold">{site.address.full}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <a
                href={loc.directions}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-600"
              >
                Get directions <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <p className="mt-3 px-2 text-sm text-white/45">
            Live drive time and distance are shown on the map and update with traffic in Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
}
