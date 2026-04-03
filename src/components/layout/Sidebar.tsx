import { NavLink, useLocation } from 'react-router-dom';
import {
  Zap,
  ClipboardList,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  Trophy,
  Settings,
} from 'lucide-react';
import { useAgentStore } from '../../store/useAgentStore';

const navItems = [
  { path: '/', icon: Zap, label: 'Command Center' },
  { path: '/tasks', icon: ClipboardList, label: 'Task Board' },
  { path: '/team', icon: Users, label: 'Team' },
  { path: '/hq', icon: Building2, label: 'Cyberpunk HQ' },
  { path: '/deals', icon: Briefcase, label: 'Brand Deals' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/xp', icon: Trophy, label: 'XP & Leaderboard' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const workingAgentsCount = useAgentStore((state) => 
    state.agents.filter((agent) => agent.status === 'working').length
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] z-50 flex flex-col"
      style={{
        background: 'rgba(13, 17, 23, 0.95)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(0, 255, 255, 0.1)',
      }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-[rgba(0,255,255,0.1)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">⚡</span>
          <span
            className="text-2xl font-bold tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#00FFFF',
              textShadow: '0 0 20px rgba(0,255,255,0.4)',
            }}
          >
            AARYA
          </span>
        </div>
        <p className="text-xs text-gray-500 tracking-widest uppercase">Mission Control</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mb-1 rounded-lg
                transition-all duration-200 group
                ${isActive
                  ? 'bg-[rgba(0,255,255,0.08)] border-l-2 border-[#00FFFF]'
                  : 'hover:bg-[rgba(255,255,255,0.05)] border-l-2 border-transparent'
                }
              `}
              style={{
                boxShadow: isActive ? '0 0 20px rgba(0,255,255,0.1)' : 'none',
              }}
            >
              <Icon
                size={20}
                className={`transition-colors ${
                  isActive ? 'text-[#00FFFF]' : 'text-gray-400 group-hover:text-gray-200'
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-[#00FFFF]' : 'text-gray-400 group-hover:text-gray-200'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Status */}
      <div className="p-4 border-t border-[rgba(0,255,255,0.1)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span
            className="text-sm font-medium"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00FFFF' }}
          >
            AARYA — ONLINE
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {workingAgentsCount}/15 Agents Active
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>v1.0</span>
        </div>
      </div>
    </aside>
  );
}
