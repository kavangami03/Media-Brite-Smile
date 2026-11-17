"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgeDollarSign, HeartHandshake, ListChecks, MessageCircle, ScanLine } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

/* "What Happens at Your First Visit?" from the approved Home draft. */
const pillars = [
  {
    icon: ScanLine,
    title: "An examination, not treatment",
    text: "A dentist examines your teeth and gums and takes any X-rays you are due. A first appointment is an examination and a conversation, not treatment on the day.",
  },
  {
    icon: MessageCircle,
    title: "Findings in plain words",
    text: "You hear what was found in plain words, with the problems ranked by urgency.",
  },
  {
    icon: ListChecks,
    title: "Options before anything is booked",
    text: "You get the treatment options with what each one involves, before anything is booked.",
  },
  {
    icon: HeartHandshake,
    title: "Been a while? Say so",
    text: "If it has been years since your last visit, say so when you call. That changes how the appointment is paced. You will not get a lecture about the gap.",
  },
  {
    icon: BadgeDollarSign,
    title: "$99 if you are uninsured",
    text: "If you are new and uninsured, the New Patient Special is $99 instead of the usual $315.",
  },
];

export function Wellness() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-pillar]", el).forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 82%", toggleActions: "play none none none" },
          });
          tl.from(row.querySelector("[data-line]"), { scaleX: 0, duration: 1.2, ease: "brite.inOut" })
            .from(row.querySelector("[data-icon]"), { scale: 0, rotate: -45, duration: 0.8, ease: "back.out(2)" }, 0.2)
            .from(row.querySelectorAll("[data-fade]"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.25);
        });
        const floatCards = el.querySelectorAll("[data-float-card]");
        if (floatCards.length)
          gsap.to(floatCards, {
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-mist section-y" aria-labelledby="wellness-heading">
      <div className="container-site grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Your first visit</Eyebrow>
            <SplitReveal as="h2" id="wellness-heading" className="mt-6 text-display-md font-bold">
              What happens at your <span className="accent-serif text-brand-500">first visit</span>?
            </SplitReveal>
            <p className="mt-6 max-w-lg text-lg leading-relaxed">
              A first appointment is an examination and a conversation, not treatment on the day.
            </p>
            <Link
              href="/patient-information/new-patients"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
            >
              What new patients need to know
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>

            <div className="relative mt-12 pr-10 pb-16">
              <ImageReveal className="aspect-[4/3] rounded-4xl" direction="up">
                <Image
                  data-reveal-media
                  src="/images/office/operatory-1.webp"
                  alt="A bright, modern treatment room at Media Brite Smile"
                  fill
                  sizes="(min-width:1024px) 36rem, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
              <div data-float-card className="absolute right-0 bottom-0 w-[46%]">
                <ImageReveal className="aspect-square rounded-3xl ring-8 ring-mist" direction="left" delay={0.3}>
                  <Image
                    data-reveal-media
                    src="/images/office/in-house-lab.webp"
                    alt="Our in-house dental lab"
                    fill
                    sizes="16rem"
                    className="object-cover"
                  />
                </ImageReveal>
              </div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:pt-4">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-pillar className="group relative py-10 first:pt-0">
              <div className="flex gap-3 sm:gap-6 md:gap-10">
                <span data-fade className="w-7 shrink-0 pt-2 text-sm font-semibold text-muted tabular-nums sm:w-10">
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-5">
                    <span
                      data-icon
                      className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white"
                    >
                      <Icon className="size-6" />
                    </span>
                    <h3 data-fade className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {title}
                    </h3>
                  </div>
                  <p data-fade className="mt-4 max-w-xl text-lg leading-relaxed md:pl-[4.75rem]">
                    {text}
                  </p>
                </div>
              </div>
              <span data-line className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-900/15" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
