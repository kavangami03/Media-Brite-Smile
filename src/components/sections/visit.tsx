import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Phone, Siren } from "lucide-react";
import { locations, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ToothWatermark } from "@/components/ui/icons";

export function Visit() {
  return (
    <section className="bg-white section-y" aria-labelledby="visit-heading">
      <div className="container-site">
        {/* CTA card */}
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-5xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-900">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -top-32 -left-20 size-[30rem] rounded-full bg-glow/30 blur-[120px]" />
              <ToothWatermark size={520} className="absolute -bottom-40 left-[38%] text-white/[0.07]" />
            </div>
            <div className="grid grid-cols-1 items-center lg:grid-cols-2">
              <div className="p-6 pt-2 pb-10 sm:p-8 sm:pt-4 sm:pb-12 md:p-16 lg:py-16">
                <p className="text-xs font-bold tracking-[0.2em] text-brand-100 uppercase">
                  Now welcoming new patients
                </p>
                <SplitReveal as="h2" id="visit-heading" className="mt-5 text-display-lg font-bold text-white">
                  Ready for your <span className="accent-serif text-glow">brightest</span> smile?
                </SplitReveal>
                <p className="mt-6 max-w-md text-lg text-brand-50/85">
                  Drs. Zan, Suvagiya and Makani offer treatments that keep your mouth healthy and your smile beautiful.
                  Contact us today.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href={site.bookingHref} variant="white" size="lg">
                    Book an Appointment
                  </Button>
                  <a
                    href={site.phone.href}
                    className="flex h-14 items-center gap-3 rounded-full border border-white/30 px-7 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="size-4" /> {site.phone.display}
                  </a>
                </div>
              </div>
              <div className="relative order-first h-72 self-stretch sm:h-80 lg:order-none lg:h-auto lg:min-h-[34rem]">
                <Image
                  src="/images/hero/girl-smiling.webp"
                  alt="A woman smiling confidently"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="[mask-image:linear-gradient(90deg,transparent,#000_30%)] object-cover object-[60%_center] max-lg:[mask-image:linear-gradient(0deg,transparent,#000_35%)]"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Location */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="relative h-[26rem] overflow-hidden rounded-5xl border border-line bg-mist lg:h-full lg:min-h-[28rem]">
              <iframe
                title={`Map to ${site.name}`}
                src={site.address.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full grayscale-[35%]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-10 rounded-5xl bg-ink p-8 text-white md:p-10">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand-300 uppercase">Visit us</p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">{site.name}</h3>
                <ul className="mt-8 space-y-5 text-white/75">
                  <li className="flex gap-4">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <span>
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.region} {site.address.zip}
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <a href={site.phone.href} className="font-semibold text-white hover:text-brand-300">
                      {site.phone.display}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <Siren className="mt-0.5 size-5 shrink-0 text-brand-400" />
                    <span>Call us for a same-day emergency appointment</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Proudly serving</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/locations/${l.slug}`}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75 transition-colors hover:border-brand-400 hover:bg-white/10 hover:text-white"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
                <Button
                  href={site.address.directions}
                  target="_blank"
                  rel="noopener"
                  variant="primary"
                  className="mt-8 w-full"
                  icon={<Navigation className="size-4" />}
                >
                  Get directions
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
