import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "../site.config";
import { data } from "../lib/data";
import { compact } from "../lib/format";
import { Arrow, Instagram } from "./icons";
import type { Reel } from "../lib/data";

const quick = [
  { value: compact(data.stats.followers) + "+", label: "Followers" },
  { value: compact(data.stats.reach) + "+", label: "Reach" },
  { value: compact(data.stats.topViews), label: "Top reel" },
];

// reels that flip through the hero deck
const deck = data.featured.filter((r) => r.thumb).slice(0, 20);

// where each card sits, based on how far it is from the active (front) card
function place(off: number): CSSProperties {
  const base: CSSProperties = {
    transformOrigin: "left center",
    transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
  };
  if (off < 0) {
    // already flipped: thrown off to the left
    return { ...base, transform: "translateX(-135%) rotate(-16deg) scale(0.9)", opacity: 0, zIndex: 0 };
  }
  const s = Math.min(off, 4);
  return {
    ...base,
    transform: `translateX(${s * 34}px) translateY(${s * 16}px) rotate(${s * 3}deg) scale(${1 - s * 0.05})`,
    opacity: off > 3 ? 0 : 1,
    zIndex: 50 - off,
  };
}

function FlipCard({ r, off }: { r: Reel; off: number }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      style={place(off)}
      className="absolute inset-0 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl shadow-ink/25"
    >
      <img src={r.thumb!} alt="Reel" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4">
        <p className="font-serif text-2xl font-semibold leading-none text-cream">
          {compact(r.views)}
        </p>
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-cream/70">
          views{r.brand ? ` · ${r.brand}` : ""}
        </p>
      </div>
    </a>
  );
}

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActive(0);
        return;
      }
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const p = scrolled / total;
      setActive(Math.round(p * (deck.length - 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="top" ref={wrap} className="relative sm:h-[260vh]">
      <div className="grain relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:sticky sm:top-0 sm:h-screen sm:pt-24 sm:pb-0">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-blush/50 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-24 h-80 w-80 rounded-full bg-sand/60 blur-3xl" />

        <div className="container-x relative grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="label mb-5 flex items-center gap-2">
              <span className="h-px w-8 bg-clay" /> {site.tagline}
            </p>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
              The Rashida
              <br />
              Diaries
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mocha">
              I'm <span className="font-semibold text-ink">{site.creator}</span>. With a small team
              across the UAE and India, we turn everyday family and lifestyle moments into content
              that audiences watch, trust and act on. Here's the reach behind the reels.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Start a partnership <Arrow />
              </a>
              <a href="#work" className="btn-ghost">
                See the work
              </a>
            </div>

            <dl className="mt-12 flex max-w-md items-end gap-8">
              {quick.map((q) => (
                <div key={q.label}>
                  <dt className="font-serif text-3xl font-semibold text-ink md:text-4xl">
                    {q.value}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-label text-mocha">{q.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* scroll-driven flip deck */}
          <div className="relative mx-auto hidden h-[500px] w-full max-w-[300px] sm:block [perspective:1400px]">
            {deck.map((r, i) => (
              <FlipCard key={r.shortCode} r={r} off={i - active} />
            ))}

            <div className="pointer-events-none absolute -bottom-9 left-0 right-0 flex items-center justify-between">
              <span className="font-serif text-sm text-mocha">
                {String(active + 1).padStart(2, "0")}{" "}
                <span className="text-mocha/50">/ {String(deck.length).padStart(2, "0")}</span>
              </span>
              <span className="text-[11px] uppercase tracking-label text-mocha/60">scroll to flip</span>
            </div>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute -top-9 right-0 flex items-center gap-2 text-xs font-semibold text-mocha hover:text-clay"
            >
              <Instagram className="h-4 w-4" /> @{site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
