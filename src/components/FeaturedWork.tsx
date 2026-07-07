import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { data } from "../lib/data";
import { compact } from "../lib/format";
import { Play, Arrow } from "./icons";

function ReelCard({ r, i }: { r: (typeof data.featured)[number]; i: number }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      className="group relative w-[74vw] max-w-[300px] shrink-0 snap-start"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-sand">
        {r.thumb ? (
          <img
            src={r.thumb}
            alt={r.caption || "Reel"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush to-sand">
            <Play className="h-8 w-8 text-clay/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-ink/10" />

        <span className="absolute left-4 top-4 font-serif text-sm text-cream/70">
          {String(i + 1).padStart(2, "0")}
        </span>
        {r.brand && (
          <span className="absolute right-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold text-ink">
            {r.brand}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-serif text-3xl font-semibold leading-none text-cream">
            {compact(r.views)}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-cream/60">views</p>
        </div>
      </div>

      <div className="mt-4 pr-4">
        <p className="font-serif text-lg leading-snug text-ink">{r.hook}</p>
        {r.caption && <p className="mt-1 line-clamp-2 text-sm text-mocha">{r.caption}</p>}
      </div>
    </a>
  );
}

export default function FeaturedWork() {
  const rail = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) =>
    rail.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  // A horizontal scroll container can trap the vertical wheel in some browsers.
  // Forward vertical-dominant wheel to the page so people can always scroll down
  // while the cursor is over the reels (horizontal trackpad gestures still move
  // the rail; the arrows navigate it too).
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="work" className="overflow-hidden py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="label mb-4">Featured work</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              The reels that landed. Two of them past a million views.
            </h2>
            <p className="mt-4 text-mocha">
              Use the arrows or swipe to move through {data.featured.length} recent reels, branded
              and organic. Every card opens the real post on Instagram.
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => nudge(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-clay hover:text-clay"
            >
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => nudge(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-clay hover:text-clay"
            >
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* horizontal rail: wheel-scrolls on hover, swipes on touch */}
      <div
        ref={rail}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 pb-2 md:px-10"
      >
        {data.featured.map((r, i) => (
          <ReelCard key={r.shortCode} r={r} i={i} />
        ))}
        <div className="shrink-0 pr-2" />
      </div>

      <div className="container-x mt-14 flex justify-center">
        <a
          href={`https://instagram.com/${data.meta.handle}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary !px-8 !py-4 text-base"
        >
          View all on Instagram <Arrow />
        </a>
      </div>
    </section>
  );
}
