import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshTransmissionMaterial, Environment } from '@react-three/drei';

export const HeroCore3D = () => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
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
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
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
    </>
  );
};
