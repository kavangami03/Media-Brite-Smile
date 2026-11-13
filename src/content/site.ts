/**
 * Single source of truth for practice facts.
 * Every value below was taken from the live site (mediabritesmile.com).
 * Do not add figures here that the practice hasn't published.
 */

export const site = {
  name: "Media Brite Smile",
  tagline: "Family, Cosmetic & Implant Dentistry",
  url: "https://www.mediabritesmile.com",
  since: 2015,
  phone: { display: "(610) 566-2711", href: "tel:+16105662711" },
  address: {
    street: "8 N Pennell Rd",
    city: "Media",
    region: "PA",
    zip: "19063",
    full: "8 N Pennell Rd, Media, PA 19063",
    directions: "https://www.google.com/maps/dir/?api=1&destination=8+N+Pennell+Rd+Media+PA+19063",
    mapEmbed:
      "https://maps.google.com/maps?q=Media%20Brite%20Smile%2C%208%20N%20Pennell%20Rd%2C%20Media%2C%20PA%2019063&z=15&output=embed",
    geo: { lat: 39.9318304, lng: -75.3882651 },
  },
  rating: { score: 4.93, count: 379 },
  social: {
    facebook: "https://www.facebook.com/mediabritesmile",
    google:
      "https://www.google.com/maps/place/Media+Brite+Smile/@39.9318304,-75.3882651,15z/data=!4m6!3m5!1s0x89c6e9758c11ae31:0x619cd5cf2e3c3f8f!8m2!3d39.9318304!4d-75.3882651!16s%2Fg%2F1th7nv_f",
    yelp: "https://www.yelp.com/biz/media-brite-smile-media",
  },
  bookingHref: "/contact-us",
  serviceAreas: [
    "Media",
    "Nether Providence",
    "Upper Providence",
    "Rose Valley",
    "Swarthmore",
    "Brookhaven",
    "Springfield",
    "Philadelphia",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

export const serviceGroups = [
  {
    id: "general",
    label: "Preventive & Family",
    title: "General & Preventive Dentistry",
    blurb: "Exams, cleanings and gentle everyday care that keeps every generation healthy.",
    href: "/preventative-care",
    image: "/images/hero/banner-4.jpg",
    links: [
      { label: "Family Dentistry", href: "/preventative-care" },
      { label: "Exam & Cleaning", href: "/preventative-care/dental-exam-and-cleaning" },
      { label: "Child Dentistry", href: "/preventative-care/child-dentistry" },
      { label: "Emergency Dentistry", href: "/preventative-care/emergency-dentistry" },
      { label: "Periodontal Maintenance", href: "/preventative-care/gum-disease-treatment/periodontal-maintenance" },
      { label: "Deep Teeth Cleaning", href: "/preventative-care/gum-disease-treatment/deep-teeth-cleaning" },
      {
        label: "Gum Disease Laser Therapy",
        href: "/preventative-care/gum-disease-treatment/gum-disease-laser-therapy",
      },
      { label: "Night Guards", href: "/preventative-care/night-guards" },
      { label: "Fluoride", href: "/preventative-care/fluoride" },
      { label: "Oral Cancer Screenings", href: "/preventative-care/oral-cancer-screenings" },
    ],
  },
  {
    id: "cosmetic",
    label: "Cosmetic",
    title: "Cosmetic Dentistry",
    blurb: "Natural-looking smile design, from whitening to porcelain veneers.",
    href: "/cosmetic-dentistry",
    image: "/images/services/cosmetic-dentistry.webp",
    links: [
      { label: "Teeth Whitening", href: "/cosmetic-dentistry/teeth-whitening" },
      { label: "Invisalign", href: "/cosmetic-dentistry/invisalign" },
      { label: "Porcelain Veneers", href: "/cosmetic-dentistry/porcelain-veneers" },
      { label: "Dental Bonding", href: "/cosmetic-dentistry/dental-bonding" },
      { label: "Inlays & Onlays", href: "/cosmetic-dentistry/inlays-onlays" },
    ],
  },
  {
    id: "restorative",
    label: "Restorative & Implants",
    title: "Restorative & Implant Dentistry",
    blurb: "Rebuild strength and confidence with implants, crowns, bridges and dentures.",
    href: "/restorative-dentistry",
    image: "/images/services/dental-implants.jpg",
    links: [
      { label: "Dental Implants", href: "/restorative-dentistry/dental-implants" },
      { label: "Dental Crowns", href: "/restorative-dentistry/dental-crowns" },
      { label: "Dental Bridges", href: "/restorative-dentistry/dental-bridges" },
      { label: "Dentures", href: "/restorative-dentistry/dentures" },
      { label: "Dental Fillings", href: "/restorative-dentistry/dental-fillings" },
      { label: "Non-Surgical Root Canal", href: "/restorative-dentistry/non-surgical-root-canal" },
      { label: "Tooth Extractions", href: "/restorative-dentistry/tooth-extractions" },
      { label: "Dental Sealants", href: "/restorative-dentistry/dental-sealants" },
      { label: "Rebase & Repairs", href: "/restorative-dentistry/rebase-repairs" },
      { label: "Soft Liners", href: "/restorative-dentistry/soft-liners" },
    ],
  },
] as const;

export const mainNav: (NavLink | NavGroup)[] = [
  {
    label: "About",
    href: "/about-us",
    links: [
      { label: "Meet Dr. Zan Chaudhary", href: "/about-us/meet-dr-zan-chaudhary-dmd" },
      { label: "Meet Dr. Sanketkumar Suvagiya", href: "/about-us/meet-dr-sanketkumar-suvagiya-dmd" },
      { label: "Meet Dr. Bhadresh Makani", href: "/about-us/meet-dr-bhadresh-makani-dds" },
      { label: "Office Tour", href: "/about-us/office-tour" },
      { label: "Patient Reviews", href: "/about-us/patient-reviews" },
      { label: "Dental Savings Plan", href: "/about-us/dental-savings-plan" },
    ],
  },
  { label: "Services", href: "/services", links: [] }, // rendered as mega-menu from serviceGroups
  {
    label: "Patients",
    href: "/patient-information",
    links: [
      { label: "Why Choose Us", href: "/patient-information/why-choose-us" },
      { label: "Advanced Technology", href: "/patient-information/care-and-comfort/advanced-technology" },
      { label: "CareCredit", href: "/patient-information/care-credit" },
      { label: "Dental Savings Plan", href: "/about-us/dental-savings-plan" },
    ],
  },
  { label: "Special Offers", href: "/special-offers" },
  { label: "Contact", href: "/contact-us" },
];

/* -------------------------------------------------------------------------- */
/* Doctors                                                                    */
/* -------------------------------------------------------------------------- */

export const doctors = [
  {
    name: "Dr. Zan Chaudhary",
    credential: "DMD",
    short: "Dr. Zan",
    image: "/images/doctors/dr-zan-chaudhary.jpg",
    position: "50% 22%",
    href: "/about-us/meet-dr-zan-chaudhary-dmd",
    focus: "Smile design & comprehensive care",
    bio: "Born and raised in West Chester, PA. Dr. Zan enjoys smile design and cosmetic transformations as much as routine, comprehensive and preventive care.",
    highlights: ["DMD, Nova Southeastern University", "Invisalign® certified", "Member, American Dental Association"],
  },
  {
    name: "Dr. Sanketkumar Suvagiya",
    credential: "DMD",
    short: "Dr. Suvagiya",
    image: "/images/doctors/dr-sanketkumar-suvagiya.jpg",
    position: "50% 18%",
    href: "/about-us/meet-dr-sanketkumar-suvagiya-dmd",
    focus: "Restorative, root canals & TMD",
    bio: "Graduated with highest honors and holds a fellowship in Orofacial Pain from Rutgers, helping patients with TMD, muscle pain and headaches.",
    highlights: [
      "DMD, Nova Southeastern University",
      "Omicron Kappa Upsilon honoree",
      "Orofacial Pain fellowship, Rutgers",
    ],
  },
  {
    name: "Dr. Bhadresh Makani",
    credential: "DDS",
    short: "Dr. Makani",
    image: "/images/doctors/dr-bhadresh-makani.jpg",
    position: "50% 30%",
    href: "/about-us/meet-dr-bhadresh-makani-dds",
    focus: "Dental implants & full-mouth rehab",
    bio: "An implant-focused dentist with thousands of implants placed, from single implants to All-on-X “Teeth-in-a-Day” full-arch solutions.",
    highlights: ["DDS, New York University", "Thousands of implants placed", "Nitrous & oral sedation options"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Offers & membership (from /special-offers and /dental-savings-plan)        */
/* -------------------------------------------------------------------------- */

export const offers = [
  {
    value: "$99",
    unit: "visit",
    title: "New Patient Special",
    detail: "Regularly $315. For uninsured patients.",
    tone: "brand",
  },
  {
    value: "$1,000",
    unit: "off",
    title: "Invisalign Treatment",
    detail: "Reg. $5,800. Includes a free consultation and a take-home whitening kit when you start treatment.",
    tone: "light",
  },
  {
    value: "$500",
    unit: "off",
    title: "Implant, Abutment & Crown",
    detail: "Reg. price starting at $3,999. Includes a free consultation.",
    tone: "light",
  },
  {
    value: "$100",
    unit: "off",
    title: "Teeth Whitening",
    detail: "Reg. $550. Includes a $249 take-home whitening kit with lifetime refills.",
    tone: "light",
  },
] as const;

export const membership = {
  prices: [
    { label: "1st member", price: 300 },
    { label: "2nd member", price: 275 },
  ],
  includes: [
    "2 annual exams",
    "1 emergency exam",
    "2 oral cancer screenings",
    "4 bitewing X-rays",
    "All individual X-rays for 1 year",
    "Full mouth series X-rays or Panorex",
  ],
  discount: "10-15% off additional procedures, including fillings, crowns, dentures and more",
} as const;

/* -------------------------------------------------------------------------- */
/* Reviews (verbatim from /about-us/patient-reviews)                          */
/* -------------------------------------------------------------------------- */

/** Google reviews (verbatim), syndicated on mediabritesmile.com/about-us/patient-reviews. */
export const reviews = [
  {
    name: "Sharon",
    date: "2026-10-02",
    quote:
      "Everyone at Media Brite Smile is wonderful and so professional! I have a tiny mouth and they have been so accommodating and kind when working on me. I have had a hard time finding a dentist that is as patient as they are. I highly recommend!",
  },
  {
    name: "Carol Sides",
    date: "2026-11-04",
    quote: "Dr Zen and staff are wonderful. Had two crowns done and am very pleased!",
  },
  {
    name: "Thomas Myers",
    date: "2025-11-20",
    quote:
      "The Dental hygienist did a comprehensive examination of my entire Oral Cavity. As she worked she pointed out potential problems and suggested healthy practices to add to my daily care routine. The dentist did a focused exam based upon the hygienist's findings. The dentist then suggested potential elements of my care plan. The care plan was then agreed upon, I felt decidedly healthier after my visit !",
  },
  {
    name: "Laurie Harper",
    date: "2025-11-10",
    quote: "They do an amazing job cleaning my teeth. Everyone who works there is so friendly",
  },
  {
    name: "Janine Muth",
    date: "2025-11-05",
    quote:
      "My first visit. The receptionists are kind and helpful. The hygienist was pleasant and I received a very thorough cleaning.",
  },
  {
    name: "luke malek (LUKIE)",
    date: "2025-10-07",
    quote:
      "Probably the best experience i’ve had at the dentist in my life. Very professional staff from the cleaning to the fillings and billing, these ladies are amazing.",
  },
  {
    name: "Regina Koch",
    date: "2025-09-05",
    quote:
      "My first time at this dentist. Had my teeth cleaned by Chrissy, who was very thorough and friendly, and made the experience somewhat enjoyable!",
  },
  {
    name: "joann dougherty",
    date: "2025-09-04",
    quote:
      "Wonderful experience. Both the hygienist and dentist were thorough and user friendly. Also office staff. Well done.",
  },
  {
    name: "Jean maye",
    date: "2025-09-02",
    quote:
      "I had a wonderful experience at this dental office. The staff was welcoming, friendly, and very helpful throughout my visit. My hygienist was extremely thorough with my cleaning and made the X-ray process quick and comfortable. The dentist was kind, observant, and highly professional, taking the time to explain everything clearly. I truly felt well cared for from start to finish and would highly recommend this office.",
  },
  {
    name: "Amanda Figueras",
    date: "2025-09-02",
    quote:
      "From the moment I walked in the door to the moment I left, I was very impressed. I struggle brushing my teeth, and not one person I spoke to had anything bad to say about my oral hygiene, they were very supportive and suggested that I get an electric toothbrush. The staff very very nice, sweet and accommodating. I’m definitely coming back in 6 months.",
  },
  {
    name: "Renee Thomas",
    date: "2025-08-22",
    quote: "Very enjoyable experience, professionalism, cleanliness, and time given during my visit.",
  },
  {
    name: "Paul Kazanjian",
    date: "2025-08-08",
    quote:
      "Great service, no wait time , saw me immediately and everyone was very professional, would recommend them to everyone.",
  },
  {
    name: "Michael Dooley",
    date: "2025-07-24",
    quote: "Kim did her usual great job of cleaning my teeth. Office staff was very friendly and courteous.",
  },
  {
    name: "Sean Mulloy",
    date: "2025-07-18",
    quote:
      "Everyone extremely nice and very professional. And they didn’t know me from Adam. But felt like I was a long time regular. Which I likely will be going forward.",
  },
  {
    name: "Vanessa Jean",
    date: "2025-07-07",
    quote: "Everybody in the office was very polite. The female doctor was fantastic and the hygienist was awesome.",
  },
  {
    name: "Virginia Haley",
    date: "2025-06-23",
    quote:
      "Place was very welcoming and dentistry team takes their time with you to make sure your comfortable… I really enjoyed my first visit.",
  },
  {
    name: "Lynn Wells",
    date: "2025-06-04",
    quote:
      "Everyone in this office are very interested in how my teeth are doing. They were kind and took so much time with the cleaning and exam. I enjoyed the visit.",
  },
  {
    name: "Paula huff",
    date: "2025-06-03",
    quote:
      "Wonderful experience. Kat the hygienist was excellent. All staff was warm and welcoming and the dentist put you very much at ease. Will return for sure.",
  },
  {
    name: "Amy Kane",
    date: "2025-05-27",
    quote: "Friendly staff! Know you by name! Very efficient and courteous!",
  },
  {
    name: "Narayanan M N Meyyappan",
    date: "2025-05-20",
    quote:
      "No time wasted, efficient office and staff. Reminders sent frequently. Had my teeth cleaning done by a professional and the dentist checked my teeth and made recommendations for good dental health. Great job to the team.",
  },
  {
    name: "Megan Weare",
    date: "2025-04-16",
    quote:
      "I am a new patient to this dentist. It was easy to make an appointment. The receptionist was very helpful and friendly. We were having issues finding me in my insurance provider and they had great communication and follow up. The hygienist and dentist were really friendly and explained everything along the way. They made sure to ask if I had any questions throughout the appointment",
  },
  {
    name: "Nancy Mount",
    date: "2025-04-15",
    quote:
      "I am always pleased with my visit at Media Bright Smile. Everyone is efficient and knowledgeable about dental care.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* FAQ (answers drawn only from published site content)                       */
/* -------------------------------------------------------------------------- */

export const faqCategories = [
  { id: "all", label: "All questions" },
  { id: "visit", label: "Your visit" },
  { id: "cost", label: "Cost & insurance" },
  { id: "care", label: "Comfort & care" },
] as const;

export type FaqCategory = Exclude<(typeof faqCategories)[number]["id"], "all">;

export const faqs: {
  q: string;
  a: string;
  category: FaqCategory;
  link: { label: string; href: string; external?: boolean };
}[] = [
  {
    q: "Are you accepting new patients?",
    a: "Yes! We are currently welcoming new patients of all ages, from toddlers to grandparents. Call us or request an appointment online.",
    category: "visit",
    link: { label: "Request an appointment", href: site.bookingHref },
  },
  {
    q: "Where is your office located?",
    a: `We've moved! You'll now find us at ${site.address.full}. We care for patients from Media, Nether Providence, Upper Providence, Rose Valley, Swarthmore, Brookhaven, Springfield and Philadelphia.`,
    category: "visit",
    link: { label: "Get directions", href: site.address.directions, external: true },
  },
  {
    q: "Do you offer same-day emergency appointments?",
    a: `Yes. If you're in pain or have a dental emergency, call ${site.phone.display} and we'll do our best to see you the same day.`,
    category: "visit",
    link: { label: `Call ${site.phone.display}`, href: site.phone.href },
  },
  {
    q: "I don't have dental insurance. What are my options?",
    a: "Our In-Office Membership Plan covers preventive and diagnostic care, including 2 annual exams, X-rays and an emergency exam, plus 10-15% off additional procedures. Uninsured new patients can also take advantage of our $99 New Patient Special.",
    category: "cost",
    link: { label: "See the membership plan", href: "/about-us/dental-savings-plan" },
  },
  {
    q: "Do you accept insurance and offer financing?",
    a: "We accept numerous dental insurance plans and are happy to help you navigate your benefits. CareCredit financing and in-office payment options are also available.",
    category: "cost",
    link: { label: "Learn about CareCredit", href: "/patient-information/care-credit" },
  },
  {
    q: "Is your dentistry mercury-free?",
    a: "Yes. We focus on safe, mercury-free and minimally invasive procedures using high-quality porcelain and composite restorations and metal-free crowns, bridges and fillings.",
    category: "care",
    link: { label: "Explore our technology", href: "/patient-information/care-and-comfort/advanced-technology" },
  },
  {
    q: "I'm nervous about the dentist. Can you help?",
    a: "Absolutely. We take a gentle, soothing approach for patients with dental anxiety and offer multiple anesthesia options, including nitrous oxide and oral sedation.",
    category: "care",
    link: { label: "Why patients choose us", href: "/patient-information/why-choose-us" },
  },
];

/* -------------------------------------------------------------------------- */
/* Service-area location pages                                                */
/* -------------------------------------------------------------------------- */

export type Location = {
  name: string;
  slug: string;
  isHome: boolean;
  /** Google Maps turn-by-turn directions from the town to the office */
  directions: string;
  /** Embeddable Google map: the route from the town (or the office itself for Media) */
  routeEmbed: string;
};

const toSlug = (s: string) => `${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-pa`;

/**
 * Exact place names for Google Maps. "Upper Providence, PA" and "Springfield, PA"
 * also exist in Montgomery County, so these must name Delaware County explicitly.
 */
const mapPlace: Record<string, string> = {
  // the ZIP pins Google to the Delaware County township (county names alone still resolved to Montgomery)
  "Upper Providence": "Upper Providence Township, PA 19063",
  Springfield: "Springfield Township, Delaware County, PA 19064",
  "Nether Providence": "Nether Providence Township, PA 19086",
};

export const locations: Location[] = site.serviceAreas.map((name) => {
  const isHome = name === site.address.city;
  const origin = encodeURIComponent(mapPlace[name] ?? `${name}, PA`);
  const destination = encodeURIComponent(site.address.full);
  return {
    name,
    slug: toSlug(name),
    isHome,
    directions: `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
    routeEmbed: isHome
      ? site.address.mapEmbed
      : `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&dirflg=d&output=embed`,
  };
});

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);

/** Location-page FAQs, written only from the published facts above. */
export function getLocalFaqs(loc: Location): (typeof faqs)[number][] {
  const town = `${loc.name}, PA`;
  const [newPatients, , emergency, uninsured, insurance, mercury, nervous] = faqs;
  return [
    loc.isHome
      ? {
          q: "Where is your Media office?",
          a: `Media Brite Smile is at ${site.address.full}. We've moved to this new office and continue to care for patients from Media and the surrounding communities.`,
          category: "visit",
          link: { label: "Get directions", href: site.address.directions, external: true },
        }
      : {
          q: `Do you see patients from ${town}?`,
          a: `Yes. Many of our patients come from ${town}. Our office is at ${site.address.full}, and we welcome new patients of all ages from ${loc.name} and the surrounding communities.`,
          category: "visit",
          link: { label: `Directions from ${loc.name}`, href: loc.directions, external: true },
        },
    newPatients,
    emergency,
    insurance,
    uninsured,
    mercury,
    nervous,
  ];
}
