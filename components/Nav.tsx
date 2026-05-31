"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollToSelector } from "@/lib/lenis";

const LINKS: { id: string; label: string }[] = [
  { id: "#hero", label: "Home" },
  { id: "#about", label: "About" },
  { id: "#skills", label: "Skills" },
  { id: "#services", label: "Services" },
  { id: "#portfolio", label: "Work" },
  { id: "#experience", label: "Journey" },
  { id: "#testimonials", label: "Praise" },
  { id: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToSelector(id);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md bg-black/30" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <button
          onClick={() => go("#hero")}
          className="font-display text-lg font-extrabold tracking-tight"
        >
          JS<span className="text-emerald-glow">.</span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-white/70 transition-colors hover:text-emerald-glow"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => go("#contact")}
          className="hidden rounded-full border border-emerald-glow/40 px-5 py-2 text-sm text-emerald-glow transition-all hover:bg-emerald-glow hover:text-black md:block"
        >
          Let&apos;s talk
        </button>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mx-4 mt-3 overflow-hidden rounded-2xl glass md:hidden"
        >
          <div className="flex flex-col p-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="py-3 text-left text-white/80 hover:text-emerald-glow"
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
