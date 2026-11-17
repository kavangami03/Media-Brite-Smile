/**
 * Single source of truth for practice facts.
 * Every value below was taken from the live site (mediabritesmile.com).
 * Do not add figures here that the practice hasn't published.
 */
import { towns } from "./towns";

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
  /** Client-confirmed 12 Nov 2026 (fact sheet rev 8). */
  rating: { score: 4.9, count: 375 },
  /** Google Business Profile: where patients read and leave reviews. */
  gbp: "https://share.google/Z17lNb61NwzjEhpLz",
  /** From /contact-us/. Friday alternates, so it is shown as text and never put in structured data. */
  hours: [
    { day: "Monday", short: "Mon", open: "8:00am", close: "3:00pm" },
    { day: "Tuesday", short: "Tue", open: "8:00am", close: "5:00pm" },
    { day: "Wednesday", short: "Wed", open: "8:00am", close: "5:00pm" },
    { day: "Thursday", short: "Thu", open: "8:00am", close: "5:00pm" },
    { day: "Friday", short: "Fri", open: "8:00am", close: "2:00pm", note: "Alternate Fridays" },
    { day: "Saturday", short: "Sat", closed: true },
    { day: "Sunday", short: "Sun", closed: true },
  ] as { day: string; short: string; open?: string; close?: string; note?: string; closed?: boolean }[],
  insurancePlans: 42,
  social: {
    facebook: "https://www.facebook.com/mediabritesmile",
    google:
      "https://www.google.com/maps/place/Media+Brite+Smile/@39.9318304,-75.3882651,15z/data=!4m6!3m5!1s0x89c6e9758c11ae31:0x619cd5cf2e3c3f8f!8m2!3d39.9318304!4d-75.3882651!16s%2Fg%2F1th7nv_f",
    yelp: "https://www.yelp.com/biz/media-brite-smile-media",
  },
  bookingHref: "/patient-information/scheduling",
  /** Town pages from the approved sitemap (Media is the office itself; Philadelphia is a mention only). */
  serviceAreas: [
    "Rose Valley",
    "Wallingford",
    "Upper Providence",
    "Springfield",
    "Brookhaven",
    "Swarthmore",
    "Morton",
    "Ridley Park",
    "Clifton Heights",
    "Glen Mills",
    "Newtown Square",
    "Broomall",
    "Garnet Valley",
    "Aston",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

/* Every URL below comes from the approved sitemap (Keyword Map & Sitemap, 12-13 Nov 2026). */

/** `note` is a short fact shown beside the link (e.g. a measured drive time). */
export type NavLink = { label: string; href: string; note?: string };
export type NavSection = { title: string; links: NavLink[] };
/** `short` is the label shown in the desktop bar (the full one does not fit beside the phone and booking button). */
export type NavGroup = { label: string; href: string; links: NavLink[]; sections?: NavSection[]; short?: string };

const group = (label: string, href: string, sections: NavSection[]): NavGroup => ({
  label,
  href,
  sections,
  links: sections.flatMap((s) => s.links),
});

/** Services index page (sitemap: Patient Info > Our Dental Services) */
export const servicesHref = "/patient-information/services";

const serviceSections = {
  general: [
    {
      title: "Routine care",
      links: [
        { label: "Family Dentistry", href: "/preventative-care/family-dentistry" },
        { label: "General Dentistry", href: "/preventative-care/general-dentistry" },
        { label: "Teeth Cleaning & Check-Ups", href: "/preventative-care/teeth-cleaning-and-check-ups" },
        { label: "Oral Hygiene", href: "/preventative-care/oral-hygiene" },
        { label: "Fluoride Treatment", href: "/preventative-care/fluoride" },
      ],
    },
    {
      title: "Gum disease",
      links: [
        { label: "Gum Disease Treatment", href: "/preventative-care/gum-disease-treatment" },
        { label: "Deep Teeth Cleaning", href: "/preventative-care/gum-disease-treatment/deep-teeth-cleaning" },
        {
          label: "Gum Disease Laser Therapy",
          href: "/preventative-care/gum-disease-treatment/gum-disease-laser-therapy",
        },
        {
          label: "Periodontal Maintenance",
          href: "/preventative-care/gum-disease-treatment/periodontal-maintenance",
        },
        { label: "Arestin", href: "/preventative-care/arestin" },
      ],
    },
    {
      title: "Children & protection",
      links: [
        { label: "Child Dentistry", href: "/preventative-care/child-dentistry" },
        { label: "Night Guards", href: "/preventative-care/night-guards" },
      ],
    },
    {
      title: "Urgent care",
      links: [{ label: "Emergency Dentistry", href: "/preventative-care/emergency-dentistry" }],
    },
    {
      title: "Diagnostics & technology",
      links: [
        { label: "Oral Cancer Screening", href: "/preventative-care/oral-cancer-screenings" },
        { label: "Intraoral Scanner", href: "/preventative-care/intraoral-scanner" },
        { label: "Digital X-Rays", href: "/preventative-care/digital-x-rays" },
      ],
    },
    {
      title: "Jaw & facial pain",
      links: [{ label: "TMJ & TMD Treatment", href: "/tmj-tmd-treatment-media-pa" }],
    },
  ],
  cosmetic: [
    {
      title: "Whitening & straightening",
      links: [
        { label: "Teeth Whitening", href: "/cosmetic-dentistry/teeth-whitening" },
        { label: "Invisalign", href: "/cosmetic-dentistry/invisalign" },
      ],
    },
    {
      title: "Smile restoration",
      links: [
        { label: "Porcelain Veneers", href: "/cosmetic-dentistry/porcelain-veneers" },
        { label: "Dental Bonding", href: "/cosmetic-dentistry/dental-bonding" },
        { label: "Inlays & Onlays", href: "/cosmetic-dentistry/inlays-onlays" },
      ],
    },
  ],
  restorative: [
    {
      title: "Repair damaged teeth",
      links: [
        { label: "Dental Fillings", href: "/restorative-dentistry/dental-fillings" },
        { label: "Dental Crowns", href: "/restorative-dentistry/dental-crowns" },
        { label: "Dental Sealants", href: "/restorative-dentistry/dental-sealants" },
      ],
    },
    {
      title: "Replace missing teeth",
      links: [
        { label: "Dental Implants", href: "/restorative-dentistry/dental-implants" },
        { label: "Full-Arch Implants (All-on-X)", href: "/restorative-dentistry/full-arch-dental-implants" },
        { label: "Dental Bridges", href: "/restorative-dentistry/dental-bridges" },
        { label: "Dentures", href: "/restorative-dentistry/dentures" },
      ],
    },
    {
      title: "Denture services",
      links: [
        { label: "Partial Dentures", href: "/restorative-dentistry/dentures/partial-dentures" },
        { label: "Immediate Dentures", href: "/restorative-dentistry/dentures/immediate-dentures" },
        {
          label: "Implant-Retained Dentures",
          href: "/restorative-dentistry/dentures/implant-retained-dentures",
        },
        { label: "Denture Relines", href: "/restorative-dentistry/dentures/denture-relines" },
        { label: "Denture Care", href: "/restorative-dentistry/dentures/denture-care" },
        { label: "Denture Rebase & Repairs", href: "/restorative-dentistry/rebase-repairs" },
        { label: "Soft Liners", href: "/restorative-dentistry/dentures/soft-liners" },
      ],
    },
    {
      title: "Save or remove teeth",
      links: [
        { label: "Root Canal", href: "/restorative-dentistry/root-canal" },
        { label: "Non-Surgical Root Canal", href: "/restorative-dentistry/non-surgical-root-canal" },
        { label: "Tooth Extractions", href: "/restorative-dentistry/tooth-extractions" },
        { label: "Wisdom Teeth Removal", href: "/restorative-dentistry/wisdom-teeth-removal" },
      ],
    },
  ],
} satisfies Record<string, NavSection[]>;

/** Pick links by label from a category's sections (keeps one source of URLs). */
const pick = (sections: NavSection[], labels: string[]) =>
  labels.map((label) => sections.flatMap((s) => s.links).find((l) => l.label === label)!);

/**
 * The three treatment categories. `sections` is the full sitemap list (header menus);
 * `links` is a shorter highlight list for page sections and the footer; `total` counts every page.
 */
export const serviceGroups = [
  {
    id: "general",
    label: "Preventive & Family",
    title: "Preventative Care",
    blurb: "Check-ups, cleanings, gum care and children's dentistry that keep every generation healthy.",
    href: "/preventative-care",
    image: "/images/hero/young-patient-smile.jpg",
    sections: serviceSections.general,
    total: serviceSections.general.flatMap((s) => s.links).length,
    links: pick(serviceSections.general, [
      "Family Dentistry",
      "Teeth Cleaning & Check-Ups",
      "Child Dentistry",
      "Emergency Dentistry",
      "Gum Disease Treatment",
      "Deep Teeth Cleaning",
      "Night Guards",
      "TMJ & TMD Treatment",
      "Fluoride Treatment",
      "Oral Cancer Screening",
    ]),
  },
  {
    id: "cosmetic",
    label: "Cosmetic",
    title: "Cosmetic Dentistry",
    blurb: "Natural-looking smile design, from whitening to porcelain veneers.",
    href: "/cosmetic-dentistry",
    image: "/images/services/natural-smile.jpg",
    sections: serviceSections.cosmetic,
    total: serviceSections.cosmetic.flatMap((s) => s.links).length,
    links: serviceSections.cosmetic.flatMap((s) => s.links),
  },
  {
    id: "restorative",
    label: "Restorative & Implants",
    title: "Restorative Dentistry",
    blurb: "Implants, crowns, bridges, dentures and root canals, all handled in the same practice.",
    href: "/restorative-dentistry",
    image: "/images/services/implant-consult.jpg",
    sections: serviceSections.restorative,
    total: serviceSections.restorative.flatMap((s) => s.links).length,
    links: pick(serviceSections.restorative, [
      "Dental Implants",
      "Full-Arch Implants (All-on-X)",
      "Dental Crowns",
      "Dental Bridges",
      "Dentures",
      "Dental Fillings",
      "Root Canal",
      "Tooth Extractions",
      "Wisdom Teeth Removal",
      "Denture Rebase & Repairs",
    ]),
  },
];

/** Areas We Serve. Drive times measured in Google Maps from 8 N Pennell Rd on 12 Nov 2026 (content plan). */
export const areasNav = group("Areas We Serve", "/areas-we-serve", [
  {
    title: "Closest to the practice",
    links: [
      { label: "Rose Valley", href: "/dentist-rose-valley-pa", note: "~6 min" },
      { label: "Wallingford", href: "/dentist-wallingford-pa", note: "~8 min" },
      { label: "Upper Providence", href: "/dentist-upper-providence-pa", note: "Next door" },
    ],
  },
  {
    title: "Lower Delaware County",
    links: [
      { label: "Springfield", href: "/dentist-springfield-pa", note: "~7 min" },
      { label: "Brookhaven", href: "/dentist-brookhaven-pa", note: "~9 min" },
      { label: "Swarthmore", href: "/dentist-swarthmore-pa", note: "~10 min" },
      { label: "Morton", href: "/dentist-morton-pa", note: "~11 min" },
      { label: "Ridley Park", href: "/dentist-ridley-park-pa", note: "~11 min" },
      { label: "Clifton Heights", href: "/dentist-clifton-heights-pa", note: "~12 min" },
    ],
  },
  {
    title: "Western & northern Delco",
    links: [
      { label: "Glen Mills", href: "/dentist-glen-mills-pa", note: "~8 min" },
      { label: "Newtown Square", href: "/dentist-newtown-square-pa", note: "~8 min" },
      { label: "Broomall", href: "/dentist-broomall-pa", note: "~10 min" },
      { label: "Garnet Valley", href: "/dentist-garnet-valley-pa", note: "~10 min" },
      { label: "Aston", href: "/dentist-aston-pa", note: "~11 min" },
    ],
  },
]);

export const mainNav: (NavLink | NavGroup)[] = [
  group("About", "/about-us", [
    {
      title: "Meet our dentists",
      links: [
        { label: "Meet Dr. Zan Chaudhary", href: "/about-us/meet-dr-zan-chaudhary-dmd" },
        { label: "Meet Dr. Sanketkumar Suvagiya", href: "/about-us/meet-dr-sanketkumar-suvagiya-dmd" },
        { label: "Meet Dr. Bhadresh Makani", href: "/about-us/meet-dr-bhadresh-makani-dds" },
      ],
    },
    {
      title: "Get to know us",
      links: [
        { label: "Meet the Staff", href: "/about-us/meet-the-staff" },
        { label: "Office Tour", href: "/about-us/office-tour" },
        { label: "Patient Reviews", href: "/about-us/patient-reviews" },
        { label: "Smile Gallery", href: "/about-us/smile-gallery" },
      ],
    },
  ]),
  /* the three treatment categories, each with its own dropdown */
  ...serviceGroups.map((g) => ({ ...group(g.title, g.href, g.sections), short: g.title.split(" ")[0] })),
  group("Patients", "/patient-information", [
    {
      title: "New patients",
      links: [
        { label: "New Patients", href: "/patient-information/new-patients" },
        { label: "Request an Appointment", href: "/patient-information/scheduling" },
        { label: "Patient Registration", href: "/patient-information/patient-registration" },
        { label: "Why Choose Us", href: "/patient-information/why-choose-us" },
      ],
    },
    {
      title: "Paying for care",
      links: [
        { label: "Insurance & Payment Options", href: "/patient-information/insurance-payment-options" },
        { label: "CareCredit", href: "/patient-information/care-credit" },
        { label: "Dental Savings Plan", href: "/about-us/dental-savings-plan" },
      ],
    },
    {
      title: "Comfort & safety",
      links: [
        { label: "Care & Comfort", href: "/patient-information/care-and-comfort" },
        { label: "Advanced Technology", href: "/patient-information/care-and-comfort/advanced-technology" },
        { label: "Infection Control", href: "/patient-information/care-and-comfort/infection-control" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Patient Education", href: "/patient-information/patient-education" },
        { label: "Home Care Instructions", href: "/patient-information/care-and-comfort/home-instructions" },
        { label: "Dental Blog", href: "/blog" },
      ],
    },
  ]),
  { label: "Blog", href: "/blog" },
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
/* Home FAQ (word for word from the approved Home draft v2)                   */
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
    q: "Where is Media Brite Smile located?",
    a: "Media Brite Smile is at 8 N Pennell Rd, Media, PA 19063, in Delaware County. Pennell Road runs south from Media toward Aston, off Baltimore Pike. Patients travel in from Swarthmore, Wallingford, Springfield, Brookhaven, Rose Valley and Aston.",
    category: "visit",
    link: { label: "Get directions", href: site.address.directions, external: true },
  },
  {
    q: "What are your opening hours?",
    a: `The practice opens at 8am every weekday. Monday it closes at 3pm, Tuesday to Thursday at 5pm, and Friday at 2pm on alternate Fridays. Because Friday alternates, call ${site.phone.display} to check the date before travelling.`,
    category: "visit",
    link: { label: "Directions, map and opening hours", href: "/contact-us" },
  },
  {
    q: "How many dentists work at the practice?",
    a: "Three. Dr. Zan Chaudhary DMD, Dr. Sanketkumar Suvagiya DMD and Dr. Bhadresh Makani DDS all practise at Media Brite Smile. That gives more appointment slots across the week and keeps complex cases inside the practice instead of being referred out.",
    category: "visit",
    link: { label: "About the practice and the team", href: "/about-us" },
  },
  {
    q: "Do you take my dental insurance?",
    a: `Dental insurance is billed directly, so you are not left claiming it back. Which plans apply depends on your policy, and coverage cannot be confirmed from a website. Call ${site.phone.display} with your plan name and we will check it before you book.`,
    category: "cost",
    link: { label: "Insurance and payment options", href: "/patient-information/insurance-payment-options" },
  },
  {
    q: "What if I have no dental insurance?",
    a: "The in-house Dental Savings Plan covers routine care for a set annual cost, and CareCredit spreads larger treatment over monthly payments. Plenty of patients here have no insurance at all. Ask about both when you call and we will explain which one suits you.",
    category: "cost",
    link: { label: "Dental Savings Plan", href: "/about-us/dental-savings-plan" },
  },
  {
    q: "Can I be seen if I have a dental emergency?",
    a: `Call ${site.phone.display} and describe what has happened. Urgent problems are triaged on the phone, and you will be told how soon you need to be seen and what to do meanwhile. If you have severe facial swelling, trouble breathing or trouble swallowing, go to an emergency room or call 911 instead.`,
    category: "visit",
    link: { label: `Call ${site.phone.display}`, href: site.phone.href },
  },
  {
    q: "What does a first visit cost?",
    a: `For uninsured patients the New Patient Special is $99, against a regular price of $315. If you have dental insurance, the practice bills your insurer and tracks the claim, and what you pay depends on your plan. Call ${site.phone.display} with your plan name to check before you book.`,
    category: "cost",
    link: { label: "Current special offers", href: "/special-offers" },
  },
  {
    q: "Is Media Brite Smile accepting new patients?",
    a: `Yes, new patients are welcome at the practice. Call ${site.phone.display} or send an appointment request and you will get a reply with the closest available times across the three dentists. First appointments run longer than a routine check-up because the examination is more thorough.`,
    category: "visit",
    link: { label: "Request an appointment", href: site.bookingHref },
  },
  {
    q: "Do you offer sedation for nervous patients?",
    a: "Yes. Nitrous oxide and oral sedation are available to help you stay comfortable during treatment. Deeper hospital-level sedation is not something this practice provides. Tell us when you book that you are anxious, and the appointment will be paced around that.",
    category: "care",
    link: { label: "Care and comfort", href: "/patient-information/care-and-comfort" },
  },
  {
    q: "Do you treat children as well as adults?",
    a: "Yes. Children's dentistry is provided by the general dentists at the practice, covering first visits, check-ups, fluoride and sealants. Families often book children alongside an adult appointment. Cases needing a paediatric specialist are referred on.",
    category: "care",
    link: { label: "What new patients need to know", href: "/patient-information/new-patients" },
  },
  {
    q: "How far is the practice from Swarthmore or Springfield?",
    a: "Both are a short drive, measured in Google Maps from 8 N Pennell Rd. Swarthmore is about 10 minutes and 3.8 miles via N Providence Rd and E Baltimore Pike. Springfield, Delaware County, is about 7 minutes and 4.1 miles via US-1 N.",
    category: "visit",
    link: { label: "Find your town and how to get here", href: "/areas-we-serve" },
  },
];

/* -------------------------------------------------------------------------- */
/* Service-area location pages                                                */
/* -------------------------------------------------------------------------- */

export type Location = {
  name: string;
  slug: string;
  /** Sitemap URL, e.g. /dentist-swarthmore-pa */
  href: string;
  isHome: boolean;
  /** Measured in Google Maps from 8 N Pennell Rd on 12 Nov 2026 (Areas We Serve draft) */
  drive: { time: string | null; miles: string | null; route: string };
  /** Google Maps turn-by-turn directions from the town to the office */
  directions: string;
  /** Embeddable Google map: the route from the town to the office */
  routeEmbed: string;
};

const toSlug = (s: string) => `${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-pa`;

/**
 * Exact place names for Google Maps. "Upper Providence, PA" and "Springfield, PA"
 * also exist elsewhere in Pennsylvania, so the ZIP pins them to Delaware County.
 */
const mapPlace: Record<string, string> = {
  "Upper Providence": "Upper Providence Township, PA 19063",
  Springfield: "Springfield Township, Delaware County, PA 19064",
  Wallingford: "Wallingford, PA 19086",
};

export const locations: Location[] = site.serviceAreas.map((name) => {
  const town = towns.find((t) => t.name === name)!;
  const origin = encodeURIComponent(mapPlace[name] ?? `${name}, PA`);
  const destination = encodeURIComponent(site.address.full);
  return {
    name,
    slug: toSlug(name),
    href: `/dentist-${toSlug(name)}`,
    isHome: false,
    drive: town.drive,
    directions: `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
    routeEmbed: `https://maps.google.com/maps?saddr=${origin}&daddr=${destination}&dirflg=d&output=embed`,
  };
});

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
