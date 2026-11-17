"use client";

/**
 * Single entry point for GSAP.
 * Import gsap / plugins from here (never from "gsap" directly) so plugins
 * are registered exactly once and tree-shaking stays predictable.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP as useGSAPBase } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAPBase, ScrollTrigger, SplitText, CustomEase);

  // Brand easing curves: reuse these names across the site for a consistent feel.
  CustomEase.create("brite.out", "0.16, 1, 0.3, 1"); // expo-like, soft landing
  CustomEase.create("brite.inOut", "0.85, 0, 0.15, 1"); // dramatic wipes / reveals

  gsap.defaults({ ease: "brite.out", duration: 1 });

  // Lenis drives scroll; avoid ScrollTrigger fighting mobile address-bar resizes.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * useGSAP with a safety net. Animations are decoration: if setting one up ever
 * throws (a plugin edge case, an element that is gone after a fast page change),
 * that animation is skipped and the page keeps working instead of crashing.
 * In development the problem is still reported as a console warning.
 */
const useGSAP: typeof useGSAPBase = (func, dependencies) => {
  const safe =
    typeof func === "function"
      ? (...args: Parameters<typeof func>) => {
          try {
            return func(...args);
          } catch (error) {
            if (process.env.NODE_ENV !== "production") console.warn("[animation skipped]", error);
            /* clear anything half-built (after the setup call returns, never inside it),
               so no element is left hidden by an unfinished from() tween */
            const context = args[0];
            queueMicrotask(() => context?.revert());
          }
        }
      : func;
  return useGSAPBase(safe, dependencies);
};

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
