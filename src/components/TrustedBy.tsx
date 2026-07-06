import { data } from "../lib/data";
import Reveal from "./Reveal";

export default function TrustedBy() {
  const brands = data.brands;
  return (
    <section id="brands" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label mb-4">Trusted by</p>
          <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            Brands that already put their name in my hands
          </h2>
          <p className="mt-4 text-mocha">
            From global tech to family favourites — real, paid collaborations, not just tags.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {brands.map((b) => (
            <div
              key={b.name}
              className="group flex min-h-[104px] flex-col items-center justify-center gap-1 bg-cream px-4 py-6 text-center transition-colors hover:bg-sand"
            >
              <span className="font-serif text-xl font-semibold text-ink/80 transition-colors group-hover:text-clay">
                {b.name}
              </span>
              <span className="text-[10px] uppercase tracking-label text-mocha/70">
                {b.category}
              </span>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-xs text-mocha/70">
          Official brand logos can be swapped in on request.
        </p>
      </div>
    </section>
  );
}
