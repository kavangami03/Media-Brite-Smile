import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { doctors, site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Five stars + the Google rating, linking to the Business Profile. */
export function RatingCard({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={site.gbp}
      target="_blank"
      rel="noopener"
      className={cn(
        "group block rounded-3xl p-5 shadow-lift ring-1 transition-transform duration-500 hover:-translate-y-0.5",
        dark ? "bg-ink text-white ring-white/10" : "bg-white text-ink ring-line",
        className,
      )}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
        ))}
      </span>
      <span className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl leading-none font-bold tracking-tighter">{site.rating.score}</span>
        <span className={cn("text-sm", dark ? "text-white/60" : "text-muted")}>out of 5</span>
      </span>
      <span className={cn("mt-1 flex items-center gap-1 text-sm", dark ? "text-white/75" : "text-body")}>
        from {site.rating.count} Google reviews
        <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </a>
  );
}

/** Overlapping portraits of the three dentists. */
export function DoctorStack({ size = "size-11", className }: { size?: string; className?: string }) {
  return (
    <span className={cn("flex -space-x-3", className)}>
      {doctors.map((d) => (
        <span key={d.href} className={cn("relative overflow-hidden rounded-full ring-2 ring-white", size)}>
          <Image
            src={d.image}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
            style={{ objectPosition: d.position }}
          />
        </span>
      ))}
    </span>
  );
}

/** Large link tile used for "next step" rows. */
export function LinkTile({
  href,
  icon,
  title,
  text,
  className,
  stacked = false,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  text: string;
  className?: string;
  /** icon above the text, for narrow columns */
  stacked?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full gap-4 rounded-3xl bg-white p-6 ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift",
        stacked ? "flex-col" : "items-start",
        className,
      )}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold tracking-tight text-ink">{title}</span>
        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-body">{text}</span>
      </span>
      <ArrowUpRight
        className={cn(
          "size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45",
          stacked ? "absolute top-6 right-6" : "mt-1",
        )}
      />
    </Link>
  );
}

/** Numbered step list used for "how it works" sections. */
export function Steps({ items, tone = "dark" }: { items: { title: string; text: string }[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li
          key={s.title}
          className={cn("relative rounded-3xl p-6 ring-1", light ? "bg-white/5 ring-white/10" : "bg-white ring-line")}
        >
          <span
            className={cn(
              "grid size-11 place-items-center rounded-full text-sm font-bold tabular-nums",
              light ? "bg-white text-ink" : "bg-brand-500 text-white",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={cn("mt-5 text-lg font-semibold tracking-tight", light ? "text-white" : "text-ink")}>
            {s.title}
          </p>
          <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", light ? "text-white/65" : "text-body")}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
