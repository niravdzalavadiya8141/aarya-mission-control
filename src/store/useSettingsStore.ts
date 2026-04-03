import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  ambientAudio: boolean;
  particles: boolean;
  scanlines: boolean;
  renderQuality: 'low' | 'medium' | 'high';
  theme: 'cyberpunk' | 'minimal' | 'neon';
  autoAssign: boolean;
  xpNotifications: boolean;
  achievementPopups: boolean;
  defaultXP: number;
  
  toggleAmbientAudio: () => void;
  toggleParticles: () => void;
  toggleScanlines: () => void;
  setRenderQuality: (quality: 'low' | 'medium' | 'high') => void;
  setTheme: (theme: 'cyberpunk' | 'minimal' | 'neon') => void;
  toggleAutoAssign: () => void;
  toggleXPNotifications: () => void;
  toggleAchievementPopups: () => void;
  setDefaultXP: (xp: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ambientAudio: false,
      particles: true,
      scanlines: true,
      renderQuality: 'medium',
      theme: 'cyberpunk',
      autoAssign: true,
      xpNotifications: true,
      achievementPopups: true,
      defaultXP: 100,

      toggleAmbientAudio: () => set((state) => ({ ambientAudio: !state.ambientAudio })),
      toggleParticles: () => set((state) => ({ particles: !state.particles })),
      toggleScanlines: () => set((state) => ({ scanlines: !state.scanlines })),
      setRenderQuality: (quality) => set({ renderQuality: quality }),
      setTheme: (theme) => set({ theme }),
      toggleAutoAssign: () => set((state) => ({ autoAssign: !state.autoAssign })),
      toggleXPNotifications: () => set((state) => ({ xpNotifications: !state.xpNotifications })),
      toggleAchievementPopups: () => set((state) => ({ achievementPopups: !state.achievementPopups })),
      setDefaultXP: (xp) => set({ defaultXP: xp }),
    }),
    {
      name: 'aarya-settings-storage',
    }
  )
);
