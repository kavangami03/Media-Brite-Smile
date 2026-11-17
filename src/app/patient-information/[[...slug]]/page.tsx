import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { patientInfoPages } from "@/content/pages/patient-info";
import { DraftPageView, officeAlt, type DraftLook } from "@/components/draft/draft-page";
import { topicImages, type TopicImage } from "@/content/topic-images";

/** All 13 Patient Info pages (sitemap section 02), rendered from their approved drafts. */
export const instant = false;

const BASE = "/patient-information";
const img = (f: string) => `/images/office/${f}`;

const hub = { label: "Patient Information", href: BASE };
const cc = { label: "Care & Comfort", href: `${BASE}/care-and-comfort` };

/* Photo, eyebrow and dark band per page. Hero and CTA photos differ on every page. */
const looks: Record<string, Omit<DraftLook, "crumbs"> & { parent?: { label: string; href: string }; name: string }> = {
  [BASE]: {
    name: "Patient Information",
    eyebrow: "Patient information",
    image: img("office-5.jpg"),
    imageAlt: officeAlt("Reception"),
    ctaImage: img("waiting-room-2.webp"),
    ctaImageAlt: officeAlt("Front desk"),
    dark: 4,
  },
  [`${BASE}/services`]: {
    name: "Our Dental Services",
    parent: hub,
    eyebrow: "Our dental services",
    image: img("operatory-1.webp"),
    imageAlt: officeAlt("Treatment room"),
    ctaImage: img("office-41.jpg"),
    ctaImageAlt: officeAlt("The building on N Pennell Rd"),
    dark: 8,
  },
  [`${BASE}/why-choose-us`]: {
    name: "Why Choose Us",
    parent: hub,
    eyebrow: "Why choose us",
    image: img("office-41.jpg"),
    imageAlt: officeAlt("The building on N Pennell Rd"),
    ctaImage: img("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
    dark: 2,
    accent: "Media Brite Smile",
  },
  [`${BASE}/new-patients`]: {
    name: "New Patients",
    parent: hub,
    eyebrow: "New patients",
    image: img("operatory-3.jpg"),
    imageAlt: officeAlt("Treatment room"),
    ctaImage: img("waiting-room-2.webp"),
    ctaImageAlt: officeAlt("Front desk"),
    dark: 2,
  },
  [`${BASE}/insurance-payment-options`]: {
    name: "Insurance & Payment Options",
    parent: hub,
    eyebrow: "Insurance & payment",
    image: img("office-5.jpg"),
    imageAlt: officeAlt("Reception"),
    ctaImage: img("waiting-room.webp"),
    ctaImageAlt: officeAlt("Waiting area"),
    dark: 4,
  },
  [`${BASE}/care-credit`]: {
    name: "CareCredit",
    parent: hub,
    eyebrow: "CareCredit financing",
    image: img("waiting-room-2.webp"),
    imageAlt: officeAlt("Front desk"),
    ctaImage: img("office-5.jpg"),
    ctaImageAlt: officeAlt("Reception"),
    dark: 3,
    accent: "CareCredit",
  },
  [`${BASE}/care-and-comfort`]: {
    name: "Care & Comfort",
    parent: hub,
    eyebrow: "Care & comfort",
    image: img("waiting-room.webp"),
    imageAlt: officeAlt("Waiting area"),
    ctaImage: img("office-5.jpg"),
    ctaImageAlt: officeAlt("Reception"),
    dark: 2,
    accent: "Nervous Patients",
  },
  [`${BASE}/care-and-comfort/infection-control`]: {
    name: "Infection Control",
    parent: cc,
    eyebrow: "Infection control",
    image: img("in-house-lab.webp"),
    imageAlt: officeAlt("Clinical supply room"),
    ctaImage: img("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
    dark: 1,
    accent: "Safe",
  },
  [`${BASE}/care-and-comfort/advanced-technology`]: {
    name: "Advanced Technology",
    parent: cc,
    eyebrow: "Advanced technology",
    image: img("cbct-scanner.webp"),
    imageAlt: officeAlt("X-ray and 3D imaging room"),
    ctaImage: img("operatory-1.webp"),
    ctaImageAlt: officeAlt("Treatment room"),
    dark: 4,
    accent: "Why It Matters to You",
  },
  [`${BASE}/scheduling`]: {
    name: "Request an Appointment",
    parent: hub,
    eyebrow: "Request an appointment",
    primary: { label: "Fill In the Request Form", href: "#s-1" },
    image: img("office-5.jpg"),
    imageAlt: officeAlt("Reception"),
    ctaImage: img("waiting-room.webp"),
    ctaImageAlt: officeAlt("Waiting area"),
    dark: 3,
  },
  [`${BASE}/patient-registration`]: {
    name: "Patient Registration",
    parent: hub,
    eyebrow: "Patient registration",
    image: img("waiting-room-2.webp"),
    imageAlt: officeAlt("Front desk"),
    ctaImage: img("office-5.jpg"),
    ctaImageAlt: officeAlt("Reception"),
    dark: 1,
    accent: "Forms",
  },
  [`${BASE}/patient-education`]: {
    name: "Patient Education",
    parent: hub,
    eyebrow: "Patient education",
    image: img("waiting-room.webp"),
    imageAlt: officeAlt("Waiting area"),
    ctaImage: img("operatory-3.jpg"),
    ctaImageAlt: officeAlt("Treatment room"),
    dark: 1,
    accent: "Library",
  },
  [`${BASE}/care-and-comfort/home-instructions`]: {
    name: "Home Care Instructions",
    parent: cc,
    eyebrow: "Home care instructions",
    image: img("operatory-1.webp"),
    imageAlt: officeAlt("Treatment room"),
    ctaImage: img("waiting-room.webp"),
    ctaImageAlt: officeAlt("Waiting area"),
    dark: 5,
    accent: "Home Care Instructions",
  },
};

/* Topic photo per section (same order as the draft's sections; null = section without a photo). */
const T = topicImages;
const sectionImages: Record<string, (TopicImage | null)[]> = {
  [BASE]: [T.calendar, T.consultDesk, T.cardPayment, T.formSigning, T.patientRelaxed, null, null],
  [`${BASE}/services`]: [
    null,
    T.treatmentChair,
    T.treatmentCloseup,
    T.veneers,
    T.implant,
    T.dentures,
    T.jaw,
    T.toothache,
    null,
  ],
  [`${BASE}/why-choose-us`]: [T.consultXray, T.treatmentPatient, T.microscope, T.piggyBank, null],
  [`${BASE}/new-patients`]: [null, T.consultDesk, T.patientCalm, T.medications, T.cardPayment, T.consultXray],
  [`${BASE}/insurance-payment-options`]: [null, T.paperwork, T.cardPayment, T.piggyBank, T.readingDocuments],
  [`${BASE}/care-credit`]: [T.cardPayment, T.implant, T.writingDocuments, T.readingDocuments, T.piggyBank],
  [`${BASE}/care-and-comfort`]: [T.phoneCall, T.consultDesk, T.patientRelaxed, T.treatmentPatient, T.glovesMask],
  [`${BASE}/care-and-comfort/infection-control`]: [T.glovesMask, null, T.dentistMask, T.treatmentChair],
  [`${BASE}/care-and-comfort/advanced-technology`]: [T.microscope, T.scan3d, T.xrayTablet, T.xrayMonitor, null],
  [`${BASE}/scheduling`]: [null, T.phoneCall, null, T.toothache, T.formReview],
  [`${BASE}/patient-registration`]: [T.formSigning, T.medicationOrganizer, T.paperwork, T.formReview],
  [`${BASE}/patient-education`]: [null, null, T.brushingWoman, T.readingDocuments],
  [`${BASE}/care-and-comfort/home-instructions`]: [
    T.coldCompress,
    T.treatmentPatient,
    T.treatmentCloseup,
    T.brushingMan,
    T.patientRelaxed,
    T.phoneCall,
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

  return <DraftPageView page={page} look={{ ...look, crumbs, images: sectionImages[url] }} />;
}
