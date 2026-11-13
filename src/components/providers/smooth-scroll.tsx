"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so Lenis + ScrollTrigger
 * share one RAF loop (no jitter between smooth scroll and scroll animations).
 * Reduced-motion users keep Lenis (anchors / scrollTo still work) but get
 * instant, native-feeling wheel scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // GSAP's ticker drives Lenis (see <LenisGsapBridge />)
        lerp: reduce ? 1 : 0.1,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: { offset: -96 },
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Must render inside <ReactLenis> so `useLenis` resolves the live instance.
 * ReactLenis creates the instance in an effect (and re-creates it when options
 * change), so we key off the hook value, never a ref read once at mount.
 */
function LenisGsapBridge() {
  // Subscribing with a callback keeps ScrollTrigger in sync with every Lenis scroll.
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return null;
}
