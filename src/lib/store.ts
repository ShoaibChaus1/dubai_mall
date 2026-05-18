import { create } from 'zustand';

interface AppState {
  isPreloaderComplete: boolean;
  setPreloaderComplete: (status: boolean) => void;
  isIntroVideoComplete: boolean;
  setIntroVideoComplete: (status: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isPreloaderComplete: false,
  setPreloaderComplete: (status) => set({ isPreloaderComplete: status }),
  isIntroVideoComplete: false,
  setIntroVideoComplete: (status) => set({ isIntroVideoComplete: status }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  soundEnabled: false,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));
