"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Services() {
  const [active, setActive] = useState(0);
  const group = serviceGroups[active];

  return (
    <section className="relative bg-pearl section-y" aria-labelledby="services-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>Our Services</Eyebrow>
            <SplitReveal
              as="h2"
              id="services-heading"
              className="mt-6 max-w-4xl text-display-md font-bold text-balance"
            >
              What dental <span className="accent-serif text-brand-500">treatments</span> do you offer?
            </SplitReveal>
          </div>
          <Reveal className="lg:col-span-4 lg:justify-self-end">
            <p className="max-w-sm text-lg leading-relaxed">
              Check-ups through to All-on-X full-arch implants, in one practice. Treatment falls into five groups.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <ol className="mt-8 flex flex-wrap gap-2.5">
            {[
              "Preventative care",
              "Gum disease treatment",
              "Cosmetic dentistry",
              "Restoring and replacing teeth",
              "Jaw and facial pain",
            ].map((g, i) => (
              <li
                key={g}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-[0.9375rem] font-semibold text-ink shadow-soft ring-1 ring-line"
              >
                <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {g}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Tabs */}
          <div role="tablist" aria-label="Service categories" className="flex flex-col gap-3 lg:col-span-4">
            {serviceGroups.map((g, i) => (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${g.id}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group relative flex items-center gap-5 overflow-hidden rounded-3xl border p-4 pr-6 text-left transition-colors duration-500",
                  active === i
                    ? "border-transparent text-white"
                    : "border-line bg-white text-ink hover:border-brand-200",
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="service-tab"
                    className="absolute inset-0 bg-linear-to-br from-brand-600 to-brand-800"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                )}
                <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={g.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="relative flex-1">
                  <span className="block text-lg font-semibold tracking-tight">{g.title}</span>
                  <span className={cn("text-sm", active === i ? "text-brand-100" : "text-muted")}>
                    {g.total} services
                  </span>
                </span>
                <span
                  className={cn(
                    "relative grid size-10 place-items-center rounded-full transition-all duration-500",
                    active === i ? "rotate-45 bg-white text-brand-700" : "bg-pearl text-ink",
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </button>
            ))}

            <div className="mt-3 hidden rounded-3xl border border-dashed border-brand-300 bg-white/60 p-6 lg:block">
              <p className="font-semibold text-ink">Not sure what you need?</p>
              <p className="mt-1 text-sm">
                Book an exam and we&apos;ll walk you through every option and cost before any treatment.
              </p>
              <Button href="/contact-us" variant="dark" className="mt-5">
                Book a consultation
              </Button>
            </div>
          </div>

          {/* Panel */}
          <div className="relative lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.id}
                id={`panel-${group.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${group.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: ease.out }}
                className="grid h-full grid-cols-1 overflow-hidden rounded-4xl border border-line bg-white p-3 shadow-soft md:grid-cols-[minmax(0,22rem)_1fr]"
              >
                {/* Image column sized near the source resolution so photos stay crisp */}
                <div className="relative min-h-72 overflow-hidden rounded-[1.6rem] md:min-h-full">
                  <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: ease.out }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={group.image}
                      alt={group.title}
                      fill
                      sizes="(min-width:768px) 22rem, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink">
                    {group.total} services
                  </span>
                </div>

                <div className="flex flex-col p-5 md:p-8">
                  <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{group.title}</h3>
                  <p className="mt-3 max-w-lg text-body">{group.blurb}</p>
                  <motion.ul
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
                    className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2"
                  >
                    {group.links.map((l) => (
                      <motion.li
                        key={l.href}
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          show: { opacity: 1, x: 0, transition: { ease: ease.out, duration: 0.5 } },
                        }}
                      >
                        <Link
                          href={l.href}
                          className="group flex items-center justify-between border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand-600"
                        >
                          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                            {l.label}
                          </span>
                          <ArrowUpRight className="size-4 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="mt-8">
                    <Button href={group.href} variant="dark">
                      See all {group.total} services
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
