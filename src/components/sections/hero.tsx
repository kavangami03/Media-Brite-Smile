"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BadgePercent, Phone, Quote, Siren, Star } from "lucide-react";
import { doctors, serviceGroups, site, type NavLink } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BrandTooth, GoogleIcon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/marquee";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { introDone, useIntroReady } from "@/lib/intro";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Wall of smiles: photo tiles + real info tiles, in auto-scrolling columns.
--------------------------------------------------------------------------- */
type Tile =
  | { kind: "photo"; src: string; alt: string; h: string; shape: "arch" | "round"; pos?: string; label?: string }
  | { kind: "rating" }
  | { kind: "quote"; text: string; name: string }
  | { kind: "offer" }
  | { kind: "emergency" }
  | { kind: "since" };

const columns: { tiles: Tile[]; duration: number; reverse?: boolean; className?: string }[] = [
  {
    duration: 48,
    tiles: [
      {
        kind: "photo",
        src: "/images/hero/banner-2.jpg",
        alt: "A smiling family",
        h: "h-80",
        shape: "arch",
        pos: "40% 35%",
      },
      { kind: "rating" },
      {
        kind: "photo",
        src: "/images/hero/girl-smiling.webp",
        alt: "A woman with a bright smile",
        h: "h-64",
        shape: "round",
        pos: "50% 30%",
      },
      { kind: "quote", text: "Excellent dentists.", name: "Robert Morrison" },
      {
        kind: "photo",
        src: doctors[0].image,
        alt: `${doctors[0].name}, ${doctors[0].credential}`,
        h: "h-72",
        shape: "arch",
        pos: doctors[0].position,
        label: `${doctors[0].name}, ${doctors[0].credential}`,
      },
    ],
  },
  {
    duration: 56,
    reverse: true,
    tiles: [
      {
        kind: "photo",
        src: "/images/hero/section-bg.jpg",
        alt: "A smiling mother and daughter",
        h: "h-64",
        shape: "round",
        pos: "40% 35%",
      },
      { kind: "emergency" },
      {
        kind: "photo",
        src: "/images/services/cosmetic-dentistry.webp",
        alt: "A bright, healthy smile",
        h: "h-72",
        shape: "arch",
        pos: "50% 50%",
      },
      { kind: "offer" },
      {
        kind: "photo",
        src: doctors[1].image,
        alt: `${doctors[1].name}, ${doctors[1].credential}`,
        h: "h-80",
        shape: "round",
        pos: doctors[1].position,
        label: `${doctors[1].name}, ${doctors[1].credential}`,
      },
    ],
  },
  {
    duration: 52,
    className: "hidden xl:block",
    tiles: [
      {
        kind: "photo",
        src: "/images/hero/banner-4.jpg",
        alt: "A young patient smiling in the dental chair",
        h: "h-72",
        shape: "arch",
        pos: "62% 40%",
      },
      { kind: "since" },
      {
        kind: "photo",
        src: "/images/services/teeth-whitening.jpg",
        alt: "Teeth whitening results",
        h: "h-56",
        shape: "round",
        pos: "50% 50%",
      },
      {
        kind: "photo",
        src: doctors[2].image,
        alt: `${doctors[2].name}, ${doctors[2].credential}`,
        h: "h-80",
        shape: "arch",
        pos: doctors[2].position,
        label: `${doctors[2].name}, ${doctors[2].credential}`,
      },
      { kind: "quote", text: "Everyone at Media Brite Smile is wonderful and so professional!", name: "Sharon" },
    ],
  },
];

function TileView({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "photo":
      return (
        <div
          className={cn(
            "group relative w-full overflow-hidden bg-brand-100 shadow-soft",
            tile.h,
            tile.shape === "arch" ? "rounded-t-full rounded-b-4xl" : "rounded-4xl",
          )}
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(min-width:1280px) 16rem, (min-width:1024px) 22rem, 60vw"
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            style={{ objectPosition: tile.pos }}
          />
          {tile.label && (
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/90 px-3 py-1.5 text-center text-xs font-semibold text-ink backdrop-blur">
              {tile.label}
            </span>
          )}
        </div>
      );
    case "rating":
      return (
        <a
          href={site.social.google}
          target="_blank"
          rel="noopener"
          className="block rounded-4xl bg-white p-4 shadow-soft ring-1 ring-line sm:p-6"
        >
          <div className="flex items-center justify-between">
            <GoogleIcon size={22} />
            <span className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">{site.rating.score}</p>
          <p className="mt-1 text-sm text-body">from {site.rating.count} Google reviews</p>
        </a>
      );
    case "quote":
      return (
        <figure className="rounded-4xl bg-linear-to-br from-brand-500 to-brand-700 p-4 text-white shadow-soft sm:p-6">
          <Quote className="size-6 text-brand-200" />
          <blockquote className="mt-3 text-base leading-snug font-semibold tracking-tight sm:text-lg">
            “{tile.text}”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-2 text-sm text-brand-50/90">
            <GoogleIcon size={14} mono className="text-white" /> {tile.name}
          </figcaption>
        </figure>
      );
    case "offer":
      return (
        <Link href="/special-offers" className="group block rounded-4xl bg-ink p-4 text-white shadow-soft sm:p-6">
          <BadgePercent className="size-6 text-glow" />
          <p className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">$99</p>
          <p className="mt-1 text-sm text-white/70">New patient special, for uninsured patients</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-glow">
            View offers <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </Link>
      );
    case "emergency":
      return (
        <a href={site.phone.href} className="block rounded-4xl bg-white p-4 shadow-soft ring-1 ring-line sm:p-6">
          <span className="relative grid size-12 place-items-center rounded-2xl bg-rose-50 text-rose-500">
            <Siren className="size-5" />
          </span>
          <p className="mt-4 text-lg font-bold tracking-tight text-ink sm:text-xl">Same-day emergencies</p>
          <p className="mt-1 text-sm font-semibold text-brand-600">{site.phone.display}</p>
        </a>
      );
    case "since":
      return (
        <div className="rounded-4xl bg-mist p-4 ring-1 ring-brand-100 sm:p-6">
          <BrandTooth size={30} />
          <p className="mt-4 text-4xl font-bold tracking-tighter text-ink sm:text-5xl">{site.since}</p>
          <p className="mt-1 text-sm text-body">Caring for Media families since</p>
        </div>
      );
  }
}

/** One vertical, endlessly scrolling column (content duplicated for a seamless loop). */
function SmileColumn({ tiles, duration, reverse }: { tiles: Tile[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group/col -mx-3 h-full overflow-hidden px-3">
      <div
        className="flex animate-marquee-y flex-col gap-4 group-hover/col:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-4" aria-hidden={copy === 1 || undefined}>
            {tiles.map((t, i) => (
              <TileView key={`${copy}-${i}`} tile={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = el.querySelector<HTMLElement>("[data-hero-title]")!;
        let split: SplitText | undefined;
        let cancelled = false;

        gsap.set("[data-wall-col]", { yPercent: 18, opacity: 0 });

        introDone.then(() => {
          if (cancelled) return;
          split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "split-line" });
          gsap.set(title, { visibility: "visible" });

          gsap
            .timeline({ defaults: { ease: "brite.out" } })
            .from(split.lines, {
              yPercent: 115,
              rotate: 3,
              duration: 1.25,
              stagger: 0.1,
              onComplete: () => split?.revert(),
            })
            .to("[data-wall-col]", { yPercent: 0, opacity: 1, duration: 1.6, stagger: 0.14 }, 0.2);
        });

        // Scroll: copy lifts away gently, the wall drifts at a different pace
        gsap.to("[data-hero-copy]", {
          y: -60,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: { trigger: el, start: "25% top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-wall]", {
          y: 80,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          cancelled = true;
          split?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-title]", { visibility: "visible" });
      });
    },
    { scope: root },
  );

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: ease.out, delay },
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-pearl pt-32 lg:pt-28" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-160 rounded-full bg-brand-200/45 blur-[140px]" />
        <div className="absolute right-0 bottom-0 size-140 rounded-full bg-glow/20 blur-[140px]" />
      </div>

      <div className="relative container-site grid grid-cols-1 items-center gap-12 lg:min-h-[min(100svh,58rem)] lg:grid-cols-12 lg:gap-10">
        {/* ---------------- Left: content ---------------- */}
        <div data-hero-copy className="py-6 lg:col-span-6 lg:py-16">
          <motion.div {...appear(0)}>
            <Eyebrow>
              Family · Cosmetic · Implant<span className="hidden sm:inline">&nbsp;Dentistry</span>
            </Eyebrow>
          </motion.div>
          <h1 id="hero-title" data-hero-title className="gsap-hidden mt-7 text-display-xl font-bold text-ink">
            Brighter smiles, <span className="text-gradient-brand pr-1">gentler</span> care in Media, PA
          </h1>
          <motion.p {...appear(0.3)} className="mt-7 max-w-xl text-lg leading-relaxed text-body lg:text-xl">
            Since {site.since}, our Media dentists have helped patients of all ages achieve strong, beautiful smiles
            using modern technology, safe biocompatible materials and a genuinely caring approach.
          </motion.p>
          <motion.div {...appear(0.45)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={site.bookingHref} size="lg">
              Book an Appointment
            </Button>
            <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" />}>
              {site.phone.display}
            </Button>
          </motion.div>
        </div>

        {/* ---------------- Right: wall of smiles (desktop) ---------------- */}
        <div
          data-wall
          className="relative grid h-[30rem] grid-cols-2 gap-3 mask-[linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)] sm:h-[38rem] sm:gap-4 lg:col-span-6 lg:h-[min(88svh,52rem)] xl:grid-cols-3"
        >
          {columns.map((c, i) => (
            <div key={i} data-wall-col className={cn("h-full", c.className)}>
              <SmileColumn tiles={c.tiles} duration={c.duration} reverse={c.reverse} />
            </div>
          ))}
        </div>
      </div>

      {/* Service ribbon */}
      <div className="relative mt-10 border-y border-line bg-white py-6 lg:mt-0">
        <Marquee duration={45}>
          {serviceGroups
            .flatMap<NavLink>((g) => g.links.slice(0, 5))
            .map((l) => (
              <span key={l.href} className="flex items-center">
                <span className="px-8 text-2xl font-semibold tracking-tight text-ink/80 md:text-3xl">{l.label}</span>
                <BrandTooth size={22} className="opacity-70" />
              </span>
            ))}
        </Marquee>
      </div>
    </section>
  );
}
