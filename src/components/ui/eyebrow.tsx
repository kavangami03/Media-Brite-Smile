import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandTooth } from "./icons";

/** Small uppercase section label with the brand tooth mark. */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold tracking-[0.08em] whitespace-nowrap uppercase sm:gap-2.5 sm:px-3.5 sm:tracking-[0.16em]",
        tone === "dark"
          ? "border-brand-500/20 bg-brand-50/70 text-brand-700"
          : "border-white/15 bg-white/5 text-brand-200",
        className,
      )}
    >
      <BrandTooth size={15} variant={tone === "dark" ? "color" : "light"} />
      {children}
    </p>
  );
}
