"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/store";
import { setLenis } from "@/lib/lenis";
import { SECTIONS } from "@/lib/data";

export default function ScrollManager() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
      // ease the smoothed progress that drives the snake + camera
      scrollState.smooth += (scrollState.progress - scrollState.smooth) * 0.12;
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
        scrollState.velocity = self.getVelocity();
        scrollState.section = Math.min(
          SECTIONS.length - 1,
          Math.round(self.progress * (SECTIONS.length - 1))
        );
      },
    });

    const onMove = (e: PointerEvent) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    const onResize = () => {
      scrollState.isMobile = window.innerWidth < 768;
      ScrollTrigger.refresh();
    };
    scrollState.isMobile = window.innerWidth < 768;
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerCb);
      st.kill();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
