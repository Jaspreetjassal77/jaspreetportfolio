import { SECTIONS } from "./data";

// A tiny mutable global store read inside the render loop (useFrame) so the
// 3D scene never triggers React re-renders per frame.
export type ScrollState = {
  // overall scroll progress 0..1 across the whole page
  progress: number;
  // smoothed progress used by the snake/camera
  smooth: number;
  // scroll velocity (for motion blur / reactive effects)
  velocity: number;
  // normalized pointer -1..1
  mouseX: number;
  mouseY: number;
  // index of the section currently in view
  section: number;
  // number of scrollable sections
  count: number;
  // viewport flag for lighter rendering on small screens
  isMobile: boolean;
};

export const scrollState: ScrollState = {
  progress: 0,
  smooth: 0,
  velocity: 0,
  mouseX: 0,
  mouseY: 0,
  section: 0,
  count: SECTIONS.length,
  isMobile: false,
};
