import { motion } from 'framer-motion';
import type { Agent } from '../../data/agents';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-[rgba(17,24,39,0.8)] backdrop-blur-md border border-[rgba(0,255,255,0.1)] rounded-xl p-4 cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        boxShadow: `0 4px 24px -12px ${agent.color}33`,
        borderLeft: `4px solid ${agent.color}`
      }}
    >
      {/* Glow Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300"
        style={{ backgroundColor: agent.color }}
      ></div>

      <div className="relative z-10 space-y-4">
        {/* Header: Emoji & Name */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
              style={{ borderColor: `${agent.color}33` }}
            >
              {agent.emoji}
            </div>
            <div>
              <h3 
                className="text-sm font-bold text-white group-hover:text-[#00FFFF] transition-colors uppercase tracking-wider"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {agent.name}
              </h3>
              <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-0.5">
                {agent.division}
              </div>
            </div>
          </div>
          <span 
            className="text-[9px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-tighter"
            style={{ 
              borderColor: `${agent.color}44`,
              color: agent.color,
              backgroundColor: `${agent.color}11`
            }}
          >
            {agent.level}
          </span>
        </div>

        {/* Status & Task */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${
              agent.status === 'working' ? 'bg-green-500 animate-pulse' : 
              agent.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-[10px] text-gray-400 font-medium leading-tight line-clamp-1">
              {agent.currentTask}
            </span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[9px] font-bold tracking-wider">
            <span className="text-gray-500 uppercase">XP Level</span>
            <span style={{ color: agent.color }}>{agent.xp} XP</span>
          </div>
          <div className="h-1.5 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(agent.xp / 9999) * 100}%` }}
              className="h-full rounded-full"
              style={{ 
                backgroundColor: agent.color,
                boxShadow: `0 0 10px ${agent.color}66`
              }}
            />
          </div>
        </div>
      </div>

      {/* Hover Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: agent.color }}
      />
    </motion.div>
  );
}
