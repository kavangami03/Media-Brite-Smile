import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
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
import { doctors, faqs, site } from "@/content/site";

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
      foundingDate: String(site.since),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: site.rating.score,
        reviewCount: site.rating.count,
        bestRating: 5,
      },
      areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: `${a}, PA` })),
      sameAs: [site.social.facebook, site.social.yelp],
      employee: doctors.map((d) => ({ "@type": "Person", name: d.name, honorificSuffix: d.credential, jobTitle: "Dentist" })),
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
      <Intro />
      <Services />
      <Signature />
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
