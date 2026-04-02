import React from 'react';
function AgentCard({ agent }) {
  return (
    <div className="agent-card" style={{ borderLeft:  }}>
      <div>{agent.agentEmoji} {agent.codename}</div>
      <div>{agent.role}</div>
      <div>Status: {agent.status}</div>
      <div>Task: {agent.currentTask}</div>
      <div>LVL {agent.levelBadge}</div>
      <div>XP: {agent.xpProgress} XP</div>
    </div>
  );
}
export default function TeamPage() {
  const agents = [
    { agentEmoji: '🤖', codename: 'JARVIS', role: 'Lead Developer', status: 'Working', currentTask: 'Kanban Board', levelBadge: 12, xpProgress: '2400/3000', agentColor: '#3B82F6' },
    // Other agents...
  ];
  return (
    <div style={{ padding: '20px' }}>
      <div className="aarya-section">⚡️ AARYA — Master Orchestrator</div>
      <div className="line-connections">Connections</div>
      <div className="division-groups">
        {agents.map((agent, index) => (
          <AgentCard key={index} agent={agent} />
        ))}
      </div>
    </div>
  );
}
