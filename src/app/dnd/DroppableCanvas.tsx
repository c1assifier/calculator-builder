import { useDroppable } from "@dnd-kit/core";
import styles from "./DroppableCanvas.module.css";
import { useCalculatorStore } from "@/store/calculatorStore";
import * as Blocks from "@/components/CalculatorBlocks";
import type { BlockType } from "@/types/block";

export const DroppableCanvas = () => {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const { canvasBlocks, removeBlock } = useCalculatorStore();

  const renderBlock = (type: string) => {
    const Block = Blocks[type as keyof typeof Blocks];
    return (
      <div
        key={type}
        onDoubleClick={() => removeBlock(type as BlockType)}
        style={{ marginBottom: 12 }}
      >
        <Block />
      </div>
    );
  };

  return (
    <div ref={setNodeRef} className={styles.droppable}>
      {canvasBlocks.map(renderBlock)}
    </div>
  );
};
