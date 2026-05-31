"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "./Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-shell">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Kind <span className="emerald-gold-gradient">words</span>
            </>
          }
          className="text-center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl glass glass-emerald p-8"
            >
              <div className="font-display text-6xl leading-none text-emerald-glow/30">
                &ldquo;
              </div>
              <blockquote className="-mt-4 text-lg leading-relaxed text-white/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-glow/15 font-display font-bold text-emerald-glow">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/50">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
