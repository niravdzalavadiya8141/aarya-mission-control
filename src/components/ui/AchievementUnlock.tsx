import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useXPStore } from '../../store/useXPStore';
import { useAgentStore } from '../../store/useAgentStore';

export default function AchievementUnlock() {
  const currentAchievement = useXPStore(state => state.currentAchievement);
  const clearCurrentAchievement = useXPStore(state => state.clearCurrentAchievement);
  const agents = useAgentStore(state => state.agents);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: any;
    if (currentAchievement) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
        // Delay clearing the achievement from store until after the exit animation
        setTimeout(clearCurrentAchievement, 500);
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentAchievement, clearCurrentAchievement]); // Removed 'show' from dependencies

  const agent = agents.find(a => a.id === currentAchievement?.agentId);

  return (
    <AnimatePresence>
      {(currentAchievement && show) && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="relative w-full max-w-sm bg-[#111827] border border-[rgba(0,255,255,0.3)] rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(0,255,255,0.2)]"
          >
            {/* Particles Burst */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: agent?.color || '#00FFFF' }}
              />
            ))}

            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#00FFFF] tracking-[0.4em] uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  🎖️ ACHIEVEMENT UNLOCKED
                </span>
                <div className="text-6xl pt-4">{currentAchievement.icon}</div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {currentAchievement.name}
                </h2>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  {currentAchievement.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="text-xl font-black text-yellow-400 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  ⚡ +{currentAchievement.xpReward} XP
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Earned by <span style={{ color: agent?.color }}>{agent?.emoji} {agent?.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
