"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";
import { SectionHeading } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Skills Universe"
          title={
            <>
              A galaxy of <span className="emerald-gold-gradient">tools</span>
            </>
          }
          className="text-center"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.06, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="group relative flex flex-col items-center justify-center rounded-2xl glass p-6 transition-colors hover:glass-emerald"
            >
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-emerald-glow/10 blur-xl transition-all group-hover:bg-emerald-glow/30" />
                <span className="relative font-display text-xl font-bold text-emerald-glow">
                  {s.level}
                </span>
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#13f29a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 28}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    whileInView={{
                      strokeDashoffset: 2 * Math.PI * 28 * (1 - s.level / 100),
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white/85">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
