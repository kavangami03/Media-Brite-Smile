import Link from "next/link";
import { Check, ChevronRight, MapPin, Navigation, Phone, Star } from "lucide-react";
import { site, type Location } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BrandTooth } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";

const trust = ["New patients welcome", "Same-day emergency appointments", "Mercury-free, gentle care"];

/** Location hero: copy on the left, a live Google route from the town to the office on the right. */
export function LocationHero({ location }: { location: Location }) {
  const { name, isHome } = location;

  const intro = isHome
    ? `Media Brite Smile is right here in Media. Since ${site.since}, our dentists have provided family, cosmetic and implant dentistry for patients of all ages, with modern technology and a genuinely caring approach.`
    : `Patients from ${name} choose Media Brite Smile for family, cosmetic and implant dentistry. Our office at ${site.address.street} in Media welcomes new patients of all ages from ${name} and the surrounding communities.`;

  return (
    <section
      className="relative overflow-hidden bg-pearl pt-32 pb-14 lg:pt-40 lg:pb-20"
      aria-labelledby="location-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-160 rounded-full bg-brand-200/45 blur-[140px]" />
        <div className="absolute right-0 bottom-0 size-140 rounded-full bg-glow/20 blur-[140px]" />
      </div>

      <div className="relative container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------------- Copy ---------------- */}
        <div className="lg:col-span-6">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li>
                <Link href="/locations" className="hover:text-ink">
                  Locations
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-ink">
                {name}, PA
              </li>
            </ol>
          </nav>

          <Eyebrow>Serving {name}, PA</Eyebrow>
          <SplitReveal as="h1" id="location-title" immediate className="mt-6 text-display-lg font-bold">
            {isHome ? (
              <>
                Your dentist in <span className="text-brand-500">Media</span>, PA
              </>
            ) : (
              <>
                Your dentist near <span className="text-brand-500">{name}</span>, PA
              </>
            )}
          </SplitReveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.bookingHref} size="lg">
                Book an Appointment
              </Button>
              <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" />}>
                {site.phone.display}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:gap-8">
              <a href={site.social.google} target="_blank" rel="noopener" className="flex shrink-0 items-center gap-3">
                <span className="text-4xl leading-none font-bold tracking-tighter text-ink">{site.rating.score}</span>
                <span className="leading-tight">
                  <span className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{site.rating.count} Google reviews</span>
                </span>
              </a>
              <ul className="space-y-1.5">
                {trust.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm font-medium text-ink/80">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Area map ---------------- */}
        <Reveal delay={0.2} className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-5xl bg-mist shadow-lift ring-1 ring-line">
            <iframe
              title={isHome ? `Map of ${site.name}` : `Driving route from ${name}, PA to ${site.name}`}
              src={location.routeEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full sm:h-104 lg:h-128"
            />

            {/* Route card */}
            <div className="border-t border-line bg-white p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center py-1" aria-hidden="true">
                    <span className="size-3 rounded-full border-2 border-brand-500 bg-white" />
                    <span className="my-1 w-px flex-1 border-l-2 border-dashed border-brand-200" />
                    <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-white">
                      <MapPin className="size-3.5" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                        {isHome ? "You are in" : "From"}
                      </p>
                      <p className="font-semibold text-ink">{name}, PA</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <BrandTooth size={18} className="mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">To</p>
                        <p className="font-semibold text-ink">{site.name}</p>
                        <p className="text-sm text-body">{site.address.full}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  href={location.directions}
                  target="_blank"
                  rel="noopener"
                  variant="dark"
                  className="w-full sm:w-auto"
                  icon={<Navigation className="size-4" />}
                >
                  Get directions
                </Button>
              </div>
              {!isHome && (
                <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
                  Live drive time and distance are shown on the map and update with traffic in Google Maps.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
