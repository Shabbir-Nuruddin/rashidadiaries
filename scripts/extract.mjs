// Turns the raw Instagram reel scrape into the site's content + downloads thumbnails.
// Run:  node scripts/extract.mjs "<path-to-dataset.json>"
// Re-runnable: point it at a fresh scrape later to refresh the site.
//
// NOTE on "views": Instagram relabeled the reel play count as "Views" in-app (2024),
// so we treat videoPlayCount as the public "views" number a brand sees on the reel.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DATASET =
  process.argv[2] ||
  "C:/Users/Shabbir/Downloads/dataset_instagram-reel-scraper_2026-07-06_14-16-03-775.json";

const OWNER = "therashidadiaries";
const FOLLOWERS = 80000; // not in scrape; provided by creator
const FEATURED_COUNT = 24;

// Curated map of commercial brand handles -> display info. Personal / family /
// creator accounts are deliberately excluded so the "brands" story stays honest.
const BRANDS = {
  honorglobal: { name: "HONOR", category: "Tech" },
  honorarabia: { name: "HONOR", category: "Tech" },
  pampersarabia: { name: "Pampers", category: "Baby" },
  papajohnsuae: { name: "Papa John's", category: "Food" },
  "downy.arabia": { name: "Downy", category: "Home" },
  arielarabia: { name: "Ariel", category: "Home" },
  getyourguide: { name: "GetYourGuide", category: "Travel" },
  getyourguidecommunity: { name: "GetYourGuide", category: "Travel" },
  ecolyteplus: { name: "Ecolyte", category: "Wellness" },
  calliegifts: { name: "Callie Gifts", category: "Gifting" },
  sarahofcallie: { name: "Callie Gifts", category: "Gifting" },
  meltycookiecafe: { name: "Melty Cookie Cafe", category: "Food" },
  bombaygrillsandwoks: { name: "Bombay Grill", category: "Food" },
  thespicerydxb: { name: "The Spicery", category: "Food" },
  "calicuttopform.ae": { name: "Calicut Top Form", category: "Food" },
  "beelaban.ind": { name: "Beelaban", category: "Food" },
  "almarmoom.domes": { name: "Al Marmoom Domes", category: "Hospitality" },
  creamoneofficial: { name: "Cream One", category: "Food" },
  danubeproperties: { name: "Danube Properties", category: "Real Estate" },
  dealpriceae: { name: "DealPrice", category: "Retail" },
  bluebotelcafe: { name: "Blue Botel Cafe", category: "Food" },
  naseemperfume: { name: "Naseem Perfume", category: "Beauty" },
  royalsquarefeet: { name: "Royal Square Feet", category: "Real Estate" },
};

const num = (v) => (typeof v === "number" && isFinite(v) ? v : 0);
// Instagram-style "views" = play count.
const viewsOf = (r) => num(r.videoPlayCount) || num(r.videoViewCount);
const median = (arr) => {
  const a = [...arr].sort((x, y) => x - y);
  if (!a.length) return 0;
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

const raw = JSON.parse(fs.readFileSync(DATASET, "utf-8"));
const reels = raw.filter((r) => r.ownerUsername === OWNER && r.type === "Video");

function reelBrands(r) {
  const handles = new Set([...(r.mentions || [])]);
  for (const t of r.taggedUsers || []) if (t?.username) handles.add(t.username);
  const found = new Map();
  for (const h of handles) {
    const b = BRANDS[h.toLowerCase()];
    if (b) found.set(b.name, b);
  }
  return [...found.values()];
}

// A short, honest hook line for the showcase ("why it landed").
function hookFor(r, views) {
  const cap = (r.caption || "").replace(/\s+/g, " ").toLowerCase();
  const brands = reelBrands(r);
  if (views >= 3_000_000) return "Breakout viral moment";
  if (views >= 1_000_000) return "Over a million views";
  if (brands.length) return `${brands[0].name} partnership`;
  if (/pov|husband|wife|relatable|friend group|every/i.test(cap)) return "Relatable POV that struck a nerve";
  if (/wedding|bride|bhabhi|bhanji/i.test(cap)) return "Wedding-season favourite";
  if (/breakfast|dinner|food|restaurant|cafe|tea|coffee|eat/i.test(cap)) return "Food spot people saved & shared";
  if (/dubai|travel|desert|staycation|sky/i.test(cap)) return "Dubai experience people loved";
  if (views >= 100_000) return "Strong organic reach";
  return "Community favourite";
}

// clean caption to a short hook sentence
function cleanCaption(c) {
  return (c || "")
    .replace(/\s+/g, " ")
    .replace(/#[^\s#]+/g, "")
    .replace(/@[^\s@]+/g, "")
    .replace(/\s*[–—]\s*/g, ", ") // no en/em dashes in copy
    .replace(/\s+,/g, ",")
    .trim()
    .replace(/^[^A-Za-z0-9"“]+/, "")
    .slice(0, 96)
    .trim();
}

// aggregate
const totalViews = reels.reduce((s, r) => s + viewsOf(r), 0);
const topViews = reels.reduce((m, r) => Math.max(m, viewsOf(r)), 0);
const totalLikes = reels.reduce((s, r) => s + num(r.likesCount), 0);
const millionReels = reels.filter((r) => viewsOf(r) >= 1_000_000).length;
const engRates = reels
  .map((r) => {
    const v = viewsOf(r);
    return v ? (num(r.likesCount) + num(r.commentsCount)) / v : null;
  })
  .filter((x) => x !== null);

const brandAgg = new Map();
for (const r of reels) {
  for (const b of reelBrands(r)) {
    const e = brandAgg.get(b.name) || { name: b.name, category: b.category, reels: 0, views: 0, likes: 0 };
    e.reels += 1;
    e.views += viewsOf(r);
    e.likes += num(r.likesCount);
    brandAgg.set(b.name, e);
  }
}
const brands = [...brandAgg.values()].sort((a, b) => b.views - a.views);

const dates = reels
  .map((r) => (r.timestamp ? new Date(r.timestamp) : null))
  .filter(Boolean)
  .sort((a, b) => a - b);

const featured = [...reels]
  .sort((a, b) => viewsOf(b) - viewsOf(a))
  .slice(0, FEATURED_COUNT)
  .map((r) => {
    const bs = reelBrands(r);
    const views = viewsOf(r);
    return {
      shortCode: r.shortCode,
      url: r.url,
      thumb: `reels/${r.shortCode}.jpg`,
      views,
      likes: num(r.likesCount),
      comments: num(r.commentsCount),
      brand: bs[0]?.name || null,
      hook: hookFor(r, views),
      caption: cleanCaption(r.caption),
      _imgUrl: r.displayUrl || (r.images && r.images[0]) || null,
    };
  });

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return buf.length;
  } catch {
    return 0;
  }
}

const reelDir = path.join(ROOT, "public", "reels");
fs.mkdirSync(reelDir, { recursive: true });

let ok = 0;
for (const f of featured) {
  if (!f._imgUrl) continue;
  const dest = path.join(reelDir, `${f.shortCode}.jpg`);
  const bytes = await download(f._imgUrl, dest);
  if (bytes > 1000) {
    ok++;
    process.stdout.write(`  ok ${f.shortCode}.jpg (${(bytes / 1024).toFixed(0)}kb)\n`);
  } else {
    f.thumb = null;
    process.stdout.write(`  -- ${f.shortCode} (thumbnail unavailable)\n`);
  }
  delete f._imgUrl;
}

const out = {
  meta: {
    generatedAt: new Date().toISOString(),
    handle: OWNER,
    creator: reels[0]?.ownerFullName || "Farida Nuruddin",
    reelCount: reels.length,
    firstPost: dates[0]?.toISOString().slice(0, 10) || null,
    lastPost: dates[dates.length - 1]?.toISOString().slice(0, 10) || null,
  },
  stats: {
    followers: FOLLOWERS,
    totalViews,
    topViews,
    totalLikes,
    millionReels,
    avgEngagementPct: engRates.length ? +(median(engRates) * 100).toFixed(1) : 0,
    brandCount: brands.length,
    reelCount: reels.length,
  },
  brands,
  caseStudy: brands[0] || null,
  featured,
};

fs.mkdirSync(path.join(ROOT, "src", "data"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "src", "data", "reels.json"), JSON.stringify(out, null, 2));

console.log(`\nExtracted ${reels.length} reels | ${brands.length} brands | ${ok} thumbnails`);
console.log(`Total views: ${totalViews.toLocaleString()} | Top: ${topViews.toLocaleString()}`);
console.log(`Median engagement: ${out.stats.avgEngagementPct}%`);
