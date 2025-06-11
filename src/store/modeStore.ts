import { create } from "zustand";
import type { Mode } from "fs";

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeState>((set) => ({
  mode: "constructor",
  setMode: (mode) => set({ mode }),
}));
