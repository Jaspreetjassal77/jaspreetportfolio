"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = -Math.random() * 120 + 10;
      spd[i] = 0.2 + Math.random() * 0.8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.5;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
    }
    pos.needsUpdate = true;
    ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#13f29a"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
