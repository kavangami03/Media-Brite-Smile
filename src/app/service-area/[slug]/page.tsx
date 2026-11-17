import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceLocationPages } from "@/content/pages/service-location";
import { topicImages as T, type TopicImage } from "@/content/topic-images";
import { DraftPageView, officeAlt, type DraftLook } from "@/components/draft/draft-page";

/**
 * The 9 Service + Location pages (sitemap section 07). Served at their sitemap URLs,
 * e.g. /dental-implants-swarthmore-pa, through a rewrite in next.config.ts.
 */
export const instant = false;

const office = (f: string) => `/images/office/${f}`;
type Look = Omit<DraftLook, "crumbs" | "image" | "imageAlt"> & {
  name: string;
  parent: { label: string; href: string };
  hero: TopicImage;
  images: (TopicImage | null)[];
};

const implants = { label: "Dental Implants", href: "/restorative-dentistry/dental-implants" };
const emergency = { label: "Emergency Dentistry", href: "/preventative-care/emergency-dentistry" };

const looks: Record<string, Look> = {
  "dental-implants-brookhaven-pa": {
    name: "Dental Implants, Brookhaven",
    parent: implants,
    eyebrow: "Dental implants · Brookhaven",
    hero: T.implant,
    images: [T.consultDesk, T.dentureModels, T.xrayMonitor, T.driving, T.cardPayment, T.piggyBank],
    dark: 1,
    ctaImage: office("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
  },
  "dental-implants-delaware-county-pa": {
    name: "Dental Implants, Delaware County",
    parent: implants,
    eyebrow: "Dental implants · Delaware County",
    hero: T.implant,
    images: [T.consultXray, T.xrayMonitor, T.scan3d, T.driving, T.cardPayment, T.piggyBank],
    dark: 1,
    ctaImage: office("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
  },
  "dental-implants-springfield-pa": {
    name: "Dental Implants, Springfield",
    parent: implants,
    eyebrow: "Dental implants · Springfield",
    hero: T.implant,
    images: [T.consultDesk, T.crown, T.xrayMonitor, T.driving, T.piggyBank],
    dark: 2,
    accent: "Springfield",
    ctaImage: office("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
  },
  "dental-implants-swarthmore-pa": {
    name: "Dental Implants, Swarthmore",
    parent: implants,
    eyebrow: "Dental implants · Swarthmore",
    hero: T.implant,
    images: [null, T.consultXray, T.xrayMonitor, T.driving, T.cardPayment, T.piggyBank],
    dark: 2,
    accent: "Swarthmore, PA",
    ctaImage: office("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
  },
  "emergency-dentist-delaware-county-pa": {
    name: "Emergency Dentist, Delaware County",
    parent: emergency,
    eyebrow: "Emergency dentist · Delaware County",
    hero: T.toothache,
    images: [null, T.phoneCall, null, T.driving, T.coldCompress, T.cardPayment],
    dark: 4,
    accent: "Delaware County, PA",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  "emergency-dentist-springfield-pa": {
    name: "Emergency Dentist, Springfield",
    parent: emergency,
    eyebrow: "Emergency dentist · Springfield",
    hero: T.toothache,
    images: [null, T.phoneCall, T.driving, T.coldCompress, null, T.cardPayment],
    dark: 3,
    accent: "Springfield, Delaware County",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  "emergency-dentist-swarthmore-pa": {
    name: "Emergency Dentist, Swarthmore",
    parent: emergency,
    eyebrow: "Emergency dentist · Swarthmore",
    hero: T.toothache,
    images: [null, T.phoneCall, T.consultDesk, T.driving, T.coldCompress, T.calendar, T.cardPayment],
    dark: 4,
    accent: "Swarthmore, PA",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  "invisalign-springfield-pa": {
    name: "Invisalign, Springfield",
    parent: { label: "Invisalign", href: "/cosmetic-dentistry/invisalign" },
    eyebrow: "Invisalign · Springfield",
    hero: T.alignerSmile,
    images: [T.alignersHands, T.calendar, T.driving, T.scan3d, T.cardPayment],
    dark: 3,
    accent: "Springfield, Delaware County",
    ctaImage: office("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  "dentures-brookhaven-pa": {
    name: "Dentures, Brookhaven",
    parent: { label: "Dentures", href: "/restorative-dentistry/dentures" },
    eyebrow: "Dentures · Brookhaven",
    hero: T.dentureModels,
    images: [T.dentures, T.treatmentCloseup, T.driving, T.implant, T.cardPayment],
    dark: 1,
    accent: "Brookhaven, PA",
    ctaImage: office("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
  },
};

export function generateStaticParams() {
  return Object.keys(looks).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/service-area/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = serviceLocationPages[`/${slug}`];
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: { title: page.title, description: page.description, url: page.url },
  };
}

export default async function ServiceLocationPage({ params }: PageProps<"/service-area/[slug]">) {
  const { slug } = await params;
  const page = serviceLocationPages[`/${slug}`];
  const look = looks[slug];
  if (!page || !look) notFound();

  const crumbs = [{ label: "Home", href: "/" }, look.parent, { label: look.name }];
  return <DraftPageView page={page} look={{ ...look, crumbs, image: look.hero.src, imageAlt: look.hero.alt }} />;
}
