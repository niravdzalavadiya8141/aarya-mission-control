import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Activity, 
  Trophy,
  Shield,
  Code2,
  Terminal,
  Search,
  Palette,
  Briefcase,
  Lightbulb,
  Cpu,
  ExternalLink
} from 'lucide-react';
import AgentCard from '../components/ui/AgentCard';
import Modal from '../components/ui/Modal';
import { useAgentStore } from '../store/useAgentStore';
import { useTaskStore } from '../store/useTaskStore';
import { useXPStore } from '../store/useXPStore';
import { DIVISIONS } from '../data/agents';

// --- Sub-components ---

const DivisionIcon = ({ id, color, size = 16 }: { id: string; color: string; size?: number }) => {
  const icons: Record<string, any> = {
    command: Zap,
    dev: Code2,
    content: Palette,
    devops: Terminal,
    qa: Search,
    business: Briefcase,
    research: Activity,
    innovation: Lightbulb,
    security: Shield,
    community: Users,
  };
  const Icon = icons[id] || Cpu;
  return <Icon size={size} style={{ color }} />;
};

const AaryaHeroCard = ({ stats }: { stats: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative w-full p-8 rounded-2xl border border-[rgba(0,255,255,0.3)] bg-gradient-to-br from-[rgba(0,255,255,0.05)] to-transparent overflow-hidden mb-12"
    style={{
      boxShadow: '0 0 30px rgba(0,255,255,0.1), inset 0 0 20px rgba(0,255,255,0.05)',
    }}
  >
    {/* Animated Background Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-1 h-1 bg-[#00FFFF] rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}
    </div>

    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="space-y-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⚡</span>
            <h2 className="text-5xl font-black text-[#00FFFF] tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              AARYA
            </h2>
          </div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.4em] mt-1 ml-14 uppercase">
            Master Orchestrator
          </div>
        </div>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed font-medium">
          Coordinating 15 specialized agents across 9 tactical divisions. 
          Real-time mission oversight and global priority alignment.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-green-400 tracking-widest uppercase">
            Online — Commanding
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/5">
        {[
          { label: 'Active Missions', value: stats.activeMissions },
          { label: 'Team XP Today', value: stats.xpToday },
          { label: 'Completion Rate', value: `${stats.completionRate}%` },
          { label: 'Uptime', value: '99.9%' },
        ].map((stat, i) => (
          <div key={i} className="space-y-1 text-center md:text-left">
            <div className="text-xl font-black text-[#00FFFF]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {stat.value}
            </div>
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main Page ---

export default function Team() {
  const { agents } = useAgentStore();
  const navigate = useNavigate();
  const { tasks } = useTaskStore();
  const { getUnlockedAchievements } = useXPStore();
  
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const selectedAgent = useMemo(() => 
    agents.find(a => a.id === selectedAgentId), [agents, selectedAgentId]
  );

  const stats = useMemo(() => {
    const activeMissions = tasks.filter(t => t.status === 'in-progress').length;
    const xpToday = tasks
      .filter(t => t.status === 'completed' && t.completedAt && new Date(t.completedAt).toDateString() === new Date().toDateString())
      .reduce((sum, t) => sum + t.xpReward, 0);
    const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / (tasks.length || 1)) * 100);
    return { activeMissions, xpToday, completionRate };
  }, [tasks]);

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Users className="text-[#00FFFF]" size={28} />
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            TEAM ROSTER
          </h1>
        </div>
        <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
          9 Divisions | 15 Autonomous Agents
        </p>
      </div>

      {/* Hero Section */}
      <AaryaHeroCard stats={stats} />

      {/* SVG Connection Lines Placeholder - Would be placed here in a real implementation with coordinates */}
      
      {/* Divisions Section */}
      <div className="space-y-16">
        {DIVISIONS.map((div) => {
          const divAgents = agents.filter(a => a.division === div.id);
          if (divAgents.length === 0) return null;

          return (
            <motion.div 
              key={div.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <DivisionIcon id={div.id} color={div.color} size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {div.name}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                      {divAgents.length} Agents Assigned
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {divAgents.map(agent => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onClick={() => setSelectedAgentId(agent.id)}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Level Guide Section */}
      <div className="pt-12 border-t border-white/5">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="text-[#FFD700]" size={24} />
          <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Level Progression System
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: 'ROOKIE', range: '0-499', color: '#94A3B8', icon: '🔘', perks: ['Basic mission access', 'Single task slot', 'Standard XP rate'] },
            { name: 'AGENT', range: '500-1499', color: '#3B82F6', icon: '🔵', perks: ['Multi-tasking enabled', 'Access to Priority tasks', 'Achievement bonuses'] },
            { name: 'ELITE', range: '1500-2999', color: '#8B5CF6', icon: '🟣', perks: ['Team leadership role', 'Critical mission access', 'Custom agent emoji'] },
            { name: 'LEGEND', range: '3000-4999', color: '#FFD700', icon: '🟡', perks: ['Division lead status', 'Strategic oversight', 'Global XP multiplier'] },
            { name: 'MYTHIC', range: '5000+', color: '#00FFFF', icon: '⚡', perks: ['Orchestrator level', 'Full system access', 'Legendary status badge'] },
          ].map((lvl) => (
            <div 
              key={lvl.name}
              className="p-5 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:bg-white/[0.04] transition-all"
              style={{ borderTop: `4px solid ${lvl.color}` }}
            >
              <div className="text-3xl">{lvl.icon}</div>
              <div>
                <h4 className="font-black text-white tracking-widest text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>{lvl.name}</h4>
                <div className="text-[10px] font-bold text-gray-500 mt-1">{lvl.range} XP</div>
              </div>
              <div className="space-y-2 mt-2">
                {lvl.perks.map((perk, pi) => (
                  <div key={pi} className="flex items-start gap-2 text-[10px] text-gray-400 leading-tight">
                    <span className="text-[#00FFFF]/50 mt-0.5">✓</span>
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Detail Modal */}
      <Modal
        isOpen={!!selectedAgentId}
        onClose={() => setSelectedAgentId(null)}
        title={selectedAgent ? `${selectedAgent.emoji} ${selectedAgent.name} — PROFILE` : ''}
      >
        {selectedAgent && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Division', value: selectedAgent.division },
                { label: 'Role', value: selectedAgent.role },
                { label: 'Status', value: selectedAgent.status },
                { label: 'Current XP', value: selectedAgent.xp },
                { label: 'Level', value: selectedAgent.level },
                { label: 'Tasks Done', value: tasks.filter(t => t.agentId === selectedAgent.id && t.status === 'completed').length },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-xs font-bold text-white uppercase truncate">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-2">
                <Trophy size={14} className="text-[#FFD700]" /> Achievements Earned
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {getUnlockedAchievements(selectedAgent.id).map(ach => (
                  <div 
                    key={ach.id} 
                    className="aspect-square rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-2xl group relative cursor-help"
                  >
                    {ach.icon}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none border border-white/10">
                      {ach.name}
                    </div>
                  </div>
                ))}
                {getUnlockedAchievements(selectedAgent.id).length === 0 && (
                  <div className="col-span-full py-4 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                    No achievements unlocked yet
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-2">
                <Activity size={14} className="text-[#00FFFF]" /> Mission History
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {tasks.filter(t => t.agentId === selectedAgent.id).slice(0, 10).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white line-clamp-1">{task.title}</span>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">{task.status}</span>
                    </div>
                    <span className="text-[10px] font-black text-yellow-400">⚡ +{task.xpReward}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedAgentId(null);
                navigate('/tasks');
              }}
              className="w-full bg-[#00FFFF] text-black font-black rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#00CCCC] transition-all text-xs tracking-widest uppercase"
            >
              ASSIGN NEW MISSION <ExternalLink size={14} />
            </button>
          </div>
        )}
      </Modal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
