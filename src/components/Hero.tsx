import { site } from "../site.config";
import { data } from "../lib/data";
import { compact } from "../lib/format";
import { Arrow, Instagram } from "./icons";

const quick = [
  { value: compact(data.stats.followers), label: "Followers" },
  { value: compact(data.stats.totalViews) + "+", label: "Views" },
  { value: compact(data.stats.topViews), label: "Top reel" },
];

const covers = data.featured.filter((r) => r.thumb).slice(0, 3);

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-blush/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-80 w-80 rounded-full bg-sand/60 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <p className="label mb-5 flex items-center gap-2">
            <span className="h-px w-8 bg-clay" /> {site.tagline}
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
            The Rashida
            <br />
            Diaries
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mocha">
            I'm <span className="font-semibold text-ink">{site.creator}</span>. I turn everyday
            family and lifestyle moments into content that {site.location.split(",")[0]} audiences
            watch, trust and act on. Here's the reach behind the reels.
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

        <div className="relative mx-auto hidden h-[440px] w-full max-w-md sm:block">
          {covers.map((r, i) => {
            const styles = [
              "left-1/2 top-0 -translate-x-1/2 rotate-0 z-30 w-52 md:w-56",
              "left-2 top-16 -rotate-6 z-20 w-44 md:w-48",
              "right-2 top-20 rotate-6 z-10 w-44 md:w-48",
            ];
            return (
              <a
                key={r.shortCode}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className={`absolute overflow-hidden rounded-2xl border-4 border-cream shadow-2xl shadow-ink/20 transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 ${styles[i]}`}
                style={{ animation: `fade-up 0.7s ${0.15 * i + 0.2}s both` }}
              >
                <div className="relative aspect-[9/16]">
                  <img src={r.thumb!} alt="Reel cover" loading="eager" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3">
                    <p className="text-[11px] font-semibold text-cream/90">{compact(r.views)} views</p>
                  </div>
                </div>
              </a>
            );
          })}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/90 px-4 py-2 text-xs font-semibold text-cream backdrop-blur"
          >
            <Instagram className="h-4 w-4" /> @{site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
