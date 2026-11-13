"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgePercent, MapPin, Phone, Stethoscope, Users } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ToothWatermark } from "@/components/ui/icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroReady } from "@/lib/intro";

const quickLinks = [
  { label: "Our services", href: "/services", icon: Stethoscope },
  { label: "Meet our dentists", href: "/about-us", icon: Users },
  { label: "Special offers", href: "/special-offers", icon: BadgePercent },
  { label: "Areas we serve", href: "/locations", icon: MapPin },
];

/**
 * 404: the "4 · tooth · 4" drop in from above, bounce and squash as they land,
 * then hop again when hovered or tapped.
 */
export function NotFoundHero() {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroReady();

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const glyphs = gsap.utils.toArray<HTMLElement>("[data-glyph]", el);
      const shadows = gsap.utils.toArray<HTMLElement>("[data-shadow]", el);
      const copy = gsap.utils.toArray<HTMLElement>("[data-copy]", el);
      const floats = gsap.utils.toArray<HTMLElement>("[data-float]", el);
      const floatShadows = gsap.utils.toArray<HTMLElement>("[data-float-shadow]", el);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(glyphs, { yPercent: -320, rotation: (i) => [-28, 18, 24][i] ?? 0 });
        gsap.set(shadows, { scaleX: 0.15, autoAlpha: 0 });
        gsap.set(copy, { y: 30, autoAlpha: 0 });
        if (!ready) return;

        // created up front (paused) so the context cleans them up on unmount
        const drift = floats.flatMap((f, i) => {
          const d = [3.2, 2.6, 3.6][i] ?? 3;
          const loop = { duration: d, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.35, paused: true };
          return [
            gsap.to(f, { y: [-18, -26, -14][i] ?? -18, rotation: [-3, 4, 3][i] ?? 0, ...loop }),
            gsap.to(floatShadows[i], { scaleX: 0.7, scaleY: 0.8, opacity: 0.5, ...loop }),
          ];
        });

        const tl = gsap.timeline({ delay: 0.15 });
        tl.set(glyphs, { autoAlpha: 1 }, 0);
        glyphs.forEach((g, i) => {
          const at = i * 0.22;
          tl.to(g, { yPercent: 0, rotation: 0, duration: 1.35, ease: "bounce.out" }, at)
            .to(shadows[i], { scaleX: 1, autoAlpha: 1, duration: 1.35, ease: "bounce.out" }, at)
            // squash on the first impact (bounce.out first touches down ~36% in)
            .to(
              g,
              { scaleY: 0.86, scaleX: 1.08, duration: 0.09, transformOrigin: "50% 100%", yoyo: true, repeat: 1 },
              at + 0.47,
            );
        });
        // the tooth gives a little wobble once everything has landed
        tl.to(glyphs[1], { rotation: 8, duration: 0.18, ease: "power2.out" }, ">-0.1")
          .to(glyphs[1], { rotation: -6, duration: 0.22, ease: "sine.inOut" })
          .to(glyphs[1], { rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
          .to(copy, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9, ease: "brite.out" }, 1.1)
          // then they keep drifting: each glyph bobs on its own beat, its shadow breathing beneath it
          .add(() => drift.forEach((t) => t.play()));
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...glyphs, ...shadows, ...copy], { autoAlpha: 1 });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  const hop = contextSafe((g: HTMLElement, i: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = g.parentElement?.querySelector("[data-shadow]");
    if (gsap.isTweening(g)) return;
    gsap
      .timeline()
      .to(g, { scaleY: 0.88, scaleX: 1.06, duration: 0.1, transformOrigin: "50% 100%" })
      .to(g, {
        yPercent: -38,
        scaleY: 1.04,
        scaleX: 0.97,
        rotation: i === 1 ? 360 : 0,
        duration: 0.42,
        ease: "power2.out",
      })
      .to(s ?? [], { scaleX: 0.55, autoAlpha: 0.5, duration: 0.42, ease: "power2.out" }, "<")
      .to(g, { yPercent: 0, scaleY: 1, scaleX: 1, duration: 0.7, ease: "bounce.out" })
      .to(s ?? [], { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "bounce.out" }, "<")
      .set(g, { rotation: 0 });
  });

  const glyph =
    "relative block cursor-pointer select-none text-[clamp(7rem,30vw,22rem)] leading-[0.8] font-bold tracking-tighter";

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-pearl pt-40 pb-16 sm:pt-44"
      aria-labelledby="nf-title"
    >
      {/* backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_158_203/0.14)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_center,#000_30%,transparent_75%)] bg-size-[28px_28px]" />
        <div className="absolute top-1/3 left-1/2 size-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/25 blur-[140px]" />
      </div>

      <div className="container-site flex flex-col items-center text-center">
        {/* 4 · tooth · 4 */}
        <div role="img" aria-label="404" className="flex items-end justify-center gap-[2vw]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              <span
                data-glyph
                onPointerEnter={(e) => e.pointerType === "mouse" && hop(e.currentTarget, i)}
                onClick={(e) => hop(e.currentTarget, i)}
                className={glyph}
                style={{ visibility: "hidden" }}
              >
                {i === 1 ? (
                  <span data-float className="flex h-[0.8em] items-end px-[0.04em] text-brand-500">
                    <ToothWatermark
                      size={1}
                      className="h-[0.8em] w-auto drop-shadow-[0_18px_30px_rgb(0_158_203/0.35)]"
                    />
                  </span>
                ) : (
                  <span data-float className="block text-ink">
                    4
                  </span>
                )}
              </span>
              <span data-float-shadow aria-hidden="true" className="mt-3 flex w-[70%] justify-center">
                <span
                  data-shadow
                  className="block h-4 w-full rounded-[50%] bg-[radial-gradient(closest-side,rgb(10_30_40/0.32),rgb(10_30_40/0.12)_60%,transparent)] blur-[3px] sm:h-6"
                  style={{ visibility: "hidden" }}
                />
              </span>
            </div>
          ))}
        </div>

        <div data-copy className="mt-10" style={{ visibility: "hidden" }}>
          <Eyebrow className="mx-auto">Error 404 · Page not found</Eyebrow>
        </div>
        <h1
          id="nf-title"
          data-copy
          className="mt-6 max-w-3xl text-display-md font-bold"
          style={{ visibility: "hidden" }}
        >
          This page has slipped <span className="text-brand-500">out of place</span>
        </h1>
        <p data-copy className="mt-5 max-w-xl text-lg leading-relaxed" style={{ visibility: "hidden" }}>
          The link may be broken or the page may have moved. Let&apos;s get your visit back on track.
        </p>
        <div data-copy className="mt-8 flex flex-wrap justify-center gap-3" style={{ visibility: "hidden" }}>
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" />}>
            {site.phone.display}
          </Button>
        </div>

        <nav data-copy aria-label="Popular pages" className="mt-12 w-full max-w-4xl" style={{ visibility: "hidden" }}>
          <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-left shadow-soft ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold text-ink">{label}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
