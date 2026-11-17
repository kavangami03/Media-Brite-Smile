"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OFF_DUTY, type Doctor, type DoctorProfile } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrubText } from "@/components/motion/scrub-text";
import { cn } from "@/lib/utils";

/** Chapter copy: blank lines split paragraphs, "- " lines become a bullet list. */
function ChapterText({ text }: { text: string }) {
  return (
    <div className="mt-3 space-y-4">
      {text.split("\n\n").map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- ")))
          return (
            <ul key={i} className="space-y-3">
              {lines.map((l) => {
                const t = l.slice(2);
                const m = t.match(/^([^.]{3,48})\.\s+(.+)$/);
                return (
                  <li key={t} className="flex gap-3 text-lg leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand-500" />
                    <span>
                      {m ? (
                        <>
                          <strong className="font-semibold text-ink">{m[1]}.</strong> {m[2]}
                        </>
                      ) : (
                        t
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        return (
          <p key={i} className="text-lg leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

/**
 * The full bio as an editorial read: a scroll-lit statement, then chapters
 * with a sticky index that tracks the chapter in view.
 */
export function DoctorStory({ doctor, profile }: { doctor: Doctor; profile: DoctorProfile }) {
  const chapters = profile.story.filter((c) => c.title !== OFF_DUTY);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
  };

  return (
    <section className="bg-white section-y" aria-labelledby="story-heading">
      <div className="container-site">
        <Eyebrow>{doctor.short}&apos;s story</Eyebrow>
        <h2 id="story-heading" className="sr-only">
          About {doctor.name}
        </h2>
        <ScrubText className="mt-8 max-w-6xl text-[clamp(1.6rem,1rem+2.6vw,3.4rem)] leading-[1.15] font-semibold tracking-tight text-ink">
          <span
            data-pill
            className="relative mr-3 inline-block h-[0.95em] w-[1.9em] translate-y-[0.12em] overflow-hidden rounded-full align-baseline"
          >
            <Image
              src={doctor.image}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
              style={{ objectPosition: doctor.position }}
            />
          </span>
          <span data-scrub>{profile.statement}</span>
        </ScrubText>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* sticky chapter index */}
          <nav aria-label="Chapters" className="hidden lg:col-span-4 lg:block">
            <ol className="sticky top-32 space-y-1">
              {chapters.map((c, i) => (
                <li key={c.title}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    className={cn(
                      "group flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors duration-300",
                      active === i ? "bg-mist" : "hover:bg-pearl",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-semibold tabular-nums transition-colors",
                        active === i ? "text-brand-500" : "text-muted",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-lg font-semibold tracking-tight transition-colors",
                        active === i ? "text-ink" : "text-ink/50 group-hover:text-ink",
                      )}
                    >
                      {c.title}
                    </span>
                    <span
                      className={cn(
                        "h-0.5 rounded-full bg-brand-500 transition-all duration-500",
                        active === i ? "w-8" : "w-0",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* chapters */}
          <div className="space-y-12 lg:col-span-8 lg:space-y-16">
            {chapters.map((c, i) => (
              <article
                key={c.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[5rem_1fr] sm:gap-6"
              >
                <span
                  className="text-5xl leading-none font-bold tracking-tighter text-brand-100 sm:text-6xl"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{c.title}</h3>
                  <ChapterText text={c.text} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
