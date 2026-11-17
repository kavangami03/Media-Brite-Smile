"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BookOpen, CornerDownLeft, MapPin, Phone, Scale, Search, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ToothWatermark } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type SitemapLink = { text: string; href: string };
export type SitemapImage = { src: string; alt: string };
export type SitemapGroup = {
  /** anchor of the chapter this group is shown in (Blog and Legal share one) */
  chapter: string;
  title: string;
  blurb: string;
  image: SitemapImage;
  /** photo for the hero tile (different from the chapter photo); none = plain icon tile */
  tile?: SitemapImage;
  links: SitemapLink[];
};
export type SitemapTask = { title: string; text: string; href: string; image: SitemapImage };

type Hit = SitemapLink & { group: string };

/* --------------------------------------------------------------------------
   Search: every word must appear in the page name or its section;
   names that start with the first word rank first.
-------------------------------------------------------------------------- */
function searchPages(index: Hit[], q: string): Hit[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .flatMap((h) => {
      const hay = `${h.text} ${h.group}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return [];
      const t = h.text.toLowerCase();
      return [{ h, score: t.startsWith(words[0]) ? 0 : t.includes(words[0]) ? 1 : 2 }];
    })
    .sort((a, b) => a.score - b.score)
    .map((x) => x.h);
}

function Highlight({ text, q }: { text: string; q: string }) {
  const w = q.trim().split(/\s+/)[0]?.toLowerCase();
  const i = w ? text.toLowerCase().indexOf(w) : -1;
  if (!w || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-brand-100 px-0.5 text-brand-800">{text.slice(i, i + w.length)}</mark>
      {text.slice(i + w.length)}
    </>
  );
}

const SUGGESTIONS = ["Invisalign", "Insurance", "Emergency", "Implants", "Swarthmore"];

function PageSearch({ index, phone }: { index: Hit[]; phone: { display: string; href: string } }) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [open, setOpen] = useState(false);
  const hits = useMemo(() => searchPages(index, q), [index, q]);
  const shown = hits.slice(0, 7);
  const expanded = open && q.trim().length > 0;

  /* "/" focuses the search from anywhere on the page */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']")) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const update = (v: string) => {
    setQ(v);
    setCursor(0);
    setOpen(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") return setOpen(false);
    if (!expanded || !shown.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % shown.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + shown.length) % shown.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(shown[Math.min(cursor, shown.length - 1)].href);
    }
  };

  return (
    <div>
      <div
        className="relative"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <label htmlFor={`${id}-q`} className="sr-only">
          Search every page
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-brand-500 sm:left-6" />
        <input
          ref={input}
          id={`${id}-q`}
          type="search"
          autoComplete="off"
          value={q}
          onChange={(e) => update(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-describedby={`${id}-count`}
          placeholder="Search a treatment, town or form"
          className="block h-16 w-full rounded-full bg-white pr-16 pl-13 text-base text-ink shadow-lift ring-1 ring-line outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand-500 sm:h-18 sm:pl-15 sm:text-lg [&::-webkit-search-cancel-button]:hidden"
        />
        {q ? (
          <button
            type="button"
            onClick={() => {
              update("");
              input.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute top-1/2 right-2.5 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-mist text-ink transition-colors hover:bg-brand-500 hover:text-white sm:right-3.5"
          >
            <X className="size-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 rounded-lg border border-line bg-pearl px-2.5 py-1 font-sans text-sm font-semibold text-muted lg:block">
            /
          </kbd>
        )}
        <p id={`${id}-count`} className="sr-only" aria-live="polite">
          {q.trim() ? `${hits.length} matching pages` : ""}
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: ease.out }}
              className="absolute inset-x-0 top-full z-30 mt-3 overflow-hidden rounded-3xl bg-white text-ink shadow-lift ring-1 ring-line"
            >
              {shown.length ? (
                <>
                  <ul className="max-h-88 overflow-y-auto overscroll-contain p-2">
                    {shown.map((h, i) => (
                      <li key={h.href + h.text}>
                        <Link
                          href={h.href}
                          onMouseEnter={() => setCursor(i)}
                          className={cn(
                            "flex min-h-14 items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors",
                            i === cursor ? "bg-mist" : "hover:bg-pearl",
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">
                              <Highlight text={h.text} q={q} />
                            </span>
                            <span className="block text-sm text-muted">{h.group}</span>
                          </span>
                          <span
                            className={cn(
                              "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
                              i === cursor ? "bg-brand-500 text-white" : "bg-pearl text-brand-600",
                            )}
                          >
                            {i === cursor ? <CornerDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-3 text-sm text-muted">
                    <span>
                      {hits.length} {hits.length === 1 ? "page" : "pages"}
                      {hits.length > shown.length ? `, top ${shown.length} shown` : ""}
                    </span>
                    <span className="hidden lg:inline">Arrow keys to move, Enter to open</span>
                  </div>
                </>
              ) : (
                <div className="p-6 sm:p-7">
                  <p className="font-semibold">No page matches &ldquo;{q.trim()}&rdquo;.</p>
                  <p className="mt-1 text-body">Try a treatment or a town name, or ask the front desk.</p>
                  <a
                    href={phone.href}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    <Phone className="size-4" /> {phone.display}
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-muted">Popular:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              update(s);
              input.current?.focus();
            }}
            className="min-h-10 cursor-pointer rounded-full bg-white px-4 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-ink hover:text-white hover:ring-ink"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Hero bento: a photo tile per section, Core Pages as the large lead tile,
   and a call tile to close the grid.
-------------------------------------------------------------------------- */
const SPANS: Record<string, string> = {
  "Core Pages": "col-span-2 sm:row-span-2",
  "Patient Information": "sm:col-span-2",
  "Restorative Dentistry": "sm:col-span-2",
  "Areas We Serve": "sm:col-span-2",
};
const PLAIN_ICONS: Partial<Record<string, typeof BookOpen>> = { Blog: BookOpen, Legal: Scale };

function SectionBento({ groups, phone }: { groups: SitemapGroup[]; phone: { display: string; href: string } }) {
  return (
    <ul className="grid auto-rows-[8rem] grid-cols-2 gap-3 sm:auto-rows-[9.5rem] sm:grid-cols-4 xl:auto-rows-[10.5rem]">
      {groups.map((g) => {
        const lead = g.title === "Core Pages";
        const Icon = PLAIN_ICONS[g.title];
        return (
          <li key={g.title} className={cn("min-w-0", SPANS[g.title])}>
            <a
              href={`#${g.chapter}`}
              className={cn(
                "group relative isolate flex size-full flex-col justify-between overflow-hidden rounded-3xl p-4 transition-shadow duration-500 hover:shadow-lift sm:p-5 xl:p-4 2xl:p-5",
                g.tile ? "text-white" : "bg-white text-ink ring-1 ring-line",
              )}
            >
              {g.tile && (
                <>
                  <Image
                    src={g.tile.src}
                    alt={g.tile.alt}
                    fill
                    priority={lead}
                    sizes={lead ? "(min-width:1024px) 25vw, 100vw" : "(min-width:1024px) 13vw, 50vw"}
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/25 to-ink/5" />
                </>
              )}
              <span className="flex items-start justify-between gap-2">
                {Icon ? (
                  <span className="grid size-10 place-items-center rounded-2xl bg-mist text-brand-600">
                    <Icon className="size-5" />
                  </span>
                ) : (
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold whitespace-nowrap text-ink tabular-nums">
                    {g.links.length} {g.links.length === 1 ? "page" : "pages"}
                  </span>
                )}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45",
                    g.tile
                      ? "bg-white/25 text-white group-hover:bg-white group-hover:text-ink"
                      : "bg-pearl text-brand-600 group-hover:bg-brand-500 group-hover:text-white",
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
              <span className="min-w-0">
                {Icon && (
                  <span className="block text-sm font-semibold text-muted tabular-nums">
                    {g.links.length} {g.links.length === 1 ? "page" : "pages"}
                  </span>
                )}
                <span
                  className={cn(
                    "block leading-tight font-bold tracking-tight",
                    lead ? "text-2xl sm:text-3xl" : "text-base sm:text-lg xl:text-[0.9375rem] 2xl:text-lg",
                  )}
                >
                  {g.title}
                </span>
                {lead && <span className="mt-2 hidden text-sm leading-relaxed text-white/80 sm:block">{g.blurb}</span>}
              </span>
            </a>
          </li>
        );
      })}
      <li className="min-w-0 sm:col-span-2">
        <a
          href={phone.href}
          className="group relative isolate flex size-full flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-800 p-4 text-white transition-shadow duration-500 hover:shadow-glow sm:p-5"
        >
          <ToothWatermark size={180} className="absolute -right-8 -bottom-16 -z-10 text-white/10" />
          <span className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-brand-100">Can&apos;t find it?</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:scale-110">
              <Phone className="size-4" />
            </span>
          </span>
          <span className="text-base leading-tight font-bold tracking-tight sm:text-xl">
            Call <span className="whitespace-nowrap">{phone.display}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}

/* --------------------------------------------------------------------------
   Chapters: one card per section, photo panel beside the links
   (same card language as the home page Services panel).
-------------------------------------------------------------------------- */
function LinkRows({ links, start = 0 }: { links: SitemapLink[]; start?: number }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      {links.map((l, i) => (
        <li key={l.href + l.text}>
          <Link
            href={l.href}
            className="group flex min-h-13 items-center gap-3.5 border-b border-line py-2.5 text-ink transition-colors hover:text-brand-600"
          >
            <span className="w-6 shrink-0 text-xs font-bold text-brand-500/70 tabular-nums">
              {String(start + i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 font-medium transition-transform duration-500 ease-out group-hover:translate-x-1.5">
              {l.text}
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

function AreasLinks({ links }: { links: SitemapLink[] }) {
  const towns = links.filter((l) => l.text.startsWith("Dentist in "));
  const treatments = links.filter((l) => !l.text.startsWith("Dentist in "));
  return (
    <div>
      <h4 className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">Towns ({towns.length})</h4>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {towns.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex min-h-12 items-center gap-2.5 rounded-2xl bg-pearl px-3.5 py-2 text-ink ring-1 ring-line transition-colors duration-300 hover:bg-brand-500 hover:text-white hover:ring-brand-500"
            >
              <MapPin className="size-4 shrink-0 text-brand-500 transition-colors group-hover:text-white" />
              <span className="min-w-0 flex-1 font-medium">{l.text.replace("Dentist in ", "")}</span>
            </Link>
          </li>
        ))}
      </ul>
      <h4 className="mt-8 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
        Treatments by town ({treatments.length})
      </h4>
      <div className="mt-2">
        <LinkRows links={treatments} />
      </div>
    </div>
  );
}

function Chapter({ groups, index }: { groups: SitemapGroup[]; index: number }) {
  const lead = groups[0];
  const id = lead.chapter;
  const isAreas = lead.title === "Areas We Serve";
  const single = groups.length === 1;
  const hub = single ? lead.links.find((l) => l.text === lead.title) : undefined;
  const total = groups.reduce((n, g) => n + g.links.length, 0);
  const title = groups.map((g) => g.title).join(" & ");

  return (
    <Reveal>
      <article
        id={id}
        aria-labelledby={`${id}-title`}
        className="grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-4xl border border-line bg-white p-3 shadow-soft md:grid-cols-[minmax(0,19rem)_1fr] xl:grid-cols-[minmax(0,22rem)_1fr]"
      >
        {/* Photo panel: stretches to the height of the links, so no empty space */}
        <div className="group relative isolate flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.6rem] p-6 text-white sm:p-7">
          <Image
            src={lead.image.src}
            alt={lead.image.alt}
            fill
            sizes="(min-width:1280px) 22rem, (min-width:768px) 19rem, 100vw"
            className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/40 to-ink/10" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-5xl leading-none font-bold tracking-tighter text-white/90 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink tabular-nums">
              {total} pages
            </span>
          </div>
          <div className="mt-16">
            <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight text-balance text-white">
              {title}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/80">{lead.blurb}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col p-4 pt-6 sm:p-6 md:p-8">
          {groups.map((g, gi) => {
            const links = hub ? g.links.filter((l) => l !== hub) : g.links;
            return (
              <Fragment key={g.title}>
                {!single && (
                  <h3 className={cn("flex items-center gap-2.5 text-xl font-bold tracking-tight", gi > 0 && "mt-8")}>
                    {g.title}
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-bold text-brand-700 tabular-nums">
                      {g.links.length}
                    </span>
                  </h3>
                )}
                <div className={cn(!single && "mt-1")}>
                  {isAreas ? <AreasLinks links={links} /> : <LinkRows links={links} />}
                </div>
              </Fragment>
            );
          })}
          {hub && (
            <div className="mt-auto pt-7">
              <Button href={hub.href} variant="dark">
                Open {hub.text}
              </Button>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
   The page
-------------------------------------------------------------------------- */
export function SitemapExperience({
  intro,
  groups,
  tasks,
  phone,
}: {
  intro: string;
  groups: SitemapGroup[];
  tasks: SitemapTask[];
  phone: { display: string; href: string };
}) {
  const index = useMemo<Hit[]>(() => groups.flatMap((g) => g.links.map((l) => ({ ...l, group: g.title }))), [groups]);
  const total = index.length;
  const towns = index.filter((h) => h.text.startsWith("Dentist in ")).length;
  const chapters = useMemo(() => {
    const ids = [...new Set(groups.map((g) => g.chapter))];
    return ids.map((cid) => groups.filter((g) => g.chapter === cid));
  }, [groups]);

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="sitemap-title"
        className="relative isolate overflow-hidden bg-pearl pt-30 pb-12 lg:pt-36 lg:pb-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 -right-40 size-160 rounded-full glow-blob text-glow/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_158_203/0.12)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_20%_30%,#000_10%,transparent_60%)] bg-size-[28px_28px]" />
          <ToothWatermark size={520} className="absolute -bottom-56 -left-40 text-brand-500/5" />
        </div>

        <div className="container-site">
          <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:gap-16">
            <div className="relative z-10 max-w-2xl min-w-0">
              <Eyebrow>Sitemap</Eyebrow>
              <SplitReveal as="h1" id="sitemap-title" immediate className="mt-6 text-display-lg font-bold text-balance">
                Every page, <span className="text-brand-500">mapped out</span>
              </SplitReveal>
              <Reveal delay={0.2} y={24}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">{intro}</p>
                <div className="mt-9">
                  <PageSearch index={index} phone={phone} />
                </div>
                <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-6">
                  {[
                    [total, "Pages"],
                    [groups.length, "Sections"],
                    [towns, "Towns"],
                  ].map(([v, k]) => (
                    <div key={k} className="flex flex-col px-4 first:pl-0">
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="order-first text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="min-w-0">
              <SectionBento groups={groups} phone={phone} />
            </div>
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <section aria-labelledby="shortcuts-title" className="bg-white section-y">
        <div className="container-site">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2">
            <div>
              <Eyebrow>Shortcuts</Eyebrow>
              <SplitReveal as="h2" id="shortcuts-title" className="mt-6 text-display-md font-bold text-balance">
                Most visits start <span className="text-brand-500">right here</span>
              </SplitReveal>
            </div>
            <Reveal className="lg:justify-self-end">
              <p className="max-w-md text-lg leading-relaxed">
                The four pages patients open most, one tap away. Everything else is listed section by section below.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tasks.map((t, i) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group relative isolate flex aspect-4/3 flex-col justify-end overflow-hidden rounded-4xl p-6 text-white sm:aspect-4/5 sm:p-7"
                  >
                    <Image
                      src={t.image.src}
                      alt={t.image.alt}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/30 to-transparent" />
                    <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/90 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                    <span className="text-sm font-bold text-glow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-2 text-2xl font-bold tracking-tight">{t.title}</span>
                    <span className="mt-2 text-base leading-relaxed text-white/80">{t.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Every section */}
      <section aria-labelledby="all-pages-title" className="bg-pearl section-y">
        <div className="container-site">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2">
            <div>
              <Eyebrow>All pages</Eyebrow>
              <SplitReveal as="h2" id="all-pages-title" className="mt-6 text-display-md font-bold text-balance">
                {total} pages in <span className="text-brand-500">{groups.length} sections</span>
              </SplitReveal>
            </div>
            <Reveal className="lg:justify-self-end">
              <p className="max-w-md text-lg leading-relaxed">
                Laid out the same way as the menu, so you can scan a whole section at a glance.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {chapters.map((c, i) => (
              <Chapter key={c[0].chapter} groups={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
