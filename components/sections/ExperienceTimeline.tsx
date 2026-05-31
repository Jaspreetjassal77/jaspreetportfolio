"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data";
import { SectionHeading } from "./Reveal";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          eyebrow="Experience Timeline"
          title={
            <>
              The <span className="gold-gradient">journey</span>
            </>
          }
          className="text-center"
        />

        <div className="relative mt-16 pl-8 md:pl-0">
          {/* the serpent spine of the timeline */}
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-emerald-glow via-emerald-deep to-transparent md:left-1/2" />

          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className={`relative md:w-1/2 ${
                  i % 2
                    ? "md:ml-auto md:pl-10"
                    : "md:pr-10 md:text-right"
                }`}
              >
                <span
                  className={`absolute top-2 h-4 w-4 -translate-x-[1.65rem] rounded-full border-2 border-emerald-glow bg-ink shadow-[0_0_18px_#13f29a] md:translate-x-0 ${
                    i % 2 ? "md:-left-12" : "md:-right-12 md:left-auto"
                  }`}
                />
                <div className="rounded-2xl glass p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-glow">
                    {t.period}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    {t.role}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
