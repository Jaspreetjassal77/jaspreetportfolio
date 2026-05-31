import type Lenis from "lenis";

let _lenis: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  _lenis = l;
}

export function scrollToSelector(selector: string) {
  if (_lenis) {
    _lenis.scrollTo(selector, { offset: 0, duration: 1.6 });
  } else if (typeof document !== "undefined") {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
}
