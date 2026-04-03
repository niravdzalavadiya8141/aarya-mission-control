import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case '/': return 'COMMAND CENTER';
      case '/tasks': return 'TASK BOARD';
      case '/team': return 'TEAM ROSTER';
      case '/hq': return 'CYBERPUNK HQ';
      case '/deals': return 'BRAND DEALS';
      case '/analytics': return 'ANALYTICS';
      case '/xp': return 'XP & LEADERBOARD';
      case '/settings': return 'SETTINGS';
      default: return 'AARYA MISSION CONTROL';
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header 
      className="fixed top-0 right-0 h-16 z-40 flex items-center justify-between px-6 transition-all duration-300"
      style={{
        left: '240px',
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(30, 41, 59, 0.8)',
      }}
    >
      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-400 hover:text-[#00FFFF] transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 
          className="text-sm font-bold tracking-[0.2em] text-white"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Center: Live Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
        <div 
          className="text-lg font-bold tracking-widest text-[#00FFFF]"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
          }}
        >
          {format(time, 'HH:mm:ss')}
        </div>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-[#00FFFF] transition-all hover:scale-110 group relative">
            <Search size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
              Search (Cmd+K)
            </span>
          </button>
          <button className="p-2 text-gray-400 hover:text-[#00FFFF] transition-all hover:scale-110 relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A0A0F]"></span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,255,255,0.05)] border border-[rgba(0,255,255,0.1)]">
            <span className="text-[10px] font-bold text-[#00FFFF] tracking-widest">INAI WORLDS</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-green-400" />
            <span className="text-[10px] font-bold text-green-400 tracking-tighter hidden sm:block">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
