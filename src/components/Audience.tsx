import { useState } from "react";
import { site } from "../site.config";
import Reveal from "./Reveal";

function Portrait() {
  const [failed, setFailed] = useState(false);
  // Drop a photo at  public/farida.jpg  and it appears here automatically.
  if (failed) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-blush via-sand to-cream">
        <div className="text-center">
          <span className="font-serif text-6xl font-semibold text-clay/70">FN</span>
          <p className="mt-3 text-xs uppercase tracking-label text-mocha/70">
            Add your photo (public/farida.jpg)
          </p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}farida.jpg`}
      alt={site.creator}
      onError={() => setFailed(true)}
      className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-ink/10"
    />
  );
}

export default function Audience() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-blush/40 blur-xl" />
            <Portrait />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="label mb-4">The creator</p>
          <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            Hi, I'm {site.creator}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mocha">
            For years I've been sharing real family life in {site.location.split(",")[0]}, the
            warmth, the humour, the everyday moments that people see themselves in. That trust is
            exactly what turns a brand mention into something my community remembers and buys.
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-label text-mocha">
              What I create
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {site.pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
            <div>
              <dt className="text-xs uppercase tracking-label text-mocha">Based in</dt>
              <dd className="mt-1 font-serif text-xl text-ink">{site.location.split(",")[0]}, UAE</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-label text-mocha">Focus</dt>
              <dd className="mt-1 font-serif text-xl text-ink">Family &amp; Lifestyle</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
