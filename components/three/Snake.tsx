"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/store";
import { BODY_LEN, headTFromProgress, pointAt, snakeCurve } from "@/lib/path";

const TUBULAR = 200;
const RADIAL = 18;
const MAX_R = 0.4;

// snake silhouette: thin tail -> full belly -> tapered neck
function radiusShape(u: number) {
  const tail = THREE.MathUtils.smoothstep(u, 0.0, 0.1);
  const neck = 1 - THREE.MathUtils.smoothstep(u, 0.88, 1.0) * 0.5;
  const belly = 0.8 + 0.2 * Math.sin(u * Math.PI);
  return MAX_R * tail * neck * belly;
}

// emerald fresnel rim + procedural scales injected into MeshStandardMaterial
function patchSnakeMaterial(mat: THREE.MeshStandardMaterial) {
  mat.defines = { ...(mat.defines || {}), USE_UV: "" };
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRim = { value: new THREE.Color("#13f29a") };
    shader.uniforms.uTime = { value: 0 };
    mat.userData.shader = shader;

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform vec3 uRim;
         uniform float uTime;`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
         // reptile scales
         vec2 suv = vec2(vUv.x * 150.0, vUv.y * 24.0);
         suv.x += step(1.0, mod(suv.y, 2.0)) * 0.5;
         vec2 gg = abs(fract(suv) - 0.5);
         float edge = max(gg.x, gg.y);
         float scaleEdge = smoothstep(0.34, 0.5, edge);
         roughnessFactor = mix(roughnessFactor, roughnessFactor + 0.35, scaleEdge);`
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         float fres = pow(1.0 - saturate(dot(normalize(vNormal), normalize(vViewPosition))), 3.5);
         float pulse = 0.75 + 0.25 * sin(uTime * 1.5);
         totalEmissiveRadiance += uRim * fres * 0.32 * pulse;
         totalEmissiveRadiance += uRim * scaleEdge * 0.02;`
      );
  };
}

export default function Snake() {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const tongueRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const { geometry, positions, normals } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vCount = (TUBULAR + 1) * (RADIAL + 1);
    const pos = new Float32Array(vCount * 3);
    const nor = new Float32Array(vCount * 3);
    const uv = new Float32Array(vCount * 2);
    const idx: number[] = [];

    for (let i = 0; i <= TUBULAR; i++) {
      for (let j = 0; j <= RADIAL; j++) {
        const k = i * (RADIAL + 1) + j;
        uv[k * 2] = i / TUBULAR;
        uv[k * 2 + 1] = j / RADIAL;
      }
    }
    for (let i = 1; i <= TUBULAR; i++) {
      for (let j = 1; j <= RADIAL; j++) {
        const a = (RADIAL + 1) * (i - 1) + (j - 1);
        const b = (RADIAL + 1) * i + (j - 1);
        const c = (RADIAL + 1) * i + j;
        const d = (RADIAL + 1) * (i - 1) + j;
        idx.push(a, b, d, b, c, d);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -50), 200);

    return { geometry: geo, positions: pos, normals: nor };
  }, []);

  // scratch vectors (avoid per-frame allocation)
  const v = useMemo(
    () => ({
      P: new THREE.Vector3(),
      T: new THREE.Vector3(),
      N: new THREE.Vector3(),
      B: new THREE.Vector3(),
      up: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      center: new THREE.Vector3(),
      head: new THREE.Vector3(),
      headT: new THREE.Vector3(),
      look: new THREE.Vector3(),
      tmp: new THREE.Vector3(),
    }),
    []
  );

  useFrame((_, delta) => {
    const time = performance.now() / 1000;
    const headT = headTFromProgress(scrollState.smooth);
    const startT = headT - BODY_LEN;

    for (let i = 0; i <= TUBULAR; i++) {
      const u = i / TUBULAR;
      const t = startT + u * BODY_LEN;
      pointAt(t, v.P);
      const tc = THREE.MathUtils.clamp(t, 0.0001, 0.9999);
      snakeCurve.getTangentAt(tc, v.T).normalize();

      v.up.set(0, 1, 0);
      if (Math.abs(v.T.y) > 0.9) v.up.set(1, 0, 0);
      v.N.copy(v.up).cross(v.T).normalize();
      v.B.copy(v.T).cross(v.N).normalize();

      // slither undulation (less near the head)
      const fade = 1 - THREE.MathUtils.smoothstep(u, 0.8, 1.0);
      const wave = Math.sin(time * 3.0 - u * 11) * 0.13 * fade;
      const waveV = Math.cos(time * 2.3 - u * 9) * 0.05 * fade;
      v.center.copy(v.P).addScaledVector(v.N, wave).addScaledVector(v.B, waveV);

      const breathe = 1 + 0.05 * Math.sin(time * 1.4 + u * 5);
      const r = radiusShape(u) * breathe;

      for (let j = 0; j <= RADIAL; j++) {
        const ang = (j / RADIAL) * Math.PI * 2;
        v.dir
          .copy(v.N)
          .multiplyScalar(Math.cos(ang))
          .addScaledVector(v.B, Math.sin(ang))
          .normalize();
        const k = (i * (RADIAL + 1) + j) * 3;
        positions[k] = v.center.x + v.dir.x * r;
        positions[k + 1] = v.center.y + v.dir.y * r;
        positions[k + 2] = v.center.z + v.dir.z * r;
        normals[k] = v.dir.x;
        normals[k + 1] = v.dir.y;
        normals[k + 2] = v.dir.z;
      }
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.normal.needsUpdate = true;

    // --- Head ---
    if (headRef.current) {
      pointAt(headT, v.head);
      pointAt(Math.min(headT + 0.004, 1), v.headT);
      headRef.current.position.copy(v.head);

      // look ahead along the body
      v.look.copy(v.headT);
      // mouse influence strongest in the hero section
      const heroInfluence = 1 - THREE.MathUtils.smoothstep(scrollState.smooth, 0.0, 0.12);
      v.look.x += scrollState.mouseX * 2.2 * heroInfluence;
      v.look.y += scrollState.mouseY * 1.6 * heroInfluence;
      headRef.current.lookAt(v.look);
    }

    // tongue flick
    if (tongueRef.current) {
      const flick = Math.max(0, Math.sin(time * 2.2));
      const out = Math.pow(flick, 6);
      tongueRef.current.scale.z = 0.2 + out * 1.0;
      (tongueRef.current.material as THREE.MeshBasicMaterial).opacity = out;
    }

    if (matRef.current?.userData.shader) {
      matRef.current.userData.shader.uniforms.uTime.value = time;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          ref={(m) => {
            matRef.current = m;
            if (m) patchSnakeMaterial(m);
          }}
          color="#06140d"
          metalness={0.45}
          roughness={0.35}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Head */}
      <group ref={headRef}>
        {/* skull */}
        <mesh scale={[0.46, 0.34, 0.7]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#06140d"
            metalness={0.5}
            roughness={0.3}
            envMapIntensity={1.4}
          />
        </mesh>
        {/* snout */}
        <mesh position={[0, -0.02, 0.42]} scale={[0.3, 0.22, 0.4]}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#05110b" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* eyes */}
        <mesh position={[0.22, 0.12, 0.3]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color="#13f29a"
            emissive="#13f29a"
            emissiveIntensity={6}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[-0.22, 0.12, 0.3]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color="#13f29a"
            emissive="#13f29a"
            emissiveIntensity={6}
            toneMapped={false}
          />
        </mesh>
        {/* tongue */}
        <mesh ref={tongueRef} position={[0, -0.05, 0.62]}>
          <coneGeometry args={[0.03, 0.5, 6]} />
          <meshBasicMaterial color="#ff2d55" transparent opacity={0} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
