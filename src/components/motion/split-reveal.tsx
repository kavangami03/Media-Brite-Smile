"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" = masked line slide-up, "words" = staggered word rise + blur */
  mode?: "lines" | "words";
  /** Play on mount (hero) instead of on scroll */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  id?: string;
};

/**
 * Headline reveal powered by GSAP SplitText.
 * Uses autoSplit so lines re-split on resize/font-load without breaking.
 */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className,
  mode = "lines",
  immediate = false,
  delay = 0,
  stagger,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el, {
          type: mode === "lines" ? "lines" : "words,lines",
          mask: mode === "lines" ? "lines" : undefined,
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            const targets = mode === "lines" ? self.lines : self.words;
            const from =
              mode === "lines"
                ? { yPercent: 110, rotate: 2 }
                : { yPercent: 60, opacity: 0, filter: "blur(8px)" };
            return gsap.from(targets, {
              ...from,
              duration: mode === "lines" ? 1.2 : 1,
              stagger: stagger ?? (mode === "lines" ? 0.1 : 0.04),
              delay,
              ease: "brite.out",
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
              // Restore plain text once revealed: no masks left to clip descenders, and
              // the heading reflows naturally on resize.
              onComplete: () => self.revert(),
            });
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn("gsap-hidden", className)}>
      {children}
    </Tag>
  );
}
