"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import { site, type faqs } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Faq = (typeof faqs)[number];

/** Two-column local FAQ: sticky intro + contact card on the left, numbered accordion on the right. */
export function LocalFaq({ town, items }: { town: string; items: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white section-y" aria-labelledby="local-faq-heading">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Questions</Eyebrow>
            <SplitReveal as="h2" id="local-faq-heading" className="mt-6 text-display-md font-bold">
              Answers for <span className="text-brand-500">{town}</span> patients
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg leading-relaxed">
                The things new patients ask us most. Can&apos;t find yours? Our team is happy to help.
              </p>
              <div className="mt-8 flex flex-col gap-4 rounded-4xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-white/60">Call our team</p>
                    <a href={site.phone.href} className="text-xl font-bold tracking-tight text-white hover:text-glow">
                      {site.phone.display}
                    </a>
                  </div>
                </div>
                <Button href={site.bookingHref} variant="white">
                  Book online
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="border-t border-line">
            {items.map((f, i) => {
              const isOpen = open === i;
              const panelId = `local-faq-${i}`;
              return (
                <li key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full cursor-pointer items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span
                      className={cn(
                        "w-7 shrink-0 text-sm font-semibold tabular-nums transition-colors",
                        isOpen ? "text-brand-500" : "text-muted",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 text-lg font-semibold tracking-tight transition-colors sm:text-xl",
                        isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500",
                        isOpen
                          ? "rotate-45 bg-brand-500 text-white"
                          : "bg-mist text-brand-600 group-hover:bg-brand-100",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: ease.out }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-11 sm:pr-16 sm:pl-13">
                          <p className="leading-relaxed">{f.a}</p>
                          {f.link.external ? (
                            <a
                              href={f.link.href}
                              target="_blank"
                              rel="noopener"
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                            >
                              {f.link.label}
                              <ArrowUpRight className="size-4" />
                            </a>
                          ) : (
                            <Link
                              href={f.link.href}
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                            >
                              {f.link.label}
                              <ArrowUpRight className="size-4" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
