import type { Metadata } from "next";
import { site } from "@/content/site";
import { utilityPages } from "@/content/pages/utility";
import { topicImages as T } from "@/content/topic-images";
import {
  SitemapExperience,
  type SitemapGroup,
  type SitemapImage,
  type SitemapTask,
} from "@/components/sitemap/sitemap-experience";
import { CtaBand } from "@/components/page/cta-band";
import { JsonLd, pageSchema } from "@/lib/schema";

/** HTML sitemap (sitemap section 10), from the approved draft. */
const page = utilityPages["/sitemap"];

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: "/sitemap" },
};

/* How each sitemap section is presented: chapter, one-line summary and photo. */
const sections: Record<string, { chapter: string; blurb: string; image: SitemapImage; tile?: SitemapImage }> = {
  "Core Pages": {
    chapter: "core-pages",
    blurb: "The practice, the three dentists, the office, reviews, offers and how to reach us.",
    image: T.writingDocuments,
    tile: T.kids5,
  },
  "Patient Information": {
    chapter: "patient-information",
    blurb: "Insurance, payment, forms, scheduling and what to expect at your first visit.",
    image: T.formSigning,
    tile: T.consultDesk,
  },
  "Preventative Care": {
    chapter: "preventative-care",
    blurb: "Cleanings, checkups, gum care, children's dentistry, night guards and emergency visits.",
    image: T.childCheckup,
    tile: T.brushingWoman,
  },
  "Cosmetic Dentistry": {
    chapter: "cosmetic-dentistry",
    blurb: "Invisalign, teeth whitening, porcelain veneers, bonding, inlays and onlays.",
    image: T.smileJoy,
    tile: T.smileGrin,
  },
  "Restorative Dentistry": {
    chapter: "restorative-dentistry",
    blurb: "Fillings, crowns, bridges, implants, dentures, root canals and extractions.",
    image: T.implant,
    tile: T.crown,
  },
  "Areas We Serve": {
    chapter: "areas-we-serve",
    blurb: "The Delaware County towns our patients come from, and treatment pages for nearby towns.",
    image: T.neighborhood,
    tile: T.houseAutumn,
  },
  Blog: {
    chapter: "blog-legal",
    blurb: "Articles from the practice, plus our privacy, HIPAA, accessibility and website notices.",
    image: T.readingDocuments,
  },
  Legal: {
    chapter: "blog-legal",
    blurb: "Privacy, HIPAA, web accessibility and the website disclaimer.",
    image: T.paperwork,
  },
};

const groups: SitemapGroup[] = page.sections.flatMap((s) => {
  const look = s.heading ? sections[s.heading] : undefined;
  if (!s.heading || !look) return [];
  return [
    {
      title: s.heading,
      ...look,
      links: s.items.flatMap((i) => (i.type === "link" ? [{ text: i.text, href: i.href }] : [])),
    },
  ];
});

const tasks: SitemapTask[] = [
  {
    title: "Request an appointment",
    text: "Pick a day and time and the front desk confirms it with you.",
    href: site.bookingHref,
    image: T.calendar,
  },
  {
    title: "Insurance & payment",
    text: "The plans we work with, CareCredit and the in-house savings plan.",
    href: "/patient-information/insurance-payment-options",
    image: T.cardPayment,
  },
  {
    title: "Dental emergency",
    text: "Tooth pain, a broken tooth or swelling: call and we will fit you in.",
    href: "/emergency-dentist-delaware-county-pa",
    image: T.toothache,
  },
  {
    title: "New patients",
    text: "What to bring, the forms to fill in and how the first visit goes.",
    href: "/patient-information/new-patients",
    image: T.formReview,
  },
];

export default function SitemapPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/sitemap",
          name: page.title,
          description: page.description,
          crumbs: [{ label: "Home", href: "/" }, { label: "Sitemap" }],
        })}
      />
      <SitemapExperience
        intro={page.intro[0]}
        groups={groups}
        tasks={tasks}
        phone={{ display: site.phone.display, href: site.phone.href }}
      />
      <CtaBand
        image={T.insurance3.src}
        imageAlt={T.insurance3.alt}
        title={
          <>
            Still can&apos;t find it? <span className="text-glow">Ask us.</span>
          </>
        }
        text={`Call ${site.phone.display} and the front desk will point you to the right page, or straight to the right appointment.`}
      />
    </>
  );
}
