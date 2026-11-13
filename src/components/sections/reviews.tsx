"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, BadgeCheck, Star, X } from "lucide-react";
import { reviews, site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Counter } from "@/components/motion/counter";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/ui/marquee";
import { FacebookIcon, GoogleIcon, YelpIcon } from "@/components/ui/icons";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Review = (typeof reviews)[number];

function Stars({ size = "size-5", animate = false }: { size?: string; animate?: boolean }) {
  return (
    <span className="relative inline-flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) =>
        animate ? (
          <span key={i} className="relative">
            <Star className={cn(size, "text-amber-200")} />
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: ease.out }}
              className="absolute inset-0"
            >
              <Star className={cn(size, "fill-amber-400 text-amber-400")} />
            </motion.span>
          </span>
        ) : (
          <Star key={i} className={cn(size, "fill-amber-400 text-amber-400")} />
        ),
      )}
    </span>
  );
}

const initials = (n: string) =>
  n
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const tints = [
  "bg-brand-50 text-brand-700",
  "bg-sky-50 text-sky-700",
  "bg-teal-50 text-teal-700",
  "bg-slate-100 text-slate-700",
];

/** Reviews longer than ~4 lines get a "Read full review" button that opens the popup. */
const isLong = (q: string) => q.length > 150;

function ReviewCard({
  r,
  i,
  className,
  onOpen,
}: {
  r: Review;
  i: number;
  className?: string;
  onOpen?: (r: Review, i: number) => void;
}) {
  return (
    <figure
      className={cn(
        "flex flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-[border-color,box-shadow] duration-500 hover:border-brand-200 hover:shadow-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Stars size="size-4" />
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <GoogleIcon size={14} /> Google review
        </span>
      </div>
      <blockquote className="mt-4 line-clamp-4 text-[0.9375rem] leading-relaxed text-ink">“{r.quote}”</blockquote>
      {onOpen && isLong(r.quote) && (
        <button
          type="button"
          onClick={() => onOpen(r, i)}
          className="group/more mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Read full review
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/more:rotate-45" />
        </button>
      )}
      <span aria-hidden="true" className="min-h-5 flex-1" />
      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold",
            tints[i % tints.length],
          )}
        >
          {initials(r.name)}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1 truncate font-semibold text-ink">
            {r.name}
            <BadgeCheck className="size-4 shrink-0 text-brand-500" aria-label="Google verified review" />
          </span>
          <span className="block text-xs text-muted">{formatDate(r.date)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Vertical auto-scroll column: content duplicated once, loops seamlessly, pauses on hover. */
function Column({
  items,
  offset,
  duration,
  reverse,
  onOpen,
}: {
  items: Review[];
  offset: number;
  duration: number;
  reverse?: boolean;
  onOpen: (r: Review, i: number) => void;
}) {
  return (
    <div className="group/col relative h-full overflow-hidden">
      <div
        className="flex animate-marquee-y flex-col gap-5 group-hover/col:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-5" aria-hidden={copy === 1 || undefined}>
            {items.map((r, i) => (
              <ReviewCard key={`${copy}-${r.name}`} r={r} i={i + offset} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Reviews() {
  const list = [...reviews];
  const colA = list.filter((_, i) => i % 2 === 0);
  const colB = list.filter((_, i) => i % 2 === 1);
  const [selected, setSelected] = useState<{ r: Review; i: number } | null>(null);
  const open = (r: Review, i: number) => setSelected({ r, i });

  return (
    <section className="overflow-hidden bg-white section-y" aria-labelledby="reviews-heading">
      <div className="container-site grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-16">
        {/* Score panel */}
        <div className="lg:col-span-5">
          <Eyebrow>Patient Reviews</Eyebrow>
          <SplitReveal as="h2" id="reviews-heading" className="mt-6 text-display-md font-bold">
            Smiles that speak <span className="text-brand-500">for us</span>
          </SplitReveal>

          {/* Mobile: compact rating card */}
          <div className="mt-8 rounded-3xl bg-pearl p-5 ring-1 ring-line lg:hidden">
            <div className="flex items-center gap-4">
              <span className="text-5xl leading-none font-bold tracking-[-0.05em] text-ink">
                <Counter to={site.rating.score} decimals={2} duration={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <Stars size="size-4" animate />
                <p className="mt-1.5 text-sm leading-snug text-body">
                  <strong className="text-ink">{site.rating.count}</strong> Google reviews
                </p>
              </div>
              <GoogleIcon size={26} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                {
                  label: "Google",
                  long: "Read reviews on Google",
                  href: site.social.google,
                  Icon: GoogleIcon,
                  tone: undefined,
                },
                {
                  label: "Yelp",
                  long: "See us on Yelp",
                  href: site.social.yelp,
                  Icon: YelpIcon,
                  tone: "text-[#d32323]",
                },
                {
                  label: "Facebook",
                  long: "Follow on Facebook",
                  href: site.social.facebook,
                  Icon: FacebookIcon,
                  tone: "text-[#1877f2]",
                },
              ].map(({ label, href, Icon, tone }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${site.name} on ${label}`}
                  className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 text-xs font-semibold text-ink shadow-soft transition-transform active:scale-95"
                >
                  <Icon size={20} className={tone} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: full rating panel */}
          <div className="mt-10 hidden rounded-4xl bg-pearl p-8 lg:block">
            <div className="flex items-center gap-3">
              <GoogleIcon size={26} />
              <span className="text-sm font-semibold text-ink">Google rating</span>
            </div>
            <div className="mt-5 flex items-end gap-2 whitespace-nowrap sm:gap-3">
              <span className="text-6xl leading-none font-bold tracking-[-0.05em] text-ink sm:text-7xl lg:text-8xl">
                <Counter to={site.rating.score} decimals={2} duration={2.4} />
              </span>
              <span className="pb-1.5 text-base text-muted sm:pb-2 sm:text-lg">/ 5</span>
            </div>
            <div className="mt-4">
              <Stars size="size-6" animate />
            </div>
            <p className="mt-3 text-body">
              Average rating based on <strong className="text-ink">{site.rating.count} patient reviews</strong>
            </p>

            <div className="mt-8 grid gap-2">
              {[
                {
                  label: "Google",
                  long: "Read reviews on Google",
                  href: site.social.google,
                  Icon: GoogleIcon,
                  tone: undefined,
                },
                {
                  label: "Yelp",
                  long: "See us on Yelp",
                  href: site.social.yelp,
                  Icon: YelpIcon,
                  tone: "text-[#d32323]",
                },
                {
                  label: "Facebook",
                  long: "Follow on Facebook",
                  href: site.social.facebook,
                  Icon: FacebookIcon,
                  tone: "text-[#1877f2]",
                },
              ].map(({ long, href, Icon, tone }) => (
                <a
                  key={long}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-medium text-ink shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} className={tone} />
                    {long}
                  </span>
                  <ArrowUpRight className="size-4 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Auto-scrolling reviews: two columns on desktop */}
        <Reveal className="hidden lg:col-span-7 lg:block">
          <div className="relative grid h-[44rem] grid-cols-2 gap-5 mask-[linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)]">
            <Column items={colA} offset={0} duration={70} onOpen={open} />
            <Column items={colB} offset={1} duration={80} reverse onOpen={open} />
          </div>
        </Reveal>

        {/* Mobile / tablet: one horizontal auto-scrolling row */}
        <div className="-mx-4 lg:hidden">
          <Marquee duration={90} stretch>
            {list.map((r, i) => (
              <ReviewCard
                key={r.name}
                r={r}
                i={i}
                onOpen={open}
                className="mx-2 w-[17.5rem] shrink-0 sm:mx-2.5 sm:w-[22rem]"
              />
            ))}
          </Marquee>
        </div>
      </div>

      <ReviewModal selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/** Full review in a popup: closes on ✕, outside click or Escape; page scroll paused while open. */
function ReviewModal({ selected, onClose }: { selected: { r: Review; i: number } | null; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!selected) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, lenis, onClose]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          key="review-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-80 grid place-items-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Review by ${selected.r.name}`}
        >
          <motion.figure
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-4xl bg-white p-6 shadow-lift sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-pearl text-ink transition-colors hover:bg-ink hover:text-white"
              aria-label="Close review"
            >
              <X className="size-4" />
            </button>
            <div className="flex items-center gap-2 pr-12">
              <GoogleIcon size={20} />
              <span className="text-sm font-semibold text-ink">Google review</span>
            </div>
            <div className="mt-4">
              <Stars size="size-5" />
            </div>
            <blockquote className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">“{selected.r.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold",
                  tints[selected.i % tints.length],
                )}
              >
                {initials(selected.r.name)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  {selected.r.name}
                  <BadgeCheck className="size-4 shrink-0 text-brand-500" aria-label="Google verified review" />
                </span>
                <span className="block text-xs text-muted">{formatDate(selected.r.date)}</span>
              </span>
              <a
                href={site.social.google}
                target="_blank"
                rel="noopener"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All reviews <ArrowUpRight className="size-3.5" />
              </a>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
