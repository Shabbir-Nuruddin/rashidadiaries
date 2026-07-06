import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Full-screen 3D wordmark that assembles on load, then lifts to reveal the site.
export default function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(onDone, reduce ? 400 : 2300);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [onDone, reduce]);

  const words = ["The", "Rashida", "Diaries"];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.p
        className="mb-6 text-xs uppercase tracking-label text-clay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Dubai · Family &amp; Lifestyle
      </motion.p>

      <div className="flex flex-col items-center gap-1 [transform-style:preserve-3d]">
        {words.map((w, i) => (
          <motion.span
            key={w}
            className="intro-word font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl md:text-8xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 92, y: 34 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0 }}
            transition={{ delay: 0.25 + i * 0.18, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "50% 100%" }}
          >
            {w}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="mt-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: reduce ? 160 : 220, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      />
    </motion.div>
  );
}
