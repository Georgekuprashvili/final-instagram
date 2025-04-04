import { create } from "zustand";

type SearchPanelStore = {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
};

export const useSearchPanel = create<SearchPanelStore>((set) => ({
  isOpen: false,
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
}));
