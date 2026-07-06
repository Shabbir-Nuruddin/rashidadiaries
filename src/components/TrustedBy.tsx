import { data } from "../lib/data";

export default function TrustedBy() {
  const names = data.brands.map((b) => b.name);
  const row = [...names, ...names]; // duplicate for a seamless loop

  return (
    <section id="brands" className="border-y border-ink/10 py-16 md:py-20">
      <div className="container-x mb-10 text-center">
        <p className="label mb-3">Trusted by</p>
        <h2 className="font-serif text-2xl text-ink md:text-3xl">
          Global names and local favourites, all paid collaborations
        </h2>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {row.map((n, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-serif text-2xl font-medium text-ink/70 md:text-3xl"
            >
              {n}
              <span className="ml-12 text-gold">✦</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12"
        >
          {row.map((n, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-serif text-2xl font-medium text-ink/70 md:text-3xl"
            >
              {n}
              <span className="ml-12 text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
