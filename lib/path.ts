import * as THREE from "three";

// Build the master spline the snake travels along while the user scrolls.
// The first stretch is a tight coil (hero), then it unspools and winds
// forward (-Z) through the rest of the journey.
function buildPoints(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];

  // --- Coil (hero section) ---
  const coilTurns = 2.25;
  const coilSteps = 30;
  for (let i = 0; i < coilSteps; i++) {
    const f = i / (coilSteps - 1);
    const ang = f * Math.PI * 2 * coilTurns;
    const r = 3.0 * (1 - f * 0.66); // spiral inward toward the head
    pts.push(
      new THREE.Vector3(
        Math.cos(ang) * r,
        Math.sin(ang) * r * 0.4 - 0.4,
        Math.sin(ang * 0.5) * 0.8 + 0.2
      )
    );
  }

  // --- Journey waypoints (winding through the remaining sections) ---
  const way: [number, number, number][] = [
    [6, 1.6, -4],
    [10, -1, -10],
    [4, 3.2, -18],
    [-6, 0.4, -26],
    [-10, -2, -34],
    [-3, 2.6, -42],
    [6, -1.2, -50],
    [12, 1.6, -58],
    [4, -3, -66],
    [-8, 0.2, -74],
    [-12, 2.2, -82],
    [-4, -1.6, -90],
    [3, 0.6, -97],
    [8, 1.4, -104],
  ];
  way.forEach(([x, y, z]) => pts.push(new THREE.Vector3(x, y, z)));

  return pts;
}

export const snakeCurve = new THREE.CatmullRomCurve3(
  buildPoints(),
  false,
  "catmullrom",
  0.5
);
snakeCurve.arcLengthDivisions = 2000;

// Fraction of the curve occupied by the snake body at any moment.
export const BODY_LEN = 0.17;

const _p = new THREE.Vector3();
const _t = new THREE.Vector3();

export function pointAt(t: number, target: THREE.Vector3) {
  const c = THREE.MathUtils.clamp(t, 0, 1);
  return snakeCurve.getPointAt(c, target);
}

export function tangentAt(t: number, target: THREE.Vector3) {
  const c = THREE.MathUtils.clamp(t, 0.0001, 0.9999);
  return snakeCurve.getTangentAt(c, target).normalize();
}

// Map global scroll progress (0..1) to the head position along the curve so the
// whole body always stays on the curve.
export function headTFromProgress(progress: number) {
  return THREE.MathUtils.lerp(BODY_LEN, 1, THREE.MathUtils.clamp(progress, 0, 1));
}

export { _p, _t };
