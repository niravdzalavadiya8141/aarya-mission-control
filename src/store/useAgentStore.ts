import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Agent } from '../data/agents';
import { AGENTS, getLevelInfo } from '../data/agents';

interface AgentState {
  agents: Agent[];
  updateAgentStatus: (agentId: string, status: Agent['status'], currentTask?: string) => void;
  addXP: (agentId: string, amount: number) => void;
  setAgentTask: (agentId: string, task: string) => void;
  getWorkingAgents: () => Agent[];
  getAgentById: (id: string) => Agent | undefined;
  getAgentsByDivision: (division: string) => Agent[];
}

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      agents: AGENTS,

      updateAgentStatus: (agentId, status, currentTask) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === agentId
              ? { ...agent, status, currentTask: currentTask || agent.currentTask }
              : agent
          ),
        }));
      },

      addXP: (agentId, amount) => {
        set((state) => ({
          agents: state.agents.map((agent) => {
            if (agent.id === agentId) {
              const newXP = agent.xp + amount;
              const newLevel = getLevelInfo(newXP).name;
              return {
                ...agent,
                xp: newXP,
                level: newLevel,
              };
            }
            return agent;
          }),
        }));
      },

      setAgentTask: (agentId, task) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === agentId ? { ...agent, currentTask: task, status: 'working' } : agent
          ),
        }));
      },

      getWorkingAgents: () => {
        return get().agents.filter((agent) => agent.status === 'working');
      },

      getAgentById: (id) => {
        return get().agents.find((agent) => agent.id === id);
      },

      getAgentsByDivision: (division) => {
        return get().agents.filter((agent) => agent.division === division);
      },
    }),
    {
      name: 'aarya-agents-storage',
    }
  )
);
