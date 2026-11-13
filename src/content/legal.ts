import { site } from "./site";

/* --------------------------------------------------------------------------
   Privacy Policy, Terms of Use and Disclaimer. Plain-language website
   policies written for this build: the practice should review them (and keep
   its own HIPAA Notice of Privacy Practices) before launch.
-------------------------------------------------------------------------- */

export type LegalIcon =
  | "shield"
  | "file"
  | "scale"
  | "mail"
  | "heart"
  | "user"
  | "stethoscope"
  | "calendar"
  | "phone"
  | "copyright"
  | "sparkles"
  | "star"
  | "percent";

/** A paragraph, a checklist, or a highlighted note. */
export type LegalBlock = string | { list: string[] } | { note: string; title: string; call?: boolean };

export type LegalDoc = {
  slug: "privacy-policy" | "terms-of-use" | "disclaimer";
  title: string;
  /** one line for the switcher card */
  blurb: string;
  icon: LegalIcon;
  eyebrow: string;
  description: string;
  intro: string;
  updated: string;
  glance: { icon: LegalIcon; title: string; text: string }[];
  sections: { id: string; title: string; body: LegalBlock[] }[];
};

const contact = `${site.name}, ${site.address.full}. Phone ${site.phone.display}.`;
const UPDATED = "November 12, 2026";

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  blurb: "What we collect online and how we protect it",
  icon: "shield",
  eyebrow: "Your privacy",
  description: `How ${site.name} collects, uses and protects the information you share through our website.`,
  intro: `Your trust matters to us, online and in the chair. This policy explains what information ${site.name} collects when you use this website, how we use it and the choices you have.`,
  updated: UPDATED,
  glance: [
    { icon: "shield", title: "We never sell your data", text: "Your details are not sold, rented or traded. Ever." },
    {
      icon: "mail",
      title: "Forms are for contact only",
      text: "Share your name and how to reach you. Keep health details for the office.",
    },
    {
      icon: "heart",
      title: "Health records follow HIPAA",
      text: "Your dental records are covered by our Notice of Privacy Practices.",
    },
    { icon: "user", title: "You stay in control", text: "Ask us to update or delete what you sent us at any time." },
  ],
  sections: [
    {
      id: "scope",
      title: "What this policy covers",
      body: [
        `This policy applies to ${site.url.replace("https://", "")} and any forms on it.`,
        {
          title: "Your health information",
          note: "This policy does not replace our Notice of Privacy Practices, which explains how we use and protect your health information under HIPAA. Ask for a copy at the front desk or by phone.",
        },
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      body: [
        "When you request an appointment, call us or contact us through a form, you may share:",
        {
          list: [
            "Your name",
            "Phone number and email address",
            "Preferred appointment time",
            "A short note about your visit",
          ],
        },
        "Like most websites, ours may also record basic technical data such as your browser type, device, pages visited and the site that referred you. This helps us understand how the site is used.",
        {
          title: "Please keep these for the office",
          note: "Do not send detailed medical history, insurance numbers or payment details through website forms. Share them with our team by phone or in person.",
        },
      ],
    },
    {
      id: "use",
      title: "How we use your information",
      body: [
        "We use the details you send to:",
        {
          list: [
            "Respond to your request or question",
            "Schedule and confirm appointments",
            "Answer questions about treatment, insurance and financing",
            "Improve how our website works",
          ],
        },
        "We do not sell, rent or trade your personal information.",
      ],
    },
    {
      id: "sharing",
      title: "When information is shared",
      body: [
        "We only share information with service providers that help us run the website and our office, such as web hosting, scheduling and communication tools, and only as needed for them to do that work. We may also disclose information when required by law.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        "This site may use cookies and similar tools to remember preferences and measure traffic. You can block or delete cookies in your browser settings; the site will still work, though some features may be less convenient.",
        "Embedded content, such as Google Maps, is provided by third parties who may set their own cookies under their own privacy policies.",
      ],
    },
    {
      id: "security",
      title: "How we protect it",
      body: [
        "We use reasonable administrative, technical and physical safeguards to protect the information you share. No method of sending data over the internet is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "choices",
      title: "Your choices",
      body: [
        "You can call or write to the office at any time to:",
        { list: ["Update the contact details you sent us", "Ask us to delete them", "Ask us to stop contacting you"] },
      ],
    },
    {
      id: "children",
      title: "Children",
      body: [
        "We treat patients of all ages, but this website is not directed to children under 13. Parents or guardians should contact us on a child's behalf.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The date at the top of this page shows when it last changed.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about this policy? Reach us at ${contact}`],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  slug: "terms-of-use",
  title: "Terms of Use",
  blurb: "The rules for using this website",
  icon: "file",
  eyebrow: "Using this website",
  description: `The terms that apply when you use the ${site.name} website.`,
  intro: `Welcome to the ${site.name} website. By using this site you agree to the terms below. If you do not agree, please do not use the site.`,
  updated: UPDATED,
  glance: [
    {
      icon: "stethoscope",
      title: "Information, not diagnosis",
      text: "Our content educates. Your dentist diagnoses, in person.",
    },
    {
      icon: "calendar",
      title: "Requests need confirming",
      text: "A booking is set once our team contacts you to confirm it.",
    },
    {
      icon: "phone",
      title: "Emergencies: call us",
      text: `Website forms are not watched around the clock. Call ${site.phone.display}.`,
    },
    {
      icon: "copyright",
      title: "Our content is ours",
      text: "View and print for personal use; ask before you reuse it.",
    },
  ],
  sections: [
    {
      id: "information",
      title: "General information only",
      body: [
        "Content on this website is for general education about dental care and our services. It is not dental or medical advice and does not replace an exam, diagnosis or treatment plan from a licensed dentist.",
        "Every patient is different. Treatment options, timing and results vary from person to person and are discussed during your visit.",
      ],
    },
    {
      id: "relationship",
      title: "No dentist-patient relationship",
      body: [
        "Using this website, sending a form or emailing us does not create a dentist-patient relationship. That relationship begins once you are seen in our office.",
      ],
    },
    {
      id: "emergencies",
      title: "Emergencies",
      body: [
        "Do not use website forms for urgent needs.",
        {
          title: "In pain or had an accident?",
          note: `Call us at ${site.phone.display} for a dental emergency. For a life-threatening emergency, call 911 or go to the nearest emergency room.`,
          call: true,
        },
      ],
    },
    {
      id: "appointments",
      title: "Appointment requests",
      body: [
        "An appointment request sent through the website is not confirmed until a member of our team contacts you to confirm the date and time.",
      ],
    },
    {
      id: "offers",
      title: "Offers, pricing and insurance",
      body: [
        "Special offers, savings plans and financing shown on this site are subject to their own terms and eligibility, and may change or end without notice.",
        "Insurance coverage depends on your individual plan. Our team is happy to help you check your benefits.",
      ],
    },
    {
      id: "content",
      title: "Our content",
      body: [
        `Text, photos, graphics and logos on this site belong to ${site.name} or are used with permission.`,
        {
          list: [
            "You may view and print pages for personal, non-commercial use",
            "You may not copy, change or republish them without our written permission",
          ],
        },
      ],
    },
    {
      id: "links",
      title: "Links to other websites",
      body: [
        "This site links to third-party websites such as Google, Facebook, Yelp and financing providers. We do not control those sites and are not responsible for their content or privacy practices.",
      ],
    },
    {
      id: "liability",
      title: "Accuracy and liability",
      body: [
        "We work to keep this website accurate and up to date, but it is provided “as is” without warranties of any kind. To the extent allowed by law, we are not liable for any loss arising from your use of the site or reliance on its content.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: ["These terms are governed by the laws of the Commonwealth of Pennsylvania."],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms at any time. Continued use of the site after a change means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about these terms? Reach us at ${contact}`],
    },
  ],
};

export const disclaimer: LegalDoc = {
  slug: "disclaimer",
  title: "Disclaimer",
  blurb: "How to read the information on this site",
  icon: "scale",
  eyebrow: "Good to know",
  description: `Important notes about the dental information, reviews and offers on the ${site.name} website.`,
  intro:
    "We share information on this website to help you understand your options and feel at ease before your visit. Here is how to read it.",
  updated: UPDATED,
  glance: [
    { icon: "stethoscope", title: "Not medical advice", text: "Only an exam can tell what is right for your smile." },
    { icon: "sparkles", title: "Results vary", text: "Every mouth is different, so every outcome is too." },
    { icon: "star", title: "Reviews are personal", text: "They share one patient's experience, not a promise." },
    { icon: "percent", title: "Offers can change", text: "Specials and plans have terms and may end without notice." },
  ],
  sections: [
    {
      id: "general",
      title: "General information",
      body: [
        "The articles, service pages and answers on this website are for general education. They are not dental or medical advice and are not a substitute for an exam, diagnosis or treatment by a licensed dentist.",
        "Always talk to your dentist or physician about your own health before making treatment decisions.",
      ],
    },
    {
      id: "results",
      title: "Individual results vary",
      body: [
        "Every patient's mouth, health history and goals are different. Treatment time, comfort, cost and results vary from person to person.",
        "Descriptions of treatments and their benefits explain what is typically possible. They are not a guarantee of a particular outcome.",
      ],
    },
    {
      id: "reviews",
      title: "Patient reviews and testimonials",
      body: [
        "Reviews and testimonials reflect the personal experiences of individual patients. They do not guarantee that you will have the same experience or result.",
        "Ratings and review counts shown on this site come from public review platforms and may change over time.",
      ],
    },
    {
      id: "images",
      title: "Photos and images",
      body: [
        "Photos on this site show our office, our team and the care we provide. Any image showing a treatment result reflects that patient's individual case.",
      ],
    },
    {
      id: "offers",
      title: "Offers, fees and insurance",
      body: [
        "Special offers, savings plans and financing options have their own terms and eligibility, and may change or end without notice.",
        {
          list: [
            "Offers may not be combined with insurance or other offers unless stated",
            "Coverage depends on your individual insurance plan",
            "Financing is subject to approval by the provider",
          ],
        },
        "Our team will confirm what applies to you before treatment begins.",
      ],
    },
    {
      id: "services",
      title: "Services and technology",
      body: [
        "Services, technology and appointment availability described on this site may change. Please call the office to confirm a specific service before your visit.",
      ],
    },
    {
      id: "links",
      title: "Third-party links",
      body: [
        "Links to other websites, such as Google, Facebook, Yelp, maps and financing providers, are provided for convenience. We do not control or endorse their content and are not responsible for it.",
      ],
    },
    {
      id: "emergencies",
      title: "Emergencies",
      body: [
        "This website is not monitored for urgent messages.",
        {
          title: "Need help now?",
          note: `Call us at ${site.phone.display} for a dental emergency. For a life-threatening emergency, call 911 or go to the nearest emergency room.`,
          call: true,
        },
      ],
    },
    {
      id: "accuracy",
      title: "Accuracy",
      body: [
        "We work to keep everything on this site correct and current, but it may contain errors or become out of date. We may change content at any time without notice, and we are not liable for decisions made based on it.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about anything on this site? Reach us at ${contact}`],
    },
  ],
};

export const legalDocs = [privacyPolicy, termsOfUse, disclaimer];
