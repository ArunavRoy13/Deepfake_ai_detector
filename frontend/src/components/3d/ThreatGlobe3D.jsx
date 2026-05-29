import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';

export const ThreatGlobe3D = () => {
  const globeRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.1;
      globeRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      
      <group ref={globeRef} scale={1.5}>
        {/* Globe Core */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial 
            color="#081226"
            emissive="#081226"
            wireframe={true}
            transparent
            opacity={0.5}
          />
        </mesh>
        
        {/* Outer Atmosphere / Threat Field */}
        <mesh>
          <sphereGeometry args={[2.1, 32, 32]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#ef4444"
            wireframe={true}
            transparent
            opacity={0.15}
          />
        </mesh>
        
        <Sparkles count={300} scale={6} size={2} speed={0.2} color="#ef4444" opacity={0.6} />
      </group>
    </>
  );
};
