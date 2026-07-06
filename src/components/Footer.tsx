import { site } from "../site.config";
import { Instagram } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-serif text-lg font-semibold text-ink">{site.brand}</p>
          <p className="mt-1 text-sm text-mocha">
            {site.creator} · {site.tagline}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-sm text-mocha hover:text-clay">
            Work
          </a>
          <a href="#brands" className="text-sm text-mocha hover:text-clay">
            Brands
          </a>
          <a href="#contact" className="text-sm text-mocha hover:text-clay">
            Contact
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-clay hover:text-clay"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p className="container-x mt-8 text-center text-xs text-mocha/60 md:text-left">
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </p>
    </footer>
  );
}
