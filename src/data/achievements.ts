export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: string;
  unlockedBy?: string[];
  unlockDate?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1',  name: 'First Blood',      description: 'Complete your first task',                    icon: '🏆', xpReward: 50,  condition: 'tasks_completed >= 1', unlockedBy: [], unlockDate: '' },
  { id: 'ach-2',  name: 'On Fire',           description: 'Complete 3 tasks in one day',                 icon: '🔥', xpReward: 100, condition: 'daily_tasks >= 3', unlockedBy: [], unlockDate: '' },
  { id: 'ach-3',  name: 'Speed Demon',       description: 'Complete a task under 1 hour',                icon: '⚡', xpReward: 75,  condition: 'fast_complete', unlockedBy: [], unlockDate: '' },
  { id: 'ach-4',  name: 'Sharpshooter',      description: 'Complete 5 tasks with 0 bugs',                icon: '🎯', xpReward: 150, condition: 'perfect_tasks >= 5', unlockedBy: [], unlockDate: '' },
  { id: 'ach-5',  name: 'Heavy Lifter',      description: 'Complete a Critical priority task',           icon: '💪', xpReward: 200, condition: 'critical_completed', unlockedBy: [], unlockDate: '' },
  { id: 'ach-6',  name: 'Team Player',       description: 'Collaborate with 3+ agents on a task',        icon: '🤝', xpReward: 100, condition: 'multi_agent_task', unlockedBy: [], unlockDate: '' },
  { id: 'ach-7',  name: 'Level Up',          description: 'Reach Agent level (500+ XP)',                 icon: '📈', xpReward: 50,  condition: 'level_agent', unlockedBy: [], unlockDate: '' },
  { id: 'ach-8',  name: 'Rising Star',       description: 'Reach Elite level (1500+ XP)',                icon: '🌟', xpReward: 100, condition: 'level_elite', unlockedBy: [], unlockDate: '' },
  { id: 'ach-9',  name: 'Legend',            description: 'Reach Legend level (3000+ XP)',               icon: '👑', xpReward: 200, condition: 'level_legend', unlockedBy: [], unlockDate: '' },
  { id: 'ach-10', name: 'Mythic',            description: 'Reach Mythic level (5000+ XP)',               icon: '⚡', xpReward: 500, condition: 'level_mythic', unlockedBy: [], unlockDate: '' },
  { id: 'ach-11', name: 'Builder',           description: 'Complete 10 development tasks',               icon: '🔨', xpReward: 150, condition: 'dev_tasks >= 10', unlockedBy: [], unlockDate: '' },
  { id: 'ach-12', name: 'Wordsmith',         description: 'Complete 10 content tasks',                   icon: '✍️', xpReward: 150, condition: 'content_tasks >= 10', unlockedBy: [], unlockDate: '' },
  { id: 'ach-13', name: 'Guardian',          description: 'Complete 5 security audits',                  icon: '🛡️', xpReward: 150, condition: 'security_tasks >= 5', unlockedBy: [], unlockDate: '' },
  { id: 'ach-14', name: 'Optimizer',         description: 'Improve performance by 20%+',                 icon: '🚀', xpReward: 200, condition: 'perf_improvement >= 20', unlockedBy: [], unlockDate: '' },
  { id: 'ach-15', name: 'Money Maker',       description: 'Close a ₹1 Lakh+ deal',                        icon: '💰', xpReward: 300, condition: 'deal_value >= 100000', unlockedBy: [], unlockDate: '' },
  { id: 'ach-16', name: 'Veteran',           description: 'Complete 50 total tasks',                     icon: '🎖️', xpReward: 500, condition: 'total_tasks >= 50', unlockedBy: [], unlockDate: '' },
  { id: 'ach-17', name: 'Full Stack',        description: 'Complete tasks in 3+ divisions',              icon: '🌐', xpReward: 125, condition: 'divisions >= 3', unlockedBy: [], unlockDate: '' },
  { id: 'ach-18', name: 'Night Owl',         description: 'Complete a task after midnight',              icon: '🦉', xpReward: 75,  condition: 'late_night_task', unlockedBy: [], unlockDate: '' },
  { id: 'ach-19', name: 'Perfect Sprint',    description: 'Complete sprint with zero bugs',              icon: '💯', xpReward: 300, condition: 'perfect_sprint', unlockedBy: [], unlockDate: '' },
  { id: 'ach-20', name: 'Chain Master',      description: 'Maintain a 7-day task streak',                  icon: '🔗', xpReward: 200, condition: 'streak >= 7', unlockedBy: [], unlockDate: '' },
  { id: 'ach-21', name: 'Bug Hunter',        description: 'Find and report 10 bugs',                     icon: '🐛', xpReward: 150, condition: 'bugs_reported >= 10', unlockedBy: [], unlockDate: '' },
  { id: 'ach-22', name: 'Deploy Master',     description: 'Deploy to production 5 times',                icon: '📦', xpReward: 200, condition: 'deployments >= 5', unlockedBy: [], unlockDate: '' },
  { id: 'ach-23', name: 'Social Butterfly',  description: 'Post 20 social media updates',                icon: '🦋', xpReward: 100, condition: 'social_posts >= 20', unlockedBy: [], unlockDate: '' },
  { id: 'ach-24', name: 'Research Guru',     description: 'Complete 5 research reports',                 icon: '🔬', xpReward: 175, condition: 'research_reports >= 5', unlockedBy: [], unlockDate: '' },
  { id: 'ach-25', name: 'Innovator',         description: 'Create 3 prototypes',                         icon: '💡', xpReward: 250, condition: 'prototypes >= 3', unlockedBy: [], unlockDate: '' },
  { id: 'ach-26', name: 'Community Builder', description: 'Write 10 support/help articles',              icon: '👥', xpReward: 150, condition: 'support_articles >= 10', unlockedBy: [], unlockDate: '' },
  { id: 'ach-27', name: 'Quick Learner',     description: 'Complete 5 tasks in new division',            icon: '📚', xpReward: 100, condition: 'new_division_tasks >= 5', unlockedBy: [], unlockDate: '' },
  { id: 'ach-28', name: 'Mentor',            description: 'Help onboard 3 new team members',               icon: '🎓', xpReward: 200, condition: 'onboarding_help >= 3', unlockedBy: [], unlockDate: '' },
  { id: 'ach-29', name: 'Pipeline Pro',      description: 'Move 10 deals to paid status',                icon: '📊', xpReward: 300, condition: 'deals_closed >= 10', unlockedBy: [], unlockDate: '' },
  { id: 'ach-30', name: 'Early Bird',        description: 'Complete task before 8 AM',                   icon: '🌅', xpReward: 75,  condition: 'early_task', unlockedBy: [], unlockDate: '' },
  { id: 'ach-31', name: 'Marathon Runner',   description: 'Work 12+ hours in a day',                     icon: '🏃', xpReward: 150, condition: 'long_day >= 12', unlockedBy: [], unlockDate: '' },
  { id: 'ach-32', name: 'Centurion',         description: 'Complete 100 total tasks',                    icon: '💯', xpReward: 1000, condition: 'total_tasks >= 100', unlockedBy: [], unlockDate: '' },
];
