"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROLES } from "@/lib/data";
import { scrollToSelector } from "@/lib/lenis";

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="section-shell items-center text-center"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="eyebrow mb-6"
        >
          Cinematic 3D Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="heading-xl text-[15vw] leading-[0.85] sm:text-[12vw] md:text-[9rem]"
        >
          <span className="emerald-gold-gradient">JASPREET</span>
          <br />
          <span className="text-white">SINGH</span>
        </motion.h1>

        <div className="mt-8 flex h-10 items-center justify-center text-lg text-white/70 md:text-2xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="text-emerald-glow"
            >
              {ROLES[idx]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSelector("#portfolio")}
            className="rounded-full bg-emerald-glow px-8 py-3 font-medium text-black transition-transform hover:scale-105"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSelector("#contact")}
            className="rounded-full border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:border-emerald-glow hover:text-emerald-glow"
          >
            Hire Me
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/40"
      >
        <div className="flex flex-col items-center gap-2">
          SCROLL TO BEGIN
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-emerald-glow to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
