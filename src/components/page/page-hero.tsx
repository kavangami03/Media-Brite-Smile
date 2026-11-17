import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ToothWatermark } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page hero: eyebrow, H1, lead and the two CTAs on the left,
 * a page-specific visual on the right. `children` renders under the CTAs (chips, facts).
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  primary = { label: "Request an Appointment", href: site.bookingHref },
  aside,
  children,
  actions = true,
  id = "page-title",
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  primary?: { label: string; href: string };
  aside?: ReactNode;
  children?: ReactNode;
  /** false hides the two buttons, for a page whose aside already is the action (the contact form) */
  actions?: boolean;
  id?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-pearl pt-30 pb-12 lg:pt-36 lg:pb-16" aria-labelledby={id}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -right-40 size-160 rounded-full glow-blob text-glow/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_158_203/0.12)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_20%_30%,#000_10%,transparent_60%)] bg-size-[28px_28px]" />
        <ToothWatermark size={520} className="absolute -bottom-56 -left-40 text-brand-500/5" />
      </div>
      <div className="container-site">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12",
            aside && "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20",
          )}
        >
          <div className="min-w-0">
            <Eyebrow>{eyebrow}</Eyebrow>
            <SplitReveal as="h1" id={id} immediate className="mt-6 text-display-lg font-bold text-balance">
              {title}
            </SplitReveal>
            <Reveal delay={0.25} y={24}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">{lead}</p>
              {actions && (
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={primary.href} size="lg">
                    {primary.label}
                  </Button>
                  {primary.href.startsWith("tel:") ? (
                    <Button href={site.bookingHref} variant="outline" size="lg">
                      Request an Appointment
                    </Button>
                  ) : (
                    <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" />}>
                      Call {site.phone.display}
                    </Button>
                  )}
                </div>
              )}
              {children}
            </Reveal>
          </div>
          {aside && (
            <Reveal delay={0.15} y={40} className="min-w-0">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
