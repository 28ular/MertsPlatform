import { getMe } from "../../api/getMe";
import { create } from "zustand";

export const useMe = create((set) => ({
  userinfo: null,
  loading: false,
  fetchme: async () => {
    set({ loading: true });
    try {
      const data = await getMe();
      set({ userinfo: data, loading: false });
      console.log(data)
    } catch (e) {
      set({ loading: false, userinfo: null });
      throw e;
    }finally {
      set({ loading: false })
    }
  },

  setUserInfo: (user) => set({ userinfo: user }),
}));
