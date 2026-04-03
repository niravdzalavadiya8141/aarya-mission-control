import { useMemo } from 'react';
import { useAgentStore } from '../../store/useAgentStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function MiniLeaderboard() {
  const { agents } = useAgentStore();
  const navigate = useNavigate();

  const topAgents = useMemo(() => {
    return [...agents]
      .filter(a => a.id !== 'aarya')
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5);
  }, [agents]);

  return (
    <div className="space-y-4">
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
      <button 
        onClick={() => navigate('/xp')}
        className="w-full pt-4 border-t border-white/5 text-[10px] font-black text-[#00FFFF] hover:underline flex items-center justify-center gap-1 uppercase tracking-[0.2em]"
      >
        FULL LEADERBOARD <ChevronRight size={10} />
      </button>
    </div>
  );
}
