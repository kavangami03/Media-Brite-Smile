"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const treatments = [
  {
    title: "Dental Implants",
    kicker: "Feel and function like natural teeth",
    offer: "$500 off",
    image: "/images/services/dental-implants.jpg",
    href: "/restorative-dentistry/dental-implants",
  },
  {
    title: "Invisalign®",
    kicker: "Straighter teeth, nearly invisible",
    offer: "$1,000 off",
    image: "/images/services/invisalign.jpg",
    href: "/cosmetic-dentistry/invisalign",
  },
  {
    title: "Teeth Whitening",
    kicker: "Take-home kit with lifetime refills",
    offer: "$100 off",
    image: "/images/services/teeth-whitening.jpg",
    href: "/cosmetic-dentistry/teeth-whitening",
  },
  {
    title: "Porcelain Veneers",
    kicker: "Natural-looking, metal-free smile design",
    offer: null,
    image: "/images/services/cosmetic-dentistry.webp",
    href: "/cosmetic-dentistry/porcelain-veneers",
  },
  {
    title: "Family & Kids",
    kicker: "Every generation, one office",
    offer: null,
    image: "/images/hero/banner-4.jpg",
    href: "/preventative-care/child-dentistry",
  },
];

export function Signature() {
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // Cursor-following preview photo
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 20, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <section className="section-y relative overflow-hidden bg-ink text-white" aria-labelledby="signature-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 right-0 size-200 rounded-full bg-brand-500/20 blur-[160px]" />
        <div className="absolute -bottom-60 -left-40 size-160 rounded-full bg-glow/10 blur-[160px]" />
      </div>

      <div className="relative container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---------------- Left: header ---------------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow tone="light">Signature Treatments</Eyebrow>
            <SplitReveal as="h2" id="signature-heading" className="mt-6 text-display-md font-bold text-white">
              Treatments our patients <span className="text-gradient-brand">love</span>
            </SplitReveal>
            <Reveal>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                Life-changing implants, invisible aligners and natural-looking cosmetic work, planned with 3D imaging and
                placed with precision.
              </p>
              <Button href="/special-offers" variant="white" className="mt-8">
                See all special offers
              </Button>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Right: compact treatment index ---------------- */}
        <div
          ref={listRef}
          className="relative border-t border-white/20 lg:col-span-7"
          onPointerMove={onMove}
          onPointerLeave={() => setHovered(null)}
        >
          {/* Floating preview (desktop) */}
          <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="absolute -top-28 -left-72 h-44 w-64 overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgb(0_0_0/0.6)] ring-1 ring-white/20"
                >
                  <Image src={treatments[hovered].image} alt="" fill sizes="256px" className="object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <RevealGroup stagger={0.07}>
            {treatments.map((t, i) => {
              const on = hovered === i;
              return (
                <RevealItem key={t.title}>
                  <Link
                    href={t.href}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                    className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/15 py-5 md:gap-6"
                  >
                    {/* sweeping underline */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-[-1px] left-0 h-px w-full origin-left bg-linear-to-r from-brand-400 via-glow to-transparent transition-transform duration-700 ease-out-expo",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />

                    {/* thumb (mobile) / index (desktop) */}
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl lg:hidden">
                      <Image src={t.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span
                      className={cn(
                        "hidden w-8 text-sm font-semibold tabular-nums transition-colors duration-500 lg:block",
                        on ? "text-glow" : "text-white/45",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* title + kicker */}
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        <span
                          className={cn(
                            "text-[clamp(1.375rem,1rem+1.1vw,2.25rem)] leading-tight font-bold tracking-tight transition-all duration-500 ease-out-expo",
                            on ? "translate-x-2 text-white" : "text-white/85",
                          )}
                        >
                          {t.title}
                        </span>
                        {t.offer && (
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors duration-500",
                              on ? "bg-glow text-ink" : "bg-white/10 text-glow ring-1 ring-white/15",
                            )}
                          >
                            {t.offer}
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-sm text-white/60 transition-all duration-500",
                          on && "translate-x-2 text-white/85",
                        )}
                      >
                        {t.kicker}
                      </span>
                    </span>

                    {/* arrow */}
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        on ? "rotate-45 border-transparent bg-brand-500 text-white" : "border-white/25 text-white/80",
                      )}
                    >
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
