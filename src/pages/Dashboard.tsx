import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Users, 
  Star, 
  TrendingUp, 
  Activity, 
  Send, 
  ChevronRight,
  Trophy
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer
} from 'recharts';
import { formatDistanceToNow, isToday } from 'date-fns';
import { NavLink, useNavigate } from 'react-router-dom';

import GlowCard from '../components/ui/GlowCard';
import BottomTicker from '../components/shared/BottomTicker';
import { useTaskStore } from '../store/useTaskStore';
import { useAgentStore } from '../store/useAgentStore';
import { useXPStore } from '../store/useXPStore';
import { AGENTS } from '../data/agents';

// --- Sub-components ---

const StatCard = ({ title, value, icon: Icon, color, chartData }: any) => (
  <GlowCard glowColor={color} className="flex flex-col h-full">
    <div className="flex items-start justify-between mb-2">
      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
        <Icon size={20} style={{ color, filter: `drop-shadow(0 0 8px ${color})` }} />
      </div>
      <div className="h-10 w-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="mt-auto">
      <div className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
        {title}
      </div>
    </div>
  </GlowCard>
);

const TaskRow = ({ task }: any) => {
  const agent = AGENTS.find(a => a.id === task.agentId);
  const doneSubtasks = task.subtasks.filter((s: any) => s.completed).length;
  const progress = (doneSubtasks / task.subtasks.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-3 mb-2 hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-default overflow-hidden"
      style={{ borderLeft: `4px solid ${agent?.color || '#00FFFF'}` }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-white group-hover:text-[#00FFFF] transition-colors line-clamp-1">
          {task.title}
        </h4>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter
          ${task.priority === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
            task.priority === 'high' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
            'bg-blue-500/20 text-blue-400 border border-blue-500/30'}
        `}>
          {task.priority}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold" style={{ color: agent?.color }}>
          {agent?.emoji} {agent?.name}
        </span>
        <span className="text-[10px] text-gray-500">•</span>
        <span className="text-[10px] text-gray-500">
          {formatDistanceToNow(new Date(task.createdAt))} ago
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full"
            style={{ backgroundColor: agent?.color || '#00FFFF', boxShadow: `0 0 8px ${agent?.color}66` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function Dashboard() {
  const navigate = useNavigate();
  const tasks = useTaskStore(state => state.tasks);
  const agents = useAgentStore(state => state.agents);
  const activityFeed = useXPStore(state => state.activityFeed);
  const addTask = useTaskStore(state => state.addTask);
  const addActivity = useXPStore(state => state.addActivity);
  
  const [command, setCommand] = useState('');

  const stats = useMemo(() => {
    const activeMissions = tasks.filter(t => t.status === 'in-progress').length;
    const agentsOnline = agents.filter(a => a.status === 'working').length;
    const xpToday = tasks
      .filter(t => t.status === 'completed' && t.completedAt && isToday(new Date(t.completedAt)))
      .reduce((sum, t) => sum + t.xpReward, 0);
    const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / (tasks.length || 1)) * 100);

    return { 
      activeMissions, 
      agentsOnline, 
      xpToday, 
      completionRate,
      charts: {
        active: [3, 5, 4, 7, 6, 8, activeMissions].map((v) => ({ val: v })),
        online: [10, 12, 11, 14, 13, 15, agentsOnline].map((v) => ({ val: v })),
        xp: [400, 600, 450, 800, 700, 900, xpToday].map((v) => ({ val: v })),
        rate: [60, 65, 62, 70, 68, 75, completionRate].map((v) => ({ val: v }))
      }
    };
  }, [tasks, agents]);

  const topAgents = useMemo(() => {
    return [...agents]
      .filter(a => a.id !== 'aarya')
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5);
  }, [agents]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // Simulate AARYA command processing
    const randomAgent = agents[Math.floor(Math.random() * (agents.length - 1)) + 1];
    
    addTask({
      title: command,
      description: `Command assigned by AARYA: ${command}`,
      agentId: randomAgent.id,
      status: 'assigned',
      priority: 'normal',
      xpReward: 100,
      division: randomAgent.division,
      tags: ['command'],
      subtasks: [{ id: '1', title: 'Initialize command', completed: false }],
      estimatedHours: 2,
    });

    addActivity({
      agentId: 'aarya',
      agentName: 'AARYA',
      agentEmoji: '⚡',
      agentColor: '#00FFFF',
      action: `assigned mission to ${randomAgent.name}: "${command}"`,
    });

    setCommand('');
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Missions" 
          value={stats.activeMissions} 
          icon={Zap} 
          color="#00FFFF"
          chartData={stats.charts.active}
        />
        <StatCard 
          title="Agents Online" 
          value={stats.agentsOnline} 
          icon={Users} 
          color="#00FF88"
          chartData={stats.charts.online}
        />
        <StatCard 
          title="XP Earned Today" 
          value={stats.xpToday} 
          icon={Star} 
          color="#FFD700"
          chartData={stats.charts.xp}
        />
        <StatCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          icon={TrendingUp} 
          color="#FF00FF"
          chartData={stats.charts.rate}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Missions & Activity */}
        <div className="lg:col-span-3 space-y-6">
          <GlowCard 
            header={
              <>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#00FFFF]" />
                  <span className="text-sm font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    ACTIVE MISSIONS
                  </span>
                </div>
                <NavLink to="/tasks" className="text-[10px] font-bold text-[#00FFFF] hover:underline flex items-center gap-1">
                  VIEW ALL <ChevronRight size={10} />
                </NavLink>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.filter(t => t.status === 'in-progress').slice(0, 8).map(task => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          </GlowCard>

          <GlowCard 
            header={
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#00FF88]" />
                <span className="text-sm font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  LIVE ACTIVITY FEED
                </span>
              </div>
            }
          >
            <div className="max-h-[320px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
              <AnimatePresence initial={false}>
                {activityFeed.slice(0, 15).map((activity) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 py-2 border-l-2 pl-3 group"
                    style={{ borderLeftColor: activity.agentColor }}
                  >
                    <span className="text-[10px] text-gray-500 font-mono w-16 shrink-0 mt-0.5">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-black mr-2 uppercase tracking-tighter" style={{ color: activity.agentColor }}>
                        {activity.agentEmoji} {activity.agentName}:
                      </span>
                      <span className="text-[11px] text-gray-300">
                        {activity.action}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlowCard>
        </div>

        {/* Right Column: Status, Command, Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          <GlowCard 
            header={
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TEAM STATUS
                </span>
              </div>
            }
          >
            <div className="grid grid-cols-3 gap-2">
              {agents.map(agent => (
                <div 
                  key={agent.id}
                  onClick={() => navigate('/team')}
                  className="p-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{agent.emoji}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === 'working' ? 'bg-green-500 animate-pulse' : 
                      agent.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase truncate mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {agent.name}
                  </div>
                  <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(agent.xp / 9999) * 100}%`,
                        backgroundColor: agent.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard 
            header={
              <div className="flex items-center gap-2">
                <Send size={16} className="text-[#00FFFF]" />
                <span className="text-sm font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  QUICK COMMAND
                </span>
              </div>
            }
          >
            <form onSubmit={handleCommandSubmit} className="space-y-3">
              <input 
                id="quick-command-input"
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Give AARYA a command..."
                className="w-full bg-[#0D1117] border border-slate-700 focus:border-[#00FFFF] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] rounded-lg p-3 text-sm font-mono text-white outline-none transition-all placeholder:text-gray-600"
              />
              <button 
                type="submit"
                className="w-full bg-[#00FFFF] text-black font-black rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-[#00CCCC] active:scale-95 transition-all text-xs tracking-widest uppercase"
              >
                EXECUTE MISSION
              </button>
            </form>
          </GlowCard>

          <GlowCard 
            header={
              <>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-[#FFD700]" />
                  <span className="text-sm font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    TOP AGENTS
                  </span>
                </div>
                <NavLink to="/xp" className="text-[10px] font-bold text-[#FFD700] hover:underline flex items-center gap-1">
                  FULL BOARD <ChevronRight size={10} />
                </NavLink>
              </>
            }
          >
            <div className="space-y-3">
              {topAgents.map((agent, i) => (
                <div key={agent.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black w-4 ${i === 0 ? 'text-[#FFD700]' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                      {i + 1}
                    </span>
                    <span className="text-lg">{agent.emoji}</span>
                    <div>
                      <div className="text-[11px] font-bold text-white tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {agent.name}
                      </div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                        {agent.level}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-gray-400">
                    {agent.xp} <span className="text-[9px] text-gray-600">XP</span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Bottom Ticker Section */}
      <div className="mt-4">
        <BottomTicker />
      </div>

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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
