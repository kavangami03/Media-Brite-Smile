/* --------------------------------------------------------------------------
   Town pages (/dentist-{town}-pa). GENERATED from the approved location drafts
   (06 Locations, 12-13 Nov 2026). Copy is verbatim; drive times are the ones the
   content team measured in Google Maps from 8 N Pennell Rd on 12 Nov 2026.
   Edit the drafts and regenerate rather than editing this file by hand.
-------------------------------------------------------------------------- */

export type TownItem = { type: "p"; text: string } | { type: "link"; text: string; href: string };
export type Town = {
  slug: string;
  name: string;
  zip: string;
  area: string;
  drive: { time: string | null; miles: string | null; route: string };
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: { heading: string; items: TownItem[] }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; text: string };
};

export const towns: Town[] = [
  {
    slug: "rose-valley-pa",
    name: "Rose Valley",
    zip: "19063, 19065",
    area: "Closest to the practice",
    drive: {
      time: "~6 min",
      miles: "2.8 mi",
      route: "N Providence Rd and Manchester Ave",
    },
    title: "Dentist Near Rose Valley, PA | Media Brite Smile",
    description:
      "Dentist for Rose Valley, PA, about 6 minutes via Providence Rd and Manchester Ave. Check-ups, cleanings and gum care close to home.",
    h1: "Your Dentist Near Rose Valley, PA",
    intro: [
      "Media Brite Smile is about 6 minutes from Rose Valley, 2.8 miles via N Providence Road and Manchester Avenue. That makes regular check-ups and cleanings easy to keep up, which is most of what keeps teeth healthy.",
    ],
    sections: [
      {
        heading: "Dental Care for Rose Valley Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media, not in Rose Valley, and it is one of the closest dental practices to the borough. Three dentists cover routine family care, gum treatment, implants, dentures, cosmetic work and urgent appointments.",
          },
        ],
      },
      {
        heading: "Getting Here From Rose Valley",
        items: [
          {
            type: "p",
            text: "From Rose Valley, take Manchester Avenue to N Providence Road and head into Media, finishing on N Pennell Road. Google Maps measured it at about 6 minutes and 2.8 miles on 12 November 2026.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Rose Valley Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Being close is most useful for the visits that come round regularly:",
          },
          {
            type: "p",
            text: "Check-ups and cleanings for the whole family",
          },
          {
            type: "p",
            text: "Periodontal maintenance every few months after gum treatment",
          },
          {
            type: "p",
            text: "Invisalign reviews every 6 to 8 weeks",
          },
          {
            type: "p",
            text: "Urgent appointments, triaged on the phone",
          },
          {
            type: "p",
            text: "Larger treatment such as dental implants, crowns and dentures is handled at the same practice, along with family dentistry for every age. If you need an emergency dentist near Rose Valley, PA, call first and the problem is triaged by phone.",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Rose Valley: Moylan, Old Mill Lane",
        items: [
          {
            type: "p",
            text: "This page covers Rose Valley borough (ZIP 19063 and 19065), including the Old Mill Lane area and nearby Moylan. Wallingford, next door, has its own Wallingford page, and every other town is on the Areas We Serve page.",
          },
        ],
      },
      {
        heading: "New Patients From Rose Valley",
        items: [
          {
            type: "p",
            text: "This is a dentist accepting new patients in Rose Valley, PA. If you have no insurance, a first visit is $99 under the New Patient Special, compared with a regular $315, and the in-house Dental Savings Plan covers routine care for a set yearly fee.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Rose Valley Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Rose Valley?",
        a: "About 6 minutes and 2.8 miles via Manchester Avenue and N Providence Road, measured in Google Maps from 8 N Pennell Rd in Media. It is one of the shortest drives of any town the practice serves.",
      },
      {
        q: "Do you treat children from Rose Valley?",
        a: "Yes, from around their first birthday. The general dentists provide check-ups, cleanings, fluoride and sealants for children, and Rose Valley families can often book parents and children together.",
      },
      {
        q: "Can a Rose Valley patient get an urgent appointment?",
        a: "Call (610) 566-2711 early in the day and explain the problem. It is triaged on the call, and urgent cases are seen the same day whenever possible; at six minutes away, you can usually come in soon after.",
      },
    ],
    cta: {
      title: "Book From Rose Valley",
      text: "Six minutes away, which makes the regular visits easy to keep.",
    },
  },
  {
    slug: "wallingford-pa",
    name: "Wallingford",
    zip: "19086",
    area: "Closest to the practice",
    drive: {
      time: "~8 min",
      miles: "3.7 mi",
      route: "N Providence Rd (PA-252)",
    },
    title: "Dentist Near Wallingford, PA | Media Brite Smile",
    description:
      "Dental care for Wallingford and Nether Providence, PA. About 8 minutes up Providence Road. Three dentists, $99 new patient exam.",
    h1: "Your Dentist Near Wallingford, PA",
    intro: [
      "Media Brite Smile is about 8 minutes from Wallingford, 3.7 miles straight up Providence Road. Three dentists, and the whole family can usually be booked together.",
    ],
    sections: [
      {
        heading: "Getting Here From Wallingford",
        items: [
          {
            type: "p",
            text: "Follow N Providence Road (PA-252) north and the practice is on N Pennell Road in Media. About 8 minutes, 3.7 miles, with no highway involved.",
          },
          {
            type: "p",
            text: "That matters more in Wallingford than elsewhere. Providence Road is the spine of the township, so for most of Nether Providence this is a single-road trip rather than a cross-county run.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Serving Nether Providence Township",
        items: [
          {
            type: "p",
            text: "Wallingford is the name people use; Nether Providence Township is the municipality it sits in, and the practice covers all of it.",
          },
          {
            type: "p",
            text: "ZIP 19086 covers Wallingford and most of Nether Providence Township. That includes the residential streets either side of Providence Road, the area around Wallingford station, and the parts of the township that shade into Rose Valley and Swarthmore. Wallingford is served by the Wallingford-Swarthmore School District.",
          },
        ],
      },
      {
        heading: "What Wallingford Patients Come In For",
        items: [
          {
            type: "p",
            text: "The pattern here is family care more than anything else.",
          },
          {
            type: "p",
            text: "Wallingford households tend to book as a household: children's check-ups alongside an adult appointment, and often a grandparent too. Having three dentists is what makes grouping those appointments realistic rather than three separate trips.",
          },
          {
            type: "p",
            text: "Routine check-ups, cleanings, children's dentistry, fillings and crowns make up most of it, with cosmetic work and implants alongside.",
          },
          {
            type: "p",
            text: "Two other things bring Wallingford patients in. Emergencies, such as a broken tooth or sudden pain, triaged on the phone so you know how soon to come in. And dentures, which are fitted, relined and repaired by the practice that has your records.",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
          {
            type: "link",
            text: "Teeth cleaning and check-ups",
            href: "/preventative-care/teeth-cleaning-and-check-ups",
          },
          {
            type: "link",
            text: "Children's dentistry",
            href: "/preventative-care/child-dentistry",
          },
          {
            type: "link",
            text: "Emergency dentistry",
            href: "/preventative-care/emergency-dentistry",
          },
          {
            type: "link",
            text: "Dentures",
            href: "/restorative-dentistry/dentures",
          },
          {
            type: "link",
            text: "Dental implants",
            href: "/restorative-dentistry/dental-implants",
          },
        ],
      },
      {
        heading: "Booking From Wallingford",
        items: [
          {
            type: "p",
            text: "New patients are welcome, and the uninsured rate for a first examination is $99 against a regular price of $315.",
          },
          {
            type: "p",
            text: "Patients without insurance can also join the in-house Dental Savings Plan, which covers two exams, an emergency exam, two oral cancer screenings and a year of X-rays at a fixed annual price.",
          },
          {
            type: "p",
            text: "Doors open at 8am, which from Wallingford means arriving before work with the Providence Road run taking under ten minutes. Friday hours alternate, so check before booking a Friday.",
          },
          {
            type: "link",
            text: "What new patients need to know",
            href: "/patient-information/new-patients",
          },
          {
            type: "link",
            text: "Insurance and payment options",
            href: "/patient-information/insurance-payment-options",
          },
          {
            type: "link",
            text: "Every area we serve, with drive times",
            href: "/areas-we-serve",
          },
        ],
      },
    ],
    faqHeading: "Questions From Wallingford Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Wallingford?",
        a: "About 8 minutes, covering 3.7 miles north on N Providence Road (PA-252), measured in Google Maps from the centre of Wallingford. There is no highway section, so the time holds up reasonably well outside rush hour on Baltimore Pike.",
      },
      {
        q: "Do you cover Nether Providence Township as well?",
        a: "Yes. Wallingford is the commonly used name and Nether Providence Township is the municipality, and the practice treats patients from across it, including the areas bordering Rose Valley and Swarthmore.",
      },
      {
        q: "Can my whole family be seen on one trip from Wallingford?",
        a: "Often, yes. Three dentists practise here, so there is usually more than one chair free at a given time. Say you want appointments grouped when you call (610) 566-2711 and the team will arrange it.",
      },
      {
        q: "Are you taking new patients from Wallingford?",
        a: "Yes, the practice is accepting new patients from Wallingford and the rest of 19086. Uninsured new patients can use the $99 New Patient Special against a regular price of $315. If you have insurance, call with the plan name and it will be checked before you book.",
      },
    ],
    cta: {
      title: "Book From Wallingford",
      text: "Eight minutes up Providence Road, three dentists, costs published up front.",
    },
  },
  {
    slug: "upper-providence-pa",
    name: "Upper Providence",
    zip: "19063",
    area: "Closest to the practice",
    drive: {
      time: null,
      miles: null,
      route: "Next door to the practice",
    },
    title: "Dentist Near Upper Providence, PA | Media Brite Smile",
    description:
      "Dentist for Upper Providence Township, Delaware County, right next door in Media. Jaw pain, TMD and family care from a three-dentist practice.",
    h1: "Your Dentist Near Upper Providence, PA",
    intro: [
      "Media Brite Smile sits right next to Upper Providence Township, on N Pennell Road in Media, so for most of the township there is no meaningful drive at all. Alongside family dentistry, the practice has a dentist with a fellowship in orofacial pain, for jaw pain, clicking and TMD.",
    ],
    sections: [
      {
        heading: "Dental Care for Upper Providence Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media rather than in the township itself, but it borders Upper Providence. It serves township households with three dentists covering check-ups and cleanings, gum treatment, implants, dentures, cosmetic work and urgent appointments.",
          },
        ],
      },
      {
        heading: "Getting Here From Upper Providence",
        items: [
          {
            type: "p",
            text: "N Providence Road, PA-252, runs from the township straight into Media, and the practice is on N Pennell Road. Google Maps shows the practice adjoining the township, so there is no meaningful drive time to quote.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Upper Providence Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Jaw pain, clicking and TMD. Dr. Sanketkumar Suvagiya DMD holds a fellowship in Orofacial Pain from Rutgers University and assesses TMD, jaw-muscle pain and headaches linked to the jaw. Teeth grinding. Custom night guards protect worn teeth, and the dentist will tell you whether jaw symptoms need assessing in their own right.",
          },
          {
            type: "p",
            text: "Everyday care. Family dentistry, dental implants placed by Dr. Bhadresh Makani DDS, and emergency appointments.",
          },
          {
            type: "link",
            text: "TMJ and TMD treatment",
            href: "/tmj-tmd-treatment-media-pa",
          },
          {
            type: "link",
            text: "Night guards",
            href: "/preventative-care/night-guards",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Upper Providence: Rose Tree, Rose Tree Park",
        items: [
          {
            type: "p",
            text: "This page covers Upper Providence Township in Delaware County, ZIP 19063 and 19086, including the Rose Tree area around Rose Tree Park.",
          },
          {
            type: "p",
            text: "Upper Providence Township in Delaware County is a different place from Upper Providence Township in Montgomery County. Other nearby towns are on the Areas We Serve page.",
          },
        ],
      },
      {
        heading: "New Patients From Upper Providence",
        items: [
          {
            type: "p",
            text: "Looking for a dentist accepting new patients in Upper Providence, PA? Township patients are welcome. Uninsured new patients pay $99 for a first visit under the New Patient Special, with a regular price of $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "The practice works with more than 40 insurance plans and bills them directly. Patients without cover can use the in-house Dental Savings Plan, and CareCredit is available for larger treatment.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Upper Providence Patients",
    faqs: [
      {
        q: "How far is the practice from Upper Providence Township?",
        a: "The practice adjoins the township, on N Pennell Road in Media, just off N Providence Road (PA-252). For most of Upper Providence there is no meaningful drive, so a quick appointment before or after work is easy to fit in.",
      },
      {
        q: "Is there a dentist near Upper Providence who treats jaw pain?",
        a: "Yes. Dr. Sanketkumar Suvagiya DMD holds a fellowship in Orofacial Pain from Rutgers University and assesses TMD, jaw-muscle pain, clicking and headaches linked to the jaw. Book an assessment and describe your symptoms when you call.",
      },
      {
        q: "Do you see children from Upper Providence?",
        a: "Yes. The general dentists see children from around their first birthday for check-ups, cleanings, fluoride and sealants, and there is no pediatric specialist on staff, so a child who needs one is referred on.",
      },
      {
        q: "Is this Upper Providence in Delaware County or Montgomery County?",
        a: "Upper Providence Township in Delaware County, next to Media. There is a separate Upper Providence Township in Montgomery County, which is a different area entirely.",
      },
    ],
    cta: {
      title: "Book From Upper Providence",
      text: "Right next door, with jaw-pain expertise in house.",
    },
  },
  {
    slug: "springfield-pa",
    name: "Springfield",
    zip: "19064",
    area: "Lower Delaware County",
    drive: {
      time: "~7 min",
      miles: "4.1 mi",
      route: "US-1 N (Baltimore Pike)",
    },
    title: "Dentist Near Springfield, Delaware County PA",
    description:
      "Dental care for Springfield, Delaware County (19064), about 7 minutes up US-1. Three dentists, implants, emergencies, $99 new patient exam.",
    h1: "Your Dentist Near Springfield, Delaware County, PA",
    intro: [
      "Media Brite Smile is about 7 minutes from Springfield, 4.1 miles along US-1. Of every town the practice serves, Springfield in Delaware County is among the quickest to reach.",
    ],
    sections: [
      {
        heading: "Springfield, Delaware County, Not Tioga County",
        items: [
          {
            type: "p",
            text: "This page is about Springfield Township in Delaware County, ZIP 19064, about 7 minutes from Media.",
          },
          {
            type: "p",
            text: 'Worth stating plainly, because mapping apps get it wrong. Searching "Springfield, PA 19064" in Google Maps returns Springfield in Tioga County, nearly 200 miles north. If you are checking the route, search Springfield Township, Delaware County or the practice address directly.',
          },
        ],
      },
      {
        heading: "Getting Here From Springfield, Delaware County",
        items: [
          {
            type: "p",
            text: "Take US-1 south, the Baltimore Pike, and the practice is on N Pennell Road in Media. About 7 minutes, 4.1 miles, measured in Google Maps on 12 November 2026.",
          },
          {
            type: "p",
            text: "From the Springfield Mall end it is a straight run with no turns worth describing.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Springfield Township (19064), a Large Township Nearby",
        items: [
          {
            type: "p",
            text: "Springfield is one of the larger communities near the practice, with roughly 24,500 residents in ZIP 19064.",
          },
          {
            type: "p",
            text: "It is also well served by dentists, including a multi-location group with a Springfield office. What this practice offers is three dentists with distinct focuses, published prices, and implant and full-arch work handled in house.",
          },
        ],
      },
      {
        heading: "What Springfield, Delaware County Patients Come In For",
        items: [
          {
            type: "p",
            text: "Enough Springfield patients travel in for implants and urgent care that both have their own pages.",
          },
          {
            type: "p",
            text: "Implants. Dr. Bhadresh Makani places them, from single teeth through to All-on-X full-arch, planned on CBCT 3D imaging.",
          },
          {
            type: "p",
            text: "Emergencies. Seven minutes is a short run with a broken tooth, and the phone call tells you how soon to come in.",
          },
          {
            type: "p",
            text: "Invisalign. Dr. Zan Chaudhary is Invisalign certified, with review visits every six to eight weeks.",
          },
          {
            type: "p",
            text: "Alongside those, the everyday work: a family dentist for check-ups and children's appointments, cosmetic treatment such as whitening and veneers, and dentures fitted, relined and repaired through the same practice.",
          },
          {
            type: "link",
            text: "Dental implants near Springfield",
            href: "/dental-implants-springfield-pa",
          },
          {
            type: "link",
            text: "Emergency dentist near Springfield",
            href: "/emergency-dentist-springfield-pa",
          },
          {
            type: "link",
            text: "Invisalign near Springfield",
            href: "/invisalign-springfield-pa",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
          {
            type: "link",
            text: "Cosmetic dentistry",
            href: "/cosmetic-dentistry",
          },
          {
            type: "link",
            text: "Dentures",
            href: "/restorative-dentistry/dentures",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
          {
            type: "link",
            text: "Every area we serve, with drive times",
            href: "/areas-we-serve",
          },
        ],
      },
    ],
    faqHeading: "Questions From Springfield (19064) Patients",
    faqs: [
      {
        q: "How far is the practice from Springfield, Delaware County?",
        a: "About 7 minutes and 4.1 miles via US-1 south, measured in Google Maps from 8 N Pennell Rd. From the Springfield Mall area it is a straight run down Baltimore Pike. Traffic on the Pike is what changes the time, so allow a little longer at rush hour.",
      },
      {
        q: "Which Springfield does this page mean: Delaware County or Tioga County?",
        a: 'Springfield Township in Delaware County, ZIP 19064, about 7 minutes from Media. There is a second Springfield in Pennsylvania, in Tioga County, almost 200 miles away. Mapping apps sometimes default to that one, so include "Delaware County" when searching.',
      },
      {
        q: "Do patients travel in from Springfield, Delaware County?",
        a: "Yes, and implants, emergency care and Invisalign each have their own Springfield page for that reason. The run down US-1 is about seven minutes, so a lunchtime or before-work appointment is realistic from Springfield Township.",
      },
      {
        q: "Are you accepting new patients from Springfield Township (19064)?",
        a: "Yes, new patients from Springfield Township and 19064 are welcome. A first visit is $99 without insurance under the New Patient Special, against a regular price of $315, and an in-house savings plan is available for patients with no cover. With insurance, call with the plan name and the team will check it before booking.",
      },
      {
        q: "Can I be seen the same day from Springfield, Delaware County?",
        a: "Call (610) 566-2711 as early in the day as you can. Urgent problems are triaged on the phone and you will be seen the same day whenever possible. Being seven minutes out helps, but whether a slot is free on the day decides it.",
      },
    ],
    cta: {
      title: "Book From Springfield, Delaware County",
      text: "Seven minutes down US-1, with implants and emergencies handled in house.",
    },
  },
  {
    slug: "brookhaven-pa",
    name: "Brookhaven",
    zip: "19015",
    area: "Lower Delaware County",
    drive: {
      time: "~9 min",
      miles: "5.3 mi",
      route: "PA-352 S",
    },
    title: "Dentist Near Brookhaven, PA | Media Brite Smile",
    description:
      "Dental care for Brookhaven and Parkside, PA, about 9 minutes via PA-352. Dentures, repairs, implants and family care. Call (610) 566-2711.",
    h1: "Your Dentist Near Brookhaven, PA",
    intro: [
      "Media Brite Smile is about 9 minutes from Brookhaven, 5.3 miles north on PA-352. Dentures, relines and repairs are handled at the practice, alongside general family care.",
    ],
    sections: [
      {
        heading: "Getting Here From Brookhaven",
        items: [
          {
            type: "p",
            text: "Head north on PA-352 and the practice is on N Pennell Road in Media. About 9 minutes, 5.3 miles.",
          },
          {
            type: "p",
            text: "PA-352 runs more or less directly between the two, so it is one road most of the way.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Brookhaven Borough and Parkside",
        items: [
          {
            type: "p",
            text: "The practice serves Brookhaven borough and neighbouring Parkside, both in the Penn-Delco School District.",
          },
          {
            type: "p",
            text: "Brookhaven sits in ZIP 19015. Parkside is small enough that the route in is effectively the same, which is why it shares this page rather than having one of its own.",
          },
        ],
      },
      {
        heading: "Why Brookhaven Patients Travel In",
        items: [
          {
            type: "p",
            text: "Denture work is the reason more often than anything else.",
          },
          {
            type: "p",
            text: "The practice makes full dentures, partials, immediate dentures and implant-retained dentures, and handles the things that go wrong afterwards: relines when the fit loosens, rebases, repairs when one cracks, and soft liners for sore ridges.",
          },
          {
            type: "p",
            text: "Denture repairs are the appointments that matter most for turnaround. If yours has broken, call rather than attempting a fix with household glue, which is not safe in the mouth and can make a professional repair impossible.",
          },
          {
            type: "link",
            text: "Dentures",
            href: "/restorative-dentistry/dentures",
          },
          {
            type: "link",
            text: "Denture repairs and rebases",
            href: "/restorative-dentistry/rebase-repairs",
          },
          {
            type: "link",
            text: "Denture relines",
            href: "/restorative-dentistry/dentures/denture-relines",
          },
          {
            type: "link",
            text: "Dentures near Brookhaven",
            href: "/dentures-brookhaven-pa",
          },
        ],
      },
      {
        heading: "Implants as an Alternative",
        items: [
          {
            type: "p",
            text: "Brookhaven patients weighing up a denture against something fixed can have that conversation here rather than being sent elsewhere.",
          },
          {
            type: "p",
            text: "Dr. Bhadresh Makani places implants from single teeth through to full-arch, and implant-retained dentures sit between the two options: a denture that clips onto implants and stays where you put it.",
          },
          {
            type: "p",
            text: "Two other reasons Brookhaven patients come in: emergencies, where a broken tooth or sudden pain is triaged by phone first, and cosmetic work (whitening, veneers and Invisalign), done here rather than referred on.",
          },
          {
            type: "link",
            text: "Dental implants near Brookhaven",
            href: "/dental-implants-brookhaven-pa",
          },
          {
            type: "link",
            text: "Implant-retained dentures",
            href: "/restorative-dentistry/dentures/implant-retained-dentures",
          },
          {
            type: "link",
            text: "Emergency dentistry",
            href: "/preventative-care/emergency-dentistry",
          },
          {
            type: "link",
            text: "Cosmetic dentistry",
            href: "/cosmetic-dentistry",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
          {
            type: "link",
            text: "Every area we serve, with drive times",
            href: "/areas-we-serve",
          },
        ],
      },
    ],
    faqHeading: "Questions From Brookhaven Patients",
    faqs: [
      {
        q: "How long is the drive from Brookhaven?",
        a: "About 9 minutes and 5.3 miles north on PA-352, measured in Google Maps from 8 N Pennell Rd. The drive is a straightforward one that keeps you off the highway, and the exact time depends on traffic through Media.",
      },
      {
        q: "Do you repair dentures, and how quickly?",
        a: "Yes, denture repairs, relines and rebases are all handled at the practice. Call (610) 566-2711 and describe the break, and you will be told the turnaround before you travel in. Do not try to glue it yourself.",
      },
      {
        q: "Do you cover Parkside as well?",
        a: "Yes. Parkside adjoins Brookhaven and the route in is effectively identical, so it shares this page. Patients from both come in for the same mix of family care, dentures and implants.",
      },
      {
        q: "Are you accepting new patients from Brookhaven?",
        a: "Yes, new patients from Brookhaven, Parkside and the rest of 19015 are welcome. The New Patient Special puts a first visit at $99 for anyone uninsured, against a regular price of $315, and the practice runs its own savings plan for patients with no cover. With insurance, call with the plan name so it can be checked first.",
      },
      {
        q: "Can I replace a denture with implants?",
        a: "Often, yes, and implant-retained dentures are the middle option: a denture that clips onto implants rather than relying on suction. Dr. Makani assesses whether implants are possible using CBCT 3D imaging.",
      },
    ],
    cta: {
      title: "Book From Brookhaven",
      text: "Nine minutes on PA-352, with denture fittings and repairs under one roof.",
    },
  },
  {
    slug: "swarthmore-pa",
    name: "Swarthmore",
    zip: "19081",
    area: "Lower Delaware County",
    drive: {
      time: "~10 min",
      miles: "3.8 mi",
      route: "N Providence Rd and E Baltimore Pike",
    },
    title: "Dentist Near Swarthmore, PA | Media Brite Smile",
    description:
      "Dental care for Swarthmore and Rutledge, PA, about 10 minutes away. Students, families and emergencies. Call (610) 566-2711.",
    h1: "Your Dentist Near Swarthmore, PA",
    intro: [
      "Media Brite Smile is about 10 minutes from Swarthmore, 3.8 miles via Providence Road and Baltimore Pike. Routine care, cosmetic work and urgent appointments.",
    ],
    sections: [
      {
        heading: "Getting Here From Swarthmore",
        items: [
          {
            type: "p",
            text: "The usual route runs north on N Providence Road, then west along E Baltimore Pike into Media, finishing on N Pennell Road. About 10 minutes, 3.8 miles.",
          },
          {
            type: "p",
            text: "It is a short distance that takes slightly longer than you would expect, because Baltimore Pike carries the traffic. Leaving a few minutes earlier in the morning is worth doing.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Swarthmore Borough and Rutledge",
        items: [
          {
            type: "p",
            text: "The practice serves Swarthmore borough and neighbouring Rutledge, a smaller borough just to its east.",
          },
          {
            type: "p",
            text: "Swarthmore sits in ZIP 19081. Rutledge is compact enough that it has no dental practice of its own, and the drive from there is comparable to the one from Swarthmore.",
          },
        ],
      },
      {
        heading: "If You Are at Swarthmore College",
        items: [
          {
            type: "p",
            text: "Students and staff at the college have a particular problem: your regular dentist is usually somewhere else entirely.",
          },
          {
            type: "p",
            text: "That makes two things useful. Urgent care, when something breaks mid-semester and travelling home is not realistic, and short-course cosmetic work such as whitening, which fits into a term.",
          },
          {
            type: "p",
            text: "For anything beyond an emergency, say when you call that you are at the college so appointments can be planned around teaching time rather than against it.",
          },
          {
            type: "link",
            text: "Emergency dentistry",
            href: "/preventative-care/emergency-dentistry",
          },
          {
            type: "link",
            text: "Teeth whitening",
            href: "/cosmetic-dentistry/teeth-whitening",
          },
          {
            type: "link",
            text: "Invisalign",
            href: "/cosmetic-dentistry/invisalign",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
        ],
      },
      {
        heading: "What Swarthmore Patients Come In For",
        items: [
          {
            type: "p",
            text: "Two fairly distinct groups.",
          },
          {
            type: "p",
            text: "Borough households book routine family care, cleanings and the restorative work that follows from it, dental implants included. College patients book urgent appointments and cosmetic treatment on a shorter horizon.",
          },
          {
            type: "p",
            text: "Both get the same three-dentist practice, where implants, root canals and dentures are handled on site rather than referred out.",
          },
          {
            type: "link",
            text: "Dental implants near Swarthmore",
            href: "/dental-implants-swarthmore-pa",
          },
          {
            type: "link",
            text: "Emergency dentist near Swarthmore",
            href: "/emergency-dentist-swarthmore-pa",
          },
          {
            type: "link",
            text: "Every area we serve, with drive times",
            href: "/areas-we-serve",
          },
        ],
      },
    ],
    faqHeading: "Questions From Swarthmore Patients",
    faqs: [
      {
        q: "How far is the practice from Swarthmore?",
        a: "About 10 minutes, covering 3.8 miles. The route runs north on N Providence Road and west along E Baltimore Pike. The distance is short but Baltimore Pike traffic adds a few minutes at peak times.",
      },
      {
        q: "Can you see Swarthmore College students?",
        a: "Yes. Students and staff are welcome, including for urgent problems when getting back to a home dentist is not practical. Mention the college when you call and appointments can be arranged around teaching commitments.",
      },
      {
        q: "Do you cover Rutledge too?",
        a: "Yes. Rutledge borough adjoins Swarthmore and the drive in is much the same. There is no separate page for Rutledge because the route and the travel time are effectively identical.",
      },
      {
        q: "Are you accepting new patients from Swarthmore?",
        a: "Yes, new patients from Swarthmore and 19081 are welcome, students and borough households alike. The uninsured rate for a first visit is $99 under the New Patient Special, against a regular price of $315, and the practice runs its own savings plan for patients who have no cover at all. With insurance, call with the plan name and it will be checked first.",
      },
      {
        q: "Can I be seen urgently from Swarthmore?",
        a: "Call (610) 566-2711 and describe what has happened. The problem is triaged on the call, and you will be seen the same day whenever possible. Ten minutes is a short run for a dental emergency.",
      },
    ],
    cta: {
      title: "Book From Swarthmore",
      text: "Ten minutes away, and one call tells you how soon you can be seen.",
    },
  },
  {
    slug: "morton-pa",
    name: "Morton",
    zip: "19070",
    area: "Lower Delaware County",
    drive: {
      time: "~11 min",
      miles: "5.4 mi",
      route: "US-1 N and W Woodland Ave",
    },
    title: "Dentist Near Morton, PA | Media Brite Smile",
    description:
      "Dentist for Morton, PA (19070), about 11 minutes via US-1 and Woodland Ave, or on the same SEPTA line as Media. Call (610) 566-2711.",
    h1: "Your Dentist Near Morton, PA",
    intro: [
      "Media Brite Smile is about 11 minutes from Morton by car, 5.4 miles via US-1 and West Woodland Avenue. Morton and Media are also on the same SEPTA regional rail line, which matters if you would rather not drive to an appointment.",
    ],
    sections: [
      {
        heading: "Dental Care for Morton Residents",
        items: [
          {
            type: "p",
            text: "Morton is a small borough, and the practice in Media is a short trip from it rather than inside it. Three dentists there handle routine family care alongside the treatment that often means a referral elsewhere: implants, root canals, extractions and dentures.",
          },
        ],
      },
      {
        heading: "Getting Here From Morton",
        items: [
          {
            type: "p",
            text: "By car. Take West Woodland Avenue to US-1 and follow it south-west into Media, finishing on N Pennell Road. Google Maps measured it at about 11 minutes and 5.4 miles on 12 November 2026.",
          },
          {
            type: "p",
            text: "By train. Morton station and Media station are both on SEPTA's Media/Wawa Line. Check the timetable and the walk from Media station to N Pennell Road before you rely on it for a timed appointment.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Morton Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "For Morton patients, the useful point is that most treatment does not need a second practice.",
          },
          {
            type: "p",
            text: "Routine care: check-ups and cleanings for adults and children",
          },
          {
            type: "p",
            text: "Saving a tooth: fillings, crowns and root canal treatment",
          },
          {
            type: "p",
            text: "Replacing teeth: dental implants by Dr. Bhadresh Makani DDS, bridges and dentures",
          },
          {
            type: "p",
            text: "Urgent problems: emergency appointments, triaged on the phone",
          },
          {
            type: "p",
            text: "Cosmetic: whitening, veneers and Invisalign",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Morton: Rutledge Border, Morton-Rutledge SEPTA Station",
        items: [
          {
            type: "p",
            text: "This page covers Morton borough, ZIP 19070, and the streets along its border with Rutledge. Rutledge itself is covered on the Swarthmore page, because its quickest drive in is the Swarthmore one.",
          },
          {
            type: "p",
            text: "Other towns and their measured drive times are on the Areas We Serve page.",
          },
        ],
      },
      {
        heading: "New Patients From Morton",
        items: [
          {
            type: "p",
            text: "For anyone searching for a dentist accepting new patients in Morton, PA: new patients from the borough are welcome. If you are uninsured, the New Patient Special prices your first visit at $99 rather than the regular $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "Insurance is billed directly by the practice, which works with more than 40 plans. The in-house Dental Savings Plan is the option for patients with no cover, and CareCredit can spread the cost of larger treatment.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Morton Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Morton?",
        a: "About 11 minutes and 5.4 miles by car, via West Woodland Avenue and US-1, measured in Google Maps from 8 N Pennell Rd in Media. If you prefer the train, Morton and Media are both stations on SEPTA's Media/Wawa Line; check the timetable before booking.",
      },
      {
        q: "Are you taking new patients from Morton (19070)?",
        a: "Yes, new patients from Morton borough and ZIP 19070 are welcome. Without insurance, the first visit is $99 under the New Patient Special. With insurance, send the plan name when you call and it will be checked before your appointment.",
      },
      {
        q: "Do you treat children from Morton?",
        a: "Yes, children are seen by the general dentists from about their first birthday, with check-ups, cleanings, fluoride and sealants. Fillings in baby teeth are done at the practice too. There is no pediatric specialist on staff, so a child needing one is referred on.",
      },
      {
        q: "Can I be seen urgently from Morton?",
        a: "Call (610) 566-2711 and describe the problem, ideally early in the day. The team triages it on the call, and you will be seen the same day whenever possible. By car, Morton is around eleven minutes away.",
      },
    ],
    cta: {
      title: "Book From Morton",
      text: "Eleven minutes by car, or the same rail line, with most treatment under one roof.",
    },
  },
  {
    slug: "ridley-park-pa",
    name: "Ridley Park",
    zip: "19078",
    area: "Lower Delaware County",
    drive: {
      time: "~11 min",
      miles: "7.2 mi",
      route: "I-476 S",
    },
    title: "Dentist Near Ridley Park, PA | Media Brite Smile",
    description:
      "Dentist for Ridley Park, Woodlyn and Folsom, PA (19078), about 11 minutes via I-476. Root canals and crowns done in house. Call (610) 566-2711.",
    h1: "Your Dentist Near Ridley Park, PA",
    intro: [
      "Media Brite Smile is about 11 minutes from Ridley Park. At 7.2 miles it is further than it sounds, but I-476 makes the drive quick. When a tooth is cracked, decayed or infected, the work to save it is done at the practice rather than referred out.",
    ],
    sections: [
      {
        heading: "Dental Care for Ridley Park Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media; there is no Ridley Park office. Three dentists provide family check-ups and cleanings, the restorative work that keeps natural teeth in place, and implants or dentures when a tooth cannot be kept.",
          },
        ],
      },
      {
        heading: "Getting Here From Ridley Park",
        items: [
          {
            type: "p",
            text: "From Ridley Park, join I-476, the Blue Route, northbound and come off towards Media, finishing on N Pennell Road. Google Maps measured the drive at about 11 minutes and 7.2 miles on 12 November 2026.",
          },
          {
            type: "p",
            text: "The highway is what keeps the time down, so check traffic on I-476 at rush hour before you leave.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Ridley Park Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Saving a damaged tooth is usually cheaper and simpler than replacing it, and these treatments are all carried out at the practice:",
          },
          {
            type: "p",
            text: "Restorations are placed under high-powered microscopes. If a tooth has to go, dental implants are placed in house by Dr. Bhadresh Makani DDS, and cosmetic dentist work for Ridley Park patients, such as whitening and veneers, is done here too. For anything sudden, such as a broken tooth or swelling, see emergency dentistry.",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Ridley Park: Woodlyn, Folsom, Ridley Township",
        items: [
          {
            type: "p",
            text: "This page covers Ridley Park borough and the surrounding Ridley Township, including the Woodlyn and Folsom communities, all within the Ridley School District. The drive in from Woodlyn or Folsom is close to the one from Ridley Park.",
          },
          {
            type: "p",
            text: "For other towns, see the Areas We Serve page.",
          },
        ],
      },
      {
        heading: "New Patients From Ridley Park",
        items: [
          {
            type: "p",
            text: "This is a dentist accepting new patients in Ridley Park, PA, along with Woodlyn and Folsom. With no insurance, a first visit is $99 under the New Patient Special, compared with the regular $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "More than 40 dental plans are accepted and billed directly. Patients without cover can join the in-house Dental Savings Plan, which includes 10 to 15% off additional procedures such as fillings and crowns. CareCredit spreads larger treatment costs.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Ridley Park Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Ridley Park?",
        a: "About 11 minutes and 7.2 miles via I-476, measured in Google Maps from 8 N Pennell Rd in Media. The distance is longer than from most nearby towns, but the highway keeps the time short. Woodlyn and Folsom are a similar drive.",
      },
      {
        q: "Are you taking new patients from Ridley Park (19078)?",
        a: "Yes, new patients from Ridley Park, Woodlyn, Folsom and the rest of Ridley Township are welcome. Uninsured new patients pay $99 for the first visit under the New Patient Special. Insured patients can send the plan name to have it checked first.",
      },
      {
        q: "Do you treat children from Ridley Park?",
        a: "Yes. The general dentists see children from around their first birthday, for check-ups, cleanings, fluoride, sealants and fillings in baby teeth. There is no pediatric specialist on staff, and any child who needs one is referred on.",
      },
      {
        q: "Can a root canal be done at your practice, or will I be referred?",
        a: "Root canal treatment is carried out at the practice, as are fillings, inlays, onlays, crowns and extractions. If a case needs a specialist, you are told at the assessment. Call (610) 566-2711 if the tooth is painful now, and it will be triaged on the phone.",
      },
    ],
    cta: {
      title: "Book From Ridley Park",
      text: "Eleven minutes on the Blue Route, with damaged teeth repaired in the same practice.",
    },
  },
  {
    slug: "clifton-heights-pa",
    name: "Clifton Heights",
    zip: "19018",
    area: "Lower Delaware County",
    drive: {
      time: "~12 min",
      miles: "5.7 mi",
      route: "US-1 N and W Springfield Rd",
    },
    title: "Dentist Near Clifton Heights, PA | Media Brite Smile",
    description:
      "Dentist for Clifton Heights and Aldan, PA (19018), about 12 minutes via US-1. Gum disease treatment, from deep cleaning to laser therapy.",
    h1: "Your Dentist Near Clifton Heights, PA",
    intro: [
      "Media Brite Smile is about 12 minutes from Clifton Heights, 5.7 miles via West Springfield Road and US-1. If your gums bleed, feel tender or have started to pull back, the practice treats gum disease at every stage, from a first deep cleaning to laser therapy and ongoing maintenance.",
    ],
    sections: [
      {
        heading: "Dental Care for Clifton Heights Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media, with no office in Clifton Heights. Three dentists provide family check-ups and cleanings, gum treatment, implants, dentures, cosmetic work and urgent care, so most treatment stays with one team.",
          },
        ],
      },
      {
        heading: "Getting Here From Clifton Heights",
        items: [
          {
            type: "p",
            text: "From Clifton Heights, take West Springfield Road to US-1, the Baltimore Pike, and follow it south into Media, ending on N Pennell Road. Google Maps measured the drive at about 12 minutes and 5.7 miles on 12 November 2026.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Clifton Heights Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Gum disease is common and often causes no pain at first, so it is easy to leave. These are the stages of treatment, all carried out at the practice:",
          },
          {
            type: "p",
            text: "If a case needs a periodontist, you are told at the assessment and referred.",
          },
          {
            type: "p",
            text: "Family check-ups, dental implants and emergency care are handled at the same practice.",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Clifton Heights: Aldan, Springfield Rd Corridor",
        items: [
          {
            type: "p",
            text: "This page covers Clifton Heights borough, ZIP 19018, along with neighbouring Aldan and the West Springfield Road corridor towards US-1. You can find other towns on the Areas We Serve page, and family dentistry covers care for every age.",
          },
        ],
      },
      {
        heading: "New Patients From Clifton Heights",
        items: [
          {
            type: "p",
            text: "If you want a dentist accepting new patients in Clifton Heights, PA, you and your neighbours in Aldan are welcome. A first visit without insurance is $99 under the New Patient Special, versus the regular $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "Your insurer is billed directly by the practice, which accepts over 40 plans. Gum treatment is often covered differently from cleanings, so send your plan name to have it checked. The in-house Dental Savings Plan is available for patients without cover.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Clifton Heights Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Clifton Heights?",
        a: "About 12 minutes and 5.7 miles via West Springfield Road and US-1, measured in Google Maps from 8 N Pennell Rd in Media. Aldan is a similar drive. Allow extra time on the Baltimore Pike at rush hour.",
      },
      {
        q: "My gums bleed when I brush. Should a Clifton Heights patient book in?",
        a: "Yes. Bleeding gums are often the first sign of gum disease, and early treatment is simpler than treating advanced disease. A check-up measures the gums and shows whether a cleaning, a deep cleaning or more is needed.",
      },
      {
        q: "Do you see children from Clifton Heights?",
        a: "Yes, from around their first birthday. Children are seen by the general dentists for check-ups, cleanings, fluoride and sealants. A child who needs a pediatric specialist is referred on.",
      },
      {
        q: "Can I be seen urgently from Clifton Heights?",
        a: "Phone (610) 566-2711 and describe what has happened. Urgent problems are triaged during the call and seen the same day whenever possible. The drive from Clifton Heights is around twelve minutes.",
      },
    ],
    cta: {
      title: "Book From Clifton Heights",
      text: "Twelve minutes via US-1, with gum treatment at every stage under one roof.",
    },
  },
  {
    slug: "glen-mills-pa",
    name: "Glen Mills",
    zip: "19342",
    area: "Western & northern Delco",
    drive: {
      time: "~8 min",
      miles: "4.4 mi",
      route: "US-1 S (W Baltimore Pike)",
    },
    title: "Dentist Near Glen Mills, PA | Media Brite Smile",
    description:
      "New to Glen Mills, PA (19342) and need a family dentist? Media Brite Smile is about 8 minutes up US-1. Children and adults. Call (610) 566-2711.",
    h1: "Your Dentist Near Glen Mills, PA",
    intro: [
      "Media Brite Smile is about 8 minutes from Glen Mills, 4.4 miles north on US-1 into Media. If your family has recently moved to Glen Mills and needs a new dentist, the whole household can be registered with one practice.",
    ],
    sections: [
      {
        heading: "Dental Care for Glen Mills Residents",
        items: [
          {
            type: "p",
            text: "The practice is based in Media rather than Glen Mills. It is a three-dentist family practice, so children, parents and grandparents can all be seen in one place.",
          },
          {
            type: "p",
            text: "Switching dentists after a move is easier than it sounds. Bring your previous dentist's details and any recent X-rays to the first visit, so the new dentist can see what has already been done.",
          },
        ],
      },
      {
        heading: "Getting Here From Glen Mills",
        items: [
          {
            type: "p",
            text: "Head north on US-1, the West Baltimore Pike, from Glen Mills into Media and turn onto N Pennell Road. Google Maps measured the trip at about 8 minutes and 4.4 miles on 12 November 2026.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Glen Mills Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "For a family dentist in Glen Mills, PA, most visits are routine, but it helps to know the bigger work is handled in the same place.",
          },
          {
            type: "p",
            text: "Family dentistry: check-ups, cleanings and X-rays for every age",
          },
          {
            type: "p",
            text: "Child dentistry: first visits from around the first birthday, fluoride and sealants",
          },
          {
            type: "p",
            text: "Invisalign for teens and adults",
          },
          {
            type: "p",
            text: "Dental implants, placed by Dr. Bhadresh Makani DDS",
          },
          {
            type: "p",
            text: "Dentures, crowns, root canals and emergency care",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Glen Mills: Chester Heights, Edgmont Township, Concordville",
        items: [
          {
            type: "p",
            text: "The 19342 ZIP code takes in more than one township. This page covers Glen Mills together with Concordville, the small borough of Chester Heights and Edgmont Township, none of which has a page of its own because the drive in is much the same.",
          },
          {
            type: "p",
            text: "The Areas We Serve page lists every measured route around the practice.",
          },
        ],
      },
      {
        heading: "New Patients From Glen Mills",
        items: [
          {
            type: "p",
            text: "As a dentist accepting new patients in Glen Mills, PA, the practice welcomes Chester Heights, Edgmont and Concordville too. Cosmetic dentist work for Glen Mills patients, such as whitening and veneers, is part of the same practice. Registering the whole family at once is fine; say so when you call and appointments can be grouped.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "If your insurance changed with the move, send the new plan name before you book. We are not able to confirm what your plan covers from a website. Send us the plan name and we will check it for you.",
          },
          {
            type: "p",
            text: "Without insurance, the first visit for a new patient is $99 under the New Patient Special, and the in-house Dental Savings Plan covers routine care for a set annual cost. CareCredit is available for larger treatment.",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
          {
            type: "link",
            text: "Insurance and payment options",
            href: "/patient-information/insurance-payment-options",
          },
        ],
      },
    ],
    faqHeading: "Questions From Glen Mills Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Glen Mills?",
        a: "About 8 minutes and 4.4 miles north on US-1, the West Baltimore Pike, measured in Google Maps from 8 N Pennell Rd in Media. Concordville and Chester Heights are a similar distance. Allow a little extra at peak times on the Pike.",
      },
      {
        q: "We have just moved to Glen Mills. Can the whole family register?",
        a: "Yes. New patients are welcome, and a whole household can register together. Mention it when you call (610) 566-2711 so the first appointments can be grouped, and bring your previous dentist's details and any recent X-rays.",
      },
      {
        q: "Do you treat children from Glen Mills?",
        a: "Yes, from around their first birthday. The general dentists handle check-ups, cleanings, fluoride, sealants and fillings in baby teeth. There is no pediatric specialist on staff; a child who needs specialist care is referred, and you are told at the assessment.",
      },
      {
        q: "Can I be seen urgently if I live in Glen Mills?",
        a: "Call first and describe what has happened. Urgent problems are triaged on the phone and seen the same day whenever possible. From Glen Mills, the drive up US-1 is around eight minutes.",
      },
    ],
    cta: {
      title: "Book From Glen Mills",
      text: "Eight minutes up US-1, with the whole family under one practice.",
    },
  },
  {
    slug: "newtown-square-pa",
    name: "Newtown Square",
    zip: "19073",
    area: "Western & northern Delco",
    drive: {
      time: "~8 min",
      miles: "4.1 mi",
      route: "PA-252 N",
    },
    title: "Dentist Near Newtown Square, PA | Media Brite Smile",
    description:
      "Cosmetic, implant and family dentistry for Newtown Square, PA (19073), about 8 minutes down PA-252. Published prices. Call (610) 566-2711.",
    h1: "Your Dentist Near Newtown Square, PA",
    intro: [
      "Media Brite Smile is about 8 minutes from Newtown Square, 4.1 miles south on PA-252 into Media. For Newtown Square patients thinking about whitening, veneers, Invisalign or implants, the prices are published before you book.",
    ],
    sections: [
      {
        heading: "Dental Care for Newtown Square Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media, not in Newtown Square, and serves the township from there with three dentists: general and family care, cosmetic treatment, and implants placed in house.",
          },
          {
            type: "p",
            text: "If you are choosing a Newtown Square dentist mainly for cosmetic or implant work, the useful comparison is who does the treatment and what it costs, so both are set out below.",
          },
        ],
      },
      {
        heading: "Getting Here From Newtown Square",
        items: [
          {
            type: "p",
            text: "Take Providence Road, PA-252, south out of Newtown Square and stay on it into Media, ending on N Pennell Road. Google Maps measured the drive at about 8 minutes and 4.1 miles on 12 November 2026.",
          },
          {
            type: "p",
            text: "It is one road almost the whole way, which makes an early-morning appointment before work straightforward. The practice opens at 8am.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Newtown Square Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Cosmetic dentist work for Newtown Square patients and implant planning both start with a consultation, and the Invisalign and implant consultations are free under the current offers. Family dentistry, check-ups and emergency care are handled at the same practice, and so are dentures for Newtown Square patients, from full and partial dentures to implant-retained.",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
          {
            type: "link",
            text: "Emergency dentistry",
            href: "/preventative-care/emergency-dentistry",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Newtown Square: Marple Newtown School District, Ellis Preserve",
        items: [
          {
            type: "p",
            text: "This page covers Newtown Township and the 19073 ZIP code, including the area around Ellis Preserve. Families in the Marple Newtown School District can book children and adults together, with three dentists making grouped appointments realistic.",
          },
          {
            type: "p",
            text: "For the wider area, the Areas We Serve page has every measured drive time.",
          },
        ],
      },
      {
        heading: "New Patients From Newtown Square",
        items: [
          {
            type: "p",
            text: "Looking for a dentist accepting new patients in Newtown Square, PA? New patients from the township are welcome. Without insurance, a first visit costs $99 under the New Patient Special, against a regular price of $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "The practice works with more than 40 dental insurance plans and bills them directly. Without cover, the in-house Dental Savings Plan costs $300 a year for the first member and includes two exams and 10 to 15% off additional procedures. CareCredit spreads the cost of larger cosmetic or implant treatment.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Newtown Square Patients",
    faqs: [
      {
        q: "How far is the practice from Newtown Square?",
        a: "About 8 minutes and 4.1 miles south on PA-252, Providence Road, measured in Google Maps from 8 N Pennell Rd in Media. It is effectively one road from Newtown Square to the practice, so the time varies mainly with traffic in Media itself.",
      },
      {
        q: "Is the dentist taking new patients from Newtown Square (19073)?",
        a: "Yes. New patients from Newtown Township and the 19073 ZIP code are welcome, and the uninsured first visit is $99 under the New Patient Special. With insurance, call (610) 566-2711 with your plan name so it can be checked before you book.",
      },
      {
        q: "Do you treat children from Newtown Square?",
        a: "Yes, the general dentists see children from about their first birthday for check-ups, cleanings, fluoride and sealants. Parents and children can often be booked into the same visit. There is no pediatric specialist on staff, and a child who needs one is referred.",
      },
      {
        q: "Can I be seen urgently if I live in Newtown Square?",
        a: "Call (610) 566-2711 first and describe the problem. Urgent cases are triaged on the phone and seen the same day whenever possible. The eight-minute drive down PA-252 means you can usually be in the chair soon after the call.",
      },
    ],
    cta: {
      title: "Book From Newtown Square",
      text: "Eight minutes down Providence Road, with cosmetic and implant prices published up front.",
    },
  },
  {
    slug: "broomall-pa",
    name: "Broomall",
    zip: "19008",
    area: "Western & northern Delco",
    drive: {
      time: "~10 min",
      miles: "4.3 mi",
      route: "Paxon Hollow Rd",
    },
    title: "Dentist Near Broomall, PA | Media Brite Smile",
    description:
      "Dentist for Broomall and Marple Township, PA (19008), about 10 minutes via Paxon Hollow Rd. Costs explained first, with or without insurance.",
    h1: "Your Dentist Near Broomall, PA",
    intro: [
      "Media Brite Smile is about 10 minutes from Broomall, 4.3 miles via Paxon Hollow Road. Whether you have insurance, a savings plan or no cover at all, you are told what a visit or treatment costs before anything is done.",
    ],
    sections: [
      {
        heading: "Dental Care for Broomall Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media and has no Broomall office. It serves Broomall from there with three dentists covering check-ups, fillings and crowns, implants, dentures, cosmetic work and urgent care.",
          },
          {
            type: "p",
            text: "For many Broomall households the deciding question is cost, so this page leads with it.",
          },
        ],
      },
      {
        heading: "Getting Here From Broomall",
        items: [
          {
            type: "p",
            text: "From Broomall, Paxon Hollow Road runs south towards Media, and the practice is on N Pennell Road. Google Maps measured it at about 10 minutes and 4.3 miles on 12 November 2026.",
          },
          {
            type: "p",
            text: "Paxon Hollow is a back road rather than a highway, so it is a calm drive at most times of day.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "There are four ways Broomall patients pay, and the team will tell you which works out cheapest for you.",
          },
          {
            type: "p",
            text: "We are not able to confirm what your plan covers from a website. Send us the plan name and we will check it for you.",
          },
          {
            type: "link",
            text: "Insurance and payment options",
            href: "/patient-information/insurance-payment-options",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
        ],
      },
      {
        heading: "Treatments Broomall Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Check-ups and cleanings for the whole family, children included",
          },
          {
            type: "p",
            text: "Fillings, crowns and root canals to save damaged teeth",
          },
          {
            type: "p",
            text: "Dental implants placed by Dr. Bhadresh Makani DDS, from $3,999 for implant, abutment and crown",
          },
          {
            type: "p",
            text: "Dentures, including repairs and relines",
          },
          {
            type: "p",
            text: "Cosmetic work such as whitening, veneers and Invisalign",
          },
          {
            type: "p",
            text: "Emergency care, triaged by phone",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Broomall: Marple Township, Lawrence Park",
        items: [
          {
            type: "p",
            text: "Broomall is the main community in Marple Township, ZIP 19008, so this page covers the township as a whole, Lawrence Park included. There is no separate Marple page because the drive and the services are the same.",
          },
          {
            type: "p",
            text: "Every other measured route is on the Areas We Serve page.",
          },
        ],
      },
      {
        heading: "New Patients From Broomall",
        items: [
          {
            type: "p",
            text: "Searching for a dentist accepting new patients in Broomall, PA? New patients from Broomall and the rest of Marple Township are welcome. A first visit without insurance is priced at the New Patient Special: $99 for uninsured new patients, against a regular price of $315.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Broomall Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Broomall?",
        a: "About 10 minutes and 4.3 miles via Paxon Hollow Road, measured in Google Maps from 8 N Pennell Rd in Media. The route avoids the main highways, so the time stays fairly steady through the day.",
      },
      {
        q: "I have no dental insurance. What will a visit cost from Broomall?",
        a: "As a new patient without insurance, your first visit is $99 under the New Patient Special. For ongoing care, the Dental Savings Plan costs $300 a year for the first member and covers two exams, X-rays and an emergency exam, with 10 to 15% off additional procedures.",
      },
      {
        q: "Do you see children from Broomall and Marple Township?",
        a: "Yes. Children are seen by the general dentists from around their first birthday, for check-ups, cleanings, fluoride and sealants, and can often be booked alongside a parent. There is no pediatric specialist, and a child who needs one is referred.",
      },
      {
        q: "Can I get an urgent appointment from Broomall?",
        a: "Phone (610) 566-2711 as early in the day as possible and describe the problem. Urgent cases are triaged on the call and seen the same day whenever possible, and the drive from Broomall is about ten minutes.",
      },
    ],
    cta: {
      title: "Book From Broomall",
      text: "Ten minutes via Paxon Hollow Road, with the cost explained before treatment starts.",
    },
  },
  {
    slug: "garnet-valley-pa",
    name: "Garnet Valley",
    zip: "19060, 19061",
    area: "Western & northern Delco",
    drive: {
      time: "~10 min",
      miles: "5.7 mi",
      route: "US-1 S and Valleybrook Rd",
    },
    title: "Dentist Near Garnet Valley, PA | Media Brite Smile",
    description:
      "Dentist for Garnet Valley, Bethel and Concord Townships (19060, 19061), about 10 minutes via US-1. Invisalign for teens and adults.",
    h1: "Your Dentist Near Garnet Valley, PA",
    intro: [
      "Media Brite Smile is about 10 minutes from Garnet Valley, 5.7 miles via Valleybrook Road and US-1. For Garnet Valley families, that includes Invisalign for teens and adults, alongside routine family care.",
    ],
    sections: [
      {
        heading: "Dental Care for Garnet Valley Residents",
        items: [
          {
            type: "p",
            text: "The practice is in Media and has no office in Garnet Valley. Its three dentists see families for check-ups and cleanings, straighten teeth with Invisalign, and handle crowns, implants and emergencies on site.",
          },
        ],
      },
      {
        heading: "Getting Here From Garnet Valley",
        items: [
          {
            type: "p",
            text: "From Garnet Valley, take Valleybrook Road to US-1, the West Baltimore Pike, and follow it north into Media, ending on N Pennell Road. Google Maps measured it at about 10 minutes and 5.7 miles on 12 November 2026.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Treatments Garnet Valley Patients Come to Us For",
        items: [
          {
            type: "p",
            text: "Invisalign for teens and adults. Your treatment is led by Dr. Zan Chaudhary, who is Invisalign certified. You change aligners at home every two weeks and come in for a review every 6 to 8 weeks, over 6 to 18 months in total.",
          },
          {
            type: "p",
            text: "The regular price is $5,800, and you currently get $1,000 off, a free consultation and a free take-home whitening kit when treatment starts. Fixed metal or ceramic braces are not offered.",
          },
          {
            type: "p",
            text: "Everything else the family needs:",
          },
          {
            type: "p",
            text: "Family dentistry and check-ups for every age",
          },
          {
            type: "p",
            text: "Cosmetic dentist work for Garnet Valley patients: whitening, veneers and bonding",
          },
          {
            type: "p",
            text: "Full, partial and implant-retained dentures for Garnet Valley patients who need them",
          },
          {
            type: "p",
            text: "Dental implants placed by Dr. Bhadresh Makani DDS",
          },
          {
            type: "p",
            text: "Emergency appointments, triaged on the phone",
          },
          {
            type: "link",
            text: "Invisalign",
            href: "/cosmetic-dentistry/invisalign",
          },
        ],
      },
      {
        heading: "Areas We Cover Around Garnet Valley: Bethel Township, Concord Township",
        items: [
          {
            type: "p",
            text: "Garnet Valley is the community name used across Bethel Township and parts of Concord Township, ZIP codes 19060 and 19061, and the Garnet Valley School District. This page covers both townships, since the route into Media is the same.",
          },
          {
            type: "p",
            text: "The Areas We Serve page has every measured drive time around the practice.",
          },
        ],
      },
      {
        heading: "New Patients From Garnet Valley",
        items: [
          {
            type: "p",
            text: "If you need a dentist accepting new patients in Garnet Valley, PA, you are welcome here, from Bethel and Concord too, adults and children alike. Uninsured new patients pay $99 for a first visit under the New Patient Special, set against a regular price of $315.",
          },
        ],
      },
      {
        heading: "Insurance, the Savings Plan and Ways to Pay",
        items: [
          {
            type: "p",
            text: "Insurance is billed directly, with more than 40 plans accepted. Some plans treat aligners differently from other dental work, so check yours before starting Invisalign. CareCredit can spread aligner costs monthly, and the in-house Dental Savings Plan covers routine care for patients without insurance.",
          },
        ],
      },
    ],
    faqHeading: "Questions From Garnet Valley Patients",
    faqs: [
      {
        q: "How long does it take to get to you from Garnet Valley?",
        a: "About 10 minutes and 5.7 miles via Valleybrook Road and US-1, measured in Google Maps from 8 N Pennell Rd in Media. Bethel and Concord Township addresses are a similar drive, depending on how far you are from Valleybrook Road.",
      },
      {
        q: "Can my teenager have Invisalign at your practice?",
        a: "Yes, Invisalign is offered to teens and adults, led by Dr. Zan Chaudhary. Suitability, the likely length of treatment and the cost are all covered at a free consultation. Review visits every 6 to 8 weeks can be booked from 8am, before school.",
      },
      {
        q: "Are you taking new patients from Garnet Valley (19060)?",
        a: "Yes, new patients from Garnet Valley, Bethel Township and Concord Township are welcome. Without insurance, the first visit costs $99 under the New Patient Special. With insurance, call with the plan name and it will be checked before you come in.",
      },
      {
        q: "Can I be seen urgently from Garnet Valley?",
        a: "Ring (610) 566-2711 and explain what has happened. Urgent problems are triaged on the call and seen the same day whenever possible. From Garnet Valley the drive is about ten minutes.",
      },
    ],
    cta: {
      title: "Book From Garnet Valley",
      text: "Ten minutes up US-1, with Invisalign and family care in one practice.",
    },
  },
  {
    slug: "aston-pa",
    name: "Aston",
    zip: "19014",
    area: "Western & northern Delco",
    drive: {
      time: "~11 min",
      miles: "4.6 mi",
      route: "PA-452 S / Pennell Rd",
    },
    title: "Dentist Near Aston, PA | Straight Up Pennell Road",
    description:
      "Dental care for Aston, PA, about 11 minutes straight up Pennell Road. Three dentists, implants, dentures, $99 new patient exam.",
    h1: "Your Dentist Near Aston, PA",
    intro: [
      "Media Brite Smile sits on N Pennell Road in Media, which is the same road that runs through Aston. About 11 minutes, 4.6 miles, and barely a turn in it.",
    ],
    sections: [
      {
        heading: "We Are Literally on Your Road",
        items: [
          {
            type: "p",
            text: "Pennell Road, PA-452, runs north from Aston into Media. The practice is at 8 N Pennell Rd.",
          },
          {
            type: "p",
            text: "For most of Aston that makes this the simplest trip to any dentist outside the township: one road, north, about 11 minutes and 4.6 miles. No highway, no cross-county navigation, no working out which exit.",
          },
          {
            type: "link",
            text: "Directions and opening hours",
            href: "/contact-us",
          },
        ],
      },
      {
        heading: "Aston, Village Green and Green Ridge",
        items: [
          {
            type: "p",
            text: "The practice serves Aston Township and the communities within it, including Village Green and Green Ridge.",
          },
          {
            type: "p",
            text: "Aston is one of the larger communities in this part of Delaware County, with roughly 21,000 residents in ZIP 19014, and it is a newer target for the practice rather than a long-standing one.",
          },
        ],
      },
      {
        heading: "What Aston Patients Come In For",
        items: [
          {
            type: "p",
            text: "The full range, with a bias toward restorative work.",
          },
          {
            type: "p",
            text: "Family care. Check-ups, cleanings, children's dentistry and fillings, with household appointments grouped where the three diaries allow.",
          },
          {
            type: "p",
            text: "Implants and dentures. Dr. Bhadresh Makani places implants from single teeth to full-arch, and the same practice fits and repairs dentures.",
          },
          {
            type: "p",
            text: "Emergencies. Eleven minutes up a single road is a manageable trip with a broken tooth. Call first and you will be told how soon to come.",
          },
          {
            type: "p",
            text: "Cosmetic work. Whitening, veneers and Invisalign are done here too, so an Aston patient looking for a cosmetic dentist does not need a second practice.",
          },
          {
            type: "link",
            text: "Family dentistry",
            href: "/preventative-care/family-dentistry",
          },
          {
            type: "link",
            text: "Dental implants",
            href: "/restorative-dentistry/dental-implants",
          },
          {
            type: "link",
            text: "Dentures",
            href: "/restorative-dentistry/dentures",
          },
          {
            type: "link",
            text: "Emergency dentistry",
            href: "/preventative-care/emergency-dentistry",
          },
          {
            type: "link",
            text: "Cosmetic dentistry",
            href: "/cosmetic-dentistry",
          },
          {
            type: "link",
            text: "Dental Savings Plan",
            href: "/about-us/dental-savings-plan",
          },
          {
            type: "link",
            text: "Every area we serve, with drive times",
            href: "/areas-we-serve",
          },
        ],
      },
      {
        heading: "Choosing Between Practices on Pennell Road",
        items: [
          {
            type: "p",
            text: "There is another dental practice on the Pennell Road corridor in Aston itself, and for some people closer will simply be better.",
          },
          {
            type: "p",
            text: "What is worth comparing is what each one handles in house. Here, implants, full-arch reconstruction, root canals, extractions and denture repairs are all done on site by three dentists with different focuses, so a treatment plan does not become a referral. The prices are published too, which is unusual locally.",
          },
          {
            type: "link",
            text: "Why patients choose us",
            href: "/patient-information/why-choose-us",
          },
        ],
      },
    ],
    faqHeading: "Questions From Aston Patients",
    faqs: [
      {
        q: "How do I get there from Aston?",
        a: "Head north on Pennell Road, PA-452, and the practice is at 8 N Pennell Rd in Media. About 11 minutes and 4.6 miles, with almost no turns, measured in Google Maps on 12 November 2026.",
      },
      {
        q: "Are you taking new patients from Aston?",
        a: "Yes. The practice is accepting new patients from Aston, and Aston is a newer area for it rather than a long-standing one. Without insurance, the New Patient Special applies. $99 for uninsured new patients, against a regular price of $315.",
      },
      {
        q: "Do you cover Village Green and Green Ridge?",
        a: "Yes. Both sit within Aston Township and the route in is the same Pennell Road run. Patients from both come in for the same mix of family, implant and denture care.",
      },
      {
        q: "Is it worth travelling past a closer dentist?",
        a: "That depends on what you need. For a routine check-up, closer is reasonable. For implants, full-arch work, root canals or denture repairs, having all of it under one roof with three dentists and published prices is what Aston patients usually travel for.",
      },
    ],
    cta: {
      title: "Book From Aston",
      text: "Straight up Pennell Road, about eleven minutes, and the costs are on the website.",
    },
  },
];

export const getTown = (slug: string) => towns.find((t) => t.slug === slug);
