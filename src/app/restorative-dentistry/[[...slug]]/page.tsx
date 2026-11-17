import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { restorativePages } from "@/content/pages/restorative";
import { topicImages as T, ctaOf, type TopicImage } from "@/content/topic-images";
import { DraftPageView, type DraftLook } from "@/components/draft/draft-page";
import { TreatmentCards } from "@/components/draft/treatment-cards";

/** The 19 Restorative Dentistry pages (sitemap section 05), rendered from their approved drafts. */
export const instant = false;

const BASE = "/restorative-dentistry";
const DENT = `${BASE}/dentures`;

type Look = Omit<DraftLook, "crumbs" | "image" | "imageAlt"> & {
  name: string;
  hero: TopicImage;
  /** one photo per draft section, by section order (null = no photo); never repeats the hero */
  images: (TopicImage | null)[];
};

const looks: Record<string, Look> = {
  [BASE]: {
    name: "Restorative Dentistry",
    eyebrow: "Restorative dentistry",
    hero: T.modelExplain,
    images: [T.fillingDrill, T.treatmentProcedure, T.implant5, T.consultXray, T.dentures5, T.piggyBank4],
    dark: 2,
    ...ctaOf(T.booking3),
  },
  [`${BASE}/dental-crowns`]: {
    name: "Dental Crowns",
    eyebrow: "Dental crowns",
    hero: T.crown,
    images: [
      null,
      T.toothache3,
      T.shadeGuide,
      T.dentalCasts,
      T.microscope,
      T.scan3d,
      T.xrayTablet,
      T.smileGrin,
      T.piggyBank5,
    ],
    dark: 4,
    ...ctaOf(T.crown5),
  },
  [`${BASE}/dental-fillings`]: {
    name: "Dental Fillings",
    eyebrow: "Dental fillings",
    hero: T.fillingDrill,
    images: [
      null,
      T.toothache4,
      T.smileLips,
      T.dentistHandpiece,
      T.patientCalm,
      T.examTools4,
      T.crown5,
      T.calendar6,
      T.piggyBank6,
      T.softFoodYogurt,
    ],
    dark: 3,
    ...ctaOf(T.smile12),
  },
  [`${BASE}/dental-sealants`]: {
    name: "Dental Sealants",
    eyebrow: "Dental sealants",
    hero: T.childMouthExam,
    images: [T.kids7, T.familyCare2, T.hygiene9, T.calendar7, T.smileYoung, T.teethModelDemo],
    dark: 2,
    ...ctaOf(T.childExam),
  },
  [`${BASE}/dental-bridges`]: {
    name: "Dental Bridges",
    eyebrow: "Dental bridges",
    hero: T.dentalCasts,
    images: [null, T.crown2, T.implant2, T.modelHands, T.scan3d2, T.brushing5, T.seniorSmile, T.piggyBank7],
    dark: 4,
    ...ctaOf(T.smile13),
  },
  [`${BASE}/dental-implants`]: {
    name: "Dental Implants",
    eyebrow: "Dental implants",
    hero: T.implant,
    images: [
      null,
      T.modelHands,
      T.consultDesk3,
      T.xrayMonitor,
      T.panoramicXray,
      T.calendar2,
      T.dentureModels,
      T.seniorWoman,
      T.piggyBank8,
      T.brushingSenior,
    ],
    dark: 4,
    ...ctaOf(T.smile14),
  },
  [DENT]: {
    name: "Dentures",
    eyebrow: "Dentures",
    hero: T.denturesHeld,
    images: [
      null,
      T.dentures7,
      T.models5,
      T.extraction,
      T.implant4,
      T.seniorSmile,
      T.softFoodYogurt,
      T.models6,
      T.piggyBank9,
      T.seniorConsult3,
    ],
    dark: 4,
    ...ctaOf(T.happyPatient1),
  },
  [`${BASE}/full-arch-dental-implants`]: {
    name: "Full-Arch Dental Implants",
    eyebrow: "Full-arch implants (All-on-X)",
    hero: T.seniorSmile,
    images: [
      null,
      T.dentures8,
      T.modelExplain,
      T.consultXray2,
      T.panoramicXray,
      T.calendar3,
      T.dentures9,
      T.piggyBank2,
      T.brushing6,
    ],
    dark: 4,
    ...ctaOf(T.happyPatient2),
  },
  [`${DENT}/denture-care`]: {
    name: "Denture Care",
    eyebrow: "Denture care, exams and maintenance",
    hero: T.brushingSenior,
    images: [T.dentures, T.mouthwash, T.sleep2, T.seniors2, T.dentures5, T.toothache5],
    dark: 3,
    ...ctaOf(T.brushing7),
  },
  [`${BASE}/rebase-repairs`]: {
    name: "Denture Rebase & Repairs",
    eyebrow: "Denture rebase and repairs",
    hero: T.dentureModels,
    images: [T.phoneCall, T.models7, T.models8, T.calendar4, T.infection3, T.seniorConsult4, T.piggyBank3],
    dark: 2,
    ...ctaOf(T.happyPatient3),
  },
  [`${DENT}/denture-relines`]: {
    name: "Denture Relines",
    eyebrow: "Denture relines",
    hero: T.dentalCasts,
    images: [T.seniorOutdoors, T.models9, T.dentures7, T.consultDesk4, T.calendar5, T.piggyBank4],
    dark: 2,
    ...ctaOf(T.happyPatient4),
  },
  [`${DENT}/immediate-dentures`]: {
    name: "Immediate Dentures",
    eyebrow: "Immediate dentures",
    hero: T.denturesHeld,
    images: [T.dentures8, T.extraction, T.seniorConsult2, T.models5, T.dentures9, T.softFoodSoup],
    dark: 3,
    ...ctaOf(T.happyPatient5),
  },
  [`${DENT}/implant-retained-dentures`]: {
    name: "Implant-Retained Dentures",
    eyebrow: "Implant-retained dentures",
    hero: T.implant2,
    images: [
      null,
      T.seniorOutdoors,
      T.dentures,
      T.xray5,
      T.dentures5,
      T.brushing7,
      T.seniorConsult3,
      T.piggyBank5,
    ],
    dark: 2,
    ...ctaOf(T.happyPatient6),
  },
  [`${DENT}/partial-dentures`]: {
    name: "Partial Dentures",
    eyebrow: "Partial dentures",
    hero: T.modelHands,
    images: [T.dentures7, T.models6, T.smileLips, T.implant5, T.dentures8, T.brushing8, T.piggyBank6],
    dark: 3,
    ...ctaOf(T.booking1),
  },
  [`${DENT}/soft-liners`]: {
    name: "Soft Liners",
    eyebrow: "Soft denture liners",
    hero: T.denturesHeld,
    images: [T.dentures9, T.seniorWoman, T.models7, T.calendar6, T.seniorConsult4],
    dark: 1,
    ...ctaOf(T.booking2),
  },
  [`${BASE}/non-surgical-root-canal`]: {
    name: "Non-Surgical Root Canal",
    eyebrow: "Non-surgical root canal",
    hero: T.treatmentProcedure,
    images: [T.microscope, T.xray6, T.xrayLightbox, T.seniorConsult2],
    dark: 2,
    ...ctaOf(T.booking3),
  },
  [`${BASE}/root-canal`]: {
    name: "Root Canal",
    eyebrow: "Root canal treatment",
    hero: T.toothache,
    images: [
      T.xray7,
      T.patientCalm,
      T.treatmentProcedure,
      T.calendar7,
      T.crown3,
      T.surgery2,
      T.seniorConsult3,
      T.comfort6,
      T.piggyBank7,
      T.softFoodYogurt,
    ],
    dark: 2,
    ...ctaOf(T.smile7),
  },
  [`${BASE}/tooth-extractions`]: {
    name: "Tooth Extractions",
    eyebrow: "Tooth extractions",
    hero: T.extraction,
    images: [
      T.treatmentCloseup6,
      T.xray8,
      T.infection4,
      T.comfort3,
      T.seniorConsult4,
      T.comfort4,
      T.medications,
      T.softFoodSoup,
      T.models8,
      T.phoneCall2,
      T.piggyBank8,
    ],
    dark: 2,
    ...ctaOf(T.surgery2),
  },
  [`${BASE}/wisdom-teeth-removal`]: {
    name: "Wisdom Teeth Removal",
    eyebrow: "Wisdom teeth removal",
    hero: T.panoramicXray,
    images: [
      T.consultXray3,
      T.jaw,
      T.xray9,
      T.consultDesk5,
      T.dentistMask,
      T.comfort5,
      T.brothBowl,
      T.piggyBank9,
      T.phoneCall3,
    ],
    dark: 4,
    ...ctaOf(T.xray8),
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
                  image: T.crown4,
                },
                {
                  title: "Root canal treatment",
                  text: "Saving a tooth where that is realistic, before anything is removed.",
                  href: `${BASE}/root-canal`,
                  image: T.xray10,
                },
                {
                  title: "Dental implants",
                  text: "Single implants to All-on-X, planned on CBCT 3D imaging.",
                  href: `${BASE}/dental-implants`,
                  image: T.models9,
                },
                {
                  title: "Dental bridges",
                  text: "A fixed replacement anchored on the neighbouring teeth.",
                  href: `${BASE}/dental-bridges`,
                  image: T.models5,
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
                  image: T.surgery3,
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
