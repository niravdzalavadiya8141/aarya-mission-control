import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Text,
  Stars,
  ContactShadows
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Room from './Room';
import Furniture from './Furniture';

const AaryaHologram = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.position.y = Math.sin(time) * 0.2;
    ringRef.current.rotation.z = time * 0.2;
    ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Central Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial 
          color="#00FFFF" 
          speed={2} 
          distort={0.4} 
          emissive="#00FFFF" 
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Rotating Rings */}
      <group ref={ringRef}>
        {[1.2, 1.5, 1.8].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={5} />
          </mesh>
        ))}
      </group>

      {/* Floating Text */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="#00FFFF"
          font="https://fonts.gstatic.com/s/orbitron/v25/yYqxRneDgc0bc0PVi_m120M5.woff"
          anchorX="center"
          anchorY="middle"
        >
          AARYA MASTER CORE
        </Text>
      </Float>

      {/* Data Streams (Vertical Lines) */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i) * 3, 0, Math.sin(i) * 3]}>
          <cylinderGeometry args={[0.01, 0.01, 10, 8]} />
          <meshStandardMaterial color="#00FFFF" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
};

export default function HQScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      
      <AaryaHologram />
      <Room />
      <Furniture />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
      
      <EffectComposer>
        <Bloom 
          luminanceThreshold={1} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}
