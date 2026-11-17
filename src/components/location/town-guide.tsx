import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Town, TownItem } from "@/content/towns";
import { topicImages, type TopicImage, type TopicKey } from "@/content/topic-images";
import { townImages } from "@/content/town-images";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* "Family care. Check-ups..." / "By car: Take..." -> a labelled feature row. */
const FEATURE = /^([A-Z][^.:]{2,44}?)([.:])\s+(.+)$/;
const isFeature = (t: string) => {
  const m = t.match(FEATURE);
  return !!m && m[1].split(" ").length <= 6 && !/^(Dr|Mr|Mrs|Ms|St|N|S)$/.test(m[1]);
};

type Block =
  | { kind: "p"; text: string }
  | { kind: "features"; rows: { label: string; text: string }[] }
  | { kind: "links"; links: { text: string; href: string }[] };

function toBlocks(items: TownItem[]): Block[] {
  const out: Block[] = [];
  for (const it of items) {
    const last = out[out.length - 1];
    if (it.type === "link") {
      if (last?.kind === "links") last.links.push({ text: it.text, href: it.href });
      else out.push({ kind: "links", links: [{ text: it.text, href: it.href }] });
      continue;
    }
    if (isFeature(it.text)) {
      const m = it.text.match(FEATURE)!;
      const row = { label: m[1], text: m[3] };
      if (last?.kind === "features") last.rows.push(row);
      else out.push({ kind: "features", rows: [row] });
      continue;
    }
    out.push({ kind: "p", text: it.text });
  }
  return out.map((b) =>
    b.kind === "features" && b.rows.length === 1 ? { kind: "p", text: `${b.rows[0].label}. ${b.rows[0].text}` } : b,
  );
}

/* Chapter heading -> the photo that explains it (first unused candidate wins, so a page never repeats one). */
const rules: [RegExp, TopicKey[]][] = [
  [/getting here|on your road/i, ["driving"]],
  [/college/i, ["writingDocuments", "readingDocuments"]],
  [/implant/i, ["implant"]],
  [/denture/i, ["dentures"]],
  [/new patients/i, ["consultDesk", "formReview"]],
  [/insurance|pay/i, ["cardPayment", "piggyBank"]],
  [/booking|choosing/i, ["phoneCall", "consultDesk"]],
  [/dental care for/i, ["consultXray", "familyBrushing"]],
  [/treatment|come in for|come to us for|travel in|patients come/i, ["treatmentChair", "treatmentPatient"]],
  [/borough|township|areas we cover|serving|village|parkside|rutledge|green ridge/i, ["houseAutumn", "neighborhood"]],
];
const fallback: TopicKey[] = ["patientRelaxed", "treatmentCloseup", "familyBrushing", "consultXray"];

function pickImages(headings: string[]): TopicImage[] {
  const used = new Set<TopicKey>();
  return headings.map((h) => {
    const candidates = [...(rules.find(([re]) => re.test(h))?.[1] ?? []), ...fallback];
    const key = candidates.find((k) => !used.has(k)) ?? fallback[0];
    used.add(key);
    return topicImages[key];
  });
}

const anchor = (i: number) => `town-ch-${i + 1}`;

/** The town draft's sections as illustrated chapters: photo and copy side by side, alternating. */
const textLength = (blocks: Block[]) =>
  blocks.reduce(
    (n, b) =>
      n +
      (b.kind === "p"
        ? b.text.length
        : b.kind === "features"
          ? b.rows.reduce((m, r) => m + r.label.length + r.text.length + 60, 0)
          : 80),
    0,
  );

function ChapterCopy({ blocks, dark }: { blocks: Block[]; dark?: boolean }) {
  return (
    <div className="mt-5 space-y-4">
      {blocks.map((b, j) => {
        if (b.kind === "p")
          return (
            <p
              key={j}
              className={cn(
                "leading-relaxed text-pretty",
                j === 0
                  ? cn("text-lg font-medium", dark ? "text-white" : "text-ink")
                  : cn("text-[1.0625rem]", dark ? "text-white/75" : "text-body"),
              )}
            >
              {b.text}
            </p>
          );
        if (b.kind === "features")
          return (
            <ul key={j} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {b.rows.map((r, k) => (
                <li
                  key={r.label}
                  className={cn(
                    "rounded-3xl p-5 ring-1",
                    b.rows.length % 2 === 1 && k === b.rows.length - 1 && "sm:col-span-2",
                    dark ? "bg-white/6 ring-white/10" : "bg-pearl ring-line",
                  )}
                >
                  <p className={cn("font-semibold", dark ? "text-white" : "text-ink")}>{r.label}</p>
                  <p className={cn("mt-1.5 text-[0.9375rem] leading-relaxed", dark ? "text-white/70" : "text-body")}>
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          );
        return (
          <div key={j} className="flex flex-wrap gap-2 pt-1">
            {b.links.map((l) => (
              <Link
                key={l.href + l.text}
                href={l.href}
                className={cn(
                  "group inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                  dark
                    ? "bg-white text-ink hover:bg-glow"
                    : "bg-white text-ink ring-1 ring-line hover:bg-brand-500 hover:text-white hover:ring-brand-500",
                )}
              >
                {l.text}
                <ArrowUpRight
                  className={cn(
                    "size-3.5 transition-transform duration-500 group-hover:rotate-45",
                    !dark && "text-brand-500 group-hover:text-white",
                  )}
                />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/**
 * One chapter of the town guide. Three designs rotate down the page, and each one sizes the photo
 * to the copy, so a short chapter never sits beside a tall empty photo:
 * 0: cinematic photo with the copy on a floating card (long copy falls back to the split)
 * 1: split with the photo stretched to the copy's height
 * 2: dark panel card with the photo stretched inside it
 */
function Chapter({
  section,
  index,
  image,
  id,
}: {
  section: Town["sections"][number];
  index: number;
  image: TopicImage;
  id: string;
}) {
  const blocks = toBlocks(section.items);
  const long = textLength(blocks) > 620;
  const variant = index % 3 === 0 && long ? 1 : index % 3;
  const flip = index % 2 === 1;
  const num = (dark?: boolean, small?: boolean) => (
    <span
      aria-hidden="true"
      className={cn(
        "block leading-none font-bold tracking-tighter tabular-nums",
        small ? "text-5xl" : "text-6xl sm:text-7xl",
        dark ? "text-white/15" : "text-brand-500/20",
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
  const title = (dark?: boolean) => (
    <h3
      id={`${id}-h`}
      className={cn(
        "mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] leading-[1.1] font-bold tracking-tight text-balance",
        dark ? "text-white" : "text-ink",
      )}
    >
      {section.heading}
    </h3>
  );
  const photo = (className: string, sizes: string) => (
    <ImageReveal direction={flip ? "right" : "left"} className={className}>
      {" "}
      <Image data-reveal-media src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
    </ImageReveal>
  );

  if (variant === 0)
    return (
      <article id={id} aria-labelledby={`${id}-h`} className="relative scroll-mt-28 xl:grid xl:grid-cols-1">
        {photo(
          "aspect-4/3 rounded-4xl shadow-lift sm:aspect-16/9 sm:rounded-5xl xl:col-start-1 xl:row-start-1 xl:aspect-21/9 xl:w-full xl:self-stretch",
          "100vw",
        )}
        <Reveal
          y={30}
          className={cn(
            "relative z-10 -mt-16 px-3 sm:-mt-28 sm:px-8 xl:col-start-1 xl:row-start-1 xl:m-10 xl:w-[min(38rem,46%)] xl:self-end xl:px-0",
            flip ? "xl:justify-self-start" : "xl:justify-self-end",
          )}
        >
          <div className="rounded-4xl bg-white/95 p-6 shadow-lift ring-1 ring-line sm:p-9">
            {num(false, true)}
            {title()}
            <ChapterCopy blocks={blocks} />
          </div>
        </Reveal>
      </article>
    );

  if (variant === 2)
    return (
      <article
        id={id}
        aria-labelledby={`${id}-h`}
        className="relative isolate grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-4xl bg-ink p-3 text-white sm:rounded-5xl lg:grid-cols-12 lg:items-stretch"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 -z-10 size-120 rounded-full glow-blob text-brand-500/30"
        />
        <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>
          {photo(
            "aspect-4/3 rounded-[1.6rem] sm:rounded-[2.1rem] lg:aspect-auto lg:h-full lg:min-h-72",
            "(min-width:1024px) 38vw, 100vw",
          )}
        </div>
        <Reveal y={24} className="min-w-0 self-center p-5 sm:p-8 lg:col-span-7 lg:p-12">
          {num(true)}
          {title(true)}
          <ChapterCopy blocks={blocks} dark />
        </Reveal>
      </article>
    );

  return (
    <article
      id={id}
      aria-labelledby={`${id}-h`}
      className="grid scroll-mt-28 grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-14"
    >
      <div className={cn("min-w-0 lg:col-span-5", flip && "lg:order-2")}>
        {photo(
          "aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl lg:aspect-auto lg:h-full lg:min-h-72",
          "(min-width:1024px) 40vw, 100vw",
        )}
      </div>
      <Reveal y={24} className="min-w-0 self-center lg:col-span-7">
        {num()}
        {title()}
        <ChapterCopy blocks={blocks} />
      </Reveal>
    </article>
  );
}

export function TownGuide({ town }: { town: Town }) {
  /* the generated plan spreads photos across the site; the heading rules are the fallback */
  const planned = townImages[town.slug]?.chapters;
  const images =
    planned?.length === town.sections.length
      ? planned.map((k) => topicImages[k])
      : pickImages(town.sections.map((s) => s.heading));

  return (
    <section className="bg-white section-y" aria-labelledby="guide-heading">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{town.name} patient guide</Eyebrow>
            <SplitReveal as="h2" id="guide-heading" className="mt-5 text-display-md font-bold text-balance">
              Coming to us from <span className="text-brand-500">{town.name}</span>
            </SplitReveal>
          </div>
          <Reveal>
            <nav aria-label={`${town.name} guide`} className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {town.sections.map((s, i) => (
                <a
                  key={s.heading}
                  href={`#${anchor(i)}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-pearl px-3.5 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:text-brand-700 hover:ring-brand-400"
                >
                  <span className="text-xs font-bold text-brand-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        <div className="mt-14 space-y-10 lg:mt-20 lg:space-y-14">
          {town.sections.map((s, i) => (
            <Chapter key={s.heading} section={s} index={i} image={images[i]} id={anchor(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
