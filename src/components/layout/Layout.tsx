import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/useSettingsStore';
import AchievementUnlock from '../ui/AchievementUnlock';
import { ToastContainer } from '../ui/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

interface LayoutProps {
  children: React.ReactNode;
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
}));

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { scanlines, particles: showParticles } = useSettingsStore();
  
  useKeyboardShortcuts();

  return (
    <div className="flex min-h-screen bg-[#0A0A0F] relative overflow-x-hidden">
      {/* Achievement Overlay */}
      <AchievementUnlock />
      <ToastContainer />

      {/* Scanline Overlay */}
      {scanlines && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999]"
          style={{
            background: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,255,255,0.015) 1px, rgba(0,0,0,0) 2px)',
            backgroundSize: '100% 4px',
          }}
        ></div>
      )}

      {/* Grid Dot Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 255, 255, 0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      ></div>

      {/* Floating Particles */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ 
                x: `${p.initialX}vw`, 
                y: '110vh', 
                opacity: 0 
              }}
              animate={{ 
                y: '-10vh', 
                opacity: [0, 0.2, 0.2, 0],
                x: [`${p.initialX}vw`, `${p.initialX + (Math.random() * 10 - 5)}vw`]
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay,
                ease: "linear"
              }}
              className="absolute rounded-full bg-[#00FFFF]"
              style={{ width: p.size, height: p.size }}
            />
          ))}
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 md:ml-[240px]">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 mt-16 p-6 relative">
          {/* Background Glows */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00FFFF] opacity-[0.03] blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8B5CF6] opacity-[0.03] blur-[120px] rounded-full"></div>
          </div>
          
          {/* Content Wrapper */}
          <div className="relative z-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation (Optional but recommended in phase 2) */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0D1117]/80 backdrop-blur-xl border-t border-slate-800 z-50 flex items-center justify-around md:hidden px-4">
          {/* Add mobile icons here if needed, but for now we have the sidebar toggle */}
        </nav>
      </div>
    </div>
  );
}
