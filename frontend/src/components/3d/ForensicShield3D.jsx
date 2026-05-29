import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Forensic Shield — premium 3D for the "How It Works" section.
 * A slowly rotating wireframe sphere wrapped with a solid inner core
 * and orbiting signal rings. Clean and technical.
 */
export const ForensicShield3D = () => {
  const outerRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.25;
      ring2Ref.current.rotation.x = Math.PI / 3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.1;
      const pulse = 1 + Math.sin(t * 2) * 0.015;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-4, -4, 3]} intensity={1.5} color="#2563EB" />

      {/* Outer wireframe sphere */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial color="#0A0A0A" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Solid core — metallic */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#F4F4F1"
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>

      {/* Cobalt scan ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* Cobalt scan ring 2 — tilted */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.007, 16, 100]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.5} />
      </mesh>

      {/* Tick marks on the outer ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#2563EB' : '#0A0A0A'} />
          </mesh>
        );
      })}
    </>
  );
};
