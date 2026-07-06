// Turns the raw Instagram reel scrape into the site's content + downloads thumbnails.
// Run:  node scripts/extract.mjs "<path-to-dataset.json>"
// Re-runnable: point it at a fresh scrape later to refresh the site.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DATASET =
  process.argv[2] ||
  "C:/Users/Shabbir/Downloads/dataset_instagram-reel-scraper_2026-07-06_08-40-29-419.json";

const OWNER = "therashidadiaries";
const FOLLOWERS = 80000; // not in scrape; provided by creator

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
};

const num = (v) => (typeof v === "number" && isFinite(v) ? v : 0);
const median = (arr) => {
  const a = [...arr].sort((x, y) => x - y);
  if (!a.length) return 0;
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

const raw = JSON.parse(fs.readFileSync(DATASET, "utf-8"));
const reels = raw.filter((r) => r.ownerUsername === OWNER && r.type === "Video");

// --- brand handles present on each reel -------------------------------------
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

// --- aggregate stats --------------------------------------------------------
const totalPlays = reels.reduce((s, r) => s + num(r.videoPlayCount), 0);
const totalViews = reels.reduce(
  (s, r) => s + (num(r.videoViewCount) || num(r.videoPlayCount)),
  0
);
const engRates = reels
  .map((r) => {
    const v = num(r.videoViewCount) || num(r.videoPlayCount);
    return v ? (num(r.likesCount) + num(r.commentsCount)) / v : null;
  })
  .filter((x) => x !== null);

// distinct brands + per-brand aggregation
const brandAgg = new Map();
for (const r of reels) {
  for (const b of reelBrands(r)) {
    const e = brandAgg.get(b.name) || {
      name: b.name,
      category: b.category,
      reels: 0,
      plays: 0,
      views: 0,
      likes: 0,
    };
    e.reels += 1;
    e.plays += num(r.videoPlayCount);
    e.views += num(r.videoViewCount) || num(r.videoPlayCount);
    e.likes += num(r.likesCount);
    brandAgg.set(b.name, e);
  }
}
const brands = [...brandAgg.values()].sort((a, b) => b.plays - a.plays);

// dates
const dates = reels
  .map((r) => (r.timestamp ? new Date(r.timestamp) : null))
  .filter(Boolean)
  .sort((a, b) => a - b);

// --- featured reels (top by plays) ------------------------------------------
const featured = [...reels]
  .sort((a, b) => num(b.videoPlayCount) - num(a.videoPlayCount))
  .slice(0, 12)
  .map((r) => {
    const bs = reelBrands(r);
    const caption = (r.caption || "")
      .replace(/\s+/g, " ")
      .replace(/#[^\s#]+/g, "")
      .trim()
      .slice(0, 90);
    return {
      shortCode: r.shortCode,
      url: r.url,
      thumb: `reels/${r.shortCode}.jpg`,
      views: num(r.videoViewCount) || num(r.videoPlayCount),
      plays: num(r.videoPlayCount),
      likes: num(r.likesCount),
      comments: num(r.commentsCount),
      brand: bs[0]?.name || null,
      caption,
      _imgUrl: r.displayUrl || (r.images && r.images[0]) || null,
    };
  });

// --- download thumbnails ----------------------------------------------------
async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return buf.length;
  } catch (e) {
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
    process.stdout.write(`  ✓ ${f.shortCode}.jpg (${(bytes / 1024).toFixed(0)}kb)\n`);
  } else {
    f.thumb = null; // card will show a styled placeholder instead
    process.stdout.write(`  ✗ ${f.shortCode} (thumbnail unavailable)\n`);
  }
  delete f._imgUrl;
}

// --- top brand case study ---------------------------------------------------
const topBrand = brands[0] || null;

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
    totalPlays,
    totalViews,
    avgEngagementPct: engRates.length
      ? +(median(engRates) * 100).toFixed(1)
      : 0,
    brandCount: brands.length,
    reelCount: reels.length,
  },
  brands,
  caseStudy: topBrand,
  featured,
};

fs.mkdirSync(path.join(ROOT, "src", "data"), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, "src", "data", "reels.json"),
  JSON.stringify(out, null, 2)
);

console.log(`\nExtracted ${reels.length} reels · ${brands.length} brands · ${ok} thumbnails downloaded`);
console.log(`Total plays: ${totalPlays.toLocaleString()} · Total views: ${totalViews.toLocaleString()}`);
console.log(`Median engagement: ${out.stats.avgEngagementPct}% · Wrote src/data/reels.json`);
