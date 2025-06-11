import { DndContext } from "@dnd-kit/core";
import { DraggableBlock } from "@/app/dnd/DraggableBlock";
import { DroppableCanvas } from "@/app/dnd/DroppableCanvas";
import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import { BLOCK_ORDER } from "@/types/block";
import * as Blocks from "@/components/CalculatorBlocks";
import styles from "./Constructor.module.css";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { FaCode } from "react-icons/fa";

export const Constructor = () => {
  const { mode, setMode } = useModeStore();
  const { canvasBlocks, addBlock } = useCalculatorStore();

  const availableBlocks = BLOCK_ORDER.filter((b) => !canvasBlocks.includes(b));

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

      <DndContext
        onDragEnd={({ over, active }) => {
          if (over?.id === "canvas") {
            addBlock(active.id as any);
          }
        }}
      >
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
            <DroppableCanvas />
          </div>
        </div>
      </DndContext>
    </div>
  );
};
