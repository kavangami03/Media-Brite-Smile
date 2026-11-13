import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, type Location } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/** The three care categories as photo cards with direct service links. */
export function CareGrid({ location }: { location: Location }) {
  return (
    <section className="bg-pearl section-y" aria-labelledby="care-heading">
      <div className="container-site">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Our services</Eyebrow>
            <SplitReveal as="h2" id="care-heading" className="mt-6 text-display-md font-bold">
              Complete care for <span className="text-brand-500">{location.name}</span> families
            </SplitReveal>
          </div>
          <p className="text-lg leading-relaxed lg:col-span-5">
            Checkups, cosmetic work, implants and repairs all happen under one roof, with safe, mercury-free and
            minimally invasive procedures.
          </p>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
          {serviceGroups.map((g) => (
            <RevealItem key={g.id} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-soft ring-1 ring-line">
                <Link href={g.href} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.title}
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {g.links.length} services
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight">{g.title}</h3>
                  <p className="mt-2 text-sm md:min-h-[2lh]">{g.blurb}</p>
                  <ul className="mt-5 space-y-1">
                    {g.links.slice(0, 5).map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group/l flex items-center justify-between border-b border-line py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-brand-600"
                        >
                          {l.label}
                          <ArrowUpRight className="size-4 text-brand-500 transition-transform duration-500 group-hover/l:rotate-45" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={g.href}
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    All {g.links.length} {g.label.toLowerCase()} services
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
