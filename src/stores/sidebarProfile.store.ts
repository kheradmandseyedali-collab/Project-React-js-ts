import { create } from 'zustand';

export type ProfileTab = 'info' | 'orders' | 'favorites';

type ProfileState = {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  activeTab: 'info', 
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
