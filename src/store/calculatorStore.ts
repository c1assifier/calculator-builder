import { create } from "zustand";
import type { BlockType } from "@/types/block";
import { useModeStore } from "./modeStore";

export interface CanvasBlock {
  id: string;
  type: BlockType;
}

interface CalculatorState {
  canvasBlocks: CanvasBlock[];
  input: string;
  result: string;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  inputDigit: (digit: string) => void;
  inputOperator: (operator: "+" | "-") => void;
  calculate: () => void;
  reset: () => void;
}

let blockId = 0;

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  canvasBlocks: [],
  input: "",
  result: "",

  addBlock: (type) => {
    if (useModeStore.getState().mode !== "constructor") return;
    const { canvasBlocks } = get();
    set({
      canvasBlocks: [...canvasBlocks, { id: `${type}-${blockId++}`, type }],
    });
  },

  removeBlock: (id) => {
    if (useModeStore.getState().mode !== "constructor") return;
    set((state) => ({
      canvasBlocks: state.canvasBlocks.filter((b) => b.id !== id),
    }));
  },

  moveBlock: (fromIndex, toIndex) => {
    if (useModeStore.getState().mode !== "constructor") return;
    const blocks = [...get().canvasBlocks];
    const [moved] = blocks.splice(fromIndex, 1);
    blocks.splice(toIndex, 0, moved);
    set({ canvasBlocks: blocks });
  },

  inputDigit: (digit) => {
    if (useModeStore.getState().mode !== "runtime") return;
    set((state) => ({
      input: state.input + digit,
      result: "",
    }));
  },

  inputOperator: (operator) => {
    if (useModeStore.getState().mode !== "runtime") return;
    const { input } = get();
    if (!input || /[+-]$/.test(input)) return;
    set({ input: input + operator });
  },

  calculate: () => {
    if (useModeStore.getState().mode !== "runtime") return;
    const { input } = get();

    try {
      const match = input.match(/^(-?\d+)([+-])(-?\d+)$/);
      if (!match) throw new Error("Неверный ввод");

      const [, aStr, op, bStr] = match;
      const a = parseInt(aStr, 10);
      const b = parseInt(bStr, 10);

      if (isNaN(a) || isNaN(b)) throw new Error("Неверные числа");

      const result = op === "+" ? a + b : a - b;
      set({ result: result.toString() });
    } catch {
      set({ result: "Ошибка" });
    }
  },

  reset: () => {
    if (useModeStore.getState().mode !== "runtime") return;
    set({ input: "", result: "" });
  },
}));
