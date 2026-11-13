"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { site } from "@/content/site";

/* Bottom edge of the curtain: flat at rest, a smile as it lifts away. */
const EDGE_FLAT = "M0,0 H1440 V0 Q720,0 0,0 Z";
const EDGE_SMILE = "M0,0 H1440 V0 Q720,320 0,0 Z";

/**
 * "Brite" intro:
 * 1. the real (vector) logo sits greyed out; a cerulean streak whitens it into full colour,
 * 2. the logo then flies into the exact spot of the header logo while the curtain lifts
 *    away with a smile-shaped edge, so intro and header read as one continuous object.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Lock smooth scroll while the intro plays, always from the very top of the page
  // (so the header sits in its normal, un-scrolled position when the logo lands).
  useEffect(() => {
    if (!lenis) return;
    if (done) {
      lenis.start();
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.stop();
    }
  }, [lenis, done]);

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        markIntroDone();
        setDone(true);
        return;
      }

      // Scroll is locked via Lenis. Never toggle <html> overflow here (it shifts the
      // viewport width while ScrollTrigger measures pins). Stop the browser restoring an
      // old scroll position on reload, which would move the header mid-intro.
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      html.dataset.intro = "playing";
      // Hide the real header logo for the whole intro (inline style, so it never depends
      // on stylesheet load order); the flying logo stands in for it until it lands.
      const headerLogo = document.querySelector<HTMLElement>("[data-header-logo]");
      if (headerLogo) headerLogo.style.opacity = "0";

      const el = root.current!;
      const logo = el.querySelector<HTMLElement>("[data-pl-logo]")!;
      const counter = el.querySelector<HTMLElement>("[data-pl-count]")!;
      const progress = { v: 0 };
      const flight: { p: number; from: { left: number; top: number; width: number } | null } = { p: 0, from: null };

      gsap.set("[data-pl-color]", { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set("[data-pl-streak]", { left: "0%", opacity: 0 });

      // Same-frame swap: the flying logo disappears in the exact frame the header logo
      // appears, so two logos are never visible at once.
      const finish = () => {
        logo.style.visibility = "hidden";
        if (headerLogo) headerLogo.style.opacity = "";
        delete html.dataset.intro;
        setDone(true);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      const tl = gsap.timeline({ onComplete: finish });

      tl.from("[data-pl-corner]", { opacity: 0, y: 10, stagger: 0.06, duration: 0.5, ease: "power2.out" })
        .from("[data-pl-grey]", { opacity: 0, scale: 0.96, duration: 0.6, ease: "power2.out" }, 0)
        // Whitening sweep
        .to("[data-pl-streak]", { opacity: 1, duration: 0.2 }, 0.35)
        .to("[data-pl-color]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.inOut" }, 0.35)
        .to("[data-pl-streak]", { left: "100%", duration: 1.1, ease: "power2.inOut" }, 0.35)
        .to("[data-pl-streak]", { opacity: 0, duration: 0.25 }, ">-0.15")
        .to(
          progress,
          {
            v: 100,
            duration: 1.45,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.v)).padStart(3, "0");
            },
          },
          0,
        )
        // short beat so the full-colour logo registers before it moves
        .addLabel("handoff", ">+=0.15")
        // Background content fades, curtain lifts with a smile-shaped edge (in sync with the flight)
        .to("[data-pl-fade]", { opacity: 0, duration: 0.35, ease: "power2.out" }, "handoff")
        .to("[data-pl-bg]", { yPercent: -100, duration: 1, ease: "brite.inOut" }, "handoff")
        .to("[data-pl-edge]", { attr: { d: EDGE_SMILE }, duration: 1, ease: "power2.out" }, "<")
        // hero starts revealing as the logo is about to land
        .add(() => markIntroDone(), "handoff+=0.45")
        // Logo flies to the header logo's exact position and size
        .to("[data-pl-grey]", { opacity: 0, duration: 0.25 }, "handoff")
        .to(
          flight,
          {
            p: 1,
            duration: 1,
            ease: "brite.inOut",
            onStart: () => {
              // Switch from "centred via CSS translate" to plain pixel coordinates,
              // so the flight is a simple rect-to-rect interpolation.
              const r = logo.getBoundingClientRect();
              flight.from = { left: r.left, top: r.top, width: r.width };
              logo.style.translate = "none";
              logo.style.left = `${r.left}px`;
              logo.style.top = `${r.top}px`;
              logo.style.width = `${r.width}px`;
            },
            onUpdate: () => {
              // Re-measure the header logo every frame: lands exactly even if the
              // header shifts during the flight, on any screen size.
              const target = document.querySelector<HTMLElement>("[data-header-logo]");
              const f = flight.from;
              if (!target || !f) return;
              const t = target.getBoundingClientRect();
              const p = flight.p;
              logo.style.left = `${f.left + (t.left - f.left) * p}px`;
              logo.style.top = `${f.top + (t.top - f.top) * p}px`;
              logo.style.width = `${f.width + (t.width - f.width) * p}px`;
            },
          },
          "handoff",
        );

      return () => {
        if (headerLogo) headerLogo.style.opacity = "";
        delete html.dataset.intro;
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-100" aria-hidden="true">
      {/* ---------- Curtain (lifts away) ---------- */}
      <div data-pl-bg className="absolute inset-0 bg-white">
        {/* smile-shaped bottom edge (hangs below the panel) */}
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 top-full h-[22vh] w-full">
          <path data-pl-edge d={EDGE_FLAT} fill="#ffffff" />
        </svg>

        <div data-pl-fade className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 size-176 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/60 blur-[120px]" />

          {/* editorial corners */}
          <div className="absolute inset-0 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            <span data-pl-corner className="absolute top-6 left-6 md:top-10 md:left-10">
              {site.name}
            </span>
            <span data-pl-corner className="absolute top-6 right-6 md:top-10 md:right-10">
              Since {site.since}
            </span>
            <span data-pl-corner className="absolute bottom-6 left-6 hidden sm:block md:bottom-10 md:left-10">
              Family · Cosmetic · Implant Dentistry
            </span>
            <span
              data-pl-corner
              className="absolute right-6 bottom-6 flex items-baseline gap-1 text-ink md:right-10 md:bottom-10"
            >
              <span data-pl-count className="text-4xl font-bold tracking-tighter tabular-nums md:text-5xl">
                000
              </span>
              <span className="text-brand-500">%</span>
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Logo (flies into the header) ---------- */}
      <div
        data-pl-logo
        className="absolute top-1/2 left-1/2 w-[min(78vw,30rem)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <Image
          data-pl-grey
          src="/images/brand/logo.svg"
          alt=""
          width={892}
          height={302}
          preload
          unoptimized
          className="h-auto w-full opacity-25 grayscale"
        />
        <div data-pl-color className="absolute inset-0">
          <Image src="/images/brand/logo.svg" alt="" width={892} height={302} unoptimized className="h-auto w-full" />
        </div>
        {/* light streak riding the reveal edge */}
        <span
          data-pl-streak
          className="pointer-events-none absolute -inset-y-8 w-24 -translate-x-1/2 bg-linear-to-r from-transparent via-glow/70 to-transparent blur-md"
        />
        <span
          data-pl-streak
          className="pointer-events-none absolute -inset-y-10 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-brand-500 to-transparent"
        />
      </div>
    </div>
  );
}
