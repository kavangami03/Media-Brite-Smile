import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { restorativePages } from "@/content/pages/restorative";
import { topicImages as T, type TopicImage } from "@/content/topic-images";
import { DraftPageView, officeAlt, type DraftLook } from "@/components/draft/draft-page";
import { TreatmentCards } from "@/components/draft/treatment-cards";

/** The 19 Restorative Dentistry pages (sitemap section 05), rendered from their approved drafts. */
export const instant = false;

const BASE = "/restorative-dentistry";
const DENT = `${BASE}/dentures`;
const office = (f: string) => `/images/office/${f}`;

type Look = Omit<DraftLook, "crumbs" | "image" | "imageAlt"> & {
  name: string;
  hero: TopicImage;
  /** one photo per draft section, by section order (null = no photo); never repeats the hero */
  images: (TopicImage | null)[];
};

const cta = {
  op1: { ctaImage: office("operatory-1.webp"), ctaImageAlt: officeAlt("Treatment room") },
  op3: { ctaImage: office("operatory-3.jpg"), ctaImageAlt: officeAlt("Treatment room") },
  lab: { ctaImage: office("in-house-lab.webp"), ctaImageAlt: officeAlt("In-house dental lab") },
  cbct: { ctaImage: office("cbct-scanner.webp"), ctaImageAlt: officeAlt("CBCT 3D imaging room") },
  front: { ctaImage: office("office-5.jpg"), ctaImageAlt: officeAlt("Reception") },
};

const looks: Record<string, Look> = {
  [BASE]: {
    name: "Restorative Dentistry",
    eyebrow: "Restorative dentistry",
    hero: T.modelExplain,
    images: [T.fillingDrill, T.treatmentProcedure, T.implant, T.consultXray, T.denturesHeld, T.piggyBank],
    dark: 2,
    ...cta.front,
  },
  [`${BASE}/dental-crowns`]: {
    name: "Dental Crowns",
    eyebrow: "Dental crowns",
    hero: T.crown,
    images: [
      null,
      T.toothache,
      T.shadeGuide,
      T.dentalCasts,
      T.microscope,
      T.scan3d,
      T.xrayTablet,
      T.smileGrin,
      T.piggyBank,
    ],
    dark: 4,
    ...cta.lab,
  },
  [`${BASE}/dental-fillings`]: {
    name: "Dental Fillings",
    eyebrow: "Dental fillings",
    hero: T.fillingDrill,
    images: [
      null,
      T.toothache,
      T.smileLips,
      T.dentistHandpiece,
      T.patientCalm,
      T.mirrorProbeExam,
      T.crown,
      T.calendar,
      T.piggyBank,
      T.softFoodYogurt,
    ],
    dark: 3,
    ...cta.op1,
  },
  [`${BASE}/dental-sealants`]: {
    name: "Dental Sealants",
    eyebrow: "Dental sealants",
    hero: T.childMouthExam,
    images: [T.childCheckup, T.familyBrushing, T.teethCleaning, T.calendar, T.smileYoung, T.teethModelDemo],
    dark: 2,
    ...cta.op3,
  },
  [`${BASE}/dental-bridges`]: {
    name: "Dental Bridges",
    eyebrow: "Dental bridges",
    hero: T.dentalCasts,
    images: [null, T.crown, T.implant, T.modelHands, T.scan3d, T.brushingMan, T.seniorSmile, T.piggyBank],
    dark: 4,
    ...cta.lab,
  },
  [`${BASE}/dental-implants`]: {
    name: "Dental Implants",
    eyebrow: "Dental implants",
    hero: T.implant,
    images: [
      null,
      T.modelHands,
      T.consultDesk,
      T.xrayMonitor,
      T.panoramicXray,
      T.calendar,
      T.dentureModels,
      T.seniorWoman,
      T.piggyBank,
      T.brushingSenior,
    ],
    dark: 4,
    ...cta.cbct,
  },
  [DENT]: {
    name: "Dentures",
    eyebrow: "Dentures",
    hero: T.denturesHeld,
    images: [
      null,
      T.dentureModels,
      T.dentalCasts,
      T.extraction,
      T.implant,
      T.seniorSmile,
      T.softFoodYogurt,
      T.modelHands,
      T.piggyBank,
      T.seniorConsult,
    ],
    dark: 4,
    ...cta.lab,
  },
  [`${BASE}/full-arch-dental-implants`]: {
    name: "Full-Arch Dental Implants",
    eyebrow: "Full-arch implants (All-on-X)",
    hero: T.seniorSmile,
    images: [
      null,
      T.dentureModels,
      T.modelExplain,
      T.consultXray,
      T.panoramicXray,
      T.calendar,
      T.denturesHeld,
      T.piggyBank,
      T.brushingSenior,
    ],
    dark: 4,
    ...cta.cbct,
  },
  [`${DENT}/denture-care`]: {
    name: "Denture Care",
    eyebrow: "Denture care, exams and maintenance",
    hero: T.brushingSenior,
    images: [T.denturesHeld, T.mouthwash, T.nightSleep, T.seniorCheckup, T.dentureModels, T.toothache],
    dark: 3,
    ...cta.op1,
  },
  [`${BASE}/rebase-repairs`]: {
    name: "Denture Rebase & Repairs",
    eyebrow: "Denture rebase and repairs",
    hero: T.dentureModels,
    images: [T.phoneCall, T.modelHands, T.dentalCasts, T.calendar, T.glovesMask, T.seniorConsult, T.piggyBank],
    dark: 2,
    ...cta.lab,
  },
  [`${DENT}/denture-relines`]: {
    name: "Denture Relines",
    eyebrow: "Denture relines",
    hero: T.dentalCasts,
    images: [T.seniorOutdoors, T.modelHands, T.denturesHeld, T.consultDesk, T.calendar, T.piggyBank],
    dark: 2,
    ...cta.lab,
  },
  [`${DENT}/immediate-dentures`]: {
    name: "Immediate Dentures",
    eyebrow: "Immediate dentures",
    hero: T.denturesHeld,
    images: [T.dentureModels, T.extraction, T.seniorConsult, T.modelHands, T.seniorSmile, T.softFoodSoup],
    dark: 3,
    ...cta.op3,
  },
  [`${DENT}/implant-retained-dentures`]: {
    name: "Implant-Retained Dentures",
    eyebrow: "Implant-retained dentures",
    hero: T.implant,
    images: [
      null,
      T.seniorOutdoors,
      T.dentureModels,
      T.panoramicXray,
      T.denturesHeld,
      T.brushingSenior,
      T.seniorConsult,
      T.piggyBank,
    ],
    dark: 2,
    ...cta.cbct,
  },
  [`${DENT}/partial-dentures`]: {
    name: "Partial Dentures",
    eyebrow: "Partial dentures",
    hero: T.modelHands,
    images: [T.dentureModels, T.dentalCasts, T.smileLips, T.implant, T.seniorSmile, T.brushingMan, T.piggyBank],
    dark: 3,
    ...cta.lab,
  },
  [`${DENT}/soft-liners`]: {
    name: "Soft Liners",
    eyebrow: "Soft denture liners",
    hero: T.denturesHeld,
    images: [T.dentureModels, T.seniorWoman, T.modelHands, T.calendar, T.seniorConsult],
    dark: 1,
    ...cta.op1,
  },
  [`${BASE}/non-surgical-root-canal`]: {
    name: "Non-Surgical Root Canal",
    eyebrow: "Non-surgical root canal",
    hero: T.treatmentProcedure,
    images: [T.microscope, T.xrayTablet, T.xrayLightbox, T.seniorConsult],
    dark: 2,
    ...cta.op3,
  },
  [`${BASE}/root-canal`]: {
    name: "Root Canal",
    eyebrow: "Root canal treatment",
    hero: T.toothache,
    images: [
      T.xrayLightbox,
      T.patientCalm,
      T.treatmentProcedure,
      T.calendar,
      T.crown,
      T.extraction,
      T.seniorConsult,
      T.coldCompress,
      T.piggyBank,
      T.softFoodYogurt,
    ],
    dark: 2,
    ...cta.op1,
  },
  [`${BASE}/tooth-extractions`]: {
    name: "Tooth Extractions",
    eyebrow: "Tooth extractions",
    hero: T.extraction,
    images: [
      T.treatmentProcedure,
      T.xrayTablet,
      T.glovesMask,
      T.patientRelaxed,
      T.seniorConsult,
      T.coldCompress,
      T.medications,
      T.softFoodSoup,
      T.implant,
      T.phoneCall,
      T.piggyBank,
    ],
    dark: 2,
    ...cta.op3,
  },
  [`${BASE}/wisdom-teeth-removal`]: {
    name: "Wisdom Teeth Removal",
    eyebrow: "Wisdom teeth removal",
    hero: T.panoramicXray,
    images: [
      T.consultXray,
      T.jaw,
      T.xrayLightbox,
      T.seniorConsult,
      T.glovesMask,
      T.coldCompress,
      T.brothBowl,
      T.piggyBank,
      T.phoneCall,
    ],
    dark: 4,
    ...cta.cbct,
  },
};

const urlFor = (slug?: string[]) => (slug?.length ? `${BASE}/${slug.join("/")}` : BASE);

export function generateStaticParams() {
  return Object.keys(restorativePages).map((url) => ({
    slug: url === BASE ? [] : url.slice(BASE.length + 1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps<"/restorative-dentistry/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = restorativePages[urlFor(slug)];
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: { title: page.title, description: page.description, url: page.url },
  };
}

export default async function RestorativePage({ params }: PageProps<"/restorative-dentistry/[[...slug]]">) {
  const { slug } = await params;
  const url = urlFor(slug);
  const page = restorativePages[url];
  const look = looks[url];
  if (!page || !look) notFound();

  const underDentures = url.startsWith(`${DENT}/`) || url === `${BASE}/rebase-repairs`;
  const parent = underDentures ? { label: "Dentures", href: DENT } : { label: "Restorative Dentistry", href: BASE };
  const crumbs = [{ label: "Home", href: "/" }, ...(url === BASE ? [] : [parent]), { label: look.name }];

  /* The hub gets photo cards for the six kinds of restorative work after its opening section. */
  const extras =
    url === BASE
      ? {
          0: (
            <TreatmentCards
              eyebrow="Restorative treatments"
              title={
                <>
                  Repair, save or <span className="text-brand-500">replace</span>
                </>
              }
              cards={[
                {
                  title: "Fillings & crowns",
                  text: "Tooth-coloured fillings, and crowns checked under a microscope.",
                  href: `${BASE}/dental-crowns`,
                  image: T.crown,
                },
                {
                  title: "Root canal treatment",
                  text: "Saving a tooth where that is realistic, before anything is removed.",
                  href: `${BASE}/root-canal`,
                  image: T.xrayTablet,
                },
                {
                  title: "Dental implants",
                  text: "Single implants to All-on-X, planned on CBCT 3D imaging.",
                  href: `${BASE}/dental-implants`,
                  image: T.seniorSmile,
                },
                {
                  title: "Dental bridges",
                  text: "A fixed replacement anchored on the neighbouring teeth.",
                  href: `${BASE}/dental-bridges`,
                  image: T.dentalCasts,
                },
                {
                  title: "Dentures",
                  text: "Full, partial, immediate and implant-retained, made and repaired here.",
                  href: DENT,
                  image: T.seniorWoman,
                },
                {
                  title: "Extractions",
                  text: "Tooth and wisdom teeth removal, with replacement options explained.",
                  href: `${BASE}/tooth-extractions`,
                  image: T.extraction,
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
