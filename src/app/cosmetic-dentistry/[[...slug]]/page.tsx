import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cosmeticPages } from "@/content/pages/cosmetic";
import { topicImages as T, type TopicImage } from "@/content/topic-images";
import { DraftPageView, officeAlt, type DraftLook } from "@/components/draft/draft-page";
import { TreatmentCards } from "@/components/draft/treatment-cards";

/** The 6 Cosmetic Dentistry pages (sitemap section 04), rendered from their approved drafts. */
export const instant = false;

const BASE = "/cosmetic-dentistry";
const office = (f: string) => `/images/office/${f}`;
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
    images: [T.smileCloseup, T.smileGrin, T.shadeGuide, T.consultXray, T.cardPayment],
    dark: 3,
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  [`${BASE}/invisalign`]: {
    name: "Invisalign",
    eyebrow: "Invisalign clear aligners",
    hero: T.alignerSmile,
    images: [null, T.alignersHands, T.scan3d, T.consultDesk, T.smileYoung, T.digitalLab, T.cardPayment, T.aligner],
    dark: 3,
    ctaImage: office("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  [`${BASE}/teeth-whitening`]: {
    name: "Teeth Whitening",
    eyebrow: "Teeth whitening",
    hero: T.whiteningShade,
    images: [
      null,
      T.smileLips,
      T.aligner,
      T.shadeGuide,
      T.smileGrin,
      T.treatmentChair,
      T.toothache,
      T.calendar,
      T.piggyBank,
    ],
    dark: 4,
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  [`${BASE}/dental-bonding`]: {
    name: "Dental Bonding",
    eyebrow: "Dental bonding",
    hero: T.shadeGuide,
    images: [T.smileLips, T.treatmentCloseup, T.smilePortrait, T.veneers, T.calendar, T.brushingWoman, T.cardPayment],
    dark: 1,
    ctaImage: office("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  [`${BASE}/inlays-onlays`]: {
    name: "Inlays & Onlays",
    eyebrow: "Inlays and onlays",
    hero: T.crown,
    images: [T.xrayTablet, T.treatmentCloseup, T.scan3d, T.microscope, T.calendar],
    dark: 3,
    accent: "Onlays",
    ctaImage: office("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
  },
  [`${BASE}/porcelain-veneers`]: {
    name: "Porcelain Veneers",
    eyebrow: "Porcelain veneers",
    hero: T.veneers,
    images: [
      null,
      T.smileLips,
      T.smileGrin,
      T.scan3d,
      T.xrayTablet,
      T.shadeGuide,
      T.microscope,
      T.treatmentCloseup,
      T.piggyBank,
      T.consultXray,
    ],
    dark: 6,
    ctaImage: office("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
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
                  image: T.alignerSmile,
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
                  image: T.veneers,
                },
                {
                  title: "Dental Bonding",
                  text: "Tooth-coloured resin for chips and small gaps.",
                  href: `${BASE}/dental-bonding`,
                  image: T.shadeGuide,
                },
                {
                  title: "Inlays & Onlays",
                  text: "Lab-made porcelain for more than a filling, less than a crown.",
                  href: `${BASE}/inlays-onlays`,
                  image: T.crown,
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
