import { site } from "../site.config";
import { Quote } from "./icons";

export default function Testimonials() {
  return (
    <section className="bg-sand/40 py-20 md:py-28">
      <div className="container-x">
        <p className="label mb-4">Kind words</p>
        <h2 className="mb-14 max-w-xl font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
          What brands say after working together
        </h2>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {site.testimonials.map((t, i) => (
            <figure key={i} className="border-t border-ink/15 pt-8">
              <Quote className="h-7 w-7 text-clay/50" />
              <blockquote
                className={`mt-4 font-serif text-2xl leading-snug ${
                  t.placeholder ? "italic text-mocha/60" : "text-ink"
                }`}
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush font-serif font-semibold text-clay">
                  {t.name.trim().charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.name}</span>
                  <span className="block text-xs text-mocha">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {site.testimonials.some((t) => t.placeholder) && (
          <p className="mt-10 text-xs text-mocha/70">
            Real brand testimonials will replace these placeholders.
          </p>
        )}
      </div>
    </section>
  );
}
