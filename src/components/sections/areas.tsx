import { Car, MapPin, Navigation, Route } from "lucide-react";
import { towns } from "@/content/towns";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AreaFinder } from "@/components/location/area-finder";

/* "Which Areas Around Media Do You Serve?" from the approved Home draft v2,
   with the same live town picker and route map as the Areas We Serve page. */
const minutes = towns.map((t) => Number(t.drive.time?.match(/\d+/)?.[0])).filter((n) => Number.isFinite(n) && n > 0);
const facts = [
  { icon: MapPin, value: `${towns.length} towns`, label: "across eastern and central Delaware County" },
  { icon: Car, value: `${Math.min(...minutes)}–${Math.max(...minutes)} min`, label: "drive to 8 N Pennell Rd" },
  { icon: Route, value: "Media, 19063", label: "including Upper Providence Township and Rose Tree" },
];

export function Areas() {
  return (
    <section className="bg-white section-y" aria-labelledby="areas-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>Areas we serve</Eyebrow>
            <SplitReveal as="h2" id="areas-heading" className="mt-6 max-w-4xl text-display-md font-bold text-balance">
              Which areas around <span className="text-brand-500">Media</span> do you serve?
            </SplitReveal>
            <Reveal>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                Patients travel to 8 N Pennell Rd from across eastern and central Delaware County. Pennell Road (PA-452)
                runs south from Media toward Aston, and the main routes in are Baltimore Pike (US-1), Providence Road
                (PA-252) and Pennell Road itself.
              </p>
            </Reveal>
          </div>
          <Reveal className="flex flex-wrap gap-3 lg:col-span-4 lg:flex-col lg:items-end">
            <Button href="/areas-we-serve" variant="dark">
              Find your town and how to get here
            </Button>
            <Button href="/contact-us" variant="outline" icon={<Navigation className="size-4" />}>
              Directions, map and hours
            </Button>
          </Reveal>
        </div>

        <RevealGroup stagger={0.07} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {facts.map(({ icon: Icon, value, label }) => (
            <RevealItem key={value}>
              <div className="flex h-full items-center gap-4 rounded-3xl bg-pearl p-4 ring-1 ring-line sm:p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-glow">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xl font-bold tracking-tight text-ink">{value}</span>
                  <span className="block text-sm leading-snug text-body">{label}</span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6" y={50}>
          <AreaFinder />
        </Reveal>
      </div>
    </section>
  );
}
