import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { TopicImage } from "@/content/topic-images";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type TreatmentCard = { title: string; text: string; href: string; image: TopicImage; tag?: string };

/** Photo cards linking a hub to its treatment pages; the first card is featured. */
export function TreatmentCards({
  eyebrow,
  title,
  cards,
  id = "treatments-heading",
}: {
  eyebrow: string;
  title: ReactNode;
  cards: TreatmentCard[];
  id?: string;
}) {
  /* how many cards take half a row, so every row is full: 3 per row, with 2 wide ones where needed */
  const big = cards.length % 3 === 0 ? 0 : cards.length % 3 === 2 ? 2 : 4;
  return (
    <section className="bg-white section-y" aria-labelledby={id}>
      <div className="container-site">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitReveal as="h2" id={id} className="mt-5 max-w-3xl text-display-md font-bold text-balance">
          {title}
        </SplitReveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6" stagger={0.08}>
          {cards.map((c, i) => (
            <RevealItem key={c.href} className={cn("h-full", i < big ? "lg:col-span-3" : "lg:col-span-2")}>
              <Link
                href={c.href}
                className="group relative flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-4xl bg-ink text-white sm:rounded-5xl"
              >
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes={i < big ? "(min-width:1024px) 48vw, 100vw" : "(min-width:1024px) 32vw, 100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-transparent" />
                <div className="relative p-6 sm:p-8">
                  {c.tag && (
                    <span className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                      {c.tag}
                    </span>
                  )}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-2xl font-bold tracking-tight sm:text-3xl">{c.title}</p>
                      <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-white/80">{c.text}</p>
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
