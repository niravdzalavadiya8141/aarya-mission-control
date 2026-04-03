export default function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>

      {/* Grid on Floor */}
      <gridHelper args={[50, 50, "#00FFFF", "#111111"]} position={[0, -0.49, 0]}>
        <meshBasicMaterial opacity={0.2} transparent />
      </gridHelper>

      {/* Walls Neon Strips */}
      <mesh position={[0, 5, -15]}>
        <boxGeometry args={[30, 0.1, 0.1]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={10} />
      </mesh>
    </group>
  );
}
