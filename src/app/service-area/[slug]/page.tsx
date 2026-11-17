import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceLocationPages } from "@/content/pages/service-location";
import { topicImages as T, ctaOf, type TopicImage } from "@/content/topic-images";
import { DraftPageView, type DraftLook } from "@/components/draft/draft-page";

/**
 * The 9 Service + Location pages (sitemap section 07). Served at their sitemap URLs,
 * e.g. /dental-implants-swarthmore-pa, through a rewrite in next.config.ts.
 */
export const instant = false;

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
    hero: T.implant4,
    images: [T.consultDesk4, T.models8, T.xray9, T.driving, T.cardPayment4, T.piggyBank7],
    dark: 1,
    ...ctaOf(T.happyPatient5),
  },
  "dental-implants-delaware-county-pa": {
    name: "Dental Implants, Delaware County",
    parent: implants,
    eyebrow: "Dental implants · Delaware County",
    hero: T.implant5,
    images: [T.consultXray2, T.xray10, T.scan3d4, T.driving, T.cardPayment5, T.piggyBank8],
    dark: 1,
    ...ctaOf(T.happyPatient6),
  },
  "dental-implants-springfield-pa": {
    name: "Dental Implants, Springfield",
    parent: implants,
    eyebrow: "Dental implants · Springfield",
    hero: T.implant2,
    images: [T.consultDesk5, T.crown2, T.xray5, T.driving, T.piggyBank9],
    dark: 2,
    accent: "Springfield",
    ...ctaOf(T.booking1),
  },
  "dental-implants-swarthmore-pa": {
    name: "Dental Implants, Swarthmore",
    parent: implants,
    eyebrow: "Dental implants · Swarthmore",
    hero: T.implant4,
    images: [null, T.consultXray3, T.xray6, T.driving2, T.cardPayment6, T.insurance5],
    dark: 2,
    accent: "Swarthmore, PA",
    ...ctaOf(T.booking2),
  },
  "emergency-dentist-delaware-county-pa": {
    name: "Emergency Dentist, Delaware County",
    parent: emergency,
    eyebrow: "Emergency dentist · Delaware County",
    hero: T.toothache2,
    images: [null, T.phoneCall4, null, T.driving3, T.comfort6, T.cardPayment7],
    dark: 4,
    accent: "Delaware County, PA",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ...ctaOf(T.booking3),
  },
  "emergency-dentist-springfield-pa": {
    name: "Emergency Dentist, Springfield",
    parent: emergency,
    eyebrow: "Emergency dentist · Springfield",
    hero: T.toothache3,
    images: [null, T.phoneCall2, T.driving4, null, null, T.cardPayment8],
    dark: 3,
    accent: "Springfield, Delaware County",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ...ctaOf(T.smileCloseup),
  },
  "emergency-dentist-swarthmore-pa": {
    name: "Emergency Dentist, Swarthmore",
    parent: emergency,
    eyebrow: "Emergency dentist · Swarthmore",
    hero: T.toothache4,
    images: [null, T.phoneCall3, T.consultDesk6, T.driving5, null, T.calendar6, T.cardPayment9],
    dark: 4,
    accent: "Swarthmore, PA",
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ...ctaOf(T.smileYoung),
  },
  "invisalign-springfield-pa": {
    name: "Invisalign, Springfield",
    parent: { label: "Invisalign", href: "/cosmetic-dentistry/invisalign" },
    eyebrow: "Invisalign · Springfield",
    hero: T.alignerSmile,
    images: [T.smile11, T.calendar7, T.driving7, T.scan3d2, T.cardPayment2],
    dark: 3,
    accent: "Springfield, Delaware County",
    ...ctaOf(T.smileJoy),
  },
  "dentures-brookhaven-pa": {
    name: "Dentures, Brookhaven",
    parent: { label: "Dentures", href: "/restorative-dentistry/dentures" },
    eyebrow: "Dentures · Brookhaven",
    hero: T.dentureModels,
    images: [T.models9, T.treatmentCloseup7, T.driving2, T.crown3, T.cardPayment3],
    dark: 1,
    accent: "Brookhaven, PA",
    ...ctaOf(T.smile7),
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
