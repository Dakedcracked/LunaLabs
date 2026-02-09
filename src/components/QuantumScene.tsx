
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

// Add global JSX augmentation to register Three.js intrinsic elements for React Three Fiber.
// Augmenting both JSX and React.JSX namespaces to ensure compatibility with various TypeScript/React configurations.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

const TechNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.8}
        roughness={0.1}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const DataRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Torus ref={ref} args={[3.2, 0.05, 16, 100]} rotation={[Math.PI / 2.2, 0, 0]}>
      {/* meshStandardMaterial is an intrinsic Three.js element in R3F */}
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.6} transparent opacity={0.4} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        {/* ambientLight and pointLight are intrinsic Three.js elements in R3F */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <TechNode position={[0, 0, 0]} color="#C5A059" scale={1.1} />
          <DataRing />
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
           <TechNode position={[-4, 1.5, -3]} color="#333" scale={0.6} />
           <TechNode position={[4, -1.5, -4]} color="#A8A29E" scale={0.7} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const TechArchitectureScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* ambientLight and spotLight are intrinsic Three.js elements in R3F */}
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={3} color="#C5A059" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.5} floatIntensity={0.4} speed={1.2}>
          {/* group is an intrinsic Three.js element in R3F */}
          <group position={[0, -0.5, 0]}>
            {/* Architectural Block Representation */}
            <Box args={[1.5, 0.2, 1.5]} position={[0, 1.2, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.1} />
            </Box>
            
            <Box args={[1.2, 0.2, 1.2]} position={[0, 0.4, 0]}>
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </Box>
            
            <Box args={[0.8, 0.2, 0.8]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color="#A8A29E" metalness={0.9} roughness={0.1} />
            </Box>

            {/* Connecting Verticals */}
            <Cylinder args={[0.02, 0.02, 2.5]} position={[0.6, 0.4, 0.6]}>
               <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} opacity={0.5} transparent />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 2.5]} position={[-0.6, 0.4, -0.6]}>
               <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} opacity={0.5} transparent />
            </Cylinder>
             <Cylinder args={[0.02, 0.02, 2.5]} position={[0.6, 0.4, -0.6]}>
               <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} opacity={0.5} transparent />
            </Cylinder>
             <Cylinder args={[0.02, 0.02, 2.5]} position={[-0.6, 0.4, 0.6]}>
               <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} opacity={0.5} transparent />
            </Cylinder>

            {/* Core processor */}
            <Sphere args={[0.25, 32, 32]} position={[0, 0.4, 0]}>
               <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} />
            </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
