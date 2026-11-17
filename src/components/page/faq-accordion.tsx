"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type QA = { q: string; a: string };

/** One-open-at-a-time accordion. Answers stay in the HTML (grid-rows collapse), so they are crawlable. */
export function FaqAccordion({ items, tone = "dark" }: { items: QA[]; tone?: "dark" | "light" }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const light = tone === "light";

  return (
    <ul className={cn("border-t", light ? "border-white/15" : "border-line")}>
      {items.map((f, i) => {
        const on = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={f.q} className={cn("border-b", light ? "border-white/15" : "border-line")}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={id}
                onClick={() => setOpen(on ? null : i)}
                className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "text-lg leading-snug font-semibold tracking-tight transition-colors sm:text-xl",
                    light ? "text-white" : on ? "text-brand-700" : "text-ink group-hover:text-brand-700",
                  )}
                >
                  {f.q}
                </span>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                    on
                      ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                      : light
                        ? "border-white/25 text-white"
                        : "border-line text-brand-600 group-hover:border-brand-500",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={id}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={cn(
                    "max-w-3xl pr-14 pb-6 text-[1.0625rem] leading-relaxed",
                    light ? "text-white/70" : "text-body",
                  )}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
