import { create } from "zustand";

let timer = null;

export const useLoading = create((set, get) => ({
  activeRequests: 0,
  isLoading: false,

  startLoading: () => {
    const current = get().activeRequests + 1;
    set({ activeRequests: current });

    // Если это первый активный запрос — включаем спиннер с небольшой задержкой
    if (current === 1) {
        if (get().activeRequests > 0) {
          set({ isLoading: true });
        }
    }
  },

  stopLoading: () => {
    const current = Math.max(0, get().activeRequests - 1);
    set({ activeRequests: current });

    if (current === 0) {
      set({ isLoading: false });
    }
  },
}));