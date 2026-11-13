"use client";

import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import type { Doctor, DoctorProfile } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

/** Education & credentials as a path that draws itself as you scroll. */
export function DoctorJourney({ doctor, profile }: { doctor: Doctor; profile: DoctorProfile }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        if (reduce) return;
        const line = el.querySelector("[data-line]");
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
        gsap.fromTo(line, desktop ? { scaleX: 0 } : { scaleY: 0 }, {
          ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
          ease: "none",
          scrollTrigger: { trigger: el.querySelector("[data-track]"), start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
        steps.forEach((s) => {
          gsap.from(s.querySelector("[data-dot]"), {
            scale: 0,
            duration: 0.6,
            ease: "back.out(2.4)",
            scrollTrigger: { trigger: s, start: desktop ? "top 70%" : "top 80%", once: true },
          });
          gsap.from(s.querySelector("[data-card]"), {
            y: 30,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: s, start: desktop ? "top 70%" : "top 80%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-pearl section-y" aria-labelledby="journey-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Education &amp; training</Eyebrow>
            <SplitReveal as="h2" id="journey-heading" className="mt-6 text-display-md font-bold">
              The path that shaped <span className="text-brand-500">{doctor.short}</span>
            </SplitReveal>
          </div>
          <p className="text-lg leading-relaxed lg:col-span-5">
            Degrees, honours and advanced training behind the care you receive at our Media office.
          </p>
        </div>

        <div data-track className="relative mt-12 lg:mt-16">
          {/* the line */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4.75 w-0.5 bg-line lg:top-4.75 lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto"
          >
            <div
              data-line
              className="size-full origin-top bg-linear-to-b from-brand-500 to-glow lg:origin-left lg:bg-linear-to-r"
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {profile.journey.map((j, i) => (
              <li key={j.title} data-step className="relative pl-14 lg:pt-16 lg:pl-0">
                <span
                  data-dot
                  className="absolute top-0 left-0 grid size-10 place-items-center rounded-full bg-white text-sm font-bold text-brand-600 shadow-soft ring-2 ring-brand-500"
                >
                  {i === 0 ? <GraduationCap className="size-4.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <div data-card className="h-full rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line">
                  <h3 className="text-lg leading-snug font-bold tracking-tight">{j.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{j.place}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
