"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { locations, site } from "@/content/site";
import { towns } from "@/content/towns";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* Group the towns the way the Areas We Serve draft does. */
const groups = Array.from(new Set(towns.map((t) => t.area))).map((area) => ({
  area,
  items: locations
    .map((l, index) => ({ l, index, town: towns.find((t) => t.slug === l.slug)! }))
    .filter((x) => x.town.area === area),
}));

/**
 * Pick a town (hover on desktop, tap on touch), see Google's live route from it to the office.
 * Only the map shows a drive time, so there are never two different figures on screen.
 */
export function AreaFinder() {
  const [active, setActive] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const loc = locations[active];

  const pick = (i: number, fromTap = false) => {
    setActive(i);
    if (fromTap && window.matchMedia("(max-width: 1023px)").matches) {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative isolate overflow-clip rounded-4xl bg-ink text-white sm:rounded-5xl">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-140 rounded-full glow-blob text-brand-500/25" />
        <div className="absolute -right-24 -bottom-40 size-120 rounded-full glow-blob text-glow/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8 xl:p-10">
        {/* ---------- town picker ---------- */}
        <div className="order-2 flex min-w-0 flex-col lg:order-1">
          <div className="px-1">
            <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">Choose your town</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {locations.length} communities, one office
            </h2>
          </div>

          <div className="mt-6 space-y-6">
            {groups.map((g) => (
              <div key={g.area}>
                <p className="mb-2.5 px-1 text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">{g.area}</p>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {g.items.map(({ l, index, town: t }) => {
                    const on = index === active;
                    return (
                      <li key={l.slug}>
                        <button
                          type="button"
                          onClick={() => pick(index, true)}
                          onPointerEnter={(e) => e.pointerType === "mouse" && pick(index)}
                          aria-pressed={on}
                          aria-label={`Show the route from ${l.name}`}
                          className={cn(
                            "flex min-h-14 w-full cursor-pointer flex-col justify-center rounded-2xl px-3.5 py-2.5 text-left transition-[background-color,color,box-shadow] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-glow",
                            on
                              ? "bg-white text-ink shadow-lift"
                              : "bg-white/6 text-white ring-1 ring-white/10 hover:bg-white/12",
                          )}
                        >
                          <span className="text-[0.9375rem] leading-tight font-semibold">{l.name}</span>
                          <span className={cn("mt-0.5 text-xs tabular-nums", on ? "text-brand-600" : "text-white/45")}>
                            {t.zip}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 px-1 text-sm leading-relaxed text-white/50 lg:mt-auto lg:pt-6">
            Hover or tap a town to see the route. Live drive time and distance come from Google Maps and change with
            traffic.
          </p>
        </div>

        {/* ---------- live map ---------- */}
        <div ref={mapRef} className="order-1 min-w-0 scroll-mt-28 lg:order-2">
          <div className="relative h-full min-h-[32rem] overflow-hidden rounded-3xl bg-mist ring-1 ring-white/10 sm:min-h-[30rem] sm:rounded-4xl lg:min-h-[36rem]">
            <AnimatePresence initial={false}>
              <motion.iframe
                key={loc.slug}
                src={loc.routeEmbed}
                title={`Driving route from ${loc.name} to ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: ease.out }}
              />
            </AnimatePresence>

            {/* route card */}
            <div className="absolute inset-x-3 bottom-3 rounded-3xl bg-white p-4 text-ink shadow-lift sm:inset-x-4 sm:bottom-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={loc.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: ease.out }}
                    className="flex min-w-48 flex-1 items-center gap-3"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                      <MapPin className="size-5" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                        From {loc.name}
                      </span>
                      <span className="mt-1 block truncate font-semibold">to {site.address.full}</span>
                    </span>
                  </motion.div>
                </AnimatePresence>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={loc.href}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:flex-none"
                  >
                    {loc.name} page <ArrowUpRight className="size-4" />
                  </Link>
                  <a
                    href={loc.directions}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Directions from ${loc.name}`}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:ring-brand-400"
                  >
                    <Navigation className="size-4" />
                    <span className="hidden sm:inline">Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
