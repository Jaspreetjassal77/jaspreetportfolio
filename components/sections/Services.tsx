"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { SectionHeading } from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I <span className="gold-gradient">deliver</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 transition-colors hover:glass-emerald"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-glow/10 blur-2xl transition-all group-hover:bg-emerald-glow/25" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#13f29a"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-6 h-10 w-10"
              >
                <path d={s.icon} />
              </svg>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {s.desc}
              </p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-emerald-glow opacity-0 transition-opacity group-hover:opacity-100">
                0{i + 1} — Explore
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
