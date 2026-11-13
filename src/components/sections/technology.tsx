"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Microscope, Navigation, Play, Volume2, X } from "lucide-react";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";

function PhotoTile({ src, alt, title, text }: { src: string; alt: string; title: string; text: string }) {
  return (
    <div className="group relative size-full overflow-hidden rounded-4xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width:1024px) 40vw, 100vw"
        className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-x-6 bottom-6 text-white">
        <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-white/75">{text}</p>
      </div>
    </div>
  );
}

export function Technology() {
  const [video, setVideo] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!video) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideo(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [video, lenis]);

  return (
    <section className="bg-white section-y" aria-labelledby="tech-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Advanced Technology</Eyebrow>
            <SplitReveal as="h2" id="tech-heading" className="mt-6 text-display-lg font-bold">
              Precision you can <span className="accent-serif text-brand-500">see</span>
            </SplitReveal>
          </div>
          <Reveal className="lg:justify-self-end">
            <p className="max-w-lg text-lg leading-relaxed">
              Dentistry is micro-surgery. Using microscopes similar to the ones ophthalmologists use, we create
              restorations with an incredibly precise fit and finish. That&apos;s a level of care you can&apos;t achieve
              with the naked eye.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 auto-rows-[17rem] gap-4 md:grid-cols-2 lg:auto-rows-[15.5rem] lg:grid-cols-12"
          stagger={0.07}
        >
          {/* Video tile */}
          <RevealItem className="md:col-span-2 md:row-span-2 lg:col-span-7">
            <button
              type="button"
              onClick={() => setVideo(true)}
              className="group relative size-full overflow-hidden rounded-4xl text-left"
              aria-label="Play our office tour video"
            >
              <Image
                src="/images/office/office-5.jpg"
                alt="Media Brite Smile reception"
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute top-5 right-5 md:inset-0 md:grid md:place-items-center">
                <span className="relative grid size-14 place-items-center rounded-full bg-white text-brand-600 shadow-lift transition-transform duration-500 group-hover:scale-110 md:size-24">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.2s]" />
                  <Play className="relative ml-0.5 size-5 fill-current md:ml-1 md:size-8" />
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white md:inset-x-8 md:bottom-8">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-brand-200 uppercase">Office Tour</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    Step inside our new office
                  </h3>
                </div>
                <span className="hidden items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur md:flex">
                  <Volume2 className="size-4" /> Watch video
                </span>
              </div>
            </button>
          </RevealItem>

          <RevealItem className="lg:col-span-5">
            <PhotoTile
              src="/images/office/cbct-scanner.webp"
              alt="CBCT 3D imaging system"
              title="CBCT 3D imaging"
              text="Detailed 3D scans for digital implant planning and guided surgery."
            />
          </RevealItem>

          <RevealItem className="lg:col-span-5">
            <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-4xl bg-linear-to-br from-brand-500 to-brand-800 p-8 text-white">
              <Microscope className="size-10 text-brand-100" strokeWidth={1.5} />
              <div
                aria-hidden="true"
                className="absolute -right-10 -bottom-16 size-60 rounded-full border-[28px] border-white/10"
              />
              <div className="relative">
                <h3 className="text-2xl font-semibold tracking-tight text-white">High-power microscopes</h3>
                <p className="mt-2 max-w-sm text-sm text-brand-50/85">
                  Light is focused directly on the teeth for precise close-up work while minimizing glare for you.
                </p>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="lg:col-span-4">
            <div className="flex size-full flex-col justify-between rounded-4xl border border-line bg-pearl p-8">
              <span className="text-5xl font-bold tracking-tighter text-brand-500">Quieter.</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Electric handpieces</h3>
                <p className="mt-2 text-sm">
                  Smoother than air-driven drills, for precise restorations with less vibration and less noise.
                </p>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="lg:col-span-4">
            <PhotoTile
              src="/images/office/waiting-room-2.webp"
              alt="Our comfortable waiting area"
              title="Calm, modern spaces"
              text="A relaxed, worry-free experience from the moment you arrive."
            />
          </RevealItem>

          <RevealItem className="md:col-span-2 lg:col-span-4">
            <a
              href={site.address.directions}
              target="_blank"
              rel="noopener"
              className="group relative block size-full overflow-hidden rounded-4xl"
            >
              <Image
                src="/images/office/office-41.jpg"
                alt="Media Brite Smile building at 8 N Pennell Rd"
                fill
                sizes="(min-width:1024px) 30vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/10 to-transparent" />
              <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-brand-200 uppercase">
                  <Navigation className="size-3.5" /> Our new home
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{site.address.full}</h3>
              </div>
            </a>
          </RevealItem>
        </RevealGroup>

        <div className="mt-10 flex justify-center">
          <Button href="/patient-information/care-and-comfort/advanced-technology" variant="outline">
            Explore our technology
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
            onClick={() => setVideo(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Office tour video"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: ease.out }}
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video src="/videos/office-tour.mp4" controls autoPlay playsInline className="aspect-video w-full" />
              <button
                type="button"
                onClick={() => setVideo(false)}
                className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/90 text-ink"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
