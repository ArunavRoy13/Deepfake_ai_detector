import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Clean, premium sphere with orbiting rings + soft particle halo.
 * No waveform scatter — just a beautiful glowing core.
 */
export const VoiceprintRibbon3D = () => {
  const coreRef   = useRef();
  const ring1Ref  = useRef();
  const ring2Ref  = useRef();
  const ring3Ref  = useRef();
  const haloRef   = useRef();
  const groupRef  = useRef();

  const HALO_COUNT = 800;

  const haloData = useMemo(() => {
    const pos = new Float32Array(HALO_COUNT * 3);
    for (let i = 0; i < HALO_COUNT; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 1.8 + Math.random() * 1.2;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = t * 0.05;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.35;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.y = -t * 0.18;
    if (haloRef.current)  haloRef.current.rotation.y  = t * 0.04;

    if (groupRef.current) {
      const tx = (state.pointer.x * Math.PI) / 18;
      const ty = -(state.pointer.y * Math.PI) / 24;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]}   intensity={3}   color="#3b82f6" />
      <pointLight position={[-4, -2, 3]} intensity={2}   color="#7c3aed" />
      <pointLight position={[0, -4, -2]} intensity={1.5} color="#1d4ed8" />

      {/* Core sphere */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[1.1, 48, 32]} />
          <meshStandardMaterial
            color="#1a2a6c"
            roughness={0.1}
            metalness={0.9}
            emissive="#1e40af"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[1.12, 20, 14]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* Orbit ring 1 (tilted 30°) */}
      <group ref={ring1Ref} rotation={[0.5, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.012, 16, 120]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} />
        </mesh>
        {/* dot on ring */}
        <mesh position={[1.7, 0, 0]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
      </group>

      {/* Orbit ring 2 (tilted 60°) */}
      <group ref={ring2Ref} rotation={[1.0, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.1, 0.008, 16, 120]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.45} />
        </mesh>
        <mesh position={[2.1, 0, 0]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshBasicMaterial color="#818cf8" />
        </mesh>
      </group>

      {/* Orbit ring 3 (nearly perpendicular) */}
      <group ref={ring3Ref} rotation={[0.2, 0, 1.2]}>
        <mesh>
          <torusGeometry args={[2.55, 0.006, 16, 120]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.28} />
        </mesh>
      </group>

      {/* Soft particle halo */}
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={HALO_COUNT} array={haloData} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#93c5fd" size={0.025} transparent opacity={0.55} sizeAttenuation />
      </points>
    </group>
  );
};
