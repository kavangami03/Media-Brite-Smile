import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { doctorSlugs, getDoctor } from "@/content/doctors";
import { DoctorHero } from "@/components/doctor/doctor-hero";
import { DoctorStory } from "@/components/doctor/doctor-story";
import { DoctorJourney } from "@/components/doctor/doctor-journey";
import { DoctorFocus } from "@/components/doctor/doctor-focus";
import { DoctorPersonal } from "@/components/doctor/doctor-personal";
import { Reviews } from "@/components/sections/reviews";
import { Visit } from "@/components/sections/visit";

/** All three doctor pages are prerendered from generateStaticParams. */
export const instant = false;

export function generateStaticParams() {
  return doctorSlugs.map((doctor) => ({ doctor }));
}

export async function generateMetadata({ params }: PageProps<"/about-us/[doctor]">): Promise<Metadata> {
  const { doctor: slug } = await params;
  const found = getDoctor(slug);
  if (!found) return {};
  const { doctor, profile } = found;
  const title = `Meet ${doctor.name}, ${doctor.credential}`;
  const description = `${profile.lead} ${doctor.name}, ${doctor.credential} at ${site.name}, ${site.address.full}.`;
  return {
    title,
    description,
    alternates: { canonical: doctor.href },
    openGraph: { title: `${title} | ${site.name}`, description, url: doctor.href, images: [doctor.image] },
  };
}

export default async function DoctorPage({ params }: PageProps<"/about-us/[doctor]">) {
  const { doctor: slug } = await params;
  const found = getDoctor(slug);
  if (!found) notFound();
  const { doctor, profile } = found;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}${doctor.href}#person`,
        name: doctor.name,
        honorificSuffix: doctor.credential,
        jobTitle: "Dentist",
        image: `${site.url}${doctor.image}`,
        url: `${site.url}${doctor.href}`,
        description: profile.lead,
        knowsAbout: profile.focus.map((f) => f.label),
        worksFor: { "@type": "Dentist", "@id": `${site.url}/#dentist`, name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "About", item: `${site.url}/about-us` },
          { "@type": "ListItem", position: 3, name: doctor.name, item: `${site.url}${doctor.href}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DoctorHero doctor={doctor} profile={profile} />
      <DoctorStory doctor={doctor} profile={profile} />
      <DoctorJourney doctor={doctor} profile={profile} />
      <DoctorFocus doctor={doctor} profile={profile} />
      <DoctorPersonal doctor={doctor} profile={profile} />
      <Reviews />
      <Visit />
    </>
  );
}
