import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import type { DraftSection as Section } from "@/content/pages/types";
import type { TopicImage } from "@/content/topic-images";
import { ImageReveal } from "@/components/motion/image-reveal";
import { HoursTable, OpenStatus } from "@/components/page/open-status";
import { AppointmentForm } from "@/components/page/appointment-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { doctors } from "@/content/site";
import { cn } from "@/lib/utils";
import { hrefFor, toBlocks, type Block } from "./blocks";
import { PlanFinder } from "./plan-finder";

export type Tone = "white" | "pearl" | "dark" | "brand";

const RICH = new Set(["features", "list", "hours", "names", "facts", "compare", "form"]);

function Blocks({
  blocks,
  dark,
  timeline = false,
  listCols = 2,
  leadParagraph = false,
}: {
  blocks: Block[];
  dark: boolean;
  timeline?: boolean;
  /** checklists in one column when they sit beside a photo */
  listCols?: 1 | 2;
  /** first paragraph set larger, as a lead-in */
  leadParagraph?: boolean;
}) {
  const leadAt = leadParagraph ? blocks.findIndex((b) => b.kind === "p") : -1;
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        const next = blocks[i + 1];
        const prev = blocks[i - 1];
        const noteBar = (p?: Block, l?: Block) => p?.kind === "p" && l?.kind === "links" && p.text.length < 280;
        if (b.kind === "links" && noteBar(prev, b)) return null;
        if (b.kind === "p" && next?.kind === "links" && noteBar(b, next))
          return (
            <div
              key={i}
              className={cn(
                "flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-3xl p-5 ring-1 sm:p-6",
                dark ? "bg-white/6 ring-white/10" : "bg-mist/70 ring-brand-100",
              )}
            >
              <p
                className={cn(
                  "max-w-2xl min-w-[min(100%,18rem)] flex-1 basis-80 text-[1.0625rem] leading-relaxed font-medium text-pretty",
                  dark ? "text-white/85" : "text-ink",
                )}
              >
                {b.text}
              </p>
              <div className="flex max-w-full flex-wrap gap-2">
                {next.links.map((l) => (
                  <Link
                    key={l.href + l.text}
                    href={l.href}
                    className={cn(
                      "group inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                      dark ? "bg-white text-ink hover:bg-glow" : "bg-ink text-white hover:bg-brand-600",
                    )}
                  >
                    {l.text}
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45" />
                  </Link>
                ))}
              </div>
            </div>
          );
        switch (b.kind) {
          case "p":
            return (
              <p
                key={i}
                className={cn(
                  "max-w-3xl leading-relaxed text-pretty",
                  i === leadAt
                    ? cn("text-xl font-medium", dark ? "text-white" : "text-ink")
                    : cn("text-[1.0625rem]", dark ? "text-white/75" : "text-body"),
                )}
              >
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className={cn("pt-2 text-xl font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
                {b.text}
              </h3>
            );
          case "features":
            if (timeline)
              return (
                <ol
                  key={i}
                  className="relative ml-4 max-w-4xl space-y-4 border-l-2 border-dashed border-brand-500/35 sm:ml-5"
                >
                  {b.rows.map((r, j) => (
                    <li key={`${j}-${r.label}`} className="relative pl-9 sm:pl-12">
                      <span
                        className={cn(
                          "absolute top-4 -left-[19px] grid size-9 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white tabular-nums ring-4 sm:-left-[21px] sm:size-10",
                          dark ? "ring-ink/80" : "ring-white",
                        )}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <Reveal y={16}>
                        <div
                          className={cn(
                            "rounded-3xl p-5 ring-1 sm:p-6",
                            dark ? "bg-white/6 ring-white/10" : "bg-white shadow-soft ring-line",
                          )}
                        >
                          <p className={cn("text-lg font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
                            {r.label}
                          </p>
                          <p
                            className={cn(
                              "mt-1.5 text-[0.9375rem] leading-relaxed",
                              dark ? "text-white/70" : "text-body",
                            )}
                          >
                            {r.text}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              );
            return (
              <RevealGroup
                key={i}
                className={cn(
                  "grid grid-cols-1 gap-4 sm:grid-cols-2",
                  b.rows.length % 3 === 0 && b.rows.length > 3
                    ? "xl:grid-cols-3"
                    : b.rows.length === 3 && "lg:grid-cols-3",
                )}
                stagger={0.06}
              >
                {b.rows.map((r, j) => (
                  <RevealItem key={`${j}-${r.label}`} className="h-full">
                    <div
                      className={cn(
                        "h-full rounded-3xl p-6 ring-1",
                        dark ? "bg-white/5 ring-white/10" : "bg-white ring-line",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-full text-xs font-bold tabular-nums",
                          dark ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700",
                        )}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <p className={cn("mt-4 text-lg font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
                        {r.label}
                      </p>
                      <p
                        className={cn("mt-1.5 text-[0.9375rem] leading-relaxed", dark ? "text-white/70" : "text-body")}
                      >
                        {r.text}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            );
          case "list": {
            const docs = b.items.map((t) => doctors.find((d) => t.text.startsWith(d.name)));
            if (docs.every(Boolean)) return <DoctorCards key={i} items={b.items} dark={dark} />;
            const count = b.items.length;
            const odd = listCols === 2 && count % 2 === 1 && count > 1 && count !== 3;
            return (
              <ul
                key={i}
                className={cn(
                  "grid grid-cols-1 gap-3",
                  listCols === 2 &&
                    (count === 3
                      ? "md:grid-cols-3"
                      : count % 3 === 0 && count > 3
                        ? "sm:grid-cols-2 xl:grid-cols-3"
                        : "sm:grid-cols-2"),
                )}
              >
                {b.items.map((t, ti) => {
                  const body = (
                    <>
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-glow">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="min-w-0 flex-1 self-center text-base leading-snug font-semibold">{t.text}</span>
                      {t.href && (
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                      )}
                    </>
                  );
                  const cls = cn(
                    "flex h-full items-start gap-4 rounded-3xl p-4 ring-1 sm:p-5",
                    dark ? "bg-white/5 text-white ring-white/10" : "bg-white text-ink shadow-soft ring-line",
                  );
                  return (
                    <li key={t.text} className={cn(odd && ti === count - 1 && "sm:col-span-2")}>
                      {t.href ? (
                        <Link
                          href={t.href}
                          className={cn(
                            cls,
                            "group transition-colors",
                            dark ? "hover:bg-white/10" : "hover:ring-brand-400",
                          )}
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className={cls}>{body}</div>
                      )}{" "}
                    </li>
                  );
                })}{" "}
              </ul>
            );
          }
          case "links":
            return (
              <div key={i} className="flex flex-wrap gap-2">
                {b.links.map((l) => (
                  <Link
                    key={l.href + l.text}
                    href={l.href}
                    className={cn(
                      "group inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition-colors",
                      dark
                        ? "bg-white/8 text-white ring-white/15 hover:bg-white hover:text-ink"
                        : "bg-white text-ink ring-line hover:bg-brand-500 hover:text-white hover:ring-brand-500",
                    )}
                  >
                    {l.text}
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45" />
                  </Link>
                ))}
              </div>
            );
          case "hours":
            return (
              <div key={i} className="max-w-xl rounded-4xl bg-white p-5 shadow-soft ring-1 ring-line sm:p-6">
                <div className="flex items-center justify-between gap-4 px-1 pb-4">
                  <p className="text-lg font-bold tracking-tight text-ink">Opening hours</p>
                  <OpenStatus className="text-right" />
                </div>
                <div className="overflow-hidden rounded-3xl ring-1 ring-line">
                  <HoursTable />
                </div>
              </div>
            );
          case "names":
            return <PlanFinder key={i} names={b.names} />;
          case "facts":
            return (
              <dl key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {b.rows.map(([k, v]) => (
                  <div key={k} className="flex flex-col rounded-3xl bg-white p-5 ring-1 ring-line">
                    <dt className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">{k}</dt>
                    <dd className="mt-2 text-lg leading-snug font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            );
          case "compare":
            return <Compare key={i} head={b.head} rows={b.rows} />;
          case "form":
            return (
              <div key={i} className="rounded-4xl bg-white p-6 shadow-soft ring-1 ring-line sm:rounded-5xl sm:p-10">
                <AppointmentForm />
              </div>
            );
        }
      })}
    </div>
  );
}

/** A table on desktop, labelled cards on phones. Cells that name a page become links. */
function Compare({ head, rows }: { head: string[]; rows: string[][] }) {
  const cell = (c: string, col: number) => {
    const href = col > 0 ? hrefFor(c) : undefined;
    return href ? (
      <Link
        href={href}
        className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 max-md:min-h-11"
      >
        {c} <ArrowUpRight className="size-3.5" />
      </Link>
    ) : (
      c
    );
  };
  return (
    <>
      <div className="hidden overflow-hidden rounded-4xl ring-1 ring-line md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-ink text-white">
              {head.map((h) => (
                <th key={h} scope="col" className="p-5 text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-line bg-white align-top">
                {r.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="bg-pearl p-5 font-semibold text-ink">
                      {c}
                    </th>
                  ) : (
                    <td key={j} className="p-5 text-body">
                      {cell(c, j)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:hidden">
        {rows.map((r) => (
          <li key={r[0]} className="rounded-3xl bg-white p-5 ring-1 ring-line">
            <p className="font-semibold text-ink">{r[0]}</p>
            <dl className="mt-3 space-y-2">
              {r.slice(1).map((c, j) => (
                <div key={j}>
                  <dt className="text-xs font-bold tracking-[0.12em] text-brand-600 uppercase">{head[j + 1]}</dt>
                  <dd className="mt-0.5 text-[0.9375rem] text-body">{cell(c, j + 1)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

/** A list that names the dentists becomes portrait cards, keeping the draft wording as each focus line. */
function DoctorCards({ items, dark }: { items: { text: string; href?: string }[]; dark: boolean }) {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
      {items.map((t) => {
        const d = doctors.find((x) => t.text.startsWith(x.name))!;
        const focus = t.text
          .slice(d.name.length)
          .replace(/^[,.]?\s*(DMD|DDS)?[,.]?\s*(for\s+)?/, "")
          .trim();
        return (
          <RevealItem key={t.text} className="h-full">
            <Link
              href={d.href}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-4xl p-2.5 ring-1 transition-shadow duration-500 hover:shadow-lift",
                dark ? "bg-white/5 ring-white/10" : "bg-white ring-line",
              )}
            >
              <span className="relative block aspect-4/3 overflow-hidden rounded-3xl">
                <Image
                  src={d.image}
                  alt={`${d.name}, ${d.credential}`}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ objectPosition: d.position }}
                />
                <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
              <span className="flex flex-1 flex-col p-4 sm:p-5">
                <span className={cn("text-lg font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
                  {d.name}, {d.credential}
                </span>
                {focus && (
                  <span className={cn("mt-1.5 text-[0.9375rem] leading-relaxed", dark ? "text-white/70" : "text-body")}>
                    {focus.charAt(0).toUpperCase() + focus.slice(1)}
                  </span>
                )}
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

/** Two or more paragraphs in a row that each open with a dentist's name become one list (shown as portrait cards). */
function groupDoctorLines(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const run: string[] = [];
    while (
      i < blocks.length &&
      blocks[i].kind === "p" &&
      doctors.some((d) => (blocks[i] as { text: string }).text.startsWith(d.name))
    ) {
      run.push((blocks[i] as { text: string }).text);
      i++;
    }
    if (run.length >= 2) out.push({ kind: "list", items: run.map((text) => ({ text })) });
    else if (run.length === 1) out.push({ kind: "p", text: run[0] });
    if (i < blocks.length) out.push(blocks[i]);
  }
  return out;
}

/** How many steps a timeline would show (everything after the intro paragraphs). */
function timelineSteps(blocks: Block[]) {
  let first = blocks.findIndex((b) => RICH.has(b.kind));
  if (first < 0) first = 1;
  let lead = 0;
  while (lead < first && blocks[lead]?.kind === "p") lead++;
  return blocks
    .slice(lead)
    .reduce(
      (n, b) =>
        n + (b.kind === "features" ? b.rows.length : b.kind === "list" ? b.items.length : b.kind === "p" ? 1 : 0),
      0,
    );
}

/** Rough amount of copy in a run of blocks, used to pick a layout that never leaves empty space. */
function textLength(blocks: Block[]) {
  return blocks.reduce((n, b) => {
    switch (b.kind) {
      case "p":
      case "h3":
        return n + b.text.length;
      case "features":
        return n + b.rows.reduce((m, r) => m + r.label.length + r.text.length, 0);
      case "list":
        return n + b.items.reduce((m, t) => m + t.text.length, 0);
      case "links":
        return n + 80;
      default:
        return n + 400;
    }
  }, 0);
}

/**
 * Feature cards with the section photo as one tile of the grid.
 * The photo spans k rows so the cards always fill whole rows (no empty cells).
 */
function FeatureBento({
  rows,
  image,
  flip,
  dark,
}: {
  rows: { label: string; text: string }[];
  image: TopicImage;
  flip: boolean;
  dark: boolean;
}) {
  const r = rows.length;
  const four = r === 3;
  const k = four ? 1 : ([3, 2, 1].find((x) => r - 2 * x >= 0 && (r - 2 * x) % 3 === 0) ?? 1);
  const span = { 1: "lg:row-span-1", 2: "lg:row-span-2", 3: "lg:row-span-3" }[k];
  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-flow-dense",
        four ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
      stagger={0.06}
    >
      <RevealItem
        className={cn(
          "relative min-h-56 overflow-hidden rounded-4xl sm:col-span-2 sm:min-h-72 lg:col-span-1 lg:row-start-1 lg:min-h-0",
          span,
          flip && (four ? "lg:col-start-4" : "lg:col-start-3"),
          dark && "ring-1 ring-white/10",
        )}
      >
        <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-ink/30 to-transparent" />
      </RevealItem>
      {rows.map((row, j) => (
        <RevealItem key={`${j}-${row.label}`} className="h-full">
          <div
            className={cn(
              "flex h-full flex-col rounded-4xl p-6 ring-1 sm:p-7",
              j === 0
                ? "bg-linear-to-br from-brand-500 to-brand-700 text-white ring-transparent"
                : dark
                  ? "bg-white/5 ring-white/10"
                  : "bg-white ring-line",
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full text-xs font-bold tabular-nums",
                j === 0 ? "bg-white text-brand-600" : dark ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700",
              )}
            >
              {String(j + 1).padStart(2, "0")}
            </span>
            {row.label && (
              <p
                className={cn("mt-5 text-lg font-semibold tracking-tight", j === 0 || dark ? "text-white" : "text-ink")}
              >
                {row.label}
              </p>
            )}
            <p
              className={cn(
                "mt-1.5 text-[0.9375rem] leading-relaxed",
                j === 0 ? "text-white/85" : dark ? "text-white/70" : "text-body",
              )}
            >
              {row.text}
            </p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/**
 * One draft section, laid out by what it holds. Every layout sizes the photo to the copy,
 * so a short section never sits beside a tall empty photo:
 * - steps (visit by visit): sticky heading + photo left, timeline right
 * - cards + photo: the photo is a tile inside the card grid (bento)
 * - checklist + photo: photo stretched to a one-column list
 * - other rich content + photo: cinematic photo carrying the heading, content below
 * - prose + photo: floating card on a cinematic photo (short copy, alternate sections)
 *   or a split with the photo stretched to the copy
 * - short prose, no photo: centred statement
 * - opening hours: copy left, live hours card right
 */
export function DraftSectionView({
  section,
  index,
  tone,
  image,
  n,
}: {
  section: Section;
  index: number;
  tone: Tone;
  image?: TopicImage;
  /** displayed position (sections moved into the hero are not counted) */
  n?: number;
}) {
  const blocks = groupDoctorLines(toBlocks(section.items));
  const dark = tone === "dark" || tone === "brand";
  const pos = n ?? index;
  /* A step heading only becomes a timeline when there are at least 3 steps to show;
     two short paragraphs beside a sticky photo would leave the column half empty. */
  const timeline =
    !!section.heading &&
    /visit by visit|how many visits|process|timeline|what happens|appointments you will need/i.test(section.heading) &&
    timelineSteps(blocks) >= 3;
  const hasHours = blocks.some((b) => b.kind === "hours");
  const rich = !hasHours && (blocks.some((b) => RICH.has(b.kind)) || timeline);
  const id = `s-${index + 1}`;
  const flip = pos % 2 === 1;
  const bg =
    tone === "brand"
      ? "relative isolate overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 text-white"
      : tone === "dark"
        ? "relative isolate overflow-hidden bg-ink text-white"
        : tone === "pearl"
          ? "bg-pearl"
          : "bg-white";

  const number = (
    <span
      aria-hidden="true"
      className={cn(
        "block text-6xl leading-none font-bold tracking-tighter tabular-nums sm:text-7xl",
        dark ? "text-white/12" : "text-brand-500/15",
      )}
    >
      {String(pos + 1).padStart(2, "0")}
    </span>
  );
  const smallNumber = (
    <span
      aria-hidden="true"
      className={cn(
        "block text-5xl leading-none font-bold tracking-tighter tabular-nums",
        dark ? "text-white/15" : "text-brand-500/20",
      )}
    >
      {String(pos + 1).padStart(2, "0")}
    </span>
  );
  const heading = section.heading ? (
    <h2
      id={`${id}-h`}
      className={cn(
        "mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance",
        dark ? "text-white" : "text-ink",
      )}
    >
      {section.heading}
    </h2>
  ) : null;

  /* Photo that fills the height of whatever sits beside it (phones keep a 4:3 frame). */
  const stretchMedia = image ? (
    <ImageReveal
      direction={flip ? "right" : "left"}
      className={cn(
        "aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl lg:aspect-auto lg:h-full lg:min-h-72",
        dark && "ring-1 ring-white/10",
      )}
    >
      <Image
        data-reveal-media
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover"
      />
    </ImageReveal>
  ) : null;

  /* Cinematic photo with the content on a floating card (card sits on the photo from xl up). */
  const overlay = (content: ReactNode) =>
    image ? (
      <div className="relative xl:grid xl:grid-cols-1">
        <ImageReveal
          direction={flip ? "right" : "left"}
          className={cn(
            "aspect-4/3 rounded-4xl shadow-lift sm:aspect-16/9 sm:rounded-5xl xl:col-start-1 xl:row-start-1 xl:aspect-21/9 xl:w-full xl:self-stretch",
            dark && "ring-1 ring-white/10",
          )}
        >
          <Image data-reveal-media src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        </ImageReveal>
        <Reveal
          y={30}
          className={cn(
            "relative z-10 -mt-16 px-3 sm:-mt-28 sm:px-8 xl:col-start-1 xl:row-start-1 xl:m-10 xl:w-[min(38rem,46%)] xl:self-end xl:px-0",
            flip ? "xl:justify-self-start" : "xl:justify-self-end",
          )}
        >
          <div
            className={cn(
              "rounded-4xl p-6 shadow-lift ring-1 sm:p-9",
              dark ? "bg-ink/90 ring-white/10" : "bg-white/95 ring-line",
            )}
          >
            {content}
          </div>
        </Reveal>
      </div>
    ) : null;

  // leading paragraphs become the intro beside the heading in rich sections
  let firstRich = blocks.findIndex((b) => RICH.has(b.kind));
  if (timeline && firstRich < 0) firstRich = 1; // keep the opening paragraph as the intro
  let lead = 0;
  while (rich && lead < firstRich && blocks[lead].kind === "p") lead++;
  const intro = blocks.slice(0, lead);
  let rest = blocks.slice(lead);

  // Visit-by-visit sections: every step (labelled or not) joins one timeline; a closing remark stays a paragraph.
  if (timeline) {
    const steps: { label: string; text: string }[] = [];
    const others: Block[] = [];
    for (const b of rest) {
      if (b.kind === "features") steps.push(...b.rows);
      else if (b.kind === "p") steps.push({ label: "", text: b.text });
      else if (b.kind === "list") steps.push(...b.items.map((it) => ({ label: "", text: it.text })));
      else others.push(b);
    }
    const closing = steps.length > 3 && !steps[steps.length - 1].label ? steps.pop() : undefined;
    if (steps.length >= 3) {
      rest = [
        { kind: "features", rows: steps },
        ...(closing ? [{ kind: "p" as const, text: closing.text }] : []),
        ...others,
      ];
    }
  }

  const introText = intro.map((b, i) => (
    <p key={i} className={cn("mt-5 text-lg leading-relaxed text-pretty", dark ? "text-white/75" : "text-body")}>
      {b.kind === "p" ? b.text : null}
    </p>
  ));

  /* compact heading row used above full-width content */
  const headerRow = (heading || intro.length > 0) && (
    <Reveal y={24}>
      <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <div>
          {number}
          {heading}
        </div>
        {intro.length > 0 && <div>{introText}</div>}
      </div>
    </Reveal>
  );

  const first = rest[0];
  const introLen = textLength(intro);

  let body;
  if (hasHours) {
    body = (
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal y={24}>
          {number}
          {heading}
          <div className="mt-6">
            <Blocks blocks={blocks.filter((b) => b.kind !== "hours")} dark={dark} />
          </div>
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <Blocks blocks={[{ kind: "hours" }]} dark={dark} />
        </Reveal>
      </div>
    );
  } else if (rich && image && timeline) {
    /* steps: sticky heading + photo on the left, the timeline scrolls on the right */
    body = (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={24}>
              {number}
              {heading}
              {introText}
            </Reveal>
            <ImageReveal
              direction="up"
              className={cn("mt-8 aspect-4/3 rounded-4xl shadow-lift", dark && "ring-1 ring-white/10")}
            >
              <Image
                data-reveal-media
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width:1024px) 38vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <Blocks blocks={rest} dark={dark} timeline />
        </div>
      </div>
    );
  } else if (rich && image && first?.kind === "features" && first.rows.length >= 2) {
    /* cards: the photo becomes a tile inside the card grid */
    body = (
      <>
        {headerRow}
        <FeatureBento rows={first.rows} image={image} flip={flip} dark={dark} />
        {rest.length > 1 && (
          <div className="mt-10">
            <Blocks blocks={rest.slice(1)} dark={dark} />
          </div>
        )}
      </>
    );
  } else if (rich && image && first?.kind === "list" && first.items.length >= 4) {
    /* checklist: photo stretched to the height of a single-column list */
    body = (
      <>
        {headerRow}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>{stretchMedia}</div>
          <Reveal y={24} delay={0.08} className="min-w-0 lg:col-span-7">
            <Blocks blocks={[first]} dark={dark} listCols={1} />
          </Reveal>
        </div>
        {rest.length > 1 && (
          <div className="mt-10">
            <Blocks blocks={rest.slice(1)} dark={dark} />
          </div>
        )}
      </>
    );
  } else if (rich && image) {
    /* other rich content: a cinematic photo carries the heading, content runs full width below */
    body = (
      <>
        {introLen < 420 ? (
          <div className="mb-12">
            {overlay(
              <>
                {smallNumber}
                {heading}
                {introText}
              </>,
            )}
          </div>
        ) : (
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-14">
            <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>{stretchMedia}</div>
            <Reveal y={24} className="min-w-0 self-center lg:col-span-7">
              {number}
              {heading}
              {introText}
            </Reveal>
          </div>
        )}
        <Blocks blocks={rest} dark={dark} />
      </>
    );
  } else if (image) {
    /* prose: short copy floats on a cinematic photo (alternate sections), otherwise it sits beside a photo of the same height */
    body =
      textLength(rest) < 520 && pos % 2 === 0 ? (
        overlay(
          <>
            {smallNumber}
            {heading}
            <div className="mt-5">
              <Blocks blocks={rest} dark={dark} />
            </div>
          </>,
        )
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>{stretchMedia}</div>
          <Reveal y={24} className="min-w-0 self-center lg:col-span-7">
            {number}
            {heading}
            <div className="mt-6">
              <Blocks blocks={rest} dark={dark} leadParagraph />
            </div>
          </Reveal>
        </div>
      );
  } else if (!rich && textLength(rest) < 380) {
    /* a short thought: centred statement instead of a half-empty two-column row */
    body = (
      <Reveal y={24} className="mx-auto max-w-3xl text-center">
        <span className="mx-auto block w-fit">{number}</span>
        {heading}
        <div className={cn("mt-6 space-y-4 text-xl leading-relaxed text-pretty", dark ? "text-white/80" : "text-body")}>
          {rest.map((b, i) => (b.kind === "p" ? <p key={i}>{b.text}</p> : <Blocks key={i} blocks={[b]} dark={dark} />))}
        </div>
      </Reveal>
    );
  } else if (rich) {
    body = (
      <>
        {headerRow}
        <Blocks blocks={rest} dark={dark} timeline={timeline} />
      </>
    );
  } else {
    body = (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal y={24}>
          <div className="lg:sticky lg:top-32">
            {number}
            {heading}
          </div>
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <Blocks blocks={rest} dark={dark} leadParagraph />
        </Reveal>
      </div>
    );
  }

  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-y", bg)}
      aria-labelledby={section.heading ? `${id}-h` : undefined}
    >
      {dark && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={cn(
              "absolute -top-40 -right-32 size-160 rounded-full glow-blob",
              tone === "brand" ? "text-glow/25" : "text-brand-500/25",
            )}
          />
        </div>
      )}
      <div className="container-site">{body}</div>
    </section>
  );
}
