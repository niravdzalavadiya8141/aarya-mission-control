export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  division: string;
  color: string;
  level: string;
  xp: number;
  startXP: number;
  status: 'working' | 'idle' | 'break' | 'offline';
  currentTask: string;
}

export interface LevelSystem {
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
  perks: string[];
}

export const AGENTS: Agent[] = [
  { id: 'aarya',    name: 'AARYA',    emoji: '⚡', role: 'Master Orchestrator',    division: 'command',      color: '#00FFFF', level: 'MYTHIC',  xp: 9999,  startXP: 9999, status: 'working', currentTask: 'Orchestrating all missions' },
  { id: 'jarvis',   name: 'JARVIS',   emoji: '🤖', role: 'Lead Developer',         division: 'dev',          color: '#3B82F6', level: 'ELITE',   xp: 2400,  startXP: 2400, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'friday',   name: 'FRIDAY',   emoji: '🎨', role: 'Frontend Developer',     division: 'dev',          color: '#EC4899', level: 'AGENT',   xp: 1200,  startXP: 1200, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'ultron',   name: 'ULTRON',   emoji: '🔧', role: 'Backend/Infrastructure', division: 'dev',          color: '#8B5CF6', level: 'ELITE',   xp: 2200,  startXP: 2200, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'vision',   name: 'VISION',   emoji: '✍️', role: 'Content Strategist',     division: 'content',      color: '#10B981', level: 'AGENT',   xp: 1000,  startXP: 1000, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'wanda',    name: 'WANDA',    emoji: '🔮', role: 'Social Media Manager',   division: 'content',      color: '#F43F5E', level: 'AGENT',   xp: 1100,  startXP: 1100, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'bucky',    name: 'BUCKY',    emoji: '🦾', role: 'DevOps & Git',           division: 'devops',       color: '#6366F1', level: 'ELITE',   xp: 2000,  startXP: 2000, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'hawkeye',  name: 'HAWKEYE',  emoji: '🎯', role: 'QA Engineer',            division: 'qa',           color: '#EF4444', level: 'AGENT',   xp: 1300,  startXP: 1300, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'natasha',  name: 'NATASHA',  emoji: '💼', role: 'Brand Partnerships',     division: 'business',     color: '#F97316', level: 'AGENT',   xp: 1500,  startXP: 1500, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'thor',     name: 'THOR',     emoji: '⚡', role: 'Research Analyst',       division: 'research',     color: '#F59E0B', level: 'AGENT',   xp: 900,   startXP: 900,  status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'hulk',     name: 'HULK',     emoji: '💪', role: 'Data Processing',        division: 'research',     color: '#22C55E', level: 'AGENT',   xp: 800,   startXP: 800,  status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'rocket',   name: 'ROCKET',   emoji: '🚀', role: 'Performance Optimizer',  division: 'dev',          color: '#A855F7', level: 'AGENT',   xp: 700,   startXP: 700,  status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'shuri',    name: 'SHURI',    emoji: '🧪', role: 'Innovation & R&D',       division: 'innovation',   color: '#14B8A6', level: 'AGENT',   xp: 600,   startXP: 600,  status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'heimdall', name: 'HEIMDALL', emoji: '🛡️', role: 'Security & Monitoring',  division: 'security',     color: '#D97706', level: 'AGENT',   xp: 1000,  startXP: 1000, status: 'idle',    currentTask: 'Waiting for next mission' },
  { id: 'groot',    name: 'GROOT',    emoji: '🌱', role: 'Community & Support',    division: 'community',    color: '#84CC16', level: 'ROOKIE',  xp: 300,   startXP: 300,  status: 'idle',    currentTask: 'Waiting for next mission' },
];

export const LEVEL_SYSTEM: LevelSystem[] = [
  { name: 'ROOKIE', minXP: 0,    maxXP: 499,  color: '#94A3B8', icon: '🔘', perks: ['Basic mission access', 'Single task slot', 'Standard XP rate'] },
  { name: 'AGENT',  minXP: 500,  maxXP: 1499, color: '#3B82F6', icon: '🔵', perks: ['Multi-tasking enabled', 'Access to Priority tasks', 'Achievement bonuses'] },
  { name: 'ELITE',  minXP: 1500, maxXP: 2999, color: '#8B5CF6', icon: '🟣', perks: ['Team leadership role', 'Critical mission access', 'Custom agent emoji'] },
  { name: 'LEGEND', minXP: 3000, maxXP: 4999, color: '#FFD700', icon: '🟡', perks: ['Division lead status', 'Strategic oversight', 'Global XP multiplier'] },
  { name: 'MYTHIC', minXP: 5000, maxXP: 99999,color: '#00FFFF', icon: '⚡', perks: ['Orchestrator level', 'Full system access', 'Legendary status badge'] },
];

export const DIVISIONS = [
  { id: 'command',    name: 'Command Division',    color: '#00FFFF' },
  { id: 'dev',        name: 'Development',         color: '#3B82F6' },
  { id: 'content',    name: 'Content Division',    color: '#10B981' },
  { id: 'devops',     name: 'DevOps',              color: '#6366F1' },
  { id: 'qa',         name: 'QA Division',         color: '#EF4444' },
  { id: 'business',   name: 'Business',            color: '#F97316' },
  { id: 'research',   name: 'Research',            color: '#F59E0B' },
  { id: 'innovation', name: 'Innovation',          color: '#14B8A6' },
  { id: 'security',   name: 'Security',            color: '#D97706' },
  { id: 'community',  name: 'Community',           color: '#84CC16' },
];

export const getAgentById = (id: string): Agent | undefined => AGENTS.find(a => a.id === id);

export const getLevelInfo = (xp: number): LevelSystem => {
  return LEVEL_SYSTEM.find(l => xp >= l.minXP && xp <= l.maxXP) || LEVEL_SYSTEM[0];
};

export const getNextLevelXP = (currentXP: number): number => {
  const currentLevel = getLevelInfo(currentXP);
  const nextLevelIndex = LEVEL_SYSTEM.findIndex(l => l.name === currentLevel.name) + 1;
  return nextLevelIndex < LEVEL_SYSTEM.length ? LEVEL_SYSTEM[nextLevelIndex].minXP : currentLevel.maxXP;
};
