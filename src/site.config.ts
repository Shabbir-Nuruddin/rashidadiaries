// ─────────────────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update the site's contact details and copy.
//  Everything a non-coder needs to change lives here. Look for  <- EDIT  notes.
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
  whatsapp: "971507006852",
  email: "faridaj213@gmail.com",

  // Contact form email service (Web3Forms, free, no backend).
  // Paste the Access Key you get by email from web3forms.com below.
  web3formsKey: "b89cec20-0539-4904-b32d-1ed2f3ba167d",

  // ── WHAT YOU OFFER (shown in the "Services" section) ──────────────────
  services: [
    {
      title: "Reels & Short-Form",
      desc: "Scroll-stopping vertical reels that make your product the hero, scripted, shot and edited in my own voice.",
    },
    {
      title: "Brand Integrations",
      desc: "Authentic placement woven into family and lifestyle stories my audience already trusts and acts on.",
    },
    {
      title: "Venue & Event Coverage",
      desc: "Restaurants, staycations and experiences captured beautifully, on location across the UAE.",
    },
    {
      title: "UGC & Ad Creative",
      desc: "Ready-to-run content you can use on your own channels and paid ads, licensed and on-brief.",
    },
  ],

  // ── CONTENT PILLARS (shown in the "About" section) ────────────────────
  pillars: [
    "Motherhood & family",
    "Weddings & celebrations",
    "Relatable comedy & POVs",
    "Food & dining",
    "Travel & staycations",
    "Everyday lifestyle",
  ],

  // ── TESTIMONIALS ──────────────────────────────────────────────────────
  // Replace with real quotes and set `placeholder: false` to render normally.
  testimonials: [
    {
      quote:
        "Add a real quote here from a brand you've worked with, what it was like collaborating and the results they saw.",
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
