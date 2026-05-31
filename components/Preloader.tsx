"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / 1900);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-extrabold tracking-tight md:text-5xl"
          >
            JASPREET <span className="text-emerald-glow">SINGH</span>
          </motion.div>
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-emerald-glow"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 text-sm tracking-[0.3em] text-white/50">
            {pct}%
          </div>
          <div className="mt-2 text-xs tracking-[0.3em] text-white/30">
            SUMMONING THE SERPENT
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
