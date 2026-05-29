import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const VoiceIntelligenceSphere = () => {
  const sphereRef = useRef();
  const pointsRef = useRef();

  // Create a particle field
  const particleCount = 2000;
  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 0.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      temp[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = radius * Math.cos(phi);
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate the inner distortion sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
      // Pulse scale slightly based on a sine wave (simulating voice)
      const scale = 1 + Math.sin(t * 2) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }
    
    // Rotate outer particle field
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.1;
      pointsRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Center Core: Distorted glowing sphere */}
      <Sphere ref={sphereRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#38BDF8"
          emissive="#0F172A"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={3}
          wireframe={false}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Center Core: Inner Wireframe */}
      <Sphere args={[1.85, 32, 32]}>
        <meshBasicMaterial
          color="#00C2FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Particle Field */}
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#38BDF8"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00C2FF" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#7C3AED" />
    </group>
  );
};
