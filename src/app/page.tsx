import { Hero } from "@/components/sections/hero";
import { AtAGlance } from "@/components/sections/at-a-glance";
import { Intro } from "@/components/sections/intro";
import { Areas } from "@/components/sections/areas";
import { Services } from "@/components/sections/services";
import { Signature } from "@/components/sections/signature";
import { Wellness } from "@/components/sections/wellness";
import { Technology } from "@/components/sections/technology";
import { Doctors } from "@/components/sections/doctors";
import { Comfort } from "@/components/sections/comfort";
import { Offers } from "@/components/sections/offers";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { Visit } from "@/components/sections/visit";
import type { Metadata } from "next";
import { doctors, faqs, site } from "@/content/site";

/* Title and description word for word from the approved Home draft v2. */
const description =
  "Family, cosmetic and implant dentistry in Media, PA. Three dentists, 4.9 stars from 375 Google reviews. Call (610) 566-2711 to book.";
export const metadata: Metadata = {
  title: { absolute: "Dentist in Media, PA | Media Brite Smile" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Dentist in Media, PA | Media Brite Smile", description, url: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": `${site.url}/#dentist`,
      name: site.name,
      url: site.url,
      telephone: "+1-610-566-2711",
      image: `${site.url}/images/office/office-5.jpg`,
      logo: `${site.url}/images/brand/logo.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
      description:
        "Media Brite Smile is a family, cosmetic and implant dental practice at 8 N Pennell Rd in Media, Pennsylvania, serving Delaware County.",
      /* Friday is every other week, which openingHours cannot express, so it is shown as visible text only. */
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday"], opens: "08:00", closes: "15:00" },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      areaServed: [
        { "@type": "AdministrativeArea", name: "Delaware County, Pennsylvania" },
        ...["Media", ...site.serviceAreas].map((a) => ({ "@type": "City", name: `${a}, PA` })),
      ],
      sameAs: [site.social.facebook, site.social.yelp],
      employee: doctors.map((d) => ({
        "@type": "Person",
        name: d.name,
        honorificSuffix: d.credential,
        jobTitle: "Dentist",
        url: `${site.url}${d.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <AtAGlance />
      <Intro />
      <Services />
      <Signature />
      <Areas />
      <Wellness />
      <Technology />
      <Doctors />
      <Comfort />
      <Offers />
      <Reviews />
      <Faq />
      <Visit />
    </>
  );
}
