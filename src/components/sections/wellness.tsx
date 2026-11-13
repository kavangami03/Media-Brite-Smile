"use client";

import Image from "next/image";
import { useRef } from "react";
import { Leaf, Microscope, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

const pillars = [
  {
    icon: Leaf,
    title: "Mercury-free & metal-free",
    text: "High-quality porcelain and composite restorations, plus metal-free crowns, bridges and fillings.",
  },
  {
    icon: ShieldCheck,
    title: "Biocompatible materials",
    text: "We carefully test every material we use to ensure it's safe and compatible with your body.",
  },
  {
    icon: Sparkles,
    title: "Low-radiation digital X-rays",
    text: "Digital imaging uses significantly less radiation, and we take diagnostic images only when necessary.",
  },
  {
    icon: ScanLine,
    title: "iTero® digital impressions",
    text: "Advanced intraoral scanning replaces goopy molds with comfortable, mess-free 3D impressions.",
  },
  {
    icon: Microscope,
    title: "Minimally invasive precision",
    text: "High-power microscopes and electric handpieces mean precise fit, less vibration and less noise.",
  },
];

export function Wellness() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-pillar]", el).forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } });
          tl.from(row.querySelector("[data-line]"), { scaleX: 0, duration: 1.2, ease: "brite.inOut" })
            .from(row.querySelector("[data-icon]"), { scale: 0, rotate: -45, duration: 0.8, ease: "back.out(2)" }, 0.2)
            .from(row.querySelectorAll("[data-fade]"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.25);
        });
        const floatCards = el.querySelectorAll("[data-float-card]");
        if (floatCards.length)
          gsap.to(floatCards, {
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section-y relative bg-mist" aria-labelledby="wellness-heading">
      <div className="container-site grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Holistic Approach</Eyebrow>
            <SplitReveal as="h2" id="wellness-heading" className="mt-6 text-display-md font-bold">
              Dentistry designed for <span className="accent-serif text-brand-500">wellness</span> &amp; safety
            </SplitReveal>
            <p className="mt-6 max-w-lg text-lg leading-relaxed">
              Your well-being is at the center of everything we do. Our holistic approach emphasizes biocompatible,
              mercury-free and minimally invasive care: modern treatment at the highest safety standards.
            </p>

            <div className="relative mt-12 pr-10 pb-16">
              <ImageReveal className="aspect-[4/3] rounded-4xl" direction="up">
                <Image
                  data-reveal-media
                  src="/images/office/operatory-1.webp"
                  alt="A bright, modern treatment room at Media Brite Smile"
                  fill
                  sizes="(min-width:1024px) 36rem, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
              <div data-float-card className="absolute right-0 bottom-0 w-[46%]">
                <ImageReveal className="aspect-square rounded-3xl ring-8 ring-mist" direction="left" delay={0.3}>
                  <Image
                    data-reveal-media
                    src="/images/office/in-house-lab.webp"
                    alt="Our in-house dental lab"
                    fill
                    sizes="16rem"
                    className="object-cover"
                  />
                </ImageReveal>
              </div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:pt-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-pillar className="group relative py-10 first:pt-0">
              <div className="flex gap-3 sm:gap-6 md:gap-10">
                <span data-fade className="w-7 shrink-0 pt-2 sm:w-10 text-sm font-semibold text-muted tabular-nums">
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-5">
                    <span
                      data-icon
                      className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white"
                    >
                      <Icon className="size-6" />
                    </span>
                    <h3 data-fade className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {title}
                    </h3>
                  </div>
                  <p data-fade className="mt-4 max-w-xl text-lg leading-relaxed md:pl-[4.75rem]">
                    {text}
                  </p>
                </div>
              </div>
              <span data-line className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-900/15" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
