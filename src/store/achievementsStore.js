import { create } from "zustand";
import { getAchievements } from "../../api/getAchievements";

export const useAchievementsStore = create((set) => ({
  achievements: [],
  loading: false,
  fetchAchievements: async () => {
    set({ loading: true });
    try {
      const data = await getAchievements();
      const list = Array.isArray(data)
        ? data
        : data?.achievements || data?.items || [];
      set({ achievements: list, loading: false });
    } catch (e) {
      set({ loading: false, achievements: [] });
      throw e;
    } finally {
      set({ loading: false });
    }
  },
  setAchievements: (achievements) => set({ achievements }),
}));
