import {persist} from "zustand/middleware";
import {create} from "zustand";

export const useFindUser = create(persist((set) => ({
    userInfo: null,
    addUser: (user) => set({userInfo: user}),
    removeUser: () => set({userInfo: null}),
}), {name: 'user-merts-chat'}));