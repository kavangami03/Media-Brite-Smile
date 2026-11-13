"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { doctors } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ease } from "@/lib/motion";

type Doctor = (typeof doctors)[number];

function DoctorCard({ d, index }: { d: Doctor; index: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: ease.out, delay: index * 0.12 }}
      className="[perspective:1200px]"
    >
      <motion.div
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative"
      >
        <Link href={d.href} className="block" aria-label={`Meet ${d.name}, ${d.credential}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-brand-100">
            <Image
              src={d.image}
              alt={`${d.name}, ${d.credential}`}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              style={{ objectPosition: d.position }}
            />
            <motion.div
              aria-hidden="true"
              style={{ left: glareX }}
              className="pointer-events-none absolute top-0 h-full w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">
              {d.focus}
            </span>

            {/* Hover panel (desktop) */}
            <div className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+1rem)] rounded-3xl bg-white/92 p-6 backdrop-blur-xl transition-transform duration-700 ease-out-expo group-hover:translate-y-0 lg:block">
              <p className="text-sm leading-relaxed text-body">{d.bio}</p>
              <ul className="mt-4 space-y-2">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm font-medium text-ink">
                    <GraduationCap className="mt-0.5 size-4 shrink-0 text-brand-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                {d.name}, <span className="text-brand-500">{d.credential}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed lg:hidden">{d.bio}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

export function Doctors() {
  return (
    <section className="section-y bg-pearl" aria-labelledby="doctors-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Meet the Doctors</Eyebrow>
            <SplitReveal as="h2" id="doctors-heading" className="mt-6 text-display-lg font-bold">
              Meet your <span className="accent-serif text-brand-500">Media</span> dentists
            </SplitReveal>
          </div>
          <Reveal className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <p className="max-w-md text-lg leading-relaxed">
              Three doctors, one shared belief: take the time to hear your concerns, understand your needs and build a
              relationship you can trust.
            </p>
            <Button href="/about-us" variant="outline">
              About our practice
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {doctors.map((d, i) => (
            <DoctorCard key={d.name} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
