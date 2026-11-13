"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed parallax. Wrap an image inside an overflow-hidden frame;
 * the inner layer is oversized by `amount`% so edges never show.
 */
export function Parallax({
  children,
  amount = 12,
  className,
  innerClassName,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  innerClassName?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <div
        ref={inner}
        className={cn("absolute inset-x-0", innerClassName)}
        style={{ top: `-${amount / 2}%`, bottom: `-${amount / 2}%` }}
      >
        {children}
      </div>
    </div>
  );
}
