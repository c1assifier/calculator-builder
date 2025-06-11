import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import { BLOCK_ORDER, type BlockType } from "@/types/block";
import * as Blocks from "@/components/CalculatorBlocks";
import { DraggableBlock } from "@/app/dnd/DraggableBlock";
import { DroppableCanvas } from "@/app/dnd/DroppableCanvas";

import styles from "./Constructor.module.css";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { FaCode } from "react-icons/fa";

export const Constructor = () => {
  const { mode, setMode } = useModeStore();
  const { canvasBlocks, addBlock, moveBlock } = useCalculatorStore();

  const availableBlocks = BLOCK_ORDER.filter(
    (b) => !canvasBlocks.some((cb) => cb.type === b),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || mode !== "constructor") return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (overId === "canvas") {
      addBlock(activeId as BlockType);
      return;
    }

    const from = canvasBlocks.findIndex((b) => b.id === activeId);
    const to = canvasBlocks.findIndex((b) => b.id === overId);

    if (from !== -1 && to !== -1 && from !== to) {
      moveBlock(from, to);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          onClick={() => setMode("runtime")}
          className={clsx(styles.btn, mode === "runtime" && styles.active)}
        >
          <AiOutlineEye /> Runtime
        </button>
        <button
          onClick={() => setMode("constructor")}
          className={clsx(styles.btn, mode === "constructor" && styles.active)}
        >
          <FaCode /> Constructor
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.grid}>
          <div className={styles.panel}>
            {availableBlocks.map((type) => {
              const Block = Blocks[type as keyof typeof Blocks];
              return (
                <DraggableBlock key={type} id={type}>
                  <Block />
                </DraggableBlock>
              );
            })}
          </div>

          <div className={styles.canvas}>
            {mode === "constructor" ? (
              <DroppableCanvas />
            ) : (
              canvasBlocks.map(({ id, type }) => {
                const Block = Blocks[type];
                return (
                  <div key={id} style={{ marginBottom: 12 }}>
                    <Block />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DndContext>
    </div>
  );
};
