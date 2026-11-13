"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Clip-path wipe reveal with a counter-scale on the media inside.
 * direction: where the wipe starts from.
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "center";
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const clips = {
    up: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
    center: "inset(22% 22% 22% 22% round 2rem)",
  } as const;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          delay,
          scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
        });
        tl.fromTo(
          el,
          { clipPath: clips[direction] },
          { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.6, ease: "brite.inOut" },
        ).from(el.querySelector("[data-reveal-media]"), { scale: 1.35, duration: 2, ease: "brite.out" }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
