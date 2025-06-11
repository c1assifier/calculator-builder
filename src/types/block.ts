export type BlockType = "Display" | "Keyboard" | "Operators" | "EqualReset";

export const BLOCK_ORDER: BlockType[] = [
  "Display",
  "Keyboard",
  "Operators",
  "EqualReset",
] as const;
