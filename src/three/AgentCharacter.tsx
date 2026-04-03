import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Agent } from '../data/agents';

interface AgentCharacterProps {
  agent: Agent;
  position: [number, number, number];
}

export default function AgentCharacter({ agent, position }: AgentCharacterProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial 
            color={agent.color} 
            emissive={agent.color} 
            emissiveIntensity={2} 
            wireframe
          />
        </mesh>
        
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.15}
          color={agent.color}
          font="https://fonts.gstatic.com/s/orbitron/v25/yYqxRneDgc0bc0PVi_m120M5.woff"
          anchorX="center"
          anchorY="middle"
        >
          {agent.name}
        </Text>
        
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {agent.emoji}
        </Text>
      </Float>
    </group>
  );
}
