"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Baby, BadgeDollarSign, HeartHandshake, Syringe, Wind, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const promises: { icon: LucideIcon; title: string; text: string; image: string; alt: string }[] = [
  {
    icon: HeartHandshake,
    title: "Gentle with anxiety",
    text: "A soothing, unhurried approach for nervous patients. We take the time to hear your concerns first.",
    image: "/images/hero/banner-4.jpg",
    alt: "A young patient smiling in the dental chair",
  },
  {
    icon: Syringe,
    title: "Anesthesia options",
    text: "Multiple anesthesia options to keep every treatment as pleasant as possible.",
    image: "/images/office/operatory-1.webp",
    alt: "A calm, modern treatment room",
  },
  {
    icon: Wind,
    title: "Nitrous & oral sedation",
    text: "Available to help you feel relaxed and comfortable throughout treatment.",
    image: "/images/office/waiting-room.webp",
    alt: "The bright reception and waiting area",
  },
  {
    icon: Baby,
    title: "Toddlers to grandparents",
    text: "Individualized attention, courtesy and thoughtful care for every generation.",
    image: "/images/hero/section-bg.jpg",
    alt: "A smiling mother and daughter",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent pricing",
    text: "Clear costs before any treatment, so you can decide with no surprises.",
    image: "/images/office/office-5.jpg",
    alt: "The Media Brite Smile front desk",
  },
];

export function Comfort() {
  // The middle panel is open by default, and the row returns to it when the pointer leaves.
  const DEFAULT_PANEL = Math.floor(promises.length / 2);
  const [active, setActive] = useState(DEFAULT_PANEL);

  return (
    <section className="section-y relative overflow-hidden bg-white" aria-labelledby="comfort-heading">
      <div className="container-site">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Your Comfort</Eyebrow>
            <SplitReveal as="h2" id="comfort-heading" className="mt-6 text-display-md font-bold">
              Dentistry that puts <span className="text-brand-500">you</span> first
            </SplitReveal>
          </div>
          <Reveal className="flex flex-col items-start gap-6 lg:col-span-5">
            <p className="text-lg leading-relaxed">
              At {site.name}, your comfort is our foremost priority. We take the time to hear your concerns, understand
              your needs and build a relationship you can trust.
            </p>
            <Button href="/patient-information/why-choose-us" variant="dark">
              Why choose us
            </Button>
          </Reveal>
        </div>

        {/* Promises: expanding photo panels (desktop) */}
        <Reveal className="mt-14 hidden h-[34rem] gap-3 lg:flex" onMouseLeave={() => setActive(DEFAULT_PANEL)}>
          {promises.map(({ icon: Icon, title, text, image, alt }, i) => {
            const on = active === i;
            return (
              <button
                key={title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={cn(
                  "group relative min-w-0 overflow-hidden rounded-4xl text-left transition-[flex-grow] duration-700 ease-out-expo",
                  on ? "grow-[4.5]" : "grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width:1024px) 60vw, 100vw"
                  className={cn("object-cover transition-transform duration-[1.2s] ease-out-expo", on ? "scale-100" : "scale-110")}
                />
                {/* tint: strong when collapsed, gentle when open */}
                <span
                  className={cn(
                    "absolute inset-0 transition-colors duration-700",
                    on ? "bg-linear-to-t from-ink/85 via-ink/20 to-transparent" : "bg-brand-900/70 group-hover:bg-brand-800/60",
                  )}
                />

                {/* icon + number */}
                <span className="absolute top-6 left-6 grid size-11 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
                  <Icon className="size-5" />
                </span>
                <span className="absolute top-7 right-6 text-xs font-semibold text-white/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* collapsed: vertical label */}
                <span
                  className={cn(
                    "absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 text-2xl font-bold tracking-tight whitespace-nowrap text-white transition-opacity duration-300 [writing-mode:vertical-rl]",
                    on ? "opacity-0" : "opacity-100 delay-200",
                  )}
                >
                  {title}
                </span>

                {/* open: title + text */}
                <AnimatePresence>
                  {on && (
                    <motion.span
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, ease: ease.out, delay: 0.25 }}
                      className="absolute inset-x-8 bottom-8 block text-white"
                    >
                      <span className="block text-3xl font-bold tracking-tight">{title}</span>
                      <span className="mt-3 block max-w-md leading-relaxed text-white/80">{text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </Reveal>

        {/* Promises: stacked list (mobile / tablet) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {promises.map(({ icon: Icon, title, text, image, alt }) => (
            <Reveal key={title}>
              <div className="overflow-hidden rounded-3xl bg-pearl ring-1 ring-line">
                <div className="relative aspect-video">
                  <Image src={image} alt={alt} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex gap-4 p-5">
                  <Icon className="mt-0.5 size-6 shrink-0 text-brand-500" />
                  <div>
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
