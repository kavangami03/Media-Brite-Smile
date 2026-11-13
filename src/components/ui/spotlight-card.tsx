"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dark feature card with a gradient hairline border and a soft spotlight
 * that follows the cursor. Renders as a Link when `href` is given.
 */
export function SpotlightCard({
  href,
  children,
  className,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  const inner = (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-white p-6 text-ink",
        className,
      )}
    >
      {/* cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 0%), rgb(0 158 203 / 0.12), transparent 65%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );

  const shell =
    "group block h-full rounded-[1.75rem] bg-linear-to-br from-brand-200 via-white to-brand-300 p-px shadow-[0_20px_50px_-20px_rgb(0_0_0/0.55)] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-18px_rgb(0_158_203/0.55)]";

  return href ? (
    <Link href={href} className={shell}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  );
}
