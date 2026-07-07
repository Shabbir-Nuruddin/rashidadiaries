import { useState } from "react";
import { site } from "../site.config";
import { Arrow } from "./icons";

type Status = "idle" | "sending" | "ok" | "error" | "nokey";

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
  min,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: number;
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
        min={min}
        inputMode={type === "number" ? "numeric" : undefined}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-clay"
      />
    </div>
  );
}

export default function ContactForm({ onDone }: { onDone?: () => void }) {
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
        onDone?.();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl bg-cream p-10 text-center">
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
      <input type="hidden" name="subject" value="New brand enquiry via The Rashida Diaries" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Your name" placeholder="Jane Doe" required />
        <Field name="company" label="Brand / company" placeholder="Brand name" required />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field name="email" type="email" label="Email" placeholder="you@brand.com" required />
        <Field name="instagram" label="Your Instagram" placeholder="@yourbrand" />
      </div>
      <div className="mt-4">
        <Field name="budget" label="Budget (AED)" placeholder="e.g. 500 AED" />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mocha">
          What do you need?
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field name="reels" type="number" min={0} label="Reels" placeholder="0" />
          <Field name="stories" type="number" min={0} label="Stories" placeholder="0" />
          <div className="col-span-2 sm:col-span-1">
            <Field name="other_deliverables" label="Other" placeholder="e.g. 1 post" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mocha">
          Anything else to specify?
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Tell me what you're launching, timelines, and what success looks like."
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
          The form isn't connected to email yet, so please use WhatsApp or email for now.
        </p>
      )}
    </form>
  );
}
