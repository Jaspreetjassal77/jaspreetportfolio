"use client";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <DepthOfField
        focusDistance={0.012}
        focalLength={0.06}
        bokehScale={3}
        height={480}
      />
      <Bloom
        intensity={0.95}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.5}
        mipmapBlur
      />
      <Noise blendFunction={BlendFunction.OVERLAY} opacity={0.18} />
      <Vignette eskil={false} offset={0.18} darkness={1.0} />
    </EffectComposer>
  );
}
