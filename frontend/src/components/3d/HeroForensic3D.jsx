import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshTransmissionMaterial, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

export const HeroForensic3D = () => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();
  const particleSystemRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate scanner rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.1;
      outerRingRef.current.rotation.y = t * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -t * 0.15;
      innerRingRef.current.rotation.y = -t * 0.25;
    }

    // Pulse the core
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.y = t * 0.5;
    }
    
    // Rotate particles slowly
    if (particleSystemRef.current) {
      particleSystemRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} color="#081226" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00C2FF" />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#38BDF8" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group scale={1.2}>
          
          {/* Forensic Outer Scanner Ring */}
          <mesh ref={outerRingRef}>
            <cylinderGeometry args={[2.8, 2.8, 0.5, 64, 1, true]} />
            <meshStandardMaterial 
              color="#00C2FF" 
              emissive="#00C2FF" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.15} 
              wireframe={true} 
            />
          </mesh>

          {/* Forensic Inner Frequency Ring */}
          <mesh ref={innerRingRef}>
            <cylinderGeometry args={[2.5, 2.5, 1, 64, 1, true]} />
            <meshStandardMaterial 
              color="#38BDF8" 
              emissive="#38BDF8" 
              emissiveIntensity={0.8} 
              transparent 
              opacity={0.2} 
              wireframe={true} 
            />
          </mesh>

          {/* Central Biometric Core (Representing the Voiceprint) */}
          <mesh ref={coreRef}>
            <capsuleGeometry args={[0.8, 2, 32, 64]} />
            <MeshTransmissionMaterial 
              backside
              samples={4}
              thickness={2}
              chromaticAberration={1}
              anisotropy={0.5}
              distortion={0.8}
              distortionScale={0.5}
              temporalDistortion={0.2}
              iridescence={1}
              iridescenceIOR={1.5}
              iridescenceThicknessRange={[100, 400]}
              clearcoat={1}
              attenuationDistance={1}
              attenuationColor="#00C2FF"
              color="#081226"
            />
          </mesh>

          {/* Volumetric Laser/Particle Scan Effects */}
          <group ref={particleSystemRef}>
            <Sparkles count={400} scale={4} size={1.5} speed={0.4} color="#00C2FF" opacity={0.6} />
            <Sparkles count={200} scale={3} size={2} speed={1} color="#EF4444" opacity={0.4} />
          </group>

        </group>
      </Float>
    </>
  );
};
