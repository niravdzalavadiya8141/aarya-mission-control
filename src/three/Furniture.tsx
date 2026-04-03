export default function Furniture() {
  const consoles = [
    { pos: [4, 0, 4], color: "#00FFFF" },
    { pos: [-4, 0, 4], color: "#8B5CF6" },
    { pos: [4, 0, -4], color: "#00FF88" },
    { pos: [-4, 0, -4], color: "#EF4444" },
  ];

  return (
    <group>
      {consoles.map((item, i) => (
        <group key={i} position={item.pos as any}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[2, 0.5, 1]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.8, 0.8]} />
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.color} 
              emissiveIntensity={2} 
              transparent 
              opacity={0.5} 
            />
          </mesh>
          <pointLight position={[0, 1, 0]} color={item.color} intensity={1} distance={5} />
        </group>
      ))}
    </group>
  );
}
