"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Large statement text whose words light up as you scroll through it.
 * Wrap text runs in <span data-scrub>; inline media in <span data-pill>.
 */
export function ScrubText({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el.querySelectorAll("[data-scrub]"), {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.14 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
              },
            );
          },
        });
        gsap.from(el.querySelectorAll("[data-pill]"), {
          scale: 0.4,
          opacity: 0,
          rotate: -8,
          stagger: 0.15,
          ease: "back.out(1.6)",
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn(className)}>
      {children}
    </p>
  );
}
