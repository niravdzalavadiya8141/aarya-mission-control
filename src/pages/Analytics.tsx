import { useMemo } from 'react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  FunnelChart, Funnel, LabelList
} from 'recharts';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Activity, 
  Target, 
  Users,
  Briefcase,
  Zap
} from 'lucide-react';

import GlowCard from '../components/ui/GlowCard';
import { useTaskStore } from '../store/useTaskStore';
import { useAgentStore } from '../store/useAgentStore';
import { DIVISIONS } from '../data/agents';

// --- Simulated Data Generators ---

const generateTimeSeriesData = (days: number, min: number, max: number) => {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const CHART_THEME = {
  tooltip: {
    contentStyle: { 
      background: '#111827', 
      border: '1px solid rgba(0,255,255,0.2)', 
      borderRadius: '8px', 
      color: '#F8FAFC', 
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '10px'
    },
    itemStyle: { color: '#F8FAFC' },
    cursor: { stroke: 'rgba(0,255,255,0.2)', strokeWidth: 1 }
  },
  grid: { stroke: 'rgba(30,41,59,0.3)', strokeDasharray: '3 3' },
  axis: { stroke: '#475569', tick: { fill: '#94A3B8', fontSize: 10 } }
};

export default function Analytics() {
  const { tasks } = useTaskStore();
  const { agents } = useAgentStore();

  const taskCompletionData = useMemo(() => generateTimeSeriesData(30, 2, 8), []);
  const xpEarnedData = useMemo(() => generateTimeSeriesData(30, 50, 500), []);
  
  const tasksByAgent = useMemo(() => {
    return agents
      .filter(a => a.id !== 'aarya')
      .map(a => ({
        name: a.name,
        count: tasks.filter(t => t.agentId === a.id).length,
        color: a.color
      }))
      .sort((a, b) => b.count - a.count);
  }, [agents, tasks]);

  const tasksByDivision = useMemo(() => {
    return DIVISIONS.map(d => ({
      name: d.name,
      value: tasks.filter(t => t.division === d.id).length,
      color: d.color
    })).filter(d => d.value > 0);
  }, [tasks]);

  const priorityData = useMemo(() => [
    { name: 'Week 1', critical: 2, high: 5, normal: 8, low: 3 },
    { name: 'Week 2', critical: 1, high: 7, normal: 6, low: 4 },
    { name: 'Week 3', critical: 3, high: 4, normal: 10, low: 2 },
    { name: 'Week 4', critical: 2, high: 6, normal: 7, low: 5 },
  ], []);

  const pipelineData = useMemo(() => [
    { value: 100, name: 'Lead', fill: '#94A3B8' },
    { value: 80, name: 'Negotiating', fill: '#00FFFF' },
    { value: 60, name: 'Agreed', fill: '#3B82F6' },
    { value: 40, name: 'Delivered', fill: '#F97316' },
    { value: 20, name: 'Paid', fill: '#00FF88' },
  ], []);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-[#00FFFF]" size={28} />
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            ANALYTICS HUB
          </h1>
        </div>
        <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
          Mission Performance & Resource Metrics
        </p>
      </div>

      {/* Row 1: Main Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard 
          glowColor="#00FFFF"
          header={
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#00FFFF]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Tasks Completed — Last 30 Days
              </span>
            </div>
          }
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskCompletionData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FFFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid {...CHART_THEME.grid} />
                <XAxis dataKey="day" {...CHART_THEME.axis} />
                <YAxis {...CHART_THEME.axis} />
                <Tooltip {...CHART_THEME.tooltip} />
                <Area type="monotone" dataKey="value" stroke="#00FFFF" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard 
          glowColor="#FFD700"
          header={
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[#FFD700]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                XP Earned — Last 30 Days
              </span>
            </div>
          }
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpEarnedData}>
                <CartesianGrid {...CHART_THEME.grid} />
                <XAxis dataKey="day" {...CHART_THEME.axis} />
                <YAxis {...CHART_THEME.axis} />
                <Tooltip {...CHART_THEME.tooltip} />
                <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} dot={{ fill: '#FFD700', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      {/* Row 2: Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard 
          glowColor="#3B82F6"
          header={
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#3B82F6]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Tasks by Agent
              </span>
            </div>
          }
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasksByAgent} layout="vertical">
                <CartesianGrid {...CHART_THEME.grid} horizontal={false} />
                <XAxis type="number" {...CHART_THEME.axis} />
                <YAxis dataKey="name" type="category" width={80} {...CHART_THEME.axis} />
                <Tooltip {...CHART_THEME.tooltip} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {tasksByAgent.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard 
          glowColor="#8B5CF6"
          header={
            <div className="flex items-center gap-2">
              <PieIcon size={16} className="text-[#8B5CF6]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Tasks by Division
              </span>
            </div>
          }
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByDivision}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tasksByDivision.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...CHART_THEME.tooltip} />
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  formatter={(value) => <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      {/* Row 3: Advanced Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard 
          glowColor="#EF4444"
          header={
            <div className="flex items-center gap-2">
              <Target size={16} className="text-[#EF4444]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Priority Distribution
              </span>
            </div>
          }
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid {...CHART_THEME.grid} />
                <XAxis dataKey="name" {...CHART_THEME.axis} />
                <YAxis {...CHART_THEME.axis} />
                <Tooltip {...CHART_THEME.tooltip} />
                <Legend 
                  formatter={(value) => <span className="text-[9px] font-bold text-gray-500 uppercase">{value}</span>}
                />
                <Bar dataKey="critical" stackId="a" fill="#FF3366" />
                <Bar dataKey="high" stackId="a" fill="#FFD700" />
                <Bar dataKey="normal" stackId="a" fill="#00FF88" />
                <Bar dataKey="low" stackId="a" fill="#94A3B8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard 
          glowColor="#F97316"
          header={
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-[#F97316]" />
              <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Revenue Pipeline Funnel
              </span>
            </div>
          }
        >
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip {...CHART_THEME.tooltip} />
                <Funnel
                  dataKey="value"
                  data={pipelineData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#94A3B8" content={(props: any) => (
                    <text x={props.x + 10} y={props.y + props.height/2} fill="#94A3B8" fontSize={10} fontWeight="bold" dominantBaseline="middle">
                      {props.name}
                    </text>
                  )} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      {/* Row 4: Agent Heatmap (Custom) */}
      <GlowCard 
        glowColor="#00FF88"
        header={
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#00FF88]" />
            <span className="text-xs font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Agent Activity Heatmap
            </span>
          </div>
        }
      >
        <div className="overflow-x-auto pb-2 custom-scrollbar">
          <div className="min-w-[800px] space-y-2">
            <div className="flex items-center gap-2 pl-24">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="w-10 text-center text-[9px] font-bold text-gray-600 tracking-widest">{day}</div>
              ))}
            </div>
            {agents.filter(a => a.id !== 'aarya').map(agent => (
              <div key={agent.id} className="flex items-center gap-2">
                <div className="w-24 text-[10px] font-bold text-gray-400 uppercase truncate flex items-center gap-2">
                  <span>{agent.emoji}</span>
                  <span style={{ color: agent.color }}>{agent.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const activity = Math.random();
                    return (
                      <div 
                        key={i}
                        className="w-10 h-10 rounded-lg border border-white/5 transition-all hover:scale-110 cursor-help"
                        style={{ 
                          backgroundColor: agent.color,
                          opacity: activity < 0.2 ? 0.05 : activity < 0.5 ? 0.2 : activity < 0.8 ? 0.5 : 0.8
                        }}
                        title={`${agent.name} - ${Math.floor(activity * 10)} tasks`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
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
