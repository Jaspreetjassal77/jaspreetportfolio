"use client";

import { ABOUT } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

const STATS = [
  { value: "5+", label: "Disciplines" },
  { value: "50+", label: "Projects" },
  { value: "100%", label: "Passion" },
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="About Me"
            title={
              <>
                Crafting <span className="gold-gradient">premium</span>
                <br /> digital experiences
              </>
            }
          />
        </div>

        <Reveal delay={0.15}>
          <div className="glass glass-emerald rounded-3xl p-8 md:p-10">
            <p className="text-lg leading-relaxed text-white/80">{ABOUT}</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-extrabold text-emerald-glow">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "PHP", "ASP", "UI/UX"].map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
