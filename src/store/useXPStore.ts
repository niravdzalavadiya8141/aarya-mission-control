import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Achievement } from '../data/achievements';
import type { ActivityEntry } from '../data/activityFeed';
import { ACHIEVEMENTS } from '../data/achievements';
import { INITIAL_ACTIVITY_FEED } from '../data/activityFeed';
import { useAgentStore } from './useAgentStore';

export interface XPLogEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  xpAmount: number;
  reason: string;
  taskId?: string;
}

interface XPState {
  achievements: Achievement[];
  xpLog: XPLogEntry[];
  activityFeed: ActivityEntry[];
  currentAchievement: (Achievement & { agentId: string }) | null;
  unlockAchievement: (achievementId: string, agentId: string) => void;
  clearCurrentAchievement: () => void;
  addXP: (agentId: string, amount: number, reason: string, taskId?: string) => void;
  addActivity: (activity: Omit<ActivityEntry, 'id' | 'timestamp'>) => void;
  getLeaderboard: () => { agentId: string; name: string; emoji: string; xp: number; level: string }[];
  getUnlockedAchievements: (agentId?: string) => Achievement[];
  getRecentXPActivity: (count?: number) => XPLogEntry[];
}

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENTS,
      xpLog: [],
      activityFeed: INITIAL_ACTIVITY_FEED,
      currentAchievement: null,

      unlockAchievement: (achievementId, agentId) => {
        const achievement = get().achievements.find((a) => a.id === achievementId);
        if (!achievement || achievement.unlockedBy?.includes(agentId)) return;

        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === achievementId
              ? {
                  ...ach,
                  unlockedBy: [...(ach.unlockedBy || []), agentId],
                  unlockDate: new Date().toISOString(),
                }
              : ach
          ),
          currentAchievement: { ...achievement, agentId },
        }));

        useAgentStore.getState().addXP(agentId, achievement.xpReward);
        
        get().addActivity({
          agentId,
          agentName: useAgentStore.getState().getAgentById(agentId)?.name || 'Unknown',
          agentEmoji: useAgentStore.getState().getAgentById(agentId)?.emoji || '👤',
          agentColor: useAgentStore.getState().getAgentById(agentId)?.color || '#FFFFFF',
          action: `unlocked achievement: "${achievement.name}" (+${achievement.xpReward} XP)`,
          xpEarned: achievement.xpReward,
        });
      },

      clearCurrentAchievement: () => set({ currentAchievement: null }),

      addXP: (agentId, amount, reason, taskId) => {
        const agent = useAgentStore.getState().getAgentById(agentId);
        if (!agent) return;

        const entry: XPLogEntry = {
          id: nanoid(),
          timestamp: new Date().toISOString(),
          agentId,
          agentName: agent.name,
          xpAmount: amount,
          reason,
          taskId,
        };

        set((state) => ({
          xpLog: [entry, ...state.xpLog.slice(0, 99)],
        }));

        useAgentStore.getState().addXP(agentId, amount);
      },

      addActivity: (activity) => {
        const entry: ActivityEntry = {
          ...activity,
          id: nanoid(),
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          activityFeed: [entry, ...state.activityFeed.slice(0, 49)],
        }));
      },

      getLeaderboard: () => {
        const agents = useAgentStore.getState().agents;
        return agents
          .filter((agent) => agent.id !== 'aarya')
          .map((agent) => ({
            agentId: agent.id,
            name: agent.name,
            emoji: agent.emoji,
            xp: agent.xp,
            level: agent.level,
          }))
          .sort((a, b) => b.xp - a.xp);
      },

      getUnlockedAchievements: (agentId) => {
        const { achievements } = get();
        if (agentId) {
          return achievements.filter(
            (ach) => ach.unlockedBy?.includes(agentId)
          );
        }
        return achievements.filter((ach) => (ach.unlockedBy?.length || 0) > 0);
      },

      getRecentXPActivity: (count = 20) => {
        return get().xpLog.slice(0, count);
      },
    }),
    {
      name: 'aarya-xp-storage',
    }
  )
);
