import { data } from "../lib/data";
import { compact } from "../lib/format";
import { useCountUp } from "../hooks";

type Stat = { target: number; fmt: (n: number) => string; label: string; sub: string };

const stats: Stat[] = [
  { target: data.stats.followers, fmt: (n) => compact(n) + "+", label: "Followers", sub: "and growing" },
  { target: data.stats.posts, fmt: (n) => compact(n) + "+", label: "Posts", sub: "and counting" },
  { target: data.stats.totalViews, fmt: (n) => compact(n) + "+", label: "Views", sub: "on recent reels alone" },
  { target: data.stats.topViews, fmt: (n) => compact(n), label: "Best reel", sub: "single-reel views" },
  { target: data.stats.totalLikes, fmt: (n) => compact(n) + "+", label: "Likes", sub: "hearts earned" },
  { target: data.stats.brandCount, fmt: (n) => Math.round(n) + "+", label: "Brands", sub: "already delivered for" },
];

function StatItem({ s }: { s: Stat }) {
  const { ref, value } = useCountUp(s.target);
  return (
    <div className="text-center">
      <div className="font-serif text-4xl font-semibold text-cream md:text-5xl">
        <span ref={ref}>{s.fmt(value)}</span>
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-label text-gold">{s.label}</div>
      <div className="mt-1 text-xs text-cream/50">{s.sub}</div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-ink py-16 md:py-20">
      <div className="container-x">
        <p className="mb-10 text-center text-sm text-cream/60">
          The numbers a brand actually cares about, and these are just the recent reels.
        </p>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-3">
          {stats.map((s) => (
            <StatItem key={s.label} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
