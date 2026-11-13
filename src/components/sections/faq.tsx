"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { faqs, site } from "@/content/site";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** One real office / patient photo per question, in FAQ order. */
const photos = [
  { src: "/images/hero/section-bg.jpg", alt: "A smiling mother and daughter" },
  { src: "/images/office/office-41.jpg", alt: "The Media Brite Smile building at 8 N Pennell Rd" },
  { src: "/images/office/operatory-1.webp", alt: "A treatment room ready for patients" },
  { src: "/images/office/office-5.jpg", alt: "The Media Brite Smile front desk" },
  { src: "/images/office/waiting-room-2.webp", alt: "The comfortable waiting area" },
  { src: "/images/office/in-house-lab.webp", alt: "The in-house dental lab" },
  { src: "/images/hero/banner-4.jpg", alt: "A young patient smiling in the dental chair" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // The photo follows whatever the visitor is looking at: hovered row first, else the open one.
  const shown = hovered ?? open ?? 0;

  // Keep the previous photo underneath while the new one wipes in on top (no empty frame).
  const [current, setCurrent] = useState(shown);
  const [previous, setPrevious] = useState<number | null>(null);
  if (shown !== current) {
    setPrevious(current);
    setCurrent(shown);
  }

  return (
    <section className="section-y relative bg-pearl" aria-labelledby="faq-heading">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---------------- Left: heading + live photo ---------------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-muted">
              <span className="text-brand-500">({pad(faqs.length)})</span> Frequently asked
            </p>
            <SplitReveal as="h2" id="faq-heading" className="mt-3 text-display-md font-bold">
              Questions, answered.
            </SplitReveal>
            <p className="mt-4 max-w-md leading-relaxed">
              Straight answers about visits, costs and comfort. Anything else, just{" "}
              <a
                href={site.phone.href}
                className="font-semibold text-ink underline decoration-brand-400 decoration-2 underline-offset-4 hover:text-brand-600"
              >
                give us a call
              </a>
              .
            </p>

            <Reveal delay={0.1} className="mt-8 hidden lg:block">
              <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-slate-200">
                {/* Base layer: every photo preloaded; only the previous one is visible */}
                {photos.map((ph, i) => (
                  <Image
                    key={ph.src}
                    src={ph.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    loading="eager"
                    sizes="34rem"
                    className={cn("object-cover", i === (previous ?? current) ? "opacity-100" : "opacity-0")}
                  />
                ))}
                {/* Top layer: the current photo wipes in over the previous one */}
                <motion.div
                  key={current}
                  initial={previous === null ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 0.7, ease: ease.inOut }}
                  className="absolute inset-0"
                >
                  <motion.div
                    initial={previous === null ? false : { scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.1, ease: ease.out }}
                    className="absolute inset-0"
                  >
                    <Image src={photos[current].src} alt={photos[current].alt} fill sizes="34rem" className="object-cover" />
                  </motion.div>
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-linear-to-t from-ink/70 to-transparent p-5 text-white">
                  <span className="text-4xl leading-none font-bold tracking-tighter tabular-nums">{pad(current + 1)}</span>
                  <span className="text-xs font-medium text-white/80">/ {pad(faqs.length)}</span>
                </div>
              </div>
            </Reveal>

            <p className="mt-8 text-lg leading-snug font-semibold tracking-tight text-ink">
              Still curious? Call{" "}
              <a href={site.phone.href} className="whitespace-nowrap text-brand-500 hover:text-brand-700">
                {site.phone.display}
              </a>{" "}
              or{" "}
              <Link
                href={site.bookingHref}
                className="group inline-flex items-baseline gap-1.5 whitespace-nowrap underline decoration-ink/20 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                request a visit
                <ArrowRight className="size-4 self-center transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </p>
          </div>
        </div>

        {/* ---------------- Right: compact typographic list ---------------- */}
        <div className="border-t border-ink lg:col-span-7" onPointerLeave={() => setHovered(null)}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-panel-${i}`;
            return (
              <div key={f.q} className="border-b border-line" onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5 text-left md:grid-cols-[3.25rem_1fr_auto]"
                  >
                    <span
                      className={cn(
                        "text-xs font-semibold tabular-nums transition-colors duration-500",
                        isOpen ? "text-brand-500" : "text-muted group-hover:text-ink",
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "text-lg leading-snug font-semibold tracking-tight transition-[color,transform] duration-700 ease-out-expo md:text-xl",
                        isOpen ? "text-ink" : "text-ink/70 group-hover:translate-x-2 group-hover:text-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    {/* line-drawn plus / minus */}
                    <span className="relative grid size-10 place-items-center" aria-hidden="true">
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full border transition-all duration-500",
                          isOpen ? "scale-100 border-ink bg-ink" : "scale-90 border-line group-hover:scale-100 group-hover:border-ink",
                        )}
                      />
                      <span className={cn("absolute h-px w-3.5 transition-colors duration-500", isOpen ? "bg-white" : "bg-ink")} />
                      <span className={cn("absolute h-3.5 w-px transition-all duration-500", isOpen ? "scale-y-0 bg-white" : "bg-ink")} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      role="region"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.6, ease: ease.inOut }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: ease.out, delay: 0.12 }}
                        className="pb-6 pl-[2.5rem] md:pr-14 md:pl-[3.25rem]"
                      >
                        <p className="leading-relaxed text-body md:text-[1.0625rem]">{f.a}</p>
                        <FaqLink link={f.link} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqLink({ link }: { link: { label: string; href: string; external?: boolean } }) {
  const className =
    "group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-brand-400 decoration-2 underline-offset-[5px] transition-colors hover:text-brand-600";
  const inner = (
    <>
      {link.label}
      <ArrowRight className="size-4 transition-transform duration-500 group-hover/link:translate-x-1" />
    </>
  );
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className} {...(link.external ? { target: "_blank", rel: "noopener" } : {})}>
      {inner}
    </a>
  );
}
