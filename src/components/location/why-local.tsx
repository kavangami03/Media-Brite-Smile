import Image from "next/image";
import Link from "next/link";
import { BadgePercent, Leaf, Phone, Siren, Star } from "lucide-react";
import { doctors, site, type Location } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoogleIcon } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/** Bento of the practice's real strengths, framed for patients from this town. */
export function WhyLocal({ location }: { location: Location }) {
  const town = location.name;

  return (
    <section className="bg-white section-y" aria-labelledby="why-local-heading">
      <div className="container-site">
        <div className="max-w-3xl">
          <Eyebrow>Why patients choose us</Eyebrow>
          <SplitReveal as="h2" id="why-local-heading" className="mt-6 text-display-md font-bold">
            Why <span className="text-brand-500">{town}</span> patients choose Media Brite Smile
          </SplitReveal>
        </div>

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[15rem_15rem_auto]"
          stagger={0.07}
        >
          {/* Office photo */}
          <RevealItem className="sm:col-span-2 lg:row-span-2">
            <div className="group relative h-72 overflow-hidden rounded-4xl sm:h-80 lg:h-full">
              <Image
                src="/images/office/office-5.jpg"
                alt="The Media Brite Smile reception area"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white md:inset-x-8 md:bottom-8">
                <p className="text-xs font-bold tracking-[0.18em] text-glow uppercase">Our new home</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  A modern office at {site.address.street}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/80">
                  Caring for families from {town} and across the area since {site.since}.
                </p>
              </div>
            </div>
          </RevealItem>

          {/* Doctors */}
          <RevealItem>
            <Link
              href="/about-us"
              className="group flex h-full flex-col justify-between gap-6 rounded-4xl bg-ink p-6 text-white"
            >
              <div className="flex -space-x-3">
                {doctors.map((d) => (
                  <span key={d.name} className="relative size-12 overflow-hidden rounded-full ring-2 ring-ink">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      style={{ objectPosition: d.position }}
                    />
                  </span>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">3 experienced dentists</h3>
                <p className="mt-1 text-sm text-white/65">
                  Family, cosmetic, restorative and implant care in one office.
                </p>
              </div>
            </Link>
          </RevealItem>

          {/* Rating */}
          <RevealItem>
            <a
              href={site.social.google}
              target="_blank"
              rel="noopener"
              className="flex h-full flex-col justify-between gap-6 rounded-4xl bg-pearl p-6 ring-1 ring-line"
            >
              <div className="flex items-center justify-between">
                <GoogleIcon size={24} />
                <span className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
              </div>
              <div>
                <p className="text-5xl leading-none font-bold tracking-tighter text-ink">{site.rating.score}</p>
                <p className="mt-2 text-sm text-body">from {site.rating.count} Google reviews</p>
              </div>
            </a>
          </RevealItem>

          {/* Emergencies */}
          <RevealItem>
            <a
              href={site.phone.href}
              className="group flex h-full flex-col justify-between gap-6 rounded-4xl bg-linear-to-br from-brand-500 to-brand-700 p-6 text-white"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
                <Siren className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">Same-day emergencies</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-50">
                  <Phone className="size-3.5" /> {site.phone.display}
                </p>
              </div>
            </a>
          </RevealItem>

          {/* Mercury-free */}
          <RevealItem>
            <div className="flex h-full flex-col justify-between gap-6 rounded-4xl bg-mist p-6 ring-1 ring-brand-100">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                <Leaf className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink">Mercury-free care</h3>
                <p className="mt-1 text-sm text-body">Biocompatible, minimally invasive treatment you can trust.</p>
              </div>
            </div>
          </RevealItem>

          {/* Offer */}
          <RevealItem className="sm:col-span-2 lg:col-span-4">
            <div className="relative overflow-hidden rounded-4xl bg-linear-to-r from-brand-950 via-brand-900 to-brand-700 p-6 text-white sm:p-8 lg:px-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-1/4 size-72 rounded-full bg-glow/20 blur-3xl"
              />
              <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
                <div className="flex items-center gap-5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-glow ring-1 ring-white/15">
                    <BadgePercent className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">New patient special</p>
                    <p className="mt-1 flex items-baseline gap-2 text-white">
                      <span className="text-5xl leading-none font-bold tracking-tighter">$99</span>
                      <span className="text-lg font-semibold">visit</span>
                    </p>
                  </div>
                </div>
                <p className="max-w-xl text-white/75 lg:border-l lg:border-white/15 lg:pl-10">
                  Regularly $315, for uninsured patients. No insurance? Our In-Office Membership Plan covers your
                  preventive care with savings on additional treatment.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/special-offers" variant="white">
                    View all offers
                  </Button>
                  <Button href="/about-us/dental-savings-plan" variant="outline-light" icon={false}>
                    Membership plan
                  </Button>
                </div>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
