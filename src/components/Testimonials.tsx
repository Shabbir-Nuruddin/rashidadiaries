import { site } from "../site.config";
import { Quote } from "./icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label mb-4">Kind words</p>
          <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
            What brands say
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {site.testimonials.map((t, i) => (
            <Reveal
              key={i}
              delay={i * 120}
              className={`rounded-3xl border p-8 ${
                t.placeholder
                  ? "border-dashed border-ink/20 bg-cream/60"
                  : "border-ink/10 bg-cream shadow-sm"
              }`}
            >
              <Quote className="h-8 w-8 text-clay/50" />
              <p
                className={`mt-4 font-serif text-lg leading-relaxed ${
                  t.placeholder ? "italic text-mocha/70" : "text-ink"
                }`}
              >
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blush font-serif font-semibold text-clay">
                  {t.name.trim().charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-mocha">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {site.testimonials.some((t) => t.placeholder) && (
          <p className="mt-6 text-center text-xs text-mocha/70">
            Real brand testimonials will replace these placeholders.
          </p>
        )}
      </div>
    </section>
  );
}
