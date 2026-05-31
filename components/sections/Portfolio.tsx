"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";
import { SectionHeading } from "./Reveal";

const FILTERS = ["All", ...PROJECT_CATEGORIES];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-shell">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio Showcase"
          title={
            <>
              Selected <span className="emerald-gold-gradient">work</span>
            </>
          }
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pill transition-all ${
                filter === f
                  ? "border-emerald-glow/60 bg-emerald-glow/10 text-emerald-glow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl glass"
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 30% 20%, rgba(19,242,154,0.35), rgba(4,6,10,0.9) 60%), linear-gradient(135deg, #0a1f17, #04060a)",
                    }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-emerald-glow backdrop-blur">
                    {p.category}
                  </span>
                  <div className="absolute bottom-4 right-4 font-display text-6xl font-extrabold text-white/5 transition-colors group-hover:text-emerald-glow/10">
                    {p.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{p.blurb}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
