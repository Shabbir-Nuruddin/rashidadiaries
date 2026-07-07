import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { data } from "../lib/data";
import { compact } from "../lib/format";

// Scroll-driven "curtain" headline: the two words slide apart (one left, one
// right) to reveal the big reach number sitting behind them.
export default function SplitScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.6], ["0vw", "-58vw"]);
  const xRight = useTransform(scrollYProgress, [0, 0.6], ["0vw", "58vw"]);
  const revealOpacity = useTransform(scrollYProgress, [0.28, 0.55], [0, 1]);
  const revealScale = useTransform(scrollYProgress, [0.28, 0.6], [0.86, 1]);
  const revealY = useTransform(scrollYProgress, [0.28, 0.6], [40, 0]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-cream">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* revealed number sitting behind the words */}
        <motion.div
          style={{ opacity: revealOpacity, scale: revealScale, y: revealY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <span className="font-serif text-[22vw] font-semibold leading-none text-clay md:text-[16vw]">
            {compact(data.stats.reach)}+
          </span>
          <p className="mt-2 text-sm uppercase tracking-label text-mocha md:text-base">
            accounts reached
          </p>
          <p className="mt-4 max-w-xs px-6 text-mocha md:max-w-md">
            and the brands keep coming back for more.
          </p>
        </motion.div>

        {/* the two words that part */}
        <div className="relative flex w-full items-center justify-center">
          <motion.span
            style={{ x: xLeft }}
            className="font-serif text-[13vw] font-semibold leading-none text-ink md:text-[9vw]"
          >
            Seen
          </motion.span>
          <span className="w-[3vw]" />
          <motion.span
            style={{ x: xRight }}
            className="font-serif text-[13vw] font-semibold leading-none text-ink md:text-[9vw]"
          >
            everywhere
          </motion.span>
        </div>
      </div>
    </section>
  );
}
