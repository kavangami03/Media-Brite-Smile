import { doctors } from "./site";

/* --------------------------------------------------------------------------
   Doctor profile pages. Every sentence below is taken from the doctor's page
   on mediabritesmile.com (About Us > Meet the doctor). Do not add claims the
   practice hasn't published.
-------------------------------------------------------------------------- */

export type DoctorProfile = {
  slug: string;
  /** one-line lead under the name */
  lead: string;
  /** a verbatim sentence from the bio, shown as the scroll statement */
  statement: string;
  /** quick facts for the hero */
  facts: { label: string; value: string }[];
  /** the bio, split into titled chapters (verbatim text) */
  story: { title: string; text: string }[];
  /** education, honours and training, in order */
  journey: { title: string; place: string }[];
  /** clinical focus; labels match service pages where one exists */
  focus: { label: string; href?: string }[];
  /** extra groups shown beside the focus list */
  extras: { title: string; items: string[] }[];
  /** life outside the office */
  personal: string[];
};

const profiles: DoctorProfile[] = [
  {
    slug: "meet-dr-zan-chaudhary-dmd",
    lead: "Born and raised in West Chester, PA, and committed to comprehensive care for patients of all ages.",
    statement:
      "Dr. Zan enjoys smile design and providing cosmetic transformations as much as routine, comprehensive, and preventative care.",
    facts: [
      { label: "Degree", value: "Doctor of Dental Medicine" },
      { label: "Dental school", value: "Nova Southeastern University" },
      { label: "Hometown", value: "West Chester, PA" },
    ],
    story: [
      {
        title: "Roots",
        text: "Dr. Zan was born and raised in West Chester, PA and has been committed to providing comprehensive care to patients of all ages. Dr. Zan completed his Bachelor of Science at West Chester University, and received his Doctorate of Dental Medicine from Nova Southeastern University College of Dental Medicine in Fort Lauderdale, Florida.",
      },
      {
        title: "Giving back",
        text: "Whilst attending Nova Southeastern University, Dr. Zan has worked with rural and underserved populations as part of the Remote Area Medical missions group and the Ryan White Foundation. Alongside his own dental training, Dr. Zan mentored masters students seeking to pursue dentistry, and has also enjoyed teaching human anatomy on cadavers to medical, nursing, fellow dental students, and other post-graduate professionals.",
      },
      {
        title: "In the chair",
        text: "Since returning home to Pennsylvania, Dr. Zan has completed numerous continuing education courses, is Invisalign® certified, and is an active member of the American Dental Association (ADA). Dr. Zan enjoys smile design and providing cosmetic transformations as much as routine, comprehensive, and preventative care.",
      },
      {
        title: "Off duty",
        text: "In his free time, Dr. Zan spends a lot of time with his parents, reading fiction novels, and traveling. Half of his family lives in Dallas, TX and he also enjoys visiting South Florida.",
      },
    ],
    journey: [
      { title: "Bachelor of Science", place: "West Chester University" },
      {
        title: "Doctorate of Dental Medicine",
        place: "Nova Southeastern University College of Dental Medicine, Fort Lauderdale, FL",
      },
      { title: "Invisalign® certified", place: "Plus numerous continuing education courses" },
      { title: "Active member", place: "American Dental Association (ADA)" },
    ],
    focus: [
      { label: "Smile design", href: "/cosmetic-dentistry" },
      { label: "Invisalign", href: "/cosmetic-dentistry/invisalign" },
      { label: "Porcelain Veneers", href: "/cosmetic-dentistry/porcelain-veneers" },
      { label: "Teeth Whitening", href: "/cosmetic-dentistry/teeth-whitening" },
      { label: "Comprehensive family care", href: "/preventative-care" },
      { label: "Exam & Cleaning", href: "/preventative-care/dental-exam-and-cleaning" },
    ],
    extras: [
      {
        title: "Service & teaching",
        items: [
          "Remote Area Medical missions",
          "Ryan White Foundation",
          "Mentored masters students pursuing dentistry",
          "Taught human anatomy to medical, nursing and dental students",
        ],
      },
    ],
    personal: [
      "Time with his parents",
      "Reading fiction novels",
      "Traveling",
      "Family in Dallas, TX",
      "Visiting South Florida",
    ],
  },
  {
    slug: "meet-dr-sanketkumar-suvagiya-dmd",
    lead: "Born and raised in India, he began his journey in dentistry at AMC Dental College before earning his DMD in the United States.",
    statement: "Dr. Suvagiya is committed to delivering compassionate, patient-centered care.",
    facts: [
      { label: "Degree", value: "Doctor of Dental Medicine" },
      { label: "Honours", value: "Highest honors, OKU" },
      { label: "Fellowship", value: "Orofacial Pain, Rutgers" },
    ],
    story: [
      {
        title: "The journey",
        text: "Dr. Sanketkumar Suvagiya was born and raised in India, where he began his journey in dentistry at AMC Dental College. Driven by a passion for advancing his skills and providing high-quality care, he moved to the United States to pursue further education.",
      },
      {
        title: "Training",
        text: "He earned his Doctor of Dental Medicine (DMD) degree from Nova Southeastern University, graduating with the highest honors and receiving recognition from Omicron Kappa Upsilon (OKU), the national dental honor society. He also has a fellowship in Orofacial pain from Rutgers University where he learned how to manage patients with TMD, muscle pain and headaches.",
      },
      {
        title: "In the chair",
        text: "Dr. Suvagiya is committed to delivering compassionate, patient-centered care. He has been actively involved in community dental outreach and takes pride in helping patients achieve healthier, more confident smiles while alleviating pain and discomfort. His clinical interests include restorative dentistry, crowns and bridges, veneers, and root canal therapy and extractions.",
      },
      {
        title: "Off duty",
        text: "Outside the office, Dr. Suvagiya enjoys staying active by working out, playing pickleball, and exploring a variety of cuisines.",
      },
    ],
    journey: [
      { title: "Began in dentistry", place: "AMC Dental College, India" },
      {
        title: "Doctor of Dental Medicine (DMD)",
        place: "Nova Southeastern University, graduated with highest honors",
      },
      { title: "Omicron Kappa Upsilon (OKU)", place: "The national dental honor society" },
      { title: "Fellowship in Orofacial Pain", place: "Rutgers University: TMD, muscle pain and headaches" },
    ],
    focus: [
      { label: "Restorative dentistry", href: "/restorative-dentistry" },
      { label: "Dental Crowns", href: "/restorative-dentistry/dental-crowns" },
      { label: "Dental Bridges", href: "/restorative-dentistry/dental-bridges" },
      { label: "Porcelain Veneers", href: "/cosmetic-dentistry/porcelain-veneers" },
      { label: "Root canal therapy", href: "/restorative-dentistry/non-surgical-root-canal" },
      { label: "Tooth Extractions", href: "/restorative-dentistry/tooth-extractions" },
    ],
    extras: [
      { title: "Orofacial pain care", items: ["TMD", "Muscle pain", "Headaches"] },
      { title: "Giving back", items: ["Community dental outreach"] },
    ],
    personal: ["Working out", "Playing pickleball", "Exploring a variety of cuisines"],
  },
  {
    slug: "meet-dr-bhadresh-makani-dds",
    lead: "An implant-focused dentist dedicated to restoring smiles, confidence and quality of life through advanced implant treatment and full-mouth rehabilitation.",
    statement:
      "Dr. Makani believes in educating patients thoroughly and developing individualized treatment plans that help patients regain the ability to smile, chew, and live confidently again.",
    facts: [
      { label: "Degree", value: "Doctor of Dental Surgery" },
      { label: "Dental school", value: "New York University" },
      { label: "Experience", value: "Thousands of implants placed" },
    ],
    story: [
      {
        title: "Focus",
        text: "Dr. Bhadresh Makani is an implant-focused dentist dedicated to helping patients restore their smiles, confidence, and quality of life through advanced dental implant treatment and full-mouth rehabilitation. After completing his advanced dental training and earning his Doctor of Dental Surgery (DDS) degree from New York University College of Dentistry, Dr. Makani has continued to pursue extensive education and advanced training in implant dentistry, full-mouth reconstruction, and digital dentistry.",
      },
      {
        title: "Experience",
        text: "With years of experience and thousands of implants placed, Dr. Makani performs a wide range of implant procedures including single dental implants, implant-supported bridges, overdentures, full-mouth implant reconstruction, and advanced All-on-X “Teeth-in-a-Day” solutions. He has completed advanced continuing education programs both nationally and internationally, including implant and full-arch rehabilitation training in Portugal, Brazil, and other leading centers for implant education.",
      },
      {
        title: "Technology",
        text: "Dr. Makani stays at the forefront of modern implant dentistry by utilizing advanced technology including CBCT 3D imaging, digital implant planning, guided surgery, intraoral scanning, and photogrammetry for full-arch implant cases. His experience with multiple implant systems and techniques allows him to provide personalized treatment solutions tailored to each patient’s needs, anatomy, and long-term goals.",
      },
      {
        title: "Comfort",
        text: "Patient comfort is an important part of Dr. Makani’s approach to care. He offers nitrous oxide and oral sedation options to help patients feel relaxed and comfortable throughout treatment while focusing on delivering functional, natural-looking, and long-lasting results. Known for his compassionate approach and attention to detail, Dr. Makani believes in educating patients thoroughly and developing individualized treatment plans that help patients regain the ability to smile, chew, and live confidently again.",
      },
      {
        title: "Off duty",
        text: "Outside of dentistry, Dr. Makani enjoys spending time with family, traveling, continuing advanced education, and staying current with the latest advancements in implant and restorative dentistry.",
      },
    ],
    journey: [
      { title: "Doctor of Dental Surgery (DDS)", place: "New York University College of Dentistry" },
      { title: "Advanced training", place: "Implant dentistry, full-mouth reconstruction and digital dentistry" },
      {
        title: "International education",
        place: "Implant and full-arch rehabilitation training in Portugal and Brazil",
      },
      { title: "Thousands of implants placed", place: "Across multiple implant systems and techniques" },
    ],
    focus: [
      { label: "Single dental implants", href: "/restorative-dentistry/dental-implants" },
      { label: "Implant-supported bridges", href: "/restorative-dentistry/dental-bridges" },
      { label: "Overdentures", href: "/restorative-dentistry/dentures" },
      { label: "Full-mouth implant reconstruction", href: "/restorative-dentistry/dental-implants" },
      { label: "All-on-X “Teeth-in-a-Day”", href: "/restorative-dentistry/dental-implants" },
    ],
    extras: [
      {
        title: "Technology he uses",
        items: [
          "CBCT 3D imaging",
          "Digital implant planning",
          "Guided surgery",
          "Intraoral scanning",
          "Photogrammetry",
        ],
      },
      { title: "Comfort options", items: ["Nitrous oxide", "Oral sedation"] },
    ],
    personal: [
      "Time with family",
      "Traveling",
      "Continuing advanced education",
      "The latest in implant and restorative dentistry",
    ],
  },
];

export type Doctor = (typeof doctors)[number];

/** Title of the personal chapter: shown in "Outside the office", not in the story chapters. */
export const OFF_DUTY = "Off duty";

export const doctorSlug = (d: Doctor) => d.href.split("/").pop()!;

export function getDoctor(slug: string) {
  const doctor = doctors.find((d) => doctorSlug(d) === slug);
  const profile = profiles.find((p) => p.slug === slug);
  return doctor && profile ? { doctor, profile } : undefined;
}

export const doctorSlugs = profiles.map((p) => p.slug);
