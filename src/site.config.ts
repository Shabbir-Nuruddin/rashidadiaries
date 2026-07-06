// ─────────────────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update the site's contact details and copy.
//  Everything a non-coder needs to change lives here. Look for  ← EDIT  notes.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  brand: "The Rashida Diaries",
  creator: "Farida Nuruddin",
  tagline: "Dubai family & lifestyle creator",
  location: "Dubai, United Arab Emirates",
  instagramHandle: "therashidadiaries",
  instagramUrl: "https://instagram.com/therashidadiaries",

  // ── CONTACT ────────────────────────────────────────────────────────────
  // WhatsApp: international format, digits only, no "+" or spaces.
  // Example for a UAE number +971 50 123 4567  →  "971501234567"
  whatsapp: "971500000000", //  ← EDIT: your WhatsApp number
  email: "hello@therashidadiaries.com", //  ← EDIT: the email brands should use

  // Contact form email service (Web3Forms — free, no backend).
  // 1) Go to https://web3forms.com  2) enter your email  3) copy the Access Key
  // 4) paste it below. Until then the form shows a friendly fallback.
  web3formsKey: "", //  ← EDIT: paste your Web3Forms access key

  // ── WHAT YOU OFFER (shown in the "Services" section) ──────────────────
  services: [
    {
      title: "Reels & Short-Form",
      desc: "Scroll-stopping vertical reels that make your product the hero — scripted, shot and edited in my voice.",
    },
    {
      title: "Brand Integrations",
      desc: "Authentic placement woven into family & lifestyle stories my audience already trusts and acts on.",
    },
    {
      title: "Venue & Event Coverage",
      desc: "Restaurants, staycations and experiences captured beautifully, on location across the UAE.",
    },
    {
      title: "UGC & Ad Creative",
      desc: "Ready-to-run content you can use on your own channels and paid ads — licensed and on-brief.",
    },
  ],

  // ── CONTENT PILLARS (shown in the "Audience" section) ─────────────────
  pillars: [
    "Motherhood & family",
    "Weddings & celebrations",
    "Relatable comedy & POVs",
    "Food & dining",
    "Travel & staycations",
    "Everyday lifestyle",
  ],

  // ── TESTIMONIALS ──────────────────────────────────────────────────────
  // Replace these placeholders with real quotes from brands you've worked with.
  // Set `placeholder: false` once a quote is real so it renders normally.
  testimonials: [
    {
      quote:
        "Add a real quote here from a brand you've worked with — what it was like collaborating and the results they saw.",
      name: "Brand contact name",
      role: "Marketing Manager, Brand",
      placeholder: true,
    },
    {
      quote:
        "A second short testimonial goes here. Even one or two genuine lines from a happy brand build huge trust.",
      name: "Brand contact name",
      role: "Founder, Brand",
      placeholder: true,
    },
  ],
};

export type Site = typeof site;
