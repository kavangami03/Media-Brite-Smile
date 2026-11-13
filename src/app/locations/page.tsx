import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Star } from "lucide-react";
import { locations, site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { AreaFinder } from "@/components/location/area-finder";
import { Visit } from "@/components/sections/visit";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: `Media Brite Smile welcomes patients from ${site.serviceAreas.join(", ")}, PA. Family, cosmetic and implant dentistry at ${site.address.full}.`,
  alternates: { canonical: "/locations" },
};

const stats = [
  { value: String(locations.length), label: "Communities served" },
  { value: site.rating.score.toFixed(2), label: `Rating from ${site.rating.count} reviews`, star: true },
  { value: String(site.since), label: "Caring for smiles since" },
];

export default function LocationsPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-pearl pt-30 pb-14 lg:pt-36 lg:pb-20"
        aria-labelledby="locations-title"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 size-160 rounded-full bg-brand-200/50 blur-[140px]"
        />
        <div className="relative container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-ink">
                Locations
              </li>
            </ol>
          </nav>

          {/* ---------- intro ---------- */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>Areas We Serve</Eyebrow>
              <SplitReveal as="h1" id="locations-title" immediate className="mt-6 text-display-lg font-bold">
                One office, <span className="text-brand-500">many</span> neighborhoods
              </SplitReveal>
            </div>
            <Reveal className="lg:col-span-5" delay={0.2}>
              <p className="text-lg leading-relaxed">
                Patients across Delaware County and Philadelphia visit our office at {site.address.full} for family,
                cosmetic and implant dentistry. Pick your town to see the route.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line min-[480px]:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 bg-white px-6 py-5">
                  <dt className="text-sm leading-snug text-body">{s.label}</dt>
                  <dd className="order-first flex items-center gap-1.5 text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl">
                    {s.value}
                    {s.star && <Star className="size-5 fill-amber-400 text-amber-400" aria-hidden="true" />}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ---------- town picker + live route ---------- */}
          <Reveal className="mt-6" y={50}>
            <AreaFinder />
          </Reveal>

          {/* ---------- the office ---------- */}
          <Reveal className="mt-6">
            <div className="grid grid-cols-1 overflow-hidden rounded-4xl bg-white ring-1 ring-line sm:rounded-5xl md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-60 md:min-h-80">
                <Image
                  src="/images/office/office-41.jpg"
                  alt="The Media Brite Smile office building"
                  fill
                  sizes="(min-width:768px) 55vw, 100vw"
                  className="object-cover object-[50%_45%]"
                />
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold tracking-[0.14em] text-brand-700 uppercase shadow-soft backdrop-blur">
                  <span className="size-2 rounded-full bg-brand-500" /> We&apos;ve moved!
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">Our new home</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  Every town leads to <span className="text-brand-500">{site.address.street}</span>
                </h2>
                <p className="mt-4 flex items-start gap-2 text-lg leading-relaxed">
                  <MapPin className="mt-1 size-5 shrink-0 text-brand-500" aria-hidden="true" />
                  {site.address.full}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={site.address.directions} target="_blank" rel="noopener">
                    Get directions
                  </Button>
                  <Button href={site.phone.href} variant="outline" icon={<Phone className="size-4" />}>
                    {site.phone.display}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Visit />
    </>
  );
}
