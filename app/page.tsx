"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ScrollManager from "@/components/ScrollManager";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
});

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    setReady(true);
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <Preloader />
      <ScrollManager />

      <div className="webgl-stage">{ready && <Experience mobile={mobile} />}</div>

      <Nav />

      <main className="content-layer">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <ExperienceTimeline />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
