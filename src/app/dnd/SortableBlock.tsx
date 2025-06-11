import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Blocks from "@/components/CalculatorBlocks";
import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import type { BlockType } from "@/types/block";

interface Props {
  id: string;
  type: BlockType;
}

export const SortableBlock = ({ id, type }: Props) => {
  const { removeBlock } = useCalculatorStore();
  const { mode } = useModeStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 12,
    cursor: mode === "constructor" ? "grab" : "default",
  };

  const Block = Blocks[type];

  if (!Block) {
    alert(`Ошибка: компонент для блока "${type}" не найден`);
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(mode === "constructor" ? listeners : {})}
      {...attributes}
    >
      <div onDoubleClick={() => mode === "constructor" && removeBlock(id)}>
        <Block />
      </div>
    </div>
  );
};
