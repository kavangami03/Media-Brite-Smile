import Image from "next/image";
import type { ReactNode } from "react";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ToothWatermark } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";

/** Closing call to action: brand card with a real office photo, both CTAs and the address. */
export function CtaBand({
  title,
  text,
  primary = { label: "Request an Appointment", href: site.bookingHref },
  image = "/images/office/office-5.jpg",
  imageAlt = `Reception at ${site.name}, ${site.address.city} PA`,
  id = "cta-heading",
}: {
  title: ReactNode;
  text: ReactNode;
  primary?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  id?: string;
}) {
  return (
    <section className="bg-white section-y" aria-labelledby={id}>
      <div className="container-site">
        <Reveal>
          <div className="relative isolate grid grid-cols-1 overflow-hidden rounded-4xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-900 sm:rounded-5xl lg:grid-cols-[1.1fr_0.9fr]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-32 -left-20 size-120 rounded-full glow-blob text-glow/30" />
              <ToothWatermark size={460} className="absolute -bottom-40 left-[30%] text-white/7" />
            </div>
            <div className="p-7 sm:p-12 lg:p-16">
              <SplitReveal as="h2" id={id} className="text-display-md font-bold text-balance text-white">
                {title}
              </SplitReveal>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">{text}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={primary.href} variant="white" size="lg">
                  {primary.label}
                </Button>
                <Button href={site.phone.href} variant="outline-light" size="lg" icon={<Phone className="size-4" />}>
                  {site.phone.display}
                </Button>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-white/70">
                <MapPin className="size-4 shrink-0 text-glow" /> {site.address.full}
              </p>
            </div>
            <div className="relative order-first min-h-64 sm:min-h-80 lg:order-none lg:min-h-0">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover max-lg:mask-[linear-gradient(0deg,transparent,#000_40%)] lg:mask-[linear-gradient(90deg,transparent,#000_35%)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
