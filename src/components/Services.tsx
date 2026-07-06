import { site } from "../site.config";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="bg-sand/40 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label mb-4">Ways to work together</p>
          <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            Content built to move your brand
          </h2>
          <p className="mt-4 text-mocha">
            Pick a format or let's shape a package around your campaign goals.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 90}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-lg hover:shadow-ink/5"
            >
              <span className="font-serif text-2xl text-clay">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mocha">{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-mocha">
            Custom collaborations &amp; rate card available on request —{" "}
            <a href="#contact" className="font-semibold text-clay underline-offset-4 hover:underline">
              let's talk
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
