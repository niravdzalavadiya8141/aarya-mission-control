import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
} from '@react-three/drei';
import HQScene from '../three/HQScene';
import AgentCharacter from '../three/AgentCharacter';
import { useAgentStore } from '../store/useAgentStore';

export default function HQ() {
  const { agents } = useAgentStore();

  const agentPositions = useMemo(() => {
    return agents.filter(a => a.id !== 'aarya').map((agent, i) => {
      const angle = (i / (agents.length - 1)) * Math.PI * 2;
      const radius = 12;
      return {
        agent,
        position: [
          Math.cos(angle) * radius,
          0.5,
          Math.sin(angle) * radius
        ] as [number, number, number]
      };
    });
  }, [agents]);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-[#050505] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#00FFFF] tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CYBERPUNK HQ — NEURAL LINK
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Connection Stable</span>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-2 pointer-events-auto">
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Environment Status</div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xs font-bold text-[#00FFFF]">22°C</div>
                <div className="text-[8px] text-gray-600 uppercase">Temp</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-[#00FFFF]">45%</div>
                <div className="text-[8px] text-gray-600 uppercase">O2</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-green-400">NOMINAL</div>
                <div className="text-[8px] text-gray-600 uppercase">System</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex gap-4 pointer-events-auto">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-[#00FFFF] hover:bg-white/10 transition-all uppercase tracking-widest">
              Reset Camera
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest">
              Enter VR
            </button>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Navigation</div>
            <div className="text-[9px] text-gray-600 uppercase font-medium">Left Click: Rotate | Right Click: Pan | Scroll: Zoom</div>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            minDistance={5} 
            maxDistance={40} 
            maxPolarAngle={Math.PI / 2.1} 
          />
          
          <HQScene />
          
          {agentPositions.map(({ agent, position }) => (
            <AgentCharacter key={agent.id} agent={agent} position={position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
