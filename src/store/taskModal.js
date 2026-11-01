import {create} from "zustand";

export const useTaskModal = create((set) => ({
    modalStatus: false ,
    toggleStatus: set()
}))