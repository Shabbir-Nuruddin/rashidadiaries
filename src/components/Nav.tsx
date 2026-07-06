import { useEffect, useState } from "react";
import { site } from "../site.config";

const links = [
  { href: "#work", label: "Work" },
  { href: "#brands", label: "Brands" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-cream/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight text-ink">
          The Rashida Diaries
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-mocha hover:text-clay transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary !px-5 !py-2.5">
          Work with me
        </a>
      </div>
      <div className="sr-only">{site.creator}</div>
    </header>
  );
}
