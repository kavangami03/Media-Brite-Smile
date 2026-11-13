import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors, getLocalFaqs, getLocation, locations, site } from "@/content/site";
import { LocationHero } from "@/components/location/location-hero";
import { WhyLocal } from "@/components/location/why-local";
import { CareGrid } from "@/components/location/care-grid";
import { LocalFaq } from "@/components/location/local-faq";
import { NearbyAreas } from "@/components/location/nearby-areas";
import { Doctors } from "@/components/sections/doctors";
import { Reviews } from "@/components/sections/reviews";
import { Offers } from "@/components/sections/offers";
import { Visit } from "@/components/sections/visit";

/**
 * Every location page is fully prerendered from generateStaticParams, so the
 * whole page may wait on `params` (no partial shell needed).
 */
export const instant = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  const title = loc.isHome ? "Dentist in Media, PA" : `Dentist Near ${loc.name}, PA`;
  const description = `Family, cosmetic and implant dentistry for patients from ${loc.name}, PA. Media Brite Smile at ${site.address.full}. New patients welcome, same-day emergencies. Call ${site.phone.display}.`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `/locations/${loc.slug}` },
  };
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const localFaqs = getLocalFaqs(loc);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": `${site.url}/#dentist`,
        name: site.name,
        url: site.url,
        telephone: "+1-610-566-2711",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
        areaServed: { "@type": "City", name: `${loc.name}, PA` },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating.score,
          reviewCount: site.rating.count,
          bestRating: 5,
        },
        employee: doctors.map((d) => ({ "@type": "Person", name: d.name, honorificSuffix: d.credential, jobTitle: "Dentist" })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${site.url}/locations` },
          { "@type": "ListItem", position: 3, name: `${loc.name}, PA`, item: `${site.url}/locations/${loc.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: localFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LocationHero location={loc} />
      <WhyLocal location={loc} />
      <CareGrid location={loc} />
      <Doctors />
      <Reviews />
      <Offers />
      <LocalFaq town={loc.name} items={localFaqs} />
      <NearbyAreas current={loc} />
      <Visit />
    </>
  );
}
