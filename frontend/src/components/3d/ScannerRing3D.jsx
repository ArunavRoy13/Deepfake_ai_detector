import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ScannerRing3D — used in the Detection Lab section.
 * A precision circular scanner that resembles a forensic analysis tool:
 * - Rotating outer ring with tick marks
 * - Animated sweep beam
 * - Central frequency visualizer bars
 * - Floating data point particles
 */
export const ScannerRing3D = () => {
  const sweepRef = useRef();
  const innerRingRef = useRef();
  const outerRingRef = useRef();
  const barsRef = useRef();
  const particlesRef = useRef();

  const particleCount = 80;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Scatter in a donut ring shape
      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.3;
      const r = 2.2 + (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  // Frequency bar geometry (instanced)
  const barCount = 32;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Sweep rotation
    if (sweepRef.current) sweepRef.current.rotation.y = t * 1.5;
    if (innerRingRef.current) innerRingRef.current.rotation.y = -t * 0.3;
    if (outerRingRef.current) outerRingRef.current.rotation.y = t * 0.15;

    // Animate frequency bars
    if (barsRef.current) {
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        const freq = 0.2 + Math.abs(Math.sin(i * 0.4 + t * 3)) * 0.6;
        dummy.position.set(Math.cos(angle) * 0.8, freq * 0.3, Math.sin(angle) * 0.8);
        dummy.scale.set(0.04, freq * 0.4 + 0.05, 0.04);
        dummy.rotation.y = -angle;
        dummy.updateMatrix();
        barsRef.current.setMatrixAt(i, dummy.matrix);
      }
      barsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Drift particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 4, 2]} intensity={3} color="#ffffff" />
      <pointLight position={[0, -3, 2]} intensity={2} color="#2563EB" />

      {/* Outer precision ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.018, 16, 120]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.3} />
      </mesh>

      {/* Tick marks on outer ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const r = 2.5;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[i % 6 === 0 ? 0.12 : 0.05, 0.03, i % 6 === 0 ? 0.03 : 0.02]} />
            <meshBasicMaterial color={i % 6 === 0 ? '#2563EB' : '#0A0A0A'} />
          </mesh>
        );
      })}

      {/* Mid ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.4} />
      </mesh>

      {/* Sweep arm */}
      <group ref={sweepRef}>
        <mesh position={[0, 0, 1.25]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.01, 0.01, 2.5]} />
          <meshBasicMaterial color="#2563EB" />
        </mesh>
        {/* Sweep fade cone */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <coneGeometry args={[1.8, 0.01, 32, 1, true]} />
          <meshBasicMaterial color="#2563EB" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Frequency bars (instanced) */}
      <instancedMesh ref={barsRef} args={[null, null, barCount]}>
        <boxGeometry />
        <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.3} />
      </instancedMesh>

      {/* Central dot */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#2563EB" size={0.04} transparent opacity={0.6} />
      </points>
    </>
  );
};
