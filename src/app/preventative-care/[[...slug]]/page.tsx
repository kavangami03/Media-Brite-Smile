import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preventativePages } from "@/content/pages/preventative";
import { topicImages as T, type TopicImage } from "@/content/topic-images";
import { DraftPageView, officeAlt, type DraftLook } from "@/components/draft/draft-page";
import { TreatmentCards } from "@/components/draft/treatment-cards";

/**
 * The 18 Preventative Care pages (sitemap section 03), rendered from their approved drafts.
 * TMJ lives at /tmj-tmd-treatment-media-pa (its sitemap URL) through a rewrite to /preventative-care/tmj.
 */
export const instant = false;

const BASE = "/preventative-care";
const GUM = `${BASE}/gum-disease-treatment`;
const TMJ = "/tmj-tmd-treatment-media-pa";
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
  front: { ctaImage: office("office-5.jpg"), ctaImageAlt: officeAlt("Reception") },
  wait: { ctaImage: office("waiting-room-2.webp"), ctaImageAlt: officeAlt("Waiting room") },
};

const looks: Record<string, Look> = {
  [BASE]: {
    name: "Preventative Care",
    eyebrow: "Preventative care",
    hero: T.teethCleaning,
    images: [
      T.piggyBank,
      T.checkupLight,
      T.gumCheck,
      T.childCheckup,
      T.nightSleep,
      T.xrayMonitor,
      T.cardPayment,
      T.toothache,
    ],
    dark: 5,
    ...cta.front,
  },
  [`${BASE}/family-dentistry`]: {
    name: "Family Dentistry",
    eyebrow: "Family dentistry",
    hero: T.familyBrushing,
    images: [T.patientRelaxed, null, T.calendar, T.checkupLight, T.childCheckup, T.seniorCheckup, T.cardPayment],
    dark: 3,
    ...cta.wait,
  },
  [`${BASE}/fluoride`]: {
    name: "Fluoride Treatment",
    eyebrow: "Fluoride treatment",
    hero: T.childExam,
    images: [T.teethModelDemo, T.healthyGroceries, T.teethCleaning, T.childMouthExam, T.seniorCheckup],
    dark: 3,
    ...cta.op1,
  },
  [`${BASE}/general-dentistry`]: {
    name: "General Dentistry",
    eyebrow: "General dentistry",
    hero: T.dentalTeamCleaning,
    images: [T.consultXray, T.mirrorProbeExam, T.treatmentChair, T.seniorConsult, T.smileCloseup],
    dark: 1,
    ...cta.op3,
  },
  [`${BASE}/oral-hygiene`]: {
    name: "Oral Hygiene",
    eyebrow: "Oral hygiene",
    hero: T.brushingWoman,
    images: [T.brushingMan, T.teethModelDemo, T.familyBrushing, T.mouthwash, T.healthyFood, T.teethCleaning],
    dark: 1,
    ...cta.front,
  },
  [`${BASE}/teeth-cleaning-and-check-ups`]: {
    name: "Teeth Cleaning & Check-Ups",
    eyebrow: "Teeth cleaning and check-ups",
    hero: T.checkupLight,
    images: [T.teethCleaning, T.calendar, T.deepCleaning, T.piggyBank, T.patientCalm, T.xrayLightbox, T.brushingSenior],
    dark: 5,
    ...cta.op1,
  },
  [`${BASE}/arestin`]: {
    name: "Arestin",
    eyebrow: "Arestin antibiotic treatment",
    hero: T.deepCleaning,
    images: [T.medications, T.gumCheck, T.coldCompress, T.medicationOrganizer],
    dark: 1,
    ...cta.op3,
  },
  [`${GUM}/deep-teeth-cleaning`]: {
    name: "Deep Teeth Cleaning",
    eyebrow: "Deep teeth cleaning",
    hero: T.dentalTeamCleaning,
    images: [
      null,
      T.deepCleaning,
      T.teethCleaning,
      T.gumCheck,
      T.treatmentChair,
      T.patientRelaxed,
      T.coldCompress,
      T.calendar,
      T.piggyBank,
    ],
    dark: 4,
    ...cta.op1,
  },
  [`${GUM}/gum-disease-laser-therapy`]: {
    name: "Gum Disease Laser Therapy",
    eyebrow: "Gum disease laser therapy",
    hero: T.treatmentCloseup,
    images: [T.glovesMask, T.gumCheck, T.deepCleaning, T.treatmentPatient, T.coldCompress],
    dark: 1,
    ...cta.op3,
  },
  [GUM]: {
    name: "Gum Disease Treatment",
    eyebrow: "Gum disease treatment",
    hero: T.gumCheck,
    images: [
      T.mirrorProbeExam,
      T.seniorConsult,
      T.xrayTablet,
      T.deepCleaning,
      T.toothache,
      T.brushingMan,
      T.cardPayment,
    ],
    dark: 3,
    ...cta.front,
  },
  [`${GUM}/periodontal-maintenance`]: {
    name: "Periodontal Maintenance",
    eyebrow: "Periodontal maintenance",
    hero: T.teethCleaning,
    images: [T.mirrorProbeExam, T.calendar, T.dentalTeamCleaning, T.gumCheck, T.formReview],
    dark: 2,
    ...cta.op1,
  },
  [`${BASE}/child-dentistry`]: {
    name: "Child Dentistry",
    eyebrow: "Children's dentistry",
    hero: T.childCheckup,
    images: [
      null,
      T.childMirror,
      T.childExam,
      T.familyBrushing,
      T.childMouthExam,
      T.healthyFood,
      T.consultDesk,
      T.nightSleep,
      T.calendar,
    ],
    dark: 3,
    ...cta.wait,
  },
  [`${BASE}/night-guards`]: {
    name: "Night Guards",
    eyebrow: "Night guards",
    hero: T.nightSleep,
    images: [
      T.headacheHome,
      T.mirrorProbeExam,
      T.scan3d,
      T.aligner,
      T.headache,
      null,
      T.childMouthExam,
      T.brushingMan,
      T.piggyBank,
    ],
    dark: 2,
    ...cta.op3,
  },
  [`${BASE}/emergency-dentistry`]: {
    name: "Emergency Dentistry",
    eyebrow: "Emergency dentistry",
    hero: T.toothache,
    images: [null, T.phoneCall, T.glovesMask, T.coldCompress, T.treatmentCloseup, T.crown, T.cardPayment],
    dark: 4,
    primary: { label: "Call (610) 566-2711", href: "tel:+16105662711" },
    ...cta.op1,
  },
  [`${BASE}/digital-x-rays`]: {
    name: "Digital X-Rays",
    eyebrow: "Digital X-rays",
    hero: T.xrayMonitor,
    images: [T.xrayLightbox, T.xrayTablet, T.calendar, T.consultXray, T.pregnancy],
    dark: 1,
    ...cta.op3,
  },
  [`${BASE}/intraoral-scanner`]: {
    name: "Intraoral Scanner",
    eyebrow: "Intraoral scanner",
    hero: T.scan3d,
    images: [T.digitalLab, T.patientRelaxed, T.crown, T.treatmentPatient],
    dark: 2,
    ...cta.op1,
  },
  [`${BASE}/oral-cancer-screenings`]: {
    name: "Oral Cancer Screening",
    eyebrow: "Oral cancer screening",
    hero: T.mouthMirrorExam,
    images: [T.mirrorProbeExam, T.checkupLight, T.glovesMask, T.seniorCheckup, T.seniorConsult],
    dark: 2,
    ...cta.front,
  },
  [TMJ]: {
    name: "TMJ and TMD Treatment",
    eyebrow: "TMJ and TMD treatment",
    hero: T.jaw,
    images: [T.headacheHome, T.headache, T.consultDesk, T.mirrorProbeExam, T.aligner, T.coldCompress, T.seniorConsult],
    dark: 2,
    ...cta.op3,
  },
};

/* /preventative-care/tmj is the internal path behind the /tmj-tmd-treatment-media-pa rewrite */
const urlFor = (slug?: string[]) => {
  if (!slug?.length) return BASE;
  if (slug.length === 1 && slug[0] === "tmj") return TMJ;
  return `${BASE}/${slug.join("/")}`;
};

export function generateStaticParams() {
  return Object.keys(preventativePages).map((url) => ({
    slug: url === BASE ? [] : url === TMJ ? ["tmj"] : url.slice(BASE.length + 1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps<"/preventative-care/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = preventativePages[urlFor(slug)];
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: { title: page.title, description: page.description, url: page.url },
  };
}

export default async function PreventativePage({ params }: PageProps<"/preventative-care/[[...slug]]">) {
  const { slug } = await params;
  const url = urlFor(slug);
  const page = preventativePages[url];
  const look = looks[url];
  if (!page || !look) notFound();

  const parent = url.startsWith(`${GUM}/`)
    ? { label: "Gum Disease Treatment", href: GUM }
    : { label: "Preventative Care", href: BASE };
  const crumbs = [{ label: "Home", href: "/" }, ...(url === BASE ? [] : [parent]), { label: look.name }];

  /* The hub gets photo cards for the six areas of preventative care after its opening section. */
  const extras =
    url === BASE
      ? {
          0: (
            <TreatmentCards
              eyebrow="Preventative care"
              title={
                <>
                  Six ways we keep problems <span className="text-brand-500">small</span>
                </>
              }
              cards={[
                {
                  title: "Check-ups & cleanings",
                  text: "Exam, cleaning, X-rays when due and an oral cancer screening.",
                  href: `${BASE}/teeth-cleaning-and-check-ups`,
                  image: T.dentalTeamCleaning,
                },
                {
                  title: "Gum disease treatment",
                  text: "Deep cleaning, laser therapy, Arestin and maintenance visits.",
                  href: GUM,
                  image: T.deepCleaning,
                },
                {
                  title: "Children's dentistry",
                  text: "First visits, check-ups, fluoride and sealants.",
                  href: `${BASE}/child-dentistry`,
                  image: T.childMouthExam,
                },
                {
                  title: "Night guards",
                  text: "Custom guards for grinding and clenching.",
                  href: `${BASE}/night-guards`,
                  image: T.headache,
                },
                {
                  title: "Screening & X-rays",
                  text: "Oral cancer screening, digital X-rays and scanning.",
                  href: `${BASE}/oral-cancer-screenings`,
                  image: T.mouthMirrorExam,
                },
                {
                  title: "Emergency dentistry",
                  text: "Call and we will tell you how soon you need to be seen.",
                  href: `${BASE}/emergency-dentistry`,
                  image: T.treatmentCloseup,
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
