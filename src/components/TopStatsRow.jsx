import React from 'react';
import { SparklineChart } from 'recharts';
function StatCard({ title, count, glow, color }) {
  return (
    <div className="glassmorphism-card" style={{ borderColor: glow }}>
      <div style={{ color }}>{title}</div>
      <div>{count}</div>
      <SparklineChart data={[10, 20, 30, 40, 50, 60, 70]} width={100} height={30} />
    </div>
  );
}
export default function TopStatsRow() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StatCard title="ACTIVE MISSIONS" count="9" glow="var(--glow-cyan)" color="#00FFFF" />
      <StatCard title="AGENTS ONLINE" count="15" glow="var(--glow-green)" color="#00FF88" />
      <StatCard title="XP EARNED TODAY" count="3000" glow="var(--glow-gold)" color="#FFD700" />
      <StatCard title="COMPLETION RATE" count="75%" glow="var(--glow-pink)" color="#FF00FF" />
    </div>
  );
}
