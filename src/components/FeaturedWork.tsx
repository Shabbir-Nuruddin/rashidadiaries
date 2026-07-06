import { data } from "../lib/data";
import { compact } from "../lib/format";
import { Play, Arrow } from "./icons";
import Reveal from "./Reveal";

function ReelCard({ r }: { r: (typeof data.featured)[number] }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-sand shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[9/16]">
        {r.thumb ? (
          <img
            src={r.thumb}
            alt={r.caption || "Reel"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush to-sand">
            <Play className="h-8 w-8 text-clay/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

        {r.brand && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold text-ink shadow">
            {r.brand}
          </span>
        )}

        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 backdrop-blur transition group-hover:bg-clay">
          <Play className="h-4 w-4 text-cream" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="font-serif text-2xl font-semibold text-cream">{compact(r.plays)}</p>
              <p className="text-[11px] uppercase tracking-wide text-cream/70">plays</p>
            </div>
            <p className="pb-1 text-xs font-medium text-cream/80">{compact(r.views)} views</p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function FeaturedWork() {
  const cs = data.caseStudy;
  return (
    <section id="work" className="bg-sand/40 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="label mb-4">Featured work</p>
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              Reels that reached hundreds of thousands
            </h2>
            <p className="mt-4 text-mocha">
              A snapshot of recent content — branded and organic. Every card opens the real post
              on Instagram.
            </p>
          </div>
          <a href={`https://instagram.com/${data.meta.handle}`} target="_blank" rel="noreferrer" className="btn-ghost shrink-0">
            View full profile <Arrow />
          </a>
        </Reveal>

        {/* case study strip */}
        {cs && (
          <Reveal
            delay={100}
            className="mt-12 overflow-hidden rounded-3xl bg-ink text-cream"
          >
            <div className="grid gap-6 p-8 md:grid-cols-[1.2fr_2fr] md:items-center md:p-10">
              <div>
                <p className="text-xs uppercase tracking-label text-gold">Campaign highlight</p>
                <p className="mt-3 font-serif text-4xl font-semibold">{cs.name}</p>
                <p className="mt-2 text-sm text-cream/60">{cs.category} · multi-reel partnership</p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-cream/15 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                {[
                  { v: cs.reels + "", l: "reels delivered" },
                  { v: compact(cs.plays), l: "plays" },
                  { v: compact(cs.views), l: "views" },
                ].map((x) => (
                  <div key={x.l}>
                    <p className="font-serif text-3xl font-semibold text-cream">{x.v}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-cream/50">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* reel grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.featured.map((r, i) => (
            <Reveal key={r.shortCode} delay={(i % 4) * 80}>
              <ReelCard r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
