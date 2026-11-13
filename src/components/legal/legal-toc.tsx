"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; title: string };

/** Section list that highlights where the reader is. Sticky sidebar on desktop, a fold-out on mobile. */
export function LegalToc({ items }: { items: Item[] }) {
  const lenis = useLenis();
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    if (lenis) lenis.scrollTo(el, { offset: -130, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const list = (
    <ol className="relative mt-4 space-y-0.5 border-l border-line">
      {items.map((s, i) => {
        const on = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              aria-current={on ? "location" : undefined}
              className={cn(
                "relative -ml-px flex min-h-11 items-baseline gap-3 border-l-2 py-3 pr-2 pl-4 text-[0.9375rem] leading-snug transition-colors duration-300 lg:min-h-0 lg:py-2",
                on ? "border-brand-500 font-semibold text-ink" : "border-transparent text-body hover:text-brand-700",
              )}
            >
              <span
                className={cn(
                  "w-5 shrink-0 text-xs font-bold tabular-nums transition-colors duration-300",
                  on ? "text-brand-500" : "text-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* mobile & tablet */}
      <details className="group rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase [&::-webkit-details-marker]:hidden">
          On this page · {items.length} sections
          <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        {list}
      </details>

      {/* desktop */}
      <nav aria-label="On this page" className="hidden lg:block">
        <p className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">On this page</p>
        {list}
      </nav>
    </>
  );
}
