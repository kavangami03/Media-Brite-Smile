import type { Metadata } from "next";
import { topicImages as T } from "@/content/topic-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, FileCheck2, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { FaqAccordion, type QA } from "@/components/page/faq-accordion";
import { Steps } from "@/components/page/bits";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";

const title = "Smile Makeover Before and After | Media, PA";
const description =
  "Before-and-after results from patients at Media Brite Smile in Media, PA: veneers, whitening, bonding, implants and crowns. Every case published with written consent.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us/smile-gallery" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Smile Gallery" },
];

const faqs: QA[] = [
  {
    q: "How long does a smile makeover take?",
    a: "It depends entirely on which treatments are involved. Whitening and bonding can finish within a couple of visits. Veneers usually take two or three appointments across a few weeks. Implants run over several months because the bone needs time to heal around the post.",
  },
  {
    q: "Will my results look like these photos?",
    a: "Nobody can promise a specific result from a photo of someone else, because the starting point, bite and bone are different for every patient. What a consultation can give you is a realistic idea of what is achievable for your teeth, and what each option would involve.",
  },
  {
    q: "Are these real patients?",
    a: "Any before-and-after case shown here is a patient treated at this practice, published with their written consent. The photos on the cards today show the treatments themselves, such as shade guides and models, not patients. We never present a stock photo as someone’s result.",
  },
];

/* Card photos are licensed Pexels images of the treatments (see docs/image-licenses.md). */
const cosmetic = [
  {
    title: "Porcelain veneers",
    href: "/cosmetic-dentistry/porcelain-veneers",
    note: "Shape, colour and alignment",
    image: "/images/gallery/gallery-veneers.jpg",
    alt: "A row of porcelain tooth shade samples",
  },
  {
    title: "Dental bonding",
    href: "/cosmetic-dentistry/dental-bonding",
    note: "A chipped front tooth",
    image: "/images/gallery/gallery-bonding.jpg",
    alt: "Gloved hands holding a tooth shade guide used to match colour",
  },
  {
    title: "Teeth whitening",
    href: "/cosmetic-dentistry/teeth-whitening",
    note: "Take-home whitening kit",
    image: "/images/gallery/gallery-whitening.jpg",
    alt: "A clear dental tray held in gloved hands",
    position: "50% 30%",
  },
];

const restorative = [
  {
    title: "Single dental implant",
    href: "/restorative-dentistry/dental-implants",
    note: "Replacing one missing tooth",
    image: "/images/gallery/gallery-implant.jpg",
    alt: "A model showing a dental implant post and crown beside natural teeth",
  },
  {
    title: "Dental crown",
    href: "/restorative-dentistry/dental-crowns",
    note: "A damaged molar",
    image: "/images/gallery/gallery-crown.jpg",
    alt: "A dental model with crowns on the back teeth",
    position: "65% 70%",
  },
  {
    title: "Dentures",
    href: "/restorative-dentistry/dentures",
    note: "Full and partial",
    image: "/images/gallery/gallery-dentures.jpg",
    alt: "A model of a full set of upper and lower dentures",
  },
];

/** A treatment card: a photo of the treatment itself, never framed as a before/after result. */
function CaseCard({
  title: t,
  href,
  note,
  image,
  alt,
  position = "50% 50%",
}: {
  title: string;
  href: string;
  note: string;
  image: string;
  alt: string;
  position?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-lift"
    >
      <span className="relative block aspect-4/3 overflow-hidden bg-mist">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width:768px) 32vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
          style={{ objectPosition: position }}
        />
      </span>
      <span className="flex flex-1 items-center justify-between gap-4 p-6">
        <span>
          <span className="block text-xl font-bold tracking-tight text-ink">{t}</span>
          <span className="mt-0.5 block text-sm text-body">{note}</span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </span>
    </Link>
  );
}

export default function SmileGalleryPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/about-us/smile-gallery", name: title, description, crumbs, faqs })} />

      <PageHero
        eyebrow="Smile gallery"
        title={
          <>
            Smile makeover <span className="text-brand-500">before and after</span>
          </>
        }
        lead="Results from patients treated at Media Brite Smile in Media, PA, published only with their written permission. Each card shows the treatment itself, and real cases are added as patients clear them."
        primary={{ label: "Book a Cosmetic Consultation", href: site.bookingHref }}
        aside={
          <div className="relative pb-8">
            <ImageReveal immediate delay={0.2} className="aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl">
              <Image
                data-reveal-media
                src="/images/office/operatory-3.jpg"
                alt={`Treatment room at ${site.name}, Media PA`}
                fill
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="absolute bottom-0 left-4 grid max-w-xs gap-2 sm:left-6 lg:-left-8">
              {[
                { icon: FileCheck2, t: "Written consent for every case" },
                { icon: Camera, t: "Patients treated at this practice" },
                { icon: Sparkles, t: "Never a stand-in result" },
              ].map(({ icon: Icon, t }) => (
                <span
                  key={t}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-lift ring-1 ring-line"
                >
                  <Icon className="size-4 shrink-0 text-brand-500" /> {t}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* ---------- Cosmetic ---------- */}
      <section className="bg-white section-y" aria-labelledby="cosmetic-heading">
        <div className="container-site">
          <SectionHead
            id="cosmetic-heading"
            eyebrow="Cosmetic cases"
            title={
              <>
                Look at the <span className="text-brand-500">starting point</span>, not just the result
              </>
            }
            lead="Veneers, bonding and whitening change the colour, shape and alignment of teeth that are otherwise healthy. The useful question is not “is that a nice smile” but “did they start where I am starting”."
            aside={
              <Link
                href="/cosmetic-dentistry"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
              >
                All cosmetic dentistry <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {cosmetic.map((c) => (
              <RevealItem key={c.href}>
                <CaseCard {...c} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Restorative ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="restorative-heading">
        <div className="container-site">
          <SectionHead
            id="restorative-heading"
            eyebrow="Restorative and implant cases"
            title={
              <>
                A crown that fits is the one <span className="text-brand-500">nobody notices</span>
              </>
            }
            lead="Restorative work replaces what is missing or repairs what is broken, and the cosmetic result follows from doing that well. It is where the microscopes earn their keep."
            aside={
              <Link
                href="/restorative-dentistry"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
              >
                All restorative dentistry <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {restorative.map((c) => (
              <RevealItem key={c.href}>
                <CaseCard {...c} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- How a makeover starts ---------- */}
      <section className="relative isolate overflow-hidden bg-ink section-y text-white" aria-labelledby="start-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-32 size-160 rounded-full glow-blob text-brand-500/25" />
        </div>
        <div className="container-site">
          <SectionHead
            id="start-heading"
            tone="light"
            eyebrow="How a smile makeover starts"
            title={
              <>
                A plan, not a <span className="text-glow">single treatment</span>
              </>
            }
          />
          <Reveal className="mt-12">
            <Steps
              tone="light"
              items={[
                { title: "Examination", text: "A full look at your teeth and gums, with any X-rays you are due." },
                { title: "Conversation", text: "What bothers you about your smile, in your own words." },
                {
                  title: "The plan",
                  text: "Which treatments would get you there, in what order, and what each one costs.",
                },
                { title: "Often less work", text: "Whitening and one bonded tooth can be enough. You decide." },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white section-y" aria-labelledby="gallery-faq-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            id="gallery-faq-heading"
            eyebrow="Gallery questions"
            title={
              <>
                Before you <span className="text-brand-500">compare</span>
              </>
            }
          />
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Find out what is possible <span className="text-glow">for your teeth</span>
          </>
        }
        text="Book a consultation and get a plan with the costs set out before anything starts."
        primary={{ label: "Book a Cosmetic Consultation", href: site.bookingHref }}
        image={T.cosmeticTools4.src}
        imageAlt={T.cosmeticTools4.alt}
      />
    </>
  );
}
