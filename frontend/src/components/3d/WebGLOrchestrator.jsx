import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, MeshTransmissionMaterial, Environment, Float, Sparkles, Sphere, Html, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Hero Scene: Crystalline AI Voice Core ---
const HeroScene = ({ scroll }) => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    // Rotation based on time and scroll
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2 + scroll.offset * Math.PI * 4;
      coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.5;
      ringRef1.current.rotation.y = t * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -t * 0.3;
      ringRef2.current.rotation.y = -t * 0.5;
    }

    // Move out of view when scrolling down
    const yOffset = -scroll.range(0, 0.25) * 10;
    const zOffset = scroll.range(0, 0.25) * 5;
    if (coreRef.current) {
      coreRef.current.position.y = yOffset;
      coreRef.current.position.z = zOffset;
    }
    if (ringRef1.current) {
      ringRef1.current.position.y = yOffset;
      ringRef1.current.position.z = zOffset;
    }
    if (ringRef2.current) {
      ringRef2.current.position.y = yOffset;
      ringRef2.current.position.z = zOffset;
    }
  });

  return (
    <group position={[3, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Core Crystal */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1.5}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.3}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            clearcoat={1}
            attenuationDistance={2}
            attenuationColor="#ffffff"
            color="#e2e8f0"
          />
        </mesh>
        
        {/* Orbital Rings */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
        <mesh ref={ringRef2}>
          <torusGeometry args={[3.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Sparkles count={100} scale={10} size={2} speed={0.4} color="#ffffff" opacity={0.5} />
    </group>
  );
};

// --- Scanner Chamber Scene ---
const ScannerChamber = ({ scroll }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Animate rings
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child.isMesh) {
          child.rotation.z = t * (i % 2 === 0 ? 0.5 : -0.5) * 0.5;
          const scale = 1 + Math.sin(t * 2 + i) * 0.05;
          child.scale.set(scale, scale, scale);
        }
      });
    }

    // Enter view around scroll 0.4
    const enterVal = scroll.curve(0.3, 0.3); // peaks at 0.45
    if (groupRef.current) {
      // Come from below and behind
      groupRef.current.position.y = -10 + (enterVal * 10);
      groupRef.current.position.z = -10 + (enterVal * 10);
      // scale up
      const s = enterVal * 1.5;
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[0, -10, -10]} rotation={[Math.PI / 2.5, 0, 0]}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0, (i - 4) * 1.5]}>
          <torusGeometry args={[5 + i*0.2, 0.05, 16, 100]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#ffffff" : "#3b82f6"} 
            emissive={i % 2 === 0 ? "#ffffff" : "#2563eb"} 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8 - (Math.abs(i-3.5)*0.1)} 
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
      <Sparkles count={200} scale={15} size={3} speed={0.8} color="#3b82f6" />
    </group>
  );
};


// --- Global Threat Globe Scene ---
const ThreatGlobe = ({ scroll }) => {
  const globeRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.1;
      
      // Enter view around scroll 0.8
      const enterVal = scroll.curve(0.7, 0.3);
      globeRef.current.position.y = -15 + (enterVal * 15);
      globeRef.current.position.z = -20 + (enterVal * 10);
      const s = enterVal * 1;
      globeRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={globeRef} position={[0, -15, -20]}>
      {/* Globe Core */}
      <mesh>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial 
          color="#020617"
          emissive="#000000"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Outer Atmosphere / Threat Field */}
      <mesh>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          emissive="#ef4444"
          wireframe={true}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      <Sparkles count={500} scale={12} size={1.5} speed={0.2} color="#ef4444" opacity={0.6} />
    </group>
  );
};


export const WebGLOrchestrator = () => {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    // Master Camera Animation based on scroll
    // 0 to 0.3: Hero
    // 0.3 to 0.6: Scanner
    // 0.7 to 1.0: Results / Global Threat
    
    const offset = scroll.offset;
    
    // Smoothly move camera
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 + (offset * -10), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (offset * -4), 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} color="#3b82f6" />

      {/* Background dark void */}
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 5, 40]} />

      <HeroScene scroll={scroll} />
      <ScannerChamber scroll={scroll} />
      <ThreatGlobe scroll={scroll} />
    </>
  );
};
