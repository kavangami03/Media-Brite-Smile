"use client";

import { useMemo, useState } from "react";
import { Check, Phone, Search } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Searchable grid of the insurance plans the practice works with. */
export function PlanFinder({ names }: { names: string[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n ? names.filter((p) => p.toLowerCase().includes(n)) : names;
  }, [q, names]);

  return (
    <div className="rounded-4xl bg-white p-5 shadow-soft ring-1 ring-line sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search for your insurance plan</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for your plan, e.g. Delta"
            className="block w-full rounded-full border border-line bg-pearl py-3.5 pr-4 pl-12 text-base text-ink outline-none placeholder:text-muted/80 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
          />
        </label>
        <p className="text-sm font-semibold text-body" aria-live="polite">
          {q ? `${hits.length} of ${names.length} plans` : `${names.length} plans`}
        </p>
      </div>

      {hits.length ? (
        <ul className="mt-6 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {hits.map((p) => (
            <li
              key={p}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-[0.9375rem] font-medium ring-1 transition-colors",
                q ? "bg-brand-50 text-brand-900 ring-brand-500/25" : "bg-pearl text-ink ring-line",
              )}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-pearl p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1.0625rem] text-ink">
            Not on the list? Call with your plan name and the team will check what it covers.
          </p>
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-white hover:bg-brand-600"
          >
            <Phone className="size-4" /> {site.phone.display}
          </a>
        </div>
      )}
    </div>
  );
}
