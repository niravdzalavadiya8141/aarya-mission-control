import { getLevelInfo } from '../../data/agents';

interface LevelBadgeProps {
  xp: number;
  className?: string;
}

export default function LevelBadge({ xp, className = '' }: LevelBadgeProps) {
  const level = getLevelInfo(xp);
  
  return (
    <span 
      className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter ${className}`}
      style={{ 
        borderColor: `${level.color}44`,
        color: level.color,
        backgroundColor: `${level.color}11`
      }}
    >
      {level.name}
    </span>
  );
}
