import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocation, locations, site } from "@/content/site";
import { getTown } from "@/content/towns";
import { TownHero } from "@/components/location/town-hero";
import { TownGuide } from "@/components/location/town-guide";
import { topicImages } from "@/content/topic-images";
import { townImages } from "@/content/town-images";
import { TownFaq } from "@/components/location/town-faq";
import { NearbyAreas } from "@/components/location/nearby-areas";
import { CtaBand } from "@/components/page/cta-band";
import { Doctors } from "@/components/sections/doctors";
import { Offers } from "@/components/sections/offers";
import { JsonLd, pageSchema } from "@/lib/schema";

/**
 * Town pages. Served at the sitemap URL /dentist-{town}-pa (rewrite in next.config.ts);
 * every word of copy comes from that town's approved draft (src/content/towns.ts).
 */
export const instant = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  const town = getTown(slug);
  if (!loc || !town) return {};
  return {
    title: { absolute: town.title },
    description: town.description,
    alternates: { canonical: loc.href },
    openGraph: { title: town.title, description: town.description, url: loc.href },
  };
}

export default async function TownPage({ params }: PageProps<"/locations/[slug]">) {
  const { slug } = await params;
  const loc = getLocation(slug);
  const town = getTown(slug);
  if (!loc || !town) notFound();

  const jsonLd = pageSchema({
    path: loc.href,
    name: town.title,
    description: town.description,
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Areas We Serve", href: "/areas-we-serve" },
      { label: `Dentist near ${town.name}, PA` },
    ],
    faqs: town.faqs,
    extra: [
      {
        "@type": "Dentist",
        "@id": `${site.url}/#dentist`,
        areaServed: { "@type": "City", name: `${town.name}, PA`, postalCode: town.zip },
      },
    ],
  });

  const ctaPhoto = topicImages[townImages[town.slug]?.cta ?? "officeBuilding"];

  return (
    <>
      <JsonLd data={jsonLd} />
      <TownHero location={loc} town={town} />
      <TownGuide town={town} />
      <Doctors />
      <Offers />
      <TownFaq town={town} />
      <NearbyAreas current={loc} />
      <CtaBand
        title={town.cta.title}
        text={town.cta.text}
        image={ctaPhoto.src}
        imageAlt={ctaPhoto.alt}
      />
    </>
  );
}
