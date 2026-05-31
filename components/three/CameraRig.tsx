"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/store";
import { BODY_LEN, headTFromProgress, pointAt, snakeCurve } from "@/lib/path";

export default function CameraRig() {
  const { camera } = useThree();

  const v = useMemo(
    () => ({
      head: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
      side: new THREE.Vector3(),
      heroPos: new THREE.Vector3(0, 1.4, 9.5),
      heroLook: new THREE.Vector3(0, -0.2, 0),
      followPos: new THREE.Vector3(),
      followLook: new THREE.Vector3(),
      targetPos: new THREE.Vector3(),
      targetLook: new THREE.Vector3(),
      curLook: new THREE.Vector3(0, -0.2, 0),
    }),
    []
  );

  useFrame((_, delta) => {
    const p = scrollState.smooth;
    const headT = headTFromProgress(p);

    pointAt(headT, v.head);
    const tc = THREE.MathUtils.clamp(headT, 0.0001, 0.9999);
    snakeCurve.getTangentAt(tc, v.tan).normalize();
    v.side.copy(v.tan).cross(v.up).normalize();

    // follow camera: trail behind & above the head, peeking from the side
    v.followPos
      .copy(v.head)
      .addScaledVector(v.tan, -5.2)
      .addScaledVector(v.up, 2.3)
      .addScaledVector(v.side, 1.6);
    v.followLook.copy(v.head).addScaledVector(v.tan, 3.0);

    // hero framing drifts subtly with the mouse for life
    v.heroPos.set(
      scrollState.mouseX * 0.8,
      1.4 + scrollState.mouseY * 0.5,
      9.5
    );

    const blend = THREE.MathUtils.smoothstep(p, 0.04, 0.16);
    v.targetPos.lerpVectors(v.heroPos, v.followPos, blend);
    v.targetLook.lerpVectors(v.heroLook, v.followLook, blend);

    const ease = 1 - Math.pow(0.001, delta);
    camera.position.lerp(v.targetPos, ease);
    v.curLook.lerp(v.targetLook, ease);
    camera.lookAt(v.curLook);
  });

  return null;
}
