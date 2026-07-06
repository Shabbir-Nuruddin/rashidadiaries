import { motion } from "framer-motion";
import { site } from "../site.config";
import { Arrow } from "./icons";

export default function Services() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="label mb-4">Ways to work together</p>
            <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              Content built to move your brand
            </h2>
          </div>
          <p className="text-mocha md:pb-2">
            Pick a format or let's shape a package around your campaign goals. Rate card on request.
          </p>
        </div>

        <ul className="mt-12 border-t border-ink/15">
          {site.services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-ink/15 py-7 md:grid-cols-[5rem_1fr_1.3fr] md:gap-x-8"
            >
              <span className="font-serif text-3xl text-clay/40 transition-colors group-hover:text-clay md:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="flex items-center gap-3 font-serif text-2xl text-ink md:text-3xl">
                {s.title}
                <Arrow className="h-5 w-5 -translate-x-2 text-clay opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="col-start-2 max-w-md text-mocha md:col-start-3 md:pt-1">{s.desc}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
