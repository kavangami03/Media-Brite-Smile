import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cosmeticPages } from "@/content/pages/cosmetic";
import { topicImages as T, ctaOf, type TopicImage } from "@/content/topic-images";
import { DraftPageView, type DraftLook } from "@/components/draft/draft-page";
import { TreatmentCards } from "@/components/draft/treatment-cards";

/** The 6 Cosmetic Dentistry pages (sitemap section 04), rendered from their approved drafts. */
export const instant = false;

const BASE = "/cosmetic-dentistry";
const hub = { label: "Cosmetic Dentistry", href: BASE };

type Look = Omit<DraftLook, "crumbs" | "image" | "imageAlt"> & {
  name: string;
  hero: TopicImage;
  images: (TopicImage | null)[];
};

/* Hero photo, section photos (by draft section order), dark band and CTA photo per page. */
const looks: Record<string, Look> = {
  [BASE]: {
    name: "Cosmetic Dentistry",
    eyebrow: "Cosmetic dentistry",
    hero: T.smileJoy,
    images: [T.smileCloseup, T.smileGrin, T.cosmeticTools4, T.consultXray4, T.cardPayment5],
    dark: 3,
    ...ctaOf(T.smile8),
  },
  [`${BASE}/invisalign`]: {
    name: "Invisalign",
    eyebrow: "Invisalign clear aligners",
    hero: T.alignerSmile,
    images: [null, T.alignersHands, T.scan3d3, T.consultDesk6, T.smileYoung, T.digitalLab, T.cardPayment6, T.smilePortrait],
    dark: 3,
    ...ctaOf(T.smile9),
  },
  [`${BASE}/teeth-whitening`]: {
    name: "Teeth Whitening",
    eyebrow: "Teeth whitening",
    hero: T.whiteningShade,
    images: [
      null,
      T.smileLips,
      T.alignersHands,
      T.cosmeticTools5,
      T.smile7,
      T.treatmentChair2,
      T.toothache2,
      T.calendar2,
      T.piggyBank2,
    ],
    dark: 4,
    ...ctaOf(T.cosmeticTools6),
  },
  [`${BASE}/dental-bonding`]: {
    name: "Dental Bonding",
    eyebrow: "Dental bonding",
    hero: T.shadeGuide,
    images: [T.smile8, T.treatmentCloseup7, T.smilePortrait, T.veneers, T.calendar3, T.brushingWoman, T.cardPayment7],
    dark: 1,
    ...ctaOf(T.cosmeticTools5),
  },
  [`${BASE}/inlays-onlays`]: {
    name: "Inlays & Onlays",
    eyebrow: "Inlays and onlays",
    hero: T.crown2,
    images: [T.xray5, T.dentistHandpiece, T.scan3d4, T.microscope, T.calendar4],
    dark: 3,
    accent: "Onlays",
    ...ctaOf(T.smile10),
  },
  [`${BASE}/porcelain-veneers`]: {
    name: "Porcelain Veneers",
    eyebrow: "Porcelain veneers",
    hero: T.veneers,
    images: [
      null,
      T.smile9,
      T.smile10,
      T.scan3d2,
      T.xray6,
      T.cosmeticTools6,
      T.microscope1,
      T.treatmentCloseup6,
      T.piggyBank3,
      T.consultXray5,
    ],
    dark: 6,
    ...ctaOf(T.cosmeticTools7),
  },
};

const urlFor = (slug?: string[]) => (slug?.length ? `${BASE}/${slug.join("/")}` : BASE);

export function generateStaticParams() {
  return Object.keys(cosmeticPages).map((url) => ({
    slug: url === BASE ? [] : url.slice(BASE.length + 1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps<"/cosmetic-dentistry/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = cosmeticPages[urlFor(slug)];
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: { title: page.title, description: page.description, url: page.url },
  };
}

export default async function CosmeticPage({ params }: PageProps<"/cosmetic-dentistry/[[...slug]]">) {
  const { slug } = await params;
  const url = urlFor(slug);
  const page = cosmeticPages[url];
  const look = looks[url];
  if (!page || !look) notFound();

  const crumbs = [{ label: "Home", href: "/" }, ...(url === BASE ? [] : [hub]), { label: look.name }];

  /* The hub gets a photo card grid of the five treatments after "Cosmetic Dentistry Treatments". */
  const extras =
    url === BASE
      ? {
          2: (
            <TreatmentCards
              eyebrow="The treatments"
              title={
                <>
                  Five ways to change <span className="text-brand-500">how your smile looks</span>
                </>
              }
              cards={[
                {
                  title: "Invisalign",
                  text: "Clear aligners with Dr. Zan Chaudhary, who is Invisalign certified.",
                  href: `${BASE}/invisalign`,
                  image: T.alignersHands,
                  tag: "$1,000 off",
                },
                {
                  title: "Teeth Whitening",
                  text: "Take-home whitening kits with lifetime refills.",
                  href: `${BASE}/teeth-whitening`,
                  image: T.smilePortrait,
                  tag: "$100 off",
                },
                {
                  title: "Porcelain Veneers",
                  text: "Porcelain shaped to change colour, shape and alignment.",
                  href: `${BASE}/porcelain-veneers`,
                  image: T.cosmeticTools7,
                },
                {
                  title: "Dental Bonding",
                  text: "Tooth-coloured resin for chips and small gaps.",
                  href: `${BASE}/dental-bonding`,
                  image: T.whiteningShade,
                },
                {
                  title: "Inlays & Onlays",
                  text: "Lab-made porcelain for more than a filling, less than a crown.",
                  href: `${BASE}/inlays-onlays`,
                  image: T.crown5,
                },
              ]}
            />
          ),
        }
      : undefined;

  return (
    <DraftPageView page={page} look={{ ...look, crumbs, image: look.hero.src, imageAlt: look.hero.alt, extras }} />
  );
}
