import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Eyebrow + animated H2 + optional lead. `aside` sits opposite the heading on wide screens. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  tone = "dark",
  align = "left",
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  aside?: ReactNode;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        aside && "lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        <Eyebrow tone={light ? "light" : "dark"} className={align === "center" ? "mx-auto" : undefined}>
          {eyebrow}
        </Eyebrow>
        <SplitReveal
          as="h2"
          id={id}
          className={cn("mt-5 text-display-md font-bold text-balance", light && "text-white")}
        >
          {title}
        </SplitReveal>
        {lead && (
          <Reveal y={20}>
            <p className={cn("mt-5 text-lg leading-relaxed text-pretty", light ? "text-white/70" : "text-body")}>
              {lead}
            </p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal className="shrink-0">{aside}</Reveal>}
    </div>
  );
}
