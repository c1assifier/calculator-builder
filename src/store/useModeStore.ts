import { create } from "zustand";
import type { Mode } from "fs";

type ModeStore = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "constructor",
  setMode: (mode) => set({ mode }),
}));
