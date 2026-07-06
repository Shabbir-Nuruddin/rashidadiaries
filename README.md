# The Rashida Diaries — Brand Media Kit

A single-page media-kit / portfolio website for **Farida Nuruddin** (@therashidadiaries),
the link-in-bio destination where brands see her reach, engagement and track record — and
get in touch. Built from real Instagram performance data.

**Live sections:** hero · impact stats · trusted-by brands · featured reels · about ·
services · testimonials · contact (WhatsApp, email, Instagram DM, form).

---

## The 3 things you'll want to edit

Everything a non-technical person needs to change lives in **`src/site.config.ts`**:

1. **Your contact details** — WhatsApp number, email, and the Web3Forms key (so the contact
   form emails you). Look for the `← EDIT` notes.
2. **Testimonials** — replace the two placeholder quotes with real ones and set
   `placeholder: false`.
3. **Your photo** — drop a photo named **`farida.jpg`** into the `public/` folder and it
   appears in the About section automatically.

Brand logos: place image files in `public/logos/` and let us know — we can swap the text
wordmarks for official logos.

---

## Running it locally (optional)
```bash
npm install
npm run dev      # preview at http://localhost:5173
npm run build    # production build into /dist
```

## Refreshing the data
When you have a newer scrape of the account, update the numbers and thumbnails with:
```bash
npm run extract -- "C:/path/to/new-dataset.json"
```
This regenerates `src/data/reels.json` and re-downloads reel thumbnails into `public/reels/`.

## Deploying
The site is a static build. Connect this repo to **Vercel** (free) and it deploys
automatically on every push. A custom domain can be added in Vercel's dashboard.

---

Built with Vite + React + TypeScript + Tailwind CSS.
