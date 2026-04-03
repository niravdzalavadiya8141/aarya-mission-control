import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  TrendingUp, 
  Award, 
  Clock, 
  Flame,
  Crown,
  Users,
  CheckCircle2
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

import GlowCard from '../components/ui/GlowCard';
import { useAgentStore } from '../store/useAgentStore';
import { useXPStore } from '../store/useXPStore';
import { useTaskStore } from '../store/useTaskStore';
import type { Agent } from '../data/agents';
import { LEVEL_SYSTEM } from '../data/agents';
import type { Achievement } from '../data/achievements';

// --- Sub-components ---

const LeaderboardRow = ({ agent, rank, tasksCount }: { agent: Agent; rank: number; tasksCount: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`flex items-center gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all group
        ${rank === 1 ? 'bg-yellow-500/[0.03] border-l-4 border-l-yellow-500' : 
          rank === 2 ? 'bg-slate-300/[0.03] border-l-4 border-l-slate-400' : 
          rank === 3 ? 'bg-amber-600/[0.03] border-l-4 border-l-amber-700' : ''}
      `}
    >
      <div className="w-12 flex items-center justify-center shrink-0">
        {rank === 1 ? <Crown className="text-yellow-500" size={20} /> :
         rank === 2 ? <div className="text-slate-400 font-black text-lg">2</div> :
         rank === 3 ? <div className="text-amber-700 font-black text-lg">3</div> :
         <div className="text-gray-600 font-bold text-sm">{rank}</div>}
      </div>

      <div className="flex-1 flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xl shrink-0">
          {agent.emoji}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white group-hover:text-[#00FFFF] transition-colors uppercase tracking-wider truncate" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {agent.name}
          </h4>
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{agent.role}</div>
        </div>
      </div>

      <div className="w-32 hidden md:block">
        <span 
          className="text-[9px] px-2 py-0.5 rounded-full border font-black uppercase tracking-tighter"
          style={{ borderColor: `${agent.color}44`, color: agent.color, backgroundColor: `${agent.color}11` }}
        >
          {agent.level}
        </span>
      </div>

      <div className="w-48 hidden lg:block">
        <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase mb-1">
          <span>Progress</span>
          <span style={{ color: agent.color }}>{agent.xp} XP</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${(agent.xp / 9999) * 100}%`, backgroundColor: agent.color, boxShadow: `0 0 10px ${agent.color}44` }}
          />
        </div>
      </div>

      <div className="w-20 text-center hidden sm:block">
        <div className="text-sm font-black text-white">{tasksCount}</div>
        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-tighter">Missions</div>
      </div>

      <div className="w-20 text-center hidden xl:block">
        <div className="flex items-center justify-center gap-1 text-orange-500">
          <Flame size={12} fill="currentColor" />
          <span className="text-sm font-black">5</span>
        </div>
        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-tighter">Streak</div>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, isUnlocked, unlockedByCount }: { achievement: Achievement; isUnlocked: boolean; unlockedByCount: number }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
      ${isUnlocked 
        ? 'bg-white/[0.03] border-white/10 hover:border-[#00FFFF]/30' 
        : 'bg-black/40 border-white/5 grayscale opacity-60'}
    `}
  >
    {isUnlocked && (
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00FFFF]/10 to-transparent pointer-events-none" />
    )}
    
    <div className="flex gap-4 relative z-10">
      <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
        {isUnlocked ? achievement.icon : '❓'}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1 truncate">
          {isUnlocked ? achievement.name : 'Unknown Achievement'}
        </h4>
        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 mb-2 font-medium">
          {achievement.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-black tracking-widest ${isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`}>
            ⚡ +{achievement.xpReward} XP
          </span>
          {isUnlocked && (
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-tighter flex items-center gap-1">
              <Users size={8} /> {unlockedByCount} Agents
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main Page ---

export default function XP() {
  const { agents } = useAgentStore();
  const { achievements, xpLog } = useXPStore();
  const { tasks } = useTaskStore();
  
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const sortedAgents = useMemo(() => {
    return [...agents]
      .filter(a => a.id !== 'aarya')
      .sort((a, b) => b.xp - a.xp);
  }, [agents]);

  const agentTaskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach(t => {
      if (t.status === 'completed') {
        counts[t.agentId] = (counts[t.agentId] || 0) + 1;
      }
    });
    return counts;
  }, [tasks]);

  const filteredAchievements = useMemo(() => {
    return achievements.filter(ach => {
      const isUnlocked = (ach.unlockedBy?.length || 0) > 0;
      if (filter === 'unlocked') return isUnlocked;
      if (filter === 'locked') return !isUnlocked;
      return true;
    });
  }, [achievements, filter]);

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Trophy className="text-[#FFD700]" size={28} />
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            XP & GAMIFICATION
          </h1>
        </div>
        <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
          Leaderboards, Achievements & Global Rankings
        </p>
      </div>

      {/* SECTION 1: LEADERBOARD */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Crown className="text-yellow-500" size={20} />
          <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Agent Leaderboard
          </h2>
        </div>
        <div className="bg-[#111827]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center gap-4 px-6 py-4 bg-black/40 border-b border-white/5">
            <div className="w-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Rank</div>
            <div className="flex-1 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Agent</div>
            <div className="w-32 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden md:block">Level</div>
            <div className="w-48 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden lg:block">XP Progress</div>
            <div className="w-20 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden sm:block text-center">Tasks</div>
            <div className="w-20 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] hidden xl:block text-center">Streak</div>
          </div>
          <div className="divide-y divide-white/5">
            {sortedAgents.map((agent, index) => (
              <LeaderboardRow 
                key={agent.id} 
                agent={agent} 
                rank={index + 1} 
                tasksCount={agentTaskCounts[agent.id] || 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: LEVEL SYSTEM */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-[#00FFFF]" size={20} />
          <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Level Progression
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEVEL_SYSTEM.map((lvl) => (
            <div 
              key={lvl.name}
              className="p-6 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:bg-white/[0.04] transition-all relative overflow-hidden"
              style={{ borderTop: `4px solid ${lvl.color}` }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">{lvl.icon}</div>
              <div>
                <h4 className="font-black text-white tracking-widest text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>{lvl.name}</h4>
                <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">{lvl.minXP} – {lvl.maxXP === 99999 ? '∞' : lvl.maxXP} XP</div>
              </div>
              <div className="h-px bg-white/5 w-full my-2" />
              <div className="space-y-2 mt-2">
                {lvl.perks.map((perk, pi) => (
                  <div key={pi} className="flex items-start gap-2 text-[10px] text-gray-400 leading-tight">
                    <CheckCircle2 size={10} className="text-[#00FFFF]/50 mt-0.5 shrink-0" />
                    {perk}
                  </div>
                ))}
              </div>
              {lvl.name === 'MYTHIC' && (
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#00FFFF]/10 blur-2xl rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: ACHIEVEMENTS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="text-[#FFD700]" size={20} />
            <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Global Achievements
            </h2>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500">
              {achievements.filter(a => (a.unlockedBy?.length || 0) > 0).length}/{achievements.length} Unlocked
            </span>
          </div>
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
            {(['all', 'unlocked', 'locked'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all
                  ${filter === f ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAchievements.map(ach => (
            <AchievementCard 
              key={ach.id} 
              achievement={ach} 
              isUnlocked={(ach.unlockedBy?.length || 0) > 0} 
              unlockedByCount={ach.unlockedBy?.length || 0}
            />
          ))}
        </div>
      </div>

      {/* SECTION 4: XP ACTIVITY LOG */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="text-[#8B5CF6]" size={20} />
          <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            XP Activity Log
          </h2>
        </div>
        <GlowCard glowColor="#8B5CF6" className="!p-0 overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {xpLog.length > 0 ? (
              xpLog.map((log) => {
                const agent = agents.find(a => a.id === log.agentId);
                return (
                  <div key={log.id} className="flex items-center gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-all">
                    <span className="text-[10px] font-mono text-gray-600 w-24 shrink-0">
                      {format(new Date(log.timestamp), 'HH:mm:ss')}
                    </span>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-lg">{agent?.emoji}</span>
                      <span className="text-[11px] font-black uppercase tracking-widest truncate" style={{ color: agent?.color }}>
                        {log.agentName}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">earned</span>
                      <span className="text-[11px] font-black text-yellow-400 shrink-0">+{log.xpAmount} XP</span>
                      <span className="text-[11px] text-gray-500 font-medium truncate">for "{log.reason}"</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-700 hidden sm:block">
                      {formatDistanceToNow(new Date(log.timestamp))} ago
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="text-4xl opacity-20">📊</div>
                <div className="text-xs font-black text-gray-600 uppercase tracking-widest">No XP activity recorded yet</div>
              </div>
            )}
          </div>
        </GlowCard>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
