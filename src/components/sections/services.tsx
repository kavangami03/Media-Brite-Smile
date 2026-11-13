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
    <section className="section-y relative bg-pearl" aria-labelledby="services-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <SplitReveal as="h2" id="services-heading" className="mt-6 text-display-lg font-bold">
              Complete care, <span className="accent-serif text-brand-500">one</span> trusted office
            </SplitReveal>
          </div>
          <Reveal className="lg:justify-self-end">
            <p className="max-w-md text-lg leading-relaxed">
              Our natural dental care philosophy focuses on safe, mercury-free and minimally invasive procedures, so
              checkups, cosmetic work, implants and repairs all happen under one roof.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
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
                  active === i ? "border-transparent text-white" : "border-line bg-white text-ink hover:border-brand-200",
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
                    {g.links.length} services
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
              <p className="mt-1 text-sm">Book an exam and we&apos;ll walk you through every option and cost before any treatment.</p>
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
                className="grid grid-cols-1 h-full overflow-hidden rounded-4xl border border-line bg-white p-3 shadow-soft md:grid-cols-[minmax(0,22rem)_1fr]"
              >
                {/* Image column sized near the source resolution so photos stay crisp */}
                <div className="relative min-h-72 overflow-hidden rounded-[1.6rem] md:min-h-full">
                  <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: ease.out }}
                    className="absolute inset-0"
                  >
                    <Image src={group.image} alt={group.title} fill sizes="(min-width:768px) 22rem, 100vw" className="object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">
                    {group.links.length} services
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
                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { ease: ease.out, duration: 0.5 } } }}
                      >
                        <Link
                          href={l.href}
                          className="group flex items-center justify-between border-b border-line py-3.5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand-600"
                        >
                          <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{l.label}</span>
                          <ArrowUpRight className="size-4 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="mt-8">
                    <Button href={group.href} variant="dark">
                      See all {group.links.length} services
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
