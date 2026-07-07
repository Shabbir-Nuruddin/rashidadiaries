import { site } from "../site.config";
import { WhatsApp, Mail, Instagram, Arrow } from "./icons";
import ContactForm from "./ContactForm";

const waText = encodeURIComponent(
  "Hi Farida! I found your media kit and I'd love to talk about a brand collaboration."
);
const waLink = `https://wa.me/${site.whatsapp}?text=${waText}`;
const igDm = `https://ig.me/m/${site.instagramHandle}`;
const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Brand collaboration enquiry")}`;

export default function Contact() {
  const channels = [
    { href: waLink, icon: <WhatsApp />, label: "WhatsApp", sub: "Fastest reply" },
    { href: mailto, icon: <Mail />, label: "Email", sub: site.email },
    { href: igDm, icon: <Instagram />, label: "Instagram DM", sub: "@" + site.instagramHandle },
  ];
  return (
    <section id="contact" className="bg-ink py-20 text-cream md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-label text-gold">
            Let's collaborate
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Put your brand in front of an audience that acts.
          </h2>
          <p className="mt-5 max-w-md text-cream/70">
            Tell me what you're launching and I'll come back with ideas, formats and a quote.
            Prefer to chat first? Reach me directly:
          </p>

          <div className="mt-8 space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-4 transition hover:border-clay hover:bg-cream/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition group-hover:bg-clay">
                  {c.icon}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{c.label}</span>
                  <span className="block text-sm text-cream/50">{c.sub}</span>
                </span>
                <Arrow className="h-4 w-4 text-cream/40 transition group-hover:translate-x-1 group-hover:text-clay" />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
