import React from 'react';
export default function CommandCenter() {
  return (
    <div>
      <TopStatsRow />
      <div className="main-content-grid">
        <div className="main-left-column">
          <div>Active Missions</div>
          <div>Live Activity Feed</div>
        </div>
        <div className="main-right-column">
          <div>Team Status</div>
          <div>Quick Command</div>
          <div>Leaderboard</div>
        </div>
      </div>
      <div>Bottom Ticker</div>
    </div>
  );
}
