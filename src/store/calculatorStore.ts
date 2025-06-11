import { create } from "zustand";
import type { BlockType } from "@/types/block";

interface CalculatorStore {
  canvasBlocks: BlockType[];
  addBlock: (block: BlockType) => void;
  removeBlock: (block: BlockType) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  canvasBlocks: [],
  addBlock: (block) =>
    set((state) => {
      if (state.canvasBlocks.includes(block)) return state;
      return { canvasBlocks: [...state.canvasBlocks, block] };
    }),
  removeBlock: (block) =>
    set((state) => ({
      canvasBlocks: state.canvasBlocks.filter((b) => b !== block),
    })),
}));
