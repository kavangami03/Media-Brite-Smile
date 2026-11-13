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
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  // Brand easing curves: reuse these names across the site for a consistent feel.
  CustomEase.create("brite.out", "0.16, 1, 0.3, 1"); // expo-like, soft landing
  CustomEase.create("brite.inOut", "0.85, 0, 0.15, 1"); // dramatic wipes / reveals

  gsap.defaults({ ease: "brite.out", duration: 1 });

  // Lenis drives scroll; avoid ScrollTrigger fighting mobile address-bar resizes.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
