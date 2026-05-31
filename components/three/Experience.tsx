"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import Snake from "./Snake";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import Effects from "./Effects";

export default function Experience({ mobile = false }: { mobile?: boolean }) {
  return (
    <Canvas
      shadows={false}
      dpr={mobile ? [1, 1.5] : [1, 1.9]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 1.4, 9.5], fov: 42, near: 0.1, far: 400 }}
    >
      <color attach="background" args={["#04060a"]} />
      <fogExp2 attach="fog" args={["#04060a", 0.02]} />

      {/* cinematic key + fill lighting */}
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} color="#cfe9ff" />
      <pointLight position={[2, 3, 5]} intensity={16} color="#13f29a" distance={22} />
      <pointLight position={[-6, -2, -20]} intensity={35} color="#0b8f5e" distance={40} />
      <pointLight position={[8, 3, -50]} intensity={45} color="#e9c46a" distance={50} />
      <pointLight position={[-8, 2, -80]} intensity={45} color="#13f29a" distance={50} />

      <Suspense fallback={null}>
        <Snake />
        <Particles count={mobile ? 700 : 1400} />

        {/* HDRI-style reflections built from lightformers (fully offline) */}
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#04060a"]} />
          <Lightformer
            form="rect"
            intensity={3}
            color="#13f29a"
            position={[-6, 4, -8]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#ffffff"
            position={[6, 5, -6]}
            scale={[8, 8, 1]}
          />
          <Lightformer
            form="ring"
            intensity={2.4}
            color="#e9c46a"
            position={[0, -4, -10]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.6}
            color="#0b8f5e"
            position={[10, 0, -20]}
            scale={[6, 6, 1]}
          />
        </Environment>

        <CameraRig />
        <Effects mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
