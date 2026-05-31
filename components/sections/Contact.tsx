"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SOCIALS } from "@/lib/data";
import { SectionHeading } from "./Reveal";

const CONTACT_EMAIL = "jaspreetjassal77@gmail.com";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nProject Details:\n${form.details}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition-colors focus:border-emerald-glow/60";

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build
                <br />
                <span className="emerald-gold-gradient">something bold</span>
              </>
            }
          />
          <p className="mt-6 max-w-md text-white/65">
            Have a project in mind? Drop the details and I&apos;ll get back to
            you. The serpent is watching — so make it count.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="pill transition-colors hover:border-emerald-glow/60 hover:text-emerald-glow"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl glass glass-emerald p-8"
        >
          <div className="grid gap-4">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={field}
            />
            <textarea
              required
              rows={4}
              placeholder="Project Details"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className={`${field} resize-none`}
            />
            <button
              type="submit"
              className="mt-2 rounded-xl bg-emerald-glow py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              {sent ? "Opening your mail app…" : "Send Message"}
            </button>
            {sent && (
              <p className="text-center text-sm text-emerald-glow">
                Thanks! Your message draft is ready to send.
              </p>
            )}
          </div>
        </motion.form>
      </div>

      <footer className="mx-auto mt-20 w-full max-w-6xl border-t border-white/10 pt-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Jaspreet Singh — Crafted with Three.js, GSAP
        &amp; a little venom.
      </footer>
    </section>
  );
}
