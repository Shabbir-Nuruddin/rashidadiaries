import { useState } from "react";
import { site } from "../site.config";
import { WhatsApp, Mail, Instagram, Arrow } from "./icons";

const waText = encodeURIComponent(
  "Hi Farida! I found your media kit and I'd love to talk about a brand collaboration."
);
const waLink = `https://wa.me/${site.whatsapp}?text=${waText}`;
const igDm = `https://ig.me/m/${site.instagramHandle}`;
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Brand collaboration enquiry"
)}`;

type Status = "idle" | "sending" | "ok" | "error" | "nokey";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.web3formsKey) {
      setStatus("nokey");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: site.web3formsKey, ...payload }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl bg-cream p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clay text-cream">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-serif text-2xl text-ink">Thank you!</h3>
        <p className="mt-2 max-w-xs text-mocha">
          Your enquiry is on its way. I'll get back to you very soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-cream p-6 shadow-lg shadow-ink/5 ring-1 ring-ink/10 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Your name" placeholder="Jane Doe" required />
        <Field name="company" label="Brand / company" placeholder="Brand name" required />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field name="email" type="email" label="Email" placeholder="you@brand.com" required />
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mocha">
            Budget range
          </label>
          <select
            name="budget"
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-clay"
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            <option>Under AED 2,000</option>
            <option>AED 2,000 – 5,000</option>
            <option>AED 5,000 – 10,000</option>
            <option>AED 10,000+</option>
            <option>Let's discuss</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mocha">
          Tell me about your campaign
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="What are you launching, and what does success look like?"
          className="w-full resize-none rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-clay"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"} <Arrow />
      </button>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-clay-dark">
          Something went wrong. Please reach me on WhatsApp or email instead.
        </p>
      )}
      {status === "nokey" && (
        <p className="mt-3 text-center text-sm text-mocha">
          The form isn't connected to email yet — please use WhatsApp or email above for now.
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mocha">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-clay"
      />
    </div>
  );
}

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
