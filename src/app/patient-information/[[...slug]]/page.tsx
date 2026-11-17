import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patientInfoPages } from "@/content/pages/patient-info";
import { DraftPageView, type DraftLook } from "@/components/draft/draft-page";
import { topicImages as T, ctaOf, type TopicImage } from "@/content/topic-images";

/** All 13 Patient Info pages (sitemap section 02), rendered from their approved drafts. */
export const instant = false;

const BASE = "/patient-information";

const hub = { label: "Patient Information", href: BASE };
const cc = { label: "Care & Comfort", href: `${BASE}/care-and-comfort` };

/* Photo, eyebrow and dark band per page. Hero and CTA photos differ on every page. */
type Look = Omit<DraftLook, "crumbs" | "image" | "imageAlt"> & {
  parent?: { label: string; href: string };
  name: string;
  hero: TopicImage;
};

const looks: Record<string, Look> = {
  [BASE]: {
    name: "Patient Information",
    eyebrow: "Patient information",
    hero: T.formReview,
    ...ctaOf(T.forms4),
    dark: 4,
  },
  [`${BASE}/services`]: {
    name: "Our Dental Services",
    parent: hub,
    eyebrow: "Our dental services",
    hero: T.treatmentChair,
    ...ctaOf(T.smile11),
    dark: 8,
  },
  [`${BASE}/why-choose-us`]: {
    name: "Why Choose Us",
    parent: hub,
    eyebrow: "Why choose us",
    hero: T.examTools5,
    ...ctaOf(T.smile12),
    dark: 2,
    accent: "Media Brite Smile",
  },
  [`${BASE}/new-patients`]: {
    name: "New Patients",
    parent: hub,
    eyebrow: "New patients",
    hero: T.consultDesk,
    ...ctaOf(T.smile13),
    dark: 2,
  },
  [`${BASE}/insurance-payment-options`]: {
    name: "Insurance & Payment Options",
    parent: hub,
    eyebrow: "Insurance & payment",
    hero: T.cardPayment,
    ...ctaOf(T.smile14),
    dark: 4,
  },
  [`${BASE}/care-credit`]: {
    name: "CareCredit",
    parent: hub,
    eyebrow: "CareCredit financing",
    hero: T.piggyBank,
    ...ctaOf(T.happyPatient1),
    dark: 3,
    accent: "CareCredit",
  },
  [`${BASE}/care-and-comfort`]: {
    name: "Care & Comfort",
    parent: hub,
    eyebrow: "Care & comfort",
    hero: T.patientRelaxed,
    ...ctaOf(T.happyPatient2),
    dark: 2,
    accent: "Nervous Patients",
  },
  [`${BASE}/care-and-comfort/infection-control`]: {
    name: "Infection Control",
    parent: cc,
    eyebrow: "Infection control",
    hero: T.glovesMask,
    ...ctaOf(T.infection3),
    dark: 1,
    accent: "Safe",
  },
  [`${BASE}/care-and-comfort/advanced-technology`]: {
    name: "Advanced Technology",
    parent: cc,
    eyebrow: "Advanced technology",
    hero: T.officeCbct,
    ...ctaOf(T.happyPatient3),
    dark: 4,
    accent: "Why It Matters to You",
  },
  [`${BASE}/scheduling`]: {
    name: "Request an Appointment",
    parent: hub,
    eyebrow: "Request an appointment",
    primary: { label: "Fill In the Request Form", href: "#s-1" },
    hero: T.phoneCall,
    ...ctaOf(T.happyPatient4),
    dark: 3,
  },
  [`${BASE}/patient-registration`]: {
    name: "Patient Registration",
    parent: hub,
    eyebrow: "Patient registration",
    hero: T.formSigning,
    ...ctaOf(T.forms4),
    dark: 1,
    accent: "Forms",
  },
  [`${BASE}/patient-education`]: {
    name: "Patient Education",
    parent: hub,
    eyebrow: "Patient education",
    hero: T.readingDocuments,
    ...ctaOf(T.insurance5),
    dark: 1,
    accent: "Library",
  },
  [`${BASE}/care-and-comfort/home-instructions`]: {
    name: "Home Care Instructions",
    parent: cc,
    eyebrow: "Home care instructions",
    hero: T.brushingMan,
    ...ctaOf(T.brushing8),
    dark: 5,
    accent: "Home Care Instructions",
  },
};

/* Topic photo per section (same order as the draft's sections; null = section without a photo). */
const sectionImages: Record<string, (TopicImage | null)[]> = {
  [BASE]: [T.calendar5, T.consultDesk7, T.cardPayment8, T.formSigning, T.comfort6, null, null],
  [`${BASE}/services`]: [
    null,
    T.treatmentChair3,
    T.treatmentCloseup7,
    T.cosmeticTools4,
    T.modelExplain,
    T.models6,
    T.jaw,
    T.toothache3,
    null,
  ],
  [`${BASE}/why-choose-us`]: [T.consultXray6, T.treatmentPatient, T.microscope1, T.piggyBank4, null],
  [`${BASE}/new-patients`]: [null, T.consultDesk2, T.comfort3, T.medications, T.cardPayment9, T.consultXray7],
  [`${BASE}/insurance-payment-options`]: [null, T.paperwork, T.cardPayment2, T.piggyBank5, T.readingDocuments],
  [`${BASE}/care-credit`]: [T.cardPayment3, T.models7, T.writingDocuments, T.insurance3, T.piggyBank6],
  [`${BASE}/care-and-comfort`]: [T.phoneCall4, T.consultDesk3, T.comfort4, T.dentistHandpiece, T.infection3],
  [`${BASE}/care-and-comfort/infection-control`]: [T.infection4, null, T.dentistMask, T.treatmentChair4],
  [`${BASE}/care-and-comfort/advanced-technology`]: [T.microscope1, T.scan3d3, T.xray7, T.xray8, null],
  [`${BASE}/scheduling`]: [null, T.phoneCall2, null, T.toothache4, T.forms4],
  [`${BASE}/patient-registration`]: [T.forms5, T.medicationOrganizer, T.paperwork, T.forms6],
  [`${BASE}/patient-education`]: [null, null, T.brushing4, T.insurance4],
  [`${BASE}/care-and-comfort/home-instructions`]: [
    T.toothache5,
    T.fillingDrill,
    T.treatmentCloseup6,
    T.brushing5,
    T.comfort5,
    T.phoneCall3,
  ],
};

const urlFor = (slug?: string[]) => (slug?.length ? `${BASE}/${slug.join("/")}` : BASE);

export function generateStaticParams() {
  return Object.keys(patientInfoPages).map((url) => ({
    slug: url === BASE ? [] : url.slice(BASE.length + 1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps<"/patient-information/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = patientInfoPages[urlFor(slug)];
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.url },
    openGraph: { title: page.title, description: page.description, url: page.url },
  };
}

export default async function PatientInfoPage({ params }: PageProps<"/patient-information/[[...slug]]">) {
  const { slug } = await params;
  const url = urlFor(slug);
  const page = patientInfoPages[url];
  const look = looks[url];
  if (!page || !look) notFound();

  const crumbs = [
    { label: "Home", href: "/" },
    ...(look.parent && look.parent.href !== BASE ? [hub, look.parent] : look.parent ? [hub] : []),
    { label: look.name },
  ];

  return <DraftPageView page={page} look={{ ...look, crumbs, image: look.hero.src, imageAlt: look.hero.alt, images: sectionImages[url] }} />;
}
