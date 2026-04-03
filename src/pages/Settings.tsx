import { 
  Settings as SettingsIcon, 
  Volume2, 
  VolumeX, 
  Layers, 
  Sparkles, 
  Monitor, 
  Palette, 
  Bell, 
  Trophy,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import GlowCard from '../components/ui/GlowCard';

const SettingRow = ({ icon: Icon, label, description, children }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0">
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-white/5 border border-white/5 mt-1">
        <Icon size={18} className="text-[#00FFFF]" />
      </div>
      <div className="space-y-1">
        <div className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {label}
        </div>
        <p className="text-xs text-gray-500 font-medium max-w-md">
          {description}
        </p>
      </div>
    </div>
    <div className="shrink-0">
      {children}
    </div>
  </div>
);

const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-[#00FFFF]' : 'bg-slate-800'}`}
  >
    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

export default function Settings() {
  const { 
    ambientAudio, toggleAmbientAudio,
    particles, toggleParticles,
    scanlines, toggleScanlines,
    renderQuality, setRenderQuality,
    theme, setTheme,
    autoAssign, toggleAutoAssign,
    xpNotifications, toggleXPNotifications,
    achievementPopups, toggleAchievementPopups,
    defaultXP, setDefaultXP
  } = useSettingsStore();

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <SettingsIcon className="text-[#00FFFF]" size={28} />
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            SYSTEM SETTINGS
          </h1>
        </div>
        <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
          Neural Interface & Environment Configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visuals Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Monitor size={20} className="text-[#00FFFF]" />
            <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Visual Interface
            </h2>
          </div>
          <GlowCard glowColor="#00FFFF">
            <div className="divide-y divide-white/5">
              <SettingRow 
                icon={Layers} 
                label="Retro Scanlines" 
                description="Apply a vintage cathode-ray tube effect to the entire dashboard."
              >
                <Toggle enabled={scanlines} onToggle={toggleScanlines} />
              </SettingRow>
              <SettingRow 
                icon={Sparkles} 
                label="Neural Particles" 
                description="Floating data particles in the background environment."
              >
                <Toggle enabled={particles} onToggle={toggleParticles} />
              </SettingRow>
              <SettingRow 
                icon={Monitor} 
                label="Render Quality" 
                description="Adjust 3D rendering quality for the Cyberpunk HQ."
              >
                <select 
                  value={renderQuality}
                  onChange={(e) => setRenderQuality(e.target.value as any)}
                  className="bg-[#0D1117] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00FFFF]"
                >
                  <option value="low">Low (Performance)</option>
                  <option value="medium">Medium (Standard)</option>
                  <option value="high">High (Quality)</option>
                </select>
              </SettingRow>
              <SettingRow 
                icon={Palette} 
                label="Interface Theme" 
                description="Switch between different neural interface color schemes."
              >
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="bg-[#0D1117] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00FFFF]"
                >
                  <option value="cyberpunk">AARYA Cyberpunk</option>
                  <option value="minimal">Dark Minimal</option>
                  <option value="neon">Neon High-Contrast</option>
                </select>
              </SettingRow>
            </div>
          </GlowCard>
        </div>

        {/* Audio & Notifications Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-[#8B5CF6]" />
            <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Audio & Alerts
            </h2>
          </div>
          <GlowCard glowColor="#8B5CF6">
            <div className="divide-y divide-white/5">
              <SettingRow 
                icon={ambientAudio ? Volume2 : VolumeX} 
                label="Ambient Audio" 
                description="Play subtle cyberpunk atmospheric sounds and interface feedback."
              >
                <Toggle enabled={ambientAudio} onToggle={toggleAmbientAudio} />
              </SettingRow>
              <SettingRow 
                icon={Bell} 
                label="XP Notifications" 
                description="Show popups when agents earn experience points."
              >
                <Toggle enabled={xpNotifications} onToggle={toggleXPNotifications} />
              </SettingRow>
              <SettingRow 
                icon={Trophy} 
                label="Achievement Alerts" 
                description="Fullscreen celebrations for newly unlocked achievements."
              >
                <Toggle enabled={achievementPopups} onToggle={toggleAchievementPopups} />
              </SettingRow>
            </div>
          </GlowCard>
        </div>

        {/* Mission Control Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-yellow-500" />
            <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Mission Logic
            </h2>
          </div>
          <GlowCard glowColor="#FFD700">
            <div className="divide-y divide-white/5">
              <SettingRow 
                icon={Shield} 
                label="Auto-Assign" 
                description="Automatically assign new quick-commands to available agents."
              >
                <Toggle enabled={autoAssign} onToggle={toggleAutoAssign} />
              </SettingRow>
              <SettingRow 
                icon={Clock} 
                label="Default XP Reward" 
                description="Base experience points rewarded for new missions."
              >
                <input 
                  type="number" 
                  value={defaultXP}
                  onChange={(e) => setDefaultXP(parseInt(e.target.value))}
                  className="w-24 bg-[#0D1117] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00FFFF]"
                />
              </SettingRow>
            </div>
          </GlowCard>
        </div>

        {/* Danger Zone Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-red-500" />
            <h2 className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              System Integrity
            </h2>
          </div>
          <GlowCard glowColor="#EF4444">
            <div className="divide-y divide-white/5">
              <SettingRow 
                icon={Shield} 
                label="Clear All Local Data" 
                description="Permanently delete all tasks, deals, and XP progress from this device."
              >
                <button 
                  onClick={() => {
                    if (confirm('Are you sure? This will wipe all project data!')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  Factory Reset
                </button>
              </SettingRow>
            </div>
          </GlowCard>
        </div>
      </div>

      <div className="pt-8 text-center">
        <div className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.5em]">
          AARYA MISSION CONTROL v1.0.4 — BUILT BY INAI WORLDS
        </div>
      </div>
    </div>
  );
}
