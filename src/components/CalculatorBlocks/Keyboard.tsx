import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import styles from "./CalculatorButton.module.css";

const digits = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

export const Keyboard = () => {
  const { inputDigit } = useCalculatorStore();
  const { mode } = useModeStore();

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}
    >
      {digits.map((d) => (
        <button
          key={d}
          className={styles.btn}
          onClick={() => inputDigit(d)}
          disabled={mode !== "runtime"}
        >
          {d}
        </button>
      ))}
    </div>
  );
};
