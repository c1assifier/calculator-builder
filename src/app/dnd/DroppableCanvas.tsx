import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCalculatorStore } from "@/store/calculatorStore";
import { SortableBlock } from "./SortableBlock";
import styles from "./DroppableCanvas.module.css";

export const DroppableCanvas = () => {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const { canvasBlocks } = useCalculatorStore();

  return (
    <div ref={setNodeRef} className={styles.droppable}>
      <SortableContext
        items={canvasBlocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        {canvasBlocks.map(({ id, type }) => (
          <SortableBlock key={id} id={id} type={type} />
        ))}
      </SortableContext>
    </div>
  );
};
